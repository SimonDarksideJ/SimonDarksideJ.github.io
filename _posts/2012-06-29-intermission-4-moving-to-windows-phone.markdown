---
layout: post
title: 'Intermission #4 - Moving to Windows Phone'
date: 2012-06-29 10:31:55
tags: [2d tutorial, game development, xna]
---

No need to guess what this little section is about. Games on [Windows Phone 7](http://developer.windowsphone.com/).

For now this is going to be a side project to the main tutorial since XNA 4.0 and the Windows Phone 7 kit hasn't been fully released yet. So on with the show.

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

---

## Getting started

For the Windows Phone side of this tutorial you are going to need the [Windows Phone Development Kit](http://developer.windowsphone.com/windows-phone-7-series/) (The April refresh is the latest), this will download and install everything you need including:

- Visual Studio 2010 Express for Windows Phone
- XNA Studio 4.0
- Windows Phone 7 Emulator
- Silverlight for Windows Phone 7

Get them installed and started and you see the great new Visual studio 2010 interface now completely re-written in WPF.

---

## New project

Now exactly the same as before in this [earlier post](http://xna-uk.net/blogs/darkgenesis/archive/2010/06/04/intermission-3-updating-to-allow-for-changeable-resolution.aspx), you need to set up a new project, except this time you need to browse to the XNA Game Studio 4.0 section and select the "Windows Phone Game (4.0)" project.

I suggest calling the project "XNAStarTrooper2D_Phone7", select an appropriate folder and click OK, then you will be presented with a nice clean empty Phone solution.

First thing you should notice is that in a new phone solution the content and code projects are already split up for you, bear this in mind for the next step.

Now copy over the Engine Folder from your current Startrooper game to the code project and then copy over the class files beginning with StarTrooper (StarTrooperGame, StarTrooperSprites and StarTrooperBackground).

Finally copy over the Pictures, Music and Sounds folders from the content project in the original project and paste them into the Content Project of the Phone Game (making sure to select the content project and not the code project!!)

You should now have a solution made up like the following:

---

## Updates for Windows Phone 7

Now straight off the bat, if you build the project there will be several errors logged, fear no though as this is to be expected.

Now with any upgrade project, I've always found it easier to do the conversion myself as you can ensure you know exactly what changes are required, to that first we need to update the default "Game1.cs" class with our engine and setup code from the StarTrooperGame.CS

This is broken down into the following steps:

1. Copy the InternalUpdate and LoadResources functions to the end of the Game1.cs
2. Copy the base attributes
3. Copy the constructor updates
4. Apply the update from the previous post for the graphics buffer.
5. Finally copy the additional code from the update and draw functions

What you should end up with is the following.

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

namespace XNAStarTrooper2D_Phone7
{
    /// <summary>
    /// This is the main type for your game
    /// </summary>
    public class Game1 : Microsoft.Xna.Framework.Game
    {
        public static GraphicsDeviceManager graphics;
        public static SpriteBatch spriteBatch;

        //Game management related properties
        static List<Sprite> m_Sprites = new List<Sprite>();
        static List<Sprite> m_ZOrderedSprites = new List<Sprite>();
        static List<Sprite> m_DeletedSprites = new List<Sprite>();
        static List<Sprite> m_AddedSprites = new List<Sprite>();

        static List<Text2D> m_Text2Ds = new List<Text2D>();
        static List<Text2D> m_DeletedText2Ds = new List<Text2D>();
        static List<Text2D> m_AddedText2Ds = new List<Text2D>();

        static List<SoundEffect> m_Sounds = new List<SoundEffect>();
        static List<SoundEffectInstance> m_Music = new List<SoundEffectInstance>();

        private const int TargetFrameRate = 60;
        private const int m_BackBufferWidth = 480;
        private const int m_BackBufferHeight = 800;

        public static Trooper Trooper;
        public static Condor Condor;

        Random m_Random = new Random();

        public Game1()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";

            // Frame rate is 30 fps by default for Windows Phone.
            TargetElapsedTime = TimeSpan.FromTicks(333333);

            // Pre-autoscale settings.
            graphics.PreferredBackBufferWidth = m_BackBufferWidth;
            graphics.PreferredBackBufferHeight = m_BackBufferHeight;
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

            base.Initialize();
        }

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            // Create a new SpriteBatch, which can be used to draw textures.
            spriteBatch = new SpriteBatch(GraphicsDevice);

            // TODO: use this.Content to load your game content here

            LoadResources();

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
            InternalUpdate(); // <- Added Sprite update function here

            base.Update(gameTime);
        }

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            // TODO: Add your drawing code here
            m_ZOrderedSprites.Sort(Sprite.ComparisonZOrder);// <- Added Sprite draw code here

            foreach (Sprite s in m_ZOrderedSprites)
                s.Draw(gameTime, spriteBatch);

            foreach (Text2D t in m_Text2Ds)
                t.Draw(gameTime, spriteBatch);

            base.Draw(gameTime);
        }

        void InternalUpdate()
        {
            foreach (Sprite s in m_AddedSprites)
            {
                m_Sprites.Add(s);
                m_ZOrderedSprites.Add(s);
            }
            m_AddedSprites.Clear();

            foreach (Sprite s in m_DeletedSprites)
            {
                m_Sprites.Remove(s);
                m_ZOrderedSprites.Remove(s);
            }
            m_DeletedSprites.Clear();

            foreach (Sprite s in m_Sprites)
                s.InternalUpdate();

            foreach (Sprite s in m_Sprites)
                s.Update();

            foreach (Text2D t in m_AddedText2Ds)
                m_Text2Ds.Add(t);
            m_AddedText2Ds.Clear();

            foreach (Text2D t in m_DeletedText2Ds)
                m_Text2Ds.Remove(t);
            m_DeletedText2Ds.Clear();

            foreach (Text2D t in m_Text2Ds)
                t.InternalUpdate();

        }

        public void LoadResources()
        {

            #region Background
            //Type the code here to add the background to the game.

            Texture2D background = Content.Load<Texture2D>(@"Pictures\background");

            Background bg = new Background(background);

            bg.Position = new Vector2(0, m_BackBufferHeight / 2);
            bg.ScaleX = BackBufferWidth / (float)background.Width;
            bg.ScaleY = BackBufferHeight / (float)background.Height;
            bg.ZOrder = 10;

            m_AddedSprites.Add(bg);

            Background bg2 = (Background)bg.Clone();
            bg2.Position = new Vector2(0, -BackBufferHeight / 2);
            bg2.ScaleX = BackBufferWidth / background.Width;
            bg2.ScaleY = BackBufferHeight / background.Height;
            bg2.ZOrder = 10;

            m_AddedSprites.Add(bg2);

            #endregion

            #region Trooper
            //Type the code here to add the Trooper sprite.
            Trooper trooper = new Trooper(Content.Load<Texture2D>(@"Pictures\TrooperSpritesheet"), 6, true);
            trooper.Position = new Vector2(BackBufferWidth / 2, BackBufferHeight - 50);
            m_AddedSprites.Add(trooper);

            Trooper = trooper;
            #endregion

            #region Condor
            //Type the code here to add the Condor sprite.
            Condor condor = new Condor();

            Animation condorAnimation = new Animation(Content.Load<Texture2D>(@"Pictures\CondorSpritesheet"), 4);

            condorAnimation.Play();
            condorAnimation.Loop = true;

            int[] ExplosionDelay = { 4, 3, 4 };
            Animation condorExplosion = new Animation(Content.Load<Texture2D>(@"Pictures\CondorExplosionSpritesheet"), 3, ExplosionDelay);

            condorExplosion.Play();

            condor.AddAnimation(condorAnimation);
            condor.AddAnimation(condorExplosion);
            Condor = condor;

            #endregion
        }

        #region Properties
        public static float BackBufferWidth { get { return (float)m_BackBufferWidth ;}  }
        public static float BackBufferHeight { get { return (float)m_BackBufferHeight ;}  }
        #endregion

    }
}
```

You may note that I've left the Graphics backbuffer values to the default for windows phones, this is better to leave this for now since the phone project is separate.

Last job to ensure the project is cleaned up and tidy. Delete the original "StarTrooperGame.cs" file and then Rename "Game1.cs" to "StarTrooperGame.cs".

This will keep the main tutorial and the Windows Phone project in line with code changes.

---

## Final Changes

If you compile the project now you will notice that there are still errors, this is down to the "ICloneable" interface not being available for Windows Phone Projects, not to fear though as the project can live without it (The ICloneable interface just gives a standard implementation for Cloning objects)

SO we need to update the Sprite and Animation classes and remove their iCloneable interface references, from:

```csharp
public class Sprite : ICloneable

public class Animation : iCloneable
```

To:

```csharp
public class Sprite

public class Animation
```

---

And that's it, if you run the project you should now see the game running happily in the Windows Phone Emulator.

Final code for this intermission can be [found here](http://startrooper2dxna.codeplex.com/releases/44143/download/123170).

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

Laters, next on to Lesson 5 - Transformation and Collision of Sprites
