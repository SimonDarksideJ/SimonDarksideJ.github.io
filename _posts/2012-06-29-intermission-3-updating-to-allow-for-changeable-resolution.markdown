---
layout: post
title: 'Intermission #3 - updating to allow for changeable resolution'
date: 2012-06-29 10:29:36
tags: [2d tutorial, game development, xna]
---

One problem with the original code from DigiPen (which the author freely admitted to) was that it was fixed to a resolution of 640 x 480 (640 pixels wide by 480 pixels high), this basically was the original VGA resolution only available on the earliest computers (by earliest I'm only talking about 10 or 20 years ago now :-) )

With bigger and faster video cards and the increased display capabilities of today's consoles, higher and higher resolutions are available.   Then came HD which just goes even further.

So for our game to be scalable enough to meet these demands we need it to be able to support these higher resolutions without breaking the game

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Graphics Back buffer

The part of our code that controls what resolution our game is running at is where we set the preferred back buffer:

```csharp
private const int BackBufferWidth = 640;
private const int BackBufferHeight = 480;

graphics.PreferredBackBufferWidth = BackBufferWidth;
graphics.PreferredBackBufferHeight = BackBufferHeight;
```

First things first, we need to slightly change this implementation, for our private properties we need to make them more accessible by adding properties for them, as these are also going to be internal private properties, we will change their names to show this:

```csharp
#if ZUNE
        private const int TargetFrameRate = 30;
        private const int m_BackBufferWidth = 240;
        private const int m_BackBufferHeight = 320;
#else
        private const int TargetFrameRate = 60;
        private const int m_BackBufferWidth = 1280;
        private const int m_BackBufferHeight = 720;
#endif

graphics.PreferredBackBufferWidth = m_BackBufferWidth;
graphics.PreferredBackBufferHeight = m_BackBufferHeight;

#region properties
        public static float BackBufferWidth { get { return (float)m_BackBufferWidth; }}
        public static float BackBufferHeight { get { return (float)m_BackBufferHeight; } }
#endregion
```

Above you can see the changes made.

Firstly I've added a #if section to detect if the game is running on a small device platform (the Zune showed above but this could also be for the windows phone) or on a more powerful platform like the XBOX or a PC.

Secondly I've renamed the parameters holding the display settings, using a "m\_" prefix, this merely shows that the parameter is a local parameter only accessible to the current class, just for code readability (you can see this practice throughout the rest of the code)

Lastly, since we need to use these parameters through out code, there are two Static read only properties.  Public so that they are accessible from any class and Static so that the class does not need instantiating (creating a variable of this type of class) to be able to access the settings.

* * *

### Applying these settings to the background sprite

SO now that we know how big our screen is going to be we can position and more importantly scale our sprites accordingly, first we will start with the updates to the background.

Firstly we need to update the creation parameters for our background, from:

```csharp
bg.Add(backGroundAnimation);
bg.Position = new Vector2(0, 240);
bg.ScaleX = 640.0f / background.Width;
bg.ScaleY = 480.0f / background.Height;
bg.ZOrder = 10;
```

To:

```csharp
bg.Position = new Vector2(0, BackBufferHeight / 2);
bg.ScaleX = BackBufferWidth / background.Width;
bg.ScaleY = BackBufferHeight / background.Height;
bg.ZOrder = 10;
```

Breaking it down we have updated the following:

- Changed the starting position to be the far left (same as before) and halfway down the screen (backbufferheight / 2), so if the backbufferheight changes it will always start halfway down.
- Altered the X and Y scale of the texture to scale up or down depending on the screen width

Remembering we also need to update the second background image:

```csharp
bg2.Position = new Vector2(0, -BackBufferHeight / 2);
bg2.ScaleX = BackBufferWidth / background.Width;
bg2.ScaleY = BackBufferHeight / background.Height;
bg2.ZOrder = 10;
```

The difference being that the second backgroud starts halfway above the top of the screen

Lastly we also need to update the StarTrooperBackground class, reason being that it has logic in it which controls how far down the screen each background sprite travels before it is moved above the other background.

SO updating this: (which was fixed at a height resolution of 480 pixels)

```csharp
Vector2 position = Position;
position.Y++;
if (position.Y == 480 )
    position.Y = -480;
Position = position;
```

To this:

```csharp
Vector2 position = Position;
position.Y++;
if (position.Y == StarTrooperGame.BackBufferHeight )
    position.Y = -StarTrooperGame.BackBufferHeight;
Position = position;
```

* * *

Updating the Trooper

For the trooper it is much simpler, we only need to update its creation parameters:

```csharp
trooper.Position = new Vector2(320, 450);
```

To this:

```csharp
trooper.Position = new Vector2(BackBufferWidth / 2, BackBufferHeight - 50);
```

Which would place the trooper in the middle of the screen and just above the bottom.

* * *

No changes needed for the condor as we are not adding them to the screen as yet.

That's it for now, I might add some helper functions later depending on how the series goes.

Now one last intermission before we get back on track with the tutorial.  As a hint you will need XNA 4.0 installed.

Laters......
