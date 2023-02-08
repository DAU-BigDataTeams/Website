---
title: Linear Regression / Regulation / Logistic regression 세미나 진행
layout: post   
categories : Data, analytics, seminar, ML
image : /assets/img/23-02-07-세미나.png
description: 23-02-07 세미나
customexcerpt: 선형회귀(Linear Regression)과 여러 Regression에 대해 살펴보았으며 범주형 데이터를 분류하는 실습을 통해 Logistic regression과 Linear Regression의 성능 차이를 비교하였다. 그 결과 Lopgistic regression의 성능이 우수했다.
---

2023년 02월 07일 동아대학교에서 선형 회귀(Linear Regression) 와 다양한 기법들에 대해 세미나를 진행했다.   
우리가 그동안 Kaggle을 통해서 학습했던 내용의 일부들이 이번 세미나에서 언급이되어 감이 잘 오지않았던 학생들은 퍼즐을 맞출 수 있는 좋은 기회였다고 한다.

14시 ~ 18시까지 오랜 시간동안 이론 공부를 하였고 마지막으로 실습 데이터(폐암의 양성 음성 분류)를 활용해서 분류 모델을 구성하고 평가를 해보았다.  

범주형 데이터에 대한 분류를 진행하기 앞서 세미나 진행 동안 학습했던 Linear Regression과 Logistic Regression에 대해 실습을 진행했다.  

우리는 범주형 데이터의 특징과 선형 회귀의 특징에 주목했다. 

구체적으로 범주형 데이터의 정답 범위는 0과 1사이인 반면 단순 선형 회귀의 예측값의 범위는 -INF ~ INF이다. 때문에 0과 1사이를 벗어나는 예측은 정확도를 낮추게된다. 즉, 예측의 결과가 0과 1사이에 있어야한다.

하지만, 로지스틱 회귀의 활성 함수는 시그이드 함수를 이용하여 0에서 1사이의 값으로 정규화 후 출력하기 때문에 Label이 범주형인 경우 적합하다고 판단했다.  

실제로 선형 회귀의 경우 시각화를 하였을 때 아래와 같이 나옴을 확인했다.  
![1](/assets/img/세미나/선형회귀1.png)   

모델의 성능을 평가하기 위해 Threshold를 찾아 가장 좋은 threshold를 적용하기로 했다.
> Threshold : 확률값(0~1)을 범주형으로 변환할 때의 기준

Threshold의 값에 따라 정확도가 달라지기 때문에 best threshold를 찾을 필요가 있었다.  
이때 사용된 개념은 AUROC(Area Under ROC)이다. 이 AUROC를 이해하기 위해 필요한 3가지 개념이 있는데.

1. ROC Curve
2. Ture Positive Ratio(TPR)
3. False Positive Ratio(FPR)

![2](/assets/img/세미나/선형회귀2.png)  
위 사진을 통해 TPR, FPR을 산출 후 ROC Curve에서 밑 면적을 구한다. 즉 이것이 AUROC이다.

![3](/assets/img/세미나/선형회귀3.png)  

단, 이때는 여러 Threshold에 대한 AUROC를 산출한는 것이며, 우리는 가장 좋은 Threshold가 필요했다. 따라서 **Youdens' index**라는 개념을 적용하여 가장 좋은 Threshold를 산출하였다.  

Youdens' index란, 최적의 Threshold를 찾는 경우 사용되는 개념이며 비교적 간단한 수식을 통해 구할 수 있다.(아래 수식 참고)

![4](/assets/img/세미나/선형회귀4.png)  
![5](/assets/img/세미나/선형회귀5.png)  



이후, 모델에 적용 한 뒤 시각화를 했을 때 분류가 제대로 이뤄지지 않는 모습을 확인했다.  
![6](/assets/img/세미나/선형회귀6.png)   

이때 정확도는 다음과 같았다.

<pre>
Train accuracy is : 0.98
Test accuracy is : 0.96
</pre>

로지스틱 회귀를 진행하기 전 Scaling 작업을 필요로 하였다. 시그모이드 식에 exp 함수가 있는데 이는, 값이 클 경우 overflow의 위험이 있기 때문이었다.  
![7](/assets/img/세미나/로지스틱1.png)

확실히 이전의 시각화 모습과(선형 회귀) 다른 모습을 눈에 띄게 보여준다. 

정확도 또한 미세한 느낌이 있긴했지만, 향상됨을 알 수 있었다.

<pre>
Train accuracy is : 0.99
Test accuracy is : 0.97
</pre>

추가로 로지스틱 회귀의 예측 과정에서 `predict_proba`와 `predict`메서드가 있었는데. 결과는 `predict`의 승리였다.
이유를 알아보니 두 메서드는 0과 1로 예측하는 방법의 차이가 있었다.  

(0.49, 0.51)이라는 값이 있을 경우 `predict`의 경우 class 1의 확률에 속할 확률이 크기 때문에 class 1로 분류한다.
하지만 `predict_proba`의 경우 best_threshold가 0.52라고 가정하면 class 0에 속한다고 분류한다.

결과적으로 3번의 평가 비교를 통해 가장 우수했던 모델은 Logistic Regression predict 였다.

<pre>
Linear Regression Test Accuracy: 0.96
Logistic Regression predict_proba Test Accuracy: 0.96
Logistic Regression predict Test Accuracy: 0.97
</pre>

이후 치킨 먹으러 감😊

![사진](/assets/img/세미나/23-02-07-세미나.jpg)  

