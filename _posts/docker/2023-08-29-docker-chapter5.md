---
title: 개발에 도커 사용해보기
layout: post
description: 개발에 도커 사용해보기
categories: [docker]
customexcerpt: 실제 개발에 도커를 사용해보기
---

<span class = "alert g"> 작성자 : 김혜영</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 


파이썬 프로그래밍과 플라스크(Flask) 웹 프레임워크를 이용해 애플리케이션 작성해보자. 플라스크는 가벼운 웹 프로그래밍을 할 때 요긴하게 사용되는 프레임워크다. 파이썬 문법이 아닌 도커와의 상호작용 자체를 중심으로 이번 장을 공부해보자. 참고로, 도커를 이용해 의존관계(dependencies)를 구성할 것이기 때문에 호스트 컴퓨터에 파이썬이나 플라스크를 설치할 필요는 없다.


# "Hello World!" 말하기

## 파이썬 파일 코딩하기

"Hello World"라고 응답하는 웹서버를 만들어보자. identidock이라는 이름의 새로운 디렉터리를 만들고 다음과 같은 구조가 되도록 파일을 만든다.

![1](/assets/img/study/docker/ch5/1.JPG) 

identidock.py엔 다음 파이썬 코드를 기입한다.

~~~py
from flask import Flask # Flask 라이브러리 import
app = Flask(__name__) # 애플리케이션 객체 생성

@app.route('/') # 라우터 등록
def hello_world(): # 동작 함수 설정
    return 'Hello World!\n' 

if __name__ == '__main__': # 웹 서버 설정
    app.run(debug = True, host='0.0.0.0')
~~~

![2](/assets/img/study/docker/ch5/2.JPG)

> Flask 웹 프레임워크는 간단한 웹 프로그래밍을 할 때 요긴하게 사용할 수 있는 파이썬 라이브러리입니다. 설치도 쉽고 코드도 쉽게 짤 수 있습니다..


## Dockerfile 만들기

~~~bash
touch Dockerfile
~~~ 
명령어를 실행해 identidock 디렉터리에 docekrfile을 생성한다.

파일구조는 다음과 같다.

![3](/assets/img/study/docker/ch5/3.JPG)

dockerfile에 다음 내용 기입

~~~Dockerfile
FROM python:3.4

RUN pip install Flask==0.10.1
WORKDIR /app
COPY app /app

CMD ["python","identidock.py"]
~~~
이 도커 파일은 파이썬 3 버전이 설치되어 있는 공식 파이썬 이미지를 기반으로 사용한다. 

~~~Dockerfile
RUN pip install Flask==0.10.1
~~~
명령어를 이용해 자동으로 플라스크 라이브러리를 설치한다. 

CMD는 identidock.py의 코드를 실행한다.

이제 애플리케이션을 빌드하고 실행할 수 있다.

## 빌드하고 실행해보기

~~~bash
cd identidock
docker build -t identidock .
... 
docker run -d -p 5000:5000 identidock
~~~

도커 컨테이너를 빌드하면 아래와 같이 뜬다.

![4](/assets/img/study/docker/ch5/4.JPG)

그리고 컨테이너를 실행하면 아래와 같이 뜬다.

![5](/assets/img/study/docker/ch5/5.JPG)


~~~bash
docker run -d -p 5000:5000 identidock
~~~

여기서 docker run 명령어에 여러 인자들이 붙어있는 모습을 볼 수 있다.

* -d : 컨테이너를 백그라운드 실행
* -p 5000:5000 : 컨테이너의 5000포트를 호스트의 5000 포트로 포트포워딩

이제 테스트 가능하다.

![6](/assets/img/study/docker/ch5/6.JPG)

위의 코드는 identidock.py의 내용을 수정할 때마다 이미지를 다시 빌드하고 컨테이너를 재시작해야한다는 단점이 있다. 이를 해결하기 위해 호스트의 소스 코드 폴더를 컨테이너 내부의 소스 코드 폴더 위에 **바인드 마운트(bind mount)** 시킬 수 있다. 

아래 코드는 마지막으로 실행한 컨테이너를 중지 및 삭제시킨다.

![7](/assets/img/study/docker/ch5/7.JPG)

~~~bash
-v $(pwd)/app:/app
~~~
위 인수는 app 디렉터리를 컨테이너 내부의 /app 디렉터리에 마운트 시킨다. 

이를 통해, 호스트에서 컨테이너 내부 /app 디렉터리의 내용들을 덮어쓸 수 있고 컨테이너 내부에서도 해당 디렉터리에 쓰기 작업이 가능하다. 

컨테이너는 삭제됐지만 마운트된 컨테이너가 존재해서 코드가 아직 제대로 동작한다. 
~~~bash
curl localhost:5000
~~~

<pre>
Hello World!
</pre>

만약, 컨테이너 내부의 코드를 변경해도 별도의 동작없이 제대로 실행된다.

![8](/assets/img/study/docker/ch5/8.JPG)


이 컨테이너는 이제 꽤 '일반적인' 개발 환경이 되었다.(코드를 자유롭게 수정하고..) 하지만, 이 컨테이너는 운영 환경으로 사용할 수 없다. 이 컨테이너는 플라스크 웹 서버를 사용하는데 웹 서버가 개발 용도만 만들어졌기 때문에 실제 프로덕션 환경에서 사용하기엔 보안 및 기능 면에서 부족하다. 이를 보완해보자.

> 운영환경은 실제로 서비스를 운영하는데 도움을 주는 도구들을 말한다. 모니터링, 배포, 배치에 도움을 주는 서비스로 구성되어 있습니다.

## 실제 운영환경으로 구성해보기

uWSGI는 nginx와 마찬가지로, 웹서버 뒤에서 동작하는 프로덕션용 어플리케이션 서버이다. 기존의 Flask 웹서버 대신 uWSGI를 이용하면 유연한 컨테이너 사용이 가능하다. 심지어 수정도 간단하다.
(교재의 코드에서 사용된 파이썬과 라이브러리 버전이 너무 오래되어서 이 포스팅에선 변경함)

~~~dockerfile
FROM python:3.7

RUN pip install Flask uWSGI
WORKDIR /app
COPY app /app

CMD ["uwsgi","--http","0.0.0.0:9090","--wsgi-file","/app/identidock.py",\
"--callable", "app", "--stats", "0.0.0.0:9191"]
~~~

uWSGI를 install한 뒤에 

uWSGI를 실행하도록 하는 명령을 넣는다. uWSGI를 9090 포트를 리스닝하는 http 서버로 설정하고 app 애플리케이션을 실행하도록 구성한다. 그리고 9191 포트를 이용하여 통계 서버를 시작시킨다라는 내용이다.(굉장히 복잡하다.. 책을 읽어보는 것을 추천)


이제 빌드해보자
~~~bash
docker build -t identidock .
docker run -d -p 9090:9090 -p 9191:9191 identidock
curl localhost:9090
~~~

위의 코드를 순서대로 실행하면

![8](/assets/img/study/docker/ch5/9.JPG)

이렇게 나온다.

마지막으로 보안을 위해 하나만 더 해주면 된다. uWSGI가 현재 루트로 실행되고 있다면 보안상 문제가 생긴다. 도커파일에 uWSGI를 실행시킬 사용자를 지정하는 것으로 쉽게 고칠 수 있다. 

~~~dockerfile
FROM python:3.7

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi # uWSGI 사용자와 그룹을 유닉스 스타일로 생성
RUN pip install Flask uWSGI
WORKDIR /app
COPY app /app

EXPOSE 9090 9191 # 호스트와 다른 컨테이너에서 접근 가능한 포트들을 선언
USER uwsgi 

CMD ["uwsgi","--http","0.0.0.0:9090","--wsgi-file","/app/identidock.py",\
"--callable", "app", "--stats", "0.0.0.0:9191"] 
~~~

위의 도커파일로 다시 빌드하고 실행하면 아래와 같은 결과가 나온다.

![8](/assets/img/study/docker/ch5/11.JPG)

이제 컨테이너 내의 명령은 root 계정으로 실행되지 않는다. 
이제부턴 아래 명령어를 이용해서 컨테이너를 실행할 수 있다.

~~~bash
docker run -d -P --name port-test identidock
~~~

이번엔 호스트가 바인딩할 포트들을 지정하지 않았다. 대신 -P 인수를 이용해 도커가 호스트의 높은 번호의 포트를 임의로 선택해 컨테이너의 "노출된" 포트로 매핑하도록 했다. 아래는 어떤 포트가 선택됐는지 확인하고 사용하는 과정이다.

![8](/assets/img/study/docker/ch5/12.JPG)

## 디버깅 환경 구성

이젠, 기본 파이썬 웹서버가 제공하는 디버깅 결과나 라이브 코드 리로딩과 같은 개발 도구를 사용하기 위한 설정을 해보자.
간단한 스크립트 변경을 통해서 사용할 수 있다. 

~~~sh
#!/bin/bash
set -e

if ["$ENV" = 'DEV']; then
    echo "Running Development Server"
    exec python "identidock.py"
else
    echo "Running Production Server"
    exec uwsgi --http 0.0.0.0:9090 --wsgi-file /app/identidock.py \
               --callable app --status 0.0.0.0:9191
fi
~~~

이 스크립트는 변수 ENV가 DEV라면 디버깅용 웹서버를 실행시킨다. 
Exec 명령은 새로운 프로세스를 만드는 것을 피하기 위해서 사용되었다. 다음으로 도커파일을 업데이트한다. 
~~~Dockerfile
FROM python:3.7

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi # uWSGI 사용자와 그룹을 유닉스 스타일로 생성
RUN pip install Flask uWSGI
WORKDIR /app
COPY app /app
COPY cmd.sh /

EXPOSE 9090 9191 # 호스트와 다른 컨테이너에서 접근 가능한 포트들을 선언
USER uwsgi 

CMD ["/cmd.sh"] 
~~~

위 코드를 사용하기 전에 도커 컨테이너를 모두 중지시켜야한다.

아래 코드를 차례대로 실행한다.

~~~bash
docker stop $(docker ps -q)
docker rm $(docker ps -aq)
chmod +x cmd.sh
docker build -t identidock .
docker run -e "ENV=DEV" -p 5000:5000 identidock
~~~
아래와 같은 결과가 나온다.

![8](/assets/img/study/docker/ch5/13.JPG)


# 컴포즈로 자동화하기

도커 컴포즈는 빠르게 도커 개발 환경을 올려 사용할 수 있도록 만들어진 도구이다. YMAL 파일을 이용해 여러 컨테이너들의 설정을 저장해 반복적인 작업이나 쉽게 에러가 발생하는 작업들을 단순화한다. 

도커 툴박스를 이용해 도커를 설치했으면 기본적으로 컴포즈를 사용할 수 있다. 

.identidock에 docker-compose.yml이라는 파일을 만들어 아래와 같은 내용을 넣는다.

~~~yml
identidock: # 컨테이너 이름 선언
    build: # 현재 디렉터리의 도커파일을 이미지로 빌드함.
    ports: # port를 노출시키는 역할
        - "5000:5000"
    environment: # docker run의 -e 인수와 동일
        ENV: DEV
    volumes: # docker run의 -v와 동일
        - ./app:/app
~~~

이렇게 yml파일 실행 뒤에 아래 명령어 실행하면 위와 같이 컨테이너 사용이 가능하다.

~~~bash
docker-compose up
~~~


# 컴포즈 워크플로
컴포즈 명령어들이다. 

1. up: 컴포즈 파일에 정의된 모든 컨테이너들을 실행. 백그라운드로 실행하고자 하면 -d 인자와 함께 사용
2. build: 도커파일에 의해 만들어진 이미지들을 리빌드. 이미지 업데이트를 해야하면 이 명령어 사용
3. ps: 컴포즈에 의해 관리되는 컨테이너들의 상태를 표시
4. run: one-off 명령을 실행해 컨테이너 실행.
5. logs: 컴포즈가 관리하는 컨테이너 로그 확인
6. stop: 컨테이너를 중지
7. rm: 컨테이너 삭제. -v 인수를 사용해 도커에서 관리하는 볼륨들을 삭제하는 것을 잊지 말자
