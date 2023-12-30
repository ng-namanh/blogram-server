import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  // UseGuards,
} from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dto/CreateUser.dto';
import { IUserService } from 'src/users/user';
import { Response } from 'express';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }

  @Post('login')
  login(@Res() res: Response) {
    return res.sendStatus(HttpStatus.OK);
  }
}
