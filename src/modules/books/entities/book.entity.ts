import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'date' })
  dataPublicacao: string;

  @ManyToMany(() => Author, (author) => author.books, { cascade: true })
  @JoinTable({ name: 'books_authors' })
  authors: Author[];
}
