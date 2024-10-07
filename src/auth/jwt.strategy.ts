// src/auth/jwt.strategy.ts
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Asegúrate de tener un servicio para los usuarios
import { User } from 'src/common/schemas/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "nigga",
    });
  }

  async validate(payload: any): Promise<User> {
    return this.usersService.findOneByEmail(payload.email); // Método para encontrar al usuario por email
  }
}
