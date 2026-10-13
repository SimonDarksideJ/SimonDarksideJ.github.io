---
layout: post
title: How to market yourself with your windows 8 app quickly
date: 2012-09-12 11:03:47
tags: [windows 8]
---

**\*Note**, a minor update in the wake of recent Windows Store experiences, added an option for a privacy policy.  I highly **recommend adding one even you don't think you need one, Just in case :D**

**\*UPDATE!! - Do NOT use the marketplace search option in the helper as the Store has deemed this violates Cert 1.2, advertising in the settings charm.  This is a ludicrous violation that we cannot link to the Microsoft Store from here as it makes no sense, this was allowed on the Phone platform but not here.  Should still be Ok to use this from within your about page so long as it's not a charm or fly=out!**

Also it seems the default "Settings" charm also includes a "Rate and Review" option so you may choose to not enable this option, just don't set the AppPackageName varable.

* * *

This article was inspired by a prominent Silverlight MVP and evangelist [Kunal Chowdhury](http://bit.ly/SDtMd0) who wrote a nice little post on how to market your WP app better - [http://bit.ly/SDtMd0](http://bit.ly/SDtMd0)

So seeing this I couldn't help to quickly morph his article to fit Windows 8, what becomes obvious as you compare the two is that there are so many things that are just basically easier with Windows Phone, hopefully the Windows 8 API will mature more over the coming months. (will be even more interesting when the WP8 SDK is revealed if they have stayed true to their roots or move to a more Win 8 route # shudder)

So here's the actual helper class:

> Or download here from CodePaste.NET - [http://bit.ly/OfOgkG](http://bit.ly/OfOgkG)

```csharp
using System;
using System.Reflection;
using System.Text;
using Windows.ApplicationModel.DataTransfer;
using Windows.Foundation;
using Windows.UI.ApplicationSettings;
using Windows.UI.Xaml;

public static class ApplicationHelper
{
    private static TypedEventHandler handler;

    static string appPackageID;
    static string friendlyName;
    static string twitterHandle;
    static string facebookProfileID;
    static string marketplaceSearchTerm;
    static string privacyURL;

    public static void Init(string AppPackageID = "", string FriendlyName = "", string TwitterHandle = "", string FacebookProfileID = "", string MarketplaceSearchTerm = "", string PrivacyURL = "")
    {
        appPackageID = AppPackageID;
        friendlyName = FriendlyName;
        twitterHandle = TwitterHandle;
        facebookProfileID = FacebookProfileID;
        marketplaceSearchTerm = MarketplaceSearchTerm;
        privacyURL = PrivacyURL;
    }

    public static string GetApplicationVersion()
    {
        if (Windows.ApplicationModel.DesignMode.DesignModeEnabled)
        {
            return "version x.x.x.x";
        }

        Assembly assembly = typeof(Application).GetTypeInfo().Assembly;
        var name = new AssemblyName(assembly.FullName);
        return name.Version.ToString(4);
    }

    public async static void ReviewApplication()
    {
        await Windows.System.Launcher.LaunchUriAsync(
               new Uri("ms-windows-store:REVIEW?PFN=" + appPackageID));
    }

    public async static void SearchMoreApps(string searchTerm)
    {
       await Windows.System.Launcher.LaunchUriAsync(
       new Uri("ms-windows-store:Search?query=" + searchTerm));
    }

    public async static void ViewWebsite(string websiteUrl)
    {
        await Windows.System.Launcher.LaunchUriAsync(
               new Uri(websiteUrl));
    }

    public async static void ConnectInTwitter(string twitterHandle)
    {
        await Windows.System.Launcher.LaunchUriAsync(
               new Uri(string.Format("http://twitter.com/{0}",
                        twitterHandle)));
    }

    public async static void ConnectInFacebook(string facebookProfileID)
    {
        await Windows.System.Launcher.LaunchUriAsync(
               new Uri(string.Format("http://facebook.com/{0}",
                        facebookProfileID)));
    }

    public async static void ViewPrivacyPolicy(string privacyURLAddress)
    {
        await Windows.System.Launcher.LaunchUriAsync(
               new Uri(privacyURLAddress));
    }

    public static void SupportQuestion(string toAddress, string subject, string body = null)
    {
        // Register handler for DataRequested events for sharing
        if (handler != null)
            DataTransferManager.GetForCurrentView().DataRequested -= handler;

        handler = new TypedEventHandler((sender,args) =>
        {
            var request = args.Request;
            request.Data.Properties.Title = subject;
            request.Data.Properties.Description = "Send feedback to " + toAddress;

            // Share recipe text
            StringBuilder builder = new StringBuilder();
            builder.Append("Please send feedback to:\r\n");
            builder.Append(toAddress);
            builder.AppendLine();

            builder.Append("--------------------------------------\r\n");
            builder.Append(body);

            request.Data.SetText(builder.ToString());

            DataTransferManager.GetForCurrentView().DataRequested -= handler;
        });
        DataTransferManager.GetForCurrentView().DataRequested += handler;

        DataTransferManager.ShowShareUI();
    }

    public static void AddCommands(SettingsPane sender, SettingsPaneCommandsRequestedEventArgs args)
    {
        if (!string.IsNullOrEmpty(appPackageID))
        {
            SettingsCommand rateReviewCmd = new SettingsCommand("ratereview", "rate and review", (x) =>
            {
                ReviewApplication();
            });
            args.Request.ApplicationCommands.Add(rateReviewCmd);
        }

        if (!string.IsNullOrEmpty(twitterHandle))
        {

            SettingsCommand viewTwitterCmd = new SettingsCommand("twitter", string.Format("See {0} on twitter",string.IsNullOrEmpty(friendlyName) ? twitterHandle : friendlyName), (x) =>
            {
                ConnectInTwitter(twitterHandle);
            });
            args.Request.ApplicationCommands.Add(viewTwitterCmd);
        }

        if (!string.IsNullOrEmpty(facebookProfileID))
        {
            SettingsCommand viewFacebookCmd = new SettingsCommand("facebook", string.Format("See {0} on facebook", string.IsNullOrEmpty(friendlyName) ? facebookProfileID : friendlyName), (x) =>
            {
                ConnectInFacebook(facebookProfileID);
            });
            args.Request.ApplicationCommands.Add(viewFacebookCmd);
        }

        if (!string.IsNullOrEmpty(privacyURL))
        {
            SettingsCommand viewPricacyCmd = new SettingsCommand("privacy", "View privacy policy", (x) =>
            {
                ViewPrivacyPolicy(privacyURL);
            });
            args.Request.ApplicationCommands.Add(viewPricacyCmd);
        }
    }
}
```

Now implementing this yourself should be no different to Windows Phone, so call the methods how you want from your app.

But if you also want these options to appear in your "settings" pane there is an extra function at the end of the class, which to implement you'll need to:

- Call the Init() function in your App Constructor

```csharp
ApplicationHelper.Init(AppPackageID:"",FriendlyName:"",TwitterHandle: "",FacebookProfileID: "",MarketplaceSearchTerm: "",PrivacyURL: "");
```

All settings apart from the App Package name are optional and it won't add a settings command for the options you don't choose,  To get your App Package name see this article (where I got the idea from :D) - [http://bit.ly/SDFB2Z](http://bit.ly/SDFB2Z)

- Setup the "Settings" pane if you haven't already

See the MSDN docs if you haven't got it implemented yet - [http://bit.ly/SDFJ2n](http://bit.ly/SDFJ2n)

- Call the AddCommands() function from inside your Settings event handler

Just add the following into your settings CommandsRequested handler

```csharp
//Add Application Helper Commands
ApplicationHelper.AddCommands(sender,args);
```

* * *

## And that's it

Special thanks to Kunal (for the basic idea) and to Rudi Grobler for his Marketplace rate article - [http://bit.ly/SDFB2Z](http://bit.ly/SDFB2Z)
