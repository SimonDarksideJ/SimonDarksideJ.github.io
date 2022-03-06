---
layout: post
title: Hold on I forgot to mention!
date: '2012-10-08 13:00:35'
tags:
- adrotator
- ramblings
- tutorials-resources
- windows-8
- windows-phone
- winrt
---

There’s always that point when you are maintaining and developing your live project when you really wish you had a way to communicate to your users, it could be as simple as a “Check this out” or as worrying as “My backend service provider just crashed please check for my update”.

In the past this would require you to host your own web service or hold some XML and have your app check it when it started and then the trick of managing a separate page to look up the updates (actually the YLAD – Your Last About Dialog project has such a page ready built for you!), well it was brought to our attention that you could just as easy use [AdRotator](http://wp7adrotator.codeplex.com/) to do this for you!

* * *

# Get me some updates!

We noticed an amazing pattern being used by some apps where they were presenting their notifications to users as toasts or banners in their apps which is exactly how [AdRotator](http://wp7adrotator.codeplex.com/) works and we thought the idea was so fantastic that here is a separate post just for it.

The idea is simple thanks to the built in Remote House Ad Support available in AdRotator already:

1. Create a XAML user control and host the XAML somewhere on the web, probably best where you host your remote AdRotator configuration (we recommend signing up for a FREE [Azure](http://www.windowsazure.com/en-us/) or [AppHarbour](https://appharbor.com/) account and link it to your source control of choice), we use AppHarbour for the AdRotator examples.
2. Update your Remote XML configuration for AdRotator in your app to set a remote URL for the House Ad thus:

    

