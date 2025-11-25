# GitHub-style Alerts in Jekyll

This site uses custom CSS to support GitHub-style alerts using kramdown attributes. Since standard GitHub Markdown alerts (e.g., `> [!NOTE]`) are not natively supported by the default Jekyll markdown processor, use the following syntax instead.

## Usage

To create an alert, create a blockquote and add the class attribute on the line immediately following it.

### Note

Blue - Useful information that users should know, even when skimming.

```markdown
> This is a note about something important to remember.
{: .note}
```

### Tip

Green - Helpful advice for doing things better or faster.

```markdown
> Here's a helpful tip to improve your workflow.
{: .tip}
```

### Important

Purple - Key information users need to know to achieve their goal.

```markdown
> This is important and should not be overlooked.
{: .important}
```

### Warning

Yellow - Urgent info that needs immediate user attention to avoid problems.

```markdown
> Warning: This might cause issues if not handled carefully.
{: .warning}
```

### Caution

Red - Advises about risks or negative outcomes of certain actions.

```markdown
> Caution: This is dangerous and should be avoided.
{: .caution}
```

## Implementation Details

The styles are defined in `assets/css/main.css` and include support for both light and dark themes.
