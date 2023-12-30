import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User';
import { UsersController } from './users.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: Services.USER,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: Services.USER,
      useClass: UsersService,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
