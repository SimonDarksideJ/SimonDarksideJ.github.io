---
layout: post
title: XR Showcase
date: 2025-03-04 00:00 +0000
description: With time on my hands its time to showcase what I have been up to.
img: posts/20250304/title.gif
category: XR
tags:
- xr
- ar
- unity3d
author: Simon Jackson
github: ""
mathjax: false
---

> TL;DR -> XR is an interesting space with lots to offer, but it is not for the faint of heart as there are many challenges ahead.   Checkout my solutions that are live in the market, **not fake demos**.

In a showcase of my recent efforts, I thought I would share some of the experiences I have been working on. Each has brought its own challenges, from dealing with engines and software, tackling complex integrations between vendor SDK's and achieving the desired implementation, to the often confusing requirements set down by customers or sales.

> These solutions are all native solutions built using Unity 3D to achieve the best performance and meet demanding customer needs.  Whilst WebXR does show promise, it is still missing key features in public browsers (those not requiring complex advanced options to be enabled) to make them functional.  Although I always keep expanding and experimenting with alternate technologies (such as React Native) to give more options in delivery.  But above all, I aim to be realistic in the capabilities of any technology.

To begin, I will highlight some of the entertainment experiences or information booths that are often required to show a person or character that can interact with a user, impart some critical information or just to have fun.

Two such examples below use very different techniques to convey a message.

## Showcase 1 - 2D Digital Holograms

The first showcase is A 2D hologram of a person delivering a speech or conversation piece, utilizing several techniques to record, place and then play back the message.

The solution even goes so far as to be able to enable anyone with a mobile device to record their own video and place themselves in space, which is a crucial defining factor to allow everyone using the solution to create their own content and fun.

> I personally created an entire scene using multiple holograms of me fighting myself with a sword to win a fair maidens heart.

When users engage with lifelike characters, it creates that "appear" in space, they form a better connection with the content over using a traditional photo (and infinitely more repeatable than having some pour soul wait at the door for every attendee).

<video controls width="500" height="400" preload="metadata">
	<source src="{{ '/assets/img/posts/20250304/2DHolograms.webm' | relative_url }}" type="video/webm">
</video>

| :---: |
| **Reality verses the digital Universe, as a 2D human hologram faces off against a 3D character** |

On the left is a video recording that has been transcribed into a 2D hologram and on the right is a 3D character model.

## Showcase 2 - Digital Interactive Characters

The second showcases a 3D animated character with several interactive components. While on the surface this may look like a simple designed character, but behind the scenes it is fully configurable, speech is through any downloaded audio file with lipsync used to keep the mouth and poses moving, subtitles can be downloaded or generated. If customers want to update or change the character, this can be done remotely as the entire experience is run through configuration.

Characters can provide a varied range of interactions from:

* A fully interactive experience such as a treasure hunt, a simple AR game or interactive back-and-to conversations.
* Simple snippet speeches about achievements or history.
* Enact poses so that users can get photos taken with characters, although only though the back facing camera as AR selfies are sadly not a thing yet.

Depending on the scope of the project, characters can be embedded within the solution (to simplify download, especially in poor network areas), or like Web style projects, the assets for the character can be downloaded to the device (which also allows updates to characters without a new app release) for playing.

I have always focused on reusability and delivering frameworks to build such interactivity, this creates massive cost savings as newer exhibits are rolled out, as well as the ability for installations to manage their own content and not incur residual charges.

<video controls width="500" height="400" preload="metadata">
	<source src="{{ '/assets/img/posts/20250304/CharacterPromo.webm' | relative_url }}" type="video/webm">
</video>

| :---: |
| **The awesome [Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace) comes in for a chat to the Signals Museum.** |

This has been deployed to the [Signals Museum](https://www.facebook.com/signalsmuseumhsv) for their recent launch, I would highly recommend checking them out if you are in the area or planning to travel to [Hunstville, AL](https://en.wikipedia.org/wiki/Huntsville,_Alabama).

## Summary

This is just the beginning, over the next month I will share more solutions I have developed this past few years, with a few tips and tricks along the way to solve some of the more complex problems faced in real-world XR delivery.

Stay tuned for more demonstrations.
