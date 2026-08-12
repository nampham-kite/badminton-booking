import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('AuthGuard: Checking authentication...');
    // Check if the route is marked as publics
    const isPublic = this.reflector.getAllAndOverride<boolean>('IS_PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);
    // If the route is public, allow access without authentication
    if (isPublic) {
      console.log('AuthGuard: Route is public, skipping authentication.');
      return true;
    }

    // Get the request object from the execution context
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    // If the authorization header is missing, throw an UnauthorizedException
    if (header === undefined || header === null) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    // Extract the token from the authorization header
    const token = header && header.split(' ')[1];
    //decode the token and verify its validity
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const { sub } = decoded;
    const checkUser = this.userService.findUserById(sub);

    if (!checkUser) {
      throw new UnauthorizedException('User not found');
    }

    return true;
  }
}
