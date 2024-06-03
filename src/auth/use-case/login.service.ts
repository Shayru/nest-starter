import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { User } from 'src/user/entity/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordHasherService } from 'src/user/utils/password-hasher.service';
import { jwtConstants } from '../constants/constants';

export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHasherService: PasswordHasherService,
    private readonly jwtService: JwtService
  ) {
  }

  
  async login(data: LoginDto): Promise<{ access_token: string }>  {
    const user = await this.userRepository.findOneBy({"username": data.username});
    if (!await this.passwordHasherService.compare(data.password, user.password)) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret
        }),
      };
  }
}