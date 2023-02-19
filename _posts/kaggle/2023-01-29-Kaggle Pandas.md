---
title: Pandas - 데이터분석을 위한 라이브러리(Kaggle)
layout: post   
categories : Programming kaggle Data Python
image : /assets/img/수료증/정소영-판다스수료증.png
description: 데이터분석에 필수적인 판다스
customexcerpt: Pandas - 데이터분석을 위한 라이브러리에 대해 살펴보자
---

# Pandas - 데이터분석을 위한 라이브러리

## 1. Creating, Reading and Writing


```python
#판다스 사용 방법
import pandas as pd
```
### Creating data - Series, DataFrame
판다스에서 2가지의 기본 데이터 구조 : 시리즈, 데이터 프레임
>시리즈(Series)
>- 일련의 데이터값
>- 데이터 프레임의 단일 열이다.
>- 리스트(list)와 딕셔너리(dic) 형식으로 생성
>- 모든 데이터 유형(정수, 실수, 문자열 등) 사용 가능
>```python
>pd.Series(data, index=index, name=name)
>
>pd.Series([1,2,3,4,5]) #list 형식
>
>#결과
>0 1
>1 2
>2 3
>3 4
>4 5
>dtype: int64
>
>pd.Series({'a':1,'b':2, 'c':3, 'd':4, 'e':5}) #dic 형식
>
>#결과
>a 1
>b 2
>c 3
>d 4
>e 5
>dtype: int64
>
>#별도로 행의 이름(index)과 시리즈의 이름(name)을 입력하지 않으면 index는 0부터 시작, name은 빈 값(None)으로 주어진다. (열이름 따로 없음)
>
>
>pd.Series([30, 35, 40], index=['apple', 'banana', 'caret'], name='Product')
>
>#결과
>apple 30
>banana 35
>caret 40
>Name : Product, dtype: int64
>
>
>pd.Series({'a':1,'b':2, 'c':3, 'd':4, 'e':5}, name="test")
>
>#결과
>a 1
>b 2
>c 3
>d 4
>e 5
>Name: test, dtype: int64
>```

>데이터 프레임(DataFrame)
>- 행과 열로 되어있는 2차원 테이블, 각 열은 시리즈로 되어있다.
>- 리스트, 딕셔너리, 넘파이 배열을 데이터 프레임으로 변환할 수 있다.
>```python
>pd.DataFrame([[1,2,3],[4,5,6]]) #list 형식
>
>#결과
>   0 1 2
>0 1 2 3
>1 4 5 6
>
>pd.DataFrame({'Yes': [50,21], 'No' : [131, 2]}) #dic 형식
>
>#결과
>     Yes   No
>0   50   131
>1   21    2
>
>pd.DataFrame({
>                'age' : [10,20,30],
>                'grade' : [85,50,67]},
>                 index=['anna', 'bob', 'cindy'])
>
>#결과
>       age  grade
>anna   10    85
>bob    20    50
>cindy  30    67
>
>#인덱스는 자동으로 생성되지만 index로 이름을 지정할 수 있다.
>```

### Reading data files
데이터는 다양한 형태와 포맷들로 무수히 저장될 수 있다.  
CSV(Comma - Separated Values) 파일 자주 사용
```python
#csv파일을 데이터프레임으로 읽는 방법
import panas as pd
df = pd.read_csv('파일경로/파일이름.csv') 

df = pd.read_csv('파일경로/파일이름.csv', index_col=0) 
#csv파일 속 인덱스열이 데이터프레임의 첫번째 칼럼으로 들어감 -> index_col로 제거
```
```python
df.shape #데이터 프레임의 행과 열 갯수를 튜플형태로 출력 => (행, 열)

df.head(n) #상위 n줄의 데이터 프레임 내용 확인(기본값 5)
df.tail(n) #하위 n줄의 데이터 프레임 내용 확인(기본값 5)

df.to_csv('저장경로/파일명') # 데이터 프레임을 csv파일로 저장
```
---
---
## 2. Indexing, Selecting & Assinggning

```python
#열 조회 
df.열이름
df['열이름']


#특정 열의 특정 행 값 출력
df['열이름'][숫자 or 문자]
df.'열이름'[숫자 or 문자]
``` 

### indexing in pandas
인덱스 연산자와 속성 선택은 파이썬처럼 사용하면 되지만 판다스에서는 loc, iloc 을 사용한다. (행조회)  
loc과 iloc 둘다 첫번째 []에는 행을, 두번째 []에는 열 번호를 입력한다.  
(주의! 파이썬 :  첫번째 []에 열, 두번째 []에는 행번호 입력)  


#### index-baced selection
iloc : 행 번호를 기준으로 접근(0,1,2,3,4,... 불변)
```python
#특정 행 조회
df.iloc[행번호]

#특정 행, 특정 열 조회
df.iloc[행번호, 열번호]

#여러개의 행 조회
df.iloc[[0,1,2]]
df.iloc[0:n] #첫번째부터 n-1까지
df.iloc[-n:] #끝에서 n번째부터 처음까지 
```

#### Label-based selection
loc : 인덱스 기준으로 접근
```python
#특정 행 조회
df.loc['행이름']

#특정 행 특정 열 조회
df.loc['행 이름', '열이름']

#여러개의 행이나 열 조회시 리스트[] 사용
df.loc[['행 이름1', '행 이름2'], ['열이름1','열 이름2']]

```

#### loc과 iloc의 차이점
```python
loc[0:10] # 0,1,2,3,4,5,6,7,8,9,10 
iloc[0:10] # 0,1,2,3,4,5,6,7,8,9 (파이썬의 인덱스 체계 사용)

df.loc[0:1000] # 1001개
df.iloc[0:1000] # 1000개
```

### Manioulating the index - 인덱스 다루는 방법
```python
df.set_index('인덱스 column이름')
df.set_index(['column 이름1', 'column 이름2']) #다중 인덱스 지정
```

#### Conditional selection
```python
df.열이름 == '특정 단어' #True/False
df.loc[df.열이름 == '특정 단어'] 
df.loc[(df.열이름 == '특정 단어1') & (df.열이름 == '특정 단어2'))] #조건 추가하고 싶으면  &, | 사용
df.loc[df.열이름.isin(['단어1', '단어2'])] # 값이 값 목록에 있는 데이터를 선택할 수 있음
df.loc[df.열이름.notnull()] # null이 아닌 값들을 추출
```
#### Assinging data - 데이터 할당
```python
df.['새로운 열이름']='새로운 값' #연속적인 값도 가능
```
---
---

## 3. Summary Funtions and Maps
데이터가 항상 즉시 원하는 형식으로 있지 않다.  
원하는 데이터를 적절하게 얻기 위해 데이터에 적용할 수 있는 다양한 작업
### Summary functions
```python
# 데이터프레임 전체의 요약 정보 출력
df.describe

#특정 열에 대한 요약 정보 출력
df.열이름.describe() 
df[['열이름1', '열이름2']].describe() # 2개 이상의 열 요약정보 출력시 컬럼을 묶어서 처리

df.열이름.mean() # 데이터 프레임, 시리즈의 해당 열에 대한 평균

df.열이름.unique() #유일한 값 보기(결측값 포함)

df.열이름.value_counts() # 각 열의 값 발생 횟수 총합
```
describe()는 기본적으로 결측값은 제외하고 데이터 요약을 해준다.

### Maps

```python
df.열이름.map(값을 변경하기 위한 식) # 해당 열에 있는 값들을 가공

df.apply(값을 변경하기 위한 식) # 데이터프레임 전체 값을 가공
df.열이름.apply(값을 변경하기 위한 식) # 해당 열에 있는 값들을 가공

df.idxmax()

axis=0 row
axis=1 column

#데이터프레임끼리 기본 연산자 적용 가능
```
map과 apply의 차이점
- map : 단일컬럼 O, 시리즈에만 적용가능 (데이터 프레임 적용 X)
- apply : 단일컬럼 O 다중컬럼 O,  시리즈, 데이터프레임 모두 적용 가능 
---
---

## 4. Grouping and Sorting
### Groupwise analysis
```python
df.groupby('열이름') #특정 열 기준으로 그룹화
df.groupby(['열이름1', '열이름2']) # 2개이상의 컬럼을 그룹화시 칼럼을 묶어서 처리

df.groupby(['열이름1']).'열이름2'.agg([함수]) #컬럼1에 대하여 컬럼2기준으로 함수를 동시에 실행
```
### Multi-indexes
```python
df.groupby(['열이름1', '열이름2']) #다중인덱스

multi_index = df.groupby(['열이름1', '열이름2'])
multi_index.reset_index() # 다중인덱스를 일반인덱스로 다시 변환
```
### Sorting
그룹의 결과를 출력할때 인덱스의 값에 따라 달라짐
그룹화가 인덱스 순서로 데이터를 반환
```python
df.sort_values(by='열이름') # 원하는 순서대로 데이터 반환, 기본: 오름차순 정렬
df.sort_values(by='열이름', ascending=False) # 내림차순 정렬
df.sort_values(by=['열이름1', '열이름2']) #한번에 2개이상의 열을 기준으로 정렬

df.sort_index() # 인덱스 값을 기준으로 정렬

df.size()
```
---
---
## 5. Data Types and Missing Values
### Dtypes
dtype : 데이터 프레임 또는 시리즈의 열에 대한 데이터 유형
```python
df.dtype # 모든 열의 데이터 유형 반환
df.열이름.dtype # 특정 열의 데이터 유형 확인
df.index.dtype # 인덱스에도 적용 가능
```
astype() : 데이터를 다른 유형으로 변환
```python
df.열이름.astype('float64') # int64 타입이었던 데이터를 float64로 변환
```
### Missing data
NaN : Not a Number, 데이터 타입 float64
```python
pd.isnull() #결측값을 True/False로 확인

df[pd.isnull(df.열이름)] #

pd.isnull().sum() # 결측값 갯수 확인

pd.notnull() #결측이 아닌 값을 True/False로 확인

df.fillna("Unknown") #결측값을 특정값("Unknown)으로 채우기  
```
---
---

## 6. Renaming and Combining

```python
df.rename(columns={'기존이름' : '새로운 이름'}, index={'기존이름' : '새로운 이름'}) # 열, 인덱스 이름 변경
```

일반적으로 열이름에 비해 인덱스 값이름을 변경하는 경우는 많이 없어서 set_index()사용하는게 편리할 수 있다.
```python
df.rename_axis('새로운 행이름', axis='rows').rename_axis('새로운 열이름', axis='columns')
```
### combining
데이터프레임, 시리즈를 결합하는 방법 : concat(), join(), merge()
()
```python
pd.concat([데이터프레임1, 데이터프레임2]) # 2개의 데이터프레임을 합침
```

![d](/assets/img/수료증/정소영-판다스수료증.png)