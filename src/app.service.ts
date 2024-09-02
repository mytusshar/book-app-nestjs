import { Injectable } from '@nestjs/common';
import { BookService } from './modules/book/book.service';
import { ReviewService } from './modules/review/review.service';

@Injectable()
export class AppService {
    constructor(private readonly bookService: BookService, private readonly reviewService: ReviewService) {}

    getHello(): string {
        return 'Hello World!';
    }

    async seedData() {
        const books = await this.seedBooks();
        await this.seedReviews(books);
    }

    async seedBooks() {
        const books = [
            (
                await this.bookService.create({
                    name: 'Book-1',
                    author: 'author-1',
                    genre: 'comedy',
                    releaseDate: new Date('2022'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-2',
                    author: 'author-1',
                    genre: 'thriller',
                    releaseDate: new Date('2021'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-3',
                    author: 'author-1',
                    genre: 'action',
                    releaseDate: new Date('2020'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-4',
                    author: 'author-2',
                    genre: 'comedy',
                    releaseDate: new Date('2020'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-5',
                    author: 'author-2',
                    genre: 'thriller',
                    releaseDate: new Date('2022'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-6',
                    author: 'author-2',
                    genre: 'action',
                    releaseDate: new Date('2021'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-7',
                    author: 'author-3',
                    genre: 'comedy',
                    releaseDate: new Date('2021'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-8',
                    author: 'author-3',
                    genre: 'thriller',
                    releaseDate: new Date('2020'),
                })
            ).toJSON(),
            (
                await this.bookService.create({
                    name: 'Book-9',
                    author: 'author-3',
                    genre: 'action',
                    releaseDate: new Date('2022'),
                })
            ).toJSON(),
        ];
        return books;
    }

    async seedReviews(books: any[]) {
        for (let i = 0; i < books.length; i++) {
            const book_id = books[i]._id.toString();
            const name = books[i].name;
            await this.reviewService.create({ review: name + '-review-1', rating: 10, book_id });
            await this.reviewService.create({ review: name + '-review-2', rating: 10, book_id });
            await this.reviewService.create({ review: name + '-review-3', rating: 10, book_id });
        }
    }
}
