---
title: Kaggle로 SQL에 대해 더 깊이 배워보자!
layout: post
description: Kaggle로 SQL에 대해 더 깊이 배워보자!
categories: [kaggle]
image: /assets/img/수료증/정소영-Advanced-SQL수료증.png
customexcerpt: SQL에 대해 복잡하고 고급 기능을 활용하여 데이터를 쿼리하고 조작하는 것에 대해 학습합니다.
---

<span class = "alert g"> 작성자 : 정소영</span>

* random line to make it work. This will be removed.
{:toc}


# JOIN and UNIONs 
## Introduction
UNIX를 사용하여 여러 테이블에서 정보를 가져오는 방법과 함께 몇 가지 더 많은 유형의 JOIN에 대해 알아보겠습니다.  
owners table (ID, Name Age, Pet_ID)  
- 각 행은 서로 다른 애완동물 소유자를 식별(ID 열은 고유 식별자입니다.)
- Pet_ID열에는 소유자에게 속한 애완동물의 ID가 포함되어 있습니다.(pets table의 애완동물의 ID와 일치합니다.)  

pets table (ID, Name, Age, Animal)  

![owners-table, pets-table](/assets/img/Advanced-SQL/sql1.png)


## JOINs
~~~py
query = """
        SELECT o.Name AS Owner_Name, p.Name AS Pet_Name
        FROM `bigquery-public-data.pet_records.owners` AS o
        INNER JOIN `bigquery-public-data.pet_records.pets` AS p
                ON p.ID = o.Pet_ID
        """

~~~
![INNER-JOIN](/assets/img/Advanced-SQL/sql2.png)  

INNER JOIN을 사용하여 두 테이블 모두에서 Pet_의 값이 있는 행을 가져올 수 있습니다.  
owners 테이블의 ID 열이 pets 테이블의 ID 열과 일치합니다.  
  
다른 유형의 JOIN을 사용하는 경우
 - 주인이 있든 없든 상관없이 모든 애완동물이 포함된 테이블을 만들고 싶을때
 - 두 테이블의 모든 행을 결합하려고 할 때  

owners 테이블의 모든 행을 포함하는 테이블을 만들경우 : LEFT JOIN 사용  
왼쪽은 쿼리에서 JOIN 앞에 나타나는 테이블을 말합니다.  
(오른쪽은 JOIN 뒤에 있는 테이블을 말합니다.)

~~~py
`bigquery-public-data.pet_records.owners`AS o INNER JOIN `biggquery-public-data.pet_records.pets` AS p

#INNER JOIN을 LEFT JOIN으로 바꾸면 두 테이블에 일치하는 항목이 있는 모든 행과 왼쪽 테이블의 모든 행(일치 여부에 관계없이)이 반환됩니다. 

#대신 RIGHT JOIN을 사용하면 일치하는 행이 오른쪽 테이블의 모든 행과 함께 표시됩니다.(일치 여부에 관계없이)
~~~
FULL JOIN은 두 테이블의 모든 행을 반환합니다.  
일반적으로 두 테이블 모두에서 일치하지 않는 행에는 결측값에 대한 NULL 항목이 있습니다.  

![INNER-JOIN, LEFT-JOIN, FULL-JOIN](/assets/img/Advanced-SQL/sql3.png)

## UNIONs
JOIN은 서로 다른 테이블의 결과를 수평적으로 결합합니다.  
대신 열을 수직으로 연결하려는 경우 UNIX를 사용하여 연결할 수 있습니다.

~~~py
query = """
        SELECT Age FROM `bigquery-public-data.pet_recods.pets`
        UNION ALL
        SELECT Age FROM `bigquery-public-data.pet_records.owners`
        """

#두 테이블의 연령 열을 결합한 것입니다.
~~~
![UNION](/assets/img/Advanced-SQL/sql4.png)  

UNION을 사용하는 경우 두 열의 데이터 유형은 동일해야 하지만 열 이름은 다를 수 있습니다.  
따라서 owners 테이블에서는 UNION of Age 열을,  
pets 테이블에서는 Pet_Name 열을 가져올 수 없습니다.  
중복된 값을 포함하기 위해 UNION ALL을 사용합니다.  
owners 테이블과 pets 테이블 둘다에 존재하는 경우 연결된 결과에 두 번 표시됩니다.  
중복 값을 삭제하려면 쿼리에서 UNION ALL을 UNION DISTINCT로 변경하기만 하면 됩니다.

# Analytic Functions
## Introduction
Intro to SQL에서는 행 집합을 기반으로 계산을 수행하는 집계 함수를 사용하는 방법을 배웠습니다.  
이제부터는 일련의 행에서도 작동하는 분석 기능을 정의하는 방법에 대해 알아봅니다.  
하지만 집계 함수와 달리 분석 함수는 원래 테이블의 각 행에 대해 (잠재적으로 다른) 값을 반환합니다.  
분석 기능을 사용하면 비교적 간단한 구문으로 복잡한 계산을 수행할 수 있습니다.  (이동 평균과 실행 총계 등을 신속하게 계산할 수 있습니다.)

## Syntax

~~~py
query = """
        SELECT *,
           AVG(time) OVER(
                            PARTITION BY id
                            ORDER BY date
                            ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
                            ) as avg_time
        FROM `bigquery-public-data.runners.train_time`
        """

#ID 열은 각 주자를 식별, 날짜열은 교육 세션의 날짜, 시간은 해당 주자의 교육시간(분)을 표시합니다.

#각 주자에 대한 교육 시간의 이동 평균을 계산한 것입니다.
~~~
![Syntax](/assets/img/Advanced-SQL/sql5.png)  

모든 분석 함수에는 각 계산에 사용되는 행 집합을 정의하는 OVER 절이 있습니다.  
OVER 절에는 세 부분(선택 사항)이 있습니다.  
- PARTITION BY 절은 테이블의 행을 여러 그룹으로 나눕니다.  
(위 쿼리에서는 id로 나누어 계산을 러너별로 구분합니다.)
- ORDER BY 절은 각 파티션 내의 순서를 정의합니다.  
(위 쿼리에서 날짜 열을 기준으로 정렬하면 이전 교육 세션이 먼저 나타납니다.)
- window frame은 마지막 절(1 이전 행과 현재 행 사이의 행) 입니다.  
각 계산에 사용되는 행 집합을 식별합니다.  
이 행 그룹을 window이라고 할 수 있습니다.  (실제로 분석 함수는  analytic window functions 또는 단순하게 window functions라고 부르기도 합니다.)  

![PARTITION-BY, ORDER-BY, AVG](/assets/img/Advanced-SQL/sql6.png)  

## (More on)window frame clauses
window frame절을 작성하는 방법은 여러 가지가 있습니다.  
- 이전 행과 현재 행 사이의 행 - 이전 행과 현재 행
- 앞의 3개 행과 뒤의 1개 행 사이의 행 - 앞의 3개 행, 현재 행 및 다음 행
- 경계가 없는 선행 행과 경계가 없는 후속 행 사이의 행 - 파티션의 모든 행  
(이밖에도 다양한 것들이 많이 있습니다.)

## Three types of analytic funtions
BigQuery는 다양한 분석 기능을 지원하며 지금은 몇가지만 살펴보겠습니다.
1. Analytic aggregate functions
 AVG()는 집계 함수입니다.  
 OVER 절은 분석(집계) 함수로 처리되도록 보장합니다.  
 집계 함수는 창의 모든 값을 입력으로 사용하고 단일 값을 반환합니다. 
 - MIN()(또는 MAX()) - 입력 값의 최소값(또는 최대값)을 반환합니다.
 - AVG()(또는 SUM()) - 입력 값의 평균(또는 합)을 반환합니다.
 - COUNT() - 입력의 행 수를 반환합니다.

2. Analytic navigation functions
 (일반적으로) 현재 행과 다른 행의 값을 기준으로 값을 할당합니다.  
 - FIRST_VALUE()(또는 LAST_VALUE()) - 입력의 첫 번째(또는 마지막) 값을 반환합니다.
 - LED()(및 LAG()) - 후속(또는 이전) 행의 값을 반환합니다.

3. Analytic numbering functions
 번호 매기기 함수는 순서에 따라 각 행에 정수 값을 할당합니다.  
 - ROW_NUMBER() - 입력에 행이 나타나는 순서를 반환합니다.(1부터 시작)  
 - RANK() - 순서 열에 동일한 값을 가진 모든 행은 동일한 순위 값을 받습니다.    (여기서 다음 행은 이전 순위 값을 가진 행 수만큼 증가하는 순위 값을 받습니다.)


# Nested and Repeated Data
## Introduction
숫자 유형(정수, 부동 소수점 값), 문자열 및 DATTIME 유형을 포함한 다양한 유형의 데이터로 작업했습니다.  
지금부터는 중첩 및 반복 데이터(nested and repeated data)를 쿼리하는 방법에 대해 알아봅니다.  
BigQuery 데이터셋에서 찾을 수 있는 가장 복잡한 데이터 유형입니다.  
## Nested data
애완동물과 그들의 장난감에 대한 정보를 포함하는 가상의 데이터 세트를 세워보겠습니다.  

![pets_and_toys table](/assets/img/Advanced-SQL/sql7.png)  
  

- 이 정보를 두 개의 다른 테이블(pets 테이블과 toys 테이블)로 구성할 수 있습니다.  
 toys 테이블에는 'Pet_ID'(각 장난감을 소유한 애완동물과 일치시키는 데 사용할 수 있는 ID)열이 들어있습니다.  

- BigQuery의 또 다른 옵션은 pets_and_toys 테이블과 유사하게 모든 정보를 단일 테이블로 구성하는 것입니다.  
 이 경우 toys 테이블의 모든 정보가 하나의 열(pets_and_toys 테이블의 "Toy" 열)로 축소됩니다.  
 pets_and_toys 테이블의 "Toy" 열을 중첩 열이라고 하고,  
 "Name" 및 "Type" 필드가 그 안에 중첩되어 있다고 합니다.
 중첩된 열에는 STRUCT 유형(또는 RECORD 유형)이 있습니다. 이것은 아래 표 스키마에 반영되어 있습니다.

![pets_and_toys table schema](/assets/img/Advanced-SQL/sql8.png) 

 ~~~py
 query = """
        SELECT Name AS Pet_Name,
            Toy.Name AS Toy_Name,
            Toy.Type AS Toy_Type
        FROM `bigquery-public-data.pet_records.pets_and_toys`
        """
 ~~~

![pets_and_toys table schema](/assets/img/Advanced-SQL/sql9.png)

 중첩된 데이터가 있는 열을 쿼리하려면 해당 데이터가 포함된 열에서 각 필드를 식별해야 합니다. 
  Toy.Name은 "Toy" 열의 "Name" 필드를 나타냅니다.  
  Toy.Type은 "Toy" 열의 "Type" 필드를 나타냅니다.

  그렇지 않으면 일반적인 규칙은 그대로 유지됩니다.  
  쿼리에 대한 다른 내용은 변경할 필요가 없습니다.

## Repeated data
![pets_and_toys_type table](/assets/img/Advanced-SQL/sql10.png)  

"Toy" 열에는 각 행에 대해 둘 이상의 값을 허용하므로 반복 데이터가 포함되어 있습니다.  
여기서 "Toy" 열은 'REPEATED'으로 나타납니다.  

![pets_and_toys_type table schema](/assets/img/Advanced-SQL/sql11.png)  


반복되는 필드의 각 항목은 데이터 유형이 동일한 (0개 이상) 값의 정렬된 목록 또는 배열입니다.  

~~~py
query = """
        SELEC Name As Pet_NAme,
                Toy_Type
        FROM `bigquery-public-data.pet_records.pets_and_toys_type`,
            UNNEST(Toys) AS Toy_Type
        """
#반복 데이터를 쿼리할 때는 반복 데이터가 포함된 열의 이름을 UNNEST() 함수 안에 넣어야 합니다.
~~~

![UNNEST](/assets/img/Advanced-SQL/sql12.png)  
이렇게 하면 기본적으로 반복되는 데이터(테이블 오른쪽에 추가됨)가 평평해져 각 행에 하나의 요소가 있게 됩니다.  

## Nested and repeated data
"Toy"열을 중첩 및 반복할 수 있습니다.
- 애완동물들이 여러 개의 장난감을 가질 수 있는 경우
- 각각의 장난감의 이름과 종류를 추적하고 싶은 경우

![more_pets_and_toys table](/assets/img/Advanced-SQL/sql13.png)  

more_pets_and_toys 테이블의 경우 "Name"과 "Type"은 모두 "Toy"에 포함된 필드이며,  
각 항목은 "Toy" 구조에 모두 포함됩니다.  
"Toys.Name"과 "Toys.Type"은 모두 배열입니다.  

![more_pets_and_toys table schema](/assets/img/Advanced-SQL/sql14.png)  

~~~py
query = """
        SELECT Name AS Pet_Name,
                t.Name AS Toy_Name,
                t.Type AS Toy_Type
        FROM `bigquery-public-data.pet_records.more_pets_and_toys`,
            UNNEST(Toys) AS t
        """

#"Toy" 열이 반복되므로 UNNEST() 기능으로 평평하게 합니다.  
#평평한 열에 t의 별칭을 부여하므로 "Toys" 열에 있는 "Name" 및 "Type" 필드를 t로 참조할 수 있습니다.(t.Name, t.Type)
~~~

![UNNEST](/assets/img/Advanced-SQL/sql15.png) 


# Writing Efficient Queries
## Introduction
어떨때는 쿼리가 효율적인지의 여부는 중요하지 않습니다.  
예를 들어, 한 번만 실행할 것으로 예상되는 쿼리를 작성하면 작은 데이터 집합에서 작동할 수 있습니다. 이 경우 필요한 답을 제공하는 것이면 무엇이든 좋습니다.  
  
하지만 웹 사이트에 데이터를 제공하는 쿼리와 같이 여러 번 실행될 쿼리의 경우  
웹 사이트가 로드되기를 기다리는 사용자를 방치하지 않도록 효율적이어야 합니다.  
  
대규모 데이터셋에 대한 쿼리의 경우,  
이들은 속도가 느릴 수 있으며 제대로 작성되지 않으면 기업에 많은 비용이 들 수 있습니다.  
  
대부분의 데이터베이스 시스템에는 쿼리를 가장 효과적인 방법으로 해석/실행하는 쿼리 최적화 프로그램이 있습니다.  
여러 가지 전략을 사용해서  비용을 크게 절감할 수 있는 방법도 있습니다.  

## Some useful funtions

두 가지 기능을 사용하여 서로 다른 쿼리의 효율성을 비교합니다.  
- show_mount_of_data_message는 쿼리에서 사용하는 데이터의 양을 표시합니다.  
- show_time_to_run()은 쿼리가 실행되는 데 걸리는 시간을 출력합니다.  

Kaggle의 공개 데이터 세트 BigQuery 통합 사용합니다.

~~~py
from google.cloud import bigquery
from time import time

client = bigquery.Client()

def show_amount_of_data_scanned(query):
    dry_run_config = bigquery.QueryJobConfig(dry_run=True)
    query_job = client.query(query, job_config=dry_run_config)
    print('Data processed: {} GB'.format(round(query_job.total_bytes_processed / 10**9, 3)))

#dry_run을 통해 쿼리가 실행하지 않고 사용하는 데이터 양을 확인할 수 있습니다.

def show_time_to_run(query):
    time_config = bigquery.QueryJobConfig(use_query_cache=False)
    start = time()
    query_result = client.query(query, job_config=time_config).result()
    end = time()
    print('Time to run: {} seconds'.format(round(end-start, 3)))

~~~

## Strategies

1. Only select the columns you want.(원하는 열만 선택합니다.)  
    SELECT * FROM ...을 사용하여 쿼리를 시작하는 것이 좋습니다.  
    어떤 칼럼이 필요한지 고민할 필요가 없어 편리하지만 매우 비효율적일 수 있습니다.  
    텍스트 필드가 다른 필드보다 큰 경향이 있기 때문에 필요하지 않은 텍스트 필드가 있는 경우 특히 중요합니다.  

~~~py
star_query = "SELECT * FROM `bigquery-public-data.github_repos.contents`"
show_amount_of_data_scanned(star_query)

basic_query = "SELECT size, binary FROM `bigquery-public-data.github_repos.contents`"
show_amount_of_data_scanned(basic_query)

#결과
Data processed: 2623.284 GB
Data processed: 2.466 GB

#원시 데이터에 필요한 필드보다 1000배 큰 텍스트 필드가 포함되어 있기 때문에 쿼리를 완료하기 위해 스캔되는 데이터가 1000배 감소합니다.
~~~

2. Read less data.  
   
~~~py
more_data_query = """
                  SELECT MIN(start_station_name) AS start_station_name,
                      MIN(end_station_name) AS end_station_name,
                      AVG(duration_sec) AS avg_duration_sec
                  FROM `bigquery-public-data.san_francisco.bikeshare_trips`
                  WHERE start_station_id != end_station_id 
                  GROUP BY start_station_id, end_station_id
                  LIMIT 10
                  """
show_amount_of_data_scanned(more_data_query)

less_data_query = """
                  SELECT start_station_name,
                      end_station_name,
                      AVG(duration_sec) AS avg_duration_sec                  
                  FROM `bigquery-public-data.san_francisco.bikeshare_trips`
                  WHERE start_station_name != end_station_name
                  GROUP BY start_station_name, end_station_name
                  LIMIT 10
                  """
show_amount_of_data_scanned(less_data_query)

#결과
Data processed: 0.076 GB
Data processed: 0.06 GB

#역 ID와 역 이름 사이에는 1:1 관계가 있으므로 쿼리에서 start_station_id 및 end_station_id 열을 사용할 필요가 없습니다. 
#역 ID가 있는 열만 사용함으로써 더 적은 데이터를 스캔할 수 있습니다.
~~~

3. Avoid N:N JOINs.  
    이 과정에서 실행한 대부분의 JOIN은 1:1 JOIN이었습니다.  
    이 경우 각 테이블의 각 행에는 다른 테이블의 일치 항목이 하나만 있습니다.  
    ![1:1 JOIN](/assets/img/Advanced-SQL/sql16.png)  

    다른 유형의 JOIN은 N:1 JOIN입니다.  
    여기서 한 테이블의 각 행은 다른 테이블의 여러 행과 일치할 수 있습니다.  
    ![N:1 JOIN](/assets/img/Advanced-SQL/sql17.png)  

    마지막으로, 한 테이블의 행 그룹이 다른 테이블의 행 그룹과 일치할 수 있는 N:N JOIN입니다.  
    일반적으로 다른 모든 것이 동일한 경우, 이 유형의 JOIN은 조인 중인 두 개의 (원래) 테이블보다 더 많은 행을 포함하는 테이블을 생성합니다.  
    ![N:N JOIN](/assets/img/Advanced-SQL/sql18.png) 

    여러 GitHub 저장소에 있는 고유한 커밋 수와 파일 수를 계산합니다.

~~~ py
big_join_query = """
                 SELECT repo,
                     COUNT(DISTINCT c.committer.name) as num_committers,
                     COUNT(DISTINCT f.id) AS num_files
                 FROM `bigquery-public-data.github_repos.commits` AS c,
                     UNNEST(c.repo_name) AS repo
                 INNER JOIN `bigquery-public-data.github_repos.files` AS f
                     ON f.repo_name = repo
                 WHERE f.repo_name IN ( 'tensorflow/tensorflow', 'facebook/react', 'twbs/bootstrap', 'apple/swift', 'Microsoft/vscode', 'torvalds/linux')
                 GROUP BY repo
                 ORDER BY repo
                 """
show_time_to_run(big_join_query)

small_join_query = """
                   WITH commits AS
                   (
                   SELECT COUNT(DISTINCT committer.name) AS num_committers, repo
                   FROM `bigquery-public-data.github_repos.commits`,
                       UNNEST(repo_name) as repo
                   WHERE repo IN ( 'tensorflow/tensorflow', 'facebook/react', 'twbs/bootstrap', 'apple/swift', 'Microsoft/vscode', 'torvalds/linux')
                   GROUP BY repo
                   ),
                   files AS 
                   (
                   SELECT COUNT(DISTINCT id) AS num_files, repo_name as repo
                   FROM `bigquery-public-data.github_repos.files`
                   WHERE repo_name IN ( 'tensorflow/tensorflow', 'facebook/react', 'twbs/bootstrap', 'apple/swift', 'Microsoft/vscode', 'torvalds/linux')
                   GROUP BY repo
                   )
                   SELECT commits.repo, commits.num_committers, files.num_files
                   FROM commits 
                   INNER JOIN files
                       ON commits.repo = files.repo
                   ORDER BY repo
                   """

show_time_to_run(small_join_query)

#결과
Time to run: 11.926 seconds
Time to run: 4.293 seconds

#첫 번째 쿼리에는 큰 N:N JOIN이 있습니다. 
#쿼리를 다시 작성하여 JOIN의 크기를 줄임으로써 훨씬 더 빠르게 실행되는 것을 알 수 있습니다.
~~~
