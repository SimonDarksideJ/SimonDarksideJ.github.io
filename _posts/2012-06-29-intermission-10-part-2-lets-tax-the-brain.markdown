---
layout: post
title: 'Intermission #10 - (Part 2) lets tax the brain'
date: 2012-06-29 11:22:49
tags: [2d tutorial, game development, xna]
---

Apologies, had to split the post due to some technical issues on the XNA-UK site, we're working hard to resolve that but for now, here's the continuation of the Intermission 10 post.

[Find part 1 here](/blogs/darkgenesis/archive/2010/07/30/intermission-10-lets-tax-the-brain.aspx)

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Putting it all in place

Now at the moment nothing happens and we still have a few errors showing up in our project so lets finish it up and get it running.

In the particle manager we need to update and add a few things:

- Replace all references to "ParticleEmitter" with "ParticleEffect" so we are using the new effect we have (mainly in all the pool declarations so that it is using the new effect generator)
- Replace statements that refer to "Active" with "isActive" (this is because I wanted to change Robin's code as little as possible, you could just rename the isActive in the particle classes to Active if you wished), this is mainly in the update and Draw functions
- Add a new variable at the start of the class just after the textures dictionary for "SpriteBatch m_batch;".  this just a quick way of getting access to the main game spritebatch without having to create another and pass this on to the Effect generator to draw the particles (since previously it was the manager that drew the particles)
- Alter the constructor for the Particle manager class like so (which accepts the sprite batch from the game class and stored it for use later):

```csharp
public ParticleManager(Game game, ref SpriteBatch batch)
  : base(game)
{
  m_batch = batch;
  // TODO: Construct any child components here
}

```

- Change the line in the update function from "penode.Item.Update(dt);" to "penode.Item.Update(gameTime);".   Again this was to accommodate Robin's code.
- Remove the Lines with "StarTrooperGame.spriteBatch.Begin" and "StarTrooperGame.spriteBatch.End" as we are now using the stored SpriteBatch reference
- lastly we remove the draw logic inside the ForEach loop for the emitters completely and replace it with (basically removing the "foreach (Particle p in pe.particles)" section):

```csharp
m_batch.Begin(SpriteSortMode.Texture, pe.SpriteBlendMode);

pe.Draw(m_textures[pe.TextureName],m_batch);
m_batch.End();

```

Almost done, that fixes up the particle manager but we still need to launch an effect.  So if you now open up the Game class and replace it with the following (Don't forget to rename  the namespace back to your your original projects namespace):

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Input.Touch;
using Microsoft.Xna.Framework.Media;
using Microsoft.Phone.Shell;

namespace TouchScreenPOC
{
    /// <summary>
    /// This is the main type for your game
    /// </summary>
    public class Game1 : Microsoft.Xna.Framework.Game
    {
        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;
        SpriteFont spriteFont;
        TouchCollection touches;

        public static ParticleManager ParticleManager;

        public Game1()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";

            // Frame rate is 30 fps by default for Windows Phone.
            TargetElapsedTime = TimeSpan.FromTicks(333333);

            // Pre-autoscale settings.
            graphics.PreferredBackBufferWidth = 480;
            graphics.PreferredBackBufferHeight = 800;

        }

        /// <summary>
        /// Allows the game to perform any initialization it needs to before starting to run.
        /// This is where it can query for any required services and load any non-graphic
        /// related content.  Calling base.Initialize will enumerate through any components
        /// and initialize them as well.
        /// </summary>
        protected override void Initialize()
        {
            // TODO: Add your initialization logic here
            spriteBatch = new SpriteBatch(GraphicsDevice);
            ParticleManager = new ParticleManager(this, ref spriteBatch);
            this.Components.Add(ParticleManager);

            base.Initialize();
        }

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            // Create a new SpriteBatch, which can be used to draw textures.
            spriteFont = Content.Load<SpriteFont>("SpriteFont1");
            // TODO: use this.Content to load your game content here
        }

        /// <summary>
        /// UnloadContent will be called once per game and is the place to unload
        /// all content.
        /// </summary>
        protected override void UnloadContent()
        {
            // TODO: Unload any non ContentManager content here
        }

        /// <summary>
        /// Allows the game to run logic such as updating the world,
        /// checking for collisions, gathering input, and playing audio.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Update(GameTime gameTime)
        {
            // Allows the game to exit
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
                this.Exit();

            // TODO: Add your update logic here
            touches = TouchPanel.GetState();

            foreach (TouchLocation t in touches)
            {
                switch (t.State)
                {
                    case TouchLocationState.Pressed:
                        InitiliseEffect(t.Position);
                        break;
                    case TouchLocationState.Moved:
                        break;
                    case TouchLocationState.Released:
                        break;
                    default:
                        break;
                }
            }
            base.Update(gameTime);
        }

        void InitiliseEffect(Vector2 Location)
        {
            ParticleEffectExample effect = new ParticleEffectExample();
            effect.Initialize(Location.X,Location.Y,1);
            effect.effectVelocity = new Vector2(0, 5);
            effect.effectAcceleration = new Vector2(0, 1f);
            ParticleManager.Add(effect);
        }

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            spriteBatch.Begin();
            // TODO: Add your drawing code here
            spriteBatch.DrawString(spriteFont, "Number of touches: " + touches.Count.ToString(), new Vector2(10,50), Color.White);
            foreach (TouchLocation t in touches)
            {
                spriteBatch.DrawString(spriteFont, t.Id + " : " + t.State + " : " + t.Position, t.Position + new Vector2(10,10), Color.White);
            }

            spriteBatch.End();
            base.Draw(gameTime);
        }
    }
}

```

Again simple enough stuff, most of it from the Touch implementation post and you can see the particle manager component added (although because of the spritebatch requirement, I had to move it to the initialise function after the SpriteBatch was initialised).  if a touch is recognised on the screen, it launches the "Initialise effect" function.

the initialise effect function (like the previous calls in the particle posts):

- Creates a new instance of the desired effect
- initialises it's location and start rotation (based on the touch location)
- In this case sets the velocity and acceleration of the effect (I just like to see it move, OK!!!)
- And finally adds the effect to the particle manager

For the final task, you should notice you are still missing two key components.  if you compile the project, it will compile, no errors right?, wrong.   Run the project and it will fall flat on it's face.  you still need the content you have specified in this project, namely the Spritefont and Explosion image.  Just grab these from the Windows Phone 7 or GS 3.1 tutorial projects and paste them in to the POC content project.

Compile again and click on the screen (Touch if you actually have either a phone or a touchscreen laptop you jammy dodgers) and you should see the effect show earlier.

* * *

### But wait there's more!!!!

Now when I ran this I wanted to know just how much of an impact doing procedural effects would be to the phone, best way to show this would be to show the frame rate.  Now in Silverlight, they have a little programming hook to do this.  Does this work for XNA, of course NOT....

So I wrote a handy FPS component that shows you the Updates per second (UPS) and the Draw calls per second (FPS).  Here's the code for it (not much there really, just another drawable component:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;

namespace TouchScreenPOC
{
    /// <summary>
    /// This is a game component that implements IUpdateable.
    /// </summary>
    public class FPSCounter : Microsoft.Xna.Framework.DrawableGameComponent
    {
        SpriteFont spriteFont;
        Vector2 FPSCounterLocation = new Vector2(300, 50);
        SpriteBatch m_spritebatch;

        float FPS;
        public FPSCounter(Game game, ref SpriteBatch spriteBatch)
            : base(game)
        {
            m_spritebatch = spriteBatch;
            // TODO: Construct any child components here
        }

        /// <summary>
        /// Allows the game component to perform any initialization it needs to before starting
        /// to run.  This is where it can query for any required services and load content.
        /// </summary>
        public override void Initialize()
        {
            // TODO: Add your initialization code here
            DrawOrder = 100;
            base.Initialize();
        }

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            // Create a new SpriteBatch, which can be used to draw textures.
            spriteFont = Game.Content.Load<SpriteFont>("SpriteFont1");
            // TODO: use this.Content to load your game content here
        }

        /// <summary>
        /// UnloadContent will be called once per game and is the place to unload
        /// all content.
        /// </summary>
        protected override void UnloadContent()
        {
            // TODO: Unload any non ContentManager content here
        }

        /// <summary>
        /// Allows the game component to update itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        public override void Update(GameTime gameTime)
        {
            // TODO: Add your update code here
            // The time since Update was called last
            float elapsed = (float)gameTime.ElapsedGameTime.TotalSeconds;

            FPS = 1 / elapsed;
            base.Update(gameTime);
        }

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        public override void Draw(GameTime gameTime)
        {
            m_spritebatch.Begin();
            // TODO: Add your drawing code here
            //Shows the amount of updates per second (updates per second)
            m_spritebatch.DrawString(spriteFont, "UPS: " + FPS.ToString(), FPSCounterLocation, Color.White);

            float elapsed = (float)gameTime.ElapsedGameTime.TotalSeconds;

            FPS = 1 / elapsed;
            //Shows the number of draw calls per frame (Frames per second)
            m_spritebatch.DrawString(spriteFont, "FPS: " + FPS.ToString(), FPSCounterLocation + new Vector2(0,20), Color.White);

            m_spritebatch.End();
            base.Draw(gameTime);
        }
    }
}
```

And to add it to the game just add the following line in the game initialise function just after the particle manager:

```csharp
this.Components.Add(new FPSCounter(this, ref spriteBatch));
```

One line, look at that and now I have an FPS counter (this was demo'ed back in Beta 1 of XNA and most people just went whoooooo), which you can add to any project.

* * *

### Conclusion

Well enough of all this fun stuff and back to some more serious topics, how about a little sound!.

Smashing Bully, You don't get anything in this game for two in a bed (So reminded of old 80's British game shows, name that show!!!)
