import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateContentDto } from './dto';

@Injectable()
export class PostService {
    constructor(
        @Inject('PrismaClient')
        private prisma: PrismaClient
    ) {}

    async findAllContent(): Promise<Object> {
        const content = await this.prisma.content.findMany();
        return content;
    }

    async createContent(dto: CreateContentDto, userId:string): Promise<any> {
        const newContent = await this.prisma.content.create({
            data: {
                title: dto.title,
                body: dto.body,
                User: { connect: {id: userId }}
            }
        });
        return newContent;
    }

    async updateContent(contentId: string, dto: CreateContentDto) {
        const updatedContent = await this.prisma.content.update({
            where: { id: contentId },
            data: { ...dto }
        });
        return updatedContent
    }

    async deleteContent(contentId: string) {
        const deletedContent = await this.prisma.content.delete({
            where: {id: contentId }
        });
        return deletedContent;
    }

}
