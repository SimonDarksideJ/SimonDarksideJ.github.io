---
layout: post
title: 'Intermission #10 - lets tax the brain'
date: 2012-06-29 11:22:22
tags: [2d tutorial, game development, xna]
---

In the last intermission before getting back to the series we're going to stay with the windows phone for now (the next part of the tutorial will start on the WP7 and then we'll add the updates back to windows / XBOX, lets hope you can keep up)

So far we've been trying to push (but not very hard) the graphics capabilities of the platforms, granted the phone has a lot less but it's been pretty solid so far. Now we'll look at the brins a bit and push its boundaries with some procedural effects.

As usual the code for this intermission can be found [here on codeplex](http://startrooper2dxna.codeplex.com/releases/46712/download/131322)

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

---

## Procedural effect using [Robin Debreuil](http://blog.debreuil.com/)'s effect generator (updated for phone)

As you saw in my previous blog post "Breakpoint-Alternate Particle solutions", Robin came up with an interesting way of generating effects procedurally, meaning that instead of using the class structure and a pool of particles, we simply define a pattern for how particles are generated and then draw them according to that pattern over time.

The major difference between the two is that using a pool means we have all the effects in memory and they all individually update and draw each frame. By creating them procedurally we just predict where they are going to be and draw them, no memory involved. Sounds fantastic, but there is a draw back, which for the phone was a bit of a problem. All this prediction and calculation is heavy on the CPU, the brain of the box. Depending on the complexity of your effect the drain can be very demanding.

that's not to say don't use it, used wisely it can be very good and it gives you a lot more flexibility to produce effects on the fly if you need them.

Here's what I got out of it as a basic effect (granted full screen) after only an hour or so of tinkering.

|   |   |   |   |
| --- | --- | --- | --- |
|  |  |  |  |

The effect you see was based on Robins original "ParticleEffectExample" effect using the explosion sprite from the StarTrooper Project. I was quite surprised by the green, but that was because the effect plays with some of the colours. The effect show explodes outwards like a supernova and slowly collapses inwards until it flames out at the end, the effect lasts just over 2 seconds. (looks better on the emulator :D)

The phone holds up very well with just one of these effects u and running, add 5 however and unfortunately the poor CPU of the phone is a little outmatched for the calculations required, we can offset this however by reducing the number of cycles and particles generated and being a bit more clever with the numbers and calculations to be done in each effect. So it's still good to use but it takes a lot more tinkering to get the effect you are looking for.

I might at some point write a little effect generator tool for both particle platforms to aid in effect generation, but only after the main tutorial is finished (or if I get another plane ride to India or a train journey to one of our site offices and I get really bored)

---

## Proof of concept

A good thing to implement if you are thinking of adding a major new feature to any game (or app for that matter) is to first proof it on its own, in a little proof of concept application (rather than spending hours / days rewriting half your game code to get a new feature in only to find you don't like it in the end). Always better to test on its own and then decide if it's worth the effort.

In this case I re-used another proof of concept project that I put together for testing the WP7 touchscreen interface (because I couldn't initially get it working and needed to know why to fix my game).

Basically, start a fresh project, copy in any bits you actually need to test with (and only if you really need them, best to start with nothing) and then build your feature in. So as I was building a particle effect system, I copied over the Particle Manager and Pool classes (because I still wanted a pool of effects / emitters) from the tutorial project. This meant I used the same or at least similar management code as the tutorial so porting back later would be easy.

So copy the ParticleManager.cs and Pool.cs from the engine folder in the tutorial project to your proof of concept project, remember to rename the namespaces at the beginning of each file. Ignore any warnings you get for now.

Next we need some of the helper classes from Robin's work. These are two classes which Robin has consumed in his work to help with some of the generation logic, one is the [FastRandom](http://www.codeproject.com/KB/cs/fastrandom.aspx) class written by Colin Green and the other is a Easing function library based on [Robert Penner](http://robertpenner.com/)'s easing equations (easing equations are a bit like [linear interpolations](http://en.wikipedia.org/wiki/Linear_interpolation) except a lot more flexible, a demo of the easing functions can be [found here](http://gizma.com/easing/#quint1)). You can either download the latest source from [Robin on GIThub](http://github.com/debreuil/Swf2XNA) (folders V2DRuntime\particles and V2DRuntime\Tween respectively), or get them from the Codeplex site [here](http://startrooper2dxna.codeplex.com/releases/46712/download/131309) and [here](http://startrooper2dxna.codeplex.com/releases/46712/download/131308). Just add these two classes to the POC project, again changing the Namespaces appropriately.

Right, now we have our framework, lets add the effect generator. Like with the previous particle engine, we have an effect generator template and overloaded classes for the individual effects. This always makes it easier to add new effects without adding masses more code (granted using virtual functions can have a minor performance impact but for the scale of the game we should be fine, remember if you watched [Shawn's webcast](http://channel9.msdn.com/learn/courses/WP7TrainingKit/WP7XNA/Mix10CL22Video/) from mix, code safely and tune afterwards where you have the biggest problems. Don't try to fix everything at once. KISS!)

---

## The Generator

Right, now this does start to get a bit tricky to explain, so let's start with the code for the Generator class and walk through it as normal:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace TouchScreenPOC
{
  public class ParticleEffect
  {
    protected float t;
    protected int seed;
    protected float maxT = 1;
    protected FastRandom rnd = new FastRandom();
    protected int particleCount = 1000;

    private bool isFirstUpdate = false;

    public uint textureCount = 1;
    protected int particleHeight;
    protected int particleWidth;

    protected int count = 0;
    protected int steps = 500;

    public Vector2 effectPosition;
    protected float effectRotation;
    public Vector2 effectScale;
    protected Vector2 effectOrigin;
    protected Color effectColor;
    public Vector2 effectVelocity;
    public Vector2 effectAcceleration;

    protected Vector2 pPosition;
    protected float pRotation;
    protected Vector2 pScale;
    protected Vector2 pOrigin;
    protected Color pColor;
    protected Vector2 pVelocity;
    protected Vector2 pAcceleration;
    protected float r0;
    protected float r1;
    protected float r2;
    protected float r3;

    protected TimeSpan StartTime = TimeSpan.Zero;
    protected TimeSpan Duration = new TimeSpan(0, 0, 1); // default 1 second

    public bool AutoStart { get; set; }
    public bool IsGroupMember { get; set; }

    public bool isActive = false;
    public String TextureName;
    public Rectangle sourceRectangle;
    public BlendState SpriteBlendMode = BlendState.Opaque;

        public virtual void Initialize(float x, float y, float r)
    {
            isActive = true;

            seed = (int)DateTime.Now.Ticks;

            effectPosition = new Vector2(x, y);
            effectRotation = r;
            effectScale = new Vector2(0.2f,0.2f);
            isActive = true;
            isFirstUpdate = true;

    }

    public virtual void End()
    {
      isActive = false;
    }

    public void Update(GameTime gameTime)
    {
      if (isFirstUpdate)
      {
        EffectSetup(gameTime);
        TextureSetup();
        isFirstUpdate = false;
      }

      BatchUpdate(gameTime);
    }

    protected virtual void EffectSetup(Microsoft.Xna.Framework.GameTime gameTime)
    {
      StartTime = gameTime.TotalGameTime;
      t = 0;
      count = 0;
    }

    protected virtual void TextureSetup()
    {
      // should have a texture by now.
      if (TextureName == null)
      {
        throw new NullReferenceException("Texture on particle effect can not be null");
      }
      Texture2D Texture = Game1.ParticleManager.LoadTexture(TextureName);
      particleHeight = Texture.Height;
      particleWidth = (int)(Texture.Width / textureCount);
      sourceRectangle = new Rectangle(0, 0, particleWidth, particleHeight);
      effectOrigin = new Vector2(particleWidth / 2, particleHeight / 2);
    }

        protected virtual void BatchUpdate(GameTime gameTime)
    {
            float dt = (float)gameTime.ElapsedGameTime.TotalSeconds;
            effectVelocity += effectAcceleration * dt;
            effectPosition += effectVelocity * dt;

            pPosition = effectPosition;
            pRotation = effectRotation;
            pScale = effectScale;
            pOrigin = effectOrigin;
            pColor = effectColor;
            pVelocity = effectVelocity;
            pAcceleration = effectAcceleration;

      count++;
      t = count / (float)steps;

      if (t >= maxT)
      {
        End();
      }
    }
    protected virtual void BatchDraw(Texture2D Texture, SpriteBatch batch)
    {
      rnd.Reinitialise(seed);
      r1 = (float)rnd.NextDouble();
      r2 = (float)rnd.NextDouble();
      r3 = (float)rnd.NextDouble();

      for (int i = 0; i < particleCount; i++)
      {
        r0 = (float)rnd.NextDouble();
        ParticleDraw(i, Texture, batch);
        r3 = r2;
        r2 = r1;
        r1 = r0;
      }
    }

    protected virtual void ParticleDraw(int index,Texture2D Texture, SpriteBatch batch)
    {
      batch.Draw(Texture, pPosition, sourceRectangle, pColor,
        pRotation, pOrigin, pScale, SpriteEffects.None, 1);

    }

        public void Draw(Texture2D Texture, SpriteBatch batch)
        {
            if (isActive)
            {
                BatchDraw(Texture, batch);
            }
        }

  }
}
```

The first section contains all the variables used to maintain the effect and the particles it generates, you should notice there is an equivalent number of variables beginning with p for each variable beginning with effect (p for particle and effect for the effect itself), the effect controls from where on the screen the effect originates (like the emitter) and the particles are used by each generation of particle.

Then there is the Initialise function which is pretty simple, it marks the position where the effect is located, sets the initial scale and makes the effect active (the active state is used by the pool class so it knows when to destroy it).

Ignoring the End function (which is just the internal way the effect ends, it is here so it can be overridden by particle effects in case they want to do something tricky), next up is the update function, which again is very basic, it just checks if the effect has been setup properly yet by checking if it is the first time the effect has been updated and then sets it up appropriately before running the main "BatchUpdate" function that does all the hard work. It is followed by the functions that are called by the setup logic, again these can be overridden by individual effects for maximum damage.

The BatchUpdate function itself does several things by default, it updates the effect generators location if it has been given a velocity (and optionally acceleration) and then goes on to set the start-up variables for the particles based on the effects current location. It then goes on to check if the effect has been running for long enough and kills it if it has. (this is where the end function can be a bit more clever and possibly fade out when an effect dies if it hasn't done so already).

The next three functions are the draw functions, Draw does exactly what it says on the tin and launches BatchDraw (the same way update calls BatchUpdate) if it is active (a little double check in case the pool has not destroyed it yet for some reason).

The batch draw controls the core of any procedural work by initialising the generation values and then launches the Particle Draw function in a loop for the amount of particles defined by the effect. Once it has drawn the particle it stores the generated value for the next generation for up to 4 generations (R0, R1, R2, R3).

Since the random number generator is predictable and always generates the same numbers in the same order, these can be then used to mathematically predict how you want the effect to be generated, using either the base generation alone or combinations of each generation value. This is not an elegant thing to try to describe and if you wish to know more about this I'd suggest reading "Texturing and modelling a procedural approach by XX", it is an intensive read and not for beginners. You don't have to know how this works just how to use it effectively in content generation which I'll come on to next.

---

## Generated Effects

The sample project I've uploaded contains both of Robin's sample template effects however I personally could only get the first one to display correctly using the particle files I have currently. Given more time I could play more but time is short, so we will work with what I got working.

Here's the code for the "ParticleEffectExample" effect from Robin's code (with a few tweaks):

```csharp
using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace TouchScreenPOC
{
  public class ParticleEffectExample : ParticleEffect
  {

    public override void Initialize(float x, float y, float r)
    {
      base.Initialize(x, y, r);
      AutoStart = false;
      maxT = 1;
    }

    protected override void EffectSetup(Microsoft.Xna.Framework.GameTime gameTime)
    {
      base.EffectSetup(gameTime);
      textureCount = 1;
      TextureName = "Explosion";
      SpriteBlendMode = BlendState.AlphaBlend;
    }
    protected override void BatchUpdate(Microsoft.Xna.Framework.GameTime gameTime)
    {
      base.BatchUpdate(gameTime);

            pColor.A = (byte)Easing.Sin(t, 0, 40, .5f);
            pColor.R = (byte)Easing.Linear(t, 0, 255f);
            pColor.G = (byte)Easing.Linear(t, 255, 0);
            //pColor.A = (byte)Easing.Linear(t, 0, 200);
            //pColor = new Color(new Vector4(1, 1, 1, pColor.A));

      effectOrigin.X = Easing.Linear(t, 0, r1 * 50);//r2 * 2;
      particleCount = (int)Easing.Sin(t, 0, 1000, .5f);
    }
    protected override void BatchDraw(Texture2D Texture, SpriteBatch batch)
    {
      base.BatchDraw(Texture, batch);
    }
        protected override void ParticleDraw(int index, Texture2D Texture, SpriteBatch batch)
    {
      sourceRectangle.X = (index % 4) * particleWidth;
      pRotation = Easing.EaseOutQuad(t, 0, r0 * 31.4159f * 10);

      float len = Easing.EaseOutElastic(t * .5f, 0, r0 * 100, 400);
      float pt = index / (float)particleCount;
      pPosition.X = (float)Easing.Sin(pt, 0, len) + effectPosition.X;
      pPosition.Y = (float)Easing.Cos(pt, 0, len) + effectPosition.Y;

       base.ParticleDraw(index, Texture, batch);
    }
  }
}
```

Now as you can see there's not much here because it's all maths and using those easing functions I mentioned earlier.

The first two functions are easy, as they are just the overloads for the base functions with a few tweaks, setting the MaxT(Max time to live) and setting the texture count and texture name (I really liked the idea in Robin's work to use a spritesheet for an effect and loop through it when drawing having overlapping effects drawn with different particle images, even more inventiveness) and of course setting the blend state (or Sprite Blend Mode in GS3.1) for alpha blended effects or additive. It is interesting to see how the blend state effects what is drawn, try it and find out (but check your alpha value!!!!).

Next are the Update and Draw overloads.

### Update

in the update for this effect, the individual elements that make up the drawing colour for the image are altered:

- The Alpha (A) has a SIN wave applied to it so that it Grows and Shrinks over time
- The Red (R) uses a Linear approach so that it goes from 0 to the maximum 255 over time (gets more red)
- The Green (G) also uses a Linear approach but reduces overtime instead
- the Blue (B) is untouched.

Next it gets a little more tricky to explain, the origin of the whole effect is altered using the value of the 2nd generation (R1), using this to move the X portion of the effect out by a factor of 50 based on the R1 value. So for each particle it will rotate along a different origin of the drawn texture (changes where the centre of the image is when rotating).

lastly the particle count is increased over time in a linear fashion (something Robin had commented out but I put it back in to see how it changes the effect)

### Draw

The batchDraw function has more fun in it.

- First is the simple logic to pick which part of the image on a spritesheet to use based on which particle (the particle index) you are currently drawing.
- The rotation is altered using a quadratic easing out function which decelerates to a zero velocity (Start fast and gradually gets slower)
- Next the position is altered using standard trigonometry to form a circle around the effect centre that flies out and gradually comes back to the centre using the EasingoutElastic function to provide the force.

---

Continued next ->

[Part 2](http://xna-uk.net/blogs/darkgenesis/archive/2010/07/30/intermission-10-part-2-lets-tax-the-brain.aspx)
