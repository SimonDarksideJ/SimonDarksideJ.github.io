---
layout: post
title: XNA is no more, as the phoenix rises from the ashes
date: 2015-03-17 23:44:04
tags: [monogame, xna]
---

I personally hate link-baity titles, however this one is completely justified.

[![image](/assets/img/wordpress/2015/03/image.png "image")](http://www.monogame.net/)

 

We have finally reached the end of an era and the dawn of the next with the [MonoGame](http://www.monogame.net/) project.  The latest release has now broken its ties to the old XNA framework and stands alone.

> ### No longer is XNA required to use MonoGame

This is an epic milestone as MonoGame finally realises its dream of journeying beyond the realms of what XNA had to offer (some might argue it already did that with all the platforms that MonoGame supports) and is building capabilities that never existed before in XNA.  Granted this is not a big rush forward but small baby steps inching forward.

* * *


# Everything that has come before

As it stands, MonoGame implements practically the full set of functionality that XNA did, meaning that all your old XNA 4.0 projects will be compatible with MonoGame.  There may be one or two little hiccups (this baby is taking its first proud new steps in the world) along the way but it has a proud tradition of hardy developers backing up this project.

> #### Did I mention that no one on the MonoGame team is getting paid for this? It is completely funded by developers free time and effort! You have to respect that.
> 
> #### Any contributions to the project go in to the project’s needs, like Servers, Websites and merchandise!

* * *


# A brave new world

You might wonder what makes this announcement so special, why all the pomp and circumstance?

The answer is simple, the XNA ties have been broken and with that developers can now develop their MonoGame projects on their platform of choice. With the 3.3 release the platforms you can fully DEVELOP on now include:

- Windows 7 / 8 / 8.1 (but you knew that already)
- MacOS (using MonoDevelop)
- Linux

Now this part is not really new, you could do that before, however what you could not do was build all the content needed for your project. Prior to 3.3 you needed a Windows host somewhere to compile your content. With 3.3 however, you can now do that on all the above platforms, Windows is no longer required (but who wants to give up visual studio anyway?)

> #### With the new MonoGame Content Builder tool, developers can build content on Windows, MacOS or Linux.

There are even new MonoDevelop (or Xamarin Studio if you prefer) plugins and templates (Thanks to Dean Ellis of the MG team), so this is now fully supported.

* * *


# Supported platforms

The currently supported list of platforms maintained by MonoGame as of the 3.3 release include:

- Android
- iOS (64bit metal only)
- Linux
- MacOS (net4, net45, MonoMac and Xamarin.Mac)
- Ouya
- Windows OpenGL
- Windows DirectX
- Windows 8 / 8.1
- Windows Phone 8 / 8.1
- Windows Universal apps (I’ll come back to this)

There is an experimental 3.3 PCL platform release, however this is still a work in progress.  There are no issues using it, just be aware some classes / namespaces aren’t recognised.  All this means is that some code ca not live in the PCL at the moment but we’re working on this.

MonoGame also supports most consoles (more in the future) but you need contracts with them before you can even start considering it!.  Chat to us if you have specific plans and the team can help.

* * *


# Getting Started

I wo not go in to this too much here as I am planning a series of starter tutorials / videos to help you get going.

To get started you need to install the MonoGame development templates and tools from:

> #### [http://www.monogame.net/2015/03/16/monogame-3-3-2/](http://www.monogame.net/2015/03/16/monogame-3-3-2/ "http://www.monogame.net/2015/03/16/monogame-3-3-2/")

Here you will find:

- [MonoGame 3.3 for VisualStudio](http://www.monogame.net/releases/v3.3/MonoGameSetup.exe)
- [MonoGame 3.3 Binaries for Mac](http://www.monogame.net/releases/v3.3/MonoGame_Mac.zip)
- [MonoGame 3.3 Pipeline GUI Tool Package for Mac](http://www.monogame.net/releases/v3.3/Pipeline.Installer.pkg)

Also (if you prefer) you can also find MonoGame 3.3 on NuGet:

[![image](/assets/img/wordpress/2015/03/image.png "image")](/assets/img/wordpress/2015/03/image1.png)

Which of course you can also install on top of existing projects to keep up to date.

* * *


# NuGet Gotcha’s

There are a few pointers about the NuGet’s you need to be aware of before installing some of the NuGets (any not mentioned are perfectly fine)

- WindowsGL – With WindowsGL you need to remove the “SDL.DLL” from the project before installing the NuGet. This is just a conflict that NuGet cannot resolve.  No worries through, the NuGet installs a fresh one for you.
- Windows Phone 8.0 – Because the project template ships with both x86 and ARM dlls, NuGet is not able to uninstall all the references. This causes reference duplication errors.  To resolve this you will need to edit your projects .csproj file and remove referenced to MonoGame.Framework before installing (you can do it afterwards, it just makes it more tricky!)

I will go over these in more detail in future posts.

* * *


# An Ode to XNA

[![image](/assets/img/wordpress/2015/03/image1.png "image")](/assets/img/wordpress/2015/03/image2.png)[![image](/assets/img/wordpress/2015/03/image2.png "image")](/assets/img/wordpress/2015/03/image3.png)

Now just because MonoGame has moved on, cleaned out its room and left the home it once knew, venturing on a brave new adventure, does not mean you still ca not use XNA ![Open-mouthed smile](/assets/img/wordpress/2015/03/wlEmoticon-openmouthedsmile.png)

XNA still lives on in many universities across the globe and is still used quite aggressively by developers still publishing (and making money) on the Xbox Live Gaming Service for the Xbox 360.  In fact at a recent Game Jam (The hull university 3 word game jam [http://www.robmiles.com/journal/2015/3/14/three-thing-game-finals](http://www.robmiles.com/journal/2015/3/14/three-thing-game-finals "http://www.robmiles.com/journal/2015/3/14/three-thing-game-finals")) there were many students building their projects in XNA (the majority actually), a few adventurous champions were using MonoGame plus a few (what I can only call crazy) devs using OpenGL, MatLab and one brave soul doing direct Raster drawing.

 

I have to thank the visionaries at Microsoft who dared to dream of a managed game development world, where devs could break their C++ shackles and actually have fun building games, I know I certainly did.

> ## Long Live XNA MonoGame

* * *


# Are we not dead yet?

I’ve heard various comments around the web thinking because XNA is on its way out, so must MonoGame. Or, I’ve not heard from MonoGame in a long while and there are no updates, are they dead yet?

> ### I can attest to the fact that MonoGame is a very active project, with lots going on under the hood.

The team have noted that updates have been far and few, this will change following the new 3.3 release.  Releases will be out quicker, the NuGet’s will be updated more frequently and so on.

Keep watching this space (and the MG site), more updates should follow on a more regular basis.

* * *


# Where to find out more

There is lots more info out there for MonoGame and the 3.3 release, here are the highlights:

- [MonoGame main website](http://www.monogame.net/)
- [MonoGame 3.3 On GitHub](https://github.com/mono/MonoGame/releases/tag/v3.3)
- [The MonoGame Community site / forum](http://community.monogame.net/)
- [The new MonoGame Content Builder tool (MGCB GUI and MGCB commandline tool)](http://darkgenesis.zenithmoon.com/all-hail-the-old-and-the-newthe-monogame-content-builder-tool/)

> P.S. I did hear the number of projects that are now published on various stores with MonoGame recently and I was completely taken aback. The number was considerably larger than I had ever envisaged and I can dream quite big! (sadly NDAs prevent me from just saying it ;-( but I wish I could)

* * *


# Interstellar

I leave this post with a partying thought.  You should have noticed that with the 3.3 release, the MonoGame Team officially released a Universal App template. This allows you to write one project targeting BOTH Windows Phone 8.1 and Windows 8.1.  This was a tremendous achievement for the team to pull this one out of the bag.

You may have also have heard about another company and it is Universal project announcements, so think on that.  I personally cannot confirm / deny or vouch for any plans for MonoGame’s future Universal support, however Tom Spilman of SickHead Games, one of the core coordinators of the MonoGame Project, did have this to say recently:

> [ ![ /></a></p>
> <p><a href=](assets/img/posts/image-not-found.png)Tom Spilman](https://www.facebook.com/TomSpilman?fref=ufi) I am one of the maintainers of MonoGame. It does include a universal app template for Win8/Wp8, but we fully expect to support Win10 universal apps as soon as the SDK is available.
> 
> [<abbr>18 hrs</abbr>](https://www.facebook.com/groups/XboxOneIndieDevs/permalink/679735775465038/?comment_id=679823175456298&offset=0&total_comments=4) · [Unlike](https://www.facebook.com/groups/XboxOneIndieDevs/?pnref=lhc#) · [6](https://www.facebook.com/browse/likes?id=679823175456298)

 

So, the dream lives on?

