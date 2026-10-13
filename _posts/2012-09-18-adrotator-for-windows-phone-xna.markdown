---
layout: post
title: AdRotator for Windows Phone XNA
date: 2012-09-18 16:49:58
tags: [windows phone, adrotator]
---

[![AdRotator icon of two looping arrows on a purple background](/assets/img/wordpress/2012/09/Icon_1_purple_thumb1.png)](/assets/img/wordpress/2012/09/Icon_1_purple.png)[![XNA logo](/assets/img/wordpress/2012/09/image10.png)](/assets/img/wordpress/2012/09/image10.png)

## AdRotator for Windows Phone XNA V0.3 release

Hot on the heels of the [Silverlight article](http://bit.ly/S5CD4T) for [AdRotator](http://wp7adrotator.codeplex.com/) is the documentation for the XNA version, to save repeating myself I'd suggest you read that first to get the general look and feel of AdRotator before continuing. I'm only going to go over the XNA implementation parts in this article.

in some ways the XNA implementation is even easier than Silverlight because we don't have to worry about all the GUI stuff, if you are doing a SilverXNA project (Silverlight / XNA integration) then either route will work fine (or both :D)

---

## Basic Nuts and Bolts

Just like with the Silverlight version, go and download all the binaries from the AdRotator codeplex site and copy them to your project, then add the references to the XNA libraries, you'll notice there are far fewer of them because most don't provide a native API so we have had to use the Web API for those.

Once they are in first you have to initialise the control in the normal XNA "initialise" method:

```csharp
protected override void Initialize()
{
	// TODO: Add your initialization logic here
	AdRotatorXNAComponent.Initialize(this);
	AdRotatorXNAComponent.Current.AdPosition = new Vector2(0, 720);
	AdRotatorXNAComponent.Current.SlidingAdDirection = SlideDirection.Bottom;
	AdRotatorXNAComponent.Current.DefaultSettingsFileUri = "defaultAdSettings.xml";
	AdRotatorXNAComponent.Current.SettingsUrl = "http://adrotator.apphb.com/defaultAdSettingsXNALoc.xml";
	Components.Add(AdRotatorXNAComponent.Current);
	base.Initialize();
}
```

To ensure you also display the Ad in the correct orientation we also recommend hooking up to the "OrientationChanged" event and ensuring that AdRotator is notified, so add the following to the Game Constructor:

```csharp
Window.OrientationChanged += new EventHandler<EventArgs>(Window_OrientationChanged);
```

And then adding the corresponding method with the call to AdRotator:

```csharp
void Window_OrientationChanged(object sender, EventArgs e)
{
	AdRotatorXNAComponent.Current.UpdateAdPostition();
}
```

And that's pretty much it. Just be sure to add the "DefaultAdSettings.xml" config file (or whatever you call it) to the main project **NOT the content project** updating the above initialise logic accordingly, you can even configure the remote URL for the configuration if you so wish (optional).

Easy as Pie

---

## Local House AD

Since XNA is all about textures, your local house ad is just a texture image. Just drop it into your content project and then add the following lines to the above initialisation logic:

```csharp
AdRotatorXNAComponent.Current.DefaultHouseAdImage =
	Content.Load<Texture2D>(@"AdRotator");
AdRotatorXNAComponent.Current.DefaultHouseAdClick +=
	new AdRotatorXNAComponent.DefaultHouseAdClickEventHandler(Current_DefaultHouseAdClick);
```

Just make sure you also add the corresponding "Click" event handler to do what you want when the user clicks on the link, our samples simply do the following:

```csharp
void Current_DefaultHouseAdClick()
{
	try
	{
		MessageBox.Show("You clicked on my Ad, thanks very much");
	}
	catch { }
}
```

But you could just as easy start up a web browser task or a marketplace detail task to show more details about your other games

---

## Remote House Ad

The remote house Ad is just as simple, it'll still use the same "Clicked" event as above (couldn't remove that I'm afraid at the moment) but all you do is host an image on your website and update the XML configuration to point to it.

AdRotator will check the remote image, download it if it's changed and cache it locally and then display it when asked.

In either case the same default rules apply for house Ads, either configure them with a probability or don't and you can use either a local or remote ad or BOTH

---

## XNA couldn't be simpler

As mentioned in the [last post](http://bit.ly/S5CD4T) we're still going to deliver Desktop and XBOX versions of the XNA control (XBOX without web of course just a local Ad, multiple in V2)

No XNA in Win 8 yet so that will be XAML or monogame!

Again **we recommend** at the very least you put [AdDuplex](https://www.adduplex.com/) in your XML configuration, it's FREE and you get exposure everywhere and is accepted at all major and minor outlets just about everywhere, it's great as a primary or just as the fall back position
