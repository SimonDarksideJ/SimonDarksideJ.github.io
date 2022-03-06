---
layout: post
title: 'Intermission #5 - Windows Phone controls'
date: '2012-06-29 10:46:15'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

In the first of a few intermissions to the tutorial series, we will add some control to our windows phone project.  With the current state of the development kit and the limited help in XNA 3.1 for the Zune, adding controls to a mobile device can be a bit of a black art as not all the same rules used in Windows and XBOX apply.

Now the last statement may seem obvious, but you have to consider what your control scheme is going to be, very carefully.  With the wrong control interface even the best of games will fail utterly as they become unusable.

Usability as well as playability is a crucial factor in any game (or any software for that matter), if the user / player cannot interpret what they need to do to play a game or finds the controls sticky or unwieldy, then they are either not going to buy your game or at worst start giving you negative press about it.

As an example, Dark Omen Games (the group that I work with) released a cracking title called **[“Nebulon”](http://marketplace.xbox.com/games/media/66acd000-77fe-1000-9115-d8025855025c)** on to the indie game scene last year.  Now when it was first released it had a new type of control system (similar to a control system used in the original [Asteroids](http://en.wikipedia.org/wiki/Asteroids_(video_game)) game), we all liked it and when you got used to it, it was very challenging.  However it was not well received, people found it too hard or just not like what they were used to in similar games (even a little bad press).

We quickly released an updated version taking in this feedback (adding a load of other suggested features at user request, by far one of the best things we did) and let people know of the update, without this change I do not think it would have been as successful as it was, even the reviewers retracted their original comments and praised the quick turn around and response to customer feedback.

A win in the end but it could have been so much worse.

Code as always for this section can be [found here](http://startrooper2dxna.codeplex.com/releases/46712/download/127157).

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

 

### Windows Phone 7 capabilities

The Windows Phone 7 controls we have available are:

> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    A touch screen (simple point and click interface)   
> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Accelerometers (twist and turn and wave it all about controls)   
> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    3 Buttons (Back, Search and Home)\*Note

> > ![](http://www.dotnetscraps.com/samples/bullets/034.gif)  The Home button is pretty much reserved according to the Microsoft guidance, for pausing the game and returning to the Phone Home screen.  The framework does not stop us using it, but you must be careful and not prevent a user from leaving the game (forcing the user to reset the Phone).  If Microsoft do not like it they will simply tell you to change it and refuse it is application to the Phone Marketplace.  This is no different to a failure one of the many technical tests done today for XBOX indie games, but more on that later in the tutorial series.

Does not sound like much, which is why we have to be so careful with our control scheme. 

The accelerometer is pretty simply and works pretty much the same as an XBOX control stick, allowing movement in any direction and reporting on the new angle or position, plus we can track this for how fast it has been moved (telling the difference between a tilt and a shake for example).

Again the 3 Buttons are also easy, just push or hold, simple enough, no different to a keyboard button.

The touch screen however has some interesting features and since it is a layout canvas (like a table or picture) we can differentiate which area of the screen the user has pressed.

First off the touch screen is a multi touch device, which in theory can track up to seven touch points.  In reality the framework is limited to 4 touch points at a time (just not enough screen space to get more than 4 fingers on it, in reality if you try using more than 2, work gets hard for the user / player to see anything)

The touch screen can also be viewed as a button as it can interpret when the user presses the screen and when the contact has been released like a button.  However it cal also tell when the user has moved their finger across the screen.

As for the canvas we can zone areas of the screen so that we can implement different behaviours depending on where you touch, for example:

 

![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_141AD2F0.png)

 

Here we can see a possible touch screen layout for an RPG game for example, using touched in the bottom are of the screen to bring up the menu (while displaying some information), the top area could be a scrollable area for player information.  The right hand side could be a weapon / spell selector, another scrollable list put when pressed selects the weapon or spell.  And finally the main view window that could move the player if held and attack when pressed (or do something else if pressed twice in succession).

A crafty person might do away with the right hand window all together and go for a gesture based system, where you would draw a symbol on the screen to activate a spell / weapon.

Most of these kind of features that the touch screen employs are no different to the modern sat nav machines of today, while the possibilities are not quite limitless, we can still have a lot of fun with it and it gives us more control than it might seem with only 3 control inputs for the phone.

 

* * *

 

### Controls for Star Trooper

Now the basic controls for Star Trooper are very simple, we have: (for now)

> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Up   
> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Down   
> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Left   
> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Right   
> ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Fire

 

With the controls available, the best choice would be to just use the touch screen, we will move the trooper to where we are touching the screen and fire a shot when ever the user taps the screen as well.

 

* * *

 

### Touch screen

Before we can start using the touch screen we need to specifically add it to our project.  Open the Input class (under the engine folder) and add the following line in the “Using” section at the top of our class:

    
    
         1: using Microsoft.Xna.Framework.Input.Touch;
    
    
    
    This tells our class that the touch framework is available to use.  Within the touch framework, we have several items, these are:
    
    
    
    > ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Touch Panel – The touch device itself   
    > ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Touch Panel Capabilities – lists the capabilities of the touch panel, how many touches it supports and if one is connected   
    > ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Touch Location and Touch Location state – which provide details of each touch to the screen   
    > ![](http://www.dotnetscraps.com/samples/bullets/001.gif)    Touch Collection – A collection of touches to the screen for how many fingers are on the screen at a time
    
    
    
    Like with the keyboard, we need to get the state of the touch panel each update and then respond to those touches appropriately, first off we need an attribute to store the state of the touches, this is done using a Touch Collection (because a Touch Panels state is determined by how many touches there are on a screen).
    
    
    
    After the keyboard state parameters at the beginning of the Input class, add the following:
    
    
    
        
        
             1: static TouchCollection m\_Touches = TouchPanel.GetState();
        
        
        
        Here we declare our Touch collection attribute and get the first state of the Touch Panel as the game starts.
        
        
        
        Next we need to ensure that the state gets updated during the game so add the following to the update function:
        
        
        
            
            
                 1: m\_Touches = TouchPanel.GetState();
            
            
            
            Now as the touch panel is completely behaviour driven, we cannot handle what the device should do with those touches here.  We leave that to whatever object or screen is responding to the touches.  However to to that we need to expose the touches to the rest of the game, so we add a property at the end of our input class:
            
            
            
                
                
                     1: public static TouchCollection touches { get {return m\_Touches;} }
                
                
                
                Now this is a read only property as only the touch device should populate what touches there are and their state.
                
                
                
                If we run the game now, we are fully touch screen enabled, but…, we have not implemented any behaviour as yet, so let’s add some touch control to the Trooper
                
                
                
                 
                
                
                * * *
                
                
                 
                
                
                ### Quick Pause and a bit of refactoring
                
                
                Now as a prelude to the next intermission for dynamic controls, we need to update the Input class slightly and the Troopers use of those control.
                
                
                
                What this does is to abstract the button press testing with actual controls we need in the game (See “Controls for Star Trooper” above), so we make the key press and trigger functions private so that they are only used internally by the input class:
                
                
                
                    
                    
                         1: private static bool IsPressed(Keys key)
                    
                    
                    
                         2: {
                    
                    
                    
                         3: return m\_KeyStates.IsKeyDown(key) && m\_OldKeyState.IsKeyDown(key);
                    
                    
                    
                         4: }
                    
                    
                    
                         5: 
                    
                    
                    
                         6: private static bool IsTriggered(Keys key)
                    
                    
                    
                         7: {
                    
                    
                    
                         8: return m\_KeyStates.IsKeyDown(key) && m\_OldKeyState.IsKeyUp(key);
                    
                    
                    
                         9: }
                    
                    
                    
                    And then add actual controls for the game that we expect to expose, like so:
                    
                    
                    
                        
                        
                             1: #region Public Controls
                        
                        
                        
                             2: 
                        
                        
                        
                             3: public static bool MoveUp()
                        
                        
                        
                             4: {
                        
                        
                        
                             5: return IsPressed(Keys.Up);
                        
                        
                        
                             6: }
                        
                        
                        
                             7: 
                        
                        
                        
                             8: public static bool MoveDown()
                        
                        
                        
                             9: {
                        
                        
                        
                             10: return IsPressed(Keys.Down);
                        
                        
                        
                             11: }
                        
                        
                        
                             12: 
                        
                        
                        
                             13: public static bool MoveLeft()
                        
                        
                        
                             14: {
                        
                        
                        
                             15: return IsPressed(Keys.Left);
                        
                        
                        
                             16: }
                        
                        
                        
                             17: 
                        
                        
                        
                             18: public static bool MoveRight()
                        
                        
                        
                             19: {
                        
                        
                        
                             20: return IsPressed(Keys.Right);
                        
                        
                        
                             21: }
                        
                        
                        
                             22: 
                        
                        
                        
                             23: public static bool TrooperFired()
                        
                        
                        
                             24: {
                        
                        
                        
                             25: return IsTriggered(Keys.Space);
                        
                        
                        
                             26: }
                        
                        
                        
                             27: #endregion
                        
                        
                        
                        So now if I want to change the keys to use for controlling the trooper, it is all limited inside the input class at current.
                        
                        
                        
                        You may say, “big deal, that is not different from before where I only updated the trooper class”, however when we later add more players and want to assign different controls to each and having them configurable, it becomes a big deal.  When we also add a menu and more screens later you will see this abstraction expanded.
                        
                        
                        
                        > > ![](http://www.dotnetscraps.com/samples/bullets/034.gif)   In the next intermission we will also go a lot further with this, but for now, this is enough to start.
                        
                        
                        
                        Next, let us not forget, our Trooper class is still trying to use the old functions, by making them private we have now created a lot of breaks in our code, this helps us to identify where we need to update the code to accept the new control scheme (sometimes breaks are useful).
                        
                        
                        
                        So simply update the movement code with the new functions like so in the StarTrooperSprite classes Trooper update section:
                        
                        
                        
                            
                            
                                 1: if (Position.Y \> 50 && Input.MoveUp())
                            
                            
                            
                                 2: 
                            
                            
                            
                                 3: if (Position.Y \< StarTrooperGame.BackBufferHeight - 30 && Input.MoveDown())
                            
                            
                            
                                 4: 
                            
                            
                            
                                 5: if (Position.X \> 30 && Input.MoveLeft())
                            
                            
                            
                                 6: 
                            
                            
                            
                                 7: if (Position.X \< StarTrooperGame.BackBufferWidth - 70 && Input.MoveRight())
                            
                            
                            
                            Lastly as we intend to add another way to get the Trooper to fire a shot, lets move this into it is own function:
                            
                            
                            
                            Add:
                            
                            
                            
                                
                                
                                     1: void TrooperFire()
                                
                                
                                
                                     2: {
                                
                                
                                
                                     3: // dynamically create a new sprite
                                
                                
                                
                                     4: Fire fire = (Fire)StarTrooperGame.Fire.Clone();
                                
                                
                                
                                     5: fire.Position = new Vector2(Position.X, Position.Y - 35);
                                
                                
                                
                                     6: fire.Velocity = new Vector2(0, -4);
                                
                                
                                
                                     7: StarTrooperGame.Add(fire); // set the fire sprite active
                                
                                
                                
                                     8: }
                                
                                
                                
                                And update the keyboard logic to the following:
                                
                                
                                
                                    
                                    
                                         1: // if the trooper fire key triggered
                                    
                                    
                                    
                                         2: if (Input.TrooperFired())
                                    
                                    
                                    
                                         3: TrooperFire();
                                    
                                    
                                    
                                     
                                    
                                    
                                    * * *
                                    
                                    
                                     
                                    
                                    
                                    ### Trooper Touch Controls
                                    
                                    
                                    For now as we are keeping things simple we will just add the touch controls directly to the Trooper itself rather than writing a complex handler (remember KISS).  So at the moment we have a collection of touches coming from the Input class and we just need to decide what to do with them.
                                    
                                    
                                    
                                    Now the simplest way to realise touch control for our trooper is simply to move the trooper towards where we are touching (and holding) the screen, that way as you drag your finger round the trooper will follow you.
                                    
                                    
                                    
                                    We could just have the trooper respond and move to where we touch, but that gets a bit more tricky as we cannot see the trooper under our finger and we would need to add logic to stop the trooper jumping around the screen if we took our finger off and placed it somewhere else.
                                    
                                    
                                    
                                    So first off we need to check the touches to see if there is any action, in the StarTrooperSprites class, add the following to the Trooper sprite update function:
                                    
                                    
                                    
                                        
                                        
                                             1: foreach (TouchLocation t in Input.touches)
                                        
                                        
                                        
                                             2: {
                                        
                                        
                                        
                                             3: switch (t.State)
                                        
                                        
                                        
                                             4: {
                                        
                                        
                                        
                                             5: case TouchLocationState.Pressed:
                                        
                                        
                                        
                                             6: break;
                                        
                                        
                                        
                                             7: case TouchLocationState.Moved:
                                        
                                        
                                        
                                             8: break;
                                        
                                        
                                        
                                             9: case TouchLocationState.Released:
                                        
                                        
                                        
                                             10: break;
                                        
                                        
                                        
                                             11: default:
                                        
                                        
                                        
                                             12: break;
                                        
                                        
                                        
                                             13: }
                                        
                                        
                                        
                                             14: }
                                        
                                        
                                        
                                        In this loop we check all of the touches and if a touch is there we check what state it is in, then depending on the state we will do something (not a lot at the moment as the loop exits if something happens)
                                        
                                        
                                        
                                        So to move the trooper to our finger where we are holding it, we need to check for a touch in the Moved state.  This might seem a bit strange as we have not moved our finger on the screen yet, we are just pressing it, however the framework simply interprets anything more than a press as a movement, so we just use move.
                                        
                                        
                                        
                                        So we add the following to the Moved state test:
                                        
                                        
                                        
                                            
                                            
                                                 1: case TouchLocationState.Moved:
                                            
                                            
                                            
                                                 2: vel = new Vector2(t.Position.X - Position.X, t.Position.Y - Position.Y);
                                            
                                            
                                            
                                                 3: break;
                                            
                                            
                                            
                                                 4: 
                                            
                                            
                                            
                                            Now here we are using the same logic as we do for the condor and move the trooper towards our touch.  First thing you should notice though is that you now have a warning in the compiler and if you build the code it will fail, this is because I have updated the way that we move the trooper, this is so we can safely integrate the keyboard and touch screen together (remember even pc’s can have touch screens, like laptops).
                                            
                                            
                                            
                                            I have changed the velocity update variable to a Vector2, as the touch screen position is a Vector2, updated the keyboard update sections to modify the specific component of the new velocity and also introduced a speed variable, which allows us more easily to affect the speed of our trooper’s movement. (It will also allow us later to have faster more deadlier enemies).
                                            
                                            
                                            
                                            In short here is the updated Trooper update function:
                                            
                                            
                                            
                                                
                                                
                                                     1: Vector2 vel = Vector2.Zero;
                                                
                                                
                                                
                                                     2: 
                                                
                                                
                                                
                                                     3: foreach (TouchLocation t in Input.touches)
                                                
                                                
                                                
                                                     4: {
                                                
                                                
                                                
                                                     5: switch (t.State)
                                                
                                                
                                                
                                                     6: {
                                                
                                                
                                                
                                                     7: case TouchLocationState.Pressed:
                                                
                                                
                                                
                                                     8: break;
                                                
                                                
                                                
                                                     9: case TouchLocationState.Moved:
                                                
                                                
                                                
                                                     10: vel = new Vector2(t.Position.X - Position.X, t.Position.Y - Position.Y);
                                                
                                                
                                                
                                                     11: break;
                                                
                                                
                                                
                                                     12: case TouchLocationState.Released:
                                                
                                                
                                                
                                                     13: break;
                                                
                                                
                                                
                                                     14: default:
                                                
                                                
                                                
                                                     15: break;
                                                
                                                
                                                
                                                     16: }
                                                
                                                
                                                
                                                     17: }
                                                
                                                
                                                
                                                     18: 
                                                
                                                
                                                
                                                     19: if (Position.Y \> 50 && Input.MoveUp())
                                                
                                                
                                                
                                                     20: vel.Y += -2; // if trooper is under y=50 then go upward
                                                
                                                
                                                
                                                     21: if (Position.Y \< StarTrooperGame.BackBufferHeight - 30 && Input.MoveDown())
                                                
                                                
                                                
                                                     22: vel.Y += 2; // if trooper is over y=450 then go upward
                                                
                                                
                                                
                                                     23: if (Position.X \> 30 && Input.MoveLeft())
                                                
                                                
                                                
                                                     24: {
                                                
                                                
                                                
                                                     25: vel.X += -2; // go to the left
                                                
                                                
                                                
                                                     26: SpriteEffect = SpriteEffects.FlipHorizontally; // left flip trooper
                                                
                                                
                                                
                                                     27: }
                                                
                                                
                                                
                                                     28: if (Position.X \< StarTrooperGame.BackBufferWidth - 70 && Input.MoveRight())
                                                
                                                
                                                
                                                     29: {
                                                
                                                
                                                
                                                     30: vel.X = 2; // go to the right
                                                
                                                
                                                
                                                     31: SpriteEffect = SpriteEffects.None; // right flip trooper
                                                
                                                
                                                
                                                     32: }
                                                
                                                
                                                
                                                     33: if (vel != Vector2.Zero) vel.Normalize();
                                                
                                                
                                                
                                                     34: Velocity = vel \* Speed; // set new velocity for Trooper
                                                
                                                
                                                
                                                And the update to the Sprite class to add the new Speed variable:
                                                
                                                
                                                
                                                    
                                                    
                                                         1: //Speed Attribute
                                                    
                                                    
                                                    
                                                         2: int m\_Speed = 2;
                                                    
                                                    
                                                    
                                                         3: 
                                                    
                                                    
                                                    
                                                         4: //Speed Property
                                                    
                                                    
                                                    
                                                         5: public int Speed
                                                    
                                                    
                                                    
                                                         6: {
                                                    
                                                    
                                                    
                                                         7: set
                                                    
                                                    
                                                    
                                                         8: {
                                                    
                                                    
                                                    
                                                         9: m\_Speed = value;
                                                    
                                                    
                                                    
                                                         10: }
                                                    
                                                    
                                                    
                                                         11: get
                                                    
                                                    
                                                    
                                                         12: {
                                                    
                                                    
                                                    
                                                         13: return m\_Speed;
                                                    
                                                    
                                                    
                                                         14: }
                                                    
                                                    
                                                    
                                                         15: }
                                                    
                                                    
                                                    
                                                    Finally, now we just need to add the firing capability to our touch interface, simplest way to do this is that when ever there is a tap or new touch to the screen we fire a shot.  It does mean whenever you start to move the trooper it will fire, but were not conserving ammo here and simple is good for now. (if you wish, try experimenting with different ways to control this).  The end result is that we would control the trooper with one finger and fire with a second finger.
                                                    
                                                    
                                                    
                                                    > ![](http://www.dotnetscraps.com/samples/bullets/034.gif)    One thing to remember though, is that the emulator only supports a single touch with the mouse!!.
                                                    
                                                    
                                                    
                                                    Adding this with all the work we have done so far is quite simple, just call the new TrooperFire function when we detect a touch press, like so in the Trooper class:
                                                    
                                                    
                                                    
                                                        
                                                        
                                                             1: case TouchLocationState.Pressed:
                                                        
                                                        
                                                        
                                                             2: TrooperFire();
                                                        
                                                        
                                                        
                                                             3: break;
                                                        
                                                        
                                                        
                                                         
                                                        
                                                        
                                                        * * *
                                                        
                                                        ### Accelerometer
                                                        
                                                        
                                                         
                                                        
                                                        
                                                        
                                                        Now we can add the accelerometer, which I will detail here briefly, but the situation is a bit more complicated.  The main this that is different between the accelerometer and other control devices is that it is event based.
                                                        
                                                        
                                                        
                                                        With other control methods, we check what the current state of the device is and we check it frequently enough, that we can determine exactly when everything happens.  With the accelerometer we have to wait for the device to tell us when something has changed.
                                                        
                                                        
                                                        
                                                        With this it is a bit more work to setup to do to get this to work and you also have a few choices for how you use this information, either you can keep he same kind of state model that you use for all the other devices or you can use the event system as is.  Both have their pro’s and con’s and it is up to you and how your game can best benefit from it.  I will detail the state model here and just point out where you can do it by event.
                                                        
                                                        
                                                        
                                                        So, first we need a fair bit of code to add to our input class where most of the work will be done, first some variables to hold our accelerometer setup, add these to the beginning of the input class:
                                                        
                                                        
                                                        
                                                            
                                                            
                                                                 1: static AccelerometerSensor m\_accelerometer;
                                                            
                                                            
                                                            
                                                                 2: static AccelerometerReading m\_accelreading = new AccelerometerReading();
                                                            
                                                            
                                                            
                                                                 3: static AccelerometerReading m\_Oldaccelreading = new AccelerometerReading();
                                                            
                                                            
                                                            
                                                                 4: static bool accelavailable = true;
                                                            
                                                            
                                                            
                                                            Like the Keyboard, we need to follow the current state of the accelerometer, so we save the last sate before it is updated in the loop as follows in the start of the update function:
                                                            
                                                            
                                                            
                                                                
                                                                
                                                                     1: m\_Oldaccelreading = m\_accelreading;
                                                                
                                                                
                                                                
                                                                Next up is the event handler for the accelerometer, this is called each and every time something changes in the position of the windows phone, when it does we update the state variable we added earlier.  Place this just above the Private properties section in it is own area of the input class, the same as the Update or public functions:
                                                                
                                                                
                                                                
                                                                    
                                                                    
                                                                         1: #region Accelerometer Event Handling
                                                                    
                                                                    
                                                                    
                                                                         2: /// \<summary\>
                                                                    
                                                                    
                                                                    
                                                                         3: /// The event handler for the accelerometer ReadingChanged event.
                                                                    
                                                                    
                                                                    
                                                                         4: /// BeginInvoke is used to pass this event args object to the UI thread.
                                                                    
                                                                    
                                                                    
                                                                         5: /// \</summary\>
                                                                    
                                                                    
                                                                    
                                                                         6: /// \<param name="sender"\>\</param\>
                                                                    
                                                                    
                                                                    
                                                                         7: /// \<param name="e"\>\</param\>
                                                                    
                                                                    
                                                                    
                                                                         8: static void accelerometer\_ReadingChanged(object sender, AccelerometerReadingAsyncEventArgs e)
                                                                    
                                                                    
                                                                    
                                                                         9: {
                                                                    
                                                                    
                                                                    
                                                                         10: m\_accelreading = e.Value.Value;
                                                                    
                                                                    
                                                                    
                                                                         11: }
                                                                    
                                                                    
                                                                    
                                                                         12: 
                                                                    
                                                                    
                                                                    
                                                                         13: #endregion
                                                                    
                                                                    
                                                                    
                                                                    Then we have the main workhorse of the code, add this inside the Update function towards the end:
                                                                    
                                                                    
                                                                    
                                                                        
                                                                        
                                                                             1: #region Accelerometer section
                                                                        
                                                                        
                                                                        
                                                                             2: 
                                                                        
                                                                        
                                                                        
                                                                             3: // If the accelerometer is null, it is initialized and started
                                                                        
                                                                        
                                                                        
                                                                             4: if (m\_accelerometer == null & accelavailable)
                                                                        
                                                                        
                                                                        
                                                                             5: {
                                                                        
                                                                        
                                                                        
                                                                             6: // Instantiate the accelerometer sensor object
                                                                        
                                                                        
                                                                        
                                                                             7: m\_accelerometer = new AccelerometerSensor();
                                                                        
                                                                        
                                                                        
                                                                             8: 
                                                                        
                                                                        
                                                                        
                                                                             9: if (m\_accelerometer.State == SensorState.NotSupported)
                                                                        
                                                                        
                                                                        
                                                                             10: {
                                                                        
                                                                        
                                                                        
                                                                             11: accelavailable = false;
                                                                        
                                                                        
                                                                        
                                                                             12: m\_accelerometer = null;
                                                                        
                                                                        
                                                                        
                                                                             13: goto AccelerometerNotImplemented;
                                                                        
                                                                        
                                                                        
                                                                             14: }
                                                                        
                                                                        
                                                                        
                                                                             15: // Add an event handler for the ReadingChanged event.
                                                                        
                                                                        
                                                                        
                                                                             16: m\_accelerometer.ReadingChanged += new EventHandler\<AccelerometerReadingAsyncEventArgs\>(accelerometer\_ReadingChanged);
                                                                        
                                                                        
                                                                        
                                                                             17: 
                                                                        
                                                                        
                                                                        
                                                                             18: // The Start method could throw and exception, so use a try block
                                                                        
                                                                        
                                                                        
                                                                             19: try
                                                                        
                                                                        
                                                                        
                                                                             20: {
                                                                        
                                                                        
                                                                        
                                                                             21: m\_accelerometer.Start();
                                                                        
                                                                        
                                                                        
                                                                             22: }
                                                                        
                                                                        
                                                                        
                                                                             23: catch (AccelerometerStartFailedException exception)
                                                                        
                                                                        
                                                                        
                                                                             24: {
                                                                        
                                                                        
                                                                        
                                                                             25: //throw exception;
                                                                        
                                                                        
                                                                        
                                                                             26: Console.WriteLine("Accelerometer Not Implemented in this device, {0}", exception);
                                                                        
                                                                        
                                                                        
                                                                             27: accelavailable = false;
                                                                        
                                                                        
                                                                        
                                                                             28: }
                                                                        
                                                                        
                                                                        
                                                                             29: 
                                                                        
                                                                        
                                                                        
                                                                             30: }
                                                                        
                                                                        
                                                                        
                                                                             31: AccelerometerNotImplemented:
                                                                        
                                                                        
                                                                        
                                                                             32: Console.WriteLine("Accelerometer Not Implemented in this device");
                                                                        
                                                                        
                                                                        
                                                                             33: 
                                                                        
                                                                        
                                                                        
                                                                             34: #endregion
                                                                        
                                                                        
                                                                        
                                                                        Here we have several things going on, first we check if the accelerometer has been started yet or not by checking the variable for the accelerometer sensor, if it is null we have not set it up yet.  You may ask “why was not it started with the game?”, this is because, unlike other devices, the accelerometer takes power and is an active device, meaning it is almost always sending data, we should only start it when we are expecting to watch for it (so when you pause or switch away from the game you should always stop the sensor so as not to affect anything else, be aware!).
                                                                        
                                                                        
                                                                        
                                                                        We also test a flag to see if the device you are using supports the accelerometer.  I added this check because the emulator does not and throws an error if you try and start it, there is not a capabilities check (like with the touch screen) to see if the device has one or not, you find out in the next step when you try and start it.
                                                                        
                                                                        
                                                                        
                                                                        So once you have passed that test, which should be just when you start the game (or need to restart the accelerometer), we then create a new instance of the sensor itself.  Once we have that we can then check if it is supported on the game device, if it is then we can start it safely, if not then we change the flag to sow it is not supported and skip starting the device properly including freeing up the memory we allocated to the sensor.
                                                                        
                                                                        
                                                                        
                                                                        Next (if there is a sensor), we register to the event handler for the sensor, so that each time the sensor changes it will call the function we added earlier to store the new state.
                                                                        
                                                                        
                                                                        
                                                                        Finally we have to remember to stop and free up the accelerometer when the game finishes, so we add a Dispose function, which is called by the UnloadResources function in the StarTrooperGame class, so add this to the input class:
                                                                        
                                                                        
                                                                        
                                                                            
                                                                            
                                                                                 1: public static void Dispose()
                                                                            
                                                                            
                                                                            
                                                                                 2: {
                                                                            
                                                                            
                                                                            
                                                                                 3: // if the accelerometer is not null, call Stop
                                                                            
                                                                            
                                                                            
                                                                                 4: if (accelavailable)
                                                                            
                                                                            
                                                                            
                                                                                 5: {
                                                                            
                                                                            
                                                                            
                                                                                 6: try
                                                                            
                                                                            
                                                                            
                                                                                 7: {
                                                                            
                                                                            
                                                                            
                                                                                 8: m\_accelerometer.Stop();
                                                                            
                                                                            
                                                                            
                                                                                 9: m\_accelerometer = null;
                                                                            
                                                                            
                                                                            
                                                                                 10: }
                                                                            
                                                                            
                                                                            
                                                                                 11: catch (AccelerometerStopFailedException exception)
                                                                            
                                                                            
                                                                            
                                                                                 12: {
                                                                            
                                                                            
                                                                            
                                                                                 13: throw exception;
                                                                            
                                                                            
                                                                            
                                                                                 14: }
                                                                            
                                                                            
                                                                            
                                                                                 15: }
                                                                            
                                                                            
                                                                            
                                                                                 16: }
                                                                            
                                                                            
                                                                            
                                                                            And this to the StarTrooperGame class UnloadContent function
                                                                            
                                                                            
                                                                            
                                                                                
                                                                                
                                                                                     1: //Important or the Accelerometer will keep on running!!
                                                                                
                                                                                
                                                                                
                                                                                     2: Input.Dispose();
                                                                                
                                                                                
                                                                                
                                                                                To finish it of we need to update our control functions in the Input class:
                                                                                
                                                                                
                                                                                
                                                                                    
                                                                                    
                                                                                         1: public static bool MoveUp()
                                                                                    
                                                                                    
                                                                                    
                                                                                         2: {
                                                                                    
                                                                                    
                                                                                    
                                                                                         3: return IsPressed(Keys.Up) || (m\_accelreading.Y \< m\_Oldaccelreading.Y);
                                                                                    
                                                                                    
                                                                                    
                                                                                         4: }
                                                                                    
                                                                                    
                                                                                    
                                                                                         5: 
                                                                                    
                                                                                    
                                                                                    
                                                                                         6: public static bool MoveDown()
                                                                                    
                                                                                    
                                                                                    
                                                                                         7: {
                                                                                    
                                                                                    
                                                                                    
                                                                                         8: return IsPressed(Keys.Down) || (m\_accelreading.Y \> m\_Oldaccelreading.Y);
                                                                                    
                                                                                    
                                                                                    
                                                                                         9: }
                                                                                    
                                                                                    
                                                                                    
                                                                                         10: 
                                                                                    
                                                                                    
                                                                                    
                                                                                         11: public static bool MoveLeft()
                                                                                    
                                                                                    
                                                                                    
                                                                                         12: {
                                                                                    
                                                                                    
                                                                                    
                                                                                         13: return IsPressed(Keys.Left) || (m\_accelreading.X \< m\_Oldaccelreading.X);
                                                                                    
                                                                                    
                                                                                    
                                                                                         14: }
                                                                                    
                                                                                    
                                                                                    
                                                                                         15: 
                                                                                    
                                                                                    
                                                                                    
                                                                                         16: public static bool MoveRight()
                                                                                    
                                                                                    
                                                                                    
                                                                                         17: {
                                                                                    
                                                                                    
                                                                                    
                                                                                         18: return IsPressed(Keys.Right) || (m\_accelreading.X \> m\_Oldaccelreading.X);
                                                                                    
                                                                                    
                                                                                    
                                                                                         19: }
                                                                                    
                                                                                    
                                                                                    
                                                                                    Now here I should mention that we cannot test these settings at present as the emulator does not support the accelerometer and we might need to tweak these checks depending on how the Windows Phone device actually works, but you get a good feel for what is needed.
                                                                                    
                                                                                    
                                                                                    
                                                                                    We could have just updated the velocity of the trooper by altering the event handler to something like this: (\*Note this is only an example, not in the sample)
                                                                                    
                                                                                    
                                                                                    
                                                                                        
                                                                                        
                                                                                             1: static void accelerometer\_ReadingChanged(object sender, AccelerometerReadingAsyncEventArgs e)
                                                                                        
                                                                                        
                                                                                        
                                                                                             2: {
                                                                                        
                                                                                        
                                                                                        
                                                                                             3: //m\_accelreading = e.Value.Value;
                                                                                        
                                                                                        
                                                                                        
                                                                                             4: StarTrooperGame.Trooper.Velocity += new Microsoft.Xna.Framework.Vector2((float)e.Value.Value.X,(float)e.Value.Value.Y);
                                                                                        
                                                                                        
                                                                                        
                                                                                             5: }
                                                                                        
                                                                                        
                                                                                        
                                                                                        This would allow the Trooper to move across by how much angle the player turned and flipped the device (more angle = more speed), however I felt that this could cause problems with playability, you decide.
                                                                                        
                                                                                        
                                                                                        
                                                                                         
                                                                                        
                                                                                        
                                                                                        * * *
                                                                                        
                                                                                        
                                                                                        So ends the next chapter in the series with more Windows Phone stuff :-).
                                                                                        
                                                                                        
                                                                                        
                                                                                         
                                                                                        
                                                                                        
                                                                                        
                                                                                        Hopefully you get a feel for control systems in the Windows Phone and other mobile devices, next up is another intermission on dynamic controls, were we build on some of the work here on the Windows / XBOX 360 platforms and allow customisable controls.  Customisable controls for mobile devices don’t make a lot of sense with such a restricted control set.  (although I would like to see a head to head or Air hockey type game on the phone :-))
                                                                                        
                                                                                        
                                                                                        
                                                                                        Bring on the wall!!!
                                                                                        
                                                                                    
                                                                                    
                                                                                
                                                                                
                                                                            
                                                                            
                                                                        
                                                                        
                                                                    
                                                                    
                                                                
                                                                
                                                            
                                                            
                                                        
                                                        
                                                    
                                                    
                                                
                                                
                                            
                                            
                                        
                                        
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

