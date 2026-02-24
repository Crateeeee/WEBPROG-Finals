<template>
  <div class="docs-page">
    <div class="docs-container">
      <header class="docs-header">
        <h1>Documentation</h1>
        <p>Technologies and resources used in this project.</p>
      </header>

      <section class="docs-section">
        <h2>Frontend</h2>
        <ul>
          <li><strong>Vue.js 3</strong> — JavaScript framework</li>
          <li><strong>Vite</strong> — Build tool</li>
          <li><strong>Vue Router</strong> — SPA routing</li>
          <li><strong>CSS3</strong> — Styling with custom properties</li>
        </ul>
      </section>

      <section class="docs-section">
        <h2>Backend</h2>
        <ul>
          <li><strong>NestJS</strong> — Node.js REST API framework</li>
          <li><strong>Supabase</strong> — Database (PostgreSQL)</li>
          <li><strong>TypeScript</strong> — Type-safe JavaScript</li>
        </ul>
      </section>

      <section class="docs-section">
        <h2>Deployment</h2>
        <ul>
          <li><strong>Vercel</strong> — Hosting for frontend & backend</li>
          <li><strong>GitHub</strong> — Version control</li>
        </ul>
      </section>

      <section class="docs-section">
        <h2>AI Tools</h2>
        <ul>
          <li><strong>GitHub Copilot</strong> — Code assistance</li>
        </ul>
      </section>

      <section class="docs-section">
        <h2>Resources</h2>
        <ul>
          <li><a href="https://vuejs.org/" target="_blank">Vue.js Docs</a></li>
          <li><a href="https://docs.nestjs.com/" target="_blank">NestJS Docs</a></li>
          <li><a href="https://supabase.com/docs" target="_blank">Supabase Docs</a></li>
          <li><a href="https://fontawesome.com/" target="_blank">Font Awesome</a></li>
        </ul>
      </section>

      <footer class="docs-footer">
        <router-link to="/">← Back to Home</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Documentation'
}
</script>

<style scoped>
.docs-page {
  min-height: 100vh;
  padding: calc(var(--nav-height) + 3rem) 0 4rem;
  background: var(--bg-main);
}

.docs-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.docs-header {
  margin-bottom: 3rem;
}

.docs-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.docs-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.docs-section {
  margin-bottom: 2.5rem;
}

.docs-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.docs-section ul {
  list-style: none;
  padding: 0;
}

.docs-section li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.docs-section li:last-child {
  border-bottom: none;
}

.docs-section li strong {
  color: var(--text-primary);
}

.docs-section a {
  color: var(--primary);
  text-decoration: none;
}

.docs-section a:hover {
  text-decoration: underline;
}

.docs-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.docs-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.docs-footer a:hover {
  text-decoration: underline;
}
</style>
