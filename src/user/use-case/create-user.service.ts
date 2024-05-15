import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { PasswordHasherServiceInterface } from '../utils/password-hasher.service.interface';
import { PasswordHasherService } from '../utils/password-hasher.service';

@Injectable()
export class CreateUserService{
  constructor(
    @InjectRepository(User)
    //private readonly userRepository: Repository<User>,
    private readonly passwordHasherService: PasswordHasherServiceInterface,
  ) {
  }

  async createUser(data: UserCreateDTO) {
    const userToPersist = {
      ...data,
      password: await this.passwordHasherService.hashPassword(data.password),
    };

    try{
      console.log(userToPersist)
     // return this.userRepository.save(userToPersist);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
}