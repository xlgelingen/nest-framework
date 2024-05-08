import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '60d' },
    // }),
    ConfigModule.forRoot(), // 配置 ConfigModule
    JwtModule.registerAsync({
      imports: [ConfigModule], // 导入 ConfigModule
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'), // 通过 configService 获取 JWT_SECRET
        signOptions: { expiresIn: '60d' },
      }),
      inject: [ConfigService], // 注入 ConfigService
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
