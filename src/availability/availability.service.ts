import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAvailabilityDto: CreateAvailabilityDto) {
    return this.prisma.availability.create({
      data: createAvailabilityDto,
    });
  }

  async findAll() {
    return this.prisma.availability.findMany({
      include: {
        staff: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.availability.findUnique({
      where: { id },
      include: {
        staff: true,
      },
    });
  }

  async update(id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.prisma.availability.update({
      where: { id },
      data: updateAvailabilityDto,
    });
  }

  async remove(id: string) {
    return this.prisma.availability.delete({
      where: { id },
    });
  }
}
