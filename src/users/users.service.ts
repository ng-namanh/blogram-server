import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { FindUserParams, UserDetails } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helper';

/**
 * Service responsible for handling user-related operations.
 */

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * @param userDetails - The details of the user to be created.
   * @returns The newly created user.
   * @throws HttpException with status code 409 if a user with the same email already exists.
   */
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
    return await this.userRepository.save(newUser);
  }

  /**
   * Retrieves all users.
   * @returns An array of users.
   */
  async getUsers() {
    return await this.userRepository.find();
  }

  /**
   * Retrieves a user's posts.
   * @param userId - The ID of the user.
   * @returns The user with their associated posts.
   */
  async getUserPosts(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
    });
  }

  /**
   * Finds a user based on the specified parameters.
   * @param findUserParams - The parameters to search for a user.
   * @returns The found user.
   */
  async findUser(findUserParams: FindUserParams) {
    return this.userRepository.findOne({
      where: { email: findUserParams.email },
    });
  }
}
