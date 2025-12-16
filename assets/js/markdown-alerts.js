(function () {
  function normalizeAlertType(raw) {
    var upper = raw.toUpperCase();
    if (upper === 'NOTE') return 'note';
    if (upper === 'TIP') return 'tip';
    if (upper === 'IMPORTANT') return 'important';
    if (upper === 'WARNING') return 'warning';
    if (upper === 'CAUTION') return 'caution';
    return null;
  }

  function matchLegacyPrefix(text) {
    // Matches common legacy patterns rendered from markdown like:
    // > **Note:** Something
    // which typically becomes textContent: "Note: Something"
    // Only applied inside blockquotes.
    var match = text.match(/^(Note|Tip|Important|Warning|Caution)\s*:\s*/i);
    if (!match) return null;

    var type = normalizeAlertType(match[1]);
    if (!type) return null;

    return { type: type, prefix: match[0] };
  }

  function titleForType(type) {
    if (type === 'note') return 'Note';
    if (type === 'tip') return 'Tip';
    if (type === 'important') return 'Important';
    if (type === 'warning') return 'Warning';
    if (type === 'caution') return 'Caution';
    return 'Note';
  }

  function enhanceMarkdownAlerts(root) {
    var blockquotes = (root || document).querySelectorAll('.post-content blockquote');

    blockquotes.forEach(function (blockquote) {
      var firstParagraph = blockquote.querySelector('p');
      if (!firstParagraph) return;

      var text = (firstParagraph.textContent || '').trim();

      // Preferred GitHub-style: [!NOTE]
      var match = text.match(/^\[!([A-Za-z]+)\]\s*/);
      var type = null;
      var markerPrefix = null;

      if (match) {
        type = normalizeAlertType(match[1]);
        markerPrefix = match[0];
      } else {
        // Legacy: "Note: ..." (often from **Note:**)
        var legacy = matchLegacyPrefix(text);
        if (legacy) {
          type = legacy.type;
          markerPrefix = legacy.prefix;
        }
      }

      if (!type) return;

      blockquote.classList.add('markdown-alert', 'markdown-alert--' + type);

      // Remove the marker from the first paragraph text.
      var updated = markerPrefix ? text.replace(markerPrefix, '').trim() : text;
      if (updated.length === 0) {
        firstParagraph.remove();
      } else {
        firstParagraph.textContent = updated;
      }

      // Prepend a title.
      var title = document.createElement('p');
      title.className = 'markdown-alert__title';
      title.textContent = titleForType(type);
      blockquote.prepend(title);

      // Improve a11y: make it a labelled region.
      blockquote.setAttribute('role', 'note');
      blockquote.setAttribute('aria-label', titleForType(type));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      enhanceMarkdownAlerts(document);
    });
  } else {
    enhanceMarkdownAlerts(document);
  }
})();
