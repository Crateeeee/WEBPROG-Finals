export class CreateMessageDto {
  name: string;
  message: string;
}

export class CreateReactionDto {
  emoji: string;
  user_name: string;
}

export interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
  reactions?: Reaction[];
}

export interface Reaction {
  id: number;
  message_id: number;
  emoji: string;
  user_name: string;
  created_at: string;
}
