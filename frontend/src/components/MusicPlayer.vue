<template>
  <div class="music-player" :class="{ minimized: isMinimized }">
    <!-- Minimized View -->
    <div v-if="isMinimized" class="player-mini" @click="toggleMinimize">
      <div class="mini-album" :class="{ playing: isPlaying }">
        <img :src="currentTrack.cover" :alt="currentTrack.title" />
      </div>
      <div class="mini-equalizer" v-if="isPlaying">
        <span></span><span></span><span></span>
      </div>
      <div class="mini-play-btn" @click.stop="togglePlay">
        <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
      </div>
    </div>

    <!-- Full Player -->
    <div v-else class="player-full">
      <!-- Header -->
      <div class="player-header">
        <span class="player-label">
          <i class="fas fa-music"></i> Now Playing
        </span>
        <button class="player-minimize" @click="toggleMinimize" title="Minimize">
          <i class="fas fa-minus"></i>
        </button>
      </div>

      <!-- Current Track -->
      <div class="player-track">
        <div class="player-album-art" :class="{ playing: isPlaying }">
          <img :src="currentTrack.cover" :alt="currentTrack.title" />
          <div class="album-vinyl"></div>
        </div>
        <div class="player-info">
          <h4 class="track-title">{{ currentTrack.title }}</h4>
          <p class="track-artist">{{ currentTrack.artist }}</p>
          <span class="track-band" v-if="currentTrack.band">{{ currentTrack.band }}</span>
        </div>
      </div>

      <!-- Progress -->
      <div class="player-progress-wrapper">
        <span class="time-current">{{ formatTime(currentTime) }}</span>
        <div class="player-progress" @click="seek">
          <div class="player-progress-bar" :style="{ width: progress + '%' }"></div>
          <div class="player-progress-thumb" :style="{ left: progress + '%' }"></div>
        </div>
        <span class="time-total">{{ formatTime(duration) }}</span>
      </div>

      <!-- Controls -->
      <div class="player-controls">
        <button class="player-btn" @click="prevTrack" title="Previous">
          <i class="fas fa-step-backward"></i>
        </button>
        <button class="player-btn play-btn" @click="togglePlay" :title="isPlaying ? 'Pause' : 'Play'">
          <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
        <button class="player-btn" @click="nextTrack" title="Next">
          <i class="fas fa-step-forward"></i>
        </button>
      </div>

      <!-- Volume -->
      <div class="player-volume">
        <button class="volume-btn" @click="toggleMute">
          <i :class="volumeIcon"></i>
        </button>
        <input 
          type="range" 
          min="0" 
          max="100" 
          :value="volume" 
          @input="setVolume"
          class="volume-slider"
        />
      </div>

      <!-- Playlist Toggle -->
      <button class="playlist-toggle" @click="showPlaylist = !showPlaylist">
        <i class="fas fa-list"></i>
        <span>Playlist ({{ playlist.length }})</span>
        <i :class="showPlaylist ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" style="margin-left: auto;"></i>
      </button>

      <!-- Playlist -->
      <div v-if="showPlaylist" class="player-playlist">
        <div 
          v-for="(track, index) in playlist" 
          :key="index"
          class="playlist-item"
          :class="{ active: index === currentIndex }"
          @click="playTrack(index)"
        >
          <img :src="track.cover" :alt="track.title" class="playlist-cover" />
          <div class="playlist-info">
            <span class="playlist-title">{{ track.title }}</span>
            <span class="playlist-artist">{{ track.band || track.artist }}</span>
          </div>
          <div class="playlist-playing" v-if="index === currentIndex && isPlaying">
            <span></span><span></span><span></span>
          </div>
          <span v-else class="playlist-duration">{{ track.duration }}</span>
        </div>
      </div>
    </div>

    <!-- Hidden Audio Element -->
    <audio 
      ref="audio"
      :src="currentTrack.src"
      @timeupdate="updateTime"
      @loadedmetadata="onLoaded"
      @ended="nextTrack"
      @canplay="onCanPlay"
      @error="onError"
      preload="metadata"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      isMinimized: true,
      isPlaying: false,
      showPlaylist: false,
      currentIndex: 0,
      currentTime: 0,
      duration: 0,
      volume: 80,
      isMuted: false,
      previousVolume: 80,
      canPlay: false,
      
      /**
       * =====================================================
       * 🎵 YOUR PLAYLIST - EDIT YOUR SONGS HERE
       * =====================================================
       * 
       * HOW TO ADD YOUR BAND'S MUSIC:
       * 
       * 1. Put your MP3 files in: /frontend/public/music/
       *    Example: /frontend/public/music/band1-song1.mp3
       * 
       * 2. Add track info below with the path starting with /music/
       *    Example: src: '/music/band1-song1.mp3'
       * 
       * 3. For cover images, put them in: /frontend/public/images/
       *    Example: /frontend/public/images/band1-cover.jpg
       * 
       * TRACK OBJECT STRUCTURE:
       * {
       *   title: 'Song Title',           // Name of the song
       *   artist: 'Artist/Band Name',    // Main artist
       *   band: 'Your Band Name',        // Optional: Display band name
       *   src: '/music/filename.mp3',    // Path to audio file
       *   cover: '/images/cover.jpg',    // Path to album art
       *   duration: '3:45'               // Display duration
       * }
       * =====================================================
       */
      playlist: [
        // ===== BAND 1 SONGS =====
        {
          title: 'Song Title 1',
          artist: 'Crate Marshall',
          band: 'YOUR BAND 1 NAME',
          src: '/music/band1-song1.mp3',
          cover: '/images/band1-cover.jpg',
          duration: '3:45'
        },
        {
          title: 'Song Title 2',
          artist: 'Crate Marshall',
          band: 'YOUR BAND 1 NAME',
          src: '/music/band1-song2.mp3',
          cover: '/images/band1-cover.jpg',
          duration: '4:12'
        },
        
        // ===== BAND 2 SONGS =====
        {
          title: 'Song Title 3',
          artist: 'Crate Marshall',
          band: 'YOUR BAND 2 NAME',
          src: '/music/band2-song1.mp3',
          cover: '/images/band2-cover.jpg',
          duration: '3:28'
        },
        
        // ===== SOLO PROJECT SONGS =====
        {
          title: 'Solo Song 1',
          artist: 'Crate Marshall',
          band: 'Solo Project',
          src: '/music/solo-song1.mp3',
          cover: '/images/solo-cover.jpg',
          duration: '4:00'
        }
      ]
    }
  },
  computed: {
    currentTrack() {
      return this.playlist[this.currentIndex] || this.playlist[0]
    },
    progress() {
      if (this.duration === 0) return 0
      return (this.currentTime / this.duration) * 100
    },
    volumeIcon() {
      if (this.isMuted || this.volume === 0) return 'fas fa-volume-mute'
      if (this.volume < 50) return 'fas fa-volume-down'
      return 'fas fa-volume-up'
    }
  },
  methods: {
    toggleMinimize() {
      this.isMinimized = !this.isMinimized
    },
    
    togglePlay() {
      const audio = this.$refs.audio
      
      if (!audio) return
      
      if (this.isPlaying) {
        audio.pause()
        this.isPlaying = false
      } else {
        // Try to play
        const playPromise = audio.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true
            })
            .catch(error => {
              console.warn('Playback failed:', error)
              // Still toggle visual state for demo if no audio source
              if (!this.currentTrack.src || this.currentTrack.src.includes('placeholder')) {
                this.isPlaying = !this.isPlaying
              }
            })
        }
      }
    },
    
    playTrack(index) {
      this.currentIndex = index
      this.currentTime = 0
      this.duration = 0
      
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio && this.currentTrack.src) {
          audio.load()
          const playPromise = audio.play()
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                this.isPlaying = true
              })
              .catch(error => {
                console.warn('Playback failed:', error)
              })
          }
        }
      })
    },
    
    nextTrack() {
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length
      this.$nextTick(() => {
        if (this.isPlaying) {
          this.playTrack(this.currentIndex)
        }
      })
    },
    
    prevTrack() {
      // If more than 3 seconds into track, restart it
      if (this.currentTime > 3) {
        this.$refs.audio.currentTime = 0
        return
      }
      
      this.currentIndex = this.currentIndex === 0 
        ? this.playlist.length - 1 
        : this.currentIndex - 1
        
      this.$nextTick(() => {
        if (this.isPlaying) {
          this.playTrack(this.currentIndex)
        }
      })
    },
    
    updateTime() {
      if (this.$refs.audio) {
        this.currentTime = this.$refs.audio.currentTime
      }
    },
    
    onLoaded() {
      if (this.$refs.audio) {
        this.duration = this.$refs.audio.duration
      }
    },
    
    onCanPlay() {
      this.canPlay = true
    },
    
    onError(e) {
      console.warn('Audio error:', e)
      this.canPlay = false
    },
    
    seek(e) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      
      if (this.$refs.audio && this.duration) {
        this.$refs.audio.currentTime = percent * this.duration
      }
    },
    
    setVolume(e) {
      this.volume = parseInt(e.target.value)
      this.isMuted = this.volume === 0
      
      if (this.$refs.audio) {
        this.$refs.audio.volume = this.volume / 100
      }
    },
    
    toggleMute() {
      if (this.isMuted) {
        this.volume = this.previousVolume || 80
        this.isMuted = false
      } else {
        this.previousVolume = this.volume
        this.volume = 0
        this.isMuted = true
      }
      
      if (this.$refs.audio) {
        this.$refs.audio.volume = this.volume / 100
      }
    },
    
    formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '0:00'
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
  },
  mounted() {
    // Set initial volume
    if (this.$refs.audio) {
      this.$refs.audio.volume = this.volume / 100
    }
  }
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Minimized State */
.music-player.minimized {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  padding: 0;
  width: 60px;
  height: 60px;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
}

.player-mini {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.mini-album {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.mini-album.playing {
  animation: spin-slow 4s linear infinite;
}

.mini-album img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: white;
  font-size: 1rem;
}

.player-mini:hover .mini-play-btn {
  opacity: 1;
}

.mini-equalizer {
  position: absolute;
  bottom: -8px;
  display: flex;
  gap: 2px;
  align-items: flex-end;
}

.mini-equalizer span {
  width: 3px;
  background: var(--accent-primary);
  border-radius: 2px;
  animation: equalizer 0.8s ease infinite;
}

.mini-equalizer span:nth-child(1) { height: 8px; animation-delay: 0s; }
.mini-equalizer span:nth-child(2) { height: 12px; animation-delay: 0.2s; }
.mini-equalizer span:nth-child(3) { height: 6px; animation-delay: 0.4s; }

@keyframes equalizer {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Full Player */
.player-full {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  width: 340px;
  box-shadow: var(--shadow-lg);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.player-label {
  font-size: 0.85rem;
  color: var(--accent-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.player-minimize {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.player-minimize:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

/* Current Track */
.player-track {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.player-album-art {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.player-album-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-album-art.playing img {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.1); }
}

.album-vinyl {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
}

.player-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.track-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

.track-band {
  font-size: 0.75rem;
  color: var(--accent-primary);
  margin-top: 4px;
}

/* Progress */
.player-progress-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.time-current,
.time-total {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  min-width: 35px;
}

.time-total {
  text-align: right;
}

.player-progress {
  flex: 1;
  height: 4px;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  cursor: pointer;
  position: relative;
}

.player-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-pink));
  border-radius: var(--radius-full);
  transition: width 0.1s linear;
}

.player-progress-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: var(--accent-primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-glow);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.player-progress:hover .player-progress-thumb {
  opacity: 1;
}

/* Controls */
.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.player-btn {
  width: 40px;
  height: 40px;
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

.player-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.player-btn.play-btn {
  width: 50px;
  height: 50px;
  background: var(--accent-primary);
  color: white;
}

.player-btn.play-btn:hover {
  background: var(--accent-secondary);
  transform: scale(1.05);
  box-shadow: 0 0 20px var(--accent-glow);
}

/* Volume */
.player-volume {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.volume-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 50%;
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
  width: 14px;
  height: 14px;
  background: var(--accent-primary);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Playlist Toggle */
.playlist-toggle {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-elevated);
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.playlist-toggle:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

/* Playlist */
.player-playlist {
  margin-top: 12px;
  max-height: 200px;
  overflow-y: auto;
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.playlist-item:hover {
  background: var(--bg-hover);
}

.playlist-item.active {
  background: rgba(139, 92, 246, 0.15);
}

.playlist-cover {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

.playlist-info {
  flex: 1;
  min-width: 0;
}

.playlist-title {
  display: block;
  font-size: 0.9rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-artist {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.playlist-duration {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.playlist-playing {
  display: flex;
  gap: 2px;
  align-items: flex-end;
}

.playlist-playing span {
  width: 3px;
  background: var(--accent-primary);
  border-radius: 2px;
  animation: equalizer 0.8s ease infinite;
}

.playlist-playing span:nth-child(1) { height: 10px; animation-delay: 0s; }
.playlist-playing span:nth-child(2) { height: 14px; animation-delay: 0.2s; }
.playlist-playing span:nth-child(3) { height: 8px; animation-delay: 0.4s; }

/* Responsive */
@media (max-width: 768px) {
  .music-player {
    bottom: 16px;
    right: 16px;
  }
  
  .player-full {
    width: calc(100vw - 32px);
    max-width: 340px;
  }
}
</style>
