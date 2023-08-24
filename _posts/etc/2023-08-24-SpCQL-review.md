---
title: Text-to-Cypher에 관한 논문 리뷰
layout: post   
categories : [etc, paper-review]
image : /assets/img/study/etc/SpCQL/1.png
description: 논문 리뷰
customexcerpt: A Semantic Parsing Dataset for Converting Natural Language into Cypher - 자연어를 Neo4j 쿼리로 변환하는 것에 관하여.
---

<span class = "alert g">작성자 : 박정현</span>

<!-- 아래 2줄은 목차를 나타내기 위한 심볼이니 건들지 말아 주세요 -->
* random line to make it work. This will be removed.
{:toc} 

title : SpCQL: A Semantic Parsing Dataset for Converting Natural Language into Cypher  
author = Guo, Aibo and Li, Xinyi and Xiao, Guanchen and Tan, Zhen and Zhao, Xiang  
DOI : [https://dl.acm.org/doi/10.1145/3511808.3557703](https://dl.acm.org/doi/10.1145/3511808.3557703)   
publisher : In Proceedings of the 31st ACM International Conference on Information & Knowledge Management (CIKM '22). Association for Computing Machinery  
keywords : graph database, cql, semantic parsing, cypher


# Cypher가 무엇이냐?

그래프 DBMS(데이터베이스 관리 시스템)중 가장 대중적인 **Neo4j**의 질의 언어인 Cypher는 그래프에 대한 효율적인 질의를 가능하도록 한다.  
Cypher에 대해 몇가지 특징을 말하면:
- 개발자가 복잡한 쿼리를 간결하게 표현할 수 있도록 사람이 읽을 수 있는 간단한 구조를 사용
- 표현력과 유연성을 갖도록 설계되어 그래프 데이터 작업을 위한 강력한 도구
    - SNS, 추천 엔진, 이상 탐지 등에 널리 사용됨
- 쿼리 언어의 좋은 점은 쉽게 학습할 수 있고 매우 선언적이라는 것
- 쿼리 구문은 그래프에서 노드 및 엣지 패턴을 쉽게 찾을 수 있는 방법을 제공

요약하면 Cypher는 그래프 데이터베이스를 위한 쿼리 언어로, 간단한 구조를 채택하여 배우기 쉽고, 선언적이다.   
이를 통해 그래프 유형의 데이터에서 질의를 통한 결과를 얻을 수 있다.

cypher에 더 자세한 내용은 검색을 해보길 바람.

# 연구 배경
기존 RDBMS(관계형 데이터베이스 관리 시스템, ex. MySQL, PostgreSQL 등)에서 사용하는 SQL과 Cypher(이하 CQL 이라 명명함.)의 여러 차이점으로 `Natural Language`에서 SQL로 변환하는 모델을 `Natural Language`에서 CQL로 변환하는 것은 아래의 이유로 제한적임.

1. CQL은 SQL 구문 사용에 차이가 있다. CQL 쿼리는 더 유연하고 다양해서 SELECT-FROM-WHERE같은 제한이 없다.
    - 즉, SQL의 SELECT-FROM-WHERE 같은 특정한 구조에 제한되지 않는다.
    - SQL은 SELECT로 시작하면 FROM, WHERE과 같은 키워드를 사용해서 제한적인 구조를 사용함.
2. CQL은 주로 그래프 패턴을 표현하는 데 중점을 두며, 속성 값은 항상 단일 값이 아님. 반면 SQL 테이블은 단일 값 가정을 가지고 있다. 따라서 SQL은 다중 값 속성마다 추가적인 테이블 분할이 필요하며, 이것은 테이블 관리에 상당한 어려움임.
    - 일부 RDBMS는 Array 유형을 갖고 있음
3. 대부분의 기존 최고 수준 모델은 데이터베이스 스키마와 테이블 내용에 크게 의존함, 또한 여러 테이블 질의가 포함될 때 기본 키, 외래 키 같은 테이블 간의 연관 관계를 고려해야 함. 하만 이러한 정보는 그래프 데이터베이스에는 없거나 활용하기 어려움.

이렇게 SQL-CQL 사이 구조적인 차이가 명백하기 때문에 기존의 Text-to-SQL모델을 바로 Text-to-CQL로 전환하기엔 무리가 있음.   
저자는 이런 이유로 SpCQL이라는 데이터 셋을 제안함. SpCQL은 1만개의 질의-CQL 쌍을 갖는다.  

# 기존 Text-to-SQL 메커니즘

Text-to-CQL 작업과 가장 유사한 작업은 텍스트에서 SQL로 변환하는 작업임. 구조적 차이 때문에 몇몇 어려움이 있는데 둘의 공통적인 목표는 자연어 질의를 데이터베이스에서 실행 가능한 쿼리로 변환하는건 동일함. 그래서 유사한 작업이니 Text-to-SQL의 메커니즘을 간략히 소개함.  
Text-to-SQL은 [WikiSQL](http://arxiv.org/abs/1709.00103)과, [Spider](https://doi.org/10.18653/v1/d18-1425) 두 가지가 가장 대표적인 데이터 셋이다. 저자도 요 두놈을 기반으로 Text-to-CQL 데이터 셋을 설계했다.

우선, WikiSQL은 단일 테이블 텍스트에서 SQL로 변환하는 연구에서 주로 사용함. 다양한 도메인의 데이터를 포함하고 80,657개의 질의-SQL 쌍을 포함함. 최신 모델들은 이것을 활용해서 85% 이상의 높은 정확도를 보이지만, 가정이 너무 간단해서 실사용 사례를 반영하기엔 부족한 감이 있음

Spider는 단일 테이블 형식으로 제한하지 않고 더 복잡한 다중 테이블 쿼리를 포함하도록 확장됨. 이것을 이용해서 Text-to-SQL 구현하는 것에는 주로 Seq2Seq 기반의 접근 방식을 적용한 연구가 많았음. Spider 데이터 셋은 심각한 의미 해석 문제를 제시하고 많은 사람들이 작업을 하지만 최고 성능은 현재 72.6%의 정확성을 갖는다.

비교적으로 Text-to-CQL은 더 복잡한 시나리오, 대규모 데이터베이스 내용의 활용 난이도, 기본 키, 외래 키 같은 요소가 없으니 더 어려움.

> 다른 그래프 데이터베이스 쿼리 언어인 SPARQL작업이 제안되었는데 SQL과 SPARQL과 언어적 유사성이 높고 SQL이 더 높은 영향력과 사용량을 보여서 SQL을 비교군으로 선정함

# 설계
Text-to-CQL 작업의 목적은 그래프 데이터베이스를 사용해서 자연어 질의를 SQL 질의로 변환하도록 모델을 설계하는 것임.

![1](/assets/img/study/etc/SpCQL/1.png)

<div align=center>
Text-to-CQL 작업 예시: 주어진 Neo4j 데이터베이스와 사용자 질의에 대해, CQL로 변환
</div>

이러한 과정은 다음과 같이 표현됨.   
$$f(q, G) = c$$ 
여기서 G는 주어진 Neo4j DB임. DB는 다음과 같이 표현함.  
$$G = \{(s,r, o) | s, o \in \ \epsilon \ and \ r \in \ V\}$$  
여기서 앱실론은 노드 집합을 나타내고, V는 관계 집합을 나타냄, q는 사용자가 제안한 자연어 질의를 의미하고 다음과 같음.  
$$q = \{q_1, q_2, \cdots, q_n\}$$  
각 원소는 자연어 질의 토큰을 나타내고 n은 총 토근 수를 말함. c는 결과로 생성된 CQL임.

# 데이터 셋 개요
SpCQL은 두 가지 주요 부분으로 구성됨 Neo4j DB와 1만개의 자연어-CQL 쌍임.  
![2](/assets/img/study/etc/SpCQL/2.png)  

## 데이터 수집
-----
Neo4j 자체는 대규모 오픈 소스 지식 그래프인 **OwnThink3**를 제공함. 이것은 1억4000만 개의 세트가 포함되어 있고, 인물, 조직, 시간, 활동 및 여러 일반적인 요소를 다루고 있음.  
CSDN 4랑 Neo4j community 5와 같은 기술 포럼 사이트에서 크롤링을 통해 6,000개 자언어 질문을 Neo4j 데이터베이스에 대한 쿼리로 획득함. 이를 커버하기 위해 데이터베이스에 존재하지 않는 엔티티, 관계를 적용시킴. 그리고 수동으로 4,000개 자연어를 보충해서 넣음. 마지막으로 모두 정제 작업을 거쳐서 10,000개의 자연어 질의를 얻었다.

## CQL 레이블링
-----
CQL 전문가 10명을 섭외해서 레이블링을 진행함.

## CQL 분석
-----

CQL 쿼리의 구성 요소를 세 가지 부분으로 나누어 제시함.  
- 함수는 CQL 쿼리에서 주요한 기능적인 키워드들을 나타낸다. 가장 기본적인 함수로는 `MATCH, WHERE, RETURN`이 있고, 이는 CQL의 구성과 어느 정도 유사함. 다른 포함된 함수는 `OPTINAL MATCH, START, Aggragation, ORDER BY, LIMIT, SKIP, WITH, UNION`등이 포함됨  
**이러한 것은 제한적이지 않다.**
- 연산자는 값, 문자, 리스트 등에 대한 연산과 비교 및 매칭과 같은 작업을 수행함.  
![3](/assets/img/study/etc/SpCQL/3.png)

- 패턴은 CQL에서 가장 중요한 개념이고 SQL과 가장 큰 차이점임. 패턴의 도입은 사용자의 노드와 관계 사이 경로 탐색이나 조회하는 작업에 효율성 향상과 SQL과 비교하여 사용자 친화적으로 만들 수 있음. 모든 패턴과 해당하는 설명은 아래 그림 참고
![4](/assets/img/study/etc/SpCQL/4.png)

CQL 쿼리에는 방향을 지정하는 방법이 있음. 즉, 방향성이 있는 관계 쿼리임.  
예를 들어 (n)->(m)은 노드 n에서 m으로의 관계를 의미함. 이러한 방향성이 있는 관계를 가진 쿼리들은 모델이 CQL을 생성하는 데 더 어려움을 제시함.

## 범주 통계
----
SpCQL은 쿼리-CQL 쌍을 분석해서 해당 데이터 셋이 실제 사용자 시나리오를 반영하는 것을 보여줌.  
우선, 각 쿼리에서 함수와 연산자의 개수를 계산함. 직관적으로 더 많은 함수와 연산자가 있을 수록 해당 쿼리에 대응하는 CQL이 더 복잡함. 통계 결과는 아래 그림과 같음.  
통계를 보면 SpCQL은 종종 여러 함수와 연산자를 포함함. 이러면 구성 요소가 많아서 CQL 생성을 더 어렵게 만들어버림.

![5](/assets/img/study/etc/SpCQL/5.png)

여기서 F는 함수 O는 연산자를 나타내고 표를 해석하는 방법은 Number of F and O는 CQL에 함수, 연산자 개수 Number는 데이터 셋에 이러한 조합이 포함된 수  
예를 들어, Number of F and O가 5인 경우 CQL에 함수, 연산자가 5개인 경우를 의미하고 Number는 데이터 셋에 함수, 연산자가 5개인 CQL은 1740개라는 의미.

더불어, 총 6,874개의 패턴을 포함하는 쿼리를 세었다고 함. Neo4j의 가장 큰 특징은 그래프 데이터에서 경로(즉, 패턴) 질의이기 때문에 데이터 셋의 대부분의 쿼리는 패턴과 관련있는 것을 쉽게 알 수 있음.  
더 깊이 있는 분석을 위해서 패턴의 변환은 더 심각한 어려움임을 고려해서 패턴을 포함하는 쿼리들에 대해 더 깊이 있는 통계를 세분화하여 제시함.  
1. 무방향 엣지 쿼리(Ud)
2. 방향 엣지 쿼리(D)
3. 제한 길이 엣지 쿼리 및 최단 경로 쿼리(RS)

3 가지 유형의 패턴은 각각 1,645개, 2,916개, 2,313개로 구성됨. 방향 엣지 쿼리의 경우가 많은 이유는 일반적으로 쿼리의 시작 지점으로 사람이나 조직을 지정하기 때문임.  
또한 제한 길이 엣지 쿼리 역시 매우 일반적인 사용 시나리오임.

# 평가
세 가지 baseline인 Seq2Seq, Seq2Seq+Attention, Seq2Seq+Copying을 설계함. SqCQL 데이터 셋은 7:1:2 비율로 훈련, 검증, 테스트 데이터로 분할함.

## 평가 지표
----
Text-to-CQL 작업의 평가를 위해 Text-to-SQL 작업의 평가와 유사하게 두 가지 지표, 논리적 정확성과 실행 정확성을 채택함.

1. 논리적 정확성: 모델이 생성한 CQL 쿼리와 GOLD CQL의 논리 형식을 비교함. WHERE 절의 조건부 순서의 영향이 제외되지 않아 조건부 순서로 인한 FP(False Positives)가 포함될 수 있음.
$$ACC_LX = \frac {number \ of \ CQL \ with \ correct \ logic \ form} {total \ number \ of \ CQL}$$

2. 실행 정확성: 실행 정확성은 모델이 생성한 CQL 쿼리의 결과를 GOLD CQL 실행 결과와 비교함. WHERE 절의 조건과 같은 조건의 순서가 결과에 영향을 주지 않기 때문에 조건의 순서의 영향을 무시할 수 있음.
$$ACC_EX = \frac {number \ of \ CQL \ with \ correct \ execution \ result} {total \ number \ of \ CQL}$$

## 결과 분석
-----
세 가지 baseline 결과를 비교하기 위해 아래와 같이 나타난다.
![6](/assets/img/study/etc/SpCQL/6.png)

Seq2Seq baseline 모델의 성능이 좋지 않으며, 이는 일반적인 디코딩 과정으로 복잡한 쿼리를 해결하는 능력의 약점을 나타낸다.   
> Seq2Seq가 AutoEncoder 기반이고 기본적인 Seq2Seq의 디코딩 과정으로 CQL을 잘 생성하기는 힘들다는 의미  
> Ud : 무향 그래프 D : 유향 그래프 RS : 길이가 제한적인 엣지 쿼리 및 최단 경로 쿼리  
> 진짜 매우 처참하다..

그리고 세 가지 baseline 성능을 세 가지 스키마 쿼리에 대해 비교하며 결과를 아래 그림에 나타냈다.
![7](/assets/img/study/etc/SpCQL/7.png)

결과가 진짜 최악이다(이런 결과도 논문을 쓸 수 있구나..,) 특히 방향성 있는 엣지 CQL에 대한 쿼리와 제한된 엣지 길이 및 최단 경로 쿼리에서 특히 그렇다.

# 결론

최초로 SpCQL이라는 Text-to-CQL 데이터 셋을 소개했음(최초라서 성능이 낮아도 Accept된건가?) 여기에는 10,000개의 자연어-CQL 쌍이 들어있고 이것을 기반으로 자연어->Cypher 작업을 하는 새로운 파싱 작업을 정의했음.

이 데이터 셋을 기반으로 작업을 발전시키면 현재의 그래프 데이터베이스의 사용자 친화성이 더욱 향상되며, 학습 및 사용 비용도 줄일 수 있을 것임.  
성능이 낮지만 새로운 데이터 셋을 공개하면서 Text-to-Cypher에 대한 연구 기회를 제공하고 영감을 줄 것으로 기대한다고 함.

### Refernce

[1] Ruisheng Cao, Lu Chen, Zhi Chen, Yanbin Zhao, Su Zhu, and Kai Yu. 2021.
LGESQL: Line Graph Enhanced Text-to-SQL Model with Mixed Local and Non-
Local Relations. In Proceedings of the 59th Annual Meeting of the Association for
Computational Linguistics and the 11th International Joint Conference on Natural
Language Processing, ACL/IJCNLP 2021, (Volume 1: Long Papers), Virtual Event,
August 1-6, 2021, Chengqing Zong, Fei Xia, Wenjie Li, and Roberto Navigli (Eds.).
Association for Computational Linguistics, 2541–2555. https://doi.org/10.18653/
v1/2021.acl-long.198

[2] Li Dong and Mirella Lapata. 2016. Language to Logical Form with Neural Attention.
In Proceedings of the 54th Annual Meeting of the Association for Computational
Linguistics, ACL 2016, August 7-12, 2016, Berlin, Germany, Volume 1: Long Papers.
The Association for Computer Linguistics. https://doi.org/10.18653/v1/p16-1004
[3] Jiatao Gu, Zhengdong Lu, Hang Li, and Victor O. K. Li. 2016. Incorporating
Copying Mechanism in Sequence-to-Sequence Learning. In Proceedings of the
54th Annual Meeting of the Association for Computational Linguistics, ACL 2016,
August 7-12, 2016, Berlin, Germany, Volume 1: Long Papers. The Association for
Computer Linguistics. https://doi.org/10.18653/v1/p16-1154

[3] Jiatao Gu, Zhengdong Lu, Hang Li, and Victor O. K. Li. 2016. Incorporating
Copying Mechanism in Sequence-to-Sequence Learning. In Proceedings of the
54th Annual Meeting of the Association for Computational Linguistics, ACL 2016,
August 7-12, 2016, Berlin, Germany, Volume 1: Long Papers. The Association for
Computer Linguistics. https://doi.org/10.18653/v1/p16-1154

[4] Aibo Guo, Xiang Zhao, and Wubin Ma. 2021. ER-SQL: Learning enhanced
representation for Text-to-SQL using table contents. Neurocomputing 465 (2021),
359–370. https://doi.org/10.1016/j.neucom.2021.08.134

[5] Pengcheng He, Yi Mao, Kaushik Chakrabarti, and Weizhu Chen. 2019. X-SQL:
reinforce schema representation with context. CoRR abs/1908.08113 (2019). http:
[//arxiv.org/abs/1908.08113](notion://arxiv.org/abs/1908.08113)

[6] Fabiano Ferreira Luz and Marcelo Finger. 2018. Semantic Parsing Natural Language
into SPARQL: Improving Target Language Representation with Neural
Attention. CoRR abs/1803.04329 (2018). arXiv:1803.04329 http://arxiv.org/abs/
1803.04329

[7] Sukannya Purkayastha, Saswati Dana, Dinesh Garg, Dinesh Khandelwal, and
G. P. Shrivatsa Bhargav. 2021. Knowledge Graph Question Answering via SPARQL
Silhouette Generation. CoRR abs/2109.09475 (2021). arXiv:2109.09475 https:
[//arxiv.org/abs/2109.09475](notion://arxiv.org/abs/2109.09475)

[8] Bailin Wang, Richard Shin, Xiaodong Liu, Oleksandr Polozov, and Matthew
Richardson. 2020. RAT-SQL: Relation-Aware Schema Encoding and Linking for
Text-to-SQL Parsers. In Proceedings of the 58th Annual Meeting of the Association
for Computational Linguistics, ACL 2020, Online, July 5-10, 2020, Dan Jurafsky,
Joyce Chai, Natalie Schluter, and Joel R. Tetreault (Eds.). Association for Computational
Linguistics, 7567–7578. https://doi.org/10.18653/v1/2020.acl-main.677

[9] Tao Yu, Rui Zhang, Kai Yang, Michihiro Yasunaga, Dongxu Wang, Zifan Li,
James Ma, Irene Li, Qingning Yao, Shanelle Roman, Zilin Zhang, and Dragomir R.
Radev. 2018. Spider: A Large-Scale Human-Labeled Dataset for Complex and
Cross-Domain Semantic Parsing and Text-to-SQL Task. In Proceedings of the 2018
Conference on Empirical Methods in Natural Language Processing, Brussels, Belgium,
October 31 - November 4, 2018, Ellen Riloff, David Chiang, Julia Hockenmaier,
and Jun’ichi Tsujii (Eds.). Association for Computational Linguistics, 3911–3921.
https://doi.org/10.18653/v1/d18-1425

[10] Victor Zhong, Caiming Xiong, and Richard Socher. 2017. Seq2SQL: Generating
Structured Queries from Natural Language using Reinforcement Learning. CoRR
abs/1709.00103 (2017). http://arxiv.org/abs/1709.00103