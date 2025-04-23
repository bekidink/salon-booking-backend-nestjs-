import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  @IsDateString()
  bookingDate: string;

  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsString()
  @IsNotEmpty()
  staffId: string;
}
