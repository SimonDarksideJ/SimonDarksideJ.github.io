---
layout: post
title: Using AI tooling effectively - a lessons learned exercise
date: 2025-11-21 00:00 +0000
description: Whether you are for or against using AI tooling in your workflow, it is critical to know and understand the options.  The tooling can help you plan and even think better even without writing code for you.  Work smarter, not harder.
img: posts/20251121/title.gif
category: AI
tags:
- ai
- learning
- tools
- planning
author: Simon Jackson
mathjax: false
---

> TL; DR -> Whether or not you are for or against AI, if you do not at least read up on the landscape and the capabilities out there you WILL fall behind.  These tools can be used in many different ways and provide support where you least expect it.
>
> It is not about taking away the fun tasks, if you do not want it to code for you, then stop, want to create your own artwork, fine do that.  But do not discount the capabilities of the tools because of preconceptions.
>
> You do not need to use it, but understanding what you CAN use it for better arms you in the road ahead to know what you are up against.

## Work smarter, not harder

The evolution of AI tools is ever increasing, as is any technology or area that is adopting these tools.  It was already an almost impossible task to "keep up" with advances, causing developers and engineers to keep narrowing their specialties, reducing the mental load to be able to take in the latest and greatest.

Since the unveiling of the current generation of AI tooling, the curve keeps getting sharper and sharper with facilities such as:

* Guides on instructions to provide consistent context between queries.
* MCP servers and their capabilities have increased.
* More and more LLM model services for injecting capabilities into a workflow or service.
* Prompt generation research.
* New agent modes from Chat -> Agent -> Planning -> ...

The list goes on and keeps getting bigger, refinements, new tools, new features.  Like any technological "revolution" its speed is increasing.

> [!NOTE]
> However one thing remains clear and should not be underestimated, is that AI **STILL** does not know it is right.  So always be on your guard and check the facts!  But that does not mean you should not use the tools, just learn the correct ways to work with the tools.

Based on my understanding (at the time of writing), this article aims to impart how my workflow has evolved to a level where I can institute "some" level of trust in my processes with the results from AI.

> [!NOTE]
> Fun fact, even today when I started writing this post, I listened to a [podcast with Jesse Liberty](https://jesseliberty.com/2025/10/10/james-montemagno-on-vibe-coding/) that featured "James Montemagno on Vibe Coding" ( a term I do not like tbh).  In this episode James mentions a few "tricks" I had not considered before, such as using AI to generate the tool or a prompt based on your current activity to enable you to do that activity faster next time.  Effectively engineering your workflow as you DO IT.

## It starts with a prompt - The Misconception

I have said it previously, but it is worth repeating.  Long gone are the days when you put in a simple question to get an answer or complete a task to fulfil.  Sure, on your phone or via your browser, the results are FAR BETTER than dropping it into Bing/Google, but for any serious workflow. Without content/structure and even architecture, the most basic of queries will not result in anything that resembles what you desire.  (except for that one day in march where the hares are flocking).

> [!IMPORTANT]
> **AI is suggestive, it is not indicative.  It NEVER knows if it is right, only that the probabilities align with a result compared to your query.**

So let us breakdown the critical paths as I understand them at the moment.

### Generate Instructions/Agent document

Instructions or Agent guides are critical to modern AI interactions, they define the background to your request/conversation, define the scope of the work and critically also inform the AI of any boundaries it should not cross.  Traditionally, it is also used to define the architecture to follow and conventions to use, but it can also be used as a thought board.

Do not think of your instructions as a static document, it is a living/breathing entity that should grow and learn as your project evolves.  Include tips/tricks, any repeated lessons or "daft things" the AI performs that you would rather it did not.

> [!IMPORTANT]
> The instruction guide is sent as a pre-context to EVERY chat/conversation, this is information it should know whenever it is sent off to think about anything!
>
> But do not worry about its length or performance, the local agents "tune" the instructions and summarize it for easy digestion.  You would be surprised about how much "pre-processing" happens in your client before it even contacts the cloud AI agent.

Simple steps to follow as your project evolves, whether it is a coding session, a Q&A query or just taking notes for a subject:

* If you have an existing project, use the built in VSCode (or other tool) "Generate Instructions" to set an initial framework.
* If you are beginning thoughts for a project, start a conversation with the aim of generating this instruction guide.
* Keep refining the instructions, with or without AI help to frame future conversations.

Above ALL, keep reviewing the instructions manually after generation, do **NOT** just trust the result, it is meant as a starting point not a finish line.  Keep reviewing, updating and even deleting content until you are satisfied with the result.  And as your project grows, so should your instruction guide.

### Use MCPs relevant to your process

MCP servers are fast becoming the "go to" tool to assist in local AI support and cut down on the amount of traffic used by cloud agents, they help form, and in some cases, generate results to assist the AI in its journey, these can range from:

> [!TIP]
> Model Context Protocol servers, or MCP for short actually details the method used to communicate from an AI LLM with a local AI or context agent, a tool used to support AI on its journey.  Their capabilities can range from just an API for serving data or results, to full blown AI agents themselves.  The MCP protocol effectively allows AI's to talk to each other and work together to reach a goal.

* Simple functions used in calculations or a fact table.
* Headers for local AI agents or models, such as image generation.
* Self-contained LLM's, primarily used for documentation or API references.  Useful for keeping the AI bound to accurate source information rather than just the web.
* Proxies to other cloud hosted AI agents, woven together to form a mesh.

> [!NOTE]
> Do not be afraid to AI your own MCP server locally, if you find certain areas where you are constantly correcting the AI agent, or need it to use pre-defined terms in its response, then just generate your own server to manage this for you and update your instructions to defer to the MCP server in responses.  This can lessen the load in your instructions if you can have an agent maintain it for you.

Each MCP effectively adds another tool the AI can use in the construction of a response as well as off-loading tasks locally to save time or money (credits), or in some cases MANY tools.  And there is a growing movement where you can use AI to generate your own local MCP servers, especially for repeated tasks or guardrails.

> [!IMPORTANT]
> **Too many tools can degrade performance**
> While having lots of MCP servers at the ready is fantastic, be aware you need to limit which Servers/Tools are active at any one time.  Giving the AI too many options can severely degrade performance as it need to check the toolset with each interaction (even within a response) to see if there is a tool to help.
>
> Make sure for each interaction/conversation, that you are using the tools that will assist with that thread.  Not asking it about code or pull requests, then disable the GitHub MCP tools.  Also critical for any language or toolset focused conversations.  Just use the tools that will help with your query.

### Create custom prompts for repeated tasks

A recent trick I picked up surprised me how effective it was.  If you find yourself either asking the same question, or making the same corrections, or even just doing the same thing repeatedly, then stop and just make a new customized prompt for yourself.

You see these already when in VSCode you hold `ctrl + shift + P` (or `cmd + shift + P` on Mac) to bring up the command window, from here you see regular actions available to you based on the extensions you have installed and the MCP servers you have registered.  Once activated, they complete a set of tasks using what is available to perform an operation, be it cloning a repository, or formatting your document (my most used command).

But you can also create your own, and again, use AI to help you generate it.  In the middle of a conversation when you have completed a task, ask the AI to summarize the task that was completed and ask it to generate a new Command in the tool.  You will get the source for the command, allowing you to tweak it to your needs (and likely remove some unnecessary steps) and then save it with a command name, thus, every time you need to perform the same task, save yourself some keystrokes and just launch your command instead.

### Leverage resources online

A common misconception when working with AI Agents, is to assume it is trawling the web for the current/latest information, sadly this is not true (in the most part), LLM's rely on historical information they have been trained on.  If there is newer information, it is best to direct the AI to also read specific documents, websites or other sources of information in addition to its trained model.

> [!IMPORTANT]
> Although this does not "train" the AI in new information, the data that is gathered is only summarized and used as part of the current conversation.  If you asked it again in a new conversation without providing the source, it will not know.

You can add such sources to your instruction guide, although it will only be summarized from the last time you generated the guide, alternatively you can either use an MCP server such as "Context7" (A useful docs MCP) or generate your own MCP server that refreshes its memory from online sources that you critically rely upon, like your companies document server.

### Cost Management - The hidden tax

While many of the tools we use today offer generous free tiers or fixed monthly subscriptions, the move towards "pay-as-you-go" models for advanced agents and API access brings a new consideration: Cost.

Every interaction with an AI is not just the question you ask; it includes the entire conversation history, your instruction guides, and any files you have attached.  This "Context Window" is re-sent with every single query.  If you have a long-running chat with megabytes of code attached, you are paying for that data transfer every time you press enter.

> [!IMPORTANT]
> **Token Hygiene**
> To keep costs (and latency) down, practice good token hygiene:
>
> * **Start fresh:** Do not keep one giant chat going forever. Start a new conversation for each distinct task.
> * **Limit context:** Only attach the files relevant to the specific question.
> * **Watch the loops:** Autonomous agents that "think", "plan", and "verify" can trigger dozens of internal calls for a single user request.

Being mindful of your token usage does not just save money; it often results in faster and more accurate responses because the AI is not distracted by irrelevant noise from 50 messages ago.

## Change your workflow

AI tooling should not be just about work, used correctly, you can use the tools to influence or guide almost any task, such as:

* Guided research.
* Ideation and thought generation.
* Validating preconceptions.
* Applying structure.
* Architecture compliance.
* General validation.

And these are just from my building workflow over recent months/years.  Using AI to not just do work, but to plan, evolve, generate more tools to further accelerate your workflow, defining the ultimate development method of DRY - Do not Repeat Yourself.

> [!TIP]
> Did you know there are several "MODES" of AI usage now?  Not just Agentic (Agent) or "ask" (query), but also "Plan", which is great for digging deep and coming up with a stepped plan of actions which you can either get the AI to start working from or do yourself, as well as several others and even custom modes you can create yourself, tailor the experience to meet your needs.

### Guided research

When researching any topic, wading through mounds of documents, websites, information and searching for the latest (or even historical) information can be very time consuming.

Granted, this should be treated as source material and taken with a grain of salt as critical facts will need to be verified.  Even with recent advances in correction and validation, it is still just an approximation.  In many cases, it is worth asking different agents to read over the results and verify sources for cases.

You might think, why bother, if the information is potentially unreliable what is the point.  But the answer is simple, the AI can search through data to find you a shortlist far quicker than any human can, reducing the scope of your research with summaries.

But do not stop there, keep iterating the results upon itself, demand references and lookups to the latest sources to verify the results, which in the end results in data you can rely on for your studies.

> [!IMPORTANT]
> Even so, in research and summarizing the research, use your own words.  Use the data as refined source material which is just a smaller window of the wider world contained within results.  The ultimate aim is to save you TIME, if nothing else, it can also type faster than you can.

### Ideation and thought generation

A concept I have also been using AI tooling for of late is idea generation.  You get a half sleep deprived thought or waking moment of "something", it sounds fine in principle but will it work.

This is where, depending on the type of project it is, I will lean on AI tooling to help ratify my thoughts:

* Has this been done before, if so what worked and what did not.
* Is there any market opportunity for such an idea.
* Summarizing options for "go-to market" strategies.

If the idea is a solution, even using GitHub Copilot to form a new project automatically, generating source, identifying workloads and deployment options.  Which it will take on, generate a new repository, and start building out the framework of a potential solution (fantastic for web solutions).  Give it enough detail, apply references for similar things you have in mind, and set it off.  All of which will happen without you being involved (or even at your desk) thanks to workflow agents.

It does not need to end up with something real, except to prove to yourself whether something is valid or even possible.  It gives you a framework to build upon and cuts down the time involved in your personal research.

### Validating preconceptions

Often during my development and management life, we build our own internal bias, it is not always intentional and can lead you to incorrect assumptions.  My geography knowledge for instance, is waaay out of date.

Most consumers of AI will turn to the agent on their phones for a quick query, usually with FAR better results than a one line google search (with so many Ad results these days), the results are better, but usually very inefficient.

I have been "trying" to teach my family a better etiquette for searching with AI assistance, forming not just a question but also how to form the response, for example:

Instead of just:

```text
What are the best locations to go on holiday in June?
```

Better to give the AI heads up as to what you are really looking for:

```text
I am looking to go on holiday in June, what are the best locations to visit?  I prefer hot locations (but not too hot) with spa facilities and a good nightlife.  Make sure to also review other visitors reviews of locations and only include places that reviewed well.  Form the results into a table listing the destination, the hotel or cabin, average review rating and links to booking information.  Also check the sustainability rating for the areas to ensure it is not over populated with tourists and has affordable travel insurance (around £30 pp)
```

This structure of query is simply more informative while staying natural and tries to tick as many boxes as possible for what you are REALLY looking for:

* What is the purpose of the search.
* What are the constraints.
* How you want the results formatted.
* And additional concerns or limitations.

This is just an example, but as time and tide has shown us, the more effort you put into defining your question (and results) the better the output will be and reduce the need for further onward searches to clarify results.

### Applying structure

One of the hardest parts in any software (or other designs) is architecture, how well formed the solution needs to be.  What constraints are needed, which conventions should be used and where the checkpoints need to be in order to avoid pitfalls.

Of the many designs I have done in the past, it is always the longest struggle to keep constantly refining the structure around any project, whether it is in design or implementation.  What other considerations need to be considered or applied.  Even with many years of training and experience, you always wonder "what if" or try to evaluate uncommon scenarios that could affect operation.

Using AI tooling to review the architecture, critically looking for "things you did not consider" is crucial.  Even if you choose not to act on the information as it is not relevant, having another set of eyes with a much larger dataset can really help.  I have solved many an issue in a junior's design, as have my seniors done for me, so why not also use the tools available for a third set of eyes.

Defining a well architected solution leads into the next section for using AI to ENFORCE that architecture and prevent future works overriding the design (or at least get them to question the approach).

### Architecture compliance

With any well defined architecture, adhering to that architecture can be challenging.  But you can use the AI to help provide a ground truth based on the defined architecture, as well as verifying how compliant any development work undertaken is.

Additionally, the architecture itself can be used as a guide for any future work, using the implementation, design or instructions to inform work that is being undertaken.  

As an example, I was building a new component within a service driven architecture and the AI tooling correctly identified all the key touchpoints within the architecture to add the new component, as well as adding Unit tests around the feature.  It derived everything it needed from:

* The existing implementations
* The documentation associated with the project
* Designed instructions surrounding the architecture and bounds
* And existing Unit tests for other services (in fact it suggested some additional tests which we then implemented across the board)

This also meant that new work complied with the existing architecture and made the final review and update a lot quicker and simpler, I would estimate it reduced the time needed to build the new component by about 80%, meaning I could get more done faster.  BUT, I still had to do a fair amount of work to review the implementation, but no more than I would normally.

### General validation

Checks and balances are key for any professional work, in fact I now regularly use either Copilot as a code review agent or use the Copilot review processes for all documentation, not only to check for the usual grammar / consistency, but also to check my own facts, I prefer to always write myself and use the AI as a reviewer and NEVER the other way round (well, except that one time).

There are many tools in the AI world that are available and you will probably find you have already been using a lot of them, such as a spell checker in your documents (a nascent form of AI that is strictly contained), but writing with AI and also double checking your own preconceptions is now far easier.  As an author I used about seven different tools in my own personal proofing exercise and with the addition of AI into that workflow, I have been able to reduce it down to three (because it pays not to have all your eggs in one basket) which saves me considerable time in review.

## Summary

Hopefully this article opens some additional thoughts patterns, as mine do almost daily as I use, reuse and learn from my own use.  I have gone far beyond the level of "generate this method" or "this error occurs, why?".

Keeping up to date is a struggle, but it does not have to be, include all the tools available to you to make your life easier, or at least smoother.  The tools can simply type faster than you, so use that to your advantage.

> [!IMPORTANT]
> But even given all the resource, **DO NOT** trust the result, check it, validate it, challenge the generated pre-conceptions.  Even with the extra steps to read through what has been created, the workflow is still significantly faster.  So use it when it makes sense, and for those things you take joy in, and keep having fun.
