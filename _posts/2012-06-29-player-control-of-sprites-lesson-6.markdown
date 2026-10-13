---
layout: post
title: Player Control of Sprites - Lesson 6
date: 2012-06-29 10:39:55
tags: [2d tutorial, game development, xna]
---

Lesson 6 is here from the Original DigiPen series tutorial now updated with XNA.  This section is pretty much untouched apart from the updated code.  I will follow this section up with a few intermission sections to add a few of my own personal touches.

Lets bring the fire!

As usual find the Windows, Phone 7 and original webcast plus docs [here on the Codeplex](http://startrooper2dxna.codeplex.com/releases/view/46712) site.

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Dynamic Sprite Creation

### 1. Dynamic Sprite Basics

Dynamic sprite creation means creating sprites at run time (during the game play).  The Condor is one example of this, now we will walkthrough creating another, the Fireball.

> #### 1.1 How To Create a Sprite Dynamically
>
> To create a sprite dynamically, we need to declare the Sprite Prototype. The sprite prototype will be the basis sprite from which sprite copies are created. The sprite prototype is not handled and it is not displayed.
>
> Example:
>
> Type the following code in the ‘StarTrooperGame.cs’ file in order to create a new sprite prototype:
>
> ```csharp
> public static Fire Fire;
> ```
>
> We then need to setup the Fireball animated sprite:
>
> ```csharp
> Fire = new Fire(Content.Load<Texture2D>(@"Pictures\FireSpritesheet"), 2, true);
> ```
>
> Note: The sprite fire is not added to the game, so it is not active.
>
> After creating a prototype, we would create a copy of it whenever it is needed.  Then we would set the properties of the copy, like position, velocity, etc.  To create a copy of the prototype, we would use code like the following:
>
> ```csharp
> Fire fire = (Fire)StarTrooperGame.Fire.Clone();
> fire.Position = new Vector2(Position.X, Position.Y - 35);
> fire.Velocity = new Vector2(0, -4); // up direction, speed=4
> m_AddedSprites.Add(fire);
> ```
>
> #### 1.2  When Are Dynamic Sprites Used?
>
> Dynamic sprites are used when we need to create sprites and use them during the game play.  For example, dynamic sprites are used to create bullets to shoot or a new life.

* * *

### 2 Input

Critical for any interactive game is the need to handle input from a player controller.  In XNA we also have to handle several different control methods since we target multiple platforms, including:

- PC – uses Keyboards, Joysticks, Gamepads and Mice.
- XBOX360 – Gamepads and chatpads.  (No mic support unfortunately, unless it comes in the full XNA 4)
- Zune and Windows Phone 7 – Touchpads, Gestures and Accelerometers.

I am also really looking forward to the Natal controller for the XBOX360, full body control would be really interesting to work with, although I’m not expecting to see it in XNA till probably late next year.  Although they may also restrict it for XNA keeping the controller solely for XBOX live games, but I hope not.

The DigiPen tutorial only covers keyboard so that is what will be put in here.  I will do an intermission article for Windows phone 7 and the other controllers.

> #### 2.1 Keyboard
>
> A keyboard is a device that returns character codes, the American Standard Code for Information Interchange (ASCII). Since the computer machine can only understand binary numbers, numbers represent the character set.
>
> For example, the number 65 in base 10 (which is 01000001 in binary) represents uppercase character A.
>
> #### 2.2 Pressed
>
> The action assigned to the keyboard input will be executed as long as the key is pressed. To get the status of a key (if it is pressed or not), this is defined as the IsPressed() function.
>
> Example:
>
> ```csharp
> Keyboard.IsPressed(Keys.Up)
> ```
>
> This function returns a Boolean value either TRUE (1) or FALSE (0).
>
> You would use the Pressed action, when you want to continually check if a key is held down and if it is increment some value, like moving the Trooper for instance.  If I hold down the Up arrow key, I want the Trooper to continue towards the top of the screen until either the player releases the Up arrow key or the Trooper reaches the top of the screen.
>
> #### 2.3 Triggered
>
> The action assigned to the keyboard input that will be executed when the key status changes from not pressed to pressed. To get the status of a key (if it is triggered or not), this is defined as the IsTriggered() function.
>
> Example:
>
> ```csharp
> Keyboard.IsTriggered(Keys.Space)
> ```
>
> This function returns a Boolean value either TRUE (1) or FALSE (0).
>
> The Triggered action is used when you only want a single return from a single key press no matter how long it is held down.  For example, if you want only one shot to be fired each time you hit the space key.
>
> If you wish in the implementation below, change the Fire action from Triggered to Pressed and see what happens.

* * *

### Game Implementation

In the game, the arrow keys are used to move the main sprite (trooper sprite).

- Pressing the Up arrow moves the trooper upward.
- Pressing the Down arrow moves the trooper downward.
- Pressing the Left arrow moves the trooper to the left.
- Pressing the Right arrow moves the trooper to the right.

Also, when the Space key is triggered, then the main sprite (trooper) will shoot a bullet (fire sprite), which is a sprite created dynamically.

### Step 1: Create a new Sprite Prototype

First off, we need to define the Fire class itself, open up the StarTrooperSprites.cs class and add this following definition towards the end (before the last } bracket):

This is the default template for sprite objects in this game, where we declare a new class, a default constructor, the overload constructor and clone method (for adding cloning functionality) and finally a blank update method.

```csharp
public class Fire : Sprite
{
public Fire()
{
}

protected Fire(Fire Fire)
: base(Fire)
{
}

public override Object Clone()
{
return new Fire(this);
}

public override void Update()
{

}
}
```

Now that we have our Fire class, we need to create the prototype variable and then load the resources and animation needed for the prototype, so in the StarTrooperGame.cs class, we set this up at the top of the class with the other class attributes:

```csharp
public static Fire Fire;
```

Then in the LoadResources() function, type:

```csharp
#region Fire
Fire = new Fire(Content.Load<Texture2D>(@"Pictures\FireSpritesheet"), 2, true);
#endregion
```

Note: The sprite fireball is not added to the game, so it is not active.

This gives us our Prototype Fireball, implemented in a similar fashion to the Condor, the only main difference being that the player will control when the Fireball is released by hitting the Space bar.

### Step 2: Enter Input Information

Next up we need to code up the ‘StarTrooperSprites.cs’ file – to add player input in to the Trooper class, we do this in the Update() function as follows.

First we need the code for controlling the movement of the Trooper itself:

```csharp
int vx = 0, vy = 0;
if (Position.Y > 50 && Input.IsPressed(Keys.Up))
vy = -2; // if trooper is below y=50 then go upward
if (Position.Y < StarTrooperGame.BackBufferHeight - 30 && Input.IsPressed(Keys.Down))
vy = 2; // if trooper is above the bottom limit then go downward
if (Position.X > 30 && Input.IsPressed(Keys.Left))
{
vx = -2; // go to the left
SpriteEffect = SpriteEffects.FlipHorizontally; // left flip trooper
}
if (Position.X < StarTrooperGame.BackBufferWidth - 70 && Input.IsPressed(Keys.Right))
{
vx = 2; // go to the right
SpriteEffect = SpriteEffects.None; // right flip trooper
}
Velocity = new Vector2(vx, vy); // set new velocity for Trooper
```

Walking through this we have 4 tests (note that we have used multiple IF statements and not a SWITCH statement, this is because we need to check if the user has multiple keys pressed.  If we used a SWITCH statement, then only one key would be recognised in each update loop).

The first test checks if the Trooper is more than 50 pixels away from the top of the screen (to ensure the player stays within the bounds of the visible screen).  If the trooper is still in the screen and the player has pressed the UP arrow key then we will move the Trooper two pixels up (vy=-2, velocity offset by -2 in the y Axis).

The second test is similar to the first except that we test the bottom of the screen and the DOWN arrow key, if true then we move the Trooper down by two pixels (vy=2, velocity offset by +2 in the y Axis).

The third and fourth tests check the left and right keys along with the left and right boundaries of the screen and updating the offset velocity of the X axis appropriately.

Additionally if the Trooper is moving left or right, we flip the image of the trooper to look in the direction the Trooper is moving in the same way that we did with the condor using the SpriteEffect.

Finally we take our new velocity and apply it to our Trooper.  When the Trooper sprite updates (the update in the base Sprite class for the Trooper), the Sprite will be moved in the direction we have applied.

### Step 3: Bringing the Fire

To finish up this section of the tutorial, we will give the Trooper something to send those blasted Condors crashing down to their fiery and well deserved deaths.

Lets add some shooting action.  So we have setup our new Fire class sprite and given it a little bit of animation, so lets add another keyboard input to let that fire loose upon the unsuspecting Condors.

This just requires a little extension to the code above in the Trooper section of the StarTrooperSprites.cs class.  Just add the following:

```csharp
// if space bar is triggered
if (Input.IsTriggered(Keys.Space))
{
// dynamically create a new sprite
Fire fire = (Fire)StarTrooperGame.Fire.Clone();
fire.Position = new Vector2(Position.X, Position.Y - 35);
fire.Velocity = new Vector2(0, -4);
StarTrooperGame.Add(fire); // set the fire sprite active
}
```

Fairly simple here, we test if the space bar has been triggered (1 action whether the user just presses the spacebar or holds it) and then clone a new fireball, set its position just above the Trooper sprite (plus a little height for effect) and set it on its way in an upwards direction at a speed of 4.

Finally add it in to the drawable sprites collection and there you go, Shots fired.

If you run the game now, you should notice two little problems.

1. The shot is firing from the left hand side of our Trooper.
2. The shot never impacts any Condors, it just sails on through

Now point 1 is because all the coordinates we have been using for the Trooper (and the Condor) are using the screenspace coordinate for the Sprite, which is the top left hand side of the sprite image.  To correct this we will update the Sprite class a bit to compensate.

Here we just update the Position property in the Sprite.cs class.

```csharp
public Vector2 Position
{
set
{
m_Position.X = value.X + (m_Animations[m_CurrentAnimationIndex].Texture.Width / 2);
m_Position.Y = value.Y + (m_Animations[m_CurrentAnimationIndex].Texture.Height / 2);

// UpdateCollisionRectangle();
}
get
{
return m_Position;
}
}
```

As for the second, we simply have not implemented any collision logic as yet, so the fireball does not know it has hit a Condor, neither does the Condor know it has hit the Trooper.  Another point is that the fireballs will just keep on going, never stopping.  We will cover this in the last section of the DigiPen tutorial series, number 8.

* * *

### Conclusion

With that little bit of action introduced, we move next on to a bit of audio, the next section of the tutorial covers sound and music, finally something more than just looking at the screen to draw us in to the game.

I have planned a couple of intermissions on the way to the next section, to add a bit of flair.

- A more robust input system with configurable controls and multi-platform support
- Adding thread pools to the engine for a more garbage safe implementation for large numbers of objects
- A particle system to give us some prettier effects

So as always on with the show!!!

* * *

### Addendum

Just a minor correction as part of this article, a minor update to the Input class (little typo to correct)

Change this line in the “isTriggered” function, from:

```csharp
return m_KeyStates.IsKeyDown(key) && !m_OldKeyState.IsKeyUp(key);
```

To:

```csharp
return m_KeyStates.IsKeyDown(key) && m_OldKeyState.IsKeyUp(key);
```

Just remove the exclamation mark (!) from the test on the oldkey state.  In original form, it acted exactly the same as the isPressed function :-).
