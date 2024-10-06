import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'my-secret-key',  // Usa una clave más fuerte en producción
      signOptions: { expiresIn: '60m' },  // Token expira en 60 minutos
    }),
    UsersModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
