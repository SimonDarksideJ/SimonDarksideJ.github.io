---
layout: post
title: MonoGame goes Portable
date: 2013-02-16 00:24:39
tags: [monogame]
---

![src=]()

While I was putting together the [MonoGame](http://monogame.net/) solution for shocking effect you did seem to get the feeling you were building your game for several platforms, there is a fair bit of too’ing and fro’ing, pulling parts of the project together and one of my least favourite porting practices, the COPY project.

Yes, having the exact same code files re-used on several projects sounds great until one of those projects needs a different using, or requires you to use the same parameter in a different way or god forbid, require additional parameters for certain functions.

Portable libraries are one of the saviours from this practice by constructing a project that can be consumed by several different project types or platforms with a single codebase, main difference is that it is one code base used in a single way, the portable framework does not let you exceed these boundaries and keeps you in check.  Got something that is platform specific then keep it on that platform and not clutter up the central core of your app or game.

Main problem here with MonoGame as it wasn’t possible to do this, until now…


### **\*update – Access the GitHub repo of [MonoGame.Portable here](https://github.com/DDReaper/MonoGame/tree/develop.portable "MonoGame.Portable on GitHub")**

* * *


# First a Warning!!

![src=]()

Please note that this is my own work and while based on the original MonoGame development branch and (as far as I can tell) is still completely compatible with the core of MonoGame, you should only use this as a Proof of concept in Live projects until such time as this or another approved solution by the MonoGame team comes along.

It is not my ideal portable solution as MonoGame has not been written to be portable at present, its core focus is to keep a familiar flexible code base, based on the aging XNA framework to allow to re-use your projects across multiple platforms (note I say re-use as effort is still required).

MonoGame is a fantastic achievement and if like me, you are passionate about such things (and can code as this will help) then get involved and see how you can benefit the platform!!.

* * *


# Why be portable?

![src=]()


#### As the old saying goes, if it ai not broke, why try to fix it?

Well, at present the MonoGame code base (and most likely any solution you build using MonoGame) is very singular for almost all platforms, they are very intertwined and components are swapped out, changed or just extended to try to provide flexibility to accommodate an ever changing directory of needs.

There’ nothing particularly wrong with this practice but, over time your code becomes very complex, trying to fix issues with one platform can severely impact another without knowing it (unless you test all builds on all platforms after every commit), basically having so many flavors of pie in one pan soon becomes very hard to differentiate which pie is which.

Portable libraries help with this by having the “core” of you are project in one place that works one way and keep platform extensions with each platform and if your sensible about it, then the core never even knows this is going on.

Granted you could potentially create the same thing with multiple smaller projects and just keep swapping things out, except that if you add something another platform does not like, you wo not know until you test on that platform. Portable libraries prevent this as then only allow functions that will work on ALL configured platforms, hence protecting you from yourself.

Want to know more then try out some of these resources:

> #### [How to Make Portable Class Libraries Work for You](http://blogs.msdn.com/b/dsplaisted/archive/2012/08/27/how-to-make-portable-class-libraries-work-for-you)
> 
> #### [Evolving the Reflection API](http://blogs.msdn.com/b/dotnet/archive/2012/08/28/evolving-the-reflection-api)
> 
> #### [Using Portable Class Libraries with Windows 8 / Windows Phone 8 MVVM](http://mobile.dzone.com/articles/using-portable-class-libraries)
> 
> #### [Create Cross-platform Apps using Portable Class Libraries](http://channel9.msdn.com/Events/Build/2012/3-004)
> 
> #### [Developing Mobile Solutions with Windows Azure Part II](http://channel9.msdn.com/Events/Build/2012/3-039) (also FYI check out [Pt1!!](http://channel9.msdn.com/Events/Build/2012/3-057))
> 
> #### [The Collection of MvvmCross Presentations](https://github.com/slodge/MvvmCross-Presentations)  (fantastic Cross platform stuff using Mono/Xamarin)

Be aware though, a portable library enables you to develop a very simple and central shared project, you wo not however be able to actually run your project without at least one platform to run it on, the portable features just make enabling the project on other platforms a snap.

What we are aiming for with the use of a Portable Class Library is something like this:

[![image](/assets/img/wordpress/2013/02/image9.png "image")](/assets/img/wordpress/2013/02/image9.png)

* * *


# Back to the show

So what difference does this really make, well let’s spell out the two main differences it makes with MonoGame projects


## 1. Project Make-up

The first main impact is how you layout or manage your multi-project solution (The MVVM cross presentations above do a much better job of explaining this, but here goes)


#### The Project Portfolio

With current practices you will most likely have something like this:

[![image](/assets/img/wordpress/2013/02/image10.png "image")](/assets/img/wordpress/2013/02/image10.png)

Depending on whether you Link the core files for your project or just copy them, you have several solutions for each platform with more code to manage / integrate when you are considering each platform. in its worst case scenario (Just copy projects), a single bug fix to core code has to be replicated across all platforms and if there are platform specific differences in that chain it becomes increasingly difficult.

Portable libraries ease this somewhat with their central nature.


#### The Portable Portfolio

[![image](/assets/img/wordpress/2013/02/image11.png "image")](/assets/img/wordpress/2013/02/image11.png)

The portable allows a single project to be associated to many others so long as you have the project targets loaded in the portable libraries (for more info on that read up on portable libraries!!)


## 2. The single source of truth

Portable libraries address one of the biggest headaches in multi-platform solutions because of the one simple truth, they are all different.  Each platform has its own way of doing things that are generally incompatible with the next.

Now I will be completely honest, portable libraries alone will not save you here but what they can do is make the job a lot easier and how you exactly what is compatible between ALL of your supported platforms and more importantly what is NOT.  Try and put in something or reference a library that isn’t compatible with all platforms and you will just get compilation errors.

This ensures you put platform specific code in with a platform and central stuff in one place.

[![image](/assets/img/wordpress/2013/02/image12.png "image")](/assets/img/wordpress/2013/02/image12.png)

There is a buyer beware sign if you read up on Portable class libraries, the more platforms you add generally reduces the scope of what is truly portable, so take care.

Like I also said it wo not solve ALL you problems, so watch a few of the videos above and read up on abstraction and lay the framework or a scalable solution. Centralise where you can but keep it SIMPLE!

* * *


# Lightning pure and simple

So after cleaning everything up and now using a portable library for the core of the code from the previous demo’s I am left with the following:

[![image](/assets/img/wordpress/2013/02/image13.png "image")](/assets/img/wordpress/2013/02/image13.png)

At present I have left the original drawing code as my initial portable experiments were only meant to enable basic features but I seem to have managed in a fairly short period of time to enable most features of the framework in a portable library, so at this point I could move just about all the demo code in to the portable library, therefore I only need a shim in each platform project to run it (plus an additional platform features I want to take advantage of like sharing / NFC / etc)


### Source for the series can be found [here on codeplex](http://lightningdemo.codeplex.com/) as well as the code drop for [this stage here](http://lightningdemo.codeplex.com/releases/view/101998)


### **\*update – Access the GitHub repo of [MonoGame.Portable here](https://github.com/DDReaper/MonoGame/tree/develop.portable "MonoGame.Portable on GitHub")**

* * *


# Breaking the mold

Right, I am taking a little break from MonoGame for a little while now and returning to SunBurn.  Why you may ask, to which the obvious answer should be:


### “There is something VERY interesting to see over there”

Will report back later and show you just how electrifying SunBurn can be (Sheesh that sounds like a bad episode of MisFits ![Confused smile](/assets/img/wordpress/2013/02/wlEmoticon-confusedsmile.png))

P.S. I am knackered after spending a week Portablising MonoGame, lol

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/?p=2084) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/?p=2084)<script type="text/javascript">// <![CDATA[
var dzone_url = 'http://darkgenesis.zenithmoon.com/?p=2084';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_title = 'MonoGame goes Portable';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_blurb = 'MonoGame goes Portable';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_style = '2';
// ]]></script>  
<script type="text/javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js" language="javascript"></script><script type="text/javascript">// <![CDATA[
var addthis_pub="runxc1";
// ]]></script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)  <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>[CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591)
