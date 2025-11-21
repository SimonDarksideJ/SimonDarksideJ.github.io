---
layout: post
title: A new breed of samples for MonoGame
date: 2014-04-14 14:03:12
tags: [monogame]
---

[![ku-xlarge](/assets/img/wordpress/2014/04/ku-xlarge.jpg)](/assets/img/wordpress/2014/04/ku-xlarge.jpg)

One common question surrounding MonoGame has always been the quality of the samples currently maintained in the various branches of the project.

Being an opensource project this has always been a challenge to manage and maintain, sure there are a lot of samples provided by many hard working developers but they were very sporadic and not always kept up to date (some it was noted, don’t even run any more)

Seeing this, the core MonoGame team set out with a purpose to being a new samples repository for the project. Its goals were simple:

- The samples had to be of high quality
- They had to work on ALL platforms not just one
- Best practice had to be used where possible
- They had to be testable and re-usable to test the latest builds (builds may not pass if samples tests failed)

It has been an ambitious journey, with a lot of in depth discussions and debates, but now the first of the samples has just been accepted in to the new Samples Repo.


## [https://github.com/Mono-Game/Samples](https://github.com/Mono-Game/Samples "New MonoGame Samples Repository")

The first sample is just a taste of what is to come and is born of the already tried and tested [Platformer 2D sample](http://msdn.microsoft.com/en-us/library/dd254918(v=xnagamestudio.31).aspx "XNA Platformer 2D samples") from the age old XNA library.

The sample itself isn’t too much to should about as it only implements basic rendering, input and audio capabilities. However it is laid out in such a format and is working on ALL supported platforms, including:

- Android
- Linux
- MacOS
- Ouya
- PSM
- Windows Phone
- Windows 8
- WindowsGL

The sample serves as a guide for how to build and manage your game project in a fully multi-platform way with all the code in one place and shared across all projects.

If the platform supports NuGet, then the platform is using the latest MonoGame 3.2 NuGet package. Where NuGet support isn’t available, it references back to the main dev repository (which you’ll need to manually link until the new samples repository is fully integrated with the main repo)


## More to come

The new samples repo isn’t stopping there of course and we welcome anyone to submit new samples to the project so long as they meet the criteria mentioned earlier.

Come one, come all and get involved!

