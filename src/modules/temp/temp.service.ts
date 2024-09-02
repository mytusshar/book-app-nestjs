import { Injectable } from '@nestjs/common';
import { InjectLogs } from '../../config/logger.config';

import { CreateTempDto } from './dto/create-temp.dto';
import { UpdateTempDto } from './dto/update-temp.dto';

@Injectable()
@InjectLogs()
export class TempService {
    constructor() {}

    create(createTempDto: CreateTempDto) {
        return `This action returns creates temp`;
    }

    findAll() {
        return `This action returns all temp`;
    }

    findOne(id: number) {
        return `This action returns a #${id} temp`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(id: number, updateTempDto: UpdateTempDto) {
        return `This action updates a #${id} temp`;
    }

    remove(id: number) {
        return `This action removes a #${id} temp`;
    }
}
