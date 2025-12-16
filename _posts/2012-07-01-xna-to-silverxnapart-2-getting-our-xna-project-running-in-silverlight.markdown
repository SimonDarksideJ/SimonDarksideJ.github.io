---
layout: post
title: XNA to SilverXNA - Part 2 Getting our XNA project running in Silverlight
date: 2012-07-01 21:18:55
tags: [silverlight, xna]
---

In [Part 1](/blogs/darkgenesis/archive/2011/08/21/xna-to-silverxna-part-1-an-overview "SilverXNA part 1 - the Overview") I went over some of the things you will need to do to get your current XNA project ready for use in the Silverlight XNA integration which I’ve dubbed as SilverXNA for this tutorial series.

Today I’m going to walk you through this by migrating the [Platformer Sample](http://create.msdn.com/en-US/education/catalog/sample/platformer "AppHub Platformer XNA sample") from the AppHub Educational content into a new SilverXNA project.

If you want to read more about what happens under the covers between the Silverlight and XNA frameworks you can read one of my [previous posts here](/blogs/darkgenesis/archive/2011/05/25/silverlight-amp-xna-a-tale-of-two-cities "Silverlight and XNA - a tale of two cities"), mostly technical stuff and a Silverlight primer fro XNA devs.

I am endeavouring to keep this tutorial open to all levels of dev’s, so if some of the instructions are a bit basic for you, just skim read them as needed (just pay attention ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile1.png))

Full source for the completed project can be found [here on codeplex](http://silverxna.codeplex.com/releases/view/72220 "Source code for initial completed project")

[![image](/assets/img/wordpress/2012/07/image47.png "image")](/assets/img/wordpress/2012/07/image46.png)

The main focus of this chapter is to just get us running and the problems I’ve faced in getting this to just run, nothing fancy just simple baby steps to show off the impact of the changes were going to make later.

Now if you are converting your own project along side me with this tutorial, make sure you have read through [Part one](/blogs/darkgenesis/archive/2011/08/21/xna-to-silverxna-part-1-an-overview "SilverXNA Part 1 - the overview") and got a heads up of the main impacts to your project.

Follow along with the series here:

> ![align=](assets/img/posts/image-not-found.png) [Part 1 – an Overview](http://darkgenesis.zenithmoon.com/?p=366)  
> ![align=](assets/img/posts/image-not-found.png) [Part 2 – Getting Started](http://darkgenesis.zenithmoon.com/?p=386) (here)  
> ![align=](assets/img/posts/image-not-found.png) [Part 3 – Adding the first control](http://darkgenesis.zenithmoon.com/?p=406)  
> ![align=](assets/img/posts/image-not-found.png) [Part 4 – MVVM frameworks and Nuget](http://darkgenesis.zenithmoon.com/?p=420)  
> ![align=](assets/img/posts/image-not-found.png) [Part 5 – Controls](http://darkgenesis.zenithmoon.com/?p=443 "SilverXNA Part 5 - Controls")  
> ![align=](assets/img/posts/image-not-found.png) [Part 6 – Adding Animation](http://darkgenesis.zenithmoon.com/?p=496 "SilverXNA Part 6 Animation")  
> ![align=](assets/img/posts/image-not-found.png) [Part 7 – A different approach](http://darkgenesis.zenithmoon.com/?p=505 "SilverXNA Part 7 A different approach")

Also [Channel 9](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) are running a similar [video series here](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) if you prefer videos! ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile1.png)


#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

* * *


## Lets get the new project started

So keeping it simple we will create a new SilverXNA project, thankfully in the latest Beta 2 phase of the tools they have fixed one of my pet peeves where the Silverlight version of the “Windows Phone Rich Graphics Application” and the XNA “Windows Phone Silverlight and XNA application” which was that the two projects were completely different and in fact one of them did not work out of the box. (you can read more about [this here](/blogs/darkgenesis/archive/2011/05/24/multi-targeting-with-windows-phone-7-mango-tools "What was before"), in fact the Rich Graphics app used to be the XNA project and the Silverlight one was called a “Windows Phone 3D graphics application” ![Smile](/assets/img/wordpress/2012/07/wlEmoticon-smile1.png) ), so that is sorted now but if you compare the two projects there are subtle differences, why they are not the same project for both with the same name is beyond anyone’s guess.

So now it does not matter which one you pick as they are both effectively the same so just pick the one nearest to you (I used the XNA version when prepping for this tutorial series and am now using the Silverlight one for the sample project ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile1.png))

[![image](/assets/img/wordpress/2012/07/image48.png "image")](/assets/img/wordpress/2012/07/image47.png)

Once you have got it setup you should see the new SilverXNA solution with it is three projects, A Silverlight C# project(if you chose C# that is, if you are running VB then it will obviously be VB, but this tutorial is written for C# so you will just have to follow along and convert in your head, the same tricks will work through), an XNA game library (the bridge between Silverlight and XNA) and the XNA Content Project.

If you run this now you will get the two new starter screens:

| [![image](/assets/img/wordpress/2012/07/image49.png "image")](/assets/img/wordpress/2012/07/image48.png) | [![image](/assets/img/wordpress/2012/07/image50.png "image")](/assets/img/wordpress/2012/07/image49.png) |
| Main Page (Start) | Game Page |

Nothing spectacular but it does give us a chance to see a good old clean Cornflower Blue page again ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile1.png).

* * *


## Brining in the Rain

So with our new project setup, first thing we need to do is bring in our XNA game project with a twist.  make sure you have downloaded the [Platformer sample](http://create.msdn.com/downloads/?id=535&filename=Platformer_4_0.zip "Download Sample from AppHub") from the AppHub first and have it unpacked somewhere.

First remove the “Content” project as we are going to be using the one from our XNA game project, next right click on the Solution and select “Add –\> New Project” then select from the XNA branch of the New Project wizard the “Windows Phone Game Library (4.0)” project, name it something appropriate as this is were we are going to copy the Platformer code to (I used PlatformerGameLibrary).

[![image](/assets/img/wordpress/2012/07/image52.png "image")](/assets/img/wordpress/2012/07/image50.png)

Next Right-Click on the new PlatformerGameLibrary project and select “Add –\> Existing Item” which will pop up the File Browse wizard and navigate to the folder where the Platformer sample game code is located, this is key especially if you want to maintain a multi-platform project where we want to share code.

Now select all the “.CS” files with the exception of the “Program.cs” and “Platformergame.cs”.  We need to manage in the code from the game.cs file so it fit’s properly with the new SilverXNA project plus we do not want it interfering with the build, as for the Program.CS file Windows Phone does not even use the

If you just want a separate SilverXNA project in which case just copy the code directly into your new library or even the existing library that came with the solution and skip the previous step.

Next Right click the Solution and select “Add –\> Existing Project” and browse to the location of the Platformer sample Content folder, then select the content project there.  You should now end up with the following:

| [![image](/assets/img/wordpress/2012/07/image53.png "image")](/assets/img/wordpress/2012/07/image51.png) | So our project is now made up of:

> ![align=](assets/img/posts/image-not-found.png)    The Content project from our existing XNA solution unchanged (although make sure it is a phone variation of the Content project with assets resized and compressed appropriately using the same asset names as it is XBOX / PC counterpart if you have one)
> 
> ![align=](assets/img/posts/image-not-found.png)    The unmodified code (we will soon change that) from our original XNA game project
> 
> ![align=](assets/img/posts/image-not-found.png)    The Silverlight page project for our solution, we should always endeavour to only put Silverlight specific functionality or presentation in here to keep consistency with other platforms
> 
> ![align=](assets/img/posts/image-not-found.png)    The default XNA Game library that came with our solution.  You could quite happily remove this at this point but I have kept it in for now (just in case ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile1.png)), if you are just building a SilverXNA project and not worried about consistency across platforms then feel free to just use this for all your game logic and XNA drawing code.

 |

* * *


## And now comes the Breaking

At this point we have pure XNA code in a Silverlight project, so not only will it not run it wo not even compile….

Now if you are doing your own project you should have already done the prerequisites to your project from the instructions in Part 1 but I’m going to re-iterate through them here for the Platformer sample.

> ![align=](assets/img/posts/image-not-found.png)References
> 
> First off tidy up the references and add the ones we require for each project:
> 
> - Reference the Content Project from the SilverXNA (main project link library) project
> - Reference the PlatformerGameLibrary project from the Main Silverlight Project
> - Add a reference to “Microsoft.Phone.Sensors” to the PlatformerGameLibrary project (as we are using the accelerometer)
> - Add a reference to “Microsoft.Phone” to the PlatformerGameLibrary project (as we are using the some native API’s)
> 
> ![align=](assets/img/posts/image-not-found.png)    Change the scope of the base objects in the PlatformerGameLibrary
> 
> Edit the following files and simply make the classes and enumerations within them “Public” so they will be exposed outside the game library
> 
> - AnimationPlayer.cs
> - Circle.cs
> - Enemy.cs
> - Gem.cs
> - Level.cs
> - Player.cs
> - Tile.cs
> 
> For example, change the following:
> 
> | From | 
> 
> To
> 
> | 
> 
>     
> 
>      Replace GameTime references to just use the TimeSpan ElapsedGameTime variable in the function parameters
> 
> In the Update and Draw functions of the above classes replace “GameTime gametime” with “TimeSpan elapsedGameTime” where applicable
> 
> | From | 
> 
> To
> 
> | 
> 
>     
> 
>      Fix code that originally use the GameTime variable
> 
> Again in the above classes update and draw functions, remove references that use the gameTime variable as it was passed to the function so that it now uses the elapsedGameTime variable
> 
> | From | 
> 
> To
> 
> | 
> 
>     
> 
>      Final tidy ups
> 
> Clean up the remaining broken references in Player.cs and Level.cs by replacing any mentions of “gameTime” with “elapsedGameTime”. There are a few dotted around including some internal functions such as “DoJump” and “gem.Update(gameTime)”
> 
> ![align=](assets/img/posts/image-not-found.png)     There is always one exception
> 
> The only reference I was unable to fix was in “Gem.cs” where the project actualy makes use of the “TotalGameTime” property of the original GameTime class.  As it is only one reference I decided to overlook this and just replaced it with “elapsedGameTime” just to keep things simple and it does not overly affect the end result.  If it were really important or if it was my own project I may have looked to refactor this a bit better or as stated before passed both elapsed and total time to the function that needed it.
> 
> At this point your project should compile with no errors, granted if you run it you will just have an empty blue screen but we know the game code compiles fine.
> 
> * * *
> 
> ## Final cut
> 
> So with our project in a state where it will work with SilverXNA its time to get this show on the road, now we just need to copy all the relevant bits from the original PlatformerGame..cs and get them working in our new project.
> 
> **Constructor and Variables**
> 
> First we need to sort out all the primary variables our game uses and the initialisation logic, so open up “GamePage.XAML.cs” and add the following variables to the top of the GamePage class just below the content manager, Timer and spritebatch variables (fixing any broken references as you go):
> 
>     
>     
> Navigation and Content Loading
>         
> Now unlike native XNA where the Content Loading process is handled by the Main Game framework in SilverXNA we have to do it manually, now this can be both a blessing and a pain just because of the many ways and events available to us when a page is navigated to and from.  the Navigated to event is fired just after the page has been constructed in memory but before it is presented to the screen so it is a handy place to load content that needs to be drawn to the screen.
>         
>         
>         
> With all XNA games knowing what content to load and when is very important so only load what you immediately need and delay loading anything else till later (like in the onLoaded event which is when the page has finished presenting to the screen or better yet offload it to another thread when the page has finished loading else you may lock up screen drawing if it takes a long time)
>         
>         
>         
> In this case we do not have that much to load so we can do it all at once, just add the following in the “onNaviagatedTo” function just before the “Timer.Start()” call:
>         
>         
>         
>         
>             
>             
> Game Update function
>                 
> Next up is the update function (if for no other reason that Update is called before Draw), thankfully in the project template has already wired up the Timer and associated events for Update and Draw so just add the following to the onUpdate function in the GamePage.XAML.cs file:
>                 
>                 
>                 
>                 
> Game Draw Function
>                     
> As with the Update function, the Draw function is just admin stuff really and I’ve tidied up references to the Spritebatch as they were slightly different, so just add the following under the comment in the “onDraw” function:
>                     
>                     
>                     
>                     
>                         
>                     
>                     
>                     
> **The last bits, the supporting actors**
>                     
>                     
>                     
> And finally (well almost) here is the rest of the supporting code and functions from the original Platformer Game sample, I have tweaked and prodded where needed just to line up use of GameTime and such but I have not had to change much, granted a lot of this could be handled from within the game library, for others however this actually helps us because it is stuff I’ going to rip out and replace with Silverlight:
>                     
>                     
>                     
> SO just paste the following after the “onDraw” function:
>                     
>                     
>                     
>                     
>                         
>                         
>                             
>                             
>                                 
>                                 
> Last Man Standing
>                                     
> You know when I said there is only one exception, well I was not being completely honest there, you will still have one broken link if you compile the above for an extension method I had to create to handle the Orientation enumeration differences between XNA and Silverlight (and I did warn you in Part 1 ![Open-mouthed smile](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8015.wlEmoticon_2D00_openmouthedsmile_5F00_732585D5.png))
>                                     
>                                     
>                                     
> Just add the following to the very end of the “GamePage.XAML.cs” file after the GamePage class, it is a simple enough Extension method that will return an XNA orientation from a defined Silverlight Orientation, this can then be fed to whatever XNA code in your project is handling drawing / input for orientation, as stated before this is to make it easer on multi-platform XNA projects so you do not need a load of #IF statements to balance everything:
>                                     
>                                     
>                                     
>                                     
> ![image](/assets/img/wordpress/2012/07/image54.png "image")
>                                         
> Now one reason for this is simple, by default XNA will start games in Landscape, in Silverlight the default is Portrait, simples [![image](/assets/img/wordpress/2012/07/image55.png "image")](/assets/img/wordpress/2012/07/image53.png).  So we just need to tell the GamePage that we would like it in Landscape Pretty please (note that every page needs to be set to Landscape or Portrait unlike XNA where it is set once on start-up and only changes if you tell it to or if the user rotates the device if supported)
>                                         
>                                         
>                                         
> So for the first time here, edit the GamePage.XAML and change the following line from:
>                                         
>                                         
>                                         
>                                         
>                                             
>                                             
> here on codeplex
>                                                 
> So now we have our game running in SilverXNA, the series will now return to our regular broadcasting schedule and focus on the little things, the big advantages of using SilverXNA and the simplicity it brings for our games.
>                                                 
>                                                 
>                                                 
> Light’s out please
>                                                 
>                                                 
> #### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")
>                                             
>                                             
>                                         
>                                         
>                                         
>                                     
>                                     
>                                     
>                                 
>                                 
>                             
>                             
>                         
>                         
>                     
>                     
>                     
>                     
>                 
>                 
>                 
>             
>             
>         
>         
>         
>     
>     
> 
> |
> 
> |
> 
> |

