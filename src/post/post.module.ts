import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/typeorm/entities/Post';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    {
      provide: Services.POST,
      useClass: PostService,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
