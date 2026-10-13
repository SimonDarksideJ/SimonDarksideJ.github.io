---
layout: post
read_time: true
show_date: true
title: Transforming a blog
date:   2021-06-26 13:38:43
description: The first step in fixing a problem is realising you have a problem and getting off your old blog.
img: posts/20210626/migration-1-.jpg
tags: [ramblings]
author: Simon Jackson
github:  
---

One of the trickiest things when re-imaging your view of the world or changing how you interact with it, is how you present yourself.

Do you continue as you were or try something new, new is always scary and in the technical world it can also include some unintended consequences.

In starting anew, I chose to break the shackles of a blogging platform (WordPress in my case) and transformed to a new Ghost blog hosted on Azure.  This has not come without significant peril and confusion, mainly because all information about hosting ghost yourself is several months/years out of date due to changes in the Ghost platform and also on Azure.

Sure, I could have gone for a hosted blog, I certainly don’t mind paying for it, but where is the challenge in that :D.

* * *

## TL;DR

- Exporting from WordPress to Ghost is easy, but you need to find an alternate way to download the backup.
- Importing your WordPress backup in to Ghost will take a lot of trial and error, mainly to breakup the backup in to smaller backup files for import.
- Getting Ghost self-hosted is no simple task, but there is help. If you’re not sure, the only real option is to pay for a hosted Ghost.

* * *

## The State of Azure

Azure used to have a quite rounded set of free features, however overtime this has reduced to the point where it only supports static pages, simple web apps and PWAs and more critically does not support custom domains.  Thankfully though, HTTPS comes as standard (once you turn it on) and is still free.

But given having a “azurewebsites.net” url does not scream a “professional” blog, I chose to upgrade to the basic tier which gives you a little more freedom.  It’s not quite “free” but the cost is fairly inconsequential and comes with a host of nice features.

* * *

## The state of Ghost

Ghost has upgraded and added a ton of features in recent years, however, this has come at a cost of self-hosting.  Not to say you cannot still host it yourself with the latest and greatest, but it is no longer trivial.

For myself, I have stayed a version behind, as it is still possible to host a Ghost blog on Azure with Versions 2 & 3, although as you’ll see, not quite as easily as it used to be (Azure used to have a Ghost app deployment included in the Portal, but no longer)

I’m keeping an eye on a few great Microsoft MVPs who are still tinkering, in the hopes one of them can unlock the gateway to V4.  Another option would be to switch to using containers instead of hosting the website, but I’m not quite ready to make the jump yet.

One good thing is that once you have got your content into Ghost, it is a lot easier to transfer it to another Ghost site.

* * *

## Migrating from WordPress to Ghost

Now here is where the fun begins.

Ghost do provide a handy plug-in for exporting all your WordPress articles (only posts and pages are supported, forums and other features are not, so if you want to keep them you will need other services to export/host them).  You will have to convert any Categories you have setup to tags, as Ghost only supports tags, but again there are tools for that (but you will have some clean up tasks later).

Now, here is where the fun begins, WordPress will create your exported backup, however, you will then likely find your current host does not support downloading such a large file over the web and sadly instead of a helpful message, you will likely just encounter a “server error”.  This left me scratching my head for quite a while to figure out what is going on and it was only when I tried to backup my site to host locally, did I find the mythical ZIP file backup on the server ready for use.

Hidden in the plugins folder in the WordPress site’s files, the ZIP file was prepared and ready for use, but as you will find, this is only the beginning of the journey.

* * *

## Importing WordPress in to Ghost

Once you have your WordPress backup file, you then hit the reverse problem  when trying to import the backup file into your Ghost site, Ghost it seems has a 20mb’ish limit on import files, but all is not lost. (My backup was over 500mb, mostly images)

If you extract the zip file, you can break up the files and create several ZIP backups for imports, mostly images and other “stuff”.  Import the images first and leave the JSON backup file till last.  Once all your images are imported, only then import the Json text content which will automagically switch to using your imported images locally.

As a tip, WordPress auto-generates several scaled images for every image on the site, so go through your unzipped backup files and remove all the scaled images, leaving only the base image. Ghost does a much better job of handling scaling for images anyway.

* * *

## The final round-up

You will no doubt have several clean up tasks post import, ranging from:

- removing duplicate tags
- renaming unrecognized tags (most I found were also duplicates)
- cleaning up unwanted posts
- Theming, styling and Adonis
- A million other tasks to configure ghost

Your last steps will then be to start finding new paths to get content in to your new site, from Writing in Ghost, to using one of the many integrations (I tried the integration with "write.as" but ended up manually migrating the post here).

I wish you well on your new blogging adventure if, like me, you have decided to make a change.
