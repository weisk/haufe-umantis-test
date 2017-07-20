import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Book, BookExtended } from './book';

@Injectable()
export class BookService {
  private baseUrl = '/api/books';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error('An error ocurred', error);
    return Promise.reject(error.message || error);
  }

  getBooks(): Promise<Array<Book>> {
    return this.http
      .get(this.baseUrl)
      .toPromise()
      .then(res => res.json() as Book[])
      .catch(this.handleError);
  }


  getBook(id: number): Promise<BookExtended> {
    const url = `${this.baseUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json() as BookExtended)
      .catch(this.handleError);
  }

}
