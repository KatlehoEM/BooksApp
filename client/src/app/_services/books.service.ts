import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../_models/book';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
 baseUrl = environment.apiUrl
 bookCache = new Map();
 paginatedResult: PaginatedResult<Book[]> = new  PaginatedResult<Book[]>

 
 constructor(private http: HttpClient) { }

  getBooks(page?:number, itemsPerPage?:number){
    let params = new HttpParams();

    if(page && itemsPerPage){
      params = params.append('pageNumber',page);
      params = params.append('pageSize',itemsPerPage);
    }

    return this.http.get<Book[]>(this.baseUrl + 'books', {observe: 'response', params}).pipe(
      map(response => {
        if(response.body) {
          this.paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');
        if(pagination){
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult;
      })
    )
  }

  getBookById(id: string){
    const bookId = Number(id); 
    const book = [...this.bookCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((book: Book) => book.id === bookId);

    if (book) return of(book); 
    return this.http.get<Book>(this.baseUrl + 'books/' + bookId);
  }

  getBooksWithinPastMonth(page?:number, itemsPerPage?:number){
    let params = new HttpParams();

    if(page && itemsPerPage){
      params = params.append('pageNumber',page);
      params = params.append('pageSize',itemsPerPage);
    }

    return this.http.get<Book[]>(this.baseUrl + 'books/pastmonth', {observe: 'response', params}).pipe(
      map(response => {
        if(response.body) {
          this.paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');
        if(pagination){
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult;
      })
    )
  }

  addBook(book: Book){
    return this.http.post<Book>(this.baseUrl + 'books/', book);
  }

  updateBook(id: number, book: Book){
    return this.http.put(this.baseUrl + 'books/' + id, book)
  }

  markAsRead(id: number, updateBook: any){
    return this.http.patch(this.baseUrl + 'books/' + id, updateBook);
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseUrl + 'books/' + id);
  }


}
