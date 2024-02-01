import { Injectable, NotFoundException } from '@nestjs/common';
import { IPostService } from './post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/typeorm/entities/Post';
import { CreatePostParams } from 'src/utils/types';
import { User } from 'src/database/typeorm/entities/User';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createPost(params: CreatePostParams) {
    const { title, content, authorId } = params;
    console.log(title, content, authorId);

    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const newPost = this.postRepository.create({
      title,
      content,
      author,
    });

    return await this.postRepository.save(newPost);
  }

  async getPosts() {
    return await this.postRepository.find({
      relations: ['author'],
    });
  }
}
