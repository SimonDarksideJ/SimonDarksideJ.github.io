---
layout: post
title: 'Intermission #10 - (Part 2) lets tax the brain'
date: '2012-06-29 11:22:49'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

Apologies, had to split the post do to some technical issues on teh XNA-UK site, were working hard to resolve that but fo rnow, here is the continuation of the Intermission 10 post.

[Find part 1 here](/blogs/darkgenesis/archive/2010/07/30/intermission-10-lets-tax-the-brain)

 

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

 

* * *

### Putting it all in place

Now at the moment nothing happens and we still have a few errors showing up in our project so lets finish it up and get it running.

In the particle manager we need to update and add a few things:

- Replace all references to “ParticleEmitter” with “ParticleEffect” so we are using the new effect we have (mainly in all the pool declarations so that it is using the new effect generator)
- Replace statements that refer to “Active” with “isActive” (this is because I wanted to change Robin’s code as little as possble, you could just rename the isActive in the particle classed to Active if you wished), this is mainly in the update and Draw functions
- Add a new variable at the start of the class just after the textures dictionary for “SpriteBatch m\_batch;”.  this just a quick way of getting access to the main game spritebatch without having to create another and pass this on to the Effect generator to draw the particles (since previously it was the manager that drew the particles)
- Alter the constructor for the Particle manager class like so (which accepts the sprite batch from the game class and stored it for use later): 

    
    
         1: public ParticleManager(Game game, ref SpriteBatch batch)
    
    
    
         2: : base(game)
    
    
    
         3: {
    
    
    
         4: m\_batch = batch;
    
    
    
         5: // TODO: Construct any child components here
    
    
    
         6: }
    
    
    
         7: 
    

- Change the line in the update function from “penode.Item.Update(dt);” to “penode.Item.Update(gameTime);”.   Again this was to accommodate Robin’s code.
- Remove the Lines with “StarTrooperGame.spriteBatch.Begin” and “StarTrooperGame.spriteBatch.End” as we are now using the stored SpriteBatch reference
- lastly we remove the draw logic inside the ForEach loop for the emitters completely and replace it with (basically removing the “foreach (Particle p in pe.particles)” section): 

 

    
    
         1: m\_batch.Begin(SpriteSortMode.Texture, pe.SpriteBlendMode);
    
    
    
         2: 
    
    
    
         3: pe.Draw(m\_textures[pe.TextureName],m\_batch);
    
    
    
         4: m\_batch.End();
    
    
    
         5: 
    
    
    
     
    
    
    
    Almost done, that fixes up the particle manager but we still need to launch an effect.  So if you now open up the Game class and replace it with the following (Do not forget to rename  the namespace back to your your original projects namespace):
    
    
    
     
    
    
    
        
        
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
        
        
        
             12: using Microsoft.Phone.Shell;
        
        
        
             13: 
        
        
        
             14: namespace TouchScreenPOC
        
        
        
             15: {
        
        
        
             16: /// \<summary\>
        
        
        
             17: /// This is the main type for your game
        
        
        
             18: /// \</summary\>
        
        
        
             19: public class Game1 : Microsoft.Xna.Framework.Game
        
        
        
             20: {
        
        
        
             21: GraphicsDeviceManager graphics;
        
        
        
             22: SpriteBatch spriteBatch;
        
        
        
             23: SpriteFont spriteFont;
        
        
        
             24: TouchCollection touches;
        
        
        
             25: 
        
        
        
             26: public static ParticleManager ParticleManager;
        
        
        
             27: 
        
        
        
             28: public Game1()
        
        
        
             29: {
        
        
        
             30: graphics = new GraphicsDeviceManager(this);
        
        
        
             31: Content.RootDirectory = "Content";
        
        
        
             32: 
        
        
        
             33: // Frame rate is 30 fps by default for Windows Phone.
        
        
        
             34: TargetElapsedTime = TimeSpan.FromTicks(333333);
        
        
        
             35: 
        
        
        
             36: // Pre-autoscale settings.
        
        
        
             37: graphics.PreferredBackBufferWidth = 480;
        
        
        
             38: graphics.PreferredBackBufferHeight = 800;
        
        
        
             39: 
        
        
        
             40: }
        
        
        
             41: 
        
        
        
             42: /// \<summary\>
        
        
        
             43: /// Allows the game to perform any initialization it needs to before starting to run.
        
        
        
             44: /// This is where it can query for any required services and load any non-graphic
        
        
        
             45: /// related content. Calling base.Initialize will enumerate through any components
        
        
        
             46: /// and initialize them as well.
        
        
        
             47: /// \</summary\>
        
        
        
             48: protected override void Initialize()
        
        
        
             49: {
        
        
        
             50: // TODO: Add your initialization logic here
        
        
        
             51: spriteBatch = new SpriteBatch(GraphicsDevice);
        
        
        
             52: ParticleManager = new ParticleManager(this, ref spriteBatch);
        
        
        
             53: this.Components.Add(ParticleManager);
        
        
        
             54: 
        
        
        
             55: base.Initialize();
        
        
        
             56: }
        
        
        
             57: 
        
        
        
             58: /// \<summary\>
        
        
        
             59: /// LoadContent will be called once per game and is the place to load
        
        
        
             60: /// all of your content.
        
        
        
             61: /// \</summary\>
        
        
        
             62: protected override void LoadContent()
        
        
        
             63: {
        
        
        
             64: // Create a new SpriteBatch, which can be used to draw textures.
        
        
        
             65: spriteFont = Content.Load\<SpriteFont\>("SpriteFont1");
        
        
        
             66: // TODO: use this.Content to load your game content here
        
        
        
             67: }
        
        
        
             68: 
        
        
        
             69: /// \<summary\>
        
        
        
             70: /// UnloadContent will be called once per game and is the place to unload
        
        
        
             71: /// all content.
        
        
        
             72: /// \</summary\>
        
        
        
             73: protected override void UnloadContent()
        
        
        
             74: {
        
        
        
             75: // TODO: Unload any non ContentManager content here
        
        
        
             76: }
        
        
        
             77: 
        
        
        
             78: /// \<summary\>
        
        
        
             79: /// Allows the game to run logic such as updating the world,
        
        
        
             80: /// checking for collisions, gathering input, and playing audio.
        
        
        
             81: /// \</summary\>
        
        
        
             82: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
        
        
        
             83: protected override void Update(GameTime gameTime)
        
        
        
             84: {
        
        
        
             85: // Allows the game to exit
        
        
        
             86: if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
        
        
        
             87: this.Exit();
        
        
        
             88: 
        
        
        
             89: // TODO: Add your update logic here
        
        
        
             90: touches = TouchPanel.GetState();
        
        
        
             91: 
        
        
        
             92: foreach (TouchLocation t in touches)
        
        
        
             93: {
        
        
        
             94: switch (t.State)
        
        
        
             95: {
        
        
        
             96: case TouchLocationState.Pressed:
        
        
        
             97: InitiliseEffect(t.Position);
        
        
        
             98: break;
        
        
        
             99: case TouchLocationState.Moved:
        
        
        
            100: break;
        
        
        
            101: case TouchLocationState.Released:
        
        
        
            102: break;
        
        
        
            103: default:
        
        
        
            104: break;
        
        
        
            105: }
        
        
        
            106: }
        
        
        
            107: base.Update(gameTime);
        
        
        
            108: }
        
        
        
            109: 
        
        
        
            110: void InitiliseEffect(Vector2 Location)
        
        
        
            111: {
        
        
        
            112: ParticleEffectExample effect = new ParticleEffectExample();
        
        
        
            113: effect.Initialize(Location.X,Location.Y,1);
        
        
        
            114: effect.effectVelocity = new Vector2(0, 5);
        
        
        
            115: effect.effectAcceleration = new Vector2(0, 1f);
        
        
        
            116: ParticleManager.Add(effect);
        
        
        
            117: }
        
        
        
            118: 
        
        
        
            119: /// \<summary\>
        
        
        
            120: /// This is called when the game should draw itself.
        
        
        
            121: /// \</summary\>
        
        
        
            122: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
        
        
        
            123: protected override void Draw(GameTime gameTime)
        
        
        
            124: {
        
        
        
            125: GraphicsDevice.Clear(Color.CornflowerBlue);
        
        
        
            126: spriteBatch.Begin();
        
        
        
            127: // TODO: Add your drawing code here
        
        
        
            128: spriteBatch.DrawString(spriteFont, "Number of touches: " + touches.Count.ToString(), new Vector2(10,50), Color.White);
        
        
        
            129: foreach (TouchLocation t in touches)
        
        
        
            130: {
        
        
        
            131: spriteBatch.DrawString(spriteFont, t.Id + " : " + t.State + " : " + t.Position, t.Position + new Vector2(10,10), Color.White);
        
        
        
            132: }
        
        
        
            133: 
        
        
        
            134: spriteBatch.End();
        
        
        
            135: base.Draw(gameTime);
        
        
        
            136: }
        
        
        
            137: }
        
        
        
            138: }
        
        
        
            139: 
        
        
        
         
        
        
        
        Again simple enough stuff, most of it from the Touch implementation post and you can see the particle manager component added (although because of the spritebatch requirement, I had to move it to the initialise function after the SpriteBatch was initialised).  if a touch is recognised on the screen, it launches the “Initialise effect” function.
        
        
        
        the initialise effect function (like the previous calls in the particle posts):
        
    
    

- Creates a new instance of the desired effect
- initialises it is location and start rotation (based on the touch location)
- In this case sets the velocity and acceleration of the effect (I just like to see it move, OK!!!)
- And finally adds the effect to the particle manager 

For the final task, you should notice you are still missing two key components.  if you compile the project, it will compile, no errors right?, wrong.   Run the project and it will fall flat on it is face.  you still need the content you have specified in this project, namely the Spritefont and Explosion image.  Just grab these from the Windows Phone 7 or GS 3.1 tutorial projects and paste them in to the POC content project.

Compile again and click on the screen (Touch if you actually have either a phone or a touchscreen laptop you jammy dodgers) and you should see the effect show earlier.

 

* * *

 

### But wait there’s more!!!!

Now when I ran this I wanted to know just how much of an impact doing procedural effects would be to the phone, best way to show this would be to show the frame rate.  Now in Silverlight, they have a little programming hook to do this.  Does this work for XNA, of course NOT….

So I wrote a handy FPS component that shows you the Updates per second (UPS) and the Draw calls per second (FPS).  Here’s the code for it (not much there really, just another drawable component:

    
    
         1: using System;
    
    
    
         2: using System.Collections.Generic;
    
    
    
         3: using System.Linq;
    
    
    
         4: using Microsoft.Xna.Framework;
    
    
    
         5: using Microsoft.Xna.Framework.Audio;
    
    
    
         6: using Microsoft.Xna.Framework.Content;
    
    
    
         7: using Microsoft.Xna.Framework.GamerServices;
    
    
    
         8: using Microsoft.Xna.Framework.Graphics;
    
    
    
         9: using Microsoft.Xna.Framework.Input;
    
    
    
         10: using Microsoft.Xna.Framework.Media;
    
    
    
         11: 
    
    
    
         12: 
    
    
    
         13: namespace TouchScreenPOC
    
    
    
         14: {
    
    
    
         15: /// \<summary\>
    
    
    
         16: /// This is a game component that implements IUpdateable.
    
    
    
         17: /// \</summary\>
    
    
    
         18: public class FPSCounter : Microsoft.Xna.Framework.DrawableGameComponent
    
    
    
         19: {
    
    
    
         20: SpriteFont spriteFont;
    
    
    
         21: Vector2 FPSCounterLocation = new Vector2(300, 50);
    
    
    
         22: SpriteBatch m\_spritebatch;
    
    
    
         23: 
    
    
    
         24: float FPS;
    
    
    
         25: public FPSCounter(Game game, ref SpriteBatch spriteBatch)
    
    
    
         26: : base(game)
    
    
    
         27: {
    
    
    
         28: m\_spritebatch = spriteBatch;
    
    
    
         29: // TODO: Construct any child components here
    
    
    
         30: }
    
    
    
         31: 
    
    
    
         32: /// \<summary\>
    
    
    
         33: /// Allows the game component to perform any initialization it needs to before starting
    
    
    
         34: /// to run. This is where it can query for any required services and load content.
    
    
    
         35: /// \</summary\>
    
    
    
         36: public override void Initialize()
    
    
    
         37: {
    
    
    
         38: // TODO: Add your initialization code here
    
    
    
         39: DrawOrder = 100;
    
    
    
         40: base.Initialize();
    
    
    
         41: }
    
    
    
         42: 
    
    
    
         43: /// \<summary\>
    
    
    
         44: /// LoadContent will be called once per game and is the place to load
    
    
    
         45: /// all of your content.
    
    
    
         46: /// \</summary\>
    
    
    
         47: protected override void LoadContent()
    
    
    
         48: {
    
    
    
         49: // Create a new SpriteBatch, which can be used to draw textures.
    
    
    
         50: spriteFont = Game.Content.Load\<SpriteFont\>("SpriteFont1");
    
    
    
         51: // TODO: use this.Content to load your game content here
    
    
    
         52: }
    
    
    
         53: 
    
    
    
         54: /// \<summary\>
    
    
    
         55: /// UnloadContent will be called once per game and is the place to unload
    
    
    
         56: /// all content.
    
    
    
         57: /// \</summary\>
    
    
    
         58: protected override void UnloadContent()
    
    
    
         59: {
    
    
    
         60: // TODO: Unload any non ContentManager content here
    
    
    
         61: }
    
    
    
         62: 
    
    
    
         63: /// \<summary\>
    
    
    
         64: /// Allows the game component to update itself.
    
    
    
         65: /// \</summary\>
    
    
    
         66: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
    
    
    
         67: public override void Update(GameTime gameTime)
    
    
    
         68: {
    
    
    
         69: // TODO: Add your update code here
    
    
    
         70: // The time since Update was called last
    
    
    
         71: float elapsed = (float)gameTime.ElapsedGameTime.TotalSeconds;
    
    
    
         72: 
    
    
    
         73: FPS = 1 / elapsed;
    
    
    
         74: base.Update(gameTime);
    
    
    
         75: }
    
    
    
         76: 
    
    
    
         77: /// \<summary\>
    
    
    
         78: /// This is called when the game should draw itself.
    
    
    
         79: /// \</summary\>
    
    
    
         80: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
    
    
    
         81: public override void Draw(GameTime gameTime)
    
    
    
         82: {
    
    
    
         83: m\_spritebatch.Begin();
    
    
    
         84: // TODO: Add your drawing code here
    
    
    
         85: //Shows the amount of updates per second (updates per second)
    
    
    
         86: m\_spritebatch.DrawString(spriteFont, "UPS: " + FPS.ToString(), FPSCounterLocation, Color.White);
    
    
    
         87: 
    
    
    
         88: 
    
    
    
         89: float elapsed = (float)gameTime.ElapsedGameTime.TotalSeconds;
    
    
    
         90: 
    
    
    
         91: FPS = 1 / elapsed;
    
    
    
         92: //Shows the number of draw calls per frame (Frames per second)
    
    
    
         93: m\_spritebatch.DrawString(spriteFont, "FPS: " + FPS.ToString(), FPSCounterLocation + new Vector2(0,20), Color.White);
    
    
    
         94: 
    
    
    
         95: 
    
    
    
         96: m\_spritebatch.End();
    
    
    
         97: base.Draw(gameTime);
    
    
    
         98: }
    
    
    
         99: }
    
    
    
        100: }
    
    
    
    And to add it to the game just add the following line in the game initialise function just after the particle manager:
    
    
    
     
    
    
    
        
        
             1: this.Components.Add(new FPSCounter(this, ref spriteBatch));
        
        
        
        One line, look at that and now I have an FPS counter (this was demo’ed back in Beta 1 of XNA and most people just went whoooooo), which you can add to any project.
        
        
        
         
        
        
        
         
        
        
        * * *
        
        
         
        
        
        
         
        
        
        ### Conclusion
        
        
        Well enough of all this fun stuff and back to some more serious topics, how about a little sound!.
        
        
        
        Smashing Bully, You do not get anything in this game for two in a bed (So reminded of old 80’s British game shows, name that show!!!)
        
        
        Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[Windows Phone 7 Development](http://technorati.com/tags/Windows+Phone+7+Development)
    
    

