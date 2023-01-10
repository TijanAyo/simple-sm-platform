import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('PrismaClient')
        private prisma: PrismaClient
    ) {}

    async signup(dto: AuthDto) {
        const foundUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (foundUser) {
            throw new BadRequestException("Email already exists");
        }
        const hashedPassword = await this.hashPassword(dto.password);
        await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword
            }
        });
        return { message: `Signup was successful`}
    }

    async signin(dto: AuthDto) {
        const foundUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if(!foundUser) {
            throw new NotFoundException("User does not exist");
        }
        const isMatch = await this.comparePassword(dto.password, foundUser.password);
        if (!isMatch) {
            throw new BadRequestException("Password does not match");
        }
        return `You are going to sign in.`
    }


    async hashPassword(password:string): Promise<string>{
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePassword(password:string, hash:string ): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
