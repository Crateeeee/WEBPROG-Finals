import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [SupabaseModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
