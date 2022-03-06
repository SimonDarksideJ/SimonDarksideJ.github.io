---
layout: post
title: Hack-1 Looking Back / Looking Forward
date: '2006-12-13 22:08:40'
tags:
- ramblings
---

 **Postmortem from my entry in the XBOX360Homebrew contest**

**![](http://xbox360homebrew.com/photos/darkside/images/1724/original)**

**<font size="5">Looking back</font>**

In the beginning there are darkness…, damn stop , too far back

Looking back to before the start of this competition, I had spent some months just getting into Game Development.  I had always loved games, way back in school I was writing games back then, on the school [BBC](http://en.wikipedia.org/wiki/Bbc_computer) computer (actually I did some stuff on my old [VIC20](http://en.wikipedia.org/wiki/VIC-20) and [Amstrad 1640](http://en.wikipedia.org/wiki/Amstrad_1640), but they never got as far as being called games, well more like text adventures), I wrote an adventure came using [CEEFAX](http://en.wikipedia.org/wiki/Ceefax) pages for a end of year project, similar to the old [flip page adventure books](http://en.wikipedia.org/wiki/Fighting_Fantasy).

Unfortunately from then on LIFE got in the way and I had to work, from here I delved into electronics, getting a very analytical background and then onto almost everything Microsoft, Servers Workstations, Networks, you name it I did it.  I even became a professional DB developer, I was an all round infrastructure person, a Jack of all Trades.

I delved back into programming a few years back and started thinking about games again.

(As a side thought, I must get round to putting all my research links for beginners onto my Blog site, been thinking about it again for a while but the competition got in the way!)

Started working on some Managed DirectX projects when XNA got announced and I jumped straight in without really thinking about it, A game development framework that was easy to use was just sooo tempting, A good idea it turns out.

I delved into some of the handy tutorials that popped out from some brand new XNA communities run by some of the friendliest people I’ve talked to.

Along came the CONTEST!!, at this point a lot of the stuff I had been doing was either all idea’s (some very complex and beyond my current abilities) or just design, with the contest in my grasp, I finally had the push to get something done, hence Hack-1 was brought screaming into the light, it was originally a sub game of one of my larger projects.

**The Process**

I began drawing up plans, sketching screens and bashing around basic gameplay everything seemed fine.

Got to work with the code and XNA provided such an easy path to get the framework up and running.

**Finding Art**

As most can see form the result, ART is not my strong point, not even a wisp of graphical design, I spent a few days trawling lots of free graphical resources, hammering Google and putting together a basic list of assets for the project.

**In the Beginning**

I got the basic game window up and started putting things on the screen, found what I thought were the best way’s to display things in-game, then took a step back.  I then came across several articles which described a better way to do animation. 

Now in hindsight this probably limited me, if you have planned you design out already, keep with it unless something is drastically wrong or not working. I hit my first ditch in my game project refactoring around the new idea and lost a fair amount of time which I probably didn’t need to complete my project.

**On with the Show**

Well things progressed, I had all the major parts of the game there, Collision, Game action points on screen and things were working, until…

**What happens when you don’t think of an editor**

Now this was my biggest failing of the entire project (besides Battlestar Galactica and Stargate!!!), in all my design I had overlooked an editor and not just the editor but also a way to design levels in-game, how to save level designs and how to load the levels from the saves.

This cost me a lot of stop time in my project and I chose XML as a preferred save type, even though reading and wring XML files outside of databases was not something I had done before or had much confidence in but it seemed the best idea at the time.  Having XML meant that levels could be designed without the game, it allowed modding of the game with custom maps and a lot of other things which were NOT IN SCOPE of the competition project.

I entered what I usually call SOLUTION mode, I started to design not just a game but an entire lifecycle for the project but with out a sustainable base!.

**Now there goes 2 weeks**

Well in between the editor design and save design I hit my other major failing, I stopped.  maybe like Alex said in his Wildboarders rundown, I worked too hard and was loosing faith, or I just took my eye off the ball but for what ever reason, Work stopped.

I watched TV, I played other games – (If you like spacey Sims, SO I recommend [DarkStar one](http://www.amazon.co.uk/Ascaron-Darkstar-One-PC/dp/B000ENQZDY) for anyone else who does, the graphics are not the greatest and the constant loading of assets in game is annoying but the game gets very fun and doesn’t get boring).

**Stay on Target**

I came back to the light and started afresh, another of the lessons which just re-enforces Alex’s comment, Take time out’s, sit back and remember why you started your project in the first place.

I took stock of what I had and started to manage myself, I set out a proper plan, set checkpoints for work and scheduled things.  This is a must for any project, I recently blogged about this in my main blog and hope to continue it in the future.

Project management in a development of any size is crucial, doesn’t have to be much but you need to take stock of what you’ve done, where you are and where and what you need to do to keep moving forward.

**Quick re-scope**

The project downsized and became more manageable, from this point on the pace quickened, then BETA 2 came out.

in a way the pause in my work did save me some overall time and the upgrade only cost me 1 day, things were cleaner, quicker and I started to gain confidence in what I was doing.

**Get Confident**

If your unsure of a way to do something, research first, make a plan of action and then execute, sandbox stuff outside you project if need be to test things and move on.

In the last two weeks I got cleaner more efficient and coded better.

**Get help if you need it**

in my mass coding,  I kept check with CODEPLEX and the XNA Forums for anything which could help with my game, I came across Shakaware’s Main Menu Component.  I was getting to the point where I needed to pack my gameplay into a game framework, Menu, Loading screens and such.  This came up at the best point in the project and saved me a lot of time, it needed upgrading to Beta 2 but was fairly easy.

**Finally**

I spent a few nights looking for audio, making documentation and play testing the game and finally packaging the game up.

I was going to put it into an installer but I didn’t have time, the last week was my most intensive period, mainly because of polish, even though My game doesn’t look fancy, I felt it needed a bit of a facelift and several things got an upgrade, even the border around the map was thrown in on the dying hours of the previous night.

Levels were created 3 hours from release.

**End Conclusions**

I’ve made several points on my main failing points through this, a very uphill learning process.

- ART – I have none, top of the list for things to learn before moving on is ART, nice looking things
- [SHADERS](http://gpwiki.org/index.php/DirectX:Direct3D:Tutorials:Shaders_Introduction) – I really missed out here and didn’t have time to pick this up, second thing to put out to other newbies is to look into basic shading effects – Shawn H from the XNA team has recently posted 2 article what you can do with SHADERS alone [Here](http://blogs.msdn.com/shawnhar/archive/2006/12/11/sixty-fractals-per-second) and [here](http://blogs.msdn.com/shawnhar/archive/2006/12/12/technicolor-julias).
- MODDELING – Even in 2D you need to model you assets, even for the most basic things, not just 3D modeling but looking at your assets from all angles.
- DESIGN – I spent a lot of time in design – but still not enough- revisit you design through out the project and keep it fresh
- COMPONENTS – components are good , they also can be bad , a big downside is that I relied too much on components and some of the time I lost was getting them working together!

The entire process for me is good though and I enjoined it tremendously

## Looking Forward

Apart from visiting the above points, I plan to come back to Hack-1, the project wont die (as it will still be in my big game design).

As the game is in competition mode, the code in the game is not great, actually it’s pretty crap but most competition code is, defiantly not something you want to show the world or hoist up as a good tutorial!. lol

I will start afresh and probably start with one of the other faces I decided on for the game which is more 3D, the original mode will work back in although tarted up with better graphics and SHADERS!.

…

 

So it’s back to reading and refreshing and drawing (even bought some drawing books to start with, always best to start on paper!)

**Thanks**

Thanks to everyone for support in this competition and a big thanks to the writers of the XNA components I used in the project.

I will be compiling the results of the two polls I posted [Here](http://xbox360homebrew.com/blogs/darkside/archive/2006/12/10/1644) and [Here](http://xbox360homebrew.com/blogs/darkside/archive/2006/12/11/1668), then get the juiciest bits from all the postmortem’s into another beginner guide hints and tips.  I came across lots in the past and one put together from such a mass amount of experience will also aid other newbies like myself.

Look forward to more coming out of the XNA factory and when I eventually buy an XBOX, I’ll enjoy more out of the creators club.

TTFN

Darkside

