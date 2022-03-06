---
layout: post
title: Silverlight & XNA- A tale of two cities
date: '2012-06-30 23:45:22'
tags:
- silverlight
- silverxna
- silverxna-tutorials
- windows-phone
- xna
---

![width=](http://t3.gstatic.com/images?q=tbn:ANd9GcRlRKRvqSqH6DfchCzG19yZ2u6EcbTGNwZYpEvrShveN3GQDXxc)

As was the story not long ago, devs would look at the image above and see a Silverlight app, it looks like an image overlaid by a text control with another texture of a persons head, nothing too fancy about that.

But now thanks to the World of Mango (Windows Phone 7.1 / 7.5), this image may not be so clear because now we can have Full 3D running in a Silverlight environment and unlike Silverlight 5 on the web, this is Silverlight 4 running on the phone being drawn by an XNA engine.

This sample aims to help educate XNA devs who are interested in this new world of possibility by simplifying visual layout controls that traditionally required massed of extra code to draw boxes, capture inputs and draw text to the screen, in such scenarios as Menus, HUD’s, text displays and such.

#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

* * *

# Under the covers

![ /></p>
<p align=](http://t1.gstatic.com/images?q=tbn:ANd9GcSO6e_vLoshwGV6aLZ3mPBMYmyqY7ddctap_hUwDlLjLdMRpKRw6g)(Core Phone Framework which has not changed much)

Now for the first little revelation (which might also come as a shock to most Silverlight Devs), in order to get round the old issue that has been around since the start of the Windows Phone Development platform that states only one framework can draw to the screen at a time (because of how differently the two frameworks function), it should come as no surprise that to get this integration working they had to actually pick just one and go from there.

Now what may be a surprise is that it WASN’T the Silverlight renderer (as an XNA dev, it is not really that surprising ![Smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6787.wlEmoticon_2D00_smile_5F00_60D7890F.png)). in an integrated environment using both XNA and Silverlight, it is XNA that does all the grunt work under the covers, not quite that simplistic but that is what actually happens, it looks something like this.

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2664.image_5F00_thumb_5F00_64952DDF.png)

(Silverlight Rendering Cycle with XNA)

* * *

# But what does this actually look like

So when you start up a new 3D / Rich Graphics project (depending on which project type you select, as you saw in my previous post they are practically the same), you will be presented with a rather flamboyant project template as shown below:

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/5775.image_5F00_thumb_5F00_17C1417C.png)

(The XNA Windows Rich Graphics Project Template)

**\*\*Note**

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/4721.image_5F00_thumb_5F00_0C680772.png)

In the project template you can see we have three projects:

> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    The Main Silverlight Project Template (where we will spend most of this article)  
> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    The XNA multi-project library (looks like it derived from the core multi-project library)  
> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    A Standard XNA content project

It is interesting to see how they built up this bridge without actually breaking the rules of what types projects can reference each other (Silverlight cannot reference XNA and vice versa).  In this project the Silverlight project makes a reference to the Portable library which contains all the XNA references, which then references (and exposes) the Content project.  Very neatly done.

Although if you look at all of the references in the Silverlight project, it does make reference to the XNA libraries, which is fully supported now (previously I believe only some of them could be references)

* * *

# Silverlight the big scary beast of Carthage

So for those of you XNA devs who have not yet ventured into Silverlight as yet, here is a very brief overview (for a more detailed view and an overview of blend, check out my “[Intro to Silverlight](/2011/04/05/recap-video-for-the-at-amp-t-beginners-silverlight-for-windows-phone-webcast)” webcast blog)

Each Page in Silverlight is like a separate application in itself, it contains all information and controls in order to display that one screen.  in the project this is made up of two parts:

> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    .XAML file – the core Silverlight design file which contains the XAML design  
> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    .XAML.CS – the code behind file for C# code to run (as the name suggest) behind the scenes

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/1104.image_5F00_thumb_5F00_4F835FD2.png)

View of Silverlight pages in the Solution Explorer

Those of you familiar with Web programming should also recognise this make up of View code and code behind.

XAML is a descriptive language and looks a bit like this:

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7455.image_5F00_thumb_5F00_59A5A371.png)

An example of XAML file – eXtensible Application Markup Language

XAML (like XML) is just a descriptive file format which tells the Silverlight interpreter how to render a page (in my very simple speak ![Smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6787.wlEmoticon_2D00_smile_5F00_60D7890F.png)), once you get to know it it is very easy to read.  However for most things you wo not even need to look at the XAML (especially with XNA), as that is what Blend is for, Expression Blend being the GUI design tool for Silverlight and WPF.

The code behind is exactly what you would expect but has been updated slightly for XNA.

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/1104.image_5F00_thumb_5F00_61D9C908.png)

An XNA Game based Code behind

Here you can see a set of XNA variables, a basic constructor plus the Draw and update loops.  main difference of course is that you have to manually hook up the Update and Draw loops (because you are running off a Silverlight timer, not a Game class timer, but I’ll come to that later).

So from an XNA dev perspective things look almost exactly the same, although as some are pointing out we have initially lost our game components ([The App Hub has already solved with a little work around](http://create.msdn.com/en-US/education/catalog/sample/silverlight_xna_game_components)), for services we now have the power of dependency injection and IoC (If you do not know what these are…. Good luck.  I will cover them another time)

SO what is running all this behind the covers, welcome to the App.XAML and it is code behind (App.XAML is the same as program.cs in XNA speak)

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7357.image_5F00_thumb_5F00_7924CD79.png)

App.XAML and it’s code behind

Now although App.XAML looks like any other Silverlight page, in fact it is not. Mainly because this page will never be rendered.  In programming speak it is the entry point for any Silverlight application and also the GLOBAL reference for the project (it is always in memory).  As it has it is two constituent parts, it has globals for both XAML and code.

The XAML global is good for templates that will be used throughout the project to save on duplicating formatting and styling or if you use an image or resource constantly throughout the project, the Code behind is the same.  We will skip the XAML because it is not all that important to us here (you can look if you wish):

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6378.image_5F00_thumb_5F00_31EF017A.png)

App.XAML.cs file

Here you can some of the gubbin’s (boilerplate code) running the XAN framework within Silverlight.  You have a Content manager 9which gets access to the content project through the portable library as described earlier), we also have a Framework Dispatcher Timer, which is the Game clock (in normal XNA this is all sealed within the Game Class).  then finally within the constructor a new function is called from within the XNA framework to kick of the Framework dispatcher timer and begin the game.

Nuff said, phew, anyone need a drink now.

* * *

# So that is how it runs how do I make it work?

So if you run the default project we have two pages, the first page which is very simple, a pure Silverlight page “MainPage” with some text boxes and a single button, the second “Game” page has the XNA game running in it.

| ![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7853.image_5F00_thumb_5F00_4861A001.png) | ![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8030.image_5F00_thumb_5F00_5E680B93.png) |
| Main Page | Game Page  
(Not much going on here) |

So the first scenario that comes to mind when doing these projects is to have a flashy main menu when launching the game (I cannot do flashy so we will settle with quick ![Winking smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/0820.wlEmoticon_2D00_winkingsmile_5F00_54BF9D5D.png))

First we will open up blend and add something nice, right click on the main project in the solution explorer and select “Open in Expression Blend” as shown below:

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6378.image_5F00_thumb_5F00_7A491ABE.png)

Right Click –\> Open in Expression Blend

This will fire up Expression blend with your project loaded and ready for bear.

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8030.image_5F00_thumb_5F00_75F39D9B.png)

Expression Blend fired up

I am not going to go into the very basics here of how to use Blend, I’m going to assume you either know a bit of blend (in which case you have probably dropped off by now) or you have now watched my little “intro to Silverlight video”, or even watch MS’s own Expression blend training course (which is where I got my wings)

On the page we have, a Text box for the app title, a Text Box for the page name and a button for launching to our Game page, this is easily readable from the Visual Tree in the bottom left of the screen (always pay close attention to this window as you can select things even when you have chosen to hide them.  it is also worth noting that visibility is determined downwards, the item/control at the bottom of the tree has the highest priority and is what is draw in the foreground, bottom to top / Background to foreground.

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/5381.image_5F00_thumb_5F00_4AEB89C9.png)

The other thing to note are the panels, there are four types at present that each control how items on the page are displayed, they are:

> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    Canvas – Free form panel where item placement is absolute  
> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    Grid – allows columns and rows to be determined on the page for control placement and alignment  
> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    inkPresenter (to be honest I have never used this and not sure what it is, what can I say I am honest)  
> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    Stackpanel – A special control that acts list a list box for controls, will order controls in a stacked manner either horizontally or vertically

Each has it is own icon so once you get used to then they are easy to identify, if you have built up your page and want to change the type of layout you have used you can by right clicking on it and selecting “Change Layout Type to” and selecting another one.  Although be warned this sometimes has unexpected results and can cause odd behaviour, use only when experienced with it.

* * *

# The Main Menu Page

So as a quick example lets change the layout of our screen as an example of what is capable in Silverlight and would cost you potentially hours of effort in XNA, good UI.

Just as a quick show and tell, were going to replace the button on the screen with 4 new buttons, align them in a grid and animate them on and off the screen, interested yet?

1. Cleaning house

First delete the button that is there already, easiest way to clear the board, just right click on it in the Visual Panel and select “Delete”

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/4621.image_5F00_thumb_5F00_04682F58.png)

2. Setup the Content Grid

For the view we are going for we want to setup the grid to do all the spacing and layout for us, so with the 2nd Grid in the layout view selected (the one that had the button on it) add some rows onto the Grid in the main window as shown below (by clicking in the margin area).  If you accidentally had the main Grid selected, not to worry, just “Undo” until the grid lines you added are gone.

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2158.image_5F00_thumb_5F00_41A8E41F.png)

3. Add your buttons

Now this is where the practice of having the container / layout selected when adding new control really comes in (if you watched the “Intro to Silverlight” video you should know what I’m talking about”, with the same Grid layout selected, select the “Assets” tab (this hold all the controls available for your project), expand the “Controls” branch of the tree and select “all” (Commonly used controls will show up in the “Controls” branch but sometimes it is nice to see all you got available), then scroll down to the “Button” control.

\*Note, not all the controls you see are available in WP7.0, the project you are viewing is using 7.1 and consequently has Silverlight 4 controls as well, 7.0 was Silverlight 3 only.

Now simply double click on the Button to add, do this 4 times for all 4 buttons. (You can also drag and drop but selecting a container and double clicking I’ve found is more efficient)

At the moment they will be all on top of one another, so we just need to update their properties to be correctly placed in the grid, on the right hand side in the properties window, find the section titled “Layout”, there you should see the Grid and Row Settings

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7444.image_5F00_thumb_5F00_2A9A62E3.png)

Select each button in turn and put them in the correct grid “row”, 0 = button one, 1 = Button two, 2 = Button three and 3 = button four.

On the screen the buttons should show up in each row of the grid.

4. Layout

One thing to be careful of when placing controls is how they are laid out on the screen, this includes such properties as margins and vertical/horizontal alignment

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/3731.image_5F00_thumb_5F00_155C376E.png)

Sometimes Blend does get a bit confused and does the best to interpret your thoughts when adding controls, most commonly if you cannot get a control to line up on the page or expand how you want to, it is because of the layout properties.

Check each button and set the alignment to centre for each button both horizontally and vertically (as shown above) and reset all the margins to Zero if they are not already (a quicker way of doing this is to right-click on the white options dot next to the Margins settings and click “Reset”, this option is available on each setting in the properties panel)

5. Naming

One of the most important lessons I’ve learnt while using Blend is to Name everything, it becomes increasingly important when you start referring to UI controls through code (if it is not names it is not accessible)

So double click on each of the buttons and name them accordingly in the Object and Timeline view as shown below

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/0027.image_5F00_thumb_5F00_2587FF67.png)

Next you can double click on each button to change it is text to something more meaningful as with the button names, you can also do this by selecting the button and changing the “Content” property in the properties pane, the end result should be this.

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6862.image_5F00_thumb_5F00_6649D5C9.png)

6. Animation

The quickest way to do Animation in Blend is to use Visual States, they are quick and easy and offer a variety of options, but they are fire and forget so that they just run.  If you want more granular control or need to know when it beings / is in progress / or has completed, then you will need to use storyboards.

Visual states are control by two things:

> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    Visual State Groups – a container for batching states together for a control or set of controls (each control can only be manipulated in a single visual state group.  It also controls how the states within the group will be animated by time and using an easing function.
> 
> ![align=](http://www.dotnetscraps.com/samples/bullets/021.gif)    Visual State – a single state a control can be in, determined by its position on the screen and all the properties of that control

So, change the tab in the top left hand corner of the screen and click on the “New Visual Stage Group” icon as shown below and call it “Button1VisualStateGroup”

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2664.image_5F00_thumb_5F00_08BE6485.png)

Now before we get started creating our states, we need to get the app ready for it is default state, remember the effect we are aiming for is that when the app starts we want the buttons to swipe in, so they need to start off the screen. Quickly go through each of the buttons and alter their “Translate X” property shown below.  I set them alternately off the screen, 1st and 3rd buttons off the left and 2nd / 4th off the right.  To make it even easier blend allows you to drag the property and see it move, try it (alternately set the Translate X property as follows Button 1 = –350, Button 2 = 350, Button 3 = –350, button 4 = 400 (cus its bigger))

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/5126.image_5F00_thumb_5F00_753104E3.png)

Back to the Visual State panel, what you now see if the group setup with is Default Transition, ignore this for now and click on the “New Visual State” button next to the name of the visual state (roughly the same icon as before), this will create a new visual state.

Note at this point that the screen has change and a new “red dot” has appeared in the top left hand corner of the main window, Blend is now in Visual State Recording mode, so what ever you change now will be remembered by the visual state for animation (so be careful ![Smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6787.wlEmoticon_2D00_smile_5F00_60D7890F.png))

First we must record the Beginning state, which is the state the controls are in now, so job done, just Rename the state to something meaningful like “MenuItem1Hidden”

Next add a second state, then change the “Translate X” property of button one back to 0, this should bring it back on the screen.  Now just rename that state to “MenuItem1Visible”

Lastly we just need to set how long our animation should take and any easing effect we want to add to it, Next to the “Default Transition” as shown in the visual state group image above, there is an icon and a value of 0s (yes I know it is 1s in the image), these are the transition effect options, set the time to 1s (one second) and click on the icon to select an easing function (go wild and select what ever you like), changing the function using the drop down on the combo box which should look like this.

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/1184.image_5F00_thumb_5F00_0B80F7FB.png)

As you can see there are many options.

If you now click on the “Animation Preview” option as indicated above, you can then click on each state and see the animation you have created.

Now rinse and repeat for each of the other buttons until you have something resembling this:

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/0412.image_5F00_thumb_5F00_28A6A005.png)

7. Events and Code

Last thing we need to do is hook up these buttons so they do something, were only going to do button one for now just to show you how to do it.

First select button one and then in the Properties window click on the events icon as shown below:

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/4705.image_5F00_thumb_5F00_53325B15.png)

This will list all the events available for the control you have selected, in this case the button. now find the “Click” event and double click in the box, this should then jump to the code window in Blend automatically creating the code behind event handler for the button. It has also created the link to the event in the XAML for the button so do not rename the function or your project wont build (to undo it go back to the XAML page, clear the event box before changing the function name, then either type it back in or create a new one by double clicking, I sometimes end up doing this if I forget to name the control!)

![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7357.image_5F00_thumb_5F00_023496ED.png)

Next we just need to do the same for the page and show you one of the importent events with Silverlight (which if you do tombstoning you will use a lot.  In the Visual Tree (Objects and Controls window), select the “Phone Application Page” object (the root object), you should see the list of events change now and a new event in particular, the “Loaded” event.  This fires when ever a page has been loaded into memory and is ready to start presenting to the screen, great for animations or things you need to set once everything is ready but before the user sees it.

| ![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6864.image_5F00_thumb_5F00_56C05025.png) | ![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2642.image_5F00_thumb_5F00_780FCFF4.png) |

Now one ting I have learnt over time is that Blend is great at visual representations and / or editing XAML, it is dreadful for editing code (at the moment).  So we will switch back to Visual Studio.  First though, save all of you project to update your changes (if you have not been doing it every 5 seconds already)

When you return back to Visual Studio it will prompt you that it has detected changes in the code and asks you to reload!, Big lesson, always save when you switch between VS and Blend, else you will end up in a right mess and do not edit in both at once!!

SO click “Yes” to reload your project and now open up the “MainPage.XAML.cs” code file and you will see your new function again.

Now we will just add a few code snippets and we’re done, first off it is always good to set the initial visual states for the app (great in case you come back from tombstoning!), so add the following code to the “Phone Application Loaded” event:

     private void PhoneApplicationPage\_Loaded(object sender, System.Windows.RoutedEventArgs e) { VisualStateManager.GoToState(this, "MenuItem1Visible", true); VisualStateManager.GoToState(this, "MenuItem2Visible", true); VisualStateManager.GoToState(this, "MenuItem3Visible", true); VisualStateManager.GoToState(this, "MenuItem4Visible", true); }

Lastly we need to hook up the code to Animate out the “New Game” button and Navigate to the Game page, so add the following to the event you created for your “New Game Button” for example

     private void NewGame\_Click(object sender, System.Windows.RoutedEventArgs e) { VisualStateManager.GoToState(this, "MenuItem1Hidden", true); NavigationService.Navigate(new Uri("/GamePage.xaml", UriKind.Relative)); }

And that is it, compile it and run it and everything should be OK.

If it is not it must be you not me because mine works fine, lol

* * *

# The Result

If you just want to skip to the end and see where I was going. the above work took me about 5 mins to thrown together (shows does not it), but that would had taken hours of engine programming or scripting to get to work just on my own in XNA.

And Here is the result:

<iframe title="Quick Demo of Silverlight XNA integration" width="660" height="495" src="https://www.youtube.com/embed/0TzHuFY89hk?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The first half show the demo from above, 4 simple buttons with very basic animation to show an easy to implement menu system, no XNA involved.  Spend a little more time with the power of Silverlight (or do as I do and just read other peoples work for fantastic effect and learn on the job) and it can look amazing.  I really should have used Storyboards for the animation then I could have walked each control in one at a time and had the selected animate out when the game started, but visual states are easier to show.

The second half is the App Hub sample for “My Little Teapot”, this shows a full screen XNA background with a 3D teapot model (actually generated in code from the primitives sample), on top of it is the Silverlight page and controls, some sliders interacting with the colour of the teapot, buttons to just set the colour and a button on the top to animate out the control panel and back in again (using visual states as I have shown above)

Sample code can be found here in the Site Downloads section [\<Link\>](http://xna-uk.net/media/p/7954)

* * *

# Enough

That is it, my life’s blood is drawn and now I need to get back to coding.  Feel free to comment or post questions on the forums.

Feel like bashing me, do it on Twitter ([@DDReaper](http://twitter.com/#!/DDReaper)), I feel better about that there ![Winking smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/0820.wlEmoticon_2D00_winkingsmile_5F00_54BF9D5D.png)

Laters.

#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")
