import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUUID,
  IsArray,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number; // in minutes

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsUUID()
  @IsNotEmpty()
  vendorId: string; // the vendor providing this service

  @IsOptional()
  @IsArray()
  staff?: string[]; // array of staff IDs offering this service
}
