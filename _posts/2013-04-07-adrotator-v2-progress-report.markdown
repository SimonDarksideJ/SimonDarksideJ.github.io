---
layout: post
title: AdRotator V2 progress report
date: 2013-04-07 13:22:32
tags:
- adrotator
---

Quite a few people have asked me of the last few weeks about what is happening with the AdRotator project, is it dead, are we on a permanent holiday (Vacation for our American chums) or did we just get board with the whole thing as we have been fairly quite of late.

Let me put one ting to bed,


# [ADROTATOR IS NOT DEAD](https://getadrotator.codeplex.com/wikipage?title=AdRotator%20V2%20progress%20report) 

(just resting ![Open-mouthed smile](/assets/img/wordpress/2013/04/wlEmoticon-openmouthedsmile.png))

Both Gergely and I had our work / family schedules ramp up quite a bit for the last few months ( by a few I really mean a lot) but this does not mean we have lost interest in AdRotator, far from it our goals with the next version keep getting more and more ambitious and we have already done a fair bit of ground work already, such as:


## The new XML configuration

One of the biggest pains in V1 was the XML config, it was either not configurable enough or was limiting in very annoying ways, you could just push ads but that was about it and you had no control over how they functioned.  We added house ads to give you a bit more control and potentially sell ad space in your apps but again this was quite limiting as you could only have 1.

The new config XSD has been stable for a while now and had these goals:

> - Each config line is separate Ad space supporting any of the enabled Ad Providers (break the one line per provider in V1) – Allow multiple Ad Units to be used per provider
> - Add AdRotator features to XML config such as Sliding Ad, Refresh Rate, etc (per config / per provider?)
> - Compress XML config – (SHOULD)
> - Size of ad space – (MUST) – Will especially be important on Win8
> - Ad Order – Ability to specify an order of Ads, rotate in order
> - Ad Groups – With the addition of multiple ads per provider, should we also have the capability to group settings?

_The new XSD looks like this (for you XML freaks out there ![Smile with tongue out](/assets/img/wordpress/2013/04/wlEmoticon-smilewithtongueout1.png)) – granted we have not actually gone to the level of having an actual XSD before but thought it pertinent for V2_

 

    \<?xml version="1.0" encoding="utf-8"?\> \<xs:schema id="AdSettings" xmlns=" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"\> \<xs:complexType name="AdSettings"\> \<xs:sequence\> \<xs:element name="CultureDescriptors" type="AdCultureDescriptor" minOccurs="0" maxOccurs="unbounded"/\> \</xs:sequence\> \</xs:complexType\> \<xs:complexType name="AdCultureDescriptor"\> \<xs:choice minOccurs="0" maxOccurs="unbounded"\> \<xs:element name="Pubcenter" type="AdProviderPubCenter" /\> \<xs:element name="AdMob" type="AdProviderAdMob" /\> \<xs:element name="AdDuplex" type="AdProviderAdDuplex" /\> \<xs:element name="InnerActive" type="AdProviderInnerActive" /\> \<xs:element name="MobFox" type="AdProviderMobFox" /\> \<xs:element name="Smaato" type="AdProviderSmaato" /\> \<xs:element name="DefaultHouseAd" type="AdProviderDefaultHouseAd" /\> \<xs:element name="None" type="AdProviderNone" /\> \<xs:element name="AdGroup" type="AdGroup" /\> \</xs:choice\> \<xs:attribute name="CultureName" type="xs:string" /\> \<xs:attribute name="DefaultAdType" type="AdType" /\> \<xs:attribute name="Width" type="xs:double" /\> \<xs:attribute name="Height" type="xs:double" /\> \<xs:attribute name="Probability" type="xs:int" /\> \<xs:attribute name="AdSlideDirection" type="SlideDirection" /\> \<xs:attribute name="AdRefreshSeconds" type="xs:double" /\> \<xs:attribute name="AdSlideDisplaySeconds" type="xs:double" /\> \<xs:attribute name="AdSlideHiddenSeconds" type="xs:double" /\> \<xs:attribute name="EnabledInTrialOnly" type="xs:boolean" /\> \</xs:complexType\> \<xs:complexType name="AdProviderPubCenter"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdProviderAdMob"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdProviderAdDuplex"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdProviderInnerActive"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdProviderMobFox"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdProviderSmaato"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdProviderDefaultHouseAd"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdProviderNone"\> \<xs:complexContent\> \<xs:extension base="AdProvider"/\> \</xs:complexContent\> \</xs:complexType\> \<xs:complexType name="AdGroup" \> \<xs:choice minOccurs="0" maxOccurs="unbounded"\> \<xs:element name="Pubcenter" type="AdProviderPubCenter" /\> \<xs:element name="AdMob" type="AdProviderAdMob" /\> \<xs:element name="AdDuplex" type="AdProviderAdDuplex" /\> \<xs:element name="InnerActive" type="AdProviderInnerActive" /\> \<xs:element name="MobFox" type="AdProviderMobFox" /\> \<xs:element name="Smaato" type="AdProviderSmaato" /\> \<xs:element name="DefaultHouseAd" type="AdProviderDefaultHouseAd" /\> \<xs:element name="None" type="AdProviderNone" /\> \</xs:choice\> \<xs:attribute name="Width" type="xs:double" /\> \<xs:attribute name="Height" type="xs:double" /\> \<xs:attribute name="Probability" type="xs:int" /\> \<xs:attribute name="AdSlideDirection" type="SlideDirection" /\> \<xs:attribute name="AdRefreshSeconds" type="xs:double" /\> \<xs:attribute name="AdSlideDisplaySeconds" type="xs:double" /\> \<xs:attribute name="AdSlideHiddenSeconds" type="xs:double" /\> \<xs:attribute name="EnabledInTrialOnly" type="xs:boolean" /\> \<xs:attribute name="AdOrder" type="xs:int" /\> \</xs:complexType\> \<xs:complexType name="AdProvider" abstract="true"\> \<xs:attribute name="AppId" type="xs:string" /\> \<xs:attribute name="SecondaryID" type="xs:string" /\> \<xs:attribute name="Width" type="xs:double" /\> \<xs:attribute name="Height" type="xs:double" /\> \<xs:attribute name="Probability" type="xs:int" /\> \<xs:attribute name="AdSlideDirection" type="SlideDirection" /\> \<xs:attribute name="AdRefreshSeconds" type="xs:double" /\> \<xs:attribute name="AdSlideDisplaySeconds" type="xs:double" /\> \<xs:attribute name="AdSlideHiddenSeconds" type="xs:double" /\> \<xs:attribute name="IsTest" type="xs:boolean" /\> \<xs:attribute name="AdOrder" type="xs:int" /\> \</xs:complexType\> \<xs:simpleType name="AdType"\> \<xs:restriction base="xs:string" \> \<xs:enumeration value="PubCenter"/\> \<xs:enumeration value="AdMob"/\> \<xs:enumeration value="AdDuplex"/\> \<xs:enumeration value="InnerActive"/\> \<xs:enumeration value="MobFox"/\> \<xs:enumeration value="Smaato"/\> \<xs:enumeration value="DefaultHouseAd"/\> \<xs:enumeration value="None"/\> \</xs:restriction\> \</xs:simpleType\> \<xs:simpleType name="SlideDirection"\> \<xs:restriction base="xs:string" \> \<xs:enumeration value="Top"/\> \<xs:enumeration value="Bottom"/\> \<xs:enumeration value="Left"/\> \<xs:enumeration value="Right"/\> \<xs:enumeration value="None"/\> \</xs:restriction\> \</xs:simpleType\> \<xs:element name="AdSettings" type="AdSettings"/\> \</xs:schema\>

_Now this is just the initial cut and I expect this to evolve over time but with the flexibility included this should not break compatibility_

 


## _More reflection support_

_In V1 we use reflection a little bit, mainly for the house Ads but big pains expressed regularly were:_

> ![src=]()    Why can I only have one of each provider (to support flip flop configuration between backend provider settings)  
> ![src=]()    Why do I have to have all provider DLL’s registered in my app, even if I do not use some  
> ![src=]()    Why do not you support provider x  
> ![src=]()    Where is my coffee, why does not it make me coffee?

 

_Ok the last was a reach but you get the point, the first also created a pain for House Ads, since you had to do careful trickery to get round the configuration limitation 9if at all you even did)_

 

_Adding new provider has always been a pain just because of the various ways each work, the network calls they have and the platform support they have, some even have WebAPI support for non-traditional platforms and why did not we support that (well in the XNA version we do to a level but it never got out of that box)_

 

_So in V2 we are breaking that mold and have already made strides on how to implement this, it is far from ready but we have a god idea, in fact it was #1 on our bucket list but Gergely is our reflection expect (I am still a noob there) and his time as been even more limited than mine.  However we have made some progress towards that goal_

 


## _PCL Support_

_If you have been following my blog I have become a bit of a PCL nut these days and shoving PCL projects into whichever situation is was most effective (PCL is not a 1 solution cures all , it has it is uses like any other technology).  With AdRotator this was no different.  All code that we can put into a PCL we are doing so and abstracting where platform dependencies are to limit the level of rework necessary for additional client platforms.  Even my recent experience with the [MonoGame](http://monogame.net/) team has helped shape some of this vision._

 

_With the WebAPI version we may even release a completely PCL version but we will have to see how easily that pans out with the ever increasing support for functions in PCL projects.  Thanks to recent development we will be able to have the compression support in our core PCL project thanks to some recent developments, yay._

 


# _The Future_

_We are working as hard and as fast as we can with V2, support or V1 is limited at the moment but we still help out where we can but apart from emergency fixes it is unlikely we will be releasing an updated version of that soon (apart from the current Alpha release which is awaiting community testing and any other patches required), our focus is on V2 with the limited time we have._

 

_If you want to get involved then you can, the V2 site is a GIT site and you can fork away, make changes and send us a pull request.  Keep changes small  if you can to ease merging back into the main branch ( a lesson hard learnt on the MonoGame project )._

 


### [https://getadrotator.codeplex.com/](https://getadrotator.codeplex.com/)

 

_Another way to get involved is to vote on our AdRotator V2  backlog request voting page which you can find here: (any suggestions welcome but only those with the highest votes – or that we personally really like will get in)_

 


### [https://www.voteit.com/v/HiHC8jq1MV8wxEW](https://www.voteit.com/v/HiHC8jq1MV8wxEW)

Grindstone here I come

[![kick it on DotNetKicks.com](assets/img/posts/image-not-found.png)](http://www.dotnetkicks.com/kick/?url=http://darkgenesis.zenithmoon.com/adrotator-v2-progress-report/) [![Shout it](assets/img/posts/image-not-found.png)](http://dotnetshoutout.com/Submit?url=http://darkgenesis.zenithmoon.com/adrotator-v2-progress-report/)<script type="text/javascript">// <![CDATA[
var dzone_url = 'http://darkgenesis.zenithmoon.com/adrotator-v2-progress-report/';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_title = 'AdRotator V2 progress report';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_blurb = 'AdRotator V2 progress report';
// ]]></script>  
<script type="text/javascript">// <![CDATA[
var dzone_style = '2';
// ]]></script>  
<script type="text/javascript" src="http://widgets.dzone.com/links/widgets/zoneit.js" language="javascript"></script><script type="text/javascript">// <![CDATA[
var addthis_pub="runxc1";
// ]]></script>[![Bookmark and Share](assets/img/posts/image-not-found.png)](http://www.addthis.com/bookmark.php?v=20)  <script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>[CodeProject](http://www.codeproject.com/script/Articles/BlogFeedList?amid=9502591)
