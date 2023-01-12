import { Injectable, Inject, NotFoundException, InternalServerErrorException, BadRequestException, BadGatewayException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateContentDto, updateContentDto } from './dto';

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

    async updateContent(contentId: string, dto: updateContentDto) {
        try {
            const content = await this.prisma.content.findUnique({ where: { id: contentId }});
            if (!content) {
                throw new BadGatewayException(`${contentId} does not exist... Try again`);  
            }
            return await this.prisma.content.update({
                where: { id: contentId },
                data: {
                    title: dto.title,
                    body: dto.body
                }
            });
        }
        catch(err:any) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteContent(contentId: string) {
        try {
            const content = await this.prisma.content.findUnique({ where: {id: contentId }});
            if(!content) {
                throw new BadRequestException(`${contentId} does not exist... Try again`)
            }
            return await this.prisma.content.delete({
                where: {id: contentId }
            });
        }
        catch(err) {
            throw new InternalServerErrorException(err.message)
        }
    }
}
