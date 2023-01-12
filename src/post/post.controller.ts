import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtGuard } from 'src/user/guards';
import { CreateContentDto, updateContentDto } from './dto';
import { PostService } from './post.service';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all content'})
    getAllContent() {
        return this.postService.findAllContent();
    }

    @Post('new')
    @ApiOperation({ summary: 'Create content'})
    createContent(
        @Body() dto: CreateContentDto,
        @Req() req,
    ) {
        const userId = req.user.id
        const newContent = this.postService.createContent(dto, userId);
        return newContent;
    }


    @Patch('update/:contentId')
    @ApiOperation({ summary: 'Update content'})
    async updateContent(
        @Param('contentId') contentId:string,
        @Body() dto: updateContentDto,
        @Req() req:any
        ) {
        const userId = req.user.id  
        await this.postService.updateContent(contentId, userId, dto);
        return { message: `Updated...`}
    }

    @Delete('remove/:contentId')
    @ApiOperation({ summary: 'Delete a content'})
    async deleteContent(
        @Param('contentId') contentId:string,
        @Req() req:any
    ) {
        const userId = req.user.id 
        await this.postService.deleteContent(contentId, userId);
        return { message: `${contentId} has been deleted successfully`}
    }
}
