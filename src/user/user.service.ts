import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class UserService {
    constructor(
        @Inject('PrismaClient')
        private prisma: PrismaClient
    ) {}

    async upvote(userId:string, contentId:string) {
        const content = await this.prisma.content.findUnique({ where: {id: contentId}});
        if (!content) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.prisma.user.update({
            where: {id: userId},
            data: {likedContent: {connect: {id: contentId}}}
        });
        await this.prisma.content.update({
            where: {id: contentId},
            data: {likes: { increment:1 }}
        });
        return "Successfully Liked"
    }

    async downvote(userId:string, contentId:string) {
        const content = await this.prisma.content.findUnique({ where: {id: contentId}});
        if (!content) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.prisma.user.update({
            where: {id: userId},
            data: {likedContent: {disconnect: {id: contentId }}}
        });
        await this.prisma.content.update({
            where: {id: contentId},
            data: {
                dislikes: { increment:1 },
            }
        });
        return "Successfully Unliked"
    }

    async follow(followerId: string, followeeId: string) {
        await this.prisma.user.update({
          where: { id: followerId },
          data: { following: { connect: { id: followeeId } } },
        });
        return this.prisma.user.update({
          where: { id: followeeId },
          data: { followers: { connect: { id: followerId } } },
        });
    }
    
    async unfollow(followerId: string, followeeId: string) {
        await this.prisma.user.update({
            where: { id: followerId },
            data: { following: { disconnect: { id: followeeId } } },
        });
        return this.prisma.user.update({
            where: { id: followeeId },
            data: { followers: { disconnect: { id: followerId } } },
        });
    };
}
