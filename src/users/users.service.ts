import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { UserDetails } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(userDetails: UserDetails) {
    return this.userRepository.save(userDetails);
  }
}
