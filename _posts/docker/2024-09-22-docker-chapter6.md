---
title: 간단한 웹 앱 만들기
layout: post
description: 도커를 활용해서 간단한 웹 앱을 만들어봐요!
categories: [docker]
customexcerpt: 도커를 활용해서 웹 앱 만들기!!
---

<span class = "alert g"> 작성자 : 정지우</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# 1. 이번 챕터에서 공부할 내용은?
- 전에 만들었떤 "Hello World!" 프로그램을 사용자가 입력한 텍스트에 맞춰 개별적인 이미지를 생성하는 간단한 웹 앱으로 바꾼다.

- 이 어플리케이션을 만드는 과정을 통해서 정상적으로 기능하는 시스템을 만들기 위해 컴포즈를 이용하여 도커 컨테이너들을 구성하는 방법과 이러한 작업이 어떻게 자연스럽게 마이크로서비스적인 접근법으로 이어지는지를 배운다.

## 아이덴티콘
- **아이덴티콘** : IP 주소나 사용자 이름의 해시 값을 이용하여 자동적으로 생성한 이미지들

- 아이덴티콘은 특정 개체를 대표할 수 있는 이미지를 제공하여 즉각적으로 알아볼 수 있도록 한다.





## 현재까지 진행한 프로젝트, 코드 확인하기




**1) 이 전 장을 충실히 따라왔다면 아래와 같은 구조의 프로젝트를 가지고 있음**

![docker-ch6-01](/assets/img/study/docker/ch6/docker-ch6-01.jpg) 



**2) 깃허브페이지에서 다운**

이 전장을 따라하지 않았다고 해도 현재까지의 코드는 해당교재 깃허브 페이지에서 다운받을 수 있음

<i>깃허브 링크</i> : https://gitbub.com/using-docker/creating-a-simple-web-app



**<실행 시 코드>**
~~~bash
$ git clone -b v0 https://gitbub.com/using-docker/creating-a-simple-web-app
~~~


# 2. 기본 웹 페이지 만들기

단순하게 하기 위해 HTML을 문자열(string)로 구성함. 

indentidock.py 를 다음과 같이 변경

**<i>indentidock.py</i>** 전체 코드 
~~~py
from flask import Flask

app=Flask(__name__)
default_name='Joe Bloggs'

@app.route('/')
def get_identicion():
    name=default_name
    
    header='<html><head><title>Indentidock</title></head><body>'
    body='''<form method="POST">
            Hello<input type="text" name="name" value="{}">
            <input type="submit" value="submit">
            </form>
            <p>You look like a:
            <img src="/monster/monster.png"/>
            '''.format(name)
    footer='</body></html>'

    return header+body+footer

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')
~~~

- 이름을 입력할 수 있는 폼이 들어간 작은 HTML 페이지를 통해 텍스트를 받을 수 있도록 함
- format함수는 substring인 "{ }"를 name 변수의 값으로 교체함
- 여기서는 현재 "Joe Bloggs"라고 하드코드해 놓음

docker-compose up -d 명령을 실행하고 브라우저를 열어 http://localhost:5000 으로 접속하면 다음과 같은 페이지가 나타남

**identidock의 처음 모습**

![docker-ch6-02](/assets/img/study/docker/ch6/docker-ch6-02.jpg)

- 아직 이미지를 생성하는 코드를 넣지 않았기 때문에 깨진 이미지 아이콘이 나오는 것이 정상
- 유사하게 submit 버튼 역시 깨져있음

- 개발 시 바로 이 지점에서 자동화된 테스트와 지속적 통합 및 배포를 구성하는 것이 좋긴 하다. 하지만 책의 방향성을 위해 우리는 애플리케이션을 조금 더 개발한 후 앞으로 나올 장에서 테스트 및 지속적 통합을 다루도록 함


# 3. 존재하는 이미지 이용하기

문자열을 받아서 이에 고유한 이미지를 돌려주는 함수 또는 서비스가 필요함. 그 다음 사용자가 웹페이젱 제출한 이름을 가지고 그 함수를 호출하고 , 그 산출물로 깨진 이미지를 대체함.


## dnmonster

- **dnmonster** : 미리 만들어져 있는 도커 이미지

- **dnmonster 특징**
    1) 사용할 수 있는 REST API를 제공함
    2) 쉽게 다른 아이덴티콘 서비스들을 dnmonster로 교체할 수 있음 (RESTFul API를 제공하고 컨테이너에 패키지화 되어 있다면)

## dnmonster를 호출하기
dnmonster를 우리 코드에서 호출하기 위해 코드 일부 변경.

주요 변경점은 새로운 get_indenticon 함수를 덧붙임

<i>추가된 코드에 대해서는 #1, #2, #3, #4 주석으로 표기 , 밑에서 상세설명함</i>

<i>**indentidock.py** 전체 코드</i>
~~~py
from flask import Flask,Response    #1
import requests   #2

app=Flask(__name__)
default_name='Joe Bloggs'

@app.route('/')
def get_identicion():
    name=default_name
    
    header='<html><head><title>Indentidock</title></head><body>'
    body='''<form method="POST">
            Hello<input type="text" name="name" value="{}">
            <input type="submit" value="submit">
            </form>
            <p>You look like a:
            <img src="/monster/monster.png"/>
            '''.format(name)
    footer='</body></html>'

    return header+body+footer


@app.route('/monster/<name>')
def get_identicon(name):

    r=requests.get('http://dnmonster:8080/monster/'+name+'?size=80')  #3
    image=r.content
    
    return Response(image, mimetype='image/png')  #4

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')
~~~


**<주요 코드 설명>**
~~~py
from flask import Flask, Response #1
~~~
- Flask에서 Response 모듈을 가져옴. 이 모듈은 우리가 이미지를 리턴할 때 사용


~~~py
import request #2
~~~
- dnmonster 서비스와 통신하기 위해 request library를 가져옴


~~~py
r=requests.get('http://dnmonster:8080/monster/'+name+'?size=80') #3
~~~
- dnmonster 서비스에 대한 HTTP GET 요청을 만듦.  name 변수 값에 대해 80픽셀짜리 아이덴티콘을 요청하는 것으로 구성함.

~~~py
return Response(image, mimetype='image/png')  #4
~~~
- 여기서의 Return문은 조금 복잡한데 이는 우리가 Response 함수를 사용하여 플라스크로 하여금 HTML 또는 텍스트 대신 PNG 이미지를 리턴하도록 요청해야 하기 때문임


## 도커파일을 조금 변경해서 새로운 코드가 이에 적합한 라이브러리를 사용할 수있도록 하기

~~~bash
FROM python:3.4

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi
RUN pip install Flask==0.10.1 uWSGI==2.0.8 requests==2.5.1  #1
WORKIR /app
COPY app /app
COPY cmd.sh /

EXPOSE 9090 9191
USER uwsgi
CMD ["/cmd.sh"]
~~~
 

**<주요 코드 설명>**
~~~bash
RUN pip install Flask==0.10.1 uWSGI==2.0.8 requests==2.5.1  #1
~~~
- 이후 실행될 파이썬 코드를 위해 requests 라이브러리를 추가하였다.

<br><br>

## 애플리케이션 컨테이너 실행
**[1] dnmonster 이미지를 처음 사용하므로 실행 시 도커허브에서 다운로드**

~~~bash
$ docker build -t identidock .
$ docker run -d --name dnmonster amount/dnmonster:1.0
~~~

<br>

**[2] 애플리케이션 컨테이너 실행**
~~~bash
$ docker run -d -p 5000:5000 -e "ENV=DEV" --link dnmonster:dnmonster identidock
~~~
<br>


**[3] 브라우저를 열어 http://localhost:5000로 다시 들어가면 다음과 같은 모습을 보게 됨**


![docker-ch6-04](/assets/img/study/docker/ch6/docker-ch6-04.jpg)  
- 첫 아이덴티콘 만들어 냄
- 현재 Submit 버튼은 아직 깨져있어서 실제 사용자 입력은 받을 수 없음

<br>

## docker-compose.yml 업데이트
<i>**docker-compose.yml**</i>
~~~yml
identidock:
    build:
    ports:
    - "5000:5000"
    environment:
        ENV: DEV
    volumnes:
        -./app:/app
    links:   #1
        -dnmonster
        
    dnmonster:  #2
        image:amount/dnmonster:1.0                                                  
~~~                                

**<주요 코드 설명>**
~~~yml
links:   #1
~~~
- Identidock 컨테이너로부터 dnmonster 컨테이너로의 연결을 선언한다. 컴포즈가 정확한 순서로 컨테이너들이 시작하도록 해 줄 것이다.

~~~yml
dnmonster:  #2
~~~
- 새로운 dnmonster 컨테이너를 정의한다. 우리가 해야 할 일은 컴포즈에게 도커 허브의 amount/dnmonster:1.0 이미지 파일을 사용할 거라고 알려주는 것뿐이다.

<br>






## identicon.py 를 아래와 같이 업데이트

깨져있는 버튼을 사용 가능하도록 하기 위해, POST 요청을 서버로 보낼 수 있도록 하고, (사용자 이름을 가지고 있는)form 변수를 사용하여 이미지를 생성할 것임.

 사용자의 입력을 해시로 변환을 통해 이메일 주소와 같은 민감한 값들을 가릴 수 있음

**<전체 코드>**
~~~py
from flask import Flask,Response,request
import requests
import hashlib  #1

app=Flask(__name__)
salt="UNIQUE_SALT"  #2
default_name='Joe Bloggs'

@app.route('/',method=['GET','POST']) #3
def mainpage():

    name=default_name
    if requests.method=='POST': #4
        name=request.form['name']

    salted_name=salt+name
    name_hash=hashlib.sha256(salted_name.encode()).hexdigest() #5
    
    header='<html><head><title>Indentidock</title></head><body>'
    body='''<form method="POST">
            Hello<input type="text" name="name" value="{0}">
            <input type="submit" value="submit">
            </form>   
            <p>You look like a:
            <img src="/monster/{1}"/>
            '''.format(name, name_hash)  #6
    footer='</body></html>'

    return header+body+footer


@app.route('/monster/<name>')
def get_identicon(name):

    r=requests.get('http://dnmonster:8080/monster/'+name+'?size=80')
    image=r.content
    
    return Response(image, mimetype='image/png')

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')

~~~

**<주요 코드 설명>**
~~~py
import hashlib  #1
~~~
- 사용자의 입력값을 해시 처리하기 위한 라이브러리를 참조한다. 이는 표준 라이브러리이므로 이를 설치하기 위해 도커파일을 업로드할 필요는 없다.

~~~py
salt="UNIQUE_SALT"  #2
~~~
- salt 값을 우리의 해시 함수를 사용하도록 정의한다. 이 값을 바꿈에 따라 다른 사이트들이 같은 입력에 대해 다른 아이덴티콘들을 만들어 낼 수 있게 된다.

~~~py
@app.route('/',method=['GET','POST']) #3
~~~
- 기본적으로 Flask route는 HTTP GET 요청에 대해서만 응답한다. 우리의 폼은 HTTP POST 요청을 보내도록 되어 있기 떄문에 methods라는 이름의 인수를 route 선언에 추가하여 이 route가 POST와 GET요청을 모두 처리하도록 하자.

~~~py
if requests.method=='POST': #4
~~~
만약 reqeusts.method가 "POST"인 경우, 이 요청은 submi 버튼을 눌러서 발생된 것이다. 이 경우 우리는 사용자가 입력한 텍스트로 name변수를 업데이트하고자 한다.

~~~py
name_hash=hashlib.sha256(salted_name.encode()).hexdigest() #5
~~~
- SHA256 알고리즘을 이용, 입력받은 값의 해시를 구한다.

~~~py
#6
'''.format(name, name_hash)  
~~~
위에서 구한 해시값을 이용하여 이미지 URL을 변경한다. 이는 이미지를 불러오려고 할 떄 브라우저로 하여금 위의 해시 값으로 get_identicon 루트를 호출하도록 한다.


## 결과확인
- 파일의 새로운 버전을 저장하면 파이썬 디버그 웹서버는 변경 사항을 감지하여 자동으로 재시작하게 된다. 이제 모든 기능이 제대로 동작하는 버전의 웹 앱을 완성하게 되었고 아이덴티콘을 확인할 수 있다.


![docker-ch6-03.jpg](/assets/img/study/docker/ch6/docker-ch6-03.jpg)  


# 4. 캐싱 추가하기

## 결과값 캐싱하기!
- 현재 문제점 : 매번 몬스터 그림이 요청될 때마다, 비싼 컴퓨팅 리소스를 사용하여 dnmonster 서비스에 요청을 하고 있다.
- 사실 그럴 필요는 없는데  아이덴티콘을 사용하는 이유는 동일한 입력값에 대해 동일한 이미지를 가져가는 데 있기 때문이다. 따라서 결과값을 캐싱해야 한다. 

**Redis** : 인-메모리 키-벨류 데이터 저장소
Redis 는 우리 애플리케이션과 같이 크지 않은 양의 정보를 처리하고 안정성에 걱정할 필요가 없는 경우 (만약 특정 개체가 사라지거나 지워지는 경우, 다시 이미지를 생성하면 된다)에 적합하다. Redis 서버를 우리 identidock 컨테이너에 추가할 수도 있지만, 새로운 컨테이너를 이용하여 Redis 서버를 올리는 것이 더 쉽고 자연스럽다. 우리는 도커 허브에 이미 올라와 있는 공식 Redis 이미지를 사용하여 한 개의 컨테이너 안에 여러 개의 프로세스들을 돌려야 하는 귀찮은 상황을 피할 수 있다.

## 한 개의 컨테이너 안에서 여러 개의 프로세스 돌리기
- 대다수의 컨테이너 : 한 개의 프로세스만 실행
- 여러 개의 프로세스를 실행 : 여러 개의 컨테이너를 실행하여 이를 묶어 사용하는 것이 좋음

- if 한 개의 컨테이너에서 여러 프로세스를 실행시켜야 할 필요가 있는 경우
 => supervisord(http://supervisord.org/) 또는 runit(http://smarden.org/runit/) 과 같은 프로세스 매니저들을 사용하여 프로세스들을 켜고 모니터링하는 것이 가장 좋다. 단순한 스크립트를 작성하여 프로세스를 시작시킬 수도 있지만, 이러한 경우 프로세스를 종료시켜야 하고, 프로세스에서 발생하는 시그널을 전달해야 할 책임이 있다.

 ## 캐시를 사용하도록 파이썬 코드 업데이트

 ~~~py
 from flask import Flask,Response,request
import requests
import hashlib  
import redis #1

app=Flask(__name__)
cache=redis.StrictRedis(host='redis', port=6379, db=0) #2
salt="UNIQUE_SALT"  
default_name='Joe Bloggs'

@app.route('/',method=['GET','POST']) #3
def mainpage():

    name=default_name
    if requests.method=='POST': #4
        name=request.form['name']

    salted_name=salt+name
    name_hash=hashlib.sha256(salted_name.encode()).hexdigest() #5
    
    header='<html><head><title>Indentidock</title></head><body>'
    body='''<form method="POST">
            Hello<input type="text" name="name" value="{0}">
            <input type="submit" value="submit">
            </form>   
            <p>You look like a:
            <img src="/monster/{1}"/>
            '''.format(name, name_hash)  #6
    footer='</body></html>'

    return header+body+footer


@app.route('/monster/<name>')
def get_identicon(name):

    r=requests.get(name) #3
    if image is None: #4
        print("Cache miss",flush=True) #5

    r=requests.get('http://dnmonster:8080/monster/'+name+'?size=80')
    image=r.content
    cache.set(name,image) #6
    
    return Response(image, mimetype='image/png')

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')
~~~


**<주요 코드 설명>**
~~~py
import redis #1
~~~
- Redis 모듈을 불러온다.

~~~py
cache=redis.StrictRedis(host='redis', port=6379, db=0) #2
~~~
- Redis 캐시를 설정한다. 우리는 도커 링크들을 이용하여 redis 호스트 이름을 해석 가능하게 만들 것이다.

~~~py
r=requests.get(name)  #3 
~~~
- 혹시 이름이 캐시에 있는지 확인한다.

~~~py
if image is None: #4
~~~
- 캐시에 해당 이름이 없는 경우 Redis는 None이라고 응답할 것이다. 이 경우 일반적인 상황대로 아이덴티콘을 생성하면 된다. 


~~~py
print("Cache miss",flush=True) #5
~~~
- 캐시된 버전을 찾지 못했다는 것을 디버그 정보로 출력

~~~py
cache.set(name,image) #6
~~~
- 이름과 함께 새로 받아온 이미지를 캐시에 저장한다.

## 도커파일과 docker-compose.yml 업데이트
새로운 모듈과 새로운 컨테이너를 사용해야 하므로, 도커파일과 docker-compose.yml 파일을 업로드

**1) 도커파일 업로드**
~~~bash
FROM python:3.4

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi
RUN pip install Flask==0.10.1 uWSGI==2.0.8 requests==2.5.1 redis==2.10.3  #1
WORKDIR /app
COPY app /app
COPY cmd.sh /

EXPOSE 9090 9191
USER uwsgi

CMD ["/cmd.sh"]
~~~

~~~bash
RUN pip install Flask==0.10.1 uWSGI==2.0.8 requests==2.5.1 redis==2.10.3  #1
~~~
- 파이썬의 Redis 클라이언트 라이브러리 설치

**2) docker-compose.yml 파일 업로드**
~~~yml
identidock:
    build:
    ports:
        - "5000:5000"
    environment:
        ENV: DEV
    volumes:
        -./app:/app
    links:
    - dnmonster
    - redis   #1

    dnmonster:
        image: amout/dnmonster:1.0
    
    redis:
        image:redis:3.0  #2
~~~
**<주요 코드 설명>**
~~~yml
- redis   #1
~~~
- Redis 컨테이너와의 링크를 구성한다.

~~~yml
 image:redis:3.0  #2
~~~
- 공식 이미지로부터 Redis 컨테이너를 생성한다.

<br>

이제 identidock을 docker-compose stop 명령어를 이용하여 중지시키고, dockercompose build 및 docker-compose up 명령어를 이용하여 새로운 버전을 실행시킨다.

다른 기능적인 변경을 하지 않았기 때문에, 새로운 버전에서 눈에 띄는 차이점을 발견할 수는 없을 것이다.

만약 새로운 코드가 정상적으로 실행되고 있는지 확인하려면, 디버그 출력물을 확인해보면 된다.


# 5. 마이크로서비스

## 마이크로서비스 아키텍처와 모노티릭 아키텍처
- **마이크로서비스(microservice) 아키텍처** : 여러 개의 작고 독립적인 서비스들로 시스템을 구성하는 것
- 모노리틱(monolithic) 아키텍처 : 하나의 큰 서비스로 시스템이 구성되는 것
- 마이크로서비스 아키텍처와 모노리틱 아키테처는 종종 대비됨

=> 우리가 만든 Identidock 의 경우 단순히 재미삼아 만든 애플리케이션이긴 하지만, 이는 마이크로 아키텍처의 여러 면모를 잘 보여줌

## 마이크로 아키텍처의 장점
1. 여러 대의 머신들로 스케일 아웃을 하기가 훨씬 쉽다.
2. 동일한 역할을 하는 더 효율적인 기술들로 빠르고 쉽게 교체할 수 있다.
3. 예상치 못한 문제가 발생했을 때 전체 시스템을 다운시키지 않고 롤백을 진행할 수 있따.
4. 각각 다른 마이크로서비스에 대해 다른 언어들이 사용될 수 있어, 각 개발자마다 구현해야 하는 업무에 맞는 언어를 선택할 수 있다.

## 마이크로 아키텍처의 단점
1. 분산된 구성 요소들에 무리(overhead)가 갈 수 있다는 점
2. 구성요소들 간 커뮤니케이션은 라이브러리 호출이 아니라 네트워크를 통해 이루어짐
3. 모든 구성 요소들이 함께 켜지고 적합하게 연결될 수 있게끔 하기 위해 컴포즈와 같은 도구가 필요하다.
4. 통합 관리와 서비스 확인 등이 매우 중요한 이슈 포인트가 되어 이를 적절히 다루어야 한다.


# 6. 결론
1) 기본적인 기능이 구현된 애플리케이션 구성
2) 컨테이너를 사용하면서 '더 큰 시스템과 상호장굥하는 잘 정의된 작은 서비스들의 묶음; 이라는 마이크로서비스적 사고방식에 자연스럽게 익숙해짐






