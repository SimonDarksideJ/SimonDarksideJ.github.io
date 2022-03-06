---
layout: post
title: Unity Multiplayer Games - A Review
date: '2014-02-12 15:37:07'
tags:
- book-review
- networking
- packtpub
- unity3d
---

It seems the strength of Unity holds no bounds of late going from strength to strength, yet for all the books and tutorials I have seen to date, none have gone beyond the editor itself, so it is nice to see a title address a key factor in modern games, networking.

[![ src=]()](http://bit.ly/1ct8u9F)

###### [Unity Multiplayer Games](http://bit.ly/1ct8u9F)

Adding multiplayer into any game increases its effectiveness and likeability, so many players want not to just play on their own but to engage and compete with others, with [Unity3D](http://unity3d.com/) being available on just about every games console out there this demand is higher than ever.  Granted on mobile platforms it is a nice to have but on consoles it can make or break a game.

* * *

![src=]()

It is refreshing to finally see a book not just about the Unity3D editor or a particular feature and scripts (granted not many shader titles yet?), this title takes us deep into the networking underbelly of Unity, peering through the cracks and examining the white space between one players game and another.

The best way to educate developers with networking is with examples and the book does not disappoint here, expect genre after genre of titles to test your networking skills on, from plain old local UDP, to setting up master servers and managing the whole networking story, in a Unity3D way.

 

Onwards.

* * *

![src=]()

Here is a brief run through what all the chapters are and what to expect from them:

###### Chapter 1 “Unity Networking”

A beginning is a great place to start, walking through this chapter you will setup an entire local networking game between two clients on the same local network and walkthrough all the necessary steps to make the most out of Unity3D’s in built UDP networking support.

The attention to detail in this chapter really stands out as it lays the groundwork for how Unity3D does things with regards to its networking support, including how to setup servers and clients (even a nod to dedicated servers) and marshal the network traffic accordingly.

###### Chapter 2 “Photon Unity Networking”

PUN (or Photon Unity Network)  is an online service which provides multiple levels of support to games and surprisingly the basic client and backend service is free (to a point), the Author picked a really good example of a cloud game networking provider to build a well-rounded example.  Starting off small the author goes through all the basics of connecting to the service and discovering the capabilities that have been enabled for a game.

Particular attention is made to the slightly more advanced features such as lobbies, chat rooms and finding friends on the service.

###### Chapter 3 “Photon Server – Star Collector”

SO as not to lure you into picking an external service over what Unity3D gives you for free, here the author takes a step back and gives you a comparison between PUN’s offerings against Unity3D’s standard implementation.  With that set, here we start building a full client game and plugging together all the components discovered in the previous chapter.  All aiming towards building a more dedicated networking game called Star Collector.

###### Chapter 4 “Player.IO – Bot Wars”

Another reasonably priced service is Player.IO which is available for unity operates on a similar model to Photo but has some other engaging features such as BigDB (a data persistence backend for saving game data) amongst other things, in this chapter the author goes over the competitive differences between Photon and Player.IO and proceeds to build a nice simple RTS style game, making use of Player.IO’s framework.

###### Chapter 5 “PubNub – The Global Chatbox”

In a change of track, in this chapter the author covers an alternative system for some more basic networking systems.  For features such as chat or in game notifications where speed is not really an issue there are services like PubNub out there which can deliver an effective framework.  It is keen to note that there is nothing that says you have to use a single framework to build the backend to your game, so mixing it up like this with alternatives is a great step by the author.  Here you will build an in game chat type system to discover how this all hangs together.  It also covers some of the basics around the www networking system within Unity3D.

###### Chapter 6 “Entity Interpolation and Prediction”

Now one thing that is missed by most developers when they are planning for an building their bug MMO game is latency and the rest of the pesky things that go wrong when two or more clients are talking to each other over the wire.  Sure you messages will most likely get from client to client, but when!. (phrases about buses spring to mind). Delving in to the deep underbelly of network prediction and crafting the communication in your game to tackle all the nasty stuff that goes on in the ether is the focus of this chapter. By the end you will be performance engineering your networking system like a pro.

###### Chapter 7 “Server-side Hit Detection”

As a final round up looking at networking patterns, the book delves into server side impact analysis. In most FPS style games bullets are flying everywhere and it is not practical for each client to control / manage all the hit detection going on, in scenarios like this we leverage routines on the server to manage this for us using techniques like entity rewinding.

###### 

* * *

![src=]()

This was a god balanced book showing not just implementable techniques but also some of the free/cheap cloud based services to support the networking infrastructure for your game.  There was a lot of detail but a fair few of the sections left me wanting or needed rounding up at the end.  However the book finished very well returning back to some core networking architecture sections and covering up those tricky spots newcomers would be unaware of until you shipped your game.

###### Pros:

- Shows other services and not just Unity or home grown code practices.
- A few good game frameworks with built in code to expand upon.
- Covers some of the trickier scenarios beginners will not be aware of

###### Cons:

- Only covers game networking and not general networking for items such as leaderboards, gaming services or asset/file downloading
- Sometimes leaves you feeling wanting at the end of a chapter with no clear guides for what is next
- Could have done with a little more Networking theory to discuss patterns and practices

* * *

![src=]()

This book does go a long way and despite some of its shortcomings it gets you almost to the end, a little more research and you would be very set for building your next MMO or online shooter (8 way pong anyone?)

If you are looking to make a multiplayer game with Unity then this title will help you down the path better than most and as Networking tutorials are a bit thin on the ground (and the docs in this area do not really help) it is certainly one to look at.

