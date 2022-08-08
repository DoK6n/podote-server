import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Number)
  snsTypeId: number;
}
