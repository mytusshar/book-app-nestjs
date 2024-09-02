import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
    @ApiProperty({
        example: 'review 1',
        description: 'review details',
    })
    @IsNotEmpty()
    review: string;

    // TODO: can use range of 1-10 number to be shown in swagger with validation
    @ApiProperty({
        example: 5,
        description: 'rating',
    })
    @IsNotEmpty()
    rating: number;

    @ApiProperty({
        example: '636337638b4701511ea01c0a',
        description: 'book id',
    })
    @IsNotEmpty()
    book_id: string;
}
