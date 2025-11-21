---
layout: post
title: XNA to SilverXNA-part 4 Degrees of Separation
date: 2012-07-01 22:39:39
tags: [silverlight, xna]
---

In yet another area that will be completely foreign to XNA devs (unless you’ have delved into Silverlight or Web programming) is the concept that in reality you should never have code updating the screen directly.

In XNA this is unavoidable simply because XNA is the only thing that draws to the screen and has complete control over everything however the same principle can also be applied to XNA games just to simplify and centralise where all the information comes from when presenting it to the screen, lost yet?, well lets continue.

What we are talking about a design pattern called MVVM, others do exist which are all based on the same rough idea (MVC, MVP, etc), the diagram below aims to help visually represent this (image courtesy of [John Papa’s article](http://visualstudiomagazine.com/articles/2011/08/15/fundamental-mvvm) on Visual Studio magazine [here](http://visualstudiomagazine.com/articles/2011/08/15/fundamental-mvvm)):

![width=](assets/img/posts/image-not-found.png)

As the diagram shows the view (or screen) is independent of the rest of the project just getting information it needs to drive the user experience from a ViewModel (collection of settings), other parts of the application that need to update the information just update the ViewModel as well (in our case the game).

With this separation it means we cannot break (except in rare circumstances) the display of our app or game and it also means we can pass off the final screen presentation to a designer to craft our screen against an agreed set of information the app/game will work with.

All gobbledegook, well I suggest reading a sample of the following articles:

> ![align=](assets/img/posts/image-not-found.png)    [Fundamental MVVM by John papa](http://bit.ly/oSwpOA)  
> ![align=](assets/img/posts/image-not-found.png)    **[Understanding the MVVM Pattern](http://www.galasoft.ch/mvvmvideo1) by Laurent Bugnion (my MVVM hero ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile3.png))**  
> ![align=](assets/img/posts/image-not-found.png)    **[Deep Dive MVVM](http://www.galasoft.ch/mvvmvideo2) also by Laurent Bugnion (he has also the author of MVVM light for Windows Phone)**  
> ![align=](assets/img/posts/image-not-found.png)    [MVVM Light Toolkit: Soup To Nuts](http://bit.ly/oOitH0) by Jessie Liberty

Why do I bring this up?, well as part of this article we will aim to further simplify and box off sections of our game to make it both easier to maintain and add a degree of control while we use Silverlight, one of the big benefits of Silverlight is it is data binding capabilities which means you do not have to (but you can do if you want do) manually update every control on the screen with values from your app/game, the screen is designed to listen to those values and automatically updates appropriately, that can include animations and other cool things as well!.

As usual full source for this chapter can be found [here on Codeplex](http://silverxna.codeplex.com/releases/view/72312 "XNA-SilverXNA Part 4 source"):

Follow along with the series here:

> ![align=](assets/img/posts/image-not-found.png) [Part 1 – an Overview](http://darkgenesis.zenithmoon.com/?p=366)  
> ![align=](assets/img/posts/image-not-found.png) [Part 2 – Getting Started](http://darkgenesis.zenithmoon.com/?p=386)  
> ![align=](assets/img/posts/image-not-found.png) [Part 3 – Adding the first control](http://darkgenesis.zenithmoon.com/?p=406)  
> ![align=](assets/img/posts/image-not-found.png) [Part 4 – MVVM frameworks and Nuget](http://darkgenesis.zenithmoon.com/?p=420) (here)  
> ![align=](assets/img/posts/image-not-found.png) [Part 5 – Controls](http://darkgenesis.zenithmoon.com/?p=443 "SilverXNA Part 5 - Controls")  
> ![align=](assets/img/posts/image-not-found.png) [Part 6 – Adding Animation](http://darkgenesis.zenithmoon.com/?p=496 "SilverXNA Part 6 Animation")  
> ![align=](assets/img/posts/image-not-found.png) [Part 7 – A different approach](http://darkgenesis.zenithmoon.com/?p=505 "SilverXNA Part 7 A different approach")

Also [Channel 9](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) are running a similar [video series here](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) if you prefer videos! ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile3.png)


#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

* * *


## Framework, I do not need no stinking framework

Now you can do all this manually by using the iNotifyPropertyChanged interface throughout your code to sort all this out but it’s just far simpler to use a robust framework to do most of the grunt work for us, my framework of choice is the MVVM Light framework for Windows Phone which is both light and provides MVVM functionality (I bet it took Laurent a whole 5 seconds to come up with that name ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile3.png)) and now that the Windows Phone SDK 7.1 also support NuGet in the Express Edition this is just a few clicks away.

Open up the SilverXNA project in Visual Studio Express and right click on the references folder in the main SilverXNA project:

[![image](/assets/img/wordpress/2012/07/image63.png "image")](/assets/img/wordpress/2012/07/image61.png)

If you do not get the “Manage NuGet Packages” option then you most likely do not have the latest tools installed (You need the RTM version or above).

Select the NuGet option and you will be presented with the NuGet Package manager, from here you can search for and install new packages or see if there are any updates to existing installed one’s.  This is truly an invaluable tool which is a great addition to the express tools.  Unfortunately there is no online review library of NuGet packages (that I’m aware of) so you will have to rely on searching or reading about your favourite packages on the web but full details about each package are available through the package manager.

[![image](/assets/img/wordpress/2012/07/image64.png "image")](/assets/img/wordpress/2012/07/image62.png)

Search for MVVM and you should see the list above with the package we want right at the very top (as you can see there are lots of other MVVM packages out there so if you feel like trying a few others then feel free to experiment with what’s good for you), for now just click install on the MVVVM Light package.

When it is installed you will see it has done several things, it is installed and added references to the MVVM light libraries and added some template files for use as well.  If there were any dependencies on other packages then they would have been installed as well all with a single click of a button, simples!.

| [![image](/assets/img/wordpress/2012/07/image65.png "image")](/assets/img/wordpress/2012/07/image63.png) | So from the screenshot left you can see:

> ![align=](assets/img/posts/image-not-found.png)    The MVVM Light libraries for WP7 7.1  
> ![align=](assets/img/posts/image-not-found.png)    A new folder with some template files  
> ![align=](assets/img/posts/image-not-found.png)    The App.XAML has also bee updated with new configuration

NuGet can do some astounding things with packages so it is really something to keep an eye on.

Usually the packages also come with a ReadMe file to aid with any additional setup tasks that are required to get up and running but it is missing in MVVM light at present but not to worry I know what I am doing……

 |

* * *


## A New view for an old face

In short this is how MVVM Light operates on Windows Phone (it is not exactly the same for all frameworks).

You have a page and corresponding ViewModel for that page which work together to present information to the screen safely.  Behind that you have a ViewModelLocator, this is the wiring panel behind the scenes that connects everything up, in more advanced cases it also provides the capability to plug in different data sources for your models from a central location providing another level of abstraction.

It is all words at this point and I’m only going to go over the simple things for now so it all becomes clearer, to see the advanced stuff in MVVM I suggest going through the material mentioned earlier, they are truly fantastic.

You can have Models to also describe your data but in this instance it is a but too much so in effect our game is our model and engine driving what is being sent to the screen in SilverXNA IMHO.

Enough of this lets get something done.  if we analyse what we are currently using as data to send information to the screen in our Gamepage.XAML.cs (remembering that from a MVVM / Silverlight approach, storing values in our code behind is generally not a good idea because it cannot be reused) there are a few things (well a lot really but we are still keeping to baby steps, you can experiment later) that we could do with taking out of there, namely:

> ![align=](assets/img/posts/image-not-found.png)    The Level attribute – used to see what our current level is and persists information about the player state  
> ![align=](assets/img/posts/image-not-found.png)    The value for drawing the Time remaining to the screen  
> ![align=](assets/img/posts/image-not-found.png)    The value for the players score  
> ![align=](assets/img/posts/image-not-found.png)    A maintenance value for how long should pass before the player should be warned time is running short

These are the core things we want to look at in this session, there are several others (most of them really) that a page should not need to know about but we will leave them along for now.

So lets add out GameViewModel for our GamePage, just right click on the “ViewModel” folder and select “Add –\> New Item”, click on the “Silverlight for windows Phone” branch in the tree on the left and select “MVVMViewModel (WP7)” then give it a name of “GameViewModel.cs”

[![image](/assets/img/wordpress/2012/07/image66.png "image")](/assets/img/wordpress/2012/07/image64.png)

If the project templates do not show up in the “Add New Item” browser then you can get them from the [MVVMLight codeplex page](http://mvvmlight.codeplex.com/releases/71278/download/267119 "MVVM Light Full installer package"), else you can just copy the “MainViewModel.cs” file and rename it to “GameViewModel.cs” (remembering to also rename the classes and methods within since VS Express does not do this for you like the full studio edition)

Once you have done that open it up and it should look something like this:

     ![image](/assets/img/wordpress/2012/07/image68.png "image")
    
    MVVM also comes with a heap load of code snippets to make building out our View Model all that more easier (See why I love that Laurent guy), hit tab twice and exploding onto your screen will be a nice new fully fledged property all wired up for MVVM:
    
    
    
    
        
    
        Type “GameLevel” and hit Tab – this is the property public name  
     ![align=](assets/img/posts/image-not-found.png)    Type “Level” and hit the right arrow– this is the type for the property, in this case it is not recognised but we will fix that afterwards, we have to use the right arrow key because hitting tab would cause intellisense to make something up, lol  
     ![align=](assets/img/posts/image-not-found.png)    Type “\_gameLevel” and hit tab – this is the private name for the property  
     ![align=](assets/img/posts/image-not-found.png)    Lastly we have a choice to make as there are two options for how MVVM notifies Silverlight of changes to values, either throu a simple notification or whether it broadcasts it through messaging.  Too much to go through here so for now just remove the “NotImplemented” Line (a safety measure to ensure you check this) and the second “RaisePropertyChanged” line which talks about messaging.  
     ![align=](assets/img/posts/image-not-found.png)    To finish off right click on the red squiggle for the Level type and resolve the reference.
    
    So you should be left with the following:
    
    
    
    
        
    
        WarningTime (type Timespan)  
     ![align=](assets/img/posts/image-not-found.png)    GameTime (type TimeSpan)  
     ![align=](assets/img/posts/image-not-found.png)    GameScore (type int)
    
    Feel free to add them yourself or just copy the entire GameViewModel.cs from download package mentioned at the start of the chapter.(do not forget to resolve any missing references, like TimeSpan)
    
    
    
    Now to add some additional features which will aid our end design for the page and show off a bit of what MVVM can do for you with Data Binding.  The first one we will add is a new Property to display the GameTime as a string, you can just show the TimeSpan value as test however with you get days, hours, minutes, seconds and milliseconds it can look a little busy.  You may ask “Well why not just fix up the existing property to output a string?”, simple answer the XNA game outputs a TimeSpan and we do not want to mess with that, plus it is best not to try and mess with the core properties, bit of a standards thing.
    
    
    
    There are other ways of doing the next bit in Silverlight by using Converters but this is just my preferred way, if you want to look up converters then [check out this article here](http://bit.ly/oPsbee "Introduction to Silverlight Converters") (Converters are for transforming data for presentation in XAML)
    
    
    
    So add the following cut down property:
    
    
    
    
        
        
            
            
                
                
                    article on WindowsPhoneGeek which appeared recently or go back and watch Laurent’s videos again.
                    
                    For now we are just going to add our View Model to the existing View Model Locator and wire it together, nothing fancy.
                    
                    
                    
                    So open up the ViewModelLocator.cs and add the following three things:
                    
                    
                    
                    > ![align=](assets/img/posts/image-not-found.png)    Declare the static variable for maintaining the reference to the view model in the header of the ViewModelLocator class
                    > 
                    >     
                    > 
                    >     Copy the property section for the Main View del and rename it to GameViewModel and update value names:
                    > 
                    >     
                    > 
                    >     Finally and arguably the most important!, in the constructor for the ViewModelLocator, instantiate the GameViewModel variable
                    > 
                    >     
                    > 
                    > )
                    > 
                    > Now there are plus sides and downsides to that last section, in reality what we should be doing is only instantiating the GameViewModel when it is first called in the exposed property to comply with proper singleton design patterns, but we are keeping things simple here, plus as this is a game we need that data there as the game starts anyway to get things moving.  In other models where your would use an IoC container and dependency injection there are other practices as well, Laurent goes over this in detail in his Deep Dive session.
                    > 
                    > Ok, so now we have our backend done it is time to wire up our front end and then we will finish off with tidying up the game code to hook it all up together:
                    > 
                    > * * *
                    > 
                    > ## Readying the ship for launch
                    > 
                    > This section becomes a lot easier from all the grunt work above, we will just point the page at our GameViewModel through the ViewModelLocator and then data bind values to properties in that View model.
                    > 
                    > So first off open up the GameView.XAML and add this section to the end of the list of namespace declarations:
                    > 
                    > \<phone:PhoneApplicationPage x:Class="SlXnaApp1.GamePage" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:phone="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone" xmlns:shell="clr-namespace:Microsoft.Phone.Shell;assembly=Microsoft.Phone" xmlns:d="http://schemas.microsoft.com/expression/blend/2008" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" FontFamily="{StaticResource PhoneFontFamilyNormal}" FontSize="{StaticResource PhoneFontSizeNormal}" Foreground="{StaticResource PhoneForegroundBrush}" SupportedOrientations="Landscape" Orientation="Landscape" mc:Ignorable="d" d:DesignHeight="480" d:DesignWidth="800" shell:SystemTray.IsVisible="False" DataContext="{Binding Game, Source={StaticResource Locator}}"\>
                    > 
                    > This data binds the data context (the source of information for the page or control) to our GameViewModel, so that when i ask for a property it knows where to look for it.  You can set a data context at a control level if you wish overriding the default page context but that gets quite messy so you would only do it if you really had to.
                    > 
                    > With that done we will change what we are currently displaying so it makes more sense from a design perspective, currently we have two textblocks which XNA is writing custom values to, supplying both the label and the value for the information we need to display (Time : 01:59), now that we are working with a proper data model we no longer have that, XNA is just supplying the raw data which is the time.
                    > 
                    > So from a design perspective we need we actually want one textblock to display the name for the value and then a separate textblock to display the value, this becomes crucial when you want to add multi-lingual support to our game because it is easier to translate the text of the label than try and inject a language in to the string XNA was presenting before.
                    > 
                    > You can do this manually though Blend (remembering to save your progress in Visual Studio before switching over) if you wish and follow through the previous steps to add a new column marker to the grid and then add two additional textblocks for “TimeValue” and “ScoreValue” into the next column and setting the text values appropriately for the original labels (setting the Grid Colum value to 1 for each of the new textblocks and the correct row value), which I would recommend you try yourself just to get some practice in.
                    > 
                    > For the quick of heart and to not make this post longer than it needs to be, here is the resulting XAML for the display that you are aiming for, just use it for comparison if you can:
                    > 
                    > \<Grid x:Name="ContentPanel"\> \<Grid.ColumnDefinitions\> \<ColumnDefinition Width="0.1\*"/\> \<ColumnDefinition Width="0.9\*"/\> \</Grid.ColumnDefinitions\> \<Grid.RowDefinitions\> \<RowDefinition Height="0.083\*"/\> \<RowDefinition Height="0.917\*"/\> \</Grid.RowDefinitions\> \<TextBlock x:Name="TimeLabel" Text="Time Left: " Foreground="Yellow" TextWrapping="Wrap" Margin="12,12,20,0" d:LayoutOverrides="Width, Height"/\> \<TextBlock x:Name="TimeValue" Foreground="Yellow" TextWrapping="Wrap" Margin="12,12,20,0" d:LayoutOverrides="Width, Height" Grid.Column="1"/\> \<TextBlock x:Name="ScoreLabel" Text="Score: " HorizontalAlignment="Left" TextWrapping="Wrap" Margin="12,12,0,0" d:LayoutOverrides="Height" Foreground="Yellow" Grid.Row="1"/\> \<TextBlock x:Name="ScoreValue" HorizontalAlignment="Left" TextWrapping="Wrap" Margin="12,12,0,0" Foreground="Yellow" Grid.Row="1" d:LayoutOverrides="Height" Grid.Column="1"/\> \</Grid\>
                    > 
                    > Do not worry about the spacing or order of the properties in the XAML as it is not that important, just ensure you have all the relevant bits, so now we have 4 text boxes, the labels are set to display the correct text for the value field places next to it in the adjacent column.
                    > 
                    > Now we need to bind our value boxes to our data model, this is easiest to do in Visual Studio, so if you are still in Blend simply save the page you are working on and switch back to it, if you are prompted on returning to Visual Studio to reload pages then do so.
                    > 
                    > Now open up the GamePage.XAML in the editor.  If you have not already I would suggest configuring VS to only open the code editor in full code view and the designer is a bit of a pain and makes the page take longer to load, to do this just open “Tools –Options” in the menu and then find the “Always Open document in full XAML view” setting under the branch “Text Editor –\> XAML –\> Miscellaneous” (as documented in [this article](http://bit.ly/qDXcZv) which is fine for both VS2008 and VS2010)
                    > 
                    > In practice it is always best to use Blend for it is design GUI to add controls, build pages, set properties and build animations, leave code editing to VS as it is much better at it and has superior intellisense support.
                    > 
                    > scroll down to the XAML described above and we can start adding the data binding, we can of course do this graphically in Blend but I find it much easier to do in XAML (my personal view of course, Laurent’s videos do show both ways), here we are going to add (or edit if you did not blank the fields earlier) the Text properties for the two VALUE textblocks, simply add/edit the following property into the Textblock for GameTimeValue:
                    > 
                    >     
                    >     
                    > \<Grid x:Name="ContentPanel"\> \<Grid.ColumnDefinitions\> \<ColumnDefinition Width="0.1\*"/\> \<ColumnDefinition Width="0.9\*"/\> \</Grid.ColumnDefinitions\> \<Grid.RowDefinitions\> \<RowDefinition Height="0.083\*"/\> \<RowDefinition Height="0.917\*"/\> \</Grid.RowDefinitions\> \<TextBlock x:Name="TimeLabel" Text="Time Left: " Foreground="{Binding GameTimeDisplayColor}" TextWrapping="Wrap" Margin="12,12,20,0" d:LayoutOverrides="Width, Height"/\> \<TextBlock x:Name="TimeValue" Text="{Binding GameTimeString}" Foreground="{Binding GameTimeDisplayColor}" TextWrapping="Wrap" Margin="12,12,20,0" d:LayoutOverrides="Width, Height" Grid.Column="1"/\> \<TextBlock x:Name="ScoreLabel" Text="Score: " HorizontalAlignment="Left" TextWrapping="Wrap" Margin="12,12,0,0" d:LayoutOverrides="Height" Foreground="Yellow" Grid.Row="1"/\> \<TextBlock x:Name="ScoreValue" Text="{Binding GameScore}" HorizontalAlignment="Left" TextWrapping="Wrap" Margin="12,12,0,0" Foreground="Yellow" Grid.Row="1" d:LayoutOverrides="Height" Grid.Column="1"/\> \</Grid\>
                    >     
                    >     
                    >     
                    >     
                    > * * *
                    >     
                    > ## Now to whip the game in to shape
                    >     
                    >     
                    > Now comes the fuzzy part of this chapter in the SilverXNA series, if i were building this from scratch I could build the view model as a core part of the functionality, it is recommended to do this as it makes tombstoning and logic that much easier to track and debug but as we are consuming an existing project and trying to keep support fro the other platforms at a premium were have to work around it a bit.
                    >     
                    >     
                    >     
                    > Truth be told it is not as bad as all that, it simply means where the game would normally output data to the screen we simply update the view model with the new data but in an XNA way of doing things this means every frame ant not just when the value has changed, granted the view model recognises this any only update the Silverlight page when the value does change but it should be better than that.
                    >     
                    >     
                    >     
                    > We also have to account for places where the data is consumed locally at present to point that back to the view model so information is all coming from the same place.
                    >     
                    >     
                    >     
                    > Right, first off let ensure the Code behind for our page knows about the view model we have attached to the display page (The display page and code behind are linked in subtle ways which are geared around information passing from the code to the display page, sometimes getting information out of the display page can take some trickiness, not always just sometimes), so add a variable for the view model to the beginning of the Gamepage.XAML.cs class:
                    >     
                    >     
                    >     
                    >     
                    >         
                    >         
                    >             
                    >             
                    >                 
                    >             
                    >         
                    >         
                    >     
                    >     
                    >     
                    >     
                    > | From | 
                    >     
                    >     
                    > To
                    >     
                    >     
                    > | 
                    >     
                    >     
                    >         
                    >         
                    > SilverXNA forum here
                    >         
                    >     
                    >     
                    >     
                    > |
                    
                
                
            
            
        
        
    
    
    
    
    

