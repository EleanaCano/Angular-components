import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-category',
  template: `<app-products-v [productId]="productId" [products]="products" (loadMore)="onLoadMore()"></app-products-v>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if (this.categoryId) {
          return this.productService.getProductsByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
        })
    )
    .subscribe((data) => {
      this.products = data;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }

  onLoadMore() {
    if (this.categoryId) {
      this.productService
      .getProductsByCategory(this.categoryId, this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
    }
  }
}
