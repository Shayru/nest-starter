import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export class makeAdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async makeAdmin(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    user.makeAdmin()

    return await this.userRepository.save(user);
  }
}