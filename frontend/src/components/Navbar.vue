<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': isMobileMenuOpen }">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="logo">
          <span class="logo-text">Crate</span>
          <span class="logo-accent">.dev</span>
        </router-link>

        <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span :class="{ open: isMobileMenuOpen }"></span>
        </button>

        <ul class="nav-links" :class="{ active: isMobileMenuOpen }">
          <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
          <li><a href="/#about" @click="closeMobileMenu">About</a></li>
          <li><a href="/#skills" @click="closeMobileMenu">Skills</a></li>
          <li><a href="/#gallery" @click="closeMobileMenu">Gallery</a></li>
          <li><router-link to="/guestbook" @click="closeMobileMenu" class="nav-guestbook">
            <i class="fas fa-comments"></i> Guestbook
          </router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
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
  padding: 1rem 0;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(13, 17, 23, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: 0.75rem 0;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 1001;
}

.logo-text {
  color: var(--text-primary);
}

.logo-accent {
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-secondary);
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--primary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: var(--transition);
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.nav-guestbook {
  background: var(--gradient-primary);
  padding: 8px 20px !important;
  border-radius: 50px;
  color: white !important;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-guestbook:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
}

.nav-guestbook::after {
  display: none;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1001;
}

.mobile-toggle span,
.mobile-toggle span::before,
.mobile-toggle span::after {
  display: block;
  width: 100%;
  height: 3px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: var(--transition);
}

.mobile-toggle span {
  position: relative;
}

.mobile-toggle span::before,
.mobile-toggle span::after {
  content: '';
  position: absolute;
  left: 0;
}

.mobile-toggle span::before {
  top: -8px;
}

.mobile-toggle span::after {
  bottom: -8px;
}

.mobile-toggle span.open {
  background: transparent;
}

.mobile-toggle span.open::before {
  top: 0;
  transform: rotate(45deg);
}

.mobile-toggle span.open::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--dark-bg);
    flex-direction: column;
    justify-content: center;
    gap: 2.5rem;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
  }

  .nav-links.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-links a {
    font-size: 1.5rem;
  }

  .nav-guestbook {
    padding: 12px 30px !important;
  }
}
</style>
