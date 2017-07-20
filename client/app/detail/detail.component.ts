import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { BookExtended } from '../book/book';
import { BookService } from '../book/book.service';

@Component({
  selector: 'book-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit {
  book: BookExtended;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.bookService.getBook(+params.get('id')))
    .subscribe((book) => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }

}
