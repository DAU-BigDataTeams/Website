---
title: Kaggle과 함께하는 SQL 기술 향상시키기! - Lesson4. Writing Efficient Queries
layout: post   
categories : SQL, Kaggle, Big-data, DAU-BigDataTeam
image : ![Certificate](img\suyadiya - Advanced SQL.png)
description: SQL에 대해 더 깊이 알아보도록 하자.   
customexcerpt: Kaggle의 Advanced SQL과정을 통해 SQL 실력을 더 향상시켜보자. 
---

# ****Advanced SQL****
<br>

## **Writing Efficient Queries**
> Write queries to run faster and use less data.
---
### ****Introduction****
Query가 효율적인지에 대한 여부가 중요하지 않은 경우도 있다. 

예를 들어, 한 번만 실행할 것으로 예상되는 query를 작성하고 작은 데이터 집합에서 작동하는 것이 있다. 

해당 경우 필요한 답을 주는 것이라면 무엇이든 상관없다.

<br>

하지만 웹 사이트에 데이터를 공급하는 query처럼 여러 번 실행되는 query는 어떨까? 웹 사이트가 로드되기를 기다리는 사용자를 두지 않으려면, 이러한 기능이 효율적이여야 한다. 

또는 대규모 데이터 세트에 대한 query는 어떤가? 해당 경우에는 서투르게 작성하게 되면 느리고 많은 비용이 들 수 있다. 

대부분의 데이터베이스 시스템에서는 query를 가장 효과적인 방법으로 해석/실행하는 query 최적화 도구가 있다.

<br>

### ****Some useful functions****
두 가지 함수를 사용하여 서로 다른 query의 효율성을 비교할 수 있다.

- `show_amount_of_data_scanned()` shows the amount of data the query uses.
- `show_time_to_run()` prints how long it takes for the query to execute.

<br>

### ****Strategies****
**1) Only select the columns you want.**

SELECT * FROM...을(를) 사용하여 QUERY를 작성하려고 한다.

어떤 기둥이 필요한지 생각할 필요가 없어서 편리하다는 장점이 있지만, 매우 비효율적일 수도 있다.

텍스트 필드는 다른 필드보다 큰 경향이 있기 때문에 필요하지 않은 텍스트 필드가 있는 경우 특히 중요하다.

~~~PY
star_query = "SELECT * FROM `bigquery-public-data.github_repos.contents`"
show_amount_of_data_scanned(star_query)

basic_query = "SELECT size, binary FROM `bigquery-public-data.github_repos.contents`"
show_amount_of_data_scanned(basic_query)
~~~

```
Data processed: 2623.284 GB
Data processed: 2.466 GB
```

해당 경우에는 가공되지 않은 원본 데이터에 필요한 필드보다 100배 큰 텍스트 필드가 포함되어 있기 때문에, QUERY를 완료하기 위해 검색되는 데이터가 100배 감소하게 된다. 

<br>

**2) Read less data.**

아래 두 QUERY는 모두 샌프란시스코 시내에서 편도 자전거 여행의 평균 기간(초)을 계산한다.

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
~~~
```
Data processed: 0.076 GB
Data processed: 0.06 GB
```

스테이션 ID와 스테이션 이름 사이에는 1:1 관계가 있으므로 쿼리에서 start_station_id 및 end_station_id 열을 사용할 필요가 없다. 

스테이션 ID가 있는 열만 사용하면 더 적은 데이터를 스캔할 수 있다.

<br>

**3) Avoid N:N JOINs.**

이 과정에서 실행한 대부분의 JOIN은 1:1 JOIN입니다. 이 경우 각 테이블의 각 행은 다른 테이블에서 최대 하나의 일치 항목을 가진다.

![img4-1](https://i.imgur.com/fp7oMLq.png)

<br>

JOIN의 또 다른 유형은 N:1 JOIN이다. 여기서 한 테이블의 각 행은 다른 테이블의 여러 행과 일치할 수 있다.

![img4-2](https://i.imgur.com/7PxE0Mr.png)

<br>

마지막으로, N:N JOIN은 한 테이블의 행 그룹이 다른 테이블의 행 그룹과 일치할 수 있는 그룹이다. 

일반적으로 다른 모든 것은 동일하지만, 이러한 유형의 JOIN은 조인되는 두 개의 (원래) 테이블 중 하나보다 더 많은 행을 가진 테이블을 생성한다.

![img4-3](https://i.imgur.com/UsNZZoz.png)

<br>

이제 실제 데이터 세트의 예를 들어 보자. 

아래의 두 예는 서로 다른 커밋자 수와 여러 GitHub 저장소에 있는 파일 수를 계산한다.

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
~~~
```
Time to run: 11.926 seconds
Time to run: 4.293 seconds
```
첫 번째 query에는 큰 N:N JOIN이 있다. JOIN의 크기를 줄이기 위해 query를 다시 작성하면 훨씬 더 빨리 실행된다.

<br>
<br>

## ****Exercises****
**1) You work for Pet Costumes International.**

당신은 오늘 오후에 세 가지 질문을 작성해야 한다.  

세 가지 작업 버전을 모두 작성할 시간은 충분하지만 둘 중 하나를 최적화할 시간은 충분하다. 

다음 중 최적화할 가치가 있는 QUERY는 무엇인가?

1. A software engineer wrote an app for the shipping department, to see what items need to be shipped and which aisle of the warehouse to go to for those items. She wants you to write the query. It will involve data that is stored in an orders table, a shipments table and a warehouseLocation table. The employees in the shipping department will pull up this app on a tablet, hit refresh, and your query results will be shown in a nice interface so they can see what costumes to send where.
2. The CEO wants a list of all customer reviews and complaints… which are conveniently stored in a single reviews table. Some of the reviews are really long… because people love your pirate costumes for parrots, and they can’t stop writing about how cute they are.
3. Dog owners are getting more protective than ever. So your engineering department has made costumes with embedded GPS trackers and wireless communication devices. They send the costumes’ coordinates to your database once a second. You then have a website where owners can find the location of their dogs (or at least the costumes they have for those dogs). For this service to work, you need a query that shows the most recent location for all costumes owned by a given human. This will involve data in a CostumeLocations table as well as a CostumeOwners table.
   
   <br>

그렇다면, 다음 중 효율적으로 작성되는 것으로부터 가장 큰 이점을 얻을 수 있는 것은 무엇인가?

~~~PY
# Fill in your answer
query_to_optimize = 3
~~~

``` 
Kaggle의 풀이

Why 3: Because data is sent for each costume at each second, this is the query that is likely to involve the most data (by far). And it will be run on a recurring basis. So writing this well could pay off on a recurring basis.

Why not 1: This is the second most valuable query to optimize. It will be run on a recurring basis, and it involves merges, which is commonly a place where you can make your queries more efficient

Why not 2: This sounds like it will be run only one time. So, it probably doesn’t matter if it takes a few seconds extra or costs a few cents more to run that one time. Also, it doesn’t involve JOINs. While the data has text fields (the reviews), that is the data you need. So, you can’t leave these out of your select query to save computation.
```

<br>

**2) Make it easier to find Mitzie!**

![img4-4](https://i.imgur.com/E9jikOQ.png)

<br>

The CostumeLocations table shows timestamped GPS data for all of the pet costumes in the database, where CostumeID is a unique identifier for each costume.

The CostumeOwners table shows who owns each costume, where the OwnerID column contains unique identifiers for each (human) owner. Note that each owner can have more than one costume! And, each costume can have more than one owner: this allows multiple individuals from the same household (all with their own, unique OwnerID) to access the locations of their pets' costumes.

Say you need to use these tables to get the current location of one pet in particular: Mitzie the Dog recently ran off chasing a squirrel, but thankfully she was last seen in her hot dog costume!

One of Mitzie's owners (with owner ID MitzieOwnerID) logs into your website to pull the last locations of every costume in his possession. Currently, you get this information by running the following query:

~~~ py
WITH LocationsAndOwners AS 
(
SELECT * 
FROM CostumeOwners co INNER JOIN CostumeLocations cl
   ON co.CostumeID = cl.CostumeID
),
LastSeen AS
(
SELECT CostumeID, MAX(Timestamp)
FROM LocationsAndOwners
GROUP BY CostumeID
)
SELECT lo.CostumeID, Location 
FROM LocationsAndOwners lo INNER JOIN LastSeen ls 
    ON lo.Timestamp = ls.Timestamp AND lo.CostumeID = ls.CostumeID
WHERE OwnerID = MitzieOwnerID
~~~

<br>

**Is there a way to make this faster or cheaper?**

```
# Kaggle이 제공하는 답안지 
Yes. Working with the LocationsAndOwners table is very inefficient, because it’s a big table. There are a few options here, and which works best depends on database specifics. One likely improvement is

WITH CurrentOwnersCostumes AS
(
SELECT CostumeID 
FROM CostumeOwners 
WHERE OwnerID = MitzieOwnerID
),
OwnersCostumesLocations AS
(
SELECT cc.CostumeID, Timestamp, Location 
FROM CurrentOwnersCostumes cc INNER JOIN CostumeLocations cl
    ON cc.CostumeID = cl.CostumeID
),
LastSeen AS
(
SELECT CostumeID, MAX(Timestamp)
FROM OwnersCostumesLocations
GROUP BY CostumeID
)
SELECT ocl.CostumeID, Location 
FROM OwnersCostumesLocations ocl INNER JOIN LastSeen ls 
    ON ocl.timestamp = ls.timestamp AND ocl.CostumeID = ls.costumeID
Why is this better?

Instead of doing large merges and running calculations (like finding the last timestamp) for every costume, we discard the rows for other owners as the first step. So each subsequent step (like calculating the last timestamp) is working with something like 99.999% fewer rows than what was needed in the original query.

Databases have something called “Query Planners” to optimize details of how a query executes even after you write it. Perhaps some query planner would figure out the ability to do this. But the original query as written would be very inefficient on large datasets.
```
