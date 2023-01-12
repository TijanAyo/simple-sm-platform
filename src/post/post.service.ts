import { Injectable, Inject, NotFoundException, InternalServerErrorException, BadRequestException, BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateContentDto, updateContentDto } from './dto';

@Injectable()
export class PostService {
    constructor(
        @Inject('PrismaClient')
        private prisma: PrismaClient
    ) {}

    async findAllContent() {
        const content = await this.prisma.content.findMany();
        return content;
    }

    async createContent(dto: CreateContentDto, userId:string) {
        const newContent = await this.prisma.content.create({
            data: {
                title: dto.title,
                body: dto.body,
                User: { connect: {id: userId }}
            }
        });
        return newContent;
    }

    async updateContent(contentId: string, userId: string, dto: updateContentDto) {
        const content = await this.prisma.content.findUnique({ where: { id: contentId }});
        if (!content) {
            throw new NotFoundException(`${contentId} does not exist... Try again`);  
        }
        if (content.userId !== userId) {
            throw new UnauthorizedException(`You are not authorized to update this content`)
        }
        return await this.prisma.content.update({
            where: { id: contentId },
            data: {
                title: dto.title,
                body: dto.body
            }
        });
    }

    async deleteContent(contentId: string, userId: string) {
        const content = await this.prisma.content.findUnique({ where: {id: contentId }});
        if(!content) {
            throw new NotFoundException(`${contentId} does not exist... Try again`)
        }
        if (content.userId !== userId) {
            throw new UnauthorizedException(`You are not authorized to delete this content`)
        }
        return await this.prisma.content.delete({
            where: {id: contentId }
        });
    }
}
