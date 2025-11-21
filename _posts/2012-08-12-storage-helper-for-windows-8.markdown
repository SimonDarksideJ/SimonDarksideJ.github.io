---
layout: post
title: Storage Helper for Windows 8
date: '2012-08-12 09:13:14'
tags: [windows 8]
---

 **\*Note updated after a few bugfixes from use, mainly added some additional features and changed to allow for multiple folders to be used**

One of the biggest helpers back in the good old land of Windows Phone was a little helper class to help with the messy work of saving game data and loading it back again, you always ended up writing several bits of code for each thing you wanted to save and it took a bit of effort.

Then along came the “Isolated Storage Helper” (apologies, could not find the original source for it), a nifty little class that through the power of generics worked for just about any type of class and did all the grunt work for you, it looked like this:

<p>So my journey started with a great run down of the Windows 8 storage system by <a href=](http://1.2.3.12/bmi/1.bp.blogspot.com/-aZZeTZc0msk/Tuw7XfEp6sI/AAAAAAAAJR4/5XXNOgbmk2U/s170/jerry_smile.png)Jerry Nixon, he deftly walks through the options and how to correctly access storage, however it is only the beginning, to make the transition we are going to need more.


### MSDN Library


Next I wandered through the MSDN Library which at present is still a bit of a mess in places, especially where .NET 4.5 meets WinRT.  XML serialisation is one of those places, the documentation is confusing at best, does not include any async references and a lot of the sample code does not even work.  That being said it is still pre-release code so there is time for it to be tidied up.

![](assets/img/posts/image-not-found.png)

Finally after a bit of a headslap moment and a trawl through the [MSDN WinRT code samples](http://bit.ly/QSTuqR) I literally stumbled on the final piece of the puzzle.  If you start a new project using one of the templates or add a constructed WinRT (not saying Metro ![Open-mouthed smile](/assets/img/wordpress/2012/08/wlEmoticon-openmouthedsmile.png)) project item like the Group or Item pages, then you will also inherit a lot of boiler plate code in your project in a new “Common” folder.  One of these is the SuspensionManager, this handy little class does the work of storing application state variables (in Windows Phone this was handled by the framework).


# The End result

So finally I came up with the class below:
            
http://codepaste.net/wrmtgo


## \*Note


**This article is based on the RC codebase, I’ll check and update it for the RTM when it is available**


# Final Thoughts

Well I’m back to the dev process, I am currently upgrading my WP7 project “Flipped” to Windows 8.  I have managed to re-use 90% of my backend game logic with just a few corrections (due to some UI converged bits I was either too lazy to avoid or just could not think of an elegant solution around) plus loosing the Telerik stack for the first release is a pain.

I have managed to write this whole article on Windows Live Writer 2012 and it is the same smooth process on Windows 8, granted had to search for my plugins again but they did all work.  I do hope WLW is not deprecated it is by far the most useful app in the Essentials package, next to Movie maker ![Open-mouthed smile](/assets/img/wordpress/2012/08/wlEmoticon-openmouthedsmile.png).

As a side note be sure to check out the [WinRT XAML Toolkit](http://bit.ly/QSWtiY) it is chock full of controls, extensions and helpers, almost everything you will need in your WinRT projects.

Also for an alternative to this solution there is also the “[metrostoragehelper](http://metrostoragehelper.codeplex.com/)” on codeplex by Jamie Thomson, it is certainly another way to do it ![Open-mouthed smile](/assets/img/wordpress/2012/08/wlEmoticon-openmouthedsmile.png).
