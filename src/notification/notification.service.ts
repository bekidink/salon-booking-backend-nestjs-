import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.notification.findMany({
        orderBy: {
          createdAt: 'desc', // Sort by newest first
        },
      });
    } catch (error) {
      throw new Error('Failed to fetch notifications');
    }
  }

  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      return await this.prisma.notification.create({
        data: {
          ...createNotificationDto,
          isRead: createNotificationDto.isRead ?? false, // Default to unread
        },
      });
    } catch (error) {
      throw new Error('Failed to create notification');
    }
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    try {
      await this.findOne(id); // Verify notification exists first

      return await this.prisma.notification.update({
        where: { id },
        data: updateNotificationDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update notification');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id); // Verify notification exists first

      return await this.prisma.notification.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to delete notification');
    }
  }

  async markAsRead(id: string) {
    try {
      await this.findOne(id); // Verify notification exists first

      return await this.prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to mark notification as read');
    }
  }
}
