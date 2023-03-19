---
title: 머신러닝 기초에 대한 정리 (wiht. 트리 기반 모델) !
layout: post   
categories : [kaggle]
image : /assets/img/IntroML/a0Kim/zerotoA - Intro to Machine Learning.png
description:  Kaggle의 Intro to Machine Learning 과정을 정리해보았다
customexcerpt: "Kaggle의 Intro to Machine Learning 과정에 대해 알아보자 !!"
---

작성자 : 김아영

* random line to make it work. This will be removed.
{:toc}

# Intro to Machine Learning

## 1. How Models Work
**Decision Tree(의사 결정 트리)**  
![DecisionTree](/assets/img/IntroML/a0Kim/Sample-Decision-Tree.png)  
데이터에서 패턴을 캡처하는 이 단계를 fitting 또는 training이라고 함  
training data : 모델을 fit시키는데 사용되는 데이터  

Improving the Decision Tree  
![Improve(1)](/assets/img/IntroML/a0Kim/Improving-the-Decision-Tree(1).png)  
1st Decision Tree는 침실이 더 많은 집이 더 적은 집보다 더 높은 가격에 팔리는 경향이 있다는 사실을 포함. 하지만 **단점**이 존재 : 욕실의 수 , 부지 크기, 위치 등과 같은 주택 가격에 영향을 미치는 대부분의 요소를 파악하지 못한다는 것  

"더 깊은"트리 : 더 많은 "분할"이 존재하는 트리 사용해 더 많은 요인 캡쳐 가능  

![Improve(2)](/assets/img/IntroML/a0Kim/Improving-the-Decesion-Tree-(2).png)  
주택의 총 부지 크기도 고려하는 의사 결정 트리는 위와 같음  
-> 의사 결정 트리를 사용해 주택 가격을 에측하고, 해당 주택의 특성에 해당하는 경로를 선택. 우리가 예측하는 가장 아래에 있는 곳을 "leaf"라고 부름. 분할과 "leaf"의 값은 데이터에 의해 결정됨.

## 2. Basic Data Exploration

### Using Pandas to Get Familiar With Your Data
머신러닝 프로젝트에서의 첫번째 단계는 데이터에 익숙해지는것
``` python
import pandas as pd
# 판다스라이브러리 사용
# 쉽게 접근할 수 잇또록 파일 경로를 변수에 저장
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
# 데이터를 읽고 melbourne_data라는 제목의 데이터 프레임에 데이터를 저장
melbourne_data = pd.read_csv(melbourne_file_path) 
# 자료의 요약을 멜버린 자료로 인쇄
melbourne_data.describe()
```
<pre>
<div>
<style scoped="">
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
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
</div>
</pre>


결과는 원래 dataset의 각 열에 대해 8개의 숫자를 표시. 첫번째 숫자인 카운트는 결측값이 없는 행수를 표시. 결측값은 여러가지 이유로 발생

**데이터프레임** : 테이블로 생각할 수 있는 데이터 유형이 저장, Excel의 시트 또는 SQL DB의 테이블과 유사함.
판다스는 이러한 유형의 데이터로 수행하고자 하는 대부분의 작업에 강력한 방법을 가지고 있음.

## 3. Your First Machine Learning Model
### Selecting Data for Modeling
dataset은 머리가 지끈거릴만큼 많고 이쁘게 출력하기엔 너무 많은 변수가 존재함. 어떻게 하면 이 엄청난 양의 데이터를 이쁘게 줄일수있을까요?!  
직관(intuition)을 이용해 몇 가지 변수를 선택하는것으로 시작해 변수의 우선 순위를 자동으로 지정하는 통계 기법을 보여줌.
변수나 columns을 선택하려면 데이터 집합의 모든 columns 목록을 확인해야함. 이 작업은 데이터 프레임의 열 속성으로 수행됨.
```python
import pandas as pd

melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
melbourne_data.columns
```

<pre>Index(['Suburb', 'Address', 'Rooms', 'Type', 'Price', 'Method', 'SellerG',
       'Date', 'Distance', 'Postcode', 'Bedroom2', 'Bathroom', 'Car',
       'Landsize', 'BuildingArea', 'YearBuilt', 'CouncilArea', 'Lattitude',
       'Longtitude', 'Regionname', 'Propertycount'],
      dtype='object')</pre>  


```python
melbourne_data = melbourne_data.dropna(axis=0)
```
데이터의 하위 집합을 선택하는 방법은 여러가지가 있지만 여기에서는 **두가지 접근법**에 초점  
1. "예측 대상"을 선택하는데 사용하는 점 표기법
2. "기능"을 선택하는 데 사용하는 열 목록을 사용하여 선택
   
### Selecting The Prediction Target
dot-notation을 사용해 변수 추출 가능. single column은 데이터 column 하나만 있는 데이터 프레임과 유사하게 시리즈로 저장됨.

```python
y = melbourne_data.Price
```
### Choosing "Features"
우리의 모델에 사용되고 나중에 예측하는데 사용되는 column을 *"feature"*라고 함. 
```python
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude']
# []안에 coulumn 이름 리스트를 제공해 여러 feature를 선택
# 해당 목록의 각 항목은 ""가 있는 문자열이어야 함

X = melbourne_data[melbourne_features]
X.describe()
```
<pre>
<div>
<style scoped="">
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
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
</div>
</pre>

```python
X.head()
```
<pre>
<div>
<style scoped="">
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
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
</div>
</pre>

### Building Your Model
Scikit-learn 라이브러리를 사용하여 모델을 만듦. 

```python
# Scikit-learn은 sklearn으로 작성해 사용
# 데이터 프레임에 저장된 데이터 유형을 모델링하는 데 가장 널리 사용되는 라이브러리
from sklearn.tree import DecisionTreeRegressor

# 모델 정의함. random_state에 대한 숫자를 지정해 실행할 때마다 동일한 결과 보장
melbourne_model = DecisionTreeRegressor(random_state=1)

# Fit model
melbourne_model.fit(X, y)
```

* Define : 어떤 유형의 모델이 될 것인가? 의사결정 트리? 다른 유형의 모델은? 모델 유형의 다른 일부 매개 변수도 지정됨
* Fit : 제공된 데이터에서 패턴을 캡쳐하는것-> 모델링의 핵심 작업
* Predict : 소리가 어떤 것인지
* Evaluate : 모형의 예측이 얼마나 정확한지 확인

많은 머신러닝모델은 훈련에서 약간의 무작위성을 허용함. random_state에 숫자를 지정하면 각 런에서 동일한 결과를 얻을 수있음. 좋은 관행으로 여겨짐 . 원하는 숫자를 사용하면 모형 품질이 정확히 어떤 값을 선택하느냐에 따라 의미 있게 결정되지 않음.

## 4. Model Validation
애플리케이션에서 모델 품질의 관련 측정값은 예측 정확도이다. == 모형의 예측이 실제 발생하는것이 근접함  
많은 사람들은 예측 정확도를 측정할떄 큰 실수함. 훈련 데이터로 예측을 하고 그 에측을 훈련 데이터의 목표값과 비교함.  
어떻게 이 문제를 해결할까 ?  
모델 품질을 이해할 수 있는 방식으로 요약해야함.  
요약하기 위해선 많은 metrics이 있지만, *Mean Absolute Error(=MAE -> 오류의 절대값)*라는 metric으로 시작함.  

MAE를 사용해 각 오류의 절대값을 구하면 각 오류가 양수로 변환하게됨. 그런 다음 절대 오차의 평균을 구함. 이건 모델품질을 측정하는 우리의 척도임

```python
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
```

```python
from sklearn.metrics import mean_absolute_error

predicted_home_prices = melbourne_model.predict(X)
mean_absolute_error(y, predicted_home_prices)
```

### The Problem with "In-Sample" Scores
방금 계산한 측정값은 "in-sample"점수라고 할수있다. 모델을 구축하고 평가하기 위해 단일 sample을 사용했음.  
ex) 대형 부동산 시장에서 문 색깔이 집값과 무관하다고 해보자. 그러나 모델을 작성하는 데 사용한 데이터의 표본에서 녹색문이 있는 모든 집은 매우 비쌌다. 이 모델은 집값을 예측하는 패턴을 찾는 것이기 때문에 항상 녹색 문이 있는 집의 높은 가격을 예측할것이다.  
-> 이 패턴은 훈련 데이터에서 파생되었기에 모델은 훈련 데이터에서 정확하게 나타날 것이다. 그러나 모델이 새 데이터를 볼때 이 패턴이 유지되지 않으면 실제로 사용할 때 모형이 매우 부정확하게 된다.  

모델의 실제 가치는 새로운 데이터에 대한 예측에서 나오기 때문에 모델을 구축하는데 사용되지 않은 데이터의 성능을 측정한다.  

유효성 검사 데이터 : 가장 간단한 방법은 모델 구축 프로세스에서 일부 데이터를 제외한 다음 이러한 데이터를 사용해 이전에 보지 못한 데이터에 대해 모델의 정확성을 테스트하는 것  

### Coding It
sikit-learn 라이브러리는 데이터를 두 조각으로 나누는 train_test_split 함수를 가지고 있다. 해당 데이터 중 일부를 모델에 적합한 교육 데이터로 사용하고, 다른 데이터를 검증 데이터로 사용하여 mean_absolute_error를 계산한다.

```python
from sklearn.model_selection import train_test_split
# 기능과 대상 모두에 대해 데이터를 교육 및 검증 데이터로 분할한다.
# 형상과 대상 모두에 대한 분할은 난수(random number)생성기를 기반으로 한다.
# random_state 인수에 숫자 값을 제공하면 이 스크립트를 실행할 때마다 동일한 분할을 얻을 수 있다.
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state = 0)
# Define model
melbourne_model = DecisionTreeRegressor()
# Fit model
melbourne_model.fit(train_X, train_y)

# get predicted prices on validation data
val_predictions = melbourne_model.predict(val_X)
print(mean_absolute_error(val_y, val_predictions))
``` 
<pre>258930.03550677857</pre>

->표본 내 데이터에 대한 평균 절대 오차는 약 500달러였다. 샘플 외의것은 25만 달러 이상이다.

이것은 거의 정확하게 맞는 모델과 가장 실용적인 목적으로 사용할 수 없는 모델의 차이 이다. 참고로, 검증 데이터의 평균 주택 가치는 110만 달러다. 따라서 새로운 데이터의 오차는 평균 주택 가치의 4분의 1 정도다.

이 모델을 개선할 수 있는 여러 가지 방법이 있습니다. 그중 하나가 *더 나은 기능이나 다른 모델 유형을 찾기 위한 실험을 하는 것*입니다.
## 5. Underfitting and Overfitting

### Experimenting With Different Models
모델 정확를 측정할 수 있는 신뢰할 수 있는 방법을 사용해 대체 모델을 실험하고 어떤 모델이 가장 적합한 예측을 제공하는지 확인할 수 있다.  
하지만 모델들을 위한 대안은 무엇이 있을까 ?  

Scikit-learn의 문서에서 의사결정 트리 모델에는 많은 옵션이 있음을 알 수 있다. 가장 중요한 옵션은 *트리의 깊이를 결정*하는것이다. 첫번째 과정에서 **나무의 깊이는 예측에 도달하기 전에 얼마나 많은 분할을 하는지를 측정하는 것**임을 기억해라  

![Experimenting With Different Models](/assets/img/IntroML/a0Kim/Underfitting-and-Overfitting(1).png)  

 실제로 트리가 top레벨과 leaf사이에 10개의 splits을 갖는것은 드문일이 아니다. 트리가 깊어질수록 dataset은 더 적은집이 있는 leaves으로 잘린다. 트리에 분할이 하나만 있는 경우 데이터를 두 그룹으로 나눈다. 각 레벨에서 분할을 더 추가하여 그룹수를 계속 두 배로 늘리면 210개가 된다. 우리가 10번째 레벨에 도착할때까지 1024 leaves다.  
 우리가 집들을 많은 leaves들로 나눌 때, 우리는 또한 각각의 leaves에 더 적은 집들을 가지고 있다. 집이 거의 없는 leave는 **집의 실제 값에 상당히 가까운 예측을 하지만 새로운 데이터에 대해 매우 신뢰할 수 없는 예측을 할 수 있다**.(->각각의 예측은 집 몇 채에만 기초하기 때문)  

 이 현상을 과적합(Overfitting)이라고 부름. 모델은 훈련 데이터와 거의 완벽하게 일치하지만 검증 및 기타 새로운 데이터는 제대로 수행하지 못한다. 반대로, 우리가 트리를 아주 얕게 만들면, 트리는 집들을 아주 뚜렷한 그룹으로 나누지 않는다.  
 ex) 극단적으로  트리가 집을 2개 또는 4개로 나눈다면, 각 그룹은 여전히 매우 다양한 집을 가지고 있다. **결과 예측은 훈련 데이터에서도 대부분의 주택에서 멀리 떨어져 있을 수 있다**.(+  같은 이유로 유효성 검사에서도 나쁠 것이다)  
 Underfitting : 모델이 데이터에서 중요한 차이와 패턴을 포착하지 못해 훈련 데이터에서도 성능이 떨어지는 경우  

검증 데이터에서 추정하는 새 데이터에 대한 정확성에 관심이 있기에 Underfitting 과 Overfitting 사이의 최적 지점을 찾고자 한다.  
![MAE](/assets/img/IntroML/a0kim/Underfitting-and-Overfitting(2).png)  
-> 위 그림에서 **유효성검사곡선(Validation)의 낮은점**을 원함
### Example
트리 깊이를 제어하기 위한 몇 가지 대안이 있으며, 트리를 통과하는 일부 경로는 다른 경로보다 더 큰 깊이를 가질 수 있다.  
그러나 **max_leaf_nodes**는 과적합 대 과소적합을 제어하는 매우 합리적인 방법을 제공  
모델이 더 많은 leaves를 만들게 허용할수록 위 그래프의 Underfitting 영역에서 Overfitting 영역으로 더 많이 이동  

유틸리티 함수를 사용하여 *max_leaf_nodes*에 대한 다른 값의 **MAE** 점수를 비교해보자
```python
from sklearn.metrics import mean_absolute_error
from sklearn.tree import DecisionTreeRegressor

def get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y):
    model = DecisionTreeRegressor(max_leaf_nodes=max_leaf_nodes, random_state=0)
    model.fit(train_X, train_y)
    preds_val = model.predict(val_X)
    mae = mean_absolute_error(val_y, preds_val)
    return(mae)
```
```python

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
```
```python
# compare MAE with differing values of max_leaf_nodes
for max_leaf_nodes in [5, 50, 500, 5000]:
    my_mae = get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y)
    print("Max leaf nodes: %d  \t\t Mean Absolute Error:  %d" %(max_leaf_nodes, my_mae))
```
<pre>Max leaf nodes: 5  		 Mean Absolute Error:  347380
Max leaf nodes: 50  		 Mean Absolute Error:  258171
Max leaf nodes: 500  		 Mean Absolute Error:  243495
Max leaf nodes: 5000  		 Mean Absolute Error:  254983
</pre>
### Conclusion
모델은 다음과 같은 문제를 겪을수있음
* Overfitting : 미래에 재발하지 않을 가짜 패턴을 캡처해 정확도가 떨어지는 예측
* Underfitting : 관련 패턴을 캡처하지 못해 예측의 정확도가 떨어짐

**우리는 모델 훈련에 사용되지 않는 검증 데이터를 사용하여 후보 모델의 정확도를 측정. 이를 통해 많은 후보 모델을 시도하고 최상의 모델을 유지할 수 있음**
## 6. Random Forests
의사결정트리는 어려운 결정을 남김. leaves가 많은 깊은 트리는 각각의 예측이 leaves에 있는 소수의 집들의 역사적 데이터로부터 나오기에 적합할것이다. 그러나 leaves가 거의 없는 얕은 트리는 원시 데이터에서 많은 차이를 포착하지 못하기에 성능이 저하된다.  

오늘날의 가장 정교한 모델링 기술조차도 underfitting 과 overfitting 사이의 tension에 직면해있다. 하지만, 많은 모델들을 더 나은 성능으로 이어질 수 있는 영리한 아이디어를 가지고 있다. 
 
 랜덤 포레스트를 예로 들어보자  
 랜덤 포레스트는 많은 트리르 사용하며, 각 성분 트리의 예측을 평균화하여 예측함. 일반적으로 단일 의사 결정 트리보다 예측 정확도가 훨씬 뛰어나며 기본 매개 변수와 잘 작동한다. 모델링을 계속하면 더 많은 모델을 학습해 성능을 향상시킬수는 있지만, 대부분의 모델은 올바른 매개 변수를 얻는 데 민감하다.  
### Example
```python
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
```
Scikit-learn에서 의사결정 트리를 구축한 방법과 유사하게 랜덤 포레스트 모델을 구축  
DecisionTreeRegressor대신에 RandomForestRegressor 클래스 사용
```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

forest_model = RandomForestRegressor(random_state=1)
forest_model.fit(train_X, train_y)
melb_preds = forest_model.predict(val_X)
print(mean_absolute_error(val_y, melb_preds))
```
<pre>191669.7536453626</pre>

### Conclusion
추가적인 개선의 여지가 있을 것으로 보이지만, 이는 최선의 의사결정 트리 오류인 250,000에 비해 크게 개선된 것이다. 단일 의사 결정 트리의 최대 깊이를 변경한 것처럼 랜덤 포레스트의 성능을 변경할 수 있는 매개 변수가 있다. 그러나 랜덤 포레스트 모델의 가장 좋은 특징 중 하나는 이 튜닝이 없어도 일반적으로 합리적으로 작동한다는 것이다.