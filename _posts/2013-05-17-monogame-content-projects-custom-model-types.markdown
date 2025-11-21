---
layout: post
title: 'MonoGame: Content Projects - Custom Model Types'
date: 2013-05-17 15:36:02
tags: [content pipeline, monogame]
---

![width=](assets/img/posts/image-not-found.png)

Are we sitting comfortably, then let us begin ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile1.png)

> #### \*\*Update
> 
> #### Since writing this article a great team from Microsoft published an Opensource project to get XNA Game studio running under Visual Studio 2012 & 2013.
> 
> #### Check it out here – [http://bit.ly/RSoIlC](http://bit.ly/RSoIlC)

In yet another one of my adventures with [MonoGame](http://monogame.net/) and showing new an interesting ways you can take you old XNA code and move it forward on to the MonoGame platform (and still keep your sanity), I will go over one of those fringe / advanced options available to old XNA projects where you can effectively build your own content.

The reasons for doing this are quite simple:

> ![align=](assets/img/posts/image-not-found.png)    You want to add custom data at build time – e.g. bounding box information, scale, size and weight  
> ![align=](assets/img/posts/image-not-found.png)    You would like to have XML config to change how your content is built like the particle pipeline sample ([http://bit.ly/13suolj](http://bit.ly/13suolj "http://bit.ly/13suolj"))  
> ![align=](assets/img/posts/image-not-found.png)    You want to pre-pack your model’s effects at build time ([Custom types](http://bit.ly/13suwkN) / [Skinned model](http://bit.ly/13suysR) examples)  
> ![align=](assets/img/posts/image-not-found.png)    You want your cake and you darn well want to eat it too!

There are more but these are the highlights.  Basically anywhere that you want to offload processing of your content from run time to build time (why would not you?), saving you endless amounts of spin cycles, which on some platforms can mean the difference between your game flying along at 30 – 60 fps and a slideshow.

* * *


# First off – Content Please

![ /></p>
<p>Now one of the questions I get asked (or see asked) surround content projects themselves, they are only natively supported in Visual Studio 2010 and later some partial support was added to 2012 for Phone 7 support, this is great if like me you rock out Pro or Ultimate but not everyone has access to these.  Sure you can use MonoGame from most of the express editions but, if you try and launch a Content project it just crashes and dies (usually)</p>
<p>To clear things up here are all the configuration in which content projects are definitely supported:</p>
<blockquote><p><img src=](assets/img/posts/image-not-found.png)    Visual Studio C# 2010 express\*  
 ![align=](assets/img/posts/image-not-found.png)    Visual Studio Visual Basic 2010 express\*  
 ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2010 express for Windows Phone  
 ![align=](assets/img/posts/image-not-found.png)    Visual Studio Pro & Ultimate\*  
 ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2012 Pro & Ultimate\*\*  
 **![align=](assets/img/posts/image-not-found.png)    Visual Studio Express 2012 for Windows Phone**

\* With XNA GS 4.0 / Windows Phone 7.1 SDK  installed

\*\* With the Windows Phone 8 SDK installed

And here are the editions where it is not supported:

> ![align=](assets/img/posts/image-not-found.png)    Visual  Web developer express 2010\*  
> ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2012 Express for Desktop  
> ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2012 Express for Windows 8  
> ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2012 Express for Web  
> ![align=](assets/img/posts/image-not-found.png)    Xamarin Studio
> 
> \* Unconfirmed

I highlighted one of the supported editions above specifically because everyone asks “How do I build my content on Windows 8” or “How do I build my content with 2012 if I do not have pro / ultimate”.  The usual answer that people come back with is “You ca not, just use 2010” which as you can see from above is wrong.  Even if you do not intend to deploy to Windows Phone **you can still use the WP8SDK to install the express edition that comes with it to build your content in 2012**.

One day I would like MS to stop messing around with this project type support, there are good reasons for doing it but leaving out one or two platforms for no good reason is just daft /Rant.

* * *


# Getting Started

![ /></p>
<p>First off if you have not started a MonoGame project before or are just starting a new one, I always recommend to start with the Content Project, get your content right first!</p>
<p>Later you can choose if you want your content project included in your game solution, I would recommend not (unless it is a small project) to avoid building it every time.  Granted VS 2012 does a much better job at recognising if a project needs building again so you may choose to include it anyway.</p>
<p>For this example I will be using the content from the Microsoft <a href=](assets/img/posts/image-not-found.png)Custom Types sample mentioned above, you can find the source sample for this here on my [GitHub MonoGame Samples](http://bit.ly/Z1dYEm) fork.

> If you are having trouble locating VS2012 Express for Windows Phone, you can find it here after installing the WP8SDK
> 
> “C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\VPDExpress” (drop the (x86) if you are on a 32 bit machine


### Prerequisites

First off make sure you got all the right bits: (you can install these on either Windows 7 or Windows 8)

> ##### Studio 2010
> 
> > ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2010 Express and above (from the above list)  
> > ![align=](assets/img/posts/image-not-found.png)    XNA Game Studio 4.0 (or) – if installed on Windows 8 see [this post](http://stackoverflow.com/questions/12849107/how-to-install-the-xna-game-studio-4-0-in-windows-8)  
> > ![align=](assets/img/posts/image-not-found.png)    Windows Phone SDK 7.1 + 7.1.1  
> > ![align=](assets/img/posts/image-not-found.png)    MonoGame V3+
> > 
> > ![align=](assets/img/posts/image-not-found.png)    (optional) Zune – needed for VS2010 to deploy to device

> ##### Studio 2012
> 
> > ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2012 Pro+ (or)  
> > ![align=](assets/img/posts/image-not-found.png)    Visual Studio 2012 Express for Windows Phone  
> > ![align=](assets/img/posts/image-not-found.png)    Windows Phone 8 SDK\*  
> > ![align=](assets/img/posts/image-not-found.png)    MonoGame V3+
> 
> \* If you are running on a machine that does not support Hyper-V (SLAT) the emulator wo not install.  You can still deploy to a device though.
> 
> #### Since writing this article a great team from Microsoft published an Opensource project to get XNA Game studio running under Visual Studio 2012 & 2013.
> 
> #### Check it out here – [http://bit.ly/RSoIlC](http://bit.ly/RSoIlC)


#### **\*Note you will also need to download the** [**Microsoft Content Types sample**](http://bit.ly/13suwkN) **as we will re-use some of the files from that project in this tutorial.**

Now there is one limitation which is pretty self-explanatory if you are using Visual Studio 2012 for Windows Phone edition to build your content project, in that it only knows how to build phone projects, so a fair few of the other project templates are not available. However it is still able to read the other project types (C# libraries for example) but you cannot create them in it (by default).

I would recommend while you are following this tutorial and only have access to the express editions, to do your content project in 2012 Express for Windows Phone and build your game in 2012 Express for Windows Desktop or Windows 8.  However a little trickery will be required to get there using this route.


#### Since writing this article a great team from Microsoft published an Opensource project to get XNA Game studio running under Visual Studio 2012 & 2013. Check it out here – [http://bit.ly/RSoIlC](http://bit.ly/RSoIlC)


### Create the Content project

As has been shown a lot of times, even on my blog, once you have the above installed (whichever your flavour), you can start a new Content project using the MonoGame Templates

[![image](/assets/img/wordpress/2013/05/image26.png "image")](/assets/img/wordpress/2013/05/image27.png)

See told you Express 2012 for Windows Phone works ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile1.png)

And yes if you are using 2012 like I am above you will likely see the following error, just ignore it, damned annoying if nothing else. Error does not appear now if you use the MSXNA VS extensions above.

[![image](/assets/img/wordpress/2013/05/image27.png "image")](/assets/img/wordpress/2013/05/image28.png)

Now add your content to the project (I am using the Tank model from the custom types sample and including the two textures but not referencing them in the solution or you will get duplicate build errors because they are mentioned in the model file) first to ensure everything builds ok before we start messing with the content project, here I am selecting Windows as the build platform

[![image](/assets/img/wordpress/2013/05/image28.png "image")](/assets/img/wordpress/2013/05/image29.png)


# 


### Add a Platform for test

With the project built let’s just double check that the content is displaying correctly on its own, just add a MonoGame platform of your choosing to the project and lets display the model (I chose the WindowsGL project because it runs on just about anything\*)

[![image](/assets/img/wordpress/2013/05/image29.png "image")](/assets/img/wordpress/2013/05/image30.png)

\*Note, at the time of writing, the WindowsGL template has a slight bug, the reference to the SDL.dll library points to the wrong place, easily corrected, edit the game .csproj file and where it states:

    \<Content Include="..\..\..\..\Users\\<username\>\AppData\Program Files %28x86%29\MonoGame\v3.0\Assemblies\WindowsGL\SDL.dll"\>

Just remove the “Users\\<username\>\AppData\” segment, then save and reload the project in Visual Studio.

With our project ready, build the content and then add a link to the built content files in your game project, ensuring you set the **build action to “Content” and the CopyTo setting at “Copy if Newer” or “Copy Always”**

[![image](/assets/img/wordpress/2013/05/image30.png "image")](/assets/img/wordpress/2013/05/image31.png)

Lastly some code to actually display the model as is, as follows: (the entire game class in one shot, basic model drawing stuff)

    #region Using Statements using Microsoft.Xna.Framework; using Microsoft.Xna.Framework.Graphics; using Microsoft.Xna.Framework.Input; #endregion namespace GameName1 { /// \<summary\> /// This is the main type for your game /// \</summary\> public class Game1 : Game { GraphicsDeviceManager graphics; SpriteBatch spriteBatch; Model model; Matrix world; Matrix view; Matrix projection; public Game1() : base() { graphics = new GraphicsDeviceManager(this); Content.RootDirectory = "Content"; } /// \<summary\> /// Allows the game to perform any initialization it needs to before starting to run. /// This is where it can query for any required services and load any non-graphic /// related content. Calling base.Initialize will enumerate through any components /// and initialize them as well. /// \</summary\> protected override void Initialize() { // TODO: Add your initialization logic here base.Initialize(); } /// \<summary\> /// LoadContent will be called once per game and is the place to load /// all of your content. /// \</summary\> protected override void LoadContent() { // Create a new SpriteBatch, which can be used to draw textures. spriteBatch = new SpriteBatch(GraphicsDevice); // TODO: use this.Content to load your game content here model = Content.Load\<Model\>("tank"); world = Matrix.Identity; // Calculate camera view and projection matrices. view = Matrix.CreateLookAt(new Vector3(1000, 500, 0), new Vector3(0, 150, 0), Vector3.Up); projection = Matrix.CreatePerspectiveFieldOfView(MathHelper.PiOver4, GraphicsDevice.Viewport.AspectRatio, 10, 10000); foreach (ModelMesh mesh in model.Meshes) { foreach (BasicEffect effect in mesh.Effects) { effect.EnableDefaultLighting(); effect.World = world; effect.View = view; effect.Projection = projection; } } } /// \<summary\> /// UnloadContent will be called once per game and is the place to unload /// all content. /// \</summary\> protected override void UnloadContent() { // TODO: Unload any non ContentManager content here } /// \<summary\> /// Allows the game to run logic such as updating the world, /// checking for collisions, gathering input, and playing audio. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> protected override void Update(GameTime gameTime) { if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape)) Exit(); // TODO: Add your update logic here base.Update(gameTime); } /// \<summary\> /// This is called when the game should draw itself. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> protected override void Draw(GameTime gameTime) { GraphicsDevice.Clear(Color.CornflowerBlue); // TODO: Add your drawing code here model.Draw(world, view, projection); base.Draw(gameTime); } } }

Now if you run the solution you should get a model being drawn to the screen.

[![image](/assets/img/wordpress/2013/05/image31.png "image")](/assets/img/wordpress/2013/05/image32.png)

* * *


# Getting the Custom Types in your Pipeline

![ /></p>
<p>Now there are two schools of thought with how to use custom content types in XNA and both will work with MonoGame itself, however only one way will work (as I found) on all platforms.</p>
<p>The two ways are:</p>
<blockquote><p> </p>
<p><img src=](assets/img/posts/image-not-found.png)    By using the [ContentSerializerRuntimeType] attribute definitions

These are set within your content processor to identify your custom types by their reflection type name, then hosting the class definition for the type in your game project

![align=](assets/img/posts/image-not-found.png)    By using a common library between the content processor and your game project effectively sharing the class definition between the projects

The second option which I am going to show you here is the one that will work on all platforms, the first is fine for windows platforms but runs into issues with others (in my experience)


### First up the Custom Type project

So first we need a class library to hold our custom types, so create a new C# class library for the solution, its namespace needs to be unique in your project to ensure its picked up by both the content processor and your game platform.

> \*Note as stated earlier, if you are using the 2012 Express editions, you will need to swap to VS 2012 Express for Windows Desktop / Windows 8 to create the class library and then switch back to the Phone Express to add the existing project to your content solution.  A little tedious but it works (and it is FREE).  You will see (yet another) silly warning telling you the class library is targeting .NET 4.5 and that it needs to convert it to .NET 4.5 to read it (sheesh), just accept the default to update the project.
> 
> Once the Class Library is loaded, right-click and select properties on the Class Library project and in the Application tab change the “Target Framework” to .Net 4.  XNA and MonoGame just work better that way.
> 
> [![image](/assets/img/wordpress/2013/05/image32.png "image")](/assets/img/wordpress/2013/05/image33.png)

Once the Class Library project is loaded we can setup our custom type we intend to use, you can copy the class over from the XNA sample or just replace the default Class.cs code with the following:

    #region File Description //----------------------------------------------------------------------------- // CustomModel.cs // // Microsoft XNA Community Game Platform // Copyright (C) Microsoft Corporation. All rights reserved. //----------------------------------------------------------------------------- #endregion #region Using Statements using System.Collections.Generic; using Microsoft.Xna.Framework; using Microsoft.Xna.Framework.Content; using Microsoft.Xna.Framework.Graphics; #endregion namespace CustomContentTypes { /// \<summary\> /// Custom class that can be used as a replacement for the built-in Model type. /// This provides functionality roughly similar to Model, but simplified as far /// as possible while still being able to correctly render data from arbitrary /// X or FBX files. This can be used as a starting point for building up your /// own more sophisticated Model replacements. /// \</summary\> public class CustomModel { #region Fields // Disable compiler warning that we never initialize these fields. // That is ok, because the XNB deserializer initialises them for us! #pragma warning disable 649 // Internally our custom model is made up from a list of model parts. [ContentSerializer] public List\<ModelPart\> modelParts { get; private set; } // Each model part represents a piece of geometry that uses one // single effect. Multiple parts are needed for models that use // more than one effect. public class ModelPart { public int TriangleCount; public int VertexCount; public VertexBuffer VertexBuffer; public IndexBuffer IndexBuffer; [ContentSerializer(SharedResource = true)] public Effect Effect; } #pragma warning restore 649 #endregion /// \<summary\> /// Private constructor, for use by the XNB deserializer. /// \</summary\> private CustomModel() { } /// \<summary\> /// Draws the model using the specified camera matrices. /// \</summary\> public void Draw(Matrix world, Matrix view, Matrix projection) { foreach (ModelPart modelPart in modelParts) { // Look up the effect, and set effect parameters on it. This sample // assumes the model will only be using BasicEffect, but a more robust // implementation would probably want to handle custom effects as well. BasicEffect effect = (BasicEffect)modelPart.Effect; effect.EnableDefaultLighting(); effect.World = world; effect.View = view; effect.Projection = projection; // Set the graphics device to use our vertex declaration, // vertex buffer, and index buffer. GraphicsDevice device = effect.GraphicsDevice; device.SetVertexBuffer(modelPart.VertexBuffer); device.Indices = modelPart.IndexBuffer; // Loop over all the effect passes. foreach (EffectPass pass in effect.CurrentTechnique.Passes) { pass.Apply(); // Draw the geometry. device.DrawIndexedPrimitives(PrimitiveType.TriangleList, 0, 0, modelPart.VertexCount, 0, modelPart.TriangleCount); } } } } }

There is not too much fancy stuff here, the Custom Model type in the MS example just provides a more raw view for what goes on under the hood for drawing a model, it reads out the raw model data and stores it in it is respective Index and Vertex buffers plus all the other necessary information for doing primitive drawing.  It also delivers a custom Draw function for sending the Index/Vertex data to the graphics device.  If you wished you could change the colour of random vertices / alter the normal mapping of certain elements or even deform the mesh on build, all stuff that would be very expensive to do at runtime.

If you wish you can also rename “class1.cs” to something more appropriate but it is just for show (Still a good idea though ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile1.png))


### The Content Pipeline project

Now we have our custom type, we need a way to tell the content pipeline to use it when loading our model.  Open up your Content project again (if it is separate) and add a new project to the solution, this time select the “Content Pipeline Extension Library” template in the “XNA Game Studio 4.0” branch. (there is a way to do the same thing with a class library but this is easier and safer for now)

[![image](/assets/img/wordpress/2013/05/image33.png "image")](/assets/img/wordpress/2013/05/image34.png)

Once it is loaded you should get a default “ContentProcessor1.cs” class in the project, just a starter for 10.

> \*Note again if you are using 2012 Express for Windows Phone to create the content pipeline extension project, you will need to update the target framework to .NET 4.0 else the content project wo not recognise it


##### If you want to learn more about how content pipeline extensions work, check out the [documentation on the Creators club website here](http://msdn.microsoft.com/en-us/library/bb447754), well worth a read if you want to do more advanced thins with your content before you import it into your game.

Now for simplicities sake (and to prevent this post from becoming miles longer), just copy over the “CustomModelContent.cs” and “CustomModelProcessor.cs” from the XNA sample into your Content Pipeline Extension project and then update the following to match what we are doing here (I always find it best implement these things yourself to ensure you understand what and why they work), then update the following:

> ![align=](assets/img/posts/image-not-found.png)    Update the namespaces in the two new files to the new project namespace  
> ![align=](assets/img/posts/image-not-found.png)    In the “CustomModelContent.cs” class, update all references of “CustomModelTypes” to the assembly name of your ContentTypes project. e.g.:
> 
> Replace:
> 
> [ContentSerializerRuntimeType("CustomModelTypes.CustomModel, CustomModelTypes")] [ContentSerializerRuntimeType("CustomModelTypes.CustomModel+ModelPart, CustomModelTypes")]
> 
> With:
> 
> [ContentSerializerRuntimeType("CustomContentTypes.CustomModel, CustomContentTypes")] [ContentSerializerRuntimeType("CustomContentTypes.CustomModel+ModelPart, CustomContentTypes")]
> 
> ![align=](assets/img/posts/image-not-found.png)    Add a reference to the Content Types project from the Pipeline Extension project  
> ![align=](assets/img/posts/image-not-found.png)    Add a reference to the Pipeline extension project from the Content project (note the actual content project where the model is stored NOT the content builder project)
> 
> ![align=](assets/img/posts/image-not-found.png)    Finally, add a reference to the Content Types project from the game project

With that in place you should be able to build the content project and now if you select the “Tank.fbx” you should be able to change the tanks content process from the default “Model – XNA Framework” to your new processor type “Custom Model” which uses your new content type class for storing the final built model in.

> \*Note if the new Processor type does not show up, check you have built and referenced it correctly and that BOTH the Content Types project and the pipeline extension project are targeting .NET 4.0

If you are really curious, just read through the content processor and content classes, the content class just describes the custom type and the processor does all the heavy lifting to populate the new custom model type with the information stored in the “Tank.fbx” model file.

There is an alternate way, the [Skinned Model sample](http://bit.ly/13suysR) does not even use the CustomModelContent definition, in some ways it is a lot cleaner. Having the CustomModelContent class does mean you do not have to reference the custom type from the content project but I prefer completeness.  The final choice is down to you really.

* * *


# Getting back in with the game

![width=](assets/img/posts/image-not-found.png)

Now that we are finally hitting the home stretch to see what our labours have delivered, let’s just replace the game code one last time.  So open up your game project and break out the Game class and replace it with the following:

    #region Using Statements using System; using System.Collections.Generic; using Microsoft.Xna.Framework; using Microsoft.Xna.Framework.Content; using Microsoft.Xna.Framework.Graphics; using Microsoft.Xna.Framework.Input; using Microsoft.Xna.Framework.Storage; using Microsoft.Xna.Framework.GamerServices; using CustomContentTypes; #endregion namespace GameName1 { /// \<summary\> /// This is the main type for your game /// \</summary\> public class Game1 : Game { GraphicsDeviceManager graphics; SpriteBatch spriteBatch; CustomModel model; Matrix world; Matrix view; Matrix projection; public Game1() : base() { graphics = new GraphicsDeviceManager(this); Content.RootDirectory = "Content"; } /// \<summary\> /// Allows the game to perform any initialization it needs to before starting to run. /// This is where it can query for any required services and load any non-graphic /// related content. Calling base.Initialize will enumerate through any components /// and initialize them as well. /// \</summary\> protected override void Initialize() { // TODO: Add your initialization logic here base.Initialize(); } /// \<summary\> /// LoadContent will be called once per game and is the place to load /// all of your content. /// \</summary\> protected override void LoadContent() { // Create a new SpriteBatch, which can be used to draw textures. spriteBatch = new SpriteBatch(GraphicsDevice); // TODO: use this.Content to load your game content here model = Content.Load\<CustomModel\>("tank"); // Calculate camera view and projection matrices. view = Matrix.CreateLookAt(new Vector3(1000, 500, 0), new Vector3(0, 150, 0), Vector3.Up); projection = Matrix.CreatePerspectiveFieldOfView(MathHelper.PiOver4, GraphicsDevice.Viewport.AspectRatio, 10, 10000); } /// \<summary\> /// UnloadContent will be called once per game and is the place to unload /// all content. /// \</summary\> protected override void UnloadContent() { // TODO: Unload any non ContentManager content here } /// \<summary\> /// Allows the game to run logic such as updating the world, /// checking for collisions, gathering input, and playing audio. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> protected override void Update(GameTime gameTime) { if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape)) Exit(); // TODO: Add your update logic here HandleInput(); // Update the world transform to make the model rotate. float time = (float)gameTime.TotalGameTime.TotalSeconds; world = Matrix.CreateRotationY(time \* 0.1f); base.Update(gameTime); } /// \<summary\> /// This is called when the game should draw itself. /// \</summary\> /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\> protected override void Draw(GameTime gameTime) { GraphicsDevice.Clear(Color.CornflowerBlue); // TODO: Add your drawing code here graphics.GraphicsDevice.Clear(Color.CornflowerBlue); model.Draw(world, view, projection); base.Draw(gameTime); } #region Handle Input /// \<summary\> /// Handles input for quitting the game. /// \</summary\> private void HandleInput() { KeyboardState currentKeyboardState = Keyboard.GetState(); GamePadState currentGamePadState = GamePad.GetState(PlayerIndex.One); // Check for exit. if (currentKeyboardState.IsKeyDown(Keys.Escape) || currentGamePadState.Buttons.Back == ButtonState.Pressed) { Exit(); } } #endregion } }

> \*Note, just remember to update any different using statements (different namespaces and all)

Walking through the code above all we have done is remove any model setup code because it is all done in our custom content class, all we need to do is tell it where it is in the world (The world / view and projection matrices) and tell it to draw.  For added effect the model now spins as well ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile1.png)

Now I could go a lot further and tinker with both the content processor and the custom content type but I will let you play.

[![image](/assets/img/wordpress/2013/05/image34.png "image")](/assets/img/wordpress/2013/05/image35.png)

* * *


# So what was all this about?

![ /></p>
<p>Well the main purpose of this article was to go over all the requirements of using custom types in your MonoGame projects and some pointers as to where you should look to improve your asset pipeline to try and do as much with your content up front at build time.  This becomes crucial with platforms like iOS where every cycle counts (Do not get me started on Android)</p>
<p><del>oh and to show you that it is possible to build a game using JUST the 2012 express editions, no longer are you chained to the 2010 versions (granted still nothing wrong with using 2010 <img class=](assets/img/posts/image-not-found.png))

Everyone is now happy that VS2012 and VS2013 are first party citizens with XNA and MonoGame  ![Open-mouthed smile](/assets/img/wordpress/2013/05/wlEmoticon-openmouthedsmile1.png)

This was a very technical article so if you have any comments / questions or queries please let me know below.

