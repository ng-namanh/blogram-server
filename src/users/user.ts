import { UserDetails } from './../utils/types';
export interface IUserService {
  createUser(userDetail: UserDetails);
}
