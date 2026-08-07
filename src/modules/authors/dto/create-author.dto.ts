import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAuthorDto {
  @ApiProperty({ example: 'Machado de Assis' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '1839-06-21' })
  @IsDateString()
  @IsNotEmpty()
  dataNascimento: string;

  @ApiProperty({
    example: 'Um dos maiores escritores brasileiros',
    required: false,
  })
  @IsString()
  @IsOptional()
  biografia?: string;
}
