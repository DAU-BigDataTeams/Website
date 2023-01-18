---
title: 상호작용하는 지도 만들기(Interactive Map)
layout: post   
categories : Geospatial, analysis, data, map
image : /assets/img/
description: plot()메서드가 아닌 folium 라이브러리를 이용해서 상호작용이 가능한 지도를 그려보자
customexcerpt: plot()메서드가 아닌 folium 라이브러리를 이용해서 상호작용이 가능한 지도를 그려보자
---

# Interactive Maps
이번 챕터에서는 `folium` 라이브러리를 이용해서 상호작용이 가능한 지도(대화형 지도라고 부르는데 개인적으로 의미가 와닿지 않음)을 학습합니다.  
보스턴 범죄 데이터를 이용해서 시각화 하면서 folium을 익힌다.

~~~py
import folium
from folium import Choropleth, Circle, Marker
from folium.plugins import HeatMap, MarkerCluster
~~~

## Your first interactive map
----
`folium.Map()`을 사용해서 간단한 지도를 만들어 보자.
~~~py
m_1 = folium.Map(location=[42.32,-71.0589], tiles='openstreetmap', zoom_start=10) 
m_1 # 지도 출력
~~~
