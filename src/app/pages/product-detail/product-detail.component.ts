import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Location } from '@angular/common';

import { Product, createProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');
        if (this.productId) {
          return this.productService.getProduct(this.productId);
        }
        return [null];
        })
    )
    .subscribe((data) => {
      this.product = data;
    });
  }

  goToBack() {
    this.location.back();
  }

}
