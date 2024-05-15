import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { CreateUserService } from './use-case/create-user.service';
import { PasswordHasherService } from './utils/password-hasher.service';
import { GetAllUsersService } from './use-case/get-all-users.service';
import { DeleteUserService } from './use-case/delete-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserService,
    GetAllUsersService,
    DeleteUserService,
    PasswordHasherService
  ],
})
export class UserModule {}
