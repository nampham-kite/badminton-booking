import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { GetUserDto } from './dtos/get-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { isPublic } from 'src/decorators/is-public.decorator';
import { RegisterDto } from './dtos/register.dto';

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

  @Post('register')
  @isPublic()
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.register(registerDto);
  }

  @Post('login')
  @isPublic()
  async login(@Body() loginDto: LoginDto) {
    // Implementation for login logic
    return await this.userService.login(loginDto);
  }
}
