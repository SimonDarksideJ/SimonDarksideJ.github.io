---
layout: post
title: 'Intermission #6/2 - Analogue Controls'
date: 2012-06-29 10:51:41
tags: [2d tutorial, game development, xna]
---

Following on from the last post I'll quickly cover updating our input framework to allow for analogue controls such as Gamepad stick and triggers.

Code for the complete intermission 6 can be found [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/46712/download/128315)

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Available controls

With XNA we have a few analogue controls to choose from:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Two thumbstick controls - X/Y controls   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Two Triggers - single direction feedback

These offer a gradual response rather than the on/off switch from the digital controls.

Unfortunately Joysticks are not supported on the PC in XNA, yet...

* * *

### Code Updates

Doesn't take too much to update our code to use these analogue controls, first off we need to add a new function to our input class:

```csharp
private static Vector2 IsStickorTriggerMoved(Buttons button)
{
  switch (button)
  {
    case Buttons.LeftStick:
      return m_GamepadState.ThumbSticks.Left;
    case Buttons.RightStick:
      return m_GamepadState.ThumbSticks.Right;
    case Buttons.LeftTrigger:
      return new Vector2(m_GamepadState.Triggers.Left, 0);
    case Buttons.RightTrigger:
      return new Vector2(m_GamepadState.Triggers.Right, 0);
    default:
      return Vector2.Zero;
  }
}
```

Here we just check which control we are using and return the appropriate value, note that as the triggers only have a single value and the thumbsticks have 2, we convert the triggers in to a Vector2 to match the thumbsticks, this just makes it simpler and we only need one function and not two to handle the different types.

Then add the player control that will use this new function:

```csharp
public static Vector2 TrooperMoveStick()
{
  return IsStickorTriggerMoved(m_InputMappings.AltMoveControl);
}
```

Now that we have our test function and control we need to update our game to use it.  This part is not as simple as we need to change the input handling for our trooper a fair bit to enable it to be able to use both analogue and digital controls, here's what the updated update section looks like for the trooper in StarTrooperSprites:

```csharp
Vector2 vel = Vector2.Zero;
switch (Input.InputMappings.AltMoveMethod)
{
  case MovementMethod.Analogue:
    vel = Input.TrooperMoveStick();
    break;
  default:
    if (Input.MoveUp())
      vel.Y = -2; // if trooper is under y=50 then go upward
    if (Input.MoveDown())
      vel.Y = 2; // if trooper is over y=450 then go upward
    if (Input.MoveLeft())
    {
      vel.X = -2; // go to the left
    }
    if (Input.MoveRight())
    {
      vel.X = 2; // go to the right
    }
    break;
}
if (isWithinScreenBounds(Position + (vel * Speed))) Velocity = vel * Speed; else Velocity = Vector2.Zero;// set new velocity for Trooper
if (Velocity.X > 0)
  SpriteEffect = SpriteEffects.None; // right flip trooper
else
  SpriteEffect = SpriteEffects.FlipHorizontally; // Left flip trooper
// if space bar is triggered
if (Input.TrooperFired())
  TrooperFire();
```

There's a lot in here so we will walk through the changes as I had applied them:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    We had already updated the variable for capturing the change in movement to a Vector 2, so no change there (Vector2 vel).   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Next I've added a test against a new configuration option to see if the player has chosen to use Analogue or Digital Controls in a switch statement (more on that in a bit).   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    If we are using analogue controls we update our movement vector (vel) by the amount returned from our new function.  now if the player only moves the stick a small amount the trooper will move slower.  The more the player moves the stick the faster the trooper will travel.   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    If we are not using analogue controls (assuming it's digital) then we use the old functions.  Although they have been trimmed down a bit now to just move.   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    The next step adds a new function to check if the amount the trooper is going to move will put the player outside the bound of the drawable screen, if the trooper is going to move outside, we Zero its velocity so that it doesn't move.  If the trooper still has room to move then we update its velocity (which in turn updates the sprite in the Sprite's update call).   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    Finally we have added another test, since we need a way to check which way the trooper is travelling and we can no longer rely on which key the player is pressing (because with analogue we just have a movement amount not a specific move action like press left), we just check which way on the X axis the trooper is going to move, if the trooper is going to move left ( -X) then we flip the sprite to draw it the other way, if not we set it back to the original direction, right.

Here's the code for the "IsWithinScreenBounds" function, which goes into the Sprite class in the engine folder:

```csharp
public bool isWithinScreenBounds(Vector2 pos)
{
  if (pos.X > (float)StarTrooperGame.ScreenBuffer &&
    pos.X < (float)(StarTrooperGame.BackBufferWidth - (StarTrooperGame.ScreenBuffer * 2)) &&
    pos.Y > (float)StarTrooperGame.ScreenBuffer &&
    pos.Y < (float)(StarTrooperGame.BackBufferHeight - (StarTrooperGame.ScreenBuffer * 2)))
    return true;
  else
    return false;
}
```

This just checks the screen boundaries with a certain amount of buffer space, as you can see the ScreenBuffer is also a new attribute to the StarTrooperGame.cs Class, this goes in to the device specific settings, which allows a different screen buffer size to be set for mobile devices such as the ZUNE (note the ZUNE buffer is a lot smaller):

```csharp
#if ZUNE
        private static int m_TargetFrameRate = 30;
        private const int m_BackBufferWidth = 240;
        private const int m_BackBufferHeight = 320;
        private const int m_ScreenBuffer = 10;
#else
        private static int m_TargetFrameRate = 60;
        private const int m_BackBufferWidth = 1280;
        private const int m_BackBufferHeight = 720;
        private const int m_ScreenBuffer = 50;
#endif
```

The smaller size would also be used in a Windows Phone 7 target, but more on that in a later post.

lastly to complete this update we need the new configuration setting for choosing which type of control we want to use and of course the setting to hold which control that is, so first add the new settings to the KeyMappings.cs class, first the enumeration for the type of control which goes after the InputMappings class

:

```csharp
[Serializable]
public enum MovementMethod
{
  Digital,
  Analogue
}
```

Note that even the enum is marked as serializable for when we save the settings.   And now the keymappings themselves into the InputMappings class itself:

```csharp
public MovementMethod AltMoveMethod; //switch to use analogue or digital control
public Buttons AltMoveControl; //button or stick to use for control
```

So now that we have our settings, we just need to finish this off with the defaults and we're done, so update the defaults in the Input.cs class:

```csharp
m_InputMappings.AltMoveMethod = MovementMethod.Analogue;
m_InputMappings.AltMoveControl = Buttons.LeftStick;
```

Now if we run the project our trooper now has a bit more freedom of movement on the left stick, but wait...

You should notice two things at this point:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    The trooper moves down when I push up on the control stick   
> ![bullet](/assets/img/recovered/2012-06-29-intermission-62-analogue-controls/013.png)    The background has disappeared

Actually the background disappeared a few builds ago and did take me a little time to figure out what went wrong (welcome to the happy world of unintended consequences), but more on that in a bit.

As for the trooper movement, there is a very simple explanation for this.  In our game world moving up actually means reducing the Y value of our sprite, as in our screen space Y increases down the screen.  However, the control stick increases the amount of Y movement as you push up, Up = more Y.   So in matter of fact pushing up increases the amount of Y movement and hence our trooper moves down the screen.

Simple answer to this, just flip the Y value when it moves, but as I am also a sucker for having things configurable (let the player decide on which is the right way, who knows some sucker may like it that way, no offence to those that do?), we'll also add a configuration setting for this flipping.  So first add the new configuration and it's default:

* * *

### Flipping the controls

So to flip the Y axis for our control scheme we need the following updates.

In the KeyMappings class add:

```csharp
public bool InvertYLeftStick;
public bool InvertYRightStick;
```

And add the defaults to the Input class:

```csharp
m_InputMappings.InvertYLeftStick = true;
m_InputMappings.InvertYRightStick = false;
```

And finally update our movement code to recognise this configuration in the Input class, IsStickOrTriggerMoved function:

```csharp
case Buttons.LeftStick:
  if (m_InputMappings.InvertYLeftStick) return invertY(m_GamepadState.ThumbSticks.Left); else return m_GamepadState.ThumbSticks.Left;
case Buttons.RightStick:
  if (m_InputMappings.InvertYRightStick) return invertY(m_GamepadState.ThumbSticks.Right); else return m_GamepadState.ThumbSticks.Right;
```

Plus a little helper function to do the actual flipping for us, add the following "InvertY" function in the Input class:

```csharp
private static Vector2 invertY(Vector2 move)
{
  move.Y = -move.Y;
  return move;
}
```

Here we simply invert the value on the Y axis of the value supplied and return it.  You could also add a InvertX option, but some might see that as silly (or really tricky if you wanted to add confusion in your control style, like a confusion bomb)

* * *

### Conclusion

So there we have it, analogue controls.  Feel free to have a play and see what you can add to this, the project on codeplex also has some other configuration options added just so I could change the settings around while the game was running (very basic though).  See if you can update the Fire mode to shoot more fireballs the more the player leans on the triggers.

Next intermission is on something a little bit more snazzy, Particles, and also something a little less interesting but very important resource pools.  After that we have a much needed performance update and then update our WP7 project with what we have so far.

* * *

### Updates for the Background

Almost done actually, we still need to update some of the code to get our background back.

Now this was a very strange bug and took a fair bit of time to fix, but I narrowed it down to the position on the screen the background was being drawn to, it was getting put well outside the visible screen, so it was being drawn still but not where we could see it.

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

That should do it but I also made one other change here that will help us later, I've set the velocity of the main background so that the sprite update loop will move the background instead of just incrementing it by 1 all the time in the StarTrooperBackground class.  This enables us to change the speed of the background later.

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

So all this update function does now is to shift the background up to the top once it has passed beyond view at the bottom of the screen.  However if the background was moving up this wouldn't work.

Feel free to experiment with this if you want, to use a different velocity in a different direction.

To finish up you still need to remove all the references to m_Origin from the Animation.CS class m like the attribute at the end of the class, and the copy reference in the Clone constructor.

Basically search for all reference in the Animation class and remove them, the only exception is the Draw call which needs to be updated to:

```csharp
spritebatch.Draw(m_SpritesheetTexture, sprite.Position, CurrentFrame, m_Colour, sprite.Rotation,
    sprite.Origin,sprite.Scale, sprite.SpriteEffect, 0);
```

Changing the Origin property to use the new Sprite Origin property.

Lastly, we need to tidy up the Position property in the Sprite class, so that it is no longer offset, like so:

```csharp
public Vector2 Position
{
  set
  {
    m_Position = value;
    //  UpdateCollisionRectangle();
  }
  get
  {
    return m_Position;
  }
}
```

Putting the property sett back to it's default operation.

And we're done.
