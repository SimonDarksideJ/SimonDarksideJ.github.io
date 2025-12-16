---
layout: post
title: 'Intermission #7 / 2 - Bring on the Fire'
date: 2012-06-29 11:01:40
tags: [2d tutorial, game development, xna]
---

2D,XNA,Game DevelopmentIn the last post we set the groundwork with the particle system itself.  Now we can move on to making use of this and adding / customising our effects.

This post will be keenly followed by another post about monitoring the performance of your game.  I had not originally planned on it but since I hit problems when applying the particle effects (completely my own fault but a good lesson to learn), I felt it was wise to impart some of this experience to you.

After that we will roll up this phase of intermissions with an update to the Windows Phone 7 project and add all the extra bits (in their WP7 flavour) to that project (cannot wait to run everything from there come XNA 4 full release).

Then back the the tutorial series itself by adding some sound!!

As usual all the code for this section can be found [here on codeplex](http://startrooper2dxna.codeplex.com/releases/view/46712).

 


### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

 


### The aims of our fireball effect

Below is a diagram of what we are aiming for with our replacement fireball effect, a bit more snazzy than our original sprite:

![image](assets/img/posts/image-not-found.png)

We need the emitter to be thrown up spewing out fire as it does and trailed with a smoke plume to give it an extra edge.  We could just launch out particles together from our trooper for the effect but we would loose cohesion from our fireball and loose a level of control should we wish to add similar effects for other weapons.

 

* * *

 


### Making use of the particle framework 

Below is a diagram of the framework we have setup:

![image](assets/img/posts/image-not-found.png)

From here you can see our standard particle system framework.  Within our framework we will define several emitter effect definitions based on the emitter control template.  This gives us a wide array of capabilities and options for setting up our effects, we can implement either:

> ![](assets/img/posts/image-not-found.png)    Static Controlled effect
> 
> Where the game controls how the effect is generated and updated, including when new particles are generated, this is what is used in the CC particle sample.
> 
> ![](assets/img/posts/image-not-found.png)    Self sustaining effect
> 
> Where an effect is launched and generates a pattern of particles but the game still controls the emitter.  Which is what we will use in this tutorial
> 
> ![](assets/img/posts/image-not-found.png)    Self controlled effect
> 
> In this the game initiates the effect but after that has no direct control, the emitter is completely self controlled.  Bit like a fire out of control (if you could program real fire)

So lets get on and get this started.

* * *


### Finishing up from the last episode

First we will return to the Particle Manager add add the last few parts to make the Particle Engine functional.

Back in the ParticleManager.cs class, first we need the pool for the emitters and a place to store the textures we intend to use (this enables use to re-use textures across emitters without consuming more memory)

Add the following to the beginning of the Particle Manager:

    
    
         1: SwampLib.Pool\<ParticleEmitter\> m\_emitters;
    
    
    
         2: Dictionary\<String, Texture2D\> m\_textures;
    
    
    
    Next we need to update the initialise function to setup our manager:
    
    
    
        
        
             1: public override void Initialize()
        
        
        
             2: {
        
        
        
             3: // TODO: Add your initialization code here
        
        
        
             4: m\_emitters = new SwampLib.Pool\<ParticleEmitter\>(1000);
        
        
        
             5: m\_textures = new Dictionary\<string, Texture2D\>();
        
        
        
             6: base.Initialize();
        
        
        
             7: }
        
        
        
        There is nothing to do in the Load Resources or Unload Resources for now (since textures are added as individual emitters are created, you might want to change this to see what improvements it can make, but remember by moving it here you loose a fair amount of flexibility)
        
        
        
        The main work horses of the manager are the Update and Draw loops, in the update loop below:
        
        
        
            
            
                 1: /// \<summary\>
            
            
            
                 2: /// Allows the game component to update itself.
            
            
            
                 3: /// \</summary\>
            
            
            
                 4: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
            
            
            
                 5: public override void Update(GameTime gameTime)
            
            
            
                 6: {
            
            
            
                 7: // calculate dt, the change in the since the last frame. the particle
            
            
            
                 8: // updates will use this value.
            
            
            
                 9: float dt = (float)gameTime.ElapsedGameTime.TotalSeconds;
            
            
            
                 10: 
            
            
            
                 11: // Go through all of the active particles for each emitter.
            
            
            
                 12: // Note that because we will return any particle that has finished,
            
            
            
                 13: // we need to use the iterator that returns nodes instead of particles.
            
            
            
                 14: foreach (SwampLib.Pool\<ParticleEmitter\>.Node penode in m\_emitters.ActiveNodes)
            
            
            
                 15: {
            
            
            
                 16: 
            
            
            
                 17: if (penode.Item.Active)
            
            
            
                 18: {
            
            
            
                 19: penode.Item.Update(dt);
            
            
            
                 20: 
            
            
            
                 21: if (!penode.Item.Active)
            
            
            
                 22: {
            
            
            
                 23: m\_emitters.Return(penode);
            
            
            
                 24: }
            
            
            
                 25: }
            
            
            
                 26: 
            
            
            
                 27: }
            
            
            
                 28: base.Update(gameTime);
            
            
            
                 29: }
            
            
            
            Here we simply loop through each emitter and update it (if it is active).  If an emitter becomes inactive after it is update, we then remove it from the pool and free up a slot.
            
            
            
            The Draw loop is similar except it does al the draw work in one place:
            
            
            
                
                
                     1: /// \<summary\>
                
                
                
                     2: /// This is called when the game should draw itself.
                
                
                
                     3: /// \</summary\>
                
                
                
                     4: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
                
                
                
                     5: public override void Draw(GameTime gameTime)
                
                
                
                     6: {
                
                
                
                     7: // TODO: Add your drawing code here
                
                
                
                     8: // tell sprite batch to begin, using the spriteBlendMode specified in
                
                
                
                     9: // initializeConstants
                
                
                
                     10: foreach (ParticleEmitter pe in m\_emitters)
                
                
                
                     11: {
                
                
                
                     12: StarTrooperGame.spriteBatch.Begin(pe.SpriteBlendMode);
                
                
                
                     13: foreach (Particle p in pe.particles)
                
                
                
                     14: {
                
                
                
                     15: // normalized lifetime is a value from 0 to 1 and represents how far
                
                
                
                     16: // a particle is through its life. 0 means it just started, .5 is half
                
                
                
                     17: // way through, and 1.0 means it is just about to be finished.
                
                
                
                     18: // this value will be used to calculate alpha and scale, to avoid 
                
                
                
                     19: // having particles suddenly appear or disappear.
                
                
                
                     20: float normalizedLifetime = p.TimeSinceStart / p.Lifetime;
                
                
                
                     21: 
                
                
                
                     22: // we want particles to fade in and fade out, so we will calculate alpha
                
                
                
                     23: // to be (normalizedLifetime) \* (1-normalizedLifetime). this way, when
                
                
                
                     24: // normalizedLifetime is 0 or 1, alpha is 0. the maximum value is at
                
                
                
                     25: // normalizedLifetime = .5, and is
                
                
                
                     26: // (normalizedLifetime) \* (1-normalizedLifetime)
                
                
                
                     27: // (.5) \* (1-.5)
                
                
                
                     28: // .25
                
                
                
                     29: // since we want the maximum alpha to be 1, not .25, we will scale the 
                
                
                
                     30: // entire equation by 4.
                
                
                
                     31: float alpha = 4 \* normalizedLifetime \* (1 - normalizedLifetime);
                
                
                
                     32: Color color = new Color(new Vector4(1, 1, 1, alpha));
                
                
                
                     33: 
                
                
                
                     34: // make particles grow as they age. they'll start at 75% of their size,
                
                
                
                     35: // and increase to 100% once they're finished.
                
                
                
                     36: float scale = p.Scale \* (.75f + .25f \* normalizedLifetime);
                
                
                
                     37: 
                
                
                
                     38: StarTrooperGame.spriteBatch.Draw(m\_textures[pe.Texture], p.Position, null, color,
                
                
                
                     39: p.Rotation, pe.Origin, scale, SpriteEffects.None, 0.0f);
                
                
                
                     40: 
                
                
                
                     41: }
                
                
                
                     42: StarTrooperGame.spriteBatch.End();
                
                
                
                     43: }
                
                
                
                     44: base.Draw(gameTime);
                
                
                
                     45: }
                
                
                
                Here we reuse the SpriteBatch from the main game class setting the corresponding Sprite Blend mode according to the Emitter (so we can use both additive and alpha blended effects (more on that when we use this).  The rest of the code is well commented (from the original MS sample) were we use the particles lifetime to adjust the alpha part of the particle (making if fade out as it dies) and the scale (to make the particle grow as it dies).
                
                
                
                Finally we draw each particle to the screen using the texture from the manager according to the specified texture in the emitter.
                
                
                
                To finish off the updates to the manager we add a few helper functions that just make life a bit easier:
                
                
                
                 
                
                
                
                    
                    
                         1: public void Add(ParticleEmitter emitter)
                    
                    
                    
                         2: {
                    
                    
                    
                         3: m\_emitters.Add(emitter);
                    
                    
                    
                         4: }
                    
                    
                    
                         5: 
                    
                    
                    
                         6: public Texture2D LoadTexture(String texture)
                    
                    
                    
                         7: {
                    
                    
                    
                         8: Texture2D tex;
                    
                    
                    
                         9: try { tex = m\_textures[texture]; }
                    
                    
                    
                         10: catch
                    
                    
                    
                         11: {
                    
                    
                    
                         12: tex = Game.Content.Load\<Texture2D\>(@"Particles\" + texture);
                    
                    
                    
                         13: m\_textures.Add(texture, tex);
                    
                    
                    
                         14: }
                    
                    
                    
                         15: 
                    
                    
                    
                         16: return tex;
                    
                    
                    
                         17: }
                    
                    
                    
                     
                    
                    
                    
                    Here we just expose the method off adding a new emitter to the manager and a function to manage the texture library maintained by the Particle Manager.
                    
                    
                    
                     
                    
                    
                    * * *
                    
                    ### On with the show, the first effect
                    
                    
                    To make it easier to distinguish between the Emitter template and our new effects, first setup a new class in the engine folder called “ParticleEmitters.cs” and then add the following code for the effect:
                    
                    
                    
                        
                        
                             1: using System;
                        
                        
                        
                             2: using System.Collections.Generic;
                        
                        
                        
                             3: using System.Linq;
                        
                        
                        
                             4: using System.Text;
                        
                        
                        
                             5: using Microsoft.Xna.Framework;
                        
                        
                        
                             6: using Microsoft.Xna.Framework.Graphics;
                        
                        
                        
                             7: 
                        
                        
                        
                             8: namespace TestProject
                        
                        
                        
                             9: {
                        
                        
                        
                             10: 
                        
                        
                        
                             11: /// \<summary\>
                        
                        
                        
                             12: /// ExplosionParticleSystem is a specialization of ParticleEmitter which creates a
                        
                        
                        
                             13: /// fiery explosion. It should be combined with FireballSmokeParticleSystem for
                        
                        
                        
                             14: /// best effect.
                        
                        
                        
                             15: /// \</summary\>
                        
                        
                        
                             16: public class FireballParticleEmitter : ParticleEmitter
                        
                        
                        
                             17: {
                        
                        
                        
                             18: float cycleMeter = 0;
                        
                        
                        
                             19: public FireballParticleEmitter()
                        
                        
                        
                             20: {
                        
                        
                        
                             21: }
                        
                        
                        
                             22: 
                        
                        
                        
                             23: /// \<summary\>
                        
                        
                        
                             24: /// Set up the constants that will give this particle system its behavior and
                        
                        
                        
                             25: /// properties.
                        
                        
                        
                             26: /// \</summary\>
                        
                        
                        
                             27: protected override void InitializeConstants()
                        
                        
                        
                             28: {
                        
                        
                        
                             29: // high initial speed with lots of variance. make the values closer
                        
                        
                        
                             30: // together to have more consistently circular explosions.
                        
                        
                        
                             31: minInitialSpeed = 40;
                        
                        
                        
                             32: maxInitialSpeed = 500;
                        
                        
                        
                             33: 
                        
                        
                        
                             34: // doesn't matter what these values are set to, acceleration is tweaked in
                        
                        
                        
                             35: // the override of InitializeParticle.
                        
                        
                        
                             36: minAcceleration = 0;
                        
                        
                        
                             37: maxAcceleration = 0;
                        
                        
                        
                             38: 
                        
                        
                        
                             39: // explosions should be relatively short lived
                        
                        
                        
                             40: minLifetime = 1f;
                        
                        
                        
                             41: maxLifetime = 2f;
                        
                        
                        
                             42: 
                        
                        
                        
                             43: minScale = 0.03f;
                        
                        
                        
                             44: maxScale = 0.1f;
                        
                        
                        
                             45: 
                        
                        
                        
                             46: minNumParticles = 1;
                        
                        
                        
                             47: maxNumParticles = 2;
                        
                        
                        
                             48: 
                        
                        
                        
                             49: minRotationSpeed = -MathHelper.PiOver4;
                        
                        
                        
                             50: maxRotationSpeed = MathHelper.PiOver4;
                        
                        
                        
                             51: 
                        
                        
                        
                             52: // additive blending is very good at creating fiery effects.
                        
                        
                        
                             53: spriteBlendMode = SpriteBlendMode.Additive;
                        
                        
                        
                             54: 
                        
                        
                        
                             55: }
                        
                        
                        
                             56: 
                        
                        
                        
                             57: /// \<summary\>
                        
                        
                        
                             58: /// We overide the update to generate new particles acording to our cycle pattern.
                        
                        
                        
                             59: /// \</summary\>
                        
                        
                        
                             60: /// \<param name="dt"\>time since the last update\</param\>
                        
                        
                        
                             61: public override void Update(float dt)
                        
                        
                        
                             62: {
                        
                        
                        
                             63: cycleMeter += dt;
                        
                        
                        
                             64: if (cycleMeter \> ParticleCycleTime)
                        
                        
                        
                             65: {
                        
                        
                        
                             66: AddParticles(EmitterPosition,2);
                        
                        
                        
                             67: cycleMeter = 0;
                        
                        
                        
                             68: }
                        
                        
                        
                             69: if (EmitterPosition.Y \< -100)
                        
                        
                        
                             70: Active = false;
                        
                        
                        
                             71: 
                        
                        
                        
                             72: base.Update(dt);
                        
                        
                        
                             73: }
                        
                        
                        
                             74: 
                        
                        
                        
                             75: /// \<summary\>
                        
                        
                        
                             76: /// InitializeParticle is overridden to bind to the emitter it'self.
                        
                        
                        
                             77: /// \</summary\>
                        
                        
                        
                             78: /// \<param name="p"\>the particle to set up\</param\>
                        
                        
                        
                             79: /// \<param name="where"\>where the particle should be placed\</param\>
                        
                        
                        
                             80: protected override void InitializeParticle(Particle p, Vector2 where)
                        
                        
                        
                             81: {
                        
                        
                        
                             82: base.InitializeParticle(p, where);
                        
                        
                        
                             83: 
                        
                        
                        
                             84: // the base is mostly good, but we want to have the effect travel with the emitter
                        
                        
                        
                             85: p.Position = EmitterPosition;
                        
                        
                        
                             86: p.Velocity = EmitterVelocity;
                        
                        
                        
                             87: p.Acceleration = EmitterAcceleration;
                        
                        
                        
                             88: }
                        
                        
                        
                             89: }
                        
                        
                        
                             90: 
                        
                        
                        
                             91: }
                        
                        
                        
                        I have added the complete code for this effect, so just replace the generated class (renamed the namespace, added using statements for XNA and removed the default class name).
                        
                        
                        
                        The implementation is quite simple, we have created a unique effect on top of the template and included 3 overloads:
                        
                        
                        
                        > ![](assets/img/posts/image-not-found.png)    Update to Initialise Constants (Mandatory)
                        > 
                        > This is the only mandatory requirement for any new particle effect, to setup it is starting parameters which control how particles are generated when called.  These are also the most tricky to configure to get the effect you want.
                        > 
                        > ![](assets/img/posts/image-not-found.png)    Supplemented Update
                        > 
                        > As we are aiming for a self sustained effect (a constant fireball) we want to generate new particles to replace those that die during the cause of our fireball shot, so we override update to add more particles each update.  This is also supplemented by an effect specific attribute “CycleMeter” to control how often new particles should happen.  (0 = every frame, 10 = every 10 seconds), the timing is set in the “ParticleCycleTime” attribute of the emitter.
                        > 
                        > ![](assets/img/posts/image-not-found.png)    Supplemented Initialise Particle
                        > 
                        > As we want the particles to follow the emitter and not fly of in a random direction (which is the default), we fix the particles position to the emitters position.  We could enhance this if we wished to make the particle circle around the emitter if we wished.
                        
                        
                        
                        The effect that this will give us will be a sustained burst of particles that are constantly generated on top of the emitter.
                        
                        
                        
                         
                        
                        
                        * * *
                        
                        
                         
                        
                        
                        ### Not forgetting our actual particle
                        
                        
                        With all this code in lace we still need a texture for our particle to draw, so download the code from the beginning of this article and copy the Explosion.PNG image from the content folder, create a new folder in your content project called “Particles” and paste it there.
                        
                        
                        
                        
                        | 
                        
                        ![explosion](assets/img/posts/image-not-found.png)
                        
                         |
                        | 
                        
                        Explosion Particle
                        
                         |
                        
                        
                        
                        Now it may not look like much at the moment, but just wait and see what the particle engine makes of it.
                        
                        
                         
                        
                        
                        * * *
                        
                        
                         
                        
                        
                        ### Calling the effect
                        
                        
                        So now that we have our effect, lets bring the fire, this is simple enough since we have a separate function in the trooper section of StarTroopeSprites for the trooper to fire, so add the following to the TrooperFire function:
                        
                        
                        
                            
                            
                                 1: FireballParticleEmitter fireballemitter = new FireballParticleEmitter();
                            
                            
                            
                                 2: fireballemitter.Initialize("explosion", 10);
                            
                            
                            
                                 3: fireballemitter.EmitterPosition = new Vector2(Position.X, Position.Y - 35);
                            
                            
                            
                                 4: fireballemitter.EmitterVelocity = new Vector2(0, -40);
                            
                            
                            
                                 5: fireballemitter.EmitterAcceleration = new Vector2(0, -0.5f);
                            
                            
                            
                                 6: fireballemitter.ParticleCycleTime = 0f;
                            
                            
                            
                                 7: StarTrooperGame.ParticleManager.Add(fireballemitter);
                            
                            
                            
                            In here we:
                            
                            
                            1. create new emitter for the effect we just setup
                            2. initialised the emitter with the Explosion sprite
                            3. Set it is position, velocity and acceleration
                            4. Set the Particle cycle time to 0 so that it constantly spews particles (but if you wanted to make the fireball splutter just increase this slightly)
                            5. And finally hand over the emitter to our Particle Manager to control 
                            
                            
                            Run the game now and when you shoot your fireball, it should be followed by a nice new particle enabled fireball.
                            
                            
                            
                            
                            | ![Fire01](assets/img/posts/image-not-found.png) | ![image[6]](http://xna-uk.net/blogs/darkgenesis/image6_58C68F09.png) |
                            | 
                            
                            Old fireball
                            
                             | 
                            
                            New Fireball
                            
                             |
                            
                            
                            
                            
                             
                            
                            
                            
                             
                            
                            
                            * * *
                            
                            
                             
                            
                            
                            ### But wait there is more.
                            
                            
                            A good thing to remember with particle effects is that we do not just have to live with one effect, we can combine effects in many different ways to get a better result.  If you look back the the previous post you will notice a nice little smoke plume emanating from the tail of our fireball, fire emits smoke does not it ![Smile](/blogs/darkgenesis/wlEmoticonsmile_66D55839.png)
                            
                            
                            
                            So lets add another effect to our list, add the following to the ParticleEmitters class:
                            
                            
                            
                                
                                
                                     1: /// \<summary\>
                                
                                
                                
                                     2: /// ExplosionSmokeParticleSystem is a specialization of ParticleSystem which
                                
                                
                                
                                     3: /// creates a circular pattern of smoke. It should be combined with
                                
                                
                                
                                     4: /// ExplosionParticleSystem for best effect.
                                
                                
                                
                                     5: /// \</summary\>
                                
                                
                                
                                     6: public class FireballSmokeParticleEmitter : ParticleEmitter
                                
                                
                                
                                     7: {
                                
                                
                                
                                     8: float cycleMeter = 0;
                                
                                
                                
                                     9: public FireballSmokeParticleEmitter()
                                
                                
                                
                                     10: {
                                
                                
                                
                                     11: }
                                
                                
                                
                                     12: 
                                
                                
                                
                                     13: /// \<summary\>
                                
                                
                                
                                     14: /// Set up the constants that will give this particle system its behavior and
                                
                                
                                
                                     15: /// properties.
                                
                                
                                
                                     16: /// \</summary\>
                                
                                
                                
                                     17: protected override void InitializeConstants()
                                
                                
                                
                                     18: {
                                
                                
                                
                                     19: // less initial speed than the explosion itself
                                
                                
                                
                                     20: minInitialSpeed = 20;
                                
                                
                                
                                     21: maxInitialSpeed = 200;
                                
                                
                                
                                     22: 
                                
                                
                                
                                     23: // acceleration is negative, so particles will accelerate away from the
                                
                                
                                
                                     24: // initial velocity. this will make them slow down, as if from wind
                                
                                
                                
                                     25: // resistance. we want the smoke to linger a bit and feel wispy, though,
                                
                                
                                
                                     26: // so we don't stop them completely like we do ExplosionParticleSystem
                                
                                
                                
                                     27: // particles.
                                
                                
                                
                                     28: minAcceleration = -10;
                                
                                
                                
                                     29: maxAcceleration = -50;
                                
                                
                                
                                     30: 
                                
                                
                                
                                     31: // explosion smoke lasts for longer than the explosion itself, but not
                                
                                
                                
                                     32: // as long as the plumes do.
                                
                                
                                
                                     33: minLifetime = 1.0f;
                                
                                
                                
                                     34: maxLifetime = 2.5f;
                                
                                
                                
                                     35: 
                                
                                
                                
                                     36: minScale = 0.03f;
                                
                                
                                
                                     37: maxScale = 0.1f;
                                
                                
                                
                                     38: 
                                
                                
                                
                                     39: minNumParticles = 1;
                                
                                
                                
                                     40: maxNumParticles = 2;
                                
                                
                                
                                     41: 
                                
                                
                                
                                     42: minRotationSpeed = -MathHelper.PiOver4;
                                
                                
                                
                                     43: maxRotationSpeed = MathHelper.PiOver4;
                                
                                
                                
                                     44: 
                                
                                
                                
                                     45: spriteBlendMode = SpriteBlendMode.AlphaBlend;
                                
                                
                                
                                     46: 
                                
                                
                                
                                     47: }
                                
                                
                                
                                     48: protected override void InitializeParticle(Particle p, Vector2 where)
                                
                                
                                
                                     49: {
                                
                                
                                
                                     50: base.InitializeParticle(p, where);
                                
                                
                                
                                     51: 
                                
                                
                                
                                     52: // The base works fine except for acceleration. Explosions move outwards,
                                
                                
                                
                                     53: // then slow down and stop because of air resistance. Let's change
                                
                                
                                
                                     54: // acceleration so that when the particle is at max lifetime, the velocity
                                
                                
                                
                                     55: // will be zero.
                                
                                
                                
                                     56: 
                                
                                
                                
                                     57: // We'll use the equation vt = v0 + (a0 \* t). (If you are not familar with
                                
                                
                                
                                     58: // this, it's one of the basic kinematics equations for constant
                                
                                
                                
                                     59: // acceleration, and basically says:
                                
                                
                                
                                     60: // velocity at time t = initial velocity + acceleration \* t)
                                
                                
                                
                                     61: // We'll solve the equation for a0, using t = p.Lifetime and vt = 0.
                                
                                
                                
                                     62: // the base is mostly good, but we want to have the effect travel with the emitter
                                
                                
                                
                                     63: p.Position = EmitterPosition;
                                
                                
                                
                                     64: p.Velocity = EmitterVelocity;
                                
                                
                                
                                     65: p.Acceleration = -EmitterVelocity / p.Lifetime;
                                
                                
                                
                                     66: }
                                
                                
                                
                                     67: 
                                
                                
                                
                                     68: public override void Update(float dt)
                                
                                
                                
                                     69: {
                                
                                
                                
                                     70: cycleMeter += dt;
                                
                                
                                
                                     71: if (cycleMeter \> ParticleCycleTime)
                                
                                
                                
                                     72: {
                                
                                
                                
                                     73: AddParticles(EmitterPosition, 2);
                                
                                
                                
                                     74: cycleMeter = 0;
                                
                                
                                
                                     75: }
                                
                                
                                
                                     76: if (EmitterPosition.Y \< -100)
                                
                                
                                
                                     77: Active = false;
                                
                                
                                
                                     78: 
                                
                                
                                
                                     79: base.Update(dt);
                                
                                
                                
                                     80: }
                                
                                
                                
                                Now this effect is similar to our Fireball effect with a few minor differences:
                                
                                
                                
                                > ![](assets/img/posts/image-not-found.png)    It lasts a bit longer (min and max lifetime are greater) as smoke lingers   
                                > ![](assets/img/posts/image-not-found.png)    It is slower (min and max speed are reduced)   
                                > ![](assets/img/posts/image-not-found.png)    The acceleration is also slower so that the smoke gets left behind   
                                > ![](assets/img/posts/image-not-found.png)    We use a different blend effect for better results
                                
                                
                                
                                If we add this now to our fireball launch code in StarTrooperSprites we get a much nicer effect (I’ve also moved it to a separate function to make it more friendly), so remove the code added above in the “TrooperFire” function for the fireball effect and add the following function:
                                
                                
                                
                                    
                                    
                                         1: void FireballLaunch(Vector2 position, Vector2 velocity, Vector2 accel)
                                    
                                    
                                    
                                         2: {
                                    
                                    
                                    
                                         3: 
                                    
                                    
                                    
                                         4: FireballSmokeParticleEmitter smokeemitter = new FireballSmokeParticleEmitter();
                                    
                                    
                                    
                                         5: smokeemitter.Initialize("smoke", 10);
                                    
                                    
                                    
                                         6: smokeemitter.EmitterPosition = position;
                                    
                                    
                                    
                                         7: smokeemitter.EmitterVelocity = velocity;
                                    
                                    
                                    
                                         8: smokeemitter.EmitterAcceleration = accel;
                                    
                                    
                                    
                                         9: smokeemitter.ParticleCycleTime = 0f;
                                    
                                    
                                    
                                         10: StarTrooperGame.ParticleManager.Add(smokeemitter);
                                    
                                    
                                    
                                         11: 
                                    
                                    
                                    
                                         12: FireballParticleEmitter fireballemitter = new FireballParticleEmitter();
                                    
                                    
                                    
                                         13: fireballemitter.Initialize("explosion", 10);
                                    
                                    
                                    
                                         14: fireballemitter.EmitterPosition = position;
                                    
                                    
                                    
                                         15: fireballemitter.EmitterVelocity = velocity;
                                    
                                    
                                    
                                         16: fireballemitter.EmitterAcceleration = accel;
                                    
                                    
                                    
                                         17: fireballemitter.ParticleCycleTime = 0f;
                                    
                                    
                                    
                                         18: StarTrooperGame.ParticleManager.Add(fireballemitter);
                                    
                                    
                                    
                                         19: 
                                    
                                    
                                    
                                         20: }
                                    
                                    
                                    
                                    And just add the following call to the “TrooperFire” function:
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                        
                                        
                                             1: FireballLaunch(new Vector2(Position.X, Position.Y - 35), new Vector2(0, -40), new Vector2(0, -0.5f));
                                        
                                        
                                        
                                        This gives us our flaming ball of death, beware Condors!!!
                                        
                                        
                                        
                                        ![Fireball-New](assets/img/posts/image-not-found.png)
                                        
                                        
                                        * * *
                                        
                                        ### Draw Order
                                        
                                        
                                        A quick note about draw order.  The current particle implementation above does not have any facilities for managing draw order as part of the effects, that being which effect gets drawn on top of which.
                                        
                                        
                                        
                                        For example reverse the order in which the smoke and explosion effects are drawn and have a look at the corresponding result.  You should see this:
                                        
                                        
                                        
                                        ![image](assets/img/posts/image-not-found.png)
                                        
                                        
                                        
                                        Not quite as good is it as it now appears we have fire from smoke?, not my cup of tea.
                                        
                                        
                                        
                                        So take care using this and consider in your experiments (see below) which order you want to draw your effects.  There are a couple of ways to handle this more programmatically, like adding a sort to the Pool class based on an attribute in the emitter, but this would not give you as much flexibility as you might think.
                                        
                                        
                                        
                                        Choose wisely as to your approach and beware of the unintended consequences of your developments ![Open-mouthed smile](/assets/img/wordpress/2012/06/wlEmoticon-openmouthedsmile.png)
                                        
                                        
                                        
                                        One problem which can only be really handled by having multiple particle managers, would be to have the ability to differentiate between foreground effects (like what we have) and background effects (like clouds below the player or smoke rising from a scared city below).
                                        
                                        
                                        
                                         
                                        
                                        
                                        * * *
                                        
                                        
                                         
                                        
                                        
                                        
                                        Experimentation
                                        
                                        
                                        
                                        Now the main thing with particle effects is experimentation.  the above effect took me approx 1 hour to put together, here is a little run down of what it took to get to this point
                                        
                                        
                                        
                                        
                                        | ![image](assets/img/posts/image-not-found.png) | ![image](assets/img/posts/image-not-found.png) | ![image](assets/img/posts/image-not-found.png) | ![image](assets/img/posts/image-not-found.png) | ![image](assets/img/posts/image-not-found.png) |
                                        | 1st run, way too many particles and they did not follow the emitter, except flame up | Less particles but they did not last long enough or spawn quick enough.  Also too big | Got the fireball right but we needed more | Great effect, something to keep for later.  Not the ball I wanted.   
                                        May be to use in a different colour as a plasma ball? | The end result. |
                                        
                                        
                                        
                                        
                                        This is why most AAA rated games have dedicated teams (not just individuals) for creating and managing effects like this.  It can take a fair bit of time to get it right and within budget (both Time and game update/draw costs).
                                        
                                        
                                        
                                        * * *
                                        
                                        
                                        ### Conclusion and a final note.
                                        
                                         
                                        
                                        With all this going on it is easy to forget that fantastic effects come at a cost, more effects means more to draw and heavy on the graphics card.  You might be able to run big shiny and fabulous effects on you development machine with a lofty DX 10/11 graphics card and oodles of memory / cpu.  But remember the audience you are aiming for, XBOX, laptops/networks?, Windows Mobile.
                                        
                                         
                                        
                                        you have a few choices add some configuration to up the graphics to the max for high spec machines and lower settings for those of us on a budget or want to game on the go, or aim for a middle ground so you get the same look and feel no matter the device you use.
                                        
                                         
                                        
                                        For instance, the main reason I dropped the fiery wall of death, the first thing I ended up with (apart from it not being what I was aiming for), was because as soon as I hade more then 5 of then, my poor laptop slowed right down because it was spewing out millions of particles (pretty obvious really)
                                        
                                        
                                        This prompted my next intermission on performance, a quick and easy way to monitor it and the cost of the effects I was generating.
                                        
                                        
                                        
                                        Lets bring the numbers!
                                        
                                        
                                        Technorati Tags: [XNA](http://technorati.com/tags/XNA),[particles](http://technorati.com/tags/particles)
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

