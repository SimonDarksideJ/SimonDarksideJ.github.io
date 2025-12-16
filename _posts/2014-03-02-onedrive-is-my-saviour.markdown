---
layout: post
title: OneDrive is my saviour
date: 2014-03-02 13:21:00
tags: [information]
---

![width=](assets/img/posts/image-not-found.png)

Anyone following my twitter feed would have seen a panicked tweet i sent out recently.  I have been working on a book for a while now and I had just finished another chapter, while readying to send the new chapter to the publisher with all the images I managed to delete the chapter document itself! losing over two weeks of full time effort of work.

Needless to say I was a bit distraught, especially with deadlines looming.


# But you backup do not you?

[ ![ /></a></p>
<p>(image courtesy of the critique circle who have another <a href=](assets/img/posts/image-not-found.png)fantastic post](http://www.critiquecircle.com/blog.asp?blogID=21) on backing up your writing)

Yes, I backup my work regularly, in fact I also use OneDrive (previously known as SkyDrive) as my working folder so that all my work is sent up to the cloud the minute I click save as well as on my local storage.  I also zip up the contents to a separate drive on a weekly basis, so you would think I would be safe.

Sadly, when I managed to delete the work, it also then synchronised this delete to OneDrive as well immediately (a bit of a gap in the OneDrive solution?), to my horror my local backup was also corrupt, it had not zipped correctly or something happened with the drive.

What proceeded was blind panic and frantic searching for tmp files, recovery files, any trace or fragment of my hard work.


# What has OneDrive ever done for us?

![width=](assets/img/posts/image-not-found.png)

OneDrive has lots of impressive features including Version history (which is also deleted when a file is deleted ![Steaming mad](/assets/img/wordpress/2014/03/wlEmoticon-steamingmad.png)) and a 99.99% uptime policy to ensure you files are always online.  It also includes a free app for just about every platform now which will synchronise all your files online.  If you are also using the later versions of office it will also work directly on OneDrive and synchronise locally to ensure you work is safe (provided you are online).

But none of this saves you if files are accidentally deleted from local storage!!


# The miracle of the online RECYCLE BIN

What eventually saved me from not only a huge effort of recreating all my work but also (probably) my sanity was the online recycle bin that comes with OneDrive.

This is one feature of OneDrive that is not really shouted about or even mentioned but thankfully (especially for me) it does.

Finding the Recycle Bin is really easy, it is just located in the bottom left of your online storage account.

[![image](/assets/img/wordpress/2014/03/image.png "image")](/assets/img/wordpress/2014/03/image.png)

In here you will find a normal recycle bin view with the options to empty it or restore all / individual items:

[![image](/assets/img/wordpress/2014/03/image1.png "image")](/assets/img/wordpress/2014/03/image1.png)

And here is where my glorious work was saved, ready to be reborn and VERY quickly mailed to my publisher !!

If you do manage to delete an item accidentally in the online view, you go get a “Hail Mary” Undo option, however such a feature is not available locally and items are deleted automatically.  Which just means you need to go online to your recycle bin to save your bacon.

[![image](/assets/img/wordpress/2014/03/image2.png "image")](/assets/img/wordpress/2014/03/image2.png)


# The missing pieces

My only gripe in this whole affair is that the OneDrive app just does this without confirmation at all, granted you can configure the client now to only synchronise selected folders but I should also be able to set the synchronisation status for any folder to just Contribute instead of just Full sync, the SyncToy app i also use for non-regular backups has this feature, ensuring that I keep everything on the remote storage.


# A wholehearted thank you to the OneDrive team!

![width=](assets/img/posts/image-not-found.png)

So thank you OneDrive team, a fantastic service that offers so much for so little and if used right can even save your bacon!!


# A final note for coding / Unity developers

OneDrive and its synchronisation is a great tool but it is not really for code ESPECIALLY if you access your code from more than one machine.

Use Git (or another) source control system and either use public servers like GitHub (GitHub also supports private repos for a fee) or private repos like BitBucket.

With Unity be sure to also follow these steps, to configure both Unity and Git effectively (I know I do)

1. Create your project
2. Enable “Meta files” Mode (Edit \> Project Settings \> Editor)
3. Initiate git with  git init (run command from the top level of your Unity3d project folder)
4. Create .gitignore file (also top level of your Unity3d project folder)
5. Configure your .gitignore acording to the post below – GitHub also has a Unity .gitignore template for new projects.


##### [http://blog.i-evaluation.com/2013/09/12/unity3d-with-git-gitignore-for-bitbucket-and-github/](http://blog.i-evaluation.com/2013/09/12/unity3d-with-git-gitignore-for-bitbucket-and-github/ "http://blog.i-evaluation.com/2013/09/12/unity3d-with-git-gitignore-for-bitbucket-and-github/")

    \*grammar updates thanks to an anonymous "reader"

