(function () {
  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function buildToc() {
    const tocRoot = document.getElementById('post-toc');
    const contentRoot = document.querySelector('.post-content');
    if (!tocRoot || !contentRoot) return;

    const headings = Array.from(contentRoot.querySelectorAll('h2, h3'));
    if (headings.length === 0) return;

    const usedIds = new Set();

    const items = headings.map((heading) => {
      if (!heading.id) {
        let base = slugify(heading.textContent || 'section');
        let candidate = base;
        let i = 2;
        while (usedIds.has(candidate) || document.getElementById(candidate)) {
          candidate = `${base}-${i++}`;
        }
        heading.id = candidate;
      }
      usedIds.add(heading.id);

      return {
        id: heading.id,
        text: heading.textContent || heading.id,
        level: heading.tagName === 'H2' ? 2 : 3,
      };
    });

    // Build real nodes, so heading text is never parsed as HTML.
    tocRoot.textContent = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = item.level === 3 ? 'toc-item toc-item--h3' : 'toc-item';
      const a = document.createElement('a');
      a.href = '#' + item.id;
      a.textContent = item.text;
      li.appendChild(a);
      tocRoot.appendChild(li);
    });
    const tocContainer = document.querySelector('.post-toc');
    if (tocContainer) tocContainer.hidden = false;
  }

  document.addEventListener('DOMContentLoaded', buildToc);
})();
