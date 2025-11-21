---
layout: post
title: MonoGame gets Shocked!
date: 2013-02-04 13:57:31
tags: [monogame]
---

[![image](/assets/img/wordpress/2013/02/image2.png "image")](/assets/img/wordpress/2013/02/image2.png)

Following on from [my previous article](http://darkgenesis.zenithmoon.com/does-lightning-really-strike-twice/) we don the rubber gloves and grab Zeus’s lightning bolt to launch it on other platforms.

Not cryptic enough for you then read on ![Open-mouthed smile](/assets/img/wordpress/2013/02/wlEmoticon-openmouthedsmile.png)

We left off just porting [Michael Hoffman](http://gamedev.tutsplus.com/author/michael-hoffman/)’s excellent article showing us how to generate lightning effects almost effortlessly using XNA over to [MonoGame](http://monogame.net/) in minutes, however (as I usually do) I felt it did not just go far enough, sure Windows desktop is fine but MonoGame V3 now gives us entry to Windows 8 / RT and Windows Phone for FREE with paid options for other platforms.

Also where we had a working project, I would not call it a solution as I would have to repeat that process for each platform and maintain them separately which is not ideal, so let’s kick  it up a notch and make this more shocking!!!!!

![src=]()

 

Source for the series can be found [here on codeplex](http://lightningdemo.codeplex.com/) as well as the code drop for [this stage here](http://lightningdemo.codeplex.com/releases/view/101371)

* * *


# Going Portable

First problem we need to address is to separate our content / game from our project, following a kind of MVC / MVVM / MVP style of architecture but for games, all we should have in our main “game” project is what we need to actually RUN the game and start painting to the screen.  This will make more sense in the SunBurn portion of this series but will aid us as we go multi-platform with MonoGame.

To begin add a new project to our VS 2010 solution (yes, we will get on to VS2012 shortly!! just hang on) for a Class library (We should use a Portable Class library project but cannot for two factors, this project needs a lot of graphical references at present and MonoGame does not have  PCL version, yet).

So add the new Class library project to your solution: and call it “MonoGameLightningDemoLib”:

[![image](/assets/img/wordpress/2013/02/image3.png "image")](/assets/img/wordpress/2013/02/image3.png)

Next move all the code files from the original game solution over to our new lass Library except for Game and Program, to be more specific move these files:

> ![src=]()    Art.cs  
> ![src=]()    BranchLightning.cs  
> ![src=]()    ColorUtil.cs  
> ![src=]()    ILightning.cs  
> ![src=]()    LightningBolt.cs  
> ![src=]()    LightningText.cs

If you drag then over in Visual Studio be sure to remove the old files from the original project as VS will just copy them instead of move them.

This has moved the core of the guts of the solution to a separate project so we can manage it separately just leaving the Game.cs code to run the game handling the graphics device, spritebatch’s and so on.

We’re not done yet as you still need to tidy up a few things, first off go and update all the namespaces in the new class library for the files above to match the libraries namespace, in my case you go from “MonoGameLightningDemo1” to “MonoGameLightningDemoLib”.  Next let’s sort out the references:

> ![src=]()    Add a solution reference from the game project to the lib project  
> ![src=]()    Add a reference to the “MonoGame Windows OpenGL” dll in the library project (careful you get the right one)

[![image](/assets/img/wordpress/2013/02/image4.png "image")](/assets/img/wordpress/2013/02/image4.png)

(Check you select the correct version by looking at it’ source directory as ALL releases now have the same name!!)

To finish up now update the game1.cs and add a new using statement so that the Game class knows where to find the effect/game code:

    using MonoGameLightningDemoLib;

Just check and build the project now and it should run as before

> I did plan to add multi-touch support to the windows project but it is unable to recognise touch or gesture events from my machine, could be a simple thing but have not had the time to play with it, but it is coming up and works perfectly on phone and Windows 8 / RT

* * *


# Bring in the 8 ball

![src=]()

Now one of the amazing things the MonoGame team brought in with the latest update to version 3 was to add on Content Builder support into VS 2012, granted you will need to install the latest Phone 8 SDK to enable it (as that is where the content project support comes from) and now you no longer need to spin up VS2010 to actually build content, BIG DEAL!!

Now I am not going to re-iterate what has already been said, so if you look back at the [last article](http://darkgenesis.zenithmoon.com/does-lightning-really-strike-twice/), go and do the following in Visual Studio 2012:

> ![src=]()    Create a new “MonoGame Windows Store Project” or a “MonoGame Windows Store (XAML) Project  – up  to you  
> ![src=]()    Add a new “MonoGame Content Project” to the solution  
> ![src=]()    Add a “Windows Store Class Library” project to the solution called “MonoGameLightningDemoLib” (or the same as you called the last one)  
> ![src=]()    Add a reference from the Game project to the Lib project  
> ![src=]()    Add a reference to the “MonoGame Widows 8” dll to the Lib project

[![image](/assets/img/wordpress/2013/02/image5.png "image")](/assets/img/wordpress/2013/02/image5.png)

Now we have a blank Windows 8 solution ready to receive all the content we have created already.

With the solution setup we just need to bring in our assets and engine/effect code as is from our existing Windows project, as we did before with the compiled content files we are just going to link to our existing assets.

> **\*Note** (lots of these here ![Open-mouthed smile](/assets/img/wordpress/2013/02/wlEmoticon-openmouthedsmile.png))
> 
> you will probably see the following error message when you open a Windows Store / XAML project in VS2012 with a MonoGame “Content Builder” project in your solution, **just ignore it everything is fine..**
> 
> [![image](/assets/img/wordpress/2013/02/image6.png "image")](/assets/img/wordpress/2013/02/image6.png)

First right click in the Content project and do “Add Existing Item”, then browse to the un-compiled source content from the previous solution (the png’s and spritefont files), this puts our content in place for building ( **ensuring you also set the “Build Action” to “Content” again!!** ).  Next do the same again but this time in the Lib Project and link the code files from the Class Library project we created earlier.

> **\*Note**
> 
> In both cases be sure to “Add as Link” the files else you are just going to end up with copies everywhere.  An easy sanity test is to look in the directory where the projects are after doing the link and you should find the directories empty.

With everything in place you now just need to repeat the exercise from the last article to copy over the relevant sections in the game1.cs to your new solution (the native part of the project), ensuring to add the additional Using statement to the top of the game1.cs file as above:

> \*Note
> 
> In some cases when I tested this, Visual Studio did not recognise the reference to the code in the Lib project, but on building it was fine. Basically test it and if it works then do not worry about it ![Open-mouthed smile](/assets/img/wordpress/2013/02/wlEmoticon-openmouthedsmile.png)

You should now end up with a project looking something like this:

[![image](/assets/img/wordpress/2013/02/image7.png "image")](/assets/img/wordpress/2013/02/image7.png)

All that is left is to add the built content files from the Content Builder Project and you are done.

If you run the project you can now click around as much as you like creating bolts on your Windows 8 machine in the new modern interface.

> \*Note
> 
> For some reason the click position reported by MonoGame seems to be off, could be the code for the original sample but I have not looked too deep into it at this point ![Open-mouthed smile](/assets/img/wordpress/2013/02/wlEmoticon-openmouthedsmile.png)

Source for the series can be found [here on codeplex](http://lightningdemo.codeplex.com/) as well as the code drop for [this stage here](http://lightningdemo.codeplex.com/releases/view/101371)

* * *


# Emperor Palpatine enters the room, now bow!!!

![src=]()

Now one lightning bolt is nice but let’s go mental and draw lightning from our fingers, Windows 8 and Windows phone are multi-touch devices after all (4 touches with phone, 10 – 20 with Windows 8)

Adding multi-touch with any XNA project is very simple thankfully, first just a using statement to the “Microsoft.Xna.Framework.Input.Touch” domain to the top of the game1.cs class file:

    using Microsoft.Xna.Framework.Input.Touch;

Next we need some state parameters for the touch events, similar to handling the mouse and keyboard.

    TouchCollection touches, previousTouches;

We need this or another method so that we can control how many bolts are generated between our touch points, I usually prefer a pool based system but this is effective enough to get the picture.

Finally we just need the code in our Update loop to monitor for touches and strike up the match between each finger:

    previousTouches = touches; touches = TouchPanel.GetState(); for (int i = 0; i \< touches.Count; i++) { if (touches.State != TouchLocationState.Pressed) { continue; } if (touches.Count == 1) { bolts.Add(new LightningBolt(screenSize / 2, touches.Position)); } else { if(i \> 0) bolts.Add(new LightningBolt(touches.Position, touches.Position)); } }

Now with everything now in place when you run the project and upon touching the screen with several fingers

[![image](/assets/img/wordpress/2013/02/image8.png "image")](/assets/img/wordpress/2013/02/image8.png)

Feel free to play with the source, for a laugh try using just the touch points directly and discover why a limiting factor is needed, I brought my powerful ultrabook to its knees with a couple of fingers ![Open-mouthed smile](/assets/img/wordpress/2013/02/wlEmoticon-openmouthedsmile.png), but some really bright shiny effects.

Source for the series can be found [here on codeplex](http://lightningdemo.codeplex.com/) as well as the code drop for [this final stage here](http://lightningdemo.codeplex.com/releases/view/101372)

* * *


# Wrap Up

That wraps it up for the MonoGame variant of this electrifying article, next up how to get the same effects using the upcoming SunBurn Platform API

![src=]() ![src=]()

Stay tuned

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/monogame-gets-shocked/) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/monogame-gets-shocked/)<script type="text/javascript">// <![CDATA[
var dzone_url = 'http://darkgenesis.zenithmoon.com/monogame-gets-shocked/';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_title = 'MonoGame gets Shocked!';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_blurb = 'MonoGame gets Shocked!';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_style = '2';
// ]]></script>  
<script type="text/javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js" language="javascript"></script><script type="text/javascript">// <![CDATA[
var addthis_pub="runxc1";
// ]]></script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)  <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>[CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591)
