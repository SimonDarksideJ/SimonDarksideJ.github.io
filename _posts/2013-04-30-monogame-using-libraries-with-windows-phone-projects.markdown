---
layout: post
title: 'MonoGame: Using libraries with Windows Phone projects'
date: 2013-04-30 13:17:06
tags: [monogame, windows phone]
---

[![image](/assets/img/wordpress/2013/04/image18.png "image")](/assets/img/wordpress/2013/04/image19.png)

A challenge faced by the [MonoGame](http://monogame.net/) team when they created Windows Phone 8 support was that XNA is actually included with the platform, this created a unique challenge because it was

a direct contradiction to the XNA support being provided by MonoGame itself, this caused no end of problems until a solution was found.

The answer was simple, ignore the XNA libs native to Windows Phone at build time.

> **\*NOTE**
> 
> MonoGame NuGet packages have now been released so that you don’t need to go through this headache any more, there are both full packages and binaries only releases for the main 3.0.1 release and the current dev branch.  
> Check them out in this post – http://darkgenesis.zenithmoon.com/monogame-nuget-packages-are-go/  
> Installing the binary only version of the new NuGet package will do the tasks in this post for you 😀

* * *


# The Problem

If you manually reference the MonoGame framework from any project and try to use XNA components you will likely run in to the following error:

> Error 1:  
> The type ‘Microsoft.Xna.Framework.Vector3’ exists in both  
> ‘c:\Program Files (x86)\MonoGame\v3.0\Assemblies\WindowsPhone\x86\MonoGame.Framework.dll’ and  
> ‘c:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\WindowsPhone\v8.0\Microsoft.Xna.Framework.dll’

The compiler is basically stating there are two versions of the class used (in this case the Vector3 struct) and it cannot decide which one to use.  Using an alias would not help because they have the same name, same namespace and so on.

* * *


# Solving this

If you use the MonoGame Windows Phone 8 project template, the fix is automatically applied for you but if you create your own projects and / or create libraries / components to your project that require the “MonoGame.Framework” referenced assembly then you will need to apply the fix manually, read on.

1: Open the “.csproj” of the project you are adding the MonoGame reference to.

2: Add the following block after the \<Imports\> section

     \<Target Name="MonoGame\_RemoveXnaAssemblies" AfterTargets="ImplicitlyExpandTargetFramework"\> \<Message Text="MonoGame - Removing XNA Assembly references!" Importance="normal" /\> \<ItemGroup\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.GamerServices.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.GamerServicesExtensions.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.Input.Touch.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.MediaLibraryExtensions.dll'" /\> \</ItemGroup\> \</Target\>

All this does (as explained above) is tell the MSBuild task to ignore the Microsoft XNA reference libraries during the build so that only the MonoGame versions exist.

Ensure you do this for any project in your solution that references the MonoGame framework, not needed if the project is not.

* * *


# One other thing

Another thing to note if you build your game project manually instead of using the MonoGame Windows Phone 8 template (some people just like it that way) is that there is some other additional configuration included you should be aware of, this revolves round the target platform used for builds.

> If you are targeting the emulator, then the “x86” versions of the assemblies are used to build the project.

 

> If you are targeting a device (or publishing to the store) then the “ARM” versions of the framework are used.

Be aware of this if you decide to go solo (see example below)

* * *


# Final Example

Just to finish this post off and as a sanity check to ensure you got it right, here is an example project file with the above section included:

    \<?xml version="1.0" encoding="utf-8"?\> \<Project ToolsVersion="4.0" DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003"\> \<PropertyGroup\> \<Configuration Condition=" '$(Configuration)' == '' "\>Debug\</Configuration\> \<Platform Condition=" '$(Platform)' == '' "\>ARM\</Platform\> \<ProductVersion\>10.0.20506\</ProductVersion\> \<SchemaVersion\>2.0\</SchemaVersion\> \<ProjectGuid\>{00F8D6E2-D182-451B-86A0-1905FD4F920F}\</ProjectGuid\> \<ProjectTypeGuids\>{C089C8C0-30E0-4E22-80C0-CE093F111A43};{fae04ec0-301f-11d3-bf4b-00c04f79efbc}\</ProjectTypeGuids\> \<OutputType\>Library\</OutputType\> \<AppDesignerFolder\>Properties\</AppDesignerFolder\> \<RootNamespace\>GameName4\</RootNamespace\> \<AssemblyName\>GameName4\</AssemblyName\> \<TargetFrameworkIdentifier\>WindowsPhone\</TargetFrameworkIdentifier\> \<TargetFrameworkVersion\>v8.0\</TargetFrameworkVersion\> \<SilverlightVersion\>$(TargetFrameworkVersion)\</SilverlightVersion\> \<SilverlightApplication\>true\</SilverlightApplication\> \<SupportedCultures\> \</SupportedCultures\> \<XapOutputs\>true\</XapOutputs\> \<GenerateSilverlightManifest\>true\</GenerateSilverlightManifest\> \<XapFilename\>GameName4\_$(Configuration)\_$(Platform).xap\</XapFilename\> \<SilverlightManifestTemplate\>Properties\AppManifest.xml\</SilverlightManifestTemplate\> \<SilverlightAppEntry\>GameName4.App\</SilverlightAppEntry\> \<ValidateXaml\>true\</ValidateXaml\> \<MinimumVisualStudioVersion\>11.0\</MinimumVisualStudioVersion\> \<ThrowErrorsInValidation\>true\</ThrowErrorsInValidation\> \</PropertyGroup\> \<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|x86' "\> \<DebugSymbols\>true\</DebugSymbols\> \<DebugType\>full\</DebugType\> \<Optimize\>false\</Optimize\> \<OutputPath\>bin\WindowsPhone\x86\Debug\</OutputPath\> \<DefineConstants\>DEBUG;TRACE;SILVERLIGHT;WINDOWS\_PHONE\</DefineConstants\> \<NoStdLib\>true\</NoStdLib\> \<NoConfig\>true\</NoConfig\> \<ErrorReport\>prompt\</ErrorReport\> \<WarningLevel\>4\</WarningLevel\> \</PropertyGroup\> \<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|x86' "\> \<DebugType\>pdbonly\</DebugType\> \<Optimize\>true\</Optimize\> \<OutputPath\>bin\WindowsPhone\x86\Release\</OutputPath\> \<DefineConstants\>TRACE;SILVERLIGHT;WINDOWS\_PHONE\</DefineConstants\> \<NoStdLib\>true\</NoStdLib\> \<NoConfig\>true\</NoConfig\> \<ErrorReport\>prompt\</ErrorReport\> \<WarningLevel\>4\</WarningLevel\> \</PropertyGroup\> \<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|ARM' "\> \<DebugSymbols\>true\</DebugSymbols\> \<DebugType\>full\</DebugType\> \<Optimize\>false\</Optimize\> \<OutputPath\>bin\WindowsPhone\ARM\Debug\</OutputPath\> \<DefineConstants\>DEBUG;TRACE;SILVERLIGHT;WINDOWS\_PHONE\</DefineConstants\> \<NoStdLib\>true\</NoStdLib\> \<NoConfig\>true\</NoConfig\> \<ErrorReport\>prompt\</ErrorReport\> \<WarningLevel\>4\</WarningLevel\> \</PropertyGroup\> \<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|ARM' "\> \<DebugType\>pdbonly\</DebugType\> \<Optimize\>true\</Optimize\> \<OutputPath\>bin\WindowsPhone\ARM\Release\</OutputPath\> \<DefineConstants\>TRACE;SILVERLIGHT;WINDOWS\_PHONE\</DefineConstants\> \<NoStdLib\>true\</NoStdLib\> \<NoConfig\>true\</NoConfig\> \<ErrorReport\>prompt\</ErrorReport\> \<WarningLevel\>4\</WarningLevel\> \</PropertyGroup\> \<ItemGroup\> \<Compile Include="App.xaml.cs"\> \<DependentUpon\>App.xaml\</DependentUpon\> \</Compile\> \<Compile Include="LocalizedStrings.cs" /\> \<Compile Include="GamePage.xaml.cs"\> \<DependentUpon\>GamePage.xaml\</DependentUpon\> \</Compile\> \<Compile Include="Game1.cs" /\> \<Compile Include="Properties\AssemblyInfo.cs" /\> \<Compile Include="Resources\AppResources.Designer.cs"\> \<AutoGen\>True\</AutoGen\> \<DesignTime\>True\</DesignTime\> \<DependentUpon\>AppResources.resx\</DependentUpon\> \</Compile\> \</ItemGroup\> \<ItemGroup\> \<ApplicationDefinition Include="App.xaml"\> \<SubType\>Designer\</SubType\> \<Generator\>MSBuild:Compile\</Generator\> \</ApplicationDefinition\> \<Page Include="GamePage.xaml"\> \<SubType\>Designer\</SubType\> \<Generator\>MSBuild:Compile\</Generator\> \</Page\> \</ItemGroup\> \<ItemGroup\> \<None Include="Properties\AppManifest.xml" /\> \<None Include="Properties\WMAppManifest.xml"\> \<SubType\>Designer\</SubType\> \</None\> \</ItemGroup\> \<ItemGroup\> \<Content Include="Assets\AlignmentGrid.png" /\> \<Content Include="Assets\ApplicationIcon.png"\> \<CopyToOutputDirectory\>PreserveNewest\</CopyToOutputDirectory\> \</Content\> \<Content Include="Assets\Tiles\FlipCycleTileLarge.png"\> \<CopyToOutputDirectory\>PreserveNewest\</CopyToOutputDirectory\> \</Content\> \<Content Include="Assets\Tiles\FlipCycleTileMedium.png"\> \<CopyToOutputDirectory\>PreserveNewest\</CopyToOutputDirectory\> \</Content\> \<Content Include="Assets\Tiles\FlipCycleTileSmall.png"\> \<CopyToOutputDirectory\>PreserveNewest\</CopyToOutputDirectory\> \</Content\> \<Content Include="Assets\Tiles\IconicTileMediumLarge.png"\> \<CopyToOutputDirectory\>PreserveNewest\</CopyToOutputDirectory\> \</Content\> \<Content Include="Assets\Tiles\IconicTileSmall.png"\> \<CopyToOutputDirectory\>PreserveNewest\</CopyToOutputDirectory\> \</Content\> \</ItemGroup\> \<ItemGroup\> \<EmbeddedResource Include="Resources\AppResources.resx"\> \<Generator\>PublicResXFileCodeGenerator\</Generator\> \<LastGenOutput\>AppResources.Designer.cs\</LastGenOutput\> \</EmbeddedResource\> \</ItemGroup\> \<ItemGroup\> \<!-- A reference to the entire .Net Framework and Windows SDK are automatically included --\> \<Reference Include="MonoGame.Framework" Condition=" '$(Platform)' == 'ARM' "\> \<HintPath\>$(MSBuildExtensionsPath)\..\MonoGame\v3.0\Assemblies\WindowsPhone\ARM\MonoGame.Framework.dll\</HintPath\> \</Reference\> \<Reference Include="MonoGame.Framework" Condition=" '$(Platform)' == 'x86' "\> \<HintPath\>$(MSBuildExtensionsPath)\..\MonoGame\v3.0\Assemblies\WindowsPhone\x86\MonoGame.Framework.dll\</HintPath\> \</Reference\> \</ItemGroup\> \<ItemGroup\> \<ProjectReference Include="..\PhoneClassLibrary1\PhoneClassLibrary1.csproj"\> \<Project\>{924D5D26-7744-4FA3-A3F7-E5396CB4B7AF}\</Project\> \<Name\>PhoneClassLibrary1\</Name\> \</ProjectReference\> \</ItemGroup\> \<Import Project="$(MSBuildExtensionsPath)\Microsoft\$(TargetFrameworkIdentifier)\$(TargetFrameworkVersion)\Microsoft.$(TargetFrameworkIdentifier).$(TargetFrameworkVersion).Overrides.targets" /\> \<Import Project="$(MSBuildExtensionsPath)\Microsoft\$(TargetFrameworkIdentifier)\$(TargetFrameworkVersion)\Microsoft.$(TargetFrameworkIdentifier).CSharp.targets" /\> \<Target Name="MonoGame\_RemoveXnaAssemblies" AfterTargets="ImplicitlyExpandTargetFramework"\> \<Message Text="MonoGame - Removing XNA Assembly references!" Importance="normal" /\> \<ItemGroup\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.GamerServices.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.GamerServicesExtensions.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.Input.Touch.dll'" /\> \<ReferencePath Remove="@(ReferencePath)" Condition="'%(Filename)%(Extension)'=='Microsoft.Xna.Framework.MediaLibraryExtensions.dll'" /\> \</ItemGroup\> \</Target\> \<!-- To modify your build process, add your task inside one of the targets below and uncomment it. Other similar extension points exist, see Microsoft.Common.targets. \<Target Name="BeforeBuild"\> \</Target\> \<Target Name="AfterBuild"\> \</Target\> --\> \<ProjectExtensions /\> \</Project\