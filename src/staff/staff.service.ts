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
        vendor: true,
        services: true,
        availability: true,
        bookings: true,
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
    const { services, availability, ...staffData } = createStaffDto;

    return this.prisma.staff.create({
      data: {
        ...staffData,
        services: services
          ? {
              connect: services.map((id) => ({ id })),
            }
          : undefined,
        availability: availability
          ? {
              connect: availability.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        services: true,
        availability: true,
      },
    });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const { services, availability, ...staffData } = updateStaffDto;

    return this.prisma.staff.update({
      where: { id },
      data: {
        ...staffData,
        services: services
          ? {
              set: services.map((id) => ({ id })),
            }
          : undefined,
        availability: availability
          ? {
              set: availability.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        services: true,
        availability: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.staff.delete({
      where: { id },
    });
  }
}
