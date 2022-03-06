---
layout: post
title: MonoGame NuGet packages updated 10th December
date: '2013-12-12 16:03:46'
tags:
- information
- monogame
- nuget
- portable-class-libraries
---

After a flurry of activity the MonoGame NuGet packages have been updated.

# 

# 3.1.2 – Dev Release as of 10th December 2013

They are as follows:

- 
### MonoGame (full)

– [https://www.nuget.org/packages/MonoGame/3.1.2-alpha](https://www.nuget.org/packages/MonoGame/3.1.2-alpha)

This package has everything you need to start up a MonoGame project without having to install anything previously (including MonoGame it’self), just start a blank project in the platform of your choice (Only Windows, Windows 8 C#/XAML and Windows Phone 8 supported at present) and add the NuGet package and your ready to go.

- 
### MonoGame (binaries only)

– [https://www.nuget.org/packages/MonoGame.Binaries/3.1.2-alpha](https://www.nuget.org/packages/MonoGame.Binaries/3.1.2-alpha)

If your project is already running MonoGame, just strip out all existing MonoGame references and dependencies and apply this NuGet package to update your version of MonoGame to the latest dev release.

- 
### MonoGame Content Processors

– [https://www.nuget.org/packages/MonoGame.ContentProcessors/3.1.2-alpha](https://www.nuget.org/packages/MonoGame.ContentProcessors/3.1.2-alpha)

If you are using one of the above releases you will also need to update the MonoGame content processors used in your content builder project.  Here is where this package comes in.  As above just strip out any MonoGame references and then apply this package to start building your content against the latest dev release.

And also in line with the above releases is my portable version of the MonoGame project for use in PCL solutions

- 
### MonoGame Portable

– [https://www.nuget.org/packages/MonoGame-Portable/3.1.2-Alpha](https://www.nuget.org/packages/MonoGame-Portable/3.1.2-Alpha)

To use this start up a new PCL project, import the NuGet package and you can build your game in a PCL project ready for consumption for a platform.  If you have not done this before then check out this post which walks you through it – [http://darkgenesis.zenithmoon.com/monogame-building-portable-solutions/](http://darkgenesis.zenithmoon.com/monogame-building-portable-solutions/)

If you want to know why making portable solutions are important, then read this article as well – [http://darkgenesis.zenithmoon.com/monogame-goes-portable/](http://darkgenesis.zenithmoon.com/monogame-goes-portable/)

* * *

# New Public release pending

If you are really not in to using dev release versions of solutions then fear now.  A full release of MonoGame, V3.2 is just around the corner.

Cannot say exactly when it will be (all work is voluntary to the project, so give the guys some slack!) but it will likely be within a few months.

Alongside that release, the MonoGame team is working hard on some well rounded and fully working samples for ALL platforms that MonoGame supports.  There has been a lot of comment about the state of the samples and examples that are available with MonoGame, your voices have been heard and the team is working very hard on ensuring any official samples both Work out of the box and are complete across all platforms, showing best practice when building Multi-platform solutions.

