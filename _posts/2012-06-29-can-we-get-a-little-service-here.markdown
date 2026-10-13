---
layout: post
title: Can we get a little service here?
date: 2012-06-29 21:15:21
tags: [networking]
---

Following on the heals of my last post on WCF service implementations on the Windows Phone 7, here's a nice little sample to give you a bit more detail / meat on the bone.

This isn't going to go into detail on how to write a WCF service, i still state the best person to help you with this is Ron Jacob's on his [WCF](http://blogs.msdn.com/b/rjacobs/) and [.NET](http://blogs.msdn.com/b/endpoint/) blogs (he has many!!), however for this Sample Charles ([RandomChaos](http://xna-uk.net/blogs/randomchaos/default.aspx)) Humphrey has written a little WCF service and we have hosted it for you to test with (just don't abuse it, we will clear the data our often!)

Sample as always posted up on the [Codeplex host for this series](http://startrooper2dxna.codeplex.com/releases/view/51292).

please note that this is one way to implement WCF services in WP7 apps, it isn't the only way. So if you want to also implement JSON or add encryption you can, just update the methods as you wish.

---

## \*\*Addendum

A wise person noted that by using the word LEADERBOARD, I may be conflicting with the XBOX live Leaderboard system. But this sample is not affiliated with the XBOX Live Leaderboard system in anyway. And reference to persons living or dead is purely coincidental.

I did look into renaming Leader board to Scoreboard, but it was too late (I was about to hit publish) and it will take to long to revise it at this time, if anyone has any issues please let me know and I'll sort it out.

For now, where you see Leader Board, think scoreboard. **This sample is not an XBOX Live Leaderboard integration sample**, it is purely a sample scoreboard system using custom WCF services.

---

### Outline and Goals

Right a good place to start is a nice brief outline of what tis sample is aiming to achieve. This sample provides a Scoreboard service to host and manage leader boards and scores for games, note I say games as it has been designed to host as many leader boards as you wish.

It's made up like this:

> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) A backend DB to host the leader boards, very simple with 2 tables hosting the boards and the scores. Could have just as easy been XML and hosted web services to expose methods to register and query the leader boards.
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) A Silverlight WCF library to integrate with the WCF services and provide support to apps consuming that library. (as detailed in the last post)
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) A Silverlight management client to interrogate the Leader board service
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) An XNA WP7 game which records the players scores and lists the leader board for that game (could just as easy be a Silverlight game)

So over the next few posts (too much for just one I'm afraid), I'll detail the latter three of those items.

---

### The Leader board WCF service (AKA, Dark Omen Games Scoreboard service)

Hosted for you to complement this sample is the WCF Leader board service (how nice of us). We'll keep an eye on this to ensure it's not abused, so please play nice with it.

In this service we have two types of data:

> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Leaderboard definition - holds details of the Leader boards themselves and a variable to hold the list of Scores (leader board items)
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Leaderboard items definition - holds the details of all the scores registered for a leader board, including player names, the score they recorded and the time.

Using this data we expose several WCF methods to allow you to interact with it. One thing I will mention is that we have also implemented Data Contracts within the WCF services to offer a certain level of security, you don't have to do this of course, just remember this is a sample.

So within the WCF service, the methods we expose are:

> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Register New leader board
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Retrieve a listing of all leader boards
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Get the scores from a single leader board
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) update the scores of a single leader board

So all well and good, we have our service (no [WSDL](http://en.wikipedia.org/wiki/WSDL) I'm afraid, its a bog standard service)

---

### The Silverlight WCF library

Now as described in my last post, my preference is to write up all the Service integration code (especially since it's a shared Leader board) in a library so it can be easily reused in any game / app I wish.

This also makes sense as it is a lot easier to get a library working in an XNA project that it is to implement one in there (at least in the Beta).

The library it 'self is made up of a few components, namely:

> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) A service reference detailing the WCF service we are consuming
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) A view model of the data definitions within the service (or at least my poultry attempt at a view model, something I need to read more on, but it's working)
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) A set of event definitions to be exposed by the library (necessary as the phone uses only Asynchronous services)
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) A library of functions to do all the legwork of talking to the services and retrieving data

Sounds simple, good, then were on the right track.

No idea what any of this means yet, worry not as I'll explain further!

---

### Start your engines!

Right at this point you have several options, none of them wrong. You can create a new Silverlight library project (Windows Phone Class Library, under Silverlight for Windows Phone) solution and then add that to your existing game / app later. You could just add a new Silverlight Library to your existing App / game or even just start completely fresh, it's up to you. Just start making the project in "Microsoft Visual 2010 Express for windows Phone", not blend at this point.

However you do it, you should have a nice new library project setup, ready and waiting to be serviced!

#### 1. First the test run

> First off, and this might sound strange, but build your project as it is. Either by hitting F5 or F6, just so it's compiled. This just ensures that the project is healthy. If you have just a library project on it's own in your solution you might get a warning about not being able to run a library, but fear not.

#### 2. Adding the Service Reference

> Next up is adding the service reference, in a Silverlight project (or any other really) this couldn't be simpler. In the solution explorer, right click on the References folder and select "Add Service Reference"
>
> Once you have done that you will be presented with the following screen. Simply enter the Dark Omen Games sample Leader board service address in to the address field and click Go. This will set Visual Studio to the task of discovering the service and interrogating it for the methods it exposes.
>
> Once it's found the service (if you hare having trouble, type the address into your web browser and ensure you can reach the address, check your network settings if you are having trouble. or your firewall if you are at work!), then Enter the namespace for the service, as you can see I've chosen something nice and descriptive. You don't have to set a name, you can just leave it at the default "ServiceReference1".
>
> Now don't click OK just yet. another trick I've found is that it's best to be prepared when using web services with the WP7, so click on the Advanced tab and you should see the following screen:
>
> Here you can see the flag for "Generating asynchronous operations" is checked and the control disabled 9as described in the last post, the phone only uses Asynch operations and does not even generate synchronous methods in the proxy (which you can in XNA projects, so hopefully that's just an oversight and they will fix that)
>
> Next, as our webservice also implements Data Contracts, we must check the "Always generate message contracts" checkbox, just so we can work correctly. If you don't implement data contracts you may not need this (however I suggest you read up on it as I am not sure, I have always used this whether the service implements contacts or not, just to be sure!)
>
> now click on OK (and Ok again ;)) and after a few minutes whirring, the newly generated Service reference and it's proxy code will appear in the solution explorer under a new branch of "Service References"
>
> The other things it adds are several references required for the Service reference to work properly and the all important (if you read the last post) ServiceReferences.ClientConfig file!
>
> Right, so we have are service now, were done aren't we, right?.
>
> Wrong ;), still more to do here.

#### 3. A simple view model

> Now I'm not going to go in to too much detail this because it's not my strong suit. Like any other developer newly venturing in to undiscovered territory, I do the only ting that makes sense. Copy someone else's code and make it work.
>
> in this case I took the sample view model from the default "List and Details" phone Silverlight project and customised it for my own means.
>
> As I see it, the view model just creates a set of classes to describe your data that uses the "Observable" set of attributes to make it as easy to understand as possible though reflection. To know more about view models, check the MSDN library for help or the many MVVM or MVM tutorials out there.
>
> So to make this code light on the sample here, just download the same code above and copy the "View Models" folder from the project into your own and rename the Name Spaces in the classes within to that used in your own library (Copy the name space definition from the default Class1.cd file).
>
> Looking though the class files, you should see the following basic structure:
>
> So basically we have a Leader boards collection, which holds a list of leader boards, which in turn holds a collection of leader board entries (scores).
>
> The model is however broken in half really, as the Leader boards collection can be retrieved by anyone but to retrieve either an individual leader board or a list/single leader board entry, you must provide the security key for that leader board. More on this later.

#### 4. The Leader board class event library

> Now as the WCF service operates asynchronously, then the service must be able to operate asynchronously. Now for XNA app's this is not a problem as it is continually looping so it could keep checking the Leader board library to see if it's finished or not. However, Silverlight is event driven, which means something must happen for it to check or do something, so to handle this I implemented some events into the leader board library (this is just my implementation, if you have another preferred way, then use it. As [Rob Miles](http://www.robmiles.com) says, there are always many solutions to any given problem and if possible they should all be discussed down the pub). if you haven't implemented events before (or have forgotten how to like I did), then the MSDN library has a wealth of information about it, [see here](http://msdn.microsoft.com/en-us/library/17sde2xt.aspx).
>
> But to have events we need event arguments (the information we are going to pass and handle as part of our event), so create a new class in your project folder and call it "LeaderBoardEvents.cs".
>
> Next here's the code for that class:
>
> ```csharp
> public class LeaderBoardReceivedEventArgs : EventArgs
> {
>     private LeaderBoardViewModel viewModel;
>
>     public LeaderBoardReceivedEventArgs(LeaderBoardViewModel ViewModel)
>     {
>         this.viewModel = ViewModel;
>     }
>
>     public LeaderBoardViewModel LeaderBoard
>     {
>         get { return this.viewModel; }
>     }
>
>
> }
>
> public class LeaderBoardsReceivedEventArgs : EventArgs
> {
>     private LeaderBoardsViewModel viewModel;
>
>     public LeaderBoardsReceivedEventArgs(LeaderBoardsViewModel ViewModel)
>     {
>         this.viewModel = ViewModel;
>     }
>
>     public LeaderBoardsViewModel LeaderBoard
>     {
>         get { return this.viewModel; }
>     }
> }
> ```
>
> Here we have two sets of arguments, one to handle when a Leader board has been received from the web service and one to handle when a collection of leader boards has been received (provided you asked fro them in the first place)

> Each uses the portion of the View Model that is applicable to the type of data they are handling. Not much more to say about this at this point. More about the event implementation in the next section.

#### 5. The Core - The Leader board class

> Right, now this is where things get serious for the Library, the core of this little planet.
>
> Either create a new class or just rename the default "Class1.cs to something more meaningful, I called mine "LeaderBoard.cs" and renamed the class inside to "LeaderBoard", makes sense?
>
> First thing we need to set up is our WCF client, for this we simply declare it as part of the class definition, when the class is created the client is initialised, as follows:
>
> ```csharp
> private LeaderBoardService.LeaderboardClient service = new LeaderBoardService.LeaderboardClient();
> ```

> This uses the Service reference we created earlier, defines a new Client which I've called "service" and instantiates it, job done. Initially I was doing this at the point of request but after a little refactoring, it only needs setting up once (common sense really)
>
> Now we can start setting up our functions to call the WCF methods. The following is what we need to expose and react to what our WCF service offers, for each method this breaks down in to:

> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) The WCF request function - Main request function to call for or send data
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) The WCF response function - Receives and processes the Asynch response from the WCF service
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) The local View Model storage for the request - Here just to keep the local processing in house for the library
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) The Delegate Definition for the response - Part of the event system to pass the event data out
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) The public event for the response - The exposed event from the library so that client applications can hook on to it and react to responses, critical for Silverlight
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) The Function to instantiate the Delegate event - The internal method called to fire off the public event

> Sounds like a lot but it doesn't actually work out that way, the two big boys are the Request and Response functions and the rest just surround and help these functions out.
>
> So first off the Request function:
>
> ```csharp
> public void GetLeaderBoards()
> {
>      try
>     {
>         LeaderBoardService.LeaderboardRequestDataContract request = new LeaderBoardService.LeaderboardRequestDataContract();
>
>         request.AuthObject = new LeaderBoardService.AuthorizationDataContract();
>         request.AuthObject.Owner = "CRTH";
>
>         service.GetAllBoardsAsync(new LeaderBoardService.GetAllBoardsRequest(request));
>
>         ResponseReceived = false;
>     }
>     catch { }
> }
> ```

> The GetLeaderBoards request is the simplest in the library, walking this through, we:
>
> 1. We first set up the Data Contract which details both the authentication and parameters we want to send to the WCF service. In this case we are requesting all Leader boards for the Owner named "CRTH"
> 2. Then we send the Asynch request to the service containing our Data Contract.
>
> So our request is sent on it's way, next we need a way to capture the response when the WCF service sends it back, we do this by creating a hook on to the Completed event for the service and define a function to process the response. Now there are two ways of doing this, if you are writing them yourself, then it's better to harness the power of intelsense in visual studio. If you start typing the event you are going to hook on to like this and add the characters "+=" (which is how you hook on to events):

> ```csharp
> service.GetAllBoardsCompleted +=
> ```
>
> Which is the event exposed by the WCF service to tell a client when it is ready to send a response back. Visual Studio understands you are trying to hook on to an event and does this:

> It automatically knows from the event what type it is and if you press tab at this point it fills in the code for you, if you press Tab again:

> It will even go as far as generating a new function for you, like so:
>
> ```csharp
> void service_GetAllBoardsCompleted(object sender, LeaderBoardService.GetAllBoardsCompletedEventArgs e)
> {
>     throw new NotImplementedException();
> }
> ```

> Nice eh, and just so you don't forget to put some code in that response, it will throw an exception (which will halt your code in debug mode).
>
> However, I've already done all the hard work for you, so just add the following to the LeaderBoard class constructor:
>
> ```csharp
> service.GetAllBoardsCompleted += new EventHandler<LeaderBoardService.GetAllBoardsCompletedEventArgs>(service_GetAllBoardsCompleted);
> ```

> And add the following function after the "GetAllBoards" function:
>
> ```csharp
> void service_GetAllBoardsCompleted(object sender, LeaderBoardService.GetAllBoardsCompletedEventArgs e)
> {
>     try
>     {
>         if (!ResponseReceived)
>         {
>             ResponseReceived = true;
>             LeaderBoardService.LeaderboardsResponseDataContract response = (LeaderBoardService.LeaderboardsResponseDataContract)e.Result.GetAllBoardsResult;
>
>             leaderBoards = new LeaderBoardsViewModel();
>
>             foreach (LeaderBoardService.Leaderboard leaderboard in response.Leaderboards)
>             {
>                 leaderBoards.AddLeaderBoard(new LeaderBoardViewModel() { Name = leaderboard.Name, Owner = leaderboard.Owner });
>             }
>
>             LeaderBoardsReceivedEventArgs args = new LeaderBoardsReceivedEventArgs(leaderBoards);
>             OnLeaderBoardsReceivedEvent(args);
>         }
>     }
>     catch { }
> }
> ```

> So whenever we request all the Leader boards, thanks to the delegate attached to the event, the Response function (GetallBoardsCompleted) is called.
>
> In this response function, we:
>
> 1. Deconstruct the response in to a Response data contract
> 2. Set/Reset the internal ViewModel
> 3. Take the Leaderboard definitions from the response and add them to the ViewModel (there may be a more elegant way using ViewModels to do this, but it worked for me)
>
> Now around this are two things, first you should notice a variable called "ResponseReceived". This is a little check to ensure for every one request, we only get one response. Sounds simple but sometimes with the way networks work, we can get multiple responses for each request (call it the resilience of the net). So we just check that once we have received a response, we ignore any others until we actual ask for one again.
>
> The other additional thing I skipped over was the event that we generate from the Library. So far the library is doing all the talking and since it is within the library there are no problems accessing the data. However for an application consuming this library, we need a way to let it know we have something to offer back once we have received a response to their request. Sounds funny but there you go.
>
> So like we attached to the event of the WCF service, we also define an event for our library to let other applications that we have received and processed a request and they can now have the response back. (you may ask why not just have the other application hook on to the WCF service completed event and then grab the data from the library, simple reason is that the data must be processed first and this could take some time, so better to let the library finish before the app gets the data back).
>
> So first lets take a step ahead and I'll come back to this line.

#### 6. Events and Delegates for the Library

> Now as with anything else mentioned here, this isn't the only way, but it's the cleanest way I know. In order to expose data returned from the service by the library, the best way to do this is through a delegate and by using an event we can control when this will happen.
>
> So in Part 4 we defined out Event arguments and in the case of the "GetAllBoards" call, we are returning a ViewModel that contains a list of leader boards, the LeaderBoardsViewModel.
>
> So using this definition, in the header of the class we setup two things, first the event delegate using the event argument type:
>
> ```csharp
> public delegate void LeaderBoardsReceivedEventArgsHandler(object sender, LeaderBoardsReceivedEventArgs e);
> ```

> And also the public event we wish to expose:
>
> ```csharp
> public event LeaderBoardsReceivedEventArgsHandler LeaderBoardsReceivedEvent;
> ```

> Next we need an internal function to put these two together, so that when it is called, the event is fired and the data is made available through the delegate for any client subscribed to the event. Simple function which looks like this:
>
> ```csharp
> protected void OnLeaderBoardsReceivedEvent(LeaderBoardsReceivedEventArgs e)
> {
>     LeaderBoardsReceivedEvent(this, e);
> }
> ```

> To close all this up we return to the code we skipped over in the Response function:
>
> ```csharp
> LeaderBoardsReceivedEventArgs args = new LeaderBoardsReceivedEventArgs(leaderBoards);
> OnLeaderBoardsReceivedEvent(args);
> ```

> Here we define a new event argument, pass the return data into that argument and then pass on to the event.
>
> The end result is like this:
>
> 1. Client subscribes to the Library "Completed" event
> 2. Request function is called
> 3. Library processes the request and calls the WCF service
> 4. When the WCF responds this is passed to the response function (because we attached the response function to the service completed event)
> 5. The Library processes the result and then fires the Library "Completed" event
> 6. The Client responds to this and receives the data back through the delegate
>
> Strange little handshake, but it is safe and doesn't cause issues.

---

### Keep it secret, Keep it safe

In the sample the rest of the services are also defined in much the same manor. There are a few little differences, the main one being that of Authentication. With the GetLeaderBoards function, we just ask the service for any boards owned by you.

However for the rest of the services, we supplement the Data Contract with additional information, such as the name of the leader board we are dealing with (retrieved from the GetLeaderBoards function) and an authorisation key. This key however is not passed by the service, it must be provided, this is a poor mans attempt at a kind of Public Key infrastructure to protect the leader boards.

Put simply the keys only exist in two places, on the database where the leader boards are hosted and another copy in the applications that use those leader boards.

For this Library, we do this by simply maintaining a list of keys and interrogate that list when we want to request a specific leader board or update the scores in a leader board. in the sample, I have provided two of the keys for the three leader boards currently on the hosted service. If you try to request one the app doesn't have a key for, it will show you a simple (very) error screen. If you change the key in the code and request a leaderboard with an incorrect key, the same will happen. The two must match for the leader board to be used successfully.

---

### Try, try and try again

Now one other thing to mention in the library, is that it is littered with try catch statements around all the WCF request and response code. Main reason for this is that the internet is unreliable at the best of times (shock horror and awe I hear!).

Now what happens is that if a WCF call is unsuccessful or times out it is not your code that fails, it is the Service Reference code and it never ends well. SO to ensure your application stays nice and friendly for your customer, you need to handle it well.

You might try retrying a few times, or offer the user a "retry" button, or other measure. I however have done none. (sorry but there's only so much I can add for a sample, the rest is down to you)

So as with all good samples, there is still stuff to do and you can go further to manages such features within the library itself

---

### And finally, to dispel some myths (well one at least)

Now one thing I found in all samples scattered around the internet for using WCF services on the WP7 (granted there may be many many others I have not seen), all state you need the following definition in order to use WCF:

```csharp
System.Uri uri = new Uri("http://dogleaderboard.xna-uk.net/LeaderboardService.svc");
// Create a HttpWebrequest object to the desired URL.
HttpWebRequest myHttpWebRequest1 = (HttpWebRequest)WebRequest.Create(uri);
```

Where you must create a new HttpWebRequest channel in order to instantiate web communication, however (at least in the Beta and on the Emulator) after some radical refactoring while finishing this sample post, **I found this to simply not be true**. It's not even needed at all.

Whether this is down to the fact that WCF creates it's own channel, or the Beta automatically creates a channel, who knows. As stated this could be just because I am using the emulator.

I will be determined to re-test this at the [XBLIG-UK event on September the 1st](http://xna-uk.net/blogs/randomchaos/archive/2010/08/17/xblig-uk-xna-uk-ug-super-duper-prize-give-away.aspx), thanks to [Paul Foster bringing his not so little bag of tricks](http://wotudo.net/blogs/wotudo/archive/2010/08/25/wp7-dev-lab-in-a-box.aspx)!. Based on the results of that I shall update this post, so keep watch.

---

### Conclusion

Now a library on it's own doesn't really offer much unless you are a very determined developer and know how to consume this kind of library.

You can certainly try while I'm writing up the next part in this 3 part sample, as all you need to do after following the instructions in the last post and attach the library to your project is:

> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Hook on to the Completed event for the method you are calling and generate a delegate stub function
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Call the request method
>
> ![Bullet arrow](/assets/img/recovered/2012-06-29-can-we-get-a-little-service-here/020.png) Handle the response in your delegate stub function to present the data however you see fit.

Don't forget to add references to the library and copy over the Client Configuration file (for Silverlight) once you have added it to your project.

As a glimpse of what is coming next, see here (all data served by the Free hosted Web service for you):

And if you don't like the UI, just remember it's a sample after all and I am only a lowly programmer (I'll have to stop calling myself a developer because I can not design good looking screens to save my life), so Programmer Art / Style.

It's late now so I'd better make a cup of tea for the wife!
