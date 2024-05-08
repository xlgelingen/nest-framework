import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async create(post: Partial<CreateUserDto>): Promise<UsersEntity> {
    const { user_name } = post;
    if (!user_name) {
      throw new HttpException('缺少用户名', 401);
    }
    const doc = await this.usersRepository.findOne({ where: { user_name } });
    if (doc) {
      throw new HttpException('用户已存在', 401);
    }
    return await this.usersRepository.save(post);
  }

  async findByName(user_name) {
    return await this.usersRepository.findOne({ where: { user_name } });
  }

  async findById(id) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const existPost = await this.usersRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    const updatePost = this.usersRepository.merge(existPost, updateUserDto);
    return this.usersRepository.save(updatePost);
  }

  async remove(id: number) {
    const existPost = await this.usersRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    return await this.usersRepository.remove(existPost);
  }
}
