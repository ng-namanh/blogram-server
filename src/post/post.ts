import { Post } from 'src/database/typeorm/entities/Post';
import { CreatePostParams } from 'src/utils/types';

export interface IPostService {
  createPost(params: CreatePostParams): Promise<Post>;
  getPosts(): Promise<Post[]>;
  likePost(postId: number, userId: number): Promise<Post>;
}
