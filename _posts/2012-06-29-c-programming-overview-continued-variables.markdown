---
layout: post
title: C# Programming Overview continued - Variables
date: '2012-06-29 09:15:58'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

### 1. Introduction

In _C#_, a variable represents a storage location. A variable has a type that determines what values can be stored in this variable. Because _C#_ is a type-safe language, the _C#_ compiler guarantees that values stored in variables are always of the appropriate type. The value of a variable is changed through the assignment operator. The value of a variable is also changed through the use of the ++ and — operators. A variable must be **_definitely assigned_** before its value can be obtained: variables are either **_initially assigned_** or **_initially unassigned_**. An initially assigned variable has a well-defined initial value. An initially unassigned variable has no initial value.

### 2. Categories of Variables in C#

In _C#_, there are seven categories of variables: static variables, instance variables, array elements, value parameters, reference parameters, output parameters, and local variables. The following sections describe each of these categories.

#### 2.1 Static Variables

When declaring a variable with the **“static”** keyword, it is called a _static variable_. The initial value of a static variable is the default value of the variable’s type. A static variable is initially assigned.

#### 2.2 Instance Variables

A variable declared without the **“static”** keyword is called an _instance variable_. An instance variable of a class exists when a new instance of that class is created, and ceases to exist when there are no references to that instance and the instance’s destructor (if any) has executed. The initial value of an instance variable of a class is the default value of the variable’s type. An instance variable of a class is initially assigned.

#### 2.3 Array Elements

The elements of an array exist when an array instance is created, and cease to exist when there are no references to that array instance. The initial value of each of the elements of an array is the default value of the type of the array elements. An array element is initially assigned.

#### 2.4 Value Parameters

A parameter declared without a ref or out modifier is a _value parameter_. A value parameter is initially assigned.

#### 2.5 Reference Parameters

A parameter declared with a ref modifier is a _reference parameter_. This represents the same storage location as the variable given as the argument in the function member invocation. Therefore, the value of a reference parameter is always the same as the underlying variable. A variable has to be definitely assigned before it can be passed as a reference parameter in a function member invocation. A reference parameter is considered initially assigned within a function member.

#### 2.6 Output Parameters

An _output parameter_ is a parameter declared with an out modifier. An output parameter represents the same storage location as the variable given as the argument in the function member invocation. Therefore, the value of an output parameter is always the same as the underlying variable. A variable does not need to be definitely assigned before it can be passed as an output parameter in a function member invocation. Within a function member, an output parameter is unassigned initially.

#### 2.7 Local Variables

A _local variable_ is declared within a _block_, a _for-statement_, a _switch-statement_, or a _using-statement_. The lifetime of a local variable is implementation-dependent. For example, the compiler could generate code that results in the variable’s storage having a shorter lifetime than its containing block. A local variable is not automatically initialized and has no default value. It also is unassigned initially. A compile-time error results if the local variable is referred a position that precedes its declaration.

#### 2.8 Default Values

Static variables, instance variables of class instances, and array elements are automatically initialized to their default values. The default value of a variable depends on the type of the variable.

