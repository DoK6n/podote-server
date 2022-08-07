import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RetrieveUserInput {
  @Field({ nullable: true })
  id: string;
}
