import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('IS_PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'] as string | undefined;
    if (!header) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = header.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let decoded: { sub?: number };
    try {
      decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'badminton-booking-dev-secret',
      });
    } catch (error) {
      const name = error instanceof Error ? error.name : '';
      if (name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token đã hết hạn');
      }
      throw new UnauthorizedException('Token không hợp lệ');
    }

    const userId = decoded.sub;
    if (!userId) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;
    return true;
  }
}
