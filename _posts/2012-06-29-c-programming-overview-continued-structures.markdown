---
layout: post
title: C# Programming Overview continued - Structures
date: '2012-06-29 09:22:25'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

* * *

### 1. Definition of a Struct

Structs are similar to classes in that they represent data structures that can contain data members and function members. Unlike classes, structs are value types and do not require heap allocation. A variable of a struct type directly contains the data of the struct, whereas a variable of a class type contains a reference to the data, the latter known as an object.

Structs are particularly useful for small data structures that have value semantics. Complex numbers, points in a coordinate system, or key-value pairs in a dictionary are all good examples of structs. The simple types provided by _C#_, such as int, double, and bool, are in fact all struct types. It is possible to use structs and operator overloading to implement new “primitive” types in the _C#_ language.

* * *

### 2. Struct Declaration

A _struct-declaration_ is a _type-declaration_ that declares a new struct.

### 2.1. Struct Modifiers

A _struct-declaration_ may optionally include a sequence of struct modifiers. It is a compile-time error for the same modifier to appear multiple times in a struct declaration. The modifiers of a struct declaration have the same meaning as those of a class declaration.

### 2.2. Struct Interfaces

A struct declaration may include a _struct-interfaces_ specification, in which case the struct is said to implement the given interface types.

### 2.3. Struct Body

The _struct-body_ of a struct defines the members of the struct.

* * *

### 3. Members of a Struct

The struct members are the members introduced by its _struct-member-declaration_s and the members inherited from System.ValueType, which inherits from object.

* * *

### 4. Class and Struct Differences

Structs are value types. All struct types implicitly inherit from class object. Instance field declarations for a struct are not permitted to include variable initialisers. Assignment to a variable of a struct type creates a copy of the value being assigned. The meaning of this is different for structs. A struct is not permitted to declare a destructor.

The default value of a struct is the value produced by setting all value type fields to their default value and all reference type fields to null. A struct is not permitted to declare a parameterless instance constructor. Boxing and unboxing operations are used to convert between a struct type and object.

Structs are value types and are said to have value semantics. Classes, on the other hand, are reference types and are said to have reference semantics. A variable of a struct type directly contains the data of the struct, whereas a variable of a class type contains a reference to the data, the latter known as an object. With classes, it is possible for two variables to reference the same object, and thus possible for operations on one variable to affect the object referenced by the other variable. With structs, the variables each have their own copy of the data, and it is not possible for operations on one to affect the other. Because structs are not reference types, it is not possible for values of a struct type to be null.

All struct types implicitly inherit from class object. A struct declaration may specify a list of implemented interfaces, but it is not possible for a struct declaration to specify a base class. Struct types are never abstract and are always implicitly sealed. The abstract and sealed modifiers are therefore not permitted in a struct declaration. Since inheritance is not supported for structs, the declared accessibility of a struct member cannot be protected or protected internal. Function members in a struct cannot be abstract or virtual, and the override modifier is allowed only to override methods inherited from the object type.

Assignment to a variable of a struct type creates a _copy_ of the value being assigned. This differs from assignment to a variable of a class type, which copies the reference but not the object identified by the reference.

Similar to an assignment, when a struct is passed as a value parameter or returned as the result of a function member, a copy of the struct is created. A struct may be passed by reference to a function member using a ref or out parameter. When a property or indexer of a struct is the target of an assignment, the instance expression associated with the property or indexer access must be classified as a variable. If the instance expression is classified as a value, a compile-time error occurs.

A value of a class type can be converted to type object or to an interface type that is implemented by the class simply by treating the reference as another type at compile-time. Likewise, a value of type object or a value of an interface type can be converted back to a class type without changing the reference (but of course a run-time type check is required in this case). Since structs are not reference types, these operations are implemented differently for struct types. When a value of a struct type is converted to type object or to an interface type that is implemented by the struct, a boxing operation takes place.

When a value of type object or a value of an interface type is converted back to a struct type, an unboxing operation takes place. A key difference from the same operations on class types is that boxing and unboxing _copies_ the struct value either into or out of the boxed instance. Following a boxing or unboxing operation, changes made to the unboxed struct are not reflected in the boxed struct.

Within an instance constructor or instance function member of a class, this is classified as a value. Thus, while this can be used to refer to the instance for which the function member was invoked, it is not possible to assign to this in a function member of a class. Within an instance constructor of a struct, this corresponds to an out parameter of the struct type, and within an instance function member of a struct, this corresponds to a ref parameter of the struct type. this is classified as a variable, and it is possible to modify the entire struct for which the function member was invoked by assigning to this or by passing this as a ref or out parameter.

The default value of a struct consists of the value that results from setting all value type fields to their default value and all reference type fields to null. For this reason, a struct does not permit instance field declarations to include variable initialisers. Unlike a class, a struct is not permitted to declare a parameterless instance constructor. Instead, every struct implicitly has a parameterless instance constructor that always returns the value that results from setting all value type fields to their default value and all reference type fields to null. A struct instance constructor is not permitted to include a constructor initialiser of the form base(…).

The _this_ variable of a struct instance constructor corresponds to an out parameter of the struct type, and, similar to an out parameter, this must be definitely assigned at every location where the instance constructor returns.

A struct can declare instance constructors having parameters. It is not permitted to declare a destructor.

