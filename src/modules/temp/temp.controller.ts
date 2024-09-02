import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { TempService } from './temp.service';
import { CreateTempDto } from './dto/create-temp.dto';
import { UpdateTempDto } from './dto/update-temp.dto';
import { ApiTags, ApiOkResponse, ApiOperation, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { TransformInterceptor } from '../../core/transform.interceptor';
import { PrintLog } from '../../config/logger.config';

const servicetTag = 'temp';

@Controller({
    path: servicetTag,
    version: '1'
})
@ApiTags(servicetTag)
@UseInterceptors(TransformInterceptor)
export class TempController {
    constructor(private readonly tempService: TempService) {}

    @Post()
    @ApiOperation({ summary: `Add new ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} created successfully`
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing'
    })
    @PrintLog
    async create(@Body() createTempDto: CreateTempDto) {
        const temp = await this.tempService.create(createTempDto);
        return { message: 'Temp created successfully', data: temp };
    }

    @Get()
    @ApiOperation({ summary: `Get All ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} fetched successfully`
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing'
    })
    @PrintLog
    async findAll() {
        const temps = await this.tempService.findAll();
        return { message: 'Temp fetched successfully', data: temps };
    }

    @Get(':id')
    @ApiOperation({ summary: `Get ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} fetched successfully`
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing'
    })
    @PrintLog
    async findOne(@Param('id') id: string) {
        const temp = await this.tempService.findOne(+id);
        return { message: 'Temp fetched successfully', data: temp };
    }

    @Put(':id')
    @ApiOperation({ summary: `Update ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} updated successfully`
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing'
    })
    @PrintLog
    async update(@Param('id') id: string, @Body() updateTempDto: UpdateTempDto) {
        const temp = await this.tempService.update(+id, updateTempDto);
        return { message: 'Temp updated successfully', data: temp };
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete ${servicetTag}` })
    @ApiOkResponse({
        description: `${servicetTag} deleted successfully`
    })
    @ApiInternalServerErrorResponse({
        description: 'Technical error while processing'
    })
    @PrintLog
    async remove(@Param('id') id: string) {
        const temp = await this.tempService.remove(+id);
        return { message: 'Temp removed successfully', data: temp };
    }
}
