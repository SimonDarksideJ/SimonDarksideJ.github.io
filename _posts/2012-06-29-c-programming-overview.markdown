---
layout: post
title: C# Programming Overview
date: '2012-06-29 09:10:55'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

### 1. Introduction

_C#_ is a new, simple programming language based on the older programming language called _C++_. The similarities between _C#_ and _C++_ are easily notified. This chapter is an overview of the _C#_ programming language. In this chapter we might use some instructions or expressions without explaining their meaning. These materials will be covered in subsequent chapters.

The original digipen webcast for this session can be found [here on the codeplex site for this tutorial](http://startrooper2dxna.codeplex.com/releases/view/43622)

As this section is quite lengthy, I am going to push it out in just over one week. Most of the C# programming concepts are easy to pick up and it is still worthwhile glancing over at least once even if you are familiar already with C#.

As in previous sections, where the Digipen tutorial differs from XNA and also where new improvements in .NET 3.5 and /NET 4 arise, I will comment as appropriate.

Another good reference for this section of the series is the following webcast – [MSDN Video – introduction to C# language](https://msevents.microsoft.com/CUI/WebCastEventDetails?EventID=1032333532&EventCategory=5&culture=en-US&CountryCode=US). The available content on the Microsoft events webcasts are always invaluable.

Over the course of the next week or so, this section of the tutorial will be covering (I’ll update with links as each is posted):

- [Types](/2010/04/26/c-programming-overview-continued-types "Types")
- [Variables](/2010/04/26/c-programming-overview-continued-variables "Variables")
- [Expressions](/2010/04/27/c-programming-overview-continued-expressions-statements-amp-operators "Expressions")
- [Functions](/2010/04/27/c-programming-overview-continued-functions "Functions")
- [Flow Control](/2010/04/28/c-programming-overview-continued-flow-control "Flow Control")
- [Classes](/2010/04/28/c-programming-overview-continued-classes "Classes")
- [Arrays](/2010/04/29/c-programming-overview-continued-arrays "Arrays")
- [Structures](/2010/04/29/c-programming-overview-continued-structures "Structures")
- [Miscellaneous features](/2010/04/30/c-programming-overview-continued-miscellaneous "Miscellaneous (Digipen)")
- New features in .NET 3.5 and 4.0 (as the original DigiPen tutorial was written in .NET 2.0)

The overview below previews some of the facilities above as an introduction before we delve into detail.

P.S

I highly recommend the “[Plugin Collection for Windows Live Writer”](http://wlwplugincollection.codeplex.com/) Code Snippet plug-in for windows live writer fro inserting code into your blogs.  It is highly customisable and has a very good interface (which you can even turn off for repeated inserts in the same style.

* * *

### 2. The Smallest C# Program

| static void Main( )

{

}

 | OR | static void Main( ) { } |

The main function is the entry point of a _C#_ program. All standard _C#_ programs start by executing the content of the main function. However, this program does not do anything because the main function does not have instructions.

Facts:

- An open and close parenthesis is placed after the function name.
- Parentheses are used to hold the function arguments.
- The type of the value returned by the function is specified before the function name.
- Void is a _C#_ type specifying a typeless type.
- The body of the function is written within the function block specified by the open and close curly braces.
- The _C#_ programming language is a free format language.

* * *

### 3. Displaying a Message

The canonical “hello, world” program can be written as follows:

    using System; class Hello { static void Main() { Console.WriteLine(“hello, world”); } }

The source code for a _C#_ program is typically stored in one or more text files with a file extension of .cs, as in hello.cs. Using the command-line compiler, such a program can be compiled with the command line

Directive

> csc hello.cs

Which produces an application named hello.exe. The output produced by this application when it is run is:

> hello, world

Close examination of this program is illuminating:

- The _using System_; directive references a namespace called System. This namespace contains the Console class referred to in the _Main_ method. Namespaces provide a hierarchical means of organising the elements of one or more programs. A “using” directive enables unqualified use of the types that are members of the namespace. The “hello, world” program uses _Console.WriteLine_ as shorthand for _System.Console.WriteLine_. (For the sake of brevity, most examples in this specification omit the _using System_; directive.)
- The _Main_ method is a member of the class Hello. The entry point for an application—the method that is called to begin execution—is always a static method named _Main_.
- The “hello, world” output is produced using a class library. The language does not itself provide a class library. Instead, it uses a class library that is also used by other programming languages.

* * *

### 4. Comments

Two forms of comments are supported: single-line comments and delimited comments. **_Single-line comments_** start with the characters // and extend to the end of the source line. **_Delimited comments_** start with the characters /\* and end with the characters \*/. Delimited comments may span multiple lines.

Comments do not nest. The character sequences /\* and \*/ have no special meaning within a // comment, and the character sequences // and /\* have no special meaning within a delimited comment.

The example below includes a delimited comment.

    using System; /\* Hello, world program This program writes “hello, world” to the console \*/ class Hello { static void Main() { Console.WriteLine(“hello, world”); } }

The following example shows several single-line comments.

    using System; // Hello, world program // This program writes “hello, world” to the console // class Hello // any name will do for this class { static void Main() // this method must be named “Main” { Console.WriteLine(“hello, world”); } }

* * *

### 5. Multiple Instructions Program

A function is a block of code written to perform a specific task (“function”) and packaged in a unit so that it can be executed at desired points in a program. Dividing a program into separate functions makes the program more manageable and easier to understand.

    class hello { static void Main() { DisplayHello();DisplayWorld(); DisplayHelloWorld(); } /\* Function definition \*/ static void DisplayHello() { Console.WriteLine("Hello"); } static void DisplayWorld() { Console.WriteLine("World"); } static void DisplayHelloWorld() { Console.WriteLine("Hello World"); } }

Facts:

- The program contains three user functions.
- Functions need to be defined before being used or executed.
- The main function contains three function calls or three statements.
- User functions are declared outside the main function.
- Functions can be called many times.
- The program starts by executing the first instruction in Main, which is the DisplayHello function.
- When the DisplayHello function is called, the execution flow changes to the first instruction within the function definition of DisplayHello.
- When the last instruction (which is also the first instruction) of the function DisplayHello is executed, the execution returns to the instruction right after the function call, which is DisplayWorld.

* * *

### 6. Functions with Argument Returning a Value

A function contains the parameters and the return type. The _parameters_ provide data needed by the function to do its job. For each parameter specify its name and data type; if no parameters are needed, specify the keyword void inside the parentheses. The _return type_ specifies the data type of the data that is returned by the function.

Some functions do not return any data; in this case specify the keyword void as the return type.

Example:

> void foo();
> 
> void foo(int i);
> 
> int foo();
> 
> int foo(int i);

    class hello { static void Main( ) { Console.WriteLine("{0}",Add(3,5)); } /\* Function definition \*/ static int Add(int x, int y) { return x+y; } }

Facts:

- _int_ is a _C#_ type specifying whole or integral numbers.
- _int_ means integer.
- The function prototype specifies that the function takes two integer arguments and returns an integer.
- When a function has more than one argument, a comma is used to separate the arguments.
- When a function with arguments is called, the arguments are received as parameters by the function where the function’s instructions are specified.
- When arguments are passed to the parameters, the order of the arguments is respected. In our case, _x_ would be equal to 3 and _y_ would be equal to 5.
- The last statement of the function definition returns the result of the arithmetic expression _x + y_.
- _x_ and _y_ are called variables. A variable is a name assigned to a data storage location.
- The variables _x_ and _y_ are defined in the parameter list of the function: (int x, int y).
- In _C#_, a variable must be defined before it can be used.
- A variable definition specifies its name and type.
- The compiler uses the type in order to know how much memory to allocate.

* * *

### 7. Variables

    class add { static void Main( ) { int i,j; i=3; j=5; Console.WriteLine("{0}", Add(i,j)); } static int Add(int x, int y) { return x+y; } }

Facts:

- Two integer variables _i_ and _j_ are declared and defined.
- By declaration, we mean that the rest of the function main knows about the presence and type of _i_ and _j_.

    class test { static void Main( ) { int x1=2,y1=1,x2=7,y2=3; Console.WriteLine("{0}", Distance(x1,y1,x2,y2)); } static double Distance(int x1, int y1, int x2, int y2) { int deltaX, deltaY; deltaX=x2-x1; deltaY=y2-y1; return Math.Sqrt(deltaX\*deltaX + deltaY\*deltaY); } }

In other words, the scope and type of _i_ and _j_ is within the body of function main. Then, an assignment operator is used in order to assign the value 3 and 5 to i and _j_ respectively. The function Add is used by having two variables as arguments, while in the previous example the arguments were constants.

* * *

Part 2 of overview next

