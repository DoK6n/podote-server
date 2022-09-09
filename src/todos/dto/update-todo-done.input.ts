import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UpdateTodoDoneInput {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  done: boolean;
}
