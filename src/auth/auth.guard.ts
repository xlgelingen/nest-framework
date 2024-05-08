import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('守卫/IS_PUBLIC_KEY前', IS_PUBLIC_KEY);
    //获取指定元数据键（IS_PUBLIC_KEY）在给定上下文所属的类或处理器的方法中的值，并赋值给isPublic
    //有@Public的方法或控制器类，就能给isPublic赋值true，没有的isPublic就是undefind
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('守卫/IS_PUBLIC_KEY后', IS_PUBLIC_KEY);
    console.log('守卫/isPublic后', isPublic);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // console.log('守卫/token', token);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here,so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;

    //request.headers.authorization?.split(' ')表示如果 request.headers.authorization 存在且不为 null 或 undefined，则继续执行 split(' ') 方法；如果 request.headers.authorization 为 null 或 undefined，则整个表达式的结果将是 undefined。
    //??是空值合并操作符，用于在变量为 null 或 undefined 时提供默认值。
    //?? []表示如果 request.headers.authorization?.split(' ') 的结果为 null 或 undefined，则使用空数组 [] 作为默认值。
  }
}
