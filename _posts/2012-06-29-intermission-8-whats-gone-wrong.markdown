---
layout: post
title: 'Intermission #8 - What has gone wrong?'
date: 2012-06-29 11:13:06
tags: [2d tutorial, game development, xna]
---

The title reflects that odd moment when you have added some new content to your project, you have been meticulous and double checked everything, it should be OK.  But it is not.

The odd pain as you scramble through the code, add breakpoints and sometimes spend hours looking for what you missed, miss-typed or just plain got wrong.

Drawing bugs are fairly easy to recognise, two objects are drawn in the wrong order, are missing or are in the wrong colour or format, even shader bugs are usually easy to notice although they can be sometimes a nasty piece of work to get right.

Breaking bugs are generally easy, your code wo not compile and you get lots of warnings, to trace back o the root of the problem (my worst offence has always been the scope of a class or function, always takes me a few attempts to find the right balance).

In games there is nothing worse than a performance bug.  Which is what I hit while writing the last Intermission, so this has prompted and impromptu ( ![Smile](/blogs/darkgenesis/wlEmoticonsmile_02957592.png)) intermission before we jump back on to Windows Phone 7 and get that back up to speed.

Code is already included in the same [codeplex area](http://startrooper2dxna.codeplex.com/releases/view/46712) as the last post, for those of you like with with an astonishingly bad short term memory…. (the link is earlier on this line)…


### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

 

* * *

 


### Identifying the problem

Discovering a performance problem is usually easy to spot, your game runs like it was published on a badly written and run on a [ZX 81](http://en.wikipedia.org/wiki/ZX81) (almost showing my age, ZX 81’s were not new when I started doing games ![Open-mouthed smile](/assets/img/wordpress/2012/06/wlEmoticon-openmouthedsmile1.png), doh.).  It is slow, it is cranky, it stops responding to your input or looks like it has crashed (that is indeed if it has not)

There are several tools for digging in to your game and wheezing out all the intricate details for how your game is running:

> ![](assets/img/posts/image-not-found.png)    [MS PIX](http://msdn.microsoft.com/en-gb/directx/default) (part of the Direct X SDK)   
> ![](assets/img/posts/image-not-found.png)    [NVIDIA PERFHud](http://developer.nvidia.com/object/nvperfhud_home.html) (part of the Nvidia PerfSDK) – Useful [Post here](http://mynameismjp.wordpress.com/2010/03/06/d3d-performance-and-debugging-tools-round-up-perfhud/) on how to get the most of this in XNA   
> ![](assets/img/posts/image-not-found.png)    [AMD PerfTools](http://developer.amd.com/gpu/PerfStudio/Pages/default)   
> ![](assets/img/posts/image-not-found.png)    The [Performance Timers](http://performancetimers.codeplex.com/) Project on Codeplex (could not get this to actually work, but with a little more time it looks like it is quite good and simple to use)

All these tools are good and will give you a great deal of information on how your game or app is running, however….

 

* * *

 


### The KISS approach

As we do not have a large asset base or a complex set of routines in the background, there are a few simple tricks to see if you do actually have a problem.  We just need to take some timing measurements and check our game is actually running as expected.

I have used these principles and solved many an issue in the past, they are always a good indicator if you need to dig deeper or if there is just a simple problem that needs tweaking.

As an example of this, one of the first games I wrote for a competition seemed to be working well, however over time the game would get slower and slower until it became unresponsive.  After doing some checking I could not see any actual problem.  After putting some timings into my code and a few tests, the answer became obvious, I was creating new spritebatch’s each update loop and they were either left in memory or were making garbage.  A two second code change soon resolved that and everything was hunky dory (until the next time ![Smile](/assets/img/wordpress/2012/06/wlEmoticon-smile.png)).

So how did I do this, the answer is actually very straight forward, use a clock ![Winking smile](/assets/img/wordpress/2012/06/wlEmoticon-winkingsmile.png).

 

* * *

 


### Game Monitoring or Stopwatch class

Implementing watches in your code is very straight forward and I’ve put together a little Game Component to do all the hard work for you (not that it is that hard really).  This component offers two simple features:

> ![](assets/img/posts/image-not-found.png)    A stopwatch list which measures when events start, finish and the time it took.   
> ![](assets/img/posts/image-not-found.png)    A display list, to record things when they happen and what they look like.

Here is what the class looks like:

    
    
         1: using System;
    
    
    
         2: using System.Collections.Generic;
    
    
    
         3: using System.Linq;
    
    
    
         4: using Microsoft.Xna.Framework;
    
    
    
         5: using Microsoft.Xna.Framework.Audio;
    
    
    
         6: using Microsoft.Xna.Framework.Content;
    
    
    
         7: using Microsoft.Xna.Framework.GamerServices;
    
    
    
         8: using Microsoft.Xna.Framework.Graphics;
    
    
    
         9: using Microsoft.Xna.Framework.Input;
    
    
    
         10: using Microsoft.Xna.Framework.Media;
    
    
    
         11: using Microsoft.Xna.Framework.Net;
    
    
    
         12: using Microsoft.Xna.Framework.Storage;
    
    
    
         13: 
    
    
    
         14: 
    
    
    
         15: namespace TestProject
    
    
    
         16: {
    
    
    
         17: public class Stopwatch
    
    
    
         18: {
    
    
    
         19: public long Start;
    
    
    
         20: public long Stop;
    
    
    
         21: public long Difference { get { return Stop - Start; } }
    
    
    
         22: }
    
    
    
         23: public class DisplayInfo
    
    
    
         24: {
    
    
    
         25: public String DisplayText;
    
    
    
         26: public int DisplayCount;
    
    
    
         27: }
    
    
    
         28: 
    
    
    
         29: /// \<summary\>
    
    
    
         30: /// This is a game component that implements IUpdateable.
    
    
    
         31: /// \</summary\>
    
    
    
         32: public class TimerDisplay : Microsoft.Xna.Framework.DrawableGameComponent
    
    
    
         33: {
    
    
    
         34: SpriteFont font;
    
    
    
         35: 
    
    
    
         36: private Dictionary\<String, Stopwatch\> m\_GameWatches = new Dictionary\<String, Stopwatch\>();
    
    
    
         37: private Dictionary\<int, DisplayInfo\> m\_DisplayInformation = new Dictionary\<int, DisplayInfo\>();
    
    
    
         38: 
    
    
    
         39: public TimerDisplay(Game game)
    
    
    
         40: : base(game)
    
    
    
         41: {
    
    
    
         42: // TODO: Construct any child components here
    
    
    
         43: font = Game.Content.Load\<SpriteFont\>("SpriteFont1");
    
    
    
         44: DrawOrder = 300;
    
    
    
         45: 
    
    
    
         46: }
    
    
    
         47: 
    
    
    
         48: /// \<summary\>
    
    
    
         49: /// Allows the game to perform any initialization it needs to before starting to run.
    
    
    
         50: /// This is where it can query for any required services and load any non-graphic
    
    
    
         51: /// related content. Calling base.Initialize will enumerate through any components
    
    
    
         52: /// and initialize them as well.
    
    
    
         53: /// \</summary\>
    
    
    
         54: public override void Initialize()
    
    
    
         55: {
    
    
    
         56: // TODO: Add your initialization logic here
    
    
    
         57: 
    
    
    
         58: base.Initialize();
    
    
    
         59: }
    
    
    
         60: 
    
    
    
         61: /// \<summary\>
    
    
    
         62: /// LoadContent will be called once per game and is the place to load
    
    
    
         63: /// all of your content.
    
    
    
         64: /// \</summary\>
    
    
    
         65: protected override void LoadContent()
    
    
    
         66: {
    
    
    
         67: // TODO: use this.Content to load your game content here
    
    
    
         68: }
    
    
    
         69: 
    
    
    
         70: /// \<summary\>
    
    
    
         71: /// UnloadContent will be called once per game and is the place to unload
    
    
    
         72: /// all content.
    
    
    
         73: /// \</summary\>
    
    
    
         74: protected override void UnloadContent()
    
    
    
         75: {
    
    
    
         76: // TODO: Unload any non ContentManager content here
    
    
    
         77: }
    
    
    
         78: 
    
    
    
         79: 
    
    
    
         80: /// \<summary\>
    
    
    
         81: /// Allows the game component to update itself.
    
    
    
         82: /// \</summary\>
    
    
    
         83: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
    
    
    
         84: public override void Update(GameTime gameTime)
    
    
    
         85: {
    
    
    
         86: // TODO: Add your update code here
    
    
    
         87: 
    
    
    
         88: base.Update(gameTime);
    
    
    
         89: }
    
    
    
         90: 
    
    
    
         91: /// \<summary\>
    
    
    
         92: /// This is called when the game should draw itself.
    
    
    
         93: /// \</summary\>
    
    
    
         94: /// \<param name="gameTime"\>Provides a snapshot of timing values.\</param\>
    
    
    
         95: public override void Draw(GameTime gameTime)
    
    
    
         96: {
    
    
    
         97: SpriteBatch spritebatch = StarTrooperGame.spriteBatch;
    
    
    
         98: int i = 10;
    
    
    
         99: spritebatch.Begin();
    
    
    
        100: foreach (String watch in m\_GameWatches.Keys)
    
    
    
        101: {
    
    
    
        102: spritebatch.DrawString(font, watch + "-" + m\_GameWatches[watch].Difference.ToString(), new Vector2(50, 55 + i), Color.White);
    
    
    
        103: i += 20;
    
    
    
        104: }
    
    
    
        105: foreach (int info in m\_DisplayInformation.Keys)
    
    
    
        106: {
    
    
    
        107: spritebatch.DrawString(font, m\_DisplayInformation[info].DisplayText + ": " + m\_DisplayInformation[info].DisplayCount.ToString(), new Vector2(50, 55 + i), Color.White);
    
    
    
        108: i += 20;
    
    
    
        109: }
    
    
    
        110: 
    
    
    
        111: spritebatch.End();
    
    
    
        112: 
    
    
    
        113: base.Draw(gameTime);
    
    
    
        114: }
    
    
    
        115: 
    
    
    
        116: public void StartTimer(String StopwatchName,long Time)
    
    
    
        117: {
    
    
    
        118: try { m\_GameWatches[StopwatchName].Start = Time; }
    
    
    
        119: catch { Stopwatch Timer = new Stopwatch(); Timer.Start = Time; m\_GameWatches.Add(StopwatchName, Timer); }
    
    
    
        120: 
    
    
    
        121: }
    
    
    
        122: 
    
    
    
        123: public void StartTimer(String StopwatchName)
    
    
    
        124: {
    
    
    
        125: StartTimer(StopwatchName, DateTime.Now.Ticks);
    
    
    
        126: }
    
    
    
        127: 
    
    
    
        128: public void StopTimer(String StopwatchName, long Time)
    
    
    
        129: {
    
    
    
        130: try { m\_GameWatches[StopwatchName].Stop = Time; }
    
    
    
        131: catch { Stopwatch Timer = new Stopwatch(); Timer.Stop = Time; m\_GameWatches.Add(StopwatchName, Timer); }
    
    
    
        132: }
    
    
    
        133: 
    
    
    
        134: public void StopTimer(String StopwatchName)
    
    
    
        135: {
    
    
    
        136: StopTimer(StopwatchName, DateTime.Now.Ticks);
    
    
    
        137: }
    
    
    
        138: 
    
    
    
        139: public void AddUpdateDisplayInfo(int ID, String DisplayText,int value)
    
    
    
        140: {
    
    
    
        141: DisplayInfo info;
    
    
    
        142: try { info = m\_DisplayInformation[ID]; }
    
    
    
        143: catch { info = new DisplayInfo(); m\_DisplayInformation.Add(ID, info); }
    
    
    
        144: info.DisplayText = DisplayText;
    
    
    
        145: info.DisplayCount = value;
    
    
    
        146: m\_DisplayInformation[ID] = info;
    
    
    
        147: 
    
    
    
        148: }
    
    
    
        149: public void RemoveDisplayInfo(int ID)
    
    
    
        150: {
    
    
    
        151: try { m\_DisplayInformation.Remove(ID); }
    
    
    
        152: catch { }
    
    
    
        153: }
    
    
    
        154: }
    
    
    
        155: }
    
    
    
    I have not commented the code much so I’ll walk you through it.  First off, like the Particle Manager I created a basic Drawable game component (“Create New Item” –\> XNA “Game Component” –\> change inherited type from Game Component to Drawable game component and copy Draw and Content functions in)
    
    
    
    At the top of the class are two of the core parts of the event recording, two structs, one to record Stopwatch times and one to record information.
    
    
    
    > ![](assets/img/posts/image-not-found.png)    The STOPWATCH class stores start and end times in computer ticks and has a single property which displays the difference between start and finish   
    > ![](assets/img/posts/image-not-found.png)    The DISPLAYINFO class stores two information attributes, one for Text and the other for numeric’s (so that I could store information about emitters and the amount of particles they had)
    
    
    
    Following on from these structs is the main class itself, this has two Dictionaries that use the two structs.  I use dictionaries because I can use the Key of the dictionary to also store information about each item, like the Name of the stopwatch I’m recording (so I can have several and track them back later).
    
    
    
    In the constructor, I also load a font into the class, this is so the class itself can write it is output to the screen and I do not need to modify any part of my game code to do it, the class is self maintained.  We also set the Draw order for the component to ensure it is always on the top of the screen and does not interfere with the game itself. (more on fonts later in the series)
    
    
    
    After that the next section that has changed is the Draw function.  Pretty basic stuff though where we loop through each of the two dictionaries and display their contents, one after the other on the left hand side of the screen (note the “I” variable which helps control where each line is drawn)
    
    
    
    Lastly we have 4 helper functions for Starting / Stopping watches and for adding new information text or removing it from display.  These just make the implementation in the game code much smoother and easier (reducing them to single line calls for each)
    
    
    
    > ![](assets/img/posts/image-not-found.png)    I originally used a “STRUCT” for the stopwatch and displayinfo classes.  Now it was not exactly wrong but I realised an important lesson there.  ONLY use STRCTS for read only single use classes.  If you intend to change the values stored in a struct, then you probably should not be using a struct.  Because to change the values you need to really create a new or copy instance of the struct and overwrite it with one with the updated settings.
    
    
    * * *
    
    
     
    
    
    ### Adding the checks
    
    
    It usually pays to only put tests and check in where you need them, starting at a high enough point to know where to drill down.  So start with a few tests and add more as you need them (I have added a fair few to the test project, but here is where to start).
    
    
    
    One thing to keep straight in your mind if the old “[Observer effect](http://en.wikipedia.org/wiki/Observer_effect)”.  “By watching or observing something, you change that thing” (or something like that), just look up the [Schrödinger’s cat](http://en.wikipedia.org/wiki/Schr%C3%B6dinger's_cat) theory to tax you mind.  Basically, by adding observations or tests you are in fact changing how your game runs.  Too many tests can cause other problems which may indeed create a new performance issue for you to solve.  As always remember KISS (I should record tat tune), start small, drill down and remove unneeded tests.
    
    
    1. Start with the main functions in your game, Draw and Update to see if you have an Update or Draw issue ![Smile](/assets/img/wordpress/2012/06/wlEmoticon-smile.png)
    2. Then drill into the suspect function (do one at a time)
    3. Add some more tests and then drill down again
    4. Once you have passed a level or two, remove some of the higher tests to ensure they are not interfering with your results. 
    
    
    With my initial implementation, I hit big problems when 5 or more shots were fired on the screen at once, when they left the screen it did not get any better.
    
    
    
    So I added my shiny new simple testing class to my StarTrooperGame.CS class, first I created a static instance of the class, so it could be accessed easily by the entire project:
    
    
    
        
        
             1: public static TimerDisplay PerformanceTimer;
        
        
        
        And then I instantiated it in the Initialise function, so it would be ready when the game started:
        
        
        
            
            
                 1: protected override void Initialize()
            
            
            
                 2: {
            
            
            
                 3: // TODO: Add your initialization logic here
            
            
            
                 4: base.Initialize();
            
            
            
                 5: #if DEBUG
            
            
            
                 6: PerformanceTimer = new TimerDisplay(this);
            
            
            
                 7: Components.Add(PerformanceTimer);
            
            
            
                 8: #endif
            
            
            
                 9: }
            
            
            
            Note the #IF statements, I have added this to all the areas where I have implemented tests, so I can just run the game in “Release” mode to see if my changes are having any effect, if the game is in “Release” mode then the tests are ignored by the compiler.
            
            
            
            Next I added stop watch tests around the Draw and Update loops, starting each stop watch like so.
            
            
            
            Update:
            
            
            
                
                
                     1: #if DEBUG
                
                
                
                     2: PerformanceTimer.StartTimer("Time to update in ticks: ");
                
                
                
                     3: #endif
                
                
                
                Draw:
                
                
                
                    
                    
                         1: #if DEBUG
                    
                    
                    
                         2: PerformanceTimer.StartTimer("Time to draw in ticks: ");
                    
                    
                    
                         3: #endif
                    
                    
                    
                    And then stop each stopwatch before each function had finished.
                    
                    
                    
                    Update:
                    
                    
                    
                        
                        
                             1: #if DEBUG
                        
                        
                        
                             2: PerformanceTimer.StopTimer("Time to update in ticks: ");
                        
                        
                        
                             3: #endif
                        
                        
                        
                        Draw:
                        
                        
                        
                            
                            
                                 1: #if DEBUG
                            
                            
                            
                                 2: PerformanceTimer.StopTimer("Time to draw in ticks: ");
                            
                            
                            
                                 3: #endif
                            
                            
                            
                            > ![](assets/img/posts/image-not-found.png)    Note that each Stop and Start Timer call uses the same Key / Text, this is what is used in the DisplayTimer class’s dictionary to identify which clock we are dealing with.
                            
                            
                            
                            This yielded results to show that it was the Draw function that was costing me the most, so I drilled further and added the same tests in the particle managers Drawing function (see the code for the implementation or try yourself)
                            
                            
                            
                            From this I could see that the Particle manager and more specifically each Emitter was taking a long time to draw.
                            
                            
                            
                            So I then added some information queries into the Emitter Update calls to see just how much information the draw call was dealing with.  In the Particle Manager class I added the following to the beginning of the Update function:
                            
                            
                            
                                
                                
                                     1: #if DEBUG
                                
                                
                                
                                     2: StarTrooperGame.PerformanceTimer.AddUpdateDisplayInfo(-1,"Total Number of Emitters: ",m\_emitters.ActiveCount);
                                
                                
                                
                                     3: #endif
                                
                                
                                
                                And also for good measure, I also added the following inside the update loop to get information on each emitter:
                                
                                
                                
                                    
                                    
                                         1: #if DEBUG
                                    
                                    
                                    
                                         2: StarTrooperGame.PerformanceTimer.AddUpdateDisplayInfo(penode.NodeIndex,"Particle Emitter:" + penode.Item.GetType().ToString() + " - Particle Count: ",penode.Item.particles.ActiveCount);
                                    
                                    
                                    
                                         3: #endif
                                    
                                    
                                    
                                    The first calls ID is set to –1 to separate it from the rest of the emitters in the information as I want to know exactly how many emitters have been called and are active.  In the second call I use the Emitters NODE ID as the key for the report and then output the emitters type and the number of particles active in each emitter.
                                    
                                    
                                    
                                    And then it hit me, I noticed two disturbing things:
                                    
                                    
                                    
                                    > ![](assets/img/posts/image-not-found.png)    Firstly, each emitter was using a very large amount of particles, I had set the threshold far too high in the emitters Initialise Constants function.  Turning this down helped (but by more than I expected, it turned out I only needed a few particles to achieve the effect I needed)   
                                    > ![](assets/img/posts/image-not-found.png)    Secondly, the emitters were not dying out.  At first this was because I was not killing the emitter when it left the screen (simple location check to kill the emitter) and second becuase I was not then removing the emitters information test I had just added (added a “Remove information” call when the emitter died, whoops).
                                    
                                    
                                    
                                    The last part of that was a but silly but a good example where I fixed the problem but because I did not update my tests, it did not seem to go away.  In reference I added the following in the Particle Managers Update call to remove the information I was tracking when a emitter died (this shows both fixes for the second issue:
                                    
                                    
                                    
                                        
                                        
                                             1: if (!penode.Item.Active) // Emitter has left the screen or has been made inactive
                                        
                                        
                                        
                                             2: {
                                        
                                        
                                        
                                             3: m\_emitters.Return(penode);
                                        
                                        
                                        
                                             4: #if DEBUG 
                                        
                                        
                                        
                                             5: StarTrooperGame.PerformanceTimer.RemoveDisplayInfo(penode.NodeIndex);
                                        
                                        
                                        
                                             6: #endif
                                        
                                        
                                        
                                             7: }
                                        
                                        
                                        
                                        Feel free to play with this information gathering and see what you can dig up.  After all the main parts have been fixed, I added some extra tests in to the project and it now sees the main resource hog is XNA’s own Draw call outside of my game, but this could be because of the testing itself, see below:
                                        
                                        
                                        
                                        ![image](assets/img/posts/image-not-found.png)
                                        
                                        
                                        
                                        Here you can see the information test listed on the left hand side of the screen with the run time values, note that the main clock tick cost (game runtime cost) is now coming from the Base Game class.  The particle Manager and each emitter is behaving itself nicely.
                                        
                                        
                                        
                                         
                                        
                                        
                                        * * *
                                        
                                        
                                         
                                        
                                        
                                        ### Planning ahead
                                        
                                        
                                        Of course one of the best things to do is to plan in advance for performance and try to stay ahead of the curve, here’s a few links to resources to help you do just that:
                                        
                                        
                                        
                                        > ![](assets/img/posts/image-not-found.png)    XNA Performance sessions – Best resources are on the XNA Developers central link (not the CC site which is curious, but you can find them there if you dig enough)   
                                        > ![](assets/img/posts/image-not-found.png)    Windows Phone 7 Performance – Shawn Hargreaves recently gave a [Mix 2010 session](http://channel9.msdn.com/learn/courses/WP7TrainingKit/WP7XNA/Mix10CL22Video/) on Phone performance, Channel 9 also has an [entire channel full of WP7 Training videos](http://channel9.msdn.com/learn/courses/WP7TrainingKit/WP7XNA/) as well.
                                        
                                        
                                        
                                         
                                        
                                        
                                        * * *
                                        
                                        
                                         
                                        
                                        
                                        ### Conclusion
                                        
                                        
                                        Hopefully you have gained a little insight in this extra little session, now back to updating the phone and maybe playing with the extra little idea from the post on alternate particle solutions
                                        
                                        
                                        
                                        Yay, Shiny.
                                        
                                        
                                        Technorati Tags: [xna](http://technorati.com/tags/xna),[wp7dev](http://technorati.com/tags/wp7dev),[Windows Phone 7 Development](http://technorati.com/tags/Windows+Phone+7+Development),[Performance](http://technorati.com/tags/Performance)
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

