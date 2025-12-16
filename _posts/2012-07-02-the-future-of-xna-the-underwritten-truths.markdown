---
layout: post
title: The future of XNA, the underwritten truths
date: '2012-07-02 13:39:27'
tags:
- information
- xna
---

![src=]()

While right now I should be working hard on releasing our [Alphalabs.cc](http://alphalabs.cc/project/69-vequencer) project [Vequencer](http://alphalabs.cc/project/69-vequencer) I have decided to take some time out and write out a summary of the blogosphere’s thoughts on the future of XNA.

These are the best that are out there, some hard facts, some harsh realities and some comforting partying thoughts.


### \*\*Update

**[Paul Thurrott](https://twitter.com/#!/thurrott)** has made a welcome announcement over on [WinSuperSite](http://www.winsupersite.com/article/paul-thurrotts-wininfo/microsoft-xbox-2012-142599?utm_source=twitterfeed&utm_medium=twitter), that the rumoured XBOX Nxt, code-named TEN (and most definitely will NOT be called Xbox 720) will not be making an appearance this year or even announced as a current project.  Instead they are still investing in their current platform the XBOX 360.

So XNA has another stay of execution for at least another year if not two before we even have to worry about it’s gradual demise on this it’s most prominent platform, all herald XNA 😀


### \*\*Update 2

Thanks to the Windows Phone Summit for confirming that All current Windows Phone apps and Games (including XNA) will run fine on Windows Phone 8, this includes XNA games/apps.

What is unclear is how this support will be surfaced but at the very least, develop for Windows Phone 7 and it will automatically publish to Windows Phone8#

No change for Windows 8 (still desktop only)


### \*\*Update 3

Recent things have come to light after several announcements from existing XNA MVP’s from Microsoft.  The overall view is that Microsoft has finally pulled outward support for the XNA framework and has discontinued it’s XNA MVP program.

What does this mean for XNA?

In reality, not much.  XNA will still be available for download from Microsoft, is still supported on the XBOX 360 (no indie mention for XBOX Next as yet) and the XNA Creators club and support for Windows Phone still stands.

Also MonoGame has been going from strength to strength recently announcing more supported platforms, all based on XNA, in fact Xamarin have released impressive updates for Mono now allowing even iOS development on Windows.  Since MonoGame is built on top of Mono this ensures it’s support going forward.

Couple that with Synapse Gamings Sunburn announcements taking a native XNA platform and carrying it forward with their own version of the XNA framework delivered in a Platform independent API and full integration to their existing engine .

So as far as Microsoft’s announcement goes, Meh – The future is bright, the future is still XNA 😀

**XNA framework is Dead, long live the XNA Platform!**

* * *


# Here is my view

It’s certainly unclear in the long term what will happen to XNA or any other MDX equivalent provided by Microsoft but at least for the Short to Mid term XNA is still a stable and viable platform.  The support for Windows / XBOX and Windows Phone as it stands today will continue to go forward under MS’s usual response of “Continued support”.

In fact it has been clearly stated all current WP7 apps/games will run on WP8 which may indicate there will still be a chance to develop XNA games for WP8, however that is done (reading between the lines would that also mean there would be a way to code XNA in Metro, personally I do not see a problem providing a managed layer on top of the C++ infrastructure today)

But they have made clear on many occasions that they are not or at least unwilling to expose any plans, but this is still normal for most of MS’s day to day (they either don’t want to commit to anything or scare away current customers or endanger any existing brands, granted saying nothing is doing just that anyway :D)

Looking beyond there will still be community led MDX (Managed Direct X) replacements and even the possibility of some C++ wrapper layers to deliver the same thing.  So my guess would be that the code we write today will still live on in the future without having to resort to writing it ourselves.

Other avenues that have seen the light of day (or at least been talked about) were the possibility of a Managed abstraction layer (or C++ version) for SunBurn, which JohntheCBuilder has said is not beyond the realms of possibility and something that is being looked towards (but nothing committed yet :D), there has also been talk of alternate versions of SunBurn as well.

Dare I suggest it here, but there is also Unity to consider which proposing other directions and frameworks to port code from XNA to Unity and back again. That being said both Unity and SunBurn have their strengths but I still very much prefer SunBurn purely for it’s speed and flexibility.

There is also the Unreal UDK and engine to consider but this leans again back to C++ and learning a new language UnityScript and there are no official plans for Metro as yet (but it is written in C++ already so we will likely see a Metro version)

SO I am hopeful and with the commitment of the SunBurn guys everything we build today will still live on tomorrow, or at least until the machines rise and take over us all (but even they will probably use SunBurn :D)

* * *


# What others are saying

From trolling around forums, twitter and the web here is a collection of statements from others:


## @DSebJ (excerpt from the SunBurn forums) (\<—my favourite so far)

The such prolonged absence of any information on this from Microsoft is what is causing the concern. So here’s where the concern comes from:

- There was no XNA mention at build it was c++ all the way: [https://twitter.com/#!/chrisgwilliams/status/114065959026819073](https://twitter.com/#!/chrisgwilliams/status/114065959026819073) & [https://twitter.com/#!/jamesashley/status/114053314982854656](https://twitter.com/#!/jamesashley/status/114053314982854656)

- The XNA MVPs no longer have an XNA session at the MVP Summit

- At GDC, there was a number of Microsoft talks about gaming and windows 8 & metro – with no mention of XNA in any of their prepared material. Not even a slide that says keep developing on Windows 8 with XNA as one of their stated options.Compare to last years GDC Shawn was up talking about Windows Phone 7 & XNA 4.0; considering the audience this was a perfect place to mention something.

- One of the audience members asked the question about XNA in the developing for Metro session and was basically told 2 things. No plans to do that & look at other frame works that could use WinRT and wrap DX. This article is a bit relaxed about the future of XNA compared to the tweets from XNA dev’s at the time but covers the source of the conversation:

_On Thursday morning at [GDC](http://www.armlessoctopus.com/tag/gdc), Chase Boyd, who works in the Windows Graphics Division at Microsoft, presented a speech titled “Creating a Great Metro Style Game,” where he divulged details about this new process. Throughout the talk, [XNA](http://www.armlessoctopus.com/tag/xna) was nowhere to be found, but I questioned him about transferring a current XNA project over to [Metro](http://www.armlessoctopus.com/tag/metro), and he assured me that Microsoft “is currently working on the white paper to streamline that process,” and that the updates in Visual Studio 2011 will further simplify that process._

_“When we implemented this new sample framework and set up the samples, we modelled it as close as we could with XNA. In fact, with a lot of the new syntax improvements which have been incorporated in Visual Studio [2011], the code can be pretty easily pasted over. We have also structured those example code bases to work the way an XNA person would expect the way they would want.”_ [http://www.armlessoctopus.com/2012/03/09/microsoft-outlines-their-unified-metro-vision-sans-xna/](http://www.armlessoctopus.com/2012/03/09/microsoft-outlines-their-unified-metro-vision-sans-xna/) (Note George Clingermans comment..)

- Metro tablets (on ARM) won’t be able to run desktop applications (XNA would be a desktop application)  [http://blogs.msdn.com/b/b8/archive/2012/02/09/building-windows-for-the-arm-processor-architecture](http://blogs.msdn.com/b/b8/archive/2012/02/09/building-windows-for-the-arm-processor-architecture)

- Microsoft’s Window 8 development forums (are garbage but if you can wade through them) you will notice that there is only a game development forum option for c++ [http://social.msdn.microsoft.com/Forums/en-US/wingameswithdirectx/threads](http://social.msdn.microsoft.com/Forums/en-US/wingameswithdirectx/threads)

- I pushed on specifically about C# with DirectX and then XNA and received the following confirmation: “There is no direct access to DirectX from C#, but you could access it via COM interop. There are several third party projects working to wrap DirectX. XNA does not support Metro style apps.” [http://social.msdn.microsoft.com/Forums/en-US/wingameswithdirectx/thread/5f8ec2c7-a080-4519-8506-a48ff826edff](http://social.msdn.microsoft.com/Forums/en-US/wingameswithdirectx/thread/5f8ec2c7-a080-4519-8506-a48ff826edff)

- & Here MS (Chuck Walbourn) has started recommending Sharp DX: [http://social.msdn.microsoft.com/Forums/en-US/wingameswithdirectx/thread/46687bc7-a18a-4c5a-a555-79b8537c0ad8](http://social.msdn.microsoft.com/Forums/en-US/wingameswithdirectx/thread/46687bc7-a18a-4c5a-a555-79b8537c0ad8)

- Last night @gaspode\_t (who is a Microsoft Employee but all views are his own 🙂 posted this on twitter: “Xbox Live Web Games slides from GDC are now up for download: http://www.microsoft.com/download/en/details?id=29198&amp;WT.mc\_id=rss\_alldownloads\_devresources #xna #xblig #html5 #sayshi”

If you look at them they are so light on details so I asked “@gaspode\_t Those Web Game slides don’t have anything to do with XNA, do they?” – Only fair considering he wants to tag his post with #XNA and #xblig and then I got: “@DSebJ More like me pointing out to XNA dev’s the momentum behind the HTML5 wagon, frankly it might be smart to at least experiment with it” I think the momentum behind html 5 he is referring to is Microsoft pushing us in the Windows 8 “everything is a web app” on Metro direction.

So there’s a couple of different scenarios here:

1) If you want to target the Windows 8 Tablets (Metro) with games; XNA is not an option. Previously Microsoft only said that C++ and DirectX (+HTML,CSS&JS) were the options but it appears they are now directing people who want to use C# to third party wrappers like SlimDX.

If I’m going to be optimistic about the future of Windows – this is where there growth will be; but pessimistic from a game Dev point – this is where I want my games to be too.

2) XNA just like any other **classic application** (read: legacy support) will continue to run on Windows 8 (note that at the moment there are a few hoops to jump through to even get that running on Windows 8).

3) XNA games will be supported on Windows **Phone** 8 (supported; not stays the same etc. So I am assuming that it’s not going to be a model citizen just a supported one)

4) Until there is a new XBOX – XBLIG only has one entry point which is XNA. But who knows what will happen with the next XBOX and if there will even be an Indie games service.

Personally, for me, all of this is bad. I’m at best a part time programmer. It takes me a long time to learn stuff because I have about 4-5 hours on the weekend if I’m lucky; I don’t program for a living and the thought of learning a new language to just be able to do what I can do today makes me question all of my investment to date in C#. After all the non-announcements from GDC – I gave in and bought an iPad. With such a growing audience based, it’s hard to deny that Apple haven’t done anything but support their developer eco system. I can today, still run the first iPhone game I purchased on my iPhone 3, how every many years ago and I’ve been through a number of device iterations since then.

If I look at XNA I can’t see a supported future and being able to carry across my personal time investment is a lot more valuable to me than the 99 cent Flight Control game. I want to be productive in my 4 hours; learning a new language and having to battle through a whole heap of stuff just to get something of a starting point, which is already available in XNA, is just a waste.

John has said the future of SunBurn will continue and so far – that’s the only hope and positive comment I can cling too. I think we will need something like stated directions soon to help us plan out where to next.

I don’t want to jump ship; I’m invested. But if my investment from here on in is going to take me no where, what’s the point?

One last link; I wish I had found this at the start of this post as it has most of the references in it. Some Power Point slides from a company called Magenic which probably should not have been shared using meetup.com and probably should not be able to find it through google.com but suits me 🙂 [http://files.meetup.com/1604728/ **XNA** \_Future.pptx](http://files.meetup.com/1604728/XNA_Future.pptx)


## @MartinCaine (Retroburn Studios blog post)

Martin has written a personal experience post about XNA future [here](http://martincaine.com/xna/my_thoughts_on_windows_8_xna_and_xblig), comparing XNA to PS Vita / IOS / Android and others.

[http://martincaine.com/xna/my\_thoughts\_on\_windows\_8\_xna\_and\_xblig](http://martincaine.com/xna/my_thoughts_on_windows_8_xna_and_xblig)


## 


## 


## @ArmlessOctopus (a premier XBLIG site)

Dave Voyles write a concise piece from talks at GDC and other contacts laying out exactly what MS have committed to, he was also co-host/guest in this weeks @GameMarx podcast which is well worth a listen as this was talked about a fair bit

[http://www.armlessoctopus.com/2012/03/09/microsoft-outlines-their-unified-metro-vision-sans-xna/](http://www.armlessoctopus.com/2012/03/09/microsoft-outlines-their-unified-metro-vision-sans-xna/)

[http://www.gamemarx.com/podcast/2012/03/17/gamemarx-ep81-unreal-conversation-with-dave-voyles](http://www.gamemarx.com/podcast/2012/03/17/gamemarx-ep81-unreal-conversation-with-dave-voyles)

* * *


## What we know for Certain

In short this is what we do know:

> ![src=]()    XNA is live and supported on the XBOX360 which has millions of consoles out there and a fair XBLIG following
> 
> ![src=]()    XBLIG titles are still being bought and will likely to continue while there is an XBOX360
> 
> ![src=]()    XNA runs perfectly fine on Windows 7 and Windows XP which between them have over 80% of the desktop/laptop market
> 
> ![src=]()    The XBOX360 has many years of life still in it, comparing to the original XBOX which still has life left in it and the PS2
> 
> ![src=]()    XBOX Live (which  XNA depends on) is not going away and will be supported for many years
> 
> ![src=]()    Windows Phone 7 runs XNA and has a growing market share which MS have committed to support through Windows Phone 8
> 
> ![src=]()    Microsoft is working on tools / papers and tutorials to migrate to Metro Win 8 should you want to
> 
> ![src=]()    There are hundreds of Community Dev’s / MVP’s and people committed to XNA and still continue to write content and tutorials for it (myself included)
> 
> ![src=]()    There are community frameworks looking to replace or simulate XNA including plans for C++ Wrapped Managed support for Metro (the community will find a way)
> 
> ![src=]()    XNA DOES RUN ON WINDOWS 8 in DESKTOP MODE as will most legacy apps/games. MS is committed to this

> ![src=]()    DREAM BUILD PLAY is on this year with XNA as the focus (just how much more publicity do you want?)

Most if not all current premier XNA sites still fully back XNA, although we may see a trend to expand their network beyond XNA to encompass more of an INDIE theme for multiple platforms. This does not reduce the love for XNA or their support for it, just expanding their knowledge to show that the principles learned from XNA in game development are just as valid in other frameworks / platforms.

I will say now that it looks like XNA-UK will also be taking this route following recent talks of late, we are very much still committed to XNA but will be expanding our borders, this will mean a move to a new site/domain but all existing content from here will be preserved.  If you want XNA-UK to also retain it is current face then let us know.

WE are NOT leaving XNA.


## 

* * *


## What is unclear

> ![src=]()    Windows 8 is only an emerging platform and there is still lots coming out about it day by day
> 
> ![src=]()    XBLA is in the same boat as XBLIG, just what this means for MS digital games distribution?
> 
> ![src=]()    No statements at all from Microsoft and/or the XNA team (yes there still is one) about support or future of XNA
> 
> ![src=]()    Nothing coming out of the XBOX Next camp about indies support (but then again XNA only got added to XBOX360 later)
> 
> ![src=]()    What is Microsoft commitment to Indies?
> 
> ![src=]()    No Managed Direct X support for Windows 8 (granted they have to satisfy the big boys first)
> 
> ![src=]()    Microsoft is killing the Indie realm for XNA by simply saying nothing, how far will this plague spread?
> 
> ![src=]()    Just who will the winner be in the C# vs C++ war, there are still no clear winners just disinformation (granted it is more about what you need it for vs general ease of use vs performance as it always has (there are still some who prefer assembly FGS ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile13.png))

* * *


## The vision for Managed DirectX frameworks

My end belief is that there will always be a need to have a managed framework for building games for enthusiasts (just look at the 3D printer realm to see what enthusiasts get up to), whether that will be by Microsoft / Steam / Unity or some community driven team.

There will always be more than one tool for the job, from:

> ![src=]()    C++ native engines and languages for those who need the performance or have existing engines that wont be converted
> 
> ![src=]()    Managed Languages for the intermediary level who do not want the hassles of C++ but still like to roll their own
> 
> ![src=]()    Game engines such as SunBurn, Unity, Unreal, Havok and even Game Maker Studio (DarkStudio/ADK) which provide the ability to just throw content in to make a game with some extensibility (usually in a managed language or script)

So as to what your future holds is up to you, but keep this in mind:

MDX and XNA teach all the base principles for how to make games and make games well, all the skills you have learned on your journey with XNA (whether you keep with it or expand and move on) will still hold true tomorrow, you have learned HOW to makes games and what it takes to make a well rounded and founded platform for your game.  All you have learned will instil you for the future no matter what direction it takes you.

In a last thought with the direction XNA-UK is currently heading (out of my hands really) it is likely I will have to move my blog unless something changes, so keep tuned.  As I have stated before I am still committed to XNA in all it is variants but I also (as well you should) keep my mind open and expand my knowledge for what else is out there.  I am still going to be making projects and tutorials for what ever I am playing with so stay tuned.

For now I return to Visual studio to continue my efforts to finish and Publish Vequencer on WP7.  It is future is bright with likely publication to XBOX, Windows, IOS and Android (maybe even a PSVita version too??).  Lets not also forget Web but anything is possible.

[![image](/assets/img/wordpress/2012/07/image138.png "image")](/assets/img/wordpress/2012/07/image135.png)

