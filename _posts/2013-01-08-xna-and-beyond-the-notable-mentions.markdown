---
layout: post
title: XNA and Beyond, the notable mentions
date: 2013-01-08 16:24:51
tags: [xna]
---

Just to round up the overview part of this series where I have covered frameworks doing their level best to take the dream of XNA onward and available to more platforms, plus looking further into the future to extend and build upon XNA’s humble beginnings, it is worth looking over some of the other frameworks which use XNA as a baseline and give you more bang for your buck (time wise).

All of these frameworks depend on XNA so will need one of the aforementioned engine / frameworks to sit on (in fact some are even actively targeting those frameworks already) in order to get going, you can of course still just use vanilla XNA in all its forms, however the “beyond” frameworks and engines just make it more appealing.

So for this little run up I have got 5 frameworks to run through, namely:

> ![src=]()    YNA framework – The Prototype Framework  
> ![src=]()    Nuclear Winter by sparklinlabs  
> ![src=]()    Visual Scripting Framework  
> ![src=]()    XPF  – A Layout Framework for XNA  
> ![src=]()    Tiled / TiledLib / xTiled / tIDE – Tile based game engine / editor

> (Late Entry)
> 
> ![src=]()    Gearset – Game monitoring toolset

Nothing too deep but enough to whet your appetite to see if it interests you and encourage you to look deeper, or if you ask nicely / add it to my “Content Voting” page then I may consider adding it to one of the “diving deeper” articles for the XNA Futures series.

\*Note

At the last minute I added a new entry to the list following a casual browse through my follower list, Thanks [@juancampa](https://twitter.com/juancampa) for that.

Anyway, on with the show.

* * *


# [The “YNA” Framework](http://yna.codeplex.com/)

[![ src=]()](http://yna.codeplex.com/)

I put this first simply because it is the one that intrigues me the most (at the time of writing because I am a fickle beast) just by its outlandish claims and steadfast delivery, it is aimed mainly as a fast prototyping tool with some very unique features.  Do not let his put you off mind as there are several games already released using this as their base engine running on top of XNA and others in the works.

Putting it simply, YNA is a game Framework for XNA or MonoGame who allow you to quickly create prototypes and games. It has been inspired by Flixel, an ActionScript 3 Framework for 2D part and a bit by Three.js for 3D.


## What you get

YNA gives you the following (Excerpt from the codeplex site)

| ![src=]() | ![src=]() | ![src=]() |
| ![src=]() | ![src=]() | ![src=]() |

**Features**

- Advanced Sprite (static, animated)
- Tilemap and Isometric tiledmap
- State management
- Input management (Keyboard, Mouse, Gamepad and touch)
- Group and hierarchy of graphical objects (Sprite, Text, Image, etc..)
- Audio manager
- Storage manager
- Skinnable GUI module (button, progress bar, etc..)
- Simple terrain, heightmap, cubes
- Camera (FPS, TPS, Fixed)
- And more…


## Framework support

As for frameworks, YNA has already been tested with MonoGame On Windows, Windows 8 and Windows Phone (since that is where MonoGame is focused) but it should also run on all of MonoGame’s other platforms as well.  Its not a good fit for UnityXNA but should work with the SunBurn platform API as well when it is released although it will likely need a few modifications to take advantage of some of the SunBurn Platform API’s advanced rendering features.  Unlikely to be compatible with the SunBurn Engine since it is effectively a competitor. (Although it would be interesting to reuse the InkScape features of YNA with the SunBurn engine as an Add-on, hmm)

> ![src=]()    MonoGame – **YES**  
> ![src=]()    UnityXNA – **NO**  
> ![src=]()    SunBurn Platform API – **YES** \* (Some minor work required)  
> ![src=]()    SunBurn Gaming Engine – **NO**


## Current Status

YNA is still in active development with its latest build being released as recent as 2nd Jan 2013.

Price: FREE – Opensource

* * *


# [Nuclear Winter](https://bitbucket.org/sparklinlabs/nuclearwinter/overview)

[![ src=]()](https://bitbucket.org/sparklinlabs/nuclearwinter/overview)

**NuclearWinter** is a set of libraries to develop games and applications using XNA and [MonoGame](http://github.com/mono/monogame).

[![ src=]()](http://inkscape.org/)

A core selling point and the one that got me reading was its InkScape integration.  [InkScape](http://inkscape.org/) is an Open Source vector graphics editor, with capabilities similar to Illustrator, CorelDraw, or Xara X, using the W3C standard Scalable Vector Graphics (SVG) file format.  I have also got a huge library selection of tutorials and videos to learn how to use it more effectively but I am still yet to actually get around to mastering it .

Other attempts in the past to use a 3rd part tool with XNA usually resort in either writing complex custom content importers or using a model format as an intermediary mechanism, Nuclear Winters approach seems to be more sensible and more importantly easier to maintain.  **However** at present the functionality for this has been removed from the core code but is still available in the source for use, the developers note though that they may bring it back in the not too distant future (or with additional community support).


## What you get

(Excerpt from the site)

The core of NuclearWinter, features game state management, screen resolution handling, an input manager and a user interface library.

![src=]()


## Framework support

As with YNA, native XNA and MonoGame are supported with recent check-in’s showing evidence of it being updated to the latest versions of MonoGame for Mac as well.  Again UnityXNA does not really apply and some work may be required for the SunBurn Platform API as before.  Not suitable for the SunBurn Gaming Engine

> ![src=]()    MonoGame – **YES**  
> ![src=]()    UnityXNA – **NO**  
> ![src=]()    SunBurn Platform API – **YES** \* (Some minor work required)  
> ![src=]()    SunBurn Gaming Engine – **NO**


## Current Status

Nuclear Winter is still in active development with its latest build being released as recent as 6th Jan 2013.

Price: FREE – Opensource

* * *


# [Visual Scripting Framework](http://www.greedygoblinsoftware.co.uk/visualscriptingframework)

[![ src=]()](http://www.greedygoblinsoftware.co.uk/visualscriptingframework)

The VSF is a scripting framework that allows you to control the flow of your game and also provides an easy way to storyboard cut scene events, its composition and use is very similar to the PlayReady framework for Unity3D.

The framework becomes invaluable to quickly put core gameplay elements together in your game that would be otherwise tricky to code and give your game that extra shine by adding story elements and an animated background.

I must say that [CJ Bailey](http://twitter.com/GreedyGoblins) ([@GreedyGoblins](http://twitter.com/GreedyGoblins)) certainly has been a busy chap with this and his several other SunBurn components, all currently still in active deployment / support.


## What you get

![src=]()

(Excerpt from the site)


### Accelerate your XNA game development


### Key Features

- Build and execute scripts easily, in-game!
- Rapid development/prototyping of game logic and cut-scenes
- Quick and easy integration with your existing game.
- Game engine agnostic! Use it with the XNA game engine of your choosing.
- Write custom Script Elements in C# to suit the needs of your game.
- Custom made Script Elements… automatically made available in the Script Editor!
- Save scripts to XML files… load them via the content pipeline.


### Overview

The Visual Scripting Framework was born out of my frustration with programmatically creating cut-scenes for my game. My workflow usually ended up being: code cut-scene, build and execute game, wait for game to start (maybe traversing a few menu options in the process), test the cut-scene, find something is not right, stop the game, tweak the code, build and execute, wait for game to start, test the cut-scene, stop the game, tweak the…. well… you get the idea. It was driving me mad. I wanted to be able to tweak things while the game was running; that would allow me to try out different ideas and get things just right, without all the tedium of my previous workflow.

[![Untitled](/assets/img/wordpress/2013/01/Untitled.png "Untitled")](/assets/img/wordpress/2013/01/Untitled.png)

The Visual Scripting Framework allows you to build scripts by dragging and dropping script elements into a script. A script element can contain both inputs and outputs which can be connected to other script elements. The Visual Scripting Framework is designed to be game engine agnostic. This means that out of the box the framework does not contain many script elements, since every game engine and every game developer’s requirements are different there is no way I could account for every eventuality. Instead, the framework allows you to load additional components as required or even write your own components which it will automatically detect and make available at runtime.


## Framework support

VSF at its core is a XNA derivative and as such is compatible with any framework that is based on XNA but to add to that there are even SunBurn engine components that are woven tightly with SunBurn to take advantage of its extra power and features.

> ![src=]()    MonoGame – **YES**  
> ![src=]()    UnityXNA – **NO**  
> ![src=]()    SunBurn Platform API – **NO** \* (not fully yet but expect update on platform API release)  
> ![src=]()    SunBurn Gaming Engine – **YES**


## Current Status

VSF is a paid for framework and as such is still under support at present with future development plans as expected.

Price $30

* * *


# [XPF](http://red-badger.com/blog/2010/08/31/introducing-xpf-e28093-a-layout-framework-for-xna/)

[![ src=]()](http://red-badger.com/blog/2010/08/31/introducing-xpf-e28093-a-layout-framework-for-xna/)

The offering through the [RedBadger team](http://twitter.com/redbadgerteam) ([@redbadgerteam](http://twitter.com/redbadgerteam)) is nothing if not Unique, it effectively recreates the XAML rendering engine through XNA graphics processing.  Similar to other GUI tools except it also applies the same 3D rotation features as XAML, also it provides similar data binding capabilities to its XAML counterpart.

If you watch some of their example videos you will get a great feel for where it is heading since you can also meld the XPF components directly on to a 3D surface using the best of both worlds.


## What you get

![src=]()

(Excerpt from the site)


#### Familiar Development Experience

XPF has been specifically designed to be familiar to WPF & Silverlight developers and comes with a collection of out of the box controls, that can be composed together to create flexible layouts in no time at all.  The beta launches with the following controls:

- Border
- Button
- ContentControl
- Grid
- Image
- ItemsControl
- RootElement (similar to Window)
- ScrollViewer
- ScrollContentPresenter
- StackPanel
- TextBlock

XPF also supports Dependency Properties, Attached Properties, Animation (currently WP7 only) and Data Binding (one and two-way).


#### Pure XNA

XPF is designed to run in a pure XNA application, it does not host XNA inside a WPF or Silverlight application.  All the controls have been written from the ground-up to work in XNA 4.0 and fit into XNA’s Update & Draw game loop.


#### Extensible

XPF has been designed to be modular and extensible in two key ways.  Firstly, creating custom controls to use alongside the controls you get out of the box is easy.  If you have ever created a custom control in WPF or Silverlight, using the 2 phase measure and arrange layout system, then XPF gives an almost identical experience.

Secondly, the integration point between XPF and your XNA application has been designed to be extremely flexible.  XPF does not really know anything about XNA, it is written entirely around agnostic interfaces – so whilst XPF comes with a renderer that you can use out the box, should you want to create your own, or integrate to an existing engine, you simply have to satisfy a few core interfaces.


## Framework support

XPF is now a community based development and recently got courted by the MonoGame team themselves, so as with most other frameworks based on XNA it should run on any XNA based framework.

> ![src=]()    MonoGame – **YES**  
> ![src=]()    UnityXNA – **NO**  
> ![src=]()    SunBurn Platform API – ? (Needs in depth review but should be compatible)  
> ![src=]()    SunBurn Gaming Engine – **NO** (Not at present but could be enabled for SunBurn as it is opensource)


## Current Status

Unable to ascertain the exact development stats of the project at present since it was pushed opensource, the original devs are not contributing as far as I can tell but others including the MonoGame team have taken a keen interested.  The edition before it was made open source was very stable as far as I can tell.

Price: FREE – Opensource

* * *


# [Tiled](http://www.mapeditor.org/) / [TiledLib](https://bitbucket.org/nickgravelyn/tiledlib) / [xTiled](https://bitbucket.org/vinull/xtiled) / [tIDE](http://tide.codeplex.com/)

[![ src=]()](http://www.mapeditor.org/)[![ src=]()](https://bitbucket.org/nickgravelyn/tiledlib)[![ src=]()](https://bitbucket.org/vinull/xtiled)[![ src=]()](http://tide.codeplex.com/)

Now this section might get a bit confusing but hopefully it will all make sense in the end, what we have are four implementations for what is effectively the same technology.

Tiled started off some many many moons ago as a Tile Map Editor / Generator with a kind of standard “Tile Map Format” (TMX), this allowed level editors to create designs in either flat top down 2D style maps (orthogonal) or 2.5D perspective maps (isometric) for a little more depth.

[Nick Gravelyn](http://nickgravelyn.com/) ([@nickgravelyn](http://twitter.com/nickgravelyn)) kicked things off by creating [TiledLib](https://bitbucket.org/nickgravelyn/tiledlib) which imported the TMX files and then provided rendering / management techniques for levels, more recently he has dropped the “Processing” part of the Lib to allow developers to apply them how they will.  A little while later [Michael Neel](http://www.vinull.com/) from [GameMarx](http://www.gamemarx.com/) [(@ViNull](http://twitter.com/ViNull)) and Co-Founder of FuncWorks, while trying to create his awesome entry for the DBP 2012 competition using [TiledLib](https://bitbucket.org/nickgravelyn/tiledlib) responded to Nicks update and set forth on his own “Fork” called [XTiled](https://bitbucket.org/vinull/xtiled) (technical term to link to another developers code, not the thing you eat with) Nick’s project and take it further to resurrect the full content pipeline importer and graphics rendering engine, this being run strictly the way he wants to use it from his (and colleagues) experience of making games (if you want it another way get your own Fork).

> **\*\*Note – Had an update from Mike to state that xTiled has moved a ways on and is likely now incompatible with Nick’s tiledlib, so just be aware when choosing which of these frameworks to use**

In what appears to be a parallel universe another Dev ([colinvella](http://www.codeplex.com/site/users/view/colinvella)) went a different approach to Mike and has rebuilt the entire Tiled Editor from scratch in .NET (the original Tiled Ed was written in C++ / Qt) that can import TMX files if you have them and stores and uses them in a XML variant of TMX, for which the devs have also supplied a Content importer / processor for XNA plus a rendering engine for that format.

Phew, got all that.


## What you get


### Tiled

  ![src=]() ![src=]()

_(Except from the Tiled Site)_

Tiled is a general purpose tile map editor. It’s built to be easy to use, yet flexible enough to work with varying game engines, whether your game is an RPG, platformer or Breakout clone. Tiled is [free software](http://www.gnu.org/philosophy/free-sw.html) and written in C++, using the [Qt application framework](http://qt.nokia.com/). The main features in a nutshell:

- **General purpose** tile map editor with XML-based map format
- Supports **orthogonal** and **isometric** maps
- Custom objects can be placed with pixel precision
- Full **undo/redo** and **copy/paste** support
- Add custom properties to tiles, layers, objects or the map
- Automatically reloads tilesets when changed externally
- **Resize** or **offset** your tile map later as needed
- Efficient tile editing tools like **stamp** and **fill** brushes
- Supports **input/output plugins** to open and save files in custom formats


### TiledLib / xTiled

Both are extensions to the XNA framework offering different levels of support for TMX file importing / processing and graphical rendering, together with some map management techniques.

**TiledLib** is a C# library for utilizing the Tiled map editor for use in a game made with XNA Game Studio 4.0. With the latest version (from 12/2/2011), the library is now targeted entirely to the parsing of the Tiled .TMX files as a Content Importer. This means that your game needs to create an appropriate processor to take the data provided and turn it into the correct types for your specific game.

**XTiled** is a C#/XNA library for reading and rendering TMX maps created in [Tiled Map Editor](http://www.mapeditor.org/). The library supports orthogonal and isometric map formats as well as all TMX 0.8.1 map features and has runtime components for PC and Xbox 360.

Project documentation is in the Wiki. There is also a discussion group at [XTiled on Google Groups](https://groups.google.com/forum/#!forum/xtiled)


### tIDE

![src=]()

(Excerpt from the tIDE site)


#### ![tIDE](assets/img/posts/image-not-found.png) tIDE Tile Map Editor

tIDE is a fully-featured, .NET-based tile editor that allows level designers to easily create content for tile-based games. tIDE supports a custom XML-based map format, a custom binary format (_tbin_), [Tiled TMX](http://www.mapeditor.org/), [Mappy FMP](http://tilemap.co.uk/mappy.php)and [Flixel](http://flixel.org/). Additional formats may be included via the .NET-based plugin system within tIDE.

[![Main window](assets/img/posts/image-not-found.png)](http://tide.codeplex.com/wikipage?title=tIDE01_image)[![Tile sheet properties](assets/img/posts/image-not-found.png)](http://tide.codeplex.com/wikipage?title=tIDE02_image)[![Autotile definition](assets/img/posts/image-not-found.png)](http://tide.codeplex.com/wikipage?title=tIDE03_image)[![Map statistics](assets/img/posts/image-not-found.png)](http://tide.codeplex.com/wikipage?title=tIDE04_image)[![Tile animation](assets/img/posts/image-not-found.png)](http://tide.codeplex.com/wikipage?title=tIDE05_image)[![Custom properties](assets/img/posts/image-not-found.png)](http://tide.codeplex.com/wikipage?title=tIDE06_image)

**Features**

- Intuitive user interface
- Support for multiple tile layers to facilitate the design of games featuring parallax scrolling
- Automatic tile transitioning (autotiles)
- Animated tiles
- Full-featured drawing toolbox to facilitate level design
- Layer ordering and visibility
- Support for an extensive range of display sizes to facilitate alignment when designing multi-layer maps
- Support for arbitrary tile sizes and multiple tile sheets
- Brushes to facilitate reuse of common composite elements
- Multiple file formats (currently tIDE, tBIN, Tiled TMX, Mappy FMP and Flixel formats)
- Full undo/redo capabilities
- Support for custom properties at every level of the map structure
- Full-screen editing mode
- Zooming capabilities
- Map structure navigation and manipulation via the Map Explorer panel
- Intuitive tile picker
- Auto-scrolling capabilities
- Dockable editor components
- Tile sheet auto-update feature to streamline content creation pipeline
- Painless tile sheet rearrangement
- Tile guides and layer viewing options
- Statistics on dimensions and tile usage
- Extensive potential for customisation via a plugin management system
- Built-in help system


#### ![xTile](assets/img/posts/image-not-found.png) **xTile** Tile Rendering Engine

xTile is a multi-platform tile rendering engine component for XNA-based games.

**Features**

- Available for ![PC](assets/img/posts/image-not-found.png) **PC** , ![Xbox 360](assets/img/posts/image-not-found.png) **Xbox 360** , ![Windows Phone 7](assets/img/posts/image-not-found.png) **Windows Phone 7** and ![Zune](assets/img/posts/image-not-found.png) **Zune** \*
- Parallax layer support
- Tile animation
- Custom property support at map, layer, tile sheet and tile level
- XNA Content Pipeline Support for tIDE map files
- Automatic validation and asset building of tile sheet image source dependencies in content pipeline
- Customisable XNA content processor
- Map loading interface for multiple file formats
- Native XML-based file format
- Integration with ![tIDE](assets/img/posts/image-not-found.png) **tIDE**
- Abstract display device to facilitate platform extensibility

\* For Zune development, you need to use [xTile](http://tide.codeplex.com/) v1.2.5 with XNA Game Studio 3.1


## Framework support

As you can see there has been a lot of support for this map format for XNA with two IDE’s and several variations of XNA importers it is certainly in good stead, all that remains is for you to give each a whirl and select the best one that meets your needs.  Either Use the original Tiled Editor which has been stable for some time and one of the three importers, if you are feeling adventurous then you can have a go at writing your own processors from Nick’s great work for your particular needs or leverage Mike’s experience in building games.

The newest member is not too shy either and although fairly fresh it shows a lot of promise and bonus features.

> ![src=]()    MonoGame – YES, YES & YES  
> ![src=]()    UnityXNA – UNLIKELY (however since it is content processor driven the 2D system may be compatible)  
> ![src=]()    SunBurn Platform API – YES\* (With a little effort updating the tile renderers for the Platform API way of doing things)  
> ![src=]()    SunBurn Gaming Engine – NO\* (out of the box no, however updating the renderer to be SunBurn aware could be very advantageous, especially with SunBurn’s own or the Bepu plug in for Physics)


## Current Status

The only one not currently in active Development is [Nick Gravelyn’s](https://bitbucket.org/nickgravelyn/tiledlib) branch of code but [Mike’s](https://bitbucket.org/vinull/xtiled) work is based on that and extending it so you could argue it still is ![Open-mouthed smile](/assets/img/wordpress/2013/01/wlEmoticon-openmouthedsmile1.png)

As for [tIDE](http://tide.codeplex.com/) and [Tiled](http://www.mapeditor.org/), both are still in progressive development cycles, Tiled has fewer releases purely because it is stable but [tIDE](http://tide.codeplex.com/) is newer and built on .NET so more easily manageable.

Price: FREE – Opensource

* * *


# [Gearset](http://www.thecomplot.com/gearset.html)

[![ src=]()](http://www.thecomplot.com/gearset.html)

This one took me completely by surprise early on the morning when I was about to hit publish, I was browsing my followers list (trying to find one of the contributors above) and one follower in particular caught my eye, namely [**Juan Campa** ‏ @juancampa](https://twitter.com/juancampa)

I had not even heard or seen a whisper about [Gearset](http://www.thecomplot.com/gearset.html) in all my years of XNA and actually feel worse off because of that, the toolset looks absolutely amazing, enough to stop me in my tracks and pause to add it to this article before publishing, check it out below and you will see why.


## What you get

![src=]()

(Excerpt from the site)


### Features

Here’s a glimpse of what Gearset have to offer to professional and hobbyist XNA developers. New features will be coming soon so stay tuned.


#### 


#### Inspector

[![Inspector window](assets/img/posts/image-not-found.png)](http://www.thecomplot.com/inspector2.png)

Everybody loves Visual Studio’s Watch Window, we definitely do, it shows us in a convenient place the state of our data, and this information becomes extremely important when developing any kind of software and especially when debugging it.

When developing games, the need to break the game execution is sometimes too expensive, the break-modify-continue cycle can become quite slow and unproductive. With Inspector things are different, you have speedy and convenient read/write access to all your fields and properties for easy and productive tweaking. You can drag and drop to assign values, is that easy.


#### Finder

The Finder is the easiest way to get your game objects into the inspector. By default it will search through your Game’s Component collection but if you have a special object model (for example, a hierarchy of some game entities) you can easily customize the search function to better suit it.


#### 


#### Bender

Need to tweak a curve? Use Bender, Gearset’s integrated curve editor. You won’t have to stop your game execution anymore. You can create curves at runtime, you can also drag and drop it to an object in the Inspector, and you can save them when you’re ready. It’s just awesome.

[![ src=]()](http://www.thecomplot.com/bender1big.png)


#### Overlaid Plots

Want to know how this or that variable is behaving over time? We know you do, knowing it instead of guessing it makes a huge difference and the overlaid plot gear is just for that. Get a real-time, visual representation of your variables and really understand how your game is behaving. You’ll enjoy this one.

[![ src=]()](http://www.thecomplot.com/plotter1big.png)


#### Streamed Logging

Writing stuff to the console is an old-school debugging trick we’ve all used which usually works great. It works perfect until we start using it too much and our game’s output starts looking like a real mess with messages from unknowns sources mixed in a single text box of what is now useless garbage.

The Logger gives the programmer a clear view of when and where every log message was generated in a speedy and convenient window. Just open the logger and get really into knowing how your game is doing. The generated log can be saved to a file which is extremely useful when added to a bug report. Your QA sessions’ productivity will be boosted.

[![The Logger window](assets/img/posts/image-not-found.png)](http://www.thecomplot.com/logger1.png)


#### Overlaid Geometry

Imagine that you’re trying to solve a bug, you realize that you need to visualize what’s going on better so you decide to draw a line, box, sphere, vector, 3D transform or whatever to get a clearer view of the situation. But you are not inside a Draw method! And the data you need to draw is not available inside any Draw method either. Gearset will help you in this situation, it can draw geometry and remember it so you don’t have to redraw it every frame (useful when data is only available for one frame, e.g. the game is making a decision)


#### 


#### Ease of use

One of the main goals while designing Gearset was to make it a tool that helped development without getting in your way. That’s why everything is conveniently done with a single line of code, take a look at the [User Guide](http://www.thecomplot.com/gearsetguide.html) examples and see what we mean.

Also, Gearset’s looks are minimalistic in order to take as little resources as possible, we understand that your game needs the resources, Gearset won’t steal them.


#### More…

- Quick actions: call methods with a button (reset your game, toggle stuff on/off, whatever you can think of)
- Overlaid value tree: show values in a convenient tree view.
- Overlaid text labels: name things in 2D/3D space.
- Alerter: get alerted when something very important happens in your code.
- We have plenty of ideas for future versions of Gearset. If you have some,[please let us know](http://gearset.uservoice.com/) and we’ll try to help.


### Gearset Pro

Gearset Pro adds the ability to modify your objects’ fields and properties in real-time from The Inspector. This is the only missing feature in the free version.

To upgrade to Gearset Pro, you simply need to [purchase a license](http://www.thecomplot.com/lib/developer) and generate a Product Key for your computer.


## Framework support

Told you.

As framework support goes Gearset has only been exclusively used on native XNA but after an hour or so pouring over the docs which state “its compatible with any XNA based framework” I have no reason to doubt it would not work with any of our XNA Futures contenders (except UnityXNA though).  I would have to wonder what it would take to get this working with Unity though, maybe a thought to add in to the feature request list.

> ![src=]()    MonoGame – LIKELY\*(The docs state any XNA based framework should be supported however it has not been tested as far as I can see)  
> ![src=]()    UnityXNA – NO  
> ![src=]()    SunBurn Platform API – LIKELY\*(With a little effort updating the tile renderers for the Platform API way of doing things)  
> ![src=]()    SunBurn Gaming Engine – POSSIBLY\* (As SunBurn is based on XNA, according to the docs it should be supported but has not been tested as yet)


## Current Status

Gearset is still in full development and support at present and they seem to have a yearly release cycle, V2 was released in Feb 2012 with the previous release about the same time the previous year.

Not sure if this has waned over the last year with the current state of XNA but the author Juan is still quite active on twitter.

Price:

- Basic – FREE
- Pro – $35

* * *


# Final Round-up

Hopefully through this article I have shown you some more XNA tricks that viable going forward and which frameworks will work straight away and which need a little a little love but will eventually offer a great deal more.  All apart from UnityXNA can make use of these frameworks to make your life easier going forward.

So whether you want to use this as you base with MonoGame or the SunBurn Platform API, or just extend the already extensive SunBurn engine, even possibly use it with Unity3D itself.  All these XNA treasures are mint for the taking and helping to build your dream.

\*Update

I must say Gearset certainly blew me away by it is shear scale and capabilities, more so because I had not even heard of it until today, certainly worth a try.

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/xna-and-beyond-the-notable-mentions/) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/xna-and-beyond-the-notable-mentions/)<script type="text/javascript">// <![CDATA[
var dzone_url = 'http://darkgenesis.zenithmoon.com/xna-and-beyond-the-notable-mentions/';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_title = 'XNA and Beyond, the notable mentions';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_blurb = 'XNA and Beyond, the notable mentions';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_style = '2';
// ]]></script>  
<script type="text/javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js" language="javascript"></script><script type="text/javascript">// <![CDATA[
var addthis_pub="runxc1";
// ]]></script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)  <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>[CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591)
