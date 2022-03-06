---
layout: post
title: Collision detection - A little more info
date: '2007-01-29 12:13:34'
tags:
- tutorials-resources
---

 **\*Update –** Sharky has now completed the 3D collision tutorial in 3 parts, get reading!

Over on [Sharky’s Blog](http://sharky.bluecog.co.nz/), there is a little tutorial brewing for [3D collision detection](http://sharky.bluecog.co.nz/?p=108) (nice one Sharky!!)

Following the [blog trail](http://amapplease.blogspot.com/index.html) on this, you should come across a nice [dissertation on Collision detection](http://www.cs.unc.edu/~geom/theses/gottschalk/main.pdf), I’d suggest a read of it from [here](http://www.cs.unc.edu/~geom/theses/gottschalk/main.pdf), it’s a long one (as dissertations usually are), it’s accurate, helpful and describes a lot about oriented bounding boxes (3D to you and me), and an old Collision Detection library on [sourceforge](http://sourceforge.net/projects/coldet/) as well!.

 

On another note, there does seem to be a problem with the [Intel 915GM/GMS](http://www.intel.com/support/graphics/intel915gm/index.htm) series embedded graphics cards with XNA, these can be found it a lot of laptops these days (like mine).

The problem usually crops up in different places and causes a "Method Call is invalid" error when drawing some models and even when drawing primitives, which is very weird.  The actual cause of the problem is unknown although the thought seems to be at the moment that this stems from the cards in-ability to do Shader 1.1 functions, the card does support Shader 2.0 but not 1.1, a decision by Intel I supposed.

There does not seem to be a good work around at the moment, save to say that tinkering seems to solve it in most cases.

A simple example is that if you download the [Quadtree project](http://www.codeplex.com/quadtreeload) on Codeplex and run it on a Intel 915GM/GMS based machine, it will fail when trying to draw the little radar window in the top-left hand corner of the screen, on my main PC with a nice graphics card, it draws fine, only solution is to comment out the call to draw the radar at this point.  Just to pour salt on the wound, the terrain draws fine which uses the same drawing calls!!!

One possible solution is a little helper on [Riemers site](http://www.riemers.net/eng/Tutorials/XNA/Csharp/ShortTuts/Reference_device.php) for moving graphics processing to the CPU (Software processing)

I’m keeping my eye out for a suitable fix/work-around since I’m affected anyway, if anything turns up I’ll shout about it!!, the only hint at this point seems to be this [article](http://www.intel.com/support/graphics/sb/CS-011910.htm) on the Intel website, which says the hardware can do T&L but the driver might not?

