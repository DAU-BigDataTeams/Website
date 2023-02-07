# Grouping and Sorting
### Groupwise analysis
~~~python
# 그룹별 분석
reviews.groupby('points').points.count()
# groupby()는 주어진 와인에 대한 동일한 포인트 값을 할당하는 리뷰그룹을 만들었음. 이 그룹들 각각에 대해 points()열을 잡고 몇 번 나타났는지 세어 봄. 
~~~

value_counts()는 groupby()작업에 지름길
```python
# 각 포인트 값 범주에서 가장 저렴한 와인을 얻으려면 ?
reviews.groupby('points').price.min()
```
생성하는 각 그룹은 일치하는 값을 가진 데이터만 포함하는 DataFrame의 슬라이스. DataFrame은 apply()메서드를 이용해 우리가 직잡 접근가능. 그런 다음 우리가 적합하다고 생각하는 모든 방법으로 데이터 조작 가능.
```python
# 데이터 셋의 각 와이너리에서 검토한 첫 번째 와인의 이름을 선택
reviews.groupby('winery').apply(lambda df: df.title.iloc[0])
```
세분화를 위해 둘 이상의 열로 그룹화 가능
```python
reviews.groupby(['country', 'province']).apply(lambda df: df.loc[df.points.idxmax()])
```
*groupby()를 효과적으로 사용하는것은 데이터셋으로 정말 강력한 작업을 많이 수행할 수 있음.*
### Multi-indexes
**groupby()** 는 실행하는 작업에 따라 다중 인덱스라는 결과를 초래함.
~~~python
countries_reviewed = reviews.groupby(['country', 'province']).description.agg([len])
countries_reviewed
mi = countries_reviewed.index
type(mi)
~~~
다중 지수는 단일 수준 지수에는 없는 계층 구조를 처리하기 위한 몇 가지 방법이 있음. 또한 값을 검색하려면 두 가지 수준의 레이블이 필요. 다중 인덱스 출력을 처리하는 것은 pandas를 처음 사용하는 사용자에게 일반적인 gotcha임.<p>
reset_index() : 일반적으로 가장 자주 사용하는 다중 인덱스 방법
### Sorting
countries_reviewed 를 보면 값 순서가 아닌 인덱스 순서로 데이터를 반환. *즉, 그룹의 결과를 출력할 땐 행 순서는 데이터가 아닌 **인덱스의 값**에 따라 달라짐* <p>
sort_values() : 원하는 순서대로 데이터를 가져오려면 직접 분류할때 사용. 오름차순-default 내림차순 - ascending=False
~~~python
countries_reviewed = countries_reviewed.reset_index()
countries_reviewed.sort_values(by='len')
~~~
sort_index() : 인덱스값을 기준으로 정렬
```python
countries_reviewed.sort_index()
countries_reviewed.sort_values(by=['country', 'len'])
# 2개 이상의 열을 기준으로 정렬.
```
