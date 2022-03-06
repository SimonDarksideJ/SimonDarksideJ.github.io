---
layout: post
title: 'Intermission #2 - Code Changes'
date: '2012-06-29 10:27:58'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

Since we are moving from single images stored as frames looped together to a single image with a picking rectangle, we need to update the framework.

This involves:

- Changing the make-up of a frame to use rectangles instead of textures (to identify the portion of the spritesheet is for each frame)
- Adding a texture to the Animation class (for the spritesheet) and updating how it uses frames
- Moving Drawing code in the Sprite Class to the Animation class, just makes things a little easier. 

I have also done a bit of house keeping in the code, nothing major, just grouped all the private elements of each class together, grouped all the properties in the class together and put the constructors at the top and the main methods in the middle.  These are always good practice when writing

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

### Frame Struct (in the Animation.CS)

All we did here was to change the Texture property and parameter to a Rectangle (rectangles are how we pick sections of images, more on that later)

| 

    
    
         1: public Texture2D image
    
    
    
         2: {
    
    
    
         3: get
    
    
    
         4: {
    
    
    
         5: return m\_image;
    
    
    
         6: }
    
    
    
         7: }
    
    
    
         8: 
    
    
    
         9: Texture2D m\_image;
    

 | 

    
    
         1: public Rectangle BoundingFrame
    
    
    
         2: {
    
    
    
         3: get
    
    
    
         4: {
    
    
    
         5: return m\_frame;
    
    
    
         6: }
    
    
    
         7: }
    
    
    
         8: 
    
    
    
         9: Rectangle m\_frame;
    

 |
| Before change | After Change |

 

And then updated the constructor likewise

| 

    
    
         1: public Frame(Texture2D image, int delay)
    
    
    
         2: {
    
    
    
         3: m\_image = image;
    
    
    
         4: m\_Delay = delay;
    
    
    
         5: }
    

 | Before |
| 

    
    
         1: public Frame(Rectangle frame, int delay)
    
    
    
         2: {
    
    
    
         3: m\_frame = frame;
    
    
    
         4: m\_Delay = delay;
    
    
    
         5: }
    

 | 
After
 |

* * *

### Animation Updates (animation.cs)

The animation class in this approach is the most affected class, it has to be the workhorse for the animation, even if there is only 1 image and no actual animation.

The basic principle is simple, store a texture and depending on which frame is to be rendered, pick that portion of the texture and display it on the screen.

The first change is mainly for performance reasons, Lists are all well and good but they can (if used incorrectly) cause memory and garbage problems through what is referred to as boxing and un-boxing (basically where the values stored in the list have to be converted or stored in slower memory space, see Shawns “[Garbage collection nirvana](http://blogs.msdn.com/shawnhar/archive/2007/07/02/twin-paths-to-garbage-collector-nirvana)” article for a clearer picture and garbage collection – basically it is bad and you should try to avoid it).  If you do not use strongly typed data or classes that can be easily broken down (basically anything that is not a Struct with the default types or default types themselves) then it causes it to slow down.  It is not by much but in high performance games even a 0.1 second delay from slow code can cause issues.

In the DigiPen tutorial however, we are using a strongly typed Struct (the frame) in a list, however since we have limited each animation to only have a specific amount of animation (it is not going to change, the texture is not going to create more animations), we do not need the extra overhead of a list.  So I have changed the storage type to an Array instead.  It goes back to old principles of keeping it simple and only use power when you really (really) need it. (in short the KISS principle all over again, you might hear that a lot here!!)

So where we originally just created the list for the animations for the sprite:

    
    
         1: List\<Frame\> m\_Frames = new List\<Frame\>();
    
    
    
    We now have an Frame(s) array, plus a few other attributes for storing the texture for our spritesheet (image) and some attributes about that texture.
    
    
    
        
        
             1: Texture2D m\_SpritesheetTexture;
        
        
        
             2: int m\_Width;
        
        
        
             3: int m\_Height;
        
        
        
             4: Color m\_Colour = new Color(255,255,255);
        
        
        
             5: Vector2 m\_Origin = Vector2.Zero;
        
        
        
             6: SpriteEffects m\_SpriteEffect = SpriteEffects.None;
        
        
        
             7: 
        
        
        
             8: Frame[] m\_Frames;
        
        
        
        Next is the biggest change to the animation class, from:
        
        
        
            
            
                 1: public Animation()
            
            
            
                 2: {
            
            
            
                 3: 
            
            
            
                 4: }
            
            
            
            To this:
            
            
            
                
                
                     1: public Animation(Texture2D SpritesheetTexture)
                
                
                
                     2: {
                
                
                
                     3: int[] Delay = { 1 };
                
                
                
                     4: m\_SpritesheetTexture = SpritesheetTexture;
                
                
                
                     5: GenerateFrames(this, 1,Delay); 
                
                
                
                     6: }
                
                
                
                     7: 
                
                
                
                     8: public Animation(Texture2D SpritesheetTexture, int FrameCount)
                
                
                
                     9: : this(SpritesheetTexture)
                
                
                
                     10: {
                
                
                
                     11: int[] Delay = new int[FrameCount];
                
                
                
                     12: for (int i=0;i\<FrameCount;i++)
                
                
                
                     13: Delay = 5;
                
                
                
                     14: GenerateFrames(this, FrameCount, Delay);
                
                
                
                     15: }
                
                
                
                     16: 
                
                
                
                     17: public Animation(Texture2D SpritesheetTexture, int FrameCount, int[] Delay)
                
                
                
                     18: : this(SpritesheetTexture)
                
                
                
                     19: {
                
                
                
                     20: GenerateFrames(this, FrameCount, Delay);
                
                
                
                     21: }
                
                
                
                     22: 
                
                
                
                     23: private void GenerateFrames(Animation animation, int FrameCount, int[] Delay)
                
                
                
                     24: {
                
                
                
                     25: 
                
                
                
                     26: int width = m\_SpritesheetTexture.Width / FrameCount;
                
                
                
                     27: int height = m\_SpritesheetTexture.Height;
                
                
                
                     28: 
                
                
                
                     29: animation.m\_Frames = new Frame[FrameCount];
                
                
                
                     30: 
                
                
                
                     31: for (int i = m\_StartingFrame; i \< FrameCount; i++)
                
                
                
                     32: {
                
                
                
                     33: animation.m\_Frames = new Frame(new Rectangle(i \* width,
                
                
                
                     34: 0, width, height), Delay);
                
                
                
                     35: }
                
                
                
                     36: m\_EndingFrame = m\_Frames.Length - 1;
                
                
                
                     37: }
                
                
                
                Here we have changed the constructor for the animation to expect a texture (our spritesheet), we then have some overloads for the constructor to make our life easier when creating Sprites (with or without animation, see the updates to the game class).  They all call a finalisation function to generate the frames for the spritesheet.  As stated before if the sprite has only 1 image in the texture, it is just an animation of 1 frame, this enables us to use the same logic regardless of how many frames a spritesheet has.
                
                
                
                This way of making everything act the same (with a few key differences) is a core principle when programming in C#, be sure to read the sections in the programming guide on inheritance and object oriented design, else you will end up writing three (or more) times the code you actually need.  It comes down to this, if you have to handle Oranges, Pears, Apples and Bananas in your application, you could write separate code for each.  However since they are all fruit, you could write all the functionality for handling fruit, have each of the items inherit from the fruit class and then just extend for each type of fruit where you need to.  A very basic example but something worth keeping in mind.
                
                
                
                In the GenerateFrames function, we interrogate the image provided, divide the width of the image by the amount of Frames you created the animated sprite with, which gives you the frame width.  then it constructs rectangles around of each frame using these values.  These rectangles become the portions of the spritesheet for each frame.
                
                
                
                Now this code expects each frame of the animation to be completely horizontal (in line with each other), it does not let you have multiple lines of images.  However the code in XX’s tutorial does do this, so you can adopt this method if you need it.
                
                
                
                The last change to the animation class is the adoption of the code to draw the sprite to the screen.  I moved it here for simplicity, the class had better access to most of the parameters required by the Spritebatch/Draw function. (check the help for more information on the Spritebatch class)
                
                
                
                 
                
                
                
                    
                    
                         1: public void Draw(GameTime gametime, SpriteBatch spritebatch,Sprite sprite)
                    
                    
                    
                         2: {
                    
                    
                    
                         3: m\_Colour.A = (byte)((sprite.Opacity \* 255) / 100);
                    
                    
                    
                         4: 
                    
                    
                    
                         5: spritebatch.Draw(m\_SpritesheetTexture, sprite.Position, CurrentFrame, m\_Colour, sprite.Rotation, m\_Origin,
                    
                    
                    
                         6: sprite.Scale, m\_SpriteEffect, 0);
                    
                    
                    
                         7: 
                    
                    
                    
                         8: }
                    
                    
                    
                     
                    
                    
                    * * *
                    
                    
                     
                    
                    
                    
                     
                    
                    
                    ### Sprite class update (Sprite.cs)
                    
                    
                    The spite class is really more of a container rather than handling the drawing of spites to the screen.  This is a common practice (like I mentioned earlier about inheritance and such).  In this we only track where the sprite should be drawn, if it is active or visible and any transformation or collision logic.  (the sprite class is the brains, where as the animation class is the looks)
                    
                    
                    
                    As I mentioned earlier in the animation class, I removed the Spritebatch Draw code and replaced it with a call to the current animations draw method.
                    
                    
                    
                    From
                    
                    
                    
                        
                        
                             1: spritebatch.Draw(m\_Animations[m\_CurrentAnimationIndex].Currentimage, m\_Position, null, new Color(255, 255, 255, alpha), 0, Vector2.Zero,
                        
                        
                        
                             2: new Vector2(ScaleX,ScaleY), SpriteEffects.None, 0);
                        
                        
                        
                        To
                        
                        
                        
                            
                            
                                 1: m\_Animations[m\_CurrentAnimationIndex].Draw(gametime, spritebatch, this);
                            
                            
                            
                            I also updated the constructors to make the sprite class easier to use with animations, this just made it simpler to create new spites, especially if they only had either:
                            
                            
                            
                            One image (like the background)
                            
                            
                            
                                
                                
                                     1: public Sprite(Texture2D Texture)
                                
                                
                                
                                     2: : base()
                                
                                
                                
                                     3: {
                                
                                
                                
                                     4: AddAnimation(new Animation(Texture));
                                
                                
                                
                                     5: }
                                
                                
                                
                                Or 1 animation sheet (like the Trooper)
                                
                                
                                
                                    
                                    
                                         1: public Sprite(Texture2D Texture,int Frames, bool Loop)
                                    
                                    
                                    
                                         2: : base()
                                    
                                    
                                    
                                         3: {
                                    
                                    
                                    
                                         4: Animation animation = new Animation(Texture,Frames);
                                    
                                    
                                    
                                         5: animation.Loop = Loop;
                                    
                                    
                                    
                                         6: animation.Play();
                                    
                                    
                                    
                                         7: 
                                    
                                    
                                    
                                         8: AddAnimation(animation);
                                    
                                    
                                    
                                         9: }
                                    
                                    
                                    
                                    This just makes the main game code easier to read as you will see below.
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                     
                                    
                                    
                                    * * *
                                    
                                    
                                     
                                    
                                    
                                    ### Main Game Code (StartrooperGame.cs)
                                    
                                    
                                     
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                    In the main game code, we need to update the “LoadResources” function that loads all our assets to now use the new methods for Spritesheets
                                    
                                    
                                    
                                    **Background**
                                    
                                    
                                    
                                    For the Background, we updated it from:
                                    
                                    
                                    
                                        
                                        
                                             1: Background bg = new Background();
                                        
                                        
                                        
                                             2: 
                                        
                                        
                                        
                                             3: Animation backGroundAnimation = new Animation();
                                        
                                        
                                        
                                             4: 
                                        
                                        
                                        
                                             5: Texture2D background = Content.Load\<Texture2D\>(@"Pictures\background");
                                        
                                        
                                        
                                             6: Frame backGroundFrame = new Frame(background, 0);
                                        
                                        
                                        
                                             7: backGroundAnimation.Add(backGroundFrame);
                                        
                                        
                                        
                                             8: 
                                        
                                        
                                        
                                             9: bg.Add(backGroundAnimation);
                                        
                                        
                                        
                                        To
                                        
                                        
                                        
                                            
                                            
                                                 1: Texture2D background = Content.Load\<Texture2D\>(@"Pictures\background");
                                            
                                            
                                            
                                                 2: 
                                            
                                            
                                            
                                                 3: Background bg = new Background(background);
                                            
                                            
                                            
                                            Although to do this since the Background is a class derived from the Main Sprite class, we also had to add another constructor to the StarTrooper Background class just to make use of the new constructor in the Sprite Class
                                            
                                            
                                            
                                                
                                                
                                                     1: public Background(Texture2D Texture)
                                                
                                                
                                                
                                                     2: : base(Texture)
                                                
                                                
                                                
                                                     3: { }
                                                
                                                
                                                
                                                Simple enough.
                                                
                                                
                                                
                                                **Trooper**
                                                
                                                
                                                
                                                For the Trooper we see a bit more benefit from all these changes, since it has many images as part of it is animation, this went from :
                                                
                                                
                                                
                                                    
                                                    
                                                         1: Trooper trooper = new Trooper();
                                                    
                                                    
                                                    
                                                         2: 
                                                    
                                                    
                                                    
                                                         3: Animation trooperAnimation = new Animation();
                                                    
                                                    
                                                    
                                                         4: 
                                                    
                                                    
                                                    
                                                         5: Frame afTrooper01 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper01"), 5);
                                                    
                                                    
                                                    
                                                         6: Frame afTrooper02 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper02"), 5);
                                                    
                                                    
                                                    
                                                         7: Frame afTrooper03 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper03"), 5);
                                                    
                                                    
                                                    
                                                         8: Frame afTrooper04 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper04"), 5);
                                                    
                                                    
                                                    
                                                         9: Frame afTrooper05 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper05"), 5);
                                                    
                                                    
                                                    
                                                         10: Frame afTrooper06 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper06"), 5);
                                                    
                                                    
                                                    
                                                         11: 
                                                    
                                                    
                                                    
                                                         12: 
                                                    
                                                    
                                                    
                                                         13: trooperAnimation.Add(afTrooper01);
                                                    
                                                    
                                                    
                                                         14: trooperAnimation.Add(afTrooper02);
                                                    
                                                    
                                                    
                                                         15: trooperAnimation.Add(afTrooper03);
                                                    
                                                    
                                                    
                                                         16: trooperAnimation.Add(afTrooper04);
                                                    
                                                    
                                                    
                                                         17: trooperAnimation.Add(afTrooper05);
                                                    
                                                    
                                                    
                                                         18: trooperAnimation.Add(afTrooper06);
                                                    
                                                    
                                                    
                                                         19: trooperAnimation.Play();
                                                    
                                                    
                                                    
                                                         20: trooperAnimation.Loop = true;
                                                    
                                                    
                                                    
                                                         21: 
                                                    
                                                    
                                                    
                                                         22: trooper.Add(trooperAnimation);
                                                    
                                                    
                                                    
                                                    To
                                                    
                                                    
                                                    
                                                        
                                                        
                                                             1: Trooper trooper = new Trooper(Content.Load\<Texture2D\>(@"Pictures\TrooperSpritesheet"), 6, true);
                                                        
                                                        
                                                        
                                                        Hopefully you see, this is a little easier to read (and if you have more players, easier to manage 🙂
                                                        
                                                        
                                                        
                                                        As with the Background, we needed to extend the Trooper class (in the StartrooperSprites.cs file) to make use of the new constructor in the main Sprite Class:
                                                        
                                                        
                                                        
                                                            
                                                            
                                                                 1: public Trooper(Texture2D Texture, int Frames, bool Loop)
                                                            
                                                            
                                                            
                                                                 2: : base(Texture, Frames, Loop)
                                                            
                                                            
                                                            
                                                                 3: { }
                                                            
                                                            
                                                            
                                                            **Condor**
                                                            
                                                            
                                                            
                                                            Lastly, the Condor.  Now this does not make use of the extended features above as it has two animations, so we still need to manage adding the animations manually while still updating to now use the spritesheet functionality, this results in going from:
                                                            
                                                            
                                                            
                                                                
                                                                
                                                                     1: Condor condor = new Condor();
                                                                
                                                                
                                                                
                                                                     2: 
                                                                
                                                                
                                                                
                                                                     3: Animation condorAnimation = new Animation();
                                                                
                                                                
                                                                
                                                                     4: 
                                                                
                                                                
                                                                
                                                                     5: Frame afcondor01 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor01"), 5);
                                                                
                                                                
                                                                
                                                                     6: Frame afcondor02 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor02"), 5);
                                                                
                                                                
                                                                
                                                                     7: Frame afcondor03 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor03"), 5);
                                                                
                                                                
                                                                
                                                                     8: Frame afcondor04 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor04"), 5);
                                                                
                                                                
                                                                
                                                                     9: 
                                                                
                                                                
                                                                
                                                                     10: condorAnimation.Add(afcondor01);
                                                                
                                                                
                                                                
                                                                     11: condorAnimation.Add(afcondor02);
                                                                
                                                                
                                                                
                                                                     12: condorAnimation.Add(afcondor03);
                                                                
                                                                
                                                                
                                                                     13: condorAnimation.Add(afcondor04);
                                                                
                                                                
                                                                
                                                                     14: condorAnimation.Play();
                                                                
                                                                
                                                                
                                                                     15: condorAnimation.Loop = true;
                                                                
                                                                
                                                                
                                                                     16: 
                                                                
                                                                
                                                                
                                                                     17: Frame afcondorExplosion01 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condorexplosion01"), 4);
                                                                
                                                                
                                                                
                                                                     18: Frame afcondorExplosion02 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condorexplosion01"), 3);
                                                                
                                                                
                                                                
                                                                     19: Frame afcondorExplosion03 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condorexplosion01"), 4);
                                                                
                                                                
                                                                
                                                                     20: 
                                                                
                                                                
                                                                
                                                                     21: Animation condorExplosion = new Animation();
                                                                
                                                                
                                                                
                                                                     22: condorExplosion.Add(afcondorExplosion01);
                                                                
                                                                
                                                                
                                                                     23: condorExplosion.Add(afcondorExplosion02);
                                                                
                                                                
                                                                
                                                                     24: condorExplosion.Add(afcondorExplosion03);
                                                                
                                                                
                                                                
                                                                     25: 
                                                                
                                                                
                                                                
                                                                     26: condorExplosion.Play();
                                                                
                                                                
                                                                
                                                                     27: 
                                                                
                                                                
                                                                
                                                                     28: condor.Add(condorAnimation);
                                                                
                                                                
                                                                
                                                                     29: condor.Add(condorExplosion);
                                                                
                                                                
                                                                
                                                                To
                                                                
                                                                
                                                                
                                                                    
                                                                    
                                                                         1: Condor condor = new Condor();
                                                                    
                                                                    
                                                                    
                                                                         2: 
                                                                    
                                                                    
                                                                    
                                                                         3: Animation condorAnimation = new Animation(Content.Load\<Texture2D\>(@"Pictures\CondorSpritesheet"), 4);
                                                                    
                                                                    
                                                                    
                                                                         4: 
                                                                    
                                                                    
                                                                    
                                                                         5: condorAnimation.Play();
                                                                    
                                                                    
                                                                    
                                                                         6: condorAnimation.Loop = true;
                                                                    
                                                                    
                                                                    
                                                                         7: 
                                                                    
                                                                    
                                                                    
                                                                         8: int[] ExplosionDelay = {4,3,4};
                                                                    
                                                                    
                                                                    
                                                                         9: Animation condorExplosion = new Animation(Content.Load\<Texture2D\>(@"Pictures\CondorExplosionSpritesheet"), 3, ExplosionDelay);
                                                                    
                                                                    
                                                                    
                                                                         10: 
                                                                    
                                                                    
                                                                    
                                                                         11: condorExplosion.Play();
                                                                    
                                                                    
                                                                    
                                                                         12: 
                                                                    
                                                                    
                                                                    
                                                                         13: condor.AddAnimation(condorAnimation);
                                                                    
                                                                    
                                                                    
                                                                         14: condor.AddAnimation(condorExplosion);
                                                                    
                                                                    
                                                                    
                                                                    Still a lot cleaner and easier to use, if you add more enemies, depending whether you have one or more animations, you can use either of the two methods above,  Since the condor is not making use of the sprite enhancements we do not need to modify it.
                                                                    
                                                                    
                                                                    
                                                                    Now I have left it this way to show the different ways you could apply this, personally I would of made the condor and the explosion separate sprites so the explosion could be used, this simplifying the condor class implementation and letting use use the explosion for other objects in the game. (Although I may do this later after the main tutorial has finished.
                                                                    
                                                                    
                                                                    
                                                                     
                                                                    
                                                                    
                                                                    * * *
                                                                    
                                                                    
                                                                     
                                                                    
                                                                    
                                                                    ### Conclusion
                                                                    
                                                                    
                                                                    I have not gone through the clean up here, you can browse the updates to the project in the download, I have even included the un-cleaned up version for reference if you are interested.
                                                                    
                                                                    
                                                                    
                                                                    I will point that this is only one implementation of using spritesheets based on updating the original DigiPen framework only.
                                                                    
                                                                    
                                                                    
                                                                    As I mentioned in a previous post, there is another god tutorial on Spritesheets [over here](http://coderplex.blogspot.com/2010/04/2d-animation-part-1-basics.html) and let us not forget the Platform Starter kit included with XNA GS 3.1, which uses spritesheets for all it is animations.
                                                                    
                                                                    
                                                                    
                                                                    There are a few limitations to the implementation here (and in both the other samples I’ve mentioned)
                                                                    
                                                                
                                                                
                                                            
                                                            
                                                        
                                                        
                                                    
                                                    
                                                
                                                
                                            
                                            
                                        
                                        
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

- You can only have 1 animation per spritesheet (even though in this project there are properties for specifying different start and end frames, applying them effectively is tricky, try it if you wish)
- Compiling several animations using different sizes is not supported, You also cannot put all your sprite assets on a single sheet (which would be very beneficial).  There are other implementation’s like Nick Gravelin’s [Sprite packer](http://nickgravelyn.com/2009/10/sprite-sheet-packer-tool-xna-gs-example/), but they do not support animations.  Feel free to enhance these and some up with you are own monster one if you wish, but this breaks the KISS rule 🙂 

Well enjoy play and have fun, on to the next Intermission.

