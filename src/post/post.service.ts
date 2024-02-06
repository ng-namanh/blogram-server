import { Injectable, NotFoundException } from '@nestjs/common';
import { IPostService } from './post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/typeorm/entities/Post';
import { CreatePostParams } from 'src/utils/types';
import { User } from 'src/database/typeorm/entities/User';
import { Reaction } from 'src/database/typeorm/entities/Reaction';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
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

  async likePost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    // check if user has already liked the post
    const isUserLiked = await this.reactionRepository.findOne({
      where: { user },
    });

    if (isUserLiked) {
      post.likes -= 1;
      await this.reactionRepository.delete({ user, post });
    } else {
      post.likes += 1;
      await this.reactionRepository.save(
        this.reactionRepository.create({ user, post }),
      );
    }

    return await this.postRepository.save(post);
  }
}
