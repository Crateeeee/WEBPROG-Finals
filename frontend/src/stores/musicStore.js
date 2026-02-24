import { reactive } from 'vue'

/**
 * Shared Music Player State
 * This reactive store allows communication between the MusicPlayer component
 * and other components (like the vinyl on Home page, Music page)
 */
export const musicStore = reactive({
  isPlaying: false,
  currentTrack: {
    title: 'Breaking The Waves',
    artist: 'Fablewake',
    band: 'Fablewake',
    cover: '/images/BTW.jpg',
    src: '/music/breaking-the-waves.wav',
    duration: '4:31',
    genre: 'Progressive Rock'
  },
  currentIndex: 0,
  
  /**
   * =====================================================
   * 🎵 MASTER PLAYLIST - Add your songs here
   * =====================================================
   * Add genre field to enable smart recommendations
   */
  playlist: [
    {
      title: 'Breaking The Waves',
      artist: 'Fablewake',
      band: 'Fablewake',
      src: '/music/breaking-the-waves.wav',
      cover: '/images/BTW.jpg',
      duration: '4:31',
      genre: 'Progressive Rock'
    },
    {
      title: 'Chernobyl Heart',
      artist: 'Fablewake',
      band: 'Fablewake',
      src: '/music/chernobyl-heart.mp3',
      cover: '/images/chernobyl.jpg',
      duration: '4:04',
      genre: 'Progressive Rock'
    },
    {
      title: 'Cm/S Demo',
      artist: 'Centimeters Per Second',
      band: 'Centimeters Per Second "Cm/S"',
      src: '/music/demo.wav',
      cover: '/images/cms-gig.JPG',
      duration: '4:41',
      genre: 'Pop Punk'
    }
  ],
  
  /**
   * Recommendations - External songs similar to your music
   * These are display-only recommendations with external links
   */
  recommendations: [
    // Progressive Rock recommendations
    {
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      cover: '/images/dark-side-moon.jpg',
      genre: 'Progressive Rock',
      spotifyUrl: 'https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv',
      appleMusicUrl: 'https://music.apple.com/album/the-dark-side-of-the-moon/1065973699'
    },
    {
      title: 'Lateralus',
      artist: 'Tool',
      cover: 'https://i.scdn.co/image/ab67616d00001e02ed65a55eebc02d95e62a167d',
      genre: 'Progressive Rock',
      spotifyUrl: 'https://open.spotify.com/album/5l5m1hnH4punS1GQXgEi3T',
      appleMusicUrl: 'https://music.apple.com/album/lateralus/1474827158'
    },
    {
      title: 'Metropolis Pt. 2',
      artist: 'Dream Theater',
      cover: 'https://i.scdn.co/image/ab67616d00001e02c0f3a4c48d9fa70f41b99ee4',
      genre: 'Progressive Rock',
      spotifyUrl: 'https://open.spotify.com/album/3g8kKHRTJFfWP2vQ9ZKF9l',
      appleMusicUrl: 'https://music.apple.com/album/metropolis-pt-2-scenes-from-a-memory/1440652917'
    },
    // Pop Punk recommendations  
    {
      title: 'Dammit',
      artist: 'Blink-182',
      cover: 'https://i.scdn.co/image/ab67616d00001e0282c1fe8644c7a9712fb3b651',
      genre: 'Pop Punk',
      spotifyUrl: 'https://open.spotify.com/album/2wTlNgezDlkUlo9Xl0dvLT',
      appleMusicUrl: 'https://music.apple.com/album/dude-ranch/1440839912'
    },
    {
      title: 'The Middle',
      artist: 'Jimmy Eat World',
      cover: 'https://i.scdn.co/image/ab67616d00001e028665e7c0f670d3e9c3d1a56e',
      genre: 'Pop Punk',
      spotifyUrl: 'https://open.spotify.com/album/0EmK4cHfTkLm4oeJz8cQM4',
      appleMusicUrl: 'https://music.apple.com/album/bleed-american/1440851533'
    },
    {
      title: 'Sugar, We\'re Goin Down',
      artist: 'Fall Out Boy',
      cover: 'https://i.scdn.co/image/ab67616d00001e02e3e9e27c11ec8cde54b96888',
      genre: 'Pop Punk',
      spotifyUrl: 'https://open.spotify.com/album/5nkUSlgerBEtiVEjxHIfMR',
      appleMusicUrl: 'https://music.apple.com/album/from-under-the-cork-tree/1440767450'
    }
  ],
  
  // Methods to update state
  setPlaying(state) {
    this.isPlaying = state
  },
  
  setCurrentTrack(track) {
    this.currentTrack = { ...track }
  },
  
  setCurrentIndex(index) {
    this.currentIndex = index
  },
  
  // Get recommendations based on current track genre
  getRecommendations() {
    const currentGenre = this.currentTrack.genre
    const filtered = this.recommendations.filter(rec => rec.genre === currentGenre)
    // If no matches, return all recommendations
    return filtered.length > 0 ? filtered : this.recommendations
  },
  
  // Get all tracks except current
  getUpNext() {
    return this.playlist.filter((_, idx) => idx !== this.currentIndex)
  }
})
