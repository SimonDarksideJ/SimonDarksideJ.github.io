---
layout: post
title: Converting DirectX .X files for use in games
date: 2012-11-01 16:24:31
tags: [xna, 3d]
---

While putting together the [UnityXNA](https://github.com/mvi/UnityXNA) article I cast aside all warnings and threw caution to the wind and spent a bit of time trying to get my 3D starter XNA sample in to the framework, it should come as no surprise from the tenant of that article that I failed, granted I only spent about an hour or so on it but I realised quickly why it was only 2D so far.

That being said I find myself looking at the [UnityXNA](https://github.com/mvi/UnityXNA) source and Unity’s API daring myself to go back and fix it, I may if I have time ![Open-mouthed smile](/assets/img/wordpress/2012/11/wlEmoticon-openmouthedsmile.png).

Now one of the biggest barriers I hit was that some of my assets were in Microsoft’s DirectX X .X format, there are no problem for XNA but Unity does not like these, not one bit.

* * *


# What formats DOES Unity support

![src=]()

Amazingly Unity has an astounding amount of support for 3D model formats, including:

[![image](/assets/img/wordpress/2012/11/image2.png "image")](/assets/img/wordpress/2012/11/image3.png)

* * *


# Road to conversion

![src=]()

Now quite surprisingly converting models FROM .X is quite difficult, want a package to SAVE in .X format no problem, but Import!, that is a one way trip to the funny farm.

After a few hours of searching and installing tools I eventually came across a solution that not only worked, it was also FREE.

[![image](/assets/img/wordpress/2012/11/image.png "image")](http://files.seriouszone.com/download.php?fileid=198)

[LithUnwrap](http://files.seriouszone.com/download.php?fileid=198) is primarily a tool for mapping and editing the UV coordinates of low poly models, but it can also read and write models from one format to another.

It supports Importing & exporting LWO, OBJ, DXF, 3DS, ASC, COB, and **X files**.

So after launching up [LithUnwrap](http://files.seriouszone.com/download.php?fileid=198)you can open up a model file:

[![image](/assets/img/wordpress/2012/11/image.png "image")](/assets/img/wordpress/2012/11/image1.png)

Once loaded we can simply then save the model to which ever format we want to use, I’ve no particular preference but I generally use OBJ files as they are more commonly supported by other tools, but if you are using Unity and have access to 3D Studio Max (or have a modeler who does) then you can just export to .3DS which Unity also supports:

[![image](/assets/img/wordpress/2012/11/image1.png "image")](/assets/img/wordpress/2012/11/image2.png)

Just be sure to use the “Model –\> Save” options, the export options are for other things.

> \*Note
> 
> I could not confirm (just because I did not have any assets to test with) if LithUnwrap will also convert / save all the features of a model such as Animations, Bones.  It does support Meshes and Textures (including the ability to UnWrap / change the UV mapping of a model) but you should check if you have Animations or Bones in your model if they are also exported.  Granted if you have no other option you might just have to live with it and re-create them in your tool of choice

* * *


# What did not work?

![src=]()

In my journey i followed many posts and hints of ways i could convert .X files, here why most of them did not work:

- [Milkshape](http://chumbalum.swissquake.ch/ms3d/index.html) – Was free to TRY and could read .X files. But does not allow saving in the trial.  Granted it was not much and you may want to buy Milkshape if you wish

- [TrueSpace3D](http://en.wikipedia.org/wiki/TrueSpace) – Truespace was made free several years back after Microsoft bought them, can be tricky to find but its a great Free 3D tool.  However it cannot import .X files no matter what people say! ([\<Download Link\>](http://download.cnet.com/TrueSpace/3000-6677_4-10187286.html))

- Online / downloadable model converters – looked at several but ALL require purchase, anything from $100 to $$$$, seems it is a very hot market.

- [3DS Max / Maya](http://usa.autodesk.com/) – I found hints that these big boy tools may be able to read .X files but could not confirm (plus Autodesk’s site was not working when I tried to check)

- [ModDb.com](http://www.moddb.com/) had some great tools (like xconv) but they generally only convert into 1 format or another, usually for specific Game engines like Modern Warfare

- [Blender](http://www.blender.org/) is a great and FREE 3D modelling tool, however it can only Export .X files.  I think it did Import .X files at one point but such things have been lost to the past (I went back as far as version 2.49b but no luck)

- Do it yourself – found a nice article on how you could write your own converter / importer for the .X format, but I’m just not going there right now – [http://www.opengl.org/discussion\_boards/showthread.php/166733-Convert-from-X-or-OBJ-to-openGL-in-C](http://www.opengl.org/discussion_boards/showthread.php/166733-Convert-from-X-or-OBJ-to-openGL-in-C)

* * *


# Back on Story

Right I’m going back to my futures series, next up is the [SunBurn engine](http://www.synapsegaming.com/products/sunburn/engine/) which has raised a fair few eyebrows of late with announcements such as this:

[http://www.synapsegaming.com/blogs/johnk/archive/2012/10/23/announcing-sunburn-2-1-platform-independent-game-engine](http://www.synapsegaming.com/blogs/johnk/archive/2012/10/23/announcing-sunburn-2-1-platform-independent-game-engine)

Later

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/?p=1403) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/?p=1403)<script type="text/javascript">// <![CDATA[
var dzone_url = 'http://darkgenesis.zenithmoon.com/?p=1403';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_title = 'Converting DirectX .X files for use in games';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_blurb = 'Converting DirectX .X files for use in games';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_style = '2';
// ]]></script>  
<script type="text/javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js" language="javascript"></script><script type="text/javascript">// <![CDATA[
var addthis_pub="runxc1";
// ]]></script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20) <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>[CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591)
