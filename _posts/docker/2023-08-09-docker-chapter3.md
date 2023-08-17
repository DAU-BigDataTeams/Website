---  
title: Docker 명령어 사용하기
layout: post   
image : /assets/img/study/docker/book-logo.jpg
categories : [docker]
customexcerpt: 도커로 실행 및 기본 명령어에 대하여 알아보기
---

<span class = "alert g">작성자 : 정지우</span>

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 



# 1. 첫 번째 이미지 실행하기


## (1) 도커가 잘 실행되었는지 테스트 하기 위한 명령어
   ``` $ docker run debian echo "Hello World" ```

  - docker run : 컨테이너를 시작하는 역할 수행
  - debian : 인수로 사용함. 사용하고자 하는 이미지의 이름을 말함.

    ![1_docker_run](/assets/img/study/docker/chap3/1_docker_run.png)  

**<명령결과 해석>**

  [1] 반환된 결과 첫번째 줄 : 로컬에 드비안 이미지가 없음을 알려줌

  [2] 도커는 온라인으로 도커 허브를 확인하고 최신 버전의 드비안 이미지를 다운로드함.

  [3] 이미지 다운로드가 되면 도커는 이미지를 실행 상태의 컨테이너로 전환함

  [4] echo “Hello World” 라고 작성한 명령을 수행하게 됨

  [5] 해당 명령을 수행한 결과는 결과의 가장 마지막 줄에 출력됨
  


**(cf) 같은 명령을 다시 한번 더 실행하게 될 경우**

- 이미지 다운로드 하지 않고 곧바로 컨테이너를 실행하게 됨.
- 도커는 컨테이너를 시작하고, echo 명령을 수행한 다음, 다시 컨테이너를 종료함.

  ![2_docker_run2](/assets/img/study/docker/chap3/2_docker_run2.png) 


<br>



## (2) 컨테이너 내부에서 쉘(shell)을 수행하도록 도커 사용

```$ docker run -i -t debian /bin/bash```

```echo “Helo from Container-land!”```

```exit```

![3_docker_shell](/assets/img/study/docker/chap3/3_docker_shell.png) 



**<명령 결과>**

- 원격 머신에 ssh로 연결되는 것처럼 컨테이너 내부에 새로운 명령 프롬프트가 나타남.’
- ```-i  -t``` 플래그 : 컨테이너와 tty 모드와 대화형 세션을 사용하겠다는 것을 의미
- ```/bin/bash ``` 명령 : bash 쉘을 반환함.
- 쉘을 빠져나오면 컨테이너는 종료됨.

+) 컨테이너는 주 프로제스(main process)가 실행되는 동안에만 동작함.

<br><br>

# 2. 기본 명령어
(1) -h플래그를 이용하여 컨테이너에 새로운 호스트 이름 부여하기

```$ docker run -h CONTAINER -i -t debian /bin/bash```

```-h``` : 컨테이너에 새로운 호스트 이름을 부여

(2) **docker inspect** 를 실행하면서 컨테이너의 이름 or ID를 주면 컨테이너에 대한 자세한 정보를 얻을 수 있다.

```$ docker inspect stupefied_turing```

![4_docker_inspect](/assets/img/study/docker/chap3/4_docker_inspect.png) 

(3) **grep 명령, --format 인수** : 관심 있는 정보를 필터링

~~~shell
$ docker inspect stupefied_turing | grep IPAdress
$ docker inspect --format {{.NetworkSettings.IPAddress}} stupefied_turing
$ docker inspect --format {{.NetworkSettings.IPAddress}} stupefied_turing
~~~


![5_docker_grep](/assets/img/study/docker/chap3/5_docker_grep.png) 


(4) **docker diff**  : 컨테이너가 시작된 이후에 변경된 파일의 목록들이 결과로 반환됨

```$ docker diff stupefied_turing```

(5)**docker logs** : 해당 명령을 컨테이너 이름과 함께 실행하면 컨테이너 내부에서 발생된 모든 작업 내용들을 볼 수 있다.

![6_docker_logs](/assets/img/study/docker/chap3/6_docker_logs.png) 


(6)쉘에서 빠져나오기

```exit```

![7_docker_exit](/assets/img/study/docker/chap3/7_docker_exit.png) 

쉘에서 빠져나오게 되면 컨테이너가 중지됨

(7)중지된 컨테이너를 포함한 모든 컨테이너의 목록을 확인

```docker ps -a```

(8)docker rm 명령 : 컨테이너를 삭제 

```$ docker rm stupefied_turing```

(9)중지된 모든 컨테이너의 ID들을 반환 

   ```$ docker ps -aq -f stauts=exited```

(10)중지된 컨테이너 정리하기 

 ```$ docker rm -v $ (docker ps -aq -f status=exited)```

   - v 인자 : 도커가 관리하는 모든 볼륨들을 삭제함 (단, 다른 컨테이너에 의해서 참조되지 않는 상태에 있는 볼륨만 삭제함)
  - --rm 플래그 : 중지된 컨테이너가 적체되는 것을 막기 위해서 —rm 플래그를 이용하여 명령 실행함

<br>

# 3.도커파일로 이미지 만들기
- 도커파일 : 도커 이미지를 생성하기 위해서 사용될 수 있는 일련의 절차들을 담고 있는 텍스트 파일

- **새로운 폴더와 파일을 생성하는 작업**
    
    ```$ mkdir cowsay```
    ```$ cd cowsay```
    ```$ touch Dockerfile```
    
- 다음의 내용을 dockerfile에 추가함
    
  ```FROM debian:wheezy RUN apt-get update && apt-get install -y cowsay fortune```

    *(FROM 설정에는 사용할 기본 이미지 - 앞서는 debain을 사용하였지만, 이번에는 ‘wheezy”라는 태그가 표기된 버전을 사용함)*

    - 모든 도커파일에는 첫 번째 설정으로 FROM 명령이 포함되어 있어야 함
    - RUN 설정은 이미지 내부에서 수행될 때 쉘 명령을 지정할 때 사용함.

<br>

- **새로운 폴더와 파일을 생성하는 작업**


    ```$ docker build -t test/cowsay-dockerfile .```
    
- 앞선 예제와 같은 방법으로 이미지를 실행시킬 수 있다.

  ```$ docker run test/cowsay-dockerfile /usr/games/cowsay “Moo”```
<br>

## 이미지 , 컨테이너, 그리고 UFS(Union File System)
- UFS(유니온 마운트) : 여러 개의 파일 시스템들을 겹칠 수 있도록 해줌.
사용자에게는 하나의 파일 시스템처럼 보이게 됨.

- 컨테이너의 상태 : 생성(created), 재시작(restarting), 실행 중(running), 일시중지(paused), 종료(exied)

# 4. 레지스트리를 이용한 작업
작성한 이미지를 도커 허브에 업로드하고 다른 사람들이 다운로드하여 사용하도록 할 수 있다.

도커 허브는 명령 줄과 웹 사이트를 통해서 접근할 수 있다.
http://registry.hub.docker.com 사이트를 통하여 기존의 이미지들을 검색할 수 있음

**레지스트리, 저장소, 이미지 , 태그**
- 레지스트리(Restry)
  이미지를 운영하고 배포하는 역할을 담당하는 서비스.
  기본 레지스트리는 도커 허브.

- 저장소(Repository)
  관련된 이미지들(일반적으로 같은 응용프로그램 또는 서비스의 각기 다른 비전)의 집합

- 태그(Tag)
  저장소에 있는 이미지에 붙여진 알파벳과 숫자로 된 구분자(예를 들면 14.04 또는 stable과 같이 사용된다.)

<br>

## 개인 저장소
타인이 이미지에 접근하지 않도록 할 수 있다.

- 약간의 비용 지불, 개인 저장소 운영 (도커 허브 또는 quay.io와 같은 서비스)
- 나만의 레지스트리를 운영

**이미지 네임스페이스**

게시된 도커 이미지들은 다음과 같이 세 가지 네임스페이스에 소속될 수 있으며, 이미지 이름으로 구분할 수 있다.

1. ex. amouat/realjs : 문자로 된 접두어와 / 로 이름이 구성되면 “user” 네임스페이스에 소속됨 

2. 접두어나 / 가 없는 debian, ubuntu 와 같은 이름은 “root” 네임스페이스에 속함

3. 호스트 이름이나 IP가 접두어로 사용된 이름은 (도커 허브가 아닌) 서드-파티 레지스트리에서 운영되는 이미지들을 말함.

사용자는 네임스페이스로 이미지들의 위치를 정확하게 구분 지을 수 있다. debain 이미지를 이용하게 되면 다른 레지스트리에 있는 debian 이미지가 아니라 도커 허브의 공식 이미지를 이용하는 것이다.
