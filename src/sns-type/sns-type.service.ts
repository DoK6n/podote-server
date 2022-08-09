import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SnsTypeService {
  constructor(private readonly prisma: PrismaService) {}

  findOneSNSType(id: number) {
    return this.prisma.snsType.findUnique({
      where: {
        id,
      },
    });
  }
}
