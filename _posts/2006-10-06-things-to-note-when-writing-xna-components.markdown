---
layout: post
title: Things to note when Writing XNA components
date: '2006-10-06 12:56:58'
tags:
- tutorials-resources
---

From over in [Mitch Walkers Blog](http://blogs.msdn.com/mitchw/default "Mitch Walkers Blog"), he notes back in September some important facts about XNA component writing and things to take into consideration.

If you’ve not read his blog I would recommend doing so.

 As an extract though it all centers around the availability of the graphics device while the component is being called, in pretty much the same way you must do in your main app, just have to remember that components are called separately to your main app and the state of the graphics device can change (I.e window resizes), this means any resources the component is using need to be re-initilised as they would no long be valid on the graphics device.

A load of words really but put simply it’s good practice to write your components so they are as portable as possible and not just rely on your implementation handling it.

Example below of code that should be added:

 <font color="#3366ff"><span>public</span> <span>override</span> <span>void</span></font> Start()  
{  
    <font color="#3366ff">this</font>.graphics = <font color="#3366ff">this</font>.Game.GameServices.GetService\<IGraphicsDeviceService\>();  
      
    <font color="#3366ff">this</font>.graphics.DeviceReset += <font color="#3366ff"><span>new</span> </font>EventHandler(graphics\_DeviceReset);  
    <font color="#3366ff">this</font>.graphics.DeviceResetting += <font color="#3366ff"><span>new</span> </font>EventHandler(graphics\_DeviceResetting);  
    <font color="#3366ff">this</font>.graphics.DeviceCreated += <font color="#3366ff"><span>new</span> </font>EventHandler(graphics\_DeviceCreated);  
    <font color="#3366ff">this</font>.graphics.DeviceDisposing += <font color="#3366ff"><span>new</span> </font>EventHandler(graphics\_DeviceDisposing);

    LoadContent();  
}

    This overrides the natural start call for the component and registers the component with the device state events.

    Then add the functions to handle these events

      <font color="#3366ff"><span>void</span> </font>graphics\_DeviceDisposing(<font color="#3366ff"><span>object</span> </font>sender, EventArgs e) { ReleaseContent(); } <font color="#3366ff"><span>void</span> </font>graphics\_DeviceCreated(<font color="#3366ff"><span>object</span> </font>sender, EventArgs e) { LoadContent(); } <font color="#3366ff"><span>void</span> </font>graphics\_DeviceResetting(<font color="#3366ff"><span>object</span> </font>sender, EventArgs e) { ReleaseContent(); } <font color="#3366ff"><span>void</span> </font>graphics\_DeviceReset(<font color="#3366ff"><span>object</span> </font>sender, EventArgs e) { LoadContent(); }

    This provides enough flexibility with more advanced components to do more later if need be.

    Lastly simple Load and release functions to resource your component.

      <font color="#3366ff"><span>private</span> <span>void</span> </font>LoadContent() { <font color="#3366ff">this</font>.font = <font color="#3366ff"><span>new</span> </font>Font(this.graphics.GraphicsDevice, <font color="#00ccff"><span>"Components"</span>, <span>"Comic Sans MS_16"</span></font>); } <font color="#3366ff"><span>private</span> <span>void</span> </font>ReleaseContent() { if (<font color="#3366ff">this</font>.font != <font color="#3366ff">null</font>) { <font color="#3366ff">this</font>.font.Dispose(); <font color="#3366ff">this</font>.font = <font color="#3366ff">null</font>; } }

     

    With this frame work in place it will help prevent the annoyance of the "Device Lost" errors, hopefully Microsoft will include this in the template for new components later in the Beta or @ release.

    One can only hope.

    Happy coding

