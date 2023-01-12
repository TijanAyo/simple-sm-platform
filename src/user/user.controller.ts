import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from './guards';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}
    
    @Get('me')
    getMe(@Req() req:Request) {
        return req.user;
    }

    @Post('upvote/:contentId')
    async like(@Req() req:any, @Param('contentId') contentId: string) {
        const userId = req.user.id;
        await this.userService.upvote(userId, contentId)
        return { message: 'Liked'}
    }

    @Post('downvote/:contentId')
    async dislike(@Req() req:any, @Param('contentId') contentId: string) {
        const userId = req.user.id;
        await this.userService.downvote(userId, contentId);
        return { message: 'Unliked'}
    }

    @Post('follow/:userId')
    async follow(@Req() req: any, @Param('userId') followeeId: string) {
        const followerId = req.user.id;
        await this.userService.follow(followerId, followeeId);
        return { message: 'Successfully followed user' };
    }

    @Post('unfollow/:userId')
    async unfollow(@Req() req: any, @Param('id') followeeId: string) {
        const followerId = req.user.id;
        await this.userService.unfollow(followerId, followeeId);
        return { message: 'Successfully unfollowed user' };
    }
}
