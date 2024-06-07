import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { PasswordHasherServiceInterface } from '../utils/password-hasher.service.interface';
import { PasswordHasherService } from '../utils/password-hasher.service';
import { Order } from '../../order/entity/order.entity';

@Injectable()
export class CreateUserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly passwordHasherService: PasswordHasherServiceInterface,
    private readonly passwordHasherService: PasswordHasherService,
  ) {
  }

  async createUser(data: UserCreateDTO) {
    const userExist = await this.userRepository.findOneBy({ username: data.username });
    if(userExist) {
      throw new Error('User already exist');
    }
    
    data.password = await this.passwordHasherService.hashPassword(data.password);
    const user = new User(data);

    try{
     return this.userRepository.save(user);
    } catch (error) {
      throw new Error('Error while creating user');
    }
  }
}