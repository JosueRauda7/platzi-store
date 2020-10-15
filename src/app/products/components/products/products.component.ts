import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/service/products/products.service';
import { Product } from '../../../product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  clickProduct(id: number): void {
    console.log(`Añadir al carrito ${id}`);
  }

  fetchProducts(){
    this.productsService.getAllProducts().subscribe(prods => this.products = prods);
  }
}
