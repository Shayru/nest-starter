import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

Injectable();
export class PasswordHasherService {
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltOrRounds);

    return passwordHashed;
  }
}