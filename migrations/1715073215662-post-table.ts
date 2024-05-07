import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostsEntity } from '../src/posts/entities/post.entity';

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
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(PostsEntity, {});
  }
}
