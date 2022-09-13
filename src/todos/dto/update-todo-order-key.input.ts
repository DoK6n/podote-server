import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class TodoIdOrderKey {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  orderKey: number;
}

@InputType()
export class UpdateTodoOrderkeyInput {
  @Field(() => [TodoIdOrderKey])
  TodoIdOrderKey: TodoIdOrderKey[];
}
