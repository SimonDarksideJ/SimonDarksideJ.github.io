---
layout: post
title: C# Programming Overview continued - Functions
date: 2012-06-29 09:19:01
tags: [2d tutorial, game development, xna]
---

## Functions are at the core of the C# programming language, they define jobs to do in code, setting out a group of instructions to perform an action or resolve some calculation based a set of input. Functions of course do a lot more as you will see here.

* * *

### 1. Definition

The definition of a function includes the return type, the function name, the parameters' list, and the function body.

The function body is enclosed between an opening and a closing brace. Example:

```csharp
int add(int a, int b)
{
    return a + b;
}
```

The parameters *a* and *b* receive the values of the arguments when the function is called. Example:

```csharp
int n;
n = add(4,5);
```

* * *

### 2. Scope

The code found in a function is private to the function and cannot be accessed by any statement from another function. Function code is accessed only through function call.

A *C#* program starts from the function Main. All functions have a file scope. Parameters and variables declared inside the function have function scope. They are created when the function is entered and destroyed when the function ends. Static variables declared inside the function have a function scope, but they retain their values between function calls.

* * *

### 3. Calling a Function

A function is called by using its name followed by an opening and closing parenthesis including the arguments, if any. If the function has no arguments, then the argument list is left empty. When a function is called, the function parameters receive the value of the arguments by respecting their order. Parameter1 receives the value of argument1, and ParameterN receives the value of argumentN.

When a function is called, the sequential execution flow is interrupted, and the program counter jumps to the first statement of the function called. Once the last statement is executed, or a return instruction is executed, the sequential execution flow is interrupted and the program counter is updated so it points to the next instruction after the function call. The return instruction or statement also returns a value since the function has a returning type. In other words, the function could be used as value specified by its type.

* * *

### 4. "return" Statement Example

A **return** statement stops the operation of the function and sends back the current return value of the function at that time.

It is important to note that if a **return** is specified inside a loop contained in a function (this can also cause errors), then the function will stop, return the value and not perform any of the remaining code in the function.  It is better (as shown below) for the return to be called at the conclusion of an operation.

E.G. if x then return x else return y.

**returns** can also only be a single type, class or struct.

Example:

```csharp
class test
{
    struct box
    {
        public float left;
        public float top;
        public float right;
        public float bottom;
    }
    static float Maximum(float v1, float v2)
    {
        if(v1>v2)
            return v1;
        else
            return v2;
    }
    static float Minimum(float v1, float v2)
    {
        if(v1<v2)
            return v1;
        else
            return v2;
    }
    static bool Intersect(float v1, float v2)
    {
        if(v1-v2<=0)
            return true;
        else
            return false;
    }
    static void Main()
    {
        box b1, b2;
        Console.WriteLine("Enter the left, top, right, and bottom coordinates of b1:");
        /* the input from keyboard is stored in the structure members */
        b1.left = Int32.Parse(Console.ReadLine());
        b1.top = Int32.Parse(Console.ReadLine());
        b1.right = Int32.Parse(Console.ReadLine());
        b1.bottom = Int32.Parse(Console.ReadLine());
        Console.WriteLine("Enter the left, top, right, and bottom coordinates of b2:");
        b2.left = Int32.Parse(Console.ReadLine());
        b2.top = Int32.Parse(Console.ReadLine());
        b2.right = Int32.Parse(Console.ReadLine());
        b2.bottom = Int32.Parse(Console.ReadLine());
        if(Intersect(Maximum(b1.left,b2.left)-Minimum(b1.right,b2.right),
            Minimum(b1.bottom,b2.bottom)-Maximum(b1.top,b2.top)))
            Console.WriteLine("b1 and b2 intersect\n");
        else
            Console.WriteLine("b1 and b2 do not intersect\n");
    }
}
```

* * *

### 5. Call by Value Function Arguments

Arguments can be passed in two ways: Call by value and call by reference. The call by value method copies the value of the argument into the function parameter. Therefore, changes made to the parameter have no effect on the argument. In other words, the function code cannot modify the arguments used to call the function.

Example:

```csharp
class test
{
    static void Main()
    {
        int x;
        x=10;
        callByValue(x);
        Console.WriteLine("The argument x was not modified by the function: x={0}",x);
    }
    static void callByValue(int x)
    {
        x=20;
    }
}
```

* * *

### 6. Call by Reference Function Arguments

To pass a parameter by reference, use the ref or out keyword. A variable of a reference type does not contain its data directly; it contains a reference to its data. When you pass a reference-type parameter by value, it is possible to change the data pointed to by the reference, such as the value of a class member. However, you cannot change the value of the reference itself; that is, you cannot use the same reference to allocate memory for a new class and have it persist outside the block. To do that, pass the parameter using the ref (or out) keyword.

Example:

```csharp
class test
{
    static void Main()
    {
        int x=10, y=20;
        Console.WriteLine("Before calling swap: x={0}, y={1}",x,y);
        /* call by reference arguments*/
        swap(ref x,ref y);
        Console.WriteLine("After calling swap: x={0}, y={1}",x,y);
    }
    /* call by reference parameters*/
    static void swap(ref int p1,ref int p2)
    {
        int tmp;
        tmp = p1; /*Saving p1 in tmp*/
        p1 = p2; /*p1 takes the value of p2*/
        p2 = tmp; /*p2 takes the value of tmp*/
    }
}
```

* * *
