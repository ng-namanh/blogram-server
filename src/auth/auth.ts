import { LoginDto } from './dto/Login.dto';
// import { User } from 'src/database/typeorm/entities/User';

export interface IAuthService {
  validateUser(loginDto: LoginDto);
}
