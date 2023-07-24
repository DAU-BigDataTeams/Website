---  
title: 전국 대학 등록금 데이터 분석
layout: post   
categories : [Analytics] 
image : /assets/img/study/analytics/tuition/사진5.png
description:  전국 대학 등록금 데이터 분석 
customexcerpt: 전국 대학 등록금을 이용해서 다양한 인사이트를 발굴해보자!
---

<span class = "alert g">작성자 : 김종호</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# 데이터 준비

한국장학재단에서 제공하는 전국대학교동륵금 데이터를 이용해서 실습해보았습니다. 항상 다운받아서 사용했는데 이번에 팀장님께서 꿀팁 알려주셔서 다른 방법으로 데이터를 불러왔습니다. 


일단 깃허브에 Raw버튼을 누른 후에 나온 링크를 

<!-- 사진1 자리 -->
![사진1](/assets/img/study/analytics/tuition/사진1.png)

read_csv()에 넣으면 데이터를 불러올 수 있습니다.

~~~py
import pandas as pd
import matplotlib.pyplot as plt

%matplotlib inline

tuition = pd.read_csv('여기~')

~~~

**단 위의 방법은 repository가 public일 경우에만 사용 가능하다고 합니다**


# 데이터 정보 확인

## head()

`head()`함수로 데이터 일부를 확인해보자

~~~py
# head() : 불러온 데이터의 상위 5개의 행만 출력
tuition.head()
~~~

![사진2](/assets/img/study/analytics/tuition/사진2.png)

## columns

~~~py
# columns : 컬럼명 확인
tuition.columns
~~~

<pre>
Index(['academic_level', 'establish_type', 'university_name', 'region',
       'number_of_students', 'average_admission_fee', 'average_tuition_fee'],
      dtype='object')
</pre>


## info()

`info()`함수로는 행과 열의 크기, 컬럼명, 컬럼을 구성하는 데이터 유형, 결측치 등 다양한 정보를 출력해준다. 

~~~py
# info() : 데이터의 전반적인 정보를 나타냄
tuition.info()
~~~

<pre>
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 388 entries, 0 to 387
Data columns (total 7 columns):
 #   Column                 Non-Null Count  Dtype 
---  ------                 --------------  ----- 
 0   academic_level         388 non-null    object
 1   establish_type         388 non-null    object
 2   university_name        388 non-null    object
 3   region                 388 non-null    object
 4   number_of_students     388 non-null    int64 
 5   average_admission_fee  388 non-null    int64 
 6   average_tuition_fee    388 non-null    int64 
dtypes: int64(3), object(4)
memory usage: 21.3+ KB
</pre>

위에 출력정보에서 RangeIndex와 Non-Null Count가 전부 같은 점을 보아 결측치가 없다는 것도 알 수 있다.

# 인사이트의 발견 : 탐색과 시각화하기

## 다중 상관 분석 

상관분석은 변수 간에 서로 관련된 정도를 예측하는 분석 방법이다 이를 통해 두 변수 간의 연관성을 알아볼 수 있다. Pearson의 상관계수를 사용하여 두 변수 간의 연관성 정도를 수치적으로 계산하고, 이 연관성이 통계적으로 유의미한지를 검정할 수도 있다. 상관계수를 뜻하는 r은 변수간의 선형적 관련 정도를 -1에서 1 사이의 값으로 나타낸다. 

r이 양의 값을 가질 때에는 두 변수가 동시에 증가하는 경우이며, r이 음의 값을 가질 때에는 한 변수가 감소할 때 다른 변수는 증가하는 경우이다. r이 0인 경우는 변수간 '상관 없음'을 뜻한다. 

**상관 계수는 변수간의 연관된 정보를 나타낼 뿐 인과관계를 설명하는 것은 아니다는 것을 꼭 인지해야 한다!!!**

~~~py
# 등록금과 입학금, 입학정원의 상관관계를 가지고 있을까?

cols = ['average_tuition_fee','number_of_students','average_admission_fee']
corr = tuition[cols].corr(method='pearson')
corr
~~~

![사진3](/assets/img/study/analytics/tuition/사진2.png)

위 변수들 간의 연관성은 매우 낮아 관련성이 ***'거의 없음'***을 확인할 수 있다.

이를 `seaborn`과 `maplotlib`을 이용해서 보기 쉽게 시각화를 해볼수있다.

~~~py
sns.set(style='whitegrid',context='notebook')
sns.pairplot(tuition[['average_tuition_fee','number_of_students','average_admission_fee']],height=3.0)
plt.show()
~~~

![사진4](/assets/img/study/analytics/tuition/사진4.png)

## 탐색1. 평균 등록금이 가장 높은 지역('도')는?

`region`열을 `groupby`함수를 이용하여 지역별 평균등록금을 구한 후 평균을 구한다. 이 후 정렬을 한 후 `list`로 변환해서 시각화해주었다. 

![사진5](/assets/img/study/analytics/tuition/사진5.png)

경기도가 평균 등록금이 가장 높은 지역임을 볼 수 있고 부산은 전국 평균 아래인 것도 확인할 수 있다.

## 탐색2. 사립 대학 중 동아대의 등록금은 몇 순위인가?

~~~py
private_universities = tuition[tuition['establish_type']=='사립']

private_universities.head()
~~~

![사진6](/assets/img/study/analytics/tuition/사진6.png)

~~~py
# 전국 사립대학 중 동아대 등록금
private_universities_rank = private_universities[['university_name','average_tuition_fee']]
private_universities_rank = private_universities_rank.sort_values(by=['average_tuition_fee'],ascending=False)

# rank, 순위 정보
private_universities_rank['rank'] = private_universities_rank.average_tuition_fee.rank(method='first')

print('총 사립대학 수 : ',len(private_universities_rank))
print(private_universities_rank.loc[private_universities_rank['university_name']=='동아대학교']['rank'].values)

~~~

<pre>
총 사립대학 수 :  331
[210.]
</pre>

총 331개의 사립 대학 중에 210등으로 비싸다.

## 탐색3. 지역별 대학교 비율

~~~py
# 지역별 대학교 비율

labels = tuition['region'].value_counts().index.tolist()
fracs1 = tuition['region'].value_counts().values.tolist()

plt.figure(figsize=(15, 10))
plt.title('지역별 대학교비율')

plt.pie(fracs1, labels=labels,autopct='%1.1f%%',shadow=True)
plt.show()
~~~

![사진7](/assets/img/study/analytics/tuition/사진7.png)

서울과 경기 지역에 대학교가 몰려있고 세종, 제주, 울산 지역에 대학교의 비율이 가장 적다.

## 탐색4. 국·공립 대학과 사립대학의 평균 등록금 비교

~~~py
# 설립별 유니크한 값 계산
tuition['establish_type'].unique()
~~~

<pre>
array(['국공립', '사립'], dtype=object)
</pre>

~~~py
# 국공립대학 사립대학 평균 등록금 비교

private_universities = tuition[tuition['establish_type']=='사립'] # 사립대학만
public_universities = tuition[tuition['establish_type']=='국공립'] # 국공립대학만

# 평균값 계산
private_mean = private_universities ['average_tuition_fee'].mean() 
public_mean = public_universities ['average_tuition_fee'].mean()

x_pos = ['국공립','사립']
y_pos = [public_mean,private_mean]

plt.bar(x_pos,y_pos)
plt.show()
~~~

# 통계적 분석 : 분석 대상 간의 통계적 차이 검정하기

지금까지 우리는 데이터 분석 방법으로 피처 간의 상관성을 계산하거나 그룹 단위로 나누어 수치 정보를 살펴보는 방식을 살펴보았다. 그러나 이러한 방법은 분석가의 주관에 따라 도출된 결과이기 때문에 분석 자체의 타당성을 증명하기에 한계가 있다. 이러한 한계를 극복하고 분석 결과에 타당성을 부여하기 위해 통계적 차이를 검정하는 과정이 필요하다. 가장 기본적인 t-test를 활용하여 분석 대상 간에 통계적 차이를 검정해보자!

> t-test란 통계학에서 두 집단 간 평균 차이를 검정하는 데에 사용되는 가설 검정 방법이다. 두 집단의 데이터를 분석하여 평균값의 차이가 우연에 의한 것인지 통계적으로 유의미한 것인지를 판단한다. 이 때, "평균 차이가 없다"는 귀무가설(null hypothesis)과 "평균 차이가 있다"는 대립가설(alternative hypothesis)을 세우게 된다.

파이썬은 scipy라는 라이브러리를 활용하여 두 집단 간의 t-test를 검정할 수 있다.


## 서울권과 부산권 간의 평균 등록금 차이 검정하기

~~~py
seoul_tuition = tuition.loc[tuition['region']=='서울']
busan_tuition = tuition.loc[tuition['region']=='부산']

from scipy import stats

tTestResult=stats.ttest_ind(seoul_tuition['average_tuition_fee'],busan_tuition['average_tuition_fee'])
tTestResultDiffVar=stats.ttest_ind(seoul_tuition['average_tuition_fee'],busan_tuition['average_tuition_fee'],equal_var=False)
# 분산이 같은 경우
print("The t-statistic and p-value assuming equal variances is %.3f and %.3f." % tTestResult)

# 분산이 다른 경우
print("The t-statistic and p-value not assuming equal variances is  %.3f and %.3f." % tTestResultDiffVar)
~~~

<pre>
The t-statistic and p-value assuming equal variances is 1.312 and 0.193.
The t-statistic and p-value not assuming equal variances is  1.494 and 0.140.
</pre>

t-statistic은 t-test의 검정 통계량으로 p-value와 함께 연관 지어 해석해야 한다. p-value는 귀무가설이 맞다고 가정할 때, 관찰된(또는 그보다 더 극단적인) 결과가 일어날 확률이다. 보통 그 기준을 0.05나 0.01을 기준으로 하고, 이를 p-value(유의확률)이라고 부른다.  

위 예제에서는 등분산을 가정한 케이스와 가정하지 않은 케이스 모두 p-value값이 0.05를 넘어가는 결과를 보였다. 두 지역의 등록금 평균에는 통계적으로 유의미한 차이가 없다고 볼 수 있다.



## 표로 정리하는 데이터분석

|데이터 탐색 질문|핵심 내용|인사이트|
|------|---|---|
|평균 등록금이 가장 높은 지역('도')는?|모든 행을 그룹 단위로 분석|경기, 서울권이 평균 등록금이 가장 비싸며 제주가 가장 낮음. 전국 평균보다 높은 지역은 6개 구역임도 알 수 있음.|
|사립 대학 중 동아대의 등록금은 몇 순위인가?|모든 행을 그룹 단위로 분석|`establish_type` 피쳐에서 사립대학만 추출해 `rank`함수로 순위 정보를 구해 동아대 순위를 알아냄. 사립대학 총 331개 중에 210등이다. |
|지역별 대학교 비율|모든 행을 그룹 단위로 분석|경기, 서울권에 대학 35% 이상이 있으며 그 다음 경북이 뒤를 잇는다. 세종,제주,울산이 지역별 대학교 비율이 가장 적다는 것도 확인할 수 있다.|
|국·공립 대학과 사립대학의 평균 등록금 비교|모든 행을 그룹 단위로 분석|국·공립 대학과 사립대학의 평균 등록금은 약 200만원 이상 차이가 난다.|
|서울권과 부산권 간의 평균 등록금 차이 검정하기|통계적 차이 검정|t-test 분석 결과, 서울권과 부산권의 평균 등록금은 통계적으로 유의미한 차이가 보이지 않는다.(단, 이 예제는 그룹 간의 데이터 크기가 매우 다르고, 정규분포를 띤다는 가정을 할 수 없기 때문에 신뢰할 만한 정보라고 할 수 없다.)|
