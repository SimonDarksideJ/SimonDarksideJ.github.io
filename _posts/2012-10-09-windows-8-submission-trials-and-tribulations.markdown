---
layout: post
title: Windows 8 submission trials and tribulations
date: '2012-10-09 12:41:41'
tags:
- certification-issues
- windows-8
- windows8-tutorials
- winrt
---

Boy what a crazy couple of months, to kick things off I got my first Windows 8 game up and running and through the App Excellence labs on to the Store in prompt fashion, not a glitch (if you do not count the first lab I attended not understanding what the labs were really there for, putting a tick in the box for your app to go on the store).  Not one single issue in submission, it was in and done in about 4 days.

1 Day after clicking submit [AdDuplex](http://www.adduplex.com/) go and show off an offer where the first 5 Windows 8 apps using [AdDuplex](http://www.adduplex.com/) will get 250,000 impressions for free. I gritted my teeth, cursed a bit and then promptly updated my local copy with the new [AdDuplex](http://www.adduplex.com/) ad control (which also spurred me on to get the Win 8 version of [AdRotator](http://wp7adrotator.codeplex.com/) out but that was another story), as soon as I could I edited my release on the store and submitted version 2, only difference, it had ads in it, and this is where the party started, hence the article.

* * *

# The Current Store Experience

If you are thinking of publishing an App to the Windows Store, first and foremost you should familiarise yourself with the following policy document:

> [http://msdn.microsoft.com/en-us/library/windows/apps/hh694083](http://msdn.microsoft.com/en-us/library/windows/apps/hh694083 "http://msdn.microsoft.com/en-us/library/windows/apps/hh694083")

You should read this with a hefty dose of salt at present and if you can think of any possibility that you are not complying with each policy or you have not followed its examples “to the letter” then change your app.  As it stands the testers are under orders to follow a ” **Zero Tolerance** ” approach to testing, this may change as things evolve just beware!

Now **do not blame the testers** if you are having issues with certification at present they are just following orders, those orders are evolving and the information is improving slowly but it is improving, over the course of my trials with certification things have already improved.

At the time of writing, testers have to complete a PDF for each certification policy your app is failing (e.g. policy 2, 3, 4.  Not sub policy).  They will complete it with information relating to how you are contravening the policy, it has been noted this is very lax at the moment and more information should be included (remember work in progress) and that testers should provide more detail, I would agree but again do not just blame the testers they are working against harsh deadlines (granted which doesn’t help us), work with the testers and feed back to them in the tester notes in your submission (granted I’ve not seen any evidence they are actually reading tester notes)

Hopefully you will get enough info behind your failure (although there have been some angry complaints to the contrary) and you can correct it, note trying to kick back will get you nowhere at present (remember Zero Tolerance).

At the end of the day, the testers are following the policy guidelines to the letter, only real issue is it is their interpretation of the policy.

* * *

# The Dreaded 1.2 failure

Now one of the biggest pain points at the moment is the dreaded 1.2 failure (complained about very loudly on some forums), at present the policy is so vague and subject to perception issues it is causing a big fuss.

In short it is described as:

> ###### 1.2 Your app must be fully functional when the customer gets it from the Windows Store
> 
> The Windows Store offers only fully functional apps to provide customers with the best experience. Anything that might cause our testers to think that your app is not completely finished will cause your app to fail certification.

To the layperson you might read this as its passed WACK and actually runs, this would be incorrect.  In detail you cannot have any indication that you are still working on the app, that there are features not complete or any area you are going to improve.

This position is daft as it could even be applied to “News” or “Release” information where you indicate bugs unresolved or even “Coming Soon” info.  Surely we should be able to tell users what is coming up, yes it should not interfere with the running of the app but we should be able to tease users with upcoming features.

Also if you run into the aforementioned “Corrupt Packages” issue, you will just get a 1.2 failure with NO DETAIL WHATSOEVER, I just got images of my spashscreen and nothing else, no help whatsoever and nothing to indicate they couldn’t even run the app.  I had several WACK reports included so the app obviously must run to pass that but this got me nowhere, it also ONLY happened on testers machines, WTF?

The best advice I have is get your app checked with your local Win 8 evangelist / champ (in most cases the same as the Phone Champs) if you are getting repeated failures, there is a bit of a silo issue between the Store testers and the rest of the world but they can suggest other ways to help pass.

* * *

# Certification 2 failures

This cert almost makes me laugh:

> **2. Windows Store apps can display ads but are more than just ads or websites**

If you have any form of advertising in your app, whether you are using a particular AdProvider ([Pubcenter](http://pubcenter.microsoft.com/) or [AdDuplex](http://www.adduplex.com/)) or using [AdRotator](http://wp7adrotator.codeplex.com/) you must ensure it doesn’t impact the running of your app, this could be any of the following:

- Your advertising overlaps any content in your app, even by only a few pixels.  Note, in ANY RESOLUTION.   Be sure you test your app in all the resolutions supported by the simulator.
- You have not altered your ad size for SNAPPED view or Portrait if you support it
- You cannot have advertising in flyouts or Charms options.  This is the most vague statement of all!

There are also limits to what you can advertise, in point 3 above you can link to facebook and twitter in your settings charm BUT YOU CANNOT link to other apps you might have in the Microsoft Store.  Such variations are not clear in the policies and a lot more work is needed to document what is or isn’t allowed, but this case is just ridiculous.

**My advice** , only put settings in your settings charm to be safe, my app still has the facebook and twitter links there and passed.  You can still put whatever links you want in an “About” page or in a “Trial ended” page but be very wary about putting in your own advertising in with the main content.

* * *

# Certification 3 failures

Certification 3 failures are sometimes reported at the same time as Cert 1.2 failures, it is described as:

> **3. Windows Store apps behave predictably**

Al this really comes down to is that you cannot reduce functionality or remove features, you can enhance but NOT remove.  Again this is so subjective because if you transform a feature it could to one person mean you are removing the old and replacing it.

Hopefully you should not get this unless you app becomes unresponsive with slow connections or no internet (or on slower machines), in my experience Cert 3’s mask a real 1.2 failure.

**My Advice** , Just keep building up and if you do change a feature, put something in the tester notes to justify the change (since we do not have a technical notes section really)

* * *

# Certification 4 failures

Certification 4 is arguably one of the most contrived and confusing policies in the list, it is described as:

> **4. Windows Store apps put the customer in control**

Al this really means is “Do not do anything without making the user aware of what you are doing”, it  boils down to your apps PRIVACY POLICY and what services and information you inform the user you are consuming and what you are doing with that data.

It is really a plague of the litany culture we are in and Microsoft are just protecting themselves for apps they are hosting for users.

In the end, put a privacy policy in your app and your store submission and stick to it, areas you should consider putting a link to the privacy policy are:

- In your Settings Charm
- On your start page
- In any about or info pages

You at least do not need to worry about the user accepting the privacy policy, by using the app they have informally accepted the privacy policy, but if you collect usage data (even if you do not include user info) using analytic’s, be sure you mention it in the privacy policy.  I’ve not seen any evidence that the testers are verifying the policies other than just having one but it would be a dark day should a user do network traces on your app and find you are not declaring something, just remember back to all the big cases of late where “user” information was collected and people were not informed!

In my case I allow users to enter a player name for the multiple players the game supports, this was seen as user data and i was required to have a privacy policy (even though the player name is unlikely to bear any relation to the device holder)

**A great example** of a privacy policy can be found on this blog here:

> [http://bugail.com/windows-8-apps-privacy-statement/](http://bugail.com/windows-8-apps-privacy-statement/)

**My advice** , even if you do not think it is necessary, put a privacy policy document on the web somewhere and put the link throughout your app and in your submission, just to be on the safe side (Really SM should just make it mandatory to avoid confusion)

The other points around Certification 4 really mean the same thing, use MS services in the way they were designed (Store functions for trials and in-app purchasing) / Notification services and if you do, then make a note of it in your privacy policy.

* * *

# Improvements and communication

What I would like to see improve (hopefully before launch, but better yesterday) would be the following:

- Better policy documentation and examples of what is allowed and what is not, it is just to Vague at the moment.
- Give the testers more bandwidth to feedback more in the failure reports, get more detail in, do not be vague
- An escalation process, you should be able to escalate your submission if it has failed more than twice, there are engineers across the globe in the app excellence labs, you should be able to request help to pass certification.
- Learn from a working marketplace namely the phone marketplace, there are a lot of things done right and have been working for a couple of year now, talk to each other guys!

As it stands the web portal used for the Windows Store is far superior in most aspects to the old Phone marketplace but more work is needed to make it work better.

* * *

# Collaborate, do not point fingers

We are still in an evolving platform (at the time of writing) and things definitely need to improve but do not just name and shame.  If you have criticisms then back them up with effective and real alternatives or ways to improve.

A lot of the comments I’ve seen are just calling for blood, yes we might be getting frustrated (more that was even experienced in the Phone launch) but we have to work together as developers and even consumers of this new platform.

Reach out to your Champs / Evangelists or contacts and work to make things better, not everything that is wrong with the Store at present is the **NOT** testers fault!.

Keep this in mind when you are flaming your certification failures!

* * *

# Conclusion

I’m still optimistic about the future of the Windows Store, we will certainly see more things learned from both the Phone Marketplace and Windows Store start to change (not necessarily all for the better!) there is even an indication that the two stores will merge (unconfirmed).

I would like to see more constructive criticism going forward, things have been fairly closed of late but as past experience has shown MS are reactive to comments overall.

* * *

# Last Tips

Just to finish off, here are my top tips before you submit to the marketplace:

- Test your app in ALL resolutions, use the simulator to do this as Blend isn’t always accurate
- Test your App in Snapped / Docked and Full view, you have to support them all!
- Check if you support landscape and / or portrait and test again in all resolutions for both, note changing the settings in the AppX manifest does not affect the simulator! but it will on the store
- WACK your project LOTS and on multiple devices if you have them INCLUDING THE SIMULATOR
- If you are using Ads then be careful where you place them
- Find out who your Windows Champs / Evangelists are, just in case you need them.  My experience has always shown them to be very helpful (or know someone who is)
- Get or make a privacy policy and include it with your app in all the areas mentioned above, even if you think you don’t need it (see [http://bugail.com/windows-8-apps-privacy-statement/](http://bugail.com/windows-8-apps-privacy-statement/) for example)
- Build great apps but be sure to TEST in BOTH limited and no internet connectivity and have you app act accordingly!
