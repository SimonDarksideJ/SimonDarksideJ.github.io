---
layout: post
title: 'Intermission #2 - Spritesheets (and Clean-up)'
date: 2012-06-29 10:21:54
tags: [2d tutorial, game development, xna]
---

(coming to you from 45,000 feet 🙂 on yet another flight to India with work, sound glamorous, but when you are leaving behind the wife, kids and 2 week old puppy, not so much.  Although I do get more work done….)

Here is the first intermission for this section of the tutorial we will cover updating of the project to make use of spritesheets.  The main reasons to use spritesheets are two fold:

1. Easier to maintain – Working with a single image as opposed to 3 or 6 (in this project) is a lot easier, less assets to look after
2. Memory – transferring data to a graphics card is expensive, better to limit how many times during the running of a game you need to do this. 

 


### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

* * *

 


### Why Spritesheets?

To draw an image in the XNA framework, we create a spritebatch and then for each loop:

- We transfer the texture to the graphics card
- Apply any scaling or rotations to the image
- Tell the graphics card where to draw the image 

Now the XNA spritebatch is clever enough to manage the textures sent to the graphics card and these are cached on the card so they can be reused.

However since we are changing the image each frame of our animation, this does not work.

If we use a spritesheet however, it is always the same image, what the spritebatch does in this case it that it only draws a portion of the image at a time.  This reduces the amount of images having to be sent to the card over time.

* * *


### Creating the Spritesheet

 

Our current assets for displaying our trooper are like this, six individual images:

| Animation step 1 | Animation step 2 | Animation step 3 | Animation step 4 | Animation step 5 | Animation step 6 |
| ![image](/assets/img/wordpress/2012/07/image27.png) | ![image](/assets/img/wordpress/2012/07/image28.png) | ![image](/assets/img/wordpress/2012/07/image29.png) | ![image](/assets/img/wordpress/2012/07/image30.png) | ![image](/assets/img/wordpress/2012/07/image31.png) | ![image](/assets/img/wordpress/2012/07/image32.png) |

 

Managing these can be a pain as that is six images you need to maintain the same size, format and relative proportions.

What we need is a single image like this:

[![image](/assets/img/wordpress/2012/07/image41.png "image")](/assets/img/wordpress/2012/07/image40.png)

Now to change this into a spritesheet (merge all six images in to one long image) we have several options:

1. Manually – create a new image the size of all the images combined and manually cut / paste and line up the images.  A real pain.
2. Use Photoshop, [Paint.Net](/controlpanel/blogs/posteditor/www.getpaint.net) or another image editing tool that supports layers – Still a pain but a bit easier, the professional Photoshop does have some helper functionality to do this (but that costs) and [Paint.Net](/controlpanel/blogs/posteditor/www.getpaint.net) does have some plug-ins (still free but takes some work to do)
3. Use a image stitching tool like [Glue-IT](http://sysimage.250free.com/) 

If you already have your images then Glue-IT is the way to go (there are some other free open source image stitching tools and even some written for XNA however most of them need you to change your code to support them).  [Glue-IT](http://sysimage.250free.com/) (as the name suggests) simply does the hard work for you, takes you are separate images and pulls them together in a strip, even sorting out lining up the images so that they are in a line correctly.

| [![image](/assets/img/wordpress/2012/07/image42.png "image")](/assets/img/wordpress/2012/07/image41.png) | [![image](/assets/img/wordpress/2012/07/image43.png "image")](/assets/img/wordpress/2012/07/image42.png) |
| 

Glue-IT main window

 | 

Glue-IT animation preview

 |

One word of warning though, if your images are not the same size, [Glue-IT](http://sysimage.250free.com/) will still stitch them together and do it is best  to line them up, but it does not work very well and the results may not be what you expect.

As a free and easy to use tool, it is hard to beat, and it does the hard work for you.

It can also be useful as a post production tool, after you have created your single animations in your favourite image tool (for animations, one with Layers is essential), you can then use Glue-IT to stitch the images together to create your spritesheet.

 

* * *


### Next up the code changes
