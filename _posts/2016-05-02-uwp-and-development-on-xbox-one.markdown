---
layout: post
title: UWP and development on Xbox One
date: 2016-05-02 15:07:04
tags: [unity3d, xbox]
---

![](assets/img/posts/image-not-found.png)

By now, everyone should have watched or at least heard about the [Build2016 keynote announcements from Phil Spenser](https://channel9.msdn.com/Events/Build/2016/KEY01) about development for Xbox One and the opening up / enablement (at long last) of the public “Developer mode”, something long since sought after since the days of XBLIG on the 360 and the previous promises made by the [ID@Xbox](http://xbox.com/id) team about the future of indie development on Microsoft’s latest console.

> For getting started info, check out this awesome post by Lee Stott, a DX technical evangelist at Microsoft, who explains exactly what you need to get started:
> 
> [https://blogs.msdn.microsoft.com/uk\_faculty\_connection/2016/05/05/xbox-one-and-retail-dev-kit-mode-develop-for-xbox-one-uwp-at-your-university-or-college/](https://blogs.msdn.microsoft.com/uk_faculty_connection/2016/05/05/xbox-one-and-retail-dev-kit-mode-develop-for-xbox-one-uwp-at-your-university-or-college/)

This has been a long and torturous journey after many promises, supposed delays (although to MS’s account, they never actually said WHEN, everyone just assumed now) and a lot of brushfire reporting about the whole affair.  Finally, it is here and the doors are open but what does it really mean? I have fielded a lot of questions, questions some (yet more) inflammatory articles that twist and turn a phrase to mean something else and tried to set the record straight, now finally I can actually put keys to action and try and help straighten out the whole state of affair.

> **Note, these words are my own and not official statements of Microsoft or** [Xbox/ID@Xbox](http://xbox.com/id)**.  Everything mentioned here is public knowledge and out in the open (just clear and concise in one place).  Where possible, I have added clarity (in response to queries) and strayed as close to the NDA (Non-Disclosure Agreement) line as I have dared.  Being an MVP for Microsoft and** [**ID@Xbox**](mailto:ID@Xbox) **has its perks and helping people develop for Microsoft platforms and the Xbox One is one of them.**

* * *


# From what has come before

I have been a long standing supporter and technical evangelist for all things game development (or development in general) related, showing all the things everyone needs to know to make great games.  A big part of that story started with the [XBox Live Indie Game development](https://msdn.microsoft.com/en-us/library/ff827897) program, the first stab any developer (outside of a published studio) had to make games cross platform and published on a retail games console,

![](assets/img/posts/image-not-found.png)

Through one unified SDK, the [XNA framework](https://en.wikipedia.org/wiki/Microsoft_XNA) allowed you to develop and publish your games directly on your retail Xbox 360 console or on your Windows desktop.  Later on you could also publish to Windows Phone / Mobile and then even further through the help of the fantastic MonoGame team.  This was a code heavy environment which gave a lot of mainstream developers took hold of and played with, a fair few even accomplished their dreams, got it in to the public’s hands and made money, some of those developers have even moved on to the [ID@Xbox](mailto:ID@Xbox) program and continued to publish.

XNA also forms the curriculum of most Universities that offer Game Development as a path (amongst others, it is not alone) as an easy way to teach managed C# coding skills, it really did go far.  Even though XNA is not directly supported by Microsoft, it still lives on and is still available, although the XBLIG program will come to a close on the 360 very soon, especially as new consoles are no longer sold.

* * *


# The new announcement – what does it mean to develop on Xbox One?

![Activation Step 12](assets/img/posts/image-not-found.png)

So, the announcement is finally out and with the latest Xbox One build you can turn your retail Xbox in to a developer machine just like in the old 360 days.  But what does this actually mean? What can it support and what (more importantly) can it NOT do?

Let’s clear up one simple thing, THIS IS NOT XBLIG.

When developing for the XBox One, you have two paths you can take:

- Register with [ID@Xbox](mailto:ID@Xbox) ([http://xbox.com/id](http://xbox.com/id "http://xbox.com/id")) and use developer Xbox One devkits  
This enables you to make Xbox exclusive games and publish them through the Xbox Games store (although MS did announce this store would be merging with the Windows Store to make a new Unified Store)
- Register with the Windows Insider Program ([https://insider.windows.com/](https://insider.windows.com/ "https://insider.windows.com/")) and the Windows Developer Center ([https://developer.windows.com/en-us/windows](https://developer.windows.com/en-us/windows "https://developer.windows.com/en-us/windows")) to use your Retail Xbox One.  
Using your Windows Store Developer account or other Live ID, you can build Xbox UWP apps and games to be side-loaded on to your retail Xbox and later sold through the Windows Store.  As they are UWP, they will also work on any other UWP platform such as Desktop / Mobile / HoloLens / etc.

> These are two very separate paths and the consoles are physically different, why this is important I will explain in a bit.

* * *


# What does Retail unlock actually give you?

Retail unlock is primarily there to give you direct access to sideload and publish local apps to your Retail console while developing your app or game.  once you are happy, you will upload your app or game to the Windows Store (just like any other UWP app) and publish it for anyone to get access to.  This system is pretty much exactly the same system used today on Windows 10 Desktop and Mobile, just enable your device, load and test and then publish to the store.

If you read the press and the announcements from Build, the primary focus of UWP deployment for the Xbox One is Apps, games are still supported and expected but you need to be aware of some performance considerations when building your game for this audience:


### 1: Resources

Like with XBLIG, you do not have access to the full resources of the console, this is primarily because first and foremost it is a games console, so exclusive games titles get priority.  If your game is running slow or is likely to use more than the availability below, then simply contact the [ID@Xbox](mailto:ID@Xbox) team and get registered as an ID developer, it is that simple.

The table below lists the critical resource constraints for UWP packages, for apps this is likely never to be a concern, for games (like mobile or tablets) you just need to ensure you can work comfortably within the UWP capabilities on Xbox, something most game developers should already be comfortable with.

[![image](/assets/img/wordpress/2016/05/image.png "image")](/assets/img/wordpress/2016/05/image.png)UWP resource availability

> I have heard many a dev complain about not getting full access to the Xbox through retail unlocks or demands for more access, as stated above, if you exceed this then just **join ID, it is still FREE**!.


## 2: Size

A big consideration when building your title is size, often referred to as the “10 foot experience”.  This points out that where the console will do its best to scale your app or game to the big screen, sometimes the aspect ratio differences between what you built your app or game for just do not line up and can become distorted.

Again, most game developers are aware of this as should most app devs, when you work in a universal application that is intended to work on the desktop, a table or on a mobile device, things are going to get squished or stretched if you do not plan it right.  When scaling up to a 60” TV, things may not go to plan.

![](assets/img/posts/image-not-found.png)

Image courtesy of dsuil.com


## 3: Multi-platform

it is not clear yet exactly how the Xbox titles will show up on the unified Windows store, but we can pretty much expect it to work in a similar fashion to the current dashboard.  So you will be able to pick and choose which platforms a title will be released on.  This is UWP however and one of its biggest aims is to allow you to build a project once and distribute it for ALL Windows platforms, so one project, one listing, one set of marketing assets and screenshots for all your target platforms.

Simply put having one UWP package for all systems, it is a grand goal but not without considerations (not just Size listed above).  However all the resources and learning for how to build scalable apps and games between Tablet / Phone and Desktop will fit you just as good to build for another platform experience.  Seek to generalize and share where you can and have light up features where it makes sense, remember, an XBOX does not have a built in accelerometer! It would look silly waving it around but it does have a Kinect!

* * *


# What does a developer kit give you?

Apart from the obvious release of the constraints in the previous section, using a dev kit simply gives you access to more, however it also has it is “ways”. Mainly that you need to use a different development environment, a different set of developer tools and resources.  The main difference is that you will have a strict certification path and a different set of rules to follow.  The Windows Store has a set of certification rules and guidelines as well as testing but it is nothing in comparison to what the full developer experience is on the Xbox.

The main thing to really bring home is that the difference between the UWP retail developer mode and the Xbox native devkits processes are almost night and day in comparison.  They are not the same thing and building projects for the Xbox exclusively is a considerable undertaking.  Whereas the UWP process is more tuned to your hobbyist developer (granted a lot of serious devs also take the UWP path for simplicity ![Open-mouthed smile](/assets/img/wordpress/2016/05/wlEmoticon-openmouthedsmile.png)) and is a much more fluid and simplistic approach.

* * *


# The Xbox Live story

![](assets/img/posts/image-not-found.png)

Now I kept this section separate for a reason as it is a good source of debate, the primary mission of the Xbox Live system (achievements, leaderboards, events, friends, etc) is to give a unified backend for all Windows Live enabled titles across all supported platforms, allowing you to enable a single service for your app or game (yes, I said APP) wherever you intend to deploy it.  The only requirement (at the time of writing) to access the live services is to be on the ID program by applying to [ID@Xbox](mailto:ID@Xbox).

> **You can still build and publish UWP apps to the Xbox and all other Windows platforms without being on the** [**ID@Xbox**](mailto:ID@Xbox) **program, but to enable Live services you must be a registered ID developer**

When registering for ID, just be clear about what platforms you intend to target and get building.  If you are only doing Windows / Mobile for now and hope to move to Xbox later, then this is commonly the best path. Conversion is easy and a lot easier once you have players online.  If you are just applying for Xbox when you do not have a story (and just want free devkits) then you will likely be disappointed, just be reasonable and have a plan.  The same rules are used for Kickstarter or Steam, have a plan to sell your game and what makes it special for consumers to sit up and take notice (more on this in a future post).

* * *


# What development environments support UWP?

There are many frameworks, toolsets and engines that support UWP deployment, most also support Native deployment when you are connected, it is just a flip of a switch, a recompile and you are ready.  You just need to reach out to ID or the dev agents at the vendor to gain further access.

Some of the most common are:

- MonoGame – Supported UWP from 3.4 and now supports Xbox One native from 3.5 (separate build available through ID for Xbox native)
- Unity 3D – UWP and Xbox One supported from Version 4 and now Version 5 (separate plugin required for Xbox native)
- Unreal – Windows 10 and Native Xbox access supported (Xbox native access through plugin), UWP support is planned, no date yet though.
- CryEngine – Only supports Xbox One Native through a license.  UWP support to follow.
- Direct X through MS tools – Of course you can write C++ titles for UWP or Xbox Native (be sure to check out the awesome <!--{cke_protected}{C}%3C!%2D%2DStartFragment%20%2D%2D%3E-->[https://directxtk.codeplex.com/](https://directxtk.codeplex.com/) <!--{cke_protected}{C}%3C!%2D%2DEndFragment%20%2D%2D%3E--> for help in this area)
- UWP apps and games via Visual Studio or Xamarin.
- GameMaker has a UWP publishing path, no sign of Xbox just yet.

No doubt many more will pop-up throughout the UWP story and of course you have the current UWP can always just build your own using Microsoft’s development and deployment tools.

* * *


# Clear as mud and ado

Hopefully this article will help to clear things up for some and set the record straight, if you still have queries / questions, then just pop them in a comment below or mail me.  if anything dramatic changes then I will update the article.

Have fun on your game development adventures.

