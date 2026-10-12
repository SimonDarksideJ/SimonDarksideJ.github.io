(function () {
  // GitHub-style alerts ("> [!NOTE]") are converted at build time by _plugins/markdown_alerts.rb.
  // This script is a fallback: it skips blockquotes that are already converted, and it still
  // styles older callouts written as "> **Note:** Something".

  function normalizeAlertType(raw) {
    var upper = raw.toUpperCase();
    if (upper === 'NOTE') return 'note';
    if (upper === 'TIP') return 'tip';
    if (upper === 'IMPORTANT') return 'important';
    if (upper === 'WARNING') return 'warning';
    if (upper === 'CAUTION') return 'caution';
    return null;
  }

  function titleForType(type) {
    if (type === 'note') return 'Note';
    if (type === 'tip') return 'Tip';
    if (type === 'important') return 'Important';
    if (type === 'warning') return 'Warning';
    if (type === 'caution') return 'Caution';
    return 'Note';
  }

  var GITHUB_MARKER = /^\[!([A-Za-z]+)\]\s*/;
  var LEGACY_MARKER = /^(Note|Tip|Important|Warning|Caution)\s*:\s*/i;
  var LEGACY_WORD = /^(Note|Tip|Important|Warning|Caution)\s*:?$/i;

  // Remove the marker from the start of the paragraph without touching the links,
  // code or emphasis that follow it.
  function stripLeadingMarker(p) {
    var node = p.firstChild;
    while (node && node.nodeType === Node.TEXT_NODE && !node.nodeValue.trim()) {
      node = node.nextSibling;
    }
    if (!node) return;

    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue.replace(/^\s+/, '').replace(GITHUB_MARKER, '').replace(LEGACY_MARKER, '');
    } else if (node.nodeType === Node.ELEMENT_NODE && /^(STRONG|B|EM)$/.test(node.tagName) &&
               LEGACY_WORD.test((node.textContent || '').trim())) {
      var next = node.nextSibling;
      node.remove();
      if (next && next.nodeType === Node.TEXT_NODE) {
        next.nodeValue = next.nodeValue.replace(/^\s*:?\s*/, '');
      }
    }
  }

  function enhanceMarkdownAlerts(root) {
    var blockquotes = (root || document).querySelectorAll('.post-content blockquote');

    blockquotes.forEach(function (blockquote) {
      if (blockquote.classList.contains('markdown-alert')) return;

      var firstParagraph = blockquote.querySelector('p');
      if (!firstParagraph) return;

      var text = (firstParagraph.textContent || '').trim();
      var type = null;

      var match = text.match(GITHUB_MARKER);
      if (match) {
        type = normalizeAlertType(match[1]);
      } else {
        var legacy = text.match(LEGACY_MARKER);
        if (legacy) type = normalizeAlertType(legacy[1]);
      }
      if (!type) return;

      blockquote.classList.add('markdown-alert', 'markdown-alert--' + type);

      stripLeadingMarker(firstParagraph);
      if (!firstParagraph.textContent.trim() && !firstParagraph.querySelector('img, code, a')) {
        firstParagraph.remove();
      }

      var title = document.createElement('p');
      title.className = 'markdown-alert__title';
      title.textContent = titleForType(type);
      blockquote.prepend(title);

      // Accessibility: make it a labelled region.
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
