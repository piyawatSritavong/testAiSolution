import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService, User } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body('username') username: string): User {
    return this.userService.create(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | { message: string } {
    const user = this.userService.findOne(id);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }
}