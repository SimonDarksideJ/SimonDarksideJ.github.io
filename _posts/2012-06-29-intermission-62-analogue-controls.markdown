---
layout: post
title: 'Intermission #6/2 - Analogue Controls'
date: '2012-06-29 10:51:41'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

Following on from the last post I will quickly cover updating our input framework to allow for analogue controls such as Gamepad stick and triggers.

Code for the complete intermission 6 can be found [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/46712/download/128315)

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Available controls

With XNA we have a few analogue controls to choose from:

> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Two thumbstick controls – X/Y controls   
> ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Two Triggers – single direction feedback

These off a gradual response rather than the on/off switch from the digital controls.

Unfortunately Joysticks are not supported on the PC in XNA,yet…

 

* * *

### Code Updates

Does not take too much to update our code to use these analogue controls, first off we need to add a new function to our input class:

 

    
    
         1: private static Vector2 IsStickorTriggerMoved(Buttons button)
    
    
    
         2: {
    
    
    
         3: switch (button)
    
    
    
         4: {
    
    
    
         5: case Buttons.LeftStick:
    
    
    
         6: return m\_GamepadState.ThumbSticks.Left;
    
    
    
         7: case Buttons.RightStick:
    
    
    
         8: return m\_GamepadState.ThumbSticks.Right;
    
    
    
         9: case Buttons.LeftTrigger:
    
    
    
         10: return new Vector2(m\_GamepadState.Triggers.Left, 0);
    
    
    
         11: case Buttons.RightTrigger:
    
    
    
         12: return new Vector2(m\_GamepadState.Triggers.Right, 0);
    
    
    
         13: default:
    
    
    
         14: return Vector2.Zero;
    
    
    
         15: }
    
    
    
         16: }
    
    
    
    Here we just check which control we are using and return the appropriate value, note that as the triggers only have a single value and the thumbsticks have 2, we convert the triggers in to a Vector2 to match the thumbsticks, this just makes it simpler and we only need one function and not two to handle the different types.
    
    
    
    Then add the player control that will use this new function:
    
    
    
        
        
             1: public static Vector2 TrooperMoveStick()
        
        
        
             2: {
        
        
        
             3: return IsStickorTriggerMoved(m\_InputMappings.AltMoveControl);
        
        
        
             4: }
        
        
        
        Now that we have our test function and control we need to update our game to use it.  This part is not as simple as we need to change the input handling for our trooper a fair bit to enable it to be able to use both analogue and digital controls, here is what the updated update section looks like for the trooper in StarTrooperSprites:
        
        
        
            
            
                 1: Vector2 vel = Vector2.Zero;
            
            
            
                 2: switch (Input.InputMappings.AltMoveMethod)
            
            
            
                 3: {
            
            
            
                 4: case MovementMethod.Analogue:
            
            
            
                 5: vel = Input.TrooperMoveStick();
            
            
            
                 6: break;
            
            
            
                 7: default:
            
            
            
                 8: if (Input.MoveUp())
            
            
            
                 9: vel.Y = -2; // if trooper is under y=50 then go upward
            
            
            
                 10: if (Input.MoveDown())
            
            
            
                 11: vel.Y = 2; // if trooper is over y=450 then go upward
            
            
            
                 12: if (Input.MoveLeft())
            
            
            
                 13: {
            
            
            
                 14: vel.X = -2; // go to the left
            
            
            
                 15: }
            
            
            
                 16: if (Input.MoveRight())
            
            
            
                 17: {
            
            
            
                 18: vel.X = 2; // go to the right
            
            
            
                 19: }
            
            
            
                 20: break;
            
            
            
                 21: }
            
            
            
                 22: 
            
            
            
                 23: if (isWithinScreenBounds(Position + (vel \* Speed))) Velocity = vel \* Speed; else Velocity = Vector2.Zero;// set new velocity for Trooper
            
            
            
                 24: 
            
            
            
                 25: if (Velocity.X \> 0)
            
            
            
                 26: SpriteEffect = SpriteEffects.None; // right flip trooper
            
            
            
                 27: else
            
            
            
                 28: SpriteEffect = SpriteEffects.FlipHorizontally; // Left flip trooper
            
            
            
                 29: 
            
            
            
                 30: // if space bar is triggered
            
            
            
                 31: if (Input.TrooperFired())
            
            
            
                 32: TrooperFire();
            
            
            
            There is a lot in here so we will walk through the changes as I had applied them:
            
            
            
            > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    We had already updated the variable for capturing the change in movement to a Vector 2, so no change there (Vector2 vel).   
            > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Next I have added a test against a new configuration option to see if the player has chosen to use Analogue or Digital Controls in a switch statement (more on that in a bit).   
            > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    If we are using analogue controls we update our movement vector (vel) by the amount returned from our new function.  now if the player only moves the stick a small amount the trooper will move slower.  The more the player moves the stick the faster the trooper will travel.   
            > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    If we are not using analogue controls (assuming it is digital) then we use the old functions.  Although they have been trimmed down a bit now to just move.   
            > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    The next step adds a new function to check if the amount the trooper is going to move will put the player outside the bound of the drawable screen, if the trooper is going to move outside, we Zero it is velocity so that it does not move.  If the trooper still has room to move then we update it is velocity (which in turn updates the sprite in the Sprite’s update call).   
            > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    Finally we have added another test, since we need a way to check which way the trooper is travelling and we can no longer rely on which key the player is pressing (because with analogue we just have a movement amount not a specific move action like press left), we just check which way on the X axis the trooper is going to move, if the trooper is going to move left ( –X) then we flip the sprite to draw it the other way, if not we set it back to the original direction, right.
            
            
            
            Here is the code for the “IsWithinScreenBounds” function, which goes into the Sprite class in the engine folder:
            
            
            
                
                
                     1: public bool isWithinScreenBounds(Vector2 pos)
                
                
                
                     2: {
                
                
                
                     3: if (pos.X \> (float)StarTrooperGame.ScreenBuffer &&
                
                
                
                     4: pos.X \< (float)(StarTrooperGame.BackBufferWidth - (StarTrooperGame.ScreenBuffer \* 2)) &&
                
                
                
                     5: pos.Y \> (float)StarTrooperGame.ScreenBuffer &&
                
                
                
                     6: pos.Y \< (float)(StarTrooperGame.BackBufferHeight - (StarTrooperGame.ScreenBuffer \* 2)))
                
                
                
                     7: return true;
                
                
                
                     8: else
                
                
                
                     9: return false;
                
                
                
                     10: }
                
                
                
                This just checks the screen boundaries with a certain amount of buffer space, as you can see the ScreenBuffer is also a new attribute to the StarTrooperGame.cs Class, this goes in to the device specific settings, which allows a different screen buffer size to be set for mobile devices such as the ZUNE (note the ZUNE buffer is a lot smaller):
                
                
                
                    
                    
                         1: #if ZUNE
                    
                    
                    
                         2: private static int m\_TargetFrameRate = 30; 
                    
                    
                    
                         3: private const int m\_BackBufferWidth = 240;
                    
                    
                    
                         4: private const int m\_BackBufferHeight = 320;
                    
                    
                    
                         5: private const int m\_ScreenBuffer = 10;
                    
                    
                    
                         6: #else
                    
                    
                    
                         7: private static int m\_TargetFrameRate = 60;
                    
                    
                    
                         8: private const int m\_BackBufferWidth = 1280;
                    
                    
                    
                         9: private const int m\_BackBufferHeight = 720;
                    
                    
                    
                         10: private const int m\_ScreenBuffer = 50;
                    
                    
                    
                         11: #endif
                    
                    
                    
                    The smaller size would also be used in a Windows Phone 7 target, but more on that in a later post.
                    
                    
                    
                    lastly to complete this update we need the new configuration setting for choosing which type of control we want to use and of course the setting to hold which control that is, so first add the new settings to the KeyMappings.cs class, first the enumeration for the type of control which goes after the InputMappings class
                    
                    
                    
                    :
                    
                    
                    
                        
                        
                             1: [Serializable]
                        
                        
                        
                             2: public enum MovementMethod
                        
                        
                        
                             3: {
                        
                        
                        
                             4: Digital,
                        
                        
                        
                             5: Analogue
                        
                        
                        
                             6: }
                        
                        
                        
                        Note that even the enum is marked as serializable for when we save the settings.   And now the keymappings themselves into the InputMappings class itself:
                        
                        
                        
                            
                            
                                 1: public MovementMethod AltMoveMethod; //switch to use analogue or digital control
                            
                            
                            
                                 2: 
                            
                            
                            
                                 3: public Buttons AltMoveControl; //button or stick to use for control
                            
                            
                            
                            So now that we have our settings, we just need to finish this off with the defaults and were done, so update the defaults in the Input.cs class:
                            
                            
                            
                                
                                
                                     1: m\_InputMappings.AltMoveMethod = MovementMethod.Analogue;
                                
                                
                                
                                     2: 
                                
                                
                                
                                     3: m\_InputMappings.AltMoveControl = Buttons.LeftStick;
                                
                                
                                
                                Now if we run the project our trooper now has a bit more freedom of movement on the left stick, but wait…
                                
                                
                                
                                You should notice two things at this point:
                                
                                
                                
                                > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    The trooper moves down when I push up on the control stick   
                                > ![](http://www.dotnetscraps.com/samples/bullets/013.gif)    The background has disappeared
                                
                                
                                
                                Actually the background disappeared a few builds ago and did take me a little time to figure out what went wrong (welcome to the happy world of unintended consequences), but more on that in a bit.
                                
                                
                                
                                As for the trooper movement, there is a very simple explanation for this.  In our game world moving up actually means reducing the Y value of our sprite, as in our screen space Y increases down the screen.  However, the control stick increases the amount of Y movement as you push up, Up = more Y.   So in matter of fact pushing up increases the amount of Y movement and hence our trooper moves down the screen.
                                
                                
                                
                                Simple answer to this, just flip the Y value when it moves, but as I am also a sucker for having things configurable (let the player decide on which is the right way, who knows some sucker may like it that way, no offence to those that do?), we will also add a configuration setting for this flipping.  So first add the new configuration and it is default:
                                
                                
                                
                                 
                                
                                
                                * * *
                                
                                
                                 
                                
                                
                                ### Flipping the controls
                                
                                
                                So to flip the Y axis for our control scheme we need the following updates.
                                
                                
                                
                                In the KeyMappings class add:
                                
                                
                                
                                 
                                
                                
                                
                                    
                                    
                                         1: public bool InvertYLeftStick;
                                    
                                    
                                    
                                         2: public bool InvertYRightStick;
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                    And add the defaults to the Input class:
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                        
                                        
                                             1: m\_InputMappings.InvertYLeftStick = true;
                                        
                                        
                                        
                                             2: m\_InputMappings.InvertYRightStick = false;
                                        
                                        
                                        
                                         
                                        
                                        
                                        
                                        And finally update our movement code to recognise this configuration in the Input class, IsStickOrTriggerMoved function:
                                        
                                        
                                        
                                         
                                        
                                        
                                        
                                            
                                            
                                                 1: case Buttons.LeftStick:
                                            
                                            
                                            
                                                 2: if (m\_InputMappings.InvertYLeftStick) return invertY(m\_GamepadState.ThumbSticks.Left); else return m\_GamepadState.ThumbSticks.Left;
                                            
                                            
                                            
                                                 3: case Buttons.RightStick:
                                            
                                            
                                            
                                                 4: if (m\_InputMappings.InvertYRightStick) return invertY(m\_GamepadState.ThumbSticks.Right); else return m\_GamepadState.ThumbSticks.Right;
                                            
                                            
                                            
                                             
                                            
                                            
                                            
                                            Plus a little helper function to do the actual flipping for us, add the following “InvertY” function in the Input class:
                                            
                                            
                                            
                                             
                                            
                                            
                                            
                                                
                                                
                                                     1: private static Vector2 invertY(Vector2 move)
                                                
                                                
                                                
                                                     2: {
                                                
                                                
                                                
                                                     3: move.Y = -move.Y;
                                                
                                                
                                                
                                                     4: return move;
                                                
                                                
                                                
                                                     5: }
                                                
                                                
                                                
                                                 
                                                
                                                
                                                
                                                Here we simply invert the value on the Y axis of the value supplied and return it.  You could also add a InvertX option, but some might see that as silly (or really tricky if you wanted to add confusion in your control style, like a confusion bomb)
                                                
                                                
                                                
                                                 
                                                
                                                
                                                * * *
                                                
                                                ### Conclusion
                                                
                                                
                                                So there we have it, analogue controls.  Feel free to have a play and see what you can add to this, the project on codeplex also has some other configuration options added just so I could change the settings around while the game was running (very basic though).  See if you can update the Fire mode to shoot more fireballs the more the player leans on the triggers.
                                                
                                                
                                                
                                                Next intermission is on something a little bit more snazzy, Particles, and also something a little less interesting but very important resource pools.  After that we have a much needed performance update and then update our WP7 project with what we have so far.
                                                
                                                
                                                Technorati Tags: [XNA](http://technorati.com/tags/XNA)
                                                
                                                * * *
                                                
                                                ### Updates for the Background
                                                
                                                
                                                Almost done actually, we still need to update some of the code to get our background back. 
                                                
                                                
                                                
                                                Now this was a very strange bug and took a fair bit of time to fix, but I narrowed it down to the position on the screen the background was being drawn to, it was getting put well outside the visible screen, so it was being drawn still but not where we could see it.
                                                
                                                
                                                
                                                First off was to move the origin property to the sprite class from the animation class, this fixes the centre point of the texture on the screen for drawing sprites, so add the attribute to the bottom of the Sprite class, like so:
                                                
                                                
                                                
                                                    
                                                    
                                                         1: Vector2 m\_Origin = Vector2.Zero;
                                                    
                                                    
                                                    
                                                    Then add the property to expose it, at the end of the properties section:
                                                    
                                                    
                                                    
                                                        
                                                        
                                                             1: public Vector2 Origin
                                                        
                                                        
                                                        
                                                             2: {
                                                        
                                                        
                                                        
                                                             3: set
                                                        
                                                        
                                                        
                                                             4: {
                                                        
                                                        
                                                        
                                                             5: m\_Origin = value;
                                                        
                                                        
                                                        
                                                             6: }
                                                        
                                                        
                                                        
                                                             7: get
                                                        
                                                        
                                                        
                                                             8: {
                                                        
                                                        
                                                        
                                                             9: return m\_Origin;
                                                        
                                                        
                                                        
                                                             10: }
                                                        
                                                        
                                                        
                                                             11: }
                                                        
                                                        
                                                        
                                                        Then to ensure the attribute is properly populated when the Sprite is constructed, update the constructors as follows:
                                                        
                                                        
                                                        
                                                            
                                                            
                                                                 1: public Sprite()
                                                            
                                                            
                                                            
                                                                 2: {
                                                            
                                                            
                                                            
                                                                 3: m\_Id = m\_Counter++;
                                                            
                                                            
                                                            
                                                                 4: }
                                                            
                                                            
                                                            
                                                                 5: 
                                                            
                                                            
                                                            
                                                                 6: public Sprite(Texture2D Texture)
                                                            
                                                            
                                                            
                                                                 7: : base()
                                                            
                                                            
                                                            
                                                                 8: {
                                                            
                                                            
                                                            
                                                                 9: AddAnimation(new Animation(Texture));
                                                            
                                                            
                                                            
                                                                 10: m\_Origin = new Vector2((float)Texture.Width / 2, (float)Texture.Height / 2);
                                                            
                                                            
                                                            
                                                                 11: }
                                                            
                                                            
                                                            
                                                                 12: 
                                                            
                                                            
                                                            
                                                                 13: public Sprite(Texture2D Texture,int Frames, bool Loop)
                                                            
                                                            
                                                            
                                                                 14: : base()
                                                            
                                                            
                                                            
                                                                 15: {
                                                            
                                                            
                                                            
                                                                 16: Animation animation = new Animation(Texture,Frames);
                                                            
                                                            
                                                            
                                                                 17: m\_Origin = new Vector2((float)(Texture.Width / Frames) / 2, (float)Texture.Height / 2);
                                                            
                                                            
                                                            
                                                                 18: animation.Loop = Loop;
                                                            
                                                            
                                                            
                                                                 19: animation.Play();
                                                            
                                                            
                                                            
                                                                 20: 
                                                            
                                                            
                                                            
                                                                 21: AddAnimation(animation);
                                                            
                                                            
                                                            
                                                                 22: }
                                                            
                                                            
                                                            
                                                            Adding the Origin references as appropriate.
                                                            
                                                            
                                                            
                                                            Next we update the background creation logic to override the constructor and set the background Origin to Zero, makes it easier to draw background textures absolute:
                                                            
                                                            
                                                            
                                                                
                                                                
                                                                     1: Background bg = new Background(background);
                                                                
                                                                
                                                                
                                                                     2: 
                                                                
                                                                
                                                                
                                                                     3: bg.Position = new Vector2(0, BackBufferHeight / 2);
                                                                
                                                                
                                                                
                                                                     4: bg.ScaleX = BackBufferWidth / background.Width;
                                                                
                                                                
                                                                
                                                                     5: bg.ScaleY = BackBufferHeight / background.Height;
                                                                
                                                                
                                                                
                                                                     6: bg.ZOrder = 10;
                                                                
                                                                
                                                                
                                                                     7: bg.Origin = Vector2.Zero;
                                                                
                                                                
                                                                
                                                                     8: bg.Velocity = new Vector2(0,1);
                                                                
                                                                
                                                                
                                                                That should do it but I also made one other change here that will help us later, I’ve set the velocity of the main background so that the sprite update loop will move the background instead of just incrementing it by 1 all the time in the StarTrooperBackground class.  This enables us to change the speed of the background later.
                                                                
                                                                
                                                                
                                                                But by setting this property we also need to update the StarTrooperBackground classes update method, else it will always move twice as fast, so update this code to:
                                                                
                                                                
                                                                
                                                                    
                                                                    
                                                                         1: public override void Update()
                                                                    
                                                                    
                                                                    
                                                                         2: {
                                                                    
                                                                    
                                                                    
                                                                         3: Vector2 NewPosition = Position;
                                                                    
                                                                    
                                                                    
                                                                         4: if (NewPosition.Y == StarTrooperGame.BackBufferHeight)
                                                                    
                                                                    
                                                                    
                                                                         5: {
                                                                    
                                                                    
                                                                    
                                                                         6: NewPosition.Y = -StarTrooperGame.BackBufferHeight;
                                                                    
                                                                    
                                                                    
                                                                         7: Position = NewPosition;
                                                                    
                                                                    
                                                                    
                                                                         8: }
                                                                    
                                                                    
                                                                    
                                                                         9: }
                                                                    
                                                                    
                                                                    
                                                                    So all this update function does now is to shift the background up to the top once it has passed beyond view at the bottom of the screen.  However if the background was moving up this would not work.
                                                                    
                                                                    
                                                                    
                                                                    Feel free to experiment with this if you want, to use a different velocity in a different direction.
                                                                    
                                                                    
                                                                    
                                                                    To finish up you still need to remove all the references to m\_Origin from the Animation.CS class m like the attribute at the end of the class, and the copy reference in the Clone constructor.
                                                                    
                                                                    
                                                                    
                                                                    Basically search for all reference in the Animation class and remove them, the only exception is the Draw call which needs to be updated to:
                                                                    
                                                                    
                                                                    
                                                                        
                                                                        
                                                                             1: spritebatch.Draw(m\_SpritesheetTexture, sprite.Position, CurrentFrame, m\_Colour, sprite.Rotation,
                                                                        
                                                                        
                                                                        
                                                                             2: sprite.Origin,sprite.Scale, sprite.SpriteEffect, 0);
                                                                        
                                                                        
                                                                        
                                                                        Changing the Origin property to use the new Sprite Origin property.
                                                                        
                                                                        
                                                                        
                                                                        Lastly, we need to tidy up the Position property in the Sprite class, so that it is no longer offset, like so:
                                                                        
                                                                        
                                                                        
                                                                         
                                                                        
                                                                        
                                                                        
                                                                            
                                                                            
                                                                                 1: public Vector2 Position
                                                                            
                                                                            
                                                                            
                                                                                 2: {
                                                                            
                                                                            
                                                                            
                                                                                 3: set
                                                                            
                                                                            
                                                                            
                                                                                 4: {
                                                                            
                                                                            
                                                                            
                                                                                 5: m\_Position = value;
                                                                            
                                                                            
                                                                            
                                                                                 6: 
                                                                            
                                                                            
                                                                            
                                                                                 7: // UpdateCollisionRectangle();
                                                                            
                                                                            
                                                                            
                                                                                 8: }
                                                                            
                                                                            
                                                                            
                                                                                 9: get
                                                                            
                                                                            
                                                                            
                                                                                 10: {
                                                                            
                                                                            
                                                                            
                                                                                 11: return m\_Position;
                                                                            
                                                                            
                                                                            
                                                                                 12: }
                                                                            
                                                                            
                                                                            
                                                                                 13: }
                                                                            
                                                                            
                                                                            
                                                                             
                                                                            
                                                                            
                                                                            
                                                                            Putting the property sett back to it is default operation.
                                                                            
                                                                            
                                                                            
                                                                            And were done.
                                                                            
                                                                        
                                                                        
                                                                    
                                                                    
                                                                
                                                                
                                                            
                                                            
                                                        
                                                        
                                                    
                                                    
                                                
                                                
                                            
                                            
                                        
                                        
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

