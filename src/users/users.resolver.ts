import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UidGuard } from '../auth';
import { SnsTypeService } from '../sns-type/sns-type.service';
import { UserUid } from './decorators';
import { CreateUserInput, FindUserInput } from './dto';
import { User, UserWithSnsType } from './models';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly snsTypeService: SnsTypeService,
  ) {}

  @UseGuards(UidGuard)
  @Mutation(() => User)
  async addUser(@UserUid() uid: string, @Args('data') data: CreateUserInput) {
    return this.usersService.createUser(uid, data);
  }

  @Query(() => [User], { nullable: true })
  async retrieveAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(UidGuard)
  @Query(() => UserWithSnsType, { nullable: true })
  async retrieveUserById(@UserUid() uid: string) {
    const user = await this.usersService.findUserByUid(uid);
    // console.log(user);
    if (user) {
      const snsType = await this.snsTypeService.findOneSNSTypeId(
        user.snsTypeId,
      );
      return { ...user, snsType: snsType.name };
    } else {
      return null;
    }
  }
}
