import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartBooks: Book[];
  booksInCart = false;
  constructor(private booksrv: BookService) { }

  ngOnInit() {
    this.cartBooks = this.booksrv.getCartBooks();
    if (this.cartBooks.length > 0) {
      this.booksInCart = true;
    }
  }

  checkout() {
    this.booksrv.checkout();
    this.cartBooks  = [];
    alert('Checkout Complete. \n Thanks for using our service');
    this.booksInCart = false;
  }
}
