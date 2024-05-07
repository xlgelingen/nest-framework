import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 指定实体映射到数据库中的表名为 'posts'
@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  //标题列，最大长度为50个字符
  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;

  //内容列，数据类型为文本
  @Column('text')
  content: string;

  //创建时间列，默认值为当前时间戳
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
