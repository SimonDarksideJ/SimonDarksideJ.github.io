---
layout: post
title: The long road out
date: '2012-06-29 21:34:52'
tags:
- lob
- real-world-experiences
---

As I’ve been quiet a few weeks now I thought it was about time I let the cat out of the back of what I’ve been up to.  If you are been following me on twitter @DDReaper, then you should have a hint already.

I cannot give specifics for this tale because most of it is NDA with work, but I can tell you something’s about it, my experiences and a few pointers to watch out for in your own travels.

So this tale is about my own Windows Phone 7 business line application that is getting published to the App Hub

* * *

# Strange beginnings

![File:Star wars episode one the phantom menace ver2.jpg](http://images3.wikia.nocookie.net/__cb20080506231561/starspoof/images/thumb/5/51/Star_wars_episode_one_the_phantom_menace_ver2.jpg/321px-Star_wars_episode_one_the_phantom_menace_ver2.jpg)

Now the application started out as a proof of concept app by my work on the iPhone about a year ago.  A design was drawn up around specific healthcare tasks that could be recorded remotely where having a fill machine or carrying little bits of paper or notes is not really practical.

From design to concept was about a week, then the app itself was farmed out to an experienced iPhone app development firm, while our guys set to work on a mobile interface to our extensive web serviced based health application.

The whole process took approx. 6-7 weeks to get the prototype out and another week or so of tuning to get the POC just right.  The app was demoed to customers and market and was well received.

So ends the background.

* * *

# Where I got involved.

![](http://www.njms.org/images/GetInvolved.jpg)

Well the app was demoed to use in the UK some time later and we were suitably impressed, then the impossible happened, Microsoft launched the Windows phone development kit for free.

From the history of this blog you can see I got right on board with it and started learning / playing and making stuff, however it was not until the beta (when it was a bit more stable) that I thought “Hay, I could make that app in WP7”.

Now at this point work were not looking in this area, even though we are a highly joined Microsoft partner and do a lot of dealings with them, the business was not interested in investing in yet another technology at the time.

Now being the person I am, I just contacted the guys who sponsored the iPhone app, told them my plans and asked for their backend services and off I went, in my own time no less.

* * *

# Prototype

![](http://oap.sourceforge.net/photos/input_module_prototype.jpg)

Now, here is were the story started to get interesting, knowing how easy the tools were (I still had not used blend at this point) and having the basic design concept for the app I set to building it.

After about 8 hours effort (including learning how to use blend) I had a fully working prototype using sample data (all data being fed by generated content).  This included about 8 screens, all data bound controls, navigation and animation all sorted.  No the eight hours was my own time, so about 1 week in real-time, using up my lunches and what time I could scavenge from home time.  But basically eight hours actual man effort.

8 Hours, even impressed myself.

After I got the test harness for the wed services set up it was another 2 hours or so constant effort and the data bound controls were all now using web service calls to populate all the forms.

So 10 hours to replicate 6-7 weeks work if an iPhone application.  Microsoft do not lie about how easy the tools are to use and port apps from other platforms.

SO I published the app to the business and posted a few videos and a little presentation.  Handed the code over to the mobile team, job done and I was happy I learnt something.

* * *

# The late night call

![](http://www.cartoonstock.com/newscartoons/cartoonists/rma/lowres/rman2095l.jpg)

3 weeks before the MS launch of the Windows phone 7 platform, I get a call.  How would I like to get the app ready for submission to the market and how long would that take.

Woah, from the business not being interested, suddenly they were full in and wanted to get this available for the launch along with a big ad campaign and demos to clients.  Big turn around, al from a little POC (which to be honest did not look that good, I’m a developer Jim, not a designer).

So after checking the project against the RTM of the tools, I found that quite a bit had broken.  The web service calls no longer worked, all my animations and states were gone, almost square one, but with a good framework in place.

They wanted the app in a week.

Oh how I laughed, but I like a challenge and I would get to do a WP7 in work time no less, I grabbed the chance and said i’d do it.  I was not completely alone, our graphics team in Chennai would also help out by putting some lipstick on the pig.

* * *

# From POC to reality

![](http://tucsoncitizen.com/retroflections/files/2010/07/reality-tv.jpg)

Now I am a big fan of the proper way to developer nirvana, POC’s should stay POCs.

So I started fresh, after all I wanted to also make use of some of the new features of the RTM, Pivot controls and other good swanky stuff.  I refactored all the web service and view model work into it is own library (following my own recommendations after all.  Most of my work on web services in this blog came from my work on this project after all)

After that I was ready for the UI, luckily at this time the Windows Phone Team release the [WP7 guidance blend project](http://wp7guide.codeplex.com/) and the Silverlight team updated the [Silverlight toolkit for windows phone](http://silverlight.codeplex.com/) to the RTM.  These two packages sped up the production of the UI by a great deal. (to be honest it wouldn’t have looked as good without them). 

- [The Guidance kit](http://wp7guide.codeplex.com/) made producing the screens as easy as cut and paste, find the control or screen you like the look of, copy the XAML in to your project and change the object names
- The [Silverlight toolkit](http://silverlight.codeplex.com/) gave some extra punch with more flexible control, like the content menu and date/time picker (which I extended to make into a more generic number picker)

So library in hand I started on the main application.  Checking the clock I had spent just under two days sorting out the UI and web services (not data bound yet but close).  I had taken the 8 screens and reduced them to 2 pivot pages and one settings screen.  I then added some transitions and enhanced behaviour.

Then things started to slow down.

Since my original implementation used data binding on the whole page there were no issues, now that I was using the pivot control, I needed to use different portions of the view model on different pages within the pivot control.  Now there probably is a better way to do it, however with the time at hand my few searches proved fruitless.  In the end the main list in the pivot was data bound to the view model as expected but the subsequent pages were derived (hell that might even be the right way).

Other issues I found were that some of the controls in the Guidance and Silverlight toolkits used data binding to custom controls to get the display right and it seems you cannot do pass through data binding (data bind to the control which data binds to the field).  SO this ended up being hacked around a bit to work properly.

Next up I implemented tombstoning and this was the single most time consuming part of the project.  Putting in the initial standard tombstoning code was fine and calling it in all the right places was not a problem.  But on testing, it drove out several issues on the phone platform with the application exiting and coming back.

Now I am a fan of this idea of tombstoning, better to have a clean device rather than have odd programs left running in the background consuming battery, either because the user has forgotten about then, or a thread has been fired off that never returned.  I remember from my Windows Mobile 6 days, that my PDA would have some very odd behaviour that would only go away after resetting the device.

Now close to the wire I managed to finish in time, the UI team sent me all their images for the app and UI values to add a level of prettiness to the app (never underestimate the power of a colour other than black / white in an app!).  The XAP was packages and sent of to the team to publish the app for the deadline.

* * *

# End results

![](http://www.comparequotes.net.au/Images/car-transport/auto-sport-car-transport.JPG)

in the end I was happy with the app as if left my inbox and I learned a lot from the process.  To sum up here is a few pointers on my experiences:

- Do not underestimate how much testing you need to do: 

> Test everything, every click, pressing the back or win button at inconvenient times, typing in bad thins and getting it wrong.  In the end you will have a much more stable and better app.

- Take care with data binding and tombstoning:

> Make sure you store all data you need to return the app back to it is rightful state.  This includes:
> 
> - All security or contextual information needed to make the application run.  
> - If you are using Pivot/Panorama controls, store the current index of the control. 
> - If the user has changed a value or has moved to another field on the form, make sure to remember the field in focus. 
> - Do not forget users can start entering data when the app is being tombstoned, but may not have finished.  So store the current and previous value of a data abound so you can undo what they have dome

- Web services are not resilient:

> By default, service references are not resilient.  If the endpoint is not available when a call was made it will crash.  Best to test your app without connectivity and wrap try / catch statements where the service tries to interpret a NULL response.  Just adding a web http post test before calling the service is not enough to ensure it wo not crash.

- Do not code to expect an answer from a web service:

> In some situations a web service may time out or simply not receive a response.  If should be pretty standard for any web service developer to understand this but for those of us just consuming services, be aware.  If you have a combo box or list that will not function without data, make sure you handle it by either pre-populating it with a default action or if the web call does not come back or comes back with nothing, then handle it appropriately.

- Get some lipstick on that pig

> If your app is just black and white, add some sparkle to it.  If you have a UI designer at hand use them, if not play around with changing the background colour or find an image that fits the theme of your app.  Make it stand out.

- Test Test Test

* * *

Right, I’m off to write my other post-mortem about the XBOX XNA game I’ve been porting to the Phone ![Smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6864.wlEmoticon_2D00_smile_5F00_0EB3C210.png)

Technorati Tags: [#WP7](http://technorati.com/tags/%23WP7),[Windows phone development](http://technorati.com/tags/Windows+phone+development),[WCF](http://technorati.com/tags/WCF),[Post-Mortem](http://technorati.com/tags/Post-Mortem)
