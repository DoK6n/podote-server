import { Module } from '@nestjs/common';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';

@Module({
  providers: [TodosService, TodosResolver],
  exports: [TodosService],
})
export class TodosModule {}
