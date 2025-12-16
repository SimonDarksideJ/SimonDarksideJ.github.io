(function() {
  const THEME_KEY = 'theme-preference';
  const THEME_ATTR = 'data-theme';
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  
  function getStoredThemePreference() {
    const stored = localStorage.getItem(THEME_KEY);
    return (stored === 'light' || stored === 'dark') ? stored : null;
  }

  function getEffectiveTheme() {
    const attr = document.documentElement.getAttribute(THEME_ATTR);
    if (attr === 'dark' || attr === 'light') return attr;
    return mq.matches ? 'dark' : 'light';
  }
  
  function setTheme(theme, persist) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    if (persist) {
      localStorage.setItem(THEME_KEY, theme);
    }
  }
  
  function toggleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next, true);
  }
  
  const storedTheme = getStoredThemePreference();
  if (storedTheme) {
    setTheme(storedTheme, false);
  } else {
    // Respect system/browser preference by keeping `auto`.
    document.documentElement.setAttribute(THEME_ATTR, 'auto');
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
  });
})();
