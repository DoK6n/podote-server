import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  IsJSON,
  IsBoolean,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

@ObjectType()
export class Todo {
  @Field(() => Int)
  @IsNumber()
  id: number;

  @Field()
  @IsJSON()
  content: JSON;

  @Field(() => Boolean)
  @IsBoolean()
  done: boolean;

  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsDateString()
  createdDt: string;

  @Field()
  @IsDateString()
  updatedDt: string;

  @Field()
  @IsDateString()
  removedDt: string;
}
