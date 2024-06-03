import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { LoginService } from '../use-case/login.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService

) {}


  @Post("/login")
  login(@Body() data: LoginDto) {
    return this.loginService.login(data);
  }

}
