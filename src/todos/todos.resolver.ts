import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './models';
import { TodosService } from './todos.service';

@Resolver(Todo)
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  @Query()
  async addNewTodo() {
    return this.todoService.createNewTodo();
  }

  @Query()
  async retrieveAllTodos() {
    return this.todoService.findAllTodosByUser();
  }

  @Query()
  async retrieveTodo() {
    return this.todoService.findOneTodoById();
  }

  @Query()
  async retrieveRemovedTodo() {
    return this.todoService.findOneRemovedTodoByIsRemoved();
  }

  @Query()
  async editTodo() {
    return this.todoService.updateOneTodoById();
  }

  @Query()
  async removeTodo() {
    return this.todoService.removeOneTodoById();
  }

  @Query()
  async recycleRemovedTodo() {
    return this.todoService.recycleOneRemovedTodoById();
  }

  @Query()
  async deleteTodo() {
    return this.todoService.deleteOneRemoveTodoById();
  }

  @Query()
  async deleteAllRemovedTodos() {
    return this.todoService.deleteAllRemovedTodos();
  }
}
