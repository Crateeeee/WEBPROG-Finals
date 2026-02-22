import { Controller, Get, Post, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, CreateReactionDto } from './dto/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // GET /api/messages - Fetch all messages
  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  // POST /api/messages - Create a new message
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // POST /api/messages/:id/reactions - Add reaction to a message
  @Post(':id/reactions')
  @HttpCode(HttpStatus.CREATED)
  async addReaction(
    @Param('id') id: string,
    @Body() createReactionDto: CreateReactionDto
  ) {
    return this.messagesService.addReaction(parseInt(id), createReactionDto);
  }
}

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly messagesService: MessagesService) {}

  // DELETE /api/reactions/:id - Remove a reaction
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.messagesService.removeReaction(parseInt(id));
  }
}
