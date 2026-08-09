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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FilterAuthorDto } from '../../shared/pagination/filter-author.dto';

@ApiTags('Autores')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo autor' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista de autores' })
  async findAll(@Query() filterAuthorDto: FilterAuthorDto) {
    return this.authorsService.findAll(filterAuthorDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar um autor específico' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar informações de um autor' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um autor' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
