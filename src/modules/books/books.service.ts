import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ErrorTextEnum } from '../../shared/enums/errors-text.enum';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { authorIds, ...bookData } = createBookDto;
    const authors = await this.authorRepository.findBy({ id: In(authorIds) });
    if (authors.length !== authorIds.length) {
      throw new BadRequestException(ErrorTextEnum.Book_Author_Not_Exist);
    }
    const book = this.bookRepository.create({
      ...bookData,
      authors,
    });
    return await this.bookRepository.save(book);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    titulo?: string,
    autor?: string,
  ) {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.authors', 'author');
    if (titulo) {
      queryBuilder.andWhere('LOWER(book.titulo) LIKE LOWER(:titulo)', {
        titulo: `%${titulo}%`,
      });
    }
    if (autor) {
      queryBuilder.andWhere(
        '(LOWER(author.nome) LIKE LOWER(:autor) OR author.id = :autorId)',
        { autor: `%${autor}%`, autorId: autor },
      );
    }
    queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('book.titulo', 'ASC');
    const [data, total] = await queryBuilder.getManyAndCount();
    if (total === 0) {
      throw new NotFoundException(ErrorTextEnum.Books_Not_Found);
    }
    return {
      data,
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { authors: true },
    });
    if (!book) {
      throw new NotFoundException(ErrorTextEnum.Books_Not_Found);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const { authorIds, ...bookData } = updateBookDto;
    const book = await this.findOne(id);
    if (authorIds) {
      const authors = await this.authorRepository.findBy({ id: In(authorIds) });
      if (authors.length !== authorIds.length) {
        throw new BadRequestException(ErrorTextEnum.Book_Author_Not_Exist);
      }
      book.authors = authors;
    }
    Object.assign(book, bookData);
    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.softRemove(book);
  }
}
