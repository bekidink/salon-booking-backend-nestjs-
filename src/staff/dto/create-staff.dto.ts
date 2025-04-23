import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsUUID()
  @IsNotEmpty()
  vendorId: string; // the vendor to which the staff belongs

  @IsArray()
  @IsOptional()
  services?: string[]; // array of service IDs assigned to this staff

  @IsArray()
  @IsOptional()
  availability?: string[]; // array of availability IDs for this staff
}
