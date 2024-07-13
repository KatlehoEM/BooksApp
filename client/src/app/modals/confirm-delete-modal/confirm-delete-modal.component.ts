import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/book';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent implements OnInit {
  
  book : Book | undefined;
  books: Book[] | undefined;
  closeBtnName = ''

  constructor(private bookService: BooksService,private toastr: ToastrService,
     public bsModalRef: BsModalRef){}

  ngOnInit(): void {
    
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => this.books?.splice(this.books.findIndex(b => b.id === id),1)
    });
    this.toastr.info('Book has been removed from collection')
  }
     
  confirmDelete(id: number){
    this.deleteBook(id);
    this.bsModalRef.hide();
  }
 
}
