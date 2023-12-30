import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import { Services } from 'src/utils/constants';
import { IAuthService } from '../auth';
import { JwtPayload } from 'src/utils/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(localStrategy) {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.authService.validateUser({ email, password });
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(jwtStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
