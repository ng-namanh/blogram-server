import { User } from 'src/database/typeorm/entities/User';
import { FindUserParams, UserDetails } from './../utils/types';
export interface IUserService {
  getUsers(): Promise<User[]>;
  createUser(userDetail: UserDetails): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
}
