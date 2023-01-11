import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtSecret } from '../../utils/constants'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private prisma: PrismaService
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtSecret.secret,
      });
    }
  
    async validate(payload: {sub: string; email:string}) {
        const user = await this.prisma.user.findUnique({
            where: {
              email: payload.email,
            },
            include: { followers: true, following: true, posts: true}
        });
        delete user.password;
        return user;
    }
  }