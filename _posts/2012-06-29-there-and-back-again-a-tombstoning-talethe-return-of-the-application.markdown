---
layout: post
title: There and Back again  - 'A Tombstoning tale' The return of the
  application.
date: '2012-06-29 21:49:37'
tags:
- tutorials-resources
- windows-phone
---

![](http://img.dailymail.co.uk/i/pix/2007/06_01/TombstoneSWNS_468x526.jpg)

In my original post here “[Is my XNA game dead yet?](/2010/08/13/is-my-xna-game-dead-yet)”, I covered most of the basics of tombstoning, that being the process of what happens to your app or game during it is life on the Windows Phone.

The Windows Phone 7 Team on their blog also added to the mix with “Understanding the Windows Phone Application Execution Model, Tombstoning, Launcher and more” with [Part 1](http://windowsteamblog.com/windows_phone/b/wpdev/archive/2010/07/15/understanding-the-windows-phone-application-execution-model-tombstoning-launcher-and-choosers-and-few-more-things-that-are-on-the-way-part-1), [Part 2](http://windowsteamblog.com/windows_phone/b/wpdev/archive/2010/07/16/understanding-the-windows-phone-application-execution-model-tombstoning-launcher-and-choosers-and-few-more-things-that-are-on-the-way-part-2) and more importantly [Part 3](http://windowsteamblog.com/windows_phone/b/wpdev/archive/2010/07/20/understanding-the-windows-phone-application-execution-model-tombstoning-launcher-and-more-part-3).

Now tings have moved on and the understanding of how to handle things correctly has changed, so I’ve updated the guidance here with a few personal notes.

\*\*Note.

I also now know that tombstoning is also an extreme sport, where you hurtle your body off some large object in to the sea (see the above picture care of the Times Newspaper).   Do not try this yourself as this guide will not help you with that at all!!

* * *

## Falling asleep

![](http://moblog.net/media/t/e/f/teflon/people-falling-asleep-in-unlikely-places-part-ii.jpg)

The main focus of the last article was about handling tombstone events.  If a call comes in or you launch a chooser / launcher, then you app is terminated.  From the point at which the Deactivated event is fired you have approx. 20 seconds in the background to save the state of you application / game before the phone kills the process forcibly.  If the phone kills you app/game them any information you could not store in time will be lost, there is even a chance that you will loose any data you tried to store.

So the key guidance is to keep the information you need to store during a tombstone (deactivated event) to a minimum. The process should be something like the following for games:

1. Game starts from cold
2. Menu displayed (loading content while it is displayed)
3. Launch game
4. Update values as play progresses
5. When a deactivate event arrives, store a flag to tell the game it resumes where to pick up from
6. Store any additional live information required to return the player back to the previous state / position (keep it light)
7. When focus is returned to game, check the Start-up mode in the game constructor and kick off a background thread to load intensive data
8. In the activated event, check there was a previous state and if one exists load the game back to it previous place
9. Start playing (optionally, also put up a paused screen to give the user time to return to the game) 

For Silverlight apps, this is similar:

1. App starts from cold
2. User performs activity in the app.
3. If navigated to a different page store the page name (and any values needed to launch that page)
4. If navigating to a different index on a page, store that index as it changes
5. If data is returned from the web, cache it and then display it (if requested again, look in cache first)
6. When a deactivate event is fired, store a flag in the phone state to note deactivation
7. When the app is re-launched, check the start-up mode and validate any caches you have while the app resumes
8. In the activated event, return the user to the page and index they were viewing and re-bind any data to that page. 

In short, use the isolated storage and settings cache during the app to keep any Phone application state objects to a minimum (DO NOT STORE IMAGES IN THE PHONE APPLICATION STATE!) and tailor the start-up process to be as efficient as possible.  Do not assume that if the start-up mode is “Activating” means that the Phone state cache has any values, always test.

* * *

## A place for everything and everything in it is place

So to recap, we have a few places to store things while our app is running:

> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)   **Isolated Storage**
> 
> This is the main storage for WP7 application, you can store what ever you like in and have almost unlimited storage (well almost).  There are no quota limits for isolated storage but be aware of how much you use as most phones only have 8Gb available and most users would like to use that for other applications as well!.
> 
> With isolated storage you can have multiple files and folders and can even iterate through the files and folders stored there pretty much the same way you do on the PC.
> 
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    **Isolated Storage Settings cache**
> 
> The settings cache is a simple serialised storage dictionary area.  It allows you to store single objects against a single string lookup.  Pretty much the same way a List or dictionary works in code.
> 
> Again there is no limit to this settings cache, only limitation is that it only supports simple XML serialisation, so is no good for things like images or complex classes.
> 
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    **Phone Application State storage**
> 
> The application state area is almost identical to the Isolated storage settings cache with a few little differences.  First and foremost, it only lets you store up to 2 Mb of data (for performance reasons as the phone is starting or stopping).
> 
> The other point is about access, the phone application state store is ONLY available during the tombstoning events “activated” and “deactivated”, if you try to access it outside of this you will get an exception message (most of the time!!, see later).  It is not available in the application constructor (before the activated event is fired) and is not available after the deactivated event is complete (not in the onExited or onClosed events for example)
> 
> It may be available during the running of your application but this is not guaranteed.
> 
> The purpose of this store (unlike the Isolated type stores) is to provide ADDITIONAL information to your application when it is resuming only, to allow you to return the application back to it is previous state before it was interrupted by another event, such as a phone call or calling out to a Launcher or Chooser task.
> 
> Also if the application is exited cleanly (or the phone is powered off), then the Phone state store is cleared (most of the time), so it is not persistent storage like the others.  I am keep to get this point across because I have seen far too many tutorials or comments stating this is the place to store your data regardless of what it is used for.  Like everything else know what to use and when and why.

One main thing to keep in mind with all of these storage options is that they are application specific, only your app can see or access your apps files / folders and no sharing is allowed.  The only way for two apps to share data is through the cloud or your own custom web service/site on the internet.

* * *

## Keeping track

![](http://www.personal.psu.edu/yoj5029/blogs/joyce_jiang/Keeping_Track_Of_Files.jpg)

The code for using Isolated storage is fairly well described and detailed already, so I wo not go over that again.  I would recommend also using Nick Gravelyn’s “EasyStorage” project on [codeplex](http://easystorage.codeplex.com/).  It is fairly well documented on there and a good resource to use.

Using the isolated Storage settings dictionary is also well documented on [MSDN here](http://msdn.microsoft.com/en-us/library/system.io.isolatedstorage.isolatedstoragesettings(v=VS.95).aspx) and operates much the same way as the Phone application state dictionary as described in the previous article.  So saving a value becomes as easy as:

    IsolatedStorageSettings.ApplicationSettings.Add("My Setting", "My Value");

And retrieving it using:

    String setting; if (IsolatedStorageSettings.ApplicationSettings.Contains("My Setting")) setting = IsolatedStorageSettings.ApplicationSettings["My Setting"] as String;

**\*\*Always test, else it will crash out with an exception if the key does not exist!!**

However once point to make is to make use of this store during the running of the application or game, it is not just for saving data for the user/player.  So if you need a cache for your application (highly recommended for web based apps or using images).

So if you are navigating between pages in Silverlight or navigating between pages on a pivot or panorama, then store the setting as it changes in the Isolated Settings store.

If you get a results set back from the web into a list, then store it as it is returned and dispose it when the results are no longer needed.

in games, you can use it to track the players score/ lives or level or even completed levels or history, you do not need to wait until the player saves or when a Tombstone event comes in, do it progressively as the game runs.

* * *

## Can you tell me a bit about where you are from 

![](http://1.bp.blogspot.com/_oUjmZeacI3I/S6QrDWppcyI/AAAAAAAACwc/Pu4hzJJZjIs/s400/d-tombstone.jpg)

An often overlooked feature of the Phone application model is the phone Start-up Mode.  Within the PhoneApplicationService class, there is a state object that tells you how the phone started the application.  As the MSDN help suggests:

> “This is most useful for XNA-based applications that must perform content loading operations before the [Activated](http://msdn.microsoft.com/en-us/library/microsoft.phone.shell.phoneapplicationservice.activated(v=VS.92).aspx) or [Launching](http://msdn.microsoft.com/en-us/library/microsoft.phone.shell.phoneapplicationservice.launching(v=VS.92).aspx) events are fired.”

So in your applications constructor (or LoadContent function) you can check how the application was started and perform any warm up functions you need to BEFORE the activated event is called.  This is important when you are watching your start-up times, you do not need to push every test or check in the activated event when resuming. (also read the next session and take care when the phone THINKS it is reactivating)

To make use of this state just test the state in your applications constructor, like so:

    if(PhoneApplicationService.Current.StartupMode == StartupMode.Activate) //Do something special for activation

* * *

## Sleepwalking

![](http://www.cartoonstock.com/newscartoons/cartoonists/rma/lowres/rman11341l.jpg)

Now in one of the more bizarre turn of events when dealing with tombstoning, there are cases where tombstoning is called but never actually happens.  Now this might seem odd but is one to look out for else you will be caught out, the main causes of this are:

- Message boxes in XNA
- Using the SIP keyboard in XNA
- SOME of the other services provided by the guide services (not including the marketplace launcher)
- When the screen locks (now confirmed it does not close the app / game always)
- If the user unfolds a hardware keyboard (confirmed on some devices but not all) 

The basic rule of thumb is test all the ways that your app/game is going to be used.  Use the debug window to track when events happen and use in memory values to test if the app is actually tombstoned when the activated event is returned.

Also remember the emulator is **NOT** an actual device or an exact replica of one.  These behaviours also differ on an actual phone.

On several occasions in the apps/games I have developed I’ve fallen foul of this in different places, so be careful.  Just because the deactivated / activated events fire does not always mean that your app has been disposed, check for it, else at it is best your game will just restart or worse, it will cause memory issues trying to get content into memory twice and cause the app/game to crash.

* * *

## The quick brown fox jumps over the lazy dog 

![](http://blog-cache.extensis.com/wp-content/uploads/2009/01/qbfjotld.gif)

Now some players are just lazy or not paying attention, for these situations you need to manage the idle features of the device, else it will mange them for you.  Remember sometimes, it is not the players fault, they might be waiting for something to happen in your game.

The idle detection works in two ways:

- User Idle detection 

> Defined by a period of inactivity by the user, such as no touches to the screen.  This is configured on the phone itself (although not till a later update, for now it is fixed?), you can disable it though code in your application using (you can also enable it by setting it to enabled):
> 
> PhoneApplicationService.Current.UserIdleDetectionMode = IdleDetectionMode.Disabled;

- Application Idle detection 

> Defined by a period of inactivity by the application, such as no page activity or updates.  This is again configured by the user but can be disabled / enabled in code using:
> 
>     
>     
>         
>         
> Well that is enough from me again for a while, things to do, people to see and games / apps to write. 
>         
>         
>         
> Once I find some more useful bits I’ll be back.  At some point I will continue the 2D tutorial series and even (maybe) start up the 3D tutorial.
>         
>         
>         
> I do have some other ideas in minds but for now (motivation depending), I actually want to get some work done, lol.
>         
>         
>         
> You can reach me on twitter [@DDReaper](http://twitter.com/DDReaper "Simon (Darkside) Jackson on Twitter") or contact me though this blog if you have any glaring questions, C&C welcome as always and if you have a good point, I’ll update this article.
>         
>         
>         
> \*\* Note
>         
>         
>         
> Always test on a real device, there are some things different between the emulator and device, not including the performance difference between the two (even some things that REALLY should not be different).  As an example, one of the applications I wrote was very dependant on some backend WCF services and for some reason on the emulator I had no issues talking to those services (unless I was behind a proxy, but that is a another story)  but when it was submitted to the market place it failed (badly), upon further testing on some real devices, it would not get data from the web service, even though it reported the connections were successful.
>         
>         
>         
> It looks like I have fixed that now but I’m still going to test some more before resubmitting as I still do not know why it did not work, even though I now have it working (I did not change anything fundamental, so WHY?) Test Test Test and then test some more!
>         
>         
> Technorati Tags: [XNA](http://technorati.com/tags/XNA),[#wp7dev](http://technorati.com/tags/%23wp7dev),[windows phone development](http://technorati.com/tags/windows+phone+development),[tombstoning](http://technorati.com/tags/tombstoning)

