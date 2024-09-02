import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

    async create(createBookDto: CreateBookDto) {
        const book = new this.bookModel(createBookDto);
        return book.save();
    }

    async findAll() {
        return this.bookModel.find().exec();
    }

    async findAllGroupByGenre() {
        let books = await this.bookModel.find().sort({ genre: 'asc' }).exec();
        let booksGrouBy = {};
        for (let i = 0; i < books.length; i++) {
            let book = books[i];
            if (!booksGrouBy[book.genre]) booksGrouBy[book.genre] = [];
            booksGrouBy[book.genre].push(book);
        }
        return booksGrouBy;
    }

    async findAllGroupByGenreAndReleaseDate() {
        let books = await this.bookModel.find().sort({ genre: 'asc', releaseDate: 'asc' }).exec();
        let booksGrouBy = {};
        for (let i = 0; i < books.length; i++) {
            let book = books[i];
            let releaseYear = new Date(book.releaseDate).getFullYear();
            if (!booksGrouBy[book.genre]) booksGrouBy[book.genre] = {};
            if (!booksGrouBy[book.genre][releaseYear]) booksGrouBy[book.genre][releaseYear] = [];
            booksGrouBy[book.genre][releaseYear].push(book);
        }
        return booksGrouBy;
    }

    async findOne(id: string) {
        return this.bookModel.findById(id).exec();
    }

    async update(id: string, updateBookDto: UpdateBookDto) {
        return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
    }

    async remove(id: string) {
        return await this.bookModel.findByIdAndRemove(id);
    }
}
