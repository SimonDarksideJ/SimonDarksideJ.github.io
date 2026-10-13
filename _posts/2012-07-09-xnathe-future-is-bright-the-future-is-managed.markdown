---
layout: post
title: XNA - The future is bright, the future is Managed
date: 2012-07-09 10:47:56
img: wordpress/2012/07/image140.png
tags: [xna]
---

So there has been a lot of kerfuffle of late about XNA’s future, some wins, some losses and such.

## But time to set the record straight.

(again ![Smile with tongue out](/assets/img/emoticons/smilewithtongueout.png))

I have been involved with several XNA related efforts and in talks with some other teams and I can now come forward with details on them, some are still rumour (but very strong reliable unconfirmed rumours, take what you will from that) others are known facts.

If you are headed down the C++ / DirectX route then I suggest you head over to the [RandomChaos blog](http://bit.ly/LMSHWD) or [GameDev-UK](http://www.gamedev-uk.net/) for more details there.

* * *

## [SunBurn Gaming Engine](https://www.synapsegaming.com/products/sunburn/engine/) – [Synapse Gaming](https://www.synapsegaming.com/)

SunBurn has been around many years now in XNA circles and has grown from its inception as a Lighting and Shading tool to a full blown Engine with its own integrated / extendable editor

Version 2.0 was officially launched recently which drew a line under the host of new features and enhancements to all its supported platforms including XBOX360, Windows and Windows Phone.

Also announced was the FREE framework edition which has much of the same features under the hood and just lacks the editor and a few high performance features (it is free after all).

Now under the covers there have been quite a few unofficial leaks of what has been drip feeding out of the closed doors of the Synapse Gaming labs, mainly around native code support and alternate graphics platforms such as OpenGL.

In fact not only SunBurn has been changing but also some of the big extension frameworks like ICE (formerly IGF) and Brain2 which both plug into and extend SunBurn with a host of community driven pieces, both were already moving to decouple from SunBurn but recently have scaled back their announcements (following talks with the SunBurn guys?).

I am fairly certain at this point that this will become a reality and if so, then your XNA code today will be natively compiled by the SunBurn engine to run on a host of other platforms, with native support it could run on just about anything including, Windows Phone 8, Windows 8, IOS and even Android.  Very similar to Mono.

At its core games on the SunBurn gaming engine are written in managed code using XNA!

* * *

## [UnityXNA](https://www.synapsegaming.com/products/sunburn/engine/) – by MVI Network

[![Unity logo](https://web.archive.org/web/20111214080405im_/http://download.unity3d.com/images/unity-logo.png)](http://unity3d.com/unity/)[mvinetwork.co.uk](http://mvinetwork.co.uk/)

Unless you were asleep last week then you must have missed out on a big announcement from a guy called “Barnaby Smith” who is a good friend of mine from the XNA-UK days.

He has been working on an extension to the Unity3D gaming engine over the last few weeks/months and I recently got involved with him on the project (mostly testing and talking about stuff, Barnaby has done all the actual work!).

The goal of this project was to get XNA code running under the Unity Framework with 100% code re-use and limited changes required to adopt it.  This includes basic content projects, custom pipeline extensions are not supported as yet.

What he has produced has outstripped even my initial views of what was possible and he announced it to the world on twitter, which then prompted his site to go down under the stress from all the re-tweets (now back and running)

![Tweet from Barnaby Smith announcing the UnityXNA proof of concept, XNA running in Unity3D with no code changes](/assets/img/wordpress/2012/07/image141.png "image")

This opens yet another door for games written in XNA to be easily ported to other platforms, yet another reason to prove that XNA is an excellent and easy to use prototyping platform (if nothing else).

**CAVEAT**

Now Barnaby is keen to stress this is just a proof of concept at the moment but I have seen and played with the code and it is very promising.  Only 2D at the moment but he is still feverishly working on it.

The code has also been [pushed up to GIT](https://github.com/mvi/UnityXNA), so feel free to fork it and play with it yourself!

* * *

## [MonoGame](http://monogame.codeplex.com/) meets Windows 8

[monogame.codeplex.com](http://monogame.codeplex.com/)[![Mono project logo](https://web.archive.org/web/20100624113646im_/http://www.mono-project.com/skins/MonoWaveWide/images/mp-mono-logo.png)](http://www.mono-project.com/Main_Page)

Mono has always been about multi-platform from the get go and with managed code none the less.

I have attended several [Mono](http://www.mono-project.com/Main_Page) events and have always been intrigued, with the launch of the community project MonoGame which was an evolution of XNA into Mono and runs very well.  It is also heavily influenced on another XNA type project called [SharpDX](http://sharpdx.org/) which builds a C# framework on top of C++ with almost no noticeable overhead (over the normal managed costs).

It should come as no surprise to fellow XNA’ers that both of these frameworks look almost identical to XNA and that is simply because they came from XNA, emulation is the kindest form of flattery (but then again XNA came from the ashes of MDX and resembled that a lot!)

All of this comes from a community screaming for a Managed Environment to write 2D and 3D graphical interfaces, not all of us want or have the time to build it from scratch in C++.

I digress.

This recently hit the press with the announcement that “[Armed](http://www.sickhead.com/)” (a Windows Phone XNA game) **HAS** been ported to Windows 8 and in fact is already available on the [preview marketplace](http://t.co/16nB7D2d).

The team “[Sickhead Games](http://www.sickhead.com/)” (gotta love indie studio names ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile.png)) were recently featured as guests on the Metro Developer Show last week and talk in depth about their experience in taking MonoGame to Windows 8, yet another flag in the XNA camp.

By all accounts once the XNA/MonoGame framework was made Windows 8 ready, the porting of the actual game was quoted as being “trivial”

* * *

## The future’s so bright I’ve gotta wear shades

Life in managed code is still the future, especially for individuals / small indie companies and in some larger game houses it is still used as a rapid prototyping tool before making it in C++.

I am not going to get in to the whole C++ vs Managed argument, there is stats out there showing the figures and it always comes down to the right tool for the right job, yes if you need ultra high performance from a “COMPONENT” then C++ is usually the best answer (I’m not going to debate that).  Bringing C++/DirectX to Windows 8 and Windows Phone 8 is essential for the platform to woo and reassure the BIG AAA game companies  that it is a valid platform and they should consider these platforms for their IP.

BUT ALL of Windows Phone 3D games (and a lot of 2D as well) plus a great portion of XBOX titles and quite a few titles on [Desura](http://www.desura.com/), [Steam](http://store.steampowered.com/) and [IndieCity](http://store.indiecity.com/) are XNA games, so I have no problem building XNA projects for a long time to come, sure I’m expanding my horizons for the sake of the blog and my own sanity, but managed is my life at the moment and likely to stay that way for a time to come.

If you want to know more about C++ / DirectX then I suggest you head over to the [RandomChaos blog](http://bit.ly/LMSHWD) or [GameDev-UK](http://www.gamedev-uk.net/)

* * *

## A parting gift

Just one last thing to wrap up the conclusion of this article.

Microsoft have been getting VERY good at keeping things wrapped up and secret of late, no one saw the Microsoft Surface coming (and it had been in development for over 3 Years), almost no one knew the full details on Windows Phone 8.

There has still been no word about XNA at all and some who have had direct involvement with MS have simply been told “No Comment”.  If they did indeed intend to kill off XNA then they would have no qualms doing so as past experience has “supposedly” told us that XNA is not in their focus.

My advice as always, quit speculating and let's just see.  XNA works fine as it is (granted only DX9 but just look at what people have managed to create with it!, as INDIES), granted it could do with some improvements but as the above shows, the community is already stepping up to the plate with that!
