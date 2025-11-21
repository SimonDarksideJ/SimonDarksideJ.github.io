---
layout: post
title: Updating old FBX files for the modern era
date: 2015-10-19 08:43:21
tags: [monogame]
---

[![image](/assets/img/wordpress/2015/10/image.png "image")](/assets/img/wordpress/2015/10/image.png)

FBX as a standard for 3D model files has been around a while now, it is robust and commonly used simply because formats like .X (DirectX) and obj (Wavefront) either are not supported or implementations can vary (but everyone always has an opinion on which format is their favourite. Use what you prefer!).

Now standards improve / change over time and FBX is no different, Autodesk (who created / own the FBX standard) have tweaked / improved (there are a lot of slashes in this article for some reason ![Confused smile](/assets/img/wordpress/2015/10/wlEmoticon-confusedsmile.png)) the standard over the years, however usually this is fine because most tools try and support as many options as possible, however of late there are some REALLY old versions which are going out of style and support is wavering.


# Running in to issues with old FBX formats

I stumbled across this recently while updating some old samples and tests for MonoGame. Normally with MonoGame (99.5% of the time) the old XNA samples just work, you simply need to build a new MonoGame project, copy over the code and assets and you are up and running, however with the recent releases they have deprecated some of the older FBX standards in favour of only supporting the newer variety.  When you add an old FBX into your content project you will get the following error:

[![image](/assets/img/wordpress/2015/10/image1.png "image")](/assets/img/wordpress/2015/10/image1.png)

As you can see, we get a fairly explanatory error:

> ### Error importing file: FBX-DOM unsupported, old format version, supported are only FBX 2011, FBX 2012 and FBX 2013

You will likely encounter this when you use an old FBX from a sample or even from some of the many 3D model sites out there, or even an old project that uses FBX files that you are trying to bring back as your new Retro title.

* * *


# What to do when your FBX is TOO old?

Obviously you do not want to bin that old model (obviously very near and dear to your heart), replacing it could be costly and making it from scratch is going to take just too long (unless it is just a cube?)

So we have a couple of options to get us out of this hole:


## 1: Convert it

Now many 3D model conversion sites do generally support most 3D format standards and have ways to convert them from one to another, such as the Online 3D Convertor.


### Online 3D Convertor – [http://www.greentoken.de/onlineconv/](http://www.greentoken.de/onlineconv/ "http://www.greentoken.de/onlineconv/")

They offer conversion between several formats based on the [Open Asset Import Library](http://assimp.sourceforge.net/main_features_formats.html). There are a few it ca not convert (namely MAX and Maya as they are too proprietary), otherwise the list is very extensive.  You can then either convert to another format or back to a newer version of FBX.


## 2: Upgrade it

Now Option 1 may not always work, like others they need to maintain their library and older formats may simply become too much work to support. Thankfully though (for FBX) Autodesk being a very nice and giving bunch, have made a handy upgrade tool which is available completely free:

[![image](/assets/img/wordpress/2015/10/image2.png "image")](http://usa.autodesk.com/adsk/servlet/pc/item?siteID=123112&id=22694909)

The FBX Convertor tool can actually do a lot more than just upgrade your FBX files, it can view them, strip out unnecessary data (especially useful if you want to remove animations for skeletal rigging) and much much more.  You can find this tool here:

> ### [Autodesk FBX Converter](http://usa.autodesk.com/adsk/servlet/pc/item?siteID=123112&id=22694909 "Autodesk FBX Converter")


## 3: Visual Studio is your friend

I was reminded on Twitter (and Andy’s comment below) that in Visual Studio 2013, the team added a whole host of new 3D graphics tools. These allow you to view, edit and manipulate graphics content, from images, shaders and even 3D models.  These capabilities were extended even further in 2015 which a host of new features which you can read about here:

> ### [Working with 3-D Assets for Games and Apps using Visual Studio](https://msdn.microsoft.com/en-gb/library/hh315737)

With Visual Studio, you can simply double click an FBX (and some other) files, then simply hit save and the model file will be automatically upgraded to the latest format.  Pretty neat and with the latest version of Visual Studio, completely FREE 😀

* * *


# Interesting side effect?

One last note when reviewing the upgraded FBX file was that it was in fact MUCH smaller, check for yourself:

[![image](/assets/img/wordpress/2015/10/image3.png "image")](/assets/img/wordpress/2015/10/image4.png)

Not sure what the actual cause of the reduction is or it is full effect, however the new FBX works just as well as the old from what I can tell.

* * *


# Happy motoring

Hope you found this little tidbit useful, I simply ran in to this while I was researching another fun area of MonoGame that is largely untapped, building Custom Content projects.  I have blogged about this before but it is due an update with the release of MonoGame 3.4 and the upcoming 3.5 release.

