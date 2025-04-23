import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.staff.findMany({
      include: {
        vendor: true, // includes the vendor related to the staff
        services: true, // includes services provided by the staff
        availability: true, // includes availability details for the staff
        bookings: true, // includes bookings related to the staff
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.staff.findUnique({
      where: { id },
      include: {
        vendor: true,
        services: true,
        availability: true,
        bookings: true,
      },
    });
  }

  async create(createStaffDto: CreateStaffDto) {
    return this.prisma.staff.create({
      data: createStaffDto,
    });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  async remove(id: string) {
    return this.prisma.staff.delete({
      where: { id },
    });
  }
}
