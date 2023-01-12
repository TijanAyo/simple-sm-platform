import { IsNotEmpty, IsString } from 'class-validator';

export class updateContentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    body: string;
}