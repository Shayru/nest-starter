import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { CreateUserService } from './use-case/create-user.service';
import { PasswordHasherService } from './utils/password-hasher.service';
import { GetAllUsersService } from './use-case/get-all-users.service';
import { DeleteUserService } from './use-case/delete-user.service';
import { PasswordHasherServiceInterface } from './utils/password-hasher.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
   // CreateUserService,
    GetAllUsersService,
    DeleteUserService,
    PasswordHasherService,
    {
        provide: CreateUserService,
        useFactory: (PasswordHasherService: PasswordHasherServiceInterface) => {
            return new CreateUserService(PasswordHasherService); 
        },
        inject: [PasswordHasherService],
    },
  ],
})
export class UserModule {}
