import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { CreateTodoInput } from './dto';
import { Todo } from './models';
import { TodosService } from './todos.service';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(
    private readonly todoService: TodosService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Todo, { nullable: true })
  async addNewTodo(@Args('data') data: CreateTodoInput) {
    return this.todoService.createNewTodo(data);
  }

  @Query(() => [Todo], { nullable: true })
  async retrieveAllTodos(@Args('uid', { type: () => String }) uid: string) {
    return this.todoService.findAllTodosByUser(uid);
  }

  @Query(() => Todo, { nullable: true })
  async retrieveTodo(
    @Args('id', { type: () => String }) id: string,
    @Args('uid', { type: () => String }) uid: string,
  ) {
    return this.todoService.findOneTodoById(id, uid);
  }

  // @Query(() => [Todo], { nullable: true })
  // async retrieveRemovedTodo() {
  //   return this.todoService.findOneRemovedTodoByIsRemoved();
  // }

  // @Query(() => [Todo], { nullable: true })
  // async editTodo() {
  //   return this.todoService.updateOneTodoById();
  // }

  // @Query(() => [Todo], { nullable: true })
  // async removeTodo() {
  //   return this.todoService.removeOneTodoById();
  // }

  // @Query(() => [Todo], { nullable: true })
  // async recycleRemovedTodo() {
  //   return this.todoService.recycleOneRemovedTodoById();
  // }

  // @Query(() => [Todo], { nullable: true })
  // async deleteTodo() {
  //   return this.todoService.deleteOneRemoveTodoById();
  // }

  // @Query(() => [Todo], { nullable: true })
  // async deleteAllRemovedTodos() {
  //   return this.todoService.deleteAllRemovedTodos();
  // }
}
