---
layout: post
title: Things to note when Writing XNA components
date: 2006-10-06 12:56:58
tags: [xna]
---

From over in [Mitch Walkers Blog](http://blogs.msdn.com/mitchw/default "Mitch Walkers Blog"), he notes back in September some important facts about XNA component writing and things to take into consideration.

If you've not read his blog I would recommend doing so.

As an extract though it all centers around the availability of the graphics device while the component is being called, in pretty much the same way you must do in your main app, just have to remember that components are called separately to your main app and the state of the graphics device can change (I.e window resizes), this means any resources the component is using need to be re-initialized as they would no longer be valid on the graphics device.

A load of words really but put simply it's good practice to write your components so they are as portable as possible and not just rely on your implementation handling it.

Example below of code that should be added:

```csharp
public override void Start()
{
    this.graphics = this.Game.GameServices.GetService<IGraphicsDeviceService>();

    this.graphics.DeviceReset += new EventHandler(graphics_DeviceReset);
    this.graphics.DeviceResetting += new EventHandler(graphics_DeviceResetting);
    this.graphics.DeviceCreated += new EventHandler(graphics_DeviceCreated);
    this.graphics.DeviceDisposing += new EventHandler(graphics_DeviceDisposing);

    LoadContent();
}
```

This overrides the natural start call for the component and registers the component with the device state events.

Then add the functions to handle these events:

```csharp
void graphics_DeviceDisposing(object sender, EventArgs e) 
{ 
    ReleaseContent(); 
} 

void graphics_DeviceCreated(object sender, EventArgs e) 
{ 
    LoadContent(); 
} 

void graphics_DeviceResetting(object sender, EventArgs e) 
{ 
    ReleaseContent(); 
} 

void graphics_DeviceReset(object sender, EventArgs e) 
{ 
    LoadContent(); 
}
```

This provides enough flexibility with more advanced components to do more later if need be.

Lastly simple Load and release functions to resource your component:

```csharp
private void LoadContent() 
{ 
    this.font = new Font(this.graphics.GraphicsDevice, "Components", "Comic Sans MS_16"); 
} 

private void ReleaseContent() 
{ 
    if (this.font != null) 
    { 
        this.font.Dispose(); 
        this.font = null; 
    } 
}
```

With this framework in place it will help prevent the annoyance of the "Device Lost" errors, hopefully Microsoft will include this in the template for new components later in the Beta or @ release.

One can only hope.

Happy coding
