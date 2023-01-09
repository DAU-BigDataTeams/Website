---
title: 2022-01-09 Intro to Programming(kaggle courses review)
layout: post
categories : Programming, Intro, kaggle
description: "kaggle courese - Intro to Programming"
customexcerpt: "케글 교육과정 중 Intro to Programming을 수료하다!" # 미리보기 글 
---

# Intro to Programming 

## 1. Arthmetic and Variables
Python is one of the most popular programming languages for data science, and it's the language you'll learn in this course.

### 1. Printing
One of the simplest (and most important!) tasks you can ask a computer to do is to print a message.

In Python, we ask a computer to print a message for us by writing _print()_ and <u>putting the message inside the parentheses and enclosed</u> in quotation marks.

The code is inside the box (known as a code cell), and the computer's response (called the output of the code) is shown below the box. As you can see, the computer printed the message that we wanted.


```python
print("Hello, World!")
```

    Hello, World!
    

We can also print the value of some arithmetic operation (such as addition, subtraction, multiplication, or division).




```python
print(1+2)
print(3-2)
print(4*5)
print(6/3)
```

    3
    1
    20
    2.0
    


| Operation | Symbol | Example |
|:---|:---:|:---|
| `Addtion` | + | 1 + 2 = 3 |
| `Substraction` | - | 5 - 4 = 1 |
| `Multiplication` | * | 2 * 4 = 8 |
| `Division` | / | 6 / 3 = 2 |
| `Exponent` | ** | 3 ** 2 = 9 | 


### 2. Comments
We use comments to annotate what code is doing. They help other people to understand your code, and they can also be helpful if you haven't looked at your own code in a while. 

So far, the code that we have written is very short, but annotations become more important when you have written a lot of code.

To indicate to Python that a line is comment (and not Python code), you need to write a pound sign **#**  as the very first character.




Once Python sees the pound sign and recognizes that the line is a comment, it is completely ignored by the computer. 

This is important, because just like English or Hindi (or any other language!), Python is a language with very strict rules that need to be followed. Python is stricter than a human listener, though, and will just error if it can't understand the code.


```python
# And '#' this is a Comment Character. 
print("Hi! This is Comment #.")
```

    Hi! This is Comment #.
    

### 3. Variables

So far, you have used code to make a calculation and print the result, and the result isn't saved anywhere. 

However, you can imagine that you might want to save the result to work with it later. For this, you'll need to use variables.


```python
# Creating a Variable called 'result' and give it a value of 4 + 5
result = 4 + 5

# Print the value of result
print(result)
```

    9
    

In general, to work with a variable, you need to begin by selecting the name you want to use. 

Variable names are ideally short and descriptive. They also need to satisfy several requirements.

- They can't have spaces 
- They can only include letters, numbers, and underscores
- They have to start with a letter or underscore

Then, to create the variable, you need to use = to assign the value that you want it to have.

You can always take a look at the value assigned to the variable by using print() and putting the name of the variable in parentheses.


### 4. Debugging

It refers to the process of finding and correcting logical errors or abnormal operations (bugs) of a system that occur during the development stage of a computer program. 

In general, debugging methods include checking on tests, testing using machines, and testing using actual data.

Below is an example of a simple variable name error.


```python
example_debug = "Error!"
```


```python
print(exaple_debug)
```


    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    c:\Users\user\OneDrive\바탕 화면\동아대\DAU-BigDataTeam\Intro_to_Programming.ipynb 셀 15 in <cell line: 1>()
    ----> <a href='vscode-notebook-cell:/c%3A/Users/user/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EB%8F%99%EC%95%84%EB%8C%80/DAU-BigDataTeam/Intro_to_Programming.ipynb#X21sZmlsZQ%3D%3D?line=0'>1</a> print(exaple_debug)
    

    NameError: name 'exaple_debug' is not defined


## 2. Functions
Organize your code and avoid redundancy.

A function is a block of code designed to perform a specific task. As you'll see, functions will let you do roughly the same calculation multiple times without duplicating any code.


```python
# Define the function, Simple Example
def num_add(num1, num2):
    add_result = num1 + num2
    return add_result
```

#### **_Every function is composed of two pieces: a header and body_**

**Header**
The function header defines the name of the function and its argument(s).

- Every function header begins with def, which tells Python that we are about to define a function.
- In the simple example, the function name is 'num_add'
- In the simple example, the arguments are 'num1' and 'num2'. The argument is the name of the variable that will be used as input to the function. It is always enclosed in parentheses that apppear immediately after the name of the function. _(Note that a function can also have no arguments, or it can have multiple arguments.)_
- For every function, the parentheses enclosing the function argument(s) must be followed by a colon **:**.

**Body**
The function body specifies the work that the function does.

- Every line of code in the function body must be indented exactly four spaces. You can do this by pushing the space bar four times, or by hitting the "Tab" button once on your keyboard.
- The function does its work by running all of the indented lines from top to bottom.

The code cell above just defines the function, but does not run it. The details of the function body will make more sense after the next code cell, when we actually run the function.

Then, **How to run(or "call") a function?**

The code cell above just defines the function, but does not run it. The details of the function body will make more sense after the next code cell, when we actually run the function.

In the code cell below, we run the function with 5, 6 as the input value. We define a new variable 'add_func_test' which is set to the output of the function


```python
# Run the function with 5, 6 as input
add_func_test = num_add(5, 6)

# Check that the value is 11, as expected
print(add_func_test)
```

    11
    

In more detail. num_add(5, 6) is the value that we get as output when we supply 5, 6 as the value for num1, num2, and call the num_add() function.

When the function runs, it runs all of the code in its body, from top to bottom.

_Note :  When naming your own functions, you should use only lowercase letters, with words separated by underscores instead of spaces._

_Naming functions will feel natural over time, and it is normal for it to feel uncomfortable at first. The best way to learn is by viewing a lot of Python code._

#### **_Variable "scope"_**
Variables defined inside the function body cannot be accessed outside of the function


```python
print(add_result)
```


    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    c:\Users\user\OneDrive\바탕 화면\동아대\DAU-BigDataTeam\Intro_to_Programming.ipynb 셀 26 in <cell line: 1>()
    ----> <a href='vscode-notebook-cell:/c%3A/Users/user/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EB%8F%99%EC%95%84%EB%8C%80/DAU-BigDataTeam/Intro_to_Programming.ipynb#X35sZmlsZQ%3D%3D?line=0'>1</a> print(add_result)
    

    NameError: name 'add_result' is not defined


We refer to a variable's scope as the part of the code where it is accessible. 

**Variables defined inside a function (add_result) have a local scope of that function only.**

However, as you've seen, _variables defined outside all functions (result) have a global scope and can be accessed anywhere._


```python
# 'result' is Global variables in the previous example.
print(result)
```

    9
    
```작성자 : 20학번 이수원```