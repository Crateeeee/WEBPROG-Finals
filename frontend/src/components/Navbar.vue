<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': isMobileMenuOpen }">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <div class="logo-vinyl">
            <span class="vinyl-inner"></span>
          </div>
          <div class="logo-text">
            <span class="logo-name">CRATE</span>
            <span class="logo-tagline">STUDIO</span>
          </div>
        </router-link>

        <!-- Desktop Nav -->
        <ul class="nav-links">
          <li>
            <router-link to="/" class="nav-link">
              <span class="nav-icon"><i class="fas fa-home"></i></span>
              <span class="nav-text">Home</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/', hash: '#about' }" class="nav-link">
              <span class="nav-icon"><i class="fas fa-user"></i></span>
              <span class="nav-text">About</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/', hash: '#music' }" class="nav-link">
              <span class="nav-icon"><i class="fas fa-music"></i></span>
              <span class="nav-text">Music</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/', hash: '#gallery' }" class="nav-link">
              <span class="nav-icon"><i class="fas fa-images"></i></span>
              <span class="nav-text">Gallery</span>
            </router-link>
          </li>
          <li>
            <router-link to="/guestbook" class="nav-link nav-guestbook">
              <span class="nav-icon"><i class="fas fa-comments"></i></span>
              <span class="nav-text">Live Chat</span>
              <span class="live-dot"></span>
            </router-link>
          </li>
        </ul>

        <!-- Right Actions -->
        <div class="nav-actions">
          <!-- Theme Toggle -->
          <button class="theme-toggle" @click="$emit('toggle-theme')" :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
            <i :class="theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>

          <!-- Mobile Toggle -->
          <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
            <span class="hamburger" :class="{ open: isMobileMenuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
          <div class="mobile-menu-content">
            <router-link to="/" @click="closeMobileMenu" class="mobile-link">
              <i class="fas fa-home"></i> Home
            </router-link>
            <router-link :to="{ path: '/', hash: '#about' }" @click="closeMobileMenu" class="mobile-link">
              <i class="fas fa-user"></i> About
            </router-link>
            <router-link :to="{ path: '/', hash: '#music' }" @click="closeMobileMenu" class="mobile-link">
              <i class="fas fa-music"></i> Music
            </router-link>
            <router-link :to="{ path: '/', hash: '#gallery' }" @click="closeMobileMenu" class="mobile-link">
              <i class="fas fa-images"></i> Gallery
            </router-link>
            <router-link to="/guestbook" @click="closeMobileMenu" class="mobile-link">
              <i class="fas fa-comments"></i> Live Chat
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  emits: ['toggle-theme'],
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  padding: 12px 0;
}

[data-theme="light"] .navbar.scrolled {
  background: rgba(250, 250, 250, 0.9);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1001;
}

.logo-vinyl {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: spin-slow 8s linear infinite;
  box-shadow: 0 0 15px var(--accent-glow);
}

.logo-vinyl::before {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--gradient-glow);
}

.vinyl-inner {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bg-primary);
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 2px;
}

.logo-tagline {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--accent-primary);
  letter-spacing: 3px;
}

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.25s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

.nav-icon {
  font-size: 0.85rem;
}

.nav-link.router-link-active {
  color: var(--accent-primary);
  background: rgba(139, 92, 246, 0.1);
}

.nav-guestbook {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
}

.nav-guestbook:hover {
  border-color: var(--accent-primary);
}

.live-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-green);
  border-radius: 50%;
  animation: pulse-live 1.5s ease-in-out infinite;
}

@keyframes pulse-live {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: rotate(180deg);
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.hamburger {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.mobile-link {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  color: var(--accent-primary);
}

.mobile-link i {
  width: 30px;
  text-align: center;
}

/* Responsive */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  
  .mobile-toggle {
    display: flex;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: none;
  }
}
</style>
