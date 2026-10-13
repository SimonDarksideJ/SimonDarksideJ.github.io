(function() {
  let searchIndex = [];
  
  async function loadSearchIndex(url) {
    try {
      const response = await fetch(url || '/search.json');
      searchIndex = await response.json();
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  }
  
  function tokenize(text, minLen) {
    const min = typeof minLen === 'number' ? minLen : 3;
    return text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(word => word.length >= min);
  }

  function tokenMatches(tokens, queryToken) {
    if (!Array.isArray(tokens) || !queryToken) return false;
    const token = String(queryToken).toLowerCase();

    // Avoid substring matches for short tokens like "ai" (e.g. matching "rAIls").
    if (token.length <= 2) return tokens.includes(token);

    return tokens.some(t => String(t).includes(token));
  }
  
  function search(query, limit) {
    if (!query || query.length < 2) return [];
    const queryTokens = tokenize(query, 2);
    const results = [];
    
    searchIndex.forEach(post => {
      let score = 0;
      const titleTokens = tokenize(post.title, 2);
      const descTokens = tokenize(post.description || '', 2);
      const tagTokens = Array.isArray(post.tags)
        ? post.tags.flatMap(t => tokenize(String(t), 2))
        : tokenize(String(post.tags || ''), 2);
      
      queryTokens.forEach(token => {
        if (tokenMatches(titleTokens, token)) score += 10;
        if (tokenMatches(tagTokens, token)) score += 7;
        if (tokenMatches(descTokens, token)) score += 3;
      });
      
      if (score > 0) results.push({ post, score });
    });
    
    const sorted = results.sort((a, b) => b.score - a.score);
    if (typeof limit === 'number') return sorted.slice(0, limit);
    return sorted;
  }

  function getQueryParam() {
    try {
      return new URLSearchParams(window.location.search).get('q') || '';
    } catch {
      return '';
    }
  }

  function setQueryParam(query) {
    const q = (query || '').trim();
    const url = new URL(window.location.href);
    if (q) {
      url.searchParams.set('q', q);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  function updatePaginationLinks(query) {
    const q = (query || '').trim();
    const links = Array.from(document.querySelectorAll('.pagination a'));

    links.forEach(link => {
      if (!link.dataset.baseHref) link.dataset.baseHref = link.getAttribute('href') || '';
      const baseHref = link.dataset.baseHref;

      if (!q) {
        link.setAttribute('href', baseHref);
        return;
      }

      const url = new URL(baseHref, window.location.origin);
      url.searchParams.set('q', q);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    });
  }

  function getCurrentPageNumber() {
    const match = window.location.pathname.match(/\/page\/(\d+)\/?$/);
    const page = match ? parseInt(match[1], 10) : 1;
    return Number.isFinite(page) && page > 0 ? page : 1;
  }

  function pagePath(pageNumber) {
    return pageNumber <= 1 ? '/' : `/page/${pageNumber}/`;
  }

  function resolveImageSrc(img) {
    const fallback = '/assets/img/banners/default-post-banner.svg';
    if (!img || String(img).trim() === '') return fallback;

    const value = String(img);
    if (value.includes('://')) return value;
    if (value.startsWith('/')) return value;
    return '/assets/img/' + value;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderPostCard(post) {
    const title = escapeHtml(post.title || '');
    const url = escapeHtml(post.url || '#');
    const date = escapeHtml(post.date || '');
    // Truncate before escaping, so an entity such as &amp; is never cut in half.
    const rawDesc = (post.description || post.excerpt || '').trim();
    const desc = escapeHtml(rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc);
    const tags = Array.isArray(post.tags) ? post.tags : [];
    const tagsAttr = tags.map(t => String(t).toLowerCase()).join(',');
    const imgSrc = escapeHtml(resolveImageSrc(post.img));
    // Animated headers are WebM videos with the still image as poster.
    const media = post.video
      ? `<video autoplay loop muted playsinline preload="none" poster="${imgSrc}"><source src="${escapeHtml(resolveImageSrc(post.video))}" type="video/webm"></video>`
      : `<img src="${imgSrc}" alt="">`;

    return `
<article class="post-card" data-tags="${escapeHtml(tagsAttr)}">
  <a class="post-card__link" href="${url}" aria-label="Read: ${title}">
    <div class="post-card__image-wrapper">
      ${media}
    </div>
    <div class="post-card__content">
      <h2 class="post-card__title">${title}</h2>
      <time>${date}</time>
      ${desc ? `<p>${desc}</p>` : ''}
      ${tags.length ? `<div class="post-card__tags" aria-label="Tags">${tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
    </div>
  </a>
</article>`;
  }

  function renderFilteredPage(query, gridEl, paginationEl, pageSize, original) {
    const q = (query || '').trim();
    const isFiltering = q.length >= 2;

    if (!isFiltering) {
      gridEl.innerHTML = original.gridHtml;
      if (paginationEl) {
        paginationEl.innerHTML = original.paginationHtml;
        paginationEl.style.display = original.paginationDisplay;
      }
      updatePaginationLinks('');
      return;
    }

    const resultsAll = search(q);
    const total = resultsAll.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    let currentPage = getCurrentPageNumber();
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pagePosts = resultsAll.slice(start, start + pageSize).map(r => r.post);
    gridEl.innerHTML = pagePosts.map(renderPostCard).join('');

    if (paginationEl) {
      if (totalPages <= 1) {
        paginationEl.style.display = 'none';
      } else {
        paginationEl.style.display = original.paginationDisplay;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;

        const prevHref = prevPage ? pagePath(prevPage) : '';
        const nextHref = nextPage ? pagePath(nextPage) : '';

        const prevLink = prevPage ? `<a href="${prevHref}?q=${encodeURIComponent(q)}" class="btn">← Previous</a>` : '';
        const nextLink = nextPage ? `<a href="${nextHref}?q=${encodeURIComponent(q)}" class="btn">Next →</a>` : '';

        paginationEl.innerHTML = `${prevLink}${nextLink}`;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('search-input');
    const gridEl = document.querySelector('.post-grid');
    // Only pages with a search box need the index, so skip the download everywhere else.
    if (!searchInput || !gridEl) return;

    await loadSearchIndex(gridEl.dataset.searchUrl);

    const paginationEl = document.querySelector('.pagination');
    // Use the configured page size, not the card count: the last page can be short.
    const configuredSize = parseInt(gridEl.dataset.pageSize, 10);
    const pageSize = configuredSize > 0 ? configuredSize : 12;

    const original = {
      gridHtml: gridEl ? gridEl.innerHTML : '',
      paginationHtml: paginationEl ? paginationEl.innerHTML : '',
      paginationDisplay: paginationEl ? (paginationEl.style.display || '') : ''
    };
    
    if (searchInput && gridEl) {
      const initialQuery = getQueryParam();
      if (initialQuery) {
        searchInput.value = initialQuery;
      }

      renderFilteredPage(searchInput.value, gridEl, paginationEl, pageSize, original);
      updatePaginationLinks(searchInput.value);

      searchInput.addEventListener('input', function() {
        setQueryParam(this.value);
        renderFilteredPage(this.value, gridEl, paginationEl, pageSize, original);
        updatePaginationLinks(this.value);
      });

      window.addEventListener('popstate', function() {
        const q = getQueryParam();
        searchInput.value = q;
        renderFilteredPage(q, gridEl, paginationEl, pageSize, original);
        updatePaginationLinks(q);
      });
    }
  });
})();
