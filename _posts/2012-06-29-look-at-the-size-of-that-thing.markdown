---
layout: post
title: Look at the size of that thing
date: '2012-06-29 22:24:28'
tags:
- real-world-experiences
- tutorials-resources
- windows-phone
- xna
---

![](http://www.brickartist.com/gallery/deathstar1.jpg)

“Cut the chatter Red 2” ![Hot smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/2063.wlEmoticon_2D00_hotsmile_5F00_0EC504A6.png)(What can I say, I am a fan)

Of one of the things (other than the job to get past the marketplace submission process) that troubles most WP7 developers is the size of their eventual project, invariably it is always large (if you have more than basic pages and text)

The usual culprits are:

> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Images and backgrounds   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Audio   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Sprites (for games)   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Model files   
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Text content (usually only applicable for games or apps that work standalone)

Most of the reasons for this are really down to our own professionalism or vanity to our project, we want it to look good or it is a multiplatform project so you want to use centralised assets.

So what can we do to make this better and get down the size of our projects, here is a few tips:

(and if you are wondering why this should bother you, then please step away from the keyboard ![Winking smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/5126.wlEmoticon_2D00_winkingsmile_5F00_2271EE3A.png))

* * *

# Audio

![](http://us.123rf.com/400wm/400/400/PIKSEL/piksel0607/piksel060700166/469074.jpg)

Sound and Music is by far the area that causes projects to bloat in size.  Unless you have invested in some kind of audio generator (like SFXR) or are using procedural audio, then initially you will have an issue.

But in comparison, audio is one of the easiest things to scale down and still keep the level of quality you desire and this simply comes down to reducing the sample rate that the audio has been recorded with and stripping it down to mono instead of stereo. 

Thing to remember is that this is a mobile platform, the speakers are good but not that great, unless you are only playing the game through headphones you cannot hear much of a difference through the phones speakers (certainly not proper stereo) and even through headphones it is not much of an issue.  As we do not have proper Stereo audio from a programming perspective you aren’t going to miss these things (unless you are shipping full MP3’s and loading them into the Media library to play them, which just is not a good idea!)

Now the best tool to do this with is [Audacity](http://audacity.sourceforge.net/), which is also FREE.

![](http://audacity.sourceforge.net/about/images/audacity-linux-small.jpg)

The interface is pretty basic but works very well, first thing you should notice when you open a sound file is the audio properties next to the graph on the left:

[![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7455.image_5F00_thumb_5F00_5324F5E5.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/1581.image_5F00_2D2F458F.png)

Here you can see it is stereo and using a sample rate of 44khz, having this level of quality in an audio file does make it fairly large. 

Now to combat this we will just drop those two very simply.  Starting with a 4MB mp3 file converted to WAV, we have a 35Mb file

> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    First, open up the Tracks option in the Menu and select “Stereo Track to Mono”.  This will merge the stereo channels into one we get an instant 50% saving on the file size (no surprise really as we have gone from two tracks to one)
> 
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)   Next you want to resample the file to a lower bit rate, using the same Tracks menu option, select the “Resample” selecting 11khz as the option (play with this a bit and test after the resample to make sure it still sounds fine to you through headphones, most sound work fine at 11khz but some sound awful, in that case hit Ctrl-Z, listen again and resample at the next rate up).  This cuts the file down about another 75%.

So with just a few tweaks we have this:

| MP3 | WAV | Mono | 11khz |
| 4.76Mb | 34.8Mb | 17.5Mb | 4.36Mb |

Now usually you would try to be a bit more sensible with your starting audio to keep the numbers down but as you can see there can be quite a considerable saving just following these tricks.

* * *

# Large Images and backgrounds

![](http://www.learningwonders.com/cart/images/T/meadow04.jpg)

Now unless you are doing sneaky tricks like having a single pixel colour expanded to fill the screen or colouring a canvas, you will likely have a fairly large image to fit your application / game.

Like audio there are a few simple tweaks we can use to get the original file size down, however the eye is a bit more keep than the ear (in most people) so we need to tread a little more carefully.  One thing we have in our favour though is the hardware in the phone itself, the hardware scalar is very good and almost free to use, so we need to keep that in mind.

So like audio it comes down to two main things, the size of the image and the format used to store it in.

> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    Size, this take a bit of care and practice to get right, using any simple Paint tool ([paint.net](www.getpaint.net/) being my favourite) you can resize your images down.  Keep in mind that the screen size for WP7 phones is 800×480 Landscape or 480×800 for portrait, using sizes 1/2 of this is usually the best breaking point as it makes it easier for the hardware to scale up. (you may hear the phrase “Power of 2” used a lot in graphics), so resizing to 400×240 or 240×400 is a good start.  Try lower resolutions as well to find the good mean point for you project, different objects will work better at different resolutions so just find a point you are happy with (not every image needs to be 1024×1024 quality).
> 
> A note to remember is that the docs state the maximum image size presentable on the device is 2048×2048.  This refers to the TOTAL image output to the screen, not a physical texture file limit.  In practice, you should not be pumping more that 1024z1024 worth of textures to the screen or you are going to hit performance issues.  Smaller is better and scale UP not down.
> 
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    DXT texture format (or DDS texture format – [Shawn Hargreaves](http://blogs.msdn.com/b/shawnhar/) wrote a brilliant article on texture formats for the XBOX (ruffles through links but cannot find it right now, have a look on [his blog](http://blogs.msdn.com/b/shawnhar/)).  The same rules apply to the WP7, one keen note which I’m sure is scribbled in the docs somewhere is that the phone natively works with DXT compression to the screen, which means that the phone does not need to do any extra processing to send the image to the screen if it is DXT compressed (Time = processing power = poor performance).  So if all your images are PNG’s or JPG’s then the phone has to decompress the image before sending it to be displayed, for DXT it just send it to the display, sweet.
> 
> Now here is where the fun begins, getting things into a DXT format is a bit of a black art (what sites do not usually tell you if you google it, is that a DXT format texture is actually a DDS (Direct Draw Surface) file format, so searching for a DXT compressor gets you some odd links.
> 
> Best tool I have come across (unless you want to use the TextConv tool that comes with the DirectX tools, which crashes on 64bit BTW) is a tool called “[The Compressonator](http://developer.amd.com/gpu/compressonator/pages/default)”, it is easy to use, only a few clicks to convert your images and it is also FREE (made by AMD of all people)
> 
> [![image](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/7851.image_5F00_thumb_5F00_704A9DEF.png "image")](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/4705.image_5F00_44E67CF5.png)
> 
> Open up your image file, select the compression method in the combo box in the top right (the default ATI one has always worked best for me) and just hit CONVERT.  From there you are given a list of formats to convert to (shown above).
> 
> Depending on your image type (again trial and error) DXT 1 or failing that DX 5 work best (do not use DXT 3, does not work well for WP7 projects)
> 
> Now most times you will see a 50%-80% reduction in file size (good for the project size) but you will also save in loading time, not only is the file smaller (usually but not always, ???) but the phone does not need to do anything with the image to send it onto the screen, win all round really.
> 
> I will note there is a batch process built into “The Compressonator” however, I usually like to see what happens with each file as I compress it for the best quality.  If you have a lot of files done the same way it may save you some time.

As with audio, it really is a matter of trial and error to see what works for you and your project!

P.S – as a little GOTCHA, make sure you resize and then compress and NOT the other way round or it can have a completely different affect on your images.  Not always but more often than not.

* * *

# Sprites

![](http://t0.gstatic.com/images?q=tbn:x5AJMpDSXecClM:)

Now you make say “Sprites are just images, what you going on about”, in which case you are right, with one exception.  Most single images or backgrounds are fairly large and you only want one or two of them on the screen, or they are simply a fixed image with no animation.

Sprites though are usually the same images repeated with subtle differences to give the appearance of animation when played to the screen or have many copies of the same animation track at different resolutions or for mip mapping.

Thing to remember here is that IO (the act of getting files from the disk or memory of the device) is always going to be slow (or at least slower than working in memory) so we must do what we can for quick wins and reduce this as much as we can.  We can do this by lumping individual images together into a single texture or image.

All you need to make sure you have is a way to interpret that single image in your project.  For XNA [Nick Gravelyn](http://nickgravelyn.com/) created a free [Sprite Sheet packing](http://spritesheetpacker.codeplex.com/) tool to do the tedious work for you of compiling images into a single texture (also creating a configuration file to read the texture) plus an XNA content importer.

Granted that is for XNA, but you can use this as a base for Silverlight as well if you so wish.  it is slightly more important in XNA to do this but both platforms can make a benefit from it.

I keep in mind the phase that is bounded around a lot with WP7 development (or even XNA for that matter), Look at performance issues only when you have a performance issue.  So if you project is loading sprites and images without any noticeable impact, then leave it alone!!.  If your project is 50mb bigger than it should be or is taking a long time to load and you have determined it is because of loading all these damn images, then start looking to fix it.

* * *

# Model Files

![](http://hce.halomaps.org/images/files/lg/pic-1.jpg)

Now in XNA if you are doing 3D (so this does not apply to Silverlight, YET.  Roll on Silverlight 5) you are likely to be using models for all your 3D objects.

In most cases the Model and the texture are in separate files, so you can use the above tricks for textures to keep sizes down (bear in mind if you resize the texture down, you should not need to adjust your texture coordinates but check and take care, some models act funny when you do this).

If the model has procedurally generated materials or textures, then there is not much you can do unless you have the source model and the package to edit it (just change the export options to separate texture from model).  having the texture as part of the model may look cleaner but it will be considerably larger in size

* * *

# Compression

![](http://www.thestoragealchemist.com/wp-content/uploads/2010/02/compress.lowres.jpeg)

Now as with anything else you can throw at your projects such as XML configuration files, Model files (which are usually just text), text files and such you make think it easy to just add a little compression to these to get their size down.

Now it is possible and there are several C# based compression tools out there which are usually open source, however keep in mind:

> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    De-Compression takes time. check that the whole process of reading the file and unpacking it is not greater than just reading the file normally
> 
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    If you compress models or XML files, then you are going to have to write your own importers to the project for them, features like the XNA Content Manager do not work in run time, only at build time and it does a level of compression itself anyway
> 
> ![](http://www.dotnetscraps.com/samples/bullets/009.gif)    XAP packages are essentially just ZIP files, so they are compressed already for delivery (just rename one to .ZIP and open it if you don’t believe), so adding your own compression wo not reduce the package size, only the impact on the phone when it is installed. (and since there are NO quota’s you might as why bother)

SO the upshot is, although compression may seem like a good idea for WP7 projects, do not forget the teams building all this also had this in mind so they have optimised and compressed what they can already, in short do not bother (unless like me you like to tinker to see what you can get extra out of anything!)

* * *

# XNA Content Manager Projects

![](http://static.flickr.com/98/215075573_aee11db610_o_d.jpg)

If you are planning for or are wanting to create multi-platform projects, especially between the XBOX and WP7, here is a little tip to keep you on the straight and narrow.

You might be tempted to use the same Content project for each version.  in fact when you copy a Windows or XBOX project to a WP7 project using the “Copy as …” feature, it does not create another Content project it only copies all the code projects you have in your solution to the new version.

Now this is fine if all your assets are small or are already compressed, but more often than not, all your assets are scaled for your original target platform.  You might be temped then to use the tips above to create some new mobile assets and add them to the same project and alter your code to pick up the new assets with a load of #IF statements.

## <u>STOP WHAT YOU ARE DOING AND WALK AWAY</u>

The above is a really bad idea, because not only will EVERY asset be compiled in your delivery for both platforms, you have just hardwired all your assets to be platform specific and prone to error, there is a better way.

When you have copied your project to a new platform that has different scaling requirements, either if it is for the Phone or for a Reach profile (you might want to do a HiDef and a Reach version of your game for a wider audience), then you need to close your project and drop into the file manager.

At this point all your assets have unique names and are referred to uniquely in your code, remember that.

Now open file managed and browse to the content project folder for your solution, see the “.contentproj” file, now just copy and rename it for the new platform, e.g. copy “ProjectA.contentproj” to “ProjectA-Phone.contentproj”.  Now you should have two content project files in your content folder.

Start up your dev environment again and load up your solution, then right click at the top level and select “Add Existing”, then selecting the new copy of the Content Project.  That gets the new content project into your solution, which they both look identical.  Then the last bit, in your new platform project, remove the existing “Content Reference” and add a new reference to your new Content Project.

Sounds simple.

At this point both solutions are still using the same content files but from different content projects.

if you now go and resize and compress your assets, copying them to files of the same name in the existing content structure (so having background.png and Background\_Phone.png, or whatever) in the folder structure.

Now for the magic, in your new Platform Content project, remove (BUT NOT DELETE) an existing asset and add back in the new platform asset BUT give it the same asset name.  So the asset called “Background” which was using the file “Background.png”, now becomes the new “Background” asset (with the same name) but now points to the “Background\_Phone.png” file.

No code changes required, as in code all we do is call the asset name and the content manager picks it up for you.  You also have exactly the same content structure as well and if a file does not need altering, leave it alone so both platform use the same file.

If only the “Copy Project” feature did this for you (which I think it did at one point in time, but I cannot remember if it was a blank or copy content project)

If only everything in life was that simple.

* * *

# Conclusion

![](http://fc07.deviantart.net/fs18/i/2007/151/6/f/Wedge_Antilles_by_Saria_Alkiniria.jpg)

Well hopefully you are a little more informed about packaging for WP7 or at the very least found some new tools to make your life easier.

i know I had a few gripes and a lot of fun burning the midnight oil to work through a lot of problems related to performance and size of the project I was working on so it is only fair that i share!

Now if you will excuse me, i got work to do ![Winking smile](http://xna-uk.net/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/5126.wlEmoticon_2D00_winkingsmile_5F00_2271EE3A.png)

P.S

Wedge was a whimp!!, he bugged out on the first run and hid in front of the falcon on the second.  it was not until he got his own squadron that he eventually grew a pair.

Technorati Tags: [xna](http://technorati.com/tags/xna),[wp7dev](http://technorati.com/tags/wp7dev),[wp7](http://technorati.com/tags/wp7),[windows phone development](http://technorati.com/tags/windows+phone+development),[tips and tricks](http://technorati.com/tags/tips+and+tricks)
