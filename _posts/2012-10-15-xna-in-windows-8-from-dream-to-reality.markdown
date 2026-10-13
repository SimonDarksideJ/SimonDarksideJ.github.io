---
layout: post
title: XNA in Windows 8 from dream to reality
date: 2012-10-15 14:44:29
tags: [xna, windows 8]
---

Just to cross post back to my own blog (really did that the wrong way round :D) here's my entry to the [Intel App-Up competition](http://bit.ly/RugY3i) now being run on [codeproject](http://www.codeproject.com), if you got an idea for an app or game for Windows 8 then you should write a short article for the comp about your idea and you may even walk away with a free Intel Ultrabook to build it with.

**\*\*Update**

Had some interesting discussions following this original post including a very helpful link from [**Travis Woodward**](https://twitter.com/RabidLionGames) aka @[RabidLionGames](https://twitter.com/RabidLionGames). Seems a guy called [Ibrahim Ersoy](http://www.c-sharpcorner.com/authors/iersoy/ibrahim-ersoy.aspx) posted an article on C# Corner about converting a class library into an app and loading it up with XNA game code.

This solution works even better than the WinForms route, still need to do more testing but it looks very promising, read more about it here! [http://bit.ly/QInBiN](http://bit.ly/QInBiN)

---

## Disclaimer

This article is an entry in the [AppInnovation Contest](http://www.codeproject.com/AppInnovation). Articles in this sub-section are not required to be full articles so care should be taken when voting.

---

## Introduction

With the advent of the Intel App-Up challenge I decided to break convention and try something seemingly not attempted before with Windows 8, get a XNA game up and running using native XNA. If you just use a current XNA project on Windows 8 you will only have access to keyboard/mouse and gamepad input (no touch or accelerometer), you also wont be able to use any other devices / features of Windows 8 either.

Taking my original Starter 3D XNA project I'm building it from the ground up using Visual Studio 2012 and going beyond by making it a more full-fledged game.

Not willing to stop there I aim to also go beyond and use the full features of Windows 8 including:

- NFC support to allow players to game together
- Location support to bring the real world into games
- Accelerometer support to allow players to wave their tablet / ultra-books around to control the ship (especially useful in the new Warp levels)
- Location services for Leaderboards

At a stretch the project will also include some of the following:

- PlayTo support to show off your playing skills
- UDP networking to play against phone players
- Voice support

So what will begin with this article will end up in an evolving article for building XNA Desktop games natively in Windows 8

\*Note for a Windows Store (Metro) experience XNA developers will still need to use MonoGame to get published there, but that's another set of posts.

Building this for Windows 8 brought its own challenges with the biggest being the content pipeline, old VS2010 built projects just won't do so we have to build our content in VS 2012 as well, buyer beware.

---

## Background

I've been blogging / experimenting with XNA since before the XNA beta, the Starter 3D session began in the early "Coding 4 Fun" days which I took and went above and beyond, taking it to Phone and now Windows 8.

At its roots it's a complete beginner's guide for building 3D XNA games covering the basics of:

- Content Pipeline loading
- Drawing Textures
- Handling and Drawing 3D Models
- Playing audio
- Handling input and converting screen to world space
- The basics of collision detection

The tutorial has been broadcast at several User groups and even on the AT&T developer webcast series.

Its little cousin the XNA 2D series has also been very popular on my blog.

Now I could have just recompiled the Visual Studio 2010 project and submitted it with improvements to the competition but that's not how I roll, I decided to take on the challenge of getting this beast natively in the Windows 8 world.

---

## Why you should use it on an Ultrabook?

Why?, because blasting rocks and aliens on your Ultrabook is fun and just why wouldn't you want to, you should also be able to join in with friends and blast them too!

YOU KNOW YOU WANT TO!

---

## Word to the wise

One big note about this article. Some of the content (especially around the Content Builder) are a bit advanced and may be out of the reach of beginners. Worry not as when the project is complete I'll be sharing all the content / tools and whatnot that I create here and on my blog.

I'm just that kind of guy! ![:D](/assets/img/recovered/2012-10-15-xna-in-windows-8-from-dream-to-reality/icon_biggrin.png)

---

## Blast in to Space?

The Starter 3D game is based around an original game called "Asteroids". You're a daring space pilot sent out to clear asteroids and prevent them from falling to Earth.

The current version is just a modern version of that classic with you thrust into the middle of the asteroid field and it's shoot or be crushed

|   |   |
| --- | --- |
| [![Starter 3D Game main menu with Play Game and Options](/assets/img/wordpress/2012/10/clip_image0024.jpg)](/assets/img/wordpress/2012/10/clip_image0024.jpg) | [![Starter 3D Game in play with lives, score and level counters and asteroids](/assets/img/wordpress/2012/10/clip_image0044.jpg)](/assets/img/wordpress/2012/10/clip_image0044.jpg) |

Going forward I'm going to expand on this to add some of the usual suspects to the mix, like:

- Power-ups
- Baddie Aliens (who obviously started all this mess)
- Space Debris

But as I always like to do, thinking out of the box I'm also looking to add:

- A background story plus missions
- A separate level dynamic which involves traversing a warp/tunnel to take you from one mission area to another (or just flying really fast, speedway style)
- Resources and the ability to power up your ship
- Multi-Player and/or Co-op

One of the crazy ideas is that should not be all at once, it should be episodic and expand over time but we'll just have to wait and see on that.

---

## Content Anyone?

Now getting to the good stuff, one of the first things you need to get this project off the ground is content, back with VS2010 this was easy because we have XNA Game Studio (a set of extensions to Visual Studio) for building content (Models, Audio, Images, etc).

With VS2012 we have none of that so we have to go back to the drawing board, or do we? The answer thankfully is NO.

Using some old techniques pre-existing with XNA Game Studio it's possible to use MS Build (the guts behind Visual Studio for compiling your apps) to craft your content into XNB files (the file format used by the Content Pipeline in XNA), it is even possible to do this with custom content importers (that devs wrote to enhance or get around some of the limitations of the default content importers and processors).

So after a lot of digging and armed with Microsoft's own examples I put together a rudimentary Content Builder in Visual Studio 2012 tasked solely with building the current content from the Starter 3D Game.

**\*Note**

If you're wondering "why am I bothering rebuilding the content in VS2012, why not just use my pre-existing XNB files from VS2010, after all that's what the Mono / MonoGame guys are doing", the answer is simple, Content files are Platform Dependant, so to use them in native VS2012 solutions they HAVE to be built in VS2012. It is a real pain and I have asked why but it seems it's for performance reasons. (I'm none the wiser either) ANYWAY.

Getting the content built normally requires some detailed knowledge of how the MS Build process works, but with the samples provided by the XNA team we are armed with enough to get us by, they come loaded with a "Content Builder" class which has all the gubbins to get us going, however a few modifications are needed, namely:

Expanding the Parameter code to allow for "custom parameters", plus an overload so my other content builds don't have to (essential as I scale my models)

```csharp
/// <summary>
/// Adds a new content file to the MSBuild project. The importer and
/// processor are optional: if you leave the importer null, it will
/// be autodetected based on the file extension, and if you leave the
/// processor null, data will be passed through without any processing.
/// </summary>
public void Add(string filename, string name, string importer, string processor)
{
        Add(filename, name, importer, processor, null);
}

public void Add(string filename, string name, string importer, string processor, params string[] args)
{            ProjectItem item = buildProject.AddItem("Compile", filename)[0];

        item.SetMetadataValue("Link", Path.GetFileName(filename));
        item.SetMetadataValue("Name", name);

        if (!string.IsNullOrEmpty(importer))
               item.SetMetadataValue("Importer", importer);

        if (!string.IsNullOrEmpty(processor))
               item.SetMetadataValue("Processor", processor);
        if (args != null)
        {
               foreach (var arg in args)
               {
                       var argitem = arg.Split('|');
                       item.SetMetadataValue(argitem[0], argitem[1]);
               }
        }

        projectItems.Add(item);
}
```

This allows me to specify the extra parameters per content file as they are loaded, thus:

```csharp
//Build Fonts
contentBuilder.Add(contentPath + @"\Fonts\SpriteFont1.spritefont", "SpriteFont1", "FontDescriptionImporter", "FontDescriptionProcessor");

//Build Audio
contentBuilder.Add(contentPath + @"\Audio\EngineSound.wav", "EngineSound", "WavImporter", "SoundEffectProcessor");

//Build Textures
contentBuilder.Add(contentPath + @"\Textures\asteroid1.tga", "asteroid1", "TextureImporter", "TextureProcessor");

//Build Models
contentBuilder.Add(contentPath + @"\Models\Corsair.fbx", "Corsair", "FbxImporter", "ModelProcessor", "ProcessorParameters_Scale|0.09");
contentBuilder.Add(contentPath + @"\Models\asteroid1.x", "asteroid1", "XImporter", "ModelProcessor", "ProcessorParameters_Scale|0.009", "ProcessorParameters_PremultiplyTextureAlpha|False");
```

---

## Launching the game?

After exploring all the options I can think of, it seems the best (only?) way is to go down the WinForms route. Back in XNA 4.0 / VS2010, the XNA team begrudgingly exposed some of the secret sauce to get XNA running inside WinForms, others had hacked and slashed at it with some success but now with the samples it was just easier. The main reason for this was for tools, there wasn't any real call to actually run games from a WinForm because XNA compiled projects ran straight from the desktop, WinForms were just used by developers to design their own level editors / designers.

This opens an avenue however with Windows 8 since we don't have the capability built in to VS2012 to create XNA desktop launching programs we can use WinForms to host our games.

> **\*\*Update**
>
> I had some interesting discussions following this original post including a very helpful link from [**Travis Woodward**](https://twitter.com/RabidLionGames) aka @[RabidLionGames](https://twitter.com/RabidLionGames). Seems a guy called [Ibrahim Ersoy](http://www.c-sharpcorner.com/authors/iersoy/ibrahim-ersoy.aspx) posted an article on C# Corner about converting a class library into an app and loading it up with XNA game code.
>
> This solution works even better than the WinForms route, still need to do more testing but it looks very promising, read more about it here! [http://bit.ly/QInBiN](http://bit.ly/QInBiN)

The process isn't as quick and simple as a normal XNA game as we need to work around the normal way WinForms apps work, this requires us to create a separate wrapper around the graphics device to hook into all the XNA goodness but as I said before the XNA team have written samples that show us the way by implementing:

- An abstraction of the Game class that employs the Graphics Device
- An abstraction of the Content Pipeline to Load Content
- An abstraction of the Game Services collection / IOC

There is more in the actual implementation but these are the basics.

Using these we can design a control to act as our graphics surface, load up our content and let the game rip thus:

### Initialising the Graphics Device:

```csharp
// Initialize the graphics device.
graphicsDeviceService = GraphicsDeviceService.AddRef(Handle, ClientSize.Width,ClientSize.Height);

// Register the service, so components like ContentManager can find it.
services.AddService<IGraphicsDeviceService>(graphicsDeviceService);

Load Content:
//Load Fonts
Font = contentManager.Load<SpriteFont>(@"Fonts\SpriteFont1");

//Load Audio
Music = contentManager.Load<SoundEffect>(@"Audio\Music");

//Load Textures
BulletTexture = contentManager.Load<Texture2D>(@"Textures\pea_proj");

//Load Models
BulletModel = contentManager.Load<Model>(@"Models\pea_proj");
```

(as you can see, as we are still using the Content Pipeline, loading content is exactly the same)

#### Get Drawing:

```csharp
/// <summary>
/// Draws the control.
/// </summary>
protected override void Draw()
{
        if (model != null)
        {
               // Compute camera matrices.
               float rotation = (float)timer.Elapsed.TotalSeconds;

               Vector3 eyePosition = modelCenter;

               eyePosition.Z += modelRadius * 2;
               eyePosition.Y += modelRadius;

               float aspectRatio = GraphicsDevice.Viewport.AspectRatio;

               float nearClip = modelRadius / 100;
               float farClip = modelRadius * 100;

               Matrix world = Matrix.CreateRotationY(rotation);
               Matrix view = Matrix.CreateLookAt(eyePosition, modelCenter, Vector3.Up);
               Matrix projection = Matrix.CreatePerspectiveFieldOfView(1, aspectRatio,
                                                                                                           nearClip, farClip);

               // Draw the model.
               foreach (ModelMesh mesh in model.Meshes)
               {
                       foreach (BasicEffect effect in mesh.Effects)
                       {
                               effect.World = boneTransforms[mesh.ParentBone.Index] * world;
                               effect.View = view;
                               effect.Projection = projection;

                               effect.EnableDefaultLighting();
                              effect.PreferPerPixelLighting = true;
                               effect.SpecularPower = 16;
                       }

                       mesh.Draw();
               }
        }
}
```

Again since we are using XNA there's little difference to our draw code.

---

## Gotchas

Now as with any "new trick" (or old one in this case) there are always a few caveats, thankfully only a few here (but there may be ways around them as my investigations continue).

If you have already separated out your game logic from the base XNA implementation (NOT using XNA types where possible, implementing your own mechanics) then you will be mostly fine doing XNA in Windows 8 this way. If not then you had better get refactoring, to keep things clean in a WinForms world it's best to manage all your own game code from a separate library.

Also WinForms has its own way of updating the screen using the "Paint" method, which is managed by the underlying framework, with the XNA team's abstractions this has been managed out so both XNA and WinForms play nice together but it may not be as performant as it could be, time will tell.

Lastly the Content Build process, as noted in the Content section above the full engine is available, however as we are using raw MSBuild tasks to build the content it may take some discovery to get all the options you need, but there are a fair few articles which help, see the points of interest section below.

A brief description of how to use the article or code. The class names, the methods and properties, any tricks or tips.

---

## Future Outlook / Challenges

Going beyond just this game I'd like to see the Content building become a lot more friendly to VS2012 users, who knows it may also help the Mono guys break the shackles of VS 2010 (or further as some of my colleagues keep prodding me), I'm not really a tools guy but we'll see.

Further than that I'd like to make this XNA process even easier for others, granted Intel are going to be hosting their own app store which is aimed more at desktop apps (or so I'm told) so this may make XNA for game more attractive provided the performance keeps up.

Opening all the new Windows 8 features to XNA is almost like a dream I don't want to wake up from, its only limitation is that it's desktop only at the moment but let's see what the future holds. Don't be afraid though to also try out MonoGame, granted it's in its early stages with Windows 8 but it is very promising as some of its showcase game will show.

---

## Points of Interest

During my journey so far I found the following links to be invaluable:

- The MSDN Library resources on the standard Content Importers and Processors

  [http://msdn.microsoft.com/en-us/library/bb447762.aspx](http://msdn.microsoft.com/en-us/library/bb447762.aspx)

- The Content Pipeline API guide on MSDN (very useful for finding hidden attributes)

  [http://msdn.microsoft.com/en-us/library/bb195587.aspx](http://msdn.microsoft.com/en-us/library/bb195587.aspx)

- A detailed forum post (fairly old but still very relevant) on MS Build Content Pipeline tasks / parameters

  [http://xboxforums.create.msdn.com/forums/p/42119/248952.aspx](http://xboxforums.create.msdn.com/forums/p/42119/248952.aspx)

- Also useful - a MSDN article on the makeup of a XNB file (thanks to @The_ZMan)

  [http://xbox.create.msdn.com/en-US/sample/xnb_format](http://xbox.create.msdn.com/en-US/sample/xnb_format)

- The Creators club samples for WinForms use

  Graphics - [http://xbox.create.msdn.com/en-US/sample/winforms_series1](http://xbox.create.msdn.com/en-US/sample/winforms_series1)

  Content Building - [http://xbox.create.msdn.com/en-US/education/catalog/sample/winforms_series_2](http://xbox.create.msdn.com/en-US/education/catalog/sample/winforms_series_2)

---

## Coming Soon

As a slight interlude but still in keeping with my next series of articles on XNA futures, I'll go over in a bit more detail each of the components above starting with the Content Builder, it's fairly hefty subject on its own so might take a little while with my current workload
