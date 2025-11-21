---
layout: post
title: Windows Server 2012 roundup - the return! - Part 1
date: '2013-04-22 11:49:59'
tags: [information]
---

On the back of the [#TechEdChallenge](https://twitter.com/search?q=%23techedchallenge&src=hash) I downloaded all three of the evaluation products for review and decided to give them a whirl, the first up was Windows Server 2012.

As a bit of history I did spend a great deal of my tech career building / installing and maintaining at a very low level a lot of Microsoft servers and products running on them, it was always an interesting time and some of the best fun I have ever had involved unboxing a new piece of kit (several 10’s of boxes usually), putting it all together and getting the system up and running and integrated with our server environment (mind you this was before cloud and cloud based systems).

Since then I have been out of touch with server OS’s, mainly due to work commitments (even my old test lab was decommissioned, when our second child came along) but other stuff as well, server was no longer my focus, I had moved to the client and app world.

**\*Update,** due to time restrictions I am going to post about this in parts as I experience the full breadth of each product to get their full worth as I explore them to the full.  Will post links to each update in all articles.

So it is time to go back and see just what has changed with new eyes.  This post is going to be written as I am experiencing it, so instead of playing with everything first and then trying to remember I am going to show you what I see when I see it.

* * *


# Installation

Well first impressions are the ones that usually stick, heading into Hyper-V installs for the first time was a big eye opener (do not have a spare box at the mo) but after a few wrong turns (and downloading the server iso image a couple of times) I got the Windows Server 2012 install going and…. it was a nice surprise.


## Zero UI install option

The first thing I really noticed is that Microsoft has finally relented to the backwash of Unix based server installs and provides an install with no UI, it is completely managed through a console screen and powershell scripts, very interesting.  This was probably introduced with the DataCenter edition in the last release (unconfirmed) but is now available in Windows Server 2012 installs.


## It is FAST

The whole install even on a low spec VM on my machine took minutes, seriously, I must have blinked a few times and did not notice it was sat there waiting for me and I had not even noticed.  Was not expecting that.


## Charmed Unsure

Well there is always one curious one in the pot and this certainly falls into this category.  Once the install was complete and the box was up and running I was greeted with the Windows 8 style experience, NOT the metro / modern look mind, but the charms bar and other features are fully enabled.  Not sure if this really fits in the server world and I can understand Microsoft’s attempts to unify its user experience but the Admin community favour use over UX any day.


## Did I say it was fast?

Granted there is not anything running on my VM yet but damn this thing is quick.  It starts from cold in minutes and I can get back to trying stuff with almost no delay.  This is a fantastic improvement from the old days where I was waiting minutes (if not longer) for the server to start, even on some really powerful kit.  Microsoft has always aimed (especially since server 2008) to get the box up and running before starting components / services and “get you in quick” but in 2012 they really mean it.  If you slapped an SSD in as the boot drive I am sure this would even be an instant on system from cold.  (for reference I timed it and it was **3 seconds** to logon screen, **2 additional seconds** to desktop and **5 seconds more** to the welcome screen, **up in less than 10 seconds** )

**\*\*Even the shut down is fast**

Engineers I salute you.

* * *


# Into the quagmire

So my box is up and running, now what?

With the box started up from a fresh install you are greeted with a nice “Welcome to your server” screen

[![image](/assets/img/wordpress/2013/04/image.png "image")](/assets/img/wordpress/2013/04/image1.png)

From here as you would expect you start adding services, components and other such bits to get your server up and running.  From first glance, gone are the old search for which components you need to run things and everything is plain and right in front of you.  It has brought along the server 2008 roles and features look and feel (a big bonus even back then) and even gives you a limited management option to include more servers in your little management group, gone are the days of requiring a dashboard or having to remote in to every server just to check it is health, it is all right in front of you. (In fact I think the “it is right in front of you” is going the factor a lot in my view).

The help shows you straight away just how important Microsoft feel about managing your “Environment” instead of a collection of servers.

[![image](/assets/img/wordpress/2013/04/image1.png "image")](/assets/img/wordpress/2013/04/image2.png)

Add features remotely, I like the sound of that!!

Even the education tab leads (potentially even drawing you to) additional areas you should look to become a better server manager

[![image](/assets/img/wordpress/2013/04/image2.png "image")](/assets/img/wordpress/2013/04/image3.png)

Excited to see just how far this goes with this latest offering.

Switching to look at our starting point, Microsoft certainly have given you a very detailed overview of what each server is doing and what it has running on it:

[![image](/assets/img/wordpress/2013/04/image3.png "image")](/assets/img/wordpress/2013/04/image4.png)

My only complaint here is that the dashboard is fixed, I would have liked to have been able to arrange the dashboard to my liking and order and possibly even hide/add more views to it to meet my needs, a fairly simple thing I would have thought.  Overall however this is light-years ahead from what I have experienced before, having such a performant global status screen for the server in one place (not like the old clunky Computer Management MMC view), it delights me that this one screen alone runs smoothly without affecting the performance of the server.

I also really like those hyperlinks all over the place, taking you straight to the configuration options without having to wade through pages of property screens ![Open-mouthed smile](/assets/img/wordpress/2013/04/wlEmoticon-openmouthedsmile2.png)

* * *


# So what can it do?

“Lets stop talking about is and actually get on with it, show of hands!”

**(\*Click on images to view them full screen**, !thanks [Jetpack](http://wordpress.org/extend/plugins/jetpack/)!)

| 

### Adding your first role(s)
 | 

### Selecting your destination type
 | 

### Where to put it
 |
| As you would expect when doing any new task with Microsoft these days, you are greeted with a nice “So what would you like to do and here is what this does” wizard start page, no exception with the “New Role” wizard. |

Nice and helpful here.Next up you need to decide how you want to deploy these new features, either as a separate virtual instance or on the server itself.

Running this already in a VM with no domain so only local works here for me.This screen did take me by surprise, obviously for supporting environments with SAN storage and multiple deployment options, you not only get to choose where to install features but also select if you want it encapsulated in a VHD! [![image](/assets/img/wordpress/2013/04/image4.png "image")](/assets/img/wordpress/2013/04/image5.png) [![image](/assets/img/wordpress/2013/04/image5.png "image")](/assets/img/wordpress/2013/04/image6.png) [![image](/assets/img/wordpress/2013/04/image6.png "image")](/assets/img/wordpress/2013/04/image7.png)

| 

### Selecting the bits
 | 

### Dependencies
 | 

### Different roles, different dependencies
 |
| Once you figured out where it goes, the next obvious step to to add Roles for what you want the server to do.  Nice clearly defined boundaries | If your selection has dependencies then they are added automatically for you, no more dropping out the install to find yet another “feature” you need to have preinstalled first. | Pretty obvious but worth pointing out that the system intelligently only installs those bits needed for each role, even if features are needed for multiple roles |
| [![image](/assets/img/wordpress/2013/04/image7.png "image")](/assets/img/wordpress/2013/04/image8.png) | [![image](/assets/img/wordpress/2013/04/image8.png "image")](/assets/img/wordpress/2013/04/image9.png) | [![image](/assets/img/wordpress/2013/04/image9.png "image")](/assets/img/wordpress/2013/04/image10.png) |

| 

### Extra features
 | 

### Ooops ![Open-mouthed smile](/assets/img/wordpress/2013/04/wlEmoticon-openmouthedsmile2.png)
 | 

### Configuring roles
 |
| Once you have decided what you want the server to do, you can then also select any additional features you want enabled by default.  Very useful if you intend to install “other” software. | Try to add a role or feature that your current environment cannot support (say trying to install Hyper-V in a Hyper-V image) and the install will just warn you. (As in not crap out the whole install) | With everything set you then get to customise the roles you have selected and customise how each role with operate |
| [![image](/assets/img/wordpress/2013/04/image10.png "image")](/assets/img/wordpress/2013/04/image11.png) | [![image](/assets/img/wordpress/2013/04/image11.png "image")](/assets/img/wordpress/2013/04/image12.png) | [![image](/assets/img/wordpress/2013/04/image12.png "image")](/assets/img/wordpress/2013/04/image13.png) |

| 

### Would you like fries with that?
 | 

### Everything set?
 | 

### Off it goes
 |
| Configure it how you want when you want.  Would you like Com+ with your app server sir/madam? | Review what you selected.  
What’s nice here is that there is even an option to automatically restart the server when needed during install, however many times that may be.  
Obviously not advised on a Live system ![Open-mouthed smile](/assets/img/wordpress/2013/04/wlEmoticon-openmouthedsmile2.png) | What is nice about the progress screen is that unlike other server installs, it can be closed.  You can check on its status from the Notification pin in the Dashboard at any time.  
Acts more like Windows Update than an MSI install. |
| [![image](/assets/img/wordpress/2013/04/image13.png "image")](/assets/img/wordpress/2013/04/image14.png) | [![image](/assets/img/wordpress/2013/04/image14.png "image")](/assets/img/wordpress/2013/04/image15.png) | [![image](/assets/img/wordpress/2013/04/image15.png "image")](/assets/img/wordpress/2013/04/image16.png) |

After all this it does give a refreshing view that Microsoft are serious about making administrators and engineers lives easier plus making maintenance a doddle.

There are a few things I could nit-pick at the process, like if an installation fails for whatever reason you are notified it and can review the error summary, however there is no way to re-submit or alter that installation to set it off going again, especially with lengthy configuration choices it forces you to start again.  On the other hand such a system would force you to do smaller installs and in fact you can configure several simultaneously and each will kick off after the other has finished, so maybe smaller is better!

Overall it feels very smooth and well thought out, not having to keep jumping in and out to install this and that just to get the install moving is a real bonus (something I have do not far too many times), plus it installs everything in one go at the end and in the correct order, saves you so much time, just click and go.

* * *


# The Finish Line

After you have got the server up and running and installed your roles and features, as expected the dashboard is updated and new options become available to drill down to each feature of a role on its own rather than the big view dashboard look:

[![image](/assets/img/wordpress/2013/04/image16.png "image")](/assets/img/wordpress/2013/04/image17.png)

You can jump in and check out the events, service status and such for each role and server you wish without having to jump through hoops.  Another +10 for Microsoft.

* * *


# Time for a rest

Time as always eludes me so I must off, will put up part 2 when I get another free moment, for now I leave you with one partying gift:

[![image](/assets/img/wordpress/2013/04/image17.png "image")](/assets/img/wordpress/2013/04/image18.png)

Yes the Modern desktop interface does make an appearance in Server 2012 but it seems the “Boot to Desktop” feature has already shown it is face ![Open-mouthed smile](/assets/img/wordpress/2013/04/wlEmoticon-openmouthedsmile2.png)

