import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';
import { TodosService } from './todos/todos.service';
import { UsersResolver } from './users/users.resolver';
import { TodosResolver } from './todos/todos.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    UsersService,
    TodosService,
    UsersResolver,
    TodosResolver,
  ],
})
export class AppModule {}
