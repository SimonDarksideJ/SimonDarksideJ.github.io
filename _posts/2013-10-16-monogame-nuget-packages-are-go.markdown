---
layout: post
title: MonoGame NuGet packages are go!
date: 2013-10-16 13:48:57
tags: [monogame]
---

After a few last rash hours and feedback from the NuGet team themselves, I can finally announce that MonoGame finally has NuGet support 😀

> **Note**
> 
> Just did a quick browse on NuGet for MonoGame and you may see a few interesting surprises as there are several packages for engines and updates already available that make use of MonoGame.  Sadly this also means the actual MonoGame packages are listed last???

* * *


# Supported Platforms

In this first round, the NuGet packages only support the Microsoft platforms but it is expected to be expanded to all platforms that NuGet supports

- Windows Desktop (OpenGL)
- Windows 8
- Windows Phone 8

I am now turning my attention to Android and iOS as fast followers.

* * *


# Xamarin Support

Recently the community banded together to ad NuGet support into Xamarin studio to further expand NuGets reach, you can find the details for getting this up and running here:

[https://github.com/mrward/monodevelop-nuget-addin](https://github.com/mrward/monodevelop-nuget-addin)

Granted you are still a bit limited until the Mono Platforms are added to the package definitions but it is a start.


### But that is not all

It has already been suggested that the NuGet installations also be converted into Xamarin Components, so this is being looked in to as well.

* * *


# What packages are available?

SO that all bases are effectively covered there are two types of package:

- 

### Full package and references install

This package installs both the binaries and all necessary files (class files, XAML files, etc) needed to run MonoGame from a project.  This will optionally overwrite the local files in your project (you can choose not to) in order to get MonoGame running in either a blank or existing solution (with or without the MonoGame project templates)

- 

### Binaries only release

This package as the name suggests will only install the binaries, the main reason for this package is so that regular dev builds can be released and easily updated in your project without compiling the source yourself, especially useful for existing MonoGame projects where you just want the latest and (potentially) greatest.

* * *


# Getting installed

If you are familiar with NuGet then this will all be familiar to you, if you haven’t (1: where have you been? 2: stop what you are doing and read up on it  :P) then using these packages is very simple.

> \*Note, if you are installing the packages into an existing MonoGame project built using the existing templates, there are some clean-up tasks you will need to do first to remove the existing MonoGame references and project fixes, see below!

1. Check you have the latest version of NuGet installed, either from VS extensions or visiting [http://www.nuget.org](http://www.nuget.org) – supported in Express and full versions
2. Open your project, right-click your solution or project references and select “Manage NuGet packages”
3. Search for the MonoGame packages, oddly enough they are called “MonoGame” 😀
4. (optional) if you change the filter at the top of the screen from “Stable only” to “Include pre-release” then you will see the latest dev branch build
5. Done

If you have an existing MonoGame project you are installing these packages in to for the first time, you will need to do some cleanup of the old project references and the reason for this is because the NuGet packages package the references differently in order to make it more maintainable.

To clean up remove the following from your project and / or project .csproj file

- Any MonoGame references (obviously)
- Any SharpDX references
- For Windows Phone users, you will also need to remove the fix for the XNA references as this is now done elsewhere, just remove the additional target section titled “MonoGame\_RemoveXnaAssemblies”
- OpenGL projects, just remove MonoGame reference and NOT the third party references for SDL, TAO, Lidgren and OpenTK **Remove all non system refs including SDL, TAO, Lidgren and OpenTK**

One area the Binaries packages will really help with will be Library projects.

* * *


# 


# Last remarks

Hopefully these packages will be of use to MonoGame devs out there and if you have also enabled “NuGet Package Restore”, then your builds will be safe.

Additionally you will always be updated and you will get informed when new versions are available.

> \*Note with the Alpha builds, these are the current dev builds available and although all steps are taken to ensure they are fully working in test not everything may work as expected.  It is an easy way to get the latest community efforts but just be aware that they may have some features due to the size of the project ![Open-mouthed smile](/assets/img/wordpress/2013/10/wlEmoticon-openmouthedsmile2.png)

If you have thoughts, comments or suggestions on the packages then either comment here or post on the MonoGame Git discussions (not the codeplex ones as they are getting out of date these days )

