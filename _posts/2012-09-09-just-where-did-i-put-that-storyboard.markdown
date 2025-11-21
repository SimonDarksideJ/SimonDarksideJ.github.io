---
layout: post
title: Just where did I put that storyboard
date: 2012-09-09 23:06:28
tags: [mvvm, windows phone]
---

One of the cardinal sins ousted round the MVVM circles involves putting any kind of code in your XAML pages code behind, which is all well and good until you actually need to.  When you have implemented MVVM there are always cases where the line gets blurred between functionality and UI behaviour.

[/rant]

One of these tricky situations revolves around the use of storyboards.  Storyboards and animations are purely UI animations and snazzy effects, but what happens when it is your ViewModel wants to make something happen, like “it is game over” or just “you suck” ![Open-mouthed smile](/assets/img/wordpress/2012/09/wlEmoticon-openmouthedsmile2.png), here it gets very tricky.

Now the way most people would to it is to either hook up an event in the code behind or wire in the ViewModel to the view to check for a situation that would cause the storyboard to fire, but there is a better way.

The best way I’ve found is to implement a dependency manager (a middle man) where the XAML storyboards can be registered to and the ViewModel code knows where to go looking, all without either knowing the other is there.

* * *


# The Windows Phone way

I discovered this practice while doing one of my projects, the manager code goes like this:

You can also find this snippet here – [http://bit.ly/PfWqxy](http://bit.ly/PfWqxy "http://bit.ly/PfWqxy")

    
    
        
        
            http://bit.ly/PfXn98
            
            
                
            
            
        
        
    
    

