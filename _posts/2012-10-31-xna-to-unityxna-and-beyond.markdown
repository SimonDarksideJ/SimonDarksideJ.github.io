---
layout: post
title: XNA to UnityXNA and Beyond
date: 2012-10-31 15:38:34
tags: [xna, unity3d]
---

Continuing on the exploration of XNA future I posted about an interesting new framework that was brewing by [Barnaby Smith over at MVINetwork](http://mvinetwork.co.uk/), a curious project aiming to bring the ease of use of XNA into the Unity3D engine.

The project itself is fascinating but at its heart basically just a wrapper around the Unity engine in the same way that [MonoGame](http://monogame.codeplex.com) is a wrapper around SharpDX and Mono.

> One word of caution for the eager beginner, UNITYXNA is still in its infancy but shows a great deal of promise, in all likelihood you will be contributing to the project in order to get your project running.

So let’s see what UNITYXNA gives us.

> Another caveat that I will mention, at the time of writing UnityXNA holds great promise but is still just a published proof of concept, its only limitation is that it has only been written for doing 2D sprite based games so far.  It could do 3D in the future but it will need some support to get there.  As Stated above if you are ok with getting your hands dirty this will be an exception easy route for XNA developers to use Unity to deploy their games.

* * *


# Background

| ![src=]() | ![src=]() |

It was a short while ago that I got involved with Barnaby with the [UnityXNA](https://github.com/mvi/UnityXNA) project (I’ve known Barnaby aka [MVINetwork](https://twitter.com/mvinetwork) for several years now through my XNAUK years), the chance to use XNA knowledge in Unity3D was very appealing.

Unity3D (to the uninitiated) is a full-fledged multi-platform game building engine and framework, it has a lot of power and for the beginner game developer it is a very appealing option, it is power through has a small price as you have to learn the way Unity want you to make games.  To XNA, Unity is a very unfamiliar beast.

Its main power comes in the platforms is supports, at the time of writing Unity now supports:

- Web (supported by most browsers)
- Windows (now including Windows 8 as of the November 2012 with V4)
- Windows Phone 8 (again as of November 2012 with V4)
- IOS – both iPhone and iPad
- Android
- Linux
- Flash Player

Unity has a similar Content Management system which promotes re-use and certainly has a lot more extensibility out of the box, plus it is backed by a huge assets store full of pre made assets, audio, artwork and even full components chocked full of stuff.  I know a fair few people leaving the XNA ship have jumped on to Unity and never looked back.

Unity also has lots of plug-ins and features plus the ability to do some 3D modelling in its editor, there are particle and physics systems built in to the engine and a fair about of documentation and tutorials about how to use and make the best of Unity.

As you might expect through all these features come at a price, up until fairly recently the entry price for Unity was $500 for the basic version and $1500 for the professional edition.  The basic version is now FREE however and available on most platforms.  Store prices vary but there are some free assets to get you started in most cases.  I have not seen any figures myself, however most people I talk to say that if you going to be serious in Unity then you will need the Professional version.

The cost does not stop there however as there are additional charges if you want to deploy to any platform other than Windows / Web then there is an extra $500 per platform cost for the plug in to deploy, you can still develop and test for free (although for IOS you will need a Mac to test, can code in Windows).  These costs are as of Unity 3.5 and may change with the release of V4.

So a powerful package but with an associated cost.  There is more to say about Unity but not strictly relevant to this article.

* * *


# Out of the Box

![src=]()

Now to use [UnityXNA](https://github.com/mvi/UnityXNA) you will of course need to install Unity3D itself which can be downloaded for free (he basic version) from unity3d.com.

As for getting access to the [UnityXNA](https://github.com/mvi/UnityXNA) framework you have two options, either download the source from GitHub or you can just use this “[Unity Package](http://startrooper2dxna.codeplex.com/releases/view/97055)” I created from the source to make consumption quick and easy (The GIT package comes pre-loaded with the XNA Platformer sample which you will have to strip out to make your own game, the “Unity Package” is already pre-cleaned)

- [Unity 3D download](http://unity3d.com/unity/download/) (approx. 500mb)
- [UnityXNA](https://github.com/mvi/UnityXNA) (GitHub)
- [UnityXNA “Unity package”](http://startrooper2dxna.codeplex.com/releases/view/97055)

Once you have Unity up and running you can either open up the GitHub Source as a project (point it at the folder you have it stored when asked), or you can start a new “Project” and use the pre-prepared package I made.

To use the package simply copy it to the Unity install folder under “Editor\Standard Packages”, **e.g.**

> **C:\Program Files (x86)\Unity\Editor\Standard Packages**

 

Now create a folder on your machine for the project and then start a new project in Unity using “File –\> New Project”

[![image](/assets/img/wordpress/2012/10/image7.png "image")](/assets/img/wordpress/2012/10/image7.png)

You should now see the “New Project” dialog, select the folder you created for the project and if you copied the “UnityXNA” package into the correct location you will also see the “Import Package” for UnityXNA:

[![image](/assets/img/wordpress/2012/10/image8.png "image")](/assets/img/wordpress/2012/10/image8.png)

Now (after selecting the UnityXNA package) if you click on create you will be presented with the Unity3D editor and the UnityXNA package contents:

(If you just opened the downloaded source from GitHub you would see the following plus the XNA platformer content)

[![image](/assets/img/wordpress/2012/10/image9.png "image")](/assets/img/wordpress/2012/10/image9.png)

This is what we get in the project contents:

[![image](/assets/img/wordpress/2012/11/image3.png "image")](/assets/img/wordpress/2012/11/image4.png)

* * *


# Content Processing

[![image](/assets/img/wordpress/2012/10/image14.png "image")](/assets/img/wordpress/2012/10/image14.png)

Now unlike MonoGame, Unity does not need you to pre-process your assets before loading them in to Unity, you can just copy them directly into the Unity project by dragging and dropping them into the Content Folder.  There are a few exceptions that I’ve found:

- UnityXNA will handle spritefont files for text but Unity itself does not understand the “.spritefont” extension. The Simple answer to this for UnityXNA is rename them to “.TXT” files, no other change needed.

- XNA supports Microsoft’s DirectX “.X” format for 3D models, however Unity3D does not.  After several hours of searching I do have a solution for using .X files in Unity but that is for another post.  UnityXNA only supports 2D at the moment so it is out of the bounds for this article.

Other than that there is NO change, all your assets will work as is, +1 for Unity.

Unity3D (like Visual Studio 2012) also has an asset / model inspector so you can see your assets from inside the editor without having to run your game, great for checking the asset has been prepared correctly:

[![image](/assets/img/wordpress/2012/10/image10.png "image")](/assets/img/wordpress/2012/10/image10.png)

* * *


# Getting Started

![src=]()

Once you have imported all your content for your 2D game you need to start putting in your code and thanks to Barnaby’s efforts this is just as simple, under the “XNAGame” folder (if you used the Unity Package) you will find a “Game.cs” project file, just as you do with any out of the box XNA Project, just start creating your game under this folder.

If you are porting your project over just ensure that you update your “Namespaces” appropriately, or fix the broken reference links in the “XNALauncher” script file if you change it. (If you used the GIT package, you will see the “PlatformerGame.cs” file and all the other XNA sample code)

Now by default the Unity3D editor uses MonoDevelop as its development studio to edit code files, but thankfully since Unity3D 3.5 you can now also use Visual Studio, to configure this just go to “Edit –\> Preferences” in the Unity Editor and under the “External Tools” tab just change the “External Script Editor” option to “Visual Studio” (it is unclear from the documentation whether Visual Studio Express is enough to enable this integration, possibly only Standard and above may do)

[![image](/assets/img/wordpress/2012/10/image11.png "image")](/assets/img/wordpress/2012/10/image11.png)

* * *


# Building this puppy

![src=]()

While developing you can run your project at any time by hitting the big “Play” button at the top of the screen, you can even pause part way through game play to inspect it. (Or use the menu options in the “Edit” branch),

> \*\*Note
> 
> You must have your “Start” scene selected / open for it to run, else you will just see a big blue window.  If in doubt, double click the “Scene” object in the Project window.

When you have your game all up and running and you are ready to deploy, then Unity again makes this process very easy (I could argue it is even easier than [MonoGame](http://monogame.codeplex.com) at present).

Just Select “File –\> Build & Run” (or just “Build Settings”) and you will be presented with the “Build Settings” screen:

[![image](/assets/img/wordpress/2012/10/image12.png "image")](/assets/img/wordpress/2012/10/image12.png)

From here (after you select / add your scene) you can select the platform you wish to create a package for from the selection available plus any additional options for either development or platform purposes, for example the Windows “Target Platform” option lets you target 64bit Windows, 32Bit Windows or Mac.

> \*\*Note
> 
> Platforms you are not licensed for or have not purchased will still show up, you just wo not be able to click the “Build” button and will see a nice Red message informing you why.
> 
> For IOS as stated previously, you wo not be able to use this option unless running on a Mac
> 
> (For the record I have no idea why you can build for Mac but not for IOS in windows!)

This will generate either an EXE, or a web page and all the associated content needed to deploy your game.

* * *


# What is Missing?

![src=]()

At present the framework is purely targeting at 2D graphics and sprite manipulations, most “but not all” XNA extensions have been written in and wrapped around the Unity3D Engine, also:

- There is no 3D at the time of writing.
- Input is currently limited to keyboard (but easily extendable)
- No SoundEffectInstance or other advanced sound options but this is mainly because Unity does everything as a “Sound/song” so you just need to alter your implementation. (Example in the GIT source)

Now to most, this will be enough to turn you away from this amazing project but remember, Barnaby has done all the hard work of getting the base XNA components and drawing pipeline in place and those bits that are missing are just additional wrappers and / or missing extensions.  I myself added sprite scaling in only a matter of minutes.

It is not complete but there is a lot to build from, if you have purely a 2D project and want to deploy to web, this is a very easy and attractive option.

For 3D there may need to be a bit of community effort to bring it to life, but boy what an XNA project that would be ![Open-mouthed smile](/assets/img/wordpress/2012/10/wlEmoticon-openmouthedsmile1.png), Unity without having to learn Unity.

* * *


# Going forward

![src=]()

Now I’ve stated quite a few times that this is an experimental early release of UnityXNA, Barnaby is not doing any further work himself as he reached his goals for the project.

This does not prevent you from dabbling, I myself spent a few hours going through the implementation making tweaks (mainly around sprite scaling) while doing my sample project, in fact others have already contributed by implementing the XNA Game Component system, both standard and drawable version plus a load of extra extensions.

If you want a quick and easy answer without learning all of Unity’s quirks and features then UnityXNA gives you all the benefit and ease of XNA game programming while leveraging the powerful asset and deployment options of Unity.

And just to show I’m building from a strong base, here is my Starter 2D series tutorial ported to UnityXNA in only 1 hour, most of which was just removing touch / accelerometer functionality because it was a Windows Phone project.

[![image](/assets/img/wordpress/2012/10/image13.png "image")](/assets/img/wordpress/2012/10/image13.png)

As with the MonoGame article I will release my sample above when I get a chance ![Open-mouthed smile](/assets/img/wordpress/2012/10/wlEmoticon-openmouthedsmile1.png).

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/xna-to-unityxna-and-beyond/) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/xna-to-unityxna-and-beyond/) <script type="text/javascript">var dzone_url = 'http://darkgenesis.zenithmoon.com/xna-to-unityxna-and-beyond/';</script>  
<script type="text/javascript">var dzone_title = 'XNA to UnityXNA and Beyond';</script>  
<script type="text/javascript">var dzone_blurb = 'XNA to UnityXNA and Beyond';</script>  
<script type="text/javascript">var dzone_style = '2';</script>  
<script language="javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js"></script><script type="text/javascript">var addthis_pub="runxc1";</script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)   <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script> [CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591) 
