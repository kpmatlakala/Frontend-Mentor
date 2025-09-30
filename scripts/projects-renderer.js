// projects-renderer.js

import { projectsData } from './projects-data.js'; // This must export the data

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = project.isGhost ? 'project-card ghost-card' : 'project-card';

  if (project.isGhost) {
    const ghostImage = document.createElement('div');
    ghostImage.className = 'ghost-image';
    card.appendChild(ghostImage);
  } else {
    const img = document.createElement('img');
    img.src = project.imageUrl;
    img.alt = project.title;
    card.appendChild(img);
  }

  const title = document.createElement('h3');
  title.textContent = project.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = project.description;
  card.appendChild(description);

  const techStack = document.createElement('div');
  techStack.className = 'tech-stack';
  project.technologies.forEach(tech => {
    const techTag = document.createElement('span');
    techTag.className = 'tech-tag';
    techTag.textContent = tech;
    techStack.appendChild(techTag);
  });
  card.appendChild(techStack);

  const level = document.createElement('div');
  level.className = 'project-level';
  level.setAttribute('data-level', project.level);
  level.textContent = ` ${project.level} | ${['Newbie', 'Intermediate', 'Advanced', 'Expert'][project.level - 1]}`;
  card.appendChild(level);

  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';

  if (project.comingSoon) {
    const comingSoon = document.createElement('p');
    comingSoon.textContent = 'Coming Soon...';
    cardFooter.appendChild(comingSoon);
  } else {
    const link = document.createElement('a');
    link.href = project.demoUrl;
    link.target = '_blank';
    link.textContent = 'Live Demo';
    cardFooter.appendChild(link);
  }

  card.appendChild(cardFooter);
  return card;
}

export function renderProjects() {
  const categories = ['Getting Started', 'Responsive Design Fundamentals', 'Challenges'];

  categories.forEach((category, index) => {
    const section = document.querySelectorAll('.accordion-item')[index]?.querySelector('.projects');
    if (section) {
      section.innerHTML = '';
      projectsData[category].forEach(project => {
        section.appendChild(createProjectCard(project));
      });
    }
  });
}
