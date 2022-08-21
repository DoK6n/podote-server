import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  snsTypeName: string; // providerData[0].providerId = "google.com"

  @Field(() => GraphQLISODateTime)
  createDt: Date;
}
