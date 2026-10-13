---
layout: post
read_time: true
show_date: true
title: Building and testing "Smarter" with Unity
date:   2021-06-17 13:38:43
description: Opening up the doors to automation for Unity3D and all the advantages it can bring.
img: posts/20210708/automatic-1-.jpg
tags: [azure, automation, unity3d]
author: Simon Jackson
github:  
---

A walk-though guide to automating your Unity builds for Free (or paid) to help you get working smarter and not harder when building for Windows, iOS, Android or whichever platform you are building for.

<video class="gif-video" autoplay loop muted playsinline poster="/assets/img/posts/20210708/source-3-.jpg" aria-label="Monty Python and the holy grail nights &quot;Run away!!&quot;"><source src="/assets/img/posts/20210708/source-3-.webm" type="video/webm"></video>

_Everyone's first reaction to the mention of Automation_

Automation it would seem, is one of those big unsurmountable goals for small projects, considered to be something only the big software houses do and seen as the holy grail (see what I did there) of software maintenance.  However, it is very accessible to projects large and small, providing untold riches for those brave enough to stick their toe in to.

In this series of articles I will go through several of the quick-fire options for getting your Unity project automated for builds, tests and all manner of helpful tricks.

## But what exactly is automation?

<video class="gif-video" autoplay loop muted playsinline poster="/assets/img/posts/20210708/giphy-1--2.jpg" aria-label="Joey from Friends joining in a joke he obviously does not get and frowns"><source src="/assets/img/posts/20210708/giphy-1--2.webm" type="video/webm"></video>

Have you ever been sat at your machine waiting for your Unity build to finish, unable to even start to tinker with the next big thing to add to your project because Unity is locked up and working, or wondering if the next change you make will break your fantastic hoop throwing technique and crash your game?  Well, you are not alone.

The short answer, Automation provides a way to offload your builds to someone else to handle while you get back to coding.  You get your project to the point where you need to test it, preferably on a device and then pass it on to someone else to do the donkey work of building it. (Even building MULTIPLE platforms at once)

![A flow diagram showing a unity project, checked in to source control to be picked up by a cloud agent to be processed and built for several platforms](/assets/img/posts/2021/07/image.png)

_Taking your project through source control and having a cloud build process turn it in to packages_

The slightly longer answer is that automation provides several mission critical operations that are "Automated" on a server, such as:

- A way to add reliability to your project, to add as many checks and measures as you need to ensure your build is fit for purpose.
- Gives you the ability to build / test and deploy many platforms from a single process.
- If you wish, you can even automate publishing of your project to test platforms (e.g. Testflight or Appcenter) or even direct to stores.
- Add reporting, monitoring and logs, as well as operational dashboards as to the health of your project.

While all of these things are possible, you only need implement as much as you need and then just keep adding to it over time.

In short, for even the smallest projects, Automation can be a life-saver, but you do need to invest a little time (and sweat) in to getting it set up.

## How do you go about setting up automation? Is it expensive?

<video class="gif-video" autoplay loop muted playsinline poster="/assets/img/posts/20210708/giphy-3--1.jpg" aria-label="Little girl reading a bill with a headline &quot;when you cannot afford anything&quot;"><source src="/assets/img/posts/20210708/giphy-3--1.webm" type="video/webm"></video>

The answer, as usual in these cases is "It depends".  If you want speed and lots of features, then you could end up with a budget for maintaining your Automation services.  HOWEVER!, there are also many **FREE** services available and it is up to you whether you ramp up over time.

Here are some of the providers of backend services to support your Automation:

- GitHub Actions<br>Built directly in to GitHub and offers a free tier of automation with many different options. Offers paid tiers for intensive or long running operations.
- Azure DevOps<br>Cloud hosted automation with the ability to "plug-into" most source control systems and offers extensive options for integration. Includes a Free tier with many scale out/up options.
- Jenkins<br>Opensource automation software for hosting on your own hardware with a vast community of supporting developers.
- Bitbucket Pipelines<br>Similar to GitHub Actions and focused on Atlassian services.

> What about Unity Cloud Build?
>
> At the time of writing, Unity cloud build, while useful is still very limited on platforms and the amount of testing, integrations available.  But I will update as it matures.

The deployment of each of the offerings can be on your (or another) PC, Cloud hosted or anywhere in-between, depending on how much you want to get out of the automation. About the only cost which is absolute, is how much time you want to invest in setting everything up and maintaining your automation services.

## How long is this going to take me?

<video class="gif-video" autoplay loop muted playsinline poster="/assets/img/posts/20210708/giphy-1--1.jpg" aria-label="Man running out of time within a clock"><source src="/assets/img/posts/20210708/giphy-1--1.webm" type="video/webm"></video>

Setting up automation can take anywhere from a few hours to a couple of days, depending on how far you want to take it.

- Setting up a build for a single platform - about an hour
- Setting up builds for multiple platforms on the same box (e.g. Windows Or Mac) - A couple of hours
- Setting up builds for multiple platforms on several boxes - about a day
- Creating automated tests and including them in your pipeline - a day to learn, minutes to implement
- Integrating with Build/Testing deployment systems (Testflight/AppCenter) - about a week, give or take.
- Time saved from not having to wait for builds or figuring out "what went wrong" - Between 5 to 20 cups of coffee a day.

It is completely up to you how much you invest, but for each investment the return (on average) is more than 10 times what you put in, in some cases MORE, as you can continue to work while the automation/builds are running.

## What is next?

Now that I have hopefully whetted your appetite, here is what you can expect over the next few articles:

- Entry level introduction to using Azure DevOps
- Setting up GitHub Actions for your Unity project
- Advanced automation with Azure DevOps
- Tips'n'tricks for Automation

> (I will add the direct links to each article as they turn up)

I hope you find these articles valuable, as they have done for me in setting this up far and wide now, and now, on with the show.

<video class="gif-video" autoplay loop muted playsinline poster="/assets/img/posts/20210708/giphy-3-.jpg" aria-label="John Cleese, Monty Python, &quot;Please go on, this is the least fascinating conversation I have ever had&quot;"><source src="/assets/img/posts/20210708/giphy-3-.webm" type="video/webm"></video>

I apologize in advance for all the Monty Python references, I've been locked away in a box trying not to be seen for what feels like ages......
