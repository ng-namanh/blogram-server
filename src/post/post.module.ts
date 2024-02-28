import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/typeorm/entities/Post';
import { User } from 'src/database/typeorm/entities/User';
import { Reaction } from 'src/database/typeorm/entities/Reaction';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Reaction]),
    UploadModule,
    CloudinaryModule,
  ],
  providers: [
    {
      provide: Services.POST,
      useClass: PostService,
    },
    {
      provide: Services.UPLOAD,
      useClass: UploadService,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
