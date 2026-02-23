<template>
  <main class="guestbook-page">
    <!-- Floating Doodles -->
    <div class="floating-doodles">
      <span class="doodle">💌</span>
      <span class="doodle">✏️</span>
      <span class="doodle">📝</span>
      <span class="doodle">💕</span>
      <span class="doodle">✨</span>
    </div>

    <div class="container">
      <!-- Page Header -->
      <header class="page-header">
        <div class="header-tape tape-pink"></div>
        <h1 class="page-title">📓 Guest Notes</h1>
        <p class="page-subtitle">Leave a sticky note on my board!</p>
      </header>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-sticky yellow">
          <i class="fas fa-sticky-note"></i>
          <span class="stat-value">{{ messages.length }}</span>
          <span class="stat-label">Notes</span>
        </div>
        <div class="stat-sticky pink">
          <i class="fas fa-users"></i>
          <span class="stat-value">{{ uniqueUsers }}</span>
          <span class="stat-label">Visitors</span>
        </div>
        <div class="stat-sticky blue">
          <i class="fas fa-heart"></i>
          <span class="stat-value">{{ totalReactions }}</span>
          <span class="stat-label">Reactions</span>
        </div>
      </div>

      <!-- Compose Section -->
      <section class="compose-section">
        <div class="compose-sticky">
          <div class="compose-pin"></div>
          <h2 class="compose-title">✍️ Write a Note</h2>
          
          <div class="compose-form">
            <div class="input-group">
              <label for="name-input">Your Name</label>
              <input
                id="name-input"
                v-model="newMessage.name"
                type="text"
                placeholder="What should we call you?"
                class="note-input"
                maxlength="50"
              />
            </div>
            
            <div class="input-group">
              <label for="message-input">Your Message</label>
              <textarea
                id="message-input"
                v-model="newMessage.message"
                placeholder="Say hello, share a thought, or leave some love..."
                class="note-textarea"
                rows="4"
                maxlength="500"
                @keydown.enter.ctrl="sendMessage"
              ></textarea>
            </div>
            
            <div class="compose-footer">
              <span class="char-count">{{ newMessage.message.length }}/500</span>
              <button
                class="send-btn"
                :disabled="!canSend || sending"
                @click="sendMessage"
              >
                <i v-if="sending" class="fas fa-spinner fa-spin"></i>
                <template v-else>
                  <i class="fas fa-paper-plane"></i>
                  Post Note
                </template>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Message Board -->
      <section class="message-board">
        <div class="board-header">
          <h2 class="board-title">📌 The Board</h2>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading notes...</p>
        </div>

        <div v-else-if="messages.length === 0" class="empty-state">
          <div class="empty-note">
            <div class="note-pin gold"></div>
            <i class="fas fa-sticky-note"></i>
            <h3>No notes yet!</h3>
            <p>Be the first to leave a note on the board.</p>
          </div>
        </div>

        <div v-else class="notes-grid">
          <div
            v-for="(message, index) in messages"
            :key="message.id"
            class="note-card"
            :class="getNoteColor(index)"
            :style="{ '--rotate': getRandomRotation(index) + 'deg' }"
          >
            <div class="note-pin" :class="index % 2 === 0 ? 'red' : 'gold'"></div>
            
            <div class="note-header">
              <div class="note-avatar" :style="{ background: getAvatarColor(message.name) }">
                {{ getInitials(message.name) }}
              </div>
              <div class="note-meta">
                <span class="note-author">{{ message.name }}</span>
                <span class="note-time">{{ formatTime(message.created_at) }}</span>
              </div>
            </div>
            
            <p class="note-message">{{ message.message }}</p>
            
            <div class="note-reactions">
              <button
                v-for="reaction in availableReactions"
                :key="reaction"
                class="reaction-btn"
                :class="{ active: hasReaction(message, reaction) }"
                @click="toggleReaction(message, reaction)"
              >
                {{ reaction }}
                <span v-if="getReactionCount(message, reaction) > 0" class="reaction-count">
                  {{ getReactionCount(message, reaction) }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { messageService } from '../services/api'

export default {
  name: 'Guestbook',
  data() {
    return {
      messages: [],
      loading: true,
      sending: false,
      currentUser: '',
      newMessage: {
        name: '',
        message: ''
      },
      availableReactions: ['❤️', '👍', '😊', '🎉', '✨'],
      noteColors: ['yellow', 'pink', 'blue', 'green', 'purple']
    }
  },
  computed: {
    canSend() {
      return this.newMessage.name.trim() && this.newMessage.message.trim()
    },
    uniqueUsers() {
      const users = new Set(this.messages.map(m => m.name))
      return users.size
    },
    totalReactions() {
      return this.messages.reduce((total, message) => {
        return total + (message.reactions ? message.reactions.length : 0)
      }, 0)
    }
  },
  async mounted() {
    const savedName = localStorage.getItem('guestbook_name')
    if (savedName) {
      this.newMessage.name = savedName
      this.currentUser = savedName
    }
    
    await this.fetchMessages()
  },
  methods: {
    async fetchMessages() {
      this.loading = true
      try {
        this.messages = await messageService.getMessages()
      } catch (error) {
        console.error('Failed to fetch messages:', error)
        this.messages = [
          {
            id: 1,
            name: 'Demo User',
            message: 'Welcome to the guestbook! Leave your note here.',
            created_at: new Date().toISOString(),
            reactions: []
          }
        ]
      } finally {
        this.loading = false
      }
    },

    async sendMessage() {
      if (!this.canSend || this.sending) return

      this.sending = true
      
      try {
        localStorage.setItem('guestbook_name', this.newMessage.name)
        this.currentUser = this.newMessage.name

        const response = await messageService.createMessage({
          name: this.newMessage.name.trim(),
          message: this.newMessage.message.trim()
        })

        this.messages.unshift({
          ...response,
          reactions: []
        })

        this.newMessage.message = ''
      } catch (error) {
        console.error('Failed to send message:', error)
        alert('Failed to post note. Please try again.')
      } finally {
        this.sending = false
      }
    },

    async toggleReaction(message, emoji) {
      if (!this.currentUser) {
        alert('Please enter your name first')
        return
      }

      const existingReaction = (message.reactions || []).find(
        r => r.emoji === emoji && r.user_name === this.currentUser
      )

      try {
        if (existingReaction) {
          await messageService.removeReaction(existingReaction.id)
          message.reactions = message.reactions.filter(r => r.id !== existingReaction.id)
        } else {
          const reaction = await messageService.addReaction(message.id, {
            emoji,
            user_name: this.currentUser
          })
          if (!message.reactions) message.reactions = []
          message.reactions.push(reaction)
        }
      } catch (error) {
        console.error('Failed to toggle reaction:', error)
      }
    },

    hasReaction(message, emoji) {
      return (message.reactions || []).some(
        r => r.emoji === emoji && r.user_name === this.currentUser
      )
    },

    getReactionCount(message, emoji) {
      return (message.reactions || []).filter(r => r.emoji === emoji).length
    },

    getNoteColor(index) {
      return this.noteColors[index % this.noteColors.length]
    },

    getRandomRotation(index) {
      const rotations = [-3, 2, -2, 3, -1, 1, -4, 4]
      return rotations[index % rotations.length]
    },

    getAvatarColor(name) {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', 
        '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA'
      ]
      let hash = 0
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      return colors[Math.abs(hash) % colors.length]
    },

    getInitials(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    },

    formatTime(date) {
      const d = new Date(date)
      const now = new Date()
      const diff = now - d

      if (diff < 60000) return 'Just now'
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
      
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }
}
</script>

<style scoped>
.guestbook-page {
  padding-top: 120px;
  padding-bottom: 80px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Floating Doodles */
.floating-doodles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.floating-doodles .doodle {
  position: absolute;
  font-size: 2rem;
  opacity: 0.15;
  animation: float 8s ease-in-out infinite;
}

.floating-doodles .doodle:nth-child(1) { top: 15%; left: 5%; animation-delay: 0s; }
.floating-doodles .doodle:nth-child(2) { top: 25%; right: 8%; animation-delay: 1.5s; }
.floating-doodles .doodle:nth-child(3) { top: 60%; left: 3%; animation-delay: 3s; }
.floating-doodles .doodle:nth-child(4) { top: 70%; right: 5%; animation-delay: 4.5s; }
.floating-doodles .doodle:nth-child(5) { top: 45%; right: 12%; animation-delay: 2s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.header-tape {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 120px;
  height: 30px;
  opacity: 0.7;
}

.tape-pink {
  background: var(--washi-pink);
}

.page-title {
  font-family: 'Caveat', cursive;
  font-size: 4rem;
  color: var(--ink-primary);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.5rem;
  color: var(--ink-secondary);
}

/* Stats Row */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-sticky {
  padding: 1.5rem 2rem;
  border-radius: 2px;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
  text-align: center;
  transform: rotate(-1deg);
  transition: transform 0.3s ease;
  min-width: 120px;
}

.stat-sticky:hover {
  transform: rotate(0deg) scale(1.05);
}

.stat-sticky.yellow { background: var(--sticky-yellow); }
.stat-sticky.pink { background: var(--sticky-pink); }
.stat-sticky.blue { background: var(--sticky-blue); }

.stat-sticky i {
  font-size: 1.5rem;
  color: var(--ink-primary);
  margin-bottom: 0.5rem;
  display: block;
}

.stat-value {
  font-family: 'Caveat', cursive;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--ink-primary);
  display: block;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--ink-secondary);
}

/* Compose Section */
.compose-section {
  max-width: 600px;
  margin: 0 auto 4rem;
}

.compose-sticky {
  background: var(--sticky-yellow);
  padding: 2rem;
  border-radius: 2px;
  box-shadow: 4px 4px 15px rgba(0,0,0,0.15);
  position: relative;
  transform: rotate(-0.5deg);
}

.compose-pin {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle at 30% 30%, #ff6b6b, #cc5555);
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
}

.compose-title {
  font-family: 'Caveat', cursive;
  font-size: 2rem;
  color: var(--ink-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.input-group {
  margin-bottom: 1.25rem;
}

.input-group label {
  display: block;
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.1rem;
  color: var(--ink-primary);
  margin-bottom: 0.5rem;
}

.note-input,
.note-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px dashed var(--ink-light);
  border-radius: 8px;
  background: rgba(255,255,255,0.6);
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.1rem;
  color: var(--ink-primary);
  transition: all 0.3s ease;
}

.note-input:focus,
.note-textarea:focus {
  outline: none;
  border-color: var(--ink-primary);
  background: rgba(255,255,255,0.9);
}

.note-textarea {
  resize: vertical;
  min-height: 100px;
}

.compose-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.char-count {
  font-size: 0.85rem;
  color: var(--ink-secondary);
}

.send-btn {
  background: var(--ink-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Message Board */
.message-board {
  position: relative;
}

.board-header {
  text-align: center;
  margin-bottom: 2rem;
}

.board-title {
  font-family: 'Caveat', cursive;
  font-size: 2.5rem;
  color: var(--ink-primary);
}

/* Loading & Empty States */
.loading-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--paper-lines);
  border-top-color: var(--ink-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-note {
  background: var(--sticky-yellow);
  padding: 3rem 2rem;
  border-radius: 2px;
  box-shadow: 4px 4px 15px rgba(0,0,0,0.1);
  max-width: 300px;
  margin: 0 auto;
  position: relative;
  transform: rotate(-2deg);
}

.empty-note i {
  font-size: 3rem;
  color: var(--ink-light);
  margin-bottom: 1rem;
}

.empty-note h3 {
  font-family: 'Caveat', cursive;
  font-size: 1.8rem;
  color: var(--ink-primary);
  margin-bottom: 0.5rem;
}

.empty-note p {
  color: var(--ink-secondary);
}

/* Notes Grid */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.note-card {
  padding: 1.5rem;
  border-radius: 2px;
  box-shadow: 4px 4px 12px rgba(0,0,0,0.12);
  position: relative;
  transform: rotate(var(--rotate, 0deg));
  transition: all 0.3s ease;
  animation: noteAppear 0.5s ease backwards;
}

.note-card:hover {
  transform: rotate(0deg) scale(1.02);
  box-shadow: 6px 6px 20px rgba(0,0,0,0.15);
  z-index: 10;
}

@keyframes noteAppear {
  from {
    opacity: 0;
    transform: scale(0.8) rotate(var(--rotate, 0deg));
  }
}

.note-card.yellow { background: var(--sticky-yellow); }
.note-card.pink { background: var(--sticky-pink); }
.note-card.blue { background: var(--sticky-blue); }
.note-card.green { background: var(--sticky-green); }
.note-card.purple { background: var(--sticky-purple); }

.note-pin {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.note-pin.red {
  background: radial-gradient(circle at 30% 30%, #ff6b6b, #cc5555);
}

.note-pin.gold {
  background: radial-gradient(circle at 30% 30%, #ffd700, #cc9900);
}

/* Note Header */
.note-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.note-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.note-meta {
  flex: 1;
}

.note-author {
  display: block;
  font-family: 'Caveat', cursive;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink-primary);
  line-height: 1.2;
}

.note-time {
  font-size: 0.8rem;
  color: var(--ink-secondary);
}

/* Note Message */
.note-message {
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--ink-primary);
  margin-bottom: 1rem;
  word-wrap: break-word;
}

/* Reactions */
.note-reactions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border-top: 1px dashed var(--ink-light);
  padding-top: 0.75rem;
}

.reaction-btn {
  background: rgba(255,255,255,0.5);
  border: 1px solid transparent;
  border-radius: 15px;
  padding: 4px 10px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.reaction-btn:hover {
  background: rgba(255,255,255,0.8);
  transform: scale(1.1);
}

.reaction-btn.active {
  background: rgba(255,255,255,0.9);
  border-color: var(--ink-primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.reaction-count {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .guestbook-page {
    padding-top: 100px;
    padding-bottom: 60px;
  }

  .page-title {
    font-size: 2.8rem;
  }

  .page-subtitle {
    font-size: 1.2rem;
  }

  .stats-row {
    gap: 1rem;
  }

  .stat-sticky {
    padding: 1rem 1.5rem;
    min-width: 100px;
  }

  .stat-value {
    font-size: 2rem;
  }

  .compose-sticky {
    padding: 1.5rem;
  }

  .compose-title {
    font-size: 1.6rem;
  }

  .notes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .note-card {
    transform: rotate(0deg) !important;
  }

  .floating-doodles .doodle {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-row {
    flex-direction: column;
    align-items: center;
  }

  .stat-sticky {
    width: 80%;
    transform: rotate(0deg);
  }

  .compose-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .send-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
