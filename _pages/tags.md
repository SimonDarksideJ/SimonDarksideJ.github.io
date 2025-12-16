---
layout: page
title: "Tags"
description: "Browse posts by tag"
permalink: /tags/
---

{% assign max_count = 1 %}
{% for tag in site.tags %}
  {% assign count = tag[1].size %}
  {% if count > max_count %}{% assign max_count = count %}{% endif %}
{% endfor %}

<div class="tag-cloud" aria-label="Tag cloud">
  {% assign tags_sorted = site.tags | sort %}
  {% for tag in tags_sorted %}
    {% assign tag_name = tag[0] %}
    {% assign tag_slug = tag_name | slugify %}
    {% assign count = tag[1].size %}
    {% assign ratio = count | times: 4 | divided_by: max_count %}
    {% assign size = ratio | plus: 1 %}

    <a class="tag-cloud__tag tag-cloud__tag--{{ size }}" href="{{ '/tag/' | append: tag_slug | append: '/' | relative_url }}" aria-label="{{ tag_name }} ({{ count }} posts)">
      <span class="tag-cloud__name">{{ tag_name }}</span>
      <span class="tag-cloud__count">{{ count }}</span>
    </a>
  {% endfor %}
</div>
