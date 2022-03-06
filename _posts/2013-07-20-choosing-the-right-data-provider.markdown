---
layout: post
title: Choosing the right Data Provider
date: '2013-07-20 15:28:40'
tags:
- azure
- buddy
- information
- parse
- telerik
- tutorials-resources
- wams
---

In the progress of my last few “@Dvlup challenges I had to employ a backend data provider to both store and sync data from my client applications as part of the requirements for those challenges.  This gave me the opportunity to properly evaluate what the options were and who was offering the best services for my requirements.

So here is the output of my research for the three big “out of the box” solutions out there.

| [![image](/assets/img/wordpress/2013/07/image_thumb2.png "image")](/assets/img/wordpress/2013/07/image2.png) | [![image](/assets/img/wordpress/2013/07/image_thumb3.png "image")](/assets/img/wordpress/2013/07/image3.png) | [![image](/assets/img/wordpress/2013/07/image_thumb4.png "image")](/assets/img/wordpress/2013/07/image4.png) |
| Azure Mobile Services (WAMS) | Telerik Everlive Portal | Parse |

* * *

# Requirements

For the basis of this review I will set out my requirements that I wanted to satisfy.  Everyone’s requirements are different and each platform has different ways to handle those, it is up to you to pick the one that suits you best for each situation.

My baseline requirements were:

##### App1

- 3 Basic objects (person, friend, data)
- Data sync between client and server (offline data)
- Facebook, Twitter & MS auth authentication

##### App2

- 2 Data objects, 1 basic (person/user), 1 complex (GeoPosition data plus detail)
- Push data (backup / notification only)
- Facebook authentication

SO for the purpose of the review these were the kind of things I was looking for, there are various other scenarios for mobile devices / websites, if you have a specific case drop me a comment and I can feedback based on my experiences to date.

Additionally during the trial the service should not incur any cost and have enough resources to complete at least the Beta.  Preferably the running costs for the 1st year should be kept to minimum.

* * *

# High Level comparison

Below is a base comparison of the three services based on their FREE tier

| | 

![src=]()

 | ![src=]() | ![src=]() |
| Client OS Support | 
- 
Windows 8/WinRT
- 
Windows Phone
- 
iOS
- 
Andriod
- 
HTML / JS
- 
Rest
 | 
- 
.NET
- 
Windows Phone
- 
HTML / JS
 | 
- 
.NET
- 
Windows 8/WinRT
- 
Windows Phone
- 
iOS
- 
Andriod
- 
HTML/JS
- 
Rest
- 
Xamarin
 |
| Auto Table creation | ![src=]() | ![src=]() | ![src=]() |
| Auto Column creation | ![src=]() | ![src=]() | ![src=]() |
| Supports complex datatypes | ![src=]() | ![src=]() | ![src=]() |
| Scripting support | ![src=]() | ![src=]() | ![src=]() |
| Request Limit\* | 500,000 | N/A | 1 mil / 20 per second |
| Bandwidth limit\* | N/A | 5Gb outgoing | N/A |
| Storage Limit\* | 20Mb\*\*\* | 100mb db / 1GB files | 1Gb |
| Connection Limit | 100 devices\*\* | N/A | N/A |
| Dashboard and Analytics | ![src=]() | ![src=]() | ![src=]() |

\* limits unless specified are on a Per Month basis unless specified

\*\* Limited to 100 devices activated on the service across all apps per month (devices inactive for 30 days are released)

\*\*\* The Azure db limit is for your account, you get just 1 20Db for all 10 WAMS apps you can register

* * *

# The story for App1

For the backend service in App 1 I needed to be able to register friend data and use the backend to keep track of those friends, I wanted as little hassle as possible keeping both the backend in sync and the client plus I only wanted each user to see the data they owned and data that their friends said they could see.   Also to keep things efficient and not over create data so there should only be one “connections” table between friends.

| ![src=]() | 

WAMS alone would not surface the needs for my app but it has a very extensible custom API set using Javascript which makes it very flexible.  By using SQLite or other DB service it would be easy to manage the requirements.

For an app where ALL clients would need to sync would not work even the trial in the FREE tier so the only option would be to pay due to the device and db limits.

 |
| ![src=]() | 

Again Everlive alone would not suffice BUT Telerik have released a beta of their cloud sync service which gives seamless data synchronicity between client and server.

The limits on the service cut it a little close to the bone but should be enough to begin with, although on-going running costs would mean a higher charge to clients.

 |
| ![src=]() | 

Parse with a local SQLite local db would suffice however with the lack of custom API support on the backend would make complex queries problematic or require multiple calls to serve data more than halving the request limit imposed on the service

 |

### Conclusion

![src=]()

For App1, Telerik’s Everlive service paired with the new Cloud sync controls was a no brainer really.  The service is still in its infancy but that gives the ability for any developer getting involved at the ground level to help to shape it for the future.  It also provides the best “out of the box” experience and removes a lot of the complexities with resolving conflict issues on data.

Only downside is that because it is just getting started that there will be a few tricks to learn on the way which may put some beginners off.

* * *

# The Story about App2

App2’s requirements are a lot simpler than App1, no synchronisation required for a start but it had more complex data to work with since it involved storing a lot of geo position data and detail behind it for reporting and tracking.  The service would also have to support a rich backend website for a reporting dashboard (possibly also on tablets later)

| ![src=]() | 

WAMS seemed to be the obvious choice here but the Facebook authentication on Azure mobile services is not great, users are always presented with a blank white screen on start-up which is not a great experience, using another FB authenticator and passing the “AccessToken” to WAMS just does not work.

 |
| ![src=]() | 

Everlive would work but does not currently support FB auth and did not want the hassle of two authentication systems to handle.  Using the native SDK instead of the cloud sync works fine but is a bit overkill in this case.

 |
| ![src=]() | 

Parse’s basic nature lends itself to this kind of pattern for just having a basic data store plus it supports almost every platform under the sun with as many authentication patterns as you would like.

However it’s lack of support for complex objects does create some challenges.

 |

### Conclusion

![src=]()

For App2’s use case where I just need to throw logging data at the server Parse is an excellent fit.  There are some things to take into account though.  The complex types I was using had to be flattened to store them in my structure (I will blog more about my Parse use in another article) but putting it simple, it just worked and the methods for interacting with Parse are the easiest I have come across (their documentation is first rate also).

* * *

# The cutting room floor

In my investigations I did also try a few other providers, some got a glance, some I tried my best to use but failed to do so.

![src=]()

The most notable of these was Buddy (This is Nokia’s preferred go to solution for backend data for apps and games), I call this out because as it stands the system is awful.  The documentation is unwieldy and substandard and their API is so hard to use it is a wonder it is used by anyone.

This really is a shame because they obviously have really geared up their backend to offer lots of services that are very useful, especially to game developers (great leaderboard and ranking systems, Messaging, Friends and achievements, they really offer a great deal)

But at the time of writing I would not recommend anyone try implementing it at this time.  This really is a shame considering Nokia’s backing and free tokens to use their services.

I will still keep an eye out and if I have time work with them as I have done others to help get things moving.

* * *

# Community reaction to WAMS

I really tried to use Azure Mobile services for my solutions, is was in fact my platform of choice especially with their (now) per minute charging, fantastic range of capabilities and the extended API that is second to none.

However myself and a lot of the community have been mulling over some of the forced limitations being placed on WAMS which makes it all but unusable in a Free bracket.  in reality it should not be called free, more rather Developer sandbox or Test / POC bracket.  a 20mb database or all your services is plain daft (20mb per service might have helped better) and the 100 device limit is crazy. A maximum of 100 registered user devices are allowed to access your service each month which is made worse if you support multiple platforms and users have more than one device.  Guessing Microsoft really want to to just pay from the start for Azure which is fine but they just do not say that. (the notices about MSDN access cannot be used for Live services further deepens the divide but I cannot complain with that view, MSDN is not meant for that)

This approach is leading many away from WAMS (at least almost every dev I have talked to), here is hoping that something comes back from the UserVoice requests regarding these issues else Azure will be unapproachable to all but enterprise customers.  Certainly no way to run a Free Apps/Service from Azure let alone an Ad Supported ecosystem

* * *

# Wrap up

This post was just an overview of some of the things I have been up to while I have been quiet, expect a lot more over the next few days until I start delving again ![Open-mouthed smile](/assets/img/wordpress/2013/07/wlEmoticon-openmouthedsmile2.png)

Keep watching the skies

![src=]()

