---
layout: post
title: MonoGame 3.2 NuGet packages are GO!
date: 2014-04-13 10:05:52
tags: [monogame]
---

[![image](/assets/img/wordpress/2014/04/image.png "image")](/assets/img/wordpress/2014/04/image.png)  [![image](/assets/img/wordpress/2014/04/image1.png "image")](/assets/img/wordpress/2014/04/image1.png)     [![image](/assets/img/wordpress/2014/04/image2.png "image")](/assets/img/wordpress/2014/04/image2.png)

Just over a week ago the MonoGame released the latest full package for the MonoGame framework, now baselined at Version 3.2


### [MonoGame 3.2](http://www.monogame.net/2014/04/07/monogame-3-2/)

This release brought numerous fixes, improvements and new features to the MonoGame platform and updated the Windows installer that had long needed some love.

It took a while but I finally managed to find some spare few hours to get the MonoGame NuGet releases updated to the 3.2 release, with a few extra surprises.

* * *


### [MonoGame NuGet 3.2](https://www.nuget.org/packages/MonoGame/)

This contains the project templates for WindowsGL / Windows 8 / Windows Phone

iOS / MacOS / Android templates coming soon.

Has a dependancy on the MonoGame.Binaries NuGet package


### [MonoGame/Binaries NuGet 3.2](https://www.nuget.org/packages/MonoGame.Binaries/)

Contains the DLL’s and references for the following platforms:

- Android (new)
- iOS (new)
- MacOS (new)
- Windows GL
- Windows 8 / 8.1
- Windows Phone 8 (silverlight projects)


### [MonoGame.ContentProcessors NuGet 3.2](https://www.nuget.org/packages/MonoGame.ContentProcessors/)

This contains the DLL update references for Content projects built using a MonoGame Content Builder Project.

To use remove the ContentProcessors reference from the “Content” project and install this NuGet as normal

\*\*Note, you will need to **exclude** the “ **packages.config** ” file from the project when installed,

NuGet puts that in automatically but content projects do not recognise it as a valid content type


### [MonoGame.Portable NuGet 3.2](https://www.nuget.org/packages/MonoGame-Portable/)

Updated again in line with the 3.2 release.

Added some new support that was added with 3.2, including GamePads, keyboards and a few other tidbits.

Still only supports Windows based platforms but we are working on a plan to increase the scope of the portable project for all client platforms

MonoGame Portable is still maintained by me separate to the main MonoGame repo, so any issues please direct them to me and the separate [MonoGame.Portable fork](https://github.com/DDReaper/MonoGame/tree/develop.portable).  once the new way of generating the Portable package and it gets consumed by the main project, this too will join the official family.

* * *


## A note about the recent release of Windows Phone 8.1

At present MonoGame does not support Windows Phone 8.1 APP projects, this includes the new Universal App templates.  Nearly managed to add support through the NuGet packages but there are just enough subtle differences still between Windows 8.1 and Windows Phone 8.1 that it will require code changes to handle.

Although I suspect a PR will no doubt appear soon enough to resolve this.

When MonoGame can support Windows Phone 8.1 App projects, the Nuget’s will get a refresh.

