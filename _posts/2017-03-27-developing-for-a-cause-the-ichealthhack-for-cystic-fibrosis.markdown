---
layout: post
title: Developing for a cause - The ICHealthHack for Cystic Fibrosis
date: 2017-03-27 13:55:14
tags: [events, fizzyo]
---

As a Microsoft MVP (Most Valuable Professional), out helping my community of game developers and technology peeps, I am often asked to talk at some event, speak at a user group or support a community in its open source work. in short, donating my free time to help others in a developer way.

Other times I am supporting (or creating) open source projects and contributing code or skillz in projects that ultimately help a lot of developers.

 

And sometimes these goals are truly aligned when I help out at worthwhile events, donating time and code for a worthy cause, in this case the ICHealthHack, searching to Gamify Cystic Fibrosis treatments.

![](https://ichealthhack.github.io/images/logo.png)

* * *


# What is the ICHealthHack?

_Quote from the ICHealthHack site:_

> Imperial College is a leading university with world-class engineering and medicine faculties. Health Hack brings our community together to work on ideas which require interdisciplinary excellence. We are focused on serious games in the public health sector taking advantage of biomedical technologies. The mix of bioengineering, coding skills and domain-specific medical knowledge is why you should be excited about this event. You will also get to meet all the amazing researchers and developers who will be there to provide each team with genuine support and ideas because you will work on the causes they care about.

 

In short, Health Hack is a program aimed at merging fun activities (such as games) with more serious and life critical tasks (like breathing treatments) together to make what are sometimes horrible or just very boring activities in to fun or at the very least entertaining things to do.

 

The program aims to go far beyond any one “Hack-a-thon” or event, to build a growing framework of tools, resources and code, to enable others to keep building fun and engaging programs to make treatment of Cystic Fibrosis (and other ailments) more rewarding, especially for kids, to ensure they engage better with their treatment.

* * *


# Cystic Fibrosis?

The whole event is simply starting with Cystic Fibrosis and in particular one specific treatment as a Launchpad, the loftier goals aim to get more developers, students, bioengineers and mechanical engineers all on a similar platform to work together to make healthcare treatments more engaging and where possible, FUN.

 

Cystic fibrosis (CF) is a genetic condition affecting more than 10,800 people in the UK and its effects are quite far ranging.  The most prominent issue that people with CF have is with their breathing.  Mucus builds-up in their lungs causing chronic infections, meaning that people with cystic fibrosis struggle with reduced lung function and have to spend hours doing physiotherapy and taking nebulised treatments each day. Exacerbations (a sudden worsening of health, often owing to infection) can lead to frequent hospitalisation for weeks at a time.

On top of that, their pancreas becomes blocked with mucus, enzymes required for digesting food cannot reach the stomach. People with cystic fibrosis often need to take more than 50 tablets a day to help digest food and keep respiratory symptoms in check.

 

> **You can read more about** [**Cystic Fibrosis on the CF website**](https://www.cysticfibrosis.org.uk/) **, which goes in to a lot more detail.**

 

Ongoing treatment for CF is long, laborious and no fun at all, requiring hours of repetitive exercise or treatment, which especially for children is very, very, very, VERY, boring.

* * *


# Games to the rescue

> [**Check out all the tweets for the hack event here at Imperial College London**](https://twitter.com/search?f=tweets&q=ichealthhack)

 

It is a scientific and well proven fact that kids LOVE GAMES!  So why not bring together the best minds from a wide collection of healthcare individuals, ranging from students, practicing physicians, CF physiotherapists and some big names in tech like Microsoft (tech and software), [McKinsey&Company](http://www.mckinsey.com/) (data scientists) and [Stent Tek](https://www.stent-tek.com/) (medical device research) .

They also brought along a few experiences game developers to help and join in with the project and make the development process easier.

 


## THE CHALLENGE

For this first “hack”, entrants were set a task to “gamify” a specific course of CF treatment referred to as “ **Airway Clearance** ” which aims to help clear the mucus from a patients lungs by getting air behind the mucus and helping the patient to “cough up” or swallow the unwanted particulates.

Which sounds grand but involves the patient breathing in to a device (aimed at making the lungs vibrate) repeatedly in multiple sessions for approximately 30 minutes or more.  Sometimes a lot longer, which you can imagine is both very uncomfortable, laborious and no fun at all.

 

The devices used have been adapted through the use of a custom board called the Fizzyo device, which provides a few specific inputs related to the treatment itself:

[![Airway Clearance Devices](https://github.com/ichealthhack/fizzyo-challenge/raw/master/Airway.jpg)](https://github.com/ichealthhack/fizzyo-challenge/blob/master/Airway.jpg)

The device also captures the data from the breathing sessions in order to help validate the effectiveness of the treatment and provide additional information to the parents, clinicians and the patient over the course of time.


## The Treatment

The specific treatment being addressed in this challenge requires the patient to:

- 
Blow strongly in to the device until they have fully exhaled
- 
Pause to breathe in
- 
Repeat for approximately 6 times
- 
Stop and perform a coughing like exercise
- 
Repeat all this again for about 30 minutes or more. Roughly about 8 times.

Patients need to focus on their breathing, NOT over exert themselves and ensure their full lung capacity is used (remembering that with CF patients, this can be greatly diminished).  All of these


## What you have available

Given that patients need to hold on to the device during the course of treatment, usually with one hand but sometimes with two, we have a limited number of inputs with which to work with, namely:

- A breathing sensor, able to record the flow rate at which the patient is exhaling
- A single button

Does not sound much but can YOU make a game with these limitations?  Something to make patients (especially kids) WANT to keep coming back to do their treatment, to get higher scores or discover strange new worlds?


## The Contenders

One lonely weekend, 8 teams of students huddled together in groups of 4 to battle it out to see who could come with the best idea, game, project to help with this particular treatment scenario.  With 48 hours at their disposal, they came up with some very interesting ideas!

 


### 1. [Phlegm Buster](https://devpost.com/software/phlegm-buster)

An interesting project that encompassed the whole treatment lifecycle for a patient.  Including a 3D shooting game where the player traded breaths for shots to defend themselves from hordes of oncoming zombie creatures.  They even demo’d their project running on a HoloLens of all things  
What made this project really stand out though was the attention to detail with the stats that came from the players “session”.  
\* Using the data to give kids a competitive portal which they could interact with.  
\* A parent portal to track each session the child worked on, showing trends of use and early warnings of reduced lung capacity.  
\* A clinician portal to use the breathing data to help and aid future treatments.

On top of all that, they also went as far as planning to use 3D printing to create custom breathing devices with bolt on characters, that the players could earn points to collect more characters and allow the kids to customise their own devices for play!!.


### [2.](http://slides.com/jonahbeaudin/selfiesticksblock-game/fullscreen#/)[Tower Blocf – Team SelfieSticks Ideas](http://slides.com/jonahbeaudin/selfiesticksblock-game/fullscreen#/)

[![](assets/img/posts/image-not-found.png)](http://slides.com/jonahbeaudin/selfiesticksblock-game/fullscreen#/)

This team took the FUN factor and turned it up to 11. Taking a simple mechanic of stacking blocks in a fun 3D world, using the Fizzyo button to drop blocks in a nice easy one click mechanic.  What set it aside and garnered a lot of praise was the use of the Fizzyo breath detector, the screen slowly fills up with smoke/fog (or other sight blocking medium) and the user has to clear the screen using their breath in order to see the gameboard.  This simple mechanic could be adapted in so many ways either using different materials or blowing animations to keep it fun and exciting, not to mention the fun had with different block sets.  
Taking it a step further, the team even took their game to the nearby hospital (even grabbing a selfie with none other than Bill Nye on the way) and showed the game to kids at Great Ormond Street to get feedback (which the kids loved). All this in the morning of the second day of the hack.  
 ![](assets/img/posts/image-not-found.png)  
The team showed they really had what it takes to go the extra mile to build up their game project. (last i heard they are still continuing their journey together after the hack ![Open-mouthed smile](/assets/img/wordpress/2017/03/wlEmoticon-openmouthedsmile.png))

 

> [**You can read more about this teams journey (and the overflowing arms of prizes they won) here in their post-mortem**](https://blogs.msdn.microsoft.com/uk_faculty_connection/2017/03/21/tower-blocf-at-imperial-health-hack/)

 

One of this team also won my coveted [Xbox Elite Controller](https://www.amazon.co.uk/Xbox-One-Elite-Wireless-Controller/dp/B00ZV0NH40) prize for the best tweet. Just for being cheeky enough to insert a celebrity in their pitch.

![](assets/img/posts/image-not-found.png)[![](assets/img/posts/image-not-found.png)](https://www.amazon.co.uk/Xbox-One-Elite-Wireless-Controller/dp/B00ZV0NH40)

 


### 3. Turnup

![](assets/img/posts/image-not-found.png)

The Turnup team took a different tack with the hack, setting their sights firmly on one of the sponsored prizes for the event, the McKinsey & Company Data Visualisation Prize.  A keen problem with all the information that could be garnered from all the Fizzyo devices and the games the children will eventually play, is what to do with all that data?  Without keen analysis, it will be very hard to see trends and determine which treatments work better than others, or suggest potential alternatives.  Sadly the team had no game development skillz among them being a group of data scientists.  This did not stop them from building a winning analytics solution in the end.  As always, use what you got and reach for the skies.

 


### 4. C-Force

Most of the teams had little to no experience with Unity before the event which resulted in an impromptu training session from me at the beginning of the event.  Given this, the C-Force team really impressed me not only taking their crash course in game development but also going further and building their first 3D game.

After long hours, much frustration they built a 3D space game that allowed to dodge obstacles and power up their controls to race to the top.

What made them stand out is they purposely built a system that could be controlled by CF and Non CF patients alike (or even friends / family), giving CF patients the chance to compete against their siblings and school friends, a true multi-player experience.  With the aim of also delivering the game on a mobile device, this allows the patient to challenge others on the go.

What the team lacked in Unity experience, they more than made up for with Mad presentation skillz ![Open-mouthed smile](/assets/img/wordpress/2017/03/wlEmoticon-openmouthedsmile.png)


### 5. Beyond the Stars

Like the C-Force team, this team also had no Unity skills at the beginning of the event but spent a good deal of time designing their project, coming up with many different designs before carefully proceeding with their preferred solution.  I have no doubt that some of those other designs will also see the light of day.

In this project the team had the player driving through alien ship filled asteroids in full 3D, delivering the most graphic filled game of the event, a real showcase.


### 6. QuBi

In the spirit of the hack, some of the organisers also jumped in to build their own game for the hack. Since they also helped build the framework and were hosting the event they could not “win” but they certainly showed the art of the possible.

[![Qubi](/assets/img/wordpress/2017/03/Qubi.gif "Qubi")](/assets/img/wordpress/2017/03/Qubi.gif)

A nicely polished game (all done in the 48 hours, honest), setting up the breathing session and having an endless runner character jump across a platform environment with the button. In order to collect coins faster and thus gain more points, the player needs to breathe into their device at the same time to charge up the player (shown by the inner green circle). Once done the player gets a burst of speed.  As another nice UI feature, good boost breathers also fill an inner circle on the player indicating how far they need to keep going with their treatment.  Also, to ensure the player does not feel “pressured”, play does not stop when they need to cough, it simply continues until they are ready to return.


### 7. Chromosone7

Another team also using the “charging” pattern in a side scrolling space invaders style game.

[![image](/assets/img/wordpress/2017/03/image.png "image")](/assets/img/wordpress/2017/03/image-11.png)

From nothing to a working 2D game is certainly no mean feat for a group of students with little to now Unity or C# experience, so the team pulled off something really nice.  Might not look much to the trained eye but this was done in less than 48 hours (and these were medical students, so they were well training in taking much needed sleep breaks ).  Their dreams were certainly much larger but sadly they were hampered with GIT merging issues thanks to Unity. (anyone using GIT between multiple machines with Unity should feel this pain)

Although the tam got first hand use of the Unity SmartMerge tool: [https://docs.unity3d.com/Manual/SmartMerge.html](https://docs.unity3d.com/Manual/SmartMerge.html), something no beginner should have to encounter soo early in their Unity life ![Sad smile](/assets/img/wordpress/2017/03/wlEmoticon-sadsmile.png)

 


### 8. Just Sit Straight

There is always one project in any hack, where they throw all chance of “winning” out of the window and just go for the fun factor.  So, they ventured forth to create another style health game to help people at a computer to sit straight and stop slouching.

![](assets/img/posts/image-not-found.png)

Using only the camera and some interesting AI techniques and written in Python, it is certainly a computer scientists piece of py, this application just watches the developer through their camera (not sure how that works with everyone’s camera taped up) and if it sees if they are:

- Leaning off to the side
- Slouching at their desk
- Or Too close to the screen

If the program detects you doing something you should not then it reacts in many different ways, each getting stronger than the last, ranging from popups with helpful messages to loud glaring shouts at you from your parents telling you to sit up straight.  This project certainly brought the fun factor to the event

 

* * *


# The Hack never ends

While the initial hack has now completed, most teams are still continuing their projects hoping to bring some much-needed relief from boredom for kids with CF treatment.


## GET INVOLVED

![](assets/img/posts/image-not-found.png)

 

**But you too can help continue the project** , as you can well imagine Kids need fun in their life through games and none so more that kids suffering with Cystic Fibrosis.  So, Microsoft and its partners are ever evolving the work that has begun with this hack and has very lofty goals to keep on helping.

 

If you have skills in Unity or MonoGame, you can grab the project and start building your own game and then share it with the program via [GIT](https://github.com/FIZZYO/fizzyo-challenge) or [DevPost](https://ichealthhack.devpost.com/).

** **

**Click the links below to see the sample projects with the necessary frameworks to interact with the CF treatment sensor, the Fizzyo device.**

 [![image](/assets/img/wordpress/2017/03/image-12.png "image")](https://github.com/Fizzyo/fizzyo-challenge/tree/master/Fizzyo-Unity-Example)[![image](/assets/img/wordpress/2017/03/image-13.png "image")](https://github.com/Fizzyo/fizzyo-challenge/tree/master/Fizzyo-MonoGame-Example)

 

_ **Click to see GitHub Repo for samples** _

Each project contains the following:

- The Fizzyo device code, exposing both the output pressure from the device (Horizontal Axis) and the single button
- Recorded CF treatment data for testing, although you can also use gamepads / keyboards to simulate input
- A fully working sample showing the Fizzyo device in use.

Documentation and features are constantly being added to the project by the entire team (including myself) to provide even more data / inputs for projects.

* * *


# Why get involved?

There are many reasons you should get involved with the project and donate your spare time and skillz. At the end of the day your reasons are your own, for me personally I am still jumping in on the project to:

 


## Fight boredom

![](assets/img/posts/image-not-found.png)  
No child should have do boring lifesaving activities without FUN.

 


## Contribute to Cystic Fibrosis treatment

![](assets/img/posts/image-not-found.png)  
While none of my children have CF, one of them does have a condition that I can do nothing about (other than watch him like a hawk).  
So the opportunity to actually use my Game and dev skills to make treatment easier is a true goal.


## Have fun

![](assets/img/posts/image-not-found.png)  
I love building and making games and they might as well be for something worthwhile and I may learn yet more things along the way

 

**So I strongly encourage anyone to have a look at the project, see it evolve and submit your own ideas to the project.**

