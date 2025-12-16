---
layout: post
title: 'Blender3d.org: Latest News'
date: '2009-01-02 14:22:07'
tags:
- information
---

The Mythical Blender 2.5 project is finally getting momentum and great progress! Currently over 90k of the 300k lines that needed to be recoded are back. Not to say we’re on one-third of the work though…  the new system requires to wrap or recode every (!) tool in Blender. Luckily this kind of work now is getting well defined, and interesting smaller tasks are available for all developers interested to help porting now.

To summarize; here’s the highlights what Blender 2.5x will bring you:

- New window-manager, allowing multi-window setups.
- New area-manager, allowing flexible division in sub-regions with each a distinctive task (like toolbars, button list views, channel views, etc).
- The new area-manager will allow much easier custom editors (via python or C api)
- New event system, based on ‘handlers’ with dynamic (= user definable) keymaps. Events will much better support other devices, or multi-touch even.
- The new event system will also allow Macros, basic construction history, and since events are hanled centrally (separated from drawing) the UI will remain fully responsive (updated) while editing.
- Generic "data api", giving uniform access to data properties for Blender’s UI, for Python, but especially for animation curves or drivers. This will enable the "get everything animated" feature.
- Generic "tools api", which gives uniform access to every tool (option) Blender has. Together with the "data api" this will make scripting in Python much easier. Customizable UIs (toolbars, headers, menus, buttons) are simply possible  this  way

Currently, focus is on first bringing back a working Blender. Don’t expect immediately a completely new interface design, especially how buttons or tools and toolbars will work is for later. It’s also good for our team to get first more familiar with the new system before working on recoding the UI side. Needless to say, with the new 2.5 architecture such work is much more efficient.  
However, what’s going to be improved is at least Ipos and Actions. The first will become more generic (everything animatable), the latter will be converted to a more powerful Dopesheet. Work is also being done on improving the file-selecting window (integrated with image previews), and  there’s a new "data browser" to directly edit any property. I bet we’ll find more fun goodies to improve while porting over old code!  
For those interested to see our work, or to get involved:  
[wiki.blender.org/index.php/BlenderDev/Blender2.5](http://wiki.blender.org/index.php/BlenderDev/Blender2.5)  
Help is always welcome!  
But for now, enjoy the holidays and the last days of 2008. And thanks to everyone who has worked on 2.5 sofar (special kudos to Brecht, Nathan, Joshua, Campbell, Andrea, Diego for their significant contributions on 2.5)! Happy new year!  
December 24, 2008

[Blender3d.org: Latest News](http://feeds.feedburner.com/Blender3d)

