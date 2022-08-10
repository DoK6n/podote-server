import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewTodo(data: CreateTodoInput) {
    const { uid, content } = data;
    return await this.prisma.todo.create({
      data: {
        content: JSON.parse(JSON.stringify(content)),
        user: {
          connect: {
            id: uid,
          },
        },
      },
    });
  }

  async findAllTodosByUser(uid: string) {
    return await this.prisma.todo.findMany({
      where: {
        userId: uid,
      },
    });
  }

  async findOneTodoById(id: string, uid: string) {
    return await this.prisma.todo.findFirst({
      where: {
        AND: [{ id: id }, { userId: uid }],
      },
    });
  }

  // async findOneRemovedTodoByIsRemoved() {
  //   return {};
  // }

  // async updateOneTodoById() {
  //   return {};
  // }

  async removeOneTodoById(id: string, uid: string) {
    await this.prisma
      .$queryRaw`UPDATE todo SET is_removed = true, removed_dt = now() WHERE id = ${id} AND user_id = ${uid}`;

    return await this.findOneTodoById(id, uid);
  }

  // async recycleOneRemovedTodoById() {
  //   return {};
  // }

  // async deleteOneRemoveTodoById() {
  //   return {};
  // }

  // async deleteAllRemovedTodos() {
  //   return {};
  // }
}
