import { Injectable } from '@nestjs/common';
import { IUserService } from './user';

@Injectable()
export class UsersService implements IUserService {
  createUser() {
    console.log('user created');
  }
}
