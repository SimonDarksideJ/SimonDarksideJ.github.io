---
layout: post
title: Transformation and collision of Sprites - Lesson 5
date: '2012-06-29 10:38:56'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

Finally some action!!.  There is not much going on in our game at the moment, one lone ship flying in a straight line over the skies of some lone planet, not a care in the world.  Makes a nice screensaver but not much of a game.

So time to start adding something for the Trooper to be worried about, the dreaded Condor race.

As usual find the Windows, Phone 7 and original webcast plus docs [here on the Codeplex](http://startrooper2dxna.codeplex.com/releases/view/46706) site.

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

 

### Transformation of Sprites

As it stands we have images just being drawn to the screen on a background, which is pretty good but it does not make for a very good or entertaining game.  What we need is some action.

In graphics terms the way we describe movement of an image is called Transformation, the 3 major forms of transformation are called Translation, Rotation and Scale.

 

> ### 1.  Translation
> 
> Translation is the method for moving an image from one position to another or to look at an object from another direction.  In 2D translation is managed through Vectors (using the X and Y components of that Vector).  In 3D (not part of this tutorial), translations are managed through Matrices (mainly because of the complex calculations required in 3D space)
> 
> As shown, to move an object from position P (x,y) to Position P’ (x’,y’) we need to multiply the vector by the values of T (tx,ty).
> 
> This is the same as most of the common mathematical notation you will come across in games development.  In short P’x’ = Px \* tx and P’y’ = Py \* Ty.

![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_6D0481D4.png)

> When moving Sprites round in our 2D world, it becomes a lot simpler in reality, during each update we need to tell our sprite which way we need it to move, left, right, up or down and add how much we want it to move to. (shown later)

> ### 2.  Rotation
> 
> Rotation is the second type of Transformation we will cover, this is the method we use to turn or face our sprite / object to a new direction.  In mathematical terms (shown below), to change the direction the object is currently facing P(x,y) which is at an angle of a, to face a new point P’(x’,y’) we need to alter the angle by an amount of 0.  a and 0 are angles in radians or degrees.
> 
>  
> 
> ![image](http://xna-uk.net/blogs/darkgenesis/image5_thumb_481394D0.png)
> 
> Again, things are quite simple as to change the direction we are currently facing, we just add a value to our rotation amount during each update cycle for the amount we want to move.  This usually equates to the amount of change by what the player has applied (using the control stick or keyboard)

> ### 3.  Scale
> 
> Scaling alters the size of objects. It requires scaling factors Sx and Sy that determine the change in the x-direction and the y-direction. Scaling is carried out by multiplying the coordinate values of each vertex of object with the scaling factors.
> 
> In short, if you want to make an object look bigger, increase the scale factor.  If you want it smaller decrease the scale.  Also good to note, if you want to draw the image in reverse, then you can use negative values while scaling.
> 
>  
> 
> ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_06D4A405.png)
> 
> As the diagram above shows from a scale point of 0 (no image) we can scale up by a factor of 1 to show the original image size as far up as we wish.  We can also scale back by a factor of 1 to get a reverse (negative X) and upside down (negative Y) image and onwards.
> 
> In XNA however, scaling (it seems) can only be positive (most likely due to texture formats).  So we can still scale up but negative scaling tends to draw nothing.  However XNA offers a function to flip the image either horizontally or vertically.  This is provided through the use of SpriteEffects, these are then applied during the Draw function as below.
> 
>     
>     
> spritebatch.Draw(m\_SpritesheetTexture, sprite.Position, CurrentFrame, m\_Colour, sprite.Rotation, m\_Origin,
>     
>     
>     
>         
>         
> sprite.Scale, **sprite.SpriteEffect** , 0);

 

* * *

 

### Collision

Collision detection is a hotly debated and sometime tricky to implement behaviour, to see when two or more objects in your game are interacting with each other.  Collision detection is used for several purposes, such as when a shot hits a target, when one character can see another (also known as Line of Sight – LOS) or if one object is within the range of another (like radar).

There are many reasons to have collision detection and below are some of the methods used.

> ### 1.  Rectangular collision
> 
> This is the simplest method of collision.  Imaging drawing a box around your object or sprite (say the trooper), draw another one around the object you want to test against (a Condor for example) and then see if any part of each box is touching each other.  2D normally uses boxes for this type of test, in 3D normally a sphere is used.  Both of these shapes are chosen for the easy way to calculate if they are touching or overlapping each other in the environment.
> 
> #### 1.1  Detecting a Collision or Intersection
> 
> So as stated above, we test for collision based on whether one or more of the testing boxes are touching or overlapping, but how do we do this.
> 
> Using the first diagram below we can see that:

-  
  - The limit of the first bounding box is determined by:  L = 2, R = 5, T = 5, and B = 2.
  - The limit of the second bounding box is determined by:  L’ = 4, R’ = 7, T’ = 7, and B’ = 4.
  - Find the following: 

1.  
  1. Max(L, L’) = Max(2, 4) = 4
  2. Min(R, R’) = Min(5, 7) = 5
  3. Max(B, B’) = Max(2, 4) = 4
  4. Min(T, T’) = Min(5, 7) = 5 

-  
  - The two bounding boxes intersect if: 

1.  
  1. Max(Max(L,L’) – Min(R, R’), Max(B, B’) – Min(T, T’) )\<=0.
  2. Max(4 – 5, 4 – 5) )\<=0 =\> Max(-1, -1) = –1 

-  
  - Result: The two bounding boxes intersect and form a new rectangle: L=4, R=5, T=5, and B=4. 

 

| diagram showing two test boxes overlapping, objects have collided |
| ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_0A15F013.png) |
| Diagram showing two test boxes separated, objects have not collided |
| ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_5FD61C5D.png) |

> Using the same calculation as above for the second diagram:
> 
> -  
> - The limit of the first bounding box is determined by:  L = 1, R = 4, T = 4, and B = 2.
> - The limit of the second bounding box is determined by:  L’ = 5, R’ = 8, T’ = 8, and B’ = 5.
> - Find the following: 
> 
> 1.  
> 1. Max(L, L’) = Max(1, 5) = 5
> 2. Min(R, R’) = Min(4, 8) = 4
> 3. Max(B, B’) = Max(2, 5) = 5
> 4. Min(T, T’) = Min(4, 8) = 4 
> 
> -  
> - The two bounding boxes intersect if: 
> 
> 1.  
> 1. Max(Max(L,L’) – Min(R, R’), Max(B, B’) – Min(T, T’) )\<=0.
> 2. Max(5 – 4, 5 – 4) )\<=0 =\> Max(1, 1) = 1 
> 
> -  
> - Result: The two bounding boxes do not intersect since the result is positive.

 

> #### 1.2  Different Coordinate systems
> 
> Now the above calculations work fine if the bottom left hand side of the coordinates start at 0,0.  However, in graphics, this is not the case, as when drawing the screen the graphics card uses the Top Left hand side of the screen for 0,0.  This is known as the screen coordinate system.
> 
> There are other coordinate systems used in games, but mainly they apply to 3D games, we will cover those in a later tutorial.
> 
>  
> 
> ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_40BFD2F2.png)
> 
>  
> 
> Back to this tutorial, if you apply the logic from the previous section to the above diagrams (where I have change the diagram to use a screen coordinate system, with 0,0 in the top left, X moving right and Y moving down), you will find that the logic does not work and needs to be altered.
> 
> To work with a screen space coordinate system, we simply update the logic with the following modifications:

-  
  - Nothing changes regarding the left and the right.
  - Since the top has a value less than the bottom:
    - Max(B, B’) will be Min(B, B’), and
    - Min(T, T’) will be Max(T, T’). 
  - Finally, the equation should be:
    - Max(Max(L,L’) – Min(R, R’), Min(B, B’) – Max(T, T’) )\<=0. 

> Fortunately within the XNA framework, all this work is done for you, we simply create rectangles around our objects / Sprites and then use a function called “Intersects” using two rectangles to see if they intersect / collide.  Like so:
> 
>     
>     
> 1: Rectangle rect1;
>     
>     
>     
> 2: Rectangle rect2;
>     
>     
>     
> 3: Bool intersecttest;
>     
>     
>     
> 4: 
>     
>     
>     
> 5: intersecttest = rect1.Intersects(rect2);
>     
>     
>     
> If rect1 intersects with rect 2, the boolean value of “intersecttest” will be true, if not it will be false.
>     
>     
>     
>  
>     
>     
> ### 3.  Per-Pixel collision
>     
>     
> Now, rectangle based collision is fine if your object is a box.  however if our object is a more complicated shape (like our Trooper or the Condor) and we need to check if something has actually collided with the character themselves and not just the box space they occupy, then we need to go further.
>     
>     
>     
> In the original DigiPen tutorial, this was not a subject that was covered, so I will cover the implementation in a future intermission, for now I’ll go over the theory.
>     
>     
>     
> As we covered in the previous sections, rectangle collision testing just tests a wide area around the object to see if one rectangle has intersected with another.  With per pixel collision testing, we test every pixel of the two objects to see if any coloured pixel has overlapped each other, but testing every pixel in an image is expensive in CPU time for every frame.
>     
>     
>     
> For any good collision system performance is key and per pixel collision testing is expensive so we need to be careful how we use it.
>     
>     
>     
> So the way around this is to use rectangle collision testing to see if two objects are near each other and if they are (their rectangles intersect) and if they are then we test the pixels of each image if they overlap.  This gives us the best of both worlds, giving us good performance using a simple test and the accuracy of a fine test only if objects are close enough to each other.
>     
>     
>     
> For example:
>     
>     
>     
>  
>     
>     
>     
>     
> | ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_7664F27F.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_68A210AA.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_62F3CA79.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_014DE596.png) |
> | Fire shot is sent towards the Condor | Fire shot approaches a Condor, No intersection yet | Fire shot is very near the Condor.  The two images intersect, but as you can see the shot itself has not actually hit the Condor.   
> For now this would kill the Condor | Fire shot now overlaps the Condor.   
> This is when the evil do-er should really be punished and shot down.  Per-Pixel collision would detect this. |

 

> **\*Note**
> 
> **The code implementation for the collision detection will be covered in section 8, Sprite behaviour**  

 

* * *

 

### Velocity (physics)

Velocity is the amount of translation we are going to apply to our sprites.  Like with a car, the more we accelerate, the more velocity (how fast the car is going in one direction) we gain.  In gaming, velocity is comprised of two components, the direction we are travelling and the speed at which we are going.

A full physics engine may try to apply full Newtonian physics, where force is also considered, this being that an object travelling in one direction needs a certain level of force applied to it to alter it to a new direction, until that level of force is applied the object will keep travelling on it is original direction plus a deviation based on the force applied until force has stopped being applied or it meets with another object exerting enough force in the opposite direction. 

This is my clumsy attempt to explain complex physics, an easier way is to drive a car really fast and then try and turn the wheel before hitting a wall, either you will be stopped by the wall, or your direction will be altered sufficiently enough by turning the wheel to avoid the wall.  Either way a force is applied to change the direction and speed of the car.

In this tutorial, we are only covering the basics.  If you move an object, it simply moves without force.

> #### 1.1 Direction
> 
> Direction is just the way we are going, in gaming we use a vector to describe that direction, a point in space ahead of our travel.  WIthout speed this is just the direction we are facing and nothing more.  In graphics terms some people also refer direction as a normal (a normal is the direction that light would reflect from a face on an object).  To calculate the direction of an object simply multiply the objects position using the guide below.
> 
> | 
> 
> Forward   
> X = 1, Y = 0
> 
> | 
> 
> Backward   
> X = –1, Y = 0
> 
> | 
> 
> Upwards   
> X = 0, Y = -1
> 
> | 
> 
> Downwards   
> X = 0, Y = 1
> 
> |
> | ![image](http://xna-uk.net/blogs/darkgenesis/image37_thumb_2D7A46AD.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image28_thumb_7718F8D0.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image31_thumb_6E38CAB7.png) | ![image](http://xna-uk.net/blogs/darkgenesis/image34_thumb_5EA5931B.png) |
> 
>  
> 
> #### 1.2 Speed
> 
> With speed we indicate how fast an object is moving in the above direction, this is just a number that we use together with the direction to move (translate and rotate) an object during each update loop.
> 
> For example:
> 
>     
>     
> 1: Vector2 position;
>     
>     
>     
> 2: Vector2 direction;
>     
>     
>     
> 3: float speed;
>     
>     
>     
> 4: 
>     
>     
>     
> 5: //update
>     
>     
>     
> 6: position = position + (direction \* speed);

> as you can see, to move an object we simply add the product of “direction \* speed”.  Some people like to alter this slightly and have the last line read:
> 
>     
>     
> 1: position = position \* (direction \* speed)

> The difference being that our travel is multiplied each time we update and gameplay is quicker.
> 
> Yet another way is to add a curve to our speed and rotation with just a little more physics.  This is a little out of scope of this tutorial now and there is already a good resource on the Creators Club, simply download the [chase camera sample](http://creators.xna.com/en-US/sample/chasecamera) and see how the Lerp (linear interpolation) is applied to smooth our moves.

 

* * *

### Implementation 

 

Now as we move into the implementation (which is only short :-)) there is one other thing we to cover, Screen space vs World space.

Most people only see what we draw on the screen and how it interacts with us while we play the games, however when writing games we simply need to understand there is more to the game world that what we can see.

The diagram below tries to convey this, in the middle we can see the game window(what is actually drawn to the screen) identified as “ **Screen Space** ”.  Everything that happens within this boundary the user can see.  Surrounding that is an almost infinite area we refer to as world space, that is everything that happens outside of Screen Space, we refer to this as “ **World Space** ”.

![image](http://xna-uk.net/blogs/darkgenesis/image_thumb_69061BA1.png)

Now we saw a bit of this when drawing the background, as we offset two copies of the background image, one above the screen and one below, with parts of the background always being outside the screen we can see.

For the Condors, we are going to do the same thing, by creating the Condor’s outside the viewable area and then let them move towards the Trooper.  At some point the Condor will pass into the viewable area and be seen.

The other more complicated way we could do this would be to start the Condor at the edge of the screen, calculate just how much of the Condor we could see and only draw that part, then repeat that every game loop until the Condor is fully on the screen.  but why make things complicated when the graphics card already does this for us.

### Adding the Condor

Like the background we only have one Condor with a set of animations, we could have more but we are keeping things simple for now.  For every Condor we are going to add to the screen we are going to Clone (in memory copy) our original Condor and draw that.

> ### 1.1  Positioning the Condor
> 
> First off we need to declare how fast and where we want our Condors to spawn to the screen.  To control how often we spawn we need two new variables in our game class (startroopergame.cs).
> 
>     
>     
> 1: TimeSpan SpawnElapsedTime;
>     
>     
>     
> 2: TimeSpan CondorSpawnRate = TimeSpan.FromSeconds(1f/5);
>     
>     
>     
> The first variable “SpawnElapsedTime” is a counter to see how much has passed since we last spawned a Condor, the second is how often we want a new Condor to be spawned to the screen, in this case every 1/5th of a second.
>     
>     
>     
> Then we need to change the Update loop to use these values to create a new Condor.
>     
>     
>     
>         
>         
> 1: SpawnElapsedTime += gameTime.ElapsedGameTime;
>         
>         
>         
> 2: if (SpawnElapsedTime \> CondorSpawnRate )
>         
>         
>         
> 3: {
>         
>         
>         
> 4: Condor condor = (Condor)Condor.Clone();
>         
>         
>         
> 5: condor.Position = new Vector2(m\_Random.Next(-100 , m\_BackBufferWidth + 100 ), -150);
>         
>         
>         
> 6: m\_AddedSprites.Add(condor);
>         
>         
>         
> 7: SpawnElapsedTime = TimeSpan.Zero;
>         
>         
>         
> 8: }
>         
>         
>         
> Here you can see, that first off we update our elapsed time with the actual amount of game time that has passed since the update call was run (this is handled by the XNA game framework), we then check if enough time has passed since we last spawned and if it has we spawn another.
>         
>         
>         
> When spawning a new Condor, we clone the master copy of the Condor and then give it a new position.  We use the Random function to give us a random value on the X axis between –100 (just off the left hand side of the screen) and 100 pixels off the far side if the screen.  Lastly we have set a Y value that puts the Condor far above the screen so it can just float in.
>         
>         
>         
> Then we add our new Condor to the game and reset the Spawntime.  If we did not we would get an endless supply of Condors every update because we have exceeded our Spawn interval.
>         
>         
>         
> Now if you ran the game at this point, you would not see any difference from before, this is because all our Condors are outside the screen and we have not told them to move yet.
>         
>         
> ### 1.2  Setting it is Vector
>         
>         
> For now we are going to give the Condor very limited intelligence, they are just going to fly straight at the Trooper.  The nominal dumb enemy.
>         
>         
>         
> To do this we just need to aim our Condor at the trooper and translate it a bit, as this is only for the Condor we need to update the Condor section of the StarTrooperSprites class (StarTrooperSprites.cs).
>         
>         
>         
>             
>             
> 1: Trooper b = StarTrooperGame.Trooper;
>             
>             
>             
> 2: 
>             
>             
>             
> 3: Vector2 v = new Vector2(b.Position.X - Position.X, b.Position.Y - Position.Y);
>             
>             
>             
> 4: v.Normalize();
>             
>             
>             
> 5: 
>             
>             
>             
> 6: Velocity = v;
>             
>             
>             
> 7: 
>             
>             
>             
> 8: if (v.X \>= 0)
>             
>             
>             
> 9: SpriteEffect = SpriteEffects.None;
>             
>             
>             
> 10: else
>             
>             
>             
> 11: SpriteEffect = SpriteEffects.FlipHorizontally;

> 

> Here we make a note of the troopers current location (which for the moment is constant because we do not let the player move him yet) and then subtract the Condors current position, this will leave us the direction to the Trooper.  Then we have to normalise the Vector, setting the speed effectively to 1 and finally set this value as the Condor’s velocity.  In the normal Sprite update logic, it will use the velocity to translate the Condors location in the direction and speed of the sprite’s velocity.
> 
> If you ran the code at this point you may notice something strange, all the condors on either side of the screen all face and are looking the same way.  On one half of the screen (the left) this is fine as they are looking right, towards the Trooper.  However the Condors on the right hand of the screen are also still facing right, staring into open space while approaching the Trooper (not that scary are they anymore), so a little tweak to fix this.
> 
> Now in the original DigiPen implementation, we set the scale of the X axis to a negative value, but as noted in the Scale section above, this does not work in XNA, however we we do have SpriteEffects.
> 
> So here we check if the Velocity of the Condor is to the left or right of the Trooper (a negative number means it is moving left where a positive number indicates moving right).  If the Condor is on the right hand side of the trooper and hence moving left, we flip the image so that our Condor is also now looking left (with scary eyes peering right at him!)

 

* * *

 

After the end of the DigiPen tutorial I hope to revisit this section to add a bit more variety, most likely to add more enemies with more behaviours, for now were keeping it simple.

Next up in the tutorial series (6) is player control and dynamic sprites. 

 

Onwards and upwards chaps and chapettes

 

* * *

### Minor addendum

 

#### 1. SpriteEffects move to Sprite Class

One change not noted above because it affects the engine, was to move the SpriteEffect parameter of the Animation Class to the Sprite Class.  It was a minor change of heart after finding out that scaling does not work negatively with the images we are using.  So when changing to use Sprite effects, it was better to manage it from the Sprite itself.

So if you are keeping up with the code yourself:

- Move the m\_SpriteEffect parameter from the Animation Class to the Sprite class (this includes the default constructor update)
- Add a property to the Sprite class for the SpriteEffect parameter as follows: 

    
    
         1: public SpriteEffects SpriteEffect
    
    
    
         2: {
    
    
    
         3: set
    
    
    
         4: {
    
    
    
         5: m\_SpriteEffect = value;
    
    
    
         6: }
    
    
    
         7: get
    
    
    
         8: {
    
    
    
         9: return m\_SpriteEffect;
    
    
    
         10: }
    
    
    
         11: }
    

- Alter the Draw function in the animation class, change the parameter in the graphics.draw method from “m\_SpriteEffect” to “sprite.SpriteEffect”, as shown in the Scaling section of this tutorial. 

2. Changed TargetFrameRate to a property.

I got really fed up of the number of places where I had to calculate the FPS where I needed to test it.  So I renamed the TargetFrameRate parameter to “m-TargetFrameRate”, changed it to a STATIC instead of a CONST and then added the following property:

    
    
         1: public static float TargetFrameRate { get { return (float)1f / m\_TargetFrameRate; } set {m\_TargetFrameRate = (int)value; }}
    
    
    
    Which makes it possible to alter the framerate to a whole number and any component needing to read the framerate will get the actual seconds per frame for calculations.
    

