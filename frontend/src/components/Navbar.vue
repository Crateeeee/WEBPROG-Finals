<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': isMobileMenuOpen }">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <span class="logo-icon">📓</span>
          <span class="logo-text text-handwritten">Crate</span>
          <span class="logo-accent">.journal</span>
        </router-link>

        <!-- Mobile Toggle -->
        <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span :class="{ open: isMobileMenuOpen }"></span>
        </button>

        <!-- Nav Links -->
        <ul class="nav-links" :class="{ active: isMobileMenuOpen }">
          <li>
            <router-link to="/" @click="closeMobileMenu" class="nav-link">
              <i class="fas fa-home"></i> Home
            </router-link>
          </li>
          <li>
            <a href="/#about" @click="closeMobileMenu" class="nav-link">
              <i class="fas fa-user"></i> About
            </a>
          </li>
          <li>
            <a href="/#skills" @click="closeMobileMenu" class="nav-link">
              <i class="fas fa-code"></i> Skills
            </a>
          </li>
          <li>
            <a href="/#gallery" @click="closeMobileMenu" class="nav-link">
              <i class="fas fa-images"></i> Gallery
            </a>
          </li>
          <li>
            <router-link to="/guestbook" @click="closeMobileMenu" class="nav-link nav-guestbook">
              <i class="fas fa-pen-fancy"></i> Guestbook
            </router-link>
          </li>
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
  background: rgba(250, 248, 245, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
  gap: 0.25rem;
  font-size: 1.5rem;
  z-index: 1001;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: rotate(-3deg);
}

.logo-icon {
  font-size: 1.8rem;
  margin-right: 0.25rem;
}

.logo-text {
  font-size: 1.8rem;
  color: var(--ink-dark);
}

.logo-accent {
  color: var(--ink-purple);
  font-weight: 600;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  padding: 10px 18px;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink-medium);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid transparent;
}

.nav-link:hover {
  color: var(--ink-purple);
  background: var(--paper-white);
  border-color: var(--washi-purple);
}

.nav-link i {
  font-size: 0.9rem;
}

.nav-guestbook {
  background: var(--ink-purple);
  color: white !important;
  border-color: var(--ink-purple);
}

.nav-guestbook:hover {
  background: transparent;
  color: var(--ink-purple) !important;
  transform: translateY(-2px);
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  width: 40px;
  height: 40px;
  background: var(--paper-white);
  border: 2px solid var(--ink-light);
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  z-index: 1001;
  transition: all 0.3s ease;
}

.mobile-toggle:hover {
  border-color: var(--ink-purple);
}

.mobile-toggle span,
.mobile-toggle span::before,
.mobile-toggle span::after {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--ink-dark);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
}

.mobile-toggle span {
  top: 50%;
  transform: translate(-50%, -50%);
}

.mobile-toggle span::before {
  content: '';
  top: -7px;
}

.mobile-toggle span::after {
  content: '';
  top: 7px;
}

.mobile-toggle span.open {
  background: transparent;
}

.mobile-toggle span.open::before {
  top: 0;
  transform: translateX(-50%) rotate(45deg);
  background: var(--ink-purple);
}

.mobile-toggle span.open::after {
  top: 0;
  transform: translateX(-50%) rotate(-45deg);
  background: var(--ink-purple);
}

/* Mobile Styles */
@media (max-width: 992px) {
  .mobile-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--paper-cream);
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
  }

  .nav-links.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    font-size: 1.3rem;
    padding: 15px 30px;
  }

  .nav-guestbook {
    margin-top: 1rem;
  }
}

/* Animation for scrolled state */
.navbar.scrolled .logo-icon {
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
