import { Controller, Inject } from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IAuthInterface } from './auth';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthInterface) {}
}
