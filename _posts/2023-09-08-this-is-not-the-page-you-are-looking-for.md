---
layout: post
title: This is not the page you were looking for!
date: 2023-09-08 00:00 +0000
description: Things may not be what they seem when building your Jekyll based blog site, when pages collide it does not end well.
img: posts/20230908/title.gif
category: Automation
tags:
- azure
- github
- automation
author: Simon Jackson
github:
mathjax: false
---

![Looking for pages](/assets/img/posts/20230908/01-lookingforpages.gif)

> TL;DR -> Jekyll builds can have page collisions in different places if the pages happen to have the same title.  [Skip ahead to fix!](#jekyll-page-collisions).

WOW, it has been a while since I last posted, which is genuinely very bad for me, not to say I have been lazy or up to no good, quite the opposite, I have a myriad of things on my mind:

* This year I have been writing a new book [Accelerating Unity Through Automation](https://www.amazon.co.uk/Accelerating-Unity-Through-Automation-Offloading/dp/1484295072/ref=sr_1_5?crid=1V55PE5STOPNN&_encoding=UTF8&tag=zenistud-21&linkCode=ur2&linkId=3d1d5a139a27aedad1fbc681e9a0e1d2&camp=1634&creative=6738)
* I changed jobs due to a sudden and dramatic change in events.
* Had to setup my own company (again) for contracting, as work involves companies across the pond from me.
* The [Reality Toolkit](https://realitytoolkit.io/) and its new companion the [Service Framework](https://realitycollective.io/com.realitycollective.service-framework-docs) have kicked up a gear.
* Various OpenSource and related activities online which drown my soul.
* Kids, family, dogs, puppies and more.

Personally, I do not see this as a valid excuse, but I have been slowing down a bit of late due to my progress in time, promises made and broken to myself, but C'est la Vie.

## Back on target - broken links in Jekyll

![Skip to the end](/assets/img/posts/20230908/02-skiptotheend.gif)

So why the sudden post.  Well it all started when..  No it's too much, let me sum up.

In short, when posting about my new book, one favoured visitor informed me that all the book links on my blog site were no longer working.  I was curious, bemused, confused and above all, frustrated.

I had migrated my blog some time back and despite my best efforts and mad "search and replace" skills, I still find the odd link broken.  Not put off I checked out (what I thought) the page that had the information, except, the links were all fine.....

Confused, yes I was.

## Updating the blog site

![Updating your blog](/assets/img/posts/20230908/03-updatingtheblogsite.gif)

So in an effort to resolve this I tried a few things:

* I tweaked and pushed the offending page to the blog and published - no effect.
* I deleted and re-added the page - no effect.
* I deleted the github pages deployment and republished using the new actions method - no effect.
* I toyed with the idea of deleting the site and republishing - I DOD NOT DO THIS.

In the end I went back to basics and tried building the site locally, only to find all my test setup no longer worked, I fixed that and built the site.

What I found was something I did not expect:

### **CONFLICTS**

## Jekyll page collisions

![Finding conflicts](/assets/img/posts/20230908/04-jekyll-conflicts.png)

Only when building locally do these kinds of conflicts how up, the GitHub Pages deploy actions all report SUCCESS!!!.

> I did dig deeper much later, the older "pages build and deployment" publishing task does NOT show any errors, however the newer GitHub Actions based deployment DID actually show the same error (if you know where to look)

What is essentially happening is this:

* There is a prebuilt HTML file called ```Books.html``` which by default deploys to ```<root>/Books.html``` (the file I was editing)
* However, there was also a post called ```2014-09-02-books.markdown```, which when built is written to ```<root>/books.html```.

> Jekyll strips the dates from posts when generating the HTML.

So two files ended up writing to the same output file, and basically, the last one to process won (the blog post version) as a Jekyll build will keep writing and just let you know what it did.

## Fixing collisions

Laughably, the only way to prevent the collision was to delete one page or the other, or rename them, that is all there is to it.

> INCLUDING THE SUBJECT MATTER AT THE TOP OF THE FILE!!

So once again my blog is a happy place, links work and pages are showing exactly how I expect them to be, phew.  Only took an hour of pulling hair out.

## You must read from the book

I almost find it ironic that one of the things that would have helped the solution was to read my new book, which is due to go on sale very soon (or now if you are reading this in the future).

[![Accelerating Unity Through Automation](assets/img/posts/image-not-found.png)](https://www.amazon.co.uk/Accelerating-Unity-Through-Automation-Offloading/dp/1484295072/ref=sr_1_5?crid=1V55PE5STOPNN&_encoding=UTF8&tag=zenistud-21&linkCode=ur2&linkId=3d1d5a139a27aedad1fbc681e9a0e1d2&camp=1634&creative=6738)

if you want to learn and understand automation and all the joys that come from letting someone else to the repetitive parts of you job, then I would recommend a read.

> And if you attended my talks on Automation recently, you could try all the fun things you can do with automation too.

I hope this helps out any other Jekyll blog users and save you from a certain amount of hair pulling in diagnosing issues on your blog.  

## P.S. Switch to the new GitHub actions build and publishing, it is much better
