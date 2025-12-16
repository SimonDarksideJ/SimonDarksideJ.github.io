---
layout: post
title: Debugging Unity 3D with VSCode
date: 2016-01-22 21:53:39
tags: [unity3d, vscode]
---

[![image](/assets/img/wordpress/2016/01/image.png "image")](/assets/img/wordpress/2016/01/image.png)

> **\*\*Updated for Version 1.0.0 – be aware there are some new “Getting Started” extra points, like installing C#, which is no longer installed by default.**

I have written several articles on the use of VSCode with Unity through its evolution but time and tide waits for no man as the behemoth of technology marches on.

> If you have not heard of Microsoft’s new multi-platform lightweight code editor before, go and check out its [homepage](https://code.visualstudio.com/) ([https://code.visualstudio.com](https://code.visualstudio.com "https://code.visualstudio.com/")), it is chock full of fantastic stuff to make you drop MonoDevelop or any other lightweight editor.  You can also check out my previous articles here and here.

Microsoft VSCode has taken many great strides since last I donned my writing hat, most notably:

- It is now completely opensourced! – [Check it out on GitHub here](https://github.com/Microsoft/vscode) ([https://github.com/Microsoft/vscode](https://github.com/Microsoft/vscode "https://github.com/Microsoft/vscode"))
- A new extension system has been added, allowing community devs to write plug-ins and language extensions to the editor without rebuilding it
- The number of languages supported as exploded (also thanks to the extension system), it now supports not only C#, HTML, JSON, Markdown and JavaScript but also python, ruby, actionscript, bower and even docker templates plus many many more (so many that even I have not heard of some of them)
- Debugging support for web apps has improved greatly
- Git and Source control support has been improved

There is a lot more but these are my favorite highlights.  If you have read my previous articles on the subject ([here](http://darkgenesis.zenithmoon.com/configuring-unity3d-to-use-the-new-lightweight-visual-studio-code-editor/) and [here](http://darkgenesis.zenithmoon.com/vscode-and-unity-take-another-bold-step-forward/)), you will also know that it has some great support for Unity, which has only gotten better now that Unity themselves have pulled in to the race:

* * *


# The story so far

Since the early beta releases we have been able to configure VSCode manually as a code editor within Unity, slowly but surely through the beta phases this integration has been improved to add file and line support when calling VSCode.

Back in VSCode Version 0.8.0, this took another bold leap forward with its first Unity asset (well, the only really) aimed at providing increased integration between these two products.

[![image](/assets/img/wordpress/2016/01/image-1.png "image")](https://www.assetstore.unity3d.com/en/#!/content/45320)

Made by a community developer with some assistance from teams at Unity and Microsoft, they automated a lot of the menial setup required to make the most out of the integration, namely:

- Support for Windows, Mac and eventually Linux
- Streamlining Editor preferences setup
- Setting the necessary command-line arguments when starting VSCode, which improved as VSCode did
- Creating the nessasary workspace settings to improve the VSCode UI when launched from Unity
- Updating the project files to be more Unity/VSCode compatible
- Debugging support for MacOS
- **\*\*New for Version 2.6** – Ability to configure a path for VSCode, enables use of the separate insider build for the brave

[![image](/assets/img/wordpress/2016/01/image-1.png "image")](/assets/img/wordpress/2016/01/image-2.png)


###### VSCode Editor Screen

Plus a host of other little tidy up / backend tweaks needed to ensure it all worked seamlessly.

[![SNAGHTML5b90db6](/assets/img/wordpress/2016/01/SNAGHTML5b90db6.png "SNAGHTML5b90db6")](/assets/img/wordpress/2016/01/SNAGHTML5b90db6.png)


###### Before and After Workspace configuration in VSCode

The only real limitation in its use was that debugging was only supported on a Mac (granted Mac owners didn’t see this as an issue ![Smile with tongue out](/assets/img/wordpress/2016/01/wlEmoticon-smilewithtongueout.png)), UNTIL NOW!!

* * *


# Let me stop you there

The train never stops when it comes to technology (even Cobol still lives!, granted Flash and Silverlight are headed to the graveyard), especially when a project becomes opensource but is still heavily contributed by the project originators, which in this case is Microsoft. They are certainly on a mission to make the fastest and most powerful cross platform editor out there.

Recently Unity Technologies themselves also wrote an extension for VSCode to allow debugging of Unity projects from more platforms:

[![image](/assets/img/wordpress/2016/01/image-3.png "image")](https://marketplace.visualstudio.com/items/Unity.unity-debug)

With this extension installed you can now simply attach your VSCode project to Unity in a very similar way to what is possible already with the Visual Studio Tools for Unity with Microsoft Visual Studio (which also replaced the default code editor on Windows and is now bundled with Unity), this includes such support as:

- Better intellisense
- More code completion and language support for MonoBehaviours
- Editor attaching
- Breakpoint support for the Editor and platforms

Unity have also made the extension itself [opensource on Github](https://github.com/Unity-Technologies/vscode-unity-debug) (like so many of their other new initiatives, the UI and 2D updates to name a few), so if there is something you feel is missing or could be done better, you can either build your own or submit a pull request and send it to Unity to add.

\*\*There is also an additional community VSCode addon which gives you both Unity and VSCode document lookup support and a few other nice features, worth checking out.

* * *


# Getting setup

Enough talk, let’s get this up and running in a few short steps, it is easy enough but the information is slightly scattered throughout the interwebs and pages.

The short path to get this running is as follows:

- Install Unity (but let’s assume you have done this already)
- Install VSCode – download it from [http://code.visualstudio.com](http://code.visualstudio.com) for your OS
- Open your Unity project
- Download the [VSCode asset from dotBunny](https://www.assetstore.unity3d.com/en/#!/content/45320) from the Asset Window (or import the asset if you have downloaded it manually)
- Open the Editor preferences using the **Edit –\> Preferences** option in the Unity editor menu
- (Optional) Set or change the path to VSCode, by default this uses the default location for VSCode, but if you have installed in another path or are using the insider build, this could be very useful
- Click on the VSCode tab on the left and check “ **_Enable Integration_** ” (it is now enabled by default!)  
[![image](/assets/img/wordpress/2016/01/image-3.png "image")](/assets/img/wordpress/2016/01/image-4.png)
- Click the “ **_Write Workspace Settings_** ” button (only needs to be done once per project), this will create the VSCode default workspace configuration for Unity
- Open VSCode for your project by opening a code file (you can do this manually but you will then have to manually select the unity project folder)
- When VSCode is open hit the **F1** key (this opens the VSCode Command window shown below)  
**\*Note, you will need an internet connection for this part!**  
[![SNAGHTML5d8647a](/assets/img/wordpress/2016/01/SNAGHTML5d8647a.png "SNAGHTML5d8647a")](/assets/img/wordpress/2016/01/SNAGHTML5d8647a.png)
- Type the command “ **_ext install_** ” in to the command window and select the option “ **_Extensions: Install Extension_** ”
- This will display all the available extensions on the VSCode marketplace (there are a lot are not there!), to filter the list simply append filter criteria to the command so that it reads “ **_ext install unity_** ”  
[![image](/assets/img/wordpress/2016/01/image-4.png "image")](/assets/img/wordpress/2016/01/image-5.png)
- Now simply click on this extension and it will be installed in the background. When it is done you will receive a notification to restart VS Code.
- **\*\*New As of VSCode Version 1.0.0** , you also now have to install C# support for VSCode, it no longer ships by default (most likely so they can update it separately).  
To install this, repeat the instructions above for the Unity Debugger, but install the “C#” package instead (it’s actually the first in the list :D).  
Once installed, you will have an option to restart VSCode to complete the install.
- In the “Unity” extension search, you will also find [Tobiah Zarlez](https://marketplace.visualstudio.com/search?term=publisher%3A%22Tobiah%20Zarlez%22&target=VSCode) new Unity Tools extension, which enables both Unity and VSCode documentation lookup support by selecting a class / property and hitting “Ctrl and #” (CMD and # for Mac’s).  Pretty useful.

Almost there, we now have all the necessary components installed, however to enable debugging, there is one final step.

- Click on the Debugging icon in the toolbar on the left hand side of the editor (this shockingly bring up the debugging view)
- Then click on the cog icon to bring up the debugger selection
- Finally select “Unity Debugger” from the list to enable it

[![image](/assets/img/wordpress/2016/01/image-5.png "image")](/assets/img/wordpress/2016/01/image-6.png)

If all goes well you should see a new “Launch.json” configuration file in the viewer showing you the current debugging options available.

> If anything goes wrong or it does not look right, then simply return to the folder/files view (top left folder icon) and delete the Launch.json file, then repeat the above steps which will recreate it.

You should be able to determine from looking at the default launch configuration that it only supports the Editor by default, however you can extend this to support projects too if you wish, just check the marketplace support page for more detail – [https://marketplace.visualstudio.com/items/Unity.unity-debug](https://marketplace.visualstudio.com/items/Unity.unity-debug "https://marketplace.visualstudio.com/items/Unity.unity-debug")

 

All done, if you return to the Folder/File view you can set breakpoints as you would do in any other code debugger and have VSCode break on that line when it is hit.

Let’s see it in action:

[![DebuggingInAction](/assets/img/wordpress/2016/01/DebuggingInAction.gif "DebuggingInAction")](/assets/img/wordpress/2016/01/DebuggingInAction.gif)

I do not think this is the end for VSCode’s integration with Unity, especially not with everything being opensource, so the future is looking very bright for Unity developers!

