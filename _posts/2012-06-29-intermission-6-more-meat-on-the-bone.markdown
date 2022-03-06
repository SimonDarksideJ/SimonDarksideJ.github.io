---
layout: post
title: 'Intermission #6 - More meat on the bone'
date: '2012-06-29 10:47:16'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

 

Technorati Tags: [xna](http://technorati.com/tags/xna)

When I started doing this section, it was meant to be quick and short as an intermission is supposed to be.  The theory behind dynamic controls itself is quite simple and it is implementation fairly easy, unless you are like me and want to go that little bit further and add some flair.

 

So this little intermission has grown a fair bit.  So read on.

The code for this section will be posted after the next post.

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

 

### Theory behind dynamic controls

like the last post, we have a set of objectives, the control system for our game and we have our available controllers.  Unlike the windows phone the options are various:

> ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Gamepads – 4 push buttons, 4 way multi-directional D pad, 2 analogue sticks with buttons, 2 analogue triggers, a back and a start button. (whew)   
> ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Keyboards and keypads – lots and lots of keys   
> ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Mice – analogue pointer, a host of buttons (depending on model) and usually a scroll wheel (never mind 3D mice, but they aren’t supported yet)   
> ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Joysticks – Do not get me started there!

With so many options we have a little bit more to think about.

So when implementing our game control scheme we need a way to handle all these different inputs (unless you are only targeting a single platform) without overloading our actual game code.  To do this we need to abstract our functionality a bit, this is what we are trying to aim for:

![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_26BE8327.png)

The diagram above details a level of abstraction we apply between our game controls and the available inputs we have for each platform.

> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Game Controls
> 
> The detail what actions are available to the user, like Move Avatar Up, Select Menu Option, Fire, Change weapon
> 
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Input Manager
> 
> Details what input controls are to be examined for each game control, so in order for the player to Fire, the input manager checks if the spacebar has been pressed or button A on the gamepad or the left mouse button.  The actual buttons themselves are not mentioned here, they are checked in the control mappings for which actual button to use.
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
> This sounds a lot more complicated than it actually is, but gives you a feel of what is required.  The big benefit of this if that if you want to change the control scheme (what buttons to use), you do not need to rewrite all your game code or even the input manager, just update the key to be used in the mappings.
> 
> ![](http://www.dotnetscraps.com/samples/bullets/022.gif)    Control Mappings
> 
> This part is much simpler, it stores the current setting for each input control, like:
> 
> - Keyboard Fire = Spacebar
> - Gamepad fire = button A
> - Mouse fire = let mouse button

 

* * *

 

### Putting it together

We need to start from the ground up, so first off we need our mappings (which buttons do what). 

#### 1. Key Mappings Struct for configuration

So create a new class called “KeyMappings.cs” in the engine folder (Right click the engine folder in the solution explorer and select “New Class”) and add the following:

    
    
         1: using System;
    
    
    
         2: using System.Collections.Generic;
    
    
    
         3: using System.Linq;
    
    
    
         4: using System.Text;
    
    
    
         5: using Microsoft.Xna.Framework.Input;
    
    
    
         6: 
    
    
    
         7: namespace TestProject
    
    
    
         8: {
    
    
    
         9: [Serializable]
    
    
    
         10: public struct InputMappings
    
    
    
         11: {
    
    
    
         12: public bool SettingsSaved;
    
    
    
         13: 
    
    
    
         14: public Keys MoveUp;
    
    
    
         15: public Keys MoveDown;
    
    
    
         16: public Keys MoveLeft;
    
    
    
         17: public Keys MoveRight;
    
    
    
         18: public Keys Fire;
    
    
    
         19: 
    
    
    
         20: public Buttons AltMoveUp;
    
    
    
         21: public Buttons AltMoveDown;
    
    
    
         22: public Buttons AltMoveLeft;
    
    
    
         23: public Buttons AltMoveRight;
    
    
    
         24: 
    
    
    
         25: }
    
    
    
    A couple things to note before we go through this, ensure you update the namespace to the above, by default, when the new class is generated it also adds the folder name into the namespace, just something to be aware of.  Second, we have added a using statement for the Microsoft.XNA.framework.Input class, we need this to identify things like Keys and Buttons.
    
    
    
    So here we can see a simple struct that contains key definitions for all our controls and also button mappings for the same (Keys for keyboard and Buttons for Gamepad).
    
    
    
    The main thing of note here is the content tag above the struct definition [Serializable], this identifies that the struct can be formed into XML using serialisation when we want to save our configuration, more on this later.
    
    
    #### 2. Input Manager key/button recognisers
    
    
    In the original DigiPen lesson 6, we had some very basic key recognisers, this was very basic and required you to put the actual keys in your game code.  This checked if a specified key was pressed or triggered.
    
    
    
    We need to extend this now and add recognisers for the gamepad buttons
    
    
    
    First we add the state attributes to the top of the Input.CS class:
    
    
    
        
        
             1: //Mouse States
        
        
        
             2: static MouseState m\_MouseState = Mouse.GetState();
        
        
        
             3: static MouseState m\_OldMouseState;
        
        
        
             4: 
        
        
        
             5: //Gamepad states
        
        
        
             6: static GamePadState m\_GamepadState = GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One);
        
        
        
             7: static GamePadState m\_OldGamepadState;
        
        
        
        Then ensure they are updated in the update loop:
        
        
        
            
            
                 1: //Mouse Update
            
            
            
                 2: m\_OldMouseState = m\_MouseState;
            
            
            
                 3: m\_MouseState = Mouse.GetState();
            
            
            
                 4: 
            
            
            
                 5: //Gamepad Update
            
            
            
                 6: m\_OldGamepadState = m\_GamepadState;
            
            
            
                 7: m\_GamepadState = GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One);
            
            
            
            And finally add the recognisers in to the main body of the code:
            
            
            
                
                
                     1: private static bool IsButtonPressed(Buttons button)
                
                
                
                     2: {
                
                
                
                     3: return m\_GamepadState.IsButtonDown(button) && m\_OldGamepadState.IsButtonDown(button);
                
                
                
                     4: }
                
                
                
                     5: 
                
                
                
                     6: private static bool IsButtonTriggered(Buttons button)
                
                
                
                     7: {
                
                
                
                     8: return m\_GamepadState.IsButtonDown(button) && m\_OldGamepadState.IsButtonUp(button);
                
                
                
                     9: }
                
                
                
                Note that I’ve now changed the above functions to Private, we do this in order to control access to the input states, it is also good practice to limit the visibility of functions in a class to only those you actually want to expose.  Before the next step, you should also change the scope of the existing Key recognisers to Private as well.
                
                
                #### 3. Input Manager Player control –\> key / button abstraction
                
                
                If you followed Intermission #5 Windows Phone 7 intermission, we created our player control actions and moved the key definitions into the input class, this enabled the game to just ask if the action had happened (the press of a key) without specifying the actual key.
                
                
                
                We just need to add this to our windows project and extend it to handle the additional inputs.
                
                
                
                First we add a reference to the struct we created earlier for holding our input configuration in the header of our input class:
                
                
                
                    
                    
                         1: static InputMappings m\_InputMappings = new InputMappings();
                    
                    
                    
                    Then add the following functions:
                    
                    
                    
                        
                        
                             1: #region Public Controls
                        
                        
                        
                             2: 
                        
                        
                        
                             3: public static bool MoveUp()
                        
                        
                        
                             4: {
                        
                        
                        
                             5: return IsKeyPressed(m\_InputMappings.MoveUp) || IsButtonPressed(m\_InputMappings.AltMoveUp);
                        
                        
                        
                             6: }
                        
                        
                        
                             7: 
                        
                        
                        
                             8: public static bool MoveDown()
                        
                        
                        
                             9: {
                        
                        
                        
                             10: return IsKeyPressed(m\_InputMappings.MoveDown) || IsButtonPressed(m\_InputMappings.AltMoveDown);
                        
                        
                        
                             11: }
                        
                        
                        
                             12: 
                        
                        
                        
                             13: public static bool MoveLeft()
                        
                        
                        
                             14: {
                        
                        
                        
                             15: return IsKeyPressed(m\_InputMappings.MoveLeft) || IsButtonPressed(m\_InputMappings.AltMoveLeft);
                        
                        
                        
                             16: }
                        
                        
                        
                             17: 
                        
                        
                        
                             18: public static bool MoveRight()
                        
                        
                        
                             19: {
                        
                        
                        
                             20: return IsKeyPressed(m\_InputMappings.MoveRight) || IsButtonPressed(m\_InputMappings.AltMoveRight);
                        
                        
                        
                             21: }
                        
                        
                        
                             22: 
                        
                        
                        
                             23: public static bool TrooperFired()
                        
                        
                        
                             24: {
                        
                        
                        
                             25: return IsKeyTriggered(m\_InputMappings.Fire) || IsButtonTriggered(m\_InputMappings.AltFire);
                        
                        
                        
                             26: }
                        
                        
                        
                             27: 
                        
                        
                        
                             28: #endregion
                        
                        
                        
                        Here for every action we want the player to make, we check both the keyboard and gamepad (more on the mouse later) settings in our configuration.
                        
                        
                        
                        Lastly, at this point we have the setup read but we are missing one little crucial factor, some actual configuration.  So since the first time we run the game we have no settings, we need some defaults, then the player can change them later if need be (which we will cover in a later post).
                        
                        
                        
                        So add the extra Load Defaults function like so:
                        
                        
                        
                            
                            
                                 1: public static void Load\_Defaults()
                            
                            
                            
                                 2: {
                            
                            
                            
                                 3: //Single Player settings
                            
                            
                            
                                 4: m\_InputMappings.MoveUp = Keys.Up;
                            
                            
                            
                                 5: m\_InputMappings.MoveDown = Keys.Down;
                            
                            
                            
                                 6: m\_InputMappings.MoveLeft = Keys.Left;
                            
                            
                            
                                 7: m\_InputMappings.MoveRight = Keys.Right;
                            
                            
                            
                                 8: m\_InputMappings.Fire = Keys.Space;
                            
                            
                            
                                 9: 
                            
                            
                            
                                 10: m\_InputMappings.AltMoveUp = Buttons.LeftThumbstickUp;
                            
                            
                            
                                 11: m\_InputMappings.AltMoveDown = Buttons.LeftThumbstickDown;
                            
                            
                            
                                 12: m\_InputMappings.AltMoveLeft = Buttons.LeftThumbstickLeft;
                            
                            
                            
                                 13: m\_InputMappings.AltMoveRight = Buttons.LeftThumbstickRight;
                            
                            
                            
                                 14: m\_InputMappings.AltFire = Buttons.A;
                            
                            
                            
                                 15: 
                            
                            
                            
                                 16: }
                            
                            
                            
                            Now that our structure is in place, we need to update the game code to make use of it.
                            
                            
                            
                             
                            
                            
                            * * *
                            
                            
                             
                            
                            
                            ### Updating the player input
                            
                            
                            So with our new control system in place we need to update our game controls to make use of them, this in itself is quite simple using what we have defined so far.
                            
                            
                            
                            So in the StarTrooperSprites.cs class, update the update section with this:
                            
                            
                            
                                
                                
                                     1: public override void Update()
                                
                                
                                
                                     2: {
                                
                                
                                
                                     3: Vector2 vel = Vector2.Zero;
                                
                                
                                
                                     4: 
                                
                                
                                
                                     5: if (Position.Y \> 50 && Input.MoveUp())
                                
                                
                                
                                     6: vel.Y = -2; // if trooper is under y=50 then go upward
                                
                                
                                
                                     7: if (Position.Y \< StarTrooperGame.BackBufferHeight - 30 && Input.MoveDown())
                                
                                
                                
                                     8: vel.Y = 2; // if trooper is over y=450 then go upward
                                
                                
                                
                                     9: if (Position.X \> 30 && Input.MoveLeft())
                                
                                
                                
                                     10: {
                                
                                
                                
                                     11: vel.X = -2; // go to the left
                                
                                
                                
                                     12: SpriteEffect = SpriteEffects.FlipHorizontally; // left flip trooper
                                
                                
                                
                                     13: }
                                
                                
                                
                                     14: if (Position.X \< StarTrooperGame.BackBufferWidth - 70 && Input.MoveRight())
                                
                                
                                
                                     15: {
                                
                                
                                
                                     16: vel.X = 2; // go to the right
                                
                                
                                
                                     17: SpriteEffect = SpriteEffects.None; // right flip trooper
                                
                                
                                
                                     18: }
                                
                                
                                
                                     19: if (vel != Vector2.Zero) vel.Normalize();
                                
                                
                                
                                     20: Velocity = vel \* Speed; // set new velocity for Trooper
                                
                                
                                
                                     21: 
                                
                                
                                
                                     22: // if space bar is triggered
                                
                                
                                
                                     23: if (Input.TrooperFired())
                                
                                
                                
                                     24: TrooperFire();
                                
                                
                                
                                     25: }
                                
                                
                                
                                Where we have simply replaced any references using:
                                
                                
                                
                                    
                                    
                                         1: Input.IsPressed(Keys.Up)
                                    
                                    
                                    
                                    With the relevant player control function:
                                    
                                    
                                    
                                        
                                        
                                             1: Input.MoveUp()
                                        
                                        
                                        
                                        So now anytime we need to change the key to use for a control, we do not need to recompile our code (unless you want to change the defaults)
                                        
                                        
                                        
                                         
                                        
                                        
                                        * * *
                                        
                                        
                                         
                                        
                                        
                                        ### Saving and Loading the configuration
                                        
                                        
                                        So with our new structure in place life is much simpler, but unless we save those changes and load them again next time the player wants to run the game, either the player has to live with the defaults or change them each time the game starts, ouch.
                                        
                                        
                                        
                                        Saving and loading configuration it is.  Again the theory behind this is quite simple, although it does have it is ways.
                                        
                                        
                                        
                                        In order to save our settings, we need a few things:
                                        
                                        
                                        
                                        > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Storage Device – This is the drive or memory card where the settings are going to be saved.   
                                        > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Storage Container – This is the folder structure on the storage device where we save a specific games files.   
                                        > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Save file – An XML or binary file that holds the configuration
                                        
                                        
                                        #### 1. Storage Device
                                        
                                        
                                        The storage device is controlled and maintained by the XBOX live gamer services, this is a component that provides access to the XBOX live prompts like which storage device can be used, if you are logged on to XBOX live and some general service like prompts (have a play with the Guide settings once it is setup to see what it offers, or look it up in the help).
                                        
                                        
                                        
                                        So first we need to add the GamerServices to our game, open up the StarTrooperGame.CS file and add the following to the constructor for the class:
                                        
                                        
                                        
                                            
                                            
                                                 1: //Add the gamer services so that we can use the guide and access the storage
                                            
                                            
                                            
                                                 2: this.Components.Add(new GamerServicesComponent(this));
                                            
                                            
                                            
                                            This adds the Gamer Service Component to your games Components collection.  The XNA Game components collection, is a part of the XNA game framework and a bit outside the scope of this tutorial for now.  I used to use them a lot in the beginning but I (like a lot of people) seem to favour doing it ourselves, it is not that it is bad (it is actually quite powerful when used right), it is just that there is a certain way of writing game features to make use of the component system and developers usually want more control than it offers.  Look them up in the XNA help by searching “XNA Components”.
                                            
                                            
                                            
                                            When we want to get the current storage device for our game we use the following function:
                                            
                                            
                                            
                                                
                                                
                                                     1: Guide.BeginShowStorageDeviceSelector
                                                
                                                
                                                
                                                There is a bit more to it than that but we will go over that in a bit.
                                                
                                                
                                                #### 2. Storage Container
                                                
                                                
                                                Storage containers are easier, they are just the area on the device for your game, they are supposed to be unique so that you do not use another games files, they can also be player specific so you can hold settings for as many players can play the game.  They are simply created by calling:
                                                
                                                
                                                
                                                    
                                                    
                                                         1: StorageContainer container = device.OpenContainer("StarTrooper2DXNA");
                                                    
                                                    
                                                    
                                                    The above just creates a new folder in your players save area for the game using the title given.
                                                    
                                                    
                                                    #### 3. Save file
                                                    
                                                    
                                                    Now two things are needed to create the save file itself, first a serialized version of your configuration and a FileStream to save the file itself.
                                                    
                                                    
                                                    
                                                    The Filestream is just the way that the XNA framework uses to output data in memory onto the disk and as the name suggests, it does this by streaming the data on to the disk.  When ever we work with files on the storage device we simply:
                                                    
                                                    
                                                    
                                                    > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Open the file, with options to create it if not already there (Warning, careful when using the option that always creates the file, even if present or you will sped a crazy few minutes trying to wonder why your settings are gone next time you load!!)   
                                                    > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Stream the files contents in to memory   
                                                    > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Do Stuff   
                                                    > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Stream the changes back to the file   
                                                    > ![](http://www.dotnetscraps.com/samples/bullets/033.gif)    Close file / stream
                                                    
                                                    
                                                    
                                                    In code, it looks like this:
                                                    
                                                    
                                                    
                                                        
                                                        
                                                             1: 
                                                        
                                                        
                                                        
                                                             2: // Get the path of the save game.
                                                        
                                                        
                                                        
                                                             3: string filename = Path.Combine(container.Path, "StarTrooperControls.sav");
                                                        
                                                        
                                                        
                                                             4: 
                                                        
                                                        
                                                        
                                                             5: // Open the file, creating it if necessary.
                                                        
                                                        
                                                        
                                                             6: FileStream stream = File.Open(filename, FileMode.OpenOrCreate);
                                                        
                                                        
                                                        
                                                             7: 
                                                        
                                                        
                                                        
                                                             8: //do stuff
                                                        
                                                        
                                                        
                                                             9: 
                                                        
                                                        
                                                        
                                                             10: // Close the file.
                                                        
                                                        
                                                        
                                                             11: stream.Close();
                                                        
                                                        
                                                        
                                                        This gives us a nice save point for our settings or what ever you want to save e.g. highscores, achievements (as we do not have XBOX live achievements in XNA), but we still need to put something in it.
                                                        
                                                        
                                                        
                                                        > ![](http://www.dotnetscraps.com/samples/bullets/034.gif)    Note: If you look in the XNA help for the samples above you will find them very similar (as that is where they came from), however, be warned the samples set the “FileMode” when creating a file to just “Create”, this will create a new file EVERY time you run it, overwriting what was there.  Be very careful about which mode you need to use for your saves!.  “OpenOrCreate” is usually a bit safer (unless you only want read access) which will only create new if it does not exist and if it does, then open it.
                                                        
                                                        
                                                        #### 4. Serialisation of configuration
                                                        
                                                        
                                                        Finally we need to turn our configuration in memory into something we can save, that can be XML or a binary file or whatever format you wish (within reason).  When I first started out I made the mistake of writing my own serialiser, I have since learned the errors of my ways.  Serialisation is much easier and can do most of what you need.
                                                        
                                                        
                                                        
                                                        One thing I will point out, if you are going to load levels in this fashion, a better answer would be to do it using the XNA Content pipeline (Content Manager), where it has more advanced serialisation techniques through the IntermediateSerializer.  Read [Shawn Hargreaves article](http://blogs.msdn.com/b/shawnhar/archive/2008/07/28/intermediateserializer-vs-xmlserializer) for more information on that.  The XMLSerializer though is the only one to work at runtime and allows saving!.
                                                        
                                                        
                                                        
                                                        So what do we need, well very simply we already have what we need in the first section of this post, our Serialisable struct (remember the Serializable tag), where we set up our struct with strong types (using base types) and added the [Serializable] tag to the struct.  This enables the XMLSerializer to recognise the struct when reading the class.
                                                        
                                                        
                                                        
                                                        To serialise a class, we simply create a new XMLSerializer with the class type and then tell it to serialise the class to the Filestream we created, like so:
                                                        
                                                        
                                                        
                                                            
                                                            
                                                                 1: // Convert the object to XML data and put it in the stream.
                                                            
                                                            
                                                            
                                                                 2: XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
                                                            
                                                            
                                                            
                                                                 3: serializer.Serialize(stream, Input.InputMappings);
                                                            
                                                            
                                                            
                                                            Deserialisation is the method for how we reverse this process, serialisation takes a class and turns it into XML (or your preferred format), deserialisation takes an XML fie and creates a new instance of the class it was constructed for.
                                                            
                                                            
                                                            
                                                             
                                                            
                                                            
                                                            * * *
                                                            
                                                            
                                                             
                                                            
                                                            
                                                            ### Putting it together
                                                            
                                                            
                                                            So with all that out of the way, let’s actually implement it into the game framework, start off by creating a new class in the Engine folder called “FileManager”.
                                                            
                                                            
                                                            
                                                            Add the following attributes to the start of the class (remember to change the namespace as before!!):
                                                            
                                                            
                                                            
                                                                
                                                                
                                                                     1: private static StorageContainer container;
                                                                
                                                                
                                                                
                                                                     2: private static StorageDevice device;
                                                                
                                                                
                                                                
                                                                     3: private static IAsyncResult result;
                                                                
                                                                
                                                                
                                                                     4: private static bool LoadSettings = true;
                                                                
                                                                
                                                                
                                                                This gives the storage container and storagedevice for the game, it also has a setting to signify if we are loading or saving.  More on the iAsyncResult later.
                                                                
                                                                
                                                                
                                                                Next, we add the file management parts, to make the code cleaner I have broken up the code so that it can be reused more easily, so here are the Open File and Close file functions:
                                                                
                                                                
                                                                
                                                                    
                                                                    
                                                                         1: private static FileStream OpenStorageSettings()
                                                                    
                                                                    
                                                                    
                                                                         2: {
                                                                    
                                                                    
                                                                    
                                                                         3: 
                                                                    
                                                                    
                                                                    
                                                                         4: // Open a storage container.
                                                                    
                                                                    
                                                                    
                                                                         5: container = device.OpenContainer("StarTrooper2DXNA");
                                                                    
                                                                    
                                                                    
                                                                         6: 
                                                                    
                                                                    
                                                                    
                                                                         7: // Get the path of the save game.
                                                                    
                                                                    
                                                                    
                                                                         8: string filename = Path.Combine(container.Path, "StarTrooperControls.sav");
                                                                    
                                                                    
                                                                    
                                                                         9: 
                                                                    
                                                                    
                                                                    
                                                                         10: // Open the file, creating it if necessary.
                                                                    
                                                                    
                                                                    
                                                                         11: FileStream stream = File.Open(filename, FileMode.OpenOrCreate);
                                                                    
                                                                    
                                                                    
                                                                         12: 
                                                                    
                                                                    
                                                                    
                                                                         13: return stream;
                                                                    
                                                                    
                                                                    
                                                                         14: }
                                                                    
                                                                    
                                                                    
                                                                         15: 
                                                                    
                                                                    
                                                                    
                                                                         16: private static void CloseStorage(FileStream stream)
                                                                    
                                                                    
                                                                    
                                                                         17: {
                                                                    
                                                                    
                                                                    
                                                                         18: // Close the file.
                                                                    
                                                                    
                                                                    
                                                                         19: stream.Close();
                                                                    
                                                                    
                                                                    
                                                                         20: 
                                                                    
                                                                    
                                                                    
                                                                         21: // Dispose the container, to commit changes.
                                                                    
                                                                    
                                                                    
                                                                         22: container.Dispose();
                                                                    
                                                                    
                                                                    
                                                                         23: 
                                                                    
                                                                    
                                                                    
                                                                         24: }
                                                                    
                                                                    
                                                                    
                                                                    And then we add the main functions for saving and loading:
                                                                    
                                                                    
                                                                    
                                                                        
                                                                        
                                                                             1: private static void DoSaveSettings()
                                                                        
                                                                        
                                                                        
                                                                             2: {
                                                                        
                                                                        
                                                                        
                                                                             3: try
                                                                        
                                                                        
                                                                        
                                                                             4: {
                                                                        
                                                                        
                                                                        
                                                                             5: // Create the data to save.
                                                                        
                                                                        
                                                                        
                                                                             6: FileStream stream = OpenStorageSettings();
                                                                        
                                                                        
                                                                        
                                                                             7: // Convert the object to XML data and put it in the stream.
                                                                        
                                                                        
                                                                        
                                                                             8: XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
                                                                        
                                                                        
                                                                        
                                                                             9: serializer.Serialize(stream, Input.InputMappings);
                                                                        
                                                                        
                                                                        
                                                                             10: 
                                                                        
                                                                        
                                                                        
                                                                             11: CloseStorage(stream);
                                                                        
                                                                        
                                                                        
                                                                             12: }
                                                                        
                                                                        
                                                                        
                                                                             13: catch { }
                                                                        
                                                                        
                                                                        
                                                                             14: }
                                                                        
                                                                        
                                                                        
                                                                             15: 
                                                                        
                                                                        
                                                                        
                                                                             16: private static void DoLoadSettings()
                                                                        
                                                                        
                                                                        
                                                                             17: {
                                                                        
                                                                        
                                                                        
                                                                             18: try
                                                                        
                                                                        
                                                                        
                                                                             19: {
                                                                        
                                                                        
                                                                        
                                                                             20: FileStream stream = OpenStorageSettings();
                                                                        
                                                                        
                                                                        
                                                                             21: // Convert the object to XML data and put it in the stream.
                                                                        
                                                                        
                                                                        
                                                                             22: if (stream.Length \> 0)
                                                                        
                                                                        
                                                                        
                                                                             23: {
                                                                        
                                                                        
                                                                        
                                                                             24: XmlSerializer serializer = new XmlSerializer(typeof(InputMappings));
                                                                        
                                                                        
                                                                        
                                                                             25: Input.InputMappings = (InputMappings)serializer.Deserialize(stream);
                                                                        
                                                                        
                                                                        
                                                                             26: }
                                                                        
                                                                        
                                                                        
                                                                             27: CloseStorage(stream);
                                                                        
                                                                        
                                                                        
                                                                             28: }
                                                                        
                                                                        
                                                                        
                                                                             29: catch{}
                                                                        
                                                                        
                                                                        
                                                                             30: }
                                                                        
                                                                        
                                                                        
                                                                         
                                                                        
                                                                        
                                                                        
                                                                        You will notice in the above, that the save and load functions have a Try / Catch block around the code, this is so that any errors that happen while saving are handled correctly and does not cause the game to crash.
                                                                        
                                                                        
                                                                        
                                                                        Next we need to select a storage device to save to through the guide:
                                                                        
                                                                        
                                                                        
                                                                            
                                                                            
                                                                                 1: private static void SelectStorage()
                                                                            
                                                                            
                                                                            
                                                                                 2: {
                                                                            
                                                                            
                                                                            
                                                                                 3: // Set the request flag
                                                                            
                                                                            
                                                                            
                                                                                 4: if (!Guide.IsVisible)
                                                                            
                                                                            
                                                                            
                                                                                 5: {
                                                                            
                                                                            
                                                                            
                                                                                 6: device = null;
                                                                            
                                                                            
                                                                            
                                                                                 7: result = Guide.BeginShowStorageDeviceSelector(GetDevice, null);
                                                                            
                                                                            
                                                                            
                                                                                 8: 
                                                                            
                                                                            
                                                                            
                                                                                 9: }
                                                                            
                                                                            
                                                                            
                                                                                 10: }
                                                                            
                                                                            
                                                                            
                                                                                 11: 
                                                                            
                                                                            
                                                                            
                                                                                 12: private static void GetDevice(IAsyncResult result)
                                                                            
                                                                            
                                                                            
                                                                                 13: {
                                                                            
                                                                            
                                                                            
                                                                                 14: device = Guide.EndShowStorageDeviceSelector(result);
                                                                            
                                                                            
                                                                            
                                                                                 15: if (device != null && device.IsConnected)
                                                                            
                                                                            
                                                                            
                                                                                 16: {
                                                                            
                                                                            
                                                                            
                                                                                 17: if (LoadSettings) DoLoadSettings(); else DoSaveSettings();
                                                                            
                                                                            
                                                                            
                                                                                 18: }
                                                                            
                                                                            
                                                                            
                                                                                 19: }
                                                                            
                                                                            
                                                                            
                                                                             
                                                                            
                                                                            
                                                                            
                                                                            How this works is like this, whenever we want to save or load a file, we need to ensure we have the latest storage device available (always remember they can be unplugged while the game is playing, especially memory cards).
                                                                            
                                                                            
                                                                            
                                                                            So be fore we start loading we call the “SelectStorage” function, which calls up the guide to the screen, but only if there is more than one storage device available, which is good so we do not pester the player unless there is a choice to be made. 
                                                                            
                                                                            
                                                                            
                                                                            Next is where the iAsyncResult comes in, when we call the guide there is a period of time between it displaying and the player making a choice, now you can either keep checking if the guide had been closed or simply let the guide tell you, I’ve opted for the second approach as it is much cleaner.  So when the guide is closed, it calls the “GetDevice” function (not that it is mentioned in the BeginShowStorageDeviceSelector call) and passes the result of the users action as a IAsyncResult.  we can then query this to get the storage device and then continue loading or saving.
                                                                            
                                                                            
                                                                            
                                                                            Finally, we need our actual save and load functions, those that are public and exposed to our game:
                                                                            
                                                                            
                                                                            
                                                                                
                                                                                
                                                                                     1: public static void LoadKeyMappings()
                                                                                
                                                                                
                                                                                
                                                                                     2: {
                                                                                
                                                                                
                                                                                
                                                                                     3: LoadSettings = true;
                                                                                
                                                                                
                                                                                
                                                                                     4: if (device == null) SelectStorage(); else DoLoadSettings(); 
                                                                                
                                                                                
                                                                                
                                                                                     5: }
                                                                                
                                                                                
                                                                                
                                                                                     6: public static void SaveKeyMappings()
                                                                                
                                                                                
                                                                                
                                                                                     7: {
                                                                                
                                                                                
                                                                                
                                                                                     8: LoadSettings = false;
                                                                                
                                                                                
                                                                                
                                                                                     9: Input.SettingsSaved = true;
                                                                                
                                                                                
                                                                                
                                                                                     10: if (device == null) SelectStorage(); else DoSaveSettings();
                                                                                
                                                                                
                                                                                
                                                                                     11: 
                                                                                
                                                                                
                                                                                
                                                                                     12: }
                                                                                
                                                                                
                                                                                
                                                                                Here we set the “LoadSettings” flag to the correct state for loading or saving, we then check to see if we already have a storage device, if not select a new one or just try and load the settings.
                                                                                
                                                                                
                                                                                
                                                                                If we are saving we also update our configuration to state is has been saved, this is used later in the game so that we can load the defaults if no save was found.
                                                                                
                                                                                
                                                                                
                                                                                 
                                                                                
                                                                                
                                                                                * * *
                                                                                
                                                                                
                                                                                 
                                                                                
                                                                                
                                                                                ### Updating the Game to use the saved / loaded configuration
                                                                                
                                                                                
                                                                                So with our framework in place we just need to update our game when it starts to load the configuration if possible, so add the following to the LoadResources section of the startroopergame class:
                                                                                
                                                                                
                                                                                
                                                                                    
                                                                                    
                                                                                         1: //Try and load any saved key mappings
                                                                                    
                                                                                    
                                                                                    
                                                                                         2: FileManager.LoadKeyMappings();
                                                                                    
                                                                                    
                                                                                    
                                                                                         3: 
                                                                                    
                                                                                    
                                                                                    
                                                                                    Then we also need to check that our load was successful, if not then load the defaults:
                                                                                    
                                                                                    
                                                                                    
                                                                                        
                                                                                        
                                                                                             1: //If no settings present or setting were unable to be loaded, use the defaults
                                                                                        
                                                                                        
                                                                                        
                                                                                             2: if (!Input.InputMappings.SettingsSaved) Input.Load\_Defaults();
                                                                                        
                                                                                        
                                                                                        
                                                                                        And were done.   Well almost, we currently have no way of actually saving the settings, so we will quickly add one extra game control, for saving.  We will implement this better later when we add menus.
                                                                                        
                                                                                        
                                                                                        
                                                                                         
                                                                                        
                                                                                        
                                                                                        * * *
                                                                                        
                                                                                        
                                                                                         
                                                                                        
                                                                                        
                                                                                        ### Adding another setting
                                                                                        
                                                                                        
                                                                                        In order to add a new setting, we simply need to add a new item to the configuration, create a new game control that checks it and then get our game to check for it and act accordingly.  We will also need a very basic way for the game to change the setting in our configuration and to save it.
                                                                                        
                                                                                        
                                                                                        
                                                                                        So add the following controls into the Keymapping struct, for the “Change Fire mode” (to change which button we use to fire) and the Save Settings key, for both keyboard and the gamepad:
                                                                                        
                                                                                        
                                                                                        
                                                                                            
                                                                                            
                                                                                                 1: public Keys ChangeTrooperFireButton;
                                                                                            
                                                                                            
                                                                                            
                                                                                                 2: public Keys SaveSettings;
                                                                                            
                                                                                            
                                                                                            
                                                                                                 3: 
                                                                                            
                                                                                            
                                                                                            
                                                                                                 4: public Buttons AltChangeTrooperFireButton;
                                                                                            
                                                                                            
                                                                                            
                                                                                                 5: public Buttons AltSaveSettings;
                                                                                            
                                                                                            
                                                                                            
                                                                                            In the Input class add the following new control functions after the TrooperFired function:
                                                                                            
                                                                                            
                                                                                            
                                                                                                
                                                                                                
                                                                                                     1: public static bool ChangeTrooperFireButton()
                                                                                                
                                                                                                
                                                                                                
                                                                                                     2: {
                                                                                                
                                                                                                
                                                                                                
                                                                                                     3: return IsKeyTriggered(m\_InputMappings.ChangeTrooperFireButton) || IsButtonTriggered(m\_InputMappings.AltChangeTrooperFireButton);
                                                                                                
                                                                                                
                                                                                                
                                                                                                     4: }
                                                                                                
                                                                                                
                                                                                                
                                                                                                     5: 
                                                                                                
                                                                                                
                                                                                                
                                                                                                     6: public static bool SaveSettingsKey()
                                                                                                
                                                                                                
                                                                                                
                                                                                                     7: {
                                                                                                
                                                                                                
                                                                                                
                                                                                                     8: return IsKeyTriggered(m\_InputMappings.SaveSettings) || IsButtonTriggered(m\_InputMappings.AltSaveSettings);
                                                                                                
                                                                                                
                                                                                                
                                                                                                     9: }
                                                                                                
                                                                                                
                                                                                                
                                                                                                Add some defaults for these settings (else we wont actually have a key to press) in the Load Defaults function:
                                                                                                
                                                                                                
                                                                                                
                                                                                                    
                                                                                                    
                                                                                                         1: m\_InputMappings.ChangeTrooperFireButton = Keys.F;
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                         2: m\_InputMappings.SaveSettings = Keys.S;
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                         3: 
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                         4: m\_InputMappings.AltChangeTrooperFireButton = Buttons.DPadDown;
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                         5: m\_InputMappings.AltSaveSettings = Buttons.LeftShoulder;
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    In order to change a setting for now, we need to expose the configuration to be changed, that being the Fire and AltFire settings, we do this by adding two new properties to the input function for now:
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                        
                                                                                                        
                                                                                                             1: public static Keys FireButton { set { m\_InputMappings.Fire = value; } }
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                             2: public static Buttons AltFireButton { set { m\_InputMappings.AltFire = value; } }
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        And finally in the StarTrooperGame class, in the update function, add two test and action elements, to check if the player has pressed one of the keys and then perform the correct action.
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                            
                                                                                                            
                                                                                                                 1: //test to change the button \ key used for firing trooper fireballs
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 2: if (Input.ChangeTrooperFireButton())
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 3: {
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 4: Input.FireButton = Keys.LeftShift;
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 5: Input.AltFireButton = Buttons.RightTrigger;
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 6: }
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 7: 
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 8: //Save settings
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 9: if (Input.SaveSettingsKey())
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                                 10: FileManager.SaveKeyMappings();
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                            If we now hit the F key or down on the gamepad Dpad, instead of firing as before, it will now use the new keys.  but unless you hit the save key, next time you run the game it will go back to the original key.  Hitting save will cause the configuration to be written to the configuration file and this will be loaded automatically when you next start the game (however, unless you coded it a bit better you cannot change it back without changing the code or deleting the save file).
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                            We will remove these work arounds after the DigiPen tutorial when we add a menu system and a configuration screen, where we can graphically change the configuration and save it.
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                             
                                                                                                            
                                                                                                            
                                                                                                            * * *
                                                                                                            
                                                                                                            
                                                                                                             
                                                                                                            
                                                                                                            
                                                                                                            ### Conclusion
                                                                                                            
                                                                                                            
                                                                                                            We almost a conclusion, this post ended up being larger than I anticipated, so the next intermission will follow on from this, main reason being that for the moment we have digital controls only, but the gamepad had 4 analogue controls, which provide a gradient to the players input, that being, if you hold the trigger half way down you get 50% back from the controller, where for the moment you have to pull the trigger all the way back to get a response.  Same with the sticks we use to move the trooper.
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                            So in the next section we will cover what is required for analogue controls.
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                            Whew, time to go back.
                                                                                                            
                                                                                                        
                                                                                                        
                                                                                                    
                                                                                                    
                                                                                                
                                                                                                
                                                                                            
                                                                                            
                                                                                        
                                                                                        
                                                                                    
                                                                                    
                                                                                
                                                                                
                                                                            
                                                                            
                                                                        
                                                                        
                                                                    
                                                                    
                                                                
                                                                
                                                            
                                                            
                                                        
                                                        
                                                    
                                                    
                                                
                                                
                                            
                                            
                                        
                                        
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

