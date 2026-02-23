<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-icon">📓</span>
            <span class="logo-text text-handwritten">Crate</span>
            <span class="logo-accent">.journal</span>
          </div>
          <p class="brand-tagline">Documenting my journey through code & creativity ✨</p>
        </div>

        <div class="footer-links">
          <h4 class="text-handwritten">Quick Links</h4>
          <ul>
            <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
            <li><a href="/#about"><i class="fas fa-user"></i> About</a></li>
            <li><a href="/#skills"><i class="fas fa-code"></i> Skills</a></li>
            <li><router-link to="/guestbook"><i class="fas fa-pen-fancy"></i> Guestbook</router-link></li>
          </ul>
        </div>

        <div class="footer-social">
          <h4 class="text-handwritten">Let's Connect!</h4>
          <div class="social-links">
            <a href="https://www.facebook.com/CrateeMarshall" target="_blank" rel="noopener" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://github.com/Crateeeee" target="_blank" rel="noopener" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/crate-marshall-pinlac-57572824a/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/@cratemarshall" target="_blank" rel="noopener" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ currentYear }} Crate Marshall Pinlac • All rights reserved</p>
        <p class="made-with">Made with <span class="heart-icon">❤️</span> using Vue.js + NestJS</p>
      </div>
      
      <div class="footer-doodles">
        <span>✨</span>
        <span>📝</span>
        <span>🌟</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(to bottom, transparent, rgba(255, 234, 167, 0.2));
  padding: 80px 0 40px;
  margin-top: auto;
  border-top: 3px dashed var(--ink-light);
  position: relative;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand .logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  font-size: 1.8rem;
  color: var(--ink-dark);
}

.logo-accent {
  color: var(--ink-purple);
  font-weight: 600;
}

.brand-tagline {
  color: var(--ink-medium);
  max-width: 300px;
  font-size: 1rem;
}

.footer-links h4,
.footer-social h4 {
  font-size: 1.5rem;
  color: var(--ink-dark);
  margin-bottom: 1.5rem;
  position: relative;
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: var(--ink-medium);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-links a i {
  font-size: 0.9rem;
  color: var(--ink-purple);
}

.footer-links a:hover {
  color: var(--ink-purple);
  transform: translateX(5px);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 45px;
  height: 45px;
  background: var(--paper-white);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-medium);
  transition: all 0.3s ease;
  border: 2px dashed var(--ink-light);
}

.social-links a:hover {
  background: var(--ink-purple);
  color: white;
  transform: translateY(-3px) rotate(-5deg);
  border-color: var(--ink-purple);
  border-style: solid;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 2px dashed var(--ink-light);
  color: var(--ink-medium);
  font-size: 0.9rem;
}

.heart-icon {
  display: inline-block;
  animation: pulse 1s ease infinite;
}

.footer-doodles {
  position: absolute;
  bottom: 100px;
  right: 30px;
  display: flex;
  gap: 10px;
  font-size: 1.5rem;
  opacity: 0.5;
}

.footer-doodles span {
  animation: float 3s ease-in-out infinite;
}

.footer-doodles span:nth-child(2) {
  animation-delay: 0.5s;
}

.footer-doodles span:nth-child(3) {
  animation-delay: 1s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .footer-brand .logo {
    justify-content: center;
  }

  .brand-tagline {
    max-width: 100%;
  }

  .footer-links ul {
    align-items: center;
  }

  .footer-links a {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .footer-doodles {
    display: none;
  }
}
</style>
