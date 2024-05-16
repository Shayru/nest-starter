import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserUpdateDTO } from '../dto/user-update.dto';
import { PasswordHasherService } from '../utils/password-hasher.service';

export class UpdateUserPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHasherService: PasswordHasherService
  ) {
  }

  async update(id: number, password: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      password = await this.passwordHasherService.hashPassword(password);
      user.password = password

      
      await this.userRepository.save(user);
      
     return user
    } catch (error) {
      throw new Error('Error while updating user');
    }
  }
}