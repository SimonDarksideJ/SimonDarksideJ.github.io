---
layout: post
read_time: true
show_date: true
title: Debugging Android using Unity (an invasion into insanity)
date: 2019-10-16 18:14:43
description: Struggling to get Androids builds working or figuring out what has gone wrong on your device, then check out this article to learn the truth.
img: wordpress/2019/10/d6a25324780567.56339f4d42e29.jpg
tags: [android, unity3d]
author: Simon Jackson
github:  
mathjax: no
---

Since we started supporting Android platforms fully in the [XRTK](https://xrtk.io), we’ve been through the mill working through all the possible combinations of testing, debugging and banging heads against tables to make Android platforms behave.

Today I’ll share some hints, tips and advice for making the insanity of working with Android in Unity a little clearer.


## Article Contents

1. [Installing Android for Unity](#Section1)
2. [Setting up your SDK, NDK and friends](#Section2)
3. [Android ADB Drivers](#Section3)
4. [Setting up your Unity Android project](#Section4)
5. [Getting to know the Android Debugging Tool (ADB)](#Section5)
6. [Enter Logcat](#Section6)
7. [Debugging code on your Android from Visual Studio](#Section7)


## 

1. Installing Android for Unity

<figure class="wp-block-image is-resized"><img loading="lazy" src="/assets/img/wordpress/2019/10/image-12.png" alt=" class=" wp-image-77496 width="311" height="226" srcset="/assets/img/wordpress/2019/10/image-12.png 622w, /assets/img/wordpress/2019/10/image-12-300x218.png 300w" sizes="(max-width: 311px) 100vw, 311px"></figure>

_(Feel free to skip if you have already installed Android as a platform in Unity)_  
You want to target Android with Unity, are you crazy? Well if you are, or just want to build for some of the many platforms now adopting Android as their operating system (Oculus Quest, Lenovo, Magic Leap and so on), then let us first get Android inserted into your Unity installation

<figure class="wp-block-image"><img loading="lazy" width="964" height="385" src="/assets/img/wordpress/2019/10/image.png" alt=" class=" wp-image-77329 srcset="/assets/img/wordpress/2019/10/image.png 964w, /assets/img/wordpress/2019/10/image-300x120.png 300w, /assets/img/wordpress/2019/10/image-768x307.png 768w, /assets/img/wordpress/2019/10/image-700x280.png 700w" sizes="(max-width: 964px) 100vw, 964px"><figcaption>Figure 1: Unity Hub Installations report</figcaption></figure>

I’d recommend using the Unity Hub for managing all your Unity installations (especially if like me, you have many), you can use the old download installer if you wish, it should look fairly similar.

Open the Unity Hub and click on the **Installs** tab (as shown above) and you’ll see all the Unity versions that the Unity hub has detected on your machine. From here you can either modify an existing installation (by clicking the three dots **…** ) or click ADD to install another, this will show you the optional components for your Unity installation.

<figure class="aligncenter is-resized"><img loading="lazy" src="/assets/img/wordpress/2019/10/image-1.png" alt=" class=" wp-image-77330 width="307" height="275"><figcaption>Figure 2: Unity Hub “Modify Installation” dialog</figcaption></figure>

Once you have opened your Unity Installation (or started installing) you will have a list of modules that can be added to your installation. For Unity, you simply need to select the Android Build Support module to enable the Android platform. Additionally, I’d recommend expanding the **Android** platform (if your version of Unity support it) and also select any options for the Android SDK & NDK as this will install Unity compatible versions of these (not mandatory, but highly recommended)

<figure class="wp-block-image"><img loading="lazy" width="638" height="472" src="/assets/img/wordpress/2019/10/image-2.png" alt=" class=" wp-image-77331 srcset="/assets/img/wordpress/2019/10/image-2.png 638w, /assets/img/wordpress/2019/10/image-2-300x222.png 300w" sizes="(max-width: 638px) 100vw, 638px"><figcaption>Figure 3: Selecting the Android module and dependencies</figcaption></figure>

Now you have Android setup against your Unity installation, so is it time to party yet? I wish that was the end of the story but let us move on.


## 

2. Setting up the Android SDK & NDK

<figure class="wp-block-image is-resized"><img loading="lazy" src="/assets/img/wordpress/2019/10/image-13.png" alt=" class=" wp-image-77497 width="339" height="317" srcset="/assets/img/wordpress/2019/10/image-13.png 677w, /assets/img/wordpress/2019/10/image-13-300x281.png 300w" sizes="(max-width: 339px) 100vw, 339px"></figure>

Congratulations, you have installed the Android module in your Unity installation (if not, go back to 1 😀 ) but still, there is more to do.

If you open your Unity project in the editor and then open the Editor Preferences window (_Menu -\> Edit -\> Preferences_), on the “ **External Tools** ” tab you should see the following now:

<figure class="wp-block-image"><img loading="lazy" width="787" height="699" src="/assets/img/wordpress/2019/10/image-3.png" alt=" class=" wp-image-77332 srcset="/assets/img/wordpress/2019/10/image-3.png 787w, /assets/img/wordpress/2019/10/image-3-300x266.png 300w, /assets/img/wordpress/2019/10/image-3-768x682.png 768w, /assets/img/wordpress/2019/10/image-3-700x622.png 700w" sizes="(max-width: 787px) 100vw, 787px"><figcaption> Figure 4: Unity Preferences Window</figcaption></figure>

(I’ve unchecked some boxes to highlight some config here)  
With Android installed, you will have an entire section dedicated to the Android module detailing the various tools needed in order to produce an Android build.

For each of these, you can either use the default install provided by Unity (as shown in Figure 3 above) or you can also install your own, as detailed here:

- **JDK (2019 +)**  
Unity requires the Java Development Kit installed using the OpenJDK. I highly recommend the version that is included with Unity but if you want to install your own [go here](https://www.oracle.com/technetwork/java/javase/downloads/jdk10-downloads-4416644.html). If you install your own, you will need to uncheck the “JDK Installed with Unity” option and provide a path to its location.  
- **Android SDK Tools**  
By far one of the biggest issues you will have with Android under Unity is the Android SDK, this gives you access to the main tools needed for creating a build.  
Again, I’d recommend using the version that comes with Unity as it “mostly” works and can change from Unity version to Unity Version. If however (like me) you prefer your own install, you can either grab it directly from [Google](https://developer.android.com/studio/releases/platform-tools)or use the Android tools included with [Visual Studio](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-sdk?tabs=windows). Once installed, like the JDK option, simply uncheck the SDK box and provide your own path.   
(for Visual Studio, the default path is _\<drive\>:\Android\android-sdk_ )  
\*Note, the path is to the ROOT of the SDK folder, which should contain the necessary “Platform Tools” folder. Unity will check and complain if it is not right.  
- **Android NDK Tools**  
Like the SDK, the NDK is required for building and signing your builds, but trust Google to create two toolkits to build for their platform instead of just one.  
Like the SDK, you can use the version included with Unity or install the version direct from Google or the one bundled with Visual Studio  
(for Visual Studio, the default NDK path is _\<drive\>:\Microsoft\android-ndk_-r16b )   

So long as Unity doesn’t complain and each of the relevant tools and paths are configured correctly, you should be good to go.


### If it doesn’t go right?

It is Unity after all, and if the recommended Unity defaults don’t work (I have had it happen twice on new builds) then simply switch to the Google or Microsoft versions.   
If you’re using Google or Microsoft and it stops working after an upgrade, check you have the correct version of the SDK/NDK installed that Unity is complaining about, likely you’ll need to upgrade. If that fails, fall back to using the Unity default versions.   
It’s a pain, but then again, It is Android.


## 

3. Android ADB Drivers

<figure class="wp-block-image is-resized"><img loading="lazy" src="https://cdn.thingiverse.com/renders/36/f0/17/bd/f0/driverslong_display_large.jpg" alt="Driver bit holder" width="400" height="300"></figure>

Before you can start building and deploying to your Android device, you will need to ensure that you have enabled “ **Developer Mode** ” on the device and that you have also installed the Google “ADB Drivers” for the respective device on your development PC.

In most cases, you can use the default [Google USB ADB Driver](https://developer.android.com/studio/run/win-usb), depending on your device however, ([Oculus Quest has its own for example](https://developer.oculus.com/documentation/quest/latest/concepts/mobile-adb/)) you may need to go back to the device manufacturer and get a specific one.

Simply put, if Unity cannot find your device to build to it, it is almost always down to:

- ADB driver is not installed for your device
- Device is not enabled for Developer mode (see vendor for instructions)
- The device is locked or is not powered on (also include forgetting to plug the device in your dev pc)
- The ADB bridge is frozen on your development PC, so reboot!


## 

4. Setting up your Unity Android project

<figure class="wp-block-image is-resized"><img loading="lazy" src="https://live.staticflickr.com/4145/5068572252_6b3dc4d822_b.jpg" alt="drum setup oktober 2010 seat" width="512" height="384"></figure>

Now that your Unity installation is setup for Unity and your device is hooked into your machine, the last step is to get your project ready for Android, and so to enter madness.

The Android settings can be found in your Player project settings (“_Edit -\> Project -\> Player Settings_” – like most platforms) with the key area being the “ **Other Settings** ” tab:

<figure class="wp-block-image"><img loading="lazy" width="845" height="843" src="/assets/img/wordpress/2019/10/image-7.png" alt=" class=" wp-image-77445 srcset="/assets/img/wordpress/2019/10/image-7.png 845w, /assets/img/wordpress/2019/10/image-7-150x150.png 150w, /assets/img/wordpress/2019/10/image-7-300x300.png 300w, /assets/img/wordpress/2019/10/image-7-768x766.png 768w, /assets/img/wordpress/2019/10/image-7-432x432.png 432w, /assets/img/wordpress/2019/10/image-7-268x268.png 268w, /assets/img/wordpress/2019/10/image-7-700x698.png 700w, /assets/img/wordpress/2019/10/image-7-50x50.png 50w" sizes="(max-width: 845px) 100vw, 845px"><figcaption> Figure 5: Unity Player settings for the Android platform</figcaption></figure>

I’ve highlighted some of the most common settings you’ll need to configure for your target devices, although mileage will vary depending on what you want to support:

- **Graphics API** – Best to leave on automatic, just be aware some graphic api’s are not available on some devices if you configure this manually  
- **Package name** – You must configure this or Unity will complain, just keep to the same naming standard  
_ **com.\<organisation name\>.\<project name\>** _  
Don’t worry, no one checks this except the store you are publishing to.  
- **Minimum API level** – Keep to the lowest supported by the devices you want to target. 19 should be good enough for most. Higher values will limit the devices you can deploy to.  
- **Scripting backend** – with Unity’s move to IL2CPP, I recommend updating this if it’s set to Mono (unless you have compatibility issues with your project running on IL2CPP)  
- **Target Architecture** – Try to limit which builds you select here, especially if you don’t want to wait for Unity to build the project multiple times. Especially in test, only select 1 (ARMv7 is a good default for most modern devices)

Tinker and play with the rest, but it should not affect development much (except permissions). You will have to review this as you go to publish, but that is tomorrows problem :D.


## 

5. Using the Android ADB tool

<figure class="wp-block-image is-resized"><img loading="lazy" src="https://live.staticflickr.com/3552/3439334044_19f8fb38f3_b.jpg" alt="Steampunk Tools 1" width="512" height="384"></figure>

Once you can actually produce a Unity build and deploy to a device, it is time to get acquainted with the base Google tool(s) used to manage your device.  
You can read/watch many tutorials, but the only tool (outside of Unity) that you will need to use is the Google **ADB** tool and in that, only 2 commands at most really.


### – Setup a path to the ADB tool

First, you’ll need to set up a **PATH** on your PC to enable you to use the ADB tool anywhere using the installation path for your Android SDK, simply follow the instructions here for updating the [PATH environment variable on your PC](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/) using the relevant location from the selection below:

- Unity Installation path –   
“_\<drive\>:\Program Files\Unity\\<version\>\Editor\Data\PlaybackEngines\AndroidPlayer\SDK_\Plaform-Tools”
- Microsoft Android install –  
“\<drive\>:\Android\AndroidSDK\Platform-Tools”
- Google SDK install-   
“(wherever you installed google tools)\Platform-Tools”

I also recommend setting up a Command-Line (CMD) shortcut on your desktop that “_Starts in_” the above folder, to also give you quick access to the tool.


### – using the ADB tool

Once the ADB tool is accessible, the two main commands you are going to use are:

- **_adb install \<filename\>_**  
First, you’ll want to instal your builds (.apk files) to your device when it’s connected. The install command does this and with also auto-upgrade the installed program first. If the install fails for whatever reason, try uninstalling it (below) first and then retrying it.  
- **_adb uninstall \<project namespace\>_**  
Unlike the install command which only takes a filename, Uninstall needs the **namespace** for the app you installed.  
Simply run it and if it finds an app installed with that namespace, it’ll be gone (beware, this also applies to system apps!). If it can’t find it, then it will simply error.

You can do more with the adb tool, including getting logging information, getting device statistics and killing the services used by adb (useful when Unity crashes and you don’t want to reboot).   
To learn more about the ADB tool, use the following command to see everything it does:

> adb /?

But in all honesty, the only two I use are the Install and Uninstall commands.


## 

6. Installing Unity Logcat (preview)

<figure class="wp-block-image is-resized"><img loading="lazy" src="https://live.staticflickr.com/2393/2911731392_acd5171a29_b.jpg" alt="Morose Logs" width="512" height="341"></figure>

Before Unity released this preview tool, the only way to get information from the device was using the “adb logcat” command. This did give you output but it was very heavy, it was raw text and almost unintelligible to the untrained eye. For a long time, this was all we had (without going down the paid tools route), thankfully Unity built (or bought?) a handy UI for the default adb logcat information.

To install this tool, you will need to open the **Unity Package Manager** window (_Window -\> Package Manager_) and enable the _Advanced -\> Show Preview Packages_ option as shown below:

<figure class="wp-block-image"><img loading="lazy" width="698" height="126" src="/assets/img/wordpress/2019/10/image-4.png" alt=" class=" wp-image-77346 srcset="/assets/img/wordpress/2019/10/image-4.png 698w, /assets/img/wordpress/2019/10/image-4-300x54.png 300w" sizes="(max-width: 698px) 100vw, 698px"><figcaption> Figure 6: Unity Package Manager filter options</figcaption></figure>

This will enable you to see all the packages that the Package Manager has been scoped to see. To find logcat, it is best to simply type “ **logcat** ” into the search area in the top right and select the package to install.

<figure class="wp-block-image"><img loading="lazy" width="699" height="326" src="/assets/img/wordpress/2019/10/image-5.png" alt=" class=" wp-image-77347 srcset="/assets/img/wordpress/2019/10/image-5.png 699w, /assets/img/wordpress/2019/10/image-5-300x140.png 300w" sizes="(max-width: 699px) 100vw, 699px"><figcaption> Figure 7: Searching packages in the Unity Package Manager</figcaption></figure>

And that’s it. Once installed, every time you now run an Android build from Unity, the logcat viewer will appear and connect to the device (assuming you have selected a “Development” build in the Build Settings Window looking like this:

<figure class="wp-block-image"><img loading="lazy" width="1426" height="789" src="/assets/img/wordpress/2019/10/image-6.png?fit=660%2C365&amp;ssl=1" alt=" class=" wp-image-77443 srcset="/assets/img/wordpress/2019/10/image-6.png 1426w, /assets/img/wordpress/2019/10/image-6-300x166.png 300w, /assets/img/wordpress/2019/10/image-6-768x425.png 768w, /assets/img/wordpress/2019/10/image-6-1024x567.png 1024w, /assets/img/wordpress/2019/10/image-6-700x387.png 700w" sizes="(max-width: 1426px) 100vw, 1426px"><figcaption> Figure 8: LogCat window output example</figcaption></figure>

This shows a nice graphically formatted view of the raw logcat data with Yellow text for warnings (albeit hard to read) and nice Red for errors. You can also filter the data by process, e.g. Unity, Android or your project itself.


## 

7. Hooking up Android to Visual Studio

<figure class="wp-block-image is-resized"><img loading="lazy" src="https://live.staticflickr.com/2459/4072715092_0310ccbce3_b.jpg" alt="Connections" width="512" height="342"></figure>

Debug info and logs are all well and good, but at some point, you are going to want to step through your code (or spend endless hours pasting in debug log messages). Thankfully this is still possible, although a little tricky at times.

First off, you will need to ensure your build is set up as a **development build** and enable **script debugging** in the Build Settings window (_File -\> Build Settings_), as shown below:

<figure class="wp-block-image"><img loading="lazy" width="630" height="611" src="/assets/img/wordpress/2019/10/image-9.png" alt=" class=" wp-image-77447 srcset="/assets/img/wordpress/2019/10/image-9.png 630w, /assets/img/wordpress/2019/10/image-9-300x291.png 300w" sizes="(max-width: 630px) 100vw, 630px"><figcaption> Figure 9: Unity Build Settings Window</figcaption></figure>

With these set, once you run the project on a device connected to the PC (although WiFi debugging is available, I still recommend doing this connected to your PC via USB) it will enable the Unity Debugger in the project ready for Visual Studio to connect to.

When you are ready, switch over to Visual Studio (assuming you actually have a version of Visual Studio installed) for the project (_Assets -\> Open C# Project_) to see the latest state of your code. Once open, you will find Unity debug options under the “ **Debug** ” menu item in Visual Studio as seen here:

<figure class="wp-block-image"><img loading="lazy" width="323" height="178" src="/assets/img/wordpress/2019/10/image-10.png" alt=" class=" wp-image-77448 srcset="/assets/img/wordpress/2019/10/image-10.png 323w, /assets/img/wordpress/2019/10/image-10-300x165.png 300w" sizes="(max-width: 323px) 100vw, 323px"><figcaption> Figure 10: Visual Studio Debugging options – “Attach Unity Debugger”</figcaption></figure>

Once clicked, you will be presented with a new window listing all the Unity debugging instances available:

<figure class="wp-block-image"><img loading="lazy" width="436" height="243" src="/assets/img/wordpress/2019/10/image-11.png" alt=" class=" wp-image-77449 srcset="/assets/img/wordpress/2019/10/image-11.png 436w, /assets/img/wordpress/2019/10/image-11-300x167.png 300w" sizes="(max-width: 436px) 100vw, 436px"><figcaption> Figure 11: Unity Debugger instance selection</figcaption></figure>

> If you do not see an instance for your project yet, do not fret. Just check the device is plugged into your PC and the project has actually started, the instance won’t show up until your Unity project is at least past the Unity splashscreen.

Once it’s started, Visual Studio will be hooked up and running, allowing you to set breakpoints and walk through your code as normal.

If you need to attach Visual Studio while your project is starting up, you have two options:

1. Select the “ **Wait for managed debugger** ” option in the Build Settings window. Although in my experience, this almost never works.  
2. **BE QUICK** , Use the “Attach Unity Debugger” menu item in Visual Studio to bring up the Unity instance selection window. When the Instance for your project shows up, open it straight away.  
This will take some practice in the timing, as you can attach too soon and it will miss the hook when the Unity project starts on the device, I usually give it between 0.5 seconds and 1 second from when it appears, but this will vary depending on the speed of the device. Be patient, it will work (provided you remembered to also set a breakpoint on start, else you’ll need to try again 😀 )


## In conclusion

Things are a little trickier when the Unity editor cannot connect to a platform, such as with Android, but everything is still possible.   
(Subtle note, the experience is the same with ARM platforms, such as those on the Microsoft HoloLens)  
A lot of the above is based on timing, being ready and building your experiences with the Android platform for Unity projects.

There are probably a ton of other tips I can pass on but this article is long enough already. The biggest being about Android manifests for multiple devices, which is an entire other article on its own.

For now, try to enjoy your Android journey, especially if it is with the Oculus Quest device and ensure you have a lot of hot drinks available, as well as a fresh supply of goodies while you wait for those many many builds to complete and push to the device to test.

