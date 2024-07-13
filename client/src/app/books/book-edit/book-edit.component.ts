import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/book';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event]']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  book: Book | undefined;

  constructor(private bookService: BooksService, private route: ActivatedRoute,
     private toastr: ToastrService, private router: Router){}
  ngOnInit(): void {
    this.loadBook()

  }

  loadBook(){
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    this.bookService.getBookById(id).subscribe({
      next: book => this.book = book,
      error: error => console.log(error)
    })

  }
  updateBook() {
    if(!this.book) return
    this.bookService.updateBook(this.book.id,this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Book details updated succesfully');
        this.editForm?.reset(this.book)
      }
    })
  }

}
