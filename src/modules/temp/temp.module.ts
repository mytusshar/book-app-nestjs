import { Module } from '@nestjs/common';
import { TempService } from './temp.service';
import { TempController } from './temp.controller';

@Module({
    imports: [],
    controllers: [TempController],
    providers: [TempService]
})
export class TempModule {}
