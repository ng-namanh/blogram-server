import { Injectable } from '@nestjs/common';
import { IPostService } from './post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/typeorm/entities/Post';
import { PostDetails } from 'src/utils/types';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(post: PostDetails) {
    console.log(post.title);
    return await this.postRepository.save(post);
  }
}
