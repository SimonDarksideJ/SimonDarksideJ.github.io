---
layout: post
title: Developing games for Cystic Fibrosis treatment - Getting started with Fizzyo
date: 2017-05-09 13:08:45
tags: [fizzyo]
---

In [a recent post, I talked about the ICHealthHack event in London](https://darkgenesis.zenithmoon.com/developing-for-a-cause-the-ichealthhack-for-cystic-fibrosis/) where many medical students gathered in order to win prizes and try to make the lives of children with Cystic Fibrosis easier, or at least more fun, when performing their daily treatment exercises.

Well, the fun never stopped and many of those students have gone on further with their projects aiming to fulfil their goals and really make a difference and now YOU can too.

* * *


# What is Cystic Fibrosis?

![Image result for cystic fibrosis logo](assets/img/posts/image-not-found.png)

Cystic fibrosis (CF) is a genetic condition affecting more than 10,800 people in the UK and its effects are quite far ranging.  The most prominent issue that people with CF have is with their breathing.  Mucus builds up in their lungs causing chronic infections, meaning that people with cystic fibrosis struggle with reduced lung function and have to spend hours doing physiotherapy and taking nebulised treatments each day. Exacerbations (a sudden worsening of health, often owing to infection) can lead to frequent hospitalisation for weeks at a time.

On top of that, their pancreas becomes blocked with mucus, enzymes required for digesting food cannot reach the stomach. People with cystic fibrosis often need to take more than 50 tablets a day to help digest food and keep respiratory symptoms in check.

> **You can read more about** [**Cystic Fibrosis on the CF website**](https://www.cysticfibrosis.org.uk/) **, which goes in to a lot more detail.**

Ongoing treatment for CF is long, laborious and no fun at all, requiring hours of repetitive exercise or treatment, which especially for children is very, very, very, VERY, boring.

* * *


# Treatment and devices

The specific treatment being addressed currently is centred around airway clearance, which requires the patient to:

- Blow strongly into a device until they have fully exhaled
- Pause to breathe in
- Repeat for approximately 6 times
- Stop and perform a coughing like exercise
- Repeat all this again for about 30 minutes or more. Roughly about 8 times.

Patients need to focus on their breathing, NOT over exert themselves and ensure their full lung capacity is used (remembering that with CF patients, this can be greatly diminished).  This is very repetitive and needs to be completed several times a day, which you can imagine is quite boring.  Some patients use other methods, such as blowing into a bowl of water through a straw achieving the same effect.

![Airway Clearance Devices](https://i1.wp.com/github.com/ichealthhack/fizzyo-challenge/raw/master/Airway.jpg?resize=300%2C158&ssl=1)

This is where the Fizzyo device comes in, it is attached to any one of the airway clearance devices to gather the patient’s breathing flow and also offers (currently) a single button for additional interaction.

There are many hurdles involved in getting such a device approved for medical use and to ensure it is free from bacteria and infection sources in every use. Allowing it to be cleaned or use easily replaceable parts between the airway device and the Fizzyo controller.

 

The aim with the Fizzyo device is twofold:

1. To collect data on the patient’s breathing patterns. This can provide more accurate information on the treatment and provide early warnings of possible infections or breathing difficulties.  This helps to ensure the patient is doing enough to manage their condition.
2. Provide input for the games, allowing developers to build experiences that can make the treatment more fun and engaging

Both are equally important to improve the patient’s quality of life and make treatment less of a burden as well as give an early indication of any problems that might arise requiring some sort of intervention or change in treatment.

 

* * *


# How can I help?

![Image result for open source contribution](assets/img/posts/image-not-found.png)

With the IChealthHack event, the aim was not to actually make a few games, the aim was to build a foundation from which many projects could be born. The entire project, from the hardware, firmware, software and even the games are all open source.  That way everyone benefits from what has come before and we all learn from each other’s attempts.

Thus was born the Fizzyo project and it is GitHub Repository which can be found here:

> ## [https://github.com/Fizzyo](https://github.com/Fizzyo "https://github.com/Fizzyo")

In the repository, you will find separate projects containing the following:

- 

### Data Architecture

Outline plans and information on the end to end Fizzyo project. Everything from the data science movement, backend services architecture, services integration and dashboards

- 

### Firmware

The source and plans for the firmware for the Fizzyo Devices.  These will be made available once the Fizzyo devices have made it past medical device testing (a long and costly exercise)

- 

### Hardware

All the plans and designs for the current and future Fizzyo device hardware. These will be made available once the Fizzyo devices have made it past medical device testing

- 

### Games

This is the main repository for the moment and is broken up into 3 parts.  
\* Fizzyo – The current framework libraries and projects for the Fizzyo library.  There are currently 2 libraries available for Unity and Monogame development  
\* Sample Games – Some simple projects in both Unity and MonoGame using the above libraries  
\* The Games

Everything that can and is available is all uploaded to the sites and it will progress further later and contributions are welcome at any stage, such as:

- Building your own games
- Adding new Fizzyo libraries for more game engines/frameworks
- Extending the Fizzyo capabilities to add more features (there are already plans for mobile and other sensor inputs)

* * *


# Getting started

Right with all the background out of the way, now on to the main event, how you can get involved and start building experiences to improve lives.

The catch? You only have these minimal inputs currently!

- A single X axis. Offering values from –0.2 to + 1 – The patients breathing pattern
- A single button

You can try and add more but remember the focus is on the treatment and the game should not take away the focus of that. Some examples that have been built already are:

- A jetpack game where the player blows to keep the pilot airborne and flying over obstacles  
[![image](/assets/img/wordpress/2017/05/image.png "image")](/assets/img/wordpress/2017/05/image.png)
- A collection game where the players breath charges the ship to allow it to move  
[![image](/assets/img/wordpress/2017/05/image-1.png "image")](/assets/img/wordpress/2017/05/image-1.png)
- An endless runner platformer where the player breathes to speed up the character and the button to jump.  Bonus points are achieved for “good” breathing cycles  
[![image](/assets/img/wordpress/2017/05/image-2.png "image")](/assets/img/wordpress/2017/05/image-2.png)

Using the Fizzyo library from either Unity or MonoGame is very easy, a big benefit of using the library is that it also includes recorded data so that you do not even need an actual Fizzyo device to get started. Alternatively, you can just use your normal X Axis and Button 1 inputs and simulate them normally if you wish.


## Getting Started with Fizzyo in Unity

![image](/assets/img/wordpress/2017/03/image-12.png?resize=240%2C132&ssl=1 "image")

With Unity, you get a pre-build asset that you can import in your project from here:

> ### [FizzyoDevice.unitypackage](https://github.com/Fizzyo/Games/raw/master/Fizzyo/Fizzyo-Unity/FizzyoDevice.unitypackage)

Or alternatively, you can grab the source files from the [Games repo](https://github.com/Fizzyo/Games/tree/master/Fizzyo/Fizzyo-Unity).

Once imported you will have a new folder in your project called “FizzyoDevice” which contains all the scripts for the Fizzyo project, including some helper classes for analysing a patient’s breathing.

To start using the Fizzyo controller, simply add it to a GameObject in the scene and configure it appropriately:

[![image](/assets/img/wordpress/2017/05/image-3.png "image")](/assets/img/wordpress/2017/05/image-3.png)

Here you can configure:

- Whether the game is using recorded data or live data from the FizzyoDevice (handy for testing)
- If the recorded data loops or runs a single course.
- The recorded data file (3 are included in the asset, for good / bad high and bad low breathing cycles.

Once you have the device controller configured, you simply access the input in code as follows:

    //get the pressure value from our fizzyo device class: // \* Uses logged pressure data if useRecordedData in the editor instance is set to true. // \* Direct from sensor if useRecordedData in the editor instance is false float pressure = Fizzyo.FizzyoDevice.Instance().Pressure();

Using the pressure value as your input to control your game, the values of which will fluctuate as the patient breathes into the device.

You can also access the button on the device as follows:

    Fizzyo.FizzyoDevice.Instance().ButtonDown()

More details are included in the readme on the [GitHub page here](https://github.com/Fizzyo/Games/tree/master/Fizzyo/Fizzyo-Unity).

 


## Getting Started with Fizzyo in MonoGame

![image](/assets/img/wordpress/2017/03/image-13.png?resize=240%2C143&ssl=1 "image")

With MonoGame, the Fizzyo device code is packaged into a nice library for referencing in your project, which can be downloaded from here:

> ### [https://github.com/Fizzyo/Games/tree/master/Fizzyo/Fizzyo-MonoGame/Fizzyo-Library](https://github.com/Fizzyo/Games/tree/master/Fizzyo/Fizzyo-MonoGame/Fizzyo-Library "https://github.com/Fizzyo/Games/tree/master/Fizzyo/Fizzyo-MonoGame/Fizzyo-Library")

(I have been toying with the idea of also providing a NuGet of the library but have not gotten to that yet)

Currently, you simply need to download the library and reference it in your MonoGame Game project as shown below:

[![image](/assets/img/wordpress/2017/05/image-4.png "image")](/assets/img/wordpress/2017/05/image-4.png)

Once the project is in and referenced, you need to add the InputState and FizzyoDevice services to your game as follows:

    var inputState = new InputState(this); Services.AddService(typeof(InputState), inputState); var fizzyoDevice = new FizzyoDevice(this); fizzyo.useRecordedData = true; // Change this value to use actual values instead of recorded data Services.AddService(typeof(FizzyoDevice), fizzyoDevice);

Then ensure these controls are updated in the game update loop as shown here:

    inputstate.Update(gameTime); fizzyoDevice.Update(gameTime);

Then finally accessing the control in code is very similar to how it is used in Unity as shown here:

    var fizzyoDevice = (FizzyoDevice)game.Services.GetService(typeof(FizzyoDevice)); //(bool) Will return if the Fizzyo Device button is pressed or not. bool buttonPresed = FizzyoDevice.ButtonDown(); //(float) returns breath strength from (-1 – 1) with 0 being not breathing, \*\*\> 0.7\*\* blowing or breathing out hard and \*\*\< -0.5\*\* breathing in hard float pressure = FizzyoDevice.Pressure();

More details are included in the readme on the [GitHub page here](https://github.com/Fizzyo/Games/tree/master/Fizzyo/Fizzyo-MonoGame).

> **Full details and examples of these implementations are included in the sample projects on the Games GitHub site**

 

* * *


# Get involved!

![Image result for kids fun](assets/img/posts/image-not-found.png)

This truly is a tremendous cause and one to get involved with. It also adds the challenge of what you can achieve with so few inputs, there will be more added later as this is only the start of the journey.

Pitch in where you can and that does not just mean building the games, above all the project craves ideas:

- New ways of capturing the data
- Add-ons to the project (one team have suggested 3D printing additional holders/devices, maybe to mount a phone?)
- New ways to analyse or capture the data
- Add more game engines/frameworks by building the Fizzyo Library for use in those engines and publish them to the GitHub.
- Reuse the libraries/code in other Game engines/frameworks and publish more samples/games.
- And of course, the Games. Just what can you build to make treatment fun?

If you have any queries or questions on the project, just join the discussions on the GitHub sites or reach out to myself and I will put you in touch with the powers that be!

