---
title: QGIS 파이썬 콘솔(PyQGIS)에서 버퍼 생성
layout: post
categories : [GIS,QGIS]
image : 
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
작년 데브데이때 입지분석을 하다가 QGIS를 접하게 되었고, 아직까지 유용하게(?) 사용하고 있다. 현재는 프로젝트 고도화 과정에서 파이썬을 사용하여 입지분석 자동화 코드를 작성하는 중이다. 이 과정에서 배운 내용에 대해서 소개하고자 한다.

> QGIS는 Quantum GIS의 약자로, 오픈 소스 기반의 지리 정보 시스템(GIS) 소프트웨어이다. 다양한 데이터 형식을 지원하며, 벡터 데이터(점, 선, 다각형 등)와 래스터 데이터(지도, 공간, 영상 등)를 처리할 수 있다.

QGIS 설치방법이나 개념 등은 이미 다른 많은 블로그에서 소개하고 있으니, 생략하고
간단한 것부터 포스팅 할 예정이다. 

오늘 소개할 내용은 다음과 같다.

- QGIS + 파이썬 사용가이드
- Buffer QGIS 코드 실습
- CLIP QGIS 코드 실습
- 간단한 실습 : 부산 공공 와이파이 소외지역 찾기

## 2. QGIS + 파이썬 사용가이드
---

QGIS를 키면 다음과 같은 아이콘을 누르면
<!-- 사진1 -->
![post1](/assets/img/QGIS/QGIS_buffer1.png)

> 단축키는 Ctrl + AIT + P
 
아래의 텍스트 편집기가 표시되며 파이썬 코드 실행이 가능해진다.

<!-- 사진2 -->
![post2](/assets/img/QGIS/QGIS_buffer2.png)

필수적으로 import 해야하는 것은
- import processing : QGIS에서 파이썬을 사용해 지오프로세싱 작업을 수행할 수 있게 해준다.
- import os : OS에서 자연스럽게 하던 작업들(파일 복사, 폴더 생성, 경로 지정)을 코드에서도 활용할 수 있게 해준다.

QGIS의 기능을 파이썬을 이용해서 사용하고 싶을 때는 *processing.algorithmHelp(**알고리즘ID**)* 코드를 이용하면 된다.
> processing.algorithmHelp(**알고리즘ID**) : 알고리즘ID의 메뉴얼을 알려준다.

ex) native:buffer

<!-- 사진3 -->
![post3](/assets/img/QGIS/QGIS_buffer3.png)
![post3](/assets/img/QGIS/QGIS_buffer3_1.png)

위 사진에서 볼 수 있듯이 알고리즘소개부터 Input parameters, Outputs 등을 확인할 수 있다.

## 3. Buffer QGIS
---

Buffer에서 주로 쓰는 파라미터로는
- INPUT : 버퍼를 적용한 SHP파일
> SHP파일이란? 벡터방식으로 공간정보를 저장하는 파일, 점(Point), 선(Line), 면(Polygon) 중 한 속성을 가진다.
- DISTANCE : 버퍼 적용거리
- SEGMENTS : 버퍼 중심의 반경을 이루는 점의 개수 (많을수록 원에 가까워짐.BUT 용량이 크다.)
- DISSOLVE : 버퍼 경계 병합(0 : 디졸브 미적용 1 : 디졸브 적용)
- OUTPUT : 결과물 (임시 결과물, 혹은 SHP파일로 저장)
있다.

이 뿐만 아니라 JOIN_STYLE, MITER_LIMIT, END_CAP_STYLE 등이 있다.

자세히 알고 싶으면 링크 참고 >>
[QGIS BUFFER ](https://docs.qgis.org/3.10/ko/docs/user_manual/processing_algs/qgis/vectorgeometry.html#qgisbuffer)

자 이제 실습을 시작해볼까? 실습은 청구아파트경로당을 기준으로 할 것이다. 

### 3.1 DISTANCE 변경
---

~~~ py
import os
import processing

# Input file path
senior_cheong_gu = 'C:/Users/admin/Desktop/senior_park/cheong_gu_senior_5181.shp'

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


1) DISTANCE : 100

![post4](/assets/img/QGIS/QGIS_buffer4.png)

2) DISTANCE : 200

![post5](/assets/img/QGIS/QGIS_buffer5.png)

3) DISTANCE : 500

![post6](/assets/img/QGIS/QGIS_buffer6.png)

4) 반복문 사용해서 여러 개 버퍼 생성

~~~py 
# buffer distance
buffer_distance=[500,300,200,100,50,30]
# Loop
for dis in buffer_distance:
    bufferParams = { 'INPUT' : senior_cheong_gu  ,'DISTANCE' : dis,'OUTPUT':output_temp_buffer}
    output_temp_buffer = 'memory:senior'+str(dis)
    # buffer start
    buffer = processing.run('native:buffer' , bufferParams)

    # QGIS 레이어에 추가할 때, buffer['OUTPUT']을 추가
    QgsProject.instance().addMapLayer(buffer['OUTPUT'])
~~~

![post7](/assets/img/QGIS/QGIS_buffer7.png)

### 3.2 SEGMENTS 변경
---
### 3.3 DISSOLVE ON & OFF
---

## 4. CLIP QGIS 코드 
---

## 5. 간단한 실습 : 부산 공공 와이파이 소외지역 찾기
---

