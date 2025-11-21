---
layout: post
title: XNA to SilverXNA-part 7 Breaking the mould
date: 2012-07-01 23:15:29
tags: [silverlight, xna]
---

![ /></p>
<p>So far with SilverXNA we have been dealing will a full page approach to rendering our Silverlight page in XNA, it is quick and simple but there is another way.</p>
<p>The Silverlight renderer (UIElementRenderer) is specifically targeted at UI controls it just so happens that most the samples use the Page as the control to render, it is also possible to use different controls as the source fro the Silverlight render if you so wish.  it is also possible to mix and max if need be but you have to be very careful when doing this.</p>
<p>If you are going to render individual controls or user controls however I would recommend not rendering the entire page, this can overcomplicate drawing, like a wise man said “What is possible is not always right” <img class=](assets/img/posts/image-not-found.png)

The reason for this is that there is a single restriction to the Silverlight Renderer, all controls to be rendered MUST be part of the visual tree for the page you are currently on, so you cannot just create a whole load of user controls and just drop them in, they have to play an active part of the current page, you can however add them in programmatically if you so wish.

Another thing to keep in mind if you wander from the full page approach is that you need to position the drawing of the controls manually on the screen, this can be worked around by using full page controls but I would not recommend it.

As usual full source for this chapter can be found [here on Codeplex](http://bit.ly/pYtDi3):

(Please excuse the XAML code sections here, just found out our syntax highlighter does not support XAML, so bear with me while I try to find a better work around. Currently looking at SyntaxHighlighter evolved which supposedly will support XAML but it is wordpress only so will need a little magic) \* Update, still working on it but I lost my changes to my version of the highlighter so i need to re-create it or else loose what I currently have working dagnamit!.

Follow along with the series here:

> ![align=](assets/img/posts/image-not-found.png) [Part 1 – an Overview](http://darkgenesis.zenithmoon.com/?p=366)  
> ![align=](assets/img/posts/image-not-found.png) [Part 2 – Getting Started](http://darkgenesis.zenithmoon.com/?p=386)  
> ![align=](assets/img/posts/image-not-found.png) [Part 3 – Adding the first control](http://darkgenesis.zenithmoon.com/?p=406)  
> ![align=](assets/img/posts/image-not-found.png) [Part 4 – MVVM frameworks and Nuget](http://darkgenesis.zenithmoon.com/?p=420)  
> ![align=](assets/img/posts/image-not-found.png) [Part 5 – Controls](http://darkgenesis.zenithmoon.com/?p=443 "SilverXNA Part 5 - Controls")  
> ![align=](assets/img/posts/image-not-found.png) [Part 6 – Adding Animation](http://darkgenesis.zenithmoon.com/?p=496 "SilverXNA Part 6 Animation")  
> ![align=](assets/img/posts/image-not-found.png) [Part 7 – A different approach](http://darkgenesis.zenithmoon.com/?p=505 "SilverXNA Part 7 A different approach") (here)


#### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")

* * *


## Starting Fresh

So as not to break the sample as it stands, lets add a new SilverXNA page to the project and throw some basic stuff in it.

Now the tools (at the time of writing) do not include a template for a SilverXNA page so you will have to set one up manually or in this case here is one I made earlier, just add a new Landscape or Portrait Windows Phone page (I called mine GamePage2.XAML – Case Sensitive), remove all the template XAML from the XAML file (Just the ContentPanel grid and it is contents, leave in the namespace setup) and then replace your XAML.CS code with the following (excusing the fact you need to fix the namespace yourself):

    \<Grid x:Name="ContentPanel" Grid.Row="1" Margin="12,0,12,0"\> \<Grid.RowDefinitions\> \<RowDefinition Height="0.499\*"/\> \<RowDefinition Height="0.501\*"/\> \</Grid.RowDefinitions\> \<!--Create a single button to navigate to the second page which is rendered with the XNA Framework--\> \<Button Height="100" Content="Change to game page" Click="Button\_Click" VerticalAlignment="Bottom" d:LayoutOverrides="Height" /\> \<Button Height="100" Content="Change to second game page" Click="Button2\_Click" Grid.Row="1" VerticalAlignment="Top" d:LayoutOverrides="Height" /\> \</Grid\>

Then bind the click event to a new function (already done above) and finally in the new page “.cs” file, copy the code from the existing button for the new event and change it is target to the new page like this:

    \<Grid x:Name="ContentPanel"\> \<Grid x:Name="InfoBox" Height="200"\> \<Grid.Background\> \<RadialGradientBrush\> \<GradientStop Color="#FF1E3BDE" Offset="1"/\> \<GradientStop Color="#FF98A6F1"/\> \</RadialGradientBrush\> \</Grid.Background\> \<Grid.RowDefinitions\> \<RowDefinition Height="0.46\*"/\> \<RowDefinition Height="0.54\*"/\> \</Grid.RowDefinitions\> \<Image Margin="0,0,0,-8" Source="/Images/Overlays/you\_died.png"/\> \<TextBlock TextWrapping="Wrap" Text="!Sucker!" Grid.Row="1" FontSize="48" TextAlignment="Center" Foreground="#FF680B0B" FontWeight="Bold"/\> \<Image HorizontalAlignment="Left" Margin="0,0,0,-8" Width="100"/\> \</Grid\> \</Grid\>

Then alter the Silverlight renderer initialisation as follows:

     ![image](/assets/img/wordpress/2012/07/image102.png "image")
    
    So what happened?, we designed it in the middle but drew at the top, simple answer because we told it to ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile7.png).
    
    
    
    If you scroll down to the “onDraw” function you should see this line where we actually draw the texture captured from the Silverlight renderer:
    
    
    
    
         ![image](/assets/img/wordpress/2012/07/image103.png "image")
        
        Good now let’s setup our second Silverlight renderer just like the first, i’d suggest you try this yourself from the descriptions above and then compare, but here is the solution (no peeking ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile7.png))
        
        
        
        > ![align=](assets/img/posts/image-not-found.png)    Renderer Properties (in the XAML.cs header)
        > 
        >     
        > 
        >     Renderer initialisation (in the layout updated function, to replace the existing set of calls)
        > 
        >     
        > 
        >     Renderer draw call
        > 
        > ![image](/assets/img/wordpress/2012/07/image104.png "image")
        >     
        > So when you are doing individual control based Silverlight rendering it is important to remember that XNA takes control of where to place / size and position the output from the Silverlight renderer.  the big advantage of using this method is that you can do post processing on the Silverlight controls before they are rendered to the screen and better integrate them in to 3D environments.
        >     
        >     
        > * * *
        >     
        > ## In the end there can only be one (mostly)
        >     
        >     
        > ![width=](assets/img/posts/image-not-found.png)
        >     
        >     
        >     
        > (Bet you were expecting a scene from highlander there ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile7.png))
        >     
        >     
        >     
        > Hopefully from this chapter you will have a wider understanding of what is available through the Silverlight Integration with XNA, there are many things to consider should you start using it and I really recommend using it if only to save you burdening yourself with an oppressive UI framework.
        >     
        >     
        >     
        > As with everything you have many choices, you can use a full page and design everything to orientate from there just overlaying the entire driven page or you can craft and animate it from Silverlight and leave it up to XNA and your graphical framework for where to put it (this might be preferable in some complex 3D scenes, like names over a 3D object) or mix and match (if you do Mix be aware that controls have to be within the visual tree and if placed in sight then they will also render with the full page renderer)
        >     
        >     
        >     
        > I may follow up with a final article, as I mentioned in my last I did have a snazzy idea for a Dead Space style menu which would be very easy to reproduce with SilverXNA and make it look cool.
        >     
        >     
        > #### If you have more Queries on SilverXNA or just want to ask questions on it, fee free to use the [SilverXNA forum here](http://darkgenesis.zenithmoon.com/forums/forum/silverxna/ "SilverXNA blog post forum on Dark Genesis")
        
    
    
    

