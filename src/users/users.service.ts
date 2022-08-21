import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SnsTypeService } from '../sns-type/sns-type.service';
import { CreateUserInput, FindUserInput } from './dto';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly snsTypeService: SnsTypeService,
  ) {}

  async createUser({
    id,
    email,
    name,
    snsTypeName,
    createDt,
  }: CreateUserInput) {
    const snsType = await this.snsTypeService.findOneSNSTypeName(snsTypeName);
    return await this.prisma.user.create({
      data: {
        id: id,
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

  async findUserByUid({ id }: FindUserInput) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
