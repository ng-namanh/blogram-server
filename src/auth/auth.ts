import { ValidateUserDetails } from 'src/utils/types';
import { LoginDto } from './dto/Login.dto';
// import { User } from 'src/database/typeorm/entities/User';

export interface IAuthService {
  validateUser(loginDto: LoginDto);
  login(user: ValidateUserDetails);
  refreshToken(user: ValidateUserDetails);
}
