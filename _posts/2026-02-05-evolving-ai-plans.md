---
layout: post
title: "Evolving AI Plans"
date: 2026-02-05 16:00:00 +0000
description: "To quote Bueller, Life moves pretty fast. If you do not stop and look around once in a while, you could miss it.  Which is what happens if you do not re-evaluate your AI tools often."
category: Announcements
tags:
  - agents
  - llm
  - ai
author: Simon Jackson
img: posts/20260215/aidetected.gif
---

The world of AI is moving faster than most can keep up, by the time you have mastered one pattern, several others have cropped up.  If you do not keep a check on yourself, you could be left behind.  If you thought it was tough in the 80/90's (I am old, I get it) with how fast things were evolving, then buckle up, we are now reaching lightspeed.

> [!NOTE]
>
> Even my older AI blog posts are starting to feel old already, but I am enjoying the challenge!

## New patterns for a new age

The Bueller quote heading this article has never been more true, it seems almost daily I am reviewing the news, latest posts from ALL of the major partners involved with Agents and LLM's for new patterns, ideas and suggestions.  Thankfully, everyone is riffing off each other in a good way, someone suggests or posts something, then someone else builds on that and goes that bit further, whether it is:

- A new LLM logic.
- Improved MCP interfaces and tools.
- Patterns, plans and guidance.
- Token reuse or conservation.

The list goes on, in some ways, it is like the best parts of collaborative science (in some ways, a dark dystopian nightmare), ever creeping forward.

This post was sparked after I followed up on some of these reports and started to see **REAL IMPROVEMENT** in several key factors in my own research, namely:

- Reduced hallucinations (not gone completely, but significantly reduced).
- Improved memory (yes, you can have memory if you do it right)
- Improved outcomes.

It almost sounds too true, but my workflow has improved, especially with some dedicated research projects I continually use to test new patterns.

> [!WARNING]
> This is NOT a silver bullet, to get more out, you MUST put more in, and thus the cost, depending on what you are using will INCREASE.
>
> My recommendation, as is becoming more of the goal in today’s market, is to HOST your own LLM infrastructure (they have it [running on Raspberry Pi's now](https://github.com/sipeed/picoclaw)).  It is possible with a little effort, and you can reduce your downstream costs to all but the critical path.
>
> Sadly, this is out of scope for this article, but I will try to add more later.

So, what are these patterns I tease?

## Evolving patterns

The updated patterns I have started employing recently fall into two categories with a single shared theme:

### Shared theme - The living document

The core of the recent updates is to create **LIVING DOCUMENTS** at the core of any process.  This is a SINGULAR document (and you MUST be explicit, as some agents, looking at you Claude, will randomly go off and create masses of documents you did not ask for) which ALL agent calls must update with their state, or you inform it to update at critical junctures.

I have found this works far better than using the Memory MCP, or constantly updating the instructions guide for the agent, and as a separate document, you can create references to it from all other material, including the instructions.  In testing, this has been far more efficient and rigorously followed than instructions or memory alone.

- You start the session with the instructions pointing to the living document
- The agent reads the current state with suggested next steps
- It validates any failures or bad paths from previous attempts
- It then plans ahead!

Your mileage may vary, but this singular change VASTLY improves my outcomes.  Granted, at the cost of the additional tokens needed to read the document, hence the additional cost.  You "can" summarise the document in Agent format if you wish, but I have found this actually degrades its performance and use.

### Patterns

Now to the other meat on the bone, the revised patterns that consume the living document.  I have long stated that LLM's are more tuned to the small tasks, a quick fix, diagnosis, but where you need to dig deeper, you have to keep a better handle on the outcome, thus these are the methods I have now turned to using:

## It all starts with a defined and reviewed plan

By far my biggest improvement through LLM use is to focus and narrow its path, to think and to constantly challenge its assumptions.  It is **NOT** foolproof, but it greatly improves your chances of a positive outcome.  The whole approach (which is token-heavy) is an almost constant state of review, approval, implementation and review, which when implemented, looks something like this:

- First Agent session - Create the PRD (Product Definition) from a detailed set of requirements, this ensures a list of preferences and outcomes.
- Build an instruction document using the PRD as a reference. Guiding the steps for planning, with KEY steps to avoid creating documents unless requested (stops the multi-document scenario).  This might sound counterintuitive, however, they serve very distinct purposes.  One directs how to think, the other tells the LLM what to think about.

  > [!IMPORTANT]
  > Ensure to leave off with a note about the aforementioned **Living Document**, instruct the agent to check the Living document at the start of a prompt and update it with its intent and finish the query with a statement in the living document as to the outcome.  This trains and helps the Agent learn, as well as something to pick up on if you start a completely fresh session.

- Next, start a completely new session (even with another agent if you wish), define the session as a reviewer / architect actor and have it review and improve the plan.  Take note of what has changed and follow its thinking.  Make corrections where **YOU** disagree. It is essential you are part of this review process, as key decisions that were maybe not clear in the design become apparent (as often happens in life, poor design leads to poor outcomes).

  > [!NOTE]
  > You can repeat the previous step a few times with different defined actors, different personas, just as you would in real life.  The best plans involve a team, and in this case, it is a team of agents AND YOU!

- At the end, ensure to begin the plan with a Living document record as it delivers the implementation.

Once you are happy with the plan, the next step begins, the following two patterns can be taken:

## Plan big but follow your own path

With the plan in hand, instruct the Agent to document and detail the plan for implementation, **ALWAYS** ensure you finish with "If you have questions, ask them before beginning" (If you do not, it will not, and it ABSOLUTELY SHOULD).  The outcome choice is up to you:

- A singular implementation document.
- Several documents, one for each stage or component, ordered for implementation.
- A mix, depending on your style, backend first, then frontend and UX.

Ultimately, this is a plan **YOU** will follow, this is my preferred mode as it gives more opportunity to question as you implement or even change your choices.  All the agent has effectively done is ratify the architectural state based on your inputs, it is arguably the most human way to use the tools to achieve your goals.

If anything is unclear, ask the LLM to clarify, make changes or explain something **"BUT ONLY TO THE PLAN"**, the Agent should NOT touch the code, that is your domain.

> [!NOTE]
> In my experience, when instructing the planning phase, I also interject to ask the Agent to explain each section or block of code, as to its intention, what it is meant to achieve, or what it is supposed to do.  This helps guide the implementation as to whether it is the best thing to do.  And if you disagree, get it to update its plan, or make your own implementation and then get the Agent to update the spec, then review for ancillary impacts.

This approach feels more like the Agent working cooperatively than running the show and seeing what it comes out with.

> [!IMPORTANT]
> At each stage, with each change, ensure to instruct the Agent to update the living document.  It might be recorded in the Instructions, but I feel safer double-checking at critical points.

At all points, question everything, it is simply good for the soul and makes the challenge more fun.  All that is left is to continue to the end, test everything and the result I have found to be vastly improved.

> [!TIP]
> Another fun step, but at the cost of tokens, is to ask the Agent from time to time to review what you have actually implemented against the plan and give a status report (helps to reduce human error), marking the document with AI's favourite thing, Icons and Emoji's.  As well as providing a summary, as well as giving you a visible checkpoint of your progress.

## Automated plan, automated deployment

The automated plan follows a similar track to the manual implementation path, except you ensure to break out the plan into repeatable and testable sections.   It is not as efficient as the manual path, but for shorter and more throwaway experiments, it can be beneficial.

> [!NOTE]
> In some cases, I am actually running the two approaches in Parallel!  Using the fast route to test theories in advance before incorporating them into plans, similar to prototyping.

Rather than the human doing the implementation, the agent is running the show, but CRITICALLY, not all at once.  To avoid hallucinations and dreams of code, each section must be complete, testable and ultimately HUMAN VERIFIABLE.

An example of this was a total conversion of an old game sample in C++ using some REALLY legacy assets. The plan broke down as follows (granted after so many failed attempts in the past):

- Review the project and break up / document the systems and content of the sample.
- Research old asset formats and create detailed documentation of their makeup (critical for migration).
- Build out sample sets of each content type and define a migration strategy.
- For each asset type, build individual pipelines, with human verification at each step.
- Then implement the migration in individual sessions or phases, each phase does NOT complete until the human in the process signs off on it.
- Then plan the implementation, in a stackable way, each implementation building on the last, again with human signoff.

Doing this phased approach with signoff greatly avoids mass delusion and lots of wasted tokens on something that can never ultimately work.

> [!IMPORTANT]
> The human as part of the process is essential, not just for the quality of the output, but also as an efficiency surrounding costs and tokens.  Yes, it is more effort than vibe-coding a website or app, but the results are FAR superior.

## Conclusion

Thus ends this page in our journey, but the destination is still far from sight.

Learning should never end and we should always strive for improvement, and in my humble view, this is in **Cooperation** with an agent and not just handing over the keys on a prompt, no matter how detailed, as it is ultimately flawed.  We learn more along the journey, take those understandings and evolve a better plan.  It is strange, in the many years as a Project Manager, designer, QA and even analyst, this is ultimately how we humans work better, we plan, we question, we revise and ultimately deliver a better outcome.  It might not be perfect, but from that, we continue to build better.

Enough musing, back to the code, which is where I feel most at home, with my new pal sitting on my shoulder.
(Still not sure whether it is a little angel or devil, but let us see where this leads)
