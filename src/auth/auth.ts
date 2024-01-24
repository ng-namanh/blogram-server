import { AccessToken, ValidateUserDetails } from 'src/utils/types';
import { LoginDto } from './dto/Login.dto';
import { User } from 'src/database/typeorm/entities/User';

export interface IAuthService {
  validateUser(loginDto: LoginDto): Promise<User>;
  generateAccesstoken(user: ValidateUserDetails): AccessToken;
  refreshToken(user: ValidateUserDetails): void;
}
