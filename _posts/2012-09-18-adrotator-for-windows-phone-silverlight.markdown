---
layout: post
title: AdRotator for Windows Phone Silverlight
date: 2012-09-18 16:07:22
tags: [adrotator, windows phone]
---

[![AdRotator icon of two looping arrows on a purple background](/assets/img/wordpress/2012/09/Icon_1_purple.png)](/assets/img/wordpress/2012/09/Icon_1_purple.png)![Microsoft Silverlight logo](/assets/img/recovered/2012-09-18-adrotator-for-windows-phone-silverlight/150px-Microsoft_Silverlight_logo.png)

## AdRotator for Windows Phone Silverlight V1.2 release

With the release of what is likely the last version in the V1 branch of AdRotator for Windows Phone Silverlight I've gone some lengths to make sure the documentation and samples are also feature complete.

For the XNA version read this article and then [continue on to here](http://bit.ly/S5GUVO)

If you've not seen AdRotator before, it's a control library that supports multiple Ad Providers (MS PubCenter, [AdDuplex](https://www.adduplex.com/), Smaato to name but a few) with the ability to change the configuration of your Ad configuration remotely without having to rebuild your app. To date there are over 300 apps and games using AdRotator and it's reach is extending further each day. To learn more about what is AdRotator then check out the codeplex project page here.

So this is the final "How-To" guide updated and refreshed for the 1.2 release end - to end

---

## Getting Started

First off, if you haven't already get yourself some AdUnits from your favourite Ad Provider, or like most of us, get all the one's that do it for you :D - [See this article for more info](/would-you-like-ads-with-thatintro-to-adrotator-for-wp7.html).

Next up download the latest release of [AdRotator](http://wp7adrotator.codeplex.com/) - [Link](http://bit.ly/S5uI7p)

Now for the important bit!, just add the control to your Silverlight project on the pages you want to use it and configure it's settings. For best practice we recommend you do this in a separate User Control and reuse that where you want Ads, saves the hassle of maintaining it in multiple places, but this is completely up to you.

First copy the AdRotator DLL and the supported Ad Providers DLL's to a folder in your project (at this time you have to add references to all the Ad Providers even if you only intend to use a few (we hope to remove this limitation in V2), but in any case it does not harm your solution or its size doing so, plus if you wish to later configure another provider you still don't have to change your deployed product. Then add the references in your project as follows:

[![Solution Explorer References list with the AdRotator and ad provider DLLs](/assets/img/wordpress/2012/09/image5.png)](/assets/img/wordpress/2012/09/image5.png)

**\*Note,** we now provide Location aware and Non Location aware DLL's for AdRotator, so if you don't want to use location services for your Ads then you no longer have to, just select the "Non Location aware" versions of the DLL's

**\*\*Note** Smaato's control at time of writing has a flaw, they provide a "non-location aware" version of their API but it still requires the location capability in Windows Phone projects, so we have disabled it for now, don't add a reference to Smaato if you use the Non Location Aware version as it's been disabled in AdRotator for now.

When you have the references in then either switch to Blend and add the AdRoator control to your pages (don't forget to BUILD your project first):

|   |   |
| --- | --- |
| [![Blend Assets panel showing the AdRotatorControl search result](/assets/img/wordpress/2012/09/image6.png)](/assets/img/wordpress/2012/09/image6.png) | Find the "AdRotatorControl" in the assets panel and drag it to your page or simply double click it |
| [![Blend properties panel with the AdRotator control settings](/assets/img/wordpress/2012/09/image7.png)](/assets/img/wordpress/2012/09/image7.png) | Configure the properties of the AdRotator control setting options like:<br><br>\* "DefaultSettingsFileUri"<br><br>Shipped configuration file for out of the box scenarios (recommended)<br><br>\* "SettingsUrl"<br><br>Remote URL where external XML configuration file can be sourced from.<br><br>For full list of settings see the previous article mentioned above |
| [![Windows Phone page in Blend with the AdRotator control placed at the bottom](/assets/img/wordpress/2012/09/image8.png)](/assets/img/wordpress/2012/09/image8.png) | Now just align the control to where you want it on your page as you would any other control<br><br>As Stated, its recommended to place the control in it's own UserControl if you are going to use it on multiple pages, just to make your life easier |

Or you can simply paste in the XAML and configure it that way :D:

```xml
<AdRotator:AdRotatorControl Name="AdRotatorSilverlight"
	Grid.Row="1"
	Height="100"
	VerticalAlignment="Bottom"
	DefaultSettingsFileUri="/BlankSilverlightProject-LocationAware;component/defaultAdSettings.xml"
	SettingsUrl="http://adrotator.apphb.com/defaultAdSettingsSilverlightLoc.xml"
	Margin="1"/>
```

Note the format of the "DefaultSettingsUri" configuration parameter, to configure it correctly it has to be in the following pattern:

"/\<Your Project Assembly Name">;component/\<your local filename>"

You can find your "assembly name" by right clicking on your project and selecting "Properties" and on the "Application" tab you should find it there, NOTE not to be confused with your project namespace because that just won't work.

Next up you need to ensure the control is started with the application, to make sure you have the most control we leave you to do this manually, having it start automatically just didn't work for everyone, again this is very simple just call the controls "Invalidate" function in your pages "Loaded" event.

**\*Note** you can call "Invalidate" in the "OnNavigatedTo" method as has been advised before but due to recent changes inside the control we advise you to only do this in the "Loaded" event or afterwards. Certain configurations require the control to be renderable before they will function. Basically TEST TEST TEST if you want to do it another way.

```csharp
// Constructor
public MainPage()
{
	InitializeComponent();
	Loaded += new System.Windows.RoutedEventHandler(MainPage_Loaded);
}

void MainPage_Loaded(object sender, System.Windows.RoutedEventArgs e)
{
	AdRotatorSilverlight.Invalidate();
}
```

You can also hook-up the "Loaded" event in XAML if you want and save yourself a whole line of code, your choice.

Lastly, the configuration file itself. in the sample projects we provide you with a default XML configuration file, we did supply this in the Binaries but found most people didn't use that one.

**\*NOTE be sure to set the "build action" property of the configuration file to "Resource", else AdRotator won't be able to find it!!**

[![File properties for defaultAdSettings.xml with Build Action set to Resource](/assets/img/wordpress/2012/09/image9.png)](/assets/img/wordpress/2012/09/image9.png)

Here's a full configuration file as a starter:

```xml
<?xml version="1.0" encoding="utf-8"?>
<AdSettings xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<CultureDescriptors>
    <AdCultureDescriptor CultureName="en-US">
      <Probabilities Probability="16" AdType="Smaato" AppID="65754722" SecondaryID="923855310"/>
      <Probabilities Probability="16" AdType="AdMob" AppID="a14e5b8669ef367"/>
      <Probabilities Probability="15" AdType="InnerActive" AppID="DavideCleopadre_ClockAlarmNightLight_WP7" />
      <Probabilities Probability="15" AdType="MobFox" AppID="1d59fb0a677336d8cd4cbd5c7c117f9d" IsTest="false"/>
      <Probabilities Probability="40" AdType="PubCenter" AppID="test_client" SecondaryID="Image480_80" />
      <Probabilities Probability="10" AdType="AdDuplex" AppID="2859"/>
      <Probabilities AdType="DefaultHouseAd" AppID="http://xna-uk.net/AdRotator/SampleRemoteHouseAd.xaml"/>
    </AdCultureDescriptor>
    <AdCultureDescriptor CultureName="en-GB">
      <Probabilities Probability="20" AdType="Smaato" AppID="65754722" SecondaryID="923855310"/>
      <Probabilities Probability="10" AdType="InnerActive" AppID="DavideCleopadre_ClockAlarmNightLight_WP7" />
      <Probabilities Probability="10" AdType="MobFox" AppID="1d59fb0a677336d8cd4cbd5c7c117f9d" IsTest="false"/>
      <Probabilities Probability="10" AdType="AdDuplex" AppID="2859"/>
      <Probabilities Probability="20" AdType="AdMob" AppID="a14e5b8669ef367"/>
      <Probabilities Probability="20" AdType="PubCenter" AppID="test_client" SecondaryID="Image480_80" />
      <Probabilities AdType="DefaultHouseAd" AppID="http://xna-uk.net/AdRotator/SampleRemoteHouseAd.xaml"/>
    </AdCultureDescriptor>
    <AdCultureDescriptor CultureName="de-DE">
      <Probabilities Probability="25" AdType="Smaato" AppID="65754722" SecondaryID="923855310"/>
      <Probabilities Probability="25" AdType="PubCenter" AppID="test_client" SecondaryID="Image480_80" />
      <Probabilities Probability="25" AdType="AdMob" AppID="a14e5b8669ef367"/>
      <Probabilities Probability="25" AdType="AdDuplex" AppID="2859"/>
      <Probabilities AdType="DefaultHouseAd" AppID="http://xna-uk.net/AdRotator/SampleRemoteHouseAd.xaml"/>
    </AdCultureDescriptor>
		<AdCultureDescriptor CultureName="default">
      <Probabilities Probability="16" AdType="Smaato" AppID="65754722" SecondaryID="923855310"/>
      <Probabilities Probability="16" AdType="AdMob" AppID="a14e5b8669ef367"/>
      <Probabilities Probability="16" AdType="InnerActive" AppID="DavideCleopadre_ClockAlarmNightLight_WP7" />
      <Probabilities Probability="16" AdType="MobFox" AppID="1d59fb0a677336d8cd4cbd5c7c117f9d" IsTest="false"/>
      <Probabilities Probability="16" AdType="PubCenter" AppID="test_client" SecondaryID="Image480_80" />
      <Probabilities Probability="16" AdType="AdDuplex" AppID="2859"/>
      <Probabilities AdType="DefaultHouseAd" AppID="http://xna-uk.net/AdRotator/SampleRemoteHouseAd.xaml"/>
    </AdCultureDescriptor>
	</CultureDescriptors>
</AdSettings>
```

Configuring it is easy enough, just remove the Ad Providers you don't use or want (we recommend you actually delete the lines, not set the Probability to 0, you can always add them again later) and then configure the probabilities as you see fit for which ever markets you want. The whole process goes something like this:

- First we test which country the device is in and look for a configuration for that country or region (we only support full codes in this release - sorry)
- If we find a configuration then we load up all the ad providers and select / cycle them according to the probability of selection you choose, if an Ad Provider does not deliver an Ad we ignore that provider while the app is running and move on to the next probable. if no providers have Ads the control is disabled
- If we DONT find a configuration for the handsets country we drop to the default configuration

You can of course just supply a "Default" configuration and that will work fine but some Ad Providers don't perform well or even work in some regions so this is just something to keep in mind.

And that will get you started, if nothing else **we recommend** you install at least "[AdDuplex](https://www.adduplex.com/)" as an ad provider no matter what you do, you don't get paid for the Ad's but your app gets exposure on all other platforms and devices and **works in just about every region**, food for thought!

---

## The Local Default House Ad

Now I've promised this documentation since 1.1 but haven't found the time but were rounding up 1.2 here it is.

You should notice the "DefaultHouseAd" line in the configuration above, this comes in two flavours, the first is the Default LOCAL house ad, this simply is a User Control you have generated locally in your project which we can use to display in place of an AD, think of it as your own advert.

Creating your own Ad is extremely simple, just create a new User Control, in the examples it's called "MyDefaultAd". If you want to keep it in a separate folder like we have in the examples then **I suggest you create it in the root of your project and then move it there**, this saves any namespace confusions later on.

Just make sure it's dimensions are set to default (auto) and put whatever you want in there, just keep in mind the size of your ads on your page and you'll be fine. Ours is a very basic control as shown below:

```xml
<UserControl x:Class="BlankSilverlightProject_LocationAware.MyDefaultAd"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Width="Auto" Tap="UserControl_Tap">

    <Grid x:Name="LayoutRoot">
        <Grid.Background>
            <ImageBrush Stretch="Fill" ImageSource="AdRotator.png"/>
        </Grid.Background>
        <TextBlock HorizontalAlignment="Right"
			TextWrapping="Wrap"
			Text="Click here to see more from AdRotator"
			VerticalAlignment="Bottom" Margin="0,10,10,0"
			Foreground="#FFFD0000" FontWeight="Bold"/>
    </Grid>
</UserControl>
```

Just a very simple image with some text, but go wild. As for interaction you can either wire up the "Tap" event on one of the controls inside your user control as we have done above, or just configure it later by hooking up to AdRotators "AdClicked" event, completely up to you.

To activate your local House Ad, just instantiate it in the Page's "Loaded" event before you call "Invalidate" and set it to the "DefaultHouseAdBody" property like this:

```csharp
// Constructor
public MainPage()
{
	InitializeComponent();
	Loaded += new System.Windows.RoutedEventHandler(MainPage_Loaded);
}

void MainPage_Loaded(object sender, System.Windows.RoutedEventArgs e)
{
	AdRotatorSilverlight.DefaultHouseAdBody = new MyDefaultAd();
	AdRotatorSilverlight.Invalidate();
}
```

Then either when there is no network or (if you assign a probability to your House Ad) it will cycle in with the probability preference you set. **Only the "DefaultHouseAd" supports having no Ad Probability** which simply means it will be the default case if NO ads can be sourced from your other Ad Providers.

---

## The Remote Default House AD

One of the other capabilities we included with V1.1 was the ability to add your own updatable remote Ad, this is purely a piece of XAML on your own server that you can change and it will be updated in your App without rebuilding it again. (if you're interested in how this is done simply look in the "DefaultHouseAd.XAML.CS" file in source we won't be offended since we had to learn it from someone else anyway :D)

There are a few restrictions with the remote ad which should come as no surprise:

- No code behind (since there isn't one!)
- Images and other assets must come from the web, cannot reference local project assets
- No namespaces that cannot be sourced externally, no internal libraries!
- Absolutely no cats or mice allowed

Ok I made the last one up but you get the picture, the sample we provide on our service looks like this:

```xml
<UserControl xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">

    <Grid x:Name="LayoutRoot">
    	<Grid.ColumnDefinitions>
    		<ColumnDefinition Width="90"/>
    		<ColumnDefinition/>
    	</Grid.ColumnDefinitions>
        <StackPanel HorizontalAlignment="Left"
                    VerticalAlignment="Top" Grid.Column="1" Margin="5">
            <TextBlock Style="{StaticResource PhoneTextNormalStyle}"
                       TextWrapping="Wrap"
                       Text="An Example Default House Ad"
                       Margin="5"/>

            <HyperlinkButton NavigateUri="http://wp7adrotator.codeplex.com/"
                             TargetName="_blank"
                             HorizontalAlignment="Center"
                             Padding="0"
                             Content="http://wp7adrotator.codeplex.com/"
                             Foreground="{StaticResource PhoneAccentBrush}" Margin="0,10,0,0" />

        </StackPanel>
        <Image Source="http://adrotator.apphb.com/XNADefaultHouseAdRemote.jpg"
			Stretch="UniformToFill" Margin="0" />
    </Grid>
</UserControl>
```

Just a basic control with an image and a hyperlink button for clicking, but I can change this frequently to push users to the marketplace for my other apps or even another page on my own website.

With that in place you just need to configure the "APPID" property of the Ad Provider configuration as shown in the main Config XML sample above.

You can of course just use a remote ad and not provide a local one, it's completely up to you (but if your app has No network available at the time of running, it won't show Ads and AdRotator will be disabled)

---

## So there's V1 of AdRotator for Silverlight complete

Were now focusing on working a V2 of [AdRotator](http://wp7adrotator.codeplex.com/) which will be a breaking change version because we want to mainly rip apart the config XML, up to now all the changes have been FULLY backwards compatible with older versions of the config XML, the main reason we want to do this is to allow for multiple configurations of each Ad Provider, then you can cycle between different AdUnits or even provider more than one concurrent House Ad (which will be good for the XBOX version since there is no internet :D)

Don't forget were not completely done with V1 as yet, there are still versions being done for:

- Mono / Monogame
- Windows 8
- Windows Desktop
- XBOX360

These will just be feature ports and we're not adding any more new functionality in, that'll be for V2 (of course if there is a bug raised we'll still fix it if appropriate)

For questions, feedback or to let us know how you're using AdRotator then drop us a line in the discussions on the [codeplex site](http://wp7adrotator.codeplex.com/) or even log an issue!
