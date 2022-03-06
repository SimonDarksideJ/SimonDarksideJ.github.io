---
layout: post
title: C# Programming Overview continued - Expressions, Statements & Operators
date: '2012-06-29 09:18:03'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

 **This section is mainly for reference, you will refer to this quite regularly in the beginning.**

* * *

### 1. What is an expression?

- It is a sequence of operators and operands.
- It specifies computation of a value, or
- It designates a variable or constant. 

* * *

### 2. Classification of Expressions

An expression is classified as one of the following:

- A value.
- A variable.
- A namespace.
- A type.
- A method group.
- A property access.
- An event access.
- An indexer access.
- Nothing. 

The final result of an expression **cannot** be one of the following:

- A namespace.
- A type.
- A method group.
- An event access. 

These categories are intermediate constructs. They are only permitted in certain contexts.

* * *

### 3. Values of Expressions. 

If the expression denotes a property access, an indexer access, or a variable, the value of the property, indexer, or variable is implicitly substituted:

- The value of a variable is simply the value currently stored in the storage location identified by the variable.
- The value of a property access expression is obtained by invoking the _get-accessor_ of the property.
- The value of an indexer access expression is obtained by invoking the _get-accessor_ of the indexer. 

* * *

### 4. Operators

Expressions are constructed from **_operands_** and **_operators_**. Operators of an expression indicate which operations to apply to the operands.

We can find three types of operators:

1. Unary Operators: The unary operators take one operand. They use either prefix notation (–i) or postfix notation (i++).
2. Binary Operators: The binary operators take two operands. They all use infix notation (i + j).
3. Ternary Operator: There exists only one ternary operator, ?:. The ternary operator takes three operands and uses infix notation (z? x: y). 

Operands in an expression are evaluated from left to right. Certain operators can be **_overloaded_**. This permits user-defined operator implementations to be specified for operations where one or both of the operands are of a user-defined class or struct type.

### 4.1. Operator Precedence and Association

When an expression contains multiple operators, the **_precedence_** of the operators controls the order in which the individual operators are evaluated. For example, the expression a + b \* c is evaluated as a + (b \* c) because the \* operator has higher precedence than the + operator. The precedence of an operator is established by the definition of its associated grammar production.

When an operand occurs between two operators with the same precedence, the **_associativity_** of the operators controls the order in which the operations are performed:

- All binary operators are **_left-associative_** , except for the assignment operators, meaning that operations are performed from left to right.
- Assignment operators and conditional operator (?:) are **_right-associative_** , which means that operations are performed from right to left.
- Precedence and association can be controlled using parentheses. 

### 4.2. Operator Overloading

User-defined implementations can be introduced by including operator declarations in classes and structs.

User-defined operator implementations always take precedence over predefined operator implementations – only when no applicable user-defined operator implementations exist will the predefined operator implementations be considered.

The **_overloadable unary operators_** are:

> + – ! ~ ++ — true false

The **_overloadable binary operators_** are:

> + – \* / % & | ^ \<\< \>\> == != \> \< \>= \<=

When a binary operator is overloaded, the corresponding assignment operator (if any) is also implicitly overloaded. For example, an overload of operator + is also an overload of operator +=. The assignment operator (=) cannot be overloaded. An assignment performs a bit-wise copy of a value into a variable. Element access, such as Ar[x], is not an overloadable operator.

User-defined operator declarations always require at least one of the parameters to be of the class or struct type that contains the operator declaration. User-defined operator declarations cannot modify the syntax, precedence, or associativity of an operator. For example, the / operator is always a binary operator, always has the precedence level specified in, and is always left-associative.

* * *

### 5. Function Members

Function members are members that contain executable statements. They are always members of types and cannot be members of namespaces.

_C#_ defines the following categories of function members:

- Methods
- Properties
- Events
- Indexers
- User-defined operators
- Instance constructors
- Static constructors
- Destructors 

Statements contained in function members are executed through function member invocations. The argument list of a function member invocation provides actual values or variable references for the parameters of the function member.

 

### 5.1. The new Operator

The new operator is used to create new instances of types. There are three forms of new expressions:

- Object creation expressions are used to create new instances of class types and value types.
- Array creation expressions are used to create new instances of array types.
- Delegate creation expressions are used to create new instances of delegate types. 

The new operator implies creation of an instance of a type. Instances of value types require no additional memory beyond the variables in which they reside.

* * *

### 6. Unary Operators

The unary operators are +, -, !, ~, \*, ++, –, and cast operators.

### 6.1. The “+” Operator

The predefined plus operators are:

- int operator +(int x);
- uint operator +(uint x);
- long operator +(long x);
- ulong operator +(ulong x);
- float operator +(float x);
- double operator +(double x);
- decimal operator +(decimal x); 

For each of these operators, the result is simply the value of the operand.

### 6.2. The “-” Operator

The predefined negation operators are:

1. Integer negation:

- int operator –(int x);
- long operator –(long x); 

> The result is computed by subtracting x from zero.

2. Floating-point negation:

- float operator –(float x);
- double operator –(double x); 

> The result is the value of x with its sign inverted.

3. Decimal negation:

- decimal operator –(decimal x); 

> The result is computed by subtracting x from zero. Decimal negation is equivalent to using the unary minus operator of type Decimal.

### 6.3. Logical negation operator

There is only one predefined logical negation operator:

- bool operator !(bool x); (Not bool x = when x is false) 

> This operator computes the logical negation of the operand: if the operand is true, the result is false. If the operand is false, the result is true.

### 6.4. Bitwise complement operator

The bitwise complement operators are:

- int operator ~(int x);
- uint operator ~(uint x);
- long operator ~(long x);
- ulong operator ~(ulong x); 

### 6.5. Prefix increment and decrement operators

- Pre-increment-expression: ++ unary-expression
- Pre-decrement-expression: — unary-expression 

> The value returned by the operator becomes the result of the operation. The ++ and — operators also support postfix notation.

### 6.6. Cast Expressions

A _cast-expression_ is used to explicitly convert an expression to a given type.

Example:

> ( type ) unary-expression
> 
> 1:  
> 
> <!--CRLF-->
> 
> 2: /\*The number 2 by default is an int, here it is recognised as cast as a float \*/
> 
> <!--CRLF-->
> 
> 3: (float)2 
> 
> <!--CRLF-->

* * *

### 7. Arithmetic Operators

The \*, /, %, +, and – operators are called the arithmetic operators.

multiplicative-expression:

> unary-expression
> 
> multiplicative-expression \* unary-expression
> 
> multiplicative-expression / unary-expression
> 
> multiplicative-expression % unary-expression
> 
> additive-expression:
> 
> multiplicative-expression
> 
> additive-expression + multiplicative-expression
> 
> additive-expression – multiplicative-expression

### 7.1. Multiplication Operator

Integer multiplication:

- int operator \*(int x, int y);
- uint operator \*(uint x, uint y);
- long operator \*(long x, long y);
- ulong operator \*(ulong x, ulong y); 

Floating-point multiplication:

- float operator \*(float x, float y);
- double operator \*(double x, double y); 

Decimal multiplication:

- decimal operator \*(decimal x, decimal y); 

### 7.2. Division Operator

Integer division:

- int operator /(int x, int y);
- uint operator /(uint x, uint y);
- long operator /(long x, long y);
- ulong operator /(ulong x, ulong y); 

Floating-point division:

- float operator /(float x, float y);
- double operator /(double x, double y); 

Decimal division:

- decimal operator /(decimal x, decimal y); 

### 7.3. Remainder Operator

Integer remainder:

- int operator %(int x, int y);
- uint operator %(uint x, uint y);
- long operator %(long x, long y);
- ulong operator %(ulong x, ulong y); 

Floating-point remainder:

- float operator %(float x, float y);
- double operator %(double x, double y); 

Decimal remainder:

- decimal operator %(decimal x, decimal y); 

### 7.4. Addition Operator

Integer addition:

- int operator +(int x, int y);
- uint operator +(uint x, uint y);
- long operator +(long x, long y);
- ulong operator +(ulong x, ulong y); 

Floating-point addition:

- float operator +(float x, float y);
- double operator +(double x, double y); 

Decimal addition:

- decimal operator +(decimal x, decimal y); 

Enumeration addition:

- E operator +(E x, U y);
- E operator +(U x, E y); 

String concatenation:

- string operator +(string x, string y);
- string operator +(string x, object y);
- string operator +(object x, string y); 

### 7.5. Subtraction Operator

Integer subtraction:

- int operator –(int x, int y);
- uint operator –(uint x, uint y);
- long operator –(long x, long y);
- ulong operator –(ulong x, ulong y); 

Floating-point subtraction:

- float operator –(float x, float y);
- double operator –(double x, double y); 

Decimal subtraction:

- decimal operator –(decimal x, decimal y); 

Enumeration subtraction:

- U operator –(E x, E y);
- E operator –(E x, U y); 

* * *

### 8. Shift Operators

The \<\< and \>\> operators are used to perform bit shifting operations.

### 8.1 shift-expression

- additive-expression
- shift-expression \<\< additive-expression
- shift-expression \>\> additive-expression 

When declaring an overloaded shift operator, the type of the first operand must always be the class or struct containing the operator declaration, and the type of the second operand must always be int.

The predefined shift operators are listed below.

### 8.2 Shift Left

- int operator \<\<(int x, int count);
- uint operator \<\<(uint x, int count);
- long operator \<\<(long x, int count);
- ulong operator \<\<(ulong x, int count); 

> The \<\< operator shifts x left by a number of bits computed as described below. The high-order bits outside the range of the result type of x are discarded, the remaining bits are shifted left, and the low-order empty bit positions are set to zero.

### 8.3 Shift Right

- int operator \>\>(int x, int count);
- uint operator \>\>(uint x, int count);
- long operator \>\>(long x, int count);
- ulong operator \>\>(ulong x, int count); 

> The \>\> operator shifts x right by a number of bits computed as described below.

* * *

### 9. Relational & Type Testing Operators

The ==, !=, \<, \>, \<=, \>=, is and as operators are called the relational and type testing operators.

### 9.1. Relational-Expression

shift-expression

- relational-expression \< shift-expression
- relational-expression \> shift-expression
- relational-expression \<= shift-expression
- relational-expression \>= shift-expression
- relational-expression is type
- relational-expression as type 

### 9.2. Equality-Expression

relational-expression

- equality-expression == relational-expression
- equality-expression != relational-expression 

> All comparison operators return a result of type bool, as described in the following table:

**Operation Result**

- x == y true if x is equal to y, false otherwise
- x != y true if x is not equal to y, false otherwise
- x \< y true if x is less than y, false otherwise
- x \> y true if x is greater than y, false otherwise
- x \<= y true if x is less than or equal to y, false otherwise
- x \>= y true if x is greater than or equal to y, false otherwise 

### 9.3. The as Operator

This operator is used to explicitly convert a value to a given reference type using a reference conversion or a boxing conversion. The as operator never throws an exception. Instead, if the indicated conversion is not possible, the resulting value is null.

* * *

### 10. Logical Operators

The &, ^, and | operators are called the logical operators.

- and-expression: 

> equality-expression

> and-expression & equality-expression

- exclusive-or-expression: 

> and-expression

> exclusive-or-expression ^ and-expression

- inclusive-or-expression: 

> exclusive-or-expression
> 
> inclusive-or-expression | exclusive-or-expression

### 10.1. Conditional Operator

The ?: operator is called the conditional operator. It is sometimes called the ternary operator. A conditional expression of the form b? x: y first evaluates the condition b. Then, if b is true, x is evaluated and becomes the result of the operation. Otherwise, y is evaluated and becomes the result of the operation. A conditional expression never evaluates both x and y. The conditional operator is right-associative, meaning that operations are grouped from right to left. The first operand of the ?: operator must be an expression of a type that can be implicitly converted to bool, or an expression of a type that implements operator true. If neither requirement is satisfied, a compile-time error occurs. The second and third operands of the ?: operator control the type of the conditional expression.

### 10.2. Assignment Operators

Assignment operators assign a new value to a variable, a property, or an indexer element. The left operand of an assignment must be an expression classified as a variable, a property access, or an indexer access. The = operator is called the **_simple assignment operator_**. It assigns the value of the right operand to the variable, property, or indexer element given by the left operand. The operators formed by prefixing a binary operator with an = character are called the **_compound assignment operators_**. These operators perform the indicated operation on the two operands, and then assign the resulting value to the variable, property, or indexer element given by the left operand. The assignment operators are right-associative, meaning that operations are grouped from right to left. For example, an expression of the form a = b = c is evaluated as a = (b = c).

### 10.3. Simple Assignment

The = operator is called the simple assignment operator. In a simple assignment, the right operand must be an expression of a type that is implicitly convertible to the type of the left operand. The operation assigns the value of the right operand to the variable, property, or indexer element given by the left operand. The result of a simple assignment expression is the value assigned to the left operand. The result has the same type as the left operand and is always classified as a value. If the left operand is a property or indexer access, the property or indexer must have a set accessor. If this is not the case, a compile-time error occurs.

### 10.4. Boolean Expressions

A _boolean-expression_ is an expression that yields a result of type bool. The controlling conditional expression of an _if-statement_, _while-statement_, _do-statement_, or _for-statement_ is a _boolean-expression_. The controlling conditional expression of the ?: operator follows the same rules as a _boolean-expression_, but for reasons of operator precedence is classified as a _conditional-or-expression_. A _boolean-expression_ is required to be of a type that can be implicitly converted to bool or of a type that implements operator true. If neither requirement is satisfied, a compile-time error occurs. When a boolean expression is of a type that cannot be implicitly converted to bool but does implement operator true, then following evaluation of the expression, the operator true implementation provided by that type is invoked to produce a bool value.

