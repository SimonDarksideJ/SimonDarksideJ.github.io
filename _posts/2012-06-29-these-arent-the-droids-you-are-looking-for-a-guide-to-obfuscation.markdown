---
layout: post
title: These are not the Droids you are looking for - A guide to obfuscation
date: '2012-06-29 22:19:23'
tags:
- tutorials-resources
- windows-phone
---

![](http://i105.photobucket.com/albums/m221/Bootsign/obfuscation.jpg)

If you are keen to protect your code and your assets Obfuscation is a word you should learn, no matter if you are doing Silverlight or XNA Projects.  Obfuscation is a technique to make it hard for people to break open your compiled code and copy all your hard work, it does this by wrapping your project in another layer that only exposes just enough to make the project runnable.

Now you may ask why you would need to do this with Windows Phone 7, since it is a secure area which in order to develop for you need to go through several security checks and procedures, such as:

- To test / deploy on a device, you need a market place account (ignoring any custom unlock tools out there), which does not give you access to anything else on the device.
- To get a marketplace account you need to be verified by Veritrust (everything bar a strip and cavity search)
- When you publish your project, it is sent off to Microsoft’s secure site in the App Hub using your Live ID
- On the phone your application is sandboxed, meaning your app cannot talk to or use other applications data on the phone 

So with all this security, you might wonder why you need to do this.  Well even with all this security in place, apparently all the compiled XAP files (which are just zip files) are stored on a public access server which does not require authentication to view and access.  You might very well ask why MS has done this but apparently it is by design? (No further answers to that, so hay ho)

So the answer is to be as protective as possible and use the tools we have access to at the moment through a company called [PreEmptive Solutions](http://www.preemptive.com/) who make “Dotfuscator”.  This comes in two flavours community and professional, where the professional version is currently free specifically for Windows Phone 7 projects and even includes a trial of their monitoring suite which can be used to track usage of your application and even track errors online.

* * *

# Getting started

![](http://microstockinsider.com/files/imceimages/getting_started_at_microstock.jpg)

Now the process for getting this done is quite simple, once you get it right.  If you watch the videos online about the process, it is as simple as point it at your build and click run (you might as what is the need for a guide then?), however, in reality there are a few things that will trip you up.

So first off go to the [PreEmptive site](http://www.preemptive.com/know-more/windows-phone-7) and register for the Windows Phone 7 DotFuscator version, for which you will eventually get an email with a download link and a serial number.

First thing to look out for (in case you already had a copy of Dotfuscator) is the version, for Windows Phone versions you need at least **Version 4.9.2500.** Anything less than this and your Obfuscated projects will not compile and yo uwill get various build errors.

Once you have got everything installed and running and you have entered your serial number, you will need to start a new project.  Next thing to watch out for is when you create a new project, you cannot just do “New Project” in the tool, you have to use a template (Reason for this is that there are some references you need to add and it is simpler to use the template).

Just download the [Windows Phone 7 Template](http://files.preemptive.com/WP7/wp7app.template.xml) from here and save it somewhere in your project then use it when starting the tool, remove the existing input from the view and add the path to your “RELEASE” projects directory (DO NOT DO THIS WITH YOUR DEBUG BUILDS!!)

Lastly, there is one other little kicker, unless you have added in some instrumentation in your project then you need to turn it off in the Dotfuscator project settings, just click on the settings tab (as shown below) and set Instrumentation to NO

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7455.image_5F00_thumb_5F00_69783CA4.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6378.image_5F00_50F8C521.png)

* * *

# What is done is done

# ![](http://cache.gawker.com/assets/images/kotaku/2009/06/2009.jpg)

 

So breaking it down, just follow the steps:

> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Download and install the tools (**Version 4.9.2500 or higher)**   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Download the [WP7 template](http://files.preemptive.com/WP7/wp7app.template.xml) and save it in your project directory   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Load the WP7 template and add your project **(ONLY THE RELEASE version)**   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Turn off the instrumentation   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Run / Build the project (green arrow in the menu) – Make sure you have down a clean build in VS before this as RELEASE

With that done you should have a new folder in your project directory called “Dotfuscated” which will contain your new protected XAP file.  Test it again on a device just to be sure before uploading to the marketplace (so long as it is a paid app this will always be free, if it is a FREE app then you will use up one of your free submissions)

Just to note that PreEmptive do also offer a “[Getting started](http://files.preemptive.com/WP7/WP7%20Runtime%20Intelligence%20Instrumentation%20-%20Quick%20Start%20Guide.docx)” guide, which is pretty good, so worth a read, but will show you more features than you really need just to protect your code.

* * *

# Insert suitable legal comment here

![](http://www.amiodaronetoxicity.com/wp-content/uploads/2010/08/AMCULT-JUSTICE-GAVEL.jpg)

Now I will point out one thing which is obvious to others who have used Obfuscation or have decompiled aps in the past.  Obfuscation is only a way to make your code harder to read, but it is by no means perfect, if a hacker or persistent individual is determined enough they will be able to find a way to crack open your wares and see what is going on.

By using Obfuscation, you are just making it harder and more effort than other unprotected versions.  Since this process only takes a few minutes after a build as a final “Go Live” shipping process, so it is well worth it.

Make use of the instrumentation features if you wish and have a play with them, but the FREE period ends in March 2011 so from then you will have to pay for it.

Enjoy, stay safe and have fun out there with your WP7 projects.

Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[windows phone development](http://technorati.com/tags/windows+phone+development),[obfuscation](http://technorati.com/tags/obfuscation)
