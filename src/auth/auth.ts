import { ValidateUserDetails } from 'src/utils/types';
import { LoginDto } from './dto/Login.dto';
import { User } from 'src/database/typeorm/entities/User';

export interface IAuthService {
  validateUser(loginDto: LoginDto): Promise<User>;
  login(user: ValidateUserDetails): void;
  refreshToken(user: ValidateUserDetails): void;
}
