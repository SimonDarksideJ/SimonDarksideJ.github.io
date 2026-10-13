---
layout: post
title: Just where did I put that storyboard
date: 2012-09-09 23:06:28
tags: [mvvm, windows phone]
---

One of the cardinal sins ousted round the MVVM circles involves putting any kind of code in your XAML pages code behind, which is all well and good until you actually need to. When you've implemented MVVM there are always cases where the line gets blurred between functionality and UI behaviour.

\[/rant\]

One of these tricky situations revolves around the use of storyboards. Storyboards and animations are purely UI animations and snazzy effects, but what happens when it's your ViewModel wants to make something happen, like "it's game over" or just "you suck" :D, here it gets very tricky.

Now the way most people would to it is to either hook up an event in the code behind or wire in the ViewModel to the view to check for a situation that would cause the storyboard to fire, but there is a better way.

The best way I've found is to implement a dependency manager (a middle man) where the XAML storyboards can be registered to and the ViewModel code knows where to go looking, all without either knowing the other is there.

---

## The Windows Phone way

I discovered this practice while doing one of my projects, the manager code goes like this:

You can also find this snippet here - [http://bit.ly/PfWqxy](http://bit.ly/PfWqxy)

```csharp
using System;
using System.Windows;
using System.Windows.Media.Animation;
using System.Collections.Generic;

namespace FlippedGameLibrary.Helpers
{
    public class StoryboardManager
    {
        public static DependencyProperty IDProperty =
            DependencyProperty.RegisterAttached("ID", typeof(string), typeof(StoryboardManager),
                    new PropertyMetadata(null, IDChanged));
        static Dictionary<string, Storyboard> _storyboards = new Dictionary<string, Storyboard>();

        private static void IDChanged(DependencyObject obj, DependencyPropertyChangedEventArgs e)
        {
            Storyboard sb = obj as Storyboard;
            if (sb == null)
                return;

            string key = e.NewValue as string;
            if (_storyboards.ContainsKey(key))
                _storyboards[key] = sb;
            else
                _storyboards.Add(key, sb);
        }

        public static void PlayStoryboard(string id, Callback callback, object state)
        {
            if (!_storyboards.ContainsKey(id))
            {
                callback(state);
                return;
            }
            Storyboard sb = _storyboards[id];
            EventHandler handler = null;
            handler = delegate { sb.Completed -= handler; callback(state); };
            sb.Completed += handler;
            sb.Begin();
        }

        public static void SetID(DependencyObject obj, string id)
        {
            obj.SetValue(IDProperty, id);
        }

        public static string GetID(DependencyObject obj)
        {
            return obj.GetValue(IDProperty) as string;
        }
    }
    public delegate void Callback(object state);
}
```

Fairly simple implementation based on IOC principles focused for Storyboards. I also did a version of this just for dependency objects, if you want it just shout, just a sneaky way to expose UI elements directly to other needy parties.

It's use is also very simple, just add the following property to any storyboard you want to register like this:

```xml
<Storyboard x:Name="LevelUpStoryBoard" GameHelpers:StoryboardManager.ID="LevelUpStoryBoard">
```

Just ensure you add a namespace to your XAML to where you have added the Storyboard manager, in this case I called mine "GameHelpers".

Then anywhere in your MVVM code (or anywhere else for that matter) when you want to play the animation just call:

```csharp
StoryboardManager.PlayStoryboard("<StoryboardName>", (o) => { }, null);
```

You'll also notice there is even a delegate callback for when the storyboard is finished if you need something else to happen. You don't even need to worry if the storyboard exists or is on a page in view, it's all handled nicely.

## The Windows 8 Version

Now Windows 8 being Windows 8 things are a little different but not too different, here's the same functionality updated for Windows 8:

You can also find this snippet here - [http://bit.ly/PfXn98](http://bit.ly/PfXn98)

```csharp
using System;
using System.Collections.Generic;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Media.Animation;

namespace FlippedGameLibrary.Helpers
{
    public class StoryboardManager
    {
        public static DependencyProperty IDProperty =
            DependencyProperty.RegisterAttached("ID", typeof(string), typeof(StoryboardManager),
                    new PropertyMetadata(null, IDChanged));
        static Dictionary<string, Storyboard> _storyboards = new Dictionary<string, Storyboard>();

        private static void IDChanged(DependencyObject obj, DependencyPropertyChangedEventArgs e)
        {
            Storyboard sb = obj as Storyboard;
            if (sb == null)
                return;

            string key = e.NewValue as string;
            if (_storyboards.ContainsKey(key))
                _storyboards[key] = sb;
            else
                _storyboards.Add(key, sb);
        }

        public static void PlayStoryboard(string id, Callback callback, object state)
        {
            if (!_storyboards.ContainsKey(id))
            {
                callback(state);
                return;
            }
            Storyboard sb = _storyboards[id];
            EventHandler<object> handler = null;
            handler = delegate { sb.Completed -= handler; callback(state); };
            sb.Completed += handler;
            sb.Begin();
        }

        public static void SetID(DependencyObject obj, string id)
        {
            obj.SetValue(IDProperty, id);
        }

        public static string GetID(DependencyObject obj)
        {
            return obj.GetValue(IDProperty) as string;
        }
    }
    public delegate void Callback(object state);
}
```

Thankfully the XAML implementation is exactly the same, just declare the namespace to the class and add the property to the storyboard.

The code side is also the same.

---

## Almost there, don't forget the threading!

Now in both cases if you call this from another thread be sure to use the appropriate dispatcher to marshal it back to the main UI thread. else it will crash with a thread violation.

My advice would be to try and avoid this situation if you can as it is a real pain to try and handle.

---

Right on with more articles
