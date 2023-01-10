import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateContentDto } from './dto';
import { PostService } from './post.service';

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
        @Body() body: CreateContentDto,
        @Req() req,
    ) {
        const userId = req.user.id
        const newContent = this.postService.createContent(body, userId);
        return newContent;
    }


    @Patch(':id')
    updateContent(
        @Param('id') id:string,
        @Body() body: CreateContentDto,
        ) {
        return this.postService.updateContent(id, body);
    }

    @Delete('remove/:id')
    deleteContent(
        @Param('id') id:string
    ) {
        return this.postService.deleteContent(id);
    }
}
