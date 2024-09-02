import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'book 1', description: 'book name' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'author 1',
        description: 'author name',
    })
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        example: `${new Date()}`,
        description: 'author name',
    })
    @IsNotEmpty()
    releaseDate: Date;

    @ApiProperty({
        example: 'comedy',
        description: 'author name',
    })
    @IsNotEmpty()
    genre: string;
}
