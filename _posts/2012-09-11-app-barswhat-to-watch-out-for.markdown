---
layout: post
title: App Bars - What to watch out for
date: 2012-09-11 10:39:56
tags: [windows 8]
---

Quickly following up from my “[Snapped View](http://bit.ly/QCeDr6)” article there was another little caveat I wanted to add, but it also deserved it’ own little post.

AppBars are Windows 8 version of the good old Application Bar in WP7, similar name just a whole load of more functionality and not as many constraints as WP7 had.

Adding AppBar’s is also very quick and painless as they are basically just Grid’s with all the same layout features you’d expect.

Not going to re-itterate over what are already good docs on the subject so you can check out the MSDN article on it and the AppBar sample provided by Microsoft:

-  [AppBar Class on MSDN](http://bit.ly/QCiCnB)
-  [XAML AppBar control sample](http://bit.ly/QgDvR1)

* * *


# So why all the fuss

Anyone who knows me know I do not do puff articles that re-iterate what is already documented quite clearly in the manufacturer documentation, so why the post?

Well there are a few other little pieces i found while doing my app that I found useful and had to pass on.

**\*Note**

In the App Labs it was made clear on the correct use of AppBar’s which is not exactly shouted about in the documentation or guidelines but if not followed can be a short trip to “rejectedVille”.

The **Bottom** AppBar is for actions or commands and must also contain a “HOME” button to leave the page.

The **Top** AppBar is for navigation or states ONLY, if in doubt do not do a Top AppBar just to be safe.  If in doubt look at other MS apps using the top bar and follow that.  I used it for changing players in game which was only allowed because it was a GAME, but it is a fine line.

* * *


# The Standard Styles

It is not made quite clear but there are literally hundreds (well more like tens but were going for sensationalism here ![Open-mouthed smile](/assets/img/wordpress/2012/09/wlEmoticon-openmouthedsmile3.png)) of icons provided out of the box that do not even need assets to make them work, these are maintained in the “StandardStyles.XAML” resource dictionary provided by the boilerplate code (if you do not have it see the info on my [last post](http://bit.ly/QCeDr6)).

What is strange is that MS has kept it is head on performance and Commented out ALL of these buttons so that only the ones you need are used, for example:

    thenounproject.com and the [Metro Studio app from Syncfusion](http://www.syncfusion.com/downloads/metrostudio) then I’d use the following article to convert those SVG icons in to Path data to be used by Blend:
    #### [http://uxpassion.com/blog/tutorials/how-to-convert-svg-to-xaml-and-use-it-in-silverlight-or-wpf](http://uxpassion.com/blog/tutorials/how-to-convert-svg-to-xaml-and-use-it-in-silverlight-or-wpf)
    
    
    The trick then came to how to use this in Windows 8, which after a lot of searching (and quite a few dead ends) I came across [Tim Heuer’s](http://timheuer.com/blog) great article which spelled it all out.
    
    
    #### [Using vector data for AppBar icons in XAML](http://timheuer.com/blog/archive/2012/09/03/using-vectors-as-appbar-button-icons)
    
    
    in short you create another base style (similar to the AppBarButtonStyle ) thus:
    
    
    
    
        
        
            
            
                
            
            ) is a bit convoluted but it just works, you have to destroy the AppBar in code, but you make a backup first so you can bring it back, simple.
            
            So create a holding variable for each AppBar thus:
            
            
            
            
                
                
                    
                
                )
                * * *
                
                
                Right I am definitely stopping for today before My boss notices.  But there are still a few more lessons to follow.
                
            
            
            
        
        
    
    
    

