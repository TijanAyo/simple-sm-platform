import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class updateContentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body: string;
}