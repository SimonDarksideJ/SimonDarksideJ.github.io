---
layout: post
title: Adventures in Unhandled Exception Handling for XNA/Silverlight
date: 2012-07-02 13:57:27
tags: [silverlight, xna]
---

![Unhandled exception report screen](https://web.archive.org/web/20191224130442im_/http://www.lifeasbob.com/content/binary/UnhandledException.jpg)

One thing that can tick off your users / players is that inevitable time through a series of random events a crash occurs, it's unhandled and causes the app/game to just crash.  Bang there goes all my progress and saves, very bad experience.

Even with the best of breed apps and games this can happen just because we are human and cannot account for every single possibility or potentially crafty thing that users / players can do, whether it's intentional, accidental or just plain dumb, or it could even be your fault who'd have thought that players / users would want to do something that way.

All this could prevent your app / game from getting published but even if it is out there for people to play it's just a bad experience, unless you ensure that when / if it does happen, it happens in a handled way (handling the unhandled) and informs the user and possibly allow them to help you out and contribute.

There are several mechanisms for doing this in XNA and Silverlight depending on your platform, here we're just going to focus on XBOX/PC for raw XNA and Silverlight + XNA on the phone.

## Sample for this tutorial has been hosted with the Starter Tutorial series source [here](http://bit.ly/JmuXTE) on codeplex - [http://bit.ly/JmuXTE](http://bit.ly/JmuXTE)

* * *

## The normal way for XNA

XNA acts like any normal program when it runs on windows or XBOX, there is a main "Program" launch point where you can wrap some logic to catch the fallen game should it crash, when it happens we do something about it, we can either:

> - Store the Error and show it to the user when they next launch the game (or show it immediately)  
> - Give the user the ability to email or send the error report via a web service (or even do it silently but I wouldn't recommend that)  - Note XBOX has no connectivity unless you are XBLA so this option is limited on XBOX

The principle is quite simple, just put a Try/Catch Loop around in the Program class:

```csharp
static class Program
{
	/// <summary>
	/// The main entry point for the application.
	/// </summary>
	static void Main(string[] args)
	{
		try
		{
			using (Game1 game = new Game1())
			{
				game.Run();
			}
		}
		catch (Exception)
		{

		}
	}
}
```

So now we are handling errors but we're still crashing, it just doesn't look as bad to the system hosting it and will give us an opportunity to look at the crash in the debugger.

The default way that I've handled crashes such as this in the past is to have a second game project which is launched should the game crash, this gives me a view at the error on screen as it happens, this is especially good when trying to debug a game running on the XBOX without the debugger attached.

To do this simply:

> - Create New XNA Project in solution, for example "UnhandledExceptionReporter"  
> - Rename Game.cs to "MyErrorHandler" (or something like that) and rename the class inside
>
> Be sure to update all code that uses the class, like the Program.cs in the error handler project and the constructor in the game class
>
> - Add a SpriteFont to the ErrorHandler Content project (not your game project)  
> - Add a Property to the ErrorHandler Game class to store the Error Text  
> - In Load Content Load the Sprite Font  
> - In the Draw Loop Draw the error text

Your Game class should now look something like this:

```csharp
public class MyErrorHandler : Microsoft.Xna.Framework.Game
{
	public string ErrorText = "No Error Found";
	GraphicsDeviceManager graphics;
	SpriteBatch spriteBatch;
	SpriteFont ErrorFont;

	public MyErrorHandler()
	{
		graphics = new GraphicsDeviceManager(this);
		Content.RootDirectory = "Content";
	}

	/// <summary>
	/// Allows the game to perform any initialization it needs to before starting to run.
	/// This is where it can query for any required services and load any non-graphic
	/// related content.  Calling base.Initialize will enumerate through any components
	/// and initialize them as well.
	/// </summary>
	protected override void Initialize()
	{
		// TODO: Add your initialization logic here

		base.Initialize();
	}

	/// <summary>
	/// LoadContent will be called once per game and is the place to load
	/// all of your content.
	/// </summary>
	protected override void LoadContent()
	{
		// Create a new SpriteBatch, which can be used to draw textures.
		spriteBatch = new SpriteBatch(GraphicsDevice);
		ErrorFont = Content.Load<SpriteFont>("ErrorFont");
		// TODO: use this.Content to load your game content here
	}

	/// <summary>
	/// UnloadContent will be called once per game and is the place to unload
	/// all content.
	/// </summary>
	protected override void UnloadContent()
	{
		// TODO: Unload any non ContentManager content here
	}

	/// <summary>
	/// Allows the game to run logic such as updating the world,
	/// checking for collisions, gathering input, and playing audio.
	/// </summary>
	/// <param name="gameTime">Provides a snapshot of timing values.</param>
	protected override void Update(GameTime gameTime)
	{
		// Allows the game to exit
		if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
			this.Exit();

		// TODO: Add your update logic here

		base.Update(gameTime);
	}

	/// <summary>
	/// This is called when the game should draw itself.
	/// </summary>
	/// <param name="gameTime">Provides a snapshot of timing values.</param>
	protected override void Draw(GameTime gameTime)
	{
		GraphicsDevice.Clear(Color.Red);

		// TODO: Add your drawing code here
		spriteBatch.Begin();
		spriteBatch.DrawString(ErrorFont, "An Error occured in your game, the error is as follows", Vector2.Zero, Color.White);
		spriteBatch.DrawString(ErrorFont, ErrorText, new Vector2(0,40), Color.White);
		spriteBatch.End();
		base.Draw(gameTime);
	}
}
```

You can go a lot further with this of course, adding more fields to the class and adding more data, cleaning up the draw call so that lines wrap around the screen and look a lot cleaner but you get the general picture.

You might ask why not just add a new game class to my existing project and the answer to that is two fold, by making it a separate project you can re-use your error handler for any project, plus you cannot actually have 2 Game classes in an XNA project, it's just not allowed :D

To finish this implementation off just update the previous error handling code to now call your new Error handler instead, thus:

```csharp
static void Main(string[] args)
{
	try
	{
		using (MyGame1 game = new MyGame1())
		{
			game.Run();
		}
	}
	catch (Exception e)
	{
		using (MyErrorHandler errorHandler = new MyErrorHandler())
		{
			errorHandler.ErrorText = e.Message;
			errorHandler.Run();
		}
	}
}
```

Now when you game crashes you will see the root cause (or at least the very helpful .NET exception report for the failure :P), I'd recommend extending it further to include your own text or test data to trap when and where the error occurred, consider it homework!

[![Red game screen reading An Error occured in your game, with the error text shown below](/assets/img/wordpress/2012/07/image137.png)](/assets/img/wordpress/2012/07/image137.png)

* * *

## Enter Little Watson

Now while I was implementing my own error handler in my Phone projects I came across a tweet of a little sample class that helps out with error reporting, cutely called "Little Watson".  It's written by [Andy Pennell](http://blogs.msdn.com/3107/ProfileUrlRedirect.ashx) on an MSDN blog here - [http://bit.ly/JhZLKP](http://bit.ly/JhZLKP)

It's very neat and instead of having a separate project it just saves the error and next time you run your project it can email the error report to you (useful for phone projects when you publish to get users to give you more info than the pesky AppHub error reports), this was nice but with a few minor modifications it can be made to also display it to the screen and can even be customised for the XBOX.

```csharp
using System;
using System.IO;
using System.IO.IsolatedStorage;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework;

public static class LittleWatson
{
    static string filename = "LittleWatson.txt";
    static bool checkedForError = false;
    static bool errorFound = false;
    static string ErrorText;
    static SpriteFont ErrorFont;

    public static void ReportException(Exception ex, string extra)
    {
        try
        {
            using (var store = IsolatedStorageFile.GetStore(IsolatedStorageScope.User | IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain, null, null))
            {
                SafeDeleteFile(store);
                using (TextWriter output = new StreamWriter(store.CreateFile(filename)))
                {
                    output.WriteLine(extra);
                    output.WriteLine(ex.Message);
                    output.WriteLine(ex.StackTrace);
                }
            }
        }
        catch (Exception)
        {
        }
    }

    public static void LoadContent(ContentManager content)
    {
        ErrorFont = content.Load<SpriteFont>("ErrorFont");
    }

    public static bool ErrorFound
    {
        get
        {
            if (checkedForError)
            {
                return errorFound;
            }
            using (var store = IsolatedStorageFile.GetStore(IsolatedStorageScope.User | IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain, null, null))
            {
                if (store.FileExists(filename))
                {
                    errorFound =  true;
                }
            }
            checkedForError = true;
            return errorFound;
        }
    }

    public static void DrawException(SpriteBatch spriteBatch)
    {
        try
        {
            if (string.IsNullOrEmpty(ErrorText))
            {
                using (var store = IsolatedStorageFile.GetStore(IsolatedStorageScope.User | IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain, null, null))
                {
                    if (store.FileExists(filename))
                    {
                        using (TextReader reader = new StreamReader(store.OpenFile(filename, FileMode.Open, FileAccess.Read, FileShare.None)))
                        {
                            ErrorText = reader.ReadToEnd();
                        }
                        SafeDeleteFile(store);
                    }
                }
            }
            if (string.IsNullOrEmpty(ErrorText))
            {
                ErrorText = "An Error occured reading the Error, uh oh";
            }
                spriteBatch.Begin();
                spriteBatch.DrawString(ErrorFont, "An Error occured in your game, the error is as follows", Vector2.Zero, Color.White);
                spriteBatch.DrawString(ErrorFont, ErrorText, new Vector2(0, 40), Color.White);
                spriteBatch.End();
        }
        catch {}
        finally
        {
            SafeDeleteFile(IsolatedStorageFile.GetStore(IsolatedStorageScope.User | IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain, null, null));
        }
    }

    private static void SafeDeleteFile(IsolatedStorageFile store)
    {
        try
        {
            store.DeleteFile(filename);
        }
        catch {}
    }
}
```

If you add the above class to your project and a spritefont for the error reporting to use, then you can update your program.cs to

```csharp
static void Main(string[] args)
{
	try
	{
		using (MyGame1 game = new MyGame1())
		{
			game.Run();
		}
	}
	catch (Exception e)
	{
		LittleWatson.ReportException(e, "A Bad Thing this way comes");
	}
}
```

Then add the following into your "LoadContent" method before any of your own calls (but after spritebatch creation and the error reporting needs one:

```csharp
protected override void LoadContent()
{
	// Create a new SpriteBatch, which can be used to draw textures.
	spriteBatch = new SpriteBatch(GraphicsDevice);
	if (LittleWatson.ErrorFound)
	{
		LittleWatson.LoadContent(Content);
	}
	else
	{
		// TODO: use this.Content to load your game content here
		throw new Exception("I'm Causing a Ruckas and like to Shout about it!!");
	}
}
```

And then finally alter your draw call to test for errors and if found draw them instead of your normal game draw:

```csharp
protected override void Draw(GameTime gameTime)
{
	GraphicsDevice.Clear(Color.CornflowerBlue);

	// TODO: Add your drawing code here
	if (LittleWatson.ErrorFound)
	{
		LittleWatson.DrawException(spriteBatch);
	}
	else
	{
		//Normal Draw Loop
	}

	base.Draw(gameTime);
}
```

Obviously there are a few alternatives to this approach, you could use separate methods for Error Draw and Normal Draw in case you are worried about performance and hook them up in the LoadContent method, as always several ways to achieve the same thing.

The end result is that if your game crashes, next time it starts it will display the error.  useful as an alternative to the separate project.

* * *

## Out of the box Silverlight

With Silverlight for Windows Phone it already came wired up with an unhandled exception handler all ready to go, but still it's better to do something with that so you can manage and track those pesky errors when they occur.  For the [AdRotator](http://wp7adrotator.codeplex.com/) samples I've used a modified version of Andy's Little Watson class so I can just view the error instead sending it, semantics really but it's how I roll, so the final little watson class I used (which is different to the XBOX/Windows one above because we have more resource available) was:

```csharp
using System;
using System.IO;
using System.IO.IsolatedStorage;
using System.Windows;
using Microsoft.Phone.Tasks;

public static class LittleWatson
{
    const string filename = "LittleWatson.txt";

    public static void ReportException(Exception ex, string extra)
    {
        try
        {
            using (var store = IsolatedStorageFile.GetUserStoreForApplication())
            {
                SafeDeleteFile(store);
                using (TextWriter output = new StreamWriter(store.CreateFile(filename)))
                {
                    output.WriteLine(extra);
                    output.WriteLine(ex.Message);
                    output.WriteLine(ex.StackTrace);
                }
            }
        }
        catch (Exception)
        {
        }
    }

    public static void CheckForPreviousException(string _emailTo, string _subject)
    {
        try
        {
            string contents = null;
            using (var store = IsolatedStorageFile.GetUserStoreForApplication())
            {
                if (store.FileExists(filename))
                {
                    using (TextReader reader = new StreamReader(store.OpenFile(filename, FileMode.Open, FileAccess.Read, FileShare.None)))
                    {
                        contents = reader.ReadToEnd();
                    }
                    SafeDeleteFile(store);
                }
            }
            if (contents != null)
            {
                if (MessageBox.Show("A problem occurred the last time you ran this application. Would you like to send an email to report it?\nOr click cancel to view it on screen", "Problem Report", MessageBoxButton.OKCancel) == MessageBoxResult.OK)
                {
                    EmailComposeTask email = new EmailComposeTask();
                    email.To = _emailTo;
                    email.Subject = _subject;
                    email.Body = contents;
                    SafeDeleteFile(IsolatedStorageFile.GetUserStoreForApplication()); // line added 1/15/2011
                    email.Show();
                }
                else
                {
                    MessageBox.Show(contents, "Error Detail", MessageBoxButton.OK);
                }
            }
        }
        catch (Exception)
        {
        }
        finally
        {
            SafeDeleteFile(IsolatedStorageFile.GetUserStoreForApplication());
        }
    }

    private static void SafeDeleteFile(IsolatedStorageFile store)
    {
        try
        {
            store.DeleteFile(filename);
        }
        catch (Exception ex)
        {
        }
    }
}
```

To use this simply update your App.XAML.cs "Application_UnhandledException" method from:

```csharp
private void Application_UnhandledException(object sender, ApplicationUnhandledExceptionEventArgs e)
{
	if (System.Diagnostics.Debugger.IsAttached)
	{
		// An unhandled exception has occurred; break into the debugger
		System.Diagnostics.Debugger.Break();
	}
}
```

To:

```csharp
private void Application_UnhandledException(object sender, ApplicationUnhandledExceptionEventArgs e)
{
	if (System.Diagnostics.Debugger.IsAttached)
	{
		// An unhandled exception has occurred; break into the debugger
		System.Diagnostics.Debugger.Break();
	}
	else
	{
		try
		{
			LittleWatson.ReportException(e.ExceptionObject, "Starter3D SilverXNA Error");
		}
		catch { }
	}

}
```

Obviously you'd change the reporting text to something more suitable for your project, this handles writing the error report out to disk, to read it back just add the following to your application launching and activated methods:

```csharp
// Code to execute when the application is launching (eg, from Start)
// This code will not execute when the application is reactivated
private void Application_Launching(object sender, LaunchingEventArgs e)
{
	try
	{
		LittleWatson.CheckForPreviousException("starter3dseries@xna-uk.net", "Starter3D SilverXNA Example Error Report");
	}
	catch { }
}

// Code to execute when the application is activated (brought to foreground)
// This code will not execute when the application is first launched
private void Application_Activated(object sender, ActivatedEventArgs e)
{
	try
	{
		LittleWatson.CheckForPreviousException("starter3dseries@xna-uk.net", "Starter3D SilverXNA Example Error Report");
	}
	catch { }
}
```

The first parameter is where to send the report if one is found (should the user be happy to email it, the second is the subject.  That's it your Silverlight project is protected against gremlins.

* * *

## XNA on Windows Phone, a different story

When it comes to XNA on windows phone neither of the above options are available, XNA on windows phone does not use the Program class (it's still there but can just as easily be deleted because it's not used) and we have no out of the box Unhandled Exception reporting available so what's a hardy Dev to do.

Well hidden in the depths of the "System.Windows" library is an application object that has been customised for windows phone and as it happens there is an "UnHandledException" event hidden within there which (since Mango) is now available for use, so all we have to do is hook up to it.

First Add references to "**System.Windows**" and "**Microsoft.Phone**" (the latter needed for Little Watson) and then copy in the Little Watson class to your Phone XNA Project (note SilverXNA projects are still Silverlight projects so use the previous section).

Now wire up the following in the constructor of your Game Class:

```csharp
Application.Current.UnhandledException += new EventHandler<ApplicationUnhandledExceptionEventArgs>(Current_UnhandledException);
```

And add the corresponding function to handle it as follows:

```csharp
void Current_UnhandledException(object sender, ApplicationUnhandledExceptionEventArgs e)
{
	if (System.Diagnostics.Debugger.IsAttached)
	{
		// An unhandled exception has occurred; break into the debugger
		System.Diagnostics.Debugger.Break();
	}
	else
	{
		try
		{
			LittleWatson.ReportException((Exception)e.ExceptionObject, "Example XNA Error caught");
		}
		catch { }
	}
}
```

That takes care of the reporting, any unhandled exceptions will be trapped and recorded, next you just need to test for errors on start-up, where you place this will be up to you, it needs to be soon enough in your game to report the error before it happens but late enough so the phone is initialised enough to be able to work.  **\*Note the game constructor is too early** :D

So you're left with either the "Initialised" function or the "LoadContent" it's up to you really, just add the following code where you think it is more appropriate for your game (I prefer the initialised function BTW):

```csharp
try
{
	LittleWatson.CheckForPreviousException("someemail@someaddress.com", "Sample SL Example Error Report");
}
catch { }
```

And that's it!

* * *

## Enough is enough

Well I hope you got something out of this article, it was a nice distraction to write while I'm doing other stuff, gotta keep the old brain cells ticking.

Next up I'm updating the instructions for implementing AdRotator in XNA and Silverlight, more of a "How-to" end to end.  This article was just an off shoot (which I would have thought of been a lot shorter but just didn't end up that way) with adding error handling to all the example projects.
