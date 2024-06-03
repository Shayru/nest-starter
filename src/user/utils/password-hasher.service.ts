import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasherServiceInterface } from './password-hasher.service.interface';

Injectable();
export class PasswordHasherService implements PasswordHasherServiceInterface{
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltOrRounds);

    return passwordHashed;
  }

  async compare(password1: string, password2){
    return bcrypt.compare(password1,password2);
  }
}