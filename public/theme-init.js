try {
  const saved = localStorage.getItem('theme');
  document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
} catch {}
