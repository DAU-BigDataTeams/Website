---
title: Kaggle로 머신러닝이 무엇인지 알아보자!
layout: post
description: Kaggle로 머신러닝이 무엇인지 알아보자!
categories: [kaggle]
image: /assets/img/수료증/정소영-IntrotoMachineLearning.png
customexcerpt: 머신러닝이 무엇인지에 대해 학습합니다.
---

<span class = "alert g"> 작성자 : 정소영</span>

* random line to make it work. This will be removed.
{:toc}

# Machine Learning
## How Models Work
### Introduction
머신러닝은 인공지능의 한 분야로,  
기계에게 데이터를 입려하고 스스로 학습을 하여 원하는 결과를 예측하거나 수행할 수 있게 만드는 과정입니다.  
기계에게 데이터를 가르쳐주면 이를 스스로 학습하여 원하는 결과를 예측하거나 수행할 수 있게 됩니다.  

Decision Tree(의사 결정 트리)라고 불리는 모델을 먼저 배워볼 것입니다.  
더 정확한 예층을 제공하는 다른 모델들도 있지만,  
의사결정 트리는 이해하기 쉽고 데이터 과학 분야의 모델 중 기본 구성 요소이기 때문입니다.  
  
![Sample Decision Tree](/assets/img/IntroML/introtoML/ml1.png)
  
- 집을 두개의 범주로 나눕니다.  

- 고려 대상 주택의 예측 가격은 동일한 범주에 속하는 주택의 과거 평균 가격입니다.  

- 데이터를 사용하여 주택을 두 그룹으로 나누는 방법을 결정하고 다시 각 그룹의 예상 가격을 결정합니다.  

모델 피팅 or 데이터 훈련 : 데이터에서 패턴을 확인하는 단계  
training data : 모델에 적합시키는데 사용되는 데이터  

### Improving the Decision Tree 
두가지의 의사 결정 트리를 비교해보겠습니다.  
  
![1st Decision Tree, 2nd Decision Tree](/assets/img/IntroML/introtoML/ml2.png)  
  
- 결정트리 1이 침실이 더 많은 집이 침실이 적은 집보다 더 높은 가격에 판매되는 경향이 있는 현실을 포착하기 때문에 말이 될것입니다.  

- 이 모델의 가장 큰 단점은 욕실 수, 부지 크기, 위치 등 집값에 영향을 미치는 대부분의 요소를 포착하지 못한다는 것입니다.  

더 많은 'split'이 있는 트리를 사용하여 더 많은 요인을 식별할 수 있습니다.  
이것들은 '더 깊은' 트리라고 불립니다.  
  
각 주택의 총 부지 크기도 고려하는 의사 결정 트리  
  
![Decision Tree](/assets/img/IntroML/introtoML/ml3.png)  
  
의사 결정 트리를 추적하여 주택 가격을 예측하고, 항상 해당 주택의 특성에 맞는 경로를 선택합니다.  
  
집의 예상 가격은 나무의 맨 아래에 있습니다.  
우리가 예측을 하는 아래쪽 부분을 '잎'이라고 합니다.  
잎의 분할 및 값은 데이터에 따라 결정됩니다.  

## Basic Data Exploration
### Using Pandas to Get Familiar With Your Data
  
모든 머신러닝 프로젝트의 첫 번째 단계는 데이터에 익숙해지는 것입니다.    
Pandas 라이브러리를 이용하면 됩니다.    
Pandas는 데이터사이언티스트들이 데이터를 탐색하고 조작하는데 사용하는 주요 도구입니다.    
Pandas 코드를 pd로 줄여서 사용합니다.   
  
~~~python
import pandas as pd
~~~

Pandas 라이브러리의 가장 중요한 부분은 데이터 프레임입니다 .    
데이터 프레임의 테이블로 생각할 수 있는 유형의 데이터가 저장됩니다.    
이는 Excel 시트, SQL 데이터베이스의 표와 유사합니다.    

~~~python
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
#쉽게 액세스할 수 있도록 변수에 파일 경로를 저장합니다.

melbourne_data = pd.read_csv(melbourne_file_path) 
#데이터를 읽고 데이터를 melbourne_data라는 제목의 DataFrame에 저장합니다.

melbourne_data.describe()
#멜버른 데이터에 데이터 요약을 출력합니다.
~~~
        
<결과>

![Table](/assets/img/IntroML/introtoML/table1.png)  

### Interpretng Data Description    

결과는 원래 데이터 집합의 각 열에 대해 8개의 숫자를 보여줍니다.  
첫 번째 숫자인 카운트는 비결측값을 가진 행의 수를 나타냅니다.  
  
결측값은 여러 가지 이유로 인해 발생합니다.  
예를 들어, 침실 1개의 집을 조사할 때 두 번째 침실의 크기는 수집되지 않습니다.  
  
두 번째 값은 평균입니다.  
그 아래 표준 편차는 값이 수치적으로 얼마나 퍼져 있는지를 측정합니다.  
최소값, 25%, 50%, 75% 및 최대값을 해석하려면 각 열을 가장 낮은 값에서 가장 높은 값으로 정렬한다고 가정합니다.  
첫 번째(가장 작은) 값은 최소값입니다.  
목록을 4분의 1 정도 훑어보면 값의 25%보다 크고 값의 75%보다 작은 숫자가 나옵니다.  
이 값은 25% 값입니다. ("25번째 백분위수")  
50번째 및 75번째 백분위수는 유사하게 정의되며 최대값이 가장 큽니다.  

## Your First Machine Learning Model
### Selecting Data for Modeling
데이터셋에 많은 데이터들이 존재하는 경우에는 먼저 직관을 사용하여 값들을 선택하는 것으로 시작합니다.  
값/열을 선택하려면 데이터셋의 모든 열 목록을 확인해야합니다.    
이 작업은 데이터 프레임의 열속성을 사용합니다.  

~~~python
import pandas as pd

melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
melbourne_data.columns
~~~

<pre>
결과
Index(['Suburb', 'Address', 'Rooms', 'Type', 'Price', 'Method', 'SellerG',
       'Date', 'Distance', 'Postcode', 'Bedroom2', 'Bathroom', 'Car',
       'Landsize', 'BuildingArea', 'YearBuilt', 'CouncilArea', 'Lattitude',
       'Longtitude', 'Regionname', 'Propertycount'],
      dtype='object')
</pre>

~~~python
df.columns

df.dropna(axis=0) 
#결측값 있는 행을 제거합니다.
df.dropna(axis=1) 
#결측값 있는 열을 제거합니다.
~~~

데이터의 하위 집합을 선택 방법
 - 예측 대상을 선택하는 데 사용하는 점 표기법을 사용합니다.
 - feature을 선택하는데 사용하는 열 list를 사용하여 선택합니다.  

### Selecting The Prediction Target - 예측 대상 선택  
  
  
점 표기법을 사용하여 변수 추출할 수 있습니다.   
이 단일 열은 시리즈에 저장됩니다.  
점 표기법을 사용하여 예측할 열을 선택합니다.  
(이 열을 예측 대상이라고 합니다. 일반적으로 예측 대상을 y라고 합니다.)  


~~~python
y = melbourne_data.Price
#멜버른 데이터에 집값을 저장하기 위한 코드입니다.
~~~

### Choosing "Features"  

모델에 입력되고 나중에 예측하는데 사용되는 열을 'feature'라고 합니다.  
대상을 제외한 모든 열을 feature로 사용할 수도 있습니다.  
  
~~~python
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude']
#괄호 안에 열 이름 목록을 제공하여 여러 피쳐를 선택합니다.  
#해당 목록의 각 항목은 따옴표가 있는 문자열이어야 합니다.

X = melbourne_data[melbourne_features]
#관례에 따라 이 데이터를 X라고 합니다.

X.describe()
#다양한 통계량을 요약해줍니다.
~~~

결과  
![Describe Table](/assets/img/IntroML/introtoML/table2.png)  
  
~~~python
X.head()
#처음 5개줄의 데이터를 출력합니다.
~~~

결과  
![head Table](/assets/img/IntroML/introtoML/table3.png)  
  
### Building Your Model  
  
scikit-learn 라이브러리를 사용하여 모델을 만듭니다.  
일반적으로 데이터 프레임에 저장된 데이터 유형을 모델링하는 데 가장 널리 사용되는 라이브러리입니다.  
모델을 구축하고 사용하는 단계는 아래와 같습니다.  
 - Define : 어떤 유형(의사결정 트리, 다른 유형의 모델 등)의 모델인지 정합니다. 모델 유형의 다른 매개변수들도 명시됩니다.
 - Fit : 제공된 데이터의 패턴을 확인합니다. (모델링의 핵심)
 - Predict : 그것이 무엇을 말하는지 예측할 수 있습니다.  
 - Evaluate : 모델의 예측이 얼마나 정확한지 확인합니다.  

~~~python
from sklearn.tree import DecisionTreeRegressor # 의사결정 트리로 정의

test_model = DecisionTreeRegressor(random_state=1)
test_model.fit(X, y)
# 모델을 정의합니다. 
# #random_state에 숫자를 지정하여 각 실행 시 동일한 결과를 보장합니다.

~~~

많은 기계 학습 모델은 모델 교육에서 어느 정도 무작위성을 허용합니다.  random_state에 숫자를 지정하면 각 실행에서 동일한 결과를 얻을 수 있습니다.  

~~~python

print("Making predictions for the following 5 houses:")
print(X.head())
print("The predictions are")
print(melbourne_model.predict(X.head()))
~~~

결과  

![result](/assets/img/IntroML/introtoML/table4.png)  
  

## Model Validation
모델 유효성 검사를 사용하여 모델의 품질 측정하는 방법에 대해 알아봅니다.  
모델 품질을 측정하는 것은 모델을 반복적하여 개선시키는 데 중요합니다.  

### What is Model Validation
대부분의 애플리케이션에서 모델 품질 관련 측정값은 예측 정확도입니다.  
(모델의 예측이 실제 발생하는 것에 근접한가)  
훈련 데이터로 예측을 하고 그 예측을 훈련 데이터의 목표값과 비교하는 실수를 합니다.  
먼저 모델 품질을 이해할 수 있는 방식으로 요약해야합니다.  
- 평균 절대 오차Mean Absolute Error(MAE)라는 메트릭 사용  
    error = actual - predicted 
    각 오류의 절대값을 구한다.
    절대 오차의 평균을 구한다.

평균 절대 오차를 계산하는 방법  

~~~python
from sklearn.metrics import mean_absolute_error

predicted_test_prices = test_model.predict(X)
mean_absolute_error(y, predicted_test_prices)
~~~

<pre>
결과
434.71594577146544
</pre>

### The Problem with "In-Sample" Scores
방금 계산한 측정값은 '포본 내'점수라고 할 수 있습니다.  
모델을 구축하고 평가하기 위해 단일 '표본'을 사용했습니다.  
모델의 실제 가치는 새로운 데이터에 대한 예측에서 나오기 때문에 모델을 구축하는 데 사용되지 않은 데이터의 성능을 측정합니다.  
가장 간단한 방법은 모델 구축 프로세스에서 일부 데이터를 제외한 다음 이러한 데이터를 사용하여 이전에 보지 못한 데이터에 대해 모델의 정확성을 테스트하는 것입니다.  
이 데이터를 유효성 검사 데이터라고 합니다.  

### Coding It
sikit-learn 라이브러리는 데이터를 두 조각으로 나누는 train_test_split 함수를 가지고 있습니다.  
해당 데이터 중 일부를 모델에 적합한 교육 데이터로 사용하고, 다른 데이터를 검증 데이터로 사용하여 mean_absolute_error를 계산합니다.  

~~~python
from sklearn.model_selection import train_test_split

#feature와 target 모두에 대해 데이터를 교육및 검증 데이터로 분할합니다. 
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state = 0)
#분할은 random_state로, 이것의 인수는 우리가 매번 같은 분할을 받는 다는 것을 보장합니다. 

#Define model
test_model = DecisionTreeRegressor()

#Fit model
test_model.fit(train_X, train_y)

#유효성 검사 데이터에 대한 예측 값을 가져옵니다.
val_predictions = test_model.predict(val_X)
print(mean_absolute_error(val_y, val_predictions))
~~~

<pre>
결과
265806.91478373145
</pre>

## Underfitting and Overfitting

**Experimenting With Different Models**

의사결정 트리 모델에는 많은 옵션이 있습니다.  
가장 중요한 옵션이 트리의 깊이를 결정합니다.  
트리의 깊이는 예측에 도달하기 전에 얼마나 많이 분할하는지 측정하는 것입니다.
트리가 깊어질 수록 데이터셋은 더 적은 집이 있는 나뭇잎으로 잘립니다.
트리에 분할이 하나만 있는 경우 데이터를 두 그룹으로 나눕니다.  
만약 각 그룹이 다시 분할된다면, 우리는 4개의 그룹의 집을 갖게 될 것입니다.  
각각을 다시 나누면 8개의 그룹이 만들어집니다.  
각 레벨에서 분할을 더 추가하여 그룹 수를 계속 두 배로 늘리면 210개가 됩니다.  

![owners-table, pets-table](/assets/img/IntroML/introtoML/ml4.png)
  
우리가 10층에 도착할 때까지 집들의 무리들. 1024장의 잎사귀입니다.  
트리는 잎들로 나눌때, 각각의 잎들에 더 적은 집들을 가지고 있습니다.  
집이 거의 없는 나뭇잎은 집의 실제 값에 상당히 가까운 예측을 하지만 새로운 데이터에 대해 매우 신뢰할 수 없는 예측을 할 수 있습니다.  
=> Over  

모델은 훈련 데이터와 거의 완벽하게 일치하지만 검증 및 기타 새로운 데이터는 제대로 수행하지 못합니다.  
반대로, 우리가 트리를 아주 얕게 만들면 트리는 집들을 뚜렷한 그룹으로 나누지 않습니다.  
모델이 데이터에서 중요한 차이와 패턴을 포착하지 못해 훈련 데이터에서도 성능이 떨어지는 경우  
=> Underfitting  
  
검증 데이터에서 추정하는 새 데이터에 대한 정확성에 관심이 있으므로, Over와 Under 사이의 최적 지점을 찾고자 합니다.  

![owners-table, pets-table](/assets/img/IntroML/introtoML/ml5.png)

### Example

max_leaf_nodes 인수는 과적합 대 과소적합을 제어하는 매우 합리적인 방법을 제공합니다.  
함수를 사용하여 max_leaf_nodes에 대한 다른 값의 MAE 점수를 비교할 수 있습니다.  
~~~python
from sklearn.metrics import mean_absolute_error
from sklearn.tree import DecisionTreeRegressor

def get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y):
    model = DecisionTreeRegressor(max_leaf_nodes=max_leaf_nodes, random_state=0)
    model.fit(train_X, train_y)
    preds_val = model.predict(val_X)
    mae = mean_absolute_error(val_y, preds_val)
    return(mae)

#for루프를 사용하여 max_leaf_nodes에 대해 서로 다른 값으로 구축된 모델의 정확도를 비교할 수 있습니다.

for max_leaf_nodes in [5, 50, 500, 5000]:
    my_mae = get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y)
    print("Max leaf nodes: %d  \t\t Mean Absolute Error:  %d" %(max_leaf_nodes, my_mae))
~~~

<pre>
결과

Max leaf nodes: 5  		     Mean Absolute Error:  347380
Max leaf nodes: 50  		 Mean Absolute Error:  258171
Max leaf nodes: 500  		 Mean Absolute Error:  243495
Max leaf nodes: 5000  		 Mean Absolute Error:  254983
</pre>

### Conclusion
과적합(overfitting): 미래에 재발하지 않을 가짜 패턴을 포착하여 예측의 정확성이 떨어집니다.  

과소 적합(underfitting): 관련 패턴을 포착하지 못해 예측의 정확도가 떨어집니다.  

모델 교육에 사용되지 않는 검증 데이터를 사용하여 후보 모델의 정확도를 측정합니다.  
이를 통해 많은 후보 모델을 시도하고 최고의 모델을 유지할 수 있습니다.  

## Random Forests
### Introduction
랜덤 포레스트는 많은 트리를 사용하며, 각 성분 트리의 예측을 평균화하여 예측합니다.  
일반적으로 단일 의사 결정 트리보다 예측 정확도가 훨씬 뛰어나며 기본 매개 변수와 잘 동작합니다.  
모델링을 계속하면 더 많은 모델을 학습하여 성능을 향상시킬 수 있지만, 대부분의 델은 올바른 매개 변수를 얻는데 민감합니다. 
랜덤 포레스트 회귀자 클래스를 사용하여 scikit-learn에서 의사 결정 트리를 구축한 방법과 유사한 무작위 포레스트 모델을 구축합니다.  

### Example
~~~python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

forest_test = RandomForestRegressor(random_state=1)
forest_test.fit(train_X, train_y)
test_preds = forest_test.predict(val_X)
print(mean_absolute_error(val_y, test_preds))
~~~

<pre>
결과
191669.7536453626
</pre>
 
### Conclusion
추가적인 개선의 여지가 있을 수 있지만, 이는 최상의 의사 결정 트리의 약 250,000개의 오류에 비해 크게 개선된 것입니다.  
단일 의사 결정 트리의 최대 깊이를 변경함에 따라 랜덤 포레스트의 성능을 크게 변경할 수 있는 매개 변수가 있습니다.  
그러나 랜덤 포레스트 모델의 가장 좋은 기능 중 하나는 이러한 조정 없이도 일반적으로 합리적으로 작동한다는 것입니다.  