---
layout: post
title: 'Intermission #7 - Resource pools and Particles'
date: 2012-06-29 10:54:05
tags: [2d tutorial, game development, xna]
---

I was going to do this as two separate articles, but after a refresh trawl at what is already our there and available I've decided to put them together.  We don't need anything overly complex at this stage of the game, although I will point out some of the areas where you could go further (and point you in the right direction).

I've always been an advocate for "not re-inventing the wheel" and in these days of XNA development, you don't need to.  There are many resources and code stores to find implementations of what you need and you can either learn the lesson of someone else's approach or just copy it for your own use (make sure the original author gets a mention if you do.

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Trawling through the net

In looking around at what other particle and resource pool are around, I found very different levels of content available, some were old but good (that just need tweaking to get back up to date), some were new but were either too basic or didn't offer enough flexibility.  Some I really liked, here's a list of what is good that I've found so far:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    [Resource Pools by the SwampThing](http://swampthingtom.blogspot.com/2007/06/generic-pool-collection-class.html) - best description of what is required  for a full resource pool, implements this in the CC sample below (still in GS 2)   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    [An XNA resource pool on CodeCube](http://codecube.net/2010/01/xna-resource-pool/) - Quick and dirty yet ultimately flexible pool system   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    [An Honourable mention to my colleague NemoKrads particle tutorial series](/blogs/randomchaos/archive/2008/03/28/2d-particle-tutorial-iii.aspx) - Good graphics oriented particle tutorial (both 3D and 2D with shading)   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    [Creators club 2D particle sample](http://creators.xna.com/en-US/sample/particle) - Good resource but still in Game Studio 2 framework, needs a little love to get it going   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    [Riemers 2D game series particles section](http://www.riemers.net/eng/Tutorials/XNA/Csharp/Series2D/Particles.php) - Riemers has always been one of my favourites, the site hasn't been updated in a while and the tuts are in GS 3, but the forums are still alive and happening (I don't believe I actually wrote that then).

* * *

### Resource Pools

Resource pools are an attempt to make large lists of items as memory efficient as possible, the problem with using lists or fixed arrays are countless for areas where you need a large amount of objects that need to be created and destroyed on a regular basis.  Lists incur garbage collection issues (which on the XBOX is really bad) and arrays are of fixed size so unless you know exactly how many you are going to need and how often you need to clear it our or loop through it, it becomes problematic.

Resources pools try to get through this by using several methods, they use the fixed limit of an array and combine it with a stack of some description (usually a Queue, which is a dynamic list of values which takes items from the top and adds them back to the bottom when done, like the queue in the bank, once you leave the front of the queue you have to go to the back if you want in again :) ).  Some just use a queue but this can be problematic.

The idea is simple enough, have a group of people standing around waiting to do work  (no pun intended in the current state of the economy) and have a manager sitting on the side calling names.  When a workers name is called they are set off and when they are done they go to the back of the queue.

Now the XNA sample just uses a Queue with no management, which is too light. The CodeCube class is nice and neat and extends this basic format efficiently, but doesn't have enough umph to it (IMHO, but I may still use it for my own projects at some point where it's useful).

So we are left with the SwampThing Resource pool, overall it provides a good framework for a memory efficient resource pool and there is good documentation for how to consume it.  So add the [Pool.CS class](http://startrooper2dxna.codeplex.com/releases/46712/download/128393) to the engine of our project as is for now.  Look in SwampThings post above for some of the background detail.

* * *

### Particles

Particle systems can be some of the most complex systems of many a game, where the desire for effect is key.  It doesn't have to be though, it just depends on your implementation and how far you want to go with it.

Particle systems are comprised of several Key components:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Particles - A single sprite texture or point sprite, the smallest component of particle effects.  Like a single spark in a firework.   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Particle Managers - Managers control how long an individual particle lives for, destroying it when it's dead and updating the one's still alive.   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Particle Emitters - Emitters are a point of flow, like a hosepipe flooding out water, how you squeeze the pipe effects the kind of flow or spray emitted.   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Particle Behaviours - Control what a particle does once it has been emitted, swirls, dives or splits in two.  Many possibilities.   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Particle Animation - A scripted animation of several effects or particles.  Bit like a firework show.

We'll only cover the first two or three here and maybe add more later, animations with particles in particular can be quite a bit of a challenge to get right.

An individual particle, as described above, is like a spark in a firework, however that spark can either be very small like a coloured pixel on a screen (sometimes referred to as a point sprite) or it can be quite large, which is usually referred to as a billboard sprite.  Of course it can also be in-between, point is that the actual texture used for the particle can be anything you want.

If you look around there are several good test apps or samples of firework displays which are all driven by particle effects.

|  |  |  |
|---|---|---|
| Explosion effect (with Smoke) | Smoke Plume effect | Explosion Particle |

#### 1. Particle class

Now in keeping with reuse, the MS particle class example is as good an effort as any, so we'll reuse that, grab it from [here off the codeplex](http://startrooper2dxna.codeplex.com/releases/46712/download/128395) site and add it to the engine folder (it has been updated slightly to fit in the project properly, just so you are aware, should you use the one direct from the CC particle sample).  To keep things simple though we will update the namespace of the class to the same as our project this time.  So update the namespace to:

```csharp
namespace TestProject
```

The class itself is easy to understand and well commented, in short we have a set of attributes about the particle:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Position - location on the screen of the particle   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Velocity - its velocity   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Acceleration - Its acceleration state so the particle increases or decreases each update   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Lifetime - how long the particle should live   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Scale - so we can expand or reduce the particle size   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Rotation Speed - how fast the particle rotates   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Rotation - the particles current rotation, initialised to a random angle   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Time Since Start - how long the particle has been alive for

We do need to add a few bits to the StarTrooperGame.cs class to support the MS version, nothing major, just adding the "RandomBetween" function and changing the state of the m_Random attribute/.  First change the m_Random attribute at the start of the StarTrooperGame class to be static, like so:

```csharp
static Random m_Random = new Random();
```

Then add the following function towards the end of the class after the LoadResources function:

```csharp
#region Helper Functions
//  a handy little function that gives a random float between two
// values. This will be used in several places in the sample, in particilar in
// ParticleSystem.InitializeParticle.
public static float RandomBetween(float min, float max)
{
  return min + (float)m_Random.NextDouble() * (max - min);
}
#endregion
```

Finally add the following property for the Random attribute, this helps us later when we need random values for particles or emitters:

```csharp
// a random number generator that the whole project can share.
public static Random Random { get { return m_Random; } }
```

#### 2. Particle Manager

Now this class we'll create from scratch as the sample that is available is a bit hard to read and Swampthings version although complete does beat around the bush a bit.  Since we also want to have more control over how the particles flow we need to remove some of the randomness (adding a bit of particle behaviour)

So right click on the Engine folder in the solution explorer and select new item, ensure you have "XNA Game Studio 3.1" highlighted in the tree on the left hand side and select the "Game Component" option and enter a name of "ParticleManager".

What you will see now is the standard framework for an XNA game component, however we need a drawable game component as we want it to draw to the screen, pretty obvious really (It's still a mystery why Drawable game component is not an option on the new item screen).  So to change this into a drawable game component, we need to update the following:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Change the inherited type from Game Component to Drawable Game component   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Add the Load and Unload Resource overloads   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Add the overloaded Draw function

This is what it should look like after it's updated:

```csharp
public class ParticleManager : Microsoft.Xna.Framework.DrawableGameComponent
{
  public ParticleManager(Game game)
    : base(game)
  {
    // TODO: Construct any child components here
  }
  /// <summary>
  /// Allows the game component to perform any initialization it needs to before starting
  /// to run.  This is where it can query for any required services and load content.
  /// </summary>
  public override void Initialize()
  {
    // TODO: Add your initialization code here
    base.Initialize();
  }
  /// <summary>
  /// LoadContent will be called once per game and is the place to load
  /// all of your content.
  /// </summary>
  protected override void LoadContent()
  {
    // TODO: use this.Content to load your game content here
  }
  /// <summary>
  /// UnloadContent will be called once per game and is the place to unload
  /// all content.
  /// </summary>
  protected override void UnloadContent()
  {
    // TODO: Unload any non ContentManager content here
  }
  /// <summary>
  /// Allows the game component to update itself.
  /// </summary>
  /// <param name="gameTime">Provides a snapshot of timing values.</param>
  public override void Update(GameTime gameTime)
  {
    // TODO: Add your update code here
    base.Update(gameTime);
  }
  /// <summary>
  /// This is called when the game should draw itself.
  /// </summary>
  /// <param name="gameTime">Provides a snapshot of timing values.</param>
  public override void Draw(GameTime gameTime)
  {
    // TODO: Add your drawing code here
    base.Draw(gameTime);
  }
}
```

With the base component in place, it's best to add the component to the game, mainly so you don't forget to later and wonder why it's not working ;)

So in the StarTrooperGame class add the following after the gamer service component:

```csharp
this.Components.Add(new ParticleManager(this));
```

There, now with the manager in place we can start defining how it should work.

#### 3. Particle Emitter

The particle emitter is the work horse of any particle engine and like Sprites we have a large template from which to create a multitude of different effects based upon a set of customisable attributes.

So the template Particle Emitter takes care of individual particle management and generation plus some default behaviour, the individual particle effects define how each effect works and can supplement the defaults or completely replace them as necessary.

As this section is quite long, we will go through it section by section.  First off create a new class in the engine folder called "ParticleEmitter.cs" (don't forget to update the namespace and remove the .Engine part)

First the class and constructor:

```csharp
public class ParticleEmitter
{
  // Position, Velocity, and Acceleration represent exactly what their names
  // indicate. They are public fields rather than properties so that users
  // can directly access their .X and .Y properties.
  public Vector2 EmitterPosition = Vector2.Zero;
  public Vector2 EmitterVelocity = Vector2.Zero;
  public Vector2 EmitterAcceleration = Vector2.Zero;
  public float ParticleCycleTime = 0;
  /// <summary>
  /// Constructs a new ParticleEmitter.
  /// </summary>
  /// <remarks>As this is intended to be used inside a resource pool,
  /// it needs to have a parameterless constructor, for initialising
  /// we have a separate initilise class</remarks>
  public ParticleEmitter()
  {
  }
```

The code is fairly well commented, the main thing to notice here (that's different from most the samples) is that the Emitter can move, so we have some attributes (like the Particles) to control movement.  We could just leave the Emitter static so it is just the point at which particles are launched from and have them move themselves, but this limits us for certain effects which might revolve around the emitter or where outside forces can effect particle generation.  We also couldn't effectively do collision detection against individual particles (more on that later in the series), although it has been done by others with more advanced particle engines.   
We also have an extra attribute to control how often particles are sent out from the emitter but more on that later.

Next is the initialise function, which sets an emitter up and creates the pool for the particles:

```csharp
/// <summary>
/// override the base class's Initialize to do some additional work; we want to
/// call InitializeConstants to let subclasses set the constants that we'll use.
///
/// also, the particle array and freeParticles queue are set up here.
/// </summary>
public void Initialize(string texture, int howManyEffects)
{
  Texture2D tex = StarTrooperGame.ParticleManager.LoadTexture(texture);
  m_texture = texture;
  m_howManyEffects = howManyEffects;
  // Calculate the center. this'll be used in the draw call, we
  // always want to rotate and scale around this point.
  m_origin.X = tex.Width / 2;
  m_origin.Y = tex.Height / 2;
  InitializeConstants();
  // Create a pool contiaining the maximum number of particles we will ever need for this effect.
  particles = new SwampLib.Pool<Particle>(m_howManyEffects * maxNumParticles);
  m_active = true;
}
/// <summary>
/// this abstract function must be overriden by subclasses of ParticleEmitter.
/// It's here that they should set all the constants marked in the region
/// "constants to be set by subclasses", which give each ParticleEmitter its
/// specific flavor.
/// </summary>
protected virtual void InitializeConstants() { }
```

So we load the texture for the emitter (which is actually stored in the particle manager to reduce duplicate textures being loaded, but more on that later) and set the origin point for the emitter, which is important if the emitter needs to rotate.

We then call the Initialise Constants function which is the internal initialisation function for the different effects.  In this Emitter template the initialisation constants function is an abstract function (meaning it has no code as it is provided by classes that inherit this template class)

Lastly we set up the pool for the particles and set the emitter as active.

Next up are the Add Particles function which control the flow of particles from the emitter, which can either produce a random number of particles depending on the constants or a fixed number.

```csharp
/// <summary>
/// AddParticles's job is to add an effect somewhere on the screen. If there
/// aren't enough particles in the freeParticles queue, it will use as many as
/// it can. This means that if there not enough particles available, calling
/// AddParticles will have no effect.
/// </summary>
/// <param name="where">where the particle effect should be created</param>
public void AddParticles(Vector2 where)
{
  // the number of particles we want for this effect is a random number
  // somewhere between the two constants specified by the subclasses.
  int numParticles =
    StarTrooperGame.Random.Next(minNumParticles, maxNumParticles);
  AddParticles(where, numParticles);
}
/// <summary>
/// AddParticles's job is to add an effect somewhere on the screen. If there
/// aren't enough particles in the freeParticles queue, it will use as many as
/// it can. This means that if there not enough particles available, calling
/// AddParticles will have no effect.
/// </summary>
/// <param name="where">where the particle effect should be created</param>
public void AddParticles(Vector2 where, int numParticles)
{
  // Create the desired number of particles, up to the number of available
  // particles in the pool.
  numParticles = Math.Min(numParticles, particles.AvailableCount);
  while (numParticles-- > 0)
  {
    SwampLib.Pool<Particle>.Node p = particles.Get();
    InitializeParticle(p.Item, where);
  }
}
```

This results in a set of active particles in the particle pool

As you can see above, adding particles causes them to be initialised, by default we produce a completely random effect, this can be overridden or supplemented by the actual effects as the class is defined as virtual:

```csharp
/// <summary>
/// InitializeParticle randomizes some properties for a particle, then
/// calls initialize on it. It can be overriden by subclasses if they
/// want to modify the way particles are created. For example,
/// SmokePlumeParticleSystem overrides this function make all particles
/// accelerate to the right, simulating wind.
/// </summary>
/// <param name="p">the particle to initialize</param>
/// <param name="where">the position on the screen that the particle should be
/// </param>
protected virtual void InitializeParticle(Particle p, Vector2 where)
{
  // first, call PickRandomDirection to figure out which way the particle
  // will be moving. velocity and acceleration's values will come from this.
  Vector2 direction;
   if (EmitterVelocity == Vector2.Zero)
    direction = PickRandomDirection();
  else
    direction = EmitterVelocity += EmitterAcceleration;
  // pick some random values for our particle
  float velocity =
    StarTrooperGame.RandomBetween(minInitialSpeed, maxInitialSpeed);
  float acceleration =
    StarTrooperGame.RandomBetween(minAcceleration, maxAcceleration);
  float lifetime =
    StarTrooperGame.RandomBetween(minLifetime, maxLifetime);
  float scale =
    StarTrooperGame.RandomBetween(minScale, maxScale);
  float rotationSpeed =
    StarTrooperGame.RandomBetween(minRotationSpeed, maxRotationSpeed);
  // then initialize it with those random values. initialize will save those,
  // and make sure it is marked as active.
  p.Initialize(
    where, velocity * direction, acceleration * direction,
    lifetime, scale, rotationSpeed);
}
```

This returns initialised particles ready for action.

Then we have the Update and supporting function which pretty much speak for themselves (note we don't draw particles from the emitter as this is handled by the Particle Manager):

```csharp
// update is called by the Emitter on every frame. This is where the
// particle's position and that kind of thing get updated.
public virtual void Update(float dt)
{
  EmitterVelocity += EmitterAcceleration * dt;
  EmitterPosition += EmitterVelocity * dt;
  foreach (SwampLib.Pool<Particle>.Node node in particles.ActiveNodes)
  {
    Particle p = node.Item;
    if (p.Active)
    {
      // ... and if they're active, update them.
      p.Update(dt);
      // if that update finishes them, return them to the pool.
      if (!p.Active)
      {
        particles.Return(node);
      }
    }
  }
}
/// <summary>
/// PickRandomDirection is used by InitializeParticles to decide which direction
/// particles will move. The default implementation is a random vector in a
/// circular pattern.
/// </summary>
protected virtual Vector2 PickRandomDirection()
{
  float angle = (float)StarTrooperGame.Random.NextDouble() * -MathHelper.TwoPi;
  return new Vector2((float)Math.Cos(angle), (float)Math.Sin(angle));
}
```

The update loop simply updates all the particles for the emitter, the PickRandomDirection does exactly what it says on the tin and produces a random angle, used to give a random direction for a particle.

Lastly we have the properties and constants for the Emitter Class

```csharp
#region properties
// the texture this particle system will use.
private String m_texture;
public String Texture
{
  get { return m_texture; }
}
// the origin when we're drawing textures. this will be the middle of the
// texture.
private Vector2 m_origin;
public Vector2 Origin
{
  get { return m_origin; }
  set { m_origin = value; }
}
// this number represents the maximum number of effects this particle system
// will be expected to draw at one time. this is set in the constructor and is
// used to calculate how many particles we will need.
private int m_howManyEffects;
// is this emitter still alive? if not then particle should no longer be drawn or updated.
private bool m_active = false;
public bool Active
{
  get { return m_active; }
  set { m_active = value; }
}
// The pool of particles used by this system.
// The pool automatically manages one-time allocation of particles, and reuses
// particles when they are returned to the pool.
public SwampLib.Pool<Particle> particles;
/// <summary>
/// returns the number of particles that are available for a new effect.
/// </summary>
public int FreeParticleCount
{
  get
  {
    // Get the number of particles in the pool that are available for use.
    return particles.AvailableCount;
  }
}
#endregion
// This region of values control the "look" of the particle system, and should
// be set by deriving particle systems in the InitializeConstants method. The
// values are then used by the virtual function InitializeParticle. Subclasses
// can override InitializeParticle for further
// customization.
#region constants to be set by subclasses
/// <summary>
/// minNumParticles and maxNumParticles control the number of particles that are
/// added when AddParticles is called. The number of particles will be a random
/// number between minNumParticles and maxNumParticles.
/// </summary>
protected int minNumParticles = 0;
protected int maxNumParticles = 0;
/// <summary>
/// minInitialSpeed and maxInitialSpeed are used to control the initial velocity
/// of the particles. The particle's initial speed will be a random number
/// between these two. The direction is determined by the function
/// PickRandomDirection, which can be overriden.
/// </summary>
protected float minInitialSpeed = 0;
protected float maxInitialSpeed = 0;
/// <summary>
/// minAcceleration and maxAcceleration are used to control the acceleration of
/// the particles. The particle's acceleration will be a random number between
/// these two. By default, the direction of acceleration is the same as the
/// direction of the initial velocity.
/// </summary>
protected float minAcceleration = 0;
protected float maxAcceleration = 0;
/// <summary>
/// minRotationSpeed and maxRotationSpeed control the particles' angular
/// velocity: the speed at which particles will rotate. Each particle's rotation
/// speed will be a random number between minRotationSpeed and maxRotationSpeed.
/// Use smaller numbers to make particle systems look calm and wispy, and large
/// numbers for more violent effects.
/// </summary>
protected float minRotationSpeed = 0;
protected float maxRotationSpeed = 0;

/// <summary>
/// minLifetime and maxLifetime are used to control the lifetime. Each
/// particle's lifetime will be a random number between these two. Lifetime
/// is used to determine how long a particle "lasts." Also, in the base
/// implementation of Draw, lifetime is also used to calculate alpha and scale
/// values to avoid particles suddenly "popping" into view
/// </summary>
protected float minLifetime = 0;
protected float maxLifetime = 0;

/// <summary>
/// to get some additional variance in the appearance of the particles, we give
/// them all random scales. the scale is a value between minScale and maxScale,
/// and is additionally affected by the particle's lifetime to avoid particles
/// "popping" into view.
/// </summary>
protected float minScale = 0;
protected float maxScale = 0;

/// <summary>
/// different effects can use different blend modes. fire and explosions work
/// well with additive blending, for example.
/// </summary>
protected SpriteBlendMode spriteBlendMode = SpriteBlendMode.None;
public SpriteBlendMode SpriteBlendMode
{
get { return spriteBlendMode; }
}
#endregion
```

Most of these we will explain while using and defining new emitter effects.

* * *

### Conclusion

What, that is it.  Just a particle system and no actual implementation and my manager is still empty.  (unfortunately, I've had to split off some of this post to the next one because it was just too big for the site to handle, we have plans to fix that, for now apologies)

This should give you enough to digest for the moment, next post coming up very soon on how we use this system to finally add some flashy effects to our game!!.

As a teaser, here is what we are aiming for:
