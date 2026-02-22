import axios from 'axios'

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const messageService = {
  // GET - Fetch all messages
  async getMessages() {
    try {
      const response = await api.get('/messages')
      return response.data
    } catch (error) {
      console.error('Error fetching messages:', error)
      throw error
    }
  },

  // POST - Create a new message
  async createMessage(messageData) {
    try {
      const response = await api.post('/messages', messageData)
      return response.data
    } catch (error) {
      console.error('Error creating message:', error)
      throw error
    }
  },

  // POST - Add reaction to a message
  async addReaction(messageId, reactionData) {
    try {
      const response = await api.post(`/messages/${messageId}/reactions`, reactionData)
      return response.data
    } catch (error) {
      console.error('Error adding reaction:', error)
      throw error
    }
  },

  // DELETE - Remove reaction from a message
  async removeReaction(reactionId) {
    try {
      const response = await api.delete(`/reactions/${reactionId}`)
      return response.data
    } catch (error) {
      console.error('Error removing reaction:', error)
      throw error
    }
  }
}

export default api
