import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterBookDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtrar por título do livro' })
  @IsOptional()
  @IsString({ message: 'O filtro de título deve ser um texto.' })
  titulo?: string;

  @ApiPropertyOptional({ description: 'Filtrar por nome do autor' })
  @IsOptional()
  @IsString({ message: 'O filtro de autor deve ser um texto.' })
  autor?: string;
}
