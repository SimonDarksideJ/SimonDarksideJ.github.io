---
layout: post
title: C# Programming Overview continued - Miscellaneous
date: '2012-06-29 09:24:09'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

 **This section of the tutorial is provided as is from the original Digipen tutorial, I will post a supplement to this post later which will cover the updates for XNA as well as for new features in .NET 3.5 and .NET 4 together with Visual Studio 2008 and 2010 respectively.**

**The original tutorial as stated earlier in the series was originally written in Visual Studio 2005 and .NET 2.0. **

**As a side note just to reiterate points earlier in the series, everything covered in this tutorial series will work just as well in the FREE express editions of visual studio as it does in the full Visual Studio suite.**

**On with the show**

* * *

### 1. C# 2.0

With the release of _Visual Studio 2005_, the _C#_ language has been updated to version 2.0.

**\*Note Were now using VS2010 & .NET 4 / Compact Framework 4 but with Windows 8 Releasing soon we will be up to Visual Studio 2012 and .NET 4.5 plus WinRT**

* * *

### 2. The “System.Diagnostics” Namespace <font color="#0000ff">&lt;- Still useful</font>

The System.Diagnostics namespace provides classes that allow the interaction with system processes,

event logs, and performance counters. It also provides classes that allow debugging the application and tracing the code execution.

**2.1. The “Stopwatch” Class**

The Stopwatch class provides a set of methods and properties that can be used to accurately measure elapsed time.

* * *

### 3. The “System.Drawing” Namespace<font color="#0000ff"> &lt;- Redundant now, but good for reference</font>

The System.Drawing namespace provides access to GDI+ basic graphics functionality.

**3.1. The “Rectangle” Structure**

The Rectangle structure stores a set of four integers that represent the location and size of a rectangle. A rectangle is defined by its width, height, and upper-left corner.

**3.2. The “Color” Structure**

The Color structure represents an “ARGB” color.

**3.3. The “PointF” Structure**

The PointF structure represents an ordered pair of floating point _x_– and _y_-coordinates. The pair defines a point in a two-dimensional plane.

**3.4. The “Point” Structure**

The Point structure represents an ordered pair of integer _x_– and _y_-coordinates. The pair defines a point in a two-dimensional plane.

**3.5. The “Font” Class**

The Font class defines a particular format for text, including font face, size, and style attributes.

* * *

### 4. The “System.Windows.Forms” Namespace <font color="#0000ff">&lt;-Note XNA does not use this natively, we now use a game window</font>

The System.Windows.Forms namespace contains classes used for creating Windows-based applications that take full advantage of the user interface features available in the Microsoft Windows operating system.

**4.1 The “Form” Class**

The Form class represents a window or dialog box that makes up an application’s user interface.

* * *

### 5. The “System.Collections.Generic” Namespace<font color="#0000ff"> <strong>&lt;- still very useful today!!</strong></font>

The System.Collections.Generic namespace contains interfaces and classes that define generic collections.

These interfaces and classes allow users to create strongly typed collections that provide better type safety and performance than non-generic strongly typed collections.

**5.1. The “List\<T\>” Class**

The List\<T\> class implements the IList\<T\> interface using an array whose size is dynamically increased as required.

* * *

### 6. Generics <font color="#0000ff">&lt;- This important, take note</font>

Generics are a new feature in version 2.0 of the _C#_ language. Generic types are added to the language to enable the programmer to achieve a high level of code reuse and enhanced performance for collection classes. They are used with collections and the methods that operate on them.

Generics introduce the concept of type parameters. Generic classes encapsulate operations that are not specific to any particular data type. The most common use for generic classes is with collections like:

1. Linked lists
2. Hash tables
3. Stacks
4. Queues
5. Trees 

It is useful to define interfaces either for generic collection classes, or for the generic classes that represent items in the collection. It is preferable to use generic interfaces with generic classes.

A generic method is a method that is declared with type parameters. Non-generic methods can access the class-level type parameters within a generic class. Generic methods can be overloaded on a number of type parameters. Delegates defined within a generic class can use the generic class type parameters in the same way that class methods do. Generic delegates are especially useful in defining events based on the typical design pattern. A new namespace called System.Collections.Generic includes several ready-to-use generic collection classes and associated interfaces.

* * *

### 7. The “Exception” Class <font color="#0000ff">&lt;-Also very important still today</font>

The _Exception_ class represents errors that occur during application execution. This class is the base class for all exceptions. When an error occurs, either the system or the currently executing application reports it by throwing an exception containing information about the error. Once thrown, an exception is handled by the application or by the default exception handler.

If an application handles exceptions that occur during the execution of a block of application code, the code must be placed within a try statement. When an exception occurs in a try block, the system searches the associated catch blocks in the order they appear in application code, until it locates a catch block that handles the exception. A catch block handles an exception of type “T” if the type filter of the catch block specifies “T” or any type that “T” derives from. The system stops searching after it finds the first catch block that handles the exception.

* * *

### 8. DirectX <font color="#0000ff">&lt;- Not so much 😉 – Now we use XNA to abstract from Direct X</font>

DirectX is a set of interfaces for creating games and other high-performance multimedia applications. It supports two-dimensional (2-D) and three-dimensional (3-D) graphics, sound effects and music, input devices, and networked applications.

* * *

### 9. Direct3D <font color="#0000ff">&lt;- Pinch of salt, covered more/better later</font>

Direct3D enables you to manipulate visual models of 3-dimensional objects and take advantage of hardware acceleration, such as video graphics cards.

**9.1. The “RenderStateManager” Class**

The RenderStateManager class defines device render states.

**9.2. The “Texture” Class**

The Texture class manipulates a texture resource.

**9.3. The “PresentParameters” Class**

The PresentParameters class describes the presentation parameters.

**9.4. The “Device” Class**

The Device class performs primitive-based rendering, creates resources, handles system-level variables,

Adjusts gamma ramp levels, gets and sets palettes, and creates shaders.

**9.5. The “Sprite” Class**

The Sprite class provides methods and properties that simplify the process of drawing sprites using

Direct3D.

**9.6. The “Font” Class**

The Font class encapsulates the textures and resources needed to render a specific font on a specific device.

* * *

### 10. DirectInput<font color="#0000ff"> &lt;- Same as Direct 3D, more later</font>

DirectInput is used to process data from a keyboard, mouse, joystick, or other game controller.

**10.1. The “Device” Class**

The Device class is used to gain and release access to DirectInput devices, manage device properties and information, set behaviour, perform initialization, create and play force-feedback effects, and invoke a device’s control panel.

**10.2. The “Key” Enumeration**

The Key enumeration includes all the available keyboard keys.

* * *

### 11. DirectSound<font color="#0000ff"> &lt;- Same as Direct 3D, more later</font>

DirectSound is used to capture sounds from input devices and play sounds through various playback devices using advanced 3-dimensional positioning effects and filters for echo, distortion, reverberation, and other effects.

**11.1. The “Device” Class**

The Device class contains methods and properties that are used to create buffer objects, manage devices, and set up the environment.

**11.2. The “SecondaryBuffer” Class**

The SecondaryBuffer class contains methods and properties that are used to manage sound buffers that can support effects.

* * *

### 12. DirectX.AudioVideoPlayback <font color="#0000ff">&lt;- same idea different implementation, more later (this caused some problems in the early day of XNA, loosing this!!)</font>

The AudioVideoPlayback interface provides for basic playback and simple control of audio and video files.

**12.1. The “Audio” Class**

The Audio class is primarily designed for very simple playback scenarios, or for use with the Video class.

* * *

### 13. The “Vector2” Class <font color="#0000ff">&lt;-Pretty much the same today, just improved</font>

The Vector2 class describes and manipulates a vector in two-dimensional space.

* * *

### 14. The “Matrix” Class <font color="#0000ff">&lt;-Pretty much the same today, just improved</font>

The Matrix class describes and manipulates a matrix.

* * *

 

As promised the new and improved Misc section for today’s technology will arrive shortly.

Later’s

