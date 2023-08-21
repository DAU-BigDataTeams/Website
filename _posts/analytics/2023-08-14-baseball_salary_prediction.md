---  
title : 프로야구 선수의 다음 해 연봉 예측
layout: post  
categories : [Analytics]
image : /assets/img/study/analytics/ch3.1 야구선수 연봉 예측결과.png
description: 야구 선수 연봉 예측 결과 이미지
customexcerpt: 회귀분석을 통해 프로야구 선수들의 다음 해 연봉을 예측해보자!
---

<span class = "alert g">작성자 : 송시무</span>

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

## 회귀분석과 지도학습
예제에 앞서 용어 2가지를 먼저 보고 가자.

**1. 회귀 분석**   
독립변수(X)와 종속변수(Y) 간의 관계를 찾는 것.  
ex) 일차방정식(Y = wX + b)

![회귀분석](/assets/img/study/analytics/회귀분석과일차방정식.png)  
(출처 : 이것이 데이터분석이다 with 파이썬, p139)

위 그래프에서 회귀 분석이란 실제 데이터인 빨간 점들과 거리(오차)가 최소가 되는 선(방정식)을 찾아내는 것.  

즉, 방정식에서 X가 사전에 주어지는 데이터라고 했을 때, w(가중치), b(편향) 두 값을 최적으로 찾는 것이라고 할 수 있다. 

이 회귀분석으로 예측한 결과의 정확성을 평가하는 방법 2가지를 간략하게 살펴보면   
- MAE(Mean Absolute Error) : 평균 절대 오차
- MSE(Mean Squared Error) : 평균 제곱 오차  

이렇게 두 가지가 있는데 둘 중에 MSE가 추정한 값에 대한 정확도를 측정하는 쉬운 방법이기 때문에 자주 쓰인다고 한다.  


**2. 지도학습과 비지도학습**  
머신러닝은 ‘학습’을 통해 특정한 업무를 실행하는 인공지능(AI)을 의미한다.
이 때 학습을 하는 방식을 답의 유무를 기준으로 분류하면 2가지로 분류된다.
- 지도 학습 : 답이 있는 학습
- 비지도 학습 : 답이 없는 학습  

지도학습은 수험생에 비유해서 생각하면 받아들이기 수월하다. 모의고사 답지와 해설지로 공부한 뒤, 이를 수능으로 평가하는 학습 방식이 지도학습과 유사하다. 여기서 정답지와 해설지를 학습 데이터 셋, 수능 문제를 테스트 데이터 셋으로 받아들일 수 있겠다.

이제 바로 예제를 살펴보자!

## 1. 탐색 : 연봉 데이터 살펴보기
먼저 프로야구 연봉 데이터 셋을 확인하자.

**데이터 준비**  
라이브러리를 가져오고, 데이터를 불러온다.

~~~py
%matplotlib inline

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Data Source : http://www.statiz.co.kr/
picher_file_path = 'https://raw.githubusercontent.com/yoonkt200/python-data-analysis/master/data/picher_stats_2017.csv'
batter_file_path = 'https://raw.githubusercontent.com/yoonkt200/python-data-analysis/master/data/batter_stats_2017.csv'
picher = pd.read_csv(picher_file_path)
batter = pd.read_csv(batter_file_path)
~~~

**데이터 확인**  
데이터 셋의 컬럼은 어떤 것들이 있는지 확인한다.
~~~py
picher.columns
~~~
<pre>
Index(['선수명', '팀명', '승', '패', '세', '홀드', '블론', '경기', '선발', '이닝', '삼진/9', '볼넷/9', '홈런/9', 'BABIP', 'LOB%', 'ERA', 'RA9-WAR', 'FIP', 'kFIP', 'WAR', '연봉(2018)', '연봉(2017)'], dtype='object')
</pre>  

대략적인 데이터 셋 구성 확인
~~~py
picher.head()
~~~
<pre>

선수명	팀명	승	패	세	홀드	블론	경기	선발	이닝	...	홈런/9	BABIP	LOB%	ERA	RA9-WAR	FIP	kFIP	WAR	연봉(2018)	연봉(2017)
0	켈리	SK	16	7	0	0	0	30	30	190.0	...	0.76	0.342	73.7	3.60	6.91	3.69	3.44	6.62	140000	85000
1	소사	LG	11	11	1	0	0	30	29	185.1	...	0.53	0.319	67.1	3.88	6.80	3.52	3.41	6.08	120000	50000
2	양현종	KIA	20	6	0	0	0	31	31	193.1	...	0.79	0.332	72.1	3.44	6.54	3.94	3.82	5.64	230000	150000
3	차우찬	LG	10	7	0	0	0	28	28	175.2	...	1.02	0.298	75.0	3.43	6.11	4.20	4.03	4.63	100000	100000
4	레일리	롯데	13	7	0	0	0	30	30	187.1	...	0.91	0.323	74.1	3.80	6.13	4.36	4.31	4.38	111000	85000
5 rows × 22 columns
</pre>

데이터셋 크기 확인
~~~py
print(picher.shape)
~~~
<pre>
(152, 22)
</pre>

이제 예측할 대상인 '연봉' 컬럼에 대해 살펴보자
~~~py
picher['연봉(2018)'].describe()
~~~
<pre>
count       152.000000
mean      18932.236842
std       30940.732924
min        2700.000000
25%        4000.000000
50%        7550.000000
75%       18500.000000
max      230000.000000
Name: 연봉(2018), dtype: float64
</pre>

~~~py
picher['연봉(2018)'].hist(bins=100) # 2018년 연봉 분포를 출력합니다.
~~~
![연봉 분포 그래프](/assets/img/study/analytics/연봉분포그래프.png)  
연봉 분포도를 확인한 결과 대부분의 선수들의 연봉이 2억 5천만원 이하에 몰려있는 것을 확인할 수 있다. 이를 통해 대략적으로 5억 이상의 연봉 데이터는 이상치로 예상해 볼 수 있다.  
추가로 만약 데이터의 분포 형태가 정규 분포가 아니라면, [Box-Cox 변환](https://zephyrus1111.tistory.com/190)과 같은 방법으로 정규분포 꼴로 전처리해주어야 한다.

~~~py
picher.boxplot(column=['연봉(2018)']) # 연봉의 Boxplot을 출력합니다.
~~~
![연봉 Boxplot](/assets/img/study/analytics/연봉Boxplot.png)

* boxplot 해석  
![boxplot](/assets/img/study/analytics/Boxplot.png)  
    - 울타리 바깥의 값은 이상치(Outlier)에 해당된다.
    - Q1, Q3 : 각각 25%, 75%에 해당된다.


**회귀 분석에 사용할 피쳐 확인**  
이제 실질적으로 연봉 예측에 필요한 피쳐만을 뽑아보자. 
~~~py
picher_features_df = picher[['승', '패', '세', '홀드', '블론', '경기', '선발', '이닝', '삼진/9', '볼넷/9', '홈런/9', 'BABIP', 'LOB%', 'ERA', 'RA9-WAR', 'FIP', 'kFIP', 'WAR', '연봉(2018)', '연봉(2017)']]
~~~

~~~py
# 피처 각각에 대한 histogram을 출력합니다.
def plot_hist_each_column(df):
    plt.rcParams['figure.figsize'] = [20, 16] # 객체 사이즈 설정
    fig = plt.figure(1)

    # df의 column 갯수 만큼의 subplot을 출력합니다.
    for i in range(len(df.columns)):
        ax = fig.add_subplot(5, 5, i+1)
        plt.hist(df[df.columns[i]], bins=50) # bins 옵션은 구간을 의미
        ax.set_title(df.columns[i])
    plt.show()

plot_hist_each_column(picher_features_df)
~~~
![회귀 분석용 피쳐](/assets/img/study/analytics/회귀분석용피쳐.png)
이 구간에서 중요하게 확인해야 하는 부분은 다음과 같다.  
**1. 해당 컬럼이 정규 분포를 따르는지**  
**2. 요소들의 단위는 어떻게 되는지(다르다면 정규화가 필요하다)**


## 2. 예측 : 투수 연봉 예측
이제 본격적으로 예측에 들어가보자. 본 예제는 앞서 확인한 컬럼 값들이 정규분포를 따른다고 가정하고, 요소들의 단위를 맞춰주는 정규화(피쳐 스케일링) 작업을 진행한다.  

다음 코드는 정규화 방법 중에 표준화 방법(z-score normalization)을 사용한다(또 다른 정규화 방법인 min-max 정규화는 이상치에 약하기 때문).
> 표준화 공식 = (X) - (X의 평균) / X의 표준편차

~~~py
# pandas 형태로 정의된 데이터를 출력할 때, scientific-notation이 아닌 float 모양으로 출력되게 해줍니다.
pd.options.mode.chained_assignment = None

# 피처 각각에 대한 scaling을 수행하는 함수를 정의합니다.
def standard_scaling(df, scale_columns):
    for col in scale_columns:
        series_mean = df[col].mean()
        series_std = df[col].std()
        df[col] = df[col].apply(lambda x: (x-series_mean)/series_std)
    return df

# 피처 각각에 대한 scaling을 수행합니다.
scale_columns = ['승', '패', '세', '홀드', '블론', '경기', '선발', '이닝', '삼진/9',
       '볼넷/9', '홈런/9', 'BABIP', 'LOB%', 'ERA', 'RA9-WAR', 'FIP', 'kFIP', 'WAR', '연봉(2017)']
picher_df = standard_scaling(picher, scale_columns)

picher_df = picher_df.rename(columns={'연봉(2018)': 'y'})
picher_df.head(5)
~~~   
표준 정규화 결과는 아래와 같다.
<pre>

선수명	팀명	승	패	세	홀드	블론	경기	선발	이닝	...	홈런/9	BABIP	LOB%	ERA	RA9-WAR	FIP	kFIP	WAR	y	연봉(2017)
0	켈리	SK	3.313623	1.227145	-0.306452	-0.585705	-0.543592	0.059433	2.452068	2.645175	...	-0.442382	0.016783	0.446615	-0.587056	3.174630	-0.971030	-1.058125	4.503142	140000	2.734705
1	소사	LG	2.019505	2.504721	-0.098502	-0.585705	-0.543592	0.059433	2.349505	2.547755	...	-0.668521	-0.241686	-0.122764	-0.519855	3.114968	-1.061888	-1.073265	4.094734	120000	1.337303
2	양현종	KIA	4.348918	0.907751	-0.306452	-0.585705	-0.543592	0.111056	2.554632	2.706808	...	-0.412886	-0.095595	0.308584	-0.625456	2.973948	-0.837415	-0.866361	3.761956	230000	5.329881
3	차우찬	LG	1.760682	1.227145	-0.306452	-0.585705	-0.543592	-0.043811	2.246942	2.350927	...	-0.186746	-0.477680	0.558765	-0.627856	2.740722	-0.698455	-0.760385	2.998081	100000	3.333592
4	레일리	롯데	2.537153	1.227145	-0.306452	-0.585705	-0.543592	0.059433	2.452068	2.587518	...	-0.294900	-0.196735	0.481122	-0.539055	2.751570	-0.612941	-0.619085	2.809003	111000	2.734705
5 rows × 22 columns
</pre>

지금까지 연속형 데이터를 정규화 해보았다.  
그럼 연속형이 아닌 범주형 피쳐들은 어떻게 정규화 할까?  
본 예제에서는 범주형 피쳐를 정규화하는 대표적인 방법인 [원-핫 인코딩](https://needjarvis.tistory.com/565)을 이용한다.  

> 원-핫 인코딩이란 컴퓨터가 자연어를 이해할 수 있게 숫자로 바꿔주는 작업이다. 단어 집합의 크기를 벡터의 차원으로 하고, 표현하고 싶은 단어의 인덱스에 1의 값을 부여하고, 그 외 다른 인덱스에는 0을 부여해서 단어를 표현한다.  
![one-hot-encoding](/assets/img/study/analytics/one-hot-encoding.png)  
(출처 : https://library-of-k.tistory.com/17)


pandas에서는 get_dummies() 함수로 간단하게 원-핫 인코딩 적용이 가능하다.
~~~py
# 팀명 피처를 one-hot encoding으로 변환합니다.
team_encoding = pd.get_dummies(picher_df['팀명'])
picher_df = picher_df.drop('팀명', axis=1)
picher_df = picher_df.join(team_encoding)

team_encoding.head(5)
~~~
<pre>

        KIA	KT	LG	NC	SK	두산	롯데	삼성	한화
0	False	False	False	False	True	False	False	False	False
1	False	False	True	False	False	False	False	False	False
2	True	False	False	False	False	False	False	False	False
3	False	False	True	False	False	False	False	False	False
4	False	False	False	False	False	False	True	False	False
</pre>  


**회귀 분석을 위한 데이터셋 분리**  

앞서 범주형 데이터까지 정규화를 진행하였다.  

이제 학습 데이터와 평가 데이터를 분리만 끝나면 회귀 분석 모델 학습을 위한 준비가 끝난다.  

단순하게 학습데이터와 평가데이터를 7:3 비율로 구분하면 학습 효율이 떨어지므로 파이썬 sklearn 모듈의 train_test_split() 함수를 이용하여 투수 데이터 셋을 학습용과 평가용으로 구분한다.

~~~py
from sklearn import linear_model
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from math import sqrt

# 학습 데이터와 테스트 데이터로 분리합니다.
X = picher_df[picher_df.columns.difference(['선수명', 'y'])] #.difference() 함수는 문제집에서 답지를 빼는 행위와 같음
y = picher_df['y']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=19) # 학습용 데이터셋 = 0.8
~~~
  
**회귀분석 수행**

~~~py
# 회귀 분석 계수를 학습합니다 (회귀 모델 학습)
lr = linear_model.LinearRegression() # 객체 생성(선형 회귀 모델 생성)
model = lr.fit(X_train, y_train) # fit() : 회귀 모델 학습 진행

# 학습된 계수를 출력합니다.
print(lr.coef_)
~~~

학습된 계수(모델 상태, model parameter)는 다음과 같다. 
<pre>
[ -1481.01733901   -416.68736601 -94136.23649209  -1560.86205158
   1572.00472193   -747.04952389  -1375.53830289   -523.54687556
   3959.10653661    898.37638984  10272.48746451  77672.53804469
  -2434.38947427   -892.11801281    449.91117164   7612.15661812
   1271.04500059  -2810.55645139   5396.97279896  -4797.30275904
   -250.69773139    236.02530053  19130.59021357    854.02604585
   1301.61974637   3613.84063182   -935.07281796  18144.60099745]
</pre>


## 3. 평가 : 예측 모델 평가
본 예제에서는 학습된 모델의 평가방법으로 2가지 방법을 제시한다.

**1. (statsmodel 라이브러리) OLS 클래스의 summary() 함수**  
이 방법을 사용하기 위해서는 statsmodel 라이브러리로 다시 한 번 모델을 학습시켜야 하는 번거로움이 있다.

~~~py
!pip install statsmodels

import statsmodels.api as sm

# statsmodel 라이브러리로 회귀 분석을 수행합니다.
X_train = sm.add_constant(X_train)
model = sm.OLS(y_train, X_train).fit()
model.summary()
~~~
![statsmodel](/assets/img/study/analytics/statsmodel.png)

위의 실행 결과의 우측 상단에 있는 **R-squared(결정 계수)** 와 **Adj. R-squared(수정 결정 계수)** 두 가지의 점수가 곧 회귀 분석 정확도를 평가하는 지표가 된다. 이 점수가 1에 가까울수록 데이터를 잘 설명하는 모델이라 할 수 있다.

다음으로 **F 통계량(F-statistic)** 을 살펴보자. 이 수치는 F 통계량의 p-value인 **Prob(F-statistic)** 수치와 함께 봐야 한다. 일반적으로 [p-value](https://ko.wikipedia.org/wiki/%EC%9C%A0%EC%9D%98_%ED%99%95%EB%A5%A0)가 0.05 이하면 통계량이 유의미한 의미를 가진다고 보고, 이는 회귀 분석이 유의미한 결과를 가진다는 것을 의미한다.

또한 표의 **P>|t|** 컬럼 값은 각 피처의 검정 통계량(t-statistics)이 얼마나 유의미한지에 대한 p-value 값이다. 

**유의미한 피쳐 판별**
~~~py
# 한글 출력을 위한 사전 설정 단계입니다.
plt.rc('font', family='NanumGothic')
plt.rcParams['figure.figsize'] = [20, 16]

# 회귀 계수를 리스트로 반환합니다.
coefs = model.params.tolist()
coefs_series = pd.Series(coefs)

# 변수명을 리스트로 반환합니다.
x_labels = model.params.index.tolist()

# 회귀 계수를 출력합니다.
ax = coefs_series.plot(kind='bar')
ax.set_title('feature_coef_graph')
ax.set_xlabel('x_features')
ax.set_ylabel('coef')
ax.set_xticklabels(x_labels)
~~~
![피쳐영향력](/assets/img/study/analytics/피쳐영향력.png)

시각화 결과 FIP, WAR, 홈런, 작년 연봉 피처가 가장 영향력이 큰 것을 확인할 수 있다.

**2. sklean의 LinearRegression 클래스**  
두번째 방법으로 수정 결정 계수(R2 score = R-squared)를 sklean의 LinearRegression 클래스로 출력해보자.

~~~py
# 학습 데이터와 테스트 데이터로 분리합니다.
X = picher_df[picher_df.columns.difference(['선수명', 'y'])]
y = picher_df['y']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=19)

# 회귀 분석 모델을 학습합니다.
lr = linear_model.LinearRegression()
model = lr.fit(X_train, y_train)

# 회귀 분석 모델을 평가합니다.
print(model.score(X_train, y_train)) # train R2 score를 출력(비유하면 모의고사 점수)
print(model.score(X_test, y_test)) # test R2 score를 출력(수능 점수)
~~~
<pre>
0.9276949405576705 
0.8860171644977817
</pre>

해석하면 학습 시에는 결과가 좋았으나 실제 테스트에서 점수가 낮게 나온 것으로 보아 과적합(overfit)이 발생한 것을 알 수 있다. 즉, 훈련 데이터에 너무 적응되었다.   

과적합 발생 여부는 그래프를 그려보아야 정확히 알 수 있지만 앞자리 수가 다르면 대부분 과적합인 경우가 많다고 한다.  

**피처들의 상관관계 분석**
~~~py
import seaborn as sns

# 피처간의 상관계수 행렬을 계산합니다.
corr = picher_df[scale_columns].corr(method='pearson')
show_cols = ['win', 'lose', 'save', 'hold', 'blon', 'match', 'start',
             'inning', 'strike3', 'ball4', 'homerun', 'BABIP', 'LOB',
             'ERA', 'RA9-WAR', 'FIP', 'kFIP', 'WAR', '2017']

# corr 행렬 히트맵을 시각화합니다.
plt.rc('font', family='NanumGothicOTF')
sns.set(font_scale=1.5)
hm = sns.heatmap(corr.values,
            cbar=True,
            annot=True,
            square=True,
            fmt='.2f',
            annot_kws={'size': 15},
            yticklabels=show_cols,
            xticklabels=show_cols)

plt.tight_layout()
plt.show()
~~~
![heatmap](/assets/img/study/analytics/heatmap.png)
히트맵에서 두 피처의 상관도가 1에 가까운 승-이닝, kFIP-FIP, RA9_WAR-WAR 등의 쌍이 연관성이 높다는 것을 확인할 수 있다.  

'이것이 데이터분석이다' 책에서는 회귀분석이 피처 간의 독립성을 전제로 하는 것을 이유로 올바른 분석을 위해서는 연관성이 높은 피처 쌍을 제거해야 한다고 이야기 하면 **다중공선성**에 대해서 이야기 한다.

다중공선성이란 변수 간 상관관계가 높아 분석에 부정적인 영향을 미치는 것을 의미한다.  

이 때 다중공선성 문제를 해결하기 위해 주로 [주성분 분석(PCA)](https://ko.wikipedia.org/wiki/%EC%A3%BC%EC%84%B1%EB%B6%84_%EB%B6%84%EC%84%9D)가 이용된다고 한다. 이번 예제에서는 PCA에 대해서는 다루지 않았고 PCA를 실시했다고 가정하여 이후 과정을 진행하였다.

## 4. 시각화 : 분석 결과 시각화
**예측 연봉과 실제 연봉 비교**  
~~~py
# 2018년 연봉을 예측하여 데이터프레임의 column으로 생성합니다.
X = picher_df[['FIP', 'WAR', '볼넷/9', '삼진/9', '연봉(2017)']] # 주성분 분석(PCA)을 통해 선별한 피처라고 가정
predict_2018_salary = lr.predict(X)
picher_df['예측연봉(2018)'] = pd.Series(predict_2018_salary)

# 원래의 데이터 프레임을 다시 로드합니다.
picher = pd.read_csv(picher_file_path)
picher = picher[['선수명', '연봉(2017)']]

# 원래의 데이터 프레임에 2018년 연봉 정보를 합칩니다.
result_df = picher_df.sort_values(by=['y'], ascending=False)
result_df.drop(['연봉(2017)'], axis=1, inplace=True, errors='ignore')
result_df = result_df.merge(picher, on=['선수명'], how='left')
result_df = result_df[['선수명', 'y', '예측연봉(2018)', '연봉(2017)']]
result_df.columns = ['선수명', '실제연봉(2018)', '예측연봉(2018)', '작년연봉(2017)']

# 재계약하여 연봉이 변화한 선수만을 대상으로 관찰합니다.
result_df = result_df[result_df['작년연봉(2017)'] != result_df['실제연봉(2018)']]
result_df = result_df.reset_index()
result_df = result_df.iloc[:10, :]
result_df.head(10)
~~~
<pre>

index   선수명	실제연봉(2018)	예측연봉(2018) 작년연봉(2017)
0	양현종	230000	163930.148696	150000
1	켈리	140000	120122.822204	85000
2	소사	120000	88127.019455	50000
3	레일리	111000	102253.697589	85000
4	피어밴드	85000	58975.725734	35000
5	배영수	50000	56873.662417	55000
6	안영명	35000	22420.790838	20000
7	채병용	30000	21178.955105	25000
8	류제국	29000	45122.360087	35000
9	박정진	25000	29060.748299	33000
</pre>

~~~py
# 선수별 연봉 정보(작년 연봉, 예측 연봉, 실제 연봉)를 bar 그래프로 출력합니다.
plt.rc('font', family='NanumBarunGothic')
result_df.plot(x='선수명', y=['작년연봉(2017)', '예측연봉(2018)', '실제연봉(2018)'], kind="bar")
~~~
![분석결과](/assets/img/study/analytics/분석결과.png)

그래프를 보면 학습한 회귀모델이 연봉 상승과 감소 **추세**를 비교적 잘 맞추고 있음을 확인할 수 있다. 

이상으로 3.1장 야구선수 연봉 예측 포스팅을 마친다. 

## 핵심요약
1. 데이터 분포 확인
2. 피쳐 스케일링(by 정규화 / 원 핫 인코딩)
3. 데이터 분리
4. 학습 후 지표(MSE) 확인
5. 예측