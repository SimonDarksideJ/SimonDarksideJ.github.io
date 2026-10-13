---
layout: post
title: 'Intermission #2 - Code Changes'
date: 2012-06-29 10:27:58
tags: [2d tutorial, game development, xna]
---

Since we are moving from single images stored as frames looped together to a single image with a picking rectangle, we need to update the framework.

This involves:

- Changing the make-up of a frame to use rectangles instead of textures (to identify the portion of the spritesheet is for each frame)
- Adding a texture to the Animation class (for the spritesheet) and updating how it uses frames
- Moving Drawing code in the Sprite Class to the Animation class, just makes things a little easier.

I've also done a bit of house keeping in the code, nothing major, just grouped all the private elements of each class together, grouped all the properties in the class together and put the constructors at the top and the main methods in the middle. These are always good practice when writing

## Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

---

## Frame Struct (in the Animation.CS)

All we did here was to change the Texture property and parameter to a Rectangle (rectangles are how we pick sections of images, more on that later)

Before change

```csharp
        public Texture2D image
        {
            get
            {
                return m_image;
            }
        }

        Texture2D m_image;
```

After Change

```csharp
        public Rectangle BoundingFrame
        {
            get
            {
                return m_frame;
            }
        }

        Rectangle m_frame;
```

And then updated the constructor likewise

```csharp
        public Frame(Texture2D image, int delay)
        {
            m_image = image;
            m_Delay = delay;
        }
```

```csharp
        public Frame(Rectangle frame, int delay)
        {
            m_frame = frame;
            m_Delay = delay;
        }
```

Before

After

---

## Animation Updates (animation.cs)

The animation class in this approach is the most affected class, it has to be the workhorse for the animation, even if there is only 1 image and no actual animation.

The basic principle is simple, store a texture and depending on which frame is to be rendered, pick that portion of the texture and display it on the screen.

The first change is mainly for performance reasons, Lists are all well and good but they can (if used incorrectly) cause memory and garbage problems through what is referred to as boxing and un-boxing (basically where the values stored in the list have to be converted or stored in slower memory space, see Shawns "[Garbage collection nirvana](http://blogs.msdn.com/shawnhar/archive/2007/07/02/twin-paths-to-garbage-collector-nirvana.aspx)" article for a clearer picture and garbage collection - basically it's bad and you should try to avoid it). If you don't use strongly typed data or classes that can be easily broken down (basically anything that is not a Struct with the default types or default types themselves) then it causes it to slow down. It's not by much but in high performance games even a 0.1 second delay from slow code can cause issues.

In the DigiPen tutorial however, we are using a strongly typed Struct (the frame) in a list, however since we have limited each animation to only have a specific amount of animation (it's not going to change, the texture isn't going to create more animations), we don't need the extra overhead of a list. So I've changed the storage type to an Array instead. It goes back to old principles of keeping it simple and only use power when you really (really) need it. (in short the KISS principle all over again, you might hear that a lot here!!)

So where we originally just created the list for the animations for the sprite:

```csharp
        List<Frame> m_Frames = new List<Frame>();
```

We now have an Frame(s) array, plus a few other attributes for storing the texture for our spritesheet (image) and some attributes about that texture.

```csharp
        Texture2D m_SpritesheetTexture;
        int m_Width;
        int m_Height;
        Color m_Colour = new Color(255,255,255);
        Vector2 m_Origin = Vector2.Zero;
        SpriteEffects m_SpriteEffect = SpriteEffects.None;

        Frame[] m_Frames;
```

Next is the biggest change to the animation class, from:

```csharp
        public Animation()
        {

        }
```

To this:

```csharp
        public Animation(Texture2D SpritesheetTexture)
        {
            int[] Delay = { 1 };
            m_SpritesheetTexture = SpritesheetTexture;
            GenerateFrames(this, 1,Delay);
        }

        public Animation(Texture2D SpritesheetTexture, int FrameCount)
            : this(SpritesheetTexture)
        {
            int[] Delay = new int[FrameCount];
            for (int i=0;i<FrameCount;i++)
                Delay[i] = 5;
            GenerateFrames(this, FrameCount, Delay);
        }

        public Animation(Texture2D SpritesheetTexture, int FrameCount, int[] Delay)
            : this(SpritesheetTexture)
        {
            GenerateFrames(this, FrameCount, Delay);
        }

        private void GenerateFrames(Animation animation, int FrameCount, int[] Delay)
        {

            int width = m_SpritesheetTexture.Width / FrameCount;
            int height = m_SpritesheetTexture.Height;

            animation.m_Frames = new Frame[FrameCount];

            for (int i = m_StartingFrame; i < FrameCount; i++)
            {
                animation.m_Frames[i] = new Frame(new Rectangle(i * width,
                    0, width, height), Delay[i]);
            }
            m_EndingFrame = m_Frames.Length - 1;
        }
```

Here we have changed the constructor for the animation to expect a texture (our spritesheet), we then have some overloads for the constructor to make our life easier when creating Sprites (with or without animation, see the updates to the game class). They all call a finalisation function to generate the frames for the spritesheet. As stated before if the sprite has only 1 image in the texture, it's just an animation of 1 frame, this enables us to use the same logic regardless of how many frames a spritesheet has.

This way of making everything act the same (with a few key differences) is a core principle when programming in C#, be sure to read the sections in the programming guide on inheritance and object oriented design, else you will end up writing three (or more) times the code you actually need. It comes down to this, if you have to handle Oranges, Pears, Apples and Banana's in your application, you could write separate code for each. However since they are all fruit, you could write all the functionality for handling fruit, have each of the items inherit from the fruit class and then just extend for each type of fruit where you need to. A very basic example but something worth keeping in mind.

In the GenerateFrames function, we interrogate the image provided, divide the width of the image by the amount of Frames you created the animated sprite with, which gives you the frame width. then it constructs rectangles around of each frame using these values. These rectangles become the portions of the spritesheet for each frame.

Now this code expects each frame of the animation to be completely horizontal (in line with each other), it doesn't let you have multiple lines of images. However the code in XX's tutorial does do this, so you can adopt this method if you need it.

The last change to the animation class is the adoption of the code to draw the sprite to the screen. I moved it here for simplicity, the class had better access to most of the parameters required by the Spritebatch/Draw function. (check the help for more information on the Spritebatch class)

```csharp
        public void Draw(GameTime gametime, SpriteBatch spritebatch,Sprite sprite)
        {
            m_Colour.A = (byte)((sprite.Opacity * 255) / 100);

            spritebatch.Draw(m_SpritesheetTexture, sprite.Position, CurrentFrame, m_Colour, sprite.Rotation, m_Origin,
sprite.Scale, m_SpriteEffect, 0);

        }
```

---

## Sprite class update (Sprite.cs)

The spite class is really more of a container rather than handling the drawing of spites to the screen. This is a common practice (like I mentioned earlier about inheritance and such). In this we only track where the sprite should be drawn, if it is active or visible and any transformation or collision logic. (the sprite class is the brains, where as the animation class is the looks)

As I mentioned earlier in the animation class, I removed the Spritebatch Draw code and replaced it with a call to the current animations draw method.

From

```csharp
            spritebatch.Draw(m_Animations[m_CurrentAnimationIndex].Currentimage, m_Position, null, new Color(255, 255, 255, alpha), 0, Vector2.Zero,
        new Vector2(ScaleX,ScaleY), SpriteEffects.None, 0);
```

To

```csharp
            m_Animations[m_CurrentAnimationIndex].Draw(gametime, spritebatch, this);
```

I also updated the constructors to make the sprite class easier to use with animations, this just made it simpler to create new spites, especially if they only had either:

One image (like the background)

```csharp
        public Sprite(Texture2D Texture)
            : base()
        {
            AddAnimation(new Animation(Texture));
        }
```

Or 1 animation sheet (like the Trooper)

```csharp
        public Sprite(Texture2D Texture,int Frames, bool Loop)
            : base()
        {
            Animation animation = new Animation(Texture,Frames);
            animation.Loop = Loop;
            animation.Play();

            AddAnimation(animation);
        }
```

This just makes the main game code easier to read as you will see below.

---

## Main Game Code (StartrooperGame.cs)

In the main game code, we need to update the "LoadResources" function that loads all our assets to now use the new methods for Spritesheets

**Background**

For the Background, we updated it from:

```csharp
            Background bg = new Background();

            Animation backGroundAnimation = new Animation();

            Texture2D background = Content.Load<Texture2D>(@"Pictures\background");
            Frame backGroundFrame = new Frame(background, 0);
            backGroundAnimation.Add(backGroundFrame);

            bg.Add(backGroundAnimation);
```

To

```csharp
            Texture2D background = Content.Load<Texture2D>(@"Pictures\background");

            Background bg = new Background(background);
```

Although to do this since the Background is a class derived from the Main Sprite class, we also had to add another constructor to the StarTrooper Background class just to make use of the new constructor in the Sprite Class

```csharp
        public Background(Texture2D Texture)
            : base(Texture)
        { }
```

Simple enough.

**Trooper**

For the Trooper we see a bit more benefit from all these changes, since it has many images as part of it's animation, this went from :

```csharp
            Trooper trooper = new Trooper();

            Animation trooperAnimation = new Animation();

            Frame afTrooper01 = new Frame(Content.Load<Texture2D>(@"Pictures\trooper01"), 5);
            Frame afTrooper02 = new Frame(Content.Load<Texture2D>(@"Pictures\trooper02"), 5);
            Frame afTrooper03 = new Frame(Content.Load<Texture2D>(@"Pictures\trooper03"), 5);
            Frame afTrooper04 = new Frame(Content.Load<Texture2D>(@"Pictures\trooper04"), 5);
            Frame afTrooper05 = new Frame(Content.Load<Texture2D>(@"Pictures\trooper05"), 5);
            Frame afTrooper06 = new Frame(Content.Load<Texture2D>(@"Pictures\trooper06"), 5);

            trooperAnimation.Add(afTrooper01);
            trooperAnimation.Add(afTrooper02);
            trooperAnimation.Add(afTrooper03);
            trooperAnimation.Add(afTrooper04);
            trooperAnimation.Add(afTrooper05);
            trooperAnimation.Add(afTrooper06);
            trooperAnimation.Play();
            trooperAnimation.Loop = true;

            trooper.Add(trooperAnimation);
```

To

```csharp
            Trooper trooper = new Trooper(Content.Load<Texture2D>(@"Pictures\TrooperSpritesheet"), 6, true);
```

Hopefully you see, this is a little easier to read (and if you have more players, easier to manage :)

As with the Background, we needed to extend the Trooper class (in the StartrooperSprites.cs file) to make use of the new constructor in the main Sprite Class:

```csharp
    public Trooper(Texture2D Texture, int Frames, bool Loop)
          : base(Texture, Frames, Loop)
    { }
```

**Condor**

Lastly, the Condor. Now this doesn't make use of the extended features above as it has two animations, so we still need to manage adding the animations manually while still updating to now use the spritesheet functionality, this results in going from:

```csharp
            Condor condor = new Condor();

            Animation condorAnimation = new Animation();

            Frame afcondor01 = new Frame(Content.Load<Texture2D>(@"Pictures\condor01"), 5);
            Frame afcondor02 = new Frame(Content.Load<Texture2D>(@"Pictures\condor02"), 5);
            Frame afcondor03 = new Frame(Content.Load<Texture2D>(@"Pictures\condor03"), 5);
            Frame afcondor04 = new Frame(Content.Load<Texture2D>(@"Pictures\condor04"), 5);

            condorAnimation.Add(afcondor01);
            condorAnimation.Add(afcondor02);
            condorAnimation.Add(afcondor03);
            condorAnimation.Add(afcondor04);
            condorAnimation.Play();
            condorAnimation.Loop = true;

            Frame afcondorExplosion01 = new Frame(Content.Load<Texture2D>(@"Pictures\condorexplosion01"), 4);
            Frame afcondorExplosion02 = new Frame(Content.Load<Texture2D>(@"Pictures\condorexplosion01"), 3);
            Frame afcondorExplosion03 = new Frame(Content.Load<Texture2D>(@"Pictures\condorexplosion01"), 4);

            Animation condorExplosion = new Animation();
            condorExplosion.Add(afcondorExplosion01);
            condorExplosion.Add(afcondorExplosion02);
            condorExplosion.Add(afcondorExplosion03);

            condorExplosion.Play();

            condor.Add(condorAnimation);
            condor.Add(condorExplosion);
```

To

```csharp
            Condor condor = new Condor();

            Animation condorAnimation = new Animation(Content.Load<Texture2D>(@"Pictures\CondorSpritesheet"), 4);

            condorAnimation.Play();
            condorAnimation.Loop = true;

            int[] ExplosionDelay = {4,3,4};
            Animation condorExplosion = new Animation(Content.Load<Texture2D>(@"Pictures\CondorExplosionSpritesheet"), 3, ExplosionDelay);

            condorExplosion.Play();

            condor.AddAnimation(condorAnimation);
            condor.AddAnimation(condorExplosion);
```

Still a lot cleaner and easier to use, if you add more enemies, depending whether you have one or more animations, you can use either of the two methods above, Since the condor isn't making use of the sprite enhancements we don't need to modify it.

Now I've left it this way to show the different ways you could apply this, personally I would of made the condor and the explosion separate sprites so the explosion could be used, this simplifying the condor class implementation and letting us use the explosion for other objects in the game. (Although I may do this later after the main tutorial has finished.

---

## Conclusion

I've not gone through the clean up here, you can browse the updates to the project in the download, I've even included the un-cleaned up version for reference if you are interested.

I will point that this is only one implementation of using spritesheets based on updating the original DigiPen framework only.

As I mentioned in a previous post, there is another god tutorial on Spritesheets [over here](http://coderplex.blogspot.com/2010/04/2d-animation-part-1-basics.html) and let us not forget the Platform Starter kit included with XNA GS 3.1, which uses spritesheets for all it's animations.

There are a few limitations to the implementation here (and in both the other samples I've mentioned)

- You can only have 1 animation per spritesheet (even though in this project there are properties for specifying different start and end frames, applying them effectively is tricky, try it if you wish)
- Compiling several animations using different sizes is not supported, You also cannot put all your sprite assets on a single sheet (which would be very beneficial). There are other implementation's like Nick Gravelin's [Sprite packer](http://nickgravelyn.com/2009/10/sprite-sheet-packer-tool-xna-gs-example/), but they don't support animations. Feel free to enhance these and some up with you're own monster one if you wish, but this breaks the KISS rule :)

Well enjoy play and have fun, on to the next Intermission.
