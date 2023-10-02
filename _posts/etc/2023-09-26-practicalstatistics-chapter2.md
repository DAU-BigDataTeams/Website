--- 
title: 데이터와 표준분포 이해하기
layout: post  
categories : [etc] 
image : /assets/img/study/etc/chapter2/1.jpg
description:  데이터와 표준분포
customexcerpt: 데이터와 표준분포에 대하여 알아보자!
---


<span class = "alert g">작성자 : 남윤서</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc}

---
# 데이터와 표본분포
![1](/assets/img/study/etc/chapter2/1.jpg)


왼편은 통계학에서 표본분포를 따를 거승로 추정되는 미지의 모집단 오른편은 표본데이터와 그 경험을 통해 얻은 분포 왼쪽에서 오른쪽을 얻어내는 것이 표본추출


## 2.1 임의표본추출과 표본편향
표본 :  더 큰 데이터 집합(모집단)으로부터 얻은 데이터의 부분집합


임의표본추출 : 대상이 되는 모집단 내의 선택 가능한 원소들을 무작위로 추출하는 과정


복원추출 : 추첨 후 다음번에도 중복 추출이 가능하도록 해당 샘플을 다시 모집단에 포함시키는 것


비복원 추출 : 한번 뽑힌 원소는 추첨에 사용하지 않는 것


편향 : 계통상의 오류


표본편향 : 모집단을 잘못 대표하는 표본


![2](/assets/img/study/etc/chapter2/2.jpg)


목표물 맞히는 것에서 어느쪽으로 강하게 치우치는 경향은 없음


![3](/assets/img/study/etc/chapter2/3.jpg)


편향, x방향과 y방향 모두에서 랜덤한 오차가 있음

임의선택
임의표본추출은 쉽지 않음, 접근 가능한 모집단을 적절하게 정의하는 것이 매우 중요, 고객 대표 프로필을 만들 목적으로 파일럿 고객 설문조사 실시한다고 가정, 고객이 누구인지 정의, 표본추출의 절차 정하기


층화표본추출에서는 모집단을 여러 층으로 나누고 각 층에서 무작위로 샘플을 추출


크기와 품질:크기는 언제 중요해질까? 방대한 양의 데이터가 누적될 때만 대부분의 쿼리에 대한 효과적인 검색 결과를 반한할 수 있는, 진정한 의미의 빅데이터 문제이다 더 많은 데이터가 축적될 수록 결과는 더 좋음

## 2.2 선택편향
선택편향 : 관측 데이터를 선택하는 방식 때문에 생기는 편향


데이터 스누핑 : 뭔가 흥미로우누 것을 찾아 광범위하게 데이터를 살피는 것


방대한 검색 효과 : 중복 데이터 모델링이나 너무 많은 예측변수를 고려하는 모델링에서 비롯되는 편향 혹은 비재현성


평균으로 회귀 : 주어진 어떤 변수를 연속적으로 측정했을 때 나타나는 현상


예) 신인상 수상자의 2년차 슬럼프
![5](/assets/img/study/etc/chapter2/5.jpg)


## 2.3 통계학에서의 표본분포
표본분포 : 하나의 동일한 모집단에서 얻은 여러 샘플에 대한 표본통계량의 분포


포본통계량 : 더 큰 모집단에서 추출된 표본 데이터들로부터 얻은 측정 지표


데이터 분포 : 어떤 데이터 집합에서의 각 개별 값의 도수분포


표본분포 : 여러 표본들 혹은 재표본들로부터 얻은 표본통계량의 도수분포


중심극한정리 : 표본크기가 커질수록 표본분포가 정규부포를 따르는 경향


표준오차 : 여러 표본들로부터 얻은 표본통계량의 변량

표본의 변동성 -> 우리가 많은 양의 데이터를 가지고 있다면 추가로 표본을 얻어서 통계의 분포를 관찰할 수 있음


개별데이터 포인의 분포와 표본분포라고 알려진 표본통계량의 분포를 구별하는 것이 중요


표본통계량의 분포는 종 모양


예)
렌딩 클럽에 대출을 신청한 사람들을 평가하기 위해 연간 소득 정보를 사용함 단순히 1000개의 값으로 이루어진 표본, 5개 값의 평균 1000개로 이루어진 표본, 20개 값의 평균 1000개로 이루어진 표본
![6](/assets/img/study/etc/chapter2/6.jpg)


개별 데이터 값의 히스토그램은 넓게 분산, 한쪽으로 기울어져 있음, 종모양임


중심극한정리
표본크기가 충분하고 데이터가 정규성을 크게 이탈하지 않는 경우, 여러 표본에서 추출한 평균은 종 모양의 정규곡선을 따른다


표준오차
se=s/n
표본크기가 커지면 표준오차가 줄어든다
n 제곱근의 법칙 -> 표준오차 2배로 줄이려면 표본 크기를 4배 증가시켜야한다


표준오차 측정할 떄 고려해야할 사항
1. 모집단에서 완전히 새로운 샘플을 많이 수집
2. 각각의 새 샘플에 대해 통계량을 계산
3. 2단계에서 얻은 통계량의 표준편차를 계산, 이것을 표준오차의 추정치로 사용


## 2.4 부트스트랩
현재 있는 표본에서 추가적으로 표본을 복원추출하고 각 표본에 대한 통계량과 모델을 다시 계산하는 것이다 데이터나 표본통계량이 정규분포를 따라야 한다는 가정 필요는 없음


![7](/assets/img/study/etc/chapter2/7.jpg)


부트스트랩 재표본추출 알고리즘
1. 샘플 값을 하나 뽑아서 기록하고 다시 제자리에 놓는다
2. n번 반복
3. 재표본추출된 값의 평균을 기록
4. 1~3 단계를 R번 반복
5. R개의 결과를 사용하여
 a. 표준편차를 계산
 b. 히스토그램 또는 상자그림을 그린다
 c. 신뢰구간을 찾는다


R은 임의로 설정, 반복 횟수가 많을수록 표준오차나 신뢰구간에 대해 추정이 더 정확해진다


대출 신청자의 소득 데이터에 부트스트랩을 적용하는 코드
stat_fun 함수는 인덱스 idx로 지정된 표본의 중앙값을 계산


중간값의 원래 추정치는 62000달러 부트스트랩 분포는 추정치에서 약 -70달러만큼의 편향이 있고 약 209달러의 표준오차가 있는 것으로 나타낸다 이 알고리즘을 연속해서 여러번 실행할 경우 결과는 약간씩 달라짐


부트스트랩은 다변량 데이터에도 적용될 수 있음, 각 행은 여러 변수들의 값을 포함하는 하나의 샘플을 의미, 분류 및 회귀 트리를 사용할 때, 여러 부트스트랩 샘플을 가지고 트리를 여러 개 만든 다음 각 트리에서 나온 예측값을 평균 내는 것이 일반적으로 단일 트리를 사용하는 것보다 효과적이다 이 프로세를 배깅이라고 함


재표본추출 대 부트스트래핑


부트스트랩 : 관측된 데이터로부터 복원추출한다는 것을 의미

## 2.5 신뢰구간
90% 신뢰구간이란, 표본통계량의 부트스트랩 표본분포의 90%를 포함하는 구간


더 일반적으로, 표본추정치 주위의 x% 신뢰구간이란, 평균적으로 유사한 표본추정치 x% 정도가 포함되어야함


표본크기 n과 관심있는 표본통계량이 주어졌을 때, 부트스트랩 신뢰구간을 구하는 법
1. 데이터에서 복원추출 방식으로 크기 n인 표본을 뽑는다(재표본추출)
2. 재표본추출한 표본에 대해 원하는 통계량을 기록한다
3. 1~2단계를 R번 반복한다
4. x% 신뢰구간을 구하기 위해, R개의 재표본 결과의 분포 양쪽 끝에서 [(100-x)/2]%만큼 잘라낸다
5. 절단한 점들을 x% 부트스트랩 신뢰구간의 양 끝점이다


대출 신청자의 평균 연산 소득에 대한 90% 신뢰구간 평균이 55734달러인 20개의 표본에서 얻은 결과
![9](/assets/img/study/etc/chapter2/9.jpg)


신뢰구간과 관련된 백분율을 신뢰수준이라고 함 신뢰수준이 높을수록 구간이 더 넓어진다, 표본이 작을수록 구간이 넓어진다 확실히 참값을 얻기에 충분한 신뢰구간 확보해야함

## 2.6 정규분포
오차 : 데이터 포인트와 예측값 혹은 평균 사이의 차이


표준화하다 : 평균을 빼고 표준편차로 나눈다


z 점수 : 개별 데이터 포인트를 정규화한 결과


표준정규분포 : 평균=0, 표준편차=1인 정규분포


QQ 그림 : 표본분포가 특정 분포에 얼마나 가까운지를 보여주는 그림

![10](/assets/img/study/etc/chapter2/10.jpg)


표분정규분포는 x축의 단위가 평균의 표준편차로 표현되는 정규분포를 말함
데이터를 표준정규분포와 비교하려면 데이터에서 평균을 뺀 다음 표준편차로 나누면 됨 이를 정규화, 표준화라고 함 이렇게 변환한 값을 z점수라고 함


QQ 그림은 표본이 특정 분포에 얼마나 가까운지를 시각적으로 판별하는데 사용됨


z 점수를 오름차순으로 정렬하고 각 값의 z 점수를 y축에 표시 정규분포에서 임의로 생성한 100개의 값에 대한 QQ그림을 보여줌


R의 qqnorm 함수를 사용하여 만들 수 있다
~~~R
norm_samp <- rnorm(100)
qqnorm(norm_samp, main='', xlab='Quantile of normal distribution', ylab='z-score')
abline(a=0, b=1, col='grey')
~~~

파이썬에서는 scipy.stats.probplot 메서드를 사용하여 QQ그림을 만든다
~~~py
fig, ax = plt.subplots(figsize=(4, 4))

norm_sample = stats.norm.rvs(size=100)
stats.probplot(norm_sample, plot=ax)

plt.tight_layout()
plt.show()
~~~
![11](/assets/img/study/etc/chapter2/11.jpg)


## 2.7 긴 꼬리 분포
꼬리 : 적은 수의 극단값이 주로 존재하는 , 도수분포의 길고 좁은 부분


왜도 : 분포의 한쪽 꼬리가 반대쪽 다른 꼬리보다 긴 정도


분포가 소득 데이터와 같이 비스듬하게 기울어져 있거나 이항 데이터같이 이산적일 수 있음 대칭 및 비대칭 분포 모두 긴 꼬리를 가질 수 있음 분포의 꼬리는 양 극한값에 해당


넷플릭스의 일일 주식 수익률에 대한 QQ 그림
~~~R
nflx <- sp500_px[,'NFLX']
nflx <- diff(log(nflx[nflx>0]))
qqnorm(nflx)
abline(a=0, b=1, col='grey')
~~~

~~~py
sp500_px = pd.read_csv(SP500_DATA_CSV)

nflx = sp500_px.NFLX
nflx = np.diff(np.log(nflx[nflx>0]))

fig, ax = plt.subplots(figsize=(4, 4))
stats.probplot(nflx, plot=ax)

plt.tight_layout()
plt.show()
~~~
![12](/assets/img/study/etc/chapter2/12.jpg)


그림 2-12는 그림 2-11과 달리 낮은 값의 점들은 대각선보다 훨씬 낮고 높은 값은 선보다 훨씬 위에 위치한다 이는 데이터가 정규분포를 따르지 않는다는 것을 의미한다 또한 이는 데이터가 정규분포를 따른다고 할 때 예상되는 것보다 훨씬 더 많은 극단값을 관찰할 가능성이 있다는 것을 의미


## 2.8 스튜던트의 t 분포
t 분포는 정규분초와 생김새는 비슷하지만 꼬리 부분이 약간 더 두껍고 길다, 표본평균의 분포는 t 분포와 같은 모양이며 표본크기에 따라 다른 계열의 t 분포가 있다 표본이 클수록 더 정규분포와 닮은 t 분포가 형성된다


고셋은 '더 큰 모집단에서 추출한 표본평균의 표본분포는 무엇인가?' 질문데 답을 찾기 위해 재표본추출 실험하였다
범죄자들의 신장과 왼손 가운뎃손가락 길이 데이터 3000건에서 무작위로 4개의 표본을 추출한다 그는 x축에 표준화된 결과를 y축에 빈도를 나타내는 도표를 만들었다
![13](/assets/img/study/etc/chapter2/13.jpg)


표준화된 여러 통계 자료를 t 분포와 비교하여 신뢰구간 추정 가능, 표본평균이 -x인 크기의 n의 표본이 있다고 가정 s가 표본표준편차라면 표본평균 주위의 90% 신뢰구간은 다음과 같이 주어진다

\bar{x}\pm t_{n-1}\cdot (0.05)\cdot \frac{s}{\sqrt{n}}
t_{n-1}\cdot (0.05)는 n-1 자유도를 갖는 t 분포의 양쪽 끝에서 5%를 잘라내는 t통계량 의미 표본평균, 두 표본평균 간의 차이, 회귀 파라미터, 그 외의 다른 통계량들의 분포를 구할 떄 t분포를 사용한다
표본 통계량은 정규분포를 따른다(t 분포가 널리 적용되는 이유)

## 2.9 이항분포
이항분포를 이해할 떄 핵심은 일련의 시행들이라는 것, 각 시행은 정해진 확률로 두 가지 결과를 갖는다


예)
동전 던지기 10번 하는 것은 2가지 결과를 갖는 시행을 10번 하는 이항 실험, 확률이 50대 50일 필요는 없음, 확률의 합이 1이면 됨



이항분포는 각 시행마다 그 성공 확률(p)이 정해져 있을 때, 주어진 시행 횟수(n) 중에서 성공한 횟수(x)의 도수분포를 의미


한 번의 클릭이 판매로 이어질 확률이 0.02일 때, 200회 클릭으로 0회 매출을 관찰할 확률은 얼마인가?

R 함수 dbinom은 이항 확률을 계산할 때 사용한다
~~~R
dbinom(x=2, size=5, p=0.1)
~~~

위 코드는 0.0729를 반환할 것이다 size = 5인 시행에서 각 시행의 성공 확률이 p=0.1일 때 정확히 x=2인 성공이 나올 확률을 의미 x=0, size=200, p=0.02 이러한 인수 사용할 떄 dbinom은 0.0176의 확률을 반환한다


보통은 n번의 시도에서 x번 또는 그 이하로 성공할 확률이 얼마인지 알아보자
~~~R
pbinom(2,5,0.1)
~~~
0.09914출력, 성공 확률이 0.1인 시행을 다섯 번 했을 때, 두 번 이하의 성공을 관찰할 확률을 의미

~~~py
stats.binom.pmf(2, n=5, p=0.1)
stats.binom.pmf(2, n=5, p=0.1)
~~~

이항분포의 평균은 n*p 분산은 n*p(1-p)

## 2.10 카이제곱분포
귀무 모델에서 반복적으로 재표본추출한 통계량 분포, 카이제곱분포는 일반적으로 범주에 속하는 주제 또는 항목의 수와 관련이 있다 카이제곱통곈느 귀무 모델의 기댓값에서 벗어난 정도를 측정한다


## 2.11 F 분포
F 분포는 각 그룹 내 변동성에 대한 그룹 평균간 변동성의 비율을 의미 측정된 데이터와 관련한 실험 및 선형 모델에서 사용, 관심 요인으로 인한 변동성과 전체 변동성을 비교


## 2.12 푸아송 분포와 그 외 관련 분포들
람디 : 단위 시간이나 단위 면적당 사건이 발생하는 비율


푸아송 분포 : 표집된 단위 시간 혹은 단위 공간에서 발생한 사건의 도수분포


지수분포 : 한 사건에서 그다음 사건까지의 시간이나 거리에 대한 도수분포


베이불 분포 : 사건 발생률이 시간에 따라 변화하는 지수분포의 일반화된 버전



푸아송 분포
시간 단위 또는 공간 단위로 표본들을 수집할 때 그 사건들의 분포를 알려준다 핵심 파라미터는 람다, 람다는 어떤 일정 시간/공간의 구간 안엥서 발생한 평균 사건의 수


코드 설명 고객 서비스 센터에 1분당 평균 2회로 문의 전화가 접수 된다면, 이 코드는 100분을 시뮬레이션하여 100분당 문의 전화 횟수를 알려준다


지수분포
웹사이트 방문이 일어난 시간 또는 톨게이트에 자동차가 도착하는 시간 사이클
~~~R
rexp(n=100, rate=0.2)
~~~

~~~py
stats.expon.rvs(scale=1/0.2, size=100)
stats.expon.rvs(scale=5, size=100)
~~~

코드 설명 분당 편균적으로 0.2회 서비스 문의 전화가 걸려오는 경우, 100분 동안의 서비스 센터 문의 전화 시뮬레이션


푸아송이나 지수분포에 대한 시뮬레이션 연구에서 핵심은 람다가 해당 기간동안 일정하게 유지된다는 가정 그러나 도로의 교통상황이나 데이터 망의 트래픽은 시간대와 요일에 따라 같을 수 없다 그러나 시간 주기 또는 공간을 일정 기간 충분히 동일하도록 영역을 잘 나누면 가능하다


고장률 추정
데이터가 있긴 하지만 정확하고 신뢰할 만한 발생률을 추정하기에 충분하지 않은 경우, 적합도 검정을 통해 적용한 여러 발생률 중 어떤 것이 관찰된 데이터에 가장 적합한지를 알 수 있다


베이불 분포
지수 분포를 확장한 것으로 형상 파라미터 베타로 지정된 대로 발생률이 달라질 수 있다


1보다 큰 경우 발생률은 시간이 지남에 따라 증가, 1보다 작은 경우 감소한다


사건 발생률 대신 고장 시간 분석에 사용되기 때문에 두번째 인수는 구간당 사건 발생률보다는 특성 수명으로 표현, 에타를 사용, 척도 변수라고 함


설명
형상 파라미터와 5000개의 특수 수명을 갖는 베이불 분포에서 난수 100개(수명)을 생성
~~~R
rweibull(100, 1.5, 5000)
~~~

~~~py 
stats.weibull_min.rvs(1.5, scale=5000, size=100)
~~~