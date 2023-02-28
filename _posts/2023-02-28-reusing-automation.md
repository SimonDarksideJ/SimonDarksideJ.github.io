---
layout: post
title: Reusing automation on GitHub
date: 2023-02-28 14:00 +0000
description: I side note in automation, to keep things tidy and reduce impacts, let us reuse some workflow
img: posts/20230228/00-title.gif
category: Automation
tags:
- azure
- github
- automation
author: Simon Jackson
github:
mathjax: false
---

![Reusing workflows across repositories](/assets/img/posts/20230228/01-reusable-workflows-ci-cd.png)

Managing automation is hard enough without having to pollute your git history with changes to your actual workflows, in reality, the workflow itself is unlikely to change but there can be subtle updates in what each workflow action needs to do.

As an example, in the Reality Collective we needed to change the versioning strategy for our packages due to upcoming changes in Unity (another nightmare to be sure), the actual flow is not changing but we simply needed some minor updates. All this required (although not in reality) was to update our automation to change the "Preview" tag we previously use to "Pre".  Now, if we had all the code and scripts inside our actual projects, this would have meant changing ALL the packages in all the projects we deploy for this one minor change, however, we had employed "Reusable workflows" in all our automations previously, so we could make the changes in a separate repository rather than pollute our core code projects.  (well, at least in theory).

## What are [Reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)

Reusable workflows come in several forms, the most common are the Published "Actions" on the GitHub Actions marketplace, such as the popular "Checkout" action to clone code at the beginning of an automation.  Actions are reusable scripts that can consumed in your workflow.

But what if you do not want to publish your workflows to the public marketplace?  Well, that is where [Reusable Workflow repositories](https://github.blog/2022-02-10-using-reusable-workflows-github-actions/) come in, like Actions, they are workflows published to a GitHub repo and can be accessed from any other implemented workflow with a few "security" limitations:

* The repository the workflow files are located must be public.
* The repository must exist in the SAME organisation as the repositories that want to consume them. (No cross org access)
* It must be a full repository, no forks allowed.

> See the [GitHub Blog article on the launch of Reusable Workflows](https://github.blog/2022-02-10-using-reusable-workflows-github-actions/)

As an example, here are all the reusable workflows the RealityCollective publishes for all its packages to consume:

![Reality Collective reusable workflows](/assets/img/posts/20230228/02-RCTReusableWorkflows.png)
*Reality Collective reusable workflows*

By default these can ONLY be consumed by other Reality Collective repositories, to use then in other organistions they must be manually copied and maintained.  

> To actually share them, they would each have to be converted in to Marketplace Actions, but we have no need at this time to do that.

Consuming these workflows is easy by having the following Job definitions within the actual workflows in each of our packages, thus:

```yml
  release-Package-only:
    name: Release package only, no upversion
    uses: realitycollective/reusableworkflows/.github/workflows/tagrelease.yml@v2
    with:
      build-host: ubuntu-latest
```

The workflow is called using `realitycollective/reusableworkflows/.github/workflows/tagrelease.yml`, specifying the organisation, repository and location of the reusable workflow file, followed by a TAG or Branch to source the pipeline from.

> I would strongly advise **AGAINST** using branches as they can be more trouble than they are worth, see below.

## Managing the workflows

Now, obviously over time these workflows need to be maintained and new versions added/updated/removed but you do not want to be changing all the repositories consuming them constantly, hence why reusable workflows require a branch or tag suffix against the reusable workflow file.

And this brings us to why this article exists today, as the public actions GitHub publish have some subtleties that are not immediately obvious and what follows is a guide to managing your own reusable workflows.

1. Once your workflows reach a stable state, create a **MAIN VERSION** Tag for the release of the workflow.  E.G. V1.
2. With the first changes you make, once stable, create a new Sub Version Tag for the incremental release.  E.G. V1.0.1.
3. NOW, you need to rebase the **MAIN VERSION** Tag to match the new Sub Version.  E.G. Delete V1 and recreate using the **same commit** as V1.0.1.

> If you wish you can create automation for your workflows to automate the tagging for the reusable pipeline repository.

This ensures that all workflows using the **V2** tag will get the latest update automatically. Only if there is a breaking change in parameters or flow, should you then do a Major version update to V3.

This subtlety with rebasing the Major Tag to the new commit is what eluded me in maintaining our workflows recently, so hopefully this will shed some light for you too, if you are using reusable workflows.

## Making your own reusable workflows

As a simple guide for making your own reusable workflows for your own repositories, here are some times to avoid some of the pitfalls I faced when building our first batch:

1. Create a new repository in your organisation solely for Reusable Workflows, the name is not important but make it recognisable.
2. Make the repository Public (until such time that GitHub allows us to have private reusable workflow access).
3. Create, test and validate your first batch of workflows, test in other repositories using the "**Main**"" suffix (or the name of the branch used for testing).
4. Once the workflows are Stable, create a Release commit to define a release point in your repository.
5. Create a new Tag (V1 for example) for the release.
6. Create a Release from the Tag for reference to document the release and what is contained.
7. Apply real workflows using the new Release tag (@V1)

> **Note** changing any workflows in the repository now will NOT BREAK any use of the workflows, making life more stable.

## Updating your workflow

When you need to make changes and create a new reusable workflow release, plan it, test it and update as follows.

### For a minor release

1. Make changes to the repository, either in the default branch or a separate one (should not matter)
2. Once stable, create a Release commit to mark the release.
3. Create a new minor release tag for the release (e.g. V1.0.1)
4. Delete and recreate the Major release tag for the release (delete V1, recreate under the same commit)
5. Both the minor release and major release tags should now be the same
6. Create a Release for the new minor release version.

No changes are needed to existing workflows as they will use the new updated V1 commit as the source of their workflows.

> If you do not recreate/update the Major release Tag commit, your workflows will not see changes unless you update them to the new minor release.

### FOr a Major release

1. Follow the same steps for a minor release, except you will only create a brand new Major release tag and Release.  Previous version is untouched.
2. Update any workflows needing the new version with the new Major version number, e.g. @v1 -> @v2.

> To use the new version, all workflows needed it will need to be updated.

## Wrap up

It has been a "not" fun time working through updating our pipelines recently, mainly because we followed the GitHub examples andd just use the Main branch (@main) which created headaches when we needed to make updates.
After a few hours examining what GitHub does to manage its own workflows we built up the above flow (the Major Release re-tagging was the latest).

But now we have a flow for maintaining our workflows better and we can get back to fighting Unity instead.

Hope this helps.
