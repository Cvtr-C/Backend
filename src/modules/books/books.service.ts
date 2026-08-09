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
import { FilterBookDto } from '../../shared/pagination/filter-book.dto';
import { PaginatedResponse } from '../../shared/pagination/pagination';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { authorNames, dataPublicacao, ...bookData } = createBookDto;

    const dataPublicacaoFormatada = dataPublicacao
      .split('-')
      .reverse()
      .join('-');

    const authors = await this.authorRepository.findBy({
      nome: In(authorNames),
    });

    if (authors.length !== authorNames.length) {
      throw new BadRequestException(ErrorTextEnum.Book_Author_Not_Exist);
    }

    const book = this.bookRepository.create({
      ...bookData,
      dataPublicacao: dataPublicacaoFormatada,
      authors,
    });

    return await this.bookRepository.save(book);
  }

  async findAll(
    filterBookDto: FilterBookDto,
  ): Promise<PaginatedResponse<Book>> {
    const { page = 1, limit = 10, titulo, autor } = filterBookDto;

    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.authors', 'author');

    if (titulo) {
      queryBuilder.andWhere('LOWER(book.titulo) LIKE LOWER(:titulo)', {
        titulo: `%${titulo}%`,
      });
    }

    if (autor) {
      queryBuilder.andWhere('(LOWER(author.nome) LIKE LOWER(:autor))', {
        autor: `%${autor}%`,
      });
    }
    queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('book.titulo', 'ASC');

    const [data, total] = await queryBuilder.getManyAndCount();

    if (total === 0) {
      throw new NotFoundException(ErrorTextEnum.Books_Not_Found);
    }

    return new PaginatedResponse(data, total, page, limit);
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
    const { authorNames, dataPublicacao, ...bookData } = updateBookDto;

    const book = await this.findOne(id);

    let dataPublicacaoFormatada: string | undefined;
    if (dataPublicacao) {
      dataPublicacaoFormatada = dataPublicacao.split('-').reverse().join('-');
    }

    if (authorNames && authorNames.length > 0) {
      const authors = await this.authorRepository.findBy({
        nome: In(authorNames),
      });

      if (authors.length !== authorNames.length) {
        throw new BadRequestException(ErrorTextEnum.Book_Author_Not_Exist);
      }

      book.authors = authors;
    }

    this.bookRepository.merge(book, {
      ...bookData,
      ...(dataPublicacaoFormatada && {
        dataPublicacao: dataPublicacaoFormatada,
      }),
    });

    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);

    await this.bookRepository.softRemove(book);
  }
}
