---
layout: post
title: Getting started with MonoGame using XML
date: 2017-05-31 19:24:35
description: The journey has begun and the road to building .NET 8 based games has begun.
img: posts/20170531/title.png
category: MonoGame
tags:
- content pipeline
- xml
- monogame
author: Simon Jackson
github: "https://github.com/SimonDarksideJ/XMLContentLoading/"
mathjax: false
---

For some time now I have been asked if I would do a session on the “Darkside of MonoGame” about using XML with MonoGame and the Content Pipeline, for a while I put it off as I had my own schedule and agenda with the channel.  Eventually I got worn down and I have succumbed to the demands of my viewers (it can happen ![Open-mouthed smile](/assets/img/wordpress/2017/05/wlEmoticon-openmouthedsmile.png))

The video for this post can be found here if you prefer video:

<iframe loading="lazy" title="Getting Started with MonoGame using XML" width="660" height="371" src="https://www.youtube.com/embed/wCc_rLrqsIo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> **This and more content can be found on my dedicated YT MonoGame channel here: [http://bit.ly/darksideofmonogame](http://bit.ly/darksideofmonogame)**


## Why use XML?

For as long as there have been games, there has been a need to generate game content outside of the game and avoid writing all this pesky code stuff, everything from:

- Level design
- Lists/designs of characters and items
- Scripted events
- Just because some article said it was a good idea on CodeProject

It can be very powerful to use, if wielded correctly and it gives power to your content / mod creators of your game.  Any situation that requires lots of configuration or walls of text just works better if it is separated from your code base and manageable outside of the core code.


## Why use the MonoGame Content Pipeline?

Loading text (which is all xml is at the end of the day) can be slow, very slow if it is pages long, so you do not really want to be doing that at run-time inside your game.  Sure, you can but should you?  You can hide this behind clever loading screens or whilst the main menu is up, but at the end of the day your game needs to:

1. Load in the file direct from disk as a stream
2. Close the stream
3. Create an XML Serializer
4. Parse through the stream and generate the data
5. Destroy the serializer (especially if you like your memory back)
6. Rinse / repeat for every file

Do not get me wrong, there is nothing wrong with this path specifically but it is wasteful and if anything goes wrong or you mistyped something in the XML, it will only fall down flat on its face when you run/load that file.  You can just create a separate tool to validate the XML for you but that is even more work to do.

With the content pipeline in MonoGame however, the majority of this work is done offline when you are building your project, in fact the XML validation happens inside the pipeline itself so you do not even need the game in order to test and build the XML, it can all be done separately and you know it will all “just work”™.

Another benefit is both size and compression. When using the Content Pipeline, all the assets are specifically serialized and compressed for each platform to cater with all their specific differences. How you binary serialize and deserialize on one platform is different to some others (just ask console developers!).

Lastly is ease of use and support. With MonoGame, we inherited the IntermediateSerializer which the XNA god Shawn Hargreaves created for XNA.  This little helper which he crafted between builds, greatly helps with serialization and can even support lists and dictionaries out of the box (as well as some xml performance improvements). That combined with turning every XML asset in to “just another asset” which is loaded from the Content Pipeline just like anything else, loading it becomes as simple as `Content.Load<MyXML>`, easy.


## Setting up your data

Right, when getting started with XML, you need to understand there are three main components to handling XML serialization with MonoGame, the XML schema, the Data Class and the Game code:

![image](/assets/img/wordpress/2017/05/image-5.png)

This is a simple architectural principle to deal with when handling any content that is provided externally to your project (or internally in some cases) whereby you have a rigid schema, which will be populated by an unlisted source (conforming to the schema) and then consumed by game functions and logic.  The last two can be merged but can likely create troubles later if you start manipulating the wrong data, so my advice is to simply keep them separate, for example:

My Data schema has the following properties:

- Level name
- Level Difficulty
- Array of Enemies
- Array of Items
- List of Exits

Now if the level loads with a certain number of enemies and the player starts killing them, do you simply start hacking away at the Enemies collection held in the XML? Doing so means you need to completely reload the XML should the player wish to restart the level. Alternatively, you might have a separate array either to track which enemies have been killed and then simply keep track of who’s dead or who isn’t. All comes down to the style of game.

Another view is if you use the Data Schema to run your game, or if you simply refer to the data within specific game functions, for example compare these two classes:


### A Class extending schema

```csharp
public class MyLevel
 {
     //Data 

    //The name of the Level
     public string LevelName;
     //Number of enemies at the start of the level
     public int MaxEnemies;
     //Time Limit to complete the level
     public float TimeLimit;

    //Functions
     public void KillEnemy()
     {
         //Do Kill
     }
 }
```


### Class with data property

```csharp
public class GameLevel
{
    //The current loaded level data
    MyLevel currentLevel;

    //Current Enemies
    private int enemyCount;
    //Time progressed in this level
    private float levelElapsedTime;

    //Functions
    public void KillEnemy()
    {
        //Do Kill
    }
}
```

One simply extends the data class with additional functions (mixing data with function), the other takes the data in to itself and then works with it.  My recommendation is to use the second as it keeps a clear line between what is your loaded data and what you do with that data in your game but ultimately, it is up to you.

> I always recommend to keep data loaded via XML clean and do not modify it unless you really have to. Changing the data WILL NOT change the underlying XML and will need reloading to reset.
>
> Main thing, is whether you put game code together with the data classes or write extension methods to interact with the data (my preference)


## Getting Started with XML in MonoGame

Once you have decided on your schema and data, getting this put together in MonoGame is fairly quick and painless, we simply need:

- A class in a project defining the schema as a public class with public properties
- A content project with a reference to the project holding the schema (so the pipeline understands the data)
- An XML file structured meeting the schema requirements for MonoGame and your data structure/schema

Once we understand what data we need, we need to decide where to keep it. This is critically important as it needs to be referenced by **BOTH the Game project and the Content Project**.

There are a couple of options, which sum up to:

- Creating a library project to maintain all your data classes (recommended)
- Host the data classes within your game project

Both have their advantages/disadvantages with regards to setup and maintenance. My preference is to use a library project as it offers the most flexibility and also enforces good architecture, which I will walk through creating here.

So, let us walk through setting everything up and for simplicity, I will follow the portable library path.


### 1: Creating the library to hold the data schema

As stated, I always use a separate library to maintain the schema definitions for by data.  I also usually create extension methods or worker classes in my game to consume that data.  To get started (assuming you have created a MonoGame game project already), I create a new library project in the solution, to ensure maximum compatibility I also create it as a Portable Class Library, meaning I can use the same project for all platforms supported by MonoGame.

![image](/assets/img/wordpress/2017/05/image-6.png)

_New project wizard, selecting a C# Portable Class Library_

> You can still create a standard library project (meaning you would need one for each platform), link your class definition files from a folder or even host it in your game. It is up to you but I highly recommend using this path.

Once you click OK, you will be prompted with the platform targets selection and for simplicity’s sake, you can just select everything ensuring maximum compatibility.  Also, be sure to check the .NET framework is a minimum of 4.5 as that is what MonoGame is currently based on.

![image](/assets/img/wordpress/2017/05/image-7.png)

_New Portable Class Library Platform Target selection screen._

Your project should now look as follows with your game and library projects.

![image](/assets/img/wordpress/2017/05/image-8.png)

_Updated game solution._

From here the instructions for your path converge as we create a data class and then consume it from the Content Pipeline.


### 2: Create the Data/Model classes

The next thing we need is our data schema we intend to use/store our XML data in. So, if we define a class for our level using the above example, we end up with the following:

```csharp
public class MyLevel
{
    //The name of the Level
    public string LevelName;
    //Number of enemies at the start of the level
    public int MaxEnemies;
    //Time Limit to complete the level
    public float TimeLimit;
}
```

> You can extend the data class to include some private properties that are calculated from the XML data, e.g. creating a private array of enemies using the _MaxEnemies_ integer. the XML loading will then simply ignore them.
>
> There are also ContentSerializer properties you can use to further control individual properties, check [this article here](https://github.com/SimonDarksideJ/XNAGameStudio/wiki/Everything-you-ever-wanted-to-know-about-IntermediateSerializer) for more detail.

Once you have created your data class, you need to make a specific note of BOTH the Namespace and Class name of your data, as shown here:

```csharp
namespace MyXMLData
{
    public class MyLevel
    {
```

Here you can see the direct reference in the sample data class is `MyXMLData.MyLevel` This is critical for the next step when you are constructing your XML.

> If you have used a separate library (as shown here), make sure you also remember to reference it from your game project


### 3: Generating your XML

When you are creating your XML for the first time, you have a couple of options:


#### 1. Do it yourself

Fire up notepad / VSCode / Your favorite XML editor and start writing your XML


#### 2. Have the Content Pipeline tool draft a blank XML template for you

Use the Content Tool to draft you a template XML files with all the necessary MonoGame/XNA headers needed for proper content import.  `Right-Click –\> Add –\> New Item –\> XML Content`


#### 3. Generate through code

Populate an instance of your class data in code and then output the resultant Content XML using the Content Pipeline to generate it. (more on this in a bit)

When generating it yourself or through the Content Pipeline tool, you should be starting with the following default schema:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <xnacontent xmlns:ns="Microsoft.Xna.Framework">
      <asset type="Object">
      </asset>
    </xnacontent>
```

Here we see the top level `XnaContent` xml section which denotes this is an XML data content file for MonoGame (leaning on its XNA roots so that everything is backwards compatible). You can just remove the xml:ns block if you wish, as it does not really add anything.

Within that, you then have an `Asset` node which tells the content pipeline what type of data it is that it will be loading, this is where the namespace and class name I mentioned earlier comes in.

Using the same example we used earlier, the resultant XML would look as follows:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <xnacontent>
      <asset type="MyXMLData.MyLevel">
        <levelname>explosion</levelname>
        <maxenemies>50</maxenemies>
        <timelimit>300</timelimit>
      </asset>
    </xnacontent>
```

Here you can now see I have created a new Asset of Type `MyXMLData.MyLevel`, using the same `Namespace` and class name of my data class.  Then we have individual nodes for each property in our class, simples.

> I will note, that if there is ever an issue with your XML or a problem with it loading, I can guarantee it is YOUR FAULT.  Either by not using the correct Namespace/class name, or making a spelling or other error with the data (like putting text in a number field)
>
> However, this is where the Content Pipeline really helps, as you find out very early on before your game even sees the content. The pipeline will tell you the XML is bad upfront.

So, with your XML in place, added to your Content Pipeline project, what is next?


## 4: Finishing up and adding a reference to the Content Pipeline tool

With both our data class and the XML ready, we now just need to pair them up in the Content Pipeline tool, this is simply done by adding a reference to the project containing the data classes and then just let the magic happen.

With the Content project open and your XML imported, simply click on the Root `Content` node in the editor and then click on the `References` option in the properties window, as shown below:

![image](/assets/img/wordpress/2017/05/image-9.png)

_Content Pipeline tool, adding references._

Once the Reference wizard is open, it is simply a case of clicking add and pointing it to the DLL of your data project:

- If you used a separate library, simply build it and the DLL will be located in the bin\debug or release folder of the library
- If you kept it in the main game, it will be in the bin\debug or release folder of your game

> When it comes to using the Release or Debug version of your library of your project is a source of some debate and ultimately is up to you.  Personally, I use the release build of my library as it ensures I am always building the XML against what I will eventually ship against, if I make dev changes, it will prompt me to ensure I consider all the impacts.  If you use debug, then you will have to make sure you fix it later.  Either way works and it is simply up to you.

Now when you build your Content Project (providing everything is aligned) you should see a nice green tick meaning everything is good!  If you then want to pass the content project and data library to other people, they can then get on building content and use the Content Pipeline tool to validate everything is on the up and up.

![image](/assets/img/wordpress/2017/05/image-10.png)

_A successful build ![Open-mouthed smile](/assets/img/wordpress/2017/05/wlEmoticon-openmouthedsmile.png)_

Once loaded it can be accessed anywhere in your game by simply calling:

```xml
    MyXMLData.MyLevel Level1 = Content.Load<MyXMLData.MyLevel>("Level1");
```


## The Sample

As even with each of these videos / posts, there is a sample drawn out of the XNA library to help support it. This time it is the XML Particles sample which makes a nice show of using XML content to construct particle effects.  Check it out here:

> ## [XML Content Loading Sample](https://github.com/SimonDarksideJ/XMLContentLoading)

![ParticleDemo1](https://github.com/SimonDarksideJ/XNAGameStudio/blob/master/Images/XNA_Particle3D_01_small.jpg?raw=true)![ParticleDemo2](https://github.com/SimonDarksideJ/XNAGameStudio/blob/master/Images/XNA_Particle3D_02_small.jpg?raw=true)![ParticleDemo3](https://github.com/SimonDarksideJ/XNAGameStudio/blob/master/Images/XNA_Particle3D_03_small.jpg?raw=true)


## Other tips and Tricks

It would not be a proper post if I did not also include some extra tips-n-tricks:


### Building XML from code

One neat trick as outlined by [Shawn Hargreaves here](https://github.com/SimonDarksideJ/XNAGameStudio/wiki/Teaching-a-man-to-fish), is to use the Content Pipeline in your project whilst crafting your XML.  Here you simply instantiate your data class in code and then use the Content Pipeline's IntermediateSerializer to serialize your code and generate the XML, for example:

```csharp
MyXMLData.MyLevel testData = new MyXMLData.MyLevel();
testData.LevelName = "MyLevel";
testData.MaxEnemies = 99999;

XmlWriterSettings settings = new XmlWriterSettings();
settings.Indent = true;

using (XmlWriter writer = XmlWriter.Create("test.xml", settings))
{
    Microsoft.Xna.Framework.Content.Pipeline.Serialization.Intermediate.
    IntermediateSerializer.Serialize(writer, testData, null);
}
```

Here I have created a new instance of the `MyXMLData.MyLevel` class, populated it with some data and then sent that to the serializer to output to a new XML file.

The only additional thing you need is to add a reference to the Content Pipeline in your project while you are building the content, you can find the DLL to reference in the following location

> C:\Program Files (x86)\MSBuild\MonoGame\v3.0\Tools\MonoGame.Framework.Content.Pipeline.dll

This should only be a temporary thing and you should remove both the reference and code (or at least comment it out) for a production or runtime build, just due to the sheer number of dependencies needed for the Content Pipeline itself.

> Just to re-iterate, do not leave the Content Pipeline DLL in your folder unless you like an extra 100mb or so in your project full of stuff you ca not use at runtime (well you can, but I would not recommend it!)


### Using MonoGame references in your XML

Want to use Vector2, Rectangles or Points in your schema, then fine. Just ensure your data project (ignore this if you have your data in your game project) has a reference to the MonoGame.Framework. If you are using a PCL, there is even a package for that. Simply install the MonoGame.Framework.Portable library in your PCL project and you are good to go. Simples.

![image](/assets/img/wordpress/2017/05/image-11.png)

_MonoGame.Framework.Portable on NuGet_


### Content Pipeline tool not opening when you double click on the Content Reference?

Do you only see the text contents when you double-click on your content project in Visual Studio, then fear not as there is a simple fix for that.  All that happened is the launch action for the Pipeline tool did not get associated for some reason for `.mgcb files` (which usually happens when the wind is blowing east on a Tuesday and the milkman is at your door, normally).

To fix this simple right-click the .MGCB Content file and select `Open With`

![image](/assets/img/wordpress/2017/05/image-12.png)

Then select the “MonoGame Pipeline Tool” from the list on the left and then click on “Set as Default”

![image](/assets/img/wordpress/2017/05/image-13.png)

Now the handy tool will open with for your content project forevermore.

> If the MonoGame Pipeline Tool is not in the list, then simple click on `Add` and locate it in the same folder indicated in the [Building XML from code section](#building-xml-from-code)


## Ship it

Right, that is all from me for this session.  I have still got to go back and finish the Getting Started with 2D blog post to accompany that article as well as get some more work done to the MonoGame NuGet’s.

So, what are you still here reading this for, go get some XML in your game!

As usual, questions or queries in the comments below and I will get right on that.
