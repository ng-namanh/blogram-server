import { Reaction } from './Reaction';
import { User } from './User';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ default: 0 })
  likes: number;

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];

  @Column()
  coverImageUrl: string | null;
}
