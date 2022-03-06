---
layout: post
title: The long road back
date: '2012-06-29 21:44:13'
tags:
- game-development
- real-world-experiences
- tutorials-resources
- windows-phone
- xna
---

Since I am a glutton for punishment, before and shortly after working on the WP7 app for work, I got involved with a talented developer in Auz called Chris Hughes.

Chris has published two game so far in his Chris series, first [Chris Unarmed](http://marketplace.xbox.com/en-GB/games/media/66acd000-77fe-1000-9115-d802585503a6) and then [Old School Adventure](http://marketplace.xbox.com/en-GB/games/media/66acd000-77fe-1000-9115-d80258550651/).

I was impressed by his work and his keeping with simple design and execution, so I asked about him doing a Phone conversion of Old School Adventure, since the control scheme would work well on the phone and it was using fairly light 2D graphics, all in all very entertaining.

Chris however does not have the hardware to run the development kit, problem.

So I stepped in and offered to help with the conversion, so here is what happened!

* * *

# In the Beginning

![](http://download.xbox.com/content/xna/assets/58550651_World/xboxboxart.jpg)

Chris and I got on very well and we got off to a running start, setting up the usual things to be able to share the code, so Chris could continue to work on content for the game while I worked on the engine and game.

The Idea was simple:

- Update the project to .NET 4 and GS 4
- Get the game running on the phone
- Implement an alternate control scheme
- Scale down assets for the phone
- Implement difficulties and more levels
- Phone extra features? 

So while I was busy with my work project, Chris got on with the GS 4 upgrade.  This proved very simple and only had a few issues with pre-multiplied alpha and the usual upgrade tasks.  Then he got the difficulty modes implemented in short order and it was time my Turn.

* * *

# Woe be to those who stick their neck out

![](http://upload.wikimedia.org/wikipedia/commons/7/78/Ostrich_-_melbourne_zoo.jpg)

Bit of an odd title, but those were my first thoughts in the first week of the project.  I will explain.

What should have been a very simple conversion project started going downhill quite fast, mainly because of the extra limitations put onto the Mobile platform over and above the existing restrictions of an XBOX project, namely, XML.

As with all games Old School Adventure (OSA for short) has configurable levels, items and lots of other things which use XML to store that configuration because it is simple, easy to read and very portable.  However Chris had use the full XMLDocument spec and written manual handling techniques to read and write the XML.

HOWEVER, the XMLDocument class is NOT AVAILBLE on the phone, Gah!!!, nightmare, and it is everywhere.  Still I was not deterred.  At this point I had several options:

> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Convert to use XDcoument, which is available on the Phone   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Convert all the XML content to use automatic XNB serialisation or write my own content importer   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Refactor all the XML type classes and use XML serialisation

Option 1 was not really an option and there is not enough functionality in the XDocument classes to do everything Chris did with the XML, I did not fancy changing the XML format (as it would mean Chris would have a hard time adding more content with his existing editor) and I have not written any of my own content importers before (however in hindsight, this might have been easier).

SO that left me with XML serialisation, I have done a fair bit of that before, granted usually from creating classes first and then generating the XML from them, but surely it wouldn’t be that different?

* * *

# The trial of reading someone else’s XML

![](http://www.brickshelf.com/gallery/Jojo/Eigenbauten/things/adalbert_stifter.jpg)

Starting with just the windows version of the project, I took the existing XML, de-serialised it and then populated a completely different set of classes with the result.  This is an interesting challenge, which in the end broke down in to the following steps:

> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Use the XSD tool (a command line tool provided with Visual Studio) to generate an XSD schema for each type of XML file     
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Use the XSD tool again to generate a class file from the XSD schema file   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Edit the generated class file to remove array’s of arrays ([][]) – More on this in a bit   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Write and test de-serialising the classes using XML serialiser   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Edit the classes to add additional values (because not all XML’s had all the values populated, grrr)   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Change the XML factories in the game to use the new Serialisers instead of XML documents   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    Test, Test, Test

One of the really annoying parts of this was part 3.  When the XSD tool find a collection of collections, it defines this as arrays of arrays ([][]), however:

> ([Excerpt from the MSDN documentation](http://msdn.microsoft.com/en-us/library/system.xml.serialization.xmlserializer))
> 
> The XmlSerializer cannot serialize or deserialize the following:
> 
> - 
> 
> Arrays of [ArrayList](http://msdn.microsoft.com/en-us/library/system.collections.arraylist)
> 
> - 
> 
> Arrays of [List\<T\>](http://msdn.microsoft.com/en-us/library/6sh2ey19)

Hence the XSD tool creates a class that the XMLSerialiser cannot use, this meant I had to refactor the generated code somewhat to flatten out these creations, each also took a few attempts to get right, with the makeup of the XML and the tags used.

After getting all this running (and then revisiting when I found some more ![Smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8446.wlEmoticon_2D00_smile_5F00_79D3BA0F.png)) I got the windows version running using all the XML’s

The end result of this, is that if you are considering making a multi-platform game and intend to include a Phone project, use standard XML or XNB serialisation.  If you are using pre-existing XML from another source, then write a content importer to ensure it will work on any platform.

* * *

# Starting the Phone conversion

![](http://www.masternewmedia.org/images/PDF_conversion_guide_free_best_services_2049391_size400.jpg)

Now at least I thought I was on a winner and used the standard “save as a windows phone project” option in Visual studio, which creates Phone versions of all the projects in the solution, EXECEPT the content project.  Thought that was a bit strange, but on we go.

Ran the project and it failed utterly.  Next came the more interesting discoveries of the phone platform:

> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    You have no direct access to files by default on the Phone, err, how do I get to my XML   
> ![](http://www.dotnetscraps.com/samples/bullets/037.gif)    There is practically no NULL error handling on the Phone platform

I found the second one quite surprising, after all I had just converted a working windows game and put it on the phone, one that had worked perfectly before on the XBOX, V.Odd, but I digress.  SO I wandered the code and added strict Null handling everywhere that content was read (including some type parsing as well, just to be sure).

As for the first point, by default the statement is true, however through the “TitleContainer” class, you can get specific file access to individual files (no directory browsing), so I just had to change the code to use that.  BUT I had to wrap each statement round a “#if (WINDOWS\_PHONE)” declaration as the TitleContainer is not available in windows or the XBOX.

Then it fell down on the next thing, which is connected to my last statement.  Part of the code browsed a directory for items, since this is NOT allowed at all, I just had to create a XNB serialisable file containing a list of all the items in the directory to import and used that instead of Directory.Getfiles()

* * *

# In to the Danger zone

![](http://4.bp.blogspot.com/_Ynrrr6220yU/TCn2MRtzkAI/AAAAAAAAB3w/6J2RYECKevo/s1600/movie-poster-top-gun.jpg)

Well not exactly, the next thing I had to tackle was the audio.  As it is well known that the Phone does not support XACT projects.  Now I could have changes all the audio calls to change from using cue’s to audio files, but that would just be messy.

To this end, I repeated what I did for the file collection and created a XNB serialised config file for all the audio, and used this to populate a managed list in the audio manager.  From there is was a quick step to change the existing audio calls to use the new list.

Finally i populated the list from the config file and updated the Play and Stop functions so that they both used the list and hay presto, no game code changes. 

Cooking on gas, yay.

* * *

# Dead Stop

![](http://3.bp.blogspot.com/_1sTsSByT--4/SuiibfFDUhI/AAAAAAAAAC0/eSIBWxyfHFw/s320/dead-stop-bootleg-edition-1.jpg)

Just when I thought I was out of the woods, the world came crashing in.  The game would start, splash screen would display but then the graphics device would just fall over and when I say just the graphics device, I mean it.  The game would still continue to run and update, all the menu functionality would be working however nothing on screen.

When the game started it looked normal but the screen would just page flip out (as if the application had been closed) at a certain point.

Disaster, I put on traces, check memory use, nothing.

So first I looked at the assets.  the background for the next screen after the splash screen as 1280×1024, big perhaps but not enough surely to blow the bank and surely if it was too big the build process would warn me, but no.  So I resized the background and it started working again and I thought I was out of the woods, WRONG.

Now it simply crashed later, what is worse is that I found that if I tombstoned the app and then came back it would actually display the main menu screen but it was unresponsive.  Searches on the forums, cries for help over twitter (which I must say again, thanks to all the help on both fronts, did not actually get it fixed but gave me lots of advice and options)

This appears to be a bit of a bug in the Phone framework because you get no errors, the app is not actually crashing.  Just the graphics device shuts down.  No help at all and tracing proved fruitless.

So, I started a separate POC project using the  standard Phone GSM, porting over all the pages and assets individually and went through a lengthy and tireless of testing each page, working out the difference between the GSM in the game and the standard GSM (thankfully they were similar).  This took over a week (nearly a week and a half) but it would not crash.  I got as far as getting to the gameplay screen (which I did not port that would have been too much) and no luck, I could not reproduce it.  SO I came to the conclusion it was not the assets this time.

I was almost on the verge of starting the project from the ground up, when I started looking round more, stepping through code, watching memory usage when I noticed a small fact.  When the menu system started in the main game, the memory would almost (but not quite) double, very odd.  Still not enough to cause concern but (instead of consuming 23md out of 320Mb, it was taking 43mb). 

Eventually after a lot of probing I found the answer, the main game class was being instantiated TWICE, this was due to a singleton pattern being used on the main game class (which is normally not a problem and a good practice), however, what was not happening is that the instance of the game class was not being created at startup, it was being created later when the first call was made to it (still correct).

Now the answer to this riddle is not one that is instantly obvious, but here is how it goes.  In windows and XBOX projects, the first call to start your game is the MAIN class which is usually called from within your Program.cs.  HOWEVER, this is not true with the phone, in a phone project it looks for the class inheriting from the XNA framework GAME class directly (in Silverlight it looks for the APP.XAML).  Now in a normal singleton pattern you instantiate your main class from the first call, usually in the MAIN class, but this now was not being called and the Game started directly, bypassing the singleton.  So when the singleton instance was being called, it was empty and created a second game class in memory.

Bit of a long winded explanation, but in your game only ONE class can inherit from the XNA game class, and the compiler will warn you if you try.  The reason fro this is simple, the Graphics Card can only have one master and the Game class is the direct link to the graphics card through it is GraphicsDevice declaration.

So when a second game class was created in memory, it tried to initialise the graphics card again, the phone got very worried and shut down the graphics card ONLY.  The XNA game class was still running, but twice.  Two sets of updates and two sets of draw calls (except the draw calls did not fail, they just did not go anywhere)

After quickly sorting out the singleton and making sure it was set to the existing Game class, things went a lot better.

* * *

# Woohoo I can see LIVE things

![](http://t0.gstatic.com/images?q=tbn:8Pxg4l7q88A8NM:http://lolebrity.wordpress.com/files/2008/08/steve-jobs-wants-you-to-stop-it.jpg&t=1)

Granted all was not yet rosy but the game ran, a few more defaults needed setting from the XML configuration and there were still some areas where I had not accounted for nulls, but the game was running.

Next up was the fine tuning, getting message boxes to display right, resizing more assets to fit the screen, either by resizing down the source or changing the drawing.

A good point to make here is that if you are making a multi-platform project (despite what the project convertor does not do for you) you will need multiple content projects.  BUT, not (in most cases) duplicate content.  the trick is to use the power of the content pipeline, code should only rely on asset names (you should not have #if statements or IF(Phone) use asset X ELSE use asset y), so make a copy of the content project file and rename it something for the phone, and in your phone solution use that one and in your windows / xbox project use the original.  Like this:

| 

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8030.image_5F00_thumb_5F00_67B750B5.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/5126.image_5F00_2F88FF6A.png)

 |

 

 

 |

 

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2161.image_5F00_thumb_5F00_3F2848D4.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/0027.image_5F00_10FE72E7.png)

 |
| Windows Project |   | Phone Project |

| [![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/0412.image_5F00_thumb_5F00_731C9C8D.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6371.image_5F00_24D7B9E3.png) |
| File Directory |

So in the windows project you have an asset file called “Background.png” and named “Background”, in the Phone content project you have a file called “Background\_Phone.png” and named “Background”.  To the code they are both the Background image, it is just the actual file being used as the background is different.

We did the same with the audio as well, you will always find that the largest content you will ever have is your audio, simply because there is no compression allowed at all with audio files, but as has been stated before, using a tool like Audacity and down sampling your audio to 22,000k and Mono (instead of stereo) does not degrade the audio content too much, especially for playing back on a mobile device.

* * *

# Testing the obvious

I have made a few comments above about testing, so here is what I used:

- For testing Memory, I added the following into the start of my main game constructor, this tells you current and maximum memory use: 

    
    
        #if(WINDOWS\_PHONE) using System.Windows.Threading; using Microsoft.Phone.Info; using System.Diagnostics; using Microsoft.Phone; #endif
    

- For testing the accelerometer, I used the Thumbsticks project from the CC site (sorry, App Hub now, lol).  Just set your accelerometer values to the output of the thumbstick controller 

* * *

# Final thoughts

![](http://www.socialstudiesworld.com/images/thinker_picture2.jpg)

Now the game is not released yet and we have a few minor tweaks left to go (more content, tweaking the controls system) but it is nearly done and the major problems with the conversion are out of the way.

So here is a few passing tips:

- Remember it is a mobile platform and scale you assets down to either 800×400 for textures (or lower) and use no more than 22,000k mono for audio (I plan to generate 8 bit audio in my next project )
- Keep separate solutions for your different platforms but use the same code, just have platform versions of each project file to use.
- Use a separate content project for each platform that needs it, just copy the content project file, rename it and then exclude those assets you are not using and replace them with new assets with the same asset name.
- For configurable content, Use XML through the content pipeline to keep compatibility, the easiest way is through XNB serialisation, just remember you need a WINDOWS project to hold the types for the content importer and a platform specific version to use in your game (I’ll write a post on this soon). 
- DO NOT make your own reader or use the XML classes, unless you like pain.
- Remember tombstoning, as stated in my last post do not underestimate how much testing you need to do with tombstoning, if unsure ask on the forums or twitter, there will always be a lot of people happy to help.
- If you are thinking of targeting the phone while doing your Windows / Xbox project.  Make sure it is set to the “Reach” graphics mode to start with.  At the point you need to change up, is when you need to split it for your phone project.
- Did I mention do not do your own XML. 

Onwards, here is hoping OSA to hit the market soon.

Technorati Tags: [#WP7DEV](http://technorati.com/tags/%23WP7DEV),[windows phone development](http://technorati.com/tags/windows+phone+development),[XNA](http://technorati.com/tags/XNA),[post-Mortem](http://technorati.com/tags/post-Mortem)

