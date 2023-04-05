---
title: 파이썬 매일 코딩 1일차
layout: post   
categories : [etc] 
image : /assets/img/etc/파이썬_매일코딩.jpg
description: DAY01
customexcerpt: "파이썬의 numeric 자료형" 
---

<span class = "alert y"> 작성자 : 윤수빈</span>

# DAY 01  numeric 자료형

* random line to make it work. This will be removed.
{:toc} 

## 1.1 Exercise 01. 숫자 맞히기 게임
- 1.1 -1 예제
    ```python  
    # 기본 숫자 맞히기 게임
    import random

    def random_game():
        computer = random.randint(0, 100)

        while True:
            user = int(input("0~100 사이의 숫자를 맞춰보세요 : "))
            if user == computer:
                print(f'{user} 정답 !!')
                break
            elif user > computer:
                print(f'{user} 보다 작아요 !')
            else:
                print(f'{user} 보다 커요 !')

    random_game()
    ```
<br>

- 1.1 -2 예제
    ```python
    # 위 코드에서 str.isdigit 메서드를 사용하여 숫자가 아닌 입력에 대한 처리를 함
    import random

    def random_game():
        computer = random.randint(0, 100)

        while True:
            user = input("0~100 사이의 숫자를 맞춰보세요 : ")
            if not user.isdigit():
                print('[ERROR] 숫자를 입력해주세요')
                continue
            if int(user) == computer:
                print(f'{user} 정답 !!')
                break
            elif int(user) > computer:
                print(f'{user} 보다 작아요 !')
            else:
                print(f'{user} 보다 커요 !')

    random_game()
    ```

<br>

- 1.1 -3 예제
    ```python
    # 숫자 예측 기회를 3번으로 제한
    import random

    def random_game():
        computer = random.randint(0, 100)
        count = 0

        while True:
            if count == 3:
                print(f'정답은 {computer} 였습니다. 아쉽지만 다음기회에 ...')
                break
            
            user = input("0~100 사이의 숫자를 맞춰보세요 : ")
            if not user.isdigit():
                print('[ERROR] 숫자를 입력해주세요')
                continue

            if int(user) == computer:
                print(f'{user} 정답 !!')
                break
            elif int(user) > computer:
                print(f'{user} 보다 작아요 !')
                count +=1
            else:
                print(f'{user} 보다 커요 !')
                count +=1
                
    random_game()
    ```

<br>

- 1.1 -4 예제
    ```python
    # 단어( 문자열 ) 맞추기
    import random

    def random_game():
        str_list = ['Taecyeon Ok', 'Seokjin Ha', 'Subin Yoon', 'Eunbin Yoon']
        computer = random.choice(str_list)
        print(computer)

        while True:
            user = input(f'{str_list} => 이 중 하나의 단어를 맞춰보세요 : ')

            if user not in str_list:
                print(f'입력하신 {user}는 없는 단어입니다.')
                continue

            if user == computer:
                print(f'{user} 정답 !!')
                break
            elif str_list[str_list.index(user)] > str_list[str_list.index(computer)]:
                print(f'{user} 보다 뒤에 있어요 !')
            else:
                print(f'{user} 보다 앞에 있어요 !')
                
    random_game()
    ```
<br>

- 1.1 -5 예제
    ```python
    # 매개변수로 여러 자료형으로 구성된 리스트를 받고, 그 값을 더해서 리턴하는 함수
    # 숫자 또는 숫자로 변환해서 더할 수 있는 것들만 더하고, 나머지는 무시

    def sumValue(str):
        result = 0

        for i in range(len(str)):
            if isinstance(str[i], (int, float)) and not isinstance(str[i], bool):
                result += str[i]

        return result

    print(sumValue(["Taecyeon", 1988, 12.27, True]))
    ```
<br>

## 1.2 Exercise 02. 숫자 더하기
- 1.2 -1 예제 
    ```python
    # 전개연산자( * ) : 함수의 매개변수를 원하는 만큼 받아서 활용할 수 있게 해주는 연산자.

    # sum 함수와 비슷한 기능을 가진 mysum 함수 구현
    def mysum(*num):
        result = 0
        for i in num:
            result += i
        return result

    print(mysum(10, 20, 30, 40, 50))

    ```
<br>

- 1.2 -2 예제  
    ```python
    # 매개변수로 숫자 리스트를 받고, 숫자의 평균을 계산하는 함수
    def mysum(num):
        result = 0
        for i in num:
            result += i
        avg = result / len(num)

        return avg

    print(mysum([10, 20, 30, 40, 50]))
    ```
<br>

- 1.2 -3 예제 
    ```python
    # 단어( 문자열 )로 구성된 리스트를 매개변수로 받고,
    # ( 가장_짧은_단어_길이, 가장_긴_단어_길이, 단어_길이의_평균 ) 형태의 튜플을 리턴

    def returnStr(str):
        result = str.split(" ")
        
        min_word = len(result[0])
        max_word = len(result[0])
        avg_tmp  = 0
        avg_word = 0

        for i in range(len(result)):
            avg_tmp += len(result[i])
            min_word = min(min_word, len(result[i]))  
            max_word = max(max_word, len(result[i]))
            avg_word = avg_tmp/len(result)

        return min_word, max_word, avg_word

    print(returnStr("Hello My Name is SubinYoon"))
    ```
<br>

- 1.2 -4 예제 
    ```python
    # 매개변수로 여러 자료형으로 구성된 리스트를 받고, 그 값을 더해서 리턴하는 함수
    # 숫자 또는 숫자로 변환해서 더할 수 있는 것들만 더하고, 나머지는 무시

    def sumValue(str):
        result = 0

        for i in range(len(str)):
            if isinstance(str[i], (int, float)) and not isinstance(str[i], bool):
                result += str[i]

        return result

    print(sumValue(["Taecyeon", 1988, 12.27, True]))
    ```
<br>

## 1.3 Exercise 03. 달린 시간 계산하기
- 1.3 -1 예제
  ```python
    # 달린 시간 계산하기
    # 사용자에게 숫자를 입력을 여러개 받고, 그 평균을 출력하는 함수

    def run_timing():
        run_count = 0
        total_time = 0

        while True:
            user = input("10km 달리는데 걸린 시간은 ?")

            if not user:
                break

            run_count += 1
            total_time += float(user)

            avg_time = total_time / run_count

            print(f'총 {run_count}번 달렸고, 평균기록은 {avg_time:.2f}초 입니다 ^^')

    run_timing()
  ```
<br>

- 1.3 -2 예제
  ```python
    # 부동소수점 1개와 정수 2개( before, after )를 매개변수로 받고
    # 부동소수점에서 before만큼의 정수부분과, after만큼의 소수부분을 추출
    # 부동소수점의 소수점은 최대 5자리로 제한

    def floating_point(num, before, after):
        front_num = int(num)
        back_num = f'{num - front_num:.5f}'
        front_result = str(front_num)[before:]
        back_result = str(back_num)[2:after+2]
        
        return float(f'{front_result}.{back_result}') 

    print(floating_point(1234.5678, 2, 3))
  ```
<br>

- 1.3 -3 예제
  ```python
    # 부동소수점 계산을 정확하게 할 수 있는 Decimal 클래스를 사용하여
    # 부동소수점 계산

    from decimal import Decimal as D

    def decimal_class(num1, num2):
        D_num1 = D(num1)
        D_num2 = D(num2)
        
        result = D_num1 + D_num2
        return result.quantize(D('0.01')) 

    print(decimal_class(0.1, 0.2))
  ```
<br>

## 1.4 Exercise 04. 16진수 출력하기
- 1.4 -1 예제
    ```python
    # 16진수를 10진수로 변환하기

    def hex_output():
        decnum = 0
        hexnum = input('변환할 16진수를 입력하세요 : ')

        for power, digit in enumerate(reversed(hexnum)):
            decnum += int(digit, 16) * (16 ** power)
        
        print(decnum)

    hex_output()
    ```
<br>

- 1.4 -2 예제
    ```python
    # ord, chr 함수를 사용하여
    # 16진수를 10진수로 변환하기

    def hex_to_dec(hexnum):
        decnum = 0
        for power, digit in enumerate(reversed(hexnum)):
            decnum += (16**power) * (ord(digit) - ord('0') if digit.isdigit() else ord(digit.upper()) - ord('A') + 10)
        return decnum

    def hex_output():
        hexnum = input('변환할 16진수를 입력하세요 : ')
        decnum = hex_to_dec(hexnum)
        print(decnum)

    hex_output()
    ```
<br>

- 1.4 -3 예제
    ```python
    # 이름을 기반으로 '이름 삼각형' 만들기

    def name_triangle():
        name = input("이름을 입력해주세요 : ")
        for i in range(1, len(name)+1):
            print(name[:i])

    name_triangle()
    ```

<br>

## 1.5 정리
- walrus 연산자( 바다사자 연산자 )
  ```python
    ''' 파이썬의 할당 구문 표현식이 아니기에 이러한 코드는 동작하지 않는다.
    while s = input('입력하세요 : '):
        print(f'입력값은 {s} 입니다.')
    '''

    # 위의 코드를 사용할 수 있게 :=라는 새로운 할당 연산자가 추가되었다.
    # 정식 명칭은 '할당 표현식 연산자'지만,
    # := 바다사자와 비슷하게 생겨서 'warlus 연산자'라고 부른다.
    while s := input('입력하세요 : '):
        print(f'입력값은 {s} 입니다.')
  ```
  <br>

- ininstance 함수
  ```python
    '''
    ininstance( 확인하고자 하는 데이터 값, 확인하고자 하는 데이터 타입 )

    첫 번째 매개변수 : 확인하고자 하는 데이터의 값, 객체, 인스턴스
    두 번째 매개변수 : 확인하고자 하는 데이터의 타입, 클래스
    반환 값 : 인스턴스와 타입이 같으면 True를 반환하고, 다르면 False를 반환
    '''
  ```
  <br>
- Decimal 클래스
  ```python
    '''
    Decimal 클래스 : 부동소수점 연산을 더욱 정확하게 처리할 수 있는 파이썬 내장 모듈

    Decimal 클래스를 사용하면 부동소수점으로 인한 정확도 손실 방지 가능

    quantize() 매서드를 사용하여 원하는 소수점 자리수까지 반올림 가능
    '''
  ```

  <br>
- enumerate 함수
  ```python
    # enumerate : 반복문을 적용할 때 현재 몇 번째 반복인지 알 수 있게 해준다.
    
    for index, item in enumerate('abc'):
        print(f'{index} : {item}')
    
    # 결과 
    # 0 : a
    # 1 : b
    # 2 : c
  ```

    <br>
- reversed 함수
  ```python
    # reversed : 반복할 수 있는 대상의 순서를 반전한 이터레이터를 리턴.
    
    r = reversed('abcd')
  ```

<br>

- ord와 chr 함수
  ```python
    # ord 함수 : 문자의 유니코드 코드 포인트 값을 반환. 즉, 문자를 숫자로 변환하는 함수
    # chr 함수 : 유니코드 코드 포인트 값에 해당하는 문자를 반환. 즉, 숫자를 문자로 변환하는 함수 
    
    ord('A')    # 65

    char(65)    # 'A'
  ```