import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'PrismaClient',
      useFactory: () => {
        return new PrismaClient();
      },
    },
    AuthService
  ]
})
export class AuthModule {}
