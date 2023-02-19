---
title: kaggle Python corues 
layout: post   
categories : Python, Programming, kaggle
image : /assets/img/수료증/김아영-파이썬-수료증.png
description: kaggle-python-review
customexcerpt: kaggle의 Python 과정을 수료하며 작성한 리뷰!
---


# Hello, Python - 가독성, 단순성 첵오 :)
변수 할당 : num이라는 변수를 만들고 **=** (할당 연산)를 사용해 0값을 할당

<span style ="color:red">***note**</span> <br>
+ 변수를 할당하기 전에 선언할 필요없음<br>
+ 어떤 유형의 값을 참조할 것인지 파이썬한테 알려줄 필요없음. string, boolean과 같은 다른 종류의 것을 참조하기 위해 변수 재할당 가능
+ 조건을 코드화 할때, 코드 블록의 시작과 끝을 표시하기위해{}사용. but, 파이썬은 **:** 사용

함수 호출: 함수(인수)
주석 : #
~~~python
#예시
num = 0
print(num)
num=num+2
viking = num*"magic"
print(viking)
type(num)
~~~
num에 할당하는 값은 이전 값에 대한 간단한 산술을 포함.  Python은 =(0 + 2 = 2의 오른쪽에 있는 식을 평가한 다음 왼쪽에 있는 변수에 해당 값을 할당<br>
<span style ="color:red">파이썬은 의미있는 공백 사용</span> <br>

문자열에 숫자를 곱해 여러번 반복된 버전을 얻을 수 있음

|Operator|Name|Description|
|------|---|---|
|a + b|Addition|Sum of a and b
|a - b|Subtraction|Difference of a and b
|a * b|Multiplication|Product of a and b
|a / b|True division|Quotient of a and b
|a // b|Floor division|Quotient of a and b, removing fractional parts
|a % b|Modulus|Integer remainder after division of a by b
|a ** b|Exponentiation|a raised to the power of b
|-a|Negation|The negative of a

<hr>

### Order of operations
~~~python
hat_height_cm = 25
my_height_cm = 190
# How tall am I, in meters, when wearing my hat?
total_height_meters = hat_height_cm + my_height_cm / 100
print("Height in meters =", total_height_meters, "?")
#값이 이상하게 나옴 -> ()사용 필수
total_height_meters = (hat_height_cm + my_height_cm) / 100
print("Height in meters =", total_height_meters)
~~~
abs() : 절대값
~~~python
print(abs(-32))
~~~

# Functions and Getting Help
~~~python
help(round)
~~~
help()는 2가지를 나타냄<br>
1. 해당 함수의 헤더 ex) round(number, ndigits=None) 우리가 숫자로 설명할수있는 인수 사용, ndigits로 설명할 수 있는 별도의 인수를 선택적으로 제공 가능
2.  함수 기능에 대한 간단한 영어 설명

일반적인 함정 : 함수를 찾을 때는 함수를 호출한 결과가 아닌 함수 자체의 이름을 전달해야함
### Defining functions
함수는 def 키워드에 의해 시작됨.<br>함수가 호출될때 : 뒤에 오는 코드의 들여쓰기 블록 실행<br> return(반환문)을 만나면 즉시 종료하고 오른쪽에 있는 값을 호출 컨텍스트로 전달
~~~python
def least_difference(a, b, c):
    diff1 = abs(a - b)
    diff2 = abs(b - c)
    diff3 = abs(a - c)
    return min(diff1, diff2, diff3)
print(
    least_difference(1, 10, 100),
    least_difference(1, 10, 10),
    least_difference(5, 6, 7),
    # Python은 인자목록에 ,를 허용함
)
~~~
### Functions that don't return
~~~python
def least_difference(a, b, c):
    diff1 = abs(a - b)
    diff2 = abs(b - c)
    diff3 = abs(a - c)
    # return이 없으므로 None 반환
print(
    least_difference(1, 10, 100),
    least_difference(1, 10, 10),
    least_difference(5, 6, 7),
    # Python은 인자목록에 ,를 허용함
)
~~~
### Default arguments
~~~python
print(1, 2, 3, sep=' < ')
# 구분자를 지정해 두지않으면 ' '이 기본값
print(1, 2, 3)

def greet(who="Colin"):
    print("Hello,", who)
    
greet()
greet(who="Kaggle")
# who="Kaggle"이라고 할필요없음 왜냐? 모호하지않기때문
greet("world")
~~~
### Functions Applied to Functions(함수의 인자에 함수제공 가능)
~~~python
def mult_by_five(x):
    return 5 * x

def call(fn, arg):
    """Call fn on arg"""
    return fn(arg)

def squared_call(fn, arg):
    """Call fn on the result of calling fn on arg"""
    return fn(fn(arg))

print(
    call(mult_by_five, 1),
    squared_call(mult_by_five, 1), 
    sep='\n', 
    # 줄바꿈 : '\n' 
)
~~~
# Booleans and Conditionals
bool : True /False
### 비교연산자

|Operator|Description|Operator|Description|
|------|---|---|---|
|a == b	|a equal to b		|a != b	|a not equal to b
|a < b	|a less than b		|a > b	|a greater than b
|a <= b	|a less than or equal to b|		a >= b	|a greater than or equal to b

* 비교할 경우, = 대신 ==을 사용해야 함. 
* 비교연산자는 and, or, not과 같이 사용가능
~~~python
def can_run_for_president(age, is_natural_born_citizen):
    """Can someone of the given age and citizenship status run for president in the US?"""
    # The US Constitution says you must be a natural born citizen *and* at least 35 years old
    return is_natural_born_citizen and (age >= 35)

print(can_run_for_president(19, True))
print(can_run_for_president(55, False))
print(can_run_for_president(55, True))
~~~
~~~python
def inspect(x):
    if x == 0:
        print(x, "is zero")
    elif x > 0:
        # 다른언어같은경우, else if 사용 
        print(x, "is positive")
    elif x < 0:
        print(x, "is negative")
    else:
        print(x, "is unlike anything I've ever seen...")

inspect(0)
inspect(-15)

print(bool(1)) 
print(bool(0)) 
# 0을 제외한 모든 숫자는 true 
print(bool("asf"))
print(bool(""))
# ""을 제외한 모든 문자는 ture
~~~
# Lists
~~~python
primes = [2, 3, 5, 7]   # 숫자
planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']   # 문자
hands = [   # 리스트안에 리스트 생성 가능
    ['J', 'Q', 'K'],
    ['2', '2', '2'],
    ['6', 'A', 'K'],
    # 마지막 요소를 넣은 후 , 는 선택사항
]

hands = [['J', 'Q', 'K'], ['2', '2', '2'], ['6', 'A', 'K']]
# 한줄로 나열해도 괜찮으나 가독성에서 떨어짐 
my_favourite_things = [32, 'raindrops on roses', help]
# 다양한 타입의 값이 들어갈수있음
~~~
### indexing & Slicing & Changing lists

~~~python
# 인덱싱사용가능
planets[0]  # 첫번째꺼
planets[-1] # 맨마지막
# 목록 끝에 있는 요소는 -1부터 시작하여 음수로 접근가능

# 슬라이싱
planets[0:3]    # 0: 시작 3: 0에서부터 3개
planets[:3]     # 시작시점을 안적을 경우, 0으로 default
planets[3:]     # 끝지점을 안적을 경우, 리스트의 길이로 default
planets[1:-1]   # 맨처음과 맨끝빼고 
planets[-3:]    #끝에꺼 3

# 리스트 값 바꾸기
planets[3] = 'Malacandra'
planets[:3] = ['Mur', 'Vee', 'Ur']
print(planets)
~~~
### List functions
~~~python
len(planets)    # 리스트 갯수
sorted(planets)     # alphabetical 순으로 정렬

primes = [2, 3, 5, 7]
sum(primes)     # 합
max(primes)     # 최대
~~~
method : 객체에 연결된 함수
~~~python
planets.append('Pluto')     # 맨 뒤에 추가
planets.pop()   # 리스트에서 맨 마지막 요소를 제거하고 반환

'''Searching lists'''
planets.index('Earth')  # 목록에서 위치를 알고싶을때
planets.index('Pluto')  # 없는것을 출력하면 오류
"Calbefraques" in planets      # 오류 발생을 막기위해 사용 False 면 없는거 
~~~
### Tuples
리스트와 비슷하지만 다른점이 2가지 존재
1. [ ]대신 ( )사용
2. 튜플속 내용을 수정할수없음
3.  다중 반환이 가능함

~~~python
a = 1
b = 0
a, b = b, a     # 스위치 함수를 따로 만들지않아도 한줄로 스위치 가능!
print(a, b)
~~~
# Loops and List Comprehensions
루프는 일부 코드를 반복적으로 실행하는 방법<br>
for()문에서 지정해야하는 것
1. 사용할 변수 이름
2. 반복할 값 집합<br>
   in을 사용해서 위 2개를 연결해준다. in 오른쪽에 있는 객체는 반복을 지원하는 객체. 만약 어떤것의 그룹이라고 생각되면, 반복할수있다.(리스트, 튜플 가능)(문자열의 문자도 반복가능)

range() : 일련의 숫자를 반환하는 함수. 반복문을 작성하는 데 매우 용함
while() : 조건이 만족될때까지 반복 즉, 반복문이 False가 될때까지 실행
### List comprehensions
~~~python
squares = [n**2 for n in range(10)]
squares

square = []
for n in range(10):
    square.append(n**2)
square

short_planets = [planet for planet in planets if len(planet) < 6]
# if 조건문 삽입 가능
short_planets

# SQL의 WHERE이랑 유사

def count_negatives(nums):
    """Return the number of negative numbers in the given list.
    
    >>> count_negatives([5, -1, -2, 0, 3])
    2
    """
    n_negative = 0
    for num in nums:
        if num < 0:
            n_negative = n_negative + 1
    return n_negative
    
def count_negative(nums):
    return len([num for num in nums if num < 0])
# min, max, sum과 같은 함수와 결합된 리스트 표현식은 위와같이 한줄로 표현이 가능하다.

def count_negativess(nums):
    # Reminder: in the "booleans and conditionals" exercises, we learned about a quirk of 
    # Python where it calculates something like True + True + False + True to be equal to 3.
    return sum([num < 0 for num in nums])
~~~
# Strings and Dictionaries
### Strings
파이썬은 '' , " "를 사용해 문자열 정의 가능<br>
" " : 문자열에 하나의 따옴표 문자가 포함된 경우에 편리
' ' : 큰따옴표를 포함하는 문자열에 편리
~~~python
#'Pluto's a planet!' # 파이썬이 혼란스러워해서 오류 !
'Pluto\'s a planet!'    # \사용해 오류해결

hello = "hello\nworld"  # \n : 줄바꿈
print(hello)    # print()는 \n이 default

triplequoted_hello = """hello
world"""    # """사용할경우 따로 \n 사용할 필요업이 문자 그대로 새줄을 포함가능
print(triplequoted_hello)
triplequoted_hello == hello
~~~
리스트와 마찬가지로 **인덱싱, 슬라이싱 가능** but, 리스트와 다르게 **수정불가능**
#### Sring methods
리스트와 마찬가지로 str도 유용한 메서드 존재
~~~python
claim = "Pluto is a planet!"
claim.upper()   # 대문자로
claim.lower()   # 소문자로
claim.index('plan') # Searching for the first index of a substring
claim.startswith(planet)
claim.endswith('planet')    # False 인 이유 : 느낌표가 뒤에 있기 때문

#.split()
words = claim.split()   # 공백으로 구분 지어서 나눔 
words

datestr = '1956-01-31'
year, month, day = datestr.split('-')   # 내가 원하는대로 문자 구분 지을수있음

#.join()
'/'.join([month, day, year])    #'/'을 구분자로 해서 하나로 합침
' 👏 '.join([word.upper() for word in words])   # 유니코드도 사용가능

# .format()
position = 9
"""planet + ", you'll always be the " + position + "th planet to me." # 오류발생 ..!!!!! 왜냐구 ? position이 int라소 .."""

planet + ", you'll always be the " + str(position) + "th planet to me."     # 타이핑도 기찮고 가독성 떨어져ㅠ

"{}, you'll always be the {}th planet to me.".format    (planet, position)  # "{}".formnat() => 말그대로 스트링으로 format

s = """Pluto's a {0}.
No, it's a {1}.
{0}!
{1}!""".format('planet', 'dwarf planet')
print(s)    #익데스별 포맷 인수 가능
~~~
### Dictionaries
Dictionaries : 키를 값에 매핑하기 위한 기본 Python 데이터 구조
~~~python
numbers = {'one':1, 'two':2, 'three':3}
numbers['one']  # 값은 리스트와 스트링과 유사하게 [ ]을 통해 접근
numbers['eleven'] = 11  # 같은 구조로 key, value 한쌍 추가 가능
numbers

numbers['one'] = 'Pluto'    # 기존 key와 관련된 value값 변경 가능
numbers
~~~
list comprehensions과 비슷한 구문인 딕셔너리도 **dictionary comprehensions** 존재
~~~python
planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
planet_to_initial = {planet: planet[0] for planet in planets}
planet_to_initial

'Betelgeuse' in planet_to_initial   # in : 딕셔너리의 key값 인지 아닌지 알려줌
~~~
dict.keys() / dict.values() : 모든 key / 모든 value 접근 가능
~~~python
' '.join(sorted(planet_to_initial.values()))
~~~ 
dict.items() : key 와 value를 동시에 반복해서 사용 가능
~~~python
for planet, initial in planet_to_initial.items():
    print("{} begins with \"{}\"".format(planet.rjust(10), initial))
~~~
# Working with External Libraries
### Imports
python의 가장 큰 장점 중 하나는 고품질의 사용자 지정 **라이브러리**가 존재한다는것<br>
<span style ="color:red">***표준라이브러리** </span> : 파이썬을 실행하는 모든곳에서 찾을 수 있음. 다른 라이브러리는 파이썬과 함께 제공되지 않더라도 쉽게 추가 가능. import를 통해 코드에 접근 가능

~~~python
import math as mt   #  as 이용해서 더 짧은 별칭으로 가져와 입력을 저장할수있
print(dir(mt))
# math는 모듈임. 모듈은 다른 사용자가 정의한 변수의 모음. 내장 함수 dir()를 사용하여 수학의 모든 이름 볼수 있음.
print("pi to 4 significant digits = {:.4}".format(mt.pi))
mt.log(32, 2)
~~~
'import *'는 때때로 이상하고 디버깅하기 어렵다.<br>
아래의 문제는 math  모듈과 numpy모듈이 모두 log라는 함수를 가지고 있지만 의미론적으로 다르다는것이다. 두번째로 numpy 가 import 되었기 때문에, log는 math에서 가져온 log변수를 덮어쓴다.<br>
-> 각 모듈에서 필요한 특정 항목만 가져오는것이 가장 best
~~~python
from math import *
from numpy import *
print(pi, log(32, 2))
~~~
### Submodules
모듈이 함수나 값을 참조할 수 있느 변수를 포함. **다른 모듈을 참조하는 변수도 있을 수있음.** 하위모듈에서 함수를 호출하려면 2개의 . 이 필요함
~~~python
import numpy
rolls = numpy.random.randint(low=1, high=6, size=10)
rolls
~~~
이상한 객체들을 이해하기위한 3가지 도구
1. type(): 이게 뭔데 ?
2. dir() :  이걸로 내가 뭘 할수있는데 ?
3. help() : 더 많은 정보가 필요하니 말해주 !
~~~python
import numpy
# [3, 4, 1, 2, 2, 1] + 10 # TypeError: can only concatenate list (not "int") to list
rolls = numpy.random.randint(low=1, high=6, size=10)
rolls + 10

xlist = [[1,2,3],[2,4,6],]
# Create a 2-dimensional array
x = numpy.asarray(xlist)
print("xlist = {}\nx =\n{}".format(xlist, x))
x[1,-1]
xlist[1,-1]     # TypeError:  리스트 인덱스는 튜플이 아닌 정수 또는 슬라이스 여야함
~~~
a+b가 2가 아님 -> Operation의 출력중 하나에 대한 기호핸들. 해당 연산의 출력 값을 보유하지않고 텐서플로우 tf.Session 에서 해당 값을 꼐산하는 수단을 제공
~~~ python
import tensorflow as tf
# Create two constants, each with value 1
a = tf.constant(1)
b = tf.constant(1)
# Add them together to get...
a + b
~~~
라이브러리들이 종종 명확하지않거나 마법처럼 보이는 방식으로 연산자 과부하를 사용한다는 사실을 아는것이 중요<br>
python 연산자가 int, 문자열 및 list에 적용될때 어떻게 작동하는지 이해한다고해서 tensorflow Tensor, numpy ndarray, pandas DataFrame 에 적용될 때 그들이 무엇을 하는지 즉시 이해할 수 있다는 보장 할수없음.
~~~ python
import DataFrame as df
df[(df['population'] > 10**6) & (df['continent'] == 'South America')]
~~~
<hr>

![python](/assets/img/수료증/김아영-파이썬-수료증.png)