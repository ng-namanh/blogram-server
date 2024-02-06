import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dto/CreateUser.dto';
import { IUserService } from 'src/users/user';
import { Request, Response } from 'express';
import { ValidateUserDetails } from 'src/utils/types';
import { LocalAuthGuard, RefreshJwtAuthGuard } from './utils/guard.auth';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as ValidateUserDetails;

    res.cookie('token', this.authService.generateAccesstoken(user), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json({
      user: { id: user.id, email: user.email },
      accessToken: this.authService.generateAccesstoken(user),
    });
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req: Request) {
    // console.log(req.user);

    return this.authService.refreshToken(req.user as ValidateUserDetails);
  }
}
