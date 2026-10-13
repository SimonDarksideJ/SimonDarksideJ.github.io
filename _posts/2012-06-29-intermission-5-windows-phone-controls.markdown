---
layout: post
title: 'Intermission #5 - Windows Phone controls'
date: 2012-06-29 10:46:15
tags: [2d tutorial, game development, xna]
---

In the first of a few intermissions to the tutorial series, we'll add some control to our windows phone project. With the current state of the development kit and the limited help in XNA 3.1 for the Zune, adding controls to a mobile device can be a bit of a black art as not all the same rules used in Windows and XBOX apply.

Now the last statement may seem obvious, but you have to consider what your control scheme is going to be, very carefully. With the wrong control interface even the best of games will fail utterly as they become unusable.

Usability as well as playability is a crucial factor in any game (or any software for that matter), if the user / player cannot interpret what they need to do to play a game or finds the controls sticky or unwieldy, then they are either not going to buy your game or at worst start giving you negative press about it.

As an example, Dark Omen Games (the group that I work with) released a cracking title called **["Nebulon"](http://marketplace.xbox.com/games/media/66acd000-77fe-1000-9115-d8025855025c)** on to the indie game scene last year. Now when it was first released it had a new type of control system (similar to a control system used in the original [Asteroids](http://en.wikipedia.org/wiki/Asteroids_%28video_game%29) game), we all liked it and when you got used to it, it was very challenging. However it was not well received, people found it too hard or just not like what they were used to in similar games (even a little bad press).

We quickly released an updated version taking in this feedback (adding a load of other suggested features at user request, by far one of the best things we did) and let people know of the update, without this change I don't think it would have been as successful as it was, even the reviewers retracted their original comments and praised the quick turn around and response to customer feedback.

A win in the end but it could have been so much worse.

Code as always for this section can be [found here](http://startrooper2dxna.codeplex.com/releases/46712/download/127157).

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

---

## Windows Phone 7 capabilities

The Windows Phone 7 controls we have available are:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) A touch screen (simple point and click interface)
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Accelerometers (twist and turn and wave it all about controls)
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) 3 Buttons (Back, Search and Home)\*Note

> > ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/034.png) The Home button is pretty much reserved according to the Microsoft guidance, for pausing the game and returning to the Phone Home screen. The framework doesn't stop us using it, but you must be careful and not prevent a user from leaving the game (forcing the user to reset the Phone). If Microsoft don't like it they will simply tell you to change it and refuse its application to the Phone Marketplace. This is no different to a failure one of the many technical tests done today for XBOX indie games, but more on that later in the tutorial series.

Doesn't sound like much, which is why we have to be so careful with our control scheme.

The accelerometer is pretty simple and works pretty much the same as an XBOX control stick, allowing movement in any direction and reporting on the new angle or position, plus we can track this for how fast it has been moved (telling the difference between a tilt and a shake for example).

Again the 3 Buttons are also easy, just push or hold, simple enough, no different to a keyboard button.

The touch screen however has some interesting features and since it's a layout canvas (like a table or picture) we can differentiate which area of the screen the user has pressed.

First off the touch screen is a multi touch device, which in theory can track up to seven touch points. In reality the framework is limited to 4 touch points at a time (just not enough screen space to get more than 4 fingers on it, in reality if you try using more than 2, work gets hard for the user / player to see anything)

The touch screen can also be viewed as a button as it can interpret when the user presses the screen and when the contact has been released like a button. However it can also tell when the user has moved their finger across the screen.

As for the canvas we can zone areas of the screen so that we can implement different behaviours depending on where you touch, for example:

Here we can see a possible touch screen layout for an RPG game for example, using touched in the bottom area of the screen to bring up the menu (while displaying some information), the top area could be a scrollable area for player information. The right hand side could be a weapon / spell selector, another scrollable list but when pressed selects the weapon or spell. And finally the main view window that could move the player if held and attack when pressed (or do something else if pressed twice in succession).

A crafty person might do away with the right hand window all together and go for a gesture based system, where you would draw a symbol on the screen to activate a spell / weapon.

Most of these kind of features that the touch screen employs are no different to the modern sat nav machines of today, while the possibilities are not quite limitless, we can still have a lot of fun with it and it gives us more control than it might seem with only 3 control inputs for the phone.

---

## Controls for Star Trooper

Now the basic controls for Star Trooper are very simple, we have: (for now)

> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Up
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Down
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Left
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Right
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Fire

With the controls available, the best choice would be to just use the touch screen, we'll move the trooper to where we are touching the screen and fire a shot when ever the user taps the screen as well.

---

## Touch screen

Before we can start using the touch screen we need to specifically add it to our project. Open the Input class (under the engine folder) and add the following line in the "Using" section at the top of our class:

```csharp
using Microsoft.Xna.Framework.Input.Touch;
```

This tells our class that the touch framework is available to use. Within the touch framework, we have several items, these are:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Touch Panel - The touch device itself
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Touch Panel Capabilities - lists the capabilities of the touch panel, how many touches it supports and if one is connected
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Touch Location and Touch Location state - which provide details of each touch to the screen
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/001.png) Touch Collection - A collection of touches to the screen for how many fingers are on the screen at a time

Like with the keyboard, we need to get the state of the touch panel each update and then respond to those touches appropriately, first off we need an attribute to store the state of the touches, this is done using a Touch Collection (because a Touch Panels state is determined by how many touches there are on a screen).

After the keyboard state parameters at the beginning of the Input class, add the following:

```csharp
static TouchCollection m_Touches = TouchPanel.GetState();
```

Here we declare our Touch collection attribute and get the first state of the Touch Panel as the game starts.

Next we need to ensure that the state gets updated during the game so add the following to the update function:

```csharp
m_Touches = TouchPanel.GetState();
```

Now as the touch panel is completely behaviour driven, we cannot handle what the device should do with those touches here. We leave that to whatever object or screen is responding to the touches. However to do that we need to expose the touches to the rest of the game, so we add a property at the end of our input class:

```csharp
public static TouchCollection touches { get {return m_Touches;} }
```

Now this is a read only property as only the touch device should populate what touches there are and their state.

If we run the game now, we are fully touch screen enabled, but..., we haven't implemented any behaviour as yet, so let's add some touch control to the Trooper

---

## Quick Pause and a bit of refactoring

Now as a prelude to the next intermission for dynamic controls, we need to update the Input class slightly and the Troopers use of those control.

What this does is to abstract the button press testing with actual controls we need in the game (See "Controls for Star Trooper" above), so we make the key press and trigger functions private so that they are only used internally by the input class:

```csharp
private static bool IsPressed(Keys key)
{
  return m_KeyStates.IsKeyDown(key) && m_OldKeyState.IsKeyDown(key);
}

private static bool IsTriggered(Keys key)
{
  return m_KeyStates.IsKeyDown(key) && m_OldKeyState.IsKeyUp(key);
}
```

And then add actual controls for the game that we expect to expose, like so:

```csharp
#region Public Controls

public static bool MoveUp()
{
  return IsPressed(Keys.Up);
}

public static bool MoveDown()
{
  return IsPressed(Keys.Down);
}

public static bool MoveLeft()
{
  return IsPressed(Keys.Left);
}

public static bool MoveRight()
{
  return IsPressed(Keys.Right);
}

public static bool TrooperFired()
{
  return IsTriggered(Keys.Space);
}
#endregion
```

So now if I want to change the keys to use for controlling the trooper, it is all limited inside the input class at current.

You may say, "big deal, that's not different from before where I only updated the trooper class", however when we later add more players and want to assign different controls to each and having them configurable, it becomes a big deal. When we also add a menu and more screens later you will see this abstraction expanded.

> > ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/034.png) In the next intermission we will also go a lot further with this, but for now, this is enough to start.

Next, let us not forget, our Trooper class is still trying to use the old functions, by making them private we have now created a lot of breaks in our code, this helps us to identify where we need to update the code to accept the new control scheme (sometimes breaks are useful).

So simply update the movement code with the new functions like so in the StarTrooperSprite classes Trooper update section:

```csharp
if (Position.Y > 50 && Input.MoveUp())

if (Position.Y < StarTrooperGame.BackBufferHeight - 30 && Input.MoveDown())

if (Position.X > 30 && Input.MoveLeft())

if (Position.X < StarTrooperGame.BackBufferWidth - 70 && Input.MoveRight())
```

Lastly as we intend to add another way to get the Trooper to fire a shot, lets move this into its own function:

Add:

```csharp
void TrooperFire()
{
  // dynamically create a new sprite
  Fire fire = (Fire)StarTrooperGame.Fire.Clone();
  fire.Position = new Vector2(Position.X, Position.Y - 35);
  fire.Velocity = new Vector2(0, -4);
  StarTrooperGame.Add(fire); // set the fire sprite active
}
```

And update the keyboard logic to the following:

```csharp
// if the trooper fire key triggered
if (Input.TrooperFired())
  TrooperFire();
```

---

## Trooper Touch Controls

For now as we are keeping things simple we will just add the touch controls directly to the Trooper itself rather than writing a complex handler (remember KISS). So at the moment we have a collection of touches coming from the Input class and we just need to decide what to do with them.

Now the simplest way to realise touch control for our trooper is simply to move the trooper towards where we are touching (and holding) the screen, that way as you drag your finger round the trooper will follow you.

We could just have the trooper respond and move to where we touch, but that gets a bit more tricky as we cannot see the trooper under our finger and we would need to add logic to stop the trooper jumping around the screen if we took our finger off and placed it somewhere else.

So first off we need to check the touches to see if there is any action, in the StarTrooperSprites class, add the following to the Trooper sprite update function:

```csharp
foreach (TouchLocation t in Input.touches)
{
  switch (t.State)
  {
    case TouchLocationState.Pressed:
      break;
    case TouchLocationState.Moved:
      break;
    case TouchLocationState.Released:
      break;
    default:
      break;
  }
}
```

In this loop we check all of the touches and if a touch is there we check what state it is in, then depending on the state we will do something (not a lot at the moment as the loop exits if something happens)

So to move the trooper to our finger where we are holding it, we need to check for a touch in the Moved state. This might seem a bit strange as we haven't moved our finger on the screen yet, we are just pressing it, however the framework simply interprets anything more than a press as a movement, so we just use move.

So we add the following to the Moved state test:

```csharp
case TouchLocationState.Moved:
  vel = new Vector2(t.Position.X - Position.X, t.Position.Y - Position.Y);
  break;
```

Now here we are using the same logic as we do for the condor and move the trooper towards our touch. First thing you should notice though is that you now have a warning in the compiler and if you build the code it will fail, this is because I have updated the way that we move the trooper, this is so we can safely integrate the keyboard and touch screen together (remember even PCs can have touch screens, like laptops).

I've changed the velocity update variable to a Vector2, as the touch screen position is a Vector2, updated the keyboard update sections to modify the specific component of the new velocity and also introduced a speed variable, which allows us more easily to affect the speed of our trooper's movement. (It will also allow us later to have faster more deadlier enemies).

In short here's the updated Trooper update function:

```csharp
Vector2 vel = Vector2.Zero;

foreach (TouchLocation t in Input.touches)
{
  switch (t.State)
  {
    case TouchLocationState.Pressed:
      break;
    case TouchLocationState.Moved:
      vel = new Vector2(t.Position.X - Position.X, t.Position.Y - Position.Y);
      break;
    case TouchLocationState.Released:
      break;
    default:
      break;
  }
}

if (Position.Y > 50 && Input.MoveUp())
  vel.Y += -2; // if trooper is under y=50 then go upward
if (Position.Y < StarTrooperGame.BackBufferHeight - 30 && Input.MoveDown())
  vel.Y += 2; // if trooper is over y=450 then go upward
if (Position.X > 30 && Input.MoveLeft())
{
  vel.X += -2; // go to the left
  SpriteEffect = SpriteEffects.FlipHorizontally; // left flip trooper
}
if (Position.X < StarTrooperGame.BackBufferWidth - 70 && Input.MoveRight())
{
  vel.X = 2; // go to the right
  SpriteEffect = SpriteEffects.None; // right flip trooper
}
if (vel != Vector2.Zero) vel.Normalize();
Velocity = vel * Speed; // set new velocity for Trooper
```

And the update to the Sprite class to add the new Speed variable:

```csharp
//Speed Attribute
int m_Speed = 2;

//Speed Property
public int Speed
{
  set
  {
    m_Speed = value;
  }
  get
  {
    return m_Speed;
  }
}
```

Finally, now we just need to add the firing capability to our touch interface, simplest way to do this is that when ever there is a tap or new touch to the screen we fire a shot. It does mean whenever you start to move the trooper it will fire, but we're not conserving ammo here and simple is good for now. (if you wish, try experimenting with different ways to control this). The end result is that we would control the trooper with one finger and fire with a second finger.

> ![bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/034.png) One thing to remember though, is that the emulator only supports a single touch with the mouse!!.

Adding this with all the work we have done so far is quite simple, just call the new TrooperFire function when we detect a touch press, like so in the Trooper class:

```csharp
case TouchLocationState.Pressed:
    TrooperFire();
  break;
```

---

## Accelerometer

Now we can add the accelerometer, which I'll detail here briefly, but the situation is a bit more complicated. The main thing that is different between the accelerometer and other control devices is that it is event based.

With other control methods, we check what the current state of the device is and we check it frequently enough, that we can determine exactly when everything happens. With the accelerometer we have to wait for the device to tell us when something has changed.

With this it's a bit more work to setup to do to get this to work and you also have a few choices for how you use this information, either you can keep the same kind of state model that you use for all the other devices or you can use the event system as is. Both have their pros and cons and it's up to you and how your game can best benefit from it. I'll detail the state model here and just point out where you can do it by event.

So, first we need a fair bit of code to add to our input class where most of the work will be done, first some variables to hold our accelerometer setup, add these to the beginning of the input class:

```csharp
static AccelerometerSensor m_accelerometer;
static AccelerometerReading m_accelreading = new AccelerometerReading();
static AccelerometerReading m_Oldaccelreading = new AccelerometerReading();
static bool accelavailable = true;
```

Like the Keyboard, we need to follow the current state of the accelerometer, so we save the last state before it is updated in the loop as follows in the start of the update function:

```csharp
m_Oldaccelreading = m_accelreading;
```

Next up is the event handler for the accelerometer, this is called each and every time something changes in the position of the windows phone, when it does we update the state variable we added earlier. Place this just above the Private properties section in its own area of the input class, the same as the Update or public functions:

```csharp
#region Accelerometer Event Handling
/// <summary>
/// The event handler for the accelerometer ReadingChanged event.
/// BeginInvoke is used to pass this event args object to the UI thread.
/// </summary>
/// <param name="sender"></param>
/// <param name="e"></param>
static void accelerometer_ReadingChanged(object sender, AccelerometerReadingAsyncEventArgs e)
{
  m_accelreading = e.Value.Value;
}

#endregion
```

Then we have the main workhorse of the code, add this inside the Update function towards the end:

```csharp
#region Accelerometer section

  // If the accelerometer is null, it is initialized and started
  if (m_accelerometer == null & accelavailable)
  {
    // Instantiate the accelerometer sensor object
    m_accelerometer = new AccelerometerSensor();

    if (m_accelerometer.State == SensorState.NotSupported)
    {
      accelavailable = false;
      m_accelerometer = null;
      goto AccelerometerNotImplemented;
    }
    // Add an event handler for the ReadingChanged event.
    m_accelerometer.ReadingChanged += new EventHandler<AccelerometerReadingAsyncEventArgs>(accelerometer_ReadingChanged);

    // The Start method could throw and exception, so use a try block
    try
    {
      m_accelerometer.Start();
    }
    catch (AccelerometerStartFailedException exception)
    {
      //throw exception;
      Console.WriteLine("Accelerometer Not Implemented in this device, {0}", exception);
      accelavailable = false;
     }

  }
     AccelerometerNotImplemented:
      Console.WriteLine("Accelerometer Not Implemented in this device");

#endregion
```

Here we have several things going on, first we check if the accelerometer has been started yet or not by checking the variable for the accelerometer sensor, if it's null we haven't set it up yet. You may ask "why wasn't it started with the game?", this is because, unlike other devices, the accelerometer takes power and is an active device, meaning it is almost always sending data, we should only start it when we are expecting to watch for it (so when you pause or switch away from the game you should always stop the sensor so as not to affect anything else, be aware!).

We also test a flag to see if the device you are using supports the accelerometer. I added this check because the emulator does not and throws an error if you try and start it, there is not a capabilities check (like with the touch screen) to see if the device has one or not, you find out in the next step when you try and start it.

So once you've passed that test, which should be just when you start the game (or need to restart the accelerometer), we then create a new instance of the sensor itself. Once we have that we can then check if it is supported on the game device, if it is then we can start it safely, if not then we change the flag to show it is not supported and skip starting the device properly including freeing up the memory we allocated to the sensor.

Next (if there is a sensor), we register to the event handler for the sensor, so that each time the sensor changes it will call the function we added earlier to store the new state.

Finally we have to remember to stop and free up the accelerometer when the game finishes, so we add a Dispose function, which is called by the UnloadResources function in the StarTrooperGame class, so add this to the input class:

```csharp
public static void Dispose()
{
  // if the accelerometer is not null, call Stop
  if (accelavailable)
  {
    try
    {
      m_accelerometer.Stop();
      m_accelerometer = null;
    }
    catch (AccelerometerStopFailedException exception)
    {
      throw exception;
    }
  }
}
```

And this to the StarTrooperGame class UnloadContent function

```csharp
//Important or the Accelerometer will keep on running!!
Input.Dispose();
```

To finish it off we need to update our control functions in the Input class:

```csharp
public static bool MoveUp()
{
  return IsPressed(Keys.Up) || (m_accelreading.Y < m_Oldaccelreading.Y);
}

public static bool MoveDown()
{
  return IsPressed(Keys.Down) || (m_accelreading.Y > m_Oldaccelreading.Y);
}

public static bool MoveLeft()
{
  return IsPressed(Keys.Left) || (m_accelreading.X < m_Oldaccelreading.X);
}

public static bool MoveRight()
{
  return IsPressed(Keys.Right) || (m_accelreading.X > m_Oldaccelreading.X);
}
```

Now here I should mention that we cannot test these settings at present as the emulator does not support the accelerometer and we might need to tweak these checks depending on how the Windows Phone device actually works, but you get a good feel for what is needed.

We could have just updated the velocity of the trooper by altering the event handler to something like this: (\*Note this is only an example, not in the sample)

```csharp
static void accelerometer_ReadingChanged(object sender, AccelerometerReadingAsyncEventArgs e)
{
    //m_accelreading = e.Value.Value;
    StarTrooperGame.Trooper.Velocity += new Microsoft.Xna.Framework.Vector2((float)e.Value.Value.X,(float)e.Value.Value.Y);
}
```

This would allow the Trooper to move across by how much angle the player turned and flipped the device (more angle = more speed), however I felt that this could cause problems with playability, you decide.

---

So ends the next chapter in the series with more Windows Phone stuff :-).

Hopefully you get a feel for control systems in the Windows Phone and other mobile devices, next up is another intermission on dynamic controls, were we build on some of the work here on the Windows / XBOX 360 platforms and allow customisable controls. Customisable controls for mobile devices don't make a lot of sense with such a restricted control set. (although I would like to see a head to head or Air hockey type game on the phone :-))

Bring on the wall!!!
