import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';
import { ReactionModule } from './reaction/reaction.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    PostModule,
    ReactionModule,
    CloudinaryModule,
    UploadModule,
  ],
  controllers: [],
  providers: [UploadService],
})
export class AppModule {}
