---
layout: post
title: 'Intermission #1 - Welcome to XNA'
date: 2012-06-29 09:26:58
tags: [2d tutorial, game development, xna]
---

Right, before hitting the ground running with the rest of the DigiPen tutorial, you first need to know about this thing called XNA that we will be developing in. Sure I’ve discussed and pointed out what it is (nice friendly game programming framework) and I’ve gone over about game loops and all that other theory, but what does it all mean and how does it look.

So as a prelude to the coding part of the tutorial, I’ll walk you through

- Creating a new XNA project 
- Walkthrough all the components of the basic setup 
- Go through some recommendations and best practices 

Be sure you have downloaded and installed the following:

1. Visual studio with C#– either Express, professional or ultimate 
2. XNA Game Studio version for your version of VS (XNA 3 or below for VS2005, XNA 3.1 for 2008 and XNA 4.0 for VS 2010) 
3. Direct X runtime (you can get the full Direct X SDK if you wish but it is not essential). You may find you already have this installed as it comes with most modern games. 

Once you are setup then lets get on with the show

* * *


## 1. Creating a new XNA project

Starting off is pretty easy, start up your version of visual studio (does not matter what version really, all this is pretty much the same no matter what version you use, be it the express editions, professional or the new 2010 ultimate edition) and click in the menu bar “File –\> New –\> Project” (see below)

[![image[2]](/assets/img/wordpress/2012/07/image2.png "image\[2]")](/assets/img/wordpress/2012/07/image21.png)

From here you will be presented with the “New Project” wizard and providing you have also remembered to install your choice of XNA Game studio, you will see project templates for XNA, namely:

- Game templates for Windows / XBOX / Zune and Phone 7 (depending on the version of XNA GS you are using) 
- Game Library templates for all platforms 
- Starter kits, what you see will depend on which version of the XNA GS you installed and what you have downloaded and installed from the creators club site. As you can see below, The Platformer starter kit comes bundled with V3.1 

For this stage of the tutorial, select the Windows Game project to begin with. Enter a name for your your project and check the location is fine and click OK.

By default Visual Studio will create a new folder for your project to keep things tidy.

[![image[5]](/assets/img/wordpress/2012/07/image5.png "image\[5]")](/assets/img/wordpress/2012/07/image51.png)

Once your new project is setup, you should see the following in the solution explorer on the right hand side of the screen. The solution explorer is a tree like structure of your solution / project.

The Solution is the master container for your project, this becomes very useful when organising large scale or multi-platform projects to keep them all in one place, more on this later in the series.

[![image[8]](/assets/img/wordpress/2012/07/image8.png "image\[8]")](/assets/img/wordpress/2012/07/image81.png)

* * *


## 2. XNA Walkthrough

From the solution explorer above, you can see several items listed, some you do not need to worry about at this point like the properties and references, these are automatically setup for your project and we will go in to them a bit more later in the series.

As for the rest, here is what makes up your project.


### 2.1. Program.CS (option to incorporate in game.cs)

Every item you see in the solution with the extension “.CS” is a class file which usually contains a single class definition (refer to section 2 of the tutorial on the definition of a class).

The most important of these is the Program class which also contains the Main function. These are the start points of any C# program, the point where the application looks when you run it.

     using System; namespace TestProject { static class Program { /// \<summary\> /// The main entry point for the application. /// \</summary\> static void Main(string[] args) { using (Game1 game = new Game1()) { game.Run(); } } } }

From here it is told what to launch and what to do, without it your program wont compile (build in to an executable) and will not run because the program will not know where to start.

There are however a few schools of thought on where this class should live, some prefer to leave it as it is from the default project, some however like to copy the files contents and put them into another class file like the Game.CS (remember a class file can have multiple classes within it, but there can only be one Main function).

I prefer to leave it alone as I do not need to look around to find how my game starts also putting the Main function in with our game can cause problems later when we want to host our game in a framework of some kind (which we will also cover later).

So for this part of the tutorial, lets leave it alone and move on.


### 2.2. Game.CS

Game.CS is the default starting point for your game, it contains the Game1 class as referred to earlier in Program.CS. When the Main function is called by starting the application, it creates a new instance of your game and runs it.

At this point it is worth pointing out that Game.CS file and the Game1 class are just the default names given to this file (and class) by the template, it is worth renaming this at the beginning of your project to a more appropriate name. If you do rename the file, also remember to do a search and replace throughout your project to ensure everything still fits together.

- Using statements 

> using System; using System.Collections.Generic; using System.Linq; using Microsoft.Xna.Framework; using Microsoft.Xna.Framework.Audio; using Microsoft.Xna.Framework.Content; using Microsoft.Xna.Framework.GamerServices; using Microsoft.Xna.Framework.Graphics; using Microsoft.Xna.Framework.Input; using Microsoft.Xna.Framework.Media; using Microsoft.Xna.Framework.Net; using Microsoft.Xna.Framework.Storage;
> 
> Using statements tell each class what base functionality they have available by default. Above is the default list you get as part of the Game.CS file. It is worth noting you probably do not need every one of these for every class and it is better to on refer to those functions that you need, so if you are not planning on using audio in a particular class, then just omit that part of the XNA framework, it wo not stop you using it in another class.
> 
> Visual studio is very good at pointing out if you have missed a using statement at the beginning of your class by throwing a “class not found” or “Are you missing an assembly reference” error, these are both good examples that you have forgotten to tell the class to include something.

- Namespace 

> namespace StarTrooperXNA\_Windows
> 
> The namespace keyword is used to declare a scope. This namespace scope lets you organize code and gives you a way to create globally unique types.
> 
> Within a namespace, you can declare one or more of the following types:
> 
> - another namespace
> - [class](http://msdn.microsoft.com/en-us/library/0b0thckt)
> - [interface](http://msdn.microsoft.com/en-us/library/87d83y5b)
> - [struct](http://msdn.microsoft.com/en-us/library/ah19swz4)
> - [enum](http://msdn.microsoft.com/en-us/library/sbbt4032)
> - [delegate](http://msdn.microsoft.com/en-us/library/900fyy8e)
> 
> Whether or not you explicitly declare a namespace in a C# source file, the compiler adds a default namespace. This unnamed namespace, sometimes referred to as the global namespace, is present in every file. Any identifier in the global namespace is available for use in a named namespace.
> 
> Namespaces implicitly have public access and this is not modifiable. For a discussion of the access modifiers you can assign to elements in a namespace, see [Access Modifiers (C# Reference)](http://msdn.microsoft.com/en-us/library/wxh6fsc7).

- Class and base game class 

> /// \<summary\> /// This is the main type for your game /// \</summary\> public class Game1 : Microsoft.Xna.Framework.Game
> 
> The Game class is the core of your game or the actual start point for your programming code. You will also notice that this class inherits from the XNA.Game class. The XNA.Game class is the base of the XNA framework all all the functionality is driven from it.

- Graphics device manager 

> GraphicsDeviceManager graphics;
> 
> As described earlier, the core functionality for accessing the graphics card is the Graphics device manager, by default this is added to your project for you in the default template. It is recommended however that you only keep one instance of this in your project, for other classes to access the graphic device you should pass this instantiation (current version) of the graphics device as a reference. (more on this later)

- Spritebatch 

> SpriteBatch spriteBatch;
> 
> As part of the basic template, XNA defines a SpriteBatch for you, not that you have to use this one, it is just provided to make things easy, especially useful when we are sending text and sprites to the screen. (this will be covered as part of the tutorial)

- Constructor 

> public Game1() { graphics = new GraphicsDeviceManager(this); Content.RootDirectory = "Content"; }
> 
> As defined in the previous articles, a constructor is needed for any class that needs parameters and variables initialising. For the Game class, this sets up the graphics device and the content managers root directory.

- Initialise 

> /// \<summary\> /// Allows the game to perform any initialization it needs to before starting to run. /// This is where it can query for any required services and load any non-graphic /// related content. Calling base.Initialize will enumerate through any components /// and initialize them as well. /// \</summary\> protected override void Initialize() { // TODO: Add your initialization logic here base.Initialize(); }
> 
> Some might ask why there is also a separate initialise method as part of the Game Class when the constructor already does this. The main reason is detailed in the comments. This is to clearly show the setup code for your game and setting up components (more again on this later) that you are game will use. This like players, levels, map lists and so on.

- Load / unload Content 

> /// \<summary\> /// LoadContent will be called once per game and is the place to load /// all of your content. /// \</summary\> protected override void LoadContent() { // Create a new SpriteBatch, which can be used to draw textures. spriteBatch = new SpriteBatch(GraphicsDevice); // TODO: use this.Content to load your game content here } /// \<summary\> /// UnloadContent will be called once per game and is the place to unload /// all content. /// \</summary\> protected override void UnloadContent() { // TODO: Unload any non ContentManager content here }
> 
> Not another initialise method you may ask, but these are special. As the name suggests these two functions are for loading and unloading content (sound, textures and models) in memory for your game. You can also see here that the spritebatch from the default template is initialised here.

- Update 

> /// \<summary\> /// Allows the game to run logic such as updating the world, /// checking for collisions, gathering input, and playing audio. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> protected override void Update(GameTime gameTime) { // Allows the game to exit if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed) this.Exit(); // TODO: Add your update logic here base.Update(gameTime); }
> 
> Now we start getting to the core methods of the XNA framework, the Update method is called for every loop of the game, this is to update any game logic (not drawing, that is later), physics, AI and such.
> 
> Note that by default the template adds some exit code to the update loop, simply to check if you have pressed the back button and if you have exit the game. Remember this and do not start scratching your head if you do not remove this when your game has a menu but your game just closes when hitting back 😉

- Draw 

> /// \<summary\> /// This is called when the game should draw itself. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> protected override void Draw(GameTime gameTime) { GraphicsDevice.Clear(Color.CornflowerBlue); // TODO: Add your drawing code here base.Draw(gameTime); }
> 
> As the name suggests, this is where you will place all your code that writes to the screen, paints textures, prints text and applies effects. In each game loop, the update function is run and then the draw, then rinse and repeat until the game has ended.


### 2.3. Content 

One of the biggest (and sometimes most controversial) features of the XNA framework is the Content Manager. This is a management system for storing and maintaining references to content for your game, anything from Textures and audio to all your lovely 3D models and fonts.

As the name suggests it carefully manages your content by compressing it to save space, controls how many copies are loaded into memory (memory management) and also provides easy to use methods for how to use your content in code. It also does not stop there because the content manager is extensible and you can store and access your own custom content such as maps, levels or even change the default behaviour for handling content (if you do not like how it does it but still want the other easy features).

One of the major changes to the DigiPen material was adding in the Content Manager code for storing and loading images and sound. In the old way you had to do it all manually (view the webcast for how it used to be done, which was basically reading files and handling all the management on your own)

* * *


## 3. New project recommendations

Later in the tutorial once we have a basic game running I’ll cover some of the following best practices when writing games in XNA, some you can do now if you wish but most are for when you implement your own project.


### 3.1. Use Networkgamesample as base

On the Creators club there are many samples and starter kits, of these two very useful ones are the “Game State Management Example” and the “Networked Game State Management Example” (should be fairly obvious to guess what the networked version adds).

What these provide is a basic game framework including menu screens, transition windows (pause, exit Y/N, etc) and also network example code with gamerservices (XBOX Live support).

This provides a very useful way to get your game started with most of the basic features you need for a final game, it is good to start here. There are several other game project templates including some open [source one on codeplex](http://nuclexframework.codeplex.com/)


### 3.2. Best practices

These are some things you can do now when getting started.

- Rename game.cs 

> Pretty much a must to work around your own code, simply rename the Game class file and then search and replace “Game1” throughout your project to your game name. Sounds simple and makes it easy to read your code.

- Debug project around main class 

> During the prototyping phase of your project and debugging and testing (especially on the XBOX which has limited debug support) it is essential to get good debug information to fix your game.
> 
> A handy way to do this is to implement a second project in your game which will display error information when the game crashes, you then wrap this around the Program class. [Full details can be found here](http://blog.nickgravelyn.com/2009/07/a-more-robust-exception-system/ "Debug project guide").
> 
> What this gives you, is that when you game crashes, it swaps out to the debug program and displays on screen the error that occurred and why.

- prototyping 

> One place where most newcomer developers fall down is when adding new glossy or experimental features. Before you add a potentially big feature (may not start out that way but things have a way of becoming complicated), it is best to stop, start a new project and test your idea or theory before adding it to your game.
> 
> Main reason for this is that it can be very hard to unpick a particularly troublesome feature that you have found a new way of handling or that just does not work. This can save you hours (or more) of very laborious work just to get your game to run and can also reduce the amount of wasted code in your project.
> 
> If your new feature depends on elements in your game then just copy it over to the prototype project.
> 
> By definition a prototype is a way to test new features and is meant to teach you on how to implement and use it, then it is meant to be thrown away and done properly when implementing it into your game.


### 3.3. Separate Content Project

One idea first ventured by one of the XNA gods (no big build up there honest) Shawn “ever useful” Hargreaves, is to separate your content manager from your game code. The main reason for this is to cut down on build times. Shawn has stated that the content manager has been optimised to only rebuild if there has been a change but invariably this causes the entire content project in your game to be rebuilt with your code. This can cause quite lengthy build times if you have a lot of assets.

The answer to this is quite simple, just separate your code and content into different projects and then just have your game code reference the separate content project. This just enables you to only build your assets when you need to and shortens build times when you are just testing new bits of code. See the discussion on this [here](http://blogs.msdn.com/shawnhar/archive/2009/08/14/why-does-my-content-rebuild-every-time).


### 3.4. Use library for shared features vs copy project

As you will find in the previous recommendation’s article, several other project teams have gone further in splitting their projects up. What they have done is also breakup background code that handles logic and game architecture from the code that presents the screen (draws pictures or models).

What this gives you is a more robust game but it is also essential when creating a multi-platform game by only having code that draws to a particular device in each project and all the shared bits in one place. (also note if you are targeting mobile platforms they may also require separate content projects for XBOX/PC and Mobile devices as they may need textures scaled down or written specifically for each platform.

The other way is to create your game in one project and then use a feature in XNA to copy the project for a different platform. The downside is that you need to write lots of branching code for handling each platform, these are defined as “#IF” statements which identify which platform the game is running on and which code to run.

Granted you only need to use #IF statements if your game needs to for supporting certain features, where the implementation is the same you can just use the same code)

More on this can be found in the XNA MSDN help.

