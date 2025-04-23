import { IsArray, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  @IsUUID('all', { each: true })
  participantIds: string[];
}
