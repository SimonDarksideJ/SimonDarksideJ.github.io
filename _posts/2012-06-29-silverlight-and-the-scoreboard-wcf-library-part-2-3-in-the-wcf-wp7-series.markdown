---
layout: post
title: Silverlight and the Scoreboard WCF library (part 2 / 3 in the WCF WP7 series)
date: 2012-06-29 21:22:26
tags: [networking, windows phone, silverlight]
---

Right on the heals of the [last post](/blogs/darkgenesis/archive/2010/09/03/can-we-get-a-little-service-here) detailing the Silverlight WCF service library for the Scoreboard service (formally known as the leaderboard service), here is a sample Silverlight application consuming that service to manage the Scoreboards on there. It implements all but the Register Leaderboard WCF method in the service.

It is goal is to list all Scoreboards registered on the service, list all the scores with those Scoreboards the client has access to (remember the access keys!) and be able to update those scores manually. The last bit was just a little extra so if you wanted to update scores in a game, you have an example how to within this service.

Now remember this is a sample, it is not a perfect service and should be extended if you wanted to take it further, some of the methods are very brutish, but they work well for what the sample is trying to demonstrate. Thanks again to Charles (complains about his own name) Humphrey for providing the WCF service for this sample.

Sample as as always posted up on the [Codeplex host for this series](http://startrooper2dxna.codeplex.com/releases/view/51292).

* * *


## \*\*A reminder note from the previous session

A wise person noted that by using the word LEADERBOARD, I may be conflicting with the XBOX live Leaderboard system. But this sample is not affiliated with the XBOX Live Leaderboard system in anyway. And reference to persons living or dead is purely coincidental.

I did look into renaming Leader board to Scoreboard, but it was too late (I was about to hit publish) and it will take to long to revise it at this time, if anyone has any issues please let me know and I will sort it out.

For now, where you see Leader Board, think scoreboard. **This sample is not an XBOX Live Leaderboard integration sample** , it is purely a sample scoreboard system using custom WCF services.

* * *


### Getting started

No fluffing around with explanations for anything this time, lets dive straight in to the project, if you need to know more about how this works check the [previous article](/blogs/darkgenesis/archive/2010/09/03/can-we-get-a-little-service-here) and [probably this one](/blogs/darkgenesis/archive/2010/08/24/wcf-on-the-windows-phone-7-the-how-to-guide) as well.

So if you have not done so already start up “Visual Tools 2010 express for windows phone” (Or VS 2010 itself if you are using that ![Winking smile](/assets/img/wordpress/2012/06/wlEmoticon-winkingsmile5.png)) and create a new Windows Phone Application under the “Silverlight for Windows Phone” section (or open your existing project) and then right click on your solution and select “Add –\> Existing Project”. Select your local copy of the Library from the previous post (or download the library from the previous sample and use that). This should give you a project with both your new Phone app and the WCF scoreboard library attached.

As before just to make sure everything is OK, go ahead and build your project.

![image](assets/img/posts/image-not-found.png)

* * *


### First things first, get our app ready to use the Library

Now as mentioned a few times in the first article, in order to use a WCF library in our project, we need to do a couple of things, for Silverlight this requires:

> ![](assets/img/posts/image-not-found.png) Adding a reference to the Library   
> ![](assets/img/posts/image-not-found.png) Copying the Client Configuration file to the Phone Application project (or where ever the service will be called from)

Adding the reference is just as simple (if not more so) than adding a service reference, simply right click on the References folder (in your Phone application project, NOT the library) and selecting Add Reference (NOT service reference as before). Then click on the tab that says “Projects” and you should see the screen below:

![image](assets/img/posts/image-not-found.png)

Click OK, and that is done. Next just right click on the “ServiceReferences.ClientConfig” file in the Library and paste it in to your Phone application project, so that your solution explorer now looks like this:

![image](assets/img/posts/image-not-found.png)

* * *


### First steps – handling the data

For our app to handle the data we need a central place to maintain and keep it. Remember that when you navigate from page to page, the page you left is destroyed to make room for the new one. SO if you want to capture data between pages you either have to pass that information to the new page or store it statically somewhere, the best lace to do this is in the Applications start up class the App class.

If you find App.XAML in the solution explorer and expand it you will find the code behind for it in the APP.CS class.

App.XAML is good for keeping any Silverlight presentation resources, like the application name and page headers, these can then be used in other pages XAML definitions. The App.CS is good as a central code or function storage for the entire application. Best to only use it wisely though or it could bloat your app if you store everything there!.

Open up App.CS and add the following to the start of the App class:

    //Static view model for the Scoreboard libraryprivate static LeaderBoardSilverlightLibrary.LeaderBoard leaderBoardLibrary;public static LeaderBoardSilverlightLibrary.LeaderBoard LeaderBoardLibrary { get { // Delay creation of the view model until necessary if (leaderBoardLibrary == null) leaderBoardLibrary = new LeaderBoardSilverlightLibrary.LeaderBoard(); return leaderBoardLibrary; } }// Static view model for Scoreboardsprivate static LeaderBoardSilverlightLibrary.LeaderBoardsViewModel leaderBoardsViewModel = null;public static LeaderBoardSilverlightLibrary.LeaderBoardsViewModel LeaderBoardsViewModel { get { // Delay creation of the view model until necessary if (leaderBoardsViewModel == null) leaderBoardsViewModel = new LeaderBoardSilverlightLibrary.LeaderBoardsViewModel(); return leaderBoardsViewModel; } set { leaderBoardsViewModel = value; } }

All this does is define two static variables and public properties for them, this allows us to control how the variables are instantiated and what access the rest of the application has to them (commonly referred to as the Singleton practice)

Here we have variables to store one view model for holding our collection of Scoreboards and another for the Scoreboard service itself. SO we can keep a centralised data storage for all pages and a single reference to the Scoreboard Library.

That is the setup done, lets now switch to Blend! More on these later.

* * *


### Blending it up baby

Ok, a little corny title for this section but I’ve been waiting ages to use it ![Smile](/assets/img/wordpress/2012/06/wlEmoticon-smile1.png).

Right, if you have not guessed already fire up “Microsoft Expression Blend for Windows Phone” (beta). Once it has loaded, close the helpful start up window (if it pops up) and then select File –\> Open project / solution from the Menu. Then navigate to the folder where your phone project is located and click “Open”

Now do not panic at this point, it is perfectly fine to have BOTH Visual Studio and Blend open together on the same project, in fact it is a damn fine idea. Makes life so much easier when you need to switch from doing UI work on your Phone project to doing code work and back.

You should now see the following screen:

![image](assets/img/posts/image-not-found.png)

Now if you do not see the Library in the Project solution explorer on the top left hand side of the window, this just means you did not build your project in Visual Studio. So close the project in Blend, go back to Visual Studio and hit F6 (check there are still no errors) and then come back to Blend and reopen the solution again.

Now if you have not used blend before, there is a few things to keep an eye on that are important. First the Objects and timeline window, this is where everything you add to the Phone screen is listed in order of display, things at the back at the top and things in the foreground at the bottom (ever wonder by you cannot see something on the screen or a button is being hit when it is not visible, then check this order and it will help).

The other thing of note is the Assets tab, which lists all the controls and behaviours you can use to build your project. this is grouped up so it is easy to find what you are looking for:

![image](assets/img/posts/image-not-found.png)

Also note the little blue link, where you can browse the “Expression Gallery” online to find more controls and features to use in your project. You can of course write your own controls but that is a little advanced for what were doing here.

I will note at this point, I only intend to walk you through the key features I used to integrate the WCF library in to the project, I am not going to show how to build everything, that would just be repetitive. Just enough so you can then play with the solution yourself and learn how to put it together. As always, this is my way of doing this, if you have another way, use that!.

* * *


### The Main Page

Now the first (an only unless you selected a different project template) screen you can see is the Main Page. As far as I am aware, do not rename this page to something else, I believe (although I am not certain so by all means check for yourself) that you cannot rename this page (and definitely NOT the APP.XAML page) else the project may not start.

![image](assets/img/posts/image-not-found.png)

Here you get a default Page header and a Title bar. (read this Blog for good suggestions for handling and setting these up). Below that is the default content grid where your app should display things.

Now you could if you want do away with everything on the screen and do everything yourself, just delete everything under the layout Root (which is the page itself) and start fresh. But again that is a bit beyond what want to do here.

So to start off we want to display the list of Scoreboards available for us to manage from the WCF service. For this, we need to:

> ![](assets/img/posts/image-not-found.png) Add a list to display the Scoreboards   
> ![](assets/img/posts/image-not-found.png) Bind the list to the data we are going to get from the service   
> ![](assets/img/posts/image-not-found.png) Call the “GetLeaderBoards” WCF service   
> ![](assets/img/posts/image-not-found.png) Create a handler to receive the data from the service and bind to the List   
> ![](assets/img/posts/image-not-found.png) Hook up to the Service completed event to tie it all up together

SO lets get the UI bits out of the way first and then move to the code behind. Adding a list could not be simpler really. just select the “ContentGrid” in the Objects and Timelines panel, then find the “Listbox” in the assets panel and double click on it. Alternatively you can drag the “list box” control on to the page where you want it displayed.

Now switch in to selection mode by clicking the Top most pointer in the left hand toolbox (or by hitting V on the Keyboard) and right click on the new control in the main window.

![image](assets/img/posts/image-not-found.png)

Don’t worry if the list box for the control disappears, this just means you accidentally deselected it, just click on it again in the objects and timelines window. Once you have right clicked on it, select “Auto Size –\> Fill” as shown above. This will ensure the list box uses all of the screen space available to it.

Next thing we need to do here is to give it a proper name, this just makes it easier to code against. Just double click on the List box in the Objects and timelines panel and give it a proper name, like “ScoreboardListbox”

To finish up the list box we need to create a template for the items in the listbox, if not we are left with the default template, which is just rubbish. Right click on the list box and select “Edit Additional Templates –\> Edit Generated Item Container –\> Edit a copy”. Give the new template a name (like “ScoreboardsItemTemplate”) and click OK.

![image](assets/img/posts/image-not-found.png)

Now you should be presented with a new screen which is focusing on editing the template for items in the list box.

![image](assets/img/posts/image-not-found.png)

now as you can see there is not much here, so lets add some fields and add my most used used control in Blender, the stack panel.

Select the “ContentContainer” in the objects panel and then click on the “StackPanel” control in the assets panel (found under controls –\> panels), which will replace the ContentContainer with a Stackpanel. If you now look at the properties pane (on the other side of the screen hopefully). In the Layout section, change the width of the StackPanel to 470 (just short of the width of the screen), the height to 70 and change the orientation to Horizontal (to stack items Horizontally).

![image](assets/img/posts/image-not-found.png)

I will explain a bit more about why we did this after we finish up this template.

Now with our stack panel selected, open up the “Projects” tab and find the “ApplicationIcon.PNG” file and double click on it. Go back to the Assets panel and find the “Textblock” control and double click it twice to add two textblocks.

You should now have the following in your design and object windows:

![image](assets/img/posts/image-not-found.png) ![image](assets/img/posts/image-not-found.png)

Now rename the first Textblock to ScoreBoardName and the second to Owner. Then resize then appropriately. Also change the font size up a bit by selecting the item and changing the size in the text section. (sizes 24 and 18 are a good start).

With all this ready, now would be a good time to hit save (Save often with Blend, especially with the Beta).

Now switch back to Visual Studio and we will add the bindings and code behind. It has been shown in some of the Mix videos, that we should just be able to import a ViewModel in to Blend and then drag and drop the model to create a list and have the data bound automatically. However I could not get this to work.

* * *


### Data Binding 

You should be asked to reload the project on returning to Visual Studio, as it has determined that you have been editing elsewhere, so just click “Yes to All” to this. (the same happens in Blend as well). The key thing to note here when editing the project in to places, is to save before you switch between them, else you changes will not be carried across and worse, if you then save in the other app, you are changes will be gone! (granted, you still have your changes still open in the other editor, but you are going to loose one set of your changes!)

First off the Binding, this needs to be done in the XAML for the Main page, so open up MainPage.XAML. Now this is one of the things I really like about editing XAML in visual studio, you also get intellisense for free. You do get a level of intellisense in Blend when editing XAML, but it does not include the programming and events, which is a pain.

You should now see two things in the XAML, the new Scoreboard list in the content grid section:

    \<!--ContentPanel - place additional content here--\> \<Grid x:Name="ContentGrid" Grid.Row="1"\> \<ListBox x:Name="Scoreboard\_ListBox" ItemContainerStyle="{StaticResource ScoreboardsItemTemplate}"/\> \</Grid\>

And the new resource template for your list box items

    \<phone:PhoneApplicationPage.Resources\> \<Style x:Key="ScoreboardsItemTemplate" TargetType="ListBoxItem"\> \<Setter Property="Background" Value="Transparent"/\> \<Setter Property="BorderThickness" Value="0"/\> \<Setter Property="BorderBrush" Value="Transparent"/\> \<Setter Property="Padding" Value="0"/\> \<Setter Property="HorizontalContentAlignment" Value="Left"/\> \<Setter Property="VerticalContentAlignment" Value="Top"/\> \<Setter Property="Template"\> \<Setter.Value\> \<ControlTemplate TargetType="ListBoxItem"\> \<StackPanel Width="470" Orientation="Horizontal" Height="70"\> \<Image Source="/ApplicationIcon.png" Stretch="Fill" Width="62"/\> \<TextBlock x:Name="ScoreBoardName" TextWrapping="Wrap" Text="TextBlock" FontSize="32" Width="261"/\> \<TextBlock x:Name="Owner" TextWrapping="Wrap" Text="TextBlock" FontSize="24"/\> \</StackPanel\> \</ControlTemplate\> \</Setter.Value\> \</Setter\> \</Style\> \</phone:PhoneApplicationPage.Resources\>

Firstly , we will add data binding to the List box, to tell it which data component it will be reading. At the end add a new “ItemsSource” property with the value of “{Binding Leaderboards}”, like so:

    \<ListBox x:Name="Scoreboard\_ListBox" ItemContainerStyle="{StaticResource ScoreboardsItemTemplate}" ItemsSource="{Binding Leaderboards}"/\>

What this has done, has state that in our ViewModel, the listbox should list items in the Leaderboards collection. Next the list items also need to know what data to show from this collection, so in the same way as above we need to modify the TextBlocks in our template, like so:

    \<TextBlock x:Name="ScoreBoardName" TextWrapping="Wrap" Text="{Binding Name}" FontSize="32" Width="261"/\>

The main difference here, is that we are binding the “Text” field for the TextBlock, so that it displays the data we wish. So the list connects to the collection and the textblocks show the Name and Owner fields for each item in that collection. However at this point our page has no actual data yet, so that is next.

* * *


### Code Behind to call the WCF Service

Since all the hard work is done in the library, we only need a small amount of effort here to use it. It comprises of two parts, calling the WCF service for data and an event handler to watch for the data coming back and handling it

Now the best way to do this is in reverse, set up the event handler and then call it ![Winking smile](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8422.wlEmoticonwinkingsmile_5F00_3FA8F455.png).

So first off like we did before in the library, we need to hook up to the completed event in the library and create a function to handle it. Expand the solution explorer on the MainPage.XAML and then open the MainPage.XAML.CS file behind it.

First off, don’t forget to add a using statement for the WCF Library, like so: (at the beginning of the file with the other using statements)

    using LeaderBoardSilverlightLibrary;

Now add or type the following in the MainPage constructor (MainPage()): (I would recommend typing it in to get used to it)

    App.LeaderBoardLibrary.LeaderBoardsReceivedEvent += new LeaderBoardSilverlightLibrary.LeaderBoard.LeaderBoardsReceivedEventArgsHandler(leaderBoard\_LeaderBoardsReceivedEvent);

Then add the handle function below:

    void leaderBoard\_LeaderBoardsReceivedEvent(object sender, LeaderBoardsReceivedEventArgs e) { App.LeaderBoardsViewModel = e.LeaderBoard; DataContext = App.LeaderBoardsViewModel; }

SO when the WCF service has completed getting our scoreboards, the receiving function then sets the application ViewModel to the response (so we can re use it in the app) and then more importantly, sets the Data Context of the page to the ViewModel. By setting this, all controls on the page use the same data for populating data bound controls.

Lastly, we just need to call the service and since we want to do this when ever anyone navigates to the page, we are going to overload the “onNavigatedTo” function, like so:

    // When page is navigated to, set data context protected override void OnNavigatedTo(NavigationEventArgs e) { base.OnNavigatedTo(e); // Set the data context of the listbox control to the sample data if (DataContext == null) App.LeaderBoardLibrary.GetLeaderBoards(); }

Here we simply call the WCF service if we have no data.

Now one strange this is that to use the “onNavigatedTo” function, we also need to add another using statement for the Phones navigation service. I find this odd because should not all pages have this by default?, anyway add this to the Using statements as before:

    using System.Windows.Navigation;

After all that run the project up and you should have something like the following:

![image](assets/img/posts/image-not-found.png)

* * *


### Hints and Tips

So you have your first set of data bound and populated by a WCF service.

You may (or may not) wonder why I added an image to the list item template. Simple answer to this is that it is easy to see where problems arise if you use static resources in lists. If your binding is wrong on the list you will see nothing, however if your list binding is correct but you have misspelt your data elements, then you will also see nothing, unless you have an image or other static resource in the list. Just makes it easier to see where the problem is.

One of the biggest problems I had when starting using WCF services, was that I could not see any data, however by binding and data was correct, I just had to alter the data elements. But as far I was aware the service was not working. That was until I added the image in to the item template, so now I always do, at least for test.

Another good tip, is to use the Phone default styles, to use these simply right click on any object, select edit style and then Apply resource. What you will see are the many built in styles for controls. They are not that varied, but enough to give you a basic feel. (In Blend)

* * *


### The Scoreboard Items page

Now we have our list of Scoreboards it would be nice if we could also see the scores held within, so create a second page and then repeat the steps above for creating a list. For the Lits item template however we will need to do something different. First create and edit the template as before.

Next, click on the “Projects” tab on the top left hand corner of the screen and find the “ApplicationIcon.png” file, double click on it to add it on to the screen. Next switch back to the “Assets” tab and double click on the Stackpanel control to add another one. Next in the Objects panel select the top most StackPanel, then find the TextBlock control and double click on it.

Now you should have the following in your design window and Objects panel:

![image](assets/img/posts/image-not-found.png) ![image](assets/img/posts/image-not-found.png)

Here our template now has three items side by side in our main stack panel. Now we just need a few more items and then we can walk through it.

Now click on the Stackpanel in between the image and textblock, then go back to the assets panel and double click on Textblock two more times.

Your design and objects windows should now look like this:

![image](assets/img/posts/image-not-found.png) ![image](assets/img/posts/image-not-found.png)

Next size the textblocks how you wish and set the font sizes appropriately. Play around with the settings till you get something you like. Do not forget to also rename the controls, so you can find them easier later in XAML.

I went for the Player name and Time in the centre section and the score on the right hand side like this:

![image](assets/img/posts/image-not-found.png)

With the list setup, you need to save and switch back to visual studio to do the data binding and code behind

* * *


### Data Binding for individual Scoreboard

Open up the XAML for you page and find your list. To data bind this list you need to add:

     ItemsSource="{Binding Scores}"

To identify you are linking this list to the Scores collection in the View Model. As for the data items, they are as follows:

    \<TextBlock x:Name="Player" Text="{Binding Player}" TextWrapping="Wrap" Style="{StaticResource PhoneTextGroupHeaderStyle}" FontSize="26.667" /\>\<TextBlock x:Name="Time" Text="{Binding Time}" TextWrapping="Wrap" Style="{StaticResource PhoneTextSmallStyle}"/\>\<TextBlock x:Name="Score" Text="{Binding Score}" TextWrapping="Wrap" Height="100" Width="136" Style="{StaticResource PhoneTextAccentStyle}" FontSize="26.667" LineHeight="8" TextAlignment="Center" VerticalAlignment="Center" /\>

Binding to the Player, Time and Score elements.

* * *


### Code behind for individual scoreboard.

Now in the code behind we need to add a bit more flair. If you have already looked at the default “List and Details” phone project, this should be familiar to you. Since we use the list from the MainPage, to select a specific Scoreboard and then display it in this page, we need to get the context from the main page. To this we will update the MainPage code behind first to send us this data.

Open up MainPage.XAML first, find your Scoreboard List and TYPE in the following: (it is important to type is as the intellisense features with auto generate a method for you)

     SelectionChanged

Intellisense should then pop up and offer to create a new event handler for you by hitting tab.

Now open up MainPage.XAML.cs and find this new function, then add the following:

    // If selected index is -1 (no selection) do nothingif (Scoreboard\_ListBox.SelectedIndex == -1) return;// Navigate to the new pageNavigationService.Navigate(new Uri("/LeaderBoard.xaml?selectedItem=" + Scoreboard\_ListBox.SelectedIndex, UriKind.Relative));// Reset selected index to -1 (no selection)Scoreboard\_ListBox.SelectedIndex = -1;

Here you see, we first check if anything has been selected (aborting if we have not). If we have then we navigate to our other page (make sure you change the XAML page name to what you called your second page.

So our first page will now navigate to our second page and send over the Scoreboard index we selected. So now open up the second page cs file and we will receive this data and call on the WCF service for some info.

As before we are going to overload the “onNavigatedTo” function (do not forget to add the using statement for the navigation service):

    // When page is navigated to, set data context to selected item in listprotected override void OnNavigatedTo(NavigationEventArgs e) { base.OnNavigatedTo(e); string selectedIndex = "; if (NavigationContext.QueryString.TryGetValue("selectedItem", out selectedIndex)) { int index = int.Parse(selectedIndex); App.LeaderBoardLibrary.GetLeaderBoard(App.LeaderBoardsViewModel.Leaderboards[index].Owner, App.LeaderBoardsViewModel.Leaderboards[index].Name); } }

Here we check to see if the page was opened with a parameter, we try and convert that into an integer and then call the “GetLeaderboard” WCF service passing the owner and name for the selected Scoreboard. Now do not forget at this point, the service only has keys for specific scoreboards, so you may not get an answer back. You could change this implementation so that the app sends the key, but that’s up to you.

Now as we are asking the service for some data we had better listen for the response, so add the event handler to the constructor of the class, like so:

    App.LeaderBoardLibrary.LeaderBoardReceivedEvent += new LeaderBoardSilverlightLibrary.LeaderBoard.LeaderBoardReceivedEventArgsHandler(LeaderBoardLibrary\_LeaderBoardReceivedEvent);

The function for the event is as follows:

    void LeaderBoardLibrary\_LeaderBoardReceivedEvent(object sender, LeaderBoardSilverlightLibrary.LeaderBoardReceivedEventArgs e) { leaderBoardScores = e.LeaderBoard; DataContext = leaderBoardScores; }

Where as before we set the data context appropriately for the data we receive. Now I was a bit lazy here and I have declared a second local view model for the data handled in this page. It should use the main app View Model but I was push for time to integrate it properly. Just the sample.

* * *


## Summing Up

Now not everything in the sample has been covered here, I also did add:

- Some error handling for Access Denied events (if you did not have the key for a Scoreboard)
- An edit screen for editing scores (using the UpdateLeaderboard WCF service)
- Some snazzy state effects for the edit screen
- Some animations on the Main page to flip the page in and scroll the list up (mainly to hide the initial delay from retrieving data) 

There is much more this could have done but I could not do everything for you. The basic concept of having a silverlight app integrate with a Silverlight WCF service and handle the data from that service is done.

The next sample will cover the same with XNA, although it might be a couple of weeks while I get on with some presentations I am doing

Any questions and comments welcome.

Technorati Tags: [wp7dev](http://technorati.com/tags/wp7dev),[windows phone development](http://technorati.com/tags/windows+phone+development),[wcf](http://technorati.com/tags/wcf),[silverlight](http://technorati.com/tags/silverlight)
