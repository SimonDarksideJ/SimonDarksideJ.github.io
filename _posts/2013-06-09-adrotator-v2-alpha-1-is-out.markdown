---
layout: post
title: AdRotator V2 - Alpha 1 is out
date: '2013-06-09 12:41:15'
tags:
- adrotator
- alpha
- information
- release
---

Cross Posted from [this post](http://wp.me/p3yEc2-O) on AdRotator’s new site – [http://getadrotator.com/](http://getadrotator.com/) (still a work in progress but a start :D)

Well it’s been a long time coming but we are really making progress on AdRotator V2.

So as of this week were announcing the first alpha release of AdRotator V2 which is available on NuGet for:

- Windows Phone 7.1
- Windows Phone 8
- Windows 8

The [package is available on NuGet](http://nuget.org/packages/AdRotator/2.0.0-Alpha1) now for you to play and tinker with, it’s stable enough to use in Live projects as far as our testing goes but that’s up to you.

* * *

# What’s in the release?

Alpha 1 is our first fully stable build which uses the all new and enhanced XML configuration structure and support for all our existing Ad Providers plus 1 new one Inmobi (want more providers then get voting here!!)

### The new Configuration XML

    \<?xml version="1.0" encoding="utf-8"?\> \<AdSettings xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"\> \<CultureDescriptors CultureName="\> \<AdDuplex AppId="1379" Probability="0"/\> \<Smaato AppId="0" SecondaryId="0" Probability="0"/\> \<PubCenter AppId="test\_client" SecondaryId="Image480\_80" Probability="0"/\> \<Inmobi AppId="ec9ea8fdfcc3436e94df0f5bcac3a227" Probability="0"/\> \<MobFox AppId="474b65a3575dcbc261090efb2b996301=" IsTest="false" Probability="0"/\> \<AdMob AppId="a14e5b8669ef367" Probability="0"/\> \<InnerActive AppId="ZenithMoon\_Studios\_StarterSeriesGames\_WP" Probability="100"/\> \<AdGroup Probability="0"\> \<AdDuplex AppId="1379" Probability="100"/\> \</AdGroup\> \</CultureDescriptors\> \</AdSettings\>

The new configuration XML breaks compatibility with the old version but for very good reasons, you can now:

- Have as many instances of an Ad Provider as you wish (useful if you have multiple AdUnits with a provider)
- More configuration options, almost every configuration option that was available before is available everywhere
- AdGroup (coming soon), the configuration XML also now allows grouping of Ad Configuration, this will be useful if you want to set the order of provider checking yourself or have groups of House Ads and rotate through them as a group. It’s in the config but we don’t consume it as yet

### UnBound Provider dependencies

One of the biggest headaches in V1 was that you had to have every ad provider registered in your project even if you weren’t using them, this was also a headache for us since we had to keep updating the NuGet package every time a provider dll was updated.

In V2 we have broken that dependency (in a good way), now:

- You only need to have Ad Providers that you use registered
- If you specify a provider in Configuration that you don’t have, it will be ignored

In the [Nuget Package](http://nuget.org/packages/AdRotator/2.0.0-Alpha1) we now only include AdDuplex (since they are on NuGet anyway) by default and you can add as many of the others as you wish.

You can also have just one configuration for all platforms because even if a provider isn’t supported on that platform it will now just ignore it.

### Full Async support

Getting on the async bandwagon, AdRotator now fully supports Async on all platforms.  This is a huge performance boon and also simplifies how we manage the project.

All calls (inc web) are offloaded and handled correctly coming back so fewer multi-threading issues and better performance (and no UI blocking issues either)

* * *

# Yet more to come

Obviously we’re not stopping there, if you check the [backlog](https://getadrotator.codeplex.com/wikipage?title=AdRotator%20V2%20progress%20report) we have more high priority items to include, such as:

- Bringing over HouseAds and RemoteHouseAds
- Compression support (reduce those web calls further)
- WinJS and Javascript support
- WebAPI support (similar to what we used for XNA)
- More platforms
- More providers
- Much Much more

##### [Want more? then get over to the voting page and have your say!](http://www.voteit.com/v/HiHC8jq1MV8wxEW)

In the end this will be the best AdRotator we can make it and with any luck you will be able to incorporate it just about anywhere (including on your website :D)

Please direct any Comments or Queries to the [AdRotator V2 codeplex](http://getadrotator.codeplex.com/) site for all to see / discuss

