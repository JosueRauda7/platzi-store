import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../core/service/products/products.service';
import { Router } from '@angular/router';
import { MyValidators } from '../../../utils/validators';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  form: FormGroup;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private angFireStorage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void { }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(1)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  saveProduct(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product).subscribe((p) => {
        // console.log(p);
        this.router.navigate(['./admin/products']);
      });
    }
    // console.log(this.form.value);
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const dir = 'images';
    const fileRef = this.angFireStorage.ref(dir);
    const task = this.angFireStorage.upload(dir, file);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            console.log(url);
            this.form.get('image').setValue(url);
          });
        })
      )
      .subscribe();
  }
}
