---
title: Kaggle과 함께하는 SQL 기술 향상시키기! - Lesson3. Nested and Repeated Data
layout: post   
categories : SQL, Kaggle, Big-data, DAU-BigDataTeam
image : 
description: SQL에 대해 더 깊이 알아보도록 하자.   
customexcerpt: Kaggle의 Advanced SQL과정을 통해 SQL 실력을 더 향상시켜보자. 
---

# ****Advanced SQL****
<br>

## **Nested and Repeated Data**
> Learn to query complex datatypes in BigQuery.
---
### ****Introduction****
지금까지 숫자 유형(정수, 부동 소수점 값), 문자열 및 DATETIME 유형을 포함한 많은 유형의 데이터를 사용했다.

이번 강의에서는 중첩 및 반복 데이터를 query하는 방법을 배울 것이다.

이러한 데이터 유형은 BigQuery 데이터 셋에서 찾을 수 있는 가장 복잡한 데이터 유형이다.

<br>

### ****Nested data****
애완동물과 그들의 장난감에 대한 정보를 포함하는 가상의 데이터 세트를 가정해보자.

우리는 이 정보를 두 개의 다른 테이블(애완동물 테이블과 장난감 테이블)로 구성할 수 있다. 

장난감 테이블에는 Pet_ID가 포함될 수 있다. 

열은 각 장난감을 소유한 애완동물과 일치 시키는데 사용할 수 있다. 

<br>

BigQuery의 또 다른 옵션은 아래의 pets_and_toys 테이블과 유사하게 모든 정보를 단일 테이블로 구성하는 것이다.

![img3-1](https://i.imgur.com/wxuogYA.png)

해당 경우 장난감 테이블의 모든 정보가 단일 열(pets_and_toys 테이블의 toy열)로 축소된다. 

pets_and_toys 테이블의 "Toy" 열을 중첩 열이라고 하며, "Name" 및 "Type" 필드가 그 내부에 중첩되어 있다고 말할 수 있다. 

내포된 열에는 STROT(또는 RECORD) 유형이 있다. 이것은 아래 표 스키마에 반영되어 있다.

<br>

> Recall that we refer to the structure of a table as its schema. If you need to review how to interpret table schema, feel free to check out this lesson from the Intro to SQL micro-course.

<br>

![img3-2](https://i.imgur.com/epXFXdb.png)

중첩된 데이터가 있는 열을 query문으로 작성하려고 한다면, 해당 데이터가 포함된 열의 컨텍스트에서 각 필드를 식별해야 한다.

- `Toy.Name` refers to the "Name" field in the "Toy" column, and
- `Toy.Type` refers to the "Type" field in the "Toy" column.

 <br>

![img3-3](https://i.imgur.com/eE2Gt62.png)

그렇지 않으면, 일반 규칙이 그대로 유지된다. query에 대한 다른 내용을 변경할 필요가 없다. 

<br>

### ****Repeated data****
이제 각 애완동물이 여러 개의 장난감을 가질 수 있는 더 현실적인 경우를 생각해보자.

해당 경우, 이 정보를 단일 테이블로 축소하려면 다른 데이터 유형을 활용해야 한다.

![img3-4](https://i.imgur.com/S93FJTE.png)

각 행에 대해 둘 이상의 값을 허용하기 때문에, 'toy'열에 반복 데이터가 포함되어 있다고 할 수 있다.

이는 아래 표 스키마에 반영이 되며, 'toys' 열의 모드는 `REPEATED`로 나타난다. 

![img3-5](https://i.imgur.com/KlrjpDM.png)

<br>

반복되는 필드의 각 항목은 ARRAY 또는 동일한 데이터 유형을 가진(0개 이상의)값의 순서가 지정된 목록이다.

예를 들어, Moon the Dog에 대한 "toys"열의 항목은 [Frisbee, Bone, Rope]이며, 이는 세 가지 값을 가진 ARRAY이다.

반복 데이터를 Query문으로 작성할 때는 반복 데이터가 들어 있는 열의 이름을 `UNNEST()` 함수 안에 넣어야 합니다.

![img3-6](https://i.imgur.com/p3fXPxY.png)

<br>

이것은 기본적으로 반복되는 데이터(테이블의 오른쪽에 추가 해야 함.)를 평평하게 만들어 각 행에 하나의 요소를 갖게 한다. 아래 그림을 참조하자.

![img3-7](https://i.imgur.com/8j4XK8f.png)

<br>

### ****Nested and repeated data****
이제, 애완동물이 여러 개의 장난감을 가질 수 있고, 우리가 각 장난감의 이름과 종류를 모두 추적하고 싶다면 어떻게 해야 할까? 해당 경우 'toys'열을 중첩 및 반복으로 만들 수 있다.

![img3-8](https://i.imgur.com/psKtza2.png)

<br>

![img3-9](https://i.imgur.com/fO5OymI.png)

예시 query문을 보자.

![img3-10](https://i.imgur.com/DiMCZaO.png)

"장난감" 열이 반복되기 때문에 UNNEST() 함수로 평평하게 만든다. 그리고 평평한 열에 t라는 별칭을 지정했기 때문에, Name 및 TYPE 필드를 t로 참조 할 수 있다. 

<br>

_더 자세한 예제와 설명은 https://www.kaggle.com/code/alexisbcook/nested-and-repeated-data 을 참고하자._

<br>
<br>

## ****Exercises****

**1) Who had the most commits in 2016?**
GitHub is the most popular place to collaborate on software projects. A GitHub repository (or repo) is a collection of files associated with a specific project, and a GitHub commit is a change that a user has made to a repository. We refer to the user as a committer.

The sample_commits table contains a small sample of GitHub commits, where each row corresponds to different commit. The code cell below fetches the table and shows the first five rows of this table.
~~~py
from google.cloud import bigquery

# Create a "Client" object
client = bigquery.Client()

# Construct a reference to the "github_repos" dataset
dataset_ref = client.dataset("github_repos", project="bigquery-public-data")

# API request - fetch the dataset
dataset = client.get_dataset(dataset_ref)

# Construct a reference to the "sample_commits" table
table_ref = dataset_ref.table("sample_commits")

# API request - fetch the table
sample_commits_table = client.get_table(table_ref)

# Preview the first five lines of the table
client.list_rows(sample_commits_table, max_results=5).to_dataframe()
~~~

<br>

Run the next code cell to print the table schema.

~~~py
# Print information on all the columns in the table
sample_commits_table.schema
~~~

```
[SchemaField('commit', 'STRING', 'NULLABLE', None, (), None),
 SchemaField('tree', 'STRING', 'NULLABLE', None, (), None),
 SchemaField('parent', 'STRING', 'REPEATED', None, (), None),
 SchemaField('author', 'RECORD', 'NULLABLE', None, (SchemaField('name', 'STRING', 'NULLABLE', None, (), None), SchemaField('email', 'STRING', 'NULLABLE', None, (), None), SchemaField('time_sec', 'INTEGER', 'NULLABLE', None, (), None), SchemaField('tz_offset', 'INTEGER', 'NULLABLE', None, (), None), SchemaField('date', 'TIMESTAMP', 'NULLABLE', None, (), None)), None),
 SchemaField('committer', 'RECORD', 'NULLABLE', None, (SchemaField('name', 'STRING', 'NULLABLE', None, (), None), SchemaField('email', 'STRING', 'NULLABLE', None, (), None), SchemaField('time_sec', 'INTEGER', 'NULLABLE', None, (), None), SchemaField('tz_offset', 'INTEGER', 'NULLABLE', None, (), None), SchemaField('date', 'TIMESTAMP', 'NULLABLE', None, (), None)), None),
 SchemaField('subject', 'STRING', 'NULLABLE', None, (), None),
 SchemaField('message', 'STRING', 'NULLABLE', None, (), None),
 SchemaField('trailer', 'RECORD', 'REPEATED', None, (SchemaField('key', 'STRING', 'NULLABLE', None, (), None), SchemaField('value', 'STRING', 'NULLABLE', None, (), None), SchemaField('email', 'STRING', 'NULLABLE', None, (), None)), None),
 SchemaField('difference', 'RECORD', 'REPEATED', None, (SchemaField('old_mode', 'INTEGER', 'NULLABLE', None, (), None), SchemaField('new_mode', 'INTEGER', 'NULLABLE', None, (), None), SchemaField('old_path', 'STRING', 'NULLABLE', None, (), None), SchemaField('new_path', 'STRING', 'NULLABLE', None, (), None), SchemaField('old_sha1', 'STRING', 'NULLABLE', None, (), None), SchemaField('new_sha1', 'STRING', 'NULLABLE', None, (), None), SchemaField('old_repo', 'STRING', 'NULLABLE', None, (), None), SchemaField('new_repo', 'STRING', 'NULLABLE', None, (), None)), None),
 SchemaField('difference_truncated', 'BOOLEAN', 'NULLABLE', None, (), None),
 SchemaField('repo_name', 'STRING', 'NULLABLE', None, (), None),
 SchemaField('encoding', 'STRING', 'NULLABLE', None, (), None)]

```
Write a query to find the individuals with the most commits in this table in 2016. Your query should return a table with two columns:

- `committer_name` : contains the name of each individual with a commit (from 2016) in the table
- `num_commits` : shows the number of commits the individual has in the table (from 2016)
Sort the table, so that people with more commits appear first.

NOTE: You can find the name of each committer and the date of the commit under the "committer" column, in the "name" and "date" child fields, respectively.

~~~ py
# Write a query to find the answer
max_commits_query = max_commits_query = """
                    SELECT committer.name AS committer_name, COUNT(*) AS num_commits
                    FROM `bigquery-public-data.github_repos.sample_commits`
                    WHERE committer.date >= '2016-01-01' AND committer.date < '2017-01-01'
                    GROUP BY committer_name
                    ORDER BY num_commits DESC
                    """
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>committer_name</th>
      <th>num_commits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Greg Kroah-Hartman</td>
      <td>3545</td>
    </tr>
    <tr>
      <th>1</th>
      <td>David S. Miller</td>
      <td>3120</td>
    </tr>
    <tr>
      <th>2</th>
      <td>TensorFlower Gardener</td>
      <td>2449</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Linus Torvalds</td>
      <td>2424</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Benjamin Pasero</td>
      <td>1127</td>
    </tr>
  </tbody>
</table>

<br>

**2) Look at languages!**

Now you will work with the languages table. Run the code cell below to print the first few rows.

~~~ py
# Construct a reference to the "languages" table
table_ref = dataset_ref.table("languages")

# API request - fetch the table
languages_table = client.get_table(table_ref)

# Preview the first five lines of the table
client.list_rows(languages_table, max_results=5).to_dataframe()
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>repo_name</th>
      <th>language</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>lemi136/puntovent</td>
      <td>[{'name': 'C', 'bytes': 80}]</td>
    </tr>
    <tr>
      <th>1</th>
      <td>taxigps/nctool</td>
      <td>[{'name': 'C', 'bytes': 4461}]</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ahy1/strbuf</td>
      <td>[{'name': 'C', 'bytes': 5573}]</td>
    </tr>
    <tr>
      <th>3</th>
      <td>nleiten/mod_rpaf-ng</td>
      <td>[{'name': 'C', 'bytes': 30330}]</td>
    </tr>
    <tr>
      <th>4</th>
      <td>kmcallister/alameda</td>
      <td>[{'name': 'C', 'bytes': 17077}]</td>
    </tr>
  </tbody>
</table>
<br>

Each row of the languages table corresponds to a different repository.

- The "repo_name" column contains the name of the repository,
- the "name" field in the "language" column contains the programming languages that can be found in the repo, and 
- the "bytes" field in the "language" column has the size of the files (in bytes, for the corresponding language).


Run the following code cell to print the table schema.

~~~py
# Print information on all the columns in the table
languages_table.schema
~~~

```
[SchemaField('repo_name', 'STRING', 'NULLABLE', None, (), None),
 SchemaField('language', 'RECORD', 'REPEATED', None, (SchemaField('name', 'STRING', 'NULLABLE', None, (), None), SchemaField('bytes', 'INTEGER', 'NULLABLE', None, (), None)), None)]
```

언어 테이블에서 행의 매우 작은 부분 집합만 포함하는 sample_languages라는 테이블에 액세스할 수 있다고 가정해보자. 

실제로는 세 개의 행만 포함한다. 

이 표는 아래 이미지를 참고하자.

![img3-11](https://i.imgur.com/qAb5lZ2.png)

<br>

How many rows are in the table returned by the query below?

![img3-12](https://i.imgur.com/Q5qYAtz.png)

<br>

~~~py
# Fill in the blank
num_rows = 6
~~~

_Hint: Remember that the UNNEST() function essentially flattens the repeated data (which is then appended to the right side of the table) so that we have one element on each row._

<br>

**3) What's the most popular programming language?**

Write a query to leverage the information in the languages table to determine which programming languages appear in the most repositories. The table returned by your query should have two columns:

- `language_name` : the name of the programming language
- `num_repos` : the number of repositories in the languages table that use the programming language

Sort the table so that languages that appear in more repos are shown first.

~~~py
# Write a query to find the answer
pop_lang_query = """
                 SELECT l.name as language_name, COUNT(*) as num_repos
                 FROM `bigquery-public-data.github_repos.languages`,
                     UNNEST(language) AS l
                 GROUP BY language_name
                 ORDER BY num_repos DESC
                 """

~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>language_name</th>
      <th>num_repos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>JavaScript</td>
      <td>1099966</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CSS</td>
      <td>807826</td>
    </tr>
    <tr>
      <th>2</th>
      <td>HTML</td>
      <td>777433</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Shell</td>
      <td>640886</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Python</td>
      <td>550905</td>
    </tr>
  </tbody>
</table>
<br>

**4) Which languages are used in the repository with the most languages?**

For this question, you'll restrict your attention to the repository with name 'polyrabbit/polyglot'.

Write a query that returns a table with one row for each language in this repository. The table should have two columns.

이 질문의 경우,  'polyrabbit/polyglot'이라는 이름의 저장소로 주제를 제한한다. 

이 리포지토리의 각 언어에 대해 하나의 행이 있는 테이블을 반환하는 query를 작성하라. 테이블에는 두 개의 열이 있어야 한다. 

- `name` : the name of the programming language
- `bytes` : the total number of bytes of that programming language

Sort the table by the bytes column so that programming languages that take up more space in the repo appear first.
리포지토리에 더 많은 공간을 차지하는 프로그래밍 언어가 먼저 나타나도록 `byte` 열을 기준으로 표를 정렬하라.

~~~ py
# Your code here
all_langs_query = """
                  SELECT l.name, l.bytes
                  FROM `bigquery-public-data.github_repos.languages`,
                      UNNEST(language) as l
                  WHERE repo_name = 'polyrabbit/polyglot'
                  ORDER BY l.bytes DESC
                  """
~~~

<table border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>name</th>
      <th>bytes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Lasso</td>
      <td>834726</td>
    </tr>
    <tr>
      <th>1</th>
      <td>C</td>
      <td>819142</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Mercury</td>
      <td>709952</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Objective-C</td>
      <td>495392</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Game Maker Language</td>
      <td>298131</td>
    </tr>
  </tbody>
</table>
<br>

---