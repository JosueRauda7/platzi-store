import { Product } from '../../../product.model';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  // OnChanges,
  // SimpleChanges,
  OnInit,
  DoCheck,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
// export class ProductComponent implements OnChanges, OnInit {
export class ProductComponent implements OnInit, DoCheck, OnDestroy {
  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today: Date = new Date();

  constructor() {
    console.log('constructor');
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('ngOnChanges', changes);
  // }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  addCart(): void {
    console.log('Añadir al carrito');
    this.productClicked.emit(this.product.id);
  }
}
