---
layout: post
title: 'Intermission #6 - More meat on the bone'
date: 2012-06-29 10:47:16
tags: [2d tutorial, game development, xna]
---

When I started doing this section, it was meant to be quick and short as an intermission is supposed to be. The theory behind dynamic controls itself is quite simple and it's implementation fairly easy, unless you're like me and want to go that little bit further and add some flair.

So this little intermission has grown a fair bit. So read on.

The code for this section will be posted after the next post.

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

---

## Theory behind dynamic controls

like the last post, we have a set of objectives, the control system for our game and we have our available controllers. Unlike the windows phone the options are various:

> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Gamepads - 4 push buttons, 4 way multi-directional D pad, 2 analogue sticks with buttons, 2 analogue triggers, a back and a start button. (whew)
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Keyboards and keypads - lots and lots of keys
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Mice - analogue pointer, a host of buttons (depending on model) and usually a scroll wheel (never mind 3D mice, but they aren't supported yet)
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Joysticks - Don't get me started there!

With so many options we have a little bit more to think about.

So when implementing our game control scheme we need a way to handle all these different inputs (unless you are only targeting a single platform) without overloading our actual game code. To do this we need to abstract our functionality a bit, this is what we are trying to aim for:

The diagram above details a level of abstraction we apply between our game controls and the available inputs we have for each platform.

> ![Blue star bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/022.png) Game Controls
>
> The detail what actions are available to the user, like Move Avatar Up, Select Menu Option, Fire, Change weapon
>
> ![Blue star bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/022.png) Input Manager
>
> Details what input controls are to be examined for each game control, so in order for the player to Fire, the input manager checks if the spacebar has been pressed or button A on the gamepad or the left mouse button. The actual buttons themselves are not mentioned here, they are checked in the control mappings for which actual button to use.
>
> E.G.
>
> 1. Game looks to see if Player has fired
> 2. Input manager receives the request to check if the player has fired
> 3. Input manager gets the button for fire from the control mappings
> 4. Input manager checks if that button has been pressed
> 5. Input manager feeds back to the game if button has been pressed or not
> 6. Game acts on the input manager feedback (E.G. puts a new fireball sprite on the screen if the player has fired)
>
> This sounds a lot more complicated than it actually is, but gives you a feel of what is required. The big benefit of this if that if you want to change the control scheme (what buttons to use), you don't need to rewrite all your game code or even the input manager, just update the key to be used in the mappings.
>
> ![Blue star bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/022.png) Control Mappings
>
> This part is much simpler, it stores the current setting for each input control, like:
>
> - Keyboard Fire = Spacebar
> - Gamepad fire = button A
> - Mouse fire = let mouse button

---

## Putting it together

We need to start from the ground up, so first off we need our mappings (which buttons do what).

### 1. Key Mappings Struct for configuration

So create a new class called "KeyMappings.cs" in the engine folder (Right click the engine folder in the solution explorer and select "New Class") and add the following:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Input;

namespace TestProject
{
    [Serializable]
    public struct InputMappings
    {
        public bool SettingsSaved;

        public Keys MoveUp;
        public Keys MoveDown;
        public Keys MoveLeft;
        public Keys MoveRight;
        public Keys Fire;

        public Buttons AltMoveUp;
        public Buttons AltMoveDown;
        public Buttons AltMoveLeft;
        public Buttons AltMoveRight;

    }
```

A couple things to note before we go through this, ensure you update the namespace to the above, by default, when the new class is generated it also adds the folder name into the namespace, just something to be aware of. Second, we have added a using statement for the Microsoft.XNA.framework.Input class, we need this to identify things like Keys and Buttons.

So here we can see a simple struct that contains key definitions for all our controls and also button mappings for the same (Keys for keyboard and Buttons for Gamepad).

The main thing of note here is the content tag above the struct definition \[Serializable\], this identifies that the struct can be formed into XML using serialisation when we want to save our configuration, more on this later.

### 2. Input Manager key/button recognisers

In the original DigiPen lesson 6, we had some very basic key recognisers, this was very basic and required you to put the actual keys in your game code. This checked if a specified key was pressed or triggered.

We need to extend this now and add recognisers for the gamepad buttons

First we add the state attributes to the top of the Input.CS class:

```csharp
//Mouse States
static MouseState m_MouseState = Mouse.GetState();
static MouseState m_OldMouseState;

//Gamepad states
static GamePadState m_GamepadState = GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One);
static GamePadState m_OldGamepadState;
```

Then ensure they are updated in the update loop:

```csharp
//Mouse Update
m_OldMouseState = m_MouseState;
m_MouseState = Mouse.GetState();

//Gamepad Update
m_OldGamepadState = m_GamepadState;
m_GamepadState = GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One);
```

And finally add the recognisers in to the main body of the code:

```csharp
private static bool IsButtonPressed(Buttons button)
{
  return m_GamepadState.IsButtonDown(button) && m_OldGamepadState.IsButtonDown(button);
}

private static bool IsButtonTriggered(Buttons button)
{
  return m_GamepadState.IsButtonDown(button) && m_OldGamepadState.IsButtonUp(button);
}
```

Note that I've now changed the above functions to Private, we do this in order to control access to the input states, it's also good practice to limit the visibility of functions in a class to only those you actually want to expose. Before the next step, you should also change the scope of the existing Key recognisers to Private as well.

### 3. Input Manager Player control -> key / button abstraction

If you followed Intermission #5 Windows Phone 7 intermission, we created our player control actions and moved the key definitions into the input class, this enabled the game to just ask if the action had happened (the press of a key) without specifying the actual key.

We just need to add this to our windows project and extend it to handle the additional inputs.

First we add a reference to the struct we created earlier for holding our input configuration in the header of our input class:

```csharp
static InputMappings m_InputMappings = new InputMappings();
```

Then add the following functions:

```csharp
#region Public Controls

public static bool MoveUp()
{
  return IsKeyPressed(m_InputMappings.MoveUp) || IsButtonPressed(m_InputMappings.AltMoveUp);
}

public static bool MoveDown()
{
  return IsKeyPressed(m_InputMappings.MoveDown) || IsButtonPressed(m_InputMappings.AltMoveDown);
}

public static bool MoveLeft()
{
  return IsKeyPressed(m_InputMappings.MoveLeft) || IsButtonPressed(m_InputMappings.AltMoveLeft);
}

public static bool MoveRight()
{
  return IsKeyPressed(m_InputMappings.MoveRight) || IsButtonPressed(m_InputMappings.AltMoveRight);
}

public static bool TrooperFired()
{
  return IsKeyTriggered(m_InputMappings.Fire) || IsButtonTriggered(m_InputMappings.AltFire);
}

#endregion
```

Here for every action we want the player to make, we check both the keyboard and gamepad (more on the mouse later) settings in our configuration.

Lastly, at this point we have the setup read but we are missing one little crucial factor, some actual configuration. So since the first time we run the game we have no settings, we need some defaults, then the player can change them later if need be (which we'll cover in a later post).

So add the extra Load Defaults function like so:

```csharp
public static void Load_Defaults()
{
  //Single Player settings
  m_InputMappings.MoveUp = Keys.Up;
  m_InputMappings.MoveDown = Keys.Down;
  m_InputMappings.MoveLeft = Keys.Left;
  m_InputMappings.MoveRight = Keys.Right;
  m_InputMappings.Fire = Keys.Space;

  m_InputMappings.AltMoveUp = Buttons.LeftThumbstickUp;
  m_InputMappings.AltMoveDown = Buttons.LeftThumbstickDown;
  m_InputMappings.AltMoveLeft = Buttons.LeftThumbstickLeft;
  m_InputMappings.AltMoveRight = Buttons.LeftThumbstickRight;
  m_InputMappings.AltFire = Buttons.A;

}
```

Now that our structure is in place, we need to update the game code to make use of it.

---

## Updating the player input

So with our new control system in place we need to update our game controls to make use of them, this in itself is quite simple using what we have defined so far.

So in the StarTrooperSprites.cs class, update the update section with this:

```csharp
public override void Update()
{
  Vector2 vel = Vector2.Zero;

  if (Position.Y > 50 && Input.MoveUp())
    vel.Y = -2; // if trooper is under y=50 then go upward
  if (Position.Y < StarTrooperGame.BackBufferHeight - 30 && Input.MoveDown())
    vel.Y = 2; // if trooper is over y=450 then go upward
  if (Position.X > 30 && Input.MoveLeft())
  {
    vel.X = -2; // go to the left
    SpriteEffect = SpriteEffects.FlipHorizontally; // left flip trooper
  }
  if (Position.X < StarTrooperGame.BackBufferWidth - 70 && Input.MoveRight())
  {
    vel.X = 2; // go to the right
    SpriteEffect = SpriteEffects.None; // right flip trooper
  }
  if (vel != Vector2.Zero) vel.Normalize();
  Velocity = vel * Speed; // set new velocity for Trooper

  // if space bar is triggered
  if (Input.TrooperFired())
    TrooperFire();
}
```

Where we have simply replaced any references using:

```csharp
 Input.IsPressed(Keys.Up)
```

With the relevant player control function:

```csharp
Input.MoveUp()
```

So now anytime we need to change the key to use for a control, we don't need to recompile our code (unless you want to change the defaults)

---

## Saving and Loading the configuration

So with our new structure in place life is much simpler, but unless we save those changes and load them again next time the player wants to run the game, either the player has to live with the defaults or change them each time the game starts, ouch.

Saving and loading configuration it is. Again the theory behind this is quite simple, although it does have it's ways.

In order to save our settings, we need a few things:

> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Storage Device - This is the drive or memory card where the settings are going to be saved.
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Storage Container - This is the folder structure on the storage device where we save a specific games files.
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Save file - An XML or binary file that holds the configuration

### 1. Storage Device

The storage device is controlled and maintained by the XBOX live gamer services, this is a component that provides access to the XBOX live prompts like which storage device can be used, if you are logged on to XBOX live and some general service like prompts (have a play with the Guide settings once it's setup to see what it offers, or look it up in the help).

So first we need to add the GamerServices to our game, open up the StarTrooperGame.CS file and add the following to the constructor for the class:

```csharp
//Add the gamer services so that we can use the guide and access the storage
this.Components.Add(new GamerServicesComponent(this));
```

This adds the Gamer Service Component to your games Components collection. The XNA Game components collection, is a part of the XNA game framework and a bit outside the scope of this tutorial for now. I used to use them a lot in the beginning but I (like a lot of people) seem to favour doing it ourselves, it's not that it's bad (it's actually quite powerful when used right), it's just that there is a certain way of writing game features to make use of the component system and developers usually want more control than it offers. Look them up in the XNA help by searching "XNA Components".

When we want to get the current storage device for our game we use the following function:

```csharp
Guide.BeginShowStorageDeviceSelector
```

There is a bit more to it than that but we will go over that in a bit.

### 2. Storage Container

Storage containers are easier, they are just the area on the device for your game, they are supposed to be unique so that you don't use another games files, they can also be player specific so you can hold settings for as many players can play the game. They are simply created by calling:

```csharp
StorageContainer container = device.OpenContainer("StarTrooper2DXNA");
```

The above just creates a new folder in your players save area for the game using the title given.

### 3. Save file

Now two things are needed to create the save file itself, first a serialized version of your configuration and a FileStream to save the file itself.

The Filestream is just the way that the XNA framework uses to output data in memory onto the disk and as the name suggests, it does this by streaming the data on to the disk. When ever we work with files on the storage device we simply:

> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Open the file, with options to create it if not already there (Warning, careful when using the option that always creates the file, even if present or you will sped a crazy few minutes trying to wonder why your settings are gone next time you load!!)
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Stream the files contents in to memory
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Do Stuff
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Stream the changes back to the file
>
> ![Green arrow bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png) Close file / stream

In code, it looks like this:

```csharp
// Get the path of the save game.
string filename = Path.Combine(container.Path, "StarTrooperControls.sav");

// Open the file, creating it if necessary.
FileStream stream = File.Open(filename, FileMode.OpenOrCreate);

//do stuff

// Close the file.
stream.Close();
```

This gives us a nice save point for our settings or what ever you want to save e.g. highscores, achievements (as we don't have XBOX live achievements in XNA), but we still need to put something in it.

> ![Orange note bullet](/assets/img/recovered/2012-06-29-intermission-5-windows-phone-controls/034.png) Note: If you look in the XNA help for the samples above you will find them very similar (as that's where they came from), however, be warned the samples set the "FileMode" when creating a file to just "Create", this will create a new file EVERY time you run it, overwriting what was there. Be very careful about which mode you need to use for your saves!. "OpenOrCreate" is usually a bit safer (unless you only want read access) which will only create new if it doesn't exist and if it does, then open it.

### 4. Serialisation of configuration

Finally we need to turn our configuration in memory into something we can save, that can be XML or a binary file or whatever format you wish (within reason). When I first started out I made the mistake of writing my own serialiser, I have since learned the errors of my ways. Serialisation is much easier and can do most of what you need.

One thing I will point out, if you are going to load levels in this fashion, a better answer would be to do it using the XNA Content pipeline (Content Manager), where it has more advanced serialisation techniques through the IntermediateSerializer. Read [Shawn Hargreaves article](http://blogs.msdn.com/b/shawnhar/archive/2008/07/28/intermediateserializer-vs-xmlserializer.aspx) for more information on that. The XMLSerializer though is the only one to work at runtime and allows saving!.

So what do we need, well very simply we already have what we need in the first section of this post, our Serialisable struct (remember the Serializable tag), where we set up our struct with strong types (using base types) and added the \[Serializable\] tag to the struct. This enables the XMLSerializer to recognise the struct when reading the class.

To serialise a class, we simply create a new XMLSerializer with the class type and then tell it to serialise the class to the Filestream we created, like so:

```csharp
// Convert the object to XML data and put it in the stream.
XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
serializer.Serialize(stream, Input.InputMappings);
```

Deserialisation is the method for how we reverse this process, serialisation takes a class and turns it into XML (or your preferred format), deserialisation takes an XML fie and creates a new instance of the class it was constructed for.

---

## Putting it together

So with all that out of the way, let's actually implement it into the game framework, start off by creating a new class in the Engine folder called "FileManager".

Add the following attributes to the start of the class (remember to change the namespace as before!!):

```csharp
private static StorageContainer container;
private static StorageDevice device;
private static IAsyncResult result;
private static bool LoadSettings = true;
```

This gives the storage container and storagedevice for the game, it also has a setting to signify if we are loading or saving. More on the iAsyncResult later.

Next, we add the file management parts, to make the code cleaner I've broken up the code so that it can be reused more easily, so here are the Open File and Close file functions:

```csharp
private static FileStream OpenStorageSettings()
{

  // Open a storage container.
  container = device.OpenContainer("StarTrooper2DXNA");

  // Get the path of the save game.
  string filename = Path.Combine(container.Path, "StarTrooperControls.sav");

  // Open the file, creating it if necessary.
  FileStream stream = File.Open(filename, FileMode.OpenOrCreate);

  return stream;
}

private static void CloseStorage(FileStream stream)
{
  // Close the file.
  stream.Close();

  // Dispose the container, to commit changes.
  container.Dispose();

}
```

And then we add the main functions for saving and loading:

```csharp
private static void DoSaveSettings()
{
  try
  {
    // Create the data to save.
    FileStream stream = OpenStorageSettings();
    // Convert the object to XML data and put it in the stream.
    XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
    serializer.Serialize(stream, Input.InputMappings);

    CloseStorage(stream);
  }
  catch { }
}

private static void DoLoadSettings()
{
  try
  {
    FileStream stream = OpenStorageSettings();
    // Convert the object to XML data and put it in the stream.
    if (stream.Length > 0)
    {
      XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
      Input.InputMappings = (InputMappings)serializer.Deserialize(stream);
    }
    CloseStorage(stream);
  }
  catch{}
}
```

You will notice in the above, that the save and load functions have a Try / Catch block around the code, this is so that any errors that happen while saving are handled correctly and does not cause the game to crash.

Next we need to select a storage device to save to through the guide:

```csharp
private static void SelectStorage()
{
  // Set the request flag
  if (!Guide.IsVisible)
  {
    device = null;
    result = Guide.BeginShowStorageDeviceSelector(GetDevice, null);

  }
}

private static void GetDevice(IAsyncResult result)
{
  device = Guide.EndShowStorageDeviceSelector(result);
  if (device != null && device.IsConnected)
  {
    if (LoadSettings) DoLoadSettings(); else DoSaveSettings();
  }
}
```

How this works is like this, whenever we want to save or load a file, we need to ensure we have the latest storage device available (always remember they can be unplugged while the game is playing, especially memory cards).

So be fore we start loading we call the "SelectStorage" function, which calls up the guide to the screen, but only if there is more than one storage device available, which is good so we don't pester the player unless there is a choice to be made.

Next is where the iAsyncResult comes in, when we call the guide there is a period of time between it displaying and the player making a choice, now you can either keep checking if the guide had been closed or simply let the guide tell you, I've opted for the second approach as it's much cleaner. So when the guide is closed, it calls the "GetDevice" function (not that it is mentioned in the BeginShowStorageDeviceSelector call) and passes the result of the users action as a IAsyncResult. we can then query this to get the storage device and then continue loading or saving.

Finally, we need our actual save and load functions, those that are public and exposed to our game:

```csharp
public static void LoadKeyMappings()
{
  LoadSettings = true;
  if (device == null) SelectStorage(); else DoLoadSettings();
}
public static void SaveKeyMappings()
{
  LoadSettings = false;
  Input.SettingsSaved = true;
  if (device == null) SelectStorage(); else DoSaveSettings();

}
```

Here we set the "LoadSettings" flag to the correct state for loading or saving, we then check to see if we already have a storage device, if not select a new one or just try and load the settings.

If we are saving we also update our configuration to state is has been saved, this is used later in the game so that we can load the defaults if no save was found.

---

## Updating the Game to use the saved / loaded configuration

So with our framework in place we just need to update our game when it starts to load the configuration if possible, so add the following to the LoadResources section of the startroopergame class:

```csharp
//Try and load any saved key mappings
FileManager.LoadKeyMappings();
```

Then we also need to check that our load was successful, if not then load the defaults:

```csharp
//If no settings present or setting were unable to be loaded, use the defaults
if (!Input.InputMappings.SettingsSaved) Input.Load_Defaults();
```

And were done. Well almost, we currently have no way of actually saving the settings, so we will quickly add one extra game control, for saving. We will implement this better later when we add menus.

---

## Adding another setting

In order to add a new setting, we simply need to add a new item to the configuration, create a new game control that checks it and then get our game to check for it and act accordingly. We'll also need a very basic way for the game to change the setting in our configuration and to save it.

So add the following controls into the Keymapping struct, for the "Change Fire mode" (to change which button we use to fire) and the Save Settings key, for both keyboard and the gamepad:

```csharp
public Keys ChangeTrooperFireButton;
public Keys SaveSettings;

public Buttons AltChangeTrooperFireButton;
public Buttons AltSaveSettings;
```

In the Input class add the following new control functions after the TrooperFired function:

```csharp
public static bool ChangeTrooperFireButton()
{
  return IsKeyTriggered(m_InputMappings.ChangeTrooperFireButton) || IsButtonTriggered(m_InputMappings.AltChangeTrooperFireButton);
}

public static bool SaveSettingsKey()
{
  return IsKeyTriggered(m_InputMappings.SaveSettings) || IsButtonTriggered(m_InputMappings.AltSaveSettings);
}
```

Add some defaults for these settings (else we wont actually have a key to press) in the Load Defaults function:

```csharp
m_InputMappings.ChangeTrooperFireButton = Keys.F;
m_InputMappings.SaveSettings = Keys.S;

m_InputMappings.AltChangeTrooperFireButton = Buttons.DPadDown;
m_InputMappings.AltSaveSettings = Buttons.LeftShoulder;
```

In order to change a setting for now, we need to expose the configuration to be changed, that being the Fire and AltFire settings, we do this by adding two new properties to the input function for now:

```csharp
public static Keys FireButton { set { m_InputMappings.Fire = value; } }
public static Buttons AltFireButton { set { m_InputMappings.AltFire = value; } }
```

And finally in the StarTrooperGame class, in the update function, add two test and action elements, to check if the player has pressed one of the keys and then perform the correct action.

```csharp
//test to change the button \ key used for firing trooper fireballs
if (Input.ChangeTrooperFireButton())
{
  Input.FireButton = Keys.LeftShift;
  Input.AltFireButton = Buttons.RightTrigger;
}

//Save settings
if (Input.SaveSettingsKey())
  FileManager.SaveKeyMappings();
```

If we now hit the F key or down on the gamepad Dpad, instead of firing as before, it will now use the new keys. but unless you hit the save key, next time you run the game it will go back to the original key. Hitting save will cause the configuration to be written to the configuration file and this will be loaded automatically when you next start the game (however, unless you coded it a bit better you cannot change it back without changing the code or deleting the save file).

We'll remove these work arounds after the DigiPen tutorial when we add a menu system and a configuration screen, where we can graphically change the configuration and save it.

---

## Conclusion

We almost a conclusion, this post ended up being larger than I anticipated, so the next intermission will follow on from this, main reason being that for the moment we have digital controls only, but the gamepad had 4 analogue controls, which provide a gradient to the players input, that being, if you hold the trigger half way down you get 50% back from the controller, where for the moment you have to pull the trigger all the way back to get a response. Same with the sticks we use to move the trooper.

So in the next section we will cover what is required for analogue controls.

Whew, time to go back.
