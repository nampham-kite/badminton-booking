import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { GetUserDto } from './dtos/get-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query() getUserDto: GetUserDto) {
    return await this.userService.getAllUsers(getUserDto);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
