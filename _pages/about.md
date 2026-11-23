---
collection: pages
title: "About"
description: "Who I am and what DarkGenesis is about."
---

<div class="about">
  <p>{{ site.author.bio }}</p>

  <p>DarkGenesis is the blog of Simon Jackson, a solutions and enterprise architect from the United Kingdom. His full profile is on the ZenithMoon Studios website. It covers his work history, skills, recommendations and how to hire him.</p>

  <p><a class="btn" href="https://zenithmoon.com/simon-jackson" rel="me">About Simon Jackson, solutions and enterprise architect</a></p>

  <h2>Connect</h2>
  <ul>
    {% if site.author.github %}<li><a href="https://github.com/{{ site.author.github }}">GitHub</a></li>{% endif %}
    {% if site.author.linkedin %}<li><a href="https://www.linkedin.com/in/{{ site.author.linkedin }}/">LinkedIn</a></li>{% endif %}
    {% if site.author.twitter %}<li><a href="https://twitter.com/{{ site.author.twitter | replace: '@','' }}">Twitter/X</a></li>{% endif %}
    {% if site.author.email %}<li><a href="mailto:{{ site.author.email }}">Email</a></li>{% endif %}
  </ul>
</div>
