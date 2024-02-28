import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPostService } from './post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/typeorm/entities/Post';
import { User } from 'src/database/typeorm/entities/User';
import { Reaction } from 'src/database/typeorm/entities/Reaction';
import { Services } from 'src/utils/constants';
import { UploadService } from 'src/upload/upload.service';
import { CreatePostParam } from 'src/utils/types';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(Services.UPLOAD) private readonly uploadService: UploadService,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
  ) {}

  async createPost(params: CreatePostParam) {
    const { title, content, authorId, coverImageUrl } = params;
    console.log(coverImageUrl);

    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    // const newPost = this.postRepository.create({
    //   title,
    //   content,
    //   author,
    //   coverImageUrl,
    // });
    // console.log(newPost);

    return await this.postRepository.save({
      title,
      content,
      author,
      coverImageUrl,
    });
  }

  async getPosts() {
    return await this.postRepository.find({
      relations: ['author'],
    });
  }

  async getPostById(postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async likePost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingReaction = await this.reactionRepository.findOne({
      where: { postId, userId },
    });

    if (existingReaction) {
      await this.reactionRepository.remove(existingReaction);
      post.likes -= 1;
    } else {
      const reaction = this.reactionRepository.create({
        userId,
        postId,
      });
      await this.reactionRepository.save(reaction);
      post.likes += 1;
    }

    return await this.postRepository.save(post);
  }
}
