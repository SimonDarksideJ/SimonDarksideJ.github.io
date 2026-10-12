(function() {
  const THEME_KEY = 'theme-preference';
  const THEME_ATTR = 'data-theme';
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  // Storage can throw when blocked (private windows, strict privacy settings),
  // so every access is guarded and the toggle still works for the current page.
  function readStored() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return (stored === 'light' || stored === 'dark') ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function writeStored(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // Ignore: the choice applies to this page only.
    }
  }

  function getEffectiveTheme() {
    const attr = document.documentElement.getAttribute(THEME_ATTR);
    if (attr === 'dark' || attr === 'light') return attr;
    return mq.matches ? 'dark' : 'light';
  }

  // Tell other scripts (such as the comments widget) which theme is now showing.
  function announce() {
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: getEffectiveTheme() } }));
  }

  function setTheme(theme, persist) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    if (persist) {
      writeStored(theme);
    }
    announce();
  }

  function toggleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next, true);
  }

  // The inline script in the page head has usually applied a stored theme already.
  const storedTheme = readStored();
  if (storedTheme) {
    document.documentElement.setAttribute(THEME_ATTR, storedTheme);
  } else {
    // Respect system/browser preference by keeping `auto`.
    document.documentElement.setAttribute(THEME_ATTR, 'auto');
  }

  // In auto mode, follow the system setting when it changes.
  mq.addEventListener('change', function() {
    if (!readStored()) announce();
  });

  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
  });
})();
