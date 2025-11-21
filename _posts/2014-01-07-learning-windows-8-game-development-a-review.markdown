---
layout: post
title: Learning Windows 8 Game Development - A Review
date: 2014-01-07 19:40:28
tags: [book review,game development, windows 8]
---

The game development landscape, especially for Indies is certainly changing.  With the recent XBOXOne and PS4 console releases show that skills like C++ are still very much in demand, as a fellow Indie this does concern be greatly.  I left my C++ skills in the past once MDX and then XNA were born and the thoughts of going back does intimidate me somewhat.

[![ src=]()](http://www.packtpub.com/learning-windows-8-game-development/book)


###### [Learning Windows 8 Game Development](http://www.packtpub.com/learning-windows-8-game-development/book)

As the book title suggests, this is a Windows8 title, however what is not immediately apparent is that it is a C++ Windows game development title. Yes you can build games in XAML or even in C# with MonoGame and Unity but to get real under the covers multi-platform and highly performing code you are most likely to start looking into C++, so let’s see what this book gives us.

* * *

![src=]()

The author of this book “[Michael Quandt](http://www.packtpub.com/authors/profiles/michael-quandt)” is actually an old friend of mine back from the days when XNAUK ruled the world of XNA (at least in the UK if not the WORLD, lol), all comrades together in a managed world, then the world ended.

C++ is an essential tool for any serious game developer especially if you want to get a job in a game studio or middle-ware company and newer consoles generally only support C++ as a development language. However this book is primarily aimed at C++ in the Windows 8 world, this means not just learning about DirectX graphics / math and operations but also how to cooperate in a Windows 8 environment (aka WinRT) and make use of all the shiny platform features that Windows 8 has to offer such as Charms, Sharing, Networking and much much more.

If you have also read my [“other” post about XboxOne development](http://darkgenesis.zenithmoon.com/start-building-for-xbox-one-now/ "Start building for XBOX ONE – NOW!!!") you will know that having the knowledge and ability to create C++/DirectX games in Windows 8 will get you 90% of the way there for publishing your own Indie title on the XboxOne ![Open-mouthed smile](/assets/img/wordpress/2014/01/wlEmoticon-openmouthedsmile.png) , so by the end of this book not only will you e building for Windows8 and DirectX but you will have a head start on XboxOne development as well.

**\*Note** , this book is **NOT** a “Learning C++” book, some previous experience for how to program in C++ is required. If you are already experienced in game development you will still be able to follow and pick up some C++ as you go but, to get the full benefit of this title you are better getting some C++ under your belt first.  Personally I like to learn on the job but that is just me ![Open-mouthed smile](/assets/img/wordpress/2014/01/wlEmoticon-openmouthedsmile.png)

* * *

![src=]()

Here is a brief run through what all the chapters are and what to expect from them:


### Chapter 1 “Getting Started with Direct3D”

In the beginning there was a flash of light and in this case the turning on of the lights, this chapter starts at the very beginning of DirectX development and walks you through everything you need to know to start a new DirectX/C++ project up and running using the built-in Visual Studio templates.  It is nicely laid out explaining all the major components of the graphics pipeline and the realisation of the game loop.  Those familiar with previous game development will recognise a lot of the content and easily be able to translate it from what they understand currently but in a C++ light.  There is more to know and understand and this chapter does a very good job at easing you in to the new driving seat.

For newcomers it is just as easy with all the basic elements of game development programming being laid out bare, even the naughty bits.


### Chapter 2 “Drawing 2D Sprites”

A short step from getting your project running is to get something actually drawn to the screen and this next chapter eases you in by walking you through how to get sprites and textures drawn on your new graphics drawing surface.  Nothing to heavy and it is only 2D but it is essential to get these basics down before moving on to harder subjects.

This chapter also introduces you to opensource frameworks such as DirectXTK which make the job of loading, drawing and batching assets in your project.


### Chapter 3 “Adding the Input”

Computer systems always seem to have lots of methods for input these days and the list is ever increasing.  This chapter goes over all the necessary components for getting input systems to work on Windows 8 and how to manage them effectively within your game.  It even covers some of the common tips and tricks to handle tricky situation with input such as deadzones with gamepads.


### Chapter 4 “Adding the Play in the Gameplay”

A framework and input system is all well and good but what about the game itself, here Michael walks you through structuring your game and accounting for things like managing game object, working with collision systems and how to improve on your rendering pipeline to make it even more efficient.  It is always essential, no matter what platform you are building on, to get your game architecture right and performing well so this is a welcome addition to this book.


### Chapter 5 “Tilting the World”

Extending from chapter 3, here the book goes over some of the more advanced input systems available on Windows 8 including the accelerometer, gyroscope, compass and inclinometer (granted so long as your device supports them). These are accessed and operated slightly differently to other input systems, usually because they need to be spun up and managed in a different way.  Although the book doesn’t cover it, you could use the approaches discussed in this chapter for other advanced sensors such as the Kinect.


### Chapter 6 “Bragging Rights”

Here we finish off the game by working with game states and giving the player something to work towards, the end of the game ![Surprised smile](/assets/img/wordpress/2014/01/wlEmoticon-surprisedsmile.png)

Once our game is ready, you really need to consider how your game will look when it is published, working with Windows 8’s live times, how to use the sharing features to publicise your players achievements in game leveraging Windows 8’s native sharing capabilities (Windows 8 really does do a lot for you these days) and how to use WinRT components to short-cut some of the hard work.


### Chapter 7 “Playing Games with Friends”

Playing games by yourself if good but playing with friends is better and Windows 8 offers some unique features to create multi-player experiences especially if they are with you.  This chapter goes into depth on generic network systems and Windows 8’ proximity API (for device to device communications).  Everything you need to get your game hooked up and players going head to head,


### Chapter 8 “Getting into the Store”

once you have your Windows 8 game ready the next step is to get it certified and published to the store., anyone who has been through this knows what a pain it can be.  Thankfully this chapter goes through the whole process of testing and certifying your game for the Windows 8 Store, including the dreaded Game rating certificates and some handy tips and tricks to make the process as smooth as possible.

Having been through this myself several times, this chapter certainly has some eye openers that are so obvious now and will make your submission that much easier.


### Chapter 9 “Monetization”

It is all well and good getting your game on the store but wouldn’t it also be nice to get something back from the whole experience, preferably in the form of good old money.  There are some very good tips for how to sell your game in this chapter, covering adding a trial mode to your game and in-app purchasing options.  This is all rounded off with some well-founded monetisation guidelines on how best to market and sell your wares.


### Appendix “Adding the Third Dimension”

In the appendix, Michael returns to the game itself to walk-through the differences for making 3D games with DirectX including shaders, cameras, 3D models and much much more.   It also introduces the other great opensource project DirectXMath which no 3D DirectX project should be without.

This “last word” as it were, is a nice conclusions to a well-rounded book to put together a whole game on the Windows 8 platform.

* * *

![src=]()

I’ve not done much C++ for over 10 years, I started my programming life in such languages as Cobol, Pascal and Basic before moving on to C and C++, I left this world behind in favour of the much more sane world of managed languages of C#, however since the climate is ever changing this book is a nice steady road back into the land of C++/DirectX game development.  It covers the gaps where such game development has changed over the years but keeps it nice and light on your journey.

This book is best described as a primer to full on C++/DirectX game development to help bridge the gap between the old and the new.  On reading this book I feel more confident about DirectX and C++ game development and I’m ready to start looking into the more complex areas of graphics programming.

you will be able to make basic games but to really be productive you are going to need to look at more specialised DirectX programming books following this read.

So if you want to get started then you will be in good stead here.


#### Pros:

- Great depth but very easy to read and follow chapters
- Complex systems broken down in to very manageable chunks
- Fully end to end, you will be able to make basic games and publish them by the end


#### Cons:

- Only focuses on 2D systems, although there is a 3D section at the end I would have liked to see a chapter or two more on 3D
- Would have liked a few more design principles and perhaps a full games by the end, as it stands you have all the parts but not the whole.

* * *

![src=]()

Even if I wasn’t friends with Michael, I would still recommend this book very highly.  It is well structured and is a brilliant primer to start specialising in C++/DirectX game development.  It is not going to make you a professional game developer overnight but (as this kind of book should) will give you everything you need to decide where you want to go, armed with the knowledge for how the basics all work and leads you on to more advanced topics without overloading you.

If you are serious about getting in to low level game programming and want to know what is involved and whether it is right for you, then this book will set you straight without too much technical wish wash.  You will need to learn at least the basics of C++ programming first but other than that you can start this book at any time.

With consoles opening their doors to any indie developer it is a good time to book up and get ready and as stated before, if you can get a game on Windows 8 you are already primed to hit the XboxOne as well!, what are you waiting for?

