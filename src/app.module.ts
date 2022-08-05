import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';
import { TodosService } from './todos/todos.service';
import { UsersResolver } from './users/users.resolver';
import { TodosResolver } from './todos/todos.resolver';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService, TodosService, UsersResolver, TodosResolver],
})
export class AppModule {}
