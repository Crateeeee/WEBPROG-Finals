<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-text">Crate</span>
            <span class="logo-accent">.dev</span>
          </div>
          <p>Building digital experiences with passion and code.</p>
        </div>

        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#skills">Skills</a></li>
            <li><router-link to="/guestbook">Guestbook</router-link></li>
          </ul>
        </div>

        <div class="footer-social">
          <h4>Connect</h4>
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
        <p>&copy; {{ currentYear }} Crate Marshall Pinlac. All rights reserved.</p>
        <p>Made with <i class="fas fa-heart heart-icon"></i> using Vue.js</p>
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
  background: var(--dark-surface);
  padding: 60px 0 30px;
  margin-top: auto;
  border-top: 1px solid var(--dark-border);
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
}

.logo-text {
  color: var(--text-primary);
}

.logo-accent {
  color: var(--primary-color);
}

.footer-brand p {
  color: var(--text-secondary);
  max-width: 300px;
}

.footer-links h4,
.footer-social h4 {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.footer-links h4::after,
.footer-social h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--primary-color);
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: var(--text-secondary);
  transition: var(--transition);
}

.footer-links a:hover {
  color: var(--primary-color);
  padding-left: 5px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 40px;
  height: 40px;
  background: var(--dark-card);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: var(--transition);
  border: 1px solid var(--dark-border);
}

.social-links a:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-3px);
  border-color: var(--primary-color);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--dark-border);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.heart-icon {
  color: #e74c3c;
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .footer-brand p {
    max-width: 100%;
  }

  .footer-links h4::after,
  .footer-social h4::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-links ul {
    align-items: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
