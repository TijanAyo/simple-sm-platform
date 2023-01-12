import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/user/guards';
import { CreateContentDto, updateContentDto } from './dto';
import { PostService } from './post.service';
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){}

    @Get()
    getAllContent() {
        return this.postService.findAllContent();
    }

    @Post('new')
    createContent(
        @Body() dto: CreateContentDto,
        @Req() req,
    ) {
        const userId = req.user.id
        const newContent = this.postService.createContent(dto, userId);
        return newContent;
    }


    @Patch('update/:contentId')
    async updateContent(
        @Param('contentId') contentId:string,
        @Body() dto: updateContentDto,
        ) {
        await this.postService.updateContent(contentId, dto);
        return { message: `Updated...`}
    }

    @Delete('remove/:contentId')
    async deleteContent(
        @Param('contentId') contentId:string
    ) {
        await this.postService.deleteContent(contentId);
        return { message: `${contentId} has been deleted successfully`}
    }
}
