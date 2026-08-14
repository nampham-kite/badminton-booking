import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { paginate } from 'src/common/pagination';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

type PublicUser = {
  id: number;
  email: string;
  name: string;
};

type AuthTokens = {
  token: string;
  refreshToken: string;
  user: PublicUser;
};

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
  async register(registerDto: RegisterDto): Promise<AuthTokens> {
    const existed = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existed) {
      throw new ConflictException('Email đã được sử dụng');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({
        email: registerDto.email,
        passwordHash,
        name: 'user' + Math.random().toString(36).substring(2, 15),
      }),
    );

    return this.issueAuth(user);
  }

  async login(loginDto: LoginDto): Promise<AuthTokens> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    return this.issueAuth(user);
  }

  private issueAuth(user: User): AuthTokens {
    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: this.toPublicUser(user),
    };
  }

  private toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
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
