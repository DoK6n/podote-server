import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';

@Module({
  imports: [UsersModule],
  providers: [TodosService, TodosResolver],
  exports: [TodosService],
})
export class TodosModule {}
