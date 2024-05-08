import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 指定实体映射到数据库中的表名为 'users'
@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  //标题列，最大长度为50个字符
  @Column()
  user_name: string;

  @Column()
  password: string;

  //创建时间列，默认值为当前时间戳
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
