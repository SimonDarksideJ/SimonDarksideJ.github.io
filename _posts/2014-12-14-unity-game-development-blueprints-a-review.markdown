---
layout: post
title: Unity Game Development Blueprints - A Review
date: 2014-12-14 16:28:22
tags: [book review, unity3d]
---

It is been a mad year and a half for me, one book out ([Mastering Unity 2D Game Development](https://www.packtpub.com/mastering-unity/book)), another book in its final stages, (An almost complete overhaul of book 1 ![Confused smile](/assets/img/wordpress/2014/12/wlEmoticon-confusedsmile.png) thanks to gremlins) and a host of other family activities.  I have just reached a nice break where I found time for some opensource development and catching up on some overdue reading!

[![ width=](assets/img/posts/image-not-found.png)](http://bit.ly/unityblu)


###### [Unity Game Development Blueprints](http://bit.ly/unityblu)

Unity really seems to be the hot topic at the moment with a flurry of new books hitting the market, for beginners it can be hard to know which book to choose to start their journey. Some are aimed at complete beginners whereas others are aimed at the more advanced reader.

Here we see another title enter this area with authors with oodles of experience in game making, let’s see what this exciting new entry has to offer.

* * *

![width=](assets/img/posts/image-not-found.png)

This title from the onset aims to give you the tools and means to create your own games with unity with a few well-built examples, where this title differs from others is that it has limited this to just a couple and goes through then in great detail, breaking down each component needed to build the game.

Additionally the author does a great job walking though the old Unity GUI and then takes it up a notch a few chapters later by switching over to the new Unity UI system (introduced in Unity 4.6).

So let’s break down what this book has to offer above the competition.

* * *

![width=](assets/img/posts/image-not-found.png)

Here is a brief run through what all the chapters are and what to expect from them:


###### Chapter 1 “2D Twin-stick Shooter”

The first chapter starts as well as most titles, checking to see if you have Unity installed and walking you through your first basic project.  What is nice is we start nice and easy with the 2D system and pull together a basic little twin stick shooter with just a couple of assets and some easy to follow scripts.  It is a nice and tidy project with art, music, score text, particles and everything.


###### Chapter 2 “Creating GUIs”

The legacy GUI is what it is and in a fair amount of situations still, it is a wise choice to use for basic functionality.  In this chapter we walk through some of the main features of the old GUI system and add a simple and easy to use menu system to the twin stick shooter game.


###### Chapter 3 “Side-scrolling Platformer”

Taking it up a notch the book switched to a 2D side on platformer set in a 3D world with everything you expect from a platformer including movement and jumping, collectables and more importantly a simple tile based system for creating levels.


###### Chapter 4 “First Person Shooter Part 1 – Creating Exterior Environments”

Heading in to the full 3D world the title switched to its final game template, a first person shooter. Here the author has taken their time splitting the construction of the game over three chapters, each with its own focus.

First we build the overworld, working with terrains, populating it with interesting things to see (If you have watched Stargate, every planet always has the same type of trees ![Open-mouthed smile](/assets/img/wordpress/2014/12/wlEmoticon-openmouthedsmile.png)) from Trees to rivers and roads. Finishing off by adding a player and arming them with a trusty flashlight. Did I not mention it is dark!.


###### Chapter 5 “First Person Shooter Part 2 – Creating Interior Environments”

The outside world is nice but eventually you will want to come in out of the dark (you never know what is lurking in the shadows outside!).  Here we reuse lessons from earlier in the book and build interior rooms with some custom made interior assets fashioned in to prefabs for quick and easy reuse.  You will build up a sample level and then start preparing it for use in the game by baking the lighting with light-mapping (a nice performance trick) and baking it in to the scene. (Baking lights means the lights are fixed and build in to the scene which means you do not have to process lights for the scene, a must with mobile games)


###### Chapter 6 “First Person Shooter Part 3 – Implementing Gameplay and AI”

In the third instalment of the 3D FPS guide, the author walks through building up your input management, using Xbox 360 controllers to control your game and delving in to the area of AI and using state machines in code.  You will add your first enemy and cover such interactions as attacking and damaging the ghosts (yeah I said GHOST!) wandering outside in the wilderness (The interior chapter suddenly feels a lot safer!)


###### Chapter 7 “Creating Save Files in Unity”

Taking a step back from all the games, the book turns its attention towards building save files, creating a level editor for the 2D platformer and using the Unity editor to help us build our levels.


###### Chapter 8 “Finishing Touches”

A nice touch in this title (that so many miss) is that it covers actually building your Unity game for a platform. An even bigger surprise (for you PC fans out there) is that it also covers packaging up your built project into an installer package you can ship to people to install.  If you have ever wondered how that magic “setup.exe” gets your title on your PC, then this is a must read section.


###### Chapter 9 “Creating GUIs Part 2 – Unity’s New GUI System”

Returning to our 3D FPS game, this chapter opens up the world of the new Unity UI system. You will be adding some new 3D UI in the form of a health bar for the Zombies, nicely attached to them in the 3D world, along with some text to show the health values.  Then we switch over to some plan on screen menu UI elements and walk through placing and sizing them on the screen.


###### 


###### 

* * *

![width=](assets/img/posts/image-not-found.png)

This book held a lot of promise for me, with its “BluePrints” title, I expected a lot from it.  The range of subjects covered shows the authors experience with creating so many other games and having chapters broken up in to specific and focused sections is very well thought out.  However this title does suffer from my usual complaint that it shows you how to build a specific project in a certain way by just telling you what to push and click.  There are a lot of tips and notations in the book where further understanding is needed or pointers to other very useful information can be found but a lot of this could have been built in to the text to explain things a bit more.

There is also a question of the level of ability of the reader, the book expects the reader to already be familiar with Unity, I would say you would have to have some fairly in depth knowledge as a lot of Unity concepts are expected to already be understood by the reader (like Coroutines, scripting and asset management to name a few) yet the book starts by walking through how you should setup a project and dropping 2D elements on a scene, almost expecting the reader to be a beginner.

There were main exciting highlights in the title as well, the focus on saving and loading data was great, as was the entire chapter focusing on building for platforms and then even packaging up your project in an installer.


###### Pros:

- Gives your three project templates for three distinct types of games
- Easy to read and follow through step by step
- It has new Unity UI stuff in it!
- First title I have read that covers building an installer to ship your game!, fantastic


###### Cons:

- Just too much do as I do with not much why should I do this.
- Too diverse and not focused enough. A great amount of detail in each section but left you wanting much much more

* * *

![width=](assets/img/posts/image-not-found.png)

I so wanted to like this title and it does have so much to offer but in the end I think the author tried too hard to get so much in to 9 chapters.  It might have been better to drop the first 2 chapters and focus on the Platformer and FPS games to give them more depth.

The GUI / UI sections were at odds with each other as well, given the few chapters there were in the book it might have been better to just focus on the new Unity UI with just a cursory nod to the old GUI (instead of a full chapter).

I did really enjoy chapters 7 and 8 as they open the readers eye’s to more possibilities and showed some unique points not found in other titles of the same mold.

All in all it gives some robust samples and teaches you how to build them for use in your own games.  A good title but could have been so much more.

