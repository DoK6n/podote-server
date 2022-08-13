import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UpdateTodoContentInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  uid: string;

  @Field(() => GraphQLJSON, { nullable: true })
  content: Prisma.JsonValue;
}
