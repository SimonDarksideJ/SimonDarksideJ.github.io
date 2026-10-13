---
layout: post
title: AdRotator release for XNA
date: 2012-07-02 13:23:14
tags: [monetisation, xna, adrotator]
---

For once I'm going with a simple yet boring title for this blog post (since I'm known for naming things in a weird and wacky way :D) simply because the content will speak for itself

## A Note - This control is designed for XNA on Windows Phone and will later be released for Desktop, Web ADS are NOT available on XBOX as there is no Internet connectivity.

### We may release a future version that allows multiple House Ads later on for XBOX.

If you followed my previous article on [AdRotator](http://wp7adrotator.codeplex.com/) you should know I got involved with the team and added some features / new providers, that project has now been updated to V1.  The tutorial has been updated to reflect some of the changes to improve the overall solution so if you need Ads for Silverlight or SilverXNA [I'd suggest you start there](http://bit.ly/zO63xH).

But now back to the main show

With Silverlight done I decided to tackle XNA which historically has had very bad support for Ads, only a few providers specifically support it, with AdRotator for XNA i've spun some magic and we currently have 4 Providers supported for now (hope to add more in the future):

> #### Microsoft Pubcenter (XNA component from Microsoft)
>
> #### AdDuplex (XNA library from AdDuplex)
>
> #### Inneractive (Via web Ads)
>
> #### MobFox (Via their web API)

All of the above provided their own challenges and quirks and challenges but I got there in the end.

Also some of the improvements I made during the development of the XNA version have also made their way back into the Silverlight project, such as:

> #### Default Ad Support
>
> You can now create your own Ad to run locally in your app/game, especially good if there is no network connectivity and you want to still display something (older versions just disabled the Ads)
>
> #### ADID and PublisherID configuration now possible through the configuration XML
>
> This loosens the shackles from configuring providers so that they are no longer hard coded in your app/game, also with the XML hosting option you could reconfigure your AD and Provider IDs on the fly as you wish without having to re-deploy your apps.

As usual the full source for the starter 2D and 3D projects is on the [codeplex project site here](http://starterxna.codeplex.com/) showing the integrations above.

So what's involved

* * *

## Project preparation

First off lets copy in the required DLLs and references to your project, using the Starter XNA Projects as reference I created a new folder in the Solution called "ExternalLibraries" in windows explorer so that my folder structure now looks as follows:

[![Windows Explorer showing the ExternalLibraries folder next to the Starter3DGame folder and solution](/assets/img/wordpress/2012/07/image124.png)](/assets/img/wordpress/2012/07/image124.png)

Then I copied the release files for XNA into the new folder, AdRotatorXNA.DLL and AdDuplex.Xna.dll.  (We don't ship the MS Pubcenter DLLs as they are part of the WP7 development tools but more on that later), you'll notice there are no libraries for Inneractive and MobFox :D, but that's another blog post.

Next as usual add references to the new DLLs in your Main XNA project and also add a reference to "Microsoft.Advertising.Mobile.Xna" library as shown below: (note you only have to add references to the Publisher libraries you intend to use, but if you try to use one you have not reference your project will crash!!)

[![Visual Studio Add Reference dialog with Microsoft.Advertising.Mobile.Xna selected](/assets/img/wordpress/2012/07/image125.png)](/assets/img/wordpress/2012/07/image125.png)

* * *

## The new Configuration file

One of the improvements added with the XNA version was the capability to completely configure the Ad Support for your project from the XML configuration file so there is no longer any need to specify the provider Ad IDs hard coded in your project.  You still can of course if that's how you roll, everything's optional :D.

The new XML file looks like this:

[![XML ad settings file with ad type probabilities for the en-US, en-GB, de-DE and default cultures](/assets/img/wordpress/2012/07/image126.png)](/assets/img/wordpress/2012/07/image126.png)

Not too much different just additional settings by Ad provider to identify the channels to use, this obviously can be greatly simplified to just the "Default" culture settings, the rest are just local overrides if you want to use different providers in different orders by culture (especially useful if certain markets are not supported or well filled in certain markets)

The additional settings are:

| AppID | The APP or AD ID provided to you by the publisher |
|---|---|
| SecondaryID | For Smaato this is the Publisher ID and for MS Pubcenter this is your AddUnitID |

One by product of this change is that you could even use different AdIDs depending on market but that's completely up to you.

As a side note one of the improvements coming in the V2 of the Silverlight version is to be able to support multiple occurrences of AdProviders in the same culture, this would enable you to have different Ad content settings delivered to your App (the most obvious of which would be to setup multiple accounts on MS Pubcenter with different categories and you can raise/lower the probabilities of serving ads depending on which is paying better :D)

As stated previously these changes are optional and are FULLY BACKWARDS COMPATIBLE, so you don't need to update all your apps using AdRotator from a central XML file at once, all previous editions will still work and in fact the hard Coded values in fact override any setting you configure, just something to be aware of.

So configure or just copy in a configuration file into your project BUT make sure that you set it's Build action to **Content** and set the "Copy option" to "Copy if newer" as shown below:

[![File properties for defaultAdSettings.xml with Build Action Content and Copy if newer](/assets/img/wordpress/2012/07/image127.png)](/assets/img/wordpress/2012/07/image127.png)

You should find a blank xml configuration file in the file you downloaded from Codeplex or in the example project if you are looking at the source.

* * *

## Turning on the Ads

Now comes the really tricky part which will obviously contain lots of hacky code and troublesome links to get this thing working, right?

Nope :P

Here's what I did to implement the XNA [AdRotator](http://wp7adrotator.codeplex.com/) in the Starter projects, first off in the Game Class (the class in your project that inherits from the XNA Game class, there can be only one - highlander :D) and locate the Initialize method, then add the following:

```csharp
//initialise the AdRotator Component
AdRotatorXNAComponent.Initialize(this);

//Add the control to the XNA Component list which will display the ad
//Note as this is XNA be sure to just to this for the game states you want it shown.
Components.Add(AdRotatorXNAComponent.Current);
```

And that's it! Hard wasn't it, this will link to all the Ad providers defined in your configuration XML (provided you left it as the default name of "defaultAdSettings.xml" else you will get nothing) and start displaying Ads in the top left hand corner of the screen, simples.

There are a few optional setting you can use to liven things up, just make sure to configure them INBETWEEN the lines above, once AdRotator is up and running (when it's added as a component") it's off and going, you can change some of the options below while it's running but take it at your own risk where it isn't specified:

### Change the Ad Drawing Position

Using the "AdPosition" property you can choose where to place the ad in relation to the rest of the screen as follows:

```csharp
//Specify where you want the Ad to display (based on the top left corner of the Ad)
AdRotatorXNAComponent.Current.AdPosition = new Vector2(0, GraphicsDevice.Viewport.Height - 100);
```

Which will place the Ad in the Lower left hand corner of the screen.

This option can be changed while AdRotator is running usually when you need to display it in a different section of the screen for menus and gameplay.  For an example of this look in the "Starter3DGameplayScreen.cs" and "StarTrooperGameplayScreen.cs" in the constructor for that screen.

### Turn on the Sliding add functionality

As we added in the Silverlight project, the XNA also has the ability to slide the ads in and out (popup) so they don't completely disrupt gameplay, to enable this just add the following line in the Game initialisation which will slide the Ad in and out from the right hand side:

```csharp
//Optionally specify the slide (popup) direction for the Ad
AdRotatorXNAComponent.Current.SlidingAdDirection = SlideDirection.Right;
```

This option can be changed while AdRotator is running but just be aware of the Current Slide Transition State as you will get odd behaviours if it is animating already.

### Change the Location / name for the default configuration file

This setting is exactly the same as the Silverlight version, as follows:

```csharp
//Optionally Set the local configuration file used to set the default Ad Locations
AdRotatorXNAComponent.Current.DefaultSettingsFileUri = "defaultAdSettings.xml";
```

### Set a remote URL from where to download the configuration file each run

This setting is exactly the same as the Silverlight version, as follows:

```csharp
//Optionally set a URL from where to pull the configuration file down remotely each time the game is run
AdRotatorXNAComponent.Current.SettingsUrl = "http://mysite.com/defaultAdSettings.xml";
```

The original publisher ID configuration is also present, I'll not go through this as you should get the picture from the code above.

* * *

## The new Default Ad Functionality

One of the questions that came to mind during the evolution of the XNA project was what to do if you have no network available (as happens a lot with multiplayer games) or in the case of the reduced number of Ad Providers we can initially support, what if there are no Ads.

Originally in the Silverlight version the AdRotator control would simply not display, effectively disabling it, but if the aim of Ads in your app/game is to persuade people to buy your app then this effectively gave them your app for free (unless you were more severe in your trial mode), also there was the idea if you wanted your own Ad's in your project where you wanted to highlight your other projects or interests (or even a NAG ad to persuade people to buy your game :D).

So as part of the course of the XNA project we introduced our very own Default House Ads, which operate exactly the same as other ad providers with the added option that they can be displayed (if enabled) even when there is no network connectivity.  in the future we also hope to enable you to update your own Ad(s) remotely.

To enable this you need just a few things, first off an Ad :P, so for XNA drop a texture image in to your content project and load it into AdRotator as follows:

[![Visual Studio showing AdRotator.png in the content project and the matching asset name in code](/assets/img/wordpress/2012/07/image128.png)](/assets/img/wordpress/2012/07/image128.png)

Then add a line in-between the AdRotator initialise and Component Lines in your game's initialize function as follows:

```csharp
//Optionally specify your own House Ad which will display if there is no network
AdRotatorXNAComponent.Current.DefaultHouseAdImage = Content.Load<Texture2D>(@"AdRotator\AdRotatorDefaultAdImage");
```

plus you will need to ensure you have configured the "DefaultHouseAd" as a provider in your configuration XML, you can configure it with or without a probability, the difference being is that if you supply a probability it will rotate in with all the other ads based on that probability, without it it will only ever show when there are no other Ads to Serve.  In either case the Default House Ad will always show if there is no network connection.

the configuration line looks like the following (and shown in the main example before:

> &lt;Probabilities Probability="25" AdType="DefaultHouseAd"/>

OR

> &lt;Probabilities AdType="DefaultHouseAd"/>

You can also optionally hook up to the "DefaultHouseAdClick" event to do something should the user click on your AD (the other Ad providers take you to a web link), this could be another gamestate in your game, another page in your app (if your using Silverlight Integration but still using the XNA version of AdRotator) or more commonly taking the user to a Marketplace search or your Website with info about your other Games.

In the Starter Series aps I've just hooked this up to show a little thank you message box :D, just remember to have all your tombstoning in place if you go browsing outside your app / game!

The Default Ad Functionality is also included in the Silverlight V1 release, see the previous updated tutorial for more info.

* * *

## Orientation Changed

One thing we acutely realised with the XNA version is that we needed to handle orientation manually, so together with the AdPosition property we added a method to automatically update the position of the control based on the orientation of the device.  At present the AdRotator control does its best to position the Ads in the centre of the area of the screen where you placed the ad.

|  | [![Phone emulator showing a default AdRotator banner at the top of a blue screen](/assets/img/wordpress/2012/07/image129.png)](/assets/img/wordpress/2012/07/image129.png) |
|---|---|
| Portrait | Landscape Left / Right |

To enable this feature just factor it into your code that handles the GraphicsDevice Orientation Changed event thus:

```csharp
        public Game1()
        {
            Window.OrientationChanged += new EventHandler<EventArgs>(Window_OrientationChanged);
            graphics.SupportedOrientations = DisplayOrientation.Portrait |
                DisplayOrientation.LandscapeLeft |
                DisplayOrientation.LandscapeRight;
        }

        void Window_OrientationChanged(object sender, EventArgs e)
        {
            AdRotatorXNAComponent.Current.UpdateAdPostition();
        }
```

So in your Game Constructor ensure you have bound to the Window.OrientationChanged event and call "UpdateAdPosition" from there, don't forget to set your supported orientations on the graphics device for those you wish to support.

At present it will centre the Ad as best it can, if you feel there should be more control over how the ad should be placed with regards to orientation changes then startup/join a discussion on the codeplex site

* * *

## There you Ad it

So there you have it, multiple Ads in your XNA game / app on windows phone, we're also looking at making this sure this will also run on Windows (actually we started out making it work on windows but the "Portable Class library" needed to make this happen doesn't work in the FREE version of the tools and we didn't want to lose that for now.  Stay tuned for a Windows Release near you soon :D

Now we're releasing this as V0.1 Beta to get feedback from it's use, in all our tests we've not had any issues but obviously feedback would be appreciated.  I plan to do further tests using the SunBurn gaming engine in the near future as well so I'll see how it goes, it might even end up as a SunBurn plugin for Windows and Phone (if John K will let me :D)

Also look for the releases ending up on NuGet soon.

Any questions or feedback either pop them here or as a new Discussion/Feedback item on the codeplex project.

As usual the full source for the starter 2D and 3D projects is on the [codeplex project site here](http://starterxna.codeplex.com/) showing the integrations above.

Hope you have fun getting Ads in your projects and leveraging this whole other Revenue scheme
