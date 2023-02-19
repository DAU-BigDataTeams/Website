---
title: Tree Based ML Models에 대한 세미나 진행
layout: post   
categories : [Data, analytics, seminar, ML]
image : /assets/img/세미나/23-02-14-세미나.jpg
description: 23-02-14 세미나
customexcerpt: 트리기반 머신러닝 모델(Decision Tree, Random Forest)에 대해 학습하였다. 두 모델에 대해 장/단점을 비교하고 데이터에 따라 적합한 모델을 선택해 최적의 결과를 만드는 틀에 대해 알아봄
---
### 작성자 : 박정현

**잠깐!! 트리 기반 모델에 대해 조금 더 알고싶으면 이전의 포스트 [Decision Tree](https://dau-bigdatateams.github.io/2023/02/04/Intro-to-ML(ver.-박민서).html), [Random Forest](https://dau-bigdatateams.github.io/2023/02/01/Intermediate-Machine-Learning.html)를 보고오자**  

# Decision Tree(의사결정나무)

의사 결정 규칙과 그 결과물들을 트리 구조로 도식화 한 것임.

![1](/assets/img/세미나/트리기반1.png)

## Decision Tree의 요소

1. 뿌리 노드(root node) : 구조가 시작되는 노드를 의미하며 전체 데이터로 이루어짐
2. 부모 노드(parent node) / 자식 노드(child node) : 구조 중간에 있는 노드들을 의미함
3. 잎 노드(leaf node) : 구조 끝에 위치하는 노드들이며 더 이상 노드가 생성되지 않음
4. 깊이(Depth) : root에서 부터 leaf 까지의 노드 수

![2](/assets/img/세미나/트리기반2.gif)

## 의사결정나무에서 사용되는 알고리즘

Classification And Regression Tree(CART)알고리즘이 있다.(다른 알고리즘 존재함)  
이 알고리즘의 목적은 **각 분할에서 정보 이득(엔트로피)를 최대화 하는 것이며 정보 이득의 최대하는 불순도의 감소로 이어진다.**  

### 분할
노드에서 데이터가 어던 기준에 의해 나지는 과정을 말한다.  
![3](/assets/img/세미나/트리기반3.png)

### 정보 이득(Or 불순도)
Label이 범주형인 경우 사용하는 대표적인 2가지는
1. 엔트로피 지수
2. 지니 지수

Label이 연속형 변수인 경우에는 MSE를 이용한 분산량 감소 방식을 사용한다.

우선 엔트로피(Entropy)는 정보 이론에서, 정보의 불확실함의 정도를 나타내는 양을 말한다. **즉, 데이터를 잘 구분할 수 없을 수록 엔트로피는 커진다.**  
우리의 목적은 이 엔트로피 지수를 감소시키는 것이다.

![4](/assets/img/세미나/트리기반4.png)  


지니 지수(Gini Index)는 불평등의 지표를 나타내는 통계학적 지수이다. **데이터가 비슷하게 있을 수록 지니 지수는 높아진다.**  
우리의 목적은 역시 지니 지수를 감소시키는 것이다.  

![5](/assets/img/세미나/트리기반5.png)   

연속형 변수의 경우 MSE(Mean Square error)를 통해 분할의 효과를 평가한다. 즉 MSE가 작아질수록 분할의 효과는 좋다고 판단한다.

![6](/assets/img/세미나/트리기반6.gif)  

## 의사결정 트리가 노드를 나누는 방법

범주형 변수의 경우 데이터의 특성 유무로 분할하거나 정보 이득을 최대화 하는 분할을 선택한다.  
![7](/assets/img/세미나/트리기반7.png)   

연속형 변수의 경우 특성의 유무로 나눌 수 없다 때문에 경계값을 찾고 경계값과의 비교를 통해 데이터를 분할한다.  
그렇다면 연속형 변수의 경계값을 찾는 방법은 무엇이 있을까?

1. 변수 값에 따라 데이터를 정렬한다.
2. 정답이 바뀌는 경계 지점을 찾는다.
3. 경계의 평균값을 기준으로 잡는다.
4. 구간별 경계값을 기준으로 불순도를 계산한다.
5. 가장 불순도를 낮추는 구간을 경계로 나눈다.

## Feature Importance(변수 중요도)
Decision Tree에서 어떤 변수가 가장 중요한지를 나타내는 정도를 말하며 **불순도를 가장 크게 감소시키는 변수의 중요도가 가장 크다.**

## Decision Tree 장/단점

장점
- 모델의 예측 결과를 해석하고 이해하기 쉽다(if...then 느낌)
- 데이터 가공이 거의 필요없다

단점
- 연속형 변수를 범주형으로 취급하고 학습하기 때문에 예측의 오류가 클 수 있다.
- 노이즈 데이터(이상치)에 영향을 크게 받는다.
- Overfitting 문제가 발생하기 쉽다.

# Random Forest

Random Forest 설명 전에 Ensemble에 대해 알아보자.

Ensemble이란 약한 분류기들을 결합해서 강한 분류기로 만드는 것을 의미한다.
종류는 3가지가 존재한다. (2번 3번은 나중에~)  
1. Bagging : Boostrap에 대해 알아야함.
2. Boosting 
3. Stacking

Boostrap이라는 단어는 어디서 많이 들어봤을 것이다.  
하지만 지금은 **Train Data 에서여러번복원추출하는Random Sampling 기법** 이라고 이해하자. 이론적으로 36.8%의 샘플이 뽑히지 않는다고 하며 이것을 Out-Of-Bag(OBB) 샘플이라고 한다.
OBB를 이용해서 CV의 fold로 사용할 수 있다고 한다.  

![8](/assets/img/세미나/트리기반8.png)   


이때 추출된 Boostrap 샘플마다 약분류기를 학습하는데 그것들의 결과를 Voting을 통해 결합(Aggergation)한다.


Voting의 종류는 `Hard Voting`과 `Soft Voting`이 있다. 

Hard Voting은 예측한 결과값 중 **다수의 분류기가 결정한 값을 최종 값으로 선택한다.**

![9](/assets/img/세미나/트리기반9.png)   

Soft Voting은 **분류기가 예측한 확률 값의 평균으로 결정한다.**

![10](/assets/img/세미나/트리기반10.png)   


그렇다면 Bagging의 장점의 장점이 무엇일까? 
- 분산을 줄이는 효과가 있음
- 원래 추정 모델이 불안정하면 분산 감소효과를 얻을 수 있다!
- 과대적합이 심한(High Variance) 모델에적합


**이제 본격적으로 Random Forest에 대해 소개하겠다.**

## Random Forest와 무작위성(Randomness)
무작위성을 더 강조하여 Decision Tree들이 서로 조금씩 다른 특성을 갖는다.
Decision Tree의 예측들이 비상관화되어 일반화 성능을 향상시킨다.

## Random Forest의 학습 방법

1. Boostrap 방법으로  T개의 부트스트랩 샘플을 생성한다.
2. T개의 Decision Tree을 만든다.
3. Decision Tree 분류기들을 하나의 분류기로 결합한다.

![11](/assets/img/세미나/트리기반11.gif)  

## Random Forest의 장/단점

장점
- Decision Tree의 단점인 Overfitting을 해결함.
- 이상치에 영향을 크게 받지 않는다.
- Decision Tree보다 복잡도가 적다

단점
- 모델의 예측 결과를 해석하고 이해하기 어렵다.

