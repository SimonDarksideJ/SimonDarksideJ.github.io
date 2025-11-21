---
layout: post
title: Augmented Reality with Kinect - A Review
date: 2013-09-16 14:07:06
tags: [book review,kinect]
---

Book review season is back again, this time with a title that opens up your eyes to Microsoft’s wondrous sensor, the Kinect.

[![ src=]()](http://www.packtpub.com/augmented-reality-with-microsoft-kinect/book)

 


##### [Augmented Reality with Kinect](http://www.packtpub.com/augmented-reality-with-microsoft-kinect/book)

Definitely a Kinect for beginner’s book, here we have an Author who really knows how to lay out complex information is to short and readable parts, broken down so that anyone (even my daughter) can understand.

* * *

![src=]()

Since its release the Kinect has fascinated me, it drew to the forefront the idea of a fully realised non connective user interface experience.  Nintendo started the ball rolling with their WiiMotes and nunchucks but you still had to find and put batteries in the things to get it going, with the Kinect all you needed was your body (and a suitably large room to dance in)

The author has chosen a more direct route with this book, instead of just picking and choosing features you are walked through creating an actual game using the Kinect from start to finish which is a very nice touch / approach.

 

With the XboxOne coming on the scene soon and the news that it will be opened up to all devs to work on (no need for special dev units) this book is a great preparation book, especially since the new Kinect (Kinect two??) is far superior to the original with even finer detail available to the sensor and (thank god) a large room is no longer needed, as it can handle more players in a much smaller space (no need for a specialised dance hall to play it in anymore)

* * *

![src=]()

Here is a brief run through what all the chapters are and what to expect from them.  Since you are building a game with this book the chapters are a little more pragmatic, showing you how and what to use when you need it, as follows:


###### Chapter 1 “Getting Started with Kinect”

Starting from the beginning (how fresh ![Open-mouthed smile](/assets/img/wordpress/2013/09/wlEmoticon-openmouthedsmile1.png)) you are walked through the history of the Kinect and how to get your development set up (the right way) for Kinect development, in a nice touch the authors shows you how to test your machine as well using the Kinect SDK to ensure it is working properly and your test environment is working effectively (so you do not spend hours only to find out the cat left a paw print on the depth sensor ![Smile with tongue out](/assets/img/wordpress/2013/09/wlEmoticon-smilewithtongueout.png)).

As the premise of the book is about making a game using the Kinect, it is a nice touch towards the end of the chapter to give you a brief rundown of what you will be creating (and even a link to the running project the example is based on that is on the XBOX marketplace already). #Spoiler Alert, it is fruit ninja!!


###### Chapter 2 “Creating Your First Program”

Chapter 2 follows neatly on from setting up your dev environment in Chapter 1 to setting up your new game project, all the frameworks you will need and getting your first scene rendering with integration to the Kinect sensor.  This is a crucial part as it leads to how to understand how to use the sensor effectively and how you will translate the inputs from the device into your game.  Each section is explained clearly and is easy to follow.


###### Chapter 3 “Rendering the Player”

If you ever wanted to see yourself in interesting places without travelling, then this chapter will be for you.  Taking what you have already with your start-up project we start messing around with the different streams and more importantly the correction needed to get those stream working together, one thing that is generally missed when working with these devices is that the streams are generally in different resolutions and just scaling them to match is not enough.  The author takes great care to walk you through each corrective step to get the result you want.

In this case the results is a green screen type of application where you can don your favourite superhero outfit and start flying over a city skyline, thankfully the author chose a nice safe scene with him standing in front of some mountains ![Open-mouthed smile](/assets/img/wordpress/2013/09/wlEmoticon-openmouthedsmile1.png).


###### Chapter 4 “Skeletal Motion and Face Tracking”

Here is where it really starts to get interesting, we have our streams and the raw data from the camera of the device but the Kinect especially has a lot more, it provides skeletal features, arms and joint data but how to make sense of it.

By the end of this chapter you will be able to understand and be ready to use all the body and face type data the Kinect outputs ready for use.  I really like how this chapter is laid out showing you what the data is and how it is perceived not only by the SDK but from the raw data as well, in another nice touch, it details all the different types of data and their masks so you really know what you are working with.


###### Chapter 5 “Designing a Touchable User Interface”

As the final piece to the puzzle for making games with Kinect, this chapter finishes off the theory and demonstration part by building a system to take all the raw information and turn it in to something you can use, such as mouse pointers. With this data you can recognise gestures, movements (from a pointer perspective) and a multi-touch UI manager, all essential for creating our game.


###### Chapter 6 “Implementing the Scene and Game Play”

Finally we take what we have learned and form it in to the game scene, piecing together all the components we have built so far and adding logic plus some texture magic.  Nothing too fancy (else this book would be three times longer) but enough to give you a leg up on creating your own full game using the Kinect.  Again, each part is detailed enough so you know what each portion of the code you are writing does and what it means to your game.  A nice touch is a section where it works out the direction you have sliced your fruit from the data and applying transformations appropriately to split that there dangerous water melon, have-at-thee.


###### Appendix “Where to Go from Here”

As a nice finishing touch to this book there is an appendix crammed full of other info, from open source frameworks and utilities to a giant list of what’s what in the Kinect world (a fair few even I’ve not seen before), even a list of alternate commercial products and frameworks if your budget is a bit bigger. There is even a list of competitive products as well which are based on the same type of interface, such as the Leap motion.

Nice to see an author go the extra mile and put up a sign.

* * *

![src=]()

The premise of this book I find really appealing, instead of just a technical manual you are building something.  It is not as heavy as other books and probably shorter than I might have expected but has a nice quality feel to it with the reader lead through a nice structure and laid out garden instead of just having specific flowers pointed out to you.


###### Pros:

- Full featured explanations of concepts and code to implement them
- Easy to pick up especially if you are new to Kinect (or sensors of this type)
- Green screen effects and how to make them ![Open-mouthed smile](/assets/img/wordpress/2013/09/wlEmoticon-openmouthedsmile1.png) (pants at the ready)


###### Cons:

- Shorter than I would have liked, the game example could be a bit more full featured, as it stands just enough to get you standing up
- Example and code is only in C++, would have liked to see either XNA or MonoGame as alternate implementations
- The author should really have been smiling in the pictures, I feel sad for him. Can someone get this man a hug? (You just wrote a book and got it published after all!!)

* * *

![src=]()

For someone new to Kinect and / or programming this book is a great first step, not to heavy and laid out clearly enough that you will know what you are doing by the end of it.  Certainly a good step up book before reading other more technical books.

My only real criticism of the book is that it is short, at only just over 100 pages it could have been a fair bit more, it leads up to a nice really big finish but then is gone, add more to the game implementation and I would have been more than satisfied, that being said the lead up to the game is excellent and structured very nicely.

 

So as a newbie, jump in and read this and you will know what you need to know but more reading will likely be required in Kinectimatics to get you the rest of the way.

