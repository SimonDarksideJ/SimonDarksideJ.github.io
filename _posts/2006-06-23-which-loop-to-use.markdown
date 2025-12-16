---
layout: post
title: Which Loop to Use
date: 2006-06-23 12:43:22
tags: [monogame]
---

From my first entries into the Gaming development arena was my induction to the central part of any game, the Game loop.

For any not in the know, the game loop is the part in the code which controls the game itself, from launching the rendering of the screen, to updating any and all objects in the game.

The loop in general runs by using some kind of timing system keyed to the processor clicks the machine produces and in that code you determine what updates where.

As the screen only needs to be updated 25 times a second (for visual viewing), this is only a fraction of the processing capability of any machine is used in the rendering process, unless the machine is too slow (or programming glitches) cause the FPS to run slower causing the screen to jump.

But anyway, as I have made my way trawling through guides and books, I have come across several implementations of this game Loop.

## The OnPaint Loop

This method describes a loop that is run by the event of painting the screen, so each time the screen is updated the loop begins again.

From what I have read though this seems to be one of the slower methods for game looping although I haven't found any exact reasons why.

## The onRender Loop

Mainly used in C++ and C# games, like the OnPaint Loop this begins a new game cycle when the scene is rendered and output to the screen.

From what I can tell this is the main Game Loop type used.

## The While Loop

The while loop, which is standard coding practice for any process that needs to loop in code until a certain condition is met, when used as a game loop the loop is never ending until the code breaks out of the loop and closes the game.

## Conclusion

There may be others I've not come across, from what I've found though these are the main ones.

I must admit, one of the things I always wondered about when starting into this arena was just how this happened.

Any thoughts from anyone on other methods, or basically just bash my current understanding of the game loop process?

