---
title: Formattingadwda
layout: post
categories: [Tips, Markdown, Typography]
customexcerpt: "더 심화적인 블로그 포스트를 작성하는 방법을 소개합니다!"
---
In this post I will showcase some of the "special" features of YAMT.  
This post is pretty long, so let's start with a Table of Content (ToC).

* random line to make it work. This will be removed.
{:toc}


Code:
``` 
* random line to make it work. This will be removed.
{:toc}
``` 
**위 2줄은 항상 세트임을 명심하자**

### Syntax Highlight
In YAMT you can highlight code in various ways.

Basic example:
``` java
public static void main (String[] args){
    System.out.println("Hello World!");
}
```
Code:
``` 
    ``` lang(언어)
        //코드 작성 
    ```
```    
    
<br>

Example:  
{% highlight java %}  
public static void main (String[] args){  
    System.out.println("Hello World!");  
}   
{% endhighlight %}  

Code:
``` 
    {/% highlight 언어 %}
        // 코드 
    {/% endhighlight 언어 %}
    // 반드시 % 앞에있는 /는 제거하고 사용 할 것!
```

<br>

With line numbers:  
{% highlight java linenos%}  
public static void main (String[] args){  
    System.out.println("Hello World!");   
}  
{% endhighlight %}  

Code:
``` 
    {/% highlight 언어 linenos%}
        // 코드 작성
    {/% endhighlight 언어 %}
    // 반드시 % 앞에있는 /는 제거하고 사용 할 것!
```

<br>

<br>

지원되는 언어 목록: [Rouge Wiki](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers).


**Note**: In /assets/css/syntax.css you can change the first declaration to choose if you want a scrollbar or text wrap.

### MathJAX and LaTeX 수학식 작성 법

Block:  

$$  \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant $$

{% highlight tex %}
$$  \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant $$
{% endhighlight %}

Inline: $$  \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant $$

{% highlight tex %}
$$  \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant $$
{% endhighlight %}  

Another block:
\\[ \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant \\]

{% highlight tex %}
\\[ \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant \\]
{% endhighlight %}  

Another inline: \\( \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant \\)

{% highlight tex %}
\\( \frac{v^2} {2} + {g}{z} + \frac{p} {ρ} = constant \\)
{% endhighlight %}  



### Alerts(알림 효과?)
<span class = "alert r">Warning!</span>
``` html
<span class = "alert r"></span>
```
<span class = "alert g">Solved.</span>
``` html
<span class = "alert g"></span>
```
<span class = "alert y">Careful.</span>
``` html
<span class = "alert y"></span>
```