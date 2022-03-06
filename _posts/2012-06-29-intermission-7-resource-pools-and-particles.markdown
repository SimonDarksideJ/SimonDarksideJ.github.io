---
layout: post
title: 'Intermission #7 - Resource pools and Particles'
date: '2012-06-29 10:54:05'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

I was going to do this as two separate articles, but after a refresh trawl at what is already our there and available I have decided to put them together.  We do not need anything overly complex at this stage of the game, although I will point out some of the areas where you could go further (and point you in the right direction).

I’ve always been an advocate for “not re-inventing the wheel” and in these days of XNA development, you do not need to.  There are many resources and code stores to find implementations of what you need and you can either learn the lesson of someone else’s approach or just copy it for your own use (make sure the original author gets a mention if you do.

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

 

### Trawling through the net

In looking around at what other particle and resource pool are around, I found very different levels of content available, some were old but good (that just need tweaking to get back up to date), some were new but were either too basic or did not offer enough flexibility.  Some I really liked, here is a list of what is good that I have found so far:

> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    [Resource Pools by the SwampThing](http://swampthingtom.blogspot.com/2007/06/generic-pool-collection-class.html) – best description of what is required  for a full resource pool, implements this in the CC sample below (still in GS 2)   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    [An XNA resource pool on CodeCube](http://codecube.net/2010/01/xna-resource-pool/) – Quick and dirty yet ultimately flexible pool system   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    [An Honourable mention to my colleague NemoKrads particle tutorial series](/blogs/randomchaos/archive/2008/03/28/2d-particle-tutorial-iii) – Good graphics oriented particle tutorial (both 3D and 2D with shading)   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    [Creators club 2D particle sample](http://creators.xna.com/en-US/sample/particle) – Good resource but still in Game Studio 2 framework, needs a little love to get it going   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    [Riemers 2D game series particles section](http://www.riemers.net/eng/Tutorials/XNA/Csharp/Series2D/Particles.php) – Riemers has always been one of my favourites, the site has not been updated in a while and the tuts are in GS 3, but the forums are still alive and happening (I do not believe I actually wrote that then).

* * *

### Resource Pools

Resource pools are an attempt to make large lists of items as memory efficient as possible, the problem with using lists or fixed arrays are countless for areas where you need a large amount of objects that need to be created and destroyed on a regular basis.  Lists incur garbage collection issues (which on the XBOX is really bad) and arrays are of fixed size so unless you know exactly how many you are going to need and how often you need to clear it our or loop through it, it becomes problematic.

Resources pools try to get through this by using several methods, they use the fixed limit of an array and combine it with a stack of some description (usually a Queue, which is a dynamic list of values which takes items from the top and adds them back to the bottom when done, like the queue in the bank, once you leave the front of the queue you have to go to the back if you want in again 🙂 ).  Some just use a queue but this can be problematic.

The idea is simple enough, have a group of people standing around waiting to do work  (no pun intended in the current state of the economy) and have a manager sitting on the side calling names.  When a workers name is called they are set off and when they are done they go to the back of the queue.

 

Now the XNA sample just uses a Queue with no management, which is too light. The CodeCube class is nice and neat and extends this basic format efficiently, but does not have enough umph to it (IMHO, but I may still use it for my own projects at some point where it is useful).

So we are left with the SwampThing Resource pool, overall it provides a good framework for a memory efficient resource pool and there is good documentation for how to consume it.  So add the [Pool.CS class](http://startrooper2dxna.codeplex.com/releases/46712/download/128393) to the engine of our project as is for now.  Look in SwampThings post above for some of the background detail.

* * *

### Particles

Particle systems can be some of the most complex systems of many a game, where the desire for effect is key.  It does not have to be though, it just depends on your implementation and how far you want to go with it.

Particle systems are comprised of several Key components:

> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Particles – A single sprite texture or point sprite, the smallest component of particle effects.  Like a single spark in a firework.   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Particle Managers – Managers control how long an individual particle lives for, destroying it when it is dead and updating the one’s still alive.   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Particle Emitters – Emitters are a point of flow, like a hosepipe flooding out water, how you squeeze the pipe effects the kind of flow or spray emitted.   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Particle Behaviours – Control what a particle does once it has been emitted, swirls, dives or splits in two.  Many possibilities.   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Particle Animation – A scripted animation of several effects or particles.  Bit like a firework show.

We will only cover the first two or three here and maybe add more later, animations with particles in particular can be quite a bit of a challenge to get right.

An individual particle, as described above, is like a spark in a firework, however that spark can either be very small like a coloured pixel on a screen (sometimes referred to as a point sprite) or it can be quite large, which is usually referred to as a billboard sprite.  Of course it can also be in-between, point is that the actual texture used for the particle can be anything you want.

If you look around there are several good test apps or samples of firework displays which are all driven by particle effects.

| ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_6CB1C5C4.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_67230986.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_35C3F959.png) |
| 

Explosion effect (with Smoke)

 | 

Smoke Plume effect

 | 

Explosion Particle

 |

#### 1. Particle class

Now in keeping with reuse, the MS particle class example is as good an effort as any, so we will reuse that, grab it from [here off the codeplex](http://startrooper2dxna.codeplex.com/releases/46712/download/128395) site and add it to the engine folder (it has been updated slightly to fit in the project properly, just so you are aware, should you use the one direct from the CC particle sample).  To keep things simple though we will update the namespace of the class to the same as our project this time.  So update the namespace to:

    
    
         1: namespace TestProject
    
    
    
    The class itself is easy to under stand and well commented, in short we have a set of attributes about the particle:
    
    
    
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Position – location on the screen of the particle   
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Velocity – it is velocity   
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Acceleration – Its acceleration state so the particle increases or decreases each update   
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Lifetime – how long the particle should live   
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Scale – so we can expand or reduce the particle size   
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Rotation Speed – how fast the particle rotates   
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Rotation – the particles current rotation, initialised to a random angle   
    > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Time Since Start – how long the particle has been alive for
    
    
    
    We do need to add a few bits to the StarTrooperGame.cs class to support the MS version, nothing major, just adding the “RandomBetween” function and changing the state of the m\_Random attribute/.  First change the m\_Random attribute at the start of the StarTlrooperGame class to be static, like so:
    
    
    
        
        
             1: static Random m\_Random = new Random();
        
        
        
        Then add the following function towards the end of the class after the LoadResources function:
        
        
        
            
            
                 1: #region Helper Functions
            
            
            
                 2: 
            
            
            
                 3: // a handy little function that gives a random float between two
            
            
            
                 4: // values. This will be used in several places in the sample, in particilar in
            
            
            
                 5: // ParticleSystem.InitializeParticle.
            
            
            
                 6: public static float RandomBetween(float min, float max)
            
            
            
                 7: {
            
            
            
                 8: return min + (float)m\_Random.NextDouble() \* (max - min);
            
            
            
                 9: }
            
            
            
                 10: 
            
            
            
                 11: #endregion
            
            
            
            Finally add the following property for the Random attribute, this helps us later when we need random values for particles or emitters:
            
            
            
                
                
                     1: // a random number generator that the whole project can share.
                
                
                
                     2: public static Random Random { get { return m\_Random; } }
                
                
                #### 2. Particle Manager
                
                
                Now this class we will create from scratch as the sample that is available is a bit hard to read and Swampthings version although complete doe beat around the bush a bit.  Since we also want to have more control over how the particles flow we need to remove some of the randomness (adding a but of particle behaviour)
                
                
                
                So right click on the Engine folder in the solution explorer and select new item, ensure you have “XNA Game Studio 3.1” highlighted in the tree on the left hand side and select the “Game Component” option and enter a name of “ParticleManager”.
                
                
                
                What you will see now is the standard framework for an XNA game component, however we need a drawable game component as we want it to draw to the screen, pretty obvious really (It is still a mystery why Drawable game component is not an option on the new item screen).  So to change this into a drawable game component, we need to update the following:
                
                
                
                > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Change the inherited type from Game Component to Drawable Game component   
                > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Add the Load and Unload Resource overloads   
                > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Add the overloaded Draw function
                
                
                
                This is what it should look like after it is updated:
                
                
                
                 
                
                
                
                    
                    
                         1: public class ParticleManager : Microsoft.Xna.Framework.DrawableGameComponent
                    
                    
                    
                         2: {
                    
                    
                    
                         3: public ParticleManager(Game game)
                    
                    
                    
                         4: : base(game)
                    
                    
                    
                         5: {
                    
                    
                    
                         6: // TODO: Construct any child components here
                    
                    
                    
                         7: }
                    
                    
                    
                         8: 
                    
                    
                    
                         9: /// \<summary\>
                    
                    
                    
                         10: /// Allows the game component to perform any initialization it needs to before starting
                    
                    
                    
                         11: /// to run. This is where it can query for any required services and load content.
                    
                    
                    
                         12: /// \</summary\>
                    
                    
                    
                         13: public override void Initialize()
                    
                    
                    
                         14: {
                    
                    
                    
                         15: // TODO: Add your initialization code here
                    
                    
                    
                         16: 
                    
                    
                    
                         17: base.Initialize();
                    
                    
                    
                         18: }
                    
                    
                    
                         19: 
                    
                    
                    
                         20: /// \<summary\>
                    
                    
                    
                         21: /// LoadContent will be called once per game and is the place to load
                    
                    
                    
                         22: /// all of your content.
                    
                    
                    
                         23: /// \</summary\>
                    
                    
                    
                         24: protected override void LoadContent()
                    
                    
                    
                         25: {
                    
                    
                    
                         26: // TODO: use this.Content to load your game content here
                    
                    
                    
                         27: }
                    
                    
                    
                         28: 
                    
                    
                    
                         29: /// \<summary\>
                    
                    
                    
                         30: /// UnloadContent will be called once per game and is the place to unload
                    
                    
                    
                         31: /// all content.
                    
                    
                    
                         32: /// \</summary\>
                    
                    
                    
                         33: protected override void UnloadContent()
                    
                    
                    
                         34: {
                    
                    
                    
                         35: // TODO: Unload any non ContentManager content here
                    
                    
                    
                         36: }
                    
                    
                    
                         37: 
                    
                    
                    
                         38: /// \<summary\>
                    
                    
                    
                         39: /// Allows the game component to update itself.
                    
                    
                    
                         40: /// \</summary\>
                    
                    
                    
                         41: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
                    
                    
                    
                         42: public override void Update(GameTime gameTime)
                    
                    
                    
                         43: {
                    
                    
                    
                         44: // TODO: Add your update code here
                    
                    
                    
                         45: 
                    
                    
                    
                         46: base.Update(gameTime);
                    
                    
                    
                         47: }
                    
                    
                    
                         48: 
                    
                    
                    
                         49: /// \<summary\>
                    
                    
                    
                         50: /// This is called when the game should draw itself.
                    
                    
                    
                         51: /// \</summary\>
                    
                    
                    
                         52: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
                    
                    
                    
                         53: public override void Draw(GameTime gameTime)
                    
                    
                    
                         54: {
                    
                    
                    
                         55: // TODO: Add your drawing code here
                    
                    
                    
                         56: 
                    
                    
                    
                         57: base.Draw(gameTime);
                    
                    
                    
                         58: }
                    
                    
                    
                         59: }
                    
                    
                    
                         60: 
                    
                    
                    
                     
                    
                    
                    
                    With the base component in place, it is best to add the component to the game, mainly so you do not forget to later and wonder why it is not working ![Winking smile](/blogs/darkgenesis/wlEmoticonwinkingsmile_707B7C62.png)
                    
                    
                    
                    So in the StarTrooperGame class add the following after the gamer service component:
                    
                    
                    
                     
                    
                    
                    
                        
                        
                             1: this.Components.Add(new ParticleManager(this));
                        
                        
                        
                        There, now with the manager in place we can start defining how it should work. 
                        
                        
                        #### 3. Particle Emitter
                        
                        
                        The particle emitter is the work horse of any particle engine and like Sprites we have a large template from which to create a multitude of different effects based upon a set of customisable attributes.
                        
                        
                        
                        So the template Particle Emitter takes care of individual particle management and generation plus some default behaviour, the individual particle effects define how each effect works and can supplement the defaults or completely replace them as necessary.
                        
                        
                        
                        As this section is quite long, we will go through it section by section.  First off create a new class in the engine folder called “ParticleEmitter.cs” (do not forget to update the namespace and remove the .Engine part)
                        
                        
                        
                        First the class and constructor:
                        
                        
                        
                            
                            
                                 1: public class ParticleEmitter
                            
                            
                            
                                 2: {
                            
                            
                            
                                 3: // Position, Velocity, and Acceleration represent exactly what their names
                            
                            
                            
                                 4: // indicate. They are public fields rather than properties so that users
                            
                            
                            
                                 5: // can directly access their .X and .Y properties.
                            
                            
                            
                                 6: public Vector2 EmitterPosition = Vector2.Zero;
                            
                            
                            
                                 7: public Vector2 EmitterVelocity = Vector2.Zero;
                            
                            
                            
                                 8: public Vector2 EmitterAcceleration = Vector2.Zero;
                            
                            
                            
                                 9: public float ParticleCycleTime = 0;
                            
                            
                            
                                 10: 
                            
                            
                            
                                 11: /// \<summary\>
                            
                            
                            
                                 12: /// Constructs a new ParticleEmitter.
                            
                            
                            
                                 13: /// \</summary\>
                            
                            
                            
                                 14: /// \<remarks\>As this is intended to be used inside a resource pool,
                            
                            
                            
                                 15: /// it needs to have a parameterless constructor, for initialising 
                            
                            
                            
                                 16: /// we have a separate initilise class\</remarks\>
                            
                            
                            
                                 17: public ParticleEmitter()
                            
                            
                            
                                 18: { 
                            
                            
                            
                                 19: }
                            
                            
                            
                            The code is fairly well commented, the main thing to notice here (that is different from most the samples) is that the Emitter can move, so we have some attributes (like the Particles) to control movement.  We could just leave the Emitter static so it is just the point at which particles are launched from and have them move themselves, but this limits us for certain effects which might revolve around the emitter or where outside forces can effect particle generation.  We also could not effectively do collision detection against individual particles (more on that later in the series), although it has been done by others with more advanced particle engines.   
                            We also have an extra attribute to control how often particles are sent out from the emitter but more on that later.
                            
                            
                            
                            Next is the initialise function, which sets an emitter up and creates the pool for the particles:
                            
                            
                            
                                
                                
                                     1: /// \<summary\>
                                
                                
                                
                                     2: /// override the base class's Initialize to do some additional work; we want to
                                
                                
                                
                                     3: /// call InitializeConstants to let subclasses set the constants that we will use.
                                
                                
                                
                                     4: /// 
                                
                                
                                
                                     5: /// also, the particle array and freeParticles queue are set up here.
                                
                                
                                
                                     6: /// \</summary\>
                                
                                
                                
                                     7: public void Initialize(string texture, int howManyEffects)
                                
                                
                                
                                     8: {
                                
                                
                                
                                     9: 
                                
                                
                                
                                     10: Texture2D tex = StarTrooperGame.ParticleManager.LoadTexture(texture);
                                
                                
                                
                                     11: m\_texture = texture;
                                
                                
                                
                                     12: m\_howManyEffects = howManyEffects;
                                
                                
                                
                                     13: // Calculate the center. this'll be used in the draw call, we
                                
                                
                                
                                     14: // always want to rotate and scale around this point.
                                
                                
                                
                                     15: m\_origin.X = tex.Width / 2;
                                
                                
                                
                                     16: m\_origin.Y = tex.Height / 2;
                                
                                
                                
                                     17: 
                                
                                
                                
                                     18: InitializeConstants();
                                
                                
                                
                                     19: 
                                
                                
                                
                                     20: // Create a pool contiaining the maximum number of particles we will ever need for this effect.
                                
                                
                                
                                     21: particles = new SwampLib.Pool\<Particle\>(m\_howManyEffects \* maxNumParticles);
                                
                                
                                
                                     22: 
                                
                                
                                
                                     23: m\_active = true;
                                
                                
                                
                                     24: }
                                
                                
                                
                                     25: 
                                
                                
                                
                                     26: /// \<summary\>
                                
                                
                                
                                     27: /// this abstract function must be overriden by subclasses of ParticleEmitter.
                                
                                
                                
                                     28: /// It is here that they should set all the constants marked in the region
                                
                                
                                
                                     29: /// "constants to be set by subclasses", which give each ParticleEmitter its
                                
                                
                                
                                     30: /// specific flavor.
                                
                                
                                
                                     31: /// \</summary\>
                                
                                
                                
                                     32: protected virtual void InitializeConstants() { }
                                
                                
                                
                                So we load the texture for the emitter (which is actually stored in the particle manager to reduce duplicate textures being loaded, but more on that later) and set the origin point for the emitter, which is impotent if the emitter needs to rotate.
                                
                                
                                
                                We then call the Initialise Constants function which is the internal initialisation function for the different effects.  In this Emitter template the initialisation constants function is an abstract function (meaning it has no code as it is provided by classes that inherit this template class)
                                
                                
                                
                                Lastly we set up the pool for the particles and set the emitter as active.
                                
                                
                                
                                Next up are the Add Particles function which control the flow of particles from the emitter, which can either produce a random number of particles depending on the constants or a fixed number.
                                
                                
                                
                                    
                                    
                                         1: /// \<summary\>
                                    
                                    
                                    
                                         2: /// AddParticles's job is to add an effect somewhere on the screen. If there 
                                    
                                    
                                    
                                         3: /// aren't enough particles in the freeParticles queue, it will use as many as 
                                    
                                    
                                    
                                         4: /// it can. This means that if there not enough particles available, calling
                                    
                                    
                                    
                                         5: /// AddParticles will have no effect.
                                    
                                    
                                    
                                         6: /// \</summary\>
                                    
                                    
                                    
                                         7: /// \<param name="where"\>where the particle effect should be created\</param\>
                                    
                                    
                                    
                                         8: public void AddParticles(Vector2 where)
                                    
                                    
                                    
                                         9: {
                                    
                                    
                                    
                                         10: // the number of particles we want for this effect is a random number
                                    
                                    
                                    
                                         11: // somewhere between the two constants specified by the subclasses.
                                    
                                    
                                    
                                         12: int numParticles =
                                    
                                    
                                    
                                         13: StarTrooperGame.Random.Next(minNumParticles, maxNumParticles);
                                    
                                    
                                    
                                         14: AddParticles(where, numParticles);
                                    
                                    
                                    
                                         15: 
                                    
                                    
                                    
                                         16: }
                                    
                                    
                                    
                                         17: 
                                    
                                    
                                    
                                         18: /// \<summary\>
                                    
                                    
                                    
                                         19: /// AddParticles's job is to add an effect somewhere on the screen. If there 
                                    
                                    
                                    
                                         20: /// aren't enough particles in the freeParticles queue, it will use as many as 
                                    
                                    
                                    
                                         21: /// it can. This means that if there not enough particles available, calling
                                    
                                    
                                    
                                         22: /// AddParticles will have no effect.
                                    
                                    
                                    
                                         23: /// \</summary\>
                                    
                                    
                                    
                                         24: /// \<param name="where"\>where the particle effect should be created\</param\>
                                    
                                    
                                    
                                         25: public void AddParticles(Vector2 where, int numParticles)
                                    
                                    
                                    
                                         26: {
                                    
                                    
                                    
                                         27: // Create the desired number of particles, up to the number of available
                                    
                                    
                                    
                                         28: // particles in the pool.
                                    
                                    
                                    
                                         29: numParticles = Math.Min(numParticles, particles.AvailableCount);
                                    
                                    
                                    
                                         30: while (numParticles-- \> 0)
                                    
                                    
                                    
                                         31: {
                                    
                                    
                                    
                                         32: SwampLib.Pool\<Particle\>.Node p = particles.Get();
                                    
                                    
                                    
                                         33: InitializeParticle(p.Item, where);
                                    
                                    
                                    
                                         34: }
                                    
                                    
                                    
                                         35: }
                                    
                                    
                                    
                                    This results in a set of active particles in the particle pool
                                    
                                    
                                    
                                    As you can see above, adding particles causes them to be initialised, by default we produce a completely random effect, this can be overridden or supplemented by the actual effects as the class is defined as virtual:
                                    
                                    
                                    
                                        
                                        
                                             1: /// \<summary\>
                                        
                                        
                                        
                                             2: /// InitializeParticle randomizes some properties for a particle, then
                                        
                                        
                                        
                                             3: /// calls initialize on it. It can be overriden by subclasses if they 
                                        
                                        
                                        
                                             4: /// want to modify the way particles are created. For example, 
                                        
                                        
                                        
                                             5: /// SmokePlumeParticleSystem overrides this function make all particles
                                        
                                        
                                        
                                             6: /// accelerate to the right, simulating wind.
                                        
                                        
                                        
                                             7: /// \</summary\>
                                        
                                        
                                        
                                             8: /// \<param name="p"\>the particle to initialize\</param\>
                                        
                                        
                                        
                                             9: /// \<param name="where"\>the position on the screen that the particle should be
                                        
                                        
                                        
                                             10: /// \</param\>
                                        
                                        
                                        
                                             11: protected virtual void InitializeParticle(Particle p, Vector2 where)
                                        
                                        
                                        
                                             12: {
                                        
                                        
                                        
                                             13: // first, call PickRandomDirection to figure out which way the particle
                                        
                                        
                                        
                                             14: // will be moving. velocity and acceleration's values will come from this.
                                        
                                        
                                        
                                             15: Vector2 direction;
                                        
                                        
                                        
                                             16: if (EmitterVelocity == Vector2.Zero)
                                        
                                        
                                        
                                             17: direction = PickRandomDirection();
                                        
                                        
                                        
                                             18: else
                                        
                                        
                                        
                                             19: direction = EmitterVelocity += EmitterAcceleration;
                                        
                                        
                                        
                                             20: 
                                        
                                        
                                        
                                             21: // pick some random values for our particle
                                        
                                        
                                        
                                             22: float velocity =
                                        
                                        
                                        
                                             23: StarTrooperGame.RandomBetween(minInitialSpeed, maxInitialSpeed);
                                        
                                        
                                        
                                             24: float acceleration =
                                        
                                        
                                        
                                             25: StarTrooperGame.RandomBetween(minAcceleration, maxAcceleration);
                                        
                                        
                                        
                                             26: float lifetime =
                                        
                                        
                                        
                                             27: StarTrooperGame.RandomBetween(minLifetime, maxLifetime);
                                        
                                        
                                        
                                             28: float scale =
                                        
                                        
                                        
                                             29: StarTrooperGame.RandomBetween(minScale, maxScale);
                                        
                                        
                                        
                                             30: float rotationSpeed =
                                        
                                        
                                        
                                             31: StarTrooperGame.RandomBetween(minRotationSpeed, maxRotationSpeed);
                                        
                                        
                                        
                                             32: 
                                        
                                        
                                        
                                             33: // then initialize it with those random values. initialize will save those,
                                        
                                        
                                        
                                             34: // and make sure it is marked as active.
                                        
                                        
                                        
                                             35: p.Initialize(
                                        
                                        
                                        
                                             36: where, velocity \* direction, acceleration \* direction,
                                        
                                        
                                        
                                             37: lifetime, scale, rotationSpeed);
                                        
                                        
                                        
                                             38: }
                                        
                                        
                                        
                                        This returns initialised particles ready for action.
                                        
                                        
                                        
                                        Then we have the Update and supporting function which pretty much speak for themselves (note we don’t draw particles from the emitter as this is handled by the Particle Manager):
                                        
                                        
                                        
                                            
                                            
                                                 1: // update is called by the Emitter on every frame. This is where the
                                            
                                            
                                            
                                                 2: // particle's position and that kind of thing get updated.
                                            
                                            
                                            
                                                 3: public virtual void Update(float dt)
                                            
                                            
                                            
                                                 4: {
                                            
                                            
                                            
                                                 5: EmitterVelocity += EmitterAcceleration \* dt;
                                            
                                            
                                            
                                                 6: EmitterPosition += EmitterVelocity \* dt;
                                            
                                            
                                            
                                                 7: 
                                            
                                            
                                            
                                                 8: 
                                            
                                            
                                            
                                                 9: foreach (SwampLib.Pool\<Particle\>.Node node in particles.ActiveNodes)
                                            
                                            
                                            
                                                 10: {
                                            
                                            
                                            
                                                 11: Particle p = node.Item;
                                            
                                            
                                            
                                                 12: 
                                            
                                            
                                            
                                                 13: if (p.Active)
                                            
                                            
                                            
                                                 14: {
                                            
                                            
                                            
                                                 15: // ... and if they're active, update them.
                                            
                                            
                                            
                                                 16: p.Update(dt);
                                            
                                            
                                            
                                                 17: // if that update finishes them, return them to the pool.
                                            
                                            
                                            
                                                 18: if (!p.Active)
                                            
                                            
                                            
                                                 19: {
                                            
                                            
                                            
                                                 20: particles.Return(node);
                                            
                                            
                                            
                                                 21: }
                                            
                                            
                                            
                                                 22: }
                                            
                                            
                                            
                                                 23: 
                                            
                                            
                                            
                                                 24: }
                                            
                                            
                                            
                                                 25: 
                                            
                                            
                                            
                                                 26: 
                                            
                                            
                                            
                                                 27: }
                                            
                                            
                                            
                                                 28: 
                                            
                                            
                                            
                                                 29: /// \<summary\>
                                            
                                            
                                            
                                                 30: /// PickRandomDirection is used by InitializeParticles to decide which direction
                                            
                                            
                                            
                                                 31: /// particles will move. The default implementation is a random vector in a
                                            
                                            
                                            
                                                 32: /// circular pattern.
                                            
                                            
                                            
                                                 33: /// \</summary\>
                                            
                                            
                                            
                                                 34: protected virtual Vector2 PickRandomDirection()
                                            
                                            
                                            
                                                 35: {
                                            
                                            
                                            
                                                 36: float angle = (float)StarTrooperGame.Random.NextDouble() \* -MathHelper.TwoPi;
                                            
                                            
                                            
                                                 37: return new Vector2((float)Math.Cos(angle), (float)Math.Sin(angle));
                                            
                                            
                                            
                                                 38: }
                                            
                                            
                                            
                                            The update loop simply updates all the particles for the emitter, the PickRandomDirection does exactly what it says on the tin and produces a random angle, used to give a random direction for a particle.
                                            
                                            
                                            
                                            Lastly we have the properties and constants for the Emitter Class
                                            
                                            
                                            
                                                
                                                
                                                     1: #region properties
                                                
                                                
                                                
                                                     2: 
                                                
                                                
                                                
                                                     3: // the texture this particle system will use.
                                                
                                                
                                                
                                                     4: private String m\_texture;
                                                
                                                
                                                
                                                     5: public String Texture
                                                
                                                
                                                
                                                     6: {
                                                
                                                
                                                
                                                     7: get { return m\_texture; }
                                                
                                                
                                                
                                                     8: }
                                                
                                                
                                                
                                                     9: 
                                                
                                                
                                                
                                                     10: // the origin when we're drawing textures. this will be the middle of the
                                                
                                                
                                                
                                                     11: // texture.
                                                
                                                
                                                
                                                     12: private Vector2 m\_origin;
                                                
                                                
                                                
                                                     13: public Vector2 Origin
                                                
                                                
                                                
                                                     14: {
                                                
                                                
                                                
                                                     15: get { return m\_origin; }
                                                
                                                
                                                
                                                     16: set { m\_origin = value; }
                                                
                                                
                                                
                                                     17: }
                                                
                                                
                                                
                                                     18: // this number represents the maximum number of effects this particle system
                                                
                                                
                                                
                                                     19: // will be expected to draw at one time. this is set in the constructor and is
                                                
                                                
                                                
                                                     20: // used to calculate how many particles we will need.
                                                
                                                
                                                
                                                     21: private int m\_howManyEffects;
                                                
                                                
                                                
                                                     22: 
                                                
                                                
                                                
                                                     23: // is this emitter still alive? if not then particle should no longer be drawn or updated.
                                                
                                                
                                                
                                                     24: private bool m\_active = false;
                                                
                                                
                                                
                                                     25: public bool Active
                                                
                                                
                                                
                                                     26: {
                                                
                                                
                                                
                                                     27: get { return m\_active; }
                                                
                                                
                                                
                                                     28: set { m\_active = value; }
                                                
                                                
                                                
                                                     29: }
                                                
                                                
                                                
                                                     30: 
                                                
                                                
                                                
                                                     31: // The pool of particles used by this system. 
                                                
                                                
                                                
                                                     32: // The pool automatically manages one-time allocation of particles, and reuses
                                                
                                                
                                                
                                                     33: // particles when they are returned to the pool.
                                                
                                                
                                                
                                                     34: public SwampLib.Pool\<Particle\> particles;
                                                
                                                
                                                
                                                     35: 
                                                
                                                
                                                
                                                     36: /// \<summary\>
                                                
                                                
                                                
                                                     37: /// returns the number of particles that are available for a new effect.
                                                
                                                
                                                
                                                     38: /// \</summary\>
                                                
                                                
                                                
                                                     39: public int FreeParticleCount
                                                
                                                
                                                
                                                     40: {
                                                
                                                
                                                
                                                     41: get
                                                
                                                
                                                
                                                     42: {
                                                
                                                
                                                
                                                     43: // Get the number of particles in the pool that are available for use.
                                                
                                                
                                                
                                                     44: return particles.AvailableCount;
                                                
                                                
                                                
                                                     45: }
                                                
                                                
                                                
                                                     46: }
                                                
                                                
                                                
                                                     47: 
                                                
                                                
                                                
                                                     48: #endregion
                                                
                                                
                                                
                                                     49: 
                                                
                                                
                                                
                                                     50: // This region of values control the "look" of the particle system, and should 
                                                
                                                
                                                
                                                     51: // be set by deriving particle systems in the InitializeConstants method. The
                                                
                                                
                                                
                                                     52: // values are then used by the virtual function InitializeParticle. Subclasses
                                                
                                                
                                                
                                                     53: // can override InitializeParticle for further
                                                
                                                
                                                
                                                     54: // customization.
                                                
                                                
                                                
                                                     55: #region constants to be set by subclasses
                                                
                                                
                                                
                                                     56: 
                                                
                                                
                                                
                                                     57: /// \<summary\>
                                                
                                                
                                                
                                                     58: /// minNumParticles and maxNumParticles control the number of particles that are
                                                
                                                
                                                
                                                     59: /// added when AddParticles is called. The number of particles will be a random
                                                
                                                
                                                
                                                     60: /// number between minNumParticles and maxNumParticles.
                                                
                                                
                                                
                                                     61: /// \</summary\>
                                                
                                                
                                                
                                                     62: protected int minNumParticles = 0;
                                                
                                                
                                                
                                                     63: protected int maxNumParticles = 0;
                                                
                                                
                                                
                                                     64: 
                                                
                                                
                                                
                                                     65: /// \<summary\>
                                                
                                                
                                                
                                                     66: /// minInitialSpeed and maxInitialSpeed are used to control the initial velocity
                                                
                                                
                                                
                                                     67: /// of the particles. The particle's initial speed will be a random number 
                                                
                                                
                                                
                                                     68: /// between these two. The direction is determined by the function 
                                                
                                                
                                                
                                                     69: /// PickRandomDirection, which can be overriden.
                                                
                                                
                                                
                                                     70: /// \</summary\>
                                                
                                                
                                                
                                                     71: protected float minInitialSpeed = 0;
                                                
                                                
                                                
                                                     72: protected float maxInitialSpeed = 0;
                                                
                                                
                                                
                                                     73: 
                                                
                                                
                                                
                                                     74: /// \<summary\>
                                                
                                                
                                                
                                                     75: /// minAcceleration and maxAcceleration are used to control the acceleration of
                                                
                                                
                                                
                                                     76: /// the particles. The particle's acceleration will be a random number between
                                                
                                                
                                                
                                                     77: /// these two. By default, the direction of acceleration is the same as the
                                                
                                                
                                                
                                                     78: /// direction of the initial velocity.
                                                
                                                
                                                
                                                     79: /// \</summary\>
                                                
                                                
                                                
                                                     80: protected float minAcceleration = 0;
                                                
                                                
                                                
                                                     81: protected float maxAcceleration = 0;
                                                
                                                
                                                
                                                     82: 
                                                
                                                
                                                
                                                     83: /// \<summary\>
                                                
                                                
                                                
                                                     84: /// minRotationSpeed and maxRotationSpeed control the particles' angular
                                                
                                                
                                                
                                                     85: /// velocity: the speed at which particles will rotate. Each particle's rotation
                                                
                                                
                                                
                                                     86: /// speed will be a random number between minRotationSpeed and maxRotationSpeed.
                                                
                                                
                                                
                                                     87: /// Use smaller numbers to make particle systems look calm and wispy, and large 
                                                
                                                
                                                
                                                     88: /// numbers for more violent effects.
                                                
                                                
                                                
                                                     89: /// \</summary\>
                                                
                                                
                                                
                                                     90: protected float minRotationSpeed = 0;
                                                
                                                
                                                
                                                     91: protected float maxRotationSpeed = 0;
                                                
                                                
                                                
                                                     92: 
                                                
                                                
                                                
                                                     93: /// \<summary\>
                                                
                                                
                                                
                                                     94: /// minLifetime and maxLifetime are used to control the lifetime. Each
                                                
                                                
                                                
                                                     95: /// particle's lifetime will be a random number between these two. Lifetime
                                                
                                                
                                                
                                                     96: /// is used to determine how long a particle "lasts." Also, in the base
                                                
                                                
                                                
                                                     97: /// implementation of Draw, lifetime is also used to calculate alpha and scale
                                                
                                                
                                                
                                                     98: /// values to avoid particles suddenly "popping" into view
                                                
                                                
                                                
                                                     99: /// \</summary\>
                                                
                                                
                                                
                                                    100: protected float minLifetime = 0;
                                                
                                                
                                                
                                                    101: protected float maxLifetime = 0;
                                                
                                                
                                                
                                                    102: 
                                                
                                                
                                                
                                                    103: /// \<summary\>
                                                
                                                
                                                
                                                    104: /// to get some additional variance in the appearance of the particles, we give
                                                
                                                
                                                
                                                    105: /// them all random scales. the scale is a value between minScale and maxScale,
                                                
                                                
                                                
                                                    106: /// and is additionally affected by the particle's lifetime to avoid particles
                                                
                                                
                                                
                                                    107: /// "popping" into view.
                                                
                                                
                                                
                                                    108: /// \</summary\>
                                                
                                                
                                                
                                                    109: protected float minScale = 0;
                                                
                                                
                                                
                                                    110: protected float maxScale = 0;
                                                
                                                
                                                
                                                    111: 
                                                
                                                
                                                
                                                    112: /// \<summary\>
                                                
                                                
                                                
                                                    113: /// different effects can use different blend modes. fire and explosions work
                                                
                                                
                                                
                                                    114: /// well with additive blending, for example.
                                                
                                                
                                                
                                                    115: /// \</summary\>
                                                
                                                
                                                
                                                    116: protected SpriteBlendMode spriteBlendMode = SpriteBlendMode.None;
                                                
                                                
                                                
                                                    117: public SpriteBlendMode SpriteBlendMode
                                                
                                                
                                                
                                                    118: {
                                                
                                                
                                                
                                                    119: get { return spriteBlendMode; }
                                                
                                                
                                                
                                                    120: }
                                                
                                                
                                                
                                                    121: #endregion
                                                
                                                
                                                
                                                Most of these we will explain while using and defining new emitter effects.
                                                
                                                
                                                
                                                 
                                                
                                                
                                                * * *
                                                
                                                ### Conclusion
                                                
                                                
                                                What, that is it.  Just a particle system and no actual implementation and my manager is still empty.  (unfortunately, I’ve had to split off some of this post to the next one because it was just to big for the site to handle, we have plans to fix that, for now apologies)
                                                
                                                
                                                
                                                This should give you enough to digest for the moment, next post coming up very soon on how we use this system to finally add some flashy effects to our game!!.
                                                
                                                
                                                
                                                As a teaser, here is what we are aiming for:
                                                
                                                
                                                
                                                ![Fireball-New2](http://xna-uk.net/blogs/darkgenesis/FireballNew2_thumb_47140E97.png)  ![Experiment 5](http://xna-uk.net/blogs/darkgenesis/Experiment5_thumb_3A35A47A.png)   ![Fireball-New](http://xna-uk.net/blogs/darkgenesis/FireballNew_thumb_23DF3D8E.png)
                                                
                                                
                                                Technorati Tags: [XNA](http://technorati.com/tags/XNA)
                                            
                                            
                                        
                                        
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

