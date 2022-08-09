import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SnsTypeService } from './sns-type.service';
import { SnsType } from './models/sns-type.model';

@Resolver(() => SnsType)
export class SnsTypeResolver {
  constructor(private readonly snsTypeService: SnsTypeService) {}

  @Query(() => SnsType, { name: 'snsType' })
  retrieveSNSType(@Args('id', { type: () => Int }) id: number) {
    return this.snsTypeService.findOneSNSType(id);
  }
}
