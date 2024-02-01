import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/typeorm/entities/Post';
import { User } from 'src/database/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [
    {
      provide: Services.POST,
      useClass: PostService,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
