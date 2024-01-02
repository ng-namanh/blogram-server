import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthService } from './auth';
import { ValidateUserDetails, JwtPayload } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { UsersService } from 'src/users/users.service';
import { compareHash } from 'src/utils/helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userService.findUser({ email: userDetails.email });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await compareHash(
      userDetails.password,
      user.password,
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new HttpException(
        'Wrong username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  // Implement login to sign jwt key here to retrun jwt token
  login(user: ValidateUserDetails) {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
