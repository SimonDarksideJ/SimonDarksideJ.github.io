---
layout: post
title: C# Programming Overview continued - Arrays
date: '2012-06-29 09:21:07'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

## 1. Introduction

An array is a data structure. It contains a number of variables, which are accessed through computed indices. Also called the elements of the array, the variables contained in an array are all of the same type, which is called the element type of the array.

An array has a rank that determines the number of indices associated with each array element. The rank of an array is also referred to as the dimensions of the array. An array with a rank of one is called a single-dimensional array, while an array with a rank greater than one is called a multi-dimensional array. Multi-dimensional arrays of specific sizes are often referred to by size, as two-dimensional arrays, three-dimensional arrays, and so on.

Each dimension of an array has an associated length that is an integral number greater than or equal to zero. The dimension lengths are not part of the type of the array; instead, they are established when an instance of the array type is created at run-time. The length of a dimension determines the valid range of indices for that dimension.

For example, for a dimension of length N, indices can range from 0 to N – 1 inclusive.

The total number of elements in an array is the product of the lengths of each dimension in the array. If one or more of the dimensions of an array have a length of zero, the array is said to be empty. The element type of an array can be any type, including an array type.

## 2. Array Types

### 2.1 The System.Array Type

The System.Array type is the abstract base type of all array types. An implicit reference conversion exists from any array type to System.Array, and an explicit reference conversion exists from System.Array to any array type.

System.Array itself is not an _array-type_; rather, it is a _class-type_ from which all _array-type_s are derived. At runtime, a value of type System.Array can be null or a reference to an instance of any array type.

## 3. Array Creation

Array instances are created by _array-creation-expression_s or by field or local variable declarations that include an _array-initialiser_. When an array instance is created, the rank and length of each dimension are established and then remain constant for the entire lifetime of the instance. It is not possible to change the rank of an existing array instance, nor is it possible to resize its dimensions. An array instance is always of an array type. The System.Array type is an abstract type that cannot be instantiated. Elements of arrays created by _array-creation expression_s are always initialized to their default value.

## 4. Array Element Access

Array elements are accessed using _element-access_ expressions of the form A[I1, I2, …, IN], where A is an expression of an array type and each I_X_ is an expression of type int, uint, long, ulong, or of a type that can be implicitly converted to one or more of these types. The result of an array element access is a variable, namely the array element selected by the indices. The elements of an array can be enumerated using a foreach statement.

## 5. Array Members

Every array type inherits the members declared by the System.Array type.

## 6. Array Initialisers

Array initialisers may be specified in field declarations, local variable declarations, and array creation expressions.

The context in which an array initialiser is used determines the type of the array being initialized. In an array creation expression, the array type immediately precedes the initialiser. In a field or variable declaration, the array type is the type of the field or variable being declared. When an array initialiser is used in a field or variable declaration, such as:

```csharp
     int[] ar = {1, 3, 5, 7, 9};
```

It is simply shorthand for an equivalent array creation expression:

```csharp
     int[] arr = new int[] {1, 3, 5, 7, 9};
```

For a single-dimensional array, the array initialiser must consist of a sequence of expressions that are assignment compatible with the element type of the array. The expressions initialize array elements in increasing order, starting with the element at index zero. The number of expressions in the array initialiser determines the length of the array instance being created. For example, the array initialiser above creates an int[] instance of length 5 and then initializes the instance with the following values:

```csharp
     a[0] = 1; a[1] = 3; a[2] = 5; a[3] = 7; a[4] = 9;
```

For a multi-dimensional array, the array initialiser must have as many levels of nesting as there are dimensions in the array. The outermost nesting level corresponds to the leftmost dimension, and the innermost nesting level corresponds to the rightmost dimension. The length of each dimension of the array is determined by the number of elements at the corresponding nesting level in the array initialiser. For each nested array initialiser, the number of elements must be the same as the other array initialisers at the same level. The example:

{% raw %}
```csharp
     int[,] ar = {{10, 11}, {12, 13}, {14, 15}, {16, 17}};
```
{% endraw %}

Creates a two-dimensional array with a length of four for the leftmost dimension and a length of two for the rightmost dimension:

```csharp
     int[,] ar = new int[4, 2];
```

and then initializes the array instance with the following values:

```csharp
     ar[0, 0] = 0; b[0, 1] = 11;

     ar[1, 0] = 2; b[1, 1] = 13;

     ar[2, 0] = 4; b[2, 1] = 15;

     ar[3, 0] = 6; b[3, 1] = 17;

     ar[4, 0] = 8; b[4, 1] = 19;
```

When an array creation expression includes both explicit dimension lengths and an array initialiser, the lengths must be constant expressions and the number of elements at each nesting level must match the corresponding dimension length.