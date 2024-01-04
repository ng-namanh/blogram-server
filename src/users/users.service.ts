import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { FindUserParams, UserDetails } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helper';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: UserDetails) {
    const existingUser = await this.userRepository.findOne({
      where: { email: userDetails.email },
    });
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists!',
        HttpStatus.CONFLICT,
      );
    }

    const password = await hashPassword(userDetails.password);

    const params = { ...userDetails, password };
    const newUser = this.userRepository.create(params);
    return this.userRepository.save(newUser);
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async findUser(findUserParams: FindUserParams) {
    return this.userRepository.findOne({
      where: { email: findUserParams.email },
    });
  }
}
