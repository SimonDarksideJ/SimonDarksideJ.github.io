---
layout: post
title: Mastering Unity 2D Game Development - AI and State machines
date: 2014-08-28 18:50:01
tags: [mastering-unity-2d, unity3d]
---

It’s finally here, my first title has now been published on Packt’s publishing site and all of the leading online bookstores (probably a few less reputable as well ??).  If you like what you see in these snippets, they you are going to love the full book. Here is an overview of what is in store for you.

> The sample project and code for this snippet can be found here: – [Mecanim State Machines.zip](http://bit.ly/MU2D-MecanimStateMachines "Mastering Unity 2D Game Development - Animation Curves snippet")


### [Mastering Unity 2D Game Development](https://www.packtpub.com/mastering-unity/book)

[![Mastering Unity 2D Game development](assets/img/posts/image-not-found.png)](https://www.amazon.co.uk/gp/product/1849697345/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1849697345&linkCode=as2&tag=zenistud-21&linkId=3c469276675c4d3a8de510a7a7b53421)


# About the book

The book was an interesting challenge for me and is written with the same flair I use within my blog, I have always felt it is better to educate and show you, not only how to do things but also why you should do it one way over another, plus if there are any alternatives, I will point them out.  As a reader you should be informed about your choices (and then make your own mind up ![Open-mouthed smile](/assets/img/wordpress/2014/08/wlEmoticon-openmouthedsmile.png)).

Through its pages you will build an RPG game framework which you can then extend and make your own, the aim is to give you enough hints, tips and help to build your own finished game.

Here is what you should expect from the title:

- A run through the new improvements in Unity 4.3 and 2D game development (plus everything else in case you missed it)
- A deep dive in to the new Sprite system and the Animation improvements (the first of my chapters that got so big it had to be split in twain)
- Working with 2D camera’s, scenes and sprite layering plus some advanced coding techniques which lead up to building your own RPG conversation system.
- We cover building a map and exploration system with the eventual conclusion of running in to some nasty goblins who have a really mean steak
- If shopping is your thing, you’ve come to the right place, can I interest you in this lovely lv 1 sword. Learn to build a shopping system and then head back out in to the fray
- In the second chapter that also got two big for its boots and had to be severed right down the middle we cover turn based battle systems, including some was to use Mecanim that you may have never considered before (State battle machines and AI anyone?)
- With the game framework done we look at finishing your title and looking at the editor to see how we can extend it to help build our game for us (editor scripting, yummy), rounding up with an in depth report on enabling in-app purchasing the right way
- Finally, we round up with a look at extending and deploying to platforms, cram packed with help on serialisation (saving and loading), making code only run on specific platforms or the editor and masses of hints and tips on marketing

> My only regret with this book is that it couldn’t be bigger ![Open-mouthed smile](/assets/img/wordpress/2014/08/wlEmoticon-openmouthedsmile.png) there is more than enough information within this titles pages to get you 90% there with your own game, all you got to do is finish it and add lots more content!.

As with everything I do, if there is more you want to know on any subject within the book, drop me a line or comment on my blog and I will be more than happy to write even more on the subject.

* * *


# Enough about the book – Where is my snippet

The second snippet in this series is more of a tease than a full snippet, simply because it is such an interesting subject, only the book does it true justice with a full working example:


### Mecanim state machines

(I still keep typing Mechanim and keep having to delete the H, lol )

For any of you who have played with Mecanim you will have found it to be a great 3D animation system to animate your 3D models using rigs and prepared animations, plus it can blend those animations together to give a more realistic view. At its heart though, Mecanim is nothing more than a very fancy state machine with a wonderful graphical interface.  It was they enhanced in Unity 4.3 to include 2D sprite animation as well.

What you may not realise is that you do not have to use Mecanim for just animation, you can use it for almost any scenario that requires a state machine, from Game state to even AI machines! Each have their own types of implementations and their own little tips and tricks to make the best of them.


### A simple game state machine

The simplest example of a non-animator Mecanim system is a game’s battle state machine, there are a few complexities to the approach (mostly due to the way Mecanim handles current state) that we need to handle but in the end we get a much better system with a easy to manage interface,

If we try to do a simple game state system in code, we usually end up with a complicated mess of switch or if statements all competing to figure out what it supposed to happen in each game update (it is not always messy but it can easily get that way).

Say we have the current flow:

[![image](/assets/img/wordpress/2014/08/image.png "image")](/assets/img/wordpress/2014/08/image.png)

In normal code we would most likely start with an _Enum_ definition for each state (or just use strings if you are daring) like this:

    enum BattleState { Battle\_start, Intro, Player\_attack, Opponent\_attack, Player\_dead, Opponent\_dead, Battle\_result, Battle\_over }

Then in the update look implement something like this:

    void Update () { //wait loop when a pause is required if (timer \> 0) { timer -= Time.deltaTime; return; } // Set the next state; currentBattleState = nextBattleState; //What to do in the current state and where to go next switch (currentBattleState) { case BattleState.Battle\_start: playerHealth = 10; opponentHealth = 10; nextBattleState = BattleState.Intro; break; case BattleState.Intro: timer = 3f; nextBattleState = BattleState.Player\_attack; break; case BattleState.Player\_attack: if (Input.GetKeyDown(KeyCode.Space)) { opponentHealth -= 5; if (opponentHealth \<= 0) { nextBattleState = BattleState.Opponent\_dead; } else if (playerHealth \<= 0) { nextBattleState = BattleState.Player\_dead; } else { nextBattleState = BattleState.Opponent\_attack; } } break; case BattleState.Opponent\_attack: playerHealth -= Random.Range(0, 10); if (opponentHealth \<= 0) { nextBattleState = BattleState.Opponent\_dead; } else if (playerHealth \<= 0) { nextBattleState = BattleState.Player\_dead; } else { nextBattleState = BattleState.Player\_attack; } timer = 1f; break; case BattleState.Player\_dead: case BattleState.Opponent\_dead: timer = 3f; nextBattleState = BattleState.Battle\_over; break; case BattleState.Battle\_result: timer = 2f; nextBattleState = BattleState.Battle\_over; break; } }

As soon as we want to add a little change, we end up trawling through all the paths to check what state we are in, to the state we need to be and what flags we need to set. (in my experience you also end up with unintended effects that cause you to add more states to track different conditions and usually making things worse or harder to diagnose in the future ![Confused smile](/assets/img/wordpress/2014/08/wlEmoticon-confusedsmile.png))

_You can see this more fully by checking out the **OldStyleStateMachine.cs** script attached to the **BattleStateMachine** GameObject in the example scene with the downloadable project. Just turn it on to see the basic example. (ensuring you turn off the Mecanim script)_

A very basic example indeed, but just imaging it 50x bigger with several complicated paths, each part of the code needing to know everything around it in order to make the right decision, now you may start to see the larger picture.

 


### So what has Mecanim ever done for us?

Using Mecanim itself to implement the flow of the state machine is very simple, in fact we’ve practically drawn it above. Taking our outline in the image, we can convert this to a Mecanim design board looking something like this:

[![image](/assets/img/wordpress/2014/08/image1.png "image")](/assets/img/wordpress/2014/08/image1.png)

We’ve replicated the flow of our game state design as empty Mecanim states and added some parameters to the Animator to track health, whether we are in battle and a trigger to denote an attack has occurred.  So what about the code, how does using Mecanim simplify things?

Putting it simply it removes all the choice and decision from code, that is now all moved to Mecanim and we simply need to tell the Animator when something changes.  If we then apply this Animator to the BattleStateMachine GameObject in our example scene, using the above controller assigned to the controller property, we can then look to exploit it through script.

> Even better, any state can be quickly joined to any other state with a simple and quick transition

Still using our _Enum_ as before (as it is the code’s guide to what is going on), our code is simply reduced to:

    void Update() { currentBattleState = battleStateHash[battleStateMachine.GetCurrentAnimatorStateInfo(0).nameHash]; switch (currentBattleState) { case BattleState.Battle\_start: playerHealth = 10; opponentHealth = 10; battleStateMachine.SetInteger("Player\_health", playerHealth); battleStateMachine.SetInteger("Opponent\_health", opponentHealth); battleStateMachine.SetBool("Battle\_inprogress", true); break; case BattleState.Player\_attack: Attacking = false; if (Input.GetKeyDown(KeyCode.Space) && !keyPressed) { keyPressed = true; opponentHealth -= Random.Range(3, 5); battleStateMachine.SetTrigger("Attack"); } battleStateMachine.SetInteger("Opponent\_health", opponentHealth); break; case BattleState.Opponent\_attack: keyPressed = false; if (!Attacking) { playerHealth -= Random.Range(0, 10); battleStateMachine.SetTrigger("Attack"); Attacking = true; } battleStateMachine.SetInteger("Player\_health", playerHealth); break; case BattleState.Battle\_result: battleStateMachine.SetBool("Battle\_inprogress", false); break; } }

This removes a lot of the complexity for the state machine from the code and you simply need to state what you want to happen at each gate.

There are a few gotcha’s we need to be aware of which are mainly to do with the power and speed of Mecanim:

- Update runs faster than Mecanim, so if you have singular actions in your update code you need to cater for this (as shown by a few private boolean’s)
- Inputs (like keyboard) can be true for several update loops (hence the boolean’s for keyboard input)
- Mecanim will do EXACTLY what you tell it to, which can cause confusion and multiple paths can be true at the same time!

Now that is almost the end of the story as you will note that at the beginning of each update we get the Animator’s current state.  The problem is that Mecanim currently does not work with state names at all, it actually uses a hashing mechanism to track not only the current state the Animator is currently positioned at but also the exact point in the states life it’s currently up to (useful if you are doing blending or animation, less useful if you just want the state).  As we like to work with names (optional of course, you can work with just the hashed numbers) we need to cache them, in the script I create a dictionary and cache them with the script starts, if you wished, you could cache them at build time.

> In testing I’ve not seen much of a hit but if you have a lot of states, it may be something to consider caching state names at build time.

So in the example the Start and Awake methods look as follows to cache the state names and hash keys:

    Animator battleStateMachine; private Dictionary\<int, BattleState\> battleStateHash = new Dictionary\<int, BattleState\>(); private BattleState currentBattleState; int playerHealth, opponentHealth; Rect windowRect = new Rect(Screen.width / 2 - 100, Screen.height / 2 - 100, 200, 50); bool keyPressed, Attacking; void Awake() { //Get the Animator state machine, error if none found on this GO battleStateMachine = (Animator)GetComponent(typeof(Animator)); if (!battleStateMachine || !battleStateMachine.runtimeAnimatorController) { Debug.LogError("State Machine Missing or not configured)"); } } void Start () { //Cache all the hashes of the States in our State Machine (case sensitive!) foreach (BattleState state in (BattleState[])System.Enum.GetValues(typeof(BattleState))) { battleStateHash.Add(Animator.StringToHash("Base Layer." + state.ToString()), state); } }

It is a little hassle but as it is such a minor thing that’s easy to work with.

As you can hopefully see this is very powerful and makes complex decisions through Mecanim a lot easier to implement, just be aware that with great power comes great responsibility! ![Open-mouthed smile](/assets/img/wordpress/2014/08/wlEmoticon-openmouthedsmile.png).

This article truly only scratches the surface of what is possible with Mecanim using it as a pure state machine, in the book we explore a full system such as the above and even delve in to a basic AI system implemented through Mecanim

 

* * *


# We hope you enjoyed the show

I do hope you like this little snippet, just one of (hopefully) many little break out sections from the book.  These snippets do have a lot more detail as I have more space to work with (it is really surprising how restricting 500+ pages gives you ![Confused smile](/assets/img/wordpress/2014/08/wlEmoticon-confusedsmile.png)) but everything you need to know is covered in each section.

I am so glad this title is finally published and out there for people to grab, any queries / questions / thoughts, just drop me a line using the Contact page on my blog and I promise to get back to you.

> The sample project and code for this snippet can be found here: – [Mecanim State Machines.zip](http://bit.ly/MU2D-MecanimStateMachines "Mastering Unity 2D Game Development - Animation Curves snippet")

 

* * *


# Wait, There is more!

Now that Unity has finally pulled back the covers on the new shiny and advanced UI system, I can formally announce that I’m already most of the way through on my second title with Packt which will be an in depth overview and guide to the new UI system.

So if you want a leg up on how to make the best out of the new UI system and learn some cunning tips and tricks from many months of suffering through the beta then this will be a title for you.

 

If you want more details or have any particular requests just let me know, I will do my best to cover as much as I can (Although being me, I’m already over budget in a lot of areas with more detail than you could ever need but that wo not stop me ![Open-mouthed smile](/assets/img/wordpress/2014/08/wlEmoticon-openmouthedsmile.png))

