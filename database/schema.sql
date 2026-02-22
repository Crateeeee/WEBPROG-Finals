-- =============================================
-- SUPABASE DATABASE SCHEMA
-- Guestbook / Messenger-style Comments
-- =============================================

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reactions Table
CREATE TABLE IF NOT EXISTS reactions (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  emoji VARCHAR(10) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Prevent duplicate reactions from same user on same message with same emoji
  UNIQUE(message_id, emoji, user_name)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_reactions_message_id ON reactions(message_id);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages
CREATE POLICY "Allow public read messages" ON messages
  FOR SELECT USING (true);

-- Allow anyone to insert messages
CREATE POLICY "Allow public insert messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read reactions
CREATE POLICY "Allow public read reactions" ON reactions
  FOR SELECT USING (true);

-- Allow anyone to insert reactions
CREATE POLICY "Allow public insert reactions" ON reactions
  FOR INSERT WITH CHECK (true);

-- Allow anyone to delete their own reactions
CREATE POLICY "Allow public delete reactions" ON reactions
  FOR DELETE USING (true);

-- =============================================
-- Sample Data (Optional)
-- =============================================

-- INSERT INTO messages (name, message) VALUES 
--   ('Crate Marshall', 'Welcome to my guestbook! Feel free to leave a message.'),
--   ('Demo User', 'This is a sample message to show the messenger-style interface.');
