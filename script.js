(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let hasPreference = false;

  try {
    const saved = localStorage.getItem('theme');
    hasPreference = saved === 'light' || saved === 'dark';
  } catch (_) { /* The toggle also works when browser storage is unavailable. */ }

  const updateToggle = () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${next} mode`;
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    document.querySelector('meta[name="theme-color"]').content =
      root.dataset.theme === 'dark' ? '#0c1421' : '#f6f7f9';
  };

  toggle.hidden = false;
  updateToggle();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    hasPreference = true;
    try { localStorage.setItem('theme', root.dataset.theme); } catch (_) {}
    updateToggle();
  });

  systemTheme.addEventListener('change', (event) => {
    if (hasPreference) return;
    root.dataset.theme = event.matches ? 'dark' : 'light';
    updateToggle();
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
