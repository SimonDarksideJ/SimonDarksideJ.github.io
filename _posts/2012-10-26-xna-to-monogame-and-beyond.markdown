---
layout: post
title: XNA to MonoGame and beyond
date: 2012-10-26 00:13:32
tags: [xna, monogame]
---

As part of a new “Back to basics” series which extends on my original XNA Futures article some months ago, I am going to cover all the options I explained back then in more detail plus probably a few others which have come to light recently.

All of this is to show developers who have worked tirelessly on their XNA projects and newbies currently learning XNA as a gateway to game development that the knowledge they have gained will still stand them in good stead going forward.

Microsoft has still yet (\*at time of writing with build around the corner) to make any announcement regarding XNA, it is still fully supported but we are unlikely to see any updates / fixes to it in the near / distant future.

I have had many calls to get off XNA and jump onto platform X, which I take on board but I am still a man of many hats, so I will still be looking into all those platforms and journaling the experience coming from my XNA background, options, options, options.

So first out of the gate is [MonoGame](http://monogame.codeplex.com), this article will mainly focus on the new Windows 8 improvements but everything here should be applicable for other platforms as well (except the XAML stuff ![Smile with tongue out](/assets/img/emoticons/smilewithtongueout-2.png))

* * *

## Background

[![MonoGame logo showing an orange blob character with a brain linked to three phones](/assets/img/wordpress/2012/10/MonogameLogo1920x1920.png "MonogameLogo1920x1920")](/assets/img/wordpress/2012/10/MonogameLogo1920x1920.png)

[MonoGame](http://monogame.codeplex.com) is an Open Source implementation of the Microsoft XNA 4 Framework. Its goal is to allow XNA developers on Xbox 360, Windows & Windows Phone to port their games to the iOS, Android, Mac OS X, Linux and Windows 8 Metro.  They are also hoping to open up several other platforms in the future including PlayStation mobile.

Behind the scenes, [MonoGame](http://monogame.codeplex.com) uses several other open source projects to deliver on this objective including:

- [OpenTK](http://www.opentk.com/) – An OpenGL/CL/AL wrapper for low level graphics
- [SharpDX](http://sharpdx.org/) – A Direct X wrapper for access to Direct3D/2D, audio and input
- [Lidgren](http://code.google.com/p/lidgren-network-gen3/) – A Network library with facilities for UDP and TCP communications

As more contributors come on board I would expect this list to grow over time as more out of the box solutions become available, I personally would like to see some easy Box2D or Bepu Physics options but there are already XNA implementations of those which are readily available.

[MonoGame](http://monogame.codeplex.com) just released version 3.0 of its framework as a Beta which now offers full Windows 8 support.

* * *

## Out of the Box

![Preview image of the MonoGame Visual Studio 2012 XAML game project template](https://github.com/dellis1972/MonoGame/diff_blob/636a53119a34b4147f052a1cbd68fc7e4c83a458/ProjectTemplates/VisualStudio2012/XamlGame/__PreviewImage.png?raw=true)

Using the latest beta release of MonoGame 3 you get a lot straight out of the gate, including:

- VS2010 project templates for Linux, Android and Windows (Mac is only available on Mac)
- VS2010 Content builder / projects templates (more on that later)
- VS2010 project templates for Windows and Windows 8
- The SharpDX re distributable (no need for a separate download unless you want a later version)
- OpenTK install

This gives you everything you need to get a new project started and get coding.

The VS2010 templates have not changed much apart from upgrading dependencies and bug fixes as most of the work in V3 has been for the Windows 8 projects, there have been improvements but these are in line with what was needed in Windows 8 and making it compatible with all the other deployments.

As it is still in early Beta there are a few issues in the Windows 8 world but so far I personally have not found any, issues others have found have been resolved by the current development team in short order.

* * *

## Content Pipeline

![Illustration of an industrial plant with silos, a tanker lorry and workers, picturing a processing pipeline](https://web.archive.org/web/20120410055029im_/http://www.flexicon.co.uk/us/images/plant.jpg)

The content pipeline was arguably one of the most powerful features of XNA which has been very hard to find outside of XNA, sure there are frameworks out there emulating XNA but none provide such a simple content building system (excluding Unity but that is NOT XNA).

The trouble using XNA content builder outputs on other platforms is that the XNB files it outputs are platform specific, MonoGame has gotten around this with its own multi-platform builder project allowing the creation of compiled assets for all its target platforms.  Its one deficiency is that it depends on the original XNA content project template which is still only available in VS2010 (express will do).  Fear not however there are plans for a more open source version, it will just take time (get involved if you want to help out)

Getting your content compiled is very easy, it just involves:

- Creating a new “MonoGame Content Project for all Platforms”
- Then add a “Content Builder” project to the solution
- Add a content reference to the “Content Builder”  project
- Add your Content to the Content Project as you would any other XNA project
- Set the “Target Build” type to the platform you want to build for
- Build the project

If you try and run the project you will get an error but this is normal as it is not a game project so do not bother, you just need to build it.

This will give you a set of compiled assets in XNB format ready for use on your intended platform.

* * *

## MonoGame – Windows 8 basic version

![Photo from Facebook illustrating the basic MonoGame Windows 8 version](https://web.archive.org/web/20131108042033im_/https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-prn1/55358_4249267144401_1677481735_o.jpg)

Now [MonoGame](http://www.spikie.be/blog/post/2012/10/09/MonoGame%E2%80%93XNA-on-Windows-8 "A developers first attempt at a XNA game using MonoGame, nice breakoutgame") comes in two flavours for Windows 8, there is the basic windowed version and a XAML based one similar to the SilverXNA (Silverlight Integration) version for Windows Phone, which you choose is completely up to you.

The basic version is just XNA out of the box but with all the extra gubbins needed to run XNA/MonoGame on Windows 8:

[![Visual Studio Solution Explorer showing a MonoGameTest1 project with Assets, Game1.cs and Package.appxmanifest](/assets/img/wordpress/2012/10/image.png "image")](/assets/img/wordpress/2012/10/image.png)

Inside we find the customary “Game1” class and from there it is like XNA never left the building, all you need to do is add content and off you go, to get your content in there are a couple of options:

1. Create the “Content” folder structure in your project and add the XNB files as “Linked” references
2. Manually copy the “Content” folder from your build project into the build folder in the subfolder of AppX. (e.g. “\MonoGameTest1\MonoGameTest1\bin\Debug\AppX” )
3. Use a Post build process to copy the content at build time

Personally I do not like this “Copy” approach as you have no management / visibility of your assets plus if you clean up your project (delete the bin/obj) folders you will have to keep repeating this process over again AND every time you rebuild/change your assets.

The Post Process approach (suggested by the Sickhead Games team) is a good balanced approach, creating commands along the lines of the following:

```text
rmdir /S /Q ..\Game\Content
xcopy $(TargetDir)\Content\*.* ..\Game\Content\ /E /F /Y /V
```

Then call it as part of your post process build routine in your project settings (right click your project and select properties):

[![Project properties Build Events tab with the post-build event command line box highlighted](/assets/img/wordpress/2012/10/image6.png "image")](/assets/img/wordpress/2012/10/image6.png)

Additionally what the Sickhead guys do is manually edit the games “csproj” file and add the following line to ensure the content is included at build time:

```xml
<Content Include="Content\**\*.*">
  <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
</Content>
```

So using option 2 you are keeping a clear separation between your content builds and your code builds

Option 1, in my view is a lot cleaner, however there are a few points to keep in mind:

- You need to create the base “Content” folder manually at first, just call it Content

[![Solution Explorer with a Content folder highlighted containing Audio, Fonts, Models and Textures folders](/assets/img/wordpress/2012/10/image1.png "image")](/assets/img/wordpress/2012/10/image1.png)

*Example Structure*

- The Folder structure needs to mimic your content projects folder structure exactly
- Only LINK your assets do not just add them, else when you rebuild your content it won't be updated in your game

[![Add Existing Item dialog listing XNB audio files with the Add As Link option highlighted](/assets/img/wordpress/2012/10/image2.png "image")](/assets/img/wordpress/2012/10/image2.png)

*Add XNB files as “Existing Items” as Links*

- You need to set the “Build Action” of all your linked assets as “ **CONTENT** ”, this will ensure they are copied to the deployment folder when the project is run.

[![Properties pane for asteroid1.xnb with Build Action set to Content, highlighted in red](/assets/img/wordpress/2012/10/image3.png "image")](/assets/img/wordpress/2012/10/image3.png)

*Linked assets with “Build Action” set to “Content”*

\*\*Note, you do not have to change the “CopyTo” options for the assets, setting the build action is enough, changing the “CopyTo” option only copies the assets to the Build folder and not the APPX folder where they will be needed!!

* * *

## MonoGame for Windows 8 XAML

![Promotional image for ARMED, the Sickhead Games title built with MonoGame on Windows 8](https://web.archive.org/web/20120826004032im_/http://images.thoughtsmedia.com/resizer/thumbs/size/600/wpt/auto/1338215893.usr110171.jpeg)

No post about [MonoGame](http://apps.microsoft.com/webpdp/en-gb/app/armed/a080e316-b7ff-4d81-831c-2967a9c2357d "Armed on the Windows 8 Store") would be complete without a reference to the Awesome Guys over at [Sickhead Games](http://www.sickheadgames.com/) and their title “ARMED”, most do not know that they are the Main contributors to the Windows 8 branch of [MonoGame](http://monogame.codeplex.com)!

So as I mentioned before this second variant of [MonoGame](http://monogame.codeplex.com) is almost exactly the same as the Silverlight XNA integration (SilverXNA) on Windows Phone with only a few differences.

You can add XAML elements to your game pages and use data binding to manage them, use XAML for menus with 3D backgrounds, the list goes on.  Only real difference I’ve seen is that you do not need to paint the XAML rendering, it is automatically on top, granted this may mean you might not be able to do any fancy like having post-processing on the XAML page (may be possible just not sure at this stage)

> **\*\*Note**
>
> A word to the wise though is that the more XAML elements that you add to the page will have a downturn effect on 3D and general game performance because there are two separate graphics processes at work competing for time.
>
> The advice from the MonoGame team guys is that you should use the XAML rendering for menus and other screens and only and use XAML elements in your main game view sparingly.

The other main difference which should be obvious is the project structure:

[![Visual Studio showing the XamlGame2 project with App.xaml.cs open and the Solution Explorer listing App.xaml and GamePage.xaml](/assets/img/wordpress/2012/10/image4.png "image")](/assets/img/wordpress/2012/10/image4.png)

The project now has an “App.XAML” and “GamePage.XAML”.  The “App.XAML” has been configured to act pretty much the same way the Basic [MonoGame](http://monogame.codeplex.com) project works by instantiating the Game properly.

The “GamePage.XAML” is just an empty SwapChainBackgroundPanel (a Core element of the C++ XAML game projects):

[![GamePage.xaml code containing an empty SwapChainBackgroundPanel with a blank Grid](/assets/img/wordpress/2012/10/image5.png "image")](/assets/img/wordpress/2012/10/image5.png)

As with the SilverXNA projects of the past all the XNA Graphics are run from the code behind and you are free to add XAML elements as you wish, only real difference is that they are ON by default. (Well unless you hide them)

The code behind just instantiates the “Game” class as usual and from there (again) XNA is back in the forefront but now can separate core game graphics from that pesky UI stuff.

I have also seen chatter about removing the “Game” class all together in this XAML version, not sure what the benefit of doing that would be at this point (unless it is old news) but it is also the route the [Sickhead](http://www.sickheadgames.com/) guys and other projects have taken so there may be some merit in it.

* * *

## Core differences

So, two options, which to choose?

From my inspections here are a few considerations to mull over when choosing which template to start with:

- If you are Game UI and everything is already written in XNA then the basic option is a good choice, no sense re-writing stuff it is already done.
- Obviously if you are porting a SilverXNA game then the XAML option is an easy choice as everything should come across neatly.
- If your game needs “Mouse” input, then your only option is the XAML version.  In testing I found that the mouse was not available in the basic version, this may just be a configuration option but I have not got it to work so far.

There may be others and I’ll keep this list updated as I find them but as with most things the choice at the end of the day is up to you.

* * *

## When I get a minute

As soon as I get a spare minute I will push up the 2 samples I ported to MonoGame from my 3D starter tutorial.

They BOTH took a whopping 5 minutes each to port over with **NO ISSUE** (ok maybe 6, I did need a bite of pizza while the content is built), this just shows the power and flexibility of [MonoGame](http://monogame.codeplex.com) as well as its 99% compatibility to XNA (I say 99% because it is still in beta and a few features are not 100% implemented and there are a few minor bugs which the team are actively working on)

With Titles such as “[ARMED](http://www.armedgame.com/)” and others there is certainly a lot to sell the [MonoGame](http://monogame.codeplex.com) proposition at present.

Have fun XNA’ing
