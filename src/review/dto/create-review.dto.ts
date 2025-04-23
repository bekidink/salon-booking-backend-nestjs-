import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  vendorId: string;

  @IsUUID()
  bookingId: string;
}
