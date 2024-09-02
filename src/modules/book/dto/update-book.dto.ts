import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto {
    @ApiPropertyOptional({ example: 'book x1', description: 'book name' })
    name: string;

    @ApiPropertyOptional({
        example: 'author x1',
        description: 'author name',
    })
    author: string;

    @ApiPropertyOptional({
        example: `${new Date()}`,
        description: 'author name',
    })
    releaseDate: Date;

    @ApiPropertyOptional({
        example: 'comedy',
        description: 'author name',
    })
    genre: string;
}
