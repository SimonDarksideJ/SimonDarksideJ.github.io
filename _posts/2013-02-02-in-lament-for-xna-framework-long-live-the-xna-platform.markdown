---
layout: post
title: In lament for XNA Framework, long live the XNA platform
date: '2013-02-02 00:45:48'
tags:
- book
- codeproject
- information
- xna
- xna-related
---

[![ src=]()](http://blogs.msdn.com/b/mikeormond/archive/2011/09/22/windows-phone-ebook-1st-edition-published)

A ways back when, Mike Ormond (Microsoft Evangelist for Windows Phone and all round nice guy) put out a request for articles for a Microsoft sponsored Windows Phone book ([which you can still find the first edition of here](http://www.lulu.com/shop/pete-vickers-and-andy-gore-and-mike-hole-and-gergely-orosz/building-windows-phone-apps-a-developers-guide/paperback/product-17266975.html;jsessionid=0ADE9DCE924A5DC7702167D8E094EA5E)), I like so many others gladly took up the challenge and wrote a chapter or two for said book and submitted them.

Sadly only a portion of which actually made the first edition due to time and reviewing constraints, even more sadly mine was one of those (hence XNA was kinda left out of the 1<sup>st</sup> edition), but after speaking to Mike this was Just temporary and he was working on the 2<sup>nd</sup> edition to add all the additional chapters that were missed from the first run.

Unfortunately not all of the right people were in the right place at the right time to actually make this happen and the remaining chapters were left to the cutting room floor, so with today’s recent acknowledgement from Microsoft that they are closing the door on future XNA development on their part and dismantling the MVP support network for XNA I thought it about time I at least circulate my contribution to the book effort, hopefully any other fellow chapter authors will do the same.

* * *

# Not the End?

Well even with Microsoft’s announcement this is still not the end for XNA, as my beyond series shows there is still life in the orgasmic sphere of influence that is XNA and what people and devs alike have learned over the past 6 – 7 years is still valid tomorrow thanks to all the community efforts of teams like @MonoGameTeam with [www.monogame.net](http://www.monogame.net) and the SunBurn Gaming Engine [www.synapsegaming.com](http://www.synapsegaming.com) plus so many others that I’ll continue to mention here on this blog and shout as I’m sure many more will appear from the gulf.

# SO goodbye XNA framework and LONG LIVE THE XNA PLATFORM!!!

# (or thanks MS, so long and thanks for all the fish)

That being said, enjoy the read and if you like it, circulate it

* * *

# Last Note

Get involve and share your stories with the rest of the tweetverse on the #**[becauseofXNA](https://twitter.com/search?q=%23becauseofxna&src=typd)** hashtag where many a gritted soul has barred their soul on what XNA has done for them and how their lives have improved (or worsened in some cases) thanks to XNA, viv la revolution!!!

* * *

# Chapter X – XNA Framework and Windows Phone 7

What started out as a dream soon became a reality, let indie developers with just a basic background in C# start developing games for the XBOX 360, and so XNA was born.

Back in the year 2003 from the graceful ashes of what was MDX (Managed Direct X, a superset of functionality from the Direct X 9 API) XNA was drafted by a newly formed Microsoft team, it’s goal to give access to XBOX development (albeit with reduced functionality from the premier native XBOX and XBLA experience) to a much wider audience and allow individual developers bring their own experiences to the platform combined with the added benefit of also allowing easier entry level PC gaming development over the traditional C++ route.

Several years on and the XNA framework has been through 4 major revisions and now has now even extended its reach to the new Windows Phone 7 platform, some sacrifices have had to be made to enable this breadth of choice (which will be detailed later) but the core remains the same, allowing a true multi-platform experience from the same C# code.

Put simply, XNA (which is not an acronym for a change) allows any developer with a basic understanding of .NET and C# to craft their dream and make it into a reality, the only limit is their imagination.

Detailed below is a brief overview of each of the components in the XNA framework, a breakdown on the differences that need to be taken into account for Windows Phone 7 and some tips and tricks for how to get the most out of the device. If you are new to XNA I suggest you first visit the App Hub site and read through the educational content for learning XNA before reading the rest of this chapter.

## 2D / 3D / Silverlight – Which to choose

Games, Games, Games, everyone likes games (well at least the interesting people J) but when it comes to mobile careful consideration is needed to decide on what type of game best fits the profile. This is the same of course if you are developing for the PC or XBOX, however for Windows Phone 7 you are both restricted and enabled in all sorts of ways in which the other platforms can only dream of.

The first kicking off point is which framework to use, other chapters of this book talk primarily about Silverlight which can also be used for creating games, mainly 2D or ‘tap and type’ style games but It can also do some faux 3D environments with a bit of trickery, great performance however is hard to come by unless you have uber skills in that area.

XNA on the other hand is well suited for 3D and doesn’t have the same overhead that Silverlight does for game with intensive graphics, on the other hand XNA is just as suited for 2D games as well (especially if you want high end graphics all over the place).

With Mango (the next version of the WP7 platform) there is also the ability to mix together these two frameworks to get the best of both worlds, but more on that later.

When you are first drafting out your game idea, start thinking of what you expect the gamers experience to be, if its event based when the next event is decided by a player interaction (Like Simon Say’s or a Slot machine) then Silverlight is likely to be the best choice. If you want a fly by the seat of your pants flyer with explosions going off left and right or a clever marble maze kind of game then strap up tight and read on.

In either case go with what you are comfortable with and if you hit problems with either getting something to work just right or aren’t getting the performance you need then don’t be afraid to try something new, whether it is Silverlight or XNA, both are indeed great frameworks and each have their own unique benefits.

## Graphics

From reading the other chapters of this book you should already understand that Silverlight is mainly an event based framework (similar to Win Forms), you can introduce a fixed loop to recreate some continual actions on a timely basis but at its core Silverlight is still just waiting for the next human interaction.

XNA and gaming in general though is the complete opposite, everything is in continual motion with two main actions (update and draw) that are endlessly being called in repetition while the game is running (even with on screen menu’s that may seem static):

![src=]()

The update action commonly checks game logic and user input (also used for AI, Path-finding and physics), the Draw loop is (as you would expect) for drawing on the screen. This may seem a little one sided but believe me, some graphical draw operations can be very intensive, basically update operations are all about the CPU (Core Processing Unit or processor of a computer/phone) and the Draw part of the loop is all about the GPU (Graphics Processing Unit or graphics card), although in some cases Physics engines have also been made to work on the GPU to draw power for both sides.

The second major difference between Silverlight and XNA is with how we handle sending graphics to the screen, in Silverlight you have a compositor thread that controls all screen refreshes and uses the command language / framework of XAML to intelligently only draw portions of the screen that it needs to, this can be both efficient and costly at the same time, but for the most part everything is done for you. With XNA it’s all on you, this might sound daunting at first but it give you that extra bit of control that is needed to get some really flashy effects.

With XNA everything that is drawn is a texture or image (even text) as it is drawn to the screen and you may even draw several times to the screen for a single frame, it all depends on how complex you want to be and the look and feel you are aiming for.

In the following sections I’ll highlight over some of the core concepts you need to be aware of with using XNA on the phone, for more in-depth detail see the App Hub educational content or the MSDN library for reference.

### Framework Basics

The XNA framework is mostly the same as its XBOX and PC brothers so any training material out there for XNA will suit you well, however as Windows Phone 7 is a mobile platform there are some restrictions and new offerings, namely:

| 
### Feature / Platform
 | 
### XBOX / PC
 | 
### Phone
 |
| Max Screen Resolution | 1920×1080  
(Determined by HW) | 800×480 Portrait  
480×800 landscape |
| Programmable shader support | Yes | No |
| Input controllers | Gamepad / Chatpad / Keyboard (PC) / Mouse (PC) | Touch screen, Accelerometer, GPS, Gyroscope (Mango) |
| Audio | XACT / Wav files | Wav, WMA, MP3 |
| Video | None (community video player available but not supported) | WMV (possibly MP4 through Media player) |
| Web Support | None (custom web available on PC) | Yes (including socket support in Mango) |

There are several of other differences but these are the primary highlights.

### Resolutions / Viewports

As shown above, the Windows Phone 7 device natively operates with a resolution of 800×480 (800 pixels high by 480 pixels wide), or 480×800 if viewing in landscape with the phone rotated on its side.

When working with screen sizes such as this on the phone obviously the screen real estate is a lot smaller so you need to either scale down your game for what you have or implement some kind of zooming / skipping feature in order to bring your game world into view.

But graphics operations are very resource intensive, you may find that to get the level of detail you wish from your game (especially if you are porting from XBOX or PC) may either drain the battery too quickly or more likely cause the game to run slow. However the hardware in this case is there to help you as the phone comes equipped with a hardware scalar that is very efficient and almost free to use, to make use of this is even easier, all you need to do to use it is to reduce the resolution of your game by a factor of 2, for example:

| **Aspect / Orientation** | **Portrait** | **Landscape** |
| Native | 800×480 | 480×800 |
| Power of 2 | 400×240 | 240×400 |
| Power of 4 | 200×120 | 120×200 |

This can provide a significant boost to your game performance.

To do this, place the following in the constructor of your main Game class:

![src=]()

If you also want to force an orientation rather than let the hardware scalar do it for you, you can also set it like this:

![src=]()

Alternately if you wish to support multiple orientations then allow more orientations and override the “OrientationChanged” event to set the resolution appropriately in the code section below.

Don’t forget the hardware scalar will do this automatically for you, but in general this usually messes up the aspect ratio of what you are drawing, in short, test and if you have problems implement the code below.

![src=]()

Another (almost daft) trick is to make use of the full screen on the phone by removing the system tray that the WP7 framework places at the top of the screen, this is intended to convey information such as battery life, single strength and the time to the user but in games it’s just an extra bit of screen real estate that most 3D games need for their experience.

I’d recommend you try and leave it up if possible in your game as most users prefer this but if you are hungry for those extra 20 pixels, just take them.

To remove the system tray simply put the following in your games constructor:

![src=]()

### Textures / Sprites

As described earlier everything in XNA is an image / texture that are written to the screen, they may also a classification called a sprite which usually refers to a collection of images that form an animation of some kind.

The main thing to consider with the phone apart from the obvious screen resolution reduction, is that the phone can also only handle so many textures drawn the screen at any one time, which is a sum total of all images you will draw in a frame. The phone support up to 2000 x 2000 pixels worth of images which may sound a lot but after so many layers and effects drawn to the screen this can be consumed very quickly, above this limit Windows Phone is supposed to sample the images at a lower resolution but in most cases it can cause the graphics card to crash (making the screen black while your game still runs) with little or no indication as to why, there are things worse in game development than your game running slowly.

Windows Phone natively supports both JPG and PNG image formats, when choosing between them one of the easiest things that you can do to improve performance in your application is to use the appropriate image format. In general, the JPG decoder is much faster than the PNG encoder and should be used for images that are fully opaque. Images that use transparency should be stored as PNG because JPG does not support transparency. Be aware that while JPG works well for continuous tone images, including photographs, it may cause ringing and blocking artifacts in images with varying colours and gradients.

Now this isn’t the end of the story because XNA projects also support DDS (Direct Draw Surface) image files, the big advantage these have over JPG and PNG is that they are already decompressed and the phone knows this, so unlike JPG and PNG the hardware has no need to decode these images to present them and can just send them straight through to the graphics card.

As described in the introduction to this section, size is important, but the correct size is also important. Shawn Hargreaves post about texture resolutions and mip-maps is a very good read and can be [found here](http://blogs.msdn.com/b/shawnhar/archive/2009/09/14/texture-filtering-mipmaps) (http://blogs.msdn.com/b/shawnhar/archive/2009/09/14/texture-filtering-mipmaps).

What this breaks down to is that you should size down your textures to the level that is visually acceptable on the device, the smaller the better, if possible also combine images that are used together on the same screen into a single texture and use rectangles to pick the images off that texture when drawing to the screen (this greatly reduces the amount of work needed to transfer images to the graphics device).

For example here’s a simple space background image that could be used in a standard top down shooter type game:

![src=]()

_(Stock Image curtsey of CG4TV)_

It’s fine for the PC or but weighs in at over 580kb with a resolution of 1280×960 (I’ve seen even more high resolution content used in other games and this is just one layer in a multi-layer screen when it’s drawn but for on the phone.

So the first obvious thing to do would be to reduce the resolution of the image to fit the phone, so down to 800×480:

![src=]()

_Reduced to 800×480 – 120Kb JPG_

This is all well and good and has also reduced the size of our image but let us not also forget that the phones graphics memory is also limited to 2Mb per frame (you get some very interesting issues when you try and go above this including the game crashing for no reason or logic)

So I use a little tool from ATI called “The Compressonator” ([http://developer.amd.com/tools/compressonator/pages/default](http://developer.amd.com/tools/compressonator/pages/default)) which will compress or reduce your image and convert it to your requested format, as stated before having an image in DDS format makes the graphics card job easier and quicker. Within this we have two real options:

- 
DXT 1 – flattens the image and removes the Alpha Channel to save space  

This is good for Opaque images without transparency

- 
DXT 5 – Flattens the image in pretty much the same way as DXT 1 but retains the Alpha channel  

If you need transparency in your image then this is your only option other than staying with JPG or PNG

The best advice here is to try both compression modes and see which one works best for each asset you are reducing, now one thing you may notice is that this actually increases your file size, so you are sacrificing some space (both in the XAP and the deployment) to save on performance when drawing to the screen but it is usually still smaller than the original large asset you may have started with.

| DXT 1 compression – 188kb | DXT 5 Compression – 376kb |
| ![src=]() | ![src=]() |

You may not notice too much difference here (apart from the size) but both will behave differently when used in drawing to the screen.

As with any other performance gaining tip though there is one thing to keep in mind, keep these tips in mind when building / designing your game but only really start pushing this when you have a problem or are running close to the wire, like everything else it’s all a matter of experience to know when to implement these tricks and how far you have to go.

### Shaders

As stated previously Windows Phone 7 does not support programmable shaders, so where does that leave us when we want to do really fancy graphical effects such as:

- 
SkyBox’s  

- 
Static lighting  

- 
Environment Mapping  

- 
Enabling Fog and Level of Detail (LOD)  

- 
Billboards  

- 
Animation and Skinning  

The XNA team saw this and created 5 custom built shader classes into the framework for WP7, some of which existed before and have been tweaked to work better on the phone whereas others are new, these are:

- 
Basic Effects  

A basic effect includes transforms and basic lighting for Blinn-Phong shading. You have the option of adding up to three more directional lights, fog, and a texture. Use one light for the fastest performance, and use three lights for more interesting 3D lighting.

- 
Dual Texture Effects  

A dual texture effect uses two textures with two independent sets of texture coordinates. When you blend the two textures, you generate a lot more visual complexity if the first texture contains the basic colour or detail, and the second texture contains complex lighting.

- 
Alpha Test Effect  

An alpha test effect uses a reference alpha and an alpha function to implement alpha testing. This can greatly improve rendering performance by only updating pixels where objects are being drawn in a scene. Alpha testing is common when depth/stencil buffers are not used.

- 
Skinned Effect  

A skinned effect uses bones and weights to influence vertex positions, that is, to move or deform an object. This works very well for character animation and instancing. The effect supports up to 72 bones, with up to 4 weights per bone.

- 
Environment Map Effect  

An environment map effect uses a diffuse texture to colour or detail an object, and a cube map texture containing an environment map to shade the object due to the environment. Because the object reflects the scene, this makes the object look more like it is in a real scene. Also, you can use the fresnel parameter to tune the amount of light reflected (shininess) based on the geometry of the surface.

Now on their own these default effects can be used to create some stunning environments but as shown at the TechDays Online conference, Edward Powel of XNA-UK.NET showed how to get even more out of them with just a little effort, creating a fully working Skybox, a deformable ocean and shadowing techniques, all of which is available on [Ed’s blog](http://xna-uk.net/blogs/braindump/default) to view and learn from. ([http://xna-uk.net/blogs/braindump/default](http://xna-uk.net/blogs/braindump/default))

The general feel from reading Ed’s articles should give you the impression that with these shaders there is certainly not a one size fits all, in a lot of cases the BasicEffect shader will give you most of what you will need which is a testament to the skills of the XNA team that created them. Each of the other shader types are very specific for the tasks they were created for, the Dual Texture effect for example was for lighting situations where you want to get free and quick fixed lights into a scene and the Skinned Effect was for applying textures to models and support for animation in models.

The Reach Demo (available on the AppHub Educational Content) gives the best examples for the common applications of each effect and as for other scenarios just play around with it where needed.

As for programmable shaders they have not been discounted for future editions of the XNA framework on the Phone and what we have been given already was simply the best they could provide in the short time that the phone has been around, given the complex nature of implementing these kinds of shaders on a restricted graphics set they have done an amazing job and I look forward to what they can bring in the future.

The SunBurn engine (detailed later) shows exactly just what can be done with this limited set of shaders and a bit of magic to create some really stunning effects including:

- Diffuse and emissive mapping  
- Light mapped lighting
- Composite dynamic lighting
- Volume lighting
- 
Bloom and post-processing.  

### Models

If you are venturing into the world of 3D and investing in some 3D models (or crafting your own) then the same models that can be used for XBOX and PC in the XNA framework will work for Windows Phone 7, but as ever size matters.

Models simply need to be less complex (fewer triangles) as it is just raw triangle pushing power that is reduced, there haven’t been any studies done to give an accurate number of triangles that can be processed each frame (mainly because there are so many variations possible) so just keep things simple and improve when you have room. When combined with the scaling techniques you can still get a lot of content on the device and get some interesting effects.

Unfortunately at this time programmable shaders are unavailable on the device so advanced techniques such as imposters (duplicating 3D content on the GPU) cannot be used which creates a problem if you want to draw lots of the same model, however Shawn Hargreaves does come to the rescue here as shown in the Reach Demo, a technique to draw a model to the screen as a texture and then reuse that texture for drawing duplicates, this does have one limitation that you cannot have different poses or orientations for your duplicates.

Another thing to keep in mind is only to use 3D models where you need to, if you can have a 2D texture represent something, then use it as this is easier for the GPU to handle.

If you are going to use SunBurn or other 3D engine, be keenly aware of the format of the models you are going to use as each have particular differences, for example SunBurn for the moment requires a separate lightmap channel (_http://bit.ly/hHxM5T_) to use models in game and Engines such as Balder only support the ASE (Autodesk) format for models.

### Effects

Even with the simplified graphics device on the phone a lot of great effects can still be achieved. Particle effects (the method of overlaying multiple sprites together with blending, usually in the thousands) are still very much possible or other texture blending techniques.

Post screen processing is still possible as the phone has a single Render Target (a technique where by the output of the graphics card can be captured into a new texture for future use) that can be manipulated before sending back to the screen for presentation, however those manipulations at this time have to be done on the CPU due to the lack of programmable shaders, so this operation can be quite expensive if done wrong but as shown by engines such as SunBurn, exotic effects can still be achieved.

Wherever possible though, the best idea is to pre-process your textures used in such effects in advance, so if you need effects such as bloom and glow on a sprite for your fancy Photon Torpedo, then enhance the source image in Paint.Net, Photoshop or other graphics app of your choice. This is not always necessary but is recommended as shown below:

For example in one of the particle effects I created for a 2D game on the phone I started off with this sprite for my particle effect:

![src=]()

Now this might seem plain but when drawn approx 5 times on top of it ‘self on the screen and combined with another smoke type texture I was able to produce this after a few tweaks and a series of experimentation:

| [![ src=]()](http://xna-uk.net/blogs/darkgenesis/image_3DE62F31.png) | [![ src=]()](http://xna-uk.net/blogs/darkgenesis/image_5B4798C9.png) | [![ src=]()](http://xna-uk.net/blogs/darkgenesis/image_69B26F21.png) | [![ src=]()](http://xna-uk.net/blogs/darkgenesis/image_01495AEE.png) | [![ src=]()](http://xna-uk.net/blogs/darkgenesis/image_77FCF9DF.png) |
| 1st run, way too many particles and they didn’t follow the emitter, except flame up | Fewer particles but they didn’t last long enough or spawn quickly enough.  Also too big | Got the fireball right but we needed more | Great effect, something to keep for later.  Not the ball I wanted.  
May be to use in a different colour as a plasma ball? | The end result. |

Now as I wanted a very bright effect I could of also brightened up the original texture and done some additional brushed and highlights I might not have needed so much overdraw for the final result, however in this case I had enough performance to not warrant further work.

Starting with something like this for example would need little post processing or overdraw in a game but would probably need a little help for that extra effect or a second darker transparent image overlaid:

![src=]()

## 

## Audio

In a strange twist of fate XNA is actually the manager for the majority of audio and sounds to come out of apps and games, even in Silverlight.

Not much has changed in regards to audio, we still have:

- 
Sound Effects  

The raw sound file stored in memory when loaded from the content pipeline. This can only be played once at a time at the recorded volume and pitch.

- 
Sound Effect Instances  

Streamed versions of a sound effect, can be several from the same sound. An instance allows a greater degree of control over the playing of the sound such as pitch, speed and looping of the sound.

### Media Library

The other engine that can play sounds is the Media Library the native audio playing engine of the device, it however can only play songs and mp3’s from its stored media library, we can upload songs to this via XNA and then ask the Media Library to play them for us but there is limited control in doing this.

It is best used for background music or overall game music, something you expect to play for long durations. There are no metrics at present to see if using the Media Library or XNA sound effects uses more power or performance, so see what works for you, however shipping MP3’s with your game will reduce the size of your eventual deployment so keep this in mind.

### Are you in Control

Whether you are using the Media Library for your background music or a sound effect looped through a sound effect instance, you need to check if your game or app has the right to play music when you start. (This however does not apply to individual sound effects, just any sound that is played continuously in the background), the reason for this is that it is a market place requirement, the phone user must have complete control over the experience of the device including the ability to continue to listen to what ever music they are currently listening to while they use your app / game.

The test itself is simple, just check the “MediaPlayer.GameHasControl” Property on start-up, and if it is false just disable in game music or just not start it.

It is good practice (if you are using audio) to have both sound effects and music controllable by the player through some options screen so they can choose to enable / disable it if they so wish, or have an icon displayed on the screen (the speaker icon is the standard) which when tapped will toggle on / off the game audio

## Content Pipeline

The Content Pipeline is one of the more powerful yet most under used parts of the XNA framework, it has the ability to manipulate any external content into a fashion that can be used by your game during run time, and its only limitation is that it can only be used during build time, it cannot be used while the game is running.

Assets are compiled when the game is built by the Content Pipeline which then converts and compresses them into the game DLL.

XNA comes with several importers out of the box for textures (JPEG and PNG), models (.X and FBX), audio (WMV / WMA / MP3), video (WMV), fonts (SpriteFont) and XML. These can either be extended or you can also create your own for custom formats (most commonly by creating a MAP file for a level and having a content importer to read it and then convert it to the game MAP format).

It is broken down into two parts:

- 
Content Importer – which tells the Content Pipeline how to read the asset, which may also include any decompression routines  

- 
Content Processor – Which will take the imported file and write it to a format understandable by the game, e.g. de-serialise an XML file into a class.  

Between these you can make extending your game or having your own custom assets to make the game much easier to create by preloading what you need in advance.

I highly recommend reading in more depth on the App Hub or the MSDN help that comes with the tools on how to make the most out of the content pipeline.

A good thing is that a Content Project (that contains the assets) is that it is fully transportable between projects so you can re-use the same assets, however it’s better to use a separate Content Project for the Windows Phone 7 Platform, compress or reduce your assets in the project but give them the exact same names as their counterparts, in this way you do not have to change your code to access the assets, only the asset itself as shown below in the example.

| ![src=]() | 

Example of the Windows solution for a multi-platform project.

It lays out the structure and some basic content used by the original windows / XBOX project including an example of one of the assets, it’s file name and it’s asset name.

 |
| 

![src=]()

 | 

Here is the same project but in the Windows Phone solution, it uses the same codebase converted to a windows Phone project and a copy of the Content project for the phone.

Assets have then been resized for the phone which then replace those assets in the content project (not replace the files themselves), however so that code remains the same the same asset name is used in both projects.

 |

## Integration with Silverlight (Mango)

With the latest iteration of the phones development, the Microsoft team has developed a synergy between the XNA and Silverlight frameworks. Previously this was not possible due to the inherent differences in the way each framework interacts with the graphics card.

In Mango however they have enabled a way for a Silverlight page to be rendered to a texture and thus used by XNA for it to be drawn to the screen like any other texture using a technique similar to XNA render targets, not only that the Silverlight renderer is also able to react to and feedback on user input on interactive controls such as buttons.

There is but one limitation with this current level of interaction however, that it is limited to a single Silverlight page, granted you can have as many user controls and animations on that page as you wish but the performance drain of using both frameworks is not yet clear. The best approach it seems is to break up the game into different phases (have a page per level for example) and limit the total number of requirements per page, similar to what is done for game states today.

But this is early days and with future evolutions of the collaboration between Silverlight and XNA may see even more functionality come available to make this easier and better.

If you are thinking of trying out and taking up the Silverlight / XNA integration then here are some top tips to be aware of:

- 
There is NO Game class!, a lot of functionality has been ported across, but not all. In most cases what you need is just somewhere else or is accessed in a slightly different way but it seems great strides have been made to ensure the core functionality works exactly as it did before.  

- 
The GraphicDevice has changed fairly dramatically, to render a page in XNA you need to turn on “Sharing” mode, to do this simply set the following in the “onNavigatedTo” and unset it in the “onNavigatedFrom” of the .CS file for each page you are using it on:  

![src=]()

The project templates do this for you so I suggest you use them as a base for your projects and migrate to them.

- 
Through the SharedGraphicsDeviceManager you can get access to the GraphicsDevice as you did previously (almost all functionality it seems was ported over, you just need to refer to the “Current” Graphics device as shown above. This is a static class so it is always available (unlike before)

 

- 
Unlike XNA there is not in built Timer to run updates so you need to wire up one of your own, again the project templates do this for you so it’s good to take note of how it’s done. What is not clear at the moment is that in App.XAML.cs (The application class) a FrameworkDispatcherTimer (of type GameTimer) is already declared but not actively used so we can only assume at this point it is for audio and should not be used for anything else at this point.  

- 
Game Components were one of the things that didn’t make the cut, but thankfully the XNA team recognised this gap and have provided a sample to aid in emulating them yourself, see the link below:  

([http://create.msdn.com/en-US/education/catalog/sample/silverlight\_xna\_game\_components](http://create.msdn.com/en-US/education/catalog/sample/silverlight_xna_game_components))

- 
Services (the services repository) did come across but are accessed in a specific way, if you need to refer to the Services Library under the Silverlight / XNA integration simply use the following:  

![src=]()

- 
GameTime is gone, it has been replaced by event arguments of the new GameTimer class, to use the values within just refer to the parameter of type GameTimerEventArgs, below is a table describing the differences:  

| 

**XNA GameTime class**

 | 

**Silverlight GameTimerEventArgs**

 |
| 

( **TimeSpan** ) ElapsedGameTime

 | 

( **TimeSpan** ) ElapsedTime

 |
| 

( **TimeSpan** ) TotalGameTime

 | 

( **TimeSpan** ) TotalTime

 |
| 

( **Bool** ) isRunningSlowly

 | 

Not available

 |

This turns out to be one of the more tricky things to handle if you just relied on GameTime being passed around in your game (just because the native XNA Update and Draw functions did), in practice you should only pass the specific value(s) you need rather than the whole class.

- 
Handling Orientation is a bit of a problem in the current framework as the enumerations for the types of orientation are different between Silverlight and XNA, to top this off the XNA functions for determining the current orientation are not available in the Silverlight integration. The best way to handle this is to use an extension method to convert the values provided by Silverlight to the XNA version, this makes the XNA side easier especially if you want to use the same code on other platforms:

![src=]()

## Re-Inventing the Wheel

Now some die hard geeks (like myself) prefer to do everything the hard way and spend months playing with and tweaking every area possible related to XNA, with areas such as Shaders, lighting and rendering it does take some specialist knowledge (or very long nights) to get the best performance and functionality, if however you just want to build a game there is another way.

There are several offerings out there to make game building easier, some are complete engines doing everything for you so that all you need to do is supply content, others are frameworks that just do the hard bits for you, in either case there is a world of choice, here’s a breakdown of what I’ve found useful in the months since the launch of Windows Phone 7

### SunBurn Engine

The SunBurn engine is an impressive piece of kit, it has an advanced lighting and rendering engine which is truly portable between XBOX, PC and WP7 and able to make the most out of each devices capabilities.

What really makes it stand out is the level of quality in its world editor, through this all manner of moulding, crafting and scripting is possible, it even has the ability to be extended through the use of components and enhancement scripts so it is even flexible.

It can also support 2D and 3D worlds or a mixture of both. There is also an extensive library of documentation and samples to get you up and running quickly and efficiently.

However this does come at a price as it has been the fruits of a small teams labour over several years, constantly tweaked and improved as can be shown by the level of capabilities on WP7 that others have not thought possible without the use of programmable shaders on the device.

For more details on SunBurn, [see here](http://www.synapsegaming.com/products/sunburn/engine/) ([http://www.synapsegaming.com/products/sunburn/engine](http://www.synapsegaming.com/products/sunburn/engine/))

**Price: $150 for standard, $250 for Professional(for xna devs with AppHub accounts)**

### Indie Game Framework

The indie game framework created by Philipe De’Silva is a community extension of the SunBurn Engine (which means you also need a SunBurn license to use it), it takes up where the SunBurn engine leaves off and provides a combination of technologies to further improve the use of the SunBurn engine, it provides facilities such as:

- 
GUI interfaces for games (for menu’s, HUD’s, etc)  

- 
Integrated Particle engine (through the use of the Mercury Particle Engine)  

- 
Artificial Intelligence with some state driven AI routines  

- 
Some encapsulation of SunBurn components to make integration even easier  

- 
Smarter Content management system  

- 
Enhanced Input support  

- 
Networking support  

Philip has toiled hard on the engine mainly to evolve and develop his own game projects. Unlike the SunBurn engine however, it is given away free under a community license with the code included, so even if you don’t want to buy a SunBurn license you can easily learn from his experience from enhancing your own games.

**Price: Free (requires SunBurn license for full use, see above)**

### Nuget

What do you mean you haven’t heard of NuGet! J.

NuGet is yet another fantastic community offering, one which however is fully supported by Microsoft. It has been around for quite a while now offering a complete library of installable libraries for use in your own projects.

What makes NuGet unique is the level at which it operates, the libraries which it manages may be single DLL’s or entire projects which when installed will fully integrate themselves into your own project including any dependencies it requires (potentially other NuGet libraries), add all necessary references needed to make it run and even supplies (in some cases) sample data and instruction on how to use the library.

There are already 1000’s of libraries available on NuGet to choose from for all types of projects such as MVC, ASP.NET, **(other examples)**. Several have also now emerged for WP7 as well, mostly projects that were already in existence which have been packaged up for NuGet distribution.

NuGet also has an update engine and so will inform you if there are updates to the packages and automatically update them on your request (granted you have to ask it to check first)

The only failing with NuGet is that you need to know what you are looking for, there isn’t (to my knowledge) an index or review site for all the NuGet packages out there but you can however search for packages based on your needs, there is a NuGet Explorer which is available but this just allows you to interrogate packages to see what they contain, but this pales in comparison to the benefits of what NuGet offers.

With Mango and the updated version of the tools NuGet can now be even integrated with the Express edition of the C# tools, previously it was only available to a full studio license or the express web edition, so now the tools are even more readily available.

Some packages of note are:

- 
Farseer Physics engine integration (XNA and Silverlight) (http://farseerphysics.codeplex.com/)  

A full 2D physics engine that is free to use and also works on WP7

 

- 
Babylon 3D Engine library

(http://babylontoolkit.codeplex.com/)

A Silverlight based 3D engine for WP7 which is very capable

- 
Portable TPL the parallel task library

(http://portabletpl.codeplex.com/)

Makes creating asynchronous code much easier, similar to the Aysych project and the new features in C# 5

- 
Silverlight tools for windows phone (Silverlight only)

(http://silverlight.codeplex.com/)

A set of 21 controls to enhance and make making Silverlight projects easier

- 
Coding 4 Fun toolkit (Silverlight only)

(http://coding4fun.codeplex.com/)

Another set of 12 controls to enhance and make making Silverlight projects easier plus some additional convertors and connectors

- 
Phoney Tools (Silverlight only)

(http://phoney.codeplex.com/)

Yet another set of controls and converters plus some useful samples

- 
MVVM Light 

(http://mvvmlight.codeplex.com/)

A full MVVM solution which as the name suggest is light and give you just what you need

- 
WP7Contrib (Silverlight only)

(http://wp7contrib.codeplex.com/)

WP7 Contrib is a set of components to help build WP7 Apps. It can be plugged into MVVM Light or used as separate components in your App. Our goal is to provide a set of tools and patterns that help WP7 developers.

## Further Reading

There is more to XNA on the phone that I could hope to include in this one chapter, in fact there have been entire books on the subject but armed with a good understanding of XNA and the information contained here you should hopefully be able to get the best out of the Phone and make some fantastic games.

I’m most excited when mango finally rolls out the door because it’s going to make making games a lot easier because the UI will be handled by Silverlight and the core game experience will get the raw power of XNA.

Below is some suggested additional reading to take you that bit further in your XNA adventures:

- 
Artificial Intelligence  

There are several AI tutorials out there, I’d recommend watching the recordings of the TechDays Online conference (24<sup>th</sup> March 2011), specifically Paul Fosters energising talk on AI.

- 
Augmented Reality – check out the SLAR toolkit now running on WP7Mango  

([http://kodierer.blogspot.com/2011/05/augmented-mango-slartoolkit-for-windows.html](http://kodierer.blogspot.com/2011/05/augmented-mango-slartoolkit-for-windows.html))

- 
Memory Management and Garbage Collection  

We don’t’ have to worry about the finer detail of memory management with XNA since it’s running under a managed framework however we still need to be aware of how it all works and code efficiently, check out this and other articles on Shawn Hargreaves blog who give some excellent tips and tricks for working in XNA.

([http://blogs.msdn.com/b/shawnhar/archive/2006/09/06/743437](http://blogs.msdn.com/b/shawnhar/archive/2006/09/06/743437))

- 
Particle effects and Resource Pools  

My tutorial series on particle effects is fairly complete but don’t take my work on it, I also reference lots of other sources of info to checkup on and build out an efficient graphical system, alternatively you can also use one of the off the shelf systems such as the Mercury particle Engine.

([/2010/07/09/intermission-7-resource-pools-and-particles](/2010/07/09/intermission-7-resource-pools-and-particles))

([http://mpe.codeplex.com/](http://mpe.codeplex.com/)) \<- Mercury Particle Engine Home

- 
AppHub Samples  

The one stop shop for a wealth of material, samples and articles on XNA and all things Windows Phone (ok, there is some XBAOX stuff on there as well), check out the AppHub Educational content section. The new Game Development and App Development series are also worth reading.

([http://create.msdn.com](http://create.msdn.com/))

## Summary

Hopefully this chapter has given you a taste of what to expect and how to work best with XNA on Windows Phone 7, it truly extends the reach of XNA and allows efficient graphical rendering on the device.

With the extensibility of the Silverlight and XNA integration, is should make what is sometimes a demanding job for fellow game developers easier by providing a UI framework for Menu’s and GUI’s in our games allowing the XNA side to focus on what it does best, great graphics.

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http://darkgenesis.zenithmoon.com/in-lament-for-xna-framework-long-live-the-xna-platform/&bgcolor=6600FF)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/in-lament-for-xna-framework-long-live-the-xna-platform/) [![Shout it](http://dotnetshoutout.com/image.axd?url=http://darkgenesis.zenithmoon.com/in-lament-for-xna-framework-long-live-the-xna-platform/)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/in-lament-for-xna-framework-long-live-the-xna-platform/)<script type="text/javascript">// <![CDATA[
var dzone_url = 'http://darkgenesis.zenithmoon.com/in-lament-for-xna-framework-long-live-the-xna-platform/';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_title = 'In lament for XNA Framework, long live the XNA platform';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_blurb = 'In lament for XNA Framework, long live the XNA platform';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_style = '2';
// ]]></script>  
<script type="text/javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js" language="javascript"></script><script type="text/javascript">// <![CDATA[
var addthis_pub="runxc1";
// ]]></script>[![Bookmark and Share](http://s7.addthis.com/static/btn/lg-share-en.gif)](http://www.addthis.com/bookmark.php?v=20)  <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>[CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591)
