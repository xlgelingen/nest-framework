import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostsEntity } from '../src/posts/entities/post.entity';
import { UsersEntity } from '../src/user/entities/user.entity';

export class PostTable1715073215662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(PostsEntity, [
      {
        title: 'First Post',
        author: 'John Doe',
        content: 'This is my first post.',
      },
      {
        title: 'Second Post',
        author: 'Jane Smith',
        content: 'Another post from me.',
      },
      {
        title: 'Third Post',
        author: 'Jane Smith',
        content: 'Another post from me.',
      },
    ]);
    await queryRunner.manager.save(UsersEntity, [
      {
        user_name: 'aaa',
        password: 'aaa123456',
      },
      {
        user_name: 'bbb',
        password: 'bbb123456',
      },
      {
        user_name: 'ccc',
        password: 'ccc123456',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(PostsEntity, {});
    await queryRunner.manager.delete(UsersEntity, {});
  }
}
