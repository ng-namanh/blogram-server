import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Services, Routes } from 'src/utils/constants';
import { IPostService } from './post';
import { CreatePostDto } from './dto/post.dto';
import { ReturnMessage } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/utils/guard.auth';
import { Request } from 'express';
import { User } from 'src/database/typeorm/entities/User';

@Controller(Routes.POST)
export class PostController {
  constructor(@Inject(Services.POST) private postService: IPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  createPost(
    @Body() postDto: CreatePostDto,
    @Req() req: Request & { user: User },
  ) {
    const params = {
      title: postDto.title,
      content: postDto.content,
      authorId: req.user.id,
    };

    this.postService.createPost(params);

    return {
      post: {
        title: postDto.title,
        content: postDto.content,
      },
      author: req.user,
      success: true,
      message: 'Post successfully published',
    } as ReturnMessage;
  }

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get('/:postId')
  async getPostById(@Req() req: Request) {
    const { postId } = req.params;
    const post = await this.postService.getPostById(parseInt(postId));
    return {
      success: true,
      post,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:postId/like')
  async likePost(@Req() req: Request & { user: User }) {
    const { postId } = req.params;
    const userId = req.user.id;

    return await this.postService.likePost(parseInt(postId), userId);
  }
}
