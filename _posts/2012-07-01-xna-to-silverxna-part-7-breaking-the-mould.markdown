---
layout: post
title: XNA to SilverXNA-part 7 Breaking the mould
date: 2012-07-01 23:15:29
tags: [silverlight, xna]
---

So far with SilverXNA we have been dealing with a full page approach to rendering our Silverlight page in XNA, it's quick and simple but there is another way.

The Silverlight renderer (UIElementRenderer) is specifically targeted at UI controls it just so happens that most the samples use the Page as the control to render, it is also possible to use different controls as the source for the Silverlight render if you so wish. it is also possible to mix and match if need be but you have to be very careful when doing this.

If you are going to render individual controls or user controls however I would recommend not rendering the entire page, this can overcomplicate drawing, like a wise man said "What is possible is not always right" :D

The reason for this is that there is a single restriction to the Silverlight Renderer, all controls to be rendered MUST be part of the visual tree for the page you are currently on, so you cannot just create a whole load of user controls and just drop them in, they have to play an active part of the current page, you can however add them in programmatically if you so wish.

Another thing to keep in mind if you wander from the full page approach is that you need to position the drawing of the controls manually on the screen, this can be worked around by using full page controls but I wouldn't recommend it.

As usual full source for this chapter can be found [here on Codeplex](http://bit.ly/pYtDi3):

(Please excuse the XAML code sections here, just found out our syntax highlighter doesn't support XAML, so bear with me while I try to find a better work around. Currently looking at SyntaxHighlighter evolved which supposedly will support XAML but it's wordpress only so will need a little magic) \* Update, still working on it but I lost my changes to my version of the highlighter so I need to re-create it or else lose what I currently have working dagnamit!.

Follow along with the series here:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png)[Part 1 - an Overview](https://darkgenesis.zenithmoon.com/?p=366)
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png)[Part 2 - Getting Started](https://darkgenesis.zenithmoon.com/?p=386)
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png)[Part 3 - Adding the first control](https://darkgenesis.zenithmoon.com/?p=406)
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png)[Part 4 - MVVM frameworks and Nuget](https://darkgenesis.zenithmoon.com/?p=420)
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png)[Part 5 - Controls](https://darkgenesis.zenithmoon.com/?p=443)
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png)[Part 6 - Adding Animation](https://darkgenesis.zenithmoon.com/?p=496)
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png)[Part 7 - A different approach](https://darkgenesis.zenithmoon.com/?p=505) (here)

## If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](https://darkgenesis.zenithmoon.com/forums/forum/silverxna/)

---

## Starting Fresh

So as not to break the sample as it stands, lets add a new SilverXNA page to the project and throw some basic stuff in it.

Now the tools (at the time of writing) do not include a template for a SilverXNA page so you'll have to set one up manually or in this case here's one I made earlier, just add a new Landscape or Portrait Windows Phone page (I called mine GamePage2.XAML - Case Sensitive), remove all the template XAML from the XAML file (Just the ContentPanel grid and its contents, leave in the namespace setup) and then replace your XAML.CS code with the following (excusing the fact you need to fix the namespace yourself):

```csharp
using System;
using System.Windows;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;

namespace SilverXNA
{
	public partial class GamePage2 : PhoneApplicationPage
	{
		ContentManager contentManager;
		GameTimer timer;
		SpriteBatch spriteBatch;

		// For rendering the XAML onto a texture
		UIElementRenderer elementRenderer;
		int elementRendererHeight;
		int elementRendererWidth;

		public GamePage2()
		{
			InitializeComponent();

			// Get the content manager from the application
			contentManager = (Application.Current as App).Content;

			// Create a timer for this page
			timer = new GameTimer();
			timer.UpdateInterval = TimeSpan.FromTicks(333333);
			timer.Update += OnUpdate;
			timer.Draw += OnDraw;

			// Use the LayoutUpdate event to know when the page layout
			// has completed so that we can create the UIElementRenderer.
			LayoutUpdated += new EventHandler(GamePage_LayoutUpdated);
		}

		void GamePage_LayoutUpdated(object sender, EventArgs e)
		{
			// Create the UIElementRenderer to draw the XAML page to a texture.

			// Check for 0 because when we navigate away the LayoutUpdate event
			// is raised but ActualWidth and ActualHeight will be 0 in that case.
			if ((ActualWidth > 0) && (ActualHeight > 0))
			{
				SharedGraphicsDeviceManager.Current.PreferredBackBufferWidth = (int)ActualWidth;
				SharedGraphicsDeviceManager.Current.PreferredBackBufferHeight = (int)ActualHeight;

				if ((int)ActualWidth != elementRendererHeight || (int)ActualWidth != elementRendererHeight)
				{
					elementRenderer = new UIElementRenderer(this, (int)ActualWidth, (int)ActualWidth);
					elementRendererHeight = (int)ActualWidth;
					elementRendererWidth = (int)ActualWidth;
				}
			}

			if (null == elementRenderer)
			{
				elementRenderer = new UIElementRenderer(this, (int)ActualWidth, (int)ActualHeight);
			}
		}

		protected override void OnNavigatedTo(NavigationEventArgs e)
		{
			// Set the sharing mode of the graphics device to turn on XNA rendering
			SharedGraphicsDeviceManager.Current.GraphicsDevice.SetSharingMode(true);

			// Create a new SpriteBatch, which can be used to draw textures.
			spriteBatch = new SpriteBatch(SharedGraphicsDeviceManager.Current.GraphicsDevice);

			// TODO: use this.content to load your game content here
			LoadContent();

			// Start the timer
			timer.Start();

			base.OnNavigatedTo(e);
		}

		/// <summary>
		/// LoadContent will be called once per game and is the place to load
		/// all of your content.
		/// </summary>
		void LoadContent()
		{
		}

		protected override void OnNavigatedFrom(NavigationEventArgs e)
		{
			// Stop the timer
			timer.Stop();

			// Set the sharing mode of the graphics device to turn off XNA rendering
			SharedGraphicsDeviceManager.Current.GraphicsDevice.SetSharingMode(false);

			base.OnNavigatedFrom(e);
		}

		/// <summary>
		/// Allows the page to run logic such as updating the world,
		/// checking for collisions, gathering input, and playing audio.
		/// </summary>
		private void OnUpdate(object sender, GameTimerEventArgs e)
		{
		}

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

			// Using the texture from the UIElementRenderer,
			// draw the Silverlight controls to the screen.
			spriteBatch.Draw(elementRenderer.Texture, Vector2.Zero, Color.White);

			spriteBatch.End();
		}
	}
}
```

This gives you the boiler plate code for a full page renderer, so next we'll start pimping this out for our individual control renderer.

Next go back to the "MainPage.XAML" and add another button in Blend (copying the existing one if you wish), alternately just copy the XAML below and replace the grid the existing button is in:

```xml
<Grid x:Name="ContentPanel" Grid.Row="1" Margin="12,0,12,0">
	<Grid.RowDefinitions>
		<RowDefinition Height="0.499*"/>
		<RowDefinition Height="0.501*"/>
	</Grid.RowDefinitions>

	<!--Create a single button to navigate to the second page which is rendered with the XNA Framework-->
	<Button Height="100" Content="Change to game page" Click="Button_Click" VerticalAlignment="Bottom" d:LayoutOverrides="Height" />
	<Button Height="100" Content="Change to second game page" Click="Button2_Click" Grid.Row="1" VerticalAlignment="Top" d:LayoutOverrides="Height" />

</Grid>
```

Then bind the click event to a new function (already done above) and finally in the new page ".cs" file, copy the code from the existing button for the new event and change its target to the new page like this:

```csharp
private void Button2_Click(object sender, RoutedEventArgs e)
{
	NavigationService.Navigate(new Uri("/GamePage2.xaml", UriKind.Relative));
}
```

Running the app now and selecting the second button should take you to a nice new cornflower blue XNA screen, if you see any text or detail you probably forgot to clear out the template XAML.

---

## Just throw down something for show

So Just for a very simple example, we'll add a new grid plus a couple of controls to our new page and change the renderer to only capture this new control.

So add the following XAML to your new page:

```xml
<Grid x:Name="ContentPanel">
	<Grid x:Name="InfoBox" Height="200">
		<Grid.Background>
			<RadialGradientBrush>
				<GradientStop Color="#FF1E3BDE" Offset="1"/>
				<GradientStop Color="#FF98A6F1"/>
			</RadialGradientBrush>
		</Grid.Background>
		<Grid.RowDefinitions>
			<RowDefinition Height="0.46*"/>
			<RowDefinition Height="0.54*"/>
		</Grid.RowDefinitions>
		<Image Margin="0,0,0,-8" Source="/Images/Overlays/you_died.png"/>
		<TextBlock TextWrapping="Wrap" Text="!Sucker!" Grid.Row="1" FontSize="48" TextAlignment="Center"

Foreground="#FF680B0B" FontWeight="Bold"/>
		<Image HorizontalAlignment="Left" Margin="0,0,0,-8" Width="100"/>
	</Grid>
</Grid>
```

Then alter the Silverlight renderer initialisation as follows:

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

		if ((int)InfoBox.ActualHeight != elementRendererHeight || (int)InfoBox.ActualWidth != elementRendererWidth)
		{
			elementRenderer = new UIElementRenderer(InfoBox, (int)InfoBox.ActualWidth, (int)InfoBox.ActualHeight);
			elementRendererHeight = (int)InfoBox.ActualHeight;
			elementRendererWidth = (int)InfoBox.ActualWidth;
		}
	}

	if (null == elementRenderer)
	{
		elementRenderer = new UIElementRenderer(InfoBox, (int)InfoBox.ActualWidth, (int)InfoBox.ActualHeight);
	}
}
```

So we have added a Grid called "InfoBox" (Contained within a standard "ContentPanel" Grid) and then passed this control with its width and height to the renderer for display, note here that on the design page (if you look at it in Blend or in the Visual Studio designer view), the grid appears in the centre of the page, however if you run the game and navigate to the new page you actually get the following:

[![Phone screen with the YOU DIED! overlay and !Sucker! text drawn at the top of the display](/assets/img/wordpress/2012/07/image99.png)](/assets/img/wordpress/2012/07/image99.png)

So what happened?, we designed it in the middle but drew at the top, simple answer because we told it to :D.

If you scroll down to the "onDraw" function you should see this line where we actually draw the texture captured from the Silverlight renderer:

```csharp
// Using the texture from the UIElementRenderer,
// draw the Silverlight controls to the screen.
spriteBatch.Draw(elementRenderer.Texture, Vector2.Zero, Color.White);
```

As you can see the texture we captured which should be of size 480X200 (the dimensions of our grid) and we have drawn it at position 0,0 (Vector2.Zero which is the top left hand corner of the screen).

---

## And now for something more

To make the point in the last section more evident let's add a second control, just an image alone this time and draw it somewhere else, so drop an image (use the "Background.png" image) on to the "ContentPanel" grid and then centre it so it appears on top of the "InfoBox" grid. Make sure you also name the image appropriately, just for fun I named it "RandomImage".

It should end up looking something like this in the designer / Blend:

[![Blend designer view with the info box and overlay placed in the middle of the page](/assets/img/wordpress/2012/07/image100.png)](/assets/img/wordpress/2012/07/image100.png)

Good now let's setup our second Silverlight renderer just like the first, I'd suggest you try this yourself from the descriptions above and then compare, but here's the solution (no peeking :D)

> ![bullet](/assets/img/recovered/2012-06-29-silverlight-and-the-scoreboard-wcf-library-part-2-3-in-the-wcf-wp7-series/028.png) Renderer Properties (in the XAML.cs header)
>
> ```csharp
> UIElementRenderer elementRenderer2;
> int elementRenderer2Height;
> int elementRenderer2Width;
> ```
>
> ![bullet](/assets/img/recovered/2012-06-29-silverlight-and-the-scoreboard-wcf-library-part-2-3-in-the-wcf-wp7-series/028.png) Renderer initialisation (in the layout updated function, to replace the existing set of calls)
>
> ```csharp
> if ((ActualWidth > 0) && (ActualHeight > 0))
> {
> 	SharedGraphicsDeviceManager.Current.PreferredBackBufferWidth = (int)ActualWidth;
> 	SharedGraphicsDeviceManager.Current.PreferredBackBufferHeight = (int)ActualHeight;
>
> 	if ((int)InfoBox.ActualHeight != elementRendererHeight || (int)InfoBox.ActualWidth != elementRendererWidth)
> 	{
> 		elementRenderer = new UIElementRenderer(InfoBox, (int)InfoBox.ActualWidth, (int)InfoBox.ActualHeight);
> 		elementRendererHeight = (int)InfoBox.ActualHeight;
> 		elementRendererWidth = (int)InfoBox.ActualWidth;
> 	}
>
> 	if ((int)RandomImage.ActualHeight != elementRenderer2Height || (int)RandomImage.ActualWidth != elementRenderer2Width)
> 	{
> 		elementRenderer2 = new UIElementRenderer(RandomImage, (int)RandomImage.ActualWidth, (int)RandomImage.ActualHeight);
> 		elementRenderer2Height = (int)RandomImage.ActualHeight;
> 		elementRenderer2Width = (int)RandomImage.ActualWidth;
> 	}
> }
>
> if (null == elementRenderer)
> {
> 	elementRenderer = new UIElementRenderer(InfoBox, (int)InfoBox.ActualWidth, (int)InfoBox.ActualHeight);
> 	elementRenderer2 = new UIElementRenderer(RandomImage, (int)RandomImage.ActualWidth, (int)RandomImage.ActualHeight);
> }
> ```
>
> ![bullet](/assets/img/recovered/2012-06-29-silverlight-and-the-scoreboard-wcf-library-part-2-3-in-the-wcf-wp7-series/028.png) Renderer draw call
>
> ```csharp
> private void OnDraw(object sender, GameTimerEventArgs e)
> {
> 	// Render the Silverlight controls using the UIElementRenderer.
> 	elementRenderer.Render();
> 	elementRenderer2.Render();
>
> 	SharedGraphicsDeviceManager.Current.GraphicsDevice.Clear(Color.CornflowerBlue);
>
> 	// TODO: Add your drawing code here
> 	spriteBatch.Begin();
>
> 	// Using the texture from the UIElementRenderer,
> 	// draw the Silverlight controls to the screen.
> 	spriteBatch.Draw(elementRenderer.Texture, Vector2.Zero, Color.White);
> 	spriteBatch.Draw(elementRenderer2.Texture, Vector2.Zero, Color.White);
>
> 	spriteBatch.End();
> }
> ```

Now if you run the project you will get the following because both textures are being written to the top left hand side of the screen (Vector2.Zero):

[![Phone screen with the white circle texture and the overlay both drawn at the top left](/assets/img/wordpress/2012/07/image101.png)](/assets/img/wordpress/2012/07/image101.png)

So when you are doing individual control based Silverlight rendering it is important to remember that XNA takes control of where to place / size and position the output from the Silverlight renderer. the big advantage of using this method is that you can do post processing on the Silverlight controls before they are rendered to the screen and better integrate them in to 3D environments.

---

## In the end there can only be one (mostly)

(Bet you were expecting a scene from highlander there :D)

Hopefully from this chapter you will have a wider understanding of what is available through the Silverlight Integration with XNA, there are many things to consider should you start using it and I really recommend using it if only to save you burdening yourself with an oppressive UI framework.

As with everything you have many choices, you can use a full page and design everything to orientate from there just overlaying the entire driven page or you can craft and animate it from Silverlight and leave it up to XNA and your graphical framework for where to put it (this might be preferable in some complex 3D scenes, like names over a 3D object) or mix and match (if you do Mix be aware that controls have to be within the visual tree and if placed in sight then they will also render with the full page renderer)

I may follow up with a final article, as I mentioned in my last I did have a snazzy idea for a Dead Space style menu which would be very easy to reproduce with SilverXNA and make it look cool.

### If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](https://darkgenesis.zenithmoon.com/forums/forum/silverxna/)
