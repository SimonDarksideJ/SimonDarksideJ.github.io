---
layout: post
title: 'Intermission #4 - Moving to Windows Phone'
date: '2012-06-29 10:31:55'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

No need to guess what this little section is about.  Games on [Windows Phone 7](http://developer.windowsphone.com/).

For now this is going to be a side project to the main tutorial since XNA 4.0 and the Windows Phone 7 kit has not been fully released yet.  So on with the show.

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Getting started

 

For the Windows Phone side of this tutorial you are going to need the [Windows Phone Development Kit](http://developer.windowsphone.com/windows-phone-7-series/) (The April refresh is the latest), this will download and install everything you need including:

- Visual Studio 2010 Express for Windows Phone
- XNA Studio 4.0
- Windows Phone 7 Emulator
- Silverlight for Windows Phone 7 

Get them installed and started and you see the great new Visual studio 2010 interface now completely re-written in WPF.

![VS2010ExpressPhone](http://xna-uk.net/blogs/darkgenesis/VS2010ExpressPhone_thumb_1878E542.png)

 

* * *

 

### New project

Now exactly the same as before in this [earlier post](/blogs/darkgenesis/archive/2010/06/04/intermission-3-updating-to-allow-for-changeable-resolution), you need to set up a new project, except this time you need to browse to the XNA Game Studio 4.0 section and select the “Windows Phone Game (4.0)” project.

![NewPhoneProject](http://xna-uk.net/blogs/darkgenesis/NewPhoneProject_thumb_581E6C2E.png)

 

I suggest calling the project “XNAStarTrooper2D\_Phone7”, select an appropriate folder and click OK, then you will be presented with a nice clean empty Phone solution.

First thing you should notice is that in a new phone solution the content and code projects are already split up for you, bear this in mind for the next step.

![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_1C5ABF7C.png)

Now copy over the Engine Folder from your current Startrooper game to the code project and then copy over the class files beginning with StarTrooper (StarTrooperGame, StarTrooperSprites and StarTrooperBackground).

Finally copy over the Pictures, Music and Sounds folders from the content project in the original project and paste them into the Content Project of the Phone Game (making sure to select the content project and not the code project!!)

You should now have a solution made up like the following:

![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_1CF28E32.png)

* * *

### Updates for Windows Phone 7

Now straight off the bat, if you build the project there will be several errors logged, fear no though as this is to be expected.

Now with any upgrade project, I have always found it easier to do the conversion myself as you can ensure you know exactly what changes are required, to that first we need to update the default “Game1.cs” class with our engine and setup code from the StarTrooperGame.CS

 

This is broken down into the following steps:

1. Copy the InternalUpdate and LoadResources functions to the end of the Game1.cs
2. Copy the base attributes
3. Copy the constructor updates
4. Apply the update from the previous post for the graphics buffer.
5. Finally copy the additional code from the update and draw functions 

What you should end up with is the following.

    
    
         1: using System;
    
    
    
         2: using System.Collections.Generic;
    
    
    
         3: using System.Linq;
    
    
    
         4: using Microsoft.Xna.Framework;
    
    
    
         5: using Microsoft.Xna.Framework.Audio;
    
    
    
         6: using Microsoft.Xna.Framework.Content;
    
    
    
         7: using Microsoft.Xna.Framework.GamerServices;
    
    
    
         8: using Microsoft.Xna.Framework.Graphics;
    
    
    
         9: using Microsoft.Xna.Framework.Input;
    
    
    
         10: using Microsoft.Xna.Framework.Input.Touch;
    
    
    
         11: using Microsoft.Xna.Framework.Media;
    
    
    
         12: 
    
    
    
         13: namespace XNAStarTrooper2D\_Phone7
    
    
    
         14: {
    
    
    
         15: /// \<summary\>
    
    
    
         16: /// This is the main type for your game
    
    
    
         17: /// \</summary\>
    
    
    
         18: public class Game1 : Microsoft.Xna.Framework.Game
    
    
    
         19: {
    
    
    
         20: public static GraphicsDeviceManager graphics;
    
    
    
         21: public static SpriteBatch spriteBatch;
    
    
    
         22: 
    
    
    
         23: //Game management related properties
    
    
    
         24: static List\<Sprite\> m\_Sprites = new List\<Sprite\>();
    
    
    
         25: static List\<Sprite\> m\_ZOrderedSprites = new List\<Sprite\>();
    
    
    
         26: static List\<Sprite\> m\_DeletedSprites = new List\<Sprite\>();
    
    
    
         27: static List\<Sprite\> m\_AddedSprites = new List\<Sprite\>();
    
    
    
         28: 
    
    
    
         29: static List\<Text2D\> m\_Text2Ds = new List\<Text2D\>();
    
    
    
         30: static List\<Text2D\> m\_DeletedText2Ds = new List\<Text2D\>();
    
    
    
         31: static List\<Text2D\> m\_AddedText2Ds = new List\<Text2D\>();
    
    
    
         32: 
    
    
    
         33: 
    
    
    
         34: 
    
    
    
         35: static List\<SoundEffect\> m\_Sounds = new List\<SoundEffect\>();
    
    
    
         36: static List\<SoundEffectInstance\> m\_Music = new List\<SoundEffectInstance\>();
    
    
    
         37: 
    
    
    
         38: 
    
    
    
         39: 
    
    
    
         40: private const int TargetFrameRate = 60;
    
    
    
         41: private const int m\_BackBufferWidth = 480;
    
    
    
         42: private const int m\_BackBufferHeight = 800;
    
    
    
         43: 
    
    
    
         44: public static Trooper Trooper;
    
    
    
         45: public static Condor Condor;
    
    
    
         46: 
    
    
    
         47: 
    
    
    
         48: Random m\_Random = new Random();
    
    
    
         49: 
    
    
    
         50: 
    
    
    
         51: public Game1()
    
    
    
         52: {
    
    
    
         53: graphics = new GraphicsDeviceManager(this);
    
    
    
         54: Content.RootDirectory = "Content";
    
    
    
         55: 
    
    
    
         56: // Frame rate is 30 fps by default for Windows Phone.
    
    
    
         57: TargetElapsedTime = TimeSpan.FromTicks(333333);
    
    
    
         58: 
    
    
    
         59: // Pre-autoscale settings.
    
    
    
         60: graphics.PreferredBackBufferWidth = m\_BackBufferWidth;
    
    
    
         61: graphics.PreferredBackBufferHeight = m\_BackBufferHeight;
    
    
    
         62: }
    
    
    
         63: 
    
    
    
         64: /// \<summary\>
    
    
    
         65: /// Allows the game to perform any initialization it needs to before starting to run.
    
    
    
         66: /// This is where it can query for any required services and load any non-graphic
    
    
    
         67: /// related content. Calling base.Initialize will enumerate through any components
    
    
    
         68: /// and initialize them as well.
    
    
    
         69: /// \</summary\>
    
    
    
         70: protected override void Initialize()
    
    
    
         71: {
    
    
    
         72: // TODO: Add your initialization logic here
    
    
    
         73: 
    
    
    
         74: base.Initialize();
    
    
    
         75: }
    
    
    
         76: 
    
    
    
         77: /// \<summary\>
    
    
    
         78: /// LoadContent will be called once per game and is the place to load
    
    
    
         79: /// all of your content.
    
    
    
         80: /// \</summary\>
    
    
    
         81: protected override void LoadContent()
    
    
    
         82: {
    
    
    
         83: // Create a new SpriteBatch, which can be used to draw textures.
    
    
    
         84: spriteBatch = new SpriteBatch(GraphicsDevice);
    
    
    
         85: 
    
    
    
         86: // TODO: use this.Content to load your game content here
    
    
    
         87: 
    
    
    
         88: LoadResources();
    
    
    
         89: 
    
    
    
         90: }
    
    
    
         91: 
    
    
    
         92: /// \<summary\>
    
    
    
         93: /// UnloadContent will be called once per game and is the place to unload
    
    
    
         94: /// all content.
    
    
    
         95: /// \</summary\>
    
    
    
         96: protected override void UnloadContent()
    
    
    
         97: {
    
    
    
         98: // TODO: Unload any non ContentManager content here
    
    
    
         99: }
    
    
    
        100: 
    
    
    
        101: /// \<summary\>
    
    
    
        102: /// Allows the game to run logic such as updating the world,
    
    
    
        103: /// checking for collisions, gathering input, and playing audio.
    
    
    
        104: /// \</summary\>
    
    
    
        105: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
    
    
    
        106: protected override void Update(GameTime gameTime)
    
    
    
        107: {
    
    
    
        108: // Allows the game to exit
    
    
    
        109: if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
    
    
    
        110: this.Exit();
    
    
    
        111: 
    
    
    
        112: // TODO: Add your update logic here
    
    
    
        113: InternalUpdate(); // \<- Added Sprite update function here
    
    
    
        114: 
    
    
    
        115: base.Update(gameTime);
    
    
    
        116: }
    
    
    
        117: 
    
    
    
        118: /// \<summary\>
    
    
    
        119: /// This is called when the game should draw itself.
    
    
    
        120: /// \</summary\>
    
    
    
        121: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
    
    
    
        122: protected override void Draw(GameTime gameTime)
    
    
    
        123: {
    
    
    
        124: GraphicsDevice.Clear(Color.CornflowerBlue);
    
    
    
        125: 
    
    
    
        126: // TODO: Add your drawing code here
    
    
    
        127: m\_ZOrderedSprites.Sort(Sprite.ComparisonZOrder);// \<- Added Sprite draw code here
    
    
    
        128: 
    
    
    
        129: foreach (Sprite s in m\_ZOrderedSprites)
    
    
    
        130: s.Draw(gameTime, spriteBatch);
    
    
    
        131: 
    
    
    
        132: foreach (Text2D t in m\_Text2Ds)
    
    
    
        133: t.Draw(gameTime, spriteBatch); 
    
    
    
        134: 
    
    
    
        135: base.Draw(gameTime);
    
    
    
        136: }
    
    
    
        137: 
    
    
    
        138: void InternalUpdate()
    
    
    
        139: {
    
    
    
        140: foreach (Sprite s in m\_AddedSprites)
    
    
    
        141: {
    
    
    
        142: m\_Sprites.Add(s);
    
    
    
        143: m\_ZOrderedSprites.Add(s);
    
    
    
        144: }
    
    
    
        145: m\_AddedSprites.Clear();
    
    
    
        146: 
    
    
    
        147: foreach (Sprite s in m\_DeletedSprites)
    
    
    
        148: {
    
    
    
        149: m\_Sprites.Remove(s);
    
    
    
        150: m\_ZOrderedSprites.Remove(s);
    
    
    
        151: }
    
    
    
        152: m\_DeletedSprites.Clear();
    
    
    
        153: 
    
    
    
        154: foreach (Sprite s in m\_Sprites)
    
    
    
        155: s.InternalUpdate();
    
    
    
        156: 
    
    
    
        157: foreach (Sprite s in m\_Sprites)
    
    
    
        158: s.Update();
    
    
    
        159: 
    
    
    
        160: 
    
    
    
        161: foreach (Text2D t in m\_AddedText2Ds)
    
    
    
        162: m\_Text2Ds.Add(t);
    
    
    
        163: m\_AddedText2Ds.Clear();
    
    
    
        164: 
    
    
    
        165: foreach (Text2D t in m\_DeletedText2Ds)
    
    
    
        166: m\_Text2Ds.Remove(t);
    
    
    
        167: m\_DeletedText2Ds.Clear();
    
    
    
        168: 
    
    
    
        169: foreach (Text2D t in m\_Text2Ds)
    
    
    
        170: t.InternalUpdate();
    
    
    
        171: 
    
    
    
        172: }
    
    
    
        173: 
    
    
    
        174: public void LoadResources()
    
    
    
        175: {
    
    
    
        176: 
    
    
    
        177: #region Background
    
    
    
        178: //Type the code here to add the background to the game.
    
    
    
        179: 
    
    
    
        180: Texture2D background = Content.Load\<Texture2D\>(@"Pictures\background");
    
    
    
        181: 
    
    
    
        182: Background bg = new Background(background);
    
    
    
        183: 
    
    
    
        184: bg.Position = new Vector2(0, m\_BackBufferHeight / 2);
    
    
    
        185: bg.ScaleX = BackBufferWidth / (float)background.Width;
    
    
    
        186: bg.ScaleY = BackBufferHeight / (float)background.Height;
    
    
    
        187: bg.ZOrder = 10;
    
    
    
        188: 
    
    
    
        189: m\_AddedSprites.Add(bg);
    
    
    
        190: 
    
    
    
        191: Background bg2 = (Background)bg.Clone();
    
    
    
        192: bg2.Position = new Vector2(0, -BackBufferHeight / 2);
    
    
    
        193: bg2.ScaleX = BackBufferWidth / background.Width;
    
    
    
        194: bg2.ScaleY = BackBufferHeight / background.Height;
    
    
    
        195: bg2.ZOrder = 10;
    
    
    
        196: 
    
    
    
        197: m\_AddedSprites.Add(bg2);
    
    
    
        198: 
    
    
    
        199: #endregion
    
    
    
        200: 
    
    
    
        201: #region Trooper
    
    
    
        202: //Type the code here to add the Trooper sprite.
    
    
    
        203: Trooper trooper = new Trooper(Content.Load\<Texture2D\>(@"Pictures\TrooperSpritesheet"), 6, true);
    
    
    
        204: trooper.Position = new Vector2(BackBufferWidth / 2, BackBufferHeight - 50);
    
    
    
        205: m\_AddedSprites.Add(trooper);
    
    
    
        206: 
    
    
    
        207: Trooper = trooper;
    
    
    
        208: #endregion
    
    
    
        209: 
    
    
    
        210: #region Condor
    
    
    
        211: //Type the code here to add the Condor sprite.
    
    
    
        212: Condor condor = new Condor();
    
    
    
        213: 
    
    
    
        214: Animation condorAnimation = new Animation(Content.Load\<Texture2D\>(@"Pictures\CondorSpritesheet"), 4);
    
    
    
        215: 
    
    
    
        216: condorAnimation.Play();
    
    
    
        217: condorAnimation.Loop = true;
    
    
    
        218: 
    
    
    
        219: int[] ExplosionDelay = { 4, 3, 4 };
    
    
    
        220: Animation condorExplosion = new Animation(Content.Load\<Texture2D\>(@"Pictures\CondorExplosionSpritesheet"), 3, ExplosionDelay);
    
    
    
        221: 
    
    
    
        222: condorExplosion.Play();
    
    
    
        223: 
    
    
    
        224: condor.AddAnimation(condorAnimation);
    
    
    
        225: condor.AddAnimation(condorExplosion);
    
    
    
        226: Condor = condor;
    
    
    
        227: 
    
    
    
        228: #endregion
    
    
    
        229: }
    
    
    
        230: 
    
    
    
        231: #region Properties
    
    
    
        232: public static float BackBufferWidth { get { return (float)m\_BackBufferWidth ;} }
    
    
    
        233: public static float BackBufferHeight { get { return (float)m\_BackBufferHeight ;} }
    
    
    
        234: #endregion
    
    
    
        235: 
    
    
    
        236: }
    
    
    
        237: }
    
    
    
     
    
    
    
    You may note that I have left the Graphics backbuffer values to the default for windows phones, this is better to leave this for now since the phone project is separate.
    
    
    
    Last job to ensure the project is cleaned up and tidy.  Delete the original “StarTrooperGame.cs” file and then Rename “Game1.cs” to “StarTrooperGame.cs”.
    
    
    
    This will keep the main tutorial and the Windows Phone project in line with code changes.
    
    
    
     
    
    
    * * *
    
    
     
    
    
    ### Final Changes
    
    
    If you compile the project now you will notice that there are still errors, this is down to the “ICloneable” interface not being available for Windows Phone Projects, not to fear though as the project can live without it (The ICloneable interface just gives a standard implementation for Cloning objects)
    
    
    
    SO we need to update the Sprite and Animation classes and remove their iCloneable interface references, from:
    
    
    
        
        
             1: public class Sprite : ICloneable
        
        
        
             2: 
        
        
        
             3: public class Animation : iCloneable
        
        
        
        To:
        
        
        
            
            
                 1: public class Sprite
            
            
            
                 2: 
            
            
            
                 3: public class Animation
            
            
            
             
            
            
            * * *
            
            
            And that is it, if you run the project you should now see the game running happily in the Windows Phone Emulator.
            
            
            
             
            
            
            
            ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_7D2B669E.png)
            
            
            
            Final code for this intermission can be [found here](http://startrooper2dxna.codeplex.com/releases/44143/download/123170).
            
            
            
            
            
            
            ### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)
            
            Laters, next on to Lesson 5 – Transformation and Collision of Sprites
        
        
    
    

