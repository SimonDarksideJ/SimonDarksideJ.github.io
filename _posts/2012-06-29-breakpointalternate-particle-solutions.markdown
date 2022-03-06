---
layout: post
title: Breakpoint - Alternate Particle solutions
date: '2012-06-29 11:07:52'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

I am always on the look out for new ideas and ways forward and what we have implemented so far is only one solution to implementing particle effects.

Robin Debreuil has blogged about another (fantastic looking) approach to doing particle effect using purely mathematical equations and run-time procedural generation (another hobby of mine).  This basically means we don’t use a typical particle storage as we have done so far (using pools to store particles), instead we use random number generation to predict where to draw particles.

Here’s what Robin has to say on it:

 

* * *

 

### [\<Excerpt from Robins Blog\>](http://blog.debreuil.com/?p=62)

![](http://blog.debreuil.com/images/shader01.jpg)

###### [Particle Effects Without Particles](http://blog.debreuil.com/?p=62)

By [robin](http://blog.debreuil.com/?author=1), February 3, 2010 12:14 am

Particle effects are made by taking a lot of small bitmaps and varying their location and attributes over time. The resulting ‘animation’ can look like fire, smoke, or nearly anything else you like.

Normally when coding these you create a small particle class or struct, and it holds things like position, color, direction, acceleration, alpha, scale, etc. These properties change each update which makes them ‘come alive’. You then assemble a bunch of these particles into ‘effects’ or some such thing. To leave a trail, or create blowing smoke, you can drop a series of these effects.

Our approach is similar, but we do not use a particle class. Instead we use a random number between 0 and 1, and an equation. The random number is used to vary an effect, otherwise they can look very symetrical. So for example the alpha can be (255 \* nextRandom()) to have it vary between invisible and visible. To make it also fade in, it can be (255 \* nextRandom \* t). To make it ease out on fading it can be (255 \* nextRandom \* Easing.FadeOutQuad(t, 255, 0)). I think you get the idea.

So instead of particles, there is just a calculation waiting to happen. Not having to deal with individual particle instances or state allows you to do things like change the particle count on the fly (by simply changing the loop size), or reverse time by changing ‘t’.

For anyone who does Flash, I am sure the Easing idea is familiar.[Robert Penner](http://robertpenner.com/)’s easing equations are universally popular, as they allow people to easily add tweening, fading and bouncing from code. I am basing the equations on these, and adding a few non easing ones that are useful for particles (trig functions, weird functions, etc).

Rather than store the random numbers for each particle (which would require a particle class), we store the random seed and regenerate the same sequence of random numbers each update. This may sound slow, but reasonable random number generation can be surprisingly simple and blazingly fast (one billion numbers in 1.8 seconds [on a p4](http://software.intel.com/en-us/articles/fast-random-number-generator-on-the-intel-pentiumr-4-processor/)!). We are using the[FastRandom](http://www.codeproject.com/KB/cs/fastrandom) class by Colin Green which is really fast, and a drop in replacement for System.Random. This allows resetting the random seed without penalty. This is important as we reset the seed every update in order to get the same random number sequence time. It is also easy to extend – we have added saving state, so for example we can start at the 500th random number of a given seed without going through the first 499. Awesome code, I would recommend using it for anything random in your game.

Note this code is available at [http://www.codeplex.com/swf](http://www.codeplex.com/swf) though the particle part has not yet been added (using git locally, so it is a pain).

* * *

There are also some videos showing Robins effects in action, he does talk a bit fast and does not explain some of the finer points but that is not hard to pick up from his code.

 

I will look into maybe implementing this in the WP7 update and compare the performance between the two implementations (although, looking at his code, I suspect that this procedural way for generating effects may be quicker, if the phone can handle it), but first I need to finish up my current set of posts (yes nice and shiny but I’ll put it down for a bit.  oooooh Shiny)

Robin has also created a SWF (flash for the acronym unaware) to XNA importer, which allows you to use Flash assets in XNA games, also including using Box2D for 2D physics, all interesting stuff!!

 

* * *

 

### More from the Trenches

On another note for those of you interested in the maths behind Algorithms and their cost, there is a new training video over on Channel 9.

## [C9 Lectures: Yuri Gurevich – Introduction to Algorithms and Computational Complexity, 1 of n](http://channel9.msdn.com/shows/Going+Deep/C9-Lectures-Algorithms-with-Yuri-Gurevich-Introduction-and-Some-History/)

I have downloaded it for viewing later (only had time to sample some of if at the mo, too much to do still.) but I would recommend checking it out, as it gives a good “easy” (well as easy as maths gets) view of the effects of doing complex operations.

 

* * *

### Back to the series

On another note I meant to set a challenge on the back of the last post.  With all the particle possibilities, have a go at creating you are own effect.  and while you are at it, also try and recreate this:

[![JustForFun](http://xna-uk.net/blogs/darkgenesis/JustForFun_thumb_37EB209E.png "JustForFun")](http://xna-uk.net/blogs/darkgenesis/JustForFun_5A171A56.png)

Technorati Tags: [XNA](http://technorati.com/tags/XNA),[Algorithms](http://technorati.com/tags/Algorithms),[wp7dev](http://technorati.com/tags/wp7dev)
