import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TodoIdInput {
  @Field(() => String)
  id: string;
}
