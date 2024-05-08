import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user_name: string, password: string) {
    if (!user_name || !password) {
      throw new HttpException(`缺少用户名或密码`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.findByName(user_name);
    if (user?.password !== password) {
      throw new HttpException(`用户名或密码错误`, HttpStatus.FORBIDDEN);
    }
    const payload = { user_name: user.user_name, sub: user.id };
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
