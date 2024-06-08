import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { CreateUserService } from './use-case/create-user.service';
import { PasswordHasherService } from './utils/password-hasher.service';
import { GetAllUsersService } from './use-case/get-all-users.service';
import { DeleteUserService } from './use-case/delete-user.service';
import { UpdateUserPasswordService } from './use-case/update-user-password.service';
import { UpdateUserService } from './use-case/update-user.service';
import { GetUserByIdService } from './use-case/get-user-by-id.service';
import { makeAdminService } from './use-case/make-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
   CreateUserService,
    GetAllUsersService,
    GetUserByIdService,
    UpdateUserPasswordService,
    UpdateUserService,
    DeleteUserService,
    PasswordHasherService,
    makeAdminService
  ],
  exports: [
    TypeOrmModule.forFeature([User]),
    GetUserByIdService
  ]
})
export class UserModule {}
