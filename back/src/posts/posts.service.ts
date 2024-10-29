import { Injectable, NotFoundException } from '@nestjs/common';

export interface Post {
  id: string;
  title: string;
  content: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  // สร้างโพสต์ใหม่
  create(title: string, content: string): Post {
    const newPost: Post = {
      id: (Math.random() * 1000).toFixed(0),
      title,
      content,
    };
    this.posts.push(newPost);
    return newPost;
  }

  // ดึงโพสต์ทั้งหมด
  findAll(): Post[] {
    return this.posts;
  }

  // ดึงโพสต์ตาม ID
  findOne(id: string): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  // ลบโพสต์
  remove(id: string): void {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Post not found');
    this.posts.splice(index, 1);
  }
}