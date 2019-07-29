import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() private rating;
  public ratingAt = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
  }
  getClass(r) {
    if (this.rating >= r) {
      return 'checked';
    } else if ( this.rating >= (r - 0.5) ) {
      return 'fa-star-half-full';
    } else {
      return 'unchecked';
    }
  }
}
