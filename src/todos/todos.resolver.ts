import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UidGuard } from '../auth';
import { UserUid } from '../users/decorators';
import { UsersService } from '../users/users.service';
import {
  CreateTodoInput,
  UpdateTodoContentInput,
  UpdateTodoDoneInput,
} from './dto';
import { Todo } from './models';
import { TodosService } from './todos.service';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(
    private readonly todoService: TodosService, // private readonly userService: UsersService,
  ) {}

  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async addNewTodo(
    @UserUid() uid: string,
    @Args('data') data: CreateTodoInput,
  ) {
    return this.todoService.createNewTodo(uid, data);
  }

  @UseGuards(UidGuard)
  @Query(() => [Todo], { nullable: true })
  async retrieveAllTodos(@UserUid() uid: string) {
    return this.todoService.findAllTodosByUser(uid);
  }

  @UseGuards(UidGuard)
  @Query(() => Todo, { nullable: true })
  async retrieveTodo(
    @Args('id', { type: () => String }) id: string,
    @UserUid() uid: string,
  ) {
    return this.todoService.findOneTodoById(id, uid);
  }

  @UseGuards(UidGuard)
  @Query(() => Todo, { nullable: true })
  async retrieveRemovedTodo(
    @Args('id', { type: () => String }) id: string,
    @UserUid() uid: string,
  ) {
    return this.todoService.findOneRemovedTodo(id, uid);
  }

  @UseGuards(UidGuard)
  @Query(() => [Todo], { nullable: true })
  async retrieveAllRemovedTodo(@UserUid() uid: string) {
    return this.todoService.findAllRemovedTodos(uid);
  }

  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async editTodoContent(
    @UserUid() uid: string,
    @Args('data') data: UpdateTodoContentInput,
  ) {
    return this.todoService.updateTodoContentById(uid, data);
  }

  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async editTodoDone(
    @UserUid() uid: string,
    @Args('data') data: UpdateTodoDoneInput,
  ) {
    return this.todoService.updateTodoDoneById(uid, data);
  }

  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async removeTodo(
    @Args('id', { type: () => String }) id: string,
    @UserUid() uid: string,
  ) {
    return this.todoService.removeOneTodoById(id, uid);
  }

  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async recycleRemovedTodo(
    @Args('id', { type: () => String }) id: string,
    @UserUid() uid: string,
  ) {
    return this.todoService.recycleOneRemovedTodoById(id, uid);
  }

  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async deleteRemovedTodo(
    @Args('id', { type: () => String }) id: string,
    @UserUid() uid: string,
  ) {
    return this.todoService.deleteOneRemovedTodoById(id, uid);
  }

  @UseGuards(UidGuard)
  @Mutation(() => [Todo], { nullable: true })
  async deleteAllRemovedTodos(@UserUid() uid: string) {
    return this.todoService.deleteAllRemovedTodos(uid);
  }
}
