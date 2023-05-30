---
title: Intermediate_ML_3 교차 검증, XGBoost 방법, Data Leakage에 대해 알아보자!
layout: post   
categories : [ML, kaggle, Cross-Validation, XGBoost, Data-Leakage]
image : /assets/img/수료증/박민서-Intermediate_ML.png
description: Intermediate_ML_3 교차 검증, XGBoost 방법, Data Leakage에 대해 알아보자!
customexcerpt: 더 나은 모델 성능을 만들기 위해서 교차 검증을 사용하면 좋다. Data Leakage의 종류 및 예방법에 대해 알아보자.
---
<span class = "alert g">작성자 : 박민서</span>

# Intermediate Machine Learning 3

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc}

Intermediate Machine Learning 1,2 포스팅에 이어서, 계속하여 Machine Learning 전문 지식을 쌓아보자

# 5. Cross-Validation

 교차 검증을 사용하여 모델 성능을 보다 효과적으로 측정하는 방법에 대해 알아보자!    

## Introduction  
-----
머신러닝은 반복적인 과정이다.    

사용할 예측 변수, 사용할 모델 유형, 해당 모델에 제공할 인수 등에 대한 선택에 직면하게 된다. 지금까지는 validation(또는 holdout) 세트를 사용하여 모델 품질을 측정함으로써 데이터 기반 방식으로 선택해왔다.    

하지만 이러한 접근법에는 단점이 있다. 만약 5000개의 행이 있는 데이터셋을 사용한다고 생각해보자. 일반적으로 데이터의 20%(여기서는 1000개의 행이겠죠)를 검증 데이터셋(validation data set)으로 유지한다.  
그러나 이것은 모델을 평가하기엔 별로다. 왜? 모형이 다른 1000개의 행에서 부정확하게 동작하더라도 1000개 행의 집합들 중 하나에서만 잘 작동할 수도 있기 때문이다.    

극단적으로, 검증 데이터의 행이 하나만 있다고 생각해보자. 단일 데이터 하나에 대해서 모델이 그 데이터를 잘 예측하는지 아닌지는 운에 달린 일이다.    

일반적으로 **검증 데이터셋이 클수록 모델 품질 측정에 랜덤성(일명 "노이즈")이 적으며, 신뢰성이 높아진다.**  

## What is cross-validation?
---
 교차 검증에서는 여러 모델 품질 측정값을 얻기 위해 데이터의 다른 하위 집합에 대한 모델링 프로세스를 실행한다.  
 
 예를 들어, 데이터를 전체 데이터셋의 20%씩 5개로 나누는 것으로 시작할 수 있다. 이 경우 데이터를 5개의 "**fold**"로 구분했다고 한다.    

 ![fold](/assets/img/Intermediate%20ML/Itm_ML_part3_01_fold.JPG)  

 각 fold에 대한 실험을 하나 해보자.    

 - 실험1  
 첫 번째 fold를 유효성 검사(또는 holdout)세트로 사용하고 다른 모든 항목을 training data로 사용한다. 이를 통해 20% 홀드아웃 세트를 기반으로 모델 품질을 측정할 수 있다.  

 - 실험2  
 두 번째 fold의 데이터를 유지하고(두 번째 fold를 제외한 모든 데이터를 모델 training에 사용), holdout세트를 사용하여 모델 품질의 추정치를 얻는다.

 - 모든 fold를 holdout 세트로 사용하여 이 프로세스를 반복한다. 이를 종합하면, **데이터의 100%가 어느 시점에서 holdout으로 사용**되며, 데이터셋의 **모든 행을 기반으로 하는 모델 품질 측정값이 생성**된다. (모든 행을 동시에 사용하지 않더라도 모든 행을 기반으로 할 수 있게 됨!!)    

 ## When should you use cross-validation?
 ----
 교차 검증을 사용하면 모델 품질을 보다 정확하게 측정할 수 있으며, 이는 모델을 많이 결정하는 경우 특히나 중요하다. 그러나 여러 모델(각 fold마다 하나씩)을 추정하기 때문에 실행 시간이 오래 걸릴 수 있다.    

 그렇다면 이러한 단점을 감안할 때, 각 접근 방식을 언제 사용해야할까?  

 - 추가적인 계산 부담이 크지 않은 소규모 데이터셋의 경우, 교차 검증을 실행하면 좋다.  
 - 대규모 데이터셋의 경우 단일 검증세트로 충분하다. 코드가 빨리 실행되고 데이터가 충분하여 일부 코드를 보류로 다시 사용할 필요가 거의 없을 수 있다.    

 대규모 데이터셋과 소규모 데이터셋을 구성하는 데이터셋에 대한 간단한 임계값은 없지만, 모델을 실행하는 데 몇 분 정도 소요되는 경우 교차 검증으로 전환하는 것이 좋다.  
 또는 교차 검증을 실행하여 각 실험의 점수가 근접한 것처럼 보이는지 확인할 수 있다. 각 실험에서 동일한 결과가 나올 경우에는 굳이 교차 검증을 하지 않고 단일 유효성 검사로도 충분할 수 있다.    

## Example
----
 이전 챕터와 동일한 데이터로 작업하는데, 입력 데이터를 X로, 출력 데이터를 y로 로드한다.

~~~py
import pandas as pd

# Read the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# Select subset of predictors
cols_to_use = ['Rooms', 'Distance', 'Landsize', 'BuildingArea', 'YearBuilt']
X = data[cols_to_use]

# Select target
y = data.Price
~~~

그런 다음, 누락값을 채우기 위해 imputer를 사용하는 파이프라인과 예측을 하기 위해 랜덤 포레스트 모델을 정의한다.  

파이프라인 없이 교차 검증을 수행하는 것은 가능하지만, 상당히 어렵다. 파이프라인을 사용하면 코드가 간단해지니 파이프라인 사용하기~    

~~~py
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

my_pipeline = Pipeline(steps=[('preprocessor', SimpleImputer()),
                              ('model', RandomForestRegressor(n_estimators=50,random_state=0))])
~~~

우리는 scikit-learn에서 cross_val_score() 함수를 사용하여 교차 검증 점수를 얻는다. 우리는 cv 파라미터로 fold 횟수를 설정한다.  

~~~py
from sklearn.model_selection import cross_val_score

# Multiply by -1 since sklearn calculates *negative* MAE
scores = -1 * cross_val_score(my_pipeline, X, y,
                              cv=5,
                              scoring='neg_mean_absolute_error')

print("MAE scores:\n", scores)
~~~
<pre>
MAE scores:
 [301628.7893587  303164.4782723  287298.331666   236061.84754543
 260383.45111427]
</pre>

스코어링 매개 변수를 보고할 모델 품질의 척도를 선택한다. 이 경우 음의 평균 절대 오차(MAE)를 선택하여 진행하였다.  

음의 MAE를 지정한다는 것은 흔치 않은 일이다. scikit-learn은 모든 메트릭이 정의되므로 숫자가 높을수록 좋다. 일반적으로 우리는 대체 모델을 비교하기 위해 단일 모델 품질 측정을 원한다. 그래서 우리는 여러 시도에서 평균을 취한다.

~~~py
print("Average MAE score (across experiments):")
print(scores.mean())
~~~

<pre>
Average MAE score (across experiments):
277707.3795913405
</pre>

## Conclusion
---
교차 검증을 사용하면 코드가 깔끔해질 뿐만 아니라, **훨씬 더 나은 모델 품질 측정을 산출**한다. 더 이상 별도의 training 및 validation 세트를 추적할 필요가 없다. 따라서 특히나 **소규모 데이터셋의 경우**에 이를 사용하는 것은 좋은 방법이다!!    


# 6. XGBoost

gradient boosting을 사용해서 모델을 구축하고 최적화해보자.  

## Introduction
----

 여태까지는 단순히 많은 의사결정 트리의 예측을 평균화함으로써 단일 의사결정 트리보다 더 나은 성능을 보여주는 랜덤 포레스트 방법을 사용하여 예측했다.    

 여러 모델의 예측을 결합하는 방법을 **"앙상블 방법"** 이라 하는데, 앙상블 방법의 예시로 랜덤 포레스트 방법이 있다.  
 랜덤 포레스트의 경우 여러 의사결정 트리의 예측을 결합하므로 앙상블 방법의 일종이라 할 수 있다.    

 이제는 Gradient Boosting이라는 또다른 앙상블 방법에 대해 배워보자.  

## Gradient Boosting
----

 Gradient Boosting은 앙상블에 반복적으로 모델을 추가하는 주기를 거치는 방법이다.    

 이 방법은 예측이 매우 단순할 수 있는 단일 모델로 앙상블을 초기화하는 것으로 시작한다. 예측이 부정확하더라도 앙상블에 뒤따라 추가되는 예측들이 이런 부정확한 예측을 완화시킬 것이다.    

 초기화 시킨 후 아래의 주기를 반복한다.  
  * 먼저 현재 앙상블을 사용하여 데이터셋의 각 관측치에 대한 예측을 만든다. 예측을 위해 앙상블의 모든 모델의 예측도 추가한다.  
  * 이러한 예측은 MSE와 같은 Loss Function을 계산하는 데에 사용된다.  
  * 그런 다음 Loss Function을 이용하여 앙상블에 추가될 새로운 모델을 fitting 시킨다. 특히, 새로운 모델을 앙상블에 추가할 때 Loss를 줄일 수 있는 모델 매개변수를 결정한다. ("Gradient Boosting" 의 "Gradient"는 Loss Function에 대한 Gradient Descent를 사용하여 새로운 모델 매개변수를 결정한다는 것을 나타낸다.)  
  * 모델 매개변수를 결정했다면, 새로운 모델을 앙상블에 추가한다.  
 위 주기를 반복하며 앙상블에 반복적으로 모델을 추가한다.

 ![XGBoost_iter](/assets/img/Intermediate%20ML/Itm_ML_part3_02_XGBoost_iter.JPG)
 

## Example
----
 먼저 X_train, X_valid, y_train, y_valid 로드한다.  

~~~py
import pandas as pd
from sklearn.model_selection import train_test_split

# Read the data
data = pd.read_csv('../input/melbourne-housing-snapshot/melb_data.csv')

# Select subset of predictors
cols_to_use = ['Rooms', 'Distance', 'Landsize', 'BuildingArea', 'YearBuilt']
X = data[cols_to_use]

# Select target
y = data.Price

# Separate data into training and validation sets
X_train, X_valid, y_train, y_valid = train_test_split(X, y)
~~~

XGBoost 라이브러리를 사용해보자. XGBoost는 Extreme Gradient Boost의 약자로 성능과 속도에 중점을 둔 Gradient Boost에 추가 기능을 덧붙인 것이다.  
(Scikit-learn에는 다른 버전의 Gradient Boosting이 있지만 XGBoost이 기술적인 이점이 있다!)    

다음 코드 셀에서는 XGBoost용 scikit-learn API를 가져온다. (xgboost.XGBRegressor)  
XGBRegressor을 사용해서 scikit-learn에서와 마찬가지로 모델을 만들고 fitting 시킬 수 있다.  
출력에서 확인할 수 있듯이 XGBRegressor 클래스에는 조정 가능한 parameter가 있다.    

~~~py
from xgboost import XGBRegressor

my_model = XGBRegressor()
my_model.fit(X_train, y_train)
~~~

<pre>
XGBRegressor(base_score=0.5, booster='gbtree', callbacks=None,
             colsample_bylevel=1, colsample_bynode=1, colsample_bytree=1,
             early_stopping_rounds=None, enable_categorical=False,
             eval_metric=None, gamma=0, gpu_id=-1, grow_policy='depthwise',
             importance_type=None, interaction_constraints='',
             learning_rate=0.300000012, max_bin=256, max_cat_to_onehot=4,
             max_delta_step=0, max_depth=6, max_leaves=0, min_child_weight=1,
             missing=nan, monotone_constraints='()', n_estimators=100, n_jobs=0,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, ...)
</pre>

모델을 통해 예측을 하고, 모델을 평가해보자.  

~~~py
from sklearn.metrics import mean_absolute_error

predictions = my_model.predict(X_valid)
print("Mean Absolute Error: " + str(mean_absolute_error(predictions, y_valid)))
~~~

<pre>
Mean Absolute Error: 241041.5160392121
</pre>

## Parameter Tuning
----

XGBoost에는 정확도와 training 속도에 큰 영향을 미칠 수 있는 몇 가지 매개변수가 있다.    

### *n_estimators*
n_estimators는 위에서 설명한 모델링 주기를 수행할 횟수를 지정한다.  
모델링 주기를 수행할 횟수 = 앙상블에 추가될 모델 수 라고 생각하면 간단하다.    

- 이 값이 **너무 낮으면 과소적합(underfitting)이 발생** 해서, 교육 데이터와 테스트 데이터에 대한 예측이 모두 부정확해진다.    
- 이 값이 **너무 높으면 과적합(overfitting)이 발생** 해서, 교육데이터에 대해서는 정확한 예측을 하지만, 테스트 데이터에 대해서는 예측의 정확도가 떨어지게 된다.    

 n_estimators은 일반적으로 100 - 1000 사이의 값을 가지지만, learning_rate에 따라 크게 달라진다.  

앙상블 모델의 수를 설정하는 코드를 살펴보자.

~~~py
my_model = XGBRegressor(n_estimators=500)
my_model.fit(X_train, y_train)
~~~

<pre>
XGBRegressor(base_score=0.5, booster='gbtree', callbacks=None,
             colsample_bylevel=1, colsample_bynode=1, colsample_bytree=1,
             early_stopping_rounds=None, enable_categorical=False,
             eval_metric=None, gamma=0, gpu_id=-1, grow_policy='depthwise',
             importance_type=None, interaction_constraints='',
             learning_rate=0.300000012, max_bin=256, max_cat_to_onehot=4,
             max_delta_step=0, max_depth=6, max_leaves=0, min_child_weight=1,
             missing=nan, monotone_constraints='()', n_estimators=500, n_jobs=0,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, ...)
</pre>

### *early_stopping_rounds*

early_stopping_rounds는 n_estimators의 이상적인 값을 자동으로 찾는 방법을 제공한다.  조기 중단을 사용하면 n_estimators의 하드 중지가 아니더라도, 유효성 검사 점수가 더이상 향상되지 않을 때 모델의 반복이 중지된다.  
(하드 중지라는게 약간 코드 내에서 몇회까지 돌아라~ 하고 설정해놓은 중단값?을 말하는 것 같음.  쉽게 말하자면, 루프 1000회 돌아라 라고 코드 내에 적어놨는데 1000회 돌기 전에 더이상 유효성 검사 점수가 향상되지 않는다면 조기에 중단할 수 있다 이런 말인듯함)
n_estimators의 값을 높게 설정한 다음, early_stopping_rounds를 사용하여 반복을 중지할 최적의 횟수를 찾는 것이 좋은 방법이다.    

랜덤하게 돌아가기 때문에 유효성 검사 점수가 향상되지 않는 단일 라운드가 발생하는 경우가 있다. 그러나 그 다음 라운드에 향상될 수도 있기 때문에 몇 번 연속으로 향상되지 않으면 중단할지를 설정해 놓아야 한다.  
early_stopping_rounds=5로 설정하는 것이 합리적이다.  
위 경우 5회 연속으로 유효성 검사 점수가 개선되지 않는다면 중단한다는 의미이다.  

early_stopping_rounds를 사용할 때는 유효성 검사 점수를 계산하기 위한 일부 데이터도 확보해야 한다.  
이 작업은 *eval_set* 이라는 매개 변수를 설정하여 수행된다.  

~~~py
my_model = XGBRegressor(n_estimators=500)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)],
             verbose=False)
~~~

<pre>
/opt/conda/lib/python3.7/site-packages/xgboost/sklearn.py:797: UserWarning: `early_stopping_rounds` in `fit` method is deprecated for better compatibility with scikit-learn, use `early_stopping_rounds` in constructor or`set_params` instead.
  UserWarning,
XGBRegressor(base_score=0.5, booster='gbtree', callbacks=None,
             colsample_bylevel=1, colsample_bynode=1, colsample_bytree=1,
             early_stopping_rounds=None, enable_categorical=False,
             eval_metric=None, gamma=0, gpu_id=-1, grow_policy='depthwise',
             importance_type=None, interaction_constraints='',
             learning_rate=0.300000012, max_bin=256, max_cat_to_onehot=4,
             max_delta_step=0, max_depth=6, max_leaves=0, min_child_weight=1,
             missing=nan, monotone_constraints='()', n_estimators=500, n_jobs=0,
             num_parallel_tree=1, predictor='auto', random_state=0, reg_alpha=0,
             reg_lambda=1, ...)
</pre>

나중에 모든 데이터를 사용해서 모델을 fitting시키기 위해서는 조기 중지를 사용하여 실행할 때 최적인 값으로 n_estimators를 설정하면 된다.    

### *learning_rate*

각 구성 요소로부터 모델의 예측을 단순히 합하여 예측을 하는 방법 대신에, 각 모델의 예측을 더하기 전에 작은 수(a.k.a learning_rate)를 곱할 수 있다.    

learning_rate는 우리가 앙상블에 추가하는 각각의 트리가 덜 영향을 준다는 것을 의미한다.  
따라서 과적합(overfitting)없이 n_estimators에 더 높은 값을 설정할 수 있게 된다.  
조기 중단(Early Stopping)을 사용하면 적절한 트리 수가 자동으로 결정되게 된다.    

일반적으로 learning_rate가 작고, estimator의 수가 많아지면 더 정확한 XGBoost 모델이 생성되지만, 모델이 사이클을 통해 더 많은 반복을 수행하기 때문에 훈련하는데 더 오랜 시간이 걸리게 된다.  
보통 XGBoost를 사욯할 때에 learning_rate는 0.1로 설정한다.  

~~~py
my_model = XGBRegressor(n_estimators=1000, learning_rate=0.05)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)], 
             verbose=False)
~~~

<pre>
XGBRegressor(base_score=0.5, booster='gbtree', callbacks=None,
             colsample_bylevel=1, colsample_bynode=1, colsample_bytree=1,
             early_stopping_rounds=None, enable_categorical=False,
             eval_metric=None, gamma=0, gpu_id=-1, grow_policy='depthwise',
             importance_type=None, interaction_constraints='',
             learning_rate=0.05, max_bin=256, max_cat_to_onehot=4,
             max_delta_step=0, max_depth=6, max_leaves=0, min_child_weight=1,
             missing=nan, monotone_constraints='()', n_estimators=1000,
             n_jobs=0, num_parallel_tree=1, predictor='auto', random_state=0,
             reg_alpha=0, reg_lambda=1, ...)
</pre>

### *n_jobs*

런타임을 고려해야 하는 **대규모 데이터셋에서 병렬화를 사용** 하여 **모델을 더 빠르게 구축** 할 수 있다.  
매개변수 n_jobs를 컴퓨터의 코어 수와 동일하게 설정하는 것이 일반적이며, 소규모 데이터셋에서는 크게 도움이 되지는 않는다.    

결과적으로 모델은 더 나아지지는 않을 것이다. 따라서, 적합한 시간을 위해 미세하게 최적화하는 것은 별로 도움이 되지 않는다.  
하지만 최적화하는 명령을 기다리는 동안 시간이 오래 걸리는 대규모 데이터셋에서는 이 방법이 유용하다.    

~~~py
my_model = XGBRegressor(n_estimators=1000, learning_rate=0.05, n_jobs=4)
my_model.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_valid, y_valid)], 
             verbose=False)
~~~

<pre>
XGBRegressor(base_score=0.5, booster='gbtree', callbacks=None,
             colsample_bylevel=1, colsample_bynode=1, colsample_bytree=1,
             early_stopping_rounds=None, enable_categorical=False,
             eval_metric=None, gamma=0, gpu_id=-1, grow_policy='depthwise',
             importance_type=None, interaction_constraints='',
             learning_rate=0.05, max_bin=256, max_cat_to_onehot=4,
             max_delta_step=0, max_depth=6, max_leaves=0, min_child_weight=1,
             missing=nan, monotone_constraints='()', n_estimators=1000,
             n_jobs=4, num_parallel_tree=1, predictor='auto', random_state=0,
             reg_alpha=0, reg_lambda=1, ...)
</pre>

## Conclusion
----

XGBoost는 표준 표 형식의 데이터(이미지 및 비디오와 같은 유형의 데이터와 다르게 Pandas DataFrame에 저장하는 데이터 유형)을 처리하기 위한 좋은 S/W 라이브러리이다.  
신중한 파라미터 조정을 통해 정확한 모델을 교육시킬 수 있다.

# 7. Data Leakage

 **Data Leakage** 가 무엇이고, 이를 방지하는 방법에 대해 알아보자.  
 Data Leakage(데이터 누출)을 예방하지 못해서 자주 발생하게 되면, 이는 모델을 망칠 수 있다.  

 ## Introduction
 ----
 **Data Leakage** (또는 Leakage)은 train dataset에 대상에 대한 정보가 포함된 경우에 발생하지만, 모델이 예측에 사용되는 경우에는 유사한 데이터를 사용할 수 없다.  
 이로 인해 train dataset(심지어는 test dataset까지)에서 높은 성능을 보이지만, 모델은 성능이 저하될 수도 있다.    

 즉, 누출(Leakage)이 일어나면 모델에 대한 의사결정을 시작할 때까지는 모델이 정확해 보이지만 사실 실제로는 모델의 예측이 부정확해지는 현상이 발생한다.    

 Leakage(누출)에는 **target leakage** 와 **train-test contamination** 의 두 가지 종류가 있다.    

 ### *Target Leakage*

 예측 변수에 **예측 시점에 사용할 수 없는 데이터가 포함된 경우** 에 Target Leakage가 발생한다.  
 Target Leakage에 대해서는 기능이 적절한 예측에 도움이 되는지 여부가 아니라 **데이터를 사용할 수 있게 되는 시기나 시간 순서의 측면** 에서 생각하는 것이 중요하다.    

 예를 통해 이해해보자. 누가 폐렴에 걸릴 것인지 예측하고 싶다고 하자.  
 원시 데이터는 아래와 같다.
 | got_pneumonia | age | weight | male  | took_antibiotic_medicine | ... |
|---------------|-----|--------|-------|--------------------------|-----|
| False         | 65  | 100    | False | False                    | ... |
| False         | 72  | 130    | True  | False                    | ... |
| True          | 58  | 100    | False | True                     | ... |

사람들은 회복하기 위해 폐렴에 걸린 후에 항생제를 투약한다. 원시데이터는 이러한 열 간의 강력한 관계를 보여주지만, *took_antibiotic_medicine* 은 *got_pneumonia* 의 값이 결정됨에 따라 자주 변경된다.  
이것이 바로 target leakage의 예이다.    

이 모델은 항생제 복용에 대해 false 값을 가진 사람은 폐렴에 걸리지 않음을 예측한다.  
유효성 검사 데이터는 교육 데이터와 동일한 소스에서 나오기 떄문에 패턴은 유효성 검사에서 반복되며 모델은 유효성 검사(혹은 교차 유효성 검사, Cross-Validation) 점수가 높게 나온다.    

하지만 이 모델은 실제로 적용될 때 매우 부정확하게 예측할 것이다.  
왜냐하면 폐렴에 걸릴 환자들이 미래의 건강에 대해 예측할 때, 항생제를 아직 안 받은 경우가 많기 때문이다.    

이러한 유형의 데이터 누출을 방지하려면 target 값이 실현된 후에 업데이트 되거나 생성된 모든 변수를 제외시켜야 한다.  

![target_leakage](/assets/img/Intermediate%20ML/Itm_ML_part3_03_t_leakage.JPG)

### *Train-Test Contamination*

train data와 validation data를 신중하게 구분하지 않으면 다른 유형의 누출이 발생한다.    

검증은 모델이 이전에 고려하지 않았던 새로운 데이터에 대해 수행하는 방식을 측정하는 것이다. **유효성 검사 데이터가 전처리 동작에 영향을 미치는 경우** 에 이 프로세스의 성능을 저하시킬 수 있다. 이를 **Train-Test Contamination** 이라고 한다.    

예를 들어 train_test_split()을 호출하기 전에 사전 처리(누락된 값에 대해 imputer 적합)를 실행한다고 가정해보자.  
최종 결과는 모델의 유효성 검사 점수가 우수하여 모델에 대한 신뢰도가 높을 수도 있겠지만, 모델을 실제로 돌려서 의사 결정을 내릴 때는 성능이 저하된다.    

결국에는 검증 또는 테스트 데이터의 데이터를 예측 방법에 통합시켰기 때문에 새로운 데이터로 일반화할 수 없는 경우에도 해당 데이터를 잘 처리할 수 있다.  
이 문제는 더 복잡한 모델 feature 엔지니어링을 수행할 때 더 심해진다.    

검증이 단순한 Train-Test 분할을 기반으로 하는 경우, 전처리 단계의 적합을 포함한 모든 적합 유형에서 유효성 데이터를 제외한다.  
scikit-learn 의 파이프라인을 사용하면 더 쉽게 제외할 수 있다. 교차 검증을 사용할 때에는 파이프라인 내부에서 전처리를 수행하는 것이 훨씬 중요하다.    

## Example
----
이 예를 통하여 target Leakage를 탐지하고 제거하는 방법에 대해 알아보자.    

신용카드 애플리케이션에 대한 데이터셋을 사용하고, 각 신용카드 애플리케이션에 대한 정보가 데이터 프레임 X에, 이를 사용하여 시리즈 y에서 어떤 응용 프로그램이 허용되었는지 예측한다.    

~~~py
import pandas as pd

# Read the data
data = pd.read_csv('../input/aer-credit-card-data/AER_credit_card_data.csv', 
                   true_values = ['yes'], false_values = ['no'])

# Select target
y = data.card

# Select predictors
X = data.drop(['card'], axis=1)

print("Number of rows in the dataset:", X.shape[0])
X.head()
~~~

<pre>
Number of rows in the dataset: 1319
</pre>
|   | reports | age      | income | share    | expenditure | owner | selfemp | dependents | months | majorcards | active |
|---|---------|----------|--------|----------|-------------|-------|---------|------------|--------|------------|--------|
| 0 | 0       | 37.66667 | 4.5200 | 0.033270 | 124.983300  | True  | False   | 3          | 54     | 1          | 12     |
| 1 | 0       | 33.25000 | 2.4200 | 0.005217 | 9.854167    | False | False   | 3          | 34     | 1          | 13     |
| 2 | 0       | 33.66667 | 4.5000 | 0.004156 | 15.000000   | True  | False   | 4          | 58     | 1          | 5      |
| 3 | 0       | 30.50000 | 2.5400 | 0.065214 | 137.869200  | False | False   | 0          | 25     | 1          | 7      |
| 4 | 0       | 32.16667 | 9.7867 | 0.067051 | 546.503300  | True  | False   | 2          | 64     | 1          | 5      |

이것은 소규모 데이터셋이기 때문에 교차 검증을 사용하여 모델 품질의 정확한 측정을 보장할 필요가 있다.    

~~~py
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

# Since there is no preprocessing, we don't need a pipeline (used anyway as best practice!)
my_pipeline = make_pipeline(RandomForestClassifier(n_estimators=100))
cv_scores = cross_val_score(my_pipeline, X, y, 
                            cv=5,
                            scoring='accuracy')

print("Cross-validation accuracy: %f" % cv_scores.mean())
~~~

<pre>
Cross-validation accuracy: 0.981052
</pre>

경험에 비추어 볼때 98%의 정확도를 가지는 모델을 찾는 경우는 매우 드물다는 것을 알게될 것입니다. 물론 그런 경우도 있기야 하겠지만, target leakage에 대해 데이터를 더 자세히 검사해야 하는 경우는 거의 없다.    

데이터셋의 컬럼들을 알아보자.
- card : 신용카드 신청이 승인된 경우 1, 아니면 0
- reports : 주요 비하 보고 수
- age : 10세 + 1년의 12분의 1
- income : 연간 소득 (10,000 으로 나눔)
- share : 연간 소득 대비 월별 신용카드 지출 비율
- expenditure : 월평균 신용카드 지출액
- owner : 집을 소유한 경우 1, 임대이면 0
- selfempl : 자영업자일 경우 1, 아니면 0
- dependents : 1 + 비부양자 수
- months : 현재 주소에 거주하는 월
- majorcards : 보유중인 주요 신용카드 수
- active : 활성 신용 계좌 수

몇 가지 변수의 target leakage가 의심된다.  
예를 들어, expenditure은 이 카드의 지출을 의미하는지, 아니면 카드 신청 이전에 사용한 카드에 대한 지출을 의미하는지 애매하다.    

~~~py
expenditures_cardholders = X.expenditure[y]
expenditures_noncardholders = X.expenditure[~y]

print('Fraction of those who did not receive a card and had no expenditures: %.2f' \
      %((expenditures_noncardholders == 0).mean()))
print('Fraction of those who received a card and had no expenditures: %.2f' \
      %(( expenditures_cardholders == 0).mean()))
~~~

<pre>
Fraction of those who did not receive a card and had no expenditures: 1.00
Fraction of those who received a card and had no expenditures: 0.02
</pre>

위와 같이 카드를 받지 않은 사람은 모두 지출이 없다. 반면 카드를 받았는데 지출이 없는 사람은 2%에 불과했습니다.  
우리의 모델이 높은 정확도를 가지고 있는 것은 놀라운 일이 아니다. 그러나 이것은 또한 target leakage의 경우로 보이며 여기서 지출은 아마도 그들이 신청한 카드에 대한 지출을 의미하는 것 같다.    

분담금(share)은 부분적으로 지출에 의해 결정되기 때문에 이것도 제외되어야 한다.  
active와 majorcards는 조금 덜 명확하지만, 설명을 들어보면 좀 우려되는 것처럼 보인다.  
대부분의 경우 데이터를 만든 사람들을 추적하여 자세히 알아볼 수 있다면 안전하게 가는 것이 좋다.    

~~~py
# Drop leaky predictors from dataset
potential_leaks = ['expenditure', 'share', 'active', 'majorcards']
X2 = X.drop(potential_leaks, axis=1)

# Evaluate the model with leaky predictors removed
cv_scores = cross_val_score(my_pipeline, X2, y, 
                            cv=5,
                            scoring='accuracy')

print("Cross-val accuracy: %f" % cv_scores.mean())
~~~

<pre>
Cross-val accuracy: 0.830919
</pre>

정확도가 낮게 나와서 실망스러울수도 있지만, Leakage가 발생하는 모델보다는 훨씬 낫다!  
Leakage가 발생하는 모델은 교차 검증에서는 높게 나올지 모르지만, 실제 결과는 나쁘게 나온다.  

## Conclusion
----
교육 및 검증 데이터를 신중하게 분리하면 train-test Contamination을 방지할 수 있으며, 파이프라인은 이러한 분리 과정을 구현하는 데에 도움이 될 수 있다.  
마찬가지로 caution, common sense, data exploration을 조합하여 target leakage를 식별할 수 있다.  

![intermediate_ML](/assets/img/수료증/박민서-Intermediate_ML.png)