---
layout: post
title: Windows 8 License Checker / tester / thingy
date: '2012-09-12 14:43:52'
tags:
- tutorials-resources
- windows-8
- winrt
---

There are probably a lot of people I could blame for me writing this article but at the end of the day it is my own damn fault for trying.

It goes like this, [AdDuplex](https://www.adduplex.com/) have an [offer on for Early release apps into the store](http://blog.adduplex.com/2012/07/adduplex-for-windows-8-is-here.html) but I only found out about it after my title was published to the Store, so during my lunch at work I had a go at implementing the new [AdDuplex](https://www.adduplex.com/) Windows 8 control into my app and it was easy as pie (some might say too easy!).  Then came the problem of hooking it up to the trial information provided by the Windows 8 API, which is easy enough if you have everything in one project, I don’t and so began the tale.

My annoyance is that i should have waited, I knew better and just hoping my boss was not looking over my shoulder to see if I was actually working, but as I like to share I’ll throw this out quick before he notices #checksovershoulder

* * *

# The License Helper Class

Now I only created this because it was taking too long to just throw the MS code in and actually make it work with databinding, so this is fully standalone and works nicely.

Code also available on CodePaste.net – [http://bit.ly/U7zTRU](http://bit.ly/U7zTRU "http://bit.ly/U7zTRU")

    AdDuplex Ad control.
    
    First create a resource entry in your App.XAML, to do this add the namespace for the helper (which is why this helper has its own namespace)
    
    
    
    
        
        
            
            
                
                
                    
                
                 (if you are also using this for [AdDuplex](https://www.adduplex.com/) then be sure to add the correct namespace for the [AdDuplex](https://www.adduplex.com/) control)
                
                And that is it.  What is basically happening is that when you load the page it tests the Trial State and updates the flag accordingly, if the Trial state changes (by purchasing it) the local flag changes and the visibility is then updated in the control.
                
                
                
                What I like about this second part is that to put it in any app is even less effort than before but as stated it is not exclusive so you can use it from code as well for testing the Trial state.
                
                
                * * *
                
                # Testing
                
                
                If you also want to test the Trial state you can, there’s an additional little method you can call at any time that will simulate a purchase, just call:
                
                
                
                
                    
                
                
            
            
        
        
    
    
    

