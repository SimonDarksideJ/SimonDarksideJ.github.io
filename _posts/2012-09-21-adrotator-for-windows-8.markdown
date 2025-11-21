---
layout: post
title: AdRotator for Windows 8
date: '2012-09-21 20:47:59'
tags: [windows 8, adrotator]
---

*Note by popular request[here’s a sample](http://bit.ly/PsETzK) (pulled from the AdRotator site) showing AdRotator implemented in a [Windows 8 app](http://bit.ly/PsETzK) with AdDuplex, PubCenter and a local House AD.

As battles go this was certainly one of the strangest.  Windows 8 introduces so many different ways of working, some expected and welcome, some not so.

One of the biggest unexpected challenges is that libraries and packages can no longer distribute User Controls as part of a separate dll or class library, if it is another project in the same solution that is fine but if you want to distribute a control such as [AdRotator](http://wp7adrotator.codeplex.com/) this presents a bit of a problem.

It is not that you can’t it is just that Microsoft has packed up the goal posts and sold them to a foreign investor waving goodbye with a polite smile.  There is a very good reason for this (in MS eyes), Security, by not allowing you to just expose anything and everything outside of a Class library or DLL they ensure YOU do not accidentally leave THEIR (aka your machine) system open to attack or dreaded buffer overrun, in short they are making you stand up and stand accounted for anything you develop and want to put on to other peoples machines, most (including me) do se this as a good move but it is a learning curve.

Ok, well you did not come here for a history / future lesson, you came here for our latest release [AdRotator](http://wp7adrotator.codeplex.com/) for Windows 8.

* * *


# What’s supported in the Windows 8 version of AdRotator

Now these are early day of AdRotator for Windows 8 so bear with us as we get up to par with another platform, out of all the mainline features here’s what we can currently support:

- Ad Provider – [AdDuplex](https://www.adduplex.com/)
- Ad Provider – MS Pubcenter
- Ad Provider – Local House Ads
- Ad Provider – Remote House Ads **\*\*New**
- Local Configuration file support (obviously, wouldn’t work without this)
- Remote Configuration file support
- All of the Caching and fall-back function for providing ads

What is not working yet:

- Sliding Ads are out – may not come back for Win 8, will have to see
- Other Ad Providers, above were supporting those that have native controls but we will add others including Web API Providers
- Remote House Ads – should not be long just need to sort out the Windows 8 equivalent Done

If you have a question / query or request be sure to add them to the main discussion forum on codeplex

* * *


# Getting hold of AdRotator

Now in a change to our scheduled programming you can no longer just download AdRotator (well for Windows 8 anyway), part of the security bits mentioned above mean there are only two methods for getting a redistributable library on to your Dev environment, a Visual Studio VSIX installer (extension to you and me) or NuGet, we opted for number 2.

So getting AdRotator actually becomes easier as does getting updates, for those who have not come across it before NuGet is a library delivery solution now built into Visual Studio 2012 (in 2010 you had to download and install a separate extension to enable it).

Just right click the “References” branch in Visual studio (with your project open!) and select “Manage NuGet packages”

[![image](/assets/img/wordpress/2012/09/image11.png "image")](/assets/img/wordpress/2012/09/image11.png)

This will bring you up the NuGet Package viewer:

[![image](/assets/img/wordpress/2012/09/image12.png "image")](/assets/img/wordpress/2012/09/image12.png)

You’ll see a nice selection of libraries / components and add-on’s for your project but you can look at them in your own time, I’m on the meter here.

So if you search for “AdRotator” in the top right hand search window you will find our happy little project.

[![image](/assets/img/wordpress/2012/09/image13.png "image")](/assets/img/wordpress/2012/09/image13.png)

Note, not all of these libraries are for Windows 8, most are for .NET 4 and Studio 2010 so be sure you read the description before installing a lib, as you can see above searching for us shows one of our competitors the UAC, I would recommend checking them out and seeing what they have to offer, we would prefer you to use AdRotator of course, but as you can see it is for Windows Phone and that won’t work in a Windows 8 project (try it and see what I mean, no biggie you can always uninstall it again with no ill effects).

**\*Note**

If you install a lib from NuGet be sure to use NuGet to uninstall it, if you manually remove the reference manually it won’t break anything but it will get very confusing.

So if you select AdRotator and click “Install” and this will download the package, add a new reference to your solution and you’re done, that simple.

From here it is pretty much exactly the same as the Silverlight version.

* * *


# XML Configuration file

Now we could have shipped a default configuration file with NuGet but we are also just learning the toolset plus I have had some odd experiences with file delivery in the past so we left it out for now.

Just create (or copy) a “defaultAdSettings.xml” config file into your project, the difference with Windows 8 is that you need to set the “CopyTo” action to “Copy Always” or “CopyNewer” to ensure it gets delivered with your project (no Resource build action anymore)

[![image](/assets/img/wordpress/2012/09/image14.png "image")](/assets/img/wordpress/2012/09/image14.png)

And in your XAML configuration below we no longer need to mention namespaces, project folders or anything like that, just supply the name of the Config file you have added.

The format of the file has not changed so either look on the AdRotator site or one of the previous blog posts about it [like this one](http://bit.ly/S5CD4T).

* * *


# Ad Providers

Getting your Ad Providers in is just as easy, AdDuplex also have a NuGet Package, whereas Microsoft have a Windows 8 component which is already delivered as part of Windows 8, just right click References and select the “Extensions” branch and you will see it there.  As this is still V1 you will have to add both references even you are not using the external providers, in V2 this should no longer be necessary.

House Ads are exactly the same, just define a user control in your project and add your content as you see fit, then Assign it to the “DefaultHouseAdBody” property before you call “Invalidate”

Be sure to define a local House ad if you have put it in to your configuration XML, not doing so will have unintended results.

* * *


# Adding the control to your page

As mentioned earlier this part is exactly the same as the Silverlight version of the control, just add the following XAML with your own settings:

    
    
        
    

