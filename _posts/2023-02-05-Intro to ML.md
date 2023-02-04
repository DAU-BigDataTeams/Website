---
title: Intro to Machine Learning
layout: post   
categories : ML, kaggle
image : assert/img/박민서-Intro_to_ML_수료증.png
description: kaggle의 Intro to Machine Learning 코스 정리
customexcerpt: kaggle의 Intro to Machine Learning 코스 수료    
---

# Intro to Machine Learning

# 1. How Models Work

## Introduction  
-----
 집 가격을 예측할 때, 우리는 과거에 본 적이 있는 집들로부터 가격 패턴을 확인하고, 그 패턴을 새로운 집들의 가격을 예측하기 위해 사용한다. Machine Learning(기계 학습)도 같은 방식으로 작동한다.  
   
 먼저, 기계 학습 모델 중 하나인 Decision Tree부터 알아보자.
 **Decision Tree(의사결정 트리)** 는 기계 학습 모델들의 기본이 되는 모델이라 할 수 있으며, 다른 모델에 비해 이해하기 쉽다.  
   
 Decision Tree 예시를 하나 보자.
 ![h_1_1_sdt](https://i.imgur.com/7tsb5b1.png)  
 데이터를 사용하여 아파트를 두 그룹으로 나누는 방법을 결정하고, 그 방법에 따라 각 그룹의 가격을 예측한다.  
   
 * **fitting** (or training) : 데이터에서 패턴을 발견하는 단계
 * training data : 모델을 fitting 시키기 위해 사용되는 데이터
   

## Improving the Decision  
-----
 모델을 fitting 시킨 이후에는 그 모델을 통해 새로운 주택들의 가격을 예측할 수 있다. 그러나 이는 다른 요소들을 고려하지 못한다는 단점이 있다.
 **더 많은 "분할(splits)"이 있는 트리를 사용**하여 **다양한 요인에 따라 세부적으로 예측이 가능**하다.  
 ![h_1_2_ddt](https://i.imgur.com/R3ywQsR.png)
 많은 분할이 있는 트리를 우리는 **"deep"한 tree**라고 말한다.  
   
 이에 따라서 집의 예상 가격은 트리의 가장 아래부분에서 확인할 수 있다. 즉, 모델로부터 나오는 예측 결과는 가장 아래쪽 리프라고 불리는 곳에서 확인할 수 있다.
   
# 2. Basic Data Exploration

## Using Pandas to Get Familiar With Your Data

-----

Pandas 라이브러리는 data scientist들이 데이터를 탐색하고 조작하기 위해 주로 사용하는 툴이다. 대부분의 사람들은 코드에서 Pandas를 pd로 줄여서 부른다.

~~~
import pandas as pd
~~~

Pandas 라이브러리의 가장 중요한 부분이라 할 수 있는 **데이터 프레임**은
테이블로 생각할 수 있는 데이터 유형이 저장된다. Excel의 시트 또는 SQL의 데이터베이스 테이블과 유사하다.

Pandas는 데이터 프레임으로 수행하고자 하는 대부분의 작업 시에 활용할 수 있는 강력한 메서드들을 가지고 있다.

데이터를 로드할 때에는 밑의 메서드를 사용한다.

~~~
# save filepath to variable for easier access
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
# read the data and store data in DataFrame titled melbourne_data
melbourne_data = pd.read_csv(melbourne_file_path) 
# print a summary of the data in Melbourne data
melbourne_data.describe()
~~~

아래 표는 melbourne_data.describe()의 결과이다.

|  |Rooms|Price|Distance|...|YearBuilt|...|
|--|--|--|--|--|--|--|
|count|13580.000000|1.358000e+04|13580.000000|...|8205.000000|...|
|mean|2.937997|1.075684e+06|1.075684e+06|...|1964.684217|...|
|std|0.955748|6.393107e+05|5.868725|...|37.273762|...|
|min|1.000000|8.500000e+04|0.000000|...|1196.000000|...|
|25%|2.000000|6.500000e+05|6.100000|...|1940.000000|...|
|50%|3.000000|9.030000e+05|9.200000|...|1970.000000|...|
|75%|3.000000|1.330000e+06|13.000000|...|1999.000000|...|
|max|10.000000|9.000000e+06|48.100000|...|2018.000000|...|

## Interpreting Data Description
-----

describe()의 결과인 위의 표는 원래 데이터셋의 각 열에 대한 8가지 값들을 표시햔다.  
  
첫 번째 값인 count는 결측값이 없는 행 수를 나타냅니다. 두 번째 값인 mean은 평균을 의미하고, std는 값이 얼마나 분산되어 있는지를 나타내는 표준 편차이고,  
다음으로는 각각 최소값, 25%, 50%, 75%, 최대값이다. 이 값들은 데이터셋의 각 열이 오름차순으로 정렬되어 있다고 가정하고 해석하면 된다.
  
# 3. Your First Machine Learning Model

## Selecting Data for Modeling
-----
DataFrame의 Column을 뽑아내는 방법

~~~
import pandas as pd

melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
melbourne_data.columns
~~~

* 결측값 : 데이터셋 내에 누락된 값
* dropna() : 데이터셋의 결측값을 삭제할 때 사용하는 메서드

~~~
melbourne_data.dropna(axis=0) # 결측값이 포함된 row를 삭제한다.
# axis = 1인 경우 결측값이 포함된 column을 삭제한다.
~~~

데이터의 하위 집합을 선택하는 방법은 크게 두 가지가 있다.
1. "예측 대상"을 선택하기 위해 사용되는 **Dot-notation(도트 표기법)**
2. "Feature"을 선택하는 데 사용되는 **열 목록을 사용하여 선택**
  

## Selecting The Prediction Target
-----

도트 표기법을 사용하여 변수를 추출 가능하다. **단일 열은 "Series"라는 타입으로 저장**되는데, 이는 **열이 하나만 있는 데이터 프레임과 유사**하다.

**도트 표기법을 사용하여 예측하기 위해 선택한 열**을 **예측 대상**이라고 한다. 이 예측 대상을 *y* 라고 하자.  

~~~
y = melbourne_data.Price
# Price 열을 선택
~~~

## Choosing "Features"
-----

**모델의 입력으로 들어가고, 나중에 예측하는 데에 사용되는 열**을 **"Feature"** 라고 한다.  
예시의 경우, 주택 가격을 결정하는데에 사용되는 열이 "Featrue"가 될 것이다.
  
가끔 예측 대상을 제외한 모든 열을 "Feature"로써 사용하는 경우도 있다.
**리스트 내에 열 이름을 적어서 여러 Feature들을 선택**한다. 이 때, **각 항목(열 이름)들은 따옴표가 있는 문자열**이어야 한다.

~~~
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude']
~~~

이 feature들로 뽑아낸 data를 X라고 하자.

~~~
X = melbourne_data[melbourne_features]
~~~

집값을 예측하기 위해 사용할 데이터를 빠르게 리뷰하기 위한 **describe()**, **head()** 메소드

~~~
X.descirbe()
~~~

describe() 의 결과

|  |Rooms|Bathroom|Landsize|Longtitude|Longtitude|
|--|--|--|--|--|--|
|count|6196.000000|6196.000000|6196.000000|6196.000000|6196.000000|
|mean|2.931407|1.576340|471.006940|-37.807904|144.990201|
|std|0.971079|0.711362|897.449881|0.075850|0.099165|
|min|1.000000|1.000000|0.000000|-38.164920|144.542370|
|25%|2.000000|1.000000|152.000000|-37.855438|144.926198|
|50%|3.000000|1.000000|373.000000|-37.802250|144.995800|
|75%|4.000000|2.000000|628.000000|-37.758200|145.052700|
|max|8.000000|8.000000|37000.000000|-37.457090|145.526350|

~~~
X.head()
~~~

head()의 결과

|  |Rooms|Bathroom|Landsize|Longtitude|Longtitude|
|--|--|--|--|--|--|
|1|2|1.0|156.0|-37.8079|144.9934|
|2|3|2.0|134.0|-37.8093|144.9944|
|4|4|1.0|120.0|-37.8072|144.9941|
|6|3|2.0|245.0|-37.8024|144.9993|
|7|2|1.0|256.0|-37.8060|144.9954|

위의 두 메소드들을 사용하여 데이터를 시각적으로 확인할 수 있다.

## Building Your Model
-----

Scikit-learn 라이브러리를 사용하여 모델을 구축할 수 있다. Scikit-learn은 일반적으로 데이터 프레임에 저장된 데이터 유형을 모델링하는 데에 가장 널리 사용되는 라이브러리이다.  

모델을 구축하고 사용하는 단계는 총 4단계로 이루어진다.
  
;**Define, Fit, Predict, Evaluate**  
- Define : 어떤 종류의 모델이 될지(의사결정 트리 혹은 다른 유형), 모델 유형에 따른 다른 파라미터들도 결정되는 단계
  
- Fit : 주어진 data에서 패턴을 capture하는 단계, 이 단계가 모델링의 핵심이라 할 수 있다.

- Predict : 말 그대로 예측하는 단계

- Evaluate : 모델의 예측이 얼마나 정확한지 확인하는 단계  

아래의 코드는 scikit-learn을 사용하여 의사결정 트리 모델을 정의하고 이를 feature 및 타겟 변수에 fitting 시키는 예이다.

~~~
from sklearn.tree import DecisionTreeRegressor

# Define model. Specify a number for random_state to ensure same results each run
melbourne_model = DecisionTreeRegressor(random_state=1)

# Fit model
melbourne_model.fit(X, y)
~~~

많은 Machine Learning 학습 모델은 훈련에서 약간의 무작위성을 허용한다.
  
random_state라는 변수에 숫자를 지정하면, 매 실행마다 동일한 결과를 얻을 수 있다.  
  
이제는 시장에 나올 새로운 주택에 대한 예측을 하고싶을 것이다. 그 전에 우리는 모델이 어떻게 작동하는지 보기 위해서, training data의 처음 몇 행에 대한 예측을 할 것이다.  

~~~
print("Making predictions for the following 5 houses:")
print(X.head())
print("The predictions are")
print(melbourne_model.predict(X.head()))
~~~

~~~
# 결과
Making predictions for the following 5 houses:
   Rooms  Bathroom  Landsize  Lattitude  Longtitude
1      2       1.0     156.0   -37.8079    144.9934
2      3       2.0     134.0   -37.8093    144.9944
4      4       1.0     120.0   -37.8072    144.9941
6      3       2.0     245.0   -37.8024    144.9993
7      2       1.0     256.0   -37.8060    144.9954
The predictions are
[1035000. 1465000. 1600000. 1876000. 1636000.]
~~~

# 4. Model Validation
모델을 만든 후, Model Validation(모델 검증)를 통하여 모델의 품질을 측정하기.  
모델의 품질을 측정하는 것은 모델을 개선하는 데에 필요한 중요한 과정이다.

## What is Model Validation
-----
* **모델 검증**이란?  
 지금까지 만든 모델의 거의 모든 부분을 평가하는 것이다. 대부분의 어플리케이션에서 모델 품질에 대한 측정값은 **예측을 얼마나 잘 하는지**를 나타낸다. **모델의 예측이 실제로 발생하는 것에 얼마나 근접한지**에 따라 품질이 결정된다.  
  
대부분의 사람들은 예측 정확도를 측정할 때, 훈련 데이터로 예측을 하고 훈련 데이터의 값과 비교하는 실수를 저지르곤 한다. 이 접근 방식의 문제는 후에 다루도록 하겠다.  
  
모델의 품질을 이해할 수 있는 방식으로 요약해야 한다. 쉽게 말하자면, 하나의 지표로써 요약할 필요가 있다는 뜻이다.  

모델 품질을 요약하기 위한 많은 지표들이 있지만, 그 중에서 **Mean Absolute Error(MAE)** 라는 지표로 요약해보자. 마지막 단어인 Error를 시작점으로 하여 이 지표를 분석해보자.  
  
오차는 다음과 같다.
- 오차 = 실제 - 예측

MAE 지표를 사용하여 각 오류의 절대값을 구하게 되면, 오류들이 양수로 변환된다. 양수로 변환된 오류들로 절대 오차 ( |오차| ) 의 평균을 구하게 되면 그것이 바로 모델 품질을 측정하는 척도가 된다.  
이를 통해 우리의 예측이 X 정도 빗나갔다~ 라고 말할 수 있다.

~~~
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
~~~
DecisionTreeRegressor()
~~~

MAE를 구하는 방법은 아래 코드와 같다.

~~~
from sklearn.metrics import mean_absolute_error

predicted_home_prices = melbourne_model.predict(X)
mean_absolute_error(y, predicted_home_prices)
~~~

~~~
434.71594577146544 # MAE의 결과
~~~

## The Problem with "In-Sample" Scores
-----

위에서 계산한 측정값은 "In-
Sample" 점수라고 할 수 있다. 모델을 구축하고 평가하기 위해 단일 표본을 사용하였다.  
  
부동산 시장에서 문 색깔과 집값이 무관하다고 상상해보자. 그러나 모델을 구축하는 데에 사용한 표본에서는 문 색깔이 녹색인 집들은 다 비쌌다면, 이 모델은 문이 녹색인 집은 비싸다는 패턴을 포착할 것이다.  
  
이 패턴은 training data로부터 파생되었기 때문에, training data에서는 정확하게 보일수도 있다. 그러나 모델이 새로운 data를 입력받았을 때는, 모델이 내는 예측 결과는 매우 부정확해진다. (실제로 문 색깔과 집값은 무관하다고 했기 때문에)  
  
**모델의 가치는 새로운 data에 대한 예측에서 판단하기 때문에, 모델 구축 시 사용되지 않은 data에 대한 성능을 측정해야 한다.** 가장 간단한 방법은 모델 구축 프로세스에서 일부 data를 제외하고, 구축 후에 이전에 보지 못한 data에 대해 모델의 정확성을 체크하는 방법이다. 이 때 사용되는 이전에 보지 못한 data를 **validation data** 라 한다.  
  
## Coding
-----

scikit-learn 라이브러리는 데이터를 두 조각으로 나누는 **train_test_split** 함수를 가지고 있다. 이 함수를 사용하여 데이터 중 일부는 training data로 사용하고, 나머지 데이터를 validation data로 사용하여 **mean_absolute_error (MAE)** 를 계산한다.

~~~
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

~~~
258930.03550677857 # 결과
~~~

"In-Sample" 데이터에 대한 MAE는 약 500인데에 반해, validation data를 사용한 코드에 대한 결과는 250,000 이상이 나왔다. (차이가 많이 남)  
**모델을 개선하기 위해서는 더 나은 feature를 찾거나, 다른 모델 유형을 사용하는 방법이 있다.**

  
# 5. Underfitting and Overfitting
* Underfitting과 Overfitting이 무엇인지
* Underfitting과 Overfitting의 개념을 적용하여 모델을 더 정확하게 만들기

## Experimenting With Different Models
------
모델 정확도를 측정하는 신뢰할 수 있는 방법을 사용하여 대체 모델을 실험하고, 어떤 모델이 적합한지 확인할 수 있다.  
Scikit-learn의 [문서](https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeRegressor.html)에서 의사결정 트리 모델에는 많은 옵션이 있음을 알 수 있다.  
가장 중요한 옵션들은 트리의 깊이를 결정한다. 이 과정의 첫 번째 장에서 트리의 깊이는 예측에 도달하기까지 얼마나 많은 분할(Splits)을 하는지를 나타내는 것이라고 했다.  
  
![f-1-1.Tree](https://i.imgur.com/R3ywQsR.png)
실제로 트리의 가장 높은 레벨과 리프 노드들 사이에 10개의 분할(Splits)을 갖는 것은 드문 일이 아니다. **트리가 deep해질수록 데이터셋은 더 적은 수의 집합들로 분할하게 된다.**  
  
트리에 분할(Splits)이 하나만 있는 경우, 데이터셋을 두 개의 그룹으로 나눈다는 의미이다. 만약 각 그룹이 다시 분할된다면 4개, 또 다시 분할하면 8개의 집합으로 나뉘어질 것이다. n 레벨의 트리에서 리프의 수는 2<sup> n </sup> 개가 된다.  
  
**데이터를 많은 리프로 나눌수록, 각 리프가 가진 집합 내의 데이터 수가 작아진다.** 데이터 수가 거의 없는 리프 노드들은 실제 값에 상당히 가까운 예측을 하지만, 새로운 데이터가 들어왔을 때 신뢰성이 떨어지는 예측을 하게 된다. (각 예측이 몇 개의 데이터에만 기초한 것이기 때문이다.)  
  
**training data에 대해서는 거의 완벽하게 일치하지만 validation data나, 새로운 데이터에 대해서는 제대로 수행하지 못하는** 현상을 **"과적합(overfitting)"** 이라고 부른다.  
  
이와 반대의 경우는 어떨까?  
극단적으로 아주 얕은 레벨의 트리를 만든다고 가정해보자.  
데이터셋에 대하여 2개 혹은 4개의 리프 그룹으로 나누게 된다면, 각 리프는 많은 수의 데이터를 가지게 될 것이다. 이렇게 되면 **training data에서도 결과 예측이 제대로 되지 않**을 가능성이 있다. 같은 이유로 유효성 검사에서도 나쁜 결과를 얻게 될 것이다.  
  
모델이 데이터들 사이에서 중요한 차이와 **패턴을 제대로 캐치하지 못해서, training data에서조차 성능이 떨어지는 경우**를 **"과소적합(Underfitting)"** 이라고 부른다.  
  
우리는 검증 데이터에서 추정하는 새 데이터에 대한 정확성에 관심이 있기 때문에, 과적합과 과소적합 사이의 최적 지점을 찾아야한다.  

> * Overfitting(과적합) : training data에 대해서는 거의 완벽하게 예측하지만, validation data나 새로운 데이터에 대해서는 제대로 예측하지 못하는 것
> * Underfitting(과소적합) : 데이터들 사이에서 중요한 차이나 패턴을 제대로 캐치하지 못해서, training data에서조차 성능이 떨어지는 경우
   

![f-1-2.graph_underfitting_overfitting](https://i.imgur.com/AXSEOfI.png)  

그 최적 지점은 validation 검사 곡선(빨간색 곡선)의 가장 낮은 부분이 된다.

## Example
-----

트리의 깊이를 조절하기 위한 몇 가지 대안이 있으며, 대부분의 경우에 트리를 통과하는 일부 경로는 다른 경로보다 더 깊을 수 있다.  
  
그러나 max_leaf_nodes 의 argument는 과적합과 과소적합을 제어하는 매우 합리적인 방법을 제공한다. **모델이 더 많은 리프를 만들 수 있게 할수록, 위 그래프의 과소적합(Underfitting) 영역에서 과적합(Overfitting) 영역으로 더 많이 이동**한다.  
  
utility 함수를 사용해서 max_leaf_nodes에 대한 MAE 점수들을 비교할 수 있다.

~~~
from sklearn.metrics import mean_absolute_error # MAE를 위해 import 해준다
from sklearn.tree import DecisionTreeRegressor

def get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y):
    model = DecisionTreeRegressor(max_leaf_nodes=max_leaf_nodes, random_state=0)
    model.fit(train_X, train_y)
    preds_val = model.predict(val_X)
    mae = mean_absolute_error(val_y, preds_val)
    return(mae)
~~~

for-loop를 사용하여 max_leaf_nodes에 대해 다른 값으로 구축된 모델의 정확도를 비교할 수 있다.

~~~
# compare MAE with differing values of max_leaf_nodes
for max_leaf_nodes in [5, 50, 500, 5000]:
    my_mae = get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y)
    print("Max leaf nodes: %d  \t\t Mean Absolute Error:  %d" %(max_leaf_nodes, my_mae))
~~~

~~~
# 결과
Max leaf nodes: 5  		 Mean Absolute Error:  347380
Max leaf nodes: 50  		 Mean Absolute Error:  258171
Max leaf nodes: 500  		 Mean Absolute Error:  243495
Max leaf nodes: 5000  		 Mean Absolute Error:  254983
~~~

위의 결과를 통해 max leaf nodes 옵션 중 가장 최적의 노드 수는 500인 것을 알 수 있다.  

## Conculsion
-----
정리해보자면,
* **과적합(Overfitting)** 이란?  
미래에 반복되지 않을 패턴을 캡처해서 정확도가 떨어지는 예측을 하는 경우 (과하게 디테일에 주목하는 패턴)
* **과소적합(Underfitting)** 이란?  
관련 패턴을 제대로 캡처하지 못해서 정확도가 떨어지는 예측을 하는 경우 (너무 두루뭉실한 패턴)

우리는 **training에 사용되지 않는 validation data를 사용하여 후보 모델의 정확도를 측정**한다. 이를 통해 많은 후보 모델들의 정확도를 비교해 최상위 모델을 유지할 수 있다.

# 6.Random Forests

## Introduction
------

의사 결정트리는 어려운 결정을 하게 한다. **리프가 많은 트리는 각각의 예측이 리프에 있는 소수의 데이터들과 과거의 데이터로부터 나오기 때문에 과적합(Overfitting)이 발생**한다.  
  
그러나 **리프가 거의 없는 얕은 트리는 원시 데이터에서 큰 차이를 포착하지 못하기 때문에 성능이 저하되는 과소적합(Overfitting)이 발생**한다.  
  
**랜덤 포레스트(Random Forest)**는 많은 트리를 사용하여, 각 **컴포넌트 트리의 예측을 평균화하여 예측**한다. 일반적으로 단일 의사 결정 트리보다 예측 정확도가 훨씬 뛰어나며, 기본 매개 변수와 잘 작동한다. 모델링을 계속하면 더 많은 모델을 학습하여 성능을 향상시킬 수 있지만, 올바른 매개 변수를 찾는 것이 더 중요하다.

## Example
-----
  
우리는 Scikit-learn에서 의사결정 트리를 구축한 방법과 유사하게 랜덤 포레스트 모델을 구축한다. 이번에는 DecisionTreeRegressor 대신에, **RandomForestRegressor** 클래스를 이용한다.

~~~
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

forest_model = RandomForestRegressor(random_state=1)
forest_model.fit(train_X, train_y)
melb_preds = forest_model.predict(val_X)
print(mean_absolute_error(val_y, melb_preds))
~~~
~~~
# 결과
191669.7536453626
~~~

## Conclusion
-----
추가적으로 개선이 가능해보이지만, 위는 **최선의 의사결정 트리의 MAE인 250,000에 비하면 훨씬 더 좋은 성능을 보이고 있다.** 단일 의사 결정 트리의 최대 깊이를 변경한 것처럼, 랜덤 포레스트의 성능을 조정할 수 있는 매개 변수가 있다. 그러나 랜덤 포레스트 모델의 가장 좋은 특징 중 하나는 따로 튜닝을 하지 않아도 대부분 합리적으로 작동한다는 것이다.

![introML](assert/img/박민서-Intro_to_ML_수료증.png)