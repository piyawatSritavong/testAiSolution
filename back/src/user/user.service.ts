import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  username: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];

  create(username: string): User {
    const user: User = { id: (Math.random() * 1000).toString(), username };
    this.users.push(user);
    return user;
  }

  findOne(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }
}