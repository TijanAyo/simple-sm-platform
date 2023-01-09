import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaModule } from '../prisma/prisma.module' 
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [
    {
      provide: 'PrismaClient',
      useFactory: () => {
        return new PrismaClient();
      },
    },
    PostService
  ]
})
export class PostModule {}
