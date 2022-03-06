---
layout: post
title: Minor Distractions
date: '2012-06-29 11:11:12'
tags:
- 2d
- game-development
- physics
- xna
- xna-2d-tutorials
---

Well it seems this week is full of surprises.

After focusing for so long (and still so more) on the XNA 2D tutorial, I had almost forgot what it is like to have fun, then [Nick Gravelyn](http://blogs.msdn.com/b/nicgrave/) went and blogged about the new [gesture features](http://blogs.msdn.com/b/nicgrave/archive/2010/07/12/touch-gestures-on-windows-phone-7) in the July Beta which set my mind ablaze.

It was that old oft sensation, “That give’s me an idea for a game!!!”.

Now this little article/sample is nothing to do with that idea specifically, it has to do with Physics.  The game idea I had would need physics, and not just what I could cook up, something real, something good and solid.

So my attention leaned towards [Box2D](http://www.box2d.org), or more specifically the XNA C# variant, [Box2D.XNA](http://box2dxna.codeplex.com/).  Could it run on the phone?

* * *

Box2D & BOX2D.XNA

[Box2D](http://www.box2d.org) is an open source 2D physics engine that does pretty much of what you need from a 2D physics engine.

[Box2D.XNA](http://box2dxna.codeplex.com/) is also an open source physics engine based upon Box2D, written in C# and specifically targeting the XBOX360.

Now on the Box2D.XNA site there is a sample project for download along with the core physics library.  It is very complete and shows off a lot of different scenarios (identified as tests in the sample app).

| [![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_12A37AA5.png "image")](http://xna-uk.net/blogs/darkgenesis/image_1A3F0FDF.png) | [![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_7418EE21.png "image")](http://xna-uk.net/blogs/darkgenesis/image_2282999C.png) |
| Dominos test track | Standing / Falling blocks shot down |

Over on [Brandf’s XNA indie game blog](http://blogs.msdn.com/b/brandf/) is another helpful test app using the BOX2D.XNAand [this post details](http://blogs.msdn.com/b/brandf/archive/2010/01/04/adding-2d-physics-to-your-xna-game-studio-game-part-1) how to implement the framework (in a much shorter form than on the BOX2D.XNA site).  Still waiting on part 2 Brandf, would like to see how collisions are done properly.

I also like the style:

| [![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_0F7DA48B.png "image")](http://xna-uk.net/blogs/darkgenesis/image_079627F6.png) | [![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_3D9754AB.png "image")](http://xna-uk.net/blogs/darkgenesis/image_6ABC6746.png) |
| Start | And the world comes falling down |

So I decided to implement BOX2D.XNA on the windows phone and since I lie variety, I have both both sets of test applications and their implementations in to the sample project

* * *

### Getting on to the Phone

Now getting the framework in to GS 4.0 and onto the phone did cause some issues and i’m not going to go on at length about what was involved, safe to say the major changes were:

> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Changing the spritebatch implementation (changing spriteblendmode to blendstate)   
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Changing the Basic effect implementation (see [Shawn’s article here](http://blogs.msdn.com/b/shawnhar/archive/2010/04/22/effect-api-changes-in-xna-game-studio-4-0))   
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Removing the Vertex Declarations (as details in [Shawn’s other post](http://blogs.msdn.com/b/shawnhar/archive/2010/04/19/vertex-data-in-xna-game-studio-4-0))   
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Changing some of the protection levels in the BOX2D.XNA framework (they just work differently, do not know why?)   
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Changed the Input handlers to work with the Phone (touch and [touch gestures](http://blogs.msdn.com/b/nicgrave/archive/2010/07/12/touch-gestures-on-windows-phone-7)) – I really like the new gestures implementation.

With all that done, this is the result:

| [![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_39A93E74.png "image")](http://xna-uk.net/blogs/darkgenesis/image_080E6CB9.png) | [![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_22E6A493.png "image")](http://xna-uk.net/blogs/darkgenesis/image_3A41CED1.png) |
| Brandf’s simple implementation | BOX2D.XNA full test suite |

In Brandf’s demo, just tap anywhere on the screen to start the effect (sorry no restart, was just keeping it very simple)

In the BOX2D.XNA sample, I have implemented gestures, tap to launch a bomb to disrupt things and swipe to move to the next test scenario (35 in total).

 

#### To switch between the two sample apps, just change the two #define options at the beginning of the Game.CS class file.  Un-comment out the one you want to see, do not try and use both at the same time!!

* * *

### Final thoughts and conclusion

All in all this was a very interesting experience and the BOX2D.XNA engine works very well on the Windows Phone 7, obviously remember you are on mobile hardware so do not go overboard, only one of the tests (the  Pyramid test) showed any kind of slowdown, but that is because (as you can see above on on the right) there are a lot of objects and a lot of collisions and calculations taking place that the engine has to cater for and the poor phone just could not keep up.  That being said all the other tests ran smoothly (the bars at the top of the screen show the performance of the engine).

The other thing about the BOX2D.XNA sample if that is uses a custom type of drawing scenario, which in the end I could not get my head around (been out of 3D far to long ![Winking smile](http://xna-uk.net/blogs/darkgenesis/wlEmoticonwinkingsmile_749F70BC.png)), which is why some of the text is hard to read on screen and why it is not using all of the screen.  Feel free to play and tweak.

This was why I was glad to find Brandf’s simpler implementation and also shows how to attach the physics to your sprite drawn objects (provided the physics make up of your object maps).  Make sure you read [Brandf’s blog post](http://blogs.msdn.com/b/brandf/archive/2010/01/04/adding-2d-physics-to-your-xna-game-studio-game-part-1) on how to to consume the BOX2D.XNA engine in you are game.  Gives a good breakdown of how all the physics components fit together.

The [Sample app is on Codeplex as normal](http://startrooper2dxna.codeplex.com/releases/view/48960), but in it is own release this time.

I hope you enjoy playing with it!

Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[windows phone development](http://technorati.com/tags/windows+phone+development),[physics](http://technorati.com/tags/physics)
