---
layout: post
title: Resolving build issues for UWP packages with Unity
date: 2017-08-31 10:47:44
tags: [unity3d]
---

![Image result for visual studio tools for unity](assets/img/posts/image-not-found.png)

If you are building games and projects in Unity and targeting the Universal Windows Platform (UWP), you may have noticed than in the recent Unity releases this was actually broken. What you end up seeing in your build UWP project in visual studio is the following error:

> The command “”C:\ \<Project\>\Export\UWP\Unity\Tools\SerializationWeaver\SerializationWeaver.exe” “C:\ \<Project\>\Export\UWP\GeneratedProjects\UWP\Assembly-CSharp-firstpass\bin\x64\Debug\Unprocessed\Assembly-CSharp-firstpass.dll” “-pdb” “-verbose” “-unity-engine=C:\ \<Project\>\Export\UWP\Lonely Shadows\Unprocessed\UnityEngine.dll” “C:\ \<Project\>\Export\UWP\GeneratedProjects\UWP\Assembly-CSharp-firstpass\obj\x64\Debug\x64\Debug” “-lock=C:\ \<Project\>\Export\UWP\GeneratedProjects\UWP\Assembly-CSharp-firstpass\project.lock.json” “@C:\ \<Project\>\Export\UWP\GeneratedProjects\UWP\Assembly-CSharp-firstpass\SerializationWeaverArgs.txt” “-additionalAssemblyPath=C:\ \<Project\>\Export\UWP\Lonely Shadows\Unprocessed” “-unity-networking=C:\ \<Project\>\Export\UWP\Lonely Shadows\Unprocessed\UnityEngine.Networking.dll”” exited with code 1.  
> Assembly-CSharp-firstpass          C:\ \<Project\>\Export\UWP\GeneratedProjects\UWP\Assembly-CSharp-firstpass\Assembly-CSharp-firstpass.csproj   

If you dig further, you may also expose the underlying error code here:

> System.Collections.Generic.KeyNotFoundException: The given key was not present in the dictionary.  
>    at System.ThrowHelper.ThrowKeyNotFoundException()  
>    at System.Collections.Generic.Dictionary`2.get\_Item(TKey key)  
>    at UnityEditor.Scripting.Compilers.NuGetPackageResolver.Resolve()  
>    at Unity.NuGetAssemblyResolver..ctor(String projectLockFile)  
>    at usw.Weaver.ReaderParameters(String assemblyPath, ConversionOptions options)  
>    at usw.Weaver.Weave()  
>    at usw.Program.RunProgram(ConversionOptions options)  
>    at usw.Program.Main(String[] args)

**This prevents you building / updating projects from Unity to the UWP Platform.**

Once discovered, both Unity and Microsoft worked closely together to resolve the issues and updated their respective parts as quickly as possible.

* * *


# Fixing the problem

The fix for this problem is fairly easy. However, it is a little time consuming (unless you have a mega fast download connection) as mostly it requires updating to the latest Unity and Visual Studio patch releases.


## 1: Install Unity 2017.1 **p5** or 2017.2.of3

![Image result for unity logo](assets/img/posts/image-not-found.png)

The first step, is to simply update your installation of Unity:

- If you are on Unity 2017, then this is **2017.1p5** (or newer)
- If you are on Unity 2017.2, then this is **2017.2.0f3** (or newer)
- For the 5.x cycle, just update to the latest patch (although I have not tested this)

This will update both Unity and your install of the Visual Studio Tools for Unity

> You can find all the patch releases for all versions listed here: [https://unity3d.com/unity/qa/patch-releases](https://unity3d.com/unity/qa/patch-releases)  
> Also you can always grab the beta from here: [https://unity3d.com/unity/beta](https://unity3d.com/unity/beta)


## 2: Update VS 2017 to 15.3.3

Once Unity is up to date, you will need to update your installation of Visual Studio.  If you are still on VS 2015, then there is no action but you wo not be able to build UWP packages targeting the newer Creators update and wo not be able to build Mixed Reality platform.

> **I highly recommend updating to 2017, even the free Community edition of 2017 (which is free) if you are doing UWP development.  It is just better.**

To update Visual Studio 2017, simple close all open instances of Visual Studio and launch the **Visual Studio Installer**

[![image](/assets/img/wordpress/2017/08/image-5.png "image")](/assets/img/wordpress/2017/08/image-6.png)

Once it is running (the first step may be to update the installer first), simply hit “Update” on your specific instance of Visual Studio (the installer will happily update ALL installed instances if you wish) and once it is complete you will be on the latest version.

Open Visual Studio to verify, click “ **Help –\> About Visual Studio** ” in the menu and you should be running **15.3.3** (or newer). If not, check your internet connection and try running the installer again.

[![image](/assets/img/wordpress/2017/08/image-6.png "image")](/assets/img/wordpress/2017/08/image-7.png)


## 3: (Optional) **Set player settings for project to .NET & .NET4.6**  
(NOT IL2CPP, XBL project does not have support for IL2CPP, yet)

Not strictly required but highly recommended for UWP projects, is to update the **.NET Api Compatibility Level** that is used in your built project.  This allows you to use more modern C# 6 functionality if you wish without causing errors when you build it in Unity.

To update this, open the Player Settings window in the editor using either “ **Edit –\> Project Settings –\> Player** ” in the editor menu, or using the **“Player Settings” button** on the “ **Build Settings** ” build window.  In the Other section on this configuration page you will find the following settings.

[![image](/assets/img/wordpress/2017/08/image-7.png "image")](/assets/img/wordpress/2017/08/image-8.png)

Not to be confused with the “Scripting Runtime Version”, which I am told breaks UWP project builds (although I have not personally tested yet)

> **\*Note, I’m not saying don’t use IL2CPP (which is required for some Unity features, such as the new Post Processing stack) as it is a cleaner build.  It’s just NOT compatible with the Xbox-Live-Unity plugin at present.**


## 4: Build project targeting UWP SDK 14393 or higher

To build for Modern UWP, you need to be targeting a minimum API level of 14393 (Anniversary Edition), For Mixed Reality builds you will need a minimum API level of 15063 (Creators Update).  Either will work but you need to ensure you select the version that is right for your target.  The current advice with new builds is to always target the latest but that is completely up to you.

You will find the SDK selection on the “ **Build Settings** ” screen when you have the “ **Universal Windows Platform** ” target selected:

[![image](/assets/img/wordpress/2017/08/image-8.png "image")](/assets/img/wordpress/2017/08/image-9.png)


## 5: Open project in VS

Once you have built your project, open it in Visual Studio to continue.


## 6: **UPDATE NETCore NuGet** package to 5.4+ \<- without this, it still does not work

In testing I have found this is critical still for existing projects or when you build your first (ever) UWP project, you need to have the **latest NETCore NuGet package** downloaded and available else it will fail.  you do not have to update the other NuGet packages if you do not want to (UWP Packages come bundled with the Application Insights NuGets for Windows Store integration for example), just the NETCore package.

> **When writing this article, I tried to replicate the error (after fixing it) and could not generate the error even with new projects.  This step may not actually be needed but I still Highly Recommend updating any and all NuGet packages in your built project.**

 

> If you are unsure as to what NuGet is, [you can read all about it here](https://docs.microsoft.com/en-us/nuget/). Basically, NuGet is a dependency manager for .NET solutions, allowing you to disconnect your project from the source of a dependency.  It can then be updated independently without affecting your project (unless the API changes).  You will find most modern .NET packages from Microsoft (like the .NET Framework) are now NuGet packages so they can more rapidly update the framework without having to build and distribute new MSI packages.

To check and update the versions of the NuGet packages, **right-click** on the “ **Solution** ” in the “ **Solution Explorer** ” within Visual Studio and select “ **Manage NuGet Packages for Solution…** ”

[![image](/assets/img/wordpress/2017/08/image-9.png "image")](/assets/img/wordpress/2017/08/image-10.png)

Alternatively, you can also simply r **ight-Click** the “ **References** ” branch in your projects structure, also in the “ **Solution Explorer** ” in VS, this however will only show/update the NuGet’s installed in that single project and not the entire solution:

[![image](/assets/img/wordpress/2017/08/image-10.png "image")](/assets/img/wordpress/2017/08/image-11.png)

Once the NuGet manager is open you will see the installed NuGet packages, with a notification if any updates are available (provided you have an internet connection).

[![image](/assets/img/wordpress/2017/08/image-11.png "image")](/assets/img/wordpress/2017/08/image-12.png)

Simply select the NuGet package to update, NETCore in this case, select the version to update to on the right and click “Install”.   You will then be walked through a set of screens to accept the license for that package (if one exists) and then a final “get out of jail free” accept or reject screen.   Once complete, all the required references included in that package will be updated.


## 7: Build and Run for x64 only (x86 or Arm is a no go still)

With everything in place, all that is left is to build your project. By default, Unity still insists on selecting the ARM platform as the default (do not know why but I guess it is too small a thing to want to change), so you will need to update this to the x64 platform (do not use x86 unless you really need it, most UWP systems all target x64 now).  After that, you can build.

If you are unsure about which Solution Configuration to select (read, Build Type), remember what they are there for:

- 

### Debug

Used obviously for debugging, enables extra debugging information to be sent to an attached instance of Visual Studio (whether you run it from Visual Studio or just “attach” to it later).  Will cause a performance hit when running but this is needed so you can walk through the code if there are any issues.  It will also enable the debug window inside Unity to report errors to the screen should they occur.

- 

### Release

Builds the project but without all the debugging stuff. just runs your project.  With Unity however, it is keen to note you are still running your entire project with all the superfluous code that Unity has in a project.  **DO NOT SHIP THIS!!!**

 

- 

### Master

This is a special Solution Configuration (just for Unity) that also runs code in Unity to strip mine unnecessary code / services and packages everything together neatly.  This makes your Unity project run as fast as it can.  **\<- SHIP/PUBLISH THIS!!!**

* * *


# All well and good

With everything in this article, you should have no further issues building your UWP projects and once you have gone through it at least once (I have found) you need not do it again (apart from updating NuGets, you should always do that)

Any issues, let me know or comment on this post. 

 

[![datesgrey-pdn](/assets/img/wordpress/2017/08/datesgrey-pdn-1.png "datesgrey-pdn")](http://dreambuildplay.com)

