---
layout: post
title: XNA to SilverXNA-part 6 Adding a bit of Flash
date: 2012-07-01 23:09:06
tags: [silverlight, xna]
---

![width=](assets/img/posts/image-not-found.png)

Now one thing that was not in the original game (unless you count the player / enemy animations which to face it are part of the gam anyway) was any kind of animation to the UI experience, namely in this case the Overlay’s we just put back in. They are a bit flat and just show on the screen, now in XNA to do any sort of screen transformation / animation or effect generally speaking does take a lot of effort because you have to build your own animation system to do what you need where as in Silverlight there is already a fairly powerful one right at your fingertips.

Now there are actually two approaches to animation in Silverlight those being **Visual States** and **Storyboards** , now under the hood they actually represent the same thing as visual states become storyboards but they are provided for a quick approach to get animations done, whereas full storyboards have a lot of granularity controlling to the second what happens when and how.

Keeping things simple we will just add some visual states for displaying the correct view at the appropriate time with a little smoke and mirrors show. I will point out one thing at this point as this will actually undo what we have previously implemented in the ViewModel as we are passing control of the visibility over to the animation instead of directly controlling it but this is a good thing because instead of just popping up our overlays we are going to animate and fade them instead.  We will then add a simple storyboard to animate the items within the overlay controls just to show the difference.

As usual full source for this chapter can be found [here on Codeplex](http://silverxna.codeplex.com/releases/view/73761):

(Please excuse the XAML code sections here, just found out our syntax highlighter does not support XAML, so bear with me while I try to find a better work around. Currently looking at SyntaxHighlighter evolved which supposedly will support XAML but it is wordpress only so will need a little magic) \* Update, still working on it but I lost my changes to my version of the highlighter so i need to re-create it or else loose what I currently have working dagnamit!.

Follow along with the series here:

> ![align=](assets/img/posts/image-not-found.png) [Part 1 – an Overview](http://darkgenesis.zenithmoon.com/?p=366)  
> ![align=](assets/img/posts/image-not-found.png) [Part 2 – Getting Started](http://darkgenesis.zenithmoon.com/?p=386)  
> ![align=](assets/img/posts/image-not-found.png) [Part 3 – Adding the first control](http://darkgenesis.zenithmoon.com/?p=406)  
> ![align=](assets/img/posts/image-not-found.png) [Part 4 – MVVM frameworks and Nuget](http://darkgenesis.zenithmoon.com/?p=420)  
> ![align=](assets/img/posts/image-not-found.png) [Part 5 – Controls](http://darkgenesis.zenithmoon.com/?p=443 "SilverXNA Part 5 - Controls")  
> ![align=](assets/img/posts/image-not-found.png) [Part 6 – Adding Animation](http://darkgenesis.zenithmoon.com/?p=496 "SilverXNA Part 6 Animation") (here)  
> ![align=](assets/img/posts/image-not-found.png) [Part 7 – A different approach](http://darkgenesis.zenithmoon.com/?p=505 "SilverXNA Part 7 A different approach")

 


#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

* * *


## About Animation and MVVM

Now there are many discussions about how animation should be controlled and what animation really means to a Silverlight / Phone application or game. The traditionalists believe that Design is design and animation is part of that, so things like animation should be coded into each view and started / controlled programmatically. The Die hard MVVM enthusiasts believe everything should be controlled from the view model and code behind should not be used at any cost.

Pragmatism though teaches us that there must be a middle ground here, yes Animation is a visual representation that is driven by how the app looks and feels but our game needs a smart way to let the view know what to show and when.

Judge for yourself in the articles below (P.S. Jeremy Likeness makes a very compelling argument):

> ![align=](assets/img/posts/image-not-found.png)    [Silverlight.Net forum article discussion on MVVM and Storyboards](http://forums.silverlight.net/p/159579/357852)  
> ![align=](assets/img/posts/image-not-found.png)    [DarksideCookie (no relation) view on MVVMs role in animation](http://chris.59north.com/post/mvvm-and-animations)  
> ![align=](assets/img/posts/image-not-found.png)    [C# Disiples approach to MVVM animations](http://marlongrech.wordpress.com/2009/06/13/animations-and-mvvm/)  
> ![align=](assets/img/posts/image-not-found.png)    [Stackoverflow question and answer to MVVM animations](http://stackoverflow.com/questions/1649828/wpf-mvvm-property-change-animation)

As you can see there is always more than one answer to any issue, for the example here we are going to use a Dependency Property with binding to control our visual states (best approach I’ve come across) and I will show you event binding (the simple way) with storyboards.

* * *


## Setup page Visual States

First off we will start by defining our Visual State Animations, key thing to remember that these are states in the true meaning of the word and no object can be manipulated by two different operations.  Think of it like this if you have a glass on a table and two people sitting at that table then only one person can move that glass at a time, if the other person tried to move it then it wo not be where they expect it to be because someone else is controlling it.  A poor mans attempt to try and explain how it works but worry not if you try and do something wrong Blend will happily slap you in the face and tell you off!

So to begin we need to define the starting state for our screen, in our case the default state is when the game is running, anything else will be placed on top to show that something else has happened in the game, to this end we need to hide away our overlays ready for them to come to light when we need them.

To do this update the following properties of the three overlays on the “GamePage.XAML” in blend (it is just easier):

| Property | Value |
| Opacity | 0 |
| Visibility | Visible  
(or right click the advanced icon and select reset) |
| Translate X  
(in Transform –\> Translate section) | -800 |

This will place the overlays off the left hand side of the screen and make them invisible.

I will mention one thing here, you may ask why I reduce the opacity to hide the control instead of just setting the Visibility to Collapsed, the answer is simple, Opacity when animated can be gradually altered to give a fade in / out effect, visibility is just another state on/off so it will just pop in or out with no fading.  Another point to make is that if an item is visible then it will still respond to interactivity or block interactivity to controls beneath it so plan your animations / visual states accordingly, lastly if you combine altering opacity with visibility (because you need to access controls underneath) then altering the opacity has no effect because visibility will be updated last (so it will fade in while it is hidden and then pop into view).

Next we will setup our Visual State group and define our initial Visual state that we have just configured (sort of like the kicking off point for all visual state transitions)

So in the States tab click on the “Add State Group” icon to define our top level group (State groups are just a way of organising groups of states) as shown below:

[![image](/assets/img/wordpress/2012/07/image90.png "image")](/assets/img/wordpress/2012/07/image87.png)

Do not worry about Naming the state group here, as we only have one it does not really matter, if you have multiple groups on a page then by all means name them just to make it easier to organise them.

Next we need to add our default state so click the “Add State” icon on our new state group and name it “GameRunning” as follows:

[![image](/assets/img/wordpress/2012/07/image91.png "image")](/assets/img/wordpress/2012/07/image88.png)

You will notice that the design window at this point now has a red border and a red icon is next to our new state, this means Blend is now in state recording mode, any property or control you change now will be recorded against the selected state.  As this is our default state and everything is ready what ever you do do not change anything ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile6.png).

Click on the “Add State” button on the state group again to add another state and call it “DisplayWin”:

[![image](/assets/img/wordpress/2012/07/image92.png "image")](/assets/img/wordpress/2012/07/image89.png)

Now with this state selected we want to update our screen to represent what we want displayed when this state is active, so update the “WinOverlayControl” properties to the following (effectively resetting the control back in to the foreground)

| Property | Value |
| Opacity | 100 |
| Visibility | Visible  
(No change this time) |
| Translate X  
(in Transform –\> Translate section) | 0 |

You should now see the “WinOverlayControl” front and centre in the design window as shown below:

[![image](/assets/img/wordpress/2012/07/image93.png "image")](/assets/img/wordpress/2012/07/image90.png)

As before, make sure what you touch because everything you change will be recorded against the selected state, there has been many a time when I thought I then selected another state and started to update more properties only to fine I would just messed everything up by doing everything on the same or the default state ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile6.png), thank goodness for Ctrl-Z.

Now repeat the steps for the “WinOverlayControl” by creating new States (NOT state groups) and naming / updating properties appropriately, you should end up with the following state tree:

[![image](/assets/img/wordpress/2012/07/image94.png "image")](/assets/img/wordpress/2012/07/image91.png)

If you need to make changes to the base / default state or just look at the design view without mucking up any of your recorded states then just click on the “Base” state as shown above.

Now we have our states defined but we do not actually have any animation as yet, you can see this by clicking on the “Animation Preview” (highlighted above) icon and clicking on each state to show what happens when each is displayed, so lets update that.

So on the “Default Transition”, click on the “Easing Function” icon to show all the different ways you can animate between each of the states, for simplicity I selected the “Circle” function and then set the “Transition Duration” (next to the easing function button) to 1 meaning it will take 1 second to perform the animation (more than enough in most cases!)

[![image](/assets/img/wordpress/2012/07/image95.png "image")](/assets/img/wordpress/2012/07/image92.png)

Now when you click on each of the visual states you will see a nice animation for how each control with appear on the screen.  You can go a lot further than this by controlling how each state transitions between each other and how they interact so I suggest you play around with this a lot more, even for a basic system it can give you a lot of functionality.

Now save all you changes and let us switch back to visual studio to get our code changes in.

* * *


## Define Visual State Binding

Now to activate the visual states on the GamePage we need a way to hook our view model to our page but no events or properties exist in the framework to do this because the visual state manage is built separately, so we need to extend our page with a Dependency property, this took some searching the first time I was looking in to this for my own projects so I can at the very least save you some clicks looking for how to do this.

I also decided to keep these dependency properties and behaviours separate in this and my projects so I created a “Behaviours” folder in my project just to keep things tidy, so go ahead and create a new folder and then add a new class named “VisualStates.cs” with the following code:

    
    
        xmlns:behaviour="clr-namespace:SlXnaApp1.Behaviours" behaviour:VisualStates.CurrentState="{Binding CurrentState, Mode=TwoWay}"
    
    
    
    So the stage is set, our page now recognises and responds to changes in our Visual state property, so let next update our game code to now work with the state instead of the old visibility properties.
    
    
    * * *
    
    ## Update game code
    
    
    So if you remember from previous chapters we decide which overlay to display when we update the current time in our Game View Model, so we just need to change this from setting the old visibility properties to just updating the page to the correct state which will then tell the page to display the correct overlay:
    
    
    
    
        
    
    )
    
    Run the project now and the overlays will display as before but with extra pizazz.
    
    
    
    Feel free at this point to clean up the GameViewModel.cs and remove the redundant Visibility properties for the three overlays.
    
    
    * * *
    
    ## Setup Basic Storyboard (swipe in items)
    
    
    As an alternate approach we can also use events to start animation, so for al alternate solution lets also add a Storyboard to our overlays to make them really stand out, to this end fire up Blend again and open up the “WinOverlayConrol.XAML” and let’s get a bit creative (granted not my strong suit but lets go with this)
    
    
    
    Now with Storyboards being all that more granular, they do take a lot more getting used to than Visual States but if you have used any kind of video or audio editing solutions then it should feel fairly familiar, if not well…. lets jus get on with it.
    
    
    
    What we are aiming for is to put a shake on our overlay after is has displayed on the screen after our visual state animation.
    
    
    
    One sneaky tip I’ll let you in on if you do not know it already is that Blend has two different view modes while working which can be switched between using the “F6” key, this becomes very useful when doing storyboards as you can get a wider view of the storyboard timeline (which appears in the “objects and timeline” tab), so what I do is Hit F6 and ensure my view looks a bit more like this:
    
    
    
    [![image](/assets/img/wordpress/2012/07/image96.png "image")](/assets/img/wordpress/2012/07/image93.png)
    
    
    
    This places the Objects and Timeline view across the entire bottom portion of the windows, just drag it (tabs are draggable you know) to the bottom of the screen until it take up the bottom portion as shown above.  Hit “F6” again and the view will return to normal mode.
    
    
    
    So while in which ever screen mode you are comfortable with click on the + sign just below the “object and timelines” tab header and right of the “No Storyboard Open” text as shown below
    
    
    
    [![image](/assets/img/wordpress/2012/07/image97.png "image")](/assets/img/wordpress/2012/07/image94.png)
    
    
    
    This will prompt you to name a new storyboard for us to create, I have just left it at the default name of “Storyboard1” and then you will see why it is important to have the secondary view for working with storyboards as the timeline springs in to life:
    
    
    
    [![image](/assets/img/wordpress/2012/07/image98.png "image")](/assets/img/wordpress/2012/07/image95.png)
    
    
    
    You should also note that as with managing Visual States the main window is now in a red bordered “Recording” mode, so careful what you touch.
    
    
    
    Now if you look around and read up on how to do Silverlight Animation through storyboards there are (as you would expect) several different way’s and implementations to achieve this, including a code only approach.
    
    
    
    First and most importantly, ensure you have selected the item you want to animate on the left hand side before you begin, else you will either animate the wrong item or nothing at all and most likely cause you pain in undoing all your work to re-apply it again.
    
    
    
    To start off we need to define a start point for our animation here by setting an initial Keyframe using the “Record Keyframe” button as highlighted above, but first set the timeline to 1 second by clicking on that time in the timeline view, this is to delay the starting of the animation to allow for the Sate Animation to complete before applying our storyboard effect.
    
    
    
    After creating the Keyframe at 1 second now click on the 2 Second step and let’s translate the overlay image on the x axis slightly by 80 pixels, so select the WinOverlay Image and enter “-80” in the Translate X field.
    
    
    
    Next Click on the 3 Second mark and reset the TranslateX field to 0 and then finally click on the 4 second mark and set the TranslateX field to 80.  Now our animation will slide left, back to the centre and then off to the right, click on the play button above the timeline to see it in action.
    
    
    
    The view should end up like below, showing the translation of the WinOverlay control over the 4 seconds of defined time:
    
    
    
    [![image](/assets/img/wordpress/2012/07/image99.png "image")](/assets/img/wordpress/2012/07/image96.png)
    
    
    
    But let’s not stop there, just like Visual States we can also use Easing Functions to add a bit more flair to our animation, we can also go further by altering the actual keyspline of our animation in various ways but that is a bit advanced for this topic.
    
    
    
    To ad an easing function just expand the animation on the Overlay image and select the “RenderTransform” and a new window will appear in the properties tab, from here just select an appropriate easing function and hit play again to see it is effect, I chose the elastic function for a bit of bounce.
    
    
    
    You can obviously go a lot further than I have here and if you took my advice on altering the contents of the overlay control with more textboxes and images then you can animate each individually over the timeline, I liked the idea of each line swiping in for 1/s second intervals ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile6.png)
    
    
    
    So now we have our animation we need to kick it off, in this case we are going to use an inbuilt behaviour, namely the “ControlStoryboardAction” behaviour.  So either select it from the “behaviours branch of the asset tree or use the control selector to navigate to it, in either case just add it to the “UserControl” root node of the tree, when you have done that you should see the following property window for the behaviour, just set the values accordingly:
    
    
    
    
    | [![image](/assets/img/wordpress/2012/07/image100.png "image")](/assets/img/wordpress/2012/07/image97.png) | [![image](/assets/img/wordpress/2012/07/image101.png "image")](/assets/img/wordpress/2012/07/image98.png) |
    | Visual tree with Behaviour | Behaviour property window |
    
    
    
    
    Basically here when the “LayoutUpdated” event occurs as identified by the Trigger properties then the “Storyboard1” storyboard will be played.  You can add as manay of these behaviours as you wish in any combination, some to start animations, some to stop and if you want you can even add a behaviour to trigger from when a Storyboard has finished playing and start it up again forcing it into an eternal loop.
    
    
    
    There are so many possibilities so just try not to get lost in them all, just remember for now to go and update the other overlays if you wish.
    
    
    
    Now this probably is not the most performant solution as the overlays are continually updated in the background but as they are not visible and not being drawn on the screen it does not actually matter from a performance perspective.
    
    
    * * *
    
    ## Last thoughts
    
    
    Hopefully the above shows from an XNA programmers perspectives just how much Silverlight has to offer with minimal coding efforts and in some ways makes the game code even easier to read in regards to the actual UI, you know exactly when comes from where and who’s responsibility is for what (especially if you have an external design who knows their way better round blend than you do)
    
    
    
    Now I am certainly not a Silverlight expert by any means but I have certainly played around in the tools for quite a while now and have produced several apps and designs using it and find myself liking it more and more, but nought it going to pull me away from my XNA roots. ![Devil](/assets/img/wordpress/2012/07/wlEmoticon-devil.png)
    
    
    
    But just play and mess around with what you have and you will go far, I may return to this part later on as I had a fantastic Idea for a pause menu that resembles the one used in Dead Space, race ya to it!
    
    
    #### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")
    

