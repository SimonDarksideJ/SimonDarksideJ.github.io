---
layout: post
title: HLSL Development Cookbook - a review
date: 2013-08-02 16:25:21
tags: [book review,shaders]
---

While finally getting back round to my game development roots another interesting book crossed my desk which delves into the mysterious and sometimes scary world of shaders.

I only have an appreciation for what is going on under the covers to create the mind blowing effects that only come from mucking around in the graphics streams on the graphics card.  XNA did a lot of this for us with 5 built in shaders that gave us a leg up and provided most of the basic effects used in common games.

To really make your game shine and look impressive, you need to have a good understanding of shaders, even if you only intend on using the many resources out there to enhance your game, it helps to understand how and why these things work.

- (http://www.packtpub.com/high-level-shader-language-development-cookbook/book)

## [HLSL Development Cookbook](http://www.packtpub.com/high-level-shader-language-development-cookbook/book)

So if you want to know more about what goes on under the covers and start making / enhancing your own effects, read on.

* * *

The HLSL Development Cookbook is targeted for intermediate or experienced developers in the land of shaders so some up front knowledge is needed to get a real appreciation of the tips and tricks contained within, not to worry though if you are a noob or beginner then check out Riemers HLSL tutorial to get yourself up to speed on the basics – [http://bit.ly/13stnxW](http://bit.ly/13stnxW "http://bit.ly/13stnxW").

This book, like many cookbooks is a heavy set reference for shading techniques and explanations of some generic lighting and post processing effects, what makes it good is that it leads you down a very direct path to understand exactly how these effects work and what makes them tick, leading you to try and test your own techniques and improve on them or create new shaders.

An appreciation I got from reading this book is an understanding of how some effects are made and what inputs are needed to simplify their application, this puts me in good stead when I am reading through Nvidia and AMD’s shader libraries looking for what I want or to keep things simple for just the effect I am looking for.

I digress, so what can we look for in this book.

* * *

Here is a brief run through what all the chapters are and what to expect from them.   The book is laid out like a traditional HLSL cookbook breaking down effects and showing how each component works and its end effect on the resultant output.

### Chapter 1 “Forward Lighting”

Lighting is one of the most basic and commonly used shader techniques, after all without light there would only be darkness (which is only good for audio games ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile-2.png)), this chapter goes in to some depth on the main basic lighting systems used in games today, such as:

- Hemispheric ambient light
- Directional light
- Point lights
- Spot lights
- Capsule lights
- Projected textures – point & spot lights
- Multiple lights in a single pass

Through this chapter you will learn what you need to know to light up your scene and the models within it.

Image courtesy of [Riemers HLSL tutorial](http://www.riemers.net/eng/Tutorials/DirectX/Csharp/Series3/The_first_light.php)

- (http://www.riemers.net/eng/Tutorials/DirectX/Csharp/Series3/The_first_light.php)

### Chapter 2 “Deferred Shading”

Deferred shading is one of those advanced techniques to light a scene in a more efficient and performant way by calculating all lights at the same time without the limitation of the geometry that it is being applied to, sounds great but a lot trickier to implement than standard lighting especially since it takes multiple passes within the shader to accomplish.

In this chapter the author does a good job of explaining all the parts needed to achieve deferred rendering and how best to implement it with also a few tips and tricks to go beyond, covering things such as:

- GBuffer generation and unpacking
- Deferred Directional, Point, Spot and Capsule lights

Some really nice examples of these effects (courtesy of @NemoKrad [RandomChaos blog](http://xnauk-randomchaosblogarchive.blogspot.co.uk/2012/07/deferred-lighting-teaser.html))

- (http://xnauk-randomchaosblogarchive.blogspot.co.uk/2012/07/deferred-lighting-teaser.html)

### Chapter 3 “Shadow Mapping”

So far the book has covered how to add light, as expected we also need to be able to work by subtracting light to really show off how elements in the game are affected by the environment they are playing in (just ask Peter Pan what he thinks of his own shadow!).

Shadow mapping allows you to give the effect that the player is in an actual real world, without it games generally look flat (even 2D ones).  Through this chapter you are shown several techniques to generate shadows.  As with everything else there is no one silver bullet to solve a problem like shadows so it is really good the author offers some of the main solutions.

Techniques you will learn include:

- Spot & point light PCF (percentage-closer filtering) shadows
- Cascaded shadow maps
- PCF with varying penumbra size
- Visualizing shadow maps

Some really nice examples of these effects (courtesy of @NemoKrad [RandomChaos blog](http://xnauk-randomchaosblogarchive.blogspot.co.uk/2012/07/brute-force-2d-shadowswell-sort-of.html))

[Watch the video on YouTube](https://www.youtube.com/watch?v=VGeC5HYN0k0)

### Chapter 4 “Postprocessing”

Now that you have a rendered scene in your game it is always good to add those extra special effects to make your game shine, like adding a blur effect to objects not in focus, motion effects when you are moving fast or really shiny glow effects (really good for explosions ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile-2.png)), this is where post processing comes in.

Ask any photographer worth his salt about post processing and they will likely chew your ear off for hours, those final touches you add to a scene that make it live.

Postprocessing can make all the difference from a game people go WOW about to one they just go “meh” and walk on by and this applies to all games.  Some devs do some of this work in advance by baking the textures to be used in the game but even then some additional effects are needed to blow them up.

The most common post process effects are covered in this book in great detail:

- HDR rendering
- Adaptation (adjusting lighting from bright to dark spaces)
- Bloom
- Distance depth of field
- Bokeh (handling distant lighting)

Some really nice examples of these effects (courtesy of DarkOmenGames on the  [RandomChaos blog](http://xnauk-randomchaosblogarchive.blogspot.co.uk/2012/07/nebulon-in-play-test.html))

[Watch the video on YouTube](https://www.youtube.com/watch?v=mKhoI9HbKig)

### Chapter 5 “Screen Space Effects”

Screen space effects are another class of post processing which focus on elements that affect the entire scene (usually from a single element, like the sun).  Some see them as just another Post process, others see them as a particular form of advanced shading, in either case it is a very useful technique to have under your belt especially if your game is featured in space or the great outdoors.

Of the main types of “screen space effects” this book covers:

- Ambient occlusion
- Lens flare
- Screen space Sun rays
- Reflections

Some really nice examples of these effects (courtesy of @NemoKrad [RandomChaos blog](http://xnauk-randomchaosblogarchive.blogspot.co.uk/2012/07/crepuscular-god-rays-and-web-ui-sample.html))

[Watch the video on YouTube](https://www.youtube.com/watch?v=toS1n_VHLRI)

### Chapter 6 “Environment Effects”

So we have our nicely lit and rendered scene in HD but would not it also be nice to alter and change how things look in the scene on the fly, or have the textures on the objects on our scene altered by other effects, this is generally referred to as Environmental effects, the most basic of which would be a rain effect since rain distorts light when viewed through it and leaves a smear as it goes.

These are fairly advanced techniques for altering the environment based on another texture or set of rules.

Here the author nicely rounds off the book with the following techniques:

- Dynamic decals
- Distance/Height-based fog
- Rain

Some really nice examples of a fire environmental effect (courtesy of @NemoKrad [RandomChaos blog](http://xnauk-randomchaosblogarchive.blogspot.co.uk/2012/07/generic-xna-fire.html))

[Watch the video on YouTube](https://www.youtube.com/watch?v=ywhEuMNF19c)

* * *

Shaders are one of those subjects that is hard to get in to and even harder to master, it is practically a specialty in its own right so I was nicely surprised how well the author broke down what each effect was meant to achieve and how to implement it.

#### Pros:

- Great introductions and explanations of the effects covered
- Complete projects available to download for each effect
- Does not overload you with detail, keeps things simple

##### Cons:

- The book only covers the shaders themselves not how to implement them (although the examples do, they are in C++ only)
- Not all chapters have a visual example of the effect you are creating so hard to visualise (but you can figure it out)

* * *

Even with my rudimentary shader knowledge I was able to understand the workings of each shader detailed in this book (even without googling), if you are a beginner just refer to [Riemers](http://www.riemers.net/) tutorials or the fantastic set of beginner HLSL tutorials on [GameDevTuts](http://gamedev.tutsplus.com/) and you will be ready for the techniques in this book.  I feel it goes in to more detail but not too much (there is little math involved, phew) to help you appreciate just what your graphics card is doing to the output from your game.

What you waiting for, get ready to make your game shine, whether you are 2D or 3D ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile-2.png)

[HLSL Development Cookbook – packtpub](http://www.packtpub.com/high-level-shader-language-development-cookbook/book)
