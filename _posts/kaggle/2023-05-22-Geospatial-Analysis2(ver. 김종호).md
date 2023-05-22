---
title: Geospatial Analysis_2 지도를 시각화하는 방법에 대해서 학습해보자!
layout: post
categories : [kaggle,Geospatial-Analysis]
image : /assets/img/수료증/Certificate_Geo_analysis(jongho).png
description:  지도를 시각화하는 방법에 대해서 학습해보자!
customexcerpt:  지오코딩, 테이블 조인, 근접성 분석과 상호작용적인 지도를 활용하여 지리공간 데이터에서 유의미한 정보를 추출해보자!
---

<span class = "alert g">작성자 : 김종호</span>

# Geospatial Analysis

* random line to make it work. This will be removed.
{:toc} 

## 1. Interactive Maps
---

이 튜토리얼에서는 `folium` 패키지를 사용하여 대화형 지도를 만드는 방법에 대해 배우게 된다. 대화형 지도란 사용자가 지도 위의 요소를 클릭하거나 드래그하거나 특정 위치를 클릭할 경우 해당 위치를 확인할 수 있는 지도이다. 보스턴 지역의 범죄 데이터를 시각화함으로써 `folium`에 대해 학습해보자

~~~ py
import folium
from folium import Choropleth, Circle, Marker
from folium.plugins import HeatMap, MarkerCluster

m_1 = folium.Map(location=[42.32,-71.0589], tiles='openstreetmap', zoom_start=10)

m_1
~~~

<!-- 사진6자리-->
![post6](/assets/img/Geospatial/Geospatial_Analysis_6.png)

간단한 지도를 생성하는 코드이다. `folium.Map()` 에는 대표적인 매개변수로는
- `location` : 지도의 초기 중심 위치 설정(위도, 경도)
- `tiles` : 타일의 뜻은 작은 이미지 조각으로 나누어진 지도의 부분을 나타낸다. 위에서는 기본 타일인 OpenStreetMap을 사용했다. Mapbox Bright, Stamen Terrian, CartoDB posiron 등이 있다.
- `zoom_start` : 지도의 확대/축소를 설정한다. 값이 높을수록 지도가 더 가까이 확대된다.

### 1.1 Plotting points
---

이제 지도에 범죄 데이터를 추가해보자. 데이터 로딩 단계는 앞서 많이 봤기 때문에 스킵하고 데이터가 로드되었다고 가정하고 진행~

~~~ py
daytime_robberies = crimes[((crimes.OFFENSE_CODE_GROUP == 'Robbery') & \
                            (crimes.HOUR.isin(range(9,18))))]

# 지도 생성
m_2 = folium.Map(location=[42.32,-71.0589], tiles='cartodbpositron', zoom_start=13)

# 지도에 마커 추가
for idx, row in daytime_robberies.iterrows():
    Marker([row['Lat'], row['Long']]).add_to(m_2)

m_2                            
~~~

`folium.Marker()를 사용하여 지도에 마커를 추가한다. 각 마커에는 주간 강도 범죄가 발생한 위치데이터가 들어있다. 

<!-- 사진7자리-->
![post7](/assets/img/Geospatial/Geospatial_Analysis_7.png)


많은 수의 마커를 추가할 때 `folium.plugins.MarkerCluser()`를 사용하면 지도를 깔끔하게 유지하는데 도움이 된다. 각 마커는 MarkerCluster 객체에 추가된다.

~~~ py
# 지도 생성
m_3 = folium.Map(location=[42.32,-71.0589], tiles='cartodbpositron', zoom_start=13)

# 지도에 마커 추가
mc = MarkerCluster()
for idx, row in daytime_robberies.iterrows():
    if not math.isnan(row['Long']) and not math.isnan(row['Lat']):
        mc.add_child(Marker([row['Lat'], row['Long']]))
m_3.add_child(mc)

m_3
~~~

<!-- 사진8자리-->
![post8](/assets/img/Geospatial/Geospatial_Analysis_8.png)


다음과 같이 나타나며, 지도 확대 시 아래 그림과 같이 변화한다. 

<!-- 사진9자리-->
![post9](/assets/img/Geospatial/Geospatial_Analysis_9.png)


### 1.2 Bubble maps
---

Bubble maps은 마커 대신 원을 사용한다. 각 원의 크기와 색상을 다르게 함으로써 위치와 두 가지 다른 변수 간의 관계를 나타낼 수 있다.
`folium.Circle()`을 사용하여 원을 반복적으로 추가함으로써 Bubble map을 생성한다. 

~~~ py
# 지도 생성
m_4 = folium.Map(location=[42.32,-71.0589], tiles='cartodbpositron', zoom_start=13)

# 12시 이전은 forestgreen , 나머지는 darkred
def color_producer(val):
    if val <= 12:
        return 'forestgreen'
    else:
        return 'darkred'

# location - 위경도 위치 리스트
# radisu - 원 반지름
for i in range(0,len(daytime_robberies)):
    Circle(
        location=[daytime_robberies.iloc[i]['Lat'], daytime_robberies.iloc[i]['Long']],
        radius=20,
        color=color_producer(daytime_robberies.iloc[i]['HOUR'])).add_to(m_4)

# 
m_4
~~~

<!-- 사진10자리-->
![post10](/assets/img/Geospatial/Geospatial_Analysis_10.png)

`folium.Circle()`에 매개변수로는
- `location` : 지도의 초기 중심 위치 설정(위도, 경도)
- `radius` : 원의 반지름 설정
- `color` : 각 원의 색상을 설정

### 1.3 Heatmaps
---

`folium.plugins.HeatMap()`을 사용하여 Heatmap을 생성한다. 히트맵을 통해 도시에 범죄밀도를 시각화할 수 있으며, 빨간색 지역은 비교적 범죄 사건이 더 많은 지역을 나타낸다. 

~~~ py
# 지도 생성
m_5 = folium.Map(location=[42.32,-71.0589], tiles='cartodbpositron', zoom_start=12)

# radius - 히트맵의 부드러움을 제어, 값이 높을수록 히트맵은 더 부드럽게 표시된다.
HeatMap(data=crimes[['Lat', 'Long']], radius=10).add_to(m_5)

m_5
~~~

<!-- 사진11자리-->
![post11](/assets/img/Geospatial/Geospatial_Analysis_11.png)

대부분의 범죄는 도시 중심가에서 발생한 것을 볼 수 있다.

### 1.4 Choropleth maps
---

범죄가 경찰 관할구에 따라 어떻게 다른지 이해하기 위해 Choropleth map을 생성한다. Choropleth map이란 지리적 영역에 따라 데이터 값을 시각화하는 방법 중 하나이다. 이 맵은 지리적 영역의 다양한 영역에 대해 다른 색상 또는 색조로 구분된 데이터를 표현한다.

~~~ py
# GeoDataFrame with geographical boundaries of Boston police districts
districts_full = gpd.read_file('../input/geospatial-learn-course-data/Police_Districts/Police_Districts/Police_Districts.shp')
districts = districts_full[["DISTRICT", "geometry"]].set_index("DISTRICT")
districts.head()
~~~

<table>
<thead>
  <tr>
    <th></th>
    <th>geometry</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>DISTRICT</td>
    <td></td>
  </tr>
  <tr>
    <td>A15</td>
    <td>MULTIPOLYGON (((-71.07416 42.39051, -71.07415 ...</td>
  </tr>
  <tr>
    <td>A7</td>
    <td>MULTIPOLYGON (((-70.99644 42.39557, -70.99644 ...</td>
  </tr>
  <tr>
    <td>A1</td>
    <td>POLYGON ((-71.05200 42.36884, -71.05169 42.368...</td>
  </tr>
  <tr>
    <td>C6</td>
    <td>POLYGON ((-71.04406 42.35403, -71.04412 42.353...</td>
  </tr>
  <tr>
    <td>D4</td>
    <td>POLYGON ((-71.07416 42.35724, -71.07359 42.357...</td>
  </tr>
</tbody>
</table>


~~~ py
#plot_dict : 각 구역별 범죄 발생 건수를 보여주는 Pandas Series
plot_dict = crimes.DISTRICT.value_counts()
plot_dict.head()
~~~
<pre>
D4     2885 
B2     2231 
A1     2130 
C11    1899 
B3     1421 
Name: DISTRICT, dtype: int64
</pre>

<strong>`plot_dict`가 districts와 동일한 인덱스를 가져야하는 것 </strong> 이 매우 중요하다. 이를 통해 코드가 지리적 경계와 적절한 색상을 매치시키기 때문이다. 

~~~ py
# 지도 생성
m_6 = folium.Map(location=[42.32,-71.0589], tiles='cartodbpositron', zoom_start=12)

# Add a choropleth map to the base map
Choropleth(geo_data=districts.__geo_interface__, 
           data=plot_dict, 
           key_on="feature.id", 
           fill_color='YlGnBu', 
           legend_name='Major criminal incidents (Jan-Aug 2018)'
          ).add_to(m_6)
m_6
~~~

<!-- 사진12자리-->
![post12](/assets/img/Geospatial/Geospatial_Analysis_12.png)

`Choropleth()`에 매개변수로는
- `geo_data` : 각 지리적 영역의 경계를 포함하는 GeoJSON
- `data`: 각 지리적 영역의 색상을 지정하는 데 사용될 값을 포함하는 시리즈
- `key_on` : 항상 feature.id로 설정된다. (이유로는 GeoJSON은 "features" 키를 포함하는 딕셔너리로 구성되어 있는데 각 feature는 고유한 식별자를 가지고 있는데, 이 식별자는 "id"로 나타나진다. 따라서 key_on을 feature.id로 설정하면 folium은 geo_data의 각 지리적 영역과 data의 값들을 해당 feature의 "id"와 일치시켜 매핑한다.)
- `fill_color` : 색상 척도 설정
- `legend_name` : 맵의 오른쪽 상단에 위치한 범례의 레이블 지정

## 2. Manipulating Geospatial Data
---

이 튜토리얼에서는 지리 데이터에 대한 두 가지 일반적인 조작인 지오코딩(geocoding)과 테이블 조인(table joins)에 대해 배울 것이다.

### 2.1 Geocoding
---

<strong>지오코딩(Geocoding)</strong>은 주소나 장소의 이름을 지리적 좌표로 변환하는 과정을 말한다. 예를 들면 도로명 주소, 건물명 등을 위도와 경도 값으로 변환하는 것이다. 이를 통해 주소 기반의 데이터를 지도 위에 정확하게 표시하거나 지리적 분석을 수행할 수 있다. 

<!-- 사진13자리-->
![post13](/assets/img/Geospatial/Geospatial_Analysis_13.png)

Google Maps, Bing Maps, Baidu Maps 등을 사용하여 랜드마크에 대한 지리적 위치를 조회한 적이 있다면, 지오코딩을 사용해본 것이다.

~~~ py
from geopy.geocoders import Nominatim
~~~

위 코드에서 `Nominatim`은 위치를 생성하는 데 사용될 지오코딩 소프트웨어이다. 지오코더를 인스턴스화한 후, 이름이나 주소를 Python 문자열로 제공하기만 하면 된다. 지오코딩이 성공하면 point(위도, 경도), address(주소) 속성을 가진 `geopy.location.Location`객체를 반환한다.

~~~ py
geolocator = Nominatim(user_agent="kaggle_learn")
location = geolocator.geocode("Pyramid of Khufu")

print(location.point)
print(location.address)
~~~

29 58m 44.976s N, 31 8m 3.17625s E <br>
هرم خوفو,  شارع ابو الهول السياحي, نزلة البطران, الجيزة, 12125, مصر

> 첫 번째 출력문은 위치의 좌표를 나타내는 Point 객체를 출력한다. 두 번째 출력문은 해당 위치의 전체 주소를 나타낸다. 아라비아어로 나오는 이유는 뭘까...?
영어로 번역하면 "Pyramid of Khufu, Pyramids of Giza, Al Haram, Giza, Egypt" 이라고 나온다.

여러 주소를 지오코딩해야 할 경우에는 람다함수와 반복문을 이용해서 주소 목록을 순차적으로 지오코딩하면 된다.

이 때 주의해야 할 점은 지오코딩이 실패하는 경우를 대비해 try/expect 문을 사용해 예외처리를 꼭 해줘야한다!

~~~ py

def my_geocoder(row):
    try: #예외처리
        point = geolocator.geocode(row).point
        return pd.Series({'Latitude': point.latitude, 'Longitude': point.longitude})
    except: #예외처리
        return None

universities[['Latitude', 'Longitude']] = universities.apply(lambda x: my_geocoder(x['Name']), axis=1)

print("{}% of addresses were geocoded!".format(
    (1 - sum(np.isnan(universities["Latitude"])) / len(universities)) * 100))

# 성공적으로 이루어진 주소에 대해서만 데이터프레임 필터링, 'gpd.points.from_xy 함수를 사용하여 위도와 경도를 기반으로 지오메트리 객체를 생성하고 이를 geometry 열에 추가한다.
universities = universities.loc[~np.isnan(universities["Latitude"])]
universities = gpd.GeoDataFrame(
    universities, geometry=gpd.points_from_xy(universities.Longitude, universities.Latitude))
universities.crs = {'init': 'epsg:4326'}
universities.head()
~~~

<table>
<thead>
  <tr>
    <th></th>
    <th>Name</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>geometry</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>0</td>
    <td>University of Oxford</td>
    <td>51.758879</td>
    <td>-1.259603</td>
    <td>POINT (-1.25960 51.75888)</td>
  </tr>
  <tr>
    <td>1</td>
    <td>University of Cambridge</td>
    <td>52.200623</td>
    <td>0.110474</td>
    <td>POINT (0.11047 52.20062)</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Imperial College London</td>
    <td>51.498959</td>
    <td>-0.175641</td>
    <td>POINT (-0.17564 51.49896)</td>
  </tr>
  <tr>
    <td>3</td>
    <td>ETH Zurich</td>
    <td>47.562772</td>
    <td>7.580947</td>
    <td>POINT (7.58095 47.56277)</td>
  </tr>
  <tr>
    <td>4</td>
    <td>UCL</td>
    <td>51.521785</td>
    <td>-0.135151</td>
    <td>POINT (-0.13515 51.52179)</td>
  </tr>
</tbody>
</table>

다음으로, 지오코더에 의해 반환된 모든 위치를 시각화한다.

~~~
# 지도 생성
m = folium.Map(location=[54, 15], tiles='openstreetmap', zoom_start=2)

for idx, row in universities.iterrows():
    Marker([row['Latitude'], row['Longitude']], popup=row['Name']).add_to(m)

m
~~~

<!-- 사진14자리-->
![post14](/assets/img/Geospatial/Geospatial_Analysis_14.png)

### 2.2 Table joins
---

서로 다른 소스에서 데이터를 결합하는 방법에 대해 학습해보자. GeoDataFrame과 속성 조인을 수행할 떄는 `gpd.GeoDataFrame.merge()를 사용한다. 이를 설명하기 위해 유럽의 각 국가에 대한 경계를 포함하는 GeoDataFrame인 europe_boundaries와 함께 작업한다.

> europe_boundaries : 각 국가의 경계 포함

<table>
<thead>
  <tr>
    <th></th>
    <th>name</th>
    <th>pop_est</th>
    <th>gdp_md_est</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>0</td>
    <td>Russia</td>
    <td>142257519</td>
    <td>3745000.0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Norway</td>
    <td>5320045</td>
    <td>364700.0</td>
  </tr>
  <tr>
    <td>2</td>
    <td>France</td>
    <td>67106161</td>
    <td>2699000.0</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Sweden</td>
    <td>9960487</td>
    <td>498100.0</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Belarus</td>
    <td>9549747</td>
    <td>165400.0</td>
  </tr>
</tbody>
</table>

> europe_stats : 각 국가의 예상 인구 및 국내 총생산(GDP)포함
 
<table>
<thead>
  <tr>
    <th></th>
    <th>name</th>
    <th>geometry</th>
    <th>pop_est</th>
    <th>gdp_md_est</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>0</td>
    <td>Russia</td>
    <td>MULTIPOLYGON (((178.72530 71.09880, 180.00000 ...</td>
    <td>142257519</td>
    <td>3745000.0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Norway</td>
    <td>MULTIPOLYGON (((15.14282 79.67431, 15.52255 80...</td>
    <td>5320045</td>
    <td>364700.0</td>
  </tr>
  <tr>
    <td>2</td>
    <td>France</td>
    <td>MULTIPOLYGON (((-51.65780 4.15623, -52.24934 3...</td>
    <td>67106161</td>
    <td>2699000.0</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Sweden</td>
    <td>POLYGON ((11.02737 58.85615, 11.46827 59.43239...</td>
    <td>9960487</td>
    <td>498100.0</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Belarus</td>
    <td>POLYGON ((28.17671 56.16913, 29.22951 55.91834...</td>
    <td>9549747</td>
    <td>165400.0</td>
  </tr>
</tbody>
</table>

속성 조인을 수행하는 코드이다. `on`인자는 europe_boundaries 행과 europe_stats의 행을 매칭하는 데 사용되는 열 이름으로 설정된다.

~~~ py

# 속성조인
europe = europe_boundaries.merge(europe_stats, on="name")
europe.head()
~~~

<table>
<thead>
  <tr>
    <th></th>
    <th>name</th>
    <th>geometry</th>
    <th>pop_est</th>
    <th>gdp_md_est</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>0</td>
    <td>Russia</td>
    <td>MULTIPOLYGON (((178.72530 71.09880, 180.00000 ...</td>
    <td>142257519</td>
    <td>3745000.0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Norway</td>
    <td>MULTIPOLYGON (((15.14282 79.67431, 15.52255 80...</td>
    <td>5320045</td>
    <td>364700.0</td>
  </tr>
  <tr>
    <td>2</td>
    <td>France</td>
    <td>MULTIPOLYGON (((-51.65780 4.15623, -52.24934 3...</td>
    <td>67106161</td>
    <td>2699000.0</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Sweden</td>
    <td>POLYGON ((11.02737 58.85615, 11.46827 59.43239...</td>
    <td>9960487</td>
    <td>498100.0</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Belarus</td>
    <td>POLYGON ((28.17671 56.16913, 29.22951 55.91834...</td>
    <td>9549747</td>
    <td>165400.0</td>
  </tr>
</tbody>
</table>

다른 유형의 조인으로는 Spatial join(공간 조인)이 있다. 공간 조인을 사용하면 `geometry` 열에 있는 객체들 간의 공간적 관계를 기반으로 GeoDataFrame을 결합한다. 예를 들어, 유럽 대학교의 지오코딩된 주소를 포함하는 universities 데이터프레임이 있다. 공간 조인(gpd.sjoin())을 사용하면 각 대학을 해당 국가와 매칭할 수 있다

~~~ py
# 유럽의 국가와 대학을 공간 조인
european_universities = gpd.sjoin(universities, europe)


print("We located {} universities.".format(len(universities)))
print("Only {} of the universities were located in Europe (in {} different countries).".format(
    len(european_universities), len(european_universities.name.unique())))

european_universities.head()
~~~

> We located 91 universities. <br>
Only 87 of the universities were located in Europe (in 14 different countries).

<table>
<thead>
  <tr>
    <th></th>
    <th>Name</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>geometry</th>
    <th>index_right</th>
    <th>name</th>
    <th>pop_est</th>
    <th>gdp_md_est</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>0</td>
    <td>University of Oxford</td>
    <td>51.758879</td>
    <td>-1.259603</td>
    <td>POINT (-1.25960 51.75888)</td>
    <td>28</td>
    <td>United Kingdom</td>
    <td>64769452</td>
    <td>2788000.0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>University of Cambridge</td>
    <td>52.200623</td>
    <td>0.110474</td>
    <td>POINT (0.11047 52.20062)</td>
    <td>28</td>
    <td>United Kingdom</td>
    <td>64769452</td>
    <td>2788000.0</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Imperial College London</td>
    <td>51.498959</td>
    <td>-0.175641</td>
    <td>POINT (-0.17564 51.49896)</td>
    <td>28</td>
    <td>United Kingdom</td>
    <td>64769452</td>
    <td>2788000.0</td>
  </tr>
  <tr>
    <td>4</td>
    <td>UCL</td>
    <td>51.521785</td>
    <td>-0.135151</td>
    <td>POINT (-0.13515 51.52179)</td>
    <td>28</td>
    <td>United Kingdom</td>
    <td>64769452</td>
    <td>2788000.0</td>
  </tr>
  <tr>
    <td>5</td>
    <td>London School of Economics and Political Science</td>
    <td>51.514211</td>
    <td>-0.116808</td>
    <td>POINT (-0.11681 51.51421)</td>
    <td>28</td>
    <td>United Kingdom</td>
    <td>64769452</td>
    <td>2788000.0</td>
  </tr>
</tbody>
</table>

위의 공간 조인은 GeoDataFrame인 `universities`와 `europe`의 "geometry"열을 비교한다. 만약 `universities`의 Point객체가 `europe`의 Polygon 객체와 교차한다면, 해당하는 행은 결합된다. 

`gpd.sjoin()` 메서드는 hop 또는 op 인자를 통해 다양하게 정의할 수 있다. 예를 들어 how ='left'로 설정하면 SQL의 왼쪽조인과 동등한 조인을 수행한다. 

## 3. Proximity Analysis
---

이 튜토리얼에서는 근접 분석 기법 중 지도 상의 점들 사이의 거리 측정, 특정 피처로부터 일정 반경 내의 모든 점들 선택하는 방법을 배울 것이다.

### 3.1 Measuring distance
---

두 개의 다른 GeoDataFrame에서 점들 간의 거리를 측정하기 위해서는 먼저 동일한 좌표 시스템(CRS)을 사용하는지 확인해야 한다! 좌표시스템이 같다면, 거리를 계산하는 것은 비교적 간단한다. 

~~~ py
# 특정 사건 선택 
recent_release = releases.iloc[360]

# 특정 사건과 각 역(station)사이의 거리 계산
distances = stations.geometry.distance(recent_release.geometry)
distances
~~~

<pre>
0     44778.509761
1     51006.456589
2     77744.509207
3     14672.170878
4     43753.554393
5      4711.658655
6     23197.430858
7     12072.823097
8     79081.825506
9      3780.623591
10    27577.474903
11    19818.381002
dtype: float64
</pre>

계산된 거리를 사용하여 각 역까지의 평균 거리와 같은 통계를 얻을 수 있다.

~~~ py
print('Mean distance to monitoring stations: {} feet'.format(distances.mean()))
~~~

<pre>
Mean distance to monitoring stations: 33516.28487007786 feet
</pre>

또한 제일 가까운 역도 구할 수 있다.

~~~py
print('Closest monitoring station ({} feet):'.format(distances.min()))
print(stations.iloc[distances.idxmin()][["ADDRESS", "LATITUDE", "LONGITUDE"]])
~~~

<pre>
Closest monitoring station (3780.623590556444 feet):
ADDRESS      3100 Penrose Ferry Road
LATITUDE                    39.91279
LONGITUDE                 -75.185448
Name: 9, dtype: object
</pre>

### 3.2 Creating a buffer
----

특정 지점으로부터 일정 반경 내의 지도상의 모든 지점을 이해하고 싶다면, 가장 간단한 방법은 버퍼를 생성하는 것이다. 아래 코드는 12개의 다른 다각형 객체를 포함하는 GeoSeries인 two_mile_buffer를 생성한다.

~~~ py
two_mile_buffer = stations.geometry.buffer(2*5280)
two_mile_buffer.head()
~~~

<pre>
0    POLYGON ((2721944.641 257149.310, 2721893.792 ...
1    POLYGON ((2682494.290 271248.900, 2682443.441 ...
2    POLYGON ((2744886.638 280980.247, 2744835.789 ...
3    POLYGON ((2703638.580 233247.101, 2703587.731 ...
4    POLYGON ((2726959.773 251134.976, 2726908.924 ...
dtype: geometry
</pre>

`folium.GeoJson()`을 사용해서 각 폴리곤을 지도에 그릴 수 있다. 주의해야 할 점은 folium은 위도와 경도 형식의 좌표를 요구하기 때문에, 지도에 데이터를 표시하기 전에 CRS를 꼭 EPSG:4326으로 변환해주어야한다.

~~~ py
# 지도 생성
m = folium.Map(location=[39.9526,-75.1652], zoom_start=11)
# 히트맵 지도에 추가
HeatMap(data=releases[['LATITUDE', 'LONGITUDE']], radius=15).add_to(m)
#각 역의 위도와 경도를 사용하여 Marker 생성 후 추가
for idx, row in stations.iterrows():
    Marker([row['LATITUDE'], row['LONGITUDE']]).add_to(m)
# 좌표계 변환한 후 GeoJson형식으로 생성
GeoJson(two_mile_buffer.to_crs(epsg=4326)).add_to(m)

m
~~~

<!-- 사진15자리-->
![post15](/assets/img/Geospatial/Geospatial_Analysis_15.png)

unary_union 속성을 사용하여 모든 폴리곤을 멀티폴리곤 개체로 병합할 수 도 있다.

~~~ py
# unary_union 속성을 이용해 폴리곤을 하나로 결합
my_union = two_mile_buffer.geometry.unary_union
print('Type:', type(my_union))

my_union
~~~

<!-- 사진165자리-->
![post16](/assets/img/Geospatial/Geospatial_Analysis_16.png)
