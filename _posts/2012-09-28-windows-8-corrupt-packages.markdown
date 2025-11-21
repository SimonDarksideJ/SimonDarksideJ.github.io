---
layout: post
title: Windows 8 Corrupt Packages
date: 2012-09-28 09:08:55
tags: [windows 8]
---

Like with any new system there are bound to be some kinks in the road, issues or just downright annoyances that will send you spiralling into the deepest dark pits of annoyance (the last has been me for the last few weeks).

A situation exists (which unfortunately is not reliably or easily repeatable) where you start your app/game, the splashscreen shows and then it just sits there, no prompt, no move, no crash, just sits there.

This situation gets worse when it works fine on your machine but is experienced in the Windows Store certification process as they are still learning how to communicate with devs (more on this later)

There are a few workarounds and a last ditch sledge hammer approach which I will go through here, but buyer beware its not nice, it is not clean and has repercussions for your end users.

**\*NOTE PLEASE BE SURE TO READ THE CAVEATS SECTION AS THERE IS A DOWNSIDE TO THE SECOND APPROACH**

* * *


# The Situation

As briefed above, it goes like this, you run your app and are presented with the Splashscreen, then one of two things happen:

- You stay on the Splashscreen and nothing happens
- The Splashscreen goes away and you are left with a blank screen

**The issue is machine dependant so it will occur on one but not another**

If you step through your initialisation code you will find that your first page initialises, the page is loaded and all YOUR code will complete but then nothing.  So it does appear to be an issue in the WinRT/.NET45 pipeline somewhere.

**NOTE – Just uninstalling the product will NOT fix the issue**

* * *


# Local Resolution

Now I was head scratching this for some time and there is ONLY ONE solution that works to fix it on the local machine and that is to DELETE the installed package (not just uninstalling it).

This allows you to re-install a previous version using the app package and still test upgrades and the package instance is still preserved, although of course locally save config will be lost unless you back it up first.

To find you package look in the following path:

> **C:\Users\\<Username\>\AppData\Local\Packages**

In there you will see the folders for all your installed applications, just locate the one for your application, it should have your project name plus the app package ID in the folder name.

Once you have located it, DELETE IT (go through and back up any config if you wish fist, but just the config!)

Now if you install or run your project from Visual Studio it should now work

**If you install the previous version of your app this will STILL ALLOW UPGRADES as the package definition is still intact.**

* * *


# Trials and Store tribulations

Now, if this situation occurs while you app is going through certification for the Windows Store, understand that the testers are NOT going to do the above, in their eyes if it happens, it is a failure.  Regardless if you app works fine regardless there is no middle ground, no help and worse of all (at the time of writing) they do not recognise it.

What you will get back from the store certification process is any number of the following certification failures:

- Cert Failure 1.2 (your app is not complete)
- Cert Failure 2.3 (you app does not add value)
- Cert Failure 3.2 (your app crashes at start-up)
- Cert Failure 3.8 (your app fails start-up times)

Thankfully in the last week they have now started including a PDF with a bit more info **MAKE SURE YOU READ THIS!** which will highlight if they are experiencing the issue mentioned in this article and not just a WACK failure on your part.

If the store testers are experiencing this issue then this will be evidenced by the screenshots they provide as they will show either just the Splashscreen or your Splashscreen followed by some blank images (I had four identical images in one report)

Now (at the time of writing) if this happens to you in repeated certification attempts (5 in my case until the reports showed what was happening) then currently there is only one solution, REBUILD YOUR PROJECT, I tried one solution [proposed by Laurent Bugnion](http://geekswithblogs.net/lbugnion/archive/2012/09/10/adventures-in-windows-8-solving-activation-errors) to change just the project GUID but this does not solve the issue.

In short create a new Solution and Project (if you want to make it easier for yourself just rename your old one and create one with the same name) and then copy your class files and XAML into your new project.

In Short you are just recreating the .SLN (Solution) and .CSPROJ (Project) files and this is the easiest, pain free way of doing this and still retaining your project make-up.

**do not FORGET TO EDIT YOUR “Package.appxmanifest” and add capabilities and icons, orientation and other settings you provided, DO NOT copy the file over.**

You will still need to “associate” you solution to your project in the store (be sure to check the “Include apps with existing packages” option when browsing), then run a full WACK test after creating your package and submit again.

**I’VE GONE THROUGH THIS MYSELF AND THIS FIXES THE ISSUE**

It fixes because to the windows installer it is a completely different package, more of a slight of hand rather than an actual fix.

* * *


# CAVEAT’s

BE AWARE, while this fixes the issue in certification the **second approach** whether you test locally or in the store will wipe out the previously installed application and reinstall it fresh.

THE USER WILL LOOSE ALL DATA THEY HAD PREVIOUSLY

I have proven this locally as well as on the store because to Windows it is a different app and acts accordingly by uninstalling and wiping the old version.

IF THIS IS GOING TO BE AN ISSUE FOR YOU THEN DO NOT DO THIS

* * *


# Rounding Up

As explained this is a brute force solution to what appears to be a framework issue in Windows 8, if the situation changes (although will we ever know if they actually fix it because it is near damn impossible to recreate until it happens to you) then maybe I hope this will not be needed.

My one theory **which remains untested** is that it is to do with installing the current version on the Store and then running either a development or locally installed version over the top of it, if this is the case we will see this crop up more but I have no proof of this yet with only one app published in the store (been too busy fixing the update to that app to do more ![Confused smile](/assets/img/wordpress/2012/09/wlEmoticon-confusedsmile1.png))

I hope this helps you if you do get stuck in this loop.

