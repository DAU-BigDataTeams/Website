---
title: Intermediate_ML_2 범주형 변수를 처리하는 방법과 파이프라인에 대해 알아보자!
layout: post   
categories : [ML, kaggle, Categorical variable, Pipeline]
image : assets/img/수료증/shshuu-Intermediate_ML.png
description: kaggle의 Intermediate Machine Learning 코스 3,4 챕터 정리
customexcerpt: Categorical Variables(범주형 변수)을 처리하는 방법에는 범주형 변수 삭제, 순서형 인코딩, 단일 핫 인코딩이 있다.
---

# Intermediate Machine Learning 2

Intermediate Machine Learning 1 포스팅에 이어서, 계속하여 Machine Learning 전문 지식을 쌓아보자

# 3. Categorical Variables

범주형 변수가 무엇인지, 범주형 변수를 처리하기 위한 세 가지 접근 방식에 대해 알아보자.  

## Introduction  
-----

 범주형 변수는 제한된 수의 값만 사용한다.    

 아침을 얼마나 자주 먹는지를 묻고 "절대 안 먹어", "거의 안 먹어". "대부분의 날" 또는 "매일"의 네 가지 옵션을 제공하는 설문 조사를 생각해보자.  
 이 경우, 반응은 고정된 범주 집합으로 분류되기 때문에 데이터가 범주형이다.    

 이러한 범주형 변수들을 사전 처리하지 않고 Python의 대부분의 기계 학습 모델에 연결하려고 하면 오류가 발생한다. 범주형 데이터를 사전처리하는 세 가지 방법에 대해 알아보자.  

## Three Approaches
---

### 1) Drop Categorical Variables
 범주형 변수를 처리하는 가장 쉬운 방법은 데이터 집합에서 범주형 변수를 제거하는 것이다. 이 방법은 열에 유용한 정보가 없는 경우에만 효과적이라는 단점이 있긴 하다.  

### 2) Ordinal Encoding
 순서형 인코딩은 각 고유 값을 다른 정수에 할당한다.  
 이 접근 방식은 범주의 순서를 가정한다.    

 ![approach_2](assets/img/Itm_ML_part2_01_approach2.JPG)

 "절대" (0) < "거의" (1) < "대부분의 날" (2) < "매일"(3)
 
 위의 예에서 이 가정은 타당하다. 왜냐면 범주에는 논쟁의 여지가 없는 순위가 있기 때문이다. 모든 범주형 변수가 값의 순서가 명확하지는 않지만 **순서형 변수로 사용되는 변수**를 말하는데, 트리 기반 모델(ex. 의사 결정 트리 및 랜덤 포레스트)의 경우 순서형 인코딩이 순서형 변수와 잘 작동할 것이라 예상할 수 있을 것이다.  

### 3) One-Hot Encoding
 단일 핫 인코딩은 원래 데이터에서 가능한 각 값의 존재(또는 존재하지 않음)를 나타내는 새로운 열을 만든다. 이렇게만 보면 무슨 말인지 잘 모르겠으니 예시를 통해 이해해보자!  

 ![approach_3](assets/img/Itm_ML_part2_02_approach3.JPG)

 원래 데이터 집합에서 "색상"은 "빨강", "노랑", "초록"의 세 가지 범주를 가진 범주형 변수이다. 단일 핫 인코딩에는 가능한 각 값에 대해 하나의 열과 원래의 데이터 집합의 각 행에 대해 하나의 행이 포함된다. (원래 데이터셋에서 가로로 늘리는 느낌!) 원래 값이 "빨강"이었다면 "빨강" 열에 1을 넣고, 원래 값이 "노랑"이었다면 "노랑"열에 1을 넣는 식이다.    
 
 !!! **범주형 데이터를 담은 행을 각각 열로 올려서** 존재를 확인하는? 이런 느낌인가보다.    

 순서형 인코딩과 다르게 단일 핫 인코딩은 범주의 순서를 가정하지 않는다. 따라서 단일 핫 인코딩은 **범주형 데이터에 명확한 순서가 없는 경우**에 효과적인 방법이다. 색상에 순서가 있지는 않으니! 이런 **고유 순서가 없는 범주형 변수**를 **명목 변수**라 한다.    

 범주형 변수가 많은 값을 차지하는 경우 단일 핫 인코딩은 제대로 수행되지 않는다. (일반적으로 15개 이상의 다른 값을 사용하는 변수에는 적합하지 않음)

 ## Example
 멜버른 하우징 데이터셋으로 위 3가지 approach들을 적용하여 범주형 변수를 처리해보자.

~~~py
import pandas as pd
from sklearn.model_selection import train_test_split

# Read the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# Separate target from predictors
y = data.Price
X = data.drop(['Price'], axis=1)

# Divide data into training and validation subsets
X_train_full, X_valid_full, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2, random_state=0)

# Drop columns with missing values (simplest approach)
cols_with_missing = [col for col in X_train_full.columns if X_train_full[col].isnull().any()] 
X_train_full.drop(cols_with_missing, axis=1, inplace=True)
X_valid_full.drop(cols_with_missing, axis=1, inplace=True)

# "Cardinality" means the number of unique values in a column
# Select categorical columns with relatively low cardinality (convenient but arbitrary)
low_cardinality_cols = [cname for cname in X_train_full.columns if X_train_full[cname].nunique() < 10 and 
                        X_train_full[cname].dtype == "object"]

# Select numerical columns
numerical_cols = [cname for cname in X_train_full.columns if X_train_full[cname].dtype in ['int64', 'float64']]

# Keep selected columns only
my_cols = low_cardinality_cols + numerical_cols
X_train = X_train_full[my_cols].copy()
X_valid = X_valid_full[my_cols].copy()
 ~~~

 데이터셋을 불러왔으니 데이터셋이 어떻게 생겼는지 알아보자!
 ~~~py
 X_train.head()
 ~~~
|       | Type | Method | Method                | Rooms | Distance | ... |
|-------|------|--------|-----------------------|-------|----------|-----|
| 12167 | u    | S      | Southern Metropolitan | 1     | 5.0      |     |
| 6524  | h    | SA     | Western Metropolitan  | 2     | 8.0      |     |
| 8413  | h    | S      | Western Metropolitan  | 3     | 12.6     |     |
| 2919  | u    | SP     | Northern Metropolitan | 3     | 13.0     |     |
| 6043  | h    | S      | Western Metropolitan  | 3     | 13.3     |     |

다음으로 training data로부터 모든 범주형 변수의 목록을 얻어보자.  
각 열의 데이터 유형(dtype)을 확인해보자, object dtype은 열에 텍스트가 있음을 나타낸다.  
위 데이터셋의 경우 텍스트가 있는 열은 범주형 변수를 나타낸다.  

~~~py
# Get list of categorical variables
s = (X_train.dtypes == 'object')
object_cols = list(s[s].index)

print("Categorical variables:")
print(object_cols)
~~~
~~~py
Categorical variables:
['Type', 'Method', 'Regionname']
~~~

**각 접근 방식의 품질을 측정하는 함수 정의**
범주형 변수를 처리하기 위한 세 가지 접근 방식을 비교하기 위해 함수 score_dataset()을 정의해보자. 이 함수는 랜덤 포레스트 모델의 절대 오차(MAE)를 알려준다. 일반적으로 MAE가 가능한 낮은 것이 좋은 모델이다.    

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

### Score from Approach 1 (Drop Categorical Variables)  
select_dtypes() 메서드를 사용해 개체 열을 삭제하는 방법.
~~~py
drop_X_train = X_train.select_dtypes(exclude=['object'])
drop_X_valid = X_valid.select_dtypes(exclude=['object'])

print("MAE from Approach 1 (Drop categorical variables):")
print(score_dataset(drop_X_train, drop_X_valid, y_train, y_valid))
~~~
~~~py
MAE from Approach 1 (Drop categorical variables):
175703.48185157913
~~~

### Score from Approach 2 (Ordinal Encoding)
Scikit-learn에는 순서 인코딩을 가져오는 데 사용할 수 있는 순서 인코더 클래스가 있다. 요 친구를 이용해보자!  
~~~py
from sklearn.preprocessing import OrdinalEncoder

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
~~~py
MAE from Approach 2 (Ordinal Encoding):
165936.40548390493
~~~

위의 코드에서 각 열에 대해 각 고유 값을 서로 다른 정수에 랜덤하게 할당한다. 이는 사용자 지정 레이블을 제공하는 것보다 간단한 접근방식이지만, 모든 순서형 변수에 대해 더 나은 정보를 제공하는 경우 성능이 추가로 향상될 수도 있다.  

### Score from Approach 3 (One-Hot Encoding)
단일 핫 인코딩을 얻기 위해 scikit-learn의 OneHotEncoder 클래스를 사용하자. 동작을 사용자 지정하는 데 사용할 수 있는 여러 매개 변수가 있다.
 - **handle_proxy='proxy'**  
 유효성 검사 데이터에 training data에 표시되지 않는 클래스가 퐇ㅁ되어 있을 때 오류를 방지하기 위해서 설정함
 - **sparse=False**
 인코딩된 열이 numpy 배열(sparse 행렬 대신)로 반환됨

 인코더를 사용하기 위해 우리는 단일 핫 인코딩을 원하는 범주형 열만 제공한다.  
 예를 들어 training data를 인코딩하기 위해 X_train[object_cols]를 제공한다. (아래 코드 셀의 object_cols는 범주형 데이터가 포함된 열 이름의 리스트이므로 X_train[object_cols]에는 training set의 범주형 데이터가 모두 포함된다.)

~~~py
from sklearn.preprocessing import OneHotEncoder

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
~~~py
MAE from Approach 3 (One-Hot Encoding):
166089.4893009678
~~~

## Which approach is best
 위의 경우 범주형 열을 떨어뜨리는 것(Approach1)이 가장 높은 MAE 점수를 받았기 때문에 가장 낮은 성능을 보였다.  
 다른 두 가지 접근 방식의 경우, 반환된 MAE 점수의 가치가 매우 비슷한 수치이기 때문에 서로에 대한 의미있는 이점은 없어보인다.    

 **일반적으로 단일 핫 인코딩(Approach3)이 가장 잘 수행**되고, 범주형 열 삭제(Approach1)가 가장 잘 수행되지 않지만 경우에 따라 다르다.

# 4.Pipelines
Pipeline을 사용하여 모델링 코드를 정리해보자.  

## Introduction
**Pipelines**은 데이터 사전 처리 및 모델링 코드를 체계적으로 유지하는 간단한 방법이다. 특히 파이프라인은 전처리 및 모델링 단계를 번들로 제공하므로 전체 번들을 단일 단계처럼 사용할 수 있다.    

파이프라인 없이 모델을 함께 해킹하지만 파이프라인에는 몇 가지 중요한 이점이 있다.  
* **Cleaner Code**:  
 저너리의 각 단계에서 데이터를 회계 처리하는 것은 번거로울 수 있다. 파이프라인을 사용하면 각 단계에서 training 및 validation data를 수동으로 추적할 필요가 있다.  

 * **Fewer Bug**:  
 단계를 잘못 적용하거나 전처리 단계를 잊어버릴 가능성이 적다.

 * **Easier to Productionize**:  
 모델을 프로토타입에서 규모에 맞게 배치할 수 있는 것으로 전환하는 것은 놀라울 정도로 어려울 수 있다. 이런 점을 개선하는 데에 파이프라인이 도움이 될 수 있다.

 * **More Options for Model Validation**  
   
## Example
멜버른 하우징 데이터셋으로 돌려보며 이해해보자. 위의 예제와 같은 방법으로 데이터셋을 가져오면 된다.  
데이터셋에는 범주형 데이터와 결측값이 있는 열이 모두 포함되어 있다. 파이프라인을 사용하면 두 가지를 모두 쉽게 처리할 수 있다.  

 데이터셋을 불러왔으니 데이터셋이 어떻게 생겼는지 알아보자!
 ~~~py
 X_train.head()
 ~~~
|       | Type | Method | Method                | Rooms | Distance | ... |
|-------|------|--------|-----------------------|-------|----------|-----|
| 12167 | u    | S      | Southern Metropolitan | 1     | 5.0      |     |
| 6524  | h    | SA     | Western Metropolitan  | 2     | 8.0      |     |
| 8413  | h    | S      | Western Metropolitan  | 3     | 12.6     |     |
| 2919  | u    | SP     | Northern Metropolitan | 3     | 13.0     |     |
| 6043  | h    | S      | Western Metropolitan  | 3     | 13.3     |     |

전체 파이프라인을 세 단계로 구성한다.  

### 1단계: 전처리 단계 및 정의
 파이프라인이 전처리 및 모델링 단계를 함께 번들링하는 방법과 유사하게 Column Transformer 클래스를 사용하여 서로 다른 전처리 단계를 번들링한다.
 - 수치 데이터의 결측값을 대체
 - 결측값을 입력하고 범주형 데이터에 단일 핫 인코딩을 적용

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

### 2단계: 모델 정의
다음으로, RandomForestRegressor 클래스를 사용하여 랜덤 포레스트 모델을 정의한다.  

~~~py
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(n_estimators=100, random_state=0)
~~~

### 3단계: 파이프라인 생성 및 평가
마지막으로 Pipeline 클래스를 사용하여 전처리 및 모델링 단계를 번들링하는 파이프라인을 정의한다.  

- 파이프라인을 사용하면 training data를 전처리하고 모델 fitting시키는 작업을 코드 한 줄로 끝낼 수 있다. (반면, 파이프라인이 없으면 대체, 단일 핫 인코딩 및 모델 training을 별도의 단계로 수행해야 한다. 수치 변수와 범주형 변수를 모두 처리해야 하는 경우 더 복잡해짐)  

- 파이프라인을 사용하여 X_valid의 처리되지 않은 Feature를 predict() 명령에 제공하고 파이프라인은 예측을 생성하기 전에 Feature를 자동으로 전처리한다. (파이프라인이 없으면 예측하기 전에 validation data를 전처리 따로 해주어야 함)

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
~~~py
MAE: 160679.18917034855
~~~

## Conclusion
파이프라인은 머신러닝 코드를 정리하고 오류를 방지하는 데 유용하며, 특히 정교한 데이터 전처리가 있는 워크플로우에 유용하다.


![intermediate_ML](/assets/img/수료증/shshuu-Intermediate_ML.png)