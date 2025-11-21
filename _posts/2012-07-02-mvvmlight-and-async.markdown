---
layout: post
title: MVVMLight and Async
date: 2012-07-02 14:02:58
tags: [mvvm]
---

![width=](assets/img/posts/image-not-found.png) ![width=](assets/img/posts/image-not-found.png) ![width=](assets/img/posts/image-not-found.png)

With Windows 8 just around the corner and many developers running for the ship to get up to speed with the new brave world (even those who have frowned at the new Metro interface and possibly wont touch it themselves, still see the value in writing apps / games for the platform to sell).

One of the biggest hurdles I have found and seems reflected in colleagues and peers is the new Async framework, granted to those who have followed the Task framework it is no big shock and a simple evolution, but for those of us who left it in their “Read it Later” pile it is a bitter pill to swallow.  That being said however once you have “tested the waters” so to speak will find it is not that different from what we already know it is just another way of tackling the problem of offloading work and marshalling it back for use, but cleaner and easier to read and some notable performance gains by letting the compiler and CLR handle it for us.

This post is simply going to walk though one of the first challenges I set myself when learning Async which was how it affected my core apps with loading data, this is by no means the only reason for ASync’s being, but data is at the heart of most apps and when there is a lot of it to handle you need to effectively load it without dampening the users experience in the front end.


#### \*Note


#### In case you were wondering this post is not just for Windows 8 devs.  The Async CTP is also available for Visual Studio 2010 with variants for .NET/ Silverlight and even Windows Phone.


#### I have found by going back to what is already familiar and updating it to Async has helped my journey a lot and my progressions to Windows 8 have been all that smoother for it when porting.


#### The samples attached are in fact written for Windows Phone using **[Laurent Bugnion’s (GalaSoft)](http://www.galasoft.ch/contact_en.html) **MVVMLight framework for windows phone

* * *


# Resources and Links

First a quick nod to a lot of the links and pages that have helped me in my journey so far.  While there is not a great deal of it yet, more is sure to come.  What there is however is both easy to digest and (where it is needed) very technical in nature.

> ![align=](assets/img/posts/image-not-found.png)    Async MSDN Site – [http://msdn.microsoft.com/en-us/async](http://msdn.microsoft.com/en-us/async) (Especially good are the getting started videos!)
> 
> ![align=](assets/img/posts/image-not-found.png)    Building Windows 8 Blog Async Post (courtesy of Mike Taulty) – [http://bit.ly/LQwEik](http://bit.ly/LQwEik "http://bit.ly/LQwEik") (Deep technical article on Task)
> 
> ![align=](assets/img/posts/image-not-found.png)    MSDN library page for Async – [http://bit.ly/LQwIyJ](http://bit.ly/LQwIyJ "http://bit.ly/LQwIyJ") – Interesting explanations and code walkthroughs
> 
> ![align=](assets/img/posts/image-not-found.png)    The Task: Events, Asynchronous Calls, Async and Await (Jeremy Likeness) – [http://bit.ly/LQxqvV](http://bit.ly/LQxqvV "http://bit.ly/LQxqvV") – A nice clean article for deconstructing Tasks and good practise

* * *


# Getting Started

Couple of things you will need if you want to re-create / use the samples here (you do not have to of course, you can use everything here just in Windows 8 if you wish!)

> ![align=](assets/img/posts/image-not-found.png)    Visual Studio – any version from 2010 upwards including the Windows Phone and express editions
> 
> ![align=](assets/img/posts/image-not-found.png)    MVVMLight V4+ – you can either download this from NuGet or from the codeplex site here. (I would recommend getting it from Codeplex for your first project and then NuGet after that so you also get all the Project/Item templates and snippets it provides.
> 
> ![align=](assets/img/posts/image-not-found.png)    Async CTP (only for VS 2010 editions)


## \* Note

At the time of writing the Async is only a CTP for 2010 and to get it installed on an existing system does present some challenges (which are well worth the pain of going through to get the goodness in 2010).  Primarily it has to do with Updates to Visual Studio since the CTP was released.  it is not a big deal as all you have to do is uninstall the updates while you install the CTP and then run windows update again afterwards.  In my experience I also had to un-install / re-install the WP developer SDK as well but that may have just been me.

See the following article for helping you get the Async CTP running on VS 2010 (all editions) – [http://mikaelkoskinen.net/post/async-ctp-fix-installation-problem](http://mikaelkoskinen.net/post/async-ctp-fix-installation-problem)

Here is hoping a full release will also come out for VS 2010 with the release of VS 2012.

* * *


# Quick intro to V4 of MVVMLight

With the introduction of V4 of the MVVMLight, Laurent implemented a lot of the new features to the framework from his talk back in 2011 [http://bit.ly/LQA70t](http://bit.ly/LQA70t "http://bit.ly/LQA70t")) – If your completely new to MVVM then I’d also recommend watching his 2010 session which is what got me started in MVVM in the first place ([http://bit.ly/LQA4S5](http://bit.ly/LQA4S5 "http://bit.ly/LQA4S5"))

The core thing that was introduced was “Inversion of Control” (IOC for short) which allows you to decouple the dependencies used in your view models from the actual implementations of those dependencies, the common example used to describe this is where you have view models that require data from a service, through IOC you can supply “Test” data or “Live” data without having to do any complicated code in your view model to handle this, a simple switch loads the appropriate implementation of your data loading function and the View model is unaware that anything is different.

[![image](/assets/img/wordpress/2012/07/image141.png "image")](/assets/img/wordpress/2012/07/image138.png)

The above diagram attempts to show at a high level just what is going on, When the app is started the ViewModelLocator is instantiated, when that happens it registers all the dependant Interfaces and then any concrete classes (in this case our View Models) with the Service locator, then when a page requests a certain view model the view model locator requests the concrete type from the Service Locator which in turn looks at that concrete type and determines if it has any constructor parameters, if it finds any it looks in the Service Repository for another concrete type registered with the interface that is required and instantiates the required class using that type, the instantiated class is then handed back to the view model locator which in turn hands it back to the page for use.  You are not limited to only using the IOC service to just the ViewModelLocator so you can in turn apply it wherever you want in your application.

That is my very high level description of one solution that IOC gives, I’m sure there are many more.  I am not going to go in depth as to what IOC is or does (that is what google is for ![Open-mouthed smile](/assets/img/wordpress/2012/07/wlEmoticon-openmouthedsmile17.png)) but just to note it is a nice change in the templates for MVVM and one worth taking advantage of.

There have been many other improvements including Windows 8 support so it is worth spending a little time walking through the default template that MVVMlight gives you in V4.

* * *


# Starter for 10

First off before we move to Async a quick look at what you get out of the box now, a starting point if you wish.

With MVVM (as the definition of the name suggests) we have a Model, a View Model and a View.  The special bit of magic being the ViewModel part that separates all the Data and Content from the layouts, positioning and animation in the UI (View).  It is the glue that pulls it all together.

The key thing is that the data (model) has to be loaded from somewhere, usually a Web Service located out on the web or even locally stored on a device (whether it is from a file or a DB) or even sometimes both so the ViewModel needs to bind all this up together in one coherent list or property that a View can digest without having to worry about how it got there.

In the Template we have a nice basic model:

    **My**  **own** recommendation is that you should avoid (if at all possible) the use of Lists in a Model, the reason for this is that the model is supposed to define how a single piece of data is represented, if that model does include a list of other information (a players achievements for example) then you would have a “PlayerAchievement” model and you would then load the additional list in the “PlayerViewModel” simply because that is where the data is stitched together for representation in the UI.  Another way to look at it is to treat Models as Individual tables in a database, you cannot put a “List” of items in a single table, you would create a linking table (or parent column) to join them (yes you can still have an array within a single table but you would not split that data in your model you would decompose it in your view model) [/rant off]
    
    So model aside we next have our basic ViewModel:
    
    
    
        namespace MvvmLightAsync.ViewModel { /// \<summary\> /// This class contains properties that the main View can data bind to. /// \<para\> /// Use the \<strong\>mvvminpc\</strong\> snippet to add bindable properties to this ViewModel. /// \</para\> /// \<para\> /// See http://www.galasoft.ch/mvvm/getstarted /// \</para\> /// \</summary\> public class MainViewModel : ViewModelBase { private readonly IDataService \_dataService; /// \<summary\> /// The \<see cref="WelcomeTitle" /\> property's name. /// \</summary\> public const string WelcomeTitlePropertyName = "WelcomeTitle"; private string \_welcomeTitle = string.Empty; /// \<summary\> /// Gets the WelcomeTitle property. /// Changes to that property's value raise the PropertyChanged event. /// \</summary\> public string WelcomeTitle { get { return \_welcomeTitle; } set { if (\_welcomeTitle == value) { return; } \_welcomeTitle = value; RaisePropertyChanged(WelcomeTitlePropertyName); } } /// \<summary\> /// Initializes a new instance of the MainViewModel class. /// \</summary\> public MainViewModel(IDataService dataService) { \_dataService = dataService; \_dataService.GetData( (item, error) =\> { if (error != null) { // Report error here return; } WelcomeTitle = item.Title; }); } } }
    
    
    
    Again not much in here but we can see that the “Title” property in out model when read and used by the View model is stored and exposed as the “WelcomeTitle” property which makes more sense for the UI (highlights a nice separation from what we can data to HOW we can consume and use that data, for instance the same model property could be re-used for several View Properties in the View Model)
    
    
    
    The new thing (if your experienced with using MVVM) above if that the ViewModel now takes an argument which is an Interface that provides the DataService (or data loader) that will go and get the model data that is required for the ViewModel function to work.  Traditionally this would have been done by a “LoadData” method called by the constructor of the ViewModel which would then either create the data needed or call some helper functions to perform the necessary calls (and these could take some time and hence delay the creation of the ViewModel, possibly affecting the front end performance of the page using it as it is DataContext)
    
    
    
    This example above has a very basic setup as shown below, just one function to Get the string required for the “WelcomeTitle” property, this could just as easy be a request for an enumerable list of model items:
    

| 

    namespace MvvmLightAsync.Model { public interface IDataService { void GetData(Action\<DataItem, Exception\> callback); } }

 | The basic interface explaining what functions are required by default classes implement this interface |
| 

    namespace MvvmLightAsync.Model { public class DataService : IDataService { public void GetData(Action\<DataItem, Exception\> callback) { // Use this to connect to the actual data service var item = new DataItem("Welcome to MVVM Light"); callback(item, null); } } }

 | The DataService class implementing the “GetData” function required by the interface which simply returns a single string in it is call back.Usually such functions would return an IEnumerable list of data from file or a web service.In the sample you will notice there is another implementation of the IDataservice for design time data, in the demo it is the same but IRL if a web service was used for live data you could supply dummy test local data so you did not need the web to test the UI |

So we have our Data (model), a View model that presents this data (ViewModel) and a service that will go and get that data for us from somewhere in the correct model format (DataService), all that is left is to make the ViewModel available to Pages, this is done in the ViewModelLocator which is a handy central local where Silverlight can be instructed to expose all the view models available:

    namespace MvvmLightAsync.ViewModel { /// \<summary\> /// This class contains static references to all the view models in the /// application and provides an entry point for the bindings. /// \<para\> /// Use the \<strong\>mvvmlocatorproperty\</strong\> snippet to add ViewModels /// to this locator. /// \</para\> /// \<para\> /// See http://www.galasoft.ch/mvvm/getstarted /// \</para\> /// \</summary\> public class ViewModelLocator { static ViewModelLocator() { ServiceLocator.SetLocatorProvider(() =\> SimpleIoc.Default); if (ViewModelBase.IsInDesignModeStatic) { SimpleIoc.Default.Register\<IDataService, Design.DesignDataService\>(); } else { SimpleIoc.Default.Register\<IDataService, DataService\>(); } SimpleIoc.Default.Register\<MainViewModel\>(); } /// \<summary\> /// Gets the Main property. /// \</summary\> [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic", Justification = "This non-static member is needed for data binding purposes.")] public MainViewModel Main { get { return ServiceLocator.Current.GetInstance\<MainViewModel\>(); } } /// \<summary\> /// Cleans up all the resources. /// \</summary\> public static void Cleanup() { } } }

Here is where we see the Crux of the difference between V3 and V4 where we have replaced static properties for the ViewModel’s with a SimpleIOC container.

As the Data Service is based on an Interface instead of a concrete class we can interchange it with any class that implements that interface, so depending on whether we are running in blend or on a device we can choose which Data Service (the live or design time one) to register and make available for use.

You will notice that when we instantiate the MainViewModel that we are not providing any parameters, but our MainViewModel requires a parameter to be constructed and it does not have any Blank constructors, so where is it getting it from.

This is where the other half of the IOC comes into play, the unseen plumbing that works behinds the scenes to inject what ever dependencies an object needs if it is not provided already (so long as there is one to offer!), as we have registered a data service with the appropriate Interface implementation (either the Design or Live one) with the IOC Service Locator, then at compile/run time the IOC framework will pull it from it is library and provide it for you.  Very powerful in the right hands.

* * *


# But AWAIT there’s more

So this is all well and good but if you have a lot of data or it is coming from a backend service which could take a while to gather or worse it has to time out first before you can handle it (some time outs are longer that others), then it could possibly be a lot of time for your user to wait while the page loads.  You might offset this in your page by only loading the data after the page itself has loaded and shown the base UI, but still it could cause the UI to be unresponsive.

Originally to work around this you might use background threads or dispatchers to handle this with call backs and such, using the Dispatcher again to marshal information back to the UI and such (in high performance  scenarios the dispatch can loose a job or two!). **\*Note, traditional threading and background workers are NOT available in Windows 8, the System.Windows.Threading class is GONE!**

So enter ASync and Await, if you have watch at least the video from the ASync site you should have a good basic understanding of what the framework gives you (not going to re-iterate it here, watch the videos.  See you in 30 mins if you have not!) so how to apply this to the MVVMLight framework, simples.

The main problem we are trying to solve here with ASync is that we want to offload the loading of our data to background threads or workers and have it marshal back so it can be used by the UI (updating your ViewModel updates the UI directly so it has to be on the UI thread, else it will complain !A LOT! ).

Now one of the things that hits you when you start trying to do ASync in the beginning is that it is infectious, once you update a lower part of your application (loading data from the web for example) to use ASync it permeates up the call stack right back up to the first function that called it, adding the “async” modifier to each function and “await” to each method call, which is not idea when you just want to get your data.  Thankfully the last video in the MSDN async video helps us out here and we can apply the same logic to our data calls, treating them as external calls from within the project (some purists might state you should go all the way and have a separate project for handling this, but its not necessary unless you want to roll that way).

So enough talk and lets get on with it!

First off we need a reference to the ASync framework, as shown in the videos its in a bit of an odd place but here is is again in case you have forgotten ![Smile with tongue out](/assets/img/wordpress/2012/07/wlEmoticon-smilewithtongueout3.png)

> “C:\\<My Documents\>\Microsoft Visual Studio Async CTP\Samples”

If you cannot see the folder, the ASync library lied to you about it being installed successfully, so be sure to follow the article mentioned earlier about un-installing updates and getting it installed correctly, the folder is added at the end of the install and wo not appear if the necessary changes were not made! (cost me an afternoon finding that out!, you told me you installed successfully damn you)

Just make sure you select the correct DLL for the platform you are building against, thankfully they provide versions for .NET / Silverlight and Phone.  You only need the one for your project type, so do not add more!!

Next we need to alter the Interface our data services are using so that our calls are returning the right kind of data, were no longer using a call back because the ASync framework manages that all more effectively and just returns data when it is done automatically (sounds almost too good to be true does not it, no more manual handling of call backs), so we change the interface mentions above to the following:

    namespace MvvmLightAsync.Model { public interface IDataService { Task\<DataItem\> GetData(CancellationToken cancellationToken); } }

So now instead of a call back, the “GetData” function will return a Task containing data in the form of a “DataItem”.  For lists you can simply replace “DataItem” with “IEnumerable\<DataItem\>” for example.

The cancellation token is optional of course you do not have to use then but I would advice you do especially with what could be a long running operation, if the user closes the app it is nice to close these things down cleanly and stop your backend server sending data to something that is not listening any more!

Next we need to update out implementation(s) of this interface, thus:

    namespace MvvmLightAsync.Model { public class DataService : IDataService { #region Public Interface Methods public Task\<DataItem\> GetData(CancellationToken cancellationToken) { return GetDataInternalAsync(cancellationToken); } #endregion #region Private Interal Async workers private async Task\<DataItem\> GetDataInternalAsync(CancellationToken cancellationToken) { return await TaskEx.Run(() =\> new DataItem("Welcome to MVVM Light")); } #endregion } }

Now as I stated I’ve used the pattern described in the last ASync video to have a seperate public non-async method which calls an internal private async function, this saves on having to change the rest of my project to be async as well and limits the impact.  Nothing stopping you from doing so, it just makes sense to me to only add it where it is needed.

As you can see in this instance it is clean and no fuss, in my design Data Service I can forgo the async internal call and just return static hardcoded data and the app is none the wiser (recommended for designing in Blend with example data)

And that is it, the Task framework handles all the messy background threading, callbacks and marshalling it back to the UI without even a thought.

So do you think that is easier?

* * *


# Conclusion

Well that is a basic intro to Async from me and an example of how MVVM can benefit from it, so I hope you find it useful

I will not provide a sample this time as you only have to install the MVVMLight toolkit, create a new MVVMLight project using the template and make the above changes.

I may later through up an RSS reader I helped out one of the guys put together for a more complete web sample, shout below if that is something you would like.

