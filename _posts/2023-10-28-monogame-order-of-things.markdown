---
layout: post
title: MonoGame, the order of things!
date: 2023-10-28 00:00 +0000
description: Every engine, framework and operation has a specific order to their events.  This post outlines the execution order for MonoGame projects.
img: posts/20231028/title.gif
category: MonoGame
tags:
- game development
- xna
- monogame
author: Simon Jackson
github: SimonDarksideJ/MonoGameExecution
mathjax: false
---

![Coding is Life](/assets/img/posts/20231028/gettingtheorderright.gif)

> TL;DR -> It is as simple as Initialize, LoadContent, Update, Draw, UnloadContent and finish, with a little sauce in between.

Every Game, Program or process runs on a specific loop, it might go through just once, or as is in the case with Games, the loop continues until the game is over, finished, kaput, crashed or simply closed (but who really wants a Game to ever end :D).  Put simply, this is known as the Game loop, and whether it is Unity, Unreal or MonoGame, they all have their own specific order of things.

This article will walk through MonoGame's Execution event order and set out what you can and cannot override to make it your own.

> Although personally, and with every MonoGame project I've been involved with, I have extended the Game Loop and never been brave enough to actually OVERRIDE it :D.

* [The full breakdown](#the-full-breakdown)
* [The simpler view](#the-simpler-view)
* [Which events can be overridden](#which-events-can-be-overridden)
* [Game Components](#game-components)
* [Basic Game Components](#basic-game-components)
* [Drawable Game Components](#drawable-game-components)
* [Check the samples](#check-the-samples)

> BIG thanks to [Aristurtle](https://twitter.com/aristurtledev) for the original image, [credits here!](https://twitter.com/aristurtledev/status/1110025028626800640?t=3iF-20pVzfxdoccfgyi0PQ&s=19) Check out his work as it is amazing in the MonoGame space!

## The full breakdown

![MonoGame Full Execution Order of Events](/assets/img/posts/20231028/MG-FullExecution.png)

The Full MonoGame execution order is a bit much to take in, but I put it first so you can see the full range of what is going on behind the scenes while your Game is Running.

In short, the full execution is like this:

|Event|Description|Notes|
|-|-|-|
|Game Start|In Program.Main (or the relevant entry point for your platform) the Game is created and then uses the *Run()* method of the Game to start it.||
|Game Run|Initialize is called to invoke and setup all your code ready to accept any content to load.||
|LoadContent|At this point, any/all content starts to be loaded from disk into memory, ready to be rendered.|Care must be taken to load the correct assets at the right time, menu assets first, then game/level assets as the player progresses.|
|Platform.Run|This is where the Game Loop is executed for a specific platform, each has its own specific requirements for how to achieve this, but ultimately all result in a loop that "**Ticks**" along according to the cycle of the device|Base ticks are inconsistent and can change based on how much work the device is doing, where timing is critical, FixedStep timing is used instead.|
|Core Game Loop|Update and Draw are called consecutively for each "**Tick**" of the game.  Until the game is requested to **Stop**.|[Game Components](#game-components) also receive the same events as the main game|
|Game End Run|All internal game processes are stopped and the Game Loop is terminated.|No game changes are permitted at this point and the process cannot be halted.|
|Game Exit|Content is unloaded from memory and all classes are disposed (where supported), cleaning up memory and releasing it to finally close the game|Content can be Loaded or Unloaded at any point, these final calls unload any and all remaining content from the system.|
|Game End|Game Over dude, Game over.  We should just take off and nuke the site from orbit!||

There is a lot more going on behind the scenes to make the Game Loop happen on so many different platforms, from Graphics, Input, Audio and more going on, but the above is a simplification to show the full workings.

The following sections will break this down further for reference.

## The simpler view

![MonoGame Basic Execution Order of Events](/assets/img/posts/20231028/MG-BasicExecution.png)

Breaking down the core loop into a more digestible reference, the actual Game Loop can simply be described as:

|Event|Description|
|-|-|
|Game Run|Prep the launch pad and ready the rocket for launch.|
|Initialize|Load configuration, previous saves, Game state and ready variables for any content they require.  A lot of projects use XML or JSON to allow configuration of the project outside of the code, so this is a good time to wind things up.|
|LoadContent|Whether you are loading synchronously or asynchronously, when this event is received it is time to pull any content required from the disk and into memory.  This does not pass it to the graphics card, only readies it for use. If you have different screens that use different content, you might load them separately (as shown in the [Game State Management Sample](https://github.com/SimonDarksideJ/GameStateManagementSample)).|
|Update|Update your codes and move those things, ready for the next frame on the screen.  Run repeatedly until the game ends.|
|Draw|Kind of speaks for itself really, get assets from memory and push them to the screen in order.  Maybe some shader stuff too.|
|UnloadContent|Can be called at any time, but at this point it is before the game closes, to free up memory used by the game from content.|
|Exit|Clear the caches, wipe down the counters and ready for the next guest.|

**LoadContent** and **UnloadContent** can be called at any time, and usually are when you are switching from screen to screen, level to level, trying to keep ONLY those assets you actually need in memory at the same time.  If an asset is not being used, you should consider clearing it out to save those precious memory bytes and cycles for the main event.

**Update** and **Draw** are called constantly while your game is running as fast as your machine can run them.  By default, MonoGame uses a **FixedTimeStep** based on 60 FPS (Frames Per Second), doing its best to keep the GameLoop running at a constant speed regardless of device, however, this is **NOT GUARANTEED**, as if your game takes longer than expected in your **Update** cycle, the **Draw** cycle will be late, the reverse is true also.

### Changing from Fixed Time to Dynamic speeds

To allow faster speeds, you will need to alter the timing setup for MonoGame by either setting the **TargetElapsedTime** to an expected framerate, e.g.

```csharp
    // Target 30 FPS
    this.TargetElapsedTime = TimeSpan.FromSeconds(1d / 30d); 
```

Or you can disable **FixedTimeStep** ```IsFixedTimeStep = false```, and manage all the timings yourself, although this too comes with its own specific considerations.  There is no spoon.

> My recommendation is to just use the defaults until you run into an issue (or know specifically what you are doing), as the defaults will handle most situations all by themselves, in my honest opinion (for what it is worth).

## Which events can be overridden

In some cases (most when you are dealing with MonoGame projects), you need to override the base implementation of MonoGame events to build your project.  Some like Initialize, LoadContent, Update and Draw are well known, while others may not.  Here is a full list of the events you can adapt to your needs in your game, all of which are described above:

|Event|Description|
|-|-|
|Initialize|Once the game has loaded, initialize the game.|
|LoadContent|Init point to load content for the Game, Scene, Screen or Drawable Component.|
|UnloadContent|Exit point to clean up content for the Game, Scene, Screen or Drawable Component.|
|Update|Called once per frame to perform updates.|
|BeginDraw|Called once per draw call before any drawing has taken place.|
|Draw|Called for any game or Drawable components.|
|EndDraw|Called once all drawing has taken place.|
|OnActivated|Fired when the game receives focus, dependent on the Platform's determination of focus.|
|OnDeactivated|Fired when the game loses focus, dependent on the Platform's determination of focus.|
|OnExiting|Fired as the last call before the game terminates.|
|Dispose|.NET call to clean up a class as it is destroyed, including the Game class.|
|BeginRun|First point of call (prior to Initialize) on starting the game.|
|EndRun|Dying breath for MonoGame before the dotnet process is terminated.|

The sample project linked to this article is available to demonstrate these calls in action.

## Game Components

An underrated feature of the original XNA and now MonoGame Framework are components, essentially these are small implementations of Game Code that you simply pass on to the Framework to handle and run, and they just run (so long as they are registered).  Game Components come in two flavours, one building on top of the other:

* A Game Component - A basic Game like class that is **Initialized** and then updated by the **Update** event in the game.  Like a spawning manager that just needs to kick things off as levels progress, or maintain the state of "things".  No drawing, just running.
* A Drawable Game Component - An extended version of a Game Component that also received the Content Loading/Unloading events and the all-important **Draw** event.  Good for drawing enemies on the screen, or particles.

Let us delve into these a little more, into how their events are handled.

### Basic Game Components

![MonoGame Component Order of Events](/assets/img/posts/20231028/MG-GameComponent.png)

Games require a lot of features and components in order to run, some are responsible for things you see, and others are not, such as Audio Managers, Networking and more.

This is where Game Components shine, allowing you to simply register a "Component" with the framework and then MonoGame takes care of it running in the background, all you need is a reference to it in case you need to disable or unregister it, or if the will takes you, to make changes to it.

As shown in the [**MarbleMaze**](https://github.com/simondarksidej/XNAGameStudio/wiki/Marble-Maze) sample (currently still just XNA but easily upgradable), the [**AudioManager**](https://github.com/SimonDarksideJ/XNAGameStudio/blob/803e678597b103c499c2f9c3a7128753292105bf/Samples/MarbleMaze_4_0/Assets/Code/Misc/AudioManager.cs) demonstrates a simple-to-use system, where a single component controls all audio for the game.  No other game code updates or initializes it as it runs in the background of the game as a Component.

Very useful for such scenarios.

### Drawable Game Components

![MonoGame Drawable Component Order of Events](/assets/img/posts/20231028/MG-DrawableGameComponent.png)

Drawable Game components extend the base Game Component architecture by also subscribing to the Content and Draw calls from the main Game library automatically, the biggest benefit here is that they are totally automated and draw in the order they were added to the Games "Components" list.

A great example of these is the [**Particles2DPipeline**](https://github.com/simondarksidej/XNAGameStudio/wiki/Particles-Pipeline) sample which builds on top of the excellent 2D Particles sample and demonstrates some complex particle systems which are dynamic due to their use of Components, as shown in the [Particles 2D Game class](https://github.com/SimonDarksideJ/XNAGameStudio/blob/803e678597b103c499c2f9c3a7128753292105bf/Samples/Particles2DPipeline_4_0/Particles2DPipelineSample/Particles2DPipelineSample/ParticleSampleGame.cs#L98) where the effects are loaded based on a set configuration, which can be changed.

Ultimately, these are then activated and disabled to change how the effects are demonstrated with minimal changes to the actual game code.

## Check the samples

The [XNAGameStudio Archive](https://github.com/SimonDarksideJ/XNAGameStudio) contains all the previous XNA examples and more, most are still in their XNA format but are easily upgraded to MonoGame by copying out their Game code and assets, a few have already been [upgraded to MonoGame already, here](https://github.com/SimonDarksideJ/MonoGameSamples).

> Although at the time of writing, only the [GSM Sample](https://github.com/SimonDarksideJ/GameStateManagementSample) has been updated to MG 3.8.1, it is a work in progress and a lot of effort to maintain.

But in all cases, you can walk the code and see the various patterns that demonstrate the MonoGame events in action.

The sample [included with this article demonstrates](https://github.com/SimonDarksideJ/MonoGameExecution) the events described and shows how often events are fired.  It also outputs the events to a **CSV** file in the Game's run folder (by default ```/bin/Debug/net6.0```).

## Summary

A very theological article to give you more of an understanding of what goes on under the hood of any MonoGame project and some hints if you specifically need to know when a piece of code will be executed and run.

Hopefully, this will aid you on your MonoGame journey.
