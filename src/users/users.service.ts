import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findUserByUid(uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: uid,
      },
    });
  }
}
