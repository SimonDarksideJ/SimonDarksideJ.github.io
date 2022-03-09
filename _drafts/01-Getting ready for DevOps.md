# Getting started with Azure DevOps

The first lesson you learn when researching or implementing devops (Developer/Operations, two sides of the coin working "harmoniously") is that nothing is Free. You want to push your builds up to the cloud, have a bunch of processes tell you how great your code is and push out all your builds to the right places, the problem is that in order to get the cloud to do all this work you need resources, time and some grunt work.  HOWEVER, if you are willing to offer up some of those resources yourself, you can actually get away with paying nothing to your cloud masters.

## TL;DR;

* If you have spare hardware or enough power in your PC, you can use it as an Azure build machine
* Impact to your PC setup is minimal
* No Azure runtime costs, all within the FREE allocation given to all accounts.
* Options to scale up as you need
* You can use Unity Personal, so no Unity cost either (all other options require Pro)

## Why do this?

Automation is primarily a safeguard, it is there to double check your work, validate your project builds for all the platforms you need it for and ensures you are not going to get tripped up later on down the road.  Additionally, it gives you the option to generate builds for multiple platforms automatically and seamlessly (provided your build completes) upload the build to test or publisher platforms, but it can also offer so much more.

> Check out my previous article for more details <- insert Link Here

## Requirements

Getting started is easy, although the setup is a little cumbersome, especially to those who are unfamiliar with how DevOps works in general. This article will walk you through all the dark corners to get you up and running.

* Signup for a Free Microsoft account if you do not have one already
* Sign in to and register for Microsoft AzureYou will be asked for payment information, but do not worry, this is primarily for identification and "just in case".
* **(optional)** A Windows build machine for supported Windows Build targets (standalone, Android, UWP, etc), setup for how you want to build your project.  This can be your main development machine (it will run in the background) or another PC
* ***(optional)*** A Mac build machine for supported iOS build targets which can also run in the background.
* A stress ball or toy, to give a good squeeze when you have to repeat a step several times over (It will happen, still does to me)

This article will cover configuring everything before setting up your build machine, as I will cover each platform in separate articles to keep things tidy and clean.

## Sign up for a free Microsoft Account

> Microsoft now give you the option now to only use your GitHub account if you wish, so you can skip this step if you want.  If you want to use GitHub as your account, make sure to skip ahead to the GitHub section and then come back to the DevOps signup.

All of Microsoft's services require you to use a Microsoft account, if you already have one you can skip this step.  They are free accounts and you do not need to use it for anything else if you do not want to.

> I highly recommend making sure your account is secure and setting up 2FA (two factor authentication), as you should for any account on the web these days.  If your personal account is not using 2FA, you should enable it.

Simply visit [https://signup.live.com](https://signup.live.com) to register for an account.

You can use your existing email address or register for a new Microsoft email which also gives a bunch of other free services such as Mail, Teams and so on to use if you wish.
Screenshot

## Enter the world of Azure DevOps

Once you have your Microsoft account, simply visit the Azure portal page to begin your new journey:

> [https://dev.azure.com](https://dev.azure.com)

![DevOps signup page](../../Images/DevOps/00-DevOps-Signup.png)

You will need to sign in to register and then select a Free GitHub account, enabling you to access all of the free services on Azure DevOps (and more, but I will let you explore that yourself).

There are few steps from:

* Connecting your account
* Registering DevOps and your own organisation
* Selecting your region (just use the one closest to you)
* Finishing touches

Once you are ready, **you will be prompted to create your first project** by giving it a name and once the cogs have finished whirring your devops area is ready for the final challenge, plugging it in to your Unity project's source control on GitHub.

> By default, your projects are private only.  If you want to make your automation public for an open-source project, you will need to follow the steps to update your organisation settings.

## Setting up your free GitHub account

> You can skip this if you already have one or created one to use for your DevOps account.

Feel free to ignore this section, although it is worth checking out the updates to GitHub's pricing as there are a lot more included with your free account, such as private repositories, which you used to have to pay for.

Like Azure, signing up to GitHub is free and easy, I'm even impressed by their new retro style signup screen which is even fun to get through. Just visit the following address to get started:

[https://github.com](https://github.com)

![GitHub Signup](../../Images/DevOps/01-GitHub-Signup.png)

> P.S. I'm loving the new retro look to the GitHub signup page :D

Once registered you can create your own repository, either private or public and initialise it with a readme (to explain what the project is, yes, even for yourself) and a .gitIgnore file to ensure only those files that should be in source control will be uploaded to your repository.

With everything ready in the cloud, all that is needed now is to put your repository on your machine and get your Unity project in ready to be automated.

## Setting up locally

Whether you have a Unity project already or not, you will need to clone/link your online GitHub project with a folder on your local machine.  For the initial setup, this has to be to be a clean folder (you cannot link the existing folder your project is in).  Check out the following article on the GitHub Site for setting up your source controlled folder on your machine:

### [GitHub - Cloning a Repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)

Once you have setup your source controlled folder, you can either create a new unity project in the folder or simply copy your existing project in there.

> I recommend keeping your Unity project in a sub folder in your source control folder, just to keep the root folder clean for files related to source control, such as the .gitIgnore and Readme files.

Once your folder is setup, just check your Unity Project settings are configured right for source control, just check this article for more info.

[https://stackoverflow.com/questions/18225126/how-to-use-git-for-unity3d-source-control](https://stackoverflow.com/questions/18225126/how-to-use-git-for-unity3d-source-control)

## Creating your Build Agent account

One important fact that is usually overlooked when setting up automation is that you SHOULD NOT use your personal account for the actual automation.  We commit code, connect to various services and our personal accounts are much more in the open as we use the web.  Automation is different, it needs to be MORE secure as we are effectively giving special admin access to our repositories to work on our behalf.  We also want traceability, so that we know who is changing code (if there is more than one of you on the team)

<More Here>

## Linking Azure DevOps to your Github project

As you follow through the following sections, the ultimate aim is that any changes you wish to propose to your project are verified and tested on your target platforms to report changes before they are fully included, as well as creating a process to produce builds of your project once you are happy with it.  We will go through both as they are just different configurations that need to be applied.

Switching back to your DevOps page with your newly created project, we first need to create a Pipeline, which is the mechanism to give DevOps a hook in to your GitHub project and look up the commands it needs to process.

* First, go to the Pipelines tab on the left and click "Create Pipeline"

![Creating your first pipeline](../../Images/DevOps/02-CreatePipeline.png)

* Then select **GitHub as the source** and you will be directed to login to GitHub and then to select your repository

![Selecting a pipeline source](../../Images/DevOps/03-PipelineSource.png)

> You will note at this point there are several other options and git based source control systems that Azure can hook in to.  In short, so long as the provider supports git (e.g. BitBucket), then Azure can connect to it to grab your source to process.

You will be 