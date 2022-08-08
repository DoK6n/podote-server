import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  uid: string;

  @Field(() => GraphQLJSON, { nullable: true })
  content: Prisma.JsonValue;
}
