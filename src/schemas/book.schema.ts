import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Review } from './review.schema';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop()
    name: string;

    @Prop()
    author: string;

    @Prop()
    releaseDate: Date;

    @Prop()
    genre: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
    reviews: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
