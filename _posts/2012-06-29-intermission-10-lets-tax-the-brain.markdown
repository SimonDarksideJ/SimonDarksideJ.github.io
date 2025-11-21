---
layout: post
title: 'Intermission #10 - lets tax the brain'
date: 2012-06-29 11:22:22
tags: [2d tutorial, game development, xna]
---

2in the last intermission before getting back to the series we’re going to stay with the windows phone for now (the next part of the tutorial will start on the PW7 and then we will add the updates back to windows / XBOX, lets hope you can keep up)

So far we have been trying to push (but not very hard) the graphics capabilities of the platforms, granted the phone has a lot less but it is been pretty solid so far.  Now we will look at the brins a bit and push it is boundaries with some procedural effects.

As usual the code for this intermission can be found [here on codeplex](http://startrooper2dxna.codeplex.com/releases/46712/download/131322)


### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

 


### Procedural effect using [Robin Debreuil](http://blog.debreuil.com/)’s effect generator (updated for phone)

As you saw in my previous blog post “Breakpoint–Alternate Particle solutions”, Robin came up with an interesting was of generating effects procedurally, meaning that instead of using the class structure and a pool of particles, we simple define a pattern for how particles are generated and then draw them according to that pattern over time.

The major difference between the two is that using a pool means we have all the effects in memory and they all individually update and draw each frame.  By creating them procedurally we just predict where they are going to be and draw them, no memory involved.  Sounds fantastic, but there is a draw back, which for the phone was a bit of a problem.  All this prediction and calculation is heavy on the CPU, the brain of the box.  Depending on the complexity of your effect the drain can be very demanding.

that is not to say do not use it, used wisely it can be very good and it gives you a lot more flexibility to produce effects on the fly if you need them.

Here is what i got out of it as a basic effect (granted full screen) after only an hour or so of tinkering.

| ![Effect pic 1](assets/img/posts/image-not-found.png) | ![Effect pic 2](assets/img/posts/image-not-found.png) | ![Effect pic 3](assets/img/posts/image-not-found.png) | ![Effect pic 4](assets/img/posts/image-not-found.png) |

The effect you see was based on Robins original “ParticleEffectExample” effect using the explosion sprite from the StarTrooper Project.  I was quite surprised by the green, but that was because the effect plays with some of the colours.  The effect show explodes outwards like a supernova and slowly collapses inwards until it flames out at the end, the effect lasts just over 2 seconds. (looks better on the emulator ![Open-mouthed smile](/assets/img/wordpress/2012/06/wlEmoticon-openmouthedsmile3.png))

The phone holds up very well with just one of these effects u and running, add 5 however and unfortunately the poor CPU of the phone is a little outmatched for the calculations required, we can offset this however by reducing the number of cycles and particles generated and being a bit more clever with the numbers and calculations to be done in each effect.  So it is still good to use but it takes a lot more tinkering to get the effect you are looking for.

I might at some point write a little effect generator tool for both particle platforms to aid in effect generation, but only after the main tutorial is finished (or if I get another plane ride to India or a train journey to one of our site offices and I get really board)

* * *


### Proof of concept

A good thing to implement if you are thinking of adding a major new feature to any game (or app for that matter) is to first proof it on it is own, in a little proof of concept application (rather than spending hours / days rewriting half your game code to get a new feature in only to find you do not like it in the end).  Always better to test on it is own and then decide if it is worth the effort.

In this case I re-used another proof of concept project that I put together for testing the WP7 touchscreen interface (because i could not initially get it working and needed to know why to fix my game).

Basically, start a fresh project, copy in any bits you actually need to test with (and only if you really need them, best to start with nothing) and then build your feature in.  So as I was building a particle effect system, i copied over the Particle Manager and Pool classes (because I still anted a pool of effects / emitters) from the tutorial project.  This meant I used the same or at least similar management code as the tutorial so porting back later would be easy.

So copy the ParticleManager.cs and Pool.cs from the engine folder in the tutorial project to your proof of concept project, remember to rename the namespaces at the beginning of each file.  Ignore any warnings you get for now.

Next we need some of the helper classes from Robin’s work.  These are two classes which Robin has consumed in his work to help with some of the generation logic, one is the[FastRandom](http://www.codeproject.com/KB/cs/fastrandom) class written by Colin Green and the other is a Easing function library based on  [Robert Penner](http://robertpenner.com/)’s easing equations (easing equations are a bit like [linear interpolations](http://en.wikipedia.org/wiki/Linear_interpolation) except a lot more flexible, a demo of the easing functions can be [found here](http://gizma.com/easing/#quint1)).  You can either download the latest source from [Robin on GIThub](http://github.com/debreuil/Swf2XNA) (folders V2DRuntime\particles and V2DRuntime\Tween respectively), or get them from the Codeplex site [here](http://startrooper2dxna.codeplex.com/releases/46712/download/131309 "Fast Random Library on codeplex") and [here](http://startrooper2dxna.codeplex.com/releases/46712/download/131308 "Easing Function library on Codeplex").  Just add these two classes to the POC project, again changing the Namespaces appropriately.

Right, now we have our framework, lets add the effect generator.  Like with the previous particle engine, we have an effect generator template and overloaded classes for the individual effects.  This always makes it easier to add new effects without adding masses more code (granted using virtual functions can have a minor performance impact but for the scale of the game we should be fine, remember if you watched [Shawn’s webcast](http://channel9.msdn.com/learn/courses/WP7TrainingKit/WP7XNA/Mix10CL22Video/ "Building A High Performance 3D Game For Windows Phone") from mix, code safely and tune afterwards were you have the biggest problems.  Do not try to fix everything at once.  KISS!)

 

* * *

 


### The Generator

Right, now this does start to get a bit tricky to explain, so let’s start with the code for the Generator class and walk through it as normal:

    
    
         1: using System;
    
    
    
         2: using System.Collections.Generic;
    
    
    
         3: using System.Linq;
    
    
    
         4: using System.Text;
    
    
    
         5: using Microsoft.Xna.Framework.Graphics;
    
    
    
         6: using Microsoft.Xna.Framework;
    
    
    
         7: 
    
    
    
         8: 
    
    
    
         9: namespace TouchScreenPOC
    
    
    
         10: {
    
    
    
         11: public class ParticleEffect
    
    
    
         12: { 
    
    
    
         13: protected float t;
    
    
    
         14: protected int seed;
    
    
    
         15: protected float maxT = 1;
    
    
    
         16: protected FastRandom rnd = new FastRandom();
    
    
    
         17: protected int particleCount = 1000;
    
    
    
         18: 
    
    
    
         19: private bool isFirstUpdate = false;
    
    
    
         20: 
    
    
    
         21: public uint textureCount = 1;
    
    
    
         22: protected int particleHeight;
    
    
    
         23: protected int particleWidth;
    
    
    
         24: 
    
    
    
         25: protected int count = 0;
    
    
    
         26: protected int steps = 500;
    
    
    
         27: 
    
    
    
         28: public Vector2 effectPosition;
    
    
    
         29: protected float effectRotation;
    
    
    
         30: public Vector2 effectScale;
    
    
    
         31: protected Vector2 effectOrigin;
    
    
    
         32: protected Color effectColor;
    
    
    
         33: public Vector2 effectVelocity;
    
    
    
         34: public Vector2 effectAcceleration;
    
    
    
         35: 
    
    
    
         36: protected Vector2 pPosition;
    
    
    
         37: protected float pRotation;
    
    
    
         38: protected Vector2 pScale;
    
    
    
         39: protected Vector2 pOrigin;
    
    
    
         40: protected Color pColor;
    
    
    
         41: protected Vector2 pVelocity;
    
    
    
         42: protected Vector2 pAcceleration;
    
    
    
         43: protected float r0;
    
    
    
         44: protected float r1;
    
    
    
         45: protected float r2;
    
    
    
         46: protected float r3;
    
    
    
         47: 
    
    
    
         48: protected TimeSpan StartTime = TimeSpan.Zero;
    
    
    
         49: protected TimeSpan Duration = new TimeSpan(0, 0, 1); // default 1 second
    
    
    
         50: 
    
    
    
         51: public bool AutoStart { get; set; }
    
    
    
         52: public bool IsGroupMember { get; set; }
    
    
    
         53: 
    
    
    
         54: 
    
    
    
         55: public bool isActive = false;
    
    
    
         56: public String TextureName;
    
    
    
         57: public Rectangle sourceRectangle;
    
    
    
         58: public BlendState SpriteBlendMode = BlendState.Opaque;
    
    
    
         59: 
    
    
    
         60: 
    
    
    
         61: 
    
    
    
         62: public virtual void Initialize(float x, float y, float r)
    
    
    
         63: {
    
    
    
         64: isActive = true;
    
    
    
         65: 
    
    
    
         66: seed = (int)DateTime.Now.Ticks;
    
    
    
         67: 
    
    
    
         68: effectPosition = new Vector2(x, y);
    
    
    
         69: effectRotation = r;
    
    
    
         70: effectScale = new Vector2(0.2f,0.2f);
    
    
    
         71: isActive = true;
    
    
    
         72: isFirstUpdate = true;
    
    
    
         73: 
    
    
    
         74: }
    
    
    
         75: 
    
    
    
         76: public virtual void End()
    
    
    
         77: {
    
    
    
         78: isActive = false;
    
    
    
         79: }
    
    
    
         80: 
    
    
    
         81: 
    
    
    
         82: public void Update(GameTime gameTime)
    
    
    
         83: {
    
    
    
         84: if (isFirstUpdate)
    
    
    
         85: {
    
    
    
         86: EffectSetup(gameTime);
    
    
    
         87: TextureSetup();
    
    
    
         88: isFirstUpdate = false;
    
    
    
         89: }
    
    
    
         90: 
    
    
    
         91: BatchUpdate(gameTime);
    
    
    
         92: }
    
    
    
         93: 
    
    
    
         94: protected virtual void EffectSetup(Microsoft.Xna.Framework.GameTime gameTime)
    
    
    
         95: {
    
    
    
         96: StartTime = gameTime.TotalGameTime;
    
    
    
         97: t = 0;
    
    
    
         98: count = 0;
    
    
    
         99: }
    
    
    
        100: 
    
    
    
        101: protected virtual void TextureSetup()
    
    
    
        102: {
    
    
    
        103: // should have a texture by now.
    
    
    
        104: if (TextureName == null)
    
    
    
        105: {
    
    
    
        106: throw new NullReferenceException("Texture on particle effect can not be null");
    
    
    
        107: }
    
    
    
        108: Texture2D Texture = Game1.ParticleManager.LoadTexture(TextureName);
    
    
    
        109: particleHeight = Texture.Height;
    
    
    
        110: particleWidth = (int)(Texture.Width / textureCount);
    
    
    
        111: sourceRectangle = new Rectangle(0, 0, particleWidth, particleHeight);
    
    
    
        112: effectOrigin = new Vector2(particleWidth / 2, particleHeight / 2);
    
    
    
        113: }
    
    
    
        114: 
    
    
    
        115: protected virtual void BatchUpdate(GameTime gameTime)
    
    
    
        116: {
    
    
    
        117: float dt = (float)gameTime.ElapsedGameTime.TotalSeconds;
    
    
    
        118: effectVelocity += effectAcceleration \* dt;
    
    
    
        119: effectPosition += effectVelocity \* dt;
    
    
    
        120: 
    
    
    
        121: pPosition = effectPosition;
    
    
    
        122: pRotation = effectRotation;
    
    
    
        123: pScale = effectScale;
    
    
    
        124: pOrigin = effectOrigin;
    
    
    
        125: pColor = effectColor;
    
    
    
        126: pVelocity = effectVelocity;
    
    
    
        127: pAcceleration = effectAcceleration;
    
    
    
        128: 
    
    
    
        129: count++;
    
    
    
        130: t = count / (float)steps;
    
    
    
        131: 
    
    
    
        132: if (t \>= maxT)
    
    
    
        133: {
    
    
    
        134: End();
    
    
    
        135: }
    
    
    
        136: }
    
    
    
        137: protected virtual void BatchDraw(Texture2D Texture, SpriteBatch batch)
    
    
    
        138: {
    
    
    
        139: rnd.Reinitialise(seed);
    
    
    
        140: r1 = (float)rnd.NextDouble();
    
    
    
        141: r2 = (float)rnd.NextDouble();
    
    
    
        142: r3 = (float)rnd.NextDouble();
    
    
    
        143: 
    
    
    
        144: for (int i = 0; i \< particleCount; i++)
    
    
    
        145: {
    
    
    
        146: r0 = (float)rnd.NextDouble();
    
    
    
        147: ParticleDraw(i, Texture, batch);
    
    
    
        148: r3 = r2;
    
    
    
        149: r2 = r1;
    
    
    
        150: r1 = r0;
    
    
    
        151: }
    
    
    
        152: }
    
    
    
        153: 
    
    
    
        154: protected virtual void ParticleDraw(int index,Texture2D Texture, SpriteBatch batch)
    
    
    
        155: {
    
    
    
        156: batch.Draw(Texture, pPosition, sourceRectangle, pColor,
    
    
    
        157: pRotation, pOrigin, pScale, SpriteEffects.None, 1);
    
    
    
        158: 
    
    
    
        159: }
    
    
    
        160: 
    
    
    
        161: public void Draw(Texture2D Texture, SpriteBatch batch)
    
    
    
        162: {
    
    
    
        163: if (isActive)
    
    
    
        164: {
    
    
    
        165: BatchDraw(Texture, batch);
    
    
    
        166: }
    
    
    
        167: }
    
    
    
        168: 
    
    
    
        169: }
    
    
    
        170: }
    
    
    
        171: 
    
    
    
    The first section contains all the variables used to maintain the effect and the particles it generates, you should notice there is an equivalent number of variables beginning with p for each variable beginning with effect (p for particle and effect fro the effect itself), the effect controls from where on the screen the effect originates (like the emitter) and the particles are used by each generation of particle.
    
    
    
    Then there is the Initialise function which is pretty simple, it marks the position where the effect is located, sets the initial scale and makes the effect active (the active state is used by the pool class so it knows when to destroy it).
    
    
    
    Ignoring the End function (which is just the internal way the effect ends, it is here so it can be overridden by particle effects in case they want to do something tricky), next up is the update function, which again is very basic, it just checks if the effect has been setup properly yet by checking if it is the first time the effect has been updated and then set’s it up appropriately before running the main “”BatchUpdate” function that does all the hard work.  it it followed by the functions that are called by the setup logic, again these can be overridden by individual effects for maximum damage.
    
    
    
    The BatchUpdate function itself does several things by default, it updates the effect generators location if it has been given a velocity (and optionally acceleration) and then goes on to set the start-up variables for the particles based on the effects current location.  It then goes on to check if the effect has been running for long enough and kills it if it has. (this is where the end function can be a bit more clever and possibly fade out when an effect dies if it has not done so already).
    
    
    
    The next three functions are the draw functions, Draw does exactly what it says on the tin and launches BatchDraw (the same way update calls BatchUpdate) if it is active (a little double check in case the pool has not destroyed it yet fro some reason). 
    
    
    
    The batch draw controls the core of any procedural work be initialising the generation values and then launches the Particle Draw function in a loop for the amount of particles defined by the effect.  Once it has drawn the particle it stores the generated value for the next generation for up to 4 generations (R0, R1, R2, R3).
    
    
    
    Since the random number generator is predictable and always generates the same numbers in the same order, these can be then used to mathematically predict how you want the effect to be generated, using either the base generation alone or combinations of each generation value.  This is not an elegant thing to try to describe and if you wish to know more about this I would suggest reading “Texturing and modelling a procedural approach by XX”, it is an intensive read and not for beginners.  You do not have to know how this works just how to use it effectively in content generation which I’ll come on to next.
    
    
    
     
    
    
    * * *
    
    
     
    
    
    ### Generated Effects
    
    
    The sample project I’ve uploaded contains both of Robin’s sample template effects however I personally could only get the first one to display correctly using the particle files I have currently.  Given more time I could play more but time is short, so we will work with what I got working.   
    Here’s the code for the “ParticleEffectExample” effect from Robin’s code (with a few tweaks):
    
    
    
        
        
             1: using System;
        
        
        
             2: using Microsoft.Xna.Framework;
        
        
        
             3: using Microsoft.Xna.Framework.Graphics;
        
        
        
             4: 
        
        
        
             5: 
        
        
        
             6: namespace TouchScreenPOC
        
        
        
             7: {
        
        
        
             8: public class ParticleEffectExample : ParticleEffect
        
        
        
             9: {
        
        
        
             10: 
        
        
        
             11: public override void Initialize(float x, float y, float r)
        
        
        
             12: {
        
        
        
             13: base.Initialize(x, y, r);
        
        
        
             14: AutoStart = false;
        
        
        
             15: maxT = 1;
        
        
        
             16: }
        
        
        
             17: 
        
        
        
             18: protected override void EffectSetup(Microsoft.Xna.Framework.GameTime gameTime)
        
        
        
             19: {
        
        
        
             20: base.EffectSetup(gameTime);
        
        
        
             21: textureCount = 1;
        
        
        
             22: TextureName = "Explosion";
        
        
        
             23: SpriteBlendMode = BlendState.AlphaBlend;
        
        
        
             24: }
        
        
        
             25: protected override void BatchUpdate(Microsoft.Xna.Framework.GameTime gameTime)
        
        
        
             26: {
        
        
        
             27: base.BatchUpdate(gameTime);
        
        
        
             28: 
        
        
        
             29: pColor.A = (byte)Easing.Sin(t, 0, 40, .5f);
        
        
        
             30: pColor.R = (byte)Easing.Linear(t, 0, 255f);
        
        
        
             31: pColor.G = (byte)Easing.Linear(t, 255, 0);
        
        
        
             32: //pColor.A = (byte)Easing.Linear(t, 0, 200);
        
        
        
             33: //pColor = new Color(new Vector4(1, 1, 1, pColor.A));
        
        
        
             34: 
        
        
        
             35: effectOrigin.X = Easing.Linear(t, 0, r1 \* 50);//r2 \* 2; 
        
        
        
             36: particleCount = (int)Easing.Sin(t, 0, 1000, .5f);
        
        
        
             37: }
        
        
        
             38: protected override void BatchDraw(Texture2D Texture, SpriteBatch batch)
        
        
        
             39: {
        
        
        
             40: base.BatchDraw(Texture, batch);
        
        
        
             41: }
        
        
        
             42: protected override void ParticleDraw(int index, Texture2D Texture, SpriteBatch batch)
        
        
        
             43: {
        
        
        
             44: sourceRectangle.X = (index % 4) \* particleWidth;
        
        
        
             45: pRotation = Easing.EaseOutQuad(t, 0, r0 \* 31.4159f \* 10);
        
        
        
             46: 
        
        
        
             47: float len = Easing.EaseOutElastic(t \* .5f, 0, r0 \* 100, 400);
        
        
        
             48: float pt = index / (float)particleCount;
        
        
        
             49: pPosition.X = (float)Easing.Sin(pt, 0, len) + effectPosition.X;
        
        
        
             50: pPosition.Y = (float)Easing.Cos(pt, 0, len) + effectPosition.Y;
        
        
        
             51: 
        
        
        
             52: base.ParticleDraw(index, Texture, batch);
        
        
        
             53: }
        
        
        
             54: }
        
        
        
             55: }
        
        
        
        Now as you can see there is not much here because it is all maths and using those easing functions I mentioned earlier.   
        The first two functions are easy, as they are just the overloads for the base functions with a few tweaks, setting the MaxT(Max time to live) and setting the texture count and texture name (I really liked the idea in Robin’s work to use a spritesheet for an effect and loop through it when drawing having overlapping effects drawn with different particle images, even more inventiveness) and of course setting the blend state (or Sprite Blend Mode in GS3.1) for alpha blended effects or additive.  It is interesting to see how the blend state effects what is drawn, try it and find out (but check your alpha value!!!!).
        
        
        
        Next are the Update and Draw overloads.
        
        
        #### Update
        
        
        in the update for this effect, the individual elements that make up the drawing colour for the image are altered:
        
    
    

- The Alpha (A) has a SIN wave applied to it so that it Grows and Shrinks over time
- The Red (R) uses a Linear approach so that it goes from 0 to the maximum 255 over time (gets more red)
- The Green (G) also uses a Linear approach but reduces overtime instead
- the Blue (B) is untouched. 

Next it gets a little more tricky to explain, the origin of the whole effect is altered using the value of the 2nd generation (R1), using this to move the X portion of the effect out by a factor of 50 based on the R1 value.  So for each particle it will rotate along a different origin of the drawn texture (changes where the centre of the image is when rotating).

lastly the particle count is increased over time in a linear fashion (something Robin had commented out but I put it back in to see how it changes the effect)


#### Draw

The batchDraw function has more fun in it. 

- First is the simple logic to pick which part of the image on a spritesheet to use based on which particle (the particle index) you are currently drawing.
- The rotation is altered using a quadratic easing out function which decelerates to a zero velocity (Start fast and gradually gets slower)
- Next the position is altered using standard trigonometry to form a circle around the effect centre that flies out and gradually comes back to the centre using the EasingoutElastic function to provide the force. 

 

 

* * *

 

Continued next –\>

[Part 2](/blogs/darkgenesis/archive/2010/07/30/intermission-10-part-2-lets-tax-the-brain)

 

Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[Windows Phone 7 Development](http://technorati.com/tags/Windows+Phone+7+Development)
