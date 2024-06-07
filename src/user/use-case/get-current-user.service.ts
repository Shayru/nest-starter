import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';

Injectable();
export class GetCurrentUserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
  }

  async get(userId: number) {

    return await this.repository.findOneBy({ "id": userId });
  }
}
