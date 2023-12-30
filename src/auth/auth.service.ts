import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthService } from './auth';
import { ValidateUserDetails } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { UsersService } from 'src/users/users.service';
import { compareHash } from 'src/utils/helper';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: UsersService,
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

    return user;
  }
}
