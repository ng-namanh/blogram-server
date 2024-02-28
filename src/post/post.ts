import { Post } from 'src/database/typeorm/entities/Post';
import { CreatePostParam } from 'src/utils/types';

export interface IPostService {
  createPost(params: CreatePostParam): Promise<Post>;
  getPosts(): Promise<Post[]>;
  likePost(postId: number, userId: number): Promise<Post>;
  getPostById(postId: number): Promise<Post>;
}
