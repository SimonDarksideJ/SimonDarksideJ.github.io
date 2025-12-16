---
layout: post
title: MonoGame Content Project tool walkthrough
date: 2016-08-29 11:30:34
tags: [content pipeline, monogame]
---

To accompany the video project for the Content Project/pipeline tool, this blog post will also show you all the features of the MGCB tool, along with a few tips and tricks.

The video for this post can be found here if you prefer video:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/OZpW13ERTnQ" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

 

> ###### **This and more content can be found on my dedicated MonoGame channel here:** [**http://bit.ly/darksideofmonogame**](http://bit.ly/darksideofmonogame "http://bit.ly/darksideofmonogame")

* * *


# Content projects with XNA –\> MonoGame

In the XNA days, to manage content we had a separate project type (The Content Project) which allowed us to store the assets for our project in one place.  It also gave us access to the Content Pipeline, an arguably very powerful framework for managing the importing and consumptions of those assets:

[![image](/assets/img/wordpress/2016/08/image.png "image")](/assets/img/wordpress/2016/08/image.png)

_The content project, referenced in the XNA game solution using a Content reference._

> Did you know?  
> You can still Create / Manage and Edit XNA solutions today with Visual Studio 2013 / 2015 using the awesome MXA project. Just install the package and XNA will still live on and is still deployable.
> 
> [http://mxa.codeplex.com/releases](http://mxa.codeplex.com/releases "http://mxa.codeplex.com/releases")

 

Now MonoGame also has the same setup, you can create Content Projects using the MonoGame Content Project tool and reference them in the same way as XNA did:

[![image](/assets/img/wordpress/2016/08/image-1.png "image")](/assets/img/wordpress/2016/08/image-1.png)[![image](/assets/img/wordpress/2016/08/image-2.png "image")](/assets/img/wordpress/2016/08/image-2.png)

_The MonoGame Content reference which links to the MonoGame Content Pipeline_

The only main difference between the two methods is that MonoGame uses a separate tool rather than an embedded project, so that the tool cam be multi-platform and managed / updates separately. Apart from that nothing has changed, how you load your content before works the same today.

> If you want you can still add compiled .XNB files in to your project, or even add the raw files (MonoGame supports both ways) and load them both the same way:
> 
> [![image](/assets/img/wordpress/2016/08/image-3.png "image")](/assets/img/wordpress/2016/08/image-3.png)
> 
> However you will lose the power of the content pipeline and you will manually need to manage compression and cross-platform compatibility of the assets. All of which are included with Content Projects by default.

* * *


# Getting started with the Content Project / Pipeline tool (MGCB)

As with everything MonoGame (and most open source projects in general) you have the choice for how to use the Content Tool, you can:

- Use the pre-built Content Project that comes with any new MonoGame project as is.
- Create Content Projects separately and reference them manually.
- Forget this content pipeline stuff and do it yourself. (You could also drop MonoGame and write your game in C++, Assembly or JavaScript ![Open-mouthed smile](/assets/img/wordpress/2016/08/wlEmoticon-openmouthedsmile.png))

Whichever path you chose with your MonoGame Content projects, you can manage them in the same way.


## 1: Create a Project

Either use the one new MonoGame Projects or create your own. Just open the MonoGame Content Project tool and do file / new:

[![NewContentProject](/assets/img/wordpress/2016/08/NewContentProject.gif "NewContentProject")](/assets/img/wordpress/2016/08/NewContentProject.gif)

When creating a new project, it is best to:

- Place it in a folder called **Content**. Not mandatory but recommended
- Create the Content folder relative to or with your Game project, just so you do not lose it. Again up to you


## 2: Add Content

When adding content, you can either:

- Add each file individually.
- Create new folders to store content in
- Add entire folders, which will also add the content within that folder

[![AddingContent](/assets/img/wordpress/2016/08/AddingContent.gif "AddingContent")](/assets/img/wordpress/2016/08/AddingContent.gif)

When selecting existing files, you can opt to either copy the files in to the Content Projects folder, or leave them in place and simply reference them.  I would always recommend copying so that you keep all your games actual content in one place. Makes it easier to transport or publish to a source code repository as well.

 


## 3: Build and test

One of the great features of the MonoGame Content Project tool is that you can build the content in the tool and see the debug output of that process. This helps you identify any content issues early on, especially if you are going down the advanced route and building your own content importers / processors (more on that later)

[![BuildContent](/assets/img/wordpress/2016/08/BuildContent.gif "BuildContent")](/assets/img/wordpress/2016/08/BuildContent.gif)

 


## 4: Add to your game project

Once you have your project built and ready, you can add it to your MonoGame solution. The process is the same whether you use Visual Studio or MonoDevelop.

> \*Note, new MonoGame game Templates already come with a Content Project, so you can skip this step if it is already in your solution.

[![AddingReference](/assets/img/wordpress/2016/08/AddingReference.gif "AddingReference")](/assets/img/wordpress/2016/08/AddingReference.gif)

A few tips when adding the content reference manually to your project:

- When adding the Content Project file, make sure it is stored relative to the content else it will break the asset references. I recommend adding the project “As a Linked” file, that way it stays where it is.  Alternatively, copy/move the content folder in to your game project and then add normally.  Just clicking OK will copy and MOVE the content project and may cause build errors if done wrong.
- The other option to avoid the above is to just start with the Content Project that comes with new MonoGame projects, then there are no issues.
- Double-clicking on the MGCB Content Project file will open the Content Project tool automatically.
- After you have added the Content Project reference, **REMEMBER** to change the **Build Action** to a **MonoGameContentReference** , else it wo not build.  Setting the action to this type makes the Build process launch the Content Builder using your content project and actually compiles your assets.


## 5: Load Content and Draw

Now this is no different to XNA, you simply Load your content and then Draw it to the screen.  There is a lot more you can do with this, but simply using:

    Texture2D myKnight; protected override void LoadContent() {     // Create a new SpriteBatch, which can be used to draw textures.     spriteBatch = new SpriteBatch(GraphicsDevice);     // TODO: use this.Content to load your game content here     myKnight = Content.Load<texture2d>(@"Attack (1)");
    }
    
    protected override void Update(GameTime gameTime)
    {
        if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape))
            Exit();
    
        // TODO: Add your update logic here
        spriteBatch.Begin();
        spriteBatch.Draw(myKnight,Vector2.One);
        spriteBatch.End();
    
        base.Update(gameTime);
    }</texture2d>

Will take your content and draw it to the screen. Simples…

 

* * *


# Next Steps

Well, you now have you content, it is nicely packaged and ready for use in your game projects, what could be better?

 

Well one thing that is absolutely awesome is that you can use the **same Content Project for ALL your platforms** , in fact the only time you may want to use more than one content project is if you are supporting vastly different resolutions (and need higher quality art). In general though, only one is needed.

Well, I say one, **you can have as many Content Projects as you like** , there is no limitation. Some games package assets per level, some have the types of art in different projects, just because it is easier to manage that way, the choice is up to you.

 

> The only thing that should not go in to a Content Project at this time are Xact Projects (audio master collections). You can store individual audio files like MP3’s, WAV’s and so on.  But Xact is not supported fully yet.  I believe you can add them manually to the project but I have not had reason to test that fully as yet.  Will report back when I have more info.

* * *


# Going Advanced

Now I mentioned earlier about creating your own Content Importers and Processors, these are what are known as Content Pipeline Extensions.

It is a bit much to go in to fully here but Andy Dunn and Tom Spilman recorded a session with Microsoft to cover this which can be found here:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLclF8feY8EKKEcmhMcmlQFqfxStav5YPI" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

In the future I will do a follow up session just to break down the essentials.

* * *


# On with the Show

Right, I am done with basic use of the Content Project.  If you have any specific requests for subjects to follow this then please leave a comment below or on my MonoGame YouTube channel ([http://bit.ly/darksideofmonogame](http://bit.ly/darksideofmonogame "http://bit.ly/darksideofmonogame"))

