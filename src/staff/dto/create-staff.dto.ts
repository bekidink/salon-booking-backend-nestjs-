import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUUID,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsUrl() // Validates if it's a proper URL if provided
  avatar?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber() // Validates phone number format if provided
  phone?: string;

  @IsUUID()
  @IsNotEmpty()
  vendorId: string; // the vendor to which the staff belongs

  @IsArray()
  @IsUUID('4', { each: true }) // Validates each item in array is UUID v4
  @IsOptional()
  services?: string[]; // array of service IDs assigned to this staff

  @IsArray()
  @IsUUID('4', { each: true }) // Validates each item in array is UUID v4
  @IsOptional()
  availability?: string[]; // array of availability IDs for this staff
}
