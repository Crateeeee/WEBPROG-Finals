<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="glow-orb glow-purple" style="width: 400px; height: 400px; top: 10%; left: 10%;"></div>
        <div class="glow-orb glow-pink" style="width: 300px; height: 300px; bottom: 20%; right: 15%;"></div>
      </div>
      
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-label">
              <span class="label-line"></span>
              <span>Musician • Developer • Creative</span>
            </div>
            
            <h1 class="hero-title">
              Hi, I'm <span class="text-gradient">Crate</span>
            </h1>
            
            <p class="hero-description">
              Making music with various bands and building digital experiences. 
              Welcome to my creative space where sound meets code.
            </p>
            
            <div class="hero-actions">
              <a href="#music" class="btn btn-primary">
                <i class="fas fa-headphones"></i>
                Listen to My Music
              </a>
              <router-link to="/guestbook" class="btn btn-secondary">
                <i class="fas fa-comments"></i>
                Join Live Chat
              </router-link>
            </div>

            <div class="hero-stats">
              <div class="stat">
                <span class="stat-value">3+</span>
                <span class="stat-label">Bands</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-value">50+</span>
                <span class="stat-label">Tracks</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-value">5+</span>
                <span class="stat-label">Years</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="vinyl-container">
              <div class="vinyl-record">
                <div class="vinyl-grooves"></div>
                <div class="vinyl-label">
                  <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" alt="Profile" />
                </div>
              </div>
              <div class="vinyl-arm"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <span>Scroll</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section about-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// About Me</span>
          <h2 class="section-title">The Story Behind <span class="text-gradient">The Sound</span></h2>
        </div>

        <div class="about-content">
          <div class="about-image">
            <div class="image-frame">
              <img :src="profileImage" alt="Crate playing guitar" />
              <div class="frame-accent"></div>
            </div>
          </div>

          <div class="about-text">
            <p class="about-intro">
              A passionate musician and developer based in the Philippines. I've been playing 
              in bands since high school, exploring different genres from rock to indie to electronic.
            </p>

            <div class="about-details">
              <div class="detail-card">
                <i class="fas fa-music"></i>
                <div>
                  <h4>Music Producer</h4>
                  <p>Creating and producing tracks across multiple genres</p>
                </div>
              </div>
              <div class="detail-card">
                <i class="fas fa-code"></i>
                <div>
                  <h4>Web Developer</h4>
                  <p>Building modern web applications with Vue.js & NestJS</p>
                </div>
              </div>
              <div class="detail-card">
                <i class="fas fa-guitar"></i>
                <div>
                  <h4>Multi-Instrumentalist</h4>
                  <p>Guitar, bass, drums, and keyboard enthusiast</p>
                </div>
              </div>
            </div>

            <div class="about-quote">
              <i class="fas fa-quote-left"></i>
              <p>"Music is the soundtrack of your life, code is the script."</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Music Section -->
    <section id="music" class="section music-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// My Music</span>
          <h2 class="section-title">Bands & <span class="text-gradient">Projects</span></h2>
          <p class="section-subtitle">Check out the bands I've been part of and my musical journey</p>
        </div>

        <div class="bands-grid">
          <div v-for="(band, index) in bands" :key="band.name" class="band-card" @click.stop="toggleBandDropdown(index)">
            <div class="band-image">
              <img :src="band.image" :alt="band.name" />
              <div class="band-overlay">
                <i class="fas fa-headphones"></i>
                <span>Listen</span>
              </div>
            </div>
            <div class="band-info">
              <h3 class="band-name">{{ band.name }}</h3>
              <span class="band-role">{{ band.role }}</span>
              <p class="band-genre">{{ band.genre }}</p>
            </div>
            
            <!-- Streaming Dropdown -->
            <div class="band-dropdown" :class="{ active: activeBandDropdown === index }" @click.stop>
              <div class="dropdown-header">
                <span>Stream {{ band.name }}</span>
                <button class="dropdown-close" @click.stop="activeBandDropdown = null">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="dropdown-links">
                <a v-if="band.spotify" :href="band.spotify" target="_blank" class="dropdown-link spotify">
                  <i class="fab fa-spotify"></i>
                  <span>Spotify</span>
                </a>
                <a v-if="band.appleMusic" :href="band.appleMusic" target="_blank" class="dropdown-link apple">
                  <i class="fab fa-apple"></i>
                  <span>Apple Music</span>
                </a>
                <a v-if="band.youtube" :href="band.youtube" target="_blank" class="dropdown-link youtube">
                  <i class="fab fa-youtube"></i>
                  <span>YouTube</span>
                </a>
                <a v-if="band.youtubeMusic" :href="band.youtubeMusic" target="_blank" class="dropdown-link youtube-music">
                  <i class="fas fa-music"></i>
                  <span>YouTube Music</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section skills-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// Skills</span>
          <h2 class="section-title">Tech <span class="text-gradient">Stack</span></h2>
        </div>

        <div class="skills-grid">
          <div v-for="category in skillCategories" :key="category.name" class="skill-category">
            <h3 class="category-title">
              <i :class="category.icon"></i>
              {{ category.name }}
            </h3>
            <div class="skills-list">
              <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
                <div class="skill-icon">
                  <i :class="skill.icon"></i>
                </div>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="section gallery-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// Gallery</span>
          <h2 class="section-title">Captured <span class="text-gradient">Moments</span></h2>
          <p class="section-subtitle">Photos from gigs, studio sessions, and life moments</p>
        </div>

        <!-- Gallery Categories -->
        <div class="gallery-tabs">
          <button 
            v-for="tab in galleryTabs" 
            :key="tab.id"
            class="gallery-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <i :class="tab.icon"></i>
            {{ tab.name }}
          </button>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid">
          <div 
            v-for="(image, index) in filteredGallery" 
            :key="image.id"
            class="gallery-item"
            :class="image.size"
            @click="openLightbox(index)"
          >
            <img :src="image.src" :alt="image.caption" />
            <div class="gallery-overlay">
              <span class="gallery-caption">{{ image.caption }}</span>
              <i class="fas fa-expand"></i>
            </div>
          </div>
        </div>

        <!-- Add Photo Button (for editing) -->
        <div class="gallery-actions">
          <button class="btn btn-secondary" @click="showUploadModal = true">
            <i class="fas fa-plus"></i>
            Add Photo
          </button>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div class="lightbox" :class="{ active: lightboxOpen }" @click.self="closeLightbox">
      <div class="lightbox-content" v-if="lightboxOpen">
        <button class="lightbox-close" @click="closeLightbox">
          <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-nav lightbox-prev" @click="prevImage">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="lightbox-image-container">
          <img :src="filteredGallery[lightboxIndex]?.src" :alt="filteredGallery[lightboxIndex]?.caption" />
        </div>
        <button class="lightbox-nav lightbox-next" @click="nextImage">
          <i class="fas fa-chevron-right"></i>
        </button>
        <div class="lightbox-info">
          <p>{{ filteredGallery[lightboxIndex]?.caption }}</p>
          <span>{{ lightboxIndex + 1 }} / {{ filteredGallery.length }}</span>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div class="modal-overlay" v-if="showUploadModal" @click.self="showUploadModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Add New Photo</h3>
          <button class="modal-close" @click="showUploadModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Image URL</label>
            <input v-model="newPhoto.src" type="text" class="input-field" placeholder="https://example.com/image.jpg" />
          </div>
          <div class="form-group">
            <label>Caption</label>
            <input v-model="newPhoto.caption" type="text" class="input-field" placeholder="Describe this photo..." />
          </div>
          <div class="form-group">
            <label>Category</label>
            <select v-model="newPhoto.category" class="input-field">
              <option value="gigs">Gigs</option>
              <option value="studio">Studio</option>
              <option value="life">Life</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" @click="showUploadModal = false">Cancel</button>
          <button class="btn btn-primary" @click="addPhoto">Add Photo</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      profileImage: '/images/crate-guitar.JPG',
      activeTab: 'all',
      lightboxOpen: false,
      lightboxIndex: 0,
      showUploadModal: false,
      activeBandDropdown: null,
      activePlatformDropdown: null,
      newPhoto: {
        src: '',
        caption: '',
        category: 'gigs'
      },
      
      /**
       * =====================================================
       * 🎵 STREAMING PLATFORMS - These appear in "Listen on" section
       * =====================================================
       */
      streamingPlatforms: [
        { name: 'Spotify', icon: 'fab fa-spotify', class: 'spotify', key: 'spotify' },
        { name: 'Apple Music', icon: 'fab fa-apple', class: 'apple', key: 'appleMusic' },
        { name: 'YouTube', icon: 'fab fa-youtube', class: 'youtube', key: 'youtube' },
        { name: 'YouTube Music', icon: 'fas fa-music', class: 'youtube-music', key: 'youtubeMusic' }
      ],
      
      /**
       * =====================================================
       * 🎸 YOUR BANDS - EDIT YOUR BAND INFO HERE
       * =====================================================
       * 
       * HOW TO UPDATE:
       * 
       * 1. Replace 'YOUR BAND 1 NAME' with your actual band name
       * 2. Update the role (e.g., 'Lead Guitarist', 'Bassist', etc.)
       * 3. Update the genre
       * 4. Replace the image URL with your band's image
       *    - Put images in /frontend/public/images/
       *    - Use path like '/images/band1.jpg'
       * 5. Add your streaming links for each platform
       * 
       * IMPORTANT: Leave empty string '' if platform not available
       * =====================================================
       */
      bands: [
        {
          name: 'Centimeters Per Second "Cm/S"',
          role: 'Lead Guitarist',
          genre: 'Pop Punk',
          image: '/images/cms.jpg',
          spotify: '',
          appleMusic: '',
          youtube: 'https://www.youtube.com/@CentimetersperSecond',
          youtubeMusic: ''
        },
        {
          name: 'Fablewake',
          role: 'Lead Guitarist',
          genre: 'Progressive Rock',
          image: '/images/fablewake.jpg',
          spotify: 'https://open.spotify.com/artist/5pg6uAPBAN2wy2SxCi5fLn',
          appleMusic: 'https://music.apple.com/us/artist/fablewake/1757894350',
          youtube: 'https://www.youtube.com/@fablewakeofficial',
          youtubeMusic: 'https://music.youtube.com/channel/UCAhrwviTv21ZT5y-NcXAPYg'
        },
        {
          name: 'Solo Project',
          role: 'Guitar',
          genre: 'Any',
          image: '/images/solo.JPG',
          spotify: '',
          appleMusic: '',
          youtube: 'https://www.youtube.com/@cratemarshall',
          youtubeMusic: ''
        }
      ],
      skillCategories: [
        {
          name: 'Frontend',
          icon: 'fas fa-laptop-code',
          skills: [
            { name: 'Vue.js', icon: 'fab fa-vuejs' },
            { name: 'JavaScript', icon: 'fab fa-js' },
            { name: 'HTML/CSS', icon: 'fab fa-html5' },
            { name: 'Tailwind', icon: 'fas fa-wind' }
          ]
        },
        {
          name: 'Backend',
          icon: 'fas fa-server',
          skills: [
            { name: 'NestJS', icon: 'fab fa-node-js' },
            { name: 'Node.js', icon: 'fab fa-node' },
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'PostgreSQL', icon: 'fas fa-database' }
          ]
        },
        {
          name: 'Music Production',
          icon: 'fas fa-sliders-h',
          skills: [
            { name: 'FL Studio', icon: 'fas fa-music' },
            { name: 'Ableton', icon: 'fas fa-headphones' },
            { name: 'Pro Tools', icon: 'fas fa-microphone' },
            { name: 'Mixing', icon: 'fas fa-sliders-h' }
          ]
        },
        {
          name: 'Tools',
          icon: 'fas fa-tools',
          skills: [
            { name: 'Git', icon: 'fab fa-git-alt' },
            { name: 'Docker', icon: 'fab fa-docker' },
            { name: 'Figma', icon: 'fab fa-figma' },
            { name: 'VS Code', icon: 'fas fa-code' }
          ]
        }
      ],
      galleryTabs: [
        { id: 'all', name: 'All', icon: 'fas fa-th' },
        { id: 'gigs', name: 'Gigs', icon: 'fas fa-guitar' },
        { id: 'studio', name: 'Studio', icon: 'fas fa-microphone' },
        { id: 'life', name: 'Life', icon: 'fas fa-heart' }
      ],
      // Gallery starts empty - photos are saved to localStorage
      // Add photos using the "Add Photo" button
      gallery: []
    }
  },
  computed: {
    filteredGallery() {
      if (this.activeTab === 'all') return this.gallery
      return this.gallery.filter(img => img.category === this.activeTab)
    }
  },
  mounted() {
    // Load saved gallery from localStorage
    const savedGallery = localStorage.getItem('crate-gallery')
    if (savedGallery) {
      this.gallery = JSON.parse(savedGallery)
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', this.closeDropdowns)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdowns)
  },
  methods: {
    closeDropdowns() {
      this.activeBandDropdown = null
      this.activePlatformDropdown = null
    },
    toggleBandDropdown(index) {
      this.activePlatformDropdown = null
      this.activeBandDropdown = this.activeBandDropdown === index ? null : index
    },
    togglePlatformDropdown(name) {
      this.activeBandDropdown = null
      this.activePlatformDropdown = this.activePlatformDropdown === name ? null : name
    },
    openLightbox(index) {
      this.lightboxIndex = index
      this.lightboxOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeLightbox() {
      this.lightboxOpen = false
      document.body.style.overflow = ''
    },
    nextImage() {
      this.lightboxIndex = (this.lightboxIndex + 1) % this.filteredGallery.length
    },
    prevImage() {
      this.lightboxIndex = this.lightboxIndex === 0 
        ? this.filteredGallery.length - 1 
        : this.lightboxIndex - 1
    },
    addPhoto() {
      if (!this.newPhoto.src || !this.newPhoto.caption) {
        alert('Please fill in all fields')
        return
      }
      
      const photo = {
        id: Date.now(),
        src: this.newPhoto.src,
        caption: this.newPhoto.caption,
        category: this.newPhoto.category,
        size: ''
      }
      
      this.gallery.unshift(photo)
      localStorage.setItem('crate-gallery', JSON.stringify(this.gallery))
      
      this.newPhoto = { src: '', caption: '', category: 'gigs' }
      this.showUploadModal = false
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: var(--nav-height);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.label-line {
  width: 40px;
  height: 2px;
  background: var(--accent-primary);
}

.hero-label span:last-child {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--accent-primary);
  letter-spacing: 1px;
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
}

.hero-description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 32px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 32px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);
}

/* Vinyl Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vinyl-container {
  position: relative;
  width: 400px;
  height: 400px;
}

.vinyl-record {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  position: relative;
  animation: spin-slow 10s linear infinite;
  box-shadow: 
    0 0 0 10px rgba(139, 92, 246, 0.1),
    0 0 60px rgba(139, 92, 246, 0.3),
    inset 0 0 80px rgba(0, 0, 0, 0.5);
}

.vinyl-grooves {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  background: repeating-radial-gradient(
    circle at center,
    transparent 0px,
    transparent 2px,
    rgba(255, 255, 255, 0.03) 3px,
    transparent 4px
  );
}

.vinyl-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

.vinyl-label img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vinyl-arm {
  position: absolute;
  top: -20px;
  right: 40px;
  width: 150px;
  height: 8px;
  background: linear-gradient(90deg, #333, #666);
  border-radius: 4px;
  transform-origin: right center;
  transform: rotate(25deg);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.vinyl-arm::before {
  content: '';
  position: absolute;
  right: -10px;
  top: -10px;
  width: 28px;
  height: 28px;
  background: #444;
  border-radius: 50%;
}

.vinyl-arm::after {
  content: '';
  position: absolute;
  left: -5px;
  top: -2px;
  width: 15px;
  height: 12px;
  background: linear-gradient(180deg, #888, #444);
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.85rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}

/* About Section */
.about-section {
  background: var(--bg-secondary);
}

.about-content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 60px;
  align-items: center;
}

.image-frame {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.image-frame img {
  width: 100%;
  height: auto;
  display: block;
}

.frame-accent {
  position: absolute;
  inset: 0;
  border: 3px solid var(--accent-primary);
  border-radius: var(--radius-lg);
  transform: translate(15px, 15px);
  z-index: -1;
}

.about-intro {
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
}

.about-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.detail-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: var(--transition-smooth);
}

.detail-card:hover {
  border-color: var(--accent-primary);
  transform: translateX(10px);
}

.detail-card i {
  font-size: 1.5rem;
  color: var(--accent-primary);
  width: 40px;
  text-align: center;
}

.detail-card h4 {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.detail-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

.about-quote {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent);
  border-left: 3px solid var(--accent-primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.about-quote i {
  color: var(--accent-primary);
  font-size: 1.5rem;
}

.about-quote p {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--text-secondary);
  margin: 0;
}

/* Music Section */
.bands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.band-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: visible;
  cursor: pointer;
  transition: var(--transition-smooth);
  position: relative;
}

.band-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-8px);
  box-shadow: var(--shadow-glow);
}

.band-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.band-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.band-card:hover .band-image img {
  transform: scale(1.1);
}

.band-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.band-card:hover .band-overlay {
  opacity: 1;
}

.band-overlay i {
  font-size: 2.5rem;
  color: var(--accent-primary);
}

.band-overlay span {
  font-size: 0.9rem;
  color: white;
  font-weight: 500;
}

/* Band Dropdown */
.band-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: var(--shadow-lg);
}

.band-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(8px);
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.dropdown-header span {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.dropdown-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.dropdown-links {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.dropdown-link:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.dropdown-link.spotify:hover { color: #1DB954; }
.dropdown-link.apple:hover { color: #fc3c44; }
.dropdown-link.youtube:hover { color: #FF0000; }
.dropdown-link.youtube-music:hover { color: #FF0000; }

.dropdown-link i {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.band-info {
  padding: 20px;
}

.band-name {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.band-role {
  font-size: 0.9rem;
  color: var(--accent-primary);
}

.band-genre {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 8px;
}

/* Music Platforms */
.music-platforms {
  text-align: center;
  padding: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.music-platforms h4 {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.platform-links {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.platform-link:hover {
  color: var(--text-primary);
  transform: translateY(-3px);
}

.platform-link.spotify:hover { border-color: #1DB954; color: #1DB954; }
.platform-link.apple:hover { border-color: #fc3c44; color: #fc3c44; }
.platform-link.youtube:hover { border-color: #FF0000; color: #FF0000; }
.platform-link.youtube-music:hover { border-color: #FF0000; color: #FF0000; }
.platform-link.soundcloud:hover { border-color: #ff5500; color: #ff5500; }

/* Platform Dropdown */
.platform-dropdown {
  position: relative;
}

.platform-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 0.95rem;
  transition: var(--transition-base);
  cursor: pointer;
}

.dropdown-arrow {
  font-size: 0.7rem;
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.platform-submenu {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 8px;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  box-shadow: var(--shadow-lg);
  z-index: 100;
}

.platform-submenu.active {
  opacity: 1;
  visibility: visible;
}

.submenu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.submenu-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.submenu-img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
}

/* Skills Section */
.skills-section {
  background: var(--bg-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1100px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

.skill-category {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.category-title i {
  color: var(--accent-primary);
}

.skills-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.skill-item:hover {
  background: var(--bg-hover);
  transform: translateX(5px);
}

.skill-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  color: var(--accent-primary);
  font-size: 0.9rem;
}

.skill-name {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Gallery Section */
.gallery-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.gallery-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition-base);
}

.gallery-tab:hover {
  border-color: var(--accent-primary);
  color: var(--text-primary);
}

.gallery-tab.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.gallery-item {
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.gallery-item.large {
  grid-column: span 2;
  grid-row: span 2;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-caption {
  color: white;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.gallery-overlay i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
}

.gallery-actions {
  text-align: center;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  font-size: 1.2rem;
  color: var(--text-primary);
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.modal-close:hover {
  background: var(--accent-primary);
  color: white;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid var(--border-color);
}

/* Responsive */
@media (max-width: 900px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-text {
    order: 2;
  }
  
  .hero-visual {
    order: 1;
  }
  
  .vinyl-container {
    width: 280px;
    height: 280px;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    max-width: 350px;
    margin: 0 auto;
  }
  
  .gallery-item.large {
    grid-column: span 1;
    grid-row: span 1;
  }
}

@media (max-width: 600px) {
  .hero-actions {
    flex-direction: column;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .stat-divider {
    width: 40px;
    height: 1px;
  }
  
  .platform-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
