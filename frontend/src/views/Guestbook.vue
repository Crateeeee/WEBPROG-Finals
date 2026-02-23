<template>
  <main class="guestbook-page">
    <!-- Background Effects -->
    <div class="page-bg">
      <div class="glow-orb glow-purple" style="width: 300px; height: 300px; top: 20%; left: 5%;"></div>
      <div class="glow-orb glow-pink" style="width: 250px; height: 250px; bottom: 30%; right: 10%;"></div>
    </div>

    <div class="container">
      <!-- Header -->
      <header class="chat-header">
        <div class="header-content">
          <div class="header-info">
            <h1 class="page-title">
              <i class="fas fa-comments"></i>
              Live Chat
            </h1>
            <div class="live-indicator">
              <span class="live-dot"></span>
              Live
            </div>
          </div>
          <p class="page-subtitle">Join the conversation! Messages appear in real-time for everyone.</p>
        </div>
        
        <div class="chat-stats">
          <div class="stat-item">
            <i class="fas fa-message"></i>
            <span>{{ messages.length }} messages</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <span>{{ uniqueUsers }} visitors</span>
          </div>
        </div>
      </header>

      <!-- Chat Container -->
      <div class="chat-container">
        <!-- Messages Area -->
        <div class="messages-area" ref="messagesContainer">
          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading messages...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="messages.length === 0" class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3>No messages yet</h3>
            <p>Be the first to start the conversation!</p>
          </div>

          <!-- Messages List -->
          <div v-else class="messages-list">
            <div
              v-for="message in messages"
              :key="message.id"
              class="message"
              :class="{ 
                'own-message': message.name === currentUser,
                'new-message': message.isNew
              }"
            >
              <div class="message-avatar" :style="{ background: getAvatarColor(message.name) }">
                {{ getInitials(message.name) }}
              </div>
              
              <div class="message-content">
                <div class="message-header">
                  <span class="message-author">{{ message.name }}</span>
                  <span class="message-time">{{ formatTime(message.created_at) }}</span>
                </div>
                <p class="message-text">{{ message.message }}</p>
                
                <!-- Reactions -->
                <div class="message-reactions">
                  <button
                    v-for="emoji in availableReactions"
                    :key="emoji"
                    class="reaction-btn"
                    :class="{ active: hasReaction(message, emoji) }"
                    @click="toggleReaction(message, emoji)"
                  >
                    {{ emoji }}
                    <span v-if="getReactionCount(message, emoji) > 0" class="reaction-count">
                      {{ getReactionCount(message, emoji) }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="typingUsers.length > 0" class="typing-indicator">
          <span class="typing-dots">
            <span></span><span></span><span></span>
          </span>
          <span>{{ typingText }}</span>
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <div class="input-row name-row" v-if="!currentUser">
            <input
              v-model="newMessage.name"
              type="text"
              placeholder="Enter your name to join..."
              class="input-field name-input"
              maxlength="50"
              @keydown.enter="setUsername"
            />
            <button class="btn btn-primary join-btn" @click="setUsername" :disabled="!newMessage.name.trim()">
              Join Chat
            </button>
          </div>

          <div v-else class="input-row message-row">
            <div class="current-user">
              <div class="user-avatar" :style="{ background: getAvatarColor(currentUser) }">
                {{ getInitials(currentUser) }}
              </div>
              <span class="user-name">{{ currentUser }}</span>
              <button class="change-name-btn" @click="changeUser" title="Change name">
                <i class="fas fa-pen"></i>
              </button>
            </div>
            
            <div class="message-input-wrapper">
              <textarea
                v-model="newMessage.message"
                placeholder="Type a message..."
                class="input-field message-input"
                rows="1"
                maxlength="500"
                @keydown.enter.exact.prevent="sendMessage"
                @input="handleTyping"
              ></textarea>
              <button 
                class="send-btn" 
                @click="sendMessage" 
                :disabled="!canSend || sending"
                title="Send message"
              >
                <i v-if="sending" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Online Users -->
      <div class="online-users">
        <h4>
          <i class="fas fa-circle" style="color: var(--accent-green); font-size: 8px;"></i>
          Recent Visitors
        </h4>
        <div class="users-list">
          <div 
            v-for="user in recentUsers" 
            :key="user"
            class="user-badge"
            :style="{ background: getAvatarColor(user) }"
            :title="user"
          >
            {{ getInitials(user) }}
          </div>
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
      typingUsers: [],
      newMessage: {
        name: '',
        message: ''
      },
      availableReactions: ['❤️', '🔥', '👏', '😄', '🎵'],
      pollInterval: null
    }
  },
  computed: {
    canSend() {
      return this.newMessage.message.trim().length > 0
    },
    uniqueUsers() {
      const users = new Set(this.messages.map(m => m.name))
      return users.size
    },
    recentUsers() {
      const users = [...new Set(this.messages.map(m => m.name))]
      return users.slice(-10).reverse()
    },
    typingText() {
      if (this.typingUsers.length === 1) {
        return `${this.typingUsers[0]} is typing...`
      } else if (this.typingUsers.length > 1) {
        return 'Several people are typing...'
      }
      return ''
    }
  },
  async mounted() {
    // Load saved username
    const savedName = localStorage.getItem('crate-chat-user')
    if (savedName) {
      this.currentUser = savedName
      this.newMessage.name = savedName
    }
    
    await this.fetchMessages()
    this.startPolling()
  },
  beforeUnmount() {
    this.stopPolling()
  },
  methods: {
    async fetchMessages() {
      this.loading = true
      try {
        const messages = await messageService.getMessages()
        this.messages = messages.map(m => ({ ...m, isNew: false }))
      } catch (error) {
        console.error('Failed to fetch messages:', error)
        this.messages = []
      } finally {
        this.loading = false
        this.scrollToBottom()
      }
    },

    startPolling() {
      // Poll for new messages every 3 seconds for "live" effect
      this.pollInterval = setInterval(async () => {
        try {
          const messages = await messageService.getMessages()
          const newMessages = messages.filter(m => 
            !this.messages.some(existing => existing.id === m.id)
          )
          
          if (newMessages.length > 0) {
            newMessages.forEach(msg => {
              this.messages.push({ ...msg, isNew: true })
            })
            this.scrollToBottom()
            
            // Remove "new" highlight after animation
            setTimeout(() => {
              this.messages = this.messages.map(m => ({ ...m, isNew: false }))
            }, 2000)
          }
        } catch (error) {
          console.error('Polling error:', error)
        }
      }, 3000)
    },

    stopPolling() {
      if (this.pollInterval) {
        clearInterval(this.pollInterval)
      }
    },

    setUsername() {
      if (this.newMessage.name.trim()) {
        this.currentUser = this.newMessage.name.trim()
        localStorage.setItem('crate-chat-user', this.currentUser)
      }
    },

    changeUser() {
      this.currentUser = ''
      localStorage.removeItem('crate-chat-user')
    },

    async sendMessage() {
      if (!this.canSend || this.sending) return

      this.sending = true
      
      try {
        const response = await messageService.createMessage({
          name: this.currentUser,
          message: this.newMessage.message.trim()
        })

        this.messages.push({
          ...response,
          reactions: [],
          isNew: true
        })

        this.newMessage.message = ''
        this.scrollToBottom()
        
        setTimeout(() => {
          this.messages = this.messages.map(m => ({ ...m, isNew: false }))
        }, 2000)
      } catch (error) {
        console.error('Failed to send message:', error)
        alert('Failed to send message. Please try again.')
      } finally {
        this.sending = false
      }
    },

    handleTyping() {
      // Could implement real typing indicators with WebSockets
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

    getAvatarColor(name) {
      const colors = [
        '#8b5cf6', '#ec4899', '#06b6d4', '#22c55e', 
        '#f59e0b', '#ef4444', '#3b82f6', '#a855f7'
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
        hour: '2-digit',
        minute: '2-digit'
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
  min-height: 100vh;
  padding-top: calc(var(--nav-height) + 40px);
  padding-bottom: 60px;
  position: relative;
}

.page-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

/* Header */
.chat-header {
  text-align: center;
  margin-bottom: 32px;
}

.header-content {
  margin-bottom: 20px;
}

.header-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.page-title {
  font-size: 2.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title i {
  color: var(--accent-primary);
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--accent-green);
  font-weight: 500;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-green);
  border-radius: 50%;
  animation: pulse-live 1.5s ease-in-out infinite;
}

@keyframes pulse-live {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.chat-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.stat-item i {
  color: var(--accent-primary);
}

/* Chat Container */
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Messages Area */
.messages-area {
  height: 500px;
  overflow-y: auto;
  padding: 24px;
  background: var(--bg-secondary);
}

.loading-state,
.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  margin-bottom: 20px;
}

.empty-icon i {
  font-size: 2rem;
  color: var(--text-muted);
}

.empty-state h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 8px;
}

/* Messages List */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message {
  display: flex;
  gap: 12px;
  animation: slideIn 0.3s ease;
}

.message.new-message {
  animation: newMessage 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

@keyframes newMessage {
  0% {
    opacity: 0;
    transform: translateY(20px);
    background: rgba(139, 92, 246, 0.1);
  }
  50% {
    background: rgba(139, 92, 246, 0.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    background: transparent;
  }
}

.message-avatar {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.message-author {
  font-weight: 600;
  color: var(--text-primary);
}

.message-time {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.message-text {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0 var(--radius-md) var(--radius-md) var(--radius-md);
  padding: 12px 16px;
  color: var(--text-primary);
  line-height: 1.5;
  word-wrap: break-word;
  margin: 0;
}

.own-message .message-text {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1));
  border-color: var(--accent-primary);
}

/* Reactions */
.message-reactions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.reaction-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reaction-btn:hover {
  border-color: var(--accent-primary);
  transform: scale(1.1);
}

.reaction-btn.active {
  background: rgba(139, 92, 246, 0.15);
  border-color: var(--accent-primary);
}

.reaction-count {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Typing Indicator */
.typing-indicator {
  padding: 12px 24px;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  background: var(--text-muted);
  border-radius: 50%;
  animation: typingBounce 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: 0s; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 80%, 100% { transform: scale(0.8); }
  40% { transform: scale(1.2); }
}

/* Input Area */
.input-area {
  padding: 20px;
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
}

.input-row {
  display: flex;
  gap: 12px;
}

.name-row {
  justify-content: center;
}

.name-input {
  max-width: 300px;
}

.join-btn {
  white-space: nowrap;
}

.message-row {
  flex-direction: column;
  gap: 16px;
}

.current-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.user-name {
  font-weight: 500;
  color: var(--text-primary);
}

.change-name-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-name-btn:hover {
  color: var(--accent-primary);
  background: var(--bg-hover);
}

.message-input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  resize: none;
  min-height: 44px;
  max-height: 120px;
}

.send-btn {
  width: 50px;
  height: 50px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-primary);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px var(--accent-glow);
}

.send-btn:hover:not(:disabled) {
  background: var(--accent-secondary);
  transform: scale(1.05);
  box-shadow: 0 6px 25px var(--accent-glow);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

/* Online Users */
.online-users {
  max-width: 800px;
  margin: 24px auto 0;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.online-users h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.users-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.user-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  cursor: default;
  transition: transform 0.2s ease;
}

.user-badge:hover {
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .guestbook-page {
    padding-top: calc(var(--nav-height) + 20px);
  }

  .page-title {
    font-size: 1.8rem;
  }

  .header-info {
    flex-direction: column;
    gap: 12px;
  }

  .chat-stats {
    gap: 20px;
  }

  .messages-area {
    height: 400px;
    padding: 16px;
  }

  .message-avatar {
    width: 36px;
    height: 36px;
    min-width: 36px;
    font-size: 0.8rem;
  }

  .input-area {
    padding: 16px;
  }

  .name-input {
    max-width: 100%;
  }
}
</style>
