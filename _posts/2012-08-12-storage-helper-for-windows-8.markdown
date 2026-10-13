---
layout: post
title: Storage Helper for Windows 8
date: '2012-08-12 09:13:14'
tags: [windows 8]
---

**\*Note updated after a few bugfixes from use, mainly added some additional features and changed to allow for multiple folders to be used**

One of the biggest helpers back in the good old land of Windows Phone was a little helper class to help with the messy work of saving game data and loading it back again, you always ended up writing several bits of code for each thing you wanted to save and it took a bit of effort.

Then along came the "Isolated Storage Helper" (apologies, could not find the original source for it), a nifty little class that through the power of generics worked for just about any type of class and did all the grunt work for you, it looked like this:

```csharp
public static class IsolatedStorageHelper
{
    public static bool SaveData(string path, object data)
    {
        try
        {
            var _Store = IsolatedStorageFile.GetUserStoreForApplication();
            using (var _Stream
                = new IsolatedStorageFileStream(path, FileMode.Create, _Store))
            {
                var _Serializer = new XmlSerializer(data.GetType());
                _Serializer.Serialize(_Stream, data);
            }
            return true;
        }
        catch
        {
            return false;
        }

    }

    public static object LoadData(string path,System.Type type )
    {
        var _Store = IsolatedStorageFile.GetUserStoreForApplication();
        if (!_Store.FileExists(path))
            return null;
        using (var _Stream
            = new IsolatedStorageFileStream(path, FileMode.Open, _Store))
        {
            var _Serializer = new XmlSerializer(type);
            try
            {
                return _Serializer.Deserialize(_Stream);
            }
            catch { return null; }
        }
    }

    public static object LoadLocalData(string path, System.Type type)
    {
        var _Store = App.GetResourceStream(new Uri(path,UriKind.Relative));
        using (var _Stream
            = new StreamReader(_Store.Stream))
        {
            var _Serializer = new XmlSerializer(type);
            try
            {
                return _Serializer.Deserialize(_Stream);
            }
            catch { return null; }
        }
    }

}
```

---

## The Journey

Now with Windows 8 we no longer have Isolated storage (maybe with WP8 but we will have to wait and see) we have lots of competing functions for accessing storage on the Windows 8 machine (whether it's ARM or x86).

[:)](http://bit.ly/QST6J1)

So my journey started with a great run down of the Windows 8 storage system by [Jerry Nixon](http://bit.ly/QST6J1), he deftly walks through the options and how to correctly access storage, however it's only the beginning, to make the transition we are going to need more.

### MSDN Library

Next I wandered through the MSDN Library which at present is still a bit of a mess in places, especially where .NET 4.5 meets WinRT. XML serialisation is one of those places, the documentation is confusing at best, does not include any async references and a lot of the sample code doesn't even work. That being said it's still pre-release code so there is time for it to be tidied up.

[![Avatar of the official Windows SDK sample on the MSDN code samples site](https://web.archive.org/web/20160908232929im_/http://i1.social.s-msft.com/profile/u/avatar.jpg?displayname=official+windows+sdk+sample&size=extralarge&version=d5a3240d-e3ea-4dc5-9361-49467af5997f)](http://bit.ly/QSTuqR)

Finally after a bit of a headslap moment and a trawl through the [MSDN WinRT code samples](http://bit.ly/QSTuqR) I literally stumbled on the final piece of the puzzle. If you start a new project using one of the templates or add a constructed WinRT (not saying Metro :D) project item like the Group or Item pages, then you will also inherit a lot of boiler plate code in your project in a new "Common" folder. One of these is the SuspensionManager, this handy little class does the work of storing application state variables (in Windows Phone this was handled by the framework).

---

## The End result

So finally I came up with the class below:

```csharp
public static class Win8StorageHelper
using System;
using System.IO;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Windows.Storage;
using Windows.Storage.Streams;

public static class Win8StorageHelper
{
 public static StorageFolder defaultFolder = Windows.Storage.ApplicationData.Current.RoamingFolder;

public async static Task<bool> SaveData(string path, object data)
 {
 return await SaveData(path, defaultFolder, data);
 }

public async static Task<bool> SaveData(string path, StorageFolder folder, object data)
 {
 // settings
 var option = Windows.Storage.CreationCollisionOption.ReplaceExisting;

try
 {
 var file = await folder.CreateFileAsync(path, option);
 MemoryStream saveData = new MemoryStream();

XmlSerializer x = new XmlSerializer(data.GetType());
 x.Serialize(saveData, data);

if (saveData.Length > 0)
 {

// Get an output stream for the SessionState file and write the state asynchronously
 using (var fileStream = await file.OpenStreamForWriteAsync())
 {
 saveData.Seek(0, SeekOrigin.Begin);
 await saveData.CopyToAsync(fileStream);
 await fileStream.FlushAsync();
 }
 return true;
 }
 }
 catch { }

return false;
 }

public async static Task<object> LoadData(string path, System.Type type)
 {
 return await LoadData(path, defaultFolder, type);
 }

public async static Task<object> LoadData(string path, StorageFolder folder, System.Type type)
 {
 try
 {
 var file = await folder.GetFileAsync(path);

using (IInputStream inStream = await file.OpenSequentialReadAsync())
 {
 // Deserialize the Session State
 XmlSerializer x = new XmlSerializer(type);
 return x.Deserialize(inStream.AsStreamForRead());
 }
 }
 catch { return null; }
 }

public async static void DeleteFile(StorageFolder folder, string filename)
 {
 var file = await folder.GetFileAsync(filename);
 await file.DeleteAsync();
 }

public static void SafeDeleteFile(StorageFolder folder, string filename)
 {
 try
 {
 DeleteFile(folder, filename);
 }
 catch (Exception ex)
 {
 }
 }
}
```

So fairly straight forward, the save functions exist (although now async) with an overload for each to also pass a folder on saving (obviously is you are saving to multiple locations then just use the overloads) but the default is the roaming folder since you'll want players to have access to game/app save data on multiple machines (thank goodness for Win 8 syncing).

To call the class simply save thus:

"SaveData(\<filename inc path>, \<object to save>)"

```csharp
await Win8StorageHelper.SaveData("CurrentPlayers.dat", Players);
```

And to load it back:

"LoadData(\<filename inc path>, \<expected return object type>)"

```csharp
var players = await Win8StorageHelper.LoadData("CurrentPlayers.dat", typeof(ObservableCollection<PlayerModel>));
Players = (ObservableCollection<PlayerModel>)players;
```

Note you do need to do the Load in two passes, you can do it in one call but it just works better and reads better in two.

### Code can be downloaded from here: [http://codepaste.net/wrmtgo](http://codepaste.net/wrmtgo)

### \*Note

**This article is based on the RC codebase, I'll check and update it for the RTM when it's available**

---

## Final Thoughts

Well I'm back to the dev process, I'm currently upgrading my WP7 project "Flipped" to Windows 8. I've managed to re-use 90% of my backend game logic with just a few corrections (due to some UI converged bits I was either too lazy to avoid or just couldn't think of an elegant solution around) plus loosing the Telerik stack for the first release is a pain.

I've managed to write this whole article on Windows Live Writer 2012 and it's the same smooth process on Windows 8, granted had to search for my plugins again but they did all work. I do hope WLW isn't deprecated it's by far the most useful app in the Essentials package, next to Movie maker :D.

As a side note be sure to check out the [WinRT XAML Toolkit](http://bit.ly/QSWtiY) it's chock full of controls, extensions and helpers, almost everything you'll need in your WinRT projects.

Also for an alternative to this solution there is also the "[metrostoragehelper](http://metrostoragehelper.codeplex.com/)" on codeplex by Jamie Thomson, it's certainly another way to do it :D.
