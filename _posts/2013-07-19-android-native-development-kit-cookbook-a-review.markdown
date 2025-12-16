---
layout: post
title: Android Native Development Kit Cookbook - a review
date: 2013-07-19 15:38:59
tags: [book review, android]
---

Just before I come up for air and start blogging in earnest I received an interesting offer to review another Android book.  if you cast you mind back I did a review of “Android 4: New features for Application Development” ([http://bit.ly/12E5q2u](http://bit.ly/12E5q2u "http://bit.ly/12E5q2u")) which was a good highlight of the new bits, this book takes you back to basics and walks you through setting up, your first app and beyond.

[![1505OT](/assets/img/wordpress/2013/07/1505OT.jpg "1505OT")](http://www.packtpub.com/android-native-development-kit-cookbook/book)

 


### [Android Native Development cookbook](http://www.packtpub.com/android-native-development-kit-cookbook/book)

If you are new to Android development then you will need a good starter book, for example “Android NDK Beginner’s Guide” ([http://bit.ly/12E6Qdn](http://bit.ly/12E6Qdn "http://bit.ly/12E6Qdn"))

If you are interested in learning more about Android development this book will certainly expand your horizons, as this is a cookbook though you will need to know the lingo when it comes to Android development.

* * *

![src=]()

The Android native development is targeted for any serious Android programmer’s reference shelf as a single source of reference for the most common programming issues on the Android platform.

It is certainly not aimed at the absolute beginner as some appreciation and knowledge of the Android platform and basic Java / C++ skills are expected, it delivers a good and well-rounded development guide style reference for programming apps and games on Android.

There is even a good programmer’s reference section showing you how Android treats even the most basic concepts and how to use then effectively.

So long as you have read any of the “dummies” guides you will have enough knowledge for this book to pick you up and get you building effectively AND if you also gain access to the bonus chapters you will even have [Wolfenstien 3D](http://en.wikipedia.org/wiki/Wolfenstein_3D) running on your device in no time ![Open-mouthed smile](/assets/img/wordpress/2013/07/wlEmoticon-openmouthedsmile.png)

* * *

![src=]()

Here is a brief run through what all the chapters are and what to expect from them.   The book is laid out like a traditional cookbook focusing on each specific component and laying it out bare.


### Chapter 1 “Hello NDK”

To really start the book off on the right foot, this chapter walks you through everything you need to get Android development setup on your machine, unlike most Android books it also shows you on a Mac and Linux, not just on Windows.

Gets you up and running with everything you need from the correct Java and Android SDK versions plus setting up Eclipse for your development environment. (If you wished you could use Xamarin studio as an alternative to Eclipse, still free)

The Chapter finishes up with a traditional “Hello World” app just to test you got everything setup and working.


### Chapter 2 “Java Native Interface”

Chapter 2 for all intents and purposes is a good and well-rounded programming reference for building Android apps using JNI (basically Android’s version of .NET), working though basic and advanced samples alike for base programming constants, such as:

- Loading native libraries and registering native methods
- Passing parameters and receiving returns in primitive types
- Manipulating strings, references, classes, objects and arrays in JNI
- Accessing Java static and instance fields an methods in native code
- Caching jfieldID, jmethodID, and reference data to improve performance
- Checking errors and handling exceptions in JNI
- Integrating assembly code in JNI

By the end of this chapter you should have most of what you need to be an efficient programmer on the Android platform


### Chapter 3 “Build and Debug NDK Applications”

Everyone who’s ever touched or used an Android device knows the complexity involved with the different models / capabilities and options in Android development, in this chapter you will be guided through both the how and .what the best practices are when configuring your Android solutions  and build environments.

Remember you are rarely building just one Android app but several, to cope with all the variety that exists.

This chapter also includes the know how to setup your Eclipse environment to do automated build and deployment to either an emulator or a device (obviously if you use Xamarin Studio this is already built in for you)


### Chapter 4 “Android NDK OpenGL ES API”

The graphics system makes an entrance in this chapter going through all the nitty gritty with the 2D / 3D rendering system and a basic overview for using Open GL shaders.   It includes several basic examples to get you started with an appreciation of the area, graphics on most platforms is a very tricky area and this does a good job of explaining the basics well.


### Chapter 5 “Android Native Application API”

Here we start to get really native and work with Android Activities (pages) and working with the various input methods and sensors.  There is also an important section on Assets which is critical since it is different on Android to most other platforms.


### Chapter 6 “Android NDK Multithreading”

One of the biggest pains on any platform is getting the performance and balance of you app or game right and running at a level appropriate to the user, this becomes crucial when you start working with cheaper devices and need to drag every last ounce of what little power that device has.

Multi-threading (or breaking up your app into little chunks of processing) is the solution in many cases, as with everything though there are good ways to do multi-threading and there are bad ways.  This chapter gives a good overview and offers some good practices when it comes to multi-threading


### Chapter 7 “Other Android NDK API”

As a sum up to the programming portion of the book, here the author rounds some of the extra bits built into the standard Android SDK. It does not go in to too much depth (you could probably get an entire book out of each library) but it gives you enough to give you start and a basic appreciation for what each library does.


### Chapter 8 “Porting and Using the Existing Libraries with Android NDK”

In the first of two patterns and practices chapters, this chapter covers re-using existing C++ libraries in your Androids apps which is very useful if you do not want to write huge amounts of code yourself.  There are a vast amount of libraries both free and paid written in native code and harnessing them is crucial in all but the smallest of apps.

The chapter also covers some of the trickier parts of reusing libraries that require exception, RTTI, and STL support.


### Chapter 9 “Porting an Existing Application to Android with NDK”

Following on from the previous focus on re-using existing libraries, this chapter goes through how to take an existing native library and cross compile it for Android and then put a shim UI on it for use, the example is a nice image processing library which looks simple enough to explain all the basic concepts involved.

* * *

[![image](/assets/img/wordpress/2013/07/image.png "image")](/assets/img/wordpress/2013/07/image.png)

Additionally there are 2 bonus chapters which give the book a real feel of polish, both of these are accessible from the PacktPub site with your copy of the book, full details included on how to gain access to them are included in the Preface.


### Bonus Chapter 1 “Developing Multimedia Applications with NDK”

This chapter build a real world app using all of the techniques explained in the book including:

- Porting and using the ffmpeg library to Android with NDK
- Using the ffmpeg library to get media info and decoding / displaying video frames
- Separating decoding and drawing with two threads
- Seeking to playback and grabbing the frames while optimizing the performance of a multimedia app


### Bonus Chapter 2 “Developing Games with NDK”

Bringing back one of my childhood favourites this chapter leads you through downloading the freeware version (and source) to the original Wolfenstein 3D, then porting the entire game to Android including adding Android input / sensor systems and a new on screen input UI.

[![image](/assets/img/wordpress/2013/07/image1.png "image")](/assets/img/wordpress/2013/07/image1.png)

* * *

![src=]()

If you were looking for a reference manual for your shelf for how to build efficient Android apps and it will make a welcome addition, the bonus chapters really make the full picture so it was a shame they were not included in the base book but the fact they are free to anyone who has the book is very nice (get them now).

There is a lot of intro material included in the book including the programming guide but you must have an appreciation for Java / C++ first and read at least an “Android for dummies” style book to learn the basic lingo.


###### Pros:

- Very detailed step by step explanations
- Fully working samples, not just throw away code
- Does not try to overthink it is chapters, give you enough to stand up and walk leaving the running to you
- It helps you to build WOLFENSTEIN 3D !! ![Open-mouthed smile](/assets/img/wordpress/2013/07/wlEmoticon-openmouthedsmile.png)


###### Cons:

- Without the Bonus Sections there is not anything to tie everything together as a whole app, just lots of parts (as a reference book alone this should be expected)
- No detail on managing Android Emulators which is a bit of a gap, emulators can be very tricky to setup correctly (expects devices only)

* * *

![src=]()

I can definitely say I learned a lot of new tips and tricks in this book and it makes a welcome companion to my reference shelf.  On my work with MonoGame this will aid me a great deal with some of the trickier backend performance problems than can be faced in complex 3D games.

The knowledge for how to really make the most out of third party native libraries will also be very handy to make games grow quicker.

All in all I can say I feel a much better Android programmer after reading the [Android Native Development cookbook](http://www.packtpub.com/android-native-development-kit-cookbook/book) and will know where to look when my apps or games just do not work right.

