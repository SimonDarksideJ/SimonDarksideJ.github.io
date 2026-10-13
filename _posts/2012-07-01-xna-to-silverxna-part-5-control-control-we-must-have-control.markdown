---
layout: post
title: XNA to SilverXNA-part 5 Control, Control, we must have control
date: 2012-07-01 22:54:48
tags: [silverlight, xna]
---

![yoda toon](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-5-control-control-we-must-have-control/yoda-toon.jpg)

Must admit I had a bit of a Star Wars relapse while thinking about what to call this article, hey I'm only human, supposedly.

So at this point in the SilverXNA series we now have our XNA game running with Silverlight side by side and all's well, but surely we can use a bit more muscle out of this thing, well yes we can.

So in this section we're going to add a few more elements to the game transferred from the XNA project where implementing these controls would be a fair amount of work and doing it in Silverlight is more like a 5 minute job and a bit of design work.  It's all about making our job easier and you don't just have to stop with what I got here.

You may have noticed (actually I didn't until my daughter pointed it out) that we actually lost some of the game in the last article namely the screen overlays for winning, losing and dying, this is because they were implemented in the HUD drawing section of the code originally, my guess is this was done so to centralise all the asset loading or it could have just been tacked on later.  So now we are going to implement these with a bit more flash in Silverlight.

On top of that I'll go over some of the challenges of actually doing this and some firm choices you are going to have to make (can't all be plain sailing!!)

As usual full source for this chapter can be found [here on Codeplex](http://silverxna.codeplex.com/releases/view/72312):

(Please excuse the XAML code sections here, just found out our syntax highlighter doesn't support XAML, so bear with me while I try to find a better work around.  Currently looking at SyntaxHighlighter evolved which supposedly will support XAML but it's wordpress only so will need a little magic) \* Update, still working on it but I lost my changes to my version of the highlighter so I need to re-create it or else lose what I currently have working dagnamit!.

Follow along with the series here:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 1 - an Overview](https://darkgenesis.zenithmoon.com/?p=366)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 2 - Getting Started](https://darkgenesis.zenithmoon.com/?p=386)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 3 - Adding the first control](https://darkgenesis.zenithmoon.com/?p=406)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 4 - MVVM frameworks and Nuget](https://darkgenesis.zenithmoon.com/?p=420)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 5 - Controls](https://darkgenesis.zenithmoon.com/?p=443) (here)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 6 - Adding Animation](https://darkgenesis.zenithmoon.com/?p=496)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 7 - A different approach](https://darkgenesis.zenithmoon.com/?p=505)

## If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](https://darkgenesis.zenithmoon.com/forums/forum/silverxna/)

* * *

## The Sticky Bits

One of the big issues and decisions you will have to face when using Silverlight to render images over the traditional XNA route of using Texture2D's is where to get your assets from,  might sound like a daft question but let me explain.

This come from the small fact that at the time of writing (a little caveat in case this is changed in the future) Silverlight CANNOT access content currently held in the XNA content pipeline.  Not to worry you may think, I'll just have XNA get the assets and pass them to Silverlight to use, however to top this off Silverlight doesn't use XNA textures either so we're left with a few options which all have their own issues:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Move/Copy the asset to the Silverlight project
>
> This is the simplest answer (and the one we'll be using here) but it comes at a sacrifice, the content pipeline does compression of it's assets natively which you don't get in a Silverlight project (just be aware of your asset size!) and if you also need the same image to use in XNA as well then it's going to have to be duplicated in the project.
>
> Also since Silverlight doesn't support picking / spritesheets, each image has to be separate.
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Use the Content pipeline to read the asset as a texture and write a converter to expose it as a Bitmap for Silverlight
>
> This is probably the most intensive operation to use, granted Silverlight doesn't refresh the image as often as XNA does (as it caches images to the screen) but it's going to be costly especially if the images are rather large (which you should avoid on mobile anyway).  This simply means writing an extension method or other function to read in the XNA Texture2D, convert it to JPEG using the in built XNA functions and then construct either a WritableBitmap or BitmapImage from the resultant JPEG memory stream (you can also do it by hand by manipulating the memory array of the image)
>
> I've use this previously for a [Picture effect sample](/blogs/darkgenesis/archive/2010/09/17/pictures-barcodes-and-effects-oh-my.aspx) and it does work but it is heavy loading especially if you have a lot of these images on screen.
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Write a custom Content Importer to allow reading the asset as a Bitmap/PNG/Jpeg
>
> This would be a more efficient way of doing the same as the above but you run into similar issues as the first, if you use the image both in Silverlight and XNA you are going to need the same image twice, which also hampers the XNA project because both won't be able to have the same asset name (not really a problem but worth pointing out) also you would need to add libraries to the content project that would not be available in a standard XNA project so be warned, it sounds nice in theory considering the extensibility of the content pipeline but untold issues are likely to unfold.

So as stated above (and because they are only used in one place in this project) we are going to just move the three assets lock stock and barrel over to the Silverlight project.  I could also create a new Asset project to mimic the way the XNA content pipeline separation but I'm more interested in showing the functionality here, KISS

It's a good point to make here that this leads you to think about how your assets are managed in any project from a design point, if your assets are for the 3D portion of the game place them in the content pipeline, if they are for UI keep them in Silverlight, but understand the difference between the UI portion of your game which may include interactivity and the visual elements which are generally just for show.

* * *

## Assets First

Put simply, get your assets out of the car and on to that train right now!

Thankfully Visual Studio makes this a snap, just Right-click in the Silverlight project and create a new folder called "Images", it's always good to group images under one folder so as not to clog up your project,  some may even make an Assets folder for all content or even make a completely separate project.

Now drag over the "Overlays" folder from the Content project to the "Images" folder in the Silverlight project and then delete the old "Overlays" folder (just for good measure) in the content project.

Next select each image file and change the "Build Action" in the properties window to "Content".  If you don't do this the image will not be available for the UI to use, don't ask why it's just how it's done!, :D

Finally make sure you clean up the old code in the "GamePage.XAML" to remove the old references to the Texture2D versions of the overlay assets (properties and Load Content), else you will get a nasty surprise when you try and run the game).

Done, right then let's continue!

* * *

## Blending right in

The last section was so short you'd wonder why I bothered making it a section, well truth be told I'm a neat and tidy person (you can also hear the wife's screams of laughter at that one) in general, the last was in VS now lets move over to Blend.

Launch up Blend if you haven't already and open up the "GamePage.XAML" page, next find the images control in the asset library (in case you've forgotten how to do that just check the last article we're not into free lunches here :D) and add three Image controls onto our page, just make sure you have the "Content Panel" selected in the Visual tree first!!!! don't want these images just going anywhere.  Name the Image controls "WinOverlay", "LoseOverlay" and "DiedOverlay" just to match the names they had previously.

Next we just need to set up their properties as follows:

> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Set the RowSpan and ColumnSpan to "2"
>
> Allows the control to spread across the entire grid
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Set the Horizontal and Vertical Alignment to Stretch
>
> Allows the control to stretch across the entire space it's been given
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Reset margins using the "Advanced Options"
>
> Click box next to margins and select "Reset", or you can play with the margins yourself
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Select the correct image for each overlay
>
> "you_win.png" for the WinOverlay for example
>
> ![bullet](/assets/img/recovered/2012-06-29-intermission-6-more-meat-on-the-bone/033.png)    Set the visibility to "Collapsed"
>
> So it won't show on the screen at startup

Now Save and Build your project so we can return to studio and complete the training (If you ever find you cannot reference a control on a Silverlight page it's only ever because you either haven't named it or built the package recently, new control won't appear until the project has been built at least once.

* * *

## The Easy Way

There's the right way and there's the easy way (well there is also the bad and worst ways but who's counting), for now we'll start with easy and then progress with the right way here.

Now to keep things clear I've added a new function rather than embed the code in the Draw loop for controlling which overlay is shown at the correct time, this will just make it easier to rip out later with minimal impact.  You might question why to add this to the "Draw" function and not the "Update" and that's because we are altering what  is going to be draw from the Silverlight page, which can only be updated between draw calls, if you are already familiar with XNA you might question this logic however remember that update (in most games) can be called multiple times per frame to account for all the logic that goes on while the screen is always drawn to in fixed steps and in Silverlight things only change on screen each time it is drawn, also with Silverlight you want to limit how much you draw!

So let's add the following function:

```csharp
private void CheckGameState()
{
	if (vm.GameLevel.TimeRemaining == TimeSpan.Zero)
	{
		if (vm.GameLevel.ReachedExit)
		{
			WinOverlay.Visibility = System.Windows.Visibility.Visible;
		}
		else
		{
			LoseOverlay.Visibility = System.Windows.Visibility.Visible;
		}
	}
	else if (!vm.GameLevel.Player.IsAlive)
	{
		DiedOverlay.Visibility = System.Windows.Visibility.Visible;
	}
	else
	{
		WinOverlay.Visibility = System.Windows.Visibility.Collapsed;
		LoseOverlay.Visibility = System.Windows.Visibility.Collapsed;
		DiedOverlay.Visibility = System.Windows.Visibility.Collapsed;
	}

}
```

All this does is loop through all the states relevant for drawing the correct overlay and then updating the controls appropriately remembering to reset them all if no conditions exist.  this is not exactly efficient where Silverlight is concerned but we will come back to that later.

Next we need to call the new function BEFORE we call the Silverlight renderer that way we tell Silverlight to enable the overlays before it generates the texture using the  ".Render()" call.  In this case it actually doesn't matter where you call it in the draw loop as it will take effect in the next frame if you put it after the Render, but it's good practice to update Silverlight BEFORE rendering it.

So our "onDraw" function now looks like this:

```csharp
/// <summary>
/// Allows the page to draw itself.
/// </summary>
private void OnDraw(object sender, GameTimerEventArgs e)
{
	CheckGameState();

	// Render the Silverlight controls using the UIElementRenderer.
	elementRenderer.Render();

	SharedGraphicsDeviceManager.Current.GraphicsDevice.Clear(Color.CornflowerBlue);

	// TODO: Add your drawing code here
	spriteBatch.Begin();

	vm.GameLevel.Draw(e.ElapsedTime, spriteBatch);

	// Using the texture from the UIElementRenderer,
	// draw the Silverlight controls to the screen.
	spriteBatch.Draw(elementRenderer.Texture, Vector2.Zero, Color.White);

	spriteBatch.End();
}
```

Done, now run your game and see what wonders we have now implemented.

[![Game screen mid transition with the You Lose overlay partly covering the level](/assets/img/wordpress/2012/07/image67.png)](/assets/img/wordpress/2012/07/image67.png)

* * *

## BUGS, BUGS, We got BUGS over here!!!

![starship troopers](https://web.archive.org/web/20130505193904im_/http://thereelseal.files.wordpress.com/2011/08/starship_troopers.jpg)

Sorry couldn't resist that one :D and it's fun romp of a film as well if you don't take i's background seriously.

So what happened, we've implemented everything as per the MSDN docs and samples have done, so what's gone wrong?, the answer is frighteningly simple.

If you look back through the code you will find this section which is responsible for setting up the render and graphics card ready for drawing:

```csharp
void GamePage_LayoutUpdated(object sender, EventArgs e)
{
	// Create the UIElementRenderer to draw the XAML page to a texture.

	// Check for 0 because when we navigate away the LayoutUpdate event
	// is raised but ActualWidth and ActualHeight will be 0 in that case.
	if ((ActualWidth > 0) && (ActualHeight > 0))
	{
		SharedGraphicsDeviceManager.Current.PreferredBackBufferWidth = (int)ActualWidth;
		SharedGraphicsDeviceManager.Current.PreferredBackBufferHeight = (int)ActualHeight;
	}

	if (null == elementRenderer)
	{
		elementRenderer = new UIElementRenderer(this, (int)ActualWidth, (int)ActualHeight);
	}
}
```

If you follow this through, when the page launches there is no renderer and the screen is full screen so it sets the Graphics card width and height to match the screen and then it proceeds it initialise the renderer, which seems fine.

The problems occurs in that the previous page we came from was in Portrait Mode and when the page launches it hasn't been orientated yet so the Silverlight Engine is still in Portrait so the renderer and graphics card is setup for portrait.  When the page is finally loaded (before it's presented to the screen) it is only then it is finally in the mode we requested "Landscape".  Well fine I hear you say because we hooked this up to the "Layout Changed" event and sure enough it is called again after this point, the problem is that while the graphics card is then orientated correctly, the renderer has already been initialised in Portrait mode and hence is not then corrected to the new orientation.

Two ways to resolve this, one is just to factor this in and sort out our code or you can alternately use a [custom library](http://bit.ly/oTBvCp) written by Nick "Fire and Brimstone" Gravelyn of the XNA team for just such situations where full screen rendering is required (actually it could be customised for other situations but that's just how he has wrote it for now), [check it out here](http://bit.ly/oTBvCp).

In both cases we just need to account for the screen resolution change and update the renderer appropriately thus:

```csharp
void GamePage_LayoutUpdated(object sender, EventArgs e)
{
	// Create the UIElementRenderer to draw the XAML page to a texture.

	// Check for 0 because when we navigate away the LayoutUpdate event
	// is raised but ActualWidth and ActualHeight will be 0 in that case.
	if ((ActualWidth > 0) && (ActualHeight > 0))
	{
		SharedGraphicsDeviceManager.Current.PreferredBackBufferWidth = (int)ActualWidth;
		SharedGraphicsDeviceManager.Current.PreferredBackBufferHeight = (int)ActualHeight;

		if ((int)ActualHeight != elementRendererHeight || (int)ActualWidth != elementRendererWidth)
		{
			elementRenderer = new UIElementRenderer(this, (int)ActualWidth, (int)ActualHeight);
			elementRendererHeight = (int)ActualHeight;
			elementRendererWidth = (int)ActualWidth;
		}
	}

	if (null == elementRenderer)
	{
		elementRenderer = new UIElementRenderer(this, (int)ActualWidth, (int)ActualHeight);
	}
}
```

Here I've just added two new integer properties (make sure you add them in the top of the class) and use them to track the size of the renderer and if there is a miss-match then I re-initialise the renderer (Nicks code does the same but with a little added flare).  What I do find odd is that if you add a breakpoint in the above code and inspect the UIElementRenderer class you will find it already has height and width properties but they are not public forcing us to implement our own, very odd that.

Now when you run the code we will have a replica of what the game looked like original (albeit with stationary gems, still haven't fixed that yet, lol)

[![You Lose overlay with the text Press JUMP to Continue](/assets/img/wordpress/2012/07/image68.png)](/assets/img/wordpress/2012/07/image68.png)

* * *

## The Wright way (pun intended)

If you remember from the last article on MVVM, in Silverlight it's best not to directly access controls on a page, better that you use a ViewModel to hook-up your code to the view in-directly (If you skipped over the last episode, might as well skip this section), the other advantage over what we are doing above is that we only tell the screen to update when values have changed, if it's the same (as it can be several times in our XNA code) then we don't bother informing the view, less is more.

With everything already in place I would recommend at having a go at this yourself this time, go ahead and try it then return here to compare.

For those of you tackling the challenge in your head or returning, here's how I would do it.

As with any other Data Binding scenario, we simply need a property in our ViewModel implementing iNotifyPropertyChanged and the correct property databound in the XAML, not forgetting to update the ViewModel property form your code as well of course if need be, which in this case I won't be doing, read on.

As with any implementation there are multiple ways to achieve your goal and this is no different, you could replicate one to one what we have already having three separate image controls managed by three separate properties and updating / disabling the correct one's depending on the state, as I said one way.  A better way would be to have just ONE image control and have it updated depending on the conditions of the game.

Either approach has its advantages and disadvantages, the second one is quick and easy, has less code and is managed in one place. Although having three separate images means you could have more variation on how you want each state displayed/animated on the screen.

To keep things simple I'm going to do the first approach, not necessarily because it's better but really because it's KISS, have a go at the second if you wish and see how it turns out.

So first let's add a new property for each image to control its visibility, thus:

```csharp
/// <summary>
/// The <see cref="WinOverlayVisibility"> property's name.
/// </see></summary>
public const string WinOverlayVisibilityPropertyName = "WinOverlayVisibility";

private Visibility _winOverlayVisibility = Visibility.Collapsed;

/// <summary>
/// Gets the WinOverlayVisibility property.
/// TODO Update documentation:
/// Changes to that property's value raise the PropertyChanged event.
/// This property's value is broadcasted by the Messenger's default instance when it changes.
/// </summary>
public Visibility WinOverlayVisibility
{
	get
	{
		return _winOverlayVisibility;
	}

	set
	{
		if (_winOverlayVisibility == value)
		{
			return;
		}

		var oldValue = _winOverlayVisibility;
		_winOverlayVisibility = value;

		// Update bindings, no broadcast
		RaisePropertyChanged(WinOverlayVisibilityPropertyName);
	}
}
```

As usual fix up the references, if you were doing it manually you made need to sort out the references to "System.Windows" first else the MVVM code snippet tends to get confused.  Repeat this for the other two image visibility properties.

Next we need to bind the visibility of the images to the ViewModel property, thankfully with all the ground work done this is very simple, just add/replace the following to the image control in the XAML:

```csharp
Visibility="{Binding WinOverlayVisibility}"
```

Lastly we need to update the VIewModel to tell it when to change the relevant values, now instead of doing this in the XNA code we are going to move it completely to the VIewModel, this leverages even more off the fact that the UI should be in the View side of the code while the logic is done in the game, UI separation.  At the end of the day it's down to the UI/UX designer how UI should be presented to the screen (this does take some getting used to coming from XNA land)

The visibility of each of these images is controlled by time, so we will just add the control code to our display of the time, granted dying is not time related but there is much to be said for keeping it in one place but as I've said before if I had built this from scratch I would have taken different design decisions with Silverlight/MVVM in mind.

So we will update the ViewModel Property for GameTime to this:

```csharp
/// <summary>
/// The <see cref="GameTime"> property's name.
/// </see></summary>
public const string GameTimePropertyName = "GameTime";

private TimeSpan _gameTime = new TimeSpan();

/// <summary>
/// Gets the GameTime property.
/// TODO Update documentation:
/// Changes to that property's value raise the PropertyChanged event.
/// This property's value is broadcasted by the Messenger's default instance when it changes.
/// </summary>
public TimeSpan GameTime
{
	get
	{
		return _gameTime;
	}

	set
	{
		if (_gameTime == value)
		{
			return;
		}

		var oldValue = _gameTime;
		_gameTime = value;

		// Update bindings, no broadcast
		RaisePropertyChanged(GameTimePropertyName);
		RaisePropertyChanged(GameTimeStringPropertyName);

		if (GameLevel.TimeRemaining > WarningTime ||
			GameLevel.ReachedExit ||
			(int)GameLevel.TimeRemaining.TotalSeconds % 2 == 0)
		{
			GameTimeDisplayColor = YellowBrush;
		}
		else
		{
			GameTimeDisplayColor = RedBrush;
		}

		if (GameLevel.TimeRemaining == TimeSpan.Zero)
		{
			if (GameLevel.ReachedExit)
			{
				WinOverlayVisibility = System.Windows.Visibility.Visible;
			}
			else
			{
				LoseOverlayVisibility = System.Windows.Visibility.Visible;
			}
		}
		else if (!GameLevel.Player.IsAlive)
		{
			DiedOverlayVisibility = System.Windows.Visibility.Visible;
		}
		else
		{
			WinOverlayVisibility = System.Windows.Visibility.Collapsed;
			LoseOverlayVisibility = System.Windows.Visibility.Collapsed;
			DiedOverlayVisibility = System.Windows.Visibility.Collapsed;
		}
	}
}
```

After that's in just remove the code added previous sections from the GamePage.XAML and you're done.

Word to the wise, if for some reason when you run the project and the overlay's don't appear, then check your binding statements, "Cut and Paste" syndrome is always a funny one to diagnose, lol.

* * *

## Convertors

This section is just a bit of a heads up really in your Silverlight adventures, in the previous section we are using a property of the same type as the property on the control we are updating, in this case the Visibility property which takes the type Visibility.

However (especially in XNA) things don't work like that, we work with booleans, on or off which is in contradiction to the Visibility type needed by Silverlight, so you might end up using Silverlight types in your XNA code or writing some bespoke code to translate it for you.  However Silverlight does have the answer to this kind of situation which is also useful for any situation where you want to change what is seen in a control from a property, these are Convertors.

I'm not going to go into in length here but rather point out Shawn Wildermuths's [Phoney Tools library](http://phoney.codeplex.com) and the [Coding4FunLibrary](http://coding4fun.codeplex.com) which come with a lot of these convertors ready for use with full documentation on how to use them.

In the case above we would have made the OverlayVisibility properties into Booleans so that our XNA code could just enable or disable them, then when you bound to the property you would also specify the convertor to be used so the control knew which value to be used based on the current setting of the property, in this case the Boolean to Visibility converter (true in Visible out, etc).

Just something to keep in mind, the above example is just a basic convertor but there are many other possibilities with them.

* * *

## User Controls

Now if you like components in XNA, this should be right down your street, if you don't know what they are or haven't then stop what you're doing and go back to class :D.  Well not really but you get the picture.

Components in XNA let you build re-usable game components that can be solely just for logic or can also draw to the screen (it's what traditionally is used for HUDs and permanent processes like Physics in XNA), they are bound to the game class and are called automatically by the framework so you never need to worry about them, they just work.

Now granted we don't have components in SilverXNA (they were re-introduced in native XNA with Mango) but you can implement your own if you wish simulating the component system, there's a good article on the AppHub for doing solely this.

You might wonder why I bring this up since we are talking SilverXNA not XNA per-se, well in Silverlight we also have a re-usable component system called User Controls, in short you can build your own little control which you can then re-use as much as you like throughout your app/game, this is especially handy for complex views that need to be re-used a lot.

Setting up user Controls couldn't be easier, you can either create them fresh by right clicking on your project and clicking on "Add new" then selecting "User Control" in the wizard under "Silverlight for Windows Phone" or my preferred way, add the controls to your current screen (which helps with the layout) in the way you want then select all of them and right-clicking on the screen and selecting "Make into User Control" which does exactly what it says on the tin (pretty much the same as "extract method" in Visual Studio, it makes a new User control with the selected components and replaces it on the original page with the new control for you.

So let's do this now with the Image control we added for the "WinOverlay":

[![Expression Blend context menu with Make Into UserControl selected for the WinOverlay element](/assets/img/wordpress/2012/07/image69.png)](/assets/img/wordpress/2012/07/image69.png)

Yes there is an option to make it into a fully fledged control but I tend not to use this because of the constraints imposed on it (plus that's what my teacher told me, lol), first it will ask you what you want to call the new control as shown below:

[![Make Into UserControl dialog with the name WinOverlayControl](/assets/img/wordpress/2012/07/image70.png)](/assets/img/wordpress/2012/07/image70.png)

Which will then give you a new User Control Page view with just our image in it:

[![Expression Blend showing the new WinOverlayControl with the You Win overlay](/assets/img/wordpress/2012/07/image71.png)](/assets/img/wordpress/2012/07/image71.png)

Now if you were directly referencing the old image control from code as we were doing before then you would have just broken the project because the original Image control is now embedded within our new user control, but because we are now using Data Binding everything is fine.  Now if we were being clever I would have made it so that this user control could display any of the three states as mentioned earlier, but in keeping it simple we'll just convert each of them independently, so go and do that now if you wish.

To finish up properly though we should **move** the data binding from the Image control contained inside our new user control to the user control reference itself in your GamePage.XAML, so that it ends up like this:

```xml
<phone:PhoneApplicationPage
    x:Class="SilverXNA.GamePage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:phone="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone"
    xmlns:shell="clr-namespace:Microsoft.Phone.Shell;assembly=Microsoft.Phone"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    FontFamily="{StaticResource PhoneFontFamilyNormal}"
    FontSize="{StaticResource PhoneFontSizeNormal}"
    Foreground="{StaticResource PhoneForegroundBrush}"
    SupportedOrientations="Landscape" Orientation="Landscape"
    mc:Ignorable="d" d:DesignHeight="480" d:DesignWidth="800"
    shell:SystemTray.IsVisible="False"
	DataContext="{Binding Game, Source={StaticResource Locator}}">

	<Grid x:Name="ContentPanel">
		<Grid.ColumnDefinitions>
			<ColumnDefinition Width="0.1*" />
			<ColumnDefinition Width="0.9*" />
		</Grid.ColumnDefinitions>
		<Grid.RowDefinitions>
			<RowDefinition Height="0.083*" />
			<RowDefinition Height="0.917*" />
		</Grid.RowDefinitions>
		<TextBlock x:Name="TimeLabel"
				   Text="Time Left: "
				   Foreground="{Binding GameTimeDisplayColor}"
				   TextWrapping="Wrap"
				   Margin="12,12,20,0"
				   d:LayoutOverrides="Width, Height" />
		<TextBlock x:Name="TimeValue"
				   Text="{Binding GameTimeString}"
				   Foreground="{Binding GameTimeDisplayColor}"
				   TextWrapping="Wrap"
				   Margin="12,12,20,0"
				   d:LayoutOverrides="Width, Height"
				   Grid.Column="1" />
		<TextBlock x:Name="ScoreLabel"
				   Text="Score: "
				   HorizontalAlignment="Left"
				   TextWrapping="Wrap"
				   Margin="12,12,0,0"
				   d:LayoutOverrides="Height"
				   Foreground="Yellow"
				   Grid.Row="1" />
		<TextBlock x:Name="ScoreValue"
				   Text="{Binding GameScore}"
				   HorizontalAlignment="Left"
				   TextWrapping="Wrap"
				   Margin="12,12,0,0"
				   Foreground="Yellow"
				   Grid.Row="1"
				   d:LayoutOverrides="Height"
				   Grid.Column="1" />
	</Grid>

	<!--No XAML content is required as the page is rendered entirely with the XNA Framework-->

</phone:PhoneApplicationPage>
```

Now you might ask why go through all this hassle, they were fine as they were, since we have our new control we can mess around with its layout within its bounds as much as we like without having to depend on how it's placed in the game page, no need to add extra grid placements sort out layout and all that in relation to all the other controls on the page, it's all self contained.

Feel free to play around of the contents of this new control yourself, I'm not going to do this here as this section is already getting a bit long. One solution you can try is to fix a problem with the way the project is now, since the game is using just an image to display the overlays we lose the ability to translate the text to any other language, you should never use images for text unless you really really need to, with XNA this was just a lot easier and smarter than using spritefonts which can be a pain.

So as a bit of homework, do away with the original image and play around add adding some textblocks with the same text, add some images for showing a Win, Lose or death (as shown below) and play with the formatting / fonts / style and adding a graphic such as below to spruce it up:

| [![Cartoon character in a pose used for the Win overlay](/assets/img/wordpress/2012/07/image72.png)](/assets/img/wordpress/2012/07/image72.png) | [![Cartoon character standing in a hat, used for the Lose overlay](/assets/img/wordpress/2012/07/image73.png)](/assets/img/wordpress/2012/07/image73.png) | [![Cartoon character lying on the ground, used for the Die overlay](/assets/img/wordpress/2012/07/image74.png)](/assets/img/wordpress/2012/07/image74.png) |
|---|---|---|
| Win | Lose | Die |

As this is now a control and not individual elements on the game screen you can tinker as much as you like without breaking it's placement on the game screen or any other control on that page, here what you do is isolated to just this control, go wild and see what you can come up with in this playground.

* * *

## Overflow Warning

Now I original intended to carry on to do Animation as part of this chapter but as it's already so long I have decided to break here for now, the next chapter will now cover Silverlight animation in an XNA world to really so off it's advantages for our games, or apps for that matter I'm not an app'ist :D

So I've left you with a bit of homework to challenge you on your own.

### If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](https://darkgenesis.zenithmoon.com/forums/forum/silverxna/)

Seeya!
