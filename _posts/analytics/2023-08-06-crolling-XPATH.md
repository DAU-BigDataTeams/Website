---  
title: 웹 크롤링 나아가기! with XPATH
layout: post 
categories : [Analytics, selenium, XPATH, Big-Data-Team, Study, Cute]
image : /assets/img/study/analytics/racoon/Untitled.png
description:  웹 크롤링 나아가기! with XPATH
customexcerpt: 웹 크롤링... 멀고 먼 산을 넘어... 권법으로 격파해보자...
---

<span class = "alert g">작성자 : 임가겸</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# 1. 진도를 따라가 보자.

## 1) 코드

수업 때 사용한 실습코드

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

import os

# 크롬 웹드라이버 실행 경로
path = 'chromedriver.exe'

# 크롤링 대상 주소
target_url = "https://student.donga.ac.kr/Login.aspx"

# 크롬 드라이버 사용
service = Service(executable_path=path)  # selenium 최근 버전은 이렇게
options = webdriver.ChromeOptions()
driver = webdriver.Chrome()

# 드라이버에게 크롤링 대상 알려주기
driver.get(target_url)

delay = 3
driver.implicitly_wait(1)  # 3초 대기(네트워크 - 하드웨어 사이 싱크)

# 로그인 from에 id,pw input
driver.find_element(By.XPATH, '//*[@id="display_user_id"]').send_keys("사이트아이디")
driver.find_element(By.XPATH, '//*[@id="display_user_password"]').send_keys("사이트비번")

# 로그인 버튼 클릭하기
driver.find_element(By.XPATH, '//*[@id="loginFrm"]/ul/li[1]/button').click()

# 비밀번호 변경 문구 패스하기
if driver.current_url != "https://student.donga.ac.kr/":
    driver.implicitly_wait(2)
    try:
        driver.get("https://student.donga.ac.kr/")
    except:
        driver.get("https://student.donga.ac.kr/")

# 강의실 강의 시간표 조회
# driver.get('https://student.donga.ac.kr/Univ/SUE/SSUE0040.aspx?m=2')
driver.find_element(By.XPATH, '//*[@id="Form1"]/table/tbody/tr[3]/td[4]/table[1]/tbody/tr/td/p[2]/a').click()
driver.find_element(By.XPATH, '//*[@id="Layer2"]/a[4]').click()

# 접근을 위해 Select객체 별도 생성
dropdown = Select(driver.find_element(By.XPATH, '//*[@id="ddlBld"]'))

# option 개수 얻기
option_txt = [option.text for option in dropdown.options]

# option을 순회하며 시간표 조회하기
for building in option_txt:

    current_url = driver.current_url
    dropdown = Select(driver.find_element(By.XPATH, '//*[@id="ddlBld"]'))
    dropdown.select_by_visible_text(building)
    driver.find_element(By.XPATH, '//*[@id="ibtnSearch"]').click()
    driver.implicitly_wait(3)

    table_element = driver.find_element(By.XPATH, '//*[@id="dgRoomList"]')
    rows = table_element.find_elements(By.TAG_NAME, 'tr')

    row = len(rows)
    cells = []  # 테이블 요소

    if row == 1:
        cell = rows[0].find_elements(By.TAG_NAME, "td")  # 첫 행에 혹시 모를 강의실 추출하기
        cell_content = [c.text for c in cell]  # 객체를 텍스트로 변환

        if len(cell_content) == 2:  # 행이 1개인데 강의실이 존재하는 경우
            cell_content = f"{cell_content[0]}-{cell_content[1]}"  # 강의실 명 - 호실 형태로 변환
        else:
            print(f'{building}-{cell_content[0]}')
    else:  # 행 2개 이상
        # 사진을 저장할 폴더 경로
        folder_path = f"{building}"

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
            print(f"{building} 폴더가 생성되었습니다.")
        else:
            print(f"이미 {building} 폴더가 존재합니다.")

        for _ in range(0, row):  # 모든 행의 열 읽어오기

            cells = driver.find_element(By.TAG_NAME, "td")

            driver.find_element(By.XPATH, f'//*[@id="dgRoomList_HyperLink1_{_}"]').click()

            driver.implicitly_wait(1)
            due = Select(driver.find_element(By.XPATH, '//*[@id="ddlSmt"]'))

            # 예외처리
            if due.first_selected_option == "2학기":
                pass

            due.select_by_visible_text("2학기")  # 2학기로 변경
            driver.find_element(By.XPATH, '//*[@id="ibtnSearch"]').click()  # 적용

            driver.implicitly_wait(1)
            table_element = driver.find_element(By.XPATH,
                                                '//*[@id="frmFSUE0041_75"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td[3]/table')
            driver.execute_script("arguments[0].scrollIntoView();", table_element)

            image_path = os.path.join(folder_path, f'{_:06d}.png')
            driver.save_screenshot(image_path)

            driver.find_element(By.XPATH, '//*[@id="ImageButton1"]').click()  # 이전 페이지
            driver.implicitly_wait(1)

        driver.get(current_url)  # 이전 페이지
```

## 2) 코드 해부

1️⃣

```python
from selenium import webdriver
#셀레늄의 웹드라이버 모듈 call
	#webdriver: 다양 웹 브라우저 제어 드라이버 제공
from selenium.webdriver.chrome.service import Service
#chrome 드라이버 실행 위해 필요한 Service 모듈 call
from selenium.webdriver.common.by import By
#By: '선택자'. 웹 페이지의 요소 선택 가능케 함
	#find_element()메서드에 By선택자 사용
from selenium.webdriver.support.ui import Select
#select: 계층적으로 구조화된 html 드롭다운 메뉴를 다루기위한 클래스
#Select 요소를 다루기위한 모듈 call
import os
#사용자 컴퓨터 폴더 경로정보를 위한 import
```

**셀레니움 라이브러리?**

> selenium 라이브러리는 컴퓨터에 설치되어있는 웹 브라우저를 자동으로 구동해주는 라이브러리이다.
> 

웹 크롤링(웹 긁기)을 할 때는 `requests 라이브러리`와 `BeautifulSoup 라이브러리`를 주로 사용한다.

`beautifulsoup`는 그 이름마따나 예쁘게 떠주는. 파싱해주는 친구다.

그런데 `requests`는 종종 정적 html에 대해 동적 javascript로 가져오는 경우가 있다.

이때문에 `selenium`라이브러리를 사용하게 된다. ~~주로 웹 앱 테스트 목적에서 ‘클릭’, ‘입력’ 등의 테스트를 위해 자주 사용된다고 한다.~~

**WebDriver?**

> WebDriver클래스는 실제 웹 브라우저를 제어하는 클래스로, 실습코드에서는 Chrome 웹 브라우저에 대한 제어를 명령하고 있다. `webdriver.Chrome()`
> 

셀레늄 라이브러리는 ‘웹드라이버’를 이용해 웹 정보를 읽어, ‘파이썬’으로 웹 데이터를 가져온다.

우리가 실습할 때는, 크롬 웹드라이버를 설치해 사용했다.

**Select_ 드롭다운 메뉴?**

html의 아래와 같은 구조를 다루는 데 필요한 요소

```html
<select id="dropdown-menu">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</select>
```

즉 아래와 같은 UI에 대한 구조를 다루는데 유용한 클래스이다.

![Untitled](/assets/img/study/analytics/racoon/Untitled.png)

---

2️⃣

‘#*드라이버에게 크롤링대상 알려주기’* 부터 해부 긔!

(왜냐몀! 이전 ‘웹크롤링 시작하기!’ 포스트를 잘 공부했다면 설명필요없을 것)

```python
driver.get(target_url)

delay = 3
driver.implicitly_wait(3)  # 3초 대기(네트워크 - 하드웨어 사이 싱크)
```

delay → python! 멈춰! 지금 드라이버가 웹주소를 탐색중이라구

driver.implicitly_wait(3) → selenium 멈춰! 웹주소에서 요소 파악할 시간을 주도록 하지. *~~안주먹을 시간은 주는 착한 개발자~~*

---

3️⃣

```python
# 로그인 from에 id,pw input
driver.find_element(By.XPATH, '//*[@id="display_user_id"]').send_keys("사이트아이디")
driver.find_element(By.XPATH, '//*[@id="display_user_password"]').send_keys("사이트비번")
```

**By**

> 웹 페이지의 요소 선택(`find_element()`)하기 위한 다양한 선택자 지원
ex) **`By.ID` `By.NAME` `By.XPATH` `By.CSS_SELECTOR`**
> 

웹페이지의 요소로 ‘아이디창’과 ‘비번창’을 선택하고, 그 인자로 *사이트아이디, 사이트 비번*을 보내는 코드라는 걸 알 수 있다.

**XPath?**

> XML Path Language: XPath
XML 문서의 특정 요소나 속성에 접근하기 위한 경로를 지정하는 언어
> 
- **`//*[@id="display_user_id"]` →** *HTML 문서에서 **`id`** 속성이**`display_user_id"`**인 요소를 선택*

그 밑 구문도 동일하게 이해하면된다.

---

4️⃣

```python

# 비밀번호 변경 문구 패스하기
if driver.current_url != "https://student.donga.ac.kr/":
    driver.implicitly_wait(2)
    try:
        driver.get("https://student.donga.ac.kr/")
    except:
        driver.get("https://student.donga.ac.kr/")
```

**`driver.current_url` →** 현재 페이지의 URL을 가져온다.

`**driver.implicitly_wait(2)**` 셀리늄! 멈춰! url의 요소를 분석할 시간을 주도록 하지

try 구문 → 동아대 사이트로 접속시도한다.

그런데 동아대 사이트 접속(get)에 오류가 생겼다면(비밀번호 변경페이지로 가는 경우 등)

except 구문 → 다시 동아대 사이트로 접속을 시도한다.

~~*(아직 나에겐 생소한 try-except 구문…)*~~

---

5️⃣

```python
# 강의실 강의 시간표 조회
# driver.get('https://student.donga.ac.kr/Univ/SUE/SSUE0040.aspx?m=2')
driver.find_element(By.XPATH, '//*[@id="Form1"]/table/tbody/tr[3]/td[4]/table[1]/tbody/tr/td/p[2]/a').click()
driver.find_element(By.XPATH, '//*[@id="Layer2"]/a[4]').click()
```

.get() 메소드를 통해 아예 사이트 주소로 접근할 수도 있고

.find_element() 메소드를 통해 버튼을 클릭하듯이 강의 시간표 페이지로 접근할 수도 있다.

---

6️⃣

```python
# 접근을 위해 Select객체 별도 생성
dropdown = Select(driver.find_element(By.XPATH, '//*[@id="ddlBld"]'))

# option 개수 얻기
option_txt = [option.text for option in dropdown.options]
```

드롭다운 메뉴에 대한 정보(data)들을 보관하기 위해 dropdown 변수에 할당하고,

dropdown의 `**options**` 속성의 각기 요소 중 text 특성을 가진 친구들을 option_txt에 따로 저장한다.

`print(option_txt)`를 해보면

> *['석당박물관', '법학전문대학원', '평생교육원', '종합강의동', '국제관', '석당 글로벌하우스', '수위실', '동아한국어학당', '교수사택(e편한세상)', '임시건물', '기타 토목 시설물', '석당기념관', '구덕연구동 1호관', '의과대학', '구덕교육동 1호관', '구덕교육동 2, 3호관', '구덕연구동 2호관', '구.예술대학', '구.예술대학실습동', '수위실1', '학과교실동', '한림생활관 구덕관', '지독료', '구봉료', '영산아파트', '영산연립', '의료원', '의료원신관', '의료원센터동', '기타 토목 시설물', '테스트', '대학본부 및 인문과학대학', '학생회관', '공과대학 1호관', '공과대학 2호관', '공과대학 3호관', '공과대학 5호관', '예술체육대학 1관', '교수회관', '생명자원과학대학 및 건강과학대학', '한림도서관', '자연과학대학', '공과대학 4호관', '창업관', '산학관', '한림생활관 승학1관(A-D)', '한림생활관 승학1관(E-F)', '학생군사교육단', '예술체육대학 2관', '예술체육대학 실습동', '한림생활관 승학2관(s19)', '한림생활관 승학2관(s20)', '매입기숙사(대산골든빌)', '수위실', '실험용온실', '위험물저장소1', '위험물저장소2', '구.문서보관창고', '퇴래농장실습사1', '퇴래농장실습사2', '퇴래농장실습사3', '신천농장관리사', '보배관', '퇴래농장실습사4', '기타 토목 시설물']*
> 

이렇게, 드롭다운 메뉴의 각기 text 요소들이 보관된다는 걸 확인해볼 수 있다.

---

7️⃣ for building in option_txt 구문 들여보기 (1)

```python
# option을 순회하며 시간표 조회하기
for building in option_txt:

    current_url = driver.current_url #현재 페이지 보관
    dropdown = Select(driver.find_element(By.XPATH, '//*[@id="ddlBld"]')) #드롭다운 메뉴에서
    dropdown.select_by_visible_text(building) #특정 옵션으로 선택

    driver.find_element(By.XPATH, '//*[@id="ibtnSearch"]').click() # '확인' 버튼을 누르는 명령
    driver.implicitly_wait(3) #셀레니움 작동중... 안주먹을 시간 기다려주께

    table_element = driver.find_element(By.XPATH, '//*[@id="dgRoomList"]') #건물의 '강의실들' 테이블
    rows = table_element.find_elements(By.TAG_NAME, 'tr') #건물의 '강의실들'의 각기 테이블들 (find_elementssssss)
    row = len(rows) #건물의 강의실 '수'
```

![table_element = driver.find_element(By.XPATH, '//*[@id="dgRoomList"]')](/assets/img/study/analytics/racoon/Untitled1.png)

table_element = driver.find_element(By.XPATH, '//*[@id="dgRoomList"]')

![tr, rows, row, td - UI](/assets/img/study/analytics/racoon/Untitled2.png)

tr, rows, row, td - UI

**for building in option_txt 구문 들여보기 (2)**

```python
			if row == 1: #dgRoomList id의, tr태그 data가 1개일 때.(즉 '선택하신 건물에 강의실이 없습니다'일 때)
        cell = rows[0].find_elements(By.TAG_NAME, "td")  # td 태그(1행)의 왼쪽요소(1열)을 cell에 보관
        cell_content = [c.text for c in cell]  # 해당 cell정보 text 형식화

        if len(cell_content) == 2:  # td태그의 요소가 오른쪽요소(2열)를 지니는 경우
            cell_content = f"{cell_content[0]}-{cell_content[1]}"  # 왼쪽요소(1열) 텍스트, 오른쪽요소(2열) 텍스트를 이어줌
        else:
            print(f'{building}-{cell_content[0]}') #아니면 그냥, "건물명-강의실내용" 출력
```

![if row == 1:](/assets/img/study/analytics/racoon/Untitled3.png)

if row == 1:

![if(len(cell_content)) == 2: → else:](/assets/img/study/analytics/racoon/Untitled4.png)

if(len(cell_content)) == 2: → else:

위 사진의 경우, ‘건물이름’ - ‘선택하신 건물에 강의실이 없습니다.’ 가 터미널에 출력되리라는 걸 알 수 있다.

**for building in option_txt 구문 들여보기 (3)**

```python
		else:  #dgRoomList id의, tr태그 data가 1개가 아닐 때.(즉, 건물에 강의실이 있을 때)
        # 사진을 저장할 폴더 경로
        folder_path = f"{building}"
        #건물이름 문자열을 폴더패스 변수에 보관. 즉 모든 건물폴더가 하나씩 생성되는 것.
            #물론 건물에 강의실이 없을 때 제외

        if not os.path.exists(folder_path): #폴더가 없으면
            os.makedirs(folder_path) #만들고
            print(f"{building} 폴더가 생성되었습니다.") #만들었어유
        else:
            print(f"이미 {building} 폴더가 존재합니다.") #이미존재하니까 만들진 않지만. 그래도 알려주고.
```

![os.makedirs(folder_path)](/assets/img/study/analytics/racoon/Untitled5.png)

os.makedirs(folder_path)

`os.pakedirs(folder_path)` 의 실행결과, py 와 같은 폴더에 ‘folder_path’ 문자열의 폴더들이 생성된 걸 확인할 수 있다.

```python
					for _ in range(0, row):  # 반복문에서 다루는 건물의 각기 강의실에 대해,

            cells = driver.find_element(By.TAG_NAME, "td") #처음나오는 td -> 강의실 '명'

            driver.find_element(By.XPATH, f'//*[@id="dgRoomList_HyperLink1_{_}"]').click()
            #건물의 각기 강의실 정보에 접속.
            driver.implicitly_wait(1) #접속했으니 안주먹을 시간 기다려주기
```

![f'//*[@id="dgRoomList_HyperLink1_{_}"]' ← XPATH html 문서가 가리키는 부문.:: 강의실 명](/assets/img/study/analytics/racoon/Untitled6.png)

f'//*[@id="dgRoomList_HyperLink1_{_}"]' ← XPATH html 문서가 가리키는 부문.:: 강의실 명

**for building in option_txt 구문 들여보기 (4)**

```python
						due = Select(driver.find_element(By.XPATH, '//*[@id="ddlSmt"]')) # 학기 드롭다운 메뉴 due변수 보관

            if due.first_selected_option == "2학기": #이미 2학기로 설정 되어있는 경우
                pass #넘어가시게~

            due.select_by_visible_text("2학기")  #due 구조의 텍스트요소를 '2학기'인 옵션을 찾아 변경
            driver.find_element(By.XPATH, '//*[@id="ibtnSearch"]').click()  # '확인'버튼 클릭 명령

            driver.implicitly_wait(1) #페이지 변경중... 안주먹을 시간 기달리주기
```

![두번째 d롭다운 메뉴인 세메스터(학기)의 옵션→ html의 id 태그가 ddlSmt인 걸 확인할 수 있다.](/assets/img/study/analytics/racoon/Untitled7.png)

두번째 d롭다운 메뉴인 세메스터(학기)의 옵션→ html의 id 태그가 ddlSmt인 걸 확인할 수 있다.

**for building in option_txt 구문 들여보기 (5)**

```python
table_element = driver.find_element(By.XPATH, '//*[@id="frmFSUE0041_75"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td[3]/table')
#
driver.execute_script("arguments[0].scrollIntoView();", table_element)
#웹 드라이버의 execute_script 메서드는 '스크롤'기능을 하는 친구다.
#첫번째 인자가 다 보일때까지 스크롤을 하라는 명령을 스크립트로 전달한다는 것을 유추할 수 있다.
#근데 여기서 첫번째 인자는 table_element
```

![Untitled](/assets/img/study/analytics/racoon/Untitled8.png)

**for building in option_txt 구문 들여보기 (6) [마지막~~!]**

```python
						image_path = os.path.join(folder_path, f'{_:06d}.png') #이미지 경로변수 설정
            driver.save_screenshot(image_path) #이미지 경로에 스크린샷을 만들어 저장.

            driver.find_element(By.XPATH, '//*[@id="ImageButton1"]').click()  # 이전 페이지
            driver.implicitly_wait(1) #페이지 이동했으니 안주먹을시간기달리줌~

        driver.get(current_url)  # 이전 페이지
```

![f{’{ _ :06d}.png’} → _는 for _ in range(0, row):의 반복자 언더바에 대응한다](/assets/img/study/analytics/racoon/Untitled9.png)

f{’{ _ :06d}.png’} → _는 for _ in range(0, row):의 반복자 언더바에 대응한다

# 2. 과제를 해보자.

과제 : 네이버 뉴스 크롤링 -> XPATH 이용하기

출력 결과 : 뉴스 기사 제목

그런데 생각해보니 내 과제는 포스팅을 하는 걸로 대체된다는 것…!

어머? > <

**대신 내가 좋아하는 심리학 사이트의 제목들을 XPATH를 이용해 크롤링해보기로 한다.**

**+) 뭔가 아쉬워서 표로 제목과 내용을 저장하는 코드…**

---

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import pandas as pd
import os
from datetime import date
import matplotlib.pyplot as plt

# 크롬 웹드라이버 실행 경로
path = 'chromedriver.exe'

# 크롤링 대상 주소
target_url = "http://www.mind-journal.com/news/articleList.html?box_idxno=5&view_type=sm"

# 크롬 드라이버 사용
service = Service(executable_path=path)
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=service, options=options)

# 드라이버에게 크롤링 대상 알려주기
driver.get(target_url)

delay = 3
driver.implicitly_wait(1)  # 3초 대기(네트워크 - 하드웨어 사이 싱크)

# strong 태그의 class가 "font-weight-400"인 요소들을 찾아서 텍스트를 추출하여 리스트에 저장
elements = driver.find_elements(By.XPATH, '//strong[@class="font-weight-400"]')
heads = [element.text for element in elements]

# a 태그의 class가 "line-height-3-3x"인 요소들을 찾아서 텍스트를 추출하여 리스트에 저장
elements = driver.find_elements(By.XPATH, '//a[@class="line-height-3-3x"]')
contents = [element.text for element in elements]
contents.pop() #사이트 안에 sample class = "line-height-3-3x" html 요소가 마지막 요소로 함께 리스트에저장돼서 삭제

# 드라이버 종료
driver.quit()

# 데이터를 표로 정리하여 DataFrame 생성
data = {'제목': heads, '내용': contents}
df = pd.DataFrame(data)

# 오늘 날짜 가져오기
today = date.today()

# 새로운 폴더 생성
folder_name = f"크롤링_데이터_{today}"
os.makedirs(folder_name, exist_ok=True)

# DataFrame을 표 형태로 저장하여 png 파일로 저장
df_path = os.path.join(folder_name, "크롤링_데이터.png")

plt.rc('font', family='Malgun Gothic') # For Windows

# Matplotlib를 사용하여 표 생성 (한글 폰트 설정 이후에 호출)
fig, ax = plt.subplots(figsize=(60, 6))
ax.axis('off')
table = ax.table(cellText=df.values, colLabels=df.columns, cellLoc='left', loc='upper left', edges='open')

# 특정 요소에만 폰트 크기 설정 (원하는 크기로 조정)
table.auto_set_font_size(False)
table.set_fontsize(14)
plt.subplots_adjust(top=1)

# 표를 PNG 파일로 저장
plt.savefig(df_path, bbox_inches='tight', pad_inches=0.2)
plt.close()

print("데이터 프레임이 성공적으로 저장되었습니다.")
```

> 오늘 포스팅의 포인트는 셀레늄을 통해 웹 브라우저를 조작하고, 내 컴퓨터의 로컬환경에 긁어온 데이터를 저장하는 코드를 학습하는 것 같다!
> 

![마!쪼리나!쪼리몀쪼린다캐냐옹!](/assets/img/study/analytics/racoon/Untitled10.png)

마!쪼리나!쪼리몀쪼린다캐냐옹!

![Untitled](/assets/img/study/analytics/racoon/Untitled11.png)

팀장님과 팀원들의 도움을 받아

셀레니움-웹드라이브-파이썬 버전오류를 타파한 에피를 끝으로

20000!