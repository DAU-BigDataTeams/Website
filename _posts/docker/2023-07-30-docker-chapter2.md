---  
title: (Chapter 2)Docker를 설치해봐유~ 
layout: post   
image : /assets/img/study/docker/book-logo.jpg
categories : [docker]
customexcerpt: docker installing step-by-step 
---

<span class = "alert g">작성자 : 김대로</span>


<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

# 도커 설치하기

## 리눅스에 도커 설치하기
Linux에 도커를 설치하는 가장 좋은 방법은 도커에서 제공하는 설치 Script를 이용하는 것이다.   

대부분의 유명한 리눅스 배포판들은 도커 패키지들을 포함하지만, 도커의 최신 release 보다 뒤처지기 때문에, 문제가 될 수 있다.  

도커를 정상적으로 실행시키기 위해서는 Linux의 kernel version 3.10 이상을 사용해야한다.
    kernel version을 확인 해보고 싶다면, uname -r 명령어를 통해 확인할 수 있다. 

또한, 64bit 시스템을 이용해야한다는 것도 기억하자.
    uname -m 명령어의 출력으로 x86_64가 반환되어야 한다.    

http://get.docker.com 에서 제공하는 docker 자동 설치 script를 활용할 수 있다. script 사용법은 다음 사진과 같다.    

![docker_install_script](/assets/img/study/docker/chap2/script.PNG)

위와 같은 절차를 따라 install-docker.sh를 서버에서 받아서 실행하게 되면 도커 설치가 진행된다.

installer를 사용하기 싫거나, 다른 버전의 도커를 사용하고 싶다면, 도커 웹사이트에서 바이너리(https://docs.docker.com/installation)를 다운로드 하면된다.

(해당 서적은 도커의 1.8 버전 사용)  
</br>

### **허용(Permissive) 모드에서 SELinux 실행하기**

</br>

RHEL, CentOS, Fedora를 포함한 레드햇 기반의 배포판을 실행하고 있다면, SELinux 보안 모듈이 설치되어 있다.

    - Linux는 크게 슬렉웨어, 데비안, 레드햇 계열이 존재하며, 배포판의 종류마다 장단점이 존재한다.
    - 슬렉웨어 : 순수한 리눅스 시스템. 시스템을 직접 구성하고 관리
    - 데비안 : 안정성에 우선을 두며 서버에 적합. 대표적인 예로 Ubuntu가 있음
    - 레드햇 : 안정성과 보안에 우선을 두며 기업용. 

도커를 시작하는 단계일 때는, 강제 또는 오류를 발생시키기보다는 로그로 기록을 남기게 하는 허용 모드(permissive mode)를 권장한다. 강제 모드(enforcing mode)로 실행하는 경우 사용 권한 오류가 발생한다.  
  
sestatus 명령어를 통해 SELinux 모드를 확인할 수 있다. enforcing 모드인 경우 sudo sentenforce 0 명령어를 실행.

</br>


### **sudo 없이 실행하기**
</br>

도커는 기본적으로 권한을 가지는 바이너리이기 때문에 실행을 하려면 명령 뒤에 sudo를 명시해 주어야 한다.      

Ubuntu의 경우, 다음과 같이 실행하여 설정을 변경할 수 있다.  
~~~ py
$ sudo usermod -aG docker
~~~
위 명령을 실행하게 되면, 도커 그룹을 생성하고, 현재 사용자를 그룹에 추가한다.

사용자 권한 부여 이후에 리눅스 배포판에 따라서 다음과 같이 도커 서비스를 재시작해 주어야 한다.
~~~ py
$ sudo service docker restart
~~~

## Mac OS 또는 Windows에 도커 설치하기

</br>

Windows 도는 Mac OS를 사용한다면, 도커를 실행하기 위한 가상화 환경이 필요하다.      

가상화 환경 생성을 위해서 완전한 형태의 VM(Virtual Machine) 솔루션을 다운로드하거나, 도커 Toolbox(boot2docker VM 및 도커 도구 포함)를 설치하는 방식을 이용할 수 있다.   

</br>

Toolbox의 quickstart 터미널을 열어서 도커로 접속한다. 또한, 아래와 같은 명령어를 통해 기존 터미널에서 접속하도록 설정하는 것도 가능하다.
~~~ py
$ docker-machine start default
$ eval $(docker-machine env default)
~~~

위의 명령이 실행되면, VM에서 도커 엔진으로 접속하는 데 필요한 설정이 있는 환경을 구성하게 된다.

- 단, Toolbox를 이용하는 경우 도커의 호스트 IP를 VM의 IP로 변경해주어야 한다.
~~~ py
$ curl $(docker-machine ip default):5000
~~~
docker-machine ip default는 VM의 IP 주소에 해당한다.

</br>

## 점검하기

</br>

※ 아래에서 다룰 docker version 확인에 관련된 명령어들은 리눅스 호스트에서만 동작하니 이점을 유의!

docker version 명령을 실행하여, 제대로 도커가 설치되어 동작하는 것을 확인해 보자.   
도커가 제대로 설치되었다면, Client와 Server 정보가 표시될 것이다.   
Cilent 정보만 출력되고, docker.sock: no such file or directory. 라는 문구가 출력된다면,
도커 데몬(windows의 서비스 같은 개념)이 실행되고 있지 않은 것이다.      

데몬과 관련된 오류가 발생하면 sudo docker daemon 명령을 통해 도커 데몬을 수동으로 실행하자

