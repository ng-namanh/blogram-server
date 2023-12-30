import { Controller, Get, Inject } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUserService } from './user';

@Controller('users')
export class UsersController {
  constructor(@Inject(Services.USER) private userService: IUserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
