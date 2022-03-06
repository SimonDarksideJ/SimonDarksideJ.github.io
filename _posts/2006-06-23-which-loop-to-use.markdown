---
layout: post
title: Which Loop to Use
date: '2006-06-23 12:43:22'
tags:
- tutorials-resources
---

From my first entires into the Gaming development arena was my induction to the central part of any game, the Game loop.

For any not in the know, the game loop is the part in the code which controls the game itself, from launching the rendering of the screen, to updating any and all objects in the game.

The loop in general runs by using some kind of timeing system key’d to the processor clicks the machine produces and in that code you determine what updates where.

As the screen onlyneeds tobe updated 25 times a second (for visual viewing), this is only a fraction of the processing capability of any machine is usedin the rendering process, unless the machine is too slow (or programming glitches) cause the FPS to run slower causesing the sen to jump.

But any way, as i have made my way trawling through guides and books, I have come across several implentations of this game Loop.

> The OnPaint Loop
> 
> > This method describes a loop that is run by the event of painting the screen, so each time the screen is updated he loop begins again.
> > 
> > From what I have read though this seems to be one o the slower methods for game looping althoughI haven’t found any exact reasons why.
> 
> The onRender Loop
> 
> > Mainly used in C++ and C# games, like the OnPaint Loop this begns a new game cycle when the scene is rendered and outputed to the screen.
> > 
> > From what I can tell this is the main Game Loop type used.
> 
> The While Loop
> 
> > The while loop, which is stanard coding practice for any process that needs to loop in code until a certain condition is met, when used as a game loop the loop is never ending until the code breaks out of the loop and closes the game.

There may be others I’ve not come across, from what I’ve found though these are the main one’s.

i must admit, one of the things I always wondered about when starting into this arena was just how this happened.

Any thoughts from anyone on other methods, or basically just bash my current understanding of the game loop process?

