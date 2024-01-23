import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Services, Routes } from 'src/utils/constants';
import { IPostService } from './post';
import { CreatePostDto } from './dto/post.dto';
import { ReturnMessage } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/utils/guard.auth';

@Controller(Routes.POST)
export class PostController {
  constructor(@Inject(Services.POST) private postService: IPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  createPost(@Body() postDto: CreatePostDto, @Request() req) {
    this.postService.createPost(postDto);
    console.log(req);

    return {
      user: req.user,
      success: true,
      message: 'Post successfully published',
    } as ReturnMessage;
  }
}
