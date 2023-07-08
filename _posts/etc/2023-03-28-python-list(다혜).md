---
title: 파이썬 리스트(List)를 공부해봤어요
layout: post   
categories : [python-study, list] 
description: 파이썬 리스트(List)  
customexcerpt: 파이썬 리스트(List)에 대해 알아보자!
---

<span class = "alert g">작성자 : 전다혜</span>


* random line to make it work. This will be removed.
{:toc}

# 파이썬 리스트

## 리스트 인덱싱
~~~ py  
a = [1, 2, 3, 6, 12]
a[0] + a[3]
~~~
<pre> 
7
</pre> 

## 리스트 삼중 인덱싱
~~~ py 
a = [1, 2, 3, ['a', 'b', ['Time', 'is', 'money']]]
a[3][2][1]
~~~
<pre> 
'is'
</pre> 

## 리스트 슬라이싱
~~~ py  
a = [1, 2, 3, 6, 12]
a[0:3]
~~~
<pre> 
[1, 2, 3]
</pre> 

~~~ py 
b = a[:2]
b
~~~
<pre> 
[1, 2]
</pre> 

~~~ py 
c = a[2:]
c
~~~
<pre>
[3, 6, 12]
</pre> 


## 중첩된 리스트에서 슬라이싱
~~~ py  
a = [1, 2, 3, ['a', 'b', 'c'], 4, 5]
a[2:5]
~~~
<pre>
[3, ['a', 'b', 'c'], 4]
</pre> 

~~~ py 
a[3][:2]
~~~
<pre>
['a', 'b']
</pre> 
'''
리스트가 포함된 중첩 리스트 역시 슬라이싱 방법은 똑같이 적용된다.
'''

## 리스트 연산
~~~ py  
a = [1, 3, 5]
b = [2, 4, 6]
a + b 
~~~
<pre>
[1, 3, 5, 2, 4, 6]
</pre> 

~~~ py  
a * 2
# 참고로 정수와 문자열은 서로 더할 수 없다.
~~~
<pre>
[1, 3, 5, 1, 3, 5]
</pre> 

## 리스트 길이구하기
~~~ py  
a = [1, 2, 3, 4, 5]
len(a)
~~~

<pre>
5
</pre> 


## 리스트의 수정과 삭제
~~~ py  
a = [3, 5, 9]
a[1] = 6
a
~~~

<pre>
[3, 6, 9]
</pre> 

~~~ py 
a = [3, 6, 9]
del a[1]
a
~~~

<pre>
[3, 9]
</pre> 

----

## 리스트 관련 함수들

## 리스트에 요소 추가 (append)
~~~ py  
a = [1, 3, 5]
a.append(7)
a
~~~

<pre>
[1, 3, 5, 7]
</pre> 

~~~ py 
a.append([9,11])
a
~~~

<pre>
[1, 3, 5, 7, [9, 11]]
</pre> 

## 리스트 정렬 (sort)
~~~ py  
a = [1, 6, 3, 2]
a.sort()
a
~~~ 

<pre>
[1, 2, 3, 6]
</pre>

## 리스트 뒤집기 (reverse)
~~~ py  
a = ['money', 'is', 'Time']
a.reverse()
a
~~~

<pre>
['Time', 'is', 'money']
</pre>

## 인덱스 반환 (index)
~~~ py  
a = [1,2,3,4,5]
a.index(3)
~~~  

<pre>
2
</pre>


## 리스트에 요소 삽입 (insert)
~~~ py  
a = [1, 5, 7]
a.insert(1, 3)
a
~~~

<pre>
[1, 3, 5, 7]
</pre>

## 리스트 요소 제거 (remove)
~~~ py  
a = [2, 4, 5, 4, 8]
a.remove(4)
a
~~~

<pre>
[2, 5, 4, 8]
</pre>

```remove(x) 는 리스트에서 첫 번째로 나오는 x 를 삭제```

## 리스트 요소 끄집어내기 (pop)
~~~ py  
a = [2,4,7]
a.pop()
~~~

<pre>
7
</pre>

~~~ py  
a
~~~

<pre>
[2, 4]
</pre>


## 리스트에 포함된 요소 x 의 개수 세기 (count)
~~~ py  
a = [1,2,3,1,2,1,1,3,2]
a.count(1)
~~~  

<pre>
4
</pre>

## 리스트 확장 (extend)
~~~ py  
a = [3,4,5]
a.extend([6,7])
a
~~~ 

<pre>
[3, 4, 5, 6, 7]
</pre>