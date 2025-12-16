---
layout: post
title: XNA to SilverXNA - Part 1 an Overview
date: 2012-07-01 18:48:40
tags: [silverlight, xna]
---

For some time now I have been pondering over the new XNA to Silverlight integration since it was announced for Windows Phone Mango, I even wrote a short post over how to get started here.

[![image](/assets/img/wordpress/2012/07/image44.png "image")](/assets/img/wordpress/2012/07/image43.png)

(He he, seeing Georges Tattoo always makes me smile!)

However since then there has not even been a whisper or word spread about this feature, probably because XNA people prefer XNA and Silverlight people are all for Silverlight and each arena needs (in some cases) such specialised knowledge that each team does not see the opportunities of using another framework, which is a shame in a lot of ways because even with only moderate knowledge in both frameworks you can achieve some very interesting results.

In a few short posts I hope to lower the entry barrier (for XNA dev’s at least) in the mixed world that is the Silverlight / XNA integration which I’ve dubbed as SilverXNA ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile.png).

So follow along as I take the Platformer sample from the AppHub educational content section (the Phone version) and upgrade it to SilverXNA and then start making use of Silverlight features in this XNA game.

[![image](/assets/img/wordpress/2012/07/image45.png "image")](/assets/img/wordpress/2012/07/image44.png)

Follow along with the series here:

> ![align=](assets/img/posts/image-not-found.png) [Part 1 – an Overview](http://darkgenesis.zenithmoon.com/?p=366) (here)  
> ![align=](assets/img/posts/image-not-found.png) [Part 2 – Getting Started](http://darkgenesis.zenithmoon.com/?p=386)  
> ![align=](assets/img/posts/image-not-found.png) [Part 3 – Adding the first control](http://darkgenesis.zenithmoon.com/?p=406)  
> ![align=](assets/img/posts/image-not-found.png) [Part 4 – MVVM frameworks and Nuget](http://darkgenesis.zenithmoon.com/?p=420)  
> ![align=](assets/img/posts/image-not-found.png) [Part 5 – Controls](http://darkgenesis.zenithmoon.com/?p=443 "SilverXNA Part 5 - Controls")  
> ![align=](assets/img/posts/image-not-found.png) [Part 6 – Adding Animation](http://darkgenesis.zenithmoon.com/?p=496 "SilverXNA Part 6 Animation")  
> ![align=](assets/img/posts/image-not-found.png) [Part 7 – A different approach](http://darkgenesis.zenithmoon.com/?p=505 "SilverXNA Part 7 A different approach")

Also [Channel 9](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) are running a similar [video series here](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) if you prefer videos! ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile.png)


#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

* * *


## To Begin With

First off let’s get one thing straight, what each framework is best at:

> ### ![align=](assets/img/posts/image-not-found.png)    Silverlight
> 
> Fantastic for human interaction, Menu’s, prompts and basically everything where lists of information or text is displayed in a fashion that is readable and useful.  Silverlight can do graphics but this is best when it is just representing a stored image that is rotated / scaled or manipulated for on-screen effect.
> 
> ### ![align=](assets/img/posts/image-not-found.png)    XNA
> 
> XNA’s power is graphics, not just 3D but any scenario where you want advanced graphical effects on screen to delight the player.  It also best for audio and effects (in fact Silverlight uses XNA for playing audio in most cases).  Let also be straight that XNA is terrible at UI or text without considerable effort, especially when compared to Silverlight.
> 
> ### ![align=](assets/img/posts/image-not-found.png)    Phone
> 
> The Phone has is benefits too, it provides a set of devices and sensors for use in either framework plus web interaction (something sorely missed in XNA on the XBOX).  It also provides lots of native support such as the Media Player and Contact lists that can be used to give a more personal experience to the player.

* * *


## Getting prepared

Now there are several changes with the XNA framework, some of which were compromises to get XNA running under Silverlight, some are obviously GAP’s to get the integration out in time (as is always the case with such a complex framework like XNA) so it will be interesting to see what else we get in the future.

I have discovered and gone through all of the below with the Platformer starter kit and boy did it show up some things that had my head scratching, thankfully all the AppHub samples are fairly clean and proper which made it a lot easier.

So let’s run through those considerations:

> ![align=](assets/img/posts/image-not-found.png)    Game.CS
> 
> The best recommendations when building your normal XNA game project state that you should keep your initial GAME class clean, using separate classes to do all the parts of work in your project and just having what is necessary in your core Update and Draw loops.  All this ensures your game code is as portable as possible for all the platforms that XNA supports.  This is even more true when we are preparing for using SilverXNA.
> 
> So if you have not done so already, tidy up that Game class and keep it as minimalistic as possible and if possible reduce any dependency on the main Game class itself by either passing references to what is required.
> 
> ![align=](assets/img/posts/image-not-found.png)    GameTime
> 
> Time is irrelevant, Lunchtimes doubly so, so said Douglas Adams in the Hitchhikers guide to the Galaxy (actually Ford said it to Arthur but who’s nit-picking ![Smile](/assets/img/wordpress/2012/07/wlEmoticon-smile.png))
> 
> One of the things we loose in SilverXNA is the GameTime class, which is used by the base XNA framework to notify the game what has transpired since the last Draw or Update call and how long it took.  In SilverXNA it has been replaced by a GameTimerEventArgs event handler, which should not be surprising since Silverlight is an Event based framework.  Now if you simply replicated the XNA game framework when building your game you probably (as do most of the XNA samples) passed down the GameTime class from the Game Update and Draw classes to all your own subclasses, this would be fine if you actually then intended to use all parts of the GameTime class in the rest of your game however all anybody does with this is to extract the “ElapsedGameTime” to see how much time passed in the last frame and update your logic and screen (bit of a waste really).
> 
> Now if you have done this in your game, it is time to change (and if you only use ElapsedGameTime then you probably should anyway) and update all your own code to just use the ElapsedGameTime value, so passing a float instead of a whole class.
> 
> If in the unlikely event you also need to use the “TotalGameTime” value (which shows how much time has passed since the game started) then you will need to replace all your GameTime references to GameTimerEventArgs BUT this will break compatibility for all other platforms and native XNA (since it does not exist).  I would recommend passing down both values separately as floats if you really need to (Note “TotalGameTime” is now called “TotalTime” in SilverXNA).
> 
> In the rarest of problems if you actually use even more of the GameTime class then I’m afraid you are out of luck and SIlverXNA on the phone simply will not be for you, so if you are depending on the “isRunningSlowly” or are using GameTime in any other way either stop or just implement those features yourself.
> 
> ![align=](assets/img/posts/image-not-found.png)    Orientation Support
> 
> Now this was a tricky one, both XNA and Silverlight support different Orientations for handling how to draw to the screen, problem is they are both different enumerations for each platform, basically Silverlight Supports more orientations than XNA does, it is not hard to se why they are different and most likely it just came down to time, but for SilverXNA it does present us with a bit of a problem.
> 
> To keep things simple and avoid having to trawl through all the sample code and have to worry about it for every SilverXNA project I’m likely to convert (or worry about in the future) I simply created an Extension class to turn the Silverlight Orientation enumeration into an XNA one, it was the simplest way to do this with the least amount of effort.
> 
>     
> 
>     Class Protection levels
> 
> Last but not least we need to talk about scope, its recommended when you write your own games to keep your engine and logic in a separate library and just have the core code and assets in your Game project, if you have done this then you are well on your way already, if not however read on.
> 
> When I converted the Platformer project I found that the scope on most object classes had not been set which is fine if all your classes are contained within a single project, but if you move that class to a library it effectively becomes a Private class, which creates a problem for us since a core part of migrating to SilverXNA means we need to convert out XNA game project into an XNA Game Library so we can reference it from the SilverXNA project.
> 
> So check your project and if anything needs referring to or declaring in the main Game project then ensure you set it as either Public or remove the dependency (move it deeper in the project)
> 
> * * *
> 
> ## Onward wayward soul
> 
> And so it begins, above is a nice list of tasks you’ll need to check out in your own project if you want to bring it into the SilverXNA fold, a nice bit of homework for you should you wish to read on to the next chapter and see all the benefits of using Silverlight in your XNA project (which roughly equates to 50 – 60 % less code for practically all your UI code ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile.png))
> 
> As a rough outline, here is what the following chapters are going to cover:
> 
> > ![align=](assets/img/posts/image-not-found.png)    The actual project migration – just getting it working  
> > ![align=](assets/img/posts/image-not-found.png)    Text and the HUD re-envisioned – dropping XNA text and building a HUD  
> > ![align=](assets/img/posts/image-not-found.png)    MVVM and the value in a bound framework – make tracking and tombstoning your state easier  
> > ![align=](assets/img/posts/image-not-found.png)    Popups and transitions – bring in the pretty  
> > ![align=](assets/img/posts/image-not-found.png)    Something else – have not thought further than this, maybe inspiration will hit me ![Smile](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/5775.wlEmoticon_2D00_smile_5F00_02C7FA23.png)
> 
> Hope you like it and actually want more!
> 
> If it is not for you do not worry you wont hurt my feelings but I’m sure I can find a nice pretty spot to sit while the class continues, maybe something really warm next to the kid with horns and a fiery disposition [![image](/assets/img/wordpress/2012/07/image46.png "image")](/assets/img/wordpress/2012/07/image45.png).
> 
> #### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

