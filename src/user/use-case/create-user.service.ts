import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { PasswordHasherService } from '../utils/password-hasher.service';

@Injectable()
export class CreateUserService{
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly passwordHasherService: PasswordHasherService,
  ) {
  }

  async createUser(data: UserCreateDTO) {
    const userExist = await this.repository.findOneBy({ username: data.username });
    if(userExist) {
      throw new Error('User already exist');
    }
    
    data.password = await this.passwordHasherService.hashPassword(data.password);
    const user = new User(data);

    try{
     return await this.repository.save(user);
    } catch (error) {
      throw new Error('Error while creating user');
    }
  }
}