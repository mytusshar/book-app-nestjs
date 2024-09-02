import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from '../../schemas/review.schema';
import { BookService } from '../book/book.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>, private readonly bookService: BookService) {}

    async create(createReviewDto: CreateReviewDto) {
        const { rating, book_id, review } = createReviewDto;
        const book = await this.bookService.findOne(book_id);
        const reviewResp = new this.reviewModel({
            ...{ rating, review },
            book,
        });
        return reviewResp.save();
    }

    async findAll() {
        return this.reviewModel.find().populate('book', 'genre').sort({ 'book.genre': 'asc' }).exec();
    }

    async findOne(id: number) {
        return this.reviewModel.findById(id).exec();
    }

    async findReviewSumByAuthor() {
        let reviews = await this.reviewModel.find().populate('book').exec();
        let reviewSumByAuthor = {};
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            let book = review.book;
            if (!reviewSumByAuthor[book.author]) reviewSumByAuthor[book.author] = 0;
            reviewSumByAuthor[book.author] += review.rating;
        }
        return reviewSumByAuthor;
    }

    async update(id: number, updateReviewDto: UpdateReviewDto) {
        return this.reviewModel.findByIdAndUpdate(id, updateReviewDto, { new: true });
    }

    async remove(id: number) {
        return await this.reviewModel.findByIdAndRemove(id);
    }
}
