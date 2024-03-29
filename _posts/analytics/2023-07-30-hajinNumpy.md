---
title: 데이터 분석을 위한 NumPy의 기초
layout: post
categories: [Analytics, pandas]
image: /assets/img/study/analytics/hajin/hajin1.png
description: NumPy의 기본 - 배열의 연산
customexcerpt: Numpy의 배열 연산에 대해 알아보자
---

<span class = "alert g">작성자 : 김하진</span>

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->

- random line to make it work. This will be removed.
  {:toc}

![사진1](/assets/img/study/analytics/hajin/hajin1.png)

# 1. 배열을 이용한 배열지향 프로그래밍

Numpy 배열을 사용하면 간결한 배열 연산을 사용해 많은 종류의 데이터 처리 작업을 할 수 있다.
브로드캐스팅은 아주 강력한 벡터 연산 방법이다. 간단한 예로 np.meshgrid 함수는 두개의 1차원 배열을 받아서 가능한 모든 (x,y) 짝을 만들 수 있는 2차원 배열 2개를 반환한다.

```python
points = np.arange(-5, 5, 0.01) #-5부터 4.99까지 0.01씩 증가하는 값들의 배열
xs, yx = np.meshgrid(points, points)
ys
```

![사진2](/assets/img/study/analytics/hajin/hajin2.png)

## 1.1 배열 연산으로 조건절 표현하기

- numpy.where 함수
  x if 조건 else y 같은 삼항식의 벡터화된 버전이다.

  ```python
  xarr = np.array([1.1, 1.2, 1.3, 1.4, 1.5])
  yarr = np.array([2.1, 2.2, 2.3, 2.4, 2.5])
  cond = np.array([True, False, True, True, False])
  ```

  일때

  ```python
  result = np.where(cond, xarr, yarr) # xarr if cond else yarr 을 의미
  ```

    <pre>arrat([1.1, 2.2, 1.3, 1.4, 2.5])</pre>

  즉, where은 np.where(조건, 참일때, 거짓일때)이다.

## 1.2 수학 메서드와 통계 메서드

- 합, 평균, 표준편차는 numpy의 최상위 함수를 이용하거나 배열의 인스턴스 메소드를 이용해서 구할 수 있다.
- arr.mean(axis=1)
  mean(평균), sum(합) 같은 함수는 선택적으로 axis 인자를 받아서 해당 axis에 대한 통계를 계산하고 한 차수 낮은 배열을 반환 (axis=축) 5x4 짜리를 저렇게 하면 1x4 형태로 나온다

  즉, 5x4 형태의 배열 arr를 계산하면 각 열에 대한 평균값들을 1x4 형태의 배열로 반환하게 된다.

- 배열.cumsum() : 배열의 누적합을 배열로 나타냄
  ```python
  arr = np.array([0,1,2,3,4,5])
  arr.cumsum()
  ```
    <pre>array([0, 1, 3, 6, 10, 15])</pre>
- 배열.cumprod() : 배열의 누적곱
  ```python
  arr = np.array([0,1,2,3,4,5])
  arr.cumprod()
  ```
    <pre>array([0, 1, 2, 6, 24, 120])</pre>

## 1.3 불리언 배열을 위한 메서드

- 불리언 값을 1(True) 또는 0(False)로 강제할 수 있다.
  따라서 sum 메소드를 실행하면 불리언 배열에서 true인 원소의 개수를 셀 수 있다.

```python
bools = np.array([False, False, True, False])
```

일때 이 배열에 대한 any(), all()의 결과를 살펴보자.

- 배열.any() : 하나 이상의 값이 true이면 true 반환, 아니면 false 반환

  ```python
  bools.any()
  True
  ```

- 배열.all() : 전부 true이면 true 반환, 아니면 false 반환

  ```python
  bools.all()
  False
  ```

## 1.4 집합 관련 함수

NumPy는 1차원 ndarray를 위한 몇 가지 기본적인 집합 연산을 제공한다. 자주 사용하는 함수인 np.unique에 대해 알아보자.

- np.unique() : 배열 내에서 중복된 원소를 제거하고 남은 원소를 정렬된 형태로 반환하는 것이다.

  예시 1

  ```python
  names = np.array(['Bob', 'Joe', 'Will', 'Bob', 'Will', 'Joe', 'Joe'])
  np.unique(names)
  ```

    <pre>array(['Bob', 'Joe', 'Will'], dtype='<U4')</pre>
    <br/>
    예시 2

  ```python
  ints = np.array([3, 3, 3, 2, 2, 1, 1, 4, 4])
  np.unique(ints)
  ```

    <pre>array([1, 2, 3, 4])</pre>

# 2. 배열 데이터의 파일 입출력

- numpy는 디스크에서 텍스트나 바이너리 형식의 데이터를 불러오거나 저장할 수 있다.
- np.save와 np.load는 배열 데이터를 효과적으로 디스크에 저장하고 불러오기 위한 함수다.
- 배열은 기본적으로 압축되지 않은 원시 바이너리 형식의 .npy 파일로 저장된다.

- np.load('파일 경로')
  저장된 배열을 불러오는 함수이다.
- np.savez
  여러 개의 배열을 압축된 형식으로 저장할 수 있는데, 저장하려는 배열을 키워드 인자 형태로 전달한다.
    <pre>np.savez('파일명.npz', 변수1=배열1, 변수2=배열2)</pre>

# 3. 선형대수

행렬의 곱셈, 분할, 행렬식 그리고 정사각 행렬 수학 같은 선형대수는 배열을 다루는 라이브러리에서 중요한 부분이다.

- np.dot(배열1, 배열2) : 행렬의 곱
- np.det() : 행렬식을 계산
- np.inv() : 정사각 행렬의 역행렬을 계산
- np.diag() : 정사각 행렬의 대각/비대각 원소를 1차원 배열로 반환하거나, 1차원 배열을 대각선 원소로 하고 나머지는 0으로 채운 단위행렬을 반환한다.

# 4. 난수 생성

numpy.random 모듈은 파이썬 내장 random 함수를 보강하여 다양한 종류의 확률분포로부터 효과적으로 표본값을 생성하는 데 주로 사용된다. 예를 들어 normal을 사용하여 표준정규분포로부터 4x4 크기의 표본을 생성할 수 있다.

- np.normal() : 정규분포에서 표본을 추출함

  ```python
  samples = np.random.normal(size=(4,4))
  ```

    <pre>array([[1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]])</pre>

- np.randint() : 주어진 범위 안에서 난수를 생성함

  ```python
  np.randint(0,20) #0~19까지 랜덤숫자 1개 생성
  ```

- np.randn() : 표준편차가 1이고 평균값이 0인 정규분포에서 표본을 추출함

  ```python
  np.randn(3,2) # 표준정규분포 난수인 3x2 배열 생성
  ```

    <pre>array([[0.21023055, 0.03504426], 
    [0.19848749, 0.99993567],
    [0.79509783, 0.05405658]])</pre>

- np.uniform() : 균등 분포에서 표본을 추출함
  ```python
  np.uniform(0, 1, 100) # 최소값 0, 최대값 1, 100개의 난수 생성
  ```
