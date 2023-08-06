---  
title: NumPy 실습
layout: post 
categories: [Analytics, pandas]
description: NumPy 실습
customexcerpt: 실습을 통해 NumPy를 이해해보자!
---

<span class = "alert g">작성자 : 전다혜</span>

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc}

# 1. N*N 으로 된 numpy array 생성
~~~ py  
import numpy as np
def n_size_ndarray_creation(n, dtype=np.int8):
    return np.array(range(n**2), dtype).reshape(n,n)
    
result1 = n_size_ndarray_creation(3)
print(result1)
~~~  
<pre>  
[[0 1 2]
[3 4 5]
[6 7 8]] 
</pre>    

 # 2. shape 크기의 원소가 모두 0인 ndarray를 생성
 ## 행렬의 element는 type에 따라 0, 1 또는 empty로 생성된다.
~~~ py
import numpy as np  
def fill_with_zero(shape, type=0, dtype=np.int8):
    if type == 0: # type : 생성되는 element들의 값을 지정
        return np.zeros(shape, dtype)

result2 = fill_with_zero(shape=(4,7))
print(result2)
~~~  
<pre>  
[[0 0 0 0 0 0 0]
 [0 0 0 0 0 0 0]
 [0 0 0 0 0 0 0]
 [0 0 0 0 0 0 0]] 
</pre> 

# 3. 입력된 ndarray X를 n_row의 값을 row의 개수로 지정한 matrix를 반환
## 입력하는 X의 size는 2의 거듭제곱수로 전제
## n_row과 1일 때는 matrix가 아닌 vector로 반환된다.
~~~ py  
import numpy as np
def change_shape_of_ndarray(X, n_row):
    if n_row == 1:
        return X.flatten() # n_row가 1일 때는 matrix가 아닌 vector로 반환해야하므로 flatten() 써줘야 함
    else:
        return X.reshape(n_row, -1)

X = np.ones((32,32), dtype=np.int8)
result3 = change_shape_of_ndarray(X, 1)
print(result3)
result3 = change_shape_of_ndarray(X, 512)
print(result3)
~~~  
<pre>  
[1 1 1 ... 1 1 1]
[[1 1]
 [1 1]
 [1 1]
 ...
 [1 1]
 [1 1]
 [1 1]]
</pre> 

# 4. axis 축을 따라 X_1과 X_2를 병합
## X_1과 X_2는 matrix 또는 vector 임, 그러므로 vector 일 경우도 처리할 수 가 있어야 한다.
## axis를 기준으로 통합할 때, 통합이 불가능하면 False가 반환된다.
## 단 X_1과 X_2 Matrix, Vector 형태로 들어왔다면, Vector를 row가 1개인 Matrix로 변환하여 통합이 가능한지 확인해야 한다.
~~~ py  
import numpy as np
def concat_ndarray(X_1, X_2, axis):
  try : #vector형태로 들어왔다면 vector를 row가 1개인 matrix로 변경
    if X_1.ndim == 1:
        X_1 = X_1.reshape(1, -1)
    if X_2.ndim == 1:
        X_2 = X_2.reshape(1, -1)
    return np.concatenate((X_1, X_2), axis) # concat을 해서 안되면 value 에러가 남
  except ValueError as e:
    return False

X_1 = np.array([[1,2], [3,4]])
X_2 = np.array([5,6])
result4 = concat_ndarray(X_1, X_2, 0)
print(result4)
X_1 = np.array([[1,2], [3,4]])
X_2 = np.array([5,6])
result4 = concat_ndarray(X_1, X_2, 1)
print(result4)
~~~  
<pre>  
[[1 2]
 [3 4]
 [5 6]]
False
</pre> 