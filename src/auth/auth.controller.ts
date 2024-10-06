import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  // Registro de usuarios
  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string) {
    return this.usersService.register(email, password);
  }

  // Login de usuarios
  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return {
      access_token: await this.usersService.validateUser(email, password),
    };
  }
}
