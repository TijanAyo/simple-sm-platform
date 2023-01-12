import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from './guards';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}
    
    @Get('me')
    @ApiOperation({ summary: 'Get user information'})
    getMe(@Req() req:Request) {
        return req.user;
    }

    @Post('upvote/:contentId')
    @ApiOperation({ summary: 'Like / upvote users content'})
    async like(@Req() req:any, @Param('contentId') contentId: string) {
        const userId = req.user.id;
        await this.userService.upvote(userId, contentId)
        return { message: 'Liked'}
    }

    @Post('downvote/:contentId')
    @ApiOperation({ summary: 'Unlike / downvote users content'})
    async dislike(@Req() req:any, @Param('contentId') contentId: string) {
        const userId = req.user.id;
        await this.userService.downvote(userId, contentId);
        return { message: 'Dislike'}
    }

    @Post('follow/:userId')
    @ApiOperation({ summary: 'Follow user'})
    async follow(@Req() req: any, @Param('userId') followeeId: string) {
        const followerId = req.user.id;
        await this.userService.follow(followerId, followeeId);
        return { message: 'Successfully followed user' };
    }

    @Post('unfollow/:userId')
    @ApiOperation({ summary: 'Unfollow user'})
    async unfollow(@Req() req: any, @Param('id') followeeId: string) {
        const followerId = req.user.id;
        await this.userService.unfollow(followerId, followeeId);
        return { message: 'Successfully unfollowed user' };
    }
}
