// theme-toggle.js

export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');

  // Apply stored theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  });
}
