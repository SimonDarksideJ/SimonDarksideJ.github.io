---
layout: post
title: Can you make a game with AI
date: 2025-08-23 00:00 +0000
description: In my yearly/biannual experiments with AI, I try and make games for popular engines using just AI. Oh what fun.
img: posts/20250823/title.gif
category: XR
tags:
- ai
- monogame
- tools
author: Simon Jackson
mathjax: false
github: SimonDarksideJ/MechRampage-AIGeneration/
---

> TL; DR -> In short, NO, lol.  AI is a tool that can assist you in solving common problems and mixing many different AI tools and features you can help to accelerate your development and the creation of content (at least place holders for your artists to draw from).  But, it is also a great source of pain, frustration and injection of complex issues, which you end up using AI to solve only making the complexity worse and harder to understand if you are not familiar with it.
>
> Essentially, the AI **CANNOT** do it alone and still needs a human at the helm to guide it, correct it and use other tools to generate assets.
>
> It is however fantastic for DOCUMENTING your project and identifying potential issues!

## The AI war continues

As ever progress marches on whether we want it to or not and with the ever increasing power that AI brings, everyone gets split into one of three groups:

* Hey, I can replace people with a prompt and just build project X using fewer resources (completely false, as the total cost of AI far exceeds the cost of humans)
* AI is evil and only scrapes resources from other hard-working developers and should be avoided at all costs.
* AI is a tool; if used properly, it can accelerate your work. However, it can also introduce complexity and challenges if not managed carefully!

Want to see what AI can do for your game development, check the latest result of my adventures :D

|![MechRampage Final render](/assets/img/posts/20250823/MechRampage-Final.png)|
| :---: |
|**Figure 1: MechRampage Final render**|

In this article I will detail the latest generation in my experiments with using AI in game development, the terrors, the hail Marys, and the pitfalls. As well as some useful guidance for those new to the field.

## The project definition

For this run, I went with a more complicated outline than I have done in the past, mainly due to the experiences I have built up this year, but also to challenge myself and the AI a little more.

> [!NOTE]
> Past experiments involved simple block pusher games, 2D shooters, or even snake, just to give the AI a chance.
>
> *Note, no, it failed to even get close most times.

This was the outline brief I went with:

---

### Mech Rampage

Mech Rampage is a 3D isometric game where the player will navigate a futuristic city, battling enemies and completing missions.  The player is a commander managing a team of customizable mechs, each with unique abilities and play styles.

The terrain will be procedurally generated from a set of assets, fielding such arenas as grassy outlands, urban environments, and industrial complexes.  Note, all content to be generated initially by the agent and placed in the content folder for loading.

The play area is an isometric projection, allowing for a unique perspective on the 3D environment.  The player will be able to navigate the space freely, utilizing the verticality and depth of the environment to their advantage.  Control will be through a point and click interface or touch controls:

* When a mech is clicked, it becomes the active unit and the status displays show the stats for that unit
* When a mech is selected, the player can issue commands to move, attack, or use abilities
* When an enemy is clicked, the player can target it for attack or issue special abilities
* When a resource is clicked, the player can collect it or use it to upgrade their mechs

---

## Generating a game from AI

The world of AI is rapidly changing and it is hard to keep up at times, it has always been this way with technology, however, with AI the sheer acceleration and complementary (sometimes derisive) changes make it harder to fathom your way through this maze.

> [!NOTE]
> Full disclosure, while I have a lot of experience in the area of AI tools, I would never class myself as an "expert", I simply know more than some, yet less than others.  It is an ongoing learning experience to find the best ingredients to make a good cake.  Just keep in mind the rate at which new ingredients are being made is evolving almost as fast as the range of cakes to bake (and not all are good).

The main thing that has changed in recent AI evolution is the level of planning and resources you can throw at a problem to help direct and make the eventual result better, or at least more in line with testable requirements.

### Instructions

Everyone seems to believe that getting the best result out of AI is to create the perfect "Prompt".....

|![this is a lie](/assets/img/posts/20250823/StarTrekLies.gif)|
| :---: |
|**This is simply wrong, at least in this day and age.**|

Whereas in the past, a simple quick question or request would be enough to accomplish a simple task, it would almost never be what you needed. Even code intellisense, while useful, would more often than not just "get in the way" while you are in the zone.

The resolution to the "quick" answer is effectively to go long, not in the question, but in the context or framework that you provide "up front" to the AI machine in order to essentially give it a frame of reference. This is defined as a precursor document or instruction guide; each tool you use has its own version of this:

* VSCode uses a `copilot-instructions.md` guide.
* Anthropic uses a `claude.md` document.

And others have their own variations, but they all surmise to the same thing: a document that describes such things as:

* The aim of the project (the document is meant to be system wide).
* The architectural principles of the project.
* How the AI should go about any task (more on that in the [Planning](#planning) section).
* Any key resources that should always be used.
* What are the strict rules that must be followed (my favorite with Unity projects is to remind the AI that Unity DOES NOT use DotNet CLI commands).
* Instructions on what the output should be, any documents that need to be maintained.

And in the strictness sense of the term, MORE is better, the more you put in, the better your result will be.

> [!TIP]
> VSCode and its CoPilot implementation even includes a helper tool in its GitHub Chat integration to get you started with `Generate Instructions` available in the "cog" options in CoPilot Chat as shown below:
>
> |![Figure 2: CoPilot Chat - Generate Instructions](/assets/img/posts/20250823/generate-instructions.png)|
> | :---: |
> |**Figure 2: CoPilot Chat - Generate Instructions**|
>

Some awesome resource for working with these instructions guides can be found at:

* The [`awesome-copilot`](https://github.com/github/awesome-copilot) repository, chock full of instructions, modes and more.
* The [`awesome-copilot-instructions`](https://github.com/Code-and-Sorts/awesome-copilot-instructions) repository.
* Essential viewing is the [5 New VS Code AI Features & Settings You Need To Try Today](https://www.youtube.com/watch?v=EpmxbAxOe4A) session by James Montemagno.

But let us continue.

> [!NOTE]
> For reference, here are the [`copilot-instructions`](/assets/img/posts/20250823/copilot-instructions.md) that I used for the "Mech Rampage" test.

### Planning

A key difference to the way most prompting works, especially if you use AI on your mobile devices or via chats on the web, is using the AI to "Plan" ahead before it even touches code. This will guide it to define a set of tasks and a breakdown of what it is actually going to do. This can take many forms, but as a starter, here is one of my most common patterns:

> #### Planning Approach
>
> * Requirements Analysis: Ensure you fully understand what the user wants to accomplish
> * Context Building: Explore relevant files and understand the broader system architecture
> * Constraint Identification: Identify technical limitations, dependencies, and potential challenges
> * Strategy Development: Create comprehensive implementation plans with clear steps
> * Risk Assessment: Consider edge cases, potential issues, and alternative approaches

These steps effectively FORCE the AI to actually think about what it is going to do ahead of time, giving you time to evaluate and guide its instruction and testing to ensure what you WANT it to build.

> [!TIP]
> ALWAYS read the planning guide the AI is generating completely, you never know when it might try and sneak something past you that is either not needed or you do not want!

### MCP Servers

In the fight with AI, newer tools and features have come to our aid in the form of Model Context Protocol services (or MCP for short), which are essentially tools and components to help aid the AI in its journey. You might wonder why these all-powerful gods would need a little extra help, and the answer is simple:

> [!IMPORTANT]
> ALL AI tools have no memory - Every question you pose is new to the AI each time you ask it.

|![Sorry, what was your question again?](/assets/img/posts/20250823/ihavenomemory.gif)|
| :---: |
|**Sorry, what was your question again?**|

In case you are unaware, all AI systems are "stateless", meaning each call is new and fresh, the only reason it appears to be continuing a conversation is that the ENTIRE conversation history is sent to the AI "EACH AND EVERY TIME YOU ASK A QUESTION".  You may also see a pause in the request at times stating "Summarizing conversation.." where the AI is actually sending the current state of the conversation and getting it to shorten it down to the key points like it does when you ask AI to summarize an email or document.  Although NOTE, in this summarization, key things can be lost, statements made, considerations you asked it to make, or even what day of the week it is, the process is not perfect, like any game of "Whispers", the message degrades the further you get away from the question.

> [!NOTE]
> A perfect example is that until I used MCP servers, I would regularly have to keep injecting into the conversation "UNITY DOES NOT USE DOTNET", to remind it I had to click on Unity to compile the code from time to time.  Thankfully, not a problem with MonoGame :D

To assist the AI, we can implement or provide services ahead of time in the form of MCP servers.

> [!NOTE]
> Depending on your usage of AI, the implementation of MCP servers may vary from [hosting containers](https://aws.amazon.com/what-is/containerization/) to python/cli runtimes active on your Host.  As I am using VSCode, there are built-in options in the editor to get these running for you through the [Extension](https://code.visualstudio.com/mcp) tab.

In my daily routine, the most common MCP servers I use are:

|Server|Description|Use|
|-|-|-|
|Sequential Thinking|An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process.|Provides ordered ways for the AI to handle problems and assess potential solutions, used critically in the planning phases.|
|Context7|Context7 MCP pulls up-to-date, version-specific documentation and code examples straight from the source — and places them directly into your prompt.|Great for forcing the AI to use product/platform specific documentation and reduces web calls to unknown third parties|
|Memory|A basic implementation of persistent memory using a local knowledge graph. This lets Claude remember information about the user across chats.|INVALUABLE, used manually for the most part to stop you repeating yourself, just instruct the AI to "REMEMBER THIS" and it will add it to the Memory server to remind it both later and in-between sessions.|

There are many more kinds of server available as demonstrated on the [VSCode MCP agents site](https://code.visualstudio.com/mcp) as well as elsewhere on the web, or you can even [Build your own MCP server](https://devblogs.microsoft.com/dotnet/mcp-server-dotnet-nuget-quickstart/).

> [!IMPORTANT]
> If you host an MCP server, MAKE SURE to also tell the AI in the [Instructions](#instructions) that it is available.
>
> Also note, that MCP servers have to be started manually and ahead of time before you start your AI session!,  AI is not allowed to start MCP servers for you (even if you tell it to)

### Documentation

If you use AI for nothing else, it is invaluable as a documentation tool. Again, I will stress it is never 100% right (although it is getting closer) so you should always review what it generates, but it will save you HOURS of writing the docs yourself, or, like in my case, actually give you some documentation to start with because you never have time to "circle back" and write something up detailed yourself.

Frequently in my workflow I will take a breather, especially if a feature is close to or is complete, to ask the AI to generate documentation for that feature; it simply becomes second nature. Although, take care, you still have to ensure (usually in your [Instructions](#instructions)) to tell it:

* WHERE to place the documentation (else you will find it randomly through your code).
* HOW you want the document structured.
* and (More Importantly) the number of documents you want, ONE BIG all-encompassing guide, or separate documents for each feature. (Otherwise, you will keep returning to the docs to regenerate them.)

## Back to the show - Mech Rampage lives

The generation of this latest [MonoGame](https://monogame.net/) marvel took some interesting twists and turns, and while not visually appealing, it was, by the end, functional, as shown here:

|![MechRampage Final render](/assets/img/posts/20250823/MechRampage-Final.png)|
| :---: |
|**Figure 3: MechRampage Final render**|

This was the account of the journey in this round:

* Created the project folder and the new MonoGame game located in the root of the repository.
* Started with the [Instruction Guide](/assets/img/posts/20250823/copilot-instructions.md#Overview) detailing what the project was about.
* Structured the guide to set out the planning, overall architecture, MCP servers to use and more.  Even included steps that an editor (of sorts) should be available in game.
* Started the Sequential Thinking, Context7 and Memory servers to improve the flow.
* Kicked off the "analysis phase" by asking the AI to "Read the Instructions" and then "design the game".
* Once the analysis was good, with a few tweaks, asked the AI to "Generate the game"
* From here on, until I was satisfied it had completed all the tasks, the only thing I had to do (which was different than all other attempts) was ask the AI to "Continue...", repeatedly.
* At the end, I attempted to run the project.....  crash...  Nothing is ever perfect the first time, not even with AI.
* Then a repeated flow of:
  * Test
  * Copy Error message
  * Paste to AI
  * Get it to apply the result
  * Build
  * Run
  * Repeat

Then at the end when the project was running and no new errors were found, we were done.  SHIP IT

|![Ship it, what could possibly go wrong](/assets/img/posts/20250823/shipit.gif)|
| :---: |
|**Ship it, what could possibly go wrong?**|

## Lessons learned

In short, we are still not there yet.  Things have vastly improved and models do not just spit out an answer, instead they review their answer against the requirements or it compiles before stopping and asking for praise.  So much praise both given and requested :S.

> [!NOTE]
> About the only thing I really dislike at this moment is the AI's need to placate us, tell us what fantastic ideas we have or for pointing out something is dumb and how awesomely right we are.
>
> I explicitly turn that OFF in the Instructions, it is a sheer waste of tokens and resources generating all that (and it can go on QUITE a bit)

We still have to keep our guard up and check the homework of the AI as it is still 70% of the time (imho) still incorrect, or goes off on a tangent for its own benefit.

In short, I would break the experience down to the following:

* Do not engage in long-running tasks, unless it is for a specific component.
* Spend time with the AI, just doing "Continue" as I did in this experiment is generally a bad idea.
* Look to smaller and distinct tasks to get what you need, either through direct prompting (comments in code) or through chat.
* Mix and match to find what works for your style.
* Do not be afraid to let the AI generate a method/refactor, but then rework the implementation yourself and delete the AI's code. It will not be offended (yet).

> [!CAUTION]
> If you do rewrite or replace the AI's generated code between prompts/questions, **ALWAYS** ask it to read back the code or class again.
>
> Remember, the AI is stateless and uses only its own history for the next prompt, if you do not get it to check the latest state it will **ASSUME** it is still how the AI generated it!

## Summary

AI has come a long way, vendors are now providing "thinking" models out of the box, although they still need support from MCP servers aligned to the goals and tools used in the project.

But ultimately, it still needs a human at the helm to guide it, tell it when it is going off the rails and to provide assets needed for any game project.  If you are going fully AI, they you can still use AI generated content using other tools, or like most other devs prototyping, using free resources as placeholders until you can get what you want crafted.

It may still be possible to structure many more components together to achieve the complete goal (like Unity is experimenting with using its own AI platform, but still says "You should not make money with this, just pay them to play), but that was far beyond my normal exercise for using "out of the box" AI components.

Have fun, and live long and prosper. I may return with another AI lesson later!

> [!NOTE]
> Fun fact, I tried to get the AI to do a quick spelling/grammar check on this guide, WOAH, was I so wrong to do that :D
