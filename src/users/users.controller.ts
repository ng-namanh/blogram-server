import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUserService } from './user';
import { JwtAuthGuard } from 'src/auth/utils/guard.auth';
import { User } from 'src/database/typeorm/entities/User';

@Controller('user')
export class UsersController {
  constructor(@Inject(Services.USER) private userService: IUserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  async getUserPosts(@Req() req: Request & { user: User }) {
    return await this.userService.getUserPosts(req.user.id);
  }
}
