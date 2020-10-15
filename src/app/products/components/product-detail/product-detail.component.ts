import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../product.model';
import { ProductsService } from '../../../core/service/products/products.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
    });
  }

  fetchProduct(id: string): void {
    this.productsService.getProduct(id).subscribe((p) => (this.product = p));
  }

  createProduct(): void {
    const product: Product = {
      id: '50',
      title: 'Nuevo Producto',
      description: 'bla bla',
      image: 'assets/images/mug.png',
      price: 1000,
    };
    this.productsService
      .createProduct(product)
      .subscribe((p) => console.log(p));
  }

  updateProduct(): void {
    const product: Partial<Product> = {
      id: '50',
      title: 'Nuevo Producto',
      image: 'assets/images/mug.png',
      price: 555,
      description: 'edicion',
    };
    this.productsService
      .updateProduct('2', product)
      .subscribe((p) => console.log(p));
  }

  deleteProduct(): void {
    this.productsService.deleteProduct('50').subscribe((p) => console.log(p));
  }
}
