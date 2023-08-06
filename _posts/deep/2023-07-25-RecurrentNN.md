---
title: 케라스를 이용해 순환 신경망(Recurrent Neural Network, RNN) 이해하기
layout: post   
categories : [ai]
image : /assets/img/study/deep/ch10/5.png
description: 딥러닝 
customexcerpt: 어... 순환 신경망에 대해 이해를 했다? 그럼 포스트 마지막에서 언급하는 대회에 참여해봐 상금이 2천만원이야💰
---


<span class = "alert g">작성자 : 박정현</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc}



# 시계열을 위한 딥러닝

**시계열(timeseries)** 데이터는 일정한 간격으로 측정하여 얻은 모든 데이터를 말한다.

예를 들어 주식의 일별 가격, 도시의 시간별 전력 소모량, 상점의 주간별 판매량 등이 해당된다.

시계열 데이터는 dynamics를 이해해야 한다.  
> dynamics : 주기성, 시간에 따른 트랜드, 규칙적인 형태 등

가장 일반적인 시계열 관련 작업은 **forecasting** 예측이다. **현시점의 시계열 데이터 다음에 일어날 것을 예측하는 것임.**

이번 장(10장)은 예측에 대해서 주로 다룰 것임.
단, 시계열로 할 수 있는 작업은 실제로 다양하다.

- 분류 : 하나 이상의 범주형 레이블을 시계열에 부여
- 이벤트 감지 : 연속된 데이터 스트림에서 예상되는 특정 이벤트 발생을 식별.  
 (예를 들어 하이 빅스비 이런거 감지)
- 이상치 탐지(anomaly detection) : 연속된 데이터 스트림에서 발생하는 비정상적인 현상을 감지한다.  
(이상치 샘플로 훈련이 불가능 때문에 일반적으로 비지도 학습)

시계열을 다룰 때 매우 다양한 분야에 특화된 데이터 표현 기법을 볼 수 있다.

예를 들어 **Fourier transform**에 대해 들어 보았을 것이다.
> 아니요? 처음인데..

특히 이번 장은 Recurrent Neural Network(RNN)에 대해 모델링하는 방법을 배운다!

## 온도 예측 문제
----
건물 지붕 위의 센서에서 최근에 기록한 기압, 습도와 같은 매시간 측정값의 시계열이 주어졌을 때 24시간 뒤 온도를 예측하는 것이다.

> 좀 어렵다

일단 데이터를 내려받고 압축을 해제하자.


```python
!wget https://s3.amazonaws.com/keras-datasets/jena_climate_2009_2016.csv.zip
```

    --2023-07-25 00:03:43--  https://s3.amazonaws.com/keras-datasets/jena_climate_2009_2016.csv.zip
    Resolving s3.amazonaws.com (s3.amazonaws.com)... 54.231.226.96, 54.231.160.24, 52.217.100.118, ...
    Connecting to s3.amazonaws.com (s3.amazonaws.com)|54.231.226.96|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 13565642 (13M) [application/zip]
    Saving to: ‘jena_climate_2009_2016.csv.zip’
    
    jena_climate_2009_2 100%[===================>]  12.94M  18.8MB/s    in 0.7s    
    
    2023-07-25 00:03:44 (18.8 MB/s) - ‘jena_climate_2009_2016.csv.zip’ saved [13565642/13565642]
    
    


```python
!unzip jena_climate_2009_2016.csv.zip
```

    Archive:  jena_climate_2009_2016.csv.zip
      inflating: jena_climate_2009_2016.csv  
      inflating: __MACOSX/._jena_climate_2009_2016.csv  
    


```python
# 날씨 데이터셋 조사하기

import os

fname = os.path.join("jena_climate_2009_2016.csv")

with open(fname) as f:
    data = f.read()

lines = data.split("\n")
header = lines[0].split(",")
lines = lines[1:]
print(header)
print(len(lines))
```

    ['"Date Time"', '"p (mbar)"', '"T (degC)"', '"Tpot (K)"', '"Tdew (degC)"', '"rh (%)"', '"VPmax (mbar)"', '"VPact (mbar)"', '"VPdef (mbar)"', '"sh (g/kg)"', '"H2OC (mmol/mol)"', '"rho (g/m**3)"', '"wv (m/s)"', '"max. wv (m/s)"', '"wd (deg)"']
    420451
    

총 데이터의 행은 42만 451 열은 14개이다.

이 데이터 전체를 넘파이 array로 변경하자. 온도를 하나의 array로 만들고 다른 나머지 데이터를 또 다른 array로 만들자

> 우리의 목적은 온도를 예측하는 것이니 target 값으로 온도만 따로 가지고 있는 것


```python
import numpy as np

temperature = np.zeros((len(lines),))
raw_data = np.zeros((len(lines), len(header)-1))

for i, line in enumerate(lines):
    values = [float(x) for x in line.split(",")[1:]] # Data Time은 제외됨
    temperature[i] = values[1]
    raw_data[i,:] = values[:]

```


```python
import matplotlib.pyplot as plt

plt.plot(range(len(temperature)), temperature)
plt.title("Temperature over the entire period of the dataset")
plt.show()
```


    
![png](/assets/img/study/deep/ch10/output_7_0.png)
    


시간을 좁혀서 처음 10일간 온도 데이터를 나타낸 그래프다. 10분마다 기록되므로 **하루에 총 144개의 데이터 포인트가 있다.**

> 10일이면 144 * 10 = 1440


```python
import matplotlib.pyplot as plt

plt.plot(range(len(temperature[:1440])), temperature[:1440])
plt.title("Temperature for the first 10 days of the dataset")
plt.show()
```


    
![png](/assets/img/study/deep/ch10/output_9_0.png)
    


이 그래프에서 일별 주기성을 볼 수 있다. 특히 마지막 4일간을 보면 확실합니다.

> 그래프 해석하는 방법   
> Y축은 온도를 의미, X축은 10분 단위 잘린 구간(144 = 1일)

**항상 데이터에서 주기성을 찾아야함**
여러 시간 범위에 걸친 주기성은 시계열 데이터에서 중요하고 매우 일반적인 성질이다. 예를 들어 계절별 전력 사용량 같은?  

**때문에 시계열 데이터를 탐색할 때는 항상 이러한 패턴을 먼저 찾아야함!!**


앞으로 모든 예제는 훈련 : 검증 : 테스트 = 50 : 25 : 25 로 지정하겠다.

**시계열 데이터를 다룰 때 검증 데이터와 테스트 데이터가 훈련 데이터보다 최신이어야 한다.**

> 왜 그럴까? 스스로 생각해보기 바란다.



```python
# 각 분할에 사용할 샘플 개수 계산
num_train_samples = int(0.5 * len(raw_data))
num_val_samples = int(0.25 * len(raw_data))
num_test_samples = len(raw_data) - num_train_samples - num_val_samples

print(num_train_samples)
print(num_val_samples)
print(num_test_samples)
```

    210225
    105112
    105114
    

### 데이터 준비
----
이 문제의 정확한 정의는 다음과 같다.

**한 시간에 한 번씩 샘플링된 5일간의 데이터가 주어졌을 때 24시간 뒤의 온도를 예측할 수 있을까?**

먼저 데이터를 신경망에 적용할 수 있는 형태로 전처리가 필요하다.

데이터가 수치형이니 벡터화도 필요없다. 단, 각 feature의 스케일이 다르기 때문에 normalization 이 필요하다.


```python
# 데이터 정규화

mean = raw_data[:num_train_samples].mean(axis=0)
raw_data -= mean


std = raw_data[:num_train_samples].std(axis=0)
raw_data /= std

```

이제 과거 5일치 데이터와 24시간 뒤 타깃 온도의 배치를 반환하는 Dataset 객체를 만들어야한다.

현재 데이터는 중복이 많다. 즉, 그대로 사용할 경우 메모리 낭비가 심각하다.  
따라서 raw_data와 temperature 배열만 메모리에 유지하고 그때그때 샘플을 생성하겠다.

> keras 내장 기능인 ```timeseries_dataset_from_array()```를 사용해서 샘플을 생성할 수 있다.

해당 기능의 사용 방법을 예시를 통해 보이겠음

우선, 시계열 데이터 배열을 매개변수로 제공하면 결과로 원본 시계열에서 추출한 윈도우를 제공한다.(우린 이걸 sequence라고 부른다.)

> 빅데분 수업 들었으면 뭔말인지 알걸? 들었어도 모른다면 매우 매우 매우 매우 유감  
> 못 들었다면 유감






```python
import numpy as np
from tensorflow import keras

int_sequence = np.arange(10) # 0 ~ 9까지 정수 배열 생성
dummy_dataset = keras.utils.timeseries_dataset_from_array(
    data = int_sequence[:-3], # 0 1 2 3 4 5 6 을 샘플링
    targets = int_sequence[3:], # 윈도우 다음 예측 값은 N+3
    sequence_length = 3, # 시퀀스의 길이
    batch_size = 2 # 시퀀스의 배치 크기
)


for inputs, target in dummy_dataset:
    for i in range(inputs.shape[0]):
        print(f"윈도우 : {[int(x) for x in inputs[i]]}, 예측 : {int(target[i])} ")
```

    윈도우 : [0, 1, 2], 예측 : 3 
    윈도우 : [1, 2, 3], 예측 : 4 
    윈도우 : [2, 3, 4], 예측 : 5 
    윈도우 : [3, 4, 5], 예측 : 6 
    윈도우 : [4, 5, 6], 예측 : 7 
    

대~충 뭔지 알겠제?

그럼 우리 예제에 적용해보게쓰

- sampling_rate = 6, 시간당 하나의 데이터 포인트가 샘플링됨. 즉, 6개의 데이터 포인트 중 하나만 사용
- sequence_length = 120, 이전 5일간(120시간) 데이터 사용
- delay = sampling_rate * (sequence_length + 24 - 1), 시퀀스의 타깃은 시퀀스 끝에서 24시간 후 온도

훈련 데이터셋을 만들 때 처음 50%의 데이터만 사용하기 위해 `start_index`의 값을 0, `end_index`의 값을 `num_train_samples`로 지정  

검증 데이터셋의 경우 그다음 25% 사용을 위해 `start_index=num_train_samples`와 `end_index=num_train_samples + num_val_samples`로 지정

테스트 데이터셋의 경우 남은 샘플을 사용하기 위해 `start_index=num_train_samples + num_val_samples`로 지정한다.


```python
# 훈련, 검증, 테스트 데이터셋 만들기

# 매개변수 설정
sampling_rate = 6
sequence_length = 120
delay = sampling_rate * (sequence_length + 24 - 1)
batch_size = 256

# 훈련 데이터
train_dataset = keras.utils.timeseries_dataset_from_array(
    raw_data[:-delay],
    targets = temperature[delay:],
    sampling_rate = sampling_rate,
    sequence_length = sequence_length,
    shuffle = True,
    batch_size = batch_size,
    start_index = 0,
    end_index = num_train_samples
)

# 검증 데이터
val_dataset = keras.utils.timeseries_dataset_from_array(
    raw_data[:-delay],
    targets = temperature[delay:],
    sampling_rate = sampling_rate,
    sequence_length = sequence_length,
    shuffle = True,
    batch_size = batch_size,
    start_index = num_train_samples,
    end_index = num_train_samples + num_val_samples
)

# 테스트 데이터
test_dataset = keras.utils.timeseries_dataset_from_array(
    raw_data[:-delay],
    targets = temperature[delay:],
    sampling_rate = sampling_rate,
    sequence_length = sequence_length,
    shuffle = True,
    batch_size = batch_size,
    start_index = num_train_samples + num_val_samples
)
```

각 데이터셋은 (samples, targets) 크기의 튜플을 반환함. samples는 256개의 샘플 배치임.

각 샘플은 연속된 120시간의 입력 데이터를 담고 있다. target은 256개의 타깃 온도에 해당하는 배열이다.

샘플이 섞여있으니 (shuffle = True) 배치에 있는 연속된 두 샘플이 꼭 시간적으로 가깝다 보장 못 함.


```python
# 훈련 데이터셋의 배치 크기 확인
for samples, targets in train_dataset:
    print(f"샘플 크기:{samples.shape}")
    print(f"타깃 크기:{targets.shape}")
    break
```

    샘플 크기:(256, 120, 14)
    타깃 크기:(256,)
    

### 상식 수준의 기준점
----

책에서 딥러닝 사용 전 간단한 상식 수즌의 해법을 시도한다. 정상적인 문제인지 확인하기 위한 용도이며 고수준 머신 러닝 모델이라면 뛰어넘어야 할 기준점이다.

이런 상식 수준의 해법은 알려진 해결책이 없는 새로운 문제를 다루어야 할 때 유용하다.

> 데이터 불균형 같은 문제 체크?

날씨 온도라는게 어제 오늘 크게 차이나는 그런건 아니다. 그래서 지금으로부터 24시간 뒤 온도는 지금과 동일하다 예측하는 것이다.


```python
# 상식 수준 모델의 MAE 계산하기
def evaluate_naive_method(dataset):
    total_abs_err = 0
    samples_seen = 0

    for samples, targets in dataset:
        preds = samples[:, -1, 1] * std[1] + mean[1] # 온도 특성은 컬럼 인덱스 1에 있다. 따라서 samples[:, -1, 1]이 입력 시퀀스 마지막 온도 값임.
        # 정규화 했으니 원래 값으로 변경하기 위해 정규화 복구
        total_abs_err += np.sum(np.abs(preds - targets))
        samples_seen += samples.shape[0]

    return total_abs_err / samples_seen


print(f"검증 MAE: {evaluate_naive_method(val_dataset):.2f}")
print(f"테스트 MAE: {evaluate_naive_method(test_dataset):.2f}")
```

    검증 MAE: 2.44
    테스트 MAE: 2.62
    

MAE 결과는 각 2.44, 2.62가 나온 모습이다. 따라서 24시간 뒤 온도를 예측하면 평균적으로 2.5도 차이가 날 것이다.

> (2.44 + 2.62) / 2 = 2.53

나는 개인적으로 만족함. 근데 이런 규칙을 기반으로 날씨 예보를 하지는 않으니 딥러닝도 해보자
> 사실 이거 결과가 절대 좋게 나올 수 없었을 것 같음 좋게 나왔으면 저자는 예제 변경해야함.   

> 우리나라 기상청은 뭐... 생략


### 기본적인 머신 러닝 모델 시도
----

RNN처럼 복잡하고 연산 비용이 많이 드는 모델을 시도하기 전에 간단하고 손쉽게 만들 수 있는 머신러닝 모델(ex. 소규모 신경망)을 먼저 만드는 것이 좋다.

이를 바탕으로 더 복잡한 방법을 도입하는 근거가 마련되고 실제적인 이득도 얻을 것임.


> 여담이지만, 현재 연구소 인턴을 하면서 박사님들의 작업 프로세스를 보면 일단 실험을 매우 매우 매우 많이하고 보완할 점을 기록한다. 그리고 다음 실험에서 개선시킨다....




```python
# 밀집 연결 모델 훈련하고 평가하기

from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

inputs = keras.Input(shape=(sequence_length, raw_data.shape[-1]))
x = layers.Flatten()(inputs)
x = layers.Dense(16, activation = "relu")(x)
outputs = layers.Dense(1)(x)
model = keras.Model(inputs, outputs)

with tf.device('/gpu:0'):
    # 최상의 모델을 저장하기 위한 콜백 정의
    callbacks = [
        keras.callbacks.ModelCheckpoint("jena_dens.keras", save_best_only = True)
    ]

    model.compile(optimizer = "rmsprop",
                loss = "mse",
                metrics = ["mae"])

    history = model.fit(train_dataset,
                        epochs = 10,
                        validation_data = val_dataset,
                        callbacks = callbacks)

model = keras.models.load_model("/content/jena_dens.keras") # 최상의 모델 다시 로드하고 데이터에서 평가

print(f"테스트 MAE:{model.evaluate(test_dataset)[1]:.2f}")
```


```python
keras.utils.plot_model(model, "model2.png")
```




    
![png](/assets/img/study/deep/ch10/output_25_0.png)
    




```python
import matplotlib.pyplot as plt

loss = history.history["mae"]
val_loss = history.history["val_mae"]
epochs = range(1, len(loss) + 1)

plt.figure()
plt.plot(epochs, loss, "bo", label = "Training MAE")
plt.plot(epochs, val_loss, "b", label = "Validation MAE")

plt.title("Training and validation MAE")
plt.legend()
plt.show()
```


    
![png](/assets/img/study/deep/ch10/output_26_0.png)
    


일부 val_loss는 학습을 사용하지 않은 기준점에 가깝지만 안정적이라고는 볼 수 없다.
> X축 에포크, Y축 loss  

앞에서 상식으로 구했던 MAE 값과 다소 차이가 있는 것으로 보인다. 해당 모델이 상식이 없다!

간단하고 괜찮은 성능을 내는 모델이 데이터와 타깃을 매핑할 수 있다면 왜 훈련한 모델은 이를 못 찾고 성능이 낮을까?

아무리 머신러닝이고 경사 하강법을 사용한다지만 우리가 설정한 모델의 2개 층은 결국 네트워크의 가능한 모든 가중치 조합이다.(가설공간)

즉, 경사 하강법이 필수적으로 좋은 결과를 가져다 주지는 않는다.


### 1D ConvNet 사용
----

입력 시퀀스는 일별 주기를 가지기 때문에 합성곱 모델을 적용할 수 있다.

시간 축에 대한 합성곱은 다른 날에 있는 동일한 표현을 재사용할 수 있다.

> 날씨가 다음날 이시간과 매우 큰 차이는 없기 때문

이미 conv2D와 SeparableConv2D 층에 대해 학습 했다.  
이 층들은 작은 윈도우로 2D 그리드 위를 이동하면서 입력을 바라본다. 1D & 3D 합성곱도 존재한다.

- conv1D는 1D 윈도우를 사용하여 입력 시퀀스를 슬라이딩
- conv3D 층은 정육면체 윈도우를 사용하여 입력 볼륨 위를 슬라이딩

![3](https://pic2.zhimg.com/v2-5cba44a31321d5e26d5f96818156cbfd_r.jpg)

<div align=center>
conv3D가 슬라이딩 하는 느낌이라 생각하자.
</div>


conv2D와 매우 유사한 conv1D를 만들 수 있다. **시퀀스 위로 윈도우를 슬라이딩하면 윈도우 안의 내용이 위치에 상관없이 동일한 성질을 가진다는 의미다.** (이를 평행 이동 불변성 가정이라함.)

이를 온도 예측 문제에 적용해 보겠다. 초기 윈도우 길이는 24로 정한다. (한 주기 24시간 데이터)

MaxPooling1D 층으로 시퀀스를 다운샘플링하기 때문에 그에 맞추어 윈도우 크기를 줄인다.



```python
inputs = keras.Input(shape=(sequence_length, raw_data.shape[-1]))
x = layers.Conv1D(8,24,activation = "relu")(inputs)
x = layers.MaxPooling1D(2)(x)

x = layers.Conv1D(8,12,activation = "relu")(x)
x = layers.MaxPooling1D(2)(x)

x = layers.Conv1D(8,6,activation = "relu")(x)
x = layers.GlobalAveragePooling1D()(x)

outputs = layers.Dense(1)(x)
model = keras.Model(inputs, outputs)

with tf.device("/gpu:0"):
    callbacks = [
        keras.callbacks.ModelCheckpoint("jena_conv.keras",
                                        save_best_only = True)
    ]

    model.compile(optimizer = "rmsprop", loss = "mse", metrics = ["MAE"])

    history = model.fit(train_dataset,
                        epochs = 10,
                        validation_data = val_dataset,
                        callbacks = callbacks)

    model = keras.models.load_model("/content/jena_conv.keras")

    print(f"테스트 MAE: {model.evaluate(test_dataset)[1]:.2f}")
```


```python
keras.utils.plot_model(model, "model1.png")
```




    
![png](/assets/img/study/deep/ch10/output_30_0.png)
    




```python
import matplotlib.pyplot as plt

loss = history.history["MAE"]
val_loss = history.history["val_MAE"]
epochs = range(1, len(loss) + 1)

plt.figure()
plt.plot(epochs, loss, "bo", label = "Training MAE")
plt.plot(epochs, val_loss, "b", label = "Validation MAE")

plt.title("Training and validation MAE")
plt.legend()
plt.show()
```

Dense 보다 성능이 더 나쁘다;;

무엇이 문제일지 생각을 해보자.

우선 힌트를 주자면 앞에서 내가 날씨는 평행 이동 불변성을 가정한다고 했다.

다른 이유 하나는 해당 데이터의 순서가 중요하다는 점.  
최근 데이터가 5일 전 데이터보다 내일의 온도를 예측하는 것에 더 유용하다. conv1D는 이런 사실을 활용할 수 없다.

> **최대 풀링, 전역 평균 풀링 층 때문에 순서 정보가 많이 사라짐.**

> [리마인드]  
> MaxPooling : n stride로 선택된 필터에서 가장 큰 값을 뽑는다.  
> GlobalAveragePooling : layer에서 NxN  stride를 기준으로 값을 추출하는 것이 아니라, layer 전체에서 평균을 뽑아버린다.  
> 사용 이유 => 과적합 방지, 풀링을 통해 NxN 필터들을 모두 사용하지 않고 각 필터에서 특정 값 1개를 추출해서 새로운 필터를 생성함.

![2](https://gaussian37.github.io/assets/img/dl/concept/gap/4.png)

<div align=center>
MaxPooling 예시(그림. gaussian37.github.io)
</div>

![3](https://gaussian37.github.io/assets/img/dl/concept/gap/5.png)

<div align=center>
Global AveragePooling 예시 (그림. gaussian37.github.io)
</div>

> 따라서 최대 풀링, 전역 평균 풀링을 이용하면 순서 정보가 많이 사라질 수 있다.(순서를 고려하고 뽑는게 아닌 숫자들의 특징을 이용)



### 첫 순환 신경망(RNN no 일단 LSTM)

Dense 모델은 우리가 시계열 데이터를 ```Flatten()```으로 펼쳐버려서 시간 개념을 없앴다.

합성곱 모델의 경우 모든 부분을 비슷한 방식으로 처리했으며 풀링을 적용하여 순서 정보를 잃도록 했다.

따라서 이번엔 인과 관계, 순서가 의미 있는 시퀀스 데이터를 그대로 사용해본다.

참고로 지금 보일 `LSTM(Long Short-Term Memory)`는 오랫동안 인기가 많았다.


```python
inputs = keras.Input(shape = (sequence_length, raw_data.shape[1]))
x = layers.LSTM(16)(inputs)
outputs = layers.Dense(1)(x)
model = keras.Model(inputs, outputs)

callbacks = [
    keras.callbacks.ModelCheckpoint("jena_lstm.keras",
                                    save_best_only = True)
]

model.compile(optimizer = "rmsprop",
              loss = "mse",
              metrics = ["mae"])

history = model.fit(train_dataset,
                    epochs = 2,
                    validation_data = val_dataset,
                    callbacks = callbacks)

model = keras.models.load_model("/content/jena_lstm.keras")

print(f"테스트 MAE: {model.evaluate(test_dataset)[1]:.2f}")
```

    Epoch 1/2
    819/819 [==============================] - 51s 58ms/step - loss: 40.4400 - mae: 4.6492 - val_loss: 12.6347 - val_mae: 2.7283
    Epoch 2/2
    819/819 [==============================] - 51s 62ms/step - loss: 11.4477 - mae: 2.6242 - val_loss: 10.2691 - val_mae: 2.4910
    405/405 [==============================] - 14s 34ms/step - loss: 14.1066 - mae: 2.7082
    테스트 MAE: 2.71
    


```python
keras.utils.plot_model(model, "model3.png")
```




    
![png](/assets/img/study/deep/ch10/output_35_0.png)
    




```python
import matplotlib.pyplot as plt

loss = history.history["mae"]
val_loss = history.history["val_mae"]
epochs = range(1, len(loss) + 1)

plt.figure()
plt.plot(epochs, loss, "bo", label = "Training MAE")
plt.plot(epochs, val_loss, "b", label = "Validation MAE")

plt.title("Training and validation MAE")
plt.legend()
plt.show()
```

확실히 LSTM 모델이 시퀀스 구조와 잘 맞아서 그런가 가장 성능이 좋은 모습을 보인다.

## 순환 신경망 이해하기
----

밀집 연결 네트워크나 컨브넷처럼 지금까지 본 모든 신경망의 특징은 메모리가 없다!

입력은 개별적으로 처리되며 입력간에 메모리에 저장되어있는 상태는 없다.

즉, 시퀀스를 입력으로 넣어서 시계열 처리를 하려면 시퀀스 전체를 입력으로 줘야한다.(들고있지 않으니 한번에 줘야지)

이런 네트워크를 `피드포워드 네트워크(feedforward network)`라고 부른다.

반대로 사람은 문장을 읽을 때 이전에 나온 것을 기억하면서 눈으로 읽는 만큼 머리속으로 처리한다.

즉, 점진적으로 이전 정보와 새로운 정보를 자연스럽게 처리한다.

순환 신경망은 인간의 이런 모습을 묘사했다. 과거 정보를 사용해서 구축되며 새롭게 얻은 정보를 계속 업데이트한다.  
극단적으로 단순화 했지만 순환 신경망(RNN)은 같은 원리를 적용한 것이다.  
시퀀스를 순회하면서 지금까지 처리한 정보를 **상태**에 저장한다.

![5](/assets/img/study/deep/ch10/1.png)

RNN의 상태는 2개의 다른 시퀀스를 처리하는 사이에 재설정된다. 따라서 하나의 시퀀스를 여전히 하나의 데이터 포인트 즉, 네트워크에 입력되는 값으로 간주할 수 있다.

> loop 형태라는 소리임

루프 상태에 대한 개념을 명확히 하기 위해 간단한 RNN 정방향 계산을 구현해 보자. 이 RNN은 (timesteps, input_features) 크기의 Rank-2 텐서로 인코딩된 벡터의 시퀀스를 입력 받는다.

timestep을 기준으로 순회하며 각 timestep t에서 현재 상태와 입력을 연결하여 출력을 계산한다. 이후 출력이 다음 스템의 상태로 설정한다.

당연히 첫 타임스탭은 이전 출력이 정의된 것이 없으니 현재 상태가 없다. 이땐 네트워크 **초기 상태**인 0벡터로 상태를 초기화 한다.

> 왜 0벡터로 초기화?   
> 1. 그냥 가장 자연스러운 선택이다.
> 2. Gradient flow : 장기 의존성 문제 때문에 훈련 과정에서 기울기 소실 같은 문제 발생 방지
> 3. 다양한 입력 시퀀스에 대해 일반성을 같도록 하기 위함.

~~~python
# RNN의 pesudocode

state_t = 0 # 타임스탭 t의 상태

for input_t in input_sequence: # 시퀀스의 원소 반복
    output_t = f(input_t, state_t)
    state_t = output_t # 출력은 다음 반복을 위한 상태

~~~

f 함수는 입력과 상태를 출력으로 반환한다. 이를 2개의 행렬 W, U 그리고 bias를 사용하는 변환으로 변경할 수 있다.

~~~python
# 좀 더 자세한 RNN의 pesudocode

state_t = 0 # 타임스탭 t의 상태

for input_t in input_sequence: # 시퀀스의 원소 반복
    output_t = activation(dot(W, input_t) + dot(U, state_t) + b)
    state_t = output_t # 출력은 다음 반복을 위한 상태

~~~


```python
# 넘파이로 구현한 간단한 RNN
import numpy as np

timesteps = 100 # 입력 시퀀스에 있는 타임스탭의 수
input_features = 32 # 입력 특성의 차원
output_features = 64 # 출력 특성의 차원
inputs = np.random.random((timesteps, input_features)) # 입력 데이터: 예제를 위한 랜덤한 잡음
state_t = np.zeros((output_features,)) # 초기 상태: 0벡터

W = np.random.random((output_features, input_features)) # 랜덤한 가중치 행렬
U = np.random.random((output_features, output_features))
b = np.random.random((output_features,))

successive_outputs = []
for input_t in inputs: # (input_features, ) 크기의 벡터
    output_t = np.tanh(np.dot(W, input_t) + np.dot(U, state_t) + b) # 입력과 현재 상태(이전 출력)을 연결하여 현재 출력을 얻는다.
    # tanh 함수를 사용해서 비선형성을 추가함

    successive_outputs.append(output_t) # 출력을 리스트에 저장
    state_t = output_t # 다음 타임스탭을 위해 네트워크의 상태를 업데이트한다.

final_output_sequence = np.stack(successive_outputs, axis = 0) # 최종 출력은 (timesteps, output_features) 크기의 Rank-2 텐서다.

```

책에서 아주 쉽네요라고 함.

RNN은 반복할 때 이전에 계산한 정보를 재사용하는 for 루프에 지나지 않는다.

물론 이 정의에 맞는 RNN의 종류는 많다. 지금은 어디까지나 진짜 너무 매우 완전 간단한 RNN의 형태일 뿐.

![6](/assets/img/study/deep/ch10/2.png)

> 방금 예시에서 최종 출력은 (timesyeps, output_feaures) 크기의 Rank-2 텐서다. 각 타임스텝은 시간 t에서 출력을 나타낸다. 출력 텐서의 각 타임스텝 t는 입력 시퀀스에 있는 타임스텝 0 ~ t 까지 전체 과거에 대한 정보를 담고 있다. 이러한 이유로 많은 경우 전체 출력의 시퀀스가 필요없다.  
> 전체 시퀀스의 정보를 알고 있으니 마지막 출력 output_t 만있으면 됨



### 케라스의 순환 층
---

방금 예제가 SimpleRNN이다.

이넘은 하나의 시퀀스가 아니라 케라스의 다른 층과 마찬가지로 시퀀스의 배치를 처리한다.

엄밀히 따지면 입력 크기는 (batch_size, timesteps, input_features) 크기의 입력을 받는다.

시작할 때 Input() 함수의 shape 매개변수에 timesteps 항목을 None으로 지정할 수 있다. 이렇게 하면 임의의 길이를 가진 시퀀스를 처리할 수 있다.

> 아마 컴퓨터 비전 첫 장에서 유사하게 batch 사이즈를 유동적으로 지정했던 적이 있을 것임.




```python
# 어떤 길이의 시퀀스도 처리할 수 있는 RNN
from tensorflow import keras
from tensorflow.keras import layers

num_features = 14
inputs = keras.Input(shape=(None, num_features))
outputs = layers.SimpleRNN(16)(inputs)

print(outputs.shape)
```

모델이 가변 길이 시퀀스를 처리해야 한다면 특히 유용하다. 하지만 시퀀스 길이가 모두 같다면 완전한 입력 크기를 지정하는 것이 좋다.

> 모델 요약 정보에서 길이 정보도 제공받을 수 있으며 일부 성능 최적화를 활용할 수 있음





```python
# 마지막 출력 스탭만 반환하는 RNN 층

num_features = 14
steps = 120
inputs = keras.Input(shape=(steps, num_features))
outputs = layers.SimpleRNN(16, return_sequences=False)(inputs) # return_sequences=False가 기본 값
print(outputs.shape)
```


```python
# 전체 출력 시퀀스를 반환하는 RNN 층

num_features = 14
steps = 120
inputs = keras.Input(shape=(steps, num_features))
outputs = layers.SimpleRNN(16, return_sequences=True)(inputs)
print(outputs.shape)
```

네트워크 표현력을 증가시키기 위해 여러 개의 순환 층을 차례때로 쌓는 것이 유용할 때가 있다.

이 때 중간층들이 전체 출력 시퀀스를 반환하도록 해야함.


```python
# 스태킹(stacking) RNN 층

inputs = keras.Input(shape=(steps, num_features))
x = layers.SimpleRNN(16, return_sequences=True)(inputs)
x = layers.SimpleRNN(16, return_sequences=True)(x)
outputs = layers.SimpleRNN(16)(x)
```

실제로는 SimpleRNN 층을 거의 사용하지 않는다. 일반적으로 실전에 쓰기엔 너무 단순하다.

층이 많은 일반적 네트워크에서 나타나는 것과 비슷한 현상인 그레이디언트 소실 문제 때문이다.

이런 문제를 위해 케라스는 LSTM과 GRU 층이 있다.

우선 LSTM부터 보자 이놈은 SimpleRNN의 변종으로 정보를 여러 타임스템에 걸쳐 나르는 방식이 추가된다. 처리할 시퀀스에 나란히 작동하는 컨베이어 벨트를 생각해보라

시퀀스의 어느 지점에서 추출된 정보가 컨베이어 벨트 위로 올라가 필요한 시점의 타임스템으로 이동하여 떨굽니다. 이게 LSTM이 하는 일입니다. 나중을 위해 정보를 저장함으로써 처리 과정에서 오래된 시그널이 점차 소실되는 것을 막아준다.

> 잔차 연결과 비슷함

자세히 살펴보기 위해 SimpleRNN 셀 그림을 보자  
가중치 행렬 여러 개가 나오므로 출력을 나타내는 문자 0으로 셀에 있는 W, U 행렬을 표현함.

![7](/assets/img/study/deep/ch10/3.png)

다음 그림은 타임스텝을 가로질러 정보를 나르는 데이터 흐름을 추가로 보인다. 티임스텝 t에서 이 값을 이동 상태 c_t(carry)라고 부르겠다. 이 정보를 사용하여 셀이 다음과 같이 변경된다.

![8](/assets/img/study/deep/ch10/4.png)

이동 상태는 입력 연결과 순환 연결(상태)에 연결된다. 그런 후 다음 타임스텝으로 전달될 상태에 영향을 미친다.

> 어떻게 영향을 미치냐?   
> activation(c_t) * activation(W.input + U.state + b) 형태로

개념적으로 보면 데이터를 실어 나르는 이 흐름이 다음 출력과 상태를 조절한다.

그럼 다음 이동 상태 c_t+1이 계산되는 방식이다.

지금 그림에는 3개의 다른 변환이 관련되어있다. (정사격형 3개) 이를 각각 i, f, k라 부르고 아래 의사 코드를 보라

~~~python
output_t  = activation(c_t) * activation(dot(input_t, W0) + dot(state_t, Uo) + b0)

i_t = activation(dot(state_t, Ui) + dot(input_t, Wi) + bi)
f_t = activation(dot(state_t, Uf) + dot(input_t, Wf) + bf)k_t = activation(dot(state_t, Uk) + dot(input_t, Wk) + bk)
~~~
i, f, k를 결합해서 새로운 이동 상태 c_t+1을 구한다.

~~~python
c_t+1 = i_t * k_t + c_t * f_t
~~~

더 자세하게 설명을 하면

![9](/assets/img/study/deep/ch10/5.png)

연산들이 하는 일을 해석하면 각 의미에 대해 통찰을 얻을 수 있다. 예를 들어 **c_t와 f_t의 곱셈은 이동을 위한 데이터 흐름에서 관련이 적은 정보를 의도적으로 삭제한다고 볼 수 있다.**

한편 i_t와 k_t는 현재에 대한 정보를 제공하고 이동 트랙을 새로운 정보로 업데이트합니다. **하지만 결국 이런 해석은 큰 의미가 없습니다. 이 연산들이 실제로 하는 일은 연산에 관련된 가중치 행렬에 따라 결정되기 때문이다.**

이 가중치는 end to end 방식으로 학습된다. 훈련 반복마다 매번 새로 시작되며 이런저런 연산들에 특정 목적을 부여하기가 불가능하다.

RNN 셀의 구조는 가설 공간을 결정한다. 훈련할 때 이 공간에서 좋은 모델 파라미터를 찾는다. 셀의 구조가 셀이 하는 일을 결정하지 않는다.

**같은 셀이더라도 다른 가중치를 가지는 경우 매우 다른 작업을 수행한다.따라서 RNN 셀을 구성하는 연산 조합은 엔지니어링적인 설계가 아니라 가설 공간의 제약 조건으로 해석하는 것이 낫다.**

요약하면 LSTM 셀의 구체적인 구조에 대해 이해할 필요가 전혀 없다. 이를 이해하는 것이 우리가 해야 할 일이 아니다. **LSTM 셀의 역할만 기억하면 된다. 과거 정보를 나중에 다시 입력해 그레이디언트 소실 문제를 해결하는 것이다.**


## 순환 신경망의 고급 사용법
----

앞에서 설명한 내용은

1. RNN이 무엇인지, RNN의 작동방식
2. LSTM이 무엇인지와 단순한 RNN보다 긴 시퀀스를 잘 처리하는 이유
3. 케라스 RNN층을 사용하여 시퀀스 데이터를 처리하는 방법

이제 RNN의 고급 기능을 소개한다.

1. 순환 드롭아웃 : 드롭아웃의 한 종류로 순환 층에서 과대적합을 방지하기 위해 사용
2. 스태킹 순환 층 : 모델의 표현 능력을 증가시킴(대신 계산이 많이 요구됨)
3. 양방향 순환 층 : 순환 네트워크에 같은 정보를 다른 방향으로 주입하여 정확도를 높이고 기억을 좀 더 오래 유지시킴.

온도 예측 RNN을 더 개선해보자



### 과대적합을 감소하기 위해 순환 드롭아웃 사용
----

앞서 사용한 LSTM 모델을 다시 사용해보자. 훈련 손실과 검증 손실 곡선을 보면 모델이 과대적합인지 알 수 있다.

몇 번의 에포크 이후에 훈련 손실과 검증 손실이 현저하게 벌어지기 시작한다. 이런 현상을 해결하기 위해 드롭아웃을 사용했고 이미 실습도 했다.

순환 신경망에 드롭아웃을 적용하기엔 간단하지 않다.

이미 순환 층 이전에 드롭아웃을 적용하면 학습에 더 방해되는 것으로 알려져왔다. 2016년 박사 논문에서 순환 네트워크에 드롭아웃을 사용하는 방법을 알아냈다.  

> 지린다..

타임스텝마다 랜덤하게 드롭아웃 마스크를 바꾸는 것이 아니라 동일한 드롭아웃 마스크(동일한 패턴으로 드롭아웃 진행)를 모든 타임스텝에 적용해야 한다.

**`GRU`나 `LSTM` 같은 순환 게이트에 의해 만들어지는 표현을 규제하려면 순환 층 내부 계산에 사용된 활성화 함수에 타임스템마다 동일한 드롭아웃 마스크를 적용해야 한다.**(순환 드롭 아웃 마스크).

모든 타임스텝에 동일한 드롭아웃 마스크를 적용하면 네트워크가 학습 오차를 타임스템에 걸쳐 적절하게 전파할 수 있다.

케라스의 모든 순환 층은 2개의 드롭아웃 매개변수를 갖는다.  
`dropout`은 층의 입력에 대한 드롭아웃 비율을 정하는 부동 소수점 값임.   
`recurrent_dropout`은 순환 상태의 드롭아웃 비율을 정한다.  

첫 LSTM 예제의 LSTM 층에 순환 드롭아웃을 적용해 어떤 영향을 미치는지 살펴본다.  

**드롭아웃으로 규제된 네트워크는 수렴하는 데 언제나 오래 걸린다.**

> 즉 훈련 반복이 많아야함.




```python
# 드롭아웃 규제를 적용한 LSTM 모델 훈련하고 평가하기
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow as tf

inputs = keras.Input(shape=(sequence_length, raw_data.shape[-1]))

x = layers.LSTM(32, recurrent_dropout=0.25)(inputs)
x = layers.Dropout(0.5)(x) # Dense 층에 규제를 추가하기 위해 LSTM 층 뒤에 dropout 추가
outputs = layers.Dense(1)(x)

with tf.device("/gpu:0"):
    model = keras.Model(inputs, outputs)

    callbacks = [
        keras.callbacks.ModelCheckpoint("jena_lstm_dropout.keras",
                                        save_best_only=True)
    ]

    model.compile(optimizer="rmsprop",
                loss="mse",
                metrics=["mae"])

    history = model.fit(train_dataset,
                        epochs = 50,
                        validation_data = val_dataset,
                        callbacks = callbacks)
```

![10](/assets/img/study/deep/ch10/6.png)

<div align=center>
드롭아웃을 적용한 LSTM 모델의 훈련과 검증 손실
</div>

그림을 보면 어쨋든 GD 알고리즘 때문에 training 에러는 감소하는 것을 보임.

근데, 중요한건 validation 에러가 감소하다가 꾸준히 증가했다는 모습에 집중해야함.

> 모델의 검증 손실이 감소하다가 증가한 구간 : 과대적합 발생!


이게 뭔 말이냐? 기출 문제는 잘 풀다가 모의고사를 조지는 것.
**즉, 과대적합**

> 근데 책에서는 일단 더이상 과대적합은 없다고 말하긴함. 보는 눈과 관점의 차이인듯?(깃허브 예제 코드 결과는 과대적합임 ㅋ)

**[과적합 정리]**

- Training loss와 validation(or test) loss가 같이 감소하는 구간 (underfitting).  
- Training loss는 감소하지만, validation(or test) loss는 증가하는 구간 (overfitting).

**[RNN 런타임 성능]**

이 장에 있는 모델처럼 파라미터 개수가 매우 적은 순환 신경망은 GPU보다 멀티코어 CPU에서 빠른 경향이 있다.

> 둘다 겁나 답답하....

작은 행렬 곱셈만 포함해서 for 루프 때문에 연속된 곱셈이 잘 병렬화되지 않기 때문이다.

기본 매개변수로 설정된 케라스 LSTM과 GRU 층을 GPU에서 사용할 때 cuDNN 커널을 활용할 수 있다. cuDNN은 엔비디아가 제공하는 고도로 최적화된 저수준 알고리즘 구현이다.(이전 장에서 언급했다고 함)

늘 그렇듯 cuDNN 커널은 빠르지만 유연하지 못한 장점을 가진다. 기본 커널에서 지원하지 않는 것을 수행하려면 속도가 크게 느려지는 것을 경험할 것이다.  

때문에 엔비디가아가 제공하는 기능을 사용하게 된다.  
예를 들어, LSTM, GRU cuDNN 커널은 순환 드롭아웃을 지원하지 않는다. 따라서 층에 순환 드롭아웃을 추가하면(계산 비용은 동일)일반적으로 GPU보다 2 ~ 5배 느린 일반 텐서로 구현을 사용하게 된다.

cuDNN을 사용할 수 없을 때 RNN 층의 속도를 높이는 방법으로 층을 **언롤링(unrolling)**할 수 있다. for 루프를 언롤링하면 루프를 제거하고 루프의 내용을 단순히 N번 기술한다. RNN의 for 루프의 경우 언롤링하면 텐서플로가 계산 그래프를 최적화하는 데 도움이 될 수 있다.

하지만 RNN 멤리 사용량을 상당히 증가시킨다.
> 이게 지금은 그닥 상관없지만, 실시간 처리가 필요한 경우 혹은 엣지 컴퓨팅에 사용될 경우엔 아주 치명적

따라서 비교적 작은 시퀀스에만 가능하다. 또한, 모델이 데이터에 있는 타임스텝 수를 미리 알 수 있는 경우에만 사용 가능하다.

> Input()함수에 전달하는 shape가 None 아닌 경우

```python
inputs = keras.Input(shape=(sequence_length, num_features))
x = layers.LSTM(32, recurrent_dropout=0.2, unrool=True)(inputs)
```

참고로 다음과 같은 상황에서 cuDNN 커널을 사용할 수 있다.

The requirements to use the cuDNN implementation are:

activation == tanh  
recurrent_activation == sigmoid  
recurrent_dropout == 0  
unroll is False  
use_bias is True  
Inputs, if use masking, are strictly right-padded.  
Eager execution is enabled in the outermost context.  


### 스태킹 순환 층
-----

성능상 병목이 있는 것 같으므로 네트워크의 용량과 표현력을 늘려야함.

이전에 우리가 배웠던 내용 중

1. 과대적합을 줄이자!
2. 과대적합이 일어날 때까지 모델의 용량을 늘리자

뭐 이런 과정을 한번 했음. 5장인가??

네트워크의 용량을 늘리려면 당연히 층에 있는 유닛의 수를 늘리거나 층을 더 많이 추가하면 됨.

순환 스태킹은 더 강력한 순환 네트워크를 만드는 고전적인 방법이다.

케라스에서 순환 층을 차례대로 쌓으려면 모든 중간층은 마지막 타임스텝 출력만 아니고 전체 시퀀스를 출력해야 한다.

> retrun_sequences = True

이번엔 `GRU(Gated Recuurent unit)`을 사용한다. 이는 LSTM의 간소화 버전으로 생각할 수 있다.


```python
#드롭아웃 규제와 스태킹을 적용한 GRU 모델을 훈련하고 평가하기

inputs = keras.Input(shape=(sequence_length, raw_data.shape[-1]))
# 훈련 속도를 놓이기 위해 순환 드롭아웃을 제외합니다.
# x = layers.GRU(32, recurrent_dropout=0.5, return_sequences=True)(inputs)
# x = layers.GRU(32, recurrent_dropout=0.5)(x)
x = layers.GRU(32, return_sequences=True)(inputs)
x = layers.GRU(32)(x)
x = layers.Dropout(0.5)(x)
outputs = layers.Dense(1)(x)
model = keras.Model(inputs, outputs)

callbacks = [
    keras.callbacks.ModelCheckpoint("jena_stacked_gru_dropout.keras",
                                    save_best_only=True)
]
model.compile(optimizer="rmsprop", loss="mse", metrics=["mae"])
history = model.fit(train_dataset,
                    epochs=50,
                    validation_data=val_dataset,
                    callbacks=callbacks)
model = keras.models.load_model("jena_stacked_gru_dropout.keras")
print(f"테스트 MAE: {model.evaluate(test_dataset)[1]:.2f}")

```

층을 추가해서 극적으로 뭔가 생긴건 아니지만 조금 향상시켰음.

그래서 비용을 따져봤을 때 네트워크 용량을 늘리는 것이 도움이 되지 않는다고 볼 수 있다.

### 양방향 RNN 사용하기
----

**양방향 RNN(Bidirectional RNN)** 은 RNN의 변경종이고 특정 작업에서 기본 RNN보다 훨씬 좋은 성능을 냅니다. 자연어 처리에서는 맥가이버 칼이라고 할 정도로 즐겨서 사용한다고 함.

RNN은 특히 순서에 민감하다. 타임스텝을 섞거나 거꾸로 하면 rNN이 시퀀스에서 학습하는 표현을 완전히 바꾸어 버린다.

양뱡향 RNN은 이러한 특징을 이용한다. GRU, LSTM 같은 RNN을 2개 사용한다. 각 RNN은 입력 시퀀스를 한 방향으로 처리한 후 각 표현을 합친다.  
시퀀스를 양쪽 방향으로 처리하기 때문에 양방향 RNN은 단방향 RNN이 놓치기 쉬운 패턴을 감지할 수 있다.  

우선 입력 시퀀스를 시간 차원에 따라 거꾸로 생성하는 데이터 제너레이터를 만들어야함.


```python
def train_generator():
    while True:
        for samples, targets in train_dataset:
            yield samples[:, ::-1, :], targets

def val_generator():
    while True:
        for samples, targets in val_dataset:
            yield samples[:, ::-1, :], targets

train_gen = train_generator()
val_gen = val_generator()
```

`yield`를 처음 본다면 [여기](https://dojang.io/mod/page/view.php?id=2412)를 참고 바람.


```python
inputs = keras.Input(shape=(sequence_length, raw_data.shape[-1]))
# 훈련 속도를 놓이기 위해 순환 드롭아웃을 제외합니다.
# x = layers.LSTM(32, recurrent_dropout=0.25)(inputs)
x = layers.LSTM(32)(inputs)
x = layers.Dropout(0.5)(x)
outputs = layers.Dense(1)(x)
model = keras.Model(inputs, outputs)

model.compile(optimizer="rmsprop", loss="mse", metrics=["mae"])
history = model.fit(train_gen,
                    epochs=10,
                    steps_per_epoch=819,
                    validation_data=val_gen,
                    validation_steps=410)
```


```python
loss = history.history["mae"]
val_loss = history.history["val_mae"]
epochs = range(1, len(loss) + 1)
plt.figure()
plt.plot(epochs, loss, "bo", label="Training MAE")
plt.plot(epochs, val_loss, "b", label="Validation MAE")
plt.title("Training and validation MAE")
plt.legend()
plt.show()
```


    
![png](/assets/img/study/deep/ch10/output_63_0.png)
    


순서를 뒤집은 LSTM은 이전에 상식으로 측정했던 기준보다 낮다.  

이런 경우 시간 순서대로 처리하는 것이 중요한 역할을 한다고 할 수 있다.  
LSTM은 먼 과거보다 최근 내용을 더 잘 기억한다. 따라서 시간 순서대로 처리하는 네트워크가 거꾸로 처리하는 것보다 성능이 높아야만 한다.

> 예제에서 사용한 데이터는 시간의 순서가 중요하기 때문에 역순으로 입력을 처리하는 경우 당연히 사고다

자연어 처리의 경우는 좀 다르다. 문장을 이해하는 데 단어의 중요성은 위치에 따라 결정되지 않는다.

거꾸로 된 시퀀스에서 훈련한 RNN은 원래 시퀀스에서 훈련한 것과는 다른 표현을 학습한다.

> 표현이 많이 다를수록 더 좋음

13장에 `앙상블(ensemble)` 개념에서 자세히 나온다.

양방향 RNN은 이 아이디어를 사용해 시간 순서대로 처리하는 RNN의 성능을 높였다.

![11](/assets/img/study/deep/ch10/7.png)

케라스는 `Bidirectional()`을 이용해서 양방향 RNN을 만든다. 이 클래스는 첫 번째 매개변수로 순환 층의 객체를 전달받는다.

전달받은 순환 층으로 새로운 두 번째 객체를 생성한다.
순방향, 역방향 2가지를 만들고 처리한다.


```python
inputs = keras.Input(shape=(sequence_length, raw_data.shape[-1]))
x = layers.Bidirectional(layers.LSTM(16))(inputs)
outputs = layers.Dense(1)(x)
model = keras.Model(inputs, outputs)

model.compile(optimizer="rmsprop", loss="mse", metrics=["mae"])
history = model.fit(train_dataset,
                    epochs=10,
                    validation_data=val_dataset)
```

이 모델은(양방향 RNN)은 평범한 LSTM 만큼 성능이 좋지 않다.  
이유는 쉽게 이해할 수 있다

> 대부분의 예측 성능은 순방향 처리에서 나타남

동시에 시간 반대 순서로 처리하는 층 때문에 네트워크 용량이 2배가 되고 훨씬 더 일찍 과대적합이 시작됩니다.

하지만 양방향 RNN은 텍스트 데이터 또는 순서가 중요한(사용 순서가 아닌?) 다른 종류의 데이터에 잘 맞다.



### 10.4.4 더 나아가서
-----
온도 예측 문제의 성능을 향상하기 위해 시도해 볼 수 있는 것이 많이 있다.

- 스태킹한 각 순환 층의 유닛 개수와 드롭아웃의 양을 조정한다.
    지금은 대부분 임의로 했으니 최적화가 덜 되었을 것

- RMSprop 옵티마이저의 학습률을 조정하거나 다른 옵티마이저를 사용
- 순환 층 위에 놓을 회귀 모델을 위해 하나가 아니라 여러 개의 Dense 층을 쌓는다.
- 모델의 입력을 개선한다. 더 길거나 짧은 시퀀스를 테스트해 보거나 샘플링 간격(Sampling_rate)를 변경 혹은 특성 공학 수행


> 작가는 이 데이터로 10% 향상 시키는 것이 최선이라 말함  
> 이유는 한 지역에 대한 측정값만 알아서...


이 글을 다 읽고 순환 신경망을 이해했다면 너는 천재니까 [대회 참여](https://dacon.io/competitions/official/236125/overview/description)해봐 **참고로 7월 25일 기준 D-34임.**