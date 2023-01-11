import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { jwtSecret } from '../utils/constants';
import { JwtStrategy } from './strategy';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: jwtSecret.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'PrismaClient',
      useFactory: () => {
        return new PrismaClient();
      },
    },
    AuthService, 
    JwtStrategy
  ]
})
export class AuthModule {}
