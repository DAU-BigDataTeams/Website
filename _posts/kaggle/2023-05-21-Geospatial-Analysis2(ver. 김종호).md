---
title: Geospatial Analysis_2 지도를 시각화하는 방법에 대해서 학습해보자!
layout: post
categories : [kaggle,Geospatial-Analysis]
image : /assets/img/수료증/Certificate_Geo_analysis(jongho).png
description:  지도를 시각화하는 방법에 대해서 학습해보자!
customexcerpt:  GeoPandas을 활용하면 데이터를 지도에 쉽게 시각화할 수 있다.
---

<span class = "alert g">작성자 : 김종호</span>

# Geospatial Analysis

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

## 1. Interactive Maps
---

### 1.1 Introduction
---

이 튜토리얼에서는 `folium` 패키지를 사용하여 대화형 지도를 만드는 방법에 대해 배우게 된다. 대화형 지도란 사용자가 지도 위의 요소를 클릭하거나 드래그하거나 특정 위치를 클릭할 경우 해당 위치를 확인할 수 있는 지도이다. 보스턴 지역의 범죄 데이터를 시각화함으로써 `folium`에 대해 학습해보자

~~~ py
import folium
from folium import Choropleth, Circle, Marker
from folium.plugins import HeatMap, MarkerCluster

m_1 = folium.Map(location=[42.32,-71.0589], tiles='openstreetmap', zoom_start=10)

m_1
~~~

<!-- 사진1자리-->
![post1](/assets/img/Geospatial/Geospatial_Analysis_1.png)

간단한 지도를 생성하는 코드이다. `folium.Map()` 에는 대표적인 매개변수로는
- `location` : 지도의 초기 중심 위치 설정(위도, 경도)
- `tiles` : 타일의 뜻은 작은 이미지 조각으로 나누어진 지도의 부분을 나타낸다. 위에서는 기본 타일인 OpenStreetMap을 사용했다. Mapbox Bright, Stamen Terrian, CartoDB posiron 등이 있다.
- `zoom_start` : 지도의 확대/축소를 설정한다. 값이 높을수록 지도가 더 가까이 확대된다.


### 1.2 Plotting points
---

이제 지도에 범죄 데이터를 추가해보자. 데이터 로딩 단계는 앞서 많이 봤기 때문에 스킵하고 데이터가 로드되었다고 가정하고 진행하겠다.

~~~ py
daytime_robberies = crimes[((crimes.OFFENSE_CODE_GROUP == 'Robbery') & \
                            (crimes.HOUR.isin(range(9,18))))]

# 지도 생성
m_2 = folium.Map(location=[42.32,-71.0589], tiles='cartodbpositron', zoom_start=13)

# 지도에 마커 추가
for idx, row in daytime_robberies.iterrows():
    Marker([row['Lat'], row['Long']]).add_to(m_2)

# 
m_2                            
~~~

`folium.Marker()를 사용하여 지도에 마커를 추가한다. 각 마커에는 주간 강도 범죄가 발생한 위치데이터가 들어있다. 

<!-- 사진2자리-->
![post1](/assets/img/Geospatial/Geospatial_Analysis_1.png)

많은 수의 마커를 추가할 때 `folium.plugins.MarkerCluser()를 사용하면 지도를 깔끔하게 유지하는데 도움이 된다. 각 마커는 MarkerCluster 객체에 추가된다.

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

<!-- 사진3자리-->
![post1](/assets/img/Geospatial/Geospatial_Analysis_1.png)

다음과 같이 나타나며, 지도 확대 시 아래 그림과 같이 변화한다. 

<!-- 사진4자리-->
![post1](/assets/img/Geospatial/Geospatial_Analysis_1.png)



### 1.3 Bubble maps
---

### 1.4 Heatmaps
---

### 1.5 Choropleth maps
