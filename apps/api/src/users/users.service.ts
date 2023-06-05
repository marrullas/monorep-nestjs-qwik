import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UsersModule: Model<UserDocument>) {}


  async create(createUserDto: CreateUserDto) {
    const userCreated = await this.UsersModule.create(createUserDto);
    return userCreated;
  }

  findAll() {
    return this.UsersModule.find({});
  }

  findOne(id: number) {
    return this.UsersModule.findById(id);
  }

  async findByField(field: string, value: string) {
    const query = { [field]: value }; // Utiliza corchetes para crear una consulta dinámica
    const user = await this.UsersModule.findOne(query);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
