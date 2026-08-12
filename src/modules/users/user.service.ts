import { Injectable } from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getAllUsers(getUserDto: GetUserDto): Promise<User[]> {
    const { name } = getUserDto;
    return await this.userRepository.find({
      where: { name },
    });
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash: passwordHash,
    });
    return await this.userRepository.save(user);
  }
}
