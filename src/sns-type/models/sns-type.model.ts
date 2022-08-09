import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SnsType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
