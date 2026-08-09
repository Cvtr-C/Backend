import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterAuthorDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtrar por nome do autor' })
  @IsOptional()
  @IsString({ message: 'O filtro de nome deve ser um texto.' })
  nome?: string;
}
