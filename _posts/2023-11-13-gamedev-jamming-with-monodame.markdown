---
layout: post
title: GameDev jamming with MonoGame
date: 2023-11-13 00:00 +0000
description: GameDev jams are the best way to throw yourself into the deep end and try things you never thought possible, like learning a new framework/engine.  Here is a quick starter!
img: posts/20231113/title.gif
category: MonoGame
tags:
- game development
- xna
- monogame
- gamejam
author: Simon Jackson
github: SimonDarksideJ/GameStateManagementSample
mathjax: false
---

![GameDev Jam for life!](/assets/img/posts/20231113/01-gamedev.gif)

> TL;DR -> Getting started with MonoGame is easy, mastering it takes time. So, throw all that out the window and get hacking instead!

[![MonoGameJam5](assets/img/posts/image-not-found.png)](https://itch.io/jam/monogamejam5)

The [5th annual MonoGameJam](https://itch.io/jam/monogamejam5) is kicking off soon on the **30th November 2023**, which is by far one of the best ways to throw yourself into [MonoGame](https://www.monogame.net/) and learn something new:

* Your next engine framework of choice.
* Try something new and exciting (granted usually hair-raising).
* Test out some new technique or skill.
* Have fun and throw things at the screen or speakers until something sticks.

Not quite the vaulted heights of the days of [DreamBuildPlay](https://en.wikipedia.org/wiki/Dream_Build_Play) in the past, which launched the careers of so many indie devs such as [Ska Studios](https://en.wikipedia.org/wiki/Ska_Studios) with Dishwasher Samurai, Smudged Cat Games with [The Adventures of Shuggy](https://en.wikipedia.org/wiki/The_Adventures_of_Shuggy) and even Humble Hearts with [Dust, An Elysian Tale](https://en.wikipedia.org/wiki/Dust:_An_Elysian_Tail).

Bold games for a bold time, and who knows who/what could be next!

* [What is MonoGame](#what-is-monogame)
* [Understanding MonoGame game building](#understanding-monogame-game-building)
* [A great sample to start with](#a-great-sample-to-start-with)
* [Services, addons and more, oh my](#services-addons-and-more-oh-my)
* [Dream Big](#dream-big)

## What is MonoGame

![MonoGame](/assets/img/posts/20231113/02-monogame.png)

If you have been hiding under a very big rock, you might not have heard of MonoGame (unlikely, but possible).  MonoGame is a game building framework that focuses on handling all the complex requirements for shipping games on multiple platforms, such as Windows, Android, Xbox, PlayStation and so on, letting you get on with just writing code/art/shaders/etc and so on (just, hah, :P)

In short, MonoGame is a C# based Game Framework (not an engine like Unity), where you write code once, then MonoGame compiles your code for multiple platforms enabling to you spread your wings faster.

### To know more, check out [MonoGame.Net](https://www.monogame.net/)

## Understanding MonoGame game building

![Chopping up MonoGame](assets/img/posts/image-not-found.png)

Getting started with MonoGame is very easy, no matter which platform you are building from, be it Windows, Mac or Linux and the best place to get started, unsurprisingly, is the [MonoGame Getting started guide](https://monogame.net/articles/getting_started/index.html):

### [Getting Started with MonoGame](https://monogame.net/articles/getting_started/index.html)

The guides walk you through setting up your machine environment, installing the tools and the MonoGame Framework (most important) and then leading you down the basic path of writing your first game, including content.

For more details, check the [MonoGameJam5 site](https://itch.io/jam/monogamejam5) for links, or browse the [catalogue of community samples and courses available](https://monogame.net/articles/tutorials.html) on the MonoGame website.

## A great sample to start with

![MonoGame basics](assets/img/posts/image-not-found.png)

My personal favorite for any GameJam involving MonoGame is the [GameState Management Sample](https://github.com/SimonDarksideJ/GameStateManagementSample), originally from [Microsoft](https://github.com/simondarksidej/XNAGameStudio/wiki/Game-State-Management-(Mango,-C%23VB)) and updated for MonoGame.

The sample provides a simple game screen management system, ready to be used as a starting point for games on Windows, iOS, Android and more, complete with reusable code to manage all the screens (including transitions) you might need for a project.  Even including pause and options screens.  It really packs a punch.

The sample is comprised of:

|Folder|Description|
|-|-|
|Content Project|The shared content project for all platforms, not specifically required but a good reference.|
|GameStateManagement|The GameState management library, reusable in any project.|
|Platforms|Sample Platform initiator code, if you are just hacking a single platform you can ignore these.|
|SampleCode|The all-important example usage of the GameState Management library, including multiple screens, gameplay and more.|

Here is what it looks like:

|![Menu](https://github.com/SimonDarksideJ/GameStateManagementSample/raw/3.8/Assets/01-MainMenu.png)|![Options](https://github.com/SimonDarksideJ/GameStateManagementSample/raw/3.8/Assets/02-Options.png)|
|-|-|
|![GamePlay](https://github.com/SimonDarksideJ/GameStateManagementSample/raw/3.8/Assets/03-GamePlay.png)|![Pause Screen](https://github.com/SimonDarksideJ/GameStateManagementSample/raw/3.8/Assets/04-Paused.png)|

Enough to get you started on your Hack without worrying about all that on screen "menu" stuff.

### [The GameState Management Sample](https://github.com/SimonDarksideJ/GameStateManagementSample)

## Services, addons and more, oh my

If you are thinking bigger than a simple paint program or block pushing game, you might want to add things like Physics, Saving and Loading, AI, Effects and more.  Thankfully the MonoGame community has your back with a wondrous collection of resources, libraries and tools available:

> I might suggest having a glance through the list below BEFORE the hack to pick your favorites, there are a LOT!

* [The Awesome MonoGame library of "stuff](https://github.com/aloisdeniel/awesome-monogame) - Chock full of links to stuff that will keep you going.
* [Nuget](https://www.nuget.org/packages?q=monogame) (pronounced NewGet) - The place to look for dependencies to add to your project (it is also where MonoGame is hosted).  Just add a reference to your project and get the latest version quick and easy.
* [The MonoGame Community tutorials list](https://monogame.net/articles/tutorials.html) as previously mentioned, a one stop shot of promoted materials from MonoGame by the community. (insert your name here if you also have stuff to shout about)

And much much more!

## Dream Big

![Building big things](assets/img/posts/image-not-found.png)

Like most GameJam's, the theme is yet to be announced but that's not to stop you getting a blank slate ready and getting some quick reading done.  In this ever-expanding world of AI nothing stopping you from asking your robot overlords for help (yes, they even help with MonoGame code) in sculpting your dream, above all, have fun, learn well and put your best thumb forward!
