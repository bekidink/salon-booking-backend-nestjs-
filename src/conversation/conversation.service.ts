import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConversationDto: CreateConversationDto) {
    return this.prisma.conversation.create({
      data: {
        participants: {
          connect: createConversationDto.participantIds.map((id) => ({ id })),
        },
      },
      include: {
        participants: true,
        messages: true,
        lastMessage: true,
      },
    });
  }

  async findAll() {
    return this.prisma.conversation.findMany({
      include: {
        participants: true,
        messages: true,
        lastMessage: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: true,
        messages: true,
        lastMessage: true,
      },
    });
  }

  async update(id: string, updateConversationDto: UpdateConversationDto) {
    return this.prisma.conversation.update({
      where: { id },
      data: {
        lastMessageId: updateConversationDto.lastMessageId,
      },
      include: {
        participants: true,
        messages: true,
        lastMessage: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.conversation.delete({
      where: { id },
    });
  }
}
