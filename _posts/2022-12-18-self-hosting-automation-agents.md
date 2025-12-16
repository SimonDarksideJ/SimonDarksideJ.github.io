---
layout: post
title: Self Hosting automation agents - a guide
date: 2022-12-18 14:00 +0000
description: To conclude the series on automation, here are the final steps to setup Agents on your own hardware
img: posts/20221218/00-automation.gif
category: Automation
tags:
- azure
- github
- automation
- unity3d
author: Simon Jackson
github:
mathjax: false
---

![DevOps Services](/assets/img/posts/20221218/01-devops.png)

With [Azure Devops](https://darkgenesis.zenithmoon.com/using-azure-pipelines-with-unity.html) and [GitHub Actions](https://darkgenesis.zenithmoon.com/using-github-actions-with-unity.html) you have the option to either use their hosted agents using the Azure backend, which is fine as you do get a decent amount of time of free resource but eventually you are going to end up paying for the service.  Or, you can host your own agents on your own PC or even a dedicated box just for building.

If you have spare kit (does not need to be uber fast) then it makes sense to leave it powered on in the corner and have all your builds/tests run on it while you continue to work.  And this isn't an either/or moment either, if you want you can run some of the smaller automations you use to do code validation or check-in "checks" using hosted agents and then run your intensive work on your own box, it is completely up to you.


## Microsoft-hosted pipeline agents

As mentioned previously, for both Azure and GitHub automation, Microsoft provide you several images to run your jobs, which you chose is dependent on what the job is doing and the requirements needed to run them, for most script / .NET / NPM tasks Ubuntu (Linux) is fine and it is also the cheapest from an automation standpoint.  As soon as you start needing software, such as Unity, then your options become a bit more limited to either Windows or Mac:

| Image | YAML Label | Included Software | Rollout Progress of Latest Image Release |
| --------------------|---------------------|--------------------|---------------------|
| Ubuntu 22.04 | `ubuntu-22.04` | [ubuntu-22.04] | [![status22](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=ubuntu22&redirect=1)
| Ubuntu 20.04 | `ubuntu-latest` or `ubuntu-20.04` | [ubuntu-20.04] | [![status20](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=ubuntu20&redirect=1)
| Ubuntu 18.04 <sup>deprecated</sup>  | `ubuntu-18.04` | [ubuntu-18.04] | [![status18](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=ubuntu18&redirect=1)
| macOS 12 | `macos-12`| [macOS-12] | [![statusumac12](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=macos-12&redirect=1)
| macOS 11 | `macos-latest` or `macos-11`| [macOS-11] | [![statusmac11](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=macos-11&redirect=1)
| macOS 10.15 <sup>deprecated</sup> | `macos-10.15` | [macOS-10.15] | [![statusmac10](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=macos-10.15&redirect=1)
| Windows Server 2022 | `windows-latest` or `windows-2022` | [windows-2022] | [![statuswin22](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=windows-2022&redirect=1) |
| Windows Server 2019 | `windows-2019` | [windows-2019] | [![statuswin19](assets/img/posts/image-not-found.png)](https://actionvirtualenvironmentsstatus.azurewebsites.net/api/status?imageName=windows-2019&redirect=1)

> Make sure to check the previous articles for more details on using the hosted agents for either [Azure Devops](https://darkgenesis.zenithmoon.com/using-azure-pipelines-with-unity.html) or [GitHub Actions](https://darkgenesis.zenithmoon.com/using-github-actions-with-unity.html).


## Self Hosting

As the title of the article suggests, self-hosting simply means you are using your own hardware, be it physical or virtual (yes, if you have virtual servers hosted elsewhere, you can self-host on them too), you are in control of the setup, operation and runtime for the host.  This can greatly simplify the runtime of your host and even your automation pipelines as you can skip the steps needed to setup and install required software because you already know it is installed (because you installed it), rather than having potentially complicated scripts to download and install each requirement on each run.

> Fair warning, Unity is still a pain when it comes to automation, ever since they updated to the V3 of the Unity Hub, it has made installing / checking installs of the Unity Editor very temperamental.  Personally, I manage the version of Unity that is installed manually now because automating it became too unreliable.  Thanks Unity!


## Requirements

The requirements needed to run a self-hosted agent come in two parts, what you need to run your pipelines and what you need in order to run the agent itself.


### Build Software

What you need for building / automating and testing will largely depend on what you are building, for example:

* Unity Hub.
* Unity editor (version determined by your project), which must be manually updated when you upgrade.
* Visual Studio (community edition is still fine)
* .NET runtimes (usually installed with Visual Studio)


### Automation Software

For the automation, you will need scripting runtimes and also the agent software of choice, depending on whether you are using Azure, GitHub or even one of the other popular automation services, like GitLab (however, we are only covering Azure and GitHub in this article):

* [Powershell](https://learn.microsoft.com/en-us/shows/it-ops-talk/how-to-install-powershell-7) or [Bash](https://www.linuxandubuntu.com/home/install-ubuntu-bash-shell-on-windows-10), depending on your scripting language of choice.  Personally, I use both.
* [NPM](https://docs.npmjs.com/cli/v7/configuring-npm/install) (Node Package Manager) if you are intending to publish anything or manage the version of your packages.  Also requires NodeJS.
* Agent software of choice. [Azure](#setting-up-an-azure-agent) / [GitHub](#setting-up-a-github-agent)

> You may find on your initial forays into automation that there may be other requirements needed depending on your workflows, just be sure to document them as required so that when you install another agent, you have everything recorded.


## How many agents?

One thing that some people miss, is that agents are virtual setups in themselves on your build machine and there is **NO LIMIT** to how many agents you can have installed on a single box.  In my experience, I generally install approximately 3 agents on a PC, depending on how much I expect the agents to do and how intensive the operations are:

* If you are running small scripting jobs, then install more agents.
* If you are running intensive build and packaging jobs, install less agents.

Ultimately though, you can mix and match again.  Have several small agents setup with a Tag/Name to identify them and then have one single agent identified as the BUILD agent for solely doing the big builds, then you can ix and match which are used in your jobs.

> Personally, I setup about 10 agents for small script jobs and 1 (or 2) dedicated agents for just builds, this throttles the demand based on how intensive the jobs are likely to be and do not slow the build PC (Usually my main development pc) down too much.


## Agent identity

A critical thing for your agents is the identity the agent uses in Azure or GitHub, ideally this should be a dedicated and separate user, this is to ensure there are no mixups for the account running builds.  You can use a personal account, but if that person leaves or resets their access tokens, you will have to recreate all your agents!

So create a new user in GitHub (it is free) and Azure (if also using Azure) and give it sufficient rights to access the parts of the project you want automated.


## Agent Location

One often missed fact with agents is where to put them on the build host, whether it is on Windows or Mac/Linux, you need to take in to account that the **PATH** that is build can get quite long!  On Windows this can create issues, less so on Linux/mac but still something that has to be considered.

> The "Rule of Thumb" I always use is to place the folder for the agent as high as possible (Root ideally) with short folder names, e.g.

* Create a single character folder on the Root of the drive, e.g. A (for Azure) or G (for Github), or as close to root as you can, for the agent type.
* Create a folder for each agent within the "Agent Type" folder, either as the name of the agent or simply 01, 02, etc.  E.G. MyAgent-01.
* When asked for a "working folder", keep it short, ideally simply "w"

All in all, you want to keep the working path the agent uses as short as possible, to give enough path length for your builds, which as stated, can get VERY long in some cases.

Your final path should resemble something like:

* "c:\a\agent-01\w"


## Setting up an Azure Agent

> [Check the official MS docs here](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser)

Azure DevOps agents are quite robust and do take some practice to setup, the steps are as follows:

1. Create a new [PAT (Personal Access Token)](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops) for the user running the builds.
2. Make a note of the Azure Organisation URL (e.g. https://dev.azure.com/myorganisation)
3. Navigate to the "Organisation" settings (as agents are created for the Organisation ONLY) - *Organisation -> Organisation Settings -> Agent Pools*
4. Create a new Agent Pool (if you do not have one setup already), the pool name is what is used on the Job.
5. Create a new Agent on Azure and download the latest agent software to the Build Host (just gives you the instructions)
6. Create a new folder for your agent, ideally with the index of the agent, especially if you are adding more than one.  E.G. "myAgent-01", or just "01".
7. Extract the Agent software into the agent folder.
8. When asked, enter the Organisation URL (e.g. https://dev.azure.com/myorganisation).
9. For security, select "PAT" (just hit enter) and then copy/paste the PAT you created in step 1.
10. When asked for a "Working Folder", set this to "W" (it is just a short name).

Depending on the OS you are installing the agent on:

* For Windows, you will be asked if you want to run this agent as a service.  If you want it to automatically start when the Host powers up, then select Yes and click enter to select the default user to run the service as.  
* If you are installing on a Mac, you have to run a separate command to install the service which is ```./svc.sh install``` and then ```./svc.sh start```

> Personally I have always installed agents as Services so I do not need to think about them, else you will need to run a separate command each and every time you need to start them (which some people do), just check the Azure docs for more details for your Operating system.

You now have a single agent setup, repeat steps 6 - 10 for additional agents with a different agent folder name.


## Setting up a GitHub Agent

> [Check the official GitHub docs here](https://github.com/organizations/EtharInc/settings/actions/runners/new)

Setting up a GitHub Actions runners are far simpler that Azure agents, simply because they have less steps and are a lot more streamlined, however, they can still cause confusion.

1. Create a new [GitHub PAT (Personal Access Token)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for the user running the builds.
2. Navigate to the Organisation Settings in GitHub (as agents are created for the Organisation ONLY) - *Organisation -> Settings -> Actions -> Runners*
3. Select "New runner" and then "New self-hosted runner" to see the instructions.
4. Download the Agent software from the URL provided.
5. Create a new folder for your agent, ideally with the index of the agent, especially if you are adding more than one.  E.G. "myAgent-01", or just "01".
6. Extract the Agent software into the agent folder.
7. Run the "config" command using the token SPECIFIED ON THE PAGE (not your PAT)
8. You will be asked for the PAT token as part of the install
9. You will be asked for any additional TAGS you want set against the agent, these are used to identify your agent in your Jobs.  You can leave the defaults or add your own if you want to create different agents for different jobs.
10. When asked for a "Working Folder", set this to "W" (it is just a short name).

Depending on the OS you are installing the agent on:

* For Windows, you will be asked if you want to run this agent as a service.  If you want it to automatically start when the Host powers up, then select Yes and click enter to select the default user to run the service as.  
* If you are installing on a Mac, you have to run a separate command to install the service which is ```./svc.sh install``` and then ```./svc.sh start```

> Personally I have always installed agents as Services so I do not need to think about them, else you will need to run a separate command each and every time you need to start them (which some people do), just check the Azure docs for more details for your Operating system.

You now have a single agent setup, repeat steps 5 - 10 for additional agents with a different agent folder name.


## All done except for the fish

![So long and thanks for all the fish](/assets/img/posts/20221218/02-fish.gif)

We are now at the end of our series, we have covered all the necessary bits to get your automation pipelines setup using the service(s) you require and you should be well armed for what lies ahead.

I have left personal notes through the articles to guide you in your journey, but here is a shortlist:

* Do not be afraid to use multiple services for different types of automation.  I use Azure for Unity builds and publishing and I use GitHub for validation, tests and verification on all my code check ins.
* Use many agents for simple jobs, especially when they are quick, or even use hosted agents for those little things and take some weight off.  It would be a VERY busy month to use all your free credits on simple jobs.  But if you do exceed, then check and see if you want to move some or all of the work on to self-hosted agents, or mix and match.
* Use fewer agents for large jobs, should be fairly self explanatory as large jobs use a lot of power and will just slow each other down if run concurrently.  Especially if you are running it on your dev PC. (might need more than one coffee while you wait).
* **NEVER** develop pipelines/jobs on your LIVE code branch, always make a FORK to a separate repo to experiment, or even use less code.   It can sometimes take MANY runs of testing to get your pipeline working the ay you want it and you don't want/need to use your entire codebase while your testing.  I always create a new fork/repo for testing and then copy over the YAML to my live repo when I'm happy.
* Experiment with your pipelines and also check what other projects do, if you see something you like that another project is doing, there is no harm looking at their pipelines and using it as a reference to build your own.  The Microsoft Repos are especially for this.
* Did you know, you can also "generate your documentation" in a pipeline.  Personally I have started using Docusaurus and Docfx to automate docs.

> **For GitHub** if you want to use GitHub actions on **PUBLIC** repositories, then you need to edit the "Default runner group" and enable it (that caused me a week of head scratching as it is not well documented).

Hope this all helps and if you have questions, comment below!
