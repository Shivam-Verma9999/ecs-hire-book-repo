import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Book } from './book';
import { Observable, from } from 'rxjs';


const API_URL = 'http://starlord.hackerearth.com/books';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    Authorization: 'authkey',
    userid: '1'
  })
};
@Injectable()

export class BookService {
  cart: Book[] = [];
  fullLibray: Book[];
  fetchedBook = false;
constructor(private http: HttpClient) {
  this.populateBooks();
}

getBooks(): Observable < Book[] > {
  return this.http.get<Book[]>(API_URL, httpOptions);
}

populateBooks() {
  this.getBooks().subscribe(bks => {
    console.log(bks);
    this.fullLibray = bks;
    this.fetchedBook = true;
  });
}
fetched() {
  return this.fetchedBook;
}
getCartBooks(): Book[] {
  return this.cart;
}
addToCart(book: Book ): boolean {
  let contains = false;
  if (this.cart) {
    this.cart.forEach(bk => {
      if (book.isbn === bk.isbn ) {
        contains = true;
      }
    });
    if (!contains) {
      this.cart.push(book);
      return true;
    }
  } else {
    this.cart.push(book);
    return true;
  }
  return false;

}
removeFromCart(book: Book) {
  this.cart = this.cart.filter(bk => bk.isbn !== book.isbn);
}

containsInCart(book: Book): boolean {
  let contains = false;
  if (this.cart) {
    this.cart.forEach(bk => {
        if (bk.isbn === book.isbn) {
          contains = true;
        }
    });
  }
  return contains;
}
checkout() {
  this.cart = [];
}
getLibraryBooks(): Book[] {
  return this.fullLibray;
}

}
