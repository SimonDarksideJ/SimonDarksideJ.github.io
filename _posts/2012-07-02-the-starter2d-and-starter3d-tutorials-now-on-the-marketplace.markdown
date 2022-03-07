---
layout: post
title: The Starter2D and Starter3D tutorials now on the Marketplace
date: '2012-07-02 12:39:56'
tags:
- samples
- tutorials-resources
---

I finally managed to get my Marketplace account sorted for my own indie game studio ZenithMoon and while prepping to release my first proper app/game I thought it would be good to publish my 2D and 3D tutorial projects on the marketplace for FREE at the same time.

What follows is a brief post about what it took to get these up there and my plans for the future of them, it will be brief because I am currently in the middle of a release cycle for my proper app (I will mention that at the end)

| [![image](/assets/img/wordpress/2012/07/image105.png "image")](/assets/img/wordpress/2012/07/image102.png) | [![image](/assets/img/wordpress/2012/07/image106.png "image")](/assets/img/wordpress/2012/07/image103.png) |
| 

> [The 2D XNA StarTrooper series](http://bit.ly/gmivLx "The StarTrooper XNA 2D tutorial series")

 | 

> [The 3D XNA tutorial series](http://bit.ly/nWNiYD "The XNA 3D video tutorial series")

 |
| XNA ![ /></td>
<td valign=](http://wmpoweruser.com/wp-content/uploads/2012/03/WP-Download-English-Med.png?e83a2c)XNA  
 ![ /></td>
</tr>
<tr>
<td valign=](http://wmpoweruser.com/wp-content/uploads/2012/03/WP-Download-English-Med.png?e83a2c)SilverXNA  
 ![ /></td>
<td valign=](http://wmpoweruser.com/wp-content/uploads/2012/03/WP-Download-English-Med.png?e83a2c)SilverXNA  
 ![ /></td>
</tr>
</tbody>
</table>
</div>
<p>Now what makes these significant especially in light with my recent SilverXNA tutorial series is that I published both the XNA (GameStateManagement) versions of these app as well as SilverXNA variants of these as well.</p>
<p>As expected all the source code is available for these projects on <a title=](http://wmpoweruser.com/wp-content/uploads/2012/03/WP-Download-English-Med.png?e83a2c)Codeplex as a separate project here.

A few points though about each project.

* * *

# 

## Starter3D and Starter2D games – XNA Versions

I would already dropped the 3D project into a GameStateManagement style game framework when I did the tutorial series and everything worked fine, I just had to prop up a few things for marketplace submission such as:

- Audio – this was a common theme for all the apps so I constructed a separate audio manager I could use to manage Audio, the biggest thing for the marketplace if the “GameHasControl” variable.  If your app/game does not have control, do NOT play background music (effects are ok)
- Fast App Resuming – Granted while most will tell you do not have to do anything except recompile your app to enable Fast App Resuming, the reality is that if you do not handle it correctly it will Frig up your app/game.  The thing to watch for are the Activated and Loaded events and how you manage Loading Content.  Just be sure to add the check on the “Activated” for “e.IsApplicationInstancePreserved” and basically do NOTHING if it is true, also set a static flag in your code and test this against anything that needs to initialise or load content. (this includes playing background audio!, by default playing background music will not resume)

Now where the 3D project was fairly easy to get ready, the same could not be said of the 2D project which required a lot of manipulation, granted most of this was due to the very flat nature of the 2D game design.  This is one of the problems you can face of following a tutorial literally when designing your own game framework or engine.  To be fair this was not the aim of the tutorial series originally when it was done by DigiPen and later by me when i updated the project to XNA, it is aim was to teach you about how games worked and what was involved.

The main issues I faced when getting it ready fro the market were:

- Over Reliance on the GAME object throughout the code (this was especially a pain in the SilverXNA version, which I will talk about in a bit),  in reality this should be managed this better.  Do not rely on an underlying framework.
- Over Reliance on GameTime, again like the above it is an XNA framework object which did not get used to it is fullest anyway.
- Game State and Game Objects.  At it was just a flat tutorial everything was managed centrally from one place to make it easier to describe but in an engine type project this can be a real hindrance.  Better to manage game objects through some kind of Factory type pattern.

There were others but I’m short on time right now ![Sad smile](/assets/img/wordpress/2012/07/wlEmoticon-sadsmile.png).

Suffice to say though, getting both the XNA projects ready as they were was definitely the easiest option, but only because i was not adding anything new to the mix (I dread to think if i had wanted to to put more fancy things in)

* * *

## 

## Starter3D and Starter2D – SilverXNA Versions

Now this is where the fun began.  First off to begin with my initial objective was just to get the XNA games running under Silverlight using the Silverlight/XNA integration and a Silverlight Menu, I’ll enhance the rest of the project overtime to use more Silverlight in the actual XNA game.

I started with the 3D version as this was the easiest when updating the XNA version and it was a breeze, the problems faced were the same it just took a different approach to deliver them, no biggie.  The main part of the work was putting in some screens for the menu options (no flair this time round) and launching the game plus handling the back button correctly while moving between them.  I actually omitted one of the marketplace requirements about the Back button pausing the game however I explained this on submission and it passed anyway.  but in your real game projects you should handle this!.

Then came the 2D project and as mentioned before the framework issues came to a head here for the reasons I explained!, there are no Game or GameTime reference in SilverXNA (and for this reason the fancy particle effect generator has been tuned off for now, I’ll fix that later).  Also even with the refactoring work i did for the marketplace version of the 2D project it still needed a fair amount of work, but I will stress this was simply because the layout of the project was flat as shown with the 3D project if you architect it right then it is a breeze!

Last point is that the focus of the work for the SilverXNA versions for now were just to get them submitted, so they are just XNA games inside a Silverlight menu system.  I plan to extend the Silverlight Integration in both projects into the games as well in line and supporting the SilverXNA tutorial series.

* * *

## That Sounds like a lot of WORK!!

In all of this I haven’t’ mentioned any timings and about now you might be wondering just how long it took to get all 4 projects on the marketplace, so here is a little breakdown:

| Project | Total Time Taken |
| 

Starter 3D XNA

 | 

1 Hour

 |
| 

Starter 3D SilverXNA

 | 

2 Hours (including making the template that would be used for the 2D SilverXNA project)

 |
| 

Starter 2D XNA

 | 

2 Hours – mostly fitting in with the GameStateManagement sample

 |
| 

Starter 2D SilverXNA

 | 

4 Hours – mostly testing and refactoring

 |

All in all it took me less than one day to get ready, granted this was spaced over the week with my other commitments and work.  if I had created my template for the SilverXNA project in the 2D project, the 3D conversion to SilverXNA would have only taken about 20 mins, Re-use is King!

* * *

### ”Flipped” – The first release under ZenithMoon Studios

| [![ZenithMoon Logo](/assets/img/wordpress/2012/07/ZenithMoon-Logo.png "ZenithMoon Logo")](/assets/img/wordpress/2012/07/ZenithMoon-Logo.png) | 

| 
##### [Flipped – Paid version (With Trial)](http://windowsphone.com/s?appid=c069cb34-4adb-4997-8365-b51a93a80db0)
 |
| ![ /></td>
</tr>
<tr>
<td valign=](http://wmpoweruser.com/wp-content/uploads/2012/03/WP-Download-English-Med.png?e83a2c)
##### [Flipped FREE version (Ad Supported)](http://windowsphone.com/s?appid=7dea31e4-b0c5-4582-8a20-2817f2fb7a65)
 |
| [  
](/assets/img/wordpress/2012/07/Download-EN-Med.png) ![ /></td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
<p>As a footnote in all of this I’m also releasing my first proper project to the marketplace, being a community dev 9% of the time can take it is toll on how much of your own stuff you do or see to completion but I’m glad I have got this out there despite the drop in my community work.</p>
<p>Flipped is a Tile matching style game aimed at ages 3 and up with varying difficulties and game modes enough to challenge even the most courageous of player, including:</p>
<ul>
<li>Matching 2, 3 and 4 tiles</li>
<li>Bomb madness where you have to avoid matching bombs (I thought just hitting a bomb to fail was too cruel)</li>
<li>Time play against the clock</li>
<li>And Ultimate insanity where there are actually two boards in play simultaneously</li>
</ul>
<p>My main aim for the project was to build a game for my son who is now 4 (he was 3 when I started and finished the core part of the game) but birthdays happen <img class=](http://wmpoweruser.com/wp-content/uploads/2012/03/WP-Download-English-Med.png?e83a2c)

Testing the app provided a challenge while testing until I got my Lumia as I could not get my phone away from the children.  Granted the Emulator is a big help but with a taping style game it is just quicker on the device.

in the later stages of the project I also learnt some interesting trick which have been added to the now very large set of things I need to blog about!

If you feel so inclined, please download my game and give me your honest feedback, by either using the Feedback option or buying the game (a cash review is always the best ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile9.png))

* * *

## Closing Remarks

I still intend to improve both of the projects and keep them updated both on the marketplace and in the source control blogging as I go, so keep an eye out, mainly focusing on:

- Expanding Silverlight use in the SilverXNA projects
- Improving / refactoring features in the XNA versions

Hope to see you out there!

 |

 |

 |

