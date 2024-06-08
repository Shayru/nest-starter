import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { PasswordHasherService } from '../utils/password-hasher.service';

export class UpdateUserPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly passwordHasherService: PasswordHasherService
  ) {
  }

  async update(id: number, password: string) {
    try {
      const user = await this.repository.findOneBy({ id });
      user.password = await this.passwordHasherService.hashPassword(password);
      
      return await this.repository.save(user);
    } catch (error) {
      throw new Error('Error while updating user');
    }
  }
}