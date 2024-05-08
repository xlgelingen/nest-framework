import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService(); // 创建 ConfigService 实例

// 基础配置
const baseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST, // 主机，默认为localhost
  port: configService.get<number>('DB_PORT', 3306), // 端口号
  username: configService.get('DB_USERNAME', 'root'), // 用户名
  password: configService.get('DB_PASSWORD', 'root'), // 密码
  database: configService.get('DB_DATABASE', 'nestjs'), //数据库名
};

// 该对象用于 nestjs typeorm 初始化
export const ormConfig: DataSourceOptions = {
  ...baseConfig,
  entities: [],
};

// 该对象 typeorm cli 迁移时使用
const ormConfigForCli: DataSourceOptions = {
  ...baseConfig,
  entities: ['src/**/entities/*.entity{.js,.ts}'],
  migrations: ['migrations/*{.js,.ts}'], // migration:run时查找的文件夹
  subscribers: ['subscribers/*{.js,.ts}'],
  logger: 'file',
  logging: true,
};

// 实例化dataSource，用以之后cli使用
const dataSource = new DataSource(ormConfigForCli);

// 此处的dataSource需要 export default才可以使用
export default dataSource;
