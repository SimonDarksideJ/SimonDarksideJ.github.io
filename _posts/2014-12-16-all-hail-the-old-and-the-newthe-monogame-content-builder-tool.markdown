---
layout: post
title: All hail the old and the new - The MonoGame content builder tool
date: 2014-12-16 18:09:30
tags: [content pipeline, monogame]
---

Thought I might try and write the longest title ever on my blog, not sure I have made it but it was a worthy effort.


# The world of content

Back in the hay day of XNA, we had a lovely little extension that allows us to create a separate project for all our games assets and then reference them with a single pointer, these were the content projects!

[![image](/assets/img/wordpress/2014/12/image.png "image")](/assets/img/wordpress/2014/12/image.png)

The XNA Content Project and content reference

These were fantastic devices and automagically compiled, compressed and built our XNA assets in to our project.

When [MonoGame](http://www.monogame.net/) first started, they attempted to emulate this but had to resort to reusing the existing Content Project setup, still using the XNA content project template and a custom build MSBuild project to compile the XNB files needed in your game solutions.

[![image](/assets/img/wordpress/2014/12/image1.png "image")](/assets/img/wordpress/2014/12/image1.png)

The MonoGame Content Builder project and its XNA content project

Once the content was built you had to either copy or link the XNB output files manually in to your game solution, not an ideal scenario but necessary to maintain backwards compatibility with XNA.

* * *


# Enter the MonoGame Content Builder GUI

[![image](/assets/img/wordpress/2014/12/image2.png "image")](/assets/img/wordpress/2014/12/image2.png)

MonoGame Content Builder GUI

Deep in the bowels of the current MonoGame development is a new processor for handling content (called MGCB), within its walls there are a multitude of enhancements and changes to better handle content consumption and packaging as well as simplifying adding and managing content building with your game projects.

Like the XNA Content Project of old, you create a new Asset Database in the Content Builder GUI, add your content to it as normal (setting the relevant content importer types for each file) and save the project to a new “.MGCB” content project definition. Armed with new content definition file, you finally add it to your project and set its build action to “MonoGameContentReference”, then hay presto you have referenced your content project:

[![image](/assets/img/wordpress/2014/12/image3.png "image")](/assets/img/wordpress/2014/12/image3.png)

The new MGCB Content reference

Now we’re cooking, if everything is set right, your content project will be built (by the MGCB content processor) with your game (also it wont rebuild if there are no changes!) and we have almost achieve parity with the simplicity of the old days with XNA.

* * *


# Have an XNA content project already?

If you already have an XNA content project setup the way you want and do not want to waste time building it all again!, then the MonoGame Content Builder GUI has your back.

[![image](/assets/img/wordpress/2014/12/image4.png "image")](/assets/img/wordpress/2014/12/image4.png)

Using the “Import” option in the file menu, you simply select an existing “.contentproject”  then it will read the old definition and import all your settings and content in to the new Content Builder Project, as if by magic!

* * *


# So why all the fuss?

So, apart from [sanitation](http://en.wikipedia.org/wiki/Sanitation), medicine, education, wine, [public order](http://en.wikipedia.org/wiki/Public_order), [irrigation](http://en.wikipedia.org/wiki/Irrigation), roads, a [fresh water](http://en.wikipedia.org/wiki/Fresh_water) system and [public health](http://en.wikipedia.org/wiki/Public_health), what have the romans ever done for us? (I do love Monty Python quotes – [http://bit.ly/PythonRomans](http://bit.ly/PythonRomans "http://bit.ly/PythonRomans")).

Apart from a simpler system, why do all this? To which the answer is simple.  The biggest issue with using the old Content Builder solution with XNA Content Projects was that it could only be built on Windows machines (since that is where XNA’s main support lay).

However with the new MGCB processor, it is now possible to build content on all of MonoGame’s platforms.

There is one drawback that the team are still working on, the tool itself. At the time of writing the MonoGame Content Builder GUI itself is still being developed and on some platforms is not yet complete:

:

- Windows – Core development platform and up to date
- Linux – mostly complete with a few of the processors still needing some testing / tweaking
- MacOS / iOS – currently in heavy development 

This means that not only will you be able to build content in your projects, you will also be able to use the tool to create content projects on a variety of platforms.

> Actually, since the .MGCB project file is just text, you can configure it manually if you wish, however I would not recommend it ![Open-mouthed smile](/assets/img/wordpress/2014/12/wlEmoticon-openmouthedsmile1.png)

* * *


# Getting started with MGCB

If you want to use the MonoGame Content Builder GUI and MGCB processor now, you can. You will just need the latest MonoGame installer which can be found in the Development Builds section of the main MonoGame download page, there are installers for Visual Studio and MonoDevelop on Windows, Linux and Mac here:


### [http://www.monogame.net/downloads/](http://www.monogame.net/downloads/ "http://www.monogame.net/downloads/")

Once that is installed you will have the current version of the MonoGame Content Builder GUI and MGCB processor installed. Additionally all the MonoGame project templates have been updated to include a MGCB content project definition which you can edit and add your content to

On Windows, the current list of templates includes:

[![image](/assets/img/wordpress/2014/12/image5.png "image")](/assets/img/wordpress/2014/12/image5.png)

> \*Note, you still need XAMARIN’s extensions on Windows to use the Android, Ouya and iOS templates.  Android can still be built using MonoDevelop on Windows.

 

Start any new solution and it will look like the project solution shown earlier (In the Enter section)

* * *


# Samples Updates

AND there is even more, the multi-platform samples have been updated to use the new MGCB processor as well, you can find them at:


### [https://github.com/Mono-Game/MonoGame.Samples](https://github.com/Mono-Game/MonoGame.Samples "https://github.com/Mono-Game/MonoGame.Samples")

Here you will find out 3 main samples in various states of development:

- The Platformer 2D sample – Fully working on all platforms!
- The Neon Shooter sample – Running on Windows GL but ready to be updated for all platforms
- The SpaceWar sample – a development test bed as it has some leading content / dev requirements. (does not run at the moment post update, but work continues – It is a BIG sample) 

The team continues to advance the sample set as a “Best Practice” example of how to make your games run on all platforms and show the best way to organise your multi-platform projects.

> Yes, we are still working on the documentation for each sample, it is a hard job and everyone has only so much time.  Help out if you can!!

 

**Of note is that EACH sample only has ONE content project, this project is then shared by ALL platforms and built for the correct platform at build time!!**


#### **DIDN’T EXPECT THAT DID YOU**

* * *


# Upgrading your project

Now it is possible to upgrade your project to use the new Content Builder tool but at present it is a manual process.  it is however just a couple of steps:

> \*Note, at the time of writing the MGCB tool only fully works on Windows platforms, you still need a Windows machine to edit the MGCB configuration.  Keep checking the website for full Linux and MacOS support.  
> **However the Content Project works and builds content for ALL platforms using the MGCB processor.**

1. Install the latest Dev installer (needed to install the tool itself) – We recommend you uninstall the old installer first if you already have it.
2. Back up your existing project, if you are using source control, just push your latest changes up to the server first.  
If you are not using source control !!!Start using it!! (are you crazy?). Also make another backup “just in case” (you can never be too careful)
3. Exclude / remove and content / links / build processes you already have for publishing your content in your project.  
Just move any pre-built XNB’s elsewhere and if you have build scripts copying them, remove the script.  If you are linking XNB files, remove the links from your project.  This should leave your project in a clean state with NO content.
4. Save your project – next comes the tricky part – manually editing your csproj file (the project file)
5. Open up the project file (.csproj) in your favourite text editor (or use the VS powertools “edit project file function)  
You will find the VS powertools in the Visual Studio Extension library, click _“Tools –\> Extensions and updates_ “ (in the VS menu) and then search for power tools.
6. At the end of the first \<PropertyGroup\> section add a new \<MonoGamePlatform\> section as follows:

    \<PropertyGroup\> \<Configuration Condition=" '$(Configuration)' == '' "\>Debug\</Configuration\> \<Platform Condition=" '$(Platform)' == '' "\>x86\</Platform\> \<ProductVersion\>8.0.30703\</ProductVersion\> \<SchemaVersion\>2.0\</SchemaVersion\> \<ProjectGuid\>{CAF988BD-5440-405D-95D5-BCAB25FC5240}\</ProjectGuid\> \<OutputType\>WinExe\</OutputType\> \<AppDesignerFolder\>Properties\</AppDesignerFolder\> \<RootNamespace\>Platformer2D\</RootNamespace\> \<AssemblyName\>Platformer2D\</AssemblyName\> \<FileAlignment\>512\</FileAlignment\> \<SolutionDir Condition="$(SolutionDir) == '' Or $(SolutionDir) == '\*Undefined\*'"\>..\..\..\\</SolutionDir\> \<RestorePackages\>true\</RestorePackages\> \<NuGetPackageImportStamp\>5c48b287\</NuGetPackageImportStamp\> \<MonoGamePlatform\>WindowsGL\</MonoGamePlatform\> \</PropertyGroup\>

7. Set the name of the platform to the one your project file is targeting, the options are:  
Android, iOS, Linux, MacOSX, NativeClient, Ouya, PlayStation4, PlayStationMobile, RaspberryPi, Windows, WindowsGL, WindowsPhone, WindowsPhone8, WindowsStoreApp, Xbox360.  
_Note for Windows 8 you should use the **Windows** target.  WindowsStoreApp is for 8.1 games or Universal Windows targets._
8. At the end of the project file before the \</Project\> marker (preferably with the other \<Import\> sections) add the following line

    \<Import Project="$(MSBuildExtensionsPath)\MonoGame\v3.0\MonoGame.Content.Builder.targets" /\>

This will enable the “ **MonoGameContentReference** ” Build action to appear and enable the tool.

9. Add a new text file in your “Content” folder and rename its extension to “.mgcb” (for example “Content\mycontent.mgcb”) – _the simpliest way to create a new MGCB project._  
Note, you should see a new icon for the file appear.  If it does not then check your install of the MonoGame installer, **make sure it is a dev version and not the 3.2 release**
10. Now select your .MGCB content project in the solution explorer and set it is build action to **MonoGameContentReference.  
[![image](/assets/img/wordpress/2015/01/image.png "image")](/assets/img/wordpress/2015/01/image.png)**  
11. Finally, double-Click the MGCB content file and open the MonoGame Content Builder GUI, add in your assets manually or import them from your old .contentproject 

> \*Note, at the time of writing there was a bug with the MonoGame Content Builder GUI where it did not always open the file it was launched with.  Just check and open it manually while in the tool to be sure.  Hopefully that will get fixed soon!

Once all that is done, save your project file and reload your project in your code editor.

If you build your project now, it will spit out your compiled project together with your compiled assets automagically, never needing to link files or rely on a separate or scripted asset build again

* * *


# Ahh but for the roses

Now as this is still a development build for the tool and there are a few caveats:

1. It ai not 100% finished and their maybe bugs (however you will note the Platformer sample is all updated, builds fine and runs on all platforms!)
2. XACT projects are not supported (actually it was found that XNA did not even handle XACT, they were just pushed out the other side!, odd what you find out) just add your audio files individually and use them as normal with Content.Load\<Song\> etc.
3. The Linux tool is almost there – why not help test it
4. As noted above, the MonoGame Content Builder GUI doesn’t always open the file you launched it from. Just check you are looking at the right content file before making changes.  To be on the safe side, just open it manually from the tool (Which was found out in a LIVE stream by Andy and Tom, it was fun ![Open-mouthed smile](/assets/img/wordpress/2014/12/wlEmoticon-openmouthedsmile1.png))
5. Multi-platform content is now a doddle! Have fun. 

If you have any further questions / queries / rumblings or a tendency to fiddle.  Then jump on the GitHub site, test and report issues (only if you find them, an Issue saying “What a fantastic tool” are nice but not helpful!!)

 

Jump in and get involved!

\*No code was harmed in the production of this article but many java beans were slaughtered for their juice!

