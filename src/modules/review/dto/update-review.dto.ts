import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
    @ApiPropertyOptional({
        example: 'review x1',
        description: 'review details',
    })
    review: string;

    // TODO: can use range of 1-10 number to be shown in swagger with validation
    @ApiPropertyOptional({
        example: 5,
        description: 'rating',
    })
    rating: number;
}
