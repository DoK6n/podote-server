import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UidGuard } from '../auth';
import { UserUid } from '../users/decorators';
import {
  CreateTodoInput,
  TodoIdInput,
  TodoIdOrderKey,
  UpdateTodoContentInput,
  UpdateTodoDoneInput,
  UpdateTodoOrderkeyInput,
} from './dto';
import { Todo } from './models';
import { TodosService } from './todos.service';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  // 유저 생성
  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async addNewTodo(
    @UserUid() uid: string,
    @Args('data') data: CreateTodoInput,
  ) {
    return this.todoService.createNewTodo(uid, data);
  }

  // 할일 목록 조회
  @UseGuards(UidGuard)
  @Query(() => [Todo], { nullable: true })
  async retrieveAllTodos(@UserUid() uid: string) {
    return this.todoService.findAllTodosByUser(uid);
  }

  // 할일 항목 조회
  @UseGuards(UidGuard)
  @Query(() => Todo, { nullable: true })
  async retrieveTodo(
    @Args('id', { type: () => String }) id: string,
    @UserUid() uid: string,
  ) {
    return this.todoService.findOneTodoById(id, uid);
  }

  // 삭제한 항목 조회
  @UseGuards(UidGuard)
  @Query(() => Todo, { nullable: true })
  async retrieveRemovedTodo(
    @Args('id', { type: () => String }) id: string,
    @UserUid() uid: string,
  ) {
    return this.todoService.findOneRemovedTodo(id, uid);
  }

  // 삭제한 할일 목록 조회
  @UseGuards(UidGuard)
  @Query(() => [Todo], { nullable: true })
  async retrieveAllRemovedTodo(@UserUid() uid: string) {
    return this.todoService.findAllRemovedTodos(uid);
  }

  // 할일 항목 내용 수정
  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async editTodoContent(
    @UserUid() uid: string,
    @Args('data') data: UpdateTodoContentInput,
  ) {
    return this.todoService.updateTodoContentById(uid, data);
  }

  // 할일 항목 완료
  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async editTodoDone(
    @UserUid() uid: string,
    @Args('data') data: UpdateTodoDoneInput,
  ) {
    return this.todoService.updateTodoDoneById(uid, data);
  }

  // 할일 항목 순서 변경
  @UseGuards(UidGuard)
  @Mutation(() => [Todo])
  async switchTodoOrder(
    @UserUid() uid: string,
    @Args('data') data: UpdateTodoOrderkeyInput,
  ) {
    return this.todoService.updateTodoOrderkeyInput(uid, data);
  }

  // 할일 항목 삭제 (soft delete)
  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async removeTodo(@UserUid() uid: string, @Args('data') data: TodoIdInput) {
    return this.todoService.removeOneTodoById(uid, data);
  }

  // 삭제한 할일 항목 복원
  @UseGuards(UidGuard)
  @Mutation(() => Todo, { nullable: true })
  async recycleRemovedTodo(
    @UserUid() uid: string,
    @Args('data') data: TodoIdInput,
  ) {
    return this.todoService.recycleOneRemovedTodoById(uid, data);
  }

  // 할일 항목 영구 삭제
  @UseGuards(UidGuard)
  @Mutation(() => [Todo], { nullable: true })
  async deleteRemovedTodo(
    @UserUid() uid: string,
    @Args('data') data: TodoIdInput,
  ) {
    return this.todoService.deleteOneRemovedTodoById(uid, data);
  }

  // 할일 목록 전체 영구 삭제
  @UseGuards(UidGuard)
  @Mutation(() => [Todo], { nullable: true })
  async deleteAllRemovedTodos(@UserUid() uid: string) {
    return this.todoService.deleteAllRemovedTodos(uid);
  }
}
