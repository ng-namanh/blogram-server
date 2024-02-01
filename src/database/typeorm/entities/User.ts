import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
