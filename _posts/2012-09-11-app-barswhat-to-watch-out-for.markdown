---
layout: post
title: App Bars - What to watch out for
date: 2012-09-11 10:39:56
tags: [windows 8]
---

Quickly following up from my "[Snapped View](http://bit.ly/QCeDr6)" article there was another little caveat I wanted to add, but it also deserved its own little post.

AppBars are Windows 8 version of the good old Application Bar in WP7, similar name just a whole load of more functionality and not as many constraints as WP7 had.

Adding AppBars is also very quick and painless as they are basically just Grids with all the same layout features you'd expect.

Not going to re-iterate over what are already good docs on the subject so you can check out the MSDN article on it and the AppBar sample provided by Microsoft:

- [AppBar Class on MSDN](http://bit.ly/QCiCnB)
- [XAML AppBar control sample](http://bit.ly/QgDvR1)

---

## So why all the fuss

Anyone who knows me know I don't do puff articles that re-iterate what is already documented quite clearly in the manufacturer documentation, so why the post?

Well there are a few other little pieces I found while doing my app that I found useful and had to pass on.

**\*Note**

In the App Labs it was made clear on the correct use of AppBars which isn't exactly shouted about in the documentation or guidelines but if not followed can be a short trip to "rejectedVille".

The **Bottom** AppBar is for actions or commands and must also contain a "HOME" button to leave the page.

The **Top** AppBar is for navigation or states ONLY, if in doubt don't do a Top AppBar just to be safe. If in doubt look at other MS apps using the top bar and follow that. I used it for changing players in game which was only allowed because it was a GAME, but it's a fine line.

---

## The Standard Styles

It's not made quite clear but there are literally hundreds (well more like tens but we're going for sensationalism here :D) of icons provided out of the box that don't even need assets to make them work, these are maintained in the "StandardStyles.XAML" resource dictionary provided by the boilerplate code (if you don't have it see the info on my [last post](http://bit.ly/QCeDr6)).

What is strange is that MS has kept its head on performance and Commented out ALL of these buttons so that only the ones you need are used, for example:

```xml
    <Style x:Key="FavoriteAppBarButtonStyle" TargetType="ButtonBase" BasedOn="{StaticResource AppBarButtonStyle}">
        <Setter Property="AutomationProperties.AutomationId" Value="FavoriteAppBarButton"/>
        <Setter Property="AutomationProperties.Name" Value="Favorite"/>
        <Setter Property="Content" Value="&#xE113;"/>
    </Style>
    <Style x:Key="PhotoAppBarButtonStyle" TargetType="ButtonBase" BasedOn="{StaticResource AppBarButtonStyle}">
        <Setter Property="AutomationProperties.AutomationId" Value="PhotoAppBarButton"/>
        <Setter Property="AutomationProperties.Name" Value="Photo"/>
        <Setter Property="Content" Value="&#xE114;"/>
    </Style>
    <Style x:Key="SettingsAppBarButtonStyle" TargetType="ButtonBase" BasedOn="{StaticResource AppBarButtonStyle}">
        <Setter Property="AutomationProperties.AutomationId" Value="SettingsAppBarButton"/>
        <Setter Property="AutomationProperties.Name" Value="Settings"/>
        <Setter Property="Content" Value="&#xE115;"/>
    </Style>
```

These all have a common "AppBarButtonStyle" which is just a nice flat style with some states to make the buttons light up when clicked.

You'll notice the "Content" values for those buttons are actually tags, these tags refer to a large collection of icons embedded in to the Windows 8 system itself, no need to ship separate image files for each button.

I'd recommend that if you intend to use certain icons in just one page it's easier to just copy the style into the resources section for that page, some might say this is a waste but I found it a lot more maintainable, especially for the next section.

Just be sure to only uncomment styles you intend to use and leave the rest!

---

## But I want to be different

Now the standard buttons are good and especially useful if you want your app quick out the door, but people like me are also picky, so I went searching for more.

In my WP7 days I used to create my own icons from SVG icons source from wonderful sites like [thenounproject.com](http://thenounproject.com/) and the [Metro Studio app from Syncfusion](http://www.syncfusion.com/downloads/metrostudio) then I'd use the following article to convert those SVG icons in to Path data to be used by Blend:

### [http://uxpassion.com/blog/tutorials/how-to-convert-svg-to-xaml-and-use-it-in-silverlight-or-wpf](http://uxpassion.com/blog/tutorials/how-to-convert-svg-to-xaml-and-use-it-in-silverlight-or-wpf)

The trick then came to how to use this in Windows 8, which after a lot of searching (and quite a few dead ends) I came across [Tim Heuer's](http://timheuer.com/blog) great article which spelled it all out.

#### [Using vector data for AppBar icons in XAML](http://timheuer.com/blog/archive/2012/09/03/using-vectors-as-appbar-button-icons.aspx)

in short you create another base style (similar to the AppBarButtonStyle ) thus:

```xml
<Style x:Key="PathBasedAppBarButtonStyle" BasedOn="{StaticResource AppBarButtonStyle}" TargetType="ButtonBase">
	<Setter Property="ContentTemplate">
		<Setter.Value>
			<DataTemplate>
				<Path Width="20" Height="20"
				Stretch="Uniform"
				Fill="{Binding Path=Foreground, RelativeSource={RelativeSource Mode=TemplatedParent}}"
				Data="{Binding Path=Content, RelativeSource={RelativeSource Mode=TemplatedParent}}"/>
			</DataTemplate>
		</Setter.Value>
	</Setter>
</Style>
```

Then for each Button (in this case buttons on the AppBar) just add the following, replacing the "Content" with your own path data and naming the "ID" and "Name" accordingly:

```xml
<Page.BottomAppBar>
	<AppBar>
		<Button Style="{StaticResource PathBasedAppBarButtonStyle}"
		AutomationProperties.Name="Wash" AutomationProperties.AutomationId="WashAppBarButton"
		Content="M9.6803506,4.8474294C10.209365 ... 3.5652149,0z"
		HorizontalAlignment="Right"/>
	</AppBar>
</Page.BottomAppBar>
```

The example just shows a single new button in a bottom app bar.

---

## Watching for the AppBar

If you need to know when the AppBar was opened (in Flipped I would pause the game timer when the bar was opened for example), like the previous article it's fairly simple, just bind to the "Opened" and "Closed" events of your AppBar. Only difference between the ApplicationViewStates in the previous post you have to bind to these in the "Loaded" event, trying to in the other events just didn't work out very well for me.

```csharp
private void pageRoot_Loaded_1(object sender, RoutedEventArgs e)
{
	BottomAppBar.Opened += BottomAppBar_Opened;
	BottomAppBar.Closed += BottomAppBar_Closed;
}
```

If you are using both AppBars you still only have to bind to one as it's the same event, but if you only have one it goes without saying you bind to that one.

---

## Danger Will Robinson

Now in the previous article I talked about "Snapped View" and I did say there was a subtle link between that article and this one and here it is!.

When your App is in Snapped View, your Application bars are still active (granted I never tested with setting the visibility of the AppBar to collapsed but apparently that's not advised!), so what do you do if you DONT want AppBars displayed while paused or showing a static screen!

**\*Note, if you do allow AppBars while in Snapped view, don't forget to alter the design for the AppBar in the snapped view or it will look messy, unlike most things though you will have to guess as Blend does not show a snapped AppBar very well (or even accurate at times)**

Now here's the Rub, no amount of disabling or hiding or manipulation of the AppBar will stop it from appearing, there were a few comments on MSDN Social and Stack Overflow suggesting this, but it won't work!.

The answer (actually thanks for SO for the idea :D) is a bit convoluted but it just works, you have to destroy the AppBar in code, but you make a backup first so you can bring it back, simple.

So create a holding variable for each AppBar thus:

```csharp
static AppBar bottom;
static AppBar top;
```

These are just to hold your backup copies when you don't want AppBars displayed, then in your State Change Detection method (from the last article!), just handle backing up and restoring your AppBar like this:

```csharp
void ApplicationViewStates_CurrentStateChanging(object sender, VisualStateChangedEventArgs e)
{
	if (this.ApplicationViewStates.CurrentState == this.Snapped)
	{
		bottom = BottomAppBar;
		top = TopAppBar;
		BottomAppBar = null;
		TopAppBar = null;
	}
	else
	{
		BottomAppBar = bottom;
		TopAppBar = top;
	}
}
```

This way the instance of your AppBars are preserved and all the style and layout you defined in XAML will still work (I looked at creating AppBars in code and I still have shivers today :S)

---

Right I am definitely stopping for today before My boss notices. But there are still a few more lessons to follow.
