---
layout: post
title: AdRotator for Windows Phone Silverlight
date: 2012-09-18 16:07:22
tags: [adrotator, windows phone]
---

[![Icon_1_purple](/assets/img/wordpress/2012/09/Icon_1_purple.png "Icon\_1\_purple")](/assets/img/wordpress/2012/09/Icon_1_purple.png)          ![ /></p>
<h1>AdRotator for Windows Phone Silverlight V1.2 release</h1>
<p>With the release of what is likely the last version in the V1 branch of AdRotator for Windows Phone Silverlight I have gone some lengths to make sure the documentation and samples are also feature complete.</p>
<p>For the XNA version read this article and then <a href=](assets/img/posts/image-not-found.png)continue on to here

If you have not seen AdRotator before, it is a control library that supports multiple Ad Providers (MS PubCenter, [AdDuplex](https://www.adduplex.com/), Smaato to name but a few) with the ability to change the configuration of your Ad configuration remotely without having to rebuild your app.  To date there are over 300 apps and games using AdRotator and it is reach is extending further each day.  To learn more about what is AdRotator then check out the codeplex project page here.

So this is the final “How-To” guide updated and refreshed for the 1.2 release end – to end

* * *


# Getting Started

First off, if you have not already get yourself some AdUnits from your favourite Ad Provider, or like most of us, get all the one’s that do it for you ![Open-mouthed smile](/assets/img/wordpress/2012/09/wlEmoticon-openmouthedsmile6.png) – [See this article for more info](http://darkgenesis.zenithmoon.com/would-you-like-ads-with-thatintro-to-adrotator-for-wp7/).

Next up download the latest release of [AdRotator](http://wp7adrotator.codeplex.com/) – [Link](http://bit.ly/S5uI7p)

Now for the important bit!, just add the control to your Silverlight project on the pages you want to use it and configure it is settings.  For best practice we recommend you do this in a separate User Control and reuse that where you want Ads, saves the hassle of maintaining it in multiple places, but this is completely up to you.

First copy the AdRotator DLL and the supported Ad Providers DLL’s to a folder in your project (at this time you have to add references to all the Ad Providers even if you only intend to use a few (we hope to remove this limitation in V2), but in any case it does not harm your solution or its size doing so, plus if you wish to later configure another provider you still do not have to change your deployed product.  Then add the references in your project as follows:

[![image](/assets/img/wordpress/2012/09/image5.png "image")](/assets/img/wordpress/2012/09/image5.png)

**\*Note,** we now provide Location aware and Non Location aware DLL’s for AdRotator, so if you do not want to use location services for your Ads then you no longer have to, just select the “Non Location aware” versions of the DLL’s

**\*\*Note** Smaato’s control at time of writing has a flaw, they provide a “non-location aware” version of their API but it still requires the location capability in Windows Phone projects, so we have disabled it for now, do not add a reference to Smaato if you use the Non Location Aware version as it is been disabled in AdRotator for now.

When you have the references in then either switch to Blend and add the AdRoator control to your pages (do not forget to BUILD your project first):

| [![image](/assets/img/wordpress/2012/09/image6.png "image")](/assets/img/wordpress/2012/09/image6.png) | 

Find the “AdRotatorControl” in the assets panel and drag it to your page or simply double click it

 |
| [![image](/assets/img/wordpress/2012/09/image7.png "image")](/assets/img/wordpress/2012/09/image7.png) | 

Configure the properties of the AdRotator control setting options like:

\*  “DefaultSettingsFileUri”

Shipped configuration file for out of the box scenarios (recommended)

\*  “SettingsUrl”

Remote URL where external XML configuration file can be sourced from.

For full list of settings see the previous article mentioned above

 |
| [![image](/assets/img/wordpress/2012/09/image8.png "image")](/assets/img/wordpress/2012/09/image8.png) | 

Now just align the control to where you want it on your page as you would any other control

As Stated, its recommended to place the control in it is own UserControl if you are going to use it on multiple pages, just to make your life easier

 |

Or you can simply paste in the XAML and configure it that way ![Open-mouthed smile](/assets/img/wordpress/2012/09/wlEmoticon-openmouthedsmile6.png):

    
    
         ![image](/assets/img/wordpress/2012/09/image9.png "image")
        
        Here is a full configuration file as a starter:
        
        
        
        
            AdDuplex” as an ad provider no matter what you do, you do not get paid for the Ad’s but your app gets exposure on all other platforms and devices and **works in just about every region** , food for thought!
            * * *
            
            # The Local Default House Ad
            
            
            Now I’ve promised this documentation since 1.1 but have not found the time but were rounding up 1.2 here it is.
            
            
            
            You should notice the “DefaultHouseAd” line in the configuration above, this comes in two flavours, the first is the Default LOCAL house ad, this simply is a User Control you have generated locally in your project which we can use to display in place of an AD, think of it as your own advert.
            
            
            
            Creating your own Ad is extremely simple, just create a new User Control, in the examples it is called “MyDefaultAd”.  If you want to keep it in a separate folder like we have in the examples then **I suggest you create it in the root of your project and then move it there** , this saves any namespace confusions later on.
            
            
            
            Just make sure it is dimensions are set to default (auto) and put whatever you want in there, just keep in mind the size of your ads on your page and you will be fine.  Ours is a very basic control as shown below:
            
            
            
            
                
                
                    
                
                )
                
                There are a few restrictions with the remote ad which should come as no surprise:
                
            
            
            
            - No code behind (since there is not one!)
            - Images and other assets must come from the web, cannot reference local project assets
            - No namespaces that cannot be sourced externally, no internal libraries!
            - Absolutely no cats or mice allowed
            
            
            Ok I made the last one up but you get the picture, the sample we provide on our service looks like this:
            
            
            
            
                AdRotator which will be a breaking change version because we want to mainly rip apart the config XML, up to now all the changes have been FULLY backwards compatible with older versions of the config XML, the main reason we want to do this is to allow for multiple configurations of each Ad Provider, then you can cycle between different AdUnits or even provider more than one concurrent House Ad (which will be good for the XBOX version since there is no internet ![Open-mouthed smile](/assets/img/wordpress/2012/09/wlEmoticon-openmouthedsmile6.png))
                
                Do not forget were not completely done with V1 as yet, there are still versions being done for:
                
            
            
            
            - Mono / Monogame
            - Windows 8
            - Windows Desktop
            - XBOX360
            
            
            These will just be feature ports and we’re not adding any more new functionality in, that’ll be for V2 (of course if there is a bug raised we will still fix it if appropriate)
            
            
            
            For questions, feedback or to let us know how you’re using AdRotator then drop us a line in the discussions on the [codeplex site](http://wp7adrotator.codeplex.com/) or even log an issue!
            
            
            
        
        
        
    
    

