---
layout: post
read_time: true
show_date: true
title: MonoGame blasts into the future with DotNet core
date: 2020-08-13 21:31:15
description: Dotnet core is now the preferred style for getting access to MonoGame, learn all the tips and tricks here to get started. Video included.
img: brands/monogame.png
tags: [monogame]
author: Simon Jackson
github:  
---

<iframe src="https://giphy.com/embed/NxWk4NY7C59Fm" width="560" height="315" frameborder="0" allowfullscreen></iframe>

*MonoGame 3.8 gets a real boost*

MonoGame is certainly one of those frameworks where if you take your eye off it for a little while, it comes back to slap you in the face and remind you why it is still relevant.  
With the recent MonoGame 3.8 release, this is even more true than ever as we say goodbye to the old MSI approach for installing one of the best open-source game frameworks out there.

## Tl;DR

In Short, MonoGame has embraced a more modern style approach to framework delivery which is version independent and no longer requires you to install hard dependencies for the framework (beyond the [netcore SDK](https://dotnet.microsoft.com/download) provided by Microsoft)

- New DotNet core style approach to delivery.
- Project templates are now delivered as Visual Studio Extensions for Windows and Mac.
- Project templates are also available from the DotNet package repository.
- All tools are published to the DotNet Tools repository, working for all Operating systems, including Linux.
- Lots of major improvements to the framework (full change-list will be published with the 3.8 release)
- The MonoGame 3.8 project definitions are not compatible with projects created in previous versions, 3.8 is also unable to open older projects, so you will still need to use the MSI's to maintain older projects.    
  The advice is simply to copy your code to the newer templates and continue on from there, no other code changes should be needed.
- Still Free!

## A brief history of time MonoGame

![The forefather of MonoGame](https://web.archive.org/web/20250830163739im_/https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Microsoft_XNA_logo.svg/1200px-Microsoft_XNA_logo.svg.png)

*The forefather of MonoGame*

MonoGame owes its roots to its predecessor, Microsoft's XNA Game Framework.  It was a fabulous framework that gave every C# coder (and Visual Basic devs too) access to build awesome games for Windows, Xbox and eventually Windows Phone (gone too soon).  Sadly XNA left us at its peak, just as it was being introduced into education facilities and enabling many developers to get their first leg into the Game industry.

> Check out some of the awesome titles created with XNA during the [Dream Build Play](https://en.wikipedia.org/wiki/Dream_Build_Play) years where devs had the chance to make it big in a global developer competition for cash and glory.

Since XNA's demise, MonoGame has taken the framework with the full blessing of Microsoft and turned it in to the leading C# framework for building cross-platform games on:

- Windows
- Android
- iOS/Mac
- Linux
- Windows 10
- Xbox One (all versions)
- PlayStation 4
- Switch
- And many more past, present and future

## Blazing a new trail

![One framework for creatingpowerful cross-platform games](https://github.com/MonoGame/MonoGame.Logo/raw/master/FullColorOnLight/HorizontalLogo_512px.png)

*One framework for creatingpowerful cross-platform games*

MonoGame keeps going from strength to strength with each and every release, which is amazing considering most of the core team have full time jobs, but their passion never wavers.

> Check out the many titles, most of which are award-winning, that are out there on the [#BuiltWithMonoGame](https://twitter.com/search?q=%23BuiltWithMonoGame) tag, you may be surprised by more than a few.

The MonoGame 3.8 release brings with it one of the largest changes in MonoGame (and even XNA history) with the demolishing of the old "Installer". You might ask why that is so important, so here are my top reasons why you should care:

- Version independence  
  No longer is your machine version dependant on what you have installed.  From 3.8, you will be able to open any project with any future version and it will "just work".  No need to hunt for the installer for that specific version and lock your machine to editing that version of a project.
- Online delivery of dependencies  
  With all of MonoGame now published to NuGet and the DotNet core library, you no longer need to search for downloads or extra packages and possibly obsolete utilities, everything is online and all dependencies for that version will also be available online.  The days of hunting for a rogue dll are gone.
- Distributed tooling  
  The tools that support MonoGame for building/editing content and compiling shaders all used to be in the framework installers.  Now they are separate tools and you can install and use whichever version works for you.  Updating is also much easier as they can be updated independently of the core MonoGame framework.
- Unified delivery  
  You can now install MonoGame for whichever operating system or development style you want all using the same pattern. it is the same pattern no matter your preference, the only real choice now is whether you go IDE or No IDE.

There are a lot of fixes and enhancements as part of the MonoGame 3.8 release which the team have been working really hard on and we are seeing the first signs of extending beyond the bounds of the original XNA Framework API.

> Take a moment where you can to give the team some praise for all their hard works, whenever and wherever you can!

## NetCore CLI for the Win

<video class="gif-video" autoplay loop muted playsinline poster="/assets/img/wordpress/2020/07/netcoredemo.jpg" aria-label="Just do it"><source src="/assets/img/wordpress/2020/07/netcoredemo.webm" type="video/webm"></video>

*Just do it*

It's that simple building a project from the command-line and you can use your favourite slimline code editor to manage your code, as well as using the new standalone MonoGame Content Builder (MGCB) editor to manage your content (but of course, you could just edit the project file yourself)

> **Once Monogame 3.8 is released, check the [MonoGame documentation](https://docs.monogame.net/index.html) for more guidance on how to get setup using the CLI tools.**

## Visual Studio 2010 and Visual Studio for Mac

Of course, if (like me) you treasure your precious IDE and can't live without its full features, code management and tests, the MonoGame team still have you covered.

![Visual Studio Manage Extensions dialog showing the MonoGame project templates extension](/assets/img/wordpress/2020/07/1_VisualStudioExtensionManager.png)

![Visual Studio for Mac extension manager with the MonoGame Extension installed](/assets/img/wordpress/2020/07/1_VisualStudioMacExtensionManager.png)

The project templates are published on the respective Visual Studio Extension libraries and it's as simple as selecting the templates and clicking install to be able to build new MonoGame projects.

## It's all about the tools

MonoGame publishes three distinct tools, however, for most developers you only need to be concerned with the mgcb-editor, these are:

- MonoGame Content Builder (mgcb-editor)  
  The graphical GUI tool used for editing the content project projects (.mgcb) in your MonoGame solution.  This allows you to add / remove and manage your content ready to be picked up and processed when building your game.

- MonoGame Content Builder (mgcb)  
  The backend content builder pipeline that is used by the dotnet tools to compile and compress your assets ready for shipping with your game for a specific platform.

- MonoGame FX Compile Tool (2MGFX)  
  The backend effects/shader compiler that is used by the dotnet tools to compile and compress your shaders ready for shipping with your game for a specific platform.

The latter two tools can also be used in DevOps style building routines to automate the production and testing of your solution if that is how you rock.  This is made all the more easier now that the tools can be deployed separately without a packaged MSI.

**Installing the tools** is very easy, simply open a command prompt/terminal window and run the following **dotnet** commands, for example, the mgcb-editor:

```text
dotnet tool install -g dotnet-mgcb-editor
mgcb-editor --register
```

And that is it, the editor is installed and registered with your OS and Visual Studio. Just double-click a .mgcb file if you don't believe me.

> If you want to install development versions of the tools or templates, check the MonoGame documentation on the site for more information, simply needs a few extra arguments.

## The future is only beginning

The only caveat to watch out for with MonoGame 3.8 is that it is not backwards compatible, so you will still need the old MSI installers to edit projects built with MonoGame 3.7 and below.

Upgrading projects is easy enough however, just create a new project and migrate your code across.  All your code will still be safe and just work as the underlying MonoGame framework itself is backwards compatible.

[![The Darkside of MonoGame YouTube channel banner](/assets/img/wordpress/2020/07/2020-07-28_22-00-45.png)](http://www.youtube.com/c/TheDarksideofMonoGame)

Make sure you visit my [YouTube channel for MonoGame development](http://www.youtube.com/c/TheDarksideofMonoGame) for some videos showcasing how to get started with MonoGame and yet more content incoming.
