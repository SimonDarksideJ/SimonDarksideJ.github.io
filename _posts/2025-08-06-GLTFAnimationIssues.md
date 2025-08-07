---
layout: post
title: Solving GLTF Animation Issues in Unity AR Applications
date: 2025-08-06 00:00 +0000
description: The woes of using Animated content in connected solutions
img: posts/20250806/title.gif
category: XR
tags:
- xr
- ar
- unity3d
author: Simon Jackson
mathjax: false
---

> TL; DR -> Unity has its ways, and not all are obvious or easy to overcome, one such issue is with 3D model animations.  In short, although animations will play automatically, other times they just do not and it is very unclear why. In this solution, we FORCE animations to run, trusting not our fate to the Unity gods whims.
 
> Full disclosure, for once, this post was written supported by AI (Claude Sonnet 4 in this case), as it was the AI's intensified work that ended up finding the final solution, so it deserves some credit too.  Although as a rule, I generally only write myself, with the occasional help of a spell/grammar checker :D

## The Problem: Inconsistent Animation Playback

In the Unity AR application I am building with work, I encountered a puzzling issue where 3D models with embedded animations behaved differently depending on how they were loaded:

- **TapToPlace Models**: Animations played correctly when users placed models via touch interactions
- **API-Loaded Models**: Animations remained static when models were loaded programmatically via API calls

This inconsistency created a confusing user experience where identical GLTF files would animate in one scenario but not in another.

## Technical Background

The project, whilst having its own complexity, is built using SOLID and DRY methodologies, each component or service has a single responsibility for any task, instantiating content, loading from an API or performing actions, the only true differences are in the weaving of these components together, such as the User or API driven approaches above.  So the situation with 3D models just "behaving differently" was truly baffling.

### GLTF and GLTFast Library

The application uses Unity's [GLTFast](https://github.com/atteneder/glTFast) library to load GLTF 2.0 files.

The GLTF/GLB (Graphics Language Transmission Format) standard is a modern 3D file format that supports:

- Geometry and materials
- Embedded animations
- Scene hierarchies
- Textures and lighting

### The Loading Infrastructure

The GLTF loading pipeline consists of:

1. **BinaryContentHandler**: Manages GLTF/glb binary file loading
2. **PlacementService**: Handles content placement and positioning
3. **GLTFast Integration**: Uses `GltfImport.Load()` and `InstantiateMainSceneAsync()`

## Initial Investigation and False Leads

After extensive debugging, we discovered the issue was **not** related to:

- ❌ Threading problems (initially suspected)
- ❌ Timing delays
- ❌ Main thread synchronization

All the normal suspects simply proved false, exploring various timing and threading solutions because the symptoms suggested async operation issues. However, these approaches proved unsuccessful because they were solving the wrong problem.

### What We (AI and I) Tried (That Did not Work)

```csharp
// Attempted timing delays
await Task.Delay(100);

// Tried explicit main thread execution
await UnityMainThreadTaskScheduler.Factory.StartNew(() => {
    // Animation activation code
});

```

These solutions failed because they addressed symptoms rather than the root cause.

## The Root Cause Discovery

The breakthrough came when we realized that **GLTFast creates animation components but does not automatically activate them**. The difference between TapToPlace and API loading was not timing or threading—it was the presence of automatic triggers:

- **TapToPlace**: User interactions naturally triggered animation events through on-screen interactions (a Main UI interaction)
- **API Loading**: No external triggers existed to start animations

### Why This Happens

When GLTFast instantiates a GLTF model, it correctly creates all necessary animation components:

- Animation components with clips
- PlayableDirector components with timelines  
- Animator components with controllers

However, **it does not automatically start playing these animations**. The animations exist but remain in a paused/inactive state waiting for explicit activation.

## The Solution: Automatic Animation Activation

To solve this, we implementing automatic animation activation immediately after GLTF instantiation in the `ContentHandler` (A component used to spawn 3D content programmatically):

```csharp
public async Task<GameObject> DisplayContent(/* parameters */)
{
    // ... existing GLTF loading code ...
    
    var targetGameObject = await gltfImport.InstantiateMainSceneAsync(transform);
    
    // 🎯 KEY ADDITION: Activate all animations after instantiation
    ActivateGLTFAnimations(targetGameObject);
    
    return targetGameObject;
}

private void ActivateGLTFAnimations(GameObject gltfModel)
{
    if (gltfModel == null)
    {
        Debug.LogWarning("Cannot activate animations: GLTF model is null");
        return;
    }

    Debug.Log($"Activating animations for GLTF model: {gltfModel.name}");

    // Handle Legacy Animation components
    var animations = gltfModel.GetComponentsInChildren<Animation>();
    foreach (var anim in animations)
    {
        if (anim.clip != null)
        {
            Debug.Log($"Starting Animation component with clip: {anim.clip.name}");
            anim.Play();
        }
    }

    // Handle PlayableDirector components (Timeline animations)
    var directors = gltfModel.GetComponentsInChildren<PlayableDirector>();
    foreach (var director in directors)
    {
        if (director.playableAsset != null)
        {
            Debug.Log($"Starting PlayableDirector with asset: {director.playableAsset.name}");
            director.Play();
        }
    }

    // Handle Animator components
    var animators = gltfModel.GetComponentsInChildren<Animator>();
    foreach (var animator in animators)
    {
        if (animator.runtimeAnimatorController != null)
        {
            Debug.Log($"Starting Animator with controller: {animator.runtimeAnimatorController.name}");
            animator.enabled = true;
            // Animator typically starts automatically when enabled with a valid controller
        }
    }
}
```

## Why This Solution Works

In breaking down the solution, it implements a "belts and braces" approach, ensuring no matter what kind of animation system is used by Unity, we just try and start any we find.

### Universal Coverage

1. **Legacy Animation Components**: Uses `.Play()` to start animation clips
2. **PlayableDirector Components**: Activates Timeline-based animations with `.Play()`
3. **Animator Components**: Ensures animators are enabled and running

### Safe Implementation

- Only activates animations that have valid assets/clips
- Includes comprehensive null checking
- Provides debug logging for troubleshooting
- Non-destructive (does not break existing functionality)

### Zero Breaking Changes

- Maintains all existing functionality
- Only adds animation activation where none existed
- Compatible with both TapToPlace and API loading scenarios

## Technical Insights

As we delve into what makes the solution work, we simply "do not trust" Unity to do the work for us, as we would normally expect.

### GLTF Animation Lifecycle

Understanding the GLTF animation lifecycle is crucial:

1. **Import**: GLTFast reads animation data from GLTF file
2. **Component Creation**: Unity animation components are created
3. **Instantiation**: Game objects are placed in scene
4. **⚠️ Manual Activation Required**: Animations wait for explicit start command

### Common Gotcha

Many developers assume that because GLTF files contain animation data, they will automatically play when instantiated. This is **not true** in Unity with GLTFast. The animations are imported and ready, but require explicit activation.

This behavior is actually correct from a design perspective—it gives developers control over when animations start rather than having them auto-play unexpectedly.

## Implementation Best Practices

The basic take away is to never assume Unity is going to do a job for you, do it yourself regardless.  Even though Unity will help you in some scenarios, it will by happenstance, just forget to in the next scenario.

### 1. Always Activate Animations Explicitly

```csharp
// After any GLTF instantiation
var gameObject = await gltfImport.InstantiateMainSceneAsync(transform);
ActivateGLTFAnimations(gameObject); // Essential step
```

### 2. Handle Multiple Animation Types

Modern GLTF files may use different animation systems:

- Legacy Animation components
- Timeline-based PlayableDirector components  
- Animator components with controllers

### 3. Include Debug Logging

Animation issues can be subtle. Debug logging helps identify which components exist and whether they're being activated.

### 4. Test Both Loading Paths

Always test animations in:

- User-initiated loading (TapToPlace)
- Programmatic loading (API calls)
- Any other loading scenarios in your application

## Verification and Testing

After implementing this solution:

1. ✅ **API-loaded models now animate correctly**
2. ✅ **TapToPlace models continue working as before**
3. ✅ **Consistent behavior across all loading scenarios**
4. ✅ **No performance impact or breaking changes**

## Conclusion

This issue highlighted the importance of understanding the complete lifecycle of third-party library components. While GLTFast correctly imports and creates animation components, it doesn't automatically activate them—requiring developers to explicitly trigger animation playback.

The solution is simple but essential: **always activate GLTF animations immediately after instantiation**. This ensures consistent animation behavior regardless of how the model was loaded.

### Key Takeaways

- GLTF animation components are created but not automatically started
- Different loading paths may have different natural triggers
- Explicit activation ensures consistent behavior
- Debug logging is invaluable for animation troubleshooting
- Always test all loading scenarios in your application

This fix resolved our animation inconsistency and provides a reliable foundation for GLTF animation playback in Unity AR applications.

> I would like to thank my AI Overlords for their assistance in this matter, and offer them this attribution in the generation of this post 😂
>
> Now the real challenge is to figure out who wrote what, but I am not telling, it may upset my future AI Master.

Laters, and I hope you found this educational.
