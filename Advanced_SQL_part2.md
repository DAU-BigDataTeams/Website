---
title: Kaggle과 함께하는 SQL 기술 향상시키기! - Lesson2. Analytic Functions
layout: post   
categories : SQL, Kaggle, Big-data, DAU-BigDataTeam
image : ![]
description: SQL에 대해 더 깊이 알아보도록 하자.   
customexcerpt: Kaggle의 Advanced SQL과정을 통해 SQL 실력을 더 향상시켜보자. 
---

# ****Advanced SQL****
<br>

## **Lesson 2. Analytic Functions**
> Perform complex calculations on groups of rows.
---
### ****Introduction****
Intro to SQL 과정에서는 행 집합을 기반으로 하여 계산을 수행하는 집계 함수를 사용하는 방법에 대해 배웠다. 

이번 강의에서는 행 집합에서도 작동하는 분석 함수를 정의 하는 방법을 배울것이다. 

그러나 집계 함수와 달리, 분석 함수는 원래 표의 각 행에 대해 _(잠재적으로 다른)_ 값을 반환한다. 

<br>

분석 기능을 사용하면, 비교적 간단한 구문으로 복잡한 계산을 수행할 수 있다. 

예를 들어, 이동 평균과 실행 총계 등과 같은 예시에서 빠른 계산을 할 수 있다. 

<br>

### ****Syntax****
분석 함수를 작성하는 방법을 이해하기 위해, 경주를 위해 훈련 중인 두 사람의 데이터가 포함된 작은 데이터를 사용하여 과정을 수행할 것이다. 

ID 열은 각 주자를 식별하고, 날짜 열은 교육 세션의 하루를 포함하며, 시간은 주자가 교육에 전념한 시간(분)을 나타낸다. 

각 주자에 대한 교육 시간의 이동 평균을 계산하려고 한다. 

여기서는 현재 및 이전 교육 세션의 평균을 수강한다. 

다음 QUERY 문을 사용하여 해당 작업을 수행할 수 있다. 

![img2-1](https://i.imgur.com/rehp8HM.png)

<br>

모든 분석 함수에는 OVER문이 있으며, 각 적은 각 계산에 사용되는 행 집합을 정의한다. 

OVER문은 세 부분(선택 사항)으로 구성된다. 

- **PARTITION BY** : 테이블의 행을 다른 그룹으로 나눈다. 위의 QUERY문에서는 계산을 주자별로 구분되도록 ID별로 나누었다. 
- **ORDER BY** : 각 파티션 내의 순서를 정의한다. 샘플 조회에서 날짜 열을 기준으로 순서를 지정하면, 이전 교육 세션이 먼저 표시 될 것이다. 
- **window frame** : 마지막 절(1 성행 행과 현재 행 사이의 행)을 의미한다. 각 계산에서 사용되는 행 집합을 식별한다. 이 행 그룹을 window라고 한다. (실제 분석 함수는 분석 창 함수 또는 단순하게 창 함수라고 불리기도 한다. )

<br>

![img2-2](https://i.imgur.com/GjiKlA7.png)

<br>

### ****(More on) window frame clauses****
There are many ways to write window frame clauses:

- **ROWS BETWEEN 1 PRECEDING AND CURRENT ROW** : the previous row and the current row.
- **ROWS BETWEEN 3 PRECEDING AND 1 FOLLOWING** : the 3 previous rows, the current row, and the following row.
- **ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING** : all rows in the partition.

물론, 이것은 완전한 목록이 아니며, 더 많은 선택지가 있다는 것을 생각해 볼 수 있다. 

<br>

### ****Three types of analytic functions****
위의 예제에서는 여러 분석 함수 중 하나만 사용했다. 

BigQuery는 다양한 분석 기능을 지원하며, 이번 part에서 살펴보고자 한다. 

<br>

_전체 목록은 다음 문서를 참고하라 : https://cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls?hl=ko_

<br>

**1) Analytic aggregate functions**

집계 함수는 창 내의 모든 값을 입력으로 사용하고 단일 값을 반환한다.

- **MIN() (or MAX())** : Returns the minimum (or maximum) of input values
- **AVG() (or SUM())** : Returns the average (or sum) of input values
- **COUNT()** : Returns the number of rows in the input

<br>

**2) Analytic navigation functions**

탐색 기능은 일반적으로 현재 행과 다른 행의 값을 기준으로 값을 할당한다. 

- **FIRST_VALUE() (or LAST_VALUE())** : Returns the first (or last) value in the input
- **LEAD() (and LAG())** : Returns the value on a subsequent (or preceding) row

<br>

**3) Analytic numbering functions**

번호 매기기 기능은 순서에 따라 각 행에 정수 값을 할당한다. 

- **ROW_NUMBER()** : Returns the order in which rows appear in the input (starting with 1)
- **RANK()** : All rows with the same value in the ordering column receive the same rank value, where the next row receives a rank value which increments by the number of rows with the previous rank value.

<br>

_더 자세한 예제와 설명은 https://www.kaggle.com/code/alexisbcook/analytic-functions 을 참고하자._

<br>

## ****Exercises****

~~~py
#The following code cell fetches the taxi_trips table from the chicago_taxi_trips dataset. 
# We also preview the first five rows of the table. You'll use the table to answer the questions below.

from google.cloud import bigquery

# Create a "Client" object
client = bigquery.Client()

# Construct a reference to the "chicago_taxi_trips" dataset
dataset_ref = client.dataset("chicago_taxi_trips", project="bigquery-public-data")

# API request - fetch the dataset
dataset = client.get_dataset(dataset_ref)

# Construct a reference to the "taxi_trips" table
table_ref = dataset_ref.table("taxi_trips")

# API request - fetch the table
table = client.get_table(table_ref)

# Preview the first five lines of the table
client.list_rows(table, max_results=5).to_dataframe()
~~~

### ****1) How can you predict the demand for taxis?****
Say you work for a taxi company, and you're interested in predicting the demand for taxis. Towards this goal, you'd like to create a plot that shows a rolling average of the daily number of taxi trips. Amend the (partial) query below to return a DataFrame with two columns.

당신이 택시 회사에서 일을 하고 있고, 택시 수요를 예측하는데 관심있다고 가정해보자. 이 목표를 달성하기 위해 일일 택시 운행 횟수의 롤링 평균을 표시하는 그래프를 생성하려고 한다. 아래 query를 수정하여 두 개의 열이 있는 데이터 프레임을 반환하라. 

- **trip_date** : contains one entry for each date from January 1, 2016, to March 31, 2016.
- **avg_num_trips** : shows the average number of daily trips, calculated over a window including the value for the current date, along with the values for the preceding 3 days and the following 3 days, as long as the days fit within the three-month time frame. For instance, when calculating the value in this column for January 3, 2016, the window will include the number of trips for the preceding 2 days, the current date, and the following 3 days.

~~~ py
# Fill in the blank below
avg_num_trips_query = """
                      WITH trips_by_day AS
                      (
                      SELECT DATE(trip_start_timestamp) AS trip_date,
                          COUNT(*) as num_trips
                      FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
                      WHERE trip_start_timestamp > '2016-01-01' AND trip_start_timestamp < '2016-04-01'
                      GROUP BY trip_date
                      )
                      SELECT trip_date,
                          AVG(num_trips) 
                          OVER (
                               ORDER BY trip_date
                               ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING
                               ) AS avg_num_trips
                      FROM trips_by_day
                      """
~~~


<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>trip_date</th>
      <th>avg_num_trips</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2016-01-19</td>
      <td>85156.571429</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2016-01-23</td>
      <td>83809.428571</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2016-02-28</td>
      <td>92816.428571</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2016-03-29</td>
      <td>75684.000000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2016-01-26</td>
      <td>82071.285714</td>
    </tr>
  </tbody>
</table>
<br>

### ****2) Can you separate and order trips by community area?****
The query below returns a DataFrame with three columns from the table: pickup_community_area, trip_start_timestamp, and trip_end_timestamp.

Amend the query to return an additional column called trip_number which shows the order in which the trips were taken from their respective community areas. So, the first trip of the day originating from community area 1 should receive a value of 1; the second trip of the day from the same area should receive a value of 2. Likewise, the first trip of the day from community area 2 should receive a value of 1, and so on.

Note that there are many numbering functions that can be used to solve this problem (depending on how you want to deal with trips that started at the same time from the same community area); to answer this question, please use the RANK() function.

아래의 query문은 테이블에서 pickup_community_area, trip_start_timestamp 및 trip_end_timestamp의 세 개 열을 가진 데이터 프레임을 반환한다. 

query문을 수정하여 trip_numver라는 추가 열을 반환한다. 이 열은 각 커뮤니티 영역에서 이동한 순서를 나타낸다.
따라서 커뮤니티 영역 1에서 출발한 날의 첫 번째 여행은 1의 값을 받아야 하고, 같은 지역에서 출발한 날의 두 번째 여행은 2의 값을 받아야 한다. 마찬가지로 커뮤니티 영역 2에서 하루 중 첫 번쨰 이동은 1의 값을 받아야 한다. 

이 문제를 해결하는데 사용할 수 있는 많은 번호 지정 기능이 있다. 해당 질문에 답하기 위해 RANK() 함수를 사용하라.

~~~ PY
# Amend the query below
trip_number_query = """
                    SELECT pickup_community_area,
                        trip_start_timestamp,
                        trip_end_timestamp,
                        RANK()
                            OVER (
                                  PARTITION BY pickup_community_area
                                  ORDER BY trip_start_timestamp
                                 ) AS trip_number
                    FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
                    WHERE DATE(trip_start_timestamp) = '2013-10-03' 
                    """

trip_number_result = client.query(trip_number_query).result().to_dataframe()
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>pickup_community_area</th>
      <th>trip_start_timestamp</th>
      <th>trip_end_timestamp</th>
      <th>trip_number</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>67.0</td>
      <td>2013-10-03 01:15:00+00:00</td>
      <td>2013-10-03 01:30:00+00:00</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>67.0</td>
      <td>2013-10-03 07:45:00+00:00</td>
      <td>2013-10-03 07:45:00+00:00</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>67.0</td>
      <td>2013-10-03 08:00:00+00:00</td>
      <td>2013-10-03 08:00:00+00:00</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>67.0</td>
      <td>2013-10-03 08:00:00+00:00</td>
      <td>2013-10-03 08:00:00+00:00</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>67.0</td>
      <td>2013-10-03 21:00:00+00:00</td>
      <td>2013-10-03 21:00:00+00:00</td>
      <td>5</td>
    </tr>
  </tbody>
</table>

<br>


### ****3) How much time elapses between trips?****
The (partial) query in the code cell below shows, for each trip in the selected time frame, the corresponding taxi_id, trip_start_timestamp, and trip_end_timestamp.

Your task in this exercise is to edit the query to include an additional prev_break column that shows the length of the break (in minutes) that the driver had before each trip started (this corresponds to the time between trip_start_timestamp of the current trip and trip_end_timestamp of the previous trip). Partition the calculation by taxi_id, and order the results within each partition by trip_start_timestamp.

Some sample results are shown below, where all rows correspond to the same driver (or taxi_id). Take the time now to make sure that the values in the prev_break column make sense to you!

<br>

선택한 시간 범위의 각 트립에 대해 해당하는 taxi_id, trip_start_timestamp 및 trip_end_timestamp를 보여준다. 

이 연습에서 수행할 과정은 주행이 시작되기 전에 운전자가 가졌던 휴식 시간(분)을 보여주는 추가 prev_break열을 포함하도록 query를 편집하는 것이다.  _(이는 현재 주행의 trip_start_timestamp와 이전 주행의 trip_end_timestamp 사이의 시간에 해당함)_


 계산을 taxi_id로 분할하고 각 분할 내의 결과를 trip_start_timestamp로 정렬하라.

일부 샘플 결과는 아래에 나와 있으며, 여기서 모든 행은 동일한 드라이버(또는 taxi_id)에 해당한다. 

지금 시간을 내어 prev_break 열의 값이 의미 있는지 확인하라.

![exercise2-3](https://i.imgur.com/zzHgmlx.png)

Note that the first trip of the day for each driver should have a value of **NaN** (not a number) in the `prev_break` column.

~~~ py
# Fill in the blanks below
break_time_query = """
                   SELECT taxi_id,
                       trip_start_timestamp,
                       trip_end_timestamp,
                       TIMESTAMP_DIFF(
                           trip_start_timestamp, 
                           LAG(trip_end_timestamp, 1) OVER (PARTITION BY taxi_id ORDER BY trip_start_timestamp), 
                           MINUTE) as prev_break
                   FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
                   WHERE DATE(trip_start_timestamp) = '2013-10-03' 
                   """

break_time_result = client.query(break_time_query).result().to_dataframe()
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>taxi_id</th>
      <th>trip_start_timestamp</th>
      <th>trip_end_timestamp</th>
      <th>prev_break</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>00752524a4118a162dce62ff49c0eb0f79530d9e0ecb5a...</td>
      <td>2013-10-03 05:45:00+00:00</td>
      <td>2013-10-03 06:00:00+00:00</td>
      <td>315.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>00752524a4118a162dce62ff49c0eb0f79530d9e0ecb5a...</td>
      <td>2013-10-03 19:30:00+00:00</td>
      <td>2013-10-03 20:00:00+00:00</td>
      <td>255.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>07780d6ed6024003f9fd2d0dae5b2af4e11e3303e73641...</td>
      <td>2013-10-03 08:30:00+00:00</td>
      <td>2013-10-03 08:45:00+00:00</td>
      <td>285.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2ace0a0c841190acb5513d4f011447a3e9df87da0cc213...</td>
      <td>2013-10-03 08:00:00+00:00</td>
      <td>2013-10-03 09:00:00+00:00</td>
      <td>330.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2ee325e10e1eec919fc5bfc4d64ed9951cbab4fb13b3e2...</td>
      <td>2013-10-03 12:30:00+00:00</td>
      <td>2013-10-03 12:30:00+00:00</td>
      <td>165.0</td>
    </tr>
  </tbody>
</table>
<br>

---
