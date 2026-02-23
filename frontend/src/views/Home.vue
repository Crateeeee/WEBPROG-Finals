<template>
  <main class="home">
    <!-- Floating Doodles -->
    <div class="floating-doodles">
      <span class="doodle doodle-star" style="top: 10%; left: 5%;">✦</span>
      <span class="doodle doodle-heart" style="top: 20%; right: 10%;">♥</span>
      <span class="doodle doodle-sparkle" style="top: 60%; left: 8%;">✨</span>
      <span class="doodle doodle-star" style="top: 80%; right: 5%;">★</span>
    </div>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="container">
        <div class="hero-content">
          <!-- Left Side - Text -->
          <div class="hero-text">
            <div class="hero-tape washi-tape pink" style="transform: rotate(-8deg);"></div>
            <span class="hero-wave">👋</span>
            <h1 class="hero-title text-handwritten">
              Hi there! I'm <span class="highlight">Crate Marshall</span>
            </h1>
            <div class="hero-subtitle text-handwritten-alt">
              <span class="typing-wrapper">
                <span class="typing-text">{{ typingText }}</span>
                <span class="cursor">|</span>
              </span>
            </div>
            <p class="hero-description">
              A Web Programming student at <strong>Asia Pacific College</strong>. 
              I love building interactive experiences and solving problems with code!
            </p>
            <div class="hero-buttons">
              <router-link to="/guestbook" class="btn btn-primary">
                <i class="fas fa-pen-fancy"></i> Sign My Guestbook
              </router-link>
              <a href="#about" class="btn btn-secondary">
                <i class="fas fa-arrow-down"></i> Know Me Better
              </a>
            </div>
            <div class="hero-social">
              <a href="https://www.facebook.com/CrateeMarshall" target="_blank" rel="noopener" class="social-link">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://github.com/Crateeeee" target="_blank" rel="noopener" class="social-link">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/crate-marshall-pinlac-57572824a/" target="_blank" rel="noopener" class="social-link">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.youtube.com/@cratemarshall" target="_blank" rel="noopener" class="social-link">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Right Side - Polaroid Photo -->
          <div class="hero-image">
            <div class="polaroid hero-polaroid">
              <img src="https://avatars.githubusercontent.com/u/108235179?v=4" alt="Crate Marshall Pinlac" />
              <p class="polaroid-caption">That's me! ✌️</p>
            </div>
            <div class="washi-tape blue hero-tape-2" style="transform: rotate(15deg);"></div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <a href="#about" class="scroll-indicator">
        <span class="text-handwritten">scroll down</span>
        <i class="fas fa-chevron-down"></i>
      </a>
    </section>

    <!-- About Section -->
    <section id="about" class="section about-section">
      <div class="container">
        <h2 class="section-title">✏️ About Me</h2>
        <p class="section-subtitle">Here's a little bit about who I am</p>

        <div class="about-bento">
          <!-- Education Card -->
          <div class="bento-card sticky-note bg-yellow" style="transform: rotate(-2deg);">
            <div class="note-pin"></div>
            <h3 class="card-title"><i class="fas fa-graduation-cap"></i> Education</h3>
            <ul class="card-list">
              <li>📚 2023 - Present: Asia Pacific College (BSIT)</li>
              <li>🎓 2021 - 2023: Senior High School (STEM)</li>
            </ul>
          </div>

          <!-- Achievements Card -->
          <div class="bento-card sticky-note bg-pink" style="transform: rotate(1deg);">
            <div class="note-pin"></div>
            <h3 class="card-title"><i class="fas fa-trophy"></i> Achievements</h3>
            <ul class="card-list">
              <li>🤖 Facial Recognition Attendance System</li>
              <li>📧 Email Cleaner Developer</li>
              <li>⚡ OutSystems Developer</li>
              <li>🏅 Scrum Foundation Certificate</li>
            </ul>
          </div>

          <!-- Course Card -->
          <div class="bento-card sticky-note bg-blue" style="transform: rotate(-1deg);">
            <div class="note-pin"></div>
            <h3 class="card-title"><i class="fas fa-book-open"></i> Course</h3>
            <p class="card-text">Bachelor of Science in Information Technology (BSIT)</p>
            <img 
              src="https://s3-ap-southeast-1.amazonaws.com/kalibrr-company-assets/logos/52GHMYQP6F32QUQU8FVE-58003a2b.png" 
              alt="APC Logo" 
              class="school-logo"
            />
          </div>

          <!-- Goals Card - Featured -->
          <div class="bento-card sticky-note bg-green featured" style="transform: rotate(2deg);">
            <div class="note-pin gold"></div>
            <h3 class="card-title"><i class="fas fa-rocket"></i> Dreams & Goals</h3>
            <p class="card-text">
              🚀 To become a proficient Full-Stack Developer and contribute to 
              innovative tech solutions that help society thrive!
            </p>
            <div class="doodle-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section skills-section">
      <div class="container">
        <h2 class="section-title">🛠️ My Toolkit</h2>
        <p class="section-subtitle">Technologies I work with</p>

        <div class="skills-notebook">
          <div class="notebook-page">
            <div class="notebook-holes">
              <span></span><span></span><span></span>
            </div>
            <div class="notebook-content">
              <div class="skill-category">
                <h3 class="text-handwritten"><i class="fas fa-code ink-purple"></i> Languages</h3>
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
                <h3 class="text-handwritten"><i class="fas fa-layer-group ink-pink"></i> Frameworks</h3>
                <div class="skill-tags">
                  <span class="skill-tag">Vue.js</span>
                  <span class="skill-tag">React</span>
                  <span class="skill-tag">Nest.js</span>
                  <span class="skill-tag">Node.js</span>
                  <span class="skill-tag">Flask</span>
                </div>
              </div>

              <div class="skill-category">
                <h3 class="text-handwritten"><i class="fas fa-tools ink-blue"></i> Tools</h3>
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
        </div>
      </div>
    </section>

    <!-- Hobbies Section -->
    <section id="hobbies" class="section hobbies-section">
      <div class="container">
        <h2 class="section-title">🎮 Fun Stuff</h2>
        <p class="section-subtitle">What I do when I'm not coding</p>

        <div class="hobbies-grid">
          <div class="hobby-polaroid polaroid" style="transform: rotate(-3deg);">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=60" alt="Music" />
            <div class="polaroid-caption">
              <span class="hobby-icon">🎵</span> My Music
            </div>
          </div>

          <div class="hobby-polaroid polaroid" style="transform: rotate(2deg);">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=60" alt="Gaming" />
            <div class="polaroid-caption">
              <span class="hobby-icon">🎮</span> Gaming
            </div>
          </div>

          <div class="hobby-polaroid polaroid" style="transform: rotate(-1deg);">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=60" alt="Movies" />
            <div class="polaroid-caption">
              <span class="hobby-icon">🎬</span> Movies
            </div>
          </div>
        </div>

        <div class="hobbies-notes">
          <div class="hobby-note sticky-note bg-orange" style="transform: rotate(-2deg);">
            <p>🎸 Vibing to local scenes and discovering new sounds</p>
          </div>
          <div class="hobby-note sticky-note bg-purple" style="transform: rotate(3deg);">
            <p>🎯 Valorant, League of Legends, Genshin Impact</p>
          </div>
          <div class="hobby-note sticky-note bg-pink" style="transform: rotate(-1deg);">
            <p>🍿 Sci-Fi, Thrillers, and Anime enthusiast!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="section gallery-section">
      <div class="container">
        <h2 class="section-title">📸 Gallery</h2>
        <p class="section-subtitle">Click to view! ✨</p>

        <div class="gallery-scrapbook">
          <div 
            v-for="(image, index) in galleryImages" 
            :key="index" 
            class="gallery-polaroid polaroid"
            :style="{ transform: getRandomRotation(index) }"
            @click="openLightbox(index)"
          >
            <img :src="image.src" :alt="image.title" />
            <p class="polaroid-caption">{{ image.title }}</p>
            <div class="washi-tape" :class="getWashiColor(index)" style="top: -10px;"></div>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <Transition name="fade">
          <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
            <button class="lightbox-close" @click.stop="closeLightbox">
              <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-nav prev" @click.stop="prevImage">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="lightbox-content" @click.stop>
              <div class="lightbox-polaroid polaroid">
                <img :src="galleryImages[currentImageIndex].src" :alt="galleryImages[currentImageIndex].title" />
                <p class="polaroid-caption text-handwritten">{{ galleryImages[currentImageIndex].title }}</p>
              </div>
            </div>
            <button class="lightbox-nav next" @click.stop="nextImage">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </Transition>
      </Teleport>
    </section>

    <!-- Connect CTA Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-card sticky-note bg-yellow" style="transform: rotate(-1deg);">
          <div class="note-pin gold"></div>
          <h2 class="text-handwritten cta-title">Let's Connect! 💬</h2>
          <p class="cta-text">Got something to say? Leave a message in my guestbook!</p>
          <router-link to="/guestbook" class="btn btn-primary">
            <i class="fas fa-pen-fancy"></i> Sign Guestbook
          </router-link>
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
          title: 'Coding vibes 💻'
        },
        {
          src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=60',
          title: 'My buddy 🐱'
        },
        {
          src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60',
          title: 'Late nights ☕'
        },
        {
          src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60',
          title: 'Workspace 🖥️'
        },
        {
          src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=60',
          title: 'Building 🔨'
        },
        {
          src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=60',
          title: 'Learning 📖'
        }
      ]
    }
  },
  mounted() {
    this.typeEffect()
    this.initScrollReveal()
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
    initScrollReveal() {
      const reveals = document.querySelectorAll('.bento-card, .polaroid, .skill-category')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      }, { threshold: 0.1 })
      
      reveals.forEach(el => observer.observe(el))
    },
    getRandomRotation(index) {
      const rotations = [-4, 2, -2, 3, -1, 4]
      return `rotate(${rotations[index % rotations.length]}deg)`
    },
    getWashiColor(index) {
      const colors = ['pink', 'blue', 'yellow', 'mint', 'purple']
      return colors[index % colors.length]
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
  padding-top: 100px;
  padding-bottom: 60px;
  overflow: hidden;
}

.floating-doodles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  position: relative;
}

.hero-tape {
  position: absolute;
  top: -20px;
  left: -30px;
  width: 80px;
  height: 25px;
}

.hero-wave {
  font-size: 3rem;
  display: inline-block;
  animation: wave 2s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-10deg); }
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.2;
  margin: 1rem 0;
  color: var(--ink-dark);
}

.hero-title .highlight {
  color: var(--ink-purple);
  position: relative;
}

.hero-title .highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: var(--washi-yellow);
  z-index: -1;
  transform: skewX(-5deg);
}

.hero-subtitle {
  font-size: 2rem;
  color: var(--ink-medium);
  margin-bottom: 1.5rem;
  min-height: 2.5rem;
}

.typing-wrapper {
  display: inline-flex;
  align-items: center;
}

.cursor {
  margin-left: 2px;
  animation: blink 1s ease infinite;
  color: var(--ink-purple);
  font-weight: 100;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-description {
  font-size: 1.1rem;
  color: var(--ink-medium);
  max-width: 500px;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-description strong {
  color: var(--ink-purple);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.hero-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 48px;
  height: 48px;
  background: var(--paper-white);
  border: 2px dashed var(--ink-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-medium);
  font-size: 1.2rem;
  transition: var(--transition-bounce);
}

.social-link:hover {
  background: var(--ink-purple);
  border-color: var(--ink-purple);
  border-style: solid;
  color: white;
  transform: translateY(-5px) rotate(-5deg);
}

.hero-image {
  display: flex;
  justify-content: center;
  position: relative;
}

.hero-polaroid {
  width: 320px;
  animation: float 4s ease-in-out infinite;
}

.hero-tape-2 {
  position: absolute;
  top: -15px;
  right: 30px;
  width: 90px;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--ink-medium);
  font-size: 1.2rem;
  animation: bounce 2s ease infinite;
}

.scroll-indicator i {
  font-size: 1rem;
}

/* About Section */
.about-section {
  background: linear-gradient(180deg, transparent 0%, rgba(255, 184, 198, 0.1) 100%);
}

.about-bento {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.bento-card {
  padding: 2rem;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.bento-card.revealed {
  opacity: 1;
  transform: translateY(0) rotate(var(--rotation, -2deg));
}

.note-pin {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

.note-pin.gold {
  background: linear-gradient(135deg, #f1c40f, #e67e22);
}

.card-title {
  font-family: var(--font-handwritten);
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--ink-dark);
}

.card-title i {
  margin-right: 0.5rem;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-list li {
  font-size: 1rem;
  color: var(--ink-medium);
  padding-left: 0.5rem;
}

.card-text {
  color: var(--ink-medium);
  line-height: 1.7;
}

.school-logo {
  width: 60px;
  margin-top: 1rem;
  border-radius: 8px;
}

.bento-card.featured {
  grid-column: span 2;
  text-align: center;
}

.doodle-arrow {
  font-family: var(--font-handwritten);
  font-size: 3rem;
  color: var(--ink-purple);
  margin-top: 1rem;
  animation: bounce 2s ease infinite;
}

/* Skills Section */
.skills-section {
  background: linear-gradient(180deg, rgba(255, 184, 198, 0.1) 0%, rgba(168, 216, 234, 0.1) 100%);
}

.skills-notebook {
  max-width: 800px;
  margin: 0 auto;
}

.notebook-page {
  background: var(--paper-white);
  border-radius: 0 20px 20px 0;
  padding: 3rem;
  position: relative;
  box-shadow: var(--shadow-polaroid);
  border-left: 4px solid var(--ink-red);
}

.notebook-page::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background: repeating-linear-gradient(
    transparent,
    transparent 28px,
    var(--washi-blue) 28px,
    var(--washi-blue) 30px
  );
  opacity: 0.3;
}

.notebook-holes {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.notebook-holes span {
  width: 16px;
  height: 16px;
  background: var(--paper-cream);
  border-radius: 50%;
  border: 2px solid var(--ink-light);
}

.notebook-content {
  margin-left: 50px;
}

.skill-category {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px dashed var(--ink-light);
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s ease;
}

.skill-category.revealed {
  opacity: 1;
  transform: translateX(0);
}

.skill-category:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.skill-category h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--ink-dark);
}

.skill-category h3 i {
  margin-right: 0.5rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: var(--paper-cream);
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 0.95rem;
  color: var(--ink-dark);
  border: 2px dashed transparent;
  transition: var(--transition-smooth);
  cursor: default;
}

.skill-tag:hover {
  background: var(--ink-purple);
  color: white;
  border-color: var(--ink-purple);
  transform: translateY(-3px) rotate(-2deg);
}

/* Hobbies Section */
.hobbies-section {
  background: linear-gradient(180deg, rgba(168, 216, 234, 0.1) 0%, transparent 100%);
}

.hobbies-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.hobby-polaroid {
  width: 280px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.6s ease;
}

.hobby-polaroid.revealed {
  opacity: 1;
}

.hobby-polaroid img {
  height: 250px;
}

.hobby-icon {
  font-size: 1.3rem;
  margin-right: 0.25rem;
}

.hobbies-notes {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hobby-note {
  padding: 1.5rem;
  max-width: 280px;
  font-size: 1rem;
  color: var(--ink-medium);
}

/* Gallery Section */
.gallery-section {
  background: linear-gradient(180deg, transparent 0%, rgba(255, 234, 167, 0.15) 100%);
}

.gallery-scrapbook {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.gallery-polaroid {
  cursor: pointer;
  opacity: 0;
  transition: all 0.6s ease;
  position: relative;
}

.gallery-polaroid.revealed {
  opacity: 1;
}

.gallery-polaroid img {
  height: 200px;
}

.gallery-polaroid .washi-tape {
  position: absolute;
  width: 80px;
  height: 20px;
  left: 50%;
  transform: translateX(-50%) rotate(-5deg);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-content {
  display: flex;
  justify-content: center;
}

.lightbox-polaroid {
  max-width: 500px;
  padding: 20px 20px 60px 20px;
}

.lightbox-polaroid img {
  max-height: 60vh;
  object-fit: contain;
}

.lightbox-polaroid .polaroid-caption {
  font-size: 1.5rem;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: var(--paper-white);
  border: none;
  border-radius: 12px;
  color: var(--ink-dark);
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.lightbox-close:hover {
  background: var(--ink-purple);
  color: white;
  transform: rotate(90deg);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: var(--paper-white);
  border: none;
  border-radius: 12px;
  color: var(--ink-dark);
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.lightbox-nav:hover {
  background: var(--ink-purple);
  color: white;
}

.lightbox-nav.prev {
  left: 20px;
}

.lightbox-nav.next {
  right: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* CTA Section */
.cta-section {
  padding-bottom: 100px;
}

.cta-card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--ink-dark);
}

.cta-text {
  font-size: 1.1rem;
  color: var(--ink-medium);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .hero-text {
    order: 2;
  }

  .hero-image {
    order: 1;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1.6rem;
  }

  .hero-description {
    max-width: 100%;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-social {
    justify-content: center;
  }

  .hero-polaroid {
    width: 280px;
  }

  .about-bento {
    grid-template-columns: 1fr;
  }

  .bento-card.featured {
    grid-column: span 1;
  }

  .gallery-scrapbook {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 80px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }

  .hero-polaroid {
    width: 240px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .notebook-content {
    margin-left: 30px;
  }

  .notebook-holes {
    left: 10px;
  }

  .hobbies-grid {
    gap: 1.5rem;
  }

  .hobby-polaroid {
    width: 240px;
  }

  .hobby-polaroid img {
    height: 200px;
  }

  .gallery-scrapbook {
    grid-template-columns: 1fr;
    max-width: 350px;
    margin: 0 auto;
  }

  .scroll-indicator {
    display: none;
  }

  .floating-doodles {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-polaroid {
    width: 200px;
  }

  .notebook-page {
    padding: 2rem 1.5rem;
  }

  .cta-card {
    padding: 2rem 1.5rem;
  }

  .cta-title {
    font-size: 2rem;
  }
}
</style>
