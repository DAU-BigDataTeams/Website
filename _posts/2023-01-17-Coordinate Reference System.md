---
title: 지리공간 분석 part2 - Coordinate Reference System(CRS).  
layout: post   
categories : Geospatial, analysis, data, map
image : /assets/img/geopart3.png
description: GeoPandas와 좌표계에 대한 설명
customexcerpt: 지구를 2차원으로 표현해서 지도를 생성하지만, 사실 지구는 삼차원인 것을 알고있습니다. 그래서 우리는 map projection 이라 불리는 방법을 사용해서 평면에 투영시킵니다.  
---

# Coordinate Reference System(CRS)

지구를 2차원으로 표현해서 지도를 생성하지만, 사실 지구는 삼차원인 것을 알고있습니다. 그래서 우리는 ```map projection```이라 불리는 방법을 사용해서 평면에 투영시킵니다.  

Map projection은 100% 정확하지 않습니다. 각 프로젝션(projection)은 일부 유용한 특성을 유지하면서 어떤 방식으로든 지구 표면을 왜곡합니다. (예를 든다면 아래 2가지 예시가 있음.)

1. 등면적 투영법 - 면적을 보존하는 특징이있음 때문에 국가, 도시 면적을 계산하는 경우 유용함.
2. 긍거리 투영법 - 방위각 등거리 투영이라고도 부르고 거리를 유지하기때문에 항공, 해양 등 운행거리를 계산하는 것에 유용한 방법이다.

![예시](/assets/img/geopart3.png)

좌표 참조 시스템(CRS)를 사용해서 투영된 점이 지구상의 실제 위치와 어떻게 일치하는지 보여준다. 뭐 여튼 지금 배우는 것은 GeoPandas를 이용해서 CRS를 사용하는 방법에 대해 알아보는 것이 목표다.

## Setting the CRS
----
GeoPandas형태의 shapefile을 만들면 이미 CRS를 사용할 준비를 한것이다.
지리정보 데이터를 로드했다면 crs멤버를 호출해보자

~~~py
regions = gpd.read_file("../input/geospatial-learn-course-data/ghana/ghana/Regions/Map_of_Regions_in_Ghana.shp")
print(regions.crs) # CRS멤버 호출

결과 = epsg : 32630
~~~

일단 무슨 값이 튀어나온건 알겠는데 저걸 어떻게 해석을 해야할지 모르겠다.

CRS는 **European Petroleum Survey Group (EPSG)** 코드로 참조된다고 한다. (...?)

로드된 GeoPandas는 [EPSG 32630](https://epsg.io/32630)이라는 좌표계를 사용하고, 일반적으로 Mercator 투영이라고 부른다고 함. 이 투영물은 각도를 유지하고 영역을 약간 왜곡한다. 이런 특징 때문에 해상 탐색에 유용하다고 한다.  

만약 shp파일이 아니라 csv포맷의 파일을 GeoDataFrame으로 생성할 때 CRS를 별도로 설정해야한다.  
참고로 아래 코드의 EPSG:4326은 위/경도 좌표에 해당한다.

~~~py
# Create a DataFrame with health facilities in Ghana
facilities_df = pd.read_csv("../input/geospatial-learn-course-data/ghana/ghana/health_facilities.csv")

# Convert the DataFrame to a GeoDataFrame
facilities = gpd.GeoDataFrame(facilities_df, geometry=gpd.points_from_xy(facilities_df.Longitude, facilities_df.Latitude))

# Set the coordinate reference system (CRS) to EPSG 4326
facilities.crs = {'init': 'epsg:4326'} # 여기 괜히 'epsg : 4326' 이렇게 넣으면 에러뜸;;
 
# View the first five rows of the GeoDataFrame
facilities.head()
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Region</th>
      <th>District</th>
      <th>FacilityName</th>
      <th>Type</th>
      <th>Town</th>
      <th>Ownership</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>geometry</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Ashanti</td>
      <td>Offinso North</td>
      <td>A.M.E Zion Clinic</td>
      <td>Clinic</td>
      <td>Afrancho</td>
      <td>CHAG</td>
      <td>7.40801</td>
      <td>-1.96317</td>
      <td>POINT (-1.96317 7.40801)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Ashanti</td>
      <td>Bekwai Municipal</td>
      <td>Abenkyiman Clinic</td>
      <td>Clinic</td>
      <td>Anwiankwanta</td>
      <td>Private</td>
      <td>6.46312</td>
      <td>-1.58592</td>
      <td>POINT (-1.58592 6.46312)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Ashanti</td>
      <td>Adansi North</td>
      <td>Aboabo Health Centre</td>
      <td>Health Centre</td>
      <td>Aboabo No 2</td>
      <td>Government</td>
      <td>6.22393</td>
      <td>-1.34982</td>
      <td>POINT (-1.34982 6.22393)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Ashanti</td>
      <td>Afigya-Kwabre</td>
      <td>Aboabogya Health Centre</td>
      <td>Health Centre</td>
      <td>Aboabogya</td>
      <td>Government</td>
      <td>6.84177</td>
      <td>-1.61098</td>
      <td>POINT (-1.61098 6.84177)</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Ashanti</td>
      <td>Kwabre</td>
      <td>Aboaso Health Centre</td>
      <td>Health Centre</td>
      <td>Aboaso</td>
      <td>Government</td>
      <td>6.84177</td>
      <td>-1.61098</td>
      <td>POINT (-1.61098 6.84177)</td>
    </tr>
  </tbody>
</table>

위 코드는 CSV파일을 GeoDataFrame로 생성하기 위해 Pandas, GeoPandas를 모두 사용해야했다.  
(read_csv -> Pandas gpd.GeoDataFrame -> GeoPandas)  

위도 경도가 있는 열을 포함하는 데이터프래임을 만드는 것으로 시작하고 GeoDataFrame을 반환하기 위해 ```gpd.GeodataFrame()```을 사용했다. 마지막으로 ```gpd.points_from_xy()```함수는 위도 및 경도 열에서 Point 객체를 생성한다.  

## Re-projection
----
재투영(Re-projection)은 CRS를 변경하는 과정을 말합니다. 이거는 ```to_crs()```메서드를 사용하여 GeoPandas에서 수행된다.

**여러 GeoDataFrame을 ```plot()```메서드를 통해 그릴 때 모두 동일한 CRS를 사용하는게 중요하다.**  

다음 예시는 지도 표현전에 지역의 CRS와 일치하게 작업하는 것이다.

~~~py
ax = regions.plot(figsize=(8,8), color='whitesmoke', linestyle=':', edgecolor='black')
facilities.to_crs(epsg=32630).plot(markersize=1, ax=ax) # to_crs()주목
# epsg = 32630으로 적용
~~~
![to_crs](/assets/img/geopart4.png)

참고로 ```to_crs()```메서드는 geometry column만 수정하고 다른 column은 건들지 않는다!  

**만약에 EPSG코드를 GeoPandas에 적용할 수 없는 경우 CRS의 proj4 문자열이라고 불리는 것으로 CRS를 변경할 수 있다. 예를 들어, 위도/경도 좌표로 변환하는 proj4 문자열은 아래와 같다.**
~~~Py
regions.to_crs("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs").head()
~~~

## Attribute of geometric objects
----

[Your First Map](/_posts/2023-01-16-Yout%20First%20Map.md)에서 배운 것 처럼 GeoDataFrame의 경우 geometry column은 표시하려는 항목에 따라 달라진다.(3가지 유형이 있었음)

1. 지진의 진원지점 -> Point
2. 거리에 대한 유도선 -> LineString
3. 국가 경계를 표시하는 다각형 -> Polygon  
세 가지 유형의 기하학적 개체 모두 데이터 세트를 빠르게 분석하는 데 사용할 수 있는 기본 속성이 있다.
이게 뭔 말이냐면 아래 코드를 보고 생각해보라 ^^

~~~py
facilities.geometry.head().x # geometry 유형은 Point임.
~~~

뭐 또 길이 관련 속성으로 LineString의 길이를 측정 할 수 있고 area 속성으로 Polygon의 면적을 가져올 수 있다.
> OSMNX가 이런식으로 값을 가져오나..?

참고로 맨앞에서 말 했듯, 약간의 왜곡은 발생하지만 실제값과 그리 큰차이는 아니라 사용 목적에 따라 사용할 수 있다.

