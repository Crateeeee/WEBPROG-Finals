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
      cover: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png',
      genre: 'Progressive Rock',
      spotifyUrl: 'https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv',
      appleMusicUrl: 'https://music.apple.com/album/the-dark-side-of-the-moon/1065973699'
    },
    {
      title: 'Lateralus',
      artist: 'Tool',
      cover: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Tool-lateralus.jpg',
      genre: 'Progressive Rock',
      spotifyUrl: 'https://open.spotify.com/album/5l5m1hnH4punS1GQXgEi3T',
      appleMusicUrl: 'https://music.apple.com/album/lateralus/1474827158'
    },
    {
      title: 'Metropolis Pt. 2',
      artist: 'Dream Theater',
      cover: 'https://upload.wikimedia.org/wikipedia/en/1/11/Dream_Theater_-_Metropolis_Pt._2-_Scenes_from_a_Memory.jpg',
      genre: 'Progressive Rock',
      spotifyUrl: 'https://open.spotify.com/album/3g8kKHRTJFfWP2vQ9ZKF9l',
      appleMusicUrl: 'https://music.apple.com/album/metropolis-pt-2-scenes-from-a-memory/1440652917'
    },
    // Pop Punk recommendations  
    {
      title: 'Dammit',
      artist: 'Blink-182',
      cover: 'https://upload.wikimedia.org/wikipedia/en/9/97/Blink-182_-_Dude_Ranch_cover.jpg',
      genre: 'Pop Punk',
      spotifyUrl: 'https://open.spotify.com/album/2wTlNgezDlkUlo9Xl0dvLT',
      appleMusicUrl: 'https://music.apple.com/album/dude-ranch/1440839912'
    },
    {
      title: 'The Middle',
      artist: 'Jimmy Eat World',
      cover: 'https://upload.wikimedia.org/wikipedia/en/3/38/Jimmy_Eat_World_-_Bleed_American.png',
      genre: 'Pop Punk',
      spotifyUrl: 'https://open.spotify.com/album/0EmK4cHfTkLm4oeJz8cQM4',
      appleMusicUrl: 'https://music.apple.com/album/bleed-american/1440851533'
    },
    {
      title: 'Sugar, We\'re Goin Down',
      artist: 'Fall Out Boy',
      cover: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Futct.jpg',
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
    return this.recommendations.filter(rec => rec.genre === currentGenre)
  },
  
  // Get all tracks except current
  getUpNext() {
    return this.playlist.filter((_, idx) => idx !== this.currentIndex)
  }
})
