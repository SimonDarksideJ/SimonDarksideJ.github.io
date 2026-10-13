---
layout: post
title: You are the controller – a step in to WP7 -> Win8 networking
date: 2012-07-18 15:36:59
tags: [networking, windows phone, windows 8]
---

I couldn't resist, I should be working on my Windows 8 Port of Flipped (which seems to be going swimmingly) and finishing of some other projects but glamour got the better of me as I rolled out of the covers and here we are.

One of my age old dreams with game development (even prior to XNA) was to be able to pick up my mobile device and use it as an alternate display or additional controller, at the time it was my trusty Windows Mobile PPC, times have evolved but my vision is still fresh.

I did for a time consider doing it between Windows Phone and a desktop PC and when we were doing Vequencer we did experiment with that.

Now Windows 8 enters the world and all the gloves are off, here we have two complementing platforms (even more so come Windows Phone 8?), a fresh stage to evolve my dream.

*P.S this is my first attempt blogging with Word as Live essentials and more importantly Windows Live Writer are on my Win 7 image and I'm deftly trying to write this from Windows 8*

Source for the post can be found here on codeplex - [http://bit.ly/NxxVLb](http://bit.ly/NxxVLb) (need a better home for my new blog samples)

## **\*NOTE**

Before I forget and if you run into issues with the code REMEMBER, UDP networking isn't supported on the WP7 Emulator or the Metro Simulator.  Both need to run on a device or in the case of Win 8, on a PC in order for the networking to work.  A lesson hard learnt during the testing of Vequencer :D

---

## The Goal

|   |   |   |
| --- | --- | --- |
| ![Windows Phone 7 client app with a Send Message button and Channel Joined status](/assets/img/wordpress/2012/07/071812_1536_Youaretheco13.png) | ![Double headed arrow showing two way communication](/assets/img/wordpress/2012/07/071812_1536_Youaretheco23.png) | ![Windows 8 app with Connect and Send buttons and an empty output area](/assets/img/wordpress/2012/07/071812_1536_Youaretheco33.png) |

Just for this little demo I'll walk you through the nuts and bolts on getting these two platforms to talk to each other, but since were using UDP Multi-Cast it could just as well be any client!

So here were just going to send a simple text message between clients and each client will show up those messages.

---

## The WP7 client with thanks to "UdpAnySourceMulticastChannel" lib

Back when we did Vequencer we went through all the networking samples looking for the best way to hook up multiple Windows Phone devices (Well actually Matt Lacey @MrLacey did) and eventually settled on UDP, with that buried in one of the MS samples was a nice little helper / wrapper lib to get you going called the "UdpAnySourceMulticastChannel" lib.

In short this just wrapped up all the necessary work for getting a "UdpAnySourceMulticastClient" going and functions to send and receive messages all nicely wrapped in a single class (well almost). I'm not going to post that here as you can find it in the sample.

Its use is oh so simple with that in place.

First set it up and hook up the necessary events:

```csharp
private void CreateChannel()
{
 this.Channel = new UdpAnySourceMulticastChannel(GroupAddress, GroupPort);

this.RegisterEvents();

this.Channel.Open();
}
```

Then sending a message becomes as easy as:

```csharp
Channel.Send("Message from remote {0}", "client");
```

Receiving messages just means handling the PacketReceived event thus:

```csharp
void Channel_PacketReceived(object sender, UdpPacketReceivedEventArgs e)
{
 NotifyUser(string.Format("Message Received : {0}", e.Message));
}

//Prompt the user on screen
private void NotifyUser(string message)
{
 TextBlock textbox = new TextBlock();
 textbox.Text = message;
 textbox.Foreground = new SolidColorBrush(Colors.White);
 Messages.Children.Add(textbox);
}
```

Here I just update the UI with any text I receive from other machines, check out the rest of the source for more details or an in depth look at how the "UdpAnySourceMulticastChannel" is handling network traffic.

So that's the WP7 client which is very basic, now for the main event.

---

## Windows 8 Networking and documentation rant

Now one of the things I'm genially impressed with is the documentation and samples that are available, unfortunately it is also one of my biggest gripes. Yup there's a lot more content and more samples than you can shake a reasonably large stick at for the marority of the common tasks you'll need to do in Windows 8, so for 80% of people you'll sail through no problem.

See the "DatagramSocket" networking sample here - [http://bit.ly/MIJbzH](http://bit.ly/MIJbzH) ( create a listener socket and start it up / create a server socket and send messages all using a DataWriter and DataReader to handle the stream data) - see the sample for more info

HOWEVER, where it falls down is just in-between the cracks, although there is full documentation for this networking scenario, there is NONE for the surrounding scenarios that have functions, one of these is UDP multi-cast networking, which is essential for local play scenarios like I'm doing here, but with help and some hints ([http://bit.ly/MIJxXl](http://bit.ly/MIJxXl)) I finally got there.

Alas the documentation also doesn't mention the capabilities your app needs to subscribe to in order to work (they are off by default), so if in programming Windows 8 and hit the notorias error "Access Denied", no you did nothing wrong you just forgot to tell windows you needed to do that. Just double click the "Package.appxmanifest" and enable the capabilities you think you need (suck and see!), those coming from Windows Phone will be used to this (kind of), those new to Metro better get reading!

\[/rant\]

---

## UDP Networking the easy way

So to run this down to the short short version, here's the walkthrough for UDP networking under Windows 8, first off as with most fire and forget networking we need the socket we are going to talk with and a DataWriter to pack the data to send:

```csharp
DatagramSocket socket;
DataWriter writer;
```

Next we just need to initialise them and get them ready to use:

```csharp
socket = new DatagramSocket();
socket.MessageReceived += ListenerMessageReceived;

// Start listen operation.
try
{
 await socket.BindServiceNameAsync(GroupPort.ToString());
 socket.JoinMulticastGroup(GroupAddress);

var stream = await socket.GetOutputStreamAsync(GroupAddress, GroupPort.ToString());
 writer = new DataWriter(stream);

}
catch (Exception exception)
{

// If this is an unknown status it means that the error is fatal and retry will likely fail.
 if (SocketError.GetStatus(exception.HResult) == SocketErrorStatus.Unknown)
 {
 throw;
 }

NotifyUserFromAsyncThread("Start listening failed with error: " + exception.Message, NotifyType.ErrorMessage);
}
```

Now a few points on the above code:

- It's mandatory to bind the "MessageReceived" event after initialising the DatagramSocket, if you don't it will just crash. You don't have to handle anything, it can just be an empty method but you must bind it.
- The function you put this in as to use the "async" handler as almost all calls in Windows 8 are "awaitable" functions you should know about this already (too big to go in to here)
- Before joining a multicast session or even a standard connect you HAVE to bind the socket to a type of endpoint, here I'm using the "BindServiceNameAsync" function and passing it a pre-set Multi-cast address
- Then you just need to initialise a DataWriter to use the output stream from the Socket and your good to go

Well almost.

Here's where two things caused me to spend practically all day and a few hairs on this:

1. First and foremost, you need additional "capabilities" enabled in your application to do this, after playing with a few I settled on the "Home or Work Networking" capability as shown below:

![Visual Studio manifest designer with the Home or Work Networking capability ticked](/assets/img/wordpress/2012/07/071812_1536_Youaretheco4.png)

2. Next was the DataWriter initialisation, you'll note from the code above I don't just pass it the output stream from the socket direct, you HAVE to initialise it first because you ar using UDP multicast. (you don't have to do this with normal sockets!) - Is this documented, hell no (hence the rant). So in reality you have to initialise the stream passing in the UDP end point address and the Port that you want to broadcast over (I'm using address "224.225.226.227"

and port "54345"), then you can initialise the DataWriter using this new stream.

After that it gets more normal, to send a message just do the following:

// Write first the length of the string as UINT32 value followed up by the string. Writing data to the writer will just store data in memory.

```csharp
// Write first the length of the string as UINT32 value followed up by the string. Writing data to the writer will just store data in memory.
string stringToSend = "Hello";
writer.WriteString(stringToSend);

// Write the locally buffered data to the network.
try
{
 await writer.StoreAsync();
 NotifyUserFromAsyncThread("\"" + stringToSend + "\" sent successfully.", NotifyType.Info);
}
```

Where you load test into the buffer of the DataWriter and then when your finished just flush the buffer using the "StoreAsync" method which will transport it away at the speed of gerbils.

Only other Caveat to be aware of is that all return calls from the networking calls need to be threaded safely back to the UI, for this I implemented a simple dispatcher method to wrap my call to update the screen thus:

```csharp
private void NotifyUserFromAsyncThread(string strMessage, NotifyType type)
{
 var ignore = Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => NotifyUser(strMessage, type));
}
```

In the source there are a few other snidbits to make things pretty, most of it is ripped straight out of the DataGram Socket sample, with a few tweaks to fit it into one page (I like the sample screens for how they look and feel, but trying to rip them up to actually use is a nightmare, should be a separate single sample doing it all to make it easier to consume)

---

## To be Continued

I'll revisit this topic in the not too distant future. I did intend to show a nice fully working graphical sample showing people playing card and the tablet being the deck (going all smartglass like) but as you can see I spent far too long just getting this all to work.

Onward

Source for the post can be found here on codeplex - [http://bit.ly/NxxVLb](http://bit.ly/NxxVLb)
