---
layout: post
title: PCL targets for Mono / MonoGame projects
date: 2013-03-30 21:48:09
tags: [monogame, mono]
---

I will be blogging over the next few weeks about my involvement with the [MonoGame](http://monogame.net/) project in the dark dark backgrounds, all around the area of PCL support within the project.

I have been focusing on two aspects:

 

- Spiting up the MonoGame code base into two parts, the first part containing all code that will work on any platform without modification and the second part containing platform specific code that today is managed with #if statements to target each platform
- Creating a full PCL MonoGame Project which can be used to build games against that will work on any platform without worrying about platform specifics.  (my previous post about portable MonoGame gave an overview on this)

Now in order to use PCL projects in development you must enable your development environment to be able to target Mono platforms.  For Windows based solutions, Visual Studio already enables you to target .NET / Silverlight environments, with the Phone SDK you can also include Windows Phone and with Win8 / VS2012 you get Store app support out of the box.

For Mono platforms such as iOS and Android however you need to enable these manually (at least until Xamarin studio comes out with official support)

 

Note, yes you will need to install either [Mono](http://www.mono-project.com) or [Xamarin Studio](http://xamarin.com/download "Xamarin Studio by Xamarin") to enable Mono platform targeting support

 

Worry not young padawan, this process is very easy!

* * *


# The PCL target files

The first easy part is to create the PCL target files, one for each Mono platform, just open up notepad and create the following files:

 


#### MonoAndroid,Version=v1.6+.xml

    \<?xml version="1.0" encoding="utf-8"?\> \<Framework DisplayName="Mono for Android" Identifier="MonoAndroid" Profile="\*" MinimumVersion="1.6" MaximumVersion="\*" /\>

 


#### MonoTouch,Version=v1.0+ .xml

    \<?xml version="1.0" encoding="utf-8"?\> \<Framework DisplayName="Mono for iOS" Identifier="MonoTouch" Profile="\*" MinimumVersion="1.0" MaximumVersion="\*" /\>

 

Alternatively you can download the files from here – [https://github.com/DDReaper/MonoGame/tree/developcore/PCL%20Targets](https://github.com/DDReaper/MonoGame/tree/developcore/PCL%20Targets)

 

* * *


# Installation

 

Now for the really tricky part, installation, this really challenging and hard to master process needs to be attempted many times before you can become proficient at it.

 

You need to COPY the files into a folder!, try not to be too daunted by this task ![Open-mouthed smile](/assets/img/wordpress/2013/03/wlEmoticon-openmouthedsmile1.png)

 

Take the above files you have created and copy them to the following folder

 


### x64 development machine

    C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETPortable\v4.0\Profile\Profile2\SupportedFrameworks

 


### x32 development machine

    C:\Program Files\Reference Assemblies\Microsoft\Framework\.NETPortable\v4.0\Profile\Profile2\SupportedFrameworks

 

Now on some machines / environments you might also need to put the files into an additional / alternative folder.  The reason being the profile that is used by PCL projects on your development machine, I am sure there is a perfectly good reason for this yet the answer eludes me, so if the above does not work then you need to copy the files into the folder for profile 104 instead of 2, as follows:

 


### x64 development machine

    C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETPortable\v4.0\Profile\Profile104\SupportedFrameworks

 


### x32 development machine

    C:\Program Files\Reference Assemblies\Microsoft\Framework\.NETPortable\v4.0\Profile\Profile104\SupportedFrameworks

Done

* * *


# You’re ready

 

Now your development environment is setup to work with PCL support for all of Mono / MonoGame’s supported platforms.

 

[![image](/assets/img/wordpress/2013/03/image.png "image")](/assets/img/wordpress/2013/03/image.png)

 


#### \*Note

If you select XBOX360 as an additional framework to support due to it is very restricted nature, you will now be able to enable Mono platforms.  Also it renders the scope of what you can have in a PCL project to next to nothing.  Best advise, keep XBOX projects separate and use “Copy” projects to support that platform.

 

* * *


# Coming up next

I have taken my leave of work for the next few weeks (nice Easter break from work) and plan to re-up my blogging efforts with my activities of late with MonoGame and other projects, this includes:

 

> ![](assets/img/posts/image-not-found.png)    The splitting up of MonoGame  
> ![](assets/img/posts/image-not-found.png)    How-to : Use MonoGame PCL to build games  
> ![](assets/img/posts/image-not-found.png)    A book review of the excellent “Kinect for Windows SDK Programming Guide” by  Abhijit Jana   
> ![](assets/img/posts/image-not-found.png)    The AdRotator V2 roadmap  & progress

 

All that as well as have a play around with the new Unity3D SDK’s for Windows Phone and Windows 8 plus many other personal projects, should be a fun holiday (provided I get permission from the Wife ![Smile with tongue out](/assets/img/wordpress/2013/03/wlEmoticon-smilewithtongueout.png))

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/pcl-targets-for-mono-monogame-projects/) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/pcl-targets-for-mono-monogame-projects/) <script type="text/javascript">var dzone_url = 'http://darkgenesis.zenithmoon.com/pcl-targets-for-mono-monogame-projects/';</script>  
<script type="text/javascript">var dzone_title = 'PCL targets for Mono / MonoGame projects';</script>  
<script type="text/javascript">var dzone_blurb = 'PCL targets for Mono / MonoGame projects';</script>  
<script type="text/javascript">var dzone_style = '2';</script>  
<script language="javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js"></script><script type="text/javascript">var addthis_pub="runxc1";</script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)   <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script> [CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591) 
