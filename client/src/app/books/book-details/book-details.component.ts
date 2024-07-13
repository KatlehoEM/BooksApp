import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = {} as Book;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.book = data['book']
    })
  }


}
