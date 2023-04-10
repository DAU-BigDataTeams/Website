---
title: Intermediate ML 1 결측값을 처리하는 방법에 대해 알아보자!
layout: post   
categories : [ML, kaggle, Imputation, Missing Value]
image : /assets/img/수료증/박민서-Intermediate_ML.png
description: kaggle의 Intermediate Machine Learning 코스 1,2 챕터 정리
customexcerpt: Missing Value(결측값)을 처리하는 방법에는 결측값이 포함된 열 삭제하기, 대체하기, 대체에 대한 확장으로 3가지 방법이 있다.     
---


작성자 : 박민서
# Intermediate Machine Learning 1
<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 
# 1. Introduction

## Introduction  
-----
 Intro to Machine Learning 코스를 이수 하였으니, Intermediate Machine Learning 코스를 통하여 Machine Learning 전문 지식을 더 쌓아보자.

 * 실제 data set에서 자주 발견되는 데이터 유형(대수 값, 범주형 변수)을 다루기
 * Machine Learning 코드의 품질을 개선하기 위한 파이프라인 설계하기
 * 모델 유효성 검사(교차 유효성 검사)에 더 뛰어난 기술을 사용하기
 * kaggle 대회에서 우승하는 데 널리 사용되는 최첨단 모델 구축하기(XGBoost)
 * 일반적이고 중요한 데이터 과학 실수들(예를 들자면 누락)을 방지하기

## Prerequisites
---

Machine Learning을 처음 시작하는 거라면, [Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning) 코스를 먼저 수료하고 오길 바란다.

# 2. Missing Values

결측값을 처리하는 세 가지 방법에 대해 알아보자.  
실제 data set에서 이러한 접근 방식의 효과를 비교해보자.  

## Introduction
---
대부분의 Machine Learning 라이브러리(Skikit-learn 포함)는 결측값이 있는 데이터를 사용하여 모델을 구축하려고 하면 오류가 발생한다.  
따라서 아래 전략 중 하나를 선택하여 결측값을 처리해주어야 한다.

## Three Approaches
---
### 1) A Simple Option: **Drop Columns with Missing Values**
가장 간단한 방법은 결측값이 포함된 열을 삭제하는 것이다.  

![approach_1](/assets/img/Intermediate%20ML/Itm_ML_01_approach1.JPG)

삭제된 열의 대부분의 값이 누락되지 않은 경우, 이 방법을 사용하면 (어쩌면 유용할지도 모르는) 많은 정보들에 액세스할 수 없게 된다.  
극단적인 예로 10,000개의 행이 있는 데이터셋을 생각해보자.  
여기서 중요한 열의 한 항목만 누락되어 있더라도, 이 접근법을 사용하면 해당 열을 완전히 삭제하게 될 것이다.  
  
**즉, 특정 열의 대부분의 값이 누락된 경우에만 이 접근법이 쓸만하다.**  
특정 열의 아주 아주 작은 부분만 누락된 경우에는 이 접근법은 별로인듯...  
(아주 아주 작은 누락값 때문에 전체를 날려먹는...)

### 2) A Better Option: **Imputation**
Imputation(대체)은 결측값을 일부 숫자로 채운다.  
예를 들어, 각 열의 평균값으로 채울 수 있다.  

![approach_2](/assets/img/Intermediate%20ML/Itm_ML_02_approach2.JPG)

대부분의 경우 **Imputation 값이 정확하지는 않지만 일반적으로 열 전체를 삭제하는 것보다는 더 정확한 모델을 만들 수 있다.**  

### 3) **An Extension To Imputation**
Imputation(대체)은 표준적인 접근법이고, 보통 잘 작동하지만 Imputation된 값은 체계적으로 실제 값보다 높거나 낮을 수 있다.  
  
또는 결측값이 있는 행은 다른 방식으로 고유할 수 있다.  
이 경우 모델에서 원래 누락된 값을 고려하여 더 나은 예측을 할 수 있다.  

![approach_3](/assets/img/Intermediate%20ML/Itm_ML_03_approach3.JPG)

이 접근법에서는 이전과 같이 결측값을 Imputation한다. 또한 원래 data set에서 누락된 항목이 있는 각 열에 대해 대체된 항목의 위치를 보여주는 새 열을 추가한다.  

경우에 따라 결과가 의미있게 개선될 수 있다. (별 도움 안 될 때도 있음...)  
**Imputation(대체)된 값인지 아닌지를 나타내는 열이 추가된다고 보면 된다.**

## Example
---
~~~py
import pandas as pd # pandas 라이브러리 import
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
# training data:test data = 8:2 비율로 split 하기
# random_state 인자는 random값을 고정하는 역할을 수행함
# (8:2 비율로 내부적으로 데이터를 나눌 때 랜덤하게 나눈다)
~~~
### Define Function to Measure Quality of Each Approach
(각 접근 방식의 품질을 측정하기 위한 함수 정의하기)  
  
누락값을 처리하기 위한 다양한 접근 방식을 비교하기 위해 함수 score_dataset()을 정의한다.  
이 함수는 랜덤 포레스트 모델의 평균 절대 오차(Mean absolute error: **MAE**)를 보고한다.  

~~~py
from sklearn.ensemble import RandomForestRegressor # 랜덤포레스트
from sklearn.metrics import mean_absolute_error # MAE

# Function for comparing different approaches
def score_dataset(X_train, X_valid, y_train, y_valid):
    model = RandomForestRegressor(n_estimators=10, random_state=0)
    model.fit(X_train, y_train)
    preds = model.predict(X_valid)
    return mean_absolute_error(y_valid, preds)
~~~

### - Approach 1의 MAE (결측값이 있는 열 삭제)
training set, validation set로 작업하기 때문에 두 데이터 프레임에서 동일한 열을 삭제하려면 유의해야 한다.

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
~~~
MAE from Approach 1 (Drop columns with missing values):
183550.22137772635
~~~

### - Approach 2의 MAE (대체)

SimpleInputer을 사용하여 결측값을 각 열의 평균 값으로 바꾼다.  
단순하지만 평균 값을 채우는 것은 일반적으로 꽤 잘 수행된다. (그러나 dataset에 따라 다르다.)  
  
통계학자들은 대체값을 결정하는 더 복잡한 방법(ex. 회귀 대체)을 실험했지만, 복잡한 방법은 일반적으로 결과를 정교한 Machine Learning 모델에 연결하더라도 추가적인 이점이 없다.  

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
~~~
MAE from Approach 2 (Imputation):
178166.46269899711
~~~

Approach 2의 MAE가 Approach 1의 MAE보다 낮으므로, 이 dataset에서는 Approach 2가 더 나은 성능을 보인다는 것을 알 수 있다.  

### - Approach 3의 MAE (대체에 대한 확장)
누락된 값을 대체하는 동시에, 어떤 값이 대체되었는지 추적한다.

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
~~~
MAE from Approach 3 (An Extension to Imputation):
178927.503183954
~~~
위 결과를 보면, Approach 3이 Approach 2보다 약간 더 나쁜 성능을 보였다.  
그렇다면, 왜 Approach 2(대체)가 Approach 1(열을 삭제하는 것)보다 더 나은 성과를 냈을까?  
  
training data에는 10864개의 행과 12개의 열이 있으며, 세 개의 열에 결측값이 포함되어 있다.  
  
**각 열에 대해 누락된 항목이 절반 미만**이므로, **열을 삭제하면 많은 유용한 정보가 제거되기 때문에** 대체가 더 잘 수행되었다고 볼 수 있다.

~~~py
# Shape of training data (num_rows, num_columns)
print(X_train.shape)

# Number of missing values in each column of training data
missing_val_count_by_column = (X_train.isnull().sum())
print(missing_val_count_by_column[missing_val_count_by_column > 0])
~~~
~~~
(10864, 12)
Car               49
BuildingArea    5156
YearBuilt       4307
dtype: int64
~~~

## Conclusion
일반적으로 **결측값을 대체하는 방법**(Approach 2, Approach 3)은 결측값이 있는 열을 단순히 삭제했을 때(Approach 1)에 비해 **더 나은 결과를 산출**하는 것을 알 수 있다.  

![intermediate_ML](/assets/img/수료증/박민서-Intermediate_ML.png)