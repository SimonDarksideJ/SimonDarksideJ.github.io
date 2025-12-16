---
layout: post
title: Making your game stand out with Cortana on Windows 10
date: 2016-04-18 09:19:40
tags: [cortana, windows 10]
---

[![clip_image002](/assets/img/wordpress/2016/04/clip_image002.png "clip\_image002")](/assets/img/wordpress/2016/04/clip_image002-1.png)

> \*edit, updated the article to also support the later “Anniversary” and “Creators” updates, which need a few tweaks, especially with an updated VoiceCommandFile Format.  
> **Still working on updating the Unity Sample to 5.6, as Unity changed the UWP exported solution which breaks the project if you try to export it again.**

True speech interaction is something we don’t see very often in gaming. Sure, you have recorded audio for NPCs and a few non-silent protagonists, but it’s very rare for the player to interact with speech themselves.

It’s certainly a missed opportunity for games and applications where a little human interaction could do with a boost to make it stand out. With [Windows 10](https://insider.windows.com/?WT.mc_id=Blog_Developer_Vue+Prd_Awareness_Discover_Feb+15_None_View+Internal+Website)<u>, </u>[Cortana](http://windows.microsoft.com/en-us/windows-8/cortana?WT.mc_id=Blog_Developer_Vue+Prd_Awareness_Discover_Feb+15_WindowsPhone8_View+Internal+Website) has been released from the confines of the Windows Phone platform to all UWP (Universal) projects, putting our sultry temptress in the hands of all consumers whether they use a phone, desktop or tablet, even on an Xbox One in the future.

Cortana gives us the best personal assistant money can buy, but the system also offers a very extensive speech system that is available to us humble developers.

Using the power of Cortana, we can bring the full power of speech to our games, providing such features as:

- A full text to speech system, complete with custom grammar.
- Robust voice-to-text or voice recognition system.
- Voice commands, allowing you to perform actions and start your game using voice.
- Integrate with the notification center for alerts and notices.

There’s a lot more, but this is the crux of what article is going to cover.

I wrote an original article for implementing Cortana and Unity with Windows Phone 8.1 which you can read here ([http://bit.ly/1OIMVoY](http://bit.ly/1OIMVoY)). This article is all new and improved, updated for Windows 10 and a few extra bells and whistles.

> The sample project built using Unity version 5.3 accompanying this post can be found here:  
> [http://wp.me/a3o0M2-2lG](http://wp.me/a3o0M2-2lG)
> 
> Updated Unity 5.5+ / Windows 10 Anniversary-Creators update sample accompanying this post can be found here:  
> [https://wp.me/a3o0M2-3oY](https://wp.me/a3o0M2-3oY)

* * *


# Unity and Windows 10

With the introduction of Windows 10 / UWP support we can make full use of these platform features, however, because [Unity](http://unity3d.com/) doesn’t have native support for speech or Cortana, we need to build our own bridge between the two platforms. Thankfully since Unity is .NET based we don’t need to build a plugin to do it (as is required for other platforms such as Android or iOS), we simply need to build an interop bridge between Unity and the UWP platform to give bidirectional access to all of these (and any other) capabilities we need.

Here’s what the layout of the full implementation looks like:

[![clip_image004](/assets/img/wordpress/2016/04/clip_image004.png "clip\_image004")](/assets/img/wordpress/2016/04/clip_image004.png)_Figure 1: Unity to Windows Interop architecture_

In Unity we need to declare an Interop class to manage the boundary between Unity and the Windows UWP platform. Any data that your Unity project needs from Windows, it will get from this Interop class and any action that needs to be kicked off on the Windows platform will be performed by the Interop class, as shown here:

[![clip_image006](/assets/img/wordpress/2016/04/clip_image006.png "clip\_image006")](/assets/img/wordpress/2016/04/clip_image006.png)_Figure 2: Unity Interop interface definition_

This pattern affords a couple of benefits, most notably we know exactly what data we need from the platform and what actions we can perform all in one place (defined as a Contract between Unity and the platforms it’s deployed on), regardless of which script or scene uses them.

Once we have the behaviors we want in our game, we apply this to our project on the platform. So after you have built the project, we need to fulfil the Contract we have created using the platform specific elements, for example:

[![clip_image008](/assets/img/wordpress/2016/04/clip_image008.png "clip\_image008")](/assets/img/wordpress/2016/04/clip_image008.png)_Figure 3: Windows 10 Interop implementation_

So from this Interop pattern we ensure that each party (Unity and Windows) know what they are doing, what data they control and at what time.

* * *


# Enough talk, show me the code

So now I’ve showed you how all of this is built up, let’s jump in to some example code with a few examples.

The examples comprise of:

- Using voice commands to launch your game.
- Get your game to speak to the player.
- Use speech in your game for commands or dictation.
- Use the notification center to toast your player.

Enough spiel, on with the demos!

* * *


# You want me to do what?

For the first example, I want to show you is how to take advantage of voice commands. This gives your players the ability to launch into a specific area of your game or app, or to provide additional information when launching the game.

Some examples could be:

- Launching your game via voice.
- Starting your game at a certain screen, such as “Game, enter random battle”.
- Providing additional prompts when starting your game, such as “Game, find player X”.

A wrath of options, just from using your voice. Best of all, your game does not even have to be running for these commands to be available; the player simply holds the search button or launches Cortana speech to enable Cortana, then speak their command. Hey presto, your game/app launches!

For the purposes of the example, you can either add this to an existing project or create a new one. The downloadable example has a prepared scene for testing.


## Create your Interop class

Let’s start with our all-important Unity Interop class, In Unity, create a new C# script called “CortanaInterop” and replace its contents with the following:

     using System; using UnityEngine; public class CortanaInterop : MonoBehaviour { }

In this class we will add a static property. This property will be used to parse the text of the command that was used to launch the application in to your Unity project, as follows:

     public static string CortanaText;

You will notice that the **string** property is marked as **Static**. This ensures that it is the only instance of this property in use in your Unity project, it also allows the Windows project to locate it easily.

That’s all for the Unity project for now. Build your project for the Windows Store platform and select the Windows 10 / XAML target, as shown here:

> \*Note, Selecting the XAML version is important as we need it to access the media components of the Windows 10 UWP platform.

[![clip_image010](/assets/img/wordpress/2016/04/clip_image010.jpg "clip\_image010")](/assets/img/wordpress/2016/04/clip_image010.jpg)

_Figure 4: Unity build settings for Windows 10 Universal apps_

Before you build the solution, you also need to enable a few capabilities for the project. Once you have configured your build target as above, click on “ **Player Settings** ” and then under the “ **Publishing Settings** ” section in the Capabilities area, check the **InternetClient** and **Microphone** capabilities. Now click build and off you go.

[![clip_image012](/assets/img/wordpress/2016/04/clip_image012.jpg "clip\_image012")](/assets/img/wordpress/2016/04/clip_image012.jpg)

_Figure 5: Unity Windows 10 Player settings_

Once the project is built, open the exported project in Visual Studio so we can add the Cortana integration parts. For the integration to work, we need a set of code to handle the incoming commands, then we need to call that in the application’s start-up methods.

> If you forget to add the capabilities to the project, you will get odd errors when running the project.  You can also add them later in the project by double-clicking on the “Package.appxmanifest” file in the solution and selecting the capabilities tab.

Microsoft also provides a quick start tutorial on speech integration, which you can find here: [https://msdn.microsoft.com/en-gb/library/windows/apps/xaml/mt185609](https://msdn.microsoft.com/en-gb/library/windows/apps/xaml/mt185609)


## Create your Voice Definition File

To begin, we need a Voice Command Definition (VCD) file to tell the operating system what voice commands are available for our app.

> We won’t go over the full capabilities of the VCD file in this tutorial, but you can find more information here: [https://msdn.microsoft.com/en-gb/library/windows/apps/xaml/dn706593](https://msdn.microsoft.com/en-gb/library/windows/apps/xaml/dn706593)

Creating a VCD file is very easy. First, create a new XML document in your solution (_Right click -\> Add new Item -\> XML File_) and then adding basic VCD content to the new XML file, I created a **VoiceCommandDefinition.xml** file as follows:


###### Windows 8/Windows10

    <?xml version="1.0" encoding="utf-8"?><voicecommands xmlns="http://schemas.microsoft.com/voicecommands/1.1">
      <commandset xml:lang="en-gb">
        <commandprefix>Unity Battle</commandprefix>
        <example>Speak to the game</example>
        <command name="startWithText">
          <example>Say the message you want to appear in the game</example>
          <listenfor> {naturalLanguage} </listenfor>
          <feedback> Starting Game... </feedback>
          <navigate></navigate>
        </command>
      </commandset>
    </voicecommands>


###### Windows 10 Anniversary/Creators

    <?xml version="1.0" encoding="utf-8" ?><voicecommands xmlns="http://schemas.microsoft.com/voicecommands/1.2">
      <commandset xml:lang="en-gb">
        <appname>Unity Battle</appname>
        <example>Speak to the game</example>
        <command name="startWithText">
          <example>Say the message you want to appear in the game</example>
          <listenfor requireappname="BeforePhrase">{gamelaunchtext}</listenfor>
          <feedback> Starting Game... </feedback>
          <navigate></navigate>
        </command>
        <phrasetopic label="gamelaunchtext" scenario="Natural Language"></phrasetopic>
      </commandset>
    </voicecommands>

In this XML we first define a **CommandSet,** this identifies the application being launched and the Key Word / CommandPrefix the player will use to identify your application through voice, in this case “ **Unity Battle** “. Within the **CommandSet** you can then provide a number of **Commands** the player can perform once your application is launched, **though there must be at least one**.

In each Command you tell the phone what to **ListenFor** , once it has recognized your application. In most cases these are specific phrases like “battle player” or “go to leaderboard” or whatever paths or shortcuts you wish to give the player when launching your app. In the sample application, I have defined two Commands; one to take any text spoken and send it to the game, and one with a specific action to allow the player to jump into battle.

Once you have configured your VCD you will need to set its **Copy to Output Directory** property in the solution explorer to **Copy if Newer** , to ensure it is deployed with your project when built.


## Install the VCD file on to the device

For the device to start working with voice commands, it must first be told which commands exist. For this we need to install the VCD file in code on the device at start up.

> The player must have run your game at least once for the commands to be installed. Before that the device does not know about them and as such, speech commands won’t work. You can’t know what you know before you know it!

Installing the VCD file is quite easy. In the **App.xaml.CS** file that is in your project, locate the **OnLaunched** method and insert the following lines:

     protected override async void OnLaunched(LaunchActivatedEventArgs args) { try { Windows.Storage.StorageFile vcdStorageFile = await Package.Current.InstalledLocation.GetFileAsync (@"VoiceCommandDefinition.xml"); await Windows.ApplicationModel.VoiceCommands.VoiceCommandDefinitionManager .InstallCommandDefinitionsFromStorageFileAsync(vcdStorageFile); } catch (Exception ex) { System.Diagnostics.Debug.WriteLine ("Installing Voice Commands Failed: " + ex.ToString()); }

This simply locates your VCD xml file, loads it into memory and then installs it using the **VoiceCommandManager**. This happens each and every time the app is launched to ensure it is always using the latest version.

> You’ll note we wrap this call in a Try / Catch block to ensure there are no mishaps if the file cannot be located for any reason.


## Setup the Command Handler

Next we’ll create another new C# script called **SpeechHelper** in the Windows project to contain all the code required for the speech integration. Once you have created the script, replace its contents with the following:

     public class SpeechHelper { public static void HandleSpeechCommand(IActivatedEventArgs args) { var commandArgs = args as Windows.ApplicationModel.Activation.VoiceCommandActivatedEventArgs; Windows.Media.SpeechRecognition.SpeechRecognitionResult speechRecognitionResult = commandArgs.Result; string textSpoken = speechRecognitionResult.Text; CortanaInterop.CortanaText = textSpoken; } }

There is a fair amount to digest here. Putting it simply, we declare a new instance of the **VoiceCommandActivatedEventArgs** which interrogates the launch conditions of the device, which we then gather from the result of in the **speechRecognitionResult** parameter.

We take the spoken text result from this and pass it to our static **CortanaText** property in the Unity Interop class, thus making the text available to the Unity application when it finally starts.


## Register the call handler on start-up

In the final piece of the puzzle, we simply need to tell our application when it is starting, that it should use our speech helper class to check for and validate any speech input commands.

To do this we return to our **App.xaml.cs** file and locate the **OnActivated** method. In this method Unity already checks to see if a Unity app was launched via a custom URL (or protocol). To this we need to add a case for our **VoiceCommand** start method, as follows:

    protected override void OnActivated(IActivatedEventArgs args) { string appArgs = "; switch (args.Kind) { case ActivationKind.Protocol: ProtocolActivatedEventArgs eventArgs = args as ProtocolActivatedEventArgs; splashScreen = eventArgs.SplashScreen; appArgs += string.Format ("Uri={0}", eventArgs.Uri.AbsoluteUri); break; //Start VoiceCommand detection & use the SpeechHelper handler case ActivationKind.VoiceCommand: SpeechHelper.HandleSpeechCommand(args); break; } InitializeUnity(appArgs); }

In the above code, you can see by the commented line that when a voice launch is detected, it calls the new handler method we created in our **SpeechHelper** class.


## Text in, so now what?

After the first run, when the user starts Cortana speech (either by holding the Windows button on mobile or the Mic icon on desktop) and utters your CommandPrefix (“Unity Battle” in this case), it will launch your app and pass whatever they say directly into your Unity project on launch. From there it’s up to you what you do with it. In the case of the VCD Xml earlier, the user can say “_Unity Battle say something smart_” and the text “_say something smart_” will be passed to Unity. Alternatively they can use another other command to do something cleverer. In the case of some mobile apps (as they have had this capability longer) the commands launch direct to a page or specific feature, saving the user time in navigating through the app.

For all of the Cortana speech examples, you will need an actual device to test on. The emulators don’t have a microphone, so it can’t actually listen.

In the example project for this article, I simply put a new UI text control on the screen and bound the “CortanaInterop.CortanaText” field to the Text property of the Text Control. I then launched the app and got it looking something like this:

[_![clip_image014](/assets/img/wordpress/2016/04/clip_image014.png "clip\_image014")_](/assets/img/wordpress/2016/04/clip_image014.png)

_Figure 6: Launch command result_

Granted, I think I embellished my project, slightly.

* * *


# Dictation. I did spell that right, didn’t I?

Now that we have used a voice command to get text into our game when it wasn’t running, which was fairly useful, especially if you want some shortcuts for players to use when launching your game. However, we can also use these fancy speech recognition features while the game is running as well. This could be as simple as a dictation mode the player can use when submitting feedback (we wouldn’t want their fingers to get tired now would we?) or it could be another way of the player interacting with the game, like commands to open doors, cast spells, etc. (I’ll let your creative imagination go wild on that one).

It doesn’t take much to enable this mode, so long as you stick to the Interop design patterns. For this we need to have an **event / trigger** in our Interop class to tell the device we want some speech recognized, then in the Windows project we simply hook to this event and kick off the speech recognition before then feeding the translated result back to Unity.


## Creating the Unity hook

First, open up Unity and edit the **CortanaInterop** class. Once open we need to add the following static event code, which is the interface action for our speech recognition:

> We’ll be reusing the same text property from the previous example to feed the recognized speech back, but you can create another if you wish

     public static bool SpeechInProgress; public static event EventHandler SpeechRequested; public static void GetMeSomeVoice() { if (SpeechRequested != null && !SpeechInProgress) { SpeechRequested(null, null); } }

This simply creates an event hook (called **SpeechRequested** ), so that when some code in Unity calls the **GetMeSomeVoice** method, it passes that request down to anyone listening for the event (which we’ll do in the “_Stitching everything together_” section a bit further down). If no one is listening we do nothing, because if you call an event without a subscriber, you will get a nasty error.

We have also added an additional property called **SpeechInProgress,** his is there because the speech recognition is an asynchronous process on the device and it can cause issues if you try to make multiple requests. To ensure you only ask once and cannot ask again until the last operation was complete, we have a flag.

Now build and export your project again before continuing.


## Initializing speech recognition

Switching over to the Windows project, the first thing you need to do is **BUILD IT**. This is simply because the Windows solution needs to compile the Interop code before it is made available in the OS project. If you know your code by heart, you can start coding straight away, then when the project next builds, everything should line up (however, I like IntelliSense too much and don’t trust my spellings :S).

The first thing we need is a method to initialize the speech recognition system for the current language of the user’s device.

If you have read the official MS docs, they put all the code together for initializing and running the speech recognition. In my experience, however, this causes lag and other issues with Unity projects. It’s best to split them up.

Open up the **SpeechHandler** class and add the following property:

     private static Windows.Media.SpeechRecognition.SpeechRecognizer speechRecognizer; private static IAsyncOperation\<Windows.Media.SpeechRecognition. SpeechRecognitionResult\> recognitionOperation;

This adds a reference to the speech engine, which we’ll keep alive while our game is running and an asynchronous handler for when we want to handle to actual recognition.

Next add the following **InitialiseSpeechRecognition** method:

     public static async System.Threading.Tasks.Task InitialiseSpeechRecognition() { // Create an instance of SpeechRecognizer. speechRecognizer = new Windows.Media.SpeechRecognition.SpeechRecognizer(); // Add a web search grammar to the recognizer. var dictationGrammar = new Windows.Media.SpeechRecognition. SpeechRecognitionTopicConstraint( Windows.Media.SpeechRecognition.SpeechRecognitionScenario.Dictation, "dictation"); speechRecognizer.Constraints.Add(dictationGrammar); // Compile the dictation grammar by default. await speechRecognizer.CompileConstraintsAsync(); }

Here we create a new instance of the **SpeechRecognizer** and then define our default grammar (the operation mode for the speech recognition) and apply it to the recognizer.

For more information on the SpeechRecognizer, see this quick start guide from MSDN: [https://msdn.microsoft.com/en-gb/library/windows/apps/xaml/mt185615](https://msdn.microsoft.com/en-gb/library/windows/apps/xaml/mt185615)


## Letting the player get a word in

The next method is what will be used by the Unity Interop to perform speech collection and recognition, before sending the result back to the Unity Interop. Add this new **StartRecognising** method is as follows:

     public static async void StartRecognizing(object sender, EventArgs e) { CortanaInterop.SpeechInProgress = true; // Start recognition. recognitionOperation = speechRecognizer.RecognizeAsync(); Windows.Media.SpeechRecognition.SpeechRecognitionResult speechRecognitionResult = await recognitionOperation; if (speechRecognitionResult.Status == Windows.Media.SpeechRecognition.SpeechRecognitionResultStatus.Success) { // Do something with the recognition result. CortanaInterop.CortanaText = speechRecognitionResult.Text; } else { CortanaInterop.CortanaText = "Sorry, could not hear you"; } CortanaInterop.SpeechInProgress = false; }

Here we set the Interop **SpeechInProgress** flag to stop Unity from sending multiple requests, and then kick off Cortana in all her glory.

Then provided the device is not already speaking to the player, we set off the asynchronous call to Cortana to gather the player’s speech, submit it off to the powerful cloud brain in the sky then taking the final result and passing it back to Unity.


## Stitching everything together

Now that we have methods to do all the work, we just need to hook everything up. For the speech initialisation, we just need to add that to the **App.xaml.cs “OnLaunched** ”method, just after the code to install the VCD file for the voice commands using:

     //Initialise Speech recognition await SpeechHelper.InitialiseSpeechRecognition();

Next we need to bind our Unity Interop event to our new **StartRecognizing** method in the **SpeechHelper** class. To do this, we need to add it to the code for the XAML page that the Unity game actually runs on, and by default this is the page called **MainPage.xaml.cs**. Open this file and locate the constructor for the page which looks like this:

     public MainPage() { this.InitializeComponent();

To this method we need to add the following code (at the end of the method) to register our speech function to the Unity Interop event:

     CortanaInterop.SpeechRequested += SpeechHelper.StartRecognizing;

With this, whenever a script in Unity calls the **GetMeSomeVoice()** method of the **CortanaInterop** class, it launches the event. This is picked up by the Windows platform, which in turn calls the **StartRecognizing()** function and kicks off speech. Now breathe!

It’s just a simple change of events to jump from Unity to the device platform and back again.

In the example, I bound a new UI button to the **GetMeSomeVoice()** method, so that when you run the app on a device (and it has to be a device because the emulator just won’t cut it), the device starts listening and any speech recognized gets resolved as text and is sent back to Unity.

You should also probably also add some UI to tell the player the device is listening, or use the Platform UI by calling the “speechRecognizer.RecognizeWithUIAsync();” function instead of the headless version, it is up to you. Or you can be listening constantly and perform actions when they are recognized (best to also tell the player they are being listened to else you might get calls from lawyers!!)

* * *


# Getting the character talking back

So far we’ve covered launching with voice and letting the user interact with voice while the game is running. However, Cortana also has a voice of her own which we can use to badger the player. Normally in games when we want characters to speak to the player, we record a media file for speech and then play it back to the user at the appropriate time. This pattern has one unique flaw; it is bound to the language you recorded it in. If you want to support multiple languages, you need to re-record the audio in all the languages you want to support and ship ALL of them with your title, unless you use regional asset.

Cortana, however, has as many languages as Windows supports. All you need to do is pass the text you want spoken (granted this must be natural language text as she won’t translate for you) and Cortana will voice it, even using regional dialects in some cases. The only drawback is that there is only one voice and the user selects which voice that is.

Setting up the speech synthesis side is very similar to the voice input of the previous example, so let’s whip through it quickly.


## Yet more Interop

Another command/action, another Interop event to kick it off. Similar to the previous approach. Add the following to the **CortanaInterop** class in your Unity project:

     public static event EventHandler SpeechSynthRequested; public static void YellAtPlayer(string textToSpeak) { if (SpeechSynthRequested != null && !SpeechInProgress) { SpeechSynthRequested(textToSpeak, null); } }

I added a new **YellAtPlayer** method, to which I’ve also added a string parameter. This parameter specifies the text that you want Cortana to read out. When you call this method from Unity, it fires the **SpeechSynthRequested** event to tell the device to process the message, sending the text along with the request.


## Initialize Speech Synthesis

Like with the speech recognition, it’s a good idea to initialize the speech synthesis when the app starts, so that it’s ready when required. For this we’ll add a new **InitialiseSpeechSynthesis** method and some new properties to our **SpeechHelper** class:

     private static Windows.Media.SpeechSynthesis.SpeechSynthesizer synth; private static MediaElement mediaElement; private static Windows.UI.Core.CoreDispatcher dispatcher; public static void InitialiseSpeechSynthesis(MediaElement MediaElement) { // The media object for controlling and playing audio. mediaElement = MediaElement; // The object for controlling the speech synthesis engine (voice). synth = new Windows.Media.SpeechSynthesis.SpeechSynthesizer(); // Save the UI thread dispatcher to allow speech status messages to be shown on the UI. dispatcher = Windows.UI.Core.CoreWindow.GetForCurrentThread().Dispatcher; }

Here we simply initialize all the relevant components, ready for use. We also need a Dispatcher so that we can interact with the UI (the media component) as Unity works off a background thread.

As part of this example, I have used the audio output from the phone to play the output of the synthesis. If you wish, you can bypass all this and pass the bytestream that the speech synthesis generates back to unity to play. The choice is up to you.


## Speech Synth Action

The other method we need in our **SpeechHelper** class will do the actual conversion of text in to voice and play it, so add the following method to the **SpeechHelper** class as well:

     public static async void StartSpeaking(object sender, EventArgs e) { var textToSpeech = (string)sender; if (mediaElement != null) { await dispatcher.RunAsync( Windows.UI.Core.CoreDispatcherPriority.Normal, () =\> { if (mediaElement.CurrentState.Equals (Windows.UI.Xaml.Media.MediaElementState.Playing)) { mediaElement.Stop(); } }); if (!CortanaInterop.SpeechInProgress && !string.IsNullOrEmpty(textToSpeech)) { try { // Generate the audio stream from plain text. Windows.Media.SpeechSynthesis.SpeechSynthesisStream stream = await synth.SynthesizeTextToStreamAsync(textToSpeech); await dispatcher.RunAsync( Windows.UI.Core.CoreDispatcherPriority.Normal, () =\> { mediaElement.AutoPlay = true; mediaElement.SetSource(stream, stream.ContentType); mediaElement.Play(); }); } catch (System.IO.FileNotFoundException) { //If media player components are unavailable, // (eg, using an N SKU of windows), //we won't be able to start media playback. Handle this gracefully var messageDialog = new Windows.UI.Popups.MessageDialog ("Media player components unavailable"); await messageDialog.ShowAsync(); } catch (Exception) { // If the text is unable to be synthesized, // throw an error message to the user. mediaElement.AutoPlay = false; var messageDialog = new Windows.UI.Popups.MessageDialog ("Unable to synthesize text"); await messageDialog.ShowAsync(); } } } }

Here we check if media is playing already and if we have actually been sent any text (as there’s no point in converting white noise) and use the asynchronous **SynthesizeTextToStreamAsync** operation to convert the text to audio. The audio stream that this method generates is then played back through a XAML media element on the device (though as mentioned previously, you could just return this stream to Unity to play if you wished).

Because asynchronous operations are performed on a background thread, they are returned on a background thread. If you then want to play them, you need to send them to the UI thread to be actioned (hence the use of the dispatcher when talking to the XAML media element). Not doing so will crash and burn your app in a horrible “access violation” error.


## The last of the wiring

To finish off this little puzzle, we need to hook everything up in the same way as before. This time we only need to do this from the MainPage, so open **MainPage.xaml.cs** and add the following to the constructor as we did before:

     SpeechHelper.InitialiseSpeechSynthesis(this.media); CortanaInterop.SpeechSynthRequested += SpeechHelper.StartSpeaking;

As this example is using the devices audio, we also need to add a **MediaElement** to the XAML of the page else it won’t work. (If you have chosen to handle the audio in Unity, be sure to change this here as well). Open **MainPage.xaml** and add the following line after the \</grid\> element for the splashscreen and before the **\</SwapChainPanel\>** element as shown here:

    <mediaelement x:name="media" autoplay="False"></mediaelement>

> \*Note, Unity now default to the D3D template for exported Windows 10 / Store projects, which means you do not get access to the Media Player. So be sure to use the XAML template for now (will provide another version using the Unity namespaces later

All done! If you now add something in Unity to call the **YellAtPlayer** method of the **CortanaInterop** class, like a button, then when you build and run the project the phone will start speaking to you.

In the example I provide, I also mixed it up and added a script with an array of text. Each hit of the button randomly selects a line of text to insult the player with.

* * *


# All done, except for the toast

All this speech stuff is good, but Cortana also introduced the new Notification Centre with Windows 10. Since this article goes wild with the Interop style of programming, why not also add one last thing and let Unity make use of Notification Toasts. Best of all, these no longer need a complicated server/notification service; it can now be done from the device directly. This is great for achievements or anything you want the player to know while the game is running.

For offline notifications, you will still need to use the server notification setup. For further details check this article: [https://msdn.microsoft.com/en-US/library/windows/apps/hh779727](https://msdn.microsoft.com/en-US/library/windows/apps/hh779727)

[![clip_image015](/assets/img/wordpress/2016/04/clip_image015.png "clip\_image015")](/assets/img/wordpress/2016/04/clip_image015.png)

_Figure 7: Achievement toast example_

I won’t go into extensive detail for this example as you only need look in the example app, what you’ll find is the following:

- Another Interop method to let Unity request a Toast.
- A ToastNotificationhelper class which contains all the code for generating a toast (no initialisation required).
- Binding code in the MainPage.xaml.cs class to hook the Interop event to the Methods in the helper class.
- Enable Toast support in the Windows project by opening the package.appxmanifest and setting Toast Capable to True.

Creating toasts is very simple, but if you need more information about them then [check out this post](https://code.msdn.microsoft.com/windowsapps/Action-Center-Quickstart-b15089f2).

* * *


# Rocking up your own band

While still on the subject of integration, let’s not forget that the Microsoft Band SDK is also available for all Windows 10 platforms, this gives us even more opportunity to offer additional features to owners of these fabulous devices.

[![clip_image017](/assets/img/wordpress/2016/04/clip_image017.png "clip\_image017")](/assets/img/wordpress/2016/04/clip_image017.png)

With the Microsoft Band (version 1 or 2) we have access to a wrath of sensors, namely:

- Heart Rate
- Position and Movement (GPS + Accelerometer)
- An action button
- A shake control (vibration at your wrist)

There is a lot more and using the interop style described here, you can quickly whip up connection to the device the player has and do some magic. Give them an achievement if they get scared too much, vibrate if they are close to a secret or even track their hands position and use it in your title.

You can find out more about the MS Band SDK here, including getting access to the SDK (free) and getting it in to your Windows 10 project:

[https://developer.microsoftband.com/bandSDK](https://developer.microsoftband.com/bandSDK)

* * *


# Just wait, hold the fish

As Unity 5.4 has now reached public beta I can also note another new development in the Unity ranks.  For the astute among you, you might have noticed a one line comment in the Windows section in the release notes, basically stating:

> Windows: Added speech recognition APIs under UnityEngine.Windows.Speech

An interesting comment, which indicates that Unity themselves are recognising the power of Cortana (at least to some level).  Granted, as it is a beta the documentation is a little thin on the ground and it took several minutes of hacking around the API to get it running in Unity, but it does indeed work.

There are a few caveats (mainly because there are no docs):

- Dictation libraries are not there, or at the very least it is unclear about how to add them.  Just means you only have the default language support.
- There are a few hoops to jump through to get it initialised (granted this article should help point the way.  This should hopefully get better as it moves to release.
- It is ONLY for windows.  That does include all Windows 10 / UWP builds (not Xbox but I guess that will come in a future update when Cortana hits Xbox One) and also the Windows Standalone player (although in testing, only running on Windows 10)

My only real complaint about this is that it is a platform specific implementation, it is only Windows.  I would have preferred an abstracted layer for all supported platforms and have a unified API.  Granted this is more difficult but it marks a trend with many new features that a unified approach is the purview of the developer to coordinate.  NOT everything, just some new features!

Once it hits release, I may do a follow up article to detail it is implementation with the features above, both paths are still valid so it is purely up to your preference as to which to use.

* * *


# So long and thanks….

Another fun ride and another fun article with so many things to take in. I have used all of these features in several of my projects, from using the MS Band with my VR solutions to give the user something to wave, Cortana speech to add accessibility features to those with limited movements and Toast, well, it goes without saying to use toasts on Windows platforms as it add so much feedback to the user as they play.

I hope you find fun and use over everything here and add those unique features to make your projects stand out on the Windows Store

The sample project that accompanies this post can be found here:

[http://wp.me/a3o0M2-2lG](http://wp.me/a3o0M2-2lG)

* * *


## About me

I’m **Simon Jackson** , an ID@Xbox MVP and all round game development evangelist, working with any game development technology I can get my hands on (I haven’t got a HoloLens yet, but I certainly want one!). Additionally I’m an active contributor and supporter of several open source projects, including the everlasting XNA evolution that is [MonoGame](http://monogame.net/), the amazing [AdRotator](http://getadrotator.com) advertising/monetisation platform, a [Unity UI extensions](https://bitbucket.org/ddreaper/unity-ui-extensions) project providing a multitude of community controls to devs and many many more.

On top of that I’m also a best-selling author of two Unity titles, which are doing very well at the moment with many great reviews. You can learn more about my titles [on my blog](http://darkgenesis.zenithmoon.com/books/).

[![clip_image019](/assets/img/wordpress/2016/04/clip_image019.jpg "clip\_image019")](http://darkgenesis.zenithmoon.com/portfolio/mastering-unity-2d-game-development/) [![clip_image021](/assets/img/wordpress/2016/04/clip_image021.jpg "clip\_image021")](http://darkgenesis.zenithmoon.com/portfolio/unity-3d-ui-essentials/)

