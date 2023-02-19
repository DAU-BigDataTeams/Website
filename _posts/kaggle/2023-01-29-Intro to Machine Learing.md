---
title: Intro to Machine Learning
layout: post   
categories : [ML, kaggle]
image : /assets/img/수료증/박정현-IntroML수료증.png
description: kaggle의 Intro to Machine Learning과정 정리
customexcerpt: kaggle의 Intro to Machine Learning를 수료하다!
---

# Introduction

기계 학습 모델(ML)의 작동 방식과 사용 방법에 대해 개요부터 시작한다. 이전에 통계 모델링이나 머신 러닝을 해본 적이 있으면 기초로 느껴질 것임(그래도 기초 탄탄 마인드로 해봤음)

참고로 **데이터에서 패턴을 포착하는 단계를 모델 피팅/학습이라함. 모델을 fitting 하는데 사용하는 데이터는 훈련 데이터라고 부른다.**

# 기본 데이터 탐색(Basic Data Exploration)
- 해당 챕터는 데이터를 로드하고 이해하는 내용을 담았음.

## Pandas를 사용하여 데이터에 익숙해지기(Using Pandas to Get Familiar With Your Data)
----
ML을 하기전에 기본적으로 데이터를 다뤄야하는데 이를 위해 Pandas 라이브러리를 사용한다. 

> BigDataTeam 1기 멤버들은 Kaggle의 Pandas과정을 수료했기 때문에 이미 알고 있을 거라 믿는다(제발) 

그럼 Pandas를 이용해서 Kaggle이 제공하는 데이터를 로드해보자

~~~py
import pandas as pd

# save filepath to variable for easier access
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
# read the data and store data in DataFrame titled melbourne_data
melbourne_data = pd.read_csv(melbourne_file_path) 
# print a summary of the data in Melbourne data
melbourne_data.describe()
~~~

<table border="1" >
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Rooms</th>
      <th>Price</th>
      <th>Distance</th>
      <th>Postcode</th>
      <th>Bedroom2</th>
      <th>Bathroom</th>
      <th>Car</th>
      <th>Landsize</th>
      <th>BuildingArea</th>
      <th>YearBuilt</th>
      <th>Lattitude</th>
      <th>Longtitude</th>
      <th>Propertycount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>13580.000000</td>
      <td>1.358000e+04</td>
      <td>13580.000000</td>
      <td>13580.000000</td>
      <td>13580.000000</td>
      <td>13580.000000</td>
      <td>13518.000000</td>
      <td>13580.000000</td>
      <td>7130.000000</td>
      <td>8205.000000</td>
      <td>13580.000000</td>
      <td>13580.000000</td>
      <td>13580.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2.937997</td>
      <td>1.075684e+06</td>
      <td>10.137776</td>
      <td>3105.301915</td>
      <td>2.914728</td>
      <td>1.534242</td>
      <td>1.610075</td>
      <td>558.416127</td>
      <td>151.967650</td>
      <td>1964.684217</td>
      <td>-37.809203</td>
      <td>144.995216</td>
      <td>7454.417378</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.955748</td>
      <td>6.393107e+05</td>
      <td>5.868725</td>
      <td>90.676964</td>
      <td>0.965921</td>
      <td>0.691712</td>
      <td>0.962634</td>
      <td>3990.669241</td>
      <td>541.014538</td>
      <td>37.273762</td>
      <td>0.079260</td>
      <td>0.103916</td>
      <td>4378.581772</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>8.500000e+04</td>
      <td>0.000000</td>
      <td>3000.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1196.000000</td>
      <td>-38.182550</td>
      <td>144.431810</td>
      <td>249.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2.000000</td>
      <td>6.500000e+05</td>
      <td>6.100000</td>
      <td>3044.000000</td>
      <td>2.000000</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>177.000000</td>
      <td>93.000000</td>
      <td>1940.000000</td>
      <td>-37.856822</td>
      <td>144.929600</td>
      <td>4380.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>3.000000</td>
      <td>9.030000e+05</td>
      <td>9.200000</td>
      <td>3084.000000</td>
      <td>3.000000</td>
      <td>1.000000</td>
      <td>2.000000</td>
      <td>440.000000</td>
      <td>126.000000</td>
      <td>1970.000000</td>
      <td>-37.802355</td>
      <td>145.000100</td>
      <td>6555.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3.000000</td>
      <td>1.330000e+06</td>
      <td>13.000000</td>
      <td>3148.000000</td>
      <td>3.000000</td>
      <td>2.000000</td>
      <td>2.000000</td>
      <td>651.000000</td>
      <td>174.000000</td>
      <td>1999.000000</td>
      <td>-37.756400</td>
      <td>145.058305</td>
      <td>10331.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>10.000000</td>
      <td>9.000000e+06</td>
      <td>48.100000</td>
      <td>3977.000000</td>
      <td>20.000000</td>
      <td>8.000000</td>
      <td>10.000000</td>
      <td>433014.000000</td>
      <td>44515.000000</td>
      <td>2018.000000</td>
      <td>-37.408530</td>
      <td>145.526350</td>
      <td>21650.000000</td>
    </tr>
  </tbody>
</table>

## 데이터 설명 해석(Interpreting Data Description)
---

표를 보면 원본 데이터 셋의 각 열에 대해 8개의 숫자가 표시된다.(행이 8개~)
count 행은 누락되지 않은 값이 있는 행 수를 보여준다.

누락된 값은 여러 이유가 있지만, 여기서 다룰 내용은 아니라고 함.(kaggle이 그렇다는데..)

mean 행은 평균을 나타낸다.  
std 행은 표준편차를 의미한다.  

그리고 min,max,25%, 50%, 75%는 말 그대로 그 열에서 해당하는 값을 보여준다.

# 첫 번째 ML 모델 (Your First Machine Learning Model)
- 첫 번째 데이터 모델을 구축한다. 

## 모델링을 위한 데이터 선택(Selecting Data for Modeling)
----
이 과정을 어떻게 보면 **임베딩**이라고 불러도 된다.

kaggle에서는 불러온 데이터에 변수가 너무 많은 경우 이것을 이해할 수 있는 양으로 줄이고 싶어하는데 그 방법 중 하나로 몇 가지 변수를 선택하고 시작한다고 한다. 그 후 우선 순위를 자동으로 지정하여 통계 기술을 보인다.

근데 약간 의문이 드는 점은 변수의 열을 보려면 `DataFrame`의 `columns` 속성이 있긴한데 보통 데이터를 처음 로드하고 `DataFrame`의 `info()` 명령으로 결측, 타입, 열 목록으 확인하지 않나..?

~~~py
import pandas as pd

melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
melbourne_data.columns
# melbourne_data.info()
melbourne_data = melbourne_data.dropna(axis=0) # 지금은 신경 x
~~~

데이터의 하위 집합을 선택하는 방법은 여러가지 있는다. Pandas과정에서 좀 더 깊이 다뤘을 것이고 여기서는 2가지 방법에 중점을 둔다.

1. "예측 대상"을 선택시 사용하는 **점 표기법**
2. "Feature"을 선택시 사용하는 열 **목록 표기법**

### 예측 대상 선택 
----

점 표기법으로 변수를 추출할 것임. 출력 값은 단일 데이터 열만 있는 Series형태다.

점 표기법을 사용해서 예측 대상이라 하는 예측하려는 열을 선택한다. 규칙에 따라 예측 대상을 y라고 한다.
> 거의 통용되는 방식인데 대부분 예측 대상을 y라고 명명함.(관례임)

~~~py
y = melbourne_data.Price
# 점 표기법 사용은 항상 가능한 것은 아니다.
# 열 이름에 공백이 있거나, DataFrame메서드랑 이름이 같거나 등등..
# 그래서 나는 보통 대괄호를 선호한다.
~~~

### Feature 선택
----
모델에 입력되고 나중에 예측에 사용하는 열을 "Feature"라고 함. 이 경우에는 주택 가격을 결정하는데 사용하는 열이 된다. 목적에 따라 대상을 제외한 모든 열을 Feature로 사용가능하다.
> 분류 모델로 예를 들면 대부분  
> - Feature가 1개 => 단순 분류  
> - Feature가 2개 이상 => 다중 분류

지금은 몇 가지 Feature만 있는 모델을 만든다. 나중에 다른 Feature로 만들어진 모델을 반복하고 비교하는 방법을 볼 수 있다.

대괄호 안에 열이름 목록을 제공하여 여러 기능을 선택한다. 해당 목록의 각 항목은 "열 이름"이어야함.

~~~py
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude']
X = melbourne_data[melbourne_features]
~~~
> 관례적으로 이 데이터를 X라고 함 

기초 통계량을 제공하는 메서드 describe 메서드와 head 메서드를 사용해서 예측시 사용할 데이터를 빠르게 검토해본다.

~~~py
X.describe()
~~~
<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Rooms</th>
      <th>Bathroom</th>
      <th>Landsize</th>
      <th>Lattitude</th>
      <th>Longtitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>6196.000000</td>
      <td>6196.000000</td>
      <td>6196.000000</td>
      <td>6196.000000</td>
      <td>6196.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2.931407</td>
      <td>1.576340</td>
      <td>471.006940</td>
      <td>-37.807904</td>
      <td>144.990201</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.971079</td>
      <td>0.711362</td>
      <td>897.449881</td>
      <td>0.075850</td>
      <td>0.099165</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>-38.164920</td>
      <td>144.542370</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2.000000</td>
      <td>1.000000</td>
      <td>152.000000</td>
      <td>-37.855438</td>
      <td>144.926198</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>3.000000</td>
      <td>1.000000</td>
      <td>373.000000</td>
      <td>-37.802250</td>
      <td>144.995800</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>4.000000</td>
      <td>2.000000</td>
      <td>628.000000</td>
      <td>-37.758200</td>
      <td>145.052700</td>
    </tr>
    <tr>
      <th>max</th>
      <td>8.000000</td>
      <td>8.000000</td>
      <td>37000.000000</td>
      <td>-37.457090</td>
      <td>145.526350</td>
    </tr>
  </tbody>
</table>

~~~py
x.head()
~~~
<table border="1" >
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Rooms</th>
      <th>Bathroom</th>
      <th>Landsize</th>
      <th>Lattitude</th>
      <th>Longtitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1.0</td>
      <td>156.0</td>
      <td>-37.8079</td>
      <td>144.9934</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>2.0</td>
      <td>134.0</td>
      <td>-37.8093</td>
      <td>144.9944</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>1.0</td>
      <td>120.0</td>
      <td>-37.8072</td>
      <td>144.9941</td>
    </tr>
    <tr>
      <th>6</th>
      <td>3</td>
      <td>2.0</td>
      <td>245.0</td>
      <td>-37.8024</td>
      <td>144.9993</td>
    </tr>
    <tr>
      <th>7</th>
      <td>2</td>
      <td>1.0</td>
      <td>256.0</td>
      <td>-37.8060</td>
      <td>144.9954</td>
    </tr>
  </tbody>
</table>

이런 방법으로 데이터를 표현하고 확인하는 것은 데이터 과학자의 업무에서 중요한 부분이다. 

## 모델 만들기 (Building Your Model)
----

**사이킷런(scikit-learn)** 라이브러리를 사용해서 모델을 생성한다. 코딩할 때 이 라이브러리를 샘플 코드에서 볼 수 있듯 sklearn으로 작성해야한다. 
> Scikit-laern은 일반적으로 DataFrames에 저장되는 데이터 유형을 모델링하기 위한 가장 인기 있는 라이브러리라고 함.

모델을 구축하고 사용하는 단계는 4단계로 구성한다.
1. 정의 : 어떤 유형의 모델이 될 것인지
2. fit : 제공된 데이터에서 패턴을 포착하는 것이며, **모델링의 핵심임**
3. 예측 : 말 그대로 예측
4. 평가 : 예측이 얼마나 정확한지 결정하는 단계

~~~py
# 의사결정트리 예시
from sklearn.tree import DecisionTreeRegressor

# Define model. Specify a number for random_state to ensure same results each run
melbourne_model = DecisionTreeRegressor(random_state=1) # 정의

# Fit model
melbourne_model.fit(X, y) # fit
~~~
<pre>
DecisionTreeRegressor(random_state=1)
</pre>

많은 ML 모델은 훈련에서 임의성(randomness)을 허용한다. random_state에 숫자를 지정하면 각 실행에서 동일한 결과를 얻을 수 있다. 이건 좋은 행동이다. 임의 숫자를 사용하면 선택 값에 따라 모델의 품질이 크게 달라지지 않는다. 

이제 예측에 사용할 수 있는 모델이 생겼다. 학습 데이터 X의 처음 몇 행에 대해 예측을 수행해서 어떻게 작동하는지 확인해 본다.

~~~py
print("Making predictions for the following 5 houses:")
print(X.head())
print("The predictions are")
print(melbourne_model.predict(X.head())) # 예측
~~~
<pre>Making predictions for the following 5 houses:
   Rooms  Bathroom  Landsize  Lattitude  Longtitude
1      2       1.0     156.0   -37.8079    144.9934
2      3       2.0     134.0   -37.8093    144.9944
4      4       1.0     120.0   -37.8072    144.9941
6      3       2.0     245.0   -37.8024    144.9993
7      2       1.0     256.0   -37.8060    144.9954
The predictions are
[1035000. 1465000. 1600000. 1876000. 1636000.]
</pre>

# 검증하기 (Model Validation)
- 모델의 성능을 측정하여 대안을 테스트하고 비교할 수 있습니다.

모델을 만들었는데 얼마나 정확한지(혹은 예측을 잘 했는지) 평가를 해야한다.
이번 챕터는 모델 검증을 사용해서 모델의 품질을 측정하는 방법을 배운다. 모델 품질을 측정하는 것은 모델을 반복적으로 개선하는 열쇠라고 불린다.

## 모델 검증이란?(What is Model Validation)
----

구축한 거의 모든 모델을 평가하고 싶을 것이다. **전부는 아니지만 대부분의 애플리케이션에서 모델 품질의 관련 척도는 예측 정확도다.** 즉, 모델의 예측이 실제로 발생하는 것과 비슷하다.

많은 검증 실수는 훈련 데이터로 예측을 하고 그 예측을 훈련 데이터의 target값이랑 비교한다. 이 방식의 문제는 조금 뒤에 나온다.

모델 품질을 이해할 수 있는 방식으로 요약해야한다. 즉, 하나의 지표로 요약해야한다. 많은 지표가 있지만. `Mean Absolute Error(MAE)`라는 지표부터 공부하자. 마지막 단어인 Error부터 시작하여 분석해보자.

> 오차는 다음과 같다.  
> 오차 = 실제 - 예측

MAE를 사용하여 각 오차의 절대값을 취한다. 이렇게 하면 각 오차가 양수로 변한다. 이 후 절대 오차(오차에 절대값)의 평균을 구한다. 이게 모델 품질의 척도다. 

> 즉, MAE를 근거로 평균적으로 우리의 예측은 X 정도 빗나간다. 라고 말 할 수 있는 것임.

~~~py
# Data Loading Code Hidden Here
import pandas as pd

# Load data
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
# Filter rows with missing price values
filtered_melbourne_data = melbourne_data.dropna(axis=0)
# Choose target and features
y = filtered_melbourne_data.Price
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'BuildingArea', 
                        'YearBuilt', 'Lattitude', 'Longtitude']
X = filtered_melbourne_data[melbourne_features]

from sklearn.tree import DecisionTreeRegressor
# Define model
melbourne_model = DecisionTreeRegressor()
# Fit model
melbourne_model.fit(X, y)
~~~
<pre>
DecisionTreeRegressor()
</pre>

평균 절대 오차(MAE)를 구하는 방법!
~~~py
from sklearn.metrics import mean_absolute_error

predicted_home_prices = melbourne_model.predict(X)
mean_absolute_error(y, predicted_home_prices)
~~~
<pre>
434.71594577146544
</pre>

## "In-Sample" 점수의 문제(The Problem with "In-Sample" Scores)
---

방금 계산한 약 434.7 이라는 값은 "In-Sample"이라고 함. 우리는 모델 평가하기 위해 단일 샘플을 사용했음.(4번 라인 코드 주시)

만약에 대규모 부동산에서 문(door) 색상이 주택 가격과 관련이 없다고 상상해보자. 하지만 지금 데이터에서는 녹색 문이 있는 집은 매우 비쌌다. 모델의 임무는 주택 가격을 예측하는 패턴을 찾는 것이라 이 패턴을 확인하고 녹색 문이 있는 주택에 노은 가격을 예측한다.

당연히 훈련 데이터에서 파생되었으니 훈련 데이터와는 정확하게 나타남

하지만, 만약에 모델에 새 데이터를 입력하면? 실제로 사용시 매우매우 부정확해짐(패턴이 무너지니까)

모델의 실질적인 가치는 새로운 데이터에 대해 예측에서 나오니까 모델을 구축하는데 사용하지 않은 데이터에 대한 성능을 측정해야함. **이를 수행하는 가장 간단한 방법은 모델 구축당시 데이터를 일부 제외하고 모델을 만들고 정확도를 체크하는 방법임**

이 때, **제외한 데이터를 검증 데이터** 라고 부름

~~~py
from sklearn.model_selection import train_test_split

# split data into training and validation data, for both features and target
# The split is based on a random number generator. Supplying a numeric value to
# the random_state argument guarantees we get the same split every time we
# run this script.
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state = 0)
# Define model
melbourne_model = DecisionTreeRegressor()
# Fit model
melbourne_model.fit(train_X, train_y)

# get predicted prices on validation data
val_predictions = melbourne_model.predict(val_X)
print(mean_absolute_error(val_y, val_predictions))
~~~
<pre>
258930.03550677857
</pre>

> ```train_test_split```함수는 일부는 모델에 맞는 학습 데이터, 다른건 MAE계산을 위해 검증 데이터로 사용하기 위해 분리하는 것임.

결과를 보면 좀 놀래야함...   
이전에 In-Sample 데이터에 대한 MAE는 많이 쳐도 500미만인데 지금(검증 데이터 활용)은 250,000이라는 수치가 나온다.

더 나은 feature나 다른 모델 유형을 찾기 위한 실험과 같이 이 모델을 개선하는 방법은 많다.(개선해야지)

# 언더피팅 OR 오버피팅(Underfitting and Overfitting)
- 더 나은 성능을 위해 모델을 미세 조정하라  

이번 챕터를 끝내면 과소적합(Underfitting), 과적합(Overfitting)의 개념을 알고 더 정확한 모델을 만들 수 있다. 

## 다른 모델로 실험(Experimenting With Different Models)
----
이제 모델 정확도를 측정할 수 있는 신뢰할 수 있는 방법이 있으므로 대체 모델을 실험하고 최상의 예측을 제공하는 모델을 확인 할 수 있다. 

scikit-laern의 [문서](https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeRegressor.html)에서 의사 결정 트리 모델에 많은 옵션(파라미터)이 있는 것을 볼 수 있다. 가장 중요한 옵션은 트리의 깊이를 결정한다. 이 과정의 첫 챕터에서 트리의 깊이는 예측에 도달하기 전에 트리가 얼마나 많은 분할을 수행하는지에 대한 적도임을 기억하라.(근데 나는 안적었음)  
  
![1](/assets/img/IntroML/1.IntroML.png)  

실제로 트리가 최상위 수준과 리프 노드 사이에 10개의 분할을 갖는 것은 드문일은 아님. 트리가 깊어질수록 데이터 셋은 더 작은 수의 집합을 분할함. 트기가 1개만 분할된 경우 데이터를 2개의 그룹으로 나눈다. 각 그룹이 다시 분할되면 4개...각 수준에서 더 많은 분할을 추가해서 그룹 수를 계쏙 두배로 들리면 $2^{10}$ 개 즉, 1024개가 됨.

많은 리프 노드 사이에 집을 나눌 때, 각 리프노드에는 더 적은 수의 집이 있음. 집이 거의 없는 리프노드는 해당 집의 실제 가치에 매우 가까운 예측을 하지만 새 데이터에 대해 매우 신뢰할 수 없는 예측을함. 

집이 거의 없다 -> 세세하게 나눴다 -> 훈련 데이터랑 친하다.

**모델이 훈련 데이터와 거의 완벽하게 일치하지만 검증 및 기타 새로운 데이텅에서는 제대로 수행되지 않는 과적이라고 하는 현상임.**

반대로 나무를 아주 얕게 만들면 집을 매우 뚜렷한(리프 노드에 해당하는 집이 많음)그룹으로 나누지 않음

극단적으로 나무가 집을 2~4개로 나누더라도 각 그룹에는 여전히 다양한 집이 있다. 결과 예측은 훈련 데이터에서도 대부분의 주택에서 멀리 떨어져 있을 수 있다.(동일한 이유로 유효성 검사도 나쁠 것임) **모델이 데이터에서 중요한 차이점과 패턴을 캡처하지 못하여 학습 데이터에서도 제대로 수행되지 않는 경우 과소적합이라함.**

검증 데이터에서 추정한 새 데이터의 정확도에 관심이 있기 때문에 과소적합, 과적합 사이의 적절한 지점을 찾아야함.(근본임)

![2](/assets/img/IntroML/2.IntroML.png)

사진에서 빨간색 선의 가장 낮은 부분을 원해야함.

## 예시
----
트리 깊이를 제어하기 위해 몇 가지 대안이 있고 많은 경우 트리를 통과하는 일부 경로가 다른 경로보다 더 깊이 들어갈 수 있다. 하지만 `max_leaf_nodes` 인수는 과적합과 과소적합을 제어하는 매우 합리적인 방법을 제공함. 모델이 만들 수 있는 리프가 많을수록 위 그래프의 과소적합 영역에서 과적합 영역으로 더 많이 이동함.

utility 메서드를 사용해서 max_leaf_nodes에 대한 여러 값의 MAE 점수 비교가 가능함.

~~~py
from sklearn.metrics import mean_absolute_error
from sklearn.tree import DecisionTreeRegressor

def get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y):
    model = DecisionTreeRegressor(max_leaf_nodes=max_leaf_nodes, random_state=0)
    model.fit(train_X, train_y)
    preds_val = model.predict(val_X)
    mae = mean_absolute_error(val_y, preds_val)
    return(mae)

~~~
<details>
<summary>생략된 코드 확인하기</summary>

 ~~~py
 # Data Loading Code Runs At This Point
import pandas as pd
    
# Load data
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
# Filter rows with missing values
filtered_melbourne_data = melbourne_data.dropna(axis=0)
# Choose target and features
y = filtered_melbourne_data.Price
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'BuildingArea', 
                        'YearBuilt', 'Lattitude', 'Longtitude']
X = filtered_melbourne_data[melbourne_features]

from sklearn.model_selection import train_test_split

# split data into training and validation data, for both features and target
train_X, val_X, train_y, val_y = train_test_split(X, y,random_state = 0)
~~~
max_leaf_nodes에 대해 서로 다른 값으로 구축된 모델의 정확도를 비교하기 위해 for 루프를 사용할 수 있다..

~~~py
# compare MAE with differing values of max_leaf_nodes
for max_leaf_nodes in [5, 50, 500, 5000]:
    my_mae = get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y)
    print("Max leaf nodes: %d  \t\t Mean Absolute Error:  %d" %(max_leaf_nodes, my_mae))
~~~

<pre>
Max leaf nodes: 5  		 Mean Absolute Error:  347380
Max leaf nodes: 50  		 Mean Absolute Error:  258171
Max leaf nodes: 500  		 Mean Absolute Error:  243495
Max leaf nodes: 5000  		 Mean Absolute Error:  254983
</pre>

결과를 보면 500이 최적의 leaf 수로 나온다.

</details>

> 과적합 : 미래에 반복되지 않는 비논리적인 패턴을 관측해서 덜 정확한 예측으로 이어짐,   
> 과소적합 : 관련 패턴을 캡처하기 못해 다시 정확도가 떨어지는 예측으로 이어짐  


후보 모델의 정확도를 측정하기 이해 모델 훈련에 사용되지 않는 유효성 검사 데이터를 사용한다. 이를 통해 많은 후보 모델을 시도해보고 최상의 모델을 유지할 수 있음.


# Random Forests
- 보다 정교한 ML 알고리즘 사용

결정 트리는 어려운 결정을 내리게 한다. 리프가 많은 깊은 트리는 각 예측이 앞에 있는 몇 채의 집과 과거 데이터에서 나오기 때문에 과대적합이된다. 그러나 리프가 적은 얕은 트리는 원시 데이터에서 많은 차이를 포착해서 과소적합을 보인다.

사실 이런 과소/과대 적합을 막기위해 파라미터 조정을 하지만 이건 진짜 실험에 의한 경험으로 결정해야한다.(그래서 근본)

랜덤 포레스트는 많은 트리를 사용하며 각 컴포넌트 트리의 예측을 평균해서 예측한다. 일반적으로 단일 의사 결정 트리보다 예측 정확도가 훨씬 뛰어나고 기본 매개변수와 잘 작동한다. 모델링을 계속하려면 더 나은 성능으로 더 많은 모델을 학습할 수 있지만 많은 모델이 올바른 매개변수를 얻는데 집중해야함.


~~~py
import pandas as pd
    
# Load data
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
# Filter rows with missing values
melbourne_data = melbourne_data.dropna(axis=0)
# Choose target and features
y = melbourne_data.Price
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'BuildingArea', 
                        'YearBuilt', 'Lattitude', 'Longtitude']
X = melbourne_data[melbourne_features]

from sklearn.model_selection import train_test_split

# split data into training and validation data, for both features and target
# The split is based on a random number generator. Supplying a numeric value to
# the random_state argument guarantees we get the same split every time we
# run this script.
train_X, val_X, train_y, val_y = train_test_split(X, y,random_state = 0)
~~~

~~~py
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

forest_model = RandomForestRegressor(random_state=1)
forest_model.fit(train_X, train_y)
melb_preds = forest_model.predict(val_X)
print(mean_absolute_error(val_y, melb_preds))
~~~

<pre>
191669.7536453626
</pre>


## 결론
---
바로 결론이 나와서 좀 당황스럽지만 정리를하자면  

추가 개선이 당연히 가능하겠지만 250,000의 최상의 의사 결정 트리 error에 비해 크게 개선된 수치임을 보인다.(앞자리가 다름) 단일 결정 트리의 최대 깊이(max_leaf_nodes)를 변경한 것 처럼 `Random Forest`도 옵션이 있지만 랜덤 포레스트의 큰 장점은 튜닝없이 합리적으로 작동하는 것임.


다음 포스트는 ML 중급으로 돌아오겠다~

![3](/assets/img/수료증/박정현-IntroML수료증.png)
