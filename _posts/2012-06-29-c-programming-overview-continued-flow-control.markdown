---
layout: post
title: C# Programming Overview continued - Flow Control
date: '2012-06-29 09:19:57'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

 **Flow control is an essential part of any programming language, it allows us to make decisions and change the direction our program takes. **

**E.G. has the user pressed left, then make the avatar go left, has the user press fire, then shoot a big ball of flame.**

* * *

### 1. The “while” Statement

The while statement executes a block of statements repeatedly until a specified expression evaluates to false.

It has the form while (expression) statement where expression is an expression that can be implicitly converted to bool or a type that contains overloading of the true and false operators. The expression is used to test the loop-termination criteria. statement is the statement(s) that will be executed.

A while loop executes zero or more times because the test of expression takes place before each execution of the loop. A while loop can terminate when a break, goto, return, or throw statement transfers control outside the loop. To pass control to the next iteration without exiting the loop, use the continue statement.

Example:

     1: using System;

<!--CRLF-->

     2:class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:int i = 16;

<!--CRLF-->

     7:

<!--CRLF-->

     8:while (n \> 0)

<!--CRLF-->

     9: {

<!--CRLF-->

     10: Console.WriteLine(“Another value of i: {0}”, i);

<!--CRLF-->

     11: i -= 4;

<!--CRLF-->

     12: }

<!--CRLF-->

     13: }

<!--CRLF-->

     14: }

<!--CRLF-->

* * *

### 2. The “do-while” Statement

The do statement executes a block of statements repeatedly until a specified expression evaluates to false. It is in the following form:

> do statement while (expression);

where expression is an expression that can be implicitly converted to bool. statement is the statement(s) to be executed. Regardless of the value of expression, the body of the do statement is executed at least once.

Example:

     1: using System;

<!--CRLF-->

     2: public class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main ()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:int i = 16;

<!--CRLF-->

     7:do

<!--CRLF-->

     8: {

<!--CRLF-->

     9: Console.WriteLine(“Another value of i: {0}”, i);

<!--CRLF-->

     10: i -= 4;

<!--CRLF-->

     11: }

<!--CRLF-->

     12:while(i \> 0);

<!--CRLF-->

     13: }

<!--CRLF-->

     14: }

<!--CRLF-->

Example:

     1: using System;

<!--CRLF-->

     2: public class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main ()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:int i = 16;

<!--CRLF-->

     7:do

<!--CRLF-->

     8: {

<!--CRLF-->

     9: Console.WriteLine(“Another value of i: {0}”, i);

<!--CRLF-->

     10: i -= 4;

<!--CRLF-->

     11: }

<!--CRLF-->

     12:while(i \> 18);

<!--CRLF-->

     13: }

<!--CRLF-->

     14: }

<!--CRLF-->

In the preceding example, although the condition evaluates initially to false, the loop will be executed once.

### 3. The “for” Loop

The for loop executes a block of statements repeatedly until a specified expression evaluates to false. It is in the following form:

> for ([initializers]; [expression]; [iterators]) statement

Where initialisers are a comma separated list of expressions or assignment statements that will initialise the loop, expression is an expression that can be implicitly converted to bool, iterators is an expression statement(s) that increment or decrement the loop counters, and statement is the embedded statement(s) to be executed.

The for statement executes the statement repeatedly as follows:

- First, the initialisers are evaluated.
- Then, while the expression evaluates to true, the statement(s) are executed.
- When expression evaluates to false, control is transferred outside the loop. 

A for statement executes zero or more times because the test of expression takes place before the execution of the loop. All of the expressions of the for statement are optional.

Example:

     1: using System;

<!--CRLF-->

     2: public class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:for (int i = 6; i \>0; i--)

<!--CRLF-->

     7: Console.Write(i);

<!--CRLF-->

     8: }

<!--CRLF-->

     9: }

<!--CRLF-->

* * *

### 4. The “foreach, in” Statement

The foreach statement repeats a group of statements for each element in an array. The foreach statement is used to iterate through the array to get the desired information, but should not be used to change the contents of the array. The statement is in the following form:

foreach (type identifier in expression) statement where type is the type of identifier, identifier is the iteration variable that represents the array element, expression is the array expression, and statement is the statement(s) to be executed.

The statements continue to execute for each element in the array. Control is transferred to the next statement following the foreach block after the iteration has been completed for all the elements. When used with an array, the foreach statement repeats the embedded statement(s) for each element in the array.

Example:

     1: using System;

<!--CRLF-->

     2: class test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:int[] ar = new int [] {0,-1,2,-3,4,-5,6,-7,8,-9};

<!--CRLF-->

     7:foreach (int i in ar)

<!--CRLF-->

     8: {

<!--CRLF-->

     9:if (i \< 0)

<!--CRLF-->

     10: Console.WriteLine(“This is a negative number”);

<!--CRLF-->

     11:else

<!--CRLF-->

     12: Console.WriteLine(“This is a positive number”);

<!--CRLF-->

     13: }

<!--CRLF-->

     14: }

<!--CRLF-->

     15: }

<!--CRLF-->

* * *

### 5. The “jump” Statement

The jump statement is used for branching, which causes a transfer of the program control. The following keywords are used in jump statements: break, continue, goto, return.

 

**Example:**

 

     1: using System;

<!--CRLF-->

     2: class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:for (int i = 15; i \>= 0; i--)

<!--CRLF-->

     7: {

<!--CRLF-->

     8:if (i == 10)

<!--CRLF-->

     9:break;

<!--CRLF-->

     10: Console.Write(i);

<!--CRLF-->

     11: }

<!--CRLF-->

     12: }

<!--CRLF-->

     13: }

<!--CRLF-->

### 5.1. Break

The break statement terminates the closest enclosing loop or conditional statement in which it appears.

Control is passed to the statement that follows the terminated statement, if any. The break statement takes the form: break;

Example:

     1: using System;

<!--CRLF-->

     2: class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:for (int i = 15; i \>= 0; i--)

<!--CRLF-->

     7: {

<!--CRLF-->

     8:if (i == 10)

<!--CRLF-->

     9:break;

<!--CRLF-->

     10: Console.Write(i);

<!--CRLF-->

     11: }

<!--CRLF-->

     12: }

<!--CRLF-->

     13: }

<!--CRLF-->

### 5.2. Continue

The continue statement passes control to the next iteration of the enclosing iteration statement in which it appears. It takes the form: continue;

Example:

     1: using System;

<!--CRLF-->

     2: class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:for (int i = 13; i \> 1; i--)

<!--CRLF-->

     7: {

<!--CRLF-->

     8:if (i \> 2)

<!--CRLF-->

     9:continue;

<!--CRLF-->

     10: Console.WriteLine(“The current value is : {0}”, i);

<!--CRLF-->

     11: }

<!--CRLF-->

     12: }

<!--CRLF-->

     13: }

<!--CRLF-->

### 5.3. Goto

The goto statement transfers control directly to a labelled statement. It can be one of the following forms:

- goto identifier;
- goto case constant-expression;
- goto default; 

where identifier is a label and constant-expression is switch-case label.

- identifier indicates a label located in the current body, the same scope, or an enclosing scope of the goto statement.
- goto is commonly used to transfer control to a switch-case label.
- goto is useful to get out of nested loops.
- A warning message can be issued if the label has never been referenced in the program. 

Example:

     1: using System;

<!--CRLF-->

     2: class test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6:int i = 0;

<!--CRLF-->

     7:do

<!--CRLF-->

     8: {

<!--CRLF-->

     9:if (i == 8) goto Label1;

<!--CRLF-->

     10:else i++;

<!--CRLF-->

     11: }

<!--CRLF-->

     12:while (true);

<!--CRLF-->

     13: Label1: Console.Write(i);

<!--CRLF-->

     14: }

<!--CRLF-->

     15: }

<!--CRLF-->

### 5.4. Return

The return statement terminates execution of the method in which it appears and returns control to the calling method. If the method is of the type void, the return statement can be omitted. The return statement has the form:

> return [expression];

where expression is the value returned by a method. expression is not used with methods of the type void.

Example:

     1: class Test

<!--CRLF-->

     2: {

<!--CRLF-->

     3:static int AddInt(int i1, int i2)

<!--CRLF-->

     4: { 

<!--CRLF-->

     5:int j = i1 + i2;

<!--CRLF-->

     6:return j;

<!--CRLF-->

     7: }

<!--CRLF-->

     8:

<!--CRLF-->

     9:public static void Main()

<!--CRLF-->

     10: {

<!--CRLF-->

     11:int n1 = 120;

<!--CRLF-->

     12:int n2 = 125;

<!--CRLF-->

     13:int sum = AddInt(n1,n2);

<!--CRLF-->

     14: }

<!--CRLF-->

     15: }

<!--CRLF-->

* * *

### 6. The “switch” Statement

The switch statement selects for execution a statement from a list. The type of a switch statement is specified by the switch expression. The switch statement can have at most one default label.

A switch statement is executed as follows:

- The switch expression is evaluated and converted to the specified type.
- If one of the constants specified in a case label is equal to the value of the switch expression, control is transferred to the statement list following the matched case label.
- If none of the constants specified in case labels is equal to the value of the switch expression, control is transferred to the statement list following the default label, if a default label exists.
- If no default label is present, control is transferred outside the switch statement. 

A switch section is not permitted to “fall through” to the next switch section. When execution of a switch section is to be followed by execution of another switch section, a goto case or goto default statement must be used. Multiple labels are permitted in a switch section.

The statement list of a switch section typically ends in a break, goto case, or goto default statement.

The governing type of a switch statement may be the type string. If this is the case, null is permitted as a case label constant. The statement list is reachable if the switch statement is reachable and at least one of the following is true:

1. The switch expression is a non-constant value.
2. The switch expression is a constant value that matches a case label in the switch section.
3. The switch expression is a constant value that does not match any case label, and the switch section contains the default label.
4. A switch label of the switch section is referenced by a reachable goto case or goto default statement. 

The end point is reachable if at least one of the following is true:

1. The switch statement contains a reachable break statement that exits the switch statement.
2. The switch statement is reachable, the switch expression is a non-constant value, and no default label is present.
3. The switch statement is reachable, the switch expression is a constant value that does not match any case label, and no default label is present. 

* * *

### 7. if-else

The if statement is a control statement that executes a block of code if an expression evaluates to true. It has the form:

     1: if (expression)

<!--CRLF-->

     2:  

<!--CRLF-->

     3: statement1

<!--CRLF-->

     4:  

<!--CRLF-->

     5: [else

<!--CRLF-->

     6:  

<!--CRLF-->

     7: statement2]

<!--CRLF-->

 

where expression is an expression that can be converted to bool, statement1 is the statement(s) to be executed if expression is true, and statement2 is the statement(s) to be executed if expression is false. If expression is true, statement1 is executed. If the optional else clause exists and expression evaluates to false_,_ statement2 is executed. After executing the if statement, control is transferred to the next statement.

If any of the two results of the if statement (true or false) results in executing more than one statement, multiple statements can be conditionally executed by including them into blocks. The statement(s) to be executed upon testing the condition can be of any kind, including another if statement nested into the original if statement. In nested if statements, the else clause belongs to the last if that does not have a corresponding else. ill be displayed if the condition (_x_ \> 10) evaluates to false.

In this Example if “ch” is a letter, only then will it will check if it is a lowercase letter:

     1: using System;

<!--CRLF-->

     2: public class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6: Console.Write(“Enter something from the keyboard “);

<!--CRLF-->

     7:char ch = (char) Console.Read();

<!--CRLF-->

     8:if (Char.IsLetter(ch))

<!--CRLF-->

     9:if (Char.IsLower(ch))

<!--CRLF-->

     10: Console.WriteLine(“What you entered is a lowercase character.”);

<!--CRLF-->

     11:else

<!--CRLF-->

     12: Console.WriteLine(“What you entered is an uppercase character.”);

<!--CRLF-->

     13:else

<!--CRLF-->

     14: Console.WriteLine(“What you entered is not a character.”);

<!--CRLF-->

     15: }

<!--CRLF-->

     16: }

<!--CRLF-->

In this Example, it will check if “ch” is an uppercase letter, if not it will check if it is lowercase, if not again it will check if it is a number.  If all these fail then it will inform you it was not alphanumeric:

     1: using System;

<!--CRLF-->

     2: public class Test

<!--CRLF-->

     3: {

<!--CRLF-->

     4:static void Main()

<!--CRLF-->

     5: {

<!--CRLF-->

     6: Console.Write(“Press a key: “);

<!--CRLF-->

     7:char ch = (char) Console.Read();

<!--CRLF-->

     8:if (Char.IsUpper(ch))

<!--CRLF-->

     9: Console.WriteLine(“You pressed an uppercase character.”);

<!--CRLF-->

     10:else if (Char.IsLower(c))

<!--CRLF-->

     11: Console.WriteLine(“You pressed a lowercase character.”);

<!--CRLF-->

     12:else if (Char.IsDigit(c))

<!--CRLF-->

     13: Console.WriteLine(“You pressed a digit.”);

<!--CRLF-->

     14:else

<!--CRLF-->

     15: Console.WriteLine(“What You pressed is not alphanumeric.”);

<!--CRLF-->

     16: }

<!--CRLF-->

     17: }

<!--CRLF-->

