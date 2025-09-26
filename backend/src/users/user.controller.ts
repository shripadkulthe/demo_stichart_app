import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('register')
  async register(
    @Body('shop_name') shop_name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.usersService.create(shop_name, email, password);
      return { message: 'User registered successfully', user };
    } catch (err) {
      return { message: err.message };
    }
  }
}
