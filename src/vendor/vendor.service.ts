import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vendor.findMany({
      include: {
        owner: true, // includes user who owns the vendor
        services: true, // includes services related to the vendor
        staff: true, // includes staff related to the vendor
        bookings: true, // includes bookings related to the vendor
        reviews: true, // includes reviews for the vendor
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.vendor.findUnique({
      where: { id },
      include: {
        owner: true,
        services: true,
        staff: true,
        bookings: true,
        reviews: true,
      },
    });
  }

  async create(createVendorDto: CreateVendorDto) {
    return this.prisma.vendor.create({
      data: createVendorDto,
    });
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    return this.prisma.vendor.update({
      where: { id },
      data: updateVendorDto,
    });
  }

  async remove(id: string) {
    return this.prisma.vendor.delete({
      where: { id },
    });
  }
}
