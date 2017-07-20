import { Component, OnInit } from "@angular/core";

import { Book } from '../book/book';
import { BookService } from '../book/book.service';

@Component({
  selector: 'book-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ]
})
export class ListComponent implements OnInit {
  books: Array<Book>;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.bookService.getBooks()
    .then((books) => this.books = books);
  }
}
