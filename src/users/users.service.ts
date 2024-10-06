import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<any>,
    private jwtService: JwtService,
  ) {}

  // Registro de usuarios
  async register(email: string, password: string): Promise<any> {
    const newUser = new this.userModel({ email, password });
    return await newUser.save();
  }

  // Validar al usuario y generar token JWT
  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  // Obtener un usuario por su ID
  async findById(userId: string): Promise<any> {
    return await this.userModel.findById(userId);
  }
}
