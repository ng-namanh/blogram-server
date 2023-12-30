import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/constants';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [
    // LocalStrategy,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
