---
layout: post
title: XNA to SilverXNA-part 4 Degrees of Separation
date: 2012-07-01 22:39:39
tags: [silverlight, xna]
---

In yet another area that will be completely foreign to XNA devs (unless you have delved into Silverlight or Web programming) is the concept that in reality you should never have code updating the screen directly.

In XNA this is unavoidable simply because XNA is the only thing that draws to the screen and has complete control over everything however the same principle can also be applied to XNA games just to simplify and centralise where all the information comes from when presenting it to the screen, lost yet?, well lets continue.

What we are talking about a design pattern called MVVM, others do exist which are all based on the same rough idea (MVC, MVP, etc), the diagram below aims to help visually represent this (image courtesy of [John Papa's article](https://visualstudiomagazine.com/articles/2011/08/15/fundamental-mvvm.aspx) on Visual Studio magazine [here](https://visualstudiomagazine.com/articles/2011/08/15/fundamental-mvvm.aspx)):

![Diagram of the MVVM pattern showing the view, view model and model](https://web.archive.org/web/20221127082156im_/https://visualstudiomagazine.com/articles/2011/08/15/~/media/ECG/visualstudiomagazine/Images/2011/08/wcpp0815FigL.ashx)

As the diagram shows the view (or screen) is independent of the rest of the project just getting information it needs to drive the user experience from a ViewModel (collection of settings), other parts of the application that need to update the information just update the ViewModel as well (in our case the game).

With this separation it means we cannot break (except in rare circumstances) the display of our app or game and it also means we can pass off the final screen presentation to a designer to craft our screen against an agreed set of information the app/game will work with.

All gobbledegook, well I suggest reading a sample of the following articles:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    [Fundamental MVVM by John papa](https://bit.ly/oSwpOA)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    **[Understanding the MVVM Pattern](https://www.galasoft.ch/mvvmvideo1) by Laurent Bugnion (my MVVM hero :D)**
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    **[Deep Dive MVVM](https://www.galasoft.ch/mvvmvideo2) also by Laurent Bugnion (he's also the author of MVVM light for Windows Phone)**  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    [MVVM Light Toolkit: Soup To Nuts](https://bit.ly/oOitH0) by Jessie Liberty

Why do I bring this up?, well as part of this article we'll aim to further simplify and box off sections of our game to make it both easier to maintain and add a degree of control while we use Silverlight, one of the big benefits of Silverlight is it's data binding capabilities which means you do not have to (but you can do if you want do) manually update every control on the screen with values from your app/game, the screen is designed to listen to those values and automatically updates appropriately, that can include animations and other cool things as well!.

As usual full source for this chapter can be found [here on Codeplex](https://silverxna.codeplex.com/releases/view/72312):

Follow along with the series here:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 1 - an Overview](/?p=366)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 2 - Getting Started](/?p=386)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 3 - Adding the first control](/?p=406)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 4 - MVVM frameworks and Nuget](/?p=420) (here)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 5 - Controls](/?p=443)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 6 - Adding Animation](/?p=496)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/025.png) [Part 7 - A different approach](/?p=505)

Also [Channel 9](https://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) are running a similar [video series here](https://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) if you prefer videos! :D

## If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](/forums/forum/silverxna/)

* * *

## Framework, I don't need no stinking framework

Now you can do all this manually by using the iNotifyPropertyChanged interface throughout your code to sort all this out but it's just far simpler to use a robust framework to do most of the grunt work for us, my framework of choice is the MVVM Light framework for Windows Phone which is both light and provides MVVM functionality (I bet it took Laurent a whole 5 seconds to come up with that name :D) and now that the Windows Phone SDK 7.1 also support NuGet in the Express Edition this is just a few clicks away.

Open up the SilverXNA project in Visual Studio Express and right click on the references folder in the main SilverXNA project:

[![Visual Studio Solution Explorer with the Manage NuGet Packages option in the References context menu](/assets/img/wordpress/2012/07/image61.png)](/assets/img/wordpress/2012/07/image61.png)

If you don't get the "Manage NuGet Packages" option then you most likely do not have the latest tools installed (You need the RTM version or above).

Select the NuGet option and you will be presented with the NuGet Package manager, from here you can search for and install new packages or see if there are any updates to existing installed one's.  This is truly an invaluable tool which is a great addition to the express tools.  Unfortunately there is no online review library of NuGet packages (that I'm aware of) so you will have to rely on searching or reading about your favourite packages on the web but full details about each package are available through the package manager.

[![Manage NuGet Packages dialog with MVVM Light selected](/assets/img/wordpress/2012/07/image62.png)](/assets/img/wordpress/2012/07/image62.png)

Search for MVVM and you should see the list above with the package we want right at the very top (as you can see there are lots of other MVVM packages out there so if you feel like trying a few others then feel free to experiment with what's good for you), for now just click install on the MVVVM Light package.

When it's installed you will see it has done several things, it's installed and added references to the MVVM light libraries and added some template files for use as well.  If there were any dependencies on other packages then they would have been installed as well all with a single click of a button, simples!.

[![Solution Explorer showing the MVVM Light references, the ViewModel folder and App.xaml updates](/assets/img/wordpress/2012/07/image63.png)](/assets/img/wordpress/2012/07/image63.png)

So from the screenshot left you can see:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    The MVVM Light libraries for WP7 7.1  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    A new folder with some template files  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    The App.XAML has also bee updated with new configuration

NuGet can do some astounding things with packages so it is realy something to keep an eye on.

Usually the packages also come with a ReadMe file to aid with any additional setup tasks that are required to get up and running but it's missing in MVVM light at present but not to worry I know what I'm doing......

* * *

## A New view for an old face

In short this is how MVVM Light operates on Windows Phone (it's not exactly the same for all frameworks).

You have a page and corresponding ViewModel for that page which work together to present information to the screen safely.  Behind that you have a ViewModelLocator, this is the wiring panel behind the scenes that connects everything up, in more advanced cases it also provides the capability to plug in different data sources for your models from a central location providing another level of abstraction.

It's all words at this point and I'm only going to go over the simple things for now so it all becomes clearer, to see the advanced stuff in MVVM I suggest going through the material mentioned earlier, they are truly fantastic.

You can have Models to also describe your data but in this instance it's a bit too much so in effect our game is our model and engine driving what's being sent to the screen in SilverXNA IMHO.

Enough of this lets get something done.  if we analyse what we are currently using as data to send information to the screen in our Gamepage.XAML.cs (remembering that from a MVVM / Silverlight approach, storing values in our code behind is generally not a good idea because it cannot be reused) there are a few things (well a lot really but we are still keeping to baby steps, you can experiment later) that we could do with taking out of there, namely:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/006.png)    The Level attribute - used to see what our current level is and persists information about the player state  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/006.png)    The value for drawing the Time remaining to the screen  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/006.png)    The value for the players score  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/006.png)    A maintenance value for how long should pass before the player should be warned time is running short

These are the core things we want to look at in this session, there are several others (most of them really) that a page shouldn't need to know about but we will leave them along for now.

So lets add out GameViewModel for our GamePage, just right click on the "ViewModel" folder and select "Add -> New Item", click on the "Silverlight for windows Phone" branch in the tree on the left and select "MVVMViewModel (WP7)" then give it a name of "GameViewModel.cs"

[![Add New Item dialog showing the MVVM Light toolkit templates for Windows Phone](/assets/img/wordpress/2012/07/image64.png)](/assets/img/wordpress/2012/07/image64.png)

If the project templates do not show up in the "Add New Item" browser then you can get them from the [MVVMLight codeplex page](https://mvvmlight.codeplex.com/releases/71278/download/267119), else you can just copy the "MainViewModel.cs" file and rename it to "GameViewModel.cs" (remembering to also rename the classes and methods within since VS Express doesn't do this for you like the full studio edition)

Once you've done that open it up and it should look something like this:

```csharp
using GalaSoft.MvvmLight;

namespace SilverXNA.ViewModel
{
	/// <summary>
	/// This class contains properties that a View can data bind to.
	/// <para>
	/// Use the <strong>mvvminpc</strong> snippet to add bindable properties to this ViewModel.
	/// </para>
	/// <para>
	/// You can also use Blend to data bind with the tool's support.
	/// </para>
	/// <para>
	/// See http://www.galasoft.ch/mvvm/getstarted
	/// </para>
	/// </summary>
	public class GameViewModel : ViewModelBase
	{
		/// <summary>
		/// Initializes a new instance of the GameViewModel class.
		/// </summary>
		public GameViewModel()
		{
			////if (IsInDesignMode)
			////{
			////    // Code runs in Blend --> create design time data.
			////}
			////else
			////{
			////    // Code runs "for real": Connect to service, etc...
			////}
		}

		////public override void Cleanup()
		////{
		////    // Clean own resources if needed

		////    base.Cleanup();
		////}
	}
}
```

(if you copied the MainViewModel.cs then you might not have the Cleanup function but not to worry as we will not be using that this time round)

As you can see not much in here at the mo but we'll soon quickly change that.  Just after the "cleanup" function (yes I know it's commented out, leave it alone), start typing "mvvminpc" and you should see the following:

[![Code snippet suggestion for mvvminpc, an INPC property raising PropertyChanged](/assets/img/wordpress/2012/07/image66.png)](/assets/img/wordpress/2012/07/image66.png)

MVVM also comes with a heap load of code snippets to make building out our View Model all that more easier (See why I love that Laurent guy), hit tab twice and exploding onto your screen will be a nice new fully fledged property all wired up for MVVM:

```csharp
/// <summary>
/// The <see cref="MyProperty"> property's name.
/// </see></summary>
public const string MyPropertyPropertyName = "MyProperty";

private bool _myProperty = false;

/// <summary>
/// Gets the MyProperty property.
/// TODO Update documentation:
/// Changes to that property's value raise the PropertyChanged event.
/// This property's value is broadcasted by the Messenger's default instance when it changes.
/// </summary>
public bool MyProperty
{
	get
	{
		return _myProperty;
	}

	set
	{
		if (_myProperty == value)
		{
			return;
		}

		var oldValue = _myProperty;
		_myProperty = value;

		// Remove one of the two calls below
		throw new NotImplementedException();

		// Update bindings, no broadcast
		RaisePropertyChanged(MyPropertyPropertyName);

		// Update bindings and broadcast change using GalaSoft.MvvmLight.Messenging
		RaisePropertyChanged(MyPropertyPropertyName, oldValue, value, true);
	}
}
```

Also not only that but these snippets are also fully wired up as well allowing you to tab through the necessary values and it populates the rest of the code snippet for you, so type the following in this exact order, lay off the mouse and keep to the keyboard (hand and feet inside the ride at all times please)

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    Type "GameLevel" and hit Tab - this is the property public name  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    Type "Level" and hit the right arrow- this is the type for the property, in this case it is not recognised but we will fix that afterwards, we have to use the right arrow key because hitting tab would cause intellisense to make something up, lol  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    Type "\_gameLevel" and hit tab - this is the private name for the property  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    Lastly we have a choice to make as there are two options for how MVVM notifies Silverlight of changes to values, either throu a simple notification or whether it broadcasts it through messaging.  Too much to go through here so for now just remove the "NotImplemented" Line (a safety measure to ensure you check this) and the second "RaisePropertyChanged" line which talks about messaging.  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    To finish off right click on the red squiggle for the Level type and resolve the reference.

So you should be left with the following:

```csharp
/// <summary>
/// The <see cref="GameLevel"> property's name.
/// </see></summary>
public const string GameLevelPropertyName = "GameLevel";

private Level _gameLevel = null;

/// <summary>
/// Gets the GameLevel property.
/// TODO Update documentation:
/// Changes to that property's value raise the PropertyChanged event.
/// This property's value is broadcasted by the Messenger's default instance when it changes.
/// </summary>
public Level GameLevel
{
	get
	{
		return _gameLevel;
	}

	set
	{
		if (_gameLevel == value)
		{
			return;
		}

		var oldValue = _gameLevel;
		_gameLevel = value;

		// Update bindings, no broadcast
		RaisePropertyChanged(GameLevelPropertyName);
	}
}
```

Next we need to add the rest of the cure properties we need for:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    WarningTime (type Timespan)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    GameTime (type TimeSpan)  
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/004.png)    GameScore (type int)

Feel free to add them yourself or just copy the entire GameViewModel.cs from download package mentioned at the start of the chapter.(don't forget to resolve any missing references, like TimeSpan)

Now to add some additional features which will aid our end design for the page and show off a bit of what MVVM can do for you with Data Binding.  The first one we'll add is a new Property to display the GameTime as a string, you can just show the TimeSpan value as test however with you get days, hours, minutes, seconds and milliseconds it can look a little busy.  You may ask "Well why not just fix up the existing property to output a string?", simple answer the XNA game outputs a TimeSpan and we don't want to mess with that, plus it's best not to try and mess with the core properties, bit of a standards thing.

There are other ways of doing the next bit in Silverlight by using Converters but this is just my preferred way, if you want to look up converters then [check out this article here](https://bit.ly/oPsbee) (Converters are for transforming data for presentation in XAML)

So add the following cut down property:

```csharp
/// <summary>
/// The <see cref="GameTimeString"> property's name.
/// </see></summary>
public const string GameTimeStringPropertyName = "GameTimeString";

/// <summary>
/// Gets the GameTimeString property.
/// TODO Update documentation:
/// Changes to that property's value raise the PropertyChanged event.
/// This property's value is broadcasted by the Messenger's default instance when it changes.
/// </summary>
public String GameTimeString
{
	get
	{
		return _gameTime.Minutes.ToString("00") + ":" + _gameTime.Seconds.ToString("00");
	}
}
```

This just pushes out the shortened version of the time that the game was using previously.

Next little graphical thing we want to add is a property for the Colour of the text of the Score, if you remember in the XNA game, once the game time gets below 30 seconds it will start flashing red, we want to replicate this again in an MVVM way so we will also provide binding for the colour of the text, so just add the following property as well:

```csharp
/// <summary>
/// The <see cref="GameTimeDisplayColor"> property's name.
/// </see></summary>
public const string GameTimeDisplayColorPropertyName = "GameTimeDisplayColor";

private SolidColorBrush _gameTimeDisplayColor = new SolidColorBrush(Colors.Yellow);

/// <summary>
/// Gets the GameTimeDisplayColor property.
/// TODO Update documentation:
/// Changes to that property's value raise the PropertyChanged event.
/// This property's value is broadcasted by the Messenger's default instance when it changes.
/// </summary>
public SolidColorBrush GameTimeDisplayColor
{
	get
	{
		return _gameTimeDisplayColor;
	}

	set
	{
		if (_gameTimeDisplayColor == value)
		{
			return;
		}

		var oldValue = _gameTimeDisplayColor;
		_gameTimeDisplayColor = value;

		// Update bindings, no broadcast
		RaisePropertyChanged(GameTimeDisplayColorPropertyName);
	}
}
```

As before you'll need to fix the reference for the SolidColorBrush this time.

To finish up in the ViewModel now we just want to add the capability to update the colour of the Time text if we are below the warning threshold and we also want it to flash every other second, to this end (and to save on memory) we'll declare the two colours we want to flash between (Yellow and Red) and then update the core property for the GameTime to set the colour and update the screen, so first add the following two variables to the top of the View Model Class:

```csharp
SolidColorBrush YellowBrush = new SolidColorBrush(Colors.Yellow);
SolidColorBrush RedBrush = new SolidColorBrush(Colors.Red);
```

Then edit the Property for GameTime and replace it with the following:

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
	}
}
```

So from this when the GameTime is updated in the ViewModel, it ensures Silverlight knows that both this value and the GameTimeString values have been updated (to update Data Binding) and then we also force an update of the Game Time Colour when needed.

So that's it for the GameViewModel.cs, for anyone skipping the line just pickup the full class from the downloadable project.

* * *

## In search for an answer

Now you can wire up your views (the individual pages) direct up to a view model but this is not very efficient as each page calling a viewmodel would instantiate a new version of that class plus it can cause your pages to load slower, the answer to this is to use a View Model Locator which acts like a singleton class fro accessing viewmodels, if you go that much further with MVVM you can also use the locator for dependency injections and a lot of other cool things, but the best thing is that all pages are wired up the same way and just point at the locator which in the end makes maintenance and debugging a lot easier (if you watch Laurent's videos you will also learn about blendability which is crucial when designing with Silverlight).

If you want to see more about View Model locators, try out this [article on WindowsPhoneGeek](https://bit.ly/q73uoP) which appeared recently or go back and watch Laurent's videos again.

For now we are just going to add our View Model to the existing View Model Locator and wire it together, nothing fancy.

So open up the ViewModelLocator.cs and add the following three things:

> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/006.png)    Declare the static variable for maintaining the reference to the view model in the header of the ViewModelLocator class
>
> ```csharp
> private static GameViewModel _game;
> ```
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/006.png)    Copy the property section for the Main View del and rename it to GameViewModel and update value names:
>
> ```csharp
> /// <summary>
> /// Gets the Main property which defines the main viewmodel.
> /// </summary>
> [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance",
> 	"CA1822:MarkMembersAsStatic",
> 	Justification = "This non-static member is needed for data binding purposes.")]
> public GameViewModel Game
> {
> 	get
> 	{
> 		return _game;
> 	}
> }
> ```
>
> ![bullet](/assets/img/recovered/2012-07-01-xna-to-silverxna-part-4-degrees-of-separation/006.png)    Finally and arguably the most important!, in the constructor for the ViewModelLocator, instantiate the GameViewModel variable
>
> ```csharp
> _game = new GameViewModel();
> ```
>
> (if you don't do this you will just get null exceptions when using it, like I accidentally di while putting this sample together :D)

Now there are plus sides and downsides to that last section, in reality what we should be doing is only instantiating the GameViewModel when it is first called in the exposed property to comply with proper singleton design patterns, but we are keeping things simple here, plus as this is a game we need that data there as the game starts anyway to get things moving.  In other models where your would use an IoC container and dependency injection there are other practices as well, Laurent goes over this in detail in his Deep Dive session.

Ok, so now we have our backend done it's time to wire up our front end and then we will finish off with tidying up the game code to hook it all up together:

* * *

## Readying the ship for launch

This section becomes a lot easier from all the grunt work above, we will just point the page at our GameViewModel through the ViewModelLocator and then data bind values to properties in that View model.

So first off open up the GameView.XAML and add this section to the end of the list of namespace declarations:

```xml
DataContext="{Binding Game, Source={StaticResource Locator}}
```

So that the finished header of our GamePage.XAML looks like this:

```xml
<phone:PhoneApplicationPage x:Class="SlXnaApp1.GamePage"
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
```

This data binds the data context (the source of information for the page or control) to our GameViewModel, so that when i ask for a property it knows where to look for it.  You can set a data context at a control level if you wish overriding the default page context but that gets quite messy so you would only do it if you really had to.

With that done we'll change what we are currently displaying so it makes more sense from a design perspective, currently we have two textblocks which XNA is writing custom values to, supplying both the label and the value for the information we need to display (Time : 01:59), now that we are working with a proper data model we no longer have that, XNA is just supplying the raw data which is the time.

So from a design perspective we need we actually want one textblock to display the name for the value and then a separate textblock to display the value, this becomes crucial when you want to add multi-lingual support to our game because it's easier to translate the text of the label than try and inject a language in to the string XNA was presenting before.

You can do this manually though Blend (remembering to save your progress in Visual Studio before switching over) if you wish and follow through the previous steps to add a new column marker to the grid and then add two additional textblocks for "TimeValue" and "ScoreValue" into the next column and setting the text values appropriately for the original labels (setting the Grid Colum value to 1 for each of the new textblocks and the correct row value), which I'd recommend you try yourself just to get some practice in.

For the quick of heart and to not make this post longer than it needs to be, here's the resulting XAML for the display that you are aiming for, just use it for comparison if you can:

```xml
<Grid x:Name="ContentPanel">
	<Grid.ColumnDefinitions>
		<ColumnDefinition Width="0.1*"/>
		<ColumnDefinition Width="0.9*"/>
	</Grid.ColumnDefinitions>
	<Grid.RowDefinitions>
		<RowDefinition Height="0.083*"/>
		<RowDefinition Height="0.917*"/>
	</Grid.RowDefinitions>
	<TextBlock x:Name="TimeLabel" Text="Time Left: " Foreground="Yellow"
		TextWrapping="Wrap" Margin="12,12,20,0" d:LayoutOverrides="Width, Height"/>
	<TextBlock x:Name="TimeValue" Foreground="Yellow" TextWrapping="Wrap" Margin="12,12,20,0"
		d:LayoutOverrides="Width, Height" Grid.Column="1"/>
	<TextBlock x:Name="ScoreLabel" Text="Score: " HorizontalAlignment="Left" TextWrapping="Wrap"
		Margin="12,12,0,0" d:LayoutOverrides="Height" Foreground="Yellow" Grid.Row="1"/>
	<TextBlock x:Name="ScoreValue" HorizontalAlignment="Left" TextWrapping="Wrap" Margin="12,12,0,0"
		Foreground="Yellow" Grid.Row="1" d:LayoutOverrides="Height" Grid.Column="1"/>
</Grid>
```

Do not worry about the spacing or order of the properties in the XAML as it's not that important, just ensure you have all the relevant bits, so now we have 4 text boxes, the labels are set to display the correct text for the value field places next to it in the adjacent column.

Now we need to bind our value boxes to our data model, this is easiest to do in Visual Studio, so if you are still in Blend simply save the page you are working on and switch back to it, if you are prompted on returning to Visual Studio to reload pages then do so.

Now open up the GamePage.XAML in the editor.  If you haven't already I'd suggest configuring VS to only open the code editor in full code view and the designer is a bit of a pain and makes the page take longer to load, to do this just open "Tools -Options" in the menu and then find the "Always Open document in full XAML view" setting under the branch "Text Editor -> XAML -> Miscellaneous" (as documented in [this article](https://bit.ly/qDXcZv) which is fine for both VS2008 and VS2010)

In practice it is always best to use Blend for it's design GUI to add controls, build pages, set properties and build animations, leave code editing to VS as it is much better at it and has superior intellisense support.

scroll down to the XAML described above and we can start adding the data binding, we can of course do this graphically in Blend but I find it much easier to do in XAML (my personal view of course, Laurent's videos do show both ways), here we are going to add (or edit if you didn't blank the fields earlier) the Text properties for the two VALUE textblocks, simply add/edit the following property into the Textblock for GameTimeValue:

```xml
Text="{Binding GameTimeString}"
```

What we are saying here is that the value that should be presented in the Text for this control (it can be the Content property in some controls) is provided by the GameTimeString property in out GameViewModel as specified by the page DataContext (hopefully that sounded right).

now the beauty of Data Binging is that it can work for any property (except for the name of the control and a few other choice parameters crucial to it's operation), so if you remember in the GameViewModel we also provided a property for the Colour of the Time values, the binding statement for this would be:

```xml
Foreground="{Binding GameTimeDisplayColor}"
```

Hence setting the foreground (text) colour of the textblock to what the GameViewModel GameTimeDisplayColor property told it to be, remember we also put logic in to change / flash the colour when time was running short and thanks to data binding we do not need to put any fancy animations or states in to make that happen, it all comes from the View model.

The final XAML section after fixing up the Score Value and also setting the foreground of the Time Label (just so both the text and value flash together reusing the same property to set the colour) looks like this:

```xml
<Grid x:Name="ContentPanel">
	<Grid.ColumnDefinitions>
		<ColumnDefinition Width="0.1*"/>
		<ColumnDefinition Width="0.9*"/>
	</Grid.ColumnDefinitions>
	<Grid.RowDefinitions>
		<RowDefinition Height="0.083*"/>
		<RowDefinition Height="0.917*"/>
	</Grid.RowDefinitions>
	<TextBlock x:Name="TimeLabel" Text="Time Left: "
		Foreground="{Binding GameTimeDisplayColor}"
		TextWrapping="Wrap" Margin="12,12,20,0"
		d:LayoutOverrides="Width, Height"/>
	<TextBlock x:Name="TimeValue" Text="{Binding GameTimeString}"
		Foreground="{Binding GameTimeDisplayColor}"
		TextWrapping="Wrap" Margin="12,12,20,0"
		d:LayoutOverrides="Width, Height" Grid.Column="1"/>
	<TextBlock x:Name="ScoreLabel" Text="Score: "
		HorizontalAlignment="Left" TextWrapping="Wrap"
		Margin="12,12,0,0" d:LayoutOverrides="Height"
		Foreground="Yellow" Grid.Row="1"/>
	<TextBlock x:Name="ScoreValue" Text="{Binding GameScore}"
		HorizontalAlignment="Left" TextWrapping="Wrap"
		Margin="12,12,0,0" Foreground="Yellow" Grid.Row="1"
		d:LayoutOverrides="Height" Grid.Column="1"/>
</Grid>
```

* * *

## Now to whip the game in to shape

Now comes the fuzzy part of this chapter in the SilverXNA series, if i were building this from scratch I could build the view model as a core part of the functionality, it's recommended to do this as it makes tombstoning and logic that much easier to track and debug but as we are consuming an existing project and trying to keep support fro the other platforms at a premium were have to work around it a bit.

Truth be told it's not as bad as all that, it simply means where the game would normally output data to the screen we simply update the view model with the new data but in an XNA way of doing things this means every frame ant not just when the value has changed, granted the view model recognises this any only update the Silverlight page when the value does change but it should be better than that.

We also have to account for places where the data is consumed locally at present to point that back to the view model so information is all coming from the same place.

Right, first off let ensure the Code behind for our page knows about the view model we have attached to the display page (The display page and code behind are linked in subtle ways which are geared around information passing from the code to the display page, sometimes getting information out of the display page can take some trickiness, not always just sometimes), so add a variable for the view model to the beginning of the Gamepage.XAML.cs class:

```csharp
ViewModel.GameViewModel vm;
```

While we are looking at properties, lets also clean up and remove those variables that we have moved to the GameViewModel, granted this is not a usual practice but as this is a tutorial it will ensure that we don't miss anything later, delete the following (or at the least comment them out):

```csharp
// When the time remaining is less than the warning time, it blinks on the hud
private static readonly TimeSpan WarningTime = TimeSpan.FromSeconds(30);

private Level level;
```

Next we need to grab the reference for the GameViewModel from the display page as the page is launched so we can use it in the rest of our code behind,, so add the following to the constructor, I find it's best to place it near the top before any timers or other activity:

```csharp
vm = this.DataContext as ViewModel.GameViewModel;
```

Now even though it's in the constructor, the data model wont be populated yet until the page has at least loaded when the binding take place, so ensure you are not trying to do anything with it until then, it's here as a reference once things have got going.  If you need anything in the viewmodel as the game starts then put it in the View model itself.

With all that now in place we just need to update and calls to the original code that was consuming the moved items and REMOVE the Draw Hud call, why?, because it's now completely handled by Silverlight and the View model, we have shifted that whole portion out of the game code for the SilverXNA project.

So replace any reference to "level" and replace it with "vm.GameLevel" like so:

| From | level.Draw(e.ElapsedTime, spriteBatch); |
|---|---|
| To | vm.GameLevel.Draw(e.ElapsedTime, spriteBatch); |

Next just delete (or comment out) all references and calls to the "DrawHud()" and "DrawShadowedString()" functions as we are no longer doing that.

And finally (the bit i don't like at the mo but it's necessary) we need to update the viewmodel with the new values for the Time Remaining and Score of the player so that the screen will be updated, so add the following to the"onUpdate" function right after the "vm.GameLevel.Update" call (has to update the level first so the values will be right):

```csharp
vm.GameTime = vm.GameLevel.TimeRemaining;
vm.GameScore = vm.GameLevel.Score;
```

In reality if we were to do it this way we should use MVVM Commands but that's a reach to try and explain that here, preferably (like I stated) it should be part of the game itself to update this centrally by that would break our multi-platform solution.

And we're done, if you run the project now you should notice ABSOLUTELY NO DIFFERENCE WHATSOEVER.

Brilliant

* * *

## Why did I bother

I can imagine if you followed this chapter through step by step you will be asking yourself that very question, why go through all that change for no visible difference?

the answer simply is because 1: that's how you should do it in the first place and I'm just showing you (in your head) how each piece of the puzzle translates across.  2: the value of implementing this becomes very apparent as we progress in this series adding in additional functionality that Silverlight provides for a fraction of the cost of doing it in XNA.  3: I might be on a sadistic streak but hopefully you will come round to my way of thinking.

MVVM is purely optional and if you wish you can ignore this chapter and just move on, but I recommend learning it because even if you don't use here you will find value in how you design games and apps in the future and the experience of using MVVM makes you think harder about how your game is architected

### If you have more Queries on SilverXNA or just want to ask questions on it, feel free to use the [SilverXNA forum here](/forums/forum/silverxna/)
