import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersRepository } from './user.repository';

@Module({
  providers: [UserService, UsersRepository],
  exports: [UserService]
})
export class UserModule {}
