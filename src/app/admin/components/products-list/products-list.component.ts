import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/service/products/products.service';
import { Product } from '../../../product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((p) => (this.products = p));
  }

  deleteProduct(id: string): void {
    this.productsService
      .deleteProduct(id)
      .subscribe(
        (product) =>
          (this.products = this.products.filter((p) => p.id !== product.id))
      );
  }
}
