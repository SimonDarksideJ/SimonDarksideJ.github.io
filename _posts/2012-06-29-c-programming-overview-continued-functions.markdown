---
layout: post
title: C# Programming Overview continued - Functions
date: '2012-06-29 09:19:01'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

#### Functions are at the core of the C# programming language, they define jobs to do in code, setting out a group of instructions to perform an action or resolve some calculation based a set of input.  Functions of course do a lot more as you will see here.

* * *

### 1. Definition

The definition of a function includes the return type, the function name, the parameters’ list, and the function body.

The function body is enclosed between an opening and a closing brace. Example:

     1: int add(int a, int b)

<!--CRLF-->

     2: {

<!--CRLF-->

     3:return a + b;

<!--CRLF-->

     4: }

<!--CRLF-->

The parameters _a_ and _b_ receive the values of the arguments when the function is called. Example:

     1: int n;

<!--CRLF-->

     2: n = add(4,5);

<!--CRLF-->

* * *

### 2. Scope

The code found in a function is private to the function and cannot be accessed by any statement from another function. Function code is accessed only through function call.

A _C#_ program starts from the function Main. All functions have a file scope. Parameters and variables declared inside the function have function scope. They are created when the function is entered and destroyed when the function ends. Static variables declared inside the function have a function scope, but they retain their values between function calls.

* * *

### 3. Calling a Function

A function is called by using its name followed by an opening and closing parenthesis including the arguments, if any. If the function has no arguments, then the argument list is left empty. When a function is called, the function parameters receive the value of the arguments by respecting their order. Parameter1 receives the value of argument1, and ParameterN receives the value of argumentN.

When a function is called, the sequential execution flow is interrupted, and the program counter jumps to the first statement of the function called. Once the last statement is executed, or a return instruction is executed, the sequential execution flow is interrupted and the program counter is updated so it points to the next instruction after the function call. The return instruction or statement also returns a value since the function has a returning type. In other words, the function could be used as value specified by its type.

* * *

### 4. “return” Statement Example

A **return** statement stops the operation of the function and sends back the current return value of the function at that time. 

It is important to note that if a **return** is specified inside a loop contained in a function (this can also cause errors), then the function will stop, return the value and not perform any of the remaining code in the function.  It is better (as shown below) for the return to be called at the conclusion of an opperation. 

E.G. if x then return x else return y.

**returns** can also only be a single type, class or struct.

Example:

     1: class test

<!--CRLF-->

     2: {

<!--CRLF-->

     3:struct box

<!--CRLF-->

     4: {

<!--CRLF-->

     5:public float left;

<!--CRLF-->

     6:public float top;

<!--CRLF-->

     7:public float right;

<!--CRLF-->

     8:public float bottom;

<!--CRLF-->

     9: }

<!--CRLF-->

     10:

<!--CRLF-->

     11:static float Maximum(float v1, float v2)

<!--CRLF-->

     12: {

<!--CRLF-->

     13:if(v1\>v2)

<!--CRLF-->

     14:return v1;

<!--CRLF-->

     15:else

<!--CRLF-->

     16:return v2;

<!--CRLF-->

     17: }

<!--CRLF-->

     18:

<!--CRLF-->

     19:static float Minimum(float v1, float v2)

<!--CRLF-->

     20: {

<!--CRLF-->

     21:if(v1\<v2)

<!--CRLF-->

     22:return v1;

<!--CRLF-->

     23:else

<!--CRLF-->

     24:return v2;

<!--CRLF-->

     25: }

<!--CRLF-->

     26:

<!--CRLF-->

     27:static bool Intersect(float v1, float v2)

<!--CRLF-->

     28: {

<!--CRLF-->

     29:if(v1-v2\<=0)

<!--CRLF-->

     30:return true;

<!--CRLF-->

     31:else

<!--CRLF-->

     32:return false;

<!--CRLF-->

     33: }

<!--CRLF-->

     34:

<!--CRLF-->

     35:static void Main()

<!--CRLF-->

     36: {

<!--CRLF-->

     37: box b1, b2;

<!--CRLF-->

     38: Console.WriteLine(“Enter the left, top, right, and bottom coordinates of b1:”);

<!--CRLF-->

     39:

<!--CRLF-->

     40:/\* the input from keyboard is stored in the structure members \*/

<!--CRLF-->

     41:

<!--CRLF-->

     42: b1.left = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     43: b1.top = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     44: b1.right = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     45: b1.bottom = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     46: Console.WriteLine(“Enter the left, top, right, and bottom coordinates of b2:”);

<!--CRLF-->

     47: b2.left = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     48: b2.top = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     49: b2.right = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     50: b2.bottom = Int32.Parse(Console.ReadLine());

<!--CRLF-->

     51:

<!--CRLF-->

     52:if(Intersect(Maximum(b1.left,b2.left)-Minimum(b1.right,b2.right),

<!--CRLF-->

     53: Minimum(b1.bottom,b2.bottom)-Maximum(b1.top,b2.top)))

<!--CRLF-->

     54: Console.WriteLine(“b1 and b2 intersect\n”);

<!--CRLF-->

     55:else

<!--CRLF-->

     56: Console.WriteLine(“b1 and b2 do not intersect\n”);

<!--CRLF-->

     57: }

<!--CRLF-->

     58: }

<!--CRLF-->

* * *

### 5. Call by Value Function Arguments

Arguments can be passed in two ways: Call by value and call by reference. The call by value method copies the value of the argument into the function parameter. Therefore, changes made to the parameter have no effect on the argument. In other words, the function code cannot modify the arguments used to call the function.

Example:

     1: class test

<!--CRLF-->

     2: {

<!--CRLF-->

     3:static void Main()

<!--CRLF-->

     4: {

<!--CRLF-->

     5:int x;

<!--CRLF-->

     6: x=10;

<!--CRLF-->

     7: callByValue(x);

<!--CRLF-->

     8: Console.WriteLine(“The argument x was not modified by the function: x={0}”,x);

<!--CRLF-->

     9: }

<!--CRLF-->

     10:

<!--CRLF-->

     11:static void callByValue(int x)

<!--CRLF-->

     12: {

<!--CRLF-->

     13: x=20;

<!--CRLF-->

     14: }

<!--CRLF-->

     15: }

<!--CRLF-->

* * *

### 6. Call by Reference Function Arguments

To pass a parameter by reference, use the ref or out keyword. A variable of a reference type does not contain its data directly; it contains a reference to its data. When you pass a reference-type parameter by value, it is possible to change the data pointed to by the reference, such as the value of a class member. However, you cannot change the value of the reference itself; that is, you cannot use the same reference to allocate memory for a new class and have it persist outside the block. To do that, pass the parameter using the ref (or out) keyword.

Example:

     1: class test

<!--CRLF-->

     2: {

<!--CRLF-->

     3:static void Main()

<!--CRLF-->

     4: {

<!--CRLF-->

     5:int x=10, y=20;

<!--CRLF-->

     6: Console.WriteLine(“Before calling swap: x={0}, y={1}”,x,y);

<!--CRLF-->

     7:

<!--CRLF-->

     8:/\* call by reference arguments\*/

<!--CRLF-->

     9: swap(ref x,ref y);

<!--CRLF-->

     10: Console.WriteLine(“After calling swap: x={0}, y={1}”,x,y);

<!--CRLF-->

     11: }

<!--CRLF-->

     12:

<!--CRLF-->

     13:/\* call by reference parameters\*/

<!--CRLF-->

     14:static void swap(ref int p1,ref int p2)

<!--CRLF-->

     15: {

<!--CRLF-->

     16:int tmp;

<!--CRLF-->

     17: tmp = p1; /\*Saving p1 in tmp\*/

<!--CRLF-->

     18: p1 = p2; /\*p1 takes the value of p2\*/

<!--CRLF-->

     19: p2 = tmp; /\*p2 takes the value of tmp\*/

<!--CRLF-->

     20: }

<!--CRLF-->

     21: }

<!--CRLF-->

     22:  

<!--CRLF-->

* * *
