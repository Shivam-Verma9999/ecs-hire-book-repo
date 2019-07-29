import { Component, OnInit, Input } from '@angular/core';


import { Book } from '../book';
import { BookService } from '../book-service.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  @Input() public book: Book;
  public inCart = false;
  constructor(private booksrv: BookService) { }

  ngOnInit() {
    if (this.booksrv.containsInCart(this.book)) {
      this.inCart = true;
    }
  }
  addToCart() {
    if (! this.booksrv.addToCart(this.book)) {
      alert('book already in cart');
    }
    this.inCart = true;
  }

  removeFromCart() {
    this.booksrv.removeFromCart(this.book);
    this.inCart = false;
  }
}
