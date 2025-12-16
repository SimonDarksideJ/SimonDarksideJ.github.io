---
layout: post
title: MonoGame Modularisation
date: 2014-05-15 09:27:54
tags: [monogame]
---

[![image](/assets/img/wordpress/2014/05/image1.png "image")](/assets/img/wordpress/2014/05/image1.png)

Times are changing and now that the latest milestone release of MonoGame (V3.2) is out there has been a lot of taking stock actions on the GitHub Site.

Old PR’s and issues are being validated and closed, a clearing house of sorts to separate the wheat from the chaff as it were.

 


##### If you have old issues that are no longer relevant on the GitHub site, please close them so the team knows what to focus on and fix.  Help with the clean-up

The first part of this new world order is a first stab at adding modularisation to the MonoGame framework in much the same way that traditional XNA was separated into several DLL’s.

* * *


# What did XNA ever do for us?

As part of the delivery of XNA, each focal area had its own namespace and its own library.  This helped when you only wanted certain portions of the framework or wanted to replace parts of it with your own.  This is what XNA looked like in the end:

 

- Microsoft.Xna.Framework.dll
- Microsoft.Xna.Framework.Avatar.dll
- Microsoft.Xna.Framework.Game.dll
- Microsoft.Xna.Framework.GamerServices.dll
- Microsoft.Xna.Framework.Graphics.dll
- Microsoft.Xna.Framework.Input.Touch.dll
- Microsoft.Xna.Framework.Net.dll
- Microsoft.Xna.Framework.Storage.dll
- Microsoft.Xna.Framework.Video.dll
- Microsoft.Xna.Framework.Xact.dll

This design ensured that each component was totally responsible for its own area, each depending on the core Microsoft.XNA.Framework dll only. This allowed you to pick and choose which parts of the framework you wanted to use and more importantly, also allowed you to replace core parts of your project with alternate frameworks while still reusing the same base types from the XNA framework.

The Farseer physics library was a great example for this where it used the XNA base class and struct types in it is XNA/MonoGame implementation.

* * *


# And so it begins – Welcome MonoGame.Net

[![image](/assets/img/wordpress/2014/05/image2.png "image")](/assets/img/wordpress/2014/05/image2.png)

With the latest change [MonoGame](http://www.monogame.net/) too has started down this path of separating each component into their own respective libraries in answer to a lot of comments around this area. it is also good for the framework because things become easier to test the smaller they are and we can be sure that changes in one feature are not going to have unintended consequences in others.

 

> One thing to make clear is that the MonoGame team will only separate the framework into separate components where it makes sense to MonoGame.  It is highly unlikely we will see as much separation as XNA had, just that which benefits the long term goals of the MonoGame framework.

 

The first of these new modularisations is the **MonoGame.Framework.Net** library which encompasses the following namespaces:

- Microsoft.Xna.Framework.GamerServices
- Microsoft.Xna.Framework.Net

They are bundled together in one library because they are so intertwined and dependant on each other, with this separation also comes an additional benefit that MonoGame.Framework is no longer dependant on LidGren, only the new MonoGame.Framework.Net.

* * *


# What does this mean for MonoGame contributors?

If you currently contribute or are working on a PR for the repository, make sure you do a fresh pull in to your clean develop branch and test your improvements against the built version of that.

NOTHING has changed in the setup of the [MonoGame](http://www.monogame.net/) directories or files, just that some namespaces are part of a separate DLL, most remain as they were before.

 

Before submitting any new PR’s, I would recommend creating a new branch for your submission and copy over your changes, before pushing it and creating a PR.  Better to be safe.

If you are new and looking to contribute, be sure to check out my [Git Contributor article here](http://darkgenesis.zenithmoon.com/how-to-become-a-better-git/) – might update it soon to talk about working and publish branches.

 

* * *


# What does this mean for MonoGame users / adopters (post V3.2)

This first change should not impact your project at all unless you are using the networking or GamerServices features.  If you do then just add a manual reference to the new MonoGame.Framework.Net library.

 


#### If you are using the existing MonoGame v3.2 installer, then nothing will change until you update to a later release!

Future releases will still ship with LidGren and the new MonoGame.Framework.Net libraries but they will not be part of the default (new) project templates.  If you want them then just add a reference to each lib by browsing to the MonoGame installed assemblies directory, e.g.

> C:\Program Files (x86)\MonoGame\v3.0\Assemblies

 

* * *


# Updates and releases

There is no confirmed date as to when the next [MonoGame](http://www.monogame.net/) installer will be released but there is a general feeling in the team to move to a more regular update schedule (since everyone else loves continual delivery ![Confused smile](/assets/img/wordpress/2014/05/wlEmoticon-confusedsmile.png)) but keep your eyes on the [MonoGame main website](http://www.monogame.net/) for future updates.

As for NuGet, once things have settled I will get a new develop NuGet package out which will include these changes so you can test them out for yourself.

 

* * *


# A final call to arms

Now both in [MonoGame](http://www.monogame.net/) and its split off cousin [FNA](https://github.com/flibitijibibo/MonoGame) have taken this move to separate out the NET namespace from their frameworks, the main reason for this is that it allows some focus to break the dependency on LidGren itself.  There is nothing wrong with LidGren it is a good networking framework but some people do not like it or generally prefer to use something else, this is where you, the budding developer community, can come in.

 

There has been a request to separate out a XNA/MonoGame/FNA Networking library and set of corresponding components into its own deliverable and its own repository.  With the aim of creating a more generic networking framework for all XNA based games and with the ability to host behind it just about any pluggable networking framework.

 

> ##### Are you up to the challenge? Or fancy taking on this project? Then get involved and get talking, the entire XNA / MonoGame community is listening and waiting.

