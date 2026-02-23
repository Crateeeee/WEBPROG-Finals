<template>
  <div id="app" :data-theme="theme">
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />
    <MusicPlayer />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import MusicPlayer from './components/MusicPlayer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    MusicPlayer
  },
  data() {
    return {
      theme: 'dark'
    }
  },
  mounted() {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('crate-theme') || 'dark'
    this.theme = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('crate-theme', this.theme)
      document.documentElement.setAttribute('data-theme', this.theme)
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  transition: background-color 0.3s ease;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
