---
layout: post
title: VSCode and Unity take another bold step forward
date: 2015-09-10 23:20:29
tags: [ramblings]
---

Today (September 10th) marks another notch in the VS Code journey to become THE lightweight multi-platform editor, the one editor to rule them all.

[![ width=]()](https://code.visualstudio.com/)[![ width=]()](http://unity3d.com/)

If you have been following previous articles of mine and others, there has been a big push to use VS Code’s C# features with Unity and to integrate them together seamlessly (well almost)

This was not without pain however:

- When you opened VS Code for the first time, you had to go through a process to open your project folder to get Intellisense working
- If you accidentally closed VS Code, you had to repeat the above again
- If you were working on multiple project, well it was a pain.
- Unity does not have a concept of a folder when launching an external application, so could not help.

Most devs however were happy to live with these constraints as the flexibility, power and speed they got from using the editor.

That is until NOW.

* * *


# Enter VS Code Version 0.8.0

The VS Code team have not been sitting on their laurels, they have listened, they have watched and through it all (with the help of the community) they have acted.

[As of 0.8.0](https://code.visualstudio.com/Docs/supporting/howtoupdate), the Unity integration has gotten even tighter and most of the old hindrances have been cast aside, giving developers a much more fluid working environment (and if you are on a MAC, it is even better #Grumble)

You can grab VS Code direct from the [VS Code website](https://code.visualstudio.com/Docs/supporting/howtoupdate) at:


### [https://code.visualstudio.com/](https://code.visualstudio.com/ "https://code.visualstudio.com/")

If you are on Windows, you will notice the installer also got an upgrade, so they can deliver more features directly to your machine.  If you do not like automatic updating, you can also turn that off if you wish ([https://code.visualstudio.com/Docs/supporting/FAQ#\_how-do-i-opt-out-of-vs-code-autoupdates](https://code.visualstudio.com/Docs/supporting/FAQ#_how-do-i-opt-out-of-vs-code-autoupdates "https://code.visualstudio.com/Docs/supporting/FAQ#\_how-do-i-opt-out-of-vs-code-autoupdates")).


## Documentation

Starting with the documentation, Unity has been promoted as one of the main integration’s for VS code, now with its own documentation page, which you can find here:


### [https://code.visualstudio.com/Docs/runtimes/unity](https://code.visualstudio.com/Docs/runtimes/unity "https://code.visualstudio.com/Docs/runtimes/unity")

There is lots of info in here, some of which I will highlight next.


## An integration asset

Thanks to a community member who jumped straight on the insider track for VS Code, a Plugin has been built for Unity to streamline the integration.

> To use this plugin, you need a minimum of **Unity V5.0+** and **VSCode 0.8.0** (for best results I found uninstalling the old version of VSCode first and then installing the latest best)

This can be found at:


### [https://github.com/dotBunny/VSCode](https://github.com/dotBunny/VSCode "https://github.com/dotBunny/VSCode")

[![VS Code in Unity](assets/img/posts/image-not-found.png)](https://github.com/dotBunny/VSCode)

This plugin works on both **MacOS** and **Windows** and gives you the following capabilities:

- An option to enable VS Code integration (_Editor –\> Assets –\> Enable Integration_), this updates your solution files and (more importantly) keeps them in sync.  This also sets the preferred external tool editor in the Unity preferences.  
**\*Note, the old “Sync MonoDevelop” option is now gone in the Unity editor from V5.2**
- It writes out the necessary (and sometimes hard to find) VS Code configuration files, including the ability to hide “non-code” files in the editor (hides things like .sln, .csproj and the ever present unity .meta files)  
There are a couple of other settings in there to help speed up the integration.
- Automatically launches VS Code direct to your project folder, EVERY-TIME.  no longer do you have to worry about keeping that window open, or switching around if you work on multiple projects

> _One thing to be aware of, once you enable the VSCode integration, changing your preferred code editor in the External Tools preferences will have no effect as the plugin takes over opening code files.  If you want to use another editor, you will have to disable the integration first using the setting shown above!_

These are just the main highlights as there are more features in there as well.

Currently you need to download the plugin files from [GitHub](https://github.com/dotBunny/VSCode) but a package is going on the Unity asset store, which when it is available, I will also post the link here.


## MAC Debugging

Lucky Mac owners (thanks to the power of Mono) will also get debugging support in VSCode for Unity using the above plugin, which sets things all nice and neat for you.

Sadly this is **Mac only** (you lucky Mac people!), although there are rumours of Windows and even Linux support on the way (hopefully in the not too distant future)


## OmniSharp Update

The back-end of VS Code got an overhaul, predominately the version of [OmniSharp](http://www.omnisharp.net/)used by VS code got updated.  This means even more code editing features are now available and it got a slight performance boost (what more speed?)

This updates and upgrades VS Code’s features in:

- Syntax Highlighting
- Bracket matching
- IntelliSense
- Snippets
- Code Lens
- Peek
- Go-to Definition
- Code Actions/Lightbulbs
- Go to symbol
- Hover

Even more C# goodness being brought in to the editor (I’m guessing those pesky Web developers get an update as well in there somewhere)


## Full markdown support and markdown preview engine

![Markdown Preview](assets/img/posts/image-not-found.png)

I am seriously considering running an offshoot blog with this feature, it will certainly help with my Source control markdown enabled readme files for the sites (GitHub and Bitbucket use this extensively)

By opening up any file with markdown code in it, you can simply hit **_Ctrl + Shift + V_** , and your view will be transformed in to a properly markdown converted page.

You can read more about this feature here:

[https://code.visualstudio.com/Docs/languages/markdown#\_markdown-preview](https://code.visualstudio.com/Docs/languages/markdown#_markdown-preview "https://code.visualstudio.com/Docs/languages/markdown#\_markdown-preview")

You seriously do not realise how powerful this feature is until you use it, no more pesky multiple commits to get a source control readme page updated (never mind that preview stuff, it always breaks on the website)

* * *


# In to the Mix

![width=](assets/img/posts/image-not-found.png)

There is a lot to take in here and the steps to get up and running with Unity have become far simpler.  I would highly recommend reading the rest of the release notes for the latest release of VSCode ([https://code.visualstudio.com/updates](https://code.visualstudio.com/updates "https://code.visualstudio.com/updates")), there are some nice surprises in there.

What is in store in the future?  Without a roadmap it is hard to be sure, but you can expect that the VSCode team are working hard to deliver the best of the best of the best (heck, get Will smith in here to do this bit) in lightweight code editing tools.

So if you want to debug on Windows, you will still need full Visual Studio for the moment, but since [Unity have also tightly integrated](http://blogs.msdn.com/b/visualstudio/archive/2015/09/08/unity-5-2-and-visual-studio-tools-for-unity-2-1) the new [Visual Studio Tools for Unity](https://www.visualstudio.com/en-us/features/unitytools-vs) and even added [Visual Studio Community edition](https://www.visualstudio.com/en-us/products/visual-studio-community-vs) in to the Windows installer, you should be all set.

If you just want to code, then [VSCode](https://code.visualstudio.com/)is the tool to use, when you are ready to deploy then switch on over to full Visual Studio with your built projects (or if you need to debug for the time being, unless you are a MAC user ![Confused smile](/assets/img/wordpress/2015/09/wlEmoticon-confusedsmile.png)), either way, the future is looking pretty bright!.

