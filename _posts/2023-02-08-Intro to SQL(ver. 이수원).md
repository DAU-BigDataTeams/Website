---
title: Kaggle로 시작하는 SQL 기초
layout: post   
categories : python, SQL, Bigdata, Database, kaggle
image : /assets/img/수료증/이수원-IntroSQL수료증.png
description: 구조화된 질의어(SQL)는 데이터베이스와 함께 사용되는 프로그래밍 언어이며 모든 데이터 과학자에게 중요한 기술이다. 
customexcerpt: 
---

> 작성자 : 이수원

# ****Intro to SQL****

Kaggle의 Intro to SQL 과정을 학습하면서, 실습과 강의 자료를 정리한 POST 입니다. 

[여기](https://www.kaggle.com/learn/intro-to-sql)를 참고하세요.

## 1) ****Getting Started With SQL and BigQuery****

Learn the workflow for handling big datasets with BigQuery and SQL

### ****Introduction****

구조화된 질의어(SQL)는 데이터베이스와 함께 사용되는 프로그래밍 언어이며 모든 데이터 과학자에게 중요한 기술이다. 

이 과정에서는 대용량 데이터 셋에 SQL을 적용할 수 있는 웹 서비스인 BigQuery를 사용하여 SQL 기술을 구축한다.

이 과정에서는 BigQuery 데이터 셋에 액세스하고 검사하는 기본 사항에 대해 알아본다. 

이러한 기본 사항을 숙지한 후 SQL 기술을 구축하기 위해보자. 



<aside>
💡

    SQL(structured query language) : 데이터베이스를 사용할 때, 데이터베이스에 접근할 수 있는 데이터베이스 하부 언어를 말한다.

</aside>


### ****Your first BigQuery commands****

BigQuery를 사용하려면 아래 py 패키지를 가져와야 한다. 아래 코드를 참고하자.


~~~py
from google.cloud import bigquery
~~~


작업 단계의 ****첫 번째 단계는 클라이언트 개체를 만드는 것이다. 

곧 알게 되겠지만, 이 클라이언트 개체는 BigQuery 데이터 셋에서 정보를 검색하는 데 핵심적인 역할을 할 것이다.


~~~py
# Create a "Client" object
client = bigquery.Client()
~~~


Kaggle에서는 컴퓨터 과학과 사이버 보안 뉴스에 초점을 맞춘 웹사이트인 해커 뉴스의 게시물 데이터 셋으로 작업하는 것을 예시로 든다. 

BigQuery에서 각 데이터 세트는 해당 프로젝트에 포함된다. 이 경우 hacker_news 데이터 세트는 bigquery-public-data 프로젝트에 포함된다. 

데이터 집합에 액세스하려면 다음과 같이 작성한다.

- 먼저 `dataset()` 메소드로 데이터 셋에 대한 참조를 구성한다.


- 그런 다음 방금 구성한 참조와 함께 `get_dataset()` 메소드를 사용하여 데이터 셋을 가져온다.


~~~py
# Construct a reference to the "hacker_news" dataset
dataset_ref = client.dataset("hacker_news", project="bigquery-public-data")

# API request - fetch the dataset
dataset = client.get_dataset(dataset_ref)
~~~


모든 데이터 셋은 테이블의 모음일 뿐이다.

데이터 집합을 행과 열로 구성된 여러 테이블이 포함된 스프레드 시트 파일로 생각해도 된다. `list_tables()` 메소드를 사용하여 데이터 집합의 테이블을 나열할 수 있다. 



~~~py
# List all the tables in the "hacker_news" dataset
tables = list(client.list_tables(dataset))

# Print names of all tables in the dataset (there are four!)
for table in tables:  
    print(table.table_id)
~~~

~~~
comments
full
full_201510
stories
~~~



데이터 셋을 가져온 방법과 유사하게 테이블을 가져올 수 있다. 

이제 hacker_news 데이터 셋의 전체 테이블을 가져와 보자.


~~~py
# Construct a reference to the "full" table
table_ref = dataset_ref.table("full")

# API request - fetch the table
table = client.get_table(table_ref)
~~~


## ****Table schema****

테이블의 구조를 스키마라고 한다. 우리가 원하는 데이터를 효과적으로 끌어내기 위해서는 테이블의 스키마를 이해해야 한다.

위 예시에 대한 전체 테이블을 출력해보자. 


~~~py
# Print information on all the columns in the "full" table in the "hacker_news" dataset
table.schema
~~~


~~~
[SchemaField('title', 'STRING', 'NULLABLE', 'Story title', (), None),
 SchemaField('url', 'STRING', 'NULLABLE', 'Story url', (), None),
 SchemaField('text', 'STRING', 'NULLABLE', 'Story or comment text', (), None),
 SchemaField('dead', 'BOOLEAN', 'NULLABLE', 'Is dead?', (), None),
 SchemaField('by', 'STRING', 'NULLABLE', "The username of the item's author.", (), None),
 SchemaField('score', 'INTEGER', 'NULLABLE', 'Story score', (), None),
 SchemaField('time', 'INTEGER', 'NULLABLE', 'Unix time', (), None),
 SchemaField('timestamp', 'TIMESTAMP', 'NULLABLE', 'Timestamp for the unix time', (), None),
 SchemaField('type', 'STRING', 'NULLABLE', 'Type of details (comment, comment_ranking, poll, story, job, pollopt)', (), None),
 SchemaField('id', 'INTEGER', 'NULLABLE', "The item's unique id.", (), None),
 SchemaField('parent', 'INTEGER', 'NULLABLE', 'Parent comment ID', (), None),
 SchemaField('descendants', 'INTEGER', 'NULLABLE', 'Number of story or poll descendants', (), None),
 SchemaField('ranking', 'INTEGER', 'NULLABLE', 'Comment ranking', (), None),
 SchemaField('deleted', 'BOOLEAN', 'NULLABLE', 'Is deleted?', (), None)]
~~~


각 **SchemaField**는 특정 열(필드라고도 함)에 대해 알려준다.

- 열의 이름이다.
- 열의 필드 유형(또는 데이터 유형)이다.
- 열의 모드(’NULLable’은 열에서 NULL 값을 허용하며, 기본 값임을 의미한다.)
- 해당 열의 데이터에 대한 설명이다.

예시로, 첫 번째 SchemaField를 분석해보자. 

**SchemaField('by', 'string', 'NULLABLE', "The username of the item's author.",())**

1. 필드(또는 열)를 호출한다.
2. 해당 필드의 데이터 유형이 ‘문자열’이라는 것을 알 수 있다. 
3. NULL 값이 허용된다.
4. 각 항목의 작성자에 해당하는 사용자 이름을 포함하는 필드이다. 

`list_rows()`메소드를 사용하면, 

전체 테이블의 처음 다섯 줄만 검사하여 올바른지 아닌지를 확인할 수 있다. 

*때로는 데이터베이스에 오래된 설명이 있는 경우가 있기 때문에 검사하는 것이 좋다.* 

`to_dataframe()` 개체를 반환한다.



~~~py
# Preview the first five lines of the "full" table
client.list_rows(table, max_results=5).to_dataframe()
~~~


`/opt/conda/lib/py3.7/site-packages/ipykernel_launcher.py:2: UserWarning: Cannot use bqstorage_client if max_results is set, reverting to fetching data with the tabledata.list endpoint.`


`list_rows()` 메소드를 사용하면 특정 열의 정보만 볼 수 있다. 

예를 들어, 기준 열의 처음 5개 항목을 보려고 한다고 가정해보자. 

~~~py
# Preview the first five entries in the "by" column of the "full" table
client.list_rows(table, selected_fields=table.schema[:1], max_results=5).to_dataframe()
~~~


`/opt/conda/lib/py3.7/site-packages/ipykernel_launcher.py:2: UserWarning: Cannot use bqstorage_client if max_results is set, reverting to fetching data with the tabledata.list endpoint.`

## 2) ****Select, From & Where****

The foundational compontents for all SQL queries.

### ****Introduction****

이제 데이터 셋에 액세스하고 데이터 셋을 검사하는 방법을 알았으므로 첫 번째 SQL 쿼리를 작성할 준비가 되었다. 곧 배우게 될 것이지만, SQL 쿼리문을 사용하면 대규모 데이터 세트를 정렬하여 필요한 정보만 검색할 수 있다. 

먼저 **SELECT, FROM** 및 **WHERE** 키워드를 사용하여, 지정한 조건에 따라 특정 열에서 데이터를 가져올 것이다. *명확성을 위해 우리는 pets라고 불리는 하나의 테이블만 포함하는 작은 예시 데이터 셋인 pet_records로 작업한다.* 

![2-1](/assets/img/Intro-to-SQL/2-1.png)  
### ****SELECT ... FROM****

가장 기본적인 SQL 조회는 단일 테이블에서 단일 열을 선택하는 것이다. 

키워드 SELECT 뒤에 원하는 열을 지정한 다음, FROM 뒤에 특정 테이블을 지정한다. 

예를 들어, bigquery-public-data 프로젝트의 pet_records 데이터베이스에 있는 pets 테이블에서 ‘Name’열을 선택하면 쿼리가 다음과 같이 작성될 수 있다. 

![2-1](/assets/img/Intro-to-SQL/2-2.png)  

*SQL Query문을 작성할 때, FROM에 전달하는 인수는 단일 또는 이중 따옴표(’ 또는 “)가 아니다. 백틱(`)임을 주의하자.* 

### ****WHERE ...****

BigQuery 데이터 셋은 크기가 크기 때문에 일반적으로 특정 조건을 충족하는 행만 반환힌다. WHERE 절을 사용하여 해당 작업을 편하게 진행할 수 있다. 

예를 들어, 아래 쿼리문은 동물 열에서 ‘Cat’이라는 텍스트가 있는 행에 있는 이름 열의 항목을 반환한다.

![2-3](/assets/img/Intro-to-SQL/2-3.png)  

[여기](https://www.kaggle.com/code/dansbecker/select-from-where)를 눌러 들어가면 더 자세한 예시와 쿼리문이 있으니 참조하자. 

## 3) ****Group By, Having & Count****

Get more interesting insights directly from your SQL queries.

### ****Introduction****

이제 가공되지 않은 데이터를 선택할 수 있을 것이다. 지금부터는 데이터를 그룹화 하고 해당 그룹 내에서 항목을 계산하는 방법을 배울 것이다. 

예를 들어, ‘과일 가게는 과일 종류 별로 몇개씩 팔았는가?’, ‘수의사 사무실에서 치료한 동물의 종류는 몇 종인가?. 이러한 질문에 대한 결과를 도출하기 위해서는 **GROUP BY, HAVING** 및 **COUNT()**의 세 가지 새로운 기술을 알아야 한다. 2번 과정에서 사용했던 애완동물에 대한 구성된 표를 다시 사용하여 설명을 진행한다. 

### ****COUNT()****

COUNT()는 이름에서부터 어떤 메소드인지 알 수 있다. COUNT() 메소드는 여러 가지를 반환한다0. 열 이름을 전달하면 해당 열의 항목 수가 반환된다.

예를 들어, 애완동물 테이블에서 ID 열의 COUNT()를 선택하게 되면, 테이블에는 4개의 ID가 있기 때문에 4라는 숫자를 반환할 것이다.

![3-1](/assets/img/Intro-to-SQL/3-1.png)    

COUNT()는 많은 값을 가져와서 하나를 반환하는 집계 함수의 예다. *(다른 집계 함수의 예로는 SUM(), AVG(), MIN(), MAX() 등이 있다. 위 그림에서 알 수 있듯이 집계 함수는 테이블 내용과 관련없는 이상한 열 이름(예: f0_)을 도입한다. 해당 강의의 뒷 부분에서 이름에 관해서 더 설명적인 것으로 진행한다. )*

### ****GROUP BY ... HAVING****

HAVING은 GROUP BY와 함께 특정 기준을 충족하지 않는 그룹을 무시하는 데 사용된다.

예를 들어, 아래 쿼리에는 두 개 이상의 ID가 있는 그룹만 포함한다.

![3-2](/assets/img/Intro-to-SQL/3-2.png)   

하나의 그룹만 지정된 조건을 충족하므로 쿼리는 행이 하나인 테이블을 반환하게 된다.

*더 자세한 예시와 설명은 [여기](https://www.kaggle.com/code/dansbecker/group-by-having-count)을 참고하자.* 

### ****Note on using GROUP BY****

COUNT()와 같은 집계 함수를 적용하는 방법을 SQL에 알려주기 때문에 집계 함수 없이 GROUP BY를 사용하는 것은 의미가 없다. 마찬가지로, GROUP BY 절이 있으면 모든 변수가 다음 중 하나로 전달되어야 한다.

1. **GROUP BY** 명령을 사용하거나,
2. 집계 함수를 사용한다. 

아래 쿼리를 참고하자.

~~~py
query_good = """
             SELECT parent, COUNT(id)
             FROM `bigquery-public-data.hacker_news.comments`
             GROUP BY parent
             """
~~~

Note that there are two variables: `parent` and `id`.

- `parent` was passed to a **GROUP BY** command (in `GROUP BY parent`), and
- `id` was passed to an aggregate function (in `COUNT(id)`).

And this query won't work, because the `author` column isn't passed to an aggregate function or a **GROUP BY** clause:

만약, 아래와 같은 쿼리를 작성하게 되면 ERROR가 발생할 것이다. 

~~~py
query_bad = """
            SELECT author, parent, COUNT(id)
            FROM `bigquery-public-data.hacker_news.comments`
            GROUP BY parent
            """
~~~

해당 오류는 그룹화도, 집계 함수도 사용되지 않은 열 이름인 ‘author’을 사용했기 때문에 발생한다.

이런 경우, 해당 부분에 SELECT list expression references 열(열 이름) 오류 메시지가 표시된다.

## 4) ****Order By****

Order your results to focus on the most important data for your use case.

가장 중요한 데이터에 초점을 맞추도록 결과를 정렬한다.

### ****Introduction****

지금까지 여러 SQL문을 사용하는 방법을 배웠다. SELECT문을 사용해서 특정 열을 가져오는 방법과 지정된 기준을 충족하는 행을 가져오는 WHERE문 등이 있다. 또한 COUNT()와 같은 집계 함수를 GROUP BY()와 함께 사용하여 여러 행을 단일 그룹으로 처리 하는 방법도 알았다. 

이제 ORDER BY()문을 사용하여 결과 순서를 변경하는 방법에 대해 알아보자. 

예로는 날씨에 순서를 적용하여 일반적인 활용 사례를 알아볼 것이다. 또 이번 강의에서는 학습할 내용을 설명하기 위해, 앞서 설명했던 애완동물 테이블을 약간 수정된 버전을 사용할 것이다. 

![4-1](/assets/img/Intro-to-SQL/4-1.png)  
### ****ORDER BY****

ORDER BY()는 일반적으로 쿼리의 마지막 절에 작성되며, 쿼리의 나머지 부분에서 반환 된 결과를 정렬한다.

행은 ID 열에 따라 정렬되지 않는다. 아래의 쿼리문을 통해 문제를 해결해보자.

![4-2](/assets/img/Intro-to-SQL/4-2.png)  

ORDER BY()문은 결과가 알파벳 순서로 표시되는 텍스트가 포함된 열에 대해서도 작동한다.

![4-3](/assets/img/Intro-to-SQL/4-3.png)  
DESC 인수(”하강”의 줄임말)를 사용하여 순서를 거꾸로 할 수도 있다. 

아래 쿼리문은 동물 열을 기준으로 표를 정렬하며, 여기서 알파벳 순서로 마지막에 있는 값이 먼저 반환이 된다. 

![4-3](/assets/img/Intro-to-SQL/4-7.png)  

### Dates

다음으로, 날짜에 대해 알아보자. 날짜는 실제 데이터베이스에서 자주 볼 수 있는 데이터다. 

~~~py
YYYY-[M]M-[D]D
~~~

BigQuery에는 두 가지 유형으로 날짜를 **DATE** 또는 **DATETIME**으로 데이터 유형을 저장할 수 있다. 

- DATE 형식은 연도,  월, 일 순으로 표시된다.
    - `YYYY`: Four-digit year
    - `[M]M`: One or two digit month
    - `[D]D`: One or two digit day
- DATETIME 형식은 날짜 형식과 비슷하지만 끝에 시간이 추가된다.

### EXTRACT | 압축 풀기

데이트를 보다 보면, 종종 날짜의 일부(예: 연도 또는 일)를 확인할 수 있다. EXTRACT를 사용하여 이 작업을 수행할 수 있다. 이를 pets_with_date라는 다른 테이블로 설명을 진행한다.

![4-4](/assets/img/Intro-to-SQL/4-4.png)  

아래 쿼리문은 두 개의 열을 반환한다. 여기서 DAY 열에는 pets_with_date 테이블의 Date 열이 각 항복에 해당하는 날짜가 포함된다. 

![4-5](/assets/img/Intro-to-SQL/4-5.png)  

SQL은 날짜에 대해 매우 영리하며, 단순히 셀의 일부를 추출하는 것 이상의 정보를 요청할 수 있다. 예를 들어, 아래 쿼리는 날짜 열에 있는 각 날짜에 대해 1과 53 사이의 주만 있는 한 열을 반환한다.

![4-6](/assets/img/Intro-to-SQL/4-6.png)  

더 자세한 예제와 설명은 [여기](https://www.kaggle.com/code/dansbecker/order-by)을 참고하세요.

## 5) ****As & With****

Organize your query for better readability. This becomes especially important for complex queries.

읽기 쉽도록 쿼리문을 조직한다. 이는 복잡한 쿼리문의 경우에 더욱 중요하다.

### ****Introduction****

지금까지 배운 Query문으로 인해, SQL Query문이 길어지고 복잡해지고 있다는 것을 깨달았을 것이다. 때문에 SQL Query를 이해하기 어려울 수도 있다. 

AS와 WITH를 사용하면 Query를 정리하고 읽기 쉽게 만들 수 있다. 이번 강의에서는 이를 배울 것이다.  이번에도 앞선 예시인 애완동물 테이블을 사용할 것이지만, 이번에는 동물들의 나이를 포함해서 진행을 할 것이다. 

![5-1](/assets/img/Intro-to-SQL/5-1.png)  

### ****AS****

이전 강의에서 AS를 사용해 Query에 의해 생성된 열의 이름을 바꾸는 방법에 대해 배웠었다. 이를 별칭 또는 별명이라고도 부른다. Pandas에서 pandas를 pd로, seaborn을 sns로 호출하는 방식과 동일하다.

SQL에서 AS를 사용하려면, 선택한 열 바로 뒤에 AS를 삽입해야 한다. 다음은 AS문이 없는 Query문의 예시이다.

![5-2](/assets/img/Intro-to-SQL/5-2.png)  

다음은 간단하게 AS문을 작성한 예시이다.

![5-3](/assets/img/Intro-to-SQL/5-3.png)  

이러한 쿼리는 동일한 정보를 반환하지만, 두 번째 쿼리에서 COUNT() 함수가 반환하는 열은 기본 이름인 f0__가 아닌 Number라고 지정한 것이다.

### ****WITH ... AS****

AS는 자체적으로 Query에서 반환 된 데이터를 정리하는 편리한 방법이다. 이는 “common table expression(공통 테이블 표현식)”이라고 하는 WITH와 결합했을 때 더욱 강력한 기능이 된다. 

공통 테이블 표현식(또는 CTE)은 Query 내에서 반환하는 임시 테이블이다. CTE는 Query를 읽을 수 있는 덩어리로 분할하는데 유용하며, 이 덩어리 대해 Query를 작성할 수 있다. 

CTEs are helpful for splitting your queries into readable chunks, and you can write queries against them.

예를 들어, 애완동물 표를 사용하여, 가장 나이가 많은 동물에 대해 질문을 할 수 있다. 따라서 다음과 같이 5년 이상 된 동물에 대한 정보만 포함하는 CTE를 만드는 것을 시작해보자.

![5-4](/assets/img/Intro-to-SQL/5-4.png)  

위의 예시는 불완전한 Query문으로, 아무것도 반환하지 않지만 나머지 Query를 실행하는 동안 CTE를 생성한다. 

![5-5](/assets/img/Intro-to-SQL/5-5.png)  

CTE 없이도 해당 작업을 수행할 수는 있다. 하지만 이 작업이 매우 긴 Query문의 첫 번째 부분이라면 CTE를 제거하는 것이 훨씬 더 수행하기 어려울 수도 있다. 

또한 CTE는 사용자가 생성한 query문 내부에만 존재하며, 이후 query에서는 참조할 수 없다. 따라서 CTE를 사용하는 쿼리는 항상 두 부분으로 나뉜다. 

1. 먼저 CTE를 만들고,
2. CTE를 사용하는 Query를 작성한다. 

*더 자세한 예제와 설명은 [여기](https://www.kaggle.com/code/dansbecker/as-with)를 참고해주세요.*

## 6) ****Joining Data****

Combine data sources. Critical for almost all real-world data problems

데이터 소스를 결합한다. 거의 모든 실제 데이터 문제에서 결합은 중요하다.

### ****Introduction****

원하는 형식으로 단일 테이블에서 데이터를 가져올 수 있는 도구가 있다. 하지만 원하는 데이터가 여러 테이블에 분산 되어 있다면 어떻게 하시겠는가?

정답은 JOIN에 있다. JOIN은 실제 SQL 작업 과정에서 매우 중요하다. 

# **Example**

We'll use our imaginary `pets` table, which has three columns:

- `ID` - ID number for the pet
- `Name` - name of the pet
- `Animal` - type of animal

We'll also add another table, called `owners`. This table also has three columns:

- `ID` - ID number for the owner (different from the ID number for the pet)
- `Name` - name of the owner
- `Pet_ID` - ID number for the pet that belongs to the owner (which matches the ID number for the pet in the `pets` table)

![6-1](/assets/img/Intro-to-SQL/6-1.png)  

특정 애완동물에게 적용되는 정보를 얻기 위해서는 애완동물 테이블의 Pet_ID 열을 소유자 테이블에 일치 시켜야 한다. 

![6-2](/assets/img/Intro-to-SQL/6-2.png)  

예를 들어, 

- the `pets` table shows that Dr. Harris Bonkers is the pet with ID 1.
- The `owners` table shows that Aubrey Little is the owner of the pet with ID 1.

Putting these two facts together, Dr. Harris Bonkers is owned by Aubrey Little.

이 사실들을 종합해보면, 해리스 본커스 박사는 오브리 리틀의 소유자이다. 

Fortunately, we don't have to do this by hand to figure out which owner goes with which pet. In the next section, you'll learn how to use **JOIN** to create a new table combining information from the `pets` and `owners` tables.

다행히도, 우리는 어떤 주인이 어떤 애완동물과 함께 가는지 알아내기 위해 일일이 손으로 할 필요가 없다는 것이다. 다음 과정에서 JOIN을 사용하여 애완동물 및 소유자 테이블의 정보를 결합한 새 테이블을 만드는 방법에 대해 알아볼 것이다. 

### ****JOIN****

Using **JOIN**, we can write a query to create a table with just two columns: the name of the pet and the name of the owner.

JOIN을 사용하여 애완동물의 이름과 주인의 이름이라는 두 개의 열로 표를 만드는 Query를 작성할 수 있다. 

![6-3](/assets/img/Intro-to-SQL/6-3.png)  
애완동물 테이블의 열이 Pet_ID와 소유자 테이블의 ID이 일치하는 행을 일치 시켜 두 테이블의 정보를 결합한다. 쿼리에서 ON은 각 테이블에서 테이블을 결합하는 데 사용할 열을 결정한다. ID 열은 두 테이블에 모두 있으므로 어떤 열을 사용해야 하는지 명확히 해야 한다. p.ID를 사용하여, 애완동물 테이블의 ID 열을 참조한다. 그리고 o.PET_ID는 소유자 테이블의 ID를 참조한다. 

일반적으로 테이블을 결합할 때는 각 열이 어느 테이블에서 왔는지를 지정하는 것이 좋다. 이렇게 하면 QUERY를 읽기 쉽고, 돌아갈 때마다 스키마를 끌어 올릴 필요가 없다. 

이번 강의에서 사용하는 JOIN은 INER JOIN이라고 한다. 즉, 행을 결합하는데 사용하는 열의 값이 JOIN 중인 두 테이블에 모두 표시되는 경우에만 행이 최종 출력 테이블에 입력된다. 예를 들어, Tom의 ID 번호가 4가 애완동물 테이블에 없는 경우, 이 QUERY에서 3개의 행만 반환이 된다. JOIN의 종류는 여러가지가 있지만, INER JOIN은 흔히 사용되기 때문에 처음 배울 때 좋다. 

*더 자세한 예제와 설명은 [여기](https://www.kaggle.com/code/dansbecker/joining-data) 참고하세요.*

# 해당 POST는 Kaggle 강의 중 'Intro to SQL' 과정의 해석본과 다름 없습니다. 


### 정확한 자료와 실습을 위하여, [Kaggle](https://www.kaggle.com/learn/intro-to-sql)의 해당 강의를 수강하는 것을 추천합니다. 

### [작성자의 Notion](https://www.notion.so/Intro-to-SQL-6afd87c147234a2e8ea3d4efbff15f41)에 강의 자료와 실습 풀이 내용이 정리되어 있습니다. 


![수료증](/assets/img/수료증/이수원-IntroSQL수료증.png)