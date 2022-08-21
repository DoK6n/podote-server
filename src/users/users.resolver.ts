import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SnsTypeService } from '../sns-type/sns-type.service';
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

  @Mutation(() => User)
  async addUser(@Args('data') data: CreateUserInput) {
    return this.usersService.createUser(data);
  }

  @Query(() => [User], { nullable: true })
  async retrieveAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Query(() => UserWithSnsType)
  async retrieveUserById(@Args('data') data: FindUserInput) {
    const user = await this.usersService.findUserByUid(data);
    const snsType = await this.snsTypeService.findOneSNSTypeId(user.snsTypeId);

    return { ...user, snsType: snsType.name };
  }
}
