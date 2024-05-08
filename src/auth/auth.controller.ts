import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK) //设置了 HTTP 响应状态码为 200，没这个的话，会是201
  @Post('login')
  //Record<string, any> 是 TypeScript 中的一种类型声明，用于表示一个键值对的对象，其中键的类型是 string，值的类型是 any。
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.user_name, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
