---
layout: post
title: AdRotator for Windows Phone XNA
date: 2012-09-18 16:49:58
tags: [windows phone, adrotator]
---

[![Icon_1_purple](/assets/img/wordpress/2012/09/Icon_1_purple-1.png)](/assets/img/wordpress/2012/09/Icon_1_purple-1.png)   [![image](/assets/img/wordpress/2012/09/image10.png "image")](/assets/img/wordpress/2012/09/image10.png)


# AdRotator for Windows Phone XNA     V0.3 release

Hot on the heels of the [Silverlight article](http://bit.ly/S5CD4T) for [AdRotator](http://wp7adrotator.codeplex.com/) is the documentation for the XNA version, to save repeating myself I’d suggest you read that first to get the general look and feel of AdRotator before continuing.  I am only going to go over the XNA implementation parts in this article.

in some ways the XNA implementation is even easier than Silverlight because we don’t have to worry about al the GUI stuff, if you are doing a SilverXNA project (Silverlight / XNA integration) then either route will work fine (or both ![Open-mouthed smile](/assets/img/wordpress/2012/09/wlEmoticon-openmouthedsmile7.png))

* * *


# Basic Nuts and Bolts

Just like with the Silverlight version, go and download all the binaries from the AdRotator codeplex site and copy them to your project, then add the references to the XNA libraries, you will notice there are far fewer of them because most don’t provide a native API so we have had to use the Web API for those.

Once they are in first you have to initialise the control in the normal XNA “initialise” method:

    
    
        
        
            
            
                
                
                    last post were still going to deliver Desktop and XBOX versions of the XNA control (XBOX without web of course just a local Ad, multiple in V2)
                    
                    No XNA in Win 8 yet so that will be XAML or monogame!
                    
                    
                    
                    Again **we recommend** at the very least you put [AdDuplex](https://www.adduplex.com/) in your XML configuration, it is FREE and you get exposure everywhere and is accepted at all major and minor outlets just about everywhere, it is great as a primary or just as the fall back position
                    
                
                
            
            
        
        
    
    

