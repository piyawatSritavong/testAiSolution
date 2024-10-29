import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // สร้างโพสต์ใหม่
  @Post()
  create(@Body('title') title: string, @Body('content') content: string): PostEntity {
    return this.postsService.create(title, content);
  }

  // ดึงโพสต์ทั้งหมด
  @Get()
  findAll(): PostEntity[] {
    return this.postsService.findAll();
  }

  // ดึงโพสต์ตาม ID
  @Get(':id')
  findOne(@Param('id') id: string): PostEntity {
    return this.postsService.findOne(id);
  }

  // ลบโพสต์ตาม ID
  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.postsService.remove(id);
    return { message: 'Post deleted successfully' };
  }
}