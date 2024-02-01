import { Post } from 'src/database/typeorm/entities/Post';
// import { CreatePostDto } from './dto/post.dto';
import { CreatePostParams } from 'src/utils/types';

export interface IPostService {
  createPost(params: CreatePostParams): Promise<Post>;
}
