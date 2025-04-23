import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { NotificationType } from '@prisma/client'; // make sure to import your enum

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  notificationType: NotificationType;

  @IsOptional()
  isRead?: boolean; // Optional because it defaults to false in the DB
}
