import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigService, ConfigModule } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { TodoModule } from './todo/todo.module';
import { ormConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql', // 数据库类型
    //     entities: [], // 数据表实体
    //     host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
    //     port: configService.get<number>('DB_PORT', 3306), // 端口号
    //     username: configService.get('DB_USERNAME', 'root'), // 用户名
    //     password: configService.get('DB_PASSWORD', 'root'), // 密码
    //     database: configService.get('DB_DATABASE', 'nestjs'), //数据库名
    //     timezone: '+08:00', //服务器上配置的时区
    //     synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭,否则会丢失生产数据。
    //     autoLoadEntities: true, //通过 forFeature() 方法注册的每个实体都将自动添加到配置对象的 entities 数组中。
    //   }),
    // }),
    TypeOrmModule.forRoot({
      ...ormConfig,
      synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭,否则会丢失生产数据。
      autoLoadEntities: true, //通过 forFeature() 方法注册的每个实体都将自动添加到配置对象的 entities 数组中。
    }),
    PostsModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
