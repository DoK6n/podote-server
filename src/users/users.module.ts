import { Module } from '@nestjs/common';
import { SnsTypeModule } from 'src/sns-type/sns-type.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [SnsTypeModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, UsersResolver],
})
export class UsersModule {}
