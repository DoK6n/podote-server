import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Number)
  snsTypeId: number;
}
