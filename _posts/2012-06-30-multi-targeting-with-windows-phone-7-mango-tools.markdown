---
layout: post
title: Multi-Targeting with Windows Phone 7 Mango tools
date: '2012-06-30 23:36:17'
tags:
- tutorials-resources
- windows-phone
---

As it was mentioned at Mix and a few other places, with the release of the New Windows Phone developer tools for Mango you can target both the original release of Windows Phone 7 (7.0) and the New Mango Release (7.1) from within your solution.

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8446.image_5F00_thumb_5F00_24FC9ED9.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/0027.image_5F00_048584F4.png)

As you can see above, this is simply done within your **Project** properties (not the solution properties), here you can select either 7.0 or 7.1.

Note, if you are using features exclusively for Windows Phone 7.1 Mango, then it will only display V 7.1.  This can be seen if you load up any of the new project templates as shown below:

Silverlight “New” Project Templates

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2577.image_5F00_thumb_5F00_5F47EEED.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2063.image_5F00_4DB80422.png)

XNA “New” Project Templates

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8446.image_5F00_thumb_5F00_0D0591E6.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6371.image_5F00_3DE84951.png)

* * *

Quick “For Reference” though.  The two new projects for 3D apps in Silverlight are identical “Windows Phone 3D Graphics Application” (Silverlight) and “Windows Phone Rich Graphics Application (4.0)” (XNA).

Goodness knows why they have different names but they are the same project template. 

\*\*Note

As was highlighted at Mix, you can use XNA in your Silverlight projects and use custom Silverlight controls on top of your XNA game in Silverlight.  BUT you CANNOT use Silverlight inside of an XNA project.

This is a bit of a fine line but I can understand how they have done this as XNA is abstracted within Silverlight in order to use it, it is not true integration as yet but we can hope for the future.

 

Happy mango travels

# \*\*Update

Just tried (for a quick test) to select the new release for one of my existing projects and the tools warn this is a ONE TIME option only.  Seems you are either in one platform or the other, you CANNOT go back.

The tools do nicely warn you of this and tell you to do a backup before you do (I would recommend to do it in your source control app to make this easier).

SO the road only leads forward, just a little note in case you were about to try (as I did).

To be expected I suppose :0)

* * *

# The Mango Tools beta

Oh and in case you missed it the download link to the [Windows Phone Developer 7.1 (Mango) Beta tools](http://bit.ly/lATq72) is here, thanks to [@MobileTechWorld](http://twitter.com/#!/MobileTechWorld/) for the info

