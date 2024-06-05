import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from './use-case/login.service';
import { AuthController } from './controller/auth.controller';
import { User } from 'src/user/entity/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PasswordHasherService } from 'src/user/utils/password-hasher.service';
import { jwtConstants } from './constants/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5000s' },
    }),
],
  controllers: [AuthController],
  providers: [
    LoginService,
    JwtService,
    PasswordHasherService
  ],
})
export class AuthModule {}
