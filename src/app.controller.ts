import { Controller, Get, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PrintLog } from './config/logger.config';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        return this.appService.getHello();
    }

    @Post('seed-data')
    @ApiOperation({ summary: `Create test data of books and reviews` })
    @ApiOkResponse({
        description: `Data created successfully`,
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing',
    })
    @PrintLog
    async seedData() {
        await this.appService.seedData();
        return { message: `Data created successfully` };
    }
}
