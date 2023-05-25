---
title: 파이썬을 활용한 QGIS 버퍼 생성 
layout: post
categories : [GIS,QGIS]
image : 
description:  파이썬을 활용한 QGIS 버퍼 생성 
customexcerpt:  파이썬과 QGIS를 활용해 버퍼 분석을 해보자! 
---

<span class = "alert g">작성자 : 김종호</span>

# QGIS 
<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

## 1. QGIS 
---

**QGIS**는 Quantum GIS의 약자로, 오픈 소스 기반의 지리 정보 시스템(GIS) 소프트웨어이다.
다양한 데이터 형식을 지원하며, 벡터 데이터(점, 선, 다각형 등)와 래스터 데이터(지도, 공간, 영상 등)를 처리할 수 있다.

설치방법이나 소개 등은 구글링해서 쉽게 찾아볼 수 있으니 각설하고
오늘 소개할 내용은 다음과 같다.

- QGIS + 파이썬 사용가이드
- Buffer QGIS 코드 실습
- CLIP QGIS 코드 실습
- 간단한 실습 예제(?) : 부산 공공 와이파이 소외지역

## 2. QGIS + 파이썬 사용가이드
---

QGIS를 키면 다음과 같은 아이콘을 누르면
<!-- 사진1 -->
![post1](/assets/img/QGIS/QGIS_buffer1.png)

> 단축키는 Ctrl + AIT + P
 
아래의 텍스트 편집기가 표시 되며 파이썬 코드 실행 가능하다.

<!-- 사진2 -->
![post2](/assets/img/QGIS/QGIS_buffer.2png)
