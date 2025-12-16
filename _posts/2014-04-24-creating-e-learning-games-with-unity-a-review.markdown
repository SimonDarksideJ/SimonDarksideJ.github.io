---
layout: post
title: Creating E-Learning Games with Unity - A Review
date: 2014-04-24 17:24:02
tags: [book review, unity3d]
---

Continuing the book review season, here is the second book I have looked at recently, an interesting twist in the series of game development.

[![](assets/img/posts/image-not-found.png)](http://www.packtpub.com/creating-elearning-games-with-unity/book)


###### [Creating E-Learning Games with Unity](http://www.packtpub.com/creating-elearning-games-with-unity/book)

One thing I am very passionate about is education, it is what got me started as an avid blogger, a means to get excited about new technologies or patterns, break them down and then show others how to use them effectively.  If I found new ways of doing the same thing then share that as well, so when I got a book to review about building educational games, I was all over that!

* * *

![src=]()

Most books on Unity development focus on the features and a few nice examples of what you can do with it, but not so much about the game you are creating.

However this title takes a different track to focus on one type of game, the educational game.

Over these pages you will go through the in’s and out’s for what is needed to build a great educational title where the player is not just playing and achieving goals, they are on a quest for knowledge.

The example used in this book is about learning the flags / states and general knowledge about the good old USA, by making the player a trainee park ranger.  Through the course of this book you will see what it means to create a title that teaches and reinforces knowledge on the player for more than just a quick hack and slash, with of course a few Unity3D bits on the way as well.

* * *

![src=]()

Here is a brief run through what all the chapters are and what to expect from them:


###### Chapter 1 “Introduction to E-Learning and the Three Cs of 3D Games”

The beginning is always important when it comes to education, setting the state and a plan of activities to get to a place of understanding. Here the author sets out why games make such good tools for education, keeping the student engaged and compelled to learn more through exploration.

The level of detail put in to the back story for the game you will be building as part of the book was very details and compelling, certainly a level of detail you should expect in your own first projects.

The rest of the chapter is a brief introduction to Unity3D itself and walks you through your first scene, the camera and a basic input controller.


###### Chapter 2 “Interactive Objects and MissionMgr”

With the focus of the sample game being to collect items and set missions, in this chapter the author lays out the plans for the core engine that will both inform the player on their objectives and put in place a framework to keep them involved whist they are learning.

The intro architecture does take a few reads to understand but once you have it, you will see it as been well thought out and the structure of the scripts to support the engine are well laid out.  Given that with these sorts of titles, if you get your architecture wrong for your engine in the beginning it can cost you many hours of re-work later.

.


###### Chapter 3 “Mission One – Find the Facts”

With the core engine in place it is time to put it in to action.  Starting with the games initial goals you will build out all the content and its use for the first type of missions in the game.  The game itself is to set out to collect items, learn about them and use them to find out more information, extending both their learning and encouraging exploration.

There is a very nice section here about gauging difficulty vs skill, ensuring the player is challenged enough to keep playing but not too much that they just give up. All too often when you build games / educational content you end up building it for you without taking into account of your target audience, so the author does a good job of working through this tricky subject.


###### Chapter 4 “Mission One – Future Proofing the Code”

Great you have your first level working in your game, but a single level does not make a game (unless you are flappy bird ![Confused smile](/assets/img/wordpress/2014/04/wlEmoticon-confusedsmile1.png)).  With the core mechanics working and something for the user to play, it is time to reorganise to make the project easier to manage, add a menu and implement some menus.

The chapter also introduces a basic FSM (Finite state machine) to control game flow as well as packaging up your project together ready to be shipped.


###### Chapter 5 “User Interfaces in Unity”

Delving in to the current native Unity3D GUI system, here the author walks you through all the components and perils of the existing system.  Yes it is clunky and often tricky to use, but the author does a good job of putting it together and laying it out simply.


###### Chapter 6 “NPCs and Associated Technology”

Playing alone can be fun but generally it is better to play together.  In this chapter you will add some NPC’s to help further engage / help the player in their quest to find all the objects.  Personally I would also add evil characters to try and thwart you as well.

So to make the NPC’s more interesting the author walks through adding splines to a terrain to give the NPC places to go and wander round the scene near areas they can help with.


###### Chapter 7 “Mission Two – Testing a Player’s Learning”

When teaching it is important to also test the student against what they have learned, so with the second level in the game the main objective is to check how much the player remembers from the first level, adding a reinforcement cycle to the learning process.  To make it more challenging, you re-use the NPC’s from the previous chapter and pit them against the player to complete the level.  It is a race against time and can you win?


###### Chapter 8 “Adding Animations”

Having spheres or cylinders rushing around a game area can be fun, but not very entertaining.  it a light break from the education process for the game, here the author walks you through importing humanoid meshes and hooking them up to the Mecanim animation system to give them the appearance of movement.

Has to be one of the simplest explanations I have seen to implementing Mecanim animations I have seen to date, very nice.


###### Chapter 9 “Synthesis of Knowledge”

Completing the circle of knowledge we add the final level to this example educational game. Now that the player has learned some new information, they have demonstrated they have retained the information, now they need to express an understanding of what they now know and teach it to others.

This is a key point sometimes missed in educational games, closing the loop to really understanding topics you have learned and very well explained in this chapter.


###### Chapter 10 “An Extensible Game Framework Pattern in Unity”

In the final chapter we take a step back and look at what you have wrought, looking for areas of improvement and tweaking it in to a final solution (usually taking up 80% of any time used to create a project if done right).  Also given that we want the player to keep playing and not just in one sitting the author walks you through interacting with the file system and saving / loading level and player data.


###### 

* * *

![src=]()

As a book to teach teachers or other likeminded developers the core rules and precepts for educational content, this book really shines.  The game itself is also a very good start with an interesting backstory, I can see many readers taking this framework and re-applying it across many subjects and further extending it.

What does let the book down is that it perhaps did not spend enough time re-enforcing this point throughout the book, part was about teaching someone new to Unity3D how to use the tools and the other part on the subject at hand.  It might have been better to focus on what makes great educational games and have the reader need a certainly level of knowledge about unity3D before reading.

That being said, the way the author explains each function was very well laid out and easy to understand, so in my view this should have been two books not just one.


###### Pros ![Smile with tongue out](/assets/img/wordpress/2014/04/wlEmoticon-smilewithtongueout2.png)

- Best explanation in a game development book about educational content I have seen.
- Nice and varied structure, very easy to follow
- Spend a good chapter on the Unity3D GUI system, always needed for Unity!


###### Cons:

- Mixed audiences, would have been better to target experienced Unity3D developers to give them new skills
- A lot of just follow along code rather than explaining why the author went down that route (which would have supported an experienced developer)

 

* * *

![src=]()

Despite its mixed nature I really did enjoy reading this book, the concepts about education and learning processes is very well laid out and adapted well to games. Closing the loop and reinforcing what you have learned is often missed in most titles, where they usually focus on just learn / test, so a lot can be learned here.

The book also does lay down some very good architecture for these types of learning games which can ultimately be re-used in many games, so it is worthwhile looking into if you want to build your own educational games.

