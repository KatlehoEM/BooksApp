import { ResolveFn } from '@angular/router';
import { Book } from '../_models/book';
import { inject } from '@angular/core';
import { BooksService } from '../_services/books.service';

export const bookDetailsResolver: ResolveFn<Book> = (route, state) => {
  const bookService = inject(BooksService);

  return bookService.getBookById(route.paramMap.get('id')!)
};
