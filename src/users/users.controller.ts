import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUserService } from './user';
import { JwtAuthGuard } from 'src/auth/utils/Guard';

@Controller('users')
export class UsersController {
  constructor(@Inject(Services.USER) private userService: IUserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
