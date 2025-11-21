---
layout: post
title: Game Implementation part two
date: 2012-06-29 09:43:26
tags: [2d tutorial, game development, xna]
---

[![image](/assets/img/wordpress/2012/07/image22.png "image")](/assets/img/wordpress/2012/07/image21.png)

Now with the engine in place we can start adding game elements into our game.

Keep in mind this is still in the style of the original DigiPen tutorial, I will update it with new XNA methods and practices in the next post.

Before starting this section please ensure you download [the code](http://startrooper2dxna.codeplex.com/releases/43706/download/121633) for the engine of the tutorial, this only includes the engine framework ready for this section of the tutorial.  Alternatively you can download the completed project for this section can also be [found here](http://startrooper2dxna.codeplex.com/releases/44143/download/119497) (if you want to skip typing all this up)


### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

 

* * *

 


# Game First Steps

(The following steps involve the “LoadResources” function that is called in the XNA “LoadContent” method.)


### Step 1: Adding the Background

The game concept (theory) is the same for all games, but sometimes there are special cases. In Star Trooper, the special case is that the background object is two instances of class Background, which is derived from Sprite class. In other words, two sprites will play the role of a scrolling background. In order to add a background, we have to add a sprite.

* * *


### Step 2: Adding Sprites (first the background)

The sprite’s visual representation in the game is the animation, which is made of one or more frames. Each frame is made of one picture (image) and a delay. An image is a physical image.

The image for the background is a Texture2D object, we initialise the image by loading it from the Content Manager:

     1: Texture2D background = Content.Load\<Texture2D\>(@"Pictures\background");

<!--CRLF-->

This declares a new Texture2D object for the background and then loads the reference to the image from the Content Manager.  Note, the path and name supplied to the LOAD method of the content manager must be the same as the path used in the Content Project and the name on the properties of the image file.

Also of note is that I have prefixed the parameter with a “@” symbol, this enables us to write a simplified path to the file, otherwise it needs to be written in C# style like this “\\Pictures\\background” using double backslashes, if you have a fairly deep folder structure this can become unreadable quite easily.

 

| [![image](/assets/img/wordpress/2012/07/image23.png "image")](/assets/img/wordpress/2012/07/image22.png) |   | [![image](/assets/img/wordpress/2012/07/image24.png "image")](/assets/img/wordpress/2012/07/image23.png) |
| 

Background image stored in the Pictures folder of the Content Project

 |   | 

Properties of the Background.png image in the Content Project.  Note the “Asset Name” property which is the name used to load objects from the Content Manager

 |

 

Animation as described in previous posts are single images which are played one after another fast enough to provide the illusion of motion (no different to the Cinema really).  Each image in the animation loop is called a FRAME, in the Digipen tutorial we declare each frame individually this is implemented as using the frame class, which maintains the texture used for each frame.  So we need to declare each frame for the background and supply our loaded background image.

The background as an animation is very simple as it contains only one image (The Trooper and Condor described later contain several images), so we need to declare the background sprite and the animation container for the background, then add the individual frames to the animation:

     1: Background bg = new Background();

<!--CRLF-->

     2:  

<!--CRLF-->

     3: Animation backGroundAnimation = new Animation();

<!--CRLF-->

Then declare and add the first (and only in this case) frame to the animation using the background image:

     1: Texture2D background = Content.Load\<Texture2D\>(@"Pictures\background");

<!--CRLF-->

     2: Frame backGroundFrame = new Frame(background, 0);

<!--CRLF-->

     3: backGroundAnimation.Add(backGroundFrame);

<!--CRLF-->

The first parameter for the new frame is the image for the animation, the second is the time (or delay) that this frame should show for, as the background animation is a single image, this is 0 to show it is continuous.  Finally we add our new frame to the animation.

Next we need to add the background animation to the background sprite and setup it is default parameters:

     1: bg.Add(backGroundAnimation);

<!--CRLF-->

     2: bg.Position = new Vector2(0, 240);

<!--CRLF-->

     3: bg.ScaleX = 640.0f / background.Width;

<!--CRLF-->

     4: bg.ScaleY = 480.0f / background.Height;

<!--CRLF-->

     5: bg.ZOrder = 10;

<!--CRLF-->

So we first create a new background, then add the animation we have created for it and set it is start position on the screen.  As this is a 2D game you will notice that the start position for the background is not in the centre of the screen.  This is so we can animate the background scrolling up the screen like this:

[![image](/assets/img/wordpress/2012/07/image25.png "image")](/assets/img/wordpress/2012/07/image24.png)

On the above illustration I have also noted the screen / viewport coordinates to make this easier to understand.

The last few parameters we are setting on the background are the scaling and zOrdering settings,  We scale the background image to fit our games intended resolution (currently fixed to 640 x 480 in the digipen tutorial, we will change this later to be more flexible).  We then also set the layer in whic the background will draw, as it is the background we set this to 10 (the highest level in this implementation), higher values are interpreted as further away from the viewer.

Lastly we need to add the background sprite to the engine’s sprite list so it will be updated and drawn with everything else:

     1: m\_AddedSprites.Add(bg);

<!--CRLF-->

You might ask, why is the image halfway down the screen, why just not put it in the centre.  The answer to this is how we actually animate the background.  There are two methods for using a single image as a rolling background image, we can use catchment rectangles on the same image and draw the correct portions of the same image to different parts of the screen, or we can simply use copy the image and prop them up next to each other (the method used here as it is easier)

So as we already have the original background added to the game, so we just need to clone (copy in memory) the original image for our second background and apply the same properties as before with one distinct difference, the start point:

     1: Background bg2 = (Background)bg.Clone();

<!--CRLF-->

     2: bg2.Position = new Vector2(0, -240);

<!--CRLF-->

     3: bg2.ScaleX = 640.0f / background.Width;

<!--CRLF-->

     4: bg2.ScaleY = 480.0f / background.Height;

<!--CRLF-->

     5: bg2.ZOrder = 10;

<!--CRLF-->

     6:  

<!--CRLF-->

     7: m\_AddedSprites.Add(bg2);

<!--CRLF-->

With the copy of the background now being placed above the first (remembering 0 is the top of the screen), we now have the following:

[![image](/assets/img/wordpress/2012/07/image26.png "image")](/assets/img/wordpress/2012/07/image25.png)

Another thing to note is that we actually Cloned the original image, we did not copy it.  The difference is memory, copy would create a second image in memory (which if fine for some cases) but since we want exactly the same image with no differences, what clone does is to just reference (point) to the same image in memory.  The benefit being that there is only actually one image loaded into memory for the two that are drawn to the screen.  For gaming we should always try to conserve memory wherever possible. 

* * *


### Step 3: Adding the “Trooper” Sprite

Next we need to add our trooper (the valiant fighter against the dreaded condors !!)

Now unlike the background out trooper does have some animation for the character, this is made up of six individual images:

| Animation step 1 | Animation step 2 | Animation step 3 |
| [![image](/assets/img/wordpress/2012/07/image27.png "image")](/assets/img/wordpress/2012/07/image26.png) | [![image](/assets/img/wordpress/2012/07/image28.png "image")](/assets/img/wordpress/2012/07/image27.png) | [![image](/assets/img/wordpress/2012/07/image29.png "image")](/assets/img/wordpress/2012/07/image28.png) |

| Animation step 4 | Animation step 5 | Animation step 6 |
| [![image](/assets/img/wordpress/2012/07/image30.png "image")](/assets/img/wordpress/2012/07/image29.png) | [![image](/assets/img/wordpress/2012/07/image31.png "image")](/assets/img/wordpress/2012/07/image30.png) | [![image](/assets/img/wordpress/2012/07/image32.png "image")](/assets/img/wordpress/2012/07/image31.png) |

Looking at the images above we can see the animated effect results in the Trooper wagging it is tail and wings, these must be looped together and played at a rate sufficient to fool our eyes into thinking it is moving.

Now in the original DigiPen implementation we had to mess around with transparency colours when loading the images (using a strong colour like magenta as the background) however XNA has support for several image formats and several inherently support transparency in the make up of the image format.  I have already converted the original images to the PNG format to make things easier for handling transparency. (so that when the trooper is drawn on top of the background, we only see the trooper character itself)

So like before we need to

1. Declare a new sprite (the Trooper object)
2. Load the six images from the content manager
3. Create the frames for the animation and add them to a new animation
4. Add the animation to the Trooper sprite
5. Set up the rest of the sprite parameters
6. Add the trooper to the Engine’s sprite management list 

SO:

     1: Trooper trooper = new Trooper();

<!--CRLF-->

     2:  

<!--CRLF-->

     3: Animation trooperAnimation = new Animation();

<!--CRLF-->

     4:  

<!--CRLF-->

     5: Frame afTrooper01 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper01"), 5);

<!--CRLF-->

     6: Frame afTrooper02 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper02"), 5);

<!--CRLF-->

     7: Frame afTrooper03 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper03"), 5);

<!--CRLF-->

     8: Frame afTrooper04 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper04"), 5);

<!--CRLF-->

     9: Frame afTrooper05 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper05"), 5);

<!--CRLF-->

     10: Frame afTrooper06 = new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper06"), 5);

<!--CRLF-->

     11:  

<!--CRLF-->

     12:  

<!--CRLF-->

     13: trooperAnimation.Add(afTrooper01);

<!--CRLF-->

     14: trooperAnimation.Add(afTrooper02);

<!--CRLF-->

     15: trooperAnimation.Add(afTrooper03);

<!--CRLF-->

     16: trooperAnimation.Add(afTrooper04);

<!--CRLF-->

     17: trooperAnimation.Add(afTrooper05);

<!--CRLF-->

     18: trooperAnimation.Add(afTrooper06);

<!--CRLF-->

     19: trooperAnimation.Play();

<!--CRLF-->

     20: trooperAnimation.Loop = true;

<!--CRLF-->

     21:  

<!--CRLF-->

     22: trooper.Add(trooperAnimation);

<!--CRLF-->

     23: trooper.Position = new Vector2(320, 450);

<!--CRLF-->

     24:  

<!--CRLF-->

     25: m\_AddedSprites.Add(trooper);

<!--CRLF-->

Now you will notice that I did steps two and three at the same time by passing the result of the Content.Load into the parameter of the Frame object.

We could of compacted this further by doing this:

     1: trooperAnimation.Add(new Frame(Content.Load\<Texture2D\>(@"Pictures\trooper01"), 5));

<!--CRLF-->

But this can produce unreadable code if you take it too far.  However in the next post I’ll show you a better way for handling multiple images and animations(spritesheets).

Now there is a slight difference to the background sprite animation here as the trooper has multiple frames, so you will see above that not only have we changed the value for the delay in each frame, we have also told the animation to play and to loop continuously.  This means the trooper animation starts when the game starts.

We also place the Trooper at the bottom middle of the screen (still forcing though to a fixed resolution though, fix this later)

Lastly since this is our main player character, we need to keep track of it, so we create a reference to our trooper object.

Declare a separate instance of the Trooper class in the top of our game project:

     1: public static Trooper Trooper;

<!--CRLF-->

And then after adding the trooper object to the engine’s sprite list, we simply set our project’s Trooper object to point to the trooper we just added:

     1: Trooper = trooper;

<!--CRLF-->

”Trooper” (capital T) being our game trooper and “trooper” (lowercase t) being the instance of the trooper we just created.  Usually I would try to avoid having objects with similar names as it can create confusion (even though C# understands because it is case sensitive, unlike VB which is not, in VB Trooper is the same as trooper)

If you run the project at this point you should see the following:

[![image](/assets/img/wordpress/2012/07/image33.png "image")](/assets/img/wordpress/2012/07/image32.png)

The background should be scrolling down as the update for the Background class adds 1 to the Y axis in every update and then reset’s it if it reaches the bottom of the screen.  The trooper should also be flapping happily at the bottom of the screen with not a care in the world.

* * *


### Step 4: Adding the “Condor” Sprite

The Condor (arch enemy of the Trooper) is pretty much the same implementation as the Trooper, the only real difference is that we do not add the condor to the engine’s sprite list just yet, we also do not set a start position either:

     1: Condor condor = new Condor();

<!--CRLF-->

     2:  

<!--CRLF-->

     3: Animation condorAnimation = new Animation();

<!--CRLF-->

     4:  

<!--CRLF-->

     5: Frame afcondor01 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor01"), 5);

<!--CRLF-->

     6: Frame afcondor02 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor02"), 5);

<!--CRLF-->

     7: Frame afcondor03 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor03"), 5);

<!--CRLF-->

     8: Frame afcondor04 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condor04"), 5);

<!--CRLF-->

     9:  

<!--CRLF-->

     10: condorAnimation.Add(afcondor01);

<!--CRLF-->

     11: condorAnimation.Add(afcondor02);

<!--CRLF-->

     12: condorAnimation.Add(afcondor03);

<!--CRLF-->

     13: condorAnimation.Add(afcondor04);

<!--CRLF-->

     14: condorAnimation.Play();

<!--CRLF-->

     15: condorAnimation.Loop = true;

<!--CRLF-->

Another difference is that we actually want two sets of animation for the condor, one for the condor itself flying down attacking our Trooper, we also want a nice explosion effect for when we (hopefully) shoot down the condor:

| [![image](/assets/img/wordpress/2012/07/image34.png "image")](/assets/img/wordpress/2012/07/image33.png) | [![image](/assets/img/wordpress/2012/07/image35.png "image")](/assets/img/wordpress/2012/07/image34.png) | [![image](/assets/img/wordpress/2012/07/image36.png "image")](/assets/img/wordpress/2012/07/image35.png) | [![image](/assets/img/wordpress/2012/07/image37.png "image")](/assets/img/wordpress/2012/07/image36.png) |

| [![image](/assets/img/wordpress/2012/07/image38.png "image")](/assets/img/wordpress/2012/07/image37.png) | [![image](/assets/img/wordpress/2012/07/image39.png "image")](/assets/img/wordpress/2012/07/image38.png) | [![image](/assets/img/wordpress/2012/07/image40.png "image")](/assets/img/wordpress/2012/07/image39.png) |

So 4 Condor animations and 3 explosion animations and here is the code for the explosions:

     1: Frame afcondorExplosion01 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condorexplosion01"), 4);

<!--CRLF-->

     2: Frame afcondorExplosion02 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condorexplosion01"), 3);

<!--CRLF-->

     3: Frame afcondorExplosion03 = new Frame(Content.Load\<Texture2D\>(@"Pictures\condorexplosion01"), 4);

<!--CRLF-->

     4:  

<!--CRLF-->

     5: Animation condorExplosion = new Animation();

<!--CRLF-->

     6: condorExplosion.Add(afcondorExplosion01);

<!--CRLF-->

     7: condorExplosion.Add(afcondorExplosion02);

<!--CRLF-->

     8: condorExplosion.Add(afcondorExplosion03);

<!--CRLF-->

     9:  

<!--CRLF-->

     10: condorExplosion.Play();

<!--CRLF-->

Because this is an explosion (a one time thing) we do not loop it the same as the Trooper and Condor, so we do not set the Loop parameter.

Lastly we put this all together and add it the main Condor instance.  We have just one because like the background, every time we launch a new Condor, we are just going to clone the original and set him off going at the poor defenceless Trooper.

Main Condor instance at start of game class:

     1: public static Condor Condor;

<!--CRLF-->

And the final Condor code:

     1: condor.Add(condorAnimation);

<!--CRLF-->

     2: condor.Add(condorExplosion);

<!--CRLF-->

     3: Condor = condor;

<!--CRLF-->

 

* * *


### DigiPen supplementary Notes:

In this game, by default, sprite classes are created for you in order to only create an object from them

(Trooper, Condor, and Fire (later)). Therefore, in order to add a new sprite class (for example, a car) add a file

called ‘car.cs’ and create a class called “car” that is derived from the Sprite class.

 

Using our game engine, you can even create a new game (totally different storyline) by Copying the “Engine” folder code and copying the engine specific elements from the game class (Startroopergame.cs).

* * *

Right, the game is under way.  We don’t have much in there but we have covered over the basics of adding sprites to our game, layering them on top of each other and basic animation.  Browse through the rest of the project at this point if you wish and see the basic implementation of all the theory discussed so far.

Next up a intermission or two for improvements, up to and including

- Spritesheets
- Flexible resolution 

After that, the next section of the tutorial is on “Transformation and collision of Sprites”

Laters…..

