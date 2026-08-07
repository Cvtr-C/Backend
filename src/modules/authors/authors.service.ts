import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ErrorTextEnum } from '../../shared/enums/errors-text.enum';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [data, total] = await this.authorRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { nome: 'ASC' },
    });

    if (total === 0) {
      throw new NotFoundException(ErrorTextEnum.Authors_Not_Found);
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

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });

    if (!author) {
      throw new NotFoundException(ErrorTextEnum.Author_Not_Found);
    }
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    Object.assign(author, updateAuthorDto);
    if (!author) {
      throw new NotFoundException(ErrorTextEnum.Author_Not_Found);
    }
    return await this.authorRepository.save(author);
  }

  async remove(id: string): Promise<void> {
    const author = await this.findOne(id);
    if (!author) {
      throw new NotFoundException(ErrorTextEnum.Author_Not_Found);
    }
    await this.authorRepository.softRemove(author);
  }
}
