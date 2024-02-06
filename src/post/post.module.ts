import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/typeorm/entities/Post';
import { User } from 'src/database/typeorm/entities/User';
import { Reaction } from 'src/database/typeorm/entities/Reaction';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Reaction])],
  providers: [
    {
      provide: Services.POST,
      useClass: PostService,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
