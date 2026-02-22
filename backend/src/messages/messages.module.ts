import { Module } from '@nestjs/common';
import { MessagesController, ReactionsController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController, ReactionsController],
  providers: [MessagesService],
})
export class MessagesModule {}
