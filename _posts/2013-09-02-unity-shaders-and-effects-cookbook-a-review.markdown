---
layout: post
title: Unity Shaders and Effects Cookbook - A Review
date: 2013-09-02 17:51:40
tags: [book review, shaders, unity3d]
---

In yet another book review in game development and graphics land, I was handed a copy of the excellent Unity Shaders and Effects cookbook.  This sturdy reference is a nice comparison to the previous HLSL cookbook I reviewed earlier.

[![ src=]()](http://www.packtpub.com/unity--shaders-and-effects-cookbook/book)


### [Unity Shaders and Effects Cookbook](http://www.packtpub.com/unity--shaders-and-effects-cookbook/book)

If anything this book shows both the amazing work Unity has put in to action behind the scenes to help designers and developers create stunning effects in their games and the differences between what you may already know and what you need to know in order to make these effects yourself.

If nothing else it is a fascinating peek under the covers for how Unity really makes a name for itself/

##Spoiler alert

Unity using Cg shaders and not HLSL shaders, so although you can learn the techniques from the previous book, you will have to reapply them in Unity, no copy and paste I am afraid.

* * *

![src=]()

The Unity Shaders and Effects cookbook is exactly what its name suggests, it is an almost complete reference guide in to the world of shaders as Unity sees it.  Anywhere is falls off there are several references for places to seek further information and in some cases even alternatives.

As cookbooks goes it wo not disappoint but you will need some intermediate knowledge of how to use Unity before reading this book (Taking the online 101 course in Unity’s learning catalogue should be enough), by the end you will be happily playing and testing your own shaders in no time and for a change, you will know what on earth you are trying to create and why.

Note, the final two chapters will require the Pro version to implement, you can learn from the techniques and apply them in a smaller scale. They both require Render Targets / Render Textures in order to function fully which is a Pro only feature I am afraid.  If you have pro, go wild!!

* * *

![src=]()

Here is a brief run through what all the chapters are and what to expect from them.   The book is laid out like a traditional cookbook focusing on each specific component and laying it out bare.


##### Chapter 1 “Diffuse Shading”

This chapter covers the foundations of a Shader, explaining how to structure a Shader in Unity3D using both the built-in shader functions and how to create your own.  It then shows you how to apply these basic shaders to models in the editor and your game with interesting results.

This serves as a great way to understand how shaders are constructed in Unity and perfect as a springboard to the slightly more complicated functions below.


##### Chapter 2 “Using Textures for Effects”

Following on from the basics, this chapter brings textures and other more complex inputs in to the mix to show you how to mold your effects.  Not just applying a texture to a model but also how to use texture information to mold the output.  Detailing and explaining how to create terrains with different texture coordinates and even creating animations with 2D spritesheets from a shader (something I have never considered before), this shows you just how much power you can offload to the core graphics component of any game.


##### Chapter 3 “Making Your Game Shine with Specular”

Here the book walks you through everything you need to know about creating the most widely used type of shader, the specular type using techniques such as Blinn and Phong. You will learn how to apply these Shader effects to create masked specular, metallic specular and anisotropic specular effects.

By the end of this chapter, you should have a good enough understanding of shaders in Unity to create your own custom specular effects.


##### Chapter 4 “Reflecting Your World”

Here the author teaches you everything from the basics of reflections in Unity3D Shaders and how to setup your own simple dynamic reflection system.  Adding reflection in to your Unity game is not the simplest of tasks but at the end of this chapter you will have a greater understanding for what it takes to make you world seem that much bigger and more alive.


##### Chapter 5 “Lighting Models”

So far the book has covered most of the generic lighting techniques to show and place models in your 3D world, here the book expands on that basic knowledge to create more specific lighting and effects at an individual level, from enhanced sphere lighting to Cloth, Skin and even paint shading, making the best use of mixed diffuse and specular effects.


##### Chapter 6 “Transparency”

Creating a model and texturing it is a wall understood technique but what about when you need to see through all or parts of that model, how do you shade, effectively nothing and make it look real enough to fool the user.  In this chapter the author highlights special types of surface shaders to give the illusion of transparency for materials such as Glass, and even grass / hair.  The chapter then also goes into some detail on how to handle depth of field and render sorting to ensure performance is maintained even with complex shaders


##### Chapter 7 “Vertex Magic”

So far all the shaders cover what to do to existing objects and how to manipulate light as it interacts with those objects to make them appear more than they are but shaders themselves can do so much more.

In this chapter you will be walked though how to do deformations and animations by manipulating the meshes of our models at the vertex level to create some mesmerising effects.


##### Chapter 8 “Mobile Shader Adjustment”

In any game in development the developer has one eye on its visual effect and its presentation while keeping one eye on just how badly it will perform and them compromising till both reach an acceptable medium.  With the world of mobile devices and lower powered devices this does become a real challenge, how to make something look fantastically good with so few machine cycles.

Here is where this section shines by showing you which parts of your shaders you need to focus on to reduce the amount of work they have to do to achieve the effect you want with a smaller cost, the main answer usually ending up with shader only what you need to, focus on what is important.


##### Chapter 9 “Making Your Shader World Modular with CgIncludes”

Stopping the shader train for a moment, here the author looks mode in to what you are writing rather than what it does.  Over time and with many shaders written you will find lots of duplicated code and functions that either do the same or very similar tasks, here is where CgIncludes come in.  They are effectively OO for shaders helping you to reuse most (if not all) your code in your shader the same way you (should) do in your game, this includes a whole load of functions already created for you by Unity themselves,


###### \*Note, the following two chapters are for the Pro version only but a good read regardless.


##### Chapter 10 “Screen Effects with Unity Render Textures” (Pro only)

For some of the more advanced effects you need to either affect the entire rendered scene or perform multiple operations on that scene, such as Bloom, HDR or Motion blur to name but a few.  Unity knows this and hence these are Pro only features as they require the use of RenderTargets or Render Textures as they are known in Unity (the pro part).  in this chapter you are walked though how to create some of the most common of these effects by altering the overall saturation / brightness of a scene and using blend modes to mix different renderings of a scene together.


##### Chapter 11 “Gameplay and Screen Effects”

Chapter 11 follows swiftly on from the last chapter to focus on two advanced scene effects to create an old Movie style effect (remember bioshock ![Open-mouthed smile](/assets/img/wordpress/2013/09/wlEmoticon-openmouthedsmile.png))

[![image](/assets/img/wordpress/2013/09/image.png "image")](/assets/img/wordpress/2013/09/image.png)

Or a night scene effect in your game.

[![image](/assets/img/wordpress/2013/09/image1.png "image")](/assets/img/wordpress/2013/09/image1.png)

By deconstructing these you can see just what is need to create such effects (or tweak them for your own) in your games.

* * *

![src=]()

Like I have said before Shaders are hard, or at least appear to be. In this book each shader is drawn out on the table and you are walked through each line by line showing you what each twist and turn does and its resultant effect on the screen, it does rush in the later chapters but you are given lots of resources you can just drop into your game / project to do with what you will.  Learn enough and you will be twisting the shader handle yourself for “just” the right effect in your Unity games.


###### Pros:

- Very detailed step by step explanations
- Fully working samples, not just throw away code
- Really breaks down each feature and tells you line by line what is happening
- Good links to further reading and info in each section


###### Cons:

- Follow the sections carefully, not all the examples flow on from each other. If in doubt copy the sample code from each section for use, do not just add to it.  This does make a bit of a challenge using the code (but you can also download the finals)
- The early chapters are very detailed but later chapters do feel like a bit of a speeding train and may take a few re-reads to fully comprehend. My advice is to do as you read
- It is a shame not all of the book is for the (now) Free version but at least you get a glimpse for what you get for those extra pennies

* * *

![src=]()

I thoroughly enjoyed reading this book, I do not get to play with Unity as much as I would like to at the moment with other commitments but it is high up on my todo list. This book not only tempts me to drop everything and get back to Unity but shows me the scary underbelly of Shaders in Unity and makes them seem fun to play with.

If you are working on a game or even just playing about with Unity, seriously take this book for a spin and see just how much you can jazz up you environment with the tips and tricks within and go beyond just the stock effects you get with Unity (not that they are not great but this just makes them even better) and stand out from the crowd with just a little extra effort.

