import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from './guards';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}
    
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req:Request) {
        return req.user;
    }

    @Post('upvote/:contentId')
    like() {
        return this.userService.upvote();
    }

    @Post('downvote/:contentId')
    dislike() {
        return this.userService.downvote();
    }

    @Post('follow/:userId')
    follow() {
        return this.userService.follow();
    }

    @Post('unfollow/:userId')
    unfollow() {
        return this.userService.unfollow();
    }
}
