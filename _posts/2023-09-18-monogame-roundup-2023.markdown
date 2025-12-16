---
layout: post
title: MonoGame roundup for 2023
date: 2023-09-18 14:00 +0000
description: Setting the record straight on MonoGame, past, present and more importantly, its future.
img: posts/20230918/title.gif
category: MonoGame
tags:
- game development
- xna
- monogame
author: Simon Jackson
github: MonoGame/MonoGame
mathjax: false
---

![The GameDev cycle](/assets/img/posts/20230918/01-gamedevsleep.gif)

> TL;DR -> MonoGame rocks and continues to be one of the best open-source frameworks for building games.

Making games is hard enough (or the most fun you will ever have) without the worry of the Framework or Engine you use either being cancelled or changing the terms of its use in the future, which can provide uncertainty for the years of effort you put into making your dream a reality that everyone can play.

Whether it is an open-source project or a paid development solution, it is hard to choose the right option that will ensure your investments are secure.

Thankfully there are quite a few engines and frameworks available today that do fit that bill:

* They have been around for many years.
* They are open source or give you access to their code. (Ensuring if they did disappear, you still have what it takes to build).
* Have a growing community ready to help at a moment's notice.

The Framework of discussion today is MonoGame, which despite all talk to the contrary is very much alive and well.

* [What is MonoGame?](#monogame)
* [What is the MonoGame Framework?](#the-monogame-framework)
* [Where is the MonoGame Community](#the-monogame-community)
* [What is the MonoGame toolset and getting started](#the-monogame-toolchain)
* [MonoGame Extensions](#extending-monogame)

## MonoGame

![MonoGame](/assets/img/posts/20230918/HorizontalLogo_128px.png)

MonoGame is a game development framework born from an implementation pioneered by Microsoft around 2004 called XNA (no acronym), it brought the dream of building games for Windows and Xbox (and later phones) using C#, it was a breath of fresh air and made programming games a breeze.  Sadly, XNA was discontinued by Microsoft but was reborn as MonoGame.

XNA had made such an impact, that the community was just not willing to let it go, and today it flourishes.

Now, MonoGame is a Framework (not an engine) and its power lies in the original XNA implementation that abstracts (hides) the underlying complexity for making code, graphics, sound and the myriad of other technologies required to run a game on a multitude of platforms.  Which means that you code your Game once and then you can run it on any of the platforms that MonoGame has an implementation on (much like how Unity / Unreal and GoDot work today, but arguably XNA did it first for C#).

![MonoGame Framework](/assets/img/posts/20230918/MonoGameFramework.png)

In basic terms, you write your game using MonoGame's implementation and it then generates a project to deploy on your target platform.

> Contrary to some writers beliefs, Like the swan on the lake, there may not seem much movement on the water, but underneath, there is furious paddling going on to keep it moving.
>
> P.S. I tried to find an appropriate GIF to demonstrate this and failed, for that I am sorry.  The best I could find was a worried cat learning to swim :S.

## The MonoGame Framework

![MonoGame lives!](/assets/img/posts/20230918/iamalive.gif)

One thing that keeps coming up from time to time, and sometimes confused with "MonoGame is Dead", is that the XNA implementation used in MonoGame (the language and structure) has not changed for years, which is very true (much like a car has 4 wheels, doors and an engine), the "front end" of MonoGame, for the most part, has remained the same since XNA 4.0 (the last iteration of XNA).  This is not to say nothing has changed, but rather it has remained stable and secure, what you wrote 10 years ago, will still run today (with the obvious caveats for minor critical changes).

Where MonoGame evolves is all the hard work and underpinnings to MAKE your game run on all the other platforms, handling the complexities for how Audio works, how graphics are drawn to the screen, and the vast technologies involved for different devices on a multitude of platforms.  **This is no mean feat** as vendors are constantly updating, changing and maintaining their platforms and "just expect" developers to keep up or be left out in the cold.

So as MonoGame evolves **YOU DO NOT NEED TO CHANGE YOUR GAME**, what you have written and the MonoGame features you use will continue to work, it will just work differently on the target platform when it is eventually compiled (built).

> In fact, MANY of the original XNA Game Studio 4.0 samples and code **STILL WORK** today, that is how strong MonoGame is!  Check it out for yourself from the [XNA Game Studio Archive](https://github.com/SimonDarksideJ/XNAGameStudio)
>
> Just be aware, that XNA 1, 2 and 3 samples WILL need updating to XNA4/MonoGame to actually work (it is not magic after all).

This is not to say you never need any vendor platform code at all in your project (MonoGame cannot build for EVERY feature), for instance, if you want to use Apple's notification system and Google's notification system in your project, you will still need to handle that, but thankfully C# makes that easier with platform dependent code (again, much like how other engines/frameworks do).

## The MonoGame Community

The MonoGame community is **VAST**, and as previously stated, most XNA/MonoGame books that have been written since **2010** will still continue to be valid and worthwhile (now find me an engine/framework that can say that).  About the only thing that has changed (due to the underlying features mentioned above) has been how you install MonoGame and how you build with it, but more on that later.

![MonoGame Get Started](/assets/img/posts/20230918/MonoGameGetStarted.png)

Amongst MonoGames community weaponry it includes:

* [A very active community site for Questions, Answers and showcases](https://community.monogame.net/)
* [Loads of official and supported community sites](https://docs.monogame.net/articles/tutorials.html)
* [Lots of articles full of useful tips from Community members](https://community.monogame.net/t/new-here-read-this-now-with-menu/19063)
* [An active Discord site with tons of threads to choose from](https://discord.com/invite/monogame)
* (My favourite) [The entire catalogue of XNA samples and MonoGame content all preserved on GitHub](https://github.com/SimonDarksideJ/XNAGameStudio)
* [Awesome-MonoGame](https://github.com/aloisdeniel/awesome-monogame) - A **MASSIVE** list of MonoGame resources which is continually updated (5 Hours ago at the time of writing, in 2023 no less)

And so much more, since any XNA content is also valid (from the coding side) and about the only real difference from the XNA days is how the content pipeline is used (which is totally optional).

## The MonoGame Toolchain

![MonoGame tooling](/assets/img/posts/20230918/MonoGameVisualStudio.png)

The MonoGame toolchain has gone through many iterations since its first release, always moving with the times and updating to modern technology, from Separate plug-ins to Visual Studio extensions and in the past year, updated to use the .NET Runtime and toolset.  with each iteration, the API remains the same, so existing projects are not broken, but under the hood, things keep advancing.

And MonoGame does not stop there, still planning ahead and looking further into the future as technology evolves, talk is already well underway for a .NET 8 upgrade which brings even more cross-platform capabilities and (if reports are true) faster compilation and execution (your game goes faster).  There is even talk that with the next .NET upgrade, tools such as [BRUTE](http://brute.rocks/) (which provides C++ compilation to some AOT native platforms, such as Switch) could even be retired. (depending on the capabilities published by Microsoft)

For today, MonoGame 3.8.1 (and beyond) are all based on the .Net Runtime and getting started is as simple as:

1. Install the latest [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) (comes with Visual Studio if you have it).
2. Install the MonoGame templates - ```dotnet new --install MonoGame.Templates.CSharp``` from the command-line.
3. Create a folder for your Game.
4. From the folder, create a new MonoGame project for your target platform, for Desktop OpenGL - ```dotnet new mgdesktopgl -o MyGame```
5. You now have a new MonoGame Project, go build your game.
6. When you are ready, simply run ```dotnet build``` to create a build for your game and then run it.

> For more details on getting started, check out the [documentation](https://docs.monogame.net/articles/getting_started/0_getting_started.html)

## Extending MonoGame

![Extending MonoGame](/assets/img/posts/20230918/monogameextensions.png)

One of the biggest confusions and usually the reason commentor's state that MonoGame does not change is because it **does not change** from the **outside**.  The MonoGame team persevere to ensure the API for MonoGame retains its XNA origins.  It does not change for a reason, and thanks to that, games written yesterday will continue to work today (and beyond).

MonoGame does however encourage and support community members building **ON TOP OF** MonoGame to further extend it and then helps to then promote those extensions for other MonoGame users. These can range from simple addons, to full-extending frameworks, even to engines built on MonoGame.  These Engines make full use of MonoGames platform capabilities to ship a game and focus on the parts they need to deliver an engine.

Some of the biggest out there include:

* [MonoGame.Extended](https://github.com/craftworkgames/MonoGame.Extended) - If MonoGame doesn't do it, then MonoGame.Extended extends it (pun intended).
* [FNA](https://github.com/FNA-XNA/FNA) - Not technically a MonoGame extension, more of a MonoGame competitor, but highly worth a mention, even admired by the MG team.
* [FlatredBall](https://flatredball.com/) - A full-featured game development platform built on MonoGame.
* [TiledSharp](https://github.com/marshallward/TiledSharp) - A fan of using the [Tiled](https://www.mapeditor.org/) editor for your 2D maps, then easily take those maps into your MonoGame project. Although I do see this project is no longer supported, at my last run it still worked very well.
* Many Many more (your name here).

It is funny that most engines feel the need to build up an asset store for content, but with MonoGame, GitHub is its asset store for all the things you need to extend your project.  As for content, that is accessible from almost anywhere and most of it is either natively supported by MonoGame, or "there is an Extension for that".

## Content Management

![MonoGame Content Management](/assets/img/posts/20230918/monogamecontentmanagement.png)

One of the interesting capabilities that came from XNA originally, was the idea that you could have a "Content" (asset library) project, build your assets separately to your code and live happily.  In fact, many competitors to XNA scoffed at this and said it shouldn't have bothered, yet today a lot of developers complain about how long builds take in engines because of content and look for ways to separate it.

MonoGame took the Content Project base and built its own MonoGame Build Tool which focuses on content and adds extensibility (much like XNA) so you can write custom importers and processors to handle different types of content.  You could even write your own custom level design configuration and have the entire pipeline process and generate your levels for you.  I am a big content pipeline fan and have written and shared many extensions for the Build Pipeline in the past.

However, one of the biggest myths (or debates depending on where your sticks land), is that this was the ONLY way to have content in MonoGame, which is simply **NOT TRUE**.  If you want, you can ignore the whole MonoGame Content Builder and just load content/assets and such manually in code.

> MonoGame will never seek to limit you in any way.

So whether you are a content pipeline user:

```csharp
    var myTexture = Content.Load<Texture2D>("ball");
```

Or a non-content pipeline user:

```csharp
    using (var fileStream = new FileStream("test.png", FileMode.Open))
    {
        var myTexture = Texture2D.FromStream(GraphicsDevice, fileStream);
    }
```

The path is yours and MonoGame will never dictate or tell you how to build your game.

## Summary

This post has wrangled on for a while trying to set a few truths alongside the doubters or nay-sayers who call something dead because they don't see change happening.

> Full disclosure, I have wondered the same because it sometimes takes a long time between releases.  But I work with the team, who are equally frustrated at times and things are ALWAYS in motion.  

Given no one gets paid to build MonoGame and all the supporters work in their spare time, rather generously I might add, it is still amazing how much love MonoGame gets.  But to those who still and continue to MonoGame, I salute you!

In times of upheaval, you might want to give it a whirl, load up a tutorial and try building something and it is indeed surprising how easy it is.  Even without an editor/GUI to lean on, it is amazing how visceral and close to the metal MonoGame feels. Every pixel that moves, every change that happens is directly under your control and it is surprisingly freeing.

Laters.

(Comments welcome!)

![Salute](/assets/img/posts/20230918/salute.png)
