import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Services, Routes } from 'src/utils/constants';
import { IPostService } from './post';
import { CreatePostDto } from './dto/post.dto';

@Controller(Routes.POST)
export class PostController {
  constructor(@Inject(Services.POST) private postService: IPostService) {}

  @Post('/new')
  createPost(@Body() postDto: CreatePostDto) {
    return this.postService.createPost(postDto);
  }
}
