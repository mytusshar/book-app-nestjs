import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOkResponse, ApiOperation, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { TransformInterceptor } from '../../core/transform.interceptor';
import { PrintLog } from '../../config/logger.config';

const servicetTag = 'Book';
const servicetUrl = 'book';

@Controller({
    path: servicetUrl,
    version: '1',
})
@ApiTags(servicetTag)
@UseInterceptors(TransformInterceptor)
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    @ApiOperation({ summary: `Add new ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} created successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async create(@Body() createBookDto: CreateBookDto) {
        const book = await this.bookService.create(createBookDto);
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
        const books = await this.bookService.findAll();
        return { message: `${servicetTag} fetched successfully`, data: books };
    }

    @Get('groupby-genre')
    @ApiOperation({ summary: `Get All ${servicetTag} groupBy genre` })
    @ApiOkResponse({
        description: `${servicetTag} fetched successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async findAllGroupByGenre() {
        const books = await this.bookService.findAllGroupByGenre();
        return { message: `${servicetTag} fetched successfully`, data: books };
    }

    @Get('groupby-genre-releasedate')
    @ApiOperation({ summary: `Get All ${servicetTag} groupBy genre and releaseDate` })
    @ApiOkResponse({
        description: `${servicetTag} fetched successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async findAllGroupByGenreAndReleaseDate() {
        const books = await this.bookService.findAllGroupByGenreAndReleaseDate();
        return { message: `${servicetTag} fetched successfully`, data: books };
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
        const book = await this.bookService.findOne(id);
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
    async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        const book = await this.bookService.update(id, updateBookDto);
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
        const book = await this.bookService.remove(id);
        return { message: `${servicetTag} removed successfully`, data: book };
    }
}
