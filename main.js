// main.js
import { initThemeToggle } from './scripts/theme-toggle.js';
import { initAccordion } from './scripts/accordion.js';
import { renderProjects } from './scripts/projects-renderer.js';

document.addEventListener('DOMContentLoaded', 
  () => {
  initThemeToggle();
  initAccordion();
  renderProjects();
});
