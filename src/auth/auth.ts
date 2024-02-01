import { ValidateUserDetails } from 'src/utils/types';
import { LoginDto } from './dto/Login.dto';
import { User } from 'src/database/typeorm/entities/User';

export interface IAuthService {
  validateUser(loginDto: LoginDto): Promise<User>;
  generateAccesstoken(user: ValidateUserDetails): string;
  refreshToken(user: ValidateUserDetails): string;
}
