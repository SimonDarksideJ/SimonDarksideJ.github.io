---
layout: post
read_time: true
show_date: true
title: MonoGame blasts into the future with DotNet core
date: 2020-08-13 21:31:15
description: Dotnet core is now the preferred style for getting access to MonoGame, learn all the tips and tricks here to get started. Video included.
img: brands/monogame.png
tags: [monogame]
author: Simon Jackson
github:  
mathjax: no
---

MonoGame is certainly one of those frameworks where if you take your eye off it for a little while, it comes back to slap you in the face and remind you why it is still relevant.  
With the recent MonoGame 3.8 release, this is even more true than ever as we say goodbye to the old MSI approach for installing one of the best open-source game frameworks out there.

## Tl;DR

In Short, MonoGame has embraced a more modern style approach to framework delivery which is version independent and no longer requires you to install hard dependencies for the framework (beyond the [netcore SDK](https://dotnet.microsoft.com/download) provided by Microsoft)

- New DotNet core style approach to delivery.
- Project templates are now delivered as Visual Studio Extensions for Windows and Mac.
- Project templates are also available from the DotNet package repository.
- All tools are published to the DotNet Tools repository, working for all Operating systems, including Linux.
- Lots of major improvements to the framework (full change-list will be published with the 3.8 release)
- The MonoGame 3.8 project definitions are not compatible with projects created in previous versions, 3.8 is also unable to open older projects, so you will still need to use the MSI’s to maintain older projects.
The advice is simply to copy your code to the newer templates and continue on from there, no other code changes should be needed.
- Still Free!

## A brief history of time MonoGame

<figure class="wp-block-image size-large"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Microsoft_XNA_logo.svg/1200px-Microsoft_XNA_logo.svg.png" alt="/&gt;&lt;figcaption&gt;The forefather of MonoGame&lt;/figcaption&gt;&lt;/figure&gt;

&lt;p&gt;MonoGame owes its roots to its predecessor, Microsoft’s XNA Game Framework. It was a fabulous framework that gave every C# coder (and Visual Basic devs too) access to build awesome games for Windows, Xbox and eventually Windows Phone (gone too soon). Sadly XNA left us at its peak, just as it was being introduced into education facilities and enabling many developers to get their first leg into the Game industry.&lt;/p&gt;

&lt;blockquote class=" wp-block-quote><p>Check out some of the awesome titles created with XNA during the <a href="https://en.wikipedia.org/wiki/Dream_Build_Play" target="_blank" rel="noreferrer noopener">Dream Build Play</a> years where devs had the chance to make it big in a global developer competition for cash and glory.</p>

<p>Since XNA’s demise, MonoGame has taken the framework with the full blessing of Microsoft and turned it in to the leading C# framework for building cross-platform games on:</p>

<ul>
<li>Windows</li>
<li>Android</li>
<li>iOS/Mac</li>
<li>Linux</li>
<li>Windows 10</li>
<li>Xbox One (all versions)</li>
<li>PlayStation 4</li>
<li>Switch</li>
<li>And many more past, present and future</li>
</ul>

<h2>Blazing a new trail</h2>

<figure class="wp-block-image size-large"><img src="https://github.com/MonoGame/MonoGame.Logo/raw/master/FullColorOnLight/HorizontalLogo_512px.png" alt="/&gt;&lt;figcaption&gt;One framework for creating&lt;br&gt;powerful cross-platform games&lt;/figcaption&gt;&lt;/figure&gt;

&lt;p&gt;MonoGame keeps going from strength to strength with each and every release, which is amazing considering most of the core team have full time jobs, but their passion never wavers.&lt;/p&gt;

&lt;blockquote class=" wp-block-quote><p>Check out the many titles, most of which are award-winning, that are out there on the <a href="https://twitter.com/search?q=%23BuiltWithMonoGame">#BuiltWithMonoGame</a> tag, you may be surprised by more than a few.</p>

<p>The MonoGame 3.8 release brings with it one of the largest changes in MonoGame (and even XNA history) with the demolishing of the old “Installer”. You might ask why that is so important, so here are my top reasons why you should care:</p>

<ul>
<li>
<span style="text-decoration: underline;">Version independence</span><br>No longer is your machine version dependant on what you have installed. From 3.8, you will be able to open any project with any future version and it will “just work”. No need to hunt for the installer for that specific version and lock your machine to editing that version of a project.</li>
<li>
<span style="text-decoration: underline;">Online delivery of dependencies</span><br>With all of MonoGame now published to NuGet and the DotNet core library, you no longer need to search for downloads or extra packages and possibly obsolete utilities, everything is online and all dependencies for that version will also be available online. The days of hunting for a rogue dll are gone.</li>
<li>
<span style="text-decoration: underline;">Distributed tooling<br></span>The tools that support MonoGame for building/editing content and compiling shaders all used to be in the framework installers. Now they are separate tools and you can install and use whichever version works for you. Updating is also much easier as they can be updated independently of the core MonoGame framework.</li>
<li>
<span style="text-decoration: underline;">Unified delivery</span><br>You can now install MonoGame for whichever operating system or development style you want all using the same pattern. it is the same pattern no matter your preference, the only real choice now is whether you go IDE or No IDE.</li>
</ul>

<p>There are a lot of fixes and enhancements as part of the MonoGame 3.8 release which the team have been working really hard on and we are seeing the first signs of extending beyond the bounds of the original XNA Framework API.</p>

<blockquote class="wp-block-quote"><p>Take a moment where you can to give the team some praise for all their hard works, whenever and wherever you can!</p></blockquote>

<h2>NetCore CLI for the Win</h2>

<figure class="wp-block-image size-large"><img loading="lazy" width="802" height="512" src="/assets/img/wordpress/2020/07/netcoredemo.gif" alt=" class=" wp-image-101494><figcaption>Just do it</figcaption></figure>

<p>It’s that simple building a project from the command-line and you can use your favourite slimline code editor to manage your code, as well as using the new standalone MonoGame Content Builder (MGCB) editor to manage your content (but of course, you could just edit the project file yourself)</p>

<blockquote class="wp-block-quote"><p><strong>Once Monogame 3.8 is released, check the <a href="https://docs.monogame.net/index.html" target="_blank" rel="noreferrer noopener">MonoGame documentation</a> for more guidance on how to get setup using the CLI tools.</strong></p></blockquote>

<h2>Visual Studio 2010 and Visual Studio for Mac</h2>

<p>Of course, if (like me) you treasure your precious IDE and can’t live without its full features, code management and tests, the MonoGame team still have you covered.</p>

<div class="wp-block-jetpack-tiled-gallery aligncenter is-style-rectangular"><div class="tiled-gallery__gallery">
<div class="tiled-gallery __row"><div class="tiled-gallery__ col" style="flex-basis:100%"><figure class="tiled-gallery__item"><img alt=" data-height=" data-id="101495" data-link="https://darkgenesis.zenithmoon.com/?attachment_id=101495" data-url="/assets/img/wordpress/2020/07/1_VisualStudioExtensionManager.png" data-width="941" src="/assets/img/wordpress/2020/07/1_VisualStudioExtensionManager.png?ssl=1" layout="responsive"></figure></div></div>
<div class="tiled-gallery __row"><div class="tiled-gallery__ col" style="flex-basis:100%"><figure class="tiled-gallery__item"><img alt=" data-height=" data-id="101496" data-link="https://darkgenesis.zenithmoon.com/?attachment_id=101496" data-url="/assets/img/wordpress/2020/07/1_VisualStudioMacExtensionManager.png" data-width="1648" src="/assets/img/wordpress/2020/07/1_VisualStudioMacExtensionManager.png?ssl=1" layout="responsive"></figure></div></div>
</div></div>

<div class="wp-block-group"><div class="wp-block-group__inner-container">
<div class="wp-block-group"><div class="wp-block-group__inner-container">
<p>The project templates are published on the respective Visual Studio Extension libraries and it’s as simple as selecting the templates and clicking install to be able to build new MonoGame projects.</p>
</div></div>
</div></div>

<h2>It’s all about the tools</h2>

<p>MonoGame publishes three distinct tools, however, for most developers you only need to be concerned with the mgcb-editor, these are:</p>

<ul>
<li>MonoGame Content Builder (mgcb-editor)<br>The graphical GUI tool used for editing the content project projects (.mgcb) in your MonoGame solution. This allows you to add / remove and manage your content ready to be picked up and processed when building your game.<br>
</li>
<li>MonoGame Content Builder (mgcb)<br>The backend content builder pipeline that is used by the dotnet tools to compile and compress your assets ready for shipping with your game for a specific platform.<br>
</li>
<li>MonoGame FX Compile Tool (2MGFX)<br>The backend effects/shader compiler that is used by the dotnet tools to compile and compress your shaders ready for shipping with your game for a specific platform.</li>
</ul>

<p>The latter two tools can also be used in DevOps style building routines to automate the production and testing of your solution if that is how you rock. This is made all the more easier now that the tools can be deployed separately without a packaged MSI.</p>

<p><strong>Installing the tools</strong> is very easy, simply open a command prompt/terminal window and run the following <strong>dotnet </strong>commands, for example, the mgcb-editor:</p>

<pre class="wp-block-code"><code>dotnet tool install -g dotnet-mgcb-editor
mgcb-editor --register</code></pre>

<p>And that is it, the editor is installed and registered with your OS and Visual Studio. Just double-click a .mgcb file if you don’t believe me.</p>

<blockquote class="wp-block-quote"><p>If you want to install development versions of the tools or templates, check the MonoGame documentation on the site for more information, simply needs a few extra arguments.</p></blockquote>

<h2>The future is only beginning</h2>

<p>The only caveat to watch out for with MonoGame 3.8 is that it is not backwards compatible, so you will still need the old MSI installers to edit projects built with MonoGame 3.7 and below. </p>

<p>Upgrading projects is easy enough however, just create a new project and migrate your code across. All your code will still be safe and just work as the underlying MonoGame framework itself is backwards compatible.</p>

<figure class="wp-block-image size-large"><a href="http://www.youtube.com/c/TheDarksideofMonoGame" target="_blank" rel="noopener noreferrer"><img loading="lazy" width="567" height="103" src="/assets/img/wordpress/2020/07/2020-07-28_22-00-45.png" alt=" class=" wp-image-101499 srcset="/assets/img/wordpress/2020/07/2020-07-28_22-00-45.png 567w, /assets/img/wordpress/2020/07/2020-07-28_22-00-45-300x54.png 300w" sizes="(max-width: 567px) 100vw, 567px"></a></figure>

<p>Make sure you visit my <a href="http://www.youtube.com/c/TheDarksideofMonoGame" target="_blank" rel="noreferrer noopener">YouTube channel for MonoGame development</a> for some videos showcasing how to get started with MonoGame and yet more content incoming.</p>
</figure></figure>
