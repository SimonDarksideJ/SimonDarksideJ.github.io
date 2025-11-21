---
layout: post
title: Unity AI Programming Essentials - A Review
date: '2015-01-10 18:31:46'
tags: [book review,ai,unity3d]
---

I can see a light at the end of the tunnel.  As I’m nearing the journey of my marathon book writing spree. I’m taking a little time out to read a few other books on Packt’s library, this time in one of my favourite areas, AI.

[![ width=](assets/img/posts/image-not-found.png)](https://www.packtpub.com/game-development/unity-ai-programming-essentials)


###### [Unity AI Programming Essentials](https://www.packtpub.com/game-development/unity-ai-programming-essentials)

AI is hard, anyone who says anything otherwise is either a rocket scientist or works for an AI firm doing it day in and day out.  
It can take many forms, from path-finding to NPC behaviour and in all cases it takes some serious effort (or at least a few hours trolling AI tutorials) to figure it all out and even then, it takes ages to debug.  It is yet another one of those areas where you either need a dedicated developer, a fantastic framework or some lousy cut and paste job to get through it.

* * *

![width=](assets/img/posts/image-not-found.png)

With so many options to choose from these days, it is hard to know where to turn, especially with advanced systems such as AI.  So it is a welcome find to grab a book that focuses on just AI systems and the AI packages out there.  Even better if it has lots of working examples on the multitude of different AI problems we face in modern gaming.

So let’s break down what this book has to offer above the competition.

* * *

![width=](assets/img/posts/image-not-found.png)

Here is a brief run through what all the chapters are and what to expect from them:


###### Chapter 1 “Pathfinding”

The first style of AI most wouldn’t consider actual AI is pathfinding, basically it involved getting a subject from point A to point B without walking on things it should not (like walls) and in a lot of cases in the shortest path/time.  This chapter then walks through some examples using the 3 AI Asset store packages the book covers (Quick Path, React, and RAIN AI) in a clearly explained fashion.  Finishing off with a nice comparison between what each of the packages offers in this area.


###### Chapter 2 “Patrolling”

Expanding on the examples in Chapter 1, in this chapter we cover adding waypoints and some basic behaviours to AI agents.  Each example again working through each of the three AI asset packages.


###### Chapter 3 “Behaviour Trees”

A core part of any intelligent AI, is the need to have more complex behaviour support. For an AI not to be just aware of where it needs to get to but of other AI agents that are active in the scene.  In this chapter we go further and look at some more complex behaviours for the NPC AI. However this chapter only focuses on the Free RAIN AI framework.


###### Chapter 4 “Crowd Chaos”

For true NPC’s to believable, they need to appear as they are getting on with their own lives and not just following a predefined script, making their own choices and getting on with things. So in this chapter we look at giving NPC AI more intelligence and variant behaviour trees with examples in React and Rain AI.


###### Chapter 5 “Crowd Control”

Now chaos is one thing but in order for any crowd system to work it has to have a certain level of control.  If an every Ant in an Ant colony went about their lives their own way there would be chaos.  So this chapter focuses on building relationships between NPC AI to organise crowds in to a purpose.  Giving examples using an Ant Colony as a great example using two different Unity Asset packages (Fame Crowd Simulation API and ANT-Op) which have specific implementations for crowds.


###### Chapter 6 “Sensors and Activities”

Wit out AI happily wandering around our scene, there are happy days ahead. It would be nicer if they also had things to do and look out for, whether that is chasing down the player when they see them or a switch on the wall they can flick. In this chapter you focus on building a few extra senses for your NPC AI’s using RAIN AI’s features.


###### Chapter 7 “Adaptation”

Delving further in to the AI realm, this chapter looks at some of the more advanced RAIN AI capabilities including the ability of AI to learn and be more aware of their environment.


###### Chapter 8 “Attacking”

This last behaviour module focuses on a specific AI implementation that is used in a lot of games these days. It covers generic attacking patterns for AI including ducking and covering, making the the AI isn’t just suicidal in its attempts to down the player but will look after itself and run away when it needs to. (My mind always turns to Monty Python with this kind of logic ([http://bit.ly/AngryRabbit](http://bit.ly/AngryRabbit "http://bit.ly/AngryRabbit"))


###### Chapter 9 “Driving”

Stepping back from all the chaos and fighting, the book looks in to another branch of AI, a more peaceful and calming area, Driving!, looking at car steering behaviours and object avoidance whilst taking in to account the physics conditions of the vehicle you are in and using a Unity Navmesh to great effect.


###### Chapter 10 “Animation and AI”

RAIN AI also has the ability to integrate with both Unity’s old animation system and the more modern Mecanim system, allowing you to play different animations in relation to different AI states.  Here the chapter walks through a decent demo using Unity’s own assets to show you how to set all this up.


###### Chapter 11 “Advanced NavMesh Generation”

Throughout the book, NavMesh’s have been used to great effect to keep NPC AI’s on the straight and narrow. In this chapter you will walk through some of the more advance RAIN IA NavMesh options and what they mean for your titles..


###### 


###### 

* * *

![width=](assets/img/posts/image-not-found.png)

I had high hopes and expectations for this AI title. AI is a very hard subject to get right and there are a lot of twists and turns along the way. Overall I think the authors have done a good job of focusing on several difficulty AI problems and walked you though several tools you can use to make the job a lot easier.

While the examples were thorough, the main issue in this title is the writing style, many times I had to re-read sections because I had a hard time understanding the language used, not sure if this was the original intent or something that was introduced later in the book’s publication (having full experience of that).

The other issue with the title is that most of the Assets used (which are paid for) are only there to show how good RAIN AI is (which is free). This isn’t to say it was written to promote RAIN but they just take up space that could have been better used to explain more about what is going on.

All in all it is a good book (albeit very short for 11 chapters) with some very well thought through examples and you can get a lot from it.


###### Pros ![Smile with tongue out](/assets/img/wordpress/2014/07/wlEmoticon-smilewithtongueout.png?w=660)

- A lot of varied examples which are clearly walked through
- Focuses on the concepts of AI without scaring the reader too much
- makes good alternative uses of NGUI


###### Cons:

- Too many different frameworks covered and doesn’t cover Unities own features much. Should have stuck to just RAIN AI (free) and Unity
- Some people might have trouble with the language (just takes a few extra reads though)  

* * *

![width=](assets/img/posts/image-not-found.png)

All in all this is still a book I would buy. There are a lot of touch AI concepts covered in this book with clear and concise examples.  The title is a bit tainted by the (in my opinion) wasted space on other paid frameworks that are not as good as the free assets (RAIN AI) and the style of language used (which I would have gotten torn to shreds for in my own titles, I find this concern particularly odd).

In the end though, It is all about the AI and in this capacity the authors do a good job of breaking down a huge and complex area.

