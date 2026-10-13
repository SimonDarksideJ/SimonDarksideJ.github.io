---
layout: post
title: C# Programming Overview continued - Miscellaneous for XNA
date: 2012-06-29 09:26:07
tags: [2d tutorial, game development, xna]
---

## Here is the section for the specific updates for XNA, new improvements in .NET 3.5 and what's coming up for .NET 4.0. This refreshes the previous post from Digipen for more up to date info.

---

## 1. C# 3.5

With the release of *Visual Studio 2008*, the *C#* language has been updated to make use of .NET 3.5.

If you follow [this link](http://msdn.microsoft.com/en-us/library/bb332048.aspx), you'll see what was added to .NET 3.5 which is what XNA is based upon and follow [this link](http://msdn.microsoft.com/en-us/library/bb383815%28v=VS.90%29.aspx) for what's new in C# for 2008.

The main highlights for gaming are:

## 1.1.Common Language Runtime (.NET 3.5)

1.1.1 [Collections](http://msdn.microsoft.com/en-us/library/bb397727.aspx)

Collections have been improved with more Hashing support.

1.1.2 [Diagnostics](http://go.microsoft.com/fwlink/?LinkId=78955)

Mainly used by Windows app, the diagnostic namespace has been improved to provide more diagnostic information to aid developers.

1.1.3 [Garbage collection](http://msdn.microsoft.com/en-us/library/system.runtime.gcsettings.latencymode.aspx)

The .NET garbage collector provides a high-speed allocation service with good use of memory and no long-term fragmentation problems.

Garbage collection was improved to give a developer more control over when garbage is collected.

Shawn (XNA God) Hargreaves wrote an excellent article on how to [maintain garbage in code](http://blogs.msdn.com/shawnhar/archive/2007/07/02/twin-paths-to-garbage-collector-nirvana.aspx).

1.1.4 [Threading](http://msdn.microsoft.com/en-us/library/system.threading.readerwriterlockslim.aspx) - also see the [threadpool enhancements](http://msdn.microsoft.com/en-us/library/system.threading.threadpool.aspx)

## 1.2. Networking (.NET 3.5)

Microsoft's Peer-to-Peer collaboration infrastructure provides a peer-to-peer network-based framework for collaborative serverless activities. Use of this framework enables decentralized networking applications that use the collective power of computers over a subnet or the Internet.

The [Socket](http://msdn.microsoft.com/en-us/library/system.net.sockets.socket.aspx) class has been enhanced for use by applications that use asynchronous network I/O to achieve the highest performance. A series of new classes have been added as part of a set of enhancements to the [Socket](http://msdn.microsoft.com/en-us/library/system.net.sockets.socket.aspx) namespace. These classes provide an alternative asynchronous pattern that can be used by specialized high-performance socket applications.

## 1.3. [Linq](http://msdn.microsoft.com/en-us/netframework/aa904594.aspx) (.NET 3.5)

Language-Integrated Query (LINQ) is a new feature in Visual Studio 2008 and the .NET Framework 3.5. LINQ extends powerful query capabilities to the language syntax of C# and Visual Basic in the form of standard, easily-learned query patterns. This technology can be extended to support potentially any kind of data store.

## 1.4. [Object](http://msdn.microsoft.com/en-us/library/bb384062%28v=VS.90%29.aspx) / [Collection](http://msdn.microsoft.com/en-us/library/bb384062%28v=VS.90%29.aspx) initialisers (C# 3.0/2008)

Enables initialization of collections or objects with an initialization list rather than specific calls to **Add** or another method, without the need for explicit constructor calls.

## 1.4. [Extension Methods](http://msdn.microsoft.com/en-us/library/bb383977%28v=VS.90%29.aspx) (C# 3.0/2008)

Extend existing classes by using static methods that can be invoked by using instance method syntax. Extensions are very useful for implementing your own methods on top of existing classes

[Nick Gravelyn](http://nickgravelyn.com/) and the guys at [http://www.xnawiki.com/](http://www.xnawiki.com/) have many details on how to use Extensions in XNA, there is even a whole [codeplex project](http://xnextensions.codeplex.com/) dedicated to them

## 1.4. [Lambda Expressions](http://msdn.microsoft.com/en-us/library/bb397687%28v=VS.90%29.aspx) (C# 3.0/2008)

Enables inline expressions with input parameters that can be bound to delegates or expression trees.

## 1.4. [Auto-Implemented Properties](http://msdn.microsoft.com/en-us/library/bb384054%28v=VS.90%29.aspx) (C# 3.0/2008)

Enables declaration of properties by using simplified syntax

## 1.4. [Partial Method Definitions](http://msdn.microsoft.com/en-us/library/wa80x488%28v=VS.90%29.aspx) (C# 3.0/2008)

Partial types may now contain partial methods.

## 1.4. [Refactoring](http://msdn.microsoft.com/en-us/library/719exd8s%28v=VS.90%29.aspx) (C# 3.0/2008)

Refactoring is the process of improving your code after it has been written by changing the internal structure of the code without changing the external behaviour of the code.

**\*Note will follow up with a section on .NET 4.0 and .NET 4.5 / WinRT at some later date**

---

## 2. C# 4.0

With the release of *Visual Studio 2010*, the *C#* language has been updated to make use of .NET 4.0.

If you follow [this link](http://msdn.microsoft.com/en-us/library/ms171868%28v=VS.100%29.aspx), you'll see what was added to .NET 4.0 and follow [this link](http://msdn.microsoft.com/en-us/library/bb383815%28v=VS.100%29.aspx) for what's new in C# for 2010. At this point it is unclear how much of the .NET 4.0 library will be available on the XBOX and Windows Phone 7. More on the subject when it's available.

The main highlights are:

## 2.1.[Diagnostics and Performance](http://msdn.microsoft.com/en-us/library/dd264809%28v=VS.100%29.aspx) (.NET 4.0)

Earlier versions of the .NET Framework provided no way to determine whether a particular application domain was affecting other application domains, because the operating system APIs and tools, such as the Windows Task Manager, were precise only to the process level. Starting with the .NET Framework 4, you can get processor usage and memory usage estimates per application domain.

## 2.2.[Garbage Collection improvements](http://msdn.microsoft.com/en-us/library/ee787088%28v=VS.100%29.aspx) (.NET 4.0)

The .NET Framework 4 provides background garbage collection. This feature replaces concurrent garbage collection in previous versions and provides better performance.

## 2.3. [Covariance and Contravariance](http://msdn.microsoft.com/en-us/library/ee207183%28v=VS.100%29.aspx) (.NET 4.0)

Several generic interfaces and delegates now support covariance and contravariance.

Covariant and contravariant generic type parameters provide greater flexibility in assigning and using generic types. For example, covariant type parameters enable you to make assignments that look much like ordinary polymorphism. Suppose you have a base class and a derived class, named Base and Derived. Polymorphism enables you to assign an instance of Derived to a variable of type Base. Similarly, because the type parameter of the [IEnumerable\<T>](http://msdn.microsoft.com/en-us/library/9eekhta0%28v=VS.100%29.aspx) interface is covariant, you can assign an instance of IEnumerable\<Derived> (IEnumerable(Of Derived) in Visual Basic) to a variable of type IEnumerable\<Base>

## 2.4. [BigInteger](http://msdn.microsoft.com/en-us/library/system.numerics.biginteger%28v=VS.100%29.aspx) and [Complex Numbers](http://msdn.microsoft.com/en-us/library/system.numerics.complex%28v=VS.100%29.aspx) (.NET 4.0)

Larger data types for those situations where you just don't have enough

## 2.5. [Tuples](http://msdn.microsoft.com/en-us/library/system.tuple%28v=VS.100%29.aspx) (.NET 4.0)

In [mathematics](http://en.wikipedia.org/wiki/Mathematics) and [computer science](http://en.wikipedia.org/wiki/Computer_science) a **tuple** represents the notion of an ordered list of elements. Tuples are often used to describe other mathematical objects and factor a lot in algebra and calculus.

## 2.6. [Various other improvements](http://msdn.microsoft.com/en-us/library/ms171868%28v=VS.100%29.aspx) (.NET 4.0)

This is one to read up on, mainly minor updates or new methods for existing data types and functions.

One to look at is the Yield function -\*\*\*

## 2.7. [Dynamic Support](http://msdn.microsoft.com/en-us/library/dd264736%28v=VS.100%29.aspx) (C# 4.0 / 2010)

Visual C# 2010 provides support for late binding to dynamic types by introducing a new type,

## 2.8. [Generate From Usage](http://msdn.microsoft.com/en-us/library/dd409796%28v=VS.100%29.aspx) (C# 4.0 / 2010) - also see the [walkthrough](http://msdn.microsoft.com/en-us/library/dd998313%28v=VS.100%29.aspx)

The Generate From Usage feature enables you to use classes and members before you define them. Without leaving your current location in code, you can generate a stub for a class, constructor, method, property, field, or enum that you want to use but have not yet defined. This minimizes interruption to your workflow.

This is Microsoft's answer to the latest practice of [TDD or Test Driven development](http://en.wikipedia.org/wiki/Test-driven_development) where you program according to features and not how you implement them. (feature first, implementation later)

## 2.9. [IntelliSense Suggestion Mode](http://msdn.microsoft.com/en-us/library/exbffbc2%28v=VS.100%29.aspx) (C# 4.0 / 2010)

IntelliSense now provides two alternatives for IntelliSense statement completion: completion mode and suggestion mode. Suggestion mode is used when classes and members are used before they are defined.

## 2.10.Live Semantic Errors (C# 4.0 / 2010)

The Live Semantic Errors feature has been enhanced in Visual C# 2010. The use of wavy underlines to signal errors and warnings as you type has been extended to include constructs that are outside of method bodies, such as return types, parameter types, and default values in method declarations.

---

## 3. Direct9 for XNA (updated from previous Digipen post)

XNA implements its own library for the Direct 3D library, unless you are writing a windows project we don't even reference the Direct 3D libraries directly, XNA does that all for us.

The following Direct 3D classes, are all implemented in the XNA framework and continue to be improved.

**3.1. The "RenderStateManager" Class (now governed by the XNA GraphicsDevice Class)**

Renderstates are all handled by the GraphicsDevice class, this provides an abstraction layer to all the code needed to talk directly to the graphics card, including preparing it for data, changing renderstates, sending over vertices / indices, passing shader code and so on.

It is one of the very fundamental offerings of XNA that the bulk of the hard work is already done for us.

**3.2. The "Texture" Class (separate classes for XNA)**

XNA implements several Texture classes for manipulates a texture resource. These are Texture2D and Texture3D

**3.3. The "PresentParameters" Class (no longer required)**

The XNA framework handles any work presenting or sending data to the graphics card, so this is not used in XNA

**3.4. The "Device" Class (Now graphicsdevice class)**

The GraphicsDevice class performs primitive-based rendering, creates resources, handles system-level variables,

Adjusts gamma ramp levels, gets and sets palettes, and creates shaders.

**3.5. The "Sprite" Class**

The Sprite class provides methods and properties that simplify the process of drawing sprites using

Direct3D.

**3.6. The "Font" Class**

The Font class encapsulates the textures and resources needed to render a specific font on a specific device.

---

## 4. DirectInput (updated from previous Digipen post)

Using XNA, we don't have access to Directinput, especially if you want cross platform support with XBOX360 or Windows Phone 7.

Instead XNA implements several STATE classes for each supported device, such as:

- Keyboard
- Mouse
- Gamepad
- Accelerometers (Windows Phone only)

We will cover more on this during the tutorial.

---

## 5. DirectSound (updated from previous Digipen post)

Using XNA, we don't have access to Direct sound, especially if you want cross platform support with XBOX360 or Windows Phone 7.

The XNA has two main methods for handling audio, these being namely:

- Direct file access (for uncompressed audio only, e.g. WAV files)
- XACT integration

Direct access is simple enough and similar to Direct Sounds implementations of playing a file. The XACT integration is something else though, it is effectively a Sound studio for creating sound projects for XNA which XNA can then read and process through code. XACT provides a lot of out of the box and easy to implement features such as:

- Sound
- Music
- Looped or repeating audio
- 3D sound

We won't be going into detail in this tutorial about XACT (trying to keep things simple for now) as the interface is quite involved and does take some time to learn.

---

## 6. DirectX.AudioVideoPlayback (updated from previous Digipen post)

Video playback has been an issue for some time in the XNA framework as there was no native support until recently (and by recently I mean XNA 4.0 which isn't even released yet)

To play video previously we had to rely on custom written components to break down a video into the pictures for each frame and then play them in sequence manually. This put a lot of drain on the XNA framework and limited the size of videos that could be deployed.

Now in XNA 4.0 however there is a dedicated media library extension for handling video and stored media (pictures on a phone)

This is outside the scope of this tutorial but will try to get back to cover it later.

---

## 7. The "Vector2" Class (updated from previous Digipen post)

This is the same in XNA as in Direct3D, but it does go further and we also have Vector3, Vector4 classes. There are also a ton of helper methods on top of each class to manage and use them, we will cover some of these in this tutorial.

---

## 8. The "Matrix" Class (updated from previous Digipen post)

Matrices are fully supported in XNA as they were in Direct3D with the addition of more helper methods. These will be covered in a future 3D tutorial. We can use Matrices in 2D for additional effect but they are not mandatory.

---

## 9. XNA

I've been referring to XNA in passing so far in this tutorial, you should already know what XNA is and what it offers (what do you mean you haven't already read the XNA help ;-)).

In short XNA is a game framework which is multi-platform (PC, XBOX360, Zune and Phone 7) and provides a much simpler framework for specifically developing games, this makes it easier for indie developers and newcomers to game development to build and deploy games.

Big Studios on average still write games using C++ and the native DirectX library (and even bypass it in some situations) as it's felt that C# is too slow for big game productions. XNA may one day prove them wrong (after seeing some of the fantastic games written already using XNA) but I doubt it.

So direct from the MSDN page for XNA, this is a list of what XNA offers.

## 9.1. [Content Pipeline](http://msdn.microsoft.com/en-us/library/bb203887%28v=XNAGameStudio.40%29.aspx)

The Content pipeline is a huge leap forward for multi-platform development as it gives you a singular method for accessing and delivering content for your game, such as images, models, fonts, videos and so on. So no matter what platform you write for in XNA your code is always the same and you can even share content easily between platforms (provided they can cope with it). Some still think they can do it better but they will all come round eventually!! (Thanks Shawn)

## 9.2. [Graphics](http://msdn.microsoft.com/en-us/library/bb197298%28v=XNAGameStudio.40%29.aspx)

Describes using XNA graphics for rendering 2D and 3D graphics. What more can you say, it handles graphics.

## 9.3. [Input](http://msdn.microsoft.com/en-us/library/bb203899%28v=XNAGameStudio.40%29.aspx)

Identifies different methods and devices-keyboard, mouse, and Xbox 360 Controller-for retrieving user input.

## 9.4. [Audio](http://msdn.microsoft.com/en-us/library/bb195038%28v=XNAGameStudio.40%29.aspx)

Provides overviews about audio technology and presents predefined scenarios to demonstrate how to use audio.

## 9.5. [Media](http://msdn.microsoft.com/en-us/library/dd254845%28v=XNAGameStudio.40%29.aspx)

Describes how the XNA Framework [Microsoft.Xna.Framework.Media](http://msdn.microsoft.com/en-us/library/microsoft.xna.framework.media%28v=XNAGameStudio.40%29.aspx) namespace provides classes and methods for retrieving system media, including pictures and songs.

## 9.6. [Storage](http://msdn.microsoft.com/en-us/library/bb199073%28v=XNAGameStudio.40%29.aspx)

Provides classes that allow reading and writing of files. Also of note this can integrate with the content pipeline. There is a fine line for what you write yourself and what you store in the content manager. Basically things like settings files and high score files should be stored manually using the storage classes (be aware of issues with un-pluggable memory cards!!!) whereas if what you want to read is static then you should use the content manager.

Main difference is that the content manager is read only, if you want to write or update, then do it yourself.

## 9.7. [Gamer Services](http://msdn.microsoft.com/en-us/library/dd254747%28v=XNAGameStudio.40%29.aspx)

Contains introductory articles describing how to use gamer services: working with player profiles and preferences, the Xbox Guide user interface, Guide-based messaging, and other features provided by Xbox LIVE.

## 9.8. [Networking](http://msdn.microsoft.com/en-us/library/bb975801%28v=XNAGameStudio.40%29.aspx)

Contains introductory articles describing how to create and join multiplayer game sessions, manage game state across clients, and interact with the friends list.

## 9.9. [Hardware and Platforms](http://msdn.microsoft.com/en-us/library/bb975657%28v=XNAGameStudio.40%29.aspx)

Provides information about programming for specific hardware types and platforms using the XNA Framework.

There are also a whole load of extended tutorials available on the [Creators Club](http://creators.xna.com/) website as well as on [MSDN](http://msdn.microsoft.com/en-us/library/dd254702%28v=XNAGameStudio.40%29.aspx), so your learning shouldn't stop here.

---

So now you're up to date with the basics of Game frameworks and the basics of how to program. Next week we start with the make up of a game and then on to building that first ominous project.

See you on the flip side.
