---
layout: post
title: Be careful of those SPECIAL names in Unity
date: 2016-02-02 20:06:24
tags: [unity3d]
---

[![SNAGHTML102d3441](/assets/img/wordpress/2016/02/SNAGHTML102d3441.png "SNAGHTML102d3441")](/assets/img/wordpress/2016/02/SNAGHTML102d3441.png)

Every once in a while you can be reminded of a simple fact, all tools have their own ways and means, each has its little tricks and those little things that if unknown, can trip you up in unexpected places, so too is it with Unity.

Unity is a very powerful engine and tool, but to master it you must learn how it works, what does not work and what to avoid.

> As ever reminded by that old quote:
> 
> “with Great power comes great responsibility”  
> (and a low shelf you will no doubt keep bumping your head in to)

One of those simple facts surrounds what you name things in your scripts and code (_your class names, NOT properties or enums_), as I will explain here.

* * *


# What is in a name?

Now it should be clear from just using Unity for 5 minutes that there are some names that you simply ca not call things in Unity, the most obvious being:

- MonoBehaviour – because almost everything is a MonoBehaviour
- Base types such as Vector2, Point, Canvas – because Unity already has those things and while you can use them, you wo not get the base functionality
- Reserved names – Basically anything within the Unity namespaces.  Just try creating your own “UnityEngine” class and see what happens!

There are more and Unity usually forewarns you if you are doing something it considers silly or inappropriate.

However, the same cannot be said for the platforms you build upon…  Does Unity also check those?

The answer sadly is NO.

* * *


# You can have any color you want, so long as it is red

This all came about as I was helping out one studio (as it is what I usually do) in testing their project as well as supporting them with building their Windows 10 UWP version (target several platforms from a single build, yes please).

There was an error that only popped up in the compiled version of their project which showed itself in one of two ways:

- A very helpful issue loading the project with the following error  “Object reference not set to an instance of an object” (not very helpful)
- The project opens with no issues, but when its built, you are suddenly assaulted with numerous errors:  
–  “Class has no property called x” or  
–  “Cannot implicitly convert type X to Y”

In this case I was testing, the developer had created a class called “ **SplashScreen** ” (which seems fairly innocuous), however when you dig under the hood you find that that BOTH Unity and the Microsoft platforms already have a type called SplashScreen.  Unity was able to work around its own type in the internal build making sure the version of the SplashScreen class in the project was different to Unity’s version of SplashScreen (most likely by using different namespaces).  When it came to the platform build however, **_the classes used in your project will OVERRIDE those used by the platform_**.

* * *


# If you test it they will come

So let’s test this so you can be better prepared if it happens. As far as I am aware this only affects all of the modern Windows platforms because they have full access to the Unity project directly from the platform (a very useful feature with .NET projects), although this could also affect any plug-in you write that is used by a platform (unless you follow the steps in the next section).

To replicate the issue, simply try the following:

1. Create a new blank project
2. Create a new script called **SplashScreen**
3. Build the project for any of the “Windows Store” platforms
4. Open the built project in Visual Studio or MonoDevelop

Look no errors, see.  **Now build it.**

And you will see a wrath of errors related to the SplashScreen class, as the project now thinks the classes in your project should be used over the type that is reserved for the platform.

* * *


# So what names should you NOT use

Now I have done some testing but it is not very extensive, so I will list what I have tested and found issues.

> If you find more, comment below and I will add them to the list.

- SplashScreen
- App
- Application
- Window
- UnityPlayer (This one surprised me as Unity itself does not warn against its use)

If you are aware of any more, feel free to comment below.

* * *


# How to avoid the problem completely

It is important to note this affects any class or type defined in your base project.  A simple way to avoid these headaches is to use your own namespaces in your classes, this means your code cannot be confuse with any other code or types of the same name (except your own ![Open-mouthed smile](/assets/img/wordpress/2016/02/wlEmoticon-openmouthedsmile.png)).  
To learn more about using namespaces, simply check out these references on the Unity Learn site:

- [http://docs.unity3d.com/Manual/Namespaces.html](http://docs.unity3d.com/Manual/Namespaces.html "http://docs.unity3d.com/Manual/Namespaces.html") – The manual reference to namespaces with a basic example
- [https://unity3d.com/learn/tutorials/modules/intermediate/scripting/namespaces](https://unity3d.com/learn/tutorials/modules/intermediate/scripting/namespaces "https://unity3d.com/learn/tutorials/modules/intermediate/scripting/namespaces") – The learn video on using namespaces

Stay safe and code well!

