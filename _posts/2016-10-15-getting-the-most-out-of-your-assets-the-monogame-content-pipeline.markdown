---
layout: post
title: Getting the most out of your assets - The MonoGame Content Pipeline
date: 2016-10-15 17:50:46
tags: [content pipeline, monogame]
---

![Wooden letter tiles spelling the word CONTENT](/assets/img/recovered/2016-10-15-getting-the-most-out-of-your-assets-the-monogame-content-pipeline/content-1315878_1920-765x300.jpg)

Working with assets with projects and games is hard enough these days, from finding the right artist, tweaking and reviewing the content and then faced with the trouble of how best to import and manage it in your game. The problem is the same no matter which game engine or framework you turn to for your game production.

With [MonoGame](http://www.monogame.net/), thanks to its XNA heritage, we have a powerful content driven engine that is about as flexible as you can be without breaking something. At its core it offers:

- Binary compatible asset compression, optimised per target platform (because most platforms like to do it differently)
- Asset management, including default profiles for handling the most common formats
- A generic asset loading system
- An extensive Asset extensibility system

Through this article we'll walk through some of the basics and delve in to a few advanced tips and tricks to get the most out of the content system.

> **The full "Localisation" sample can be found on the XNAGameStudio archive GitHub here: [http://bit.ly/localisationsample](http://bit.ly/localisationsample)
>
> This was converted from the original XNA Localisation sample and extended.**

<iframe width="560" height="315" src="https://www.youtube.com/embed/5mEQqCgTaLU" frameborder="0" allowfullscreen></iframe>

---

## Contents

Breaking from the norm, as this is a rather long article, I'm including a contents section so you can jump to whichever section you like:

1. [Basic Font use](#basic-font-use)
2. [Adding a native resource](#adding-a-native-resource)
3. [Setting your project native language](#setting-your-project-native-language)
4. [Regionalising resource files](#regionalising-resource-files)
5. [Your first Content Extension](#your-first-content-extension)
6. [Creating a new asset using your extension](#creating-a-new-asset-using-your-extension)
7. [The WPF Font extension](#the-WPF-font-extension)

Now you can either follow through or jump directly to the section you want.

---

## Basic Content Management

The first step with any game is to get your content into your project, at a basic level you have two options:

- #### Copy the content into your project directly, raw files.  Yes, MonoGame still lets you use raw files if you wish. Although keep in mind that unless you also employ some compression logic, this will keep expanding the size of your game as you are only copying the raw files in your project. It's quick, simple and up to you. A fair few people who I've spoken to still use this option today because they want to manage it themselves, which is fine, MG is an open framework. Just be aware this means you have to manage everything yourself with raw assets.
- #### Copy the content in to a Content project and have the pipeline manage them.  By just putting content in a Content project means your files will be compressed by default (where possible) for each target platform (each platform compresses / decompresses differently to meet the demands of each platform). Also you then have one simple way to manage all your content easily. For beginners this is the approach I'd recommend you start with to make up your mind as to the direction you want to take in the future.

So, assuming you are taking the second route, we can look deeper in to what the Content Pipeline does for you.

---

## Content Types

As I have shown previously in my [Content Pipeline video/tutorial](https://www.youtube.com/watch?v=OZpW13ERTnQ), adding content to a Content project couldn't be easier. However, in this article I'll take you a little deeper down the rabbit hole.

When you add/copy your assets in to the project, it is assigned a default Content Importer and Content Processor. These then in turn control how the asset is interrogated, stored and then made ready for retrieval.

|   |   |   |
| --- | --- | --- |
| [![Pipeline tool properties for a PNG with the Texture Importer and Texture processor highlighted](/assets/img/wordpress/2016/10/image-2.png)](/assets/img/wordpress/2016/10/image-2.png) | [![Pipeline tool properties for a WAV file with the Wav Importer and Sound Effect processor highlighted](/assets/img/wordpress/2016/10/image-3.png)](/assets/img/wordpress/2016/10/image-3.png) | [![Pipeline tool properties for a text file with Build Action Copy and no importer or processor](/assets/img/wordpress/2016/10/image-4.png)](/assets/img/wordpress/2016/10/image-4.png) |
| A default image importer | A default wav file importer | A text file with no content settings, just copy |

As you can see, MonoGame just decides on the best path for your asset (which you can change if you wish) and it will package it up for you to each platform you request it to. You then only need retrieve it from the Content Project at run time as follows:

```csharp
private Texture2D winOverlay;

protected override void LoadContent()
{
    winOverlay = Content.Load<Texture2D>"(Overlays/you_win");
}
```

> Making sure to specify the type of asset it is correctly, to avoid unexpected results. As shown above, it retrieves a Texture in to a texture variable.

The complete list of the out of the box importers / processors include:

[![Table of MonoGame importers, processors and notes for Effect, FBX, SpriteFont, MP3, WAV, XML and other formats](/assets/img/wordpress/2016/10/image-5.png)](/assets/img/wordpress/2016/10/image-5.png)

---

## Some assets are not equal to others

A few of the default asset types do a little more than the others. The SpriteFont and XML types for example, will process the source and deliver a much richer output:

- #### SpriteFont  This reads a specific XML file definition that starts a generation process to output a bitmap file. It takes an input of a Font file definition, specifically a true type font. It will then iterate (by default) through the character set for the current language and create a texture and character definition under the hood for you, as if by magic. When this is combined with the "*SpriteBatch.DrawString()*" method, it creates a simplified mechanism to drag the relevant bitmap image of each character (properly spaced for the selected font, which you can also alter) in the order required to write your text to the screen. If you want to, you can try doing this manually. It's not fun (although some still prefer to).
- #### XML  For XML files, it will deconstruct the source XML file and when it is read back, it will output the definition in to the code class definition you created. All this really does is wrap all the (sometimes) complex XML writer / reader logic for you in to one easy to use line, "Content.Load(XML File)"

Both of these hide a lot of logic and complexity to provide an elegant solution to handle these sorts of files.

---

## Managing Content

As a simple example of building a content pipeline extension, we'll focus on extending the capabilities of the SpriteFont XML (yes, we can even extend MonoGame's own implementation of things) to generate the font bitmaps for other languages and not just the host machines language.

> By default the SpriteFont handler will ONLY generate the font for your development machines default language, the one you code in.

The initial objectives of this little extension is to simply add processing support to a sample. This will scan local resource (resx) files in a project for different cultures and then generate only the character sets for the localisable strings we intend to use. This means we don't waste space generating bitmaps for characters we don't use AND we don't need to recompile our project for multiple regions, we can do it all at once.

> **The full "Localisation" sample can be found on the XNAGameStudio archive GitHub here: [http://bit.ly/localisationsample](http://bit.ly/localisationsample)
>
> Which was converted from the original XNA Localisation sample and extended.**

Starting simple, first let's add a standard SpriteFont file and then we'll extend this project with a content pipeline extension.

### 1: Basic Font use

Create yourself a little project in the platform of your choice and then build and save it, always a good practice!

> If you wish, don't forget to also follow the tips for a new project in the previous tutorial here - [http://wp.me/p3o0M2-2I8](http://wp.me/p3o0M2-2I8), again a good practice to get in to. The sample in the archive has already been built this way.

Open the Content Project (double click on the Content.MGCB in the Content folder or [open it manually in the Content Pipeline tool](https://www.youtube.com/watch?v=OZpW13ERTnQ)) and then "*right-click->Add->New Item"*.

[![Pipeline tool context menu with Add and New Item selected](/assets/img/wordpress/2016/10/image-6.png)](/assets/img/wordpress/2016/10/image-6.png)

Once clicked, you should see the following dialog, type in the name of "BasicSpriteFont", select SpriteFont from the list and click OK.

[![New File dialog with SpriteFont Description selected](/assets/img/wordpress/2016/10/image-7.png)](/assets/img/wordpress/2016/10/image-7.png)

Now in your project you should have a nice new and shiny SpriteFont file, if you open it up you should see the following (this is just a snippet, there is more):

[![Sprite font XML file with the Asset type and FontName Arial elements highlighted](/assets/img/wordpress/2016/10/image-8.png)](/assets/img/wordpress/2016/10/image-8.png)

Of note in this Asset are:

- **The Asset Type** - This is key as it tells the content pipeline what class in your project it relates to, in this case it's the default FontDescriptor of the SpriteFont definition. More on this later
- **The Font name** - This is crucial, as this is the TTF type that the content pipeline will use to generate your font from. If the font isn't installed on your machine, it won't build.

> **\*Note**, Font's need to be installed on EVERY development machine that opens a project using SpriteFont files, else the project won't build. My recommendation is to always keep a copy of the source TTF file in the content folder, just in case any other developers in your project (or when you rebuild your machine) don't have that particular font installed. Believe you me, there is nothing worse than having to spend hours looking for a Font that isn't made any more, or worse, you had made for you and can't find it to install again.

With the font in your Content project, Save and build it (checking everything is ok) and then close the Content Pipeline tool. On returning to your project, build it again, just to be sure and then save it.

Now as a little test, open the "*Game.cs*" file and let's add our new font to the game and render some text.

Add a new ***SpriteFont*** property (called MyFont) near the top as follows:

```csharp
public class LocalizationGame : Game
{
     #region Fields
     GraphicsDeviceManager graphics;
     SpriteBatch spriteBatch;
     SpriteFont MyFont;
```

Then we'll need to load it from our Content Project in the LoadContent function as shown here:

```csharp
/// <summary>
/// Load your graphics content.
/// </summary>
protected override void LoadContent()
{
    spriteBatch = new SpriteBatch(GraphicsDevice);
    MyFont = Content.Load<SpriteFont>("BasicSpriteFont");
```

> Be sure to spell the **name** of your SpriteFont file correctly, else you will get an error at runtime. Double check your content project to be sure.

With that done, we only need to then draw some text to the screen in the Draw function within a SpriteBatch segment:

```csharp
/// <summary>
/// This is called when the game should draw itself.
/// </summary>
protected override void Draw(GameTime gameTime)
{
     GraphicsDevice.Clear(Color.CornflowerBlue);
     spriteBatch.Begin();
     spriteBatch.DrawString(MyFont, "Welcome to the localization sample!",Vector2.One,Color.White);
     spriteBatch.End();

     base.Draw(gameTime);
}
```

Now when you run the project, you will get some text drawn to the screen in the default font (unless you changed it) Arial.

[![Sample window with the text Welcome to the localization sample drawn in the default font](/assets/img/wordpress/2016/10/image34.png)](/assets/img/wordpress/2016/10/image34.png)

---

## Time for Localisation

Now, using fixed strings in a project is never a good idea unless you only ever intend to sell your game to one market. a good practice is to always separate out text content to a separate file or resource, so you can unplug it from your project, pass it to a translation agency and have it localised for every region you want to deploy your project to.

> It's a well-known fact that local cultures will always pay more attention to and focus on apps / games that display in their native Language. There are some exceptions. However, especially for indie developers, you need every edge you can get and this is a no brainer. Sure, get set in your home language first but then be prepared to translate when the time is right, it's not always cheap but well worth it for sales.
>
> Check out this recent [article on Gamasutra](http://www.gamasutra.com/blogs/DanielBatoff/20161007/282861/Localizing_a_Unity_Indie_Game_The_Hidden_Costs.php) which goes over some of the salient points.

Now .NET provides us with a robust system for managing localised strings and resources (even images but I wouldn't use those in games) using a special file called a Resource file or ResX file. (granted in the new UWP platforms, they got renamed to RESW and created loads of issues when upgrading). This is even better when you pair it up with a feature in MSBuild (the engine behind visual studio for building your project) that will automatically capture the resource for a specific region if named correctly.

### 2: Adding a native resource

If you return to your studio project and in the Solution Explorer, right click on your project's name (not the solution) and select Add -> New Item and then select / search for a ***Resource*** file as shown here:

[![Add New Item dialog searching for a Resources File named Strings.resx](/assets/img/wordpress/2016/10/image37.png)](/assets/img/wordpress/2016/10/image37.png)

Name it "Strings.resx" and click OK. When done, the Resources editor should appear as shown below:

[![Empty resource editor for a resx file with a single new string row](/assets/img/wordpress/2016/10/image43.png)](/assets/img/wordpress/2016/10/image43.png)

This allows us to create a dictionary of string names and values that we want to use in our project. We can even include formatting values if we wish to alter them in the game (although note, strings in the game won't be translated! unless you do something special, like use a system resource or pre-localised content or numbers).

Update the resources as follows with some handy keys and values:

[![Strings.resx editor with CurrentLocale, HowToChange and Welcome English strings](/assets/img/wordpress/2016/10/image-15.png)](/assets/img/wordpress/2016/10/image-15.png)

Now if you return to your Draw code and replace your string as follows, it will use the text from the resource file and no long be hard coded:

```csharp
/// <summary>
/// This is called when the game should draw itself.
/// </summary>
protected override void Draw(GameTime gameTime)
{
     GraphicsDevice.Clear(Color.CornflowerBlue);
     spriteBatch.Begin();
     spriteBatch.DrawString(MyFont, Strings.Welcome, Vector2.One,Color.White);
     spriteBatch.End();

     base.Draw(gameTime);
}
```

### 3: Setting your project native language

Now an optional but recommended step is to also set your project's default natural language. This isn't critical but it helps MSBUILD when it generates your project using a default language, otherwise, it will use the system language as the default. Normally this wouldn't cause issue if your developers are all in the same country but if you are spread out or one of your team has a different system language, then it could cause problems.

Setting it is quite simple and worth the effort, simply right-click your project and select **Properties**, then click the "Assembly Information" button, you will see the Assembly information dialog, at the bottom you will find the Neutral Language option as shown here:

[![Assembly Information dialog with the Neutral language drop down listing English cultures](/assets/img/wordpress/2016/10/image-13.png)](/assets/img/wordpress/2016/10/image-13.png)

> Notice that these are organised by **Language** and not Culture. So it's the language first and then the region. Can be a bit confusing but easily recognisable.

With that don't build your project again, just to ensure everything is right before moving onward.

### 4: Regionalising resource files

Now that we have one resource, for one language/culture, it is very easy to create more. All that is required is to copy our existing resource and rename it with a suffix of the language we want it to target, this suffix uses the standard language formatter of xx-xx, for UK this is en-GB, for US it's en-US. A bonus is that you can be as general or specific as you like and .NET will work with whatever you provide.

For example, if you only supply a resource for "en", then both the US and UK will use it, .NET will first search for a specific culture and then drop back to the generic culture when working out which resource to use. If it still doesn't find one, then it will use the default culture/language set for your project (the one we already configured). The screenshot below shows you what I have setup in the sample.

> When you copy / create the regionalised ResX files, best you also change the **Access Modifier** for the new files to "No code Generation".
>
> [![Access Modifier drop down set to No code generation](/assets/img/wordpress/2016/10/image-26.png)](/assets/img/wordpress/2016/10/image-26.png)
>
> This avoids nasty conflicts when you are trying to access the contents through code. Only your main ResX file should have code generation enabled and all regional versions should only contain translated text.

[![Solution Explorer listing Strings.resx with Danish, French, Japanese and Korean copies highlighted](/assets/img/wordpress/2016/10/image-14.png)](/assets/img/wordpress/2016/10/image-14.png)

Here I have my default "Strings.resx" with my copies for Danish (da), French (fr), Japanese (ja) and Korean (ko).

> For a full list of available major / minor culture codes, check this page on MSDN - [http://msdn.microsoft.com/en-us/library/ee825488](http://msdn.microsoft.com/en-us/library/ee825488) <- check

Once you have your new resource files setup all that is required is for you to edit each of them and translate the text for that language / culture.

> \*Please note, Google / Microsoft translate, although being an excellent service is NOT a replacement for a proper translation service. Try looking at a foreign website and translate the text to see what I mean. Translation services will regionalise your text based on culture, language and sentiment. All the other internet services will do is brute force translate it, which will most likely read badly and produce a bad experience. If you can't afford a service, then either limit the languages until you have the cash or beg for help :D

If you look inside each of the resource files for this project (thanks to Microsoft's original XNA sample), you will see the following translations:

|   |   |
| --- | --- |
| default English - en (strings.resx) | [![Strings.resx editor with CurrentLocale, HowToChange and Welcome English strings](/assets/img/wordpress/2016/10/image-15.png)](/assets/img/wordpress/2016/10/image-15.png) |
| Danish - da (strings.da.resx) | [![Danish Strings.da.resx editor with translated sample strings](/assets/img/wordpress/2016/10/image-16.png)](/assets/img/wordpress/2016/10/image-16.png) |
| French - fr (strings.fr.resx) | [![French Strings.fr.resx editor with translated sample strings](/assets/img/wordpress/2016/10/image-17.png)](/assets/img/wordpress/2016/10/image-17.png) |
| Japanese - ja (strings.ja.resx) | [![Japanese Strings.ja.resx editor with translated sample strings](/assets/img/wordpress/2016/10/image-18.png)](/assets/img/wordpress/2016/10/image-18.png) |
| Korean - ko (strings.ko.resx) | [![Korean Strings.ko.resx editor with translated sample strings](/assets/img/wordpress/2016/10/image-19.png)](/assets/img/wordpress/2016/10/image-19.png) |

Now all that is left is to tell the ResourceManager (which controls which resource to pick) what the current culture the game is running in and it will pick the variant that is needed, we do this in the games constructor when setting up the game as follows:

```csharp
public LocalizationGame()
{
     Content.RootDirectory = "Content";
     graphics = new GraphicsDeviceManager(this);
     // Tell the resource manager what language to use when loading strings.
     Strings.Culture = CultureInfo.CurrentCulture;
}
```

You will also need to add an extra "*Using*" statement to the beginning of the class, so that it will recognise the **CultureInfo** property, as follows:

```csharp
using System.Globalization;
```

Now when you run your project, if you change your system region settings, it will show the "Welcome" text from the resource file specific to the culture settings of your device. I find it's easier to test this using either a simulator or a phone, so as not to mess up your development machine.

> **Now, in the sample, I have created / moved the ResX files in to the Content folder and then linked them to each of the platform projects (Windows, Opengl/Linux). That way I have a centralised copy of the Resources and only need to edit them once. The Content Extension (next) has also been designed to work with the ResX files in the content folder. If you do this differently, be sure to update the paths to the ResX files in the Font Asset, I'll highlight below where you need to do it.**

---

## Extending your content

So far we have covered what MonoGame does out of the box for your projects but with the Content Pipeline we can go much, much further. Some reasons you might want to extend what you want your asset to do include:

- Grabbing out the Normal, Vertex and Tangent data out of a 3D model to improve the handling in the game .
- Looping through the colour data in an image (like a heightmap) and producing several indexed arrays of information, such as height, alpha, boundary or even the separate colour data for different purposes.
- Using additional input files based on the original filename and producing multiple content outputs from one input.
- Adding additional content to the end of the asset file and processing it separately or populating additional classes.
- Constructing your own loading XML asset files, like a Level XML file which will detail the background, picking assets and world regions.

Continuing this sample, we will take our SpriteFont approach and extend it to work more closely with the localisation resources we have added. As stated previously, currently the content pipeline only builds SpriteFonts for the culture native to the machine. So we will initially extend this to force the pipeline to generate the fonts for other cultures. However, instead of a full character set, it will only use the characters in our resource files, thus reducing the size of the assets generated by the process.

### 5: Your first Content Extension

The first step in building your extension is to create a new Content Extension project, for which MonoGame has a template for. So right click your Solution and choose "*Add -> New Project*", then select the MonoGame Content Pipeline Extension Project template, being sure to also select .NET Framework 4.5 as the target framework and name it as "LocalisationPipeline", as shown below:

[![Add New Project dialog with the MonoGame Content Pipeline Extension Project template and .NET Framework 4.5 highlighted](/assets/img/wordpress/2016/10/image-20.png)](/assets/img/wordpress/2016/10/image-20.png)

> If you don't select .Net Framework 4.5 (sometimes .NET 4.0 is the default) then you will see reference errors / warnings saying it cannot resolve Microsoft.XNA.Framework. Just open the **Properties** of the **project** and update the **Target Framework** to **4.5** and it will resolve that.

With the Content Project Extension created you will have a set of default Content Importer and Content Processor class files, which would normally help you in creating your extension. For now, just delete these and we'll create just the files we need.

Create a new class in the Extension project and name it "LocalisedFontDescription". This class will hold the additional information we want to store about our Font, above and beyond what the native MonoGame FontDescriptor class provides.

First thing we need to do is add a base class (FontDescription) and replace the default constructor, so that we can extend the base FontDescription definition. So update your class as follows:

```csharp
class LocalisedFontDescription : FontDescription
{
     /// <summary>
     /// Constructor.
     /// </summary>
     public LocalisedFontDescription()
         : base("Arial", 14, 0)
     {     }
```

Here we create our new LocalisedFontDescription and inherit from the base MonoGame FontDescription class so that we get all the default properties and features of the existing functionality. We initialise the base FontDescription class in the constructor, but don't worry about the apparent Hard Coding of the Font name, this is only used if you don't supply one in the SpriteFont XML file. Whatever you put in the xml is used by default.

Again, we need some new Using statements at the top of the class to recognise the Content classes from MonoGame:

```csharp
using Microsoft.Xna.Framework.Content;

using Microsoft.Xna.Framework.Content.Pipeline.Graphics;
```

Now that we have our class setup, we can add an additional property so we can tell the Content Processor which resource files it needs to interrogate when it does it's magic, so add the following property to the LocalisedFontDescription class:

```csharp
[ContentSerializer(Optional = true, CollectionItemName = "Resx")]
public List<string> ResourceFiles
{     get { return resourceFiles; }
}

List<string> resourceFiles = new List<string>();
```

You should notice we decorate the public "ResourceFiles" property with a ContentSerialiser attribute, this is just to tell the processor not to worry if the property is not in a SpriteFont file. If you want to have properties that you need to be mandatory, just change these options. We also tell it the Name of the XML collection that we will add to the SpriteFont XML.

Now that we have the description for our new Localised SpriteFont, lets tell the extension how to process it. So create another new class called "LocalisedFontProcessor" in the extension project and replace the class definition in the file as follows:

```csharp
[ContentProcessor]
class LocalisedFontProcessor : ContentProcessor<LocalisedFontDescription, SpriteFontContent>
```

Here we identify that this class is in fact a "ContentProcessor" with the class attribute, we also then inform the ContentProcessor that it is going to have a LocalisedFontDescription as the input (our new Font type) and output a SpriteFontContent as the content type. This simply means the final output will still be a SpriteFont but we will have additional information in the input to work with.

As ever with new classes in the extension project. You will need to add using statements for the content pipeline and graphics, as well as some other namespaces we'll need later:

```csharp
using Microsoft.Xna.Framework.Content.Pipeline;
using Microsoft.Xna.Framework.Content.Pipeline.Graphics;

using System.IO;
using System.Xml;
```

Next we will add the magic that is going to loop through our ResX files and gather all the text to be used, for simplicity I've separated this out to its own function for easier portability. So add the following method to the class:

```csharp
        private static void GetLocalisedResX(LocalizedFontDescription input, ContentProcessorContext context)
        {
            // Scan each .resx file in turn.
            foreach (string resourceFile in input.ResourceFiles)
            {
                string absolutePath = Path.GetFullPath(resourceFile);

                // Make sure the .resx file really does exist.
                if (!File.Exists(absolutePath))
                {
                    throw new InvalidContentException("Can't find " + absolutePath);
                }

                // Load the .resx data.
                XmlDocument xmlDocument = new XmlDocument();

                xmlDocument.Load(absolutePath);

                // Scan each string from the .resx file.
                foreach (XmlNode xmlNode in xmlDocument.SelectNodes("root/data/value"))
                {
                    string resourceString = xmlNode.InnerText;

                    // Scan each character of the string.
                    foreach (char usedCharacter in resourceString)
                    {
                        input.Characters.Add(usedCharacter);
                    }
                }

                // Mark that this font should be rebuilt if the resource file changes.
                context.AddDependency(absolutePath);
            }
        }
```

There is a lot here, but put simply it:

- Loop through the resource files we identify in our SpriteFont (more on that in a bit) using the new property we added in our LocalisedFontDescription.
- Check the resource file exists (be aware this is relative to the Content Folder)
- Loads the ResX XML definition
- Loops through each character in all the string values and adds those characters to the SpriteFonts character list (that the SpriteFont used to build the bitmap)

All fairly simple, the final step is to add the ContentProcessor "Process" function so that is uses this method and outputs the work back to the Content Pipeline to process, by adding the following function:

```csharp
        public override SpriteFontContent Process(LocalisedFontDescription input,
                                                  ContentProcessorContext context)
        {
            GetLocalisedResX(input, context);

            // After adding the necessary characters, we can use the built in
            // FontDescriptionProcessor to do the hard work of building the font for us.
            return context.Convert<FontDescription,
                                   SpriteFontContent>(input, "FontDescriptionProcessor");
        }
```

This function is called by the content pipeline when it builds, it processes the ResX files using our new method and then converts the output back to the format MonoGame expects for a SpriteFont for it to continue processing as normal. However, now it is using only the characters we want it to process from the languages we require from the font sourced from the ResX files.

To make our extension available, we need to build it. For simplicity (and to avoid confusion later) I recommend you set the "Build Action" to "Release" for any build type. To do this simply right-click the Solution and click on "Configuration Manager", then make sure the configuration for the pipeline extension is set to **Release** for all the **Active Solution Configurations**, as shown below (also make sure "Build" is checked) :

[![Configuration Manager with the pipeline extension project set to Release](/assets/img/wordpress/2016/10/image-21.png)](/assets/img/wordpress/2016/10/image-21.png)

> You may wonder about debugging a content pipeline extension, but that is a whole other subject with its own little tricks. More on that another time. For now, let's assume this always works.

Now before we continue, be sure to build your project as we will need the Content Pipeline Extension project ready to be picked up for the next step.

### 6: Creating a new asset using your extension

To finish this little picture, we need to create a new SpriteFont that will use this new processor, this comprises of two steps:

- Having a SpriteFont with a definition that links to the new class type and has the additional required values
- Adding the new SpriteFont and the Content Extension to the Content Project and then setting the "Content Processor" for the new SpriteFont to our new processor.

So, let's first create a new SpriteFont as we did before in the Content Pipeline tool. This time however, let's call it "LocalisedSpriteFont.spritefont". Once done, open the new SpriteFont file and see all the XML in all its glory. First thing we need to do is change the ""Type" of data this XML definition represents. Currently it's defined as a MonoGame FontDescription:

```xml
<Asset Type="Graphics:FontDescription">
```

We need to change this to use our new LocalisedFontDescription in our Content extension. one thing to be aware of, is that if it's not a MonoGame base class you are referring to, you need to specify BOTH the namespace and class name you want this fine to represent. So change the Type to:

```xml
<Asset Type="LocalisationPipeline.LocalisedFontDescription">
```

Now our SpriteFont file will be recognised by our new extension and the Content Pipelinebuilder process will recognise the SpriteFont file properly. Next, let's add a new section to the end of the XML file, replacing the end of the file as follows:

```xml
    <ResourceFiles>
      <Resx>Strings.resx</Resx>
      <Resx>Strings.da.resx</Resx>
      <Resx>Strings.fr.resx</Resx>
      <Resx>Strings.ja.resx</Resx>
      <Resx>Strings.ko.resx</Resx>
    </ResourceFiles>

  </Asset>
</XnaContent>
```

Here we add our *ResourceFiles* collection with individual elements of *ResX*, one for each of the resource files we added to our project earlier. Now save the file.

> **As noted earlier, if you don't follow the sample layout the same and place your ResX files in the project instead of with the content, you will need to set a relative path to locate the ResX files in the SpriteFont file as shown above. So if the resource file is in your project and the content is also in your project you would update the path to "..\Strings.resx". Check the original XNA project for a fuller example.**

Returning back to the Content Pipeline tool, let's add a reference to our new Extension so we can use it. Select the top most node in the Content list (the content project itself) and then click on the **References** property in the window below, as shown here:

[![Pipeline tool content project properties with the References entry highlighted](/assets/img/wordpress/2016/10/image-22.png)](/assets/img/wordpress/2016/10/image-22.png)

This will open up a new dialog where you can add paths to extension projects. Click on "Add" and then browse to the Pipeline Extensions "*bin\release*" folder to locate your **LocalisationPipeline.dll**. (this is why we set the project to only build its release version, as it means it is always the same one). There will be other dll's in this folder, but just ignore them, just focus on your extension dll.

[![Reference Editor listing LocalizationPipeline.dll with Add and Remove buttons](/assets/img/wordpress/2016/10/image-23.png)](/assets/img/wordpress/2016/10/image-23.png)

With that done, you can click **OK** to close the dialog and return to the project. Now at this point I always **Save** and then **close / reopen** the project to ensure it picks up the new extension. This may not always be needed, it's just what I do.

Now that the extension is loaded, if you select your new "*LocalisedSpriteFont.spritefont*" file in the content project and click on the **ContentProcessor** dropdown, you should have a new **LocalisedFontProcessor** option.

[![Pipeline tool Processor drop down with LocalizedFontProcessor selected for a spritefont file](/assets/img/wordpress/2016/10/image-24.png)](/assets/img/wordpress/2016/10/image-24.png)

it gets its name by default from the name of the *ContentProcessor* class as shown below, you can customise this if you wish but We'll cover that in a more advanced tutorial at some point:

[![ContentProcessor class named LocalizedFontProcessor highlighted in code](/assets/img/wordpress/2016/10/image-25.png)](/assets/img/wordpress/2016/10/image-25.png)

And we're done as far as the asset goes. Now build and verify there are no other issues with your asset or the processor.

Now when you use the new "LocalisedFont" in your project, the same as you did with the original Font, it is a lot more optimised and only contains the characters in your resource files. More importantly, **it also contains all the regional variations you requested / need**.

The sample project also contains a few extensions on this, including some code to pick and load a specific Flag texture depending on the culture the project is running under.

> **\*note to self - If you leave the MonoGame Pipeline tool open when building your project, especially after changing an asset or a pipeline extension, Visual Studio may fail to build the project complaining about certain DLL's being in use. This is just because the pipeline tool has those dll's open in order to build/test. Just close the pipeline tool and your project will start building again.**

---

## The WPF Font extension

The sample also contains another extension which is a lot more involved, as it takes the same basic idea of the localised font and extends it a lot further. In this article [https://blogs.msdn.microsoft.com/ito/2012/02/19/103/](https://blogs.msdn.microsoft.com/ito/2012/02/19/103/) ([translated](https://translate.google.co.uk/translate?hl=en&sl=ja&u=https://blogs.msdn.microsoft.com/ito/2012/02/19/103/&prev=search)) back in 2012, a budding MS employee created a Font processor that not only generated the Font as a SpriteFont, it also converted the bitmap generation to use a more stylised WPF ([Windows Presentation Foundation](https://translate.googleusercontent.com/translate_c?depth=1&hl=en&prev=search&rurl=translate.google.co.uk&sl=ja&u=http://ja.wikipedia.org/wiki/Windows_Presentation_Foundation&usg=ALkJrhhMCcqaO5NeJrNCN3hA9wwTwDlKYw)) approach to generating the font. Fonts are created using the Windows GDI functions to create the graphic instead of the brute force method that is done by default in XNA/MonoGame.

This gives it more advanced characteristics, such as:

- OpenType font support
- Faster processing speed
- JIS Kanji additional functions
- Character decoration

When dealing with some Asian character set, this granularity is crucial to ensure the font is presented in exactly the right way.

An example of which is provided in the above article:

In an extension of the original article (the one where the code actually comes from) Bevel, Mitre and Rounding support was also added, as shown below:

It doesn't have to be used with only Japanese, this Font Processor can be used with any font for any language to produce better font graphics.

Feel free to browse through this extension (apologies to non-Japanese speakers, as the comments in the code are still in their original Japanese) in the source sample and use it how you wish.

> **The full "Localisation" sample can be found on the XNAGameStudio archive GitHub here: [http://bit.ly/localisationsample](http://bit.ly/localisationsample)
>
> This was converted from the original XNA Localisation sample and extended.**

---

## The final Round-up

There is certainly a lot of content in this article and a lot to digest. This still only scratches the surface of the capabilities of the Content Pipeline, I'll cover more on this in future tutorials, rest assured.

For now, I need to sit back and finish up my presentation for Future Decoded 2016 and then maybe sleep for a little while. The next tutorial will be a review and round up of some of the many exciting extensions and add-on's to MonoGame that many brave souls have created. From Engines, to extensions and bolt-on frameworks, plus a few other surprises that make building games in MonoGame even more fun for developers.

As ever, Solidarity Brothers, and Sisters :D

[![Five robed men from a film scene shading their eyes as they gaze at the sky](/assets/img/wordpress/2016/09/Solidaritary.png)](/assets/img/wordpress/2016/09/Solidaritary.png)
