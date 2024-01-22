import { Post } from 'src/database/typeorm/entities/Post';
import { CreatePostDto } from './dto/post.dto';

export interface IPostService {
  createPost(postDto: CreatePostDto): Promise<Post>;
}
