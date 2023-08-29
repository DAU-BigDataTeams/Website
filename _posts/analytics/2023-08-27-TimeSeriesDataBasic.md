---  
title: 비트코인 시세로 알아보는 시계열 데이터 분석 기초 
layout: post    
categories : [Analytics, python-study] 
image : /assets/img/study/analytics/hannah/사진10.png
description: 비트코인 시세로 알아보는 시계열 데이터 분석 기초 
customexcerpt:  비트코인의 시세를 예측하기 위한 다양한 시도와 연구가 이루어지고 있다. 비트코인의 시세 예측은 미래의 가격 동향을 예측하는 것이라서 정확한 예측은 어렵다. 따라서 시세를 예측할 때 정확한 예측보다는 데이터를 통한 통찰력과 경험적 모델링이 중요한 역할을 하게 된다.  
---

<span class = "alert g">작성자 : 양한나</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# 시계열 데이터 분석 기초
 비트코인의 시세를 예측하기 위한 다양한 시도와 연구가 이루어지고 있다. 비트코인의 시세 예측은 미래의 가격 동향을 예측하는 것이라서 정확한 예측은 어렵다. 따라서 시세를 예측할 때 정확한 예측보다는 데이터를 통한 통찰력과 경험적 모델링이 중요한 역할을 하게 된다.   


 오늘은 비트코인을 예로 들어 **시계열 데이터에 대한 접근 방법과 기술적인 해결책**을 알아보도록 하자.
--------------------------------------------

## 1.시계열 데이터란?
 시계열 데이터는 **일정한 시간을 간격으로 측정된 데이터의 집합**이다. 비트코인, 판매량, 방문 횟수 등의 데이터를 포함할 수 있다. 시계열 데이터는 시간에 따른 패턴, 추세, 주기성, 계절성 등을 분석하고 예측하는 데 사용된다.
 

 시계열 데이터는 주로 날짜와 시간을 포함하는 컬럼과 해당 시간의 데이터를 가진 컬럼으로 구성된다.


파이썬의 판다스 라이브러리는 이러한 시계열 데이터 분석을 지원하는 다양한 함수와 메서드를 포함하고 있다. 
-----------------------------------------------

## 2.문자열 데이터를 시계열 데이터로 변환하기
![사진1](/assets/img/study/analytics/hannah/사진1.png)

시계열 데이터는 다양한 형식을 보인다. 예를 들어 '2017-08-27'과 같이 날짜로 기록된 **문자열 데이터**가 있을 때, 이를 **datetime 형식**으로 변환하여야 한다. 이를 위해 **datetime.strptime**과 **pd.to_datetime** 두 가지 방법이 있다. 각 방법의 사용법과 차이점을 알아보자.

-----------------------------------

### 2.1 datetime.strptime 메서드 사용하기
```python
from datetime import datetime

df = bitcoin_df.copy() #임시 데이터프레임
df['day'].apply(lambda _ : datetime.strptime(_, "%Y-%m-%d %H:%M:%S"))
```
![사진2](/assets/img/study/analytics/hannah/사진2.png)

데이터 타입이 object에서 datetime으로 바뀐 것을 확인할 수 있다.



**datetime.strptime** 메서드를 사용하면 문자열을 datetime 형식으로 변환할 수 있다. 이 메서드를 사용하면 문자열과 형식을 인자로 받아, 변환하려는 문자열이 어떤 형태로 된 날짜/시간인지를 지정할 수 있다. **%Y-%m-%d %H:%M:%S** 형식은 "연도-월-일 시:분:초"를 의미한다. 데이터의 형태에 맞추어 날짜와 시간을 표현할 수 있다. 판다스의 to_datetime과 달리 apply를 통하여 자유로운 커스텀이 가능하다.

---------------------------------------

### 2.2  pd.to_datetime 함수 사용하기
```python
pd.to_datetime(bitcoin_df['day'])
```
![사진2](/assets/img/study/analytics/hannah/사진2.png)

데이터 타입이 object에서 datetime으로 바뀐 것을 확인할 수 있다.


**pd.to_datetime** 함수는 Pandas의 메서드로, DataFrame의 컬럼을 datetime 형식으로 변환시킨다. 단, 형식이 정해져 있음을 염두에 두고 상황에 따라 datetime.strptime과 pd.to_datetime을 적절히 사용할 수 있다.

------------------------------------

## 3. 데이터의 주기(Cycle)와 추세(Trend)
시계열 데이터 분석에서는 주기와 추세를 파악하여 데이터의 패턴을 이해하고 미래의 동향을 예측하는 것이 중요하다. 데이터의 **주기**와 **추세**를 잘 이해하면 데이터의 특성을 파악하여 효과적인 예측을 실현할 수 있다.


-----------------------------------------

### 3.1 데이터의 주기(Cycle)
**주기**는 **데이터가 반복적으로 나타나는 패턴**을 말한다. 전력 데이터를 볼 때, 매 여름마다 전기 사용량이 증가하는 것을 예로 들 수 있다. 오늘 보는 비트코인 데이터의 추이로 주기성을 파악해보자.
```python
bitcoin_df.plot()
plt.show()
```
![사진3](/assets/img/study/analytics/hannah/사진3.png)


위 표를 봤을 때, 9월의 시세가 가장 낮고 12월과 1월의 시세가 높다는 사실 정도만 파악 가능하다.. 


데이터의 주기가 파악되지 않는 이유로는 불규칙성, 짧은 시간 범위 이외에도 다양한 영향요인이 있을 수 있다. 따라서 분석시 사전적으로 데이터의 특성을 이해하는 것도 중요하지 싶다.

------------------------------------

### 3.2 데이터의 추세(Trend)(feat.차분)

추세란 데이터가 일정한 기울기로 증가하거나 감소하는 것을 의미한다. 추세는 장기적인 변화를 나타내며, 데이터의 전반적인 흐름을 파악하는 데 필요하다. 


또한 이후 예측에 사용할 ARIMA에 trend라는 옵션이 있기 때문에 데이터에 추세가 반영되어있는지 우선적으로 확인하도록 하자.


```python
data = bitcoin_df
values = data['price']

diff_val = values.diff().dropna()
diff_val2 = diff_val.diff().dropna()
diff_val3 = diff_val2.diff().dropna()
diff_val4 = diff_val3.diff().dropna()

plt.figure(figsize=(15,15))

plt.subplot(5, 1, 1)
plt.plot(values, label = 'Original')
plt.title("Original Time Data")
plt.legend()

plt.subplot(5, 1, 2)
plt.plot(diff_val, label = '1st diff data')
plt.title('1st Difference Time Series Data')
plt.legend()

plt.subplot(5, 1, 3)
plt.plot(diff_val2, label = '2nd diff data')
plt.title('2nd Difference Time Series Data')
plt.legend()

plt.subplot(5, 1, 4)
plt.plot(diff_val3, label = '3rd diff data')
plt.title('3rd Difference Time Series Data')
plt.legend()

plt.subplot(5, 1, 5)
plt.plot(diff_val4, label = '4th diff data')
plt.title('4st Difference Time Series Data')
plt.legend()

plt.tight_layout() 
plt.show()
```
![사진4](/assets/img/study/analytics/hannah/사진4.png)



위 코드는 비트코인 데이터의 차분을 시각화하는 코드이다. 첫번째 그래프 Origina Data는 원본 데이터를 나타낸다. 이 데이터에서 보이는 **추세**는 **상승,하락**이다. 이러한 경우 **반전점**-상승에서 하락으로 전환되는 지점-에 주목해야 한다.



두번째 그래프부터는 데이터의 차분을 나타낸다. **차분**은 **한 시점의 값과 이전 시점의 값을 뺀 것**으로, 데이터의 변화량을 분석하는 데 사용된다. 왜 차분을 할까? 일단 차분을 통해 **추세를 제거**하여 **정상성을 확보**하는 것이 시계열 데이터 분석에서 중요한 단계라는 것만 알아두자. 자세한 내용은 ARIMA를 설명할 때 같이 알아보기로 하자.



--------------------------------------------------

# 파이썬 라이브러리를 활용한 시세 예측

------------------------------------

## 1.시계열 데이터의 정상성

데이터를 예측하기에 앞서, 시계열 데이터는 기본적으로 정상성(Stationary)를 만족해야 한다.
 

**정상성이란?**
 

ⅰ. 평균이 일정하다.
ⅱ. 분산이 시점에 의존하지 않는다. 
ⅲ. 공분산은 시차에 의존하고, 시점 자체에는 의존하지 않는다. 

이 3가지 조건 중 하나라도 만족하지 않으면 **비정상 시계열**이라고 부른다.
비정상성을 확인하기 위해선 위 3가지와 함께 **Outlier**(이상치), **Intervention**(외부 개입)을 판단하고, 추세의 유무를 관찰하여야 한다. 

--------------------------------

## 2.평균 & 분산 관찰하기
시계열 데이터에서 추세가 보일 땐 아래와 같은 문제가 있고 이는 시계열 가공을 통하여 해결할 수 있다. 
**추세가 보이는 경우** 

ⅰ. 평균이 일정하지 않은 경우 -> 차분을 적용해서 비정상 시계열을 가공한다. 
ⅱ. 분산이 일정하지 않은 경우 -> Transformation을 적용해서 비정상 시계열을 가공한다. 

그러면 평균과 분산이 일정하지 않음을 어떻게 알 수 있을까? **Rolling Plots**을 통해 이동 평균과 이동 분산을 계산할 수 있다.

--------------------------------------------------------

### 2.1 Rolling Plots으로 이동 평균 & 이동 분산 관찰하기

```python
window = 30  # 이동 평균과 이동 분산을 계산할 윈도우 크기
bitcoin_df['RollingMean'] = bitcoin_df['price'].rolling(window=window).mean()
bitcoin_df['RollingVariance'] = bitcoin_df['price'].rolling(window=window).var()
#데이터프레임에 이동 평균과 이동 분산 컬럼을 추가

# 시각화
plt.figure(figsize=(10, 6))
plt.plot(bitcoin_df['price'], label='Price')
plt.plot(bitcoin_df['RollingMean'], label=f'Rolling Mean ({window} days)')
plt.plot(bitcoin_df['RollingVariance'], label=f'Rolling Variance ({window} days)')
plt.xlabel('Date')
plt.ylabel('Value')
plt.title('Rolling Plots')
plt.legend()
plt.show()
```
![사진5](/assets/img/study/analytics/hannah/사진5.png) 

위 그래프를 보면, 평균은 일정함과 달리 분산이 요동치는 걸 확인할 수 있다. 이를 근거로 해당 시계열 데이터가 비정상 데이터라는 사실을 입증하였다. 앞서 말했다시피, **분산이 일정하지 않은 경우** Transformation을 적용해서 비정상 시계열을 가공할 수 있다.  Transformation에는 변동성 클러스터링, 변동성 조절, 로그 변환, 이동평균 변환 등의 방식이 있다. 이러한 방법 중에서 가장 일반적인 **로그 변환**을 적용해보자.
```python
# 로그 변환 적용
replace_value = 1 
# 0 또는 음수 값이 있는 경우를 대비하여 이를 replace() 함수를 사용하여 1로 대체. (로그 변환은 0 또는 음수 불가능)
df['log_price'] = np.log(df['price'].replace({0: replace_value, -1: replace_value}))
# 'day' 컬럼을 날짜 형식으로 변환
df['day'] = pd.to_datetime(df['day'])

window = 30  # 이동 평균과 이동 분산을 계산할 윈도우 크기
df['RollingMean'] = df['log_price'].rolling(window=window).mean()
df['RollingVariance'] = df['log_price'].rolling(window=window).var()

# 시각화
plt.figure(figsize=(10, 6))
plt.plot(df['price'], label='Price')
plt.plot(df['RollingMean'], label=f'Rolling Mean ({window} days)', linestyle='--')
plt.plot(df['RollingVariance'], label=f'Rolling Variance ({window} days)', linestyle=':')
plt.xlabel('Date')
plt.ylabel('Value')
plt.title('Rolling Plots')
plt.legend()
plt.show()

```
![사진6](/assets/img/study/analytics/hannah/사진6.png)
평균과 분산이 일정한 모습을 볼 수 있다. 이제 데이터가 정상성을 갖는다고 볼 수 있다!! 

----------------------------------------------

## 3.ARIMA(Autoregressive Integrated Moving Average)


ARIMA는 시계열 데이터의 패턴과 특성을 이해하고 예측하는 데 사용되는 통계 모델이다.

------------------------------

### 3.1 ARIMA 모델의 구성 요소**

ⅰ.자동회귀(AR, Autoregressive): 현재 값이 이전 값들의 선형 조합으로 설명될 수 있는 모델. 현재 시점의 데이터가 이전 시점들의 영향을 받는 것을 나타낸다. 

ⅱ.누적이동평균(MA, Moving Average):
 현재 값이 이전 시점들의 이동 평균으로 설명될 수 있는 모델. 현 시점의 자료를 유한개의 백색잡음의 선형결합으로 표현함. 

ⅲ.차분(Difference, I, Integrated):
시계열 데이터의 추세를 제거하여 정상성을 확보하기 위해 데이터 간의 차이를 계산하는 과정.

------------------------------

### 3.2 자기회귀 누적이동평균모형 (ARIMA)
대부분의 시계열 데이터는 이 형태를 따르며, ARIMA 모형은 기본적으로 비정상 시계열 모형이기 때문에 차분 또는 변환을 통하여  AR/MA/ARMA 모형으로 정상화 할 수 있다.

ARIMA 모델은 (p, d, q)라는 세 가지 파라미터를 사용한다. 

ⅰ.p (자동회귀 차수, Autoregressive Order)
자동회귀(AR) 모델의 차수를 나타낸다. 예를 들어, p=2라면 현재 값은 2개의 이전 시점 데이터의 가중치를 가지고 결정된다는 의미를 가진다.

ⅱ.d (차분 차수, Difference Order)
 d는 몇 차분을 적용할지를 결정한다. 예를 들어, d=1이면 현재 값과 이전 값의 차이를 사용하여 데이터를 변환한다.

ⅲ.q (이동평균 차수, Moving Average Order)
이동평균(MA) 모델의 차수를 나타낸다. 예를 들어, q=2이면 현재 깂은 이전 시점의 두 개의 이동평균 데이터로 설명될 수 있다는 의미를 가진다.

----------------------------------

### 3.3 ARIMA 모델 학습
```python
from statsmodels.tsa.arima.model import ARIMA
import statsmodels.api as sm

# (AR=2, 차분=0, MA=2) 파라미터로 ARIMA 모델을 학습합니다.
model = ARIMA(bitcoin_df['price'].values, order=(2, 0, 2), trend="ct") # # trend="ct"는 상수와 선형 추세를 모두 고려하겠다는 의미. trend의 기본값은 c
model_fit = model.fit()
print(model_fit.summary())
```
![사진7](/assets/img/study/analytics/hannah/사진7.png)
```python
import matplotlib.pyplot as plt

# 학습 데이터에 대한 예측 결과 시각화
fig, ax = plt.subplots(figsize=(12, 6)) # 액자 사이즈 지정
predictions = model_fit.predict(start=0, end=len(bitcoin_df)-1) # start와 end는 예측 시작 시점, 끝 시점
ax.plot(bitcoin_df.index, predictions, label='forecast') # 예측 데이터
ax.plot(bitcoin_df.index, bitcoin_df.price.values, label='y') # 실제 데이터
ax.legend()
plt.show()
```
![사진8](/assets/img/study/analytics/hannah/사진8.png)
만약 예측이 실제 데이터와 매우 비슷하다면, 두 선은 서로 가깝게 나타날 것이다. 그러나 모델의 오차가 크다면, 두 선 사이에 차이가 보일 것이다. 이 차이를 **잔차**라고 한다. 잔차가 작으면 모델의 예측이 더 정확하다는 의미이고, 잔차가 크면 모델의 예측이 덜 정확하다는 의미일 수 있다. 이 코드에서는 잔차를 직접적으로 표시하지는 않는다. 잔차를 시각화해보고 잔차의 변동을 해석해보자.

---------------------------------------------

### 3.4 잔차의 변동 해석
```python
#잔차의 변동 시각화
residuals = pd.DataFrame(model_fit.resid) 
residuals.plot()
```
![사진9](/assets/img/study/analytics/hannah/사진9.png)
**잔차**는 실제 데이터와 모델로 예측한 값 사이의 차이를 나타낸다. 잔차를 5가지 기준으로 평가하여 모델의 적합성을 판단할 수 있다.

1. 잔차의 평균 :잔차의 평균이 0에 가까울수록 모델이 데이터를 잘 설명하고 있다는 뜻이다. 
2. 잔차의 분포 : 만약 잔차의 분포가 정규 분포를 벗어난다면, 적합하지 않다는 뜻이다.
3. 잔차의 자기상관 : 시계열 데이터 자기상관이 있는 경우 패턴을 제대로 파악하지 못한 것일 수 있다.
4. 잔차의 클러스터링 : 모델이 데이터의 특정 부분에 대해 예측이 부정확하거나 오차가 크다는 것을 확인할 수 있다.
5. 잔차의 이상치 : 잔차 중에서 크게 벗어난 값이 있다면 적합하지 않다는 뜻이다.
**다만 잔차 변동 외에대 다른 지표가 많기 때문에 맹신하진 말자!**

------------------------------------------------------------

### 3.5 실제 데이터와의 비교(feat. 신뢰구간)
**신뢰구간**은 통계적인 예측에서 매우 중요한 개념으로, **"추정값 ± 오차범위"**로 표현가능하다. 배달 어플으로 음식을 주문했다고 생각해보자. 만약 배달 예상 시간이 20~30분이라면 그 값은 업자의 경험상 수치일 것이다. 이때, 23분이나 25분과 같은 정확한 시간이 아닌 범위를 제시한 까닭이 무엇일까? 배달 예상 시간이 불확실하기 떄문이다. 신뢰 구간은 이러한 통계적 예측의 불확실성을 내포하는 도구이다. 아래 코드는 지금껏 본문에서 다룬 비트코인 데이터로 5일후 가격을 예측하고, 신뢰구간과 비교하는 코드이다.
```python
forecast_data = model_fit.forecast(steps=5)  # 학습 데이터셋으로부터 5일 뒤를 예측

test_file_path = 'https://raw.githubusercontent.com/yoonkt200/python-data-analysis/master/data/market-price-test.csv'
bitcoin_test_df = pd.read_csv(test_file_path, names=['ds', 'y'])

pred_y = forecast_data  # 5일간 예측 데이터. (2018-08-27 ~ 2018-08-31)
test_y = bitcoin_test_df.y.values  # 실제 5일간 가격 데이터 (2018-08-27 ~ 2018-08-31)

# 예측의 신뢰 구간을 계산합니다.
forecast_errors = bitcoin_test_df.y - pred_y
forecast_interval = 1.96 * forecast_errors.std()

pred_y_lower = pred_y - forecast_interval  # 5일간 예측 데이터의 최소값
pred_y_upper = pred_y + forecast_interval  # 5일간 예측 데이터의 최대값

```

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))

plt.plot(pred_y, color="gold", label="Predicted Price") # 모델이 예상한 시세 그래프
plt.plot(pred_y_lower, color="red", label="Predicted Lower Bound") # 모델이 예상한 최소 시세 그래프
plt.plot(pred_y_upper, color="blue", label="Predicted Upper Bound") # 모델이 예상한 최대 시세 그래프
plt.plot(test_y, color="green", label="Actual Price") # 실제 가격 그래프

plt.legend()
plt.title("Bitcoin Price Prediction with Confidence Interval")
plt.xlabel("Days")
plt.ylabel("Price")
plt.show()
```
![사진10](/assets/img/study/analytics/hannah/사진10.png)  
실제 데이터가 모델 예측 시세에서도, 신뢰구간에서도 많이 벗어나는 모습을 확인할 수 있다.(OTL) 그러나 긍정적으로 보면 얼추 상승 추세를 예측하고 있다는 것은 모델이 대체적인 동향을 파악하는 능력을 갖추고 있음을 보여준다..! 실제 시세에는 다양한 요인이 개입하기 때문에, 모델의 예측을 적대적으로 받아들이기보단, 모델과 함께 다양한 요인을 염두에 두고 고려하는 것이 좋을 것 같다.  
