import { IsOptional, IsUUID } from 'class-validator';

export class UpdateConversationDto {
  @IsUUID()
  @IsOptional()
  lastMessageId?: string;
}
