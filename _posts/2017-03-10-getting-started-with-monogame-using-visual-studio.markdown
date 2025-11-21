---
layout: post
title: Getting Started with MonoGame using Visual Studio
date: 2017-03-10 12:04:02
tags: [game development, monogame]
---

MonoGame (for those of you not yet aware) is a Game Building Framework / API born from the ashes that was the Microsoft XNA Framework that provides a very easy to use API to build games. (or 3D Apps)

[![SquareLogo](/assets/img/wordpress/2017/03/squarelogo.png)](http://monogame.rocks)

What makes MonoGame far better than its XNA heritage, is that MonoGame is built from the ground up to be multi-platform, supporting many of today’s modern platforms, including:

- Android
- iOS / MacOS
- Windows 8 / Windows 10
- Linux
- Even Consoles
- And many more (still growing)

MonoGame has even extended the Content pipeline that XNA introduces (an asset management system) to also make assets like Art, Textures, Models and so on, work for every platform from a single configuration / building platform. 

> Check out the MonoGame Framework on their awesome site with an even more awesome URL:
> 
> [http://MonoGame.Rocks](http://MonoGame.Rocks) (Sooo cool)

**They truly believe in the “Build it once, Ship everywhere” moto.**

* * *


# Welcome to 2017

As of March 2017, Microsoft has now released their next generation development management suite called Visual Studio 2017 (actually I am running out of different things to call Visual Studio with all the hats it wears).  Visual Studio enables developers to Build / Manage / Deploy and maintain almost any software solution, especially on the Cloud.

With this new big release, the Monogame also kept pace and released the latest version of the framework, **MonoGame 3.6** , which includes full support for Visual Studio 2017.

**You can check out the full details on the 3.6 release on [http://MonoGame.Rocks](http://MonoGame.Rocks)**

> MonoGame 3.6
> 
> March 1, 2017 by [Tom Spilman](http://community.monogame.net/users/tom/activity) in [News](http://www.monogame.rocks/category/news/), [Releases](http://www.monogame.rocks/category/releases/)
> 
> We are happy to say that MonoGame 3.6 is now available for download. Thanks as always to all the hard work from the MG developer community that made this release possible!
> 
> - [MonoGame 3.6 for VisualStudio](http://www.monogame.rocks/releases/v3.6/MonoGameSetup.exe)
> - [MonoGame 3.6 for MacOS](http://www.monogame.rocks/releases/v3.6/MonoGame.pkg)
> - [MonoGame 3.6 Pipeline GUI Tool for MacOS](http://www.monogame.rocks/releases/v3.6/Pipeline.MacOS.pkg) standalone installer
> - [MonoGame 3.6 for Linux](http://www.monogame.rocks/releases/v3.6/monogame-sdk.run)
> - [MonoGame 3.6 Source Code On GitHub](https://github.com/mono/MonoGame/releases/tag/v3.6)
> - [MonoGame 3.6 Assemblies on NuGet](https://www.nuget.org/profiles/MonoGame)
> 
> You can read about the major fixes and features in our new [change log](https://github.com/MonoGame/MonoGame/blob/v3.6/CHANGELOG.md).

Like its predecessor Visual 2015, Visual Studio 2017 has full free support (thanks to Microsoft’s acquisition of Xamarin) for deploying to all of these platforms now. So it makes this open source FREE framework even better to pick up and start building with.

* * *


# Why not Unity, Unreal or Other Game thing X?

When you are picking the Game Development framework or engine to start with (or jump to), it is important to choose what you want to build your game / project in using something that suits your development style.

- Unity and Unreal have a great editor / GUI experience with some coding required, so it is a good fit if you like drag and drop.
- Scratch / Game maker and others offer a much more stripped down and basic experience meant to wet your appetite. Although I have seen some serious projects built with these
- XNA / FNA / MonoGame on the other hand, are a full coded experience. So if you prefer to control all the bits of your game and not rely on things being done for you, it is a better fit.

There are those who then also like to go even lower but we shall not mention such things so as not to scare the birds, lest they fly away.

> **My advice (as ever) has always been to choose what is the right fit for YOU and go with it.  If you end up getting lost, then try something else until you find the right home for YOU.**

Game Development is a very personal thing and the tool you choose should be your choice!

 

* * *


# Getting Started with MonoGame using Visual Studio

Now I get many questions or queries are posted on the MonoGame GitHub site and its accompanying Community forums about how to get started with MonoGame, how to build for platform X or where the nearest coffee shop is where I can start coding. Sadly, the last I usually struggle with as I down my 5th latte for the day and it is only 10am ![Confused smile](/assets/img/wordpress/2017/03/confused-smile.png) .

All of this prompted me to pick up the recording devices and record two video sessions, which you can check out below:

<iframe loading="lazy" width="300" height="215" src="https://www.youtube.com/embed/GOV75PxGOiA" frameborder="0" allowfullscreen="allowfullscreen"></iframe><iframe loading="lazy" width="300" height="215" src="https://www.youtube.com/embed/zphaylhOrm0" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

Each video has links to the source slides in the comments and walks through:

- What platforms are supported out of the box with each version
- What you need to get running with Android
- What you need to get running with iOS / MacOS
- What you need to get running with Windows 8 / Windows 10

Each also including hints/tips and gotcha’s for each platform (that relate to MonoGame, not how to setup an Apple ID)

* * *


# The long version

When I record such videos (as above), I also like to follow up with the slightly longer text version (just because some prefer not to watch videos).  It is a bit more work and sometimes when it is written down it is easier to refer to.  So I will run through here a summation of the videos.


## Getting Started with Visual Studio 2015

> (Slides for reference, can be found [here on SlideShare](http://bit.ly/2mn3Aqm))


### 1. Clean Visual Studio 2015 Install

When you install Visual Studio 2015 using the default options, you have a fully working .NET development environment, with MonoGame installed you get access to the following platforms:

    • Windows Desktop DX (classic)

    • Cross-Platform OpenGL (Linux / Windows / Etc)

    • Content Pipeline Extensions

With these projects, you have enough to get you “up and running” and start building your first game using MonoGame.  Each template includes all the necessary setup and boiler plate, including your first Game class “Game.cs”, which includes the all important game loop in which your game runs.  
Following any of the many tutorials or samples using these templates will set you on a nice easy to follow course for your first few projects.  You can even ship titles on these platforms via Steam or your distribution option of choice.  Either way there is a lot of help to get started.

> If you are intending to build a true “multi-platform” project, then I also recommend checking out one of my other videos for how to setup your project in the best way:  
> [http://bit.ly/monogamemulti-platform](http://bit.ly/monogamemulti-platform)

If you are just starting out or want to “test” a new project, then you do not need the above. Just start your new project, roll up your sleeves, brew a fresh pot of your favourite cup and start coding.


### 2. Building for Android

When you want to start tackling Android as your target platform, then you will need a few extra bits installed with your Visual Studio 2015 setup, namely:

![image](/assets/img/wordpress/2017/03/image.png)

    • The Xamarin Core module (C#/.NET Xamarin)

    • Android SDK for target builds

    • Android NDK (native dev kit) for target builds

    • Optionally, you can also install the Microsoft Visual Studio Android emulator

This will give you all the components you need for getting up and running with Android using the MonoGame Android template.  However, Android is a very fragmented platform and in all likelihood, you may need several projects or deployments in order to meet your distribution goals, such is the world of Android today.

My best advice is to survey the markets you want to deploy your game in to, gather the different API types and versions you will need to support those (as well as the capabilities of each device) and plan from there.  Having too few supported device types likely will mean too few installs to be profitable. Too many will mean you have a huge headache to maintain your game.  
If you follow the earlier advice for setting up a multi-platform project, this overall overhead will be greatly reduced, but it will always be a battle to keep up to date.

> P.S. if you can, avoid the Google device emulator and you will keep some sanity in reserve for when you desperately need it. That thing is just a nightmare sadly.  Use the Microsoft Android emulator instead, provided your machine can support running it (min 8GB memory required), else use physical devices for test.

Another service to also think about using is either the Xamarin Test Cloud or the recently announced Azure Mobile test ([http://mobile.azure.com](http://mobile.azure.com)). These platforms will test your android project on as many devices as you with and give you a full range of stats for how well it runs and what issues the devices may have. The new Azure solution is currently in preview so it is free to use for now, so check it out while it is free.


### 3. Building for iOS / MacOS

The setup for iOS is a little easier, as you only need the Xamarin Core module (C#/.NET Xamarin) installed with Visual Studio 2015. If you have already setup for Android, then you have everything you need ON YOUR WINDOWS MACHINE!  
 ![image](/assets/img/wordpress/2017/03/image-1.png)

However, to build for any Apple development platform you are going to need a MAC (in fact if you want to build for MacOS with MonoGame, you can ONLY do it from a Mac. No Widows dev for you. You’ll need either Xamarin or the new Visual Studio for Mac there, ON YOUR MAC).  This is required in order to build your code for deployment to a device or the Apple Store, part of the locked in culture of Apple development.

You can pick up a Mac Mini quite cheaply (I paid £50 for mine) provided it can support the following criteria:

    • It supports the latest version of the iOS SDK.

    • The latest version of Xcode.

    • Has Mac OS X Yosemite(10.10) & above installed.

 

You will also need an Apple Dev Center account registered and assigned to your device. 

> **If your prospective device does not support the above, do not buy it as you will just be wasting your money to use it for development**

If you want to use Xamarin’s extended capabilities with the Mac Build host or the Mac development environment, you will likely need to fork out for either a Xamarin License or use your MSDN subscription, either will do.

For more details on setting up your Mac so that Visual Studio can build against it, see this post:  
[https://developer.xamarin.com/guides/ios/getting\_started/installation/mac/](https://developer.xamarin.com/guides/ios/getting_started/installation/mac/)


### 4. Building for Windows 8.1 / Windows Mobile 8.1

To build for Windows 8.1, you still need a few extra bits. Mainly the development SDKs for Windows 8.1 and if you wish, the Phone emulators:  
 ![image](/assets/img/wordpress/2017/03/image-2.png)

You will also need a Windows Store account to publish your game to the Windows Store as well, however, this is now a onetime low fee and then you have it for LIFE.  Not a bad investment since it also gives you access to publish UWP games as well (see below).


### 5. Building for Windows 10 UWP

To build for Windows 10, like with Windows 8, you simply need the SDK’s for the versions of the Windows 10 UWP framework you intend to use, for MonoGame the minimum SDK’s you need are: 10240 & 10586. As newer SDK versions come out, grab them.  
Thankfully everything you need is installed by simply selecting the “Universal Windows App Development Tools” node in the Visual Studio Installer:  
 ![image](/assets/img/wordpress/2017/03/image-3.png)

You will also need to configure your Windows 10 machine in “Developer Mode” in order to side deploy and debug new UWP games on your machine.  When you first try to create a new UWP project or open an existing gone, Visual Studio with prompt you and take you to the settings page, which can be found here:

> Settings -\> Update & Security -\> For Developers


## Getting Started with Visual Studio 2017

> (Slides for reference, can be found [here on SlideShare](http://bit.ly/2lF1zqG))

The new Visual Studio 2017 installer is a lot more lightweight than what we had in 2015. It is a lot more streamlined and very similar to the Web Platform Installer for web solutions (if you have used that).

![image](/assets/img/wordpress/2017/03/image-4.png)

By default, NOTHING is selected and all you will install is the Core Visual Studio framework and editor.  All you can do with this is inspect existing projects and create new blank solutions, functional but you ca not do much.  TO get going you will need to explore some of the additional components / modules.


### 1. Clean Visual Studio 2017 Install

If you install just the Core Visual Studio 2017 and MonoGame, you wo not be able to do anything, the templates will not even show up.  To get started you will need a minimum of the .NET desktop development module:  
 ![image](/assets/img/wordpress/2017/03/image-5.png)

With this you have pretty much the same as in the default install of 2015, namely the ability to create projects in:

    • Windows Desktop DX (classic)

    • Cross-Platform OpenGL (Linux / Windows / Etc)

    • Content Pipeline Extensions

> As before, if you are just “playing” or testing, then fire up a new project and play.  If you are starting a new “proper” project, then I recommend you setup the project right from the beginning, as highlighted in my Multi-Platform solution setup video:
> 
> [http://bit.ly/monogamemulti-platform](http://bit.ly/monogamemulti-platform)  
>  


### 2. Building for Android

To build for Android you need to check the “Mobile Development with .NET” module:  
 ![image](/assets/img/wordpress/2017/03/image-6.png)

In this module you will need to check the additional properties pane on the right-hand side of the installer to ensure you have the additional components selected that you require for MonoGame development, as shown here:  
 ![image](/assets/img/wordpress/2017/03/image-7.png)

Just check you have the current Android NDK and SDK’s selected and you will be fine.  There is one thing to take note of though, that the Microsoft Android Emulator is NOT available from this module (as well as other optional Android NDK/SDK libraries).  If you want these additional features, then you will also have to check out the “Mobile Development Kit with C++” as shown here:  
 ![image](/assets/img/wordpress/2017/03/image-8.png)


### 3. Building for iOS

As with 2015, if you have installed an Android development setup, then you already have the necessary bits for iOS development in Visual Studio 2017, namely the “Mobile Development with .NET” module  
You’ll still have to get a MAC as a build host to build your projects (and a Mac to develop on for Mac development).  Check the section for 2015 for more details, it is exactly the same.


### 4. Building for Windows 10 UWP

Windows 10 development with Visual Studio 2017 has its own module as shown here:

![image](/assets/img/wordpress/2017/03/image-9.png)  
However, as with Android, you will need to inspect the Properties panel on the right-hand side of the installer to ensure you have all the necessary components needed for MonoGame, specifically the SDK’s.

![image](/assets/img/wordpress/2017/03/image-10.png)  
By default, only the Anniversary SDK (14393) is installed, for MonoGame you will also need 10240 & 10586, so be sure to select them.  This will ensure you have the widest coverage of Windows 10 devices out there.  
You can leave them out if you wish but you will have to Edit your project definition or be very careful with your Minimum and Target Platform selections when you create your project, else you will get lots of “errors”!!

> **\*NOTE, a late reported issue was fixed in MonoGame for standalone installs of Visual Studio 2017!**  
> **It was discovered that if Visual Studio 2017 was installed on top of / alongside Visual Studio 2015, it behaved differently and “just worked”.  However, when Visual Studio 2017 was install on its own or on a clean machine, the templates would simply not work.**  
> **A fix has already been delivered but it was after the MonoGame 3.6 release.  To use Visual Studio 2017 on its own, use the current [“Development” release of MonoGame](http://bit.ly/monogamevsdevsetup) until a point release is submitted.  There is currently very little difference between 3.6 and the development release, so it is completely fine.**

* * *


# Now you are up and running

With Visual Studio setup correctly and with the latest version 3.6 release of MonoGame installed, you should have everything you need to start building your game in MonoGame.

Feel free to check out the other videos on my channel or the full list of “Recommended” [MonoGame tutorials listed on the site to get going](http://www.monogame.rocks/documentation/?page=Tutorials). (although to be honest, almost any XNA 4.0 tutorial will do)  
I will be doing some more beginner sessions soon, so stay tuned.

 
