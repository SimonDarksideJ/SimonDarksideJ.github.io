---
layout: post
title: 'Intermission #7 / 2 - Bring on the Fire'
date: 2012-06-29 11:01:40
tags: [2d tutorial, game development, xna]
---

2D,XNA,Game DevelopmentIn the last post we set the groundwork with the particle system itself. Now we can move on to making use of this and adding / customising our effects.

This post will be keenly followed by another post about monitoring the performance of your game. I hadn't originally planned on it but since I hit problems when applying the particle effects (completely my own fault but a good lesson to learn), I felt it was wise to impart some of this experience to you.

After that we'll roll up this phase of intermissions with an update to the Windows Phone 7 project and add all the extra bits (in their WP7 flavour) to that project (cannot wait to run everything from there come XNA 4 full release).

Then back to the tutorial series itself by adding some sound!!

As usual all the code for this section can be found [here on codeplex](http://startrooper2dxna.codeplex.com/releases/view/46712).

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

---

## The aims of our fireball effect

Below is a diagram of what we are aiming for with our replacement fireball effect, a bit more snazzy than our original sprite:

We need the emitter to be thrown up spewing out fire as it does and trailed with a smoke plume to give it an extra edge. We could just launch out particles together from our trooper for the effect but we would loose cohesion from our fireball and loose a level of control should we wish to add similar effects for other weapons.

---

## Making use of the particle framework

Below is a diagram of the framework we have setup:

From here you can see our standard particle system framework. Within our framework we will define several emitter effect definitions based on the emitter control template. This gives us a wide array of capabilities and options for setting up our effects, we can implement either:

> - Static Controlled effect
>
> Where the game controls how the effect is generated and updated, including when new particles are generated, this is what is used in the CC particle sample.
>
> - Self sustaining effect
>
> Where an effect is launched and generates a pattern of particles but the game still controls the emitter. Which is what we will use in this tutorial
>
> - Self controlled effect
>
> In this the game initiates the effect but after that has no direct control, the emitter is completely self controlled. Bit like a fire out of control (if you could program real fire)

So lets get on and get this started.

---

## Finishing up from the last episode

First we will return to the Particle Manager add the last few parts to make the Particle Engine functional.

Back in the ParticleManager.cs class, first we need the pool for the emitters and a place to store the textures we intend to use (this enables use to re-use textures across emitters without consuming more memory)

Add the following to the beginning of the Particle Manager:

```csharp
SwampLib.Pool<ParticleEmitter> m_emitters;
Dictionary<String, Texture2D> m_textures;
```

Next we need to update the initialise function to setup our manager:

```csharp
public override void Initialize()
{
  // TODO: Add your initialization code here
  m_emitters = new SwampLib.Pool<ParticleEmitter>(1000);
  m_textures = new Dictionary<string, Texture2D>();
  base.Initialize();
}
```

There is nothing to do in the Load Resources or Unload Resources for now (since textures are added as individual emitters are created, you might want to change this to see what improvements it can make, but remember by moving it here you loose a fair amount of flexibility)

The main work horses of the manager are the Update and Draw loops, in the update loop below:

```csharp
/// <summary>
/// Allows the game component to update itself.
/// </summary>
/// <param name="gameTime">Provides a snapshot of timing values.</param>
public override void Update(GameTime gameTime)
{
  // calculate dt, the change in the since the last frame. the particle
  // updates will use this value.
  float dt = (float)gameTime.ElapsedGameTime.TotalSeconds;

  // Go through all of the active particles for each emitter.
  // Note that because we will return any particle that has finished,
  // we need to use the iterator that returns nodes instead of particles.
  foreach (SwampLib.Pool<ParticleEmitter>.Node penode in m_emitters.ActiveNodes)
  {

    if (penode.Item.Active)
    {
      penode.Item.Update(dt);

      if (!penode.Item.Active)
      {
        m_emitters.Return(penode);
      }
    }

  }
  base.Update(gameTime);
}
```

Here we simply loop through each emitter and update it (if it is active). If an emitter becomes inactive after it's update, we then remove it from the pool and free up a slot.

The Draw loop is similar except it does al the draw work in one place:

```csharp
/// <summary>
/// This is called when the game should draw itself.
/// </summary>
/// <param name="gameTime">Provides a snapshot of timing values.</param>
public override void Draw(GameTime gameTime)
{
  // TODO: Add your drawing code here
  // tell sprite batch to begin, using the spriteBlendMode specified in
  // initializeConstants
  foreach (ParticleEmitter pe in m_emitters)
  {
    StarTrooperGame.spriteBatch.Begin(pe.SpriteBlendMode);
    foreach (Particle p in pe.particles)
    {
      // normalized lifetime is a value from 0 to 1 and represents how far
      // a particle is through its life. 0 means it just started, .5 is half
      // way through, and 1.0 means it's just about to be finished.
      // this value will be used to calculate alpha and scale, to avoid
      // having particles suddenly appear or disappear.
      float normalizedLifetime = p.TimeSinceStart / p.Lifetime;

      // we want particles to fade in and fade out, so we'll calculate alpha
      // to be (normalizedLifetime) * (1-normalizedLifetime). this way, when
      // normalizedLifetime is 0 or 1, alpha is 0. the maximum value is at
      // normalizedLifetime = .5, and is
      // (normalizedLifetime) * (1-normalizedLifetime)
      // (.5)                 * (1-.5)
      // .25
      // since we want the maximum alpha to be 1, not .25, we'll scale the
      // entire equation by 4.
      float alpha = 4 * normalizedLifetime * (1 - normalizedLifetime);
      Color color = new Color(new Vector4(1, 1, 1, alpha));

      // make particles grow as they age. they'll start at 75% of their size,
      // and increase to 100% once they're finished.
      float scale = p.Scale * (.75f + .25f * normalizedLifetime);

      StarTrooperGame.spriteBatch.Draw(m_textures[pe.Texture], p.Position, null, color,
        p.Rotation, pe.Origin, scale, SpriteEffects.None, 0.0f);

    }
    StarTrooperGame.spriteBatch.End();
  }
  base.Draw(gameTime);
}
```

Here we reuse the SpriteBatch from the main game class setting the corresponding Sprite Blend mode according to the Emitter (so we can use both additive and alpha blended effects (more on that when we use this). The rest of the code is well commented (from the original MS sample) were we use the particles lifetime to adjust the alpha part of the particle (making if fade out as it dies) and the scale (to make the particle grow as it dies).

Finally we draw each particle to the screen using the texture from the manager according to the specified texture in the emitter.

To finish off the updates to the manager we add a few helper functions that just make life a bit easier:

```csharp
public void Add(ParticleEmitter emitter)
{
  m_emitters.Add(emitter);
}

public Texture2D LoadTexture(String texture)
{
  Texture2D tex;
  try { tex = m_textures[texture]; }
  catch
  {
    tex = Game.Content.Load<Texture2D>(@"Particles\" + texture);
    m_textures.Add(texture, tex);
  }

  return tex;
}
```

Here we just expose the method off adding a new emitter to the manager and a function to manage the texture library maintained by the Particle Manager.

---

## On with the show, the first effect

To make it easier to distinguish between the Emitter template and our new effects, first setup a new class in the engine folder called "ParticleEmitters.cs" and then add the following code for the effect:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace TestProject
{

    /// <summary>
    /// ExplosionParticleSystem is a specialization of ParticleEmitter which creates a
    /// fiery explosion. It should be combined with FireballSmokeParticleSystem for
    /// best effect.
    /// </summary>
    public class FireballParticleEmitter : ParticleEmitter
    {
        float cycleMeter = 0;
        public FireballParticleEmitter()
        {
        }

        /// <summary>
        /// Set up the constants that will give this particle system its behavior and
        /// properties.
        /// </summary>
        protected override void InitializeConstants()
        {
            // high initial speed with lots of variance.  make the values closer
            // together to have more consistently circular explosions.
            minInitialSpeed = 40;
            maxInitialSpeed = 500;

            // doesn't matter what these values are set to, acceleration is tweaked in
            // the override of InitializeParticle.
            minAcceleration = 0;
            maxAcceleration = 0;

            // explosions should be relatively short lived
            minLifetime = 1f;
            maxLifetime = 2f;

            minScale = 0.03f;
            maxScale = 0.1f;

            minNumParticles = 1;
            maxNumParticles = 2;

            minRotationSpeed = -MathHelper.PiOver4;
            maxRotationSpeed = MathHelper.PiOver4;

            // additive blending is very good at creating fiery effects.
            spriteBlendMode = SpriteBlendMode.Additive;

        }

         /// <summary>
        /// We overide the update to generate new particles acording to our cycle pattern.
        /// </summary>
        /// <param name="dt">time since the last update</param>
       public override void Update(float dt)
        {
            cycleMeter += dt;
            if (cycleMeter > ParticleCycleTime)
            {
                AddParticles(EmitterPosition,2);
                cycleMeter = 0;
            }
            if (EmitterPosition.Y < -100)
                Active = false;

            base.Update(dt);
        }

        /// <summary>
        /// InitializeParticle is overridden to bind to the emitter it'self.
        /// </summary>
        /// <param name="p">the particle to set up</param>
        /// <param name="where">where the particle should be placed</param>
        protected override void InitializeParticle(Particle p, Vector2 where)
        {
            base.InitializeParticle(p, where);

            // the base is mostly good, but we want to have the effect travel with the emitter
            p.Position = EmitterPosition;
            p.Velocity = EmitterVelocity;
            p.Acceleration = EmitterAcceleration;
        }
    }

}
```

I've added the complete code for this effect, so just replace the generated class (renamed the namespace, added using statements for XNA and removed the default class name).

The implementation is quite simple, we have created a unique effect on top of the template and included 3 overloads:

> - Update to Initialise Constants (Mandatory)
>
> This is the only mandatory requirement for any new particle effect, to setup it's starting parameters which control how particles are generated when called. These are also the most tricky to configure to get the effect you want.
>
> - Supplemented Update
>
> As we are aiming for a self sustained effect (a constant fireball) we want to generate new particles to replace those that die during the cause of our fireball shot, so we override update to add more particles each update. This is also supplemented by an effect specific attribute "CycleMeter" to control how often new particles should happen. (0 = every frame, 10 = every 10 seconds), the timing is set in the "ParticleCycleTime" attribute of the emitter.
>
> - Supplemented Initialise Particle
>
> As we want the particles to follow the emitter and not fly of in a random direction (which is the default), we fix the particles position to the emitters position. We could enhance this if we wished to make the particle circle around the emitter if we wished.

The effect that this will give us will be a sustained burst of particles that are constantly generated on top of the emitter.

---

## Not forgetting our actual particle

With all this code in lace we still need a texture for our particle to draw, so download the code from the beginning of this article and copy the Explosion.PNG image from the content folder, create a new folder in your content project called "Particles" and paste it there.

|   |
| --- |
|  |
| Explosion Particle |

Now it may not look like much at the moment, but just wait and see what the particle engine makes of it.

---

## Calling the effect

So now that we have our effect, lets bring the fire, this is simple enough since we have a separate function in the trooper section of StarTroopeSprites for the trooper to fire, so add the following to the TrooperFire function:

```csharp
FireballParticleEmitter fireballemitter = new FireballParticleEmitter();
fireballemitter.Initialize("explosion", 10);
fireballemitter.EmitterPosition = new Vector2(Position.X, Position.Y - 35);
fireballemitter.EmitterVelocity = new Vector2(0, -40);
fireballemitter.EmitterAcceleration = new Vector2(0, -0.5f);
fireballemitter.ParticleCycleTime = 0f;
StarTrooperGame.ParticleManager.Add(fireballemitter);
```

In here we:

1. create new emitter for the effect we just setup
2. initialised the emitter with the Explosion sprite
3. Set it's position, velocity and acceleration
4. Set the Particle cycle time to 0 so that it constantly spews particles (but if you wanted to make the fireball splutter just increase this slightly)
5. And finally hand over the emitter to our Particle Manager to control

Run the game now and when you shoot your fireball, it should be followed by a nice new particle enabled fireball.

|   |   |
| --- | --- |
|  |  |
| Old fireball | New Fireball |

---

## But wait there's more.

A good thing to remember with particle effects is that we don't just have to live with one effect, we can combine effects in many different ways to get a better result. If you look back to the previous post you will notice a nice little smoke plume emanating from the tail of our fireball, fire emits smoke doesn't it :)

So lets add another effect to our list, add the following to the ParticleEmitters class:

```csharp
/// <summary>
/// ExplosionSmokeParticleSystem is a specialization of ParticleSystem which
/// creates a circular pattern of smoke. It should be combined with
/// ExplosionParticleSystem for best effect.
/// </summary>
public class FireballSmokeParticleEmitter : ParticleEmitter
{
float cycleMeter = 0;
public FireballSmokeParticleEmitter()
{
}

/// <summary>
/// Set up the constants that will give this particle system its behavior and
/// properties.
/// </summary>
protected override void InitializeConstants()
{
  // less initial speed than the explosion itself
  minInitialSpeed = 20;
  maxInitialSpeed = 200;

  // acceleration is negative, so particles will accelerate away from the
  // initial velocity.  this will make them slow down, as if from wind
  // resistance. we want the smoke to linger a bit and feel wispy, though,
  // so we don't stop them completely like we do ExplosionParticleSystem
  // particles.
  minAcceleration = -10;
  maxAcceleration = -50;

  // explosion smoke lasts for longer than the explosion itself, but not
  // as long as the plumes do.
  minLifetime = 1.0f;
  maxLifetime = 2.5f;

  minScale = 0.03f;
  maxScale = 0.1f;

  minNumParticles = 1;
  maxNumParticles = 2;

  minRotationSpeed = -MathHelper.PiOver4;
  maxRotationSpeed = MathHelper.PiOver4;

  spriteBlendMode = SpriteBlendMode.AlphaBlend;

}
protected override void InitializeParticle(Particle p, Vector2 where)
{
  base.InitializeParticle(p, where);

  // The base works fine except for acceleration. Explosions move outwards,
  // then slow down and stop because of air resistance. Let's change
  // acceleration so that when the particle is at max lifetime, the velocity
  // will be zero.

  // We'll use the equation vt = v0 + (a0 * t). (If you're not familar with
  // this, it's one of the basic kinematics equations for constant
  // acceleration, and basically says:
  // velocity at time t = initial velocity + acceleration * t)
  // We'll solve the equation for a0, using t = p.Lifetime and vt = 0.
  // the base is mostly good, but we want to have the effect travel with the emitter
  p.Position = EmitterPosition;
  p.Velocity = EmitterVelocity;
  p.Acceleration = -EmitterVelocity / p.Lifetime;
}

public override void Update(float dt)
{
  cycleMeter += dt;
  if (cycleMeter > ParticleCycleTime)
  {
    AddParticles(EmitterPosition, 2);
    cycleMeter = 0;
  }
  if (EmitterPosition.Y < -100)
    Active = false;

  base.Update(dt);
}
```

Now this effect is similar to our Fireball effect with a few minor differences:

> - It lasts a bit longer (min and max lifetime are greater) as smoke lingers
>
> - It is slower (min and max speed are reduced)
>
> - The acceleration is also slower so that the smoke gets left behind
>
> - We use a different blend effect for better results

If we add this now to our fireball launch code in StarTrooperSprites we get a much nicer effect (I've also moved it to a separate function to make it more friendly), so remove the code added above in the "TrooperFire" function for the fireball effect and add the following function:

```csharp
void FireballLaunch(Vector2 position, Vector2 velocity, Vector2 accel)
{

  FireballSmokeParticleEmitter smokeemitter = new FireballSmokeParticleEmitter();
  smokeemitter.Initialize("smoke", 10);
  smokeemitter.EmitterPosition = position;
  smokeemitter.EmitterVelocity = velocity;
  smokeemitter.EmitterAcceleration = accel;
  smokeemitter.ParticleCycleTime = 0f;
  StarTrooperGame.ParticleManager.Add(smokeemitter);

  FireballParticleEmitter fireballemitter = new FireballParticleEmitter();
  fireballemitter.Initialize("explosion", 10);
  fireballemitter.EmitterPosition = position;
  fireballemitter.EmitterVelocity = velocity;
  fireballemitter.EmitterAcceleration = accel;
  fireballemitter.ParticleCycleTime = 0f;
  StarTrooperGame.ParticleManager.Add(fireballemitter);

}
```

And just add the following call to the "TrooperFire" function:

```csharp
FireballLaunch(new Vector2(Position.X, Position.Y - 35), new Vector2(0, -40), new Vector2(0, -0.5f));
```

This gives us our flaming ball of death, beware Condors!!!

---

## Draw Order

A quick note about draw order. The current particle implementation above does not have any facilities for managing draw order as part of the effects, that being which effect gets drawn on top of which.

For example reverse the order in which the smoke and explosion effects are drawn and have a look at the corresponding result. You should see this:

Not quite as good is it as it now appears we have fire from smoke?, not my cup of tea.

So take care using this and consider in your experiments (see below) which order you want to draw your effects. There are a couple of ways to handle this more programmatically, like adding a sort to the Pool class based on an attribute in the emitter, but this wouldn't give you as much flexibility as you might think.

Choose wisely as to your approach and beware of the unintended consequences of your developments :D

One problem which can only be really handled by having multiple particle managers, would be to have the ability to differentiate between foreground effects (like what we have) and background effects (like clouds below the player or smoke rising from a scared city below).

---

Experimentation

Now the main thing with particle effects is experimentation. the above effect took me approx 1 hour to put together, here's a little run down of what it took to get to this point

|   |   |   |   |   |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
| 1st run, way too many particles and they didn't follow the emitter, except flame up | Less particles but they didn't last long enough or spawn quick enough. Also too big | Got the fireball right but we needed more | Great effect, something to keep for later. Not the ball I wanted.<br><br>May be to use in a different colour as a plasma ball? | The end result. |

This is why most AAA rated games have dedicated teams (not just individuals) for creating and managing effects like this. It can take a fair bit of time to get it right and within budget (both Time and game update/draw costs).

---

## Conclusion and a final note.

With all this going on it's easy to forget that fantastic effects come at a cost, more effects means more to draw and heavy on the graphics card. You might be able to run big shiny and fabulous effects on you development machine with a lofty DX 10/11 graphics card and oodles of memory / cpu. But remember the audience you are aiming for, XBOX, laptops/networks?, Windows Mobile.

you have a few choices add some configuration to up the graphics to the max for high spec machines and lower settings for those of us on a budget or want to game on the go, or aim for a middle ground so you get the same look and feel no matter the device you use.

For instance, the main reason I dropped the fiery wall of death, the first thing I ended up with (apart from it not being what I was aiming for), was because as soon as I hade more then 5 of then, my poor laptop slowed right down because it was spewing out millions of particles (pretty obvious really)

This prompted my next intermission on performance, a quick and easy way to monitor it and the cost of the effects I was generating.

Lets bring the numbers!
