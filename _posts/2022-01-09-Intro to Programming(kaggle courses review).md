---
title: 2022-01-09 Intro to Programming(kaggle courses review)
layout: post
image : /assets/img/이수원-수료증.png
categories : Programming, Intro, kaggle
description: "kaggle courese - Intro to Programming"
customexcerpt: "케글 교육과정 중 Intro to Programming을 수료하다!" # 미리보기 글 
---

# Intro to Programming 

### 1. Arthmetic and Variables
_Python is one of the most popular programming languages for data science, and it's the language you'll learn in this course._

#### 1. Printing
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


#### 2. Comments
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
    

#### 3. Variables

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


#### 4. Debugging

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

    c:\Users\user\OneDrive\바탕 화면\동아대\DAU-BigDataTeam\Intro_to_Programming.ipynb 셀 18 in <cell line: 1>()
    ----> <a href='vscode-notebook-cell:/c%3A/Users/user/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EB%8F%99%EC%95%84%EB%8C%80/DAU-BigDataTeam/Intro_to_Programming.ipynb#X21sZmlsZQ%3D%3D?line=0'>1</a> print(exaple_debug)
    

    NameError: name 'exaple_debug' is not defined


---

### 2. Functions
_Organize your code and avoid redundancy._

_A function is a block of code designed to perform a specific task. As you'll see, functions will let you do roughly the same calculation multiple times without duplicating any code._


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

##### Then, **How to run(or "call") a function?**

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
    

---

### 3. Data Types
_Explore integers, floats, booleans, and strings._

**Whenever you create a variable in Python, it has a value with a corresponding data type.**

There are many different data types, such as integers, floats, booleans, and strings, all of which we'll cover in this page.
 
_(This is just a small subset of the available data types -- there are also dictionaries, sets, lists, tuples, and much more.)_

Data types are important, **_because they determine what kinds of actions you can do with them._**

#### **Integers**
ntegers are numbers without any fractional part and can be positive (1, 2, 3, ...), negative (-1, -2, -3, ...), or zero (0).


```python
x = 1
print(x)
print(type(x))
```

    1
    <class 'int'>
    

In the output above, _<class 'int'>_ refers to the integer data type.

_Note : **type()** function verify the data type._

#### **Floats**
Floats are numbers with fractional parts. They can have many numbers after decimal.


```python
pi_num = 3.141592
print(pi_num)
print(type(pi_num))
```

    3.141592
    <class 'float'>
    

In the output above, _<class 'float'>_ refers to the integer data type.


```python
# Also, specift a float with a fraction.
float_cal = 30/4
print(float_cal)
print(type(float_cal))
```

    7.5
    <class 'float'>
    

_**round() function** : lets you round a number to a specified number of decimal places._


```python
# Round to 2 decimal places
round_pi = round(pi_num, 2)
print(round_pi)
print(type(round_pi))
```

    3.14
    <class 'float'>
    

Whenever you write an number with a decimal point, Python recognizes it as a float data type.

For instance, 1. (or 1.0, 1.00, etc) will be recognized as a float.


```python
y = 1.
print(y)
print(type(y))
```

    1.0
    <class 'float'>
    

#### **Booleans**
Booleans represent one of two values: **True** or **False**.


```python
t = True
print(t)
print(type(t))
```

    True
    <class 'bool'>
    


```python
f = False
print(f)
print(type(f))
```

    False
    <class 'bool'>
    

**_1. Booleans are used to represent the truth value of an expression._**


```python
# True Case
t_case = (1 < 2)
print(t_case)
print(type(t_case))

print("_________________")

# False Case
f_case = (30 < 1)
print(f_case)
print(type(f_case))
```

    True
    <class 'bool'>
    _________________
    False
    <class 'bool'>
    

**_2. We can switch the value of a boolean by using not. So, not True is equivalent to False, and not False becomes True._**


```python
# f_case is 'fasle'
not_case = not f_case
print(not_case)
print(type(not_case))
```

    True
    <class 'bool'>
    

#### **Strings**
The string data type is a collection of characters _(like alphabet letters, punctuation, numerical digits, or symbols)_ contained in quotation marks. 

Strings are commonly used to represent text.


```python
str1 = "Hello, World!"
print(str1)
print(type(str1))
```

    Hello, World!
    <class 'str'>
    

**1. len() function :We can get the length of a string.**


```python
len(str1)
```




    13



One special type of string is the empty string, which has length zero.


```python
zero_str = ""
print(type(zero_str))
print(len(zero_str))
```

    <class 'str'>
    0
    

**2. If you put a number in quotation marks, it has a string data type.**


```python
snum = "3.141592"
print(snum)
print(type(snum))
```

    3.141592
    <class 'str'>
    

If we have a string that is convertible to a float, we can use float().

But, tihs won't always work. For example, we can't convert "Hello, World!" to a float


```python
float_snum = float(snum)
print(float_snum)
print(type(float_snum))
```

    3.141592
    <class 'float'>
    

**3. We can also add two string.**

It results in a longer string that combines the two original string by concatenating them.


```python
add_str = "Hello" + "!"
print(add_str)
print(type(add_str))
```

    Hello!
    <class 'str'>
    

_Note : it's not possible to do subtraction or division with two strings. You also can't multiply two strings, but you can multiply a string by an integer. This again results in a string that's just the original string concatenated with itself a specified number of times._


```python
# When it's a Integer, Multiplication is possible.
mul_istr = "Hi! " * 3
print(mul_istr)
print(type(mul_istr))
```

    Hi! Hi! Hi! 
    <class 'str'>
    


```python
# But, When it's a Float, Multiplication is impossible.
mul_fstr = "Hi! " * 3.0
print(mul_fstr)
print(type(mul_fstr))
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    c:\Users\user\OneDrive\바탕 화면\동아대\DAU-BigDataTeam\Intro_to_Programming.ipynb 셀 69 in <cell line: 2>()
          <a href='vscode-notebook-cell:/c%3A/Users/user/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EB%8F%99%EC%95%84%EB%8C%80/DAU-BigDataTeam/Intro_to_Programming.ipynb#Y131sZmlsZQ%3D%3D?line=0'>1</a> # But, When it's a Float, Multiplication is impossible.
    ----> <a href='vscode-notebook-cell:/c%3A/Users/user/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EB%8F%99%EC%95%84%EB%8C%80/DAU-BigDataTeam/Intro_to_Programming.ipynb#Y131sZmlsZQ%3D%3D?line=1'>2</a> mul_fstr = "Hi! " * 3.0
          <a href='vscode-notebook-cell:/c%3A/Users/user/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EB%8F%99%EC%95%84%EB%8C%80/DAU-BigDataTeam/Intro_to_Programming.ipynb#Y131sZmlsZQ%3D%3D?line=2'>3</a> print(mul_fstr)
          <a href='vscode-notebook-cell:/c%3A/Users/user/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EB%8F%99%EC%95%84%EB%8C%80/DAU-BigDataTeam/Intro_to_Programming.ipynb#Y131sZmlsZQ%3D%3D?line=3'>4</a> print(type(mul_fstr))
    

    TypeError: can't multiply sequence by non-int of type 'float'


___

### 4. Conditions and Conditional Statements
_Modify how functions run, depending on the input._

#### **1. Conditions**
In programming, conditions are statements that are either True or False. 

There are many different ways to write conditions in Python, but some of the most common ways of writing conditions just compare two different values.


```python
print(2 > 3)
```

    False
    

For a list of common symbols we can use to construct conditions, check out the chart below.

| Symbol | Meaning |
|:---:|:---|
| `==` | equals |
| `!=` | not equals |
| `< ` | less than |
| `<=` | less than or equal to |
| `>` | greater than |
| `>=` | grager than or equal to | 

**<span style="color:red">!! When you check two values are equal, make sure you use the _==_ sign, and not the = sign.</span>**

#### **2. Conditional statements**
Conditional statements use conditions to modify how your function runs. 

They check the value of a condition, and if the condition evaluates to True, then a certain block of code is executed. 

(Otherwise, if the condition is False, then the code is not run.)

**1. "IF" statement**

The simplest type of conditional statement is an "if" statement.


```python
def if_Func_Exm1(temp) : 
    message = "Normal temperature."
    if temp > 38 :
        message = "Fever! Go to a hospital."
    return message

# This function that because the return statement is not indented under the "if" statement, 
# it is always executed, whether temp > 38 is True or False.
```


```python
if_Func_Exm1(37)
```




    'Normal temperature.'




```python
if_Func_Exm1(39)
```




    'Fever! Go to a hospital.'



Note that there are two levels of **indentation**:

- The first level of indentation is because we always need to indent the code block inside a function.
- The second level of indentation is because we also need to indent the code block belonging to the "if" statement.

**2. "IF..ELSE" statement**

We can use "else" statements to run code if a statement is False. 

The code under the "if" statement is run if the statement is True, and the code under "else" is run if the statement is False.


```python
def if_Func_Exm2(temp) : 
    if temp > 38 :
        message = "Fever! Go to a hospital."
    else :
        message = "Nomal temperature."
    return message
```


```python
if_Func_Exm2(38)
```




    'Nomal temperature.'




```python
if_Func_Exm2(40)
```




    'Fever! Go to a hospital.'



**3. "IF..ELIF..ELSE" statement**

We can use "elif" (which is short for "else if") to check if multiple conditions might be true. 


```python
def if_Func_Exm3(temp) : 
    if temp > 38 :
        message = "Fever! Go to a hospital."
    elif temp > 35 :
        message = "Nomal temperature."
    else :
        message = "Low temperature."
    return message
```


```python
if_Func_Exm3(36)
```




    'Nomal temperature.'




```python
if_Func_Exm3(39)
```




    'Fever! Go to a hospital.'




```python
if_Func_Exm3(15)
```




    'Low temperature.'



___

### 5. List
_Organize your data so you can work with it efficiently._

_When doing data science, you need a way to organize your data so you can work with it efficiently._

_Python has many data structures available for holding your data, such as lists, sets, dictionaries, and tuples._



```python
computer_Language = ["C", "C++", "JAVA", "Javascript", "HTML"]

print(computer_Language)
print(type(computer_Language))
```

    ['C', 'C++', 'JAVA', 'Javascript', 'HTML']
    <class 'list'>
    

At first glance, it doesn't look too different, whether you represent the information in a Python string or list.

But as you will see, there are a lot of tasks that you can more easily do with a list. 

- get an item at a specified position
- check the number of items, and
- add and remove items.

#### **1 Length**

We can count the number of entries in any list with len(), which is short for "length". 

You need only supply the name of the list in the parentheses.


```python
# The list has 5 entries.
print(len(computer_Language))
```

    5
    

#### **2. Indexing**

We can refer to any item in the list according to its position in the list. This is called indexing.

- to pull the first entry in the list, you use 0
- to pull the second entry in the list, you use 1, and
- to pull the final entry in the list, you use one less than the length of the list.


```python
print("Frist Entry : ", computer_Language[0])
print("Second Entry : ", computer_Language[1])

# The list has lenghth five. so we refer to final entry with 4
print("Last Entry : ", computer_Language[4])
```

    Frist Entry :  C
    Second Entry :  C++
    Last Entry :  HTML
    

#### **3. Slicing**
You can also pull a segment of a list (for instance, the first three entries or the last two entries). This is called slicing.

- to pull the first x entries, you use [:x], and
- to pull the last y entries, you use [-y:].


```python
print("Frist two entries : ", computer_Language[:2])
print("Last three entries : ", computer_Language[-3:])
```

    Frist two entries :  ['C', 'C++']
    Last three entries :  ['JAVA', 'Javascript', 'HTML']
    

#### **4. Removing items**

Remove an item from a list with **.remove()** function, and put the item you would like to remove in parentheses.


```python
computer_Language.remove("HTML")
print(computer_Language)
```

    ['C', 'C++', 'JAVA', 'Javascript']
    

#### **5. Adding items**

Add an item to a list with **.append()** function, and put the item you would like to add in parentheses.


```python
computer_Language.append("Python")
print(computer_Language)
```

    ['C', 'C++', 'JAVA', 'Javascript', 'Python']
    

So far, we have only worked with lists where each item in the list is a string. 

**<span style="color:Red">But lists can have items with any data type, including booleans, integers, and floats.</span>**


```python
# Here, we have Integer List. 
num_list = [3, 50, 1, 25, 33, 45, 66, 2, 14, 39]
```

We can get the minimum with **min()** and the maximum with **max()** in num_list.


```python
print("Minimum : ", min(num_list))
print("Maximum : ", max(num_list))
```

    Minimum :  1
    Maximum :  66
    

To add every item in the list, use **sum()**.


```python
print("Total sum : ", sum(num_list))
```

    Total sum :  278
    

_<span style="background-color:blue">Not just Integer List, Float List also possible.</span>_

___

