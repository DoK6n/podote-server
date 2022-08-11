import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
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

  /**
   * $queryRaw와 함께 동적 테이블 이름을 사용할 수 없습니다. 대신 다음과 같이 $queryRawUnsafe를 사용해야 합니다.
   * ```js
    let userTable = 'User'
    let result = await prisma.$queryRawUnsafe(`SELECT * FROM ${userTable}`)
   * ```
   * $queryRawUnsafe를 사용자 입력과 함께 사용하면 SQL 주입 공격의 위험이 있습니다.
   * > SQL 인젝션 공격은 기밀이거나 민감한 데이터를 수정하거나 파괴할 수 있는 데이터를 노출할 수 있습니다.
    대신 $queryRaw 쿼리를 사용하는 것이 좋습니다. SQL 인젝션 공격에 대한 자세한 내용은 [OWASP SQL 인젝션 가이드](https://owasp.org/www-community/attacks/SQL_Injection)를 참조하세요.
   * 
   */
  async removeOneTodoById(id: string, uid: string) {
    await this.prisma
      .$queryRaw<Todo>`UPDATE todo SET is_removed = true, removed_dt = now() WHERE id = ${id} AND user_id = ${uid}`;

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
