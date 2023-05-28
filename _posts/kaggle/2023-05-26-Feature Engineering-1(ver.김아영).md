---
title: kaggle의 과정중 Feature-Engineering을 수료한 후 정리하였다(1)
layout: post   
categories : [kaggle]
image : /assets/img/수료증/zerotoA-Feature_Engineering.png
description: Kaggle의 Feature-Engineering과정 정리  
customexcerpt: "Kaggle의 Feature-Engineering 과정에 대해 알아보자 !!"
---
​
<span class = "alert g">작성자 : 김아영</span>
​
​
<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# Feature Engineering
## What is Feature Engineering
훌륭한 머신러닝 모댈을 구축하는 과정에서 가장 중요한 단계 중 하나인 Feature Engineering(기능 엔지니어링)에 대해 배움
* 상호 정보에서 어떤 특징이 가장 중요한지 결정
* 몇 가지 실제 문제 영역에서 새로운 기능 개발
* 높은 카디널리티 범주형을 대상으로 인코딩으로 인코딩함
* k-means 클러스터링을 사용해 분할 피쳐 생성
* 주성분 분석을 통해 데이터 세트의 변동을 특징으로 분해

**피쳐 엔지니어링의 목표는 당면한 문제에 보다 적합한 데이터를 만드는것**

Feature Engineering을 통해 다음을 수행함
1. 모델의 예측 성능을 향상시킴
2. 계산 또는 데이터 요구 줄임
3. 결과의 해석성을 높임

### Feature Engineering의 지도원리
특징(feature)이 유용하려면 모형이 학습할 수 있는 대상과 관계가 있어야함.  
ex) 선형모델은 선형관계만 학습할수 있기에 선형 모형을 사용할 때 목표값과의 관계를 선형으로 만들기 위해 변환하는것을 목표로한다.  

핵심 아이디어- 기능에 적용하는 변환이 본질적으로 모델 자체의 일부가 된다는 것  
피쳐를 제곱하면 선형 모형에 형상 제곱을 적합시킬수있음(Squaring a feature gave the linear model the ability to fit squared features)  
  
--> 피쳐엔지니어링에 투자된 시간 대비 수익률이 높은 이유를 알수 있음.  
나의 모델이 학습할수없는 관계일지라도, 변형을통해 학습할수있다. 너의 feature set를 개발할때, 모델이 최상의 성능ㅇ르 달성하기 위해 어떤 정보를 사용할 수있는지 생각해보자.  

EX.Concrete Formulations  
아이디어 설명을 위해 데이터 세트에 몇가지 합성 기능을 추가해 랜덤 포레스트 모델의 예측 성능 향상 방법을 알아보자.
~~~py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

df = pd.read_csv("../input/fe-course-data/concrete.csv")
df.head()
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Cement</th>
      <th>BlastFurnaceSlag</th>
      <th>FlyAsh</th>
      <th>Water</th>
      <th>Superplasticizer</th>
      <th>CoarseAggregate</th>
      <th>FineAggregate</th>
      <th>Age</th>
      <th>CompressiveStrength</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>540.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>162.0</td>
      <td>2.5</td>
      <td>1040.0</td>
      <td>676.0</td>
      <td>28</td>
      <td>79.99</td>
    </tr>
    <tr>
      <th>1</th>
      <td>540.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>162.0</td>
      <td>2.5</td>
      <td>1055.0</td>
      <td>676.0</td>
      <td>28</td>
      <td>61.89</td>
    </tr>
    <tr>
      <th>2</th>
      <td>332.5</td>
      <td>142.5</td>
      <td>0.0</td>
      <td>228.0</td>
      <td>0.0</td>
      <td>932.0</td>
      <td>594.0</td>
      <td>270</td>
      <td>40.27</td>
    </tr>
    <tr>
      <th>3</th>
      <td>332.5</td>
      <td>142.5</td>
      <td>0.0</td>
      <td>228.0</td>
      <td>0.0</td>
      <td>932.0</td>
      <td>594.0</td>
      <td>365</td>
      <td>41.05</td>
    </tr>
    <tr>
      <th>4</th>
      <td>198.6</td>
      <td>132.4</td>
      <td>0.0</td>
      <td>192.0</td>
      <td>0.0</td>
      <td>978.4</td>
      <td>825.5</td>
      <td>360</td>
      <td>44.30</td>
    </tr>
  </tbody>
</table>

증강되지 않은 데이터셋에 대한 모델을 교육하여 기준선 설정. 이를 통해 새로운 기능이 실제로 유용한지 여부 확인. 기준선을 설정하는것은 피쳐 엔지니어링 프로세스를 시작할 때 좋은 방법. 기준 점수를 사용해 새 기능을 유지할 가치가 있는지 또는 기능을 삭제하고 다른 기능을 시도해야 하는지 여부 결정가능  
~~~ py
X = df.copy()
y = X.pop("CompressiveStrength")

# Train and score baseline model
baseline = RandomForestRegressor(criterion="absolute_error", random_state=0)
baseline_score = cross_val_score(
    baseline, X, y, cv=5, scoring="neg_mean_absolute_error"
)
baseline_score = -1 * baseline_score.mean()

print(f"MAE Baseline Score: {baseline_score:.4}")
~~~
<pre>
MAE Baseline Score: 8.232
</pre>
~~~py
X = df.copy()
y = X.pop("CompressiveStrength")

# Create synthetic features
X["FCRatio"] = X["FineAggregate"] / X["CoarseAggregate"]
X["AggCmtRatio"] = (X["CoarseAggregate"] + X["FineAggregate"]) / X["Cement"]
X["WtrCmtRatio"] = X["Water"] / X["Cement"]

# Train and score model on dataset with additional ratio features
model = RandomForestRegressor(criterion="absolute_error", random_state=0)
score = cross_val_score(
    model, X, y, cv=5, scoring="neg_mean_absolute_error"
)
score = -1 * score.mean()

print(f"MAE Score with Ratio Features: {score:.4}")
~~~
<pre>
MAE Score with Ratio Features: 7.948
</pre>
세가지 새로운 비율 피쳐를 추가하였더니 성능이 향상 되었다. -> 새로운 비율 기능이 이전에는 감지되지 않았던 중요한 정보를 모델에 노출시켰다는 증거  
## Mutual Information
새로운 데이터세을 처음 접하는 것은 때떄로 부담스러울수있음. 설명조차 없이 수백 또는 수천 개의 기능이 제공 될수 있음.  
훌륭한 첫 번째 단계는 형상과 대상 사이의 연관성을 측정하는 기능인 형상 효용 메트릭으로 순위를 구성하는것  
그런 다음 처음에 개발할 가장 유용한 기능을 더 작게 선택하고 시간을 잘 사용할 수 있다는 확신을 가질 수 있음  
사용할 메트릭을 'mutual information'라고 함. 상호 정보는 두 양사이의 관계를 측정한다는 점에서 상관 관계와 매우 유사함. 상호 정보의 장점은 상관 관계는 선형 관계만 탐지 가능. 상호 정보는 우수한 범용 메트릭이며, 사용할 모델을 아직 모를 때 기능 개발을 시작할 때 특히 유용  
1. 사용 및 해석이 용이
2. 계산적으로 효율적
3. 과적합에 대한 저항성
4. 어떤 종류의 관계라도 감지할수 있음  

### Mutual Information and What it Measures  
상호 정보는 불확실성 측면에서 관계를 설명. 두 수량 사이의 상호 정보(MI)는 한 수량에 대한 지식이 다른 수량에 대한 불확실성을 줄이는 정도의 척도. feature의 value를 알고 있다면 대상에 대해 얼마나 더 확신할 수 있을까 ?
상호정보 적용할 때 기억해야할것들
1. MI를 사용하면 대상 예측 변수로서의 형상의 상대적 잠재력 이해 가능
2. 피쳐가 다른 피쳐와 상호 작용할 때 매우 유용할 수 있지만 단독으로는 그렇게 유용하지 않을 수 있음. MI는 피쳐 간의 상호 작용을 탐지할 수 없음. 일변량 메트릭
3. 기능의 실제 유용성은 해당 기능을 사용하는 모델에 따라 달라짐. 피쳐는 대상과의 관계가 모형이 학습할 수 있는 경우에만 유용. 피쳐에 높은 MI 점수가 있다고 해서 모델이 해당 정보로 어떤 작업도 수행할 수 있는 것은 아님. 연결을 표시하려면 먼저 피쳐를 변환해야 할 수 있음.  

Ex.1985 Automobiles  
~~~py
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

plt.style.use("seaborn-whitegrid")

df = pd.read_csv("../input/fe-course-data/autos.csv")
df.head()
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>symboling</th>
      <th>make</th>
      <th>fuel_type</th>
      <th>aspiration</th>
      <th>num_of_doors</th>
      <th>body_style</th>
      <th>drive_wheels</th>
      <th>engine_location</th>
      <th>wheel_base</th>
      <th>length</th>
      <th>...</th>
      <th>engine_size</th>
      <th>fuel_system</th>
      <th>bore</th>
      <th>stroke</th>
      <th>compression_ratio</th>
      <th>horsepower</th>
      <th>peak_rpm</th>
      <th>city_mpg</th>
      <th>highway_mpg</th>
      <th>price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3</td>
      <td>alfa-romero</td>
      <td>gas</td>
      <td>std</td>
      <td>2</td>
      <td>convertible</td>
      <td>rwd</td>
      <td>front</td>
      <td>88.6</td>
      <td>168.8</td>
      <td>...</td>
      <td>130</td>
      <td>mpfi</td>
      <td>3.47</td>
      <td>2.68</td>
      <td>9</td>
      <td>111</td>
      <td>5000</td>
      <td>21</td>
      <td>27</td>
      <td>13495</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>alfa-romero</td>
      <td>gas</td>
      <td>std</td>
      <td>2</td>
      <td>convertible</td>
      <td>rwd</td>
      <td>front</td>
      <td>88.6</td>
      <td>168.8</td>
      <td>...</td>
      <td>130</td>
      <td>mpfi</td>
      <td>3.47</td>
      <td>2.68</td>
      <td>9</td>
      <td>111</td>
      <td>5000</td>
      <td>21</td>
      <td>27</td>
      <td>16500</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>alfa-romero</td>
      <td>gas</td>
      <td>std</td>
      <td>2</td>
      <td>hatchback</td>
      <td>rwd</td>
      <td>front</td>
      <td>94.5</td>
      <td>171.2</td>
      <td>...</td>
      <td>152</td>
      <td>mpfi</td>
      <td>2.68</td>
      <td>3.47</td>
      <td>9</td>
      <td>154</td>
      <td>5000</td>
      <td>19</td>
      <td>26</td>
      <td>16500</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2</td>
      <td>audi</td>
      <td>gas</td>
      <td>std</td>
      <td>4</td>
      <td>sedan</td>
      <td>fwd</td>
      <td>front</td>
      <td>99.8</td>
      <td>176.6</td>
      <td>...</td>
      <td>109</td>
      <td>mpfi</td>
      <td>3.19</td>
      <td>3.40</td>
      <td>10</td>
      <td>102</td>
      <td>5500</td>
      <td>24</td>
      <td>30</td>
      <td>13950</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2</td>
      <td>audi</td>
      <td>gas</td>
      <td>std</td>
      <td>4</td>
      <td>sedan</td>
      <td>4wd</td>
      <td>front</td>
      <td>99.4</td>
      <td>176.6</td>
      <td>...</td>
      <td>136</td>
      <td>mpfi</td>
      <td>3.19</td>
      <td>3.40</td>
      <td>8</td>
      <td>115</td>
      <td>5500</td>
      <td>18</td>
      <td>22</td>
      <td>17450</td>
    </tr>
  </tbody>
</table>


* 데이터 시각화는 기능 엔지니어링 toolbox에 크게 추가됨. 상호 정보와 같은 유틸리티 메트릭과 함께 이러한 시각화를 통해 데이터에서 중요한 관계를 발견할 수 있음. 더 자세한건 Data Visualization 정리에서 ~~!  

## Creationg Features  

새로운 feature 검색을 위한 TIP
* feature이해, 가능한 경우 데이터셋의 데이터 설명서 참조
* 도메인 지식을 얻기 위해 문제 도메인 조사함. 만약 당신의 문제가 집값을 예측하는것이라면, 책과 저널 기사는 종종 최고의 정보 가지기 ex) 부동산에 대해 조사하기
* 이전 작업을 공부함. 과거 kaggle 대회의 솔루션 기록은 훌륭한 리소스임  
* 데이터시각화 사용. 시각화는 단순화될 수 있는 feature의 분포 또는 복잡한 관계의 병리학을 드러낼 수 있음. feature engineering process를 수행할 때 데이터 셋을 시각화 해야함.  

### Mathematical Transforms(수학적 변환)  
수치 특징간의 관계는 종종 도메인 연구의 일부로 자주 접하게 될 수학 공식을 통해 표현 됨. pandas에서는 열이 보통 숫자인 것처럼 산술 연산을 적용할수 있음. 자동차 데이터 셋은 자동차 엔진을 설명하는 기능이 있음. 연구는 잠재적으로 유요한 새로운 기능을 생성하기 위한 다양한 공식을 산출함. 데이터 시각화는 종종 검정력 또는 로그를 통해 형상을 '재형성'하는 변환을 제안할 수 있음. 
### Counts
어떤 것의 존재 또는 부재를 묘사하는 특징들은 종종 질병의 위험 요소들의 집합으로 나타남. count를 만들어 이러한 feature를 집계할 수 있음. T/F Python에서 불리언은 마치 정수인것처럼 합산될 수 있음.  
### Building-Up and Breaking-Down Features
~~~py
customer[["Type", "Level"]] = (  # Create two new features
    customer["Policy"]           # from the Policy feature
    .str                         # through the string accessor
    .split(" ", expand=True)     # by splitting on " "
                                 # and expanding the result into separate columns
)

customer[["Policy", "Type", "Level"]].head(10)
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Policy</th>
      <th>Type</th>
      <th>Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Corporate L3</td>
      <td>Corporate</td>
      <td>L3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Personal L3</td>
      <td>Personal</td>
      <td>L3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Personal L3</td>
      <td>Personal</td>
      <td>L3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Corporate L2</td>
      <td>Corporate</td>
      <td>L2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Personal L1</td>
      <td>Personal</td>
      <td>L1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Personal L3</td>
      <td>Personal</td>
      <td>L3</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Corporate L3</td>
      <td>Corporate</td>
      <td>L3</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Corporate L3</td>
      <td>Corporate</td>
      <td>L3</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Corporate L3</td>
      <td>Corporate</td>
      <td>L3</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Special L2</td>
      <td>Special</td>
      <td>L2</td>
    </tr>
  </tbody>
</table>
~~~py
autos["make_and_style"] = autos["make"] + "_" + autos["body_style"]
autos[["make", "body_style", "make_and_style"]].head()
~~~
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>make</th>
      <th>body_style</th>
      <th>make_and_style</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>alfa-romero</td>
      <td>convertible</td>
      <td>alfa-romero_convertible</td>
    </tr>
    <tr>
      <th>1</th>
      <td>alfa-romero</td>
      <td>convertible</td>
      <td>alfa-romero_convertible</td>
    </tr>
    <tr>
      <th>2</th>
      <td>alfa-romero</td>
      <td>hatchback</td>
      <td>alfa-romero_hatchback</td>
    </tr>
    <tr>
      <th>3</th>
      <td>audi</td>
      <td>sedan</td>
      <td>audi_sedan</td>
    </tr>
    <tr>
      <th>4</th>
      <td>audi</td>
      <td>sedan</td>
      <td>audi_sedan</td>
    </tr>
  </tbody>
</table>

### Group Transforms
그룹 변환을 사용해 특정 범주별로 그룹화된 여러 행에 걸쳐 정보를 집계함. 그룹 변환을 사용하여 다음과 같은 기능을 만들 수 있음. "거주 상태의 평균 소득" 또는 장르별로 평일에 개봉하는 영화의 비율"과 같은 기능을 만들 수 있습니다. 범주 교호작용을 발견한 경우 해당 범주에 대한 그룹 변환을 조사하는 것이 좋음. 집계 함수를 사용해 그룹 변환은 그룹화를 제공하는 범주형피쳐와 값을 집계하려는 다 피쳐의 두 가지 피쳐를 결합함. 
~~~py
customer["AverageIncome"] = (
    customer.groupby("State")  # for each state
    ["Income"]                 # select the income
    .transform("mean")         # and compute its mean
)

customer[["State", "Income", "AverageIncome"]].head(10)
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>State</th>
      <th>Income</th>
      <th>AverageIncome</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Washington</td>
      <td>56274</td>
      <td>38122.733083</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Arizona</td>
      <td>0</td>
      <td>37405.402231</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Nevada</td>
      <td>48767</td>
      <td>38369.605442</td>
    </tr>
    <tr>
      <th>3</th>
      <td>California</td>
      <td>0</td>
      <td>37558.946667</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Washington</td>
      <td>43836</td>
      <td>38122.733083</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Oregon</td>
      <td>62902</td>
      <td>37557.283353</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Oregon</td>
      <td>55350</td>
      <td>37557.283353</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Arizona</td>
      <td>0</td>
      <td>37405.402231</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Oregon</td>
      <td>14072</td>
      <td>37557.283353</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Oregon</td>
      <td>28812</td>
      <td>37557.283353</td>
    </tr>
  </tbody>
</table>


~~~py
customer["StateFreq"] = (
    customer.groupby("State")
    ["State"]
    .transform("count")
    / customer.State.count()
)

customer[["State", "StateFreq"]].head(10)
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>State</th>
      <th>StateFreq</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Washington</td>
      <td>0.087366</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Arizona</td>
      <td>0.186446</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Nevada</td>
      <td>0.096562</td>
    </tr>
    <tr>
      <th>3</th>
      <td>California</td>
      <td>0.344865</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Washington</td>
      <td>0.087366</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Oregon</td>
      <td>0.284760</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Oregon</td>
      <td>0.284760</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Arizona</td>
      <td>0.186446</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Oregon</td>
      <td>0.284760</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Oregon</td>
      <td>0.284760</td>
    </tr>
  </tbody>
</table>


Tips on Crating Features
* 선형 모델은 합과 차이를 자연스럽게 학습하지만 이보다 더 복잡한 것은 학습할 수 없음
* 비율은 대부분의 모델이 배우기 어려움. 비율 조합은 종종 성능 향상으로 이어짐
* 선형 모델과 신경망은 일반적으로 정규화된 기능에 더 적합함. 신경망은 특히 0에서 너무 멀지 않은 값으로 확장된 기능이 필요함. 트리기반모델(랜덤포레스트 및 XGBoost)은 정규화의 이점을 얻을 수 있지만, 일반적으로 훨씬 적음
* 트리 모델은 기능의 거의 모든 조합을 근사화하는 방법을 배울 수 있지만, 조합이 특히 중요한 경우에는 특히 데이터가 제한적일 때 병시적으로 생성되는 이점을 얻을 수 있음
* 계수는 트리 모델에 특히 유용함. 트리 모델은 여러 기능에 걸쳐 정보를 한 번에 집계하는 자연스러운 방법이 없기 때문  
