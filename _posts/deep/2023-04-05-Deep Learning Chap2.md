---
title: 케라스 창시자에게 배우는 딥러닝 개정 2판 Chapter.2 
layout: post
categories : [Machine Learning-Deep Learning]
image : /assets/img/study/deep/ch02/learning_flow.PNG
description: 케라스 창시자에게 배우는 딥러닝 개정 2판 Chapter.2 
customexcerpt: 신경망의 개념과 구조, 그리고 여러 최적화 방법론들을 학습하고 실습하는 시간을 가진다.
---

# **2장. 신경망의 수학적 구성 요소**
## **2.1 신경망과 첫 만남**

**Keras** 라이브러리를 사용해 손글씨 글자 분류를 하는 예제를 학습한다.

Traing Data로는 아래와 같은 **MNIST**(손글씨 데이터셋)를 사용한다. 

<br/>

10개의 Class를 분류(0~9) (28x28 pixcels) 


![MNIST](/assets/img/study/deep/ch02/MNIST.PNG)

머신러닝에서는 분류하려는 범주를 **class**라고 부른다. 

<br/>

즉, MNIST 데이터셋은 0부터 9까지 10개의 class가 있는 셈

<br/>

## 간단하게 손글씨 분류 모델을 살펴보자

<br/>

colab : https://colab.research.google.com/drive/13KmNPs5NasT_YFvw0Ds1fYmqyf_-xAEC?usp=sharing

<br/>

![image](/assets/img/study/deep/ch02/load_dataset.PNG)

<br/>

학습데이터는 6만개의 손글씨 이미지(28*28)와 

그 이미지가 어떤 숫자가 어떤 숫자인지에 대한 정답을 불러온다. 

<br/>

![image](/assets/img/study/deep/ch02/Sequential.PNG)

<br/>

keras의 Sequential함수는 layer 입력 순서대로 layer층을 쌓아주어서 순차모델이라고도 불린다.

첫번째 인자(512)는 출력 뉴런의 수를 결정한다.
input_dim 옵션을 통해 입력 뉴런의 수도 설정 가능하다.

kernel_initializer 옵션을 통해 가중치 초기화 방법을 설정할 수도 있다. 
(default는 uniform:균등분배, 값은 입/출력 유닛의 수에 의해 결정됨. normal:가우시안분포, 사전지식이 있는 경우(높은 중요도를 가지는 노드를 아는 경우))

activation 옵션의 사용할 활성화 함수를 지정한다.
default는 linear(결과 값이 그대로 나옴.) 

그외에 sigmoid, softmax, relu, tanh 등이 있으며, ReLu를 가장 많이 사용함.

<br/>

![image](/assets/img/study/deep/ch02/activation_func.PNG)

<br/>

컴파일을 통해 모델의 학습 순서를 지정해보자.

<br/>

![image](/assets/img/study/deep/ch02/model_compile.PNG)

Optimizer란 학습한 파라미터 기반으로 모델을 업데이트 방식을 의미한다. (나중에 뒤에서 설명)

loss는 오차를 계산할 손실함수를 의미하며, 모델에 학습에 직접적인 영향을 준다.

metrics는 학습된 **모델을 평가하는 지표**다. 훈련과정에서 손실함수의 추이와 평가지표의 추이를 비교하면서 overfitting 또는 underfitting 되는지 확인할 수 있다.

<br/>

![image](/assets/img/study/deep/ch02/MNIST_normalization.PNG)

<br/>

여기서 주목할 점은 0~255의 정수값을 0~1로 정규화 해준다는 것이다.

딥러닝에서는 feature 값의 크기 자체가 다르면 크기가 큰 feature가 더 중요하다고 판단하기 쉽다. 

따라서 딥러닝에서는 입력데이터를 정규화해서 넣어야 더 학습속도가 빠르고 안정적이다.

실제로 비교를 해봤는데 정규화를 한 학습이 정확도가 근소하게 더 높았다.

<br/>

![image](/assets/img/study/deep/ch02/fit_method.PNG)

<br/>

fit() 메서드를 실행하면 앞에서 정의한 모델의 학습구조를 따라 학습이 진행되고, 진행상황을 출력해준다. 

Epoch을 거듭할수록 손실값이 감소하고 정확도가 증가하는 것을 볼 수 있다.

fit() 메서드는 학습을 진행하면서 계산된 손실과 정확도 값을 History로 반환해준다.

<br/>

## Test 데이터 분류 해보기

![image](/assets/img/study/deep/ch02/model_test.PNG)


<br/>

predict()는 입력받은 test 데이터가 어느 class에 속할 확률을 각 class마다 계산

np.argmax() 메서드를 사용해서 가장 확률이 높은 class의 인덱스 알 수 있다.

테스트 셋의 예측 정확도(97.7%)는 트레이닝 세트의 예측 정확도(98.9%)보다 낮은 이유는 당연하게도 모델이 트레이닝 세트로 학습되었기 때문에 overfitting 되었기 때문이다.

<br/>

## Overfitting, Underfitting

**overfitting**은 훈련 데이터보다 새로운 데이터에서 성능이 낮아지는 것을 의미한다.

모델이 너무 과하게 복잡(deep)해서 발생한다. 

overfitting은 다음과 같은 방법으로 해결할 수 있다.

1. hidden layer의 크기를 줄이거나 layer 개수를 줄여서 모델을 간단하게 만든다.
2. Dropout:학습을 할 때 일부 신경망을 끊고 학습한다.
3. 정규화(regularization): 특정 feature의 가중치에 너무 큰 값이 쏠리지 않도록 규제한다.
4. 학습 데이터를 늘린다.

<br/>

**underfitting**은 이미 보유한 Train 데이터셋도 제대로 학습시키지 못하는 것을 의미한다. 

학습 반복 횟수가 너무 적거나, 데이터의 특성에 비해 모델이 너무 간단한 경우, 그리고 데이터의 양이 부족한 경우 발생한다.

<br/><br/>

# **2.2 신경망을 위한 데이터 표현**
- Tensor란 **tensor는 값의 배열의 집합을 의미한다.** 

- 보통은 3차원 부터 tensor라고 불리는데 scalar, vector, matrix도 값의 배열이기 때문에 tensor이다.

- 머신러닝에서 tensor의 차원(축) 수는 **Rank**라고 부른다. numpy.ndim()으로 확인, shape()으로 차원의 크기를 확인

<br/>

## Rank

- Scalar(0-Rank tensor)
    하나의 숫자만 담고 있는 텐서를 스칼라(Scalar)라고 부른다. 0차원임.

- Vector(1-Rank tensor)
    1차원 배열을 벡터(vector)라고 함. 

    n개의 원소를 가지는 벡터를 n차원 백터라고도 부르기도 함. -> 하나의 원소가 하나의 feature로 해석해서 되어서 그런듯

    그래서 Rank와 n차원 벡터를 혼동하면 안댐 ㅇㅇ

- Matrix(Rank-2 tensor)

    벡터의 배열을 행렬(Matrix)라고 부른다. 테이블 형태의 데이터가 행렬 데이터에 해당함.
    Matrix데이터에서 일반적으로 행은 각각의 데이터 객체를 의미하며, 열은 데이터의 특징을 의미한다.

## batch란?
학습할 전체 데이터셋 나누어서 학습하는 것을 말한다.

전체데이터를 한번에 학습하는 경우 경우 즉 정말로 cost function의 값을 줄이는 양질의 이동을 하게 한다.
하지만 데이터셋의 크기가 커질 경우 iteration을 한번 수행하는데 소요되는 시간이 매우 길다. 이를 보완하기 위해서 learning rate를 높이려고 해봐도 쉽지 않다. 보통 학습을 진행 할 때 learning rate를 너무 크게 잡으면 local minimum만 왔다갔다하거나 minimum에 들어가지 못하는 shooting 현상이 생기기 때문. 

하드웨어입장에서 부담스럽다. 데이터셋이 커질 경우 그 데이터를 메모리에 올려야 될 뿐만 아니라 그 데이터의 전처리한 결과나 레이어를 거친 아웃풋 등도 수시로 메모리를 드나든다. 즉 매우 큰 메모리용량이 필요하다.

**따라서 적당히 빠르고 적당히 정확한 길을 찾기 위해 batch size를 사용해야 하며, 이를 mini-batch라고 한다.**

**1 Epoch : 모든 데이터 셋 한번 학습**
**1 iteration : mini-batch 1회 학습**

전체 데이터가 1000개, epochs = 20, batch size = 200로 학습한다고 가정하면
1 epoch에 5번의 iteration이 이루어진다 -> 1000 / 200 = 5

-> epoch은 20회 학습하면, iteration 100회 학습이 이루어짐.

데이터셋의 첫 번째 축(차원)을 **batch axis** 또는 **batch dimension**이라고 한다.

## 데이터셋

- 벡터 데이터 : (samples, features)로 구성된 랭크-2 텐서
- 시계열 데이터 또는 시퀀스 데이터 : (samples, timesteps, features) 크기의 랭크-3 텐서
- 이미지 : (samples, height, width, channels) 또는 (samples, channels, height, width)의 랭크-4 텐서. 이미지 픽셀들을 행렬로 보면 height가 행, width가 열이고 channels은 픽셀을 표현하는 정보들(색상,명암 등).
- 
- 동영상 : (samples, frames, height, width, channels)또는 (samples, frames, channels, height, width) 랭크-5 텐서. 하나의 이미지가 하나의 frame이라고 생각하면 됨.

<br/><br/>

# 2.3 신경망의 톱니바퀴 : 텐서 연산
텐서 연산(operation) : 전치, 인덱싱, 슬라이싱, 선형 대수, 샘플링 등의 텐서를 다루는 연산을 모두 텐서 연산 또는 텐서 함수라고 한다.

Dense Layer : 입력 층과 출력 층을 모두 fully connected(fc)하게 연결된 형태를 Dense Layer라고 한다. 
입력층과 출력층이 서로 빽빽하게 연결되어 있어서 Dense라고 부른다.

    Dense(output_dim, input_dim, activation='relu')

    output = relu(dot(W, input) + b)
    * relu(x) = max(x, 0) -> 무조건 0 또는 양수로 만듬

<br/>

## 원소별 연산
ReLU처럼 Numpy 배열의 연산을 필요로 할 때 Numpy 내장함수를 사용하는 것이 좋다.

Numpy는 내장함수는 BLAS라는 병렬화되고 효율적인 텐서 연산 라이브러리를 통해 일반적으로 여러 겹의 for문으로 작성된 함수보다 매우 빠르다.

Numpy에 내장된 연산함수에는 사칙연산, 행렬곱, 최대/최소값 등이 있다.

<br/>

## 브로드캐스팅
작은 차원의 텐서가 큰 차원의 텐서의 크기에 맞추어 계산하는 것을 브로드캐스팅이라고 한다.

ex) Perceptron에서 입력이 벡터, 바이어스는 스칼라인 경우.

브로드 캐스팅이 일어나는 과정은 다음과 같다.

X.shape = (32, 10), y.shape = (10)
브로드 캐스팅을 하기 위해서는 X.shape[1] == y.shape[0]이 같아야 함.

1. 차원이 큰 텐서에 맞게 작은 텐서의 축이 추가된다. 
    np.expand_dims(y, axis=0) ---> y.shape = (1, 10)
2. 큰 텐서의 축에 맞게 작은 텐서를 반복
    np.concatenate([y] * 32, axis = 0) ---> y.shape = (32, 10)

<br/>

## 행렬곱 성질
x.shape = (a, b), y.shape = (b, c)  x * y = z

=> z.shape = (a, c)     이때, x.shape[1] == y.shape[0]은 같아야 함.

<br/>

## 텐서 변환
주로 텐서의 변환은 **크기변환(reshape 함수)이나 전치(transpose함수)**를 주로 사용한다. 크기변환은 전처리 단계, 전치행렬는 Backpropagation에서 가중치 행렬이 미분될때 shape을 맞춰주기 위해 쓰임.

images_data.shape = (60000, 28, 28)으로 있을 때

images_data.reshape((60000, 28 * 28))을 통해 60000개의 이미지를 크기 변환하면
Martix 형태로 표현된 이미지가 Vector 형태로 표현되게 됨.

<br/>

## 텐서 연산의 기하학적 의미

<br/>

텐서 형태의 값은 기하학적 공간에 있는 좌표로 해석 가능하다.

<br/>

![image](/assets/img/study/deep/ch02/geometry_space.PNG)

<br/>

**이동** : 벡터의 덧셈 

![image](/assets/img/study/deep/ch02/vector_add.PNG)

<br/>

**회전** :

 R = [[cos(theta), -sin(theta)], [sin(theta), cos(theta)]]와 벡터의 내적.
 
![image](/assets/img/study/deep/ch02/vector_spin.PNG)

<br/>

**크기 변경** : 

S = [[horizontal, 0], [0, vertical]]와 벡터를 내적하여 얻는다. 

![image](/assets/img/study/deep/ch02/vector_size.PNG)

<br/>

**선형 변환** : 

임의의 행렬과 내적하면 선형 변환이 수행됨. 회전과 크기변경이 선형변환에 해당함.

<br/>

**아핀(affine) 변환** : 

선형 변환과 이동의 조합이다. Dense층에서 수행되는 y = W * x + b의 경우가 이에 해당함. 

![image](/assets/img/study/deep/ch02/affine.PNG)

<br/>

**relu 활성화 함수를 사용하는 Dense Layer** : 

아핀 변환에 ReLU 함수 적용. 

![image](/assets/img/study/deep/ch02/relu.PNG)

<br/>

activation function(활성화 함수)을 사용하는 이유가 여기 있다.

dense layer에 activation function이 없다면, 오로지 아핀 변환만 이루어 지게 된다. 

아무리 여러 층으로 아핀변환을 해봤자 결국 한번의 아핀변환과 같다. 

<br/>

**따라서 활성화 함수를 통해 비선형적이고 기하학적인 변형을 가하여 풍부한 가설공간을 만들어 내야한다.**

-> 무슨말인가? 
    
파라미터 W, b는 feature를 어떻게 변환하냐를 결정하기 때문에 최대한 많은 변형을 만들어보고 훈련데이터셋의 정답을 가장 잘 대표하는 변형을 찾아가야 하기 때문이다.  

<br/>

# **2.4 신경망의 엔진 : 그레디언트 기반 최적화**

    output = relu(dot(W, input) + b)

위와 같이 구성된 Dense Layer의 속성 W와 b는 가중치(weight) 또는 훈련되는 파라미터(trainable parameter)라고 부른다.

초기에는 가중치 행렬이 작은 난수로 채워져 있다(무작위 초기화:random initialization).
이러한 난수로 계산된 출력을 기반으로 파라미터가 점진적으로 조정되는데 이 과정을 훈련(training)이라고 부른다.

<br/>

훈련은 다음과 같은 training loop을 가진다.
1. 훈련 샘플 x와 이에 상응하는 타깃 y_true의 배치를 추출한다. 
2. x를 사용하여 모델을 실행하고(foward pass), 예측값 y_pred를 구한다.
3. y_pred와 y_true의 차이를 측정하여 이 배치에 대한 모델의 손실을 계산한다. (cost function, loss function, objective function..)
4. 손실이 감소되도록 모델의 모든 가중치를 업데이트한다.

<br/>

## 그레이디언트(gradient)

텐서의 도함수(미분함수)를 그레디언트라고 한다. y = w^2 + 3 같은 식에서 gradient는 곡선의 기울기 였다면, 다차원 텐서 함수의 **gradient는 다차원 표면의 곡률을 의미**한다.

    y = x * w + b
w에 대한 편미분을 통해, w변화에 따른 y(loss value) 증감을 알 수 있게된다. 

<br/>

## **경사하강법(Stochastic Gradient Discent, SGD)**

<br/>

![image](/assets/img/study/deep/ch02/SGD.PNG)

<br/>

그림처럼 learning_rate 값을 적절하게 선택하는 것이 중요하다. 
값이 너무 작으면 곡선을 따라 내려가는 데 많은 반복이 필요하고 local minimum에 갇힐 수 있다. 
값이 너무 크면 손실 함수 global minimum에서 완전히 벗어난 위치로 이동할 수 있다.

<br/>

**경사 하강법**은 다음과 같은 과정을 거친다.
1. 훈련 샘플 x와 이에 상응하는 타깃 y_true의 배치를 추출한다. 
2. x를 사용하여 모델을 실행하고(정방향 계산), 예측값 y_pred를 구한다.
3. y_pred와 y_true의 차이를 측정하여 이 배치에 대한 모델의 손실을 계산한다. (cost function, loss function, objective function..)
4. 손실이 감소되도록 모델의 모든 가중치를 업데이트한다. (가중치의 업데이트는 설정한 Learning rate만큼 업데이트됨.)
5. 미분을 통해 모델의 파라미터에 대한 손실 함수의 gradient를 계산한다. (backward pass)
6. gradient의 반대 방향으로 파라미터를 W -= learing_rate * gradient만큼 이동시킨다.

<br/>

## **확률적 경사하강법(Stochastic Gradient Discent, SGD)**

여기서 확률적이라는 단어는 **하나의 데이터**를 무작위로 샘플링하여 학습하는 것을 의미한다.
하나의 데이터로 학습하기 때문에 불안정하다는 특징이 있다.

![image](/assets/img/study/deep/ch02/compare_GD_SGD.PNG)


<br/>

## **Batch 경사 하강법(BGD)**
배치 경사 하강법은 **전체 데이터 셋**에 대한 에러를 구하여 Gradient를 한번만 계산하여 모델의 파라미터를 업데이트하는 방법을 의미한다. 학습이 안정적이지만 느리다.

## **Mini-batch 경사 하강법**
Mini-batch로 학습한다. 일반적으로 BGD, SGD의 장점을 섞은 미니 배치 경사하강법을 많이 사용함.




<br/>

# 옵티마이저(Optimizer)

<br/>

이렇게 손실을 최소화하는 방법들을 **최적화 방법(Optimization method) 또는 옵티마이저(Optimizer)라고 부른다.**

<br/>

![image](/assets/img/study/deep/ch02/3dim_SGD.PNG)

<br/>

**옵티마이저는 경사를 내려가는 방식이라고 생각하면 이해하기 쉽다.**

Optimizer에는 SGD, Momentum, Adagrad(Adaptive Gradient Algorithm), RMSProp 등을 포함하여 여러 변형들이 있다.
이들의 특징 간략하게 소개하겠다.

![image](/assets/img/study/deep/ch02/compare_optimizer.gif)

SDG : learning_rate가 일정해서 매우 느리지만 안정적임.

Momentum : learing_rate에 관성의 개념이 추가되어 학습속도를 달라지게 함. 현재 gradient와 이전 단계에서의 가속도 값을 함께 고려하여 학습 속도를 조정한다. 

    velecity = momentum * past_velocity - learning_rate * gradient
    w += momentum * velocity - learning_rate * gradient

SDG이후에 나온 Optimizer들은 이러한 Momentum 개념을 사용한다.

Adagrad : 각각의 파라미터에 개별적으로 업데이트. 지속적으로 변화하던 파라미터는 최적값에 가까워 졌을 것이라고 간주하고, 한 번도 변하지 않은 파라미터에 더 큰 learing_rate을 부여함.

RMSProp : AdaGrad는 복잡한 다차원 곡면 함수에서는 local minimum에 빠지기 쉽다.
Adagrad의 문제점을 개선하기 위해 최소 학습률을 유지하여 학습속도가 0에 수렴하는 것을 방지한다.

이외에도 여러 Optimizer가 있으니까 찾아보도록 하셈 ^^

<br/>

# **역전파 알고리즘(backpropagation algorithm)**

역전파란 덧셈, 렐루, 텐서 곱셈 같이 간단한 연산의 도함수를 사용해서 복잡한 연산의 gradient를 쉽게 계산하는 방법

쉽게 말해 각 Layer의 도함수를 구한뒤에 **연쇄법칙을 통해 gradient를 쉽게 계산하는 방법이다.**

<br/>

## **연쇄법칙(chain rule) : 역전파의 핵심!!**

<br/>

미분 가능한 함수 f, g가 있을 때

F = f(g(x))의 도함수는 F'(x) = f'(g(x))*g'(x)이다

이때 g(x) = t로 치환하면, $\frac{dy}{dx} = \frac{dt}{dx} * \frac{dy}{dt}$ 이다.

<br>

따라서, 각각의 레이어에서 입력에 대한 출력함수의 gradient를 미리 구해서 놓으면, 

입력 변수에 대한 loss의 gradient를 chain rule로 쉽게 계산할 수 있다.

<br/>

## 역전파 예시를 통해 자세히 알아보자!

<br/>

![image](/assets/img/study/deep/ch02/backpropagation_exam1.PNG)

그림에서 초록색 값은 input value 파란색값은 input value와 할당된 파라미터로 계산되어 layer로 전달되는 계산값이다. (계산상의 편의를 위해 bias는 없다고 가정)

노란색 layer는 활성화함수 a20에서 출력된 결과와 target(정답)값으로 오차가 구해지는 layer이다. 

<br/><br/>

비교적 계산하기 쉬운 $w_{10}^{(1)}$의 gradient부터 계산하면서 익혀보자.

<br/>

![image](/assets/img/study/deep/ch02/backpropagation_exam2.PNG)

위와 같이 Chain Rule을 적용하기 위해 뒤쪽에서부터 각 레이어 마다 미분을 진행한다.

<br/>

예제에서는 손실함수 $E_{tot}$로 MSE(Mean Squared Error)를 사용한다.

<br/>

<img src="/assets/img/study/deep/ch02/backpropagation_exam3.PNG" height="100px" width="300px">

<br/>

우선 $a_{20}$에 대한 $E_{tot}$을 미분하면 이러한 식을 얻을 수 있다.

<br/>

|<img src="/assets/img/study/deep/ch02/backpropagation_exam4.PNG" height="100px" width="300px">|<img src="/assets/img/study/deep/ch02/backpropagation_exam5.PNG" height="100px" width="300px">

<br/>

마찬가지로 $z_{20}$에 대한 $a_{20}$의 gradient, $w_{10}^{1}$에 대한 $z_{20}$의 gradient
를 계산한다.

<br/>

![image](/assets/img/study/deep/ch02/backpropagation_exam6.PNG)

<br/>

계산한 미분값들을 모두 대입하면 $w_{10}^{1}$에 대한 손실함수의 gradient를 알 수 있다.

gradient가 양수면 Loss가 증가하니까 가중치를 낮추도록 학습해야하고, 음수면 높이도록 학습해야 한다. 

따라서 다음 Gradient Discent 방식으로 가중치를 업데이트 한다.

<br/>

![image](/assets/img/study/deep/ch02/backpropagation_exam7.PNG)

예제에서 $\eta$(learning_rate)는 0.5

w(1)의 가중치는 Backpropagation을 통해 이렇게 갱신 할 수 있었다.

그렇다면 w(0)의 가중치는 어떻게 계산되어야 할까?

<br/>

![image](/assets/img/study/deep/ch02/backpropagation_exam8.PNG)

$w_{10}^{(0)}$의 가중치는 $y_1$과 $y_2$ 값에 둘다 영향을 주기 때문에, $y_1$과 $y_2$에서 오는 역전파를 모두 고려해서 계산해야 한다.

MSE 오차 함수의 $E_{tot}$ 값을 줄여서 $E_{y1}, E_{y2}$로 표기한다.

$$E_{y1} = \frac{1}{2} * (target_{y1}-a_{20})^2$$
$$E_y2 = \frac{1}{2} * (target_{y2} - a_{21})^2$$

따라서 전체 Loss값은 위 그림의 보라색처럼 $E_1$과 $E_2$에 대한 편미분으로 나누어 계산할 수 있다.

<br/>

![image](/assets/img/study/deep/ch02/backpropagation_exam9.PNG)

![image](/assets/img/study/deep/ch02/backpropagation_exam10.PNG)

이렇게 y1과 y2에서 오는 오차값에 대한 편미분을 구했다면 남은 첫번째 layer의 편미분을 진행하면 된다.

![image](/assets/img/study/deep/ch02/backpropagation_exam11.PNG)

![image](/assets/img/study/deep/ch02/backpropagation_exam12.PNG)

<br/>

위와 같은 과정을 W마다 계산하여 업데이트하면 1회 학습이 완료되며 결과는 다음과 같다.

<br/>

![image](/assets/img/study/deep/ch02/backpropagation_exam13.PNG)

<br/>

### 실제로 모델을 구현할 때는 Tensorflow 같은 프레임워크에서 자동 미분 기능을 사용하여 신경망을 구현할 수 있다.

<br/>

![image](/assets/img/study/deep/ch02/tensorflow_code.PNG)

tensorflow.Variable() 객체를 생성하며 입력 변수를 설정

tensorflow.GradientTape().gradient(y,x)를 통해 x에 대한 y의 gradient를 계산한다.

물론 행렬을 포함해서 고차원 텐서도 입력변수로 설정할 수 있다.

아핀 함수의 매개 변수 W, b에 대한 gradient 계산도 가능하며, 매개변수의 gradient 값은 리스트로 반환된다. 

<br/>

# **2.5 첫 번째 예제 다시 살펴보기**

이번장은 Dense Layer로 이루어진 모델을 간단하게 구현해보는 실습파트.

그래서 굳이 코드를 설명하기 보다는 모델이 학습되는 원리에 대한 설명을 하려고 한다.

<br/>

앞에서는 대부분 하나의 데이터, 즉 벡터가 입력 데이터로 들어왔을 때에 대한 학습을 설명했다.

만약 mini-batch행태로 여러개의 데이터가 함께 들어온다면 어떻게 학습이 이루어질까?

<br/>

![image](/assets/img/study/deep/ch02/learning_flow.PNG)

1. 여러개의 입력 데이터와 그 데이터들의 feature가 입력으로 들어간다. 

    하나의 입력 데이터 vector형태라면, 여러 개의 데이터가 한번에 들어가기 때문에 행렬형태로 들어간다.

2. 무작위 난수를 초기 가중치로 할당. 이때 입력데이터의 차원에 알맞게 가중치가 할당되야한다. (W는 행렬, b는 벡터)

<br/>

![image](/assets/img/study/deep/ch02/matrix_mul.PNG)

<br/>

3. forward pass로 계산해서 예측값을 구해서 손실값을 얻는다.

4. 각 feature마다 계산된 손실값의 평균을 구한다.

5. 역전파를 통해 파라미터의 gradient를 계산한다.

6. Optimizer(가중치 업데이트 방법)을 사용하여 파라미터를 업데이트 한다.


# 2장 끝