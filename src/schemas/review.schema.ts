import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Book } from './book.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
    @Prop()
    review: string;

    @Prop()
    rating: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Book.name })
    @Type(() => Book)
    book: Book;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
