---
layout: post
title: Windows 8 License Checker / tester / thingy
date: 2012-09-12 14:43:52
tags: [windows 8]
---

There are probably a lot of people I could blame for me writing this article but at the end of the day it's my own damn fault for trying.

It goes like this, [AdDuplex](https://www.adduplex.com/) have an [offer on for Early release apps into the store](http://blog.adduplex.com/2012/07/adduplex-for-windows-8-is-here.html) but I only found out about it after my title was published to the Store, so during my lunch at work I had a go at implementing the new [AdDuplex](https://www.adduplex.com/) Windows 8 control into my app and it was easy as pie (some might say too easy!). Then came the problem of hooking it up to the trial information provided by the Windows 8 API, which is easy enough if you have everything in one project, I don't and so began the tale.

My annoyance is that I should have waited, I knew better and just hoping my boss was not looking over my shoulder to see if I was actually working, but as I like to share I'll throw this out quick before he notices #checksovershoulder

---

## The License Helper Class

Now I only created this because it was taking too long to just throw the MS code in and actually make it work with databinding, so this is fully standalone and works nicely.

Code also available on CodePaste.net - [http://bit.ly/U7zTRU](http://bit.ly/U7zTRU)

```csharp
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Windows.ApplicationModel.Store;

namespace LicenseHelper
{
    public class LicenseChecker : INotifyPropertyChanged
    {
        static LicenseInformation licenseInformation;
        static bool IsTrialTested = false;

        private bool isTrial = false;
        public bool IsTrial
        {
            get
            {
                if (!IsTrialTested)
                {
                    InitializeLicense();
                }
                return isTrial;
            }
            set
            {
                if (isTrial != value)
                {
                    isTrial = value;
                }
                NotifyPropertyChanged("IsTrial");

            }
        }

        public void InitializeLicense()
        {
            // Initialize the license info for use in the app that is uploaded to the Store.
            // uncomment for release
            licenseInformation = CurrentApp.LicenseInformation;

            // Initialize the license info for testing.
            // comment the next line for release
            //licenseInformation = CurrentAppSimulator.LicenseInformation;
            // Register for the license state change event.
            licenseInformation.LicenseChanged += new LicenseChangedEventHandler(LicenseChangedEventHandler);

            IsTrial = licenseInformation.IsTrial;
        }

        public static void TestTrialPurchase()
        {
            CurrentAppSimulator.RequestAppPurchaseAsync(false);
        }

        public void LicenseChangedEventHandler()
        {
            ReloadLicense(); // code is in next steps
        }

        public void ReloadLicense()
        {
            if (licenseInformation.IsActive)
            {
                IsTrial = licenseInformation.IsTrial;
            }
            else
            {
                IsTrial = true;// A license is inactive only when there's an error.
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        // This method is called by the Set accessor of each property.
        // The CallerMemberName attribute that is applied to the optional propertyName
        // parameter causes the property name of the caller to be substituted as an argument.
        private void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    }
}
```

---

## How to Use

There are two options (not exclusive) to using this helper, either create a public property in your App Class and expose it from there (not detailing here as it's your code!)

Or

You can use it completely through databinding, for instance I'm using it to control the visibility of the [AdDuplex](https://www.adduplex.com/) Ad control.

First create a resource entry in your App.XAML, to do this add the namespace for the helper (which is why this helper has its own namespace)

```xml
xmlns:license="using:LicenseHelper"
```

And then add the resource entry to the Application.Resources / Resource Dictionary

```xml
<license:LicenseChecker x:Key="License"/>
```

With that done go to the XAML page you intend to use the license information from and add a boolean to visibility converter, I'm using the one provided by the Win 8 boilerplate code but you could always use your own, so add the following line to the page.resources:

```xml
<common:BooleanToVisibilityConverter x:Key="BooleanToVisibilityConverter"/>
```

And then apply it to the intended control as follows:

```csharp
<adduplex:AdControl HorizontalAlignment="Right"
                            Height="90"
                            VerticalAlignment="Top"
                            Width="728"
                            Grid.ColumnSpan="3"
                            AppId="<Your own AD ID>"
                            Size="728x90"
                            Visibility="{Binding IsTrial,
                                            Source={StaticResource License},
                                            Converter={StaticResource BooleanToVisibilityConverter}}" />
```

I find it good practice to make the Ad Control the last thing in the visual tree so it is always on top :D (if you are also using this for [AdDuplex](https://www.adduplex.com/) then be sure to add the correct namespace for the [AdDuplex](https://www.adduplex.com/) control)

And that's it. What's basically happening is that when you load the page it tests the Trial State and updates the flag accordingly, if the Trial state changes (by purchasing it) the local flag changes and the visibility is then updated in the control.

What I like about this second part is that to put it in any app is even less effort than before but as stated it's not exclusive so you can use it from code as well for testing the Trial state.

---

## Testing

If you also want to test the Trial state you can, there's an additional little method you can call at any time that will simulate a purchase, just call:

```csharp
LicenseHelper.LicenseChecker.TestTrialPurchase();
```

And POW the test purchase prompt will popup and you can simulate purchasing and the resultant effect.

And now back to work, for sure this time
