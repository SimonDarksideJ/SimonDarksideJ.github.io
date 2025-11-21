---
layout: post
title: Having fun in space with trails
date: '2014-12-30 14:51:53'
tags:
- ramblings
---

At the time of writing this, I am nearing the end of my second journey in to book writing. (in a very short period of time) In response to a survey I put out about where to put content (a non-UI tutorial in a book about the new UI system), I am publishing the appendix for my forthcoming Unity title named **Unity 3D UI Essentials** :

<figure style="width: 500px" class="wp-caption alignnone"><a href="http://darkgenesis.zenithmoon.com/portfolio/unity-3d-ui-essentials/"><img loading="lazy" src="https://www.packtpub.com/sites/default/files/3560_Unity%203D%20GUI%20Essentials.jpg" alt=" width=" height="617"></a><figcaption class="wp-caption-text">Unity 3D UI Essentials – published by packt Publishing</figcaption></figure>

 


## [Unity 3D UI Essentials](https://www.packtpub.com/game-development/unity-3d-gui-essentials)

> As the book at the moment is still in preview (pre-order). Full details about the book can be found [here on my blog](http://darkgenesis.zenithmoon.com/portfolio/unity-3d-ui-essentials/ "Unity 3D UI Essentials"). (some of the notes on the Packt site are still very odd, working with the publisher to fix those ![Confused smile](/assets/img/wordpress/2015/01/wlEmoticon-confusedsmile.png))

So for a little extra chapter which talks about setting up the 3D Demo scene for Chapter 5, check it out here:

> The appendix is all about creating a 3D demo scene for which to build our UI upon.  There are lots of tips and tricks here for 3D scene setup, background cameras with effects and using the infamous trail renderers for drawing a line behind 3D objects.  Enjoy.

 

> **Note this is not my usual sort of tutorial, as I usually explain things a lot more. This is more of a step by step tutorial (that I usually moan about) to setup the scene.**

* * *


# Appendix – The 3D scene sample

As part of **Chapter 5 – Screenspace, Worldspace and the camera,** I setup a simple 3D demo scene with a few effects to make the UI really stand out and shine. However as the focus of this book it was moved to an appendix for you to follow if you so wish.

Additionally, the appendix is also available online here – http://bit.ly/UnityUIEssentials3DDemoScene \<- This post 😀[  
](/assets/img/wordpress/2015/01/wlEmoticon-openmouthedsmile.png)

> If you want to skip its creation or just use the completed version to follow through, then you can download the **.UnityPackage** asset for the demo scene here [http://bit.ly/UIEssentialsCh5DemoScene](http://bit.ly/UIEssentialsCh5DemoScene) and then just import it into your project as a **Custom Package** using Assets -\> Import package -\> Custom Package… in the Unity menu.

This chapter just works through a couple of 3D tips and tricks that you can use in any scene to help liven it up and work through some the niggles of working in 3D scenes.


# Setting up for the big game

To make any picture stand out, it needs a really good background, so for **Chapter 5** I created this simple 3D space scene for us to paint our UI on to:

[![3617OS_APP_01](/assets/img/wordpress/2015/01/3617OS_APP_01.png "3617OS\_APP\_01")](/assets/img/wordpress/2015/01/3617OS_APP_01.png)

It is a cool mix of different Canvas UI elements displayed in a 3D scene, all with completely free Assets!

First off for our big example, let’s grab a few things:

1. Start a new 3D project or just create a brand new scene for our playground.
2. Add the standard Particle project asset that comes with Unity (either when setting up the project or through **_Assets -\> Import Package -\> Particles_** in the menu)
3. Grab the Skybox Volume 2 Nebula asset package from the store (it is free and fantastic for demos – [http://bit.ly/NebulaSkybox](http://bit.ly/NebulaSkybox))
4. Grab the Free SciFi Fighter asset package from the store (it is pretty – [http://bit.ly/SciFiFighter](http://bit.ly/SciFiFighter))

> Note, the SciFi fighter when imported does not use its own folder (very annoying), so after you have imported it, create a new folder called SciFi Fighter and move its assets to this folder (Materials folder, Meshes Folder, Textures folder and SciFi\_Fighter\_AK5 scene), just to keep the project structure tidy.

It is truly amazing what free stuff is available for game creators these days!


## The initial 3D scene

I almost had a little too much fun creating this basic scene and even learned some new tricks along the way.  It is not crucial for the UI setup so you can skip it if you want to but it will only take 5 minutes or so to complete.

1. Start with a new scene (if you have not done so already) and save it as **Example\_UI**
2. Drag the **fbx** mesh asset in to the scene from the **Meshes** folder (either from the project root or the SciFi Fighter folder you created)
3. Change the Rotation of the **SciFi Figher** to X **357** , Y **18** , Z **317.** This gives a nice outbound flight path for the fighter.
4. Drag the **Main Camera** (in the hierarchy) as a child of the **SciFi Fighter** and reset its transform (using the **cog** icon in the **top right hand corner** of the inspector with the **Main Camera** selected, then select **Reset** ). This ensures that the camera is always following the fighter and keeps it in view.
5. Set up the **Main Camera** ’s transform as follows:
  - Position : X **38** , Y **48** , Z **-47**
  - Rotation : X  **31** , Y **340** , Z **30**
6. Remove the **GUILayer** , **Flare layer** and **Audio Listener** from the Main Camera by right clicking on each component and selecting Remove Component, these just get in the way here because it is following the ship.
7. Set the **Clear Flags** to **Depth Only** and the **Depth** to **0** of the **Main Camera** , since this is just a tracking camera in front of a background (which we will add in a bit)
8. Add a **Directional Light** using **_Create -\> Light -\> Directional Light_** to the scene to light the way.

Here is where you should be up to now. No UI yet, just the beginnings of a scene:

[![3617OS_APP_02](/assets/img/wordpress/2015/01/3617OS_APP_02.png "3617OS\_APP\_02")](/assets/img/wordpress/2015/01/3617OS_APP_02.png)

Next let’s smarten it up a bit with a background skybox and even a trail for the ship:

1. Add a new **Layer** to the project (through the **Layer** Menu in the top–right corner of the inspector for every GameObject) called **Background** (this just helps identify background objects for the background camera). This should be set in **User Layer 8** (but any position in the Layer array will do)

[![3617OS_APP_03](/assets/img/wordpress/2015/01/3617OS_APP_03.png "3617OS\_APP\_03")](/assets/img/wordpress/2015/01/3617OS_APP_03.png)

The Add Layer option in the inspector

1. Add a new **Camera** to the scene (using **_Create -\> Camera_** ) and rename it to **BackgroundCamera**
2. Set the **Depth** for the **BackgroundCamera** to **-1**
3. Set the **Layer** for the **BackgroundCamera** to the new **Background** layer using the Layer combo box shown earlier.
4. Configure the **Culling Mask** of the **BackgroundCamera** to just the **Background** layer by selecting **Nothing** in the drop down selection and then selecting (For an added bonus, also remove the Background layer from the Culling Mask of the Main Camera so it does not render it)

[![3617OS_APP_04](/assets/img/wordpress/2015/01/3617OS_APP_041.png "3617OS\_APP\_04")](/assets/img/wordpress/2015/01/3617OS_APP_041.png)

1. Add a **Skybox** component (Add _ **Component -\> Rendering -\> Skybox** _) to the Background Camera and set the **Custom Skybox** property to one of the skyboxes from the SkyBox Volume 2 folder. You do this by dragging the **DSG.mat**  (the material, not the skybox images) asset to the **Custom Skybox** property of the **Skybox Component.**   I personally went for the **DeepSpaceGreen** Skybox (in the folder of the same name under the **SkyBox Volume 2** folder).
2. Finally add a new **Particle System** as a child of the **BackgroundCamera** (Right-Click on the **BackgroundCamera** and select **Particle System** ) with the following settings (any settings I do not alter are the defaults):
  - Transform
    - Position : X = **83** , Y = **28** , Z = **76**
    - Rotation : X = **10** , Y = **240** , Z = **1.8**
  - Particle System
    - Duration = **20**
    - Start Lifetime = **20**
    - Start Speed = **10**
  - Emission Rate = **5**
  - Shape
    - Shape = **Box**
    - Box X = **50**
    - Box Y = **50**
    - Box Z = **5**
  - Renderer Max Particle Size = **0.005**

The Particle System should now look like the following screenshot:

[![3617OS_APP_05](/assets/img/wordpress/2015/01/3617OS_APP_05.png "3617OS\_APP\_05")](/assets/img/wordpress/2015/01/3617OS_APP_05.png)

All this does is to simply add some flavor to our scene so it is not boring J

> Note: I have found in situations where you want a background and a moving target that you want to follow, it is best to have the background and the target using separate cameras.

After all that our demo scene now looks like the following:

[![3617OS_APP_06](/assets/img/wordpress/2015/01/3617OS_APP_06.png "3617OS\_APP\_06")](/assets/img/wordpress/2015/01/3617OS_APP_06.png)

Lastly, let’s kick our ship in to action and make it at least look like it is moving:

1. Add a **Rigidbody** component (Add **_Component -\> Physics -\> Rigidbody_** ) to the SciFi\_Fighter\_AK5 and uncheck the **Use Gravity** property (it is space, there is no Gravity!)
2. Add two new Empty GameObjects as children to the SciFi\_Fighter\_AK5 ( **right click** the fighter and select Create Empty). Name them **Engine1** and **Engine2**
3. For **Engine1** , set its Transform Position to X **-3.24** , Y **-0.04** , Z **-1.69** ( **Rotation** values should all be **0** and **Scale** values should all be **1** )
4. For **Engine2** , set its Transform Position to X **3.49** , Y **-0.04** , Z **-1.69** ( **Rotation** values should all be **0** and **Scale** values should all be **1** )

> If for some reason this does not place the engine GameObjects in the exhaust ports of the ship, just position them manually in relation to the SciFi Fighter.

1. Select **BOTH** of the Engine’s in the project hierarchy, then in the inspector, click on Add Component and select **_Effects -\> Trail Renderer_**
2. Still with both Engines selected, expand the Materials section of the **Trail Renderer** in the inspector and set the Size to 2
3. Drag the **FlameE** material from the **Standard Assets\Particles\Sources\Materials** folder on to **Element 0** of the **Trail Renderer** Materials
4. Drag the **Smoke Trail** material from the **Standard Assets\Particles\Sources\Materials folder** on to **Element 1** of the **Trail Renderer** Materials
5. Set the Time to **2** , Start width to **5** and End Width to **0.5**

> The Trail render is a great way of adding simple trails to GameObjects, whether it is a light cycle, a car or in this case a space ship.  They float along behind the object as it moves round the scene.

The Trail Render in the inspector should now look like the following screenshot:

[![3617OS_APP_07](/assets/img/wordpress/2015/01/3617OS_APP_07.png "3617OS\_APP\_07")](/assets/img/wordpress/2015/01/3617OS_APP_07.png)

Almost there, one last thing remains. If you run the scene now you wo not see any change, no trails, the ship just sits there and does nothing. Simply put it is doing nothing because we have not told it to do anything, for the trail renderer to work the ship has to move.

For the last touch, create a new C# script called **ShipMove** and replace its contents with the following:

    using UnityEngine; public class ShipMove : MonoBehaviour { void Start () { //Kick the ship in to action with a bit of force. GetComponent\<Rigidbody\>().AddForce(Vector3.forward \* 50, ForceMode.VelocityChange); } }

Now simply attach the script to the **SciFi\_Fighter\_AK5** GameObject and hit play and your fighter will be screaming through the stars on its way to oblivion.

[![3617OS_APP_08](/assets/img/wordpress/2015/01/3617OS_APP_08.png "3617OS\_APP\_08")](/assets/img/wordpress/2015/01/3617OS_APP_08.png)

Our sample scene is complete.

> Note the complete scene is also available as a Unity Package and can be downloaded from here: [http://bit.ly/UIEssentialsCh5DemoScene](http://bit.ly/UIEssentialsCh5DemoScene)

Now return to _ **Chapter 5** _ and start adding some UI to this amazing scene you have created.

* * *


# More to come

In the run up to the book’s publication, I am also going to publish the preview chapter on my blog as well.  FYI It is chapter 1 which walks through the legacy GUI system and gives a highlight overview of the new UI “Awesomesauce” system ![Open-mouthed smile](/assets/img/wordpress/2015/01/wlEmoticon-openmouthedsmile.png)

SO keep your ears peeled and half an eye on the books forum here.

