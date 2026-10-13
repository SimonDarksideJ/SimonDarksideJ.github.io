---
layout: post
title: Making it work - The new SHIP sample game from the XNA creators club
date: 2007-08-16 13:34:20
tags: [xna]
---

Like quite a few developers these days, I like nothing more than sitting in the garden or relaxing on the couch (sofa) when I’m fumbling over some code, this is a bit hard to do with my trusty power hungry workhorse dev PC (just doesn’t feel nice to carry around in a backpack you know! :-)).

So, most of my coding gets done on my back friendly laptop, mine in particular has the frumpy Intel 945GSM chipset (which although Intel keep saying it supports full Shader 2.0 stuff, it don’t), A Dell D610 with 1Gb of memory (should be enough should not it)

SO after downloading the nice new [SHIP starter kit](http://creators.xna.com/Education/StarterKits) game from the [XNA Creators Club site](http://creators.xna.com/default) (whoohoo, my Creators club membership is still active) and installed the new sample, lo and behold, my poor laptop chipset just couldn’t cut it.

BUT, that didn’t stop it from making it work!, so here’s how to get it running on some older Shader 2.0 machines (or laptops like mine).

## But it Compiles, why wont it run

Thing is when you get the Ship game out of the box and compile it, it will run.  Except that at first you get kicked out for having a naff Graphics card without Pixel Shader 2.0A support.

## First things first

First off the game is code limited to check the capability of your graphics card, to check under the hood and give you the thumbs up or down, one of the shaders (which I’ll come to later) requires PS2.0A support.  My laptop doesn’t (it only falsely thinks it supports full 2.0, liar!!), so easiest way around this is to simply comment out the Pixel Shader check.

In the Constructor for the ShipGame class (shipgame.cs) you will find these two lines, just comment out the first one as I have done here!

```csharp
//graphics.MinimumPixelShaderProfile = ShaderProfile.PS_2_A;
graphics.MinimumVertexShaderProfile = ShaderProfile.VS_1_1;
```

Well that’s all well and good, my game will now ignore the capabilities of my graphics card.

## Damn, My game no longer compiles.

Good old MS build is intelligent to note that without the minimum support options it needs to check the game will now work for your machine specifically and without the Pixel Shader 2.0A support, it wont.

You will now get a nice warning error about a maximum instruction limit with one of your Shader files, Blur.fx

## The Culprit

When you open the Shader Blur.fx (located in `ShipGame\Windows\Content\Shaders\blur.fx`), the first thing you’ll do is scroll down to the end of the FX file and look at the instruction version of the Vertex and Pixel Shader techniques.

In the BlurHorizontal and BlurHorizontalSplit techniques you will see these lines

```hlsl
pass P0 { VertexShader = compile vs_1_1 MainVS( ); PixelShader = compile ps_2_A BlurHorizontalSplitPS( ); }
```

Now at this point, like so many others, I just changed the PixelShader version and hoped for the best

```hlsl
pass P0 { VertexShader = compile vs_1_1 MainVS( ); PixelShader = compile ps_2_0 BlurHorizontalSplitPS( ); }
```

Off I went and re-compiled the solution.

## What the heck, it didn’t work

Well of course it didn’t work.  Even though most of the time, changing the version of the Pixel Shader will work, in this case it can’t, simply because the shader is trying to do too much for the card to handle.

Lucky for us though it’s not using any specific HLSL language elements from PS 2.0A.  The problems lies in just how much work the shader is asking the graphics card to do.

## The Final fix, do less to get more

if only everything in life could simply be fixed with doing less to get more, or in this get anything at all.

Now where the problem lies with my poor old graphics card is here

```hlsl
float4 color = float4(0,0,0,0);
for( float i=-BLUR_RANGE;i<=BLUR_RANGE;i++ )
{
    float2 tc = TexCoord + float2(i*g_PixelSize.x, 0);
    float4 c = tex2D(ColorSampler, tc);
    c.xyz *= c.w;
    color += c;
}
return color/(2*BLUR_RANGE+1);
```

You will notice this loop is dependant on the following variable

```hlsl
#define BLUR_RANGE 5
```

This variable tells the shader just how much BLUR effect to impose on the scene it is shading, in our case it’s just too much and exceeds the shader instruction limit for my laptops graphics card.

SO all we have to do to make this run on our machines, is to limit how much BLUR should be drawn on our screen, hey it may not look as pretty as it could be, but it will now work.

So simply change the above line to

```hlsl
#define BLUR_RANGE 2
```

## Whoohoo, I’m now playing a Descent 2 clone

After you have compiled and run the code, you will now get the (almost) full experience of what the Ship game does, with all the nifty power ups and the seemingly endless (not) levels.

I’m glad how much stuff the XNA team has put into this sample game and more importantly just how much they left wide open, there are loads of areas where any budding new beginner can now jump in and start adding more and more features on the framework they have supplied.

My only gripe, is that they didn’t also ship the RAW models for the FBX’s that were shipped with the game, although the FBX editors can read them, it’s much better to work with the original file format for the editor (especially if they used the new version of XSI Softmod!!)

SO what are you waiting for, get out there and start modding.  (Garden and couch optional)

P.S.

Don’t know if anyone else get the same problem, but my Ship jerks around (as in it jumps every second or so, not that its a jerk!!), could be the fix but I ain’t looked properly yet, keep looking.
