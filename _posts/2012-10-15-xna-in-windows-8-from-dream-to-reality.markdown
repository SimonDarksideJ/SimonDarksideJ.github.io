---
layout: post
title: XNA in Windows 8 from dream to reality
date: 2012-10-15 14:44:29
tags: [xna, windows 8]
---

Just to cross post back to my own blog (really did that the wrong way round ![Open-mouthed smile](/assets/img/wordpress/2012/10/wlEmoticon-openmouthedsmile.png)) here’s my entry to the [Intel App-Up competition](http://bit.ly/RugY3i) now being run on [codeproject](http://www.codeproject.com), if you got an idea for an app or game for Windows 8 then you should write a short article for the comp about your idea and you may even walk away with a free Intel Ultrabook to build it with.

**\*\*Update**

Had some interesting discussions following this original post including a very helpful link from  [**Travis Woodward**](https://twitter.com/RabidLionGames) aka @[RabidLionGames](https://twitter.com/RabidLionGames).  Seems a guy called [Ibrahim Ersoy](http://www.c-sharpcorner.com/authors/iersoy/ibrahim-ersoy) posted an article on C# Corner about converting a class library into an app and loading it up with XNA game code.

This solution works even better that the WinForms route, still need to do more testing but it looks very promising, read more about it here! [http://bit.ly/QInBiN](http://bit.ly/QInBiN "http://bit.ly/QInBiN")

* * *


# Disclaimer

This article is an entry in the [AppInnovation Contest](http://www.codeproject.com/AppInnovation). Articles in this sub-section are not required to be full articles so care should be taken when voting.

* * *


# Introduction

With the advent of the Intel App-Up challenge I decide to break convention and try something seemingly not attempted before with Windows 8, get a XNA game up and running using native XNA.  If you just use a current XNA project on Windows 8 you will only have access to keyboard/mouse and gamepad input  (no touch or accelerometer), you also wont be able to use any other devices / features of Windows 8 either.

Taking my original Starter 3D XNA project I am building it from the ground up using Visual Studio 2012 and going beyond by making it a more full-fledged game.

Not willing to stop there I aim to also go beyond and use the full features of Windows 8 including:

· NFC support to allow players to game together

· Location support to bring the real world into games

· Accelerometer support to allow players to wave their tablet / ultra-books around to control the ship (especially useful in the new Warp levels)

· Location services for Leaderboards

At a stretch the project will also include some of the following:

· PlayTo support to show off your playing skills

· UDP networking to play against phone players

· Voice support

So what will begin with this article will end up in an evolving article for building XNA Desktop games natively in Windows 8

\*Note for a Windows Store (Metro) experience XNA developers will still need to use MonoGame to get published there, but that is another set of posts.

Building this for Windows 8 brought its own challenges with the biggest being the content pipeline, old VS2010 built projects just wo not do so we have to build our content in VS 2012 as well, buyer beware.

* * *


# Background

I have been blogging / experimenting with XNA since before the XNA beta, the Starter 3D session began in the early “Coding 4 Fun” days which I took and went above and beyond, taking it to Phone and now Windows 8.

At its roots it is a complete beginner’s guide for building 3D XNA games covering the basics of:

· Content Pipeline loading

· Drawing Textures

· Handling and Drawing 3D Models

· Playing audio

· Handling input and converting screen to world space

· The basics of collision detection

The tutorial has been broadcast at several User groups and even on the AT&T developer webcast series.

Its little cousin the XNA 2D series has also been very popular on my blog.

Now I could have just recompiled the Visual Studio 2010 project and submitted it with improvements to the competition but that is not how I roll, I decided to take on the challenge of getting this beast natively in the Windows 8 world.

* * *


# Why you should use it on an Ultrabook?

Why?, because blasting rocks and aliens on your Ultrabook is fun and just why would not you want to, you should also be able to join in with friends and blast them to!

YOU KNOW YOU WANT TO!

* * *


# Word to the wise

One big note about this article. Some of the content (especially around the Content Builder) are a bit advanced and may be out of the reach of beginners. Worry not as when the project is complete I will be sharing all the content / tools and whatnot that I create here and on my blog.

I am just that kind of guy! 😀

* * *


# Blast in to Space?

The Starter 3D game is based around an original game called “Asteroids”. You’re a daring space pilot sent out to clear asteroids and prevent them from falling to Earth.

The current version is just a modern version of that classic with you thrust into the middle of the asteroid field and it is shoot or be crushed

| [![clip_image002[4]](/assets/img/wordpress/2012/10/clip_image0024.jpg "clip\_image002[4]")](/assets/img/wordpress/2012/10/clip_image0024.jpg) | [![clip_image004[4]](/assets/img/wordpress/2012/10/clip_image0044.jpg "clip\_image004[4]")](/assets/img/wordpress/2012/10/clip_image0044.jpg) |

 

Going forward I am going to expand on this to add some of the usual suspects to the mix, like:

· Power-ups

· Baddie Aliens (who obviously started all this mess)

· Space Debris

But as I always like to do, thinking out of the box I am also looking to add:

· A background story plus missions

· A separate level dynamic which involves traversing a warp/tunnel to take you from one mission area to another (or just flying really fast, speedway style)

· Resources and the ability to power up your ship

· Multi-Player and/or Co-op

One of the crazy ideas is that should not be all at once, it should be episodic and expand over time but we will just have to wait and see on that.

* * *


# Content Anyone?

Now getting to the good stuff, one of the first things you need to get this project off the ground is content, back with VS2010 this was easy because we have XNA Game Studio (a set of extensions to Visual Studio) for building content (Models, Audio, Images, etc).

With VS2012 we have none of that so we have to go back to the drawing board, or do we? The answer thankfully is NO.

Using some old techniques pre-existing with XNA Game Studio it is possible to use MS Build (the guts behind Visual Studio for compiling your apps) to craft your content into XNB files (the file format used by the Content Pipeline in XNA), it is even possible to do this with custom content importers (that devs wrote to enhance or get around some of the limitations of the default content importers and processors).

So after a lot of digging and armed with Microsoft’s own examples I put together a rudimentary Content Builder in Visual Studio 2012 tasked solely with building the current content from the Starter 3D Game.

**\*Note**

If you are wondering “why am I bothering rebuilding the content in VS2012, why not just use my pre-existing XNB files from VS2010, after all that is what the Mono / MonoGame guys are doing”, the answer is simple, Content files are Platform Dependant, so to use then in native VS2012 solutions they HAVE to be built in VS2012. It is a real pain and I have asked why but it seems it is for performance reasons. (I am none the wiser either) ANYWAY.

Getting the content built normally requires some detailed knowledge of how the MS Build process works, but with the samples provided by the XNA team we are armed with enough to get us by, they come loaded with a “Content Builder” class which has all the gubbins to get us going, however a few modifications are needed, namely:

Expanding the Parameter code to allow for “custom parameters”, plus an overload so my other content builds do not have to (essential as I scale my models)

    
    
        
        
            
            
                **Travis Woodward** aka @[RabidLionGames](https://twitter.com/RabidLionGames).  Seems a guy called [Ibrahim Ersoy](http://www.c-sharpcorner.com/authors/iersoy/ibrahim-ersoy) posted an article on C# Corner about converting a class library into an app and loading it up with XNA game code.
                
                This solution works even better that the WinForms route, still need to do more testing but it looks very promising, read more about it here! [http://bit.ly/QInBiN](http://bit.ly/QInBiN)
                
                
                
                The process is not as quick and simple as a normal XNA game as we need to work around the normal way WinForms apps work, this requires us to create a separate wrapper around the graphics device to hook into all the XNA goodness but as I said before the XNA team have written samples that show us the way by implementing:
                
                
                
                · An abstraction of the Game class that employs the Graphics Device
                
                
                
                · An abstraction of the Content Pipeline to Load Content
                
                
                
                · An abstraction of the Game Services collection / IOC
                
                
                
                There is more in the actual implementation but these are the basics.
                
                
                
                Using these we can design a control to act as our graphics surface, load up our content and let the game rip thus:
                
                
                ### Initialising the Graphics Device:
                
                
                
                    
                    
                        
                        
                            
                            
                                http://msdn.microsoft.com/en-us/library/bb447762
                                
                                · The Content Pipeline API guide on MSDN (very useful for finding hidden attributes)
                                
                                
                                
                                [http://msdn.microsoft.com/en-us/library/bb195587](http://msdn.microsoft.com/en-us/library/bb195587)
                                
                                
                                
                                · A detailed forum post (fairly old but still very relevant) on MS Build Content Pipeline tasks / parameters
                                
                                
                                
                                [http://xboxforums.create.msdn.com/forums/p/42119/248952](http://xboxforums.create.msdn.com/forums/p/42119/248952)
                                
                                
                                
                                · Also useful – a MSDN article on the makeup of a XNB file (thanks to @The\_ZMan)
                                
                                
                                
                                [http://xbox.create.msdn.com/en-US/sample/xnb\_format](http://xbox.create.msdn.com/en-US/sample/xnb_format)
                                
                                
                                
                                · The Creators club samples for WinForms use
                                
                                
                                
                                Graphics – [http://xbox.create.msdn.com/en-US/sample/winforms\_series1](http://xbox.create.msdn.com/en-US/sample/winforms_series1)
                                
                                
                                
                                Content Building – [http://xbox.create.msdn.com/en-US/education/catalog/sample/winforms\_series\_2](http://xbox.create.msdn.com/en-US/education/catalog/sample/winforms_series_2)
                                
                                
                                * * *
                                
                                # Coming Soon
                                
                                
                                As a slight interlude but still in keeping with my next series of articles on XNA futures, i’ll go over in a bit more detail each of the components above starting with the Content Builder, it is fairly hefty subject on its own so might take a little while with my current work workload
                                
                                
                                [![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/xna-in-windows-8-from-dream-to-reality/) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/xna-in-windows-8-from-dream-to-reality/) <script type="text/javascript">var dzone_url = 'http://darkgenesis.zenithmoon.com/xna-in-windows-8-from-dream-to-reality/';</script>  
                                <script type="text/javascript">var dzone_title = 'XNA in Windows 8 from dream to reality';</script>  
                                <script type="text/javascript">var dzone_blurb = 'XNA in Windows 8 from dream to reality';</script>  
                                <script type="text/javascript">var dzone_style = '2';</script>  
                                <script language="javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js"></script><script type="text/javascript">var addthis_pub="runxc1";</script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)   <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script> [CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591) 
                            
                            
                        
                        
                    
                    
                
                
                
            
            
        
        
    
    

