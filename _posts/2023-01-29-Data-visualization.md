---
title: Data Visualization
layout: post   
categories : Data Visualization, seaborn, kaggle
image : /assets/img/수료증/김종호-데이터시각화수료증.png
description: kaggle의 Data Visualization 정리
customexcerpt: kaggle의 Data Visualization 정리를 해보았다!!
---

# 0. Hello, Seaborn

## [Seaborn](http://seaborn.pydata.org/) : statistical data visualization
### Matplotlib 기반의  **통계 데이터 시각화 라이브러리**이다. 
- 통계 정보 : 구성, 분포, 관계 등
  
![alt text](/assets/img/Data-visualization/1.%20seaborn.png)  <br><br>

# 1. Line Charts
## 특정 기간의 추세를 보여주는 데 가장 적합하며(시계열 데이터 시각화), 여러 선을 사용하여 둘 이상의 그룹의 추세를 보여줄 수 있다.

~~~ python
# Path of file to read
spotify_filepath = "../input/spotify.csv" 

# Read the file into a variable spotify_data / csv파일을 불러오기 위한 함수
spotify_data = pd.read_csv(spotify_filepath, index_col="Date", parse_dates=True)

# Set the width and height of the figure / 너비와 높이 설정
plt.figure(figsize=(14,6))

# Add title / 제목 설정
plt.title("Daily Global Streams of Popular Songs in 2017-2018")

# Line chart showing daily global streams of each song 
sns.lineplot(data=spotify_data)
~~~
![alt text](/assets/img/Data-visualization/2.%20seaborn.png) 
- import seaborn as sns : sns은 seaborn package를 의미하며 차트를 만드는 데 사용하는 모든 명령은 sns로 시작한다.
<br><br>

# 2. Bar Charts
<h2> 서로 다른 그룹에 해당하는 양을 비교하는데 유용하다.</h2>

~~~ python
# Set the width and height of the figure
plt.figure(figsize=(10,6))

# Add title
plt.title("Average Arrival Delay for Spirit Airlines Flights, by Month")

# Bar chart showing average arrival delay for Spirit Airlines flights by month
sns.barplot(x=flight_data.index, y=flight_data['NK'])

# Add label for vertical axis
plt.ylabel("Arrival delay (in minutes)")
~~~
![alt text](/assets/img/Data-visualization/3.%20seaborn.png) 
- x=flight_data.index : x축에서 사용할 항목 결정  (이 경우는 '날짜'가 들어있는 열 선택)
- y=fight_data['NK'] : y축에서 사용할 항목 결정 
<br><br>
# 3. Heatmaps
## 색상으로 표현할 수 있는 다양한 정보를 일정한 이미지 위에 열분포 형태의 그래픽으로 나타낸다.

~~~pythonf
# Set the width and height of the figure
plt.figure(figsize=(14,7))

# Add title
plt.title("Average Arrival Delay for Each Airline, by Month")

# Heatmap showing average arrival delay for each airline by month
sns.heatmap(data=flight_data, annot=True)

# Add label for horizontal axis
plt.xlabel("Airline")
~~~
![alt text](/assets/img/Data-visualization/4.%20seaborn.png)
- annot=True : 각 셀에 숫자를 입력(annotate each cell with numeric value)
<br><br>
## Heatmaps 해석

![alt text](/assets/img/Data-visualization/5.%20seaborn.png))<br>
- 위 사진은 platform과 Genre의 평균 평점에 관한 히트맵이다.
- PlayStaion 4의 Simulation이 가장 높은 평균 평점(9.2)을 받은 것 확인할 수 있다. 
- 그에 반해 Game Boy Color의 Fighting, Shooter은 가장 낮은 평균 평점(4.5)을 받았다.
<br><br>
# 4. Scatter Plots
## 산점도는 두 연속형 변수 사이의 관계를 보여준다. 색상 코드가 지정된 경우 세 번째 범주형 변수와의 관계도 볼 수 있다.

~~~python
# Scatter plot showing the relationship between 'sugarpercent' and 'winpercent'

sns.scatterplot(x=candy_data['sugarpercent'],y=candy_data['winpercent'])
~~~

![alt text](/assets/img/Data-visualization/6.%20seaborn.png)<br>
##### sugarpercent : 설탕 함량 
##### winpercent : 설문 조사 결과 

- scatter plot에서 두 변수 사이에 강한 상관 관계가 보이지 않는다. 설탕 함량이 사탕 인기에 큰 비중을 차지하지 않는다는 것을 말한다.
<br><br>
## 회귀선(추세선)을 추가한 scatter plot
- 산점도에 회귀선을 포함하면 두 변수 사이의 선형 관계를 확인할 수 있다.

~~~python
# regression line showing the relationship between 'sugarpercent' and 'winpercent'

sns.regplot(x=candy_data['sugarpercent'], y=candy_data['winpercent'])
~~~
![alt text](/assets/img/Data-visualization/7.%20seaborn.png)<br>
- 회귀선의 기울기가 양수이므로 사람들은 상대적으로 더 많은 설탕을 함유한 사탕을 선호한다는 것을 알 수 있다.<br><br>

## Swarmplot
 - 범주형 변수에 들어 있는 각 범주별 데이터의 분포 확인
 - 데이터의 분산까지 고려하여, 데이터 포인트가 서로 중복되지 않게 그린다.
~~~python
sns.swarmplot(x=insurance_data['smoker'],
              y=insurance_data['charges'])
~~~
![alt text](/assets/img/Data-visualization/8.%20seaborn.png)<br>
- 평균적으로 비흡연자들이 흡연자들보다 보험료를 적게 지불한다.
<br><br>
# 5. Histograms
## 수치형 데이터 분포를 정확하게 표현해주는 그래픽이다.
~~~python
# Histograms for benign and maligant tumors
sns.histplot(data = cancer_data,x=cancer_data['Area (mean)'],hue='Diagnosis')
~~~
- 양성 종양(B)과 악성 종양(M) 평균 면적값의 분포를 보여주는 히스토그램이다.
- 악성 종양이 평균적으로 평균 면적이 더 높다.
 
![alt text](/assets/img/Data-visualization/9.%20seaborn.png)
<br><br>
## KDE plot
- 커널 밀도 추정(KDE: KDE: Kernel Density Estimator)은 히스토그램과 방식이 비슷하다.
- 하지만 히스토그램 방식은 구간의 경계에서 불연속성이 나타나거나, 구간의 크기 및 시작 위치에 따라 히스토그램이 달라진다.
- KDE는 이 문제점을 개선해서 각 데이터마다 그 데이터를 중심으로 하는 특정모양의 확률곡선을 그려서 분포를 파악하기 편하다.
  
![alt text](/assets/img/Data-visualization/10.%20seaborn.png)

## 2D KDE plots
![alt text](/assets/img/Data-visualization/11.%20seaborn.png)
<br><br>
# 6. Parameter and Custom Styles

## The style of the figure
~~~ python
# Change the style of the figure to the "dark" theme
sns.set_style("dark")

# Line chart 
plt.figure(figsize=(12,6))
sns.lineplot(data=spotify_data)
~~~
![alt text](/assets/img/Data-visualization/12.%20seaborn.png)
- seaborn은 (1)"darkgrid", (2)"whitegrid", (3)"dark", (4)"white", and (5)"ticks"의 다섯 가지 테마가 있다.
<br><br>
## hue & shade
~~~ python
# KDE plots for each species
sns.kdeplot(data=iris_data, x='Petal Length (cm)', hue='Species', shade=True)

# Add title
plt.title("Distribution of Petal Lengths, by Species")
~~~

![alt text](/assets/img/Data-visualization/13.%20seaborn.png)

- hue : 항목별로 구별해서 색상을 통해 구분
- shade : 곡선 아래 영역을 색칠한다.

<br><br>

![alt text](/assets/img/수료증/김종호-데이터시각화수료증.png)

