import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBookDto {
  @ApiProperty({ example: 'Dom Casmurro' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Romance escrito por Machado de Assis...' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: '01-01-1899' })
  @IsDateString()
  @IsNotEmpty()
  dataPublicacao: string;

  @ApiProperty({
    example: ['uuid-do-autor-1', 'uuid-do-autor-2'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  authorIds: string[];
}
