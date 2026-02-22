import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMessageDto, CreateReactionDto, Message, Reaction } from './dto/message.dto';

@Injectable()
export class MessagesService {
  // In-memory storage for demo mode when Supabase is not connected
  private demoMessages: Message[] = [
    {
      id: 1,
      name: 'Crate Marshall',
      message: 'Welcome to my guestbook! Feel free to leave a message.',
      created_at: new Date().toISOString(),
      reactions: []
    }
  ];
  private demoReactions: Reaction[] = [];
  private nextMessageId = 2;
  private nextReactionId = 1;

  constructor(private supabaseService: SupabaseService) {}

  // GET - Fetch all messages with their reactions
  async findAll(): Promise<Message[]> {
    const client = this.supabaseService.getClient();
    
    if (!client) {
      // Demo mode - return in-memory messages with reactions
      return this.demoMessages.map(msg => ({
        ...msg,
        reactions: this.demoReactions.filter(r => r.message_id === msg.id)
      }));
    }

    // Fetch messages from Supabase
    const { data: messages, error: messagesError } = await client
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
      throw new Error('Failed to fetch messages');
    }

    // Fetch reactions for all messages
    const { data: reactions, error: reactionsError } = await client
      .from('reactions')
      .select('*');

    if (reactionsError) {
      console.error('Error fetching reactions:', reactionsError);
      // Continue without reactions
    }

    // Map reactions to messages
    return messages.map(message => ({
      ...message,
      reactions: (reactions || []).filter(r => r.message_id === message.id)
    }));
  }

  // POST - Create a new message
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const client = this.supabaseService.getClient();
    
    if (!client) {
      // Demo mode - add to in-memory storage
      const newMessage: Message = {
        id: this.nextMessageId++,
        name: createMessageDto.name,
        message: createMessageDto.message,
        created_at: new Date().toISOString(),
        reactions: []
      };
      this.demoMessages.push(newMessage);
      return newMessage;
    }

    const { data, error } = await client
      .from('messages')
      .insert([{
        name: createMessageDto.name,
        message: createMessageDto.message
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating message:', error);
      throw new Error('Failed to create message');
    }

    return { ...data, reactions: [] };
  }

  // POST - Add a reaction to a message
  async addReaction(messageId: number, createReactionDto: CreateReactionDto): Promise<Reaction> {
    const client = this.supabaseService.getClient();
    
    if (!client) {
      // Demo mode - add to in-memory storage
      const newReaction: Reaction = {
        id: this.nextReactionId++,
        message_id: messageId,
        emoji: createReactionDto.emoji,
        user_name: createReactionDto.user_name,
        created_at: new Date().toISOString()
      };
      this.demoReactions.push(newReaction);
      return newReaction;
    }

    const { data, error } = await client
      .from('reactions')
      .insert([{
        message_id: messageId,
        emoji: createReactionDto.emoji,
        user_name: createReactionDto.user_name
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding reaction:', error);
      throw new Error('Failed to add reaction');
    }

    return data;
  }

  // DELETE - Remove a reaction
  async removeReaction(reactionId: number): Promise<void> {
    const client = this.supabaseService.getClient();
    
    if (!client) {
      // Demo mode - remove from in-memory storage
      this.demoReactions = this.demoReactions.filter(r => r.id !== reactionId);
      return;
    }

    const { error } = await client
      .from('reactions')
      .delete()
      .eq('id', reactionId);

    if (error) {
      console.error('Error removing reaction:', error);
      throw new Error('Failed to remove reaction');
    }
  }
}
