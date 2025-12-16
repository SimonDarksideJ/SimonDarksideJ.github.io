---
layout: post
title: Behaviour - Lesson 8
date: 2012-06-29 21:08:07
tags: [2d tutorial, game development, xna]
---

Welcome to the conclusion of the original DigiPen tutorial, although fear not, this wont be the end of the series as we still have lots more to do.

For now lets get on with it so we can bet more fun stuff done.

[Code as usual on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/50562).


#### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)


## Behaviour 

A behaviour is a set of functions, defined by the user, which describes how a game and its objects should behave and act. You can define a behaviour to the game and to some of its objects, like sprites and texts. The functions assigned in a game object behaviour (the game object is an instance of a class derived from the Game class) are executed successively.


## Game Objects Behaviour

In StarTrooper, the game behaviour is divided into several objects that make the game. These objects are: “Trooper,” “Condor,” and “Fire.”

The behaviour of the “Trooper” object is a combination of several kinds of behaviour:

> ![](assets/img/posts/image-not-found.png)Movement Behaviour (already seen)   
> ![](assets/img/posts/image-not-found.png) Shooting (already seen)

The behaviour of the “Condor” object depends on the collision detection. If it collides with “Fire,” which means that “Fire” hits it, it will explode and die with a consequent score increment. If it is hit by the “Trooper”, which means that condor wins, “Condor” will die and the score will decrement. Therefore, we have:

> ![](assets/img/posts/image-not-found.png) “Condor” Behaviour

The behaviour of the “Fire” object is simple. It will die if it is hit by “Condor,” otherwise it will continue. Therefore, we have:

> ![](assets/img/posts/image-not-found.png) “Fire” Behaviour



## Collisions

In any game the most basic behaviour is one of collision, as described above, if two object touch what is supposed to happen, should it:

> ![](assets/img/posts/image-not-found.png) Just pass over it   
> ![](assets/img/posts/image-not-found.png) Attach on to the body of what it has touched (like in the fabulous game Nebulon where passing spheres joined to make much more evil baddies)   
> ![](assets/img/posts/image-not-found.png) Disappear   
> ![](assets/img/posts/image-not-found.png) Cause that which it has touched to blow up in to a fantastic ball of flame and smoke.   
> ![](assets/img/posts/image-not-found.png) Cause the player to move around it because it is an immovable object

So like with most things collisions are about cause and effect, the cause of two items touching and the behaviour effect by the game to do something once it has happened.

It is also keep to remember that collisions do not just include two visible sprites or models touching. Collisions can also be used to trigger events such as causing a trap to fire or for the effect of gravity to increase because the object is closer to a planet. Something to consider.



## Game Implementation: Collision System

For the Condor we are going to implement the core of the Collision detection system, for that we need to make modifications to the base Animation and Sprite classes.

First we will update the animation class where we need to expose the animation frames width and height which will be used later when we are constructing the boundaries for collisions, so add / update the following in the animation class:

```csharp
public int FrameWidth
{
     get
     {
          return m_Width;
     }
}  
public int FrameHeight
{
     get
     {
          return m_Height;
     }
}
```
    
Next we will update the Sprite class where we need to ensure the origin of the sprite is updated correctly, so add the following to the AddAnimation function:
        
```csharp
     m_Origin = new Vector2((float)Animation.FrameWidth / 2, (float)Animation.FrameHeight / 2);
```
        
Following up on this, we need to clean up where this is set in the sprite class constructor, so delete the lines which set this variable.
        
Next we need to add a variable to hold our collision rectangle and then set / update it each update loop as the sprites move, so add the following into the variables list at the bottom of the sprite class:
        
```csharp
     private Rectangle m_CollisionRectangle;
```

And add the following function to set / update it:

```csharp
     private void UpdateCollisionRectangle()
     {
          m_CollisionRectangle.X = 0;
          m_CollisionRectangle.Y = 0;
          m_CollisionRectangle.Width = Animation.FrameWidth;
          m_CollisionRectangle.Height = Animation.FrameHeight;
          m_CollisionRectangle.Offset((int)(-m_CollisionRectangle.Width / 2 + m_Position.X), (int)(-m_CollisionRectangle.Height / 2 + m_Position.Y));                     
     }
```            

Then call this function from the tail end of the update internalupdate loop:

```csharp
     UpdateCollisionRectangle();
```

To finish off in the Sprite class, we need another tidy up exercise we will clean up the Draw function in the Sprite class, sp replace the existing draw function with:

```csharp
     public void Draw(GameTime gametime, SpriteBatch spritebatch)
     {
          if (!m_Visible || !m_Active || m_Opacity \< 0)
          {
               return;
          }

          spritebatch.Begin(SpriteSortMode.Texture,BlendState.AlphaBlend);
          m_Animations[m_CurrentAnimationIndex].Draw(gametime, spritebatch, this);
          spritebatch.End();
     }
```

Next is the core of the collision system, the following class loops through all the sprites on screen and reports if any two have collided or not, so add the following into the StarTrooperGame class:

```csharp
     public static List<Sprite> GetCollidedSprites(Sprite sprite)
     {
          List<Sprite> collisionList = new List<Sprite>();
          foreach (Sprite s in m_Sprites)
          {
               if (s != sprite && s.CollidesWith(sprite))
               {
                    collisionList.Add(s);
               }
          }
          if (collisionList.Count != 0)
          {
               return collisionList;
          }
          return null;
     }
```

Last thing we need is an extra little helper function, so far we have just been adding sprites and sounds to our game, but now since we want to get rid of some of them we need also a way to remove them, to this end we will add en extra little function into the StarTrooperGame class, just after the Add functions:

```csharp
     public static void Remove(Sprite sprite)
     {
          m_DeletedSprites.Add(sprite);
     }
```

All this does is take a sprite and add it to the Deleted list, in the next update this will then remove the sprite from the updating list and thus it shall be gone. You may as why could not we just remove it from the main list i none go, the answer to this is simple, unless it is a fixed size array, we cannot take items out of a list while it is being processed (and when a sprite is due to be removed, you are in the middle of an update). So we simply add it to another worker list and remove it after it is finished being updated.
                                

## Game Implementation: Blowing up the Condor
                                
                                
So back now to the StarTrooperSprites class and update the Condor class, first we need to add an extra variable specific to the Condor, to tell when the Condor has finally collided with the trooper (and Kill the trooper and decrease the players score, so add this to the bottom of the Condor class:

```csharp
     bool m_CollisionWithTrooper = false;
```

Next we will add the function that handles what goes on what the Condor finally hit’s the Trooper:

```csharp
     private void CollisionWithTrooper()
     {
          Opacity -= 1;
          if (ScaleX \< 0)
          {
               ScaleX += 0.01f;
               Rotation -= 0.03f;
          }
          else
          {
               ScaleX -= 0.01f;
               Rotation += 0.03f;
          }

          ScaleY -= 0.01f;
          if (Opacity \<= 0)
          {
              StarTrooperGame.Remove(this); 
          }
     }
```
So if a collision happens, we start reducing the opacity (visibility) of the Condor and depending on which way it is facing we rotate and then shrink it until it is no longer visible and then that happens, we remove the Condor from play.

Next we need to trigger this action, so we replace the Update function with the following:

```csharp
     public override void Update()
     {
         if (m_CollisionWithTrooper)
         {
              CollisionWithTrooper();
              return;
         }

         Trooper b = StarTrooperGame.Trooper;
         if (AnimationIndex != 1)
         {
              Vector2 v = new Vector2(b.Position.X - Position.X, b.Position.Y - Position.Y);
              v.Normalize();
              Velocity = v;

              if (v.X \>= 0)
              {
                   SpriteEffect = SpriteEffects.None;
              }
              else
              {
                   SpriteEffect = SpriteEffects.FlipHorizontally;
              }

              List<Sprite> collidedSprites = StarTrooperGame.GetCollidedSprites(this);

              if (collidedSprites != null)
              {
                   foreach (Sprite s in collidedSprites)
                   {
                        if (s is Fire)
                        {
                              StarTrooperGame.Die.Play();
                              AnimationIndex = 1;
                              StarTrooperGame.score++;
                              StarTrooperGame.ScoreText.Text = "Score: " + StarTrooperGame.score.ToString();
                              StarTrooperGame.Remove(s);
                              break;
                        }
                        else if (s is Trooper)
                        {
                             m_CollisionWithTrooper = true;
                             StarTrooperGame.Die.Play();
                             Animation.Stop();
                             StarTrooperGame.score--;
                             StarTrooperGame.ScoreText.Text = "Score: " + StarTrooperGame.score.ToString();
                             break;
                        }
                   }
              }
              else
              {
                   if (this.Animation.isPlayingLastFrame)
                   {
                        StarTrooperGame.Remove(this);
                   }
              }

         }
     }
```

First we check if we have already collided with the Trooper and if so we call the CollisionWIthTrooper function to transition the Condor out.

Next so long as the Condor is still active (the animation is still playing), we pull back the list of collided sprites and if there are any we check what we have collided with, if we hit a fireball then bye bye Mr Condor, we switch to the secondary animation and play our explosion sound effect as the Condor is shot to smithereens. Finally we increase the users score, update the text on the screen and take the Condor out of play.

If however the Condor has succeeded in reaching the Trooper, we decrease the players score, halt it is animation in it’s tracks and leave the Condor’s fate to our other function. Bear in mind at this time, the Trooper still lives as we have not added behaviour to actually affect the Trooper (more on that in another post later).


## Game Implementation: “Fire” Behaviour

Well all and good for the poor old Condor, but what about our fireballs. You may not have noticed, they do not die, they keep on going and going forever. Reason being that we keep updating the fireball and unless it hits a Condor and gets destroyed by it, it will never end.

since we care about performance in our game, as soon as the fireball has left the screen, we should just put it out of it is misery.

So we will update the update section for the Fireball sprite (bear in mind this is just the fireball sprite, we will come back to sort out our new particle effect fireball later):

```csharp
     public override void Update()
     {
          float y = Position.Y;

          //Type the code here remove the Fire sprite
          #region FireSprite_code

          if (y \< -100)
          {
               StarTrooperGame.Remove(this);
          }

          #endregion

          ScaleX = ScaleY = 1 + Math.Abs(0.001f \* (480 - Position.Y));
     }
```

Where simply, when the Fireball has gone far enough off the screen, we just destroy it.


## Conclusion

And so we reach the end, that is all DigiPen had to offer at the time. Like any good tutorial sample, they left you with so many ideas and things to try:

> ![](assets/img/posts/image-not-found.png) What about lives for the Trooper?   
> ![](assets/img/posts/image-not-found.png) How do we kill our troublesome Trooper?   
> ![](assets/img/posts/image-not-found.png) One Enemy, that is a bit boring, I want more   
> ![](assets/img/posts/image-not-found.png) Why do not the Condor’s shoot back?   
> ![](assets/img/posts/image-not-found.png) What about a better HUD, something to show the player what is going on

And so much more.

Now I did say at the beginning, this is an end to end tutorial and to be fair, even with what we have so far were only half way through at least. So we will explore some of these questions and even go beyond till we got our game published and out there making money. Somewhere in all this I need to get my own game / apps out into the market place and make some money, so you may have to bear with me at some point.

Bring it on.

Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[Windows Phone development](http://technorati.com/tags/Windows+Phone+development)


## Addendum – a wandering story in the path of madness
When finalising all the code and packaging it up, I ran into a curious little bug. In the Phone 7 project collisions were happening as expected and all was fine, however the same was not true of the Windows project. In the Windows project the collision rectangles were offset from the actual sprite was on the screen, but here is the weird part, only for the Condor and fire sprite and NOT the trooper, how odd.

| ![Collisions](assets/img/posts/image-not-found.png) |
|---|---|
| Trooper OK, Collision rectangle centred on Sprite | Condor, woah. What on earth is going on here |
|

So I spent the best part of an hour, scrambling through the code, trying to find the difference. They both are sprites, they both have animations (however they are instantiated differently), they are defined differently in the StarTrooperSprites class and on it went. I even resorted to text comparison tools but nothing jumped out. What made it worse was that the Phone project was fine, no problems.

So what to do, eventually I succumbed to the age old drain of sleep. Awaking early in the morning with a large light over my head and shouting Eureka (I have not watched that sow in a while, since I have been in India). Well I would have done that if the wife was not asleep next to me, something’s are better avoided ![Open-mouthed smile](/assets/img/wordpress/2012/06/wlEmoticon-openmouthedsmile6.png). One check and my theory was correct and one line of code fixed the problem.

The main difference between the Trooper and the Condor / Fire Sprites, The trooper is created once and the others are created but are copied (cloned) when being put on the screen, one quick look in the cloning code and lo and behold, the Origin of the Sprite was not being copied. So I added that into the list and all was well in the world.

Lesson from this, sometimes it is better to sleep on a problem than to keep hacking it. The mind is a great and wondrous thing but sometimes it cannot see beyond the end of your nose ![Winking smile](/assets/img/wordpress/2012/06/wlEmoticon-winkingsmile3.png). But rest assured just because you are looking at a problem anymore, the brain does not stop and keeps on going, especially while you are asleep!!.