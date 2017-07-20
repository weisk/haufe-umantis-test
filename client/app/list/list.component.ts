import { Component, OnInit } from "@angular/core";
import { Router }  from '@angular/router';

import { Book } from '../book/book';
import { BookService } from '../book/book.service';

@Component({
  selector: 'book-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ]
})
export class ListComponent implements OnInit {
  books: Array<Book>;

  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.bookService.getBooks()
    .then((books) => this.books = books);
  }

  onActivate(event: any) {
    this.router.navigate(['/detail', event.row.id]);
  }
}
