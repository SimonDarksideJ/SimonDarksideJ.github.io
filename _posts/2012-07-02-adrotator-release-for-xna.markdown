---
layout: post
title: AdRotator release for XNA
date: 2012-07-02 13:23:14
tags: [monetisation, xna, adrotator]
---

For once I’m going with a simple yet boring title for this blog post (since I’m known for naming things in a weird and wacky way ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile11.png)) simply because the content will speak for itself


### <font color="#ff0000">A Note – This control is designed for XNA on Windows Phone and will later be released for Desktop, Web ADS are NOT available on XBOX as there is no Internet connectivity.  </font>


### <font color="#ff0000">We may release a future version that allows multiple House Ads later on for XBOX.</font>


### 

If you followed my previous article on [AdRotator](http://wp7adrotator.codeplex.com/) you should know I got involved with the team and added some features / new providers, that project has now been updated to V1.  The tutorial has been updated to reflect some of the changes to improve the overall solution so if you need Ads for Silverlight or SilverXNA [I would suggest you start there](http://bit.ly/zO63xH).

But now back to the main show

With Silverlight done I decided to tackle XNA which historically has had very bad support for Ads, only a few providers specifically support it, with AdRotator for XNA i’ve spun some magic and we currently have 4 Providers supported for now (hope to add more in the future):

> #### ![](assets/img/posts/image-not-found.png)    Microsoft Pubcenter (XNA component from Microsoft)
> 
> #### ![](assets/img/posts/image-not-found.png)    AdDuplex (XNA library from AdDuplex)
> 
> #### ![](assets/img/posts/image-not-found.png)    Inneractive (Via web Ads)
> 
> #### ![](assets/img/posts/image-not-found.png)    MobFox (Via their web API)

All of the above provided their own challenges and quirks and challenges but I got there in the end.

Also some of the improvements I made during the development of the XNA version have also made their way back into the Silverlight project, such as:

> #### ![](assets/img/posts/image-not-found.png)   <u>Default Ad Support</u> 
> 
> You can now create your own Ad to run locally in your app/game, especially good if there is no network connectivity and you want to still display something (older versions just disabled the Ads)
> 
> #### ![](assets/img/posts/image-not-found.png)    <u>ADID and PublisherID configuration now possible through the configuration XML</u>
> 
> This loosens the shackles from configuring providers so that they are no longer hard coded in your app/game, also with the XML hosting option you could reconfigure your AD and Provider ID’s on the fly as you wish without having to re-deploy your apps.

 

As usual the full source for the starter 2D and 3D projects is on the [codeplex project site here](http://starterxna.codeplex.com/) showing the integrations above.

So what is involved

* * *


# Project preparation

First off lets copy in the required DLL’s and references to your project, using the Starter XNA Projects as reference I created a new folder in the Solution called “ExternalLibraries” in windows explorer so that my folder structure now looks as follows:

[![image](/assets/img/wordpress/2012/07/image127.png "image")](/assets/img/wordpress/2012/07/image124.png)

Then I copied the release files for XNA into the new folder, AdRotatorXNA.DLL and AdDuplex.Xna.dll.  (We do not ship the MS Pubcenter DLL’s as they are part of the WP7 development tools but more on that later), you will notice there are no libraries for Inneractive and MobFox ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile11.png), but that is another blog post.

Next as usual add references to the new DLL’s in your Main XNA project and also add a reference to “Microsoft.Advertising.Mobile.Xna” library as shown below: (note you only have to add references to the Publisher libraries you intend to use, but if you try to use one you have not reference your project will crash!!)

[![image](/assets/img/wordpress/2012/07/image128.png "image")](/assets/img/wordpress/2012/07/image125.png)

* * *


# The new Configuration file

One of the improvements added with the XNA version was the capability to completely configure the Ad Support for your project from the XML configuration file so there is no longer any need to specify the provider Ad ID’s hard coded in your project.  You still can of course if that is how you roll, everything’s optional ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile11.png).

The new XML file looks like this:

[![image](/assets/img/wordpress/2012/07/image129.png "image")](/assets/img/wordpress/2012/07/image126.png)

Not too much different just additional settings by Ad provider to identify the channels to use, this obviously can be greatly simplified to just the “Default” culture settings, the rest are just local overrides if you want to use different providers in different orders by culture (especially useful if certain markets are not supported or well filled in certain markets)

The additional settings are:

| 

> AppID

 | 

> The APP or AD ID provided to you by the publisher

 |
| 

> SecondaryID

 | 

> For Smaato this is the Publisher ID and for MS Pubcenter this is your AddUnitID

 |

One by product of this change is that you could even use different AdID’s depending on market but that is completely up to you.

As a side note one of the improvements coming in the V2 of the Silverlight version is to be able to support multiple occurrences of AdProviders in the same culture, this would enable you to have different Ad content settings delivered to your App (the most obvious of which would be to setup multiple accounts on MS Pubcenter with different categories and you can raise/lower the probabilities of serving ads depending on which is paying better ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile11.png))

As stated previously these changes are option and are FULLY BACKWARDS COMPATIBLE, so you do not need to update all your app’s using AdRotator from a central XML file at once, all previous editions will still work and in fact the hard Coded values in fact override any setting you configure, just something to be aware of.

So configure or just copy in a configuration file into your project BUT make sure that you set it is Build action to **Content** and set the “Copy option” to “Copy if newer” as shown below:

[![image](/assets/img/wordpress/2012/07/image130.png "image")](/assets/img/wordpress/2012/07/image127.png)

You should find a blank xml configuration file in the file you downloaded from Codeplex or in the example project if you are looking at the source.

* * *


# Turning on the Ad’s

Now comes the really tricky part which will obviously contain lots of hacky code and troublesome links to get this thing working, right?

Nope ![Smile with tongue out](/assets/img/wordpress/2012/07/wlEmoticon-smilewithtongueout.png)

Here is what I did to implement the XNA [AdRotator](http://wp7adrotator.codeplex.com/) in the Starter projects, first off in the Game Class (the class in your project that inherits from the XNA Game class, there can be only one – highlander ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile11.png)) and locate the Initialize method, then add the following:

    
    
        
        
            
            
                
                
                    
                    
                        
                        
                            
                            
                                
                                
                                    
                                    
                                        ).
                                        
                                        So as part of the course of the XNA project we introduced our very own Default House Ads, which operate exactly the same as other ad providers with the added option that they can be displayed (if enabled) even when there is no network connectivity.  in the future we also hope to enable you to update your own Ad(s) remotely.
                                        
                                        
                                        
                                        To enable this you need just a few things, first off an Ad ![Smile with tongue out](/assets/img/wordpress/2012/07/wlEmoticon-smilewithtongueout.png), so for XNA drop a texture image in to your content project and load it into AdRotator as follows:
                                        
                                        
                                        
                                        [![image](/assets/img/wordpress/2012/07/image131.png "image")](/assets/img/wordpress/2012/07/image128.png)
                                        
                                        
                                        
                                        Then add a line in-between the AdRotator initialise and Component Lines in your game’s initialize function as follows:
                                        
                                        
                                        
                                        
                                            
                                            
                                                , just remember to have all your tombstoning in place if you go browsing outside your app / game!
                                                
                                                The Default Ad Functionality is also included in the Silverlight V1 release, see the previous updated tutorial for more info.
                                                
                                                
                                                * * *
                                                
                                                # Orientation Changed
                                                
                                                
                                                One thing we acutely realised with the XNA version is that we needed to handle orientation manually, so together with the AdPosition property we added a method to automatically update the position of the control based on the orientation of the device.  At present the AdRotator control does it is best to position the Ads in the centre of the area of the screen where you placed the ad.
                                                
                                                
                                                
                                                
                                                | ![](assets/img/posts/image-not-found.png) | [![image](/assets/img/wordpress/2012/07/image132.png "image")](/assets/img/wordpress/2012/07/image129.png) |
                                                | 
                                                
                                                Portrait
                                                
                                                 | 
                                                
                                                Landscape Left / Right
                                                
                                                 |
                                                
                                                
                                                
                                                
                                                To enable this feature just factor it into your code that handles the GraphicsDevice Orientation Changed event thus:
                                                
                                                
                                                
                                                
                                                    
                                                    
                                                        
                                                        
                                                        Now were releasing this as V0.1 Beta to get feedback from it is use, in all our tests we have not had any issues but obviously feedback would be appreciated.  I plan to do further tests using the SunBurn gaming engine in the near future as well so I will see how it goes, it might even end up as a SunBurn plugin for Windows and Phone (if John K will let me ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile11.png))
                                                        
                                                        
                                                        
                                                        Also look for the releases ending up on NuGet soon.
                                                        
                                                        
                                                        
                                                        Any questions or feedback either pop them here or as a new Discussion/Feedback item on the codeplex project.
                                                        
                                                        
                                                        
                                                        As usual the full source for the starter 2D and 3D projects is on the [codeplex project site here](http://starterxna.codeplex.com/) showing the integrations above.
                                                        
                                                        
                                                        
                                                        Hope you have fun getting Ads in your projects and leveraging this whole other Revenue scheme
                                                        
                                                    
                                                    
                                                
                                                
                                                
                                            
                                            
                                        
                                        
                                        
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

