import { Module } from '@nestjs/common';
import { SnsTypeService } from './sns-type.service';
import { SnsTypeResolver } from './sns-type.resolver';

@Module({
  providers: [SnsTypeResolver, SnsTypeService],
  exports: [SnsTypeResolver, SnsTypeService],
})
export class SnsTypeModule {}
