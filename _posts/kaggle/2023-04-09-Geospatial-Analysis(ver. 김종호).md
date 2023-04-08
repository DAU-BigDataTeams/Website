---  
title: 포스트 제목을 작성해주세요(이왕이면 흥미있는 제목 선택)  
layout: post  (건들지 말아주세요)   
categories : [python-study, ] (포스트에 대한 키워드입니다 HashTag라고 생각하면 좋아요 띄어쓰기는 불가하니 '-'를 통해 이어주세요. 단, python-study는 지우지 말아주세요 ex. big-data 또한 대소문자 구별이 필요합니다.)  
image : 건들지 말아주세요
description:  (글 설명인데 제목과 동일하게 하면 됩니다.)  
customexcerpt: (포스트 썸네일 아래 짧게 적히는 글입니다. 흥미롭게 작성하거나 글 첫 서론 1~2문장을 적어주면 됩니다.)  
---

<span class = "alert g">작성자 : 김종호</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# Geospatial Analysis

## 1. Your First Map
---
### 1.1 Introduction
---

![post0](/assets/img/Geospatial/Geospatial_Analysis_0.png)

다음과 같은 문제를  <strong> Geospatial Analysis </strong>을 통해 해결책을 제시할 수 있다.

- 세계적인 비영리 단체가 필리핀에 진출하지 않은 곳은 어디인가?
- 멸종위기종 보라색 마틴의 북미와 남미 간 이동 경로를 파악하고 새들이 자연보호구역으로 오가는가?
- 캘리포니아 주의 스타벅스 중 다음 리저브 로스터리 매장으로 유력한 후보지는 어디인가?
- 일본에서 추가적인 지진 보강으로 얻을 수 있는 잠재적 이익이 가장 큰 지역은 어디인가?
- 뉴욕시는 차량 사고에 대처할 수 있는 충분한 병원이 있는가? 도시의 어떤 지역이 차량 사고 대응에 취약한가?
- 부산시 어르신 놀이터 최적 입지는 어디인가?

또한 보스턴시의 범죄 현황을 시각화하고, 유럽의 우수 대학을 탐색할 수 있다.

### 1.2 Reading data
---
첫 번째 단계는 지리공간 데이터를 읽어오는 것이다. 이를 위해서는 Geopandas 라이브러리가 필요하다.

~~~ py
import geopandas as gpd
~~~

다양한 지리공간 파일 형식이 존재한다. 예를 들면 shapefile, GeoJSON, KML, GPKG 등이 있다. 이 과정에서는 이들 파일 형식의 차이점에 대해서는 다루지 않는다. 가장 일반적으로 사용되는 지리공간 파일 형식은 Shaplefile이라는 점만 알아두자.

모든 지리공간 파일 형식은 <strong> gpd.read_file() </strong> 함수를 사용하여 
이용할 수 있다.

다음 코드는 뉴욕 주에서 환경 보호국이 관리하는 산림, 야생 지역 등에 대한 정보가 들어있는 shapefile를 로드한다.

~~~ py
full_data = gpd.read_file("../input/geospatial-learn-course-data/DEC_lands/DEC_lands/DEC_lands.shp")

# 불러온 데이터의 상위 5개 행 출력
full_data.head()
~~~

| OBJECTID | OBJECTID | CATEGORY         | UNIT | FACILITY                         | CLASS       | UMP           | DESCRIPTIO                      | REGION | COUNTY   | URL                                    | SOURCE           | UPDATE_ | OFFICE    | ACRES      | LANDS_UID | GREENCERT | SHAPE_AREA   | SHAPE_LEN   | geometry                                          |
|----------|----------|------------------|------|----------------------------------|-------------|---------------|---------------------------------|--------|----------|----------------------------------------|------------------|---------|-----------|------------|-----------|-----------|--------------|-------------|---------------------------------------------------|
| 0        | 1        | FOR PRES DET PAR | CFP  | HANCOCK FP DETACHED PARCEL       | WILD FOREST | None          | DELAWARE COUNTY DETACHED PARCEL | 4      | DELAWARE | http://www.dec.ny.gov/                 | DELAWARE RPP     | 5/12    | STAMFORD  | 738.620192 | 103       | N         | 2.990365e+06 | 7927.662385 | POLYGON ((486093.245 4635308.586, 486787.235 4... |
| 1        | 2        | FOR PRES DET PAR | CFP  | HANCOCK FP DETACHED PARCEL       | WILD FOREST | None          | DELAWARE COUNTY DETACHED PARCEL | 4      | DELAWARE | http://www.dec.ny.gov/                 | DELAWARE RPP     | 5/12    | STAMFORD  | 282.553140 | 1218      | N         | 1.143940e+06 | 4776.375600 | POLYGON ((491931.514 4637416.256, 491305.424 4... |
| 2        | 3        | FOR PRES DET PAR | CFP  | HANCOCK FP DETACHED PARCEL       | WILD FOREST | None          | DELAWARE COUNTY DETACHED PARCEL | 4      | DELAWARE | http://www.dec.ny.gov/                 | DELAWARE RPP     | 5/12    | STAMFORD  | 234.291262 | 1780      | N         | 9.485476e+05 | 5783.070364 | POLYGON ((486000.287 4635834.453, 485007.550 4... |
| 3        | 4        | FOR PRES DET PAR | CFP  | GREENE COUNTY FP DETACHED PARCEL | WILD FOREST | None          | None                            | 4      | GREENE   | http://www.dec.ny.gov/                 | GREENE RPP       | 5/12    | STAMFORD  | 450.106464 | 2060      | N         | 1.822293e+06 | 7021.644833 | POLYGON ((541716.775 4675243.268, 541217.579 4... |
| 4        | 6        | FOREST PRESERVE  | AFP  | SARANAC LAKES WILD FOREST        | WILD FOREST | SARANAC LAKES | None                            | 5      | ESSEX    | http://www.dec.ny.gov/lands/22593.html | DECRP, ESSEX RPP | 12/96   | RAY BROOK | 69.702387  | 1517      | N         | 2.821959e+05 | 2663.909932 | POLYGON ((583896.043 4909643.187, 583891.200 4... |



### 1.3 Prerequisites
---
GeoPandas는 파이썬에서 지리정보 데이터 처리의 기하학적 연산과 시각화 등을 돕는 패키지이다. GeoPandas에는 두 가지의 자료형 GeoSeries와 GeoDataFrame이 있다.GeoPandas는 이름에서 알 수 있듯이, Pandas와 비슷하며 다루는 방법에도 큰 차이가 없다. 

~~~ py
type(full_data)
~~~

<pre>
geopandas.geodataframe.GeoDataFrame
</pre>

판다스와 같이 일부 열만 추출하는 것도 가능하다.

~~~ py
data = full_data.loc[:, ["CLASS", "COUNTY", "geometry"]].copy()
~~~

value_counts() 메서드를 사용해서 다양한 토지 유형의 목록과 데이터 셋에 나타나는 횟수도 파악할 수 있다.

~~~ py
data.CLASS.value_counts()
~~~

<pre>
WILD FOREST                   965
INTENSIVE USE                 108
PRIMITIVE                      60
WILDERNESS                     52
ADMINISTRATIVE                 17
UNCLASSIFIED                    7
HISTORIC                        5
PRIMITIVE BICYCLE CORRIDOR      4
CANOE AREA                      1
Name: CLASS, dtype: int64
</pre>

loc, iloc, isin 도 사용가능하다.

~~~ py
wild_lands = data.loc[data.CLASS.isin(['WILD FOREST', 'WILDERNESS'])].copy()
wild_lands.head()
~~~

| CLASS | COUNTY      | geometry |                                                   |
|-------|-------------|----------|---------------------------------------------------|
| 0     | WILD FOREST | DELAWARE | POLYGON ((486093.245 4635308.586, 486787.235 4... |
| 1     | WILD FOREST | DELAWARE | POLYGON ((491931.514 4637416.256, 491305.424 4... |
| 2     | WILD FOREST | DELAWARE | POLYGON ((486000.287 4635834.453, 485007.550 4... |
| 3     | WILD FOREST | GREENE   | POLYGON ((541716.775 4675243.268, 541217.579 4... |
| 4     | WILD FOREST | ESSEX    | POLYGON ((583896.043 4909643.187, 583891.200 4... |


### 1.4 Create your first map!
---

plot() 메서드를 이용해서 데이터를 시각화 해보자

~~~ py

wild_lands.plot()
~~~

<!-- 사진1자리-->
![post1](/assets/img/Geospatial/Geospatial_Analysis_1.png)

GeoDataFrame은 <strong> "geometry" </strong> 이라는 특수한 열을 가지고 있다. plot() 메서드를 이용하면, GeoPandas 내부의 geometry 데이터를 손쉽게 시각화 할 수 있다. geometry 데이터는 지리정보를 표현하는 점, 선, 도형을 의미하는데 GeoPandas는 내부적으로 점, 선, 도형을 Shapely 패키지를 사용하여 처리한다.

<!-- 사진2자리-->
![post2](/assets/img/Geospatial/Geospatial_Analysis_2.png)

~~~ py
wild_lands.geometry.head()
~~~

<pre>
0    POLYGON ((486093.245 4635308.586, 486787.235 4...
1    POLYGON ((491931.514 4637416.256, 491305.424 4...
2    POLYGON ((486000.287 4635834.453, 485007.550 4...
3    POLYGON ((541716.775 4675243.268, 541217.579 4...
4    POLYGON ((583896.043 4909643.187, 583891.200 4...
Name: geometry, dtype: geometry
</pre>

wild_lands의 geometry 데이터는 POLYGON(다각형)인 것을 확인할 수 있다.

~~~ py
# 캠핑장 위치 (점) 
POI_data = gpd.read_file("../input/geospatial-learn-course-data/DEC_pointsinterest/DEC_pointsinterest/Decptsofinterest.shp")
campsites = POI_data.loc[POI_data.ASSET=='PRIMITIVE CAMPSITE'].copy()

# 하이킹 코스 (직선)
roads_trails = gpd.read_file("../input/geospatial-learn-course-data/DEC_roadstrails/DEC_roadstrails/Decroadstrails.shp")
trails = roads_trails.loc[roads_trails.ASSET=='FOOT TRAIL'].copy()

# 뉴욕 주 경계 (다각형)
counties = gpd.read_file("../input/geospatial-learn-course-data/NY_county_boundaries/NY_county_boundaries/NY_county_boundaries.shp")
~~~

아래 코드는 4개의 GeoDataFrame을 한 개의 지도에 나타나게 해준다.

~~~ py
# 지역 경계를 나타내는 지도 정의
ax = counties.plot(figsize=(10,10), color='none', edgecolor='gainsboro', zorder=3)

# 기본 맵에 3가지 추가
wild_lands.plot(color='lightgreen', ax=ax)
campsites.plot(color='maroon', markersize=2, ax=ax)
trails.plot(color='black', markersize=1, ax=ax)
~~~

<strong> 중요한점은 ax에 값을 설정해야 모든 정보를 동일한 지도 위에 표시할 수 있다는 점이다!<strong> 

<!-- 사진3 -->
![post3](/assets/img/Geospatial/Geospatial_Analysis_3.png)


