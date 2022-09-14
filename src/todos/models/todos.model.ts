import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';
import { User } from '../../users/models';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Todo {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => Number)
  @IsNumber()
  orderKey: number;

  @Field(() => GraphQLJSON, { nullable: true })
  content?: Prisma.JsonValue;

  @Field(() => Boolean)
  @IsBoolean()
  done: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  editable: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  isRemoved: boolean;

  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => GraphQLISODateTime)
  createdDt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedDt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  removedDt?: Date;

  @Field(() => User)
  user: User;
}
