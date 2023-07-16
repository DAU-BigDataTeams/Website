---  
title: 관심있는 데이터를 선정하여 분석해보자!
layout: post  
categories : [Analytics]
image : /assets/img/study/analytics/사진4.png
description:  관심있는 데이터를 선정하여 분석해보자!
customexcerpt: 데이터분석 첫 포스트입니다! 지난 스터디 시간에 '국가별 음주 데이터'를 통해 데이터 실습을 진행했는데요. 복습할 때 관심있는 데이터로 실습해보면 기억에 잘 남지 않을까하는 취지로 글을 쓰게 되었습니다. 저는 2019 국내프로야구리그 타자기록 csv파일로 진행했습니다. 각자 흥미로운 데이터를 선정해서 따라해보아요.
---

<span class = "alert g">작성자 : 양한나</span>


* random line to make it work. This will be removed.
{:toc} 

----------------------------------------------------------------
# 데이터 실습을 위한 준비
## 사용할 데이터만 저장하기
저는 [여기](https://github.com/bluemumin/baseball_ops_predict/blob/master/kbo_data.csv)에서 kbo 1993-2019 타자 기록 데이터를 다운받아 사용했어요.
그 중에서도 가장 많은 데이터를 가진 연도의 데이터만 분석하고 싶었습니다.
~~~py
kbo=pd.read_csv('/users/asd00/Desktop/데이터분석실습/mypost/kbo_data.csv')
kbo['year'].value_counts()
~~~
(아래 결과는 일부 출력결과입니다.)
<pre>  
year
2019    263
2018    240
2017    221
2016    220
2015    207
2014    164
2013    159
</pre>    
가장 많은 2019년의 데이터를 'kbo2019'로 저장하겠습니다. 그리고 이것저것 데이터 실습을 위해 첨삭을 거칩니다.. 간단한 작업이라 코드로 나타내고 설명은 생략합니다.
~~~py
kbo2019 = kbo[kbo['year'] == 2019]
kbo2019['타율']=kbo2019['안타']/kbo2019['타수']
kbo2019['출루율']=kbo2019['안타']+kbo2019['볼넷']+kbo2019['사구']/kbo2019['타석수']
kbo2019['장타율'] = kbo2019['총 루타'] / kbo2019['타수']
kbo2019['OPS'] = kbo2019['출루율'] + kbo2019['장타율']
~~~
아무튼 이렇게 국내프로야구리그 2019 타자 데이터를 분석할 준비를 마쳤습니다..

--------------------------------------------------------

# 데이터의 기본 정보 파악(feat. info(), head())
## info() 함수
info()함수는 데이터 프레임의 기본 정보를 제공하는 메서드입니다. 

info() 통해 알 수 있는 정보
- 전체 행의 개수
- 전체 열의 개수
- column 명
- 결측값
- 데이터 타입

~~~py
kbo2019.info()
~~~
<pre>  
<class 'pandas.core.frame.DataFrame'>
Index: 263 entries, 6 to 2634
Data columns (total 26 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   타자이름    263 non-null    object 
 1   나이      263 non-null    float64
 2   게임수     263 non-null    float64
 3   타석수     263 non-null    float64
...
 24  장타율     260 non-null    float64
 25  OPS     258 non-null    float64
dtypes: float64(24), int64(1), object(1)
memory usage: 55.5+ KB
</pre>    

## head() 함수
head() 함수로 데이터 프레임의 일부 데이터를 확인할 수 있습니다.
~~~py
kbo2019.head()
~~~
![사진1](/assets/img/study/analytics/사진1.png) 

------------------------------------------------

# 인사이트 발견: 상관분석 
## 상관분석 (feat.corr)
상관 분석이란 두 변수 간의 선형적 관계를 상과 계수로 표현하는 것입니다.
4개 열의 상관관계를 분석해볼까요?
'타석수', '타율', '출루율', '장타율' 컬럼의 상관관계를 분석합니다.
상관관계를 분석하기 위해  판다스의 corr함수를 호출합니다.
상관계수는 -1부터 1사이의 값을 가지고 -1에 가까울수록 음의 상관 관계, 1에 가까울수록 양의 상관 관계를 나타냅니다. 0에 가까울수록 상관 관계가 없다는 것을 의미합니다.
~~~py
cols=['타석수','타율','출루율','장타율']

# 'kbo2019' 데이터프레임에서 '타석수', '타율', '출루율', '장타율' 변수들 간의 상관계수를 계산하여 'corr' 데이터프레임으로 저장
corr=kbo2019[cols].corr(method='pearson')
corr
~~~
<pre>  
![사진2](/assets/img/study/analytics/사진2.png) 
</pre>  
4개의 컬럼 모두 양의 상관관계에 있습니다.
특히 '타석수'와 '출루율' 간에 강하게 비례합니다.
'타율'과 '장타율'도 강하게 비례합니다.


-------------------------------------------------

# matplotlib와 seaborn을 활용하여 데이터 시각화를 해보자.
## heatmap 시각화
heatmap()은 matplotlib 라이브러리의 imshow()를 내부적으로 호출하여 히트맵을 그려줍니다.
위에서 확인했던 상관계수 데이터를 heatmap으로 시각화합니다.
~~~py
#heatmap
# 히트맵에 표시할 변수 리스트
cols_view = ['PA','AVG','OBP','SLG'] #순서대로 타석수, 타율, 출루율, 장타율

sns.set(font_scale=1.5) # 기본 폰트 크기를 1.5배로 설정

# 히트맵 그리기
hm = sns.heatmap(corr.values,        # 상관계수 데이터를 넘파이 배열로 전달
                cbar=True,           # 컬러바 표시
                annot=True,          # 각 셀에 상관계수 표시
                square=True,         # 히트맵 정사각형으로  표시
                fmt='.2f',           # 소수점 둘째자리까지 출력
                annot_kws={'size': 15},  # 히트맵의 셀 안의 폰트 크기 
                yticklabels=cols_view,   # y축 값 설정
                xticklabels=cols_view    # x축 값 설정
                )

plt.tight_layout()

# 히트맵 출력
plt.show()
~~~
![사진3](/assets/img/study/analytics/사진3.png)

## pairplot 시각화
seaborn 라이브러리의 pairplot은 변수 간의 산점도와 히스토그램을 그려주는 시각화 도구입니다.
배열은 heapmap과 같습니다.
상관계수가 높을수록 선형구조가 잘 보입니다.
~~~py
sns.set(style='whitegrid',context='notebook')
# KBO 2019 데이터프레임에서 '타석수', '타율', '출루율', '장타율' 의 산점도 그리기
sns.pairplot(kbo2019[['타석수','타율','출루율','장타율']],height=2.5)
#산점도 그래프 출력
plt.show()

~~~
![사진4](/assets/img/study/analytics/사진4.png)

----------------------------------------
# 탐색적 분석
## 선수들의 나이를 분류하여 파이차트로 시각화해보자.
![사진5](/assets/img/study/analytics/사진5.png)
선수들의 나이를 분류하여 파이차트로 시각화해봅시다.
~~~py
#파이차트로 시각화하기
#pd.cut
age_groups = pd.cut(kbo2019['나이'], bins=[20, 25, 30, 35, 40], labels=['20-24', '25-29', '30-34', '35-39'])
~~~
나이를 구간으로 나누기 위해 판다스의 cut함수를 사용합시다.
bins를 위와 같이 설정하면
[20이상 25미만, 25이상 30미만, 30이상 35미만, 35이상 40미만]으로 나누어집니다.

~~~py
# 나이대별 선수들의 수를 카운트한 값을 리스트로 저장
labels = age_groups.value_counts().index.tolist()
fracs1 = age_groups.value_counts().values.tolist()

# 파이 차트에서 부채꼴을 분리하기 위한 explode 설정 (35-39세 나이대 강조)
explode = [0, 0, 0, 0.2]

# 파이 차트 시각화 설정
plt.figure(figsize=(8, 6))
plt.pie(fracs1, explode=explode, labels=labels, autopct='%.0f%%', shadow=True)

# 그래프 제목
plt.title('35-39 players')

# 그래프 출력
plt.show()
~~~
![사진6](/assets/img/study/analytics/사진6.png)

--------------------------------------------
## describe()를 통해 '타율' 평균 정보를 확인하고, 타율이 높은 나이대를 칮아보자.
describe() 함수는 데이터프레임 또는 시리즈에 대한 간단한 통계적 요약 정보를 제공하는 Pandas의 메서드입니다. 주로 수치형 데이터에 대해 사용되며, 데이터의 기본 통계량을 쉽게 파악할 수 있도록 도와줍니다.

- count: 결측값 값의 개수
- mean: 평균
- std: 표준편차
- min: 최솟값
- 25%, 50%, 75%:  25%, 50%, 75%에 해당하는 분위
- max: 최댓값


~~~py
#'타율'의 통계정보
kbo2019['타율'].describe()
~~~
<pre>  
count    258.000000
mean       0.219128
std        0.087114
min        0.000000
25%        0.185401
50%        0.237798
75%        0.275696
max        0.666667
Name: 타율, dtype: float64
</pre>    
전체 평균보다 타율이 높은 나이대는 어디일까?
~~~py
age_groups = pd.cut(kbo2019['나이'], bins=[20, 25, 30, 35, 40], labels=['20-24', '25-29', '30-34', '35-39'])
kbo2019['나이대']=age_groups
total_mean=kbo2019['타율'].mean()
~~~

~~~py
hit_mean=kbo2019.groupby('나이대')['타율'].mean()
hit_over_mean=hit_mean[hit_mean>=total_mean]
print(hit_mean)
print(hit_over_mean)
~~~
<pre>  
나이대
20-24    0.198320
25-29    0.216677
30-34    0.250248
35-39    0.265178
Name: 타율, dtype: float64
나이대
30-34    0.250248
35-39    0.265178
Name: 타율, dtype: float64
</pre>   

## 나이대별 타율의 평균,최소,최대,합계를 시각화합시다.
~~~py
# KBO 2019 데이터를 '나이대'로 그룹화하고 '타율'의 평균, 최솟값, 최댓값을 각각 저장
a = kbo2019.groupby('나이대')['타율'].describe()
means = a['mean']
mins = a['min']
maxs = a['max']

a_groups = len(a.index)

# x축 인덱스 설정
index = np.arange(a_groups)

# 막대 그래프의 너비 
bar_width = 0.2

# mean에 해당하는 막대 그래프
plt.bar(index, means, width=bar_width, label='Mean')

# min에 해당하는 막대 그래프 
plt.bar(index + bar_width, mins, width=bar_width, label='Min')

# max에 해당하는 막대 그래프
plt.bar(index + 2 * bar_width, maxs, width=bar_width, label='Max')

# x축 눈금과 라벨 
plt.xticks(index, a.index)

# 범례 추가
plt.legend()

# 그래프 표시
plt.show()
~~~
![사진7](/assets/img/study/analytics/사진7.png)

--------------------------------------------------
# 통계적 분석: 분석 대상 간의 통계적 차이 검정하기
## t-test
t-test란 두 집단 간 평균의 차이에 대한 검정 방법으로 모집단의 평균 등과 같이 실제 정보를 모를 때 현재의 데이터 만으로 두 집단의 차이에 대해 검정하는 방법입니다. t-test는 검정대상인 두 집단의 데이터개수가 비슷하면서 두 데이터가 정규 분포를보이는 경우에 신뢰도가 높습니다.
~~~py
#scipy 라이브러리를 활용하여 두 집단 간의 t-test
#경기수 70이상과 70미만인 두 집단의 안타 차이 검정하기
more70=kbo2019.loc[kbo2019['게임수']>=70]
less70=kbo2019.loc[kbo2019['게임수']<70]
from scipy import stats
tTestResult=stats.ttest_ind(more70['안타'],less70['안타'])
tTestResultDiffVar=stats.ttest_ind(more70['안타'],less70['안타'],equal_var=False)
print("The t-statistic and p-value assuming equal variances is %.3f and %.3f." % tTestResult)
print("The t-statistic and p-value not assuming equal variances is  %.3f and %.3f." % tTestResultDiffVar)
~~~
<pre>  
The t-statistic and p-value assuming equal variances is 24.429 and 0.000.
The t-statistic and p-value not assuming equal variances is  20.920 and 0.000.
</pre>  
실행 결과에 나오는 t-statistic은 t-test의 검정 통계량을 의미합니다. p-value는 가설이 얼마나 믿을만한 것인지를 나타내는 지표로 데이터를 새로 샘플링했을 때 귀무 가설이 맞다는 전제 하에 현재 나온 통계값 이상이 나올 확률이라 정의할 수 있습니다.

위 실행결과에서는 첫번째 등분산을 가정한 경우의 t-statistic은 24.429로 두 그룹의 안타 수 평균 차이가 표준 오차보다 매우 크다는 것을 의미합니다.
p값은 0.000으로 두 그룹의 안타 수 평균이 같다는 귀무가설을 기각합니다.

두번째 등분산을 가정하지 않은 경우의 t-statistic은 20.920으로 두 그룹의 안타 수 평균 차이가 표준 오차보다 매우 크다는 것을 의미합니다.
p값은 0.000으로 두 그룹의 안타 수 평균이 같다는 귀무가설을 기각합니다.


## '20-24세 타자는  타석 대비 얼마나 볼넷으로 출루할까?'에 대한 탐색코드 살펴보기
~~~py
kbo2019['볼넷_출루율']=kbo2019['볼넷']/kbo2019['타석수']
age=kbo2019['나이대'].values.tolist()
age_groups = age
age_group_ranks={}
for age_group in age_groups:
    # 해당 나이대의 데이터를 추출
    age_group_data = kbo2019[kbo2019['나이대'] == age_group]
    
    # 해당 나이대의 볼넷 출루율 평균을 계산
    average_obp = age_group_data['볼넷_출루율'].mean()
    
    # 해당 나이대의 평균 볼넷 출루율을 저장
    age_group_ranks[age_group] = average_obp
    age_group_ranks
~~~
<pre>  
{'25-29': inf,
 '20-24': 0.05207610850721675,
 '35-39': 0.08135698485746802,
 '30-34': 0.08711805311653942}
</pre> 

'나이대'가 '25-29', '20-24', '35-39', '30-34' 인 집단의 평균 볼넷 출루율입니다.


- '20-24' : 평균 볼넷 출루율은 약 0.0521 입니다.
- '35-39' : 평균 볼넷 출루율은 약 0.0814 입니다.
- '30-34' : 평균 볼넷 출루율은 약 0.0871 입니다.
- '25-29' : 경우 무한대로 계산되었습니다. kbo2019['볼넷_출루율']kbo2019['볼넷']/kbo2019['타석수']에서 '타석수'가 0인 선수가 포함된 것 같습니다.

이 결과를 통해 나이대에 따라 평균 볼넷 출루율에 차이를 확인할 수 있습니다.
------------------------------------------------------------


