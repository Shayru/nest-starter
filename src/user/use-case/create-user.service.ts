import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from '../dto/user-create.dto';
import { PasswordHasherService } from '../utils/password-hasher.service';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHasherService: PasswordHasherService,
  ) {
  }

  async createUser(data: UserCreateDTO) {
    const userToPersist = {
      ...data,
      password: await this.passwordHasherService.hashPassword(data.password),
    };

    try{
      console.log(userToPersist)
      return this.userRepository.save(userToPersist);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
}