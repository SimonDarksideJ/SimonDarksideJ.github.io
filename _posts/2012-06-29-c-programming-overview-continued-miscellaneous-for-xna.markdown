---
layout: post
title: C# Programming Overview continued - Miscellaneous for XNA
date: '2012-06-29 09:26:07'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

#### Here is the section for the specific updates for XNA, new improvements in .NET 3.5 and what is coming up for .NET 4.0.  This refreshes the previous post from Digipen for more up to date info.

* * *

### 1. C# 3.5

With the release of _Visual Studio 2008_, the _C#_ language has been updated to make use of .NET 3.5.

If you follow [this link](http://msdn.microsoft.com/en-us/library/bb332048 "MSDN - Whats new in .NET 3.5"), you will see what was added to .NET 3.5 which is what XNA is based upon and follow [this link](http://msdn.microsoft.com/en-us/library/bb383815(v=VS.90).aspx "What is new in C# 2008") for what is new in C# for 2008.

The main highlights for gaming are:

### 1.1.Common Language Runtime (.NET 3.5)

1.1.1 [Collections](http://msdn.microsoft.com/en-us/library/bb397727 "Collections improvements")

Collections have been improved with more Hashing support.

1.1.2 [Diagnostics](http://go.microsoft.com/fwlink/?LinkId=78955 "Event usage guide")

Mainly used by Windows app, the diagnostic namespace has been improved to provide more diagnostic information to aid developers.

1.1.3 [Garbage collection](http://msdn.microsoft.com/en-us/library/system.runtime.gcsettings.latencymode "New latency features")

The .NET garbage collector provides a high-speed allocation service with good use of memory and no long-term fragmentation problems.

Garbage collection was improved to give a developer more control over when garbage is collected.

Shawn (XNA God) Hargreaves wrote an excellent article on how to [maintain garbage in code](http://blogs.msdn.com/shawnhar/archive/2007/07/02/twin-paths-to-garbage-collector-nirvana).

1.1.4 [Threading](http://msdn.microsoft.com/en-us/library/system.threading.readerwriterlockslim "Better threadlock scenarios") – also see the [threadpool enhancements](http://msdn.microsoft.com/en-us/library/system.threading.threadpool "Threadpool enhancements")

### 1.2. Networking (.NET 3.5)

Microsoft’s Peer-to-Peer collaboration infrastructure provides a peer-to-peer network-based framework for collaborative serverless activities. Use of this framework enables decentralized networking applications that use the collective power of computers over a subnet or the Internet.

The [Socket](http://msdn.microsoft.com/en-us/library/system.net.sockets.socket) class has been enhanced for use by applications that use asynchronous network I/O to achieve the highest performance. A series of new classes have been added as part of a set of enhancements to the [Socket](http://msdn.microsoft.com/en-us/library/system.net.sockets.socket) namespace. These classes provide an alternative asynchronous pattern that can be used by specialized high-performance socket applications.

### 1.3. [Linq](http://msdn.microsoft.com/en-us/netframework/aa904594 "What is Linq") (.NET 3.5)

Language-Integrated Query (LINQ) is a new feature in Visual Studio 2008 and the .NET Framework 3.5. LINQ extends powerful query capabilities to the language syntax of C# and Visual Basic in the form of standard, easily-learned query patterns. This technology can be extended to support potentially any kind of data store.

### 1.4. [Object](http://msdn.microsoft.com/en-us/library/bb384062(v=VS.90).aspx "Object initialisers") / [Collection](http://msdn.microsoft.com/en-us/library/bb384062(v=VS.90).aspx "Collection initialisers") initialisers (C# 3.0/2008)

Enables initialization of collections or objects with an initialization list rather than specific calls to **Add** or another method, without the need for explicit constructor calls.

### 1.4. [Extension Methods](http://msdn.microsoft.com/en-us/library/bb383977(v=VS.90).aspx "Extension methods") (C# 3.0/2008)

Extend existing classes by using static methods that can be invoked by using instance method syntax.  Extensions are very useful for implementing your own methods on top of existing classes

[Nick Gravelyn](http://nickgravelyn.com/) and the guys at [http://www.xnawiki.com/](http://www.xnawiki.com/ "http://www.xnawiki.com/") have many details on how to use Extensions in XNA, there is even a whole [codeplex project](http://xnextensions.codeplex.com/ "XNA Extensions codeplex page") dedicated to them

### 1.4. [Lamda Expressions](http://msdn.microsoft.com/en-us/library/bb397687(v=VS.90).aspx "Lamda Expressions guide") (C# 3.0/2008)

Enables inline expressions with input parameters that can be bound to delegates or expression trees.

### 1.4. [Auto-Implemented Properties](http://msdn.microsoft.com/en-us/library/bb384054(v=VS.90).aspx "Auto-Implemented Properties") (C# 3.0/2008)

Enables declaration of properties by using simplified syntax

### 1.4. [Partial Method Definitions](http://msdn.microsoft.com/en-us/library/wa80x488(v=VS.90).aspx "Partial Methods") (C# 3.0/2008)

Partial types may now contain partial methods.

### 1.4. [Refactoring](http://msdn.microsoft.com/en-us/library/719exd8s(v=VS.90).aspx "Refactoring") (C# 3.0/2008)

Refactoring is the process of improving your code after it has been written by changing the internal structure of the code without changing the external behaviour of the code.

**\*Note will follow up with a section on .NET 4.0 and .NET 4.5 / WinRT at some later date**

* * *

### 2. C# 4.0

With the release of _Visual Studio 2010_, the _C#_ language has been updated to make use of .NET 4.0.

If you follow [this link](http://msdn.microsoft.com/en-us/library/ms171868(v=VS.100).aspx "MSDN - Whats new in .NET 4.0"), you will see what was added to .NET 4.0  and follow [this link](http://msdn.microsoft.com/en-us/library/bb383815(v=VS.100).aspx "What is new in C# 2010") for what is new in C# for 2010.  At this point it is unclear how much of the .NET 4.0 library will be available on the XBOX and Windows Phone 7.  More on the subject when it is available.

The main highlights are:

### 2.1.[Diagnostics and Performance](http://msdn.microsoft.com/en-us/library/dd264809(v=VS.100).aspx "Diagnostics usage") (.NET 4.0)

Earlier versions of the .NET Framework provided no way to determine whether a particular application domain was affecting other application domains, because the operating system APIs and tools, such as the Windows Task Manager, were precise only to the process level. Starting with the .NET Framework 4, you can get processor usage and memory usage estimates per application domain.

### 2.2.[Garbage Collection improvements](http://msdn.microsoft.com/en-us/library/ee787088(v=VS.100).aspx "Fundementals of Garbage collection") (.NET 4.0)

The .NET Framework 4 provides background garbage collection. This feature replaces concurrent garbage collection in previous versions and provides better performance.

### 2.3. [Covariance and Contravariance](http://msdn.microsoft.com/en-us/library/ee207183(v=VS.100).aspx "Covariance and Contravariance usage") (.NET 4.0)

Several generic interfaces and delegates now support covariance and contravariance.

Covariant and contravariant generic type parameters provide greater flexibility in assigning and using generic types. For example, covariant type parameters enable you to make assignments that look much like ordinary polymorphism. Suppose you have a base class and a derived class, named Base and Derived. Polymorphism enables you to assign an instance of Derived to a variable of type Base. Similarly, because the type parameter of the [IEnumerable\<T\>](http://msdn.microsoft.com/en-us/library/9eekhta0(v=VS.100).aspx) interface is covariant, you can assign an instance of IEnumerable\<Derived\> (IEnumerable(Of Derived) in Visual Basic) to a variable of type IEnumerable\<Base\>

### 2.4. [BigInteger](http://msdn.microsoft.com/en-us/library/system.numerics.biginteger(v=VS.100).aspx "New Biginteger structure") and [Complex Numbers](http://msdn.microsoft.com/en-us/library/system.numerics.complex(v=VS.100).aspx "New functions for complex mathematical support") (.NET 4.0)

Larger data types for those situations where you just do not have enough

### 2.5. [Tuples](http://msdn.microsoft.com/en-us/library/system.tuple(v=VS.100).aspx "New Tuples definition") (.NET 4.0)

In [mathematics](http://en.wikipedia.org/wiki/Mathematics) and [computer science](http://en.wikipedia.org/wiki/Computer_science) a **tuple** represents the notion of an ordered list of elements.  Tuples are often used to describe other mathematical objects and factor a lot in algebra and calculus.

### 2.6. [Various other improvements](http://msdn.microsoft.com/en-us/library/ms171868(v=VS.100).aspx "See the "Other New Features" section of the what is new guide") (.NET 4.0)

This is one to read up on, mainly minor updates or new methods for existing data types and functions.

One to look at is the Yield function –\*\*\*

### 2.7. [Dynamic Support](http://msdn.microsoft.com/en-us/library/dd264736(v=VS.100).aspx "Dynamic Keyword usage") (C# 4.0 / 2010)

Visual C# 2010 provides support for late binding to dynamic types by introducing a new type,

### 2.8. [Generate From Usage](http://msdn.microsoft.com/en-us/library/dd409796(v=VS.100).aspx "Generate from Usage defintion") (C# 4.0 / 2010) – also see the [walkthrough](http://msdn.microsoft.com/en-us/library/dd998313(v=VS.100).aspx "Generate from usage walkthrough")

The Generate From Usage feature enables you to use classes and members before you define them. Without leaving your current location in code, you can generate a stub for a class, constructor, method, property, field, or enum that you want to use but have not yet defined. This minimizes interruption to your workflow.

This is Microsoft’s answer to the latest practice of [TDD or Test Driven development](http://en.wikipedia.org/wiki/Test-driven_development "Test Driven Development on Wikipedia") where you program according to features and not how you implement them. (feature first, implementation later)

### 2.9. [IntelliSense Suggestion Mode](http://msdn.microsoft.com/en-us/library/exbffbc2(v=VS.100).aspx "List of supported members") (C# 4.0 / 2010)

IntelliSense now provides two alternatives for IntelliSense statement completion: completion mode and suggestion mode. Suggestion mode is used when classes and members are used before they are defined.

### 2.10.Live Semantic Errors (C# 4.0 / 2010)

The Live Semantic Errors feature has been enhanced in Visual C# 2010. The use of wavy underlines to signal errors and warnings as you type has been extended to include constructs that are outside of method bodies, such as return types, parameter types, and default values in method declarations.

 

* * *

### 3. Direct9 for XNA (updated from previous Digipen post)

XNA implements it is own library for the Direct 3D library, unless you are writing a windows project we do not even reference the Direct 3D libraries directly, XNA does that all for us.

The following Direct 3D classes, are all implemented in the XNA framework and continue to be improved.

**3.1. The “RenderStateManager” Class (now governed by the XNA GraphicsDevice Class)**

Renderstates are all handled by the GraphicsDevice class, this provides an abstraction layer to all the code needed to talk directly to the graphics card, including preparing it for data, changing renderstates, sending over vertices / indices, passing shader code and so on.

It is one of the very fundamental offerings of XNA that the bulk of the hard work is already done for us.

**3.2. The “Texture” Class (separate classes for XNA)**

XNA implements several Texture classes for manipulates a texture resource.  These are Texture2D and Texture3D

**3.3. The “PresentParameters” Class (no longer required)**

The XNA framework handles any work presenting or sending data to the graphics card, so this is not used in XNA

**3.4. The “Device” Class (Now graphicsdevice class)**

The GraphicsDevice class performs primitive-based rendering, creates resources, handles system-level variables,

Adjusts gamma ramp levels, gets and sets palettes, and creates shaders.

**3.5. The “Sprite” Class**

The Sprite class provides methods and properties that simplify the process of drawing sprites using

Direct3D.

**3.6. The “Font” Class**

The Font class encapsulates the textures and resources needed to render a specific font on a specific device.

* * *

### 4. DirectInput (updated from previous Digipen post)

Using XNA, we do not have access to Directinput, especially if you want cross platform support with XBOX360 or Windows Phone 7.

Instead XNA implements several STATE classes for each supported device, such as:

- Keyboard
- Mouse
- Gamepad
- Accelerometers (Windows Phone only) 

We will cover more on this during the tutorial.

* * *

### 5. DirectSound (updated from previous Digipen post)

Using XNA, we do not have access to Direct sound, especially if you want cross platform support with XBOX360 or Windows Phone 7.

The XNA has two main methods for handling audio, these being namely:

- Direct file access (for uncompressed audio only, e.g. WAV files)
- XACT integration 

Direct access is simple enough and similar to Direct Sounds implementations of playing a file.  The XACT integration is something else though, it is effectively a Sound studio for creating sound projects for XNA which XNA can then read and process though code.  XACT provides a lot of out of the box and easy to implement features such as:

- Sound
- Music
- Looped or repeating audio
- 3D sound 

We wo not be going into detail in this tutorial about XACT (trying to keep things simple for now) as the interface is quite involved and does take some time to learn.

* * *

### 6. DirectX.AudioVideoPlayback (updated from previous Digipen post)

Video playback has been an issue for sometime in the XNA framework as there was no native support until recently (and by recently I mean XNA 4.0 which is not even released yet)

To play video previously we had to rely on custom written components to break down a video into the pictures for each frame and then play them in sequence manually.  This put a lot of drain on the XNA framework and limited the size of videos that could be deployed.

Now in XNA 4.0 however there is a dedicated media library extension for handling video and stored media (pictures on a phone)

This is outside the scope of this tutorial but will try to get back to cover it later.

* * *

### 7. The “Vector2” Class (updated from previous Digipen post)

This is the same in XNA as in Direct3D, but it does go further and we also have Vector3, Vector4 classes.  There also a ton of helper methods on top of each class to manage and use them, we will cover some of these in this tutorial.

* * *

### 8. The “Matrix” Class (updated from previous Digipen post)

Matrix’s are fully supported in XNA as they were in Direct3D with the addition of more helper methods.  These will be covered in a future 3D tutorial.  We can use Matrix’s in 2D for additional effect but they are not mandatory.

* * *

### 9. XNA

I have been referring to XNA in passing so far in this tutorial, you should already know what XNA is and what it offers (what do you mean you have not already read the XNA help ;-)).

In short XNA is a game framework which is multi-platform (PC, XBOX360, Zune and Phone 7) and provides a much simpler framework for specifically developing games, this makes it easier for indie developers and newcomers to game development to build and deploy games.

Big Studio’s on average still write games using C++ and the native DirectX library (and even bypass it in some situations) as it is felt that C# is to slow for big game productions.  XNA may one day prove them wrong (after seeing some of the fantastic games written already using XNA) but I doubt it.

SO direct from the MSDN page for XNA, this is a list of what XNA offers.

<dt><a href="http://msdn.microsoft.com/en-us/library/bb203887(v=XNAGameStudio.40).aspx">
<h3>9.1. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/bb203887(v=XNAGameStudio.40).aspx">Content Pipeline</a> </p>
<p>The Content pipeline is a huge leap forward for multi-platform development as it gives you a singular method for accessing and delivering content for your game, such as images, models, fonts, videos and so on.  So no matter what platform you write for in XNA you are code is always the same and you can even share content easily between platforms (provided they can cope with it).  Some still think they can do it better but they will all come round eventually!! (Thanks Shawn)</p>
<dt><a href="http://msdn.microsoft.com/en-us/library/bb197298(v=XNAGameStudio.40).aspx">
<h3>9.2. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/bb197298(v=XNAGameStudio.40).aspx">Graphics</a> </p>
<p>Describes using XNA graphics for rendering 2D and 3D graphics. What more can you say, it handles graphics.</p>
<dt><a href="http://msdn.microsoft.com/en-us/library/bb203899(v=XNAGameStudio.40).aspx">
<h3>9.3. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/bb203899(v=XNAGameStudio.40).aspx">Input</a> </p>
<p>Identifies different methods and devices—keyboard, mouse, and Xbox 360 Controller—for retrieving user input. </p>
<dt><a href="http://msdn.microsoft.com/en-us/library/bb195038(v=XNAGameStudio.40).aspx">
<h3>9.4. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/bb195038(v=XNAGameStudio.40).aspx">Audio</a> </p>
<p>Provides overviews about audio technology and presents predefined scenarios to demonstrate how to use audio. </p>
<dt><a href="http://msdn.microsoft.com/en-us/library/dd254845(v=XNAGameStudio.40).aspx">
<h3>9.5. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/dd254845(v=XNAGameStudio.40).aspx">Media</a> </p>
<p>Describes how the XNA Framework <a href="http://msdn.microsoft.com/en-us/library/microsoft.xna.framework.media(v=XNAGameStudio.40).aspx">Microsoft.Xna.Framework.Media</a> namespace provides classes and methods for retrieving system media, including pictures and songs. </p>
<dt><a href="http://msdn.microsoft.com/en-us/library/bb199073(v=XNAGameStudio.40).aspx">
<h3>9.6. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/bb199073(v=XNAGameStudio.40).aspx">Storage</a> </p>
<p>Provides classes that allow reading and writing of files.  Also of note this can integrate with the content pipeline.  There is a fine line for what you write yourself and what you store in the content manager.  Basically things like settings files and high score files should be stored manually using the storage classes (be aware of issues with un-pluggable memory cards!!!) whereas if what you want to read is static then you should use the content manager.</p>
<p>Main difference is that the content manager is read only, if you want to write or update, then do it yourself.</p>
<dt><a href="http://msdn.microsoft.com/en-us/library/dd254747(v=XNAGameStudio.40).aspx">
<h3>9.7. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/dd254747(v=XNAGameStudio.40).aspx">Gamer Services</a> </p>
<p>Contains introductory articles describing how to use gamer services: working with player profiles and preferences, the Xbox Guide user interface, Guide-based messaging, and other features provided by Xbox LIVE. </p>
<dt><a href="http://msdn.microsoft.com/en-us/library/bb975801(v=XNAGameStudio.40).aspx">
<h3>9.8. </h3>
<p><a href="http://msdn.microsoft.com/en-us/library/bb975801(v=XNAGameStudio.40).aspx">Networking</a> </p>
<p>Contains introductory articles describing how to create and join multiplayer game sessions, manage game state across clients, and interact with the friends list. </p>
<dt>
<h3>9.9. <a href="http://msdn.microsoft.com/en-us/library/bb975657(v=XNAGameStudio.40).aspx">Hardware and Platforms</a> </h3>
<p>Provides information about programming for specific hardware types and platforms using the XNA Framework.</p>
<p>There are also a whole load of extended tutorials available on the <a href="http://creators.xna.com/" target="_blank">Creators Club</a> website as well as on <a title="MSDN XNA examples" href="http://msdn.microsoft.com/en-us/library/dd254702(v=XNAGameStudio.40).aspx" target="_blank">MSDN</a>, so your learning should not stop here.</p>
<hr>
<p> </p>
<p>So now you are up to date with the basics of Game frameworks and the basics of how to program.  Next week we start with the make up of a game and then on to building that first ominous project.</p>
<p>See you on the flip side.</p>
</dt>
</a></dt></a></dt></a></dt></a></dt></a></dt></a></dt></a></dt></a></dt>