import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  id: number = 4;
  editedBook: Book[] | undefined;
  addFlag = false;
  editFlag = false;
  books: Book[] = [
    {
      id: 1,
      name: '	The Grass is Always Greener',
      authors: ['Jeffrey Archer'],
      isbn: '1-86092-049-7',
    },
    {
      id: 2,
      name: '	Murder!',
      authors: ['Arnold Bennett (1867-1931)'],
      isbn: '1-86092-012-8',
    },
    {
      id: 3,
      name: 'A Boy at Seven',
      authors: ['John Bidwell'],
      isbn: '1-86092-022-5',
    },
  ];

  editedForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  addBooks(book: Book) {
    return this.http.post('http://localhost:3000/books', book);
  }

  editBook(book: Book) {
    return this.http.put(`http://localhost:3000/books/${book.id}`, book);
  }

  delete(book: Book) {
    return this.http.delete(`http://localhost:3000/books/${book.id}`);
  }

  editBookForm(id: number, books: Book[]) {
    this.editedBook = books.filter((book: Book) => {
      if (book.id === id) {
        return book;
      }
    });
    return this.editedBook;
  }

  deleteAll() {
    return (this.books = []);
  }
}
