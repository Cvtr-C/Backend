import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FilterBookDto } from '../../shared/pagination/filter-book.dto';

@ApiTags('Livros')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um livro' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar livros' })
  async findAll(@Query() filterBookDto: FilterBookDto) {
    return this.booksService.findAll(filterBookDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar um livro específico' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar informações de um livro' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um livro' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
