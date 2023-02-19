---
title: 복잡한 데이터를 정리하기 위한 효율적인 방법인 Data Cleaning(Kaggle)
layout: post   
categories : [kaggle, Data-Cleaning, Data, Data-Preprocessing]
image : /assets/img/수료증/김지은-데이터클리어링수료증.png
description: 복잡한 데이터를 정리하기 위한 효율적인 방법, Data Cleaning
customexcerpt: Kaggle의 Data Cleaning과정을 정리해보았다.  
---


## 1. Handling Missing Values
#### 사용할 라이브러리와 데이터 세트 로드

~~~py
	# 사용할 모듈
	import pandas as pd
	import numpy as np

	# 모든 데이터 읽기
	nfl_data = pd.read_csv("../input/nflplaybyplay2009to2016/NFL Play by Play 2009-2017 (v4).csv")

	# 재현성을 위한 시드 설정
	np.random.seed(0) 
~~~  
    
> 새 데이터 세트를 받으면 가장 먼저 해야 할 일은 그 중 일부를 살펴보는 것이다.   
이렇게 하면 모두 올바르게 읽히는 것을 볼 수 있고 데이터에 어떤 일이 일어나고 있는지 알 수 있다.    
 


#### 누락된 데이터 수 확인
~~~py
	# 열당 누락된 데이터 수 가져오기
	missing_values_count = nfl_data.isnull().sum()
~~~ 

#### 누락된 데이터 삭제
*  참고: 일반적으로 중요한 프로젝트에 대해 이 접근 방식을 권장하지 않음.   
*  일반적으로 시간을 들여 데이터를 살펴보고 누락된 값이 있는 모든 열을 실제로 살펴보고 데이터 세트를 실제로 파악하는 것이 가치가 있음.
	
 ~~~py   
    # 누락된 값이 하나 이상 있는 모든 열 제거
	columns_with_na_dropped = nfl_data.dropna(axis=1)
 ~~~
    
#### 누락된 데이터 채우기

* 모든 NaN 값을 0으로 바꾸는 경우

~~~py
	# NFL 데이터 세트의 작은 하위 집합 얻기
	subset_nfl_data = nfl_data.loc[:, 'EPA':'Season'].head()
	subset_nfl_data
    
    # 모든 NaN 값을 0으로 교체
	subset_nfl_data.fillna(0)
~~~   
 
* 누락된 값을 같은 열에서 바로 뒤에 오는 값으로 바꾸는 경우 

~~~py
	# 모든 NaN 값을 동일한 열에서 바로 뒤에 오는 값으로 교체 
	# 그런 다음 나머지 NaN 값을 모두 0으로 바꾼다.
	subset_nfl_data.fillna(method='bfill', axis=0).fillna(0)
~~~


## 2. Scaling and Normalization
#### 환경설정

~~~py
	# 사용할 모듈
	import pandas as pd
	import numpy as np

	# Box-Cox 변환용
	from scipy import stats
	
	# min_max scaling
	from mlxtend.preprocessing import minmax_scaling

	# plotting modules
	import seaborn as sns
	import matplotlib.pyplot as plt

	# 재현성을 위한 시드 설정
	np.random.seed(0)
~~~   

#### Scaling
* 데이터가 0-100 또는 0-1과 같은 특정 척도 내에 맞도록 데이터를 변환하고 있음을 의미  
* 변수의 크기를 조정하면 서로 다른 변수를 동등하게 비교하는 데 도움이 될 수 있음


~~~py
	# 지수 분포에서 무작위로 추출한 1000개의 데이터 포인트 생성
	original_data = np.random.exponential(size=1000)

	# mix-max scale the data between 0 and 1
	scaled_data = minmax_scaling(original_data, columns=[0])

	# plot both together to compare
	fig, ax = plt.subplots(1, 2, figsize=(15, 3))
	sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
	ax[0].set_title("Original Data")
	sns.histplot(scaled_data, ax=ax[1], kde=True, legend=False)
	ax[1].set_title("Scaled data")
	plt.show()
~~~

    
<img src="https://user-images.githubusercontent.com/101112062/215403607-72cffa9a-a818-4ea6-bea8-f08c1951e69e.png">
데이터의 모양은 변경되지 않지만 범위가 0에서 8까지가 아니라, 0에서 1까지이다.


## Normalization
* 스케일링은 데이터 범위를 변경하며, 정규화는 보다 급진적인 변환임
* 정규화의 요점은 **관측치를 정규 분포로** 설명할 수 있도록 변경하는 것
* 일반적으로 데이터가 정상적으로 분산되었다고 가정하는 기계 학습 또는 통계 기술을 사용하려는 경우 데이터를 정규화함


여기서 정규화하는 데 사용하는 방법을 Box-Cox 변환이라고 함 
일부 데이터를 정규화하는 예시는 다음과 같다.

~~~py
	# boxcox로 지수 데이터 정규화
	normalized_data = stats.boxcox(original_data)

	# plot both together to compare
	fig, ax=plt.subplots(1, 2, figsize=(15, 3))
	sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
	ax[0].set_title("Original Data")
	sns.histplot(normalized_data[0], ax=ax[1], kde=True, legend=False)
	ax[1].set_title("Normalized data")
	plt.show()
~~~


<img src="https://user-images.githubusercontent.com/101112062/215403626-af520bfc-cda9-4348-84ed-175ee15c028a.png">
데이터의 모양이 변경되었음을 알 수 있다. 
정규화하기 전에는 거의 L자형이었으나, 정규화 후에는 종의 윤곽선처럼 보인다 ("**bell curve**").


## 3. Parsing Dates
#### 환경설정
	
~~~py	
	# 사용할 모듈
	import pandas as pd
	import numpy as np
	import seaborn as sns
	import datetime

	# 데이터 읽기
	landslides = pd.read_csv("../input/landslide-events/catalog.csv")

	# 재현성을 위한 시드 설정
	np.random.seed(0)
~~~

#### 날짜 열을 날짜/시간으로 변환
* 기본 아이디어는 날짜의 어느 부분이 어디에 있고 어떤 구두점이 그 사이에 있는지 지적해야 한다.
* 가장 일반적으로 일의 경우 %d, 월의 경우 %m, 두 자리 연도의 경우 %y, 네 자리 연도의 경우 %Y이다.

> 몇 가지 예:
1/17/07의 형식은 "%m/%d/%y"이다.  
17-1-2007의 형식은 "%d-%m-%Y"이다.

~~~py
	# 파싱된 날짜로 새 열 date_parsed를 만듭니다.
	landslides['date_parsed'] = pd.to_datetime(landslides['date'], format="%m/%d/%y")
~~~

##### 날짜 형식을 지정하는 동안 단일 열에 여러 날짜 형식이 있는 경우 오류가 발생하는 경우가 있다.
그런 일이 발생하면 pandas가 올바른 날짜 형식이 무엇인지 추론하도록 할 수 있다.
다음과 같이 할 수 있다.

~~~py
	landslides['date_parsed'] = pd.to_datetime(landslides['Date'], infer_datetime_format=True)
~~~

#### 해당 월의 날짜 선택
이제 파싱된 날짜 열이 있으므로 산사태가 발생한 날짜와 같은 정보를 추출할 수 있다.

~~~py
	# date_parsed 열에서 해당 월의 날짜를 가져온다.
    day_of_month_landslides = landslides['date_parsed'].dt.day
~~~

## 4. Character Encodings
#### 환경설정

~~~py
	# 사용할 모듈
	import pandas as pd
	import numpy as np

	# 유용한 문자 인코딩 모듈
	import chardet

	# 재현성을 위한 시드 설정
	np.random.seed(0)
~~~   

#### Encodings
* 문자 인코딩은 원시 이진 바이트 문자열(예: 0110100001101001)에서 사람이 읽을 수 있는 텍스트(예: "hi")를 구성하는 문자로 매핑하기 위한 특정 규칙 집합임  
* 다양한 인코딩이 있으며 **원래 작성된 것과 다른 인코딩으로** 텍스트를 읽으려고 하면 "mojibake"(mo-gee-bah-kay와 같이 말함)라는 스크램블된 텍스트로 끝난다.   
mojibake의 예는 다음과 같다.æ–‡å—åŒ–ã??


* "알 수 없는" 문자로 끝날 수도 있다. 특정 바이트와 바이트 문자열을 읽는 데 **사용하는 인코딩의 문자 사이에 매핑이 없을 때** 인쇄되는 내용이 있으며 다음과 같다.  
          


다양한 문자 인코딩이 있지만 알아야 할 주요 인코딩은 **UTF-8**이다.  
> UTF-8은 표준 텍스트 인코딩이다.  
모든 Python 코드는 UTF-8이며, 이상적으로는 모든 데이터도 마찬가지여야 한다.   
UTF-8이 아닌 경우 문제가 발생한다.  


Python 3에서 텍스트로 작업할 때 마주하게 되는 두 가지 주요 데이터 유형이 있다.   
1. 텍스트인 문자열  
2. 정수 시퀀스인 bytes 데이터 유형. 문자열이 포함된 인코딩을 지정하여 문자열을 바이트로 변환 가능  


~~~py
	# 문자열로 시작
	before = "This is the euro symbol: €"

	# 어떤 자료형인지 확인
	type(before)	# out: str

	# 오류를 발생시키는 문자를 대체하여 다른 인코딩으로 인코딩
	after = before.encode("utf-8", errors="replace")

	# 어떤 자료형인지 확인
	type(after) # out: bytes

	# 바이트가 어떻게 생겼는지 살펴보기
	after # out: b'This is the euro symbol: \xe2\x82\xac'

	# 다시 utf-8로 변환
	print(after.decode("utf-8")) # out: This is the euro symbol: €
~~~



바이트를 문자열에 매핑하기 위해 다른 인코딩을 사용하면 오류 발생

~~~py
	# ASCII 인코딩으로 바이트를 디코딩하려고 시도
	print(after.decode("ascii")) # out: UnicodeDecodeError: 'ascii' codec can't decode byte 0xe2 in position 25: ordinal not in range(128)
~~~

문자열에서 바이트로 매핑하기 위해 잘못된 인코딩을 사용하면 문제가 발생할 수도 있음

~~~py
    # 문자열로 시작
	before = "This is the euro symbol: €"

	# 오류를 발생시키는 문자를 대체하여 다른 인코딩으로 인코딩
	after = before.encode("ascii", errors = "replace")

	# 다시 utf-8로 변환
	print(after.decode("ascii"))

    # 원래 기본 바이트 문자열을 잃어버림 
	# 그것은 알 수 없는 문자에 대한 기본 바이트 문자열로 대체됨
~~~


## 5. Inconsistent Data Entry
## 환경설정

~~~py
	# 사용할 모듈
	import pandas as pd
	import numpy as np

	# 유용한 모듈
	import fuzzywuzzy
	from fuzzywuzzy import process
	import chardet

	# 모든 데이터 읽기
	professors = pd.read_csv("../input/pakistan-intellectual-capital/pakistan_intellectual_capital.csv")

	# 재현성을 위한 시드 설정
	np.random.seed(0)
~~~   
    
#### 일부 예비 텍스트 전처리 수행

가장 먼저 할 일은 모든 것을 소문자로 만들고 셀의 시작과 끝에서 공백을 제거하는 것임  
대소문자 불일치 및 후행 공백은 텍스트 데이터에서 매우 일반적이며 이렇게 하면 텍스트 데이터 입력 불일치의 80%를 해결할 수 있음  

~~~py
	# 먼저 데이터의 처음 몇 행 살펴보기
	professors.head()
    
    # 데이터 입력 불일치가 없는지 확인하기 위해 "Country" 열을 정리하는 데 관심이 있다고 가정
    # 'Country' 열의 모든 고유 값을 가져오기
    countries = professors['Country'].unique()
    
    # 알파벳순으로 정렬한 다음 살펴본 결과, 일관되지 않은 데이터 입력으로 인한 몇 가지 문제 볼 수 있음.
    # 예를 들어, ' Germany'와 'germany'..
    countries.sort()
	countries
    
    # 소문자로 변환
    professors['Country'] = professors['Country'].str.lower()
    
    # 후행 공백 제거
    professors['Country'] = professors['Country'].str.strip()
~~~

#### 일치하지 않는 데이터 입력을 수정하기 위해 fuzzy matching 사용

fuzzywuzzy 패키지를 사용하여 어떤 문자열이 서로 가장 가까운지 식별할 수 있음.

> Fuzzy matching: 대상 문자열과 매우 유사한 텍스트 문자열을 자동으로 찾는 프로세스  
일반적으로 한 문자열을 다른 문자열로 변환하는 경우 변경해야 하는 문자가 적을수록 문자열은 다른 문자열에 "가까운" 것으로 간주된다. fuzzy matching에 항상 100% 의존할 수는 없지만  일반적으로 최소한 약간의 시간을 절약하게 된다.

`Fuzzywuzzy`는 주어진 두 문자열의 비율을 반환함. 
비율이 100에 가까울수록 두 문자열 사이의 편집 거리가 작아짐.
~~~py
	# 'Country' 열의 모든 고유 값 가져오기
	countries = professors['Country'].unique()
	
    # 알파벳순으로 정렬한 다음 살펴본 결과, 또 다른 불일치가 있음. 
    # 'southkorea'와 'south korea'는 같아야 함.
    countries.sort()
	countries
    
    # "south korea"와 가장 가까운 상위 10개 일치 항목 가져오기
    matches = fuzzywuzzy.process.extract("south korea", countries, limit=10, scorer=fuzzywuzzy.fuzz.token_sort_ratio)

	# 확인한 결과, "south korea" and "southkorea" 이 두 항목이 "south korea"와 매우 근접한 것을 확인함.
    matches # out: [('south korea', 100), ('southkorea', 48), ('saudi arabia', 43), ('norway', 35), ('austria', 33), ('ireland', 33), ('pakistan', 32), ('portugal', 32), ('scotland', 32), ('australia', 30)]
	
    # 비율이 47이상인 "Country" 열의 모든 행을 "south korea"로 바꾸면,
    # 데이터 프레임에 "south korea"만 존재함.
~~~

![1](/assets/img/수료증/김지은-데이터클리어링수료증.png)