// main.js
// import { initThemeToggle } from './scripts/theme-toggle.js';
// import { initAccordion } from './scripts/accordion.js';
// import { renderProjects } from './scripts/projects-renderer.js';

// document.addEventListener('DOMContentLoaded', 
//   () => {
//   initThemeToggle();
//   initAccordion();
//   renderProjects();
// });


// Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle-icon');
    
    // Check saved theme or default to dark
    let currentTheme = 'dark';
    
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.classList.toggle('light', currentTheme === 'light');
      themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    });

    // Accordion functionality
    function initAccordion() {
      const accordionHeaders = document.querySelectorAll('.accordion-header');
      
      accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
          const item = header.parentElement;
          const isActive = item.classList.contains('active');
          
          // Close all
          document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
          });
          
          // Open clicked if it wasn't active
          if (!isActive) {
            item.classList.add('active');
          }
        });
      });
      
      // Open first by default
      const firstItem = document.querySelector('.accordion-item');
      if (firstItem) {
        firstItem.classList.add('active');
      }
    }

    // Create project card
    function createProjectCard(project) {
      const card = document.createElement('div');
      card.className = project.isGhost ? 'project-card ghost-card' : 'project-card';
      
      const levelLabels = ['Newbie', 'Intermediate', 'Advanced', 'Expert'];
      
      card.innerHTML = `
        <div class="project-image-wrapper">
          ${project.isGhost 
            ? '<div class="ghost-image">+</div>' 
            : `<img src="${project.imageUrl}" alt="${project.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22180%22%3E%3Crect fill=%22%23374151%22 width=%22320%22 height=%22180%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239CA3AF%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E'">`
          }
          <div class="project-level" data-level="${project.level}">
            ${levelLabels[project.level - 1]}
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="tech-stack">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-footer">
            ${project.comingSoon 
              ? '<div class="coming-soon">Coming Soon...</div>'
              : `
                <a href="${project.demoUrl}" target="_blank" class="btn btn-primary">Live Demo</a>
                ${project.feSolutionLink 
                  ? `<a href="${project.feSolutionLink}" target="_blank" class="btn btn-secondary" title="Frontend Mentor Solution">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    </a>`
                  : ''
                }
              `
            }
          </div>
        </div>
      `;
      
      return card;
    }

    // Render projects
    function renderProjects() {
      const accordion = document.getElementById('projects-accordion');
      const categories = [
        { key: 'Getting Started', icon: '🚀' },
        { key: 'Responsive Design Fundamentals', icon: '📱' },
        { key: 'Challenges', icon: '⚡' }
      ];
      
      let totalProjects = 0;
      let completedProjects = 0;
      let inProgressProjects = 0;
      
      categories.forEach(({ key, icon }) => {
        const projects = projectsData[key];
        const completed = projects.filter(p => !p.comingSoon).length;
        const inProgress = projects.filter(p => p.comingSoon).length;
        
        totalProjects += projects.length;
        completedProjects += completed;
        inProgressProjects += inProgress;
        
        const item = document.createElement('div');
        item.className = 'accordion-item';
        
        item.innerHTML = `
          <button class="accordion-header">
            <div class="accordion-title-wrapper">
              <span class="accordion-icon">${icon}</span>
              <span class="accordion-title">${key}</span>
              <span class="accordion-count">${projects.length}</span>
            </div>
            <svg class="accordion-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="accordion-content">
            <div class="projects"></div>
          </div>
        `;
        
        const projectsContainer = item.querySelector('.projects');
        projects.forEach(project => {
          projectsContainer.appendChild(createProjectCard(project));
        });
        
        accordion.appendChild(item);
      });
      
      // Update stats
      // document.getElementById('total-count').textContent = totalProjects;
      // document.getElementById('completed-count').textContent = completedProjects;
      // document.getElementById('progress-count').textContent = inProgressProjects;
      
      initAccordion();
    }

    // Initialize when DOM is ready
    renderProjects();
