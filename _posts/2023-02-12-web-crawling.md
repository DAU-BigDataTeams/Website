---
title: Web에 있는 방대한 정보를 손쉽게 수집하는 방법인 웹 크롤링!
layout: post   
categories : Data, Web Scraping, Data Collection, Excel 
image : /assets/img/crawling/1.png
description: 웹 페이지의 데이터를 수집해보자 !
customexcerpt: "request, Beautifulsoup, openpyxl 모듈을 사용한 데이터 수집" 
---

### 작성자 : 윤수빈 
<br>
<br>
<br>

# 웹크롤링 ( Web Scraping ) 이란 ?
 웹사이트의 방대한 정보를 기계적으로 다운로드해 **원하는 정보를 수집, 분석, 추출**하는 기술 
  


- 정형 데이터 : 일정한 규격에 맞춰서 구성된 데이터  
    - ex. 관계형 데이터베이스의 테이블, 엑셀의 시트 등  
- 반정형 데이터 : 일정한 규격으로 구성되어 있지 않지만, 일정한 틀을 갖추기 위해서 태그나 인덱스 형태로 구성된 데이터  
    - ex. HTML, JSON, XML 등  
- 비정형 데이터 : 구조화 되지 않는 형태의 데이터  
    - ex. SNS, 영상, 이미지, 음성, 텍스트 

<p style="color : skyblue;"> 이번 포스팅은 py을 통해, <i>원하는 데이터를 추출하는 크롤링 기술</i>과 크롤링한 데이터를 <i>엑셀 시트에 저장하는 코드</i>를 정리하고자 한다.</p>
 


~~~py
# 사용하는 모듈
import requests  
import openpyxl  
from bs4 import BeautifulSoup  
~~~
> <p style="color:darkgray;"> 모듈들의 사용법은 아래의 사이트 + 구글링을 통해 이해하면 좋을 거 같다. </p>
> 
> requests 공부 사이트 : https://www.w3schools.com/py/ref_requests_post.asp  
> openpyxl 공부 사이트 : https://wooiljeong.github.io/py/openpyxl-tutorial/  
> BeautifulSoup 공부 사이트 : https://library.gabia.com/contents/9239/  



**웹 크롤링 소스 정리**
  
~~~py
url = # 수집하고 싶은 사이트의 url 

headers = {
    # url의 headers 내용을 json 형식으로 넣어준다.
    "Accept" : "",
    "Accept-Encoding" : "",
    "Accept-Language" : "",
    "Cache-Control" : "",
    "Host" : "",
    "Content-Type" : "",
    "Referer" : "",
    "User-Agent" : ""
    # 등등 
}

page = {
    # page의 정보를 json 형식으로 넣어준다.
    # page 정보를 넘겨 줄 필요가 없다면 생략 가능
    "page" : "",
    "seCode" : "",
    "searchType" : "",
    "searchTxt" : "",
    # 등등 
}
~~~

~~~py
# url, hearders, page 정보를 넘겨준다.
result = requests.post( url, hearders=headers, data=page)

shtml = ""
# 요청이 성공적일 때
if result.status_code == 200:
    shtml = result.content
shtml = shtml.decode('utf-8')
~~~


~~~py
# 엑셀로 수집을 하기 위한 작업
wb=openpyxl.load_workbook('/엑셀_파일의_경로')
sheet = wb.active
~~~


<p style="color:grey;">- 현재 데이터를 수집하는 페이지가 복잡한 로그인 페이지를 통과해야하는 경우가 아니라고 가정하고, 메모리를 많이 먹는 selelinum 대신 beautifulsoup를 사용했다.</p>

~~~py
# BeautifulSoup를 사용하여 수집
soup = BeautifulSoup ( shtml , "html.parser")

# 클래스명을 안넣어줘도 되지만 좀 더 명확하게 찾고자 넣어주었다.
trs = soup.select('table.클래스명 tr')
~~~

~~~py
count = 2
# for문을 통해 row의 수 만큼 반복
for tr in trs:
    tds = tr.select('td')
    if not tds:
        continue 
    # table의 컬럼이 5개일 경우라고 가정  
    num    = tds[0].text
    tit    = tds[1].text
    dept   = tds[2].text
    tel    = tds[3].text
    date   = tds[4].text

    num_index   = 'A'+str(count)
    tit_index   = 'B'+str(count)
    dept_index  = 'C'+str(count)
    tel_index   = 'D'+str(count)
    date_index  = 'E'+str(count)

    # 엑셀 시트에 데이터를 수집
    sheet[num_index].value  = num
    sheet[tit_index].value  = tit
    sheet[dept_index].value = dept
    sheet[tel_index].value  = tel
    sheet[date_index].value = date

    count += 1

# 엑셀 시트 저장 
wb.save('/엑셀_파일의_경로')    
~~~
