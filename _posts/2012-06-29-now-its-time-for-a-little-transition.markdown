---
layout: post
title: Now it is time for a little transition
date: 2012-06-29 11:31:29
tags: [xna]
---

Hot on the heels of the updates to the CC GSM code, I decided to go that little bit further and add some neat effects.  These are also good for reusing in games as it provides an insight on how to use RenderTargets effectively within the XNA framework.

Most of the code here comes direct from Shawn “God of XNA” Hargreaves [reach demo code](http://creators.xna.com/en-US/minigame/reachgraphicsdemo), which so far has been the easiest RenderTarget code I have been able to read.  It has just been reworked slightly so it will work from the GSM code. (also check out Shawn’s other post on this [here for XNA 4.0](http://blogs.msdn.com/b/shawnhar/archive/2010/03/26/rendertarget-changes-in-xna-game-studio-4-0))

In case you are unaware, [RenderTargets](http://msdn.microsoft.com/en-us/library/microsoft.xna.framework.graphics.rendertarget) are used when you want to draw several screens in your game, like a Radar screen, separate missile tracking view, or like Charles “Shader god” Humphrey (aka Randomchaos) in his fantastic [flights of fancy](/blogs/randomchaos/archive/2010/07/30/deferred-lighting-teaser).

So with nothing more to do, lets bring on the first act. (Note the code for this article is the [same as the last](/blogs/darkgenesis/archive/2010/08/13/is-my-xna-game-dead-yet) , thought it better not to split the code for the sample, [still here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/50372))

* * *

## Setting up Transitions

Now an actual rendertarget is just a texture stored in memory, what makes it different is that it is in exactly the same format as the graphics backbuffer (The area on the graphics card memory when the output to screen is stored).

Rendertargets have been used for many things, baking light textures, displacement maps, multi-screen displays and much much more.  But we can keep simple and use this functionality to add a little grace to our games.

If you download Shawn’s reach demo from the CC site and run it, you will notice that each time you open each of the effects from the menu or when you hit back, a little animation plays which shows the screen either:

>     Being spun around and shrunk   
>     Sliding down the screen in lines   
>     Broken up in to little pieces and shattered   
>     Have sliding windows show the next screen   
>     Sliding chequered view

These all look very nice and looking at it you might wonder how he did that, must take lots of coding to do.  Well if you thought that I'm afraid you are just dead wrong, it is quite simple, as I'll show here.

All that is actually involved are two extra draw calls for every one of those effects and effectively resolves down to this:

>     Draw your last view to a separate rendertarget texture   
>     Draw your game as normal to the screen   
>     Draw the render target texture to the screen.

Sounds simple, because it is (and I cannot believe I swayed away from them for so long ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile.png))

So lets get to it.

* * *

### Setting up a RenderTarget

The first extra thing you should notice we need is this elusive RenderTarget texture.  It is a special kind of texture in a specific format, one that is the same as the back buffer on the graphic device you are using, so it cannot just be any texture you like.

To set one up is simple, it is like this:

```csharp
RenderTarget2D transitionRenderTarget = new
RenderTarget2D(GraphicsDevice, 480, 800, false, SurfaceFormat.Color, DepthFormat.Depth24, 0, 0);
```

It breaks down like this:

>     A link to the specific Graphicsdevice you are rendering to
>     The size of the current back buffer you are drawing (can be different if you are drawing smaller screens to paint)
>     A flag to see if you are using MipMaps ([see Shawns post on these](http://blogs.msdn.com/b/shawnhar/archive/2009/09/14/texture-filtering-mipmaps))
>     The SurfaceFormat where it tells it the kind of texture being used
>     The DepthFormat, sets the type of depth stencil to use in alpha blending and other such techniques
>     The number of mipmaps to generate or expect (if mipmapping is turned on)
>     The RenderTarget usage, so that the graphics card knows to either keep the texture in memory or discard it after use.

Drawing to the rendertarget is also simple (made even simpler in XNA 4), just change the target of draw calls to the graphics device and draw as normal:

```csharp
GraphicsDevice.SetRenderTarget(transitionRenderTarget);

spriteBatch.Begin();
spriteBatch.DrawString(gameFont, "// TODO", playerPosition, Color.Green);
spriteBatch.End();

GraphicsDevice.SetRenderTarget(null);
```

The first line tells the graphics card to draw to just the RenderTarget texture, then you draw as normal.  To finish off so that you can then begin drawing back to the screen it is important to then turn off drawing to the rendertarget and back to the main screen, as shown in the last line.

With all this in place you now have a separate texture to draw on top of (or behind?) as normal, so:

```csharp
SpriteBatch.Begin()
SpriteBatch.Draw(BackgroundTexture,new Rectangle(0, 0, 400, 800),Color.White);
SpriteBatch.Draw(transitionRenderTarget, new Rectangle(0, 0, w, 800), new Rectangle(0, 0, 240, 800), Color.White * alpha);
SpriteBatch.End();
```

Right, enough theory, lets add some transition to the sample.

* * *

### Implementation

So as stated before, we need to add a rendertarget definition to our code.  So open up the ScreenManager class (which is where most of this code will go) and add the following variables to the start of that class:

```csharp
// Constants.
const float TransitionSpeed = 1.5f;

public Texture2D BlankTexture { get; private set; }

// Transition effects provide swooshy crossfades when moving from one screen to another.
float transitionTimer = float.MaxValue;
int transitionMode = 0;

RenderTarget2D transitionRenderTarget;

GameTime currentGameTime;
```

There are a few extra variables there to cover the new transitions, they are not to be confused with the existing transition effects implemented in the base of the existing GSM framework.

Next in the Load Content function, we need to initialise some of these variables, like the rendertarget:

```csharp
BlankTexture = new Texture2D(GraphicsDevice, 1, 1);
BlankTexture.SetData(new Color[] { Color.White });

transitionRenderTarget = new RenderTarget2D(GraphicsDevice, 480, 800, false, SurfaceFormat.Color, DepthFormat.Depth24, 0, 0);
```

You  might notice when looking at the original CC GSM sample code that there was an existing Blank Texture, however I have cleaned it up in the final sample to use this new one as it is cleaner and does not require an asset to initialise.

There is nothing required in the Update function as the transition effects are self sustaining, we will come back to the Draw function later.

Next up is the function that will set the transition effect into motion by any screen wishing to make use of it:

```csharp
/// <summary>
/// Begins a transition effect, capturing a copy of the current screen into the transitionRenderTarget.
/// </summary>
public void BeginTransition(int TransitionMode)
{

GraphicsDevice.SetRenderTarget(transitionRenderTarget);

// Draw the old menu screen into the rendertarget.
foreach (GameScreen screen in screens)
{
screen.Draw(currentGameTime);
}

// Force the rendertarget alpha channel to fully opaque.
SpriteBatch.Begin(0, BlendState.Additive);
SpriteBatch.Draw(BlankTexture, new Rectangle(0, 0, 480, 800), new Color(0, 0, 0, 255));
SpriteBatch.End();

GraphicsDevice.SetRenderTarget(null);

// Initialize the transition state.
transitionTimer = (float)Game.TargetElapsedTime.TotalSeconds;
transitionMode = TransitionMode;
}
```

You should recognise most of this from the explanation earlier but I’ll walk through it again anyway.

Here I set the graphics device to draw to the render target, draw the screens that were active before the move to the next screen.  This screenshot is then stored as a texture.  It then sets the alpha channel of this texture as solid (opaque).

Finally I pass the graphics back to the main screen and reset the transition timer and set the variable that controls which transition effect to draw.

This has set the stage for our little animated transition effect, we could refresh this transition image if you wished, but we are just keeping it simple for now.

Next is the Transition Management code:

```csharp
/// <summary>
/// Draws the transition effect, displaying various animating pieces of the rendertarget
/// which contains the previous scene image over the top of the new scene. There are
/// various different effects which animate these pieces in different ways.
/// </summary>
void DrawTransitionEffect()
{
if (transitionTimer >= TransitionSpeed)
return;

SpriteBatch.Begin();

float mu = transitionTimer / TransitionSpeed;
float alpha = 1 - mu;

switch (transitionMode)
{

default:
// Returning to menu.
DrawShrinkAndSpinTransition(mu, alpha);
break;
}

SpriteBatch.End();
}
```

This function is called by the Draw function after all the game drawing has been done, so that the transition effect is drawn over the main game / menu currently in use.

Based on which transition was selected when Begin Transition was called, the switch statement then decides which actual effect it called.  I have included on here in this example but the sample has several more (mainly from Shawn's sample but I have added one myself to imitate the Page Flipping animation used primarily on the phone).  You could even call several effects if you wished, especially if you are multi-sampling or doing any kind of alpha / additive blending in the effect.

So, the BeginTransition starts the effect and DrawTransition draws it, next we need the effect itself:

```csharp
/// <summary>
/// Transition effect where the image spins off toward the bottom left of the screen.
/// </summary>
void DrawShrinkAndSpinTransition(float mu, float alpha)
{
Vector2 origin = new Vector2(240, 400);
Vector2 translate = (new Vector2(32, 800 - 32) - origin) * mu * mu;

float rotation = mu * mu * -4;
float scale = alpha * alpha;

Color tint = Color.White * (float)Math.Sqrt(alpha);

SpriteBatch.Draw(transitionRenderTarget, origin + translate, null, tint, rotation, origin, scale, 0, 0);
}
```

The above shows a simple page effect that takes the last screen, then shrinks and spins it into the bottom left corner.

To finish off the implementation, just need to add the following line to the very end  of the Draw function in the Screen Manager class:

```csharp
DrawTransitionEffect();
```

Just to ensure that the transition effects get drawn while they are active.

* * *

### Running with the effect.

Now like with anything else you have to implement any new feature carefully.  In the CC GSM sample that we are building on there is a whole base of other transitions going on that you have to cater for, so be careful.  To keep it simple, I have just implemented these new transition effects in to the Loading screen, so that when it has finished loading the next screen or after a certain amount of time, it transitions and flies away.

You could extend this by changing the loading function to accept a new parameter to choose which effect is called when it is done (do not want to do everything for you now do I?).

If you try to use the transition on any of the Menu screens, be aware that the base GSM transitions are still playing so won't be affected by the transition and will still play in the back ground until it is finished.  Turning this off and using another method can be tricky without ripping it all out, so be warned.  Use this where it will have the greatest effect and use the GSM transition for other times, as with anything there are always choices.

Anyway, to add the new transition to the Loading screen just update the Update function to the following in the “LoadingScreen” class in the Screens folder:

```csharp
/// <summary>
/// Updates the loading screen.
/// </summary>
public override void Update(GameTime gameTime, bool otherScreenHasFocus,
bool coveredByOtherScreen)
{
base.Update(gameTime, otherScreenHasFocus, coveredByOtherScreen);

// If all the previous screens have finished transitioning
// off, it is time to actually perform the load.
if (otherScreensAreGone)
{
ScreenManager.BeginTransition(0); //<-- Transition call added here
ScreenManager.RemoveScreen(this);

foreach (GameScreen screen in screensToLoad)
{
if (screen != null)
{
ScreenManager.AddScreen(screen, ControllingPlayer);
}
}

// Once the load has finished, we use ResetElapsedTime to tell
// the game timing mechanism that we have just finished a very
// long frame, and that it should not try to catch up.
ScreenManager.Game.ResetElapsedTime();
}
}
```

Now the splash screen and the Game loading screen will transition out that little bit flashier.  The actual source as I stated above has a few additional tweaks and some extra transition effects just for fun.

* * *

### Conclusion

That is the GSM updated now to make it a bit more fun, we will return to this at some point at the end of the tutorial when we start packaging the tutorial game up.  just having a game screen would not be all that fun now would it.

More fun coming up including the final part of the original DigiPen series and another extra special bonus, courtesy of Charles “Is there anything he does not do” Humphrey (aka RandomChaos).  A web based leaderboard system for the WP7 ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile.png).

Bend Over Blackadder, It is poker time!!!!

(I sometimes feel sorry for those who do not understand British humour, you are really missing out.  To start just watch all of Monty Python’s flying circus, follow up with the Monty Python films and then watch copious amounts of Blackadder and Red Dwarf.  And thus your education will have truly begun ![Open-mouthed smile](/assets/img/emoticons/openmouthedsmile.png))

Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[windows Phone development](http://technorati.com/tags/windows+Phone+development)
