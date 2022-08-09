import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RetrieveUserInput {
  @Field(() => String, { nullable: true })
  id: string;
}
