---
layout: post
title: 'MonoGame: Building Portable Solutions'
date: 2013-05-19 22:50:41
tags: [monogame]
---

![src=]()

In one of my [previous articles](http://darkgenesis.zenithmoon.com/monogame-goes-portable/ "MonoGame goes Portable") I talked about how [MonoGame](http://monogame.net/) could be used with portable libraries, this was off the back of some work I was doing with the MonoGame team to help with some of the more tedious clean up tasks that needed doing and I had the time.

Back then it was more of a dream, today it is becoming a reality.

> ###### \*Note
> 
> **At the time of writing it seems that Microsoft has not implemented PCL support from the Visual Studio Express editions as they are aimed at single platform support only, if you do not have access to a PRO edition or above, then I recommend you use XAMARIN studio for now.**
> 
> ### If you would like to see PCL support in the VS express editions, then vote with a [click over on UserVoice](http://visualstudio.uservoice.com/forums/121579-visual-studio/suggestions/3230383-add-the-ability-to-create-portable-libraries-in-vi)

* * *


# Why go Portable?

![src=]()

Now I waffled on about the theory [last time](http://darkgenesis.zenithmoon.com/monogame-goes-portable/) for what Portable (or PCL – Portable Class Libraries) can offer with frameworks like MonoGame, especially when you want to take you are project to as many platforms as possible, the main thing you want to achieve is to only have to put into a specific platforms project that which is native to that platform and keep everything else simple and in one place.

So with this tutorial I will walk you through the practice of what it takes to go portable and what it can do for you.

 

Two main things come to mind as to why you should use a PCL project for the core logic and state of your game projects are:

> ![](assets/img/posts/image-not-found.png)    One core project that contains all code that is completely compatible for all platforms, changes are validated by the project instead of at build time  
> ![](assets/img/posts/image-not-found.png)    One library for all platforms instead of separate platform libraries to share code, only have to make a change once, especially useful if you add or remove classes from the core project

 

* * *


# Starter for 10

![src=]()

I will start with [the sample](http://lightningdemo.codeplex.com/releases/view/101372) I have used for several of my previous tutorials so that you are familiar with what we have to use, so download the code drop for [stage 3 in the previous shocking tutorials here](http://lightningdemo.codeplex.com/releases/view/101372).

> \*Note, yes there is a portable version on the lightning demo codeplex site but it is out of date with the current works, so ignore that one for now.

What you will find in the source is a project which currently looks like this:

[![image](/assets/img/wordpress/2013/05/image38.png "image")](/assets/img/wordpress/2013/05/image39.png)

What we want to get to is a project that looks more like this:

[![image](/assets/img/wordpress/2013/05/image39.png "image")](/assets/img/wordpress/2013/05/image40.png)

* * *


# Setting up your environment

![src=]()

Creating and using PCL projects are simple enough so long as you have the right tools to hand:

> ###### \*Note
> 
> **At the time of writing it seems that Microsoft has not implemented PCL support from the Visual Studio Express editions as they are aimed at single platform support only, if you do not have access to a PRO edition or above, then I recommend you use XAMARIN studio for now****.**
> 
> ### If you would like to see PCL support in the VS express editions, then vote with a [click over on UserVoice](http://visualstudio.uservoice.com/forums/121579-visual-studio/suggestions/3230383-add-the-ability-to-create-portable-libraries-in-vi)

> ##### ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2010 (Pro & above only ![Sad smile](/assets/img/wordpress/2013/05/wlEmoticon-sadsmile.png))
> 
> Studio 2010 does not have PCL support by default so you need to install it first, just launch NuGet and search for “Portable Library Tools” and you should locate Microsoft’s Portable Library Tools 2 package, install it and you are ready to go.
> 
> If you have not got NuGet yet, then install this [VSIX (visual Studio Extension) package](http://visualstudiogallery.msdn.microsoft.com/27077b70-9dad-4c64-adcf-c7cf6bc9970c) and then “goto 1”
> 
> ##### ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2012 (Pro & above only ![Sad smile](/assets/img/wordpress/2013/05/wlEmoticon-sadsmile.png))
> 
> Thankfully VS 2012 already comes with PCL support out of the box so you are ready to go.
> 
> ##### ![align=](assets/img/posts/image-not-found.png)    Xamarin Studio
> 
> From  version 4.03, PCL projects have been supported natively in Xamarin Studio

Lastly you will need a copy of the current version of MonoGame.Portable, you can either download the [current compiled DLL](https://lightningdemo.codeplex.com/releases/view/106819 "MonoGame.Portable build 2013-05-19") here, or just clone my [MonoGame.Portable branch](https://github.com/DDReaper/MonoGame/tree/develop.portable) in my MonoGame fork (if / when the PR is merged into the main MonoGame source, I’ll update the above links accordingly) and build it yourself.

* * *


# Starting Fresh

![src=]()

To keep things simple lets just start a new project and re-use all the code from the above sample, we will even re-use the existing content builder project to keep it simple.

So to start off by creating a new MonoGame project of your choosing. Myself I am going to keep it simple and create a WindowsGL project. (In Xamarin Studio ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile2.png)), you can also do the same in Visual Studio as well the steps are the same.

> \*Note If you have not done so already and are using Xamarin Studio, be sure to grab the Xamarin Studio add-on for the [MonoGame templates here](http://monogame.codeplex.com/releases/view/102870) (also available for MonoDevelop if that is your fancy)

[![image](/assets/img/wordpress/2013/05/image35.png "image")](/assets/img/wordpress/2013/05/image36.png)

That’ll get you a brand new MonoGame Project, next up lets add a Portable Library to the mix for our Engine, so add a new Project using the “Portable” template (in the C# folder or search for portable)

[![image](/assets/img/wordpress/2013/05/image36.png "image")](/assets/img/wordpress/2013/05/image37.png)

Just give the new PCL (Engine) library a simple name, in this case I have named it “Lightning.Engine”.

Next we will add our original engine code into the portable library, so copy these over from the previous sample and then rename the namespaces in each class to “Lightning.Engine” to match our project:

[![image](/assets/img/wordpress/2013/05/image37.png "image")](/assets/img/wordpress/2013/05/image38.png)

Now if you build the Engine project at present you will get a whole load of build errors.

At this point you might think “well I have my PCL library, why do not I just use one of my existing MonoGame references?”, as well you should but just try it and see. You will either get:

> ![align=](assets/img/posts/image-not-found.png)    No Error and No Reference added  
> ![align=](assets/img/posts/image-not-found.png)    No Error but the reference will be added  
> ![align=](assets/img/posts/image-not-found.png)    You’re development environment will through a wobbly and probably just crash (with or without an error)

None of which will result in a project that will build, in fact in the second case above you might think it has worked but basically, it did not ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile2.png), the answer is of course to have a PCL compatible DLL to add, namely in this case MonoGame.Portable.

So by either adding MonoGame.Portable to the solution as source and mapping a reference to it from the engine PCL library (AND ONLY the Engine library, not the platform), or by referencing the DLL from the [download above](https://lightningdemo.codeplex.com/releases/view/106819 "MonoGame.Portable build 2013-05-19") in the Engine Library you should now be able to build the engine Lib.

> \*Note – well with one exception ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile2.png), Linq in a PCL does not have the “.Find” extension, so simply replace this with “.FirstOrDefault”

* * *


# Getting on with the Game

![src=]()

OK, so having our logic in a separate lib is nice but what about the rest of the game, well let’s take this a bit further then.  Copy over the original “Game.cs” class and embed that into the library as well and for good measure and rename it to something more meaningful for our engine like “LightningGame.cs”.

To use our core game code in a PCL however (or any separate lib for that matter) there are a few things we need to take into account, first and foremost (to quote Highlander), “There can be only ONE”, or in the case of XNA and MonoGame, there can only be one class in our game solution using the XNA GAME class as its base.

To this end we need to:

> ![align=](assets/img/posts/image-not-found.png)    Remove the base class from our game class  
> ![align=](assets/img/posts/image-not-found.png)    Remove any functions that initialise the graphics device (that’s up to the platform)  
> ![align=](assets/img/posts/image-not-found.png)    Remove any “override” statements, since this class is not inheriting anymore  
> ![align=](assets/img/posts/image-not-found.png)    Alter the scope of methods that need to be initialised or called (or add new ones) e.g Protected –\> Public or Internal  
> ![align=](assets/img/posts/image-not-found.png)    Satisfy any framework dependencies that are required for the class to function. e.g. if GraphicsDevice  is used, which was part of the base game class)

As an example here is a side by side comparison of the updates I made to make the old game code ready for the PCL

| 

     public class Game1 : Game {

 | 

     public class LightningGame { Game game; public LightningGame(Game game) { this.game = game;

 |
| Old Game class inheriting from XNA Game | New Game class with no inheritance but has a constructor that takes an XNA Game class as a parameter and stores it in a private variable |
| 

    public Game1() { graphics = new GraphicsDeviceManager(this); Content.RootDirectory = "Content"; IsMouseVisible = true; graphics.PreferredBackBufferWidth = 1280; graphics.PreferredBackBufferHeight = 720; }

 | 

    public LightningGame(Game game) { this.game = game; }

 |
| Old game class constructor | New game constructor, note does not initialise graphics now, that is the job of the platform |
| 

    protected override void LoadContent()

 | 

    public void LoadContent(ContentManager Content)

 |
| Old style XNA override from the XNA Game class implementation | Updated methods whose scope has changed and accept the relevant types needed to perform function. |
| 

    spriteBatch = new SpriteBatch(GraphicsDevice); Point screenSize = new Point( GraphicsDevice.Viewport.Width, GraphicsDevice.Viewport.Height); lastFrame = new RenderTarget2D( GraphicsDevice, screenSize.X, screenSize.Y, false, SurfaceFormat.HdrBlendable, DepthFormat.None);

 | 

    spriteBatch = new SpriteBatch(game.GraphicsDevice); Point screenSize = new Point( game.GraphicsDevice.Viewport.Width, game.GraphicsDevice.Viewport.Height); lastFrame = new RenderTarget2D( game.GraphicsDevice, screenSize.X, screenSize.Y, false, SurfaceFormat.Color, DepthFormat.None);

 |
| Old style class using XNA dependancies from Game base class, like GraphicsDevice | Updated functions deriving the necessary types from the game class sent with the constructor |

Once you have finished updating the new game style class in the PCL should look like this: (note I also added a few bits from the Win 8 solution to cope with touch and multi-touch)

    #region Using Statements using System.Collections.Generic; using System.Linq; using Microsoft.Xna.Framework; using Microsoft.Xna.Framework.Content; using Microsoft.Xna.Framework.Graphics; using Microsoft.Xna.Framework.Input; using Microsoft.Xna.Framework.Input.Touch; #endregion namespace Lightning.Engine { /// \<summary\> /// This is the main type for your game /// \</summary\> public class LightningGame { enum Mode { SimpleLightning, BranchLightning, LightningText } Mode mode; GraphicsDeviceManager graphics; SpriteBatch spriteBatch; Game game; SpriteFont lightningFont, infoFont; KeyboardState keyState, lastKeyState; MouseState mouseState, lastMouseState; TouchCollection touches, previousTouches; List\<ILightning\> bolts = new List\<ILightning\>(); LightningText lightningText; RenderTarget2D lastFrame, currentFrame; public LightningGame(Game game) { this.game = game; } /// \<summary\> /// Allows the game to perform any initialization it needs to before starting to run. /// This is where it can query for any required services and load any non-graphic /// related content. Calling base.Initialize will enumerate through any components /// and initialize them as well. /// \</summary\> public void Initialize() { // TODO: Add your initialization logic here } /// \<summary\> /// LoadContent will be called once per game and is the place to load /// all of your content. /// \</summary\> public void LoadContent(ContentManager Content) { // Create a new SpriteBatch, which can be used to draw textures. spriteBatch = new SpriteBatch(game.GraphicsDevice); lightningFont = Content.Load\<SpriteFont\>("LightningFont"); infoFont = Content.Load\<SpriteFont\>("InfoFont"); Point screenSize = new Point(game.GraphicsDevice.Viewport.Width, game.GraphicsDevice.Viewport.Height); lastFrame = new RenderTarget2D(game.GraphicsDevice, screenSize.X, screenSize.Y, false, SurfaceFormat.Color, DepthFormat.None); currentFrame = new RenderTarget2D(game.GraphicsDevice, screenSize.X, screenSize.Y, false, SurfaceFormat.Color, DepthFormat.None); // Initialize lastFrame to be solid black game.GraphicsDevice.SetRenderTarget(lastFrame); game.GraphicsDevice.Clear(Color.Black); game.GraphicsDevice.SetRenderTarget(null); Art.Load(Content); lightningText = new LightningText(game.GraphicsDevice, spriteBatch, lightningFont, "Lightning"); } /// \<summary\> /// UnloadContent will be called once per game and is the place to unload /// all content. /// \</summary\> public void UnloadContent() { // TODO: Unload any non ContentManager content here } /// \<summary\> /// Allows the game to run logic such as updating the world, /// checking for collisions, gathering input, and playing audio. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> public void Update(GameTime gameTime) { // TODO: Add your update logic here lastKeyState = keyState; keyState = Keyboard.GetState(); lastMouseState = mouseState; mouseState = Mouse.GetState(); if (WasPressed(Keys.Space)) mode = (Mode)(((int)mode + 1) % 3); var screenSize = new Vector2(game.GraphicsDevice.Viewport.Width, game.GraphicsDevice.Viewport.Height); var mousePosition = new Vector2(mouseState.X, mouseState.Y); previousTouches = touches; touches = TouchPanel.GetState(); for (int i = 0; i \< touches.Count; i++) { if (touches.State != TouchLocationState.Pressed) { continue; } if (touches.Count == 1) { bolts.Add(new LightningBolt(screenSize / 2, touches.Position)); } else { if (i \> 0) bolts.Add(new LightningBolt(touches.Position, touches.Position)); } } switch (mode) { case Mode.SimpleLightning: if (WasClicked()) bolts.Add(new LightningBolt(screenSize / 2, mousePosition)); break; case Mode.BranchLightning: if (WasClicked()) bolts.Add(new BranchLightning(screenSize / 2, mousePosition)); break; case Mode.LightningText: lightningText.Update(); break; } foreach (var bolt in bolts) bolt.Update(); bolts = bolts.Where(x =\> !x.IsComplete).ToList(); } // return true if a key was pressed down this frame bool WasPressed(Keys key) { return keyState.IsKeyDown(key) && lastKeyState.IsKeyUp(key); } // return true if the left mouse button was clicked down this frame bool WasClicked() { return mouseState.LeftButton == ButtonState.Pressed && lastMouseState.LeftButton == ButtonState.Released; } /// \<summary\> /// This is called when the game should draw itself. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> public void Draw(GameTime gameTime) { // TODO: Add your drawing code here // The lightning text is drawn a bit differently due to our optimization with the render targets. if (mode == Mode.LightningText) DrawLightningText(); else DrawLightning(); spriteBatch.Begin(); spriteBatch.DrawString(infoFont, " + mode, new Vector2(5), Color.White); spriteBatch.DrawString(infoFont, "Press space to change mode", new Vector2(5, 30), Color.White); if (mode != Mode.LightningText) spriteBatch.DrawString(infoFont, "Click to make lightning", new Vector2(5, 55), Color.White); spriteBatch.End(); } void DrawLightningText() { game.GraphicsDevice.SetRenderTarget(currentFrame); game.GraphicsDevice.Clear(Color.Black); // draw our last frame at 96% of its original brightness spriteBatch.Begin(0, BlendState.Opaque, SamplerState.PointClamp, null, null); spriteBatch.Draw(lastFrame, Vector2.Zero, Color.White \* 0.96f); spriteBatch.End(); // draw the new lightning bolts spriteBatch.Begin(SpriteSortMode.Texture, BlendState.Additive); lightningText.Draw(); spriteBatch.End(); // draw currentFrame to the backbuffer game.GraphicsDevice.SetRenderTarget(null); spriteBatch.Begin(0, BlendState.Opaque, SamplerState.PointClamp, null, null); spriteBatch.Draw(currentFrame, Vector2.Zero, Color.White); spriteBatch.End(); Swap(ref currentFrame, ref lastFrame); } void DrawLightning() { game.GraphicsDevice.Clear(Color.Black); // we use SpriteSortMode.Texture to improve performance spriteBatch.Begin(SpriteSortMode.Texture, BlendState.Additive); foreach (var bolt in bolts) bolt.Draw(spriteBatch); spriteBatch.End(); } void Swap\<T\>(ref T a, ref T b) { T temp = a; a = b; b = temp; } } }

* * *


# Time for some Platform action

![src=]()

So now that our entire game is hosted within the PCL project, lets update our platform project to run it, here is where you really start to see the effort paying off, especially as you add more platforms to the mix.

> \*Note, do not forget to build and add your Content to your platform project to avoid the dreaded “Could not load Content” error ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile2.png), see my [previous post](http://darkgenesis.zenithmoon.com/monogame-content-projects-custom-model-types/) for how to build a content builder project using the original Lightning source, or (as I did) just use copy / use one of the existing projects in the Lightning source used by this tutorial

So opening up the Game1.cs file in the platform project we just need to initialise our engine and call it from the relevant methods:

| 

    GraphicsDeviceManager graphics; SpriteBatch spriteBatch; LightningGame lightningGame;

 |
| 

###### Add a property to store an instance of the game engine in the class properties
 |
| 

    public Game1() : base() { graphics = new GraphicsDeviceManager(this); Content.RootDirectory = "Content"; IsMouseVisible = true; graphics.PreferredBackBufferWidth = 1280; graphics.PreferredBackBufferHeight = 720; lightningGame = new LightningGame(this); }

 |
| 

###### Instantiate a new instance in the game constructor
 |
| 

    protected override void LoadContent() { // Create a new SpriteBatch, which can be used to draw textures. spriteBatch = new SpriteBatch(GraphicsDevice); // TODO: use this.Content to load your game content here lightningGame.LoadContent (Content); }

 |
| 

###### Get the engine to load it is content when the platform is loading content
 |
| 

    protected override void Update(GameTime gameTime) { if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape)) Exit(); // TODO: Add your update logic here lightningGame.Update (gameTime); base.Update(gameTime); }

 |
| 

###### Call the update class during update
 |
| 

    protected override void Draw(GameTime gameTime) { GraphicsDevice.Clear(Color.CornflowerBlue); // TODO: Add your drawing code here lightningGame.Draw (gameTime); base.Draw(gameTime); }

 |
| 

###### Finally tell the engine to draw in the XNA draw loop
 |

So now, implementing our game in each platform (in a very basic way) has been reduced to just 5 entries in our platform Game class.

Sure you could achieve something similar by using platform libraries but any change you make to the engine library could potentially break any of the platforms you support, with PCL projects you are guaranteed that all platforms will continue to work else the PCL project itself wo not build.

So now in each platform solution you can manage just what is needed for that platform, such as Share Contract and fly-outs on Windows 8, Notifications and NFC on Windows Phone plus whatever else they do on those other platforms (so shoot me I am not an Android or iOS expert)

* * *


# Going further

[![ src=]()](https://janoelknowsit.wordpress.com/tag/going-beyond/)

Now that is not the end of the story (although it is the end of this tutorial), you can go a lot further with PCL solutions and it is nice to note that PCL solutions can also reference other PCL solutions as well to expand what is the core of your project.

You can also add some abstraction in to the mix so you can plug-in / out your favourite other frameworks if you so wish.


#### Just keep that Core clean.

If you want to keep track of the different ways of building multi-platform / Cross platform solutions, keep an eye on my [presentation repository](https://github.com/DDReaper/DarkGenesisPresentations) where I will keep adding more code in the samples for use, alternatively there is a lot of work going on to clean up the samples for MonoGame in the [MonoGame Samples repo’s](https://github.com/DDReaper/MonoGame-Samples) so you will have another source of reference.

