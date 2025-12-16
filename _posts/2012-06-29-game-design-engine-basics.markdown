---
layout: post
title: Game Design - Engine Basics
date: 2012-06-29 09:27:57
tags: [2d tutorial, game development, xna]
---

The DigiPen tutorial was originally delivered on top of a basic game engine written for the tutorial series.  Now the specifics of the engine were discussed breifly in the webcast, so I’ll elaborate here on those components and reflect on their place in an XNA based game.

In further additions to the tutorial series, I’ll expand on improvements in this area using XNA and some more modern ideas.  For now, I’m keen to preserve the original DigiPen way of working and then show the way in which it has been updated for XNA later.

I have already uploaded the content and the XNA project for [lesson 4 to codeplex](http://startrooper2dxna.codeplex.com/releases/view/44143), the following post will go over what has gone into the XNA update

* * *


### 1 World Dimension

> ### 1.1 What Is a World?
> 
> The world is the environment where the entire game will take place. It is a rectangle with a defined width and height.
> 
> ### 1.2 Why Do We Use the World?
> 
> The simulation application applies mathematical transformations on game objects and cameras. These
> 
> transformations operate on game object structures. All objects must be within a defined area. If a position of an
> 
> object is outside the world, we can reposition the object or choose another option.

* * *


### 2 Viewport

> A world rectangular coordinate selected for display is called a window. (Note: This is not the Operating System Window.) The window defines what is viewed, whereas the viewport defines where it is to be displayed. A viewport is a rectangular area of the display window. By default, it is the entire window (client area of the operating system’s window) application. It can be set to any smaller size in pixels.
> 
> in XNA viewports can be the entire screen or just a portion, for now the viewport should be considered as the working space in the screen.  Care also has to be taken (especially when deploying to XBOX’s) to scale the viewport down to the safe viewing area of the screen, as some monitors and TV’s do not display correctly around the edges, to cope with this we scale the screen down for viewing to what is referred to as the “TileSafeViewing” area.  A sample exists on the CC site to show this but I’ll also implement and describe it here.


### 3 Bitmap

> ### 3.1 What is a Bitmap?
> 
> A bitmap is an image made up of thousands of pixels. Every pixel has its own position and qualities. Qualities such as colour and brightness are stored in the bitmap file.
> 
> ### 3.2 RGB Intensity
> 
> Monitors work with red, green, and blue signals. Every coloured pixel contains a value of red, green, and blue within it. The intensity of every basic colour creates a colour. In other words, colours are displayed as varying intensities of red, green, and blue dots.

* * *


### 4 Sprite

> ### 4.1 What Is a Sprite?
> 
> Sprites are the pictures or images displayed on top of the background. They are also called game objects. Usually, sprites represent all the moving parts of the game. Sprites can be:
> 
> - Enemies
> - Animated parts of the background
> - Bullets
> - Any other moving game object 
> 
> Since the sprite status varies in terms of images, position, and values, the sprite needs to save information such as:
> 
> - Current position
> - Current speed
> - Current direction
> - Visibility status
> - Current frame
> - Current animation
> - Any other relevant information relating to image, position, or value 
> 
> ### 4.2 The isActive state
> 
> This specifies whether the sprite will be active. When the sprite is not active, all its behaviours are disabled and it is not visible. Then the sprite will not be processed during the game loop. An inactive sprite is usually used when a sprite prototype is needed. A sprite prototype can be used to create identical sprites at run time. Inactive sprites are also used when a sprite does not need to be present when the level starts.
> 
> The active state of a game object or sprite can be used in may different was, sometimes the sprite just is not moving or has moved off screen and should only come back if called.
> 
> The isActive state is used by the Update loop to check if it needs updating, if not it ignores it.
> 
> ### 4.3 The isVisible state
> 
> The code will process all the game objects with every game loop. Processing game objects includes handling and drawing. When the sprite is visible, it will be handled and drawn. However, when the sprite is invisible, it will be handled but not drawn.
> 
> Remember your game may keep track of many game objects or Spites but some may only be visible during certain situations, like a hidden enemy which only appears from time to time.
> 
> The isVisible state is used by the Draw loop to check if the game object or sprite needs drawing to the screen.  For performance reasons an object or sprite that is outside the viewport or screen should never be drawn.
> 
> ### 4.4 Animation
> 
> The sprite or the game object requires an animation to be represented visually. During the process of the sprite creation, an animation with one or more frames should be specified.  This is covered more later in the Animations section.

 

* * *


### 5 Background

> ### 5.1 What Is a Background?
> 
> A background is an image or bitmap that will be placed in the world at a certain position. The area of the screen display that is not covered by a game object is the background that can be seen by the player. Game objects are displayed on top of a background.
> 
> Some backgrounds like in the XNA platformer sample actually have several background images layered one on top of each other, this either just lets you build up an image from separate images or lets you animate each layer separately for more effect.
> 
> ### 5.2 Position
> 
> The background should be positioned within the world. The background’s position is situated relatively to the world rectangle, not relatively to the viewport.

* * *


### 6 Animations

> ### 6.1 What Is an Animation?
> 
> An animation is a series of images drawn in sequence with a specific delay for each image. Each frame of an animation is slightly different. When played in succession, they give the appearance of movement.
> 
> ### 6.2 What Do We Do When the Animation Ends?
> 
> When the animation ends, it can:
> 
> - Restart from the first frame.
> - Restart from a certain frame (not necessarily the first one).
> - Remain at the last frame.

* * *


### 7 Frames

> ### 7.1 What Is a Frame?
> 
> A frame is simply an image that is part of an animation.
> 
> ### 7.2 Transparency (alpha)
> 
> A frame is made out of a bitmap, which is a matrix of points that has a rectangular or square shape. Of course, not all images have a rectangular shape. Areas not used in the rectangle will be filled with one specific colour called the transparency colour. The drawing mechanism will ignore all pixels having the transparency colour; in other words, the transparent pixels will not be drawn.

| 

[![image](/assets/img/wordpress/2012/07/image17.png "image")](/assets/img/wordpress/2012/07/image17.png)

 | 

[![image](/assets/img/wordpress/2012/07/image18.png "image")](/assets/img/wordpress/2012/07/image18.png)

 |
| 

With Transparency colour

 | 

Without Transparency colour

 |

>  

* * *


### 8 ZOrder

> To understand ZOrder, we have to simulate a 3D coordinates axis. Look at the diagram below and take note of the x-, y-, and z-axes. The z-axis specifies the depth axis, and the greater the value of the ZOrder, the “deeper” the object is to the screen. For example, the picture with the character has a lower ZOrder (1) while the picture with the ball has a higher ZOrder (2). Therefore, the ball appears to be behind the character. Because it is a 2D application, the ZOrder only affects the displacement order of pictures, without affecting their size. All the game objects are affected by the ZOrder.

 

[![image](/assets/img/wordpress/2012/07/image19.png "image")](/assets/img/wordpress/2012/07/image19.png)

* * *


## The DigiPen Engine Classes

> ### 1. Game (game.cs)
> 
> This class is largely redundant now, being wholly replaced by the XNA game class.  Although there are various similarities between the two implementations.  Mostly covering game components, initialisation, update and draw loops and basic graphic card interactions.
> 
> ### 2. Sprite (sprite.cs)
> 
> This is an implementation for handling Sprites which we will reuse in this tutorial.
> 
> It covers the setup of a sprite (an image with certain properties and placements within the game world) and stores the sprites animations.
> 
> It also features the iClonable interface, which enables good memory management for copying objects (such as the sprite class) and inbuilt functionality for proper creation and destruction of individual instances.  Handy if you want lots of the same graphics handled on the screen.
> 
> The Sprite class also handles how collision is handled between two different sprites on the screen.
> 
> I will go into these features more as we consume them in the game.
> 
> StarTrooperBackground.cs, StarTrooperSprites.cs both inherit (use the Sprite as the base class) from Sprite.cs so that they can benefit from the default sprite behaviour.
> 
> ### 3. Animation (animation.cs)
> 
> The Animation class offers a structure for creating and maintaining animations including properties to handle the current state of an animation (is it playing, has it stopped, etc), this class is consumed initially by the sprite class.
> 
> More on this as we build animations.
> 
> ### 4. Font (font.cs)
> 
> The font class has been replaced by the spritefont class in XNA.  It provides a mechanism on how to describe a font in game engine terms for writing text to the screen.
> 
> ### 5. Text (text.cs)
> 
> This class I have also retained as it provides a handy place to coordinate all text to be drawn to the screen, it is also been updated to work with XNA.
> 
> ### 6. Input (keyboard.cs)
> 
> I have retained for this tutorial DigiPen’s keyboard implementation and updated it for XNA.
> 
> This handled the interaction between the user and the game through whichever control device they wish to use.
> 
> In a later refresh tutorial we will update this more for XNA to allow for other input devices.
> 
> ### 7. Music (music.cs), Sound (sound.cs)
> 
> I have left out the Music and Sound files as they only provided a light framework for playing and viewing the status of audio files.  In XNA these are already provided by XNA’s audio classes natively.
> 
> ### 8. Picture (picture.cs)
> 
> The picture class has been replaced in XNA by the Texture classes which better describe how images should be used.

You can look at all these classes in the [Test Project on codeplex](http://startrooper2dxna.codeplex.com/releases/view/44143 "Lesson four content"), as stated a few times above, I’ll delve into each of them as they are consumed.

* * *


## The Engine Update for XNA

When thinking about your game engine and putting it together you need to put some thought into how it will be made up.  For instance you need to think about:

- How are you going to group your game objects together for updates / draw calls? 

> This is usually done by creating lists of common objects, however care has to be taken when working with dynamic objects or objects that are likely to be created and destroyed frequently as this can change your approach if you do not cater for it.
> 
> In the game engine for this tutorial, I’ve updated the original Digipen code into the XNA framework as is.  The way Digipen handled the game objects was to have a few high level objects such as the Sprites, Sound and Music and create collections fro them.  The game then loops through these collections to update and draw them.  Because this was done using the high level objects it meant the engine only has to handle a few types and not one for every object in the game, like the player, the background, the enemies and later on the shots you fire.  Because all of these are related to the Sprite class, there is only one collection for them all.
> 
> More later.

- What kind of effects are you going to use and where to implement them? 

> If your objects are going to animate, blow up, shrink, grow and disappear then care needs to be taken to how you implement these effects:
> 
> - Are all you effects applicable to all your game objects.
> - Do your effects happen over time and have different frequency rates
> - Can effects happen at the same time. 
> 
> All of these factors can play havoc with your game if you do not plan ahead.

- What screens and resolutions are you aiming for? 

> if you just draw your objects to the screen using exact coordinates, what happens when your resolution changes or you start running on a mobile device with a much smaller screen.  If you do not cater for scale this can cause major headaches.

- What refresh rate are you aiming for? 

> Different hardware handles the timing differently in your game.  XNA provides the GameTime Class to help with this but if you do not handle it properly you are game will just look off or things wo not happen when you expect them to.

There are many other considerations and I’ll cover them as we come to them, such as Shader effects, renderstates and such,  most are out of the scope of a basic 2D game and not be covered until the 3D tutorial.

* * *

The next post is where the game takes off, it will follow shortly as this was really another intermission post but most of what what covered here is in the Digipen session 4 video.

Prepare for code 😉

