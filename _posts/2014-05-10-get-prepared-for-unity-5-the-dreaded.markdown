---
layout: post
title: Architecting Unity3D - Accessing Components on MonoBehaviour
date: '2014-05-10 16:16:45'
tags:
- information
- unity-3d-tutorials
- unity3d
---

#  So what is in a “.” when accessing a Component

> Check the Post on the Unity forms discussing this practice here – [http://forum.unity3d.com/threads/245400-Unity-5-Beta-Insights](http://forum.unity3d.com/threads/245400-Unity-5-Beta-Insights)
> 
> ### \*\*Update, Unity have now written a post on the changes posed for Unity 5 and the inner workings, well worth a read – [http://bit.ly/1pf5Wog](http://bit.ly/1pf5Wog "Unity5: API changes & automatic script updating")
> 
> Another interesting post has arisen which also includes some timing and stats for using cached components verses using the shortcuts, check it out – [http://bit.ly/1pfaUkQ](http://bit.ly/1pfaUkQ "Unity3D – Accessors are bad- Caching is good!")

![width=](http://i1.livememe.com/xwe6kn.jpg)

When you use **components** and scripts in your Unity3D project and then want to access them in code, it is very easy to just start writing:

    this.renderer.collider.attachedRigidbody.angularDrag = 0.2f;

> Not to be confused with accessing properties on a class or struct, only when accessing components

(Yes, that is a bit of an extreme case but it is there to prove a point)

In that simple one line of code you have actually invoked or accessed 3 separate components attached to the GameObject you are running the script from.

In the background, Unity3D converts this to:

    var renderer = this.GetComponent\<Renderer\>(); var collider = renderer.GetComponent\<Collider\>(); var ridgedBody = collider.GetComponent\<Rigidbody\>(); ridgedBody.angularDrag = 0.2f;

As pointed out in the forums this could also be represented as:

    GetComponent\<Renderer\>().GetComponent\<Collider\>().GetComponent\<Rigidbody\>().angularDrag = 0.2f;

Not so simple now is it.  This process is inherently slow and can sometimes involve a fair bit of reflection in the code (process of dissembling code in memory, like any of the Function(string) methods do).

Multiply that by every frame and you can start to begin to see why this is such a problem, it was just a way to write simpler code in the beginning but as it is becoming more prevalent these days unity has said “enough is enough” and is making breaking changes.

> **Note AFAIK, the behaviour also affects both JavaScript and Boo as well**

* * *

 

Some clarifications

Following on from a lot of the conversations on the Unity forum post that sprang up following this post, I thought I’d add some further clarifications here that have been stated by the Unity3D developers:

What properties / components are affected:

The following types / properties are known to do GetComponent\<\> under the hood:

- Scripts (any script you attach to a GameObject)
- Animation
- Audio
- Collider
- Collider2D
- GuiText
- GuiTexture
- NetworkView
- ParticleEmitter
- ParticleSystem
- Renderer
- Rigidbody
- Rigidbody2D

The following properties may be affected (not confirmed)

- Camera
- ConstantForce
- HingeJoint
- Light
- 

Finally these are confirmed as **NOT** affected

- ActiveInHierarchy
- ActiveSelf
- Layer
- HideFlags
- IsStatic
- Tag
- Name
- GameObject
- **Transform** (even though transform is a component, Unity devs confirm this is not affected due to its special implementation)

If you get any more detail, comment below and this list can be updated

* * *

# Best practice with Unity3D

This behaviour with accessing components in code as a property (using GameObject.Component) does work but like so many things, “just because you can do a thing doesn’t mean you should”, so what can you do to make you’re code work better.

The first part is to understand your code and to make it better, so that you think about:

- Do I really need to keep referencing a component each frame
- If you do, then keep that component as a reference in your script to access it rather than calling GetComponent every time
- You can still do GetComponent each frame if you wish (not advised), you are just in control of it now.

So to this end, the better implementation of the above script is:

    Rigidbody myScriptBody; void Awake() {     var renderer = this.GetComponent\<Renderer\>();     var collider = renderer.GetComponent\<Collider\>();     myScriptBody = collider.GetComponent\<Rigidbody\>(); } void Update() {     myScriptBody.angularDrag = 0.2f \* Time.deltaTime; }

Thus only using GetComponent the first time the script is run and storing the reference (or references) I need at run time, then using the in memory reference instead of trying to discover it every frame.

These are just simple changes to how you use and access components within the Unity3D system.

* * *

# The best advice

![width=](http://www.chfi.com/files/advice-guys.jpg)

You are now forewarned and forearmed with new knowledge, use this knowledge to change your current practices if you have been using the “.” method in your code to access a Component attached to it. (does not affect accessing normal properties on any MonoBehaviour classes, just components!)

Keep it in mind with every video tutorial you watch or script you import from a lib or wiki and adapt it in advance.

If you currently are doing this a lot in your code and feel it’s too much of a change for what is arguably just a modularisation of your code, then keep your ears out for Unity5, there’s still quite a few surprises yet to come, including some help with this behaviour.

* * *

# The future is bright, the future is Unity5

![data-recalc-dims=](http://i0.wp.com/habrastorage.org/getpro/habr/post_images/597/909/b1b/597909b1b54d88efcbb74c702645330d.png?resize=600%2C263)

If you have not seen what is coming publically in Unity 5, check out the feature preview shown at Unite 2014

[https://www.youtube.com/watch?v=](https://www.youtube.com/watch?v=)

later’s

