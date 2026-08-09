import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ErrorTextEnum } from '../../shared/enums/errors-text.enum';
import { FilterAuthorDto } from '../../shared/pagination/filter-author.dto';
import { PaginatedResponse } from '../../shared/pagination/pagination';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    let { dataNascimento } = createAuthorDto;
    const { ...resto } = createAuthorDto;
    if (dataNascimento) {
      const [day, month, year] = dataNascimento.split('-');
      dataNascimento = `${year}-${month}-${day}`;
    }
    const author = this.authorRepository.create({
      ...resto,
      dataNascimento,
    });
    return await this.authorRepository.save(author);
  }

  async findAll(
    filterAuthorDto: FilterAuthorDto,
  ): Promise<PaginatedResponse<Author>> {
    const { page = 1, limit = 10, nome } = filterAuthorDto;

    const queryBuilder = this.authorRepository.createQueryBuilder('author');

    if (nome) {
      queryBuilder.andWhere('LOWER(author.nome) LIKE LOWER(:nome)', {
        nome: `%${nome}%`,
      });
    }

    queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('author.nome', 'ASC');

    const [data, total] = await queryBuilder.getManyAndCount();

    if (total === 0) {
      throw new NotFoundException(ErrorTextEnum.Authors_Not_Found);
    }

    return new PaginatedResponse(data, total, page, limit);
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
    const { dataNascimento, ...authorData } = updateAuthorDto;

    const author = await this.findOne(id);

    const dataNascimentoFormatada = dataNascimento
      ? dataNascimento.split('-').reverse().join('-')
      : undefined;

    this.authorRepository.merge(author, {
      ...authorData,
      ...(dataNascimentoFormatada && {
        dataNascimento: dataNascimentoFormatada,
      }),
    });

    return await this.authorRepository.save(author);
  }

  async remove(id: string): Promise<void> {
    const author = await this.findOne(id);

    await this.authorRepository.softRemove(author);
  }
}
