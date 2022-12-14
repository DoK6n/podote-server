import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTodoInput,
  TodoIdInput,
  UpdateTodoContentInput,
  UpdateTodoDoneInput,
  UpdateTodoOrderkeyInput,
} from './dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewTodo(uid: string, data: CreateTodoInput) {
    const { content } = data;
    const count = await this.prisma.todo.count({
      where: {
        userId: uid,
      },
    });

    return await this.prisma.todo.create({
      data: {
        content: JSON.parse(JSON.stringify(content)),
        orderKey: count + 1,
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
        isRemoved: false,
      },
      orderBy: {
        orderKey: 'desc',
      },
    });
  }

  async findOneTodoById(id: string, uid: string) {
    return await this.prisma.todo.findFirst({
      where: {
        id: id,
        userId: uid,
        isRemoved: false,
      },
    });
  }

  async findOneRemovedTodo(id: string, uid: string) {
    return await this.prisma.todo.findFirst({
      where: {
        id: id,
        userId: uid,
        isRemoved: true,
      },
    });
  }

  async findAllRemovedTodos(uid: string) {
    return await this.prisma.todo.findMany({
      where: {
        userId: uid,
        isRemoved: true,
      },
      orderBy: {
        removedDt: 'desc',
      },
    });
  }

  async updateTodoContentById(uid: string, data: UpdateTodoContentInput) {
    const { id, content } = data;
    await this.prisma.todo.updateMany({
      where: {
        id: id,
        userId: uid,
        isRemoved: false,
      },
      data: {
        content: JSON.parse(JSON.stringify(content)),
        updatedDt: new Date(),
      },
    });
    return await this.findOneTodoById(id, uid);
  }

  async updateTodoDoneById(uid: string, data: UpdateTodoDoneInput) {
    const { id, done } = data;
    await this.prisma.todo.updateMany({
      where: {
        id: id,
        userId: uid,
        isRemoved: false,
      },
      data: {
        done: done,
        updatedDt: new Date(),
      },
    });
    return await this.findOneTodoById(id, uid);
  }

  async updateTodoOrderkeyInput(uid: string, data: UpdateTodoOrderkeyInput) {
    const { TodoIdOrderKey } = data;
    let query = Prisma.sql`UPDATE podote_schema.todo as t SET order_key = c.order_key from (values `;

    TodoIdOrderKey.forEach((d, i) => {
      i < TodoIdOrderKey.length - 1
        ? (query = Prisma.sql`${query} (${d.id}, ${d.orderKey}, ${uid}), `)
        : (query = Prisma.sql`${query} (${d.id}, ${d.orderKey}, ${uid}) `);
    });

    query = Prisma.sql`${query}) as c (id, order_key, user_id) where c.user_id = t.user_id and c.id = t.id`;

    await this.prisma.$queryRaw<Todo[]>(query);
    return await this.findAllTodosByUser(uid);
  }

  /**
   * $queryRaw??? ?????? ?????? ????????? ????????? ????????? ??? ????????????. ?????? ????????? ?????? $queryRawUnsafe??? ???????????? ?????????.
   * ```js
    let userTable = 'User'
    let result = await prisma.$queryRawUnsafe(`SELECT * FROM ${userTable}`)
   * ```
   * $queryRawUnsafe??? ????????? ????????? ?????? ???????????? SQL ?????? ????????? ????????? ????????????.
   * > SQL ????????? ????????? ??????????????? ????????? ???????????? ??????????????? ????????? ??? ?????? ???????????? ????????? ??? ????????????.
    ?????? $queryRaw ????????? ???????????? ?????? ????????????. SQL ????????? ????????? ?????? ????????? ????????? [OWASP SQL ????????? ?????????](https://owasp.org/www-community/attacks/SQL_Injection)??? ???????????????.
   * 
   */
  async removeOneTodoById(uid: string, data: TodoIdInput) {
    const { id } = data;
    await this.prisma
      .$queryRaw<Todo>`UPDATE todo SET is_removed = true, removed_dt = now() WHERE id = ${id} AND user_id = ${uid}`;

    return await this.findOneRemovedTodo(id, uid);
  }

  async recycleOneRemovedTodoById(uid: string, data: TodoIdInput) {
    const { id } = data;
    await this.prisma
      .$queryRaw<Todo>`UPDATE todo SET is_removed = false, removed_dt = null WHERE id = ${id} AND user_id = ${uid}`;

    return await this.findOneTodoById(id, uid);
  }

  async deleteOneRemovedTodoById(uid: string, data: TodoIdInput) {
    const { id } = data;
    await this.prisma
      .$queryRaw<Todo>`DELETE FROM todo WHERE id = ${id} AND user_id = ${uid} AND is_removed = true`;
    return await this.findAllRemovedTodos(uid);
  }

  async deleteAllRemovedTodos(uid: string) {
    await this.prisma.todo.deleteMany({
      where: {
        userId: uid,
        isRemoved: true,
      },
    });
    return await this.findAllRemovedTodos(uid);
  }
}
