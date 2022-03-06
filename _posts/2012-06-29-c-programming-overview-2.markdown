---
layout: post
title: C# Programming Overview (2)
date: '2012-06-29 09:13:15'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

*Continued from previous post*

## 8. User Input

An address is a number that is assigned to each byte in a computer’s memory. It is used to track where data and instructions are stored in memory. Each byte is assigned an address whether or not it is being used to store data.

Facts:

- Instead of using the assignment operator to assign value to the variables, the input function ReadLine is used.
- This is an arithmetic expression. 

```csharp
     class test
     {
          static void Main()
          {
               int i,j;
               Console.Write("Enter i: ");

               i = Int32.Parse(Console.ReadLine());

               Console.Write("Enter j: ");

               j = Int32.Parse(Console.ReadLine());

               Console.WriteLine(Add(i,j));
          }

          static int Add(int x, int y)
          {
               return x+y;
          }
     }
```

Facts:

- Four variables of type integer are declared, defined, and assigned a value. int x1=2,y1=1,x2=7,y2=3;
- In _C#_, you can assign an initial value to a variable during the declaration.
- The function Distance takes four integer arguments and returns a value of type double.
- The _C#_ double type allows the variable to have a value with fraction.
- A value with fraction is made from an integral part followed by a decimal point followed by the precision (5.3851648071345).
- The function Distance requires a square root calculation.
- The square root function Sqrt is defined in the namespace called Math.
- The function Distance declares and defines six variables: x1,y1,x2,y2,deltaX, and deltaY.
- Remember that variables declared inside a function are only available while executing the function.
- deltaX and deltaY are used to hold the difference between the first and the second point.
- The statement deltaX=x2-x1; subtract x1 from x2 then assign the result to deltaX.
- In **C#** arithmetic, the multiplication * operator is evaluated from left to right.
- The multiplication operator has a higher order of precedence than the addition operator.
- This is why deltaX*deltaX is evaluated first to 25.
- Next deltaY*deltaY is evaluated to 4.
- Then 25 and 4 are added evaluating to 29.
- Then the square root of 29 is evaluated to 5.3851648071345. 

## 9. Conditional Expression

```csharp
     class test
     {
          static void Main()
          {
               int i;
               string s;

               Console.WriteLine("Enter a number then press return:");
               i = Int32.Parse(Console.ReadLine());

               if(i>100)
               {
                    Console.WriteLine("{0} is larger than 100", i);
               }
               else
               {
                    Console.WriteLine("{0} is less or equal than 100",i);
               }
          }
     }
```

Facts:

- i>100 is the Boolean expression that evaluates to true or false.
- If the expression is true, then the statement (or the block of statements enclosed between an opening and a closing curly braces) following the condition is executed.
- If the expression is false then the statement following the condition is skipped.
- The statement following the else is executed only when the conditional expression is false.
- In other words, only one of the WriteLine statements will be executed.
- The conditional statement starts with the keyword if followed by an opening parenthesis, followed by a Boolean expression, followed by a closing parenthesis, followed by an instruction: 

```csharp
     if(Boolean expression) instruction;
```

Notice that there is no semicolon after the closing parenthesis of the Boolean expression because the conditional statement has not ended yet.

## 10. Loops

```csharp
     class test
     {
          static void Main()
          {
               int i;

               for(i=0;i<10;i=i+1)
               {
                    Console.Write("{0} ",i);
               }

               Console.Write("\n");
               
               i=0;

               while(i<10)
               {
                    Console.Write("{0} ",i);
                    i=i+1;
               }
          }
     }
```

Facts:

- The for loop form is: 

> for (expression1 ;expression2 ;expression3 ) statement

- The loop is initialized through _expression1_ i=0;
- _Expression2_ specifies the test made before each iteration i<10;
- If _expression2_ is true, the statement Console.Write(“{0} “,i); is executed, then _expression 3_ i=i+1 is executed.
- The loop iterates until _expression2_ is false.
- If _expression2_ is false, the for loop will exit, and the control is transferred to the statement following the statement.
- _Expression3_ is evaluated after each iteration.
- Any or all of the three for expressions may be omitted, but the semicolon must remain.
- The while loop form is: while (expression) statement 

If _expression_ i<10 is true, the statement is executed until _expression_ becomes false. In our case the statement is made from a block enclosed between curly braces:

```csharp

     {
          Console.WriteLine(“{0} “,i);
          i=i+1;
     }
```

If _expression_ is false, the execution resumes at the following statement. In our case, the following statement is the end of the program. The expression is evaluated before the statement is executed. When the expression is false from the first time, the statement will never be executed.

## 11. One-Dimensional Array

```csharp
     class test
     {
          static void Main()
          {
               int i;
               int[] A = new int[10];

               for(i=0;i<10;i=i+1)
               {
                    A=i;
               }

               for(i=0;i<10;i=i+1)
               {
                    Console.Write("{0} ",A);
               }
          }
     }
```

Facts:

- It is a collection of variables of the same type that are referred to by the same name.
- In our case int[] A = new int[10]; reserved 10 integers.
- Array elements are accessed through an index; in our case the index is i.
- The first element is accessed by index 0 A[0].
- The highest address corresponds to the last element and it is accessed by index (total number of elements – 1); in our case it is A[9].
- The amount of storage required to hold an array depends on the type and the total number of elements; in our case it is 10 * 4=40, since each integer is 4 bytes.
- The _C#_ compiler does not perform index range checking.
- The array element is accessed by indexing the array name.
- It is done by writing the index enclosed between brackets placed after the array name. _arrayName_[index] A=i; 

## 12. Structure

```csharp
     class test
     {
          struct point
          {
               public int x;
               public int y;
          }

          static void Main()
          {
               point p1, p2;

               p1.x=2; p1.y=1;
               p2.x=7; p2.y=3;

               Console.WriteLine(Distance(p1,p2)); // will print 5.3851648071345
          }

          static double Distance(point p1,point p2)
          {
               int deltaX, deltaY;

               deltaX=p2.x - p1.x;
               deltaY=p2.y - p1.y;

               return Math.Sqrt(deltaX*deltaX + deltaY*deltaY);
          }
     }
```

Facts:

- A structure is an object consisting of a sequence of named members of various types.
- It is a collection of variables referenced under one name.
- The collection of variables is logically related.
- It provides a convenient way in order to keep related information together. 

A structure is declared by typing the keyword _struct_, followed by the structure name, followed by the structure members enclosed between curly braces; for example:

```csharp
     struct point
     {
          public int x, y;
     }
```

Once a structure is declared, variables having the structure type could be declared by typing the structure name followed by the variable name; for example:

```csharp
     1: int deltaX;
```

The dot “.” operator is used to access the structure member. First write the structure variable name, followed by a dot, followed by a member; for example:

```csharp
     deltaX=p2.x - p1.x;
```

## Conclusion

Well that is the overview done, next comes the full detail for the above.  As before read only if you wish but for beginners, I’d highly recommend it (also also check out the [docs](http://msdn.microsoft.com/en-us/library/618ayhy6(VS.71).aspx "C# programmers reference on MSDN") on the [MSDN library](http://msdn.microsoft.com/en-us/library/ms123401(v=MSDN.10).aspx "MSDN Library jump point (wealth of madness)") which has a vast amount of information and free samples for the above and so much more.

More to come

Simon (Darkside) Jackson

