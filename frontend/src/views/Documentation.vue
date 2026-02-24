<template>
  <div class="docs-page">
    <!-- Background -->
    <div class="docs-bg">
      <div class="docs-gradient"></div>
    </div>

    <div class="docs-container">
      <!-- Header -->
      <header class="docs-header">
        <h1 class="docs-title">
          <i class="fas fa-book"></i>
          Project Documentation
        </h1>
        <p class="docs-subtitle">
          A comprehensive breakdown of the technologies, tools, and resources used to build this portfolio.
        </p>
      </header>

      <!-- Frontend Stack -->
      <section class="docs-section">
        <h2 class="section-title">
          <i class="fas fa-layer-group"></i>
          Frontend Stack
        </h2>
        <div class="tech-grid">
          <div class="tech-card" v-for="tech in frontendStack" :key="tech.name">
            <div class="tech-icon" :style="{ background: tech.gradient }">
              <i :class="tech.icon"></i>
            </div>
            <div class="tech-info">
              <h3>{{ tech.name }}</h3>
              <p>{{ tech.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Backend & Services -->
      <section class="docs-section">
        <h2 class="section-title">
          <i class="fas fa-server"></i>
          Backend & Services
        </h2>
        <div class="tech-grid">
          <div class="tech-card" v-for="tech in backendStack" :key="tech.name">
            <div class="tech-icon" :style="{ background: tech.gradient }">
              <i :class="tech.icon"></i>
            </div>
            <div class="tech-info">
              <h3>{{ tech.name }}</h3>
              <p>{{ tech.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Dev Tools -->
      <section class="docs-section">
        <h2 class="section-title">
          <i class="fas fa-tools"></i>
          Dev Tools & Deployment
        </h2>
        <div class="tech-grid small">
          <div class="tech-card compact" v-for="tool in devTools" :key="tool.name">
            <div class="tech-icon small" :style="{ background: tool.gradient }">
              <i :class="tool.icon"></i>
            </div>
            <div class="tech-info">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI Tools -->
      <section class="docs-section">
        <h2 class="section-title">
          <i class="fas fa-robot"></i>
          AI Models & Prompts Used
        </h2>
        <p class="section-intro">
          AI-assisted development was used extensively throughout this project. Below are the models used and example prompts that shaped the codebase.
        </p>
        
        <div class="ai-grid">
          <div class="ai-card" v-for="ai in aiTools" :key="ai.name">
            <div class="ai-header">
              <div class="ai-icon" :style="{ background: ai.gradient }">
                <i :class="ai.icon"></i>
              </div>
              <div class="ai-title">
                <h3>{{ ai.name }}</h3>
                <span class="ai-provider">{{ ai.provider }}</span>
              </div>
            </div>
            <p class="ai-description">{{ ai.description }}</p>
            <div class="prompts-section">
              <h4>Example Prompts</h4>
              <ol class="prompt-list">
                <li v-for="(prompt, idx) in ai.prompts" :key="idx">
                  {{ prompt }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Architecture -->
      <section class="docs-section">
        <h2 class="section-title">
          <i class="fas fa-folder-tree"></i>
          Project Architecture
        </h2>
        
        <div class="architecture-grid">
          <div class="arch-card">
            <h3><i class="fas fa-desktop"></i> Frontend Structure</h3>
            <pre class="code-block"><code>frontend/
├── src/
│   ├── views/
│   │   ├── Home.vue         # Landing + Gallery + Bands
│   │   ├── Music.vue        # Music player page
│   │   ├── Guestbook.vue    # Live chat/guestbook
│   │   └── Documentation.vue # This page
│   ├── components/
│   │   ├── Navbar.vue       # Navigation bar
│   │   ├── Footer.vue       # Site footer
│   │   └── MusicPlayer.vue  # Floating music player
│   ├── stores/
│   │   └── musicStore.js    # Shared music state
│   ├── router/
│   │   └── index.js         # Vue Router config
│   ├── services/
│   │   └── api.js           # Backend API calls
│   └── assets/
│       └── styles/          # Global CSS
├── public/
│   ├── images/              # Album covers, photos
│   └── music/               # Audio files
└── vite.config.js           # Vite configuration</code></pre>
          </div>
          
          <div class="arch-card">
            <h3><i class="fas fa-server"></i> Backend Structure</h3>
            <pre class="code-block"><code>backend/
├── src/
│   ├── main.ts              # NestJS bootstrap
│   ├── app.module.ts        # Root module
│   ├── messages/
│   │   ├── controller.ts    # REST endpoints
│   │   ├── service.ts       # Business logic
│   │   ├── module.ts        # DI wiring
│   │   └── dto/             # Validation schemas
│   └── supabase/
│       └── service.ts       # Supabase client
├── nest-cli.json
├── tsconfig.json
└── vercel.json              # Serverless config</code></pre>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="docs-section">
        <h2 class="section-title">
          <i class="fas fa-cogs"></i>
          How It Works
        </h2>
        
        <div class="steps-grid">
          <div class="step-card" v-for="(step, idx) in howItWorks" :key="idx">
            <div class="step-number">{{ idx + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- References -->
      <section class="docs-section">
        <h2 class="section-title">
          <i class="fas fa-link"></i>
          References & Resources
        </h2>
        
        <div class="refs-grid">
          <a 
            v-for="ref in references" 
            :key="ref.title"
            :href="ref.url" 
            target="_blank" 
            class="ref-card"
          >
            <div class="ref-icon">
              <i :class="ref.icon"></i>
            </div>
            <div class="ref-info">
              <h3>{{ ref.title }}</h3>
              <p>{{ ref.description }}</p>
              <span class="ref-url">{{ ref.url }}</span>
            </div>
            <i class="fas fa-external-link-alt ref-external"></i>
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="docs-footer">
        <p>Built with 💜 by Crate</p>
        <p class="copyright">CRATE STUDIO © 2026 — All rights reserved.</p>
        <div class="footer-links">
          <router-link to="/" class="footer-link">
            <i class="fas fa-arrow-left"></i> Back to Home
          </router-link>
          <router-link to="/music" class="footer-link">
            View Music <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Documentation',
  data() {
    return {
      frontendStack: [
        {
          name: 'Vue.js 3',
          icon: 'fab fa-vuejs',
          gradient: 'linear-gradient(135deg, #42b883 0%, #35495e 100%)',
          description: 'Progressive JavaScript framework for building reactive user interfaces with composition API.'
        },
        {
          name: 'Vite',
          icon: 'fas fa-bolt',
          gradient: 'linear-gradient(135deg, #646cff 0%, #bd34fe 100%)',
          description: 'Lightning-fast build tool and dev server with Hot Module Replacement (HMR).'
        },
        {
          name: 'Vue Router',
          icon: 'fas fa-route',
          gradient: 'linear-gradient(135deg, #42b883 0%, #64b587 100%)',
          description: 'Official router for Vue.js enabling single-page application navigation.'
        },
        {
          name: 'CSS3 / Custom Properties',
          icon: 'fab fa-css3-alt',
          gradient: 'linear-gradient(135deg, #264de4 0%, #2965f1 100%)',
          description: 'Modern CSS with custom properties for theming and responsive design.'
        },
        {
          name: 'Font Awesome',
          icon: 'fab fa-font-awesome',
          gradient: 'linear-gradient(135deg, #228ae6 0%, #339af0 100%)',
          description: 'Icon library providing consistent iconography across the application.'
        },
        {
          name: 'Google Fonts',
          icon: 'fas fa-font',
          gradient: 'linear-gradient(135deg, #ea4335 0%, #fbbc04 100%)',
          description: 'Inter font family for clean, modern typography throughout the site.'
        }
      ],
      backendStack: [
        {
          name: 'NestJS',
          icon: 'fas fa-feather-alt',
          gradient: 'linear-gradient(135deg, #e0234e 0%, #d91a3c 100%)',
          description: 'Progressive Node.js framework for building efficient, scalable REST APIs.'
        },
        {
          name: 'Supabase',
          icon: 'fas fa-database',
          gradient: 'linear-gradient(135deg, #3ecf8e 0%, #1a936f 100%)',
          description: 'Open-source Firebase alternative providing PostgreSQL database and authentication.'
        },
        {
          name: 'PostgreSQL',
          icon: 'fas fa-elephant',
          gradient: 'linear-gradient(135deg, #336791 0%, #2f5f8a 100%)',
          description: 'Powerful relational database powering the guestbook and message storage.'
        },
        {
          name: 'TypeScript',
          icon: 'fab fa-js-square',
          gradient: 'linear-gradient(135deg, #3178c6 0%, #235a97 100%)',
          description: 'Typed superset of JavaScript for safer, more scalable backend code.'
        }
      ],
      devTools: [
        {
          name: 'Vercel',
          icon: 'fas fa-cloud-upload-alt',
          gradient: 'linear-gradient(135deg, #000 0%, #333 100%)',
          description: 'Frontend & backend deployment with zero-config CI/CD'
        },
        {
          name: 'Git + GitHub',
          icon: 'fab fa-github',
          gradient: 'linear-gradient(135deg, #24292e 0%, #404448 100%)',
          description: 'Version control and collaborative development'
        },
        {
          name: 'npm',
          icon: 'fab fa-npm',
          gradient: 'linear-gradient(135deg, #cb3837 0%, #a02c2c 100%)',
          description: 'Package manager for JavaScript dependencies'
        },
        {
          name: 'ESLint',
          icon: 'fas fa-search-plus',
          gradient: 'linear-gradient(135deg, #4b32c3 0%, #8080f2 100%)',
          description: 'Linting and code quality enforcement'
        },
        {
          name: 'VS Code',
          icon: 'fas fa-code',
          gradient: 'linear-gradient(135deg, #007acc 0%, #0065a9 100%)',
          description: 'Primary code editor with extensions'
        },
        {
          name: 'Chrome DevTools',
          icon: 'fab fa-chrome',
          gradient: 'linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc05 75%, #ea4335 100%)',
          description: 'Debugging and performance profiling'
        }
      ],
      aiTools: [
        {
          name: 'GitHub Copilot',
          provider: 'Claude Opus 4.5',
          icon: 'fab fa-github',
          gradient: 'linear-gradient(135deg, #6e40c9 0%, #238636 100%)',
          description: 'In-editor AI pair programmer providing auto-completions, inline suggestions, and chat-based coding assistance throughout the entire project.',
          prompts: [
            'Create a music player component with playlist, shuffle, repeat, and volume controls using Vue 3 composition.',
            'Build a responsive gallery with lightbox, filtering by category, and masonry-style grid layout.',
            'Implement a guestbook with NestJS backend, Supabase integration, and real-time message display.'
          ]
        },
        {
          name: 'Claude',
          provider: 'Anthropic',
          icon: 'fas fa-brain',
          gradient: 'linear-gradient(135deg, #cc785c 0%, #d4a574 100%)',
          description: 'Used for complex reasoning — designing the overall architecture, debugging layout issues, and structuring the component hierarchy.',
          prompts: [
            'Help me architect a portfolio page with bands section, gallery, and integrated music player.',
            'Debug why the navbar highlighting fires for multiple sections — implement proper scroll detection.',
            'Refactor the music store to support shuffle and repeat functionality across components.'
          ]
        },
        {
          name: 'ChatGPT',
          provider: 'OpenAI',
          icon: 'fas fa-robot',
          gradient: 'linear-gradient(135deg, #10a37f 0%, #1a7f64 100%)',
          description: 'Quick iterations — generating component boilerplate, CSS animations, and writing documentation.',
          prompts: [
            'Generate CSS keyframes for a spinning vinyl record animation with pause state.',
            'Create a responsive card grid for band projects with YouTube video embeds.',
            'Write a mobile-friendly navigation with smooth scroll and active state detection.'
          ]
        }
      ],
      howItWorks: [
        {
          title: 'Landing Page',
          description: 'The homepage showcases band projects with YouTube video embeds, a gallery with lightbox viewer, and an about section with animated elements.'
        },
        {
          title: 'Music Player',
          description: 'A floating music player persists across pages, streaming original tracks. The dedicated Music page provides full playback controls, playlist view, and recommendations.'
        },
        {
          title: 'Gallery System',
          description: 'Photos are displayed in a masonry grid with category filtering. Clicking opens a lightbox with navigation controls and keyboard shortcuts.'
        },
        {
          title: 'Live Guestbook',
          description: 'Visitors leave messages with optional nicknames via a NestJS REST API backed by Supabase/PostgreSQL. Messages display in real-time.'
        },
        {
          title: 'Theming',
          description: 'Dark and light themes are supported via CSS custom properties. The theme preference persists in localStorage across sessions.'
        },
        {
          title: 'Deployment',
          description: 'Both frontend and backend deploy to Vercel with automatic CI/CD from GitHub pushes. The frontend uses SPA routing configuration.'
        }
      ],
      references: [
        {
          title: 'Vue.js Documentation',
          icon: 'fab fa-vuejs',
          description: 'Official Vue 3 documentation for component patterns and reactivity.',
          url: 'https://vuejs.org/'
        },
        {
          title: 'NestJS Documentation',
          icon: 'fas fa-feather-alt',
          description: 'Official docs for building scalable Node.js applications.',
          url: 'https://docs.nestjs.com/'
        },
        {
          title: 'Supabase Documentation',
          icon: 'fas fa-database',
          description: 'Guides for database, auth, and realtime features.',
          url: 'https://supabase.com/docs'
        },
        {
          title: 'Spotify for Developers',
          icon: 'fab fa-spotify',
          description: 'Web API docs for music integration and metadata.',
          url: 'https://developer.spotify.com/'
        },
        {
          title: 'Font Awesome Icons',
          icon: 'fab fa-font-awesome',
          description: 'Icon library documentation and search.',
          url: 'https://fontawesome.com/'
        },
        {
          title: 'CSS-Tricks',
          icon: 'fab fa-css3-alt',
          description: 'CSS techniques for animations and layouts.',
          url: 'https://css-tricks.com/'
        }
      ]
    }
  }
}
</script>

<style scoped>
.docs-page {
  min-height: 100vh;
  padding: calc(var(--nav-height) + 2rem) 0 4rem;
  position: relative;
}

.docs-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.docs-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at top left, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(var(--primary-rgb), 0.05) 0%, transparent 50%),
    var(--bg-main);
}

.docs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.docs-header {
  text-align: center;
  margin-bottom: 4rem;
}

.docs-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.docs-title i {
  color: var(--primary);
}

.docs-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Sections */
.docs-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border-color);
}

.section-title i {
  color: var(--primary);
}

.section-intro {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Tech Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.tech-grid.small {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.tech-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.tech-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.tech-card.compact {
  padding: 1rem;
}

.tech-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tech-icon.small {
  width: 44px;
  height: 44px;
}

.tech-icon i {
  font-size: 1.5rem;
  color: white;
}

.tech-icon.small i {
  font-size: 1.2rem;
}

.tech-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tech-card.compact .tech-info h3 {
  font-size: 1rem;
}

.tech-info p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* AI Grid */
.ai-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.ai-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.ai-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ai-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-icon i {
  font-size: 1.5rem;
  color: white;
}

.ai-title h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.ai-provider {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.ai-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.prompts-section h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.prompt-list {
  list-style: none;
  padding: 0;
  counter-reset: prompt;
}

.prompt-list li {
  position: relative;
  padding-left: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  background: var(--bg-main);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--primary);
  counter-increment: prompt;
}

.prompt-list li::before {
  content: counter(prompt);
  position: absolute;
  left: 0.5rem;
  font-weight: 700;
  color: var(--primary);
}

/* Architecture */
.architecture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.arch-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.arch-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.arch-card h3 i {
  color: var(--primary);
}

.code-block {
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.85rem;
}

.code-block code {
  font-family: 'Fira Code', 'Monaco', monospace;
  color: var(--text-secondary);
  white-space: pre;
  line-height: 1.6;
}

/* Steps */
.steps-grid {
  display: grid;
  gap: 1rem;
}

.step-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.step-card:hover {
  border-color: var(--primary);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.step-content p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* References */
.refs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
}

.ref-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.ref-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.ref-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--bg-main);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ref-icon i {
  font-size: 1.25rem;
  color: var(--primary);
}

.ref-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.ref-info p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.ref-url {
  font-size: 0.75rem;
  color: var(--text-muted);
  word-break: break-all;
}

.ref-external {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.ref-card:hover .ref-external {
  opacity: 1;
}

/* Footer */
.docs-footer {
  text-align: center;
  padding-top: 3rem;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
}

.docs-footer p {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.footer-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease;
}

.footer-link:hover {
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .docs-title {
    font-size: 2rem;
  }
  
  .docs-subtitle {
    font-size: 1rem;
  }
  
  .tech-grid,
  .ai-grid,
  .refs-grid {
    grid-template-columns: 1fr;
  }
  
  .architecture-grid {
    grid-template-columns: 1fr;
  }
  
  .docs-container {
    padding: 0 1rem;
  }
}
</style>
