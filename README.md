# DarkGenesis Blog - Modern Redesign

A complete modern redesign of the DarkGenesis blog built on Jekyll 4.3, featuring modern web standards, accessibility, and SEO optimization while preserving all existing URLs.

## Features

✨ **Modern Design**
- Responsive, mobile-first CSS with Grid/Flexbox
- CSS custom properties for consistent theming
- Clean, minimal aesthetic

🌓 **Dark Mode**
- Automatic system preference detection
- Manual toggle support
- Smooth transitions

🔍 **Enhanced Search**
- Client-side search with intelligent ranking
- Real-time results as you type
- Weighted scoring (title > description > content)

♿ **Accessibility**
- WCAG 2.1 AA compliant
- Semantic HTML5 markup
- Skip links for keyboard navigation
- Proper ARIA labels and roles
- Respects `prefers-reduced-motion`

🎯 **SEO Optimized**
- OpenGraph meta tags
- Twitter Cards
- JSON-LD structured data
- Canonical URLs
- **Preserved legacy permalink structure**

⚡ **Performance**
- Optimized CSS (compressed in production)
- Minimal JavaScript (vanilla, no frameworks)
- Lazy loading support ready
- Fast page loads

🤖 **Automation**
- GitHub Actions deployment
- Automated link checking
- Extensible workflow system

## Local Development

### Prerequisites

- Ruby 3.1+
- Bundler
- Git

#### Windows (PowerShell)

1. Install Ruby with DevKit (recommended)
  - Option A (Windows Package Manager): `winget install RubyInstallerTeam.RubyWithDevKit`
  - Option B: RubyInstaller from https://rubyinstaller.org (choose a “with DevKit” build)

2. Close and reopen PowerShell so `ruby`/`gem` are on PATH.

3. Install Bundler:

```powershell
gem install bundler
```

If you already have Ruby installed but `bundle` isn’t found, Bundler is usually missing from your Ruby gems.

### Setup

```bash
# Clone the repository
git clone https://github.com/SimonDarksideJ/SimonDarksideJ.github.io.git
cd SimonDarksideJ.github.io
git checkout copilot/dark-genesis-next

# Install dependencies
bundle install

# Start the development server
bundle exec jekyll serve --livereload

# Open your browser
http://localhost:4000
```

## Project Structure

```
├── _includes/         # Reusable components
│   ├── header.html
│   ├── footer.html
│   ├── post-card.html
│   └── search-bar.html
├── _layouts/          # Page templates
│   ├── default.html
│   ├── home.html
│   └── post.html
├── _sass/             # SCSS stylesheets
│   ├── _variables.scss
│   ├── _base.scss
│   ├── _layout.scss
│   ├── _post-card.scss
│   └── _search.scss
├── assets/
│   ├── css/
│   │   └── main.scss
│   └── js/
│       ├── theme-toggle.js
│       ├── mobile-menu.js
│       └── search.js
├── .github/workflows/ # GitHub Actions
│   ├── deploy.yml
│   └── link-checker.yml
├── _posts/            # Blog posts
├── _config.yml        # Jekyll configuration
└── docs/              # Documentation
```

## Writing Posts

Create a new post in `_posts/` with the format: `YYYY-MM-DD-title.md`

### Front Matter Options

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-12-15 12:00:00 +0000
description: "A brief description for SEO"
img: posts/2024/featured-image.jpg
preview_gif: posts/2024/preview.gif  # Optional animated preview
category: Technology
tags:
  - jekyll
  - web-development
author: Simon Jackson
---

Your content here...
```

## Configuration

### Analytics

Google Analytics is configured in `_config.yml`:

```yaml
google_analytics: G-S2P4W0VHVB
```

### URL Preservation

The site preserves existing URLs using:

```yaml
permalink: ':title:output_ext'
```

This maintains backward compatibility with all existing posts (e.g., `/post-title.html`).

## Deployment

The site automatically deploys to GitHub Pages when you push to the `copilot/dark-genesis-next` branch.

Workflow: `.github/workflows/deploy.yml`

## Custom Domain

The site uses the custom domain: `darkgenesis.zenithmoon.com`

Configured in: `CNAME` file

## Documentation

Additional documentation is available in the `docs/` directory:

- **docs/README.md** - Documentation overview
- Future: Newsletter setup guide
- Future: Social media integration guide
- Future: Advanced configuration

## Technology Stack

- **Jekyll 4.3** - Static site generator
- **SCSS** - CSS preprocessor
- **Vanilla JavaScript** - No frameworks
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Hosting

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Modern mobile browsers

## License

© 2024 Simon Jackson. All rights reserved.

## Support

- Email: darkside@zenithmoon.com
- GitHub Issues: [Report a bug](https://github.com/SimonDarksideJ/SimonDarksideJ.github.io/issues)
- Twitter: [@simondarksidej](https://twitter.com/simondarksidej)
