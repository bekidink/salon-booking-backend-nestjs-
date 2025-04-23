import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany({
      include: {
        vendor: true,
        staff: true,
        bookings: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        vendor: true,
        staff: true,
        bookings: true,
      },
    });
  }

  async create(createServiceDto: CreateServiceDto) {
    const { staff, ...serviceData } = createServiceDto;

    return this.prisma.service.create({
      data: {
        ...serviceData,
        staff: staff
          ? {
              connect: staff.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        staff: true,
        vendor: true,
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const { staff, ...serviceData } = updateServiceDto;

    return this.prisma.service.update({
      where: { id },
      data: {
        ...serviceData,
        staff: staff
          ? {
              set: staff.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        staff: true,
        vendor: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
