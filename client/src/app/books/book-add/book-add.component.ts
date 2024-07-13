import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent {
  @ViewChild('addForm') addForm: NgForm | undefined;
  book: any = {};

  constructor(private bookService: BooksService,private router: Router, private toastr: ToastrService){}

  addBook(){
    return this.bookService.addBook(this.book).subscribe({
      next: () => {
        this.router.navigateByUrl('/books');
        this.toastr.success('New book added succesfully');
      },
    })
  }


}
