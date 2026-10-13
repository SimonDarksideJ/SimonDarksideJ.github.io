---
layout: post
title: Android NDK Game Development Cookbook - A Review
date: 2014-04-23 21:56:32
tags: [book review, android]
---

No matter which platform is your primary target platform for your game in development, it is wise to have an appreciation for how platforms operate.  So even if Android is not your first deployment it is good to get to know how it works as it will help you architect your game properly.

[![Cover of Android NDK Game Development Cookbook from Packt Publishing](https://web.archive.org/web/20140122230720im_/http://dgdsbygo8mp3h.cloudfront.net/sites/default/files/imagecache/productview_larger/7785OS.jpg)](http://www.packtpub.com/android-ndk-game-development-cookbook/book)

## [Android NDK Game Development Cookbook](http://www.packtpub.com/android-ndk-game-development-cookbook/book)

I have read many Android platform books / how-to’s and cookbooks in my time, most are fairly run of the mill describing the odd feature here and there, usually focusing on the latest build at the time.  This usually left me wanting more or set me on a path to go and delve deeper.  Perhaps this is the aim of most of these kinds of titles, however this latest book by Sergey Kosarevsky and Viktor Latypov had a few surprises in store.  Let’s uncover this book and get in to it.

* * *

Unlike other Android cookbooks which just focus on the mechanics of Android and its many flavours, this book focuses on the main concepts required for game development such as Input, File Systems, Graphics including web technologies.  There is a twist however, maybe it is because there are twice as many authors as usual, or maybe these guys actually sat down and thought about how to do things differently, whatever the thought processes they used they certainly gave me food for thought.

Unlike other titles, the authors have tackled one of the biggest issues in the Android domain, that of how to build your project once and get it running on all flavours of Android out there. Granted this is not a silver bullet but it starts you thinking about HOW to build your game not just what to do to get on with the code.

I have done a lot of work in the past building or architecting the multi-platform story, getting a project to run on many platforms such as iOS, Android, Windows Phone, etc.  Here though the guys have turned this focus inwards and at each step walk through not only how to use a feature but how to use and design its use properly so that cross-platform impacts across the Android estate are minimised. It is more work than just building a game with Android but the big advantage is that it will run on more Android platforms, not just the latest, increasing your games population and adoption rates which will obviously have a knock on impact on how much revenue you can collect.  Food for thought.

So let’s break down what this book has to offer above the competition.

* * *

Here is a brief run through what all the chapters are and what to expect from them:

### Chapter 1 “Establishing a Build Environment”

Starting with the basics, this chapter gets you up and running whether you are developing your game from Windows or Linux (a nice touch).  Here the authors lead you through getting the Android SDK and NDK environments setup and running.  You will also be walked through setting your first little program.

What sets this title aside is that it goes beyond just a simple program and deploying it, it also walks you through combining many applications into a single deliverable for several Android platforms / versions, tackling the cross platform / multi-platform issues we face within Android itself.

#### Chapter 2 “Porting Common Libraries”

No development these days stands purely on its own, in order to deliver something within an acceptable timeframe you need supporting libraries to quickly and efficiently expand the capabilities of your app/game.  With Android being opensource itself there are a multitude of different options for just about everything.  This chapter covers a selection of the main libraries you will likely end up using for graphics, physics, web and others, plus it walks you through how to natively compile them to get the best performance.

##### Chapter 3 “Networking”

Working with networking on Android can be tough, here the authors lead you through the garden on how to efficiently build a networking solution using libcurl and connect to several major online social networks as examples.

What really surprised me in this chapter was that it even went so far as to show you how to self-host a mini webserver within your project so that you can monitor the app's health and even update it effectively.

###### Chapter 4 “Organizing a Virtual Filesystem”

File handling on Android is a bit of a black art, not only are there several ways to access files across the many versions of Android that there are, they are also compressed even after installing them on a device to save space, every run of the application requires you to decompress and load them each run.  The authors have done a nice job showcasing a simple way of building a simple system that will work on several Android versions continuing the cross platform flow and extend the asynchronous systems built up in previous chapters to apply them to the file system.

###### Chapter 5 “Cross-platform Audio Streaming”

Stepping back in to more familiar territory, this chapter covers the Android audio system and leveraging OpenAL to read and play audio files.   Here we get an overview of using ogg files and streaming them.  What is good is that the authors explain in quite technical detail what goes on under the hood with the audio framework on Android.

###### Chapter 6 “Unifying OpenGL ES 3 and OpenGL 3”

The world of graphics is an ever evolving system, sometimes changing rapidly between different releases and Android does suffer from this a lot.  The more modern versions of Android use a mixture of OpenGL 3 and ES 2 to provide a rich but sometimes tricky state of affair.

Using more cross platform techniques the book walks you through each system to the point where you will be rendering geometry and tweaking the performance to get the best out of even the smallest device. OpenGL 3 is also what is used on Windows platforms so lessons learned here are quickly reusable.

###### Chapter 7 “Cross-platform UI and Input System”

Without some form of input, most games would be a very boring, however trying to handle all the different types of input available on each system is a tricky thing to achieve. This chapter walks you through building a cross platform UI and input system using touch and gesture based interfaces, plus building on screen joypads for additional control.  Following the UI theme the chapter then also walks into fonts and text with a few neat tricks for handling localisation.

###### Chapter 8 “Writing a Match-3 Game”

With the theory over, the book ups its pace to walk you through the first of the two example games you will be building. Starting easy first with a nice match three game.  This brings together a lot of the tips and tricks learned so far to create a simple game that will work on most variants of Android including a multi-touch input system.

###### Chapter 9 “Writing a Picture Puzzle Game”

For the second game example the authors have opted for an online style picture puzzle game, taking pictures from the web and integrating them into the game.  It is a nice touch extending this way and reaching out beyond the device.  It also goes beyond the single screen to build a more complete game system.

* * *

When I first was asked to review this book I thought “Yet another Android book” but I was pleasantly surprised by the level of technical background included within its pages.  The authors have gone to great lengths to not only explain how the code they have built works but how it is handled by the underlying systems on Android.  It also features something I have not seen in an Android title before, focusing on ways to handle and beat the diversity that Android suffers from with its many versions, platforms and operator differentials by building your titles in a cross-platform manner even though we are only talking Android.

###### Pros ![Smile with tongue out](/assets/img/emoticons/smilewithtongueout-3.png)

- High level of technical detail
- High degree of focus on the cross-platform story within Android itself
- Builds examples that make very good use of the features explained within its pages

###### Cons:

- Although covering cross-platform very well I would have liked to see more of a multi-platform story to close the gap as well (a bit of a stretch)
- Chapter 1 quickly runs through the deployment story with Android but I would have liked to see more focus on what it takes to ship an Android title
- It is in C++ ![Confused smile](/assets/img/emoticons/confusedsmile-2.png) (but in a good way)

* * *

As Android titles go this book certainly ups its game tackling and not avoiding the diverse nature of Android, it helps you focus on maximising your target audience instead of just building for one version.  It adds in the online elements and leans heavily on some very good opensource frameworks and components to ease your development burden.
