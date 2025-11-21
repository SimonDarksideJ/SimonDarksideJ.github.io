---
layout: post
title: Would you like Ads with that! - Intro to AdRotator for WP7
date: 2012-07-02 13:16:37
tags: [monetisation, adrotator, windows phone]
---

One of those things we always strive for when we write games and apps for a platform is the hope of some recognition for our efforts or failing that a huge pile of cash to admire from our yacht parked in some temperate climate ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile10.png)

The subject of how to achieve the latter is always up for debate, do you just ship out your game/app with a nice and affordable price tag  or push it out free and use Ads or In App purchasing to reach that goal, both have merits but why not do both. (also if you offer a trial you can embed the ads and turn them off when the app has been bought!)

All of this is made all the more simpler through the use of the [AdRotator](http://wp7adrotator.codeplex.com/) control, just drop it in your project with your Ad Account settings and your done! (with a little placement) so lets see just how easy this is.!

 

As usual full source for the Starter projects can be found on [Codeplex Here](http://starterxna.codeplex.com/ "Starter 2D and 3D codeplex projects") and you can find out more info and download AdRotator from [Codeplex here](http://wp7adrotator.codeplex.com/)


## <font color="#0000ff">** Update</font>

V1 of the Silverlight version of AdRotator has now been released with these additional features

- Default House Ads – You now have the capability to design and implement your own Ad within AdRotator and have it displayed within the Ad Roll, the big benefit of this is that if there is no network available it will now still have an Ad to display (previously no Ads would display).  If you just want it as a fall-back Ad then do not configure a probability against the Default House Ad.  It is also completely optional so if you do not want it just do not configure it ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile10.png)
- PubCenter Bug fixed but it does require you to update your implementation slightly, details below
- Publisher configuration now possible in the configuration XML file – now you have two options to configure your Publisher ID’s, either as before hard coded into each pages XAML or code behind OR you can now also configure it in the configuration XML. If you configure both then the Hard Coded values will take precedent, details below. 


## <font color="#ff0000">**HOT NEWS</font>

The XNA version of AdRotator has now been released, check it out on [Codeplex here](http://wp7adrotator.codeplex.com/) and read all about it is use in [this blog post](/2012/02/20/adrotator-release-for-xna)

* * *


# Enter [AdRotator](http://wp7adrotator.codeplex.com/) for WP7 

[AdRotator](http://wp7adrotator.codeplex.com/) is a multi Ad host provider control which also support failover of ad networks to always ensure you get an ad to display in your app or game and thus ensuring better fill rates for your ad providers.

Currently Ad Rotator supports the following networks:

> ![](assets/img/posts/image-not-found.png)    [Microsoft PubCenter](http://advertising.microsoft.com/mobile-apps)   
> ![](assets/img/posts/image-not-found.png)    [AdDuplex](http://adduplex.com/)   
> ![](assets/img/posts/image-not-found.png)    [Google AdMob](http://admob.com/)   
> ![](assets/img/posts/image-not-found.png)    [Inner-Active](http://inner-active.com/)   
> ![](assets/img/posts/image-not-found.png)    [MobFox](http://mobfox.com/)   
> ![](assets/img/posts/image-not-found.png)    [Smaato](http://www.smaato.com/ "Smaato Network")

It offers several features such as:

> ![](assets/img/posts/image-not-found.png)    Multiple Concurrent Ad Provider support   
> ![](assets/img/posts/image-not-found.png)    Failover support (if Ad not delivered it moves to the next Ad Provider)   
> ![](assets/img/posts/image-not-found.png)    Remote Configuration (through external URL)   
> ![](assets/img/posts/image-not-found.png)    Popup support (for scenarios where Ads are a Nag or you do not have enough real-estate for permanent Ads )   
> ![](assets/img/posts/image-not-found.png)    “\*New for V1 Publisher configuration in external XML file    
> ![](assets/img/posts/image-not-found.png)    \*\*New for V1 Default House Ads (Developer Ads)  

All this and it is just a single control that you can drop into the Silverlight pages in your apps/games

Granted it is only for Silverlight at present but it has plans for an XNA version in the near future

XNA Version now released [here](http://wp7adrotator.codeplex.com/) and instructions [here](/2012/02/20/adrotator-release-for-xna)

* * *


# Getting started with those Ad Networks

First off make sure you are registered with all the appropriate ad networks as follows:

If you already have all the Ad Providers you want then jump past this section to “Right, Getting your Ad On”!


## <u></u>


## <u>Pubcenter (Microsoft)</u>

Pubcenter is Microsoft’s Ad network, it has the highest pay-out rates in the US, one thing to check is if your county is supported for publishing Ads as it is only recently expanded outside the US with other countries on the roadmap.

[![image](/assets/img/wordpress/2012/07/image107.png "image")](/assets/img/wordpress/2012/07/image104.png)

Login / Sign up to Pubcenter using your Microsoft Live ID and register a new app / Ad Unit, this will create your new account and setup your first application also select 3 Categories of ads to be served to your app and a Banner size of “480×80 XX-Large banner”.

Note down the Application ID and Ad Unit ID for use later:

[![image](/assets/img/wordpress/2012/07/image108.png "image")](/assets/img/wordpress/2012/07/image105.png)

If you already have an account, be sure to setup BOTH an application and an Add Unit ID as shown below:

[![image](/assets/img/wordpress/2012/07/image109.png "image")](/assets/img/wordpress/2012/07/image106.png)


## <u></u>


## <u>AdDuplex</u>

AdDuplex is an App Sharing network, not really focused on Ad Revenue but rather cross promotion of your apps.  They do offer some cash generating options but is it business orientated and requires you to pay for the service.  Check back often though as they are always doing offers and competitions.

[![image](/assets/img/wordpress/2012/07/image110.png "image")](/assets/img/wordpress/2012/07/image107.png)

Once you have registered your account and logged on, create a new app

[![image](/assets/img/wordpress/2012/07/image111.png "image")](/assets/img/wordpress/2012/07/image108.png)

Next Create a new Ad

[![image](/assets/img/wordpress/2012/07/image112.png "image")](/assets/img/wordpress/2012/07/image109.png)

Next up you need to decide what text to be displayed in other apps as 4 separate text lines (displayed in pairs)

[![image](/assets/img/wordpress/2012/07/image113.png "image")](/assets/img/wordpress/2012/07/image110.png)

If your app is already on the marketplace then place the DeepLink for your app in the APP ID field, if not just leave it blank for now

Once done then just record the APP ID from the Ad details:

[![image](/assets/img/wordpress/2012/07/image114.png "image")](/assets/img/wordpress/2012/07/image111.png)


## <u></u>


## <u>AdMob (Google)</u>

AdMob has been around for ages and is the premier Ad Provider on Android (no surprise there) but also has clients on most devices, however this wide spread does have a downturn impact on the income you can generate from displaying ads and registered clicks, still it is a robust network and good to have

Visit the site logon using your google ID and click on “Get Started” button and register your details for AdMon, with that done “Create a New App”:

[![image](/assets/img/wordpress/2012/07/image115.png "image")](/assets/img/wordpress/2012/07/image112.png)

Once you have selected the Windows 7 Option you will be presented with the Ad details:

[![image](/assets/img/wordpress/2012/07/image116.png "image")](/assets/img/wordpress/2012/07/image113.png)

Once created navigate back to the app lists and select “Manage” against your new app, then note down the Publisher ID:

[![image](/assets/img/wordpress/2012/07/image117.png "image")](/assets/img/wordpress/2012/07/image114.png)


## <u></u>


## <u>InnerActive</u>

InnerActive is one of the new boys to the Ad Provider network, their signup process is still a but clunky and required you to talk to a representative but they have a good sturdy platform.

Navigate to the site and click on “Getting Started”

[![image](/assets/img/wordpress/2012/07/image118.png "image")](/assets/img/wordpress/2012/07/image115.png)

Now here is where it stops for a while with Inneractive, you will get a mail to activate your account and some contact to set up your Ad Unit ID, once you have that keep it safe, it should look something like this:

“DavideCleopadre\_ClockAlarmNightLight\_WP7”


## <u></u>


## <u>MobFox</u>

Another stable platform for use in delivering Ads, not much more to say on this as I have not personally had much experience with them.  We did have a few challenges with the client on WP7 but all good now.

Go to the site and click on the link to register as a Publisher:

[![image](/assets/img/wordpress/2012/07/image119.png "image")](/assets/img/wordpress/2012/07/image116.png)

Once logged in click on the link to “Create your mobile application or website” and you will be taken to the following screen:

[![image](/assets/img/wordpress/2012/07/image120.png "image")](/assets/img/wordpress/2012/07/image117.png)

After you have selected WP7 Application you then need to enter the details for your app as follows:

[![image](/assets/img/wordpress/2012/07/image121.png "image")](/assets/img/wordpress/2012/07/image118.png)

Lastly you will be presented with your Publisher ID, keep it safe for later:

[![image](/assets/img/wordpress/2012/07/image122.png "image")](/assets/img/wordpress/2012/07/image119.png)


## <u></u>


## <u>Smaato</u>

Smaato is heralded as one of the highest paying Ad Providers and from what I’ve seen this is no boast, however their fill rates (percentage between Ads requested and Ads Served) average around 50% and mainly only in the US but if you get ads from them you can be sure of a good kickback (my preferred provider)

For Smaato, create a new account making sure to select “Both” on the question about “I want Ads for”.

When you first logon you will be asked to enter payment details, you can either do this now or later.

When you get the main account screen up, click on the “Create Ad Space” button and you will be presented with the following screen:

[![image](/assets/img/wordpress/2012/07/image123.png "image")](/assets/img/wordpress/2012/07/image120.png)

Once you have setup your ad space you will have an Ad Space ID and Publisher ID, make sure you make a reference of these:

[![image](/assets/img/wordpress/2012/07/image124.png "image")](/assets/img/wordpress/2012/07/image121.png)

One tip with Smaato, you will get more Ads and references if you fill out your profile for the Ad Space, just click on the Icon under profile to do this.  It is important that you supply the Marketplace Deep link on your profile to start generating revenue!

* * *


# Last Minute Tip

Be sure to revisit your Ad providers and update your payment information and profile information, this enables advertises to get excited about your project and increase interest for supplying Ads.

It is important to tell the Ad Providers all you can about your Ad schemes so they can best represent you with advertisers.

* * *


# Right, Getting your Ad on

SO you got all your Ad accounts setup (granted you only need to sign up for as many as you want/need to), time to put them to use.

You have two options (as in most cases) either you can copy the AdRotator project into your project or just add the AdRotator DLL to your project as a reference, both approaches are detailed below:


### Reference Project (Starter 2D SilverXNA Project)

> ![](assets/img/posts/image-not-found.png)    Create a New folder in your project called AdRotator   
> ![](assets/img/posts/image-not-found.png)    Copy the AdRotator DLL in the AdRotator folder   
> ![](assets/img/posts/image-not-found.png)    Copy all the DLL references for the Ad Networks you wish to use in the AdRotator folder   
> ![](assets/img/posts/image-not-found.png)    \*\*Update The library download now contains all DLL’s for use with the project, copy all of these to your new folder    
> ![](assets/img/posts/image-not-found.png)    Add all the new DLL’s as references to the project   
> ![](assets/img/posts/image-not-found.png)    If you are using Pubcenter then add the default references as well (shipped as part of the WP7 tools)


### Copy Project **\*\* Updated**

Although it is still possible to do this method we recommend you just reference the project using the instructions above, this is mainly due to some of the changes in the project structure and our roadmap to V2 and Windows versions.

> ![](assets/img/posts/image-not-found.png)    Download the source for the AdRotator Solution into a folder in your project, alternatively use an SVN client to synch the project   
> ![](assets/img/posts/image-not-found.png)    Add the main AdRotator project to your solution as an existing project   
> ![](assets/img/posts/image-not-found.png)    Add the AdRotatorSharedModel project to your solution as an existing project (Check it is referenced from the AdRotator Project)   
> ![](assets/img/posts/image-not-found.png)    Reference the project in your solution

* * *


# Implementing the control 

At this point with most WP7 / Silverlight development you can either add the control (once you have built it) in Blend or just cut and paste the following XAML in as the base template formatted for where you want to place it (as shown in the SilverXNA projects)

| 

    \<adRotator:AdRotatorControl x:Name="AdRotatorControl" Width="480" Height="80" DefaultSettingsFileUri="/Starter3DGame;component/defaultAdSettings.xml" SettingsUrl="http://XNA-UK.NET/defaultAdSettings.xml" PubCenterAdUnitId="10029821" PubCenterAppId="78b9455f-db44-4de8-b0c3-1a91784790cd" AdDuplexAppId="7687" AdMobAdUnitId="a14f2fe26380243" InneractiveAppId="ZenithMoon\_HumanImpact\_WP7" MobFoxAppId="772ab6d4fcceed40a6c98436af4443ff" MobFoxIsTest="False" SmaatoPublisherId="923855310" SmaatoAppId="65754722" /\> 

 |

Most of the default settings should be fairly obvious and you just need to replace the configuration values for each of the Ad Providers, the rest of the options are configurable as follows:

| Property | Description |
| DefaultSettingsFileURI | 

Local Configuration file for ad networks to use, configured in the format of :   
Assembly Name of solution with file + “;component/” + Path and filename

 |
| SettingsUrl | 

URL of hosted configuration file (read only) this overwrites the local configuration if found (good for re-configuring solutions remotely)

 |
| DefaultAdType | 

The Primary ad provider to use

 |
| SlidingAdDirection   
(previously SlidingAdType) | 

Popup / slide behaviour, options include Top, Bottom, Left and Right.  default is None which just displays a static ad on the screen.   
When enabled it hides the ad off screen and gets a new ad on it is return

 |
| SlidingAdDisplaySeconds | 

How many seconds the ad should remain on screen when the Slide direction has been configured   
Default: 10 seconds

 |
| SlidingAdHiddenSeconds | 

How many seconds the ad should remain off screen when the slide direction has been configured   
Default: 20 seconds

 |

For more information regarding the configuration of [AdRotator](http://wp7adrotator.codeplex.com/) see the CodeProject [documentation here](http://wp7adrotator.codeplex.com/documentation "Ad Rotator Documentation")


## Default House Ad configuration

With the Default House Ad functionality you can design your own ad for use within Ad Rotator, this is useful for situations where there is no network connectivity to get new ads and you still want to preserve the Ad presence, it is also good for showing off other products or offerings while the Ads fly by.

To use this simply create a User control with the dimensions of 480wx100h with what ever content you see fit and then add this line in the Constructor for your page (so that you can also use different ads for different pages if you wish) as follows:

    
    
        
        
            protected override void OnNavigatedFrom(System.Windows.Navigation.NavigationEventArgs e) { AdRotatorControl.Dispose(); // 
        
    
    

And in the “OnNavigatedTo” method

    protected override void OnNavigatedTo(System.Windows.Navigation.NavigationEventArgs e) { AdRotatorControl.Invalidate(); //

If you do not have those overrides in your app already you can add them by simply typing “override OnN” and selecting the correct method from the list to automatically add it.

* * *


# The [AdRotator](http://wp7adrotator.codeplex.com/) configuration file

One of the features that most impresses me with AdRotator is it is support for setting the configuration of which ad providers to use and in what frequency through the use of an XML configuration file, what makes it extra special is that it allows the configuration to be downloaded from an external site so you can re-configure which ads to use (to maximise your cash generation) on the fly without re-submitting your apps/games.

It also gives you the ability to set different configurations based on the country / market the app is running in (from the culture setting on the phone)

Here is what the sample configuration file looks like:

    \<?xml version="1.0" encoding="utf-8"?\> \<AdSettings xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"\> \<CultureDescriptors\> \<AdCultureDescriptor CultureName="en-US"\> \<Probabilities Probability="16" AdType="Smaato" AppID="\<Insert Smaato AppID here\>" SecondaryID="\<Insert Smaato Publisher ID here\>"/\> \<Probabilities Probability="16" AdType="AdMob" AppID="\<insert AdMob App ID here\>"/\> \<Probabilities Probability="15" AdType="InnerActive" AppID="\<Insert InnerActive APPID here\>" /\> \<Probabilities Probability="15" AdType="MobFox" AppID="\<Insert MobFox APP ID here\>" IsTest="false"/\> \<Probabilities Probability="40" AdType="PubCenter" AppID="\<Insert Pubcenter APP ID here\>" SecondaryID="\<inserrt Pubcenter AD Unit ID here\>" /\> \<Probabilities Probability="10" AdType="AdDuplex" AppID="\<insert AdDuplex AD ID here\>"/\> \<Probabilities AdType="DefaultHouseAd"/\> \</AdCultureDescriptor\> \<AdCultureDescriptor CultureName="en-GB"\> \<Probabilities Probability="20" AdType="Smaato" AppID="\<Insert Smaato AppID here\>" SecondaryID="\<Insert Smaato Publisher ID here\>"/\> \<Probabilities Probability="10" AdType="InnerActive" AppID="\<Insert InnerActive APPID here\>" /\> \<Probabilities Probability="10" AdType="MobFox" AppID="\<Insert MobFox APP ID here\>" IsTest="false"/\> \<Probabilities Probability="10" AdType="AdDuplex" AppID="\<insert AdDuplex AD ID here\>"/\> \<Probabilities Probability="20" AdType="AdMob" AppID="\<insert AdMob App ID"/\> \<Probabilities Probability="20" AdType="PubCenter" AppID="\<Insert Pubcenter APP ID here\>" SecondaryID="\<inserrt Pubcenter AD Unit ID here\>" /\> \<Probabilities AdType="DefaultHouseAd"/\> \</AdCultureDescriptor\> \<AdCultureDescriptor CultureName="de-DE"\> \<Probabilities Probability="25" AdType="Smaato" AppID="\<Insert Smaato AppID here\>" SecondaryID="\<Insert Smaato Publisher ID here\>"/\> \<Probabilities Probability="25" AdType="PubCenter" AppID="\<Insert Pubcenter APP ID here\>" SecondaryID="\<inserrt Pubcenter AD Unit ID here\>" /\> \<Probabilities Probability="25" AdType="AdMob" AppID="\<insert AdMob App ID here\>"/\> \<Probabilities Probability="25" AdType="AdDuplex" AppID="\<insert AdDuplex AD ID here\>"/\> \<Probabilities AdType="DefaultHouseAd"/\> \</AdCultureDescriptor\> \<AdCultureDescriptor CultureName="default"\> \<Probabilities Probability="16" AdType="Smaato" AppID="\<Insert Smaato AppID here\>" SecondaryID="\<Insert Smaato Publisher ID here\>"/\> \<Probabilities Probability="16" AdType="AdMob" AppID="\<insert AdMob App ID here\>"/\> \<Probabilities Probability="16" AdType="InnerActive" AppID="\<Insert InnerActive APPID here\>" /\> \<Probabilities Probability="16" AdType="MobFox" AppID="\<Insert MobFox APP ID here\>" IsTest="false"/\> \<Probabilities Probability="16" AdType="PubCenter" AppID="\<Insert Pubcenter APP ID here\>" SecondaryID="\<inserrt Pubcenter AD Unit ID here\>" /\> \<Probabilities Probability="16" AdType="AdDuplex" AppID="\<insert AdDuplex AD ID here\>"/\> \<Probabilities AdType="DefaultHouseAd"/\> \</AdCultureDescriptor\> \</CultureDescriptors\> \</AdSettings\>

 

As you can seen the file is fairly self explanatory, each section lists the Ad Providers to use and a probability in which the Ad will be selected at random.  Just set the Ads you want to “Try” and deliver more often with a higher percentage.

In the end the control will verify valid ad providers (one’s that are actually delivering ads for your region) and just use that work, this is re-evaluated each time your app is run.

When you have configured your file, just copy it to the Root of your main project and update the “DefaultSettingsFileURI” property in each page you use the control, you can create a central resource for the control but we have found that it is better to just enable it on each page you want ads as it re-evaluates the ad providers when the page is opened which can help pick up the latest ads.

Optionally if you have your own website where you can drop your configuration file, then be sure you also configure the “SettingsUrl” property and MAKE SURE you can browse to the file and it is not blocked by your sites security settings

* * *


# Conclusion

AdRotator is a quick and simple to use control and enables you to support multiple Ad Networks concurrently with failover support  to always ensure you will display an ad on screen when some providers fail to deliver.

I have updated both of the SilverXNA solutions from the Starter tutorial set and published their updates to the marketplace (should be live any day now) so you can check them out.

What are you waiting for Go Get some Ads.

| [![image](/assets/img/wordpress/2012/07/image125.png "image")](/assets/img/wordpress/2012/07/image122.png) | [![image](/assets/img/wordpress/2012/07/image126.png "image")](/assets/img/wordpress/2012/07/image123.png) |
| 

The Starter 2D app with Ads in Game   
(using the Slider option)

 | 

The Starter 3D app with Ads

 |

Total time taken to put ads in both these projects 10 mins!  Beat that ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile10.png)

 

 

I have also put the new ad control into my Current game on the marketplace and in a bit of shameless self promotion I will point it out here ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile10.png)

“Flipped” is a Tile matching fun game with several difficulties and challenges ranging from simple 2/3 and 4 tile matching to time trials / bomb dodging and one final dual tile madness extravaganza, available both as Free (ad supported now with AdRotator) and Buy/Trial.


### For more details visit [zenithmoon.com](http://zenithmoon.com/ "ZenithMoon Studios presents "Flipped"") 

| 

| [![Screenshot](/assets/img/wordpress/2012/07/Screenshot.png "Screenshot")](/assets/img/wordpress/2012/07/Screenshot.png) | [![Screenshot3](/assets/img/wordpress/2012/07/Screenshot3.png "Screenshot3")](/assets/img/wordpress/2012/07/Screenshot3.png) |

 | 

| [![Screenshot4](/assets/img/wordpress/2012/07/Screenshot4.png "Screenshot4")](/assets/img/wordpress/2012/07/Screenshot4.png) | [![Screenshot5](/assets/img/wordpress/2012/07/Screenshot5.png "Screenshot5")](/assets/img/wordpress/2012/07/Screenshot5.png) |

 |
| [![download](/assets/img/wordpress/2012/07/download.png "download")](http://windowsphone.com/s?appid=c069cb34-4adb-4997-8365-b51a93a80db0) | [![downloadfree](/assets/img/wordpress/2012/07/downloadfree.png "downloadfree")](http://windowsphone.com/s?appid=7dea31e4-b0c5-4582-8a20-2817f2fb7a65) |

Please spread the word if you can, thanks for supporting

