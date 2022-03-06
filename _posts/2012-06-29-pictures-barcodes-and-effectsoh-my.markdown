---
layout: post
title: Pictures, barcodes and effects - oh my
date: '2012-06-29 21:34:15'
tags:
- samples
- tutorials-resources
---

Now this was an unexpected surprise since I should still be wo deep rehearsing for my webcast next week (already?), but I’ll get back to that.

It sort of came at me out of the blue, the story goes a bit like this:

> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    Coding 4 Fun release a [snazzy article on picture manipulation on WP7](http://blogs.msdn.com/b/coding4fun/archive/2010/08/09/10048007)   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    I go, like woah, that is way cool, how about in XNA4 on the Phone   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    I try and fail miserably, mainly due to the libraries use of the Silverlight Writablebitmap class   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    Time passes   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    A friend shows me his app on his iPone (poor sucker) to scan a barcode and get the price of a nice Panasonic Blue-ray PVR 500gb (was nicely priced as well)   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    Some more time passes   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    [This article](http://www.codeproject.com/KB/graphics/BarcodeImaging3) (along with a few others) appears on [codeproject](http://www.codeproject.com/) (a fine place for articles on code) for reading barcodes   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    A plan starts to form and the Shiny Shiny particle of my brain goes in to overdrive and defies reason

So, throwing caution to the wind, I brushed off my XNA version of the PicFX project and armed with some ideas on how to tackle WritableBitmaps, I set off to complete the long forlorn project and inject some barcode goodness.  And this is where our story begins.

#### \*\*Note

**I would like to give a big thanks and thumbs up to** [**Nick Gravelyn**](http://blogs.msdn.com/b/nicgrave/) **, without his unbeknownst help, I would still be relying on jpeg conversions.  Thanks to this** [**hidden gem of an article**](http://blogs.msdn.com/b/nicgrave/archive/2010/07/25/rendering-with-xna-framework-4-0-inside-of-a-wpf-application) **(well not really hidden, just hard to find)**

Source for both the Texture2D and WriteableBitmap samples [here on codeplex as usual](http://startrooper2dxna.codeplex.com/releases/view/52215)

**\*\*UPDATE\*\***

Found another Barcode library to use in Silverlight (might with in XNA if you port it) over on [Codeplex](http://silverlightzxing.codeplex.com/), it’s been Ported from an original Java library by[Greg Bray](http://silverlightzxing.codeplex.com/).  Great stuff and nice and easy to use.  No comparisons so far between Berands work below and this library, feel free to find the one that works for you.

Thanks to [Daniel Vaughan](http://www.linkedin.com/profile?viewProfile=&key=15495537&authToken=6cjD&authType=name&goback=%2Egde_3405242_member_41561516) for the info on [Linked-In](http://www.linkedin.com/groupAnswers?viewQuestionAndAnswers=&discussionID=41561516&gid=3405242&trk=EML_anet_di_pst_ttle)

* * *

### The Sample

Now I’m not going to go in to too much detail here on the two libraries, except to say:

> > ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    [PicFX](http://blogs.msdn.com/b/coding4fun/archive/2010/08/09/10048007)
> > 
> > This is a nice and simple example of image manipulation using Writable Bitmaps, extracting out the byte values of images and twisting them to meet your evil needs.  The article goes in to a lot of details of what and how you manipulate the image to get different effects.
> > 
> > ![](http://ecn.channel9.msdn.com/c4fcontent/images/d2318adeb050_AB1A/image_thumb_12.png)   
> > ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    **[Berend Engelbrecht’s](http://www.codeproject.com/script/Membership/View?mid=2307043)**  **codeproject barcode library**
> > 
> > Reading barcodes reliably and effectively in all dimensions is a tricky business, however the article and it is sample make this easy to understand.  It basically sums up the need to scan images in lines, work out what is light and what is dark, average this out and then compare the findings against known barcode formats.  Note, the code retains it is original open source license, so check this if you want to re-use it. 
> > 
> > ![](http://www.codeproject.com/KB/graphics/BarcodeImaging3/BarcodeImaging3-screenshot.png)
> > 
> > (not the XNA screen ![Hot smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/1581.wlEmoticonhotsmile_5F00_009172EE.png))
> > 
> > ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    Reach Demo Code
> > 
> > To ease making this sample I also made use of the menu system from Shawn Hargreaves Reach demo code.  It is nice and simple with hit checking on menu items and delegates for menu actions.  Short sweet and to the point.

 

* * *

 

### The modifications – how I got it working

PicFX as I’ve stated before uses the Silverlight writeablebitmap class, however XNA does not have this natively, XNA uses Texture2D’s for drawing.  Originally I wrote a converter for changing a writablebitmap to a Texture2D (actually I wrote it twice, once using jpeg conversion and once using bit manipulation, I settled with the latter as jpeg conversion causes image degradation), I have left these routines in for prosperity.

Needless to say it is now using Texture2D as it is base image class so it can manipulate and draw the same image.  Major thanks again to [Nick Gravelyn](http://blogs.msdn.com/b/nicgrave/) XNA Team fame, for his [article explaining the differences between WritableBitmaps and Texture2D](http://blogs.msdn.com/b/nicgrave/archive/2010/07/25/rendering-with-xna-framework-4-0-inside-of-a-wpf-application) (what a difference two bits makes ![School](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2654.wlEmoticonschool_5F00_3C8D8ED6.png))

The Barcode reader.  Now this was a bit more tricky, as the class used the System.Drawing.Imaging.Bitmap class,  this is just not available in the compact framework (and it caused me several hours of headache and research to ensure this was the case).  So leaving it all intact was just not an option.  However in the way the library also scans images, it was also using some of the low level capabilities of the bitmap class to scan images using sections (rectangles defining a portion of the image to scan), which are not available in either the Silverlight Writeable bitmap class or XNA’s Texture2D (granted I could just use a rendertarget in XNA to portion the image but that would mean it would not work for Silverlight.

So after much effort and a little refactoring and manipulation of the base code, it now works using Texture2D’s and simply scans each line in the image both horizontally and vertically.   Keep this in mind if you use it as the Camera Chooser class returns a 5M image by default and this could take a few seconds to scan.  Best to either scale down the input or lower the resolution of the camera when taking pictures for barcode scanning.

 

**I will publish BOTH the Writablebitmap and Texture2D versions of each of these apps, so you can pick and choose what you want to use.**

* * *

### What is left

Well I did not have time to do as much as I wanted with other activities plaguing my mind, so here is a list of things to be aware of:

> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    PicFX only does sepia and b&w effects, so you might want to play around with more   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    The barcode library only scan images and report back codes at present   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    Integration with a service like [isbndb.com](http://isbndb.com/)
> 
> to get info back on ISBN barcodes (books) and then who the details – more info here [isbndb.com dev docs](http://isbndb.com/docs/api/index.html)
> 
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    A proper scanning (using the camera but you need a device for that) interface for getting barcodes   
> ![](http://www.dotnetscraps.com/samples/bullets/038.gif)    Integration with other shopping / info web services

Everything you need to start is here and you can use my previous articles on WCF and the phone to help get data and then show it.  Granted you might want to do it in a Silverlight project (just use the writeablebitmap class version barcode service)

 

* * *

 

Conclusion

Right, I’m off to be a hermit and finish rehearsals for the [XNA 3D starter session for AT&T](http://developer.att.com/developer/index.jsp;jsessionid=OTU14OCWQLIUJB4R0EWCPJQ?page=webcast&id=6.3_v1_10800360) I’m doing next week (16th Sep) – details here (pre-registration required, so if you want to attend make sure you pre-book as you wo not get in on the day)

Off to find my hole in the ground, you young-un’s do not know how good you have it these days

Technorati Tags: [wp7](http://technorati.com/tags/wp7),[wp7dev](http://technorati.com/tags/wp7dev),[windows phone development](http://technorati.com/tags/windows+phone+development),[xna](http://technorati.com/tags/xna),[barcode](http://technorati.com/tags/barcode)
