---
layout: post
title: XNA to SilverXNA - Part 2 Getting our XNA project running in Silverlight
date: 2012-07-01 21:18:55
tags: [silverlight, xna]
---

In [Part 1](http://xna-uk.net/blogs/darkgenesis/archive/2011/08/21/xna-to-silverxna-part-1-an-overview.aspx) I went over some of the things you'll need to do to get your current XNA project ready for use in the Silverlight XNA integration which I've dubbed as SilverXNA for this tutorial series.

Today I'm going to walk you through this by migrating the [Platformer Sample](http://create.msdn.com/en-US/education/catalog/sample/platformer) from the AppHub Educational content into a new SilverXNA project.

If you want to read more about what happens under the covers between the Silverlight and XNA frameworks you can read one of my [previous posts here](http://xna-uk.net/blogs/darkgenesis/archive/2011/05/25/silverlight-amp-xna-a-tale-of-two-cities.aspx), mostly technical stuff and a Silverlight primer for XNA devs.

I'm endeavouring to keep this tutorial open to all levels of devs, so if some of the instructions are a bit basic for you, just skim read them as needed (just pay attention :D)

Full source for the completed project can be found [here on codeplex](http://silverxna.codeplex.com/releases/view/72220)

[![Windows Phone emulator running the Platformer game in landscape](/assets/img/wordpress/2012/07/image_thumb47.png)](/assets/img/wordpress/2012/07/image44.jpg)

The main focus of this chapter is to just get us running and the problems I've faced in getting this to just run, nothing fancy just simple baby steps to show off the impact of the changes were going to make later.

Now if you are converting your own project along side me with this tutorial, make sure you have read through [Part one](http://xna-uk.net/blogs/darkgenesis/archive/2011/08/21/xna-to-silverxna-part-1-an-overview.aspx) and got a heads up of the main impacts to your project.

Follow along with the series here:

> - [Part 1 - an Overview](http://darkgenesis.zenithmoon.com/?p=366)
>
> - [Part 2 - Getting Started](http://darkgenesis.zenithmoon.com/?p=386) (here)
>
> - [Part 3 - Adding the first control](http://darkgenesis.zenithmoon.com/?p=406)
>
> - [Part 4 - MVVM frameworks and Nuget](http://darkgenesis.zenithmoon.com/?p=420)
>
> - [Part 5 - Controls](http://darkgenesis.zenithmoon.com/?p=443)
>
> - [Part 6 - Adding Animation](http://darkgenesis.zenithmoon.com/?p=496)
>
> - [Part 7 - A different approach](http://darkgenesis.zenithmoon.com/?p=505)

Also [Channel 9](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) are running a similar [video series here](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) if you prefer videos! :D

## If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/)

---

## Lets get the new project started

So keeping it simple we'll create a new SilverXNA project, thankfully in the latest Beta 2 phase of the tools they have fixed one of my pet peeves where the Silverlight version of the "Windows Phone Rich Graphics Application" and the XNA "Windows Phone Silverlight and XNA application" which was that the two projects were completely different and in fact one of them didn't work out of the box. (you can read more about [this here](http://xna-uk.net/blogs/darkgenesis/archive/2011/05/24/multi-targeting-with-windows-phone-7-mango-tools.aspx), in fact the Rich Graphics app used to be the XNA project and the Silverlight one was called a "Windows Phone 3D graphics application" :) ), so that's sorted now but if you compare the two projects there are subtle differences, why they are not the same project for both with the same name is beyond anyone's guess.

So now it doesn't matter which one you pick as they are both effectively the same so just pick the one nearest to you (I used the XNA version when prepping for this tutorial series and am now using the Silverlight one for the sample project :D)

[![Visual Studio New Project dialog with the Windows Phone Rich Graphics Application template selected](/assets/img/wordpress/2012/07/image47.png)](/assets/img/wordpress/2012/07/image47.png)

Once you have got it setup you should see the new SilverXNA solution with its three projects, A Silverlight C# project(if you chose C# that is, if you are running VB then it'll obviously be VB, but this tutorial is written for C# so you'll just have to follow along and convert in your head, the same tricks will work through), an XNA game library (the bridge between Silverlight and XNA) and the XNA Content Project.

If you run this now you'll get the two new starter screens:

|   |   |
| --- | --- |
| [![Emulator showing the Main Page with a Change to game page button](/assets/img/wordpress/2012/07/image48.png)](/assets/img/wordpress/2012/07/image48.png) | [![Emulator showing the Game Page as a plain blue screen](/assets/img/wordpress/2012/07/image49.png)](/assets/img/wordpress/2012/07/image49.png) |
| Main Page (Start) | Game Page |

Nothing spectacular but it does give us a chance to see a good old clean Cornflower Blue page again :D.

---

## Bringing in the Rain

So with our new project setup, first thing we need to do is bring in our XNA game project with a twist. make sure you have downloaded the [Platformer sample](http://create.msdn.com/downloads/?id=535&filename=Platformer_4_0.zip) from the AppHub first and have it unpacked somewhere.

First remove the "Content" project as we are going to be using the one from our XNA game project, next right click on the Solution and select "Add -> New Project" then select from the XNA branch of the New Project wizard the "Windows Phone Game Library (4.0)" project, name it something appropriate as this is were we are going to copy the Platformer code to (I used PlatformerGameLibrary).

[![Visual Studio Add New Project dialog with the Windows Phone Game Library template and the name PlatformerGameLibrary](/assets/img/wordpress/2012/07/image50.png)](/assets/img/wordpress/2012/07/image50.png)

Next Right-Click on the new PlatformerGameLibrary project and select "Add -> Existing Item" which will pop up the File Browse wizard and navigate to the folder where the Platformer sample game code is located, this is key especially if you want to maintain a multi-platform project where we want to share code.

Now select all the ".CS" files with the exception of the "Program.cs" and "Platformergame.cs". We need to manage in the code from the game.cs file so it fits properly with the new SilverXNA project plus we don't want it interfering with the build, as for the Program.CS file Windows Phone doesn't even use the

If you just want a separate SilverXNA project in which case just copy the code directly into your new library or even the existing library that came with the solution and skip the previous step.

Next Right click the Solution and select "Add -> Existing Project" and browse to the location of the Platformer sample Content folder, then select the content project there. You should now end up with the following:

[![Solution Explorer showing the Content, PlatformerGameLibrary, SilverXNA and SilverXNALib projects](/assets/img/wordpress/2012/07/image51.png)](/assets/img/wordpress/2012/07/image51.png)

So our project is now made up of:

> - The Content project from our existing XNA solution unchanged (although make sure it's a phone variation of the Content project with assets resized and compressed appropriately using the same asset names as its XBOX / PC counterpart if you have one)
>
> - The unmodified code (we'll soon change that) from our original XNA game project
>
> - The Silverlight page project for our solution, we should always endeavour to only put Silverlight specific functionality or presentation in here to keep consistency with other platforms
>
> - The default XNA Game library that came with our solution. You could quite happily remove this at this point but I have kept it in for now (just in case :D), if you are just building a SilverXNA project and not worried about consistency across platforms then feel free to just use this for all your game logic and XNA drawing code.

---

## And now comes the Breaking

At this point we have pure XNA code in a Silverlight project, so not only will it not run it won't even compile....

Now if you are doing your own project you should have already done the prerequisites to your project from the instructions in Part 1 but I'm going to re-iterate through them here for the Platformer sample.

> - References
>
> First off tidy up the references and add the ones we require for each project:
>
> - Reference the Content Project from the SilverXNA (main project link library) project
> - Reference the PlatformerGameLibrary project from the Main Silverlight Project
> - Add a reference to "Microsoft.Phone.Sensors" to the PlatformerGameLibrary project (as we are using the accelerometer)
> - Add a reference to "Microsoft.Phone" to the PlatformerGameLibrary project (as we are using the some native APIs)
>
> - Change the scope of the base objects in the PlatformerGameLibrary
>
> Edit the following files and simply make the classes and enumerations within them "Public" so they will be exposed outside the game library
>
> - AnimationPlayer.cs
> - Circle.cs
> - Enemy.cs
> - Gem.cs
> - Level.cs
> - Player.cs
> - Tile.cs
>
> For example, change the following:
>
> From
>
> ```csharp
> /// <summary>
> /// Facing direction along the X axis.
> /// </summary>
> enum FaceDirection
> {
> 	Left = -1,
> 	Right = 1,
> }
>
> /// <summary>
> /// A monster who is impeding the progress of our fearless adventurer.
> /// </summary>
> class Enemy
> {
> 	public Level Level
> 	{
> 		get { return level; }
> 	}
> 	Level level;
> ```
>
> To
>
> ```csharp
> /// <summary>
> /// Facing direction along the X axis.
> /// </summary>
> public enum FaceDirection
> {
> 	Left = -1,
> 	Right = 1,
> }
>
> /// <summary>
> /// A monster who is impeding the progress of our fearless adventurer.
> /// </summary>
> public class Enemy
> {
> 	public Level Level
> 	{
> 		get { return level; }
> 	}
> 	Level level;
> ```
>
> - Replace GameTime references to just use the TimeSpan ElapsedGameTime variable in the function parameters
>
> In the Update and Draw functions of the above classes replace "GameTime gametime" with "TimeSpan elapsedGameTime" where applicable
>
> From
>
> ```csharp
> public void Update(GameTime gameTime)
> {
> ```
>
> To
>
> ```csharp
> public void Update(TimeSpan elapsedGameTime)
> {
> ```
>
> - Fix code that originally use the GameTime variable
>
> Again in the above classes update and draw functions, remove references that use the gameTime variable as it was passed to the function so that it now uses the elapsedGameTime variable
>
> From
>
> ```csharp
>  float elapsed = (float)gameTime.ElapsedGameTime.TotalSeconds;
> ```
>
> To
>
> ```csharp
> float elapsed = (float)elapsedGameTime.TotalSeconds;
> ```
>
> - Final tidy ups
>
> Clean up the remaining broken references in Player.cs and Level.cs by replacing any mentions of "gameTime" with "elapsedGameTime". There are a few dotted around including some internal functions such as "DoJump" and "gem.Update(gameTime)"
>
> - There's always one exception
>
> The only reference I was unable to fix was in "Gem.cs" where the project actualy makes use of the "TotalGameTime" property of the original GameTime class. As it's only one reference I decided to overlook this and just replaced it with "elapsedGameTime" just to keep things simple and it doesn't overly affect the end result. If it were really important or if it was my own project I may have looked to refactor this a bit better or as stated before passed both elapsed and total time to the function that needed it.

At this point your project should compile with no errors, granted if you run it you will just have an empty blue screen but we know the game code compiles fine.

---

## Final cut

So with our project in a state where it will work with SilverXNA its time to get this show on the road, now we just need to copy all the relevant bits from the original PlatformerGame..cs and get them working in our new project.

**Constructor and Variables**

First we need to sort out all the primary variables our game uses and the initialisation logic, so open up "GamePage.XAML.cs" and add the following variables to the top of the GamePage class just below the content manager, Timer and spritebatch variables (fixing any broken references as you go):

```csharp
// Global content.
private SpriteFont hudFont;

private Texture2D winOverlay;
private Texture2D loseOverlay;
private Texture2D diedOverlay;

// Meta-level game state.
private int levelIndex = -1;
private Level level;
private bool wasContinuePressed;

// When the time remaining is less than the warning time, it blinks on the hud
private static readonly TimeSpan WarningTime = TimeSpan.FromSeconds(30);

// We store our input states so that we only poll once per frame,
// then we use the same input state wherever needed
private GamePadState gamePadState;
private KeyboardState keyboardState;
private TouchCollection touchState;
private AccelerometerState accelerometerState;

// The number of levels in the Levels directory of our content. We assume that
// levels in our content are 0-based and that all numbers under this constant
// have a level file present. This allows us to not need to check for the file
// or handle exceptions, both of which can add unnecessary time to level loading.
private const int numberOfLevels = 3;
```

And add the following to the end of the GamePage constructor:

```csharp
Accelerometer.Initialize();
```

A few notes about the above before we continue, I've kept in the references to the Keyboard and Gamepad states, mainly to keep uniformity down the line in the main game project, you can remove them if you wish but at present they are doing no harm as they are effectively not being used anyway, its all just about cross platform support.

As for the Accelerometer, I've had to tweak it slightly, as we only want the accelerometer on when the GamePage is running and stop it when it's not but the current AccelerometerHelper is not designed that way, so to avoid the game crashing when you run it twice I have replaced the error exception when it is started twice with a return statement, fix this if you wish or just check out the debugger when it breaks. (edit Accelerometer.cs and replace the entire line of "Throw InvalidOperationException" with a simple "Return" statement)

**Navigation and Content Loading**

Now unlike native XNA where the Content Loading process is handled by the Main Game framework in SilverXNA we have to do it manually, now this can be both a blessing and a pain just because of the many ways and events available to us when a page is navigated to and from. the Navigated to event is fired just after the page has been constructed in memory but before it is presented to the screen so it is a handy place to load content that needs to be drawn to the screen.

With all XNA games knowing what content to load and when is very important so only load what you immediately need and delay loading anything else till later (like in the onLoaded event which is when the page has finished presenting to the screen or better yet offload it to another thread when the page has finished loading else you may lock up screen drawing if it takes a long time)

In this case we don't have that much to load so we can do it all at once, just add the following in the "onNaviagatedTo" function just before the "Timer.Start()" call:

```csharp
LoadContent();
```

and then add the respective function just after the "OnNavigatedTo" function:

```csharp
/// <summary>
/// LoadContent will be called once per game and is the place to load
/// all of your content.
/// </summary>
void LoadContent()
{
	// Load fonts
	hudFont = contentManager.Load<spritefont>("Fonts/Hud");

// Load overlay textures
	winOverlay = contentManager.Load<texture2d>("Overlays/you_win");
	loseOverlay = contentManager.Load<texture2d>("Overlays/you_lose");
	diedOverlay = contentManager.Load<texture2d>("Overlays/you_died");

//Known issue that you get exceptions if you use Media PLayer while connected to your PC
	//See http://social.msdn.microsoft.com/Forums/en/windowsphone7series/thread/c8a243d2-d360-46b1-96bd-62b1ef268c66
	//Which means its impossible to test this from VS.
	//So we have to catch the exception and throw it away
	try
	{
		MediaPlayer.IsRepeating = true;
		MediaPlayer.Play(contentManager.Load<song>("Sounds/Music"));
	}
	catch { }

LoadNextLevel();
}
```

In this I've fixed up for you the Content Manager references to use the SilverXNA one over the use of the Game class "Content" references, in SilverXNA the Content Manager is exposed as a service unlike XNA where is it just provided out of the box.

Don't forget to fix the references to the MediaPlayer, ignore the missing "LoadNextLevel" function for now as we will get to that later.

Pages should really unload their content if the assets are not going to be used any more so keep this in mind and handle the unloading of any unneeded content in the "onNavigatedFrom" function. As we are constantly using the same assets in this game we need not bother.

**Game Update function**

Next up is the update function (if for no other reason that Update is called before Draw), thankfully in the project template has already wired up the Timer and associated events for Update and Draw so just add the following to the onUpdate function in the GamePage.XAML.cs file:

```csharp
// Handle polling for our input and handling high-level input
HandleInput();

// update our level, passing down the GameTime along with all of our input states
level.Update(e.ElapsedTime, keyboardState, gamePadState, touchState,
			 accelerometerState, this.Orientation.ToXNAOrientation());
```

Not much to talk about here just basic game logic stuff, again ignore the red squiggles as we will come back to it later. Note the reference to "e.ElapsedTime", this comes from the "GameTimerEventArgs" we talked about recently which is the replacement for the XNA GameTime class, here is where you would need to also grab the TotalGameTime if needed.

**Game Draw Function**

As with the Update function, the Draw function is just admin stuff really and I've tidied up references to the Spritebatch as they were slightly different, so just add the following under the comment in the "onDraw" function:

```csharp
spriteBatch.Begin();

level.Draw(e.ElapsedTime, spriteBatch);

DrawHud();

spriteBatch.End();
```

You know the drill broken bits to be fixed shortly :D

**The last bits, the supporting actors**

And finally (well almost) here's the rest of the supporting code and functions from the original Platformer Game sample, I've tweaked and prodded where needed just to line up use of GameTime and such but I've not had to change much, granted a lot of this could be handled from within the game library, for others however this actually helps us because it's stuff I'm going to rip out and replace with Silverlight:

So just paste the following after the "onDraw" function:

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
	string timeString = "TIME: " + level.TimeRemaining.Minutes.ToString("00") +
    ":" + level.TimeRemaining.Seconds.ToString("00");
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
	DrawShadowedString(hudFont, "SCORE: " + level.Score.ToString(), hudLocation + new Vector2(0.0f, timeHeight * 1.2f),
     Color.Yellow);

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

private void DrawShadowedString(SpriteFont font, string value, Vector2 position, Color color)
{
	spriteBatch.DrawString(font, value, position + new Vector2(1.0f, 1.0f), Color.Black);
	spriteBatch.DrawString(font, value, position, color);
}

private void HandleInput()
{
	touchState = TouchPanel.GetState();
	accelerometerState = Accelerometer.GetState();

bool continuePressed = touchState.AnyTouch();

// Perform the appropriate action to advance the game and
	// to get the player back to playing.
	if (!wasContinuePressed && continuePressed)
	{
		if (!level.Player.IsAlive)
		{
			level.StartNewLife();
		}
		else if (level.TimeRemaining == TimeSpan.Zero)
		{
			if (level.ReachedExit)
				LoadNextLevel();
			else
				ReloadCurrentLevel();
		}
	}

wasContinuePressed = continuePressed;
}

private void LoadNextLevel()
{
	// move to the next level
	levelIndex = (levelIndex + 1) % numberOfLevels;

// Unloads the content for the current level before loading the next one.
	if (level != null)
		level.Dispose();

// Load the level.
	string levelPath = string.Format("Content/Levels/{0}.txt", levelIndex);
	using (Stream fileStream = TitleContainer.OpenStream(levelPath))
		level = new Level((Application.Current as App).Services, fileStream, levelIndex);
}

private void ReloadCurrentLevel()
{
	--levelIndex;
	LoadNextLevel();
}
```

There are a few comments I should make about this block however, most was just the simple fixes that I've stated many times before here, other took a little head scratching namely where the Graphics Device was involved.

Because SilverXNA uses a "SharedGraphicsDeviceManager" over the traditional XNA "GraphicsDevice" you need to be a bit more specific in what you are referring to so note that I have replaced the original line for accessing the "Tile Safe Area" from:

```csharp
Rectangle titleSafeArea = GraphicsDevice.Viewport.TitleSafeArea;
```

To:

```csharp
Microsoft.Xna.Framework.Rectangle titleSafeArea =
 SharedGraphicsDeviceManager.Current.GraphicsDevice.Viewport.TitleSafeArea;
```

So it's just a point of reference to note the difference but something definitely to keep in mind, there are also TWO rectangle classes, so in instances like this you have to be very specific, cannot rule out one or the other because both might be needed.

I did also remove all of the code for keyboard and gamepad updates as they were no longer needed in the "HandleInput" function.

The other thing of note is the section at the end for loading the next level, I had to change the reference to the Game "Services" repository (part of the Game class again) to the reference held in the App.XAML.CS class, like many things with the reduced / modified framework you just need to know where to look for stuff and if it is held in the Application class for the Silverlight application then you just need to refer to it in this manner thus:

```csharp
(Application.Current as App).Services
```

Lastly don't forget your references, those Streams are not going to find themselves.

**Last Man Standing**

You know when I said there is only one exception, well I wasn't being completely honest there, you will still have one broken link if you compile the above for an extension method I had to create to handle the Orientation enumeration differences between XNA and Silverlight (and I did warn you in Part 1 :D)

Just add the following to the very end of the "GamePage.XAML.cs" file after the GamePage class, it's a simple enough Extension method that will return an XNA orientation from a defined Silverlight Orientation, this can then be fed to whatever XNA code in your project is handling drawing / input for orientation, as stated before this is to make it easer on multi-platform XNA projects so you don't need a load of #IF statements to balance everything:

```csharp
public static class OrientationExtensions
{
	public static DisplayOrientation ToXNAOrientation(this PageOrientation input)
	{
		switch (input)
		{
			case PageOrientation.Landscape:
			case PageOrientation.LandscapeLeft:
				return DisplayOrientation.LandscapeLeft;
			case PageOrientation.LandscapeRight:
				return DisplayOrientation.LandscapeRight;
			default:
				return DisplayOrientation.Portrait;
		}
	}
}
```

I could have put this into its own class as you're supposed to but it was the end of a very long day and it made more sense to keep all the changes and additional stuff to a minimum.

---

## Mind the water jump at the end of the course

Now you would be forgiven if you thought we were done and sure enough the game will compile and run with only one minor little bugg'et, as shown below:

[![Emulator showing the game squeezed into the top of a portrait screen above a blue area](/assets/img/wordpress/2012/07/image52.png)](/assets/img/wordpress/2012/07/image52.png)

Now one reason for this is simple, by default XNA will start games in Landscape, in Silverlight the default is Portrait, simples [![Smiley emoticon](/assets/img/wordpress/2012/07/image53.png)](/assets/img/wordpress/2012/07/image53.png). So we just need to tell the GamePage that we would like it in Landscape Pretty please (note that every page needs to be set to Landscape or Portrait unlike XNA where it is set once on start-up and only changes if you tell it to or if the user rotates the device if supported)

So for the first time here, edit the GamePage.XAML and change the following line from:

```xml
SupportedOrientations="Portrait" Orientation="Portrait"
```

To

```xml
SupportedOrientations="Landscape"  Orientation="Landscape"
```

Not so bad for your first bit of XAML editing, you can do this from code of course but with Silverlight it's better to set the default in XAML and only override if needed.

A key thing to note though is that unlike XNA where we only have one screen and have to use game states to manage different setups of the game world whereas in Silverlight we can have many pages all of which can be either completely Silverlight, completely XNA or a mixture of both which gives us greater flexibility and avoid complex screen management scenarios.

The best example I have seen of this was the car setup for a racing game, each different view that you had to select tracks, setup the car, select add-ons and customisations was a separate page each with its own logic or input strategy before launching the main racing part of the game, if done in XNA you had to manage many states and write complex routines to handle all the variations or start making compromises to avoid breaking points.

---

## End of the line

That's a wrap people, print it and go and get more coffee.

As stated before the full source for the completed project can be found [here on codeplex](http://startrooper2dxna.codeplex.com/releases/view/72112)

So now we have our game running in SilverXNA, the series will now return to our regular broadcasting schedule and focus on the little things, the big advantages of using SilverXNA and the simplicity it brings for our games.

Lights out please

### If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/)
