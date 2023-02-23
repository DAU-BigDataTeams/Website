---
title: Kaggle과 함께하는 SQL 기술 향상시키기! - Lesson1. JOINs and UNIONs
layout: post   
categories : [SQL, kaggle, Big-data, DAU-BigDataTeam]
image : /assets/img/수료증/이수원-AdvancedSQL.png
description: SQL에 대해 더 깊이 알아보도록 하자.   
customexcerpt: Kaggle의 Advanced SQL과정을 통해 SQL 실력을 더 향상시켜보자. 
---

# Advanced SQL
<br>

## Lesson 1. JOINs and UNIONs
> Combine information from multiple tables.
---
### Introduction
앞서, Intro to SQL 과정에서 INER JOIN을 사용하여 서로 다른 두 개의 테이블의 정보를 통합하는 방법을 배웠다.

이제 UNION을 사용하여 여러 테이블에서 정보를 가져오는 방법과 함께 JOIN의 몇 가지 유형에 대해 더 알아보자. 

<br>

예시로, 아래 그림과 같은 주인과 애완동물이라는 이름을 가진 두 개의 테이블로 작업을 할 것이다. 

![img1-1](https://i.imgur.com/dYVwS4T.png)

owners 테이블의 각 행은 서로 다른 애완동물 소유자를 식별하며, 여기서 ID열은 고유 식별자이다.

owners 테이블의 Pet_ID 열에는 소유자에게 속한 애완동물의 ID가 포함되어 있다.

_(Pet_ID는 Pet 테이블의 애완동물 ID와 일치한다.)_
<br>
<br>

### JOINs
INER JOIN을 사용하여 Pet_ID의 값이 있는 두 테이블에서 행을 가져올 수 있다. 

owners 테이블의 ID열이 애완동물 테이블의 ID 열과 일치한다. 

![img1-2](https://i.imgur.com/C5wimKT.png)


이 경우, Veronica Dunn과 Maisie는 결과에 포함되지 않는다. 그러나, 만약 우리가 주인이 있든 없든 상관없이 모든 애완동물을 포함하는 테이블을 만들고 싶다고 한다면 어떻게 해야 할까?

또는, 두 테이블의 모든 행을 결합하려면 어떻게 해야 할까? 

**이러한 경우에는 다른 유형의 JOIN을 사용하면 된다.** 

![img1-3](https://i.imgur.com/tnOqw2S.png)

위 그림에 있는 Query에서 INER JOIN의 형태가 아닌 LEFT JOIN으로 바꿔보자. 

1. **LEFT JOIN**으로 바꾸면, 두 테이블에 일치하는 항목이 있는 모든 행과 왼쪽 테이블의 모든 행 _(일치 여부에 관계없이)_ 이 반환된다.

2. **RIGHT JOIN**을 대신 사용하면 일치하는 행이 오른쪽 테이블의 모든 행과 함께 표시된다. _(일치 여부에 관계 없이)_

3. 마지막으로, **FULL JOIN**은 두 테이블의 모든 행을 반환한다. 

일반적으로 두 테이블에서 일치하지 않는 행에는 결측값에 대한 NULL 항목이 있다. 

![img1-4](https://i.imgur.com/1Dvmg8S.png)
<br>
<br>

### UNIONs
앞서 살펴본 것처럼, JOIN은 여러 테이블의 결과를 수평으로 결합한다.

대신 열을 수직으로 연결하기 위해서는 UNION을 사용해야 한다. 

아래 예제의 Query는 두 테이블의 연령 열을 결합한다. 

![img1-5](https://i.imgur.com/oa6VDig.png)

UNION의 경우, 두 열의 데이터 유형은 동일해야 하지만, 열 이름은 다를 수 있다.

예를 들어, owners 테이블에서 UNION을 통해 Pet 테이블의 Pet_Name 열을 가져올 수 없다. 

<br>

**UNION ALL**을 사용하면 중복된 값을 포함한다. 

owners 테이블과 Pet 테이블 모두에 9가 표시되고, 연결된 결과에 두 번 표시가 된다. 

중복된 값을 삭제하기 위해서는, query문에 UNION ALL을 **UNION DISTINCT**로 변경하기만 하면 된다.

<br>

_더 자세한 예제와 설명은 https://www.kaggle.com/code/alexisbcook/joins-and-unions 을 참고하자._

<br>
<br>
<br>

## Exercise: JOINs and UNIONs
~~~py
# The code cell below fetches the posts_questions table from the stackoverflow dataset. 
# We also preview the first five rows of the table.

from google.cloud import bigquery

# Create a "Client" object
client = bigquery.Client()

# Construct a reference to the "stackoverflow" dataset
dataset_ref = client.dataset("stackoverflow", project="bigquery-public-data")

# API request - fetch the dataset
dataset = client.get_dataset(dataset_ref)

# Construct a reference to the "posts_questions" table
table_ref = dataset_ref.table("posts_questions")

# API request - fetch the table
table = client.get_table(table_ref)

# Preview the first five lines of the table
client.list_rows(table, max_results=5).to_dataframe()
~~~

~~~py
# We also take a look at the posts_answers table.

# Construct a reference to the "posts_answers" table
table_ref = dataset_ref.table("posts_answers")

# API request - fetch the table
table = client.get_table(table_ref)

# Preview the first five lines of the table
client.list_rows(table, max_results=5).to_dataframe()
~~~

### Exercises
**1) How long does it take for questions to receive answers?**

일반적으로 질문이 답변을 받는 데 걸리는 시간을 더 잘 이해하기 위해 데이터를 탐색하는데 중점을 둔다. 

이러한 지식을 바탕으로 이 정보를 사용하여 Stack Overflow 사용자에게 질문이 표시되는 순서를 더 잘 설계할 계획이다.

이 목표를 염두에 두고 2018년 1월에 질문한 질문에 초점을 맞춘 질문을 아래에 작성한다. '

<br>
두 개의 열이 있는 테이블을 반환하여라. 

- **q_id** : the ID of the question
- **time_to_answer** : how long it took (in seconds) for the question to receive an answer
  
~~~py
first_query = """
              SELECT q.id AS q_id,
                  MIN(TIMESTAMP_DIFF(a.creation_date, q.creation_date, SECOND)) as time_to_answer
              FROM `bigquery-public-data.stackoverflow.posts_questions` AS q
                  INNER JOIN `bigquery-public-data.stackoverflow.posts_answers` AS a
              ON q.id = a.parent_id
              WHERE q.creation_date >= '2018-01-01' and q.creation_date < '2018-02-01'
              GROUP BY q_id
              ORDER BY time_to_answer
              """

first_result = client.query(first_query).result().to_dataframe()
print("Percentage of answered questions: %s%%" % \
      (sum(first_result["time_to_answer"].notnull()) / len(first_result) * 100))
print("Number of questions:", len(first_result))
first_result.head()
~~~
<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>q_id</th>
      <th>time_to_answer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>48382183</td>
      <td>-132444692</td>
    </tr>
    <tr>
      <th>1</th>
      <td>48174391</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>48375126</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>48092100</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>48102324</td>
      <td>0</td>
    </tr>
  </tbody>
</table>

<br>

해당 결과를 보고 당신은 질의에 뭔가 문제가 있다고 의심할 것이다. 

조회 결과 2018년 1월 질문의 100%가 답변을 받았다. 하지만 보통 사이트에 있는 질문의 80%만 답변을 받는 사실을 이미 알고 있다. 

총 질문 수를 보면 놀라울 정도로 적다. 표에는최소 150,000개의 질문이 표시될 것으로 예상했다.

이러한 관측치를 고려했을 때, 선택한 JOIN의 유형이 실수로 대답하지 않은 질문을 제외했을 가능성을 생각해볼 수 있다. 

<br>

이제, 코드를 작성해보자. 

**표에 답변되지 않은 질문이 포함됟록 문제를 해결하는데 사용할 JOIN 유형을 파악할 수 있겠는가?** 

~~~py
# Your code here
correct_query = """
                SELECT q.id AS q_id,
                    MIN(TIMESTAMP_DIFF(a.creation_date, q.creation_date, SECOND)) as time_to_answer
                FROM `bigquery-public-data.stackoverflow.posts_questions` AS q
                    LEFT JOIN `bigquery-public-data.stackoverflow.posts_answers` AS a
                ON q.id = a.parent_id
                WHERE q.creation_date >= '2018-01-01' and q.creation_date < '2018-02-01'
                GROUP BY q_id
                ORDER BY time_to_answer
                """

# Run the query, and return a pandas DataFrame
correct_result = client.query(correct_query).result().to_dataframe()
print("Percentage of answered questions: %s%%" % \
      (sum(correct_result["time_to_answer"].notnull()) / len(correct_result) * 100))
print("Number of questions:", len(correct_result))
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>q_id</th>
      <th>time_to_answer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>48217554</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>48362643</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>48184774</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>48187041</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>48342999</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<br>

> Percentage of answered questions: 83.3368387192557%
>
> Number of questions: 161656


<br>

**2) Initial questions and answers, Part 1**

일반적으로 사용자가 stackoverflow 웹 사이트에서 경험하는 초기 경험을 이해하는데 관심이 있다.

<br>

_사용자가 먼저 질문을 하거나 답변을 제공하는 것이 더 일반적인가?_

_가입 후, 사용자가 웹 사이트와 처음 상호작용하는데 얼마나 걸리는가?_

<br>

Query는 세가지 열이 있는 테이블로 반환하라. 
- **owner_user_id** : the user ID
- **q_creation_date** : the first time the user asked a question
- **a_creation_date** : the first time the user contributed an answer

<br>

질문을 했지만 아직 답변을 제공하지 않은 사용자를 계속 추적하려고 한다. 

또한 표에는 질문에 대답했지만 아직 자신의 질문을 제기하지 않은 사용자도 포함되어야 한다.

이를 염두에 두고 적절한 JOIN(즉, INAL, LEFT, RIGHT 또는 FULL)을 입력하여 올바른 정보를 반환하라.

~~~py
# Your code here
q_and_a_query = """
                SELECT q.owner_user_id AS owner_user_id,
                    MIN(q.creation_date) AS q_creation_date,
                    MIN(a.creation_date) AS a_creation_date
                FROM `bigquery-public-data.stackoverflow.posts_questions` AS q
                    FULL JOIN `bigquery-public-data.stackoverflow.posts_answers` AS a
                ON q.owner_user_id = a.owner_user_id 
                WHERE q.creation_date >= '2019-01-01' AND q.creation_date < '2019-02-01' 
                    AND a.creation_date >= '2019-01-01' AND a.creation_date < '2019-02-01'
                GROUP BY owner_user_id
                """
~~~
<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>owner_user_id</th>
      <th>q_creation_date</th>
      <th>a_creation_date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>802365</td>
      <td>2019-01-22 08:53:29.047000+00:00</td>
      <td>2019-01-08 11:35:38.670000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10946476</td>
      <td>2019-01-22 22:35:42.887000+00:00</td>
      <td>2019-01-23 00:25:41.097000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>265791</td>
      <td>2019-01-25 00:25:11.883000+00:00</td>
      <td>2019-01-30 15:54:41.510000+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6748184</td>
      <td>2019-01-29 08:04:20.633000+00:00</td>
      <td>2019-01-29 08:04:20.633000+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5705247</td>
      <td>2019-01-05 07:33:26.467000+00:00</td>
      <td>2019-01-06 08:30:18.300000+00:00</td>
    </tr>
  </tbody>
</table>

<br>

**3) Initial questions and answers, Part 2**

이번에는 좀 더 현실적이고 복잡한 시나리오를 다루게 될 것이다. 

이 질문에 답하기 위해서는 세 개의 다른 테이블의 정보를 가져와야 한다. 

해당 구문은 두 테이블만 결합하는 경우와 매우 유사하다. 

_아래의 세 개의 표를 고려하라_

![three tables](https://i.imgur.com/OyhYtD1.png)

우리는 두 개의 서로 다른 JOIN을 사용하여 세 테이블의 정보를 하나의 QUERY로 나열할 수 있다.

![double join](https://i.imgur.com/G6buS7P.png)

~~~ PY
# Your code here
three_tables_query = """
                     SELECT u.id AS id,
                         MIN(q.creation_date) AS q_creation_date,
                         MIN(a.creation_date) AS a_creation_date
                     FROM `bigquery-public-data.stackoverflow.users` AS u
                         LEFT JOIN `bigquery-public-data.stackoverflow.posts_answers` AS a
                             ON u.id = a.owner_user_id
                         LEFT JOIN `bigquery-public-data.stackoverflow.posts_questions` AS q
                             ON q.owner_user_id = u.id
                     WHERE u.creation_date >= '2019-01-01' and u.creation_date < '2019-02-01'
                     GROUP BY id
                    """
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>q_creation_date</th>
      <th>a_creation_date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10947070</td>
      <td>2019-02-03 02:23:15.153000+00:00</td>
      <td>2019-01-21 21:45:14.493000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10949453</td>
      <td>2019-02-02 20:15:29.867000+00:00</td>
      <td>2019-02-09 18:18:08.783000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10855335</td>
      <td>NaT</td>
      <td>NaT</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10871447</td>
      <td>NaT</td>
      <td>NaT</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10929856</td>
      <td>NaT</td>
      <td>NaT</td>
    </tr>
  </tbody>
</table>

<br>

**4) How many distinct users posted on January 1, 2019?**

In the code cell below, write a query that returns a table with a single column:

- owner_user_id - the IDs of all users who posted at least one question or answer on January 1, 2019. Each user ID should appear at most once.


In the posts_questions (and posts_answers) tables, you can get the ID of the original poster from the owner_user_id column. Likewise, the date of the original posting can be found in the creation_date column.

In order for your answer to be marked correct, your query must use a UNION.

~~~ py
# Your code here
all_users_query = """
                  SELECT q.owner_user_id 
                  FROM `bigquery-public-data.stackoverflow.posts_questions` AS q
                  WHERE EXTRACT(DATE FROM q.creation_date) = '2019-01-01'
                  UNION DISTINCT
                  SELECT a.owner_user_id
                  FROM `bigquery-public-data.stackoverflow.posts_answers` AS a
                  WHERE EXTRACT(DATE FROM a.creation_date) = '2019-01-01'
                  """
~~~

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>owner_user_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>4934409.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4984963.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10443903.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10855350.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10854542.0</td>
    </tr>
  </tbody>
</table>

---
