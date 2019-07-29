import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

import { BookService } from '../book-service.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public allbooks: Book[];
  public displayBooks: Book[];
  public searchTerm: string;

  //
  // 1 for ascending and 2 for descending
  //
  public orderofSorting = 1;
  constructor( private booksrv: BookService) { }

  ngOnInit() {
    if (this.booksrv.fetched()) {
      this.allbooks = this.booksrv.getLibraryBooks();
      this.displayBooks = this.allbooks;
    } else {
      this.booksrv.getBooks().subscribe(bks => {
        console.log(bks);
        this.allbooks = bks;
        this.displayBooks = bks;
      });
    }
  }

  sortByRating() {
    if (this.orderofSorting === 1) {
      this.displayBooks = this.displayBooks.sort(this.ratingCompareAscending);
      this.orderofSorting = 2;
    } else {
      this.displayBooks = this.displayBooks.sort(this.ratingCompareDescending);
      this.orderofSorting = 1;
    }
  }

  ratingCompareAscending(book1: Book,  book2: Book ): number {
    if ( book1.average_rating === book2.average_rating ) {
        return 0;
    } else if (book1.average_rating < book2.average_rating)  {
      return -1;
    } else {
      return 1;
    }
  }

  ratingCompareDescending(book1: Book,  book2: Book ): number {
    if ( book1.average_rating === book2.average_rating ) {
      return 0;
    } else if (book1.average_rating > book2.average_rating)  {
     return -1;
    } else {
     return 1;
    }
  }

  search() {
    this.searchTerm = this.searchTerm.trim();
    if (this.searchTerm.length === 0) {
      return;
    }
    this.displayBooks = this.allbooks.filter(book => {
      return (book.title.toString().toLocaleLowerCase().indexOf(this.searchTerm.toLocaleLowerCase()) !== -1);
    });
  }
}
