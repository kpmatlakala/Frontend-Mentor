import { useEffect, useMemo, useState } from 'react'
import projectsData from './data/projects'

const categories = [
  { key: 'Getting Started', icon: '🚀' },
  { key: 'Responsive Design Fundamentals', icon: '📱' },
  { key: 'JavaScript Fundamentals', icon: '🌐' },
  { key: 'Challenges', icon: '⚡' },
]

const levelLabels = ['Newbie', 'Intermediate', 'Advanced', 'Expert']

function normalizeImagePath(imageUrl) {
  if (!imageUrl) {
    return ''
  }

  return imageUrl.replace('/assets/previews/', '/previews/')
}

function ProjectCard({ project }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <article className={project.isGhost ? 'project-card ghost-card' : 'project-card'}>
      <div className="project-image-wrapper">
        {project.isGhost || hasImageError ? (
          <div className="ghost-image">+</div>
        ) : (
          <img
            src={normalizeImagePath(project.imageUrl)}
            alt={project.title}
            loading="lazy"
            onError={() => setHasImageError(true)}
          />
        )}
        <div className="project-level" data-level={project.level}>
          {levelLabels[(project.level || 1) - 1] || 'Newbie'}
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description || 'Frontend Mentor challenge project.'}</p>

        <div className="tech-stack">
          {(project.technologies || []).map((tech) => (
            <span key={`${project.title}-${tech}`} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-footer">
          {project.comingSoon ? (
            <div className="coming-soon">Coming Soon...</div>
          ) : (
            <>
              <a className="btn btn-primary" href={project.demoUrl} target="_blank" rel="noreferrer">
                Live Demo
              </a>
              {project.feSolutionLink ? (
                <a
                  className="btn btn-secondary"
                  href={project.feSolutionLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Frontend Mentor solution for ${project.title}`}
                  title="Frontend Mentor Solution"
                >
                  FM
                </a>
              ) : null}
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [, setIsLightTheme] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const light = savedTheme === 'light'

    setIsLightTheme(light)
    document.body.classList.toggle('light', light)
  }, [])

  const toggleTheme = () => {
    setIsLightTheme((previous) => {
      const next = !previous
      document.body.classList.toggle('light', next)
      localStorage.setItem('theme', next ? 'light' : 'dark')
      return next
    })
  }

  const totals = useMemo(() => {
    let totalProjects = 0
    let completedProjects = 0

    categories.forEach(({ key }) => {
      const projects = projectsData[key] || []
      totalProjects += projects.length
      completedProjects += projects.filter((project) => !project.comingSoon).length
    })

    return {
      totalProjects,
      completedProjects,
      inProgressProjects: totalProjects - completedProjects,
    }
  }, [])

  return (
    <>
      <header className="hero">
        <nav className="hero-nav">
          <span className="hero-name">Kabelo Matlakala</span>

          <div className="hero-actions">
            <a href="#projects">Projects</a>
            <a href="mailto:matlakalakabelo1@gmail.com">Contact</a>

            <button
              type="button"
              className="theme-toggle"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              <svg className="icon icon-moon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>

              <svg className="icon icon-sun" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <g>
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
              </svg>
            </button>
          </div>
        </nav>

        <div className="hero-center">
          <h1 className="hero-title">FRONTEND<br />MENTOR</h1>

          <p className="hero-subtitle">
            Personal challenge log - building, refining, and shipping real-world UI components
          </p>

          <div className="hero-links">
            <a href="https://github.com/kabelomatlakala" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="#projects">Challenges</a>
            <a href="https://www.frontendmentor.io/" target="_blank" rel="noreferrer">
              Frontend Mentor
            </a>
          </div>
        </div>

        <div className="hero-footer">
          <span>Based in South Africa</span>
          <span>
            {totals.completedProjects}/{totals.totalProjects} completed
          </span>
        </div>
      </header>

      <main>
        <section id="projects">
          <div className="section-header">
            <div className="section-line"></div>
            <h2>Frontend Mentor Challenges</h2>
          </div>

          <div className="accordion" id="projects-accordion">
            {categories.map(({ key, icon }, index) => {
              const projects = projectsData[key] || []
              const isActive = activeIndex === index

              return (
                <div key={key} className={`accordion-item ${isActive ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    aria-expanded={isActive}
                    aria-controls={`accordion-panel-${index}`}
                  >
                    <div className="accordion-title-wrapper">
                      <span className="accordion-icon">{icon}</span>
                      <span className="accordion-title">{key}</span>
                      <span className="accordion-count">{projects.length}</span>
                    </div>
                    <svg className="accordion-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div id={`accordion-panel-${index}`} className="accordion-content">
                    <div className="projects">
                      {projects.map((project) => (
                        <ProjectCard key={`${key}-${project.title}`} project={project} />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <div className="info-card">
            <h2>
              <span>Tools</span> Tech Stack
            </h2>

            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-check">✓</span>
                <span>HTML5 & CSS3</span>
              </div>
              <div className="tech-item">
                <span className="tech-check">✓</span>
                <span>JavaScript (ES6+)</span>
              </div>
              <div className="tech-item">
                <span className="tech-check">✓</span>
                <span>Responsive Design</span>
              </div>
              <div className="tech-item">
                <span className="tech-check">✓</span>
                <span>Accessibility</span>
              </div>
              <div className="tech-item">
                <span className="tech-check">✓</span>
                <span>Git & GitHub</span>
              </div>
              <div className="tech-item">
                <span className="tech-check">✓</span>
                <span>React & Tailwind</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-about">
            <p>
              <strong>Kabelo P. Matlakala</strong> - fullstack developer focused on building and refining real-world
              UI through Frontend Mentor challenges.
            </p>
          </div>

          <div className="footer-links">
            <a href="https://github.com/kabelomatlakala" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="#projects">Challenges</a>
            <a href="https://www.frontendmentor.io/" target="_blank" rel="noreferrer">
              Frontend Mentor
            </a>
            <a href="mailto:matlakalakabelo1@gmail.com">Email</a>
          </div>

          <div className="footer-meta">
            <span>South Africa</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
