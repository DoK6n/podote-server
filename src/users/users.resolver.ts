import { Args, Query, Resolver } from '@nestjs/graphql';
import { RetrieveUserInput } from './dto';
import { User } from './models';
import { UsersService } from './users.service';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { nullable: true })
  async retrieveAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Query(() => [User], { nullable: true })
  async retrieveUserById(
    @Args('retrieveUserInput') retrieveUserInput: RetrieveUserInput,
  ) {
    return this.usersService.findUserByUid(retrieveUserInput.id);
  }
}
