---
layout: post
title: XNA to SilverXNA - Part 3 Baby steps and your first control
date: 2012-07-01 21:24:22
tags: [silverlight, xna]
---

Continuing on From [Part 1](https://bit.ly/qgJr56) and [Part 2](https://bit.ly/qrMXIC) of the SilverXNA series, we continue to start doing some actual Silverlight rendering of our own.

[![Platformer game running with the time and score display in the top left corner](/assets/img/wordpress/2012/07/image54.png)](/assets/img/wordpress/2012/07/image54.png)

Now if you compare the image above to the screenshots from the previous parts of this series or if you are running the game on the emulator currently, you may not see much difference, if so Yay I've succeeded.

What may not be immediately apparent is that the Time and Score values have been replaced with Silverlight controls replacing the long section of code in my gamepage for presenting and drawing text.  We're not going to stop there in our series as I'm going to reduce that even further later on but for now baby steps :D.

The finished code for this section will be available as per usual on [Codeplex Here](https://silverxna.codeplex.com/releases/view/72226).

Follow along with the series here:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 1 - an Overview](/?p=366)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 2 - Getting Started](/?p=386)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 3 - Adding the first control](/?p=406) (here)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 4 - MVVM frameworks and Nuget](/?p=420)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 5 - Controls](/?p=443)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 6 - Adding Animation](/?p=496)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 7 - A different approach](/?p=505)

Also [Channel 9](https://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) are running a similar [video series here](https://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) if you prefer videos! :D

## If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](/forums/forum/silverxna/)

* * *

## In preparation for War

If you are getting ready for a battle or some really in depth coding (is there a difference?) it's good to plan things out and get things ready, so too is it true when you want to inject some Silverlight rendering in your SilverXNA project.

Now you might be fooled at this point into thinking "I'm already doing Silverlight, what's this guys problem", well unfortunately that's not true, yes we are rendering an XNA page inside a Silverlight page but really we are still rendering XNA and Silverlight has been shoved in to the corner and told to be quiet.

So now we want to wake up this sleeping behemoth and bring it to the fore front.

To do this we need to setup a Silverlight renderer, what this does is take the Silverlight page our game is running on top of and when requested it asks Silverlight to render (draw) this page to a new texture which XNA can then use to draw to the screen the same as any other image.

So first off we just declare a new "UIElementRenderer" variable to hold our active renderer, place it in the top of the "GamePage.XAML.cs" class just above the constructor:

```csharp
// For rendering the XAML onto a texture
UIElementRenderer elementRenderer;
```

Now as this is the Silverlight renderer and NOT the XNA renderer (remembering they are still separate graphic engines which have their own way of talking to the graphics card for drawing to the screen hence why Silverlight is using the new "Shared Mode" graphics renderer to make this possible), we need to tell the renderer what size page we are drawing in which we also need to check that we are not navigating away from the page to prevent drawing when we don't need to.

So we need to initialise our Silverlight Renderer when the page has finished loading and presenting to the screen, to do this we hook on to the page's "LayoutUpdated" event and then setup the renderer, the advantage of using this event to set up the renderer is that it is also fired when the orientation changes on the device (when the user tilts it) so that the renderer is updated for the new orientation and we don't have to code this twice.

At the end of the constructor add the following event hook up code:

```csharp
// Use the LayoutUpdate event to know when the page layout
// has completed so that we can create the UIElementRenderer.
LayoutUpdated += new EventHandler(GamePage_LayoutUpdated);
```

And then add the respective function for the event handler just after the constructor, thus:

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

So with our Renderer in place all we need to do is to ask it to render the screen to a texture and then get XNA to draw that texture, which is as easy as doing something easy one handed with a glass of your favourite wine in the other hand.

In your "onDraw" function simply add the following before any draw code (this is important because we need the texture from Silverlight before anything else and then in the middle of our SpriteBatch call, we simply draw the texture to the screen like so:

```csharp
/// <summary>
/// Allows the page to draw itself.
/// </summary>
private void OnDraw(object sender, GameTimerEventArgs e)
{
	// Render the Silverlight controls using the UIElementRenderer.
	elementRenderer.Render();

	SharedGraphicsDeviceManager.Current.GraphicsDevice.Clear(Color.CornflowerBlue);

	// TODO: Add your drawing code here
	spriteBatch.Begin();

	level.Draw(e.ElapsedTime, spriteBatch);

	DrawHud();

	// Using the texture from the UIElementRenderer,
	// draw the Silverlight controls to the screen.
	spriteBatch.Draw(elementRenderer.Texture, Vector2.Zero, Color.White);

	spriteBatch.End();
}
```

So we get our rendered Silverlight page texture in to memory and then get ready to draw some XNA stuff by clearing the screen and setting up a new Spritebatch (a SpriteBatch is the performant way in XNA to send lots of 2D textures to the graphic card at once to reduce the number of calls we need to make, XNA does this all automatically for you with a Spritebatch call), then we draw the level as before and setup our HUD and finally draw the texture of our Silverlight page and close the batch, Done.

If you run it now you will see something totally uninspiring,this is simply because the Silverlight page we are rendering is completely blank, good eh! (1 + 0 still equals 1, lol), so let's remedy that next.

* * *

## Crack out the eggs and lets do some blending

now I could just give you a load of XAML to paste into your GamePage to give you something pretty to look at but that wouldn't really be that fun and also you wouldn't be playing round with such a great design tool as Microsoft Expression Blend, it's still good for programmers too can't let all those designers have all the fun.

now if you read one of my previous articles ([here](https://bit.ly/ifJum8)) you should have seen how easy Blend is to use, No really!!

So fire up Blend and open up "GamePage.XAML" from the Projects view/tab, there you will be presented with a blanker than normal Silverlight Phone page as there is literally nothing to see here, not even a top level element on the page (usually called the "Content Grid" by default).:

[![Expression Blend 4 with the SilverXNA project open and an empty GamePage in the designer](/assets/img/wordpress/2012/07/image55.png)](/assets/img/wordpress/2012/07/image55.png)

So we start from nothing, all well and good so lets just replicate the original HUD that we were drawing in XNA :S

To do that we'll place a grid on the screen so we can layout two textboxes in the top left hand corner to replicate the same experience (in a later part we will change this but as stated before, baby steps)

So from here you can either navigate the "Assets" tab or use the "Assets" selection tool on the left hand of the screen shown below and then select the GRID asset:

[![Blend Assets selection tool with the Grid control highlighted](/assets/img/wordpress/2012/07/image56.png)](/assets/img/wordpress/2012/07/image56.png)

Now either drag or double click on the "Grid" icon below the Asset selection tool or on the Assets tab to add the grid to the screen (I'd recommend double clicking as it's easier).

Now use the tool again and select the TexBlock control (you can also search in this window or the Assets tab using the search box at the top of the window), once you have found it simply add two textblocks to the screen and you should see something resembling this:

[![Blend designer with a TextBlock added to the grid](/assets/img/wordpress/2012/07/image57.png)](/assets/img/wordpress/2012/07/image57.png)

The layout is a bit naff at the moment but you should start getting an idea of where we are going.  Now we need to layout these controls on the page and if we use the inbuilt features of the Grid we can do this in a way that is safe for all devices of all screens.

As it's a grid we can add additional rows and columns to the grid to aid layout, so hover your cursor over the grey'ish bar to the left of the window above and you should see a new cursor appear and a line across the grid, this is our grid design tool:

[![Blend designer with a red arrow pointing at the grid row divider](/assets/img/wordpress/2012/07/image58.png)](/assets/img/wordpress/2012/07/image58.png)

Once you have gotten the drawing line just below the textboxes simply left click to create a new Row.

If you don't like where it is hover over the line and your cursor should change, holding down the left mouse button will enable you to drag it.  However if you put down too many then you can double click the line to remove it

Right everything is on the screen now and we can start laying it out and formatting it as we wish.  First off we'll name the two textblocks so we can refer to them later in code, so double click on the first TextBlock to rename it and call it "**TimeLabel"** (case sensitive).

Now if you glance over to the right hand side of the screen (with the textblock you have just renamed selected) you will see the properties pane for that textblock.

You can see it's new name, the colours used on that control, it's visibility, layout and so on.

We're interested in three parts for now, we want to:

- Change the colour of the text in the textblock to Yellow
- Set the correct grid location we want the textblock in
- Apply some margins so it is placed correctly on the screen

So first off  with the foreground brush selected at the top (shouldn't be hard at this point because a Textblock only has one brush :D), set the blue (B) slider to 0 by either dragging the slider across or clicking on the slider and typing 0.

We don't need to worry about the grid positioning as it is already in the place where we want it, so leave the row and column values set to 0.

For the margins we want a left / right and top margin of 12 and set the bottom margin to 0 as indicated by the arrows next to each value in the margins section

Now you should see a Nice bright piece of text in the top left hand corner of the screen, first part done.

Lastly we might as well (just to tidy it up) remove the current value in the Text field on the "Common Properties" section.

[![Blend Properties panel for the TimeLabel TextBlock showing layout and text settings](/assets/img/wordpress/2012/07/image59.png)](/assets/img/wordpress/2012/07/image59.png)

Now repeat the above for the other TextBlock but this time name is as "**Scorelabel**" and set the Grid positioning to Row 1, Column 0.

Hopefully while you were doing this you will have seen the second textbox jump below the first textbox and appear yellow before you removed it's content.  (some people prefer to leave the Text field populated for the design mode, I'll leave that up to you to decide)

* * *

## Well that seemed to do a lot... NOT

If you run the game now you'll get an interesting surprise (well unless you left the text field populated you might see something), nothing actually changed, all that effort and no result at all what a load of cobblers.

Well remember the 1 + 0 = 1 statement, we still haven't populated the Silverlight controls with any values :D

SO back to our code and we need to update (or in this case just replace) our code to Draw the HUD with something to update the Silverlight UI instead of construct the entire thing ourselves.

So replace the current DrawHud() function in "GamePage.XAML.cs" as show below:

```csharp
private void DrawHud()
{
	Microsoft.Xna.Framework.Rectangle titleSafeArea =
SharedGraphicsDeviceManager.Current.GraphicsDevice.Viewport.TitleSafeArea;
	Vector2 hudLocation = new Vector2(titleSafeArea.X, titleSafeArea.Y);
	Vector2 center = new Vector2(titleSafeArea.X + titleSafeArea.Width / 2.0f,
								 titleSafeArea.Y + titleSafeArea.Height / 2.0f);

	// Draw time remaining. Uses modulo division to cause blinking when the
	// player is running out of time.
	string timeString = "TIME: " + level.TimeRemaining.Minutes.ToString("00") + ":"
 + level.TimeRemaining.Seconds.ToString("00");
	Color timeColor;
	if (level.TimeRemaining > WarningTime ||
		level.ReachedExit ||
		(int)level.TimeRemaining.TotalSeconds % 2 == 0)
	{
		timeColor = Color.Yellow;
	}
	else
	{
		timeColor = Color.Red;
	}
	DrawShadowedString(hudFont, timeString, hudLocation, timeColor);

	// Draw score
	float timeHeight = hudFont.MeasureString(timeString).Y;
	DrawShadowedString(hudFont, "SCORE: " + level.Score.ToString(), hudLocation + new Vector2(0.0f, timeHeight * 1.2f)
, Color.Yellow);

	// Determine the status overlay message to show.
	Texture2D status = null;
	if (level.TimeRemaining == TimeSpan.Zero)
	{
		if (level.ReachedExit)
		{
			status = winOverlay;
		}
		else
		{
			status = loseOverlay;
		}
	}
	else if (!level.Player.IsAlive)
	{
		status = diedOverlay;
	}

	if (status != null)
	{
		// Draw status message.
		Vector2 statusSize = new Vector2(status.Width, status.Height);
		spriteBatch.Draw(status, center - statusSize / 2, Color.White);
	}
}
```

With the following (wait for it!!):

```csharp
private void DrawHud()
{
	TimeLabel.Text = "TIME: " + level.TimeRemaining.Minutes.ToString("00") + ":"
+ level.TimeRemaining.Seconds.ToString("00");
	if (level.TimeRemaining > WarningTime ||
		level.ReachedExit ||
		(int)level.TimeRemaining.TotalSeconds % 2 == 0)
	{
		TimeLabel.Foreground = new System.Windows.Media.SolidColorBrush(System.Windows.Media.Colors.Yellow);
	}
	else
	{
		TimeLabel.Foreground = new System.Windows.Media.SolidColorBrush(System.Windows.Media.Colors.Red);
	}

	ScoreLabel.Text = "SCORE: " + level.Score.ToString();
}
```

Now that seems a bit easier doesn't it, we have reduced all the code needed to build our UI to just the part that sets the values.  I have left in the bit of code that makes the text flash once the timer has gotten below a certain threshold for now but we'll move that elsewhere in a later post.

We could go even further and add some shadowed or 3D effects to the text but we're supposed to be taking it slow ;)

As we dive deeper with the SilverXNA integration you'll see the many benefits of using the best of what each has to offer to improve and simplify game development or even to just incorporate some 3D content in your Applications.

* * *

## Baby Step complete

So after all of that we've not changed anything on screen, however thanks to SilverXNA if we were building this from scratch we have made the whole process a lot easier plus now that we have a designer with Expression Blend we don't need to muck around with pixel alignments when placing objects on the screen.

So rest for now and if you are watching the Mango Jumpstart at present (or the recordings) enjoy what Mango has to offer from those who've been tinkering for quite some time now [![Smiley with sunglasses emoticon](/assets/img/wordpress/2012/07/image60.png)](/assets/img/wordpress/2012/07/image60.png)

P.S. Yes I noticed the Gems no longer jump up and down and that's probably because of the compromise I made in regards to which time value it was using, I'll fix that if I get round to it, lol

### If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](/forums/forum/silverxna/)
