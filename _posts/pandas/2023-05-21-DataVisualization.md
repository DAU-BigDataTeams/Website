---  
title: 데이터 시각화하기! 
layout: post  
categories : [pandas-study, matplotlib] 
image : /assets/img/study/pandas/pandas0.png
description:  데이터 시각화하기!
customexcerpt: matplotlib를 통한 간단한 데이터 시각화를 통해 내 데이터를 눈으로 보고, 꾸며보자!
---

<span class = "alert g">작성자 : 이수연</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

---
# **1. 개요** 
 
![포스트 시작](/assets/img/study/pandas/pandas0.png)   
>우리는 앞 포스트에서 우리가 뽀개보려 하는 판다스가 뭔지, 또 판다스가 어떤 자료형을 이용해 데이터를 표현하는지를 알아봄으로서 판다스를 통해 표현되는 데이터 구조를 이해했다.   

>이후 실제로 데이터를 가져와 다양한 명령어를 통해 분석하고, 간단하게 처리해보는 과정을 통해 판다스 사용의 기초를 알아보았다!

*오늘 포스트를 통해서는 이 데이터들을 시각화하는 방법에 대해 간단하게 알아보고자 한다.*  
*최대한 쉽고 간단하게 설명하려고 노력했으니 차근차근 읽고 따라해보며 시각화 기초를 마스터해보도록 하자!!!! 파이팅*

<br>

---
# **2. 데이터를 왜 시각화해야 할까?**

***Q. 어떤 방법으로 데이터를 분석하든 무조건 나오는 데이터 시각화, 그냥 데이터 간 평균, 분산 등을 계산해 간단히 처리해 보면 되는데 도대체 왜 귀찮게 시각화 과정을 거쳐서 분석하려고 하는 걸까?***

이 이유에 대해 해결책을 시원하게 내놓은 예시가 있다. 같이 살펴보자!


## **-엔스콤 4분할 그래프**
```
Group1_x=c(10.0,8.0.13.0.9.0.11.0.14.0.6.04.0.12.0.7.05.0)
Group1_y=c(8.04,6.95,7.58,8.81,8.33,9.96,7.24,4.26, 10.84,4.82,5.68)
Group2_x=c(10.0,8.0, 13.0,9.0, 11.0, 14.0,6.0,4.0, 12.0, 7.0,5.0)
Group2_y=c(9.14,8.14,8.74,8.77,9.26,8.10,6.13,3.10,9.13,7.26,4.74)
Group3 x=c(10.0,8.0,13.0,9.0,11.0,14.0,6.0,4.0,12.0,7.0,5.0)
Group3_у=c(7.46,6.77,12.74,7.11,7.81,8.84,6.08,5.39,8.15,6.42,5.73)
Group4 x=c(8.0,8.0,8.0,8.0,8.0,8.0,8.0, 19.0,8.0,8.0,8.0)
Group4_y=c(6.58,5.76,7.71,8.84,8.47,7.04,5.25, 12.50,5.56,7.91,6.89)
```
평균과 분산이 같은 데이터셋 4개를 가져와보았다. 

평균과 분산이 같다고? > *그럼 이 네개의 데이터셋이 완전히 똑같진 않더라도 거의 비슷할 게 분명하다?*  라고 생각하고 분석할 수 있다.

**그럼 이 데이터셋 4개를 그래프로 나타내볼까?**

![앤스콤그래프](/assets/img/study/pandas/pandas1.png) 


오잉? 그냥 전부 다 다른 그래프가 나왔다. 

이렇게 4가지 데이터셋의 평균이나 분산 등 수칫값이나 상관관계, 회귀선이 같더라도 실 데이터는 다를 수 있다는 것!  

결국 그래서 시각화 과정은 필요하다는 것을 알게 되었다!! 

<br>

---
# **3. 데이터 시각화(Matplotlib)**

이제 그럼 본격적으로 시각화를 맛볼 차례 ! ~~맛있겠다~~

오늘 사용해볼 라이브러리는 **matplotlib** 이다!

matplotlib는 판다스와 같이 [Python]을 기반으로 작동되고 대부분은 다른 라이브러리와 함께 쓰인다.


## **-matplotlib에 들어가기 전**

matplotlib와 pandas의 시너지효과를 알아보기 전 뒤에서 한번씩 들려올 이름인 NumPy를 아무 설명 없이 마주쳤을 때,,,,

`지금 하고있는 pandas랑 numpy가 대체 무슨 상관이고 이게 왜 지금 matplotlib를 하는 와중에 등장하는거지..? (사실 내가 제일 처음 했던 생각이기도 하다.. 화이팅)`

라는 어지러운 생각을 방지하기 위해 이 셋의 관계를 간단하게 정리해보았다.

>### NumPy는 무엇일까 

+ NumPy란, 파이썬의 **'핵심 수치 계산’** 라이브러리이다.(이름만 봐도 알 수 있다.) 다차원 데이터를 배열(array)으로 읽고 이 배열로 다양한 연산 등을 지원해 효과적인 수치 계산을 가능하게 한다. 지금 배우고 있는 pandas와 함께 사용해 데이터 로드, 전처리, 분석, 시각화를 수행하는 데에 매우매우매우 유용하다!   

*간단히 NumPy의 다차원 배열에 대해 예시를 통해 살펴보자(pandas를 배우는 우리에겐 살짝쿵 익숙한 느낌이 오죵?)* 
- 1차원 배열
    ```py
    import numpy as np #numpy를 불러와서 np라고 부르겠다
    test_np = [0,1,2,3,4,5,6,7,8]
    array1 = np.array(test_np)
    array1
    ```
    ```py
    array([0, 1, 2, 3, 4, 5, 6, 7, 8])
    ```
- 2차원 배열
    ```py
    array2 = array1.reshape(3,3)
    ```
    ```py
    array([[0, 1, 2],
           [3, 4, 5],
           [6, 7, 8]])  
- 3차원 배열
    ```py
    test_np2 = np.arange(0,27) #0~26
    array = np.array(test_np2)
    array3 = array.reshape(3,3,3)
    array([[[ 0, 1, 2],
            [ 3, 4, 5],
            [ 6, 7, 8]],

           [[ 9, 10, 11],
            [12, 13, 14],
            [15, 16, 17]],

           [[18, 19, 20],
            [21, 22, 23],
            [24, 25, 26]]])


이러한 배열끼리의 연산도 가능하다!(배열의 차원 또는 행렬 형태가 같다는 가정 하에)


>### pandas와 NumPy?
- 우리가 배우고 있는 pandas도 내부적으로는 NumPy를 기반으로 구현되어 있기 때문에 위와 비슷하게 데이터를 다룬다. (다만 판다스는 Series, DataFrame 형태를 취한다. [앞 포스트](https://bigdatateam.net/2023/05/09/StartPandas.html, "한 번 복습하고 올까욜?")를 통해 자세한 이해가 가능할지도 ><!!) 
- 여기에 더해 pandas 내에서 더 다양한 기능과 데이터 조작의 편의성을 제공해 데이터 로드와 전처리를 유용하게 해낼 수 있다! (*앞에 배운 것 + 차차 배워봅시다~*)

>### pandas, NumPy와 matplotlib
- 이러한 NumPy의 배열 구조를 활용해 matplotlib는 데이터를 **시각화**할 수 있다. matplotlib의 시각화 기능에 있어 핵심이 되는 `pyplot`이라는 하위 패키지 자체가 NumPy의 배열에 기초하여 작동한다. ( numpy의 등장에 어리둥절하지 않아도 되는 이유! matplotlib는 시각화에 특화된 라이브러리이기에 numpy 등의 다른 라이브러리와 함께 사용되는 경우가 있다.) pandas는 데이터를 로드하고 전처리하는 데에 유용하고, matplotlib는 그 데이터를 시각화하는 데 유용하다.


`요약하자면, NumPy는 파이썬의 ‘수치 계산’을 위한 라이브러리이고, pandas는 numpy를 기반으로 다양하게 데이터를 분석하고 조작해낼 수 있다. 이들은 matplotlib와 함께 사용되어 데이터 처리 및 시각화 작업을 지원하는 [python] 생태계 내부의 중요한 구성 요소들이다!`

<br>

## **-matplotlib 소개 및 기본 사용법**  

>### matplotlib 입니다!   

    이제 matplotlib에 대해 본격적으로 알아보자!

    앞에서 언급했듯이 matplotlib는 파이썬을 기반으로 데이터를 <시각화> 하는데 특화되어있는 라이브러리이다! 다른 라이브러리를 설치했던 방식과 유사하게 pip install matplotlib 를 입력해 설치해서 사용할 수 있다!

>### matplotlib를 통해 뭘 해볼까?
    이 matplotlib를 통해 우리는

- 일반적인 그래프부터 산점도(scatter plot), bar plot, box plot등 아주아주 다양한 종류의 그래프를 그려낼 수 있다! [공식 사이트](https://matplotlib.org/stable/plot_types/index.html, "그래프 뿌시러 가기")에서 다양한 그래프, 차트 샘플을 확인할 수 있다~
 
    ![공식 사이트](/assets/img/study/pandas/pandas2.png)

- 그래프를 꾸며서 더욱 보기 편하고 분석에 용이하게 만들 수도 있다!  
![그래프 꾸미기](/assets/img/study/pandas/pandas3.png)
- 여러 개의 그래프를 한 번에 그려낼 수도 있다!  
![그래프 여러개](/assets/img/study/pandas/pandas4.png)

*이 외에도 다양한 기능이 존재한다만 오늘은 matplotlib를 처음 접하는 사람들도 쉽게 따라해보고 흥미를 가질 수 있도록 기초적인 것들을 다루도록 하겠다 😊*

<br>

>### matplotlib 기초 잡기
matplotlib를 사용하기 위해 저번 시간에 `pandas` 일꾼을 고용했던 것과 마찬가지로 오늘은 matplotlib의 `pyplot`이라는 함수 모듈을 일꾼으로 고용해보도록 하겠다! 

**pyplot이란?**

`MATLAB`과 비슷하게 명령어 스타일로 동작하는 함수의 모음이다.

우리는 이 모듈 안에 있는 각각의 함수를 사용해 간편하게 **그래프 영역을 만들고, 표현하고, 꾸미는 등의 일**을 할 수 있다!

```py
import matplotlib.pyplot as plt #이제부터 matplotlib 안의 pyplot 모듈을 쓸 것이다. 간단하게 plt로 줄여서 부르도록!!
import numpy as np #앞에서 언급했던 그 numpy가 맞습니다~
```

이젠 그래프를 만들어볼 것이다.

그래프 만들기 위해선? 우선 그래프를 만들 **데이터**가 있어야만 한다! 

plt 모듈의 plot() 함수에 데이터를 입력해 기본 그래프를 그려볼 것이다. 이 함수로는 선, 마커 형태의 그래프를 그릴 수 있다!
- 하나의 리스트 형태로 값을 입력하면 입력값은 y의 값으로 인식되어 x 값은 기본값이 된다.
```py
 plt.plot([1,2,3,4]) #x= [0,1,2,3]
 ```
- 두 개의 리스트를 입력하면 각각 x,y값으로 인식한다.
```py
 plt.plot([1,2,3,4],[10,20,30,40]) #x, y 순서
```
- 기존 list, numpy의 array 형태의 데이터를 넣는 것 또한 가능하다.
```py
x = np.array([1,3,4,5]) 
y = np.array([2,3,5,6])
plt.plot(x,y)
```
- ***여기서 주의할 점! x 데이터의 개수와 y 데이터 개수가 같지 않으면 에러가 발생한다!***  

이제 입력된 표를 눈에 보이게 출력해주자
```py
plt.show() # 내가 만든 plot~... 보여줘!!
```
방법을 터득했으니 직접 기본적인 형태의 그래프를 만들어보자!

```py
import matplotlib.pyplot as plt
x = [1,2,3,4]
y = [2,3,4,5]
plt.plot(x, y)
plt.show()
```

![기본 표](/assets/img/study/pandas/pandas5.png)

이렇게 밋밋한 그래프가 나오게 된다.

*마음에 안 드는 이 그래프를 내 입맛대로 꾸며보도록 하자!!* 

<br>

## **-그래프를 내 입맛대로!**
<br>

> ### 그래프 옵션

- 축의 이름(xlabel, ylabel)
- 그래프 이름(title)
- 범례(legend)
- 축 범위(xlim, ylim, axis) 
xlim([0,10]) # x축 범위: [xmin, xmax]
- ylim([0,10]) #y축 범위: [ymin, ymax]
- 그리고 이 둘을 하나로 axis에 몽땅 집어넣어 간단히 사용할 수 있다!
- axis[(0,10,0,10]) # X, Y 축 범위 : [xmin, xmax, ymin, ymax]

글로만 보는 것 보다 가장 잘 머리에 남는 방법은 직접 실습해보는 것이다!  
직접 옵션을 넣어서 그래프를 꾸며 보자!
```py
import matplotlib.pyplot as plt
x = [1,2,3,4]
y = [2,3,4,5]
plt.plot(x, y)
plt.xlabel("ex1") #x축 이름
plt.ylabel("ex2") #y축 이름
plt.legend("A")  #범례
plt.axis([0,5,1,7]) #축 범위
```

![표 옵션](/assets/img/study/pandas/pandas6.png)

<br>

> ### 그래프 꾸미기
- 값들을 찍어놓은 마커의 모양, 점들을 라인으로 이어준다고 할 때 그 라인의 종류, 컬러를 조합해 내가 원하는 방식으로 그래프를 그릴 수 있는 것이다 !~!   
- 즐거운 그래프 꾸미기를 위한 꾸미기 도구들을 소개한다.

    - marker 종류

        |모양|이름|
        |---|----|
        |'.'|point marker|
        |','|pixel marker|
        |'o'|circle marker|
        |'v'|triangle_down marker|
        |'^'|triangle_up marker
        |'<'|triangle_left marker
        |'>'|triangle_right marker|
        |'1'|tri_down marker|
        |'2'|tri_up marker|
        |'3'|tri_left marker|
        |'4'|tri_right marker|
        |'s'|square marker|
        |'p'|pentagon marker|
        |'*'|star marker|
        |'h'|hexagon1 marker|
        |'H'|hexagon2 marker|
        |'+'|plus marker|
        |'x'|x marker|
        |'D'|diamond marker|
        |'d'|thin_diamond marker|
        |'_'|hline marker|
    - linestyle 종류

        |모양|이름|
        |---|----|
        |'-'|solid line style|
        |'--'|dashed line style|
        |'-.'|dash-dot line style|
        |':'|dotted line style|
    - color 종류


        |모양|이름|
        |---|----|
        |'b'|blue|
        |'g'|green|
        |'r'|red|
        |'c'|cyan|
        |'m'|magenta|
        |'y'|yellow|
        |'k'|black|
        |'w'|white|


이 친구들을 plt.plot() 함수 속데이터 값 뒤에 추가해 자유자재로 그림을 그려낼 수 있다! 이것도 그냥 표만 보고 넘기지 않고 직접 해보도록 하겠다. (~~몇 번 하다 보면 다꾸보다 표.꾸가 더 재밌을지도.~~) 

*위의 표를 보고 각자가 직접 만들고 싶은 모양을 넣어 시도해보면 좋겠다! **지금 바로.***
```py
import matplotlib.pyplot as plt
x = [1,2,3,4]
y = [2,3,4,5]
plt.plot(x, y, ‘r--o’) #점은 동그란 모양으로, 선은 점선, 색은 빨간색으로 그려줘!

# 참고 : 물론 각각의 변수를 따로 넣어 표현할 수도 있다(길어지고 귀찮긴 하지만 코드 자체는 보기 훨씬 편하겠쬬?) 
plt.plot(x,y,color=’red’ , linestyle=’-.’, marker=’o’ # 오더 내용은 위와 똑같다.
```  
![format string](/assets/img/study/pandas/pandas7.png)

<br>

>### + 여러 개의 곡선을 그려보자

<br>

***Q.한 그래프 내에 여러 개의 선을 한꺼번에 나타낼 순 없을까?***

`
A. 기본적으로는, plot() 함수 안에 x, y의 값, 지정하고 싶은 스타일(없어도 됨) 순서로 여러 번 입력한다면 여러 개의 선이 한 그래프에 나타나게 된다! 예시를 통해 무슨 말인지 제대로 살펴보자.
`
```py
import matplotlib.pyplot as plt
x = [1,2,3,4]
y = [2,3,4,5]
y2 = [3,4,5,6]

#나는 (x, y)의 그래프와 (x,y2)의 그래프를 같이 표현하고 싶다.

plt.plot(x, y, x, y2) #여기서 +스타일 지정도 가능! 난 그냥 밋밋하게 놔두도록 하겠다.
```
![여러 선 그래프](/assets/img/study/pandas/pandas8.png)


## **- matplotlib 내의 다양한 그래프 유형, 활용 방법**
>이제 matplotlib에 대한 기초를 알아봤으니 matplotlib 31 맛보기스푼을 이용해 한 숟가락씩 맛보도록 하자. ~~맛있겠다~~

- ***BAR plot***

   > plot() 대신 bar()를 이용해 막대그래프로 시각화할 수 있다.
    ```py
    import matplotlib.pyplot as plt
    x = [1,2,3,4]
    y = [2,3,4,5]
    plt.bar(x, y)
    ```
    ![막대그래프](/assets/img/study/pandas/pandas9.png)

    밋밋한 막대그래프도 꾸며줘볼까?
    ```py
    color = ['yellow','blue','pink','red']
    plt.bar(x,y, color = color , width = 1.0 )#color = 특정 색으로 직접 지정해줄 수도 있다~~
    #width를 통해 그래프의 폭 또한 결정할 수 있다!
    ```  
    ![막대그래프2](/assets/img/study/pandas/pandas10.png)

- ***Scatter Plot(산점도)***

    > plot() 대신 scatter()를 통해 산점도로 시각화할 수 있다.

    numpy의 random 모듈 안에 포함된 rand() 함수를 이용해 랜덤한 수를 각각 ()안에 넣은 수만큼 만들 수 있다. 이를 이용하여 산점도를 그려보자!(배운 건 써먹어야지.)
    ```py
    import matplotlib.pyplot as plt
    import numpy as np
    x3 =np.random.rand(20)
    y3 = np.random.rand(20)
    plt.scatter(x3,y3, c= ‘red’) # 산점도는 c를 이용해서 색을 나타낼 수 있다!
    ```
    ![산점도](/assets/img/study/pandas/pandas11.png)

- ***여러 개의 그래프를 한 번에?!*** - *Subplot*

    >subplot()함수를 통해 여러 종류의 그래프를 한 가지의 그림에 모두 집어넣어보도록 하쟈. (앞에 나온 세 가지의 그래프를 한 번에?!)

    plt.subplot(행, 열, 현재 그래프의 위치(index)) 의 구조로 이루어져 있다
    ```py
    plt.subplot(1,3,1) #1, 3 행렬의 모양으로 그래프들을 집어넣을 거고, 지금 그래프는 첫번째에 위치한다! 자리로 가도록
    plt.plot(x,y) #넵.
    plt.subplot(1,3,2) #차곡차곡 옆으로 쌓아나가 보자
    plt.bar(x,y) 
    plt.subplot(1,3,3)
    plt.scatter(x3,y3)
    plt.show()
    ```  
    ![여러개 그래프](/assets/img/study/pandas/pandas12.png)

<br>

---
# **4. 무궁무진한 matplotlib**

~~*벌써 끝인가요..*~~  
>[Matplotlib Tutorial](https://wikidocs.net/book/5011, "시각화 뿌시러 가기")  << 여기 Maplotlib Tutorial을 통해 더욱 더 많은 내용을 살펴볼 수 있다.  

<br>

>[공식 사이트](https://matplotlib.org/stable/plot_types/index.html, "그래프 뿌시러 가기") << 초반에서 설명했듯이 공식 사이트를 통해 다양한 함수 모듈과 표현할 수 있는 그래프의 종류들 등 matplotlib를 이용하는 많은 방법들을 소개해놓았다.  

*하나하나 해보며 익숙해지면 간단한 데이터 시각화 정도는 눈 감고도 할 수 있을 것.* 


이렇게 오늘은 데이터를 간단히 시각화하는 방법을 알아보았다.  
우리는 이제 앞으로 더 나올 pandas의 다양한 사용방법들을 숙지해서 간편하고 빠르게 데이터를 조작할 수 있고, 오늘 알아본 시각화 방법을 통해 그 데이터들을 시각화할 수도 있다! >< 얏호

오늘 포스트는 여기서 마무리해보도록 하겠다. 쉽지만 필요한 내용은 최대한 꼭꼭 넣어서 만들어보려 노력했는데 잘 전달되었으면 좋겠다..!! 그럼 다음 포스트에서 만나용! 바이