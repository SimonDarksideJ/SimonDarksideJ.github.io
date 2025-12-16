---
layout: post
title: Intel Perceptual computing and the Perceptual challenge
date: '2013-08-17 17:10:55'
tags: [competitions, intel]
---

![src=]()

Not so long ago Intel launched their new perceptual computing vision which effectively is a cheaper alternative to Microsoft Kinect sensor, alongside that they began a challenge to create some inventive apps using the camera and to a select few (about 125+ developers) they offered the chance to win and own one.  I entered 3 different apps into the challenge and to me surprise all three got accepted (only got one camera though ![Open-mouthed smile](/assets/img/wordpress/2013/08/wlEmoticon-openmouthedsmile1.png))


# The camera

The camera is a very interesting device both smaller and lighter that the Kinect plus cheaper too (although that gap is narrowing with the upcoming release of Kinect V2 coming soon and dropping prices of the V1), the camera supports both visual inputs and voice recognition in a very neat package.

| [![WP_20130722_002](/assets/img/wordpress/2013/08/WP_20130722_002.jpg "WP\_20130722\_002")](/assets/img/wordpress/2013/08/WP_20130722_002.jpg) | [![WP_20130722_003](/assets/img/wordpress/2013/08/WP_20130722_003.jpg "WP\_20130722\_003")](/assets/img/wordpress/2013/08/WP_20130722_003.jpg) |


# The SDK

Several platforms are supported out of the box with the SDK, its native language is C++ but several other wrapper versions have been released including:

- C#
- Unity
- Java

Sadly the SDK is not the best I have used and its C++ roots run very deep, there are a lot of hoops to jump through just to get an image from the device (supports Depth / Colour and Mask images) let alone get inputs from the sensors.

The SDK does feel more like a driver than an actual SDK so may feel more at home to native C++ developers (fine if that is how you cut your bread)

Me being Me however I did not stop there so i created my own manager library to interface with the device for my own projects/


# My Manager Library

Building on my years of XNA experience I have made a wrapper of the wrapper library to make each of the modes the camera has into distinct components that are simply initialised and once running you just grab each of the outputs for use.  The library is opensource and can be found on Github here:


#### [https://github.com/DDReaper/MonoGame-IntelSDK](https://github.com/DDReaper/MonoGame-IntelSDK)


# Back to the competition

My three entries were both one’s I could achieve within the competition deadlines and stretched me enough to get dabbling:

- The Lightning machine – those who follow my blog should recognise my favourite sample getting dusted off again
- A block stacking game in Unity
- A car racing game using the camera as the steering wheel

The list almost got reduced to one due to time constraints and even then it was looking like I was running out of time (then they extended the deadline ![Open-mouthed smile](/assets/img/wordpress/2013/08/wlEmoticon-openmouthedsmile1.png)), so today I have managed to publish (with the help of my handy helper lib) my first app and it has been published to the competition, so now I can get back on track with my main project.

[![Blink_bc437e84-4fad-4f9a-9280-717800df4f33_5_2013-08-17](/assets/img/wordpress/2013/08/Blink_bc437e84-4fad-4f9a-9280-717800df4f33_5_2013-08-17.jpg "Blink\_bc437e84-4fad-4f9a-9280-717800df4f33\_5\_2013-08-17")](/assets/img/wordpress/2013/08/Blink_bc437e84-4fad-4f9a-9280-717800df4f33_5_2013-08-17.jpg)

My two daughters playing with my first creation

To see the lightning demo in action (as part of the comp this was required) I have created a demo video of it in action, creating it was certainly fun and challenging (the sample not the video :P).

<object width="448" height="252" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="src" value="http://www.youtube.com/v/CEUjkvGFvJ0?hl=en&amp;hd=1">
<embed width="448" height="252" type="application/x-shockwave-flash" src="http://www.youtube.com/v/CEUjkvGFvJ0?hl=en&amp;hd=1"></embed></object>

Intel Perceptual computing challenge entry 1: the lightning machine

So back to the grindstone, although now the challenge has been extended I may spend more time with the opensource library to improve it and perfect the racing controller I will need


# Further posts

When I get time I will do some further posts about the SDK and the library I created.  Oh time you elusive beast 😀

