import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserUpdateDTO } from '../dto/user-update.dto';

export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
  }

  async update(id: number, data: UserUpdateDTO) {
    const user = await this.repository.findOneBy({ id });
    const userUpdate = { ...user, ...data };
    await this.repository.save(userUpdate);

    return userUpdate;
  }
}