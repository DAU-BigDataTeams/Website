---
title: 다양한 전처리 방법을 통해 머신러닝 모델의 성능을 높여보자!
layout: post
categories : [python-study,Kaggle,XGBoost]
image : /assets/img/Intermediate%20ML(jongho)/Jongho_ML.png
description: 다양한 전처리 방법을 통해 머신러닝 모델의 성능을 높여보자!
customexcerpt: kaggle의 Intermediate Machine Learning를 수료한 후 정리한 글! 
---

<span class = "alert g">작성자 : 김종호</span>

# Intermediate Machine Learning 
<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

## 1. Introduction
---
[Intro Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning)을 수료한 후 모델의 성능을 향상시키기 위한 방법과 XGBoost에 대해서 학습할 것이다.<br>
학습할 내용은 다음과 같다.
- 결측치 처리
- 숫자형 변수, 카테고리형 변수
- 파이프라인 설계
- 모델 검증(교차 검증)
- XGBoost
  
## 2. Missing Values
---
이 장에서는 결측치를 처리하는 세 가지 방법에 대해 알아볼 것이다.

### 2-1 개요
---
데이터는 여러 이유로 결측값을 가지게 된다. 예를 들어<br>
- 데이터를 입력 중 실수로 값을 입력하지 않은 경우
- 값을 어떤 이유로든 관찰하지 못한 경우(예를 들어, 인구 조사에서 특정 가구가 구성원수를 기입하지 않은 경우)
- 해당 항목에 적절한 값이 없어서 입력하지 못한 경우(예를 들어, 약품의 냄새를 기록하는 칸에 특정 약품은 향이 없는 경우)
  
### 2-2 결측값 처리 방법
---
1. 결측값이 있는 열 삭제(Drop Columns with Missing Values) <br>
![post1](/assets/img/Intermediate%20ML(jongho)/post1.png)
- 말 그대로 결측값이 있는 column은 삭제하는 것이다. 
- 가장 간단한 방법이다. 제거되는 column의 대부분의 값이 결측값이 아니라면 많은 정보를 잃어버리는 결과를 초래하게 된다. 예를 들어 10,000개의 행을 가진 데이터셋에서 하나의 중요한 column이 1개의 결측치를 갖고 있다면 이러한 방법으로는 column 전체를 제거하게 될 것이다.
2. 대치법(Imputation)<br>
![post2](/assets/img/Intermediate%20ML(jongho)/post2.png)
- 대치법은 결측값을 다른 값으로 대체하는 방법이다. 예를 들어 각 column별 결측치에는 각 column별 평균값으로 대체할 수 있다.
- 이렇게 채워진 값은 대부분의 경우 정확하지 않지만, 방법1보다는 더 정확한 모델을 만들 수 있다.
3. 결측값 대체 후 데이터셋 확장(An Extension To Imputation)<br>
![post3](/assets/img/Intermediate%20ML(jongho)/post3.png)
- 이 접근법은 2번과 마찬가지로 결측치에 값을 채워넣는다. 그 후 원래 데이터셋에 결측치가 있던 컬럼에 대하여 어떤 값이 <strong>채워진 값</strong>인지를 나타내는 column을 새로 만든다.

### 2-3 예제
---
예제에서는 [Melbourne Housing dataset](https://www.kaggle.com/datasets/dansbecker/melbourne-housing-snapshot)을 이용한다. 방의 개수, 부지의 크기 등을 이용하여 집의 가격을 예측하는 모델을 만들 것이다.
~~~ py
import pandas as pd
from sklearn.model_selection import train_test_split
# 데이터 로딩
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')
# target 설정
y = data.Price
# 수치형 변수만 이용
melb_predictors = data.drop(['Price'], axis=1)
X = melb_predictors.select_dtypes(exclude=['object'])
# 학습 및 검증 데이터 나누기
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2,
                                                      random_state=0)
~~~
3가지 방법의 성능을 측정하기 위한 함수인 score_dataset()를 정의한다. 이 함수는 random forest 모델로 계산된 평균절대오차(MAE : Mean Absolute error)를 반환해 준다.<br>
([MAE](https://en.wikipedia.org/wiki/Mean_absolute_error) : 실제 정답 값과 예측 값의 차이를 절댓값으로 변환한 뒤 합산하여 평균을 구한다. 값이 낮을수록 좋다.) <br>
~~~ py
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# 비교함수
def score_dataset(X_train, X_valid, y_train, y_valid):
    model = RandomForestRegressor(n_estimators=10, random_state=0)
    model.fit(X_train, y_train)
    preds = model.predict(X_valid)
    return mean_absolute_error(y_valid, preds)
~~~

<strong>방법1 : 결측값이 있는 열 삭제 </strong>
- 학습 및 검증 데이터셋, 둘 다 사용하기 때문에 동일한 column을 두 데이터셋에서 제거해야 한다.
~~~ py
# 결측값이 있는 열이름 저장
cols_with_missing = [col for col in X_train.columns
                     if X_train[col].isnull().any()]
# 결측값이 있는 열 삭제
reduced_X_train = X_train.drop(cols_with_missing, axis=1)
reduced_X_valid = X_valid.drop(cols_with_missing, axis=1)
print("MAE from Approach 1 (Drop columns with missing values):")
print(score_dataset(reduced_X_train, reduced_X_valid, y_train, y_valid))
~~~
<pre>
MAE from Approach 1 (Drop columns with missing values):
183550.22137772635
</pre>
<strong>방법2 : 대치법(Imputation) </strong>
- SimpleImputer를 사용해서 결측값들을 각 column별 평균값으로 대체해본다.
- 간단한 방법이지만, 꽤 좋은 성능을 보인다.
~~~ py
from sklearn.impute import SimpleImputer
# Imputation(대치법)
my_imputer = SimpleImputer()
imputed_X_train = pd.DataFrame(my_imputer.fit_transform(X_train))
imputed_X_valid = pd.DataFrame(my_imputer.transform(X_valid))
# Imputation removed column names; put them back
imputed_X_train.columns = X_train.columns
imputed_X_valid.columns = X_valid.columns
print("MAE from Approach 2 (Imputation):")
print(score_dataset(imputed_X_train, imputed_X_valid, y_train, y_valid))
~~~
<pre>
MAE from Approach 2 (Imputation):
178166.46269899711
</pre>
결과를 통해 방법2가 방법1보다 더 낮은 MAE를 보인 것을 확인할 수 있다.<br><br>
<strong>방법3 : 결측값 대체 후 데이터셋 확장 </strong>
- 결측값을 채워넣은 후, 채워진 값에는 True값을 넣는다.
~~~ py
# 원본 보존을 위해 copy() 이용
X_train_plus = X_train.copy()
X_valid_plus = X_valid.copy()
# imputed에 대한 정보를 저장한 열 생성
for col in cols_with_missing:
    X_train_plus[col + '_was_missing'] = X_train_plus[col].isnull()
    X_valid_plus[col + '_was_missing'] = X_valid_plus[col].isnull()
# Imputation
my_imputer = SimpleImputer()
imputed_X_train_plus = pd.DataFrame(my_imputer.fit_transform(X_train_plus))
imputed_X_valid_plus = pd.DataFrame(my_imputer.transform(X_valid_plus))
# Imputation은 열을 삭제하기 때문에 열 이름 다시 저장
imputed_X_train_plus.columns = X_train_plus.columns
imputed_X_valid_plus.columns = X_valid_plus.columns
print("MAE from Approach 3 (An Extension to Imputation):")
print(score_dataset(imputed_X_train_plus, imputed_X_valid_plus, y_train, y_valid))
~~~
<pre>
MAE from Approach 3 (An Extension to Imputation):
178927.503183954
</pre>
방법3은 방법2보다 MAE가 약간 높은 결과를 보인다.<br><br>
<strong>왜 결측값을 대체하는 것이 column을 삭제하는 것보다 더 좋은 성능을 보여줄까?</strong> <br>
: 학습데이터는 10864개의 행과 12개의 column을 갖고 있다. 3개의 column이 결측치를 갖고 있고, 각 column에서 결측값의 수는 전체 데이터 수의 절반 이하이다. 그러므로 column을 제거하면 많은 정보가 제거되기 때문에, imputation으로 결측값을 채워넣는 것은 column을 제거하는 것보다 더 좋은 성능을 보인다.
~~~ py
# Shape of training data (num_rows, num_columns)
print(X_train.shape)
# Number of missing values in each column of training data
missing_val_count_by_column = (X_train.isnull().sum())
print(missing_val_count_by_column[missing_val_count_by_column > 0])
~~~
<pre>
(10864, 12)
Car               49
BuildingArea    5156
YearBuilt       4307
dtype: int64
</pre>

### 2-4 결론
---
일반적으로 결측값이 존재하는 column을 지우는 것보다 결측값을 어떠한 값(ex. 평균값)으로 채워넣는 것이 더 좋은 성능을 보인다.

## 3. Categorical Variables
---
이 장에서는 범주형 변수(Categorical Variable)가 무엇인지, 어떻게 다뤄야 할지에 대해 학습할 것이다.

### 3-1 개요
---
범주형 변수는 가질 수 있는 값이 한정되어 있다. 예를 들어<br>
- 얼마나 아침을 자주 먹는지에 대해 "먹지 않는다(Never)", "일주일에 1 ~ 3번(Rarely)", "일주일에 4 ~ 6번(Most day), "매일 먹는다(Every Day)라고 주어진 설문조사를 생각해보자. 이 경우 대답은 4가지 범주 중 하나를 선택해야 하기 때문에, Categorical Varible라고 할 수 있다.
- 만약 어떤 브랜드의 차를 소유하고 있나요? 라는 질문에는 아마 "KIA", "BMW", "Benz" 등으로 대답할 것이다. 이러한 경우에도 Categorical Varible라고 할 수 있다.

이러한 범주형 변수를 머신러닝 모델에 아무 전처리 없이 사용했다간 많은 어려움을 겪게 될 것이다...!

### 3-2 범주형 변수 다루는 방법
---
1. 범주형 변수 제거(Drop Categorical Variables)
- 단순히 범주형 변수는 제거하는 방법이다.
- 이 방법은 해당 변수에 중요한 정보가 없을 때만 효과가 있을 것이다.
2. Ordinal Encoding <br>
![post4](/assets/img/Intermediate%20ML(jongho)/post4.png)
- 이 방법은 범주형 변수에 순서를 부여하는 것이다. (Never" (0) < "Rarely" (1) < "Most days" (2) < "Every day" (3))
- 위 예시에서는 각 범주의 순서가 있다고 판단되기에 가정이 적절하다고 볼 수 있다.
- 순서가 있는 범주형 변수를 순위변수(ordinal variable)라고 부른다.
- Decision tree, Random Forest 등 트리 기반의 모델에서 ordinal Encoding이 잘 작동한다.
3. 원-핫 인코딩(One-Hot Encoding) <br>
![post5](/assets/img/Intermediate%20ML(jongho)/post5.png)
- 왼쪽 그림에 "Color"는 Red, Yellow, Green 3가지의 범주를 갖고 있는 변수형 변수이다. 각 범주마다 원-핫 인코딩된 컬럼을 가지고 있다. 만약 원래값이 "Red"일 경우 "Red" column에 1을 집어 넣는다.
- 2번 방법과 달리 원-핫 인코딩은 범주의 순서를 매기지 않는다. 이러한 순서가 없는 데이터를 명목형 변수(nominal variable) 이라 부른다.
- 원-핫 인코딩은 대체로 범주의 수가 15개 이하인 경우에 사용하면 좋은 결과를 얻을 수 있다.

### 3-3 예제
---
이전 예제와 동일한 [Melbourne Housing dataset](https://www.kaggle.com/datasets/dansbecker/melbourne-housing-snapshot)를 이용한다.
~~~ py
import pandas as pd
from sklearn.model_selection import train_test_split
# 데이터 로딩
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')
# target값 저장
y = data.Price
X = data.drop(['Price'], axis=1)
# 학습 및 검증 데이터 나누기
X_train_full, X_valid_full, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2,
                                                                random_state=0)
# 결측값이 있는 열 삭제
cols_with_missing = [col for col in X_train_full.columns if X_train_full[col].isnull().any()] 
X_train_full.drop(cols_with_missing, axis=1, inplace=True)
X_valid_full.drop(cols_with_missing, axis=1, inplace=True)
# "Cardinality"란 column에 존재하는 unique한 값을 나타낸다.
# Cardinality가 낮은 범주형 변수를 선택(편의성을 위해서)
low_cardinality_cols = [cname for cname in X_train_full.columns if X_train_full[cname].nunique() < 10 and 
                        X_train_full[cname].dtype == "object"]
# 수치형 변수 선택
numerical_cols = [cname for cname in X_train_full.columns if X_train_full[cname].dtype in ['int64', 'float64']]
# 선택한 column만 사용한다.
my_cols = low_cardinality_cols + numerical_cols
X_train = X_train_full[my_cols].copy()
X_valid = X_valid_full[my_cols].copy()
~~~
head() 메서드를 통해 학습데이터를 살펴보자
~~~ py
X_train.head()
~~~

<table border="1" >
<thead >
  <tr>
    <th></th>
    <th>Type</th>
    <th>Method</th>
    <th>Regionname</th>
    <th>Rooms</th>
    <th>Distance</th>
    <th>Postcode</th>
    <th>Bedroom2</th>
    <th>Bathroom</th>
    <th>Landsize</th>
    <th>Lattitude</th>
    <th>Longtitude</th>
    <th>Propertycount</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>12167</td>
    <td>u</td>
    <td>S</td>
    <td>Southern Metropolitan</td>
    <td>1</td>
    <td>5.0</td>
    <td>3182.0</td>
    <td>1.0</td>
    <td>1.0</td>
    <td>0.0</td>
    <td>-37.85984</td>
    <td>144.9867</td>
    <td>13240.0</td>
  </tr>
  <tr>
    <td>6524</td>
    <td>h</td>
    <td>SA</td>
    <td>Western Metropolitan</td>
    <td>2</td>
    <td>8.0</td>
    <td>3016.0</td>
    <td>2.0</td>
    <td>2.0</td>
    <td>193.0</td>
    <td>-37.85800</td>
    <td>144.9005</td>
    <td>6380.0</td>
  </tr>
  <tr>
    <td>8413</td>
    <td>h</td>
    <td>S</td>
    <td>Western Metropolitan</td>
    <td>3</td>
    <td>12.6</td>
    <td>3020.0</td>
    <td>3.0</td>
    <td>1.0</td>
    <td>555.0</td>
    <td>-37.79880</td>
    <td>144.8220</td>
    <td>3755.0</td>
  </tr>
  <tr>
    <td>2919</td>
    <td>u</td>
    <td>SP</td>
    <td>Northern Metropolitan</td>
    <td>3</td>
    <td>13.0</td>
    <td>3046.0</td>
    <td>3.0</td>
    <td>1.0</td>
    <td>265.0</td>
    <td>-37.70830</td>
    <td>144.9158</td>
    <td>8870.0</td>
  </tr>
  <tr>
    <td>6043</td>
    <td>h</td>
    <td>S</td>
    <td>Western Metropolitan</td>
    <td>3</td>
    <td>13.3</td>
    <td>3020.0</td>
    <td>3.0</td>
    <td>1.0</td>
    <td>673.0</td>
    <td>-37.76230</td>
    <td>144.8272</td>
    <td>4217.0</td>
  </tr>
</tbody>
</table>

데이터타입(dtype)을 통해 범주형 변수인지 아닌지를 확인할 수 있다. 주로 데이터타입이 object인 것은 범주형 변수임을 의미한다.(아닌 경우도 종종 있다)
~~~ py
# =categorical variables 열이름 추출
s = (X_train.dtypes == 'object')
object_cols = list(s[s].index)
print("Categorical variables:")
print(object_cols)
~~~
<pre>
Categorical variables:
['Type', 'Method', 'Regionname']
</pre>
3가지 방법의 성능을 측정하기 위한 함수인 score_dataset()를 정의한다. 이 함수는 random forest 모델로 계산된 평균절대오차(MAE : Mean Absolute error)를 반환해 준다.<br>
~~~ py
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
# Function for comparing different approaches
def score_dataset(X_train, X_valid, y_train, y_valid):
    model = RandomForestRegressor(n_estimators=100, random_state=0)
    model.fit(X_train, y_train)
    preds = model.predict(X_valid)
    return mean_absolute_error(y_valid, preds)
~~~
<strong>방법1 : 범주형 변수 제거 </strong><br>
  select_dtypes() 함수를 이용해서 object 타입의 column을 찾아 삭제한다.
~~~ py
drop_X_train = X_train.select_dtypes(exclude=['object'])
drop_X_valid = X_valid.select_dtypes(exclude=['object'])
print("MAE from Approach 1 (Drop categorical variables):")
print(score_dataset(drop_X_train, drop_X_valid, y_train, y_valid))
~~~
<pre>
MAE from Approach 1 (Drop categorical variables):
175703.48185157913
</pre>
<strong>방법2 : Ordinal Encoding </strong><br>
scikit-learn의 OrdinalEncoder 클래스를 사용해서 값을 구할 수 있다. 
~~~ py
from sklearn.preprocessing import OrdinalEncoder
# 원본 보존을 위해 copy() 이용
label_X_train = X_train.copy()
label_X_valid = X_valid.copy()
# 범주형 데이터가 있는 column에 OrdinalEncoder 적용
ordinal_encoder = OrdinalEncoder()
label_X_train[object_cols] = ordinal_encoder.fit_transform(X_train[object_cols])
label_X_valid[object_cols] = ordinal_encoder.transform(X_valid[object_cols])
print("MAE from Approach 2 (Ordinal Encoding):") 
print(score_dataset(label_X_train, label_X_valid, y_train, y_valid))
~~~
<pre>
MAE from Approach 2 (Ordinal Encoding):
165936.40548390493
</pre>
각각의 열에 무작위로 정수의 값을 할당했다. custom label를 만드는 것보다 간단하고 자주 사용된다. 하지만 만약 각 열에 많은 label를 만든다면 더 좋은 성능을 가진 모델을 만들 수 있다.<br><br>
<strong>방법3 : One-Hot Encoding </strong><br>
scikit-learn의 OneHotEncoder 클래스를 사용해서 값을 구할 수 있다. <br>
사용하기 전에 몇 가지 매개변수를 설정해줘야 한다.
- handle_unknown='ignore'을 설정하여 검증 데이터에서 학습데이터에서는 존재하지 않는 class을 만났을 때 발생하는 오류를 방지한다.
- sparse=False는 encode된 column이 sparse matrix 대신에 numpy array 형태로 리턴 되도록 설정해준다.
- encoder를 사용하기 위해서는 원-핫 인코딩되길 원하는 범주형 변수만 넘겨줘야 한다.
~~~ py
from sklearn.preprocessing import OneHotEncoder
# 범주형 데이터를 가진 각 column에 oneHotEncoder 적용
OH_encoder = OneHotEncoder(handle_unknown='ignore', sparse=False)
OH_cols_train = pd.DataFrame(OH_encoder.fit_transform(X_train[object_cols]))
OH_cols_valid = pd.DataFrame(OH_encoder.transform(X_valid[object_cols]))
# One-hot encoding은 index를 제거하기 때문에 다시 돌려준다.
OH_cols_train.index = X_train.index
OH_cols_valid.index = X_valid.index
# 범주형 변수 제거
num_X_train = X_train.drop(object_cols, axis=1)
num_X_valid = X_valid.drop(object_cols, axis=1)
# one-hot encoded columns를 수치형 변수에 add
OH_X_train = pd.concat([num_X_train, OH_cols_train], axis=1)
OH_X_valid = pd.concat([num_X_valid, OH_cols_valid], axis=1)
print("MAE from Approach 3 (One-Hot Encoding):") 
print(score_dataset(OH_X_train, OH_X_valid, y_train, y_valid))
~~~
<pre>
MAE from Approach 3 (One-Hot Encoding):
166089.4893009678
</pre>
<strong> 어떤 방법이 가장 좋을까? </strong><br>
위 예제에서는 방법1(범주형 변수 제거)이 제일 안 좋은 성능을 보였다. 다른 두 방법 같은 경우, 반환된 값이 비슷하기에 비교하는데 의미가 없어 보인다. <br>
일반적으로 방법3(원-핫 인코딩)이 일반적으로 가장 좋은 결과를 낸다. (주어진 데이터에 따라 좋지 않은 결과를 낼 수도 있다.)

### 3-4 결론
---
우리가 살고 있는 세계에는 다양한 범주형 변수가 있다. 이러한 범주형 어떻게 다루는지 알고 있다면 멋진 개발자가 될 수 있을 것이다! 

## 4. Pipelines
---

### 4-1 개요
---
Pipelines은 데이터 전처리 및 모델링 코드를 구성하는 간단한 방법이다. 특히 Pipelines은 전처리 및 모델링 단계를 한 번에 처리할 수 있게 해준다.
Pipelines은 다음과 같은 장점이 있다.
- Cleaner Code: 각 단계마다 전처리하는 과정이 반복된다면 코드가 복잡해질 수 있다. Pipelines을 사용한다면, 학습 및 검증 데이터 단계의 전처리 과정을 한 번에 처리할 수 있다.<br>
- Fewer Bugs: 전처리 과정을 까먹거나, 잘못 적용할 가능성이 줄어든다.<br>
- Easier to Productionize: 프로토타입에서 대규모로 배포 가능한 것으로 전환하는 것은 의외로 어려울 수 있다. 여기서 많은 관련 문제를 다루지 않겠지만, 파이프라인은 이러한 문제에 도움이 될 것이다.<br>
- 생산성 향상: 모델을 프로토타입에서 규모에 맞게 배포 가능한 것으로 전환하는 것은 놀라울 정도로 어려울 수 있다.. 여기서는 많은 관련 문제를 다루지 않겠지만 파이프라인이 도움이 될 수 있다.<br>
- More Options for Model Validation: "cross-validation" 은 다음 학습에서 다룰 것이다.

### 4-2 예제 <br>
---
이전 예제와 같이 [Melbourne Housing dataset](https://www.kaggle.com/datasets/dansbecker/melbourne-housing-snapshot)를 이용할 것이다. (데이터 불러오는 과정은 생략한다)<br>
~~~ py
X_train.head()
~~~
| Type  | Method | Regionname | Rooms                 | Distance | Postcode | Bedroom2 | Bathroom | Car | Landsize | BuildingArea | YearBuilt | Lattitude | Longtitude | Propertycount |         |
|-------|--------|------------|-----------------------|----------|----------|----------|----------|-----|----------|--------------|-----------|-----------|------------|---------------|---------|
| 12167 | u      | S          | Southern Metropolitan | 1        | 5.0      | 3182.0   | 1.0      | 1.0 | 1.0      | 0.0          | NaN       | 1940.0    | -37.85984  | 144.9867      | 13240.0 |
| 6524  | h      | SA         | Western Metropolitan  | 2        | 8.0      | 3016.0   | 2.0      | 2.0 | 1.0      | 193.0        | NaN       | NaN       | -37.85800  | 144.9005      | 6380.0  |
| 8413  | h      | S          | Western Metropolitan  | 3        | 12.6     | 3020.0   | 3.0      | 1.0 | 1.0      | 555.0        | NaN       | NaN       | -37.79880  | 144.8220      | 3755.0  |
| 2919  | u      | SP         | Northern Metropolitan | 3        | 13.0     | 3046.0   | 3.0      | 1.0 | 1.0      | 265.0        | NaN       | 1995.0    | -37.70830  | 144.9158      | 8870.0  |
| 6043  | h      | S          | Western Metropolitan  | 3        | 13.3     | 3020.0   | 3.0      | 1.0 | 2.0      | 673.0        | 673.0     | 1970.0    | -37.76230  | 144.8272      | 4217.0  |

head() 메서드로 학습데이터를 살펴본 결과, 범주형 데이터와 결측값이 있다는 것을 알 수 있다. 파이프라인을 이용한다면 두 가지 경우를 간단하게 처리할 수 있다.
3단계로 나눠 파이프라인을 설계한다.<br>

<strong>Step1 : Define Preprocessing Steps</strong> <br>
- Column Transformer 클래스를 사용하여 전처리 및 모델링 단계를 묶어서 한 번에 처리한다.
- 수치형 데이터에는 존재하는 결측값에 값을 채워(impute)넣는다.
- 범주형 데이터에는 결측값에 값을 채워넣고 one-hot encoding을 수행한다.
~~~ py
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
# 수치형 변수 전처리
numerical_transformer = SimpleImputer(strategy='constant')
# 범주형 변수 전처리
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])
# numerical and categorical data 묶어서 처리
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])
~~~

<strong> Step2 : Define the Model </strong><br>
- 다음으로 Random Forests 모델을 정의한다.
~~~ py
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=0)
~~~

<strong> Step 3: Create and Evaluate the Pipeline </strong> <br>
마지막으로 Pipeline class를 사용해 step1과 step2를 한 번에 묶어 처리하는 pipeline을 정의한다. 
- pipeline을 사용해서 학습데이터를 전처리하고 모델을 적합시키는 것을 한줄의 코드로 수행할 수 있다.  
- pipeline을 사용하여 검증 데이터인 X_valid를  predict() 명령에 넣어준다. 그러면 pipeline은 예측을 하기 전에 기능을 자동으로 전처리를 수행해준다.
~~~ py
from sklearn.metrics import mean_absolute_error
# pipeline를 통해 전처리 및 모델링 코드 하나로 만들기
my_pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                              ('model', model)
                             ])
# 학습 데이터 전처리 후 모델에 적합
my_pipeline.fit(X_train, y_train)
# 검증 데이터 전처리 후 예측값 생성
preds = my_pipeline.predict(X_valid)
# 모델 평가
score = mean_absolute_error(y_valid, preds)
print('MAE:', score)
~~~

<pre>
MAE: 160679.18917034855
</pre>

### 4-3 결론
---
pipeline은 code를 간결하게 하며 오류를 방지하거나 복잡한 데이터를 전처리하는 작업환경에 유용하다.

## 5. Cross-Validation
---

### 5-1 개요
---
머신 러닝은 반복적인 과정이다. 어떤 예측 변수를 사용할지, 어떤 유형의 모델을 사용할지, 어떤 매개변수를 제공할지 등에 대해 선택해야 한다. 지금까지 검증 데이터 셋을 사용하여 모델의 성능을 측정하는  데이터 중심 방식을 선택을 했다.
그러나 이 접근법에는 몇 가지 단점이 있다. 예로 5,000개의 행이 있는 데이터 셋이 있다고 가정해 보자. 일반적으로 데이터의 약 20%를 검증데이터로 사용한다. 그러나 이것은 모델 점수를 결정하는 데 있어서 무작위성을 부여하게 된다. 다시 말해, 다른 1000개 행에서 부정확하더라도 1000개 행의 한 집합에서 모형이 잘 작동할 수도 있다.
극단적으로는 단 하나의 데이터만 검증 데이터로 남겨두고 여러 모델들의 성능을 비교한다면, 이 한개의 데이터에 대해서 가장 잘 예측하는 모델은 운에 의해 결정된 확률이 크다.
일반적으로 모델의 성능을 측정할 때 검증 데이터 셋이 클수록 모델 품질 측정에 랜덤성(일명 "노이즈")이 적고 신뢰성이 높다. 

### 5-2 Cross-validation이란?
---
교차 검증은 데이터의 다른 하위 집합에 대해 모델링 과정을 적용하여 여러번 모델의 성능을 측정하는 방법이다.
예를 들어 전체 데이터 세트를 20%씩 5개로 분할할 수 있다. 이 경우 데이터를 5개의 "fold"로 나누었다고 말한다.
![post6](/assets/img/Intermediate%20ML(jongho)/post6.png)
- 실험 1에서는 첫 번째 fold를 검증 데이터셋으로 사용하고 나머지를 학습데이터셋으로 이용한다. 이러한 방법은 20% holdout 셋을 기반으로 모델 성능을 측정할 수 있다.
- 실험2에서는 두 번째 fold를 제외한(holdout) 나머지를 학습 데이터셋으로 이용한다. 두 번째 데이터셋을 이용해서 모델 성능을 측정한다.

이 과정을 모든 fold에 대해서 반복한다. 이를 종합하면, 모든 데이터가 검증데이터셋으로 사용된다. 결론적으로 모든 데이터를 이용해서 모델의 성능을 측정하게 된다. <br>
<strong>그러면 언제 cross-validation을 사용하는 것이 좋을까?</strong><br>
- 이는 모델링에서 여러 결정을 내려야 할 때 특히 더 중요하다. cross-validation을 통해 더 정확하게 모델의 성능을 측정할 수 있다. 그러나 이는 모델을 여러번(fold별 한 번) 학습시켜야 하기 때문에 시간은 더 걸린다. <br>

- 대규모 데이터 셋의 경우 데이터가 충분하기 때문에 하나의 검증 데이터셋만 이용해도 된다.
대소규모를 구분하는데 특정 값이 주어지는 것이 아니지만, 모델을 실행하는데 시간이 오래 걸리지 않는다면 Cross-validation을 수행하는 것이 좋다.

### 5-3 예제
---
이전 예제와 같이 Melbourne Housing dataset를 이용할 것이다. (데이터 불러오는 과정은 생략한다)
누락된 값을 채우기 위해 imputer를 사용하는 파이프라인과 예측을 하기 위해 Ramdom Forest 모델을 정의한다.
파이프라인 없이 교차 검증을 수행할 수 있지만, 상당히 어렵다.
~~~ py
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
my_pipeline = Pipeline(steps=[('preprocessor', SimpleImputer()),
                              ('model', RandomForestRegressor(n_estimators=50,
                                                              random_state=0))
                             ])
~~~
scikit-learn에 cross_val_score()함수를 이용해서 cross-validation socre를 얻는다. <strong>cv 매개변수</strong>는 fold의 수를 결정한다.
~~~ py
from sklearn.model_selection import cross_val_score
# 음수의 MAE를 계산하기 때문에 -1를 곱해준다.
scores = -1 * cross_val_score(my_pipeline, X, y,
                              cv=5,
                              scoring='neg_mean_absolute_error')
print("MAE scores:\n", scores)
~~~
<pre>
MAE scores:
 [301628.7893587  303164.4782723  287298.331666   236061.84754543
 260383.45111427]
</pre>
<strong>scoring 매개변수</strong>는 어떤 지표로 모델의 성능을 측정할지 알려준다. 위는 negative mean absolute score (MAE)을 이용했다. scikit-learn 문서를 참고하면 어떤 옵션이 있는 지 확인할 수 있다.
일반적으로 모델의 성능을 비교하기 위해 하나의 값을 이용하기를 원하므로 cross-validation의 결과를 평균내어 준다.
~~~ py
print("Average MAE score (across experiments):")
print(scores.mean())
~~~
<pre>
Average MAE score (across experiments):
277707.3795913405
</pre>

### 5-4 결론
---
cross-validation을 사용하면 모델 성능 측정하는데 있어 더 좋은 측정값을 얻을 수 있다. 

## 6. XGBoost
---

### 6-1 Introduction
---
course에서 대부분 Random Forest model를 이용해서 예측을 해왔다. 이 방법은 여러 Decision trees는 예측을 평균화함으로써 단일 tree보다 더 좋은 성능을 보였다.
이러한 Ramdom Forest 방법은 "Ensemble method"라고 부른다. Ensemble method란 여러 개의 tree결과를 합치는 것을 말한다.
다음으로는 gradient boosting이라 불리는 또 다른 ensemble 방법에 대해 학습해보자.

### 6-2 Gradient Boosting
---
Gradient Boosting은 반복적인 Cycle을 통해 모델을 더하는 ensemble 방법이다.(처음에는 예측이 부정확할 수 있으나 ensemble에 더해지는 예측 결과로 부정확한 예측 결과를 조정할 수 있다.) <br>
Cycle은 
- 첫째, 현재 ensemble에 더해진 모델들을 이용해 데이터셋에 예측값을 만든다.
- 이 예측값은 loss 함수(예: 평균 제곱 오차)를 계산하는데 사용된다.
-  다음 loss 함수를 사용하여 ensemble에 추가될 새 모델을 적합시킨다. 이 때, ensemble에 더해질 모델의 parameter는 loss를 줄이도록 결정한다.
- 마지막으로, ensemble에 새로운 모델을 추가한다.
- 이 과정을 반복한다!


![post7](/assets/img/Intermediate%20ML(jongho)/post7.png)
### 6-3 예제
---
먼저 학습 및 검증 데이터를 가져온다.
~~~ py
import pandas as pd
from sklearn.model_selection import train_test_split
# 데이터 로딩
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')
# 예측할 변수 선택
cols_to_use = ['Rooms', 'Distance', 'Landsize', 'BuildingArea', 'YearBuilt']
X = data[cols_to_use]
# target 선택
y = data.Price
# 학습 및 검증데이터 나누기
X_train, X_valid, y_train, y_valid = train_test_split(X, y)
~~~
이 예제에서는 XGBoost(EXtreme Gradient Boost) 라이브러리로 작업한다. 성능과 속도에 초점을 맞춘 몇 가지 추가 기능을 갖춘 Gradient Boost를 구현한 것이다. 
다음 코드 셀은 XGBoost를 위한 scikit-learn의 API를 가져온다. 출력에서 볼 수 있듯이, XGBRegressor 클래스는 많은 매개변수를 가지고 있다. 이는 차차 배워나갈 것이다.

~~~ py
from xgboost import XGBRegressor
my_model = XGBRegressor()
my_model.fit(X_train, y_train)
~~~
<pre>
XGBRegressor(base_score=0.5, booster='gbtree', colsample_bylevel=1,
             colsample_bynode=1, colsample_bytree=1, enable_categorical=False,
             gamma=0, gpu_id=-1, importance_type=None,
             interaction_constraints='', learning_rate=0.300000012,
             max_delta_step=0, max_depth=6, min_child_weight=1, missing=nan,
             monotone_constraints='()', n_estimators=100, n_jobs=4,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, scale_pos_weight=1, subsample=1, tree_method='exact',
             validate_parameters=1, verbosity=None)
</pre>
예측 후 모델을 평가
~~~ py
from sklearn.metrics import mean_absolute_error
predictions = my_model.predict(X_valid)
print("Mean Absolute Error: " + str(mean_absolute_error(predictions, y_valid)))
~~~ 
<pre>
Mean Absolute Error: 239435.01260125183
</pre>

### 6-4 Parameter Tuning
---
XGBoost에는 정확도와 학습 속도에 큰 영향을 미치는 몇 가지 매개변수가 있다. 

1) n_estimators
  - modeling cycle을 얼마나 반복할지 결정한다.
  - 이는 ensemble에 더해질 모델의 수를 의미한다.
  - 일반적인 값의 범위는 100 - 1000 사이이지만, 이는 아래에 설명된 learning_rate 매개변수에 따라 크게 달라진다.
  
다음 예시는 ensemble에 더해질 모델의 수를 설정해주는 code이다.
~~~ py
my_model = XGBRegressor(n_estimators=500)
my_model.fit(X_train, y_train)
~~~

2) early_stopping_rounds
- n_estimators가 이상적인 값을 자동으로 찾을 수 있는 방법을 제공한다.
- 모델이 더 이상 향상되지 않을 때 모델의 반복을 중지시킨다.
- n_estimator에 높은 값을 설정한 후 early_stopping_rounds 를 이용하여 최적의 반복 수를 찾는 것이 현명한 방법이다.
- early_stopping_rounds를 사용할 경우, validation score를 계산하기 위해 데이터의 일부분을 따로 설정해야 한다. 
다음 예시는 Early stopping을 포함한 code이다.
~~~ py
my_model = XGBRegressor(n_estimators=500)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)],
             verbose=False)
~~~

3) learing_rate
- 단순히 각 구성요소 모델의 예측을 합산하여 예측을 얻는 대신, 우리는 각 모델의 예측을 추가하기 전에 작은 숫자(learing rate)로 곱할 수 있다.
- 일반적으로, 적은 학습률과 많은 수의 estimator의 수가 더 정확한 XGBoost 모델을 만들지만, 이는 많은 cycle를 수행하기 떄문에 학습 속도가 오래 걸릴 수 있다. 초기값으로 XGBoost는 learning_rate=0.1로 설정한다.
위의 예제를 수정하여 학습 속도를 변경하면 다음 코드가 생성된다.
~~~ py
my_model = XGBRegressor(n_estimators=1000, learning_rate=0.05)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)], 
             verbose=False)
~~~

4) n_jobs
- 런타임이 고려되는 대규모 데이터 셋에서는 병렬 처리를 이용해서 모델을 더 빨리 만들어 낼 수 있다. 일반적으로 n_jobs의 수는 시스템의 코어 수와 동일하게 설정한다. 작은 데이터 셋에서는 이 방법이 효율적이지 않다.
- 모델의 성능에 변화가 없고, 학습에 걸리는 시간이 중요하지 않을 수도 있다. 하지만 fit 명령어에 오랜 시간이 걸리는 큰 데이터셋의 경우는 n_jobs이 유용할 수 있다.

수정된 코드는 다음과 같다.
~~~ py
my_model = XGBRegressor(n_estimators=1000, learning_rate=0.05, n_jobs=4)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)], 
             verbose=False)
~~~

### 6-5 결론
---
XGBoost는 일반적인 <strong>정형데이터(Pandas DataFrame에 저장되는 데이터)</strong>에 좋은 결과를 보인다. 또한 다양한 옵션을 제공해서 Customizing이 용이하다. 



<br><br>



![Jongho_Intermediate_ML](/assets/img/Intermediate%20ML(jongho)/Jongho_ML.png)
