---  
title: 판다스와 데이터분석 시작해보기!
layout: post 
categories : [python-study, big-data, pandas ]
image :
description: 판다스와 데이터분석 시작해보기! 
customexcerpt: 파이썬의 판다스 라이브러리를 통해 데이터 조작 및 분석을 효율적으로 처리하기 위한 첫 걸음을 내딛어보쟈!  
---

<span class = "alert g">작성자 : 임가겸</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# 1. 왜 ‘판다스’인가?

## 판다스란

- PANDAS이름의 유래
    
    : 계량 경제학 용어 ‘Panel Data System(Analysis)’에서 유래
    
    패널[그룹] 데이터: 여러 개체들을 시간을 두고 추적하여 얻는 데이터
    
- 기능
    
    python 라이브러리로서, 데이터 조작과 분석을 위한 자료형 (데이터프레임, 데이터시리즈)과 기능을 제공
    
- 장점
    
    ~~반복되고 강조되는 소리는 강아지를 불안하게… 가 아니고🐼~~
    
    - 간편하다!
        - 데이터 분석과 관련된 또 다른 대표개념 중 SQL문이 있지만, SQL은 판다스에 비해 무거운 편!
        - “이걸 왜 SQL로 안하고 판다스로 하지?”하는 질문은 점차 “왜 SQL로 하지?”로 바뀔 것이다!
    - 빠르다!
        - 반복되는 데이터 분석 작업을 프로그래밍화해 수정 삭제 등 데이터조작을 빠른 속도로 처리할 수 있다! (그렇기에 또한 간편하다!)
            
            ~~반복되고 강조되는 느낌표는… 🐼~~
            

# 2. 판다스의 자료형(데이터 구조)

## 데이터 시리즈(**Data Series**): 1차원

```
해리포터 시리즈를 아는가?
나는 초등학생 때 비디오로 해리포터 시리즈를 보고 테이프를 돌리고 보고 돌리고를 반복한 기억이 있다. 손 갖다대면 전자파가 느껴지는 그 테레비로!
판다스의 ‘데이터시리즈’ 역시 비슷하다. 
줄줄이 소세지처럼 한 정보 건너 한 정보씩 이어진 구조를 떠올리면 된다!
```

**Data Series:** One-dimensional ndarray(1차원 ndarray)

- ndarray는 파이썬의 수치해석용 라이브러리인 numpy[넘파이]의 다차원 행렬 자료구조 클래스로,
    
    python의 list 자료형보다 선형대수 연산에 유리한 장점들을 가진 친구이다. 
    
    - 조금 더 구체적으로 설명하자면 C의 array처럼 정보들이 인접한 메모리에 나열되게끔 해 더 빠른 연산을 돕는다고 한다.
- 일단은 대강 **1차원 배열** 정도로 생각해두면 좋다.

## 데이터 프레임(Data Frame): 2차원

```
시리즈. 프레임. 이 단어 자체에서 연상되는 이미지를 떠올려보자.
프레임하면 어떤 이미지가 떠오르는가? 나는 격자무늬 고기불판이 떠오른다!
삼겹살에 소금과 후추를 뿌려 버섯과 함께 야채 쌈을 싸먹으면 정말 맛있을텐데.
즉, 줄줄이 소세지를 연달아 늘어 놓으면 가로 세로의 행렬이 생기는 모양새를 떠올리면 된다!
```

**Data Frame:** Two-dimensional, size-mutable, potentially heterogeneous tabular data (2차원의, 사이즈가변적이며, 잠재적으로 이질적인 표 데이터) 

- ~~어지러운 영자들과 한글들의 콜라보는 팬더를 불안하게 해요🐼~~
- 마찬가지로 대강 **2차원 표 데이터** 정도로 생각해두자.
    - 2차원 표 데이터는 ‘엑셀’과 같은 스프레드 시트 프로그램을 통해 이미 우리는 자주 만나봤다.
    - 따라서 엑셀파일, CSV파일(콤마 구분 텍스트 데이터), TSV파일(탭 구분 텍스트 데이터)을 데이터프레임으로 읽어올 수 있다
- 혹은 **데이터 시리즈들이 각 요소가 되는 딕셔너리**라고 파이썬식으로 생각해도 좋다!

### +) 데이터 구조

조금만 더 깊게 들어가보자면, 

```
"Data structure also contains labeled axes (rows and columns). Arithmetic operations align on both row and column labels. Can be thought of as a dict-like container for Series objects. The primary pandas data structure."
"데이터 구조는 또한 꼬리표(label)가 달린 축(행들과 열들)을 포함합니다. 산술 연산은 행과 열 꼬리표에 맞춰 정렬합니다. 시리즈Series 객체의 딕셔너리와 유사한 컨테이너로 생각할 수도 있습니다. 판다스 기본 데이터 구조입니다."
- [판다스공식문헌](https://pandas.pydata.org/pandas-docs/stable/index.html)
```

이러한 데이터 구조(데이터 프레임, 데이터 시리즈)들은 **행과 열**을 구조로 해 **산술 연산**을 효율화하는 데 도움을 주는 듯 하다.

# 3. 데이터 집합 불러오기

## 데이터 불러오기

```
나는 배가 고프다! 밥상을 차려보자!
나: 재료들은 다 내가 갖고 있으니,
		줄줄이 소세지와 격자무늬 불판으로 구워진 삼겹살을 대령해오거라!!

...

나: 아 맞다. 내 꼬봉을 먼저 불러와야지? 어이- 꼬봉!
꼬봉: 뭐.
나: 너! 줄줄이 소세지와 격자무늬 불판으로 구워진 삼겹살을 대령해오너라!
꼬봉: ㅇㅋ
```

- 위 상황에서 데이터 집합과 대응되는 인물을 알맞게 고르시오. 그렇다! 데이터 집합을 불러와서 일을 하기 전에 일꾼을 먼저 고용해야 한다.

```python
import pandas #pandas 꼬봉을 고용하겠소 음머~
```

- 그런데 나는 두 번 말 하는 걸 싫어한다.
    
    밥을 먹을 때 마다 꼬봉을 불러서, 어디에 음식창고가 있고… 어쩌구 저쩌구를 설명하고 싶지 않으니, 변수를 만들어서 그냥 말해주자!
    

```python
df = pandas.read_csv('./fav_animal.csv')
#pandas 꼬봉은 앞으로 탁자에 위 경로의 음식창고의 재료를 사용해 df 탁자에 요리물을 나두거라!
```

- **경로 입력 시 팁**:
    - 나는 주로 절대경로보다는 상대경로를 자주 이용하는데 (문서 공유 또는 소스파일 공개를 통한 문서 정보 보안을 위해) 상대경로 사용은 아래와 같이 하면 된다.
        
        `./xpile/ypile.csv` : 현재 소스파일이 담긴 파일 (`./`)의 하위 파일 중 xpile을 찾고 (`xpile`) 이 xpile의 관점에서(`/`) ypile.csv를 찾아 참고(`ypile.csv`)해라
        
        `./fav_animal.csv` : 현재 소스파일이 담긴 파일의 하위파일 중 (내 소스파일과 같이 들어있는 애 중) fav_animal.csv 파일을 찾아 참고해라
        
    - `./`가 내 상위 파일의 관점일 때 `../`는 내 상위의 상위파일 관점이 된다.
    - ‘상위’라는 말이 헷갈리면 ‘내가 든’으로 치환해서 생각하면 좀 낫다.

---

## 데이터 확인하기 실습


쟈! 그러면 이제 df 식탁에 어떤 재료들이 놓여져있는지 살펴보자!

가장 간편히 확인하는 방법은 `info( )` 명령을 사용하는 것이다.

```python
import pandas as pd #pandas 꼬봉! 이름이 너무 길다. 앞으론 pd라 부르겠다!
df = pandas.read_csv('./fav_animal.csv') #df식탁에는 fav_animal 음식창고의 재료들만 사용해야 한다
print(df.info()) #대화형 콘솔창에서는 df.info()만해도 되지만 일반 python콘솔에서는 print함수로 감싸주는 것이 안전하다.
```

그리고 결과

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 9 entries, 0 to 8
Data columns (total 7 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   Animal  9 non-null      object
 1   Korean  9 non-null      object
 2   수명      9 non-null      int64 
 3   과       9 non-null      object
 4   학명      9 non-null      object
 5   등록연도    9 non-null      int64 
 6   등록자     9 non-null      object
dtypes: int64(2), object(5)
memory usage: 632.0+ bytes
None
```

- 쟈! 그래서 저 호출결과가 의미하는 것이 무엇이느냐고?! 그림으로 설명해주겠다
    
    ~~(사실 글로 설명해도 되지만 내가 그림을 그리고 싶기 때문!)~~
    
    ![info_method_print](assets\img\pandas\img\Untitled.png)
    
    이와 같이 행과 열의 개수에 대한 정보와 null값이 있는지 없는지도 알 수 있고, 그 레코드에 입력된 데이터들의 종류에 대해서도 알 수 있다!
    
    - 여기서 생각해볼 수 있는 점!
        - 한 시리즈 속의 자료형들은 동일해야 한다.
            - 다를 경우 합치시킬 적절한 타입으로 형 변환을 하게 되는데 이 과정에서 데이터가 누락될 위험이 있기 때문에 가능하면 일치시켜주는 것이 좋다.
        - 한 프레임 속의 각기 시리즈별의 자료형은 이질적이어도 된다.
    
    그런데, `info()`를 통한 출력은 몇 가지 다른 명령어들의 출력결과를 모두 포함하고 있다.
    
    1. `type(df)` → 예상해보자. 어떤 결과를 출력하는 메서드일까?
        
        : 바로바로~ 데이터 구조의 자료형을 확인할 수 있다!
        
        ```python
        print(type(df))
        ```
        
        ```
        <class 'pandas.core.frame.DataFrame'>
        ```
        
    2. `df.shape` → 예상해보자!
        
        : 이 속성을 통해서는 ‘태’를 알 수 있다. 높이와 넓이처럼!
        
        ```python
        print(df.shape)
        ```
        
        ```
        (9, 7)
        ```
        
    3. `df.columns` → 예상해보자!
        
        : 이 속성을 통해서는 ‘열 이름’의 정보들을 알 수 있다! ~~기둥도 세로로 열도 세로로~🐼~~
        
        ```python
        print(df.columns)
        ```
        
        ```
        Index(['Animal', 'Korean', '수명', '과', '학명', '등록연도', '등록자'], dtype='object')
        ```
        
        - 생각해볼 수 있는 점
            
            열의 정보를 출력해주면서 열의 자료형도 알려주고 있는데, 각기 열의 자료형들의 data들을 다룰 때 열별 자료형을 명시적으로 알고 있는 것이 중요할 수 있다는 것을 생각해볼 수 있다.
            
    4. `df.dtypes` → 예상해보자!
        
        : 이 속성을 통해서는 해당 데이터 프레임 내부의 각기 열별 데이터 자료형이 무엇인지를 알 수 있다.
        
        ```python
        print(df.dtypes)
        ```
        
        ```
        Animal    object
        Korean    object
        수명         int64
        과         object
        학명        object
        등록연도       int64
        등록자       object
        dtype: object
        ```
        
        - 마찬가지로 생각해볼 수 있는 점
            
            왜 행별 데이터의 총괄적인 자료형은 보여주지 않고, 열별 데이터의 총괄적인 자료형만 알려주는 것일까? 이에 대한 대답은 해당 속성을 만들어서 충족하고자 한 ‘필요성’에 집중하면 좋을 것이다.
            
            즉, 바로 전의 생각의 연장선에서, 열별 데이터의 자료형을 제대로 아는 것이 이후 산술 연산 등에 데이터를 활용할 때 아주 중요할 것이리라 예상해볼 수 있다.
            
        
        ---
        
        ### +) 속성과 메소드
        
        위의 예문들을 설명하면서 ‘속성’과 ‘메소드’에 밑줄을 그어 강조를 했다.
        
        차이가 있기 때문이다! 그 차이점을 간략히 정리해보고 넘어가보려 한다.
        
        - **속성** `대상객체.속성키워드`
            
            객체가 가지는 값(value)으로서, 대상 객체에 대한 정보(상태 및 특징)을 담고있다.
            
        - **메서드** `대상객체.메서드키워드( )`
            
             객체가 가지는 함수(function)으로서, 대상 객체에 대한 작업(객체의 속성 변경 및 데이터 처리, 데이터의 정보 반환 등)을 나타낸다.
            
        
        ---
        
        ## 판다스 자료형 vs. 파이썬 자료형
        
        | PANDAS | Python | 자료형 |
        | --- | --- | --- |
        | object | string | 문자열 |
        | int64 | int | 정수형 |
        | float64 | float | 실수형 |
        | datetime64 | datetime | 날짜형 |
        | bool | bool | 불형 |
        | category | - | 카테고리형 |
        | ~~squid_game~~ | ~~Tlqkf~~ | ~~기훈이형~~ |

        
        # 데이터 추출하기
        
        ```
        늘 배가 고픈 나는 pd꼬봉에게 말한다.
        
        야~ 단백질 음식만 갖고 와봐라~!
        여~ 모든 종류별로 첫째그릇과 여섯째그릇만 갖고 와봐라~!
        아니다, 종류별로 셋째그릇까지 갖고 와라!
        
        또,
        사들인지 오래된 순부터 풀떼기 음식만 차차 내와봐라~!
        사들인지 가장 덜 오래된 순부터 단백질 음식과 풀떼기 음식을 차차 내와봐라~!
        ```
        ~~(근데 옛날에도 단백질, 식이섬유, 나트륨, 이런 개념이 있었을까?)~~
        
        ![dataset_explain_drawing](assets\img\pandas\img\Untitled%1.png)
        
        이런 상황이라고 칠 때,
        
        ① "야~ 단백질 음식만 갖고 와봐라~!"
        
        ② "여~ 모든 종류별로 첫째그릇과 여섯째그릇만 갖고 와봐라~!"
        
        ③ "아니다, 종류별로 셋째그릇까지 갖고 와라!"
        
        ④ "사들인지 오래된 순부터 풀떼기 음식만 차차 내와봐라~!"
        
        ⑤ "사들인지 가장 덜 오래된 순부터 단백질 음식과 풀떼기 음식을 차차 내와봐라~!"
        
        이걸 pandas로 추출해서 탁자로 보내보자!
        
        ```python
        import pandas as dp #dp꼬봉은 듣거라~
        food = dp.read_excel('for_ggobong.xlsx') #같은 폴더에 있을 때는 그냥 이름만 넣어줘도 O
        
        #꼬봉: 창고에 뭐있더라
        print(food.info())
        print("\n"*2)
        
        #① "야~ 단백질 음식만 갖고 와봐라~!"
        jangBan = food['단백질']
        	#jangBan = food.loc[:,['단백질']]
        print(jangBan)
        print("\n"*2)
        
        #② "여~ 모든 종류별로 첫째그릇과 여섯째그릇만 갖고 와봐라~!"
        #jangBan = food.iloc[[0,5],] #이문장은 오류가 난다. 행번호(index number)는 4번까지 뿐이기 때문!
        #꼬봉: 아니 그릇이 넷째가 전분디 우짜라는겨
        #꼬봉: 여섯째를 내맴대루 다섯째루 만들면 되겠구먼!
        food.rename(index={3:5},inplace=True)
          #print(food.index)
        jangBan = food.loc[[0,5]] #이제 5를 넣어주면~!
          #jangBan = food.iloc[[0,5],] -> 이 경우는 오류가 난다.
          #jangBan = food.iloc[[0,3],] -> 이렇게 해줘야 된다. 여전히 index name이 아닌 index 그 자체는 0123이기 때문!
        print(jangBan)
        print("\n"*2)
        
        #③ "아니다, 종류별로 셋째그릇까지 갖고 와라!"
        jangBan = food.iloc[:3] #[a:b] -> a이상 b미만
        print(jangBan)
        print("\n"*2)
        
        #④ "사들인지 오래된 순부터 풀떼기 음식만 차차 내와봐라~!"
        jangBan = food.sort_index() #오름차순(작은순부터)
        print(jangBan)
        print("\n"*2)
        
        #⑤ "사들인지 가장 덜 오래된 순부터 단백질 음식과 풀떼기 음식을 차차 내와봐라~!"
        jangBan = food.sort_index(ascending=False) #내림차순(큰순부터)
        print(jangBan)
        print("\n"*2)
        ```
        
               
        ```
        <class 'pandas.core.frame.DataFrame'>
        RangeIndex: 4 entries, 0 to 3
        Data columns (total 5 columns):
         #   Column  Non-Null Count  Dtype 
        ---  ------  --------------  ----- 
         0   단백질     4 non-null      object
         1   풀떼기     4 non-null      object
         2   과일      4 non-null      object
         3   밀가루     4 non-null      object
         4   국거리     4 non-null      object
        dtypes: object(5)
        memory usage: 288.0+ bytes
        None
        
        0     삼겹살
        1    가브리살
        2     안심살
        3      육회
        Name: 단백질, dtype: object
        
           단백질  풀떼기   과일  밀가루  국거리
        0  삼겹살  양배추  바나나   국수  된장국
        5   육회  도라지    배  수제비  육개장
        
            단백질   풀떼기   과일 밀가루  국거리
        0   삼겹살   양배추  바나나  국수  된장국
        1  가브리살  파프리카   사과  과자   굴국
        2   안심살     쑥   딸기  만두  김칫국
        
        		단백질   풀떼기   과일  밀가루  국거리
        0   삼겹살   양배추  바나나   국수  된장국
        1  가브리살  파프리카   사과   과자   굴국
        2   안심살     쑥   딸기   만두  김칫국
        5    육회   도라지    배  수제비  육개장
        
        		단백질   풀떼기
        5    육회   도라지
        2   안심살     쑥
        1  가브리살  파프리카
        0   삼겹살   양배추
        ```
        
        ---
        
        하나씩 살펴보자
        
        ```python
        import pandas as dp #dp꼬봉은 듣거라~
        food = dp.read_excel('for_ggobong.xlsx') #같은 폴더에 있을 때는 그냥 이름만 넣어줘도 O
        
        #꼬봉: 창고에 뭐있더라
        print(food.info())
        print("\n"*2)
        ```
        
        ```
        <class 'pandas.core.frame.DataFrame'>
        RangeIndex: 4 entries, 0 to 3
        Data columns (total 5 columns):
         #   Column  Non-Null Count  Dtype 
        ---  ------  --------------  ----- 
         0   단백질     4 non-null      object
         1   풀떼기     4 non-null      object
         2   과일      4 non-null      object
         3   밀가루     4 non-null      object
         4   국거리     4 non-null      object
        dtypes: object(5)
        memory usage: 288.0+ bytes
        None
        ```
        
        꼬봉이는 창고에 뭐가 있는지 먼저 살펴봤다.
        
        그리고 행이 총 4개, 열이 총 5개 있다는 것을 알았다. 그리고 모든 열의 data type이 문자열이라는 것도 알았다!
        
        ### ① "야~ 단백질 음식만 갖고 와봐라~!"
        
        이 미션은 어떻게 해결할 수 있을까? 
        
        ```python
        jangBan = food['단백질']
        	#jangBan = food.loc[:,['단백질']]
        print(jangBan)
        ```
        
        food 자료에서 단백질 칼럼에 해당하는 정보만 쟁반에 담아 보내준다.
        
        ```
        0     삼겹살
        1    가브리살
        2     안심살
        3      육회
        Name: 단백질, dtype: object
        ```
        
        그런데 이때 `food[’단백질’]`이나 `food.loc[:,[’단백질’]]`이나 열을 출력하는 데에는 같은 기능을 보인다. 
        
        다만, 해당 시리즈자료에 대한 정보를 반환하는 형식이 조금 다르다.
        
        ![메소드를 사용하지 않은 방식의 결과창](assets\img\pandas\img\Untitled%2.png)
        
        메소드를 사용하지 않은 방식의 결과창
        
        ![loc메소드를 사용한 방식의 결과창](assets\img\pandas\img\Untitled%3.png)
        
        loc메소드를 사용한 방식의 결과창
        
        **①에 대한 문법설명**
        
        - `food['단백질']` ”’단백질’이라는 이름의 열을 찾아 와라”
        - `food.loc[:,['단백질']]` ”location메서드를 활용하겠다. 처음부터 끝까지의 모든 행에 대해 ‘단백질’열의 데이터를 찾아 와라”
            - 이때, `food.loc[ [ : ], ['단백질']]` 과 같다.
                
                왜냐하면 `변수명.loc[ 행슬라이스, 열슬라이스]` 의 문법을 사용하는 것이기 때문
                
        
        ### ② "여~ 모든 종류별로 첫째그릇과 여섯째그릇만 갖고 와봐라~!"
        
        자! 우선 이 미션에는 문제가 몇 가지 있다.
        
        1. 모든 칼럼(열)에 대해서 1번째 행과 6번째 행만 추출해야 하는 문법을 알아야 한다.
            - 즉 이전에 모든 행데이터에 대한 특정 열데이터를 추출하는 법을 배웠다면,
                
                이번에는 특정 행 데이터에 대한 모든 열 데이터를 추출하는 것이다!
                
            - 그렇다면 이런식으로 생각해볼 수 있다.
                
                `jangBan = food.loc[ [0, 5] , [ : ] ]`
                
                **여기서 행번호가 6까지 있다고 가정할 때, 위 코드의 포인트는 콤마이다**
                
                loc메서드를 사용할 때 세미콜론이 안보이고 콤마가 보이는 것에 주목해야하는데 이는 ‘슬라이싱’이 아닌 부분 행에 대한 추출 명령이기 때문이다.
                
                부분들을 추출해서 하나의 행데이터로 반환해 그 자리에 넣어주는 것이기 때문에 [ ]로 묶어주어야 한다.
                
                또한 이전의 문법에서 모든 행데이터에 대한 추출 시 [ ]를 생략해도 됐던 것 처럼 이번의 모든 열데이터에 대한 추출을 입력할 때도 마찬가지로 [ ]를 생략할 수 있다.
                
                그러나 나아가 아예 저 자리 자체를 생략할 수도 있다. 열데이터에 대한 자리의 경우 디폴트가 있어서, 기호를 입력하지 않아도 알아서 ‘모든 열 데이터’에 대한 처리로 해석하기 때문이다. 따라서 위 코드는 아래와 동일한 수행결과를 보인다.
                
                `jangBan = food.loc[[0, 5] , : ]`
                
                `jangBan = food.loc[[0, 5]]`
                
        2. 주어진 데이터시트는 4번째 행이 마지막이다!
            
            이에 대해 ’꼬봉‘은 임의의 그릇으로서 네번째 그릇을 ‘여섯번째 그릇’이라고 지칭해 불러버리기로 한다.
            
            이를 위해 짚고 넘어갈 개념은 두 가지 이다.
            
            **1)** rename 메소드와 inplace인자

            **2)** loc와 iloc의 차이
            
            - **rename메소드**
                
                기본 문법
                
                ```python
                df.rename(mapper=None, **index=None**, **columns=None**, axis=None, copy=True, **inplace=False**, level=None, errors='ignore')
                ```
                
                여기서 당장 필요한 것은 다음의 세 가지 키워드이다.
                    
                    `index`, `columns`, `inplace`
                
                대상 데이터에 대한 '명칭'을 '재정의'하겠다는 선언이다.
                
                이때는 loc메소드의 경우와는 달리 순서를 지키지 않아도 된다. 어떤 값(index, column, inplace)에 대해 기능을 명령하는지 명시하는 방식의 문법이기 때문이다.
                
                따라서 지금의 상황에서는 아래와 같이 적용하면 되는 것이다.
                
                 
                
                ```python
                df.rename(index= {int64_before:int64_after}, columns={object_before:object_after}, inplace=True)
                ```
                
                즉, “rename메소드를 통해 df객체에 접근할 때 **index**에 대해서 **기존 정수** 값을 **지금 정수값으로** 바꾸고, **columns**에 대해서는 **기존 문자열**을 **지금 문자열로** 바꿔라”라고 하는 것!
                
                그렇다면 `inplace=True` 는 뭘 말하는 걸까?
                
                디폴트는 False였는데, 만약 inplace=True를 명시하지 않으면 위 명령은 일시적으로만 작동하고 다시 본래의 데이터로 되돌아간다. 따라서 inplace인자에 대한 명시를 통해 실제 데이터도 바꿔주겠다고 말하는 것이다.
                
                근데 이건 그냥 안써보고 논리오류를 경험해보는 게 더 오래 기억되는 것 같다.
                
                - **생각해볼 점**: inplace 인자의 디폴트를 False로 설정하고 True로 설정해야 비로소 원 데이터에 반영되게끔 한 이유가 뭘까? 아마 조건에 따라 **데이터의 값을 조작해야 할 때가 정말 많**은데, **원본 데이터를 유지해야하는 중요성도 동시에 크기** 때문에 12글자씩이나 되는 명령을 전달해야만 데이터가 변경되도록 안정장치를 만들었다고 유추해볼 수 있다.
            - **loc와 iloc의 차이**
                
                loc는 location의 약식 표현으로, 위치정보에 대한 기능을 수행하리라 짐작할 수 있다.
                
                iloc에서 i는 index의 약식 표현이다. 즉, 정수를 통한 순차적인 순서 표현법을 불가변적으로 따르는 메소드이다.
                
                반면 loc는 그 위치의 명칭을 coder가 직접 설정해줄 수 있다. 기본적으로 ‘열’에 대한 loc이름은 문자열로서 설정하지만, 행에대한 loc명은 일일히 설정하지 않는다. 따라서 행 index의 디폴트는 iloc에서의 index값을 가진다.
                
                그러니까 열데이터를 제외한 0 index의 데이터를 시작으로 1씩 증가하는 index번호를 loc의 행데이터는 디폴트로 가지게 된다는 것이다.
                
                중요한 것은 이 지점이다.
                
                이때 이 loc의 행_index의 경우 coder가 바꿔사용하고 심지어 비순차적이고 비규칙적으로 재정렬시킬 수도 있지만,
                
                iloc의 행_index와 열_index의 경우 coder가 바꿀 수 없다는 것이다!
                
                또한 iloc는 index를 기준으로 작동하기 때문에 추출할 때 columns 데이터의 슬라이싱란에는 ‘문자열’이 아닌 ‘정수index값’이 들어가야 정상적으로 작동한다!
                
                ![iloc vs. loc](assets\img\pandas\img\Untitled%4.png)
                
                iloc vs. loc
                
                위 그림에서 iloc의 index는 0123으로 그대로 자리잡지만, rename메소드를 통해 각 loc메소드가 가리키는 객체의 index의 값을 1357로 바꿔줄 수 있다.
                
                본 소스코드에서는 food.loc객체의 index값을 0125로 바꿔줬다.
                
        
        쟈! 그럼 ②번 미션은 clear!!
        
        아래 코드의 기능을 잘 해석만 하면 끝~~ 
        
        ```python
        #jangBan = food.iloc[[0,5],] #이문장은 오류가 난다. 행번호(index number)는 4번까지 뿐이기 때문!
        #꼬봉: 아니 그릇이 넷째가 전분디 우짜라는겨
        #꼬봉: 여섯째를 내맴대루 넷째루 만들면 되겠구먼!
        food.rename(index={3:5},inplace=True)
          #print(food.index)
        jangBan = food.loc[[0,5]] #이제 5를 넣어주면~!
          #jangBan = food.iloc[[0,5],] -> 이 경우는 오류가 난다.
          #jangBan = food.iloc[[0,3],] -> 이렇게 해줘야 된다. 여전히 index name이 아닌 index 그 자체는 0123이기 때문!
        print(jangBan)
        ```
        
        ```
           단백질  풀떼기   과일  밀가루  국거리
        0  삼겹살  양배추  바나나   국수  된장국
        5   육회  도라지    배  수제비  육개장
        ```
        
        → 모든 종류(columns: total 5!)별로 첫(i+1, i=0)그릇과 여섯째(i+1,i=5)그릇만 잘 갖고 온 것을 볼 수 있다.
        
        ### ③ "아니다, 종류별로 셋째그릇까지 갖고 와라!"
        
        ```python
        jangBan = food.iloc[:3] #[a:b] -> a이상 b미만
        print(jangBan)
        ```
        
        ```
            단백질   풀떼기   과일 밀가루  국거리
        0   삼겹살   양배추  바나나  국수  된장국
        1  가브리살  파프리카   사과  과자   굴국
        2   안심살     쑥   딸기  만두  김칫국
        ```
        
        이 미션에 대해서는 딱히 설명할 것이 없다.
        
        3번째(i+1,i=2)까지 잘 출력된 것을 확인할 수 있다.
        
        ### ④ "사들인지 오래된 순부터 풀떼기 음식만 차차 내와봐라~!"
        
        ### ⑤ "사들인지 가장 덜 오래된 순부터 단백질 음식과 풀떼기 음식을 차차 내와봐라~!"
        
        - 데이터 프레임 정렬하기
            
            쟈 이 두 미션은 사실 한 개의 미션인 것과 같다.
            
            데이터를 정렬하는 메서드는 무엇을 기준으로 정렬코자하는 가와 연관이 있다.
            
            따라서 먼저 **열 기준 정렬**을, 그 다음은 **행 기준 정렬**을 보쟈.
            
            - 열 기준 오름차순 정렬:  `fav_animal.sort_values('등록연도')`
                - fav_animal의 ‘등록연도’의 값을 오름차순(점점 커지는 형태)으로 한 번 정렬해볼게
                - 내림차순: `fav_animal.sort_values('등록연도', ascending=False )`
                    
                    ascending의 의미는 [올라가는]으로, 오름차순에 대한 참값 유무를 전달해주면 된다.
                    
                    물론 유추 가능하듯, 디폴트는 True로서, False의 경우에만 값을 명시하여 전달해주면 된다!
                    
                - 다중 열 오름차순 정렬:
                
                ```python
                 fav_animal.sort_values(by = ['수명', '등록연도'], ascending=[False, True]) 
                ```
                
                by는 정렬 기준이 될 열(컬럼) 이름을 지정하는 매개변수로서, 하나 열에 대한 동작일 경우 굳이 괄호를 동반해 명시해줄 필요는 없지만 2개이상일 경우에는 저렇게 적어주는 것이 안정성과 가독성을 높여준다.
                
                위 코드는 수명에 대해서는 내림차순으로, 등록연도에 대해서는 오름차순으로 정렬하라는 것을 의미한다.
                
            - 행번호 (index)기준 오름차순 정렬: `fav_animal.sort_indexs()`
                - 내림차순: `fav_animal.sort_indexs(ascending=False)`
            
            쟈! 그럼 아래의 코드를 해석해보시라!
            
        
        ```python
        #④ "사들인지 오래된 순부터 풀떼기 음식만 차차 내와봐라~!"
        jangBan = food.sort_index() #오름차순(작은순부터)
        print(jangBan)
        print("\n"*2)
        
        #⑤ "사들인지 가장 덜 오래된 순부터 단백질 음식과 풀떼기 음식을 차차 내와봐라~!"
        jangBan = food.sort_index(ascending=False) #내림차순(큰순부터)
        jangBan = jangBan.loc[:,['단백질', '풀떼기']]
        print(jangBan)
        ```
        
        그리고 그 결과!
        
        ```
        		단백질   풀떼기   과일  밀가루  국거리
        0   삼겹살   양배추  바나나   국수  된장국
        1  가브리살  파프리카   사과   과자   굴국
        2   안심살     쑥   딸기   만두  김칫국
        5    육회   도라지    배  수제비  육개장
        
        		단백질   풀떼기
        5    육회   도라지
        2   안심살     쑥
        1  가브리살  파프리카
        0   삼겹살   양배추
        ```

이렇게 지금까지 pandas의 기초적인 사용들에 대해서 간략히 알아보았다.
다음에는 pandas의 시각화 기능의 토대가 되는 matplotlib과 seaborn에 대해서 공부해보도록 하자!🐼🐼 🖐🏻앙녕~~🖐🏻
