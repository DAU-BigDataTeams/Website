---
title: pandas  
layout: post   
categories : kaggle pandas python-library
image : /assets/img/수료증/zerotoA - Pandas.png
description: Kaggle의 Pandas과정 정리  
customexcerpt: 데이터 분석에 가장 인기 있는 파이썬 라이브러리인 Pandas를 정리해보았다.
---
# Creating, Reading and Writing
데이터 분석에 가장 인기 있는 파이썬 라이브러리인 pandas에 대해 배움  
DataFrame: 테이블. 각 항목이 특정 값을 갖는 개별 항목의 배열이 포함. 각 항목은 행(또는 레코드)과 열에 해당
~~~python
import pandas as pd
pd.DataFrame({'Yes': [50, 21], 'No': [131, 2]})

# 데이터프레임 항목은 정수로 제한되지 않음
pd.DataFrame({'Bob': ['I liked it.', 'It was awful.'], 'Sue': ['Pretty good.', 'Bland.']})
~~~
DataFrame 객체를 생성하기 위해 pd.DataFrame()생성자를 사용하고 있음. 새거를 선언하는 구문은 dictionary이며 key는 열 이름이며, 값은 항목 목록임.
~~~python
pd.DataFrame({'Bob': ['I liked it.', 'It was awful.'], 
              'Sue': ['Pretty good.', 'Bland.']},
             index=['Product A', 'Product B'])
~~~
# Indexing,Selecting & Assigning
작업할 판다스 데이터프레임 또는 시리즈의 특정 값을 선택하는 것은 실행할 거의 모든 데이터 작업에서 암시적인 단계이기에 Python에서 데이터를 사용할 때 가장 먼저 배워야 할 것 중 하나는 *자신과 관련된 데이터 포인트를 빠르고 효과적으로 선택하는것*
### Native accerssors
python에서 속성으로 접근함으로 객체의 속성에 접근할 수 있음  
python 딕셔너리를 배웠다면, [] 연산자를 사용해 값에 접근할수있음
~~~python
reviews['country']
reviews['country'][0]
~~~
### indexing in pandas
인덱싱 연산자와 속성 선택은 great. 왜 ?! 파이썬 생태계의 나머지 부분과 동일하게 작동하기에  
판다스는 **loc**와 **iloc** 라는 그들만의 접근자 조작자를 가짐.
iloc : 파이썬 인덱스 사용 
~~~python
reviews.iloc[0] # 데이터 프레임에서 첫 번쨰 데이터 행 선택
reviews.iloc[:, 0]  # 첫번째 열선택
~~~
**loc** 와 **iloc** -> loc[행 ,열].python이랑 다름 즉, 행 검색이 더 쉽고 열 검색이 더 어려움  
레이블 기반 선택 : 속성 선택을 위한 두번째 패러다임 loc연산자중 하나임. 이 패러다임에서 중요한 것 : 데이터 인덱스 값, 위치X
~~~python
reviews.loc[0, 'country']
reviews.loc[:, ['taster_name', 'taster_twitter_handle', 'points']]
~~~
### manipulating the index
레이블 기반 선택은 인덱스의 레이블에서 검정력을 가짐. 결정적으로, 인덱스는 불변하지 않는다. 우리가 적합하다고 생각하는 방법으로 인덱스를 조작 가능.
~~~python
reviews.set_index("title")
# 현재 dataset보다 더 나은 dataset에 대한 index를 생각해 낼 수있는 경우에 유용
~~~
### Conditional selection
지금까지는 데이터 프레임 자체의 구조적 특성을 사용해 다양한 데이터를 인덱싱해왔음. but, 데이터로 흥미로운 일을 하기 위해서는 조건에 따라 질문을 해야하는 경우도 많음.
~~~python
'''
ex) 이탈리아에서 생산되는 평균 이상의 와인에 관심이있다.
1. 각 와인이 이탈리아산인가 아닌가
2. 어떤것들이 평균보다 좋은가
'''
reviews.loc[reviews.country == 'Italy']  ## true/false : 이탈리아산인지 아닌지
reviews.loc[(reviews.country == 'Italy') & (reviews.points >= 90)]  # 이탈리아산에 평균이상인지 확인
reviews.loc[(reviews.country == 'Italy') | (reviews.points >= 90)]  # 이탈리아산 or 평균이상인지 확인
reviews.loc[reviews.country.isin(['Italy', 'France'])] # 이탈리아와 프랑스 에 있는 데이터 선택
reviews.loc[reviews.price.notnull()]    # 비어있거나 NaN값을 강조 표시 가능
~~~
### Assigning data
~~~python
reviews['critic'] = 'everyone'
reviews['critic']

reviews['index_backwards'] = range(len(reviews), 0, -1)
reviews['index_backwards']
~~~
# Summary Functions and Maps
데이터 표현에서 올바른 데이터를 추출하는 것이 작업을 완료하는 데 매우 중요함. but, 데이터가 항상 원하는 형식으로 메모리에서 나오는것은 아님. 그러기에 우리가 원하는 데이터로 포맷하기위해 더 많은 작업을 해주어야함.
### Summary functions
pandas는 데이터를 유용한 방식으로 재구성하는 많은 간단한 <span style ="color:red">**"summary functions"**</span>을 제공함.  
describe() : 지정된 열의 속성에 대한 높은 수준의 요약을 생성. 이것은 'type-aware'로 입력의 데이터 유형에 따라 출력이 변경된다는 것을 의미. 이 출력은 숫자 데이터에 대해서만 의미가 있으며 , 문자열 데이터에 대해서는 아래의 두번째와 같다.
~~~python
reviews.points.describe()
reviews.taster_name.describe()
~~~
DataFrame 또는 Series 열에 대한 특정한 간단한 요약 통계량을 가져온다면, 일반적으로 유용한 판다스 함수가 있음.
~~~python
reviews.points.mean()
reviews.taster_name.unique()
reviews.taster_name.value_counts()
~~~
### maps
map() : 수학에서 빌려온 용어로 , 한 집합의 값을 다른 집합으로 "매핑"하는 함수. **데이터 과학에서 종종 기존 데이터로부터 새로운 표현을 만들거나, 데이터를 현재의 형식에서 나중에 원하는 형식으로 변환할 필요가 있음** ***map은 이 작업을 처리하는 역할을 하므로 학업을 완료하는데 매우 중요***
~~~python
review_points_mean = reviews.points.mean()
reviews.points.map(lambda p: p - review_points_mean)
~~~
map()에 전달하는 함수는 Series에서 단일값을 기대하고 해당 값의 변환된 버전을 반환.  
apply() : 각 행에서 사용자 지정 메서드를 호출해 전체 DataFrame을 변환하려는 경우에 해당하는 메서드  
만약 우리가 axis='index'를 가진 reviews.dll을 호출했다면, 각 행을 변환하는 함수를 전달하는 대신, 우리는 각 열을 변환하는 함수를 제공해야함.   map()과 apply()는 각각 새로운 변환된 Series와 DataFrames을 반환. 요청된 원본 데이터는 수정X. 첫 번째 줄 리뷰를 보면 여전히 원래의 포인트 가치가 있음을 알 수 있음.  
(pandas는 빌트인으로 많은 일반적인 매핑 operation을 제공)


# Grouping and Sorting
### Groupwise analysis
~~~python
# 그룹별 분석
reviews.groupby('points').points.count()
# groupby()는 주어진 와인에 대한 동일한 포인트 값을 할당하는 리뷰그룹을 만들었음. 이 그룹들 각각에 대해 points()열을 잡고 몇 번 나타났는지 세어 봄. 
~~~

value_counts()는 groupby()작업에 지름길
~~~python
# 각 포인트 값 범주에서 가장 저렴한 와인을 얻으려면 ?
reviews.groupby('points').price.min()
~~~
생성하는 각 그룹은 일치하는 값을 가진 데이터만 포함하는 DataFrame의 슬라이스. DataFrame은 apply()메서드를 이용해 우리가 직잡 접근가능. 그런 다음 우리가 적합하다고 생각하는 모든 방법으로 데이터 조작 가능.
~~~python
# 데이터 셋의 각 와이너리에서 검토한 첫 번째 와인의 이름을 선택
reviews.groupby('winery').apply(lambda df: df.title.iloc[0])
~~~
세분화를 위해 둘 이상의 열로 그룹화 가능
~~~python
reviews.groupby(['country', 'province']).apply(lambda df: df.loc[df.points.idxmax()])
~~~
*groupby()를 효과적으로 사용하는것은 데이터셋으로 정말 강력한 작업을 많이 수행할 수 있음.*
### Multi-indexes
**groupby()** 는 실행하는 작업에 따라 다중 인덱스라는 결과를 초래함.
~~~python
countries_reviewed = reviews.groupby(['country', 'province']).description.agg([len])
countries_reviewed
mi = countries_reviewed.index
type(mi)
~~~
다중 지수는 단일 수준 지수에는 없는 계층 구조를 처리하기 위한 몇 가지 방법이 있음. 또한 값을 검색하려면 두 가지 수준의 레이블이 필요. 다중 인덱스 출력을 처리하는 것은 pandas를 처음 사용하는 사용자에게 일반적인 gotcha임.

reset_index() : 일반적으로 가장 자주 사용하는 다중 인덱스 방법
### Sorting
countries_reviewed 를 보면 값 순서가 아닌 인덱스 순서로 데이터를 반환. *즉, 그룹의 결과를 출력할 땐 행 순서는 데이터가 아닌 **인덱스의 값**에 따라 달라짐*  
sort_values() : 원하는 순서대로 데이터를 가져오려면 직접 분류할때 사용. 오름차순-default 내림차순 - ascending=False
~~~python
countries_reviewed = countries_reviewed.reset_index()
countries_reviewed.sort_values(by='len')
~~~
sort_index() : 인덱스값을 기준으로 정렬
~~~python
countries_reviewed.sort_index()
countries_reviewed.sort_values(by=['country', 'len'])
# 2개 이상의 열을 기준으로 정렬.
~~~
# Data Types and Missing Values
*데이터 프레임 또는 시리즈 내에서 데이터유형 조사하는 방법 배움. 항목을 찾고 바꾸는 방법도 배움*
### Dtypes
dtypes : 데이터 프레임 또는 시리즈의 열에 대한 데이터 유형. 이 속성을 사용해 특정 열의 유형을 가져올 수있음
~~~python
reviews.dtypes
~~~
문자열로 구성된 열은 <span style ="color:red">**object**</span>유형 가짐
astype() : 하나의 타입의 열을 다른 타입으로 변환시켜줌
~~~python
reviews.points.astype('float64')
reviews.index.dtype
~~~
### Missing data
누락된 항목이 있는 경우엔 Not a number 의 줄임말인 **NaN**(기술적인 이유로 항상 float64 dtype)  
판다스는 누락된 데이터에 몇개의 특정한 메서드를 제공. NaN을 선택하기 위해선 *pd.isnull()* 사용  
결측값을 바꾸는것은 일반적인 작업. 판다스는 이 문제들을 해결하기위한 메서드를 제공 : *fillna()*  
replace(a,b): null이 아닌 값 a를 b로 바꿈
~~~python
reviews[pd.isnull(reviews.country)]
reviews.region_2.fillna("Unknown")
reviews.taster_twitter_handle.replace("@kerinokeefe", "@kerino")
~~~
# Rename and Combining
데이터는 우리가 만족하지않는 열 이름, 인덱스 이름 또는 다른 명명 규칙과 함께 나타남. 이 경우, 판다스의 기능을 사용해 문제가 되는 항목의 이름을 더 나은 항목으로 변경하는 방법 배움 . 또한 여러 데이터 프레임 및 시리즈의 데이터를 결합하는 방법에 대해서도 알아봄.
### Renaming 
rename(): 인덱스 이름 &/or 열 이름 변경 가능. 다양한 입력 형식을 지원하지만 파이썬의 딕셔너리가 가장 편함  
**df.rename(columns={'기존이름' : '새로운 이름'}, index={'기존이름' : '새로운 이름'})**  
set_index() : 열 이름은 자주 변경죄미나 인덱스 값 이름은 거의 변경되지 않음. 그러기에 set_index()가 더 편리함
~~~python
reviews.rename(columns={'points': 'score'})
~~~
### Combining
데이터셋 작업을 수행할때, 서로 다른 데이터 프레임 &/or 시리즈를 단순하지 않은 방식으로 결합해야하는 경우 -> 복잡도가 증가하는 순 : **concat()**, **join()**, merge()
concat() : 서로 다른  DataFrame 또는 시리즈의 객체에 데이터가 있지만 필드가 동일한 경우에 유용. 
~~~python
# 지역에 따라 데이터를 분할하는  YouTube Videos 데이터 세트
# 여러 국가를 동시에 연구하려면 concat()을 이용해 나눌수있다.
canadian_youtube = pd.read_csv("../input/youtube-new/CAvideos.csv")
british_youtube = pd.read_csv("../input/youtube-new/GBvideos.csv")
pd.concat([canadian_youtube, british_youtube])
~~~
join() : 공통 인덱스를 가진 다양한 DataFrame개체 결합 가능
~~~python
# 캐나다와 영국에서 같은 날 유행하는 비디오 제거
left = canadian_youtube.set_index(['title', 'trending_date'])
right = british_youtube.set_index(['title', 'trending_date'])

left.join(right, lsuffix='_CAN', rsuffix='_UK')
~~~