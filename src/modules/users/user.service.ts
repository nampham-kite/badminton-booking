import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { paginate } from 'src/common/pagination';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async getAllUsers(getUserDto: GetUserDto): Promise<ListResponseDto<User>> {
    const { name, ...rest } = getUserDto;
    const where = name ? { name } : {};

    return await paginate<User>(this.userRepository, rest, where, {});
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        passwordHash: passwordHash,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }
  async login(loginDto: {
    email: string;
    password: string;
  }): Promise<{ token: string; refreshToken: string } | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginDto.email },
      });
      if (!user) {
        throw new UnauthorizedException(); // User not found
      }
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.passwordHash,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException(); // Invalid password
      }
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      const refreshToken = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { expiresIn: '7d' }, // Refresh token expires in 7 days
      );
      return { token, refreshToken };
    } catch (error) {
      console.error('Error during login:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return user || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Error finding user by ID');
    }
  }
}
