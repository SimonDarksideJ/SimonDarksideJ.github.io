---
layout: post
title: Further Adventures in Unhandled Exception Handling for Win8
date: 2012-09-09 22:46:07
tags: [windows 8]
---

Following the submission of my first Windows 8 app into the preview store I'm planning on a few quick posts on my experiences and helpful stuff I found/created during my journey.

To kick off (well I say Kick off, but I've already posted two of them while I was building the game) this article with extend on an original article I did for XNA / Windows phone

## [Adventures in Unhandled Exception Handling for XNA/Silverlight](/adventures-in-unhandled-exception-handling-for-xnasilverlight.html)

Now when I was just about ready to publish to the store and going through the App Excellence labs, one of the certification criteria is to have friendly error handling, with XNA and Windows Phone this is (practically) built in or if you use the excellent Telerik controls you have a very clean component to just drop in.

With Windows 8 there's nothing ready, you have to build it all yourself.

---

## Enter my Windows 8 version of Little Watson

Find the code here - [http://bit.ly/PfUANd](http://bit.ly/PfUANd)

If you followed my last article on the subject I used a component I found in my travels called "Little Watson" which does all of the grunt work for you, however it won't work in its current state for Windows 8

To get it working we need several underlying things:

- A way to store the error details to track them, no Isolated storage here
- A way to allow the user to email the error report
- The place in the code to hook on to and handle unhandled exceptions cleanly

Now the first I have through my Win 8 Storage helper I blogged about recently (which I ended up updating and adding some new features), check it out here - [http://darkgenesis.zenithmoon.com/storage-helper-for-windows-8/](/storage-helper-for-windows-8.html)

For the last, the "Application" component of a Windows 8 app does have an "UnHandledException" error handler but unlike Windows Phone it's not setup by default (very odd but shows how different teams think in building this stuff), so all you do is set it up manually.

As for the email, that provided it's own challenge as THERE IS NO EMAIL API, what we have in the Windows 8 world are "Share Contracts", you can use the "Protocol detection" and open a link using the "mail://" prefix but that doesn't let you add your own data. So this one did cause some head scratching but it's in there.

---

The Win8 Little Watson

So here's the code for the component (what your really here for)

```cpp
using System;
using System.Text;
using Windows.ApplicationModel.DataTransfer;
using Windows.Foundation;
using Windows.Storage;
using Windows.UI.Popups;
using Windows.UI.Xaml;

public static class LittleWatson
{

    public static StorageFolder folder = Windows.Storage.ApplicationData.Current.TemporaryFolder;
    const string Filename = "LittleWatson.txt";
    const string EmailTarget = "<Support Email Address>";

    private static TypedEventHandler<DataTransferManager, DataRequestedEventArgs> handler;
    private static ErrorMessageInfo errormessage;

    public static void ReportException(UnhandledExceptionEventArgs ex, string extra)
    {
        try
        {

            errormessage = new ErrorMessageInfo()
            {
                Usermessage = extra,
                Info = ex.Message,
                Exception = ex.Exception.Message,
                ExceptionDetail = ex.Exception.StackTrace
            };
            Win8StorageHelper.SaveData(Filename, folder, errormessage);
        }
        catch (Exception)
        {
        }
    }

    public async static void CheckForPreviousException()
    {
        try
        {
            errormessage = null;
            errormessage = (ErrorMessageInfo)await Win8StorageHelper.LoadData(Filename, folder, typeof(ErrorMessageInfo));
            if (errormessage != null)
            {
                ShowErrorMessageDialog();
            }
        }
        catch (Exception)
        {
        }
        finally
        {
            if (errormessage != null)
            {
                Win8StorageHelper.SafeDeleteFile(folder, Filename);
            }
        }
    }

    private static async void ShowErrorMessageDialog()
    {
        // Register handler for DataRequested events for sharing
        if (handler != null)
            DataTransferManager.GetForCurrentView().DataRequested -= handler;

        handler = new TypedEventHandler<DataTransferManager, DataRequestedEventArgs>(OnDataRequested);
        DataTransferManager.GetForCurrentView().DataRequested += handler;

        // Create the message dialog and set its content
        var messageDialog = new MessageDialog("An error occured last time Flipped was run, do you want to help us out and send the error to us?");

        // Add commands and set their callbacks; both buttons use the same callback function instead of inline event handlers
        messageDialog.Commands.Add(new UICommand(
            "Share Error",
            new UICommandInvokedHandler(LittleWatson.CommandInvokedHandler)));
        messageDialog.Commands.Add(new UICommand(
            "Cancel",
            new UICommandInvokedHandler(LittleWatson.CommandInvokedHandler)));

        // Set the command that will be invoked by default
        messageDialog.DefaultCommandIndex = 0;

        // Set the command to be invoked when escape is pressed
        messageDialog.CancelCommandIndex = 1;

        // Show the message dialog
        await messageDialog.ShowAsync();
    }

    private static void CommandInvokedHandler(IUICommand command)
    {
        if (command.Label=="Cancel")
        {
            DataTransferManager.GetForCurrentView().DataRequested -= handler;
        }
        else
        {
            DataTransferManager.ShowShareUI();
        }
    }

    private static void OnDataRequested(DataTransferManager sender, DataRequestedEventArgs args)
    {
        var request = args.Request;
        request.Data.Properties.Title = errormessage.Usermessage;
        request.Data.Properties.Description = errormessage.Info;

        // Share recipe text
        StringBuilder builder = new StringBuilder();
        builder.Append("Please send report to:\r\n");
        builder.Append(EmailTarget);
        builder.AppendLine();

        builder.Append("Error Detail\r\n");
        builder.Append(errormessage.Exception);

        builder.AppendLine();
        builder.Append("\r\nAdditional Info\r\n");
        builder.Append(errormessage.ExceptionDetail);
        builder.AppendLine();

        request.Data.SetText(builder.ToString());

        DataTransferManager.GetForCurrentView().DataRequested -= handler;
    }

}

public class ErrorMessageInfo
{
    public string Usermessage;
    public string Info;
    public string Exception;
    public string ExceptionDetail;
}
```

As a quick walkthrough, basically it has two main methods:

- ReportException

As it states, this is used to dump an unhandled (or handled for that case) error to a file that can be accessed when next launched.

- CheckForPreviousException

This is run when an app starts and if a error dump is found it and if the user agrees to the message prompt it launches up the Share UI and sends the error data to it for sending the email.

Note as we cannot set the email target address I've just included it in the share data **Be sure to change this field or have it populate from your app**.

Find the code here - [http://bit.ly/PfUANd](http://bit.ly/PfUANd)

---

Getting Started

To use the above component, simply add this as a class to your project along with the Win8 Storage Helper (as its a prerequisite).

Next bind the UnhandledException event in the App.XAML.cs constructor to your own method using:

```csharp
this.UnhandledException += App_UnhandledException;
```

Then add the following handler in the App.XAML.cs:

```csharp
void App_UnhandledException(object sender, UnhandledExceptionEventArgs e)
{
	if (System.Diagnostics.Debugger.IsAttached)
	{
		// An unhandled exception has occurred; break into the debugger
		System.Diagnostics.Debugger.Break();
	}
	else
	{
		LittleWatson.ReportException(e, "Flipped Error event occured");
		e.Handled = true;
	}
}
```

All that's left is to ensure you check for errors each time the app starts, I just put it in the App Launched method of App.XAML.cs right after the statement activating the Root Window which worked for me, but you could put it anywhere you want really.

```csharp
LittleWatson.CheckForPreviousException();
```

---

Right well I'm off to write the next article, any questions or queries just post or a comment or drop me a line on the "contact me" page or even twitter.
