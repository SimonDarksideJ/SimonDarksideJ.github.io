---
title: "The 3.7 Billion Token Diet"
date: 2026-10-12 08:00:00 +0000
description: "I measured a month of my own AI usage. 3.7 billion tokens later, here is what I learned about context, picking the right model and managing subagents."
img: posts/20261012/token-diet-title.png
category: AI
tags:
  - ai
  - agents
  - llm
  - tools
author: Simon Jackson
---

> TL;DR -> I went through one month of my own AI usage logs and found 3.73 billion tokens. 98% of them were the model re-reading conversations it had already read. The fix is not to use AI less, but to pick the right model for each job and hand the grunt work to a small named crew of subagents. Then keep everything that matters in files and start fresh sessions far more often.

## And now for something completely different

To borrow the old line from Monty Python's Flying Circus (BBC, 1969), this post is a little different from my usual ones. I recently gave a talk called ["The 3.7 Billion Token Diet"](https://www.meetup.com/dotnetnorth/events/316112417) at DotNet North - Manchester (Liverpool is this month). It was billed as a recovery programme for LLM power users, based on a true story. The true story is mine.

In my [lessons learned post](/using-ai-tooling-a-lessons-learned-exercise.html) last year, I wrote a short section on token hygiene. Start fresh, limit context, watch the loops. All good advice, and it turns out I was not following it anywhere near as well as I thought. So I went digging through a month of my own local logs to find out where all my tokens actually went.

This post is the written summary of that talk. Every number in it is real (no numbers were harmed in rounding).

> [!NOTE]
> The data comes from my own Claude Code sessions, so the commands and agent settings here are Claude Code ones. The principles apply to any agentic AI tool that bills by the token.

## The patient's chart

Here is the headline data from one real month, taken from my local logs:

| Measure | Result | What it means |
| --- | --- | --- |
| Total tokens | 3.73 billion | Used in 30 days. |
| Re-reads | 98% | Cached context, replayed before every reply. |
| One session | 47% | A single chat, in one 11.4 hour sitting. |
| The cheap model | 0.005% | Haiku appeared twice. All month. |

Across 67 sessions, just 10 of them ate 89% of the tokens. That is the bit that stung, tbh. My bill was not spread evenly across lots of small tasks. It was a handful of decisions, repeated with confidence.

## The only formula you need

There was exactly one formula in the talk, and it is worth remembering:

```text
COST = CONTEXT x TURNS x MODEL RATE
```

* **Context** is how much the model must re-read before every single reply. I was building 500k token corridors and making it walk them on every turn.
* **Turns** is how many times it walks that corridor. Hundreds of tool calls in one session means hundreds of laps.
* **Model rate** is the price per token of whoever is doing the walking. I booked the most expensive walker 98.7% of the time.

You control all three. I was maxing out all three. Congratulations to me, I suppose.

## Where did all my tokens go anyway?

The data pointed at four areas of waste. None of them were exotic. They were all bad habits.

### 1. The 504 to 1 problem

For every one token of actual output, the model re-read 504 tokens of context.

98% of the month's tokens were cache reads, which is the model re-reading the conversation before it answers. Cache reads are cheap per token, but cheap per token is ruinous by the billion. I effectively bought the same context about 60 times over. The actual work, the output, was under 0.4% of all tokens. I paid for a library and received a memo.

> [!TIP]
> The attack here is simple. Smaller contexts and fewer laps.

### 2. Everyone flies first class

| Model | Share of the month's tokens |
| --- | --- |
| Opus 5 | 69.2% |
| Fable 5 | 29.5% |
| Sonnet | 0.9% |
| Haiku | 0.0% |

98.7% of my tokens ran on the two most expensive models, and that included all the drudge work.

Part of the reason is a default that is easy to miss. Subagents use the lead session's model unless you tell them otherwise (see the [Claude Code subagent docs](https://code.claude.com/docs/en/sub-agents)). Spawn 90 helpers from an Opus session and you have hired 90 admirals.

> [!NOTE]
> Grep-level questions do not need a flagship intellect. They need an answer.

### 3. The conversation that would not die

* **362 hours:** one chat, resumed over fifteen days. A lodger, not a session.
* **11.4 hours:** one sitting, which on its own was 47% of the entire month's tokens.
* **511k tokens:** the average context per turn, re-read before every reply.

Like the Norwegian Blue in the Dead Parrot sketch (Monty Python's Flying Circus, 1969), it is not resting. A conversation resumed over two weeks re-pays its entire history on every turn. It also re-caches all of it after every idle gap, because cached context only lives for a short time. That is somewhere between five minutes and an hour, depending on how you pay ([Manage costs effectively](https://code.claude.com/docs/en/costs)). Long sessions are compound interest, and you are the one paying it.

### 4. Delegation, upside down

The last one is the most counter-intuitive.

* In my **coding** sessions, 84% of the work was delegated to 90 flagship-priced agents, from a lead session sitting at 511k tokens. Some lone agents ran over 100 million tokens each. No brief, no line cap and no adult supervision.
* In my **research** sessions, 0% was delegated. The lead read every page and every spec itself. The result was main threads of 265k to 420k tokens doing work an intern could file.

> [!IMPORTANT]
> I delegated most where it was most expensive, and least where it was cheapest. Exactly backwards.
>
> Research is the perfect delegation target. The questions are independent, the context is disposable and the answers are summary-sized.

## Changing course

So much for the diagnosis. The second half of the talk was about turning the ship, one leg at a time. Three themes do most of the heavy lifting:

* Using the right model for the job.
* Hiring a named crew of agents, not a mob.
* Managing those agents so their reports do not flood your main conversation.

## The right brain for the job

Not every task needs the most expensive brain in the building. In the talk I used a ship's crew to describe the three model classes:

| Class | Role | Cost | Use it for |
| --- | --- | --- | --- |
| Opus / Fable | The Admiral | £££££ | Hard reasoning, architecture, planning and final synthesis. Lead sessions on genuinely hard problems ONLY. |
| Sonnet | The Officer | ££ | Implementation, validation and research synthesis. Around 90% of delegated work. Your default subagent model. |
| Haiku | The Scutter | p | Lookups, exploration, classification and grep-adjacent fact-finding, at volume. Fast, cheerful and nearly free. |

> If the name does not ring a bell, scutters are the little maintenance droids in Red Dwarf (BBC, 1988).

The layer map is short:

* **Lead session:** the Admiral, or an Officer for routine work.
* **Subagents:** an Officer by default.
* **Scouts and lookups:** the Scutter.

Each tier costs a multiple of the one below. The exact rates change, but the ranking does not. Put simply, the Admiral does not do the hoovering.

> [!TIP]
> The Claude Code cost docs linked earlier give much the same advice. Sonnet handles most coding tasks, Opus is for complex architecture and multi-step reasoning, and simple subagent tasks can run on Haiku.

## Hire a named crew, not a mob

Picking a cheaper model is only half the job. The other half is giving each helper a clear role, only the tools it needs and a hard limit on how long it can run. Instead of letting the lead spawn general-purpose agents for everything, I now use four named agents.

Additionally, you need to consider the handover:

* Pre-load the agents with their task, so they have the information to hand and can just get on with the job. If you do not, they are going to re-read their context from your source and effectively repeat themselves, for as many agents as you run.
* Structure the handover, because how you guide the agent to respond is critical. By default, they will simply hand over the ENTIRE context of their research, which your host agent then has to RE-READ. That is effectively making the cake again, following the steps and getting the ingredients. Instead, ask the subagent to write a report and hand it back to the host agent. It is a structured summary with ONLY the information the host agent asked for, and no wastage.

### The scout

* **Model:** the Scutter (Haiku), read-only.
* **Job:** find where things live, such as files, symbols and references.
* **Limits:** it cannot edit and cannot run commands. 20 turn cap, and reports of 25 lines or fewer.

Most questions in a codebase are "where is X?" questions. They need speed and volume, not deep thought.

### The researcher

* **Model:** an Officer (Sonnet), with web and file access.
* **Job:** specs, docs and platforms.
* **Limits:** writes full notes to `.scratch/research/` and returns 15 lines or fewer, with sources. 30 turn cap.

This is the fix for the research sessions above. The researcher reads the pages so the lead does not have to.

### The validator

* **Model:** an Officer, for builds and tests.
* **Job:** runs the gates, logs to a file and returns PASS or FAIL with minimal failure detail.
* **Limits:** it reports only and NEVER "fixes". 25 turn cap.

Keeping the validator out of the fixing business means a failure comes back to you as a fact, not as a surprise rewrite.

### The implementer

* **Model:** an Officer, working in its own git worktree.
* **Job:** one scoped change, touching only the files it has been given.
* **Limits:** commits on its own branch and reports in 20 lines or fewer. 60 turn cap.

Because each implementer owns its own files and branch, several can work at once without treading on each other.

### The one to avoid: general-purpose

The general-purpose agent is the Admiral with every tool and no supervision. It inherits your flagship model and all your permissions.

Use it only when a task genuinely needs exploring, modifying and reasoning in one head. Even then, say why out loud first. In the talk I described it as needing a signed excuse note.

### What an agent looks like

In Claude Code, an agent is a Markdown file with front matter. It lives in `~/.claude/agents/` for all your projects, or `.claude/agents/` for a single one. Here is a trimmed version of my scout:

```markdown
---
name: scout
description: Fast read-only codebase investigation. Locate files, trace references and answer "where is X?" questions.
tools: Glob, Grep, Read
model: haiku
maxTurns: 20
---

You are a read-only codebase scout. You investigate and report. You never edit, write or run commands.

Output contract:
- Maximum 25 lines in total.
- Findings as `path:line - one-line fact`.
- Never paste full files or directory trees.
```

`model` picks the class, `tools` keeps it read-only and `maxTurns` is the hard cap. The output contract lives in the prompt itself. Every field is covered in the subagent docs linked earlier.

## Managing your subagents

Having a crew is one thing. Keeping them from flooding your main conversation is another.

### Output contracts

Every delegation carries a contract. That means a hard line cap, plus "write the details to a file, return a summary and the path".

Why does this matter so much? Whatever lands in the lead's context is re-read on every turn for the rest of the session. A 3,000 token report pasted in once is billed hundreds of times. So logs, page dumps, diffs and transcripts go to `.scratch/` on disk, never into the conversation. The lead reads back only the lines it needs.

### Files are memory, chat is a corridor

Files such as `plan.md`, `findings.md` and `decision.md` are the project's memory. Any fresh session can pick them up and carry on. The conversation is just the corridor you walk between them.

### Write a proper brief

Vague in, marathon out. Compare these two prompts.

The 120 million token prompt:

```text
Investigate the input handling.
```

That is an open mandate. The agent wanders the codebase for an hour at flagship rates and returns a novella. This actually happened. Repeatedly.

The question with a contract:

```text
scout: where is gamepad deadzone applied? Files and line numbers, 25 lines max.
```

A question, a worker, a format and a cap. Minutes, pennies, done.

A few rules that fall out of this:

* Ask questions, not mandates. "Where is X?" beats "Investigate X."
* State the do nots. Files NOT to touch, refactors NOT to attempt and output NOT to paste.
* One task per prompt. Run tasks one after another when the steps depend on each other.
* Get the lead to draft each subagent's brief. Cheap models perform far better on a well-written brief than expensive models do on a vague one.

### Three is the magic number

With apologies to Monty Python and the Holy Grail (1975), three shall be the number of parallel agents, and the number of the counting shall be three. Four is right out.

Every parallel agent has its own context window and its own bill. You also still have to review what each one did.

### Put it in your instructions

None of this sticks unless it is written down where the lead reads it every session. Here is a trimmed version of the delegation section in my global instructions file:

```markdown
## Delegation policy

- Before spawning ANY subagent, check whether a single Grep, Glob or Read answers the question. One tool call beats one agent.
- Route by task, never default to general-purpose:
  - scout: codebase exploration and fact-finding (read-only, haiku)
  - researcher: web, spec and docs research (sonnet)
  - validator: builds, tests and lints (sonnet)
  - implementer: one scoped code change in an isolated worktree (sonnet)
- Maximum 3 subagents in parallel.
- Every subagent prompt must include an output contract: a hard line limit, and "write details to a file under .scratch/, return the summary and file path only".
```

## Plan, design, build

The workflow from the talk has three phases. Each one ends in a FILE, not a feeling.

1. **Plan.** Use plan mode and keep the lead thin. The output is `plan.md`, with a task list, file ownership per task and done criteria. Tasks that share files are ONE task.
2. **Design.** Two or three cheap agents write competing option documents to `.scratch/options/`, all against the same rubric. Pick one. If code must prove it, run turn-capped spikes in worktrees.
3. **Build.** A fresh session or implementer agents work from `plan.md`. No more than three in parallel, each owning its files. The validator gates every branch before it is merged.

The next phase always starts FRESH from that file. Nobody drags 400k tokens of archaeology forward.

### The magic trick: make the LLM write the build prompt

This is the same trick I mentioned in my [lessons learned post](/using-ai-tooling-a-lessons-learned-exercise.html), taken one step further. The planning session's LAST job is this:

```text
Write the complete prompt a fresh session needs to execute this. Include the goal, constraints, files owned, acceptance criteria and output contract.
```

Then the planning session dies, and the prompt lives on. Paste it into a clean session, or hand it to an implementer agent, and go.

> [!TIP]
> Bonus points: have the research agent summarise its findings in an HTML Claude doc (I have been using this a lot lately). It details the findings and gives a more detailed scope of the work, the pitfalls and concerns, and a shortlist for the task required. Either have it written in a human-readable format for review, or tell the agent that it is for another agent. That way it cuts out the preamble and all the HTML that only wastes tokens.

The arithmetic is hard to argue with. Dragging the planning chat forward means about 200,000 tokens re-read on every turn. The distilled prompt is about 2,000 tokens. Same forward motion, roughly 1% of the luggage.

## Keep talking, compact or start fresh?

The last piece is knowing when a session has done its job.

| Situation | What to do |
| --- | --- |
| Same task, the next step needs the last answer, and context is under about 60%. | **Keep talking.** Momentum is worth more than a restart. |
| Same task, but the context is getting heavy mid-flight. | **Use `/compact` with a keep-list**, for example `/compact keep: current diff, failing tests, decisions`. Do it before auto-compact chooses for you. |
| Task done, topic changed, or you just asked "where were we?" | **Write `plan.md`, then `/clear`.** |

And NEVER resume across days. A fresh session reading `plan.md` beats a two-week seance.

One word of warning on compacting. `/compact` has to read the whole conversation to summarise it, so compacting a large context is itself a large request. `/clear` costs nothing. If you do not need the continuity, clear.

> [!IMPORTANT]
> **The 8 hour rule.** If a session is older than your working day, it is not a session. It is a lodger. Serve notice.

## The five commandments

The talk closed with five rules. If you only take one section from this post, take this one.

1. **Right model per layer.** The Admiral thinks, the Officer works and the Scutter fetches.
2. **A contract on every delegation.** A line cap plus a file path. No exceptions, no novellas.
3. **Files are memory.** `plan.md` and `.scratch/` persist. Conversations are disposable.
4. **Plan, design, build.** And make the LLM write the build prompt before the planning session dies.
5. **Clear early, clear often.** Compact mid-task, clear at boundaries and never resume across days.

## Summary

None of this is about using AI less. It is about noticing that a handful of habits were doing almost all the damage. One immortal conversation, one expensive model doing every job, and a crew of helpers with no brief and no limits.

The fixes are not clever. Pick the right model for each layer and hire a small named crew. Make every one of them sign a contract. Keep your memory in files rather than in a chat that never ends.

> If you have your own tips for keeping a token bill under control, let me know and I will add them to this post.

To borrow from Ace Rimmer (Red Dwarf, "Dimension Jump", 1991), smoke me a kipper, your tokens will be back for breakfast.
