import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('signup')
    @ApiOperation({ summary: 'Sign Up a User' })
    signup(@Body() dto:AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    @ApiOperation({ summary: 'Sign In a User' })
    signin(@Body() dto:AuthDto) {
        return this.authService.signin(dto);
    }
}
