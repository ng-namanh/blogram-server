import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './auth';
import { ValidateUserDetails } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: UsersService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userService.findUser({ email: userDetails.email });
    if (userDetails.password !== user.password) {
      throw new UnauthorizedException('Wrong credentials');
    }
    console.log(user);

    return user;
  }
}
