import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SnsTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneSNSTypeId(id: number) {
    return await this.prisma.snsType.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneSNSTypeName(name: string) {
    return await this.prisma.snsType.findUnique({
      where: {
        name,
      },
    });
  }
}
