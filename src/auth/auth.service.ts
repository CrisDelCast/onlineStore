// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User,UserDocument } from 'src/common/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
    const newUser = new this.userModel({ username, email, password: hashedPassword });
    return newUser.save();
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, role: user.role };
      return { access_token: this.jwtService.sign(payload) }; // Generar token JWT
    }
    throw new Error('Invalid credentials');
  }
}
