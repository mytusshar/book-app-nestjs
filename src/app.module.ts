import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './core/global-exception.filter';
import { TempModule } from './modules/temp/temp.module';
import { BookModule } from './modules/book/book.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
                PORT: Joi.number().default(3000),
            }),
        }),
        MongooseModule.forRoot('mongodb://localhost/demo'),
        TempModule,
        BookModule,
        ReviewModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        AppService,
    ],
})
export class AppModule {}
