import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewTodo() {
    return '';
  }

  async findAllTodosByUser() {
    return {};
  }

  async findOneTodoById() {
    return {};
  }

  async findOneRemovedTodoByIsRemoved() {
    return {};
  }

  async updateOneTodoById() {
    return {};
  }

  async removeOneTodoById() {
    return {};
  }

  async recycleOneRemovedTodoById() {
    return {};
  }

  async deleteOneRemoveTodoById() {
    return {};
  }

  async deleteAllRemovedTodos() {
    return {};
  }
}
