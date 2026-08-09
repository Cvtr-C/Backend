import {
  IsNotEmpty,
  IsString,
  IsArray,
  Matches,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Dom Casmurro' })
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode ser emviado vazio' })
  titulo: string;

  @ApiProperty({ example: 'Romance escrito por Machado de Assis...' })
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode ser enviado vazio' })
  descricao: string;

  @ApiProperty({ example: '21-06-1899' })
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode ser enviado vazio' })
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message:
      'A data de publicação dos livros deve estar no formato DD-MM-YYYY.',
  })
  dataPublicacao: string;

  @ApiProperty({ example: ['Machado de Assis'] })
  @IsArray()
  @ArrayMinSize(1, { message: 'Informe ao menos um nome de autor.' })
  @IsString({ each: true, message: 'Cada nome de autor deve ser um texto.' })
  authorNames: string[];
}
