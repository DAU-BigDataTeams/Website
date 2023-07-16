---
title: QGIS 파이썬 콘솔(PyQGIS)에서 버퍼 생성
layout: post
categories : [etc,GIS,QGIS,Python]
image : /assets/img/study/etc/QGIS/QGIS_buffer13.png
description:  QGIS 파이썬 콘솔(PyQGIS)에서 버퍼 생성
customexcerpt:  파이썬과 QGIS를 활용해 버퍼 분석을 해보자! 
---

<span class = "alert g">작성자 : 김종호</span>

# QGIS 
<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

## 1. QGIS 
---

작년 DevDay때 입지 분석을 진행하면서 QGIS를 처음 접하게 되었고, 지금까지도 유용하게 활용하고 있다. 현재는 프로젝트 고도화 과정에서 파이썬을 사용하여 입지분석 자동화 코드를 작성하는 중이다. 이 과정에서 배운 내용을 소개하고자 한다.

> QGIS는 Quantum GIS의 약자로, 오픈 소스 기반의 지리 정보 시스템(GIS) 소프트웨어이다. 다양한 데이터 형식을 지원하며, 벡터 데이터(점, 선, 다각형 등)와 래스터 데이터(지도, 공간, 영상 등)를 처리할 수 있다.

QGIS 설치방법이나 개념 등은 이미 다른 많은 블로그에서 다루고 있으므로, 생략하고 포스팅 할 예정이다. 

오늘 소개할 내용은 다음과 같다.

- QGIS + 파이썬 사용가이드
- QGIS Buffer 다루기

## 2. QGIS + 파이썬 사용가이드
---

QGIS를 키고 저 아이콘을 누르면
<!-- 사진1 -->
![post1](/assets/img/study/etc/QGIS/QGIS_buffer1.png)

> 단축키는 Ctrl + AIT + P
 
파이썬 콘솔창이 나오며, QGIS상에서 파이썬 코드를 작성할 수 있다.

<!-- 사진2 -->
![post2](/assets/img/study/etc/QGIS/QGIS_buffer2.png)

필수적으로 **import** 해야하는 것은
- import processing : QGIS에서 파이썬을 사용해 지오프로세싱 작업을 수행할 수 있게 해준다.
- import os : OS에서 자연스럽게 하던 작업들(파일 복사, 폴더 생성, 경로 지정)을 코드에서도 활용할 수 있게 해준다.

사용하고자 하는 QGIS의 기능을 알고 싶을 때는 `processing.algorithmHelp(알고리즘ID)` 코드를 이용하면 된다.
> processing.algorithmHelp(**알고리즘ID**) : 알고리즘ID의 메뉴얼을 알려준다.

ex) native:buffer

<!-- 사진3 -->
![post3](/assets/img/study/etc/QGIS/QGIS_buffer3.png)
![post3](/assets/img/study/etc/QGIS/QGIS_buffer3_1.png)

위 사진에서 볼 수 있듯이 알고리즘 소개부터 Input parameters, Output등을 확인할 수 있다.

## 3. QGIS Buffer
---

버퍼(Buffer)의 사용 사례로는
- 도로 주변 1km 반경의 버퍼를 생성하여 교통 소음에 노출되는 주거 구역 식별 
- 강이나 호수 주변에 버퍼를 생성해 생태계 보호 구역 지정
- 그린벨트 설정
- 학교 주변에 1km 반경의 버퍼를 생성해 학군 지역 지정

등등이 있다.

![post0](/assets/img/study/etc/QGIS/QGIS_buffer0.png)

버퍼에서 주로 쓰는 파라미터로는
- `INPUT` : 버퍼를 적용한 SHP파일
> SHP파일이란? 벡터방식으로 공간정보를 저장하는 파일, 점(Point), 선(Line), 면(Polygon) 중 한 속성을 가진다.
- `DISTANCE` : 버퍼 적용거리 (단위 : m)
- `SEGMENTS` : 버퍼 중심의 반경을 이루는 점의 개수 (많을수록 원에 가까워짐. BUT 용량이 크다. 성능과 정확성 사이의 트레이드오프 관계..)
- `DISSOLVE` : 버퍼 경계 병합(0 : 디졸브 미적용 1 : 디졸브 적용)
- `OUTPUT` : 결과물 (임시 결과물, 혹은 SHP파일로 저장)

이 뿐만 아니라 `JOIN_STYLE`, `MITER_LIMIT`, `END_CAP_STYLE` 등이 있다.

자세히 알고 싶으면 링크 참고 >>
[QGIS BUFFER ](https://docs.qgis.org/3.10/ko/docs/user_manual/processing_algs/qgis/vectorgeometry.html#qgisbuffer)

자 이제 실습을 시작해볼까? 버퍼실습은 청구아파트경로당으로 할 것이다.

### 3.1 DISTANCE 변경
---

~~~ py
import os
import processing

# Input file path
senior_cheong_gu = 'C:/..../cheong_gu_senior_5181.shp'

# buffer distance
buffer_distance= "버퍼 거리 지정"

# Output file path
# memory:senior = 임시메모리에 저장, 이름은 senior로 하겠다. // 내 컴퓨터에 저장하고 싶을 시, 파일 경로를 지정해주면 됨
output_temp_buffer = 'memory:senior'

# buffer_parameter
bufferParams = { 'INPUT' : senior_cheong_gu  ,'DISTANCE' : buffer_distance,'OUTPUT':output_temp_buffer}

# buffer start
buffer = processing.run('native:buffer' , bufferParams)

# QGIS 레이어에 추가할 때, buffer['OUTPUT']을 추가
QgsProject.instance().addMapLayer(buffer['OUTPUT'])

~~~


1) `DISTANCE` : 100

![post4](/assets/img/study/etc/QGIS/QGIS_buffer4.png)

2) `DISTANCE` : 200

![post5](/assets/img/study/etc/QGIS/QGIS_buffer5.png)

3) `DISTANCE` : 500

![post6](/assets/img/study/etc/QGIS/QGIS_buffer6.png)

4) 반복문 사용해서 여러 개 버퍼 생성

~~~py 
# buffer distance
buffer_distance=[500,300,200,100,50,30]
# Loop
for dis in buffer_distance:
    output_temp_buffer = 'memory:senior'+str(dis)
    bufferParams = { 'INPUT' : senior_cheong_gu  ,'DISTANCE' : dis,'OUTPUT':output_temp_buffer}

    # buffer start
    buffer = processing.run('native:buffer' , bufferParams)

    # QGIS 레이어에 추가할 때, buffer['OUTPUT']을 추가
    QgsProject.instance().addMapLayer(buffer['OUTPUT'])
~~~

![post7](/assets/img/study/etc/QGIS/QGIS_buffer7.png)

### 3.2 SEGMENTS 변경
---

위의 실습 사진을 자~~세~히 보면 원이 각져있는 것이 보인다. 이러한 현상은 `SEGMENTS`옵션을 조절하여 해결할 수 있다. `SEGMENTS`옵션을 높여서 원의 외부 경계를 더 많은 세그먼트로 근사화하면 더 부드러운 곡선 형태를 얻을 수 있다.

`SEGMENTS`값을 높이면 처리 시간이 더 오래 걸릴 수 있으므로 작업에 따라서 **적절한** 세그먼트 수를 선택하는 것이 중요하다!

~~~py
import os
import processing
import time 
# Input file path
senior_cheong_gu = 'C:/..../cheong_gu_senior_5181.shp'

start = time.time()
# Output file path
output_temp_buffer = 'memory:senior'

# buffer distance
buffer_distance=500

#segments number
number = "세그먼트 수 지정"

# buffer_parameter
bufferParams = { 'INPUT' : senior_cheong_gu  ,'DISTANCE' : buffer_distance,'SEGMENTS':number,'OUTPUT':output_temp_buffer}

# buffer start
buffer = processing.run('native:buffer' , bufferParams)

# QGIS 레이어에 추가
QgsProject.instance().addMapLayer(buffer['OUTPUT'])

end=time.time()
print(f"{end-start:5f} sec")
~~~

1) `SEGMENTS` : 10 , time : 0.031084 sec

![post8](/assets/img/study/etc/QGIS/QGIS_buffer8.png)

언뜻 보면 원처럼 보이지만 확대 시

![post9](/assets/img/study/etc/QGIS/QGIS_buffer9.png)

아직 각져있는 것을 볼 수 있다.

2) `SEGMENTS` : 100 , time : 0.043099 sec

![post10](/assets/img/study/etc/QGIS/QGIS_buffer10.png)

- `SEGMENTS` 10과 100의 미세한 차이점

![post11](/assets/img/study/etc/QGIS/QGIS_buffer11.png)

(버퍼 크기가 작아 시간 차이가 별로 나지 않네유,,암튼) `SEGMENTS` 수를 늘리면 늘릴수록 분석에 원의 정확성을 높일 수 있지만 시간이 오래걸리니 각 상황에서 맞춰서 `SEGMENTS` 값을 조절하자~

### 3.3 DISSOLVE ON & OFF
---

디졸브(`DISSOLVE`)는 버퍼 영역을 생성한 후, 겹치거나 인접한 영역을 하나로 병합하여 단일 영역으로 만드는 작업이다.
- 면 레이어의 경우, 인접한 폴리곤의 공통 경계가 지워진다.

부산광역시 종합병원 데이터로 병세권(?)을 구해보자. 

1) `DISSOLVE` OFF

~~~ py
# buffer_parameter
bufferParams = { 'INPUT' : busan_hospital  ,'DISSOLVE':0,'DISTANCE' : buffer_distance,'SEGMENTS':number,'OUTPUT':output_temp_buffer}
~~~

![post12](/assets/img/study/etc/QGIS/QGIS_buffer12.png)

사하구에는 종합병원이 하나도 없네요...?

2) `DISSOLVE` ON

~~~ py
# buffer_parameter
bufferParams = { 'INPUT' : busan_hospital  ,'DISSOLVE':1,'DISTANCE' : buffer_distance,'SEGMENTS':number,'OUTPUT':output_temp_buffer}
~~~

![post13](/assets/img/study/etc/QGIS/QGIS_buffer13.png)


이렇게 QGIS 버퍼에 대해서 간단히 알아보았다...! 끝~
