---
layout: post
title: You are the controller – a step in to WP7 -> Win8 networking
date: 2012-07-18 15:36:59
tags: [networking, windows phone, windows 8]
---

I couldn’t resist, I should be working on my Windows 8 Port of Flipped (which seems to be going swimmingly) and finishing of some other projects but glamour got the better of me as I rolled out of the covers and here we are.

One of my age old dreams with game development (even prior to XNA) was to be able to pick up my mobile device and use it as an alternate display or additional controller, at the time it was my trusty Windows Mobile PPC, times have evolved but my vision is still fresh.

I did for a time consider doing it between Windows Phone and a desktop PC and when we were doing Vequencer we did experiment with that.

Now Windows 8 enters the world and all the gloves are off, here we have two complementing platforms (even more so come Windows Phone 8?), a fresh stage to evolve my dream.

_P.S this is my first attempt blogging with Word as Live essentials and more importantly Windows Live Writer are on my Win 7 image and I’m deftly trying to write this from Windows 8_

Source for the post can be found here on codeplex – [http://bit.ly/NxxVLb](http://bit.ly/NxxVLb "Post Sample") (need a better home for my new blog samples)


# **\*NOTE**

Before I forget and if you run into issues with the code REMEMBER, UDP networking isn’t supported on the WP7 Emulator or the Metro Simulator.  Both need to run on a device or in the case of Win 8, on a PC in order for the networking to work.  A lesson hard learnt during the testing of Vequencer 😀

* * *


## The Goal

| ![ /></td>
<td style=](/assets/img/wordpress/2012/07/071812_1536_Youaretheco13.png) ![width=](/assets/img/wordpress/2012/07/071812_1536_Youaretheco23.png) | ![ /></td>
</tr>
</tbody>
</table>
</div>
<p>Just for this little demo I’ll walk you through the nuts and bolts on getting these two platforms to talk to each other, but since were using UDP Multi-Cast it could just as well be any client!</p>
<p>So here were just going to send a simple text message between clients and each client will show up those messages.</p>
<hr />
<h2>The WP7 client with thanks to “UdpAnySourceMulticastChannel” lib</h2>
<p>Back when we did Vequencer we went through all the networking samples looking for the best way to hook up multiple Windows Phone devices (Well actually Matt Lacey @MrLacey did) and eventually settled on UDP, with that buried in one of the MS samples was a nice little helper / wrapper lib to get you going called the “UdpAnySourceMulticastChannel” lib.</p>
<p>In short this just wrapped up all the necessary work for getting a “UdpAnySourceMulticastClient” going and functions to send and receive messages all nicely wrapped in a single class (well almost). I’m not going to post that here as you can find it in the sample.</p>
<p>Its use is oh so simple with that in place.</p>
<p>First set it up and hook up the necessary events:</p>
<pre class=](/assets/img/wordpress/2012/07/071812_1536_Youaretheco33.png ">

private void CreateChannel()

{

 this.Channel = new UdpAnySourceMulticastChannel(GroupAddress, GroupPort);



this.RegisterEvents();



this.Channel.Open();

}

</pre>
<p>Then sending a message becomes as easy as:</p>
<pre class=")http://bit.ly/MIJbzH ( create a listener socket and start it up / create a server socket and send messages all using a DataWriter and DataReader to handle the stream data) – see the sample for more info

HOWEVER, where it falls down is just in-between the cracks, although there is full documentation for this networking scenario, there is NONE for the surrounding scenarios that have functions, one of these is UDP multi-cast networking, which is essential for local play scenarios like I’m doing here, but with help and some hints ([http://bit.ly/MIJxXl](http://bit.ly/MIJxXl)) I finally got there.

Alas the documentation also doesn’t mention the capabilities your app needs to subscribe to in order to work (they are off by default), so if in programming Windows 8 and hit the notorias error “Access Denied”, no you did nothing wrong you just forgot to tell windows you needed to do that. Just double click the “Package.appxmanifest” and enable the capabilities you think you need (suck and see!), those coming from Windows Phone will be used to this (kind of), those new to Metro better get reading!

[/rant]

* * *


## UDP Networking the easy way

So to run this down to the short short version, here’s the walkthrough for UDP networking under Windows 8, first off as with most fire and forget networking we need the socket we are going to talk with and a DataWriter to pack the data to send:

    

2. Next was the DataWriter initialisation, you’ll note from the code above I don’t just pass it the output stream from the socket direct, you HAVE to initialise it first because you ar using UDP multicast. (you don’t have to do this with normal sockets!) – Is this documented, hell no (hence the rant). So in reality you have to initialise the stream passing in the UDP end point address and the Port that you want to broadcast over (I’m using address “224.225.226.227”  
and port “54345“), then you can initialise the DataWriter using this new stream.

After that it gets more normal, to send a message just do the following:

// Write first the length of the string as UINT32 value followed up by the string. Writing data to the writer will just store data in memory.

    http://bit.ly/NxxVLb

 |

