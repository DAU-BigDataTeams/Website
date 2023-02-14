---
title: 트리 기반 모델의 성능 개선을 위한 여러가지 전처리 방법(ML 중급)
layout: post   
categories : ML, kaggle
image : /assets/img/수료증/박정현-IntermediateML.png
description: 머신러닝 중급
customexcerpt: 모델의 품질을 빠르게 개선하는 방법을 학습해보자!
---

# Intermediate Machine Learning
모델의 품질을 빠르게 개선하는 방법을 학습하는 것을 위주로 작성해보았다.

모델의 품질을 빠르게 개선하는 방법으로는 아래와 같이 제시할 수 있다.
- 실제 데이터 세트에서 자주 발견되는 데이터 유형(누락값, 범주형 범수)
- 코드의 품질을 개선하기 위한 파이프라인 설계
- 모델의 유효성 검사(Cross-validation)를 위한 고급 기술 사용
- Kaggle 대회(XGBoost)에서 우승하는데 널리 사용되는 최신 모델 구축
- 일반적이고 중요한 데이터 과학 실수를 방지하는 방법


이러한 방법을 배우는 과정에서 새로운 주제를 다루며 실제 데이터로 실습을 완료하게 됨.


**우선 이 글을 읽기 전에 잠시 멈추고 내가 이전에 [ML관련 포스터](https://dau-bigdatateams.github.io/2023/01/29/Intro-to-Machine-Learing.html)를 봤는지 확인하자**

## 가장 좋은 모델 선정하기(예, 랜덤포레스트)
----

데이터를 불러오고 X,y로 나누는 작업은 가장 기초적이다.
~~~py
import pandas as pd
from sklearn.model_selection import train_test_split

# Read the data
X_full = pd.read_csv('../input/train.csv', index_col='Id')
X_test_full = pd.read_csv('../input/test.csv', index_col='Id')

# Obtain target and predictors
y = X_full.SalePrice
features = ['LotArea', 'YearBuilt', '1stFlrSF', '2ndFlrSF', 'FullBath', 'BedroomAbvGr', 'TotRmsAbvGrd']
X = X_full[features].copy()
X_test = X_test_full[features].copy()

# Break off validation set from training data
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2, random_state=0)
~~

이후 여러가지 모델을 생성한 후 최적의 MAE를 찾아 해당 모델을 활용하는 과정이다.

~~~py
from sklearn.ensemble import RandomForestRegressor

# Define the models
model_1 = RandomForestRegressor(n_estimators=50, random_state=0)
model_2 = RandomForestRegressor(n_estimators=100, random_state=0)
model_3 = RandomForestRegressor(n_estimators=100, criterion='absolute_error', random_state=0)
model_4 = RandomForestRegressor(n_estimators=200, min_samples_split=20, random_state=0)
model_5 = RandomForestRegressor(n_estimators=100, max_depth=7, random_state=0)

models = [model_1, model_2, model_3, model_4, model_5]
~~~
<pre>Model 1 MAE: 24015
Model 2 MAE: 23740
Model 3 MAE: 23528
Model 4 MAE: 23996
Model 5 MAE: 23706
</pre>

가장 MAE가 낮은 모델은 model_3다. 즉, **best_model은 model_3이다.**

# 누락 값(Missing Values)

이번 챕터는 누락 값을 처리하는 3가지 접근 방식을 배운다. 그다음 실제 데이터 세트에서 이러한 접근 방식 효과를 비교한다.

데이터가 결측값으로 끝날 수 있는 방법에는 여러 가지가 있다.   
예를들면, 침실이 2개인 주택에는 3번째 침실의 크기 값이 포함되지 않는다. 또는 어떠한 설문에서 응답자는 결과를 제공하지 않을 수 있다.

누락된 값이 있는 데이터를 사용해서 모델을 빌드하려고 하면 대부분의 ML라이브러리에서 오류가 발생한다.

아래 3가지 방법 중 하나를 선택해 누락 값을 해결하자

## 1. 간단하게 누락된 값이 있는 열 삭제
---
가장 간단하다.. 그냥 열을 삭제하는 것이다.  

![1](/assets/img/Intermediate%20ML/1.png)  

삭제된 열의 대부분의 값이 누락되지 않는 한 모델은 이 접근 방식을 사용하는 많은 정보를 읽지 못 한다. **즉, 특정 열에 누락값이 매우 많으면 이 방법은 비추천이다.**

## 2. 대체(Imputation)
----
대체는 일부 숫자로 누락된 값을 채운다. 예를 들어 각 열을 따라 평균값을 채울 수 있다.  

![2](/assets/img/Intermediate%20ML/2.png)  

**대치된 값은 대부분의 경우 정확하지 않지만 일반적으로 열을 완전히 삭제하는 것 보다는 좋다...**

## 3. 대체 확장(Extension to imputation)
----
대체는 표준 접근 방식임. 하지만 대체된 값은 체계적으로 실제 값보다 높거나 낮을 수 있음(데이터 셋에서 수집되지 않으니까) 또는 고유한 값을 수 있음  
이경우 모델은 원래 누락된 값을 고려해서 더 나은 예측을 수행함.  
![3](/assets/img/Intermediate%20ML/3.png)  
이 접근 방식에는 이전과 같이 누락된 값을 대체한다. 또한 원본 데이터 셋에서 누락된 항목이 있는 각 열에 대해 귀속된 항목의 위치를 표시하는 새로운 열을 추가한다.  
경우에 따라 결과가 의미 있게 향상된다. 다른 경우에는 전혀 도움이 안된다.  
**즉, 데이터 셋에 누락값을 대체한 것이라 알리는 새로운 열을 만들고 대체를 진행한다**

### 누락 값 처리 예시
-----


~~~py
import pandas as pd
from sklearn.model_selection import train_test_split

# Load the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# Select target
y = data.Price

# To keep things simple, we'll use only numerical predictors
melb_predictors = data.drop(['Price'], axis=1)
X = melb_predictors.select_dtypes(exclude=['object'])

# Divide data into training and validation subsets
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2, random_state=0)
~~~                                        

먼저 각 접근 방법의 품질을 측정하는 함수를 정의한다.(`score_dataset()`) 이 함수는 랜덤 포레스트 모델의 평균 절대오차(MAE)를 출력한다.

~~~py
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Function for comparing different approaches
def score_dataset(X_train, X_valid, y_train, y_valid):
    model = RandomForestRegressor(n_estimators=10, random_state=0)
    model.fit(X_train, y_train)
    preds = model.predict(X_valid)
    return mean_absolute_error(y_valid, preds)
~~~

접근법 1. 열 삭제  
~~~py
# Get names of columns with missing values
cols_with_missing = [col for col in X_train.columns
                     if X_train[col].isnull().any()]

# Drop columns in training and validation data
reduced_X_train = X_train.drop(cols_with_missing, axis=1)
reduced_X_valid = X_valid.drop(cols_with_missing, axis=1)

print("MAE from Approach 1 (Drop columns with missing values):")
print(score_dataset(reduced_X_train, reduced_X_valid, y_train, y_valid))
~~~
<pre>
MAE from Approach 1 (Drop columns with missing values):
183550.22137772635
</pre>

접근법 2. 대체  
`SimpleImputer`를 사용해서 누락된 값을 각 열의 평균값으로 변경한다.  
간단한데 평균값으로 채우는 것은 일반적으로 잘 쓴다(데이터 마다 다름). 여담으로 학자들은 더 복잡한 이론을 들고와서 모델을 학습했는데 복잡한 만큼의 큰 이점이 없어서 평균으로 채운다고 함.
~~~py
from sklearn.impute import SimpleImputer

# Imputation
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

접근법3. 대체 확장
~~~py
# Make copy to avoid changing original data (when imputing)
X_train_plus = X_train.copy()
X_valid_plus = X_valid.copy()

# Make new columns indicating what will be imputed
for col in cols_with_missing:
    X_train_plus[col + '_was_missing'] = X_train_plus[col].isnull()
    X_valid_plus[col + '_was_missing'] = X_valid_plus[col].isnull()

# Imputation
my_imputer = SimpleImputer()
imputed_X_train_plus = pd.DataFrame(my_imputer.fit_transform(X_train_plus))
imputed_X_valid_plus = pd.DataFrame(my_imputer.transform(X_valid_plus))

# Imputation removed column names; put them back
imputed_X_train_plus.columns = X_train_plus.columns
imputed_X_valid_plus.columns = X_valid_plus.columns

print("MAE from Approach 3 (An Extension to Imputation):")
print(score_dataset(imputed_X_train_plus, imputed_X_valid_plus, y_train, y_valid))
~~~
<pre>
MAE from Approach 3 (An Extension to Imputation):
178927.503183954
</pre>



실험 결과를 보니까 접근법 3 보다 접근법 2가 성능이 약간 높았다. 


<p></p>
<p></p>
<p></p>

실험 결과를 보면 단순히 열을 삭제하는 것보다 더 대체가 더 MAE가 좋은 이유가 뭘까?  
데이터를 보면 19864개의 행과 12개의 열이 있으며 여기서 3개의 열에는 누락된 데이터가 포함되어있다.  
각 열에 대해서 항목의 절반 미만이 누락된 것을 볼 수 있음. 따라서 열을 삭제하면 많은 유용한 정보가 제거되므로 대체가 더 잘 수행된다는 것이 맞다.

**즉, 열을 삭제하는 것의 우려스러운 일이(대부분이 누락) 이 데이터에는 적용되는 것임.**

~~~py
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


# 범주형 변수 (Categorical Variables)
숫자가 아닌 데이터가 많이 존재하는데 이것을 ML에 적용하는 방법에 대해 소개한다.

범주형 변수를 처리하기 위해 3가지 접근 방식을 소개하고 볌주형 변수가 무엇인지 알아가본다.  
우선, 범주형 변수는 제한된 수의 값만 사용한다. 

예를 들어, 아침 식사를 얼마나 자주 하는지 묻는 설문조사에 먹음, 드물게 먹음, 거의 매일, 매일 4가지 옵션을 제공한다고 가정하자. 이 경우 응답이 고정된 범주 집합(먹음, 드물게 먹음, 거의 매일, 매일)에 속하기 때문에 데이터가 범주형이라고 한다.

감이 잘 좀 오는가?? 아직 감이 안오는 사람을 위해 다른 예시를 들면
어떤 브랜드의 자동차를 소유하고 있는지 설문조사에 응답으로 현대, 기아, 벤츠, 테슬라와 같은 범주가 있다고 하면 이또한 범주형 데이터다. 

이러한 변수를 사전에 처리하지 않고 Python에서 대부분의 기계 학습 모델에 적용하려 하면 오류가 발생한다.

이제 범주형 변수를 처리하는 3가지 접근 방식을 비교해보자

## 1. 범주형 변수 삭제
-----
정말 심플하게 범주형 변수를 처리하는 가장 쉬운 방법이다. 단순히 데이터 자체를 날려버리는(삭제) 것임. **만약 데이터에 유용한 정보가 있다면 절대 하면 안됨**  

## 2. Ordinal Encoding
----
Ordinal Encoding은 각 고유 값을 다른 정수에 할당한다.  
![4](/assets/img/Intermediate%20ML/4.png)  

이 접근 방식은 사진 처럼 Every day, Never, Rarely, Most days, Never => 3, 0, 1, 2, 0 으로 변환하는 것을 말한다.  

범주에 대해 논쟁의 여지가 없는 순위가 있는 경우 이렇게 표현할 수 있다. 모든 범주형 변수가 값에 명확한 순서가 있는 것은 아니지만 순서형 변수라고 한다. **트리기반 모델(의사결정트리, 랜덤포레스트)의 경우 Ordinal Encoding이 잘 작동할 것이라 예상 가능하다.**

왜 Ordinal Encoding이 트리 기반 모델에 적합하냐?  
1. 트리 기반 모델은 수치 입력이 필요한 선형 모델과 달리 범주형 변수를 직접 처리가능함
2. Ordinal Encoding은 범주 간의 Ordinal 관계를 유지하므로 트리 기반 모델이 데이터의 고유한 순서를 포착할 수 있음
3. 계산적으로 효율적이고 추가 데이터 전처리가 필요없다.
4. 인코딩된 변수에는 트리 구조에 포착된 자연 계층(?)이 있으므로 모델이 범주간의 관계를 더 쉽게 해석 가능함.

> [근거]   
> 계산 효율성 : 범주를 숫자에 매핑하기만 하면 되니까 간단하고 빠른 과정이라 계산 효율성이 높음  
> 자연적 계층 구조는 인코딩된 변수에 나타나는 것인데 범주 간의 관계가 고유하고 명확한 것을 말함. 이게 트리 구조에서 포착되어 모델이 범주 간의 관계를 더 쉽게 해석할 수 있도록 함. 만약에 트리에 작음, 중간, 대형 범주가 있고 계층화 되어있으면 대형이라는 변수는 소형보다 높고 중간보다 높다고 해석이 된다. **즉, 계층적 구조 덕분에 순서가 있는 범주형은 해석에 도움이된다.**


## 3. One-Hot Encoding
----
원-핫 인코딩은 원본 데이터에서 가능한 각 값의 존재(또는 부재)를 나타내는 새 열을 생성한다. 아래 예시를 보자.  
![5](/assets/img/Intermediate%20ML/5.png)  

원래 데이터 셋에서 색상은 R,G,Y 3가지 범주로 나뉘는 범주형 변수다. 원-핫 인코딩은 
색상 열에 있던 범주의 이름으로 새로운 열을 만든다. (위 사진을 보면 R,Y,G에 대한 column이 생김) 같은 열의 같은 행자리에 1을 입력하여 표시하는 방식이다. 

**Ordinal Encoding과 달리 원-핫 인코딩은 범주의 순서를 가정하지 않는다. 따라서 범주형 데이터가 명확한 순서가 없는 경우 적합하다.**   

원-핫 인코딩은 일반적으로 범주형 변수가 많은 수의 값을 취하는 경우 잘 수행되지 않는다.  
> 보통 15개 정도가 Bound라고 함.

~~~py
import pandas as pd
from sklearn.model_selection import train_test_split

# Read the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# 예측 변수에서 대상 분리
y = data.Price
X = data.drop(['Price'], axis=1)

# 데이터를 훈련, 검증 데이터로 나누기
X_train_full, X_valid_full, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2,
                                                                random_state=0)

# 누락된 값이 있는 열 확인 후 삭제(간단한 방법)
cols_with_missing = [col for col in X_train_full.columns if X_train_full[col].isnull().any()] 
X_train_full.drop(cols_with_missing, axis=1, inplace=True)
X_valid_full.drop(cols_with_missing, axis=1, inplace=True)

# "Cardinality"는 열의 고유 값 수를 의미함.
# Cardinality가 상대적으로 낮은 범주형 열 선택(편리하지만 임의적임)
low_cardinality_cols = [cname for cname in X_train_full.columns if X_train_full[cname].nunique() < 10 and X_train_full[cname].dtype == "object"]

# 데이터 타입이 숫자인 열 선택
numerical_cols = [cname for cname in X_train_full.columns if X_train_full[cname].dtype in ['int64', 'float64']]

# 선택한 열만 유지
my_cols = low_cardinality_cols + numerical_cols
X_train = X_train_full[my_cols].copy()
X_valid = X_valid_full[my_cols].copy()
~~~

~~~py
X_train.head()
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
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
      <th>12167</th>
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
      <th>6524</th>
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
      <th>8413</th>
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
      <th>2919</th>
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
      <th>6043</th>
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

다음으로 훈련 데이터의 모든 범주형 변수 목록을 추출한다.(각 열의 데이터 타입을 확인해서 수행한다)

object 타입은 열에 텍스트가 있음을 나타냄(이론적으로 다른 것이 있을 수 있는데 중요하지 않음). 이 데이터 셋의 경우 텍스타가 있는 열은 범주형 변수를 나타냄.


~~~py
# 범주형 변수 목록 가져오기
s = (X_train.dtypes == 'object') 
object_cols = list(s[s].index)

print("Categorical variables:")
print(object_cols)
~~~
<pre>
Categorical variables:
['Type', 'Method', 'Regionname']
</pre>

## 각 접근법의 품질을 측정하는 기능 정의
---
범주형 변수를 다루는 3가지 접근 방식을 비교하기 위해 `score_dataset()`함수를 정의함. 이 함수는 랜덤 포레스트 모델의 MAE(평균 절대 오차)를 출력함. 당연히 MAE가 낮아야 좋음

~~~py
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Function for comparing different approaches
def score_dataset(X_train, X_valid, y_train, y_valid):
    model = RandomForestRegressor(n_estimators=100, random_state=0)
    model.fit(X_train, y_train)
    preds = model.predict(X_valid)
    return mean_absolute_error(y_valid, preds)
~~~

### 1. 범주형 변수 제거

~~~py
drop_X_train = X_train.select_dtypes(exclude=['object'])
drop_X_valid = X_valid.select_dtypes(exclude=['object'])

print("MAE from Approach 1 (Drop categorical variables):")
print(score_dataset(drop_X_train, drop_X_valid, y_train, y_valid))
~~~
<pre>
MAE from Approach 1 (Drop categorical variables):
175703.48185157913
</pre>


### 2. Ordinal Encoding


~~~py
from sklearn.preprocessing import OrdinalEncoder # 도구가 있음!

# Make copy to avoid changing original data 
label_X_train = X_train.copy()
label_X_valid = X_valid.copy()

# Apply ordinal encoder to each column with categorical data
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


### 3. one-hot Encoding

scikit - learn의 OneHotEncoder 클래스를 사용해서 수행가능함.   
사용 방법에 대해 알아보자

유효성 검사 데이터에 교육 데이터가 표시되지 않은 클래스가 포함된 경우 오류를 방지하기 위해 handle_unknown='ignore'를 설정 sparse=False로 설정하면 인코딩된 열이 희소 행렬 대신 numpy 배열로 변환됨

인코더를 사용하기 위해 적용하려는 범주 열만 제공함. 
~~~py
from sklearn.preprocessing import OneHotEncoder # 도구 있음!

# Apply one-hot encoder to each column with categorical data
OH_encoder = OneHotEncoder(handle_unknown='ignore', sparse=False)
OH_cols_train = pd.DataFrame(OH_encoder.fit_transform(X_train[object_cols]))
OH_cols_valid = pd.DataFrame(OH_encoder.transform(X_valid[object_cols]))

# One-hot encoding removed index; put it back
OH_cols_train.index = X_train.index
OH_cols_valid.index = X_valid.index

# Remove categorical columns (will replace with one-hot encoding)
num_X_train = X_train.drop(object_cols, axis=1)
num_X_valid = X_valid.drop(object_cols, axis=1)

# Add one-hot encoded columns to numerical features
OH_X_train = pd.concat([num_X_train, OH_cols_train], axis=1)
OH_X_valid = pd.concat([num_X_valid, OH_cols_valid], axis=1)

print("MAE from Approach 3 (One-Hot Encoding):") 
print(score_dataset(OH_X_train, OH_X_valid, y_train, y_valid))
~~~

<pre>
MAE from Approach 3 (One-Hot Encoding):
166089.4893009678
</pre>

우선 3가지 방법의 MAE 측정 결과를 보기 전에 **왜 train데이터에는 `fit_transform() ` test데이터에는(검증) `transform()`를 사용하는가?** (코드를 보면서 느꼈다면 당신은 꼼꼼하게 본 것임)  

그 답은 [여기](https://deepinsight.tistory.com/165)에서 발췌했다.  

우선 `fit_transform()` 부터 이야기 하자.  
봐왔듯 train_dataset에서만 사용된다. 또한 우리가 만든 모델은 train_data에 있는 mean(평균), variance(분산)을 학습하게 된다. 이러게 Scale 처리된 값은 test data를 scale하는데 사용된다. **다시 말하면 train_data로 학습된 Scaler()의 parameter를 통해 test data의 feature 값들이 스케일 되는 것임.**

그리고 `transform()`의 경우  
train_data로부터 학습된 mean값과 variance값을 test data에 적용하기 위해 `transform()` 메서드를 사용한다.

그럼 test data에는 `fit_transform()`을 사용하지 않나??
- 만약에 fit_transform()dmf test data에도 적용하면 test data로부터 새로운 mean과 variance값을 얻는 것이다.
- 즉, 모델이 test data도 학습하는 것임
- test data는 검증을 위한 데이터인데 이 데이터마저 학습하면 처음 보는 데이터에 대해 얼마나 성능이 좋은지 알 수 없음(검증 데이터를 학습시키고 답지를 주면서 정확도 보는 느낌임)  

**이제 3가지 방법의 MAE를 분석해보자**

접근 방법 1은 범주형 열을 삭제하면서 MAE 점수가 가장 높아서 성능이 가장 낮았다. 나머지 2가지 방식은 MAE 점수가 너무 비슷해서 비교는 무의미해 보임. 하지만 대부분의 경우 원-핫 인코딩이 효율적이고 열 삭제가 가장 안좋음.

# Piplines
전처리를 통해 복잡한 모델을 배포 및 테스트하는데 중요한 기술이다.
이번 챕터는 파이프라인을 사용해서 모델링 코드를 정리하는 방법을 배운다.  

파이프라인은 데이터 전치리 및 모델링 코드를 체계적으로 유지하는 간단한 방법이다. 특히 파이프라인은 전처리 및 모델링 단계를 묶음으로 제공해서 전체 묶음을 하나의 단계처럼 사용 가능하다. 

파이프라인에는 몇가지 중요한 이점이 있다.
1. 깔끔한 코드 :  전처리의 각 단계에서 데이터를 계산하는 것은 지저분해질 수 있다. 파이프라인을 이용해서 각 단계의 훈련, 검증 데이터를 수동으로 추적할 필요가 없다.
2. 버그 감소 : 단계를 잘 못 적용하거나 전처리 단계를 잊어버릴 가능성이 적다.
3. 쉬운 생산성 : 모델을 프로토타입에서 대규모로 배포할 수 있는 것으로 전환하는 것은 놀라울 정도로 여렵다 하지만 파이프라인을 통해 어느정도 해결이 가능하다.
4. 유효성 검사를 위한 추가 옵션 : 다음 챕터에서 교차 유효성 검사를 다루는 예제를 볼 수 있다.

## 예시
----
데이터를 불러오고 훈련, 학습 데이터로 나누는 것은 생략한다(라고 할뻔).


~~~py
import pandas as pd
from sklearn.model_selection import train_test_split

# Read the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# Separate target from predictors
y = data.Price
X = data.drop(['Price'], axis=1)

# Divide data into training and validation subsets
X_train_full, X_valid_full, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2,
                                                                random_state=0)

# "Cardinality" means the number of unique values in a column
# Select categorical columns with relatively low cardinality (convenient but arbitrary)
categorical_cols = [cname for cname in X_train_full.columns if X_train_full[cname].nunique() < 10 and 
                        X_train_full[cname].dtype == "object"]

# Select numerical columns
numerical_cols = [cname for cname in X_train_full.columns if X_train_full[cname].dtype in ['int64', 'float64']]

# Keep selected columns only
my_cols = categorical_cols + numerical_cols
X_train = X_train_full[my_cols].copy()
X_valid = X_valid_full[my_cols].copy()
~~~


### 1단계 파이프라인 단계 정의
`ColumnTransformer` 클래스를 사용해서 서로 다른 전처리 단계를 함께 묶는다.
~~~py
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder

# Preprocessing for numerical data
numerical_transformer = SimpleImputer(strategy='constant')

# Preprocessing for categorical data
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Bundle preprocessing for numerical and categorical data
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])
~~~

### 2단계 모델 정의
예제에서는 랜덤 포레스트 모델을 정의한다.
~~~py
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(n_estimators=100, random_state=0)
~~~

### 3단계 파이프라인 생성 및 평가

마지막으로 `Pipeline` 클래스를 사용해서 전처리 및 모델링 단계를 묶는 파이프라인을 정의한다. 주의해야 할 몇 가지 중요하 사항이 있다.

파이프라인을 사용해서 학습 데이터를 전처리하고 한 줄의 코드에 모델을 맞춘다.(만약 파이프라인이 없으면 대체, 원-핫인코딩 및 학습을 별도의 단계로 수행해야한다. 숫자 변수와 범주 변수를 모두 처리해야하면 매우 복잡해진다.)

파이프라인을 사용하면 X_valid의 처리되지 않은 기능을 `predict()` 명령에 제공하고 파이프라인은 예측을 생성하기 전에 기능을 자동으로 전처리함.(파이프라인이 없으면 예측하기 전에 검증 데이터 전처리를 해야한다.)  

~~~py
from sklearn.metrics import mean_absolute_error

# Bundle preprocessing and modeling code in a pipeline
my_pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                              ('model', model)
                             ])

# Preprocessing of training data, fit model 
my_pipeline.fit(X_train, y_train)

# Preprocessing of validation data, get predictions
preds = my_pipeline.predict(X_valid)

# Evaluate the model
score = mean_absolute_error(y_valid, preds)
print('MAE:', score)
~~~
<pre>
MAE: 160679.18917034855
</pre>

# 교차 검증 (Cross - Validation)
모델을 테스트하는 더 좋은 방법이다.

기계 학습은 반복적인 작업이다.  

사용할 예측 변수, 사용할 모델 유형, 해당 모델에 제공할 인수 등에 대한 선택에 직면하게 된다. 이 방법에는 몇가지 단점이 있다. 만약 5000개의 행이 있는 데이터 세트가 있다고 가정한다. 일반적으로 데이터의 약 20%를 유효성(검증) 데이터로 유지한다. 이 때문에 모델이 1000개 행에서는 부정확해도 다른 1000개 행의 한 세트에서는 잘 작동할 수 있다.

극단적으로 검증 데이터 셋 1행의 데이터만 있는 것을 상상하면 대체 모델을 비교하는 경우 단일 데이터 포인트에서 가장 좋은 예측을 하는 모델은 대부분 운빨이다.

일반적으로 검증 데이터 셋이 크면 무작위성(일명 노이즈)가 적고 더 신뢰할 수 있음. 하지만.. 현실은 훈련 데이터에서 검증 데이터를 얻을 수 있고 검증 데이터를 늘리면 훈련 데이터가 작아진다. 그로인해 모델이 더 나빠진다.

## 교차 검증이란?
----
교차 유효성 검사에는 데이터의 여러 하위 집합에 대해 모델링 프로세스를 실행하여 모델 품질에 대한 여러 척도를 얻는다.

예를 들어 데이터를 전체 데이터 셋의 각각 20%인 5개 조각으로 나누는 것으로 시작 가능하다. **이때 우리는 5개의 `폴드`로 나누었다고 말한다.**

![6](/assets/img/Intermediate%20ML/6.png)

그 다음 각 폴드에 대해 하나의 실험을 실행한다.

- 실험 1에서는 첫 번째 폴드를 검증 데이터로 사용하고 나머지는 훈련 데이터로 사용한다. 이를 통해 20% 검증 데이터를 기반으로 모델 품질을 측정할 수 있었다.
- 실험 2에서는 두 뻔째 폴드를 사용했고 품질을 측정했다. 
이런 방법으로 계속 반복하는 것이다.

## 교차 검증을 사용해야하는 시기
---
교차 검증은 모델 품질에 대한 보다 정확한 측정을 제공하며, 이는 많은 모델링 결정을 내리는 경우 특히 중요하다. 그러나 여러 모델을 추정하기 때문에 실행하는 데 시간이 오래 걸릴 수 있다.

따라서 이러한 장/단점을 감안할 때 각 접근 방식을 언제 사용하는게 효율적일까??

추가 계산 부담이 적은 소규모 데이터 세트의 경우 교차 검증을 실행해야한다. 더 큰 데이터 셋의 경우 단일 유효성 검사 세트로 충분하다. 코드가 더 빠르게 실행되고 검증을 위해 일부를 재사용할 필요가 거의 없을 만믐 충분한 데이터가 있을 수 있다.

??? : 큰 데이터/작은 데이터의 기준은 뭔데?  
없다. 보통 모델 실행이 몇 분 이하가 걸린다면 교차 검증으로 전환하는 것이 좋다.

교차 검증을 하는 예시를 보자

~~~py
import pandas as pd

# Read the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# Select subset of predictors
cols_to_use = ['Rooms', 'Distance', 'Landsize', 'BuildingArea', 'YearBuilt']
X = data[cols_to_use]

# Select target
y = data.Price
~~~

~~~py
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

my_pipeline = Pipeline(steps=[('preprocessor', SimpleImputer()),
                              ('model', 
                              RandomForestRegressor(
                                n_estimators=50,
                                random_state=0))
                                ])
~~~                             

사이킷런의 `cross_val_score()`함수로 교차 검증 점수를 얻는다. 매개변수 `cv`는 폴드를 의미함

~~~py
from sklearn.model_selection import cross_val_score

# Multiply by -1 since sklearn calculates *negative* MAE
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

`scoring` 매개변수는 출력할 모델의 품질의 척도를 선택함. 지금의 경우 음의 평균 절대 오차(nMAE)를 선택함. 다른 옵션은 [공식 문서](https://scikit-learn.org/stable/modules/model_evaluation.html)를 확인하라.

음의 MAE를 지정하는 것은 처음 봤을 텐데 사이킷런은 모든 메트릭(지표)이 정의되는 규칙이 있으므로 높은 숫자가 더 좋다. 

일반적으로 대체 모델을 비교하기 위해 모델 품질의 단일 척도를 원한다. 그래서 실험을 통해 평균을 취한다.
~~~py
print("Average MAE score (across experiments):")
print(scores.mean())
~~~
<pre>
Average MAE score (across experiments):
277707.3795913405
</pre>

# XGBoost
구조화된 데이터에 대한 가장 정확한 모델링 기법.

그래디언트 부스팅으로 모델을 구축하고 최적화하는 방법을 배운다. 이게 좀 중요한게 kaggle에서도 언급하지만 거의 지배적으로 쓴다?? 이런 느낌임

랜덤 포레스트 방법을 "앙상블 방법"이라고 한다. 정의에 따라 앙상블 방법은 여러 모델(랜덤 포레스트의 경우 여러 트리)의 예측을 결합한다.  


## 그래디언트 부스팅 (Gradient Boosting)
---
모델을 앙상블에 반복적으로 추가하기 위해 주기를 거치는 방법임.

예측이 매우 순진할 수 있는 단일 모델로 앙상블을 초기화하는 것으로 시작한다.(예측이 매우 부정확해도 앙상블에 대한 후속 추가는 오류를 해결할 것임)

1. 먼저 현재 앙상블을 사용하여 데이터 세트의 각 관찰에 대한 예측을 생성합니다. 예측을 하기 위해 앙상블에 있는 모든 모델의 예측을 추가합니다. 이러한 예측은 손실 함수(예: 평균 제곱 오차)를 계산하는 데 사용됩니다.
2. 그런 다음 손실 함수를 사용하여 앙상블에 추가될 새 모델을 피팅합니다. 특히 이 새로운 모델을 앙상블에 추가하면 손실이 줄어들도록 모델 매개변수를 결정합니다. (참고: "그라디언트 부스팅"의 "그레디언트(기울기)"는 이 새로운 모델의 매개변수를 결정하기 위해 손실 함수에서 경사하강법을 사용할 것이라는 사실을 나타냅니다.)  

![7](/assets/img/Intermediate%20ML/7.png)

~~~py
import pandas as pd
from sklearn.model_selection import train_test_split

# Read the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# Select subset of predictors
cols_to_use = ['Rooms', 'Distance', 'Landsize', 'BuildingArea', 'YearBuilt']
X = data[cols_to_use]

# Select target
y = data.Price

# Separate data into training and validation sets
X_train, X_valid, y_train, y_valid = train_test_split(X, y)
~~~

참고로 `XGBoost`는 속도, 성능에 초점을 둔 몇가지 추가 기능으로 GB(그래이언트 부스팅)을 구현한 것.

~~~py
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
            
~~~py
from sklearn.metrics import mean_absolute_error

predictions = my_model.predict(X_valid)
print("Mean Absolute Error: " + str(mean_absolute_error(predictions, y_valid)))
~~~

~~~
Mean Absolute Error: 239435.01260125183
~~~

## 파라미터 튜닝
----
XGBoost에는 정확도와 훈련 속도에 큰 영향을 미칠 수 있는 몇 가지 매개변수가 있습니다. 이해해야 하는 첫 번째 매개변수는 다음과 같다.

1. `n_estimators` : 모델링 주기를 거쳐야 하는 횟수를 지정함. 앙상블에 포함하는 모델의 수와 같음. 값이 너무 낮으면 과소적합 발생하니 주의 반대로 값이 너무 높으면 과적합이 발생함. 일반적인 값의 범위는 100-1000인데 learning_rate 매개변수에 따라 많이 달라짐.

~~~py
my_model = XGBRegressor(n_estimators=500)
my_model.fit(X_train, y_train)
~~~
<pre>
XGBRegressor(base_score=0.5, booster='gbtree', colsample_bylevel=1,
             colsample_bynode=1, colsample_bytree=1, enable_categorical=False,
             gamma=0, gpu_id=-1, importance_type=None,
             interaction_constraints='', learning_rate=0.300000012,
             max_delta_step=0, max_depth=6, min_child_weight=1, missing=nan,
             monotone_constraints='()', n_estimators=500, n_jobs=4,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, scale_pos_weight=1, subsample=1, tree_method='exact',
             validate_parameters=1, verbosity=None)
</pre>

2. `early_stopping_rounds` 는 위 매개변수의 이상적인 값을 자동으로 찾는 방법을 제공함. `n_estimators`에 대한 강제 중지가 없어도 점수가 개선되지 앟으면 모델이 반복을 멈춘다. `n_estimators`에 높은 값을 설정한 다음 `early_stopping_rounds`를 사용해서 반복을 멈출 최적의 시간을 찾는 것이 현명함.

임의로 유효성 검사 점수가 향상되지 않는 단일 턴(라운드, 반복 수?)이 발생하는 경우가 있으므로 중지하기 전에 허용할 연속 저하 반복 수를 지정해야 한다.  
`early_stopping_rounds=5`로 설정하는 것이 합리적인 선택이라고 한다. 이 경우 유효성 검사 점수가 5회 연속 하락한 후 중지함.  
`early_stopping_rounds`를 사용하는 경우 유효성 검사 점수를 계산하기 위해 일부 데이터를 별도로 설정해야 함. 이는 `eval_set` 매개변수를 설정하여 수행함.

~~~py
my_model = XGBRegressor(n_estimators=500)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)],
             verbose=False)
~~~
<pre>
XGBRegressor(base_score=0.5, booster='gbtree', colsample_bylevel=1,
             colsample_bynode=1, colsample_bytree=1, enable_categorical=False,
             gamma=0, gpu_id=-1, importance_type=None,
             interaction_constraints='', learning_rate=0.300000012,
             max_delta_step=0, max_depth=6, min_child_weight=1, missing=nan,
             monotone_constraints='()', n_estimators=500, n_jobs=4,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, scale_pos_weight=1, subsample=1, tree_method='exact',
             validate_parameters=1, verbosity=None)
</pre>             

3. `learning_rate`(학습률) : 각 구성 요소 모델의 예측을 단순히 합산하여 예측을 얻는 대신 각 모델의 예측을 더하기 전에 작은 수를 곱할 수 있다. 이건 우리가 앙상블에 추가하는 각 나무가 우리에게 덜 도움이 된다는 것을 의미한다. 따라서 과적합 없이 `n_estimators`에 더 높은 값을 설정할 수 있다. 기본적으로 XGBoost는 학습률을 0.1로 설정한다.  

~~~py
my_model = XGBRegressor(n_estimators=1000, learning_rate=0.05)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)], 
             verbose=False)
~~~
<pre>
XGBRegressor(base_score=0.5, booster='gbtree', colsample_bylevel=1,
             colsample_bynode=1, colsample_bytree=1, enable_categorical=False,
             gamma=0, gpu_id=-1, importance_type=None,
             interaction_constraints='', learning_rate=0.05, max_delta_step=0,
             max_depth=6, min_child_weight=1, missing=nan,
             monotone_constraints='()', n_estimators=1000, n_jobs=4,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, scale_pos_weight=1, subsample=1, tree_method='exact',
             validate_parameters=1, verbosity=None)
</pre>      

4. `n_jobs` : 런타임이 고려되는 더 큰 데이터 세트에서 **병렬 처리** 를 사용하여 모델을 더 빠르게 구축할 수 있다. `n_jobs` 매개변수를 컴퓨터의 코어 수와 동일하게 설정하는 것이 일반적임. 더 작은 데이터 세트에서는 도움이 안됨.

>참고로 사이킷런은 GPU가속 안되는 것으로 알고있음.   
>Kaggle 환경에서는 CPU가 케글 서버 컴퓨팅이지만 로컬에서 작업을 하면 코어수를 확인해 볼 것.

~~~py
my_model = XGBRegressor(n_estimators=1000, learning_rate=0.05, n_jobs=4)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)], 
             verbose=False)
~~~
<pre>
XGBRegressor(base_score=0.5, booster='gbtree', colsample_bylevel=1,
             colsample_bynode=1, colsample_bytree=1, enable_categorical=False,
             gamma=0, gpu_id=-1, importance_type=None,
             interaction_constraints='', learning_rate=0.05, max_delta_step=0,
             max_depth=6, min_child_weight=1, missing=nan,
             monotone_constraints='()', n_estimators=1000, n_jobs=4,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, scale_pos_weight=1, subsample=1, tree_method='exact',
             validate_parameters=1, verbosity=None)
</pre>

# 데이터 유출 (Data Laeakage)
미묘하게 모델을 고장시키는?? 문제를 찾아서 수정하기임

데이터 유출이 무엇이며 방지하는 방법에 대해 소개한다.

데이터 유출은 훈련 데이터에 대상에 대한 정보가 포함되어 있지만 모델이 예측에 사용될 때 유사한 데이터를 사용할 수 없을 때 발생함. 때문에 훈련 데이터 셋 또는 검증 데이터에서 높은 성능을 얻을 수 있지만 실제로는 저하됨.

즉, 유출 인해 모델로 의사 결정을 시작할 때까지 모델이 정확해 보이다가 모델이 매우 부정확해진다.

유출(Leakage)에는 2가지 유형이 있다.
1. 타겟 유출 : 예측 시점에 사용할 수 없는 데이터가 예측 변수에 포함될 때 발생한다. 기능이 좋은 예측을 만드는 데 도움이 되는지 여부가 아니라 데이터를 사용할 수 있게 되는 시기 또는 연대순으로 유출을 생각하는게 중요함.

예를 들어 누가 폐렴에 걸릴지 예측하는 것을 상상하자 원래 데이터의 상위 몇 행은 아래와 같다.  
<table>
<thead><tr>
<th style="text-align:center">got_pneumonia</th>
<th style="text-align:center">age</th>
<th style="text-align:center">weight</th>
<th style="text-align:center">male</th>
<th style="text-align:center">took_antibiotic_medicine</th>
<th>...</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">False</td>
<td style="text-align:center">65</td>
<td style="text-align:center">100</td>
<td style="text-align:center">False</td>
<td style="text-align:center">False</td>
<td>...</td>
</tr>
<tr>
<td style="text-align:center">False</td>
<td style="text-align:center">72</td>
<td style="text-align:center">130</td>
<td style="text-align:center">True</td>
<td style="text-align:center">False</td>
<td>...</td>
</tr>
<tr>
<td style="text-align:center">True</td>
<td style="text-align:center">58</td>
<td style="text-align:center">100</td>
<td style="text-align:center">False</td>
<td style="text-align:center">True</td>
<td>...</td>
</tr>
</tbody>
</table>

사람들은 폐렴에 걸린 후 회복을 위해 항생제를 복용한다. 원시 데이터는 이러한 열 간의 강한 관계를 보여주지만 `got_pneumonia`에 대한 값이 결정된 후 `take_antibiotic_medicine`이 자주 변경된다. 이것은 타겟 누출이다.  

모델은 `take_antibiotic_medicine`에 대해 `False` 값을 가진 사람은 누구나 폐렴에 걸리지 않았음을 확인할 것이다. 유효성 검사 데이터는 교육 데이터와 동일한 소스에서 가져오므로 유효성 검사에서 패턴이 반복되며 모델의 유효성 검사(또는 교차 유효성 검사) 점수가 높아진다.

그러나 이 모델은 나중에 실제 배치될 때 매우 부정확할 것임. **왜냐하면 폐렴에 걸릴 환자도 미래 건강에 대해 예측해야 할 때 아직 항생제를 투여받지 않았기 때문입니다.**

**이러한 유형의 데이터 유출을 방지하려면 목표값이 실현된 후에 업데이트(또는 생성)되는 모든 변수를 제외해야 한다.**

![8](/assets/img/Intermediate%20ML/8.png)

2. Train-Test 오염 : 학습 데이터와 유효성 검사 데이터를 구분하지 않을 때 다른 유형의 유출이 발생함. 검증 데이터가 어떤 것을 의미했는지 다시 생각해보셈. 

작은 데이터를 가지고 교차 검증을 사용해서 모댈 품질의 정확한 측정을 보장한다.
~~~py
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

# Since there is no preprocessing, we don't need a pipeline (used anyway as best practice!)
my_pipeline = make_pipeline(RandomForestClassifier(n_estimators=100))
cv_scores = cross_val_score(my_pipeline, X, y, 
                            cv=5,
                            scoring='accuracy')

print("Cross-validation accuracy: %f" % cv_scores.mean())

~~~

<pre>
Cross-validation accuracy: 0.979537
</pre>

아마 계속 모델을 만들고 측정하다 보면 거의 대부분이 정확한 모델을 찾는일이 드문 것을 알 것임. 하지만 데이터 유출에 대해서 만큼은 더 면멸하게 검사해야 할 만큼 흔하지 않다.

데이터에 의심점이 있다고 가정한다. 예를 들어 지출이라는 변수는 이 카드에 대한 지출을 의미하는지 신청하기 전에 사용한 카드에 대한 지출을 의미하는지 모호하다.
~~~py
expenditures_cardholders = X.expenditure[y]
expenditures_noncardholders = X.expenditure[~y]

print('Fraction of those who did not receive a card and had no expenditures: %.2f' \
      %((expenditures_noncardholders == 0).mean()))
print('Fraction of those who received a card and had no expenditures: %.2f' \
      %(( expenditures_cardholders == 0).mean()))
~~~
<pre>
Fraction of those who did not receive a card and had no expenditures: 1.00
Fraction of those who received a card and had no expenditures: 0.02
</pre>

결과 처럼 카드를 받지 못한 사람은 모두 지출이 없었고, 받은 사람 2%만이 지출이 없었음. 이 경우 타겟 유출이라 볼 수 있다.

~~~py
# Drop leaky predictors from dataset
potential_leaks = ['expenditure', 'share', 'active', 'majorcards']
X2 = X.drop(potential_leaks, axis=1)

# Evaluate the model with leaky predictors removed
cv_scores = cross_val_score(my_pipeline, X2, y, 
                            cv=5,
                            scoring='accuracy')

print("Cross-val accuracy: %f" % cv_scores.mean())
~~~
<pre>
Cross-val accuracy: 0.832440
</pre>

**정확도가 다소 낮지만 유출 모델은 교차 검증에서 더 높은 점수에도 실제로는 더 나쁠 것임을 기억하자.**

> 데이터 유출이 감이 안올텐데 간단하게 말하면 변경되지 않을 경우 예측에 사용해도 됨.(새로운 데이터가 들어와도 변경이 안되어있으니깐) 다만 변경 시점도 모르고 자주 변경되는 변수의 경우엔 유출의 가능성이 있다.



![9](/assets/img/수료증/박정현-IntermediateML.png)
