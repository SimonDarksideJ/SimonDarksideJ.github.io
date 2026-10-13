---
layout: post
title: Game Implementation Part one
date: 2012-06-29 09:32:37
tags: [2d tutorial, game development, xna]
---

As we get into the actual coding part of this tutorial, I thought I would at least show an image of what DigiPen was aiming for in this game.

[![Star Trooper game window with a bat enemy, a fireball and the player ship over an icy background](/assets/img/wordpress/2012/07/image20.png "image")](/assets/img/wordpress/2012/07/image20.png)

Fairly basic game with your little Trooper at the bottom furiously shooting up at the Condors before they crash in to you.  On with the show.

As noted in the previous post, code for this section can be found [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/44143 "Lesson 4 Supporting content") along with the original DigiPen webcast.

> Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

## Game Engine Essentials

When building an actual game, we need to go beyond just the basics (set out in the XNA help) of just rendering objects to a screen, we need to implement the lessons from the previous post and set up some kind of framework or engine.

This does not need to be some big killer setup, just enough so we can handle all the objects we are going to draw and update with some logic of how they interact.

So for this game we are going to be using:

- Sprites – For our character (the Trooper), the bad guys (Condors), the shots we fire and even the background
- Text – For drawing the score how many shots we fire, etc
- Sounds and Music – for effect.

For each of these we need a central place to store all the objects we are going to use, we also need to be aware that some of these will be created and destroyed on a regular basis (the shots from our trooper and hopefully the bad guys) and sound needs to loop or be played as events occur.

The following items can be found in either the “Startroopergame.cs” (the renamed version of the default XNA template game.cs) or in the Engine folder of the project.

* * *

### 1. Sprite Manager

So first off the sprites.

Someone might question that there will be only one of a certain type of sprites in our game like the Trooper and background unlike Condors and Shots will be created and destroyed, so should not they be handled separately?  Well you could but that would only complicate how the game is put together, as a rule of thumb just keep to the KISS principle (Keep It Simple Stupid – I kid you not).  So we group all the things that we need to draw and animate together and handle them the same.

So we need somewhere to group all the Sprites together, for that we use a List (or array):

```csharp
static List<Sprite> m_Sprites = new List<Sprite>();
```

We make it static so that there is only one container and we do not need to declare it to use it, keeps it simple.  But we also need to handle that some of the sprites will be created and destroyed over time, as a list cannot be manipulated when it is being parsed (when the array is being walked through), we need two additional lists to add and remove sprites from our sprite list:

```csharp
static List<Sprite> m_DeletedSprites = new List<Sprite>();
static List<Sprite> m_AddedSprites = new List<Sprite>();
```

lastly, we need to also be able to handle the ordering (Z Ordering) when drawing the sprites to the screen, so we have yet another list to do that (in the DigiPen implementation)

```csharp
static List<Sprite> m_ZOrderedSprites = new List<Sprite>();
```

There, that gives us some storage for all our sprites but we still need to use them to draw to the screen and update their logic (move and kill them)

To makes things simple to read, it is best to write separate functions for each operation against each type of object, so below is the Update logic for a sprite:

```csharp
void InternalUpdate()
{
foreach (Sprite s in m_AddedSprites)
{
m_Sprites.Add(s);
m_ZOrderedSprites.Add(s);
}
m_AddedSprites.Clear();

foreach (Sprite s in m_DeletedSprites)
{
m_Sprites.Remove(s);
m_ZOrderedSprites.Remove(s);
}
m_DeletedSprites.Clear();

foreach (Sprite s in m_Sprites)
s.InternalUpdate();

foreach (Sprite s in m_Sprites)
s.Update();

}
```

The first block checks the Added Sprites list and adds any it finds into the main Sprite list, it also then adds it to the ZOrdered Sprites list, it then clears the Added Sprites list for the next run so that we only add each new sprite once.  The next block then does this again for the Deleted Sprites list except it removes the sprites found instead.

The last two blocks loop through the main Sprite list and performs two updates on them (this is how DigiPen did it to separate out group operations on sprites and individual sprite types updates, a better solution would be to Override the Update call but we will do this later)

All we then have to do is add our “InternalUpdate” function to the main XNA update loop:

```csharp
protected override void Update(GameTime gameTime)
{
// Allows the game to exit
if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
this.Exit();

// TODO: Add your update logic here
InternalUpdate(); // <- Added Sprite update function here

base.Update(gameTime);
}
```

Next we need to handle the drawing of our sprites, as there is a lot less to do here (just tell each sprite to draw itself, we can just add this directly into the main XNA Draw loop):

```csharp
protected override void Draw(GameTime gameTime)
{
GraphicsDevice.Clear(Color.CornflowerBlue);

// TODO: Add your drawing code here

m_ZOrderedSprites.Sort(Sprite.ComparisonZOrder);// <- Added Sprite draw code here

foreach (Sprite s in m_ZOrderedSprites)
s.Draw(gameTime,spriteBatch);

base.Draw(gameTime);
}
```

Here we are using the ZOrdered list of sprites (since we want to draw our background behind everything else, but also useful if you want to use layered backgrounds, more later).  Personally I might have just used the main Sprite list but lets keep to the DigiPen track for now.

That is it for sprites, any we now add to the Added List will get put into the main loop and be updated and drawn to the screen.

* * *

### 2. Text Manager

The implementation for Text is pretty much the same as Sprites as text does end up as a graphic drawn to the screen, it is not a sprite however and needs to be handled separately, there are some discussions that text like sprites are just draw-able elements on the screen and should be grouped together,  just use which ever implementation works for you, but this way it is easier to read.

So first off the storage lists / arrays:

```csharp
static List<Text2D> m_Text2Ds = new List<Text2D>();
static List<Text2D> m_DeletedText2Ds = new List<Text2D>();
static List<Text2D> m_AddedText2Ds = new List<Text2D>();
```

The Update function for text: (Digipen just appended it to the Sprite update function)

```csharp
foreach (Text2D t in m_AddedText2Ds)
m_Text2Ds.Add(t);
m_AddedText2Ds.Clear();

foreach (Text2D t in m_DeletedText2Ds)
m_Text2Ds.Remove(t);
m_DeletedText2Ds.Clear();

foreach (Text2D t in m_Text2Ds)
t.InternalUpdate();
```

And finally adding the draw logic just after the Sprite drawing logic so that it is always drawn last (on top) of the screen.

```csharp
foreach (Text2D t in m_Text2Ds)
t.Draw(gameTime, spriteBatch);
```

* * *

### 3. Audio Manager

Audio is generally a lot simpler to manage, we do not add new sounds or remove them in the course of the game, it is just play or do not play.

But we do have two types of sound to manage, simple sound effects (like a shot or explosion) and music (which repeats / loops and plays continuously).  So we need one container for sound and one for music.

```csharp
static List<SoundEffect> m_Sounds = new List<SoundEffect>();
static List<SoundEffectInstance> m_Music = new List<SoundEffectInstance>();
```

In XNA, there is a distinction between the physical audio file (the sound) and how we play it.  if we just want to play it once with no other settings, it is a simple “SoundEffect”, however if we want to do more like loop the sound, control the pitch / volume and such, then we need to create an instance of that sound and control it is output through the use of a “SoundEffectInstance”.  I will cover these in a bit more detail in the audio section of the tutorial, but the engine we need do no more.

Another great feature of the XNA framework is that we do not need any logic for handling the actual playing and updating of music, XNA does this all for us.  We just tell XNA to play the sound or stop it (with a few extra options with an instance).

There is another way to handle audio (which is covered in the XNA Help) through a tool called XACT (Cross-Platform Audio Creation Tool).  XACT is more of an audio studio which enables you to configure your audio with more granularity and even add 3D effects to your sound.  Time permitting, I will handle this in one of the extensions to the DigiPen tutorial.

* * *

### 4. Input Manager

The input manager I’ve included as part of the basic project is very simple:

```csharp
static KeyboardState m_KeyStates = Keyboard.GetState();
static KeyboardState m_OldKeyState;

public static bool IsPressed(Keys key)
{
return m_KeyStates.IsKeyDown(key) && m_OldKeyState.IsKeyDown(key);
}

public static bool IsTriggered(Keys key)
{
return m_KeyStates.IsKeyDown(key) && !m_OldKeyState.IsKeyUp(key);
}

public static void Update()
{
m_OldKeyState = m_KeyStates;
m_KeyStates = Keyboard.GetState();

}
```

All that is provided so far are the two needed keyboard states for storing the current and previous states of the keyboard (we have both so we can compare if you are holding the key or if you have just released it), an update method to get the latest keyboard state and save the last one.  Lastly there are two methods which return true if a key is pressed (held down) and triggered (just pushed).  Trick being that if a button is only triggered you only get one action (like typing on a keyboard, you only want 1 letter for each key pressed) and if it is held it keeps going until the user releases the key (like turning a car).

I do have a more complicated input manager on my other CodePlex project “[Camera Examples](http://hack1.codeplex.com/releases/view/28619)” which you can view if you wish.

later in the tutorial we will expand the input manager slightly but not by much as a simple shooter does not need much.

* * *

### 5. Animation Manager

The animation component provided by DigiPen is pretty complete and I have not had to change much for the implementation to XNA.

I would go through it here but “Half Pint” over at [CoderPlex](http://coderplex.blogspot.com/2010/04/2d-animation-part-1-basics.html "Sprite Annimation Tutorial") has done a very good overview of a Sprite Animation system, click though and have a look.

This is handy as he has also written a spritesheet creator tool, which I will go though using in one of the intermissions in this tutorial.

* * *

That is it for the implementation of the engine for now.  From the Digipen I have stripped a lot of the engine code as the XNA framework supplies most of it and some was just redundant in the new world.

Now on to the beginning of our game and actually draw something.
