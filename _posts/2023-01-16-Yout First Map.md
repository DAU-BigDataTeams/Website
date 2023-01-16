---
title: 지리공간 분석 part1.  
layout: post   
categories : Geospatial, analysis, data, map
image : https://www.kaggleusercontent.com/kf/79128018/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..8ev4_DtKy5SdtfzaiZErZQ.Vu1uZ6Q4xLd8f0DFRXovHcJsZFIxk9EvhEf1dHzO2bOyvJ3Aht-eWv6ipIUQar-XZEeo47FejdK7rONAVO7b6i5oOYaFV2SZXUHG1TtV5QxbmX6Yc6M4_ZEx3tNehda8UhX2ZS1-_cwghacpPcNgDRRsQgTtYSaPTgqO8uLeUU2owtt3WoETTk-IBjzQZ1zFijr02G1cBNdO_RewFm00UU68l8tH72rO0J6ZJlUCzmnvFM9XbYzotIF1_cG9awVgZb9TxNarA5jyNQapWh0O9zQLPUqV-OelkPF_9Y44VBqBPLqJuBw54k3v-16VQ3nGRhZinVXi8m50crIbHWU_rsl3HNtkakOrHZikwDgGAU4AyI57ychKXy9T_kk4K5z1lQH6TbAF6ObaiACWONBEHlHPIXqmPtpnt-LNMtwqwdXAPTDizyMexD-GxGGguuwsiedW7xk716nWhxCSiULwMUnwSgtrbu0hKfD50Gnr1FK8hVs9CL86u2-e90g5XThwjSyhlDONNeIR9YT9GHm1-eBI-EaD0A-zryriuz81bMlEwjMKWx5YC48yS0mKTsuC1-p5C2-cGKrwNCcj0xX-299K2-lVO_YaC_xfRyW0u7jz2J7Ooa8H_7TbyfMUG0rVxsJBrCAPaeA0CfJ-oPbBjfyWXQZeRAaZ0KTzWuvuddY.jkO4q_TZgO6GB2fCWNm1zg/__results___files/__results___19_1.png
description: 지리 공간 데이터 또는 지리적 위치가 있는 데이터를 랭글링 및 시각화하는 다양한 방법 소개 
customexcerpt: Geopandas를 이용해 간단한 지도 시각화
---


# Geospatial Analysis (지리공간 분석)
[Content]
1. [Your First Map](#your-first-map)  
<!--2. [Coordinate Reference Systems(좌표계)](#Coordinate Reference Systems(좌표계))-->
<!--3. Interactive Maps(상호작용하는 지도)-->
<!--4. Manipulating Geospatial Data(지리 공간 데이터 조작)-->
<!--5. Proximity Analysis(근접도 분석)-->

# Your First Map
해당 챕터는 지리 공간 데이터 또는 지리적 위치가 있는 데이터를 랭글링하고 시각화하는 다양한 방법에 대해 알려준다.  
> 데이터 랭글링? 원천 데이터를 시각화 OR Input으로 활용하기 위해 사전 준비 과정을 말함. 데이터 랭글링에 6단계가 있다는데 스스로 찾아보자.  

이번 챕터는 아래 제시하는 문제점에 솔루션을 제공하는 방법을 학습한다.

- 글로벌 비영리 단체가 필리핀의 외딴 지역에서 활동 범위를 확장해야 하는 곳은 어디입니까?
- 멸종 위기에 처한 새 종인 보라색 마틴은 북미와 남미 사이를 어떻게 여행합니까? 새들이 보호 구역으로 이동하고 있습니까?
- 추가 지진 보강으로 잠재적 이익을 얻을 수 있는 일본의 지역은 어디입니까?
- 캘리포니아의 어느 스타벅스 매장이 다음 스타벅스 리저브 로스터리 매장으로 유력한 후보입니까?
- 뉴욕시에는 자동차 충돌에 대처할 수 있는 충분한 병원이 있습니까? 도시의 어느 지역에 적용 범위에 차이가 있습니까?

그 밖에 보스턴 시의 범죄를 시각화, 가나의 의료시설 조사 등을 수행한다.

> 해당 과정을 조금 더 깊게 공부하고싶다면 Pandas 교육을 이수하는 걸 추천합니다~  

## Reading Data
----
`GeoPandas`라이브러리를 활용해서 데이터를 읽어보자
~~~py
import geopandas as gpd
~~~

지리공간 파일형식은 다양하다 (ex. shapefile, GeoJSON 등..) 하지만 지리공간 분석 교육과정에서 다루지는 않습니다🤣  
다만, shapefile은 지리공간 분석을 진행한다면 자주 접할 것이며, 이런 파일형식들은 `gpd.read_file()`이라는 메서드로 수행된다.

아래 코드는 kaggle에서 제공하는 데이터(숲, 황무지 및 기타 토지에 대한 데이터)를 shapefile로 load함

~~~py
full_data = gpd.read_file("../input/geospatial-learn-course-data/DEC_lands/DEC_lands/DEC_lands.shp") # 데이터 로드
full_data.head() # pandas 와 동일한 메서드(상위 5개 출력)
~~~ 

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>OBJECTID</th>
      <th>CATEGORY</th>
      <th>UNIT</th>
      <th>FACILITY</th>
      <th>CLASS</th>
      <th>UMP</th>
      <th>DESCRIPTIO</th>
      <th>REGION</th>
      <th>COUNTY</th>
      <th>URL</th>
      <th>SOURCE</th>
      <th>UPDATE_</th>
      <th>OFFICE</th>
      <th>ACRES</th>
      <th>LANDS_UID</th>
      <th>GREENCERT</th>
      <th>SHAPE_AREA</th>
      <th>SHAPE_LEN</th>
      <th>geometry</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>FOR PRES DET PAR</td>
      <td>CFP</td>
      <td>HANCOCK FP DETACHED PARCEL</td>
      <td>WILD FOREST</td>
      <td>None</td>
      <td>DELAWARE COUNTY DETACHED PARCEL</td>
      <td>4</td>
      <td>DELAWARE</td>
      <td>http://www.dec.ny.gov/</td>
      <td>DELAWARE RPP</td>
      <td>5/12</td>
      <td>STAMFORD</td>
      <td>738.620192</td>
      <td>103</td>
      <td>N</td>
      <td>2.990365e+06</td>
      <td>7927.662385</td>
      <td>POLYGON ((486093.245 4635308.586, 486787.235 4...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>FOR PRES DET PAR</td>
      <td>CFP</td>
      <td>HANCOCK FP DETACHED PARCEL</td>
      <td>WILD FOREST</td>
      <td>None</td>
      <td>DELAWARE COUNTY DETACHED PARCEL</td>
      <td>4</td>
      <td>DELAWARE</td>
      <td>http://www.dec.ny.gov/</td>
      <td>DELAWARE RPP</td>
      <td>5/12</td>
      <td>STAMFORD</td>
      <td>282.553140</td>
      <td>1218</td>
      <td>N</td>
      <td>1.143940e+06</td>
      <td>4776.375600</td>
      <td>POLYGON ((491931.514 4637416.256, 491305.424 4...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>FOR PRES DET PAR</td>
      <td>CFP</td>
      <td>HANCOCK FP DETACHED PARCEL</td>
      <td>WILD FOREST</td>
      <td>None</td>
      <td>DELAWARE COUNTY DETACHED PARCEL</td>
      <td>4</td>
      <td>DELAWARE</td>
      <td>http://www.dec.ny.gov/</td>
      <td>DELAWARE RPP</td>
      <td>5/12</td>
      <td>STAMFORD</td>
      <td>234.291262</td>
      <td>1780</td>
      <td>N</td>
      <td>9.485476e+05</td>
      <td>5783.070364</td>
      <td>POLYGON ((486000.287 4635834.453, 485007.550 4...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>FOR PRES DET PAR</td>
      <td>CFP</td>
      <td>GREENE COUNTY FP DETACHED PARCEL</td>
      <td>WILD FOREST</td>
      <td>None</td>
      <td>None</td>
      <td>4</td>
      <td>GREENE</td>
      <td>http://www.dec.ny.gov/</td>
      <td>GREENE RPP</td>
      <td>5/12</td>
      <td>STAMFORD</td>
      <td>450.106464</td>
      <td>2060</td>
      <td>N</td>
      <td>1.822293e+06</td>
      <td>7021.644833</td>
      <td>POLYGON ((541716.775 4675243.268, 541217.579 4...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>6</td>
      <td>FOREST PRESERVE</td>
      <td>AFP</td>
      <td>SARANAC LAKES WILD FOREST</td>
      <td>WILD FOREST</td>
      <td>SARANAC LAKES</td>
      <td>None</td>
      <td>5</td>
      <td>ESSEX</td>
      <td>http://www.dec.ny.gov/lands/22593.html</td>
      <td>DECRP, ESSEX RPP</td>
      <td>12/96</td>
      <td>RAY BROOK</td>
      <td>69.702387</td>
      <td>1517</td>
      <td>N</td>
      <td>2.821959e+05</td>
      <td>2663.909932</td>
      <td>POLYGON ((583896.043 4909643.187, 583891.200 4...</td>
    </tr>
  </tbody>
</table>  

이 교육과정의 나머지 부분에서 해당 데이터를 사용하여 주말 캠핑 여행을 계획하려는 시나리오를 고려한다. 이렇게하면 뭐 관심사에 맞게 여행이 조정가능하다나..


## Prerequisites
----

참고로 GeoPandas의 모든 메서드는 Pandas와 동일하다.  
> DataFrame의 모든 기능이 있는 GeoDataFrame 개체에 로드되어서 그럼

당연히 Type을 출력하면 `geopandas`객체 형태로 나올 것이다.
~~~py
type(full_data)
~~~
out : ```geopandas.geodataframe.GeoDataFrame```  

당연히 일부 Column을 추출하는 것도 가능하다.

~~~py
data = full_data.loc[:, ["CLASS", "COUNTY", "geometry"]].copy() # copy()는 경고 방지
~~~

`value_counts()`메서드를 통해서 토지 유형과 수를 관측할 수 있다.
~~~py
data.CLASS.value_counts() # CLASS 열에 대해 적용
~~~
out: 
~~~
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
~~~ 

뭐 loc, iloc 및 isin을 사용해서 데이터의 하위 집합을 선택할 수 있음.
~~~py
wild_lands = data.loc[data.CLASS.isin(['WILD FOREST', 'WILDERNESS'])].copy()
wild_lands.head()
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>CLASS</th>
      <th>COUNTY</th>
      <th>geometry</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>WILD FOREST</td>
      <td>DELAWARE</td>
      <td>POLYGON ((486093.245 4635308.586, 486787.235 4...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>WILD FOREST</td>
      <td>DELAWARE</td>
      <td>POLYGON ((491931.514 4637416.256, 491305.424 4...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>WILD FOREST</td>
      <td>DELAWARE</td>
      <td>POLYGON ((486000.287 4635834.453, 485007.550 4...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>WILD FOREST</td>
      <td>GREENE</td>
      <td>POLYGON ((541716.775 4675243.268, 541217.579 4...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>WILD FOREST</td>
      <td>ESSEX</td>
      <td>POLYGON ((583896.043 4909643.187, 583891.200 4...</td>
    </tr>
  </tbody>
</table>

## Create your first map!
----
GeoPandas를 사용해서 빠르게 지도를 시각화 해보자.

~~~py
wild_lands.plot() # 앞서 만들어둔 객체
~~~
![결과](https://www.kaggleusercontent.com/kf/79128018/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..8ev4_DtKy5SdtfzaiZErZQ.Vu1uZ6Q4xLd8f0DFRXovHcJsZFIxk9EvhEf1dHzO2bOyvJ3Aht-eWv6ipIUQar-XZEeo47FejdK7rONAVO7b6i5oOYaFV2SZXUHG1TtV5QxbmX6Yc6M4_ZEx3tNehda8UhX2ZS1-_cwghacpPcNgDRRsQgTtYSaPTgqO8uLeUU2owtt3WoETTk-IBjzQZ1zFijr02G1cBNdO_RewFm00UU68l8tH72rO0J6ZJlUCzmnvFM9XbYzotIF1_cG9awVgZb9TxNarA5jyNQapWh0O9zQLPUqV-OelkPF_9Y44VBqBPLqJuBw54k3v-16VQ3nGRhZinVXi8m50crIbHWU_rsl3HNtkakOrHZikwDgGAU4AyI57ychKXy9T_kk4K5z1lQH6TbAF6ObaiACWONBEHlHPIXqmPtpnt-LNMtwqwdXAPTDizyMexD-GxGGguuwsiedW7xk716nWhxCSiULwMUnwSgtrbu0hKfD50Gnr1FK8hVs9CL86u2-e90g5XThwjSyhlDONNeIR9YT9GHm1-eBI-EaD0A-zryriuz81bMlEwjMKWx5YC48yS0mKTsuC1-p5C2-cGKrwNCcj0xX-299K2-lVO_YaC_xfRyW0u7jz2J7Ooa8H_7TbyfMUG0rVxsJBrCAPaeA0CfJ-oPbBjfyWXQZeRAaZ0KTzWuvuddY.jkO4q_TZgO6GB2fCWNm1zg/__results___files/__results___13_1.png)


> **이게 가능한 이유? 모든 GeoPandas의 DataFrame에는 `geometry`라는 컬럼이 포함되어있는데 이것은 `plot()`메서드를 호출했을 때 표시되는 지도 객체를 포함함**  
> 다르게 말하면 `geometry`가 없으면 `plot()`메서드로 지도 시각화는 못 함.  



**`geometry`열에는 보통 `Point`, `LineString`, `Polygon` 형태다. 아래 그림으로 대충 이해하자**
![geomety데이터 형태](https://i.imgur.com/N1llefr.png)

~~~py
# Campsites in New York state (Point) => 어떤 대상의 위치
POI_data = gpd.read_file("../input/geospatial-learn-course-data/DEC_pointsinterest/DEC_pointsinterest/Decptsofinterest.shp")
campsites = POI_data.loc[POI_data.ASSET=='PRIMITIVE CAMPSITE'].copy()

# Foot trails in New York state (LineString) => 약간 이동 경로 느낌
roads_trails = gpd.read_file("../input/geospatial-learn-course-data/DEC_roadstrails/DEC_roadstrails/Decroadstrails.shp")
trails = roads_trails.loc[roads_trails.ASSET=='FOOT TRAIL'].copy()

# County boundaries in New York state (Polygon) => 경계 (컨벡스 홀 느낌)
counties = gpd.read_file("../input/geospatial-learn-course-data/NY_county_boundaries/NY_county_boundaries/NY_county_boundaries.shp")
~~~

이것들로 지도를 만든다면?

~~~py
# Define a base map with county boundaries
ax = counties.plot(figsize=(10,10), color='none', edgecolor='gainsboro', zorder=3)

# Add wild lands, campsites, and foot trails to the base map
wild_lands.plot(color='lightgreen', ax=ax)
campsites.plot(color='maroon', markersize=2, ax=ax)
trails.plot(color='black', markersize=1, ax=ax)
~~~
![완성된-지도](https://www.kaggleusercontent.com/kf/79128018/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..8ev4_DtKy5SdtfzaiZErZQ.Vu1uZ6Q4xLd8f0DFRXovHcJsZFIxk9EvhEf1dHzO2bOyvJ3Aht-eWv6ipIUQar-XZEeo47FejdK7rONAVO7b6i5oOYaFV2SZXUHG1TtV5QxbmX6Yc6M4_ZEx3tNehda8UhX2ZS1-_cwghacpPcNgDRRsQgTtYSaPTgqO8uLeUU2owtt3WoETTk-IBjzQZ1zFijr02G1cBNdO_RewFm00UU68l8tH72rO0J6ZJlUCzmnvFM9XbYzotIF1_cG9awVgZb9TxNarA5jyNQapWh0O9zQLPUqV-OelkPF_9Y44VBqBPLqJuBw54k3v-16VQ3nGRhZinVXi8m50crIbHWU_rsl3HNtkakOrHZikwDgGAU4AyI57ychKXy9T_kk4K5z1lQH6TbAF6ObaiACWONBEHlHPIXqmPtpnt-LNMtwqwdXAPTDizyMexD-GxGGguuwsiedW7xk716nWhxCSiULwMUnwSgtrbu0hKfD50Gnr1FK8hVs9CL86u2-e90g5XThwjSyhlDONNeIR9YT9GHm1-eBI-EaD0A-zryriuz81bMlEwjMKWx5YC48yS0mKTsuC1-p5C2-cGKrwNCcj0xX-299K2-lVO_YaC_xfRyW0u7jz2J7Ooa8H_7TbyfMUG0rVxsJBrCAPaeA0CfJ-oPbBjfyWXQZeRAaZ0KTzWuvuddY.jkO4q_TZgO6GB2fCWNm1zg/__results___files/__results___19_1.png)

**이때 중요한 것은 ax라는 값을 통해서 동일한 지도에 표시하게 하는 점**

