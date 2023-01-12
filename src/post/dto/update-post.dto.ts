import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class updateContentDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    body: string;
}