---
layout: post
title: WCF on the Windows Phone 7 - The How to Guide
date: 2012-06-29 21:06:53
tags: [windows phone, networking]
---

Well at the behest of [Michael B McLaughlin](http://geekswithblogs.net/mikebmcl/Default) ([@MikeBMCL](http://twitter.com/mikebmcl) on Twitter), Here’s a run down of what you need to know to get WCF working on the Windows Phone 7, both for Silverlight and XNA.  this is just going to be a brief overview and the full detail will be included in the LeaderBoard sample for Silverlight and XNA coming soon.

Many thanks to [@MikeBMCL](http://twitter.com/mikebmcl) pointing me to this [post by Michael Cummings](http://geekswithblogs.net/Mathoms/archive/2010/06/17/using-web-services-from-an-xna-4.0-wp7-game) who details one approach to getting WCF working for XNA.  It does work, but it is a long way round.  It did however point me in the right direction to solve the problem and now I have got WCF working the way I Like it.  As in Working.


## \*\*Update

Thanks to  [Michael B McLaughlin](http://geekswithblogs.net/mikebmcl/Default), a way has been found to get this working without any of the above hacks.  Read the [full details here](http://geekswithblogs.net/mikebmcl/archive/2010/08/30/wcf-and-xna-on-wp7-ndash-hack-free)

P.S. little or no sample code for now, this is a rush job after all!, if you have questions please either comment or drop me a line and I’ll be happy to help.

P.P.S Sample code can be found on [Codeplex here](http://startrooper2dxna.codeplex.com/releases/view/51124), I started to feel bad about not giving a sample so I knocked a rough one up here.  It is pointing to the test Dark Omen Games Leaderboard on XNA-UK, so it should work fine (unless you are behind a proxy ![Vampire bat](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/4718.wlEmoticonvampirebat_5F00_3507D07E.png)).  When it is working you should get output in the debug window stating “Invalid Auth Credentials” back from the service.  that is all (well I did day it was rough)

* * *


### WCF – What you need to know

First off in case you were not aware, WCF on the Windows Phone device is Asynchronous only, meaning you fire off a request and need to capture the response (usually by capturing the Completed event from the service) when it eventually gets back, for more detail check the [MSDN article](http://msdn.microsoft.com/en-us/magazine/cc163537) here.  This is opposed to the traditional synchronous operations normally used (or not normally who knows), where the same channel you request the data it is received back through.

Now I’m not going to go in to the ins and out of how to write a WCF service and write WCF methods, [Rob Jacobs](http://blogs.msdn.com/b/rjacobs/) does a far better job than I so ask him.

* * *


### WCF – The options

So here’s a breakdown of what you need to know and do:

> #### _![](assets/img/posts/image-not-found.png)    WCF service in a single Silverlight project_
> 
> This works straight out of the box, just add a service reference to your WCF service in the project, add in your asynch calls and delegate events and you are cooking.
> 
>  
> 
> #### _![](assets/img/posts/image-not-found.png)    WCF service in a single XNA project_

> The only way to do this is using [Mike Cummings method](http://geekswithblogs.net/Mathoms/archive/2010/06/17/using-web-services-from-an-xna-4.0-wp7-game).  Personally I would use the last option below for XNA, but that is just me. If it has to be one project then Mikes post is the way to go.
> 
> ## \*\*Update
> 
> Thanks to  [Michael B McLaughlin](http://geekswithblogs.net/mikebmcl/Default), a way has been found to get this working without any of the above hacks.  Read the [full details here](http://geekswithblogs.net/mikebmcl/archive/2010/08/30/wcf-and-xna-on-wp7-ndash-hack-free)
> 
> #### _![](assets/img/posts/image-not-found.png)    A WCF Service Silverlight Library and a Silverlight project **(in the Sample)**_
> 
> A little more tricky here and you would think it would work straight out of the Box, but it does not.  but fear not, getting it working is as easy as copying one file.  becuase that is all it involves.
> 
> Simply Add a Silverlight Library project to your Silverlight Phone project as normal.  Do your normal steps of adding your service reference and Asych calls plus delegates.  Build the project (which will show as successful ![Winking smile](/assets/img/wordpress/2012/06/wlEmoticon-winkingsmile2.png), misleading there).  Reference your library from your main project and call plus handle the return events in the way you wish (could use delegates or just expose the return values with a little handling).  now if you run the project now it will happily launch and then crash silently, your app none the wiser and no data will be returned.  If you look in the Debug view you should see some exceptions logged against “System.ServiceModel.dll”.
> 
> The crash is caused by WCF not knowing what the hell you are talking about because the “ServiceReferences.ClientConfig” is missing.  Except it is not missing it is there in my Silverlight Library.  (Thanks to Mike Cummings for that tip).  Fixing this is easy because it is the MAIN project that is complaining about the config file being missing and not the library (this could be another bug but we can work around it for now), so the easy fix for now is this:
> 
> > ![](assets/img/posts/image-not-found.png)    Copy the “ServiceReferences.ClientConfig” file from your library project in to your main project.   
> > ![](assets/img/posts/image-not-found.png)    The other thing you have to do is a little magic, change/set the build type of the config file to “Content” in the main project and set the “Copy to output folder” option to “Copy if newer” (these are in the properties for the file in VS)
> 
> Fire it up and everything will work fine now.!!
> 
> **Remember though, if you regenerate your service or change it is endpoint top copy this file over again or it wo not change.**
> 
> #### ![](assets/img/posts/image-not-found.png)    _A WCF Service Silverlight Library and an XNA project **(In the Sample)**_
> 
> Now this I feel is the better way to add Service references and WCF to your XNA project, main reason is because I can use the same WCF Silverlight library in both my projects so I only have to write the service code once (when you have decided how to handle the returning data).
> 
> This is now VERY easy with one exception.  Like above, you need to set/change the properties for the service configuration file, but this time you have to do it in the library itself (do not worry this will still work for Silverlight projects that use the same library) and that is it, you do not even need to copy the configuration file over, it is all contained in the library.
> 
> How easy is that.  Well it would have been easier to know that weeks ago when I was banging my head against a paper mashie wall (because bricks are to hard) trying to get this working the first 17 times.
> 
> ## \*\*Update
> 
> Will update this sample with @MikeBMCL’s update when I get the time.

* * *


### WCF natively in XNA

As for creating a service reference natively in XNA or an XNA library, forget it.  At least for the BETA, it does not work.  Adding WCF services tries to create synchronous services (which is a No No) and causes all sorts of referencing errors.  Even with the tricks above, XNA cannot do it alone, it needs the support of Silverlight to either host or generate the service code.

Even when you force it to create Asynchronous proxy code, it still does it wrong.

Maybe this will change going forward (if it is a bug) or they will remove service references all together (still a possibility) if WCF is not going to be natively supported in XNA.  Time will tell.


## \*\*Update

Thanks to  [Michael B McLaughlin](http://geekswithblogs.net/mikebmcl/Default), a way has been found to get this working without any of the above hacks.  Read the [full details here](http://geekswithblogs.net/mikebmcl/archive/2010/08/30/wcf-and-xna-on-wp7-ndash-hack-free)

Also Microsoft has released a statement to state that adding service references in the Full release will work.  Roll on Sep 16th

* * *


### Conclusion

Right, now that I’ve distracted myself for long enough to write this post, I’m back to finishing up the leaderboard sample (thankfully back to being both XNA and Silverlight again now, thanks again Mike)

Somewhere in all this I need to finish my Launch title (if it ever gets finished at this rate), I must really stop looking into more shiny stuff, I am a real Magpie after all.

And just for that SPAM! – [http://www.youtube.com/watch?v=g8huXkSaL7o](http://www.youtube.com/watch?v=g8huXkSaL7o)

Technorati Tags: [wp7dev](http://technorati.com/tags/wp7dev),[windows phone development](http://technorati.com/tags/windows+phone+development),[xna](http://technorati.com/tags/xna),[wcf](http://technorati.com/tags/wcf)
