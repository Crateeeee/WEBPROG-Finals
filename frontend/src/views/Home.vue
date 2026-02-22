<template>
  <main class="home">
    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-particles"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <span class="hero-greeting">Welcome to my world</span>
            <h1 class="hero-title">
              Hi, I'm <span class="text-gradient">Crate Marshall</span>
            </h1>
            <h2 class="hero-subtitle">
              <span class="typing-text">{{ typingText }}</span>
              <span class="cursor">|</span>
            </h2>
            <p class="hero-description">
              A Web Programming student at Asia Pacific College. I build interactive
              experiences and solve problems with code.
            </p>
            <div class="hero-buttons">
              <router-link to="/guestbook" class="btn btn-primary">
                <i class="fas fa-comments"></i> Leave a Message
              </router-link>
              <a href="#about" class="btn btn-secondary">
                <i class="fas fa-user"></i> About Me
              </a>
            </div>
            <div class="hero-social">
              <a href="https://www.facebook.com/CrateeMarshall" target="_blank" rel="noopener">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://github.com/Crateeeee" target="_blank" rel="noopener">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/crate-marshall-pinlac-57572824a/" target="_blank" rel="noopener">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.youtube.com/@cratemarshall" target="_blank" rel="noopener">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div class="hero-image">
            <div class="image-wrapper">
              <img src="https://avatars.githubusercontent.com/u/108235179?v=4" alt="Crate Marshall Pinlac" />
              <div class="image-border"></div>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" class="scroll-indicator">
        <span>Scroll Down</span>
        <i class="fas fa-chevron-down"></i>
      </a>
    </section>

    <!-- About Section -->
    <section id="about" class="section about">
      <div class="container">
        <h2 class="section-title">Personal Hub</h2>
        <div class="about-grid">
          <!-- Education -->
          <div class="about-card">
            <div class="card-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>Education</h3>
            <ul class="about-list">
              <li><i class="fas fa-caret-right"></i> 2023 - Present: Asia Pacific College (BSIT)</li>
              <li><i class="fas fa-caret-right"></i> 2021 - 2023: Senior High School (STEM)</li>
            </ul>
          </div>

          <!-- Achievements -->
          <div class="about-card">
            <div class="card-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <h3>Achievements</h3>
            <ul class="about-list">
              <li><i class="fas fa-caret-right"></i> Integrated Attendance Facial Recognition System</li>
              <li><i class="fas fa-caret-right"></i> Email Cleaner Developer/Designer</li>
              <li><i class="fas fa-caret-right"></i> OutSystems Developer</li>
              <li><i class="fas fa-caret-right"></i> Scrum Foundation Certificate</li>
            </ul>
          </div>

          <!-- Course -->
          <div class="about-card">
            <div class="card-icon">
              <i class="fas fa-book"></i>
            </div>
            <h3>Course</h3>
            <p>Bachelor of Science in Information Technology (BSIT)</p>
            <img 
              src="https://s3-ap-southeast-1.amazonaws.com/kalibrr-company-assets/logos/52GHMYQP6F32QUQU8FVE-58003a2b.png" 
              alt="APC Logo" 
              class="course-logo"
            />
          </div>

          <!-- Goals -->
          <div class="about-card featured">
            <div class="card-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h3>Goals & Dreams</h3>
            <p>To become a proficient Full-Stack Developer and contribute to innovative tech solutions that help society.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section skills">
      <div class="container">
        <h2 class="section-title">IT Experience</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3><i class="fas fa-code"></i> Languages</h3>
            <div class="skill-tags">
              <span class="skill-tag">HTML</span>
              <span class="skill-tag">CSS</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">Java</span>
              <span class="skill-tag">TypeScript</span>
            </div>
          </div>
          <div class="skill-category">
            <h3><i class="fas fa-layer-group"></i> Frameworks</h3>
            <div class="skill-tags">
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">Nest.js</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Flask</span>
            </div>
          </div>
          <div class="skill-category">
            <h3><i class="fas fa-tools"></i> Tools</h3>
            <div class="skill-tags">
              <span class="skill-tag">Git/GitHub</span>
              <span class="skill-tag">VS Code</span>
              <span class="skill-tag">Supabase</span>
              <span class="skill-tag">Vercel</span>
              <span class="skill-tag">Figma</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hobbies Section -->
    <section id="hobbies" class="section hobbies">
      <div class="container">
        <h2 class="section-title">Hobbies & Interests</h2>
        <div class="hobbies-grid">
          <div class="hobby-card">
            <div class="hobby-image">
              <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=60" alt="Music" />
            </div>
            <div class="hobby-content">
              <h3><i class="fas fa-music"></i> My Music</h3>
              <p>Vibing to local scenes and discovering new sounds.</p>
              <div class="hobby-links">
                <a href="#" class="hobby-link">My Band</a>
                <a href="#" class="hobby-link">My Playlist</a>
              </div>
            </div>
          </div>
          <div class="hobby-card">
            <div class="hobby-image">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=60" alt="Games" />
            </div>
            <div class="hobby-content">
              <h3><i class="fas fa-gamepad"></i> Gaming</h3>
              <p>Valorant, League of Legends, Genshin Impact.</p>
            </div>
          </div>
          <div class="hobby-card">
            <div class="hobby-image">
              <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=60" alt="Movies" />
            </div>
            <div class="hobby-content">
              <h3><i class="fas fa-film"></i> Movies & Series</h3>
              <p>Sci-Fi, Thrillers, and Anime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="section gallery">
      <div class="container">
        <h2 class="section-title">My Gallery</h2>
        <p class="section-subtitle">Click an image to view full screen</p>
        <div class="gallery-grid">
          <div 
            v-for="(image, index) in galleryImages" 
            :key="index" 
            class="gallery-item"
            @click="openLightbox(index)"
          >
            <img :src="image.src" :alt="image.title" />
            <div class="gallery-overlay">
              <h4>{{ image.title }}</h4>
              <p>{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">
          <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-nav prev" @click.stop="prevImage">
          <i class="fas fa-chevron-left"></i>
        </button>
        <img :src="galleryImages[currentImageIndex].src" :alt="galleryImages[currentImageIndex].title" />
        <button class="lightbox-nav next" @click.stop="nextImage">
          <i class="fas fa-chevron-right"></i>
        </button>
        <div class="lightbox-info">
          <h4>{{ galleryImages[currentImageIndex].title }}</h4>
          <p>{{ galleryImages[currentImageIndex].description }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      typingText: '',
      phrases: ['Web Developer', 'UI/UX Enthusiast', 'Tech Explorer', 'Problem Solver'],
      currentPhrase: 0,
      charIndex: 0,
      isDeleting: false,
      lightboxOpen: false,
      currentImageIndex: 0,
      galleryImages: [
        {
          src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60',
          title: 'Coding',
          description: 'My current setup'
        },
        {
          src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=60',
          title: 'Chill Vibe',
          description: 'My cat companion'
        },
        {
          src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60',
          title: 'Grind',
          description: 'Late night coding session'
        },
        {
          src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60',
          title: 'Workspace',
          description: 'Where ideas come to life'
        },
        {
          src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=60',
          title: 'Development',
          description: 'Building the future'
        },
        {
          src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=60',
          title: 'Innovation',
          description: 'Always learning'
        }
      ]
    }
  },
  mounted() {
    this.typeEffect()
  },
  methods: {
    typeEffect() {
      const currentText = this.phrases[this.currentPhrase]
      
      if (this.isDeleting) {
        this.typingText = currentText.substring(0, this.charIndex - 1)
        this.charIndex--
      } else {
        this.typingText = currentText.substring(0, this.charIndex + 1)
        this.charIndex++
      }

      let typeSpeed = this.isDeleting ? 50 : 100

      if (!this.isDeleting && this.charIndex === currentText.length) {
        typeSpeed = 2000
        this.isDeleting = true
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false
        this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length
        typeSpeed = 500
      }

      setTimeout(this.typeEffect, typeSpeed)
    },
    openLightbox(index) {
      this.currentImageIndex = index
      this.lightboxOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeLightbox() {
      this.lightboxOpen = false
      document.body.style.overflow = ''
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length
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
  padding-top: 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero);
}

.hero-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at 80% 20%, rgba(108, 92, 231, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 80%, rgba(253, 121, 168, 0.1) 0%, transparent 50%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-greeting {
  display: inline-block;
  background: var(--gradient-primary);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  animation: fadeInUp 0.6s ease 0.1s both;
}

.hero-subtitle {
  font-size: 1.8rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  min-height: 2.5rem;
  animation: fadeInUp 0.6s ease 0.2s both;
}

.cursor {
  animation: blink 1s ease infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 500px;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease 0.3s both;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease 0.4s both;
}

.hero-social {
  display: flex;
  gap: 1rem;
  animation: fadeInUp 0.6s ease 0.5s both;
}

.hero-social a {
  width: 45px;
  height: 45px;
  background: var(--dark-card);
  border: 1px solid var(--dark-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: var(--transition);
}

.hero-social a:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

.hero-image {
  display: flex;
  justify-content: center;
  animation: fadeIn 1s ease 0.3s both;
}

.image-wrapper {
  position: relative;
  width: 350px;
  height: 350px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  border: 4px solid var(--primary-color);
  animation: float 3s ease-in-out infinite;
}

.image-border {
  position: absolute;
  inset: -15px;
  border: 2px dashed var(--primary-color);
  border-radius: 50%;
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* About Section */
.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.about-card {
  background: var(--dark-card);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  border: 1px solid var(--dark-border);
  transition: var(--transition);
}

.about-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.about-card.featured {
  background: linear-gradient(135deg, var(--dark-card) 0%, rgba(108, 92, 231, 0.1) 100%);
  border-color: var(--primary-color);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
}

.about-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.about-card p {
  color: var(--text-secondary);
}

.about-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.about-list li {
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.about-list li i {
  color: var(--primary-color);
  margin-top: 5px;
}

.course-logo {
  width: 80px;
  margin-top: 1rem;
  border-radius: 10px;
}

/* Skills Section */
.skills {
  background: var(--dark-surface);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.skill-category {
  background: var(--dark-card);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  border: 1px solid var(--dark-border);
  transition: var(--transition);
}

.skill-category:hover {
  border-color: var(--primary-color);
}

.skill-category h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.skill-category h3 i {
  color: var(--primary-color);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: var(--dark-surface);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  border: 1px solid var(--dark-border);
  transition: var(--transition);
}

.skill-tag:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* Hobbies Section */
.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.hobby-card {
  background: var(--dark-card);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 1px solid var(--dark-border);
  transition: var(--transition);
}

.hobby-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
}

.hobby-image {
  height: 200px;
  overflow: hidden;
}

.hobby-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.hobby-card:hover .hobby-image img {
  transform: scale(1.1);
}

.hobby-content {
  padding: 1.5rem;
}

.hobby-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hobby-content h3 i {
  color: var(--primary-color);
}

.hobby-content p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.hobby-links {
  display: flex;
  gap: 1rem;
}

.hobby-link {
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);
}

.hobby-link:hover {
  color: var(--accent-color);
}

/* Gallery Section */
.gallery {
  background: var(--dark-surface);
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-top: -2rem;
  margin-bottom: 3rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4/3;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: var(--transition);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay h4 {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.gallery-overlay p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox img {
  max-width: 90%;
  max-height: 80vh;
  border-radius: var(--border-radius);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: var(--dark-card);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
}

.lightbox-close:hover {
  background: var(--primary-color);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: var(--dark-card);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition);
}

.lightbox-nav:hover {
  background: var(--primary-color);
}

.lightbox-nav.prev {
  left: 20px;
}

.lightbox-nav.next {
  right: 20px;
}

.lightbox-info {
  position: absolute;
  bottom: 30px;
  text-align: center;
}

.lightbox-info h4 {
  color: white;
  margin-bottom: 0.5rem;
}

.lightbox-info p {
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    order: 2;
  }

  .hero-image {
    order: 1;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    max-width: 100%;
  }

  .hero-buttons,
  .hero-social {
    justify-content: center;
  }

  .image-wrapper {
    width: 280px;
    height: 280px;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid,
  .hobbies-grid,
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .image-wrapper {
    width: 220px;
    height: 220px;
  }

  .skills-grid,
  .hobbies-grid,
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
