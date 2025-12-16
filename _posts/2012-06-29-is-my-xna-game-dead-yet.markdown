---
layout: post
title: Is my XNA game dead yet?
date: 2012-06-29 11:30:19
tags: [windows phone, xna]
---

Strange title but quite apt for this post. ( **Be warned this is a heavy Phone XNA based sample** )

Now I was going to do an intermission to the tutorial series, taking Audio that bit further in XNA, mainly for the Windows Phone 7.  But it appears there are two issues with that:

1. XACT (blah) is not supported on the Windows Phone 7, boo hoo
2. Playing standard Audio 3D, does not have the right effect in the emulator. 

Granted I could write lengthy step by step instructions on how to implement 3D audio at this time but you are far better off reading the XNA help, it is very lengthy on this matter.  I may return to this later but who knows, granted V.Bad of me to just drop that, but at this point in time you are probably better off just using the functionality mentioned in the previous post for now, especially if you are just starting out. (KISS, start small and build on that later, unless it is an audio only game!!).

So that aside, what has prompted this little interruption to the series.  In short the Creators Club release of the new and updated Gamestate Management Sample.

Now I’m usually a big fanboy of all the CC samples and kits and they show you a great deal of how to implement features in the real world with your games, in fact several people I know (and also including the XNA team themselves) have actually built games using nothing but the samples (refer to Shawn H’s post on his last downtime sample).  However, this time around, the updated Game State Management sample just does not fit into this category.  Features I would have expected to be part of the sample are just not there and worse, it crashes.

(In retrospect the new Bounce Sample, when released was found to have an issue, was quickly pulled and is not back up, flying.  A good Physics and drawing sample for the phone)

So what went wrong and how can we fix it.

To get the sample in a fit state, we are missing several features:

- First and Foremost Tombstoning support (more on this shortly)
- Splash screen examples
- Pause screens
- Remove all non phone device support (it is well known that polling the keyboard on the phone has a detrimental effect on performance)
- More varied transitions 

This does focus this sample purely on the phone, but the CC has created a separate GSM for the Phone and where it comes to UI and presentation, this is really good idea.  Share your game engine and some of the core rendering features, but when it comes to layout and control styles, keep it separate.

So let us begin.

As always the Sample project is available [on the CodePlex site](http://startrooper2dxna.codeplex.com/releases/view/50372).


### **\*\*Update**

I’ve added an extra Q&A section below to respond to some of the questions on this article.  Please also note the [second part of this tutorial here](/blogs/darkgenesis/archive/2010/11/08/there-and-back-again-a-tombstoning-tale-the-return-of-the-application), which covers some more general usage patterns for tombstoning and best practices.

 

* * *

 


### \*\*Update

Thanks to the community, there is now finally a way to test tombstoning in the emulator.  Just need to follow the instructions in [this Post](http://nicksnettravels.builttoroam.com/post/2010/07/15/Windows-Phone-7-beta-Debugging-Tombstoned-XNA-Games-with-Visual-Studio), or follow the comments in this [forum post](http://forums.xna.com/forums/t/57309) on the CC site, plus the notes on [Michael Klucher’s blog](http://klucher.com/blog/why-is-my-game-not-installed-in-the-windows-phone-emulator).

Basically it involved 2 things:

> ![](assets/img/posts/image-not-found.png) Changing the Application target for your game in the WMAppManifest.XML, from targeting “App.Game” to “ **NormalApp** ” (actually I found changing to anything else works)   
> ![](assets/img/posts/image-not-found.png) Then you have to modify your Project properties –\> Configuration Manager and uncheck the “Deploy” option when building your game.  This makes deployment manual so you can debug your game like you can do with Silverlight apps

Now on with the show.

* * *


## XNA Phone 7 Game State management sample Part 1 (of 2)


### 1. Tombstoning

Tombstoning is a little black art when it comes to the phone, it is more wildly known in Silverlight circles because of the way that Siverlight pages are rendered and executed, this all boils down to the execution model for the Windows Phone 7.  Many have talked and balked about the lack of Multi-tasking in the windows phone. (which I have to agree with MS comments on this, they are making a consumer based phone with the focus of the app/game you are running now FOR THE FIRST RELEASE.  Focused.  Multi-tasking if done wrong or badly, both by the OS or apps on it, will drain battery life and kill the performance of foreground apps.  So code better and smarter for now).

So when you lose focus from your app/game, either when an in-coming call is received, or the user hits the Windows or Bing Key (back is just exit really) then the current app or game is terminated and pushed on to the Back queue (as the user has moved forward in their use of the device).  When the user then hit’s back (enough times to navigate back to your app/game) then your game/app is launched again from the back queue. 


### This process is called Tombstoning.

Now when your game / app (this could get tedious, I’m going to stick with game ![Smile](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/8446.wlEmoticonsmile_5F00_78174405.png)) is pushed in to the Back queue, the game is given a certain amount of time to save it is current state before it is cleared from memory, allowing the state of the game to be preserved.   When your game re-launches it can search for this saved state and use it to bring the game back to the state it was when the user was last playing it.  Sounds complicated?, well it is not.

See the diagram below (courtesy of Rob (English god) Miles and Andy (slightly shorter than Rob) Wigly’s , Jumpstart Program):

![Phone Execution Model1](assets/img/posts/image-not-found.png)              ![Phone Execution Model2](assets/img/posts/image-not-found.png)

As you can see from the above, your game starts as normal, loads it is assets, presents a start screen and so on until your game begins (bullets start flying, Enemies surround you and the player desperately tries to escape.  Or is that just me).  Then a call comes in and your game is requested to Terminate, this gives you approx 10 seconds (in the background) to save the state of your game before it dies.  When the users call is finished, the game is automatically started again.  At this point you have a chance to retrieve your saved state, set the game back up at the point it was closed and let the player loose again.  one thing to bear in mind though is that you have only another 10 seconds in which to do this again, or you are dead for good.

In Silverlight as in XNA, Tombstoning appears as events, that are automatically fired my the Phone OS, these are (in Phone events and XNA event respectively):

- Launching – Fired when ever the game is launched.  There is not a respective event in XNA, so it is just the game instantiation.
- Activated (OnActivated) – Fired after the game is loaded but before the first time Update or Draw are called
- DeActivated (OnDeactivated) – Fired as the game is requested to activate
- Closing (OnExiting) – Fired when deactivation is complete (or possibly when the deactivation time out expires) 

Now you may ask why does not the phone do this automatically, why not take a snapshot of my game state in memory and save it somewhere.  Good question, but what if your game is 50Mb big or more, or sounds and music are halfway through playing.  Way too complicated and potentially detrimental to the phones performance (plus what happens if your game crashes while the phone is trying to automatically save it!).  Better for the phone just to kill it, free up the memory (but give you a second wind to sort yourself out before it does).

To further assist this Tombstoning process, the Phone gives you a dedicated area in memory (like the isolated storage but separate) to store your state and the phone indexes this using it is own constructs to ensure it is managed, strangely enough called the Phone application services State object.

So how do we make use of this feature and not force the player to restart their entire game from scratch when they need to take a picture ![Winking smile](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis.metablogapi/6765.wlEmoticonwinkingsmile_5F00_6A24B270.png).

First let’s overview what we have in the Game State Management (GSM) sample and then improve it.

 

* * *


### The GSM structure

The GSM is a nice little architecture that has been around since the V1 days of XNA and has been improved and updated where breaking changes happen in the XNA library.  Up until XNA 4, it has been very hardy and a good starting point for anyone wanting to publish their game with a Free framework.

It looks like this:

![GSM Object Model](assets/img/posts/image-not-found.png)

It centres around a single game screen state model, with a list of current game screens to draw and a set of event handlers with some UI components to control navigation.  As you pass from one screen to the next, the old screens are thrown away and replace by new ones, the engine itself never has to change, it just draws what screens it is told to.  You also have the option of using an intermediary “Loading” screen, which only moves to the next game screen when it has finished loading (in case you have a lot of assets to load n a level of your game for example).  You can even layer screens so you can draw layered views, the Main menu screen for example has two components, a Background screen (for the background image) and the Menu text separate so it can be animated separately.

Behind this is a rudimentary input framework (mainly for the menu’s) and a set of default screens including:

> ![](assets/img/posts/image-not-found.png)    A Main Menu (with background)   
> ![](assets/img/posts/image-not-found.png)    An Options screen with some default options   
> ![](assets/img/posts/image-not-found.png)    A Basic Gameplay screen (for you to build on top of)   
> ![](assets/img/posts/image-not-found.png)    A Paused screen   
> ![](assets/img/posts/image-not-found.png)    A Message Box screen   
> ![](assets/img/posts/image-not-found.png)    A Loading screen

Behind each screen is a set of common options, that control if it is active or not, visible or not.  New for the phone is if Gestures are enabled and which ones, plus a host of elements and events needed for passing screen control around.

The Screen manager is the core of this control, it maintains the screens, adding or destroying them as necessary, sorting them and initiating drawing and updates.  Each screen can override these controls of course but they are all managed from one place to make it easier.

So with all this in place how do we sort out Tombstoning?

 

* * *


### Putting your game away first

When you are adding Tombstoning you can either use the Phones built in events through the “PhoneApplicationService” or you can use the built in extensions available within the XNA framework.  We will discuss the XNA events here, but if you are interested, I have included the Phone events within the sample project.

The events exposed through XNA are implemented simply by overriding the functions in the XNA game class like so:

    
    
         1: protected override void OnActivated(object sender, EventArgs args)
    
    
    
         2: {
    
    
    
         3: base.OnActivated(sender, args);
    
    
    
         4: }
    
    
    
         5: 
    
    
    
         6: protected override void OnDeactivated(object sender, EventArgs args)
    
    
    
         7: {
    
    
    
         8: base.OnDeactivated(sender, args);
    
    
    
         9: }
    
    
    
         10: 
    
    
    
         11: protected override void OnExiting(object sender, System.EventArgs args)
    
    
    
         12: {
    
    
    
         13: base.OnExiting(sender, args);
    
    
    
         14: }
    
    
    
    The original GSM already has some functions to serialise and deserialise the game screens currently active.  the main problem with these are:
    
    
    
    > ![](assets/img/posts/image-not-found.png)    They do not work in the Phones state model   
    > ![](assets/img/posts/image-not-found.png)    When the game exits it always you to the screen you were on when the game exits (even the game screen, however it just restarts it)   
    > ![](assets/img/posts/image-not-found.png)    It does not actually work, it both crashes when you launch the game for the second time you run the project.  I have modified it to work, but it is better if it is handled properly.
    
    
    
    So first off you will need to comment out (or remove) the original Serialise call from the “OnExiting” function and the DeSerialise call from the Game constructor.
    
    
    
    Next up we have two state parts of any game were hosting, the screen state (to hold which screen were on, however it is made up) and the Game state (to hold what is happening in our game). 
    
    
    
    For the first, we need to do a couple of things:
    
    
    
    > ![](assets/img/posts/image-not-found.png)    First: Pause the game, by setting the current screen to the Paused Screen class (not this screen was not in the original Phone GSM class, so I copied and fixed it up for this project)   
    > ![](assets/img/posts/image-not-found.png)    Second: Create a list of the current active screen   
    > ![](assets/img/posts/image-not-found.png)    Third: Save the list of active screens to the Phone State Store
    
    
    
    As follows:
    
    
    
        
        
             1: screenManager.AddScreen(new PauseGameScreen("Paused"), PlayerIndex.One);
        
        
        
             2: 
        
        
        
             3: Debug.WriteLine("XNA Application Deactivating");
        
        
        
             4: foreach (GameScreen screen in screenManager.GetScreens())
        
        
        
             5: {
        
        
        
             6: if (screen.IsSerializable)
        
        
        
             7: {
        
        
        
             8: ScreenStateList.Add(screen.GetType().AssemblyQualifiedName);
        
        
        
             9: Debug.WriteLine("XNA {0} Screen state saved", screen.GetType().AssemblyQualifiedName);
        
        
        
             10: 
        
        
        
             11: }
        
        
        
             12: }
        
        
        
             13: PhoneApplicationService.Current.State.Add("MenuState", ScreenStateList);
        
        
        
        The important line there is the last one.  The Phone state list is just a dictionary collection like any other, using a Key value to identify the state data you are storing, this is paired with the actual state you want to store.
        
        
        
        The critical thing here is that the Phone service must be able to automatically serialise the data within the state object, else you will get a nasty surprise when you try and store the state.
        
        
        
        For storing the Game state, I have created a separate GameState class for storing the games information should it be in play:
        
        
        
            
            
                 1: public class GameState
            
            
            
                 2: {
            
            
            
                 3: public static int PlayerLives;
            
            
            
                 4: public static Vector2 Position;
            
            
            
                 5: public static List\<EnemyState\> EmemyStates = new List\<EnemyState\>();
            
            
            
                 6: public static List\<ShotState\> ShotStates = new List\<ShotState\>();
            
            
            
                 7: 
            
            
            
                 8: 
            
            
            
                 9: public static void SaveEmemy()
            
            
            
                 10: {
            
            
            
                 11: EnemyState enemyState = new EnemyState();
            
            
            
                 12: enemyState.Position = Vector2.Zero;
            
            
            
                 13: enemyState.Health = 10;
            
            
            
                 14: EmemyStates.Add(enemyState);
            
            
            
                 15: }
            
            
            
                 16: 
            
            
            
                 17: public static void SaveShot()
            
            
            
                 18: {
            
            
            
                 19: ShotState shotState = new ShotState();
            
            
            
                 20: shotState.Position = Vector2.Zero;
            
            
            
                 21: ShotStates.Add(shotState);
            
            
            
                 22: }
            
            
            
                 23: }
            
            
            
                 24: 
            
            
            
                 25: public class EnemyState
            
            
            
                 26: {
            
            
            
                 27: public Vector2 Position;
            
            
            
                 28: public int Health;
            
            
            
                 29: }
            
            
            
                 30: 
            
            
            
                 31: public class ShotState
            
            
            
                 32: {
            
            
            
                 33: public Vector2 Position;
            
            
            
                 34: }
            
            
            
             
            
            
            
            The main game state class simply holds that information you need to retain in order to the state it was when the game was running last, this of course only an example.
            
            
            
            It also holds two sets of lists, one for storing the enemies on screen and another for storing all the shots.  If those classes hold custom classes or data, then you will also have to create separate classes to store the minimum about of information needed for recreating objects, plus functions within the gamestate class to convert them (as shown above)
            
            
            
            With that done, back in the Deactivating function, you just need to store your game information into the state object (or use it as part of the running of your game), then as with the Menu States store this into the Phone State Object like so:
            
            
            
             
            
            
            
                
                
                     1: //Save Game save state Here
                
                
                
                     2: PhoneApplicationService.Current.State.Add("GameSaveState", state);
                
                
                
                 
                
                
                
                 
                
                
                * * *
                
                
                 
                
                
                ### Now to finish the magic trick, lets get it back.
                
                
                So when we get kicked out of our game by a phone call from Bob, we at least we know that high score we were working on is safe and sound inside the phone, so now to get it back.
                
                
                
                Now as the Phone state object works just like any other dictionary, we just need to find our state and pull it back, one thing to keep in mind is that it may not be there, remember the first time we start up our game the activation event is still called before the game has finished loading, so before we try we need to check.  then it is just a case of doing the reverse operation with both the Menu and Game states.
                
                
                
                So first the menus, we need to get back to the right screen first right?.  So when we stored the Screen states, we just collected a list of screens in the correct order, so we need to turn this list back into the set of classes used by the game and put them back in to play (now this was where the CC GSM sample was good as I re-learned something new, getting a class from a string):
                
                
                
                 
                
                
                
                    
                    
                         1: if (PhoneApplicationService.Current.State.ContainsKey("MenuState"))
                    
                    
                    
                         2: {
                    
                    
                    
                         3: ScreenStateList = PhoneApplicationService.Current.State["MenuState"] as List\<String\>;
                    
                    
                    
                         4: foreach (String screenstate in ScreenStateList)
                    
                    
                    
                         5: {
                    
                    
                    
                         6: Type screenType = Type.GetType(screenstate);
                    
                    
                    
                         7: GameScreen screen = Activator.CreateInstance(screenType) as GameScreen;
                    
                    
                    
                         8: screenManager.AddScreen(screen, PlayerIndex.One);
                    
                    
                    
                         9: Debug.WriteLine("XNA Screen {0}", screenstate);
                    
                    
                    
                         10: 
                    
                    
                    
                         11: }
                    
                    
                    
                         12: PhoneApplicationService.Current.State.Remove("MenuState");
                    
                    
                    
                         13: Debug.WriteLine("XNA Screenstates Loaded");
                    
                    
                    
                         14: 
                    
                    
                    
                         15: //Get Game Save State Here
                    
                    
                    
                         16: if (PhoneApplicationService.Current.State.ContainsKey("GameSaveState"))
                    
                    
                    
                         17: {
                    
                    
                    
                         18: state = PhoneApplicationService.Current.State["GameSaveState"] as GameState;
                    
                    
                    
                         19: PhoneApplicationService.Current.State.Remove("GameSaveState");
                    
                    
                    
                         20: Debug.WriteLine("XNA Loaded Game states");
                    
                    
                    
                         21: 
                    
                    
                    
                         22: }
                    
                    
                    
                         23: }
                    
                    
                    
                    So you can see from the first line, we peek inside the Phone state object and see if our saved “MenuState” object is in there, if we find it we load the collection of screens fro the Phone State Object and initialise each screen in the order they were saved.
                    
                    
                    
                    We then go on to Load the Game Save state and restore that, then you would need to check if you need to restore it and load up game objects if the player was in the middle of playing the game.  In a similar way to the way that the screens were restored, you would need to load up your game object up on screen. (I’ve left this part out as its down to how your game is made!)
                    
                    
                    
                    If the Games state could not be found in the Phone State Object, then the logic assumes this is the first time you are starting the game, so we enhance the code above with an Else statement:
                    
                    
                    
                     
                    
                    
                    
                        
                        
                             1: else
                        
                        
                        
                             2: {
                        
                        
                        
                             3: GameScreen[] StartScreens = new GameScreen[2];
                        
                        
                        
                             4: StartScreens[0] = new BackgroundScreen();
                        
                        
                        
                             5: StartScreens[1] = new MainMenuScreen();
                        
                        
                        
                             6: Texture2D LoadingTexture = Content.Load\<Texture2D\>(@"SplashScreenImage");
                        
                        
                        
                             7: LoadingScreen.Load(screenManager, 2, LoadingTexture, PlayerIndex.One, StartScreens);
                        
                        
                        
                             8: 
                        
                        
                        
                             9: Debug.WriteLine("XNA Loaded Default Screens");
                        
                        
                        
                             10: 
                        
                        
                        
                             11: }
                        
                        
                        
                             12: base.OnActivated(sender, args);
                        
                        
                        
                         
                        
                        
                        
                        I have also enhanced the basic start up of the game, so that instead of just showing the Main Menu.  It uses an overloaded Load function to also show a Splashscreen before the Main menu is shown (i’ve copied the Splashscreen.JPG from silverlight projects to show this).
                        
                        
                        
                        And that is it. whether the game is starting new or being restarted by the phone tombstoning events you game will either start fresh or return the player back into the middle of the action (once they un pause it of course).
                        
                        
                        
                         
                        
                        
                        * * *
                        
                        
                         
                        
                        
                        ### Now for a bit of bad news
                        
                        
                        I will leave you with one other issue that exists right now.  There is a bug in the XNA framework in the BETA, this cause the game to actually crash when it exits and not close down cleanly.
                        
                        
                        
                        This means the Tombstoning does not actually function in the emulator at present.
                        
                        
                        
                        However thanks to helpers who are lucky enough to have WP7 dev devices (not me unfortunately ![Open-mouthed smile](/assets/img/wordpress/2012/06/wlEmoticon-openmouthedsmile4.png)), they have tested the above code on their actual devices and it works very nicely.
                        
                        
                        
                        If anything changes between now and the RC, i’ll be sure to keep this sample updated.
                        
                        
                        
                         
                        
                        
                        * * *
                        
                        
                         
                        
                        
                        ### The End, or is it…..
                        
                        
                        Well nearly the end.  the original GSM had one other little flaw.  You could not get out of it!
                        
                        
                        
                        So I’ve added a prompt screen to ask the user should they wish to exit and then either exit the game or return them to the game, first we need a flag to tell our game to exit which needs to go at the top of the Main Game class:
                        
                        
                        
                            
                            
                                 1: public static bool ExitGame;
                            
                            
                            
                            Then just add this little bit of code to the top of the Update function in the Main Game class:
                            
                            
                            
                                
                                
                                     1: //If the users wishes to exit, do so
                                
                                
                                
                                     2: if (ExitGame) this.Exit();
                                
                                
                                
                                     3: 
                                
                                
                                
                                     4: // Allows the game to exit
                                
                                
                                
                                     5: if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed && screenManager.CurrentScreenName() == "MainMenuScreen")
                                
                                
                                
                                     6: //Are you sure?
                                
                                
                                
                                     7: screenManager.AddScreen(new MessageBoxScreen("Are you sure you want to Exit?"), PlayerIndex.One);
                                
                                
                                
                                 
                                
                                
                                
                                 
                                
                                
                                * * *
                                
                                
                                 
                                
                                
                                ### Q&A
                                
                                I got a mail from Simon (Not me) below:
                                
                                
                                
                                  Hello, thanks for your great Tombstoning Tutorial.
                                
                                
                                
                                 
                                
                                Actually I got some questions:
                                
                                
                                
                                 
                                
                                You have 4 Eventhandlers:
                                
                                
                                
                                            PhoneApplicationService.Current.Launching += new System.EventHandler\<LaunchingEventArgs\>(Application\_Launching);
                                
                                
                                
                                            PhoneApplicationService.Current.Activated += new System.EventHandler\<ActivatedEventArgs\>(Application\_Activated);
                                
                                
                                
                                            PhoneApplicationService.Current.Deactivated += new System.EventHandler\<DeactivatedEventArgs\>(Application\_Deactivated);
                                
                                
                                
                                            PhoneApplicationService.Current.Closing += new System.EventHandler\<ClosingEventArgs\>(Application\_Closing);
                                
                                
                                
                                 
                                
                                
                                
                                 
                                
                                
                                
                                 
                                
                                What’s the difference between the Method:
                                
                                
                                
                                        private void Application\_Activated(object sender, LaunchingEventArgs e)
                                
                                
                                
                                        {
                                
                                
                                
                                            Debug.WriteLine(“Phone Application Launching”);
                                
                                
                                
                                        }
                                
                                
                                
                                 
                                
                                That refers to the event handler and the Method:
                                
                                
                                
                                protected override void OnActivated(object sender, EventArgs args){}
                                
                                
                                
                                 
                                
                                I didn’t get the difference.
                                
                                
                                
                                 
                                
                                What I know is, that the Application\_Activated() is called, when the App is reactivated 😉
                                
                                
                                
                                 
                                
                                
                                
                                 
                                
                                But what I don’t know is on which state which method is called.
                                
                                
                                
                                 
                                
                                On Exiting do I dispose there?
                                
                                
                                
                                Response:
                                
                                
                                
                                I can break that down in to 3 separate questions:
                                
                                
                                - What’s the difference between the “PhoneApplicationService.Current.Activated” and event handler and the “OnActivated” method. 
                                
                                
                                Short answer nothing.  There is nothing different about these two implementations, just that one is provided by the Phone frame work (The Phone application service) and one is provided by the XNA framework which overrides the base Phone application service event.  The main difference is when they are called, the Phone Application service call will finish BEFORE the XNA framework method starts.  You can see this if you put debug messages in each of the areas.
                                
                                
                                
                                The Only real difference in XNA as to which one you use depends on the dependency your tombstoning code has, which is more trial and error.  However using the Phone Application service events wil give you a few more milliseconds to store any state you need, but it is marginal the extra time you get.
                                
                                
                                - When is the Activated function called 
                                
                                
                                The Activated function (more detail in the follow up blog) in XNA is called just after the XNA game constructor. 
                                
                                
                                
                                So the order is like this XNA Framework constructor -\> Game Constructor -\> OnActivated -\> Initialise.
                                
                                
                                - Do I dispose in the OnExiting method 
                                
                                
                                Disposing in XNA properly is a fine art.  The best guidance is to dispose or clean up your content in the “UnLoadContent” method, save any state information you require in the OnDeactivated method and then any final clean-up in the OnExiting function.
                                
                                
                                
                                However in practice only the first two are required on the Phone as the base framework does a very good job of clearing you out when you close.  This is different to the XBOX and Windows where you need to be more careful.  As always it’s good practice to clean up the room after you leave, especially if you are making a multi-platform game, just on the phone it’s a little less important (Shoot me if anyone thinks this is wrong / lazy 😀 )
                                
                                
                                
                                Hopefully that answers your questions Simon.
                                
                                
                                
                                If anyone has any other questions about tombstoning, you can contact me through the site here using the “Contact Me” feature.
                                
                                
                                
                                * * *
                                
                                
                                 
                                
                                
                                ### Conclusion
                                
                                
                                There are a few little extras in the sample code, look if you dare.  But were not quite done yet, lets see what else we can add to the base Game State Management sample and improve it further.
                                
                                
                                
                                Now where did I leave my keys.
                                
                                
                                Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[Windows Phone Development](http://technorati.com/tags/Windows+Phone+Development),[Tombstoning](http://technorati.com/tags/Tombstoning)
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

