import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { GetUserDto } from './dtos/get-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { isPublic } from 'src/decorators/is-public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
  @Get()
  async getAllUsers(@Query() getUserDto: GetUserDto) {
    console.log('Start controller getAllUsers');
    return await this.userService.getAllUsers(getUserDto);
  }

  @Post()
  @ApiBearerAuth()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  @isPublic()
  async login(@Body() loginDto: LoginDto) {
    // Implementation for login logic
    return await this.userService.login(loginDto);
  }
}
