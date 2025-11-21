---
layout: post
title: XNA to SilverXNA - Part 3 Baby steps and your first control
date: 2012-07-01 21:24:22
tags: [silverlight, xna]
---

Continuing on From [Part 1](http://bit.ly/qgJr56 "XNA to SilverXNA part 1 - The Overview") and [Part 2](http://bit.ly/qrMXIC "XNA to SilverXNA–Part 2 Getting our XNA project running in Silverlight") of the SilverXNA series, we continue to start doing some actual Silverlight rendering of our own.

[![image](/assets/img/wordpress/2012/07/image56.png "image")](/assets/img/wordpress/2012/07/image54.png)

Now if you compare the image above to the screenshots from the previous parts of this series or if you are running the game on the emulator currently, you may not see much difference, if so Yay I’ve succeeded.

What may not be immediately apparent is that the Time and Score values have been replaced with Silverlight controls replacing the long section of code in my gamepage for presenting and drawing text.  Were not going to stop there in our series as I am going to reduce that even further later on but for now baby steps ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile2.png).

The finished code for this section will be available as per usual on [Codeplex Here](http://silverxna.codeplex.com/releases/view/72226 "XNA to SilverXNA–Part 3 source on Codeplex").

Follow along with the series here:

> ![align=](assets/img/posts/image-not-found.png) [Part 1 – an Overview](http://darkgenesis.zenithmoon.com/?p=366)  
> ![align=](assets/img/posts/image-not-found.png) [Part 2 – Getting Started](http://darkgenesis.zenithmoon.com/?p=386)  
> ![align=](assets/img/posts/image-not-found.png) [Part 3 – Adding the first control](http://darkgenesis.zenithmoon.com/?p=406) (here)  
> ![align=](assets/img/posts/image-not-found.png) [Part 4 – MVVM frameworks and Nuget](http://darkgenesis.zenithmoon.com/?p=420)  
> ![align=](assets/img/posts/image-not-found.png) [Part 5 – Controls](http://darkgenesis.zenithmoon.com/?p=443 "SilverXNA Part 5 - Controls")  
> ![align=](assets/img/posts/image-not-found.png) [Part 6 – Adding Animation](http://darkgenesis.zenithmoon.com/?p=496 "SilverXNA Part 6 Animation")  
> ![align=](assets/img/posts/image-not-found.png) [Part 7 – A different approach](http://darkgenesis.zenithmoon.com/?p=505 "SilverXNA Part 7 A different approach")

Also [Channel 9](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) are running a similar [video series here](http://channel9.msdn.com/posts/Get-to-Windows-Phone-Mango-1-From-XNA-to-SLXNA) if you prefer videos! ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile2.png)


#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

* * *


## In preparation for War

If you are getting ready for a battle or some really in depth coding (is there a difference?) it is good to plan things out and get things ready, so too is it true when you want to inject some Silverlight rendering in your SilverXNA project.

Now you might be fooled at this point into thinking “I am already doing Silverlight, what is this guys problem”, well unfortunately that is not true, yes we are rendering an XNA page inside a Silverlight page but really we are still rendering XNA and Silverlight has been shoved in to the corner and told to be quite.

So now we want to wake up this sleeping behemoth and bring it to the fore front.

To do this we need to setup a Silverlight renderer, what this does is take the Silverlight page our game is running on top of and when requested it asks Silverlight to render (draw) this page to a new texture which XNA can then use to draw to the screen the same as any other image.

So first off we just declare a new “UIElementRenderer” variable to hold our active renderer, place it in the top of the “GamePage.XAML.cs” class just above the constructor:

    
    
        
        
            
            
                here) you should have seen how easy Blend is to use, No really!!
                
                So fire up Blend and open up “GamePage.XAML” from the Projects view/tab, there you will be presented with a blanker than normal Silverlight Phone page as there is laterally nothing to see here, not even a top level element on the page (usually called the “Content Grid” by default).:
                
                
                
                [![image](/assets/img/wordpress/2012/07/image57.png "image")](/assets/img/wordpress/2012/07/image55.png)
                
                
                
                So we start from nothing, all well and good so lets just replicate the original HUD that we were drawing in XNA ![Confused smile](/assets/img/wordpress/2012/07/wlEmoticon-confusedsmile.png)
                
                
                
                To do that we will place a grid on the screen so we can layout two textboxes in the top left hand corner to replicate the same experience (in a later part we will change this but as stated before, baby steps)
                
                
                
                So from here you can either navigate the “Assets” tab or use the “Assets” selection tool on the left hand of the screen shown below and then select the GRID asset:
                
                
                
                [![image](/assets/img/wordpress/2012/07/image58.png "image")](/assets/img/wordpress/2012/07/image56.png)
                
                
                
                Now either drag or double click on the “Grid” icon below the Asset selection tool or on the Assets tab to add the grid to the screen (I’d recommend double clicking as it is easier).
                
                
                
                Now use the tool again and select the TexBlock control (you can also search in this window or the Assets tab using the search box at the top of the window), once you have found it simply add two textblocks to the screen and you should see something resembling this:
                
                
                
                [![image](/assets/img/wordpress/2012/07/image59.png "image")](/assets/img/wordpress/2012/07/image57.png)
                
                
                
                The layout is a bit naff at the moment but you should start getting an idea of where we are going.  Now we need to layout these controls on the page and if we use the inbuilt features of the Grid we can do this in a way that is safe for all devices of all screens.
                
                
                
                As it is a grid we can add additional rows and columns to the grid to aid layout, so hover your cursor over the grey’ish bar to the left of the window above and you should see a new cursor appear and a line across the grid, this is our grid design tool:
                
                
                
                
                | [![image](/assets/img/wordpress/2012/07/image60.png "image")](/assets/img/wordpress/2012/07/image58.png) | 
                
                Once you have gotten the drawing line just below the textboxes simply left click to create a new Row.
                
                
                
                If you do not like where it is hover over the line and your cursor should change, holding down the left mouse button will enable you to drag it.  However if you put down to many then you can double click the line to remove it
                
                 |
                
                
                
                
                Right everything is on the screen now and we can start laying it out and formatting it as we wish.  First off we will name the two textblocks so we can refer to them later in code, so double click on the first TextBlock to rename it and call it “ **TimeLabel”** (case sensitive).
                
                
                
                
                | 
                
                Now if you glance over to the right hand side of the screen (with the textblock you have just renamed selected) you will see the properties pane for that textblock.
                
                
                
                You can see it is new name, the colours used on that control, it is visibility, layout and so on.
                
                
                
                Were interested in three parts for now, we want to:
                
                
                - 
                Change the colour of the text in the textblock to Yellow
                - 
                Set the correct grid location we want the textblock in
                - 
                Apply some margins so it is placed correctly on the screen
                
                
                So first off  with the foreground brush selected at the top (should not be hard at this point because a Textblock only has one brush ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile2.png)), set the blue (B) slider to 0 by either dragging the slider across or clicking on the slider and typing 0.
                
                
                
                We do not need to worry about the grid positioning as it is already in the place where we want it, so leave the row and column values set to 0.
                
                
                
                For the margins we want a left / right and top margin of 12 and set the bottom margin to 0 as indicated by the arrows next to each value in the margins section
                
                
                
                Now you should see a Nice bright piece of text in the top left hand corner of the screen, first part done.
                
                
                
                Lastly we might as well (just to tidy it up) remove the current value in the Text field on the “Common Properties” section.
                
                
                
                
                
                 | [![image](/assets/img/wordpress/2012/07/image61.png "image")](/assets/img/wordpress/2012/07/image59.png) |
                
                
                
                
                Now repeat the above for the other TextBlock but this time name is as “ **Scorelabel** ” and set the Grid positioning to Row 1, Column 0.
                
                
                
                Hopefully while you were doing this you will have seen the second textbox jump below the first textbox and appear yellow before you removed it is content.  (some people prefer to leave the Text field populated for the design mode, I’ll leave that up to you to decide)
                
                
                * * *
                
                ## Well that seemed to do a lot… NOT
                
                
                If you run the game now you will get an interesting surprise (well unless you left the text field populated you might see something), nothing actually changed, all that effort and no result at all what a load of cobblers.
                
                
                
                Well remember the 1 + 0 = 1 statement, we still have not populated the Silverlight control’s with any values ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile2.png)
                
                
                
                SO back to our code and we need to update (or in this case just replace) our code to Draw the HUD with something to update the Silverlight UI instead of construct the entre thing ourselves.
                
                
                
                So replace the current DrawHud() function in “GamePage.XAML.cs” as show below:
                
                
                
                
                    
                    
                        
                    
                    
                    
                    As we dive deeper with the SilverXNA integration you will see the many benefits of using the best of what each has to offer to improve and simplify game development or even to just incorporate some 3D content in your Applications.
                    
                    
                    * * *
                    
                    ## Baby Step complete
                    
                    
                    So after all of that we have not changed anything on screen, however thanks to SilverXNA if we were building this from scratch we have made the whole process a lot easier plus now that we have a designer with Expression Blend we don’t need to muck around with pixel alignments when placing objects on the screen.
                    
                    
                    
                    So rest for now and if you are watching the Mango Jumpstart at present (or the recordings) enjoy what Mango has to offer from those who’ve been tinkering for quite some time now [![image](/assets/img/wordpress/2012/07/image62.png "image")](/assets/img/wordpress/2012/07/image60.png)
                    
                    
                    
                    P.S. Yes I noticed the Gems no longer jump up and down and that is probably because of the comprise I made in regards to which time value it was using, I will fix that if I get round to it, lol
                    
                    
                    #### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")
                
                
                
            
            
        
        
    
    

