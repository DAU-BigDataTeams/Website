---
title: Feature Engineering 
layout: post   
categories : Data processing, Machine Learning, kaggle
image : /assets/img/DataFeaturing/수료증/Daero Kim - Feature Engineering.png
description: 포스트 설명 ex. 1기 멤버 소개  
customexcerpt: "Feature Engineering"
---

# 1장. What is Feature Engineering?
## Feature Engineering의 개념
---
**만들고자하는 모델의 목적에 적합**하도록 Feature를 가공하는 것을 말한다.

**Feature Engineering**은 모델의 예측 성능을 향상시키고, 데이터로 인한 계산의 복잡함을 줄여주며,     
여러 Feature들간 연산을 통해 해독하기 쉬운 Feature로 변환이 가능하다.   

또한, 선형 모델에서 선형관계로 이루어진 데이터만 처리할 수 있는 것과 같이   
모델이나 알고리즘에 사용하기 위한 데이터의 형식은 정해져 있다.  

때문에 데이터 피처 구조자체를 변형함으로써 이러한 문제점 또한 해결가능하다.

- **Feature Selection(특징 선택)**  
    Feature를 찾는 과정

- **Feature Extraction(특징 추출)**   
  - Dimension Reduction(차원 축소)
  - PCA(Principal Component Analysis:주성분 분석), SVD(Singular Value Decomposition:특이값 분해)
  - LDA(Latent Dirichlet Allocation:잠재 디레클레 할당)

- **Encoding**
    -  One-Hot Encoding
    -  Ordinal Encoding
    -  Target Encoding
    -  Frequency Encoding   


이외에도 매우 많고, 다양한 Feature Engineering 방식이 존재한다.
<br/><br/>

# 2장 Mutual Information
## Mutual Information의 개념
---
많은 수의 feature들로 이루어진 데이터를 다룰 때,  
가장 먼저해야하는 것은 
Feature와 Target의 관계에서 가장 유용한 관계를 찾아내기 위해, Feature들이 얼마나 유용한지 그리고 정보의 가치가 얼마나 있는지에 대해 알아내는 것이다.    

Feature와 Target간 관계의 유용성을 찾아내기 위해서는 두 값의 상관관계를 측정하여 Mutual Information을 구해야 한다.

**Feature**란 독립변수(원인)으로 해석된다.    
**Target**은 종속변수(결과)로 해석된다.
<br/><br/>
## MI(Mutual Information)의 측정    
---
**Mutual Information**은 Feature와 Target 관계에서 불확실성을 측정하여 표현하는 것이다. 
불확실성의 측정은 변수의 엔트로피 측정을 통해 이루어진다.   
(Entropy 측정: 얼마나 많이 변수의 발생을 설명할 수 있는가 없는가)

![image](/assets/img/DataFeaturing/MI_figure_1.PNG)

위의 그림에서 ExterQual 값을 알게 된다면, SalePrice에 대해 더 확실하게 알 수 있다.  
ExterQual의 각 범주는 판매가격을 특정 범위 내로 좁혀준다.   

그림에서 Fair 값이 Typical 값보다 적게 발생하였기 때문에 MI 점수에서 Fair의 가중치가 줄어든다   
-> MI 점수가 작아진다.  
<br/>
## MI 해석  
---
**두 변수가 독립**인 경우 MI 점수는 0의 값을 가지며,의존적인 관계가 커짐에 따라 값이 증가한다.     

다음은 그림은 Feature 변수와 Target 변수간 관계에 대해 MI 점수를 구한 그래프이다.
<br/><br/>
![image](/assets/img/DataFeaturing/MI_figure_2.PNG)

오른쪽 그래프를 통해서 Feature와 Target 변수 사이의 연관성을 알아낼 수 있다.
<br/><br/>
## MI 한계점
---
MI는 Target값을 예측하기 위해 Feature의 영향력을 이해하는데 도움이 된다.    

그러나, MI는 여러 Feature들이 존재한다면 유용하지만, 단일 Feature인 경우 MI를 측정할 수 없다.   

또한, Feature의 유용성은 적용하고자 하는 모델에 따라 달라지기 때문에, 모델이 Feature와 Target간 관계를 학습할 수 있어야만 한다. 
<br/><br/>

# 3장. Creating Features
## Introdution of Creating Features
---
앞에서 Feature들의 잠재성을 파악하였고, 
이번 장에서는 Pandas에서 할 수 있는 일반적인 변환들에 대해 학습한다.
<br/><br/>

## Mathematical Transforms
---
정량적인 수치를 가지는 Feature사이의 관계는 수학적인 공식을 통해 표현될 수 있다.  
연구 분야에서는 다양한 공식을 통해서, 유용한 Feature들을 만들고 있다.   
아래에서 예시로 새로운 Feature를 생성하는 과정을 볼 수 있다.

 'stroke ratio'는 엔진이 얼마나 효율적인지에 대한 측정값을 의미하며, 'stroke', 'bore'간 연산을 통해 다음과 같이 계산된다.

**autos["stroke_ratio"] = autos.stroke / autos.bore**

**autos[["stroke", "bore", "stroke_ratio"]].head**()  

연산이나 조합이 복잡해질수록 생성된 피처를 학습시키기 어려워진다.

데이터를 시각화할 때, 데이터가 매우 큰 이상치가 존재하거나 왜곡되어있는 경우 알아보기 힘들 정도로 값이 몰려있는 경우가 발생할 수 있다.  
이때, 아래와 같이 로그 정규화같은 수학적인 변형을 통해 시각화 문제를 해결할 수 있다. 

![image](/assets/img/DataFeaturing/log-normalization.PNG)
<br/><br/>

## Counts
---
이진값의 데이터를 가지는 피처들을 다룰 때, count를 통해 집계하여 새로운 피처를 만들 수도 있다.

또한, 수치형 데이터를 count로 집계할 때는 gt(value) 함수를 통해 일정값을 넘는지 않넘는지로 이진값으로 분류하고 집계할 수도 있다.

## Building-Up and Breaking-Down Features
---
종종 아래와 같이 복잡한 문자열들로 이루어진 데이터를 다루는 경우가 있다.

![image](/assets/img/DataFeaturing/string-data.PNG)

전화번호의 경우, 앞의 지역번호를 문자열 추출하여 그대로 사용하거나 Encoding을 거쳐 지역정보를 가지는 새로운 피처를 생성할 수 있다.

또한 문자열이 2가지 이상의 속성을 가지고 있을 때, split() 함수를 통해 문자열을 분할 하여, 원래 속성을 두가지 속성으로 나눌 수도 있다.

ex) Policy : Corporate L3   
    split -> Type : Corporate, Level : L3

그리고, 문자열 합성을 통해서도 두가지 이상의 문자열 피처를 합성하여 새로운 피처를 만드는 것도 가능하다.
<br/><br/>

## Group Transforms
---
Pandas의 groupby() 함수를 사용하면 속성값 각각에 대해서 값을 집계할 수 있다.

groupby()를 통해 그룹화를 하게되면, 해당 속성값의 max(최댓값), min(최솟값), median(평균값), var(분산), std(표준편차), count(데이터 수) 등의 값을 쉽게 도출할 수 있다.

count를 통해 Frequency Encoding(빈도 인코딩)를 진행하여 하나의 피처를 관측했을 때 해당 속성값이 나올 각각의 확률을 알아 낼 수도 있다.   
좀 더 나아가 이러한 확률을 가지고 평균값 등의 정보와 합성하여 사용한다면 매우 유용한 피처를 만들 수 있다.
<br/><br/>

# 4장. Clustering With K-Means
## Introduction
---
비지도 학습은 Target값이 존재하지 않기 때문에, 데이터의 일부 피처를 학습하고, 특정한 방식으로 피처의 구조를 표현하는 것이다.

Clustering은 단순히 데이터 point가 얼마나 유사한지에 따라 point 데이터를 그룹에 할당하는 것을 말한다.

Cluster 군집에 Lable을 부여하면 머신러닝 모델이 공간 근접성을 학습하는데 도움이 될 수 있다. 
<br/><br/>

## Cluster Labels as a Feature
---
단일 피처를 클러스터링하면 Binning 또는 discretization 변환과 같은 역할을 하게된다. 
다중 피처의 클러스터링은 Multi-dimensional binning이라 부르는 벡터 양자화이다.

![image](/assets/img/DataFeaturing/single,multi_dimensional_clustering.PNG)

클러스터링을 진행하면 결과는 범주형이다.

아래 그림처럼 전체적인 SalePrice와 YearBuilt의 관계는 선형이 아니고 복잡한 형태를 가진다.

하지만 군집의 각각은 선형적인 형태를 띄기 때문에, 모델학습에 도움이 된다.

![image](/assets/img/DataFeaturing/clustering_chunks.PNG)
<br/><br/>

## Clustering With Clustering
---
클러스터링 알고리즘은 매우 많이 존재한다. 
주로 유사성과 근접성을 측정하는 방법과 어떤 기능을 사용하는지에 따라 클러스터링 알고리즘은 달라진다.  

k-means는 직관적이고 피처 엔지니어링 맥락에 적용하기 쉽다.  
K-means clustering은 유클리드 거리를 사용하여 유사성을 측정한다. (유클리드 거리:점과점의 직선거리)  
형상 공간 내부에 중심점이라고 하는 여러 점들을 배치하여 군집을 생성한다. k-means에서 k는 중심점의 수를 뜻하며, k는 사용자가 지정할 수 있다.

각 중심점들과 가까운 점들은 해당 군집이 되며, 두 중심점과 거리가 같아지는 지점에 군집의 경계선이 형성되며, 이 선을 Vornoi tessallation이라고 한다.  

![image](/assets/img/DataFeaturing/vornoi_tessallation.PNG)

k-means 알고리즘의 단계는 다음과 같다.

1. 정의된 k개의 중심체를 임의로 초기화하여 배치한다.
2. 가장 가까운 군집 중심으로 중심점을 이동한다. 

위와 같은 과정을 더 이상 중심체가 움직이지 않을 때 까지 혹은 지정한 최대 반복 횟수에 도달할 때까지 두 단계를 반복한다.

가끔 임의로 중심체의 초기화 위치를 정했기 때문에 불량한 군집이 도출되는 일이 발생할 수 있다.  
이를 방지하고자, n_init 매개변수를 통해 클러스터링을 여러번 반복하고 각 점과 중심과의 총거리가 가장 작은 최적 클러스터를 반환한다.
<br/><br/>

# 5. Principal Component Analysis(PCA)
## Introduction
---
클러스터링이 근접성을 기반으로 데이터 집합을 분할하는 것과 마찬가지로 PCA도 데이터의 변동을 분할하는 것으로 볼 수 있다. 

PCA는 데이터에서 중요한 관계를 찾는 데 도움이 되며, 더 많은 정보를 담는 피처를 생성할 수 있다.
<br/><br/>

## Principal Component Analysis
---
전복 데이터 셋을 통해 PCA를 학습한다.

해당 전복 데이터는 전복으로부터 얻은 물리적 측정값들이 존재하며, Height(높이)와 Diameter(직경)이 해당된다.

![image](/assets/img/DataFeaturing/abalones.PNG)

위의 그림에서 Height와 Diameter 외에도 다른 축이 존재한다고 가정할 수 있다.

이러한 새로운 축의 요소들에게 Size라는 이름을 붙일 수 있고, 또 다른 축에는 Shape이라고 이름 붙일 수 있다.

전복을 Height와 Diameter으로 설명하는 대신, Size와 Shape으로 설명할 수도 있다.  

**즉, 기존 피처들을 새로운 피처로 이루어진 축으로 변환한다는 것이다.**

이것이 PCA의 가장 주요한 핵심 아이디어이다.

PCA는 고유벡터와 고유값을 추출하여 축을 변환하는 것이기 때문에 변환과정에서 고유 벡터와 고유값을 계산해야 한다.

기존 축들은 고유벡터에 해당되며, 새로운 축을 만들기 위해 기존축에 곱하는 값은 고유값이라고 하며, loadings이라고 부르기도 한다.  
<br/>

![image](/assets/img/DataFeaturing/explaining_rate.PNG) 
위 사진은 PCA를 통해 생성한 피처인 Size와 Shape이 원래 데이터의 정보를 얼마나 잘 표현하고 있는 지를 보여준다.
<br/><br/>

## PCA for Feature Engineering
---
PCA를 Feature Engineering에 활용하는 두 가지 방법이 존재한다.   

첫 번째 방법은 기술을 묘사하기 위해 사용하는 것이다.
성분이 기존 피처에 대해 알려주므로 성분에 대한 MI 점수를 계산하고 목표값을 가장 잘 예측하는 피처의 종류를 알 수 있다.   
예를 들면, Height와 Diameter의 곱/비율을 통해 Shape에 대한 정보를 얻을 수 있다.

두번째 방법은 찾아낸 요소(Shape) 자체를 새로운 피처로 사용하는 것이다.  
왜냐하면, 이러한 요소들은 기존의 피처의 분산을 통해 구해졌기 때문에 기존의 피처들 보다 더 유용할 수 있다.

PCA는 다음과 같은 목적으로 사용된다.  
1. 차원 축소 : 무수한 피처들이 중복된 경우 PCA는 0에 가까운 분산을 가진 요소로 분할하기 때문에, 새로 생긴 피처들에는 정보가 거의 없거나 거의 포합되지 않기 때문에 이러한 구성 요소를 삭제할 수 있다.
2. 이상 탐지 : 비정상적인 변동은 주로 저분산 성분에서 나타나기 때문에, 이상치 탐지에 매우 효과적이다.
3. Decorrelation : 일부 머신러닝 알고리즘은 상관성이 높은 피처로 인해 어려움을 겪는다. PCA는 상관관계가 있는 피처를 상관관계가 없는(orthogonal) 구성요소로 변환하므로 알고리즘 작업이 수월해진다.
<br/><br/>   

# 6장. Target Encoding
## Introduction
---
앞서 배운 대부분의 기술들은 연속적인 값을 값는 수치적 데이터를 위한 기술들이다. 하지만 Encoding은 범주형 피처를 위한 기술이다.  

Encoding은 범주로 이루어진 피처를 통해 수치형으로 변환하는 과정이다.
<br/><br/>

## Target Encoding
---
Target Encoding은 일종의 피처의 범주를 Target과 관련된 값으로 대체하는 것이다.

![image](/assets/img/DataFeaturing/target_encoding.PNG)

위의 예시에서 make속성이 alfa-romero에 해당하는 데이터들의 price값이 Target이고, alfa-romero인 값들이 모두 Target의 평균값으로 Encoding 된 모습을 볼 수 있다.
<br/><br/>

## Smoothing
---
하지만 Encoding은 여러 문제점이 존재한다. 
첫번째는 알려지지 않은 범주이다. Target Encoding은 Overfitting의 위험성을 야기시키는데, 이는 독립적인 Encoding 분할에 대해 알아야한다.

분할에 Encoding을 결합하면 Encoding 분할에 없는 범주에 대한 결측값이 Pandas에 의해 채워지게 된다.
따라서 이 누락된 값들을 어떻게든 바인딩해주어야 한다.

두번째는 rare categories이다. 
범주가 데이터셋에서 드물게 발생하는 경우 해당 그룹에서 계산된 통계는 정확성이 떨어진다. 
예시의 자동차 데이터 세트에서 'mercury' 범주값은 한번만 등장하는데, 이때 'mercury' 범주의 가격은 대표성을 띈다고 보기 어렵다. -> Overfitting 가능성 증가

이러한 문제의 해결 방법은 Smoothing을 진행하는 것이다.

Smoothing은 범주 내 평균과 전체 평균을 혼합하는 것이다.
rare한 범주는 범주 평균에 대한 가중치가 적은 반면에, 누락된 범주는 전체 평균을 얻게 된다.

---
**In pseudocode:**

**encoding = weight * in_category + (1 - weight) * overall**  
(where weight is a value between 0 and 1 calculated from the category frequency.)

An easy way to determine the value for weight is to compute an m-estimate:

**weight = n / (n + m)**  
(where n is the total number of times that category occurs in the data.)  

---
위 식에서 파라미터 m은 smoothing factor라고 하며, m의 값이 클수록 전체 평균의 영향을 더 많이 받게 된다.
<br/><br/>

# Feature Engineering 교육과정 수료
![image](/assets/img/수료증/Daero%20Kim%20-%20Feature%20Engineering.PNG)
