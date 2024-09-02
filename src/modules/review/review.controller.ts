import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { TransformInterceptor } from '../../core/transform.interceptor';
import { PrintLog } from '../../config/logger.config';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

const servicetTag = 'Review';
const servicetUrl = 'review';

@Controller({
    path: servicetUrl,
    version: '1',
})
@ApiTags(servicetTag)
@UseInterceptors(TransformInterceptor)
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post()
    @ApiOperation({ summary: `Add new ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} created successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async create(@Body() createReviewDto: CreateReviewDto) {
        const book = await this.reviewService.create(createReviewDto);
        return { message: `${servicetTag} created successfully`, data: book };
    }

    @Get()
    @ApiOperation({ summary: `Get All ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} fetched successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async findAll() {
        const books = await this.reviewService.findAll();
        return { message: `${servicetTag} fetched successfully`, data: books };
    }

    @Get('sum/groupby-author')
    @ApiOperation({ summary: `Get ${servicetTag} sum by author` })
    @ApiOkResponse({
        description: `${servicetTag} sum fetched successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async findReviewSumByAuthor() {
        const books = await this.reviewService.findReviewSumByAuthor();
        return { message: `${servicetTag} sum fetched successfully`, data: books };
    }

    @Get(':id')
    @ApiOperation({ summary: `Get ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} fetched successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async findOne(@Param('id') id: string) {
        const book = await this.reviewService.findOne(+id);
        return { message: `${servicetTag} fetched successfully`, data: book };
    }

    @Put(':id')
    @ApiOperation({ summary: `Update ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} updated successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        const book = await this.reviewService.update(+id, updateReviewDto);
        return { message: `${servicetTag} updated successfully`, data: book };
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} deleted successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async remove(@Param('id') id: string) {
        const book = await this.reviewService.remove(+id);
        return { message: `${servicetTag} removed successfully`, data: book };
    }
}
