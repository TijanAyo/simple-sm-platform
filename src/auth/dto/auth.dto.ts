import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: `Password has to be between 3 and 20 chars`})
    @ApiProperty()
    password: string;
}