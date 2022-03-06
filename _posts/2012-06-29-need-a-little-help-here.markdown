---
layout: post
title: Need a little help here
date: '2012-06-29 11:17:56'
tags:
- errors
- information
---

In [Aaron Stebner’s WebLog](fr:feed/146), a good blog has appeared to help show how to install the Local Help for the Windows Phone tools beta.

It is nice and detailed and helps for those times when you do not have access to the wire (read internet), on the train (but most trains do offer wifi these days ;-\<) or the internet is just too slow.

BUT

There is sometimes, always, a but.

If you are running Vista or Windows 7, if you follow Aaron’s instructions you will most likely see this error:

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/1172.image_5F00_thumb_5F00_0B03645A.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8446.image_5F00_0D9CBBE5.png)

Damn those infernal Administrator privileges, the bain of many a developer (just keep telling yourself those are there for a reason, breathe and move on).

Now if you are unfamiliar with handling this issue, here is some help, there is still a way to install your help, you just need to run the install as administrator.

Since this is a command line installer you simply need to do the following:#

1. Create a new text file (notepad will do)
2. Paste in the command you need to run, in the case of the help install this is “”%ProgramFiles%\Microsoft Help Viewer\v1.0\HelpLibManager.exe” /product vs /version 100 /locale en-US”
3. Save it with the extension of .BAT
4. Close the text editor
5. Right click on the file and select “Run as Administrator”
6. Make sure you click OK to the pop up screen that follows (which will always fail if you do not click it in a certain amount of time)
7. Follow Aarons excellent instructions 

Done

* * *

There you go, now enough of this triviality and back to the series.

