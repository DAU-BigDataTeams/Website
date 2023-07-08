---  
title: 파이썬 첫걸음 ! 
layout: post   
categories : [python-study, 파이썬-기초문법, 문자열-인덱싱, 슬라이싱, 정렬-공백]  
image : /assets/img/study/etc/python_basic_1.png
description: 파이썬 첫걸음 !  
customexcerpt:  파이썬 프로그래밍 기초 문법 알아보기.
---

<span class = "alert g">작성자 : 장효주 </span>

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# 파이썬 기초 문법
- 사칙연산
~~~ py
>>> 1+2
3
>>> 3/2.4
1.25
>>> 3*9
27
~~~

- 정수형
~~~ py
>>> a = 0
>>> a = 1.2
>>> a = -220
~~~

- 실수형
~~~ py
>>> a = 1.5
>>> a = -5.7
~~~

- X의 Y제곱을 나타내는 **연산자
~~~py
>>> a = 5
>>> b = 3
>>> a ** b
125
~~~

- 나눗셈 후 나머지를 반환하는 % 연산자
~~~ py
>>> 7 % 3
1
>>> 3 % 7
3
~~~

- 나눗셈 후 몫을 반환하는 // 연산자
~~~py
>>> 7 // 4
1
~~~

----

## 문자열 연산하기
- 문자열 곱하기
~~~py
>>> a = "python"
>>> a * 2
"pythonpython"
~~~

- 문자열 길이 구하기
~~~py
>>> a = "Life is too short"
>>> len(a)
17
~~~

- 문자열 인덱싱
~~~py
>>> a = "Life is too short, Just enjoy"
>>> a[0]
'L'
>>> a[-1]
'y'
~~~

- 문자열 슬라이싱
~~~py
>>> a = "Life is too short, Just enjoy"
>>> b = a[0] + a[1] + a[2] + a[3]
>>> b
'Life'
>>> a[0:4]
'Life'
>>> a[0:3]
'Lif'
-> 슬라이싱 기법으로 a[시작 번호:끝 번호]를 지정할 때 끝 번호에 해당하는 것은 포함하지 않는다.
~~~

- 문자열 포매팅
~~~py
>>> "I eat %d strawberries." %7
'I eat 7 strawberries.'
-> 숫자를 넣을때는 위와 같이 %d 사용. 문자열을 넣을때는 %s 사용.
~~~

## 문자열 관련 함수들
- 문자 개수 세기(count)
~~~py
>>> a = "soccer"
>>> a.count('c')
2
~~~

- 위치 알려주기1 (find)
~~~py
>>> a = "Just do it"
>>> a.find('t')
3
-> 만약 찾는 문자나 문자열이 존재하지 않는다면 -1 을 반환한다.
~~~

- 위치 알려주기2 (index)
~~~py
>>> a = "Just do it"
>>> a.index('s')
2
-> 앞의 find 함수와 다른 점은 문자열 안에 존재하지 않는 문자를 찾으면 바로 오류가 뜬다.
~~~

- 문자열 바꾸기 (replace)
~~~py
>>> a = "Just do it"
>>> a.replace("do", "play")
'Just play it'
~~~




