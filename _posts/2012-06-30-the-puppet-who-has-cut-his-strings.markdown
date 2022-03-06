---
layout: post
title: The puppet who has cut his strings
date: '2012-06-30 23:35:27'
tags:
- notifications
- tutorials-resources
- windows-phone
---

![](http://blogs.microsoft.co.il/blogs/arik/IMG_20110414_133317_1ED7A8E0.jpg)

For a while now we have had lots of info about the Notification system for Windows Phone 7 and most of that info will tell you there are three parties involved, Your app / The Microsoft Push Notification system / A cloud app/service of your own design.

This last one has been one of the main reasons most apps do not employ this engaging feature of the framework

## However

What this sample shows you (amongst a lot of other things) is how to get around this and actually do Notifications straight from your device to your device.

In my initial explorations into doing push notifications on Windows Phone 7, I came across several hurdles, namely:

- Notifications are not guaranteed
- You have to setup your own backend service, which could end up costing you additional money with the throughput
- Building apps with notifications can cause trouble
- The network stack on the phone was limited 

All of which put me off until I came across an Article by Doug Rathbone on [“The Diary of a Ninja”](http://www.diaryofaninja.com/blog/2011/04/03/windows-phone-7-live-tile-schedules-ndash-executing-instant-live-tile-updates), which showed a different way to create network requests on the phone using Tile Notifications of all things, and so lights and shiney things came to mind to build out the sample here:

In the sample you will find a LOT of stuff (possibly too much but in my mind still not enough ![Open-mouthed smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7357.wlEmoticon_2D00_openmouthedsmile_5F00_283D7E19.png)), examples in the application of:

- @MikeHoles Tile Maker
- MVVMlight
- Reactive networking throughout
- Image upload to ImageShack
- Tile updates via Push and local
- Toast images working both on device and running on the app
- Raw notification example sending and receiving data
- Error safe dev notification (if app crashes next run will show the error)
- Internationalisation, although only one language at present, easily updated by creating culture resx files for UI 

As you can see there is a lot here, the highlights of which are:

* * *

# Notifications from the device

Obviously the main crux of the sample is showing how to do Notification from the device to the Device.  The majority of the code is held in the “InstantLiveTileUpdateHelper.cs” class.

The initial base can from Doug’s post but has been greatly enhanced to make it more re-usable and updated with reactive extensions.

What is ironic in this section is that it shows up some interesting issues with notifications:

- Toasts work as expected but the MSDN documentation still today is wrong and it took me quite a while to piece together several other examples on the web to get it to work, bit when it does, it is very reliable.
- Raw notifications are very basic and work as expected, just do not exceed 1024 bytes
- Tile updates proved to be the hardest, not because of it is function but rather it is reaction from the network, it seems you can only send either a tile (image) or a tile update (text and count) but not both.  Also even with the immediate schedule, it can still take several minutes for the tile to update (this last was very frustrating as it did not look like it was working), tile images are the slowest. 

It is all driven by the “SendtoPhone” function which will read parameters from the View Model and enact the notification.  I have also included the Local Tile update function currently on the device to update the image (and only the image?) on the device, this is more reliable than network tile image updates, so I would recommend using that.  Text and count updates work perfectly which is why you see them in most samples. (however if you send a tile and then the text it will overlay them, but tile sometimes overwrites everything?)

You may get lost a bit looking at the Tile Notification, when an image is provided it goes through several stages in the View model:

1. First it takes the image from the tile maker control and sets the TileImage Property
2. Updating the Tile Image property causes the app to send it to Image Shack
3. When the image is successfully uploaded it will return the HTTP link for the remote image
4. This causes the TileURI property to be updated.
5. When the Tile URI is updated it causes the Tile Notification to be sent with the URI (optionally you can switch this to use the local tile update) 

This just leverages the power of MVVM for maintaining what logic you have in the background, from this I could just set the TileURI to a local path and it would automatically end the notification.

In Mango of course there are a load of additional features to do this locally to save having to do this but the core network code is the same.

The sample is also network aware and will only enable the send button in the App Bar when there is a network and when handshaking with the MPNS service was successful.  You will note (and I added words to the effect) that the handshake is the most flaky part of the system and with dev apps will require you to reboot your phone from time to time for it to work again, it also causes unrecoverable errors when used behind an authenticated network proxy or blocked public wifi (active network with no response).  View\hide the messages the app generates using the menu option in the app bar

\*\*Note

On the Tile Notification pivot page, you can send an image Update by selecting an image (which will only update a tile image) or if you do not select an image the notification will update the Tile Text and Count (a Zero count means no count number on the tile!!)

\*\*Note 2.

If you use Toast notifications in your app you MUST ask the User if they want to, else you will fail certification.

* * *

# MVVMLight

One of the best things I have learnt of late is MVVM, when building UI intensive applications (usually Silverlight) MVVM is invaluable because you separate out all the logic and networking from the UI, leaving the UI to do what it does best and present a beautiful presentation to the user.

The magic happens with Data Binding, but with MVVM it goes that be further giving a fuzzy abstraction layer to the UI for only that which it needs to know about and tells the UI when it updates so it can react.  And by reaction I mean that could be anything from updating a textbox to kicking off an animation or even updating several fields from a single update call.

Really cannot go far enough here to explain all it is benefits, but like Reactive Programming, if you have not played with MVVM yet, then check out Laurent Bugnion’s work with [MVVM Light](http://mvvmlight.codeplex.com/) (one of the easiest MVVM frameworks out there to learn from) and his [Mix 10](http://channel9.msdn.com/Events/MIX/MIX10/EX14) and [Mix 11](http://channel9.msdn.com/Events/MIX/MIX11/OPN03) videos which explain just about everything.

 

In the View Model Folder, there is the “MainViewModel.cs” class, which contains the crus of all logic within the application.

* * *

# Reactive Programming

The other fantastic frame which I have only scratched the surface on myself is RX or Reactive programming.  RX simplifies and asynchronous operation or enables you specify a section of code that needs to run if certain conditions occur in your code.

Simply put, RX is based around observable collections which can collect data from just about anything but mostly events, then based on selection criteria from these events you can subscribe to run your own piece of code.

I show this in action on my “[WP7 and the Web](/2011/04/08/recap-video-for-the-at-amp-t-beginners-web-programming-for-windows-phone-webcast)” session I did with AT&T, but I also recommend visiting (as I always do) [Jessie Liberty’s Blog](http://jesseliberty.com/reactive-extensionsindex/) for loads more info on RX.

You can fine my RX implementations in the Live tile Updated (Standard events) and the Image Uploader (HTTP asynch events)

* * *

# Image Uploading

Now this took some head scratching, but combining the work with Tile Notifications, RX and the samples for Web Uploading, I finally managed to get Image uploading working from the phone. Useful for situations where to want to save images in app.

It currently uses the “ImageShack” API to upload images to freely.  The receiving code is a bit of a Hack as I really should learn “Linq to XML” but my own education bandwidth is currently full ![Smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6303.wlEmoticon_2D00_smile_5F00_6C313C63.png).

Fell free to rip out this section to use in your all, it is all my own work here.

* * *

# Dev error trapping and Internationalisations

A key thing in testing is to know what crashes your app, one of the biggest problems we have when testing on a device is a way to trap those errors and get info back on them.

Most errors will show up in debugging either on the emulator or when the device is tethered but there are situations where you need the device unplugged to perform those tests (or to allow the user to send the error data to you for those fringe cases)

So this app implements this in a basic way (just popping up a messagebox post fail) to show you what crashed your app, this code is in two parts:

- An update to the App.Xaml.CS file to capture and save unhandled exceptions
- A call in the startup page loaded event to display the recorded error 

You can update the second part to ask the user if they want to send it via email or other network call.  Note you must ALWAYS ask the user to send it or fail certification, user must know what is being sent.

As for internationalisation, I’ve followed the standard guidelines for implementing internationalisation, nothing fancy but just good to see this in action.

 

* * *

That is all for now, I may follow up with some more detailed information about each of the implementations, time permitting.

if you have any questions about this sample or post, feel free to comment here or drop a line in the forums.

The download for the sample can be found here – [\<Link\>](http://xna-uk.net/media/p/7908)

 

# References / Thanks

* * *

Jeff Fansler – A great detailed explanation for implementing notifications on the server side

#### [A Really Long Post About the Windows Phone 7 Push Notification System](http://www.thisisfanzoo.com/Blog/JeffF/archive/2010/08/02/a-really-long-post-about-the-windows-phone-7-push)

* * *

@[MikeHole](http://twitter.com/#!/mikehole) and the fantastic Tile Creator, saved me a bunch of time.

[http://wptilemaker.codeplex.com/](http://wptilemaker.codeplex.com/ "http://wptilemaker.codeplex.com/")

* * *

Aiden Caine’s network series for WP7

#### [Better way to check for an network connection on WP7](http://cisforcoder.wordpress.com/2010/11/27/better-way-to-check-for-an-internet-connection-on-wp7/)

* * *

Den Delimarsky @DeninsCode – for his astute work in getting me to understand uploading images to [imagesack](http://code.google.com/p/imageshackapi/wiki/ImageshackAPI)

* * *

* * *

Laurent Bugnion (GalaSoft)  
@LBugnion – For the astounding MVVM Light framework

[http://mvvmlight.codeplex.com/](http://mvvmlight.codeplex.com/)

* * *

Nishant Sivakumar’s interesting adaptation of the application bar enabled for commands

### [Attaching a Command to the WP7 Application Bar](http://www.codeproject.com/KB/windows-phone-7/CommandToAppBarWP7?display=Mobile)

* * *

Additional Phone Libraries – supplied through NuGet

[Shawn Wildermuth’s Phoney Tools](http://phoney.codeplex.com/)

The [Coding4Fun](http://coding4fun.codeplex.com "The Coding4Fun Toolkit on Codeplex") and [Silverlight Toolkits](http://silverlight.codeplex.com/ "The MS Silverlight Toolkit on Codeplex")

* * *

## <font color="#ffc000">And the biggest thanks to</font>

 [Doug Rathbone](http://www.diaryofaninja.com/), without whom this would not have been possible (because I thought it was not and stopped looking)

[http://www.diaryofaninja.com/blog/2011/04/03/windows-phone-7-live-tile-schedules-ndash-executing-instant-live-tile-updates](http://www.diaryofaninja.com/blog/2011/04/03/windows-phone-7-live-tile-schedules-ndash-executing-instant-live-tile-updates)

