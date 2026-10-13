---
layout: post
title: 'Intermission #9 - Back to the future (Phone 7)'
date: 2012-06-29 11:17:02
tags: [2d tutorial, game development, xna]
---

Marty you gotta see this…. (whoops, back to the tutorial)

Hope you are not getting too dizzy now going back and forth from XNA GS 3.1 and GS 4.0 and the windows phone.  But lets bring the phone project up to date with current efforts and also wrangle out some gotchas that have come to light.

**Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)**

* * *

## Game save settings

Granted we do not have many settings to actually maintain on the phone at present, but we could have (like resolution, game speed, difficulty and such) and in the interest of at least attempting to make the GS 4.0 code ready for running everything we will add it in.

So first off copy the “FileManager.cs” and “KeyMappings.cs”, then update their namespace to match the rest of the project, “XNAStarTrooper2D\_Phone7”.

Now it would be nice if that was it but first we have some alterations to handle, first up.  The windows phone, unlike XBOX and windows does not use storage containers, instead it uses something called Isolated Storage.  Pretty much the same thing just a different name.  Second it has a slightly different way of creating files, so we will deal with that as well.  What it boils down to is that pretty much all of our code in the File Manager is useless.  So why copy the File Manager class in at all, well that is to try and keep the project unified.

So first we need to add compiler pre-directives around our existing code first, so add:

```csharp
#if (!WINDOWS_PHONE)
```

Just after the Class definition and add the following just after the SaveKeyMappings function:

```csharp
#else
public static void LoadKeyMappings()
{
using (IsolatedStorageFile appStorage = IsolatedStorageFile.GetUserStoreForApplication())
{
using (IsolatedStorageFileStream file = appStorage.OpenFile("StarTrooperControls.sav", FileMode.OpenOrCreate))
{
try
{
XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
Input.InputMappings = (InputMappings)serializer.Deserialize(file);
}
catch{}

}
}
}

public static void SaveKeyMappings()
{
using (IsolatedStorageFile appStorage = IsolatedStorageFile.GetUserStoreForApplication())
{
using (IsolatedStorageFileStream file = appStorage.OpenFile("StarTrooperControls.sav", FileMode.OpenOrCreate))
{
try
{
XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
Input.SettingsSaved = true;
serializer.Serialize(file, Input.InputMappings);
}
catch { }

}
}
}
}
#endif
```

If done right, you should see all the code greyed out, this pretty much leaves us with a blank class definition for windows phone while still retaining the functionality for other platforms.

But we still see several red wavy lines under the xml serialisation functions.  This is because the protection around DLLs have changed (you will see this a lot) and the serialisation implementation has been updated slightly.  This is not a biggie, just right click “References” in the solution explorer and select add reference, then select “System.XML.Serialization” and click ok.  Finally add a using reference in the top of the class:

```csharp
using System.Xml.Serialization;
```

So we have added two new overloads which are Windows Phone specific thanks to the Pre-compiler statements, this means we do not need to change the rest of the game code for saving and loading, although in hindsight, the name of the save and load functions could do with renaming now ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile.png) (something for later when the projects unify).

The two new functions use the phone specific way of saving and loading data, which is very similar to the XBOX version:

>     Instead of Storage Container we use Isolated Storage, the major advantage of this is that we do not need to use the guide to get the user to choose a container, it is all built in.
>     How we access files is slightly different, we still use streams but as with the isolated storage, it is a lot simpler and easier to use.
>     No change in the serialisation, except that we now need to manually add a reference to the Serialisation DLL

To finish it off we need to add another pre processor directive to the using section of the class around the Storage statements and also add a reference for isolated storage, so replace:

```csharp
using Microsoft.Xna.Framework.Storage;
```

With:

```csharp
#if (!WINDOWS_PHONE)
using Microsoft.Xna.Framework.Storage;
#else
using System.IO.IsolatedStorage;
#endif
```

Last thing to update is in the KeyMappings class.  Just remove the `[Serializable]` references (apparently they are only needed for binary serialisation).  You can also remove all using statements except Microsoft.Xna.Framework.Input (this is a good general rule of thumb, to only declare what you actually intend to use in your code, same can be said of references).  I will tidy up more later.

To update the main game to load and save settings, simply add the following in to the LoadResources function of StarTrooperGame.cs:

```csharp
//Try and load any saved key mappings
FileManager.LoadKeyMappings();

//If no settings present or setting were unable to be loaded, use the defaults
if (!Input.InputMappings.SettingsSaved) Input.Load_Defaults();
```

And so that our settings are saved when the game finishes, change the exit code at the start of the Update section to:

```csharp
// Allows the game to exit
if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
{
FileManager.SaveKeyMappings();
this.Exit();
}
```

This adds a call to Save Settings before we exit.

* * *

### Particle Engine

The changes to the particle manager are also fairly cosmetic and mainly involve replacing:

```csharp
SpriteBlendMode.Additive
```

To:

```csharp
BlendState.Additive
```

Then:

>     Updating the namespace of all the classes
>     Updating the type SpriteBlendMode in the ParticleEmitter class from SpriteBlendMode to BlendState (standard XNA 4.0 change) and the settings in each emitter to the BlendState equivalent.
>     Updating the SpriteBatch.begin call in the particle manager draw call to “spriteBatch.Begin(SpriteSortMode.Texture, pe.SpriteBlendMode)"

So copy in the “ParticleManager.cs”, “ParticleEmitter.cs” and “ParticleEmitters.cs” classes from the 3.1 project and make the above changes.

Then like before, we just need to add the particle engine references in the game itself like in the last post, these comprise of:

Particle Manager attribute in the start of the StarTrooperGame class:

```csharp
public static ParticleManager ParticleManager;
```

And the particle manager initialisation in the StarTrooperGame constructor:

```csharp
ParticleManager = new ParticleManager(this);
this.Components.Add(ParticleManager);
```

Then we need to add the new Fireball effect in the StarTrooperSprites.cs file, just after the TrooperFire function in the Trooper class:

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

And add the call to the TrooperFire function:

```csharp
FireballLaunch(new Vector2(Position.X, Position.Y - 35), new Vector2(0, -40), new Vector2(0, -0.5f));
```

Then to finish it off we need to expose the helper features in the StarTrooperGame class, so update the Random attribute to:

```csharp
static Random m_Random = new Random();
```

The RandomBetween function towards the end of the class (after Load Resources):

```csharp
#region Helper Functions

// a handy little function that gives a random float between two
// values. This will be used in several places in the sample, in particilar in
// ParticleSystem.InitializeParticle.
public static float RandomBetween(float min, float max)
{
return min + (float)m_Random.NextDouble() * (max - min);
}

#endregion
```

And lastly the property to expose our random generator at the very end:

```csharp
// a random number generator that the whole sample can share.
public static Random Random { get { return m_Random; } }
```

* * *

### Game Updates

In the last few posts I also made a few basic program updates to Sprites, so we will update those here as well.

First off was to move the origin property to the sprite class from the animation class, this fixes the centre point of the texture on the screen for drawing sprites, so add the attribute to the bottom of the Sprite class, like so:

```csharp
Vector2 m_Origin = Vector2.Zero;
```

Then add the property to expose it, at the end of the properties section:

```csharp
public Vector2 Origin
{
set
{
m_Origin = value;
}
get
{
return m_Origin;
}
}
```

Then to ensure the attribute is properly populated when the Sprite is constructed, update the constructors as follows:

```csharp
public Sprite()
{
m_Id = m_Counter++;
}

public Sprite(Texture2D Texture)
: base()
{
AddAnimation(new Animation(Texture));
m_Origin = new Vector2((float)Texture.Width / 2, (float)Texture.Height / 2);
}

public Sprite(Texture2D Texture,int Frames, bool Loop)
: base()
{
Animation animation = new Animation(Texture,Frames);
m_Origin = new Vector2((float)(Texture.Width / Frames) / 2, (float)Texture.Height / 2);
animation.Loop = Loop;
animation.Play();

AddAnimation(animation);
}
```

Adding the Origin references as appropriate.

Next we update the background creation logic to override the constructor and set the background Origin to Zero, makes it easier to draw background textures absolute:

```csharp
Background bg = new Background(background);

bg.Position = new Vector2(0, BackBufferHeight / 2);
bg.ScaleX = BackBufferWidth / background.Width;
bg.ScaleY = BackBufferHeight / background.Height;
bg.ZOrder = 10;
bg.Origin = Vector2.Zero;
bg.Velocity = new Vector2(0,1);
```

That should do it but I also made one other change here that will help us later, I’ve set the velocity of the main background so that the sprite update loop will move the background instead of just incrementing it by 1 all the time in the StarTrooperBackground class.  This enables us to change the speed of the background later.

But by setting this property we also need to update the StarTrooperBackground classes update method, else it will always move twice as fast, so update this code to:

```csharp
public override void Update()
{
Vector2 NewPosition = Position;
if (NewPosition.Y == StarTrooperGame.BackBufferHeight)
{
NewPosition.Y = -StarTrooperGame.BackBufferHeight;
Position = NewPosition;
}
}
```

So all this update function does now is to shift the background up to the top once it has passed beyond view at the bottom of the screen.  However if the background was moving up this would not work.

Feel free to experiment with this if you want, to use a different velocity in a different direction.

To finish up you still need to remove all the references to m\_Origin from the Animation.CS class, like the attribute at the end of the class, and the copy reference in the Clone constructor.

Basically search for all reference in the Animation class and remove them, the only exception is the Draw call which needs to be updated to:

```csharp
spritebatch.Draw(m_SpritesheetTexture, sprite.Position, CurrentFrame, m_Colour, sprite.Rotation,
sprite.Origin,sprite.Scale, sprite.SpriteEffect, 0);
```

Changing the Origin property to use the new Sprite Origin property.

* * *

### Gotcha!!!

Now a good friend of mine sent me a little gotcha for Windows Phone 7 projects, this refers to using Keyboard state.  if you use it the performance of your game will suck big time.  Turns out he was dead right.

After commenting out keyboard references, a certain amount of LAG (which I put down to the emulator on my laptop) disappeared, and the game felt a lot smoother.

Since input seems to be one of those things that is ever changing in the CTP, I have just removed all references in the Input.CS class for Keyboard, so removing things like:

>     Any Keyboard state attributes or updates
>     The private functions for testing keys
>     shortened the Player controls to remove the IsPressed function (just removed)
>     Removed the TrooperFired function altogether since we are currently using the touchscreen to fire

Nice catch Charles!! (Randomchaos / Nemo Krad) Humphrey

* * *

### Conclusion

That is a lot of updates for one post, so I’m moving the rest of what I was going to cover (particle experiment and an accelerometer simulator) in the next intermission (last one in this section I promise ![Winking smile](/assets/img/emoticons/winkingsmile.png))

Now put down the keyboard and step away please sir, nobody needs to get hurt.

Technorati Tags: [wp7dev](http://technorati.com/tags/wp7dev),[Windows Phone 7 development](http://technorati.com/tags/Windows+Phone+7+development),[XNA](http://technorati.com/tags/XNA)
