---
layout: post
title: C# Programming Overview continued - Types
date: '2012-06-29 09:17:40'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

### 1. Value Types

In _C#_, a value type can be either a struct or an enumeration. _C#_ contains a set of predefined struct types called the **_simple types_**. These simple types are identified through reserved words. All value types implicitly inherit form a class called **object**. Also, no type can derive from a value type. It is not possible for a value type to be **null** (_null_ means “nothing” or “no value”). Assigning a variable of a value type creates a _copy_ of the value. This is different from assigning a variable of a reference type, which copies the reference and not the object identified by the reference.

> * * *
> 
> ### 1.1 bool
> 
> The **bool** type represents boolean quantities. There can be two possible values of type **bool** : **true** and **false**. There is no standard conversion between **bool** and other types. Such conversions are accomplished by comparing an integral value to zero or comparing an object to **null**. A boolean value can be assigned to a bool variable, for example:
> 
> 1: bool MyBool = true;
> 
> <!--CRLF-->
> 
> You can also assign an expression that evaluates to a bool variable, for example:
> 
> 1: bool b = (i \> 66);
> 
> <!--CRLF-->
> 
> <u>Conversions</u>
> 
> No conversion exists between the bool type and other types. For example, the following if statement:
> 
> 1: int i = 101;
> 
> <!--CRLF-->
> 
> 2: if (i) //testing i (an integer) as a Boolean (true/false)
> 
> <!--CRLF-->
> 
> 3: {
> 
> <!--CRLF-->
> 
> 4: // do something
> 
> <!--CRLF-->
> 
> 5: }
> 
> <!--CRLF-->
> 
> is not allowed in _C#_.
> 
> To test an int type, you have to explicitly compare it to a value, as follows:
> 
> 1: int i = 13;
> 
> <!--CRLF-->
> 
> 2: if (i == 13) //testing, is i the value 13, true or false
> 
> <!--CRLF-->
> 
> 3: {
> 
> <!--CRLF-->
> 
> 4: // do something
> 
> <!--CRLF-->
> 
> 5: }
> 
> <!--CRLF-->
> 
> Example:
> 
> In this example, you enter a character from the keyboard and the program checks if the input character is
> 
> a letter.
> 
> 1: public class test
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3:static void Main()
> 
> <!--CRLF-->
> 
> 4: {
> 
> <!--CRLF-->
> 
> 5: Console.Write(“Enter a character: “);
> 
> <!--CRLF-->
> 
> 6:char ch = (char) Console.Read();
> 
> <!--CRLF-->
> 
> 7:
> 
> <!--CRLF-->
> 
> 8:if (Char.IsLetter(ch))
> 
> <!--CRLF-->
> 
> 9: Console.WriteLine(“It is an alphabetic character.”);
> 
> <!--CRLF-->
> 
> 10:else
> 
> <!--CRLF-->
> 
> 11: Console.WriteLine(“It is not an alphabetic character.”);
> 
> <!--CRLF-->
> 
> 12: }
> 
> <!--CRLF-->
> 
> 13: }
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.2 Byte
> 
> The “byte” keyword denotes an integral type that stores values ranging from 0 to 255. Its size is 8-bit. A byte can be declared and initialized as follows:
> 
> 1: byte b = 117;
> 
> <!--CRLF-->
> 
> In the preceding declaration, 117 is implicitly converted from int to byte. If the integer literal exceeds the range of byte, a compilation error will occur, as with the following assignment statement:
> 
> 1: byte c = a + b; // Error: conversion from int to byte
> 
> <!--CRLF-->
> 
> To fix this problem, use an explicit cast:
> 
> 1: byte c = (byte)(a + b); // OK
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.3 Char
> 
> “char” is used to declare a Unicode character in the range 0 to 65535. Unicode characters are 16-bit characters used to represent most of the written languages throughout the world. The following statement declares a char variable and initializes it with the character D:
> 
> 1: char c = ‘D’;
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.4 Decimal
> 
> “decimal” denotes a 128-bit data type. The decimal type has a greater precision and a smaller range than the floating-point type, which makes it suitable for financial and monetary calculations. To make sure that a numeric real number is treated as a decimal, use the suffix m or M:
> 
> 1: decimal dec = 710.88m;
> 
> <!--CRLF-->
> 
> Without the suffix m, the number is treated as a double, and the expression generates a compilation error.
> 
> Example:
> 
> 1: public class test
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3: static void Main ()
> 
> <!--CRLF-->
> 
> 4: {
> 
> <!--CRLF-->
> 
> 5: decimal dec = 12.4m;
> 
> <!--CRLF-->
> 
> 6: int i = 33;
> 
> <!--CRLF-->
> 
> 7: Console.WriteLine(dec \* i); // Here the result is converted to decimal
> 
> <!--CRLF-->
> 
> 8: }
> 
> <!--CRLF-->
> 
> 9: }
> 
> <!--CRLF-->
> 
> Formatting Decimal Output
> 
> You can format the results by using the _String.Format_ method, or through the Console.Write method, which calls String.Format(). The currency format is specified using the standard currency format string “C” or “c.
> 
> Example:
> 
> In this example, the output is formatted using the currency format string.
> 
> 1: public class test
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3:static void Main ()
> 
> <!--CRLF-->
> 
> 4: {
> 
> <!--CRLF-->
> 
> 5:decimal dec1 = 0.987m;
> 
> <!--CRLF-->
> 
> 6:decimal dec2 = 5454335566m;
> 
> <!--CRLF-->
> 
> 7: Console.WriteLine(“{0:C}”, dec1);
> 
> <!--CRLF-->
> 
> 8: Console.WriteLine(“{0:C}”, dec2);
> 
> <!--CRLF-->
> 
> 9: }
> 
> <!--CRLF-->
> 
> 10: }
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.5 Double
> 
> “double” denotes a simple type that stores 64-bit floating-point values. By default, a real numeric literal on the right-hand side of the assignment operator is treated as a double. However, if you want an integer number to be treated as a double, use the suffix d or D.
> 
> 1: double x = 44D;
> 
> <!--CRLF-->
> 
> Numeric integral types and floating-point types can be mixed in an expression. In this case, the integral types are converted to floating-point types.
> 
> Example:
> 
> 1: class test
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3:static void Main()
> 
> <!--CRLF-->
> 
> 4: {
> 
> <!--CRLF-->
> 
> 5:float f = 8.66f;
> 
> <!--CRLF-->
> 
> 6:int i = 123;
> 
> <!--CRLF-->
> 
> 7:double d = 22.1E+2;
> 
> <!--CRLF-->
> 
> 8: Console.Write(“{0}”, f + i + d);
> 
> <!--CRLF-->
> 
> 9: }
> 
> <!--CRLF-->
> 
> 10: }
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.6 Enum
> 
> “enum” is used to declare an enumeration, which is distinct type consisting of a set of constants called the enumerator list. Every enumeration type has an underlying type, which can be any integral type except char. The default type of the enumeration elements is int. By default, the first enumerator has the value 0 and the value of each successive enumerator is increased by 1. For example:
> 
> 1: enum WeekDays {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
> 
> <!--CRLF-->
> 
> In this enumeration, Sun is 0, Mon is 1, and so forth. Enumerators can have initialisers overriding the default values, as the following example shows:
> 
> 1: enum WeekDays {Sun=1, Mon, Tue, Wed, Thu, Fri, Sat};
> 
> <!--CRLF-->
> 
> In this enumeration, the sequence starts from 1.
> 
> An enum En has a default value, which is the value produced by the expression (En)0. The enumeration type specifies how much storage is allocated. However, an explicit cast is needed to convert from enum type to an integral type.
> 
> Example:
> 
> In this example, an enumeration, Days, is declared. Two enumerators are explicitly converted to int and assigned to int variables.
> 
> 1: public class test
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3:enum WeekDays {Sun=1, Mon, Tue, Wed, Thu, Fri, Sat};
> 
> <!--CRLF-->
> 
> 4:  
> 
> <!--CRLF-->
> 
> 5:static void Main()
> 
> <!--CRLF-->
> 
> 6: {
> 
> <!--CRLF-->
> 
> 7:int i1 = (int) WeekDays.Tue;
> 
> <!--CRLF-->
> 
> 8:int i2 = (int) WeekDays.Thu;
> 
> <!--CRLF-->
> 
> 9: Console.WriteLine(“Tuesday is day {0}”, i1);
> 
> <!--CRLF-->
> 
> 10: Console.Write(“Thursday is day {0}”, i2);
> 
> <!--CRLF-->
> 
> 11: }
> 
> <!--CRLF-->
> 
> 12: }
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.7 Float
> 
> “float” denotes a type that can store 32-bit floating-point values. A real numeric literal on the right-hand side of the assignment operator is treated by default as a double. Therefore, to initialize a float, use the suffix f or F, for example:
> 
> 1: float f = 68.77F;
> 
> <!--CRLF-->
> 
> You will get a compilation error if you do not use the suffix because you are attempting to store a double value into a floating point variable.
> 
> You can mix numeric integral types and floating-point types in an expression. In this case, the integral types are converted to floating-point types.
> 
> Example:
> 
> 1: class test
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3:static void Main()
> 
> <!--CRLF-->
> 
> 4: {
> 
> <!--CRLF-->
> 
> 5:int i = 14;
> 
> <!--CRLF-->
> 
> 6:float f = 68.25f;
> 
> <!--CRLF-->
> 
> 7: Console.Write(“{0}”, i-f);
> 
> <!--CRLF-->
> 
> 8: }
> 
> <!--CRLF-->
> 
> 9: }
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.8 Int
> 
> “int” denotes an integral type that stores 32-bit values. It ranges from -2,147,483,648 to 2,147,483,647. The type “int” is declared and initialized like this:
> 
> 1: int i = 441;
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.9 Long
> 
> “long” denotes an integral type that stores 64-bit values. It ranges from –9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. The type “long” is declared and initialized like this:
> 
> 1: long myLong = 23940043;
> 
> <!--CRLF-->
> 
> When an integer literal has no suffix, its type is the first of the following types in which its value can fit: int, uint, long, ulong. The suffix L can be used with the long type like this:
> 
> 1: long myLong = 990085665543L;
> 
> <!--CRLF-->
> 
> When you use the suffix L or l, the literal integer’s type is either long or ulong according to its size.
> 
> A predefined implicit conversion exists from long to float, double, or decimal. In other cases, a cast must be used. For example, the following statement will produce a compilation error without an explicit cast:
> 
> 1: int i = 21L;
> 
> <!--CRLF-->
> 
> There is an implicit conversion from sbyte, byte, short, ushort, int, uint, or char to long. Also, there is no implicit conversion from floating-point types to long. For example, the following statement generates an error:
> 
> 1: long l = 31.23;
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.10 sbyte
> 
> “sbyte” denotes an integral type that stores signed 8-bit integer values, ranging from -128 to 127. An “sbyte” can be declared and initialized like this:
> 
> 1: sbyte mySbyte = 100;
> 
> <!--CRLF-->
> 
> 100 is implicitly converted from int to sbyte. If the integer literal exceeds the range of sbyte, a compiler error will occur. A predefined implicit conversion exists from sbyte to short, int, long, float, double, or decimal. Also, there is no implicit conversion from floating-point types to sbyte.
> 
> * * *
> 
> ### 1.11 Short
> 
> “short” denotes an integral data type that stores signed 16-bit integer values, ranging from -32,768 to 32,767. A “short” is declared and initialized like this:
> 
> 1: short s = 30201;
> 
> <!--CRLF-->
> 
> 30201 is implicitly converted from int to short. If the integer literal does not fit into a short storage location, a compiler error will occur. A predefined implicit conversion exists from short to int, long, float, double, or decimal. You cannot implicitly convert non-literal numeric types of larger storage size to short.
> 
> Also there is no implicit conversion from floating-point types to short.
> 
> * * *
> 
> #### 1.12 Struct
> 
> A “struct” is a value type. It can contain constructors, constants, fields, methods, properties, indexers, operators, and nested types. The struct type is suitable for representing objects such as Point, Rectangle, and Colour. When creating a struct object using the new operator, it gets created, and the appropriate constructor is called.  Structs can be instantiated without using the new operator. If you do not use the new operator, the fields will remain unassigned and the object cannot be used until all of the fields are initialized.
> 
> You cannot declare a class using the keyword struct. Classes and structs are semantically different. A struct is a value type, while a class is a reference type.
> 
> Example:
> 
> 1: public struct Point
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3:public int x, y;
> 
> <!--CRLF-->
> 
> 4: }
> 
> <!--CRLF-->
> 
> Example:
> 
> This example creates a Point object without using the new operator.
> 
> 1: public struct Point
> 
> <!--CRLF-->
> 
> 2: {
> 
> <!--CRLF-->
> 
> 3:public int x, y;
> 
> <!--CRLF-->
> 
> 4: }
> 
> <!--CRLF-->
> 
> 5:  
> 
> <!--CRLF-->
> 
> 6: class test
> 
> <!--CRLF-->
> 
> 7: {
> 
> <!--CRLF-->
> 
> 8:static void Main()
> 
> <!--CRLF-->
> 
> 9: {
> 
> <!--CRLF-->
> 
> 10: Point p1;
> 
> <!--CRLF-->
> 
> 11: }
> 
> <!--CRLF-->
> 
> 12: }
> 
> <!--CRLF-->
> 
> * * *
> 
> ### 1.13 Uint
> 
> “uint” denotes an integral type that stores unsigned 32-bit integer values, ranging from 0 to 4,294,967,295.
> 
> An “uint” can be declared and initialized like this:

> 1: uint myUint = 4294967288;
> 
> <!--CRLF-->

> The suffix u or U can be used, like this:
> 
> 1: uint myUint = 112U;
> 
> <!--CRLF-->
> 
> If you use the suffix U or u, the literal type is determined to be either uint or ulong according to its size.
> 
> In this example, it is uint. A predefined implicit conversion exists from uint to long, ulong, float, double, or decimal.
> 
> For example:
> 
> 1: float myFloat = 4294967289;
> 
> <!--CRLF-->
> 
> Also, there exists a predefined implicit conversion from byte, ushort, or char to uint. Otherwise you must use a cast. There is no implicit conversion from floating-point types to uint.
> 
> * * *
> 
> ### 1.14 Ulong
> 
> The “ulong” keyword denotes an integral type that stores unsigned 64-bit integer values, ranging from 0 to 18,446,744,073,709,551,615. A “ulong” is declared and initialized like this:
> 
> 1: ulong myUlong = 92854775806;
> 
> <!--CRLF-->
> 
> When using L or l as a suffix, the type of the literal integer will be either long or ulong according to its size. There is an implicit conversion from ulong to float, double, or decimal, but there is no implicit conversion from ulong to any integral type.
> 
> * * *
> 
> ### 1.15 Ushort
> 
> “ushort” denotes an integral data type that stores unsigned 16-bit integer values, ranging from 0 to 65,535. “ushort” can be declared and initialized like this:
> 
> 1: ushort myUShort = 65535;
> 
> <!--CRLF-->
> 
> 65535 is implicitly converted from int to ushort. A compiler error will occur if the integer literal exceeds the range of ushort. A predefined implicit conversion exists from ushort to int, uint, long, ulong, float, double, or decimal. Also, there is a predefined implicit conversion from byte or char to ushort.
> 
> Otherwise a cast must be used. There is no implicit conversion from floating-point types to ushort.

* * *

### 2. Reference Types

A reference type is one of the following: class, interface, array, or delegate. A reference type value is a reference to an **_instance_** of the type. “ **null** ” is compatible with all reference types and indicates the **absence** of an instance.

> * * *
> 
> ### 2.1 Class Types
> 
> A class defines a data structure containing data members (constants and fields), function members (methods, properties, events, indexers, operators, instance constructors, destructors, and static constructors), and nested types.
> 
> * * *
> 
> ### 2.2 Object Types
> 
> The **object** class type is the ultimate base class of all other types. Every type in _C#_ directly or indirectly derives from the **object** class type.
> 
> * * *
> 
> ### 2.3 String Types
> 
> The **string** type inherits directly from class **object**.
> 
> * * *
> 
> ### 2.4 Interface Types
> 
> An interface defines a contract. A class implementing an interface must adhere to its contract.
> 
> * * *
> 
> ### 2.5 Array Types
> 
> An array is a data structure containing a number of variables, which are accessed through indices. The variables contained in an array are called the elements of the array. They are all of the same type, and this type is called the element type of the array.

* * *

### 3. Void

When used as the return type for a method, **void** specifies that the method does not return a value. **void** is not allowed in a method’s parameter list. A method with no parameters and returning no value is declared as follows:

     1: void MyMethod();

<!--CRLF-->

