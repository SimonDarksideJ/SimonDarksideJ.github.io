---
layout: post
title: Unexpected Debugging with WP7
date: 2012-06-30 23:46:38
tags: [windows phone]
---

![ /></p>
<p>(How one little bug can cause your army of code to come crashing down)</p>
<p>A strange thing happened the other day while I was working on one of my projects (actually it is happened several times in the past but this was one of the few which really vexed me), My app was not behaving.  Now this post mainly talks about Silverlight debugging but bear with me as with the new Silverlight / XNA integration coming in mango, these are good tips to have under your belt.</p>
<p>Now this may sound odd but here is the total sum of what started happening after some fairly minor code changes (basically offsetting the loading of data)</p>
<blockquote><p><img src=](assets/img/posts/image-not-found.png)    Blend Crashed on start-up  
 ![align=](assets/img/posts/image-not-found.png)    VS would not start the app in debug mode either on the emulator or my device (it would start and stop with no errors)  
 ![align=](assets/img/posts/image-not-found.png)    If I looked at the XAML in VS all was well, but if I previewed the page (thankfully not my default), VS crashed  
 ![align=](assets/img/posts/image-not-found.png)    Running the app on my phone worked! ?????

Now this last one is what really flummoxed me (look it up it is really a word), why would the app run (almost) fine on the device itself but cause so many other problems and not even allow me to debug it.  Worst of all VS alone was no help at all because the app obviously crashed but neither the WP7 boiler plate unexpected error code or the VS debugger picked up the fault.

Note the process detailed below can also be used for a variety of things, especially with the lack of error reporting in Blend for Binding issues (where nothing shows up in Blend) and general issues when designing your GUI in Silverlight

* * *


# Up a certain creak and no paddle?

Now hopefully this kind of situation is rare but thankfully there is a backdoor way to solve this problem, one which I learnt from the master of MVVM ([@Lbugnion](http://bit.ly/mLGdSx)) Laurent Bugnion.  The simple trick is to Debug Blend using Visual Studio.

[![image](/assets/img/wordpress/2012/06/image.png "image")](/assets/img/wordpress/2012/06/image.png)

The magic here is to use Visual Studio’s “Attach to Process” feature to hook your debugger on to blend for your current project, which can be found here:

| [![image](/assets/img/wordpress/2012/06/image1.png "image")](/assets/img/wordpress/2012/06/image1.png) |
| 

In Visual Studio – Debug –\> Attach to Process

 |

In order to debug Blend there are a few prerequisites.

> ![align=](assets/img/posts/image-not-found.png)    Blend must be running (if it is not already just right click on your solution in the solution explorer and select “Open in Expression Blend)  
> ![align=](assets/img/posts/image-not-found.png)    Blend and VS must be using the exact same code base (just do a fresh “Rebuild All” and refresh the project in Blend)  
> ![align=](assets/img/posts/image-not-found.png)    The project cannot be running, just make sure you are not debugging the app already

So with Blend running (preferably with no pages open in it), click the “Attach to process” option detailed above and you should see the following window:

| [![image](/assets/img/wordpress/2012/06/image2.png "image")](/assets/img/wordpress/2012/06/image2.png) |
| VS 2010 “Attach to Process” dialog |

Few things to check here, make sure you select the “Blend.exe” process and that the “attach to” option has “Managed Code” selected (should be the default)

From there just hit “Run” in Visual Studio, switch to blend and you are debugging.

* * *


# Not quite the end of the story

Now all the above would be fine if I was debugging the project as normal (testing bindings, interactions in my models) but I had one other little problem here, Blend could not start.

Every time I started Blend it crashed, from this I could only assume which ever page was causing the problem was actually open in Blend and that lovely feature of Blend remembering which pages I had open last time just was not helping in this.

Simple fix to this is to delete the temporary and user files from your project and Blend will start afresh, but to do this you need to have both apps closed.  So close VS and Blend (if they are open already and delete the “.USER” files from your project to reset it. (you can also delete the solution user settings if you are still having problems by removing the “.SUO” files)

* * *


# The end of the road

So here our story ends, feel free to comment or ask questions about the above and hopefully it will help troubled projects out there.

In my case it turned out to be a “Stack Overflow” problem where an MVVM property was self referencing itself and causing it to overload (forgetting to use my private property to test something instead of the public one) #nooberror, lol

Laters

