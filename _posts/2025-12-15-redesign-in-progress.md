---
layout: post
title: "DarkGenesis Redesign In Progress"
date: 2025-12-15 16:00:00 +0000
description: "The blog is being redesigned with modern features while preserving all existing URLs."
category: Announcements
tags:
  - blog
  - announcement
author: Simon Jackson
img: posts/20251215/redesign-in-progress/hero.svg
github: SimonDarksideJ/SimonDarksideJ.github.io/
---

The DarkGenesis blog is undergoing a complete modern redesign. All existing URLs will be preserved for SEO continuity.

> [!NOTE]
>
> This is a living redesign log; content and layout may change as features land.

## 2026 needed a refresh

One of the things I dread is revisiting the design, style, or even template I use for my blog.  I spend far too long browsing lots of cool things, find something I like only to find it is either not deployable or has "hidden" issues.  The end result is always a trade off between what I want/like and what the template is capable of.

So this time things are different, using tools available (I still refuse to use a site generator), I began the journey using all the tools at my disposal to generate the site fresh, give it a modern look and then use AI tools to help refine/change what I did not like.

Still very much a work-in-progress, but delivered far faster using the tools available to me.  I hope you like it.

The rest of this post is my ongoing test to ensure styles work, features are as expected and nothing "breaks" :D

Feel free to skip the rest and move on :P

## Example post image

This post uses a date-based image folder so it’s obvious which images belong to which post:

`/assets/img/posts/20251215/redesign-in-progress/`

The banner image is referenced via front matter (`img:`) and can also be embedded inline:

![Redesign in progress banner]({{ '/assets/img/posts/20251215/redesign-in-progress/hero.svg' | relative_url }})

## What's Coming

- Modern responsive design
- Dark mode support  
- Enhanced search
- Better accessibility
- Social media integration

Stay tuned!

## Markdown support (quick validation)

Inline code looks like `bundle exec jekyll serve`.

Strikethrough works: ~~old plan~~ new plan.

### Fenced code block

```ruby
puts "Hello from Ruby"
```

### Task list

- [x] Jekyll build works on Windows
- [ ] Add more posts

### Table

| Feature | Status |
| --- | --- |
| Fenced code blocks | ✅ |
| Tables | ✅ |
| Task lists | ✅ |
