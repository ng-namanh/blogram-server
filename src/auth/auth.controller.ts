import { Body, Controller, Inject, Post, UseGuards, Req } from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dto/CreateUser.dto';
import { IUserService } from 'src/users/user';
import { Request } from 'express';
import { ValidateUserDetails } from 'src/utils/types';
import { LocalAuthGuard, RefreshJwtAuthGuard } from './utils/guard.auth';
import { ReturnMessage } from 'src/utils/types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
    return {
      success: true,
      message: 'User registration successful.',
    } as ReturnMessage;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as ValidateUserDetails);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req.user as ValidateUserDetails);
  }
}
