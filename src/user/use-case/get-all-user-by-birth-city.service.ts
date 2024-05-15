import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';

Injectable();
export class getAllUserByBirthCityService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
  }

  async get(city: string) {
    return await this.repository.findOneBy({ "birthcity": city });
  }
}
