---
layout: post
title: Automation and continuous delivery with MonoGame
date: 2015-05-23 21:06:24
tags: [automation, monogame, windows 10]
---

[![image](/assets/img/wordpress/2015/05/image.png "image")](/assets/img/wordpress/2015/05/image.png)

For a long time MonoGame had only spurious updates and not a lot of outward activity (as opposed to the frantic and sometimes chaotic internal goings on in the mass of community contributions), this garnered such comments as “Is MonoGame dead?”.

The team started a trend just over a year ago by releasing development NuGet packages and publishing the development builds on the main MonoGame.Net website.  Still however, there was a drive in the team to do more and make their efforts more public.

Fast forward to today and not only have the team released 2 major updates in as many months but they have also implemented an automated NuGet delivery solution.

* * *


# Continuous delivery

Thanks to a lot of hard work in the background the team have implemented continuous NuGet delivery in two phases:

- NuGet package generation on all successful Minor builds to the public NuGet servers, e.g. 3.4, 3.5, 3.6. These should be more frequent than previous builds.  No firm schedule has been published yet but we can expect fairly regular now that it is automated
- Development NuGet package production on every successful MonoGame build.  These are published to the [MonoGame development NuGet feed](http://teamcity.monogame.net/guestAuth/app/nuget/v1/FeedService.svc/) (see detail below for using this, not for the faint of heart)

So what do we get?  Well, the current NuGet landscape now stands as follows:   [![image](/assets/img/wordpress/2015/05/image1.png "image")](/assets/img/wordpress/2015/05/image1.png)

* * *


# MonoGame goes fully Universal

The obvious main contender that caused two releases in the recent months was the addition of the new Universal Windows Project (UWP / UAP), launched just in time for all the big announcements at the Microsoft Build conference this year. This opens the door to full Windows 10 development and all the platforms it currently supports: [![image](/assets/img/wordpress/2015/05/image2.png "image")](/assets/img/wordpress/2015/05/image2.png) And unlike most other frameworks, this is already available NOW, not a beta, not a pre-release and not just available to a few, but NOWand for everyone.

This means you can start building your MonoGame project for Windows, Phone, XBOX, IOT devices and even the HoloLens (when it is available) right NOW.

* * *


# Grabbing your releases

Starting with NuGet is fast and easy, just download the installer from the [MonoGame.Net downloads](http://www.monogame.net/2015/04/29/monogame-3-4/) page for your platform of choice:

- [MonoGame 3.4 for VisualStudio](http://www.monogame.net/releases/v3.4/MonoGameSetup.exe)
- [MonoGame 3.4 for MacOS](http://www.monogame.net/releases/v3.4/MonoGame.MacOS.pkg)
- [MonoGame 3.4 Pipeline GUI Tool for MacOS](http://www.monogame.net/releases/v3.4/Pipeline.MacOS.pkg) standalone installer
- [MonoGame 3.4 for Linux](http://www.monogame.net/releases/v3.4/MonoGame.Linux.zip)
- [MonoGame 3.4 Source Code On GitHub](https://github.com/mono/MonoGame/releases/tag/v3.4)
- [MonoGame 3.4 Assemblies on NuGet](https://www.nuget.org/profiles/MonoGame)

At the moment, you still need the main installer to get access to the awesome MonoGame Content Builder tool.  The team are still looking at alternate ways to deliver this tool but for now it is just in the installer. If you wish, you can then start a new project using the built in project templates and/or update your MonoGame / XNA references in your project with the MonoGame NuGet’s mentioned earlier from the public NuGet server.   With that you are ready to rock.

* * *


# Getting ahead of the curve

If you are the adventurous sort you can get your releases even faster (especially if a much needed fix has just been pushed to the repository). You have two options, you can either grab the development release installers (updated with each successful build):

> _NOTE: The new addin for MonoDevelop/XamarinStudio for Linux is coming soon! For now build from source._

- [MonoGame for Visual Studio](http://teamcity.monogame.net/repository/download/MonoGame_DevelopWin/latest.lastSuccessful/Windows/MonoGameSetup.exe?guest=1) (requires [VS2010, VS2012, VS2013 or VS2015](http://www.visualstudio.com/) and the latest [DirectX Runtime](http://www.microsoft.com/en-us/download/details?id=35))
- [MonoGame for Mac](http://teamcity.monogame.net/repository/download/MonoGame_DevelopMac/latest.lastSuccessful/MonoGame.pkg?guest=1) (includes the Mac and iOS assemblies, the Pipeline Tool, and the installs the addin for [Xamarin Studio](http://xamarin.com/studio) if installed)
- Standalone installer for the [MonoGame Pipeline Tool for Mac](http://teamcity.monogame.net/repository/download/MonoGame_DevelopMac/latest.lastSuccessful/Pipeline.MacOS.pkg?guest=1) (requires [Mono](http://www.mono-project.com/download/#download-mac))

You could also add our [develop branch NuGet feed](http://teamcity.monogame.net/guestAuth/app/nuget/v1/FeedService.svc/) to your IDE to get the latest development assemblies, here is how to add it.

- Open your Package Manager Settings and select **Package Sources** (as shown below)

> You can get to the Package Manager Settings by either going through your editors Tools menu or using the Manage button when editing/adding your NuGet packages.

[![image](/assets/img/wordpress/2015/05/image3.png "image")](/assets/img/wordpress/2015/05/image3.png)

- Click on the **+** symbol in the top-right corner of the window to add a new feed.
- Select the new option in the top list and enter a suitable Name for your new feed and paste in the NuGet dev feed link (shown below) in to the source field: [http://teamcity.monogame.net/guestAuth/app/nuget/v1/FeedService.svc](http://teamcity.monogame.net/guestAuth/app/nuget/v1/FeedService.svc) [![image](/assets/img/wordpress/2015/05/image4.png "image")](/assets/img/wordpress/2015/05/image4.png)
- Click OK and your new feed is ready, Just select it (instead of the Public NuGet source) when adding / updating your NuGet packages as shown here: [![image](/assets/img/wordpress/2015/05/image5.png "image")](/assets/img/wordpress/2015/05/image5.png)

> \*Note the screenshot above might look a bit different to what you are used to as it is the all new and latest NuGet UI ![Confused smile](/assets/img/wordpress/2015/05/wlEmoticon-confusedsmile.png) Previously feeds appeared as separate branches in the selection tree.

Obviously, if you are extremely crazy, you can also opt to bypass all this install or NuGet option and just use the MonoGame source direct from the GitHub project ![Open-mouthed smile](/assets/img/wordpress/2015/05/wlEmoticon-openmouthedsmile.png)

* * *


# Samples a plenty

As ever, the MonoGame project Samples have been updated with the latest releases (Plus a minor clean up fix to tidy up the removal of the old NuGet packages) [![image](/assets/img/wordpress/2015/05/image6.png "image")](/assets/img/wordpress/2015/05/image6.png)

Only the Platformer2D sample is fully supported across all platforms, NeonShooter and SpaceWar are still a work in progress (additionally the iOS / MACOS projects still need updating, mostly because anyone with a Mac is overly busy.  I have actually purchased a Mac Mini now so may be able to sort this out)

> If you have a sample or project you would like to propose to the MonoGame samples, craft it to the standards used by the samples repository and submit it, we would love to see more.  For now we’re working hard to get all our current sample games fully updated across all platforms.

* * *


# And Yet there is More!

MonoGame is really getting some love of late, especially on NuGet.  While checking and testing out the automated NuGet packages, I came across several new packages created specifically to support MonoGame games, here;s just a snippet of what I have found:

- 

### [TexturePacker-MonoGameLoader](http://www.nuget.org/packages/TexturePacker-MonoGameLoader/) – A handy tool for packing your images into spritesheets / atlases
- 

### [SharpNav.MonoGame](http://www.nuget.org/packages/SharpNav.MonoGame/1.0.0-alpha2) – A nav mesh pathfinding framework created for MonoGame
- 

### [MerjTek.WpfIntegration](http://www.nuget.org/packages/MerjTek.WpfIntegration.MonoGameControlWinGL/) – WPF framework that integrates with OpenGL or DIrectX
- 

### [Supernova Particle System for MonoGame](http://www.nuget.org/packages/Supernova-Particle-System/) – Particle engine for MonoGame (although last updated in 2013?)
- 

### [Farseer Physics Engine –](http://www.nuget.org/packages/FarseerPhysicsMonoGameWindows8/)Physics engine library for MonoGame (although I have also heard of a PCL version)
- 

### [Starbound Input](http://www.nuget.org/packages/Starbound.Input/) – An input event library for MonoGame
- 

### [DPSF](http://www.nuget.org/packages/DPSF/) – Another fantastic particle system engine
- 

### [Empty Keys UI](http://www.nuget.org/packages/EmptyKeysUI/) – XAML Based UI framework for MonoGame and other game engines

These are but a few, keep an eye out for others appearing.

* * *


# I bid you adieu

Well that is enough MonoGame news for now.  Still got to work on my beginner tutorials and a few other bits. Laters

