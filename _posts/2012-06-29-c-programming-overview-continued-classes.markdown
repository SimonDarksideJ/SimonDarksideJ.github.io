---
layout: post
title: C# Programming Overview continued - Classes
date: 2012-06-29 09:20:44
tags: [2d tutorial, game development, xna]
---

* * *

### 1. Definition of a Class

A class is a data structure. It may contain data, functions, and nested types. Data members include constants and fields. Function members include methods, operators, events, properties, indexers, instance constructors, destructors and static constructors. A class support inheritance, which is a mechanism that allows a derived class to extend and specialise a base class.

* * *

### 2. Class Declaration

A _class-declaration_ is a _type-declaration_ that declares a new class. It consists of an optional set of _attributes_, followed by an optional set of _class-modifiers_, followed by the keyword class and an _identifier_ that names the class, followed by an optional _class-base_ specification, followed by a _class-body_, and optionally followed by a semicolon.

### 2.1. Class Modifiers

A _class-declaration_ may optionally include a sequence of class modifiers_: new, public, protected, internal, private, abstract, and sealed._ In a class declaration, if the same modifier appears multiple times, it results in a compiler time error. The _new_ modifier is permitted on nested classes. It specifies that the class hides an inherited member by the same name. If the _new_ modifier appears on a class declaration that is not a nested class declaration, it results in a compile-time error. The _public, protected, internal_, and _private_ modifiers control the accessibility of the class.

### 2.2. Abstract Classes

The _abstract_ modifier indicates that a class is incomplete and that it is intended only as a base class. An abstract class cannot be instantiated directly. Using the _new_ operator on an abstract class is a compile-time error. An abstract class can contain abstract members and it cannot be sealed.

### 2.3. Sealed Classes

The _sealed_ modifier prevents derivation from a class. If a sealed class is specified as the base class of another class, it generates a compile-time error. A sealed class cannot be an abstract class.

### 2.4. Base Classes

When a _class-type_ is included in the _class-base_, it specifies the direct base class of the class being declared. If a class declaration has no _class-base_, the direct base class is assumed to be “object.” A class inherits members from its direct base class.

Example:

     1: class B {}

<!--CRLF-->

     1: class D: B {}

<!--CRLF-->

Class B is said to be the direct base class of D, and D is said to be derived from B. Class B implicitly derives from “object.” The direct base class of a class type must be at least as accessible as the class type itself. For example, it is a compile-time error for a public class to derive from a private or internal class. The base classes of a class are the direct base class and its base classes. Except for class object, every class has exactly one direct base class. The object class has no direct base class and is the ultimate base class of all other classes.

* * *

### 3. Members of a Class

Class members consist of the members introduced by its _class-member-declaration_s and the members inherited from the direct base class. Class members are divided into the following categories:

- Fields are the class variables.
- Constants represent constant values associated with the class.
- Methods implement the computations and actions that can be performed by the class.
- Properties define characteristics associated with reading and writing those characteristics.
- Indexers permit instances of the class to be indexed like arrays.
- Events define notifications that can be generated by the class.
- Instance constructors implement class initialization.
- Operators define the expression operators that would be applied to instances of the class.
- Static constructors implement the actions required to initialize the class itself.
- Destructors implement the actions to be performed before instances of the class are deleted.
- Types represent local types of the class. 

Members that can contain executable code are known as the _function members_ of the class. The function members of a class are the events, operators, methods, properties, indexers, instance constructors, static constructors, and destructors of that class.

A _class-declaration_ creates a new declaration space, and the _class-member-declarations_ immediately contained by the _class-declaration_ introduce new members into this declaration space. Rules that apply to _class-member declaration_s are:

- Instance constructors, destructors and static constructors should have the same name as the immediately enclosing class.
- The name of a constant, property, type, field, or event should differ from the names of all other members declared in the same class.
- The name of a method should differ from the names of all other non-methods declared in the same class.
- The signature of a method should differ from the signatures of all other methods declared in the same class.
- The signature of an instance constructor should differ from the signatures of all other instance constructors declared in the same class.
- The signature of an indexer should differ from the signatures of all other indexers declared in the same class.
- The signature of an operator should differ from the signatures of all other operators declared in the same class.
- The inherited members of a class are not part of the declaration space of a class. Therefore, a derived class is allowed to declare a member with the same name or signature as an inherited member. 

### 3.1. Inheritance

A class **_inherits_** the members of its direct base class. It implicitly contains all members of its direct base class, except for the instance constructors, destructors and static constructors of the base class. Inheritance is transitive. If C is derived from B, and B is derived from A, then C inherits the members declared in B as well as the members declared in A.

A derived class extends its direct base class. It can add new members to those it inherits, but it cannot remove the definition of an inherited member. Instance constructors, destructors, and static constructors are not inherited. A derived class can **_hide_** inherited members by declaring new members with the same name or signature.

A class can declare virtual methods, properties, and indexers, and derived classes can override the implementation of these function members. This enables classes to exhibit polymorphic behaviour wherein the actions performed by a function member invocation vary depending on the run-time type of the instance through which the function member is invoked.

### 3.2. Access Modifiers

It is a compile-time error to specify more than one access modifier, except for the protected internal combination.

When a _class-member-declaration_ does not include any access modifiers, private is assumed. A _class-member declaration_ can have any one of the five possible kinds of declared accessibility: public, protected internal, protected, internal, or private.

### 3.3. Static and Instance Members

Members of a class are either **_static members_** or **_instance members_**. Static members belong to classes, and instance members belong to objects (instances of classes). When a method, event, field, property, operator, or constructor declaration includes a static modifier, it declares a static member. Additionally, a constant or type declaration implicitly declares a static member. When a method, event, field, property, indexer, constructor, or destructor declaration does not include a static modifier, it declares an instance member.

### 3.4. Nested Types

A type declared within a class or struct is called a **_nested type_**. A type that is declared within a compilation unit or namespace is called a **_non-nested type_**.

**Remark:** this within a nested type cannot be used to refer to instance members of the containing type.

### 3.5. Access to Private and Protected Members of the Containing Type

A nested type has access to all of the members that are accessible to its containing type, including members of the containing type that have private and protected declared accessibility.

### 3.6. Reserved Member Names

For each member declaration that is a property, event, or indexer, the implementation must reserve two method signatures based on the kind of the member declaration, its name, and its type. It is a compile-time error for a program to declare a member whose signature matches one of these reserved signatures. The reserved names do not introduce declarations, thus they do not participate in member lookup. Destructor declaration causes a signature to be reserved.

For a property P of type T, the following signatures are reserved:

> T get\_P();

> void set\_P(T value);

Both signatures are reserved, even if the property is read-only or write-only.

For an event E of delegate type T, the following signatures are reserved:

> void add\_E(T handler);

> void remove\_E(T handler);

For an indexer of type T with parameter-list L, the following signatures are reserved:

> T get\_Item(L);

> void set\_Item(L, T value);

Both signatures are reserved, even if the indexer is read-only or write-only.

For a class containing a destructor, the following signature is reserved:

> void Finalize();

* * *

### 4. Constants

A **_constant_** is a class member that represents a constant value that can be computed at compile-time. A constant declaration that declares multiple constants is equivalent to multiple declarations of single constants with the same attributes, modifiers, and type. Constants are permitted to depend on other constants within the same program as long as the dependencies are not of a circular nature.

### 5. Fields

A **_field_** represents a variable associated with an object or class. A _field-declaration_ introduces one or more fields of a given type. It declares that multiple fields are the same as multiple declarations of single fields with the same attributes, modifiers, and type.

** **

### 5.1. Static and Instance Fields

When a _field declaration_ includes a static modifier, the fields introduced are **_static fields_**. When no static modifier is present, the fields introduced are _instance fields_. A static field is not part of a specific instance. There is only one copy of a static field for the associated application domain. An instance field belongs to an instance. Every instance of a class contains a separate set of all instance fields of the class.

### 5.2. Readonly Fields 

When a _field-declaration_ includes a readonly modifier, the fields are **_readonly fields_**. Direct assignments to readonly fields can only occur as part of the declaration or in an instance constructor (for readonly non-static fields) or static constructor (for readonly static fields) in the same class. Attempting to assign to a readonly field or passing it as an out or ref parameter in any other context results in a compile-time error.

* * *

### 6. Methods

A **_method_** is a member that implements a computation or action that can be performed by an object or class.

Methods are declared using _method-declaration_s. The _return-type_ of a method declaration specifies the type of the value computed and returned by the method. The _return-type_ is void if the method does not return a value.

The _member-name_ specifies the name of the method.

 

### 6.1. Method Parameters

The method’s _formal-parameter-list declares the parameters of a method, if any exist_.

### 6.2. Value Parameters

A parameter declared with no modifiers is a value parameter. It corresponds to a local variable that gets its initial value from the corresponding argument supplied in the method invocation. When a formal parameter is a value parameter, the corresponding argument in a method invocation must be an expression of a type that is implicitly convertible to the formal parameter type. A method is permitted to assign new values to a value parameter.

### 6.3. Reference Parameters

A parameter declared with a ref modifier is a reference parameter. It does not create a new storage location. A reference parameter represents the same storage location as the variable given as the argument in the method invocation. A variable must be definitely assigned before it can be passed as a reference parameter. Within a method, a reference parameter is always considered definitely assigned.

### 6.4. Output Parameters

A parameter declared with an out modifier is an output parameter. It does not create a new storage location.

An output parameter represents the same storage location as the variable given as the argument in the method invocation. A variable need not be definitely assigned before it can be passed as an output parameter, but following an invocation where a variable was passed as an output parameter, the variable is considered definitely assigned. Within a method an output parameter is considered initially unassigned and must be definitely assigned before its value is used. Every output parameter of a method must be definitely assigned before the method returns.

### 6.5. Static and Instance Methods

When a method declaration includes a static modifier, the method is said to be a static method. When no static modifier is present, the method is said to be an instance method. A static method does not operate on a specific instance, and it is a compile-time error to refer to this in a static method. On the other hand, an instance method operates on a given instance of a class, and this instance can be accessed as this.

* * *

### 7. Properties

A **_property_** is a member that provides access to a characteristic of an object or a class. The length of a string, the caption of a window, the name of a customer, and the size of a font are all examples of a property. Properties are a natural extension of fields and do not denote storage locations. The _type_ of a property declaration specifies the type of the property introduced by the declaration, and the _member-name_ specifies the name of the property.

The _type_ of a property must be at least as accessible as the property itself.

 

### 7.1. Static and Instance Properties

When a property declaration includes a static modifier, the property is said to be a **_static property_**. When no static modifier is present, the property is said to be an **_instance property_**. A static property is not associated with a specific instance. On the other hand, an instance property is associated with a given instance of a class, and this instance can be accessed as this in the accessors of the property.

### 7.2. Virtual, Sealed, Override, and Abstract Accessors

A virtual property declaration specifies that the accessors of the property are virtual. The virtual modifier applies to both accessors of a read-write property. It is not possible for only one accessor of a read-write property to be virtual.

An abstract property declaration specifies that the accessors of the property are virtual, but it does not provide an actual implementation of the accessors. Non-abstract derived classes are required to provide their own implementation for the accessors by overriding the property. A property declaration that includes both the abstract and override modifiers specifies that the property is abstract and overrides a base property. Abstract property declarations are only permitted in abstract classes. The accessors of an inherited virtual property can be overridden in a derived class by including a property declaration that specifies an override directive.

An overriding property declaration may include the sealed modifier. The accessors of a sealed property are also sealed. Except for differences in declaration and invocation syntax, virtual, sealed, override, and abstract accessors behave exactly like virtual, sealed, override and abstract methods.

* * *

### 8. Events

An **_event_** is a member that enables an object or class to provide notifications. Clients can attach executable code for events by supplying **_event handlers_**. An event can be used as the left hand operand of the += and -= operators.

Static and Instance Events When an event declaration includes a static modifier, the event is said to be a **_static event_**. When no static modifier is present, the event is said to be an **_instance event_**. A static event is not associated with a specific instance. On the other hand, an instance event is associated with a given instance of a class, and this instance can be accessed as this in the accessors of the event.

* * *

### 9. Indexers

An **_indexer_** is a member that enables an object to be indexed in the same way as an array. An indexer element is not classified as a variable; therefore, it is not possible to pass an indexer element as a ref or out argument.

The formal parameter list of an indexer defines the signature of the indexer, which consists of the number and types of its formal parameters. The element type and names of the formal parameters are not part of an indexer’s signature. The signature of an indexer must differ from the signatures of all other indexers declared in the same class. Indexers and properties are conceptually similar, but they differ in many ways. When an indexer declaration includes an extern modifier, the indexer is said to be an **_external indexer_**.

* * *

### 10. Operators

An **_operator_** is a member that defines the meaning of an expression operator that can be applied to instances of the class. There are three categories of overloadable operators:

1. Unary operators.

2. Binary operators.

3. Conversion operators.

An operator declaration must include both a public and a static modifier. When an operator declaration includes an extern modifier, the operator is said to be an **_external operator_**. For all non-external operators, the _operator body_ consists of a _block_ which specifies the statements to execute when the operator is invoked.

The parameter(s) of an operator must be value parameters. The signature of an operator must differ from the signatures of all other operators declared in the same class. All types referenced in an operator declaration must be at least as accessible as the operator itself. When the same modifier appears multiple times in an operator declaration, it results in a compile-time error. Each operator category imposes additional restrictions, as described in the following sections. Like other members, operators declared in a base class are inherited by derived classes.

* * *

### 11. Instance Constructors

An **_instance constructor_** is a member that implements the actions required to initialize an instance of a class.

_Constructor-declaration_s declare instance constructors. A _constructor-declaration_ may include a set of _attributes_, a valid combination of the four access modifiers, and an extern modifier. A constructor declaration is not permitted to include the same modifier multiple times.

The _identifier_ of a _constructor-declarator_ must name the class in which the constructor is declared. Specifying any other name results in a compile-time error. The formal parameter list defines the signature of an instance constructor and governs the process whereby overload resolution selects a particular instance constructor in an invocation. Each of the types referenced in the _formal-parameter-list_ of an instance constructor must be at least as accessible as the constructor itself. The optional _constructor-initialiser_ specifies another instance constructor to invoke before executing the statements given in the _constructor-body_ of this instance constructor.

When a constructor declaration includes an extern modifier, the constructor is said to be an **_external constructor_**. Because an external constructor declaration provides no actual implementation, its _constructor body_ consists of a semicolon. For all other constructors, the _constructor-body_ consists of a _block,_ which specifies the statements to initialize a new instance of the class. This corresponds exactly to the _block_ of an instance method with a void return type.

Instance constructors are not inherited. Thus, a class has no instance constructors other than those actually declared in the class. If a class contains no instance constructor declarations, a default instance constructor is automatically provided. Instance constructors are invoked by _object-creation-expression_s and through _constructor-initialiser_s.

 

### 11.1. Default Constructors

If a class contains no instance constructor declarations, a default instance constructor is automatically provided.

The default constructor simply invokes the parameter-less constructor of the direct base class. If the direct base class does not have an accessible parameter-less instance constructor, a compile-time error occurs. If the class is abstract, then the declared accessibility for the default constructor is protected. Otherwise, the declared accessibility for the default constructor is public. A default constructor is provided because the class contains no instance constructor declarations.

* * *

### 12. Static Constructors

A **_static constructor_** is a member that implements the actions required to initialize a class. Static constructors are not inherited, and cannot be called directly. **_The exact timing of static constructor execution is implementation-dependent._**

* * *

### 13. Destructors

A **_destructor_** is a member that implements the actions required to destruct an instance of a class. Destructors are not inherited. Thus, a class has no destructors other than the one that may be declared in it. Since a destructor is required to have no parameters, it cannot be overloaded. Thus, a class can have, at most, one destructor. Destructors are invoked automatically, and cannot be invoked explicitly. An instance becomes eligible for destruction when it is no longer possible for any code to use the instance.

Execution of the destructor for the instance may occur at any time after the instance becomes eligible for destruction. When an instance is destructed, the destructors in its inheritance chain are called, in order, from most derived to least derived. Destructors are implemented by overriding the virtual method Finalize on System.Object. Programs are not permitted to override this method or call it (or overrides of it) directly.

