<template>
  <main class="music-page">
    <!-- Background Gradient based on cover art -->
    <div class="music-bg" :style="{ background: `linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, var(--bg-primary) 50%)` }">
      <div class="music-bg-blur"></div>
    </div>

    <!-- Main Content -->
    <div class="music-container">
      <!-- Left Side: Now Playing -->
      <div class="now-playing-section">
        <div class="now-playing-header">
          <span class="section-label"><i class="fas fa-play-circle"></i> Now Playing</span>
        </div>

        <!-- Large Album Art -->
        <div class="album-art-large" :class="{ playing: musicStore.isPlaying }">
          <img :src="musicStore.currentTrack.cover" :alt="musicStore.currentTrack.title" />
          <div class="album-vinyl" :class="{ spinning: musicStore.isPlaying }">
            <div class="vinyl-inner"></div>
          </div>
        </div>

        <!-- Track Info -->
        <div class="track-info-large">
          <h1 class="track-title">{{ musicStore.currentTrack.title }}</h1>
          <p class="track-artist">{{ musicStore.currentTrack.artist }}</p>
          <span class="track-genre" v-if="musicStore.currentTrack.genre">
            <i class="fas fa-tag"></i> {{ musicStore.currentTrack.genre }}
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="progress-section">
          <span class="time-label">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar" @click="seek">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <div class="progress-thumb" :style="{ left: progress + '%' }"></div>
          </div>
          <span class="time-label">{{ musicStore.currentTrack.duration }}</span>
        </div>

        <!-- Controls -->
        <div class="controls-section">
          <button class="control-btn shuffle" :class="{ active: shuffleEnabled }" @click="toggleShuffle">
            <i class="fas fa-random"></i>
          </button>
          <button class="control-btn" @click="prevTrack">
            <i class="fas fa-step-backward"></i>
          </button>
          <button class="control-btn play-btn" @click="togglePlay">
            <i :class="musicStore.isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
          </button>
          <button class="control-btn" @click="nextTrack">
            <i class="fas fa-step-forward"></i>
          </button>
          <button class="control-btn repeat" :class="{ active: repeatEnabled }" @click="toggleRepeat">
            <i class="fas fa-redo"></i>
          </button>
        </div>

        <!-- Volume -->
        <div class="volume-section">
          <button class="volume-btn" @click="toggleMute">
            <i :class="volumeIcon"></i>
          </button>
          <input type="range" min="0" max="100" v-model="volume" class="volume-slider" />
        </div>
      </div>

      <!-- Right Side: Playlist & Recommendations -->
      <div class="playlist-section">
        <!-- Your Queue -->
        <div class="playlist-panel">
          <div class="panel-header">
            <h2><i class="fas fa-list"></i> Up Next</h2>
          </div>
          <div class="playlist-items">
            <div 
              v-for="(track, index) in musicStore.playlist" 
              :key="index"
              class="playlist-item"
              :class="{ active: index === musicStore.currentIndex }"
              @click="playTrack(index)"
            >
              <div class="item-cover">
                <img :src="track.cover" :alt="track.title" />
                <div class="item-playing" v-if="index === musicStore.currentIndex && musicStore.isPlaying">
                  <span></span><span></span><span></span>
                </div>
                <div class="item-overlay" v-else>
                  <i class="fas fa-play"></i>
                </div>
              </div>
              <div class="item-info">
                <span class="item-title">{{ track.title }}</span>
                <span class="item-artist">{{ track.band || track.artist }}</span>
              </div>
              <span class="item-duration">{{ track.duration }}</span>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="recommendations-panel">
          <div class="panel-header">
            <h2><i class="fas fa-magic"></i> You Might Also Like</h2>
            <span class="rec-subtitle">Based on {{ musicStore.currentTrack.genre || 'your music' }}</span>
          </div>
          <div class="recommendations-grid">
            <a 
              v-for="(rec, index) in currentRecommendations" 
              :key="index"
              :href="rec.spotifyUrl || rec.appleMusicUrl"
              target="_blank"
              class="rec-card"
            >
              <div class="rec-cover">
                <img :src="rec.cover" :alt="rec.title" @error="handleImageError" />
                <div class="rec-placeholder">
                  <i class="fas fa-music"></i>
                </div>
                <div class="rec-overlay">
                  <i class="fab fa-spotify"></i>
                </div>
              </div>
              <div class="rec-info">
                <span class="rec-title">{{ rec.title }}</span>
                <span class="rec-artist">{{ rec.artist }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { musicStore } from '../stores/musicStore'

export default {
  name: 'Music',
  data() {
    return {
      musicStore,
      currentTime: 0,
      volume: 80,
      isMuted: false,
      shuffleEnabled: false,
      repeatEnabled: false,
      audioRef: null
    }
  },
  computed: {
    progress() {
      // Parse duration string to seconds for calculation
      const [mins, secs] = (this.musicStore.currentTrack.duration || '0:00').split(':')
      const totalSeconds = parseInt(mins) * 60 + parseInt(secs)
      if (totalSeconds === 0) return 0
      return (this.currentTime / totalSeconds) * 100
    },
    volumeIcon() {
      if (this.isMuted || this.volume === 0) return 'fas fa-volume-mute'
      if (this.volume < 50) return 'fas fa-volume-down'
      return 'fas fa-volume-up'
    },
    currentRecommendations() {
      return this.musicStore.getRecommendations()
    }
  },
  mounted() {
    // Find the audio element from MusicPlayer component
    this.findAudioElement()
    // Handle keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboard)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard)
  },
  methods: {
    handleImageError(event) {
      // Hide broken image, show placeholder
      event.target.style.display = 'none'
    },
    findAudioElement() {
      // Try to find audio element - it's in the MusicPlayer component
      const checkAudio = setInterval(() => {
        const audio = document.querySelector('.music-player audio')
        if (audio) {
          this.audioRef = audio
          this.volume = Math.round(audio.volume * 100)
          audio.addEventListener('timeupdate', this.updateTime)
          clearInterval(checkAudio)
        }
      }, 100)
      
      // Clear after 5 seconds if not found
      setTimeout(() => clearInterval(checkAudio), 5000)
    },
    
    updateTime() {
      if (this.audioRef) {
        this.currentTime = this.audioRef.currentTime
      }
    },
    
    togglePlay() {
      // Dispatch a custom event that MusicPlayer can listen to
      const event = new CustomEvent('music-toggle-play')
      window.dispatchEvent(event)
    },
    
    nextTrack() {
      const event = new CustomEvent('music-next-track')
      window.dispatchEvent(event)
    },
    
    prevTrack() {
      const event = new CustomEvent('music-prev-track')
      window.dispatchEvent(event)
    },
    
    playTrack(index) {
      const event = new CustomEvent('music-play-track', { detail: { index } })
      window.dispatchEvent(event)
    },
    
    seek(e) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      const [mins, secs] = (this.musicStore.currentTrack.duration || '0:00').split(':')
      const totalSeconds = parseInt(mins) * 60 + parseInt(secs)
      const seekTime = percent * totalSeconds
      
      if (this.audioRef) {
        this.audioRef.currentTime = seekTime
      }
    },
    
    toggleMute() {
      this.isMuted = !this.isMuted
      if (this.audioRef) {
        this.audioRef.muted = this.isMuted
      }
    },
    
    toggleShuffle() {
      this.shuffleEnabled = !this.shuffleEnabled
    },
    
    toggleRepeat() {
      this.repeatEnabled = !this.repeatEnabled
    },
    
    handleKeyboard(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      
      switch(e.code) {
        case 'Space':
          e.preventDefault()
          this.togglePlay()
          break
        case 'ArrowRight':
          this.nextTrack()
          break
        case 'ArrowLeft':
          this.prevTrack()
          break
      }
    },
    
    formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '0:00'
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
  },
  watch: {
    volume(newVal) {
      if (this.audioRef) {
        this.audioRef.volume = newVal / 100
      }
    }
  }
}
</script>

<style scoped>
.music-page {
  min-height: 100vh;
  padding: var(--nav-height) 0 120px;
  position: relative;
  overflow: hidden;
}

.music-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.music-bg-blur {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(100px);
  background: rgba(0, 0, 0, 0.7);
}

.music-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
  min-height: calc(100vh - var(--nav-height) - 120px);
}

/* Now Playing Section */
.now-playing-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.now-playing-header .section-label {
  font-family: var(--font-mono);
  color: var(--accent-primary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.album-art-large {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.album-art-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.album-art-large.playing img {
  transform: scale(1.05);
}

.album-vinyl {
  position: absolute;
  top: 50%;
  right: -60px;
  transform: translateY(-50%);
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.5s ease;
  z-index: -1;
}

.album-art-large.playing .album-vinyl {
  opacity: 1;
  right: -100px;
}

.album-vinyl.spinning {
  animation: spin-slow 3s linear infinite;
}

.vinyl-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: var(--accent-primary);
  border-radius: 50%;
}

@keyframes spin-slow {
  from { transform: translateY(-50%) rotate(0deg); }
  to { transform: translateY(-50%) rotate(360deg); }
}

.track-info-large {
  text-align: center;
}

.track-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.track-artist {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.track-genre {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--accent-primary);
}

/* Progress Bar */
.progress-section {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
}

.time-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  min-width: 45px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  transition: width 0.1s ease;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: var(--accent-primary);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-bar:hover .progress-thumb {
  opacity: 1;
}

/* Controls */
.controls-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.control-btn.active {
  color: var(--accent-primary);
}

.control-btn.play-btn {
  width: 64px;
  height: 64px;
  background: var(--accent-primary);
  color: white;
  font-size: 1.5rem;
}

.control-btn.play-btn:hover {
  background: var(--accent-secondary);
  transform: scale(1.05);
}

/* Volume */
.volume-section {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 200px;
}

.volume-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.volume-btn:hover {
  color: var(--text-primary);
}

.volume-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: var(--accent-primary);
  border-radius: 50%;
  cursor: pointer;
}

/* Playlist Section */
.playlist-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
}

.playlist-panel,
.recommendations-panel {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-header h2 i {
  color: var(--accent-primary);
}

.rec-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Playlist Items */
.playlist-items {
  max-height: 250px;
  overflow-y: auto;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.playlist-item:hover {
  background: var(--bg-elevated);
}

.playlist-item.active {
  background: rgba(139, 92, 246, 0.1);
}

.item-cover {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.item-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.playlist-item:hover .item-overlay {
  opacity: 1;
}

.item-overlay i {
  color: white;
  font-size: 1rem;
}

.item-playing {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.item-playing span {
  width: 3px;
  height: 12px;
  background: var(--accent-primary);
  border-radius: 2px;
  animation: equalizer 0.8s ease infinite;
}

.item-playing span:nth-child(1) { animation-delay: 0s; }
.item-playing span:nth-child(2) { animation-delay: 0.2s; }
.item-playing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes equalizer {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.4); }
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-item.active .item-title {
  color: var(--accent-primary);
}

.item-artist {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.item-duration {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* Recommendations Grid */
.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.rec-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  text-decoration: none;
}

.rec-card:hover {
  background: var(--bg-hover);
  transform: translateY(-4px);
}

.rec-cover {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.rec-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

.rec-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 2rem;
  opacity: 0.5;
}

.rec-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.rec-card:hover .rec-overlay {
  opacity: 1;
}

.rec-overlay i {
  font-size: 2rem;
  color: #1DB954;
}

.rec-info {
  display: flex;
  flex-direction: column;
}

.rec-title {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rec-artist {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 1024px) {
  .music-container {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .album-art-large {
    width: 250px;
    height: 250px;
  }
  
  .recommendations-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .music-page {
    padding-bottom: 160px;
  }
  
  .now-playing-section {
    padding: 24px;
  }
  
  .album-art-large {
    width: 200px;
    height: 200px;
  }
  
  .album-vinyl {
    display: none;
  }
  
  .track-title {
    font-size: 1.4rem;
  }
  
  .recommendations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
