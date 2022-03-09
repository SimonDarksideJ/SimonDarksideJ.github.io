---
layout: post
read_time: true
show_date: true
title:  Transforming a blog
date:   2021-06-26 13:38:43
description: The first step in fixing a problem is realising you have a problem and getting off your old blog.
img: 
tags: [Azure, Automation]
author: Simon Jackson
github:  
mathjax: no
---

<p>The first lesson you learn when researching or implementing devops (Developer/Operations, two sides of the coin working "harmoniously") is that nothing is Free. You want to push your builds up to the cloud, have a bunch of processes tell you how great your code is and push out all your builds to the right places, the problem is that in order to get the cloud to do all this work you need resources, time and sme grunt work.  <strong>HOWEVER</strong>, if you are willing to offer up some of those resources yourself, you can actually get away with paying nothing to your cloud masters.</p>

## TL;DR;

* If you have spare hardware or enough power in your PC, you can use it as an Azure build machine
* Impact to your PC setup is minimal
* No Azure runtime costs, all within the FREE allocation given to all accounts.
* Options to scale up as you need
* You can use Unity Personal, so no Unity cost either (all other options require Pro)

## Why do this?

Automation is primarily a safeguard, it is there to double check your work, ensure your project builds for all the platforms you need it for and ensures you are not going to get tripped up later on down the road.  Additionally, it gives you the option to generate builds for multiple platforms automatically and seamlessly (provided your build completes), but it also offers so much more.

> Check out my previous article for more details **insert Link Here**

## Requirements

Getting started is easy, although the setup is a little cumbersome, especially to those who are unfamiliar with how DevOps works in general, but this article will walk you through all the dark corners to get you up and running.

* Sign-up for a Free Microsoft account if you do not have one already
* Sign in to and register for Microsoft Azure
    You will be asked for payment information, but do not worry, this is primarily for identification and "just in case".
* (optional) A Windows build machine for supported Windows Build targets (standalone, Android, UWP, etc), setup for how you want to build your project.  
    This can be your main development machine (it will run in the background) or another PC
* (optional) A Mac build machine for supported iOS build targets which can also run in the background.
* A stress ball or toy, to give a good squeeze when you have to repeat a step several times over (It will happen, still does to me)

This article will cover configuring everything before setting up your build machine as I will cover each platform in separate articles to keep things tidy and clean.

## Sign up for a free Microsoft Account

All of Microsoft's services require you to use a Microsoft account, if you already have one you can skip this step.  They are free accounts and you do not need to use it for anything else if you do not want to.

> I highly recommend making sure your account is secure and setting up 2FA (two factor authentication), as you should for any account on the web these days.  If your personal account is not using 2FA, you should enable it.

Simply visit [**https://signup.live.com**](https://signup.live.com) to register for an account.

You can use your existing email address or register for a new Microsoft email which also gives a bunch of other free services such as Mail, Teams and so on to use if you wish.

Screenshot

## Enter the world of Azure

Once you have your Microsoft account, simply visit the [Azure portal page](https://portal.azure.com) to begin your new journey.

<p>Screen shot</p>