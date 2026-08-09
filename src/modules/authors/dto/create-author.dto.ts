import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Machado de Assis' })
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode ser enviado vazio.' })
  nome: string;

  @ApiProperty({ example: '21-06-1839' })
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode ser enviado vazio.' })
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'A data de nascimento deve ter formato DD-MM-YYYY.',
  })
  dataNascimento: string;

  @ApiProperty({
    example: 'Um dos maiores escritores brasileiros',
    required: false,
  })
  @IsString()
  @IsOptional()
  biografia?: string;
}
