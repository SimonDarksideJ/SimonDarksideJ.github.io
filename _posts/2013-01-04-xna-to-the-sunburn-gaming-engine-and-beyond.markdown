---
layout: post
title: XNA to the Sunburn Gaming Engine and Beyond
date: 2013-01-04 15:00:00
tags: [xna, sunburn]
---

So far in this series I have covered:

- [MonoGame](http://monogame.codeplex.com) – a raw XNA implementation allowing you to create games but you have to code everything yourself
- [UnityXNA](https://github.com/mvi/UnityXNA) – a way to host your existing XNA projects (or new ones) and deploy them using the Unity3D engine, but without utilising the advanced features of that engine

In both cases you are building your own “engine” per-se, doing your own physics and other such things.  But what if there was an option, where you could have your cake and eat it, a way to have a full XNA implementation backed by a powerful lighting and rendering engine with plugins for physics and much much more.


# Enter the SunBurn Gaming Engine.

I have blogged about SunBurn before and all its capabilities, even showed a demo of its extensible editor at Microsoft Techdays showing how easy it is to edit your levels and environment.

Now what if I told you could use this engine on Windows 8, Windows Phone 8, Linux and other platforms and still be able to use exactly the same game code on XBOX360, Windows Desktop/7 and Windows Phone 7.

Well that is exactly what the guys at Synapse Gaming have done and as proof of the pudding, check out their recent announcement regarding the 2.1 release.


### [Announcing SunBurn 2.1 – Platform Independent Game Engine!](http://bit.ly/Va6lYZ "Announcing SunBurn 2.1 - Platform Independent Game Engine!")

* * *


# Background

![src=]()


##### 


##### _(From the site)_

See your games come to life! Build stunning games with beautiful visuals, and quickly prototype your ideas using the SunBurn Game Engine.

SunBurn puts professional tools and technology in your hands, making it possible for indies and professionals alike to create AAA quality games.

- Achieve beautiful visuals
- Edit scenes, materials, lighting, and more with the in-game editor
- Powerful renderer with support for hundreds of high-quality dynamic lights
- Ultra-fast built-in light mapping for highly complex scenes
- Material system with full support for custom shaders
- Audio system for playing 3D and ambient sounds
- Efficient object and mesh collisions with physics reactions
- Component system for control of object and light behaviors

**Join the thousands of developers** who already know SunBurn is the most powerful and flexible XNA game engine available!


### Single API and Multiple Platforms

Quickly build games for Windows, Xbox 360, and Windows Phone using SunBurn’s easy-to-use api! No porting is necessary, simply create games in C# code then run on Windows or deploy to a retail Xbox 360 or Windows Phone and enjoy!

See some of the great games already using SunBurn 2.0:

![src=]()

Sell your games online, on Xbox LIVE Marketplace, and Zune / Windows Phone Marketplace, and start making money! All without DevKits, contracts, or any expensive software.


### Easy Asset Creation

Create levels, characters, and props using your favorite art tools. SunBurn provides native support for 3D Studio Max, Maya, XSI, XSI ModTool, Modo, Blender, and more – as well as the ability to plug-in support for additional and custom tools. Easily create custom file importers and geometry using SunBurn and the XNA content pipeline.

Make changes mid-game while playing, and see them in real-time using SunBurn’s built-in editor. SunBurn uses Windows’ native controls, not a rendered ui, for the fastest possible performance.


### Completely Modular

Use SunBurn out-of-the-box or plug in custom code and components. SunBurn’s modular design and access to low-level classes makes it easy to add, customize, modify, and replace built-in features.


### Best Support in the Business

We have provided great products and friendly, helpful support for over 8 years – and it comes free with SunBurn. Get help and advice from the SunBurn development team, and learn from the excellent SunBurn community.

Become a SunBurn developer today! And work with a company that understands indie and professional developers alike!

As a proud member of Microsoft’s XNA Partner Program we’re happy to provide discounts to [Microsoft App Hub members](http://xbox.create.msdn.com/en-us/home/membership) (see Checkout page for details).

* * *


# Out of the Box

![src=]()

Depending on the edition you spring for will depend on what you get out of the box with the SunBurn gaming engine, A full comparison of what you get for your money can be found here on the Synapse Gaming site – h[ttp://www.synapsegaming.com/products/sunburn/engine/editions](http://www.synapsegaming.com/products/sunburn/engine/editions)

Simply put you have the following options:

- Framework Edition – FREE – Just the basic lighting and rendering engine
- Indie Edition – $150\* – SunBurn Editor and additional features
- Pro Edition – $300 – Editor plus HDR features and detailed shaders
- Studio – $1000 – Advanced edition with additional licensing agreements

> \* If you are a member of the XNA Creators Club / Phone Marketplace then you will be entitles to a $50 discount.
> 
> This will likely be extended to Store account members but this has not yet been confirmed yet.

> \*Note
> 
> At the time of writing we have been informed that the prices will remain the same going forward with 2.1 and no additional pricing changes have been planned, upgrades for existing users are still free. \*Subject to change (as in act NOW)

So long as you buy SunBurn then you will have full access to most features of the engine likely to be used by all but advanced game developers and you can always mail them to ask about upgrading your edition if you wish.  With all the extra platforms coming on board at no additional cost (at time of writing) this puts it ahead of Unity by a fairly large chunk in the wallet.

* * *


# Two Cities one World

![src=]()

With the coming of 2.1 and beyond there is even more variety available from the Synapse Gaming guys and gals:

- 

### The SunBurn Platform

The SunBurn platform API, like MonoGame is a new platform independent framework which provides an XNA look and feel but whereas MonoGame stops there at the moment (they are reporting plans to go further later once V3 is stable), SunBurn is taking all the lessons learnt in the development of the SunBurn gaming engine and expanding on the base implementation to allow more flexible and performant graphical operations.

Beyond that SunBurn also offers better integration and support or other necessary libraries and frameworks needed for making games, these features are further augmented with the use of the SunBurn Gaming engine

- 

### The SunBurn Engine

As you have seen above the Sunburn gaming engine has a lot under the hood and for the 2.1 release its fully integrated with the SunBurn platform above, so any game you wrote / writing against the SunBurn engine will work exactly the same for all supported platforms.

At the time of writing the SunBurn gaming in-game editor is still only available within Visual Studio 2010 but the guys are still had at work finalising everything and this is one certainly in the full release schedule, for now though you can create / light and engineer your levels within the editor using VS 2010 and then use the same scene files in VS 2012 projects.

As for target platforms they currently support XNA’s current stack of:

> ![src=]()    XBOX 360  
> ![src=]()    Windows XP / 7  
> ![src=]()    Windows Phone 7  
> ![src=]()    Windows 8 Desktop & Modern (XAML)  
> ![src=]()    Windows Phone 8

They also look to support additional platforms in the very near future:

> ![src=]()    Android  
> ![src=]()    iOS  
> ![src=]()    others

So as you can see everything is looking very bright, everything you get with MonoGame (XNA compatibility) and the editor / engine capabilities of Unity for a fraction of the price.

* * *


# Content Pipeline

![src=]()

Now when it comes to the Content pipeline things usually get very sticky for the future of XNA.  MonoGame still only supports VS 2010 for building content (although I am informed this is not far off for VS 2012 and there are plans to become independent of XNA), with Unity, it has its own content management which is embroiled in its engine that requires some getting used to.

When it comes to SunBurn everything is already available at your fingertips in both VS 2010 and VS 2012, SunBurn will happily compile all its content at build time through the SunBurn platform, in fact with the latest drop of the Windows Phone SDK you can even open the content project used by SunBurn to manage your assets as well separately.

SunBurn is still using the XNA dlls presently for content processing but plans to replace all this later but as XNA still is not going anywhere at the present I would probably prefer they focus on more awesomeness first ![Open-mouthed smile](/assets/img/wordpress/2013/01/wlEmoticon-openmouthedsmile.png).  One area that SunBurn does better than MonoGame at present is to do with Custom Shaders, it can either use XNA’s own shader compilers or the new SunBurn specific compiler whereas MonoGame still has issues in this area.  If custom shaders are not your bag then worry not, you can still use built in effects through SunBurn’s own “Default Effect” shader which is a single compilation of the 5 basic effects you get with XNA (Basic / Dual Texture / Alpha / etc)

* * *


# Getting Started

![src=]()

As with everything SunBurn there are a wealth of samples and help to get you on your way no matter which route you go down:


### SunBurn Gaming Engine

The Sunburn guys have already ported 3 of their main gaming engine samples to the new platform / 2.1 engine release and they are looking just as stunning as always.

| 

[![Cavern](/assets/img/wordpress/2013/01/Cavern.png "Cavern")](/assets/img/wordpress/2013/01/Cavern.png)

 | 

[![Sci-Fi](/assets/img/wordpress/2013/01/Sci-Fi.png "Sci-Fi")](/assets/img/wordpress/2013/01/Sci-Fi.png)

 |

| 

[![DoJo](/assets/img/wordpress/2013/01/DoJo.png "DoJo")](/assets/img/wordpress/2013/01/DoJo.png)

 |

Above you can see the Cavern / Sci-Fi and Dojo scenes that are the bread and butter of SunBurn example projects in a variety of modes including:

> ![src=]()    Windows 8 Modern XAML  
> ![src=]()    Windows 8 Modern Native  
> ![src=]()    Windows 8 Desktop

All of these examples show you how to import a scene created using the SunBurn editor (which I have covered previously in many posts), setup a player / character in the world and add controls / logic and physics to the game.  It is a bit different to raw XNA but still built on XNA’s principles (what you would expect from an engine really).  The engine does all the grunt work of making it look good whilst still maintaining performance so you can get on with just making the game.


### SunBurn Platform API

If the engine is not your bag and you prefer to code it yourself, then the Platform API is here to offer you just that.

It lets you select which renderer to use for the graphics and then after that everything is just the same code (with the obvious exception of very platform specific implementations but that is to be expected of any multiplatform solution).

There are a few differences to the way XNA does things with draw calls, sprite batches and audio but all for the better.  They have listened to the forums for some of the limitations raised about XNA and drawn from how they have built the SunBurn gaming engine to give a much more flexible solution, so a little climb is needed to understand these changes, namely:

> ![src=]()    3D drawing – the simplified model.draw is gone and replaced with a way to iterate through all the parts of models and apply effects and drawing separately as one batch.  this allows much more flexibility and control over how you want to draw your models.  If you still want it simple then everything is just set in the draw call instead of several places as before.
> 
> ![src=]()    SpriteBatch – the old spritebatch system has been replaced with a mode enhanced texture drawing system that implements sorting of textures in a more controlled way, it may at first seem more low level and complicated but once you get the hang of it, it really is quite simple and efficient.  This saves a lot of time in reality because the Platform is effectively showing you how to draw more performantly.
> 
> ![src=]()    Audio – Like SpriteBatch, this has been opened up a lot more, focusing mainly on the 3D techniques that were available to XNA before but making them simpler to implement and more uniform.
> 
> ![src=]()    Effects – XNA had 5 default shaders and the option to have custom shaders, SunBurn still allows custom shaders but instead of 5 separate defaults there is now only 1 which still performs all the abilities of the original 5 (in one package).
> 
> ![src=]()    Input – currently SunBurn only support keyboard and mouse / touch but they are fast working on adding support for other inputs including gamepad.  Unlike XNA the input system is managed by the API,so it handles a lot of the raw input and timing issues usually found with XNA projects, so things like KeyPressed and KeyDown are already provided for you in a single static instance for everything.

* * *


# Plug-in’s a plenty

![src=]()

Like Unity, SunBurn has an extensive plug-in framework and in recent releases has made strides to make it as easy as possible for developers to extend the platform, swap out components and even extend the editor.  On top of all of that they even made it possible for such contributions to be packages up easily and installed with just a click.

No word of a store or library for all the hard efforts for the contributors but there has been talk behind the scenes about this so I would keep my ears pinned up for an announcement.

For now, there is a forum ([\<Link\>](http://www.synapsegaming.com/forums/43 "Synapse Gaming community contributions forum") – registration may be required) dedicated to SunBurn contributions for which there are many already available, for example:

> ![src=]()    3D and skeleton animation systems (Synapse Gaming’s own [SgMotionLib](http://www.synapsegaming.com/forums/t/925))  
> ![src=]()    AI  
> ![src=]()    Physics (Bepu, Farseer, Box 2D)  
> ![src=]()    Vehicle management systems ([CJ Baileys car system](http://www.synapsegaming.com/forums/t/3498) – shown above)  
> ![src=]()    Full engine add-ons (like the [Indie Game Framework IGF](http://indiefreaks.com/indiefreaks-game-framework/))  
> ![src=]()    Shader compilation packages (like [ShaderLib](http://www.synapsegaming.com/blogs/community_blogs/archive/2012/12/25/preview-of-a-new-post-processor-in-vico-game-studio-shaderlib) a great example by UjenT)  
> ![src=]()    [Stereoscopic rendering system](http://www.synapsegaming.com/blogs/community_blogs/archive/2012/05/10/all-new-3d-stereoscopicrenderer-plugin-take-your-sunburn-games-into-the-next-dimension-with-full-stereoscopic-3d-support-in-less-than-5-lines-of-code) with 5 different stereo rendering modes done b Holophone3D

And much more, the list just keeps on growing

* * *


# Current State

![src=]()

At the time of writing the Platform API is still in the late Alpha development phase with repeated drops being made to a group of devoted members of the SunBurn community but is coming along strong, most of the major features have already been completed and tested and I would not expect it to be long before we reach the Beta stage.

I cannot comment whether the Beta phase will be extended beyond its current distribution but anything is possible.  There is no point trying to hassle the Synapse Gaming guys at present as they are locked in their secret bunker and even why do emerge it is only to check on critical posts or feedback from the testers, best I can say is be patient.

* * *


# ![src=]()


# The Editor

The editor in SunBurn is certainly one of the biggest powerhouse features in pretty the same way as Unities editor works, it is not as pretty (at present), nor does it have true 3D modeling features (granted I personally never saw the need to do actual modeling in the Unity editor except for poc’s).  Everything else is pretty much on par, editing attributes and properties of assets, adding in-game only components like triggers, events, manipulating placement of 3D objects within a level, applying lighting and particle effects.

A few obvious differences do show like the ability in Unity to play the game with the editor open. Whereas in SunBurn the editor is effectively part of the game and can be jumped in to and out of on demand, even within a running game on PC or XBOX currently, you can even offer it as a feature of the game if you so with to allow players to build levels.

For the current builds through the editor is still only available in the VS 2010 edition for SunBurn but we are informed it is high in the product backlog to bring this forward for VS 2012, no word on a prettification of it yet though ![Open-mouthed smile](/assets/img/wordpress/2013/01/wlEmoticon-openmouthedsmile.png)

* * *


# Conclusion

Out of all the frameworks I have detailed so far, SunBurn is the one that fills me with the most excitement, granted it is not actually available at present, you just need to weigh up if it is worth the wait, with the current state of XNA I am not surprised developers both old and new to game development are shopping round and the table I did in a previous post (\<Link\>)on the pro’s and con’s of each platform still stand, in my view you can either at this point:

> ![src=]()    Keep practicing your XNA on XBOX / PC as is, or even touch on MonoGame to stay fresh  
> ![src=]()    Try out V2 of the SunBurn engine and even buy it – your upgrade to 2.1 will be free  
> ![src=]()    Get fed up with XNA completely and jump ship to Unity 3D

Be happy in which ever option you go for and if you do go Unity still give us your ear as there will certainly be more Unity posts here.

Personally I am hedging my bets and gong with all three, to use each for their major selling points bt my heart is still with the dream of what was XNA, a managed solution with the option of taking it to as many platforms as possible.

Ouya here I come ![Smile with tongue out](/assets/img/wordpress/2013/01/wlEmoticon-smilewithtongueout.png)

At this point I have managed to port over all my Starter Game code and the only thing not working properly yet is my Font drawing, simply because that is still a WIP in the platform layer, I still have a little work to do with the Audio just because of the changes but I am certain it will be more awesome.

I might even have a go at updating it to use the SunBurn Gaming engine as well to take full advantage of the lighting / physics and other great stuff it gives and do another follow up post.

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/xna-to-the-sunburn-gaming-engine-and-beyond/) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/xna-to-the-sunburn-gaming-engine-and-beyond/)<script type="text/javascript">// <![CDATA[
var dzone_url = 'http://darkgenesis.zenithmoon.com/xna-to-the-sunburn-gaming-engine-and-beyond/';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_title = 'XNA to the Sunburn Gaming Engine and Beyond';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_blurb = 'XNA to the Sunburn Gaming Engine and Beyond';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_style = '2';
// ]]></script>  
<script type="text/javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js" language="javascript"></script><script type="text/javascript">// <![CDATA[
var addthis_pub="runxc1";
// ]]></script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)  <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>[CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591)
