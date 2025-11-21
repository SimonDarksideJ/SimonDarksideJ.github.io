---
layout: post
title: Parse the salt please
date: '2013-07-21 13:39:33'
tags: [information, parse]
---

After playing a lot with Parse over the last few weeks I thought I would share some of my findings.

* * *


# Getting to know Parse

Just what is Parse? a question I even asked myself until I really started to look behind the covers. If you just look at the homepage you will likely be left scraping your head and thinking it is some sort of creative design helper or some “powerful backend provider” to accelerate your apps (seriously??)

In short parse is a cloud based database system with a load of tools / frameworks thrown in and by far the lowest barrier to entry data provider I have seen.

There is a lot more to Parse than just that, but at its core it is there to help you share data or act as a cloud based data repository. What also makes it great is that it has the largest platform I have seen to date, just about every provider has their own SDK and to top it off there is even a HTML/Javascript client and a full REST API.

Here is what the detailed info has to say about Parse’s components:

| 

#### ![src=]()
 | 

## Parse Data


###### Store your app’s data in the cloud. No servers necessary.

Basically your spreadsheet in the sky.  It is a database system but as you will see below it’ capabilities are limited.  However it is like this for a reason, to be the most powerful yet simplistic data storage and retrieval system out there.

Coupled with a very powerful web based GUI to help you manage you backend store to boot.

 |
| 

## Parse Push


###### Creating, scheduling, and segmenting push notifications just got a whole lot easier.

Basically everything you would expect from Push notifications but scaled to support all its providers and advanced scheduling features with specific targeting capabilities.

 | 

![src=]()

 |
| ![src=]() | 

## Parse Social


###### Make your app social. Instantly.

All this really means is that Parse supports several OS third party libraries for Social connections and the ability to understand how those work.

Really this is the smartest thing they could have done instead of building their own, we are in a worldwide community after all.

 |
| 

## Parse Hosting


###### A powerful web presence without all the hassle.

Web page hosting, would you really expect anything less, note just like its competitors expect to pay more for custom domains.

 | ![src=]() |
| ![src=]() | 

## Cloud Code


###### Run custom app code in the Parse Cloud. Say goodbye to servers.

This feature is more targeted at hybrid and web apps, offering the capability to host and run Javascript code from the back end.

It is very similar to Azure’s custom API to build dynamic code if you are familiar with that but not as full featured.

 |

* * *

Getting started with Parse

As you will find with Parse, everything is built from an understanding that EVERYTHING should be as simple as humanly possible, especially the site setup and getting started features.

Walking through, once you have signed up and reach the dashboard, just watch how simple setting up a new app is:

| [![image](/assets/img/wordpress/2013/07/image5.png "image")](/assets/img/wordpress/2013/07/image5.png) |
| Give your app a name |
| [![image](/assets/img/wordpress/2013/07/image6.png "image")](/assets/img/wordpress/2013/07/image6.png) |
| Done, your app is setup (say wahhh), |
| [![image](/assets/img/wordpress/2013/07/image7.png "image")](/assets/img/wordpress/2013/07/image7.png) |
| Clicking on the “Quick Start Guide” leads you in to information to get your app up and running, whether it is an existing app or brand new |
| [![image](/assets/img/wordpress/2013/07/image8.png "image")](/assets/img/wordpress/2013/07/image8.png) |
| Selecting “New App” gives you a readymade app preconfigured for your service, just uncomment the start-up point to enable Parse. |
| [![image](/assets/img/wordpress/2013/07/image9.png "image")](/assets/img/wordpress/2013/07/image9.png) |
| Selecting “Existing App” gives you all the instructions you need to install the SDK (Windows versions are all on NuGet) and the code specific to you app to get it connected. |

There are also some steps for testing your app and its connection with some dummy data if you are new to this.

* * *


# Full merits to the documentation team

Once you are up and running you should head straight over to the excellent documentation support that the Parse team have put together.  I have seen some great examples of proper documentation from teams at Telerik and Xamarin but the Parse team seem to have found that edge to make it even better.  It helps of course having an API that is really simple to use and does not need much explaining but they do it really well. (Although no offline docs, which is a shame when you are on the train ;-( )

In the docs you will find everything you need to sort out:

- Creating tables (done automatically when you add your first object and sync)
- Reading Data
- Updating and deleting data
- Managing Files
- Analytics
- And much much more

* * *


## Being a good data friend

When building for Parse the thing to keep in mind is to keep things simple.  Storing data in the Parse data system is all about a dictionary system for the constructs you wish to build AND NO MORE.

As an example the following would be OK (assuming you have followed Parse’s quick start instructions):

> UserObject
> 
> - ID
> - Name
> - Alias
> - List\<Email\>

Which in Parse would be represented as:

> ParseObject MyUser = new ParseObject(“user”);
> 
> MyUser[“id”] = “ID1234”
> 
> MyUser[“name”] = “Geoff”
> 
> MyUser[“alias”] = “Da Man”
> 
> MyUser[“emailaddresses”] = new List\<string\>() { “email1″@outlook.com”,”email2@gmail.com”}

Then synchronising the user to Parse is as simple as:

> MyUser.SaveAsync();

However the likes of the following would **NOT** be allowed (Using a defined sub class):

> public struct UserAddress
> 
> {
> 
> string AddressLine1;
> 
> string AddressLine2;
> 
> string District;
> 
> string County;
> 
> string PostalCode;
> 
> string Country;
> 
> }
> 
> var myUserAddress = new UserAddress() { AddressLine1 = “9 MyDrive”, District = “Warrington”, County = “Cheshire”, Country = “GB”}
> 
> ParseObject MyUser = new ParseObject(“user”);
> 
> MyUser[“name”] = “Geoff”;
> 
> MyUser[“address”] = myUserAddress;

Even trying to use anonymous types or JSON like objects is **NOT** allowed:

> var myUserAddress = new { AddressLine1 = “9 MyDrive”, District = “Warrington”, County = “Cheshire”, Country = “GB”}
> 
> ParseObject MyUser = new ParseObject(“user”);
> 
> MyUser[“name”] = “Geoff”;
> 
> MyUser[“address”] = myUserAddress;

So remember you have to keep data you store in Parse VERY simple, you can spread data over multiple tables and use relationships as Parse does understand these but remember that each interaction with the backed is another call to the service (remembering you have limited calls with Parse)

The solution I ended up using was to take my anonymous type (or object) and store its contents as a string, that way you can effectively deserialise it later if you needed it, for example:

> var myUserAddress = new { AddressLine1 = “9 MyDrive”, District = “Warrington”, County = “Cheshire”, Country = “GB”}
> 
> ParseObject MyUser = new ParseObject(“user”);
> 
> MyUser[“name”] = “Geoff”;
> 
> MyUser[“address”] = myUserAddress.ToString();

* * *


# Get to know the Facebook and other third party social SDK’s

If you are using Facebook or another social network to authenticate your users you can, you can even choose whether you want Parse to do the authentication for you or use a third party library.

For Facebook they actually recommend using the Open Source Facebook SDK which can be found on Nuget (although I recommend walking through their sample apps to figure out how to use it).

Using it is very simple as well in either case, to authenticate Facebook (once you have registered as an FB developer and gotten an App ID) with Parse you simply have to:

> ParseFacebookUtils.Initialize(“Your Facebook App Id”);


## 

If you are using the Facebook SDK or already gained a Facebook OAuth token then you can just pass that into Parse instead, thus:

> ParseFacebookUtils.LogInAsync(FacebookUserId, AccessToken, TokenExpiryTime);

* * *


# What to watch out for

Now one other caveat with Parse I have found that you have to be very careful with exception handling and state tracking, in a lot of my cases simply putting a Try / Catch around Parse statements may not save you, for instance if Parse has not yet initialised or you have no Network when your client is run then the Parse Analytics will actually crash you app (at the time of writing).

My best advice is just to test your app in all situations to ensure you work as expected and keep track if Parse is connected or not.

* * *


# Wrapping up

As I have said before Parse is by far the easiest Data Provider I have ever had to use and if your data is very simple then things will be ever so easy.

