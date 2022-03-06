---
layout: post
title: Further Adventures in Unhandled Exception Handling for Win8
date: '2012-09-09 22:46:07'
tags:
- tutorials-resources
- unhandled-exception
- windows-8
- windows8-tutorials
- winrt
---

Following the submission of my first Windows 8 app into the preview store I’m planning on a few quick posts on my experiences and helpful stuff I found/created during my journey.

To kick off (well I say Kick off, but I’ve already posted two of them while I was building the game) this article with extend on an original article I did for XNA / Windows phone

#### [Adventures in Unhandled Exception Handling for XNA/Silverlight](http://darkgenesis.zenithmoon.com/adventures-in-unhandled-exception-handling-for-xnasilverlight/)

Now when I was just about ready to publish to the store and going through the App Excellence labs, one of the certification criteria is to have friendly error handling, with XNA and Windows Phone this is (practically) built in or if you use the excellent Telerik controls you have a very clean component to just drop in.

With Windows 8 there is nothing ready, you have to build it all yourself.

* * *

# Enter my Windows 8 version of Little Watson

Find the code here – [http://bit.ly/PfUANd](http://bit.ly/PfUANd "http://bit.ly/PfUANd")

If you followed my last article on the subject I used a component I found in my travels called “Little Watson” which does all of the grunt work for you, however it wo not work in its current state for Windows 8

To get it working we need several underlying things:

- A way to store the error details to track them, no Isolated storage here
- A way to allow the user to email the error report
- The place in the code to hook on to and handle unhandled exceptions cleanly

Now the first I have through my Win 8 Storage helper I blogged about recently (which I ended up updating and adding some new features), check it out here – [http://darkgenesis.zenithmoon.com/storage-helper-for-windows-8/](http://darkgenesis.zenithmoon.com/storage-helper-for-windows-8/)

For the last, the “Application” component of a Windows 8 app does have an “UnHandledException” error handler but unlike Windows Phone it is not setup by default (very odd but shows how different teams think in building this stuff), so all you do is set it up manually.

As for the email, that provided it is own challenge as THERE IS NO EMAIL API, what we have in the Windows 8 world are “Share Contracts”, you can use the “Protocol detection” and open a link using the “mail://” prefix but that does not let you add your own data.  So this one did cause some head scratching but it is in there.

* * *

The Win8 Little Watson

So here is the code for the component (what your really here for)

    http://bit.ly/PfUANd
    * * *
    
    
    Getting Started
    
    
    
    To use the above component, simply add this as a class to your project along with the Win8 Storage Helper (as its a prerequisite).
    
    
    
    Next bind the UnhandledException event in the App.XAML.cs constructor to your own method using:
    
    
    
    
        
        
            
            
                
            
        
        
    
    
    

