import { Entity, Column, ManyToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity('authors')
export class Author extends BaseEntity {
  @Column({ unique: true })
  nome: string;

  @Column({ type: 'date' })
  dataNascimento: string;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
