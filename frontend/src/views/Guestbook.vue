<template>
  <main class="guestbook-page">
    <div class="container">
      <div class="guestbook-header">
        <h1 class="section-title">Guestbook</h1>
        <p class="section-description">Leave a message, say hello, or share your thoughts!</p>
      </div>

      <div class="messenger-container">
        <!-- Messages Area -->
        <div class="messages-area" ref="messagesContainer">
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading messages...</p>
          </div>

          <div v-else-if="messages.length === 0" class="empty-state">
            <i class="fas fa-comments"></i>
            <h3>No messages yet</h3>
            <p>Be the first to leave a message!</p>
          </div>

          <div v-else class="messages-list">
            <div
              v-for="message in messages"
              :key="message.id"
              class="message-bubble"
              :class="{ 'own-message': message.name === currentUser }"
            >
              <div class="message-avatar">
                <span>{{ getInitials(message.name) }}</span>
              </div>
              <div class="message-content">
                <div class="message-header">
                  <span class="message-name">{{ message.name }}</span>
                  <span class="message-time">{{ formatTime(message.created_at) }}</span>
                </div>
                <p class="message-text">{{ message.message }}</p>
                <div class="message-reactions">
                  <button
                    v-for="reaction in availableReactions"
                    :key="reaction"
                    class="reaction-btn"
                    :class="{ active: hasReaction(message, reaction) }"
                    @click="toggleReaction(message, reaction)"
                  >
                    {{ reaction }}
                    <span v-if="getReactionCount(message, reaction) > 0">
                      {{ getReactionCount(message, reaction) }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="message-input-area">
          <div class="input-row">
            <input
              v-model="newMessage.name"
              type="text"
              placeholder="Your name"
              class="name-input"
              maxlength="50"
            />
          </div>
          <div class="input-row message-row">
            <textarea
              v-model="newMessage.message"
              placeholder="Type your message..."
              class="message-input"
              rows="2"
              maxlength="500"
              @keydown.enter.ctrl="sendMessage"
            ></textarea>
            <button
              class="send-btn"
              :disabled="!canSend || sending"
              @click="sendMessage"
            >
              <i v-if="sending" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-paper-plane"></i>
            </button>
          </div>
          <p class="input-hint">Press Ctrl + Enter to send</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="guestbook-stats">
        <div class="stat-card">
          <i class="fas fa-comment-dots"></i>
          <span class="stat-number">{{ messages.length }}</span>
          <span class="stat-label">Messages</span>
        </div>
        <div class="stat-card">
          <i class="fas fa-users"></i>
          <span class="stat-number">{{ uniqueUsers }}</span>
          <span class="stat-label">Visitors</span>
        </div>
        <div class="stat-card">
          <i class="fas fa-heart"></i>
          <span class="stat-number">{{ totalReactions }}</span>
          <span class="stat-label">Reactions</span>
        </div>
      </div>
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
      availableReactions: ['❤️', '👍', '😊', '🎉', '🔥']
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
    // Load saved name from localStorage
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
        // Show fallback demo messages if API fails
        this.messages = [
          {
            id: 1,
            name: 'Demo User',
            message: 'Welcome to the guestbook! Leave your message here.',
            created_at: new Date().toISOString(),
            reactions: []
          }
        ]
      } finally {
        this.loading = false
        this.scrollToBottom()
      }
    },

    async sendMessage() {
      if (!this.canSend || this.sending) return

      this.sending = true
      
      try {
        // Save name to localStorage
        localStorage.setItem('guestbook_name', this.newMessage.name)
        this.currentUser = this.newMessage.name

        const response = await messageService.createMessage({
          name: this.newMessage.name.trim(),
          message: this.newMessage.message.trim()
        })

        // Add the new message to the list
        this.messages.push({
          ...response,
          reactions: []
        })

        // Clear message input (keep name)
        this.newMessage.message = ''
        
        this.scrollToBottom()
      } catch (error) {
        console.error('Failed to send message:', error)
        alert('Failed to send message. Please try again.')
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
          // Remove reaction
          await messageService.removeReaction(existingReaction.id)
          message.reactions = message.reactions.filter(r => r.id !== existingReaction.id)
        } else {
          // Add reaction
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
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    }
  }
}
</script>

<style scoped>
.guestbook-page {
  padding-top: 100px;
  padding-bottom: 60px;
  min-height: 100vh;
}

.guestbook-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-top: -1.5rem;
}

/* Messenger Container */
.messenger-container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--dark-card);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--dark-border);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Messages Area */
.messages-area {
  height: 500px;
  overflow-y: auto;
  padding: 1.5rem;
  background: var(--dark-surface);
}

.loading-state,
.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--dark-border);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--dark-border);
}

.empty-state h3 {
  margin-bottom: 0.5rem;
}

/* Messages List */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-bubble {
  display: flex;
  gap: 1rem;
  max-width: 80%;
  animation: fadeInUp 0.3s ease;
}

.message-bubble.own-message {
  flex-direction: row-reverse;
  margin-left: auto;
}

.message-avatar {
  width: 45px;
  height: 45px;
  min-width: 45px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
}

.own-message .message-avatar {
  background: var(--gradient-accent);
}

.message-content {
  background: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 1rem;
  border: 1px solid var(--dark-border);
}

.own-message .message-content {
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.2) 0%, rgba(108, 92, 231, 0.1) 100%);
  border-color: var(--primary-color);
}

.message-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.message-name {
  font-weight: 600;
  color: var(--primary-color);
}

.message-time {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.message-text {
  color: var(--text-primary);
  line-height: 1.5;
  word-wrap: break-word;
}

/* Reactions */
.message-reactions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.reaction-btn {
  background: var(--dark-surface);
  border: 1px solid var(--dark-border);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 4px;
}

.reaction-btn:hover {
  border-color: var(--primary-color);
  background: rgba(108, 92, 231, 0.1);
}

.reaction-btn.active {
  border-color: var(--primary-color);
  background: rgba(108, 92, 231, 0.2);
}

.reaction-btn span {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Message Input */
.message-input-area {
  padding: 1.5rem;
  background: var(--dark-card);
  border-top: 1px solid var(--dark-border);
}

.input-row {
  margin-bottom: 1rem;
}

.input-row:last-of-type {
  margin-bottom: 0.5rem;
}

.name-input {
  width: 100%;
  max-width: 250px;
  padding: 12px 16px;
  background: var(--dark-surface);
  border: 1px solid var(--dark-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
}

.name-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.message-row {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  background: var(--dark-surface);
  border: 1px solid var(--dark-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  transition: var(--transition);
}

.message-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.send-btn {
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-hint {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Stats */
.guestbook-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  margin: 3rem auto 0;
}

.stat-card {
  background: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  border: 1px solid var(--dark-border);
  transition: var(--transition);
}

.stat-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
}

.stat-card i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.75rem;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .guestbook-page {
    padding-top: 80px;
  }

  .messages-area {
    height: 400px;
    padding: 1rem;
  }

  .message-bubble {
    max-width: 95%;
  }

  .message-avatar {
    width: 35px;
    height: 35px;
    min-width: 35px;
    font-size: 0.8rem;
  }

  .message-content {
    padding: 0.75rem;
  }

  .message-input-area {
    padding: 1rem;
  }

  .name-input {
    max-width: 100%;
  }

  .guestbook-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
  }

  .stat-card i {
    margin-bottom: 0;
    font-size: 1.5rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }
}
</style>
