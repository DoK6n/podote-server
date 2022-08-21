import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SnsTypeService } from '../sns-type/sns-type.service';
import { CreateUserInput } from './dto';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly snsTypeService: SnsTypeService,
  ) {}

  async createUser(
    uid: string,
    { email, name, snsTypeName, createDt }: CreateUserInput,
  ) {
    const snsType = await this.snsTypeService.findOneSNSTypeName(snsTypeName);
    return await this.prisma.user.create({
      data: {
        id: uid,
        email: email,
        name: name,
        createdDt: createDt,
        snsType: {
          connect: {
            id: snsType.id,
          },
        },
      },
    });
  }

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
