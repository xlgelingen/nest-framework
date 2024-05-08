import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface PostsRo {
  list: PostsEntity[];
  count: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  // 创建文章
  //Partial<T> 是一个泛型类型，它将类型 T 的所有属性转换为可选属性，使得这些属性可以不必全部提供值，而是可以选择性地提供部分值或不提供值。
  async create(post: Partial<CreatePostDto>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }

  // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    //创建查询构建器：
    const qb = await this.postsRepository.createQueryBuilder('post');
    //通过 qb.where('1 = 1') 添加了一个始终为真的查询条件，实际上这是一个占位符，通常用于动态构建更复杂的查询条件。
    qb.where('1 = 1');
    //对查询结果进行降序排序，按照文章的 create_time 字段排序。
    qb.orderBy('post.create_time', 'DESC');
    //使用 qb.getCount() 方法计算符合条件的文章总数。
    const count = await qb.getCount();
    //从传入的 query 参数中获取 pageNum 和 pageSize，然后使用 qb.limit(pageSize) 和 qb.offset(pageSize * (pageNum - 1)) 进行分页设置，限制查询返回的结果数量和偏移量。
    const { pageNum = 1, pageSize = 5 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    //最后使用 qb.getMany() 执行查询并获取符合条件的文章列表。
    const posts = await qb.getMany();
    //将查询到的文章列表 posts 和总数 count 作为对象返回，这个对象的类型是 PostsRo，定义了列表和总数的结构。
    return { list: posts, count: count };
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOne({ where: { id } });
  }

  // 更新文章
  async updateById(id, post: Partial<UpdatePostDto>): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postsRepository.remove(existPost);
  }
}
