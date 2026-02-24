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
                <span class="stat-value">13+</span>
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
            <div class="vinyl-container" :class="{ playing: musicStore.isPlaying }">
              <div class="vinyl-record" :class="{ spinning: musicStore.isPlaying }">
                <div class="vinyl-grooves"></div>
                <div class="vinyl-label">
                  <img :src="musicStore.currentTrack.cover || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop'" alt="Now Playing" />
                </div>
              </div>
              <div class="vinyl-arm" :class="{ active: musicStore.isPlaying }"></div>
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
              A Web Programming student at Asia Pacific College with a passion for music. 
              I build interactive web experiences and solve problems with code, 
              while exploring different genres from rock to indie to electronic with my bands.
            </p>

            <div class="about-details">
              <div class="detail-card">
                <i class="fas fa-graduation-cap"></i>
                <div>
                  <h4>Education</h4>
                  <p>Asia Pacific College (2023 - Present)</p>
                </div>
              </div>
              <div class="detail-card">
                <i class="fas fa-laptop-code"></i>
                <div>
                  <h4>Course</h4>
                  <p>Bachelor of Science in Information Technology (BSIT)</p>
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
                  <h4>Lead Guitarist</h4>
                  <p>Playing with Cm/S, Fablewake, and solo projects</p>
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
          <h2 class="section-title">Current <span class="text-gradient">Projects</span></h2>
          <p class="section-subtitle">The bands I'm currently active with</p>
        </div>

        <div class="bands-grid">
          <div v-for="(band, index) in currentBands" :key="band.name" class="band-card" :class="{ 'dropdown-active': activeBandDropdown === index }" @click.stop="toggleBandDropdown(index)">
            <div class="band-image">
              <img :src="band.image" :alt="band.name" />
              <div class="band-overlay">
                <!-- Play video button if band has YouTube video -->
                <button v-if="band.youtubeId" class="play-video-btn" @click.stop="playBandVideo(band)" title="Watch Video">
                  <i class="fas fa-play"></i>
                </button>
                <template v-else>
                  <i class="fas fa-headphones"></i>
                  <span>Listen</span>
                </template>
              </div>
            </div>
            <div class="band-info">
              <h3 class="band-name">{{ band.name }}</h3>
              <span class="band-role">{{ band.role }}</span>
              <p class="band-genre">{{ band.genre }}</p>
              <p v-if="band.description" class="band-description">{{ band.description }}</p>
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
                <!-- Social Links -->
                <a v-if="band.facebook" :href="band.facebook" target="_blank" class="dropdown-link facebook">
                  <i class="fab fa-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a v-if="band.instagram" :href="band.instagram" target="_blank" class="dropdown-link instagram">
                  <i class="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a v-if="band.tiktok" :href="band.tiktok" target="_blank" class="dropdown-link tiktok">
                  <i class="fab fa-tiktok"></i>
                  <span>TikTok</span>
                </a>
              </div>
              <!-- Videos Section -->
              <div v-if="band.videos && band.videos.length > 0" class="dropdown-videos">
                <div class="videos-header">
                  <i class="fas fa-video"></i> Videos
                </div>
                <a 
                  v-for="(video, vidIndex) in band.videos" 
                  :key="vidIndex" 
                  :href="video.url" 
                  target="_blank" 
                  class="dropdown-link video"
                >
                  <i class="fas fa-play-circle"></i>
                  <span>{{ video.title }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Previous Projects Subsection -->
        <div class="section-header previous-projects-header">
          <h3 class="subsection-title">Previous <span class="text-gradient">Projects</span></h3>
          <p class="section-subtitle">Bands and collaborations from my musical journey</p>
        </div>

        <div class="bands-grid previous-bands">
          <div v-for="(band, index) in previousBands" :key="band.name" class="band-card" :class="{ 'dropdown-active': activeBandDropdown === (index + 3) }" @click.stop="toggleBandDropdown(index + 3)">
            <div class="band-image">
              <img :src="band.image" :alt="band.name" />
              <div class="band-overlay">
                <button v-if="band.youtubeId" class="play-video-btn" @click.stop="playBandVideo(band)" title="Watch Video">
                  <i class="fas fa-play"></i>
                </button>
                <template v-else>
                  <i class="fas fa-headphones"></i>
                  <span>Listen</span>
                </template>
              </div>
            </div>
            <div class="band-info">
              <h3 class="band-name">{{ band.name }}</h3>
              <span class="band-role">{{ band.role }}</span>
              <p class="band-genre">{{ band.genre }}</p>
              <p v-if="band.description" class="band-description">{{ band.description }}</p>
            </div>
            
            <!-- Streaming Dropdown -->
            <div class="band-dropdown" :class="{ active: activeBandDropdown === (index + 3) }" @click.stop>
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
                <a v-if="band.facebook" :href="band.facebook" target="_blank" class="dropdown-link facebook">
                  <i class="fab fa-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a v-if="band.instagram" :href="band.instagram" target="_blank" class="dropdown-link instagram">
                  <i class="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a v-if="band.tiktok" :href="band.tiktok" target="_blank" class="dropdown-link tiktok">
                  <i class="fab fa-tiktok"></i>
                  <span>TikTok</span>
                </a>
              </div>
              <div v-if="band.videos && band.videos.length > 0" class="dropdown-videos">
                <div class="videos-header">
                  <i class="fas fa-video"></i> Videos
                </div>
                <a 
                  v-for="(video, vidIndex) in band.videos" 
                  :key="vidIndex" 
                  :href="video.url" 
                  target="_blank" 
                  class="dropdown-link video"
                >
                  <i class="fas fa-play-circle"></i>
                  <span>{{ video.title }}</span>
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
          >
            <img :src="image.src" :alt="image.caption" @click="openLightbox(index)" />
            <div class="gallery-overlay">
              <span class="gallery-caption">{{ image.caption }}</span>
              <div class="gallery-buttons">
                <button class="gallery-btn expand-btn" @click="openLightbox(index)" title="View">
                  <i class="fas fa-expand"></i>
                </button>
                <button class="gallery-btn delete-btn" @click.stop="deletePhoto(image.id)" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
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

    <!-- Band Video Modal (YouTube Embed) -->
    <Transition name="video-fade">
      <div v-if="showVideoModal" class="video-modal-overlay" @click.self="closeVideo">
        <div class="video-modal">
          <button class="video-close" @click="closeVideo">
            <i class="fas fa-times"></i>
          </button>
          <div class="video-container youtube-container">
            <iframe
              :src="youtubeEmbedUrl"
              :class="{ 'video-visible': videoVisible }"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <div v-if="currentVideoBand" class="video-info">
              <h3>{{ currentVideoBand.name }}</h3>
              <p>{{ currentVideoBand.role }} • {{ currentVideoBand.genre }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script>
import { musicStore } from '../stores/musicStore'

export default {
  name: 'Home',
  data() {
    return {
      musicStore,
      profileImage: '/images/crate-guitar.JPG',
      activeTab: 'all',
      lightboxOpen: false,
      lightboxIndex: 0,
      showUploadModal: false,
      activeBandDropdown: null,
      activePlatformDropdown: null,
      // Video player state (YouTube)
      showVideoModal: false,
      currentYoutubeId: '',
      currentVideoBand: null,
      videoVisible: false,
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
       * HOW TO ADD A NEW BAND:
       * Copy one of the band objects below and add it to the array.
       * 
       * BAND OBJECT STRUCTURE:
       * {
       *   name: 'Band Name',              // Your band name
       *   role: 'Lead Guitarist',         // Your role in the band
       *   genre: 'Pop Punk',              // Music genre
       *   image: '/images/band.jpg',      // Put image in /frontend/public/images/
       *   youtubeId: 'dQw4w9WgXcQ',       // YouTube video ID (works with unlisted videos)
       *   
       *   // STREAMING LINKS (leave '' if not available):
       *   spotify: 'https://...',
       *   appleMusic: 'https://...',
       *   youtube: 'https://...',
       *   youtubeMusic: 'https://...',
       *   
       *   // SOCIAL LINKS (leave '' if not available):
       *   facebook: 'https://...',
       *   instagram: 'https://...',
       *   tiktok: 'https://...',
       *   
       *   // VIDEOS - External video links:
       *   videos: [
       *     { title: 'Music Video', url: 'https://youtube.com/watch?v=...' },
       *     { title: 'Live Performance', url: 'https://youtube.com/watch?v=...' }
       *   ]
       * }
       * 
       * VIDEO FILE SETUP:
       * 1. Create folder: /frontend/public/videos/
       * 2. Put your .mp4 videos there
       * 3. Use path like: '/videos/apc-band.mp4'
       * 4. Keep videos short (10-30 seconds) for best experience
       * =====================================================
       */
      bands: [
        {
          name: 'Centimeters Per Second "Cm/S"',
          role: 'Lead Guitarist',
          genre: 'Pop Punk',
          image: '/images/cms.jpg',
          youtubeId: 'mYEg_StsH9k',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: 'https://www.youtube.com/@CentimetersperSecond',
          youtubeMusic: '',
          facebook: 'https://www.facebook.com/profile.php?id=61573229195720',        // Add Facebook link (e.g., 'https://facebook.com/bandname')
          instagram: 'https://www.instagram.com/centimeters_per_second',       // Add Instagram link (e.g., 'https://instagram.com/bandname')
          tiktok: 'https://www.tiktok.com/@centimeters.per.second',          // Add TikTok link (e.g., 'https://tiktok.com/@bandname')
          videos: []           // Add video objects: { title: 'Video Title', url: 'https://...' }
        },
        {
          name: 'Fablewake',
          role: 'Lead Guitarist',
          genre: 'Progressive Rock',
          image: '/images/fablewake.jpg',
          youtubeId: 'n0WLBPPVObM&t=759s',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: 'https://open.spotify.com/artist/5pg6uAPBAN2wy2SxCi5fLn',
          appleMusic: 'https://music.apple.com/us/artist/fablewake/1757894350',
          youtube: 'https://www.youtube.com/@fablewakeofficial',
          youtubeMusic: 'https://music.youtube.com/channel/UCAhrwviTv21ZT5y-NcXAPYg',
          facebook: 'https://www.facebook.com/fablewakeph',        // Add Facebook link
          instagram: 'https://www.instagram.com/fablewake/',       // Add Instagram link
          tiktok: 'https://www.tiktok.com/@fablewake',          // Add TikTok link
          videos: []           // Add videos here
        },
        {
          name: 'Solo Project',
          role: 'Guitar',
          genre: 'Instrumental/Experimental',
          image: '/images/solo.JPG',
          youtubeId: 'dftDWPaeixM',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: 'https://www.youtube.com/@cratemarshall',
          youtubeMusic: '',
          facebook: 'https://www.facebook.com/CrateeMarshall/',        // Add Facebook link
          instagram: 'https://www.instagram.com/crate_marshall/',       // Add Instagram link
          tiktok: 'https://www.tiktok.com/@cratemarshall',          // Add TikTok link
          videos: []           // Add videos here
        },
        // ========== NEW BANDS (Latest to Old) ==========
        {
          name: 'APC Band',
          role: 'Guitarist',
          genre: 'Open Genre',
          description: 'APC Organization',
          image: '/images/apc-band.jpg',      // TODO: Add your image
          youtubeId: 'M0xCeyfdREc',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: '',
          youtubeMusic: '',
          facebook: 'https://www.facebook.com/theapcband',
          instagram: 'https://www.instagram.com/theapcband/',
          tiktok: 'https://www.tiktok.com/@apcband.official',
          videos: []
        },
        {
          name: '.xyze',
          role: 'Guitarist',
          genre: 'Instrumental',
          description: 'Sessionist',
          image: '/images/xyze.jpg',          // TODO: Add your image
          youtubeId: '99Rk02lMiCI&t=13s',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: 'https://open.spotify.com/artist/2ICGPlKHeUjio0qw8dMTH7',
          appleMusic: 'https://music.apple.com/us/artist/xyze/1773394953',
          youtube: 'https://www.youtube.com/channel/UCWG0McoSm5-kzISwaa_YdJA',
          youtubeMusic: 'https://music.youtube.com/channel/UCyThL3WV6bLEUXzccKR4FLA',
          facebook: 'https://www.facebook.com/xyzeband/',
          instagram: 'https://www.instagram.com/xyzeband',
          tiktok: 'https://www.tiktok.com/@xyzeband',
          videos: []
        },
        {
          name: 'Morrissey Yu',
          role: 'Lead Guitarist',
          genre: 'Progressive Rock & Instrumental',
          description: 'Thesis Project - Heavenly Ones and Space Mammal',
          image: '/images/morrissey-yu.jpg',  // TODO: Add your image
          youtubeId: 'Ac3R-_vY3bc&t=',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: 'https://open.spotify.com/artist/4mj8OnWW3nTw2LoYRjnOSV',
          appleMusic: 'https://music.apple.com/us/artist/morrissey-yu/1820966291',
          youtube: 'https://www.youtube.com/channel/UCsUq2K7FpxUVaR5XzC2qfAg',
          youtubeMusic: 'https://music.youtube.com/channel/UCM7i1Uk2wSbRv367iug0lcw',
          facebook: 'https://www.facebook.com/morrrrrris',
          instagram: 'https://www.instagram.com/camarada_yu',
          tiktok: '',
          videos: []
        },
        {
          name: 'Arlaux',
          role: 'Lead Guitarist',
          genre: 'Instrumental',
          description: 'Solo Project - Fell in the Pool',
          image: '/images/arlaux.jpg',        // TODO: Add your image
          youtubeId: 'MARVMyOc1Q0&t=478s',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: 'https://open.spotify.com/artist/1Qw81opkAUZsl7iuuLBwKr',
          appleMusic: 'https://music.apple.com/us/artist/arlaux/1719632483',
          youtube: 'https://www.youtube.com/@arlauxwav',
          youtubeMusic: 'https://music.youtube.com/channel/UCp3K_3-d0ZI54DRfXgdb2Jw',
          facebook: 'https://www.facebook.com/iamarlaux',
          instagram: 'https://www.instagram.com/arlaux.wav',
          tiktok: 'https://www.tiktok.com/@arlaux.wav',
          videos: []
        },
        {
          name: 'Redive',
          role: 'Lead Guitarist',
          genre: 'J-Rock',
          image: '/images/redive.jpg',        // TODO: Add your image
          youtubeId: '6c4sckW92hE',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: '',
          youtubeMusic: '',
          facebook: 'https://www.facebook.com/profile.php?id=61570177957723',
          instagram: 'https://www.instagram.com/rediveofficial/',
          tiktok: '',
          videos: []
        },
        {
          name: 'Moonstruck 24',
          role: 'Guitarist',
          genre: 'OPM & Pop',
          image: '/images/moonstruck24.jpg',  // TODO: Add your image
          youtubeId: 'MH15loi_YYs',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: '',
          youtubeMusic: '',
          facebook: '',
          instagram: '',
          tiktok: '',
          videos: []
        },
        {
          name: 'EarKisses',
          role: 'Guitarist',
          genre: 'OPM & Pop',
          image: '/images/earkisses.jpg',     // TODO: Add your image
          youtubeId: 'FhUgsf3aiKY',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: '',
          youtubeMusic: '',
          facebook: 'https://www.facebook.com/earkisses.band',
          instagram: '',
          tiktok: '',
          videos: []
        },
        {
          name: 'Joaquin Pacete Band',
          role: 'Guitarist',
          genre: 'OPM Pop Ballad',
          image: '/images/joaquin-pacete.jpg', // TODO: Add your image
          youtubeId: 's9PjJ_ZM97A',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: 'https://open.spotify.com/artist/5zrbkFNz6p6abNBWWiWPrT',
          appleMusic: 'https://music.apple.com/us/artist/joaquin-pacete/1498410933',
          youtube: 'https://www.youtube.com/@joaquinpacete',
          youtubeMusic: 'https://music.youtube.com/channel/UC88Tx7F3QdXycyQFjVdOlcQ',
          facebook: 'https://www.facebook.com/joaquinpacete',
          instagram: 'https://www.instagram.com/joaquinpacete/',
          tiktok: 'https://www.tiktok.com/@joaquinpacete',
          videos: []
        },
        {
          name: 'Himig ng Pagtindig',
          role: 'Guitarist',
          genre: 'OPM',
          description: 'School Project - Champion',
          image: '/images/himig.jpg',         // TODO: Add your image
          youtubeId: 'yD1CgZT1efQ',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: '',
          youtubeMusic: '',
          facebook: 'https://www.facebook.com/APCSeniorHighSchool/videos/771313244754841/',
          instagram: '',
          tiktok: '',
          videos: []
        },
        {
          name: 'Room 205 Band',
          role: 'Guitarist',
          genre: 'OPM',
          description: 'Experimental band',
          image: '/images/room205.jpg',       // TODO: Add your image
          youtubeId: 'M6n8M9GM6nQ',      // TODO: Add YouTube video ID (e.g., 'dQw4w9WgXcQ')
          spotify: '',
          appleMusic: '',
          youtube: '',
          youtubeMusic: '',
          facebook: '',
          instagram: '',
          tiktok: '',
          videos: []
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
            { name: 'React', icon: 'fab fa-react' }
          ]
        },
        {
          name: 'Backend',
          icon: 'fas fa-server',
          skills: [
            { name: 'NestJS', icon: 'fab fa-node-js' },
            { name: 'Node.js', icon: 'fab fa-node' },
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'Supabase', icon: 'fas fa-database' }
          ]
        },
        {
          name: 'Music Production',
          icon: 'fas fa-sliders-h',
          skills: [
            { name: 'Logic Pro X', icon: 'fas fa-music' },
            { name: 'Garageband', icon: 'fas fa-headphones' },
            { name: 'Neural DSP', icon: 'fas fa-guitar' },
            { name: 'Mixing', icon: 'fas fa-sliders-h' }
          ]
        },
        {
          name: 'Tools',
          icon: 'fas fa-tools',
          skills: [
            { name: 'Github', icon: 'fab fa-github' },
            { name: 'Flutter', icon: 'fas fa-mobile-alt' },
            { name: 'Claude AI', icon: 'fas fa-robot' },
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
    },
    youtubeEmbedUrl() {
      if (!this.currentYoutubeId) return ''
      // Supports unlisted and public videos with autoplay
      return `https://www.youtube.com/embed/${this.currentYoutubeId}?autoplay=1&rel=0&modestbranding=1`
    },
    // Split bands into current (first 3) and previous projects
    currentBands() {
      return this.bands.slice(0, 3)
    },
    previousBands() {
      return this.bands.slice(3)
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
    },
    deletePhoto(id) {
      if (confirm('Are you sure you want to delete this photo?')) {
        this.gallery = this.gallery.filter(photo => photo.id !== id)
        localStorage.setItem('crate-gallery', JSON.stringify(this.gallery))
      }
    },
    
    // YouTube video player methods
    playBandVideo(band) {
      if (!band.youtubeId) return
      
      this.currentYoutubeId = band.youtubeId
      this.currentVideoBand = band
      this.showVideoModal = true
      this.videoVisible = false
      
      // Fade in after modal renders
      this.$nextTick(() => {
        setTimeout(() => {
          this.videoVisible = true
        }, 100)
      })
    },
    
    closeVideo() {
      this.videoVisible = false
      // Wait for fade out animation
      setTimeout(() => {
        this.showVideoModal = false
        this.currentYoutubeId = ''
        this.currentVideoBand = null
      }, 300)
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
  box-shadow: 
    0 0 0 10px rgba(139, 92, 246, 0.1),
    0 0 60px rgba(139, 92, 246, 0.3),
    inset 0 0 80px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
}

/* Spinning animation - always applied, paused when not playing */
.vinyl-record {
  animation: spin-slow 3s linear infinite;
  animation-play-state: paused;
}

.vinyl-record.spinning {
  animation-play-state: running;
  box-shadow: 
    0 0 0 10px rgba(139, 92, 246, 0.2),
    0 0 80px rgba(139, 92, 246, 0.5),
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
  transform: rotate(35deg);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s ease;
}

/* Tonearm moves to vinyl when playing */
.vinyl-arm.active {
  transform: rotate(20deg);
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

/* Previous Projects Section */
.previous-projects-header {
  margin-top: 60px;
  margin-bottom: 32px;
  padding-top: 40px;
  border-top: 1px solid var(--border-color);
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.previous-bands .band-card {
  opacity: 0.9;
}

.previous-bands .band-card:hover {
  opacity: 1;
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

.band-card.dropdown-active {
  z-index: 50;
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

/* Play Video Button */
.play-video-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: var(--accent-primary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.5);
}

.play-video-btn i {
  font-size: 1.8rem;
  color: white;
  margin-left: 4px; /* Optical centering for play icon */
}

.play-video-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(139, 92, 246, 0.7);
}

/* Video Modal */
.video-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.video-modal {
  position: relative;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
}

.video-close {
  position: absolute;
  top: -50px;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.video-close:hover {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.video-container {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #000;
}

/* YouTube iframe responsive container */
.video-container.youtube-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.video-container iframe.video-visible {
  opacity: 1;
}

.video-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
  color: white;
  pointer-events: none;
}

.video-info h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.video-info p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Video Modal Transitions */
.video-fade-enter-active,
.video-fade-leave-active {
  transition: opacity 0.4s ease;
}

.video-fade-enter-from,
.video-fade-leave-to {
  opacity: 0;
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
.dropdown-link.facebook:hover { color: #1877F2; }
.dropdown-link.instagram:hover { color: #E4405F; }
.dropdown-link.tiktok:hover { color: #00f2ea; }
.dropdown-link.video:hover { color: var(--accent-primary); }

.dropdown-link i {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

/* Videos Section in Dropdown */
.dropdown-videos {
  border-top: 1px solid var(--border-color);
  padding: 8px;
}

.videos-header {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 12px 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.videos-header i {
  color: var(--accent-primary);
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

.band-description {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 4px;
  opacity: 0.8;
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

.gallery-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.gallery-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.expand-btn {
  background: var(--accent-primary);
  color: white;
}

.expand-btn:hover {
  background: var(--accent-secondary);
  transform: scale(1.1);
}

.delete-btn {
  background: var(--accent-red);
  color: white;
}

.delete-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
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
