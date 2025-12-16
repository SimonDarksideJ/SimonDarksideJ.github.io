---
layout: post
title: Injecting intelligence - Building apps using Microsoft Cognitive Services
date: 2016-07-03 18:03:27
tags: [events, machine-learning]
---

![image](/assets/img/wordpress/2016/07/image.png)

Technology it seems is moving ever faster and faster, especially in the world of Artificial Intelligence and Machine Learning.  Barriers to entry are breaking down and huge cloud offerings from all the major suppliers are popping up left right and center.  We see these on our devices (Siri, Cortana, Google Now), in our browsers yet to date, it is being used mainly for one thing it seems, Ads (joy).

So with the skill requirements at an all-time low, just about anyone can dive in and start making use of all the “intelligence” offerings that are available and start building the intelligent solutions for tomorrow.

* * *


# Enter Re:Cognition

One of the big things that brought this to the forefront for me was the Re:Cognition event (hosted by [Moov2](http://moov2.com/) and [Microsoft](https://www.microsoft.com/cognitive-services)), which was a large hack-a-thon style event aiming to get teams crunching on Microsoft’s new “Cognitive Services” offering, which is an entire suite of API’s with a plethora of features to bring intelligence in to your apps & games.  Best of all, these are all simply REST API endpoints, meaning they are available from anywhere and on any device so long as you have an internet connection.

 

![Microsoft Cognitive Services](assets/img/posts/image-not-found.png)

 

![Organised by Moov2 and supported by Microsoft](assets/img/posts/image-not-found.png)

The Event itself took place over a single weekend with the teams challenged to build what they could using Microsoft’s new Cognitive offering by whatever means necessary.  Additionally, several other devices such as Microsoft Surfaces, Microsoft Kinect, Intel Realsense camera’s and even some snazzy Spheros were loaned out freely to use (but not keep sadly however there were prizes for the most notable projects).

You can see some of the highlights here:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/DqD__aSmFqc" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

* * *


# Microsoft Cognitive Services

[![image](/assets/img/wordpress/2016/07/image-1.png "image")](/assets/img/wordpress/2016/07/image-1.png)

As you can see there are a multitude of different services available and the majority of which are even testable on the Microsoft Cognitive site using a simple test page harness (remember, these are all just REST API’s after all).

Each API is specific in its focus, ranging from:

- Emotion API’s which can sense what emotion a person’s face has from an image
- Bing Speech API which will take some recorded audio and turn it in to text (or vice versa) and deliver sentiment on the text
- Linguistic analysis which can learn to react and respond to text input, providing a high level of interaction between the user and some intelligence
- Search capabilities which can be customized and filtered to your services particular needs

There is so much more and a lot of content to dive through, HOWEVER most can be learned in a few minutes and once you have learned one, it is even easier to learn the next.

All the above was crucial for the Re:Cognition event as the “hackers” only had 24 hours in which to create “something”, with most devs not even being aware of the services capabilities or usage at the beginning.

 

And that is not all, each and every service has a free tier, so there is **NO COST** involved in getting started with any of these services. Just sign up, get your access keys and off you go.

* * *


# What has come before

The start point for most teams after a short brief and teachings on “how to be a better parent”, were the example applications that Microsoft and some community developers have created since the services were announced (previously known as Project Oxford). You can check out the full list of demo apps (some of which went’ viral a short while ago) can be found here:

[https://www.microsoft.com/cognitive-services/en-us/applications](https://www.microsoft.com/cognitive-services/en-us/applications "https://www.microsoft.com/cognitive-services/en-us/applications")

[![image](/assets/img/wordpress/2016/07/image-23.png "image")](https://www.microsoft.com/cognitive-services/en-us/applications)

And many many more! Check them out.

 

* * *


# On your Marks, Get Set, GO…

This was by and large a very brutal hack, mainly for the organizers and supporters (myself included) with the usual teething troubles of getting machines setup, devices connected and wires plugged.  One thing that every team did not have any trouble with were the Cognitive services themselves, those were simply a breeze.

Here is an example that you can walk through yourself as an example:


## 1:  Get on the services

Navigate to the Microsoft Cognitive Services site ([https://www.microsoft.com/cognitive-services](https://www.microsoft.com/cognitive-services "https://www.microsoft.com/cognitive-services")) and pick a service, for example the Computer Vision API:

[![image](/assets/img/wordpress/2016/07/image-2.png "image")](https://www.microsoft.com/cognitive-services/en-us/computer-vision-api)


## 2: Get your keys

If it is orange, click it.  Just click “Get Started for Free”, Click “Let’s GO” and sign in using your Microsoft account.  From here you can choose which API’s you want access to (select them all if you like ![Open-mouthed smile](/assets/img/wordpress/2016/07/wlEmoticon-openmouthedsmile.png)). For now, select the “Computer Vision – Preview” offering (shown below), click the “mandatory” I AGREE TO SELL MY SOUL (just kidding) Terms and conditions checkbox, decide if you want more information from MS (not mandatory) and then click Subscribe:

[![image](/assets/img/wordpress/2016/07/image-2.png "image")](/assets/img/wordpress/2016/07/image-3.png)

 

As you can see, it is a very generous window of opportunity with the API which is fantastic for developing with.

> Just remember NOT to share your keys or you might hit trouble.

Once complete you will be presented with the key management screen where you can grab your keys (you get two) and also view the usage of each service you have subscribed to.

[![image](/assets/img/wordpress/2016/07/image-3.png "image")](/assets/img/wordpress/2016/07/image-4.png)


## 3: Start your engines

Copy your key to your clipboard and let’s navigate over to the API documentation to see how they are used. Go back to the web address below and click on the “API Reference” button:

[https://www.microsoft.com/cognitive-services/en-us/computer-vision-api](https://www.microsoft.com/cognitive-services/en-us/computer-vision-api "https://www.microsoft.com/cognitive-services/en-us/computer-vision-api")

From here you can see all the API documentation for each of the endpoints for the service you have selected, sample URL’s, payload definitions and the all-important response packets full of interesting detail that the service returns:

[![image](/assets/img/wordpress/2016/07/image-4.png "image")](/assets/img/wordpress/2016/07/image-5.png)

You can peruse and learn how the service works, or (if you are like me) you can just jump in and see how it works.  If you click on the “Open API Testing Console” button (which most API’s have, although a few are still in the works or are to complicated for such a simple test harness) you will be navigated to a very easy to use web interface for the API:

[![image](/assets/img/wordpress/2016/07/image-5.png "image")](/assets/img/wordpress/2016/07/image-6.png)

As you can see, this is a very simple interface, in fact just to get going with the Computer Vision API you need only enter two things! Your API key (which should be in your copy buffer) and the URL to an image to scan.  Enter your key in to the nice red “_Ocp-Apim-Subscription-Key_” field first.

> \*\*Note the keys are not interchangeable between services.  If you enter a bad key or the key from another service, then you will get an “Access unauthorized” message when you try to call the service.  I lost count how many times that query came up on the night.

Next you will need to enter your request body parameters, which is just a simple Json string in the field below:

[![image](/assets/img/wordpress/2016/07/image-6.png "image")](/assets/img/wordpress/2016/07/image-7.png)

The image I chose was for a very happy chap in the park on a sunny day, I wondered what the service would make of this (ca not tell you how many API calls I burnt through looking for an interesting “Creative Commons” image)

![](assets/img/posts/image-not-found.png)


## 4: Checking your results

So off went the request, as I only asked it to specify **categories** for the image we supplied (be sure to check the API documentation for all the other parameters you can set to get more information about the content you submit) , once it was complete I got some interesting data back:

[![image](/assets/img/wordpress/2016/07/image-7.png "image")](/assets/img/wordpress/2016/07/image-8.png)

Nice, simple and easy to read and with the right JSON decoder, a very simple dataset to understand, but what is this telling us?

After the service analyzed the image it found three categories of information about the image and it also tells us the degree of confidence it has in that discovery, so we have:

- It has a 40% chance that there are people in this image, which seems fairly confident.  If you were writing a security app, this becomes very useful.
- It believes the shot is outdoors but with only a 0.39% chance that it is right.  But the fact it is there means it has some confidence
- It has also classified this has a 1% chance of being a general / others image.  To Be honest, I am not sure what this means, you’d need to look it up ![Open-mouthed smile](/assets/img/wordpress/2016/07/wlEmoticon-openmouthedsmile.png)

Granted this was only to categorize the images, if you repeat the above steps but this time use the “_Describe_” image endpoint (top left part of the screen:

[![image](/assets/img/wordpress/2016/07/image-8.png "image")](/assets/img/wordpress/2016/07/image-9.png)

Then we get a much more detailed about that Cognitive Services thinks about the image we are seeing ![Open-mouthed smile](/assets/img/wordpress/2016/07/wlEmoticon-openmouthedsmile.png)

[![image](/assets/img/wordpress/2016/07/image-9.png "image")](/assets/img/wordpress/2016/07/image-10.png)

As you can see, this is a lot more detailed and you even get the thoughts behind the services as to what you are looking at.  Starts to get very spooky does not it.

I like that the fact the guy is wearing a funny hat and that the API believes he is skiing. Close but no cigar.

Have a try with your own keys and various other images and see what you get back.

* * *


# Back to the competition

So, now you have a feel for what the teams had at their disposal, what did they come up with?  I can tell you now that even my wildest dreams did not prepare me for some of the potentially world changing solutions the teams put together, even those who did not manage to finish.  Well we saw the beginnings of solutions, this was only 24 hours after all.

> **You can check out all the results on Moov2’s YouTube page here: lot’s more going on behind the scenes –** [**https://www.youtube.com/user/Moov2com/videos**](https://www.youtube.com/user/Moov2com/videos "https://www.youtube.com/user/Moov2com/videos")

Be sure to also click on each of the images below to see the 3 minute presentation of each project.

 


### The sign language interpreter

One bold team of 4 stayed through most of the night (collapsing about 4am) had the bold dream of taking the vision set of API’s, mashing them together with a Microsoft Kinect to recognize a person doing sign language and then interpreting that in to English. In the short time they had, they managed to reliably recognize 3 words with a high degree of confidence, the team also had plans to tie in the Speech API’s in order to also speak the results back, but just ran out of time.  Given this was done end to end in less than 24 hours, is simply amazing:

[![image](/assets/img/wordpress/2016/07/image-11.png "image")](https://www.youtube.com/watch?v=5kI0jVdOBqg)

 


### Two men with beards and too much time on their hands

One of the most riotous teams who got the audience really stoked in their presentation, built not just one but TWO projects.  Their first app was a simple implementation of a “Beard or Not” system that could skillfully tell if the user in front of the camera had a beard or not (obviously very useful in some places). Given that this was “all too easy”, they then went on to make a game using the emotion API where the player had to express certain emotions for tiles that fell down lanes, the more you matched the higher your score (and it is not as easy as it sounds).  Best of all this just used their laptop’s built in camera so I hope to see this come out soon!  The crowd went wild on this one.

[![image](/assets/img/wordpress/2016/07/image-12.png "image")](https://www.youtube.com/watch?v=uy2J3b2d_Kc)

You do not score if you are not Angry ![Smile with tongue out](/assets/img/wordpress/2016/07/wlEmoticon-smilewithtongueout.png) you would not like me when I am not angry.

 


### Edward – The dreamer

Just to show that you can still win big when you go it alone at hacks, Edward rolled forth to tackle one of the biggest issues in work life, preventing you from venting at colleagues over email.  Using the Sentiment API, he built an entire google plug-in for Gmail which checks your email before sending and if it feels you are being too aggressive or nasty it will pop up and ask you to take five minutes / sleep on it before sending the mail for real.  This could seriously be a life saver for me in my office at times ![Open-mouthed smile](/assets/img/wordpress/2016/07/wlEmoticon-openmouthedsmile.png)

[![image](/assets/img/wordpress/2016/07/image-13.png "image")](https://www.youtube.com/watch?v=WGW_pCdHh_E)


### Movember is coming, are you ready?

Every year it seems lots of gentlemen (and some ladies?)  take the challenge to grow as much facial hair on your face as possible, however to date there has not been an accurate way to automatically grade the level of foliage present on a person’s face, until now!

Yet another lone dev built a full web app where users can submit their images and have the cognitive services grade and rank a person’s follicle growth on their mush, the winner walking away with a nice cool beer.  I have some suspicions through, as the current generation of the app could be fooled by having a dazzling lady holding a lanyard over your face in your pic ![Open-mouthed smile](/assets/img/wordpress/2016/07/wlEmoticon-openmouthedsmile.png)

[![image](/assets/img/wordpress/2016/07/image-14.png "image")](https://www.youtube.com/watch?v=gmaBz1cj3xU)

 


### Resisting the temptations of easy money

Now if you have a sufficiently advanced computer, a camera and two wicked brains, you mind might turn to the first project that this next team turned to. To use the advanced OCR and language recognition features provided by cognitive services and then pair then up with the Bing search API’s to build a program able of cheating at the quiz style pub machines, instantly giving you the answer to any question from a choice of 4.  The team swiftly dodged that likely unlawful bullet and then spent the rest of their hack coming up with a way to use the features they had already built to read children’s stories and extend them.  This pair of knights deserve special recognition for their gallantry and turning away from temptation.

[![image](/assets/img/wordpress/2016/07/image-15.png "image")](https://www.youtube.com/watch?v=eulmJQuGafQ)

 


### Your personal Jarvis – become your own Iron man (minus the suit)

Home automation always seems like a “nice thing to have” except that most offerings and projects only go so far.  However, this one man band had the grand ambition of paring up multiple devices and inputs, carefully interwoven with the cognitive services to produce a semi-intelligent home manager.  Capable of detecting your mood, controlling the lighting / music and even entertaining your pet for you (with the addition of a Sphero).  It can even construct its own speech letting you know it is looking after you and offering suggestions to perk up your day.  Future versions will also watch for your seating / walking position and offer handy tips to improve your general health.  Not sure whether to be excited or very very scared ![Open-mouthed smile](/assets/img/wordpress/2016/07/wlEmoticon-openmouthedsmile.png) Watch and listen to the video carefully.

[![image](/assets/img/wordpress/2016/07/image-16.png "image")](https://www.youtube.com/watch?v=HTlfVgwS_Po)


### Your food, your way, your choice

As one of the few teams who actually managed to go almost the entire night, this proud set of adventurers have obviously been to many parties where no one can decide what to order to eat. So they set forth their challenge to provide an interactive whiteboard to allow all people at a party to shout out that they would like to eat (recognizing individuals so you do not get duplicates) and then ordering the most popular item.  Almost acclaimed as the “Tinder for food” (which raised a few eyebrows) the team pulled off a working demo and then with minutes of sleep before the presentation showed their creation to the world.  Certainly a fun team to work with.

[![image](/assets/img/wordpress/2016/07/image-17.png "image")](https://www.youtube.com/watch?v=OJpWqNQ7CFw)

If you also check the intro video for the event, these were the culprits for the famous Ballmer and Gates boogie video, which they left running on the Surface Hub they had in their room. I still have gory flashbacks to that night because of this, grrr.


### Are you chatting to me?

Definitely going down as one of the teams with the most “on the spot” twitter prizes, mainly because every waking minute they spent on twitter. This team pulled together and even deployed an actual twitterbot which detects the emotion behind your tweet and then reply back to you accordingly.  They used and tested this app throughout the night catching most of the support staff at apt times.  They even managed to get a selfie with Bill Gates but I must have missed him ![Confused smile](/assets/img/wordpress/2016/07/wlEmoticon-confusedsmile.png)

[![image](/assets/img/wordpress/2016/07/image-18.png "image")](https://www.youtube.com/watch?v=DV0CCJrDWzg)

 


### Face lock for apps

Are you paranoid in your office, do you regularly walk away from your computer and then find that your colleagues have walked up and then posted some unscrupulous photos of you on Facebook?  Well then this team is here to save you.  Their creation allows you to lock not just your computer but also specific apps by recognizing you in front of the camera, the difference being that it works with any camera and not just some uber powerful depth camera.  The team hope to extend this adding facial passwords through emotion tracking and even voice support.  Certainly one to watch in the future.

[![image](/assets/img/wordpress/2016/07/image-19.png "image")](https://www.youtube.com/watch?v=_HUpqOvNefM)


### Interacting only when present

One of the most ambitious teams sought to marry up two competing technologies together to answer a fairly difficult problem, only enabling access to a device when the right person is there.  Sure you can hide this with passwords and stuff but it is more achievable when there are multiple systems in play.  The team wired up a single Kinect device (far left) to do long range positional detection with an Intel Realsense device for close up interaction, to ensure that only when a valid person is in view would the close access security system activate for use.  The big win was they did this on a single machine, whereas traditionally multiple machines would be required, thus lowering the cost to entry.  The team certainly have bold and ambitious plans to take this prototype forward.  The fact they actually got it working in a demo environment is a testament to their technical skill.

[![image](/assets/img/wordpress/2016/07/image-20.png "image")](https://www.youtube.com/watch?v=2RDkbNdClJw)

 


### Who are you? – Game of thrones

Another nice little fun project was done by yet another one-man band who simply loves Game of Thrones (but who does not) and decided to build a fun web application using cognitive services to compare your face to a multitude of Game of Thrones characters from various seasons, letting you know who you most look like.  This definitely brought on some cheers and laughter throughout the demo and one to watch for in the future as the catalogue of characters expands.

[![image](/assets/img/wordpress/2016/07/image-21.png "image")](https://www.youtube.com/watch?v=Fu1bYYgCSzQ)

Yes Boris, you and Ned Stark certainly have a LOT in common!


### Being creative helps

Do you often wonder what you could make for dinner with what you have in your kitchen? Well this highly professional team with obviously far too much time on their hands for a hack, brought together the most polished presentation (including a sales video? seriously guys?) to showcase their new app Luigi, your personal chef.

Their app listens to what ingredients you have at your disposal and then informs you what dishes you can make with them plus instructions on how to make it, all with an authentic Italian / English accent.  This is defiantly a video to watch and a well-honed team too look out for. I have no doubt that Luigi will be hitting our devices very soon.

[![image](/assets/img/wordpress/2016/07/image-22.png "image")](https://www.youtube.com/watch?v=kP6PEMuw_9w)

The support team were quite set back about just how polished and professional the output of the team was, granted having a very experienced artist/designer on hand does not hurt.  But only one of the team managed to survive the entire night.

* * *


# Closing thoughts

I was not quite sure what to expect from this event and like others amongst the event team, we were very interested to see what ideas came from this hack and we were still taken aback by all the ideas and creativity that resulted from the very short 24 hours (granted it was more like 40 hours since I survived the entire night as the night owl, mostly because I got too tired to sleep).

There were several more teams not listed here who were involved. Some did not manage to finish but still stood up to talk about their experiences, some did not quite reach their goals with cognitive services and others sadly did not return.  One team I wished had come back had an interesting idea for an elderly watchdog / alarm system that would monitor an elderly person in their home, answer their commands and more importantly, be there when things went wrong and contact the emergency services automatically.  It sounded amazing but sadly they hit a lot of technical issues early on which hampered their hackfest.

 

If you see / hear of another one of these events, I urge you to drop in and give it your all, the community spirit at this hack was truly amazing.  Failing that, dig in to the Cognitive Services provided by Microsoft and hack your own idea together, with all this easy to access machine learning, there are certainly some great opportunities to be had.

 

* * *


# From what comes next

Well the journey with Cognitive Services does not stop here.  I will be continuing this blog series with some investigations in to Cognitive Services of my own through various paths, from getting started with Unity on Cognitive Services to using the newly released .NET Core.

Time to get more hacking done!

