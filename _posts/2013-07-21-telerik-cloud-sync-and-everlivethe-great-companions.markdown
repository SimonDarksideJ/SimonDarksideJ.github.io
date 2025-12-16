---
layout: post
title: Telerik Cloud sync and Everlive - the great companions
date: 2013-07-21 22:09:06
tags: [information, telerik]
---

Following on from the previous articles I thought I would let you in on the newcomer to the Data Provider party, namely Telerik’s Everlive service and their new cloud data sync components.

There is a lot to be said for what Telerik is trying to achieve by creating a completely out of the box solution to solve those situations where your client and server need to keep each device updated with not just your backend data but the user’s too.

* * *


# Getting to know Telerik Everlive

Everlive has a lot of similarities to Azures Mobile services (WAMS) in fact almost everything seems to be modelled on what is best  from WAMS and leaving out those bits that dev’s are taking question to.

You got everything from managed storage and data plus all the API goodness you would expect.

![src=]()

Everlive is driven by Telerik’s Icenium hybrid app suite but you can use it standalone if you wish, just like WAMS or Parse.  Breaking it down here is what you get with Everlive:


### **Data in the Cloud**

You can easily store your app’s data and files in the cloud without having to invest in setting up and maintaining servers. You can focus on your app’s user experience and functionality rather than on backend features.


### **Code in the Cloud**

You can execute business logic and validations straight on our servers using our Cloud Code functionality. You do not have to replicate complex logic on the client where often process time and response is crucial.


### **Users in the Cloud**

You can make your app social by leveraging the powerful User management feature in Everlive. With just a few lines of code you can add user authentication, user authorization, and user management to your app.


### **Easy to use Portal**

Everlive provides user-friendly interface for interacting with app data with built-in features such as Google Maps, JSON redactors, Calendars and much more.

You’ll notice a lot of familiar capabilities and some new interesting addons such as Google Maps and Calendars, certainly a lot to offer.

* * *


# Teaming up with client side data sync

Realising just how difficult it can be to keep your client side data in time with your backend data, especially when users get involved, Telerik released their first beta of their cloud data sync components with the Q1 2013 release of their Windows Phone 8 controls. (Do not expect it to stay their either!)

Through their new control set they include:

- A direct C# implementation of SQLite (based on the Open source version but neatly packaged as a single DLL)
- A whole heap of prebuilt user controls including a logon / registration form, cloud enabled jump lists / picture libraries and much much more.
- Synchronisation connectors and filters (so that the connectors are limited to a certain set of of data)
- MVVM enabled synchronisation so updates are automatic

Telerik even include (as per usual if you know Telerik) several sample apps all built on top of their cloud controls, up and running and ready to go.

For more details on Telerik’s cloud data sync set see here – [http://www.telerik.com/products/windows-phone/overview/all-controls/clouddatasync](http://www.telerik.com/products/windows-phone/overview/all-controls/clouddatasync)

> \*Note
> 
> The controls and synchronisation features are still in beta at present and are ever evolving, being involved in the beta has already changed some things and included new features.  Expect a lot more in the coming months.  The backend and controls are stable enough at present to be used in live apps, just be aware some things may not work exactly right just yet.  Where they do not then jump on the forums and you will usually get answers very soon with Telerik’s amazing support staff.

* * *


# Pricing

(Excerpt from Teleriks site)


##### THE CLOUDDATASYNC IS INTEGRATED WITH TELERIK CLOUD SERVICES WHICH ARE STILL IN BETA. HERE IS THE PRICING OF THE SERVICE ONCE IT IS OFFICIAL:

| **Data plans** | **Starter** | **Light** | **Small** | **Medium** | **Big** |
| Price per month | 

Free

 | 

$29

 | 

$59

 | 

$159

 | 

$299

 |
| Database storage (GB) | 0.1 | 1 | 3 | 6 | 20 |
| Bandwidth (GB) | 5 | 25 | 100 | 500 | 1000 |
| Files storage (GB) | 1 | 5 | 20 | 100 | 200 |

\*All plans come with unlimited API calls

- Incoming bandwidth is free
- Outgoing bandwidth is calculated on monthly basis
- File storage is calculated as the average daily storage for a month

* * *


# Getting Started

To get up and running with Telerik’s cloud data sync and the Everlive service the best option is to start a new project using Telerik’s new project template (available after installing the Q1 or Q2 2013 Windows Phone 8 control set, get the trial if you have not got a license or a Nokia NDP account)

[![image](/assets/img/wordpress/2013/07/image10.png "image")](/assets/img/wordpress/2013/07/image10.png)

The new Telerik cloud data sync project template

Once selected you will be directed to the new cloud data sync project wizard. First you will need to logon with your Telerik account (or create a new one)

[![image](/assets/img/wordpress/2013/07/image4.png "image")](/assets/img/wordpress/2013/07/image41.png)

Cloud dev account logon

Next you will need to give your app a name for the Everlive backend service:

[![image](/assets/img/wordpress/2013/07/image10.png "image")](/assets/img/wordpress/2013/07/image101.png)

New cloud service name

And you are done, you will now have a brand new project setup, complete with sample app and backend data which is completely working.

You can of course setup the above yourself and get ready the old fashioned way by just add the references manually from the Telerik “Program files” folder and create a new app on the Everlive service.  It is basically the same but there are some additional step which I will add below, which is the same when you want to add your own data.

* * *


# Going further

So you got your app ready and want to setup your own data eh.  This is fairly straight forward and as stated earlier is very reminiscent of Azure’s Mobile services way of getting started.  Just logon to the Everlive portal at [www.everlive.com](http://www.everlive.com)

Once your new app is created (if you skipped the first step, the process is exactly the same on the Everlive portal) you can select it to begin adding your data, this is essential as unlike Parse both WAMS and Everlive require you setup your tables first.

To this simply select the “create a content type” button from the app home screen:

[![image](/assets/img/wordpress/2013/07/image13.png "image")](/assets/img/wordpress/2013/07/image13.png)

App home screen

You will then be presented with the new content type setup screen where you give your new table / class a name and then start defining columns

[![image](/assets/img/wordpress/2013/07/image16.png "image")](/assets/img/wordpress/2013/07/image16.png)

New content type creation

Now for your own data you have several options available, first off there are a few setup in advance for you (do not touch them!!) which are just standard tracking data for the backend.

The kind of data you can store in your new columns are:

[![image](/assets/img/wordpress/2013/07/image11.png "image")](/assets/img/wordpress/2013/07/image11.png)

Everlive Data types

All types are fairly self-explanatory, interestingly, Everlive does have a field for relationships, so you can easily link and query tables together.

You can if you wish also start adding data to your new table if you wish through the portal, feel free to play around.

* * *


# Getting down with the code

On the code side of things there are few items that need to be taken care of, Telerik have been a lot more programmatic when it comes to initialising your content in your app along with several synchronisation specific settings.

First off you need to keep a reference to the table you have created on the backend, this is where you will query / update your data from:

    private SynchronizationContext\<MyContentTable\> myContentTableContext;

Pretty simple, then to initialise it when your app is ready you do the following:

    SynchronizationContextPool.RegisterContextForType\<MyContentTable\>(new EverliveSyncServiceProvider\<MyContentTable\>(CloudProviderHelper.CurrentProvider.CurrentUser.Id + "\_local.db")); this.myContentTableContext = SynchronizationContextPool.GetContextForType\<MyContentTable\>();

Simply put you register your app with the specific table on the backend and then set your local variable to the instance of that table.

Additionally you can then set criteria on that context to ensure that only specific data you wish to sync goes across the wire and is stored in your DB using the following syntax:

    this.myContentTableContext.SynchronizationFilter = myContent =\> myContent.CreatedBy == CloudProviderHelper.CurrentProvider.CurrentUser.Id;

This ensures that only data created by your user is ever downloaded and synchronised between the backend and your client application.

Now if you are using View Models in your app (and why on earth would not you), they synchronisation of the data is automatically handled within the “onPropertyChanged” events (see the Tasks example you get with the phone controls for more info), simple.

You can do it manually of course by:

    this.tasksContext.AddAsync(new MyContentTableItem()); this.tasksContext.SynchronizeAsync();

It is important to call the “SynchroniseAsync” afterwards to ensure the data gets sent to the server as soon as possible to avoid nasty “out of sync” issues.

There is a little more to it than that but you should get the gist from the above and the Tasks example app you get with a new project (or available to download when you setup a new app on the Everlive service)

* * *


# Using the Everlive SDK direct

There is another option to integrate with Everlive, through its own native SDK.

its available to download direct from the Everlive site (in the downloads section) for:

> ![src=]()    .NET 4.0  
> ![src=]()    .NET 4.5  
> ![src=]()    Windows Phone 7 & 8  
> ![src=]()    HTML / Javascript

I wo not go in to too much detail (as that is practically a whole other article there) but always nice to have additional options.

Full instructions for integrating the SDK with your client apps is also given on the download page.

* * *


# Off you go

Hopefully that is enough to get you interested and started with Telerik’s new offering in the world.  I will try and keep this updated and things change since it is a ever evolving service.

I myself have already requested several new features, most of which are either in the current internal build or planned for very near releases, including:

> ![src=]()    Offline support (it is possible to do offline at the moment but it is tricky)  
> ![src=]()    Alternate backend providers (granted a bit cheeky but it is already in motion)  
> ![src=]()    Social logon features

I am now going to take a break and get back to some MonoGame stuff, planning on getting MonoGame.Portable out on NuGet and if I have time the rest of MonoGame as well ![Open-mouthed smile](/assets/img/wordpress/2013/07/wlEmoticon-openmouthedsmile3.png)

