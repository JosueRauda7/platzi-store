import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  itemList: string;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.total$ = this.cartService.cart$.pipe(map((ps) => ps.length));
    // .subscribe((total) => {
    //   this.total = total;
    // });
  }

  ngOnInit(): void {}
}
