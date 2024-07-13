import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/book';
import { Pagination } from 'src/app/_models/pagination';
import { BooksService } from 'src/app/_services/books.service';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  pastMonthBooks: Book[] = [];
  showPastMonth: boolean = false;
  bsModelRef: BsModalRef<ConfirmDeleteModalComponent> = new BsModalRef<ConfirmDeleteModalComponent>();
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 3;

  constructor(private bookService: BooksService,private toastr: ToastrService,
     private modalService: BsModalService){}
  
  ngOnInit(): void {
    this.loadBooks()
  }

  loadBooks(){
    this.bookService.getBooks(this.pageNumber,this.pageSize).subscribe({
      next: response => {
        if(response.result && response.pagination){
          this.books = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  loadBooksWithinPastMonth(){
    this.bookService.getBooksWithinPastMonth(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if(response.result && response.pagination){
          this.pastMonthBooks = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  togglePastMonthBooks(): void {
    this.showPastMonth = !this.showPastMonth;
    if (this.showPastMonth) {
      this.loadBooksWithinPastMonth();
    }
  }
  markAsRead(book: Book): void {
    const updateBook = [
      { op: 'replace', path: '/isRead', value: true },
      { op: 'replace', path: '/date', value: new Date() }
    ];

    this.bookService.markAsRead(book.id, updateBook).subscribe({
      next: () => {
        book.isRead = true;
        book.date = new Date();
      },
      error: err => this.toastr.error('Error marking book as read', err)
    });
  }

  openConfirmationModal(book: Book){
    const initialState: ModalOptions = {
      initialState: {
        book: book,
        books: this.showPastMonth? this.pastMonthBooks: this.books
      }
    }
    this.bsModelRef = this.modalService.show(ConfirmDeleteModalComponent,initialState);
  }  

   pageChanged(event: any) {
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      if(this.showPastMonth){
        this.loadBooksWithinPastMonth()
      }else{
        this.loadBooks();
      }
      
    }
   
  }

}
