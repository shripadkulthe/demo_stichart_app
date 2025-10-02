import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(shop_name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new this.userModel({ shop_name, email, password });
    return user.save();
  }
  async login(email: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ email, password }).exec();
  }
}
