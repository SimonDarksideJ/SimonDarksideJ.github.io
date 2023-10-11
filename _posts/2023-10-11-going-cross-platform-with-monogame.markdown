---
layout: post
title: MonoGame, meet VSCode
date: 2023-09-23 00:00 +0000
description: The fastest way to get started with MonoGame is to install VSCode and from there install the tools, everything in one place!.
img: posts/20231011/title.gif
category: MonoGame
tags:
- game development
- xna
- monogame
author: Simon Jackson
github: https://github.com/MonoGame/MonoGame
mathjax: false
---

![Coding is Life](/assets/img/posts/20231011/01-goingforglory.gif)

> TL;DR -> Today, cross-platform projects are easy to setup (except UWP), with .NET7, it gets easier.  Read the article for the How-to!

Most Game projects when built are solely for a single platform, usually the same as the development machine they are being built upon.  Only later does the idea surface to maybe ship to another console, handheld or platform arise which then highlights issues in the games implementation that can lead to issues.

> You CAN just build and ship to one platform, there is no issue with that, but if you are possibly considering more than one, plan ahead!

* [Choosing your path](#choosing-your-path)
* [Sharing the code](#installing-the-extensions)
* [Interfaces are your friend](#the-net-sdk)
* [Code first for platforms](#installing-monogame-and-creating-your-new-game)
* [Shared content](#monogame-start)
* [My content is my content](#build-and-test)
* [Handling multiple content paths](#the-content-pipeline)
* [Building the project with DotNet commands](#debugging)

## Choosing your path

If you create a MonoGame project for a single platform, you get a single project with a single content project, life is simple and your concerns are lite.

Once you consider adding another platform, there are a few considerations to take into account, namely:

* How to share code that is common between all platforms.
* How to structure code that is common (e.g. achievements) but have different implementations on different platforms (e.g. Steam, Xbox, etc)
* How to manage code specific to platforms.
* How to share content that is common between all platforms.
* How to structure content specific to a platform.
* Do I also need to consider multiple styles per-device (high-res, low res), but granted this is also a consideration for single-platform games.
* Will I have enough hot beverages and snacks to keep my mind at ease through all this stress.
* Cats, if not my own, the neighbours cat will wander in and steal all my code.

Granted the last is a bit of a fringe case but very dramatic when it happens, and for reference, this never happens with dogs as they just want to cuddle your feet or sit in your lap. "Just say'in"

It can seem a lot to take in, but let us walk through the major points step by step and then walk-through generating our project ([Click here to skip ahead if you like](#building-the-project-with-dotnet-commands))

## Sharing the code

![Coding is Life](/assets/img/posts/20231011/02-sharing.gif)

No one likes to write the same code twice, let along keep writing it or copying it multiple times across multiple projects, so when you are planning for multi-platform games, you need to identify any and all code which will be the same across all the projects (which is usually about 90% of your code) and then find a pattern that works for you to ensure you write it once, no matter the platform it is running on.

When it comes to sharing code, there are three patterns to consider, each with their pro's and con's:

|![Linked Files](/assets/img/posts/20231011/03-linkedfiles.png)|![Class Library](/assets/img/posts/20231011/04-classlib.png)|![Shared Lib](/assets/img/posts/20231011/05-sharedlib.png)|
|-|-|-|
|Manually linked files between projects|A single class library|A single Xamarin 'Shared' Library|
|Pros|Pros|Pros|
|Simple|Most effective|Includes content|
|Cons|Cons|Cons|
|Can be hard to maintain|Does not support UWP, Yet! (see .NET8)|May be deprecated in the future|

Each of the options are easy to implement and run with, although Linked Files can become harder to manage the larger your project becomes, essentially because when you add a new class file, you have to remember to manually add it to all projects (or write a script to do so).

> I Recommended to use a .NET Shared library for now unless you need UWP (Windows 10/11/Xbox Xaml), then use a shared library for now until the .Net8 upgrade.

## Interfaces are your friend

## Code first for platforms

## Shared content

## My content is my content and you can try to pry it from my claws

## Handling multiple content paths

## Building the project with DotNet commands

## Summary
