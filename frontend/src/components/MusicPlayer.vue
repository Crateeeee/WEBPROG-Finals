<template>
  <div class="music-player" :class="{ minimized: isMinimized }">
    <!-- Minimized View -->
    <div v-if="isMinimized" class="player-mini" @click="isMinimized = false">
      <div class="mini-album" :class="{ playing: isPlaying }">
        <img :src="currentTrack.cover" :alt="currentTrack.title" />
      </div>
      <div class="mini-equalizer" v-if="isPlaying">
        <span></span><span></span><span></span>
      </div>
    </div>

    <!-- Full Player -->
    <div v-else class="player-full">
      <!-- Header -->
      <div class="player-header">
        <span class="player-label">
          <i class="fas fa-music"></i> Now Playing
        </span>
        <button class="player-minimize" @click="isMinimized = true">
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
            <span class="playlist-artist">{{ track.artist }}</span>
          </div>
          <span class="playlist-duration">{{ track.duration }}</span>
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
      // Sample playlist - Replace with your actual tracks
      playlist: [
        {
          title: 'Demo Track 1',
          artist: 'Crate Studio',
          band: 'Your Band Name',
          cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
          src: '',
          duration: '3:45'
        },
        {
          title: 'Demo Track 2',
          artist: 'Crate Studio',
          band: 'Your Band Name',
          cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
          src: '',
          duration: '4:12'
        },
        {
          title: 'Demo Track 3',
          artist: 'Crate Studio',
          band: 'Another Band',
          cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
          src: '',
          duration: '3:28'
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
    togglePlay() {
      if (!this.currentTrack.src) {
        // No audio source - just toggle visual state for demo
        this.isPlaying = !this.isPlaying
        return
      }
      
      if (this.isPlaying) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
      this.isPlaying = !this.isPlaying
    },
    
    playTrack(index) {
      this.currentIndex = index
      this.$nextTick(() => {
        if (this.currentTrack.src) {
          this.$refs.audio.play()
          this.isPlaying = true
        }
      })
    },
    
    nextTrack() {
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length
      if (this.isPlaying && this.currentTrack.src) {
        this.$nextTick(() => this.$refs.audio.play())
      }
    },
    
    prevTrack() {
      this.currentIndex = this.currentIndex === 0 
        ? this.playlist.length - 1 
        : this.currentIndex - 1
      if (this.isPlaying && this.currentTrack.src) {
        this.$nextTick(() => this.$refs.audio.play())
      }
    },
    
    updateTime() {
      this.currentTime = this.$refs.audio.currentTime
    },
    
    onLoaded() {
      this.duration = this.$refs.audio.duration
    },
    
    seek(e) {
      const rect = e.target.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      if (this.$refs.audio.duration) {
        this.$refs.audio.currentTime = percent * this.$refs.audio.duration
      }
    },
    
    setVolume(e) {
      this.volume = parseInt(e.target.value)
      this.isMuted = false
      if (this.$refs.audio) {
        this.$refs.audio.volume = this.volume / 100
      }
    },
    
    toggleMute() {
      if (this.isMuted) {
        this.volume = this.previousVolume
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
}

.player-mini {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
}

.track-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
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
  overflow: hidden;
}

.player-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-pink));
  border-radius: var(--radius-full);
  transition: width 0.1s linear;
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
  justify-content: center;
  gap: 8px;
  background: var(--bg-elevated);
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
