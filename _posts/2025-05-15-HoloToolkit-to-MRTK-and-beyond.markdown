---
layout: post
title: HoloToolkit to MRTK and Beyond
date: 2025-05-15 00:00 +0000
description: The journey of the Microsoft HoloToolkit for HoloLens, the evolution of the MRTK and the journey onwards.
img: posts/20250515/title.gif
category: XR
tags:
- xr
- ar
- unity3d
author: Simon Jackson
mathjax: false
---

> TL; DR -> I am immensely proud of my achievements evolving the [MS HoloToolkit](https://github.com/microsoft/MixedRealityToolkit-Unity/tree/2017.4.2.0) into the cross-platform framework that became the [MS Mixed Reality Toolkit](https://github.com/microsoft/MixedRealityToolkit-Unity/releases/tag/v2.8.3), and the journey onwards to crafting framework components for the [XRTK](https://github.com/XRTK) and finally the [Reality Collective](https://www.realitycollective.net/).

![The Journey](/assets/img/posts/20250515/HoloJourney.png)

It seems almost a lifetime ago before I was invited into the Microsoft HoloToolkit team following a strong suggestion by [Stephen Hodgson](https://github.com/rageagainstthepixel) who was already working closely with Microsoft.  I had already been working in the XR space for some time and my experiences and skillz seemed a good fit to take things forward.  I did not know at the time just how far forward we would go!

## [HoloToolkit for Unity](https://github.com/microsoft/MixedRealityToolkit-Unity/tree/2017.4.2.0)

With the astounding launch of the [Microsoft HoloLens](https://learn.microsoft.com/en-us/previous-versions/mixed-reality/hololens-1/hololens1-hardware), the software toolkit that supported it already supported a vast array of features, tools and even baked in UX components.  This created one of the easiest toolkit's to use for building for any XR headset at the time.

|![HoloLens 1 Toolkit features](https://github.com/microsoft/MixedRealityToolkit-Unity/raw/2017.4.2.0/External/ReadMeImages/MRTK_BuildingBlocks.png)|
| :---: |
|**Figure 1: HoloLens 1 Toolkit feature set**|

For supporting HoloLens it was second to none, however, it did have a huge gap when it came to making XR solutions, it ONLY supported HoloLens.

The date was 2018 and this is where my journey with the HoloToolkit really took off.

## [The Dream of a multi-platform toolkit](https://github.com/microsoft/MixedRealityToolkit-Unity/releases/tag/v2.8.3)

Those who know me have experienced my passion for supporting developers and making their dreams of making big things on as small a budget as possible.  Building multiple projects, each for different platforms and effectively having to remake a solution each time for a new platform does not sit well with me, when I have a project, content, interaction paths and a structure, why should you be forced to re-envisage it each time a new piece of hardware comes along, it does not make sense.

For platform vendors it makes perfect sense, they want projects to shine only on their platform, using their tools and design language, which is fine for their business models.  However, for developers it is just a nightmare that needs to be managed, but why?

Seeing this, I took it upon myself to build up a new architecture / design for the HoloToolkit that would separate out all the critical deliverables of the toolkit whilst instilling a new focus on cross-platform development.  Between Stephen Hodgson and I, we turned this dream/architecture into a reality.

* Break Hardware dependence.
* Refactor input for hardware abstraction.
* Define the underlying service framework-driven approach.
* Repackage existing components for Boundary, Spatial Understanding and UX to work from common interfaces.
* High focus on configurability over scene driven components.

The envisioned architecture in its most basic form was represented as follows:

|![MRTK-vNext Architecture](/assets/img/posts/20250515/MRTK-Next-Architecture.png)|
| :---: |
|**Figure 2: The MRTK vNext architecture**|

This renewed architecture delivered a vast array of possibilities and performance improvements over the legacy way of building out scene based MonoBehaviour delivery (an **80% improvement** in high-frequency areas such as Input and interaction), delivering measurable benefits such as:

* Abstracted Device layer.
  Allows quick adoption of new devices without affecting existing projects.
* Only a single Singleton / MonoBehaviour in the core project.
  Single Manager / presence in a scene for easier management.
* Improved performance with all systems being run from the Mixed Reality Manager.
  Improved scalable Input System.
* Scalable component based architecture.
  New features can be easily added to the toolkit.

In short, instead of completely rebuilding a project using another vendor's SDK or Hardware API, the project is written against a common interface and a new platform is simply added to deliver the data needed to run the framework.

### What went right

The framework itself was a huge success and adoption was quick due to pre-built configuration profiles being delivered with the project, what would originally take several hours with the HoloToolkit (or other competitive XR packages) now took minutes, as intended the focus was now driven to building out UX, experience and content over "getting things working".

As new hardware platforms were added, either by Microsoft or the community (due to its componentized nature, new platforms only had to exist in the project and they were immediately picked up), adoption was easy.

Microsoft kept expanding the UI framework with new features to further enhance projects built with the new MRTK, each component being another "drop in" feature already wired up to all the critical events to make them work.

HoloLens 2 slotted right in with the new framework, and any existing projects that were built for HoloLens 1 using the new toolkit automatically inherited HoloLens 2 deployment with no changes.  Granted, with any new device there are new features and capabilities, but these were extensions on top of the existing framework, making adoption easier.

### What could have gone better

With time and budgets, there was no scope to provide an upgrade path from the original HoloToolkit to the new MRTK, there had already been a lot of angst over recent changes to the HoloToolkit and refactoring/restructuring of how the legacy toolkit was delivered.  It was a short term pain and a lot of guidance was provided on how to "step up" quickly to upgrade projects.  But in reality, projects needed to be re-built from the ground up with how the new toolkit functioned.  (Sadly an experience to be repeated when the Microsoft team decided to re-engineer the MRTK with Unity's XRI Framework for MRTK3).

Not long after the launch of the HoloLens 2 and its adoption into the MRTK, all external (non-Microsoft) were exited from the project due to some changes in the internal management of the Mixed Reality team, this effectively shut out developers such as myself and Stephen Hodgson (and several others) from further development of the project, after so much time and investment to build the framework for Microsoft, some felt this was a bridge too far.  A hard lesson to learn in how to build open projects for large companies.
The wider team was still encouraged to participate in events and support the MRTK in the community for adoption, but all Microsoft projects and contracts were held in-house and limited information was shared regarding any issues or frustrations in its use.  This sadly limited the future development of the framework.

Newer features became difficult to engineer and implement into the framework and some features that needed an overhaul were only migrated into the MRTK, while this did not cause specific problems, the advantages of the new platform were lost on these features and no time was given to upgrade them.

## Onwards, the launch of the XRTK - 2019

|![XRTK Logo](/assets/img/posts/20250515/XRTK_Logo_1200x250.png)|
| :---: |
|**Figure 3: The birth of the XRTK**|

As the MRTK became more of an internal project, the community, spearheaded by Stephen Hodgson and myself (and later others) brought the heart of the MRTK v2 into the public domain, this was supported by Microsoft for wider community engagement as a way to cooperatively build out new features / platforms and components that were compatible with the base MRTK.  Numerous fixes and enhancements were driven into the framework (some ending as PR's into the MRTK while it was still accepting community changes) and newer platforms were added such as:

* OpenVR
* Meta Quest
* Pico
* Magic Leap

Additionally, new build processes to automate the building of XRTK projects were created, used to also build and test the framework to ensure reliability for future changes as well as delivery of the entire solution as [OpenUPM packages](https://openupm.com/) further increasing access to the project and getting teams setup quicker.  MRTK however chose to deliver a separate tool to manage delivery of MRTK packages rather than using open source solutions.

## The birth of the Reality Collective and the evolution of the framework - 2022

While the demand for the original vision of a truly cross-platform and cross-device framework, the original design and architecture was still true, there were many concerns raised by the community and some of the developers of the toolkit that it was becoming overly monolithic, features were too tightly bound and specific parts of the framework that were useful outside of XR were locked behind layers of other functionality, a change was needed and thus the [Reality Collective](https://www.realitycollective.net/) was formed in 2021 by [Dino Fejzagić](https://github.com/FejZa) and myself.

|![The Reality Collective family](/assets/img/posts/20250515/RealityCollective.png)|
| :---: |
|**Figure 4: The Reality Collective**|

One of the most fundamental changes we agreed on was the breaking up of all the collected components of the framework to allow for better reuse in any Unity project, starting with the [Service Framework](https://serviceframework.realitycollective.net/) which was at the heart of everything the toolkit did.

|Component|Description|
|:---|---|
| Service Framework|The core of the framework, provides the hosting platform for all connected services.|
| Reality Toolkit|The heart of the XR framework, delivering an advanced platform for building XR solutions.|
| Utilities|A collection of reusable components, extensions and data structures, essential for any Unity project.|
| Services| Boundary, Locomotion, Player services to build XR features for projects.|
| Platforms| The platform enablers for Meta, Pico, OpenVR/XR and more.|

### Service Framework

|![Service Framework design](https://serviceframework.realitycollective.net/assets/images/03_05_ServiceRegistration-2021178ae2fe0b34b74bb2182d2f4adb.png)|
| :---: |
|**Figure 5: Service Design**|

The service framework at his heart decouples functional services and runtimes from the Unity MonoBehaviour shackles, enabling high-frequency operations and reducing performance impacts by 80%, similar to what Unity is trying to achieve with its new DOTS/ECS framework (which requires drastic changes to the construction of your project).

Functionality is effectively containerised into discrete components and through the service framework, they are immediately accessible throughout the project without any hard dependencies.

Another core tenant of Service Design within the Service Framework is the decoupling of configuration for each service through configuration profiles:

|![Service Profiles](/assets/img/posts/20250515/Service-Framework-Profile.png)|
| :---: |
|**Figure 6: Service Profiles**|

Profiles are independent configuration files that are attached to service configuration, they are decoupled from any Scene based configuration (so changing configuration does not require scene changes) and can even be swapped out at runtime if needed.  This enables you to have services with multiple types of configuration and apply the one that best meets the Scene or Project/platform needs.  This is crucial for XR solutions where platforms need specific setups depending on the headset they are running on.

All my production projects use the service framework for anything from:

* Application Settings.
* Application State.
* UX design and flow.
* Integration with third party services.

There is so much more behind the Service Framework, so you can [read about it here](https://serviceframework.realitycollective.net/docs/get-started), or check out [Joost van Schaik](https://localjoost.github.io/) blog where he talks about so many different Service Framework implementations.

### Reality Toolkit

The Reality Toolkit is where is all began, now stripped down to just the essential parts to be more efficient and maintainable, each feature given its own space in its own right to make building projects even easier:

* The Core - Input system, critical definitions and structures, and future proofed elements to be as fast as possible.
* The Player framework - Defines playable areas, the XR rig definition and a multi-tiered Camera / vision setup, automatically setting up the environment in reaction to the headset / environment it is running on.
* The Interaction System - A vast array of building blocks for almost any kind of XR interaction, from Select, Grab, Throw, Pull, Switch and so much more. All ready to work out of the box.
* The Locomotion system - Enables all forms of reusable features to control locomotion for players in XR titles, including teleportation, screen effects and anchoring.

And so much more, and due to the componentized nature, you only need take in those components you want or need to use.

> Interestingly, when the MRTK raised up to V3, they took a similar approach to the Reality Toolkit and separated out the Service Infrastructure for Unity's XRI platform. They then tried to re-create the patterns of the Service Framework into the XR Subsystems, trying to retain the approach used by the XRTK/Reality Collective.
>
> However it became too cumbersome for users to migrate to, some of those projects with existing MRTK V2 services actually included the Service Framework instead as it meant they could reuse what they had already built with little rework.

There is even a fully [featured sample app](https://www.oculus.com/experiences/25377052891940875/release-channels/2032095987191736/?token=LQsA7nJV) available (still actively being worked on) to feature all the components of the Reality toolkit, following a dungeon explorer style game with each room teaching you some new trick or feature:

|![Sample Dungeon demo](/assets/img/posts/20250515/DungeonSample.png)|
| :---: |
|**Figure 7: [Sample Dungeon](https://www.oculus.com/experiences/25377052891940875/release-channels/2032095987191736/?token=LQsA7nJV) demo**|

The toolkit is the fastest way to get your XR project up and running and on to whichever devices you want to deploy on (provided the client plugin has been built to work with the framework)

## Summary

XR is still an evolving space, I have worked on and continue to work on so many different projects from Mobile to headset and beyond and AI's introduction is only accelerating its use and development.

I have bright visions for the future and still continue to contribute to open source projects like the Service Framework and Reality Toolkit as time permits, as well as utilize them in production projects (I have added two new platforms to the Spatial Persistence package already recently for Google Cloud Anchors and AR Foundation Image tracking), so where the framework's use in a project needs expansion, all efforts head back into the online projects as well.

Ever onwards!!
