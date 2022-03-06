---
layout: post
title: Game Music and Sound Effects - Lesson 7
date: '2012-06-29 11:25:57'
tags:
- 2d
- game-development
- xna
- xna-2d-tutorials
---

Finally we get something more than just looking at a quiet screen blinking images on and off.  For this section we look to excite our ears and bring in the sound.  We will also look to adding some managed test to the screen to give our actions meaning.

As usual the original Digipen webcast and supporting materials can be found on [Codeplex here](http://startrooper2dxna.codeplex.com/releases/view/49595) with all the source (both GS3.1 and WP7) for this lesson.

### Source updated for Final combined update project for GS 4.0 project [here on Codeplex](http://startrooper2dxna.codeplex.com/releases/view/61496) (Windows and WP7)

Thankfully, there are no major changes to the audio framework between GS 3.1 and GS 4, so this will be a combine article, update which ever project you wish when following this.

* * *

### 1. Sound

When playing sound in XNA (and indeed in silver light since it also uses the XNA audio libraries), we generally have 3 different types of audio we want to use:

> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Sound effect – use once and throw away effect, the simplest form of playing a sound.   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Prolonged or dynamic effect – where more advanced control is required, like altering the pitch, looping, etc.   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Streamed effect – Useful when playing large audio files like background music.

In this section we will cover the first two and continue with 3 in the next intermission as it required the more advanced XACT sound library.

 

#### 1.1 Sound Effects

A sound effect is a sound that is triggered by a certain event in the game. This sound can be triggered by a certain   
action or event, like firing a bullet, a tank explosion, or a ball hitting a wall.

 

#### 1.2 Game Implementation: Adding Sound Effects

Implementing simple sound effects is very easy, just load the audio file and play it.

So to implement the sound effect we:

> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Add two static variables into the “StarTrooperGame.CS” with the rest of the main game variables (after the trooper and condor static variables):
> 
>  
> 
>     
>     
> 1: public static SoundEffect Shoot;
>     
>     
>     
> 2: public static SoundEffect Die;
>     
>     
>     
>  
>     
>     
>     
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Load the sound files from the Content library in the main LoadContent() function.  Ensure you have added the actual files themselves in to the Content project in a folder called “Sounds”:
>     
>     
>     
>  
>     
>     
>     
>         
>         
> 1: Shoot = Content.Load\<SoundEffect\>(@"Sounds\shoot");
>         
>         
>         
> 2: Die = Content.Load\<SoundEffect\>(@"Sounds\die");
>         
>         
>         
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Call the “Play” function of the sound file in the Trooper code in “StarTrooperSprites.cs”, just add the following at the end of the TrooperFire() function:
>         
>         
>         
>  
>         
>         
>         
>             
>             
> 1: StarTrooperGame.Die.Play();

This plays the sound effect file just once until it finishes.

 

* * *

 

### 2. Prolonged / Dynamic effects

Now some sounds need a bit more time tweaking or need to run continuously.  We may also need to run multiple copies of the same sound, for this we need to create a separate copy of the sound effect, this is called a sound effect instance.

With a sound effect instance, using the same sound effect file we can:

> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Loop the sound continuously   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Raise or lower the pitch   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Raise or lower the volume   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Pan the sound around   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Apply 3D effects (Will be covered in the Intermission)

#### 2.1 Music

For the tutorial, the music is the sound that is played on the background while the game is being played. It can be repetitive or   
just played once.

 

#### 2.2 Game Implementation: Adding Music

Applying an instance to a sound effect is no more difficult than implementing a sound effect, you just need a little extra:

> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Create two static properties for the music sound and one for the sound effect instance: (you can have more than one instance of a sound running at the same time)
> 
>  
> 
>     
>     
> 1: public static SoundEffect Music;
>     
>     
>     
> 2: public static SoundEffectInstance BackgroundMusic;
>     
>     
>     
>  
>     
>     
>     
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Load the Sound file for the Sound effect in the LoadContent() function:
>     
>     
>     
>  
>     
>     
>     
>         
>         
> 1: Music = Content.Load\<SoundEffect\>(@"Music\music");
>         
>         
>         
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    Instantiate sound effect instance from the sound effect, set it to loop and start it playing:
>         
>         
>         
>  
>         
>         
>         
>             
>             
> 1: BackgroundMusic = Music.CreateInstance();
>             
>             
>             
> 2: BackgroundMusic.IsLooped = true;
>             
>             
>             
> 3: BackgroundMusic.Play();

> ![](http://www.dotnetscraps.com/samples/bullets/034.gif)    Note

> I hit an issue with the original assets from DigiPen, for some reason the original “Music.WAV” sound file would not load into the GS 4.0 content pipeline and just caused a “Value does not fall within the expected range” error then I tried to play for file.  Just recompiling the audio file (using an audio editor, such as [Audacity](http://audacity.sourceforge.net/)) fixed the problem.

* * *

### Text

Text is a tricky thing in games, reason being that when a game draws to a screen it only knows how to colour pixels and draw vectors.  Fonts and text are completely foreign concepts.

The way we get around this is to compile a spritesheet full of all the letters of test that we want to see on the screen and then (the same as sprites) just draw them to the screen in the correct order with the right spacing.  Thankfully in XNA this process is simplified a lot, instead of manually creating your text spritesheet in the style you want, XNA dynamically creates the spritesheet in the content pipeline.  We are also provided with some simplified text drawing functions that will take a string and draw it to the screen with the proper spacing and orientation.

 

#### 2.1 Text Manager

To make life easier if you are going to have a lot of text on the screen, it is easier to manage it in a Text Manager (completely option though) which is similar to the Sprite and Particle managers, it just maintains a list of text to draw, including the locations and colour of the text with the appropriate font.

 

#### 2.2 Why Do We Use It?

In games there can be several reasons why we would want to draw text to the screen:

> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    To display the content of a text file   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    To display the value of a variable   
> ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    To display certain messages during the game

#### 2.3 Game Implementation: Text Manager

First we will set up the Text manager, this is broken in to two parts, first the Text class, which his just a collections of properties used when drawing text (font,position, colour)

So setup a new class in the engine folder called Text.cs (remember to update the namespace to remove the .engine from the end of the namespace) and replace the class definition with the code below:

 

    
    
         1: public class Text2D
    
    
    
         2: {
    
    
    
         3: public Text2D(SpriteFont font)
    
    
    
         4: {
    
    
    
         5: m\_Font = font;
    
    
    
         6: }
    
    
    
         7: 
    
    
    
         8: public Vector2 Position
    
    
    
         9: {
    
    
    
         10: set
    
    
    
         11: {
    
    
    
         12: m\_Position = value;
    
    
    
         13: }
    
    
    
         14: get
    
    
    
         15: {
    
    
    
         16: return m\_Position;
    
    
    
         17: }
    
    
    
         18: }
    
    
    
         19: 
    
    
    
         20: public Color Color
    
    
    
         21: {
    
    
    
         22: set
    
    
    
         23: {
    
    
    
         24: m\_Color = value;
    
    
    
         25: }
    
    
    
         26: get
    
    
    
         27: {
    
    
    
         28: return m\_Color;
    
    
    
         29: }
    
    
    
         30: }
    
    
    
         31: 
    
    
    
         32: public string Text
    
    
    
         33: {
    
    
    
         34: set
    
    
    
         35: {
    
    
    
         36: m\_Text = value;
    
    
    
         37: }
    
    
    
         38: get
    
    
    
         39: {
    
    
    
         40: return m\_Text;
    
    
    
         41: }
    
    
    
         42: }
    
    
    
         43: 
    
    
    
         44: public bool Visible
    
    
    
         45: {
    
    
    
         46: set
    
    
    
         47: {
    
    
    
         48: m\_Visible = value;
    
    
    
         49: }
    
    
    
         50: get
    
    
    
         51: {
    
    
    
         52: return m\_Visible;
    
    
    
         53: }
    
    
    
         54: }
    
    
    
         55: 
    
    
    
         56: public bool Active
    
    
    
         57: {
    
    
    
         58: set
    
    
    
         59: {
    
    
    
         60: m\_Active = value;
    
    
    
         61: }
    
    
    
         62: get
    
    
    
         63: {
    
    
    
         64: return m\_Active;
    
    
    
         65: }
    
    
    
         66: }
    
    
    
         67: 
    
    
    
         68: public void Draw(GameTime gametime, SpriteBatch spritebatch)
    
    
    
         69: {
    
    
    
         70: if (m\_Visible)
    
    
    
         71: spritebatch.Begin();
    
    
    
         72: spritebatch.DrawString(m\_Font, m\_Text, new Vector2(m\_Position.X, m\_Position.Y), m\_Color);
    
    
    
         73: spritebatch.End();
    
    
    
         74: }
    
    
    
         75: 
    
    
    
         76: public void InternalUpdate()
    
    
    
         77: {
    
    
    
         78: if (!m\_Active)
    
    
    
         79: return;
    
    
    
         80: Update();
    
    
    
         81: }
    
    
    
         82: 
    
    
    
         83: public virtual void Update()
    
    
    
         84: {
    
    
    
         85: 
    
    
    
         86: }
    
    
    
         87: 
    
    
    
         88: #region PrivateData
    
    
    
         89: 
    
    
    
         90: string m\_Text = "";
    
    
    
         91: Color m\_Color = Color.Black;
    
    
    
         92: Vector2 m\_Position;
    
    
    
         93: 
    
    
    
         94: bool m\_Visible = true;
    
    
    
         95: bool m\_Active = true;
    
    
    
         96: 
    
    
    
         97: SpriteFont m\_Font;
    
    
    
         98: 
    
    
    
         99: #endregion PrivateData
    
    
    
        100: }
    
    
    
     
    
    
    
    If you look through it, it is like most of the other classes with a set of private attributes and a public set of properties to expose them.
    
    
    
    Next check or add the List collections for the the text class to the main game class:
    
    
    
     
    
    
    
        
        
             1: static List\<Text2D\> m\_Text2Ds = new List\<Text2D\>();
        
        
        
             2: static List\<Text2D\> m\_DeletedText2Ds = new List\<Text2D\>();
        
        
        
             3: static List\<Text2D\> m\_AddedText2Ds = new List\<Text2D\>();
        
        
        
         
        
        
        
        And add / check the relevant Update and Draw sections.
        
        
        
        InternalUpdate function (Since we mange all the game libraries from here):
        
        
        
         
        
        
        
            
            
                 1: foreach (Text2D t in m\_AddedText2Ds)
            
            
            
                 2: m\_Text2Ds.Add(t);
            
            
            
                 3: m\_AddedText2Ds.Clear();
            
            
            
                 4: 
            
            
            
                 5: foreach (Text2D t in m\_DeletedText2Ds)
            
            
            
                 6: m\_Text2Ds.Remove(t);
            
            
            
                 7: m\_DeletedText2Ds.Clear();
            
            
            
                 8: 
            
            
            
                 9: foreach (Text2D t in m\_Text2Ds)
            
            
            
                 10: t.InternalUpdate();
            
            
            
             
            
            
            
            Draw:
            
            
            
             
            
            
            
                
                
                     1: foreach (Text2D t in m\_Text2Ds)
                
                
                
                     2: t.Draw(gameTime, spriteBatch);
                
                
                
                 
                
                
                #### Finally add the helper function for adding the text to the text lists in the same way we add sprites:
                
                
                    
                    
                         1: public static void Add(Text2D text)
                    
                    
                    
                         2: {
                    
                    
                    
                         3: m\_AddedText2Ds.Add(text);
                    
                    
                    
                         4: }
                    
                    
                    #### 2.4 Game Implementation: Adding text
                    
                    
                    That is all the management code in place, so now time to add some text to the screen.
                    
                    
                    
                    First add a new SpriteFont to the Content Manager.  Add a folder for Fonts to the Content Project and then right click on the folder, select “SpriteFont” from the XNA section: ![](http://xna-uk.net/resized-image.ashx/ __size/550x0/__ key/CommunityServer.Blogs.Components.WeblogFiles/darkgenesis/2161.SpriteFontInsert.png)
                    
                    
                    
                    Give it an appropriate name, I simply kept the default of “SpriteFont1”.  If you open this file, you will see it is just a text file, which lists the truetype font name (from which the spritesheet will be created from) and the size of the font (plus some other settings).  If you added the FPS component from earlier in the series, you may already have a “SpriteFont1” in the root of the content manager,
                    
                    
                    
                    you can either move that to the fonts folder and update the FPS component or select a new name.  Just remember to use the new name of your font if you change it.
                    
                    
                    
                     
                    
                    
                    
                    > ![](http://www.dotnetscraps.com/samples/bullets/034.gif)    A big thing to mention, is that XNA by default selects the Open Source font of “Kootenay”.  If you use another font be aware of the licensing of that font unless you want a knock on the door from the license police who will be ready and waiting for a check from you. (for all the cash they lost by you using their font!!)
                    
                    
                    
                     
                    
                    
                    
                    Next you need load the Font you just added, you have two options, either create a new attribute for your font, or simply load the font when you create your text, it is up to you.  As I intent to use the same font for all text in the tutorial, lets to the former.
                    
                    
                    
                    Add an attribute to the state of the main game class:
                    
                    
                    
                     
                    
                    
                    
                        
                        
                             1: public static SpriteFont font;
                        
                        
                        
                         
                        
                        
                        
                        And load the font in the LoadContent() function:
                        
                        
                        
                         
                        
                        
                        
                            
                            
                                 1: font = Content.Load\<SpriteFont\>(@"Fonts\SpriteFont1");
                            
                            
                            
                             
                            
                            
                            
                            Next we will add the text we want on the screen.  We will have two sets of text, one for how many shots our trooper has fired and our game score.
                            
                            
                            
                            So as we want to update the text (by incrementing shots and score) we need to keep a reference to the Text classes we need to create (if we just wanted text on the screen, we could add it to the game and forget about it).  Put this in the beginning of the main game class:
                            
                            
                            
                             
                            
                            
                            
                                
                                
                                     1: public static int score;
                                
                                
                                
                                     2: public static Text2D ScoreText;
                                
                                
                                
                                     3: 
                                
                                
                                
                                     4: public static int shots;
                                
                                
                                
                                     5: public static Text2D ShotsText;
                                
                                
                                
                                 
                                
                                
                                
                                Next in the LoadContent() function, we need to setup the text:
                                
                                
                                
                                 
                                
                                
                                
                                    
                                    
                                         1: ScoreText = new Text2D(font);
                                    
                                    
                                    
                                         2: ScoreText.Text = "Score: " + score.ToString();
                                    
                                    
                                    
                                         3: ScoreText.Position = new Vector2(10,10);
                                    
                                    
                                    
                                         4: ScoreText.Color = Color.Red;
                                    
                                    
                                    
                                         5: StarTrooperGame.Add(ScoreText);
                                    
                                    
                                    
                                         6: 
                                    
                                    
                                    
                                         7: ShotsText = new Text2D(font);
                                    
                                    
                                    
                                         8: ShotsText.Text = "Shots: " + shots.ToString();
                                    
                                    
                                    
                                         9: ShotsText.Position = new Vector2(150, 10);
                                    
                                    
                                    
                                         10: ShotsText.Color = Color.Red;
                                    
                                    
                                    
                                         11: StarTrooperGame.Add(ShotsText);
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                    Next we update the Trooper class in StarTrooperSprites.cs, so that we increment the number of shots as we fire, so add the following to the end of the TrooperFire function:
                                    
                                    
                                    
                                     
                                    
                                    
                                    
                                        
                                        
                                             1: StarTrooperGame.shots++;
                                        
                                        
                                        
                                         
                                        
                                        
                                        
                                        There were all done, are not we?
                                        
                                        
                                        
                                        If you run the game at this point, you should notice two things:
                                        
                                        
                                        
                                        > ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    When the trooper fires, the score does not change   
                                        > ![](http://www.dotnetscraps.com/samples/bullets/004.gif)    The size of the text is really really tiny
                                        
                                        
                                        
                                        Why does not the text change?, we have setup the text to use our variable for keeping score and we are incrementing that value each time we fire.  the answer is simple, because you have not updated the text, just because you supplied the score attribute when setting up the text does not mean it is linked in anyway, you just added some text and copied the value with you created it.
                                        
                                        
                                        
                                        So just add the following in to the update function in the main game class, we can copy the same text we used when setting up the text in the content function:
                                        
                                        
                                        
                                         
                                        
                                        
                                        
                                            
                                            
                                                 1: ScoreText.Text = "Score: " + score.ToString();
                                            
                                            
                                            
                                                 2: ShotsText.Text = "Shots: " + shots.ToString();
                                            
                                            
                                            
                                             
                                            
                                            
                                            
                                            So now the number of shots update, what about the Score.  Well that will come later when we tell the game that we have scored.  We cannot do that now because we do not know when a shot has hit a Condor or when a Condor has actually reached our Trooper and destroyed it.
                                            
                                            
                                            
                                            As for the size of the text, that is because we told it to draw really small.  Open up the SpriteFont1.spritefont file (or what ever you called it) and look at the attribute for Size.
                                            
                                            
                                            
                                            Now change it to something a bit bigger, like 20.
                                            
                                            
                                            
                                             
                                            
                                            
                                            * * *
                                            
                                            
                                             
                                            
                                            
                                            ### Conclusion
                                            
                                            
                                            So we now have some sound and we have some text, what could be better than that.  Well in the next intermission we will explore the wonders of 3D sound and the power of the XACT tool (XNA Cross-Platform Audio Creation Tool)
                                            
                                            
                                            
                                            “Did you hear that, I think it came from over there!”
                                            
                                            
                                            Technorati Tags: [XNA](http://technorati.com/tags/XNA),[wp7dev](http://technorati.com/tags/wp7dev),[Windows Phone Development](http://technorati.com/tags/Windows+Phone+Development)
                                        
                                        
                                    
                                    
                                
                                
                            
                            
                        
                        
                    
                    
                
                
            
            
        
        
    
    

