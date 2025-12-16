---
layout: post
read_time: true
show_date: true
title: The eternal battle with disk space
date: 2019-05-15 13:42:31
description: If you find you are low on space on your C drive/ system drive.  Here are a few tips and tricks to help you make the most out of your available space.
img: wordpress/2019/05/image.png
tags: [android, unity3d]
author: Simon Jackson
github:  
mathjax: no
---

From the earliest days of my youth, we have always battled with finding space to install “stuff” on our computers.  Whether it was fragmentation, whittling down all the unnecessary things we don’t need or just plain burring millions of cat pictures to CD’s, we always needed more space.

Technology caught up and gave us bigger hard drives and suddenly we had the space we needed, but access was still slow and as software got bigger, it got slower.

Then came the herald of SSD’s, the promise of speed. Our machines got quicker, programs loaded faster and the world sped up to keep pace.  However, we are suddenly again scratching for space, these new drives are fast but they are costly in sizes that we now need to install everything.  So we are back to scratching through the dirt to find stuff to move and delete.


# My battle with space

I develop for so many platforms these days, my hard drive seems to fill up so fast.  It is a daily / weekly struggle to find the space to install things.  Most things like Visual Studio or VR games have to be on the SSD to perform as fast as they can, while others can happily sit on the old HDD’s chugging along.

However, things like Visual Studio have sooo many components and a lot Ca not be installed in another location (I wish they could), others by default build large caches of information while you are developing (such as NuGet) right with your user profile which is also invariably where you have installed Windows, on your fast drive.

But I am finally making headway after some later research


## NuGet (saving approx 10gb)

The easiest one to start with is NuGet, by default, creates a global cache in your user profile (which sits alongside your Windows folder). But as of NuGet 3.5, you can now force NuGet to use another folder.  To do this, you simply need to add a new Environment Variable called “” pointing it to a new location.

Before you start, you should clear your current NuGet cache from Visual Studio:

1. Open the NuGet package manager using “Tools –> NuGet Package Manager –> Package Management Settings”
2. Click on the “Clear All NuGet Cache(s)” button. Bang and the cache is gone.

Then to move your cache folder, do the following.

1. Create a new folder where you want your NuGet cache to store downloaded packages, e.g. “D:\NuGetCache”
2. Open up your System environmental variables  
Settings –> Search “Edit the System Environment Variables” –> “Environment Variables”
3. Click on the lower “New” button in the System Variables section
4. Enter a new variable name of “NUGET_PACKAGES” and enter the path to your new folder in the Value field (or click “Browse Directory” and select it

This will tell NuGet to use this alternate folder for its cache. 


## Microsoft SDKs / Windows Kits (Approx 16gb)

A lot of “stuff” we need for development are the various SDK’s, development kits and platform packages that are used when we are building project, we do not use them every day and they can take up a lot of space.  If like me you need them ALL, it can get very large.

Unfortunately, you ca not just move them as Visual Studio needs them where they are, in fact, I have been unable to find any way to specify they could be in another location (feel free to comment if you find a way).  All is not lost however as we can actually move then and fake their location through a feature in Windows 10 called Symbolic links.  Simply put, they are a way to cheat the system and put a link where the files are which automatically redirects to where the files actually are.

> #### Warning!!
> 
> A fair few articles will suggest Symbolic links for things like user directories and other Windows System folders.  DO NOT DO THIS.  When Windows upgrades the links will be lost and you will end up with duplicate data or worse, you will not be properly upgraded and things will get broken

Symbolic links are useful for storage files or non-system based files to trick the system to think the data is still where it expects.  I found this fantastically useful for the following folders:

- C:\Program Files (x86)\Microsoft SDKs
- C:\Program Files (x86)\Windows Kits

Both of these contain a lot of information that you will rarely use when building solutions.  If you find other large folders, by all means, repeat this process for them.

To get started, simply:

1. Close any applications possibly using the folder you want to move
2. Cut / Copy the folder to its new location, e.g. C:\Program Files (x86)\Windows Kits –> D:\Windows Kits
3. Start a new Command Prompt in admin mode ( Start –> CMD –> Start as Administrator)
4. Run the following command (updating the arguments as required)  
    mklink /J “C:\Program Files (x86)\Windows Kits” “D:\Windows Kits”
5. Profit

If you only copied, you can safely delete the old folder (I just moved mine), once the move is complete!!

Now Visual Studio still thinks the files are where it expects, but in reality we have shifted them elsewhere, saving oodles of disk space.


##  


# But Wait, there is more?

I am still digging through for more little tidbits, but these two tricks alone have already saved me more than I will need at the moment and it is at the balance point of moving low impact data to slower storage against the speed I need for other data.

If you find more, let me know and I will update this article!