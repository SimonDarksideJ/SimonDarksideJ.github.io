---
layout: post
title: Windows 8 in a week on reflection
date: 2012-07-02 12:30:59
tags: [windows 8]
---

![ /></p>
<p>So pretty much from Day 1 of the Developer preview of Windows 8 being released i set myself the same challenge I always do and see if I can actually work in the new world, thankfully this was made much easier this time round with Windows 7’s way of booting from VHD’s and the fantastic help from <a title=](assets/img/posts/image-not-found.png)Scott Hanselman’s blog post on installing Windows 8 to a VHD (saving me the time and effort to sacrifice a physical machine, I just do not do virtual machines for this kind of test).

So 1 week (or so on) what were my thoughts, if you have been following me on twitter ([@DDreaper](http://twitter.com/#!/DDReaper)) you should have a pretty good idea!!

* * *


## The install

First impressions as set out in Scott’s blog were pretty much the same as Windows 7 so no big surprises there although I did note (as will be repeated several times here) it was notably faster, even though the install media is bigger there must be some magic under the hood or they have streamlines the entire process but it felt quicker.

So a + 1 for the install, but I do not work in an install so let’s continue

* * *


## Initial setup

Now this is one area which will hopefully will be a bit more polished by the time of release, the initial setup is very Live ID based and although you can switch to using just a username as before you seem to loose a lot of the intention around connected working if you do not.

I opted to work using my Live ID seeing how I wanted to walk through all the benefits.

Next up I got my apps on, I use quite a varied set of tools from both business and development / technical worlds which always provides a wealth of challenges on new machines / environments, however this time round no real issue (although did hit some later), installs were quick (quicker?) and with almost no driver or compatibility issues so it seems Microsoft’s promise that all Windows 7 apps will work in Windows 8.

Some things did not go so well, some of which can be put down to pre-release/developer software such as the limited (or practically non-existent) Bluetooth support (Bluetooth did install but could never find any devices!) so my Bluetooth headphones were a bust, I did need to search for drivers for some peripheries such as printers / tables but this is very much par for the course.

On the whole though no major issues that could not be worked around with minimal (and I mean minimal!) effort

* * *


## A major head turner (The good features)

![width=](assets/img/posts/image-not-found.png)

Start with the good is always a good elevator speech primer, so apart from the obvious points which have been mentioned here are a few of my major points that have so far sold me on Windows 8:

> ![align=](assets/img/posts/image-not-found.png) **Windows on Steroids**
> 
> On starting to use Windows 8 the second thing you will notice is that everything does indeed run a LOT faster, even Zune (which on Windows 7 seems very bloated and slow to respond, for me at least) fires up almost instantly and navigating around it is smooth especially if you minimise it for a while and return to it (++).
> 
> I have yet to actually try full VS2010 but after i had installed the Windows Phone developer SDK, both Blend and VS Express did start quicker (although this was more noticeable in Blend).  I then also installed the VS 2011 ultimate dev preview and things took a turn for the worse but more on that later.
> 
> ![align=](assets/img/posts/image-not-found.png) **Enter Metro**
> 
> Now I say that was the second, the first is the thing everyone talks about is the new Metro interface which to be fair i see as just a replacement for the old Windows Start panel but others see it as more.  This is certainly one of the biggest features that from a desktop perspective takes some getting used to however if you look at it as if they have taken the start panel and tipped it on it is side and added a bit of flair / animation, then you wo not go far wrong.
> 
> Once you understand how to use the new metro interface (coming from Windows Phone makes this a lot easier) you will find it a lot easier to work with and you gain a whole world of experience by just watching it.
> 
> Granted, the Metro interface is really there as the jump point for Tablets or other big screen touch devices, on the desktop it can be seen as just an add-on but I like it.
> 
> Just remember the new paradigm for launching apps in Win 8, is Metro first (apps important to you) and just start typing to search and find others with the traditional desktop pinned apps as a final resort.
> 
> ![align=](assets/img/posts/image-not-found.png) **Actions and app Recognition**
> 
> One other really nice feature that has always been under the covers in Windows 7 was to do with the default app to load certain types or files or actions, in Windows 8 this has gone a lot further with what seems to be App Discovery, Windows 8 recognises types of applications and does a much better job of prompting you with the options when you try and run something, this represents itself with a metro type of popup that lets you choose and when new applications are added you are offered the choice again.  As an example I was working solely with IE until I hit the Silverlight issue and then had to install Google Chrome, when I next launched a page Windows recognised there was a new browser type of application and then prompted me for which one to use, well I found it neat ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile8.png).
> 
> (Should keep the EU boys happy, maybe?)
> 
> ![align=](assets/img/posts/image-not-found.png) **App Connect**
> 
> Bringing the idea of the cloud and having many interconnected services interoperating to achieve a common task to the desktop is first rate thinking, granted there are not many “enabled” apps out there yet but even from the samples and the demos so far this is something (as a designer and architect) I have longed for, Apps should be there to satisfy an experience, be that if it is finding films and planning a night out to firing up your email and organising your workload.
> 
> ![align=](assets/img/posts/image-not-found.png) **My monitors work**
> 
> One of my peeves with my Windows 7 machine is that it seems to make it is mind up how my monitors are orientated, I use a laptop and am forever moving from using it as a desktop with one monitor to two or walking into a meeting to start projecting and sometimes deciding my laptop screen is not enough and just plugging in the TV or a second monitor and just want to continue working without having to reconfigure my desktop layout and resolution most times.  Windows 8 seems to have spent a bit of time in this area and so far I have not had to reconfigure my screen real estate more than once. (to set it up initially, but even then it is been right off the bat 8 out of 10 times)  this kind of streamlining and removing barriers is certainly my cup of tea (although I have yet to get working or find all the keyboard shortcuts or settings to make better use of my full desktop including the ability to shift the metro window or stretch my background, need to watch the build keynote again)

So all in all (apart from Metro) Microsoft have been all about cleaning up and smoothing out the wrinkles for the user experience in Windows 8, so as a user it simply feels better.

* * *


## Trouble ahead

![width=](assets/img/posts/image-not-found.png)

Now while my experience with Windows 8 through the week has been largely positive (so much in fact I have actually decided to make it my main OS on my laptop ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile8.png)), there are a few caveats as you would expect with such early release software.

> ![align=](assets/img/posts/image-not-found.png) **My app vs Your App**
> 
> First off there are some bounding issues with apps, in one instance after I had installed the new VS 2011 ultimate several other apps stopped working or just crashed on start-up, seems newer apps are just overwriting some crucial components, easy answer to this problem is to just un-install and re-install the old apps and everything starts working again.  
> ![align=](assets/img/posts/image-not-found.png)    **Windows Phone dev takes a slight hit**
> 
> If you are intending to do Windows Phone development on your Win 8 machine then say goodbye to the Emulator for now, looks like there is an incompatibility with the virtual drivers on the machine and the Emulator pretty much similar to if you have VMWare installed on a WP7 dev machine, but not to worry as hooking up to your Dev device works just fine, you will just have to live without the other until an update is released.
> 
> ![align=](assets/img/posts/image-not-found.png) **Not for the heavy feature hitters**
> 
> Obviously this release is not feature complete so you are missing things like Windows Media Centre, Bluetooth support, Enterprise features, so if you depend on any of these then you are out of luck for now.
> 
> Another point on this to make is that there is some pretty basic stuff turned off by default and if you do not know where to look it can seem downright odd why something’s would not work.  Most notably of this is that .NET 3.5 and .Net 4 are off by default and you need to install them through the control panel to install apps that depend on them, like Zune.
> 
> ![align=](assets/img/posts/image-not-found.png)    **Silverlight is dead, long live XAML**
> 
> Silverlight is dead, well not really but as far as Windows 8 is concerned you cannot run Silverlight in the browser, not IE in any case in either the Desktop or Metro versions. However Silverlight runs fine in Google Chrome (did not try Firefox) so if you have websites that use Silverlight to run then you will have to use Chrome. At the time of writing I have not tried any OOB or Desktop Silverlight apps but I suspect it will be the same. It looks to be a versioning issue between what ever version of Silverlight is running on Windows 8 (probably a hybrid version of 5 for WinRT)
> 
> **\*\*Update, thanks to @MikeHole for this info but it seems some Silverlight pages are working in IE on Windows 8, most likely these are SL5 pages (the one found was the “Azure management Interface”, so it’s more of a suck it and see approach but all the Silverlight pages I tried failed, so SL5 is the likely exception.**

* * *


## Not so favourite features

![ /></p>
<p>I am trying to be as impartial as I can in my experiences with Windows 8 and while I love it so far (hence my soon to be permanent move) there are some things which do put you off, granted some of these may be because I’m an admin as well as a dev at heart but all the same.</p>
<blockquote><p><img src=](assets/img/posts/image-not-found.png)    **Twice as many things does not mean twice the fun**

There are a lot of places where a metro version has been added on top of a base piece of functionality, in some places this works and in others it adds a barrier to getting things done. For instance there are two versions of Internet explorer but the default for when you launch links is just the Metro version which at times can feel odd but at least you can understand why. However items such as the control panel do not make much sense, granted this could be just a halfway house for the dev release but it does not feel like that, it seems to have been designed that way but you can only launch from the Metro version, so if you want to just get access to a feature only in the desktop version then you have to launch the Metro version first and then click through to it, there may be another way but I’m yet to find it.

![align=](assets/img/posts/image-not-found.png)    **Give me options do not just remove stuff**

I would have like to see a sort of desktop configurator for me to choose how I want to work rather than just cutting out features in favour of new, I like Metro (I have been on WP7 since before the launch and love it) and the new search to launch idea, but let me do it from a traditional start menu as well if I want to, life is about choices after all.

![align=](assets/img/posts/image-not-found.png)    **A broken metro?**

One of the visions about Metro that I’ve always subscribed to is that the Jump off point of the Metro start experience is that it is all about me, Apps I care about or need to use immediately / frequently are in the foreground always readily accessible / animated and informative, just my view of my world. However at this point in time it is still behaving like the old Start Menu, if I install new apps the icons for those apps start flooding my metro interface and with so many it would take me a fair amount of time to clear them out and redo my Metro page, this is not how Metro was sold to me so it should not do that, I control my experience not the apps I install. Hopefully this is just a developer preview thing but that means they put it in? (or it really is the start menu!)

* * *


## Final conclusions

![ /></p>
<p>As I brush into week two and begin my journey to rid myself of Windows 7 (not that I do not like it but I enjoy moving forward ahead of the curve) I am cautiously optimistic about the future of Windows 8, some have said that it is too different that people wo not like it because things are gone, the same was said when Windows 95 came out so as history shows people are willing to change if they can see beyond the look and feel and appreciate what newer technology can provide them.</p>
<p>It has to be said that Windows 8 does feel like Microsoft are moving away from the desktop towards a more platform choice model (use which form factor you want to use and we will deliver a coherent platform to run on it) but this is certainly a stepping stone to that.</p>
<p>Change can be good but will people eventually like this change, I would like to think so, its certainly turned my head enough to jump in with both feet even at this early stage.</p>
](assets/img/posts/image-not-found.png)

